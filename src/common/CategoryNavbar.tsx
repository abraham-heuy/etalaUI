// components/common/CategoryNavbar.tsx
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, LogIn, UserPlus, User, LogOut, ShoppingCart,
  Heart, Home, LayoutDashboard, Package
} from 'lucide-react';
import { AuthService, type UserProfile, tokenStore } from '../services/Auth/auth.service';
import { CartPanel, WishlistPanel } from '../common/Cart-Wishlists.modal';
import { useCart } from '../contexts/commerce/cart.context';
import { useWishlist } from '../contexts/commerce/wishlist.context';

interface CategoryNavbarProps {
  categoryName: string; 
  showBackButton?: boolean;
  onBack?: () => void;
}

const CategoryNavbar: React.FC<CategoryNavbarProps> = ({
  categoryName,
  showBackButton = true,
  onBack,
}) => {
  const navigate = useNavigate();
  const { cart, isLoading: cartLoading } = useCart();
  const { wishlist, isLoading: wishlistLoading } = useWishlist();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const cartCount = cart?.items.reduce((sum, i) => sum + i.quantity, 0) || 0;
  const wishlistCount = wishlist?.items.length || 0;

  useEffect(() => {
    const token = tokenStore.get();
    if (!token) { setIsAuthLoading(false); return; }
    AuthService.getMe()
      .then(setUser)
      .catch(() => { tokenStore.clear(); setUser(null); })
      .finally(() => setIsAuthLoading(false));
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node))
        setDropdownOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleBack = () => (onBack ? onBack() : navigate(-1));
  const handleLogout = async () => {
    setDropdownOpen(false);
    await AuthService.logout();
    setUser(null);
    navigate('/');
  };

  const isLoggedIn = !!user;
  const initials = user?.fullName
    ? user.fullName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
    : '';

  const isLoading = cartLoading || wishlistLoading || isAuthLoading;

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-md border-b border-sky-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3 min-w-0">
              {showBackButton && (
                <button onClick={handleBack} className="flex-shrink-0 p-2 rounded-full bg-sky-50 text-sky-600 hover:bg-sky-100 transition-colors">
                  <ArrowLeft className="w-5 h-5" />
                </button>
              )}
              <h1 className="text-lg font-display font-semibold text-charcoal truncate">{categoryName}</h1>
            </div>

            <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
              <Link to="/" className="p-2 rounded-full text-slate-text hover:text-sky-600 hover:bg-sky-50 transition-colors">
                <Home className="w-5 h-5" />
              </Link>

              {isLoading && <div className="w-8 h-8 rounded-full bg-sky-100 animate-pulse" />}

              {!isLoading && isLoggedIn && (
                <>
                  <button onClick={() => { setWishlistOpen(true); setCartOpen(false); }} className="relative p-2 rounded-full text-slate-text hover:text-sky-600 hover:bg-sky-50">
                    <Heart className="w-5 h-5" />
                    {wishlistCount > 0 && (
                      <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                        {wishlistCount > 99 ? '99+' : wishlistCount}
                      </span>
                    )}
                  </button>

                  <button onClick={() => { setCartOpen(true); setWishlistOpen(false); }} className="relative p-2 rounded-full text-slate-text hover:text-sky-600 hover:bg-sky-50">
                    <ShoppingCart className="w-5 h-5" />
                    {cartCount > 0 && (
                      <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 bg-sky-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                        {cartCount > 99 ? '99+' : cartCount}
                      </span>
                    )}
                  </button>

                  <div className="relative" ref={dropdownRef}>
                    <button onClick={() => setDropdownOpen(v => !v)} className="flex items-center p-1 rounded-full hover:bg-sky-50">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center text-white text-xs font-semibold">
                        {initials || <User className="w-4 h-4" />}
                      </div>
                    </button>
                    {dropdownOpen && (
                      <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-sky-100 py-1 z-50">
                        <div className="px-4 py-3 border-b border-sky-50">
                          <p className="text-sm font-semibold text-charcoal truncate">{user?.fullName}</p>
                          <p className="text-[11px] text-slate-text truncate">{user?.phone ?? user?.email}</p>
                        </div>
                        <Link to="/dashboard" onClick={() => setDropdownOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-text hover:bg-sky-50">
                          <LayoutDashboard className="w-4 h-4" /> Dashboard
                        </Link>
                        <Link to="/dashboard/settings" onClick={() => setDropdownOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-text hover:bg-sky-50">
                          <User className="w-4 h-4" /> Profile
                        </Link>
                        <Link to="/dashboard/orders" onClick={() => setDropdownOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-text hover:bg-sky-50">
                          <Package className="w-4 h-4" /> My Orders
                        </Link>
                        <hr className="my-1 border-sky-100" />
                        <button onClick={handleLogout} className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 flex items-center gap-3">
                          <LogOut className="w-4 h-4" /> Sign Out
                        </button>
                      </div>
                    )}
                  </div>
                </>
              )}

              {!isLoading && !isLoggedIn && (
                <>
                  <Link to="/sign-in" className="flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium text-sky-600 hover:bg-sky-50">
                    <LogIn className="w-4 h-4" />
                    <span className="hidden sm:inline">Sign In</span>
                  </Link>
                  <Link to="/sign-up" className="flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium bg-sky-500 text-white hover:bg-sky-600 shadow-sm">
                    <UserPlus className="w-4 h-4" />
                    <span className="hidden sm:inline">Sign Up</span>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <CartPanel open={cartOpen} onClose={() => setCartOpen(false)} />
      <WishlistPanel open={wishlistOpen} onClose={() => setWishlistOpen(false)} />
    </>
  );
};

export default CategoryNavbar;