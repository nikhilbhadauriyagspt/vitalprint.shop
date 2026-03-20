import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function ShopByCategory({ categories = [], loading = false }) {
  if (loading) {
    return (
      <section className="w-full py-16 bg-white animate-pulse flex flex-col items-center">
        <div className="h-8 w-48 bg-slate-100 rounded mb-12" />
        <div className="flex gap-10 justify-center w-full max-w-[1800px] px-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="w-28 h-28 bg-slate-50 rounded-full" />
          ))}
        </div>
      </section>
    );
  }

  const printerParent = categories.find(
    (c) => c.slug === "printers" || c.id === 46
  );
  const displayCategories = printerParent ? (printerParent.children || []) : categories;

  const getImagePath = (image) => {
    if (!image) return "/logo/fabicon.png";
    let path = image.startsWith("/") ? image : `/${image}`;
    return path.replace(/\.(jpg|jpeg)$/i, '.png');
  };

  if (!displayCategories || displayCategories.length === 0) return null;

  return (
    <section className="w-full py-16 md:py-24 bg-white font-['Rubik'] overflow-hidden relative group/section">
      <div className="max-w-[1800px] mx-auto px-6 relative">
        
        {/* CENTERED HEADER */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-20">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-[1px] bg-[#7EA1A1]" />
            <span className="text-[11px] font-bold text-[#7EA1A1] uppercase tracking-[0.4em]">Curated Selection</span>
            <div className="w-8 h-[1px] bg-[#7EA1A1]" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-[#37474F] tracking-tight">
            Shop by Category
          </h2>
        </div>

        {/* SLIDER CONTAINER WITH CENTERED NAV */}
        <div className="relative px-0 md:px-12">
          {/* NAVIGATION BUTTONS (Aligned with the icons inside the section gap) */}
          <button className="shop-cat-prev absolute -left-2 md:left-0 top-[64px] -translate-y-1/2 w-11 h-11 rounded-full border border-[#E0E7E7] bg-white shadow-md text-[#37474F] hover:bg-[#7EA1A1] hover:border-[#7EA1A1] hover:text-white transition-all z-30 flex items-center justify-center opacity-0 group-hover/section:opacity-100 hidden md:flex active:scale-90">
            <ChevronLeft size={22} />
          </button>
          <button className="shop-cat-next absolute -right-2 md:right-0 top-[64px] -translate-y-1/2 w-11 h-11 rounded-full border border-[#E0E7E7] bg-white shadow-md text-[#37474F] hover:bg-[#7EA1A1] hover:border-[#7EA1A1] hover:text-white transition-all z-30 flex items-center justify-center shadow-md opacity-0 group-hover/section:opacity-100 hidden md:flex active:scale-90">
            <ChevronRight size={22} />
          </button>

          <Swiper
            modules={[Navigation]}
            navigation={{
              nextEl: ".shop-cat-next",
              prevEl: ".shop-cat-prev",
            }}
            spaceBetween={20}
            slidesPerView={2.2}
            breakpoints={{
              480: { slidesPerView: 3.2, spaceBetween: 25 },
              640: { slidesPerView: 4.2, spaceBetween: 30 },
              1024: { slidesPerView: 5.2, spaceBetween: 35 },
              1280: { slidesPerView: 6.2, spaceBetween: 40 },
              1536: { slidesPerView: 7.2, spaceBetween: 45 },
            }}
            className="!overflow-visible"
          >
            {displayCategories.map((cat) => (
              <SwiperSlide key={cat.id}>
                <Link
                  to={`/shop?category=${cat.slug}`}
                  className="group flex flex-col items-center transition-transform duration-500 hover:-translate-y-2"
                >
                  {/* REFINED CIRCULAR CONTAINER */}
                  <div className="relative w-28 h-28 md:w-32 md:h-32 mb-6 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full border border-[#F1F5F5] bg-[#F8FAFA] group-hover:bg-white group-hover:border-[#7EA1A1]/30 transition-all duration-500" />
                    <div className="absolute inset-2 rounded-full border border-dashed border-[#E0E7E7] group-hover:border-solid group-hover:border-[#7EA1A1]/20 transition-all duration-500" />
                    
                    <img
                      src={getImagePath(cat.image)}
                      alt={cat.name}
                      className="relative z-10 w-[60%] h-[60%] object-contain transition-transform duration-700 group-hover:scale-110"
                      onError={(e) => {
                        e.currentTarget.src = "/logo/fabicon.png";
                      }}
                    />
                  </div>

                  {/* TYPOGRAPHY */}
                  <div className="text-center px-2">
                    <h3 className="text-[14px] md:text-[15px] font-bold text-[#37474F] group-hover:text-[#7EA1A1] transition-colors duration-300 capitalize">
                      {cat.name}
                    </h3>
                    <div className="flex items-center justify-center gap-1.5 mt-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                      <div className="w-1 h-1 rounded-full bg-[#7EA1A1]" />
                      <span className="text-[10px] font-black text-[#94A3B8] uppercase tracking-widest">Explore</span>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* MOBILE NAVIGATION */}
        <div className="flex md:hidden items-center justify-center gap-5 mt-12">
          <button className="shop-cat-prev w-11 h-11 rounded-full border border-[#E0E7E7] bg-white text-[#37474F] flex items-center justify-center shadow-md">
            <ChevronLeft size={20} />
          </button>
          <button className="shop-cat-next w-11 h-11 rounded-full border border-[#E0E7E7] bg-white text-[#37474F] flex items-center justify-center shadow-md">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
