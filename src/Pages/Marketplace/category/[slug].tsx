// pages/marketplace/category/[slug].tsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  SlidersHorizontal,
  Grid2X2,
  List,
  X,
  Sparkles,
} from 'lucide-react';
import ProductCard from '../../../components/marketplace/ProductCard';
import CategoryNavbar from '../../../common/CategoryNavbar';
import { MarketplaceService } from '../../../services/Marketplace/marketplace.service';
import type { MarketplaceProduct } from '../../../services/Marketplace/marketplace.service';

const CategoryPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [allProducts, setAllProducts] = useState<MarketplaceProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<MarketplaceProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categoryName, setCategoryName] = useState<string>('');
  const [subcategories, setSubcategories] = useState<string[]>([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('all');
  const isFashionCategory = slug === 'fashion';

  // Filter states
  const [priceMin, setPriceMin] = useState<number>(0);
  const [priceMax, setPriceMax] = useState<number>(200000);
  const [selectedCondition, setSelectedCondition] = useState<string>('all');
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [tempPriceMin, setTempPriceMin] = useState<number>(0);
  const [tempPriceMax, setTempPriceMax] = useState<number>(200000);
  const [tempCondition, setTempCondition] = useState<string>('all');
  const [tempLocations, setTempLocations] = useState<string[]>([]);

  // Available locations from products
  const [availableLocations, setAvailableLocations] = useState<string[]>([]);

  useEffect(() => {
    if (slug) {
      fetchProducts();
    }
  }, [slug]);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const productArray = await MarketplaceService.getCategory(slug!);
      const productsData = Array.isArray(productArray) ? productArray : [];
      setAllProducts(productsData);
      setFilteredProducts(productsData);
      setSelectedSubcategory('all');

      // Extract unique subcategories (excluding empty/undefined)
      const subs = [...new Set(productsData.map(p => p.subcategory).filter(Boolean))] as string[];
      setSubcategories(subs);

      // Extract unique locations from products
      const locations = [...new Set(productsData.map(p => p.sellerLocation).filter(Boolean))];
      setAvailableLocations(locations);

      // Set dynamic max price from products
      const maxProductPrice = Math.max(...productsData.map(p => Number(p.price)), 0);
      const newMax = maxProductPrice > 0 ? maxProductPrice : 200000;
      setPriceMax(newMax);
      setTempPriceMax(newMax);

      if (productsData.length > 0 && productsData[0].category) {
        setCategoryName(productsData[0].category);
      } else {
        setCategoryName(slug!);
      }
    } catch (err: any) {
      console.error('Error fetching category products:', err);
      setError(err.message || 'Failed to load products');
      setAllProducts([]);
      setFilteredProducts([]);
      setSubcategories([]);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...allProducts];

    // Subcategory filter
    if (selectedSubcategory !== 'all') {
      filtered = filtered.filter(p => p.subcategory === selectedSubcategory);
    }

    // Price filter
    filtered = filtered.filter(p => {
      const price = Number(p.price);
      return price >= tempPriceMin && price <= tempPriceMax;
    });

    // Condition filter
    if (tempCondition !== 'all') {
      filtered = filtered.filter(p => p.condition === tempCondition);
    }

    // Location filter
    if (tempLocations.length > 0) {
      filtered = filtered.filter(p => tempLocations.includes(p.sellerLocation));
    }

    setFilteredProducts(filtered);
    setPriceMin(tempPriceMin);
    setPriceMax(tempPriceMax);
    setSelectedCondition(tempCondition);
    setSelectedLocations(tempLocations);
    setShowFilters(false);
  };

  const resetFilters = () => {
    const maxPrice = Math.max(...allProducts.map(p => Number(p.price)), 200000);
    setTempPriceMin(0);
    setTempPriceMax(maxPrice);
    setTempCondition('all');
    setTempLocations([]);
    setSelectedSubcategory('all');
    setPriceMin(0);
    setPriceMax(maxPrice);
    setSelectedCondition('all');
    setSelectedLocations([]);
    setFilteredProducts(allProducts);
  };

  const handleLocationToggle = (location: string) => {
    setTempLocations(prev =>
      prev.includes(location) ? prev.filter(l => l !== location) : [...prev, location]
    );
  };

  const handleSubcategoryClick = (sub: string) => {
    setSelectedSubcategory(sub);
    // Re‑apply all filters with new subcategory
    let filtered = [...allProducts];
    if (sub !== 'all') {
      filtered = filtered.filter(p => p.subcategory === sub);
    }
    // Apply other active filters (price, condition, location)
    if (tempCondition !== 'all') {
      filtered = filtered.filter(p => p.condition === tempCondition);
    }
    if (tempLocations.length > 0) {
      filtered = filtered.filter(p => tempLocations.includes(p.sellerLocation));
    }
    filtered = filtered.filter(p => {
      const price = Number(p.price);
      return price >= tempPriceMin && price <= tempPriceMax;
    });
    setFilteredProducts(filtered);
  };

  const mapToProduct = (p: MarketplaceProduct) => ({
    id: p.id,
    name: p.name,
    description: p.description,
    price: p.price,
    originalPrice: p.originalPrice,
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

  if (loading) {
    return (
      <div className="min-h-screen bg-soft-white">
        <CategoryNavbar categoryName="Loading..." />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 pt-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl border border-sky-100 p-3 animate-pulse">
                <div className="h-40 bg-gray-200 rounded-lg mb-3"></div>
                <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-soft-white">
        <CategoryNavbar categoryName="Error" />
        <div className="pt-32 flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-600">{error}</p>
            <button onClick={fetchProducts} className="mt-4 text-sky-600">Retry</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-soft-white">
      <CategoryNavbar categoryName={categoryName || slug || 'Category'} />

      <div className="bg-white border-b border-sky-100 sticky top-16 z-10 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-display font-bold text-charcoal">
                  {categoryName || slug}
                </h1>
                <p className="text-sm text-slate-text">
                  {filteredProducts.length} products available
                </p>
              </div>
            </div>

            {/* Subcategory chips */}
            {subcategories.length > 0 && (
              <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-hide -mx-1 px-1">
                <button
                  onClick={() => handleSubcategoryClick('all')}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                    selectedSubcategory === 'all'
                      ? 'bg-sky-500 text-white shadow-sm'
                      : 'bg-sky-50 text-slate-text hover:bg-sky-100'
                  }`}
                >
                  All
                </button>
                {subcategories.map(sub => (
                  <button
                    key={sub}
                    onClick={() => handleSubcategoryClick(sub)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                      selectedSubcategory === sub
                        ? 'bg-sky-500 text-white shadow-sm'
                        : 'bg-sky-50 text-slate-text hover:bg-sky-100'
                    }`}
                  >
                    {sub}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {isFashionCategory && (
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 mb-6 border border-purple-100">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="text-sm font-display font-semibold text-charcoal flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-500" />
                  New: AI Virtual Try-On
                </h3>
                <p className="text-xs text-slate-text mt-1">
                  See how clothes look on you before buying!
                </p>
              </div>
              <Link
                to="/marketplace/try-on-explain"
                className="px-3 py-1.5 bg-white text-purple-600 rounded-lg text-xs font-medium hover:bg-purple-50 transition-colors shadow-sm"
              >
                Learn More
              </Link>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-sky-200 rounded-lg text-sm font-medium text-slate-text hover:border-sky-400 transition-colors"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
            {(selectedCondition !== 'all' || selectedLocations.length > 0 || priceMin > 0 || priceMax < 200000) && (
              <span className="ml-1 w-2 h-2 bg-sky-500 rounded-full"></span>
            )}
            {showFilters && <X className="w-4 h-4 ml-2" />}
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${viewMode === 'grid'
                  ? 'bg-sky-100 text-sky-600'
                  : 'text-slate-text hover:bg-sky-50'
                }`}
            >
              <Grid2X2 className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${viewMode === 'list'
                  ? 'bg-sky-100 text-sky-600'
                  : 'text-slate-text hover:bg-sky-50'
                }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>

        {showFilters && (
          <div className="bg-white rounded-xl border border-sky-100 p-6 mb-6 animate-slide-down">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Price Range */}
              <div>
                <h3 className="text-sm font-medium text-charcoal mb-3">Price Range (KSh)</h3>
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={tempPriceMin}
                      onChange={(e) => setTempPriceMin(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-sky-200 rounded-lg text-sm"
                      placeholder="Min"
                    />
                    <span className="text-slate-text">-</span>
                    <input
                      type="number"
                      value={tempPriceMax}
                      onChange={(e) => setTempPriceMax(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-sky-200 rounded-lg text-sm"
                      placeholder="Max"
                    />
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={Math.max(...allProducts.map(p => Number(p.price)), 200000)}
                    value={tempPriceMax}
                    onChange={(e) => setTempPriceMax(Number(e.target.value))}
                    className="w-full"
                  />
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
                      <input
                        type="radio"
                        name="condition"
                        value={cond}
                        checked={tempCondition === cond}
                        onChange={(e) => setTempCondition(e.target.value)}
                        className="text-sky-500"
                      />
                      <span className="text-sm text-slate-text capitalize">
                        {cond === 'all' ? 'All Conditions' : cond}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Location */}
              <div>
                <h3 className="text-sm font-medium text-charcoal mb-3">Location</h3>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {availableLocations.map(loc => (
                    <label key={loc} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={tempLocations.includes(loc)}
                        onChange={() => handleLocationToggle(loc)}
                        className="rounded text-sky-500"
                      />
                      <span className="text-sm text-slate-text">{loc}</span>
                    </label>
                  ))}
                  {availableLocations.length === 0 && (
                    <p className="text-xs text-slate-text">No location data</p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-sky-100">
              <button
                onClick={resetFilters}
                className="px-4 py-2 text-sm text-slate-text hover:text-sky-600 transition-colors"
              >
                Reset
              </button>
              <button
                onClick={applyFilters}
                className="px-4 py-2 bg-sky-500 text-white rounded-lg text-sm font-medium hover:bg-sky-600 transition-colors"
              >
                Apply Filters
              </button>
            </div>
          </div>
        )}

        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-text">No products match your filters</p>
            <button
              onClick={resetFilters}
              className="mt-2 text-sm text-sky-600 hover:underline"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'
              : 'space-y-3'
          }>
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={mapToProduct(product)} viewMode={viewMode} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;