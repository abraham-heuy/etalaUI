// pages/marketplace/product/[id].tsx
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Star,
  MapPin,
  BadgeCheck,
  Heart,
  ShoppingCart,
  Share2,
  MessageCircle,
  Shield,
  Truck,
  Clock,
  Package,
  ChevronRight,
  Minus,
  Plus,
  Store,
  Camera
} from 'lucide-react';
import { products } from '../../../data/marketplace';
import ProductCard from '../../../components/marketplace/ProductCard';
import CategoryNavbar from '../../../common/CategoryNavbar';
import LoginModal from '../../../common/loginPrompt';
import TryOnModal from '../../../Pages/Marketplace/fashion/TryOnModal';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [actionType, setActionType] = useState<'cart' | 'buy' | null>(null);
  const [showTryOnModal, setShowTryOnModal] = useState(false);

  const product = products.find(p => p.id === id);
  const relatedProducts = products
    .filter(p => p.category === product?.category && p.id !== product?.id)
    .slice(0, 4);

  if (!product) {
    return (
      <div className="min-h-screen bg-soft-white">
        <CategoryNavbar categoryName="Product Not Found" />
        <div className="pt-32 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-display font-bold text-charcoal mb-2">
              Product Not Found
            </h2>
            <Link to="/marketplace" className="text-sky-600 hover:underline">
              Back to Marketplace
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const isFashionProduct = product.category === 'fashion';

  const handleAddToCart = () => {
    // Check if user is logged in (mock check - replace with actual auth)
    const isLoggedIn = localStorage.getItem('user') ? true : false;
    
    if (!isLoggedIn) {
      setActionType('cart');
      setShowLoginModal(true);
    } else {
      // Proceed with add to cart
      console.log('Added to cart:', product.id, quantity);
    }
  };

  const handleBuyNow = () => {
    // Check if user is logged in (mock check - replace with actual auth)
    const isLoggedIn = localStorage.getItem('user') ? true : false;
    
    if (!isLoggedIn) {
      setActionType('buy');
      setShowLoginModal(true);
    } else {
      // Proceed with buy now
      console.log('Buy now:', product.id, quantity);
    }
  };

  return (
    <div className="min-h-screen bg-soft-white">
      {/* Category Navbar */}
      <CategoryNavbar categoryName={product.name} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 pt-24">
        {/* Product Main */}
        <div className="bg-white rounded-2xl border border-sky-100 p-6 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Images */}
            <div>
              <div className="aspect-square rounded-xl overflow-hidden mb-4">
                <img 
                  src={product.images[selectedImage]} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {product.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-colors ${
                        selectedImage === idx ? 'border-sky-500' : 'border-transparent'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div>
              {/* Title & Actions */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-display font-bold text-charcoal mb-2">
                    {product.name}
                  </h1>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 text-yellow-500 fill-current" />
                      <span className="text-lg font-medium text-charcoal">{product.rating}</span>
                      <span className="text-sm text-slate-text">({product.reviews} reviews)</span>
                    </div>
                    {product.condition && product.condition !== 'new' && (
                      <>
                        <span className="w-1 h-1 bg-slate-text/30 rounded-full"></span>
                        <span className="text-sm capitalize text-amber-600">{product.condition}</span>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 border border-sky-200 rounded-lg text-sky-600 hover:bg-sky-50 transition-colors">
                    <Heart className="w-5 h-5" />
                  </button>
                  <button className="p-2 border border-sky-200 rounded-lg text-sky-600 hover:bg-sky-50 transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-sky-600">
                    KSh {product.price.toLocaleString()}
                  </span>
                  {product.originalPrice && (
                    <>
                      <span className="text-lg text-slate-text line-through">
                        KSh {product.originalPrice.toLocaleString()}
                      </span>
                      <span className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded-full">
                        -{discount}%
                      </span>
                    </>
                  )}
                </div>
                {product.isMtush && (
                  <div className="mt-2 inline-flex items-center gap-1 bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm">
                    <Package className="w-4 h-4" />
                    Pre-owned - {product.condition}
                  </div>
                )}
              </div>

              {/* Seller Info */}
              <div className="bg-sky-50 rounded-xl p-4 mb-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-sky-200 rounded-full flex items-center justify-center">
                      <Store className="w-6 h-6 text-sky-700" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        <h3 className="font-medium text-charcoal">{product.seller.name}</h3>
                        {product.seller.verified && (
                          <BadgeCheck className="w-4 h-4 text-sky-600" />
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-text/70">
                        <MapPin className="w-3 h-3" />
                        <span>{product.seller.location}</span>
                        <span className="w-1 h-1 bg-slate-text/30 rounded-full"></span>
                        <span>{product.seller.totalSales} sales</span>
                      </div>
                    </div>
                  </div>
                  <Link 
                    to={`/marketplace/store/${product.seller.id}`}
                    className="text-sm text-sky-600 hover:text-sky-700 flex items-center gap-1"
                  >
                    View Store
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium">{product.seller.rating}</span>
                  <span className="text-xs text-slate-text">Seller rating</span>
                </div>
              </div>

              {/* AI Try-On Button - Only for Fashion Products */}
              {isFashionProduct && (
                <div className="mb-6">
                  <button
                    onClick={() => setShowTryOnModal(true)}
                    className="w-full bg-white border-2 border-sky-500 text-sky-600 py-3 rounded-xl text-sm font-medium hover:bg-sky-50 transition-all flex items-center justify-center gap-2"
                  >
                    <Camera className="w-5 h-5" />
                    Try On with AI
                    <span className="text-xs bg-sky-100 text-sky-700 px-2 py-0.5 rounded-full ml-1">BETA</span>
                  </button>
                  <p className="text-xs text-slate-text text-center mt-2">
                    See how this looks on you using AI technology
                  </p>
                </div>
              )}

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-lg font-display font-semibold text-charcoal mb-2">
                  Description
                </h3>
                <p className="text-slate-text leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Quantity & Actions */}
              <div className="border-t border-sky-100 pt-6">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-sm font-medium text-charcoal">Quantity:</span>
                  <div className="flex items-center border border-sky-200 rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 hover:bg-sky-50 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-12 text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2 hover:bg-sky-50 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="text-sm text-slate-text">
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button 
                    onClick={handleAddToCart}
                    className="flex-1 bg-sky-500 text-white py-3 rounded-xl text-sm font-medium hover:bg-sky-600 transition-colors flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </button>
                  <button 
                    onClick={handleBuyNow}
                    className="flex-1 bg-white border border-sky-200 text-sky-600 py-3 rounded-xl text-sm font-medium hover:bg-sky-50 transition-colors"
                  >
                    Buy Now
                  </button>
                </div>
              </div>

              {/* Product Features */}
              <div className="grid grid-cols-2 gap-3 mt-6">
                <div className="flex items-center gap-2 text-sm text-slate-text">
                  <Shield className="w-4 h-4 text-sky-600" />
                  Verified Seller
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-text">
                  <Truck className="w-4 h-4 text-sky-600" />
                  Free Delivery in Tala
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-text">
                  <Clock className="w-4 h-4 text-sky-600" />
                  Same-day Delivery
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-text">
                  <MessageCircle className="w-4 h-4 text-sky-600" />
                  24/7 Support
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section>
            <h2 className="text-2xl font-display font-semibold text-charcoal mb-6">
              You Might Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} viewMode="grid" />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Login Modal */}
      <LoginModal 
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        actionType={actionType}
      />

      {/* Try-On Modal */}
      <TryOnModal
        isOpen={showTryOnModal}
        onClose={() => setShowTryOnModal(false)}
        productId={product.id}
        productName={product.name}
        productImage={product.images[0]}
      />
    </div>
  );
};

export default ProductDetailPage;