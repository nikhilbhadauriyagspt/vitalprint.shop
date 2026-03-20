import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Plus,
  ArrowRight,
  ShoppingBag,
  CheckCircle2
} from 'lucide-react';
import API_BASE_URL from '../config';
import { useCart } from '../context/CartContext';

import 'swiper/css';
import 'swiper/css/navigation';

export default function CategorySpotlight({
  categorySlug = 'laser-printers',
  title = 'Accessories',
  imagePosition = 'left'
}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const navigate = useNavigate();

  const bannerImages = useMemo(
    () => [
      '/banner/accessories-banner-1.jpg',
      '/banner/accessories-banner-2.jpg',
      '/banner/accessories-banner-3.jpg',
    ],
    []
  );

  const bannerImage = useMemo(() => {
    const index = Math.abs(
      categorySlug.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
    ) % bannerImages.length;
    return bannerImages[index];
  }, [categorySlug, bannerImages]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/products?category=${categorySlug}&limit=12`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'success') {
          setProducts(data.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [categorySlug]);

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) {
        return `/${imgs[0].replace(/\\/g, '/')}`;
      }
      return '/logo/fabicon.png';
    } catch {
      return '/logo/fabicon.png';
    }
  };

  if (loading || products.length === 0) return null;

  const prevClass = `prev-${categorySlug}`;
  const nextClass = `next-${categorySlug}`;

  return (
    <section className="w-full py-20 md:py-28 font-['Rubik'] bg-white">
      <div className="max-w-full mx-auto px-6 lg:px-24">

        {/* REFINED SECTION HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-[#FF2D37]"></div>
              <span className="text-[11px] font-black text-[#FF2D37] uppercase tracking-[0.4em]">Expert Selection</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter">
              {title} <span className="italic font-light text-[#FF2D37]">Spotlight</span>
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button className={`${prevClass} w-12 h-12 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-all cursor-pointer hover:border-slate-300 bg-white`}>
              <ChevronLeft size={20} />
            </button>
            <button className={`${nextClass} w-12 h-12 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-all cursor-pointer hover:border-slate-300 bg-white`}>
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className={`flex flex-col xl:flex-row gap-10 xl:gap-12 ${imagePosition === 'right' ? 'xl:flex-row-reverse' : ''}`}>

          {/* STATIC BANNER */}
          <div className="w-full xl:w-[28%] shrink-0">
            <div className="relative h-[500px] xl:h-[650px] overflow-hidden rounded-2xl group">
              <img
                src={bannerImage}
                alt={title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

              <div className="absolute inset-0 p-10 flex flex-col justify-end">
                <span className="text-[10px] font-black text-white/60 uppercase tracking-[0.3em] mb-4">Department</span>
                <h3 className="text-3xl md:text-4xl font-black text-white capitalize mb-6 leading-tight">
                  Professional <br /> {title}
                </h3>
                <Link
                  to={`/shop?category=${categorySlug}`}
                  className="inline-flex items-center gap-3 w-fit bg-white text-slate-900 px-8 py-4 rounded-full text-[12px] font-black uppercase tracking-widest hover:bg-[#FF2D37] hover:text-white transition-all duration-500"
                >
                  Shop Now
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>

          {/* PRODUCT SINGLE ROW SLIDER */}
          <div className="flex-1 min-w-0">
            <Swiper
              key={categorySlug}
              modules={[Navigation]}
              navigation={{
                nextEl: `.${nextClass}`,
                prevEl: `.${prevClass}`,
              }}
              spaceBetween={25}
              slidesPerView={1.2}
              breakpoints={{
                640: { slidesPerView: 2.2, spaceBetween: 20 },
                1024: { slidesPerView: 3.2, spaceBetween: 25 },
                1440: { slidesPerView: 4, spaceBetween: 25 },
              }}
              className="category-spotlight-swiper h-full"
            >
              {products.map((p) => (
                <SwiperSlide key={p.id} className="h-auto">
                  <div className="group h-full flex flex-col">

                    {/* Image Area */}
                    <div className="relative aspect-[3/4] mb-6 bg-gray-200 border border-transparent rounded-2xl overflow-hidden flex items-center justify-center p-8 transition-all duration-500 group-hover:bg-white group-hover:border-slate-100">
                      <Link
                        to={`/product/${p.slug}`}
                        className="w-full h-full flex items-center justify-center"
                      >
                        <img
                          src={getImagePath(p.images)}
                          alt={p.name}
                          className="w-full h-full object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-105"
                          onError={(e) => {
                            e.currentTarget.src = '/logo/fabicon.png';
                          }}
                        />
                      </Link>

                      <button
                        onClick={() => toggleWishlist(p)}
                        className={`absolute top-4 right-4 w-9 h-9 rounded-xl bg-white/80 backdrop-blur-sm border border-slate-100 flex items-center justify-center transition-all ${isInWishlist(p.id) ? 'text-red-500' : 'text-slate-400 hover:text-red-500'}`}
                      >
                        <Heart size={16} className={isInWishlist(p.id) ? 'fill-red-500' : ''} />
                      </button>
                    </div>

                    {/* Content */}
                    <div className="px-2 flex flex-col flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[9px] font-black text-[#FF2D37] uppercase tracking-widest">
                          {p.brand_name || 'Hardware'}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          <span className="text-[9px] font-bold text-slate-400 uppercase">Available</span>
                        </div>
                      </div>

                      <Link to={`/product/${p.slug}`}>
                        <h3 className="text-[15px] font-bold text-slate-800 leading-tight line-clamp-2 min-h-[40px] mb-4 group-hover:text-[#FF2D37] transition-colors">
                          {p.name}
                        </h3>
                      </Link>

                      {/* Technical Points - Light */}
                      <div className="space-y-1.5 mb-6">
                        {["Industrial grade", "Supplies"].map((pt, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <CheckCircle2 size={12} className="text-[#FF2D37] opacity-40" />
                            <span className="text-[11px] font-bold text-slate-500/80">{pt}</span>
                          </div>
                        ))}
                      </div>

                      <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-50">
                        <span className="text-xl font-black text-slate-900 tracking-tight">
                          ${Number(p.price).toFixed(2)}
                        </span>
                        <button
                          onClick={() => addToCart(p)}
                          className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center hover:bg-[#FF2D37] transition-all"
                        >
                          <ShoppingBag size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}
