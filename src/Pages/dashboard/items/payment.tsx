// pages/dashboard/payments.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  CreditCard, 
  Plus, 
  Trash2,
  CheckCircle,
  Smartphone,
  Wallet,
  AlertCircle
} from 'lucide-react';

// Define proper types
interface CardMethod {
  id: number;
  type: 'card';
  brand: string;
  last4: string;
  expiry: string;
  name: string;
  isDefault: boolean;
}

interface MpesaMethod {
  id: number;
  type: 'mpesa';
  phone: string;
  name: string;
  isDefault: boolean;
}

type PaymentMethod = CardMethod | MpesaMethod;

const PaymentsPage: React.FC = () => {
  const [showAddCard, setShowAddCard] = useState(false);
  const [showAddMpesa, setShowAddMpesa] = useState(false);

  // Mock payment methods with proper typing
  const paymentMethods: PaymentMethod[] = [
    {
      id: 1,
      type: 'card',
      brand: 'Visa',
      last4: '4242',
      expiry: '12/26',
      name: 'John Doe',
      isDefault: true,
    },
    {
      id: 2,
      type: 'card',
      brand: 'Mastercard',
      last4: '8888',
      expiry: '08/25',
      name: 'John Doe',
      isDefault: false,
    },
    {
      id: 3,
      type: 'mpesa',
      phone: '254712345678',
      name: 'John Doe (M-PESA)',
      isDefault: false,
    },
  ];

  // Transaction history
  const transactions = [
    { id: 'T12345', date: '2026-03-10', amount: 2450, status: 'success', method: 'Visa ••4242' },
    { id: 'T12344', date: '2026-03-08', amount: 5670, status: 'success', method: 'M-PESA 712345678' },
    { id: 'T12343', date: '2026-03-05', amount: 1890, status: 'pending', method: 'Mastercard ••8888' },
    { id: 'T12342', date: '2026-03-01', amount: 3240, status: 'success', method: 'Visa ••4242' },
    { id: 'T12341', date: '2026-02-28', amount: 1200, status: 'failed', method: 'M-PESA 712345678' },
  ];

  // Helper function to format phone number display
  const formatPhoneDisplay = (phone: string) => {
    return `${phone.slice(0,4)}***${phone.slice(-3)}`;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-display font-bold text-charcoal">
          Payment Methods
        </h1>
        <p className="text-slate-text mt-1">
          Manage your payment options and transaction history
        </p>
      </div>

      {/* Balance Card */}
      <div className="bg-gradient-to-r from-redbull-blue to-blue-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-white/80">Account Balance</p>
            <p className="text-3xl font-bold">KSh 12,450</p>
          </div>
          <Wallet className="w-12 h-12 text-white/50" />
        </div>
        <div className="flex gap-2">
          <button className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-white/30 transition-colors">
            Withdraw
          </button>
          <button className="bg-white text-redbull-blue px-4 py-2 rounded-full text-sm font-medium hover:bg-white/90 transition-colors">
            Top Up
          </button>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="bg-white rounded-xl border border-sky-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-display font-semibold text-charcoal">
            Saved Payment Methods
          </h2>
          <div className="flex gap-2">
            <button
              onClick={() => setShowAddMpesa(true)}
              className="text-sm text-green-600 hover:text-green-700 flex items-center gap-1"
            >
              <Smartphone className="w-4 h-4" />
              Add M-PESA
            </button>
            <button
              onClick={() => setShowAddCard(true)}
              className="text-sm text-redbull-blue hover:text-redbull-blue/80 flex items-center gap-1"
            >
              <Plus className="w-4 h-4" />
              Add Card
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              className="flex items-center justify-between p-3 border border-sky-100 rounded-lg hover:bg-sky-50/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                {method.type === 'card' ? (
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-blue-600" />
                  </div>
                ) : (
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Smartphone className="w-5 h-5 text-green-600" />
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-charcoal">
                      {method.type === 'card' 
                        ? `${method.brand} ••${method.last4}`
                        : `M-PESA ${formatPhoneDisplay(method.phone)}`}
                    </p>
                    {method.isDefault && (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        Default
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-text">
                    {method.type === 'card' 
                      ? `Expires ${method.expiry} · ${method.name}`
                      : method.name}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {!method.isDefault && (
                  <button className="text-xs text-slate-text hover:text-redbull-blue px-2 py-1">
                    Set Default
                  </button>
                )}
                <button className="p-1.5 text-slate-text hover:text-red-600 rounded-lg">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-xl border border-sky-100 p-6">
        <h2 className="text-lg font-display font-semibold text-charcoal mb-4">
          Recent Transactions
        </h2>

        <div className="space-y-3">
          {transactions.map((tx) => (
            <div
              key={tx.id}
              className="flex items-center justify-between p-3 hover:bg-sky-50/50 rounded-lg transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${
                  tx.status === 'success' ? 'bg-green-500' :
                  tx.status === 'pending' ? 'bg-amber-500' : 'bg-red-500'
                }`} />
                <div>
                  <p className="text-sm font-medium text-charcoal">{tx.id}</p>
                  <p className="text-xs text-slate-text">{tx.date} · {tx.method}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-charcoal">KSh {tx.amount}</p>
                <p className={`text-xs ${
                  tx.status === 'success' ? 'text-green-600' :
                  tx.status === 'pending' ? 'text-amber-600' : 'text-red-600'
                }`}>
                  {tx.status}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 text-center">
          <Link
            to="/dashboard/transactions"
            className="text-sm text-redbull-blue hover:text-redbull-blue/80"
          >
            View All Transactions →
          </Link>
        </div>
      </div>

      {/* Add Card Modal */}
      {showAddCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <h2 className="text-xl font-display font-semibold text-charcoal mb-4">
              Add New Card
            </h2>
            
            <form className="space-y-4">
              <div>
                <label className="text-xs font-medium text-slate-text mb-1 block">
                  Card Number
                </label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  className="w-full px-3 py-2 border border-sky-200 rounded-lg text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-slate-text mb-1 block">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="w-full px-3 py-2 border border-sky-200 rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-text mb-1 block">
                    CVV
                  </label>
                  <input
                    type="text"
                    placeholder="123"
                    className="w-full px-3 py-2 border border-sky-200 rounded-lg text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-text mb-1 block">
                  Cardholder Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full px-3 py-2 border border-sky-200 rounded-lg text-sm"
                />
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" id="setDefaultCard" className="rounded text-redbull-blue" />
                <label htmlFor="setDefaultCard" className="text-sm text-slate-text">
                  Set as default payment method
                </label>
              </div>

              <div className="bg-blue-50 rounded-lg p-3 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5" />
                <p className="text-xs text-blue-700">
                  Your card details are encrypted and secure. We never store your full card number.
                </p>
              </div>

              <div className="flex gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddCard(false)}
                  className="flex-1 px-4 py-2 border border-sky-200 text-slate-text rounded-lg text-sm font-medium hover:bg-sky-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-redbull-blue text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-redbull-blue/90"
                >
                  Add Card
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add M-PESA Modal */}
      {showAddMpesa && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <h2 className="text-xl font-display font-semibold text-charcoal mb-4">
              Add M-PESA Number
            </h2>
            
            <form className="space-y-4">
              <div>
                <label className="text-xs font-medium text-slate-text mb-1 block">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="07XX XXX XXX"
                  className="w-full px-3 py-2 border border-sky-200 rounded-lg text-sm"
                />
                <p className="text-xs text-slate-text/70 mt-1">
                  You'll receive a one-time verification code
                </p>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-text mb-1 block">
                  Account Name (Optional)
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full px-3 py-2 border border-sky-200 rounded-lg text-sm"
                />
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" id="setDefaultMpesa" className="rounded text-redbull-blue" />
                <label htmlFor="setDefaultMpesa" className="text-sm text-slate-text">
                  Set as default payment method
                </label>
              </div>

              <div className="bg-green-50 rounded-lg p-3 flex items-start gap-2">
                <Smartphone className="w-4 h-4 text-green-600 mt-0.5" />
                <p className="text-xs text-green-700">
                  You'll receive a prompt on your phone to authorize payments.
                </p>
              </div>

              <div className="flex gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddMpesa(false)}
                  className="flex-1 px-4 py-2 border border-sky-200 text-slate-text rounded-lg text-sm font-medium hover:bg-sky-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700"
                >
                  Verify & Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentsPage;