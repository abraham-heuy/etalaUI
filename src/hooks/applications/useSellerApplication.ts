// hooks/useSellerApplication.ts
import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/auth/auth';
import { type SellerApplication, SellerApplicationService } from '../../services/Auth/seller-applications.service';


type SellerCategory = 'marketplace' | 'farmers' | 'boda' | 'services' | 'food' | 'stays' | 'other';
type VerificationMethod = 'documents' | 'physical' | 'games';

export const useSellerApplication = () => {
  const { user } = useAuth();
  const [existingApps, setExistingApps] = useState<SellerApplication[]>([]);
  const [approvedCategories, setApprovedCategories] = useState<string[]>([]);
  const [pendingCategories, setPendingCategories] = useState<string[]>([]);

  // Personal Info (pre‑filled from user)
  const [personalInfo, setPersonalInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
    idNumber: '',
    address: '',
    city: '',
  });

  const [selectedCategory, setSelectedCategory] = useState<SellerCategory | ''>('');
  const [otherCategory, setOtherCategory] = useState('');

  const [businessAnswers, setBusinessAnswers] = useState<Record<string, string>>({});

  const [verificationMethod, setVerificationMethod] = useState<VerificationMethod | ''>('');
  const [documents, setDocuments] = useState<File[]>([]);
  const [documentPreviews, setDocumentPreviews] = useState<string[]>([]);
  const [physicalAddress, setPhysicalAddress] = useState({
    businessName: '',
    businessAddress: '',
    businessPhone: '',
    businessEmail: '',
    preferredDate: '',
    preferredTime: '',
  });

  // Fetch existing applications and pre‑fill personal details from an approved one
  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        setPersonalInfo(prev => ({
          ...prev,
          fullName: user.fullName || '',
          email: user.email || '',
          phone: user.phone || '',
        }));
      }
      try {
        const apps = await SellerApplicationService.getMyApplications();
        setExistingApps(apps);
        const approved = apps.filter(app => app.status === 'approved').map(app => app.category);
        setApprovedCategories(approved);
        const pending = apps.filter(app => app.status === 'pending').map(app => app.category);

        setPendingCategories(pending);

        const approvedApp = apps.find(app => app.status === 'approved');
        if (approvedApp) {
          setPersonalInfo(prev => ({
            ...prev,
            idNumber: approvedApp.idNumber || '',
            address: approvedApp.address || '',
            city: approvedApp.city || '',
          }));
        }
      } catch (err) {
        console.error('Failed to fetch existing applications', err);
      }
    };
    fetchData();
  }, [user]);

  const resetStep4 = () => {
    setDocuments([]);
    setDocumentPreviews([]);
    setPhysicalAddress({
      businessName: '',
      businessAddress: '',
      businessPhone: '',
      businessEmail: '',
      preferredDate: '',
      preferredTime: '',
    });
  };

  return {
    personalInfo, setPersonalInfo,
    selectedCategory, setSelectedCategory,
    otherCategory, setOtherCategory,
    businessAnswers, setBusinessAnswers,
    verificationMethod, setVerificationMethod,
    documents, setDocuments,
    documentPreviews, setDocumentPreviews,
    physicalAddress, setPhysicalAddress,
    approvedCategories, pendingCategories ,
    existingApps,
    resetStep4,
  };
};