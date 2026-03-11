// components/common/CategoryNavbar.tsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  LogIn, 
  UserPlus, 
  User, 
  LogOut, 
  ShoppingCart, 
  Heart,
  Home
} from 'lucide-react';

interface CategoryNavbarProps {
  categoryName: string;
  showBackButton?: boolean;
  onBack?: () => void;
}

const CategoryNavbar: React.FC<CategoryNavbarProps> = ({ 
  categoryName, 
  showBackButton = true,
  onBack 
}) => {
  const navigate = useNavigate();
  // Mock authentication state - replace with actual auth context
  const isLoggedIn = localStorage.getItem('user') ? true : false;

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-md border-b border-sky-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Back button and category name */}
          <div className="flex items-center gap-3">
            {showBackButton && (
              <button
                onClick={handleBack}
                className="p-2 rounded-full bg-sky-50 text-sky-600 hover:bg-sky-100 transition-colors"
                aria-label="Go back"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            <h1 className="text-lg font-display font-semibold text-charcoal">
              {categoryName}
            </h1>
          </div>

          {/* Right side - Home, Auth buttons or User menu */}
          <div className="flex items-center gap-2">
            {/* Home Icon - Always visible */}
            <Link
              to="/"
              className="p-2 rounded-full text-slate-text hover:text-sky-600 hover:bg-sky-50 transition-colors"
              aria-label="Home"
              title="Go to Home"
            >
              <Home className="w-5 h-5" />
            </Link>

            {isLoggedIn ? (
              /* Logged In User Menu */
              <>
                <Link
                  to="/account/wishlist"
                  className="p-2 rounded-full text-slate-text hover:text-sky-600 hover:bg-sky-50 transition-colors relative"
                  aria-label="Wishlist"
                >
                  <Heart className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center">
                    3
                  </span>
                </Link>
                
                <Link
                  to="/account/cart"
                  className="p-2 rounded-full text-slate-text hover:text-sky-600 hover:bg-sky-50 transition-colors relative"
                  aria-label="Cart"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-sky-500 text-white text-[10px] rounded-full flex items-center justify-center">
                    2
                  </span>
                </Link>

                <div className="relative group">
                  <button className="flex items-center gap-2 p-2 rounded-full hover:bg-sky-50 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center text-white">
                      <User className="w-4 h-4" />
                    </div>
                  </button>

                  {/* Dropdown menu */}
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-sky-100 py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <Link
                      to="/account/dashboard"
                      className="block px-4 py-2 text-sm text-slate-text hover:bg-sky-50 hover:text-sky-600 transition-colors"
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/account/profile"
                      className="block px-4 py-2 text-sm text-slate-text hover:bg-sky-50 hover:text-sky-600 transition-colors"
                    >
                      Profile
                    </Link>
                    <Link
                      to="/account/orders"
                      className="block px-4 py-2 text-sm text-slate-text hover:bg-sky-50 hover:text-sky-600 transition-colors"
                    >
                      My Orders
                    </Link>
                    <hr className="my-1 border-sky-100" />
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                </div>
              </>
            ) : (
              /* Guest User Buttons */
              <>
                <Link
                  to="/sign-in"
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-sky-600 hover:bg-sky-50 transition-colors"
                >
                  <LogIn className="w-4 h-4" />
                  <span className="hidden sm:inline">Sign In</span>
                </Link>
                <Link
                  to="/sign-up"
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-sky-500 text-white hover:bg-sky-600 transition-colors shadow-sm"
                >
                  <UserPlus className="w-4 h-4" />
                  <span className="hidden sm:inline">Sign Up</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default CategoryNavbar;