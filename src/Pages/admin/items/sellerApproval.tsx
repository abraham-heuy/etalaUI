// pages/admin/SellerApprovals.tsx
import React, { useState } from 'react';
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
  Clock
} from 'lucide-react';

interface SellerApplication {
  id: string;
  businessName: string;
  ownerName: string;
  email: string;
  phone: string;
  address: string;
  businessType: string;
  registrationNumber: string;
  taxId: string;
  documents: string[];
  status: 'pending' | 'approved' | 'rejected';
  submittedDate: string;
  description: string;
}

const SellerApprovals: React.FC = () => {
  const [selectedApplication, setSelectedApplication] = useState<SellerApplication | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Mock applications data
  const applications: SellerApplication[] = [
    {
      id: 'APP-001',
      businessName: 'Tech Haven Store',
      ownerName: 'John Doe',
      email: 'john@techhaven.com',
      phone: '+1234567890',
      address: '123 Tech Street, Silicon Valley, CA',
      businessType: 'Electronics',
      registrationNumber: 'BUS-12345',
      taxId: 'TAX-98765',
      documents: ['business_license.pdf', 'tax_certificate.pdf'],
      status: 'pending',
      submittedDate: '2024-03-15',
      description: 'A premium electronics store specializing in latest gadgets and accessories.'
    },
    {
      id: 'APP-002',
      businessName: 'Fashion Forward',
      ownerName: 'Jane Smith',
      email: 'jane@fashionforward.com',
      phone: '+1234567891',
      address: '456 Fashion Ave, New York, NY',
      businessType: 'Clothing',
      registrationNumber: 'BUS-23456',
      taxId: 'TAX-87654',
      documents: ['business_license.pdf', 'brand_certificate.pdf'],
      status: 'pending',
      submittedDate: '2024-03-14',
      description: 'Trendy clothing store featuring latest fashion trends.'
    },
  ];

  const handleApprove = (id: string) => {
    console.log('Approving application:', id);
    setShowModal(false);
  };

  const handleReject = (id: string) => {
    console.log('Rejecting application:', id);
    setShowModal(false);
  };

  const handleViewDetails = (application: SellerApplication) => {
    setSelectedApplication(application);
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
              <p className="text-2xl font-bold text-yellow-600">8</p>
            </div>
            <Clock className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-sky-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-text">Approved This Month</p>
              <p className="text-2xl font-bold text-green-600">12</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-sky-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-text">Rejected</p>
              <p className="text-2xl font-bold text-red-600">3</p>
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
                    <p className="text-sm text-slate-text">Submitted: {app.submittedDate}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${getStatusBadge(app.status)}`}>
                  {app.status}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-slate-text">
                  <User className="w-4 h-4" />
                  <span>Owner: {app.ownerName}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-text">
                  <Mail className="w-4 h-4" />
                  <span>{app.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-text">
                  <Phone className="w-4 h-4" />
                  <span>{app.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-text">
                  <Building className="w-4 h-4" />
                  <span>{app.businessType}</span>
                </div>
              </div>

              <p className="text-sm text-slate-text mb-4 line-clamp-2">
                {app.description}
              </p>

              <div className="flex gap-2">
                <button
                  onClick={() => handleViewDetails(app)}
                  className="flex-1 px-4 py-2 text-sm bg-sky-50 text-slate-text rounded-lg hover:bg-sky-100 transition-colors flex items-center justify-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  View Details
                </button>
                {app.status === 'pending' && (
                  <>
                    <button
                      onClick={() => handleApprove(app.id)}
                      className="flex-1 px-4 py-2 text-sm bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(app.id)}
                      className="flex-1 px-4 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
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

      {/* Modal for Viewing Details */}
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
                    <p className="text-sm text-slate-text">Business Type</p>
                    <p className="font-medium text-charcoal">{selectedApplication.businessType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-text">Registration Number</p>
                    <p className="font-medium text-charcoal">{selectedApplication.registrationNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-text">Tax ID</p>
                    <p className="font-medium text-charcoal">{selectedApplication.taxId}</p>
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
                    <p className="font-medium text-charcoal">{selectedApplication.ownerName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-text">Email</p>
                    <p className="font-medium text-charcoal">{selectedApplication.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-text">Phone</p>
                    <p className="font-medium text-charcoal">{selectedApplication.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-text">Address</p>
                    <p className="font-medium text-charcoal">{selectedApplication.address}</p>
                  </div>
                </div>
              </div>

              {/* Documents */}
              <div>
                <h3 className="text-lg font-semibold text-charcoal mb-3 flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Submitted Documents
                </h3>
                <div className="space-y-2">
                  {selectedApplication.documents.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-sky-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-redbull-blue" />
                        <span className="text-sm text-charcoal">{doc}</span>
                      </div>
                      <button className="text-sm text-redbull-blue hover:underline">View</button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold text-charcoal mb-3">Business Description</h3>
                <p className="text-slate-text">{selectedApplication.description}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-sky-100">
                <button
                  onClick={() => handleApprove(selectedApplication.id)}
                  className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-4 h-4" />
                  Approve Application
                </button>
                <button
                  onClick={() => handleReject(selectedApplication.id)}
                  className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
                >
                  <XCircle className="w-4 h-4" />
                  Reject Application
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerApprovals;