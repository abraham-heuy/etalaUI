// components/SellerApplication/VerificationStep.tsx
import React from 'react';
import { Shield, FileText, MapPin, Sparkles, Upload, X } from 'lucide-react';

type VerificationMethod = 'documents' | 'physical' | 'games';

interface VerificationStepProps {
  verificationMethod: VerificationMethod | '';
  setVerificationMethod: (method: VerificationMethod) => void;
  documents: File[];
  setDocuments: React.Dispatch<React.SetStateAction<File[]>>;
  documentPreviews: string[];
  setDocumentPreviews: React.Dispatch<React.SetStateAction<string[]>>;
  physicalAddress: {
    businessName: string;
    businessAddress: string;
    businessPhone: string;
    businessEmail: string;
    preferredDate: string;
    preferredTime: string;
  };
  setPhysicalAddress: React.Dispatch<React.SetStateAction<any>>;
  errors: Record<string, string>;
}

const VerificationStep: React.FC<VerificationStepProps> = ({
  verificationMethod,
  setVerificationMethod,
  setDocuments,
  documentPreviews,
  setDocumentPreviews,
  physicalAddress,
  setPhysicalAddress,
  errors,
}) => {
  const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter(file => file.type === 'application/pdf' || file.type.startsWith('image/'));
    const newPreviews = validFiles.map(file => URL.createObjectURL(file));
    setDocuments(prev => [...prev, ...validFiles]);
    setDocumentPreviews(prev => [...prev, ...newPreviews]);
  };

  const removeDocument = (index: number) => {
    URL.revokeObjectURL(documentPreviews[index]);
    setDocuments(prev => prev.filter((_, i) => i !== index));
    setDocumentPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const updatePhysical = (field: string, value: string) => {
    setPhysicalAddress((prev: any) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white rounded-xl border border-sky-100 p-6 mt-6">
      <h2 className="text-lg font-display font-semibold text-charcoal mb-4 flex items-center gap-2">
        <Shield className="w-5 h-5 text-redbull-blue" />
        Verification Method
      </h2>
      <p className="text-sm text-slate-text mb-4">Choose how you'd like to verify your business</p>

      <div className="space-y-4">
        {/* Option 1: Documents */}
        <button
          onClick={() => setVerificationMethod('documents')}
          className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
            verificationMethod === 'documents'
              ? 'border-redbull-blue bg-redbull-blue/5'
              : 'border-sky-200 hover:border-redbull-blue/50'
          }`}
        >
          <div className="flex items-start gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              verificationMethod === 'documents' ? 'bg-redbull-blue' : 'bg-sky-100'
            }`}>
              <FileText className={`w-5 h-5 ${verificationMethod === 'documents' ? 'text-white' : 'text-redbull-blue'}`} />
            </div>
            <div className="flex-1">
              <h3 className="text-base font-display font-semibold text-charcoal">Upload Documents</h3>
              <p className="text-sm text-slate-text">Upload business permit, license, or other documents</p>
              <p className="text-xs text-green-600 mt-1">✓ Instant processing</p>
            </div>
          </div>
        </button>

        {/* Option 2: Physical Visit */}
        <button
          onClick={() => setVerificationMethod('physical')}
          className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
            verificationMethod === 'physical'
              ? 'border-redbull-blue bg-redbull-blue/5'
              : 'border-sky-200 hover:border-redbull-blue/50'
          }`}
        >
          <div className="flex items-start gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              verificationMethod === 'physical' ? 'bg-redbull-blue' : 'bg-sky-100'
            }`}>
              <MapPin className={`w-5 h-5 ${verificationMethod === 'physical' ? 'text-white' : 'text-redbull-blue'}`} />
            </div>
            <div className="flex-1">
              <h3 className="text-base font-display font-semibold text-charcoal">Physical Visit</h3>
              <p className="text-sm text-slate-text">Schedule a visit from our verification team</p>
              <p className="text-xs text-amber-600 mt-1">⏳ Takes 2-3 business days</p>
            </div>
          </div>
        </button>

        {/* Option 3: Play Games */}
        <button
          onClick={() => setVerificationMethod('games')}
          className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
            verificationMethod === 'games'
              ? 'border-redbull-blue bg-redbull-blue/5'
              : 'border-sky-200 hover:border-redbull-blue/50'
          }`}
        >
          <div className="flex items-start gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              verificationMethod === 'games' ? 'bg-redbull-blue' : 'bg-sky-100'
            }`}>
              <Sparkles className={`w-5 h-5 ${verificationMethod === 'games' ? 'text-white' : 'text-redbull-blue'}`} />
            </div>
            <div className="flex-1">
              <h3 className="text-base font-display font-semibold text-charcoal">Play & Save</h3>
              <p className="text-sm text-slate-text">Play fun games and earn up to 80% off verification</p>
              <p className="text-xs text-purple-600 mt-1">✨ Instant discount</p>
            </div>
          </div>
        </button>

        {errors.verification && <p className="text-xs text-red-600 mt-2">{errors.verification}</p>}

        {/* Document Upload Section */}
        {verificationMethod === 'documents' && (
          <div className="mt-4 pt-4 border-t border-sky-100">
            <label className="text-sm font-medium text-charcoal mb-2 block">Upload Documents</label>
            <div className="border-2 border-dashed border-sky-200 rounded-xl p-6 text-center hover:border-redbull-blue transition-colors mb-4">
              <input type="file" multiple accept=".pdf,image/*" onChange={handleDocumentUpload} className="hidden" id="document-upload" />
              <label htmlFor="document-upload" className="cursor-pointer">
                <Upload className="w-8 h-8 text-slate-text/40 mx-auto mb-2" />
                <p className="text-sm text-charcoal font-medium">Click to upload</p>
                <p className="text-xs text-slate-text mt-1">PDF or images, up to 10MB</p>
              </label>
            </div>
            {errors.documents && <p className="text-xs text-red-600 mb-3">{errors.documents}</p>}
            {documentPreviews.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium text-charcoal">Uploaded Files</p>
                {documentPreviews.map((_, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-sky-50 rounded-lg">
                    <span className="text-sm text-slate-text truncate flex-1">Document {index + 1}</span>
                    <button onClick={() => removeDocument(index)} className="p-1 text-red-600 hover:bg-red-50 rounded">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Physical Visit Form */}
        {verificationMethod === 'physical' && (
          <div className="mt-4 pt-4 border-t border-sky-100 space-y-4">
            <div>
              <label className="text-sm font-medium text-charcoal mb-1 block">Business Name <span className="text-red-500">*</span></label>
              <input type="text" value={physicalAddress.businessName} onChange={(e) => updatePhysical('businessName', e.target.value)} className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.businessName ? 'border-red-300' : 'border-sky-200'}`} />
            </div>
            <div>
              <label className="text-sm font-medium text-charcoal mb-1 block">Business Address <span className="text-red-500">*</span></label>
              <input type="text" value={physicalAddress.businessAddress} onChange={(e) => updatePhysical('businessAddress', e.target.value)} className={`w-full px-4 py-2 border rounded-lg ${errors.businessAddress ? 'border-red-300' : 'border-sky-200'}`} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-charcoal mb-1 block">Business Phone <span className="text-red-500">*</span></label>
                <input type="tel" value={physicalAddress.businessPhone} onChange={(e) => updatePhysical('businessPhone', e.target.value)} className={`w-full px-4 py-2 border rounded-lg ${errors.businessPhone ? 'border-red-300' : 'border-sky-200'}`} />
              </div>
              <div>
                <label className="text-sm font-medium text-charcoal mb-1 block">Business Email <span className="text-red-500">*</span></label>
                <input type="email" value={physicalAddress.businessEmail} onChange={(e) => updatePhysical('businessEmail', e.target.value)} className={`w-full px-4 py-2 border rounded-lg ${errors.businessEmail ? 'border-red-300' : 'border-sky-200'}`} />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-charcoal mb-1 block">Preferred Date <span className="text-red-500">*</span></label>
                <input type="date" value={physicalAddress.preferredDate} onChange={(e) => updatePhysical('preferredDate', e.target.value)} min={new Date().toISOString().split('T')[0]} className={`w-full px-4 py-2 border rounded-lg ${errors.preferredDate ? 'border-red-300' : 'border-sky-200'}`} />
              </div>
              <div>
                <label className="text-sm font-medium text-charcoal mb-1 block">Preferred Time <span className="text-red-500">*</span></label>
                <input type="time" value={physicalAddress.preferredTime} onChange={(e) => updatePhysical('preferredTime', e.target.value)} className={`w-full px-4 py-2 border rounded-lg ${errors.preferredTime ? 'border-red-300' : 'border-sky-200'}`} />
              </div>
            </div>
          </div>
        )}

        {/* Games Info */}
        {verificationMethod === 'games' && (
          <div className="mt-4 pt-4 border-t border-sky-100">
            <div className="bg-purple-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-charcoal mb-2 flex items-center gap-1">
                <Sparkles className="w-4 h-4 text-purple-600" /> Play Games & Save
              </h3>
              <p className="text-xs text-slate-text mb-3">Choose a game to play and earn a discount on your verification fee:</p>
              <div className="space-y-2">
                <button className="w-full p-3 bg-white rounded-lg border border-purple-200 text-left hover:border-purple-400 transition-colors">
                  <p className="text-sm font-medium text-charcoal">Riddle Me This</p>
                  <p className="text-xs text-slate-text">Solve 3 riddles - Save up to 60%</p>
                </button>
                <button className="w-full p-3 bg-white rounded-lg border border-purple-200 text-left hover:border-purple-400 transition-colors">
                  <p className="text-sm font-medium text-charcoal">Tala Trivia</p>
                  <p className="text-xs text-slate-text">Test your knowledge - Save up to 80%</p>
                </button>
                <button className="w-full p-3 bg-white rounded-lg border border-purple-200 text-left hover:border-purple-400 transition-colors">
                  <p className="text-sm font-medium text-charcoal">Market Memory</p>
                  <p className="text-xs text-slate-text">Match products - Save up to 90%</p>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerificationStep;