// pages/dashboard/addresses.tsx
import React, { useState } from 'react';
import { 
  MapPin, 
  Plus, 
  Edit2, 
  Trash2,
  Home,
  Briefcase,
  CheckCircle
} from 'lucide-react';

const AddressesPage: React.FC = () => {
  const [showAddForm, setShowAddForm] = useState(false);

  // Mock addresses
  const addresses = [
    {
      id: 1,
      type: 'home',
      label: 'Home',
      name: 'John Doe',
      address: '123 Main Street',
      city: 'Tala Town',
      county: 'Machakos',
      phone: '+254 712 345 678',
      isDefault: true,
    },
    {
      id: 2,
      type: 'work',
      label: 'Work',
      name: 'John Doe',
      address: '456 Business District',
      city: 'Kangundo',
      county: 'Machakos',
      phone: '+254 723 456 789',
      isDefault: false,
    },
  ];

  const getIcon = (type: string) => {
    switch(type) {
      case 'home': return Home;
      case 'work': return Briefcase;
      default: return MapPin;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-charcoal">
            Saved Addresses
          </h1>
          <p className="text-slate-text mt-1">
            Manage your delivery addresses
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-redbull-blue text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-redbull-blue/90 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add New
        </button>
      </div>

      {/* Addresses Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {addresses.map((address) => {
          const Icon = getIcon(address.type);
          return (
            <div
              key={address.id}
              className="bg-white rounded-xl border border-sky-100 p-4 relative"
            >
              {address.isDefault && (
                <div className="absolute top-4 right-4 flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                  <CheckCircle className="w-3 h-3" />
                  Default
                </div>
              )}
              
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 bg-sky-100 rounded-full flex items-center justify-center">
                  <Icon className="w-5 h-5 text-redbull-blue" />
                </div>
                <div>
                  <h3 className="text-base font-display font-semibold text-charcoal">
                    {address.label}
                  </h3>
                  <p className="text-sm text-slate-text">{address.name}</p>
                </div>
              </div>

              <div className="space-y-1 text-sm text-slate-text mb-4 pl-13">
                <p>{address.address}</p>
                <p>{address.city}, {address.county}</p>
                <p className="text-redbull-blue">{address.phone}</p>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-sky-100">
                {!address.isDefault && (
                  <button className="text-xs text-slate-text hover:text-redbull-blue px-3 py-1">
                    Set as Default
                  </button>
                )}
                <button className="p-1.5 text-slate-text hover:text-redbull-blue rounded-lg">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button className="p-1.5 text-slate-text hover:text-red-600 rounded-lg">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Address Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <h2 className="text-xl font-display font-semibold text-charcoal mb-4">
              Add New Address
            </h2>
            
            <form className="space-y-4">
              <div>
                <label className="text-xs font-medium text-slate-text mb-1 block">
                  Address Label
                </label>
                <select className="w-full px-3 py-2 border border-sky-200 rounded-lg text-sm">
                  <option value="home">Home</option>
                  <option value="work">Work</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-text mb-1 block">
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-sky-200 rounded-lg text-sm"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-text mb-1 block">
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="w-full px-3 py-2 border border-sky-200 rounded-lg text-sm"
                  placeholder="07XX XXX XXX"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-text mb-1 block">
                  Address
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-sky-200 rounded-lg text-sm"
                  placeholder="Street address"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-slate-text mb-1 block">
                    City/Town
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-sky-200 rounded-lg text-sm"
                    placeholder="Tala Town"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-text mb-1 block">
                    County
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-sky-200 rounded-lg text-sm"
                    placeholder="Machakos"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" id="setDefault" className="rounded text-redbull-blue" />
                <label htmlFor="setDefault" className="text-sm text-slate-text">
                  Set as default address
                </label>
              </div>

              <div className="flex gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 px-4 py-2 border border-sky-200 text-slate-text rounded-lg text-sm font-medium hover:bg-sky-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-redbull-blue text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-redbull-blue/90"
                >
                  Save Address
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Empty State */}
      {addresses.length === 0 && !showAddForm && (
        <div className="text-center py-12">
          <MapPin className="w-16 h-16 text-slate-text/30 mx-auto mb-4" />
          <h3 className="text-lg font-display font-medium text-charcoal mb-2">
            No saved addresses
          </h3>
          <p className="text-sm text-slate-text mb-4">
            Add your first delivery address
          </p>
          <button
            onClick={() => setShowAddForm(true)}
            className="inline-flex items-center gap-2 bg-redbull-blue text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-redbull-blue/90"
          >
            <Plus className="w-4 h-4" />
            Add Address
          </button>
        </div>
      )}
    </div>
  );
};

export default AddressesPage;