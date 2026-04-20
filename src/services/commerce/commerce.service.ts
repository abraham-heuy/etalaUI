// src/services/commerce.service.ts
import axios, { type AxiosInstance } from 'axios';
import { tokenStore } from '../Auth/auth.service';

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
export interface CartItem {
  id?: string; 
  productId: string;
  productType: string; // e.g., 'marketplace', 'farmers', 'food', etc.
  name: string;
  price: number;
  quantity: number;
  image?: string;
  sellerId: string;
  sellerName?: string;
}

export interface Cart {
  id: string;
  userId: string;
  category: string;
  items: CartItem[];
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
}

export interface WishlistItem {
  id: string;
  productId: string;
  productType: string;
  name: string;
  price: number;
  image?: string;
  sellerId: string;
  addedAt: string;
}

export interface Wishlist {
  id: string;
  userId: string;
  items: WishlistItem[];
}

export interface OrderItem {
  productId: string;
  productType: string;
  name: string;
  quantity: number;
  price: number;
  sellerId: string;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'failed';
  paymentId?: string;
  shippingAddress: {
    fullName: string;
    phone: string;
    address: string;
    city: string;
  };
  createdAt: string;
  updatedAt: string;
  // Optional fields that might be present
  deliveredAt?: string;
  cancelledAt?: string;
  estimatedDelivery?: string;
  trackingNumber?: string;
  timeline?: Array<{
    date: string;
    description: string;
    completed: boolean;
  }>;
}

export interface Review {
  id: string;
  userId: string;
  productId: string;
  productType: string;
  rating: number;
  comment: string;
  images?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'order' | 'payment' | 'system' | 'promotion';
  isRead: boolean;
  createdAt: string;
}

export interface Booking {
  id: string;
  userId: string;
  sellerId: string;
  serviceType: string;
  startDate: string;
  endDate: string;
  status: 'pending' | 'confirmed' | 'rejected' | 'cancelled' | 'completed';
  totalPrice: number;
  details: Record<string, any>;
  createdAt: string;
}

export interface ApiError {
  success: false;
  error?: string;
  code?: string;
  errors?: { field: string; message: string }[];
}

// ─── Error Handling ────────────────────────────────────────────────────────────
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

export class CommerceServiceError extends Error {
  public readonly code?: string;
  public readonly validationErrors?: { field: string; message: string }[];
  constructor(err: unknown) {
    super(resolveErrorMessage(err));
    this.name = 'CommerceServiceError';
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
    throw new CommerceServiceError(err);
  }
}

// ─── Commerce Service ──────────────────────────────────────────────────────────

export const CommerceService = {
  // ==================== Cart ====================
  async getCart(category: string): Promise<Cart> {
    return safeCall(async () => {
      const { data } = await api.get<{ success: true; data: Cart }>(`/commerce/cart/${category}`);
      return data.data;
    });
  },

  async getAllCarts(): Promise<Cart[]> {
    return safeCall(async () => {
      const { data } = await api.get<{ success: true; data: Cart[] }>('/commerce/cart');
      return data.data;
    });
  },

  async addToCart(category: string, item: Omit<CartItem, 'name' | 'price' | 'sellerName'> & { name?: string; price?: number }): Promise<Cart> {
    return safeCall(async () => {
      const { data } = await api.post<{ success: true; data: Cart }>(`/commerce/cart/${category}/items`, item);
      return data.data;
    });
  },

  async updateCartItemQuantity(category: string, itemId: string, quantity: number): Promise<Cart> {
    return safeCall(async () => {
      const { data } = await api.patch<{ success: true; data: Cart }>(`/commerce/cart/${category}/items/${itemId}`, { quantity });
      return data.data;
    });
  },

  async removeCartItem(category: string, itemId: string): Promise<Cart> {
    return safeCall(async () => {
      const { data } = await api.delete<{ success: true; data: Cart }>(`/commerce/cart/${category}/items/${itemId}`);
      return data.data;
    });
  },

  async clearCart(category: string): Promise<{ success: true }> {
    return safeCall(async () => {
      const { data } = await api.delete(`/commerce/cart/${category}`);
      return data;
    });
  },

  // ==================== Wishlist ====================
  async getWishlist(): Promise<Wishlist> {
    return safeCall(async () => {
      const { data } = await api.get<{ success: true; data: Wishlist }>('/commerce/wishlist');
      return data.data;
    });
  },

  async addToWishlist(
    productId: string,
    productType: string,
    productName: string,
    sellerName: string,
    productCategory: string,
    sellerId: string,
    price: number
  ): Promise<Wishlist> {
    return safeCall(async () => {
      const { data } = await api.post<{ success: true; data: Wishlist }>('/commerce/wishlist/items', {
        productId,
        productType,
        productName,
        sellerName,
        productCategory,
        sellerId,
        price,
      });
      return data.data;
    });
  },

  async toggleWishlist(productId: string, productType: string): Promise<{ added: boolean; wishlist: Wishlist }> {
    return safeCall(async () => {
      const { data } = await api.post<{ success: true; data: { added: boolean; wishlist: Wishlist } }>('/commerce/wishlist/toggle', { productId, productType });
      return data.data;
    });
  },

  async checkWishlisted(productId: string): Promise<{ isWishlisted: boolean }> {
    return safeCall(async () => {
      const { data } = await api.get<{ success: true; data: { isWishlisted: boolean } }>(`/commerce/wishlist/check/${productId}`);
      return data.data;
    });
  },

  async moveToCart(itemId: string): Promise<{ cart: Cart; wishlist: Wishlist }> {
    return safeCall(async () => {
      const { data } = await api.post<{ success: true; data: { cart: Cart; wishlist: Wishlist } }>(`/commerce/wishlist/items/${itemId}/move-to-cart`);
      return data.data;
    });
  },

  async removeWishlistItem(itemId: string): Promise<Wishlist> {
    return safeCall(async () => {
      const { data } = await api.delete<{ success: true; data: Wishlist }>(`/commerce/wishlist/items/${itemId}`);
      return data.data;
    });
  },

  async clearWishlist(): Promise<{ success: true }> {
    return safeCall(async () => {
      const { data } = await api.delete('/commerce/wishlist');
      return data;
    });
  },

  // ==================== Orders ====================
  async placeOrder(orderData: {
    category: string;
    userName: string;
    userEmail?: string;
    deliveryAddress: string;
    paymentMethod: string;
    notes?: string;
  }): Promise<Order> {
    return safeCall(async () => {
      const { data } = await api.post<{ success: true; data: Order }>('/commerce/orders', orderData);
      return data.data;
    });
  },

  async getMyOrders(): Promise<Order[]> {
    return safeCall(async () => {
      const { data } = await api.get<{ success: true; data: Order[] }>('/commerce/orders');
      return data.data;
    });
  },

  async getOrderById(id: string): Promise<Order> {
    return safeCall(async () => {
      const { data } = await api.get<{ success: true; data: Order }>(`/commerce/orders/${id}`);
      return data.data;
    });
  },

  async cancelOrder(id: string): Promise<Order> {
    return safeCall(async () => {
      const { data } = await api.patch<{ success: true; data: Order }>(`/commerce/orders/${id}/cancel`);
      return data.data;
    });
  },

  async updateOrderStatus(id: string, status: Order['status']): Promise<Order> {
    return safeCall(async () => {
      const { data } = await api.patch<{ success: true; data: Order }>(`/commerce/orders/${id}/status`, { status });
      return data.data;
    });
  },

  async listAllOrders(params?: { page?: number; limit?: number; status?: string }): Promise<{ data: Order[]; total: number }> {
    return safeCall(async () => {
      const { data } = await api.get('/commerce/orders/admin/all', { params });
      return { data: data.data, total: data.meta?.total || data.data.length };
    });
  },

  // ==================== Reviews ====================
  async createReview(reviewData: { productId: string; productType: string; rating: number; comment: string; images?: File[] }): Promise<Review> {
    const formData = new FormData();
    formData.append('productId', reviewData.productId);
    formData.append('productType', reviewData.productType);
    formData.append('rating', String(reviewData.rating));
    formData.append('comment', reviewData.comment);
    reviewData.images?.forEach(img => formData.append('images', img));
    return safeCall(async () => {
      const { data } = await api.post<{ success: true; data: Review }>('/commerce/reviews', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return data.data;
    });
  },

  async getMyReviews(): Promise<Review[]> {
    return safeCall(async () => {
      const { data } = await api.get<{ success: true; data: Review[] }>('/commerce/reviews/my');
      return data.data;
    });
  },

  async getProductReviews(productId: string): Promise<Review[]> {
    return safeCall(async () => {
      const { data } = await api.get<{ success: true; data: Review[] }>(`/commerce/reviews/product/${productId}`);
      return data.data;
    });
  },

  async getSellerReviews(sellerId: string): Promise<Review[]> {
    return safeCall(async () => {
      const { data } = await api.get<{ success: true; data: Review[] }>(`/commerce/reviews/seller/${sellerId}`);
      return data.data;
    });
  },

  async deleteReview(reviewId: string): Promise<{ success: true }> {
    return safeCall(async () => {
      const { data } = await api.delete(`/commerce/reviews/${reviewId}`);
      return data;
    });
  },

  // ==================== Notifications ====================
  async getNotifications(): Promise<Notification[]> {
    return safeCall(async () => {
      const { data } = await api.get<{ success: true; data: Notification[] }>('/commerce/notifications');
      return data.data;
    });
  },

  async getUnreadCount(): Promise<number> {
    return safeCall(async () => {
      const { data } = await api.get<{ success: true; data: { count: number } }>('/commerce/notifications/unread-count');
      return data.data.count;
    });
  },

  async markNotificationAsRead(id: string): Promise<Notification> {
    return safeCall(async () => {
      const { data } = await api.patch<{ success: true; data: Notification }>(`/commerce/notifications/${id}/read`);
      return data.data;
    });
  },

  async markAllNotificationsAsRead(): Promise<{ success: true }> {
    return safeCall(async () => {
      const { data } = await api.patch('/commerce/notifications/read-all');
      return data;
    });
  },

  async deleteNotification(id: string): Promise<{ success: true }> {
    return safeCall(async () => {
      const { data } = await api.delete(`/commerce/notifications/${id}`);
      return data;
    });
  },

  // ==================== Bookings ====================
  async createBooking(bookingData: Partial<Booking>): Promise<Booking> {
    return safeCall(async () => {
      const { data } = await api.post<{ success: true; data: Booking }>('/commerce/bookings', bookingData);
      return data.data;
    });
  },

  async getMyBookings(): Promise<Booking[]> {
    return safeCall(async () => {
      const { data } = await api.get<{ success: true; data: Booking[] }>('/commerce/bookings/my');
      return data.data;
    });
  },

  async getSellerBookings(): Promise<Booking[]> {
    return safeCall(async () => {
      const { data } = await api.get<{ success: true; data: Booking[] }>('/commerce/bookings/seller');
      return data.data;
    });
  },

  async checkAvailability(params: { serviceType: string; startDate: string; endDate: string }): Promise<{ available: boolean; price?: number }> {
    return safeCall(async () => {
      const { data } = await api.get('/commerce/bookings/availability', { params });
      return data.data;
    });
  },

  async getBookingById(id: string): Promise<Booking> {
    return safeCall(async () => {
      const { data } = await api.get<{ success: true; data: Booking }>(`/commerce/bookings/${id}`);
      return data.data;
    });
  },

  async confirmBooking(id: string): Promise<Booking> {
    return safeCall(async () => {
      const { data } = await api.patch<{ success: true; data: Booking }>(`/commerce/bookings/${id}/confirm`);
      return data.data;
    });
  },

  async rejectBooking(id: string): Promise<Booking> {
    return safeCall(async () => {
      const { data } = await api.patch<{ success: true; data: Booking }>(`/commerce/bookings/${id}/reject`);
      return data.data;
    });
  },

  async cancelBooking(id: string): Promise<Booking> {
    return safeCall(async () => {
      const { data } = await api.patch<{ success: true; data: Booking }>(`/commerce/bookings/${id}/cancel`);
      return data.data;
    });
  },

  async completeBooking(id: string): Promise<Booking> {
    return safeCall(async () => {
      const { data } = await api.patch<{ success: true; data: Booking }>(`/commerce/bookings/${id}/complete`);
      return data.data;
    });
  },
};