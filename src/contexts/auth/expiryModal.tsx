// components/common/SessionExpiryModal.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, LogIn, X } from 'lucide-react';

interface SessionExpiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExtend: () => void;
  secondsLeft?: number;
}

export const SessionExpiryModal: React.FC<SessionExpiryModalProps> = ({
  isOpen,
  onClose,
  onExtend,
  secondsLeft = 10,
}) => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(secondsLeft);

  useEffect(() => {
    if (isOpen && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isOpen, timeLeft]);

  // Reset timeLeft when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeLeft(secondsLeft);
    }
  }, [isOpen, secondsLeft]);

  if (!isOpen) return null;

  const handleExtend = () => {
    onExtend();
    onClose();
  };

  const handleSignIn = () => {
    onClose();
    navigate('/sign-in');
  };

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed inset-x-4 top-1/2 -translate-y-1/2 z-50 mx-auto max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden animate-fade-in">
          <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-6 text-white">
            <div className="flex justify-end">
              <button onClick={onClose} className="p-1 rounded-full bg-white/20 hover:bg-white/30">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-3">
                <Clock className="w-8 h-8" />
              </div>
              <h2 className="text-xl font-display font-bold">Session Expiring Soon</h2>
              <p className="text-sm text-white/90 mt-1">Please extend your session to continue</p>
            </div>
          </div>

          <div className="p-6">
            <div className="text-center mb-6">
              <p className="text-3xl font-bold text-charcoal mb-2">
                {timeLeft} seconds
              </p>
              <p className="text-xs text-slate-text">
                Your session will expire in {timeLeft} second{timeLeft !== 1 ? 's' : ''}
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleExtend}
                className="w-full bg-sky-500 text-white py-3 rounded-xl text-sm font-medium hover:bg-sky-600 transition-colors"
              >
                Stay Signed In
              </button>

              <button
                onClick={handleSignIn}
                className="w-full flex items-center justify-center gap-2 bg-white border-2 border-sky-200 text-sky-600 py-3 rounded-xl text-sm font-medium hover:bg-sky-50 transition-colors"
              >
                <LogIn className="w-4 h-4" />
                Sign In Again
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};