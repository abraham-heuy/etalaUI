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

type OrderStatus = 'processing' | 'shipped' | 'delivered' | 'cancelled';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  seller: string;
  sellerId: string;
  deliveryStatus?: string;
  trackingNumber?: string;
}

interface OrderDetails {
  id: string;
  date: string;
  estimatedDelivery?: string;
  deliveredDate?: string;
  status: OrderStatus;
  paymentMethod: string;
  paymentStatus: 'paid' | 'pending' | 'failed' | 'refunded';
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  discount?: number;
  couponCode?: string;
  
  shippingAddress: {
    name: string;
    address: string;
    city: string;
    county: string;
    phone: string;
  };
  
  items: OrderItem[];
  
  timeline: {
    date: string;
    status: string;
    description: string;
    completed: boolean;
  }[];
  
  canCancel: boolean;
  canReturn: boolean;
}

const OrderDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState<OrderDetails | null>(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showReturnModal, setShowReturnModal] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [returnReason, setReturnReason] = useState('');

  // Mock data fetch
  useEffect(() => {
    setTimeout(() => {
      const mockOrder: OrderDetails = {
        id: id || 'ORD-1234',
        date: '2026-03-10',
        estimatedDelivery: '2026-03-15',
        status: 'shipped',
        paymentMethod: 'M-PESA',
        paymentStatus: 'paid',
        subtotal: 148000,
        shipping: 500,
        tax: 0,
        total: 148500,
        
        shippingAddress: {
          name: 'John Kamau',
          address: '123 Moi Avenue',
          city: 'Tala Town',
          county: 'Machakos',
          phone: '+254 712 345 678',
        },
        
        items: [
          {
            id: '1',
            name: 'iPhone 13 Pro Max',
            price: 145000,
            quantity: 1,
            image: 'https://images.unsplash.com/photo-1632661674596-df8be6a1c9e1?w=100&h=100&fit=crop',
            seller: 'Tala Electronics',
            sellerId: 's1',
            deliveryStatus: 'shipped',
            trackingNumber: 'MPE-123456789',
          },
          {
            id: '2',
            name: 'Screen Protector',
            price: 1500,
            quantity: 2,
            image: 'https://images.unsplash.com/photo-1632661674596-df8be6a1c9e1?w=100&h=100&fit=crop',
            seller: 'Tala Electronics',
            sellerId: 's1',
            deliveryStatus: 'shipped',
          },
        ],
        
        timeline: [
          {
            date: '2026-03-10 09:23',
            status: 'order_placed',
            description: 'Order placed',
            completed: true,
          },
          {
            date: '2026-03-10 09:25',
            status: 'payment_confirmed',
            description: 'Payment confirmed',
            completed: true,
          },
          {
            date: '2026-03-10 14:30',
            status: 'processing',
            description: 'Order is being processed',
            completed: true,
          },
          {
            date: '2026-03-11 10:15',
            status: 'shipped',
            description: 'Order has been shipped',
            completed: true,
          },
          {
            date: '2026-03-15',
            status: 'delivered',
            description: 'Estimated delivery',
            completed: false,
          },
        ],
        
        canCancel: false,
        canReturn: true,
      };
      
      setOrder(mockOrder);
      setLoading(false);
    }, 1000);
  }, [id]);

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
    setTimeout(() => {
      setOrder(prev => prev ? { ...prev, status: 'cancelled' } : null);
      setIsUpdating(false);
      setShowCancelModal(false);
    }, 1500);
  };

  const handleReturnRequest = async () => {
    if (!returnReason) return;
    
    setIsUpdating(true);
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
            Order #{order.id}
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
              {order.estimatedDelivery && order.status === 'shipped' && (
                <p className="text-xs text-slate-text mt-1">
                  Estimated delivery: {new Date(order.estimatedDelivery).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {order.canCancel && (
              <button
                onClick={() => setShowCancelModal(true)}
                className="px-4 py-2 border border-red-200 text-red-600 rounded-lg text-sm hover:bg-red-50"
              >
                Cancel Order
              </button>
            )}
            {order.canReturn && (
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
          {order.timeline.map((event, index) => (
            <div key={index} className="flex gap-3">
              <div className="relative">
                <div className={`w-3 h-3 mt-1.5 rounded-full ${
                  event.completed ? 'bg-green-600' : 'bg-gray-300'
                }`}></div>
                {index < order.timeline.length - 1 && (
                  <div className={`absolute top-4 left-1.5 w-0.5 h-12 ${
                    event.completed ? 'bg-green-200' : 'bg-gray-200'
                  }`}></div>
                )}
              </div>
              <div className="flex-1 pb-4">
                <p className="text-sm font-medium text-charcoal">{event.description}</p>
                <p className="text-xs text-slate-text">{event.date}</p>
              </div>
              {event.completed && (
                <CheckCircle className="w-4 h-4 text-green-600" />
              )}
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
            <div key={item.id} className="flex flex-col sm:flex-row gap-4 p-3 bg-sky-50/50 rounded-lg">
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 rounded-lg object-cover"
              />
              
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                  <div>
                    <Link to={`/marketplace/product/${item.id}`} className="text-sm font-medium text-charcoal hover:text-redbull-blue">
                      {item.name}
                    </Link>
                    <p className="text-xs text-slate-text">Sold by: {item.seller}</p>
                    
                    {/* Tracking info if available */}
                    {item.trackingNumber && (
                      <div className="mt-2 flex items-center gap-2">
                        <Truck className="w-3 h-3 text-blue-600" />
                        <span className="text-xs text-slate-text">Tracking: {item.trackingNumber}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="text-right">
                    <p className="text-sm font-bold text-charcoal">KSh {item.price.toLocaleString()}</p>
                    <p className="text-xs text-slate-text">Qty: {item.quantity}</p>
                  </div>
                </div>

                {/* Actions for individual item */}
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
        </div>

        {/* Payment Summary */}
        <div className="bg-white rounded-xl border border-sky-100 p-6">
          <h2 className="text-base font-display font-semibold text-charcoal mb-4 flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-redbull-blue" />
            Payment Summary
          </h2>

          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-slate-text">Payment Method</span>
              <span className="text-charcoal font-medium">{order.paymentMethod}</span>
            </div>
            
            <div className="flex justify-between text-sm">
              <span className="text-slate-text">Payment Status</span>
              <span className={`text-xs px-2 py-1 rounded-full ${
                order.paymentStatus === 'paid' ? 'bg-green-100 text-green-700' :
                order.paymentStatus === 'pending' ? 'bg-amber-100 text-amber-700' :
                'bg-red-100 text-red-700'
              }`}>
                {order.paymentStatus}
              </span>
            </div>

            <div className="border-t border-sky-100 my-2"></div>

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
            <Link
              to="/contact"
              className="px-4 py-2 bg-redbull-blue text-white rounded-lg text-sm hover:bg-redbull-blue/90"
            >
              Support
            </Link>
          </div>
        </div>
      </div>

      {/* Cancel Order Modal */}
      <ConfirmModal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        onConfirm={handleCancelOrder}
        title="Cancel Order"
        message={`Are you sure you want to cancel order #${order.id}? This action cannot be undone.`}
        confirmText="Yes, Cancel Order"
        cancelText="No, Keep Order"
        type="danger"
        isConfirming={isUpdating}
      />

      {/* Return Request Modal - Using regular Modal for complex content */}
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