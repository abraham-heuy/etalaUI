// pages/farmers/category/[slug].tsx
import React, { useState, useEffect } from 'react';
import { useParams} from 'react-router-dom';
import {
  SlidersHorizontal,
  Grid2X2,
  List,
  X,
  Sprout,
  Leaf,
  AlertCircle,
} from 'lucide-react';
import FarmerProductCard from '../../../components/farmers/FarmerProductCard';
import CategoryNavbar from '../../../common/CategoryNavbar';
import { farmersService, type FarmersProduct } from '../../../services/farmers/farmer.service';

const FarmersCategoryPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [allProducts, setAllProducts] = useState<FarmersProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<FarmersProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categoryName, setCategoryName] = useState<string>('');
  
  // Filter states
  const [priceMin, setPriceMin] = useState<number>(0);
  const [priceMax, setPriceMax] = useState<number>(10000);
  const [organicOnly, setOrganicOnly] = useState<boolean>(false);
  const [selectedFarmer, setSelectedFarmer] = useState<string>('all');
  const [tempPriceMin, setTempPriceMin] = useState<number>(0);
  const [tempPriceMax, setTempPriceMax] = useState<number>(10000);
  const [tempOrganicOnly, setTempOrganicOnly] = useState<boolean>(false);
  const [tempSelectedFarmer, setTempSelectedFarmer] = useState<string>('all');
  
  // Available farmers for filter
  const [availableFarmers, setAvailableFarmers] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    if (slug) {
      fetchProducts();
    }
  }, [slug]);

  const fetchProducts = async () => {
    if (!slug) return;
    setLoading(true);
    setError(null);
    try {
      const result = await farmersService.search('', 1, 100, slug);
            const products = result.products;
      setAllProducts(products);
      setFilteredProducts(products);
      
      // Set category name from slug (capitalized)
      setCategoryName(slug.charAt(0).toUpperCase() + slug.slice(1));
      
      // Extract unique farmers
      const farmersMap = new Map<string, string>();
      products.forEach(p => {
        if (p.sellerId && p.sellerName && !farmersMap.has(p.sellerId)) {
          farmersMap.set(p.sellerId, p.sellerName);
        }
      });
      const farmers = Array.from(farmersMap.entries()).map(([id, name]) => ({ id, name }));
      setAvailableFarmers(farmers);
      
      // Set dynamic max price
      const maxProductPrice = Math.max(...products.map(p => Number(p.price)), 0);
      const newMax = maxProductPrice > 0 ? maxProductPrice : 10000;
      setPriceMax(newMax);
      setTempPriceMax(newMax);
      
    } catch (err: any) {
      setError(err.message || 'Failed to load products');
      setAllProducts([]);
      setFilteredProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...allProducts];
    
    if (tempPriceMin > 0 || tempPriceMax < 10000) {
      filtered = filtered.filter(p => {
        const price = Number(p.price);
        return price >= tempPriceMin && price <= tempPriceMax;
      });
    }
    
    if (tempOrganicOnly) {
      filtered = filtered.filter(p => p.organic === true);
    }
    
    if (tempSelectedFarmer !== 'all') {
      filtered = filtered.filter(p => p.sellerId === tempSelectedFarmer);
    }
    
    setFilteredProducts(filtered);
    setPriceMin(tempPriceMin);
    setPriceMax(tempPriceMax);
    setOrganicOnly(tempOrganicOnly);
    setSelectedFarmer(tempSelectedFarmer);
    setShowFilters(false);
  };

  const resetFilters = () => {
    const maxPrice = Math.max(...allProducts.map(p => Number(p.price)), 10000);
    setTempPriceMin(0);
    setTempPriceMax(maxPrice);
    setTempOrganicOnly(false);
    setTempSelectedFarmer('all');
    setPriceMin(0);
    setPriceMax(maxPrice);
    setOrganicOnly(false);
    setSelectedFarmer('all');
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
        <CategoryNavbar categoryName="Loading..." />
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
        <CategoryNavbar categoryName="Error" />
        <div className="pt-32 flex items-center justify-center">
          <div className="text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
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

      <div className="bg-white border-b border-green-100 sticky top-16 z-10 mt-16">
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
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-green-200 rounded-lg text-sm font-medium text-slate-text hover:border-green-400 transition-colors"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
            {(organicOnly || selectedFarmer !== 'all' || priceMin > 0 || priceMax < 10000) && (
              <span className="ml-1 w-2 h-2 bg-green-500 rounded-full"></span>
            )}
            {showFilters && <X className="w-4 h-4 ml-2" />}
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${viewMode === 'grid'
                  ? 'bg-green-100 text-green-600'
                  : 'text-slate-text hover:bg-green-50'
                }`}
            >
              <Grid2X2 className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${viewMode === 'list'
                  ? 'bg-green-100 text-green-600'
                  : 'text-slate-text hover:bg-green-50'
                }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>

        {showFilters && (
          <div className="bg-white rounded-xl border border-green-100 p-6 mb-6 animate-slide-down">
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
                      className="w-full px-3 py-2 border border-green-200 rounded-lg text-sm"
                      placeholder="Min"
                    />
                    <span className="text-slate-text">-</span>
                    <input
                      type="number"
                      value={tempPriceMax}
                      onChange={(e) => setTempPriceMax(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-green-200 rounded-lg text-sm"
                      placeholder="Max"
                    />
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={Math.max(...allProducts.map(p => Number(p.price)), 10000)}
                    value={tempPriceMax}
                    onChange={(e) => setTempPriceMax(Number(e.target.value))}
                    className="w-full accent-green-600"
                  />
                  <div className="flex justify-between text-xs text-slate-text">
                    <span>KSh 0</span>
                    <span>KSh {Math.max(...allProducts.map(p => Number(p.price)), 10000).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Organic Filter */}
              <div>
                <h3 className="text-sm font-medium text-charcoal mb-3">Farming Method</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="organic"
                      checked={!tempOrganicOnly}
                      onChange={() => setTempOrganicOnly(false)}
                      className="text-green-600 focus:ring-green-500"
                    />
                    <span className="text-sm text-slate-text">All</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="organic"
                      checked={tempOrganicOnly}
                      onChange={() => setTempOrganicOnly(true)}
                      className="text-green-600 focus:ring-green-500"
                    />
                    <span className="text-sm text-slate-text flex items-center gap-1">
                      <Sprout className="w-4 h-4 text-green-600" />
                      Organic Only
                    </span>
                  </label>
                </div>
              </div>

              {/* Farmer Filter */}
              <div>
                <h3 className="text-sm font-medium text-charcoal mb-3">Farmer</h3>
                <select
                  value={tempSelectedFarmer}
                  onChange={(e) => setTempSelectedFarmer(e.target.value)}
                  className="w-full px-3 py-2 border border-green-200 rounded-lg text-sm bg-white focus:outline-none focus:border-green-400"
                >
                  <option value="all">All Farmers</option>
                  {availableFarmers.map(farmer => (
                    <option key={farmer.id} value={farmer.id}>
                      {farmer.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-green-100">
              <button
                onClick={resetFilters}
                className="px-4 py-2 text-sm text-slate-text hover:text-green-600 transition-colors"
              >
                Reset
              </button>
              <button
                onClick={applyFilters}
                className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
              >
                Apply Filters
              </button>
            </div>
          </div>
        )}

        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <Leaf className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-text">No products match your filters</p>
            <button
              onClick={resetFilters}
              className="mt-2 text-sm text-green-600 hover:underline"
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
              <FarmerProductCard key={product.id} product={product} viewMode={viewMode} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FarmersCategoryPage;