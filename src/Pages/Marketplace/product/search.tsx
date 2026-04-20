// pages/marketplace/search.tsx
import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, Grid2X2, List, Loader2,  ChevronRight } from 'lucide-react';
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

const SearchResultsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const initialCategory = searchParams.get('category') || '';

  const [query, setQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [products, setProducts] = useState<MarketplaceProduct[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    if (initialQuery) {
      performSearch();
    }
  }, [initialQuery, initialCategory]);

  const performSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      // Build query params
      const params = new URLSearchParams();
      params.append('q', initialQuery);
      if (initialCategory) params.append('category', initialCategory);
      params.append('page', '1');
      params.append('limit', '50');

      const result = await MarketplaceService.search(initialQuery, 1, 50, initialCategory || undefined);
      // result is the array of products (backend returns { data: [...] } or direct array)
      const productArray = Array.isArray(result) ? result : (result as any).data || (result as any).products || [];
      setProducts(productArray);
      setTotal(productArray.length);
    } catch (err: any) {
      console.error('Search error:', err);
      setError(err.message || 'Search failed. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      const params = new URLSearchParams();
      params.append('q', query.trim());
      if (selectedCategory) params.append('category', selectedCategory);
      setSearchParams(params);
      // The effect will trigger a new search
    }
  };

  const handleRetry = () => {
    performSearch();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-soft-white">
        <CategoryNavbar categoryName="Searching..." />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 pt-24 flex justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-sky-600" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-soft-white">
      <CategoryNavbar categoryName={`Search: ${initialQuery}`} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 pt-24">
        {/* Search bar with category filter */}
        <div className="bg-white rounded-2xl border border-sky-100 p-4 mb-6">
          <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-9 pr-3 py-2 border border-sky-200 rounded-lg focus:outline-none focus:border-sky-400"
              />
            </div>
            <div className="relative sm:w-40">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-sky-200 rounded-lg bg-white text-charcoal focus:outline-none focus:border-sky-400 appearance-none"
              >
                <option value="">All Categories</option>
                <option value="electronics">Electronics</option>
                <option value="fashion">Fashion</option>
                <option value="household">Household</option>
                <option value="beauty">Beauty</option>
                <option value="sports">Sports</option>
                <option value="books">Books</option>
              </select>
              <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 rotate-90 pointer-events-none" />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4" />
              <span className="hidden sm:inline">Search</span>
            </button>
          </form>
        </div>

        {/* Results header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-display font-bold text-charcoal">
              Results for "{initialQuery}"
            </h1>
            <p className="text-sm text-slate-text mt-1">
              {total} products found
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-sky-100 text-sky-600' : 'text-slate-text hover:bg-sky-50'}`}
            >
              <Grid2X2 className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-sky-100 text-sky-600' : 'text-slate-text hover:bg-sky-50'}`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Error state */}
        {error && (
          <div className="text-center py-12 bg-white rounded-xl border border-sky-100">
            <p className="text-red-600 mb-4">{error}</p>
            <button onClick={handleRetry} className="text-sky-600 hover:underline">Retry</button>
          </div>
        )}

        {/* Empty state */}
        {!error && products.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl border border-sky-100">
            <Search className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h2 className="text-xl font-display font-semibold text-charcoal mb-2">No results found</h2>
            <p className="text-slate-text">Try different keywords or browse categories</p>
            <Link to="/marketplace" className="inline-block mt-4 text-sky-600 hover:underline">
              Back to Marketplace
            </Link>
          </div>
        )}

        {/* Products grid/list */}
        {products.length > 0 && (
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4' : 'space-y-3'}>
            {products.map(product => (
              <ProductCard key={product.id} product={mapToProduct(product)} viewMode={viewMode} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResultsPage;