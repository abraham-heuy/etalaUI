// pages/dashboard/seller-application.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Clock, 
  CheckCircle, 
  XCircle,
  AlertCircle,
  FileText,
  MapPin,
  Phone,
  Mail,
  Briefcase,
  Calendar,
  Loader2,
  ExternalLink
} from 'lucide-react';
import { SellerApplicationService, type SellerApplication } from '../../../services/Auth/seller-applications.service';

const SellerApplicationPage: React.FC = () => {
  const [application, setApplication] = useState<SellerApplication | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchApplication();
  }, []);

  const fetchApplication = async () => {
    try {
      setLoading(true);
      const apps = await SellerApplicationService.getMyApplications();
      if (apps && apps.length > 0) {
        setApplication(apps[0]); // Show the most recent application
      } else {
        setApplication(null);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const formatDateTime = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'pending':
        return { icon: Clock, color: 'text-amber-600', bg: 'bg-amber-100', label: 'Under Review' };
      case 'approved':
        return { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100', label: 'Approved' };
      case 'rejected':
        return { icon: XCircle, color: 'text-red-600', bg: 'bg-red-100', label: 'Not Approved' };
      default:
        return { icon: AlertCircle, color: 'text-gray-600', bg: 'bg-gray-100', label: 'Unknown' };
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-sky-500 animate-spin mx-auto mb-4" />
          <p className="text-sm text-slate-text">Loading application details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-sm text-slate-text">Failed to load application: {error}</p>
          <button
            onClick={fetchApplication}
            className="mt-4 text-sky-600 hover:underline"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!application) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <FileText className="w-16 h-16 text-slate-text/30 mx-auto mb-4" />
          <h2 className="text-xl font-display font-bold text-charcoal mb-2">No Application Found</h2>
          <p className="text-sm text-slate-text mb-4">
            You haven't submitted a seller application yet.
          </p>
          <Link
            to="/become-seller"
            className="inline-flex items-center gap-2 bg-redbull-blue text-white px-6 py-2 rounded-full text-sm font-medium"
          >
            Become a Seller
          </Link>
        </div>
      </div>
    );
  }

  const StatusIcon = getStatusConfig(application.status).icon;
  const statusConfig = getStatusConfig(application.status);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-0 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link
          to="/dashboard"
          className="p-2 rounded-full bg-sky-50 text-slate-text hover:text-redbull-blue hover:bg-sky-100 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-xl sm:text-2xl font-display font-bold text-charcoal">
            Seller Application
          </h1>
          <p className="text-xs sm:text-sm text-slate-text">
            Status and details of your application
          </p>
        </div>
      </div>

      {/* Status Card */}
      <div className={`${statusConfig.bg} rounded-xl p-6 border`}>
        <div className="flex items-start gap-4">
          <div className={`w-12 h-12 ${statusConfig.bg} rounded-full flex items-center justify-center`}>
            <StatusIcon className={`w-6 h-6 ${statusConfig.color}`} />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-display font-semibold text-charcoal">
              Application {statusConfig.label}
            </h2>
            <p className="text-sm text-slate-text mt-1">
              Submitted on {formatDate(application.createdAt)}
            </p>
            {application.status === 'pending' && (
              <p className="text-xs text-amber-700 mt-2">
                We are reviewing your application. This usually takes 2‑3 business days.
                You will be notified once a decision is made.
              </p>
            )}
            {application.status === 'rejected' && application.rejectionReason && (
              <div className="mt-3 p-3 bg-red-50 rounded-lg">
                <p className="text-xs font-medium text-red-800">Reason for rejection:</p>
                <p className="text-sm text-red-700 mt-1">{application.rejectionReason}</p>
                <Link
                  to="/become-seller"
                  className="inline-flex items-center gap-1 text-sm text-red-700 font-medium mt-2 hover:underline"
                >
                  Reapply now <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            )}
            {application.status === 'approved' && (
              <div className="mt-3 p-3 bg-green-50 rounded-lg">
                <p className="text-xs font-medium text-green-800">Congratulations!</p>
                <p className="text-sm text-green-700 mt-1">
                  Your seller account is now active. You can start listing products.
                </p>
                <Link
                  to="/dashboard/seller"
                  className="inline-flex items-center gap-1 text-sm text-green-700 font-medium mt-2 hover:underline"
                >
                  Go to Seller Dashboard <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Application Details */}
      <div className="bg-white rounded-xl border border-sky-100 p-6">
        <h2 className="text-base font-display font-semibold text-charcoal mb-4 flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-redbull-blue" />
          Business Information
        </h2>

        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-slate-text">Business Name</p>
              <p className="text-sm font-medium text-charcoal">{application.businessName}</p>
            </div>
            <div>
              <p className="text-xs text-slate-text">Category</p>
              <p className="text-sm font-medium text-charcoal capitalize">{application.category}</p>
            </div>
            <div className="sm:col-span-2">
              <p className="text-xs text-slate-text">Business Description</p>
              <p className="text-sm text-slate-text">{application.businessDescription}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div className="bg-white rounded-xl border border-sky-100 p-6">
        <h2 className="text-base font-display font-semibold text-charcoal mb-4 flex items-center gap-2">
          <FileText className="w-5 h-5 text-redbull-blue" />
          Personal Information
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-slate-text">Full Name</p>
            <p className="text-sm font-medium text-charcoal">{application.fullName}</p>
          </div>
          <div>
            <p className="text-xs text-slate-text">ID Number</p>
            <p className="text-sm font-medium text-charcoal">{application.idNumber}</p>
          </div>
          <div>
            <p className="text-xs text-slate-text flex items-center gap-1">
              <Phone className="w-3 h-3" /> Phone
            </p>
            <p className="text-sm text-charcoal">{application.phone}</p>
          </div>
          {application.email && (
            <div>
              <p className="text-xs text-slate-text flex items-center gap-1">
                <Mail className="w-3 h-3" /> Email
              </p>
              <p className="text-sm text-charcoal">{application.email}</p>
            </div>
          )}
          <div className="sm:col-span-2">
            <p className="text-xs text-slate-text flex items-center gap-1">
              <MapPin className="w-3 h-3" /> Address
            </p>
            <p className="text-sm text-charcoal">{application.address}, {application.city}</p>
          </div>
        </div>
      </div>

      {/* Verification Method */}
      <div className="bg-white rounded-xl border border-sky-100 p-6">
        <h2 className="text-base font-display font-semibold text-charcoal mb-4 flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-redbull-blue" />
          Verification Method
        </h2>
        <div className="space-y-3">
          <div>
            <p className="text-xs text-slate-text">Method</p>
            <p className="text-sm font-medium text-charcoal capitalize">{application.verificationMethod}</p>
          </div>
          {application.verificationMethod === 'documents' && application.documentPaths && (
            <div>
              <p className="text-xs text-slate-text">Documents Uploaded</p>
              <p className="text-sm text-slate-text">{application.documentPaths.length} file(s)</p>
            </div>
          )}
          {application.verificationMethod === 'physical' && application.physicalVisitDetails && (
            <div className="mt-3 p-3 bg-sky-50 rounded-lg">
              <p className="text-xs font-medium text-charcoal">Physical Visit Scheduled</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2 text-sm">
                <div><span className="text-slate-text">Business:</span> {application.physicalVisitDetails.businessName}</div>
                <div><span className="text-slate-text">Address:</span> {application.physicalVisitDetails.businessAddress}</div>
                <div><span className="text-slate-text">Phone:</span> {application.physicalVisitDetails.businessPhone}</div>
                <div><span className="text-slate-text">Email:</span> {application.physicalVisitDetails.businessEmail}</div>
                <div><span className="text-slate-text">Preferred Date:</span> {application.physicalVisitDetails.preferredDate}</div>
                <div><span className="text-slate-text">Time:</span> {application.physicalVisitDetails.preferredTime}</div>
              </div>
            </div>
          )}
          {application.verificationMethod === 'games' && application.gamesDiscount !== undefined && (
            <div>
              <p className="text-xs text-slate-text">Games Discount Earned</p>
              <p className="text-sm font-medium text-green-600">{application.gamesDiscount}% off verification fee</p>
            </div>
          )}
        </div>
      </div>

      {/* Review Info (if reviewed) */}
      {application.reviewedAt && (
        <div className="bg-white rounded-xl border border-sky-100 p-6">
          <h2 className="text-base font-display font-semibold text-charcoal mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-redbull-blue" />
            Review Information
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-slate-text">Reviewed On</p>
              <p className="text-sm text-charcoal">{formatDateTime(application.reviewedAt)}</p>
            </div>
            {application.reviewedBy && (
              <div>
                <p className="text-xs text-slate-text">Reviewed By</p>
                <p className="text-sm text-charcoal">{application.reviewedBy}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 pt-4">
        {application.status === 'rejected' && (
          <Link
            to="/become-seller"
            className="px-6 py-2.5 bg-redbull-blue text-white rounded-lg text-sm font-medium hover:bg-redbull-blue/90"
          >
            Reapply Now
          </Link>
        )}
        {application.status === 'approved' && (
          <Link
            to="/dashboard/seller"
            className="px-6 py-2.5 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700"
          >
            Go to Seller Dashboard
          </Link>
        )}
        {application.status === 'pending' && (
          <div className="text-sm text-slate-text bg-sky-50 px-4 py-2 rounded-lg">
            Your application is being processed. We'll notify you when it's reviewed.
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerApplicationPage;