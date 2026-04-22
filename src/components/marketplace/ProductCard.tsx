// components/marketplace/ProductCard.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Star, MapPin, BadgeCheck, Heart, ShoppingCart, Eye, Tag, Loader2, CheckCircle, XCircle
} from 'lucide-react';
import { tokenStore } from '../../services/Auth/auth.service';
import { CommerceService } from '../../services/commerce/commerce.service';
import type { Product } from '../../data/marketplace';

interface ProductCardProps {
  product: Product;
  viewMode?: 'grid' | 'list';
}

const ProductCard: React.FC<ProductCardProps> = ({ product, viewMode = 'grid' }) => {
  const [addingToCart, setAddingToCart] = useState(false);
  const [togglingWishlist, setTogglingWishlist] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false); // ✅ fixed
  const [wishlistItemId, setWishlistItemId] = useState<string | null>(null);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const showToast = (type: 'success' | 'error', text: string) => {
    setToast({ type, text });
    setTimeout(() => setToast(null), 3000);
  };

  // Check wishlist status on mount if user is logged in
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
        productType: 'marketplace',
        quantity: 1,
        productName: product.name,
        sellerName: product.seller.name,
        sellerId: product.seller.id,
        price: product.price,
        productCategory: product.category,
      };
      await CommerceService.addToCart('marketplace', item);
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
          'marketplace',
          product.name,
          product.seller.name,
          product.category,
          product.seller.id,
          product.price
        );
        setIsWishlisted(true);
        // Find the new item id
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

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const heartClass = isWishlisted ? 'fill-current text-red-500' : 'text-sky-600';

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
        <div className="bg-white rounded-xl border border-sky-100 overflow-hidden hover:shadow-md transition-shadow">
          <div className="flex flex-col sm:flex-row">
            <div className="sm:w-48 h-48">
              <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <Link to={`/marketplace/product/${product.id}`}>
                    <h3 className="text-base font-display font-semibold text-charcoal hover:text-sky-600 transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium text-charcoal">{product.rating}</span>
                      <span className="text-xs text-slate-text">({product.reviews})</span>
                    </div>
                    {product.condition && product.condition !== 'new' && (
                      <>
                        <span className="w-1 h-1 bg-slate-text/30 rounded-full"></span>
                        <span className="text-xs capitalize text-amber-600">{product.condition}</span>
                      </>
                    )}
                  </div>
                </div>
                <button
                  onClick={handleToggleWishlist}
                  disabled={togglingWishlist}
                  className="p-1.5 text-slate-text hover:text-sky-600 transition-colors"
                >
                  {togglingWishlist ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Heart className={`w-5 h-5 ${heartClass}`} />
                  )}
                </button>
              </div>
              <p className="text-sm text-slate-text mb-3 line-clamp-2">{product.description}</p>
              <div className="flex items-center gap-2 text-xs text-slate-text/70 mb-3">
                <MapPin className="w-3 h-3" />
                <span>{product.seller.location}</span>
                {product.seller.verified && (
                  <>
                    <span className="w-1 h-1 bg-slate-text/30 rounded-full"></span>
                    <BadgeCheck className="w-3 h-3 text-sky-600" />
                    <span>Verified</span>
                  </>
                )}
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-bold text-sky-600">KSh {product.price.toLocaleString()}</span>
                    {product.originalPrice && (
                      <>
                        <span className="text-sm text-slate-text line-through">KSh {product.originalPrice.toLocaleString()}</span>
                        <span className="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full">-{discount}%</span>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleAddToCart}
                    disabled={addingToCart}
                    className="p-2 border border-sky-200 rounded-lg text-sky-600 hover:bg-sky-50 transition-colors"
                  >
                    {addingToCart ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShoppingCart className="w-4 h-4" />}
                  </button>
                  <Link to={`/marketplace/product/${product.id}`} className="p-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors">
                    <Eye className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Grid view
  return (
    <>
      <ToastMessage />
      <div className="group bg-white rounded-xl border border-sky-100 overflow-hidden hover:shadow-lg transition-all relative">
        <Link to={`/marketplace/product/${product.id}`} className="block relative h-48 overflow-hidden">
          <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
          {product.condition && product.condition !== 'new' && (
            <div className="absolute top-2 left-2 bg-amber-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
              <Tag className="w-3 h-3" /> {product.condition}
            </div>
          )}
          {discount > 0 && (
            <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">-{discount}%</div>
          )}
        </Link>
        <div className="p-4">
          <div className="flex items-center gap-1 text-xs text-slate-text/70 mb-2">
            <MapPin className="w-3 h-3" />
            <span className="truncate">{product.seller.location}</span>
            {product.seller.verified && <BadgeCheck className="w-3 h-3 text-sky-600" />}
          </div>
          <Link to={`/marketplace/product/${product.id}`}>
            <h3 className="text-sm font-display font-semibold text-charcoal mb-1 hover:text-sky-600 transition-colors line-clamp-2">
              {product.name}
            </h3>
          </Link>
          <div className="flex items-center gap-1 mb-2">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span className="text-sm font-medium text-charcoal">{product.rating}</span>
            <span className="text-xs text-slate-text">({product.reviews})</span>
          </div>
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-lg font-bold text-sky-600">KSh {product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <span className="text-xs text-slate-text line-through">KSh {product.originalPrice.toLocaleString()}</span>
            )}
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleAddToCart}
              disabled={addingToCart}
              className="flex-1 bg-sky-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-sky-600 transition-colors flex items-center justify-center gap-2"
            >
              {addingToCart ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShoppingCart className="w-4 h-4" />}
              Add
            </button>
            <button
              onClick={handleToggleWishlist}
              disabled={togglingWishlist}
              className="p-2 border border-sky-200 rounded-lg text-sky-600 hover:bg-sky-50 transition-colors"
            >
              {togglingWishlist ? <Loader2 className="w-4 h-4 animate-spin" /> : <Heart className={`w-4 h-4 ${heartClass}`} />}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;