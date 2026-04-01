import axios, { type AxiosInstance, AxiosError } from 'axios';

// ─── Axios Instance ────────────────────────────────────────────────────────────

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ─── Types ─────────────────────────────────────────────────────────────────────

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface UserProfile {
  id: string;
  fullName: string;
  phone?: string;
  email?: string;
  roles: string[];
  isVerified: boolean;
  sellerProfile?: unknown;
  createdAt?: string;
  lastLogin?: string;
}

export interface AuthResponse {
  success: boolean;
  data: {
    user: UserProfile;
    tokens: AuthTokens;
    isNewUser?: boolean;
  };
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface ApiError {
  success: false;
  error?: string;
  code?: string;
  errors?: ValidationError[];
}

// ─── Error Handling ────────────────────────────────────────────────────────────

/**
 * Normalises any thrown value into a human-readable message.
 * Never leaks raw server internals (stack traces, SQL errors, etc.).
 */
function resolveErrorMessage(err: any): string {
  if (err instanceof AxiosError) {
    const data = err.response?.data as ApiError | undefined;

    // Validation errors — join field messages
    if (data?.errors?.length) {
      return data.errors.map(e => `${e.field}: ${e.message}`).join(' | ');
    }

    // Server-supplied friendly message
    if (data?.error) return data.error;

    // HTTP-level fallbacks — never expose status codes or server logs
    const status = err.response?.status;
    if (status === 400) return 'Invalid request. Please check your input.';
    if (status === 401) return 'Authentication failed. Please log in again.';
    if (status === 402) return 'OTP verification required.';
    if (status === 403) return 'Your account is restricted. Please contact support.';
    if (status === 404) return 'Resource not found.';
    if (status === 409) return 'A conflict occurred. The resource may already exist.';
    if (status && status >= 500) return 'Something went wrong on our end. Please try again later.';
    if (err.code === 'ECONNABORTED') return 'Request timed out. Check your connection.';
    if (err.code === 'ERR_NETWORK') return 'Network error. Check your connection.';
  }

  return 'An unexpected error occurred. Please try again.';
}

/**
 * Wraps an error in a standardised shape for consumers.
 */
export class AuthServiceError extends Error {
  public readonly code?: string;
  public readonly validationErrors?: ValidationError[];

  constructor(err: unknown) {
    super(resolveErrorMessage(err));
    this.name = 'AuthServiceError';

    if (err instanceof AxiosError) {
      const data = err.response?.data as ApiError | undefined;
      this.code = data?.code;
      this.validationErrors = data?.errors;
    }
  }
}

/** Runs an async call and re-throws as AuthServiceError on failure. */
async function safeCall<T>(fn: () => Promise<T>): Promise<T> {
  try {
    return await fn();
  } catch (err) {
    throw new AuthServiceError(err);
  }
}

// ─── Token helpers ─────────────────────────────────────────────────────────────

const TOKEN_KEY = 'auth_access_token';

export const tokenStore = {
  get: (): string | null => localStorage.getItem(TOKEN_KEY),
  set: (token: string): void => localStorage.setItem(TOKEN_KEY, token),
  clear: (): void => localStorage.removeItem(TOKEN_KEY),
};

// Attach access token to every request automatically
api.interceptors.request.use(config => {
  const token = tokenStore.get();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ─── Auth Service ──────────────────────────────────────────────────────────────

export const AuthService = {
  // ── Registration ─────────────────────────────────────────────────────────────

  /**
   * Step 1 — Send OTP to phone for registration.
   */
  async registerPhone(payload: {
    phone: string;
    fullName: string;
    password: string;
  }): Promise<{ message: string; expiresIn: number }> {
    return safeCall(async () => {
      const { data } = await api.post('/auth/register/phone', payload);
      return data;
    });
  },

  /**
   * Step 2 — Verify OTP and create account.
   * Persists the access token on success.
   */
  async registerPhoneVerify(payload: {
    phone: string;
    otp: string;
  }): Promise<AuthResponse['data']> {
    return safeCall(async () => {
      const { data } = await api.post<AuthResponse>('/auth/register/phone/verify', payload);
      tokenStore.set(data.data.tokens.accessToken);
      return data.data;
    });
  },

  // ── Login ─────────────────────────────────────────────────────────────────────

  /**
   * Login with phone + password.
   * Returns user data on success, or throws with code `OTP_REQUIRED` for first-time logins.
   */
  async loginPhone(payload: {
    phone: string;
    password: string;
    rememberMe?: boolean;
  }): Promise<AuthResponse['data']> {
    return safeCall(async () => {
      const { data } = await api.post<AuthResponse>('/auth/login/phone', payload);
      tokenStore.set(data.data.tokens.accessToken);
      return data.data;
    });
  },

  /**
   * Verify OTP for first-time phone login.
   */
  async verifyLoginOtp(payload: {
    phone: string;
    otp: string;
    rememberMe?: boolean;
  }): Promise<AuthResponse['data']> {
    return safeCall(async () => {
      const { data } = await api.post<AuthResponse>('/auth/login/phone/verify', payload);
      tokenStore.set(data.data.tokens.accessToken);
      return data.data;
    });
  },

  // ── Password Reset ────────────────────────────────────────────────────────────

  /**
   * Request a password-reset OTP (no-op if phone not found — by design).
   */
  async forgotPassword(payload: { phone: string }): Promise<{ message: string }> {
    return safeCall(async () => {
      const { data } = await api.post('/auth/forgot-password', payload);
      return data;
    });
  },

  /**
   * Reset password using OTP received via SMS.
   * All existing sessions are revoked by the server on success.
   */
  async resetPassword(payload: {
    phone: string;
    otp: string;
    newPassword: string;
  }): Promise<{ message: string }> {
    return safeCall(async () => {
      const { data } = await api.post('/auth/reset-password', payload);
      return data;
    });
  },

  // ── Token Lifecycle ───────────────────────────────────────────────────────────

  /**
   * Exchange a refresh token for a new access token.
   */
  async refreshToken(refreshToken: string): Promise<AuthTokens> {
    return safeCall(async () => {
      const { data } = await api.post<{ success: true; data: { tokens: AuthTokens } }>(
        '/auth/refresh',
        { refreshToken },
      );
      tokenStore.set(data.data.tokens.accessToken);
      return data.data.tokens;
    });
  },

  // ── Session ───────────────────────────────────────────────────────────────────

  /**
   * Log out the current user. Clears local token regardless of server response.
   */
  async logout(): Promise<void> {
    try {
      await api.post('/auth/logout');
    } finally {
      tokenStore.clear();
    }
  },

  /**
   * Fetch the currently authenticated user's profile.
   */
  async getMe(): Promise<UserProfile> {
    return safeCall(async () => {
      const { data } = await api.get<{ success: true; data: UserProfile }>('/auth/me');
      return data.data;
    });
  },

  // ── Google OAuth ──────────────────────────────────────────────────────────────

  /**
   * Sign in or register with a Google ID token.
   * Handles both new and returning users in one call.
   */
  async googleAuth(idToken: string): Promise<AuthResponse['data'] & { isNewUser: boolean }> {
    return safeCall(async () => {
      const { data } = await api.post<AuthResponse>('/auth/google', { idToken });
      tokenStore.set(data.data.tokens.accessToken);
      return data.data as AuthResponse['data'] & { isNewUser: boolean };
    });
  },

  /**
   * Link a Google account to an existing phone-registered account.
   * Requires the user to be logged in.
   */
  async linkGoogle(idToken: string): Promise<{ message: string }> {
    return safeCall(async () => {
      const { data } = await api.post('/auth/google/link', { idToken });
      return data;
    });
  },

  // ── Health ────────────────────────────────────────────────────────────────────

  async healthCheck(): Promise<{ service: string; status: string; timestamp: string }> {
    return safeCall(async () => {
      const { data } = await api.get('/auth/health');
      return data;
    });
  },
};