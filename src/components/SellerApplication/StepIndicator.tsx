// components/SellerApplication/StepIndicator.tsx
import React from 'react';
import { Check } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps?: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, totalSteps = 4 }) => {
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);
  const labels = ['Personal', 'Category', 'Business', 'Verify'];

  return (
    <div className="w-full overflow-x-auto pb-2 scrollbar-hide">
      <div className="flex items-center justify-between min-w-[400px] max-w-md mx-auto">
        {steps.map((step) => (
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
            {step < totalSteps && (
              <div className={`w-12 sm:w-16 h-1 mx-1 sm:mx-2 ${step < currentStep ? 'bg-green-600' : 'bg-gray-200'}`} />
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-between max-w-md mx-auto mt-2 text-[10px] sm:text-xs text-slate-text px-1">
        {labels.map((label, idx) => (
          <span key={idx}>{label}</span>
        ))}
      </div>
    </div>
  );
};

export default StepIndicator;