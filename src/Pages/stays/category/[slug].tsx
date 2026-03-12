// pages/stays/category/[slug].tsx
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Search,
  SlidersHorizontal,
  Grid2X2,
  List,
  X} from 'lucide-react';
import { stayCategories, stayProperties } from '../../../data/stays';
import PropertyCard from '../../../components/stays/PropertyCard';
import CategoryNavbar from '../../../common/CategoryNavbar';

const StayCategoryPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000]);
  const [sortBy, setSortBy] = useState<'rating' | 'price-low' | 'price-high' | 'newest'>('rating');
  const [selectedGuests, setSelectedGuests] = useState<number | null>(null);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const category = stayCategories.find(c => c.id === slug);
  const categoryProperties = stayProperties.filter(p => p.category === slug);

  // Get unique amenities for filter
  const allAmenities = [...new Set(categoryProperties.flatMap(p => p.amenities))].slice(0, 10);

  // Apply filters and sorting
  const filteredProperties = categoryProperties
    .filter(property => {
      // Price filter
      const price = property.pricePerNight || property.pricePerMonth || 0;
      if (price < priceRange[0] || price > priceRange[1]) return false;
      
      // Guest filter
      if (selectedGuests && property.maxGuests < selectedGuests) return false;
      
      // Amenities filter
      if (selectedAmenities.length > 0) {
        const hasAllAmenities = selectedAmenities.every(a => property.amenities.includes(a));
        if (!hasAllAmenities) return false;
      }
      
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'price-low':
          return (a.pricePerNight || a.pricePerMonth || 0) - (b.pricePerNight || b.pricePerMonth || 0);
        case 'price-high':
          return (b.pricePerNight || b.pricePerMonth || 0) - (a.pricePerNight || a.pricePerMonth || 0);
        case 'newest':
          return (b.yearBuilt || 0) - (a.yearBuilt || 0);
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
            <Link to="/stays" className="text-blue-600 hover:underline">
              Back to Stays
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities(prev =>
      prev.includes(amenity)
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    );
  };

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
          <p className="text-sm text-slate-text/70 mt-2">
            {categoryProperties.length} properties available
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-text/40" />
            <input
              type="text"
              placeholder={`Search in ${category.name}...`}
              className="w-full pl-10 pr-4 py-2 bg-white border border-blue-200 rounded-lg text-sm focus:outline-none focus:border-blue-400"
            />
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-2 bg-white border border-blue-200 rounded-lg text-sm font-medium text-slate-text hover:border-blue-400 transition-colors flex items-center gap-2"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
              {(selectedGuests || selectedAmenities.length > 0) && (
                <span className="w-5 h-5 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center">
                  {(selectedGuests ? 1 : 0) + selectedAmenities.length}
                </span>
              )}
            </button>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-4 py-2 bg-white border border-blue-200 rounded-lg text-sm text-slate-text focus:outline-none focus:border-blue-400"
            >
              <option value="rating">Top Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest</option>
            </select>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-slate-text hover:bg-blue-50'
                }`}
              >
                <Grid2X2 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-slate-text hover:bg-blue-50'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="bg-white rounded-xl border border-blue-200 p-6 mb-6 animate-slide-down">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-charcoal">Filters</h3>
              <button
                onClick={() => setShowFilters(false)}
                className="p-1 text-slate-text hover:text-blue-600"
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
                    max="50000"
                    step="1000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full accent-blue-600"
                  />
                  <div className="flex items-center justify-between text-sm">
                    <span>KSh {priceRange[0].toLocaleString()}</span>
                    <span>KSh {priceRange[1].toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Guest Filter */}
              <div>
                <h4 className="text-xs font-medium text-slate-text mb-2">Guests</h4>
                <select
                  value={selectedGuests || ''}
                  onChange={(e) => setSelectedGuests(e.target.value ? Number(e.target.value) : null)}
                  className="w-full px-3 py-2 border border-blue-200 rounded-lg text-sm focus:outline-none focus:border-blue-400"
                >
                  <option value="">Any guests</option>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                    <option key={num} value={num}>{num}+ guests</option>
                  ))}
                </select>
              </div>

              {/* Amenities */}
              <div>
                <h4 className="text-xs font-medium text-slate-text mb-2">Amenities</h4>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {allAmenities.map((amenity) => (
                    <label key={amenity} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedAmenities.includes(amenity)}
                        onChange={() => toggleAmenity(amenity)}
                        className="rounded text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-slate-text">{amenity}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-blue-100">
              <button
                onClick={() => {
                  setPriceRange([0, 50000]);
                  setSelectedGuests(null);
                  setSelectedAmenities([]);
                }}
                className="px-4 py-2 text-sm text-slate-text hover:text-blue-600 transition-colors"
              >
                Reset
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                Apply Filters
              </button>
            </div>
          </div>
        )}

        {/* Results Count */}
        <p className="text-sm text-slate-text mb-4">
          {filteredProperties.length} {filteredProperties.length === 1 ? 'property' : 'properties'} found
        </p>

        {/* Properties Grid/List */}
        <div className={
          viewMode === 'grid' 
            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4' 
            : 'space-y-3'
        }>
          {filteredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        {/* Empty State */}
        {filteredProperties.length === 0 && (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-blue-400" />
            </div>
            <h3 className="text-lg font-display font-medium text-charcoal mb-2">
              No properties found
            </h3>
            <p className="text-sm text-slate-text mb-4">
              Try adjusting your filters or search for something else
            </p>
            <button
              onClick={() => {
                setPriceRange([0, 50000]);
                setSelectedGuests(null);
                setSelectedAmenities([]);
              }}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StayCategoryPage;