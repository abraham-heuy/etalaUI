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
  AlertCircle,
  Info,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Save
} from 'lucide-react';

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
  
  // Additional
  brand?: string;
  model?: string;
  sku?: string;
  weight?: number;
  dimensions?: string;
  colors?: string[];
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

  // Mock categories (replace with your actual categories)
  const categories = [
    { id: 'electronics', name: 'Electronics', subcategories: ['Phones', 'Laptops', 'Audio', 'Accessories'] },
    { id: 'fashion', name: 'Fashion', subcategories: ['Men', 'Women', 'Kids', 'Shoes'] },
    { id: 'household', name: 'Household', subcategories: ['Furniture', 'Kitchen', 'Decor', 'Appliances'] },
    { id: 'hardware', name: 'Hardware', subcategories: ['Tools', 'Building', 'Electrical', 'Plumbing'] },
    { id: 'farmers', name: 'Farmers Market', subcategories: ['Vegetables', 'Fruits', 'Dairy', 'Meat'] },
    { id: 'handicrafts', name: 'Handicrafts', subcategories: ['Beaded', 'Wooden', 'Fabrics', 'Ceramics'] },
  ];

  const conditions = [
    { value: 'new', label: 'New', description: 'Brand new, unused, unopened' },
    { value: 'like-new', label: 'Like New', description: 'Used but perfect condition' },
    { value: 'good', label: 'Good', description: 'Minor signs of wear, fully functional' },
    { value: 'fair', label: 'Fair', description: 'Visible wear, works properly' },
  ];

  // Handle image upload
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

  // Handle tags
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

  // Validation
  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1: // Basic Info
        if (!formData.name.trim()) newErrors.name = 'Product name is required';
        if (!formData.description.trim()) newErrors.description = 'Description is required';
        if (!formData.category) newErrors.category = 'Category is required';
        if (!formData.subcategory) newErrors.subcategory = 'Subcategory is required';
        break;

      case 2: // Pricing & Inventory
        if (formData.price <= 0) newErrors.price = 'Price must be greater than 0';
        if (formData.originalPrice && formData.originalPrice <= formData.price) {
          newErrors.originalPrice = 'Original price should be higher than selling price';
        }
        if (formData.stock < 0) newErrors.stock = 'Stock cannot be negative';
        break;

      case 3: // Images
        if (formData.images.length === 0) newErrors.images = 'At least one image is required';
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  // Submit form
  const handleSubmit = async () => {
    if (!validateStep(currentStep) || currentStep < 4) {
      // If not on last step or validation fails, go to next/fix errors
      if (currentStep < 4) {
        nextStep();
      }
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      // Here you would send the data to your backend
      console.log('Product data:', {
        name: formData.name,
        description: formData.description,
        price: formData.price,
        originalPrice: formData.originalPrice,
        category: formData.category,
        subcategory: formData.subcategory,
        condition: formData.condition,
        stock: formData.stock,
        tags: formData.tags,
        isMtush: formData.isMtush,
        status: formData.status,
        // images would be uploaded via FormData
      });

      setIsSubmitting(false);
      
      // Show success message and redirect
      alert('Product created successfully!');
      navigate('/dashboard/products');
    }, 1500);
  };

  const StepIndicator = () => (
    <div className="mb-8">
      <div className="flex items-center justify-between max-w-3xl mx-auto">
        {[1, 2, 3, 4].map((step) => (
          <div key={step} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step < currentStep
                  ? 'bg-green-600 text-white'
                  : step === currentStep
                  ? 'bg-redbull-blue text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}
            >
              {step < currentStep ? <Check className="w-4 h-4" /> : step}
            </div>
            {step < 4 && (
              <div className={`w-12 h-1 mx-2 ${
                step < currentStep ? 'bg-green-600' : 'bg-gray-200'
              }`} />
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-between max-w-3xl mx-auto mt-2 text-xs text-slate-text">
        <span>Basic Info</span>
        <span>Pricing</span>
        <span>Images</span>
        <span>Tags & SEO</span>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          to="/dashboard/products"
          className="p-2 rounded-full bg-sky-50 text-slate-text hover:text-redbull-blue hover:bg-sky-100 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-charcoal">
            Add New Product
          </h1>
          <p className="text-slate-text mt-1">
            List your product on the marketplace
          </p>
        </div>
      </div>

      <StepIndicator />

      {/* Form */}
      <div className="bg-white rounded-xl border border-sky-100 p-6">
        {/* Step 1: Basic Info */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <h2 className="text-lg font-display font-semibold text-charcoal flex items-center gap-2">
              <FileText className="w-5 h-5 text-redbull-blue" />
              Basic Information
            </h2>

            <div className="space-y-4">
              {/* Product Name */}
              <div>
                <label className="text-sm font-medium text-charcoal mb-1 block">
                  Product Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g., iPhone 13 Pro Max"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.name
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                      : 'border-sky-200 focus:border-redbull-blue focus:ring-redbull-blue/20'
                  }`}
                />
                {errors.name && (
                  <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="text-sm font-medium text-charcoal mb-1 block">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={4}
                  placeholder="Describe your product in detail..."
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.description
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                      : 'border-sky-200 focus:border-redbull-blue focus:ring-redbull-blue/20'
                  }`}
                />
                {errors.description && (
                  <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.description}
                  </p>
                )}
                <p className="text-xs text-slate-text/70 mt-1">
                  Good descriptions help customers make informed decisions.
                </p>
              </div>

              {/* Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-charcoal mb-1 block">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => {
                      setFormData(prev => ({ ...prev, category: e.target.value, subcategory: '' }));
                    }}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.category
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                        : 'border-sky-200 focus:border-redbull-blue focus:ring-redbull-blue/20'
                    }`}
                  >
                    <option value="">Select category</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                  {errors.category && (
                    <p className="text-xs text-red-600 mt-1">{errors.category}</p>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium text-charcoal mb-1 block">
                    Subcategory <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.subcategory}
                    onChange={(e) => setFormData(prev => ({ ...prev, subcategory: e.target.value }))}
                    disabled={!formData.category}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.subcategory
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                        : 'border-sky-200 focus:border-redbull-blue focus:ring-redbull-blue/20'
                    } ${!formData.category ? 'bg-gray-100' : ''}`}
                  >
                    <option value="">Select subcategory</option>
                    {formData.category && categories
                      .find(c => c.id === formData.category)
                      ?.subcategories.map(sub => (
                        <option key={sub} value={sub.toLowerCase()}>{sub}</option>
                      ))}
                  </select>
                  {errors.subcategory && (
                    <p className="text-xs text-red-600 mt-1">{errors.subcategory}</p>
                  )}
                </div>
              </div>

              {/* Condition */}
              <div>
                <label className="text-sm font-medium text-charcoal mb-2 block">
                  Condition <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {conditions.map((c) => (
                    <button
                      key={c.value}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, condition: c.value as ProductCondition }))}
                      className={`p-3 rounded-lg border text-left transition-colors ${
                        formData.condition === c.value
                          ? 'border-redbull-blue bg-redbull-blue/5'
                          : 'border-sky-200 hover:border-redbull-blue/50'
                      }`}
                    >
                      <p className="text-sm font-medium text-charcoal">{c.label}</p>
                      <p className="text-xs text-slate-text mt-1">{c.description}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Mtush Option */}
              <div className="bg-amber-50 rounded-lg p-4">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isMtush}
                    onChange={(e) => setFormData(prev => ({ ...prev, isMtush: e.target.checked }))}
                    className="mt-1 rounded text-amber-600 focus:ring-amber-500"
                  />
                  <div>
                    <span className="text-sm font-medium text-charcoal flex items-center gap-1">
                      List as "Think Twice" (Mtush) 
                      <Sparkles className="w-4 h-4 text-amber-600" />
                    </span>
                    <p className="text-xs text-slate-text mt-1">
                      For pre-owned or second-hand items. These get a special badge and appear in the Mtush section.
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Pricing & Inventory */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <h2 className="text-lg font-display font-semibold text-charcoal flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-redbull-blue" />
              Pricing & Inventory
            </h2>

            <div className="space-y-4">
              {/* Price */}
              <div>
                <label className="text-sm font-medium text-charcoal mb-1 block">
                  Selling Price (KSh) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-text">KSh</span>
                  <input
                    type="number"
                    value={formData.price || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, price: Number(e.target.value) }))}
                    min="0"
                    step="0.01"
                    className={`w-full pl-12 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.price
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                        : 'border-sky-200 focus:border-redbull-blue focus:ring-redbull-blue/20'
                    }`}
                  />
                </div>
                {errors.price && (
                  <p className="text-xs text-red-600 mt-1">{errors.price}</p>
                )}
              </div>

              {/* Original Price (for showing discount) */}
              <div>
                <label className="text-sm font-medium text-charcoal mb-1 block">
                  Original Price (Optional)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-text">KSh</span>
                  <input
                    type="number"
                    value={formData.originalPrice || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, originalPrice: Number(e.target.value) || undefined }))}
                    min="0"
                    step="0.01"
                    className={`w-full pl-12 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.originalPrice
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                        : 'border-sky-200 focus:border-redbull-blue focus:ring-redbull-blue/20'
                    }`}
                  />
                </div>
                {errors.originalPrice && (
                  <p className="text-xs text-red-600 mt-1">{errors.originalPrice}</p>
                )}
                {formData.originalPrice && formData.originalPrice > formData.price && (
                  <p className="text-xs text-green-600 mt-1">
                    Discount: {Math.round(((formData.originalPrice - formData.price) / formData.originalPrice) * 100)}% off
                  </p>
                )}
              </div>

              {/* Stock */}
              <div>
                <label className="text-sm font-medium text-charcoal mb-1 block">
                  Stock Quantity <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={formData.stock}
                  onChange={(e) => setFormData(prev => ({ ...prev, stock: Math.max(0, Number(e.target.value)) }))}
                  min="0"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.stock
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                      : 'border-sky-200 focus:border-redbull-blue focus:ring-redbull-blue/20'
                  }`}
                />
                {errors.stock && (
                  <p className="text-xs text-red-600 mt-1">{errors.stock}</p>
                )}
              </div>

              {/* Additional Fields (Optional) */}
              <div className="bg-sky-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-charcoal mb-3">Additional Details (Optional)</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-slate-text mb-1 block">Brand</label>
                    <input
                      type="text"
                      value={formData.brand || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, brand: e.target.value }))}
                      placeholder="e.g., Apple, Samsung"
                      className="w-full px-3 py-2 border border-sky-200 rounded-lg text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-text mb-1 block">Model</label>
                    <input
                      type="text"
                      value={formData.model || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, model: e.target.value }))}
                      placeholder="e.g., A2487"
                      className="w-full px-3 py-2 border border-sky-200 rounded-lg text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-text mb-1 block">SKU (Optional)</label>
                    <input
                      type="text"
                      value={formData.sku || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, sku: e.target.value }))}
                      placeholder="Stock keeping unit"
                      className="w-full px-3 py-2 border border-sky-200 rounded-lg text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Images */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <h2 className="text-lg font-display font-semibold text-charcoal flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-redbull-blue" />
              Product Images
            </h2>

            <div>
              <label className="text-sm font-medium text-charcoal mb-2 block">
                Upload Images <span className="text-red-500">*</span>
              </label>
              
              {/* Image Upload Area */}
              <div className="border-2 border-dashed border-sky-200 rounded-xl p-6 text-center hover:border-redbull-blue transition-colors">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <Upload className="w-8 h-8 text-slate-text/40 mx-auto mb-2" />
                  <p className="text-sm text-charcoal font-medium">Click to upload images</p>
                  <p className="text-xs text-slate-text mt-1">PNG, JPG up to 10MB each</p>
                </label>
              </div>

              {errors.images && (
                <p className="text-xs text-red-600 mt-2 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.images}
                </p>
              )}

              {/* Image Previews */}
              {formData.imagePreviews.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-charcoal mb-2">
                    Uploaded Images ({formData.imagePreviews.length})
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {formData.imagePreviews.map((preview, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={preview}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg border border-sky-200"
                        />
                        <button
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <p className="text-xs text-slate-text/70 mt-3 flex items-start gap-1">
                <Info className="w-3 h-3 mt-0.5" />
                <span>First image will be the main product photo. High-quality images increase sales by up to 30%.</span>
              </p>
            </div>
          </div>
        )}

        {/* Step 4: Tags & SEO */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <h2 className="text-lg font-display font-semibold text-charcoal flex items-center gap-2">
              <Tag className="w-5 h-5 text-redbull-blue" />
              Tags & SEO
            </h2>

            <div className="space-y-4">
              {/* Tags Input */}
              <div>
                <label className="text-sm font-medium text-charcoal mb-1 block flex items-center gap-1">
                  Product Tags
                  <Sparkles className="w-4 h-4 text-amber-600" />
                </label>
                <p className="text-xs text-slate-text/70 mb-2">
                  Tags help customers find your product in search. Add relevant keywords.
                </p>
                
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formData.tagInput}
                    onChange={(e) => setFormData(prev => ({ ...prev, tagInput: e.target.value }))}
                    onKeyDown={handleKeyDown}
                    placeholder="e.g., wireless, bluetooth, headphones"
                    className="flex-1 px-4 py-2 border border-sky-200 rounded-lg focus:outline-none focus:border-redbull-blue"
                  />
                  <button
                    onClick={addTag}
                    className="px-4 py-2 bg-redbull-blue text-white rounded-lg hover:bg-redbull-blue/90 flex items-center gap-1"
                  >
                    <Plus className="w-4 h-4" />
                    Add
                  </button>
                </div>

                {/* Tag List */}
                {formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {formData.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-sky-100 text-charcoal px-3 py-1 rounded-full text-sm flex items-center gap-1 group"
                      >
                        #{tag}
                        <button
                          onClick={() => removeTag(index)}
                          className="hover:text-red-600"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}

                <p className="text-xs text-slate-text/70 mt-2">
                  💡 Products with 5+ tags get 40% more visibility in search results.
                </p>
              </div>

              {/* SEO Preview */}
              <div className="bg-sky-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-charcoal mb-2">Search Preview</h3>
                <div className="bg-white rounded-lg p-3 border border-sky-200">
                  <p className="text-sm text-redbull-blue font-medium truncate">
                    {formData.name || 'Product Name'} - E-TALA Marketplace
                  </p>
                  <p className="text-xs text-green-700 mt-1">
                    {window.location.origin}/marketplace/product/...
                  </p>
                  <p className="text-xs text-slate-text mt-1 line-clamp-2">
                    {formData.description || 'Product description will appear here...'}
                  </p>
                </div>
                <p className="text-xs text-slate-text/70 mt-2">
                  Tags help search engines understand your product better.
                </p>
              </div>

              {/* Save Options */}
              <div className="border-t border-sky-100 pt-4">
                <label className="flex items-center gap-2 mb-2">
                  <input
                    type="radio"
                    checked={formData.status === 'active'}
                    onChange={() => setFormData(prev => ({ ...prev, status: 'active' }))}
                    className="text-redbull-blue"
                  />
                  <span className="text-sm text-charcoal">Publish immediately (active)</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={formData.status === 'draft'}
                    onChange={() => setFormData(prev => ({ ...prev, status: 'draft' }))}
                    className="text-redbull-blue"
                  />
                  <span className="text-sm text-charcoal">Save as draft</span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8 pt-6 border-t border-sky-100">
          {currentStep > 1 ? (
            <button
              onClick={prevStep}
              className="px-6 py-2 border border-sky-200 text-slate-text rounded-lg hover:bg-sky-50 flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </button>
          ) : (
            <div />
          )}

          {currentStep < 4 ? (
            <button
              onClick={nextStep}
              className="px-6 py-2 bg-redbull-blue text-white rounded-lg hover:bg-redbull-blue/90 flex items-center gap-2"
            >
              Continue
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>Saving...</>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  {formData.status === 'active' ? 'Publish Product' : 'Save Draft'}
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Tips Box */}
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