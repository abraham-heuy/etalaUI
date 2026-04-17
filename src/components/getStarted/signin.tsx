// pages/SignIn.tsx
import React, { useState } from 'react';
import {
  Phone,
  Lock,
  ArrowRight,
  Loader2,
  CheckCircle,
  AlertCircle,
  Eye,
  EyeOff,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import BackArrow from '../about/backArrow';
import { AuthService, AuthServiceError } from '../../services/Auth/auth.service';

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Phone formatting
  const formatPhoneNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.startsWith('254')) return '+' + cleaned;
    if (cleaned.startsWith('0'))   return '+254' + cleaned.slice(1);
    if (cleaned.startsWith('7') || cleaned.startsWith('1')) return '+254' + cleaned;
    return cleaned;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(formatPhoneNumber(e.target.value));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await AuthService.loginPhone({ phone: phoneNumber, password, rememberMe });
      setSuccess(true);
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (err) {
      setError(err instanceof AuthServiceError ? err.message : 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-soft-white to-warm-gray flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-2xl font-display font-bold text-charcoal mb-2">Login Successful!</h2>
          <p className="text-sm text-slate-text">Redirecting you to your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-soft-white to-warm-gray">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-sky-100">
        <div className="max-w-md mx-auto px-4">
          <div className="flex items-center justify-center h-16 relative">
            <div className="absolute left-0"><BackArrow /></div>
            <h1 className="text-xl font-display font-semibold text-charcoal">Sign In</h1>
            <div className="w-10" />
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-8">
        <div className="space-y-6 animate-slide-up">
          <div className="text-center">
            <div className="w-20 h-20 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-sky-600" />
            </div>
            <h2 className="text-2xl font-display font-bold text-charcoal mb-2">Welcome Back</h2>
            <p className="text-sm text-slate-text">Sign in to continue to E-TALA</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-3 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                <p className="text-xs text-red-700">{error}</p>
              </div>
            )}

            {/* Phone */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-text ml-2">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-text/40" />
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  placeholder="07XX XXX XXX"
                  className="w-full pl-10 pr-4 py-3 bg-white border border-sky-100 rounded-xl focus:outline-none focus:border-sky-300 focus:ring-4 focus:ring-sky-100 transition-all text-charcoal text-sm"
                  required
                />
              </div>
              <p className="text-[10px] text-slate-text/60 ml-2">Format: 07XX XXX XXX or 2547XX XXX XXX</p>
            </div>

            {/* Password */}
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label className="text-xs font-medium text-slate-text ml-2">Password</label>
                <Link to="/forgot-password" className="text-xs text-sky-600 hover:text-sky-700 font-medium">
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-text/40" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-12 py-3 bg-white border border-sky-100 rounded-xl focus:outline-none focus:border-sky-300 focus:ring-4 focus:ring-sky-100 transition-all text-charcoal text-sm"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-text/40 hover:text-sky-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember me */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setRememberMe(v => !v)}
                className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                  rememberMe ? 'bg-sky-500 border-sky-500' : 'border-slate-text/30 bg-white'
                }`}
              >
                {rememberMe && <CheckCircle className="w-4 h-4 text-white" />}
              </button>
              <span className="text-xs text-slate-text">Remember me</span>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-sky-500 text-white py-3.5 rounded-xl text-sm font-medium hover:bg-sky-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Signing in...</>
              ) : (
                <>Sign In <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </form>

          {/* Sign up link */}
          <div className="text-center pt-4">
            <p className="text-xs text-slate-text">
              Don't have an account?{' '}
              <Link to="/sign-up" className="text-sky-600 font-medium hover:underline">Sign up</Link>
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-md mx-auto px-4 py-6">
        <div className="flex justify-center gap-4 text-[10px] text-slate-text/60">
          <Link to="/terms" className="hover:text-sky-600 transition-colors">Terms</Link>
          <span>•</span>
          <Link to="/privacy" className="hover:text-sky-600 transition-colors">Privacy</Link>
          <span>•</span>
          <Link to="/help" className="hover:text-sky-600 transition-colors">Help</Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;