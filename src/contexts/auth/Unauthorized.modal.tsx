// components/common/UnauthorizedModal.tsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, X, AlertTriangle, ArrowRight, LogIn, UserPlus } from 'lucide-react';

interface UnauthorizedModalProps {
  isOpen: boolean;
  onClose: () => void;
  message?: string;
  requiredRole?: string;
}

export const UnauthorizedModal: React.FC<UnauthorizedModalProps> = ({
  isOpen,
  onClose,
  message = "You need to be signed in to access this page",
  requiredRole,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleNavigateToSignIn = () => {
    onClose();
    navigate('/sign-in');
  };

  const handleNavigateToSignUp = () => {
    onClose();
    navigate('/sign-up');
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal - Mobile first */}
      <div className="fixed inset-x-4 top-1/2 -translate-y-1/2 z-50 mx-auto max-w-md animate-fade-in">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="relative bg-gradient-to-r from-red-500 to-red-600 p-6 text-white">
            <button
              onClick={onClose}
              className="absolute right-4 top-4 p-1 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-3">
                <Shield className="w-8 h-8" />
              </div>
              <h2 className="text-xl font-display font-bold">Access Restricted</h2>
              <p className="text-sm text-white/90 mt-1">Authentication Required</p>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="flex items-start gap-3 mb-6 p-4 bg-amber-50 rounded-xl border border-amber-200">
              <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-amber-800 mb-1">Unauthorized Access</p>
                <p className="text-xs text-amber-700">{message}</p>
                {requiredRole && (
                  <p className="text-xs text-amber-700 mt-2">
                    This page requires: <span className="font-semibold">{requiredRole}</span> role
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleNavigateToSignIn}
                className="w-full flex items-center justify-center gap-2 bg-sky-500 text-white py-3 rounded-xl text-sm font-medium hover:bg-sky-600 transition-colors"
              >
                <LogIn className="w-4 h-4" />
                Sign In to Your Account
              </button>

              <button
                onClick={handleNavigateToSignUp}
                className="w-full flex items-center justify-center gap-2 bg-white border-2 border-sky-200 text-sky-600 py-3 rounded-xl text-sm font-medium hover:bg-sky-50 transition-colors"
              >
                <UserPlus className="w-4 h-4" />
                Create New Account
              </button>

              <button
                onClick={onClose}
                className="w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-600 py-3 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors"
              >
                <ArrowRight className="w-4 h-4" />
                Continue Browsing
              </button>
            </div>

            {/* Footer */}
            <p className="text-center text-xs text-gray-500 mt-6">
              Sign in to access your account and enjoy personalized features
            </p>
          </div>
        </div>
      </div>
    </>
  );
};