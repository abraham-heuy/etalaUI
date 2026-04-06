// contexts/CartContext.tsx
import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { CommerceService, type Cart, type CartItem } from '../../services/commerce/commerce.service';

interface CartContextType {
  cart: Cart | null;
  isLoading: boolean;
  error: string | null;
  refreshCart: () => Promise<void>;
  addToCart: (item: Omit<CartItem, 'name' | 'price' | 'sellerName'> & { name?: string; price?: number }) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  clearCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};

interface CartProviderProps {
  children: ReactNode;
  category: string; // current category (e.g., 'farmers')
}

export const CartProvider: React.FC<CartProviderProps> = ({ children, category }) => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadCart = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await CommerceService.getCart(category);
      setCart(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCart();
  }, [category]);

  const refreshCart = loadCart;

  const addToCart = async (item: any) => {
    try {
      const updatedCart = await CommerceService.addToCart(category, item);
      setCart(updatedCart);
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    try {
      const updatedCart = await CommerceService.updateCartItemQuantity(category, itemId, quantity);
      setCart(updatedCart);
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const removeItem = async (itemId: string) => {
    try {
      const updatedCart = await CommerceService.removeCartItem(category, itemId);
      setCart(updatedCart);
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const clearCart = async () => {
    try {
      await CommerceService.clearCart(category);
      setCart(null);
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  return (
    <CartContext.Provider value={{ cart, isLoading, error, refreshCart, addToCart, updateQuantity, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};