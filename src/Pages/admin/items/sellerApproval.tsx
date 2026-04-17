// pages/admin/SellerApprovals.tsx
import React, { useState, useEffect } from 'react';
import { 
  Store,
  CheckCircle,
  XCircle,
  Eye,
  Mail,
  Phone,
  FileText,
  Building,
  User,
  Clock,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { SellerApplicationService, type SellerApplication } from '../../../services/Auth/seller-applications.service';

const SellerApprovals: React.FC = () => {
  const [applications, setApplications] = useState<SellerApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedApplication, setSelectedApplication] = useState<SellerApplication | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const response = await SellerApplicationService.listAll();
      setApplications(response.data);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: string) => {
    if (!window.confirm('Are you sure you want to approve this application?')) return;
    setActionLoading(true);
    try {
      await SellerApplicationService.approve(id);
      await fetchApplications(); // Refresh list
      setShowModal(false);
    } catch (err: any) {
      alert('Failed to approve: ' + err.message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async (id: string) => {
    if (!rejectReason.trim()) {
      alert('Please provide a rejection reason');
      return;
    }
    setActionLoading(true);
    try {
      await SellerApplicationService.reject(id, rejectReason);
      await fetchApplications();
      setShowRejectModal(false);
      setRejectReason('');
      setShowModal(false);
    } catch (err: any) {
      alert('Failed to reject: ' + err.message);
    } finally {
      setActionLoading(false);
    }
  };

  const openRejectModal = (application: SellerApplication) => {
    setSelectedApplication(application);
    setRejectReason('');
    setShowRejectModal(true);
    setShowModal(false);
  };

  const viewDetails = (app: SellerApplication) => {
    setSelectedApplication(app);
    setShowModal(true);
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-700',
      approved: 'bg-green-100 text-green-700',
      rejected: 'bg-red-100 text-red-700',
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-700';
  };

  // Compute stats
  const pendingCount = applications.filter(a => a.status === 'pending').length;
  const approvedCount = applications.filter(a => a.status === 'approved').length;
  const rejectedCount = applications.filter(a => a.status === 'rejected').length;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-sky-500 animate-spin mx-auto mb-4" />
          <p className="text-sm text-slate-text">Loading applications...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <p className="text-red-600">Failed to load applications: {error}</p>
        <button onClick={fetchApplications} className="mt-4 text-sky-600 hover:underline">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-display font-bold text-charcoal">Seller Approvals</h1>
        <p className="text-slate-text mt-1">Review and verify seller applications</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-4 border border-sky-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-text">Pending Approvals</p>
              <p className="text-2xl font-bold text-yellow-600">{pendingCount}</p>
            </div>
            <Clock className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-sky-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-text">Approved</p>
              <p className="text-2xl font-bold text-green-600">{approvedCount}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-sky-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-text">Rejected</p>
              <p className="text-2xl font-bold text-red-600">{rejectedCount}</p>
            </div>
            <XCircle className="w-8 h-8 text-red-500" />
          </div>
        </div>
      </div>

      {/* Applications List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {applications.map((app) => (
          <div key={app.id} className="bg-white rounded-xl shadow-sm border border-sky-100 overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-redbull-blue-light rounded-lg">
                    <Store className="w-6 h-6 text-redbull-blue" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-charcoal">{app.businessName}</h3>
                    <p className="text-sm text-slate-text">Submitted: {new Date(app.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${getStatusBadge(app.status)}`}>
                  {app.status}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-slate-text">
                  <User className="w-4 h-4" />
                  <span>Owner: {app.fullName}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-text">
                  <Mail className="w-4 h-4" />
                  <span>{app.email || 'N/A'}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-text">
                  <Phone className="w-4 h-4" />
                  <span>{app.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-text">
                  <Building className="w-4 h-4" />
                  <span>{app.category}</span>
                </div>
              </div>

              <p className="text-sm text-slate-text mb-4 line-clamp-2">
                {app.businessDescription}
              </p>

              <div className="flex gap-2">
                <button
                  onClick={() => viewDetails(app)}
                  className="flex-1 px-4 py-2 text-sm bg-sky-50 text-slate-text rounded-lg hover:bg-sky-100 transition-colors flex items-center justify-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  View Details
                </button>
                {app.status === 'pending' && (
                  <>
                    <button
                      onClick={() => handleApprove(app.id)}
                      disabled={actionLoading}
                      className="flex-1 px-4 py-2 text-sm bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Approve
                    </button>
                    <button
                      onClick={() => openRejectModal(app)}
                      disabled={actionLoading}
                      className="flex-1 px-4 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      <XCircle className="w-4 h-4" />
                      Reject
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {applications.length === 0 && (
        <div className="text-center py-12">
          <Store className="w-16 h-16 text-slate-text/30 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-charcoal mb-2">No Applications</h3>
          <p className="text-sm text-slate-text">No seller applications found.</p>
        </div>
      )}

      {/* View Details Modal */}
      {showModal && selectedApplication && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-sky-100 p-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-charcoal">Seller Application Details</h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-1 hover:bg-sky-50 rounded-lg"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Business Information */}
              <div>
                <h3 className="text-lg font-semibold text-charcoal mb-3 flex items-center gap-2">
                  <Store className="w-5 h-5" />
                  Business Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-slate-text">Business Name</p>
                    <p className="font-medium text-charcoal">{selectedApplication.businessName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-text">Category</p>
                    <p className="font-medium text-charcoal capitalize">{selectedApplication.category}</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-sm text-slate-text">Description</p>
                    <p className="text-sm text-charcoal">{selectedApplication.businessDescription}</p>
                  </div>
                </div>
              </div>

              {/* Owner Information */}
              <div>
                <h3 className="text-lg font-semibold text-charcoal mb-3 flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Owner Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-slate-text">Full Name</p>
                    <p className="font-medium text-charcoal">{selectedApplication.fullName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-text">ID Number</p>
                    <p className="font-medium text-charcoal">{selectedApplication.idNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-text">Email</p>
                    <p className="font-medium text-charcoal">{selectedApplication.email || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-text">Phone</p>
                    <p className="font-medium text-charcoal">{selectedApplication.phone}</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-sm text-slate-text">Address</p>
                    <p className="font-medium text-charcoal">{selectedApplication.address}, {selectedApplication.city}</p>
                  </div>
                </div>
              </div>

              {/* Verification Method */}
              <div>
                <h3 className="text-lg font-semibold text-charcoal mb-3 flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Verification Method
                </h3>
                <p className="text-sm text-charcoal capitalize">{selectedApplication.verificationMethod}</p>
                {selectedApplication.verificationMethod === 'documents' && selectedApplication.documentPaths && (
                  <div className="mt-2">
                    <p className="text-sm text-slate-text">Documents uploaded: {selectedApplication.documentPaths.length}</p>
                  </div>
                )}
                {selectedApplication.verificationMethod === 'physical' && selectedApplication.physicalVisitDetails && (
                  <div className="mt-2 p-3 bg-sky-50 rounded-lg text-sm">
                    <p><strong>Business:</strong> {selectedApplication.physicalVisitDetails.businessName}</p>
                    <p><strong>Address:</strong> {selectedApplication.physicalVisitDetails.businessAddress}</p>
                    <p><strong>Phone:</strong> {selectedApplication.physicalVisitDetails.businessPhone}</p>
                    <p><strong>Email:</strong> {selectedApplication.physicalVisitDetails.businessEmail}</p>
                    <p><strong>Preferred Date:</strong> {selectedApplication.physicalVisitDetails.preferredDate}</p>
                    <p><strong>Time:</strong> {selectedApplication.physicalVisitDetails.preferredTime}</p>
                  </div>
                )}
                {selectedApplication.verificationMethod === 'games' && (
                  <p className="text-sm text-green-600 mt-1">Games discount: {selectedApplication.gamesDiscount}%</p>
                )}
              </div>

              {/* Action Buttons */}
              {selectedApplication.status === 'pending' && (
                <div className="flex gap-3 pt-4 border-t border-sky-100">
                  <button
                    onClick={() => handleApprove(selectedApplication.id)}
                    disabled={actionLoading}
                    className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Approve Application
                  </button>
                  <button
                    onClick={() => {
                      setShowModal(false);
                      openRejectModal(selectedApplication);
                    }}
                    disabled={actionLoading}
                    className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <XCircle className="w-4 h-4" />
                    Reject Application
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Reject Reason Modal */}
      {showRejectModal && selectedApplication && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h2 className="text-xl font-bold text-charcoal mb-4">Reject Application</h2>
            <p className="text-sm text-slate-text mb-2">
              Please provide a reason for rejecting <strong>{selectedApplication.businessName}</strong>
            </p>
            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-sky-200 rounded-lg focus:outline-none focus:border-redbull-blue"
              placeholder="Enter rejection reason..."
            />
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => setShowRejectModal(false)}
                className="flex-1 px-4 py-2 border border-sky-200 text-slate-text rounded-lg hover:bg-sky-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleReject(selectedApplication.id)}
                disabled={actionLoading || !rejectReason.trim()}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50"
              >
                {actionLoading ? 'Processing...' : 'Confirm Reject'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerApprovals;