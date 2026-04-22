// pages/checkout/index.tsx (final version)
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { 
  Loader2, CreditCard, MapPin, Phone, User, Package, 
  CheckCircle, AlertCircle, ChevronLeft, ChevronRight, 
  Smartphone, CreditCard as CardIcon, Shield, CheckSquare, Square
} from 'lucide-react';
import CategoryNavbar from '../../common/CategoryNavbar';
import { CommerceService, type Cart, type Order } from '../../services/commerce/commerce.service';
import { tokenStore } from '../../services/Auth/auth.service';
import Modal from '../../common/Modal';

type Step = 'review' | 'payment' | 'confirm';

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category') || 'marketplace';
  
  const [cart, setCart] = useState<Cart | null>(null);
  const [cartLoading, setCartLoading] = useState(true);
  
  const [currentStep, setCurrentStep] = useState<Step>('review');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [orderSuccess, setOrderSuccess] = useState<Order | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmText, setConfirmText] = useState('');
  const [, setPaymentSimulated] = useState(false);
  
  // Selected items state
  const [selectedItemIds, setSelectedItemIds] = useState<Set<string>>(new Set());

  // Shipping form
  const [shippingAddress, setShippingAddress] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: 'Tala',
  });
  const [paymentMethod, setPaymentMethod] = useState('mpesa');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (!tokenStore.get()) {
      navigate('/sign-in?redirect=/checkout');
      return;
    }
    fetchCart();
  }, [category]);

  const fetchCart = async () => {
    setCartLoading(true);
    try {
      const cartData = await CommerceService.getCart(category);
      setCart(cartData);
      if (cartData.items.length > 0) {
        setSelectedItemIds(new Set(cartData.items.map(item => item.id!).filter(Boolean)));
      }
    } catch (err) {
      console.error('Failed to fetch cart', err);
    } finally {
      setCartLoading(false);
    }
  };

  const handleToggleItem = (itemId: string) => {
    const newSet = new Set(selectedItemIds);
    if (newSet.has(itemId)) {
      newSet.delete(itemId);
    } else {
      newSet.add(itemId);
    }
    setSelectedItemIds(newSet);
  };

  const handleSelectAll = () => {
    if (selectedItemIds.size === cart?.items.length) {
      setSelectedItemIds(new Set());
    } else {
      setSelectedItemIds(new Set(cart?.items.map(item => item.id!).filter(Boolean)));
    }
  };

  const selectedItems = cart?.items.filter(item => item.id && selectedItemIds.has(item.id)) || [];
  const subtotal = selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = subtotal > 5000 ? 0 : 200;
  const total = subtotal + deliveryFee;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
  };

  const validateAddress = () => {
    if (!shippingAddress.fullName.trim()) return 'Full name is required';
    if (!shippingAddress.phone.trim()) return 'Phone number is required';
    if (!shippingAddress.address.trim()) return 'Address is required';
    if (selectedItems.length === 0) return 'Please select at least one item to checkout';
    return null;
  };

  const handleNextToPayment = () => {
    const addressError = validateAddress();
    if (addressError) {
      setError(addressError);
      return;
    }
    setError(null);
    setCurrentStep('payment');
  };

  const handleBackToReview = () => {
    setCurrentStep('review');
    setPaymentSimulated(false);
    setError(null);
  };

  const simulatePayment = () => {
    setSubmitting(true);
    setTimeout(() => {
      setPaymentSimulated(true);
      setSubmitting(false);
      setCurrentStep('confirm');
    }, 1500);
  };

  const handlePlaceOrder = async () => {
    if (confirmText !== 'CONFIRM') {
      setError('Please type "CONFIRM" to place your order');
      return;
    }
    if (selectedItems.length === 0) {
      setError('No items selected');
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      // Note: The backend currently places order for the entire cart.
      // To support partial checkout, the backend would need to accept an `items` array.
      // For now, we place order for the whole cart (as a fallback).
      const order = await CommerceService.placeOrder({
        category,
        userName: shippingAddress.fullName,
        userEmail: undefined,
        deliveryAddress: `${shippingAddress.address}, ${shippingAddress.city}`,
        paymentMethod,
        notes,
      });
      setOrderSuccess(order);
      setTimeout(() => {
        navigate(`/dashboard/orders/${order.id}`);
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Failed to place order');
      setShowConfirmModal(false);
    } finally {
      setSubmitting(false);
    }
  };

  if (cartLoading) {
    return (
      <div className="min-h-screen bg-soft-white">
        <CategoryNavbar categoryName="Checkout" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 pt-24 flex justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-sky-600" />
        </div>
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-soft-white">
        <CategoryNavbar categoryName="Checkout" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 pt-24 text-center">
          <Package className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h2 className="text-xl font-display font-semibold text-charcoal mb-2">Your cart is empty</h2>
          <p className="text-slate-text mb-6">Add some items before checkout</p>
          <Link to={`/${category}`} className="inline-block px-6 py-2 bg-sky-500 text-white rounded-lg">Browse {category}</Link>
        </div>
      </div>
    );
  }

  const StepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      <div className="flex items-center">
        <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep === 'review' ? 'bg-sky-500 text-white' : 'bg-sky-100 text-sky-600'} text-sm font-semibold`}>1</div>
        <div className={`w-12 h-0.5 ${currentStep === 'review' ? 'bg-sky-300' : 'bg-sky-100'}`}></div>
        <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep === 'payment' ? 'bg-sky-500 text-white' : 'bg-sky-100 text-sky-600'} text-sm font-semibold`}>2</div>
        <div className={`w-12 h-0.5 ${currentStep === 'payment' ? 'bg-sky-300' : 'bg-sky-100'}`}></div>
        <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep === 'confirm' ? 'bg-sky-500 text-white' : 'bg-sky-100 text-sky-600'} text-sm font-semibold`}>3</div>
      </div>
    </div>
  );

  if (orderSuccess) {
    return (
      <div className="min-h-screen bg-soft-white">
        <CategoryNavbar categoryName="Checkout" />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 pt-24">
          <div className="bg-white rounded-2xl border border-green-200 p-6 text-center shadow-sm">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-display font-bold text-charcoal mb-2">Order Placed!</h2>
            <p className="text-slate-text mb-4">Your order #{orderSuccess.id.slice(0, 8)} has been received.</p>
            <p className="text-sm text-slate-text mb-6">Redirecting to order details...</p>
            <Link to={`/dashboard/orders/${orderSuccess.id}`} className="text-sky-600 hover:underline">View order now</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-soft-white">
      <CategoryNavbar categoryName="Checkout" showBackButton />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 pt-24">
        <StepIndicator />

        {currentStep === 'review' && (
          <form onSubmit={(e) => { e.preventDefault(); handleNextToPayment(); }} className="space-y-6">
            {/* Order summary with selection */}
            <div className="bg-white rounded-2xl border border-sky-100 p-4">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-display font-semibold text-charcoal flex items-center gap-2">
                  <Package className="w-5 h-5" /> Select Items
                </h2>
                <button
                  type="button"
                  onClick={handleSelectAll}
                  className="text-xs text-sky-600 hover:text-sky-700"
                >
                  {selectedItemIds.size === cart.items.length ? 'Deselect All' : 'Select All'}
                </button>
              </div>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {cart.items.map(item => {
                  const isSelected = item.id ? selectedItemIds.has(item.id) : false;
                  return (
                    <div key={item.id || item.productId} className="flex gap-3 py-2 border-b border-sky-50 last:border-0">
                      <button
                        type="button"
                        onClick={() => item.id && handleToggleItem(item.id)}
                        className="flex-shrink-0 mt-1"
                      >
                        {isSelected ? <CheckSquare className="w-5 h-5 text-sky-600" /> : <Square className="w-5 h-5 text-slate-400" />}
                      </button>
                      <img src={item.image || '/placeholder.png'} alt={item.name} className="w-12 h-12 rounded object-cover bg-gray-100" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-charcoal">{item.name}</p>
                        <p className="text-xs text-slate-text">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-sm font-semibold text-sky-600">KES {item.price.toLocaleString()}</p>
                    </div>
                  );
                })}
              </div>
              <div className="mt-3 pt-3 border-t border-sky-100 space-y-1 text-sm">
                <div className="flex justify-between"><span>Selected items</span><span>{selectedItems.length} / {cart.items.length}</span></div>
                <div className="flex justify-between"><span>Subtotal</span><span>KES {subtotal.toLocaleString()}</span></div>
                <div className="flex justify-between"><span>Delivery</span><span>{deliveryFee === 0 ? 'Free' : `KES ${deliveryFee.toLocaleString()}`}</span></div>
                <div className="flex justify-between font-bold text-base pt-2"><span>Total</span><span>KES {total.toLocaleString()}</span></div>
              </div>
              {selectedItems.length === 0 && (
                <p className="text-xs text-amber-600 mt-2">Please select at least one item to checkout</p>
              )}
            </div>

            {/* Shipping address */}
            <div className="bg-white rounded-2xl border border-sky-100 p-4">
              <h2 className="text-lg font-display font-semibold text-charcoal mb-3 flex items-center gap-2">
                <MapPin className="w-5 h-5" /> Delivery Address
              </h2>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-1">Full name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input type="text" name="fullName" value={shippingAddress.fullName} onChange={handleInputChange} required className="w-full pl-9 pr-3 py-2 border border-sky-200 rounded-lg" placeholder="John Doe" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-1">Phone number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input type="tel" name="phone" value={shippingAddress.phone} onChange={handleInputChange} required className="w-full pl-9 pr-3 py-2 border border-sky-200 rounded-lg" placeholder="0712345678" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-1">Address</label>
                  <textarea name="address" value={shippingAddress.address} onChange={handleInputChange} required rows={2} className="w-full px-3 py-2 border border-sky-200 rounded-lg" placeholder="Street, building, landmark" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-1">City</label>
                  <input type="text" name="city" value={shippingAddress.city} className="w-full px-3 py-2 border border-sky-200 rounded-lg bg-gray-50" readOnly />
                </div>
              </div>
            </div>

            {/* Order notes */}
            <div className="bg-white rounded-2xl border border-sky-100 p-4">
              <label className="block text-sm font-medium text-charcoal mb-1">Order notes (optional)</label>
              <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={2} className="w-full px-3 py-2 border border-sky-200 rounded-lg" placeholder="Special instructions for delivery..." />
            </div>

            <div className="flex justify-end">
              <button type="submit" className="bg-sky-500 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-sky-600">
                Next: Payment <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {currentStep === 'payment' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-sky-100 p-4">
              <h2 className="text-lg font-display font-semibold text-charcoal mb-3 flex items-center gap-2">
                <CreditCard className="w-5 h-5" /> Payment Method
              </h2>
              <div className="space-y-3">
                <label className="flex items-center gap-3 p-3 border rounded-xl cursor-pointer hover:bg-sky-50 transition-colors">
                  <input type="radio" name="paymentMethod" value="mpesa" checked={paymentMethod === 'mpesa'} onChange={(e) => setPaymentMethod(e.target.value)} className="text-sky-500" />
                  <Smartphone className="w-5 h-5 text-green-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">M-Pesa</p>
                    <p className="text-xs text-slate-text">Pay using your mobile money</p>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-3 border rounded-xl cursor-not-allowed opacity-60">
                  <input type="radio" name="paymentMethod" value="card" disabled className="text-sky-500" />
                  <CardIcon className="w-5 h-5 text-gray-400" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Card (coming soon)</p>
                    <p className="text-xs text-slate-text">Visa, Mastercard, Amex</p>
                  </div>
                </label>
              </div>
              <p className="text-xs text-slate-text mt-3">You will be redirected to a simulated M-Pesa payment screen.</p>
            </div>

            <div className="flex justify-between gap-3">
              <button onClick={handleBackToReview} className="px-6 py-2 border border-sky-200 rounded-lg flex items-center gap-2 hover:bg-sky-50">
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
              <button onClick={simulatePayment} disabled={submitting} className="bg-sky-500 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-sky-600">
                {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Shield className="w-4 h-4" />}
                Proceed to Pay
              </button>
            </div>
          </div>
        )}

        {currentStep === 'confirm' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-green-200 p-4">
              <CheckCircle className="w-10 h-10 text-green-500 mx-auto mb-2" />
              <h2 className="text-center text-lg font-display font-semibold text-charcoal">Payment Successful!</h2>
              <p className="text-center text-sm text-slate-text">Your payment has been simulated. Review and confirm your order.</p>
            </div>

            <div className="bg-white rounded-2xl border border-sky-100 p-4">
              <h3 className="font-medium mb-2">Order Summary</h3>
              <div className="text-sm space-y-1">
                <div className="flex justify-between"><span>Selected items</span><span>{selectedItems.length}</span></div>
                <div className="flex justify-between"><span>Subtotal</span><span>KES {subtotal.toLocaleString()}</span></div>
                <div className="flex justify-between"><span>Delivery</span><span>{deliveryFee === 0 ? 'Free' : `KES ${deliveryFee.toLocaleString()}`}</span></div>
                <div className="flex justify-between font-bold pt-2 border-t"><span>Total</span><span>KES {total.toLocaleString()}</span></div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-sky-100 p-4">
              <h3 className="font-medium mb-2">Shipping to</h3>
              <p className="text-sm">{shippingAddress.fullName}</p>
              <p className="text-sm">{shippingAddress.phone}</p>
              <p className="text-sm">{shippingAddress.address}, {shippingAddress.city}</p>
            </div>

            <div className="bg-white rounded-2xl border border-sky-100 p-4">
              <h3 className="font-medium mb-2">Order notes</h3>
              <p className="text-sm text-slate-text">{notes || 'No special instructions'}</p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-600 text-sm flex items-center gap-2">
                <AlertCircle className="w-4 h-4" /> {error}
              </div>
            )}

            <button
              onClick={() => setShowConfirmModal(true)}
              className="w-full bg-sky-500 text-white py-3 rounded-xl font-medium hover:bg-sky-600 transition-colors flex items-center justify-center gap-2"
            >
              <Package className="w-5 h-5" /> Place Order
            </button>
          </div>
        )}
      </div>

      <Modal isOpen={showConfirmModal} onClose={() => setShowConfirmModal(false)} title="Confirm Order">
        <div className="space-y-4">
          <p className="text-sm text-slate-text">
            Please type <strong className="text-red-600">CONFIRM</strong> below to place your order. This action cannot be undone.
          </p>
          <input
            type="text"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            placeholder="Type CONFIRM"
            className="w-full px-4 py-2 border border-sky-200 rounded-lg focus:outline-none focus:border-sky-400"
          />
          <div className="flex gap-3 pt-2">
            <button
              onClick={() => {
                setShowConfirmModal(false);
                setConfirmText('');
                setError(null);
              }}
              className="flex-1 px-4 py-2 border border-sky-200 text-slate-text rounded-lg hover:bg-sky-50"
            >
              Cancel
            </button>
            <button
              onClick={handlePlaceOrder}
              disabled={submitting}
              className="flex-1 px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 disabled:opacity-50"
            >
              {submitting ? <Loader2 className="w-4 h-4 animate-spin inline" /> : 'Place Order'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CheckoutPage;