// src/services/Auth/auth.service.ts
import axios, { type AxiosInstance, AxiosError } from 'axios';

// ─── Axios Instance ────────────────────────────────────────────────────────────
const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
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
function resolveErrorMessage(err: any): string {
  if (err instanceof AxiosError) {
    const data = err.response?.data as ApiError | undefined;
    if (data?.errors?.length) {
      return data.errors.map(e => `${e.field}: ${e.message}`).join(' | ');
    }
    if (data?.error) return data.error;
    const status = err.response?.status;
    if (status === 400) return 'Invalid request. Please check your input.';
    if (status === 401) return 'Authentication failed. Please log in again.';
    if (status === 403) return 'Your account is restricted. Please contact support.';
    if (status === 404) return 'Resource not found.';
    if (status === 409) return 'A conflict occurred. The resource may already exist.';
    if (status && status >= 500) return 'Something went wrong on our end. Please try again later.';
    if (err.code === 'ECONNABORTED') return 'Request timed out. Check your connection.';
    if (err.code === 'ERR_NETWORK') return 'Network error. Check your connection.';
  }
  return 'An unexpected error occurred. Please try again.';
}

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

api.interceptors.request.use(config => {
  const token = tokenStore.get();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ─── Auth Service ──────────────────────────────────────────────────────────────
export const AuthService = {
  // ── Registration (Email OTP) ────────────────────────────────────────────────
  /**
   * Step 1: Request OTP for email registration.
   */
  async requestEmailOtp(email: string): Promise<{ message: string; expiresIn: number }> {
    return safeCall(async () => {
      const { data } = await api.post('/auth/register/email/request', { email });
      return data;
    });
  },

  /**
   * Step 2: Verify OTP and create user account.
   */
  async verifyEmailOtp(payload: {
    email: string;
    otp: string;
    fullName: string;
    phone: string;
    password: string;
  }): Promise<AuthResponse['data']> {
    return safeCall(async () => {
      const { data } = await api.post<AuthResponse>('/auth/register/email/verify', payload);
      tokenStore.set(data.data.tokens.accessToken);
      return data.data;
    });
  },

  // ── Login (Phone + Password, no OTP) ────────────────────────────────────────
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

  // ── Password Reset (Email OTP) ──────────────────────────────────────────────
  /**
   * Request a password-reset OTP via email.
   */
  async forgotPasswordEmail(email: string): Promise<{ message: string; expiresIn: number }> {
    return safeCall(async () => {
      const { data } = await api.post('/auth/forgot-password/email', { email });
      return data;
    });
  },
  async verifyResetOtp(email: string, otp: string): Promise<{ success: boolean }> {
    return safeCall(async () => {
      const { data } = await api.post('/auth/verify-reset-otp', { email, otp });
      return data;
    });
  },

  /**
   * Reset password using OTP received via email.
   */
  async resetPasswordEmail(payload: {
    email: string;
    otp: string;
    newPassword: string;
  }): Promise<{ message: string }> {
    return safeCall(async () => {
      const { data } = await api.post('/auth/reset-password/email', payload);
      return data;
    });
  },

  // ── Token Lifecycle ─────────────────────────────────────────────────────────
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

  // ── Session ─────────────────────────────────────────────────────────────────
  async logout(): Promise<void> {
    try {
      await api.post('/auth/logout');
    } finally {
      tokenStore.clear();
    }
  },

  async getMe(): Promise<UserProfile> {
    return safeCall(async () => {
      const { data } = await api.get<{ success: true; data: UserProfile }>('/auth/me');
      return data.data;
    });
  },

  // ── Google OAuth ────────────────────────────────────────────────────────────
  async googleAuth(idToken: string): Promise<AuthResponse['data'] & { isNewUser: boolean }> {
    return safeCall(async () => {
      const { data } = await api.post<AuthResponse>('/auth/google', { idToken });
      tokenStore.set(data.data.tokens.accessToken);
      return data.data as AuthResponse['data'] & { isNewUser: boolean };
    });
  },

  async linkGoogle(idToken: string): Promise<{ message: string }> {
    return safeCall(async () => {
      const { data } = await api.post('/auth/google/link', { idToken });
      return data;
    });
  },

  // ── Health ──────────────────────────────────────────────────────────────────
  async healthCheck(): Promise<{ service: string; status: string; timestamp: string }> {
    return safeCall(async () => {
      const { data } = await api.get('/auth/health');
      return data;
    });
  },
};