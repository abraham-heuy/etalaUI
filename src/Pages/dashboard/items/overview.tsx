// pages/dashboard/overview.tsx
import React from 'react';
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
  Eye
} from 'lucide-react';

const DashboardOverview: React.FC = () => {
  // Mock data - replace with real data from API
  const recentOrders = [
    { id: '1234', date: '2026-03-10', total: 2450, status: 'delivered', items: 3 },
    { id: '1235', date: '2026-03-08', total: 5670, status: 'shipped', items: 2 },
    { id: '1236', date: '2026-03-05', total: 1890, status: 'processing', items: 1 },
    { id: '1237', date: '2026-03-03', total: 3240, status: 'delivered', items: 4 },
  ];

  const stats = [
    { label: 'Total Orders', value: '12', icon: ShoppingBag, color: 'bg-blue-500', change: '+2 this month' },
    { label: 'Wishlist', value: '8', icon: Heart, color: 'bg-red-500', change: '3 new items' },
    { label: 'Saved Addresses', value: '2', icon: MapPin, color: 'bg-green-500', change: '1 default' },
    { label: 'Payment Methods', value: '2', icon: CreditCard, color: 'bg-purple-500', change: 'Visa ••4242' },
  ];

  // Mock user data
  const user = {
    name: 'John Doe',
    email: 'john@example.com',
    memberSince: 'Jan 2026',
    isSeller: false, // Change to true to test seller view
    loyaltyPoints: 1250,
    pointsValue: 1250, // 1 point = KSh 1
    nextReward: 2000,
  };

  // Active promos and offers
  const activeOffers = [
    { 
      id: 1, 
      title: 'Free Delivery', 
      description: 'On orders over KSh 1,000', 
      code: 'FREESHIP',
      validUntil: '2026-03-31',
      discount: 0,
      type: 'shipping',
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
      type: 'discount',
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
      type: 'points',
      bg: 'bg-pink-50',
      icon: Gift,
      color: 'text-pink-600'
    },
  ];

  // Upcoming deals
  const upcomingDeals = [
    { day: 'Tomorrow', deal: 'Farm Fresh Friday', discount: '20% off produce' },
    { day: 'Mar 15', deal: 'Tech Tuesday', discount: 'Up to 30% off electronics' },
    { day: 'Mar 20', deal: 'Weekend Special', discount: 'Buy 1 Get 1 Free' },
  ];

  // Recent activity
  const recentActivity = [
    { action: 'Order #1234 delivered', time: '2 hours ago', icon: Package },
    { action: 'Added item to wishlist', time: '5 hours ago', icon: Heart },
    { action: 'Earned 50 loyalty points', time: '1 day ago', icon: Star },
    { action: 'Viewed 3 products', time: '2 days ago', icon: Eye },
  ];

  // Recommended products (personalized)
  const recommendedProducts = [
    { id: 1, name: 'iPhone 13 Pro', price: 145000, image: 'https://images.unsplash.com/photo-1632661674596-df8be6a1c9e1?w=150&h=150&fit=crop', rating: 4.8, reason: 'Based on your browsing' },
    { id: 2, name: 'Leather Jacket', price: 6500, image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=150&h=150&fit=crop', rating: 4.5, reason: 'Trending in fashion' },
    { id: 3, name: 'Fresh Eggs (Tray)', price: 450, image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=150&h=150&fit=crop', rating: 4.9, reason: 'From your favorite farmer' },
    { id: 4, name: 'Wireless Headphones', price: 3500, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=150&h=150&fit=crop', rating: 4.6, reason: 'Recommended for you' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Header with Loyalty Points */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-charcoal">
            Welcome back, {user.name}! 👋
          </h1>
          <p className="text-slate-text mt-1 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Member since {user.memberSince}
          </p>
        </div>
        
        {/* Loyalty Points Card */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl p-4 text-white">
          <div className="flex items-center gap-2 mb-1">
            <Star className="w-5 h-5 fill-white" />
            <span className="text-sm font-medium">Loyalty Points</span>
          </div>
          <p className="text-2xl font-bold">{user.loyaltyPoints} pts</p>
          <p className="text-xs text-white/80">Worth KSh {user.pointsValue}</p>
          <div className="mt-2 h-1.5 bg-white/30 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white rounded-full"
              style={{ width: `${(user.loyaltyPoints / user.nextReward) * 100}%` }}
            />
          </div>
          <p className="text-xs mt-1">{user.nextReward - user.loyaltyPoints} pts to next reward</p>
        </div>
      </div>

      {/* Become a Seller CTA (if buyer only) */}
      {!user.isSeller && (
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
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white rounded-xl p-4 border border-sky-100 shadow-sm hover:shadow-md transition-shadow">
              <div className={`w-10 h-10 ${stat.color} bg-opacity-10 rounded-lg flex items-center justify-center mb-2`}>
                <Icon className={`w-5 h-5 ${stat.color.replace('bg-', 'text-')}`} />
              </div>
              <p className="text-2xl font-bold text-charcoal">{stat.value}</p>
              <p className="text-xs text-slate-text">{stat.label}</p>
              <p className="text-[10px] text-green-600 mt-1">{stat.change}</p>
            </div>
          );
        })}
      </div>

      {/* Active Offers & Promos */}
      <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-5 border border-red-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-red-600" />
            <h2 className="text-lg font-display font-semibold text-charcoal">
              Active Offers & Promos
            </h2>
          </div>
          <Link to="/offers" className="text-sm text-red-600 hover:text-red-700 flex items-center gap-1">
            View All
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {activeOffers.map((offer) => {
            const Icon = offer.icon;
            return (
              <div key={offer.id} className={`${offer.bg} rounded-lg p-3 border border-${offer.color.replace('text-', '')}/20`}>
                <div className="flex items-start justify-between mb-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${offer.bg}`}>
                    <Icon className={`w-4 h-4 ${offer.color}`} />
                  </div>
                  {offer.discount > 0 && (
                    <span className="bg-red-100 text-red-700 text-xs px-2 py-0.5 rounded-full">
                      -{offer.discount}%
                    </span>
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
                  <Clock className="w-3 h-3" />
                  Valid until {new Date(offer.validUntil).toLocaleDateString()}
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
          <h2 className="text-lg font-display font-semibold text-charcoal">
            Upcoming Deals
          </h2>
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
            <h2 className="text-lg font-display font-semibold text-charcoal">
              Recent Orders
            </h2>
            <Link to="/dashboard/orders" className="text-sm text-redbull-blue hover:underline flex items-center gap-1">
              View All
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="space-y-3">
            {recentOrders.slice(0, 3).map((order) => (
              <Link
                key={order.id}
                to={`/dashboard/orders/${order.id}`}
                className="flex items-center justify-between p-3 bg-sky-50/50 rounded-lg hover:bg-sky-100/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Package className="w-5 h-5 text-redbull-blue" />
                  <div>
                    <p className="text-sm font-medium text-charcoal">Order #{order.id}</p>
                    <p className="text-xs text-slate-text">{order.date} · {order.items} items · KSh {order.total}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                    order.status === 'shipped' ? 'bg-blue-100 text-blue-700' :
                    'bg-amber-100 text-amber-700'
                  }`}>
                    {order.status}
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-text" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl border border-sky-100 p-5">
          <h2 className="text-lg font-display font-semibold text-charcoal mb-4">
            Recent Activity
          </h2>
          <div className="space-y-3">
            {recentActivity.map((activity, idx) => {
              const Icon = activity.icon;
              return (
                <div key={idx} className="flex items-center gap-3 p-2">
                  <div className="w-8 h-8 bg-sky-100 rounded-full flex items-center justify-center">
                    <Icon className="w-4 h-4 text-redbull-blue" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-charcoal">{activity.action}</p>
                    <p className="text-xs text-slate-text">{activity.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Personalized Recommendations */}
      <div className="bg-white rounded-xl border border-sky-100 p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-display font-semibold text-charcoal">
              Recommended for You
            </h2>
            <p className="text-xs text-slate-text">Based on your browsing history</p>
          </div>
          <Link to="/marketplace" className="text-sm text-redbull-blue hover:underline flex items-center gap-1">
            Browse More
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {recommendedProducts.map((product) => (
            <Link key={product.id} to={`/marketplace/product/${product.id}`} className="group">
              <div className="aspect-square bg-sky-100 rounded-lg mb-2 overflow-hidden relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute top-1 right-1 bg-white/90 backdrop-blur-sm rounded-full px-1.5 py-0.5 text-xs flex items-center">
                  <Star className="w-3 h-3 text-yellow-500 fill-current mr-0.5" />
                  {product.rating}
                </div>
              </div>
              <h3 className="text-sm font-medium text-charcoal truncate">{product.name}</h3>
              <p className="text-xs text-slate-text">KSh {product.price.toLocaleString()}</p>
              <p className="text-[10px] text-redbull-blue mt-1">{product.reason}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Quick Stats & Insights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-sky-100 p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-green-600" />
            <span className="text-xs font-medium text-slate-text">Spending this month</span>
          </div>
          <p className="text-2xl font-bold text-charcoal">KSh 12,450</p>
          <p className="text-xs text-green-600">↑ 23% from last month</p>
        </div>

        <div className="bg-white rounded-xl border border-sky-100 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Package className="w-4 h-4 text-blue-600" />
            <span className="text-xs font-medium text-slate-text">Orders this month</span>
          </div>
          <p className="text-2xl font-bold text-charcoal">8</p>
          <p className="text-xs text-blue-600">3 in progress, 5 delivered</p>
        </div>

        <div className="bg-white rounded-xl border border-sky-100 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Wallet className="w-4 h-4 text-purple-600" />
            <span className="text-xs font-medium text-slate-text">Saved for later</span>
          </div>
          <p className="text-2xl font-bold text-charcoal">KSh 23,450</p>
          <p className="text-xs text-purple-600">8 items in wishlist</p>
        </div>
      </div>

      {/* Seller CTA (if buyer) - Alternative style */}
      {!user.isSeller && (
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-200 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-display font-semibold text-charcoal mb-1">
                Ready to start selling?
              </h3>
              <p className="text-sm text-slate-text">
                Join hundreds of local sellers and grow your business with E-TALA
              </p>
              <div className="flex flex-wrap gap-3 mt-3 justify-center sm:justify-start">
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                  ✓ No monthly fees
                </span>
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                  ✓ Reach 5,000+ customers
                </span>
                <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                  ✓ Verified seller badge
                </span>
              </div>
            </div>
            <Link
              to="/become-seller"
              className="bg-indigo-600 text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-indigo-700 transition-colors shadow-lg whitespace-nowrap"
            >
              Become a Seller Today
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardOverview;