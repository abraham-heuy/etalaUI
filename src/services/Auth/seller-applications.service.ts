// src/services/sellerApplication.service.ts
import axios, { type AxiosInstance, AxiosError } from 'axios';

// ─── Axios Instance ────────────────────────────────────────────────────────────
// Reuse the same instance as AuthService (or create a dedicated one)
const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach token (same as auth service)
const TOKEN_KEY = 'auth_access_token';
api.interceptors.request.use(config => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ─── Types ─────────────────────────────────────────────────────────────────────

export interface SellerApplication {
  id: string;
  userId: string;
  fullName: string;
  email?: string;
  phone: string;
  idNumber: string;
  address: string;
  city: string;
  category: string;
  businessName: string;
  businessDescription: string;
  businessAnswers?: Record<string, string>;
  verificationMethod: 'documents' | 'physical' | 'games';
  documentPaths?: string[];
  physicalVisitDetails?: {
    businessName: string;
    businessAddress: string;
    businessPhone: string;
    businessEmail: string;
    preferredDate: string;
    preferredTime: string;
  };
  gamesDiscount?: number;
  status: 'pending' | 'approved' | 'rejected';
  rejectionReason?: string;
  reviewedBy?: string;
  reviewedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PhysicalVisitDetails {
    businessName: string;
    businessAddress: string;
    businessPhone: string;
    businessEmail: string;
    preferredDate: string;
    preferredTime: string;
  }
  
  export interface SubmitApplicationDto {
    fullName: string;
    email?: string;
    phone: string;
    idNumber: string;
    address: string;
    city: string;
    category: string;
    businessName: string;
    businessDescription: string;
    businessAnswers?: Record<string, string>;
    verificationMethod: 'documents' | 'physical' | 'games';
    physicalVisitDetails?: PhysicalVisitDetails;
    gamesDiscount?: number;
  }

export interface ApplicationListResponse {
  success: true;
  data: SellerApplication[];
  meta: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

export interface ApiError {
  success: false;
  error?: string;
  code?: string;
  errors?: { field: string; message: string }[];
}

// ─── Error Handling (same pattern as AuthService) ─────────────────────────────

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
    if (status === 403) return 'You do not have permission for this action.';
    if (status === 404) return 'Application not found.';
    if (status === 409) return 'Conflict: You already have a pending application.';
    if (status && status >= 500) return 'Server error. Please try again later.';
    if (err.code === 'ECONNABORTED') return 'Request timed out. Check your connection.';
    if (err.code === 'ERR_NETWORK') return 'Network error. Check your connection.';
  }
  return 'An unexpected error occurred. Please try again.';
}

export class SellerApplicationError extends Error {
  public readonly code?: string;
  public readonly validationErrors?: { field: string; message: string }[];

  constructor(err: unknown) {
    super(resolveErrorMessage(err));
    this.name = 'SellerApplicationError';
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
    throw new SellerApplicationError(err);
  }
}

// ─── Service ───────────────────────────────────────────────────────────────────

export const SellerApplicationService = {
  /**
   * Submit a new seller application.
   * Uses FormData because of file uploads.
   */
  async submitApplication(formData: FormData): Promise<{ success: true; data: SellerApplication }> {
    return safeCall(async () => {
      const { data } = await api.post('/auth/seller-applications', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return data;
    });
  },

  /**
   * Get the current user's applications (buyer route).
   */
  async getMyApplications(): Promise<SellerApplication[]> {
    return safeCall(async () => {
      const { data } = await api.get<{ success: true; data: SellerApplication[] }>(
        '/auth/seller-applications/my'
      );
      return data.data;
    });
  },

  /**
   * List all applications (admin only).
   */
  async listAll(params?: {
    status?: 'pending' | 'approved' | 'rejected';
    category?: string;
    page?: number;
    limit?: number;
  }): Promise<ApplicationListResponse> {
    return safeCall(async () => {
      const { data } = await api.get<ApplicationListResponse>('/auth/seller-applications', { params });
      return data;
    });
  },

  /**
   * Get a single application by ID (admin only).
   */
  async getById(id: string): Promise<SellerApplication> {
    return safeCall(async () => {
      const { data } = await api.get<{ success: true; data: SellerApplication }>(
        `/auth/seller-applications/${id}`
      );
      return data.data;
    });
  },

  /**
   * Approve an application (admin only).
   */
  async approve(id: string): Promise<{ success: true; data: { application: SellerApplication; profile: any } }> {
    return safeCall(async () => {
      const { data } = await api.patch(`/auth/seller-applications/${id}/approve`);
      return data;
    });
  },

  /**
   * Reject an application with a reason (admin only).
   */
  async reject(id: string, reason: string): Promise<{ success: true; data: SellerApplication }> {
    return safeCall(async () => {
      const { data } = await api.patch(`/auth/seller-applications/${id}/reject`, { reason });
      return data;
    });
  },
};