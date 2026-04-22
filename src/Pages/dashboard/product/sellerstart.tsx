// pages/dashboard/SellerStart.tsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Store, 
  Package, 
  CheckCircle, 
  AlertCircle, 
  Loader2,
  ArrowRight,
  ShoppingBag,
  Sprout,
  UtensilsCrossed,
  Hotel,
  CarTaxiFront,
  Briefcase,
  PlusCircle,
  Clock
} from 'lucide-react';
import { type SellerApplication, SellerApplicationService } from '../../../services/Auth/seller-applications.service';

// Map category to icon and display name
const categoryConfig: Record<string, { icon: React.ElementType; name: string; color: string; bgLight: string }> = {
  marketplace: { icon: ShoppingBag, name: 'Marketplace', color: 'text-sky-600', bgLight: 'bg-sky-50' },
  farmers: { icon: Sprout, name: 'Farmers', color: 'text-green-600', bgLight: 'bg-green-50' },
  food: { icon: UtensilsCrossed, name: 'Food', color: 'text-amber-600', bgLight: 'bg-amber-50' },
  stays: { icon: Hotel, name: 'Stays', color: 'text-purple-600', bgLight: 'bg-purple-50' },
  boda: { icon: CarTaxiFront, name: 'Boda & Transport', color: 'text-orange-600', bgLight: 'bg-orange-50' },
  services: { icon: Briefcase, name: 'Services', color: 'text-indigo-600', bgLight: 'bg-indigo-50' },
};

const SellerStart: React.FC = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState<SellerApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAllApplications();
  }, []);

  const fetchAllApplications = async () => {
    setLoading(true);
    setError(null);
    try {
      const apps = await SellerApplicationService.getMyApplications();
      setApplications(apps);
    } catch (err: any) {
      setError(err.message || 'Failed to load seller status');
    } finally {
      setLoading(false);
    }
  };

  const handleStartPosting = (category: string) => {
    navigate(`/dashboard/products/new?category=${category}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-sky-500 animate-spin mx-auto mb-4" />
          <p className="text-sm text-slate-text">Loading your seller status...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-red-600 mb-2">{error}</p>
          <button onClick={fetchAllApplications} className="text-sky-600 hover:underline">Retry</button>
        </div>
      </div>
    );
  }

  // Separate approved and pending applications
  const approvedApps = applications.filter(app => app.status === 'approved');
  const pendingApps = applications.filter(app => app.status === 'pending');
  const hasAny = approvedApps.length > 0 || pendingApps.length > 0;

  if (!hasAny) {
    return (
      <div className="max-w-3xl mx-auto py-8 px-4">
        <div className="text-center mb-8">
          <Store className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h1 className="text-2xl font-display font-bold text-charcoal">Become a Seller on E-TALA</h1>
          <p className="text-slate-text mt-2">Start selling your products and reach thousands of customers in Tala.</p>
        </div>
        <div className="bg-white rounded-xl border border-sky-100 p-6 text-center">
          <p className="text-charcoal mb-4">You haven't applied to become a seller yet.</p>
          <Link
            to="/become-seller"
            className="inline-flex items-center gap-2 bg-sky-500 text-white px-6 py-3 rounded-xl font-medium hover:bg-sky-600 transition-colors"
          >
            Apply to Sell
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-2xl font-display font-bold text-charcoal">Seller Dashboard</h1>
        <p className="text-slate-text mt-1">
          {approvedApps.length > 0 
            ? "You are approved to sell in the following categories. Select one to start listing products."
            : "Your applications are pending review. You'll be able to start posting once approved."}
        </p>
      </div>

      <div className="space-y-6">
        {/* Approved categories */}
        {approvedApps.map((app) => {
          const cat = categoryConfig[app.category];
          if (!cat) return null;
          const Icon = cat.icon;
          return (
            <div key={app.id} className={`${cat.bgLight} rounded-2xl border border-sky-100 p-6 shadow-sm`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-white shadow-sm`}>
                    <Icon className={`w-6 h-6 ${cat.color}`} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl font-display font-semibold text-charcoal">{cat.name}</h2>
                      <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" /> Approved
                      </span>
                    </div>
                    <p className="text-sm text-slate-text mt-1">
                      Your seller application for {cat.name} was approved on {new Date(app.updatedAt).toLocaleDateString()}.
                    </p>
                    <p className="text-xs text-slate-text mt-2">
                      Business: {app.businessName}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleStartPosting(app.category)}
                  className="flex items-center gap-2 px-5 py-2 bg-sky-500 text-white rounded-xl text-sm font-medium hover:bg-sky-600 transition-colors whitespace-nowrap self-start sm:self-center"
                >
                  <Package className="w-4 h-4" />
                  Start Posting
                </button>
              </div>
            </div>
          );
        })}

        {/* Pending applications */}
        {pendingApps.map((app) => {
          const cat = categoryConfig[app.category];
          if (!cat) return null;
          const Icon = cat.icon;
          return (
            <div key={app.id} className={`${cat.bgLight} rounded-2xl border border-sky-100 p-6 shadow-sm opacity-80`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-white shadow-sm`}>
                    <Icon className={`w-6 h-6 ${cat.color}`} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl font-display font-semibold text-charcoal">{cat.name}</h2>
                      <span className="bg-amber-100 text-amber-700 text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Clock className="w-3 h-3" /> Pending
                      </span>
                    </div>
                    <p className="text-sm text-slate-text mt-1">
                      Your application for {cat.name} is under review.
                    </p>
                    <p className="text-xs text-slate-text mt-2">
                      Submitted on {new Date(app.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <button
                  disabled
                  className="flex items-center gap-2 px-5 py-2 bg-gray-300 text-gray-500 rounded-xl text-sm font-medium cursor-not-allowed whitespace-nowrap self-start sm:self-center"
                >
                  <Clock className="w-4 h-4" />
                  Pending Approval
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Apply for another category */}
      <div className="mt-8 bg-white rounded-xl border border-sky-100 p-6 text-center shadow-sm">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center">
              <PlusCircle className="w-6 h-6 text-sky-600" />
            </div>
            <div className="text-left">
              <h3 className="text-base font-semibold text-charcoal">Want to sell in more categories?</h3>
              <p className="text-sm text-slate-text">
                Apply for additional categories to expand your business.
              </p>
            </div>
          </div>
          <Link
            to="/become-seller"
            className="inline-flex items-center gap-2 bg-sky-500 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-sky-600 transition-colors"
          >
            Apply for another category
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <div className="mt-8 bg-sky-50 rounded-xl p-5 border border-sky-100">
        <h3 className="text-sm font-semibold text-charcoal mb-2">Need help?</h3>
        <p className="text-sm text-slate-text">
          If you have questions about listing products, visit our <Link to="/help" className="text-sky-600 hover:underline">Seller Help Center</Link> or contact support.
        </p>
      </div>
    </div>
  );
};

export default SellerStart;