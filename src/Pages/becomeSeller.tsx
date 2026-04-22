// pages/become-seller/index.tsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight, Save } from 'lucide-react';
import ConfirmModal from '../common/ConfirmModal';
import BusinessQuestionsStep from '../components/SellerApplication/BusinessQuestionsStep';
import CategoryStep from '../components/SellerApplication/CategoryStep';
import PersonalInfoStep from '../components/SellerApplication/PersonalStep';
import StepIndicator from '../components/SellerApplication/StepIndicator';
import VerificationStep from '../components/SellerApplication/VerificationStep';
import { useSellerApplication } from '../hooks/applications/useSellerApplication';
import { SellerApplicationService } from '../services/Auth/seller-applications.service';

// Helper to get business questions based on selected category
const getBusinessQuestions = (selectedCategory: string) => {
  const baseQuestions = [
    { id: 'businessName', question: 'What is your business name?', type: 'text', required: true, placeholder: 'e.g., Mama Lucy\'s Farm' },
    { id: 'businessDescription', question: 'Describe your business', type: 'textarea', required: true, placeholder: 'Tell us about what you sell or the services you offer...' },
  ];

  const categorySpecific: Record<string, any[]> = {
    marketplace: [
      { id: 'productTypes', question: 'What types of products do you sell?', type: 'multiselect', options: ['Electronics', 'Fashion', 'Household', 'Hardware', 'Pharmacy', 'Baby & Kids', 'Other'], required: true },
      { id: 'inventorySource', question: 'Where do you source your products?', type: 'select', options: ['Local suppliers', 'Imported', 'Self-made', 'Mixed'], required: true },
    ],
    farmers: [
      { id: 'farmSize', question: 'What is the size of your farm?', type: 'text', required: true, placeholder: 'e.g., 5 acres' },
      { id: 'produceTypes', question: 'What types of produce do you grow?', type: 'multiselect', options: ['Vegetables', 'Fruits', 'Dairy', 'Meat', 'Grains', 'Honey', 'Other'], required: true },
      { id: 'organic', question: 'Are you certified organic?', type: 'select', options: ['Yes', 'No', 'In progress'], required: true },
    ],
    boda: [
      { id: 'vehicleType', question: 'What type of vehicle do you use?', type: 'select', options: ['Motorcycle', 'Bicycle', 'Car', 'Tuk Tuk', 'Pickup'], required: true },
      { id: 'licenseNumber', question: 'What is your driving license number?', type: 'text', required: true, placeholder: 'License number' },
      { id: 'insurance', question: 'Do you have insurance?', type: 'select', options: ['Yes', 'No', 'In progress'], required: true },
    ],
    services: [
      { id: 'serviceTypes', question: 'What services do you offer?', type: 'multiselect', options: ['Salon/Barber', 'Cyber Cafe', 'Plumbing', 'Electrical', 'Cleaning', 'Repairs', 'Other'], required: true },
      { id: 'qualifications', question: 'Do you have any professional qualifications?', type: 'textarea', required: false, placeholder: 'e.g., certificates, training...' },
    ],
    food: [
      { id: 'cuisineType', question: 'What type of cuisine do you offer?', type: 'select', options: ['Local', 'Fast Food', 'Cafe', 'Hotel', 'Catering', 'Other'], required: true },
      { id: 'foodLicense', question: 'Do you have a food handling license?', type: 'select', options: ['Yes', 'No', 'In progress'], required: true },
    ],
    stays: [
      { id: 'propertyType', question: 'What type of accommodation do you offer?', type: 'select', options: ['Hotel', 'Airbnb', 'Guest House', 'Campsite', 'Other'], required: true },
      { id: 'capacity', question: 'How many guests can you accommodate?', type: 'text', required: true, placeholder: 'e.g., 20 guests' },
    ],
    other: [
      { id: 'businessType', question: 'Please describe your business type', type: 'textarea', required: true, placeholder: 'Tell us about your business...' },
    ],
  };

  if (!selectedCategory) return baseQuestions;
  return [...baseQuestions, ...(categorySpecific[selectedCategory] || [])];
};

const BecomeSellerPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    personalInfo, setPersonalInfo,
    selectedCategory, setSelectedCategory,
    otherCategory, setOtherCategory,
    businessAnswers, setBusinessAnswers,
    verificationMethod, setVerificationMethod,
    documents, setDocuments,
    documentPreviews, setDocumentPreviews,
    physicalAddress, setPhysicalAddress,
    approvedCategories,
    pendingCategories,
  } = useSellerApplication();

  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const businessQuestions = getBusinessQuestions(selectedCategory);

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
        else if (selectedCategory === 'other' && !otherCategory.trim()) newErrors.otherCategory = 'Please specify your business type';
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
        else if (verificationMethod === 'documents' && documents.length === 0) newErrors.documents = 'Please upload at least one document';
        else if (verificationMethod === 'physical') {
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

  const handleSubmit = async () => {
    if (!validateStep(4)) return;
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      // Personal info
      formData.append('fullName', personalInfo.fullName);
      formData.append('email', personalInfo.email);
      formData.append('phone', personalInfo.phone);
      formData.append('idNumber', personalInfo.idNumber);
      formData.append('address', personalInfo.address);
      formData.append('city', personalInfo.city);
      // Category
      const categoryValue = selectedCategory === 'other' ? otherCategory : selectedCategory;
      formData.append('category', categoryValue);
      // Business answers
      const businessAnswersJson: Record<string, string> = {};
      businessQuestions.forEach(q => { if (businessAnswers[q.id]) businessAnswersJson[q.id] = businessAnswers[q.id]; });
      formData.append('businessAnswers', JSON.stringify(businessAnswersJson));
      // Verification method
      formData.append('verificationMethod', verificationMethod);
      if (verificationMethod === 'documents') {
        documents.forEach(file => formData.append('documents', file));
      } else if (verificationMethod === 'physical') {
        formData.append('physicalVisitDetails', JSON.stringify(physicalAddress));
      } else if (verificationMethod === 'games') {
        formData.append('gamesDiscount', '0');
      }
      formData.append('businessName', businessAnswers.businessName || '');
      formData.append('businessDescription', businessAnswers.businessDescription || '');

      await SellerApplicationService.submitApplication(formData);
      setShowSuccessModal(true);
    } catch (err: any) {
      console.error(err);
      alert(err.message || 'Submission failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-soft-white">
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-sky-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="flex items-center h-16">
            <Link to="/" className="p-2 rounded-full bg-sky-50 text-slate-text hover:text-redbull-blue hover:bg-sky-100">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="ml-4 text-lg font-display font-semibold text-charcoal">Become a Seller</h1>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <StepIndicator currentStep={currentStep} />

        {currentStep === 1 && (
          <PersonalInfoStep personalInfo={personalInfo} setPersonalInfo={setPersonalInfo} errors={errors} />
        )}
        {currentStep === 2 && (
          <CategoryStep
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          otherCategory={otherCategory}
          setOtherCategory={setOtherCategory}
          errors={errors}
          approvedCategories={approvedCategories}
          pendingCategories={pendingCategories}
        />
        )}
        {currentStep === 3 && selectedCategory && (
          <BusinessQuestionsStep questions={businessQuestions} answers={businessAnswers} setAnswers={setBusinessAnswers} errors={errors} />
        )}
        {currentStep === 4 && (
          <VerificationStep
            verificationMethod={verificationMethod}
            setVerificationMethod={setVerificationMethod}
            documents={documents}
            setDocuments={setDocuments}
            documentPreviews={documentPreviews}
            setDocumentPreviews={setDocumentPreviews}
            physicalAddress={physicalAddress}
            setPhysicalAddress={setPhysicalAddress}
            errors={errors}
          />
        )}

        <div className="flex justify-between mt-6">
          {currentStep > 1 ? (
            <button onClick={prevStep} className="px-6 py-2 border border-sky-200 text-slate-text rounded-lg hover:bg-sky-50 flex items-center gap-2 text-sm">
              <ChevronLeft className="w-4 h-4" /> Back
            </button>
          ) : <div />}
          {currentStep < 4 ? (
            <button onClick={nextStep} className="px-6 py-2 bg-redbull-blue text-white rounded-lg hover:bg-redbull-blue/90 flex items-center gap-2 text-sm">
              Continue <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button onClick={handleSubmit} disabled={isSubmitting} className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2 text-sm disabled:opacity-50">
              {isSubmitting ? 'Submitting...' : <><Save className="w-4 h-4" /> Submit Application</>}
            </button>
          )}
        </div>
      </div>

      <ConfirmModal
        isOpen={showSuccessModal}
        onClose={() => { setShowSuccessModal(false); navigate('/dashboard'); }}
        onConfirm={() => { setShowSuccessModal(false); navigate('/dashboard'); }}
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