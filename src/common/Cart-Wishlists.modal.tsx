// components/common/Modals.tsx
import React, { useEffect, useState } from 'react';
import { X, Minus, Plus, Trash2, ShoppingCart, Heart, Loader2 } from 'lucide-react';
import { useCart } from '../contexts/commerce/cart.context';
import { useWishlist } from '../contexts/commerce/wishlist.context';
import { tokenStore } from '../services/Auth/auth.service';
import type { CartItem } from '../services/commerce/commerce.service';
import { Link } from 'react-router-dom';

interface SlidePanelProps {
  open: boolean;
  onClose: () => void;
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  footer: React.ReactNode;
}

export const SlidePanel: React.FC<SlidePanelProps> = ({ open, onClose, title, icon, children, footer }) => {
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <div className="fixed z-50 inset-x-0 bottom-0 md:inset-x-auto md:inset-y-0 md:right-0 md:w-[420px] flex flex-col bg-white rounded-t-3xl md:rounded-none shadow-2xl" style={{ maxHeight: '90vh' }}>
        <div className="flex justify-center pt-3 pb-1 md:hidden"><div className="w-12 h-1 rounded-full bg-gray-200" /></div>
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2"><span className="text-sky-500">{icon}</span><h2 className="text-lg font-semibold text-gray-800">{title}</h2></div>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"><X className="w-5 h-5 text-gray-500" /></button>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">{children}</div>
        <div className="px-5 py-4 border-t border-gray-100 bg-white/95">{footer}</div>
      </div>
    </>
  );
};

interface CartPanelProps { open: boolean; onClose: () => void; }
export const CartPanel: React.FC<CartPanelProps> = ({ open, onClose }) => {
  const { cart, isLoading, updateQuantity, removeItem, refreshCart } = useCart();
  const [updatingIds, setUpdatingIds] = useState<Set<string>>(new Set());

  useEffect(() => { if (open) refreshCart(); }, [open]);

  const handleQtyChange = async (cartItemId: string, delta: number) => {
    const item = cart?.items.find(i => i.id === cartItemId);
    if (!item) return;
    const newQty = Math.max(1, item.quantity + delta);
    if (newQty === item.quantity) return;
    setUpdatingIds(prev => new Set(prev).add(cartItemId));
    try {
      await updateQuantity(cartItemId, newQty);
    } finally {
      setUpdatingIds(prev => { const next = new Set(prev); next.delete(cartItemId); return next; });
    }
  };

  const handleRemove = async (cartItemId: string) => {
    setUpdatingIds(prev => new Set(prev).add(cartItemId));
    try {
      await removeItem(cartItemId);
    } finally {
      setUpdatingIds(prev => { const next = new Set(prev); next.delete(cartItemId); return next; });
    }
  };

  const total = cart?.items.reduce((sum, i) => sum + (i.price * i.quantity), 0) || 0;
  const category = cart?.category; // ✅ get the category from cart

  if (!tokenStore.get()) {
    return <SlidePanel open={open} onClose={onClose} title="Your Cart" icon={<ShoppingCart size={20} />} footer={null}>
      <div className="text-center py-8"><ShoppingCart className="w-12 h-12 text-gray-300 mx-auto mb-3" /><p className="text-gray-500">Please log in to view your cart</p></div>
    </SlidePanel>;
  }

  const validItems = (cart?.items || []).filter((item): item is CartItem & { id: string } => !!item.id);

  return (
    <SlidePanel open={open} onClose={onClose} title={`Your Cart (${validItems.length})`} icon={<ShoppingCart size={20} />}
      footer={
        <div>
          <div className="flex justify-between text-sm font-medium mb-3">
            <span>Subtotal</span>
            <span className="text-sky-600">KES {total.toLocaleString()}</span>
          </div>
          <Link
            to={`/checkout?category=${category}`}
            onClick={onClose}
            className="w-full py-3 bg-sky-500 text-white rounded-xl font-medium hover:bg-sky-600 text-center block"
          >
            Proceed to Checkout
          </Link>
        </div>
      }>
      {isLoading ? (
        <div className="flex justify-center py-8"><Loader2 className="w-6 h-6 animate-spin text-sky-500" /></div>
      ) : validItems.length === 0 ? (
        <div className="text-center py-8"><ShoppingCart className="w-12 h-12 text-gray-300 mx-auto mb-3" /><p className="text-gray-500">Your cart is empty</p></div>
      ) : (
        validItems.map(item => (
          <div key={item.id} className="flex gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
            <img src={item.image || '/placeholder.png'} alt={item.name} className="w-20 h-20 rounded-lg object-cover flex-shrink-0 bg-white" />
            <div className="flex-1">
              <p className="text-xs text-sky-500 font-medium uppercase">{item.productType}</p>
              <p className="text-sm font-semibold text-gray-800 line-clamp-1">{item.name}</p>
              <p className="text-sm font-bold text-sky-600 mt-1">KES {item.price.toLocaleString()}</p>
              <div className="flex items-center gap-2 mt-2">
                <button onClick={() => handleQtyChange(item.id, -1)} disabled={updatingIds.has(item.id)} className="w-7 h-7 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-50"><Minus className="w-3.5 h-3.5" /></button>
                <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                <button onClick={() => handleQtyChange(item.id, 1)} disabled={updatingIds.has(item.id)} className="w-7 h-7 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-50"><Plus className="w-3.5 h-3.5" /></button>
                <button onClick={() => handleRemove(item.id)} disabled={updatingIds.has(item.id)} className="ml-auto p-1.5 rounded-full text-red-400 hover:bg-red-50 hover:text-red-600 disabled:opacity-50"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          </div>
        ))
      )}
    </SlidePanel>
  );
};
interface WishlistPanelProps { open: boolean; onClose: () => void; }
export const WishlistPanel: React.FC<WishlistPanelProps> = ({ open, onClose }) => {
  const { wishlist, isLoading, removeItem, moveToCart, refreshWishlist } = useWishlist();
  const [actionIds, setActionIds] = useState<Set<string>>(new Set());

  useEffect(() => { if (open) refreshWishlist(); }, [open]);

  const handleRemove = async (itemId: string) => {
    setActionIds(prev => new Set(prev).add(itemId));
    try { await removeItem(itemId); } finally { setActionIds(prev => { const next = new Set(prev); next.delete(itemId); return next; }); }
  };

  const handleMoveToCart = async (itemId: string) => {
    setActionIds(prev => new Set(prev).add(itemId));
    try { await moveToCart(itemId); } finally { setActionIds(prev => { const next = new Set(prev); next.delete(itemId); return next; }); }
  };

  if (!tokenStore.get()) {
    return <SlidePanel open={open} onClose={onClose} title="Wishlist" icon={<Heart size={20} />} footer={null}>
      <div className="text-center py-8"><Heart className="w-12 h-12 text-gray-300 mx-auto mb-3" /><p className="text-gray-500">Please log in to view your wishlist</p></div>
    </SlidePanel>;
  }

  return (
    <SlidePanel open={open} onClose={onClose} title={`Wishlist (${wishlist?.items.length || 0})`} icon={<Heart size={20} />} footer={null}>
      {isLoading ? (
        <div className="flex justify-center py-8"><Loader2 className="w-6 h-6 animate-spin text-sky-500" /></div>
      ) : !wishlist?.items.length ? (
        <div className="text-center py-8"><Heart className="w-12 h-12 text-gray-300 mx-auto mb-3" /><p className="text-gray-500">Your wishlist is empty</p></div>
      ) : (
        wishlist.items.map(item => (
          <div key={item.id} className="flex gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
            <img src={item.image || '/placeholder.png'} alt={item.name} className="w-20 h-20 rounded-lg object-cover flex-shrink-0 bg-white" />
            <div className="flex-1">
              <p className="text-xs text-sky-500 font-medium uppercase">{item.productType}</p>
              <p className="text-sm font-semibold text-gray-800 line-clamp-1">{item.name}</p>
              <p className="text-sm font-bold text-sky-600 mt-1">KES {item.price.toLocaleString()}</p>
              <div className="flex items-center gap-2 mt-2">
                <button onClick={() => handleMoveToCart(item.id)} disabled={actionIds.has(item.id)} className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-sky-500 text-white text-xs font-medium hover:bg-sky-600 disabled:opacity-50"><ShoppingCart className="w-3.5 h-3.5" /> Move to Cart</button>
                <button onClick={() => handleRemove(item.id)} disabled={actionIds.has(item.id)} className="ml-auto p-1.5 rounded-full text-red-400 hover:bg-red-50 hover:text-red-600 disabled:opacity-50"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          </div>
        ))
      )}
    </SlidePanel>
  );
};