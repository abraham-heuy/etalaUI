// pages/marketplace/stores.tsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Star, MapPin, BadgeCheck, Package, Share2, Filter, Store} from 'lucide-react';
import CategoryNavbar from '../../../common/CategoryNavbar';
import { MarketplaceService } from '../../../services/Marketplace/marketplace.service';
import { decodeStoreCode, encodeStoreCode } from '../../../utils/storeCodec';

interface Store {
  id: string;
  name: string;
  location: string;
  rating: number;
  productCount: number;
  verified: boolean;
  avatar?: string;
}

const StoresPage: React.FC = () => {
  const navigate = useNavigate();
  const [stores, setStores] = useState<Store[]>([]);
  const [filteredStores, setFilteredStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Search & filters
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [minRating, setMinRating] = useState(0);
  const [locations, setLocations] = useState<string[]>([]);
  
  // Toast message (simple)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    fetchStores();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [stores, searchTerm, selectedLocation, minRating]);

  const fetchStores = async () => {
    setLoading(true);
    setError(null);
    try {
      const homeData = await MarketplaceService.getHome();
      const topSellers = homeData.topSellers || [];
      const mappedStores: Store[] = topSellers.map((s: any) => ({
        id: s.sellerId || s.id,
        name: s.name || s.sellerName,
        location: s.location || s.sellerLocation || 'Tala',
        rating: Number(s.rating || s.sellerRating || 0),
        productCount: s.productCount || 0,
        verified: s.verified ?? s.sellerVerified ?? false,
        avatar: s.avatar || s.image,
      }));
      setStores(mappedStores);
      
      // Extract unique locations
      const uniqueLocations = [...new Set(mappedStores.map(s => s.location).filter(Boolean))];
      setLocations(uniqueLocations);
    } catch (err: any) {
      setError(err.message || 'Failed to load stores');
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...stores];
    
    // Search by name (or if input starts with "STORE-", decode and redirect)
    if (searchTerm.trim()) {
      const trimmed = searchTerm.trim();
      if (trimmed.startsWith('STORE-')) {
        const decoded = decodeStoreCode(trimmed);
        if (decoded) {
          // Redirect to store page
          navigate(`/marketplace/store/${decoded.storeId}`);
          return;
        }
      }
      // Normal text search
      filtered = filtered.filter(store =>
        store.name.toLowerCase().includes(trimmed.toLowerCase())
      );
    }
    
    if (selectedLocation !== 'all') {
      filtered = filtered.filter(store => store.location === selectedLocation);
    }
    if (minRating > 0) {
      filtered = filtered.filter(store => store.rating >= minRating);
    }
    
    setFilteredStores(filtered);
  };

  const handleShareStore = (store: Store) => {
    const code = encodeStoreCode(store.id, store.name);
    const shareUrl = `${window.location.origin}/marketplace/store?code=${code}`;
    navigator.clipboard.writeText(shareUrl);
    setToast({ message: `Store link copied to clipboard!`, type: 'success' });
    setTimeout(() => setToast(null), 3000);
  };

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedLocation('all');
    setMinRating(0);
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

  const StoreCard: React.FC<{ store: Store }> = ({ store }) => (
    <div className="bg-white rounded-xl border border-sky-100 overflow-hidden hover:shadow-md transition-all group">
      <Link to={`/marketplace/store/${store.id}`} className="block p-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-sky-200 bg-sky-100 flex items-center justify-center flex-shrink-0">
            {store.avatar ? (
              <img src={store.avatar} alt={store.name} className="w-full h-full object-cover" />
            ) : (
              <span className="text-xl font-bold text-sky-600">{getInitials(store.name)}</span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1 mb-1">
              <h3 className="text-base font-display font-semibold text-charcoal group-hover:text-sky-600 transition-colors truncate">
                {store.name}
              </h3>
              {store.verified && <BadgeCheck className="w-4 h-4 text-sky-600 flex-shrink-0" />}
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-text/70 mb-2">
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 text-yellow-500 fill-current" />
                <span>{store.rating.toFixed(1)}</span>
              </div>
              <span className="w-1 h-1 bg-slate-text/30 rounded-full"></span>
              <div className="flex items-center gap-1">
                <Package className="w-3 h-3" />
                <span>{store.productCount} items</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-xs text-slate-text/70">
                <MapPin className="w-3 h-3" />
                <span className="truncate">{store.location}</span>
              </div>
              <button
                onClick={(e) => { e.preventDefault(); handleShareStore(store); }}
                className="p-1.5 rounded-full text-slate-text hover:text-sky-600 hover:bg-sky-50 transition-colors"
                aria-label="Share store"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );

  const StoreSkeleton = () => (
    <div className="bg-white rounded-xl border border-sky-100 p-4 animate-pulse">
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
        <CategoryNavbar categoryName="All Stores" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 pt-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => <StoreSkeleton key={i} />)}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-soft-white">
        <CategoryNavbar categoryName="All Stores" />
        <div className="pt-32 flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-600">{error}</p>
            <button onClick={fetchStores} className="mt-4 text-sky-600">Retry</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-soft-white">
      <CategoryNavbar categoryName="All Stores" />

      {/* Hero section */}
      <div className="bg-gradient-to-r from-sky-700 to-sky-900 text-white pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-display font-bold mb-3">Discover Local Stores</h1>
            <p className="text-sky-100 mb-6">Shop from trusted sellers in Tala and beyond</p>
            
            {/* Search bar */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search store name or paste share code..."
                className="w-full pl-10 pr-4 py-3 bg-white text-charcoal rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-sky-300"
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
            className="flex items-center gap-2 px-4 py-2 bg-white border border-sky-200 rounded-lg text-sm text-slate-text hover:border-sky-400"
          >
            <Filter className="w-4 h-4" />
            Filters
            {(selectedLocation !== 'all' || minRating > 0) && (
              <span className="w-2 h-2 bg-sky-500 rounded-full"></span>
            )}
          </button>
          <div className="text-sm text-slate-text">
            {filteredStores.length} stores found
          </div>
        </div>

        {/* Filter panel */}
        {showFilters && (
          <div className="bg-white rounded-xl border border-sky-100 p-6 mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Location filter */}
              <div>
                <h3 className="text-sm font-medium text-charcoal mb-3">Location</h3>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full px-3 py-2 border border-sky-200 rounded-lg text-sm bg-white"
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
                          ? 'bg-sky-500 text-white'
                          : 'bg-sky-50 text-slate-text hover:bg-sky-100'
                      }`}
                    >
                      {rating === 0 ? 'Any' : `${rating}+`}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-sky-100">
              <button onClick={resetFilters} className="px-4 py-2 text-sm text-slate-text hover:text-sky-600">Reset</button>
            </div>
          </div>
        )}

        {/* Stores grid */}
        {filteredStores.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-sky-100">
            <Store className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-display font-medium text-charcoal mb-2">No stores found</h3>
            <p className="text-sm text-slate-text">Try adjusting your filters or search term</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredStores.map(store => (
              <StoreCard key={store.id} store={store} />
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

export default StoresPage;