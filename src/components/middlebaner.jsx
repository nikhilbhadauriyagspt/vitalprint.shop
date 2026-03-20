import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function PrinterPromoSection() {
    return (
        <section className="w-full py-10 bg-white font-['Rubik']">
            <div className="max-w-[1800px] mx-auto px-6 lg:px-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Left Banner */}
                    <div
                        className="relative overflow-hidden min-h-[250px] md:min-h-[350px] flex items-center bg-cover bg-center border border-[#E0E7E7]"
                        style={{
                            backgroundImage: "url('/banner/printer-banner-3.jpg')",
                        }}
                    >
                        <div className="relative z-10 px-10 py-8 text-white">
                            <h2 className="text-xl md:text-3xl font-bold leading-tight">
                                High-Performance <br /> Business Systems
                            </h2>
                            <Link to="/shop" className="mt-6 inline-flex items-center gap-2 border border-white px-6 py-2.5 text-[12px] font-bold uppercase tracking-wider hover:bg-white hover:text-[#37474F] transition-all">
                                Shop Now
                                <ArrowRight size={16} />
                            </Link>
                        </div>
                    </div>

                    {/* Right Banner */}
                    <div
                        className="relative overflow-hidden min-h-[250px] md:min-h-[350px] flex items-center bg-cover bg-center border border-[#E0E7E7]"
                        style={{
                            backgroundImage: "url('/banner/printer-banner-4.jpg')",
                        }}
                    >
                        <div className="relative z-10 px-10 py-8 text-white">
                            <h2 className="text-xl md:text-3xl font-bold leading-tight">
                                Next-Gen Ink Tank <br /> Technology
                            </h2>
                            <Link to="/shop" className="mt-6 inline-flex items-center gap-2 border border-white px-6 py-2.5 text-[12px] font-bold uppercase tracking-wider hover:bg-white hover:text-[#37474F] transition-all">
                                Shop Now
                                <ArrowRight size={16} />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
