// pages/dashboard/products.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Package, 
  Plus, 
  Edit2, 
  Trash2,
  Eye,
  Copy,
  Search
} from 'lucide-react';
import ConfirmModal from '../../../common/ConfirmModal';

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  sold: number;
  status: string;
  views: number;
  rating: number;
  image: string;
  category: string;
  createdAt: string;
}

const ProductsPage: React.FC = () => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; product: Product | null }>({
    isOpen: false,
    product: null,
  });
  const [isDeleting, setIsDeleting] = useState(false);

  // Mock products data
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: 'iPhone 13 Pro Max',
      price: 145000,
      stock: 5,
      sold: 12,
      status: 'active',
      views: 345,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1632661674596-df8be6a1c9e1?w=100&h=100&fit=crop',
      category: 'Electronics',
      createdAt: '2026-03-01',
    },
    {
      id: '2',
      name: 'Men\'s Leather Jacket',
      price: 6500,
      stock: 8,
      sold: 23,
      status: 'active',
      views: 567,
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=100&h=100&fit=crop',
      category: 'Fashion',
      createdAt: '2026-02-15',
    },
    {
      id: '3',
      name: 'Fresh Farm Eggs (Tray)',
      price: 450,
      stock: 0,
      sold: 156,
      status: 'out_of_stock',
      views: 890,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=100&h=100&fit=crop',
      category: 'Farmers Market',
      createdAt: '2026-01-20',
    },
    {
      id: '4',
      name: 'Wireless Headphones',
      price: 3500,
      stock: 3,
      sold: 45,
      status: 'active',
      views: 234,
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop',
      category: 'Electronics',
      createdAt: '2026-03-05',
    },
    {
      id: '5',
      name: 'Handmade Beaded Jewelry',
      price: 1200,
      stock: 15,
      sold: 8,
      status: 'draft',
      views: 67,
      rating: 0,
      image: 'https://images.unsplash.com/photo-1611085583191-0a1a3f6b5b5a?w=100&h=100&fit=crop',
      category: 'Handicrafts',
      createdAt: '2026-03-10',
    },
  ]);

  const filteredProducts = products.filter(p => {
    if (filter !== 'all' && p.status !== filter) return false;
    if (searchTerm && !p.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const stats = {
    totalProducts: products.length,
    activeProducts: products.filter(p => p.status === 'active').length,
    outOfStock: products.filter(p => p.status === 'out_of_stock').length,
    totalViews: products.reduce((sum, p) => sum + p.views, 0),
    totalSales: products.reduce((sum, p) => sum + p.sold, 0),
    revenue: products.reduce((sum, p) => sum + (p.price * p.sold), 0),
  };

  const handleDeleteClick = (product: Product) => {
    setDeleteModal({ isOpen: true, product });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteModal.product) return;
    
    setIsDeleting(true);
    
    // Simulate API call
    setTimeout(() => {
      // Remove product from state
      setProducts(prev => prev.filter(p => p.id !== deleteModal.product?.id));
      
      setIsDeleting(false);
      setDeleteModal({ isOpen: false, product: null });
      
      // Show success message (you could add a toast notification here)
      console.log('Product deleted successfully');
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-charcoal">
            My Products
          </h1>
          <p className="text-slate-text mt-1">
            Manage your listings and inventory
          </p>
        </div>
        <Link
          to="/dashboard/products/new"
          className="bg-redbull-blue text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-redbull-blue/90 flex items-center gap-2 self-start"
        >
          <Plus className="w-4 h-4" />
          Add New Product
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-white rounded-xl p-3 border border-sky-100">
          <p className="text-xs text-slate-text">Total Products</p>
          <p className="text-xl font-bold text-charcoal">{stats.totalProducts}</p>
        </div>
        <div className="bg-white rounded-xl p-3 border border-sky-100">
          <p className="text-xs text-slate-text">Active</p>
          <p className="text-xl font-bold text-green-600">{stats.activeProducts}</p>
        </div>
        <div className="bg-white rounded-xl p-3 border border-sky-100">
          <p className="text-xs text-slate-text">Out of Stock</p>
          <p className="text-xl font-bold text-red-600">{stats.outOfStock}</p>
        </div>
        <div className="bg-white rounded-xl p-3 border border-sky-100">
          <p className="text-xs text-slate-text">Total Views</p>
          <p className="text-xl font-bold text-charcoal">{stats.totalViews}</p>
        </div>
        <div className="bg-white rounded-xl p-3 border border-sky-100">
          <p className="text-xs text-slate-text">Units Sold</p>
          <p className="text-xl font-bold text-charcoal">{stats.totalSales}</p>
        </div>
        <div className="bg-white rounded-xl p-3 border border-sky-100">
          <p className="text-xs text-slate-text">Revenue</p>
          <p className="text-xl font-bold text-green-600">KSh {stats.revenue.toLocaleString()}</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-text/40" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-sky-200 rounded-lg text-sm focus:outline-none focus:border-redbull-blue"
          />
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 bg-white border border-sky-200 rounded-lg text-sm text-slate-text focus:outline-none focus:border-redbull-blue"
        >
          <option value="all">All Products</option>
          <option value="active">Active</option>
          <option value="out_of_stock">Out of Stock</option>
          <option value="draft">Drafts</option>
        </select>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl border border-sky-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-sky-50 border-b border-sky-100">
              <tr>
                <th className="text-left py-3 px-4 text-xs font-medium text-slate-text">Product</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-slate-text">Price</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-slate-text">Stock</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-slate-text">Sold</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-slate-text">Views</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-slate-text">Status</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-slate-text">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sky-100">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-sky-50/50 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img src={product.image} alt={product.name} className="w-10 h-10 rounded-lg object-cover" />
                      <div>
                        <p className="font-medium text-charcoal">{product.name}</p>
                        <p className="text-xs text-slate-text">{product.category}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-medium">KSh {product.price.toLocaleString()}</td>
                  <td className="py-3 px-4">
                    <span className={product.stock === 0 ? 'text-red-600' : 'text-green-600'}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="py-3 px-4">{product.sold}</td>
                  <td className="py-3 px-4">{product.views}</td>
                  <td className="py-3 px-4">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      product.status === 'active' ? 'bg-green-100 text-green-700' :
                      product.status === 'out_of_stock' ? 'bg-red-100 text-red-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {product.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <Link to={`/marketplace/product/${product.id}`} className="p-1 hover:text-redbull-blue">
                        <Eye className="w-4 h-4" />
                      </Link>
                      <Link to={`/dashboard/products/edit/${product.id}`} className="p-1 hover:text-redbull-blue">
                        <Edit2 className="w-4 h-4" />
                      </Link>
                      <button className="p-1 hover:text-redbull-blue">
                        <Copy className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(product)}
                        className="p-1 hover:text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-12 h-12 text-slate-text/30 mx-auto mb-3" />
            <p className="text-slate-text">No products found</p>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, product: null })}
        onConfirm={handleDeleteConfirm}
        title="Delete Product"
        message={`Are you sure you want to delete "${deleteModal.product?.name}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
        isConfirming={isDeleting}
      />
    </div>
  );
};

export default ProductsPage;