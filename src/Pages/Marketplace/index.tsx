// pages/marketplace/index.tsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search, Grid2X2, List, ChevronRight, ArrowRight, Tag,
  Shirt, Zap, Star, Shield, Truck, Gift, Percent, TrendingUp,
  Bike, BookOpen, Home, Smartphone, Sparkles, MoreHorizontal
} from 'lucide-react';
import ProductCard from '../../components/marketplace/ProductCard';
import CategoryCard from '../../components/marketplace/CategoryCard';
import StoreCard from '../../components/marketplace/StoneCard';
import GuestSlideshow from '../../components/marketplace/guestSlideShow';
import CategoryNavbar from '../../common/CategoryNavbar';
import { WishlistProvider } from '../../contexts/commerce/wishlist.context';
import { CartProvider } from '../../contexts/commerce/cart.context';
import { tokenStore } from '../../services/Auth/auth.service';
import { MarketplaceService, type MarketplaceProduct } from '../../services/Marketplace/marketplace.service';

// Define proper Category interface
interface Category {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  subcategories: string[];
  count: number;
  image: string;
}

const categoryConfig: Category[] = [
  { id: 'electronics', name: 'Electronics', icon: Smartphone, subcategories: [], count: 0, image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=100&h=100&fit=crop' },
  { id: 'fashion', name: 'Fashion', icon: Shirt, subcategories: [], count: 0, image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=100&h=100&fit=crop' },
  { id: 'household', name: 'Household', icon: Home, subcategories: [], count: 0, image: 'https://images.unsplash.com/photo-1583845112203-29329904732e?w=100&h=100&fit=crop' },
  { id: 'beauty', name: 'Beauty', icon: Sparkles, subcategories: [], count: 0, image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=100&h=100&fit=crop' },
  { id: 'sports', name: 'Sports', icon: Bike, subcategories: [], count: 0, image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=100&h=100&fit=crop' },
  { id: 'books', name: 'Books', icon: BookOpen, subcategories: [], count: 0, image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=100&h=100&fit=crop' },
];

const moreCategory: Category = {
  id: 'more',
  name: 'More',
  icon: MoreHorizontal,
  subcategories: [],
  count: 0,
  image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=100&h=100&fit=crop',
};

const mapToProduct = (p: MarketplaceProduct) => ({
  id: p.id,
  name: p.name,
  description: p.description,
  price: Number(p.price),
  originalPrice: p.originalPrice ? Number(p.originalPrice) : undefined,
  image: p.images?.[0] || '',
  images: p.images || [],
  rating: Number(p.rating) || 0,
  seller: {
    id: p.sellerId,
    name: p.sellerName || 'Unknown seller',
    verified: (p as any).sellerVerified ?? false,
    rating: Number(p.sellerRating) || 0,
    totalSales: p.totalSales || 0,
    location: p.sellerLocation || 'Tala',
  },
  reviews: p.reviewCount || 0,
  inStock: (p.stockQuantity || 0) > 0,
  tags: p.tags || [],
  isMtush: p.isMtush || false,
  condition: p.condition,
  category: p.category,
  subcategory: p.subcategory,
  createdAt: p.createdAt,
  brand: p.brand,
  modelNumber: p.modelNumber,
});

const MarketplaceHome: React.FC = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [featured, setFeatured] = useState<MarketplaceProduct[]>([]);
  const [newArrivals, setNewArrivals] = useState<MarketplaceProduct[]>([]);
  const [mtush, setMtush] = useState<MarketplaceProduct[]>([]);
  const [topSellers, setTopSellers] = useState<any[]>([]);
  const [deals, setDeals] = useState<MarketplaceProduct[]>([]);
  const [trending, setTrending] = useState<MarketplaceProduct[]>([]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState<Category[]>(categoryConfig);
  const [, setLoadingCategories] = useState(true);

  useEffect(() => {
    fetchAllData();
    fetchCategoryDetails();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    setError(null);
    try {
      const home = await MarketplaceService.getHome();
      setFeatured(home.featured || []);
      setNewArrivals(home.newArrivals || []);
      setMtush(home.mtush || []);
      setTopSellers(home.topSellers || []);

      try {
        const dealsData = await MarketplaceService.getDeals(1, 4);
        setDeals(dealsData);
      } catch (e) {
        console.warn('Failed to load deals', e);
        setDeals([]);
      }

      try {
        const trendingData = await MarketplaceService.getTrending(1, 4);
        setTrending(trendingData);
      } catch (e) {
        console.warn('Failed to load trending', e);
        setTrending([]);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load marketplace');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategoryDetails = async () => {
    setLoadingCategories(true);
    try {
      const updatedCategories = await Promise.all(
        categoryConfig.map(async (cat) => {
          try {
            const products = await MarketplaceService.getCategory(cat.id);
            const productArray = Array.isArray(products) ? products : [];
            const subcategories = [...new Set(productArray.map(p => p.subcategory).filter(Boolean))] as string[];
            return { ...cat, count: productArray.length, subcategories };
          } catch (err) {
            console.warn(`Failed to load category ${cat.id}:`, err);
            return { ...cat, count: 0, subcategories: [] };
          }
        })
      );
      setCategories(updatedCategories);
    } catch (err) {
      console.error('Failed to load category details', err);
    } finally {
      setLoadingCategories(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const params = new URLSearchParams();
      params.append('q', searchQuery.trim());
      if (selectedCategory) params.append('category', selectedCategory);
      navigate(`/marketplace/search?${params.toString()}`);
    }
  };

  const handlePopularTagClick = (tag: string) => {
    const params = new URLSearchParams();
    params.append('q', tag);
    if (selectedCategory) params.append('category', selectedCategory);
    navigate(`/marketplace/search?${params.toString()}`);
  };

  const isLoggedIn = !!tokenStore.get();

  const heroSlides = [
    { id: 1, image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=400&fit=crop', title: 'Electronics Sale', description: 'Up to 40% off on smartphones & laptops', link: '/marketplace/category/electronics' },
    { id: 2, image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=1200&h=400&fit=crop', title: 'Fashion Week', description: 'New arrivals from top local brands', link: '/marketplace/category/fashion' },
    { id: 3, image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=1200&h=400&fit=crop', title: 'Home Essentials', description: 'Everything for your home at great prices', link: '/marketplace/category/household' },
  ];

  const ProductSkeleton = () => (
    <div className="bg-white rounded-xl border border-sky-100 p-3 animate-pulse">
      <div className="h-40 bg-gray-200 rounded-lg mb-3"></div>
      <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
    </div>
  );

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">{error}</p>
          <button onClick={fetchAllData} className="mt-4 text-sky-600">Retry</button>
        </div>
      </div>
    );
  }

  const allCategories = [...categories, moreCategory];

  return (
    <WishlistProvider>
      <CartProvider category="marketplace">
        <div className="min-h-screen bg-soft-white">
          <CategoryNavbar categoryName="Marketplace" showBackButton={true} />

          {/* Hero Section */}
          <div className="relative bg-gradient-to-r from-sky-700 to-sky-900 text-white overflow-hidden pt-16">
            <div className="absolute inset-0 opacity-20">
              <img src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1600&h=400&fit=crop" alt="Marketplace hero" className="w-full h-full object-cover" />
            </div>
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16 lg:py-20">
              <div className="text-center max-w-3xl mx-auto">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-3">Shop Local, Save More</h1>
                <p className="text-base sm:text-lg text-sky-100 mb-6 md:mb-8">Discover thousands of products from trusted sellers in Tala and beyond</p>

                <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto">
                  <div className="flex flex-col sm:flex-row gap-2 bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="relative sm:w-40 border-b sm:border-b-0 sm:border-r border-sky-100">
                      <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="w-full h-14 pl-4 pr-8 text-sm text-charcoal bg-transparent focus:outline-none appearance-none cursor-pointer">
                        <option value="">All Categories</option>
                        <option value="electronics">Electronics</option>
                        <option value="fashion">Fashion</option>
                        <option value="household">Household</option>
                        <option value="beauty">Beauty</option>
                        <option value="sports">Sports</option>
                        <option value="books">Books</option>
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"><ChevronRight className="w-4 h-4 text-slate-400 rotate-90" /></div>
                    </div>
                    <div className="flex-1 flex items-center relative">
                      <Search className="absolute left-4 w-5 h-5 text-slate-400" />
                      <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search for products, brands..." className="w-full h-14 pl-12 pr-4 text-charcoal bg-transparent focus:outline-none" />
                    </div>
                    <button type="submit" className="bg-sky-500 hover:bg-sky-600 text-white font-medium px-6 py-3 transition-colors flex items-center justify-center gap-2">
                      <Search className="w-5 h-5" /><span className="hidden sm:inline">Search</span>
                    </button>
                  </div>
                </form>

                <div className="flex flex-wrap justify-center gap-2 mt-6 text-sm text-sky-100">
                  <span className="opacity-75">Popular:</span>
                  {['iphone', 'shoes', 'laptop', 'dress'].map(tag => (
                    <button key={tag} onClick={() => handlePopularTagClick(tag)} className="hover:text-white transition px-2 py-1 rounded-full hover:bg-white/10">{tag}</button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {!isLoggedIn && (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 -mt-8 relative z-10">
              <GuestSlideshow items={heroSlides} />
            </div>
          )}

          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-12">
            {/* Categories */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-display font-semibold text-charcoal">Shop by Category</h2>
                <Link to="/marketplace/categories" className="text-sm text-sky-600 hover:text-sky-700 flex items-center gap-1">View all <ChevronRight className="w-4 h-4" /></Link>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4">
                {allCategories.map(cat => <CategoryCard key={cat.id} category={cat} />)}
              </div>
            </section>

            {/* Flash Deals */}
            {deals.length > 0 && (
              <section className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-6 border border-red-200">
                <div className="flex items-center gap-3 mb-6">
                  <Zap className="w-8 h-8 text-red-500" />
                  <div><h2 className="text-2xl font-display font-semibold text-charcoal">Flash Deals</h2><p className="text-sm text-slate-text">Limited time offers – hurry!</p></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {deals.slice(0, 4).map(p => <ProductCard key={p.id} product={mapToProduct(p)} viewMode="grid" />)}
                </div>
              </section>
            )}

            {/* Trending Products */}
            {trending.length > 0 && (
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <TrendingUp className="w-7 h-7 text-purple-600" />
                  <div><h2 className="text-2xl font-display font-semibold text-charcoal">Trending Now</h2><p className="text-sm text-slate-text">Most popular items this week</p></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {trending.slice(0, 4).map(p => <ProductCard key={p.id} product={mapToProduct(p)} viewMode="grid" />)}
                </div>
              </section>
            )}

            {/* Deals & Promos */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <Gift className="w-7 h-7 text-green-600" />
                <div><h2 className="text-2xl font-display font-semibold text-charcoal">Deals & Promos</h2><p className="text-sm text-slate-text">Special offers just for you</p></div>
              </div>
              {deals.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {deals.slice(0, 4).map(p => (
                    <div key={p.id} className="relative">
                      <ProductCard product={mapToProduct(p)} viewMode="grid" />
                      <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1"><Percent className="w-3 h-3" /> Promo</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-xl border border-sky-100 p-8 text-center">
                  <Percent className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <p className="text-slate-text">No active promos this week</p>
                  <p className="text-xs text-slate-text/70 mt-1">Check back soon for great deals!</p>
                </div>
              )}
            </section>

            {/* Featured Products */}
            <section>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div><h2 className="text-2xl font-display font-semibold text-charcoal">Featured Products</h2><p className="text-sm text-slate-text mt-1">Top-rated items from verified sellers</p></div>
                <div className="flex items-center gap-2">
                  <button onClick={() => setViewMode('grid')} className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-sky-100 text-sky-600' : 'text-slate-text hover:bg-sky-50'}`}><Grid2X2 className="w-5 h-5" /></button>
                  <button onClick={() => setViewMode('list')} className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-sky-100 text-sky-600' : 'text-slate-text hover:bg-sky-50'}`}><List className="w-5 h-5" /></button>
                </div>
              </div>
              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">{[...Array(4)].map((_, i) => <ProductSkeleton key={i} />)}</div>
              ) : (
                <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4' : 'space-y-3'}>
                  {featured.map(p => <ProductCard key={p.id} product={mapToProduct(p)} viewMode={viewMode} />)}
                </div>
              )}
            </section>

            {/* Think Twice (Mtush) */}
            {mtush.length > 0 && (
              <section className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center"><Shirt className="w-6 h-6 text-amber-600" /></div>
                    <div><h2 className="text-2xl font-display font-semibold text-charcoal">Think Twice <span className="text-amber-600">(Mtush)</span></h2><p className="text-sm text-slate-text">Pre-loved fashion & clothing at great prices</p></div>
                  </div>
                  <Link to="/marketplace/mtush" className="inline-flex items-center gap-2 text-amber-700 bg-amber-100 px-4 py-2 rounded-full text-sm font-medium hover:bg-amber-200 transition-colors">Browse all <ArrowRight className="w-4 h-4" /></Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {mtush.slice(0, 4).map(p => (
                    <div key={p.id} className="relative">
                      <ProductCard product={mapToProduct(p)} viewMode="grid" />
                      <div className="absolute top-2 left-2 bg-amber-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1"><Tag className="w-3 h-3" /> Pre-loved</div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Popular Stores (from backend) */}
            {topSellers.length > 0 && (
              <section>
                <div className="flex items-center justify-between mb-6">
                  <div><h2 className="text-2xl font-display font-semibold text-charcoal">Popular Stores</h2><p className="text-sm text-slate-text mt-1">Trusted sellers with high ratings</p></div>
                  <Link to="/marketplace/stores" className="text-sm text-sky-600 hover:text-sky-700 flex items-center gap-1">View all <ChevronRight className="w-4 h-4" /></Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {topSellers.map((store: any) => {
                    const storeId = store.id || store.sellerId;   // ✅ prioritise id, fallback to sellerId
                    if (!storeId) {
                      console.warn('Store missing id and sellerId', store);
                      return null;                               // skip rendering broken store
                    }
                    return (
                      <StoreCard
                        key={storeId}
                        store={{
                          id: storeId,
                          name: store.name || store.sellerName,
                          image: store.avatar || store.image,
                          products: store.productCount || 0,
                          rating: Number(store.rating || store.sellerRating || 0),
                          verified: store.verified ?? store.sellerVerified ?? false
                        }}
                      />
                    );
                  })}
                </div>
              </section>
            )}

            {/* New Arrivals */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <div><h2 className="text-2xl font-display font-semibold text-charcoal">New Arrivals</h2><p className="text-sm text-slate-text mt-1">Fresh from our sellers</p></div>
              </div>
              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">{[...Array(4)].map((_, i) => <ProductSkeleton key={i} />)}</div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {newArrivals.slice(0, 4).map(p => <ProductCard key={p.id} product={mapToProduct(p)} viewMode="grid" />)}
                </div>
              )}
            </section>

            {/* Trust Badges */}
            <section className="bg-white rounded-2xl border border-sky-100 p-8 text-center">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="flex flex-col items-center"><div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center mb-3"><Shield className="w-6 h-6 text-sky-600" /></div><h3 className="font-semibold text-charcoal">Secure Payments</h3><p className="text-xs text-slate-text mt-1">100% secure transactions</p></div>
                <div className="flex flex-col items-center"><div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center mb-3"><Truck className="w-6 h-6 text-sky-600" /></div><h3 className="font-semibold text-charcoal">Fast Delivery</h3><p className="text-xs text-slate-text mt-1">Same-day delivery in Tala</p></div>
                <div className="flex flex-col items-center"><div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center mb-3"><Star className="w-6 h-6 text-sky-600" /></div><h3 className="font-semibold text-charcoal">Quality Guarantee</h3><p className="text-xs text-slate-text mt-1">Authentic products only</p></div>
              </div>
            </section>
          </div>
        </div>
      </CartProvider>
    </WishlistProvider>
  );
};

export default MarketplaceHome; 