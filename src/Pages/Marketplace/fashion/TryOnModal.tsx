// components/marketplace/TryOnModal.tsx
import React, { useState, useRef } from 'react';
import { 
  X, 
  Camera, 
  Upload, 
  Loader2, 
  CheckCircle2,
  AlertCircle,
  Sparkles,
  RefreshCw
} from 'lucide-react';

interface TryOnModalProps {
  isOpen: boolean;
  onClose: () => void;
  productId: string;
  productName: string;
  productImage: string;
}

const TryOnModal: React.FC<TryOnModalProps> = ({
  isOpen,
  onClose,
  productId,
  productName,
  productImage
}) => {
  const [step, setStep] = useState<'upload' | 'processing' | 'result'>('upload');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size should be less than 5MB');
        return;
      }
      if (!file.type.startsWith('image/')) {
        setError('Please upload an image file');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraCapture = () => {
    // For mobile, this would trigger camera capture
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleTryOn = () => {
    if (!selectedImage) return;
    
    setStep('processing');
    setError(null);
    
    // Simulate AI processing
    setTimeout(() => {
      // Mock result - in real implementation, this would call an API
      // with productId and selectedImage
      const mockResult = selectedImage; // Replace with actual AI result
      setResultImage(mockResult);
      setStep('result');
    }, 3000);
  };

  const handleReset = () => {
    setStep('upload');
    setSelectedImage(null);
    setResultImage(null);
    setError(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-lg bg-white rounded-t-2xl sm:rounded-2xl shadow-xl animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-sky-100">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-sky-500" />
            <h2 className="text-lg font-display font-semibold text-charcoal">
              AI Virtual Try-On
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-sky-50 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-slate-text" />
          </button>
        </div>

        {/* Product Info */}
        <div className="p-4 bg-sky-50 border-b border-sky-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg overflow-hidden bg-white">
              <img src={productImage} alt={productName} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-charcoal">Trying on:</p>
              <p className="text-sm text-slate-text">{productName}</p>
              <p className="text-xs text-sky-600 mt-1">Product ID: {productId}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {step === 'upload' && (
            <div className="space-y-4">
              <div className="text-center">
                <p className="text-sm text-slate-text mb-4">
                  Upload a photo or take a picture to see how this item looks on you
                </p>
                
                {/* Image Preview or Upload Area */}
                {!selectedImage ? (
                  <div className="border-2 border-dashed border-sky-200 rounded-xl p-8 bg-sky-50/30">
                    <div className="flex flex-col items-center gap-3">
                      <Camera className="w-12 h-12 text-sky-400" />
                      <p className="text-sm text-slate-text">No photo selected</p>
                      <div className="flex gap-2">
                        <button
                          onClick={handleCameraCapture}
                          className="px-4 py-2 bg-sky-500 text-white rounded-lg text-sm font-medium hover:bg-sky-600 transition-colors flex items-center gap-2"
                        >
                          <Camera className="w-4 h-4" />
                          Take Photo
                        </button>
                        <button
                          onClick={() => fileInputRef.current?.click()}
                          className="px-4 py-2 border border-sky-200 text-sky-600 rounded-lg text-sm font-medium hover:bg-sky-50 transition-colors flex items-center gap-2"
                        >
                          <Upload className="w-4 h-4" />
                          Upload
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="relative rounded-xl overflow-hidden bg-slate-100">
                      <img 
                        src={selectedImage} 
                        alt="Preview" 
                        className="w-full h-auto max-h-96 object-contain"
                      />
                      <button
                        onClick={handleReset}
                        className="absolute top-2 right-2 p-1.5 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm hover:bg-white transition-colors"
                      >
                        <RefreshCw className="w-4 h-4 text-slate-text" />
                      </button>
                    </div>
                    <button
                      onClick={handleTryOn}
                      className="w-full py-3 bg-gradient-to-r from-sky-500 to-sky-600 text-white rounded-xl font-medium hover:from-sky-600 hover:to-sky-700 transition-all flex items-center justify-center gap-2"
                    >
                      <Sparkles className="w-5 h-5" />
                      Try On Now
                    </button>
                  </div>
                )}
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  className="hidden"
                  onChange={handleFileUpload}
                />
                
                {error && (
                  <div className="mt-3 flex items-center justify-center gap-2 text-red-600 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    <span>{error}</span>
                  </div>
                )}
              </div>
              
              <div className="bg-amber-50 rounded-lg p-3">
                <p className="text-xs text-amber-700">
                  💡 For best results, use a well-lit photo with clear view of the clothing area. 
                  This is a preview feature - full AI try-on coming soon!
                </p>
              </div>
            </div>
          )}
          
          {step === 'processing' && (
            <div className="text-center py-8">
              <div className="flex flex-col items-center gap-4">
                <div className="relative">
                  <div className="w-20 h-20 border-4 border-sky-200 border-t-sky-500 rounded-full animate-spin"></div>
                  <Loader2 className="w-8 h-8 text-sky-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
                </div>
                <div>
                  <p className="text-sm font-medium text-charcoal">AI is trying on the item...</p>
                  <p className="text-xs text-slate-text mt-1">This may take a few seconds</p>
                </div>
              </div>
            </div>
          )}
          
          {step === 'result' && (
            <div className="space-y-4">
              <div className="relative rounded-xl overflow-hidden bg-slate-100">
                <img 
                  src={resultImage || productImage} 
                  alt="Try-on result" 
                  className="w-full h-auto max-h-96 object-contain"
                />
                <div className="absolute top-2 right-2 flex gap-2">
                  <button
                    onClick={handleReset}
                    className="p-1.5 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm hover:bg-white transition-colors"
                  >
                    <RefreshCw className="w-4 h-4 text-slate-text" />
                  </button>
                </div>
                <div className="absolute bottom-2 left-2 right-2 bg-gradient-to-t from-black/70 to-transparent p-3 rounded-b-xl">
                  <div className="flex items-center gap-2 text-white">
                    <CheckCircle2 className="w-4 h-4" />
                    <span className="text-sm">AI Preview</span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={handleReset}
                  className="flex-1 py-2 border border-sky-200 text-sky-600 rounded-lg text-sm font-medium hover:bg-sky-50 transition-colors"
                >
                  Try Another
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 py-2 bg-sky-500 text-white rounded-lg text-sm font-medium hover:bg-sky-600 transition-colors"
                >
                  Done
                </button>
              </div>
              
              <div className="bg-sky-50 rounded-lg p-3 text-center">
                <p className="text-xs text-sky-700">
                  This is a preview of our upcoming AI Virtual Try-On feature. 
                  The full version will provide realistic garment fitting!
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TryOnModal;