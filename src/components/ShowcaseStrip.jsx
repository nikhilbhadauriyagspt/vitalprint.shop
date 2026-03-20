import React from "react";
import {
  Truck,
  ShieldCheck,
  Headphones,
  CreditCard,
  RefreshCcw,
} from "lucide-react";

export default function ServiceHighlights() {
  const items = [
    {
      id: 1,
      icon: Truck,
      title: "Free Shipping",
      subtitle: "On all printer orders",
    },
    {
      id: 2,
      icon: RefreshCcw,
      title: "Money Guarantee",
      subtitle: "7 days return policy",
    },
    {
      id: 3,
      icon: ShieldCheck,
      title: "Safe Shopping",
      subtitle: "100% secure checkout",
    },
    {
      id: 4,
      icon: Headphones,
      title: "Expert Support",
      subtitle: "Dedicated tech help",
    },
    {
      id: 5,
      icon: CreditCard,
      title: "Secure Payment",
      subtitle: "Multiple safe options",
    },
  ];

  return (
    <div className="w-full bg-white border-b border-[#E0E7E7]">
      <div className="max-w-[1800px] mx-auto px-6 py-8 md:py-10">
        <div className="flex flex-wrap lg:flex-nowrap items-center justify-between gap-8 lg:gap-0">
          {items.map((item, index) => (
            <React.Fragment key={item.id}>
              <div className="flex items-center gap-4 group cursor-default flex-1 min-w-[200px] lg:justify-center">
                <div className="w-12 h-12 rounded-full bg-[#F8FAFA] flex items-center justify-center text-[#7EA1A1] group-hover:bg-[#7EA1A1] group-hover:text-white transition-all duration-300 shrink-0">
                  <item.icon size={22} strokeWidth={1.5} />
                </div>
                <div className="flex flex-col">
                  <h4 className="text-[14px] font-bold text-[#37474F] leading-tight">
                    {item.title}
                  </h4>
                  <p className="text-[12px] text-[#94A3B8] font-medium mt-0.5">
                    {item.subtitle}
                  </p>
                </div>
              </div>
              
              {/* VERTICAL DIVIDER (Hidden on mobile/small screens) */}
              {index !== items.length - 1 && (
                <div className="hidden lg:block w-px h-10 bg-[#E0E7E7] mx-4" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
