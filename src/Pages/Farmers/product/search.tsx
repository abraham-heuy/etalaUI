// pages/farmers/search.tsx
import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, Grid2X2, List, Loader2, ChevronRight, Sprout, Leaf, SlidersHorizontal } from 'lucide-react';
import CategoryNavbar from '../../../common/CategoryNavbar';
import FarmerProductCard from '../../../components/farmers/FarmerProductCard';
import { farmersService, type FarmersProduct } from '../../../services/farmers/farmer.service';

const FarmersSearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const initialCategory = searchParams.get('category') || '';
  const initialOrganic = searchParams.get('organic') === 'true';

  const [query, setQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [organicOnly, setOrganicOnly] = useState(initialOrganic);
  const [products, setProducts] = useState<FarmersProduct[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'newest' | 'popular' | 'price-low' | 'price-high'>('newest');
  const [priceMin, setPriceMin] = useState<number>(0);
  const [priceMax, setPriceMax] = useState<number>(10000);
  const [showFilters, setShowFilters] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    if (initialQuery || initialCategory || initialOrganic) {
      performSearch();
    } else {
      // If no search parameters, load default products
      performSearch();
    }
  }, [initialQuery, initialCategory, initialOrganic]);

  const performSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await farmersService.search(initialQuery, 1, 100, initialCategory || undefined, organicOnly);
      let productsData = result.products;
      
      // Apply price filter locally
      if (priceMin > 0 || priceMax < 10000) {
        productsData = productsData.filter(p => Number(p.price) >= priceMin && Number(p.price) <= priceMax);
      }
      
      // Apply sorting
      const sorted = [...productsData];
      switch (sortBy) {
        case 'newest':
          sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          break;
        case 'popular':
          sorted.sort((a, b) => (Number(b.sellerRating) || 0) - (Number(a.sellerRating) || 0));
          break;
        case 'price-low':
          sorted.sort((a, b) => Number(a.price) - Number(b.price));
          break;
        case 'price-high':
          sorted.sort((a, b) => Number(b.price) - Number(a.price));
          break;
      }
      setProducts(sorted);
      setTotal(sorted.length);
      
      // Extract categories for filter dropdown
      const cats = [...new Set(sorted.map(p => p.subcategory).filter(Boolean))] as string[];
      setCategories(cats);
    } catch (err: any) {
      console.error('Search error:', err);
      setError(err.message || 'Search failed. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.append('q', query.trim());
    if (selectedCategory) params.append('category', selectedCategory);
    if (organicOnly) params.append('organic', 'true');
    setSearchParams(params);
  };

  const applyFilters = () => {
    const params = new URLSearchParams();
    if (query.trim()) params.append('q', query.trim());
    if (selectedCategory) params.append('category', selectedCategory);
    if (organicOnly) params.append('organic', 'true');
    setSearchParams(params);
    setShowFilters(false);
  };

  const resetFilters = () => {
    setQuery('');
    setSelectedCategory('');
    setOrganicOnly(false);
    setPriceMin(0);
    setPriceMax(10000);
    setSortBy('newest');
    setSearchParams(new URLSearchParams());
  };

  const handleRetry = () => {
    performSearch();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-soft-white">
        <CategoryNavbar categoryName="Searching..." />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 pt-24 flex justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-green-600" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-soft-white">
      <CategoryNavbar categoryName={`Search: ${initialQuery || 'Farmers'}`} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 pt-24">
        {/* Search bar with category filter */}
        <div className="bg-white rounded-2xl border border-green-100 p-4 mb-6">
          <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for fresh produce..."
                className="w-full pl-9 pr-3 py-2 border border-green-200 rounded-lg focus:outline-none focus:border-green-400"
              />
            </div>
            <div className="relative sm:w-40">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-green-200 rounded-lg bg-white text-charcoal focus:outline-none focus:border-green-400 appearance-none"
              >
                <option value="">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                ))}
              </select>
              <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 rotate-90 pointer-events-none" />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4" />
              <span className="hidden sm:inline">Search</span>
            </button>
          </form>
          
          {/* Filters toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="mt-3 flex items-center gap-1 text-sm text-green-600 hover:text-green-700"
          >
            <SlidersHorizontal className="w-4 h-4" />
            {showFilters ? 'Hide filters' : 'Show filters'}
          </button>
          
          {/* Expanded filters */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-green-100 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium text-charcoal mb-1 block">Min Price (KSh)</label>
                <input
                  type="number"
                  value={priceMin}
                  onChange={(e) => setPriceMin(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-green-200 rounded-lg text-sm"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-charcoal mb-1 block">Max Price (KSh)</label>
                <input
                  type="number"
                  value={priceMax}
                  onChange={(e) => setPriceMax(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-green-200 rounded-lg text-sm"
                  placeholder="10000"
                />
              </div>
              <div>
                <label className="flex items-center gap-2 mt-6">
                  <input
                    type="checkbox"
                    checked={organicOnly}
                    onChange={(e) => setOrganicOnly(e.target.checked)}
                    className="rounded text-green-600 focus:ring-green-500"
                  />
                  <span className="text-sm text-slate-text flex items-center gap-1">
                    <Sprout className="w-4 h-4 text-green-600" /> Organic Only
                  </span>
                </label>
              </div>
              <div className="sm:col-span-3 flex justify-end gap-2">
                <button onClick={resetFilters} className="px-4 py-2 text-sm text-slate-text hover:text-green-600">Reset</button>
                <button onClick={applyFilters} className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700">Apply Filters</button>
              </div>
            </div>
          )}
        </div>

        {/* Results header with sorting and view toggle */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-display font-bold text-charcoal">
              Results for "{initialQuery || 'All Products'}"
            </h1>
            <p className="text-sm text-slate-text mt-1">{total} products found</p>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={sortBy}
              onChange={(e) => { setSortBy(e.target.value as any); performSearch(); }}
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

        {/* Error state */}
        {error && (
          <div className="text-center py-12 bg-white rounded-xl border border-red-100">
            <p className="text-red-600 mb-4">{error}</p>
            <button onClick={handleRetry} className="text-green-600 hover:underline">Retry</button>
          </div>
        )}

        {/* Empty state */}
        {!error && products.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl border border-green-100">
            <Leaf className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h2 className="text-xl font-display font-semibold text-charcoal mb-2">No results found</h2>
            <p className="text-slate-text">Try different keywords or browse categories</p>
            <Link to="/farmers" className="inline-block mt-4 text-green-600 hover:underline">
              Back to Farmers Market
            </Link>
          </div>
        )}

        {/* Products grid/list */}
        {products.length > 0 && (
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4' : 'space-y-3'}>
            {products.map(product => (
              <FarmerProductCard key={product.id} product={product} viewMode={viewMode} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FarmersSearchPage;