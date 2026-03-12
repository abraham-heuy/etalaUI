// pages/dashboard/orders.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Package, 
  Search,
  ChevronRight,
  Clock,
  CheckCircle,
  Truck,
  XCircle
} from 'lucide-react';

const OrdersPage: React.FC = () => {
  const [filter, setFilter] = useState('all');

  // Mock orders data
  const orders = [
    { 
      id: '1234', 
      date: '2026-03-10', 
      total: 2450, 
      status: 'delivered',
      items: 3,
      products: [
        { name: 'Product 1', price: 1200, quantity: 1 },
        { name: 'Product 2', price: 850, quantity: 2 },
      ]
    },
    { 
      id: '1235', 
      date: '2026-03-08', 
      total: 5670, 
      status: 'shipped',
      items: 2,
      products: [
        { name: 'Product 3', price: 4500, quantity: 1 },
        { name: 'Product 4', price: 1170, quantity: 1 },
      ]
    },
    { 
      id: '1236', 
      date: '2026-03-05', 
      total: 1890, 
      status: 'processing',
      items: 1,
      products: [
        { name: 'Product 5', price: 1890, quantity: 1 },
      ]
    },
    { 
      id: '1237', 
      date: '2026-03-01', 
      total: 3240, 
      status: 'cancelled',
      items: 2,
      products: [
        { name: 'Product 6', price: 1500, quantity: 1 },
        { name: 'Product 7', price: 1740, quantity: 1 },
      ]
    },
  ];

  const filteredOrders = filter === 'all' 
    ? orders 
    : orders.filter(o => o.status === filter);

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'delivered': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'shipped': return <Truck className="w-4 h-4 text-blue-600" />;
      case 'processing': return <Clock className="w-4 h-4 text-amber-600" />;
      case 'cancelled': return <XCircle className="w-4 h-4 text-red-600" />;
      default: return <Package className="w-4 h-4" />;
    }
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-display font-bold text-charcoal">
          My Orders
        </h1>
        <p className="text-slate-text mt-1">
          Track and manage your orders
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-text/40" />
          <input
            type="text"
            placeholder="Search orders by ID..."
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
      </div>

      {/* Orders List */}
      <div className="space-y-3">
        {filteredOrders.map((order) => (
          <Link
            key={order.id}
            to={`/dashboard/orders/${order.id}`}
            className="block bg-white rounded-xl border border-sky-100 p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-sky-100 rounded-full flex items-center justify-center">
                  {getStatusIcon(order.status)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-display font-semibold text-charcoal">
                      Order #{order.id}
                    </h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-text">
                    {order.date} · {order.items} items · KSh {order.total}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between sm:justify-end gap-4">
                <div className="flex -space-x-2">
                  {order.products.slice(0, 3).map((p, idx) => (
                    <div key={idx} className="w-6 h-6 bg-sky-200 rounded-full border-2 border-white flex items-center justify-center text-[8px] font-bold">
                      {p.name.charAt(0)}
                    </div>
                  ))}
                  {order.products.length > 3 && (
                    <div className="w-6 h-6 bg-sky-100 rounded-full border-2 border-white flex items-center justify-center text-[8px]">
                      +{order.products.length - 3}
                    </div>
                  )}
                </div>
                <ChevronRight className="w-5 h-5 text-slate-text" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Empty State */}
      {filteredOrders.length === 0 && (
        <div className="text-center py-12">
          <Package className="w-16 h-16 text-slate-text/30 mx-auto mb-4" />
          <h3 className="text-lg font-display font-medium text-charcoal mb-2">
            No orders found
          </h3>
          <p className="text-sm text-slate-text mb-4">
            {filter === 'all' 
              ? "You haven't placed any orders yet" 
              : `No ${filter} orders found`}
          </p>
          <Link
            to="/marketplace"
            className="inline-flex items-center gap-2 bg-redbull-blue text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-redbull-blue/90"
          >
            Start Shopping
          </Link>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;