// components/SellerApplication/PersonalInfoStep.tsx
import React from 'react';
import { User } from 'lucide-react';

interface PersonalInfoStepProps {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    idNumber: string;
    address: string;
    city: string;
  };
  setPersonalInfo: React.Dispatch<React.SetStateAction<any>>;
  errors: Record<string, string>;
}

const PersonalInfoStep: React.FC<PersonalInfoStepProps> = ({ personalInfo, setPersonalInfo, errors }) => {
  const updateField = (field: string, value: string) => {
    setPersonalInfo((prev: any) => ({ ...prev, [field]: value }));
  };

  return (
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
            onChange={(e) => updateField('fullName', e.target.value)}
            placeholder="John Doe"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.fullName
                ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                : 'border-sky-200 focus:border-redbull-blue focus:ring-redbull-blue/20'
            }`}
          />
          {errors.fullName && <p className="text-xs text-red-600 mt-1">{errors.fullName}</p>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-charcoal mb-1 block">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={personalInfo.email}
              onChange={(e) => updateField('email', e.target.value)}
              placeholder="john@example.com"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.email
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                  : 'border-sky-200 focus:border-redbull-blue focus:ring-redbull-blue/20'
              }`}
            />
            {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="text-sm font-medium text-charcoal mb-1 block">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              value={personalInfo.phone}
              onChange={(e) => updateField('phone', e.target.value)}
              placeholder="07XX XXX XXX"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.phone
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                  : 'border-sky-200 focus:border-redbull-blue focus:ring-redbull-blue/20'
              }`}
            />
            {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone}</p>}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-charcoal mb-1 block">
            ID/Passport Number <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={personalInfo.idNumber}
            onChange={(e) => updateField('idNumber', e.target.value)}
            placeholder="12345678"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.idNumber
                ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                : 'border-sky-200 focus:border-redbull-blue focus:ring-redbull-blue/20'
            }`}
          />
          {errors.idNumber && <p className="text-xs text-red-600 mt-1">{errors.idNumber}</p>}
        </div>

        <div>
          <label className="text-sm font-medium text-charcoal mb-1 block">
            Physical Address <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={personalInfo.address}
            onChange={(e) => updateField('address', e.target.value)}
            placeholder="Street address"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.address
                ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                : 'border-sky-200 focus:border-redbull-blue focus:ring-redbull-blue/20'
            }`}
          />
          {errors.address && <p className="text-xs text-red-600 mt-1">{errors.address}</p>}
        </div>

        <div>
          <label className="text-sm font-medium text-charcoal mb-1 block">
            City/Town <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={personalInfo.city}
            onChange={(e) => updateField('city', e.target.value)}
            placeholder="Tala Town"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.city
                ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                : 'border-sky-200 focus:border-redbull-blue focus:ring-redbull-blue/20'
            }`}
          />
          {errors.city && <p className="text-xs text-red-600 mt-1">{errors.city}</p>}
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoStep;