// pages/farmers/index.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Grid2X2,
  List,
  ChevronRight,
  ArrowRight,
  Calendar,
  Sprout,
  Sparkles,
  Eye,
  ShoppingBag,
  PawPrint,
  Tractor,
  Egg,
  Bird
} from 'lucide-react';
import { farmerCategories, farmerProducts, topFarmers, seasonalProduce } from '../../data/farmers';
import FarmerCategoryCard from '../../components/farmers/FarmerCategoryCard';
import FarmerProductCard from '../../components/farmers/FarmerProductCard';
import TopFarmerCard from '../../components/farmers/TopFarmerCard';
import SeasonalCard from '../../components/farmers/SeasonalCard';
import CategoryNavbar from '../../common/CategoryNavbar';
import GuestSlideshow from '../../components/marketplace/guestSlideShow';
import { WishlistProvider } from '../../contexts/commerce/wishlist.context';
import { CartProvider } from '../../contexts/commerce/cart.context';
import { tokenStore } from '../../services/Auth/auth.service';

const FarmersHome: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory] = useState<string>('all');
  
  // Filter products
  const newProducts = farmerProducts.slice(0, 4);
  const featuredProducts = farmerProducts.filter(p => p.rating >= 4.8).slice(0, 4);
  const organicProducts = farmerProducts.filter(p => p.farmer.organic).slice(0, 4);

  // Check if user is logged in via token
  const isLoggedIn = !!tokenStore.get();

  // Slideshow items for guests
  const slideshowItems = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
      title: 'Fresh from the Farm',
      description: 'Farm-fresh produce delivered to your doorstep',
      link: '/farmers/category/vegetables'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1528825871115-358b8ebc9bc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
      title: 'Seasonal Fruits',
      description: 'Sweet mangoes and avocados now in season',
      link: '/farmers/category/fruits'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80',
      title: 'Dairy Fresh Daily',
      description: 'Fresh milk, yogurt, and cheese from local farms',
      link: '/farmers/category/dairy-eggs'
    }
  ];

  return (
    <WishlistProvider>
      <CartProvider category="farmers">
        <div className="min-h-screen bg-soft-white">
          <CategoryNavbar categoryName="Farmers Market" showBackButton={false} />

          {/* Header Section */}
          <div className="bg-gradient-to-b from-green-50 to-white border-b border-green-100 pt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h1 className="text-3xl sm:text-4xl font-display font-bold text-charcoal mb-2">
                    Farmers Market
                  </h1>
                  <p className="text-slate-text">
                    Fresh from local farms to your table
                  </p>
                </div>
                
                <div className="w-full md:w-96">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-text/40" />
                    <input
                      type="text"
                      placeholder="Search for fresh produce..."
                      className="w-full pl-10 pr-4 py-3 bg-white border border-green-200 rounded-xl focus:outline-none focus:border-green-400 focus:ring-4 focus:ring-green-100 transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="flex overflow-x-auto gap-2 mt-6 pb-2 scrollbar-hide">
                <Link
                  to="/farmers"
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    selectedCategory === 'all'
                      ? 'bg-green-600 text-white shadow-md'
                      : 'bg-white border border-green-200 text-slate-text hover:border-green-400'
                  }`}
                >
                  All Categories
                </Link>
                {farmerCategories.map((cat) => (
                  <Link
                    key={cat.id}
                    to={`/farmers/category/${cat.id}`}
                    className="px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all bg-white border border-green-200 text-slate-text hover:border-green-400 flex items-center gap-1"
                  >
                    <cat.icon className="w-4 h-4 text-green-600" />
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Guest Slideshow - only for non-logged-in users */}
          {!isLoggedIn && (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
              <GuestSlideshow items={slideshowItems} />
            </div>
          )}

          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-12">
            {/* Categories Grid */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-display font-semibold text-charcoal">
                  Shop by Category
                </h2>
                <Link 
                  to="/farmers/categories"
                  className="text-sm text-green-600 hover:text-green-700 flex items-center gap-1"
                >
                  View all
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {farmerCategories.map((category) => (
                  <FarmerCategoryCard key={category.id} category={category} />
                ))}
              </div>
            </section>

            {/* Seasonal Produce */}
            <section className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-display font-semibold text-charcoal">
                      In Season Now
                    </h2>
                    <p className="text-sm text-slate-text">
                      Fresh picks at their peak flavor
                    </p>
                  </div>
                </div>
                <Link
                  to="/farmers/seasonal"
                  className="inline-flex items-center gap-2 text-amber-700 bg-amber-100 px-4 py-2 rounded-full text-sm font-medium hover:bg-amber-200 transition-colors"
                >
                  View all seasonal
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {seasonalProduce.map((item) => (
                  <SeasonalCard key={item.id} item={item} />
                ))}
              </div>
            </section>

            {/* Featured Products */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-display font-semibold text-charcoal">
                    Featured Produce
                  </h2>
                  <p className="text-sm text-slate-text mt-1">
                    Top-rated items from local farmers
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === 'grid' 
                        ? 'bg-green-100 text-green-600' 
                        : 'text-slate-text hover:bg-green-50'
                    }`}
                    aria-label="Grid view"
                  >
                    <Grid2X2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === 'list' 
                        ? 'bg-green-100 text-green-600' 
                        : 'text-slate-text hover:bg-green-50'
                    }`}
                    aria-label="List view"
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className={
                viewMode === 'grid' 
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4' 
                  : 'space-y-3'
              }>
                {featuredProducts.map((product) => (
                  <FarmerProductCard key={product.id} product={product} viewMode={viewMode} />
                ))}
              </div>
            </section>

            {/* Organic Section */}
            <section className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Sprout className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-display font-semibold text-charcoal">
                    Certified Organic
                  </h2>
                  <p className="text-sm text-slate-text">
                    Grown without chemicals or pesticides
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {organicProducts.map((product) => (
                  <FarmerProductCard key={product.id} product={product} viewMode="grid" />
                ))}
              </div>
            </section>

            {/* Top Farmers */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-display font-semibold text-charcoal">
                    Top Farmers
                  </h2>
                  <p className="text-sm text-slate-text mt-1">
                    Meet our trusted local growers
                  </p>
                </div>
                <Link 
                  to="/farmers/all"
                  className="text-sm text-green-600 hover:text-green-700 flex items-center gap-1"
                >
                  View all
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {topFarmers.slice(0, 3).map((farmer) => (
                  <TopFarmerCard key={farmer.id} farmer={farmer} />
                ))}
              </div>
            </section>

            {/* New Arrivals */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-display font-semibold text-charcoal">
                    Freshly Harvested
                  </h2>
                  <p className="text-sm text-slate-text mt-1">
                    Just arrived from the farm
                  </p>
                </div>
                <Link
                  to="/farmers/new-arrivals"
                  className="text-sm text-green-600 hover:text-green-700 flex items-center gap-1"
                >
                  View all
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {newProducts.map((product) => (
                  <FarmerProductCard key={product.id} product={product} viewMode="grid" />
                ))}
              </div>
            </section>

            {/* Livestock & Pets Section */}
            <section className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-2xl p-8 border border-amber-300 shadow-lg">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center gap-2 bg-amber-100 text-amber-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                  <Sparkles className="w-4 h-4" />
                  <span>Introducing All New</span>
                </div>
                
                <h2 className="text-3xl sm:text-4xl font-display font-bold text-charcoal mb-3">
                  Livestock & Pets
                </h2>
                
                <p className="text-lg text-slate-text max-w-2xl mx-auto">
                  Connect directly with farmers to buy healthy livestock, poultry, and pets. 
                  Browse, inquire, and arrange your own purchase.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                {[
                  { icon: Tractor, label: 'Dairy Cows' },
                  { icon: PawPrint, label: 'Goats & Sheep' },
                  { icon: Bird, label: 'Poultry' },
                  { icon: Egg, label: 'Breeding Stock' },
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={idx} className="text-center">
                      <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Icon className="w-6 h-6 text-amber-600" />
                      </div>
                      <p className="text-xs font-medium text-charcoal">{item.label}</p>
                    </div>
                  );
                })}
              </div>

              <div className="bg-white rounded-2xl overflow-hidden shadow-xl border-2 border-amber-300 mb-6 transform hover:scale-[1.02] transition-transform duration-300">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="h-64 md:h-auto relative">
                    <img 
                      src="https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80" 
                      alt="Featured Livestock"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      Featured Listing
                    </div>
                  </div>
                  
                  <div className="p-6 flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                        Dairy Cow
                      </span>
                      <span className="bg-amber-100 text-amber-700 text-xs px-2 py-1 rounded-full">
                        Purebred
                      </span>
                    </div>
                    
                    <h3 className="text-2xl font-display font-bold text-charcoal mb-2">
                      Friesian Dairy Cow
                    </h3>
                    
                    <p className="text-slate-text mb-4">
                      Purebred Friesian cow, 3 years old, currently producing 20L of milk per day. 
                      Vaccinated, healthy, and ready for breeding. Comes with health records.
                    </p>
                    
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-1">
                        <Tractor className="w-4 h-4 text-amber-600" />
                        <span className="text-sm">Kilonzo Farm</span>
                      </div>
                      <span className="w-1 h-1 bg-slate-text/30 rounded-full"></span>
                      <span className="text-sm text-slate-text">Kyumbi</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold text-amber-600">KSh 85,000</span>
                      </div>
                      <Link
                        to="/farmers/livestock/featured"
                        className="bg-amber-500 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-amber-600 transition-colors flex items-center gap-2"
                      >
                        <ShoppingBag className="w-4 h-4" />
                        Inquire Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 rounded-xl p-4 mb-6">
                <p className="text-sm text-amber-800 text-center">
                  <span className="font-semibold">How it works:</span> Browse listings, contact farmers directly, 
                  and arrange your own purchase and delivery. E-TALA connects you with trusted sellers.
                </p>
              </div>

              <div className="text-center">
                <Link
                  to="/farmers/livestock"
                  className="inline-flex items-center gap-2 bg-white border-2 border-amber-300 text-amber-700 px-8 py-3 rounded-full text-base font-semibold hover:bg-amber-50 transition-colors shadow-md"
                >
                  Browse All Livestock & Pets
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </section>
          </div>
        </div>
      </CartProvider>
    </WishlistProvider>
  );
};

export default FarmersHome;