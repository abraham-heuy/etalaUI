// pages/SignIn.tsx
import React, { useState, useEffect, useRef } from 'react';
import {
  Phone,
  Lock,
  ArrowRight,
  ArrowLeft,
  Smartphone,
  Shield,
  Chrome,
  Loader2,
  CheckCircle,
  AlertCircle,
  Eye,
  EyeOff,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import BackArrow from '../about/backArrow';
import { AuthService, AuthServiceError } from '../../services/Auth/auth.service';

// // ─── Google SDK types ──────────────────────────────────────────────────────────
// declare global {
//   interface Window {
//     google?: {
//       accounts: {
//         id: {
//           initialize: (cfg: { client_id: string; callback: (r: { credential: string }) => void }) => void;
//           prompt: () => void;
//         };
//       };
//     };
//   }
// }

type LoginMethod = 'phone' | 'google';
type LoginStep = 'credentials' | 'otp' | 'success';

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const [loginMethod, setLoginMethod] = useState<LoginMethod>('phone');
  const [currentStep, setCurrentStep] = useState<LoginStep>('credentials');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [otpTimer, setOtpTimer] = useState(60);
  const [isFirstLogin, setIsFirstLogin] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // ── Phone formatting ───────────────────────────────────────────────────────

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

  // ── OTP input ─────────────────────────────────────────────────────────────

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  // ── OTP timer ─────────────────────────────────────────────────────────────

  const startOtpTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setOtpTimer(60);
    timerRef.current = setInterval(() => {
      setOtpTimer(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // ── Phone login ───────────────────────────────────────────────────────────

  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await AuthService.loginPhone({ phone: phoneNumber, password, rememberMe });
      // Successful login — no OTP required
      setCurrentStep('success');
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (err) {
      if (err instanceof AuthServiceError) {
        // Backend signals first-time login: OTP must be verified
        if (err.code === 'OTP_REQUIRED') {
          setIsFirstLogin(true);
          setCurrentStep('otp');
          startOtpTimer();
        } else {
          setError(err.message);
        }
      } else {
        setError('Something went wrong. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // ── OTP verification ──────────────────────────────────────────────────────

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpString = otp.join('');
    if (otpString.length !== 6) {
      setError('Please enter the 6-digit code.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await AuthService.verifyLoginOtp({ phone: phoneNumber, otp: otpString, rememberMe });
      setCurrentStep('success');
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (err) {
      setError(err instanceof AuthServiceError ? err.message : 'Verification failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // ── Resend OTP ────────────────────────────────────────────────────────────

  const resendOtp = async () => {
    setError('');
    try {
      // Re-trigger the login call — the server resends the OTP
      await AuthService.loginPhone({ phone: phoneNumber, password, rememberMe });
    } catch (err) {
      // OTP_REQUIRED is expected here; any other error is a real problem
      if (err instanceof AuthServiceError && err.code !== 'OTP_REQUIRED') {
        setError(err.message);
        return;
      }
    }
    startOtpTimer();
  };

  // ── Google login ──────────────────────────────────────────────────────────

  const handleGoogleLogin = () => {
    if (!window.google) {
      setError('Google Sign-In is not available right now. Please try again later.');
      return;
    }

    window.google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID as string,
      callback: async ({ credential }: google.accounts.id.CredentialResponse) => {
        setIsLoading(true);
        setError('');
        try {
          await AuthService.googleAuth(credential);
          setCurrentStep('success');
          setTimeout(() => navigate('/dashboard'), 1500);
        } catch (err) {
          setError(err instanceof AuthServiceError ? err.message : 'Google sign-in failed. Please try again.');
        } finally {
          setIsLoading(false);
        }
      },
    });

    window.google.accounts.id.prompt();
  };

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gradient-to-b from-soft-white to-warm-gray">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-sky-100">
        <div className="max-w-md mx-auto px-4">
          <div className="flex items-center justify-center h-16 relative">
            <div className="absolute left-0">
              <BackArrow />
            </div>
            <h1 className="text-xl font-display font-semibold text-charcoal">
              {currentStep === 'credentials' && 'Sign In'}
              {currentStep === 'otp' && 'Verify Code'}
              {currentStep === 'success' && 'Welcome!'}
            </h1>
            <div className="w-10" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-md mx-auto px-4 py-8">

        {/* ── Success ── */}
        {currentStep === 'success' && (
          <div className="flex flex-col items-center justify-center min-h-[60vh] animate-fade-in">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-bounce">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-2xl font-display font-bold text-charcoal mb-2">
              Login Successful!
            </h2>
            <p className="text-sm text-slate-text text-center">
              Redirecting you to your dashboard...
            </p>
          </div>
        )}

        {/* ── Credentials ── */}
        {currentStep === 'credentials' && (
          <div className="space-y-6 animate-slide-up">
            {/* Icon + heading */}
            <div className="text-center">
              <div className="w-20 h-20 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-sky-600" />
              </div>
              <h2 className="text-2xl font-display font-bold text-charcoal mb-2">Welcome Back</h2>
              <p className="text-sm text-slate-text">Sign in to continue to E-TALA</p>
            </div>

            {/* Method toggle */}
            <div className="flex bg-sky-50 rounded-full p-1">
              {(['phone', 'google'] as LoginMethod[]).map(method => (
                <button
                  key={method}
                  onClick={() => { setLoginMethod(method); setError(''); }}
                  className={`flex-1 py-2.5 px-4 rounded-full text-sm font-medium transition-all ${
                    loginMethod === method
                      ? 'bg-white text-sky-700 shadow-sm'
                      : 'text-sky-600 hover:text-sky-700'
                  }`}
                >
                  <span className="flex items-center justify-center gap-2">
                    {method === 'phone' ? <Phone className="w-4 h-4" /> : <Chrome className="w-4 h-4" />}
                    {method === 'phone' ? 'Phone' : 'Google'}
                  </span>
                </button>
              ))}
            </div>

            {/* ── Phone form ── */}
            {loginMethod === 'phone' && (
              <form onSubmit={handleCredentialsSubmit} className="space-y-4">
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
                  <p className="text-[10px] text-slate-text/60 ml-2">
                    Format: 07XX XXX XXX or 2547XX XXX XXX
                  </p>
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
            )}

            {/* ── Google button ── */}
            {loginMethod === 'google' && (
              <div className="space-y-4">
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-3 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                    <p className="text-xs text-red-700">{error}</p>
                  </div>
                )}
                <button
                  onClick={handleGoogleLogin}
                  disabled={isLoading}
                  className="w-full bg-white border border-sky-200 text-charcoal py-3.5 rounded-xl text-sm font-medium hover:bg-sky-50 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Chrome className="w-5 h-5" />}
                  Continue with Google
                </button>
                <p className="text-xs text-center text-slate-text/70">
                  By continuing with Google, you agree to our{' '}
                  <Link to="/terms" className="text-sky-600 hover:underline">Terms</Link>
                  {' '}and{' '}
                  <Link to="/privacy" className="text-sky-600 hover:underline">Privacy Policy</Link>
                </p>
              </div>
            )}

            {/* Sign up link */}
            <div className="text-center pt-4">
              <p className="text-xs text-slate-text">
                Don't have an account?{' '}
                <Link to="/sign-up" className="text-sky-600 font-medium hover:underline">Sign up</Link>
              </p>
            </div>
          </div>
        )}

        {/* ── OTP step ── */}
        {currentStep === 'otp' && (
          <div className="space-y-6 animate-slide-up">
            <div className="text-center">
              <div className="w-20 h-20 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Smartphone className="w-8 h-8 text-sky-600" />
              </div>
              <h2 className="text-2xl font-display font-bold text-charcoal mb-2">Verify Your Number</h2>
              <p className="text-sm text-slate-text">
                We've sent a 6-digit code to{' '}
                <span className="font-medium text-charcoal">
                  {phoneNumber.slice(0, 4)}***{phoneNumber.slice(-3)}
                </span>
              </p>
            </div>

            <form onSubmit={handleOtpSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-3 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                  <p className="text-xs text-red-700">{error}</p>
                </div>
              )}

              {/* OTP boxes */}
              <div className="flex justify-center gap-2">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={e => handleOtpChange(index, e.target.value)}
                    onKeyDown={e => handleOtpKeyDown(index, e)}
                    className="w-12 h-14 bg-white border border-sky-200 rounded-xl text-center text-xl font-bold focus:outline-none focus:border-sky-400 focus:ring-4 focus:ring-sky-100 transition-all"
                  />
                ))}
              </div>

              {/* Timer / Resend */}
              <div className="text-center">
                {otpTimer > 0 ? (
                  <p className="text-xs text-slate-text">
                    Resend code in{' '}
                    <span className="font-medium text-sky-600">{otpTimer}s</span>
                  </p>
                ) : (
                  <button
                    type="button"
                    onClick={resendOtp}
                    className="text-sm text-sky-600 hover:text-sky-700 font-medium"
                  >
                    Resend Code
                  </button>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading || otp.join('').length !== 6}
                className="w-full bg-sky-500 text-white py-3.5 rounded-xl text-sm font-medium hover:bg-sky-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Verifying...</>
                ) : (
                  <>Verify & Continue <ArrowRight className="w-4 h-4" /></>
                )}
              </button>

              {/* First-login info card */}
              {isFirstLogin && (
                <div className="bg-sky-50 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-sky-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-sm font-medium text-charcoal mb-1">First time logging in?</h3>
                      <p className="text-xs text-slate-text">
                        We've sent a one-time code to verify your number.
                        You'll be able to set up your profile after verification.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </form>

            {/* Back */}
            <button
              onClick={() => { setCurrentStep('credentials'); setError(''); setOtp(['', '', '', '', '', '']); }}
              className="flex items-center gap-1 text-xs text-slate-text hover:text-sky-600 transition-colors mx-auto"
            >
              <ArrowLeft className="w-3 h-3" />
              Back to login
            </button>
          </div>
        )}
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