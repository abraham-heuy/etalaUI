// contexts/WishlistContext.tsx
import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { type Wishlist, CommerceService } from '../../services/commerce/commerce.service';

interface WishlistContextType {
  wishlist: Wishlist | null;
  isLoading: boolean;
  error: string | null;
  refreshWishlist: () => Promise<void>;
  addToWishlist: (productId: string, productType: string) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  toggleWishlist: (productId: string, productType: string) => Promise<boolean>;
  moveToCart: (itemId: string) => Promise<void>;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider');
  return ctx;
};

export const WishlistProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [wishlist, setWishlist] = useState<Wishlist | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadWishlist = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await CommerceService.getWishlist();
      setWishlist(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadWishlist();
  }, []);

  const refreshWishlist = loadWishlist;

  const addToWishlist = async (productId: string, productType: string) => {
    try {
      const updated = await CommerceService.addToWishlist(productId, productType);
      setWishlist(updated);
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const removeItem = async (itemId: string) => {
    try {
      const updated = await CommerceService.removeWishlistItem(itemId);
      setWishlist(updated);
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const toggleWishlist = async (productId: string, productType: string) => {
    try {
      const { added, wishlist: newWishlist } = await CommerceService.toggleWishlist(productId, productType);
      setWishlist(newWishlist);
      return added;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const moveToCart = async (itemId: string) => {
    try {
      const {  wishlist: newWishlist } = await CommerceService.moveToCart(itemId);
      setWishlist(newWishlist);
      // Notify cart context? We'll rely on the cart provider to refresh.
      // Optionally, we can emit an event or refresh the cart via a global store.
      window.dispatchEvent(new CustomEvent('cart-updated'));
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  return (
    <WishlistContext.Provider value={{ wishlist, isLoading, error, refreshWishlist, addToWishlist, removeItem, toggleWishlist, moveToCart }}>
      {children}
    </WishlistContext.Provider>
  );
};