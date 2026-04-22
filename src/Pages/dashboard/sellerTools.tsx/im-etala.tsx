import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Rocket, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import Modal from '../../../common/Modal';
import { useAuth } from '../../../contexts/auth/auth';


const InventoryManagerPage: React.FC = () => {
  const { user } = useAuth();
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [fullName, setFullName] = useState(user?.fullName || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleRequestSubmit = async () => {
    if (!fullName.trim()) return;
    setIsSubmitting(true);
    // Simulate API call – replace with actual backend endpoint
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log('Inventory manager request submitted:', { fullName, phone });
    setIsSubmitting(false);
    setSubmitted(true);
    setTimeout(() => {
      setShowRequestModal(false);
      setSubmitted(false);
    }, 2000);
  };

  return (
    <div className="space-y-8">
      {/* Back button */}
      <div className="flex items-center gap-4">
        <Link
          to="/dashboard/products"
          className="p-2 rounded-full bg-sky-50 text-slate-text hover:text-redbull-blue hover:bg-sky-100 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-charcoal">Inventory Manager</h1>
          <p className="text-slate-text mt-1">SaaS‑powered inventory tracking for sellers</p>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-white rounded-2xl border border-sky-100 overflow-hidden shadow-sm">
        <div className="flex flex-col lg:flex-row">
          {/* Left content */}
          <div className="flex-1 p-6 lg:p-8">
            <div className="inline-flex items-center gap-2 bg-sky-100 text-sky-700 px-3 py-1 rounded-full text-sm mb-4">
              <Rocket className="w-4 h-4" />
              <span>IM‑(etala) • SaaS for sellers</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-charcoal mb-3">
              Take control of your inventory
            </h2>
            <p className="text-slate-text mb-4">
              Real‑time stock updates, automated reorder alerts, sales analytics, and multi‑channel sync – all in one dashboard.
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center gap-2 text-sm"><CheckCircle className="w-4 h-4 text-green-600" /> Centralised product catalogue</li>
              <li className="flex items-center gap-2 text-sm"><CheckCircle className="w-4 h-4 text-green-600" /> Low stock notifications & forecasts</li>
              <li className="flex items-center gap-2 text-sm"><CheckCircle className="w-4 h-4 text-green-600" /> Export reports for accounting</li>
              <li className="flex items-center gap-2 text-sm"><CheckCircle className="w-4 h-4 text-green-600" /> Sync with marketplace, farmers & more</li>
            </ul>
            <button
              onClick={() => setShowRequestModal(true)}
              className="bg-redbull-blue text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-redbull-blue/90 transition-colors flex items-center gap-2"
            >
              <Rocket className="w-4 h-4" />
              Request early access
            </button>
          </div>

          {/* Right image (placeholder) */}
          <div className="lg:w-1/2 bg-gradient-to-br from-sky-100 to-sky-200 flex items-center justify-center p-6">
            <img
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop"
              alt="Inventory management dashboard preview"
              className="rounded-xl shadow-lg w-full max-w-md object-cover"
            />
          </div>
        </div>
      </div>

      {/* Features / Why use it */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl border border-sky-100 p-5">
          <div className="w-10 h-10 bg-sky-100 rounded-full flex items-center justify-center mb-3">
            <Rocket className="w-5 h-5 text-sky-600" />
          </div>
          <h3 className="text-base font-semibold text-charcoal mb-2">For any business size</h3>
          <p className="text-sm text-slate-text">From solo entrepreneurs to large teams – scale as you grow.</p>
        </div>
        <div className="bg-white rounded-xl border border-sky-100 p-5">
          <div className="w-10 h-10 bg-sky-100 rounded-full flex items-center justify-center mb-3">
            <CheckCircle className="w-5 h-5 text-sky-600" />
          </div>
          <h3 className="text-base font-semibold text-charcoal mb-2">Tailored for you</h3>
          <p className="text-sm text-slate-text">Custom workflows, role‑based access, and industry‑specific fields.</p>
        </div>
        <div className="bg-white rounded-xl border border-sky-100 p-5">
          <div className="w-10 h-10 bg-sky-100 rounded-full flex items-center justify-center mb-3">
            <AlertCircle className="w-5 h-5 text-sky-600" />
          </div>
          <h3 className="text-base font-semibold text-charcoal mb-2">SaaS flexibility</h3>
          <p className="text-sm text-slate-text">Pay as you grow, cancel anytime, and get dedicated support.</p>
        </div>
      </div>

      {/* Request Access Modal */}
      <Modal
        isOpen={showRequestModal}
        onClose={() => setShowRequestModal(false)}
        title="Request early access"
      >
        {submitted ? (
          <div className="text-center py-6">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-charcoal">Request sent!</h3>
            <p className="text-sm text-slate-text">We’ll notify you when IM‑(etala) is ready for you.</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-charcoal mb-1">Full name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder={user?.fullName || 'Your full name'}
                className="w-full px-4 py-2 border border-sky-200 rounded-lg focus:outline-none focus:border-redbull-blue"
              />
              <p className="text-xs text-slate-text mt-1">Please type your full name to confirm.</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-charcoal mb-1">Phone number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={user?.phone || 'Your phone number'}
                className="w-full px-4 py-2 border border-sky-200 rounded-lg focus:outline-none focus:border-redbull-blue"
              />
            </div>
            <button
              onClick={handleRequestSubmit}
              disabled={!fullName.trim() || isSubmitting}
              className="w-full py-2.5 bg-redbull-blue text-white rounded-lg font-medium hover:bg-redbull-blue/90 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Rocket className="w-4 h-4" />}
              Request access
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default InventoryManagerPage;