// pages/farmers/product/[id].tsx
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
  ChevronRight,
  Minus,
  Plus,
  Calendar,
  Sprout,
  Leaf
} from 'lucide-react';
import { farmerProducts } from '../../../data/farmers';
import FarmerProductCard from '../../../components/farmers/FarmerProductCard';
import CategoryNavbar from '../../../common/CategoryNavbar';
import LoginModal from '../../../common/loginPrompt';

const FarmerProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [actionType, setActionType] = useState<'cart' | 'buy' | null>(null);

  const product = farmerProducts.find(p => p.id === id);
  const relatedProducts = farmerProducts
    .filter(p => p.farmer.id === product?.farmer.id && p.id !== product?.id)
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
            <Link to="/farmers" className="text-green-600 hover:underline">
              Back to Farmers Market
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    const isLoggedIn = localStorage.getItem('user') ? true : false;
    
    if (!isLoggedIn) {
      setActionType('cart');
      setShowLoginModal(true);
    } else {
      console.log('Added to cart:', product.id, quantity);
    }
  };

  const handleBuyNow = () => {
    const isLoggedIn = localStorage.getItem('user') ? true : false;
    
    if (!isLoggedIn) {
      setActionType('buy');
      setShowLoginModal(true);
    } else {
      console.log('Buy now:', product.id, quantity);
    }
  };

  return (
    <div className="min-h-screen bg-soft-white">
      {/* Category Navbar */}
      <CategoryNavbar categoryName={product.name} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 pt-24">
        {/* Product Main */}
        <div className="bg-white rounded-2xl border border-green-100 p-6 mb-8">
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
                    {product.farmer.organic && (
                      <>
                        <span className="w-1 h-1 bg-slate-text/30 rounded-full"></span>
                        <Sprout className="w-4 h-4 text-green-600" />
                        <span className="text-sm text-green-600">Organic</span>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 border border-green-200 rounded-lg text-green-600 hover:bg-green-50 transition-colors">
                    <Heart className="w-5 h-5" />
                  </button>
                  <button className="p-2 border border-green-200 rounded-lg text-green-600 hover:bg-green-50 transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-green-600">
                    KSh {product.price}
                  </span>
                  <span className="text-lg text-slate-text">/{product.unit}</span>
                  {product.originalPrice && (
                    <>
                      <span className="text-lg text-slate-text line-through">
                        KSh {product.originalPrice}
                      </span>
                      <span className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded-full">
                        -{discount}%
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Farmer Info */}
              <div className="bg-green-50 rounded-xl p-4 mb-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center">
                      <Leaf className="w-6 h-6 text-green-700" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        <h3 className="font-medium text-charcoal">{product.farmer.name}</h3>
                        {product.farmer.verified && (
                          <BadgeCheck className="w-4 h-4 text-green-600" />
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-text/70">
                        <MapPin className="w-3 h-3" />
                        <span>{product.farmer.location}</span>
                        <span className="w-1 h-1 bg-slate-text/30 rounded-full"></span>
                        <span>{product.farmer.totalSales} sales</span>
                      </div>
                    </div>
                  </div>
                  <Link 
                    to={`/farmers/farmer/${product.farmer.id}`}
                    className="text-sm text-green-600 hover:text-green-700 flex items-center gap-1"
                  >
                    View Farmer
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className="flex items-center gap-4 text-xs">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-green-600" />
                    <span>Harvested: {new Date(product.harvestDate).toLocaleDateString()}</span>
                  </div>
                  {product.expiresIn && (
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-amber-600" />
                      <span>Best within: {product.expiresIn}</span>
                    </div>
                  )}
                </div>
              </div>

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
              <div className="border-t border-green-100 pt-6">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-sm font-medium text-charcoal">Quantity:</span>
                  <div className="flex items-center border border-green-200 rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 hover:bg-green-50 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-12 text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2 hover:bg-green-50 transition-colors"
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
                    className="flex-1 bg-green-600 text-white py-3 rounded-xl text-sm font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </button>
                  <button 
                    onClick={handleBuyNow}
                    className="flex-1 bg-white border border-green-200 text-green-600 py-3 rounded-xl text-sm font-medium hover:bg-green-50 transition-colors"
                  >
                    Buy Now
                  </button>
                </div>
              </div>

              {/* Product Features */}
              <div className="grid grid-cols-2 gap-3 mt-6">
                <div className="flex items-center gap-2 text-sm text-slate-text">
                  <Shield className="w-4 h-4 text-green-600" />
                  Verified Farmer
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-text">
                  <Truck className="w-4 h-4 text-green-600" />
                  Free Delivery in Tala
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-text">
                  <Clock className="w-4 h-4 text-green-600" />
                  Same-day Delivery
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-text">
                  <MessageCircle className="w-4 h-4 text-green-600" />
                  Farmer Support
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section>
            <h2 className="text-2xl font-display font-semibold text-charcoal mb-6">
              More from {product.farmer.name}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedProducts.map((product) => (
                <FarmerProductCard key={product.id} product={product} viewMode="grid" />
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
    </div>
  );
};

export default FarmerProductDetailPage;