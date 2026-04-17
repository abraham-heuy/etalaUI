// pages/dashboard/products/new.tsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Check,
  X,
  Upload,
  Plus,
  Tag,
  DollarSign,
  FileText,
  Image as ImageIcon,
  Info,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Save,
  Loader2
} from 'lucide-react';
import { ProductService } from '../../../services/products/product.service';
import { useAuth } from '../../../contexts/auth/auth';

type ProductCondition = 'new' | 'like-new' | 'good' | 'fair';
type ProductStatus = 'active' | 'draft';

interface ProductFormData {
  // Basic Info
  name: string;
  description: string;
  category: string;
  subcategory: string;

  // Pricing & Inventory
  price: number;
  originalPrice?: number;
  stock: number;
  condition: ProductCondition;

  // Media
  images: File[];
  imagePreviews: string[];

  // Tags & SEO
  tags: string[];
  tagInput: string;

  // Settings
  isMtush: boolean;
  status: ProductStatus;

  // Additional fields for different categories
  brand?: string;
  model?: string;
  sku?: string;
  unit?: 'kg' | 'bunch' | 'piece' | 'bundle';
  organic?: boolean;
  cuisine?: string;
  dietary?: string[];
  preparationTime?: number;
  location?: string;
  bedrooms?: number;
  bathrooms?: number;
  maxGuests?: number;
  amenities?: string[];
  vehicleType?: 'boda' | 'taxi' | 'tuk-tuk' | 'delivery';
  seats?: number;
  serviceType?: string;
  duration?: number;
  locationType?: 'online' | 'onsite' | 'both';
}

const ProductNewPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    description: '',
    category: '',
    subcategory: '',
    price: 0,
    originalPrice: undefined,
    stock: 1,
    condition: 'new',
    images: [],
    imagePreviews: [],
    tags: [],
    tagInput: '',
    isMtush: false,
    status: 'draft',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();

  // Categories mapping
  const categories = [
    { id: 'marketplace', name: 'Marketplace', subcategories: ['Electronics', 'Fashion', 'Household', 'Hardware', 'Handicrafts'] },
    { id: 'farmers', name: 'Farmers Market', subcategories: ['Vegetables', 'Fruits', 'Dairy', 'Meat', 'Grains'] },
    { id: 'food', name: 'Food & Dining', subcategories: ['Restaurant', 'Cafe', 'Fast Food', 'Catering'] },
    { id: 'stays', name: 'Stays & Accommodation', subcategories: ['Hotel', 'Airbnb', 'Guest House', 'Campsite'] },
    { id: 'boda', name: 'Boda Rides', subcategories: ['Boda', 'Taxi', 'Tuk-tuk', 'Delivery'] },
    { id: 'services', name: 'Services', subcategories: ['Plumbing', 'Electrical', 'Salon', 'Cleaning', 'Repairs'] },
  ];

  const conditions = [
    { value: 'new', label: 'New', description: 'Brand new, unused, unopened' },
    { value: 'like-new', label: 'Like New', description: 'Used but perfect condition' },
    { value: 'good', label: 'Good', description: 'Minor signs of wear, fully functional' },
    { value: 'fair', label: 'Fair', description: 'Visible wear, works properly' },
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validImages = files.filter(file => file.type.startsWith('image/'));
    const newPreviews = validImages.map(file => URL.createObjectURL(file));
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...validImages],
      imagePreviews: [...prev.imagePreviews, ...newPreviews]
    }));
  };

  const removeImage = (index: number) => {
    URL.revokeObjectURL(formData.imagePreviews[index]);
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
      imagePreviews: prev.imagePreviews.filter((_, i) => i !== index)
    }));
  };

  const addTag = () => {
    if (formData.tagInput.trim()) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, prev.tagInput.trim()],
        tagInput: ''
      }));
    }
  };

  const removeTag = (index: number) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index)
    }));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (!formData.name.trim()) newErrors.name = 'Product name is required';
        if (!formData.description.trim()) newErrors.description = 'Description is required';
        if (!formData.category) newErrors.category = 'Category is required';
        if (!formData.subcategory) newErrors.subcategory = 'Subcategory is required';
        break;
      case 2:
        if (formData.price <= 0) newErrors.price = 'Price must be greater than 0';
        if (formData.originalPrice && formData.originalPrice <= formData.price) {
          newErrors.originalPrice = 'Original price should be higher than selling price';
        }
        if (formData.stock < 0) newErrors.stock = 'Stock cannot be negative';
        break;
      case 3:
        if (formData.images.length === 0) newErrors.images = 'At least one image is required';
        break;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => setCurrentStep(prev => prev - 1);

  const buildFormData = (): FormData => {
    const fd = new FormData();
    const serviceCategory = formData.category; // 'marketplace', 'farmers', etc.
  
    // Common required fields
    fd.append('name', formData.name);
    fd.append('description', formData.description);
    fd.append('price', formData.price.toString());
    fd.append('condition', formData.condition);
    fd.append('sellerName', user?.fullName || '');
    fd.append('sellerLocation','Tala');
  
    // Service-specific fields
    if (serviceCategory === 'marketplace') {
      // Map frontend subcategory to lowercase category enum values
      const categoryMap: Record<string, string> = {
        'electronics': 'electronics',
        'fashion': 'fashion',
        'household': 'household',
        'hardware': 'hardware',
        'handicrafts': 'other'   // fallback to 'other'
      };
      const productCategory = categoryMap[formData.subcategory] || 'other';
      
      // Map to a valid subcategory (temporary default; improve later)
      let productSubcategory = '';
      switch (productCategory) {
        case 'electronics':
          productSubcategory = 'phones';
          break;
        case 'fashion':
          productSubcategory = 'mens';
          break;
        case 'household':
          productSubcategory = 'furniture';
          break;
        case 'hardware':
          productSubcategory = 'tools';
          break;
        default:
          productSubcategory = 'other';
      }
      
      fd.append('category', productCategory);
      fd.append('subcategory', productSubcategory);
      
      if (formData.brand) fd.append('brand', formData.brand);
      if (formData.model) fd.append('modelNumber', formData.model);
      if (formData.sku) fd.append('sku', formData.sku);
    } else if (serviceCategory === 'farmers') {
      fd.append('unit', formData.unit || 'piece');
      fd.append('organic', formData.organic ? 'true' : 'false');
    } else if (serviceCategory === 'food') {
      fd.append('cuisine', formData.cuisine || '');
      fd.append('dietary', JSON.stringify(formData.dietary || []));
      fd.append('preparationTime', (formData.preparationTime || 30).toString());
      fd.append('isAvailable', 'true');
    } else if (serviceCategory === 'stays') {
      fd.append('location', formData.location || '');
      fd.append('bedrooms', (formData.bedrooms || 1).toString());
      fd.append('bathrooms', (formData.bathrooms || 1).toString());
      fd.append('maxGuests', (formData.maxGuests || 2).toString());
      fd.append('amenities', JSON.stringify(formData.amenities || []));
    } else if (serviceCategory === 'boda') {
      fd.append('vehicleType', formData.vehicleType || 'boda');
      fd.append('seats', (formData.seats || 1).toString());
    } else if (serviceCategory === 'services') {
      fd.append('serviceType', formData.serviceType || formData.subcategory);
      fd.append('duration', (formData.duration || 60).toString());
      fd.append('locationType', formData.locationType || 'onsite');
    }
  
    // Common optional fields
    if (formData.originalPrice) fd.append('originalPrice', formData.originalPrice.toString());
    if (formData.stock > 0) fd.append('stockQuantity', formData.stock.toString());
    if (formData.isMtush) fd.append('isMtush', 'true');
    if (formData.tags.length > 0) fd.append('tags', formData.tags.join(','));
  
    // Seller metadata (optional)
    fd.append('sellerVerified', 'false');
    fd.append('sellerRating', '0');
    fd.append('sellerTotalSales', '0');
  
    // Images
    formData.images.forEach(img => fd.append('images', img));
  
    return fd;
  };
  const handleSubmit = async () => {
    if (!validateStep(currentStep) || currentStep < 4) {
      if (currentStep < 4) nextStep();
      return;
    }

    setIsSubmitting(true);

    try {
      const fd = buildFormData();
      const category = formData.category;
      let response;

      switch (category) {
        case 'marketplace':
          response = await ProductService.marketplace.create(fd);
          break;
        case 'farmers':
          response = await ProductService.farmers.create(fd);
          break;
        case 'food':
          response = await ProductService.food.create(fd);
          break;
        case 'stays':
          response = await ProductService.stays.create(fd);
          break;
        case 'boda':
          response = await ProductService.boda.create(fd);
          break;
        case 'services':
          response = await ProductService.services.create(fd);
          break;
        default:
          throw new Error('Invalid category');
      }

      console.log('Product created:', response);
      console.log('Submitting with category:', formData.category);
      console.log('Subcategory:', formData.subcategory);
      console.log('User fullName:', user?.fullName);
      alert('Product created successfully!');
      navigate('/dashboard/products');
    } catch (err: any) {
      console.error(err);
      alert('Failed to create product: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const StepIndicator = () => (
    <div className="mb-8">
      <div className="flex items-center justify-between max-w-3xl mx-auto">
        {[1, 2, 3, 4].map(step => (
          <div key={step} className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step < currentStep ? 'bg-green-600 text-white' : step === currentStep ? 'bg-redbull-blue text-white' : 'bg-gray-200 text-gray-600'
              }`}>
              {step < currentStep ? <Check className="w-4 h-4" /> : step}
            </div>
            {step < 4 && <div className={`w-12 h-1 mx-2 ${step < currentStep ? 'bg-green-600' : 'bg-gray-200'}`} />}
          </div>
        ))}
      </div>
      <div className="flex justify-between max-w-3xl mx-auto mt-2 text-xs text-slate-text">
        <span>Basic Info</span><span>Pricing</span><span>Images</span><span>Tags & SEO</span>
      </div>
    </div>
  );

  // Render category-specific additional fields in step 2 (optional)
  const renderCategoryFields = () => {
    const cat = formData.category;
    if (!cat) return null;
    if (cat === 'marketplace') {
      return (
        <div className="bg-sky-50 rounded-lg p-4 mt-4">
          <h3 className="text-sm font-medium text-charcoal mb-3">Additional Product Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-text mb-1 block">Brand</label>
              <input type="text" value={formData.brand || ''} onChange={e => setFormData(prev => ({ ...prev, brand: e.target.value }))} placeholder="e.g., Apple" className="w-full px-3 py-2 border border-sky-200 rounded-lg text-sm" />
            </div>
            <div>
              <label className="text-xs text-slate-text mb-1 block">Model</label>
              <input type="text" value={formData.model || ''} onChange={e => setFormData(prev => ({ ...prev, model: e.target.value }))} placeholder="e.g., A2487" className="w-full px-3 py-2 border border-sky-200 rounded-lg text-sm" />
            </div>
            <div>
              <label className="text-xs text-slate-text mb-1 block">SKU (Optional)</label>
              <input type="text" value={formData.sku || ''} onChange={e => setFormData(prev => ({ ...prev, sku: e.target.value }))} placeholder="Stock keeping unit" className="w-full px-3 py-2 border border-sky-200 rounded-lg text-sm" />
            </div>
          </div>
        </div>
      );
    }
    if (cat === 'farmers') {
      return (
        <div className="bg-sky-50 rounded-lg p-4 mt-4">
          <h3 className="text-sm font-medium text-charcoal mb-3">Produce Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-text mb-1 block">Unit</label>
              <select value={formData.unit || 'piece'} onChange={e => setFormData(prev => ({ ...prev, unit: e.target.value as any }))} className="w-full px-3 py-2 border border-sky-200 rounded-lg text-sm">
                <option value="kg">Kilogram (kg)</option><option value="bunch">Bunch</option><option value="piece">Piece</option><option value="bundle">Bundle</option>
              </select>
            </div>
            <div>
              <label className="flex items-center gap-2 text-xs text-slate-text mt-2"><input type="checkbox" checked={formData.organic || false} onChange={e => setFormData(prev => ({ ...prev, organic: e.target.checked }))} className="rounded" /> Organic Certified</label>
            </div>
          </div>
        </div>
      );
    }
    // Additional categories can be expanded similarly
    return null;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/dashboard/products" className="p-2 rounded-full bg-sky-50 text-slate-text hover:text-redbull-blue hover:bg-sky-100"><ArrowLeft className="w-5 h-5" /></Link>
        <div><h1 className="text-2xl font-display font-bold text-charcoal">Add New Product</h1><p className="text-slate-text mt-1">List your product on the marketplace</p></div>
      </div>
      <StepIndicator />
      <div className="bg-white rounded-xl border border-sky-100 p-6">
        {currentStep === 1 && (
          <div className="space-y-6">
            <h2 className="text-lg font-display font-semibold text-charcoal flex items-center gap-2"><FileText className="w-5 h-5 text-redbull-blue" /> Basic Information</h2>
            <div className="space-y-4">
              <div><label className="text-sm font-medium text-charcoal mb-1 block">Product Name <span className="text-red-500">*</span></label><input type="text" value={formData.name} onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))} placeholder="e.g., iPhone 13 Pro Max" className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.name ? 'border-red-300' : 'border-sky-200 focus:border-redbull-blue'}`} />{errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}</div>
              <div><label className="text-sm font-medium text-charcoal mb-1 block">Description <span className="text-red-500">*</span></label><textarea value={formData.description} onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))} rows={4} placeholder="Describe your product..." className={`w-full px-4 py-2 border rounded-lg ${errors.description ? 'border-red-300' : 'border-sky-200'}`} />{errors.description && <p className="text-xs text-red-600 mt-1">{errors.description}</p>}</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label className="text-sm font-medium text-charcoal mb-1 block">Category <span className="text-red-500">*</span></label><select value={formData.category} onChange={e => { setFormData(prev => ({ ...prev, category: e.target.value, subcategory: '' })); }} className={`w-full px-4 py-2 border rounded-lg ${errors.category ? 'border-red-300' : 'border-sky-200'}`}><option value="">Select category</option>{categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}</select>{errors.category && <p className="text-xs text-red-600 mt-1">{errors.category}</p>}</div>
                <div><label className="text-sm font-medium text-charcoal mb-1 block">Subcategory <span className="text-red-500">*</span></label><select value={formData.subcategory} onChange={e => setFormData(prev => ({ ...prev, subcategory: e.target.value }))} disabled={!formData.category} className={`w-full px-4 py-2 border rounded-lg ${errors.subcategory ? 'border-red-300' : 'border-sky-200'} ${!formData.category ? 'bg-gray-100' : ''}`}><option value="">Select subcategory</option>{formData.category && categories.find(c => c.id === formData.category)?.subcategories.map(sub => <option key={sub} value={sub.toLowerCase()}>{sub}</option>)}</select>{errors.subcategory && <p className="text-xs text-red-600 mt-1">{errors.subcategory}</p>}</div>
              </div>
              <div><label className="text-sm font-medium text-charcoal mb-2 block">Condition <span className="text-red-500">*</span></label><div className="grid grid-cols-2 sm:grid-cols-4 gap-2">{conditions.map(c => <button key={c.value} type="button" onClick={() => setFormData(prev => ({ ...prev, condition: c.value as ProductCondition }))} className={`p-3 rounded-lg border text-left transition-colors ${formData.condition === c.value ? 'border-redbull-blue bg-redbull-blue/5' : 'border-sky-200 hover:border-redbull-blue/50'}`}><p className="text-sm font-medium text-charcoal">{c.label}</p><p className="text-xs text-slate-text mt-1">{c.description}</p></button>)}</div></div>
              <div className="bg-amber-50 rounded-lg p-4"><label className="flex items-start gap-3 cursor-pointer"><input type="checkbox" checked={formData.isMtush} onChange={e => setFormData(prev => ({ ...prev, isMtush: e.target.checked }))} className="mt-1 rounded text-amber-600 focus:ring-amber-500" /><div><span className="text-sm font-medium text-charcoal flex items-center gap-1">List as "Think Twice" (Mtush) <Sparkles className="w-4 h-4 text-amber-600" /></span><p className="text-xs text-slate-text mt-1">For pre-owned or second-hand items. These get a special badge and appear in the Mtush section.</p></div></label></div>
            </div>
          </div>
        )}
        {currentStep === 2 && (
          <div className="space-y-6">
            <h2 className="text-lg font-display font-semibold text-charcoal flex items-center gap-2"><DollarSign className="w-5 h-5 text-redbull-blue" /> Pricing & Inventory</h2>
            <div className="space-y-4">
              <div><label className="text-sm font-medium text-charcoal mb-1 block">Selling Price (KSh) <span className="text-red-500">*</span></label><div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-text">KSh</span><input type="number" value={formData.price || ''} onChange={e => setFormData(prev => ({ ...prev, price: Number(e.target.value) }))} min="0" className={`w-full pl-12 pr-4 py-2 border rounded-lg ${errors.price ? 'border-red-300' : 'border-sky-200'}`} /></div>{errors.price && <p className="text-xs text-red-600 mt-1">{errors.price}</p>}</div>
              <div><label className="text-sm font-medium text-charcoal mb-1 block">Original Price (Optional)</label><div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-text">KSh</span><input type="number" value={formData.originalPrice || ''} onChange={e => setFormData(prev => ({ ...prev, originalPrice: Number(e.target.value) || undefined }))} min="0" className="w-full pl-12 pr-4 py-2 border border-sky-200 rounded-lg" /></div>{errors.originalPrice && <p className="text-xs text-red-600 mt-1">{errors.originalPrice}</p>}{formData.originalPrice && formData.originalPrice > formData.price && <p className="text-xs text-green-600 mt-1">Discount: {Math.round(((formData.originalPrice - formData.price) / formData.originalPrice) * 100)}% off</p>}</div>
              <div><label className="text-sm font-medium text-charcoal mb-1 block">Stock Quantity <span className="text-red-500">*</span></label><input type="number" value={formData.stock} onChange={e => setFormData(prev => ({ ...prev, stock: Math.max(0, Number(e.target.value)) }))} min="0" className={`w-full px-4 py-2 border rounded-lg ${errors.stock ? 'border-red-300' : 'border-sky-200'}`} />{errors.stock && <p className="text-xs text-red-600 mt-1">{errors.stock}</p>}</div>
              {renderCategoryFields()}
            </div>
          </div>
        )}
        {currentStep === 3 && (
          <div className="space-y-6">
            <h2 className="text-lg font-display font-semibold text-charcoal flex items-center gap-2"><ImageIcon className="w-5 h-5 text-redbull-blue" /> Product Images</h2>
            <div><label className="text-sm font-medium text-charcoal mb-2 block">Upload Images <span className="text-red-500">*</span></label><div className="border-2 border-dashed border-sky-200 rounded-xl p-6 text-center hover:border-redbull-blue"><input type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" id="image-upload" /><label htmlFor="image-upload" className="cursor-pointer"><Upload className="w-8 h-8 text-slate-text/40 mx-auto mb-2" /><p className="text-sm text-charcoal font-medium">Click to upload images</p><p className="text-xs text-slate-text mt-1">PNG, JPG up to 10MB each</p></label></div>{errors.images && <p className="text-xs text-red-600 mt-2">{errors.images}</p>}</div>
            {formData.imagePreviews.length > 0 && <div className="mt-4"><p className="text-sm font-medium text-charcoal mb-2">Uploaded Images ({formData.imagePreviews.length})</p><div className="grid grid-cols-2 sm:grid-cols-4 gap-3">{formData.imagePreviews.map((preview, index) => <div key={index} className="relative group"><img src={preview} alt={`Preview ${index + 1}`} className="w-full h-24 object-cover rounded-lg border border-sky-200" /><button onClick={() => removeImage(index)} className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100"><X className="w-3 h-3" /></button></div>)}</div></div>}
            <p className="text-xs text-slate-text/70 flex items-start gap-1"><Info className="w-3 h-3 mt-0.5" /><span>First image will be the main product photo. High-quality images increase sales by up to 30%.</span></p>
          </div>
        )}
        {currentStep === 4 && (
          <div className="space-y-6">
            <h2 className="text-lg font-display font-semibold text-charcoal flex items-center gap-2"><Tag className="w-5 h-5 text-redbull-blue" /> Tags & SEO</h2>
            <div><label className="text-sm font-medium text-charcoal mb-1 flex items-center gap-1">Product Tags <Sparkles className="w-4 h-4 text-amber-600" /></label><p className="text-xs text-slate-text/70 mb-2">Tags help customers find your product in search.</p><div className="flex gap-2"><input type="text" value={formData.tagInput} onChange={e => setFormData(prev => ({ ...prev, tagInput: e.target.value }))} onKeyDown={handleKeyDown} placeholder="e.g., wireless, bluetooth" className="flex-1 px-4 py-2 border border-sky-200 rounded-lg" /><button onClick={addTag} className="px-4 py-2 bg-redbull-blue text-white rounded-lg flex items-center gap-1"><Plus className="w-4 h-4" />Add</button></div>{formData.tags.length > 0 && <div className="flex flex-wrap gap-2 mt-3">{formData.tags.map((tag, index) => <span key={index} className="bg-sky-100 text-charcoal px-3 py-1 rounded-full text-sm flex items-center gap-1">#{tag}<button onClick={() => removeTag(index)} className="hover:text-red-600"><X className="w-3 h-3" /></button></span>)}</div>}<p className="text-xs text-slate-text/70 mt-2">💡 Products with 5+ tags get 40% more visibility.</p></div>
            <div className="bg-sky-50 rounded-lg p-4"><h3 className="text-sm font-medium text-charcoal mb-2">Search Preview</h3><div className="bg-white rounded-lg p-3 border border-sky-200"><p className="text-sm text-redbull-blue font-medium truncate">{formData.name || 'Product Name'} - E-TALA Marketplace</p><p className="text-xs text-green-700 mt-1">{window.location.origin}/marketplace/product/...</p><p className="text-xs text-slate-text mt-1 line-clamp-2">{formData.description || 'Product description will appear here...'}</p></div></div>
            <div className="border-t border-sky-100 pt-4"><label className="flex items-center gap-2 mb-2"><input type="radio" checked={formData.status === 'active'} onChange={() => setFormData(prev => ({ ...prev, status: 'active' }))} className="text-redbull-blue" /><span className="text-sm text-charcoal">Publish immediately (active)</span></label><label className="flex items-center gap-2"><input type="radio" checked={formData.status === 'draft'} onChange={() => setFormData(prev => ({ ...prev, status: 'draft' }))} className="text-redbull-blue" /><span className="text-sm text-charcoal">Save as draft</span></label></div>
          </div>
        )}
        <div className="flex justify-between mt-8 pt-6 border-t border-sky-100">
          {currentStep > 1 ? <button onClick={prevStep} className="px-6 py-2 border border-sky-200 text-slate-text rounded-lg hover:bg-sky-50 flex items-center gap-2"><ChevronLeft className="w-4 h-4" />Back</button> : <div />}
          {currentStep < 4 ? <button onClick={nextStep} className="px-6 py-2 bg-redbull-blue text-white rounded-lg hover:bg-redbull-blue/90 flex items-center gap-2">Continue<ChevronRight className="w-4 h-4" /></button> : <button onClick={handleSubmit} disabled={isSubmitting} className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2 disabled:opacity-50">{isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}{formData.status === 'active' ? 'Publish Product' : 'Save Draft'}</button>}
        </div>
      </div>
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4"><div className="flex items-start gap-3"><Info className="w-5 h-5 text-amber-600 mt-0.5" /><div><h3 className="text-sm font-medium text-charcoal mb-1">Pro Tips for Better Listings:</h3><ul className="text-xs text-slate-text space-y-1 list-disc list-inside"><li>Use high-quality photos showing the product from different angles</li><li>Be honest about condition - it builds trust with buyers</li><li>Add 5-10 relevant tags to improve search visibility</li><li>Include measurements or specifications when applicable</li><li>Set a competitive price - check similar listings in the marketplace</li></ul></div></div></div>
    </div>
  );
};

export default ProductNewPage;