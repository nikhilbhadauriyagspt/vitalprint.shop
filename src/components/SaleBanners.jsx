import { ArrowRight, Printer, Settings, Package } from "lucide-react";
import { Link } from "react-router-dom";

export default function SaleBanners() {
  return (
    <section className="w-full py-6 md:py-8 bg-white font-['Rubik']">
      <div className="max-w-full mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">

          {/* Banner 1: Laser Printers */}
          <Link to="/shop?category=laser-printers" className="relative overflow-hidden bg-[#FF2D37] p-8 md:p-10 min-h-[260px] flex flex-col justify-center group rounded-[2rem] transition-all duration-500">
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl transition-all duration-700"></div>
            <div className="relative z-10">
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 text-white text-[10px] font-black uppercase tracking-[2px] rounded-md mb-4">
                Quality series
              </span>
              <h3 className="text-2xl md:text-3xl font-black text-white leading-tight mb-4 capitalize">
                Professional <br /> laser printers
              </h3>
              <p className="text-white/80 text-base font-medium mb-6 max-w-[280px]">
                High-volume efficiency for modern business environments.
              </p>
              <div className="inline-flex items-center gap-2 text-white font-black text-xs uppercase tracking-widest transition-all">
                <span>View collection</span> <ArrowRight size={16} />
              </div>
            </div>
          </Link>

          {/* Banner 2: All-In-One */}
          <Link to="/shop?category=all-in-one-printers" className="relative overflow-hidden bg-[#0f172a] p-8 md:p-10 min-h-[260px] flex flex-col justify-center group rounded-[2rem] transition-all duration-500">
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary/10 rounded-full -mb-32 -mr-32 blur-3xl transition-all duration-700"></div>
            <div className="relative z-10">
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 text-[#FF2D37] text-[10px] font-black uppercase tracking-[2px] rounded-md mb-4 border border-white/10">
                Multi-functional
              </span>
              <h3 className="text-2xl md:text-3xl font-black text-white leading-tight mb-4 capitalize">
                All-in-one <br /> smart systems
              </h3>
              <p className="text-slate-400 text-base font-medium mb-6 max-w-[280px]">
                Print, scan, and copy seamlessly with wireless connectivity.
              </p>
              <div className="inline-flex items-center gap-2 text-[#FF2D37] font-black text-xs uppercase tracking-widest transition-all">
                <span>Explore features</span> <ArrowRight size={16} />
              </div>
            </div>
          </Link>

          {/* Banner 3: Inkjet */}
          <Link to="/shop?category=inkjet-printers" className="relative overflow-hidden bg-[#6366f1] p-8 md:p-10 min-h-[260px] flex flex-col justify-center group rounded-[2rem] transition-all duration-500 md:col-span-2 lg:col-span-1">
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-48 h-48 bg-white/10 rotate-45 -mr-24 transition-all duration-700"></div>
            <div className="relative z-10">
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 text-white text-[10px] font-black uppercase tracking-[2px] rounded-md mb-4">
                Creative tech
              </span>
              <h3 className="text-2xl md:text-3xl font-black text-white leading-tight mb-4 capitalize">
                High-quality inkjet <br /> technology
              </h3>
              <p className="text-white/80 text-base font-medium mb-6 max-w-[280px]">
                Vibrant colors and sharp details for professional results.
              </p>
              <div className="inline-flex items-center gap-2 text-white font-black text-xs uppercase tracking-widest transition-all">
                <span>Shop inkjet</span> <ArrowRight size={16} />
              </div>
            </div>
          </Link>

        </div>
      </div>
    </section>
  );
}
