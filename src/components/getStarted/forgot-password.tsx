// pages/ForgotPassword.tsx
import React, { useState, useRef, useEffect } from 'react';
import { Mail, ArrowRight, ArrowLeft, Loader2, CheckCircle, AlertCircle, Lock, Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import BackArrow from '../about/backArrow';
import { AuthService, AuthServiceError } from '../../services/Auth/auth.service';

type Step = 'email' | 'otp' | 'reset' | 'success';

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [otpTimer, setOtpTimer] = useState(60);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

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

  // Step 1: Request OTP
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }
    setIsLoading(true);
    setError('');
    try {
      await AuthService.forgotPasswordEmail(email);
      setStep('otp');
      startOtpTimer();
    } catch (err) {
      // Even if email doesn't exist, we show generic message for security
      setSuccessMessage('If an account exists with this email, we have sent a reset code.');
      setStep('otp');
      startOtpTimer();
    } finally {
      setIsLoading(false);
    }
  };

  // Step 2: Verify OTP
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
    await AuthService.verifyResetOtp(email, otpString);
    setStep('reset');
  } catch (err) {
    setError(err instanceof AuthServiceError ? err.message : 'Invalid code. Please try again.');
  } finally {
    setIsLoading(false);
  }
};

  // Step 3: Reset password
  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setIsLoading(true);
    setError('');
    try {
      const otpString = otp.join('');
      await AuthService.resetPasswordEmail({ email, otp: otpString, newPassword });
      setStep('success');
    } catch (err) {
      setError(err instanceof AuthServiceError ? err.message : 'Failed to reset password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setIsLoading(true);
    setError('');
    try {
      await AuthService.forgotPasswordEmail(email);
      startOtpTimer();
      setSuccessMessage('New verification code sent.');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError('Could not resend code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-soft-white to-warm-gray">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-sky-100">
        <div className="max-w-md mx-auto px-4">
          <div className="flex items-center justify-center h-16 relative">
            <div className="absolute left-0"><BackArrow /></div>
            <h1 className="text-xl font-display font-semibold text-charcoal">
              {step === 'email' && 'Forgot Password'}
              {step === 'otp' && 'Verify Code'}
              {step === 'reset' && 'Reset Password'}
              {step === 'success' && 'Success!'}
            </h1>
            <div className="w-10" />
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-8">
        {/* Step 1: Email */}
        {step === 'email' && (
          <div className="space-y-6 animate-slide-up">
            <div className="text-center">
              <div className="w-20 h-20 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-sky-600" />
              </div>
              <h2 className="text-2xl font-display font-bold text-charcoal mb-2">Reset Your Password</h2>
              <p className="text-sm text-slate-text">Enter your email address to receive a verification code</p>
            </div>

            <form onSubmit={handleEmailSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-3 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                  <p className="text-xs text-red-700">{error}</p>
                </div>
              )}

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-text ml-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-text/40" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-4 py-3 bg-white border border-sky-100 rounded-xl focus:outline-none focus:border-sky-300 focus:ring-4 focus:ring-sky-100 transition-all text-charcoal text-sm"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-sky-500 text-white py-3.5 rounded-xl text-sm font-medium hover:bg-sky-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</> : <>Send Code <ArrowRight className="w-4 h-4" /></>}
              </button>
            </form>

            <div className="text-center pt-4">
              <Link to="/sign-in" className="text-xs text-sky-600 hover:text-sky-700 font-medium inline-flex items-center gap-1">
                <ArrowLeft className="w-3 h-3" /> Back to Sign In
              </Link>
            </div>
          </div>
        )}

        {/* Step 2: OTP */}
        {step === 'otp' && (
          <div className="space-y-6 animate-slide-up">
            <div className="text-center">
              <div className="w-20 h-20 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-sky-600" />
              </div>
              <h2 className="text-2xl font-display font-bold text-charcoal mb-2">Check Your Email</h2>
              <p className="text-sm text-slate-text">
                We've sent a 6-digit code to{' '}
                <span className="font-medium text-charcoal">{email.slice(0, 3)}***{email.slice(email.indexOf('@'))}</span>
              </p>
            </div>

            <form onSubmit={handleOtpSubmit} className="space-y-6">
              {successMessage && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-3">
                  <p className="text-xs text-green-700">{successMessage}</p>
                </div>
              )}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-3">
                  <p className="text-xs text-red-700">{error}</p>
                </div>
              )}

              <div className="flex justify-center gap-2">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    className="w-12 h-14 bg-white border border-sky-200 rounded-xl text-center text-xl font-bold focus:outline-none focus:border-sky-400 focus:ring-4 focus:ring-sky-100 transition-all"
                  />
                ))}
              </div>

              <div className="text-center">
                {otpTimer > 0 ? (
                  <p className="text-xs text-slate-text">Resend code in <span className="font-medium text-sky-600">{otpTimer}s</span></p>
                ) : (
                  <button type="button" onClick={handleResendOtp} disabled={isLoading} className="text-sm text-sky-600 hover:text-sky-700 font-medium">
                    Resend Code
                  </button>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading || otp.join('').length !== 6}
                className="w-full bg-sky-500 text-white py-3.5 rounded-xl text-sm font-medium hover:bg-sky-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? <><Loader2 className="w-4 h-4 animate-spin" /> Verifying...</> : <>Verify Code <ArrowRight className="w-4 h-4" /></>}
              </button>
            </form>

            <button onClick={() => setStep('email')} className="flex items-center gap-1 text-xs text-slate-text hover:text-sky-600 transition-colors mx-auto">
              <ArrowLeft className="w-3 h-3" /> Back
            </button>
          </div>
        )}

        {/* Step 3: Reset Password */}
        {step === 'reset' && (
          <div className="space-y-6 animate-slide-up">
            <div className="text-center">
              <div className="w-20 h-20 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-sky-600" />
              </div>
              <h2 className="text-2xl font-display font-bold text-charcoal mb-2">Create New Password</h2>
              <p className="text-sm text-slate-text">Enter your new password below</p>
            </div>

            <form onSubmit={handleResetSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-3 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                  <p className="text-xs text-red-700">{error}</p>
                </div>
              )}

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-text ml-2">New Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-text/40" />
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-12 py-3 bg-white border border-sky-100 rounded-xl focus:outline-none focus:border-sky-300 focus:ring-4 focus:ring-sky-100 transition-all text-charcoal text-sm"
                    required
                  />
                  <button type="button" onClick={() => setShowNewPassword(!showNewPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-text/40 hover:text-sky-600">
                    {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-text ml-2">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-text/40" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-12 py-3 bg-white border border-sky-100 rounded-xl focus:outline-none focus:border-sky-300 focus:ring-4 focus:ring-sky-100 transition-all text-charcoal text-sm"
                    required
                  />
                  <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-text/40 hover:text-sky-600">
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="bg-sky-50 rounded-xl p-3">
                <p className="text-xs text-slate-text">Password must be at least 6 characters long</p>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-sky-500 text-white py-3.5 rounded-xl text-sm font-medium hover:bg-sky-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? <><Loader2 className="w-4 h-4 animate-spin" /> Resetting...</> : <>Reset Password <ArrowRight className="w-4 h-4" /></>}
              </button>
            </form>
          </div>
        )}

        {/* Step 4: Success */}
        {step === 'success' && (
          <div className="space-y-6 animate-slide-up">
            <div className="text-center">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
              <h2 className="text-2xl font-display font-bold text-charcoal mb-2">Password Reset!</h2>
              <p className="text-sm text-slate-text">Your password has been successfully reset</p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <p className="text-sm text-green-800">You can now sign in with your new password</p>
              </div>
            </div>

            <button
              onClick={() => navigate('/sign-in')}
              className="w-full bg-sky-500 text-white py-3.5 rounded-xl text-sm font-medium hover:bg-sky-600 transition-colors flex items-center justify-center gap-2"
            >
              Go to Sign In <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="max-w-md mx-auto px-4 py-6">
        <div className="flex justify-center gap-4 text-[10px] text-slate-text/60">
          <Link to="/terms" className="hover:text-sky-600">Terms</Link>
          <span>•</span>
          <Link to="/privacy" className="hover:text-sky-600">Privacy</Link>
          <span>•</span>
          <Link to="/help" className="hover:text-sky-600">Help</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;