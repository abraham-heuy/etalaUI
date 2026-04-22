// pages/dashboard/products/forms/FarmersFormFields.tsx
import React from 'react';
import { Sprout, Calendar, MapPin, Package, CheckCircle } from 'lucide-react';

interface FarmersData {
  subcategory: string;
  unit: string;
  isOrganic: boolean;
  isCertified: boolean;
  farmLocation: string;
  harvestDate?: string;
  expiryDate?: string;
  minOrderQuantity: number;
  availableQuantity: number;
}

interface Props {
  data: FarmersData;
  onChange: (data: Partial<FarmersData>) => void;
}

const subcategories = [
  { value: 'vegetables', label: 'Vegetables' },
  { value: 'fruits', label: 'Fruits' },
  { value: 'dairy', label: 'Dairy' },
  { value: 'meat', label: 'Meat' },
  { value: 'grains', label: 'Grains' },
  { value: 'honey', label: 'Honey' },
  { value: 'herbs', label: 'Herbs' },
  { value: 'other', label: 'Other' },
];

const units = [
  { value: 'kg', label: 'Kilogram (kg)' },
  { value: 'bunch', label: 'Bunch' },
  { value: 'piece', label: 'Piece' },
  { value: 'bundle', label: 'Bundle' },
];

const FarmersFormFields: React.FC<Props> = ({ data, onChange }) => {
  const updateField = (field: keyof FarmersData, value: any) => {
    onChange({ [field]: value });
  };

  return (
    <div className="bg-green-50 rounded-lg p-4 mt-4 space-y-4">
      <h3 className="text-sm font-medium text-charcoal flex items-center gap-2">
        <Sprout className="w-4 h-4 text-green-600" />
        Farm & Produce Details
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-slate-text mb-1 block">Subcategory *</label>
          <select
            value={data.subcategory || ''}
            onChange={(e) => updateField('subcategory', e.target.value)}
            className="w-full px-3 py-2 border border-sky-200 rounded-lg text-sm bg-white"
            required
          >
            <option value="">Select subcategory</option>
            {subcategories.map(sc => (
              <option key={sc.value} value={sc.value}>{sc.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs text-slate-text mb-1 block">Unit *</label>
          <select
            value={data.unit || ''}
            onChange={(e) => updateField('unit', e.target.value)}
            className="w-full px-3 py-2 border border-sky-200 rounded-lg text-sm bg-white"
            required
          >
            <option value="">Select unit</option>
            {units.map(u => (
              <option key={u.value} value={u.value}>{u.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs text-slate-text mb-1 block">Farm Location *</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={data.farmLocation || ''}
              onChange={(e) => updateField('farmLocation', e.target.value)}
              placeholder="e.g., Tala, Machakos"
              className="w-full pl-9 pr-3 py-2 border border-sky-200 rounded-lg text-sm"
              required
            />
          </div>
        </div>

        <div>
          <label className="text-xs text-slate-text mb-1 block">Available Quantity *</label>
          <div className="relative">
            <Package className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="number"
              step="0.01"
              value={data.availableQuantity || ''}
              onChange={(e) => updateField('availableQuantity', parseFloat(e.target.value) || 0)}
              placeholder="e.g., 50"
              className="w-full pl-9 pr-3 py-2 border border-sky-200 rounded-lg text-sm"
              required
            />
          </div>
          <p className="text-[10px] text-slate-text mt-1">In kilograms, bunches, pieces, etc.</p>
        </div>

        <div>
          <label className="text-xs text-slate-text mb-1 block">Minimum Order Quantity</label>
          <input
            type="number"
            step="0.01"
            value={data.minOrderQuantity || 1}
            onChange={(e) => updateField('minOrderQuantity', parseFloat(e.target.value) || 1)}
            className="w-full px-3 py-2 border border-sky-200 rounded-lg text-sm"
          />
        </div>

        <div>
          <label className="text-xs text-slate-text mb-1 block">Harvest Date (optional)</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="date"
              value={data.harvestDate || ''}
              onChange={(e) => updateField('harvestDate', e.target.value)}
              className="w-full pl-9 pr-3 py-2 border border-sky-200 rounded-lg text-sm"
            />
          </div>
        </div>

        <div>
          <label className="text-xs text-slate-text mb-1 block">Expiry Date (optional)</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="date"
              value={data.expiryDate || ''}
              onChange={(e) => updateField('expiryDate', e.target.value)}
              className="w-full pl-9 pr-3 py-2 border border-sky-200 rounded-lg text-sm"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 pt-2">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={data.isOrganic || false}
            onChange={(e) => updateField('isOrganic', e.target.checked)}
            className="rounded text-green-600 focus:ring-green-500"
          />
          <span className="text-sm text-charcoal">Organic</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={data.isCertified || false}
            onChange={(e) => updateField('isCertified', e.target.checked)}
            className="rounded text-green-600 focus:ring-green-500"
          />
          <span className="text-sm text-charcoal flex items-center gap-1">
            <CheckCircle className="w-4 h-4 text-green-600" /> Certified
          </span>
        </label>
      </div>

      <p className="text-xs text-slate-text/70 mt-2">
        All items are subject to verification. Farmers with certification may get a badge.
      </p>
    </div>
  );
};

export default FarmersFormFields;