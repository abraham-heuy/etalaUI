// pages/farmers/all.tsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Star, MapPin, BadgeCheck, Package, Share2, Filter, Sprout, Leaf } from 'lucide-react';
import CategoryNavbar from '../../../common/CategoryNavbar';
import { farmersService } from '../../../services/farmers/farmer.service';
import { decodeStoreCode, encodeStoreCode } from '../../../utils/storeCodec';


interface Farmer {
  id: string;
  name: string;
  location: string;
  rating: number;
  productCount: number;
  verified: boolean;
  organic: boolean;
  avatar?: string;
}

const FarmersAllPage: React.FC = () => {
  const navigate = useNavigate();
  const [farmers, setFarmers] = useState<Farmer[]>([]);
  const [filteredFarmers, setFilteredFarmers] = useState<Farmer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Search & filters
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [minRating, setMinRating] = useState(0);
  const [organicOnly, setOrganicOnly] = useState(false);
  const [locations, setLocations] = useState<string[]>([]);
  
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    fetchFarmers();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [farmers, searchTerm, selectedLocation, minRating, organicOnly]);

  const fetchFarmers = async () => {
    setLoading(true);
    setError(null);
    try {
      const homeData = await farmersService.getHome();
      const topFarms = homeData.topFarms || [];
      const mappedFarmers: Farmer[] = topFarms.map((f: any) => ({
        id: f.sellerId,
        name: f.sellerName,
        location: f.sellerLocation || 'Tala',
        rating: Number(f.sellerRating) || 0,
        productCount: f.totalProducts || 0,
        verified: false, // backend doesn't provide yet
        organic: false,   // backend doesn't provide yet
        avatar: undefined,
      }));
      setFarmers(mappedFarmers);
      
      // Extract unique locations
      const uniqueLocations = [...new Set(mappedFarmers.map(f => f.location).filter(Boolean))];
      setLocations(uniqueLocations);
    } catch (err: any) {
      setError(err.message || 'Failed to load farmers');
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...farmers];
    
    if (searchTerm.trim()) {
      const trimmed = searchTerm.trim();
      if (trimmed.startsWith('FARMER-')) {
        const decoded = decodeStoreCode(trimmed); // reuse store codec or create farmer codec
        if (decoded) {
          navigate(`/farmers/farmer/${decoded.storeId}`);
          return;
        }
      }
      filtered = filtered.filter(farmer =>
        farmer.name.toLowerCase().includes(trimmed.toLowerCase())
      );
    }
    
    if (selectedLocation !== 'all') {
      filtered = filtered.filter(farmer => farmer.location === selectedLocation);
    }
    if (minRating > 0) {
      filtered = filtered.filter(farmer => farmer.rating >= minRating);
    }
    if (organicOnly) {
      filtered = filtered.filter(farmer => farmer.organic);
    }
    
    setFilteredFarmers(filtered);
  };

  const handleShareFarmer = (farmer: Farmer) => {
    const code = encodeStoreCode(farmer.id, farmer.name);
    const shareUrl = `${window.location.origin}/farmers/farmer?code=${code}`;
    navigator.clipboard.writeText(shareUrl);
    setToast({ message: `Farmer link copied to clipboard!`, type: 'success' });
    setTimeout(() => setToast(null), 3000);
  };

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedLocation('all');
    setMinRating(0);
    setOrganicOnly(false);
    setShowFilters(false);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const FarmerCard: React.FC<{ farmer: Farmer }> = ({ farmer }) => (
    <div className="bg-white rounded-xl border border-green-100 overflow-hidden hover:shadow-md transition-all group">
      <Link to={`/farmers/farmer/${farmer.id}`} className="block p-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-green-200 bg-green-100 flex items-center justify-center flex-shrink-0">
            {farmer.avatar ? (
              <img src={farmer.avatar} alt={farmer.name} className="w-full h-full object-cover" />
            ) : (
              <span className="text-xl font-bold text-green-700">{getInitials(farmer.name)}</span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1 mb-1">
              <h3 className="text-base font-display font-semibold text-charcoal group-hover:text-green-600 transition-colors truncate">
                {farmer.name}
              </h3>
              {farmer.verified && <BadgeCheck className="w-4 h-4 text-green-600 flex-shrink-0" />}
              {farmer.organic && <Sprout className="w-4 h-4 text-green-600 flex-shrink-0" />}
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-text/70 mb-2">
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 text-yellow-500 fill-current" />
                <span>{farmer.rating.toFixed(1)}</span>
              </div>
              <span className="w-1 h-1 bg-slate-text/30 rounded-full"></span>
              <div className="flex items-center gap-1">
                <Package className="w-3 h-3" />
                <span>{farmer.productCount} items</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-xs text-slate-text/70">
                <MapPin className="w-3 h-3" />
                <span className="truncate">{farmer.location}</span>
              </div>
              <button
                onClick={(e) => { e.preventDefault(); handleShareFarmer(farmer); }}
                className="p-1.5 rounded-full text-slate-text hover:text-green-600 hover:bg-green-50 transition-colors"
                aria-label="Share farmer"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );

  const FarmerSkeleton = () => (
    <div className="bg-white rounded-xl border border-green-100 p-4 animate-pulse">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-gray-200"></div>
        <div className="flex-1 space-y-2">
          <div className="h-5 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-soft-white">
        <CategoryNavbar categoryName="All Farmers" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 pt-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => <FarmerSkeleton key={i} />)}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-soft-white">
        <CategoryNavbar categoryName="All Farmers" />
        <div className="pt-32 flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-600">{error}</p>
            <button onClick={fetchFarmers} className="mt-4 text-sky-600">Retry</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-soft-white">
      <CategoryNavbar categoryName="All Farmers" />

      {/* Hero section */}
      <div className="bg-gradient-to-r from-green-700 to-green-900 text-white pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-display font-bold mb-3">Meet Our Farmers</h1>
            <p className="text-green-100 mb-6">Support local growers and get farm-fresh produce</p>
            
            {/* Search bar */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search farmer name or paste share code..."
                className="w-full pl-10 pr-4 py-3 bg-white text-charcoal rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-green-300"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Filter bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-green-200 rounded-lg text-sm text-slate-text hover:border-green-400"
          >
            <Filter className="w-4 h-4" />
            Filters
            {(selectedLocation !== 'all' || minRating > 0 || organicOnly) && (
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            )}
          </button>
          <div className="text-sm text-slate-text">
            {filteredFarmers.length} farmers found
          </div>
        </div>

        {/* Filter panel */}
        {showFilters && (
          <div className="bg-white rounded-xl border border-green-100 p-6 mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {/* Location filter */}
              <div>
                <h3 className="text-sm font-medium text-charcoal mb-3">Location</h3>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full px-3 py-2 border border-green-200 rounded-lg text-sm bg-white"
                >
                  <option value="all">All Locations</option>
                  {locations.map(loc => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>
              {/* Rating filter */}
              <div>
                <h3 className="text-sm font-medium text-charcoal mb-3">Minimum Rating</h3>
                <div className="flex items-center gap-3">
                  {[0, 3, 4, 4.5].map(rating => (
                    <button
                      key={rating}
                      onClick={() => setMinRating(rating)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                        minRating === rating
                          ? 'bg-green-600 text-white'
                          : 'bg-green-50 text-slate-text hover:bg-green-100'
                      }`}
                    >
                      {rating === 0 ? 'Any' : `${rating}+`}
                    </button>
                  ))}
                </div>
              </div>
              {/* Organic filter */}
              <div>
                <h3 className="text-sm font-medium text-charcoal mb-3">Farming Method</h3>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={organicOnly}
                    onChange={(e) => setOrganicOnly(e.target.checked)}
                    className="rounded text-green-600 focus:ring-green-500"
                  />
                  <span className="text-sm text-slate-text flex items-center gap-1">
                    <Sprout className="w-4 h-4 text-green-600" />
                    Organic Only
                  </span>
                </label>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-green-100">
              <button onClick={resetFilters} className="px-4 py-2 text-sm text-slate-text hover:text-green-600">Reset</button>
            </div>
          </div>
        )}

        {/* Farmers grid */}
        {filteredFarmers.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-green-100">
            <Leaf className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-display font-medium text-charcoal mb-2">No farmers found</h3>
            <p className="text-sm text-slate-text">Try adjusting your filters or search term</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredFarmers.map(farmer => (
              <FarmerCard key={farmer.id} farmer={farmer} />
            ))}
          </div>
        )}

        {/* Toast notification */}
        {toast && (
          <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 animate-slide-up">
            <div className={`flex items-center gap-2 px-4 py-2 rounded-lg shadow-lg ${
              toast.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
            }`}>
              <span className="text-sm">{toast.message}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FarmersAllPage;