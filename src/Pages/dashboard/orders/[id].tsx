// pages/dashboard/orders/[id].tsx
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft,
  Package,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
  Printer,
  MapPin,
  CreditCard,
  Star,
  HelpCircle,
  RefreshCw
} from 'lucide-react';
import ConfirmModal from '../../../common/ConfirmModal';
import Modal from '../../../common/Modal';
import { CommerceService, type Order } from '../../../services/commerce/commerce.service';

type OrderStatus = Order['status'];

const OrderDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showReturnModal, setShowReturnModal] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [returnReason, setReturnReason] = useState('');

  useEffect(() => {
    if (id) fetchOrder();
  }, [id]);

  const fetchOrder = async () => {
    try {
      setLoading(true);
      const data = await CommerceService.getOrderById(id!);
      setOrder(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: OrderStatus) => {
    switch(status) {
      case 'delivered': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'shipped': return <Truck className="w-5 h-5 text-blue-600" />;
      case 'processing': return <Clock className="w-5 h-5 text-amber-600" />;
      case 'cancelled': return <XCircle className="w-5 h-5 text-red-600" />;
      default: return <Package className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status: OrderStatus) => {
    switch(status) {
      case 'delivered': return 'bg-green-100 text-green-700 border-green-200';
      case 'shipped': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'processing': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'cancelled': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const handleCancelOrder = async () => {
    setIsUpdating(true);
    try {
      const updated = await CommerceService.cancelOrder(id!);
      setOrder(updated);
      setShowCancelModal(false);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleReturnRequest = async () => {
    if (!returnReason) return;
    setIsUpdating(true);
    // Simulate return request – implement actual endpoint later
    setTimeout(() => {
      console.log('Return requested:', { orderId: order?.id, reason: returnReason });
      setIsUpdating(false);
      setShowReturnModal(false);
      setReturnReason('');
      alert('Return request submitted! We\'ll contact you soon.');
    }, 1500);
  };

  const handleReorder = () => {
    navigate('/marketplace', { state: { reorderItems: order?.items } });
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-GB', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  const formatDateTime = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Build timeline based on order status
  const buildTimeline = () => {
    const timeline = [];
    const createdDate = order?.createdAt;
    const updatedDate = order?.updatedAt;
    const deliveredDate = (order as any)?.deliveredAt;
    const cancelledDate = (order as any)?.cancelledAt;

    if (createdDate) {
      timeline.push({
        date: createdDate,
        description: 'Order placed',
        completed: true,
      });
    }
    if (order?.paymentStatus === 'paid') {
      timeline.push({
        date: updatedDate || createdDate,
        description: 'Payment confirmed',
        completed: true,
      });
    }
    if (order?.status === 'processing' || order?.status === 'shipped' || order?.status === 'delivered') {
      timeline.push({
        date: updatedDate || createdDate,
        description: 'Order is being processed',
        completed: true,
      });
    }
    if (order?.status === 'shipped' || order?.status === 'delivered') {
      timeline.push({
        date: updatedDate || createdDate,
        description: 'Order has been shipped',
        completed: true,
      });
    }
    if (order?.status === 'delivered') {
      timeline.push({
        date: deliveredDate || updatedDate || createdDate,
        description: 'Order delivered',
        completed: true,
      });
    }
    if (order?.status === 'cancelled') {
      timeline.push({
        date: cancelledDate || updatedDate || createdDate,
        description: 'Order cancelled',
        completed: true,
      });
    }
    return timeline;
  };

  const timeline = buildTimeline();

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

  if (error || !order) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <Package className="w-16 h-16 text-slate-text/30 mx-auto mb-4" />
          <h2 className="text-xl font-display font-bold text-charcoal mb-2">Order Not Found</h2>
          <p className="text-sm text-slate-text mb-4">{error || "The order you're looking for doesn't exist."}</p>
          <Link
            to="/dashboard/orders"
            className="inline-flex items-center gap-2 bg-redbull-blue text-white px-4 py-2 rounded-lg text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Orders
          </Link>
        </div>
      </div>
    );
  }

  const canCancel = order.status === 'processing' || order.status === 'pending';
  const canReturn = order.status === 'delivered';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-0 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link
          to="/dashboard/orders"
          className="p-2 rounded-full bg-sky-50 text-slate-text hover:text-redbull-blue hover:bg-sky-100 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-xl sm:text-2xl font-display font-bold text-charcoal">
            Order #{order.id.slice(-8)}
          </h1>
          <p className="text-xs sm:text-sm text-slate-text">
            Placed on {formatDate(order.createdAt)}
          </p>
        </div>
      </div>

      {/* Order Status Card */}
      <div className="bg-white rounded-xl border border-sky-100 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-full ${getStatusColor(order.status)} flex items-center justify-center`}>
              {getStatusIcon(order.status)}
            </div>
            <div>
              <p className="text-sm text-slate-text">Order Status</p>
              <p className="text-lg font-display font-semibold text-charcoal capitalize">
                {order.status}
              </p>
              {/* Estimated delivery if present */}
              {(order as any).estimatedDelivery && order.status === 'shipped' && (
                <p className="text-xs text-slate-text mt-1">
                  Estimated delivery: {formatDate((order as any).estimatedDelivery)}
                </p>
              )}
              {(order as any).deliveredAt && (
                <p className="text-xs text-slate-text mt-1">
                  Delivered on {formatDate((order as any).deliveredAt)}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {canCancel && (
              <button
                onClick={() => setShowCancelModal(true)}
                className="px-4 py-2 border border-red-200 text-red-600 rounded-lg text-sm hover:bg-red-50"
              >
                Cancel Order
              </button>
            )}
            {canReturn && (
              <button
                onClick={() => setShowReturnModal(true)}
                className="px-4 py-2 border border-amber-200 text-amber-600 rounded-lg text-sm hover:bg-amber-50"
              >
                Return Items
              </button>
            )}
            <button
              onClick={handleReorder}
              className="px-4 py-2 bg-redbull-blue text-white rounded-lg text-sm hover:bg-redbull-blue/90"
            >
              Reorder
            </button>
            <button className="p-2 border border-sky-200 rounded-lg hover:bg-sky-50">
              <Printer className="w-5 h-5 text-slate-text" />
            </button>
          </div>
        </div>
      </div>

      {/* Order Timeline */}
      <div className="bg-white rounded-xl border border-sky-100 p-6">
        <h2 className="text-base font-display font-semibold text-charcoal mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-redbull-blue" />
          Order Timeline
        </h2>

        <div className="space-y-4">
          {timeline.map((event, index) => (
            <div key={index} className="flex gap-3">
              <div className="relative">
                <div className="w-3 h-3 mt-1.5 rounded-full bg-green-600"></div>
                {index < timeline.length - 1 && (
                  <div className="absolute top-4 left-1.5 w-0.5 h-12 bg-green-200"></div>
                )}
              </div>
              <div className="flex-1 pb-4">
                <p className="text-sm font-medium text-charcoal">{event.description}</p>
                <p className="text-xs text-slate-text">{formatDateTime(event.date)}</p>
              </div>
              <CheckCircle className="w-4 h-4 text-green-600" />
            </div>
          ))}
        </div>
      </div>

      {/* Order Items */}
      <div className="bg-white rounded-xl border border-sky-100 p-6">
        <h2 className="text-base font-display font-semibold text-charcoal mb-4 flex items-center gap-2">
          <Package className="w-5 h-5 text-redbull-blue" />
          Order Items
        </h2>

        <div className="space-y-4">
          {order.items.map((item) => (
            <div key={item.productId} className="flex flex-col sm:flex-row gap-4 p-3 bg-sky-50/50 rounded-lg">
              <img
                src={(item as any).image || 'https://via.placeholder.com/80x80?text=No+Image'}
                alt={item.name}
                className="w-20 h-20 rounded-lg object-cover"
              />
              
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                  <div>
                    <Link to={`/marketplace/product/${item.productId}`} className="text-sm font-medium text-charcoal hover:text-redbull-blue">
                      {item.name}
                    </Link>
                    <p className="text-xs text-slate-text">Sold by: {item.sellerId}</p>
                    {/* Tracking info if available */}
                    {(order as any).trackingNumber && (
                      <div className="mt-2 flex items-center gap-2">
                        <Truck className="w-3 h-3 text-blue-600" />
                        <span className="text-xs text-slate-text">Tracking: {(order as any).trackingNumber}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="text-right">
                    <p className="text-sm font-bold text-charcoal">KSh {item.price.toLocaleString()}</p>
                    <p className="text-xs text-slate-text">Qty: {item.quantity}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-3">
                  <button className="text-xs bg-white border border-sky-200 px-3 py-1 rounded-full hover:bg-sky-50">
                    Contact Seller
                  </button>
                  <button className="text-xs bg-white border border-sky-200 px-3 py-1 rounded-full hover:bg-sky-50 flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    Review
                  </button>
                  {order.status === 'delivered' && (
                    <button className="text-xs bg-white border border-sky-200 px-3 py-1 rounded-full hover:bg-sky-50 flex items-center gap-1">
                      <RefreshCw className="w-3 h-3" />
                      Return
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order Summary & Shipping Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-sky-100 p-6">
          <h2 className="text-base font-display font-semibold text-charcoal mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-redbull-blue" />
            Shipping Address
          </h2>
          <div className="space-y-2 text-sm">
            <p className="font-medium text-charcoal">{order.shippingAddress.fullName}</p>
            <p className="text-slate-text">{order.shippingAddress.address}</p>
            <p className="text-slate-text">{order.shippingAddress.city}</p>
            <p className="text-slate-text">Phone: {order.shippingAddress.phone}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-sky-100 p-6">
          <h2 className="text-base font-display font-semibold text-charcoal mb-4 flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-redbull-blue" />
            Payment Summary
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-slate-text">Payment Method</span>
              <span className="text-charcoal font-medium">M-PESA</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-text">Payment Status</span>
              <span className={`text-xs px-2 py-1 rounded-full ${
                order.paymentStatus === 'paid' ? 'bg-green-100 text-green-700' :
                order.paymentStatus === 'pending' ? 'bg-amber-100 text-amber-700' :
                'bg-red-100 text-red-700'
              } capitalize`}>
                {order.paymentStatus}
              </span>
            </div>
            <div className="border-t border-sky-100 my-2"></div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-text">Subtotal</span>
                <span className="text-charcoal">KSh {order.totalAmount.toLocaleString()}</span>
              </div>
              {/* Shipping and tax could be added if available */}
              <div className="flex justify-between text-base font-bold pt-2 border-t border-sky-100">
                <span>Total</span>
                <span className="text-redbull-blue">KSh {order.totalAmount.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Need Help Section */}
      <div className="bg-sky-50 rounded-xl p-6 border border-sky-200">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-redbull-blue-light rounded-full flex items-center justify-center">
              <HelpCircle className="w-5 h-5 text-redbull-blue" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-charcoal">Need help with this order?</h3>
              <p className="text-xs text-slate-text mt-1">
                Contact the seller or our support team for assistance.
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-white border border-sky-200 text-slate-text rounded-lg text-sm hover:bg-sky-50">
              Contact Seller
            </button>
            <Link to="/contact" className="px-4 py-2 bg-redbull-blue text-white rounded-lg text-sm hover:bg-redbull-blue/90">
              Support
            </Link>
          </div>
        </div>
      </div>

      {/* Modals */}
      <ConfirmModal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        onConfirm={handleCancelOrder}
        title="Cancel Order"
        message={`Are you sure you want to cancel order #${order.id.slice(-8)}? This action cannot be undone.`}
        confirmText="Yes, Cancel Order"
        cancelText="No, Keep Order"
        type="danger"
        isConfirming={isUpdating}
      />

      <Modal
        isOpen={showReturnModal}
        onClose={() => {
          setShowReturnModal(false);
          setReturnReason('');
        }}
        title="Request Return"
      >
        <div className="space-y-4">
          <p className="text-sm text-slate-text">Please tell us why you want to return this order:</p>
          <select
            value={returnReason}
            onChange={(e) => setReturnReason(e.target.value)}
            className="w-full px-4 py-2 border border-sky-200 rounded-lg text-sm focus:outline-none focus:border-redbull-blue"
          >
            <option value="">Select a reason</option>
            <option value="defective">Item is defective or not working</option>
            <option value="wrong_item">Received wrong item</option>
            <option value="not_as_described">Item not as described</option>
            <option value="damaged">Item arrived damaged</option>
            <option value="changed_mind">Changed my mind</option>
          </select>
          <div className="flex gap-3 pt-4">
            <button
              onClick={() => {
                setShowReturnModal(false);
                setReturnReason('');
              }}
              className="flex-1 px-4 py-2 border border-sky-200 text-slate-text rounded-lg hover:bg-sky-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleReturnRequest}
              disabled={!returnReason || isUpdating}
              className="flex-1 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors disabled:opacity-50"
            >
              {isUpdating ? 'Submitting...' : 'Submit Request'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default OrderDetailPage;