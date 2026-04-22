// services/farmers/farmer.service.ts
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

// Types for farmers API responses
export interface FarmersHomeData {
  featured: FarmersProduct[];
  organic: FarmersProduct[];
  flashSales: FarmersProduct[];   
  newArrivals: FarmersProduct[];  
  categories: { name: string; count: number }[];
  topFarms: {                       
    sellerId: string;
    sellerName: string;
    sellerLocation: string;
    sellerRating: number;
    totalProducts: number;
  }[];
}

export interface FarmersProduct {
  id: string;
  sellerId: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  unit: 'kg' | 'bunch' | 'piece' | 'bundle';
  harvestDate?: string;
  organic: boolean;
  isCertified?: boolean;
  subcategory?: string;
  farmLocation?: string;
  minOrderQuantity?: number;
  availableQuantity?: number;
  sellerName?: string;
  sellerRating?: number;
  sellerLocation?: string;
  isFeatured?: boolean;
  tags?: string[];
  reviewCount?: number;
  createdAt: string;
}

export interface FarmersDealsResponse {
  deals: FarmersProduct[];
}

export interface FarmersSearchResponse {
  products: FarmersProduct[];
  total: number;
}

export interface FarmersSellerProfile {
  seller: {
    sellerId: string;
    sellerName: string;
    sellerLocation: string;
    sellerVerified: boolean;
    sellerRating: number;
    totalProducts: number;
  };
  products: FarmersProduct[];
}

class FarmersService {
  async getHome(): Promise<FarmersHomeData> {
    const { data } = await api.get('/farmers/home');
    return data.data;
  }
  async search(query: string, page = 1, limit = 20, subcategory?: string, organic?: boolean): Promise<FarmersSearchResponse> {
    const params: any = { q: query, page, limit };
    if (subcategory) params.subcategory = subcategory;  
    if (organic !== undefined) params.isOrganic = organic; 
    const { data } = await api.get('/farmers/search', { params });
    return { products: data.data, total: data.meta?.total || 0 };
  }
  async getDeals(page = 1, limit = 20): Promise<FarmersDealsResponse> {
    const { data } = await api.get('/farmers/deals', { params: { page, limit } });
    return { deals: data.data };
  }

  async getSellerProfile(sellerId: string): Promise<FarmersSellerProfile> {
    const { data } = await api.get(`/farmers/seller/${sellerId}`);
    return data.data;
  }
}

export const farmersService = new FarmersService();