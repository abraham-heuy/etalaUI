// pages/farmers/index.tsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, Grid2X2, List, ChevronRight, ArrowRight, Calendar, Sprout, 
  Sparkles, Eye, ShoppingBag, PawPrint, Tractor, Egg, Bird, Leaf, 
  CheckCircle, AlertCircle, Package as PackageIcon,
  Star, Truck, Shield, Filter, 
} from 'lucide-react';
import FarmerCategoryCard from '../../components/farmers/FarmerCategoryCard';
import FarmerProductCard from '../../components/farmers/FarmerProductCard';
import TopFarmerCard from '../../components/farmers/TopFarmerCard';
import SeasonalCard from '../../components/farmers/SeasonalCard';
import CategoryNavbar from '../../common/CategoryNavbar';
import GuestSlideshow from '../../components/marketplace/guestSlideShow';
import { WishlistProvider } from '../../contexts/commerce/wishlist.context';
import { CartProvider } from '../../contexts/commerce/cart.context';
import { tokenStore } from '../../services/Auth/auth.service';
import { farmersService, type FarmersProduct } from '../../services/farmers/farmer.service';


// Mapper: category → FarmerCategoryCard props
const mapToCategoryCard = (cat: { id: string; name: string; icon: any; count: number }) => ({
  id: cat.id,
  name: cat.name,
  icon: cat.icon,
  image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=100&h=100&fit=crop',
  subcategories: [],
  description: `${cat.name} products from local farms`,
});

// Mapper: FarmersProduct → SeasonalCard props
const mapToSeasonalItem = (product: FarmersProduct) => ({
  id: product.id,
  name: product.name,
  season: product.harvestDate ? new Date(product.harvestDate).toLocaleDateString() : 'In season',
  image: product.images?.[0] || 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=100&h=100&fit=crop',
});

// Mapper: aggregated farmer data → TopFarmerCard props
const mapToTopFarmer = (farmer: any) => ({
  id: farmer.sellerId,
  name: farmer.sellerName,
  location: farmer.sellerLocation,
  rating: farmer.sellerRating,
  products: farmer.totalProducts,
  verified: false, // backend doesn't provide yet
  organic: false,
  image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop',
  specialties: [],
});

const FarmersHome: React.FC = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filter states (only used for search, not for initial load)
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('all');
  const [organicOnly, setOrganicOnly] = useState(false);
  const [certifiedOnly, setCertifiedOnly] = useState(false);
  const [freshOnly, setFreshOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  
  // Data from API
  const [categories, setCategories] = useState<{ id: string; name: string; icon: any; count: number }[]>([]);
  const [topFarmers, setTopFarmers] = useState<any[]>([]);
  const [seasonalProduce, setSeasonalProduce] = useState<FarmersProduct[]>([]);
  const [deals, setDeals] = useState<FarmersProduct[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<FarmersProduct[]>([]);
  const [organicProducts, setOrganicProducts] = useState<FarmersProduct[]>([]);
  const [newProducts, setNewProducts] = useState<FarmersProduct[]>([]);
  
  const isLoggedIn = !!tokenStore.get();
  
  const slideshowItems = [
    { id: 1, image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1200&h=400&fit=crop', title: 'Fresh from the Farm', description: 'Farm-fresh produce delivered to your doorstep', link: '/farmers/category/vegetables' },
    { id: 2, image: 'https://images.unsplash.com/photo-1528825871115-358b8ebc9bc6?w=1200&h=400&fit=crop', title: 'Seasonal Fruits', description: 'Sweet mangoes and avocados now in season', link: '/farmers/category/fruits' },
    { id: 3, image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=1200&h=400&fit=crop', title: 'Dairy Fresh Daily', description: 'Fresh milk, yogurt, and cheese from local farms', link: '/farmers/category/dairy-eggs' },
  ];

  useEffect(() => {
    fetchFarmersData();
  }, []);

  const fetchFarmersData = async () => {
    setLoading(true);
    setError(null);
    try {
      const homeData = await farmersService.getHome();
      
      setFeaturedProducts(homeData.featured || []);
      setDeals(homeData.flashSales || []);
      setOrganicProducts(homeData.organic || []);
      setNewProducts(homeData.newArrivals || []); // Freshly harvested
      setTopFarmers(homeData.topFarms || []);
      
      // Use flashSales as seasonal for now (or create a separate seasonal array if needed)
      setSeasonalProduce(homeData.flashSales?.slice(0, 4) || []);
      
      // Build categories from homeData.categories
      if (homeData.categories && homeData.categories.length) {
        const categoryIcons: Record<string, any> = {
          vegetables: Sprout,
          fruits: Leaf,
          dairy: Egg,
          meat: Tractor,
          grains: Leaf,
          honey: Sparkles,
          herbs: Leaf,
          other: PackageIcon,
        };
        const cats = homeData.categories.map(c => ({
          id: c.name,
          name: c.name.charAt(0).toUpperCase() + c.name.slice(1),
          icon: categoryIcons[c.name] || PackageIcon,
          count: c.count,
        }));
        setCategories(cats);
      }
      
    } catch (err: any) {
      setError(err.message || 'Failed to load farmers market');
    } finally {
      setLoading(false);
    }
  };
  
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/farmers/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };
  
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedSubcategory('all');
    setOrganicOnly(false);
    setCertifiedOnly(false);
    setFreshOnly(false);
    setShowFilters(false);
  };
  
  const ProductSkeleton = () => (
    <div className="bg-white rounded-xl border border-green-100 p-3 animate-pulse">
      <div className="h-40 bg-gray-200 rounded-lg mb-3"></div>
      <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
    </div>
  );
  
  if (loading) {
    return (
      <div className="min-h-screen bg-soft-white">
        <CategoryNavbar categoryName="Farmers Market" showBackButton />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 pt-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => <ProductSkeleton key={i} />)}
          </div>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen bg-soft-white">
        <CategoryNavbar categoryName="Farmers Market" showBackButton />
        <div className="pt-32 flex items-center justify-center">
          <div className="text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <p className="text-red-600">{error}</p>
            <button onClick={fetchFarmersData} className="mt-4 text-sky-600">Retry</button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <WishlistProvider>
      <CartProvider category="farmers">
        <div className="min-h-screen bg-soft-white">
          <CategoryNavbar categoryName="Farmers Market" showBackButton />

          {/* Hero Section with Search */}
          <div className="relative bg-gradient-to-r from-green-700 to-green-900 text-white overflow-hidden pt-16">
            <div className="absolute inset-0 opacity-20">
              <img src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1600&h=400&fit=crop" alt="Farmers market" className="w-full h-full object-cover" />
            </div>
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16 lg:py-20">
              <div className="text-center max-w-3xl mx-auto">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-3">Farmers Market</h1>
                <p className="text-base sm:text-lg text-green-100 mb-6 md:mb-8">Fresh from local farms to your table</p>
                
                <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto">
                  <div className="flex flex-col sm:flex-row gap-2 bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="relative sm:w-40 border-b sm:border-b-0 sm:border-r border-green-100">
                      <select
                        value={selectedSubcategory}
                        onChange={(e) => setSelectedSubcategory(e.target.value)}
                        className="w-full h-14 pl-4 pr-8 text-sm text-charcoal bg-transparent focus:outline-none appearance-none cursor-pointer"
                      >
                        <option value="all">All Categories</option>
                        {categories.map(cat => (
                          <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        <ChevronRight className="w-4 h-4 text-slate-400 rotate-90" />
                      </div>
                    </div>
                    <div className="flex-1 flex items-center relative">
                      <Search className="absolute left-4 w-5 h-5 text-slate-400" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search for fresh produce..."
                        className="w-full h-14 pl-12 pr-4 text-charcoal bg-transparent focus:outline-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-3 transition-colors flex items-center justify-center gap-2"
                    >
                      <Search className="w-5 h-5" />
                      <span className="hidden sm:inline">Search</span>
                    </button>
                  </div>
                </form>

                {/* Filter chips (only for visual, actual filtering on search page) */}
                <div className="flex flex-wrap justify-center gap-2 mt-6 text-sm">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/20 text-white hover:bg-white/30"
                  >
                    <Filter className="w-3 h-3" /> Filters
                    {(organicOnly || certifiedOnly || freshOnly || selectedSubcategory !== 'all') && (
                      <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                    )}
                  </button>
                  {showFilters && (
                    <>
                      <button
                        onClick={() => setOrganicOnly(!organicOnly)}
                        className={`px-3 py-1.5 rounded-full transition-colors ${organicOnly ? 'bg-green-600 text-white' : 'bg-white/20 text-white hover:bg-white/30'}`}
                      >
                        <Leaf className="w-3 h-3 inline mr-1" /> Organic
                      </button>
                      <button
                        onClick={() => setCertifiedOnly(!certifiedOnly)}
                        className={`px-3 py-1.5 rounded-full transition-colors ${certifiedOnly ? 'bg-green-600 text-white' : 'bg-white/20 text-white hover:bg-white/30'}`}
                      >
                        <CheckCircle className="w-3 h-3 inline mr-1" /> Certified
                      </button>
                      <button
                        onClick={() => setFreshOnly(!freshOnly)}
                        className={`px-3 py-1.5 rounded-full transition-colors ${freshOnly ? 'bg-green-600 text-white' : 'bg-white/20 text-white hover:bg-white/30'}`}
                      >
                        <Calendar className="w-3 h-3 inline mr-1" /> Freshly Harvested
                      </button>
                      {(organicOnly || certifiedOnly || freshOnly || selectedSubcategory !== 'all') && (
                        <button onClick={resetFilters} className="px-3 py-1.5 rounded-full bg-white/20 text-white hover:bg-white/30">
                          Reset
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Guest Slideshow */}
          {!isLoggedIn && (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 -mt-8 relative z-10">
              <GuestSlideshow items={slideshowItems} />
            </div>
          )}

          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-12">
            {/* Categories Grid */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-display font-semibold text-charcoal">Shop by Category</h2>
                <Link to="/farmers/categories" className="text-sm text-green-600 hover:text-green-700 flex items-center gap-1">
                  View all <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {categories.slice(0, 6).map(cat => (
                  <FarmerCategoryCard key={cat.id} category={mapToCategoryCard(cat)} />
                ))}
              </div>
            </section>

            {/* Flash Deals */}
            {deals.length > 0 && (
              <section className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-6 border border-red-200">
                <div className="flex items-center gap-3 mb-6">
                  <Sparkles className="w-8 h-8 text-red-500" />
                  <div>
                    <h2 className="text-2xl font-display font-semibold text-charcoal">Flash Deals</h2>
                    <p className="text-sm text-slate-text">Limited time offers – hurry!</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {deals.slice(0, 4).map(product => (
                    <FarmerProductCard key={product.id} product={product} viewMode="grid" />
                  ))}
                </div>
              </section>
            )}

            {/* Seasonal Produce */}
            {seasonalProduce.length > 0 && (
              <section className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-amber-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-display font-semibold text-charcoal">In Season Now</h2>
                      <p className="text-sm text-slate-text">Fresh picks at their peak flavor</p>
                    </div>
                  </div>
                  <Link to="/farmers/seasonal" className="inline-flex items-center gap-2 text-amber-700 bg-amber-100 px-4 py-2 rounded-full text-sm font-medium hover:bg-amber-200">
                    View all seasonal <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {seasonalProduce.map(item => (
                    <SeasonalCard key={item.id} item={mapToSeasonalItem(item)} />
                  ))}
                </div>
              </section>
            )}

            {/* Featured Products */}
            {featuredProducts.length > 0 && (
              <section>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <h2 className="text-2xl font-display font-semibold text-charcoal">Featured Produce</h2>
                    <p className="text-sm text-slate-text mt-1">Top-rated items from local farmers</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => setViewMode('grid')} className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-green-100 text-green-600' : 'text-slate-text hover:bg-green-50'}`}>
                      <Grid2X2 className="w-5 h-5" />
                    </button>
                    <button onClick={() => setViewMode('list')} className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-green-100 text-green-600' : 'text-slate-text hover:bg-green-50'}`}>
                      <List className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4' : 'space-y-3'}>
                  {featuredProducts.slice(0, 4).map(product => (
                    <FarmerProductCard key={product.id} product={product} viewMode={viewMode} />
                  ))}
                </div>
              </section>
            )}

            {/* Certified Organic Section */}
            {organicProducts.length > 0 && (
              <section className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Sprout className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-display font-semibold text-charcoal">Certified Organic</h2>
                    <p className="text-sm text-slate-text">Grown without chemicals or pesticides</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {organicProducts.slice(0, 4).map(product => (
                    <FarmerProductCard key={product.id} product={product} viewMode="grid" />
                  ))}
                </div>
              </section>
            )}

            {/* Top Farmers */}
            {topFarmers.length > 0 && (
              <section>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-display font-semibold text-charcoal">Top Farmers</h2>
                    <p className="text-sm text-slate-text mt-1">Meet our trusted local growers</p>
                  </div>
                  <Link to="/farmers/all" className="text-sm text-green-600 hover:text-green-700 flex items-center gap-1">
                    View all <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {topFarmers.slice(0, 3).map((farmer, idx) => (
                    <TopFarmerCard key={idx} farmer={mapToTopFarmer(farmer)} />
                  ))}
                </div>
              </section>
            )}

            {/* New Arrivals (Freshly Harvested) */}
            {newProducts.length > 0 && (
              <section>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-display font-semibold text-charcoal">Freshly Harvested</h2>
                    <p className="text-sm text-slate-text mt-1">Just arrived from the farm</p>
                  </div>
                  <Link to="/farmers/new-arrivals" className="text-sm text-green-600 hover:text-green-700 flex items-center gap-1">
                    View all <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {newProducts.slice(0, 4).map(product => (
                    <FarmerProductCard key={product.id} product={product} viewMode="grid" />
                  ))}
                </div>
              </section>
            )}

            {/* Livestock & Pets Section (static promotional) */}
            <section className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-2xl p-8 border border-amber-300 shadow-lg">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center gap-2 bg-amber-100 text-amber-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                  <Sparkles className="w-4 h-4" />
                  <span>Introducing All New</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-display font-bold text-charcoal mb-3">Livestock & Pets</h2>
                <p className="text-lg text-slate-text max-w-2xl mx-auto">
                  Connect directly with farmers to buy healthy livestock, poultry, and pets. Browse, inquire, and arrange your own purchase.
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
              <div className="bg-white rounded-2xl overflow-hidden shadow-xl border-2 border-amber-300 mb-6 transform hover:scale-[1.02] transition-transform">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="h-64 md:h-auto relative">
                    <img src="https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?w=600&h=400&fit=crop" alt="Featured Livestock" className="w-full h-full object-cover" />
                    <div className="absolute top-4 left-4 bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                      <Eye className="w-4 h-4" /> Featured Listing
                    </div>
                  </div>
                  <div className="p-6 flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">Dairy Cow</span>
                      <span className="bg-amber-100 text-amber-700 text-xs px-2 py-1 rounded-full">Purebred</span>
                    </div>
                    <h3 className="text-2xl font-display font-bold text-charcoal mb-2">Friesian Dairy Cow</h3>
                    <p className="text-slate-text mb-4">
                      Purebred Friesian cow, 3 years old, currently producing 20L of milk per day. Vaccinated, healthy, and ready for breeding. Comes with health records.
                    </p>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-1"><Tractor className="w-4 h-4 text-amber-600" /><span className="text-sm">Kilonzo Farm</span></div>
                      <span className="w-1 h-1 bg-slate-text/30 rounded-full"></span><span className="text-sm text-slate-text">Kyumbi</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div><span className="text-2xl font-bold text-amber-600">KSh 85,000</span></div>
                      <Link to="/farmers/livestock/featured" className="bg-amber-500 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-amber-600 flex items-center gap-2">
                        <ShoppingBag className="w-4 h-4" /> Inquire Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-amber-50 rounded-xl p-4 mb-6">
                <p className="text-sm text-amber-800 text-center">
                  <span className="font-semibold">How it works:</span> Browse listings, contact farmers directly, and arrange your own purchase and delivery. E-TALA connects you with trusted sellers.
                </p>
              </div>
              <div className="text-center">
                <Link to="/farmers/livestock" className="inline-flex items-center gap-2 bg-white border-2 border-amber-300 text-amber-700 px-8 py-3 rounded-full text-base font-semibold hover:bg-amber-50 shadow-md">
                  Browse All Livestock & Pets <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </section>

            {/* Trust Badges */}
            <section className="bg-white rounded-2xl border border-green-100 p-8 text-center">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
                    <Shield className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-charcoal">Secure Payments</h3>
                  <p className="text-xs text-slate-text mt-1">100% secure transactions</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
                    <Truck className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-charcoal">Fast Delivery</h3>
                  <p className="text-xs text-slate-text mt-1">Same-day delivery in Tala</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
                    <Star className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-charcoal">Quality Guarantee</h3>
                  <p className="text-xs text-slate-text mt-1">Authentic farm-fresh products</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </CartProvider>
    </WishlistProvider>
  );
};

export default FarmersHome;