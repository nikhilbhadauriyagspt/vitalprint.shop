import React from 'react';
import SEO from '@/components/SEO';
import {
  ShieldCheck,
  Zap,
  Globe,
  Printer,
  Package,
  ChevronRight,
  CheckCircle2,
  ArrowRight,
  Headphones,
  Leaf,
  Wrench,
  Target,
  Users,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function About() {
  const capabilities = [
    {
      icon: Printer,
      title: "Quality Products",
      desc: "A curated selection of modern printing systems, including all-in-one and high-volume industrial units tailored for efficiency."
    },
    {
      icon: Package,
      title: "Logistics Excellence",
      desc: "Reliable access to ink, toner, and essential replacement parts with efficient nationwide delivery across the country."
    },
    {
      icon: Headphones,
      title: "Professional Support",
      desc: "Experts providing seamless setup guidance, troubleshooting, and long-term maintenance for your hardware."
    }
  ];

  const advantages = [
    { title: "Tested Quality", icon: ShieldCheck },
    { title: "Reliable Parts", icon: Package },
    { title: "Rapid Service", icon: Zap },
    { title: "Secure Logistics", icon: Globe },
    { title: "New Hardware", icon: CheckCircle2 },
    { title: "Expert Care", icon: Headphones },
    { title: "Eco-Tech", icon: Leaf },
    { title: "Service Hub", icon: Wrench }
  ];

  return (
    <div className="min-h-screen bg-white font-['Rubik'] text-[#37474F] pb-14 md:pb-20">
      <SEO
        title="About Us"
        description="Learn about our commitment to printing excellence, our journey, and the core values that drive our professional services."
      />

      {/* PAGE HEADER */}
      <div className="bg-[#F8FAFA] border-b border-[#E0E7E7]">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-10 py-12 md:py-20">
          <div className="flex flex-col gap-6">
            <nav className="flex items-center gap-2 text-[12px] font-bold text-[#94A3B8] uppercase tracking-widest">
              <Link to="/" className="hover:text-[#7EA1A1] transition-colors">
                Home
              </Link>
              <ChevronRight size={14} className="text-[#E0E7E7]" />
              <span className="text-[#7EA1A1]">About Us</span>
            </nav>

            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-[#37474F] mb-6">
                Redefining the <br />
                <span className="text-[#7EA1A1]">Printing Experience.</span>
              </h1>
              <p className="text-lg md:text-xl leading-relaxed text-[#64748B] font-medium">
                We bridge the gap between advanced technology and a seamless user experience, ensuring your workspace stays productive and efficient.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1800px] mx-auto px-6 lg:px-10 py-12 md:py-20 space-y-16 md:space-y-24">
        {/* VISION SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#7EA1A1]/10 text-[#7EA1A1] rounded-full mb-6 text-[11px] font-black uppercase tracking-widest">
              Our Vision
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#37474F] mb-6 tracking-tight">
              Built on Transparency <br /> and  Precision.
            </h2>
            <p className="text-base md:text-lg text-[#64748B] leading-relaxed mb-8 font-medium">
              Established in 2026, Harry's Printer Store was founded to simplify the acquisition of high-performance printing infrastructure. We believe that technology should be accessible, reliable, and straightforward.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-3 bg-[#37474F] text-white px-8 py-4 text-[14px] font-bold uppercase tracking-wider rounded-xl hover:bg-[#7EA1A1] transition-all shadow-xl shadow-[#37474F]/10"
            >
              Explore Collection
              <ArrowRight size={18} />
            </Link>
          </div>
          <div className="bg-[#F8FAFA] p-8 md:p-12 rounded-[40px] border border-[#E0E7E7]/50">
            <p className="text-base md:text-lg text-[#64748B] leading-relaxed font-medium italic">
              "Our goal is to provide a destination where professionals can find top-tier hardware without complexity. Every piece of equipment we offer is selected for its durability and performance value."
            </p>
          </div>
        </div>

        {/* CORE CAPABILITIES */}
        <div className="space-y-12">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-[#37474F] mb-4">Core Capabilities</h2>
            <div className="w-12 h-1 bg-[#7EA1A1] mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {capabilities.map((item, i) => (
              <div
                key={i}
                className="p-8 md:p-10 bg-white border border-[#E0E7E7] rounded-[32px] hover:border-[#7EA1A1]/30 transition-all group"
              >
                <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-[#F8FAFA] text-[#7EA1A1] mb-6 group-hover:bg-[#7EA1A1] group-hover:text-white transition-all duration-500">
                  <item.icon size={26} strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold text-[#37474F] mb-4">
                  {item.title}
                </h3>
                <p className="text-[15px] text-[#64748B] leading-relaxed font-medium">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* MISSION + REACH */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-[#37474F] p-10 md:p-14 rounded-[40px] text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Target size={120} />
            </div>
            <div className="relative z-10">
              <span className="text-[11px] font-black uppercase tracking-widest opacity-60 mb-4 block">Our Mission</span>
              <h3 className="text-2xl md:text-3xl font-bold mb-6">Empowering Modern Workspaces.</h3>
              <p className="text-lg opacity-80 leading-relaxed font-normal">
                To equip professionals with dependable and sustainable hardware solutions. We provide expert advice and high-quality products to ensure your operations never slow down.
              </p>
            </div>
          </div>

          <div className="bg-[#7EA1A1] p-10 md:p-14 rounded-[40px] text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Users size={120} />
            </div>
            <div className="relative z-10">
              <span className="text-[11px] font-black uppercase tracking-widest opacity-60 mb-4 block">Our Reach</span>
              <h3 className="text-2xl md:text-3xl font-bold mb-6">Nationwide Support Network.</h3>
              <p className="text-lg opacity-80 leading-relaxed font-normal">
                Serving the entire United States with a commitment to fast logistics and long-term service value. Our support team is always available to assist with your needs.
              </p>
            </div>
          </div>
        </div>

        {/* ADVANTAGE SECTION */}
        <div className="space-y-12">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-[#37474F] mb-4">The Advantage</h2>
            <div className="w-12 h-1 bg-[#7EA1A1] mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {advantages.map((item, i) => (
              <div
                key={i}
                className="group flex flex-col items-center text-center gap-4 p-8 bg-[#F8FAFA] rounded-3xl border border-transparent hover:border-[#7EA1A1]/30 hover:bg-white transition-all duration-500"
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white text-[#94A3B8] shadow-sm group-hover:text-[#7EA1A1] transition-all">
                  <item.icon size={22} strokeWidth={1.5} />
                </div>
                <h4 className="text-[14px] md:text-[15px] font-bold text-[#37474F]">
                  {item.title}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
