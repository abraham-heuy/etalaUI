// pages/dashboard/products/forms/MarketplaceFields.tsx
import React from 'react';

interface MarketplaceFieldsProps {
  data: {
    brand?: string;
    model?: string;
    sku?: string;
  };
  onChange: (data: Partial<{ brand: string; model: string; sku: string }>) => void;
}

const MarketplaceFields: React.FC<MarketplaceFieldsProps> = ({ data, onChange }) => {
  return (
    <div className="bg-sky-50 rounded-lg p-4 mt-4">
      <h3 className="text-sm font-medium text-charcoal mb-3">Additional Product Details</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-slate-text mb-1 block">Brand</label>
          <input
            type="text"
            value={data.brand || ''}
            onChange={(e) => onChange({ brand: e.target.value })}
            placeholder="e.g., Apple"
            className="w-full px-3 py-2 border border-sky-200 rounded-lg text-sm"
          />
        </div>
        <div>
          <label className="text-xs text-slate-text mb-1 block">Model</label>
          <input
            type="text"
            value={data.model || ''}
            onChange={(e) => onChange({ model: e.target.value })}
            placeholder="e.g., A2487"
            className="w-full px-3 py-2 border border-sky-200 rounded-lg text-sm"
          />
        </div>
        <div>
          <label className="text-xs text-slate-text mb-1 block">SKU (Optional)</label>
          <input
            type="text"
            value={data.sku || ''}
            onChange={(e) => onChange({ sku: e.target.value })}
            placeholder="Stock keeping unit"
            className="w-full px-3 py-2 border border-sky-200 rounded-lg text-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default MarketplaceFields;