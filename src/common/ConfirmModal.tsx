// we can use it for actions like delete(product wise )

// components/common/ConfirmModal.tsx
import React from 'react';
import { AlertTriangle } from 'lucide-react';
import Modal from './Modal';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'danger' | 'warning' | 'info' | 'success';
  isConfirming?: boolean;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type = 'danger',
  isConfirming = false,
}) => {
  const getTypeStyles = () => {
    switch (type) {
      case 'danger':
        return {
          icon: <AlertTriangle className="w-8 h-8 text-red-600" />,
          confirmBg: 'bg-red-600 hover:bg-red-700',
          iconBg: 'bg-red-100',
        };
      case 'warning':
        return {
          icon: <AlertTriangle className="w-8 h-8 text-amber-600" />,
          confirmBg: 'bg-amber-600 hover:bg-amber-700',
          iconBg: 'bg-amber-100',
        };
      case 'info':
        return {
          icon: <AlertTriangle className="w-8 h-8 text-blue-600" />,
          confirmBg: 'bg-blue-600 hover:bg-blue-700',
          iconBg: 'bg-blue-100',
        };
      default:
        return {
          icon: <AlertTriangle className="w-8 h-8 text-red-600" />,
          confirmBg: 'bg-red-600 hover:bg-red-700',
          iconBg: 'bg-red-100',
        };
    }
  };

  const styles = getTypeStyles();

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} maxWidth="sm" showCloseButton={false}>
      <div className="text-center">
        <div className={`w-16 h-16 ${styles.iconBg} rounded-full flex items-center justify-center mx-auto mb-4`}>
          {styles.icon}
        </div>
        
        <p className="text-sm text-slate-text mb-6">
          {message}
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onClose}
            disabled={isConfirming}
            className="flex-1 px-4 py-2 border border-sky-200 text-slate-text rounded-lg hover:bg-sky-50 transition-colors disabled:opacity-50"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            disabled={isConfirming}
            className={`flex-1 px-4 py-2 text-white rounded-lg transition-colors disabled:opacity-50 ${styles.confirmBg}`}
          >
            {isConfirming ? 'Please wait...' : confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;