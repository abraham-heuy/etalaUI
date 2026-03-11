// components/common/LoginModal.tsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { LogIn, UserPlus, X, ShoppingCart, CreditCard, AlertCircle } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  actionType: 'cart' | 'buy' | 'book' | 'contact'|null;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, actionType }) => {
  const [shouldVibrate, setShouldVibrate] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Trigger vibration animation
      setShouldVibrate(true);
      const timer = setTimeout(() => setShouldVibrate(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const getMessage = () => {
    switch (actionType) {
      case 'cart':
        return 'Sign in to add items to your cart and save them for later';
      case 'buy':
        return 'Sign in to complete your purchase and track your order';
      default:
        return 'Sign in to continue with your action';
    }
  };

  const getIcon = () => {
    switch (actionType) {
      case 'cart':
        return <ShoppingCart className="w-6 h-6 text-sky-600" />;
      case 'buy':
        return <CreditCard className="w-6 h-6 text-sky-600" />;
      default:
        return <AlertCircle className="w-6 h-6 text-sky-600" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Blurred backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-md"
        onClick={onClose}
      />
      
      {/* Modal - with vibration animation */}
      <div 
        className={`relative bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl ${
          shouldVibrate ? 'animate-shake' : 'animate-slide-up'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-text hover:text-sky-600 hover:bg-sky-50 rounded-full transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Icon */}
        <div className="w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
          {getIcon()}
        </div>

        {/* Title */}
        <h2 className="text-2xl font-display font-bold text-charcoal text-center mb-2">
          {actionType === 'cart' ? 'Add to Cart' : 'Complete Purchase'}
        </h2>

        {/* Message */}
        <p className="text-sm text-slate-text text-center mb-6">
          {getMessage()}
        </p>

        {/* Benefits list */}
        <div className="bg-sky-50 rounded-xl p-4 mb-6">
          <h3 className="text-sm font-medium text-charcoal mb-2">
            Why sign in?
          </h3>
          <ul className="space-y-2">
            <li className="flex items-start gap-2 text-xs text-slate-text">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-1.5"></span>
              Save items to your wishlist for later
            </li>
            <li className="flex items-start gap-2 text-xs text-slate-text">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-1.5"></span>
              Track your orders in real-time
            </li>
            <li className="flex items-start gap-2 text-xs text-slate-text">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-1.5"></span>
              Get personalized recommendations
            </li>
            <li className="flex items-start gap-2 text-xs text-slate-text">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-1.5"></span>
              Faster checkout with saved details
            </li>
          </ul>
        </div>

        {/* Action buttons */}
        <div className="space-y-3">
          <Link
            to="/sign-in"
            className="w-full bg-sky-500 text-white py-3 rounded-xl text-sm font-medium hover:bg-sky-600 transition-colors flex items-center justify-center gap-2"
            onClick={onClose}
          >
            <LogIn className="w-4 h-4" />
            Sign In
          </Link>
          <Link
            to="/sign-up"
            className="w-full bg-white border border-sky-200 text-sky-600 py-3 rounded-xl text-sm font-medium hover:bg-sky-50 transition-colors flex items-center justify-center gap-2"
            onClick={onClose}
          >
            <UserPlus className="w-4 h-4" />
            Create Account
          </Link>
          <button
            onClick={onClose}
            className="w-full text-xs text-slate-text hover:text-sky-600 transition-colors pt-2"
          >
            Continue as Guest
          </button>
        </div>

        {/* Note */}
        <p className="text-[10px] text-slate-text/60 text-center mt-4">
          By continuing, you agree to our{' '}
          <Link to="/terms" className="text-sky-600 hover:underline">Terms</Link> and{' '}
          <Link to="/privacy" className="text-sky-600 hover:underline">Privacy Policy</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginModal;