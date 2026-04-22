// pages/farmers/new-arrivals.tsx
import React, { useState, useEffect } from 'react';
import { Grid2X2, List, Sprout, Leaf, Calendar, SlidersHorizontal, Package } from 'lucide-react';
import { farmersService, type FarmersProduct } from '../../../services/farmers/farmer.service';
import CategoryNavbar from '../../../common/CategoryNavbar';
import FarmerProductCard from '../../../components/farmers/FarmerProductCard';


const FarmersNewArrivalsPage: React.FC = () => {
  const [allProducts, setAllProducts] = useState<FarmersProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<FarmersProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'newest' | 'popular' | 'price-low' | 'price-high'>('newest');
  
  // Filter state
  const [showFilters, setShowFilters] = useState(false);
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(10000);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSubcategory, setSelectedSubcategory] = useState('all');
  const [organicOnly, setOrganicOnly] = useState(false);
  
  // Temporary filter state
  const [tempPriceMin, setTempPriceMin] = useState(0);
  const [tempPriceMax, setTempPriceMax] = useState(10000);
  const [tempCategory, setTempCategory] = useState('all');
  const [tempSubcategory, setTempSubcategory] = useState('all');
  const [tempOrganicOnly, setTempOrganicOnly] = useState(false);
  
  const [categories, setCategories] = useState<string[]>([]);
  const [subcategories, setSubcategories] = useState<Record<string, string[]>>({});

  useEffect(() => {
    fetchNewArrivals();
  }, []);

  // Apply filters & sorting whenever dependencies change
  useEffect(() => {
    if (allProducts.length === 0) return;
    let filtered = [...allProducts];
    
    if (selectedCategory !== 'all')
      filtered = filtered.filter(p => p.subcategory === selectedCategory);
    if (selectedSubcategory !== 'all')
      filtered = filtered.filter(p => p.subcategory === selectedSubcategory);
    if (organicOnly)
      filtered = filtered.filter(p => p.organic === true);
    filtered = filtered.filter(p => Number(p.price) >= priceMin && Number(p.price) <= priceMax);
    
    // Sorting (newest is default, but we'll apply based on sortBy)
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'popular':
        filtered.sort((a, b) => (Number(b.sellerRating) || 0) - (Number(a.sellerRating) || 0));
        break;
      case 'price-low':
        filtered.sort((a, b) => Number(a.price) - Number(b.price));
        break;
      case 'price-high':
        filtered.sort((a, b) => Number(b.price) - Number(a.price));
        break;
      default:
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
    setFilteredProducts(filtered);
  }, [allProducts, selectedCategory, selectedSubcategory, organicOnly, priceMin, priceMax, sortBy]);

  const fetchNewArrivals = async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetch all products (use search with empty query or a workaround)
      // Since backend requires q, we use a dummy 'a' or rely on subcategory? Better to use home endpoint? 
      // The home endpoint returns newArrivals, but we want all products sorted by newest.
      // We'll use search with empty string and hope backend allows (or use 'a').
      // For now, use search with empty string; if fails, fallback to getHome().newArrivals
      let products: FarmersProduct[] = [];
      try {
        const result = await farmersService.search('', 1, 200); // empty query may fail; we'll try
        products = result.products;
      } catch {
        // Fallback: use home data newArrivals
        const homeData = await farmersService.getHome();
        products = homeData.newArrivals || [];
      }
      
      setAllProducts(products);
      setFilteredProducts(products);
      
      // Extract unique categories (subcategories) from products
      const cats = [...new Set(products.map(p => p.subcategory).filter(Boolean))] as string[];
      setCategories(cats);
      const subsMap: Record<string, string[]> = {};
      cats.forEach(cat => {
        const subs = [...new Set(products.filter(p => p.subcategory === cat).map(p => p.subcategory).filter(Boolean))] as string[];
        if (subs.length) subsMap[cat] = subs;
      });
      setSubcategories(subsMap);
      
      const maxPrice = Math.max(...products.map(p => Number(p.price)), 0);
      setPriceMax(maxPrice);
      setTempPriceMax(maxPrice);
    } catch (err: any) {
      setError(err.message || 'Failed to load new arrivals');
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    setPriceMin(tempPriceMin);
    setPriceMax(tempPriceMax);
    setSelectedCategory(tempCategory);
    setSelectedSubcategory(tempSubcategory);
    setOrganicOnly(tempOrganicOnly);
    setShowFilters(false);
  };

  const resetFilters = () => {
    const maxPriceAll = Math.max(...allProducts.map(p => Number(p.price)), 10000);
    setTempPriceMin(0);
    setTempPriceMax(maxPriceAll);
    setTempCategory('all');
    setTempSubcategory('all');
    setTempOrganicOnly(false);
    setPriceMin(0);
    setPriceMax(maxPriceAll);
    setSelectedCategory('all');
    setSelectedSubcategory('all');
    setOrganicOnly(false);
    setFilteredProducts(allProducts);
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
        <CategoryNavbar categoryName="Freshly Harvested" />
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
        <CategoryNavbar categoryName="Freshly Harvested" />
        <div className="pt-32 flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-600">{error}</p>
            <button onClick={fetchNewArrivals} className="mt-4 text-sky-600">Retry</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-soft-white">
      <CategoryNavbar categoryName="Freshly Harvested" />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-green-700 to-green-900 text-white overflow-hidden pt-16">
        <div className="absolute inset-0 opacity-20">
          <img src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1600&h=400&fit=crop" alt="Fresh produce" className="w-full h-full object-cover" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16 lg:py-20">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm mb-4">
              <Calendar className="w-4 h-4" />
              <span>Freshly Harvested</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-3">New Arrivals</h1>
            <p className="text-base sm:text-lg text-green-100 mb-6">
              Just picked from the farm – the freshest produce, straight to your table.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              <div className="flex items-center gap-1"><Leaf className="w-4 h-4" /> Organic options</div>
              <div className="flex items-center gap-1"><Sprout className="w-4 h-4" /> Local farmers</div>
              <div className="flex items-center gap-1"><Package className="w-4 h-4" /> Same-day delivery</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Header with sorting and view toggle */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-display font-semibold text-charcoal">Freshly Harvested</h2>
            <p className="text-sm text-slate-text mt-1">{filteredProducts.length} items available</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-3 py-2 bg-white border border-green-200 rounded-lg text-sm text-slate-text hover:border-green-400 transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
              {(selectedCategory !== 'all' || selectedSubcategory !== 'all' || organicOnly || priceMin > 0 || priceMax < 10000) && (
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              )}
            </button>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-4 py-2 bg-white border border-green-200 rounded-lg text-sm text-slate-text focus:outline-none focus:border-green-400"
            >
              <option value="newest">Newest First</option>
              <option value="popular">Most Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
            <div className="flex gap-2">
              <button onClick={() => setViewMode('grid')} className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-green-100 text-green-600' : 'text-slate-text hover:bg-green-50'}`}>
                <Grid2X2 className="w-5 h-5" />
              </button>
              <button onClick={() => setViewMode('list')} className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-green-100 text-green-600' : 'text-slate-text hover:bg-green-50'}`}>
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="bg-white rounded-xl border border-green-100 p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Price Range */}
              <div>
                <h3 className="text-sm font-medium text-charcoal mb-3">Price Range (KSh)</h3>
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <input type="number" value={tempPriceMin} onChange={(e) => setTempPriceMin(Number(e.target.value))} className="w-full px-3 py-2 border border-green-200 rounded-lg text-sm" placeholder="Min" />
                    <span className="text-slate-text">-</span>
                    <input type="number" value={tempPriceMax} onChange={(e) => setTempPriceMax(Number(e.target.value))} className="w-full px-3 py-2 border border-green-200 rounded-lg text-sm" placeholder="Max" />
                  </div>
                  <input type="range" min={0} max={Math.max(...allProducts.map(p => Number(p.price)), 10000)} value={tempPriceMax} onChange={(e) => setTempPriceMax(Number(e.target.value))} className="w-full accent-green-600" />
                  <div className="flex justify-between text-xs text-slate-text">
                    <span>KSh 0</span>
                    <span>KSh {Math.max(...allProducts.map(p => Number(p.price)), 10000).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Organic Filter */}
              <div>
                <h3 className="text-sm font-medium text-charcoal mb-3">Farming Method</h3>
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={tempOrganicOnly} onChange={(e) => setTempOrganicOnly(e.target.checked)} className="rounded text-green-600 focus:ring-green-500" />
                  <span className="text-sm text-slate-text flex items-center gap-1">
                    <Sprout className="w-4 h-4 text-green-600" /> Organic Only
                  </span>
                </label>
              </div>

              {/* Category */}
              <div>
                <h3 className="text-sm font-medium text-charcoal mb-3">Category</h3>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  <label className="flex items-center gap-2">
                    <input type="radio" name="category" value="all" checked={tempCategory === 'all'} onChange={() => setTempCategory('all')} className="text-green-600" />
                    <span className="text-sm text-slate-text">All Categories</span>
                  </label>
                  {categories.map(cat => (
                    <label key={cat} className="flex items-center gap-2">
                      <input type="radio" name="category" value={cat} checked={tempCategory === cat} onChange={() => { setTempCategory(cat); setTempSubcategory('all'); }} className="text-green-600" />
                      <span className="text-sm text-slate-text capitalize">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Subcategory (dynamic) */}
              {tempCategory !== 'all' && subcategories[tempCategory] && subcategories[tempCategory].length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-charcoal mb-3">Subcategory</h3>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    <label className="flex items-center gap-2">
                      <input type="radio" name="subcategory" value="all" checked={tempSubcategory === 'all'} onChange={() => setTempSubcategory('all')} className="text-green-600" />
                      <span className="text-sm text-slate-text">All Subcategories</span>
                    </label>
                    {subcategories[tempCategory].map(sub => (
                      <label key={sub} className="flex items-center gap-2">
                        <input type="radio" name="subcategory" value={sub} checked={tempSubcategory === sub} onChange={() => setTempSubcategory(sub)} className="text-green-600" />
                        <span className="text-sm text-slate-text capitalize">{sub}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-2 mt-6 pt-4 border-t border-green-100">
              <button onClick={resetFilters} className="px-4 py-2 text-sm text-slate-text hover:text-green-600">Reset</button>
              <button onClick={applyFilters} className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700">Apply Filters</button>
            </div>
          </div>
        )}

        {/* Products grid/list */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-green-100">
            <Leaf className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-display font-medium text-charcoal mb-2">No products match your filters</h3>
            <button onClick={resetFilters} className="mt-2 text-sm text-green-600 hover:underline">Clear all filters</button>
          </div>
        ) : (
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4' : 'space-y-3'}>
            {filteredProducts.map(product => (
              <FarmerProductCard key={product.id} product={product} viewMode={viewMode} />
            ))}
          </div>
        )}

        {/* Freshness callout */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200 text-center">
          <Sprout className="w-10 h-10 text-green-600 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-charcoal mb-2">Why buy fresh?</h3>
          <p className="text-sm text-slate-text max-w-2xl mx-auto">
            Freshly harvested produce retains more nutrients, tastes better, and supports local farmers. 
            Order now and enjoy farm-fresh goodness delivered to your doorstep.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FarmersNewArrivalsPage;