import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";

const SkeletonSpotlightItem = () => (
  <div className="block py-6 border-b border-[#F1F5F5] animate-pulse last:border-0">
    <div className="flex items-center gap-4">
      <div className="w-[90px] h-[80px] bg-[#F8FAFA] rounded-md shrink-0"></div>
      <div className="min-w-0 flex-1">
        <div className="h-3 w-16 bg-[#F8FAFA] mb-2 rounded"></div>
        <div className="h-4 w-full bg-[#F8FAFA] mb-2 rounded"></div>
        <div className="h-4 w-24 bg-[#F8FAFA] rounded"></div>
      </div>
    </div>
  </div>
);

const SpotlightBlock = ({ title, data, colIndex, loading = false }) => {
  const perPage = 3;
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(0);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const maxPage = Math.max(0, Math.ceil((data?.length || 0) / perPage) - 1);

  const goPrev = () => {
    setDirection(-1);
    setPage((p) => Math.max(0, p - 1));
  };

  const goNext = () => {
    setDirection(1);
    setPage((p) => Math.min(maxPage, p + 1));
  };

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 15 : -15,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? 15 : -15,
      opacity: 0,
    }),
  };

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

  const pageItems = (data || []).slice(page * perPage, page * perPage + perPage);

  return (
    <div className={`bg-white p-6 md:p-8 ${colIndex < 2 ? "lg:border-r border-[#F1F5F5]" : ""}`}>
      {/* Block Header */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#F1F5F5]">
        <h3 className="text-[16px] font-bold text-[#37474F] tracking-tight">
          {title}
        </h3>

        <div className="flex items-center gap-1.5">
          <button
            onClick={goPrev}
            disabled={page === 0}
            className="w-8 h-8 rounded-full border border-[#E0E7E7] bg-white text-[#94A3B8] hover:text-[#7EA1A1] hover:border-[#7EA1A1] transition-all flex items-center justify-center disabled:opacity-30"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={goNext}
            disabled={page === maxPage}
            className="w-8 h-8 rounded-full border border-[#E0E7E7] bg-white text-[#94A3B8] hover:text-[#7EA1A1] hover:border-[#7EA1A1] transition-all flex items-center justify-center disabled:opacity-30"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div className="overflow-hidden min-h-[380px]">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={page}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            {loading ? (
              [...Array(3)].map((_, i) => <SkeletonSpotlightItem key={`skel-${i}`} />)
            ) : pageItems.length ? (
              pageItems.map((p) => (
                <div
                  key={p.id}
                  className="block py-5 border-b border-[#F1F5F5] last:border-0 group"
                >
                  <div className="flex items-center gap-5">
                    {/* Thumbnail with Tinted BG */}
                    <Link
                      to={`/product/${p.slug}`}
                      className="w-[100px] h-[85px] flex items-center justify-center shrink-0 bg-[#F8FAFA] rounded-md border border-[#F1F5F5] p-3 overflow-hidden transition-all group-hover:border-[#7EA1A1]/30 group-hover:bg-white"
                    >
                      <img
                        src={getImagePath(p.images)}
                        alt={p.name}
                        className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-110"
                        onError={(e) => {
                          e.currentTarget.src = "/logo/fabicon.png";
                        }}
                      />
                    </Link>

                    <div className="min-w-0 flex-1">
                      <Link
                        to={`/product/${p.slug}`}
                        className="block text-[14px] font-semibold text-[#37474F] line-clamp-1 group-hover:text-[#7EA1A1] transition-colors leading-tight mb-1.5"
                      >
                        {p.name}
                      </Link>

                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[15px] font-bold text-[#7EA1A1]">
                          ${Number(p?.price || 0).toFixed(2)}
                        </span>
                        {p.old_price && (
                          <span className="text-[12px] text-[#94A3B8] line-through decoration-1">
                            ${p.old_price}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            addToCart(p);
                          }}
                          className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-[#64748B] hover:text-[#7EA1A1] transition-colors"
                        >
                          <ShoppingCart size={12} />
                          Add
                        </button>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            navigate(`/product/${p.slug}`);
                          }}
                          className="text-[10px] font-black uppercase tracking-wider text-[#64748B] hover:text-[#7EA1A1] transition-colors"
                        >
                          Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-20 text-[#94A3B8] text-[12px] font-medium text-center">
                No items currently trending.
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default function SpotlightSection({
  newArrivals = [],
  topRated = [],
  popular = [],
  loading = false,
}) {
  const normalizeList = (input) => {
    if (Array.isArray(input)) return input;
    if (input && Array.isArray(input.data)) return input.data;
    return [];
  };

  return (
    <section className="w-full font-['Rubik'] py-16 md:py-20 bg-white">
      <div className="max-w-[1800px] mx-auto px-6">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-20">
          <div className="flex items-center gap-3 mb-4 text-[#7EA1A1]">
            <Sparkles size={20} />
            <span className="text-[11px] font-black uppercase tracking-[0.3em]">Trending Now</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-[#37474F] tracking-tight">
            Spotlight Collections
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 border border-[#F1F5F5] rounded-[32px] overflow-hidden">
          <SpotlightBlock
            title="New Arrivals"
            data={normalizeList(newArrivals)}
            colIndex={0}
            loading={loading}
          />
          <SpotlightBlock
            title="Top Rated"
            data={normalizeList(topRated)}
            colIndex={1}
            loading={loading}
          />
          <SpotlightBlock
            title="Popular Products"
            data={normalizeList(popular)}
            colIndex={2}
            loading={loading}
          />
        </div>
      </div>
    </section>
  );
}
