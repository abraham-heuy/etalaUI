// pages/farmers/product/[id].tsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Star, MapPin, BadgeCheck, Heart, ShoppingCart, Share2, MessageCircle,
  Shield, Truck, Clock, ChevronRight, Minus, Plus, Calendar, Sprout, Leaf,
  CheckCircle, XCircle, Loader2
} from 'lucide-react';
import CategoryNavbar from '../../../common/CategoryNavbar';
import LoginModal from '../../../common/loginPrompt';
import { type FarmersProduct } from '../../../services/farmers/farmer.service';
import { ProductService } from '../../../services/products/product.service';
import { CommerceService } from '../../../services/commerce/commerce.service';
import { tokenStore } from '../../../services/Auth/auth.service';
import FarmerProductCard from '../../../components/farmers/FarmerProductCard';

interface ToastMessage {
  type: 'success' | 'error' | 'info';
  text: string;
}

const FarmerProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<FarmersProduct | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<FarmersProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [actionType, setActionType] = useState<'cart' | 'buy' | null>(null);
  
  // Cart & Wishlist states
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);
  const [togglingWishlist, setTogglingWishlist] = useState(false);
  const [toast, setToast] = useState<ToastMessage | null>(null);
  const [wishlistItemId, setWishlistItemId] = useState<string | null>(null);

  const showToast = (type: ToastMessage['type'], text: string) => {
    setToast({ type, text });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    if (id) fetchProduct();
  }, [id]);

  useEffect(() => {
    if (product && tokenStore.get()) {
      checkWishlistStatus();
    }
  }, [product]);

  const checkWishlistStatus = async () => {
    try {
      const wishlist = await CommerceService.getWishlist();
      const item = wishlist.items.find(i => i.productId === product!.id);
      setIsWishlisted(!!item);
      setWishlistItemId(item?.id || null);
    } catch (err) {
      console.error('Failed to check wishlist status:', err);
    }
  };

  const fetchProduct = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await ProductService.farmers.getById(id!);
      setProduct(data);
      
      // Fetch related products (same seller)
      if (data.sellerId) {
        try {
          const result = await ProductService.farmers.getBySeller(data.sellerId);
          const filtered = result.filter(p => p.id !== data.id).slice(0, 4);
          setRelatedProducts(filtered);
        } catch (err) {
          console.error('Failed to fetch related products:', err);
          setRelatedProducts([]);
        }
      }
    } catch (err: any) {
      setError(err.message || 'Product not found');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleWishlist = async () => {
    const token = tokenStore.get();
    if (!token) {
      setActionType(null);
      setShowLoginModal(true);
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
        await CommerceService.addToWishlist(
          product!.id,
          'farmers',
          product!.name,
          product!.sellerName || 'Farmer',
          product!.subcategory || 'produce',
          product!.sellerId,
          product!.price
        );
        setIsWishlisted(true);
        const updatedWishlist = await CommerceService.getWishlist();
        const newItem = updatedWishlist.items.find(i => i.productId === product!.id);
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

  const handleAddToCart = async () => {
    const token = tokenStore.get();
    if (!token) {
      setActionType('cart');
      setShowLoginModal(true);
      return;
    }
    if (addingToCart) return;
    setAddingToCart(true);
    try {
      const item = {
        productId: product!.id,
        productType: 'farmers',
        quantity,
        sellerId: product!.sellerId,
        productName: product!.name,
        sellerName: product!.sellerName || 'Farmer',
        price: product!.price,
      };
      await CommerceService.addToCart('farmers', item);
      showToast('success', `Added ${quantity} × ${product!.name} to cart`);
      window.dispatchEvent(new CustomEvent('cart-updated', { detail: { delta: 1 } }));

    } catch (err: any) {
      showToast('error', err.message || 'Failed to add to cart');
    } finally {
      setAddingToCart(false);
    }
  };

  const handleBuyNow = async () => {
    const token = tokenStore.get();
    if (!token) {
      setActionType('buy');
      setShowLoginModal(true);
      return;
    }
    try {
      const item = {
        productId: product!.id,
        productType: 'farmers',
        quantity,
        sellerId: product!.sellerId,
        productName: product!.name,
        sellerName: product!.sellerName || 'Farmer',
        price: product!.price,
      };
      await CommerceService.addToCart('farmers', item);
      window.location.href = '/checkout?category=farmers';
    } catch (err: any) {
      showToast('error', err.message || 'Failed to proceed to checkout');
    }
  };

  const discount = product?.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  // Skeleton
  const ProductSkeleton = () => (
    <div className="min-h-screen bg-soft-white">
      <CategoryNavbar categoryName="Loading..." />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 pt-20 md:pt-24">
        <div className="bg-white rounded-2xl border border-green-100 p-4 sm:p-6 mb-8 animate-pulse">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            <div className="lg:w-1/2">
              <div className="aspect-square rounded-xl bg-gray-200 mb-4"></div>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {[...Array(3)].map((_, i) => <div key={i} className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg bg-gray-200 flex-shrink-0"></div>)}
              </div>
            </div>
            <div className="lg:w-1/2 space-y-5">
              <div><div className="h-7 bg-gray-200 rounded w-3/4 mb-2"></div><div className="flex gap-2"><div className="h-4 bg-gray-200 rounded w-20"></div><div className="h-4 bg-gray-200 rounded w-16"></div></div></div>
              <div><div className="h-8 bg-gray-200 rounded w-32"></div><div className="h-4 bg-gray-200 rounded w-40 mt-2"></div></div>
              <div className="bg-green-50 rounded-xl p-4 space-y-3"><div className="flex items-center gap-3"><div className="w-10 h-10 bg-gray-200 rounded-full"></div><div className="flex-1 space-y-2"><div className="h-4 bg-gray-200 rounded w-32"></div><div className="h-3 bg-gray-200 rounded w-24"></div></div></div><div className="h-3 bg-gray-200 rounded w-28"></div></div>
              <div><div className="h-5 bg-gray-200 rounded w-24 mb-2"></div><div className="h-4 bg-gray-200 rounded w-full"></div><div className="h-4 bg-gray-200 rounded w-5/6 mt-1"></div></div>
              <div className="border-t pt-5 space-y-4"><div className="flex items-center gap-4"><div className="h-5 bg-gray-200 rounded w-16"></div><div className="flex gap-2"><div className="w-8 h-8 bg-gray-200 rounded"></div><div className="w-8 h-8 bg-gray-200 rounded"></div></div></div><div className="flex flex-col sm:flex-row gap-3"><div className="flex-1 h-12 bg-gray-200 rounded-xl"></div><div className="flex-1 h-12 bg-gray-200 rounded-xl"></div></div></div>
              <div className="grid grid-cols-2 gap-2 sm:gap-3"><div className="h-5 bg-gray-200 rounded"></div><div className="h-5 bg-gray-200 rounded"></div><div className="h-5 bg-gray-200 rounded"></div><div className="h-5 bg-gray-200 rounded"></div></div>
            </div>
          </div>
        </div>
        <div><div className="h-7 bg-gray-200 rounded w-48 mb-6"></div><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">{[...Array(4)].map((_, i) => (<div key={i} className="bg-white rounded-xl border border-green-100 p-3"><div className="h-40 bg-gray-200 rounded-lg mb-3"></div><div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div><div className="h-4 bg-gray-200 rounded w-1/2"></div></div>))}</div></div>
      </div>
    </div>
  );

  if (loading) return <ProductSkeleton />;
  if (error || !product) {
    return (
      <div className="min-h-screen bg-soft-white">
        <CategoryNavbar categoryName="Product Not Found" />
        <div className="pt-24 sm:pt-32 flex items-center justify-center px-4">
          <div className="text-center">
            <h2 className="text-2xl font-display font-bold text-charcoal mb-2">Product Not Found</h2>
            <p className="text-slate-text mb-4">{error}</p>
            <Link to="/farmers" className="text-green-600 hover:underline">Back to Farmers Market</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-soft-white">
      <CategoryNavbar categoryName={product.name} />
      
      {toast && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 animate-slide-up">
          <div className={`flex items-center gap-2 px-4 py-2 rounded-lg shadow-lg ${
            toast.type === 'success' ? 'bg-green-500 text-white' :
            toast.type === 'error' ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'
          }`}>
            {toast.type === 'success' && <CheckCircle className="w-5 h-5" />}
            {toast.type === 'error' && <XCircle className="w-5 h-5" />}
            <span className="text-sm">{toast.text}</span>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 pt-20 md:pt-24">
        <div className="bg-white rounded-2xl border border-green-100 p-4 sm:p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            {/* Images */}
            <div className="lg:w-1/2">
              <div className="aspect-square rounded-xl overflow-hidden mb-4 bg-gray-100">
                <img 
                  src={product.images?.[selectedImage] || product.images?.[0] || '/placeholder.png'} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {product.images && product.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-colors ${
                        selectedImage === idx ? 'border-green-500' : 'border-transparent'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div className="lg:w-1/2">
              <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                <div className="flex-1 min-w-0">
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-display font-bold text-charcoal break-words">
                    {product.name}
                  </h1>
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 fill-current" />
                      <span className="text-base sm:text-lg font-medium text-charcoal">{product.sellerRating || 0}</span>
                      <span className="text-xs sm:text-sm text-slate-text">({product.reviewCount || 0} reviews)</span>
                    </div>
                    {product.organic && (
                      <>
                        <span className="w-1 h-1 bg-slate-text/30 rounded-full hidden sm:block"></span>
                        <Sprout className="w-4 h-4 text-green-600" />
                        <span className="text-xs sm:text-sm text-green-600">Organic</span>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button
                    onClick={handleToggleWishlist}
                    disabled={togglingWishlist}
                    className={`p-2 border rounded-lg transition-colors ${
                      isWishlisted
                        ? 'bg-red-50 border-red-200 text-red-500 hover:bg-red-100'
                        : 'border-green-200 text-green-600 hover:bg-green-50'
                    } ${togglingWishlist ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {togglingWishlist ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                    )}
                  </button>
                  <button className="p-2 border border-green-200 rounded-lg text-green-600 hover:bg-green-50">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="mb-5">
                <div className="flex flex-wrap items-baseline gap-2">
                  <span className="text-2xl sm:text-3xl font-bold text-green-600">
                    KSh {product.price.toLocaleString()}
                  </span>
                  <span className="text-base sm:text-lg text-slate-text">/{product.unit}</span>
                  {product.originalPrice && (
                    <>
                      <span className="text-base sm:text-lg text-slate-text line-through">
                        KSh {product.originalPrice.toLocaleString()}
                      </span>
                      <span className="text-xs sm:text-sm bg-green-100 text-green-700 px-2 py-1 rounded-full">
                        -{discount}%
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Farmer card */}
              <div className="bg-green-50 rounded-xl p-3 sm:p-4 mb-6">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-200 rounded-full flex items-center justify-center flex-shrink-0">
                      <Leaf className="w-5 h-5 sm:w-6 sm:h-6 text-green-700" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1 flex-wrap">
                        <h3 className="font-medium text-charcoal truncate">{product.sellerName || 'Farmer'}</h3>
                        <BadgeCheck className="w-4 h-4 text-green-600 flex-shrink-0" />
                      </div>
                      <div className="flex flex-wrap items-center gap-1 text-xs text-slate-text/70">
                        <MapPin className="w-3 h-3" />
                        <span className="truncate">{product.sellerLocation || 'Tala'}</span>
                        <span className="w-1 h-1 bg-slate-text/30 rounded-full"></span>
                        <span>{/* total sales from seller, not available */}0 sales</span>
                      </div>
                    </div>
                  </div>
                  <Link to={`/farmers/farmer/${product.sellerId}`} className="text-xs sm:text-sm text-green-600 hover:text-green-700 flex items-center gap-1 flex-shrink-0">
                    View Farmer <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                  </Link>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  {product.harvestDate && (
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-green-600" />
                      <span>Harvested: {new Date(product.harvestDate).toLocaleDateString()}</span>
                    </div>
                  )}
                  {product.isCertified && (
                    <div className="flex items-center gap-1">
                      <BadgeCheck className="w-3 h-3 text-green-600" />
                      <span>Certified</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-base sm:text-lg font-display font-semibold text-charcoal mb-2">Description</h3>
                <p className="text-sm sm:text-base text-slate-text leading-relaxed break-words">{product.description}</p>
              </div>

              <div className="border-t border-green-100 pt-5">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="text-sm font-medium text-charcoal">Quantity ({product.unit}):</span>
                  <div className="flex items-center border border-green-200 rounded-lg">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} disabled={addingToCart} className="p-2 hover:bg-green-50">
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-10 text-center text-sm">{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)} disabled={addingToCart} className="p-2 hover:bg-green-50">
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="text-sm text-slate-text">
                    {(product.availableQuantity ?? 0) > 0 ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleAddToCart}
                    disabled={addingToCart || (product.availableQuantity ?? 0) <= 0}
                    className={`flex-1 py-3 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-colors ${
                      (product.availableQuantity ?? 0) > 0
                        ? 'bg-green-600 text-white hover:bg-green-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {addingToCart ? <Loader2 className="w-5 h-5 animate-spin" /> : <ShoppingCart className="w-5 h-5" />}
                    Add to Cart
                  </button>
                  <button
                    onClick={handleBuyNow}
                    disabled={(product.availableQuantity ?? 0) <= 0}
                    className={`flex-1 py-3 rounded-xl text-sm font-medium transition-colors ${
                      (product.availableQuantity ?? 0) > 0
                        ? 'bg-white border border-green-200 text-green-600 hover:bg-green-50'
                        : 'bg-gray-100 border border-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    Buy Now
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 sm:gap-3 mt-6">
                <div className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-text"><Shield className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" /> Verified Farmer</div>
                <div className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-text"><Truck className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" /> Free Delivery in Tala</div>
                <div className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-text"><Clock className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" /> Same-day Delivery</div>
                <div className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-text"><MessageCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" /> Farmer Support</div>
              </div>
            </div>
          </div>
        </div>

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <section>
            <h2 className="text-xl sm:text-2xl font-display font-semibold text-charcoal mb-5">More from this Farmer</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedProducts.map(p => (
                <FarmerProductCard key={p.id} product={p} viewMode="grid" />
              ))}
            </div>
          </section>
        )}
      </div>

      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} actionType={actionType} />
    </div>
  );
};

export default FarmerProductDetailPage;