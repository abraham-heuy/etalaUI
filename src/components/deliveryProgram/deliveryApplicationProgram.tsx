// src/components/delivery/DeliveryApplicationForm.tsx
import React, { useState, useEffect, type ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Upload, FileText, Clock, MapPin, Bike, Car, Save } from 'lucide-react';

// Type definitions
interface FormData {
  fullName: string;
  idNumber: string;
  phone: string;
  email: string;
  vehicleType: string;
  licenseNumber: string;
  vehicleRegistration: string;
  location: string;
  deliveryZones: string[];
  availabilityStart: string;
  availabilityEnd: string;
  availabilityDays: string[];
  priorExperience: string;
  whyJoin: string;
  profilePhoto: File | null;
  idFront: File | null;
  idBack: File | null;
  license: File | null;
  vehicleDocs: File | null;
}

// For storing in localStorage (without File objects)
interface StoredFormData {
  fullName: string;
  idNumber: string;
  phone: string;
  email: string;
  vehicleType: string;
  licenseNumber: string;
  vehicleRegistration: string;
  location: string;
  deliveryZones: string[];
  availabilityStart: string;
  availabilityEnd: string;
  availabilityDays: string[];
  priorExperience: string;
  whyJoin: string;
  profilePhotoName?: string;
  idFrontName?: string;
  idBackName?: string;
  licenseName?: string;
  vehicleDocsName?: string;
  currentStep: number;
  lastUpdated: string;
}

interface StepProps {
  formData: FormData;
  updateFormData: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  errors: Record<string, string>;
}

const STORAGE_KEY = 'etala_delivery_application_draft';

// Helper to save draft to localStorage
const saveDraft = (formData: FormData, currentStep: number) => {
  const storedData: StoredFormData = {
    fullName: formData.fullName,
    idNumber: formData.idNumber,
    phone: formData.phone,
    email: formData.email,
    vehicleType: formData.vehicleType,
    licenseNumber: formData.licenseNumber,
    vehicleRegistration: formData.vehicleRegistration,
    location: formData.location,
    deliveryZones: formData.deliveryZones,
    availabilityStart: formData.availabilityStart,
    availabilityEnd: formData.availabilityEnd,
    availabilityDays: formData.availabilityDays,
    priorExperience: formData.priorExperience,
    whyJoin: formData.whyJoin,
    profilePhotoName: formData.profilePhoto?.name,
    idFrontName: formData.idFront?.name,
    idBackName: formData.idBack?.name,
    licenseName: formData.license?.name,
    vehicleDocsName: formData.vehicleDocs?.name,
    currentStep,
    lastUpdated: new Date().toISOString(),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(storedData));
};

// Helper to load draft from localStorage
const loadDraft = (): { data: StoredFormData | null; hasDraft: boolean } => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      const lastUpdated = new Date(parsed.lastUpdated);
      const hoursSinceUpdate = (Date.now() - lastUpdated.getTime()) / (1000 * 60 * 60);
      if (hoursSinceUpdate < 24) {
        return { data: parsed, hasDraft: true };
      }
    } catch (e) {
      console.error('Failed to parse draft', e);
    }
  }
  return { data: null, hasDraft: false };
};

// Clear draft from localStorage
const clearDraft = () => {
  localStorage.removeItem(STORAGE_KEY);
};

// Step 1: Personal Information
const PersonalInfoStep: React.FC<StepProps> = ({ formData, updateFormData, errors }) => {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-slate-text mb-2">
          Full Name *
        </label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={updateFormData}
          className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-redbull-blue transition-all
            ${errors.fullName ? 'border-red-500 focus:ring-red-500' : 'border-cool-gray focus:ring-redbull-blue'}`}
          placeholder="Enter your full name"
        />
        {errors.fullName && (
          <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-text mb-2">
          National ID Number *
        </label>
        <input
          type="text"
          name="idNumber"
          value={formData.idNumber}
          onChange={updateFormData}
          className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-redbull-blue transition-all
            ${errors.idNumber ? 'border-red-500 focus:ring-red-500' : 'border-cool-gray focus:ring-redbull-blue'}`}
          placeholder="Enter your ID number"
        />
        {errors.idNumber && (
          <p className="mt-1 text-sm text-red-500">{errors.idNumber}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-text mb-2">
          Phone Number *
        </label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={updateFormData}
          className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-redbull-blue transition-all
            ${errors.phone ? 'border-red-500 focus:ring-red-500' : 'border-cool-gray focus:ring-redbull-blue'}`}
          placeholder="e.g., +254 700 000 000"
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-text mb-2">
          Email Address
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={updateFormData}
          className="w-full px-4 py-3 border border-cool-gray rounded-xl focus:outline-none focus:ring-2 focus:ring-redbull-blue transition-all"
          placeholder="Enter your email address"
        />
      </div>
    </div>
  );
};

// Step 2: Vehicle Information
const VehicleInfoStep: React.FC<StepProps> = ({ formData, updateFormData, errors }) => {
  const vehicleTypes = [
    { value: 'bicycle', label: 'Bicycle', icon: Bike, description: 'Perfect for short distances' },
    { value: 'motorcycle', label: 'Motorcycle', icon: Bike, description: 'Fast and efficient' },
    { value: 'car', label: 'Car/Van', icon: Car, description: 'For larger deliveries' },
  ];

  const handleVehicleSelect = (value: string) => {
    const event = {
      target: { name: 'vehicleType', value }
    } as ChangeEvent<HTMLInputElement>;
    updateFormData(event);
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-slate-text mb-3">
          Vehicle Type *
        </label>
        <div className="grid grid-cols-1 gap-3">
          {vehicleTypes.map((type) => {
            const IconComponent = type.icon;
            return (
              <button
                key={type.value}
                type="button"
                onClick={() => handleVehicleSelect(type.value)}
                className={`p-4 border-2 rounded-xl text-left transition-all ${
                  formData.vehicleType === type.value
                    ? 'border-redbull-blue bg-redbull-blue-pale'
                    : 'border-cool-gray hover:border-redbull-blue/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <IconComponent className="w-6 h-6 text-redbull-blue" />
                  <div>
                    <p className="font-medium text-slate-text">{type.label}</p>
                    <p className="text-sm text-slate-text/70">{type.description}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
        {errors.vehicleType && (
          <p className="mt-1 text-sm text-red-500">{errors.vehicleType}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-text mb-2">
          License Number *
        </label>
        <input
          type="text"
          name="licenseNumber"
          value={formData.licenseNumber}
          onChange={updateFormData}
          className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-redbull-blue transition-all
            ${errors.licenseNumber ? 'border-red-500' : 'border-cool-gray'}`}
          placeholder="Enter your driver's license number"
        />
        {errors.licenseNumber && (
          <p className="mt-1 text-sm text-red-500">{errors.licenseNumber}</p>
        )}
      </div>

      {formData.vehicleType !== 'bicycle' && (
        <div>
          <label className="block text-sm font-medium text-slate-text mb-2">
            Vehicle Registration Number *
          </label>
          <input
            type="text"
            name="vehicleRegistration"
            value={formData.vehicleRegistration}
            onChange={updateFormData}
            className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-redbull-blue transition-all
              ${errors.vehicleRegistration ? 'border-red-500' : 'border-cool-gray'}`}
            placeholder="e.g., KCA 123A"
          />
          {errors.vehicleRegistration && (
            <p className="mt-1 text-sm text-red-500">{errors.vehicleRegistration}</p>
          )}
        </div>
      )}
    </div>
  );
};

// Step 3: Location & Availability
const LocationStep: React.FC<StepProps> = ({ formData, updateFormData, errors }) => {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-slate-text mb-2">
          Base Location *
        </label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-text/50" />
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={updateFormData}
            className={`w-full pl-10 pr-24 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-redbull-blue transition-all
              ${errors.location ? 'border-red-500' : 'border-cool-gray'}`}
            placeholder="Enter your base location"
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-redbull-blue text-sm font-medium"
          >
            Use Current
          </button>
        </div>
        {errors.location && (
          <p className="mt-1 text-sm text-red-500">{errors.location}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-text mb-2">
          Preferred Delivery Zones *
        </label>
        <div className="grid grid-cols-2 gap-3">
          {['Tala Town', 'Kangundo', 'Nguluni', 'Matungulu', 'Matuu', 'Koma'].map((zone) => (
            <label key={zone} className="flex items-center gap-2 p-3 border border-cool-gray rounded-xl hover:bg-redbull-blue-pale transition-all cursor-pointer">
              <input
                type="checkbox"
                name="deliveryZones"
                value={zone}
                checked={formData.deliveryZones.includes(zone)}
                onChange={updateFormData}
                className="w-4 h-4 text-redbull-blue focus:ring-redbull-blue"
              />
              <span className="text-sm text-slate-text">{zone}</span>
            </label>
          ))}
        </div>
        {errors.deliveryZones && (
          <p className="mt-1 text-sm text-red-500">{errors.deliveryZones}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-text mb-2">
          Availability Hours *
        </label>
        <div className="grid grid-cols-2 gap-3">
          <div className="relative">
            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-text/50" />
            <select
              name="availabilityStart"
              value={formData.availabilityStart}
              onChange={updateFormData}
              className="w-full pl-10 pr-4 py-3 border border-cool-gray rounded-xl focus:outline-none focus:ring-2 focus:ring-redbull-blue appearance-none"
            >
              <option value="">Start Time</option>
              <option value="06:00">06:00</option>
              <option value="07:00">07:00</option>
              <option value="08:00">08:00</option>
              <option value="09:00">09:00</option>
              <option value="10:00">10:00</option>
            </select>
          </div>
          <div className="relative">
            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-text/50" />
            <select
              name="availabilityEnd"
              value={formData.availabilityEnd}
              onChange={updateFormData}
              className="w-full pl-10 pr-4 py-3 border border-cool-gray rounded-xl focus:outline-none focus:ring-2 focus:ring-redbull-blue appearance-none"
            >
              <option value="">End Time</option>
              <option value="14:00">14:00</option>
              <option value="15:00">15:00</option>
              <option value="16:00">16:00</option>
              <option value="17:00">17:00</option>
              <option value="18:00">18:00</option>
            </select>
          </div>
        </div>
        {errors.availabilityHours && (
          <p className="mt-1 text-sm text-red-500">{errors.availabilityHours}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-text mb-2">
          Available Days *
        </label>
        <div className="grid grid-cols-2 gap-3">
          {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
            <label key={day} className="flex items-center gap-2 p-3 border border-cool-gray rounded-xl hover:bg-redbull-blue-pale transition-all cursor-pointer">
              <input
                type="checkbox"
                name="availabilityDays"
                value={day}
                checked={formData.availabilityDays.includes(day)}
                onChange={updateFormData}
                className="w-4 h-4 text-redbull-blue focus:ring-redbull-blue"
              />
              <span className="text-sm text-slate-text">{day}</span>
            </label>
          ))}
        </div>
        {errors.availabilityDays && (
          <p className="mt-1 text-sm text-red-500">{errors.availabilityDays}</p>
        )}
      </div>
    </div>
  );
};

// Step 4: Experience & Motivation
const ExperienceStep: React.FC<StepProps> = ({ formData, updateFormData, errors }) => {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-slate-text mb-2">
          Prior Delivery Experience
        </label>
        <textarea
          name="priorExperience"
          value={formData.priorExperience}
          onChange={updateFormData}
          rows={3}
          className="w-full px-4 py-3 border border-cool-gray rounded-xl focus:outline-none focus:ring-2 focus:ring-redbull-blue transition-all"
          placeholder="Tell us about any previous delivery or logistics experience..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-text mb-2">
          Why do you want to join e-tala? *
        </label>
        <textarea
          name="whyJoin"
          value={formData.whyJoin}
          onChange={updateFormData}
          rows={3}
          className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-redbull-blue transition-all
            ${errors.whyJoin ? 'border-red-500' : 'border-cool-gray'}`}
          placeholder="Tell us why you're interested in delivering with e-tala..."
        />
        {errors.whyJoin && (
          <p className="mt-1 text-sm text-red-500">{errors.whyJoin}</p>
        )}
      </div>
    </div>
  );
};

// Step 5: Document Upload
const DocumentStep: React.FC<StepProps> = ({ formData, updateFormData, errors }) => {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-slate-text mb-2">
          Profile Photo *
        </label>
        <div className="mt-1 flex items-center gap-4">
          <div className="w-20 h-20 bg-warm-gray rounded-full flex items-center justify-center overflow-hidden">
            {formData.profilePhoto ? (
              <img src={URL.createObjectURL(formData.profilePhoto)} alt="Preview" className="w-full h-full object-cover" />
            ) : (
              <Camera className="w-8 h-8 text-slate-text/50" />
            )}
          </div>
          <label className="px-4 py-2 bg-redbull-blue text-white rounded-xl cursor-pointer hover:bg-redbull-blue/90 transition-all">
            Upload Photo
            <input
              type="file"
              name="profilePhoto"
              accept="image/*"
              onChange={updateFormData}
              className="hidden"
            />
          </label>
        </div>
        {errors.profilePhoto && (
          <p className="mt-1 text-sm text-red-500">{errors.profilePhoto}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-text mb-2">
          National ID (Front & Back) *
        </label>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs text-slate-text/70 mb-1">Front Side</label>
            <label className="flex flex-col items-center justify-center w-full p-4 border-2 border-dashed border-cool-gray rounded-xl cursor-pointer hover:border-redbull-blue transition-all">
              <FileText className="w-6 h-6 text-slate-text/50 mb-2" />
              <span className="text-sm text-slate-text">Upload Front</span>
              <input type="file" name="idFront" className="hidden" onChange={updateFormData} />
            </label>
          </div>
          <div>
            <label className="block text-xs text-slate-text/70 mb-1">Back Side</label>
            <label className="flex flex-col items-center justify-center w-full p-4 border-2 border-dashed border-cool-gray rounded-xl cursor-pointer hover:border-redbull-blue transition-all">
              <FileText className="w-6 h-6 text-slate-text/50 mb-2" />
              <span className="text-sm text-slate-text">Upload Back</span>
              <input type="file" name="idBack" className="hidden" onChange={updateFormData} />
            </label>
          </div>
        </div>
        {errors.idDocuments && (
          <p className="mt-1 text-sm text-red-500">{errors.idDocuments}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-text mb-2">
          Driver's License *
        </label>
        <label className="flex flex-col items-center justify-center w-full p-4 border-2 border-dashed border-cool-gray rounded-xl cursor-pointer hover:border-redbull-blue transition-all">
          <Upload className="w-6 h-6 text-slate-text/50 mb-2" />
          <span className="text-sm text-slate-text">Upload License (Front & Back)</span>
          <input type="file" name="license" accept="image/*,.pdf" className="hidden" onChange={updateFormData} />
        </label>
        {errors.license && (
          <p className="mt-1 text-sm text-red-500">{errors.license}</p>
        )}
      </div>

      {formData.vehicleType !== 'bicycle' && (
        <div>
          <label className="block text-sm font-medium text-slate-text mb-2">
            Vehicle Logbook / Registration *
          </label>
          <label className="flex flex-col items-center justify-center w-full p-4 border-2 border-dashed border-cool-gray rounded-xl cursor-pointer hover:border-redbull-blue transition-all">
            <Upload className="w-6 h-6 text-slate-text/50 mb-2" />
            <span className="text-sm text-slate-text">Upload Logbook/Registration</span>
            <input type="file" name="vehicleDocs" accept="image/*,.pdf" className="hidden" onChange={updateFormData} />
          </label>
          {errors.vehicleDocs && (
            <p className="mt-1 text-sm text-red-500">{errors.vehicleDocs}</p>
          )}
        </div>
      )}
    </div>
  );
};

// Main Application Component
const DeliveryApplicationForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showDraftPrompt, setShowDraftPrompt] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    idNumber: '',
    phone: '',
    email: '',
    vehicleType: '',
    licenseNumber: '',
    vehicleRegistration: '',
    location: '',
    deliveryZones: [],
    availabilityStart: '',
    availabilityEnd: '',
    availabilityDays: [],
    priorExperience: '',
    whyJoin: '',
    profilePhoto: null,
    idFront: null,
    idBack: null,
    license: null,
    vehicleDocs: null,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const steps = [
    { title: 'Personal Info', component: PersonalInfoStep },
    { title: 'Vehicle Details', component: VehicleInfoStep },
    { title: 'Location & Availability', component: LocationStep },
    { title: 'Experience', component: ExperienceStep },
    { title: 'Documents', component: DocumentStep },
  ];

  const CurrentStepComponent = steps[currentStep].component;

  // Load draft on mount
  useEffect(() => {
    const { data, hasDraft } = loadDraft();
    if (hasDraft && data) {
      setShowDraftPrompt(true);
    }
  }, []);

  // Save draft whenever form data changes (debounced)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (Object.values(formData).some(v => v !== '' && v !== null && (Array.isArray(v) ? v.length > 0 : true))) {
        saveDraft(formData, currentStep);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [formData, currentStep]);

  const restoreDraft = (draftData: StoredFormData) => {
    setFormData({
      fullName: draftData.fullName,
      idNumber: draftData.idNumber,
      phone: draftData.phone,
      email: draftData.email,
      vehicleType: draftData.vehicleType,
      licenseNumber: draftData.licenseNumber,
      vehicleRegistration: draftData.vehicleRegistration,
      location: draftData.location,
      deliveryZones: draftData.deliveryZones,
      availabilityStart: draftData.availabilityStart,
      availabilityEnd: draftData.availabilityEnd,
      availabilityDays: draftData.availabilityDays,
      priorExperience: draftData.priorExperience,
      whyJoin: draftData.whyJoin,
      profilePhoto: null,
      idFront: null,
      idBack: null,
      license: null,
      vehicleDocs: null,
    });
    setCurrentStep(draftData.currentStep);
    setShowDraftPrompt(false);
  };

  const clearDraftAndReset = () => {
    clearDraft();
    setFormData({
      fullName: '',
      idNumber: '',
      phone: '',
      email: '',
      vehicleType: '',
      licenseNumber: '',
      vehicleRegistration: '',
      location: '',
      deliveryZones: [],
      availabilityStart: '',
      availabilityEnd: '',
      availabilityDays: [],
      priorExperience: '',
      whyJoin: '',
      profilePhoto: null,
      idFront: null,
      idBack: null,
      license: null,
      vehicleDocs: null,
    });
    setCurrentStep(0);
    setShowDraftPrompt(false);
  };

  const updateFormData = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const target = e.target as HTMLInputElement;
      if (name === 'deliveryZones') {
        setFormData(prev => ({
          ...prev,
          [name]: target.checked 
            ? [...prev.deliveryZones, value] 
            : prev.deliveryZones.filter(z => z !== value)
        }));
      } else if (name === 'availabilityDays') {
        setFormData(prev => ({
          ...prev,
          [name]: target.checked 
            ? [...prev.availabilityDays, value] 
            : prev.availabilityDays.filter(d => d !== value)
        }));
      }
    } else if (type === 'file') {
      const target = e.target as HTMLInputElement;
      if (target.files && target.files[0]) {
        setFormData(prev => ({ ...prev, [name]: target.files![0] }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const validateStep = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (currentStep === 0) {
      if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
      if (!formData.idNumber.trim()) newErrors.idNumber = 'ID number is required';
      if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    }
    
    if (currentStep === 1) {
      if (!formData.vehicleType) newErrors.vehicleType = 'Please select a vehicle type';
      if (!formData.licenseNumber.trim()) newErrors.licenseNumber = 'License number is required';
      if (formData.vehicleType !== 'bicycle' && !formData.vehicleRegistration.trim()) {
        newErrors.vehicleRegistration = 'Vehicle registration is required';
      }
    }
    
    if (currentStep === 2) {
      if (!formData.location.trim()) newErrors.location = 'Base location is required';
      if (formData.deliveryZones.length === 0) newErrors.deliveryZones = 'Please select at least one delivery zone';
      if (!formData.availabilityStart) newErrors.availabilityHours = 'Start time is required';
      if (!formData.availabilityEnd) newErrors.availabilityHours = 'End time is required';
      if (formData.availabilityDays.length === 0) newErrors.availabilityDays = 'Please select at least one available day';
    }
    
    if (currentStep === 3) {
      if (!formData.whyJoin.trim()) newErrors.whyJoin = 'Please tell us why you want to join';
    }
    
    if (currentStep === 4) {
      if (!formData.profilePhoto) newErrors.profilePhoto = 'Profile photo is required';
      if (!formData.idFront || !formData.idBack) newErrors.idDocuments = 'Both sides of ID are required';
      if (!formData.license) newErrors.license = 'Driver\'s license is required';
      if (formData.vehicleType !== 'bicycle' && !formData.vehicleDocs) {
        newErrors.vehicleDocs = 'Vehicle documents are required';
      }
    }
    
    setErrors(newErrors);
    console.log('Validation errors:', newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    console.log('Current step:', currentStep);
    console.log('Form data:', { 
      location: formData.location, 
      deliveryZones: formData.deliveryZones,
      availabilityStart: formData.availabilityStart,
      availabilityEnd: formData.availabilityEnd,
      availabilityDays: formData.availabilityDays
    });
    
    if (validateStep()) {
      setCurrentStep(prev => prev + 1);
      console.log('Moving to step:', currentStep + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async () => {
    if (validateStep()) {
      console.log('Submitting application:', formData);
      clearDraft();
    }
  };

  const { data: draftData } = loadDraft();

  return (
    <div className="min-h-screen bg-soft-white py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-display font-bold text-redbull-blue mb-2">
            Become an e-tala Delivery Partner
          </h1>
          <p className="text-slate-text">
            Join our growing network of delivery drivers
          </p>
        </div>

        {/* Draft Restore Prompt */}
        {showDraftPrompt && draftData && (
          <div className="mb-6 bg-amber-50 border border-amber-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <Save className="w-5 h-5 text-amber-600 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-amber-800 font-medium">
                  You have an unfinished application from {new Date(draftData.lastUpdated).toLocaleString()}
                </p>
                <p className="text-xs text-amber-700 mt-1">
                  Would you like to continue where you left off?
                </p>
                <div className="flex gap-3 mt-3">
                  <button
                    onClick={() => restoreDraft(draftData)}
                    className="px-4 py-2 bg-amber-600 text-white text-sm rounded-lg hover:bg-amber-700 transition-all"
                  >
                    Continue Application
                  </button>
                  <button
                    onClick={clearDraftAndReset}
                    className="px-4 py-2 border border-amber-300 text-amber-700 text-sm rounded-lg hover:bg-amber-50 transition-all"
                  >
                    Start Fresh
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            {steps.map((_step, index) => (
              <div key={index} className="flex-1">
                <div className={`h-1 transition-all ${index <= currentStep ? 'bg-redbull-blue' : 'bg-cool-gray'}`} />
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-xs text-slate-text">
            {steps.map((step, index) => (
              <span key={index} className={`${index === currentStep ? 'text-redbull-blue font-medium' : ''}`}>
                {step.title}
              </span>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <CurrentStepComponent
                formData={formData}
                updateFormData={updateFormData}
                errors={errors}
              />
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex gap-4 mt-8">
            {currentStep > 0 && (
              <button
                onClick={handlePrevious}
                className="flex-1 py-3 border-2 border-redbull-blue text-redbull-blue rounded-xl font-medium hover:bg-redbull-blue-pale transition-all"
              >
                Back
              </button>
            )}
            {currentStep < steps.length - 1 ? (
              <button
                onClick={handleNext}
                className="flex-1 py-3 bg-redbull-blue text-white rounded-xl font-medium hover:bg-redbull-blue/90 transition-all"
              >
                Continue
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="flex-1 py-3 bg-redbull-blue text-white rounded-xl font-medium hover:bg-redbull-blue/90 transition-all"
              >
                Submit Application
              </button>
            )}
          </div>
        </div>

        {/* Auto-save Indicator */}
        <div className="mt-4 text-center">
          <p className="text-xs text-slate-text/60 flex items-center justify-center gap-1">
            <Save className="w-3 h-3" />
            Your progress is automatically saved
          </p>
        </div>

        {/* Benefits Section */}
        <div className="mt-8 bg-redbull-blue-pale rounded-2xl p-6">
          <h3 className="font-display font-semibold text-redbull-blue mb-4 text-center">
            Why Deliver with e-tala?
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3">
              <div className="text-2xl mb-1">💰</div>
              <p className="text-sm font-medium text-slate-text">Competitive Pay</p>
              <p className="text-xs text-slate-text/70">Base + Commission</p>
            </div>
            <div className="text-center p-3">
              <div className="text-2xl mb-1">⏰</div>
              <p className="text-sm font-medium text-slate-text">Flexible Hours</p>
              <p className="text-xs text-slate-text/70">Work when you want</p>
            </div>
            <div className="text-center p-3">
              <div className="text-2xl mb-1">📈</div>
              <p className="text-sm font-medium text-slate-text">Weekly Payouts</p>
              <p className="text-xs text-slate-text/70">Get paid every Friday</p>
            </div>
            <div className="text-center p-3">
              <div className="text-2xl mb-1">🛡️</div>
              <p className="text-sm font-medium text-slate-text">Insurance</p>
              <p className="text-xs text-slate-text/70">Accident coverage</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryApplicationForm