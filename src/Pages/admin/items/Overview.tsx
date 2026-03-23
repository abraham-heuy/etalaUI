// pages/admin/Overview.tsx
import React from 'react';
import { 
  TrendingUp, 
  Users, 
  ShoppingBag, 
  DollarSign,
  Ticket,
  Clock,
  MoreVertical,
  Download,
  RefreshCw
} from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  change: number;
  icon: any;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon: Icon, color }) => (
  <div className="bg-white rounded-xl p-6 shadow-sm border border-sky-100 hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between mb-4">
      <div className={`p-2 rounded-lg ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <span className={`text-sm font-medium ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
        {change >= 0 ? '+' : ''}{change}%
      </span>
    </div>
    <h3 className="text-2xl font-bold text-charcoal mb-1">{value}</h3>
    <p className="text-sm text-slate-text">{title}</p>
  </div>
);

const AdminOverview: React.FC = () => {
  // Mock data - replace with API calls
  const stats = [
    { title: 'Total Users', value: '12,345', change: 12.5, icon: Users, color: 'bg-redbull-blue' },
    { title: 'Total Orders', value: '8,234', change: 8.2, icon: ShoppingBag, color: 'bg-green-500' },
    { title: 'Revenue', value: '$45,678', change: 15.3, icon: DollarSign, color: 'bg-purple-500' },
    { title: 'Active Sellers', value: '1,234', change: 5.7, icon: TrendingUp, color: 'bg-orange-500' },
  ];

  const recentOrders = [
    { id: 'ORD-001', customer: 'John Doe', amount: '$125.00', status: 'pending', date: '2024-03-20' },
    { id: 'ORD-002', customer: 'Jane Smith', amount: '$89.99', status: 'shipped', date: '2024-03-20' },
    { id: 'ORD-003', customer: 'Bob Johnson', amount: '$245.50', status: 'delivered', date: '2024-03-19' },
    { id: 'ORD-004', customer: 'Alice Brown', amount: '$67.80', status: 'pending', date: '2024-03-19' },
  ];

  const pendingVerifications = [
    { id: 'SELL-001', name: 'Tech Store', owner: 'Mike Chen', type: 'seller', date: '2024-03-20' },
    { id: 'SELL-002', name: 'Fashion Hub', owner: 'Sarah Lee', type: 'seller', date: '2024-03-20' },
    { id: 'SELL-003', name: 'Home Goods', owner: 'David Park', type: 'seller', date: '2024-03-19' },
  ];

  const getStatusColor = (status: string) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-700',
      shipped: 'bg-blue-100 text-blue-700',
      delivered: 'bg-green-100 text-green-700',
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-charcoal">Admin Overview</h1>
          <p className="text-slate-text mt-1">Welcome back, Admin! Here's what's happening today.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 text-sm bg-white border border-sky-200 rounded-lg hover:bg-sky-50 transition-colors flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export Report
          </button>
          <button className="px-4 py-2 text-sm bg-redbull-blue text-white rounded-lg hover:bg-redbull-blue/90 transition-colors flex items-center gap-2">
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-sky-100">
          <h3 className="text-lg font-semibold text-charcoal mb-4">Revenue Overview</h3>
          <div className="h-64 flex items-center justify-center bg-sky-50 rounded-lg">
            <p className="text-slate-text">Revenue chart will be displayed here</p>
          </div>
        </div>

        {/* User Growth */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-sky-100">
          <h3 className="text-lg font-semibold text-charcoal mb-4">User Growth</h3>
          <div className="h-64 flex items-center justify-center bg-sky-50 rounded-lg">
            <p className="text-slate-text">User growth chart will be displayed here</p>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl shadow-sm border border-sky-100 overflow-hidden">
        <div className="p-6 border-b border-sky-100">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-charcoal">Recent Orders</h3>
            <button className="text-sm text-redbull-blue hover:underline">View All</button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-sky-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-text uppercase">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-text uppercase">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-text uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-text uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-text uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-text uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sky-100">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-sky-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-charcoal">{order.id}</td>
                  <td className="px-6 py-4 text-sm text-slate-text">{order.customer}</td>
                  <td className="px-6 py-4 text-sm font-medium text-charcoal">{order.amount}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-text">{order.date}</td>
                  <td className="px-6 py-4">
                    <button className="text-slate-text hover:text-redbull-blue">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pending Verifications & Support Tickets */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Seller Verifications */}
        <div className="bg-white rounded-xl shadow-sm border border-sky-100 overflow-hidden">
          <div className="p-6 border-b border-sky-100">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-charcoal">Pending Verifications</h3>
                <p className="text-sm text-slate-text mt-1">Sellers awaiting approval</p>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-orange-500" />
                <span className="text-sm font-medium text-orange-600">3 pending</span>
              </div>
            </div>
          </div>
          <div className="divide-y divide-sky-100">
            {pendingVerifications.map((seller) => (
              <div key={seller.id} className="p-4 hover:bg-sky-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-charcoal">{seller.name}</p>
                    <p className="text-sm text-slate-text">Owner: {seller.owner}</p>
                    <p className="text-xs text-slate-text/60">Requested: {seller.date}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 text-sm bg-green-500 text-white rounded-lg hover:bg-green-600">
                      Approve
                    </button>
                    <button className="px-3 py-1 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600">
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Support Tickets Summary */}
        <div className="bg-white rounded-xl shadow-sm border border-sky-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-charcoal">Support Tickets</h3>
              <p className="text-sm text-slate-text">Open tickets requiring attention</p>
            </div>
            <Ticket className="w-8 h-8 text-redbull-blue-light" />
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-text">Urgent</span>
              <span className="text-lg font-bold text-red-600">5</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-text">High Priority</span>
              <span className="text-lg font-bold text-orange-600">8</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-text">Medium Priority</span>
              <span className="text-lg font-bold text-yellow-600">12</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-text">Low Priority</span>
              <span className="text-lg font-bold text-green-600">24</span>
            </div>
          </div>
          <button className="w-full mt-4 px-4 py-2 bg-redbull-blue text-white rounded-lg hover:bg-redbull-blue/90 transition-colors">
            View All Tickets
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;