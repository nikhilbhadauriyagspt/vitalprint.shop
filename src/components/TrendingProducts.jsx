import { motion } from "framer-motion";
import { Star, ShoppingCart, ArrowRight, TrendingUp } from "lucide-react";
import { Link } from 'react-router-dom';

const products = [
  {
    name: "HP LaserJet Pro MFP",
    tag: "Top Rated",
    price: "$349",
    image: "/category/all-in-one-printers.png",
    rating: "4.9"
  },
  {
    name: "Epson EcoTank L3250",
    tag: "Best Seller",
    price: "$299",
    image: "/category/inkjet-printers.png",
    rating: "4.8"
  },
  {
    name: "Brother HL-L2350DW",
    tag: "Most Popular",
    price: "$199",
    image: "/category/laser-printers.png",
    rating: "4.7"
  },
  {
    name: "Canon PIXMA G3010",
    tag: "New Arrival",
    price: "$249",
    image: "/category/supertank-printers.png",
    rating: "4.9"
  }
];

export default function TrendingProducts() {
  return (
    <section className="w-full py-16 md:py-24 bg-white font-['Rubik'] overflow-hidden">
      <div className="max-w-[1800px] mx-auto px-6">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3 text-[#7EA1A1]">
              <TrendingUp size={20} />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em]">High Demand</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#37474F] tracking-tight">
              Trending <span className="text-[#7EA1A1]">Now.</span>
            </h2>
          </div>

          <Link 
            to="/shop" 
            className="group flex items-center gap-2 text-[13px] font-bold text-[#94A3B8] hover:text-[#7EA1A1] transition-all uppercase tracking-wider"
          >
            Explore All Products
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* PRODUCTS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {products.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="group"
            >
              {/* IMAGE CONTAINER */}
              <div className="relative aspect-square rounded-[32px] bg-[#F8FAFA] border border-[#E0E7E7]/50 flex items-center justify-center p-8 overflow-hidden transition-all duration-500 group-hover:bg-white group-hover:shadow-[0_20px_50px_rgba(126,161,161,0.12)] group-hover:border-[#7EA1A1]/20">
                <img
                  src={p.image}
                  className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110 drop-shadow-md"
                  alt={p.name}
                />
                
                {/* FLOATING TAG */}
                <span className="absolute top-5 left-5 text-[9px] font-black uppercase tracking-widest bg-white text-[#37474F] px-3.5 py-1.5 rounded-full shadow-sm border border-[#E0E7E7]/50 group-hover:border-[#7EA1A1]/30 transition-colors">
                  {p.tag}
                </span>

                {/* QUICK ADD BUTTON */}
                <button className="absolute bottom-5 right-5 w-11 h-11 rounded-full bg-white text-[#37474F] flex items-center justify-center shadow-lg opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 hover:bg-[#7EA1A1] hover:text-white transition-all duration-300">
                  <ShoppingCart size={18} strokeWidth={2} />
                </button>
              </div>

              {/* PRODUCT INFO */}
              <div className="mt-6 px-2">
                <div className="flex items-center gap-1.5 mb-2">
                  <div className="flex items-center gap-0.5 text-amber-400">
                    <Star size={12} fill="currentColor" />
                  </div>
                  <span className="text-[12px] font-bold text-[#94A3B8]">{p.rating}</span>
                </div>
                
                <h4 className="text-[16px] font-bold text-[#37474F] group-hover:text-[#7EA1A1] transition-colors line-clamp-1 mb-2">
                  {p.name}
                </h4>
                
                <div className="flex items-center justify-between">
                  <span className="text-[18px] font-black text-[#37474F]">{p.price}</span>
                  <span className="text-[11px] font-bold text-[#7EA1A1] uppercase tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity">
                    In Stock
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
