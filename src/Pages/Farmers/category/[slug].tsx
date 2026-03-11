// pages/farmers/category/[slug].tsx
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  SlidersHorizontal,
  Grid2X2,
  List,
  X,
  Leaf,
  Sprout,
} from 'lucide-react';
import { farmerCategories, farmerProducts } from '../../../data/farmers';
import FarmerProductCard from '../../../components/farmers/FarmerProductCard';
import CategoryNavbar from '../../../common/CategoryNavbar';

const FarmersCategoryPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [selectedOrganic, setSelectedOrganic] = useState<boolean | null>(null);
  const [selectedFarmer, setSelectedFarmer] = useState<string>('all');

  const category = farmerCategories.find(c => c.id === slug);
  const categoryProducts = farmerProducts.filter(p => p.category === slug);
  
  // Get unique farmers for filter
  const farmers = [...new Set(categoryProducts.map(p => p.farmer.id))].map(id => {
    const product = categoryProducts.find(p => p.farmer.id === id);
    return {
      id,
      name: product?.farmer.name || ''
    };
  });

  // Apply filters
  const filteredProducts = categoryProducts.filter(product => {
    // Price filter
    if (product.price < priceRange[0] || product.price > priceRange[1]) return false;
    
    // Organic filter
    if (selectedOrganic !== null && product.farmer.organic !== selectedOrganic) return false;
    
    // Farmer filter
    if (selectedFarmer !== 'all' && product.farmer.id !== selectedFarmer) return false;
    
    return true;
  });

  if (!category) {
    return (
      <div className="min-h-screen bg-soft-white">
        <CategoryNavbar categoryName="Category Not Found" />
        <div className="pt-32 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-display font-bold text-charcoal mb-2">
              Category Not Found
            </h2>
            <Link to="/farmers" className="text-green-600 hover:underline">
              Back to Farmers Market
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-soft-white">
      {/* Category Navbar */}
      <CategoryNavbar categoryName={category.name} />

      {/* Header */}
      <div className="bg-white border-b border-green-100 sticky top-16 z-10 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-2xl font-display font-bold text-charcoal">
                {category.name}
              </h1>
              <p className="text-sm text-slate-text">
                {categoryProducts.length} items available
              </p>
            </div>
          </div>

          {/* Subcategories */}
          <div className="flex overflow-x-auto gap-2 mt-4 pb-2 scrollbar-hide">
            <button className="px-4 py-2 bg-green-600 text-white rounded-full text-sm font-medium whitespace-nowrap">
              All {category.name}
            </button>
            {category.subcategories.map((sub) => {
              const Icon = sub.icon;
              return (
                <button
                  key={sub.id}
                  className="px-4 py-2 bg-white border border-green-200 text-slate-text rounded-full text-sm font-medium whitespace-nowrap hover:border-green-400 transition-colors flex items-center gap-1"
                >
                  <Icon className="w-4 h-4" />
                  {sub.name} ({sub.count})
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Filters Bar */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-green-200 rounded-lg text-sm font-medium text-slate-text hover:border-green-400 transition-colors"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
            {showFilters && <X className="w-4 h-4 ml-2" />}
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'grid' 
                  ? 'bg-green-100 text-green-600' 
                  : 'text-slate-text hover:bg-green-50'
              }`}
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
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="bg-white rounded-xl border border-green-100 p-6 mb-6 animate-slide-down">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Price Range */}
              <div>
                <h3 className="text-sm font-medium text-charcoal mb-3">Price Range (KSh)</h3>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    step="10"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full accent-green-600"
                  />
                  <div className="flex items-center justify-between text-sm">
                    <span>KSh {priceRange[0]}</span>
                    <span>KSh {priceRange[1]}</span>
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
                      checked={selectedOrganic === null}
                      onChange={() => setSelectedOrganic(null)}
                      className="text-green-600 focus:ring-green-500"
                    />
                    <span className="text-sm text-slate-text">All</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="organic"
                      checked={selectedOrganic === true}
                      onChange={() => setSelectedOrganic(true)}
                      className="text-green-600 focus:ring-green-500"
                    />
                    <span className="text-sm text-slate-text flex items-center gap-1">
                      <Sprout className="w-4 h-4 text-green-600" />
                      Organic Only
                    </span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="organic"
                      checked={selectedOrganic === false}
                      onChange={() => setSelectedOrganic(false)}
                      className="text-green-600 focus:ring-green-500"
                    />
                    <span className="text-sm text-slate-text">Conventional</span>
                  </label>
                </div>
              </div>

              {/* Farmer Filter */}
              <div>
                <h3 className="text-sm font-medium text-charcoal mb-3">Farmer</h3>
                <select
                  value={selectedFarmer}
                  onChange={(e) => setSelectedFarmer(e.target.value)}
                  className="w-full p-2 border border-green-200 rounded-lg text-sm text-slate-text focus:outline-none focus:border-green-400"
                >
                  <option value="all">All Farmers</option>
                  {farmers.map(farmer => (
                    <option key={farmer.id} value={farmer.id}>
                      {farmer.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-green-100">
              <button 
                onClick={() => {
                  setPriceRange([0, 1000]);
                  setSelectedOrganic(null);
                  setSelectedFarmer('all');
                }}
                className="px-4 py-2 text-sm text-slate-text hover:text-green-600 transition-colors"
              >
                Reset
              </button>
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
                Apply Filters
              </button>
            </div>
          </div>
        )}

        {/* Products Grid/List */}
        <div className={
          viewMode === 'grid' 
            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4' 
            : 'space-y-3'
        }>
          {filteredProducts.map((product) => (
            <FarmerProductCard key={product.id} product={product} viewMode={viewMode} />
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <Leaf className="w-16 h-16 text-slate-text/30 mx-auto mb-4" />
            <p className="text-slate-text">No products match your filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FarmersCategoryPage;