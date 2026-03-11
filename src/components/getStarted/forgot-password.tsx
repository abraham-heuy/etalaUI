// pages/ForgotPassword.tsx
import React, { useState } from 'react';
import { 
  Mail,
  ArrowRight,
  ArrowLeft,
  Loader2,
  CheckCircle,
  AlertCircle,
  Smartphone,
  Key,
  Lock,
  Eye,
  EyeOff
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import BackArrow from '../about/backArrow';

type RequestStep = 'email' | 'checking' | 'sent' | 'otp' | 'reset' | 'success';
type ContactMethod = 'email' | 'sms';

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<RequestStep>('email');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [contactMethod, setContactMethod] = useState<ContactMethod>('email');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [otpTimer, setOtpTimer] = useState(60);

  // Handle email input
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  // Handle phone input
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };

  // Handle OTP input
  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  // Handle form submission (send reset instructions)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccessMessage('');
    setCurrentStep('checking');

    // Validate input
    if (contactMethod === 'email' && !email.includes('@')) {
      setError('Please enter a valid email address');
      setIsLoading(false);
      setCurrentStep('email');
      return;
    }

    if (contactMethod === 'sms' && phoneNumber.length < 10) {
      setError('Please enter a valid phone number');
      setIsLoading(false);
      setCurrentStep('email');
      return;
    }

    // Simulate API call to check if account exists
    setTimeout(() => {
      const accountExists = Math.random() > 0.2;
      
      if (accountExists) {
        if (contactMethod === 'email') {
          setSuccessMessage(
            'If an account exists with this email, we\'ve sent password reset instructions.'
          );
          setCurrentStep('sent');
        } else {
          // For SMS, go to OTP verification
          setCurrentStep('otp');
          startOtpTimer();
        }
      } else {
        // Still show appropriate message for security
        if (contactMethod === 'email') {
          setSuccessMessage(
            'If an account exists with this email, we\'ve sent password reset instructions.'
          );
          setCurrentStep('sent');
        } else {
          setCurrentStep('otp');
          startOtpTimer();
        }
      }
      setIsLoading(false);
    }, 2000);
  };

  // Handle OTP verification
  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const otpString = otp.join('');
    if (otpString.length === 6) {
      // Verify OTP
      setTimeout(() => {
        // Mock OTP verification - in real app, validate with backend
        if (otpString === '123456') {
          setCurrentStep('reset');
        } else {
          setError('Invalid verification code. Please try again.');
        }
        setIsLoading(false);
      }, 1500);
    } else {
      setError('Please enter the 6-digit code');
      setIsLoading(false);
    }
  };

  // Handle password reset
  const handleResetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Validate passwords
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      setIsLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    // Simulate password reset
    setTimeout(() => {
      setCurrentStep('success');
      setIsLoading(false);
    }, 1500);
  };

  // Start OTP timer
  const startOtpTimer = () => {
    setOtpTimer(60);
    const timer = setInterval(() => {
      setOtpTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Resend OTP
  const handleResendOtp = () => {
    setIsLoading(true);
    setOtpTimer(60);
    startOtpTimer();
    
    setTimeout(() => {
      setSuccessMessage('New verification code sent to your phone');
      setIsLoading(false);
    }, 1500);
  };

  // Handle resend instructions (email)
  const handleResendEmail = () => {
    setIsLoading(true);
    setError('');
    
    setTimeout(() => {
      setSuccessMessage('Reset instructions resent to your email.');
      setIsLoading(false);
    }, 1500);
  };

  // Handle return to sign in with phone number
  const handleReturnToSignIn = () => {
    navigate('/sign-in', { 
      state: { 
        prefilledPhone: phoneNumber,
        message: 'Password reset successful! You can now sign in.'
      } 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-soft-white to-warm-gray">
      {/* Header with Back Arrow - Centered title */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-sky-100">
        <div className="max-w-md mx-auto px-4">
          <div className="flex items-center justify-center h-16 relative">
            {/* Back arrow absolutely positioned on left */}
            <div className="absolute left-0">
              <BackArrow />
            </div>
            {/* Centered title */}
            <h1 className="text-xl font-display font-semibold text-charcoal">
              {currentStep === 'email' && 'Forgot Password'}
              {currentStep === 'checking' && 'Checking...'}
              {currentStep === 'sent' && 'Check Your Email'}
              {currentStep === 'otp' && 'Verify Code'}
              {currentStep === 'reset' && 'Reset Password'}
              {currentStep === 'success' && 'Success!'}
            </h1>
            {/* Empty div for balance */}
            <div className="w-10"></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-md mx-auto px-4 py-8">
        {/* Email/Phone Input Step */}
        {currentStep === 'email' && (
          <div className="space-y-6 animate-slide-up">
            {/* Header */}
            <div className="text-center">
              <div className="w-20 h-20 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Key className="w-8 h-8 text-sky-600" />
              </div>
              <h2 className="text-2xl font-display font-bold text-charcoal mb-2">
                Reset Your Password
              </h2>
              <p className="text-sm text-slate-text">
                Enter your email or phone number to receive reset instructions
              </p>
            </div>

            {/* Contact Method Toggle */}
            <div className="flex bg-sky-50 rounded-full p-1">
              <button
                onClick={() => setContactMethod('email')}
                className={`flex-1 py-2.5 px-4 rounded-full text-sm font-medium transition-all ${
                  contactMethod === 'email'
                    ? 'bg-white text-sky-700 shadow-sm'
                    : 'text-sky-600 hover:text-sky-700'
                }`}
              >
                <span className="flex items-center justify-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email
                </span>
              </button>
              <button
                onClick={() => setContactMethod('sms')}
                className={`flex-1 py-2.5 px-4 rounded-full text-sm font-medium transition-all ${
                  contactMethod === 'sms'
                    ? 'bg-white text-sky-700 shadow-sm'
                    : 'text-sky-600 hover:text-sky-700'
                }`}
              >
                <span className="flex items-center justify-center gap-2">
                  <Smartphone className="w-4 h-4" />
                  SMS
                </span>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-3 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                  <p className="text-xs text-red-700">{error}</p>
                </div>
              )}

              {/* Email Input */}
              {contactMethod === 'email' && (
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-text ml-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-text/40" />
                    <input
                      type="email"
                      value={email}
                      onChange={handleEmailChange}
                      placeholder="you@example.com"
                      className="w-full pl-10 pr-4 py-3 bg-white border border-sky-100 rounded-xl focus:outline-none focus:border-sky-300 focus:ring-4 focus:ring-sky-100 transition-all text-charcoal text-sm"
                      required={contactMethod === 'email'}
                    />
                  </div>
                  <p className="text-[10px] text-slate-text/60 ml-2">
                    We'll send reset instructions to this email
                  </p>
                </div>
              )}

              {/* Phone Input */}
              {contactMethod === 'sms' && (
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-text ml-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-text/40" />
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={handlePhoneChange}
                      placeholder="07XX XXX XXX"
                      className="w-full pl-10 pr-4 py-3 bg-white border border-sky-100 rounded-xl focus:outline-none focus:border-sky-300 focus:ring-4 focus:ring-sky-100 transition-all text-charcoal text-sm"
                      required={contactMethod === 'sms'}
                    />
                  </div>
                  <p className="text-[10px] text-slate-text/60 ml-2">
                    We'll send a verification code via SMS
                  </p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-sky-500 text-white py-3.5 rounded-xl text-sm font-medium hover:bg-sky-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-6"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Checking...
                  </>
                ) : (
                  <>
                    Continue
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Back to Sign In */}
            <div className="text-center pt-4">
              <Link 
                to="/signin" 
                className="text-xs text-sky-600 hover:text-sky-700 font-medium inline-flex items-center gap-1"
              >
                <ArrowLeft className="w-3 h-3" />
                Back to Sign In
              </Link>
            </div>
          </div>
        )}

        {/* Checking Step */}
        {currentStep === 'checking' && (
          <div className="flex flex-col items-center justify-center min-h-[50vh] animate-fade-in">
            <div className="w-24 h-24 bg-sky-100 rounded-full flex items-center justify-center mb-6">
              <Loader2 className="w-12 h-12 text-sky-600 animate-spin" />
            </div>
            <h2 className="text-2xl font-display font-bold text-charcoal mb-2">
              Checking Account
            </h2>
            <p className="text-sm text-slate-text text-center">
              Please wait while we verify your information...
            </p>
          </div>
        )}

        {/* Email Success/Sent Step */}
        {currentStep === 'sent' && (
          <div className="space-y-6 animate-slide-up">
            <div className="text-center">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
              <h2 className="text-2xl font-display font-bold text-charcoal mb-2">
                Check Your Email
              </h2>
              
              {/* Success Message Card */}
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 mt-4 text-left">
                <div className="flex gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-green-800 mb-2">
                      {successMessage}
                    </p>
                    <p className="text-xs text-green-700/70">
                      Didn't receive it? Check your spam folder or try again in a few minutes.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4">
              <button
                onClick={handleResendEmail}
                disabled={isLoading}
                className="w-full bg-white border border-sky-200 text-sky-700 py-3.5 rounded-xl text-sm font-medium hover:bg-sky-50 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  'Resend Instructions'
                )}
              </button>

              <Link
                to="/signin"
                className="w-full block text-center text-sm text-slate-text hover:text-sky-600 transition-colors py-2"
              >
                Return to Sign In
              </Link>
            </div>
          </div>
        )}

        {/* OTP Verification Step (for SMS) */}
        {currentStep === 'otp' && (
          <div className="space-y-6 animate-slide-up">
            <div className="text-center">
              <div className="w-20 h-20 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Smartphone className="w-8 h-8 text-sky-600" />
              </div>
              <h2 className="text-2xl font-display font-bold text-charcoal mb-2">
                Verify Your Number
              </h2>
              <p className="text-sm text-slate-text">
                We've sent a 6-digit code to{' '}
                <span className="font-medium text-charcoal">
                  {phoneNumber.slice(0, 4)}***{phoneNumber.slice(-3)}
                </span>
              </p>
            </div>

            <form onSubmit={handleOtpSubmit} className="space-y-6">
              {/* Success Message */}
              {successMessage && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-3 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <p className="text-xs text-green-700">{successMessage}</p>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-3 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                  <p className="text-xs text-red-700">{error}</p>
                </div>
              )}

              {/* OTP Input Grid */}
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

              {/* Timer & Resend */}
              <div className="text-center">
                {otpTimer > 0 ? (
                  <p className="text-xs text-slate-text">
                    Resend code in{' '}
                    <span className="font-medium text-sky-600">{otpTimer}s</span>
                  </p>
                ) : (
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={isLoading}
                    className="text-sm text-sky-600 hover:text-sky-700 font-medium"
                  >
                    Resend Code
                  </button>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || otp.join('').length !== 6}
                className="w-full bg-sky-500 text-white py-3.5 rounded-xl text-sm font-medium hover:bg-sky-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  <>
                    Verify Code
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Back to email/phone input */}
            <button
              onClick={() => setCurrentStep('email')}
              className="flex items-center gap-1 text-xs text-slate-text hover:text-sky-600 transition-colors mx-auto"
            >
              <ArrowLeft className="w-3 h-3" />
              Back
            </button>
          </div>
        )}

        {/* Reset Password Form */}
        {currentStep === 'reset' && (
          <div className="space-y-6 animate-slide-up">
            <div className="text-center">
              <div className="w-20 h-20 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-sky-600" />
              </div>
              <h2 className="text-2xl font-display font-bold text-charcoal mb-2">
                Create New Password
              </h2>
              <p className="text-sm text-slate-text">
                Enter your new password below
              </p>
            </div>

            <form onSubmit={handleResetSubmit} className="space-y-4">
              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-3 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                  <p className="text-xs text-red-700">{error}</p>
                </div>
              )}

              {/* New Password */}
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-text ml-2">
                  New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-text/40" />
                  <input
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-12 py-3 bg-white border border-sky-100 rounded-xl focus:outline-none focus:border-sky-300 focus:ring-4 focus:ring-sky-100 transition-all text-charcoal text-sm"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-text/40 hover:text-sky-600 transition-colors"
                  >
                    {showNewPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-text ml-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-text/40" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-12 py-3 bg-white border border-sky-100 rounded-xl focus:outline-none focus:border-sky-300 focus:ring-4 focus:ring-sky-100 transition-all text-charcoal text-sm"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-text/40 hover:text-sky-600 transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Password Requirements */}
              <div className="bg-sky-50 rounded-xl p-3">
                <p className="text-xs text-slate-text">
                  Password must be at least 6 characters long
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-sky-500 text-white py-3.5 rounded-xl text-sm font-medium hover:bg-sky-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Resetting...
                  </>
                ) : (
                  <>
                    Reset Password
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        {/* Success Step */}
        {currentStep === 'success' && (
          <div className="space-y-6 animate-slide-up">
            <div className="text-center">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
              <h2 className="text-2xl font-display font-bold text-charcoal mb-2">
                Password Reset!
              </h2>
              <p className="text-sm text-slate-text">
                Your password has been successfully reset
              </p>
            </div>

            {/* Success Card */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <Smartphone className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-sm text-green-800">
                    You can now sign in with your new password
                  </p>
                  {phoneNumber && (
                    <p className="text-xs text-green-700 mt-1">
                      Using: {phoneNumber.slice(0, 4)}***{phoneNumber.slice(-3)}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Return to Sign In Button */}
            <button
              onClick={handleReturnToSignIn}
              className="w-full bg-sky-500 text-white py-3.5 rounded-xl text-sm font-medium hover:bg-sky-600 transition-colors flex items-center justify-center gap-2 mt-4"
            >
              Go to Sign In
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="max-w-md mx-auto px-4 py-6">
        <div className="flex justify-center gap-4 text-[10px] text-slate-text/60">
          <Link to="/terms" className="hover:text-sky-600 transition-colors">
            Terms
          </Link>
          <span>•</span>
          <Link to="/privacy" className="hover:text-sky-600 transition-colors">
            Privacy
          </Link>
          <span>•</span>
          <Link to="/help" className="hover:text-sky-600 transition-colors">
            Help
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;