// pages/dashboard/orders.tsx
import React, { useState, useEffect } from 'react';
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
import { CommerceService, type Order } from '../../../services/commerce/commerce.service';

const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await CommerceService.getMyOrders();
      setOrders(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredOrders = orders.filter(order => {
    if (filter !== 'all' && order.status !== filter) return false;
    if (search && !order.id.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const getStatusIcon = (status: Order['status']) => {
    switch(status) {
      case 'delivered': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'shipped': return <Truck className="w-4 h-4 text-blue-600" />;
      case 'processing': return <Clock className="w-4 h-4 text-amber-600" />;
      case 'cancelled': return <XCircle className="w-4 h-4 text-red-600" />;
      default: return <Package className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch(status) {
      case 'delivered': return 'bg-green-100 text-green-700';
      case 'shipped': return 'bg-blue-100 text-blue-700';
      case 'processing': return 'bg-amber-100 text-amber-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  // Helper to get first letter safely
  const getItemInitial = (name?: string) => {
    return name?.charAt(0)?.toUpperCase() || '?';
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <div className="h-8 w-48 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 w-64 bg-gray-200 rounded animate-pulse mt-1"></div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 h-10 bg-gray-200 rounded animate-pulse"></div>
          <div className="w-32 h-10 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="space-y-3">
          {[1,2,3].map(i => (
            <div key={i} className="bg-white rounded-xl border border-sky-100 p-4 animate-pulse">
              <div className="flex justify-between">
                <div className="flex gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                  <div>
                    <div className="h-5 w-32 bg-gray-200 rounded"></div>
                    <div className="h-4 w-48 bg-gray-200 rounded mt-1"></div>
                  </div>
                </div>
                <div className="w-5 h-5 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Error loading orders: {error}</p>
        <button onClick={fetchOrders} className="mt-4 text-sky-600">Retry</button>
      </div>
    );
  }

  if (filteredOrders.length === 0) {
    return (
      <div className="text-center py-12">
        <Package className="w-16 h-16 text-slate-text/30 mx-auto mb-4" />
        <h3 className="text-lg font-display font-medium text-charcoal mb-2">No orders found</h3>
        <p className="text-sm text-slate-text mb-4">
          {filter !== 'all' ? `No ${filter} orders` : "You haven't placed any orders yet"}
        </p>
        <Link to="/marketplace" className="inline-flex items-center gap-2 bg-redbull-blue text-white px-6 py-2 rounded-full text-sm font-medium">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-display font-bold text-charcoal">My Orders</h1>
        <p className="text-slate-text mt-1">Track and manage your orders</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-text/40" />
          <input
            type="text"
            placeholder="Search orders by ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-sky-200 rounded-lg text-sm focus:outline-none focus:border-redbull-blue"
          />
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 bg-white border border-sky-200 rounded-lg text-sm text-slate-text focus:outline-none focus:border-redbull-blue"
        >
          <option value="all">All Orders</option>
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

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
                      Order #{order.id.slice(-8)}
                    </h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(order.status)} capitalize`}>
                      {order.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-text">
                    {formatDate(order.createdAt)} · {order.items.length} items · KSh {order.totalAmount.toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between sm:justify-end gap-4">
                <div className="flex -space-x-2">
                  {order.items.slice(0, 3).map((item, idx) => (
                    <div
                      key={idx}
                      className="w-6 h-6 bg-sky-200 rounded-full border-2 border-white flex items-center justify-center text-[8px] font-bold"
                    >
                      {getItemInitial(item.name)}
                    </div>
                  ))}
                  {order.items.length > 3 && (
                    <div className="w-6 h-6 bg-sky-100 rounded-full border-2 border-white flex items-center justify-center text-[8px]">
                      +{order.items.length - 3}
                    </div>
                  )}
                </div>
                <ChevronRight className="w-5 h-5 text-slate-text" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;