// pages/dashboard/sales/[id].tsx
import React, { useState, useEffect } from 'react';
import { useParams, Link} from 'react-router-dom';
import { 
  ArrowLeft,
  Package,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
  Download,
  Printer,
  Mail,
  MapPin,
  CreditCard,
  User,
  FileText,
  MessageCircle,
  Save} from 'lucide-react';
import ConfirmModal from '../../../common/ConfirmModal';
import Modal from '../../../common/Modal';

type OrderStatus = 'processing' | 'shipped' | 'delivered' | 'cancelled';
type PaymentStatus = 'paid' | 'pending' | 'failed' | 'refunded';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  sku?: string;
}

interface OrderDetails {
  id: string;
  date: string;
  customer: {
    id: string;
    name: string;
    email: string;
    phone: string;
    avatar?: string;
  };
  shippingAddress: {
    name: string;
    address: string;
    city: string;
    county: string;
    phone: string;
  };
  billingAddress?: {
    name: string;
    address: string;
    city: string;
    county: string;
    phone: string;
  };
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  discount?: number;
  couponCode?: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: string;
  trackingNumber?: string;
  carrier?: string;
  estimatedDelivery?: string;
  notes?: string;
  timeline: {
    date: string;
    status: string;
    description: string;
  }[];
}

const SalesOrderDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState<OrderDetails | null>(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showUpdateStatusModal, setShowUpdateStatusModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus>('processing');
  const [isUpdating, setIsUpdating] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState('');
  const [isEditingTracking, setIsEditingTracking] = useState(false);

  // Mock data fetch
  useEffect(() => {
    setTimeout(() => {
      const mockOrder: OrderDetails = {
        id: id || 'ORD-1234',
        date: '2026-03-10',
        customer: {
          id: 'cust-1',
          name: 'John Kamau',
          email: 'john.kamau@example.com',
          phone: '+254 712 345 678',
        },
        shippingAddress: {
          name: 'John Kamau',
          address: '123 Moi Avenue',
          city: 'Tala Town',
          county: 'Machakos',
          phone: '+254 712 345 678',
        },
        billingAddress: {
          name: 'John Kamau',
          address: '123 Moi Avenue',
          city: 'Tala Town',
          county: 'Machakos',
          phone: '+254 712 345 678',
        },
        items: [
          {
            id: 'p1',
            name: 'iPhone 13 Pro Max',
            price: 145000,
            quantity: 1,
            image: 'https://images.unsplash.com/photo-1632661674596-df8be6a1c9e1?w=100&h=100&fit=crop',
            sku: 'IP13PM-512',
          },
          {
            id: 'p2',
            name: 'Screen Protector',
            price: 1500,
            quantity: 2,
            image: 'https://images.unsplash.com/photo-1632661674596-df8be6a1c9e1?w=100&h=100&fit=crop',
            sku: 'SP-IP13',
          },
        ],
        subtotal: 148000,
        shipping: 500,
        tax: 0,
        total: 148500,
        discount: 0,
        status: 'processing',
        paymentStatus: 'paid',
        paymentMethod: 'M-PESA',
        trackingNumber: 'MPE-123456789',
        carrier: 'G4S',
        estimatedDelivery: '2026-03-15',
        notes: 'Please leave package with security guard if not home.',
        timeline: [
          {
            date: '2026-03-10 09:23',
            status: 'order_placed',
            description: 'Order placed by customer',
          },
          {
            date: '2026-03-10 09:25',
            status: 'payment_confirmed',
            description: 'Payment confirmed via M-PESA',
          },
          {
            date: '2026-03-10 14:30',
            status: 'processing',
            description: 'Order is being processed',
          },
        ],
      };
      setOrder(mockOrder);
      setSelectedStatus(mockOrder.status);
      setTrackingNumber(mockOrder.trackingNumber || '');
      setLoading(false);
    }, 1000);
  }, [id]);

  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case 'delivered': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'shipped': return <Truck className="w-5 h-5 text-blue-600" />;
      case 'processing': return <Clock className="w-5 h-5 text-amber-600" />;
      case 'cancelled': return <XCircle className="w-5 h-5 text-red-600" />;
      default: return <Package className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-700 border-green-200';
      case 'shipped': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'processing': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'cancelled': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getPaymentStatusColor = (status: PaymentStatus) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-amber-100 text-amber-700';
      case 'failed': return 'bg-red-100 text-red-700';
      case 'refunded': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const handleUpdateStatus = async () => {
    setIsUpdating(true);
    setTimeout(() => {
      setOrder(prev => prev ? { ...prev, status: selectedStatus } : null);
      setIsUpdating(false);
      setShowUpdateStatusModal(false);
    }, 1500);
  };

  const handleCancelOrder = async () => {
    setIsUpdating(true);
    setTimeout(() => {
      setOrder(prev => prev ? { ...prev, status: 'cancelled' } : null);
      setIsUpdating(false);
      setShowCancelModal(false);
    }, 1500);
  };

  const handleSaveTracking = () => {
    setOrder(prev => prev ? { ...prev, trackingNumber } : null);
    setIsEditingTracking(false);
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-redbull-blue border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-sm text-slate-text">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <Package className="w-16 h-16 text-slate-text/30 mx-auto mb-4" />
          <h2 className="text-xl font-display font-bold text-charcoal mb-2">Order Not Found</h2>
          <p className="text-sm text-slate-text mb-4">The order you're looking for doesn't exist.</p>
          <Link
            to="/dashboard/sales"
            className="inline-flex items-center gap-2 bg-redbull-blue text-white px-4 py-2 rounded-lg text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Sales
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-0 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            to="/dashboard/sales"
            className="p-2 rounded-full bg-sky-50 text-slate-text hover:text-redbull-blue hover:bg-sky-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-xl sm:text-2xl font-display font-bold text-charcoal">
              Order {order.id}
            </h1>
            <p className="text-xs sm:text-sm text-slate-text">
              Placed on {new Date(order.date).toLocaleDateString('en-GB', { 
                day: 'numeric', 
                month: 'long', 
                year: 'numeric' 
              })}
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <button className="p-2 border border-sky-200 rounded-lg hover:bg-sky-50 transition-colors">
            <Printer className="w-5 h-5 text-slate-text" />
          </button>
          <button className="p-2 border border-sky-200 rounded-lg hover:bg-sky-50 transition-colors">
            <Download className="w-5 h-5 text-slate-text" />
          </button>
          <button className="p-2 border border-sky-200 rounded-lg hover:bg-sky-50 transition-colors">
            <Mail className="w-5 h-5 text-slate-text" />
          </button>
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-sky-100 p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-slate-text">Order Status</p>
              <div className="flex items-center gap-2 mt-1">
                {getStatusIcon(order.status)}
                <span className={`text-sm font-medium px-2 py-1 rounded-full ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
              </div>
            </div>
            <button
              onClick={() => setShowUpdateStatusModal(true)}
              className="text-xs text-redbull-blue hover:underline"
            >
              Update
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-sky-100 p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-slate-text">Payment Status</p>
              <div className="flex items-center gap-2 mt-1">
                <CreditCard className="w-5 h-5 text-slate-text" />
                <span className={`text-sm font-medium px-2 py-1 rounded-full ${getPaymentStatusColor(order.paymentStatus)}`}>
                  {order.paymentStatus}
                </span>
              </div>
            </div>
            <span className="text-xs text-slate-text">{order.paymentMethod}</span>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-sky-100 p-4">
          <p className="text-xs text-slate-text">Total Amount</p>
          <p className="text-2xl font-bold text-charcoal mt-1">KSh {order.total.toLocaleString()}</p>
          {order.discount ? (
            <p className="text-xs text-green-600 mt-1">Includes KSh {order.discount} discount</p>
          ) : null}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Customer & Shipping */}
        <div className="lg:col-span-2 space-y-6">
          {/* Customer Information */}
          <div className="bg-white rounded-xl border border-sky-100 p-6">
            <h2 className="text-base font-display font-semibold text-charcoal mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-redbull-blue" />
              Customer Information
            </h2>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-redbull-blue-light rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-redbull-blue">
                    {order.customer.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-charcoal">{order.customer.name}</p>
                  <p className="text-xs text-slate-text">Customer ID: {order.customer.id}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-sky-100">
                <div>
                  <p className="text-xs text-slate-text">Email</p>
                  <a href={`mailto:${order.customer.email}`} className="text-sm text-redbull-blue hover:underline">
                    {order.customer.email}
                  </a>
                </div>
                <div>
                  <p className="text-xs text-slate-text">Phone</p>
                  <a href={`tel:${order.customer.phone}`} className="text-sm text-redbull-blue hover:underline">
                    {order.customer.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="bg-white rounded-xl border border-sky-100 p-6">
            <h2 className="text-base font-display font-semibold text-charcoal mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-redbull-blue" />
              Shipping Address
            </h2>
            
            <div className="space-y-2 text-sm">
              <p className="font-medium text-charcoal">{order.shippingAddress.name}</p>
              <p className="text-slate-text">{order.shippingAddress.address}</p>
              <p className="text-slate-text">{order.shippingAddress.city}, {order.shippingAddress.county}</p>
              <p className="text-slate-text">Phone: {order.shippingAddress.phone}</p>
            </div>

            {order.billingAddress && order.billingAddress !== order.shippingAddress && (
              <>
                <h3 className="text-sm font-medium text-charcoal mt-4 mb-2">Billing Address</h3>
                <div className="space-y-2 text-sm">
                  <p className="text-slate-text">{order.billingAddress.address}</p>
                  <p className="text-slate-text">{order.billingAddress.city}, {order.billingAddress.county}</p>
                </div>
              </>
            )}
          </div>

          {/* Order Items */}
          <div className="bg-white rounded-xl border border-sky-100 p-6">
            <h2 className="text-base font-display font-semibold text-charcoal mb-4 flex items-center gap-2">
              <Package className="w-5 h-5 text-redbull-blue" />
              Order Items
            </h2>

            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex flex-col sm:flex-row sm:items-center gap-4 p-3 bg-sky-50/50 rounded-lg">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <p className="text-sm font-medium text-charcoal">{item.name}</p>
                        {item.sku && (
                          <p className="text-xs text-slate-text">SKU: {item.sku}</p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-charcoal">KSh {item.price.toLocaleString()}</p>
                        <p className="text-xs text-slate-text">Qty: {item.quantity}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="mt-4 pt-4 border-t border-sky-100">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-text">Subtotal</span>
                  <span className="text-charcoal">KSh {order.subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-text">Shipping</span>
                  <span className="text-charcoal">KSh {order.shipping.toLocaleString()}</span>
                </div>
                {order.discount ? (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Discount</span>
                    <span>-KSh {order.discount.toLocaleString()}</span>
                  </div>
                ) : null}
                <div className="flex justify-between text-base font-bold pt-2 border-t border-sky-100">
                  <span>Total</span>
                  <span className="text-redbull-blue">KSh {order.total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Shipping & Timeline */}
        <div className="space-y-6">
          {/* Tracking Information */}
          <div className="bg-white rounded-xl border border-sky-100 p-6">
            <h2 className="text-base font-display font-semibold text-charcoal mb-4 flex items-center gap-2">
              <Truck className="w-5 h-5 text-redbull-blue" />
              Tracking Information
            </h2>

            <div className="space-y-3">
              <div>
                <p className="text-xs text-slate-text">Carrier</p>
                <p className="text-sm font-medium text-charcoal">{order.carrier || 'Not assigned'}</p>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-slate-text">Tracking Number</p>
                  {!isEditingTracking && (
                    <button
                      onClick={() => setIsEditingTracking(true)}
                      className="text-xs text-redbull-blue hover:underline"
                    >
                      Edit
                    </button>
                  )}
                </div>
                {isEditingTracking ? (
                  <div className="flex gap-2 mt-1">
                    <input
                      type="text"
                      value={trackingNumber}
                      onChange={(e) => setTrackingNumber(e.target.value)}
                      className="flex-1 px-3 py-1 text-sm border border-sky-200 rounded-lg"
                      placeholder="Enter tracking number"
                    />
                    <button
                      onClick={handleSaveTracking}
                      className="p-1 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      <Save className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <p className="text-sm font-medium text-charcoal mt-1">
                    {order.trackingNumber || 'Not available'}
                  </p>
                )}
              </div>

              {order.estimatedDelivery && (
                <div>
                  <p className="text-xs text-slate-text">Estimated Delivery</p>
                  <p className="text-sm font-medium text-charcoal">
                    {new Date(order.estimatedDelivery).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Order Notes */}
          {order.notes && (
            <div className="bg-white rounded-xl border border-sky-100 p-6">
              <h2 className="text-base font-display font-semibold text-charcoal mb-3 flex items-center gap-2">
                <FileText className="w-5 h-5 text-redbull-blue" />
                Order Notes
              </h2>
              <p className="text-sm text-slate-text">{order.notes}</p>
            </div>
          )}

          {/* Timeline */}
          <div className="bg-white rounded-xl border border-sky-100 p-6">
            <h2 className="text-base font-display font-semibold text-charcoal mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-redbull-blue" />
              Timeline
            </h2>

            <div className="space-y-4">
              {order.timeline.map((event, index) => (
                <div key={index} className="flex gap-3">
                  <div className="relative">
                    <div className="w-2 h-2 mt-2 rounded-full bg-redbull-blue"></div>
                    {index < order.timeline.length - 1 && (
                      <div className="absolute top-4 left-1 w-0.5 h-12 bg-sky-200"></div>
                    )}
                  </div>
                  <div className="flex-1 pb-4">
                    <p className="text-sm font-medium text-charcoal">{event.description}</p>
                    <p className="text-xs text-slate-text">{event.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="bg-white rounded-xl border border-sky-100 p-6">
            <h2 className="text-base font-display font-semibold text-charcoal mb-3">Actions</h2>
            <div className="space-y-2">
              <button 
                onClick={() => setShowCancelModal(true)}
                className="w-full flex items-center justify-center gap-2 bg-redbull-blue text-white px-4 py-2 rounded-lg text-sm hover:bg-redbull-blue/90"
              >
                <MessageCircle className="w-4 h-4" />
                Contact Customer
              </button>
              <button 
                onClick={() => setShowCancelModal(true)}
                className="w-full flex items-center justify-center gap-2 border border-red-200 text-red-600 px-4 py-2 rounded-lg text-sm hover:bg-red-50"
              >
                <XCircle className="w-4 h-4" />
                Cancel Order
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Update Status Modal - Using regular Modal for complex content */}
      <Modal
        isOpen={showUpdateStatusModal}
        onClose={() => setShowUpdateStatusModal(false)}
        title="Update Order Status"
      >
        <div className="space-y-4">
          <p className="text-sm text-slate-text">Select new status for order {order.id}</p>
          <div className="grid grid-cols-2 gap-2">
            {(['processing', 'shipped', 'delivered', 'cancelled'] as OrderStatus[]).map((status) => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`p-3 rounded-lg border text-sm capitalize transition-colors ${
                  selectedStatus === status
                    ? 'bg-redbull-blue text-white border-redbull-blue'
                    : 'border-sky-200 text-slate-text hover:bg-sky-50'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
          <div className="flex gap-3 pt-4">
            <button
              onClick={() => setShowUpdateStatusModal(false)}
              className="flex-1 px-4 py-2 border border-sky-200 text-slate-text rounded-lg hover:bg-sky-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleUpdateStatus}
              disabled={isUpdating}
              className="flex-1 px-4 py-2 bg-redbull-blue text-white rounded-lg hover:bg-redbull-blue/90 transition-colors disabled:opacity-50"
            >
              {isUpdating ? 'Updating...' : 'Update Status'}
            </button>
          </div>
        </div>
      </Modal>

      {/* Cancel Order Modal */}
      <ConfirmModal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        onConfirm={handleCancelOrder}
        title="Cancel Order"
        message={`Are you sure you want to cancel order ${order.id}? This action cannot be undone.`}
        confirmText="Yes, Cancel Order"
        cancelText="No, Keep Order"
        type="danger"
        isConfirming={isUpdating}
      />
    </div>
  );
};

export default SalesOrderDetailPage;