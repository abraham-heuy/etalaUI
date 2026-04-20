// pages/marketplace/store/[id].tsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Star, MapPin, BadgeCheck, Package, Calendar, Clock, Phone, Mail, 
  Share2, Grid2X2, List, Users, Award, Shield, Heart, Store
} from 'lucide-react';
import ProductCard from '../../../components/marketplace/ProductCard';
import CategoryNavbar from '../../../common/CategoryNavbar';
import { MarketplaceService, type MarketplaceProduct } from '../../../services/Marketplace/marketplace.service';

interface SellerProfile {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  location?: string;
  verified: boolean;
  rating: number;
  totalSales: number;
  joinedAt: string;
  avatar?: string;
  coverImage?: string;
  bio?: string;
}

const StoreDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [seller, setSeller] = useState<SellerProfile | null>(null);
  const [allProducts, setAllProducts] = useState<MarketplaceProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<MarketplaceProduct[]>([]);
  const [popularStores, setPopularStores] = useState<SellerProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'newest' | 'popular' | 'price-low' | 'price-high'>('popular');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    if (id) {
      fetchStoreData();
      fetchPopularStores();
    } else {
      setError('No store ID provided');
      setLoading(false);
    }
  }, [id]);

  // Update filtered products when allProducts, selectedCategory, or sortBy changes
  useEffect(() => {
    if (allProducts.length === 0) return;
    let filtered = [...allProducts];
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }
    // Apply sorting
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'popular':
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'price-low':
        filtered.sort((a, b) => Number(a.price) - Number(b.price));
        break;
      case 'price-high':
        filtered.sort((a, b) => Number(b.price) - Number(a.price));
        break;
      default:
        break;
    }
    setFilteredProducts(filtered);
  }, [allProducts, selectedCategory, sortBy]);

  const fetchStoreData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await MarketplaceService.getSellerProfile(id!);
      const sellerData = data.seller;
      const productsData = data.products || [];
      
      setSeller({
        id: sellerData.id,
        name: sellerData.name || sellerData.sellerName || 'Unknown Store',
        email: sellerData.email,
        phone: sellerData.phone,
        location: sellerData.location || sellerData.sellerLocation || 'Tala',
        verified: sellerData.verified ?? sellerData.sellerVerified ?? false,
        rating: Number(sellerData.rating ?? sellerData.sellerRating ?? 0),
        totalSales: sellerData.totalSales ?? sellerData.sellerTotalSales ?? 0,
        joinedAt: sellerData.createdAt || sellerData.joinedAt || new Date().toISOString(),
        avatar: sellerData.avatar || sellerData.image,
        coverImage: sellerData.coverImage,
        bio: sellerData.bio || sellerData.description,
      });
      setAllProducts(productsData);
      setFilteredProducts(productsData);
    } catch (err: any) {
      console.error('Error fetching store:', err);
      setError(err.message || 'Failed to load store');
    } finally {
      setLoading(false);
    }
  };

  const fetchPopularStores = async () => {
    try {
      const homeData = await MarketplaceService.getHome();
      if (homeData.topSellers && homeData.topSellers.length) {
        const mapped = homeData.topSellers.map((s: any) => ({
          id: s.id || s.sellerId,
          name: s.name || s.sellerName,
          location: s.location || s.sellerLocation,
          verified: s.verified ?? s.sellerVerified ?? false,
          rating: Number(s.rating ?? s.sellerRating ?? 0),
          totalSales: s.totalSales ?? s.sellerTotalSales ?? 0,
          avatar: s.avatar || s.image,
          joinedAt: s.createdAt || s.joinedAt || new Date().toISOString(),
        }));
        setPopularStores(mapped);
      }
    } catch (err) {
      console.error('Failed to fetch popular stores:', err);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const mapToProductCard = (p: MarketplaceProduct) => ({
    id: p.id,
    name: p.name,
    description: p.description,
    price: Number(p.price),
    originalPrice: p.originalPrice ? Number(p.originalPrice) : undefined,
    image: p.images?.[0] || '',
    images: p.images || [],
    rating: Number(p.rating) || 0,
    seller: {
      id: p.sellerId,
      name: p.sellerName || seller?.name || 'Seller',
      verified: (p as any).sellerVerified ?? false,
      rating: Number(p.sellerRating) || 0,
      totalSales: p.totalSales || 0,
      location: p.sellerLocation || seller?.location || 'Tala',
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
        <CategoryNavbar categoryName="Loading Store..." />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 pt-24">
          <div className="animate-pulse">
            <div className="h-48 sm:h-64 bg-gray-200 rounded-xl mb-8"></div>
            <div className="bg-white rounded-2xl border border-sky-100 p-6 shadow-lg mb-8">
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="w-24 h-24 rounded-2xl bg-gray-200"></div>
                <div className="flex-1 space-y-4">
                  <div className="h-8 bg-gray-200 rounded w-48"></div>
                  <div className="h-4 bg-gray-200 rounded w-64"></div>
                  <div className="grid grid-cols-4 gap-4">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="h-16 bg-gray-200 rounded-xl"></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl border border-sky-100 p-3">
                  <div className="h-40 bg-gray-200 rounded-lg mb-3"></div>
                  <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !seller) {
    return (
      <div className="min-h-screen bg-soft-white">
        <CategoryNavbar categoryName="Store Not Found" />
        <div className="pt-32 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-display font-bold text-charcoal mb-2">Store Not Found</h2>
            <p className="text-slate-text mb-4">{error || 'The store you are looking for does not exist.'}</p>
            <Link to="/marketplace" className="text-sky-600 hover:underline">Back to Marketplace</Link>
          </div>
        </div>
      </div>
    );
  }

  const categories = [...new Set(allProducts.map(p => p.category))];
  const averageRating = allProducts.length 
    ? allProducts.reduce((sum, p) => sum + (Number(p.rating) || 0), 0) / allProducts.length 
    : seller.rating;

  return (
    <div className="min-h-screen bg-soft-white">
      <CategoryNavbar categoryName={seller.name} />

      <div className="relative h-48 sm:h-64 overflow-hidden bg-gradient-to-r from-sky-600 to-sky-800">
        {seller.coverImage ? (
          <img src={seller.coverImage} alt={seller.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Store className="w-24 h-24 text-white/30" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
        <div className="absolute bottom-4 left-4 text-white">
          <h1 className="text-2xl sm:text-3xl font-display font-bold drop-shadow-lg">
            {seller.name}
          </h1>
          <p className="text-sm text-white/90 drop-shadow">
            {allProducts.length} products • {seller.totalSales} sales
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-16 relative z-10">
        <div className="bg-white rounded-2xl border border-sky-100 p-6 shadow-lg mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="w-24 h-24 rounded-2xl overflow-hidden border-4 border-white shadow-lg bg-sky-100 flex items-center justify-center">
              {seller.avatar ? (
                <img src={seller.avatar} alt={seller.name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-3xl font-bold text-sky-600">{getInitials(seller.name)}</span>
              )}
            </div>

            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h2 className="text-xl sm:text-2xl font-display font-bold text-charcoal">
                      {seller.name}
                    </h2>
                    {seller.verified && <BadgeCheck className="w-5 h-5 text-sky-600" />}
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-slate-text/70">
                    {seller.location && (
                      <>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{seller.location}</span>
                        </div>
                        <span className="w-1 h-1 bg-slate-text/30 rounded-full"></span>
                      </>
                    )}
                    <div className="flex items-center gap-1">
                      <Package className="w-4 h-4" />
                      <span>{allProducts.length} products</span>
                    </div>
                    <span className="w-1 h-1 bg-slate-text/30 rounded-full"></span>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{seller.totalSales} total sales</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 border border-sky-200 rounded-lg text-sky-600 hover:bg-sky-50">
                    <Heart className="w-5 h-5" />
                  </button>
                  <button className="p-2 border border-sky-200 rounded-lg text-sky-600 hover:bg-sky-50">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
                <div className="bg-sky-50 rounded-xl p-3 text-center">
                  <div className="flex items-center justify-center gap-1 text-amber-500 mb-1">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="font-bold text-charcoal">{averageRating.toFixed(1)}</span>
                  </div>
                  <p className="text-xs text-slate-text">Avg. Rating</p>
                </div>
                <div className="bg-sky-50 rounded-xl p-3 text-center">
                  <div className="flex items-center justify-center gap-1 text-sky-600 mb-1">
                    <Award className="w-4 h-4" />
                    <span className="font-bold text-charcoal">{seller.verified ? 'Verified' : 'Not Verified'}</span>
                  </div>
                  <p className="text-xs text-slate-text">Status</p>
                </div>
                <div className="bg-sky-50 rounded-xl p-3 text-center">
                  <div className="flex items-center justify-center gap-1 text-sky-600 mb-1">
                    <Calendar className="w-4 h-4" />
                    <span className="font-bold text-charcoal">
                      {new Date(seller.joinedAt).getFullYear()}
                    </span>
                  </div>
                  <p className="text-xs text-slate-text">Joined</p>
                </div>
                <div className="bg-sky-50 rounded-xl p-3 text-center">
                  <div className="flex items-center justify-center gap-1 text-sky-600 mb-1">
                    <Package className="w-4 h-4" />
                    <span className="font-bold text-charcoal">{categories.length}</span>
                  </div>
                  <p className="text-xs text-slate-text">Categories</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {categories.length > 0 && (
          <div className="bg-white rounded-xl border border-sky-100 p-4 mb-8">
            <div className="flex overflow-x-auto gap-4 pb-1 scrollbar-hide">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-sky-500 text-white'
                    : 'text-slate-text hover:text-sky-600'
                }`}
              >
                All Products
              </button>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                    selectedCategory === cat
                      ? 'bg-sky-500 text-white'
                      : 'text-slate-text hover:text-sky-600'
                  }`}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-display font-semibold text-charcoal">
              {selectedCategory === 'all' ? 'All Products' : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}`}
            </h2>
            <p className="text-sm text-slate-text mt-1">{filteredProducts.length} items available</p>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-4 py-2 bg-white border border-sky-200 rounded-lg text-sm text-slate-text focus:outline-none focus:border-sky-400"
            >
              <option value="popular">Most Popular</option>
              <option value="newest">Newest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
            <div className="flex gap-2">
              <button onClick={() => setViewMode('grid')} className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-sky-100 text-sky-600' : 'text-slate-text hover:bg-sky-50'}`}>
                <Grid2X2 className="w-5 h-5" />
              </button>
              <button onClick={() => setViewMode('list')} className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-sky-100 text-sky-600' : 'text-slate-text hover:bg-sky-50'}`}>
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8' : 'space-y-3 mb-8'}>
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={mapToProductCard(product)} viewMode={viewMode} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-xl border border-sky-100 mb-8">
            <Package className="w-16 h-16 text-slate-text/30 mx-auto mb-4" />
            <h3 className="text-lg font-display font-medium text-charcoal mb-2">No Products in this Category</h3>
            <p className="text-sm text-slate-text">Try another category or check back later.</p>
          </div>
        )}

        <div className="bg-white rounded-xl border border-sky-100 p-6 mb-8">
          <h3 className="text-lg font-display font-semibold text-charcoal mb-4">Store Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-medium text-charcoal mb-2">About</h4>
              <p className="text-sm text-slate-text leading-relaxed">
                {seller.bio || `${seller.name} is a trusted seller on E-TALA marketplace, offering quality products to the Tala community. With ${allProducts.length} products and ${seller.totalSales} sales, they're committed to providing excellent service.`}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-charcoal mb-2">Contact</h4>
              <div className="space-y-2">
                {seller.phone && (
                  <div className="flex items-center gap-2 text-sm text-slate-text">
                    <Phone className="w-4 h-4 text-sky-600" />
                    <span>{seller.phone}</span>
                  </div>
                )}
                {seller.email && (
                  <div className="flex items-center gap-2 text-sm text-slate-text">
                    <Mail className="w-4 h-4 text-sky-600" />
                    <span>{seller.email}</span>
                  </div>
                )}
                {!seller.phone && !seller.email && (
                  <p className="text-sm text-slate-text">Contact information not provided</p>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-sky-100">
            <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs ${seller.verified ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
              <Shield className="w-3 h-3" />
              {seller.verified ? 'Verified Seller' : 'Unverified Seller'}
            </span>
            <span className="flex items-center gap-1 bg-sky-100 text-sky-700 px-3 py-1 rounded-full text-xs">
              <Award className="w-3 h-3" />
              {averageRating >= 4.5 ? 'Top Rated' : 'Good Standing'}
            </span>
            <span className="flex items-center gap-1 bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs">
              <Clock className="w-3 h-3" />
              Member since {new Date(seller.joinedAt).getFullYear()}
            </span>
          </div>
        </div>

        {popularStores.length > 0 && (
          <div className="bg-white rounded-xl border border-sky-100 p-6 mb-8">
            <h3 className="text-lg font-display font-semibold text-charcoal mb-4">Popular Stores</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {popularStores.filter(s => s.id !== seller.id).slice(0, 5).map(store => (
                <Link key={store.id} to={`/marketplace/store/${store.id}`} className="group">
                  <div className="flex flex-col items-center text-center p-3 rounded-xl hover:bg-sky-50 transition-colors">
                    <div className="w-16 h-16 rounded-full bg-sky-100 flex items-center justify-center mb-2 overflow-hidden">
                      {store.avatar ? (
                        <img src={store.avatar} alt={store.name} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-xl font-bold text-sky-600">{getInitials(store.name)}</span>
                      )}
                    </div>
                    <p className="text-sm font-medium text-charcoal group-hover:text-sky-600 transition-colors line-clamp-1">
                      {store.name}
                    </p>
                    <div className="flex items-center gap-1 text-xs text-slate-text mt-1">
                      <Star className="w-3 h-3 text-yellow-500 fill-current" />
                      <span>{store.rating.toFixed(1)}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoreDetailPage;