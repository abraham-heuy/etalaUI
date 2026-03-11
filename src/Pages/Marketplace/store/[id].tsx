// pages/marketplace/store/[id].tsx
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Star,
  MapPin,
  BadgeCheck,
  Package,
  Calendar,
  Clock,
  Phone,
  Mail,
  Globe,
  Share2,
  Grid2X2,
  List,
  Users,
  Award,
  Shield,
  Heart
} from 'lucide-react';
import { products, popularStores } from '../../../data/marketplace';
import ProductCard from '../../../components/marketplace/ProductCard';
import CategoryNavbar from '../../../common/CategoryNavbar';

const StoreDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'newest' | 'popular' | 'price-low' | 'price-high'>('popular');

  // Find store from popularStores
  const store = popularStores.find(s => s.id === id);
  
  // Get store's products
  const storeProducts = products.filter(p => p.seller.id === id);
  
  // Get seller info from first product (assuming consistent seller data)
  const sellerInfo = storeProducts.length > 0 ? storeProducts[0].seller : null;

  if (!store) {
    return (
      <div className="min-h-screen bg-soft-white">
        <CategoryNavbar categoryName="Store Not Found" />
        <div className="pt-32 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-display font-bold text-charcoal mb-2">
              Store Not Found
            </h2>
            <Link to="/marketplace" className="text-sky-600 hover:underline">
              Back to Marketplace
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Sort products based on selected option
  const sortedProducts = [...storeProducts].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'popular':
        return b.rating - a.rating;
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      default:
        return 0;
    }
  });

  // Calculate store stats
  const totalSales = storeProducts.reduce((sum, p) => sum + p.seller.totalSales, 0);
  const averageRating = storeProducts.length > 0 
    ? storeProducts.reduce((sum, p) => sum + p.rating, 0) / storeProducts.length 
    : 0;
  const categories = [...new Set(storeProducts.map(p => p.category))];

  return (
    <div className="min-h-screen bg-soft-white">
      {/* Category Navbar */}
      <CategoryNavbar categoryName={store.name} />

      {/* Store Header/Cover - Using store's own image */}
      <div className="relative h-48 sm:h-64 overflow-hidden">
        <img 
          src={store.image} 
          alt={store.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
        
        {/* Store name overlay (optional) */}
        <div className="absolute bottom-4 left-4 text-white">
          <h1 className="text-2xl sm:text-3xl font-display font-bold drop-shadow-lg">
            {store.name}
          </h1>
          <p className="text-sm text-white/90 drop-shadow">
            {store.products} products • {totalSales} sales
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-16 relative z-10">
        {/* Store Profile Card */}
        <div className="bg-white rounded-2xl border border-sky-100 p-6 shadow-lg mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            {/* Store Logo - Now smaller, more like an avatar */}
            <div className="w-20 h-20 rounded-2xl overflow-hidden border-4 border-white shadow-lg bg-white -mt-12 sm:-mt-0">
              <img 
                src={store.image} 
                alt={store.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Store Info */}
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h2 className="text-xl sm:text-2xl font-display font-bold text-charcoal">
                      {store.name}
                    </h2>
                    {store.verified && (
                      <BadgeCheck className="w-5 h-5 text-sky-600" />
                    )}
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-3 text-sm text-slate-text/70">
                    {sellerInfo && (
                      <>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{sellerInfo.location}</span>
                        </div>
                        <span className="w-1 h-1 bg-slate-text/30 rounded-full"></span>
                      </>
                    )}
                    <div className="flex items-center gap-1">
                      <Package className="w-4 h-4" />
                      <span>{storeProducts.length} products</span>
                    </div>
                    <span className="w-1 h-1 bg-slate-text/30 rounded-full"></span>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{totalSales} total sales</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button className="p-2 border border-sky-200 rounded-lg text-sky-600 hover:bg-sky-50 transition-colors">
                    <Heart className="w-5 h-5" />
                  </button>
                  <button className="p-2 border border-sky-200 rounded-lg text-sky-600 hover:bg-sky-50 transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Store Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
                <div className="bg-sky-50 rounded-xl p-3 text-center">
                  <div className="flex items-center justify-center gap-1 text-amber-500 mb-1">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="font-bold text-charcoal">{averageRating.toFixed(1)}</span>
                  </div>
                  <p className="text-xs text-slate-text">Average Rating</p>
                </div>
                <div className="bg-sky-50 rounded-xl p-3 text-center">
                  <div className="flex items-center justify-center gap-1 text-sky-600 mb-1">
                    <Award className="w-4 h-4" />
                    <span className="font-bold text-charcoal">{store.verified ? 'Verified' : 'Not Verified'}</span>
                  </div>
                  <p className="text-xs text-slate-text">Seller Status</p>
                </div>
                <div className="bg-sky-50 rounded-xl p-3 text-center">
                  <div className="flex items-center justify-center gap-1 text-sky-600 mb-1">
                    <Calendar className="w-4 h-4" />
                    <span className="font-bold text-charcoal">2026</span>
                  </div>
                  <p className="text-xs text-slate-text">Joined</p>
                </div>
                <div className="bg-sky-50 rounded-xl p-3 text-center">
                  <div className="flex items-center justify-center gap-1 text-sky-600 mb-1">
                    <Package className="w-4 h-4" />
                    <span className="font-bold text-charcoal">{categories.length}</span>
                  </div>
                  <p className="text-xs text-slate-text">Categories</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Store Navigation/Tabs */}
        <div className="bg-white rounded-xl border border-sky-100 p-4 mb-8">
          <div className="flex overflow-x-auto gap-4 pb-1 scrollbar-hide">
            <button className="px-4 py-2 bg-sky-500 text-white rounded-lg text-sm font-medium whitespace-nowrap">
              All Products
            </button>
            {categories.map((category) => (
              <button
                key={category}
                className="px-4 py-2 text-slate-text hover:text-sky-600 rounded-lg text-sm font-medium whitespace-nowrap transition-colors"
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Products Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-display font-semibold text-charcoal">
              All Products
            </h2>
            <p className="text-sm text-slate-text mt-1">
              {storeProducts.length} items available
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-4 py-2 bg-white border border-sky-200 rounded-lg text-sm text-slate-text focus:outline-none focus:border-sky-400"
            >
              <option value="popular">Most Popular</option>
              <option value="newest">Newest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>

            {/* View Toggle */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-sky-100 text-sky-600' 
                    : 'text-slate-text hover:bg-sky-50'
                }`}
              >
                <Grid2X2 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-sky-100 text-sky-600' 
                    : 'text-slate-text hover:bg-sky-50'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Products Grid/List */}
        {storeProducts.length > 0 ? (
          <div className={
            viewMode === 'grid' 
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8' 
              : 'space-y-3 mb-8'
          }>
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} viewMode={viewMode} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-xl border border-sky-100 mb-8">
            <Package className="w-16 h-16 text-slate-text/30 mx-auto mb-4" />
            <h3 className="text-lg font-display font-medium text-charcoal mb-2">
              No Products Yet
            </h3>
            <p className="text-sm text-slate-text">
              This seller hasn't listed any products yet
            </p>
          </div>
        )}

        {/* Store Information Section */}
        <div className="bg-white rounded-xl border border-sky-100 p-6 mb-8">
          <h3 className="text-lg font-display font-semibold text-charcoal mb-4">
            Store Information
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* About */}
            <div>
              <h4 className="text-sm font-medium text-charcoal mb-2">About</h4>
              <p className="text-sm text-slate-text leading-relaxed">
                {store.name} is a trusted seller on E-TALA marketplace, offering quality products 
                to the Tala community. With {store.products} products and {totalSales} sales, 
                they're committed to providing excellent service.
              </p>
            </div>

            {/* Contact Info (placeholder) */}
            <div>
              <h4 className="text-sm font-medium text-charcoal mb-2">Contact</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-slate-text">
                  <Phone className="w-4 h-4 text-sky-600" />
                  <span>+254 700 000 000</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-text">
                  <Mail className="w-4 h-4 text-sky-600" />
                  <span>contact@{store.name.toLowerCase().replace(/\s+/g, '')}.com</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-text">
                  <Globe className="w-4 h-4 text-sky-600" />
                  <span>www.{store.name.toLowerCase().replace(/\s+/g, '')}.com</span>
                </div>
              </div>
            </div>
          </div>

          {/* Seller Badges */}
          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-sky-100">
            <span className="flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">
              <Shield className="w-3 h-3" />
              {store.verified ? 'Verified Seller' : 'Unverified Seller'}
            </span>
            <span className="flex items-center gap-1 bg-sky-100 text-sky-700 px-3 py-1 rounded-full text-xs">
              <Award className="w-3 h-3" />
              {store.rating >= 4.5 ? 'Top Rated' : 'Good Standing'}
            </span>
            <span className="flex items-center gap-1 bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs">
              <Clock className="w-3 h-3" />
              Member since 2026
            </span>
          </div>
        </div>

        {/* Removed the manual Back to Marketplace link since it's in the navbar */}
      </div>
    </div>
  );
};

export default StoreDetailPage;