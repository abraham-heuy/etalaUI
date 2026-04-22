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
  AlertCircle,
  ShoppingBag,
  Sprout,
  UtensilsCrossed,
  Hotel,
  CarTaxiFront,
  Briefcase,
  Tag,
  Rocket
} from 'lucide-react';
import ConfirmModal from '../../../common/ConfirmModal';
import { ProductService } from '../../../services/products/product.service';
import { SellerApplicationService } from '../../../services/Auth/seller-applications.service';

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
  category: string;
  subcategory?: string;
  productType: ProductType;
  createdAt: string;
  original: any;
}

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<UnifiedProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState<ProductType | 'all'>('all');
  const [subcategoryFilter, setSubcategoryFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; product: UnifiedProduct | null }>({
    isOpen: false,
    product: null,
  });
  const [isDeleting, setIsDeleting] = useState(false);
  const [availableSubcategories, setAvailableSubcategories] = useState<string[]>([]);
  const [inventoryManagerBannerDismissed, setInventoryManagerBannerDismissed] = useState(false);
  const [approvedCategories, setApprovedCategories] = useState<string[]>([]);

  useEffect(() => {
    fetchAllProducts();
    fetchApprovedCategories();
    const dismissed = localStorage.getItem('im_banner_dismissed');
    if (dismissed === 'true') setInventoryManagerBannerDismissed(true);
  }, []);

  const fetchApprovedCategories = async () => {
    try {
      const apps = await SellerApplicationService.getMyApplications();
      const approved = apps.filter(app => app.status === 'approved').map(app => app.category);
      setApprovedCategories(approved);
    } catch (err) {
      console.error('Failed to fetch approved categories', err);
    }
  };

  const fetchAllProducts = async () => {
    try {
      setLoading(true);
      setError(null);
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

      const mapProduct = (p: any, type: ProductType, defaultCategory: string): UnifiedProduct => {
        let subcategory = '';
        if (type === 'marketplace') subcategory = p.subcategory || '';
        else if (type === 'farmers') subcategory = p.unit || '';
        else if (type === 'food') subcategory = p.cuisine || '';
        else if (type === 'stays') subcategory = p.location || '';
        else if (type === 'boda') subcategory = p.vehicleType || '';
        else if (type === 'services') subcategory = p.serviceType || '';

        return {
          id: p.id,
          name: p.name,
          price: p.price,
          stock: p.stock ?? (p.quantity ?? 0),
          sold: (p as any).sold ?? 0,
          status: (p.stock === 0 || p.isAvailable === false) ? 'out_of_stock' : 'active',
          views: (p as any).views ?? 0,
          rating: (p as any).rating ?? 0,
          category: (p as any).category || (p as any).cuisine || (p as any).serviceType || (p as any).vehicleType || defaultCategory,
          subcategory,
          productType: type,
          createdAt: p.createdAt,
          original: p,
        };
      };

      const unified: UnifiedProduct[] = [
        ...marketplaceProducts.map(p => mapProduct(p, 'marketplace', p.category || 'Marketplace')),
        ...farmersProducts.map(p => mapProduct(p, 'farmers', 'Farmers Market')),
        ...foodProducts.map(p => mapProduct(p, 'food', p.cuisine || 'Food')),
        ...staysProducts.map(p => mapProduct(p, 'stays', p.location || 'Stays')),
        ...bodaProducts.map(p => mapProduct(p, 'boda', p.vehicleType || 'Boda')),
        ...servicesProducts.map(p => mapProduct(p, 'services', p.serviceType || 'Services')),
      ];

      setProducts(unified);

      const subs = unified
        .map(p => p.subcategory)
        .filter((s): s is string => !!s && s.trim().length > 0);
      const uniqueSubs = [...new Set(subs)];
      setAvailableSubcategories(uniqueSubs);
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
      switch (product.productType) {
        case 'marketplace': await ProductService.marketplace.delete(product.id); break;
        case 'farmers': await ProductService.farmers.delete(product.id); break;
        case 'food': await ProductService.food.delete(product.id); break;
        case 'stays': await ProductService.stays.delete(product.id); break;
        case 'boda': await ProductService.boda.delete(product.id); break;
        case 'services': await ProductService.services.delete(product.id); break;
      }
      setProducts(prev => prev.filter(p => p.id !== product.id));
      setDeleteModal({ isOpen: false, product: null });
    } catch (err: any) {
      alert('Failed to delete product: ' + err.message);
    } finally {
      setIsDeleting(false);
    }
  };

  const filteredProducts = products.filter(p => {
    if (statusFilter !== 'all' && p.status !== statusFilter) return false;
    if (typeFilter !== 'all' && p.productType !== typeFilter) return false;
    if (subcategoryFilter !== 'all' && p.subcategory !== subcategoryFilter) return false;
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

  const getCategoryIcon = (type: ProductType) => {
    switch (type) {
      case 'marketplace': return <ShoppingBag className="w-4 h-4" />;
      case 'farmers': return <Sprout className="w-4 h-4" />;
      case 'food': return <UtensilsCrossed className="w-4 h-4" />;
      case 'stays': return <Hotel className="w-4 h-4" />;
      case 'boda': return <CarTaxiFront className="w-4 h-4" />;
      case 'services': return <Briefcase className="w-4 h-4" />;
      default: return <Package className="w-4 h-4" />;
    }
  };

  const handleBannerDismiss = () => {
    setInventoryManagerBannerDismissed(true);
    localStorage.setItem('im_banner_dismissed', 'true');
  };

  const StatsSkeleton = () => (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="bg-white rounded-xl p-3 border border-sky-100 animate-pulse">
          <div className="h-3 bg-gray-200 rounded w-16 mb-2"></div>
          <div className="h-6 bg-gray-200 rounded w-12"></div>
        </div>
      ))}
    </div>
  );

  const TableSkeleton = () => (
    <div className="bg-white rounded-xl border border-sky-100 overflow-hidden animate-pulse">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-sky-50">
            <tr>
              {['Product', 'Price', 'Stock', 'Sold', 'Views', 'Status', 'Actions'].map((_, i) => (
                <th key={i} className="py-3 px-4"><div className="h-3 bg-gray-200 rounded w-16"></div></th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...Array(5)].map((_, i) => (
              <tr key={i} className="border-t border-sky-100">
                <td className="py-3 px-4"><div className="flex items-center gap-3"><div className="w-8 h-8 bg-gray-200 rounded"></div><div className="h-4 bg-gray-200 rounded w-24"></div></div></td>
                <td className="py-3 px-4"><div className="h-4 bg-gray-200 rounded w-16"></div></td>
                <td className="py-3 px-4"><div className="h-4 bg-gray-200 rounded w-12"></div></td>
                <td className="py-3 px-4"><div className="h-4 bg-gray-200 rounded w-12"></div></td>
                <td className="py-3 px-4"><div className="h-4 bg-gray-200 rounded w-12"></div></td>
                <td className="py-3 px-4"><div className="h-5 bg-gray-200 rounded w-16"></div></td>
                <td className="py-3 px-4"><div className="flex gap-2"><div className="w-6 h-6 bg-gray-200 rounded"></div><div className="w-6 h-6 bg-gray-200 rounded"></div></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-sky-500 to-sky-600 rounded-xl p-4 animate-pulse"><div className="h-20 bg-white/20 rounded"></div></div>
        <StatsSkeleton />
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 h-10 bg-gray-200 rounded animate-pulse"></div>
          <div className="w-32 h-10 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {[...Array(6)].map((_, i) => <div key={i} className="h-8 w-20 bg-gray-200 rounded-full animate-pulse"></div>)}
        </div>
        <TableSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <p className="text-red-600">Failed to load products: {error}</p>
        <button onClick={fetchAllProducts} className="mt-4 text-sky-600 hover:underline">Try Again</button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Banner - Introducing Inventory Manager */}
      {!inventoryManagerBannerDismissed && (
        <div className="bg-gradient-to-r from-sky-500 to-sky-600 rounded-xl p-4 text-white relative overflow-hidden">
          <div className="absolute right-0 top-0 opacity-10"><Rocket className="w-32 h-32" /></div>
          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-display font-semibold mb-1">Introducing the all new Inventory Manager:IM-(etala)</h3>
              <p className="text-sm text-sky-100 max-w-lg">Track stock, sales, and performance in one place.</p>
              <p className="text-sm text-sky-100 max-w-lg">Service type:  SaaS(Software as a Service)</p>
              <p className="text-sm text-sky-100 max-w-lg">Business size:  Tailored for  businesses of any size</p>
            </div>
            <div className="relative group">
              <Link to="/dashboard/inventory-manager" className="px-4 py-2 bg-white text-sky-600 rounded-lg text-sm font-medium hover:bg-sky-50 transition-colors flex items-center gap-2">
                <Rocket className="w-4 h-4" /> Start using IM-(etala)
              </Link>
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
                Simplify inventory management
              </div>
            </div>
            <button onClick={handleBannerDismiss} className="p-2 text-white/80 hover:text-white"><AlertCircle className="w-5 h-5" /></button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-charcoal">My Products</h1>
          <p className="text-slate-text mt-1">Manage your listings and inventory</p>
        </div>
        <Link
          to={approvedCategories.length > 0 ? "/dashboard/seller-start" : "/become-seller"}
          className="bg-redbull-blue text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-redbull-blue/90 flex items-center gap-2 self-start"
        >
          <Plus className="w-4 h-4" />
          {approvedCategories.length > 0 ? "Add New Product" : "Apply to Sell"}
        </Link>
      </div>

      {/* Show message if no approved categories */}
      {approvedCategories.length === 0 ? (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 text-center">
          <Package className="w-12 h-12 text-amber-500 mx-auto mb-3" />
          <h3 className="text-lg font-display font-semibold text-charcoal mb-2">No approved selling categories yet</h3>
          <p className="text-sm text-slate-text mb-4">You need to be approved to sell in at least one category before listing products.</p>
          <Link to="/become-seller" className="inline-flex items-center gap-2 bg-amber-600 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-amber-700">
            Apply for a category
          </Link>
        </div>
      ) : (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <div className="bg-white rounded-xl p-3 border border-sky-100"><p className="text-xs text-slate-text">Total Products</p><p className="text-xl font-bold text-charcoal">{stats.totalProducts}</p></div>
            <div className="bg-white rounded-xl p-3 border border-sky-100"><p className="text-xs text-slate-text">Active</p><p className="text-xl font-bold text-green-600">{stats.activeProducts}</p></div>
            <div className="bg-white rounded-xl p-3 border border-sky-100"><p className="text-xs text-slate-text">Out of Stock</p><p className="text-xl font-bold text-red-600">{stats.outOfStock}</p></div>
            <div className="bg-white rounded-xl p-3 border border-sky-100"><p className="text-xs text-slate-text">Total Views</p><p className="text-xl font-bold text-charcoal">{stats.totalViews}</p></div>
            <div className="bg-white rounded-xl p-3 border border-sky-100"><p className="text-xs text-slate-text">Units Sold</p><p className="text-xl font-bold text-charcoal">{stats.totalSales}</p></div>
            <div className="bg-white rounded-xl p-3 border border-sky-100"><p className="text-xs text-slate-text">Revenue</p><p className="text-xl font-bold text-green-600">KSh {stats.revenue.toLocaleString()}</p></div>
          </div>

          {/* Search and Status Filter */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-text/40" />
              <input type="text" placeholder="Search products..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 bg-white border border-sky-200 rounded-lg text-sm focus:outline-none focus:border-redbull-blue" />
            </div>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-4 py-2 bg-white border border-sky-200 rounded-lg text-sm text-slate-text focus:outline-none focus:border-redbull-blue">
              <option value="all">All Status</option><option value="active">Active</option><option value="out_of_stock">Out of Stock</option>
            </select>
          </div>

          {/* Category Filter Chips */}
          <div className="flex flex-wrap gap-2">
            <button onClick={() => setTypeFilter('all')} className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${typeFilter === 'all' ? 'bg-redbull-blue text-white' : 'bg-sky-100 text-slate-text hover:bg-sky-200'}`}>All</button>
            {(['marketplace', 'farmers', 'food', 'stays', 'boda', 'services'] as ProductType[]).map(type => (
              <button key={type} onClick={() => setTypeFilter(type)} className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors flex items-center gap-1 ${typeFilter === type ? 'bg-redbull-blue text-white' : 'bg-sky-100 text-slate-text hover:bg-sky-200'}`}>
                {getCategoryIcon(type)}<span className="capitalize">{type}</span>
              </button>
            ))}
          </div>

          {/* Subcategory Filter Chips (if any) */}
          {availableSubcategories.length > 0 && (
            <div className="flex flex-wrap gap-2 border-t border-sky-100 pt-3">
              <button onClick={() => setSubcategoryFilter('all')} className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${subcategoryFilter === 'all' ? 'bg-sky-500 text-white' : 'bg-sky-50 text-slate-text hover:bg-sky-100'}`}>All Subcategories</button>
              {availableSubcategories.map(sub => (
                <button key={sub} onClick={() => setSubcategoryFilter(sub)} className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors flex items-center gap-1 ${subcategoryFilter === sub ? 'bg-sky-500 text-white' : 'bg-sky-50 text-slate-text hover:bg-sky-100'}`}>
                  <Tag className="w-3 h-3" /><span className="capitalize">{sub}</span>
                </button>
              ))}
            </div>
          )}

          {/* Products Table (without images) */}
          <div className="bg-white rounded-xl border border-sky-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-sky-50 border-b border-sky-100">
                  <tr>
                    <th className="text-left py-3 px-4 text-xs font-medium text-slate-text">Product</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-slate-text">Category</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-slate-text">Price</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-slate-text">Stock</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-slate-text">Sold</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-slate-text">Views</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-slate-text">Status</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-slate-text">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sky-100">
                  {filteredProducts.map(product => (
                    <tr key={product.id} className="hover:bg-sky-50/50 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded bg-sky-100 flex items-center justify-center">{getCategoryIcon(product.productType)}</div>
                          <div><p className="font-medium text-charcoal">{product.name}</p><p className="text-xs text-slate-text">{new Date(product.createdAt).toLocaleDateString()}</p></div>
                        </div>
                      </td>
                      <td className="py-3 px-4"><span className="text-xs bg-sky-50 px-2 py-1 rounded-full">{product.category}</span>{product.subcategory && <span className="text-xs text-slate-text ml-1">({product.subcategory})</span>}</td>
                      <td className="py-3 px-4 font-medium">KSh {product.price.toLocaleString()}</td>
                      <td className="py-3 px-4"><span className={product.stock === 0 ? 'text-red-600' : 'text-green-600'}>{product.stock ?? 'N/A'}</span></td>
                      <td className="py-3 px-4">{product.sold ?? 0}</td>
                      <td className="py-3 px-4">{product.views ?? 0}</td>
                      <td className="py-3 px-4"><span className={`text-xs px-2 py-1 rounded-full ${product.status === 'active' ? 'bg-green-100 text-green-700' : product.status === 'out_of_stock' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'}`}>{product.status.replace('_', ' ')}</span></td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <Link to={`/marketplace/product/${product.id}`} className="p-1 hover:text-redbull-blue"><Eye className="w-4 h-4" /></Link>
                          <Link to={`/dashboard/products/edit/${product.id}`} className="p-1 hover:text-redbull-blue"><Edit2 className="w-4 h-4" /></Link>
                          <button className="p-1 hover:text-redbull-blue"><Copy className="w-4 h-4" /></button>
                          <button onClick={() => setDeleteModal({ isOpen: true, product })} className="p-1 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {filteredProducts.length === 0 && (
              <div className="text-center py-12"><Package className="w-12 h-12 text-slate-text/30 mx-auto mb-3" /><p className="text-slate-text">No products found</p></div>
            )}
          </div>
        </>
      )}

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