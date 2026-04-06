// src/services/delivery.service.ts
import axios, { type AxiosInstance } from 'axios';
import { tokenStore } from './auth.service'; // reuse token management

// ─── Axios Instance ────────────────────────────────────────────────────────────
const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use(config => {
  const token = tokenStore.get();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ─── Types ─────────────────────────────────────────────────────────────────────
export type VehicleType = 'bicycle' | 'motorcycle' | 'car';

export interface DeliveryApplication {
  id: string;
  applicationNumber: string;
  userId: string;
  fullName: string;
  idNumber: string;
  phone: string;
  location: string;
  vehicleType: VehicleType;
  licenseNumber: string;
  vehicleRegistration?: string;
  priorExperience?: string;
  whyJoin: string;
  availabilityHours: string;
  availabilityDays: string[];
  profilePhotoPath?: string;
  documentPaths: string[];
  status: 'pending' | 'approved' | 'rejected';
  reviewedAt?: string;
  rejectionReason?: string;
  reviewedBy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface DeliveryStaffProfile {
  id: string;
  userId: string;
  fullName: string;
  phone: string;
  vehicleType: VehicleType;
  licenseNumber: string;
  vehicleRegistration: string;
  availabilityHours: string;
  availabilityDays: string[];
  currentLocation: string;
  deliveryZones: string[];
  status: 'active' | 'inactive' | 'suspended';
  rating: number;
  totalDeliveries: number;
  completedDeliveries: number;
  isAvailableNow: boolean;
  backgroundCheckStatus: 'pending' | 'passed' | 'failed';
  profilePhotoPath?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SuggestDriverParams {
  pickupLocation: string;
  zone?: string;
  vehicleType?: VehicleType;
  limit?: number;
}

export interface SuggestDriverResponse {
  id: string;
  userId: string;
  fullName: string;
  phone: string;
  profilePhotoPath?: string;
  vehicleType: VehicleType;
  currentLocation: string;
  deliveryZones: string[];
  rating: number;
  completedDeliveries: number;
  isAvailableNow: boolean;
}

export interface ApiError {
  success: false;
  error?: string;
  code?: string;
  errors?: { field: string; message: string }[];
}

// ─── Error Handling (same pattern) ────────────────────────────────────────────
function resolveErrorMessage(err: any): string {
  if (axios.isAxiosError(err)) {
    const data = err.response?.data as ApiError | undefined;
    if (data?.errors?.length) {
      return data.errors.map(e => `${e.field}: ${e.message}`).join(' | ');
    }
    if (data?.error) return data.error;
    const status = err.response?.status;
    if (status === 400) return 'Invalid request. Please check your input.';
    if (status === 401) return 'Authentication failed. Please log in again.';
    if (status === 403) return 'You do not have permission for this action.';
    if (status === 404) return 'Resource not found.';
    if (status === 409) return 'Conflict: You already have a pending application.';
    if (status && status >= 500) return 'Server error. Please try again later.';
    if (err.code === 'ECONNABORTED') return 'Request timed out. Check your connection.';
    if (err.code === 'ERR_NETWORK') return 'Network error. Check your connection.';
  }
  return 'An unexpected error occurred. Please try again.';
}

export class DeliveryServiceError extends Error {
  public readonly code?: string;
  public readonly validationErrors?: { field: string; message: string }[];
  constructor(err: unknown) {
    super(resolveErrorMessage(err));
    this.name = 'DeliveryServiceError';
    if (axios.isAxiosError(err)) {
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
    throw new DeliveryServiceError(err);
  }
}

// ─── Service ───────────────────────────────────────────────────────────────────
export const DeliveryService = {
  /**
   * Submit a delivery driver application (multipart/form-data).
   */
  async apply(formData: FormData): Promise<{ success: true; data: DeliveryApplication }> {
    return safeCall(async () => {
      const { data } = await api.post('/auth/delivery/apply', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return data;
    });
  },

  /**
   * Get the current user's application.
   */
  async getMyApplication(): Promise<DeliveryApplication | null> {
    return safeCall(async () => {
      const { data } = await api.get<{ success: true; data: DeliveryApplication | null }>(
        '/delivery/my-application'
      );
      return data.data;
    });
  },

  /**
   * Get the driver's profile (if approved).
   */
  async getMyProfile(): Promise<DeliveryStaffProfile> {
    return safeCall(async () => {
      const { data } = await api.get<{ success: true; data: DeliveryStaffProfile }>(
        '/delivery/my-profile'
      );
      return data.data;
    });
  },

  /**
   * Toggle online/offline availability.
   */
  async toggleAvailability(): Promise<{ isAvailableNow: boolean }> {
    return safeCall(async () => {
      const { data } = await api.patch<{ success: true; data: { isAvailableNow: boolean } }>(
        '/auth/delivery/toggle-availability'
      );
      return data.data;
    });
  },

  /**
   * Update current location.
   */
  async updateLocation(location: string, lat?: number, lng?: number): Promise<{ currentLocation: string }> {
    return safeCall(async () => {
      const { data } = await api.patch<{ success: true; data: { currentLocation: string } }>(
        '/auth/delivery/update-location',
        { location, lat, lng }
      );
      return data.data;
    });
  },

  /**
   * Public endpoint to suggest nearby drivers for an order.
   */
  async suggestDrivers(params: SuggestDriverParams): Promise<SuggestDriverResponse[]> {
    return safeCall(async () => {
      const { data } = await api.get<{ success: true; data: SuggestDriverResponse[] }>(
        '/delivery/suggest',
        { params }
      );
      return data.data;
    });
  },

  // ─── Admin endpoints ─────────────────────────────────────────────────────────
  async listApplications(params?: {
    status?: 'pending' | 'approved' | 'rejected';
    vehicleType?: VehicleType;
    page?: number;
    limit?: number;
  }): Promise<{ data: DeliveryApplication[]; total: number }> {
    return safeCall(async () => {
      const { data } = await api.get('/auth/delivery/applications', { params });
      return { data: data.data, total: data.meta?.total || data.data.length };
    });
  },

  async getApplicationById(id: string): Promise<DeliveryApplication> {
    return safeCall(async () => {
      const { data } = await api.get<{ success: true; data: DeliveryApplication }>(
        `/delivery/applications/${id}`
      );
      return data.data;
    });
  },

  async approveApplication(id: string): Promise<{ application: DeliveryApplication; staff: DeliveryStaffProfile }> {
    return safeCall(async () => {
      const { data } = await api.patch(`/auth/delivery/applications/${id}/approve`);
      return data.data;
    });
  },

  async rejectApplication(id: string, reason: string): Promise<DeliveryApplication> {
    return safeCall(async () => {
      const { data } = await api.patch(`/auth/delivery/applications/${id}/reject`, { reason });
      return data.data;
    });
  },

  async listStaff(params?: {
    status?: 'active' | 'inactive' | 'suspended';
    backgroundCheckStatus?: 'pending' | 'passed' | 'failed';
    vehicleType?: VehicleType;
    zone?: string;
    isAvailableNow?: boolean;
    page?: number;
    limit?: number;
  }): Promise<{ data: DeliveryStaffProfile[]; total: number }> {
    return safeCall(async () => {
      const { data } = await api.get('/auth/delivery/staff', { params });
      return { data: data.data, total: data.meta?.total || data.data.length };
    });
  },

  async updateStaffStatus(staffId: string, status: 'active' | 'inactive' | 'suspended'): Promise<DeliveryStaffProfile> {
    return safeCall(async () => {
      const { data } = await api.patch(`/auth/delivery/staff/${staffId}/status`, { status });
      return data.data;
    });
  },

  async updateBackgroundCheck(staffId: string, status: 'pending' | 'passed' | 'failed'): Promise<DeliveryStaffProfile> {
    return safeCall(async () => {
      const { data } = await api.patch(`/auth/delivery/staff/${staffId}/background-check`, { status });
      return data.data;
    });
  },

  async updateZones(staffId: string, zones: string[]): Promise<DeliveryStaffProfile> {
    return safeCall(async () => {
      const { data } = await api.patch(`/auth/delivery/staff/${staffId}/zones`, { zones });
      return data.data;
    });
  },
};