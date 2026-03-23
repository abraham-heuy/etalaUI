// pages/admin/Layout.tsx
import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Menu, 
  X, 
  Home,
  Users,
  Ticket,
  ShoppingBag,
  Truck,
  UserX,
  Gamepad2,
  Percent,
  ShieldCheck,
  BarChart3,
  Settings,
  LogOut,
  ChevronRight,
  User,
  Store,
  AlertCircle,
  Clock,
  CreditCard} from 'lucide-react';

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'super_admin' | 'admin' | 'moderator';
  avatar?: string;
}

const AdminLayout: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Mock admin data - replace with real auth context
  const admin: AdminUser = {
    id: '1',
    name: 'Admin User',
    email: 'admin@etala.com',
    role: 'super_admin',
  };

  // Main navigation items
  const mainNavItems = [
    { path: '/admin/overview', name: 'Overview', icon: Home, description: 'Dashboard & Analytics' },
    { path: '/admin/users', name: 'User Management', icon: Users, description: 'Manage users & accounts' },
    { path: '/admin/support', name: 'Support Tickets', icon: Ticket, description: 'Customer support' },
    { path: '/admin/orders', name: 'Order Management', icon: ShoppingBag, description: 'Track orders' },
    { path: '/admin/payments', name: 'Payment Summary', icon: CreditCard, description: 'Transaction overview' },
  ];

  // Seller & Delivery Management
  const sellerNavItems = [
    { path: '/admin/sellers', name: 'Seller Approvals', icon: Store, description: 'Verify seller accounts' },
    { path: '/admin/delivery', name: 'Delivery Management', icon: Truck, description: 'Track deliveries' },
    { path: '/admin/seller-verification', name: 'Verification Queue', icon: ShieldCheck, description: 'Pending verifications' },
  ];

  // Account Management
  const accountNavItems = [
    { path: '/admin/account-actions', name: 'Account Actions', icon: UserX, description: 'Activate/Deactivate' },
    { path: '/admin/suspensions', name: 'Suspended Accounts', icon: AlertCircle, description: 'Review suspensions' },
    { path: '/admin/activity-logs', name: 'Activity Logs', icon: Clock, description: 'Audit trail' },
  ];

  // Promotions & Games
  const promotionsNavItems = [
    { path: '/admin/discounts', name: 'Discount Offers', icon: Percent, description: 'Manage promotions' },
    { path: '/admin/games', name: 'Games & Rewards', icon: Gamepad2, description: 'Gamification' },
  ];

  // Analytics & Settings
  const settingsNavItems = [
    { path: '/admin/analytics', name: 'Analytics', icon: BarChart3, description: 'Platform insights' },
    { path: '/admin/settings', name: 'Settings', icon: Settings, description: 'Platform settings' },
    { path: '/admin/profile', name: 'Admin Profile', icon: User, description: 'Your account' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem('admin');
    navigate('/admin/login');
  };

  // Helper to render navigation section
  const renderNavSection = (title: string, items: any[], icon?: any) => (
    <div className="mb-6">
      <h4 className="text-xs font-medium text-slate-text/60 uppercase tracking-wider px-3 mb-2 flex items-center gap-1">
        {icon && <icon className="w-3 h-3" />}
        {title}
      </h4>
      <div className="space-y-1">
        {items.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`group flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200 ${
                active
                  ? 'bg-redbull-blue text-white shadow-sm'
                  : 'text-slate-text hover:bg-sky-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-5 h-5 ${active ? 'text-white' : 'text-slate-text/70'}`} />
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{item.name}</span>
                  <span className={`text-xs ${active ? 'text-white/80' : 'text-slate-text/50'}`}>
                    {item.description}
                  </span>
                </div>
              </div>
              <ChevronRight className={`w-4 h-4 transition-transform group-hover:translate-x-0.5 ${
                active ? 'text-white' : 'text-slate-text/40'
              }`} />
            </Link>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-soft-white">
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-sky-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo with Admin Badge */}
            <Link to="/admin" className="flex items-center gap-2">
              <span className="text-xl font-display font-bold text-redbull-blue">E-TALA</span>
              <span className="px-2 py-0.5 text-xs font-medium bg-redbull-blue text-white rounded-full">
                Admin
              </span>
            </Link>

            {/* Desktop Right Side */}
            <div className="hidden md:flex items-center gap-4">
              {/* Quick Stats */}
              <div className="flex items-center gap-3 px-3 py-1.5 bg-sky-50 rounded-lg">
                <div className="text-center">
                  <p className="text-xs text-slate-text">Active Users</p>
                  <p className="text-sm font-bold text-redbull-blue">1,234</p>
                </div>
                <div className="w-px h-6 bg-sky-200" />
                <div className="text-center">
                  <p className="text-xs text-slate-text">Pending Orders</p>
                  <p className="text-sm font-bold text-orange-500">23</p>
                </div>
                <div className="w-px h-6 bg-sky-200" />
                <div className="text-center">
                  <p className="text-xs text-slate-text">Support Tickets</p>
                  <p className="text-sm font-bold text-red-500">12</p>
                </div>
              </div>

              {/* Admin Info */}
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-charcoal">{admin.name}</p>
                  <p className="text-xs text-slate-text capitalize">{admin.role.replace('_', ' ')}</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-redbull-blue-light flex items-center justify-center">
                  <User className="w-4 h-4 text-redbull-blue" />
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-text hover:bg-sky-50"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-white pt-16 md:hidden overflow-y-auto">
          <div className="flex flex-col py-8 px-4">
            <div className="w-full max-w-xs mx-auto space-y-2">
              {/* Admin Info */}
              <div className="flex items-center gap-3 p-4 bg-sky-50 rounded-xl mb-4">
                <div className="w-12 h-12 rounded-full bg-redbull-blue-light flex items-center justify-center">
                  <User className="w-6 h-6 text-redbull-blue" />
                </div>
                <div>
                  <p className="text-base font-medium text-charcoal">{admin.name}</p>
                  <p className="text-xs text-slate-text">{admin.email}</p>
                  <span className="text-[10px] bg-redbull-blue text-white px-2 py-0.5 rounded-full inline-block mt-1">
                    {admin.role.replace('_', ' ')}
                  </span>
                </div>
              </div>

              {/* All Navigation Sections */}
              {renderNavSection('Dashboard', mainNavItems)}
              {renderNavSection('Seller & Delivery', sellerNavItems)}
              {renderNavSection('Account Management', accountNavItems)}
              {renderNavSection('Promotions', promotionsNavItems)}
              {renderNavSection('Administration', settingsNavItems)}
              
              {/* Logout Button */}
              <div className="pt-4 mt-4 border-t border-sky-100">
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-red-600 hover:bg-red-50"
                >
                  <LogOut className="w-5 h-5" />
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Side Navigation */}
      <div className="hidden md:block fixed left-0 top-16 bottom-0 w-72 bg-white border-r border-sky-100 p-4 overflow-y-auto">
        <div className="flex flex-col h-full">
          {/* Admin Info Card */}
          <div className="mb-6 p-4 bg-gradient-to-br from-redbull-blue-light to-sky-50 rounded-xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-full bg-redbull-blue flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-charcoal">{admin.name}</p>
                <p className="text-xs text-slate-text truncate">{admin.email}</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium px-2 py-1 bg-redbull-blue text-white rounded-full">
                {admin.role.replace('_', ' ')}
              </span>
              <span className="text-xs text-slate-text">Admin since 2024</span>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex-1">
            {renderNavSection('Dashboard', mainNavItems)}
            {renderNavSection('Seller & Delivery', sellerNavItems)}
            {renderNavSection('Account Management', accountNavItems)}
            {renderNavSection('Promotions', promotionsNavItems)}
            {renderNavSection('Administration', settingsNavItems)}
          </div>

          {/* Footer */}
          <div className="pt-4 mt-4 border-t border-sky-100">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
            <p className="text-xs text-slate-text/50 text-center mt-4">
              E-TALA Admin v1.0
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="pt-16 md:pl-72 min-h-screen">
        <div className="p-4 sm:p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;