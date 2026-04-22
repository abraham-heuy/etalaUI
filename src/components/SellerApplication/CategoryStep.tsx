import React from 'react';
import { Store, Check, Package, Wheat, Bike, Wrench, Coffee, Hotel, Briefcase } from 'lucide-react';

type SellerCategory = 'marketplace' | 'farmers' | 'boda' | 'services' | 'food' | 'stays' | 'other';

const categories = [
  { id: 'marketplace', name: 'Marketplace', icon: Package, description: 'Sell electronics, fashion, household items' },
  { id: 'farmers', name: 'Farmers Market', icon: Wheat, description: 'Fresh produce, dairy, meat, grains' },
  { id: 'boda', name: 'Boda Rides', icon: Bike, description: 'Transportation and delivery services' },
  { id: 'services', name: 'Services', icon: Wrench, description: 'Salons, repairs, cleaning, professional services' },
  { id: 'food', name: 'Food & Restaurants', icon: Coffee, description: 'Restaurants, catering, food delivery' },
  { id: 'stays', name: 'Stays', icon: Hotel, description: 'Hotels, Airbnbs, guest houses, campsites' },
  { id: 'other', name: 'Other', icon: Briefcase, description: 'Other business types' },
];

interface CategoryStepProps {
  selectedCategory: SellerCategory | '';
  setSelectedCategory: React.Dispatch<React.SetStateAction<SellerCategory | ''>>;
  otherCategory: string;
  setOtherCategory: (val: string) => void;
  errors: Record<string, string>;
  approvedCategories: string[];
  pendingCategories?: string[]; // optional, default empty
}

const CategoryStep: React.FC<CategoryStepProps> = ({
  selectedCategory,
  setSelectedCategory,
  otherCategory,
  setOtherCategory,
  errors,
  approvedCategories,
  pendingCategories = [],
}) => {
  const isDisabled = (catId: string) => approvedCategories.includes(catId) || pendingCategories.includes(catId);

  const getDisabledReason = (catId: string) => {
    if (approvedCategories.includes(catId)) return 'Already approved';
    if (pendingCategories.includes(catId)) return 'Pending approval';
    return '';
  };

  return (
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
          const disabled = isDisabled(cat.id);
          const disabledReason = getDisabledReason(cat.id);

          return (
            <button
              key={cat.id}
              onClick={() => !disabled && setSelectedCategory(cat.id as SellerCategory)}
              disabled={disabled}
              className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                disabled
                  ? 'bg-gray-50 border-gray-200 cursor-not-allowed opacity-60'
                  : isSelected
                  ? 'border-redbull-blue bg-redbull-blue/5'
                  : 'border-sky-200 hover:border-redbull-blue/50'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  disabled ? 'bg-gray-200' : isSelected ? 'bg-redbull-blue' : 'bg-sky-100'
                }`}>
                  <Icon className={`w-5 h-5 ${
                    disabled ? 'text-gray-400' : isSelected ? 'text-white' : 'text-redbull-blue'
                  }`} />
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-display font-semibold text-charcoal">
                    {cat.name}
                  </h3>
                  <p className="text-sm text-slate-text">{cat.description}</p>
                  {disabled && disabledReason && (
                    <p className="text-xs mt-1 text-amber-600">
                      ⏳ {disabledReason}
                    </p>
                  )}
                </div>
                {isSelected && !disabled && <Check className="w-5 h-5 text-redbull-blue" />}
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
            {errors.otherCategory && <p className="text-xs text-red-600 mt-1">{errors.otherCategory}</p>}
          </div>
        )}

        {errors.category && <p className="text-xs text-red-600 mt-2">{errors.category}</p>}
      </div>
    </div>
  );
};

export default CategoryStep;