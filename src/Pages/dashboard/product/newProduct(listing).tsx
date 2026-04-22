// pages/dashboard/products/new.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import {
  ArrowLeft, Check, X, Upload, Plus, Tag, DollarSign, FileText,
  Image as ImageIcon, Info, Sparkles, ChevronRight, ChevronLeft,
  Save, Loader2, AlertCircle
} from 'lucide-react';
import { ProductService } from '../../../services/products/product.service';
import { useAuth } from '../../../contexts/auth/auth';
import MarketplaceFields from '../../../components/forms/Marketplace.FormFields';
import { SellerApplicationService } from '../../../services/Auth/seller-applications.service';
import FarmersFields from '../../../components/forms/farmers.FormFields';
// Import other field components as they are created
// import FoodFields from './forms/FoodFields';
// import StaysFields from './forms/StaysFields';
// import BodaFields from './forms/BodaFields';
// import ServicesFields from './forms/ServicesFields';

type ProductCondition = 'new' | 'like-new' | 'good' | 'fair';
type ProductStatus = 'active' | 'draft';

interface CommonFormData {
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  stock: number;
  condition: ProductCondition;
  images: File[];
  imagePreviews: string[];
  tags: string[];
  tagInput: string;
  isMtush: boolean;
  status: ProductStatus;
}

// Registry of category field components
const fieldComponents: Record<string, React.ComponentType<any>> = {
  marketplace: MarketplaceFields,
  farmers: FarmersFields,
  // food: FoodFields,
  // stays: StaysFields,
  // boda: BodaFields,
  // services: ServicesFields,
};

// Registry of buildFormData functions
const buildFormDataFunctions: Record<string, (common: CommonFormData, extra: any, user: any) => FormData> = {
  marketplace: (common, extra, user) => {
    const fd = new FormData();
    fd.append('name', common.name);
    fd.append('description', common.description);
    fd.append('price', common.price.toString());
    fd.append('condition', common.condition);
    fd.append('sellerName', user?.fullName || '');
    fd.append('sellerLocation', 'Tala');
    fd.append('category', 'marketplace');
    fd.append('subcategory', extra.subcategory || 'other');
    if (extra.brand) fd.append('brand', extra.brand);
    if (extra.model) fd.append('modelNumber', extra.model);
    if (extra.sku) fd.append('sku', extra.sku);
    if (common.originalPrice) fd.append('originalPrice', common.originalPrice.toString());
    if (common.stock > 0) fd.append('stockQuantity', common.stock.toString());
    if (common.isMtush) fd.append('isMtush', 'true');
    if (common.tags.length) fd.append('tags', common.tags.join(','));
    fd.append('sellerVerified', 'false');
    fd.append('sellerRating', '0');
    fd.append('sellerTotalSales', '0');
    common.images.forEach(img => fd.append('images', img));
    return fd;
  },
  farmers: (common, extra, user) => {
    const fd = new FormData();
    fd.append('name', common.name);
    fd.append('description', common.description);
    fd.append('price', common.price.toString());
    fd.append('subcategory', extra.subcategory);
    fd.append('unit', extra.unit);
    fd.append('farmLocation', extra.farmLocation);
    fd.append('availableQuantity', extra.availableQuantity.toString());
    fd.append('sellerName', user?.fullName || '');
    fd.append('sellerLocation', 'Tala');

    if (common.originalPrice) fd.append('originalPrice', common.originalPrice.toString());
    if (extra.minOrderQuantity) fd.append('minOrderQuantity', extra.minOrderQuantity.toString());
    if (extra.harvestDate) fd.append('harvestDate', extra.harvestDate);
    if (extra.expiryDate) fd.append('expiryDate', extra.expiryDate);
    fd.append('isOrganic', extra.isOrganic ? 'true' : 'false');
    fd.append('isCertified', extra.isCertified ? 'true' : 'false');
    if (common.tags.length) fd.append('tags', common.tags.join(','));
    if (common.images.length) common.images.forEach(img => fd.append('images', img));
    return fd;
  },
  // other categories will be added similarly
};

const ProductNewPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || '';
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [common, setCommon] = useState<CommonFormData>({
    name: '',
    description: '',
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
  const [extraData, setExtraData] = useState<any>({
    subcategory: '',
    unit: '',
    isOrganic: false,
    isCertified: false,
    farmLocation: '',
    harvestDate: '',
    expiryDate: '',
    minOrderQuantity: 1,
    availableQuantity: 0,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const checkAuthorization = async () => {
      if (!categoryParam) {
        navigate('/dashboard/seller-start');
        return;
      }
      try {
        const apps = await SellerApplicationService.getMyApplications();
        const approved = apps.filter(app => app.status === 'approved' && app.category === categoryParam);
        setIsAuthorized(approved.length > 0);
      } catch {
        setIsAuthorized(false);
      }
    };
    checkAuthorization();
  }, [categoryParam, navigate]);

  if (isAuthorized === false) {
    return (
      <div className="max-w-2xl mx-auto py-12 text-center">
        <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h2 className="text-xl font-display font-bold text-charcoal mb-2">Access Denied</h2>
        <p className="text-slate-text mb-6">You are not approved to sell in the "{categoryParam}" category.</p>
        <Link to="/dashboard/seller-start" className="text-sky-600 hover:underline">Go back to seller start</Link>
      </div>
    );
  }
  if (isAuthorized === null) return <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-sky-500" /></div>;

  const FieldComponent = fieldComponents[categoryParam];
  const buildFormData = buildFormDataFunctions[categoryParam];

  const conditions = [
    { value: 'new', label: 'New', description: 'Brand new, unused, unopened' },
    { value: 'like-new', label: 'Like New', description: 'Used but perfect condition' },
    { value: 'good', label: 'Good', description: 'Minor signs of wear, fully functional' },
    { value: 'fair', label: 'Fair', description: 'Visible wear, works properly' },
  ];

  const isMarketplace = categoryParam === 'marketplace';
  const isFarmers = categoryParam === 'farmers';

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validImages = files.filter(file => file.type.startsWith('image/'));
    const newPreviews = validImages.map(file => URL.createObjectURL(file));
    setCommon(prev => ({
      ...prev,
      images: [...prev.images, ...validImages],
      imagePreviews: [...prev.imagePreviews, ...newPreviews],
    }));
  };

  const removeImage = (index: number) => {
    URL.revokeObjectURL(common.imagePreviews[index]);
    setCommon(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
      imagePreviews: prev.imagePreviews.filter((_, i) => i !== index),
    }));
  };

  const addTag = () => {
    if (common.tagInput.trim()) {
      setCommon(prev => ({
        ...prev,
        tags: [...prev.tags, prev.tagInput.trim()],
        tagInput: '',
      }));
    }
  };

  const removeTag = (idx: number) => {
    setCommon(prev => ({ ...prev, tags: prev.tags.filter((_, i) => i !== idx) }));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};
    if (step === 1) {
      if (!common.name.trim()) newErrors.name = 'Product name is required';
      if (!common.description.trim()) newErrors.description = 'Description is required';
    } else if (step === 2) {
      if (common.price <= 0) newErrors.price = 'Price must be greater than 0';
      if (common.originalPrice && common.originalPrice <= common.price) {
        newErrors.originalPrice = 'Original price should be higher than selling price';
      }
      if (common.stock < 0) newErrors.stock = 'Stock cannot be negative';
      // For farmers, additional fields are validated inside FarmersFields component,
      // but we don't duplicate here to keep it simple. The backend will catch missing fields.
    } else if (step === 3) {
      if (common.images.length === 0) newErrors.images = 'At least one image is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => { if (validateStep(currentStep)) setCurrentStep(prev => prev + 1); };
  const prevStep = () => setCurrentStep(prev => prev - 1);

  const handleSubmit = async () => {
    if (!validateStep(currentStep) || currentStep < 4) {
      if (currentStep < 4) nextStep();
      return;
    }
    setIsSubmitting(true);
    try {
      const fd = buildFormData(common, extraData, user);
      switch (categoryParam) {
        case 'marketplace':
          await ProductService.marketplace.create(fd);
          break;
        case 'farmers':
          await ProductService.farmers.create(fd);
          break;
        // other cases when implemented
        default:
          throw new Error('Unsupported category');
      }
      alert('Product created successfully!');
      navigate('/dashboard/products');
    } catch (err: any) {
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
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step < currentStep ? 'bg-green-600 text-white' : step === currentStep ? 'bg-redbull-blue text-white' : 'bg-gray-200 text-gray-600'}`}>
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

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/dashboard/products" className="p-2 rounded-full bg-sky-50 text-slate-text hover:text-redbull-blue hover:bg-sky-100">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-display font-bold text-charcoal">Add New Product</h1>
          <p className="text-slate-text mt-1">Listing in: <span className="font-medium text-redbull-blue">{categoryParam}</span></p>
        </div>
      </div>
      <StepIndicator />
      <div className="bg-white rounded-xl border border-sky-100 p-6">
        {currentStep === 1 && (
          <div className="space-y-6">
            <h2 className="text-lg font-display font-semibold text-charcoal flex items-center gap-2">
              <FileText className="w-5 h-5 text-redbull-blue" /> Basic Information
            </h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-charcoal mb-1 block">Product Name <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  value={common.name}
                  onChange={e => setCommon({ ...common, name: e.target.value })}
                  placeholder={isFarmers ? "e.g., Fresh Tomatoes, Organic Kales" : "e.g., iPhone 13 Pro Max"}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.name ? 'border-red-300' : 'border-sky-200 focus:border-redbull-blue'}`}
                />
                {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className="text-sm font-medium text-charcoal mb-1 block">Description <span className="text-red-500">*</span></label>
                <textarea
                  value={common.description}
                  onChange={e => setCommon({ ...common, description: e.target.value })}
                  rows={4}
                  placeholder={isFarmers ? "Describe your produce, e.g., freshly harvested, organic, etc." : "Describe your product..."}
                  className={`w-full px-4 py-2 border rounded-lg ${errors.description ? 'border-red-300' : 'border-sky-200'}`}
                />
                {errors.description && <p className="text-xs text-red-600 mt-1">{errors.description}</p>}
              </div>

              {/* Condition – only for marketplace */}
              {isMarketplace && (
                <div>
                  <label className="text-sm font-medium text-charcoal mb-2 block">Condition <span className="text-red-500">*</span></label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {conditions.map(c => (
                      <button
                        key={c.value}
                        type="button"
                        onClick={() => setCommon({ ...common, condition: c.value as ProductCondition })}
                        className={`p-3 rounded-lg border text-left transition-colors ${common.condition === c.value ? 'border-redbull-blue bg-redbull-blue/5' : 'border-sky-200 hover:border-redbull-blue/50'}`}
                      >
                        <p className="text-sm font-medium text-charcoal">{c.label}</p>
                        <p className="text-xs text-slate-text mt-1">{c.description}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Mtush checkbox – only for marketplace */}
              {isMarketplace && (
                <div className="bg-amber-50 rounded-lg p-4">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={common.isMtush}
                      onChange={e => setCommon({ ...common, isMtush: e.target.checked })}
                      className="mt-1 rounded text-amber-600 focus:ring-amber-500"
                    />
                    <div>
                      <span className="text-sm font-medium text-charcoal flex items-center gap-1">
                        List as "Think Twice" (Mtush) <Sparkles className="w-4 h-4 text-amber-600" />
                      </span>
                      <p className="text-xs text-slate-text mt-1">
                        For pre-owned or second-hand items. These get a special badge and appear in the Mtush section.
                      </p>
                    </div>
                  </label>
                </div>
              )}
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-6">
            <h2 className="text-lg font-display font-semibold text-charcoal flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-redbull-blue" /> Pricing & Inventory
            </h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-charcoal mb-1 block">Selling Price (KSh) <span className="text-red-500">*</span></label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-text">KSh</span>
                  <input
                    type="number"
                    value={common.price || ''}
                    onChange={e => setCommon({ ...common, price: Number(e.target.value) })}
                    min="0"
                    className={`w-full pl-12 pr-4 py-2 border rounded-lg ${errors.price ? 'border-red-300' : 'border-sky-200'}`}
                  />
                </div>
                {errors.price && <p className="text-xs text-red-600 mt-1">{errors.price}</p>}
              </div>
              <div>
                <label className="text-sm font-medium text-charcoal mb-1 block">Original Price (Optional)</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-text">KSh</span>
                  <input
                    type="number"
                    value={common.originalPrice || ''}
                    onChange={e => setCommon({ ...common, originalPrice: Number(e.target.value) || undefined })}
                    min="0"
                    className="w-full pl-12 pr-4 py-2 border border-sky-200 rounded-lg"
                  />
                </div>
                {errors.originalPrice && <p className="text-xs text-red-600 mt-1">{errors.originalPrice}</p>}
                {common.originalPrice && common.originalPrice > common.price && (
                  <p className="text-xs text-green-600 mt-1">Discount: {Math.round(((common.originalPrice - common.price) / common.originalPrice) * 100)}% off</p>
                )}
              </div>
              <div>
                <label className="text-sm font-medium text-charcoal mb-1 block">Stock Quantity <span className="text-red-500">*</span></label>
                <input
                  type="number"
                  value={common.stock}
                  onChange={e => setCommon({ ...common, stock: Math.max(0, Number(e.target.value)) })}
                  min="0"
                  className={`w-full px-4 py-2 border rounded-lg ${errors.stock ? 'border-red-300' : 'border-sky-200'}`}
                />
                {errors.stock && <p className="text-xs text-red-600 mt-1">{errors.stock}</p>}
              </div>
              {FieldComponent && <FieldComponent data={extraData} onChange={(updates: any) => setExtraData((prev: any) => ({ ...prev, ...updates }))} />}
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-6">
            <h2 className="text-lg font-display font-semibold text-charcoal flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-redbull-blue" /> Product Images
            </h2>
            <div>
              <label className="text-sm font-medium text-charcoal mb-2 block">Upload Images <span className="text-red-500">*</span></label>
              <div className="border-2 border-dashed border-sky-200 rounded-xl p-6 text-center hover:border-redbull-blue">
                <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" id="image-upload" />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <Upload className="w-8 h-8 text-slate-text/40 mx-auto mb-2" />
                  <p className="text-sm text-charcoal font-medium">Click to upload images</p>
                  <p className="text-xs text-slate-text mt-1">PNG, JPG up to 10MB each</p>
                </label>
              </div>
              {errors.images && <p className="text-xs text-red-600 mt-2">{errors.images}</p>}
            </div>
            {common.imagePreviews.length > 0 && (
              <div className="mt-4">
                <p className="text-sm font-medium text-charcoal mb-2">Uploaded Images ({common.imagePreviews.length})</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {common.imagePreviews.map((preview, index) => (
                    <div key={index} className="relative group">
                      <img src={preview} alt={`Preview ${index + 1}`} className="w-full h-24 object-cover rounded-lg border border-sky-200" />
                      <button onClick={() => removeImage(index)} className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <p className="text-xs text-slate-text/70 flex items-start gap-1">
              <Info className="w-3 h-3 mt-0.5" />
              <span>First image will be the main product photo. High-quality images increase sales by up to 30%.</span>
            </p>
          </div>
        )}

        {currentStep === 4 && (
          <div className="space-y-6">
            <h2 className="text-lg font-display font-semibold text-charcoal flex items-center gap-2">
              <Tag className="w-5 h-5 text-redbull-blue" /> Tags & SEO
            </h2>
            <div>
              <label className="text-sm font-medium text-charcoal mb-1 flex items-center gap-1">Product Tags <Sparkles className="w-4 h-4 text-amber-600" /></label>
              <p className="text-xs text-slate-text/70 mb-2">Tags help customers find your product in search.</p>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={common.tagInput}
                  onChange={e => setCommon({ ...common, tagInput: e.target.value })}
                  onKeyDown={handleKeyDown}
                  placeholder="e.g., wireless, bluetooth"
                  className="flex-1 px-4 py-2 border border-sky-200 rounded-lg"
                />
                <button onClick={addTag} className="px-4 py-2 bg-redbull-blue text-white rounded-lg flex items-center gap-1">
                  <Plus className="w-4 h-4" /> Add
                </button>
              </div>
              {common.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {common.tags.map((tag, idx) => (
                    <span key={idx} className="bg-sky-100 text-charcoal px-3 py-1 rounded-full text-sm flex items-center gap-1">
                      #{tag}
                      <button onClick={() => removeTag(idx)} className="hover:text-red-600"><X className="w-3 h-3" /></button>
                    </span>
                  ))}
                </div>
              )}
              <p className="text-xs text-slate-text/70 mt-2">💡 Products with 5+ tags get 40% more visibility.</p>
            </div>
            <div className="bg-sky-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-charcoal mb-2">Search Preview</h3>
              <div className="bg-white rounded-lg p-3 border border-sky-200">
                <p className="text-sm text-redbull-blue font-medium truncate">{common.name || 'Product Name'} - E-TALA Marketplace</p>
                <p className="text-xs text-green-700 mt-1">{window.location.origin}/marketplace/product/...</p>
                <p className="text-xs text-slate-text mt-1 line-clamp-2">{common.description || 'Product description will appear here...'}</p>
              </div>
            </div>
            <div className="border-t border-sky-100 pt-4">
              <label className="flex items-center gap-2 mb-2">
                <input
                  type="radio"
                  checked={common.status === 'active'}
                  onChange={() => setCommon({ ...common, status: 'active' })}
                  className="text-redbull-blue"
                />
                <span className="text-sm text-charcoal">Publish immediately (active)</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={common.status === 'draft'}
                  onChange={() => setCommon({ ...common, status: 'draft' })}
                  className="text-redbull-blue"
                />
                <span className="text-sm text-charcoal">Save as draft</span>
              </label>
            </div>
          </div>
        )}

        <div className="flex justify-between mt-8 pt-6 border-t border-sky-100">
          {currentStep > 1 && (
            <button onClick={prevStep} className="px-6 py-2 border border-sky-200 text-slate-text rounded-lg hover:bg-sky-50 flex items-center gap-2">
              <ChevronLeft className="w-4 h-4" /> Back
            </button>
          )}
          <div />
          {currentStep < 4 ? (
            <button onClick={nextStep} className="px-6 py-2 bg-redbull-blue text-white rounded-lg hover:bg-redbull-blue/90 flex items-center gap-2">
              Continue <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button onClick={handleSubmit} disabled={isSubmitting} className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2 disabled:opacity-50">
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              {common.status === 'active' ? 'Publish Product' : 'Save Draft'}
            </button>
          )}
        </div>
      </div>
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-amber-600 mt-0.5" />
          <div>
            <h3 className="text-sm font-medium text-charcoal mb-1">Pro Tips for Better Listings:</h3>
            <ul className="text-xs text-slate-text space-y-1 list-disc list-inside">
              <li>Use high-quality photos showing the product from different angles</li>
              <li>Be honest about condition - it builds trust with buyers</li>
              <li>Add 5-10 relevant tags to improve search visibility</li>
              <li>Include measurements or specifications when applicable</li>
              <li>Set a competitive price - check similar listings in the marketplace</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductNewPage;