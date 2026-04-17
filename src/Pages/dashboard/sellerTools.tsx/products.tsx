// pages/dashboard/products.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Package, 
  Plus, 
  Edit2, 
  Trash2,
  Eye,
  Copy,
  Search,
  Loader2,
  AlertCircle
} from 'lucide-react';
import ConfirmModal from '../../../common/ConfirmModal';
import { ProductService } from '../../../services/products/product.service'

type ProductType = 'marketplace' | 'farmers' | 'food' | 'stays' | 'boda' | 'services';

interface UnifiedProduct {
  id: string;
  name: string;
  price: number;
  stock?: number;
  sold?: number;
  status: 'active' | 'inactive' | 'out_of_stock';
  views?: number;
  rating?: number;
  image: string;
  category: string;  // human-readable category
  productType: ProductType;
  createdAt: string;
  // original product object for later use (e.g., delete)
  original: any;
}

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<UnifiedProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; product: UnifiedProduct | null }>({
    isOpen: false,
    product: null,
  });
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const fetchAllProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch products from all categories concurrently
      const [
        marketplaceProducts,
        farmersProducts,
        foodProducts,
        staysProducts,
        bodaProducts,
        servicesProducts
      ] = await Promise.all([
        ProductService.marketplace.getMyProducts().catch(() => []),
        ProductService.farmers.getMyProducts().catch(() => []),
        ProductService.food.getMyProducts().catch(() => []),
        ProductService.stays.getMyProducts().catch(() => []),
        ProductService.boda.getMyProducts().catch(() => []),
        ProductService.services.getMyProducts().catch(() => [])
      ]);

      // Helper to convert to UnifiedProduct
      const mapProduct = (p: any, type: ProductType, defaultCategory: string): UnifiedProduct => ({
        id: p.id,
        name: p.name,
        price: p.price,
        stock: p.stock ?? (p.quantity ?? 0), // for some types stock may be called quantity
        sold: (p as any).sold ?? 0,   // backend might not provide sold count yet
        status: (p.stock === 0 || p.isAvailable === false) ? 'out_of_stock' : 'active',
        views: (p as any).views ?? 0,
        rating: (p as any).rating ?? 0,
        image: p.images?.[0] || 'https://via.placeholder.com/100x100?text=No+Image',
        category: (p as any).category || (p as any).cuisine || (p as any).serviceType || (p as any).vehicleType || defaultCategory,
        productType: type,
        createdAt: p.createdAt,
        original: p,
      });

      const unified: UnifiedProduct[] = [
        ...marketplaceProducts.map(p => mapProduct(p, 'marketplace', p.category || 'Marketplace')),
        ...farmersProducts.map(p => mapProduct(p, 'farmers', 'Farmers Market')),
        ...foodProducts.map(p => mapProduct(p, 'food', p.cuisine || 'Food')),
        ...staysProducts.map(p => mapProduct(p, 'stays', p.location || 'Stays')),
        ...bodaProducts.map(p => mapProduct(p, 'boda', p.vehicleType || 'Boda')),
        ...servicesProducts.map(p => mapProduct(p, 'services', p.serviceType || 'Services')),
      ];

      setProducts(unified);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async () => {
    if (!deleteModal.product) return;
    setIsDeleting(true);
    try {
      const { product } = deleteModal;
      // Call appropriate delete method based on product type
      switch (product.productType) {
        case 'marketplace':
          await ProductService.marketplace.delete(product.id);
          break;
        case 'farmers':
          await ProductService.farmers.delete(product.id);
          break;
        case 'food':
          await ProductService.food.delete(product.id);
          break;
        case 'stays':
          await ProductService.stays.delete(product.id);
          break;
        case 'boda':
          await ProductService.boda.delete(product.id);
          break;
        case 'services':
          await ProductService.services.delete(product.id);
          break;
      }
      // Remove from local state
      setProducts(prev => prev.filter(p => p.id !== product.id));
      setDeleteModal({ isOpen: false, product: null });
    } catch (err: any) {
      alert('Failed to delete product: ' + err.message);
    } finally {
      setIsDeleting(false);
    }
  };

  const filteredProducts = products.filter(p => {
    if (filter !== 'all' && p.status !== filter) return false;
    if (searchTerm && !p.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const stats = {
    totalProducts: products.length,
    activeProducts: products.filter(p => p.status === 'active').length,
    outOfStock: products.filter(p => p.status === 'out_of_stock').length,
    totalViews: products.reduce((sum, p) => sum + (p.views || 0), 0),
    totalSales: products.reduce((sum, p) => sum + (p.sold || 0), 0),
    revenue: products.reduce((sum, p) => sum + (p.price * (p.sold || 0)), 0),
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-sky-500 animate-spin mx-auto mb-4" />
          <p className="text-sm text-slate-text">Loading your products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <p className="text-red-600">Failed to load products: {error}</p>
        <button onClick={fetchAllProducts} className="mt-4 text-sky-600 hover:underline">
          Try Again
        </button>
      </div>
    );
  }

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
                      {product.stock ?? 'N/A'}
                    </span>
                  </td>
                  <td className="py-3 px-4">{product.sold ?? 0}</td>
                  <td className="py-3 px-4">{product.views ?? 0}</td>
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
                        onClick={() => setDeleteModal({ isOpen: true, product })}
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
        onConfirm={handleDeleteProduct}
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