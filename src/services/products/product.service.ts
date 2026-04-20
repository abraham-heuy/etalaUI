// src/services/product.service.ts
import axios, { type AxiosInstance } from 'axios';
import { tokenStore } from '../Auth/auth.service';

// ─── Axios Instance (reuse same baseURL and interceptor) ──────────────────────
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

// ─── Shared Types ─────────────────────────────────────────────────────────────
export interface ApiError {
  success: false;
  error?: string;
  code?: string;
  errors?: { field: string; message: string }[];
}

export interface BaseProduct {
  id: string;
  sellerId: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  stock?: number;          // not all product types have stock
  isFlashSale: boolean;
  flashSalePrice?: number;
  flashSaleEndsAt?: string;
  isPromo: boolean;
  promoPrice?: number;
  promoEndsAt?: string;
  createdAt: string;
  updatedAt: string;
}


export interface MarketplaceProduct extends BaseProduct {
  category: string;
  brand?: string;
  condition: 'new' | 'used' | 'refurbished';
  
  // Additional fields returned by the API (used in product detail page)
  rating?: number;
  reviewCount?: number;
  sellerName?: string;
  sellerRating?: number;
  totalSales?: number;
  sellerLocation?: string;
  stockQuantity?: number;        // alias for stock
  originalPrice?: number;        // original price before discount
  tags?: string[];
  isMtush?: boolean;             // pre-owned flag
  subcategory?: string;
  modelNumber?: string;
}
// Farmers product (fresh produce, crops, etc.)
export interface FarmersProduct extends BaseProduct {
  unit: 'kg' | 'bunch' | 'piece' | 'bundle';
  harvestDate?: string;
  organic: boolean;
}

// Food product (prepared meals, restaurant items)
export interface FoodProduct extends BaseProduct {
  cuisine?: string;
  dietary?: string[];     // e.g., ['vegetarian', 'vegan', 'gluten-free']
  preparationTime?: number; // minutes
  isAvailable: boolean;
}

// Stays (accommodation)
export interface StaysProduct extends BaseProduct {
  location: string;
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
  amenities: string[];
  checkInTime: string;
  checkOutTime: string;
}

// Boda (transport / taxi / delivery)
export interface BodaProduct extends BaseProduct {
  vehicleType: 'boda' | 'taxi' | 'tuk-tuk' | 'delivery';
  seats: number;
  luggageCapacity?: string;
  areaCoverage: string[];
}

// Services (professional services)
export interface ServicesProduct extends BaseProduct {
  serviceType: string;
  duration: number;       // minutes
  locationType: 'online' | 'onsite' | 'both';
  credentials?: string[];
}

// ─── Error Handling (identical to commerce.service) ───────────────────────────
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
    if (status === 409) return 'Conflict: The resource already exists.';
    if (status && status >= 500) return 'Server error. Please try again later.';
    if (err.code === 'ECONNABORTED') return 'Request timed out. Check your connection.';
    if (err.code === 'ERR_NETWORK') return 'Network error. Check your connection.';
  }
  return 'An unexpected error occurred. Please try again.';
}

export class ProductServiceError extends Error {
  public readonly code?: string;
  public readonly validationErrors?: { field: string; message: string }[];
  constructor(err: unknown) {
    super(resolveErrorMessage(err));
    this.name = 'ProductServiceError';
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
    throw new ProductServiceError(err);
  }
}

// ─── Product Service ──────────────────────────────────────────────────────────
// All methods are grouped by product category (marketplace, farmers, food, stays, boda, services)
// Each category supports: list, getById, getMyProducts, getBySeller, create, update, delete, setFlashSale, setPromo

export const ProductService = {
  // ==================== HEALTH ====================
  async health(): Promise<{ service: string; status: string; timestamp: string }> {
    return safeCall(async () => {
      const { data } = await api.get('/products/health');
      return data;
    });
  },

  // ==================== MARKETPLACE ====================
  marketplace: {
    list: async (): Promise<MarketplaceProduct[]> => {
      return safeCall(async () => {
        const { data } = await api.get<{ success: true; data: MarketplaceProduct[] }>('/products/marketplace');
        return data.data;
      });
    },
    getById: async (id: string): Promise<MarketplaceProduct> => {
      return safeCall(async () => {
        const { data } = await api.get<{ success: true; data: MarketplaceProduct }>(`/products/marketplace/${id}`);
        return data.data;
      });
    },
    getMyProducts: async (): Promise<MarketplaceProduct[]> => {
      return safeCall(async () => {
        const { data } = await api.get<{ success: true; data: MarketplaceProduct[] }>('/products/marketplace/my');
        return data.data;
      });
    },
    getBySeller: async (sellerId: string): Promise<MarketplaceProduct[]> => {
      return safeCall(async () => {
        const { data } = await api.get<{ success: true; data: MarketplaceProduct[] }>(`/products/marketplace/seller/${sellerId}`);
        return data.data;
      });
    },
    create: async (formData: FormData): Promise<MarketplaceProduct> => {
      return safeCall(async () => {
        const { data } = await api.post<{ success: true; data: MarketplaceProduct }>('/products/marketplace', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        return data.data;
      });
    },
    update: async (id: string, formData: FormData): Promise<MarketplaceProduct> => {
      return safeCall(async () => {
        const { data } = await api.put<{ success: true; data: MarketplaceProduct }>(`/products/marketplace/${id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        return data.data;
      });
    },
    delete: async (id: string): Promise<{ success: true }> => {
      return safeCall(async () => {
        const { data } = await api.delete(`/products/marketplace/${id}`);
        return data;
      });
    },
    setFlashSale: async (id: string, flashSalePrice: number, endsAt: string): Promise<MarketplaceProduct> => {
      return safeCall(async () => {
        const { data } = await api.patch<{ success: true; data: MarketplaceProduct }>(`/products/marketplace/${id}/flash-sale`, { flashSalePrice, endsAt });
        return data.data;
      });
    },
    setPromo: async (id: string, promoPrice: number, endsAt: string): Promise<MarketplaceProduct> => {
      return safeCall(async () => {
        const { data } = await api.patch<{ success: true; data: MarketplaceProduct }>(`/products/marketplace/${id}/promo`, { promoPrice, endsAt });
        return data.data;
      });
    },
  },

  // ==================== FARMERS ====================
  farmers: {
    list: async (): Promise<FarmersProduct[]> => {
      return safeCall(async () => {
        const { data } = await api.get<{ success: true; data: FarmersProduct[] }>('/products/farmers');
        return data.data;
      });
    },
    getById: async (id: string): Promise<FarmersProduct> => {
      return safeCall(async () => {
        const { data } = await api.get<{ success: true; data: FarmersProduct }>(`/products/farmers/${id}`);
        return data.data;
      });
    },
    getMyProducts: async (): Promise<FarmersProduct[]> => {
      return safeCall(async () => {
        const { data } = await api.get<{ success: true; data: FarmersProduct[] }>('/products/farmers/my');
        return data.data;
      });
    },
    getBySeller: async (sellerId: string): Promise<FarmersProduct[]> => {
      return safeCall(async () => {
        const { data } = await api.get<{ success: true; data: FarmersProduct[] }>(`/products/farmers/seller/${sellerId}`);
        return data.data;
      });
    },
    create: async (formData: FormData): Promise<FarmersProduct> => {
      return safeCall(async () => {
        const { data } = await api.post<{ success: true; data: FarmersProduct }>('/products/farmers', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        return data.data;
      });
    },
    update: async (id: string, formData: FormData): Promise<FarmersProduct> => {
      return safeCall(async () => {
        const { data } = await api.put<{ success: true; data: FarmersProduct }>(`/products/farmers/${id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        return data.data;
      });
    },
    delete: async (id: string): Promise<{ success: true }> => {
      return safeCall(async () => {
        const { data } = await api.delete(`/products/farmers/${id}`);
        return data;
      });
    },
    setFlashSale: async (id: string, flashSalePrice: number, endsAt: string): Promise<FarmersProduct> => {
      return safeCall(async () => {
        const { data } = await api.patch<{ success: true; data: FarmersProduct }>(`/products/farmers/${id}/flash-sale`, { flashSalePrice, endsAt });
        return data.data;
      });
    },
    setPromo: async (id: string, promoPrice: number, endsAt: string): Promise<FarmersProduct> => {
      return safeCall(async () => {
        const { data } = await api.patch<{ success: true; data: FarmersProduct }>(`/products/farmers/${id}/promo`, { promoPrice, endsAt });
        return data.data;
      });
    },
  },

  // ==================== FOOD ====================
  food: {
    list: async (): Promise<FoodProduct[]> => {
      return safeCall(async () => {
        const { data } = await api.get<{ success: true; data: FoodProduct[] }>('/products/food');
        return data.data;
      });
    },
    getById: async (id: string): Promise<FoodProduct> => {
      return safeCall(async () => {
        const { data } = await api.get<{ success: true; data: FoodProduct }>(`/products/food/${id}`);
        return data.data;
      });
    },
    getMyProducts: async (): Promise<FoodProduct[]> => {
      return safeCall(async () => {
        const { data } = await api.get<{ success: true; data: FoodProduct[] }>('/products/food/my');
        return data.data;
      });
    },
    getBySeller: async (sellerId: string): Promise<FoodProduct[]> => {
      return safeCall(async () => {
        const { data } = await api.get<{ success: true; data: FoodProduct[] }>(`/products/food/seller/${sellerId}`);
        return data.data;
      });
    },
    create: async (formData: FormData): Promise<FoodProduct> => {
      return safeCall(async () => {
        const { data } = await api.post<{ success: true; data: FoodProduct }>('/products/food', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        return data.data;
      });
    },
    update: async (id: string, formData: FormData): Promise<FoodProduct> => {
      return safeCall(async () => {
        const { data } = await api.put<{ success: true; data: FoodProduct }>(`/products/food/${id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        return data.data;
      });
    },
    delete: async (id: string): Promise<{ success: true }> => {
      return safeCall(async () => {
        const { data } = await api.delete(`/products/food/${id}`);
        return data;
      });
    },
    setFlashSale: async (id: string, flashSalePrice: number, endsAt: string): Promise<FoodProduct> => {
      return safeCall(async () => {
        const { data } = await api.patch<{ success: true; data: FoodProduct }>(`/products/food/${id}/flash-sale`, { flashSalePrice, endsAt });
        return data.data;
      });
    },
    setPromo: async (id: string, promoPrice: number, endsAt: string): Promise<FoodProduct> => {
      return safeCall(async () => {
        const { data } = await api.patch<{ success: true; data: FoodProduct }>(`/products/food/${id}/promo`, { promoPrice, endsAt });
        return data.data;
      });
    },
  },

  // ==================== STAYS ====================
  stays: {
    list: async (): Promise<StaysProduct[]> => {
      return safeCall(async () => {
        const { data } = await api.get<{ success: true; data: StaysProduct[] }>('/products/stays');
        return data.data;
      });
    },
    getById: async (id: string): Promise<StaysProduct> => {
      return safeCall(async () => {
        const { data } = await api.get<{ success: true; data: StaysProduct }>(`/products/stays/${id}`);
        return data.data;
      });
    },
    getMyProducts: async (): Promise<StaysProduct[]> => {
      return safeCall(async () => {
        const { data } = await api.get<{ success: true; data: StaysProduct[] }>('/products/stays/my');
        return data.data;
      });
    },
    getBySeller: async (sellerId: string): Promise<StaysProduct[]> => {
      return safeCall(async () => {
        const { data } = await api.get<{ success: true; data: StaysProduct[] }>(`/products/stays/seller/${sellerId}`);
        return data.data;
      });
    },
    create: async (formData: FormData): Promise<StaysProduct> => {
      return safeCall(async () => {
        const { data } = await api.post<{ success: true; data: StaysProduct }>('/products/stays', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        return data.data;
      });
    },
    update: async (id: string, formData: FormData): Promise<StaysProduct> => {
      return safeCall(async () => {
        const { data } = await api.put<{ success: true; data: StaysProduct }>(`/products/stays/${id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        return data.data;
      });
    },
    delete: async (id: string): Promise<{ success: true }> => {
      return safeCall(async () => {
        const { data } = await api.delete(`/products/stays/${id}`);
        return data;
      });
    },
    setFlashSale: async (id: string, flashSalePrice: number, endsAt: string): Promise<StaysProduct> => {
      return safeCall(async () => {
        const { data } = await api.patch<{ success: true; data: StaysProduct }>(`/products/stays/${id}/flash-sale`, { flashSalePrice, endsAt });
        return data.data;
      });
    },
    setPromo: async (id: string, promoPrice: number, endsAt: string): Promise<StaysProduct> => {
      return safeCall(async () => {
        const { data } = await api.patch<{ success: true; data: StaysProduct }>(`/products/stays/${id}/promo`, { promoPrice, endsAt });
        return data.data;
      });
    },
  },

  // ==================== BODA ====================
  boda: {
    list: async (): Promise<BodaProduct[]> => {
      return safeCall(async () => {
        const { data } = await api.get<{ success: true; data: BodaProduct[] }>('/products/boda');
        return data.data;
      });
    },
    getById: async (id: string): Promise<BodaProduct> => {
      return safeCall(async () => {
        const { data } = await api.get<{ success: true; data: BodaProduct }>(`/products/boda/${id}`);
        return data.data;
      });
    },
    getMyProducts: async (): Promise<BodaProduct[]> => {
      return safeCall(async () => {
        const { data } = await api.get<{ success: true; data: BodaProduct[] }>('/products/boda/my');
        return data.data;
      });
    },
    getBySeller: async (sellerId: string): Promise<BodaProduct[]> => {
      return safeCall(async () => {
        const { data } = await api.get<{ success: true; data: BodaProduct[] }>(`/products/boda/seller/${sellerId}`);
        return data.data;
      });
    },
    create: async (formData: FormData): Promise<BodaProduct> => {
      return safeCall(async () => {
        const { data } = await api.post<{ success: true; data: BodaProduct }>('/products/boda', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        return data.data;
      });
    },
    update: async (id: string, formData: FormData): Promise<BodaProduct> => {
      return safeCall(async () => {
        const { data } = await api.put<{ success: true; data: BodaProduct }>(`/products/boda/${id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        return data.data;
      });
    },
    delete: async (id: string): Promise<{ success: true }> => {
      return safeCall(async () => {
        const { data } = await api.delete(`/products/boda/${id}`);
        return data;
      });
    },
    setFlashSale: async (id: string, flashSalePrice: number, endsAt: string): Promise<BodaProduct> => {
      return safeCall(async () => {
        const { data } = await api.patch<{ success: true; data: BodaProduct }>(`/products/boda/${id}/flash-sale`, { flashSalePrice, endsAt });
        return data.data;
      });
    },
    setPromo: async (id: string, promoPrice: number, endsAt: string): Promise<BodaProduct> => {
      return safeCall(async () => {
        const { data } = await api.patch<{ success: true; data: BodaProduct }>(`/products/boda/${id}/promo`, { promoPrice, endsAt });
        return data.data;
      });
    },
  },

  // ==================== SERVICES ====================
  services: {
    list: async (): Promise<ServicesProduct[]> => {
      return safeCall(async () => {
        const { data } = await api.get<{ success: true; data: ServicesProduct[] }>('/products/services');
        return data.data;
      });
    },
    getById: async (id: string): Promise<ServicesProduct> => {
      return safeCall(async () => {
        const { data } = await api.get<{ success: true; data: ServicesProduct }>(`/products/services/${id}`);
        return data.data;
      });
    },
    getMyProducts: async (): Promise<ServicesProduct[]> => {
      return safeCall(async () => {
        const { data } = await api.get<{ success: true; data: ServicesProduct[] }>('/products/services/my');
        return data.data;
      });
    },
    getBySeller: async (sellerId: string): Promise<ServicesProduct[]> => {
      return safeCall(async () => {
        const { data } = await api.get<{ success: true; data: ServicesProduct[] }>(`/products/services/seller/${sellerId}`);
        return data.data;
      });
    },
    create: async (formData: FormData): Promise<ServicesProduct> => {
      return safeCall(async () => {
        const { data } = await api.post<{ success: true; data: ServicesProduct }>('/products/services', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        return data.data;
      });
    },
    update: async (id: string, formData: FormData): Promise<ServicesProduct> => {
      return safeCall(async () => {
        const { data } = await api.put<{ success: true; data: ServicesProduct }>(`/products/services/${id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        return data.data;
      });
    },
    delete: async (id: string): Promise<{ success: true }> => {
      return safeCall(async () => {
        const { data } = await api.delete(`/products/services/${id}`);
        return data;
      });
    },
    setFlashSale: async (id: string, flashSalePrice: number, endsAt: string): Promise<ServicesProduct> => {
      return safeCall(async () => {
        const { data } = await api.patch<{ success: true; data: ServicesProduct }>(`/products/services/${id}/flash-sale`, { flashSalePrice, endsAt });
        return data.data;
      });
    },
    setPromo: async (id: string, promoPrice: number, endsAt: string): Promise<ServicesProduct> => {
      return safeCall(async () => {
        const { data } = await api.patch<{ success: true; data: ServicesProduct }>(`/products/services/${id}/promo`, { promoPrice, endsAt });
        return data.data;
      });
    },
  },
};