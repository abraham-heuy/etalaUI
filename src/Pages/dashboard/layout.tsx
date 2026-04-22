// pages/dashboard/Layout.tsx
import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Menu,
  X,
  Home,
  ShoppingBag,
  Heart,
  MapPin,
  CreditCard,
  Settings,
  LogOut,
  ChevronRight,
  Store,
  Package,
  Star,
  DollarSign,
  Shield,
  MessageCircle,
  TrendingUp,
  Loader2,
  ShoppingCart,
  Bell,
  CheckCircle,
  MailOpen
} from 'lucide-react';
import { useAuth } from '../../contexts/auth/auth';
import { CommerceService, type Notification } from '../../services/commerce/commerce.service';

const DashboardLayout: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isLoading, logout, isAuthenticated } = useAuth();

  // ==================== Notification State ====================
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isLoadingNotifications, setIsLoadingNotifications] = useState(false);

  // Check authentication on mount
  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      navigate('/sign-in');
    }
  }, [isAuthenticated, isLoading, navigate]);

  // Load unread count on mount and periodically (optional)
  useEffect(() => {
    if (isAuthenticated) {
      fetchUnreadCount();
      // Optional: poll every 30 seconds
      const interval = setInterval(fetchUnreadCount, 30000);
      return () => clearInterval(interval);
    }
  }, [isAuthenticated]);

  const fetchUnreadCount = async () => {
    try {
      const count = await CommerceService.getUnreadCount();
      setUnreadCount(count);
    } catch (error) {
      console.error('Failed to fetch unread count', error);
    }
  };

  const fetchNotifications = async () => {
    setIsLoadingNotifications(true);
    try {
      const data = await CommerceService.getNotifications();
      setNotifications(data);
      // Update unread count after fetching
      const count = data.filter(n => !n.isRead).length;
      setUnreadCount(count);
    } catch (error) {
      console.error('Failed to fetch notifications', error);
    } finally {
      setIsLoadingNotifications(false);
    }
  };

  // When modal opens, mark all as read (optional) and fetch latest
  const openNotificationsModal = async () => {
    setIsNotificationsOpen(true);
    await fetchNotifications();
    // Option A: mark all as read as soon as modal opens
    // (user requirement: "when opened we mark them as read")
    try {
      await CommerceService.markAllNotificationsAsRead();
      setUnreadCount(0);
      // Refresh list to update isRead flags
      await fetchNotifications();
    } catch (error) {
      console.error('Failed to mark all as read', error);
    }
  };

  const closeNotificationsModal = () => {
    setIsNotificationsOpen(false);
  };

  // Mark a single notification as read (if you prefer per-item)
  const markAsRead = async (id: string) => {
    try {
      await CommerceService.markNotificationAsRead(id);
      // Update local state
      setNotifications(prev =>
        prev.map(n => (n.id === id ? { ...n, isRead: true } : n))
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (error) {
      console.error('Failed to mark as read', error);
    }
  };

  // Get user roles as array (unchanged)
  const getUserRoles = (): string[] => {
    if (!user) return [];
    const roles: string[] = [];
    if (user.roles && Array.isArray(user.roles)) {
      roles.push(...user.roles);
    } else if (user.roles && typeof user.roles === 'string') {
      roles.push(user.roles);
    }
    if (roles.length === 0) roles.push('user');
    return roles;
  };

  const isSeller = () => {
    const roles = getUserRoles();
    return roles.includes('seller') || roles.includes('admin');
  };

  const isSellerVerified = () => isSeller();

  const getDisplayName = () => {
    if (user?.fullName) return user.fullName;
    if (user?.email) return user.email.split('@')[0];
    if (user?.phone) return user.phone;
    return 'User';
  };

  const getInitials = () => {
    const name = getDisplayName();
    return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
  };

  // Navigation items (unchanged)
  const mainNavItems = [
    { path: '/dashboard/overview', name: 'Overview', icon: Home },
    { path: '/dashboard/orders', name: 'Orders', icon: ShoppingBag },
    { path: '/dashboard/cart', name: 'Cart', icon: ShoppingCart },
    { path: '/dashboard/wishlist', name: 'Wishlist', icon: Heart },
    { path: '/dashboard/addresses', name: 'Addresses', icon: MapPin },

  ];

  const sellerNavItems = [
    { path: '/dashboard/products', name: 'My Products', icon: Package },
    { path: '/dashboard/sales', name: 'Sales', icon: TrendingUp },
    { path: '/dashboard/earnings', name: 'Earnings', icon: DollarSign },
    { path: '/dashboard/reviews', name: 'Reviews', icon: Star },
    { path: '/dashboard/messages', name: 'Messages', icon: MessageCircle },
  ];

  const bottomNavItems = [
    { path: '/dashboard/payments', name: 'Payments', icon: CreditCard },
    { path: '/dashboard/settings', name: 'Settings', icon: Settings },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-soft-white to-warm-gray">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-sky-500 animate-spin mx-auto mb-4" />
          <p className="text-sm text-slate-text">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  const sellerStatus = isSeller();
  const sellerVerified = isSellerVerified();

  return (
    <div className="min-h-screen bg-soft-white">
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-sky-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="relative flex items-center justify-between h-16">
            {/* Left: Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center gap-2">
                <span className="text-xl font-display font-bold text-redbull-blue">E-TALA</span>
              </Link>
            </div>

            {/* Center: Back to Shopping (with blinking dot) */}
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <Link
                to="/back-to-shopping"
                className="relative flex items-center gap-1 sm:gap-2 text-sm text-slate-text hover:text-sky-600 transition-colors group"
              >
                {/* Blinking dot indicator */}
                <span className="absolute -top-1 -right-1 sm:-top-1.5 sm:-right-1.5 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
                </span>
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Back to Shopping</span>
              </Link>
            </div>

            {/* Right side (desktop) */}
            <div className="hidden md:flex items-center gap-4">
              {/* Notification Bell */}
              <button
                onClick={openNotificationsModal}
                className="relative p-2 rounded-lg text-slate-text hover:bg-sky-50 transition-colors"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-sm">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>

            {/* Mobile right side: Notification bell + Menu button */}
            <div className="flex items-center gap-2 md:hidden">
              <button
                onClick={openNotificationsModal}
                className="relative p-2 rounded-lg text-slate-text hover:bg-sky-50 transition-colors"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-sm">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg text-slate-text hover:bg-sky-50 transition-colors"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>
      {/* ==================== NOTIFICATION MODAL ==================== */}
      {isNotificationsOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm transition-all duration-300"
          onClick={closeNotificationsModal}
        >
          <div
            className={`
              bg-white w-full sm:max-w-lg sm:rounded-2xl shadow-xl 
              transform transition-all duration-300 ease-out
              ${isNotificationsOpen ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}
              sm:translate-y-0 sm:scale-100
              max-h-[90vh] overflow-hidden
            `}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-sky-100">
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-redbull-blue" />
                <h3 className="text-lg font-semibold text-charcoal">Notifications</h3>
                {unreadCount > 0 && (
                  <span className="bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded-full">
                    {unreadCount} unread
                  </span>
                )}
              </div>
              <button
                onClick={closeNotificationsModal}
                className="p-1 rounded-full text-slate-text hover:bg-sky-50 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="overflow-y-auto max-h-[calc(90vh-70px)]">
              {isLoadingNotifications ? (
                <div className="flex justify-center items-center py-12">
                  <Loader2 className="w-6 h-6 text-sky-500 animate-spin" />
                </div>
              ) : notifications.length === 0 ? (
                <div className="text-center py-12 text-slate-text">
                  <MailOpen className="w-12 h-12 mx-auto mb-3 opacity-40" />
                  <p>No notifications yet</p>
                </div>
              ) : (
                <div className="divide-y divide-sky-50">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`p-4 transition-all duration-200 ${!notif.isRead ? 'bg-sky-50/50' : 'bg-white'
                        } hover:bg-sky-50/30`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-charcoal">{notif.title}</h4>
                          <p className="text-sm text-slate-text mt-1">{notif.message}</p>
                          <span className="text-xs text-slate-text/60 mt-2 block">
                            {new Date(notif.createdAt).toLocaleString()}
                          </span>
                        </div>
                        {!notif.isRead && (
                          <button
                            onClick={() => markAsRead(notif.id)}
                            className="p-1 text-sky-500 hover:text-sky-600 transition-colors"
                            title="Mark as read"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer with Mark All Read */}
            {notifications.length > 0 && unreadCount > 0 && (
              <div className="p-3 border-t border-sky-100 bg-gray-50">
                <button
                  onClick={async () => {
                    try {
                      await CommerceService.markAllNotificationsAsRead();
                      setUnreadCount(0);
                      await fetchNotifications();
                    } catch (error) {
                      console.error(error);
                    }
                  }}
                  className="w-full text-center text-sm text-sky-600 hover:text-sky-700 font-medium py-2 transition-colors"
                >
                  Mark all as read
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Rest of your existing layout (mobile menu, sidebar, main content) remains unchanged */}
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-white pt-16 md:hidden overflow-y-auto">
          {/* ... your existing mobile menu code ... */}
          {/* Make sure to keep everything exactly as you had it */}
          <div className="flex flex-col items-center py-8 px-4">
            <div className="w-full max-w-xs space-y-2">
              {/* User info */}
              <div className="flex items-center gap-3 p-4 bg-sky-50 rounded-xl mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center text-white font-semibold">
                  {getInitials()}
                </div>
                <div className="flex-1">
                  <p className="text-base font-medium text-charcoal">{getDisplayName()}</p>
                  <p className="text-xs text-slate-text truncate">
                    {user?.email || user?.phone}
                  </p>
                  {sellerStatus && sellerVerified && (
                    <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full inline-flex items-center gap-1 mt-1">
                      <Shield className="w-3 h-3" />
                      Verified Seller
                    </span>
                  )}
                </div>
              </div>

              {/* Main Navigation */}
              <div className="mb-2">
                <h4 className="text-xs font-medium text-slate-text/60 uppercase tracking-wider px-4 mb-2">
                  Dashboard
                </h4>
                {mainNavItems.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.path);
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center justify-between w-full px-4 py-3 rounded-xl transition-colors mb-1 ${active
                        ? 'bg-redbull-blue text-white'
                        : 'text-slate-text hover:bg-sky-50'
                        }`}
                    >
                      <span className="flex items-center gap-3">
                        <Icon className="w-5 h-5" />
                        {item.name}
                      </span>
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  );
                })}
              </div>

              {/* Seller Tools */}
              {sellerStatus && (
                <div className="mb-2 pt-2">
                  <h4 className="text-xs font-medium text-slate-text/60 uppercase tracking-wider px-4 mb-2 flex items-center gap-1">
                    <Store className="w-3 h-3" />
                    Seller Tools
                  </h4>
                  {sellerNavItems.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.path);
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center justify-between w-full px-4 py-3 rounded-xl transition-colors mb-1 ${active
                          ? 'bg-redbull-blue text-white'
                          : 'text-slate-text hover:bg-sky-50'
                          }`}
                      >
                        <span className="flex items-center gap-3">
                          <Icon className="w-5 h-5" />
                          {item.name}
                        </span>
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    );
                  })}
                </div>
              )}

              {/* Account Settings */}
              <div className="pt-2">
                <h4 className="text-xs font-medium text-slate-text/60 uppercase tracking-wider px-4 mb-2">
                  Account
                </h4>
                {bottomNavItems.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.path);
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center justify-between w-full px-4 py-3 rounded-xl transition-colors mb-1 ${active
                        ? 'bg-redbull-blue text-white'
                        : 'text-slate-text hover:bg-sky-50'
                        }`}
                    >
                      <span className="flex items-center gap-3">
                        <Icon className="w-5 h-5" />
                        {item.name}
                      </span>
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  );
                })}
              </div>

              {/* Back to Shopping & Logout */}
              <div className="pt-4 mt-4 border-t border-sky-100">
                <Link
                  to="/marketplace"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between w-full px-4 py-3 rounded-xl text-slate-text hover:bg-sky-50 transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <ShoppingBag className="w-5 h-5" />
                    Back to Shopping
                  </span>
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-between w-full px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <LogOut className="w-5 h-5" />
                    Sign Out
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Side Navigation (unchanged) */}
      <div className="hidden md:block fixed left-0 top-16 bottom-0 w-64 bg-white border-r border-sky-100 p-4 overflow-y-auto">
        <div className="flex flex-col h-full">
          {/* User Info */}
          <div className="mb-6 p-3 bg-sky-50 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center text-white font-semibold text-sm">
                {getInitials()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-charcoal truncate">{getDisplayName()}</p>
                <p className="text-xs text-slate-text truncate">
                  {user?.email || user?.phone}
                </p>
              </div>
            </div>
            {sellerStatus && sellerVerified && (
              <div className="mt-2 flex items-center gap-1 text-[10px] bg-green-100 text-green-700 px-2 py-1 rounded-full w-fit">
                <Shield className="w-3 h-3" />
                Verified Seller
              </div>
            )}
          </div>

          {/* Main Navigation */}
          <div className="mb-4">
            <h4 className="text-xs font-medium text-slate-text/60 uppercase tracking-wider px-3 mb-2">
              Dashboard
            </h4>
            <div className="space-y-1">
              {mainNavItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${active
                      ? 'bg-redbull-blue text-white'
                      : 'text-slate-text hover:bg-sky-50'
                      }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-sm">{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Seller Tools */}
          {sellerStatus && (
            <div className="mb-4">
              <h4 className="text-xs font-medium text-slate-text/60 uppercase tracking-wider px-3 mb-2 flex items-center gap-1">
                <Store className="w-3 h-3" />
                Seller Tools
              </h4>
              <div className="space-y-1">
                {sellerNavItems.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.path);
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${active
                        ? 'bg-redbull-blue text-white'
                        : 'text-slate-text hover:bg-sky-50'
                        }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-sm">{item.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          <div className="flex-1" />

          {/* Account Settings */}
          <div className="pt-4 border-t border-sky-100">
            <div className="space-y-1">
              {bottomNavItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${active
                      ? 'bg-redbull-blue text-white'
                      : 'text-slate-text hover:bg-sky-50'
                      }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-sm">{item.name}</span>
                  </Link>
                );
              })}
            </div>

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2.5 mt-2 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="pt-16 md:pl-64 min-h-screen">
        <div className="p-4 sm:p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;