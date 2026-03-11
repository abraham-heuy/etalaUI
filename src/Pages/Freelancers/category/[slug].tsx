// pages/services/category/[slug].tsx
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Search,
  SlidersHorizontal,
  Grid2X2,
  List,
  X,
  Star} from 'lucide-react';
import { serviceCategories, serviceProviders } from '../../../data/services';
import ServiceProviderCard from '../../../components/services/ServiceProviderCard';
import CategoryNavbar from '../../../common/CategoryNavbar';

const ServiceCategoryPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [sortBy, setSortBy] = useState<'rating' | 'price-low' | 'price-high' | 'experience'>('rating');
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  const category = serviceCategories.find(c => c.id === slug);
  const categoryProviders = serviceProviders.filter(p => p.category === slug);

  // Apply filters and sorting
  const filteredProviders = categoryProviders
    .filter(provider => {
      // Price filter
      const price = provider.hourlyRate || provider.fixedPrice || 0;
      if (price < priceRange[0] || price > priceRange[1]) return false;
      
      // Rating filter
      if (selectedRating && provider.rating < selectedRating) return false;
      
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'price-low':
          return (a.hourlyRate || a.fixedPrice || 0) - (b.hourlyRate || b.fixedPrice || 0);
        case 'price-high':
          return (b.hourlyRate || b.fixedPrice || 0) - (a.hourlyRate || a.fixedPrice || 0);
        case 'experience':
          return b.experience - a.experience;
        default:
          return 0;
      }
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
            <Link to="/services" className="text-purple-600 hover:underline">
              Back to Services
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-soft-white">
      <CategoryNavbar categoryName={category.name} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 pt-24">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-charcoal">
            {category.name}
          </h1>
          <p className="text-slate-text mt-1">{category.description}</p>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-text/40" />
            <input
              type="text"
              placeholder={`Search in ${category.name}...`}
              className="w-full pl-10 pr-4 py-2 bg-white border border-purple-200 rounded-lg text-sm focus:outline-none focus:border-purple-400"
            />
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-2 bg-white border border-purple-200 rounded-lg text-sm font-medium text-slate-text hover:border-purple-400 transition-colors flex items-center gap-2"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </button>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-4 py-2 bg-white border border-purple-200 rounded-lg text-sm text-slate-text focus:outline-none focus:border-purple-400"
            >
              <option value="rating">Top Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="experience">Most Experienced</option>
            </select>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-purple-100 text-purple-600' : 'text-slate-text hover:bg-purple-50'
                }`}
              >
                <Grid2X2 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-purple-100 text-purple-600' : 'text-slate-text hover:bg-purple-50'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="bg-white rounded-xl border border-purple-200 p-6 mb-6 animate-slide-down">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-charcoal">Filters</h3>
              <button
                onClick={() => setShowFilters(false)}
                className="p-1 text-slate-text hover:text-purple-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Price Range */}
              <div>
                <h4 className="text-xs font-medium text-slate-text mb-2">Price Range (KSh)</h4>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="5000"
                    step="100"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full accent-purple-600"
                  />
                  <div className="flex items-center justify-between text-xs">
                    <span>KSh {priceRange[0]}</span>
                    <span>KSh {priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Rating Filter */}
              <div>
                <h4 className="text-xs font-medium text-slate-text mb-2">Minimum Rating</h4>
                <div className="space-y-2">
                  {[5, 4, 3].map((rating) => (
                    <label key={rating} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="rating"
                        checked={selectedRating === rating}
                        onChange={() => setSelectedRating(rating)}
                        className="text-purple-600 focus:ring-purple-500"
                      />
                      <span className="text-sm text-slate-text flex items-center gap-1">
                        {rating}+ <Star className="w-3 h-3 fill-current text-yellow-500" />
                      </span>
                    </label>
                  ))}
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="rating"
                      checked={selectedRating === null}
                      onChange={() => setSelectedRating(null)}
                      className="text-purple-600 focus:ring-purple-500"
                    />
                    <span className="text-sm text-slate-text">Any rating</span>
                  </label>
                </div>
              </div>

              {/* Availability */}
              <div>
                <h4 className="text-xs font-medium text-slate-text mb-2">Availability</h4>
                <div className="space-y-2">
                  {['available', 'busy'].map((status) => (
                    <label key={status} className="flex items-center gap-2">
                      <input type="checkbox" className="rounded text-purple-600 focus:ring-purple-500" />
                      <span className="text-sm text-slate-text capitalize">{status}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-purple-100">
              <button
                onClick={() => {
                  setPriceRange([0, 5000]);
                  setSelectedRating(null);
                }}
                className="px-4 py-2 text-sm text-slate-text hover:text-purple-600 transition-colors"
              >
                Reset
              </button>
              <button className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors">
                Apply Filters
              </button>
            </div>
          </div>
        )}

        {/* Results Count */}
        <p className="text-sm text-slate-text mb-4">
          {filteredProviders.length} {filteredProviders.length === 1 ? 'professional' : 'professionals'} found
        </p>

        {/* Providers Grid/List */}
        <div className={
          viewMode === 'grid' 
            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4' 
            : 'space-y-3'
        }>
          {filteredProviders.map((provider) => (
            <ServiceProviderCard 
              key={provider.id} 
              provider={provider} 
              viewMode={viewMode}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredProviders.length === 0 && (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-purple-400" />
            </div>
            <h3 className="text-lg font-display font-medium text-charcoal mb-2">
              No professionals found
            </h3>
            <p className="text-sm text-slate-text mb-4">
              Try adjusting your filters or search for something else
            </p>
            <button
              onClick={() => {
                setPriceRange([0, 5000]);
                setSelectedRating(null);
              }}
              className="text-purple-600 hover:text-purple-700 font-medium"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceCategoryPage;