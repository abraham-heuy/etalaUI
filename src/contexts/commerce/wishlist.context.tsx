// contexts/WishlistContext.tsx
import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { type Wishlist, CommerceService } from '../../services/commerce/commerce.service';
import { ProductService } from '../../services/products/product.service'; // Import ProductService

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
      // Fetch product details to get name, sellerName, category, sellerId, price
      let productDetails: any;
      if (productType === 'marketplace') {
        productDetails = await ProductService.marketplace.getById(productId);
      } else {
        // Handle other product types if needed
        throw new Error(`Unsupported product type: ${productType}`);
      }
      
      const updated = await CommerceService.addToWishlist(
        productId,
        productType,
        productDetails.name,
        productDetails.sellerName || 'Unknown Seller',
        productDetails.category,
        productDetails.sellerId,
        productDetails.price
      );
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
      const { wishlist: newWishlist } = await CommerceService.moveToCart(itemId);
      setWishlist(newWishlist);
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