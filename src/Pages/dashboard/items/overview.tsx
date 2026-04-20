// pages/dashboard/overview.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShoppingBag, 
  Heart, 
  MapPin, 
  CreditCard,
  Package,
  ChevronRight,
  Gift,
  Sparkles,
  TrendingUp,
  Clock,
  Star,
  Tag,
  Flame,
  Store,
  Wallet,
  Calendar,
  Loader2,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { useAuth } from '../../../contexts/auth/auth';
import { SellerApplicationService, type SellerApplication } from '../../../services/Auth/seller-applications.service';
import { CommerceService, type Order, type Wishlist } from '../../../services/commerce/commerce.service';
import { MarketplaceService, type MarketplaceProduct } from '../../../services/Marketplace/marketplace.service';

const DashboardOverview: React.FC = () => {
  const { user, isLoading } = useAuth();
  const [isSellerStatus, setIsSellerStatus] = useState(false);
  const [sellerApplication, setSellerApplication] = useState<SellerApplication | null>(null);
  const [applicationLoading, setApplicationLoading] = useState(true);
  
  // Real data states
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [wishlist, setWishlist] = useState<Wishlist | null>(null);
  const [wishlistLoading, setWishlistLoading] = useState(true);
  const [recommendedProducts, setRecommendedProducts] = useState<MarketplaceProduct[]>([]);
  const [recsLoading, setRecsLoading] = useState(true);
  const [loyaltyPoints, setLoyaltyPoints] = useState(0);
  const [loyaltyPointsLoading, setLoyaltyPointsLoading] = useState(true);
  const [activeOffers, setActiveOffers] = useState<any[]>([]);
  const [upcomingDeals, setUpcomingDeals] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
      fetchDashboardData();
      fetchSellerApplication();
    }
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      // Fetch recent orders (limit 3)
      const orders = await CommerceService.getMyOrders();
      setRecentOrders(orders.slice(0, 3));
      
      // Fetch wishlist
      const wishlistData = await CommerceService.getWishlist();
      setWishlist(wishlistData);
      
      // Generate recommendations based on wishlist (or fallback to trending)
      let recs: MarketplaceProduct[] = [];
      if (wishlistData.items.length > 0) {
        // Get the first wishlist item's product details to find its category
        const firstItem = wishlistData.items[0];
        if (firstItem.productType === 'marketplace') {
          try {
            // We need a method to get product by ID from marketplace service
            // Assuming we have a method getProductById (if not, use search or category)
            // For now, fallback to trending if not available
            recs = await MarketplaceService.getTrending(1, 4);
          } catch (e) {
            recs = await MarketplaceService.getTrending(1, 4);
          }
        } else {
          recs = await MarketplaceService.getTrending(1, 4);
        }
      } else {
        recs = await MarketplaceService.getTrending(1, 4);
      }
      setRecommendedProducts(recs);
      
      // Loyalty points (from user or default 0)
      setLoyaltyPoints((user as any)?.loyaltyPoints || 0);
      
      // Active offers (mock – can be replaced with real endpoint)
      setActiveOffers([
        { 
          id: 1, 
          title: 'Free Delivery', 
          description: 'On orders over KSh 1,000', 
          code: 'FREESHIP',
          validUntil: '2026-03-31',
          discount: 0,
          bg: 'bg-green-50',
          icon: Package,
          color: 'text-green-600'
        },
        { 
          id: 2, 
          title: 'Weekend Flash Sale', 
          description: '15% off on electronics', 
          code: 'WEEKEND15',
          validUntil: '2026-03-15',
          discount: 15,
          bg: 'bg-blue-50',
          icon: Tag,
          color: 'text-blue-600'
        },
        { 
          id: 3, 
          title: 'Birthday Bonus', 
          description: 'Double points this month', 
          code: 'BDAY2X',
          validUntil: '2026-03-31',
          discount: 0,
          bg: 'bg-pink-50',
          icon: Gift,
          color: 'text-pink-600'
        },
      ]);
      
      // Upcoming deals (mock)
      setUpcomingDeals([
        { day: 'Tomorrow', deal: 'Farm Fresh Friday', discount: '20% off produce' },
        { day: 'Mar 15', deal: 'Tech Tuesday', discount: 'Up to 30% off electronics' },
        { day: 'Mar 20', deal: 'Weekend Special', discount: 'Buy 1 Get 1 Free' },
      ]);
    } catch (err) {
      console.error('Failed to fetch dashboard data:', err);
    } finally {
      setOrdersLoading(false);
      setWishlistLoading(false);
      setRecsLoading(false);
      setLoyaltyPointsLoading(false);
    }
  };

  const fetchSellerApplication = async () => {
    try {
      setApplicationLoading(true);
      const apps = await SellerApplicationService.getMyApplications();
      setSellerApplication(apps.length > 0 ? apps[0] : null);
    } catch (err) {
      console.error('Failed to fetch seller application:', err);
      setSellerApplication(null);
    } finally {
      setApplicationLoading(false);
    }
  };

  // Derived stats
  const totalOrders = recentOrders.length;
  const totalWishlistItems = wishlist?.items.length || 0;
  const totalSpentThisMonth = recentOrders.reduce((sum, o) => sum + o.totalAmount, 0);
  const ordersThisMonth = recentOrders.length;
  const deliveredThisMonth = recentOrders.filter(o => o.status === 'delivered').length;

  // User info helpers
  const getDisplayName = () => {
    if (user?.fullName) return user.fullName;
    if (user?.email) return user.email.split('@')[0];
    if (user?.phone) return user.phone;
    return 'User';
  };

  const getMemberSince = () => {
    if (user?.createdAt) {
      return new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    }
    return '2026';
  };

  const isSeller = () => {
    const roles = user?.roles || [];
    return roles.includes('seller') || roles.includes('admin');
  };

  useEffect(() => {
    setIsSellerStatus(isSeller());
  }, [user]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-sky-500 animate-spin mx-auto mb-4" />
          <p className="text-sm text-slate-text">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const renderSellerSection = () => {
    // If already a seller, show seller info
    if (isSellerStatus) {
      return (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Store className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-base font-display font-semibold text-charcoal">
                  Seller Account Active
                </h3>
                <p className="text-sm text-slate-text">
                  Your seller account is verified and active
                </p>
              </div>
            </div>
            <Link
              to="/dashboard/products"
              className="bg-green-600 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-green-700 transition-colors whitespace-nowrap"
            >
              Start Selling →
            </Link>
          </div>
        </div>
      );
    }

    // If loading application status
    if (applicationLoading) {
      return (
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-xl p-5">
          <div className="flex items-center justify-center gap-3">
            <Loader2 className="w-5 h-5 text-gray-500 animate-spin" />
            <span className="text-sm text-slate-text">Checking application status...</span>
          </div>
        </div>
      );
    }

    // If user has an application
    if (sellerApplication) {
      const app = sellerApplication;
      const status = app.status;
      
      if (status === 'pending') {
        return (
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <h3 className="text-base font-display font-semibold text-charcoal">
                    Seller Application Under Review
                  </h3>
                  <p className="text-sm text-slate-text">
                    Your application for <strong>{app.businessName}</strong> is being reviewed
                  </p>
                  <p className="text-xs text-amber-700 mt-1">
                    Submitted on {new Date(app.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <Link
                to="/dashboard/seller-application"
                className="bg-amber-600 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-amber-700 transition-colors whitespace-nowrap"
              >
                View Details →
              </Link>
            </div>
          </div>
        );
      } else if (status === 'rejected') {
        return (
          <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-xl p-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <XCircle className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-base font-display font-semibold text-charcoal">
                    Seller Application Not Approved
                  </h3>
                  <p className="text-sm text-slate-text">
                    Your application for <strong>{app.businessName}</strong> was not approved.
                  </p>
                  {app.rejectionReason && (
                    <p className="text-xs text-red-700 mt-1">
                      Reason: {app.rejectionReason}
                    </p>
                  )}
                </div>
              </div>
              <Link
                to="/become-seller"
                className="bg-red-600 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-red-700 transition-colors whitespace-nowrap"
              >
                Reapply →
              </Link>
            </div>
          </div>
        );
      } else if (status === 'approved') {
        // This case might already be caught by sellerStatus, but just in case
        return (
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-5">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-base font-display font-semibold text-charcoal">
                    Seller Account Ready
                  </h3>
                  <p className="text-sm text-slate-text">
                    Congratulations! Your seller account is active.
                  </p>
                </div>
              </div>
              <Link
                to="/dashboard/seller"
                className="bg-green-600 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-green-700 transition-colors whitespace-nowrap"
              >
                Go to Seller Dashboard →
              </Link>
            </div>
          </div>
        );
      }
    }

    // Default: no application, not a seller
    return (
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-xl p-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <Store className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="text-base font-display font-semibold text-charcoal">
                Start selling on E-TALA
              </h3>
              <p className="text-sm text-slate-text">
                Reach thousands of customers in Tala and grow your business
              </p>
            </div>
          </div>
          <Link
            to="/become-seller"
            className="bg-purple-600 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-purple-700 transition-colors whitespace-nowrap"
          >
            Become a Seller →
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Welcome Header with Loyalty Points */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-charcoal">
            Welcome back, {getDisplayName()}! 👋
          </h1>
          <p className="text-slate-text mt-1 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Member since {getMemberSince()}
          </p>
          {user?.email && <p className="text-xs text-slate-text mt-0.5">{user.email}</p>}
          {user?.phone && !user?.email && <p className="text-xs text-slate-text mt-0.5">{user.phone}</p>}
        </div>
        
        {/* Loyalty Points Card */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl p-4 text-white min-w-[160px]">
          <div className="flex items-center gap-2 mb-1">
            <Star className="w-5 h-5 fill-white" />
            <span className="text-sm font-medium">Loyalty Points</span>
          </div>
          {loyaltyPointsLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              <p className="text-2xl font-bold">{loyaltyPoints} pts</p>
              <p className="text-xs text-white/80">Worth KSh {loyaltyPoints}</p>
              <div className="mt-2 h-1.5 bg-white/30 rounded-full overflow-hidden">
                <div className="h-full bg-white rounded-full" style={{ width: `${Math.min((loyaltyPoints / 2000) * 100, 100)}%` }} />
              </div>
              <p className="text-xs mt-1">{2000 - loyaltyPoints} pts to next reward</p>
            </>
          )}
        </div>
      </div>

      {/* Seller Section */}
      {renderSellerSection()}

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white rounded-xl p-4 border border-sky-100 shadow-sm">
          <div className="w-10 h-10 bg-blue-500 bg-opacity-10 rounded-lg flex items-center justify-center mb-2">
            <ShoppingBag className="w-5 h-5 text-blue-500" />
          </div>
          <p className="text-2xl font-bold text-charcoal">{totalOrders}</p>
          <p className="text-xs text-slate-text">Total Orders</p>
          <p className="text-[10px] text-green-600 mt-1">+{ordersThisMonth} this month</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-sky-100 shadow-sm">
          <div className="w-10 h-10 bg-red-500 bg-opacity-10 rounded-lg flex items-center justify-center mb-2">
            <Heart className="w-5 h-5 text-red-500" />
          </div>
          <p className="text-2xl font-bold text-charcoal">{totalWishlistItems}</p>
          <p className="text-xs text-slate-text">Wishlist</p>
          <p className="text-[10px] text-slate-text mt-1">Saved items</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-sky-100 shadow-sm">
          <div className="w-10 h-10 bg-green-500 bg-opacity-10 rounded-lg flex items-center justify-center mb-2">
            <MapPin className="w-5 h-5 text-green-500" />
          </div>
          <p className="text-2xl font-bold text-charcoal">1</p>
          <p className="text-xs text-slate-text">Saved Addresses</p>
          <p className="text-[10px] text-slate-text mt-1">Default: Tala</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-sky-100 shadow-sm">
          <div className="w-10 h-10 bg-purple-500 bg-opacity-10 rounded-lg flex items-center justify-center mb-2">
            <CreditCard className="w-5 h-5 text-purple-500" />
          </div>
          <p className="text-2xl font-bold text-charcoal">1</p>
          <p className="text-xs text-slate-text">Payment Methods</p>
          <p className="text-[10px] text-slate-text mt-1">M-Pesa</p>
        </div>
      </div>

      {/* Active Offers & Promos */}
      <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-5 border border-red-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-red-600" />
            <h2 className="text-lg font-display font-semibold text-charcoal">Active Offers & Promos</h2>
          </div>
          <Link to="/offers" className="text-sm text-red-600 hover:text-red-700 flex items-center gap-1">
            View All <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {activeOffers.map((offer) => {
            const Icon = offer.icon;
            return (
              <div key={offer.id} className={`${offer.bg} rounded-lg p-3`}>
                <div className="flex items-start justify-between mb-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${offer.bg}`}>
                    <Icon className={`w-4 h-4 ${offer.color}`} />
                  </div>
                  {offer.discount > 0 && (
                    <span className="bg-red-100 text-red-700 text-xs px-2 py-0.5 rounded-full">-{offer.discount}%</span>
                  )}
                </div>
                <h3 className="text-sm font-medium text-charcoal mb-1">{offer.title}</h3>
                <p className="text-xs text-slate-text mb-2">{offer.description}</p>
                {offer.code && (
                  <div className="bg-white rounded px-2 py-1 inline-block mb-2">
                    <code className="text-xs font-mono text-redbull-blue">{offer.code}</code>
                  </div>
                )}
                <p className="text-[10px] text-slate-text/70 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> Valid until {new Date(offer.validUntil).toLocaleDateString()}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Upcoming Deals */}
      <div className="bg-white rounded-xl border border-sky-100 p-5">
        <div className="flex items-center gap-2 mb-3">
          <Calendar className="w-5 h-5 text-redbull-blue" />
          <h2 className="text-lg font-display font-semibold text-charcoal">Upcoming Deals</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {upcomingDeals.map((deal, idx) => (
            <div key={idx} className="flex items-start gap-3 p-3 bg-sky-50/50 rounded-lg">
              <div className="w-8 h-8 bg-redbull-blue/10 rounded-full flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-redbull-blue" />
              </div>
              <div>
                <p className="text-xs font-medium text-redbull-blue">{deal.day}</p>
                <p className="text-sm font-medium text-charcoal">{deal.deal}</p>
                <p className="text-xs text-slate-text">{deal.discount}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Orders & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-xl border border-sky-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-display font-semibold text-charcoal">Recent Orders</h2>
            <Link to="/dashboard/orders" className="text-sm text-redbull-blue hover:underline flex items-center gap-1">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          {ordersLoading ? (
            <div className="flex justify-center py-8"><Loader2 className="w-6 h-6 animate-spin text-sky-500" /></div>
          ) : recentOrders.length === 0 ? (
            <p className="text-center text-slate-text py-8">No orders yet</p>
          ) : (
            <div className="space-y-3">
              {recentOrders.map((order) => (
                <Link key={order.id} to={`/dashboard/orders/${order.id}`} className="flex items-center justify-between p-3 bg-sky-50/50 rounded-lg hover:bg-sky-100/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <Package className="w-5 h-5 text-redbull-blue" />
                    <div>
                      <p className="text-sm font-medium text-charcoal">Order #{order.id.slice(-8)}</p>
                      <p className="text-xs text-slate-text">{new Date(order.createdAt).toLocaleDateString()} · {order.items.length} items · KSh {order.totalAmount}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                      order.status === 'shipped' ? 'bg-blue-100 text-blue-700' :
                      order.status === 'processing' ? 'bg-amber-100 text-amber-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {order.status}
                    </span>
                    <ChevronRight className="w-4 h-4 text-slate-text" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Recent Activity – simplified (notifications / order updates) */}
        <div className="bg-white rounded-xl border border-sky-100 p-5">
          <h2 className="text-lg font-display font-semibold text-charcoal mb-4">Recent Activity</h2>
          {wishlistLoading ? (
            <div className="flex justify-center py-8"><Loader2 className="w-6 h-6 animate-spin text-sky-500" /></div>
          ) : (
            <div className="space-y-3">
              {recentOrders.length > 0 && (
                <div className="flex items-center gap-3 p-2">
                  <div className="w-8 h-8 bg-sky-100 rounded-full flex items-center justify-center">
                    <Package className="w-4 h-4 text-redbull-blue" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-charcoal">Order #{recentOrders[0].id.slice(-8)} {recentOrders[0].status}</p>
                    <p className="text-xs text-slate-text">Recently</p>
                  </div>
                </div>
              )}
              {totalWishlistItems > 0 && (
                <div className="flex items-center gap-3 p-2">
                  <div className="w-8 h-8 bg-sky-100 rounded-full flex items-center justify-center">
                    <Heart className="w-4 h-4 text-redbull-blue" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-charcoal">{totalWishlistItems} items in wishlist</p>
                    <p className="text-xs text-slate-text">Saved for later</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Personalized Recommendations (based on wishlist or trending) */}
      <div className="bg-white rounded-xl border border-sky-100 p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-display font-semibold text-charcoal">Recommended for You</h2>
            <p className="text-xs text-slate-text">
              {wishlist && wishlist.items.length > 0 ? 'Based on your wishlist' : 'Trending now'}
            </p>
          </div>
          <Link to="/marketplace" className="text-sm text-redbull-blue hover:underline flex items-center gap-1">
            Browse More <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        {recsLoading ? (
          <div className="flex justify-center py-8"><Loader2 className="w-6 h-6 animate-spin text-sky-500" /></div>
        ) : recommendedProducts.length === 0 ? (
          <p className="text-center text-slate-text py-8">No recommendations available</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {recommendedProducts.map((product) => (
              <Link key={product.id} to={`/marketplace/product/${product.id}`} className="group">
                <div className="aspect-square bg-sky-100 rounded-lg mb-2 overflow-hidden relative">
                  <img src={product.images?.[0] || '/placeholder.png'} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  <div className="absolute top-1 right-1 bg-white/90 backdrop-blur-sm rounded-full px-1.5 py-0.5 text-xs flex items-center">
                    <Star className="w-3 h-3 text-yellow-500 fill-current mr-0.5" /> {product.rating || 0}
                  </div>
                </div>
                <h3 className="text-sm font-medium text-charcoal truncate">{product.name}</h3>
                <p className="text-xs text-slate-text">KSh {Number(product.price).toLocaleString()}</p>
                <p className="text-[10px] text-redbull-blue mt-1">Recommended</p>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Quick Stats & Insights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-sky-100 p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-green-600" />
            <span className="text-xs font-medium text-slate-text">Spending this month</span>
          </div>
          <p className="text-2xl font-bold text-charcoal">KSh {totalSpentThisMonth.toLocaleString()}</p>
          <p className="text-xs text-green-600">↑ {ordersThisMonth > 0 ? ordersThisMonth : 0} orders</p>
        </div>
        <div className="bg-white rounded-xl border border-sky-100 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Package className="w-4 h-4 text-blue-600" />
            <span className="text-xs font-medium text-slate-text">Orders this month</span>
          </div>
          <p className="text-2xl font-bold text-charcoal">{ordersThisMonth}</p>
          <p className="text-xs text-blue-600">{deliveredThisMonth} delivered, {ordersThisMonth - deliveredThisMonth} in progress</p>
        </div>
        <div className="bg-white rounded-xl border border-sky-100 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Wallet className="w-4 h-4 text-purple-600" />
            <span className="text-xs font-medium text-slate-text">Saved for later</span>
          </div>
          <p className="text-2xl font-bold text-charcoal">KSh {wishlist?.items.reduce((sum, i) => sum + i.price, 0).toLocaleString() || 0}</p>
          <p className="text-xs text-purple-600">{totalWishlistItems} items in wishlist</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;