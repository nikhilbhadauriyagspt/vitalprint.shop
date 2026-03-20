import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function PromoSection() {
  return (
    <section className="w-full bg-white py-10 md:py-16 font-['Rubik']">
      <div className="max-w-[1800px] mx-auto px-6">
        <div className="w-full relative min-h-[350px] md:h-[550px] flex items-center overflow-hidden">
          {/* BACKGROUND IMAGE - middlebaner-new.jpg */}
          <img
            src="/banner/middlebaner-new.jpg"
            alt="Promotion"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />

          <div className="relative z-10 w-full px-8 md:px-16">
            <div className="max-w-xl">
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#7EA1A1] mb-3 block">
                Exclusive Deals
              </span>

              <h2 className="text-3xl md:text-5xl font-bold leading-tight text-[#37474F] mb-5">
                Precision Printing <br />
                For Modern Workspaces.
              </h2>

              <p className="text-base md:text-lg text-[#64748B] mb-8 max-w-md font-medium leading-relaxed">
                Discover high-performance hardware and quality supplies designed for superior quality and maximum productivity.
              </p>

              <div className="flex items-center gap-4">
                <Link
                  to="/shop"
                  className="px-8 py-3.5 bg-[#37474F] text-white text-[13px] font-bold uppercase tracking-widest hover:bg-[#7EA1A1] transition-all flex items-center gap-2"
                >
                  Shop Now
                  <ArrowRight size={16} />
                </Link>

                <Link
                  to="/contact"
                  className="px-8 py-3.5 border border-[#37474F] text-[#37474F] text-[13px] font-bold uppercase tracking-widest hover:bg-[#37474F] hover:text-white transition-all"
                >
                  Get Support
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
