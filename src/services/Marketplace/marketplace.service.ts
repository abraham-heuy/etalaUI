// src/services/marketplace.service.ts
import axios, { type AxiosInstance } from 'axios';
import { tokenStore } from '../Auth/auth.service';

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

// Types
export interface MarketplaceProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  condition: 'new' | 'like-new' | 'good' | 'fair';
  isMtush: boolean;
  category: string;
  subcategory: string;
  sellerId: string;
  sellerName: string;
  sellerLocation: string;
  sellerRating: number;
  stockQuantity: number;
  rating: number;
  reviewCount: number;
  viewCount: number;
  totalSales: number;
  createdAt: string;
  updatedAt: string;
  brand?: string;
  modelNumber?: string;
  tags?: string[];
}

export interface MarketplaceHomeData {
  featured: MarketplaceProduct[];
  flashSales: MarketplaceProduct[];
  newArrivals: MarketplaceProduct[];
  mtush: MarketplaceProduct[];
  categories: { name: string; count: number; icon?: string }[];
  topSellers: any[];
}

export interface CategoryPageData {
  products: MarketplaceProduct[];
  category: string;
  total: number;
  page: number;
  limit: number;
}

export interface ApiError {
  success?: boolean;
  error?: string;
  errors?: { field: string; message: string }[];
}

function resolveErrorMessage(err: any): string {
  if (axios.isAxiosError(err)) {
    const data = err.response?.data as ApiError;
    if (data?.errors?.length) {
      return data.errors.map(e => `${e.field}: ${e.message}`).join(' | ');
    }
    if (data?.error) return data.error;
    const status = err.response?.status;
    if (status === 400) return 'Invalid request.';
    if (status === 401) return 'Authentication failed.';
    if (status === 403) return 'You do not have permission.';
    if (status === 404) return 'Resource not found.';
    if (status && status >= 500) return 'Server error. Please try again later.';
    if (err.code === 'ECONNABORTED') return 'Request timed out.';
    if (err.code === 'ERR_NETWORK') return 'Network error.';
  }
  return 'An unexpected error occurred.';
}

export class MarketplaceServiceError extends Error {
  constructor(err: unknown) {
    super(resolveErrorMessage(err));
    this.name = 'MarketplaceServiceError';
  }
}

async function safeCall<T>(fn: () => Promise<T>): Promise<T> {
  try {
    return await fn();
  } catch (err) {
    throw new MarketplaceServiceError(err);
  }
}

export const MarketplaceService = {
  async getHome(): Promise<MarketplaceHomeData> {
    return safeCall(async () => {
      const { data } = await api.get('/marketplace/home');
      return data.data;
    });
  },

  async getCategory(category: string, page = 1, limit = 20): Promise<CategoryPageData> {
    return safeCall(async () => {
      const { data } = await api.get(`/marketplace/category/${category}`, { params: { page, limit } });
      return data.data;
    });
  },

// Add to  object
async getDeals(page = 1, limit = 20): Promise<MarketplaceProduct[]> {
  return safeCall(async () => {
    const { data } = await api.get('/marketplace/deals', { params: { page, limit } });
    // Assuming response: { success: true, data: [...] }
    return data.data || [];
  });
},

async getTrending(page = 1, limit = 20): Promise<MarketplaceProduct[]> {
  return safeCall(async () => {
    const { data } = await api.get('/marketplace/trending', { params: { page, limit } });
    return data.data || [];
  });
},

async search(
  query: string,
  page = 1,
  limit = 20,
  category?: string,
  options?: { isMtush?: boolean; condition?: string; minPrice?: number; maxPrice?: number }
): Promise<{ products: MarketplaceProduct[]; total: number }> {
  return safeCall(async () => {
    const params: any = { q: query, page, limit };
    if (category) params.category = category;
    if (options?.isMtush !== undefined) params.isMtush = options.isMtush;
    if (options?.condition) params.condition = options.condition;
    if (options?.minPrice) params.minPrice = options.minPrice;
    if (options?.maxPrice) params.maxPrice = options.maxPrice;
    const { data } = await api.get('/marketplace/search', { params });
    return { products: data.data || [], total: data.meta?.total || 0 };
  });
},

  async getSellerProfile(sellerId: string): Promise<{ seller: any; products: MarketplaceProduct[] }> {
    return safeCall(async () => {
      const { data } = await api.get(`/marketplace/seller/${sellerId}`);
      return data.data;
    });
  },
};