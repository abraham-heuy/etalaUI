// pages/dashboard/wishlist.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Heart, 
  ShoppingCart, 
  MapPin,
  Trash2
} from 'lucide-react';
import { useWishlist } from '../../../contexts/commerce/wishlist.context';

const WishlistPage: React.FC = () => {
  const { wishlist, isLoading, error, removeItem, moveToCart } = useWishlist();

  const handleMoveToCart = async (itemId: string) => {
    try {
      await moveToCart(itemId);
    } catch (err) {
      console.error('Failed to move to cart', err);
    }
  };

  const handleRemove = async (itemId: string) => {
    try {
      await removeItem(itemId);
    } catch (err) {
      console.error('Failed to remove from wishlist', err);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-charcoal">My Wishlist</h1>
            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mt-1"></div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-xl border border-sky-100 overflow-hidden">
              <div className="h-40 bg-gray-200 animate-pulse"></div>
              <div className="p-4 space-y-2">
                <div className="h-5 bg-gray-200 rounded animate-pulse w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
                <div className="flex justify-between">
                  <div className="h-6 bg-gray-200 rounded animate-pulse w-1/4"></div>
                  <div className="h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Error loading wishlist: {error}</p>
        <button onClick={() => window.location.reload()} className="mt-4 text-sky-600">Retry</button>
      </div>
    );
  }

  const wishlistItems = wishlist?.items || [];

  if (wishlistItems.length === 0) {
    return (
      <div className="text-center py-12">
        <Heart className="w-16 h-16 text-slate-text/30 mx-auto mb-4" />
        <h3 className="text-lg font-display font-medium text-charcoal mb-2">
          Your wishlist is empty
        </h3>
        <p className="text-sm text-slate-text mb-4">
          Save items you love to your wishlist
        </p>
        <Link
          to="/marketplace"
          className="inline-flex items-center gap-2 bg-redbull-blue text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-redbull-blue/90"
        >
          Browse Marketplace
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-charcoal">
            My Wishlist
          </h1>
          <p className="text-slate-text mt-1">
            {wishlistItems.length} saved item{wishlistItems.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {wishlistItems.map((item) => (
          <div key={item.id} className="bg-white rounded-xl border border-sky-100 overflow-hidden hover:shadow-md transition-shadow group">
            <div className="relative h-40">
              <img 
                src={item.image || 'https://via.placeholder.com/300x200?text=No+Image'} 
                alt={item.name}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => handleRemove(item.id)}
                className="absolute top-2 right-2 bg-white p-1.5 rounded-full shadow-md hover:bg-red-50 transition-colors"
                aria-label="Remove from wishlist"
              >
                <Trash2 className="w-4 h-4 text-red-500" />
              </button>
            </div>
            
            <div className="p-4">
              <Link to={`/marketplace/product/${item.productId}`}>
                <h3 className="text-base font-display font-semibold text-charcoal hover:text-redbull-blue transition-colors mb-1">
                  {item.name}
                </h3>
              </Link>
              
              <div className="flex items-center gap-2 text-xs text-slate-text/70 mb-2">
                <MapPin className="w-3 h-3" />
                <span>{item.sellerId || 'Local seller'}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-redbull-blue">
                  KSh {item.price.toLocaleString()}
                </span>
                <button
                  onClick={() => handleMoveToCart(item.id)}
                  className="bg-redbull-blue text-white p-2 rounded-lg hover:bg-redbull-blue/90 transition-colors"
                  aria-label="Move to cart"
                >
                  <ShoppingCart className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;