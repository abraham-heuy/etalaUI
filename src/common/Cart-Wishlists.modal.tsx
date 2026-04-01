// components/common/Modals.tsx
import React, { useEffect } from 'react';
import {
  X, Minus, Plus, Trash2, ShoppingCart
  } from 'lucide-react';

// ── Types 

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity?: number;
  category: string;
}

interface SlidePanelProps {
  open: boolean;
  onClose: () => void;
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  footer: React.ReactNode;
}

interface CartItemProps {
  item: Product;
  onQtyChange: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
}

interface WishlistItemProps {
  item: Product;
  onRemove: (id: string) => void;
  onMoveToCart: (id: string) => void;
}

interface EmptyStateProps {
  icon: React.ReactNode;
  message: string;
}

// ── Slide-over / modal panel ───────────────────────────────────────────────────

export const SlidePanel: React.FC<SlidePanelProps> = ({ 
  open, 
  onClose, 
  title, 
  icon, 
  children, 
  footer 
}) => {
  // Lock body scroll when open
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-white/30 backdrop-blur-md"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel — side drawer on md+, bottom sheet on mobile */}
      <div 
        className="fixed z-50 inset-x-0 bottom-0 md:inset-x-auto md:inset-y-0 md:right-0 md:w-96 flex flex-col bg-white/90 backdrop-blur-xl border-t md:border-t-0 md:border-l border-sky-100 shadow-2xl rounded-t-3xl md:rounded-none"
        style={{ maxHeight: '90vh' }}
      >
        {/* Handle — mobile only */}
        <div className="flex justify-center pt-3 pb-1 md:hidden">
          <div className="w-10 h-1 rounded-full bg-sky-200" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-sky-50">
          <div className="flex items-center gap-2">
            <span className="text-sky-500">{icon}</span>
            <h2 className="text-base font-display font-semibold text-charcoal">{title}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-sky-50 text-slate-text hover:text-sky-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-5 py-3 space-y-3">
          {children}
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-sky-50 bg-white/80">
          {footer}
        </div>
      </div>
    </>
  );
};

// ── Cart item row ──────────────────────────────────────────────────────────────

export const CartItem: React.FC<CartItemProps> = ({ 
  item, 
  onQtyChange, 
  onRemove 
}) => (
  <div className="flex gap-3 p-3 rounded-2xl bg-sky-50/60 border border-sky-100">
    <img src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-cover flex-shrink-0" />
    <div className="flex-1 min-w-0">
      <p className="text-xs text-sky-500 font-medium">{item.category}</p>
      <p className="text-sm font-medium text-charcoal truncate">{item.name}</p>
      <p className="text-sm font-semibold text-sky-600 mt-0.5">KES {item.price.toLocaleString()}</p>
      <div className="flex items-center gap-2 mt-2">
        <button
          onClick={() => onQtyChange(item.id, -1)}
          className="w-6 h-6 rounded-full bg-white border border-sky-200 flex items-center justify-center text-sky-600 hover:bg-sky-100 transition-colors"
        >
          <Minus className="w-3 h-3" />
        </button>
        <span className="text-sm font-semibold text-charcoal w-4 text-center">{item.quantity}</span>
        <button
          onClick={() => onQtyChange(item.id, 1)}
          className="w-6 h-6 rounded-full bg-white border border-sky-200 flex items-center justify-center text-sky-600 hover:bg-sky-100 transition-colors"
        >
          <Plus className="w-3 h-3" />
        </button>
        <button
          onClick={() => onRemove(item.id)}
          className="ml-auto p-1 rounded-full text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  </div>
);

// ── Wishlist item row ──────────────────────────────────────────────────────────

export const WishlistItem: React.FC<WishlistItemProps> = ({ 
  item, 
  onRemove, 
  onMoveToCart 
}) => (
  <div className="flex gap-3 p-3 rounded-2xl bg-sky-50/60 border border-sky-100">
    <img src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-cover flex-shrink-0" />
    <div className="flex-1 min-w-0">
      <p className="text-xs text-sky-500 font-medium">{item.category}</p>
      <p className="text-sm font-medium text-charcoal truncate">{item.name}</p>
      <p className="text-sm font-semibold text-sky-600 mt-0.5">KES {item.price.toLocaleString()}</p>
      <div className="flex items-center gap-2 mt-2">
        <button
          onClick={() => onMoveToCart(item.id)}
          className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-sky-500 text-white text-[11px] font-medium hover:bg-sky-600 transition-colors"
        >
          <ShoppingCart className="w-3 h-3" />
          Add to cart
        </button>
        <button
          onClick={() => onRemove(item.id)}
          className="ml-auto p-1 rounded-full text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  </div>
);

// ── Empty state ────────────────────────────────────────────────────────────────

export const EmptyState: React.FC<EmptyStateProps> = ({ icon, message }) => (
  <div className="flex flex-col items-center justify-center py-12 text-center">
    <div className="w-16 h-16 rounded-full bg-sky-50 flex items-center justify-center text-sky-300 mb-3">
      {icon}
    </div>
    <p className="text-sm text-slate-text">{message}</p>
  </div>
);