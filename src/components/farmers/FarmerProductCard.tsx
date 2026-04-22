// components/farmers/FarmerProductCard.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Star, 
  MapPin, 
  BadgeCheck, 
  Heart,
  ShoppingCart,
  Calendar,
  Sprout,
  Loader2,
  CheckCircle,
  XCircle
} from 'lucide-react';
import type { FarmersProduct } from '../../services/farmers/farmer.service';
import { CommerceService } from '../../services/commerce/commerce.service';
import { tokenStore } from '../../services/Auth/auth.service';

interface FarmerProductCardProps {
  product: FarmersProduct;
  viewMode?: 'grid' | 'list';
}

// Helper to get seller rating (since FarmersProduct might not have rating field)
const getProductRating = (product: FarmersProduct) => {
  return Number(product.sellerRating) || 0;
};

// Helper to get review count (if available)
const getReviewCount = (product: FarmersProduct) => {
  return product.reviewCount || 0;
};

const FarmerProductCard: React.FC<FarmerProductCardProps> = ({ product, viewMode = 'grid' }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [wishlistItemId, setWishlistItemId] = useState<string | null>(null);
  const [addingToCart, setAddingToCart] = useState(false);
  const [togglingWishlist, setTogglingWishlist] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const showToast = (type: 'success' | 'error', text: string) => {
    setToast({ type, text });
    setTimeout(() => setToast(null), 3000);
  };

  // Check wishlist status on mount if logged in
  useEffect(() => {
    const token = tokenStore.get();
    if (token) {
      CommerceService.getWishlist()
        .then(wishlist => {
          const item = wishlist.items.find(i => i.productId === product.id);
          if (item) {
            setIsWishlisted(true);
            setWishlistItemId(item.id);
          }
        })
        .catch(console.error);
    }
  }, [product.id]);

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const rating = getProductRating(product);
  const reviewCount = getReviewCount(product);
  const isOrganic = product.organic;
  const sellerVerified = (product as any).sellerVerified || false;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    const token = tokenStore.get();
    if (!token) {
      showToast('error', 'Please login to add to cart');
      return;
    }
    if (addingToCart) return;
    setAddingToCart(true);
    try {
      const item = {
        productId: product.id,
        productType: 'farmers',
        quantity: 1,
        productName: product.name,
        sellerName: product.sellerName || 'Farmer',
        sellerId: product.sellerId,
        price: product.price,
      };
      await CommerceService.addToCart('farmers', item);
      showToast('success', `Added ${product.name} to cart`);
      window.dispatchEvent(new CustomEvent('cart-updated', { detail: { delta: 1 } }));
    } catch (err: any) {
      showToast('error', err.message || 'Failed to add to cart');
    } finally {
      setAddingToCart(false);
    }
  };

  const handleToggleWishlist = async (e: React.MouseEvent) => {
    e.preventDefault();
    const token = tokenStore.get();
    if (!token) {
      showToast('error', 'Please login to manage wishlist');
      return;
    }
    if (togglingWishlist) return;
    setTogglingWishlist(true);
    try {
      if (isWishlisted && wishlistItemId) {
        await CommerceService.removeWishlistItem(wishlistItemId);
        setIsWishlisted(false);
        setWishlistItemId(null);
        showToast('success', 'Removed from wishlist');
        window.dispatchEvent(new CustomEvent('wishlist-updated', { detail: { added: false } }));
      } else {
        const result = await CommerceService.addToWishlist(
          product.id,
          'farmers',
          product.name,
          product.sellerName || 'Farmer',
          product.subcategory || 'produce',
          product.sellerId,
          product.price
        );
        setIsWishlisted(true);
        const newItem = result.items.find(i => i.productId === product.id);
        setWishlistItemId(newItem?.id || null);
        showToast('success', 'Added to wishlist');
        window.dispatchEvent(new CustomEvent('wishlist-updated', { detail: { added: true } }));
      }
    } catch (err: any) {
      showToast('error', err.message || 'Failed to update wishlist');
    } finally {
      setTogglingWishlist(false);
    }
  };

  const heartClass = isWishlisted ? 'fill-current text-red-500' : 'text-green-600';

  // Toast component
  const ToastMessage = () => {
    if (!toast) return null;
    return (
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 animate-slide-up">
        <div className={`flex items-center gap-2 px-4 py-2 rounded-lg shadow-lg ${
          toast.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        }`}>
          {toast.type === 'success' ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
          <span className="text-sm">{toast.text}</span>
        </div>
      </div>
    );
  };

  if (viewMode === 'list') {
    return (
      <>
        <ToastMessage />
        <div className="bg-white rounded-xl border border-green-100 overflow-hidden hover:shadow-md transition-shadow">
          <div className="flex flex-col sm:flex-row">
            {/* Image */}
            <div className="sm:w-48 h-48">
              <img 
                src={product.images?.[0] || '/placeholder.png'} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Content */}
            <div className="flex-1 p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <Link to={`/farmers/product/${product.id}`}>
                    <h3 className="text-base font-display font-semibold text-charcoal hover:text-green-600 transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium text-charcoal">{rating}</span>
                      <span className="text-xs text-slate-text">({reviewCount})</span>
                    </div>
                    {isOrganic && (
                      <>
                        <span className="w-1 h-1 bg-slate-text/30 rounded-full"></span>
                        <Sprout className="w-3 h-3 text-green-600" />
                        <span className="text-xs text-green-600">Organic</span>
                      </>
                    )}
                  </div>
                </div>
                <button
                  onClick={handleToggleWishlist}
                  disabled={togglingWishlist}
                  className="p-1.5 text-slate-text hover:text-green-600 transition-colors"
                >
                  {togglingWishlist ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Heart className={`w-5 h-5 ${heartClass}`} />
                  )}
                </button>
              </div>

              <p className="text-sm text-slate-text mb-3 line-clamp-2">
                {product.description}
              </p>

              <div className="flex items-center gap-3 text-xs text-slate-text/70 mb-3">
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  <span>{product.sellerLocation || 'Tala'}</span>
                </div>
                {sellerVerified && (
                  <>
                    <span className="w-1 h-1 bg-slate-text/30 rounded-full"></span>
                    <BadgeCheck className="w-3 h-3 text-green-600" />
                    <span>Verified</span>
                  </>
                )}
                {product.harvestDate && (
                  <>
                    <span className="w-1 h-1 bg-slate-text/30 rounded-full"></span>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>Harvested {new Date(product.harvestDate).toLocaleDateString()}</span>
                    </div>
                  </>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-bold text-green-600">
                      KSh {Number(product.price)} <span className="text-sm font-normal text-slate-text">/{product.unit}</span>
                    </span>
                    {product.originalPrice && (
                      <>
                        <span className="text-sm text-slate-text line-through">
                          KSh {Number(product.originalPrice)}
                        </span>
                        <span className="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full">
                          -{discount}%
                        </span>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleAddToCart}
                    disabled={addingToCart}
                    className="p-2 border border-green-200 rounded-lg text-green-600 hover:bg-green-50 transition-colors"
                  >
                    {addingToCart ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShoppingCart className="w-4 h-4" />}
                  </button>
                  <Link
                    to={`/farmers/product/${product.id}`}
                    className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    View
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Grid View
  return (
    <>
      <ToastMessage />
      <div className="group bg-white rounded-xl border border-green-100 overflow-hidden hover:shadow-lg transition-all relative">
        {/* Image */}
        <Link to={`/farmers/product/${product.id}`} className="block relative h-48 overflow-hidden">
          <img 
            src={product.images?.[0] || '/placeholder.png'} 
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {isOrganic && (
            <div className="absolute top-2 left-2 bg-green-600 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
              <Sprout className="w-3 h-3" />
              Organic
            </div>
          )}
          {discount > 0 && (
            <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
              -{discount}%
            </div>
          )}
        </Link>

        {/* Content */}
        <div className="p-4">
          {/* Farmer Info */}
          <div className="flex items-center gap-1 text-xs text-slate-text/70 mb-2">
            <MapPin className="w-3 h-3" />
            <span className="truncate">{product.sellerLocation || 'Tala'}</span>
            {sellerVerified && (
              <BadgeCheck className="w-3 h-3 text-green-600" />
            )}
          </div>

          {/* Title */}
          <Link to={`/farmers/product/${product.id}`}>
            <h3 className="text-sm font-display font-semibold text-charcoal mb-1 hover:text-green-600 transition-colors line-clamp-2">
              {product.name}
            </h3>
          </Link>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span className="text-sm font-medium text-charcoal">{rating}</span>
            <span className="text-xs text-slate-text">({reviewCount})</span>
          </div>

          {/* Harvest date */}
          {product.harvestDate && (
            <div className="flex items-center gap-1 text-xs text-slate-text/70 mb-2">
              <Calendar className="w-3 h-3" />
              <span>Harvested {new Date(product.harvestDate).toLocaleDateString()}</span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-lg font-bold text-green-600">
              KSh {Number(product.price)}
            </span>
            <span className="text-xs text-slate-text">/{product.unit}</span>
            {product.originalPrice && (
              <span className="text-xs text-slate-text line-through">
                KSh {Number(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <button
              onClick={handleAddToCart}
              disabled={addingToCart}
              className="flex-1 bg-green-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
            >
              {addingToCart ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShoppingCart className="w-4 h-4" />}
              Add
            </button>
            <button
              onClick={handleToggleWishlist}
              disabled={togglingWishlist}
              className="p-2 border border-green-200 rounded-lg text-green-600 hover:bg-green-50 transition-colors"
            >
              {togglingWishlist ? <Loader2 className="w-4 h-4 animate-spin" /> : <Heart className={`w-4 h-4 ${heartClass}`} />}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FarmerProductCard;