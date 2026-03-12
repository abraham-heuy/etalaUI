// pages/dashboard/earnings.tsx
import React, { useState } from 'react';
import { 
  DollarSign, 
  TrendingUp,
  TrendingDown,
  Wallet,
  CreditCard,
  Smartphone,
  Clock,
  CheckCircle} from 'lucide-react';

const EarningsPage: React.FC = () => {
  const [period, setPeriod] = useState('month');

  // Mock earnings data
  const earnings = {
    balance: 45800,
    pending: 12500,
    withdrawn: 125000,
    lifetime: 183300,
    thisMonth: 45800,
    lastMonth: 38200,
    growth: 19.9,
  };

  const transactions = [
    { id: 'T12345', date: '2026-03-10', amount: 3500, status: 'completed', type: 'sale', orderId: 'ORD-1234' },
    { id: 'T12344', date: '2026-03-09', amount: 2200, status: 'completed', type: 'sale', orderId: 'ORD-1235' },
    { id: 'T12343', date: '2026-03-08', amount: 1800, status: 'pending', type: 'sale', orderId: 'ORD-1236' },
    { id: 'T12342', date: '2026-03-05', amount: 5000, status: 'completed', type: 'withdrawal', method: 'M-PESA' },
    { id: 'T12341', date: '2026-03-01', amount: 4500, status: 'completed', type: 'sale', orderId: 'ORD-1230' },
  ];

  const withdrawMethods = [
    { id: 1, type: 'mpesa', details: '254712345678', default: true },
    { id: 2, type: 'bank', details: 'Equity Bank ••1234', default: false },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-charcoal">
            Earnings
          </h1>
          <p className="text-slate-text mt-1">
            Track your revenue and payouts
          </p>
        </div>
        <button className="bg-redbull-blue text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-redbull-blue/90 flex items-center gap-2 self-start">
          <Wallet className="w-4 h-4" />
          Withdraw Funds
        </button>
      </div>

      {/* Balance Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-redbull-blue to-blue-600 rounded-xl p-5 text-white">
          <p className="text-sm text-white/80">Available Balance</p>
          <p className="text-3xl font-bold mt-1">KSh {earnings.balance.toLocaleString()}</p>
          <p className="text-xs text-white/60 mt-2">Ready to withdraw</p>
        </div>

        <div className="bg-white rounded-xl p-5 border border-sky-100">
          <p className="text-xs text-slate-text">Pending Clearance</p>
          <p className="text-2xl font-bold text-charcoal mt-1">KSh {earnings.pending.toLocaleString()}</p>
          <p className="text-xs text-amber-600 mt-2">Will be available in 2-3 days</p>
        </div>

        <div className="bg-white rounded-xl p-5 border border-sky-100">
          <p className="text-xs text-slate-text">Total Withdrawn</p>
          <p className="text-2xl font-bold text-charcoal mt-1">KSh {earnings.withdrawn.toLocaleString()}</p>
          <p className="text-xs text-green-600 mt-2">Lifetime payouts</p>
        </div>

        <div className="bg-white rounded-xl p-5 border border-sky-100">
          <p className="text-xs text-slate-text">Lifetime Earnings</p>
          <p className="text-2xl font-bold text-charcoal mt-1">KSh {earnings.lifetime.toLocaleString()}</p>
          <div className="flex items-center gap-1 mt-2">
            {earnings.growth > 0 ? (
              <TrendingUp className="w-3 h-3 text-green-600" />
            ) : (
              <TrendingDown className="w-3 h-3 text-red-600" />
            )}
            <span className={`text-xs ${earnings.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {earnings.growth}% from last month
            </span>
          </div>
        </div>
      </div>

      {/* Earnings Chart Placeholder */}
      <div className="bg-white rounded-xl border border-sky-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-display font-semibold text-charcoal">Earnings Overview</h2>
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="px-3 py-1.5 border border-sky-200 rounded-lg text-sm"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
        </div>
        <div className="h-48 bg-sky-50 rounded-lg flex items-center justify-center">
          <p className="text-slate-text">Chart visualization here</p>
        </div>
      </div>

      {/* Withdrawal Methods */}
      <div className="bg-white rounded-xl border border-sky-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-display font-semibold text-charcoal">Withdrawal Methods</h2>
          <button className="text-sm text-redbull-blue hover:underline">Add New</button>
        </div>

        <div className="space-y-3">
          {withdrawMethods.map((method) => (
            <div key={method.id} className="flex items-center justify-between p-3 border border-sky-100 rounded-lg">
              <div className="flex items-center gap-3">
                {method.type === 'mpesa' ? (
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <Smartphone className="w-4 h-4 text-green-600" />
                  </div>
                ) : (
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <CreditCard className="w-4 h-4 text-blue-600" />
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium text-charcoal">
                    {method.type === 'mpesa' ? 'M-PESA' : 'Bank Transfer'}
                  </p>
                  <p className="text-xs text-slate-text">{method.details}</p>
                </div>
              </div>
              {method.default && (
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Default</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-xl border border-sky-100 p-6">
        <h2 className="text-lg font-display font-semibold text-charcoal mb-4">Recent Transactions</h2>

        <div className="space-y-3">
          {transactions.map((tx) => (
            <div key={tx.id} className="flex items-center justify-between p-3 hover:bg-sky-50/50 rounded-lg transition-colors">
              <div className="flex items-center gap-3">
                {tx.type === 'withdrawal' ? (
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <Wallet className="w-4 h-4 text-purple-600" />
                  </div>
                ) : (
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <DollarSign className="w-4 h-4 text-green-600" />
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium text-charcoal">
                    {tx.type === 'withdrawal' ? 'Withdrawal' : `Sale #${tx.orderId}`}
                  </p>
                  <p className="text-xs text-slate-text">{tx.date} · {tx.id}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-charcoal">KSh {tx.amount.toLocaleString()}</p>
                <p className={`text-xs flex items-center gap-1 justify-end ${
                  tx.status === 'completed' ? 'text-green-600' : 'text-amber-600'
                }`}>
                  {tx.status === 'completed' ? (
                    <CheckCircle className="w-3 h-3" />
                  ) : (
                    <Clock className="w-3 h-3" />
                  )}
                  {tx.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EarningsPage;