// pages/partner.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft,
  Handshake,
  Building2,
  Users,
  Briefcase,
  Package,
  ArrowRight,
  CheckCircle,
  Send,
  Loader2,
  Globe,
  FileText
} from 'lucide-react';
import BackArrow from '../components/about/backArrow';

type PartnerType = 'supplier' | 'investor' | 'corporate' | 'ngo' | 'media' | 'other';

interface PartnerFormData {
  partnerType: PartnerType | '';
  organizationName: string;
  contactName: string;
  email: string;
  phone: string;
  website?: string;
  country: string;
  city: string;
  partnershipGoals: string;
  additionalInfo?: string;
  agreeToTerms: boolean;
}

const PartnerPage: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<PartnerFormData>({
    partnerType: '',
    organizationName: '',
    contactName: '',
    email: '',
    phone: '',
    website: '',
    country: 'Kenya',
    city: '',
    partnershipGoals: '',
    additionalInfo: '',
    agreeToTerms: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const partnerTypes = [
    { 
      id: 'supplier', 
      name: 'Supplier / Vendor', 
      icon: Package, 
      description: 'Supply products or services to our marketplace',
      color: 'from-blue-400 to-indigo-500'
    },
    { 
      id: 'investor', 
      name: 'Investor', 
      icon: Briefcase, 
      description: 'Investment opportunities and funding',
      color: 'from-green-400 to-emerald-500'
    },
    { 
      id: 'corporate', 
      name: 'Corporate Partner', 
      icon: Building2, 
      description: 'Bulk purchasing, employee benefits, corporate events',
      color: 'from-purple-400 to-violet-500'
    },
    { 
      id: 'ngo', 
      name: 'NGO / Non-Profit', 
      icon: Users, 
      description: 'Community programs, aid distribution, partnerships',
      color: 'from-amber-400 to-orange-500'
    },
    { 
      id: 'media', 
      name: 'Media / Influencer', 
      icon: Globe, 
      description: 'Promotion, content creation, brand awareness',
      color: 'from-pink-400 to-rose-500'
    },
    { 
      id: 'other', 
      name: 'Other Partnership', 
      icon: Handshake, 
      description: 'Other types of collaboration',
      color: 'from-slate-400 to-gray-500'
    },
  ];

  const validateStep = (stepNum: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (stepNum === 1) {
      if (!formData.partnerType) newErrors.partnerType = 'Please select a partnership type';
    } else if (stepNum === 2) {
      if (!formData.organizationName.trim()) newErrors.organizationName = 'Organization name is required';
      if (!formData.contactName.trim()) newErrors.contactName = 'Contact person name is required';
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Email is invalid';
      }
      if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
      if (!formData.city.trim()) newErrors.city = 'City is required';
    } else if (stepNum === 3) {
      if (!formData.partnershipGoals.trim()) newErrors.partnershipGoals = 'Please describe your partnership goals';
      if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    setStep(prev => prev - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async () => {
    if (!validateStep(3)) return;

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Partnership application:', formData);
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-soft-white">
        <div className="max-w-md mx-auto px-4 py-12">
          <div className="bg-white rounded-2xl border border-green-100 p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Handshake className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-2xl font-display font-bold text-charcoal mb-2">
              Partnership Request Sent!
            </h1>
            <p className="text-sm text-slate-text mb-4">
              Thank you for your interest in partnering with E-TALA. Our partnerships team will review your request and contact you within 2-3 business days.
            </p>
            <div className="bg-green-50 rounded-lg p-3 mb-4 text-left">
              <p className="text-xs text-green-700">
                <span className="font-bold">Next steps:</span> We'll email you at {formData.email} to schedule a discussion about your partnership goals.
              </p>
            </div>
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-redbull-blue text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-redbull-blue/90"
            >
              Return to Home
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-soft-white">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-sky-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="flex items-center h-16">
            <BackArrow />
            <h1 className="ml-4 text-lg font-display font-semibold text-charcoal">
              Partner with E-TALA
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        {/* Step Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between max-w-md mx-auto">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    s < step
                      ? 'bg-green-600 text-white'
                      : s === step
                      ? 'bg-redbull-blue text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {s < step ? <CheckCircle className="w-4 h-4" /> : s}
                </div>
                {s < 3 && (
                  <div className={`w-12 sm:w-16 h-1 mx-1 sm:mx-2 ${
                    s < step ? 'bg-green-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between max-w-md mx-auto mt-2 text-[10px] sm:text-xs text-slate-text px-1">
            <span>Type</span>
            <span>Details</span>
            <span>Goals</span>
          </div>
        </div>

        {/* Step 1: Partnership Type */}
        {step === 1 && (
          <div className="bg-white rounded-xl border border-sky-100 p-6">
            <h2 className="text-lg font-display font-semibold text-charcoal mb-4 flex items-center gap-2">
              <Handshake className="w-5 h-5 text-redbull-blue" />
              Select Partnership Type
            </h2>

            <div className="space-y-3">
              {partnerTypes.map((type) => {
                const Icon = type.icon;
                const isSelected = formData.partnerType === type.id;
                return (
                  <button
                    key={type.id}
                    onClick={() => setFormData({ ...formData, partnerType: type.id as PartnerType })}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                      isSelected
                        ? `border-redbull-blue bg-gradient-to-r ${type.color} bg-opacity-5`
                        : 'border-sky-200 hover:border-redbull-blue/50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        isSelected ? 'bg-white' : 'bg-sky-100'
                      }`}>
                        <Icon className={`w-5 h-5 ${
                          isSelected ? 'text-redbull-blue' : 'text-sky-600'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-base font-display font-semibold text-charcoal">
                          {type.name}
                        </h3>
                        <p className="text-sm text-slate-text">{type.description}</p>
                      </div>
                      {isSelected && (
                        <CheckCircle className="w-5 h-5 text-redbull-blue" />
                      )}
                    </div>
                  </button>
                );
              })}
              {errors.partnerType && (
                <p className="text-xs text-red-600 mt-2">{errors.partnerType}</p>
              )}
            </div>
          </div>
        )}

        {/* Step 2: Organization Details */}
        {step === 2 && (
          <div className="bg-white rounded-xl border border-sky-100 p-6">
            <h2 className="text-lg font-display font-semibold text-charcoal mb-4 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-redbull-blue" />
              Organization Details
            </h2>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-charcoal mb-1 block">
                  Organization Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.organizationName}
                  onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })}
                  placeholder="e.g., ABC Company Ltd"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.organizationName
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                      : 'border-sky-200 focus:border-redbull-blue focus:ring-redbull-blue/20'
                  }`}
                />
                {errors.organizationName && (
                  <p className="text-xs text-red-600 mt-1">{errors.organizationName}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-charcoal mb-1 block">
                  Contact Person <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.contactName}
                  onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                  placeholder="Full name"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.contactName
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                      : 'border-sky-200 focus:border-redbull-blue focus:ring-redbull-blue/20'
                  }`}
                />
                {errors.contactName && (
                  <p className="text-xs text-red-600 mt-1">{errors.contactName}</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-charcoal mb-1 block">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="you@example.com"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.email
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                        : 'border-sky-200 focus:border-redbull-blue focus:ring-redbull-blue/20'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-xs text-red-600 mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium text-charcoal mb-1 block">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+254 712 345 678"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.phone
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                        : 'border-sky-200 focus:border-redbull-blue focus:ring-redbull-blue/20'
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-xs text-red-600 mt-1">{errors.phone}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-charcoal mb-1 block">
                  Website (Optional)
                </label>
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  placeholder="https://example.com"
                  className="w-full px-4 py-2 border border-sky-200 rounded-lg focus:outline-none focus:border-redbull-blue"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-charcoal mb-1 block">
                    Country <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full px-4 py-2 border border-sky-200 rounded-lg focus:outline-none focus:border-redbull-blue"
                  >
                    <option value="Kenya">Kenya</option>
                    <option value="Uganda">Uganda</option>
                    <option value="Tanzania">Tanzania</option>
                    <option value="Rwanda">Rwanda</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-charcoal mb-1 block">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="e.g., Nairobi"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.city
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                        : 'border-sky-200 focus:border-redbull-blue focus:ring-redbull-blue/20'
                    }`}
                  />
                  {errors.city && (
                    <p className="text-xs text-red-600 mt-1">{errors.city}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Partnership Goals */}
        {step === 3 && (
          <div className="bg-white rounded-xl border border-sky-100 p-6">
            <h2 className="text-lg font-display font-semibold text-charcoal mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-redbull-blue" />
              Partnership Goals
            </h2>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-charcoal mb-1 block">
                  What are your partnership goals? <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.partnershipGoals}
                  onChange={(e) => setFormData({ ...formData, partnershipGoals: e.target.value })}
                  rows={4}
                  placeholder="Tell us about what you'd like to achieve through this partnership..."
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.partnershipGoals
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                      : 'border-sky-200 focus:border-redbull-blue focus:ring-redbull-blue/20'
                  }`}
                />
                {errors.partnershipGoals && (
                  <p className="text-xs text-red-600 mt-1">{errors.partnershipGoals}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-charcoal mb-1 block">
                  Additional Information (Optional)
                </label>
                <textarea
                  value={formData.additionalInfo}
                  onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                  rows={3}
                  placeholder="Any other details you'd like to share..."
                  className="w-full px-4 py-2 border border-sky-200 rounded-lg focus:outline-none focus:border-redbull-blue"
                />
              </div>

              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-charcoal mb-2">What happens next?</h3>
                <ul className="space-y-2 text-xs text-slate-text">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                    <span>Our partnerships team reviews your request (1-2 business days)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                    <span>We schedule a call to discuss potential collaboration</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                    <span>Together we create a customized partnership plan</span>
                  </li>
                </ul>
              </div>

              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  id="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={(e) => setFormData({ ...formData, agreeToTerms: e.target.checked })}
                  className="mt-1 rounded text-redbull-blue focus:ring-redbull-blue"
                />
                <div>
                  <label htmlFor="agreeToTerms" className="text-sm text-charcoal">
                    I agree to the partnership terms and conditions <span className="text-red-500">*</span>
                  </label>
                  <p className="text-xs text-slate-text">
                    By submitting, you agree to our partner privacy policy and terms of collaboration.
                  </p>
                </div>
              </div>
              {errors.agreeToTerms && (
                <p className="text-xs text-red-600">{errors.agreeToTerms}</p>
              )}
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          {step > 1 ? (
            <button
              onClick={prevStep}
              className="px-6 py-2 border border-sky-200 text-slate-text rounded-lg hover:bg-sky-50 flex items-center gap-2 text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
          ) : (
            <div />
          )}

          {step < 3 ? (
            <button
              onClick={nextStep}
              className="px-6 py-2 bg-redbull-blue text-white rounded-lg hover:bg-redbull-blue/90 flex items-center gap-2 text-sm"
            >
              Continue
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2 text-sm disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Submit Partnership Request
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PartnerPage;