// pages/marketplace/mtush.tsx
import React, { useState, useEffect } from 'react';
import { Grid2X2, List, Tag, Shirt, Shield, Truck, Percent, SlidersHorizontal} from 'lucide-react';
import CategoryNavbar from '../../../common/CategoryNavbar';
import ProductCard from '../../../components/marketplace/ProductCard';
import { type MarketplaceProduct, MarketplaceService } from '../../../services/Marketplace/marketplace.service';

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

const MtushPage: React.FC = () => {
  const [allProducts, setAllProducts] = useState<MarketplaceProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<MarketplaceProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'newest' | 'popular' | 'price-low' | 'price-high'>('popular');
  
  // Filter state
  const [showFilters, setShowFilters] = useState(false);
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(200000);
  const [selectedCondition, setSelectedCondition] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSubcategory, setSelectedSubcategory] = useState('all');
  
  // Temporary filter state
  const [tempPriceMin, setTempPriceMin] = useState(0);
  const [tempPriceMax, setTempPriceMax] = useState(200000);
  const [tempCondition, setTempCondition] = useState('all');
  const [tempCategory, setTempCategory] = useState('all');
  const [tempSubcategory, setTempSubcategory] = useState('all');
  
  const [categories, setCategories] = useState<string[]>([]);
  const [subcategories, setSubcategories] = useState<Record<string, string[]>>({});

  useEffect(() => {
    fetchMtushProducts();
  }, []);

  // Apply filters & sorting whenever dependencies change
  useEffect(() => {
    if (allProducts.length === 0) return;
    let filtered = [...allProducts];
    
    if (selectedCategory !== 'all')
      filtered = filtered.filter(p => p.category === selectedCategory);
    if (selectedSubcategory !== 'all')
      filtered = filtered.filter(p => p.subcategory === selectedSubcategory);
    if (selectedCondition !== 'all')
      filtered = filtered.filter(p => p.condition === selectedCondition);
    filtered = filtered.filter(p => Number(p.price) >= priceMin && Number(p.price) <= priceMax);
    
    // Sorting
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'popular':
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'price-low':
        filtered.sort((a, b) => Number(a.price) - Number(b.price));
        break;
      case 'price-high':
        filtered.sort((a, b) => Number(b.price) - Number(a.price));
        break;
    }
    setFilteredProducts(filtered);
  }, [allProducts, selectedCategory, selectedSubcategory, selectedCondition, priceMin, priceMax, sortBy]);

  const fetchMtushProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await MarketplaceService.search('', 1, 100, undefined, { isMtush: true });
      setAllProducts(result.products);
      setFilteredProducts(result.products);
      
      // Extract unique categories & subcategories
      const cats = [...new Set(result.products.map(p => p.category).filter(Boolean))] as string[];
      setCategories(cats);
      const subsMap: Record<string, string[]> = {};
      cats.forEach(cat => {
        const subs = [...new Set(result.products.filter(p => p.category === cat).map(p => p.subcategory).filter(Boolean))] as string[];
        if (subs.length) subsMap[cat] = subs;
      });
      setSubcategories(subsMap);
      
      const maxPrice = Math.max(...result.products.map(p => Number(p.price)), 0);
      setPriceMax(maxPrice);
      setTempPriceMax(maxPrice);
    } catch (err: any) {
      setError(err.message || 'Failed to load pre-loved items');
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    setPriceMin(tempPriceMin);
    setPriceMax(tempPriceMax);
    setSelectedCondition(tempCondition);
    setSelectedCategory(tempCategory);
    setSelectedSubcategory(tempSubcategory);
    setShowFilters(false);
  };

  const resetFilters = () => {
    const maxPriceAll = Math.max(...allProducts.map(p => Number(p.price)), 200000);
    setTempPriceMin(0);
    setTempPriceMax(maxPriceAll);
    setTempCondition('all');
    setTempCategory('all');
    setTempSubcategory('all');
    setPriceMin(0);
    setPriceMax(maxPriceAll);
    setSelectedCondition('all');
    setSelectedCategory('all');
    setSelectedSubcategory('all');
    setFilteredProducts(allProducts);
  };

  const ProductSkeleton = () => (
    <div className="bg-white rounded-xl border border-sky-100 p-3 animate-pulse">
      <div className="h-40 bg-gray-200 rounded-lg mb-3"></div>
      <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-soft-white">
        <CategoryNavbar categoryName="Think Twice" />
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
        <CategoryNavbar categoryName="Think Twice" />
        <div className="pt-32 flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-600">{error}</p>
            <button onClick={fetchMtushProducts} className="mt-4 text-sky-600">Retry</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-soft-white">
      <CategoryNavbar categoryName="Think Twice" />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-amber-700 to-orange-700 text-white overflow-hidden pt-16">
        <div className="absolute inset-0 opacity-10">
          <img src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=1600&h=400&fit=crop" alt="Sustainable fashion" className="w-full h-full object-cover" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16 lg:py-20">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm mb-4">
              <Tag className="w-4 h-4" />
              <span>Pre‑loved & Sustainable</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-3">Think Twice</h1>
            <p className="text-base sm:text-lg text-amber-100 mb-6">
              Give pre‑loved items a second life – quality fashion, electronics and home goods at great prices.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              <div className="flex items-center gap-1"><Shield className="w-4 h-4" /> Verified sellers</div>
              <div className="flex items-center gap-1"><Truck className="w-4 h-4" /> Free delivery in Tala</div>
              <div className="flex items-center gap-1"><Percent className="w-4 h-4" /> Up to 70% off</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Header with sorting and view toggle */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-display font-semibold text-charcoal">Pre‑loved items</h2>
            <p className="text-sm text-slate-text mt-1">{filteredProducts.length} products available</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-3 py-2 bg-white border border-sky-200 rounded-lg text-sm text-slate-text hover:border-sky-400 transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
              {(selectedCategory !== 'all' || selectedSubcategory !== 'all' || selectedCondition !== 'all' || priceMin > 0 || priceMax < 200000) && (
                <span className="w-2 h-2 bg-sky-500 rounded-full"></span>
              )}
            </button>
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
            <div className="flex gap-2">
              <button onClick={() => setViewMode('grid')} className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-sky-100 text-sky-600' : 'text-slate-text hover:bg-sky-50'}`}>
                <Grid2X2 className="w-5 h-5" />
              </button>
              <button onClick={() => setViewMode('list')} className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-sky-100 text-sky-600' : 'text-slate-text hover:bg-sky-50'}`}>
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="bg-white rounded-xl border border-sky-100 p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Price Range */}
              <div>
                <h3 className="text-sm font-medium text-charcoal mb-3">Price Range (KSh)</h3>
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <input type="number" value={tempPriceMin} onChange={(e) => setTempPriceMin(Number(e.target.value))} className="w-full px-3 py-2 border border-sky-200 rounded-lg text-sm" placeholder="Min" />
                    <span className="text-slate-text">-</span>
                    <input type="number" value={tempPriceMax} onChange={(e) => setTempPriceMax(Number(e.target.value))} className="w-full px-3 py-2 border border-sky-200 rounded-lg text-sm" placeholder="Max" />
                  </div>
                  <input type="range" min={0} max={Math.max(...allProducts.map(p => Number(p.price)), 200000)} value={tempPriceMax} onChange={(e) => setTempPriceMax(Number(e.target.value))} className="w-full" />
                  <div className="flex justify-between text-xs text-slate-text">
                    <span>KSh 0</span>
                    <span>KSh {Math.max(...allProducts.map(p => Number(p.price)), 200000).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Condition */}
              <div>
                <h3 className="text-sm font-medium text-charcoal mb-3">Condition</h3>
                <div className="space-y-2">
                  {['all', 'new', 'like-new', 'good', 'fair'].map(cond => (
                    <label key={cond} className="flex items-center gap-2">
                      <input type="radio" name="condition" value={cond} checked={tempCondition === cond} onChange={(e) => setTempCondition(e.target.value)} className="text-sky-500" />
                      <span className="text-sm text-slate-text capitalize">{cond === 'all' ? 'All Conditions' : cond}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Category */}
              <div>
                <h3 className="text-sm font-medium text-charcoal mb-3">Category</h3>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  <label className="flex items-center gap-2">
                    <input type="radio" name="category" value="all" checked={tempCategory === 'all'} onChange={() => setTempCategory('all')} className="text-sky-500" />
                    <span className="text-sm text-slate-text">All Categories</span>
                  </label>
                  {categories.map(cat => (
                    <label key={cat} className="flex items-center gap-2">
                      <input type="radio" name="category" value={cat} checked={tempCategory === cat} onChange={() => { setTempCategory(cat); setTempSubcategory('all'); }} className="text-sky-500" />
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
                      <input type="radio" name="subcategory" value="all" checked={tempSubcategory === 'all'} onChange={() => setTempSubcategory('all')} className="text-sky-500" />
                      <span className="text-sm text-slate-text">All Subcategories</span>
                    </label>
                    {subcategories[tempCategory].map(sub => (
                      <label key={sub} className="flex items-center gap-2">
                        <input type="radio" name="subcategory" value={sub} checked={tempSubcategory === sub} onChange={() => setTempSubcategory(sub)} className="text-sky-500" />
                        <span className="text-sm text-slate-text capitalize">{sub}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-2 mt-6 pt-4 border-t border-sky-100">
              <button onClick={resetFilters} className="px-4 py-2 text-sm text-slate-text hover:text-sky-600">Reset</button>
              <button onClick={applyFilters} className="px-4 py-2 bg-sky-500 text-white rounded-lg text-sm font-medium hover:bg-sky-600">Apply Filters</button>
            </div>
          </div>
        )}

        {/* Products grid/list */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-sky-100">
            <Tag className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-display font-medium text-charcoal mb-2">No pre‑loved items match your filters</h3>
            <button onClick={resetFilters} className="mt-2 text-sm text-sky-600 hover:underline">Clear all filters</button>
          </div>
        ) : (
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4' : 'space-y-3'}>
            {filteredProducts.map(product => (
              <div key={product.id} className="relative">
                <ProductCard product={mapToProduct(product)} viewMode={viewMode} />
                <div className="absolute top-2 left-2 bg-amber-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                  <Tag className="w-3 h-3" /> Pre-loved
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Sustainability callout */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200 text-center">
          <Shirt className="w-10 h-10 text-amber-600 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-charcoal mb-2">Why buy pre‑loved?</h3>
          <p className="text-sm text-slate-text max-w-2xl mx-auto">
            Extend the life of quality items, reduce waste, and save money. Every purchase supports a circular economy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MtushPage;