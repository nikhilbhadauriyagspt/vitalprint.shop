import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, LayoutGrid, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

export default function CartDrawer() {
  const { isCartDrawerOpen, closeCartDrawer, cart, removeFromCart, updateQuantity, cartCount } = useCart();

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <AnimatePresence>
      {isCartDrawerOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCartDrawer}
            className="fixed inset-0 bg-[#37474F]/60 backdrop-blur-sm z-[1000]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-[450px] bg-white z-[1001] shadow-2xl flex flex-col font-['Rubik'] border-l border-[#E0E7E7]"
          >
            {/* Header */}
            <div className="p-8 border-b border-[#E0E7E7] flex items-center justify-between bg-[#F8FAFA]">
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-[#37474F] tracking-tight">Your <span className="text-[#7EA1A1] italic">Bag.</span></h2>
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#94A3B8] mt-1">{cartCount} Systems Ready</p>
              </div>
              <button
                onClick={closeCartDrawer}
                className="h-11 w-11 bg-white flex items-center justify-center text-[#94A3B8] hover:text-[#37474F] transition-all border border-[#E0E7E7] rounded-xl shadow-sm"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar bg-white">
              {cart.length > 0 ? (
                <div className="space-y-8">
                  {cart.map((item) => {
                    const getImagePath = (images) => {
                      try {
                        const imgs = typeof images === "string" ? JSON.parse(images) : images;
                        const first = Array.isArray(imgs) && imgs.length ? imgs[0] : null;
                        if (!first) return "/logo/fabicon.png";
                        const cleaned = String(first).replaceAll("\\", "/");
                        return cleaned.startsWith("/") ? cleaned : `/${cleaned}`;
                      } catch {
                        return "/logo/fabicon.png";
                      }
                    };

                    return (
                      <div key={item.id} className="flex gap-6 group pb-8 border-b border-[#F1F5F5] last:border-0 relative">
                        <div className="h-24 w-24 bg-[#F8FAFA] p-3 flex items-center justify-center flex-shrink-0 border border-[#E0E7E7]/50 rounded-2xl transition-all duration-500 group-hover:bg-white group-hover:border-[#7EA1A1]/30">
                          <img
                            src={getImagePath(item.images)}
                            alt={item.name}
                            className="max-w-full max-h-full object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-110"
                            onError={(e) => { e.target.src = "/logo/fabicon.png"; }}
                          />
                        </div>
                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                          <div className="relative pr-8">
                            <div className="flex items-center gap-2 mb-1">
                               <span className="text-[9px] font-bold text-[#7EA1A1] uppercase tracking-widest">Hardware</span>
                               <div className="h-1 w-1 rounded-full bg-[#E0E7E7]" />
                            </div>
                            <h3 className="text-[14px] font-bold text-[#37474F] leading-tight line-clamp-2 hover:text-[#7EA1A1] transition-colors">
                              <Link to={`/product/${item.slug}`} onClick={closeCartDrawer}>{item.name}</Link>
                            </h3>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="absolute top-0 right-0 p-1.5 text-[#E0E7E7] hover:text-red-500 transition-colors"
                              title="Remove item"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>

                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center gap-4 bg-[#F8FAFA] px-3 py-1.5 border border-[#E0E7E7] rounded-lg">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="text-[#94A3B8] hover:text-[#7EA1A1] transition-colors"
                                disabled={item.quantity <= 1}
                              >
                                <Minus size={14} />
                              </button>
                              <span className="text-xs font-bold text-[#37474F] min-w-[16px] text-center">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="text-[#94A3B8] hover:text-[#7EA1A1] transition-colors"
                              >
                                <Plus size={14} />
                              </button>
                            </div>
                            <span className="text-lg font-black text-[#37474F] tracking-tight">
                              ${(Number(item.price || 0) * item.quantity).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="h-24 w-24 bg-[#F8FAFA] border border-[#E0E7E7] rounded-[2rem] flex items-center justify-center mb-8 text-[#E0E7E7] shadow-sm">
                    <ShoppingBag size={40} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-2xl font-bold text-[#37474F] mb-3 tracking-tight">Bag is Empty.</h3>
                  <p className="text-sm font-medium text-[#64748B] max-w-[250px] mb-10 leading-relaxed">System configuration required before proceeding to logistics dispatch.</p>
                  <button
                    onClick={closeCartDrawer}
                    className="px-10 py-4 bg-[#37474F] text-white text-[11px] font-bold uppercase tracking-widest rounded-xl hover:bg-[#7EA1A1] transition-all shadow-xl shadow-[#37474F]/10 active:scale-95 flex items-center gap-3"
                  >
                    Explore Catalog <ArrowRight size={16} />
                  </button>
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-8 bg-[#F8FAFA] border-t border-[#E0E7E7]">
                <div className="flex items-center justify-between mb-8 pb-6 border-b border-[#E0E7E7]/50">
                  <span className="text-[11px] font-black text-[#94A3B8] uppercase tracking-[0.2em]">Net Value</span>
                  <span className="text-4xl font-black text-[#37474F] leading-none tracking-tighter">${total.toLocaleString()}</span>
                </div>
                <div className="flex flex-col gap-4">
                  <Link
                    to="/cart"
                    onClick={closeCartDrawer}
                    className="w-full h-14 bg-white text-[#37474F] border border-[#E0E7E7] flex items-center justify-center font-bold text-[13px] uppercase tracking-widest rounded-xl hover:border-[#7EA1A1] hover:text-[#7EA1A1] transition-all shadow-sm"
                  >
                    View Bag Details
                  </Link>
                  <Link
                    to="/checkout"
                    onClick={closeCartDrawer}
                    className="w-full h-16 bg-[#37474F] text-white flex items-center justify-center gap-3 font-bold text-[13px] uppercase tracking-widest rounded-xl hover:bg-[#7EA1A1] transition-all shadow-xl shadow-[#37474F]/10 active:scale-[0.98] group"
                  >
                    Dispatch Checkout
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
                <div className="flex items-center justify-center gap-2 mt-8 text-[#94A3B8]">
                   <Sparkles size={14} className="text-[#7EA1A1]" />
                   <p className="text-[10px] font-bold uppercase tracking-widest">
                     Secure Fulfillment Stream
                   </p>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #E0E7E7; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #7EA1A1; }
      `}</style>
    </AnimatePresence>
  );
}
