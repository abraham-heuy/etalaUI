// pages/dashboard/sales.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search,
  ChevronRight,
  Package,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
  Download,
  Printer
} from 'lucide-react';

const SalesPage: React.FC = () => {
  const [filter, setFilter] = useState('all');
  const [dateRange, setDateRange] = useState('week');

  // Mock sales orders
  const orders = [
    { 
      id: 'ORD-1234', 
      date: '2026-03-10', 
      customer: 'John Kamau',
      items: [
        { name: 'iPhone 13 Pro Max', quantity: 1, price: 145000 }
      ],
      total: 145000,
      status: 'delivered',
      payment: 'paid',
      delivery: 'delivered'
    },
    { 
      id: 'ORD-1235', 
      date: '2026-03-09', 
      customer: 'Mary Wanjiku',
      items: [
        { name: 'Leather Jacket', quantity: 2, price: 6500 }
      ],
      total: 13000,
      status: 'shipped',
      payment: 'paid',
      delivery: 'in_transit'
    },
    { 
      id: 'ORD-1236', 
      date: '2026-03-08', 
      customer: 'Peter Muthoka',
      items: [
        { name: 'Wireless Headphones', quantity: 1, price: 3500 },
        { name: 'Fresh Eggs', quantity: 2, price: 450 }
      ],
      total: 4400,
      status: 'processing',
      payment: 'pending',
      delivery: 'pending'
    },
    { 
      id: 'ORD-1237', 
      date: '2026-03-07', 
      customer: 'Sarah Kimani',
      items: [
        { name: 'Handmade Jewelry', quantity: 3, price: 1200 }
      ],
      total: 3600,
      status: 'cancelled',
      payment: 'refunded',
      delivery: 'cancelled'
    },
  ];

  const stats = {
    totalOrders: orders.length,
    pending: orders.filter(o => o.status === 'processing').length,
    shipped: orders.filter(o => o.status === 'shipped').length,
    delivered: orders.filter(o => o.status === 'delivered').length,
    revenue: orders.reduce((sum, o) => sum + (o.status !== 'cancelled' ? o.total : 0), 0),
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'delivered': return 'bg-green-100 text-green-700';
      case 'shipped': return 'bg-blue-100 text-blue-700';
      case 'processing': return 'bg-amber-100 text-amber-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'delivered': return <CheckCircle className="w-4 h-4" />;
      case 'shipped': return <Truck className="w-4 h-4" />;
      case 'processing': return <Clock className="w-4 h-4" />;
      case 'cancelled': return <XCircle className="w-4 h-4" />;
      default: return <Package className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-charcoal">
            Sales Management
          </h1>
          <p className="text-slate-text mt-1">
            Track and manage customer orders
          </p>
        </div>
        <div className="flex gap-2">
          <button className="border border-sky-200 text-slate-text px-3 py-2 rounded-lg text-sm hover:bg-sky-50 flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export
          </button>
          <button className="border border-sky-200 text-slate-text px-3 py-2 rounded-lg text-sm hover:bg-sky-50 flex items-center gap-2">
            <Printer className="w-4 h-4" />
            Print
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="bg-white rounded-xl p-4 border border-sky-100">
          <p className="text-xs text-slate-text">Total Orders</p>
          <p className="text-2xl font-bold text-charcoal">{stats.totalOrders}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-sky-100">
          <p className="text-xs text-slate-text">Pending</p>
          <p className="text-2xl font-bold text-amber-600">{stats.pending}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-sky-100">
          <p className="text-xs text-slate-text">Shipped</p>
          <p className="text-2xl font-bold text-blue-600">{stats.shipped}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-sky-100">
          <p className="text-xs text-slate-text">Delivered</p>
          <p className="text-2xl font-bold text-green-600">{stats.delivered}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-sky-100">
          <p className="text-xs text-slate-text">Revenue</p>
          <p className="text-2xl font-bold text-green-600">KSh {stats.revenue.toLocaleString()}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-text/40" />
          <input
            type="text"
            placeholder="Search by order ID or customer..."
            className="w-full pl-10 pr-4 py-2 bg-white border border-sky-200 rounded-lg text-sm focus:outline-none focus:border-redbull-blue"
          />
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 bg-white border border-sky-200 rounded-lg text-sm text-slate-text focus:outline-none focus:border-redbull-blue"
        >
          <option value="all">All Orders</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          className="px-4 py-2 bg-white border border-sky-200 rounded-lg text-sm text-slate-text focus:outline-none focus:border-redbull-blue"
        >
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="year">This Year</option>
        </select>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl border border-sky-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-sky-50 border-b border-sky-100">
              <tr>
                <th className="text-left py-3 px-4 text-xs font-medium text-slate-text">Order ID</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-slate-text">Date</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-slate-text">Customer</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-slate-text">Items</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-slate-text">Total</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-slate-text">Payment</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-slate-text">Status</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-slate-text">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sky-100">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-sky-50/50 transition-colors">
                  <td className="py-3 px-4 font-medium text-charcoal">{order.id}</td>
                  <td className="py-3 px-4 text-slate-text">{order.date}</td>
                  <td className="py-3 px-4">{order.customer}</td>
                  <td className="py-3 px-4">
                    <div className="flex -space-x-2">
                      {order.items.slice(0, 3).map((item, idx) => (
                        <div key={idx} className="w-6 h-6 bg-sky-200 rounded-full border-2 border-white flex items-center justify-center text-[8px] font-bold">
                          {item.name.charAt(0)}
                        </div>
                      ))}
                      {order.items.length > 3 && (
                        <div className="w-6 h-6 bg-sky-100 rounded-full border-2 border-white flex items-center justify-center text-[8px]">
                          +{order.items.length - 3}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4 font-medium">KSh {order.total.toLocaleString()}</td>
                  <td className="py-3 px-4">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      order.payment === 'paid' ? 'bg-green-100 text-green-700' :
                      order.payment === 'pending' ? 'bg-amber-100 text-amber-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {order.payment}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full w-fit ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <Link
                      to={`/dashboard/sales/${order.id}`}
                      className="text-redbull-blue hover:underline flex items-center gap-1"
                    >
                      View
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SalesPage;