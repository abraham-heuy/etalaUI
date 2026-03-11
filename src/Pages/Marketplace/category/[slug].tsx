// pages/marketplace/category/[slug].tsx
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  SlidersHorizontal,
  Grid2X2,
  List,
  X
} from 'lucide-react';
import { categories, products } from '../../../data/marketplace';
import ProductCard from '../../../components/marketplace/ProductCard';
import CategoryNavbar from '../../../common/CategoryNavbar';

const CategoryPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200000]);
  const [selectedCondition, setSelectedCondition] = useState<string>('all');

  const category = categories.find(c => c.id === slug);
  const categoryProducts = products.filter(p => p.category === slug);

  if (!category) {
    return (
      <div className="min-h-screen bg-soft-white">
        <CategoryNavbar categoryName="Category Not Found" />
        <div className="pt-32 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-display font-bold text-charcoal mb-2">
              Category Not Found
            </h2>
            <Link to="/marketplace" className="text-sky-600 hover:underline">
              Back to Marketplace
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

      {/* Header - adjusted for fixed navbar */}
      <div className="bg-white border-b border-sky-100 sticky top-16 z-10 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-2xl font-display font-bold text-charcoal">
                {category.name}
              </h1>
              <p className="text-sm text-slate-text">
                {categoryProducts.length} products available
              </p>
            </div>
          </div>

          {/* Subcategories */}
          <div className="flex overflow-x-auto gap-2 mt-4 pb-2 scrollbar-hide">
            <button className="px-4 py-2 bg-sky-500 text-white rounded-full text-sm font-medium whitespace-nowrap">
              All Items
            </button>
            {category.subcategories.map((sub) => (
              <button
                key={sub.id}
                className="px-4 py-2 bg-white border border-sky-200 text-slate-text rounded-full text-sm font-medium whitespace-nowrap hover:border-sky-400 transition-colors"
              >
                {sub.name} ({sub.count})
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Filters Bar */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-sky-200 rounded-lg text-sm font-medium text-slate-text hover:border-sky-400 transition-colors"
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
                  ? 'bg-sky-100 text-sky-600' 
                  : 'text-slate-text hover:bg-sky-50'
              }`}
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
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="bg-white rounded-xl border border-sky-100 p-6 mb-6 animate-slide-down">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Price Range */}
              <div>
                <h3 className="text-sm font-medium text-charcoal mb-3">Price Range</h3>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="200000"
                    step="1000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full"
                  />
                  <div className="flex items-center justify-between text-sm">
                    <span>KSh {priceRange[0].toLocaleString()}</span>
                    <span>KSh {priceRange[1].toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Condition */}
              <div>
                <h3 className="text-sm font-medium text-charcoal mb-3">Condition</h3>
                <div className="space-y-2">
                  {['all', 'new', 'like-new', 'good', 'fair'].map((condition) => (
                    <label key={condition} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="condition"
                        value={condition}
                        checked={selectedCondition === condition}
                        onChange={(e) => setSelectedCondition(e.target.value)}
                        className="text-sky-500 focus:ring-sky-500"
                      />
                      <span className="text-sm text-slate-text capitalize">
                        {condition === 'all' ? 'All Conditions' : condition}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Seller Location */}
              <div>
                <h3 className="text-sm font-medium text-charcoal mb-3">Location</h3>
                <div className="space-y-2">
                  {['Tala Town', 'Kangundo', 'Matuu', 'Kwa Ndege'].map((location) => (
                    <label key={location} className="flex items-center gap-2">
                      <input type="checkbox" className="rounded text-sky-500 focus:ring-sky-500" />
                      <span className="text-sm text-slate-text">{location}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-sky-100">
              <button className="px-4 py-2 text-sm text-slate-text hover:text-sky-600 transition-colors">
                Reset
              </button>
              <button className="px-4 py-2 bg-sky-500 text-white rounded-lg text-sm font-medium hover:bg-sky-600 transition-colors">
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
          {categoryProducts.map((product) => (
            <ProductCard key={product.id} product={product} viewMode={viewMode} />
          ))}
        </div>

        {/* Empty State */}
        {categoryProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-text">No products found in this category</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;