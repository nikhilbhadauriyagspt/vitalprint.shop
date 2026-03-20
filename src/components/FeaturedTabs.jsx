import { useState, useMemo } from "react";
import { Heart, ShoppingCart, Eye, ArrowRight, LayoutGrid } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { motion, AnimatePresence } from "framer-motion";

export default function FeaturedTabs({ printers = [], accessories = [], loading = false }) {
  const [activeTab, setActiveTab] = useState("New Arrivals");
  const { addToCart, toggleWishlist, isInWishlist } = useCart();

  const products = useMemo(() => {
    return [...printers, ...accessories];
  }, [printers, accessories]);

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === "string" ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) {
        return `/${imgs[0].replace(/\\/g, "/")}`;
      }
      return "/logo/fabicon.png";
    } catch {
      return "/logo/fabicon.png";
    }
  };

  const tabs = [
    { name: "New Arrivals", slug: "all" },
    { name: "Inkjet", slug: "inkjet-printers" },
    { name: "Laser", slug: "laser-printers" },
    { name: "All-In-One", slug: "all-in-one-printers" },
    { name: "Supertank", slug: "supertank-printers" },
    { name: "Accessories", slug: "printer-accessories" },
  ];

  const filteredProducts = useMemo(() => {
    const currentTab = tabs.find(t => t.name === activeTab);
    if (!currentTab || currentTab.slug === "all") {
      return products.slice(0, 18);
    }

    const filtered = products.filter(p => {
      const categoryMatch = (p.categories || []).some(cat => cat.slug === currentTab.slug);
      const nameMatch = p.name.toLowerCase().includes(activeTab.toLowerCase().replace(' printers', ''));
      return categoryMatch || nameMatch;
    });

    return filtered.length > 0 ? filtered.slice(0, 18) : products.slice(0, 18);
  }, [products, activeTab]);

  const getSalePercent = (product) => {
    const price = parseFloat(product.price || 0);
    const oldPrice = parseFloat(product.compare_price || product.old_price || 0);
    if (oldPrice > price && oldPrice > 0) {
      return `-${Math.round(((oldPrice - price) / oldPrice) * 100)}%`;
    }
    return null;
  };

  return (
    <section className="w-full bg-white py-16 md:py-24 font-['Rubik']">
      <div className="max-w-[1800px] mx-auto px-6">
        
        {/* CENTERED HEADER */}
        <div className="flex flex-col items-center text-center mb-12 md:mb-16">
          <div className="flex items-center gap-3 mb-4 text-[#7EA1A1]">
            <LayoutGrid size={18} />
            <span className="text-[11px] font-semibold uppercase tracking-[0.3em]">Our Collection</span>
          </div>
          <h2 className="text-2xl md:text-4xl font-semibold text-[#37474F] tracking-tight">
            Featured Products
          </h2>
        </div>

        {/* MODERN TABS */}
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`px-6 py-2 text-[13px] md:text-[14px] font-medium rounded-full transition-all duration-300 border ${
                activeTab === tab.name
                  ? "bg-[#7EA1A1] text-white border-[#7EA1A1]"
                  : "bg-white text-[#64748B] border-[#E0E7E7] hover:border-[#7EA1A1] hover:text-[#7EA1A1]"
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* PRODUCTS GRID */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 md:gap-8">
          <AnimatePresence mode="wait">
            {loading
              ? [...Array(12)].map((_, i) => (
                  <div key={i} className="animate-pulse bg-[#F8FAFA] rounded-md aspect-[1/1.4]" />
                ))
              : filteredProducts.map((p) => {
                  const salePercent = getSalePercent(p);
                  return (
                    <motion.div
                      layout
                      key={p.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.4 }}
                      className="group flex flex-col h-full"
                    >
                      {/* IMAGE BOX - INCREASED HEIGHT & THEME TINTED BG */}
                      <div className="relative aspect-[1/1.25] bg-[#F1F5F5] rounded-md overflow-hidden border border-[#E0E7E7]/50 flex items-center justify-center p-4 transition-all duration-500 group-hover:bg-white group-hover:border-[#7EA1A1]/40">
                        <Link to={`/product/${p.slug}`} className="w-full h-full flex items-center justify-center">
                          <img
                            src={getImagePath(p.images)}
                            alt={p.name}
                            className="w-full h-full object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-110"
                            onError={(e) => { e.currentTarget.src = "/logo/fabicon.png"; }}
                          />
                        </Link>

                        {salePercent && (
                          <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#E67E22] text-white text-[10px] font-bold uppercase z-10">
                            {salePercent}
                          </div>
                        )}

                        {/* SIMPLE ACTIONS OVERLAY */}
                        <div className="absolute inset-0 bg-white/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-3">
                          <button
                            onClick={() => addToCart(p)}
                            className="w-10 h-10 rounded-full bg-[#37474F] text-white flex items-center justify-center hover:bg-[#7EA1A1] transition-all"
                          >
                            <ShoppingCart size={16} />
                          </button>
                          <Link
                            to={`/product/${p.slug}`}
                            className="w-10 h-10 rounded-full bg-white border border-[#E0E7E7] text-[#37474F] flex items-center justify-center hover:text-[#7EA1A1] transition-all"
                          >
                            <Eye size={16} />
                          </Link>
                        </div>
                      </div>

                      {/* CONTENT */}
                      <div className="pt-4 flex flex-col flex-1">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[10px] font-semibold uppercase tracking-wider text-[#94A3B8]">
                            Hardware
                          </span>
                          <button 
                            onClick={() => toggleWishlist(p)}
                            className={`transition-colors ${isInWishlist(p.id) ? "text-[#E74C3C]" : "text-[#94A3B8] hover:text-[#E74C3C]"}`}
                          >
                            <Heart size={15} fill={isInWishlist(p.id) ? "currentColor" : "none"} />
                          </button>
                        </div>

                        <Link to={`/product/${p.slug}`}>
                          <h3 className="text-[14px] font-medium text-[#37474F] leading-tight line-clamp-2 hover:text-[#7EA1A1] transition-colors mb-2 min-h-[36px]">
                            {p.name}
                          </h3>
                        </Link>

                        <div className="flex items-center gap-2 mt-auto pt-1">
                          <span className="text-[15px] font-bold text-[#37474F]">
                            ${p.price}
                          </span>
                          {(p.compare_price || p.old_price) && (
                            <span className="text-[12px] text-[#94A3B8] line-through decoration-1">
                              ${p.compare_price || p.old_price}
                            </span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
          </AnimatePresence>
        </div>

        {/* VIEW ALL BUTTON */}
        <div className="mt-16 flex justify-center">
          <Link
            to="/shop"
            className="group px-10 py-3 bg-white border border-[#E0E7E7] text-[#37474F] text-[13px] font-semibold uppercase tracking-wider hover:border-[#7EA1A1] hover:text-[#7EA1A1] transition-all rounded-md flex items-center gap-3"
          >
            View Entire Catalog
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
