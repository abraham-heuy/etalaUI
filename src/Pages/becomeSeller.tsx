// pages/become-seller/index.tsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft,
  Check,
  User,
  Store,
  FileText,
  MapPin,
  Shield,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Save,
  Upload,
  X,
  Briefcase,
  Package,
  Wheat,
  Bike,
  Wrench,
  Coffee,
  Hotel} from 'lucide-react';
import ConfirmModal from '../common/ConfirmModal';

type SellerCategory = 
  | 'marketplace' 
  | 'farmers' 
  | 'boda' 
  | 'services' 
  | 'food' 
  | 'stays'
  | 'other';

type VerificationMethod = 'documents' | 'physical' | 'games';

interface BusinessQuestion {
  id: string;
  question: string;
  type: 'text' | 'textarea' | 'select' | 'multiselect';
  options?: string[];
  required: boolean;
  placeholder?: string;
}

const BecomeSellerPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form data
  const [personalInfo, setPersonalInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
    idNumber: '',
    address: '',
    city: '',
  });

  const [selectedCategory, setSelectedCategory] = useState<SellerCategory | ''>('');
  const [otherCategory, setOtherCategory] = useState('');

  const [businessAnswers, setBusinessAnswers] = useState<Record<string, string>>({});

  const [verificationMethod, setVerificationMethod] = useState<VerificationMethod | ''>('');
  const [documents, setDocuments] = useState<File[]>([]);
  const [documentPreviews, setDocumentPreviews] = useState<string[]>([]);
  const [physicalAddress, setPhysicalAddress] = useState({
    businessName: '',
    businessAddress: '',
    businessPhone: '',
    businessEmail: '',
    preferredDate: '',
    preferredTime: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Category options with icons
  const categories = [
    { id: 'marketplace', name: 'Marketplace', icon: Package, description: 'Sell electronics, fashion, household items' },
    { id: 'farmers', name: 'Farmers Market', icon: Wheat, description: 'Fresh produce, dairy, meat, grains' },
    { id: 'boda', name: 'Boda Rides', icon: Bike, description: 'Transportation and delivery services' },
    { id: 'services', name: 'Services', icon: Wrench, description: 'Salons, repairs, cleaning, professional services' },
    { id: 'food', name: 'Food & Restaurants', icon: Coffee, description: 'Restaurants, catering, food delivery' },
    { id: 'stays', name: 'Stays', icon: Hotel, description: 'Hotels, Airbnbs, guest houses, campsites' },
    { id: 'other', name: 'Other', icon: Briefcase, description: 'Other business types' },
  ];


const getBusinessQuestions = (): BusinessQuestion[] => {
    const baseQuestions: BusinessQuestion[] = [
      {
        id: 'businessName',
        question: 'What is your business name?',
        type: 'text',
        required: true,
        placeholder: 'e.g., Mama Lucy\'s Farm',
      },
      {
        id: 'businessDescription',
        question: 'Describe your business',
        type: 'textarea',
        required: true,
        placeholder: 'Tell us about what you sell or the services you offer...',
      },
    ];
  
    const categorySpecific: Record<SellerCategory, BusinessQuestion[]> = {
      marketplace: [
        {
          id: 'productTypes',
          question: 'What types of products do you sell?',
          type: 'multiselect',
          options: ['Electronics', 'Fashion', 'Household', 'Hardware', 'Pharmacy', 'Baby & Kids', 'Other'],
          required: true,
        },
        {
          id: 'inventorySource',
          question: 'Where do you source your products?',
          type: 'select',
          options: ['Local suppliers', 'Imported', 'Self-made', 'Mixed'],
          required: true,
        },
      ],
      farmers: [
        {
          id: 'farmSize',
          question: 'What is the size of your farm?',
          type: 'text',
          required: true,
          placeholder: 'e.g., 5 acres',
        },
        {
          id: 'produceTypes',
          question: 'What types of produce do you grow?',
          type: 'multiselect',
          options: ['Vegetables', 'Fruits', 'Dairy', 'Meat', 'Grains', 'Honey', 'Other'],
          required: true,
        },
        {
          id: 'organic',
          question: 'Are you certified organic?',
          type: 'select',
          options: ['Yes', 'No', 'In progress'],
          required: true,
        },
      ],
      boda: [
        {
          id: 'vehicleType',
          question: 'What type of vehicle do you use?',
          type: 'select',
          options: ['Motorcycle', 'Bicycle', 'Car', 'Tuk Tuk', 'Pickup'],
          required: true,
        },
        {
          id: 'licenseNumber',
          question: 'What is your driving license number?',
          type: 'text',
          required: true,
          placeholder: 'License number',
        },
        {
          id: 'insurance',
          question: 'Do you have insurance?',
          type: 'select',
          options: ['Yes', 'No', 'In progress'],
          required: true,
        },
      ],
      services: [
        {
          id: 'serviceTypes',
          question: 'What services do you offer?',
          type: 'multiselect',
          options: ['Salon/Barber', 'Cyber Cafe', 'Plumbing', 'Electrical', 'Cleaning', 'Repairs', 'Other'],
          required: true,
        },
        {
          id: 'qualifications',
          question: 'Do you have any professional qualifications?',
          type: 'textarea',
          required: false,
          placeholder: 'e.g., certificates, training...',
        },
      ],
      food: [
        {
          id: 'cuisineType',
          question: 'What type of cuisine do you offer?',
          type: 'select',
          options: ['Local', 'Fast Food', 'Cafe', 'Hotel', 'Catering', 'Other'],
          required: true,
        },
        {
          id: 'foodLicense',
          question: 'Do you have a food handling license?',
          type: 'select',
          options: ['Yes', 'No', 'In progress'],
          required: true,
        },
      ],
      stays: [
        {
          id: 'propertyType',
          question: 'What type of accommodation do you offer?',
          type: 'select',
          options: ['Hotel', 'Airbnb', 'Guest House', 'Campsite', 'Other'],
          required: true,
        },
        {
          id: 'capacity',
          question: 'How many guests can you accommodate?',
          type: 'text',
          required: true,
          placeholder: 'e.g., 20 guests',
        },
      ],
      other: [
        {
          id: 'businessType',
          question: 'Please describe your business type',
          type: 'textarea',
          required: true,
          placeholder: 'Tell us about your business...',
        },
      ],
    };
  
    // If no category selected, return only base questions
    if (!selectedCategory) {
      return baseQuestions;
    }
  
    // If category is selected, return base + category-specific questions
    return [...baseQuestions, ...categorySpecific[selectedCategory]];
  };

  const businessQuestions = getBusinessQuestions();

  // Validation
  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (!personalInfo.fullName.trim()) newErrors.fullName = 'Full name is required';
        if (!personalInfo.email.trim()) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(personalInfo.email)) newErrors.email = 'Email is invalid';
        if (!personalInfo.phone.trim()) newErrors.phone = 'Phone number is required';
        if (!personalInfo.idNumber.trim()) newErrors.idNumber = 'ID/Passport number is required';
        if (!personalInfo.address.trim()) newErrors.address = 'Address is required';
        if (!personalInfo.city.trim()) newErrors.city = 'City/Town is required';
        break;

      case 2:
        if (!selectedCategory) newErrors.category = 'Please select a category';
        else if (selectedCategory === 'other' && !otherCategory.trim()) {
          newErrors.otherCategory = 'Please specify your business type';
        }
        break;

      case 3:
        businessQuestions.forEach(q => {
          if (q.required && !businessAnswers[q.id]?.trim()) {
            newErrors[q.id] = 'This field is required';
          }
        });
        break;

      case 4:
        if (!verificationMethod) newErrors.verification = 'Please select a verification method';
        else if (verificationMethod === 'documents' && documents.length === 0) {
          newErrors.documents = 'Please upload at least one document';
        } else if (verificationMethod === 'physical') {
          if (!physicalAddress.businessName) newErrors.businessName = 'Business name is required';
          if (!physicalAddress.businessAddress) newErrors.businessAddress = 'Business address is required';
          if (!physicalAddress.businessPhone) newErrors.businessPhone = 'Business phone is required';
          if (!physicalAddress.businessEmail) newErrors.businessEmail = 'Business email is required';
          if (!physicalAddress.preferredDate) newErrors.preferredDate = 'Preferred date is required';
          if (!physicalAddress.preferredTime) newErrors.preferredTime = 'Preferred time is required';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle document upload
  const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter(file => 
      file.type === 'application/pdf' || 
      file.type.startsWith('image/')
    );
    
    const newPreviews = validFiles.map(file => URL.createObjectURL(file));
    
    setDocuments(prev => [...prev, ...validFiles]);
    setDocumentPreviews(prev => [...prev, ...newPreviews]);
  };

  const removeDocument = (index: number) => {
    URL.revokeObjectURL(documentPreviews[index]);
    setDocuments(prev => prev.filter((_, i) => i !== index));
    setDocumentPreviews(prev => prev.filter((_, i) => i !== index));
  };

  // Submit application
  const handleSubmit = async () => {
    if (!validateStep(4)) return;

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Application submitted:', {
        personalInfo,
        category: selectedCategory === 'other' ? otherCategory : selectedCategory,
        businessAnswers,
        verificationMethod,
        documents: verificationMethod === 'documents' ? documents : [],
        physicalAddress: verificationMethod === 'physical' ? physicalAddress : null,
      });

      setIsSubmitting(false);
      setShowSuccessModal(true);
    }, 2000);
  };

  const StepIndicator = () => (
    <div className="w-full overflow-x-auto pb-2 scrollbar-hide">
      <div className="flex items-center justify-between min-w-[400px] max-w-md mx-auto">
        {[1, 2, 3, 4].map((step) => (
          <div key={step} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 ${
                step < currentStep
                  ? 'bg-green-600 text-white'
                  : step === currentStep
                  ? 'bg-redbull-blue text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}
            >
              {step < currentStep ? <Check className="w-4 h-4" /> : step}
            </div>
            {step < 4 && (
              <div className={`w-12 sm:w-16 h-1 mx-1 sm:mx-2 ${
                step < currentStep ? 'bg-green-600' : 'bg-gray-200'
              }`} />
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-between max-w-md mx-auto mt-2 text-[10px] sm:text-xs text-slate-text px-1">
        <span>Personal</span>
        <span>Category</span>
        <span>Business</span>
        <span>Verify</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-soft-white">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-sky-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="flex items-center h-16">
            <Link
              to="/"
              className="p-2 rounded-full bg-sky-50 text-slate-text hover:text-redbull-blue hover:bg-sky-100 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="ml-4 text-lg font-display font-semibold text-charcoal">
              Become a Seller
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <StepIndicator />

        {/* Step 1: Personal Information */}
        {currentStep === 1 && (
          <div className="bg-white rounded-xl border border-sky-100 p-6 mt-6">
            <h2 className="text-lg font-display font-semibold text-charcoal mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-redbull-blue" />
              Personal Information
            </h2>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-charcoal mb-1 block">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={personalInfo.fullName}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, fullName: e.target.value })}
                  placeholder="John Doe"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.fullName
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                      : 'border-sky-200 focus:border-redbull-blue focus:ring-redbull-blue/20'
                  }`}
                />
                {errors.fullName && (
                  <p className="text-xs text-red-600 mt-1">{errors.fullName}</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-charcoal mb-1 block">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={personalInfo.email}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                    placeholder="john@example.com"
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
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={personalInfo.phone}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                    placeholder="07XX XXX XXX"
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
                  ID/Passport Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={personalInfo.idNumber}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, idNumber: e.target.value })}
                  placeholder="12345678"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.idNumber
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                      : 'border-sky-200 focus:border-redbull-blue focus:ring-redbull-blue/20'
                  }`}
                />
                {errors.idNumber && (
                  <p className="text-xs text-red-600 mt-1">{errors.idNumber}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-charcoal mb-1 block">
                  Physical Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={personalInfo.address}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, address: e.target.value })}
                  placeholder="Street address"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.address
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                      : 'border-sky-200 focus:border-redbull-blue focus:ring-redbull-blue/20'
                  }`}
                />
                {errors.address && (
                  <p className="text-xs text-red-600 mt-1">{errors.address}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-charcoal mb-1 block">
                  City/Town <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={personalInfo.city}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, city: e.target.value })}
                  placeholder="Tala Town"
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
        )}

        {/* Step 2: Choose Category */}
        {currentStep === 2 && (
          <div className="bg-white rounded-xl border border-sky-100 p-6 mt-6">
            <h2 className="text-lg font-display font-semibold text-charcoal mb-4 flex items-center gap-2">
              <Store className="w-5 h-5 text-redbull-blue" />
              Choose Your Category
            </h2>
            <p className="text-sm text-slate-text mb-4">
              Select the category that best describes your business. You can only choose one.
            </p>

            <div className="space-y-3">
              {categories.map((cat) => {
                const Icon = cat.icon;
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id as SellerCategory)}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                      isSelected
                        ? 'border-redbull-blue bg-redbull-blue/5'
                        : 'border-sky-200 hover:border-redbull-blue/50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        isSelected ? 'bg-redbull-blue' : 'bg-sky-100'
                      }`}>
                        <Icon className={`w-5 h-5 ${
                          isSelected ? 'text-white' : 'text-redbull-blue'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-base font-display font-semibold text-charcoal">
                          {cat.name}
                        </h3>
                        <p className="text-sm text-slate-text">{cat.description}</p>
                      </div>
                      {isSelected && (
                        <Check className="w-5 h-5 text-redbull-blue" />
                      )}
                    </div>
                  </button>
                );
              })}

              {selectedCategory === 'other' && (
                <div className="mt-3">
                  <label className="text-sm font-medium text-charcoal mb-1 block">
                    Please specify your business type <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={otherCategory}
                    onChange={(e) => setOtherCategory(e.target.value)}
                    placeholder="e.g., Handicrafts, Art, etc."
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.otherCategory
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                        : 'border-sky-200 focus:border-redbull-blue focus:ring-redbull-blue/20'
                    }`}
                  />
                  {errors.otherCategory && (
                    <p className="text-xs text-red-600 mt-1">{errors.otherCategory}</p>
                  )}
                </div>
              )}

              {errors.category && (
                <p className="text-xs text-red-600 mt-2">{errors.category}</p>
              )}
            </div>
          </div>
        )}

        {/* Step 3: Business Questions */}
        {currentStep === 3 && selectedCategory && (
          <div className="bg-white rounded-xl border border-sky-100 p-6 mt-6">
            <h2 className="text-lg font-display font-semibold text-charcoal mb-4 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-redbull-blue" />
              Business Details
            </h2>
            <p className="text-sm text-slate-text mb-4">
              Tell us more about your business
            </p>

            <div className="space-y-4">
              {businessQuestions.map((q) => (
                <div key={q.id}>
                  <label className="text-sm font-medium text-charcoal mb-1 block">
                    {q.question} {q.required && <span className="text-red-500">*</span>}
                  </label>

                  {q.type === 'text' && (
                    <input
                      type="text"
                      value={businessAnswers[q.id] || ''}
                      onChange={(e) => setBusinessAnswers({
                        ...businessAnswers,
                        [q.id]: e.target.value
                      })}
                      placeholder={q.placeholder}
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                        errors[q.id]
                          ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                          : 'border-sky-200 focus:border-redbull-blue focus:ring-redbull-blue/20'
                      }`}
                    />
                  )}

                  {q.type === 'textarea' && (
                    <textarea
                      value={businessAnswers[q.id] || ''}
                      onChange={(e) => setBusinessAnswers({
                        ...businessAnswers,
                        [q.id]: e.target.value
                      })}
                      placeholder={q.placeholder}
                      rows={3}
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                        errors[q.id]
                          ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                          : 'border-sky-200 focus:border-redbull-blue focus:ring-redbull-blue/20'
                      }`}
                    />
                  )}

                  {q.type === 'select' && q.options && (
                    <select
                      value={businessAnswers[q.id] || ''}
                      onChange={(e) => setBusinessAnswers({
                        ...businessAnswers,
                        [q.id]: e.target.value
                      })}
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                        errors[q.id]
                          ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                          : 'border-sky-200 focus:border-redbull-blue focus:ring-redbull-blue/20'
                      }`}
                    >
                      <option value="">Select an option</option>
                      {q.options.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  )}

                  {q.type === 'multiselect' && q.options && (
                    <div className="space-y-2">
                      {q.options.map(opt => (
                        <label key={opt} className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            value={opt}
                            checked={businessAnswers[q.id]?.includes(opt)}
                            onChange={(e) => {
                              const current = businessAnswers[q.id]?.split(',') || [];
                              const updated = e.target.checked
                                ? [...current, opt]
                                : current.filter(v => v !== opt);
                              setBusinessAnswers({
                                ...businessAnswers,
                                [q.id]: updated.join(',')
                              });
                            }}
                            className="rounded text-redbull-blue focus:ring-redbull-blue"
                          />
                          <span className="text-sm text-slate-text">{opt}</span>
                        </label>
                      ))}
                    </div>
                  )}

                  {errors[q.id] && (
                    <p className="text-xs text-red-600 mt-1">{errors[q.id]}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Verification Method */}
        {currentStep === 4 && (
          <div className="bg-white rounded-xl border border-sky-100 p-6 mt-6">
            <h2 className="text-lg font-display font-semibold text-charcoal mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-redbull-blue" />
              Verification Method
            </h2>
            <p className="text-sm text-slate-text mb-4">
              Choose how you'd like to verify your business
            </p>

            <div className="space-y-4">
              {/* Option 1: Documents */}
              <button
                onClick={() => setVerificationMethod('documents')}
                className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                  verificationMethod === 'documents'
                    ? 'border-redbull-blue bg-redbull-blue/5'
                    : 'border-sky-200 hover:border-redbull-blue/50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    verificationMethod === 'documents' ? 'bg-redbull-blue' : 'bg-sky-100'
                  }`}>
                    <FileText className={`w-5 h-5 ${
                      verificationMethod === 'documents' ? 'text-white' : 'text-redbull-blue'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-display font-semibold text-charcoal">
                      Upload Documents
                    </h3>
                    <p className="text-sm text-slate-text">
                      Upload business permit, license, or other documents
                    </p>
                    <p className="text-xs text-green-600 mt-1">✓ Instant processing</p>
                  </div>
                </div>
              </button>

              {/* Option 2: Physical Visit */}
              <button
                onClick={() => setVerificationMethod('physical')}
                className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                  verificationMethod === 'physical'
                    ? 'border-redbull-blue bg-redbull-blue/5'
                    : 'border-sky-200 hover:border-redbull-blue/50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    verificationMethod === 'physical' ? 'bg-redbull-blue' : 'bg-sky-100'
                  }`}>
                    <MapPin className={`w-5 h-5 ${
                      verificationMethod === 'physical' ? 'text-white' : 'text-redbull-blue'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-display font-semibold text-charcoal">
                      Physical Visit
                    </h3>
                    <p className="text-sm text-slate-text">
                      Schedule a visit from our verification team
                    </p>
                    <p className="text-xs text-amber-600 mt-1">⏳ Takes 2-3 business days</p>
                  </div>
                </div>
              </button>

              {/* Option 3: Play Games */}
              <button
                onClick={() => setVerificationMethod('games')}
                className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                  verificationMethod === 'games'
                    ? 'border-redbull-blue bg-redbull-blue/5'
                    : 'border-sky-200 hover:border-redbull-blue/50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    verificationMethod === 'games' ? 'bg-redbull-blue' : 'bg-sky-100'
                  }`}>
                    <Sparkles className={`w-5 h-5 ${
                      verificationMethod === 'games' ? 'text-white' : 'text-redbull-blue'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-display font-semibold text-charcoal">
                      Play & Save
                    </h3>
                    <p className="text-sm text-slate-text">
                      Play fun games and earn up to 80% off verification
                    </p>
                    <p className="text-xs text-purple-600 mt-1">✨ Instant discount</p>
                  </div>
                </div>
              </button>

              {errors.verification && (
                <p className="text-xs text-red-600 mt-2">{errors.verification}</p>
              )}

              {/* Document Upload Section */}
              {verificationMethod === 'documents' && (
                <div className="mt-4 pt-4 border-t border-sky-100">
                  <label className="text-sm font-medium text-charcoal mb-2 block">
                    Upload Documents
                  </label>
                  
                  <div className="border-2 border-dashed border-sky-200 rounded-xl p-6 text-center hover:border-redbull-blue transition-colors mb-4">
                    <input
                      type="file"
                      multiple
                      accept=".pdf,image/*"
                      onChange={handleDocumentUpload}
                      className="hidden"
                      id="document-upload"
                    />
                    <label htmlFor="document-upload" className="cursor-pointer">
                      <Upload className="w-8 h-8 text-slate-text/40 mx-auto mb-2" />
                      <p className="text-sm text-charcoal font-medium">Click to upload</p>
                      <p className="text-xs text-slate-text mt-1">PDF or images, up to 10MB</p>
                    </label>
                  </div>

                  {errors.documents && (
                    <p className="text-xs text-red-600 mb-3">{errors.documents}</p>
                  )}

                  {documentPreviews.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-charcoal">Uploaded Files</p>
                      {documentPreviews.map((_preview, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-sky-50 rounded-lg">
                          <span className="text-sm text-slate-text truncate flex-1">
                            Document {index + 1}
                          </span>
                          <button
                            onClick={() => removeDocument(index)}
                            className="p-1 text-red-600 hover:bg-red-50 rounded"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Physical Visit Form */}
              {verificationMethod === 'physical' && (
                <div className="mt-4 pt-4 border-t border-sky-100 space-y-4">
                  <div>
                    <label className="text-sm font-medium text-charcoal mb-1 block">
                      Business Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={physicalAddress.businessName}
                      onChange={(e) => setPhysicalAddress({
                        ...physicalAddress,
                        businessName: e.target.value
                      })}
                      placeholder="Your Business Name"
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                        errors.businessName
                          ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                          : 'border-sky-200 focus:border-redbull-blue focus:ring-redbull-blue/20'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-charcoal mb-1 block">
                      Business Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={physicalAddress.businessAddress}
                      onChange={(e) => setPhysicalAddress({
                        ...physicalAddress,
                        businessAddress: e.target.value
                      })}
                      placeholder="Street address"
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                        errors.businessAddress
                          ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                          : 'border-sky-200 focus:border-redbull-blue focus:ring-redbull-blue/20'
                      }`}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-charcoal mb-1 block">
                        Business Phone <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        value={physicalAddress.businessPhone}
                        onChange={(e) => setPhysicalAddress({
                          ...physicalAddress,
                          businessPhone: e.target.value
                        })}
                        placeholder="07XX XXX XXX"
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                          errors.businessPhone
                            ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                            : 'border-sky-200 focus:border-redbull-blue focus:ring-redbull-blue/20'
                        }`}
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-charcoal mb-1 block">
                        Business Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        value={physicalAddress.businessEmail}
                        onChange={(e) => setPhysicalAddress({
                          ...physicalAddress,
                          businessEmail: e.target.value
                        })}
                        placeholder="business@example.com"
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                          errors.businessEmail
                            ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                            : 'border-sky-200 focus:border-redbull-blue focus:ring-redbull-blue/20'
                        }`}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-charcoal mb-1 block">
                        Preferred Date <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        value={physicalAddress.preferredDate}
                        onChange={(e) => setPhysicalAddress({
                          ...physicalAddress,
                          preferredDate: e.target.value
                        })}
                        min={new Date().toISOString().split('T')[0]}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                          errors.preferredDate
                            ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                            : 'border-sky-200 focus:border-redbull-blue focus:ring-redbull-blue/20'
                        }`}
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-charcoal mb-1 block">
                        Preferred Time <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="time"
                        value={physicalAddress.preferredTime}
                        onChange={(e) => setPhysicalAddress({
                          ...physicalAddress,
                          preferredTime: e.target.value
                        })}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                          errors.preferredTime
                            ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                            : 'border-sky-200 focus:border-redbull-blue focus:ring-redbull-blue/20'
                        }`}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Games Info */}
              {verificationMethod === 'games' && (
                <div className="mt-4 pt-4 border-t border-sky-100">
                  <div className="bg-purple-50 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-charcoal mb-2 flex items-center gap-1">
                      <Sparkles className="w-4 h-4 text-purple-600" />
                      Play Games & Save
                    </h3>
                    <p className="text-xs text-slate-text mb-3">
                      Choose a game to play and earn a discount on your verification fee:
                    </p>
                    <div className="space-y-2">
                      <button className="w-full p-3 bg-white rounded-lg border border-purple-200 text-left hover:border-purple-400 transition-colors">
                        <p className="text-sm font-medium text-charcoal">Riddle Me This</p>
                        <p className="text-xs text-slate-text">Solve 3 riddles - Save up to 60%</p>
                      </button>
                      <button className="w-full p-3 bg-white rounded-lg border border-purple-200 text-left hover:border-purple-400 transition-colors">
                        <p className="text-sm font-medium text-charcoal">Tala Trivia</p>
                        <p className="text-xs text-slate-text">Test your knowledge - Save up to 80%</p>
                      </button>
                      <button className="w-full p-3 bg-white rounded-lg border border-purple-200 text-left hover:border-purple-400 transition-colors">
                        <p className="text-sm font-medium text-charcoal">Market Memory</p>
                        <p className="text-xs text-slate-text">Match products - Save up to 90%</p>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          {currentStep > 1 ? (
            <button
              onClick={prevStep}
              className="px-6 py-2 border border-sky-200 text-slate-text rounded-lg hover:bg-sky-50 flex items-center gap-2 text-sm"
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </button>
          ) : (
            <div />
          )}

          {currentStep < 4 ? (
            <button
              onClick={nextStep}
              className="px-6 py-2 bg-redbull-blue text-white rounded-lg hover:bg-redbull-blue/90 flex items-center gap-2 text-sm"
            >
              Continue
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2 text-sm disabled:opacity-50"
            >
              {isSubmitting ? (
                'Submitting...'
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Submit Application
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Success Modal */}
      <ConfirmModal
        isOpen={showSuccessModal}
        onClose={() => {
          setShowSuccessModal(false);
          navigate('/dashboard');
        }}
        onConfirm={() => {
          setShowSuccessModal(false);
          navigate('/dashboard');
        }}
        title="Application Submitted!"
        message="Your seller application has been received. We'll review it and get back to you within 2-3 business days. You can track your application status in your dashboard."
        confirmText="Go to Dashboard"
        cancelText="Stay Here"
        type="success" 
      />
    </div>
  );
};

export default BecomeSellerPage;