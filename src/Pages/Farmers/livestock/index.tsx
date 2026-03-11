// pages/farmers/livestock/index.tsx
import React, { useState } from 'react';
import { 
  Search, 
  Grid2X2,
  List,
  SlidersHorizontal,
  X,
  PawPrint} from 'lucide-react';
import { livestockItems, livestockCategories } from '../../../data/livestock';
import CategoryNavbar from '../../../common/CategoryNavbar';
import LivestockCard from '../../../components/farmers/LivestockCard';

const LivestockPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  const [selectedPurpose, setSelectedPurpose] = useState<string>('all');

  // Filter items
  const filteredItems = livestockItems.filter(item => {
    if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;
    if (item.price < priceRange[0] || item.price > priceRange[1]) return false;
    if (selectedPurpose !== 'all' && item.purpose !== selectedPurpose) return false;
    return true;
  });

  const purposes = ['all', 'breeding', 'dairy', 'meat', 'eggs', 'pet'];

  return (
    <div className="min-h-screen bg-soft-white">
      <CategoryNavbar categoryName="Livestock & Pets" />

      {/* Header */}
      <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-b border-amber-200 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-display font-bold text-charcoal mb-2">
                Livestock & Pets
              </h1>
              <p className="text-slate-text">
                Find healthy animals directly from trusted farmers in Tala
              </p>
            </div>
            
            {/* Search Bar */}
            <div className="w-full md:w-96">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-text/40" />
                <input
                  type="text"
                  placeholder="Search for animals..."
                  className="w-full pl-10 pr-4 py-3 bg-white border border-amber-200 rounded-xl focus:outline-none focus:border-amber-400 focus:ring-4 focus:ring-amber-100 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex overflow-x-auto gap-2 mt-6 pb-2 scrollbar-hide">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                selectedCategory === 'all'
                  ? 'bg-amber-500 text-white shadow-md'
                  : 'bg-white border border-amber-200 text-slate-text hover:border-amber-400'
              }`}
            >
              All Animals
            </button>
            {livestockCategories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all flex items-center gap-1 ${
                    selectedCategory === cat.id
                      ? 'bg-amber-500 text-white shadow-md'
                      : 'bg-white border border-amber-200 text-slate-text hover:border-amber-400'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {cat.name} ({cat.count})
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
            className="flex items-center gap-2 px-4 py-2 bg-white border border-amber-200 rounded-lg text-sm font-medium text-slate-text hover:border-amber-400 transition-colors"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
            {showFilters && <X className="w-4 h-4 ml-2" />}
          </button>

          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-text">{filteredItems.length} animals</span>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'grid' 
                  ? 'bg-amber-100 text-amber-600' 
                  : 'text-slate-text hover:bg-amber-50'
              }`}
            >
              <Grid2X2 className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'list' 
                  ? 'bg-amber-100 text-amber-600' 
                  : 'text-slate-text hover:bg-amber-50'
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="bg-white rounded-xl border border-amber-200 p-6 mb-6 animate-slide-down">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Price Range */}
              <div>
                <h3 className="text-sm font-medium text-charcoal mb-3">Price Range (KSh)</h3>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="100000"
                    step="1000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full accent-amber-500"
                  />
                  <div className="flex items-center justify-between text-sm">
                    <span>KSh {priceRange[0].toLocaleString()}</span>
                    <span>KSh {priceRange[1].toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Purpose */}
              <div>
                <h3 className="text-sm font-medium text-charcoal mb-3">Purpose</h3>
                <select
                  value={selectedPurpose}
                  onChange={(e) => setSelectedPurpose(e.target.value)}
                  className="w-full p-2 border border-amber-200 rounded-lg text-sm text-slate-text focus:outline-none focus:border-amber-400"
                >
                  {purposes.map(p => (
                    <option key={p} value={p}>
                      {p === 'all' ? 'All Purposes' : p.charAt(0).toUpperCase() + p.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Availability */}
              <div>
                <h3 className="text-sm font-medium text-charcoal mb-3">Availability</h3>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded text-amber-500 focus:ring-amber-500" />
                  <span className="text-sm text-slate-text">Show only available now</span>
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-amber-200">
              <button 
                onClick={() => {
                  setPriceRange([0, 100000]);
                  setSelectedPurpose('all');
                }}
                className="px-4 py-2 text-sm text-slate-text hover:text-amber-600 transition-colors"
              >
                Reset
              </button>
              <button className="px-4 py-2 bg-amber-500 text-white rounded-lg text-sm font-medium hover:bg-amber-600 transition-colors">
                Apply Filters
              </button>
            </div>
          </div>
        )}

        {/* Items Grid/List */}
        <div className={
          viewMode === 'grid' 
            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4' 
            : 'space-y-3'
        }>
          {filteredItems.map((item) => (
            <LivestockCard key={item.id} item={item} viewMode={viewMode} />
          ))}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <PawPrint className="w-16 h-16 text-slate-text/30 mx-auto mb-4" />
            <h3 className="text-lg font-display font-medium text-charcoal mb-2">
              No animals found
            </h3>
            <p className="text-sm text-slate-text">
              Try adjusting your filters or check back later
            </p>
          </div>
        )}

        {/* Info Box */}
        <div className="mt-8 bg-amber-50 rounded-xl p-4 border border-amber-200">
          <p className="text-sm text-amber-800 text-center">
            <span className="font-semibold">Note:</span> E-TALA connects you directly with farmers. 
            Please contact the seller to arrange viewing, purchase, and delivery.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LivestockPage;