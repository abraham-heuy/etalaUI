// pages/SignUp.tsx
import React, { useState } from 'react';
import { 
  UserPlus,
  Users,
  ArrowRight,
  ArrowLeft,
  Loader2,
  CheckCircle,
  AlertCircle,
  Mail,
  Phone,
  Chrome,
  User,
  Info,
  Lock,
  Eye,
  EyeOff,
  Store
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import BackArrow from '../about/backArrow';

type SignUpStep = 'role' | 'details' | 'verification' | 'success';
type UserRole = 'buyer' | null; // Only buyer now
type AuthMethod = 'phone' | 'google';

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  
  // Step state
  const [currentStep, setCurrentStep] = useState<SignUpStep>('role');
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [authMethod, setAuthMethod] = useState<AuthMethod>('phone');
  
  // Form data
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // OTP
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  
  // UI states
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [otpTimer, setOtpTimer] = useState(60);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  // Handle phone formatting
  const formatPhoneNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.startsWith('254')) return cleaned;
    if (cleaned.startsWith('0')) return '254' + cleaned.slice(1);
    if (cleaned.startsWith('7') || cleaned.startsWith('1')) return '254' + cleaned;
    return cleaned;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhoneNumber(formatted);
  };

  // Handle OTP input
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

  // Start OTP timer
  const startOtpTimer = () => {
    setOtpTimer(60);
    const timer = setInterval(() => {
      setOtpTimer(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Handle role selection
  const handleRoleSelect = (role: UserRole) => {
    setUserRole(role);
  };

  // Handle continue from role
  const handleRoleContinue = () => {
    if (!userRole) {
      setError('Please select a role to continue');
      return;
    }
    setError('');
    setCurrentStep('details');
  };

  // Handle back from details
  const handleBackToRole = () => {
    setCurrentStep('role');
  };

  // Handle seller redirect
  const handleSellerClick = () => {
    navigate('/become-seller');
  };

  // Handle phone signup
  const handlePhoneSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Validation
    if (!fullName) {
      setError('Please enter your full name');
      setIsLoading(false);
      return;
    }

    if (phoneNumber.length < 10) {
      setError('Please enter a valid phone number');
      setIsLoading(false);
      return;
    }

    if (!password) {
      setError('Please enter a password');
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      setIsLoading(false);
      return;
    }

    if (!agreeToTerms) {
      setError('You must agree to the terms and conditions');
      setIsLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setCurrentStep('verification');
      startOtpTimer();
      setIsLoading(false);
    }, 1500);
  };

  // Handle Google signup
  const handleGoogleSignUp = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setAuthMethod('google');
    setError('');

    // Validate required fields for Google signup
    if (!fullName) {
      setError('Please enter your full name');
      setIsLoading(false);
      return;
    }

    if (!email) {
      setError('Please enter your email');
      setIsLoading(false);
      return;
    }

    if (!agreeToTerms) {
      setError('You must agree to the terms and conditions');
      setIsLoading(false);
      return;
    }

    // Simulate Google OAuth
    setTimeout(() => {
      setCurrentStep('success');
      setIsLoading(false);
    }, 1500);
  };

  // Handle OTP verification
  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const otpString = otp.join('');
    if (otpString.length === 6) {
      setTimeout(() => {
        setCurrentStep('success');
        setIsLoading(false);
      }, 1500);
    } else {
      setError('Please enter the 6-digit code');
      setIsLoading(false);
    }
  };

  // Handle resend OTP
  const handleResendOtp = () => {
    setIsLoading(true);
    setOtpTimer(60);
    startOtpTimer();
    setTimeout(() => {
      setSuccessMessage('New verification code sent');
      setIsLoading(false);
    }, 1500);
  };

  // Required field indicator component
  const RequiredIndicator = () => <span className="text-red-500 ml-1">*</span>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-soft-white to-warm-gray">
      {/* Header with Back Arrow */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-sky-100">
        <div className="max-w-md mx-auto px-4">
          <div className="flex items-center justify-center h-16 relative">
            <div className="absolute left-0">
              <BackArrow />
            </div>
            <h1 className="text-xl font-display font-semibold text-charcoal">
              {currentStep === 'role' && 'Create Account'}
              {currentStep === 'details' && 'Buyer Details'}
              {currentStep === 'verification' && 'Verify Phone'}
              {currentStep === 'success' && 'Welcome!'}
            </h1>
            <div className="w-10"></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-md mx-auto px-4 py-8">
        {/* Success Step */}
        {currentStep === 'success' && (
          <div className="space-y-6 animate-slide-up">
            <div className="text-center">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
              <h2 className="text-2xl font-display font-bold text-charcoal mb-2">
                Account Created!
              </h2>
              <p className="text-sm text-slate-text">
                Your buyer account has been created successfully
              </p>
            </div>

            {/* Success message */}
            <div className="bg-sky-50 rounded-xl p-4">
              <div className="flex gap-3">
                <Users className="w-5 h-5 text-sky-600 flex-shrink-0" />
                <div>
                  <p className="text-sm text-sky-800">
                    You can now start browsing and shopping on E-TALA!
                  </p>
                  <p className="text-xs text-sky-600 mt-1">
                    Complete your profile anytime in settings
                  </p>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={() => navigate('/sign-in')}
              className="w-full bg-sky-500 text-white py-3.5 rounded-xl text-sm font-medium hover:bg-sky-600 transition-colors flex items-center justify-center gap-2 mt-4"
            >
              Go to Sign In
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Role Selection Step */}
        {currentStep === 'role' && (
          <div className="space-y-6 animate-slide-up">
            <div className="text-center">
              <div className="w-20 h-20 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserPlus className="w-8 h-8 text-sky-600" />
              </div>
              <h2 className="text-2xl font-display font-bold text-charcoal mb-2">
                Join E-TALA
              </h2>
              <p className="text-sm text-slate-text">
                Choose how you want to use the platform
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-3 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-500" />
                <p className="text-xs text-red-700">{error}</p>
              </div>
            )}

            {/* Role Cards */}
            <div className="space-y-3">
              {/* Buyer Card */}
              <button
                onClick={() => handleRoleSelect('buyer')}
                className={`w-full p-5 rounded-xl border-2 transition-all text-left ${
                  userRole === 'buyer'
                    ? 'border-sky-500 bg-sky-50'
                    : 'border-sky-100 bg-white hover:border-sky-200'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    userRole === 'buyer' ? 'bg-sky-500' : 'bg-sky-100'
                  }`}>
                    <Users className={`w-6 h-6 ${
                      userRole === 'buyer' ? 'text-white' : 'text-sky-600'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-display font-semibold text-charcoal">
                      I'm a Buyer
                    </h3>
                    <p className="text-sm text-slate-text mt-1">
                      Shop for products, book services, and find local deals
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs bg-sky-100 text-sky-700 px-2 py-0.5 rounded-full">
                        Browse & Shop
                      </span>
                      <span className="text-xs bg-sky-100 text-sky-700 px-2 py-0.5 rounded-full">
                        Save Favorites
                      </span>
                    </div>
                  </div>
                  {userRole === 'buyer' && (
                    <CheckCircle className="w-5 h-5 text-sky-500" />
                  )}
                </div>
              </button>

              {/* Seller Card - Now redirects to /become-seller */}
              <button
                onClick={handleSellerClick}
                className="w-full p-5 rounded-xl border-2 border-sky-100 bg-white hover:border-sky-200 transition-all text-left group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-sky-100 flex items-center justify-center group-hover:bg-sky-200 transition-colors">
                    <Store className="w-6 h-6 text-sky-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-display font-semibold text-charcoal">
                      I'm a Seller
                    </h3>
                    <p className="text-sm text-slate-text mt-1">
                      List products, offer services, and grow your business
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs bg-sky-100 text-sky-700 px-2 py-0.5 rounded-full">
                        List Products
                      </span>
                      <span className="text-xs bg-sky-100 text-sky-700 px-2 py-0.5 rounded-full">
                        Get Verified
                      </span>
                    </div>
                    <div className="mt-2 text-xs text-sky-600 font-medium flex items-center gap-1">
                      Apply as seller →
                    </div>
                  </div>
                </div>
              </button>
            </div>

            {/* Continue Button - Only for buyers */}
            <button
              onClick={handleRoleContinue}
              disabled={!userRole}
              className="w-full bg-sky-500 text-white py-3.5 rounded-xl text-sm font-medium hover:bg-sky-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4"
            >
              Continue as Buyer
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Sign In Link */}
            <div className="text-center pt-4">
              <p className="text-xs text-slate-text">
                Already have an account?{' '}
                <Link to="/sign-in" className="text-sky-600 font-medium hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        )}

        {/* Details Step - Buyer Only */}
        {currentStep === 'details' && (
          <div className="space-y-6 animate-slide-up">
            {/* Back Button */}
            <button
              onClick={handleBackToRole}
              className="flex items-center gap-1 text-xs text-slate-text hover:text-sky-600 transition-colors"
            >
              <ArrowLeft className="w-3 h-3" />
              Change role
            </button>

            <div className="text-center">
              <div className="w-20 h-20 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-sky-600" />
              </div>
              <h2 className="text-2xl font-display font-bold text-charcoal mb-2">
                Buyer Details
              </h2>
              <p className="text-sm text-slate-text">
                Tell us a bit about yourself
              </p>
            </div>

            {/* Auth Method Toggle */}
            <div className="flex bg-sky-50 rounded-full p-1">
              <button
                onClick={() => setAuthMethod('phone')}
                className={`flex-1 py-2.5 px-4 rounded-full text-sm font-medium transition-all ${
                  authMethod === 'phone'
                    ? 'bg-white text-sky-700 shadow-sm'
                    : 'text-sky-600 hover:text-sky-700'
                }`}
              >
                <span className="flex items-center justify-center gap-2">
                  <Phone className="w-4 h-4" />
                  Phone
                </span>
              </button>
              <button
                onClick={() => setAuthMethod('google')}
                className={`flex-1 py-2.5 px-4 rounded-full text-sm font-medium transition-all ${
                  authMethod === 'google'
                    ? 'bg-white text-sky-700 shadow-sm'
                    : 'text-sky-600 hover:text-sky-700'
                }`}
              >
                <span className="flex items-center justify-center gap-2">
                  <Chrome className="w-4 h-4" />
                  Google
                </span>
              </button>
            </div>

            {/* Phone Signup Form */}
            {authMethod === 'phone' && (
              <form onSubmit={handlePhoneSignUp} className="space-y-4">
                {/* Error Message */}
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-3 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-red-500" />
                    <p className="text-xs text-red-700">{error}</p>
                  </div>
                )}

                {/* Full Name - Required */}
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-text ml-2 flex items-center">
                    Full Name
                    <RequiredIndicator />
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-text/40" />
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="John Doe"
                      className="w-full pl-10 pr-4 py-3 bg-white border border-sky-100 rounded-xl focus:outline-none focus:border-sky-300 focus:ring-4 focus:ring-sky-100 transition-all text-charcoal text-sm"
                      required
                    />
                  </div>
                </div>

                {/* Phone Number - Required */}
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-text ml-2 flex items-center">
                    Phone Number
                    <RequiredIndicator />
                  </label>
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
                    You'll receive a verification code
                  </p>
                </div>

                {/* Password - Required */}
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-text ml-2 flex items-center">
                    Password
                    <RequiredIndicator />
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-text/40" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-12 py-3 bg-white border border-sky-100 rounded-xl focus:outline-none focus:border-sky-300 focus:ring-4 focus:ring-sky-100 transition-all text-charcoal text-sm"
                      required
                      minLength={6}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-text/40 hover:text-sky-600 transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  <p className="text-[10px] text-slate-text/60 ml-2">
                    Minimum 6 characters
                  </p>
                </div>

                {/* Terms Agreement */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setAgreeToTerms(!agreeToTerms)}
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                      agreeToTerms
                        ? 'bg-sky-500 border-sky-500'
                        : 'border-slate-text/30 bg-white'
                    }`}
                  >
                    {agreeToTerms && <CheckCircle className="w-4 h-4 text-white" />}
                  </button>
                  <span className="text-xs text-slate-text">
                    I agree to the{' '}
                    <Link to="/terms" className="text-sky-600 hover:underline">
                      Terms
                    </Link>{' '}
                    and{' '}
                    <Link to="/privacy" className="text-sky-600 hover:underline">
                      Privacy Policy
                    </Link>
                    <RequiredIndicator />
                  </span>
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
                      Creating Account...
                    </>
                  ) : (
                    <>
                      Create Account
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Google Signup Form */}
            {authMethod === 'google' && (
              <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                {/* Error Message */}
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-3 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-red-500" />
                    <p className="text-xs text-red-700">{error}</p>
                  </div>
                )}

                {/* Full Name - Required */}
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-text ml-2 flex items-center">
                    Full Name
                    <RequiredIndicator />
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-text/40" />
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="John Doe"
                      className="w-full pl-10 pr-4 py-3 bg-white border border-sky-100 rounded-xl focus:outline-none focus:border-sky-300 focus:ring-4 focus:ring-sky-100 transition-all text-charcoal text-sm"
                      required
                    />
                  </div>
                </div>

                {/* Email - Required */}
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-text ml-2 flex items-center">
                    Email Address
                    <RequiredIndicator />
                  </label>
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

                {/* Google Signup Note */}
                <div className="bg-sky-50 rounded-xl p-3">
                  <p className="text-xs text-sky-700 flex items-center gap-1">
                    <Info className="w-3 h-3" />
                    You'll be able to complete your profile after Google signup
                  </p>
                </div>

                {/* Terms Agreement */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setAgreeToTerms(!agreeToTerms)}
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                      agreeToTerms
                        ? 'bg-sky-500 border-sky-500'
                        : 'border-slate-text/30 bg-white'
                    }`}
                  >
                    {agreeToTerms && <CheckCircle className="w-4 h-4 text-white" />}
                  </button>
                  <span className="text-xs text-slate-text">
                    I agree to the{' '}
                    <Link to="/terms" className="text-sky-600 hover:underline">
                      Terms
                    </Link>{' '}
                    and{' '}
                    <Link to="/privacy" className="text-sky-600 hover:underline">
                      Privacy Policy
                    </Link>
                    <RequiredIndicator />
                  </span>
                </div>

                {/* Google Sign Up Button */}
                <button
                  type="button"
                  onClick={handleGoogleSignUp}
                  disabled={isLoading}
                  className="w-full bg-white border border-sky-200 text-charcoal py-3.5 rounded-xl text-sm font-medium hover:bg-sky-50 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 mt-4"
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <Chrome className="w-5 h-5" />
                      Sign up with Google
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        )}

        {/* OTP Verification Step */}
        {currentStep === 'verification' && (
          <div className="space-y-6 animate-slide-up">
            <div className="text-center">
              <div className="w-20 h-20 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-sky-600" />
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
                <div className="bg-green-50 border border-green-200 rounded-xl p-3">
                  <p className="text-xs text-green-700">{successMessage}</p>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-3">
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
                    Verify & Create Account
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
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

export default SignUp;