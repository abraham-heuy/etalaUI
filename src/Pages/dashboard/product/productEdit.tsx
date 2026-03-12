// pages/dashboard/products/edit/[id].tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft,
  Check,
  X,
  Plus,
  Tag,
  DollarSign,
  FileText,
  Image as ImageIcon,
  AlertCircle,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Save,
  Trash2,
  Camera
} from 'lucide-react';
import ConfirmModal from '../../../common/ConfirmModal';

type ProductCondition = 'new' | 'like-new' | 'good' | 'fair';
type ProductStatus = 'active' | 'draft' | 'out_of_stock';

interface ProductData {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  subcategory: string;
  condition: ProductCondition;
  stock: number;
  tags: string[];
  isMtush: boolean;
  status: ProductStatus;
  brand?: string;
  model?: string;
  sku?: string;
  images: string[];
}

interface ProductFormData {
  name: string;
  description: string;
  category: string;
  subcategory: string;
  price: number;
  originalPrice?: number;
  stock: number;
  condition: ProductCondition;
  newImages: File[];
  existingImages: string[];
  imagesToDelete: string[];
  tags: string[];
  tagInput: string;
  isMtush: boolean;
  status: ProductStatus;
  brand?: string;
  model?: string;
  sku?: string;
}

const ProductEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    description: '',
    category: '',
    subcategory: '',
    price: 0,
    originalPrice: undefined,
    stock: 1,
    condition: 'new',
    newImages: [],
    existingImages: [],
    imagesToDelete: [],
    tags: [],
    tagInput: '',
    isMtush: false,
    status: 'draft',
    brand: '',
    model: '',
    sku: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Mock categories
  const categories = [
    { id: 'electronics', name: 'Electronics', subcategories: ['Phones', 'Laptops', 'Audio', 'Accessories'] },
    { id: 'fashion', name: 'Fashion', subcategories: ['Men', 'Women', 'Kids', 'Shoes'] },
    { id: 'household', name: 'Household', subcategories: ['Furniture', 'Kitchen', 'Decor', 'Appliances'] },
    { id: 'hardware', name: 'Hardware', subcategories: ['Tools', 'Building', 'Electrical', 'Plumbing'] },
    { id: 'farmers', name: 'Farmers Market', subcategories: ['Vegetables', 'Fruits', 'Dairy', 'Meat'] },
    { id: 'handicrafts', name: 'Handicrafts', subcategories: ['Beaded', 'Wooden', 'Fabrics', 'Ceramics'] },
  ];

  const conditions = [
    { value: 'new', label: 'New', description: 'Brand new, unused' },
    { value: 'like-new', label: 'Like New', description: 'Used but perfect' },
    { value: 'good', label: 'Good', description: 'Minor signs of wear' },
    { value: 'fair', label: 'Fair', description: 'Visible wear, works' },
  ];

  // Fetch product data
  useEffect(() => {
    setTimeout(() => {
      const mockProduct: ProductData = {
        id: id || '1',
        name: 'iPhone 13 Pro Max',
        description: 'Excellent condition iPhone 13 Pro Max. Battery health 95%. Comes with original box and charger.',
        price: 145000,
        originalPrice: 165000,
        category: 'electronics',
        subcategory: 'phones',
        condition: 'like-new',
        stock: 3,
        tags: ['iphone', 'apple', 'smartphone', '5g'],
        isMtush: false,
        status: 'active',
        brand: 'Apple',
        model: 'A2487',
        sku: 'IP13PM-512',
        images: [
          'https://images.unsplash.com/photo-1632661674596-df8be6a1c9e1?w=100&h=100&fit=crop',
          'https://images.unsplash.com/photo-1591337676887-a217a6970a8a?w=100&h=100&fit=crop',
        ],
      };

      setFormData({
        name: mockProduct.name,
        description: mockProduct.description,
        category: mockProduct.category,
        subcategory: mockProduct.subcategory,
        price: mockProduct.price,
        originalPrice: mockProduct.originalPrice,
        stock: mockProduct.stock,
        condition: mockProduct.condition,
        newImages: [],
        existingImages: mockProduct.images,
        imagesToDelete: [],
        tags: mockProduct.tags,
        tagInput: '',
        isMtush: mockProduct.isMtush,
        status: mockProduct.status,
        brand: mockProduct.brand,
        model: mockProduct.model,
        sku: mockProduct.sku,
      });
      
      setLoading(false);
    }, 1000);
  }, [id]);

  // Image handlers
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validImages = files.filter(file => file.type.startsWith('image/'));
    setFormData(prev => ({
      ...prev,
      newImages: [...prev.newImages, ...validImages]
    }));
  };

  const removeExistingImage = (index: number) => {
    const imageToDelete = formData.existingImages[index];
    setFormData(prev => ({
      ...prev,
      existingImages: prev.existingImages.filter((_, i) => i !== index),
      imagesToDelete: [...prev.imagesToDelete, imageToDelete]
    }));
  };

  const removeNewImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      newImages: prev.newImages.filter((_, i) => i !== index)
    }));
  };

  // Tag handlers
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
        if (formData.existingImages.length === 0 && formData.newImages.length === 0) {
          newErrors.images = 'At least one image is required';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Submit
  const handleSubmit = async () => {
    if (!validateStep(currentStep) || currentStep < 4) {
      if (currentStep < 4) {
        nextStep();
      }
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      console.log('Updated product:', { id, ...formData });
      setIsSubmitting(false);
      alert('Product updated successfully!');
      navigate('/dashboard/products');
    }, 1500);
  };

  // Delete
  const handleDelete = async () => {
    setIsSubmitting(true);
    setTimeout(() => {
      console.log('Deleting product:', id);
      setIsSubmitting(false);
      setShowDeleteConfirm(false);
      alert('Product deleted successfully!');
      navigate('/dashboard/products');
    }, 1500);
  };

  const StepIndicator = () => (
    <div className="w-full overflow-x-auto pb-2 scrollbar-hide">
      <div className="flex items-center justify-between min-w-[300px] max-w-md mx-auto">
        {[1, 2, 3, 4].map((step) => (
          <div key={step} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 ${
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
              <div className={`w-8 sm:w-12 h-1 mx-1 sm:mx-2 ${
                step < currentStep ? 'bg-green-600' : 'bg-gray-200'
              }`} />
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-between max-w-md mx-auto mt-2 text-[10px] sm:text-xs text-slate-text px-1">
        <span>Basic</span>
        <span>Price</span>
        <span>Images</span>
        <span>Tags</span>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-redbull-blue border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-sm text-slate-text">Loading product...</p>
        </div>
      </div>
    );
  }

  const allImagePreviews = [
    ...formData.existingImages,
    ...formData.newImages.map(file => URL.createObjectURL(file))
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <Link
            to="/dashboard/products"
            className="p-2 rounded-full bg-sky-50 text-slate-text hover:text-redbull-blue hover:bg-sky-100 transition-colors flex-shrink-0"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="min-w-0">
            <h1 className="text-xl sm:text-2xl font-display font-bold text-charcoal truncate">
              Edit Product
            </h1>
            <p className="text-xs sm:text-sm text-slate-text">
              Update your product information
            </p>
          </div>
        </div>
        
        <button
          onClick={() => setShowDeleteConfirm(true)}
          className="w-full sm:w-auto px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center justify-center gap-2 text-sm"
        >
          <Trash2 className="w-4 h-4" />
          Delete
        </button>
      </div>

      <StepIndicator />

      {/* Form */}
      <div className="bg-white rounded-xl border border-sky-100 p-4 sm:p-6 mt-6">
        {/* Step 1: Basic Info */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <h2 className="text-base sm:text-lg font-display font-semibold text-charcoal flex items-center gap-2">
              <FileText className="w-5 h-5 text-redbull-blue flex-shrink-0" />
              Basic Information
            </h2>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-charcoal mb-1 block">
                  Product Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className={`w-full px-3 sm:px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 ${
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

              <div>
                <label className="text-sm font-medium text-charcoal mb-1 block">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={4}
                  className={`w-full px-3 sm:px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.description
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                      : 'border-sky-200 focus:border-redbull-blue focus:ring-redbull-blue/20'
                  }`}
                />
                {errors.description && (
                  <p className="text-xs text-red-600 mt-1">{errors.description}</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-charcoal mb-1 block">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value, subcategory: '' }))}
                    className={`w-full px-3 sm:px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 ${
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
                    className={`w-full px-3 sm:px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 ${
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

              <div>
                <label className="text-sm font-medium text-charcoal mb-2 block">
                  Condition <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {conditions.map((c) => (
                    <button
                      key={c.value}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, condition: c.value as ProductCondition }))}
                      className={`p-2 sm:p-3 rounded-lg border text-left transition-colors ${
                        formData.condition === c.value
                          ? 'border-redbull-blue bg-redbull-blue/5'
                          : 'border-sky-200 hover:border-redbull-blue/50'
                      }`}
                    >
                      <p className="text-xs sm:text-sm font-medium text-charcoal">{c.label}</p>
                      <p className="text-[10px] sm:text-xs text-slate-text mt-1">{c.description}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-amber-50 rounded-lg p-3 sm:p-4">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isMtush}
                    onChange={(e) => setFormData(prev => ({ ...prev, isMtush: e.target.checked }))}
                    className="mt-1 rounded text-amber-600 focus:ring-amber-500"
                  />
                  <div>
                    <span className="text-sm font-medium text-charcoal flex items-center gap-1 flex-wrap">
                      List as "Think Twice" (Mtush) 
                      <Sparkles className="w-4 h-4 text-amber-600" />
                    </span>
                    <p className="text-xs text-slate-text mt-1">
                      For pre-owned or second-hand items. These get a special badge.
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
            <h2 className="text-base sm:text-lg font-display font-semibold text-charcoal flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-redbull-blue flex-shrink-0" />
              Pricing & Inventory
            </h2>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-charcoal mb-1 block">
                  Selling Price (KSh) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-text text-sm">KSh</span>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData(prev => ({ ...prev, price: Number(e.target.value) }))}
                    min="0"
                    className={`w-full pl-12 pr-3 sm:pr-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 ${
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

              <div>
                <label className="text-sm font-medium text-charcoal mb-1 block">
                  Original Price (Optional)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-text text-sm">KSh</span>
                  <input
                    type="number"
                    value={formData.originalPrice || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, originalPrice: Number(e.target.value) || undefined }))}
                    min="0"
                    className="w-full pl-12 pr-3 sm:pr-4 py-2 text-sm border border-sky-200 rounded-lg focus:outline-none focus:border-redbull-blue"
                  />
                </div>
                {formData.originalPrice && formData.originalPrice > formData.price && (
                  <p className="text-xs text-green-600 mt-1">
                    Discount: {Math.round(((formData.originalPrice - formData.price) / formData.originalPrice) * 100)}% off
                  </p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-charcoal mb-1 block">
                  Stock Quantity <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={formData.stock}
                  onChange={(e) => setFormData(prev => ({ ...prev, stock: Math.max(0, Number(e.target.value)) }))}
                  min="0"
                  className={`w-full px-3 sm:px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.stock
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                      : 'border-sky-200 focus:border-redbull-blue focus:ring-redbull-blue/20'
                  }`}
                />
                {errors.stock && (
                  <p className="text-xs text-red-600 mt-1">{errors.stock}</p>
                )}
              </div>

              <div className="bg-sky-50 rounded-lg p-3 sm:p-4">
                <h3 className="text-sm font-medium text-charcoal mb-3">Additional Details (Optional)</h3>
                <div className="space-y-3">
                  <input
                    type="text"
                    value={formData.brand || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, brand: e.target.value }))}
                    placeholder="Brand (e.g., Apple)"
                    className="w-full px-3 py-2 text-sm border border-sky-200 rounded-lg"
                  />
                  <input
                    type="text"
                    value={formData.model || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, model: e.target.value }))}
                    placeholder="Model (e.g., A2487)"
                    className="w-full px-3 py-2 text-sm border border-sky-200 rounded-lg"
                  />
                  <input
                    type="text"
                    value={formData.sku || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, sku: e.target.value }))}
                    placeholder="SKU (Stock keeping unit)"
                    className="w-full px-3 py-2 text-sm border border-sky-200 rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Images */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <h2 className="text-base sm:text-lg font-display font-semibold text-charcoal flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-redbull-blue flex-shrink-0" />
              Product Images
            </h2>

            <div>
              <div className="border-2 border-dashed border-sky-200 rounded-xl p-4 sm:p-6 text-center hover:border-redbull-blue transition-colors mb-4">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer block">
                  <Camera className="w-8 h-8 text-slate-text/40 mx-auto mb-2" />
                  <p className="text-sm text-charcoal font-medium">Tap to add images</p>
                  <p className="text-xs text-slate-text mt-1">PNG, JPG up to 10MB</p>
                </label>
              </div>

              {errors.images && (
                <p className="text-xs text-red-600 mb-3 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.images}
                </p>
              )}

              {allImagePreviews.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-charcoal mb-3">
                    Images ({allImagePreviews.length})
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
                    {allImagePreviews.map((preview, index) => {
                      const isExisting = index < formData.existingImages.length;
                      return (
                        <div key={index} className="relative group aspect-square">
                          <img
                            src={preview}
                            alt={`Product ${index + 1}`}
                            className="w-full h-full object-cover rounded-lg border border-sky-200"
                          />
                          <button
                            onClick={() => {
                              if (isExisting) {
                                removeExistingImage(index);
                              } else {
                                removeNewImage(index - formData.existingImages.length);
                              }
                            }}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                          >
                            <X className="w-3 h-3" />
                          </button>
                          {index === 0 && (
                            <span className="absolute bottom-1 left-1 bg-redbull-blue text-white text-[10px] px-1.5 py-0.5 rounded-full">
                              Main
                            </span>
                          )}
                          {isExisting && (
                            <span className="absolute top-1 left-1 bg-green-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                              Saved
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step 4: Tags & SEO */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <h2 className="text-base sm:text-lg font-display font-semibold text-charcoal flex items-center gap-2">
              <Tag className="w-5 h-5 text-redbull-blue flex-shrink-0" />
              Tags & SEO
            </h2>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-charcoal mb-1 flex items-center gap-1 flex-wrap">
                  Product Tags
                  <Sparkles className="w-4 h-4 text-amber-600" />
                </label>
                <p className="text-xs text-slate-text/70 mb-2">
                  Tags help customers find your product. {formData.tags.length}/10 used
                </p>
                
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    value={formData.tagInput}
                    onChange={(e) => setFormData(prev => ({ ...prev, tagInput: e.target.value }))}
                    onKeyDown={handleKeyDown}
                    placeholder="Add a tag..."
                    className="flex-1 px-3 py-2 text-sm border border-sky-200 rounded-lg focus:outline-none focus:border-redbull-blue"
                    disabled={formData.tags.length >= 10}
                  />
                  <button
                    onClick={addTag}
                    disabled={!formData.tagInput.trim() || formData.tags.length >= 10}
                    className="w-full sm:w-auto px-4 py-2 bg-redbull-blue text-white rounded-lg hover:bg-redbull-blue/90 flex items-center justify-center gap-1 text-sm disabled:opacity-50"
                  >
                    <Plus className="w-4 h-4" />
                    Add
                  </button>
                </div>

                {formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {formData.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-sky-100 text-charcoal px-2 py-1 rounded-full text-xs sm:text-sm flex items-center gap-1 group"
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
              </div>

              <div className="bg-sky-50 rounded-lg p-3 sm:p-4">
                <h3 className="text-sm font-medium text-charcoal mb-2">Search Preview</h3>
                <div className="bg-white rounded-lg p-3 border border-sky-200">
                  <p className="text-sm text-redbull-blue font-medium truncate">
                    {formData.name || 'Product Name'} - E-TALA
                  </p>
                  <p className="text-xs text-green-700 mt-1 break-all">
                    {window.location.origin}/product/{id}
                  </p>
                  <p className="text-xs text-slate-text mt-1 line-clamp-2">
                    {formData.description || 'Description...'}
                  </p>
                </div>
              </div>

              <div className="border-t border-sky-100 pt-4">
                <p className="text-xs font-medium text-charcoal mb-3">Product Status</p>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      checked={formData.status === 'active'}
                      onChange={() => setFormData(prev => ({ ...prev, status: 'active' }))}
                      className="text-redbull-blue"
                    />
                    <span className="text-sm text-charcoal">Active (visible in marketplace)</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      checked={formData.status === 'draft'}
                      onChange={() => setFormData(prev => ({ ...prev, status: 'draft' }))}
                      className="text-redbull-blue"
                    />
                    <span className="text-sm text-charcoal">Draft (hidden)</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      checked={formData.status === 'out_of_stock'}
                      onChange={() => setFormData(prev => ({ ...prev, status: 'out_of_stock' }))}
                      className="text-redbull-blue"
                    />
                    <span className="text-sm text-charcoal">Out of Stock</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-8 pt-6 border-t border-sky-100">
          {currentStep > 1 ? (
            <button
              onClick={prevStep}
              className="px-4 sm:px-6 py-2 border border-sky-200 text-slate-text rounded-lg hover:bg-sky-50 flex items-center gap-2 text-sm"
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
              className="px-4 sm:px-6 py-2 bg-redbull-blue text-white rounded-lg hover:bg-redbull-blue/90 flex items-center gap-2 text-sm"
            >
              Continue
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-4 sm:px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2 text-sm disabled:opacity-50"
            >
              {isSubmitting ? 'Saving...' : (
                <>
                  <Save className="w-4 h-4" />
                  Update
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleDelete}
        title="Delete Product"
        message={`Are you sure you want to delete "${formData.name}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
        isConfirming={isSubmitting}
      />
    </div>
  );
};

export default ProductEditPage;