// components/common/CategoryNavbar.tsx
import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, LogIn, UserPlus, User, LogOut, ShoppingCart,
  Heart, Home, LayoutDashboard, Package, ArrowRight,
  ShoppingBag,
} from 'lucide-react';
import { AuthService, type UserProfile, tokenStore } from '../services/Auth/auth.service';
import { SlidePanel, CartItem, WishlistItem, EmptyState } from './Cart-Wishlists.modal';

// ── Types for products (shared)
interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity?: number;
  category: string;
}

// ── Mock data ──────────────────────────────────────────────────────────────────
const MOCK_CART: Product[] = [
  { id: '1', name: 'Wireless Earbuds Pro', price: 3200, image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=80&h=80&fit=crop', quantity: 1, category: 'Electronics' },
  { id: '2', name: 'Leather Crossbody Bag', price: 1850, image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=80&h=80&fit=crop', quantity: 2, category: 'Fashion' },
  { id: '3', name: 'Stainless Water Bottle', price: 650, image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=80&h=80&fit=crop', quantity: 1, category: 'Home' },
];

const MOCK_WISHLIST: Product[] = [
  { id: '4', name: 'Running Shoes Ultra', price: 5400, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=80&h=80&fit=crop', category: 'Sports' },
  { id: '5', name: 'Ceramic Coffee Mug Set', price: 980, image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=80&h=80&fit=crop', category: 'Home' },
  { id: '6', name: 'Sunglasses Aviator', price: 2100, image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=80&h=80&fit=crop', category: 'Fashion' },
  { id: '7', name: 'Portable Charger 20000mAh', price: 1750, image: 'https://images.unsplash.com/photo-1609592424967-5a7b7a5a3a3a?w=80&h=80&fit=crop', category: 'Electronics' },
];

// ── Main navbar ────────────────────────────────────────────────────────────────

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
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // ── Mock state (replace with real store later) ─────────────────────────────
  const [cartItems, setCartItems] = useState<Product[]>(MOCK_CART);
  const [wishlistItems, setWishlistItems] = useState<Product[]>(MOCK_WISHLIST);

  const cartCount = cartItems.reduce((sum, i) => sum + (i.quantity ?? 1), 0);
  const wishlistCount = wishlistItems.length;
  const cartTotal = cartItems.reduce((sum, i) => sum + i.price * (i.quantity ?? 1), 0);

  // ── Auth ───────────────────────────────────────────────────────────────────
  useEffect(() => {
    const token = tokenStore.get();
    if (!token) { setIsLoading(false); return; }
    AuthService.getMe()
      .then(setUser)
      .catch(() => { tokenStore.clear(); setUser(null); })
      .finally(() => setIsLoading(false));
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

  // ── Cart actions ───────────────────────────────────────────────────────────
  const handleQtyChange = (id: string, delta: number) => {
    setCartItems(prev => prev
      .map(i => i.id === id ? { ...i, quantity: Math.max(1, (i.quantity ?? 1) + delta) } : i)
    );
  };

  const handleCartRemove = (id: string) =>
    setCartItems(prev => prev.filter(i => i.id !== id));

  // ── Wishlist actions ───────────────────────────────────────────────────────
  const handleWishlistRemove = (id: string) =>
    setWishlistItems(prev => prev.filter(i => i.id !== id));

  const handleMoveToCart = (id: string) => {
    const item = wishlistItems.find(i => i.id === id);
    if (!item) return;
    setCartItems(prev => {
      const exists = prev.find(i => i.id === id);
      if (exists) return prev.map(i => i.id === id ? { ...i, quantity: (i.quantity ?? 1) + 1 } : i);
      return [...prev, { ...item, quantity: 1 }];
    });
    handleWishlistRemove(id);
  };

  const isLoggedIn = !!user;
  const initials = user?.fullName
    ? user.fullName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
    : '';

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-md border-b border-sky-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">

            {/* Left */}
            <div className="flex items-center gap-3 min-w-0">
              {showBackButton && (
                <button onClick={handleBack} className="flex-shrink-0 p-2 rounded-full bg-sky-50 text-sky-600 hover:bg-sky-100 transition-colors" aria-label="Go back">
                  <ArrowLeft className="w-5 h-5" />
                </button>
              )}
              <h1 className="text-lg font-display font-semibold text-charcoal truncate">{categoryName}</h1>
            </div>

            {/* Right */}
            <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
              <Link to="/" className="p-2 rounded-full text-slate-text hover:text-sky-600 hover:bg-sky-50 transition-colors" aria-label="Home">
                <Home className="w-5 h-5" />
              </Link>

              {isLoading && <div className="w-8 h-8 rounded-full bg-sky-100 animate-pulse" />}

              {!isLoading && isLoggedIn && (
                <>
                  {/* Wishlist button */}
                  <button
                    onClick={() => { setWishlistOpen(true); setCartOpen(false); }}
                    className="relative p-2 rounded-full text-slate-text hover:text-sky-600 hover:bg-sky-50 transition-colors"
                    aria-label="Wishlist"
                  >
                    <Heart className="w-5 h-5" />
                    {wishlistCount > 0 && (
                      <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                        {wishlistCount > 99 ? '99+' : wishlistCount}
                      </span>
                    )}
                  </button>

                  {/* Cart button */}
                  <button
                    onClick={() => { setCartOpen(true); setWishlistOpen(false); }}
                    className="relative p-2 rounded-full text-slate-text hover:text-sky-600 hover:bg-sky-50 transition-colors"
                    aria-label="Cart"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    {cartCount > 0 && (
                      <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 bg-sky-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                        {cartCount > 99 ? '99+' : cartCount}
                      </span>
                    )}
                  </button>

                  {/* Avatar dropdown */}
                  <div className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setDropdownOpen(v => !v)}
                      className="flex items-center p-1 rounded-full hover:bg-sky-50 transition-colors focus:outline-none"
                      aria-label="Account menu"
                      aria-expanded={dropdownOpen}
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center text-white text-xs font-semibold select-none">
                        {initials || <User className="w-4 h-4" />}
                      </div>
                    </button>

                    {dropdownOpen && (
                      <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-sky-100 py-1 z-50">
                        <div className="px-4 py-3 border-b border-sky-50">
                          <p className="text-sm font-semibold text-charcoal truncate">{user?.fullName}</p>
                          <p className="text-[11px] text-slate-text truncate mt-0.5">{user?.phone ?? user?.email}</p>
                        </div>
                        <Link to="/dashboard" onClick={() => setDropdownOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-text hover:bg-sky-50 hover:text-sky-600 transition-colors">
                          <LayoutDashboard className="w-4 h-4 flex-shrink-0" /> Dashboard
                        </Link>
                        <Link to="/dashboard/settings" onClick={() => setDropdownOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-text hover:bg-sky-50 hover:text-sky-600 transition-colors">
                          <User className="w-4 h-4 flex-shrink-0" /> Profile
                        </Link>
                        <Link to="/dashboard/orders" onClick={() => setDropdownOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-text hover:bg-sky-50 hover:text-sky-600 transition-colors">
                          <Package className="w-4 h-4 flex-shrink-0" /> My Orders
                        </Link>
                        <hr className="my-1 border-sky-100" />
                        <button onClick={handleLogout} className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-3">
                          <LogOut className="w-4 h-4 flex-shrink-0" /> Sign Out
                        </button>
                      </div>
                    )}
                  </div>
                </>
              )}

              {!isLoading && !isLoggedIn && (
                <>
                  <Link to="/sign-in" className="flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium text-sky-600 hover:bg-sky-50 transition-colors">
                    <LogIn className="w-4 h-4" />
                    <span className="hidden sm:inline">Sign In</span>
                  </Link>
                  <Link to="/sign-up" className="flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium bg-sky-500 text-white hover:bg-sky-600 transition-colors shadow-sm">
                    <UserPlus className="w-4 h-4" />
                    <span className="hidden sm:inline">Sign Up</span>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* ── Cart panel ── */}
      <SlidePanel
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        title={`Cart (${cartCount})`}
        icon={<ShoppingCart className="w-5 h-5" />}
        footer={
          cartItems.length > 0 ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-text">Total</span>
                <span className="text-base font-bold text-charcoal">KES {cartTotal.toLocaleString()}</span>
              </div>
              <Link
                to="/account/cart"
                onClick={() => setCartOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-sky-500 text-white text-sm font-medium hover:bg-sky-600 transition-colors"
              >
                View full cart <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <Link
              to="/shop"
              onClick={() => setCartOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-sky-50 text-sky-600 text-sm font-medium hover:bg-sky-100 transition-colors"
            >
              Browse products <ArrowRight className="w-4 h-4" />
            </Link>
          )
        }
      >
        {cartItems.length === 0
          ? <EmptyState icon={<ShoppingBag className="w-8 h-8" />} message="Your cart is empty. Add some items!" />
          : cartItems.map(item => (
            <CartItem
              key={item.id}
              item={item}
              onQtyChange={handleQtyChange}
              onRemove={handleCartRemove}
            />
          ))
        }
      </SlidePanel>

      {/* ── Wishlist panel ── */}
      <SlidePanel
        open={wishlistOpen}
        onClose={() => setWishlistOpen(false)}
        title={`Wishlist (${wishlistCount})`}
        icon={<Heart className="w-5 h-5" />}
        footer={
          wishlistItems.length > 0 ? (
            <Link
              to="/account/wishlist"
              onClick={() => setWishlistOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-sky-500 text-white text-sm font-medium hover:bg-sky-600 transition-colors"
            >
              View all saved items <ArrowRight className="w-4 h-4" />
            </Link>
          ) : (
            <Link
              to="/shop"
              onClick={() => setWishlistOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-sky-50 text-sky-600 text-sm font-medium hover:bg-sky-100 transition-colors"
            >
              Discover products <ArrowRight className="w-4 h-4" />
            </Link>
          )
        }
      >
        {wishlistItems.length === 0
          ? <EmptyState icon={<Heart className="w-8 h-8" />} message="Nothing saved yet. Heart items you love!" />
          : wishlistItems.map(item => (
            <WishlistItem
              key={item.id}
              item={item}
              onRemove={handleWishlistRemove}
              onMoveToCart={handleMoveToCart}
            />
          ))
        }
      </SlidePanel>
    </>
  );
};

export default CategoryNavbar;