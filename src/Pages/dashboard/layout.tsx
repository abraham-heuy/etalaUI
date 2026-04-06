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
  ShoppingCart
} from 'lucide-react';
import { useAuth } from '../../contexts/auth/auth';

const DashboardLayout: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isLoading, logout, isAuthenticated } = useAuth();

  // Check authentication on mount
  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      navigate('/sign-in');
    }
  }, [isAuthenticated, isLoading, navigate]);

  // Get user roles as array
  const getUserRoles = (): string[] => {
    if (!user) return [];
    
    const roles: string[] = [];
    
    // Add roles from array if exists
    if (user.roles && Array.isArray(user.roles)) {
      roles.push(...user.roles);
    } else if (user.roles && typeof user.roles === 'string') {
      roles.push(user.roles);
    }
    
    // Also check for role field for backward compatibility
    if (user.roles && typeof user.roles === 'string') {
      roles.push(user.roles);
    }
    
    // If no roles found, default to 'user'
    if (roles.length === 0) {
      roles.push('user');
    }
    
    return roles;
  };

  // Check if user is a seller
  const isSeller = () => {
    const roles = getUserRoles();
    return roles.includes('seller') || roles.includes('admin');
  };

  // Check if seller is verified (you can add this field to your user object later)
  const isSellerVerified = () => {
    // If you have a sellerVerified field, use it, otherwise just return isSeller()
    return isSeller();
  };

  // Get user's display name
  const getDisplayName = () => {
    if (user?.fullName) return user.fullName;
    if (user?.email) return user.email.split('@')[0];
    if (user?.phone) return user.phone;
    return 'User';
  };

  // Get user's avatar initials
  const getInitials = () => {
    const name = getDisplayName();
    return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
  };

  // Main navigation items (always visible)
  const mainNavItems = [
    { path: '/dashboard/overview', name: 'Overview', icon: Home },
    { path: '/dashboard/orders', name: 'Orders', icon: ShoppingBag },
    {path: '/dashboard/cart', name : 'Cart', icon: ShoppingCart},
    { path: '/dashboard/wishlist', name: 'Wishlist', icon: Heart },
    { path: '/dashboard/addresses', name: 'Addresses', icon: MapPin },
  ];

  // Seller tools (only shown if user is seller)
  const sellerNavItems = [
    { path: '/dashboard/products', name: 'My Products', icon: Package },
    { path: '/dashboard/sales', name: 'Sales', icon: TrendingUp },
    { path: '/dashboard/earnings', name: 'Earnings', icon: DollarSign },
    { path: '/dashboard/reviews', name: 'Reviews', icon: Star },
    { path: '/dashboard/messages', name: 'Messages', icon: MessageCircle },
  ];

  // Bottom section items (always visible)
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

  // Show loading state
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

  // If not authenticated after loading, don't render (will redirect via useEffect)
  if (!isAuthenticated) {
    return null;
  }

  const sellerStatus = isSeller();
  const sellerVerified = isSellerVerified();

  return (
    <div className="min-h-screen bg-soft-white">
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-sky-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <span className="text-xl font-display font-bold text-redbull-blue">E-TALA</span>
            </Link>

            {/* Desktop Right Side */}
            <div className="hidden md:flex items-center gap-4">
              <Link to="/marketplace" className="text-sm text-slate-text hover:text-redbull-blue transition-colors">
                Back to Shopping
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-text hover:bg-sky-50 transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-white pt-16 md:hidden overflow-y-auto">
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
                      className={`flex items-center justify-between w-full px-4 py-3 rounded-xl transition-colors mb-1 ${
                        active
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

              {/* Seller Tools (if seller) */}
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
                        className={`flex items-center justify-between w-full px-4 py-3 rounded-xl transition-colors mb-1 ${
                          active
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
                      className={`flex items-center justify-between w-full px-4 py-3 rounded-xl transition-colors mb-1 ${
                        active
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

      {/* Desktop Side Navigation */}
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
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
                      active
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

          {/* Seller Tools (only if seller) */}
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
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
                        active
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

          {/* Spacer */}
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
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
                      active
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

            {/* Logout */}
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