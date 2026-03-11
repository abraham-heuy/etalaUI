// pages/marketplace/index.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Grid2X2,
  List,
  ChevronRight,
  ArrowRight,
  Tag,
  ShoppingBag,
  Shirt
} from 'lucide-react';
import { categories, products, popularStores } from '../../data/marketplace';
import ProductCard from '../../components/marketplace/ProductCard';
import CategoryCard from '../../components/marketplace/CategoryCard';
import StoreCard from '../../components/marketplace/StoneCard';
import GuestSlideshow from '../../components/marketplace/guestSlideShow';
import CategoryNavbar from '../../common/CategoryNavbar';

const MarketplaceHome: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory] = useState<string>('all');
  
  // Filter products
  const newProducts = products.filter(p => !p.isMtush).slice(0, 4);
  // Mtush is specifically for pre-owned fashion/clothing items
  const mtushProducts = products.filter(p => p.isMtush && p.category === 'fashion').slice(0, 4);
  const featuredProducts = products.filter(p => p.rating >= 4.8).slice(0, 4);

  // Slideshow items for guests
  const slideshowItems = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
      title: 'Electronics Sale',
      description: 'Up to 40% off on smartphones & laptops',
      link: '/marketplace/category/electronics'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
      title: 'Fashion Week',
      description: 'New arrivals from top local brands',
      link: '/marketplace/category/fashion'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
      title: 'Home Essentials',
      description: 'Everything for your home at great prices',
      link: '/marketplace/category/household'
    }
  ];

  return (
    <div className="min-h-screen bg-soft-white">
      {/* Category Navbar */}
      <CategoryNavbar categoryName="Marketplace" showBackButton={true} />

      {/* Header Section - adjusted padding for fixed navbar */}
      <div className="bg-gradient-to-b from-sky-50 to-white border-b border-sky-100 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-display font-bold text-charcoal mb-2">
                Marketplace
              </h1>
              <p className="text-slate-text">
                Discover amazing products from local sellers in Tala
              </p>
            </div>
            
            {/* Search Bar */}
            <div className="w-full md:w-96">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-text/40" />
                <input
                  type="text"
                  placeholder="Search in marketplace..."
                  className="w-full pl-10 pr-4 py-3 bg-white border border-sky-200 rounded-xl focus:outline-none focus:border-sky-400 focus:ring-4 focus:ring-sky-100 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex overflow-x-auto gap-2 mt-6 pb-2 scrollbar-hide">
            <Link
              to="/marketplace"
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                selectedCategory === 'all'
                  ? 'bg-sky-500 text-white shadow-md'
                  : 'bg-white border border-sky-200 text-slate-text hover:border-sky-400'
              }`}
            >
              All Categories
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/marketplace/category/${cat.id}`}
                className="px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all bg-white border border-sky-200 text-slate-text hover:border-sky-400 flex items-center gap-1"
              >
                <ShoppingBag className="w-4 h-4" />
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Guest Slideshow Section */}
      {!localStorage.getItem('user') && (
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
              to="/marketplace/categories"
              className="text-sm text-sky-600 hover:text-sky-700 flex items-center gap-1"
            >
              View all
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </section>

        {/* Featured Products */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-display font-semibold text-charcoal">
                Featured Products
              </h2>
              <p className="text-sm text-slate-text mt-1">
                Top-rated items from verified sellers
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-sky-100 text-sky-600' 
                    : 'text-slate-text hover:bg-sky-50'
                }`}
                aria-label="Grid view"
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
              <ProductCard key={product.id} product={product} viewMode={viewMode} />
            ))}
          </div>
        </section>

        {/* Think Twice (Mtush) Section */}
        <section className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                <Shirt className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h2 className="text-2xl font-display font-semibold text-charcoal">
                  Think Twice <span className="text-amber-600">(Mtush)</span>
                </h2>
                <p className="text-sm text-slate-text">
                  Pre-loved fashion & clothing at great prices
                </p>
              </div>
            </div>
            <Link
              to="/marketplace/mtush"
              className="inline-flex items-center gap-2 text-amber-700 bg-amber-100 px-4 py-2 rounded-full text-sm font-medium hover:bg-amber-200 transition-colors"
            >
              Browse all Mtush items
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {mtushProducts.length > 0 ? (
              mtushProducts.map((product) => (
                <div key={product.id} className="relative">
                  <ProductCard product={product} viewMode="grid" />
                  <div className="absolute top-2 left-2 bg-amber-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                    <Tag className="w-3 h-3" />
                    Pre-loved
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-4 text-center py-8 bg-white/50 rounded-xl">
                <Shirt className="w-12 h-12 text-amber-300 mx-auto mb-3" />
                <p className="text-sm text-slate-text">No pre-loved items yet</p>
                <p className="text-xs text-slate-text/70 mt-1">Check back soon!</p>
              </div>
            )}
          </div>
        </section>

        {/* Popular Stores */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-display font-semibold text-charcoal">
              Popular Stores
            </h2>
            <Link 
              to="/marketplace/stores"
              className="text-sm text-sky-600 hover:text-sky-700 flex items-center gap-1"
            >
              View all
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {popularStores.map((store) => (
              <StoreCard key={store.id} store={store} />
            ))}
          </div>
        </section>

        {/* New Arrivals */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-display font-semibold text-charcoal">
                New Arrivals
              </h2>
              <p className="text-sm text-slate-text mt-1">
                Fresh from our sellers
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {newProducts.map((product) => (
              <ProductCard key={product.id} product={product} viewMode="grid" />
            ))}
          </div>
        </section>

    
      </div>
    </div>
  );
};

export default MarketplaceHome;