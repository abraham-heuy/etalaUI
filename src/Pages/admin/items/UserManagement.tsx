// pages/admin/UserManagement.tsx
import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  MoreVertical,
  UserCheck,
  UserX,
  Mail,
  Phone,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Store,
  Users
} from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'seller' | 'admin';
  status: 'active' | 'suspended' | 'pending';
  joinDate: string;
  orders: number;
  totalSpent: number;
  phone?: string;
  address?: string;
}

const UserManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
  const [selectedRole, setSelectedRole] = useState<string>('all');

  // Mock users data
  const users: User[] = [
    {
      id: 'USR-001',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'user',
      status: 'active',
      joinDate: '2024-01-15',
      orders: 12,
      totalSpent: 1250.50,
      phone: '+1234567890',
      address: '123 Main St, City'
    },
    {
      id: 'USR-002',
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'seller',
      status: 'active',
      joinDate: '2024-01-20',
      orders: 45,
      totalSpent: 8900.00,
      phone: '+1234567891',
      address: '456 Oak Ave, City'
    },
    {
      id: 'USR-003',
      name: 'Bob Johnson',
      email: 'bob@example.com',
      role: 'user',
      status: 'suspended',
      joinDate: '2023-12-01',
      orders: 3,
      totalSpent: 150.00,
      phone: '+1234567892',
      address: '789 Pine St, City'
    },
  ];

  const getRoleBadgeColor = (role: string) => {
    const colors = {
      admin: 'bg-purple-100 text-purple-700',
      seller: 'bg-green-100 text-green-700',
      user: 'bg-blue-100 text-blue-700',
    };
    return colors[role as keyof typeof colors] || 'bg-gray-100 text-gray-700';
  };

  const getStatusBadgeColor = (status: string) => {
    const colors = {
      active: 'bg-green-100 text-green-700',
      suspended: 'bg-red-100 text-red-700',
      pending: 'bg-yellow-100 text-yellow-700',
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-700';
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-display font-bold text-charcoal">User Management</h1>
        <p className="text-slate-text mt-1">Manage and monitor all users on the platform</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-sky-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-text">Total Users</span>
            <Users className="w-5 h-5 text-redbull-blue" />
          </div>
          <p className="text-2xl font-bold text-charcoal">12,345</p>
          <p className="text-xs text-green-600 mt-1">↑ 12% this month</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-sky-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-text">Active Sellers</span>
            <Store className="w-5 h-5 text-green-500" />
          </div>
          <p className="text-2xl font-bold text-charcoal">1,234</p>
          <p className="text-xs text-green-600 mt-1">↑ 5% this month</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-sky-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-text">Suspended Users</span>
            <UserX className="w-5 h-5 text-red-500" />
          </div>
          <p className="text-2xl font-bold text-charcoal">234</p>
          <p className="text-xs text-red-600 mt-1">↓ 3% this month</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-sky-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-text">New This Week</span>
            <Calendar className="w-5 h-5 text-orange-500" />
          </div>
          <p className="text-2xl font-bold text-charcoal">456</p>
          <p className="text-xs text-green-600 mt-1">↑ 8% from last week</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl p-4 border border-sky-100">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-text w-4 h-4" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-sky-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-redbull-blue focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="px-4 py-2 border border-sky-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-redbull-blue"
            >
              <option value="all">All Roles</option>
              <option value="user">Users</option>
              <option value="seller">Sellers</option>
              <option value="admin">Admins</option>
            </select>
            <button className="px-4 py-2 border border-sky-200 rounded-lg hover:bg-sky-50 flex items-center gap-2">
              <Filter className="w-4 h-4" />
              More Filters
            </button>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-sm border border-sky-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-sky-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-text uppercase">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-text uppercase">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-text uppercase">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-text uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-text uppercase">Orders</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-text uppercase">Total Spent</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-text uppercase">Joined</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-text uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sky-100">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-sky-50 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-charcoal">{user.name}</p>
                      <p className="text-xs text-slate-text">{user.id}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-sm text-slate-text">
                        <Mail className="w-3 h-3" />
                        {user.email}
                      </div>
                      {user.phone && (
                        <div className="flex items-center gap-1 text-xs text-slate-text/70">
                          <Phone className="w-3 h-3" />
                          {user.phone}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${getRoleBadgeColor(user.role)}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusBadgeColor(user.status)}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-charcoal">{user.orders}</td>
                  <td className="px-6 py-4 text-sm font-medium text-charcoal">${user.totalSpent.toFixed(2)}</td>
                  <td className="px-6 py-4 text-sm text-slate-text">{user.joinDate}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="p-1 text-green-600 hover:bg-green-50 rounded">
                        <UserCheck className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-red-600 hover:bg-red-50 rounded">
                        <UserX className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-slate-text hover:bg-sky-50 rounded">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                   </td>
                 </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-sky-100 flex items-center justify-between">
          <p className="text-sm text-slate-text">
            Showing {filteredUsers.length} of {users.length} users
          </p>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-sky-200 rounded-lg hover:bg-sky-50 disabled:opacity-50">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="px-3 py-1 bg-redbull-blue text-white rounded-lg">1</button>
            <button className="px-3 py-1 border border-sky-200 rounded-lg hover:bg-sky-50">2</button>
            <button className="px-3 py-1 border border-sky-200 rounded-lg hover:bg-sky-50">3</button>
            <button className="px-3 py-1 border border-sky-200 rounded-lg hover:bg-sky-50">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;