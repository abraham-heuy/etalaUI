// pages/food/cuisine/[slug].tsx
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Search,
  SlidersHorizontal,
  Grid2X2,
  List,
  X} from 'lucide-react';
import { foodCategories, restaurants } from '../../../data/food';
import RestaurantCard from '../../../components/food/RestaurantCard';
import CategoryNavbar from '../../../common/CategoryNavbar';

const FoodCategoryPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<number[]>([1, 4]);
  const [sortBy, setSortBy] = useState<'rating' | 'price-low' | 'price-high'>('rating');
  const [deliveryOnly, setDeliveryOnly] = useState(false);

  const category = foodCategories.find(c => c.id === slug);
  const categoryRestaurants = restaurants.filter(r => r.category === slug);

  // Apply filters and sorting
  const filteredRestaurants = categoryRestaurants
    .filter(restaurant => {
      if (deliveryOnly && !restaurant.delivery) return false;
      if (restaurant.priceLevel < priceRange[0] || restaurant.priceLevel > priceRange[1]) return false;
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'price-low':
          return a.priceLevel - b.priceLevel;
        case 'price-high':
          return b.priceLevel - a.priceLevel;
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
            <Link to="/food" className="text-orange-600 hover:underline">
              Back to Food
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
              className="w-full pl-10 pr-4 py-2 bg-white border border-orange-200 rounded-lg text-sm focus:outline-none focus:border-orange-400"
            />
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-2 bg-white border border-orange-200 rounded-lg text-sm font-medium text-slate-text hover:border-orange-400 transition-colors flex items-center gap-2"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </button>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-4 py-2 bg-white border border-orange-200 rounded-lg text-sm text-slate-text focus:outline-none focus:border-orange-400"
            >
              <option value="rating">Top Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-orange-100 text-orange-600' : 'text-slate-text hover:bg-orange-50'
                }`}
              >
                <Grid2X2 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-orange-100 text-orange-600' : 'text-slate-text hover:bg-orange-50'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="bg-white rounded-xl border border-orange-200 p-6 mb-6 animate-slide-down">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-charcoal">Filters</h3>
              <button
                onClick={() => setShowFilters(false)}
                className="p-1 text-slate-text hover:text-orange-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Price Range */}
              <div>
                <h4 className="text-xs font-medium text-slate-text mb-2">Price Level</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-4">
                    {[1, 2, 3, 4].map((level) => (
                      <button
                        key={level}
                        onClick={() => setPriceRange([level, level])}
                        className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                          priceRange[0] === level && priceRange[1] === level
                            ? 'bg-orange-600 text-white'
                            : 'bg-orange-50 text-orange-700 hover:bg-orange-100'
                        }`}
                      >
                        {'$'.repeat(level)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Delivery Option */}
              <div>
                <h4 className="text-xs font-medium text-slate-text mb-2">Services</h4>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={deliveryOnly}
                    onChange={(e) => setDeliveryOnly(e.target.checked)}
                    className="rounded text-orange-600 focus:ring-orange-500"
                  />
                  <span className="text-sm text-slate-text">Delivery available only</span>
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-orange-100">
              <button
                onClick={() => {
                  setPriceRange([1, 4]);
                  setDeliveryOnly(false);
                }}
                className="px-4 py-2 text-sm text-slate-text hover:text-orange-600 transition-colors"
              >
                Reset
              </button>
              <button className="px-4 py-2 bg-orange-600 text-white rounded-lg text-sm font-medium hover:bg-orange-700 transition-colors">
                Apply Filters
              </button>
            </div>
          </div>
        )}

        {/* Results Count */}
        <p className="text-sm text-slate-text mb-4">
          {filteredRestaurants.length} {filteredRestaurants.length === 1 ? 'restaurant' : 'restaurants'} found
        </p>

        {/* Restaurants Grid/List */}
        <div className={
          viewMode === 'grid' 
            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4' 
            : 'space-y-3'
        }>
          {filteredRestaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>

        {/* Empty State */}
        {filteredRestaurants.length === 0 && (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-orange-400" />
            </div>
            <h3 className="text-lg font-display font-medium text-charcoal mb-2">
              No restaurants found
            </h3>
            <p className="text-sm text-slate-text mb-4">
              Try adjusting your filters or search for something else
            </p>
            <button
              onClick={() => {
                setPriceRange([1, 4]);
                setDeliveryOnly(false);
              }}
              className="text-orange-600 hover:text-orange-700 font-medium"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodCategoryPage;