import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import { useCart } from '../context/CartContext';
import {
  Heart,
  ChevronRight,
  Truck,
  ShieldCheck,
  Plus,
  Minus,
  ShoppingCart,
  CheckCircle2,
  ArrowLeft,
  Info,
  Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import API_BASE_URL from '../config';

export default function ProductDetail() {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const { slug } = useParams();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);

    fetch(`${API_BASE_URL}/products/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'success') {
          setProduct(data.data);

          const categories = data.data.categories || [];
          const categorySlug = categories.length > 0 ? categories[0].slug : '';

          let fetchUrl = `${API_BASE_URL}/products?limit=6`;
          if (categorySlug) fetchUrl += `&category=${categorySlug}`;

          fetch(fetchUrl)
            .then((res) => res.json())
            .then((relData) => {
              if (relData.status === 'success') {
                setRelatedProducts(relData.data.filter((p) => p.id !== data.data.id));
              }
            });
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  const getImages = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      return Array.isArray(imgs) ? imgs.map((img) => `/${img.replace(/\\/g, '/')}`) : [];
    } catch { return []; }
  };

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) return `/${imgs[0].replace(/\\/g, '/')}`;
    } catch { }
    return '/logo/fabicon.png';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <Loader2 className="animate-spin text-[#7EA1A1]" size={32} />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center px-6">
        <h2 className="text-2xl font-bold text-[#37474F] mb-4">Product Not Found</h2>
        <Link to="/shop" className="text-[#7EA1A1] font-bold">Return to Shop</Link>
      </div>
    );
  }

  const images = getImages(product.images);
  const mainImage = images.length > 0 ? images[activeImage] : '/logo/fabicon.png';

  return (
    <div className="min-h-screen bg-white font-['Rubik'] text-[#37474F] pb-20">
      <SEO title={product.name} />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <nav className="flex items-center gap-2 text-xs font-bold text-[#94A3B8] uppercase tracking-widest mb-12">
          <Link to="/" className="hover:text-[#7EA1A1]">Home</Link>
          <ChevronRight size={14} />
          <Link to="/shop" className="hover:text-[#7EA1A1]">Shop</Link>
          <ChevronRight size={14} />
          <span className="text-[#7EA1A1] truncate max-w-[200px]">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* --- IMAGES --- */}
          <div className="space-y-6">
            <div className="aspect-square bg-[#F8FAFA] border border-[#E0E7E7] rounded-2xl flex items-center justify-center p-8">
              <img src={mainImage} alt={product.name} className="max-w-full max-h-full object-contain mix-blend-multiply" />
            </div>
            {images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`w-20 h-20 rounded-lg border bg-white flex items-center justify-center shrink-0 ${activeImage === idx ? 'border-[#7EA1A1]' : 'border-[#E0E7E7]'}`}
                  >
                    <img src={img} alt="" className="max-w-[80%] max-h-[80%] object-contain mix-blend-multiply" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* --- INFO --- */}
          <div className="space-y-8">
            <div>
              <span className="text-[10px] font-bold text-[#7EA1A1] uppercase tracking-widest block mb-2">Hardware Collection</span>
              <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">{product.name}</h1>
              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold text-[#37474F]">${Number(product.price).toLocaleString()}</span>
                {product.sale_price && <span className="text-lg text-[#94A3B8] line-through">${product.sale_price}</span>}
              </div>
            </div>

            <p className="text-[#64748B] leading-relaxed font-medium">
              {product.description || 'Reliable hardware solution for professional workflows. Designed for performance and efficiency.'}
            </p>

            <div className="pt-6 border-t border-[#F1F5F5] space-y-6">
              <div className="flex gap-4">
                <div className="flex items-center gap-4 bg-[#F8FAFA] border border-[#E0E7E7] rounded-xl px-4 py-3">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="hover:text-[#7EA1A1]"><Minus size={18} /></button>
                  <span className="font-bold w-4 text-center">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="hover:text-[#7EA1A1]"><Plus size={18} /></button>
                </div>
                <button
                  onClick={handleAddToCart}
                  disabled={isAdded}
                  className={`flex-1 h-14 rounded-xl font-bold text-sm uppercase tracking-widest transition-all ${isAdded ? 'bg-emerald-500 text-white' : 'bg-[#37474F] text-white hover:bg-[#7EA1A1]'}`}
                >
                  {isAdded ? 'Added to Cart' : 'Add to Cart'}
                </button>
                <button onClick={() => toggleWishlist(product)} className="w-14 h-14 border border-[#E0E7E7] rounded-xl flex items-center justify-center hover:border-[#7EA1A1] transition-all">
                  <Heart size={20} className={isInWishlist(product.id) ? 'fill-red-500 text-red-500' : 'text-[#94A3B8]'} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="flex items-center gap-3">
                  <Truck size={18} className="text-[#7EA1A1]" />
                  <span className="text-xs font-bold text-[#64748B]">Fast Delivery</span>
                </div>
                <div className="flex items-center gap-3">
                  <ShieldCheck size={18} className="text-[#7EA1A1]" />
                  <span className="text-xs font-bold text-[#64748B]">Brand Warranty</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- RELATED --- */}
        {relatedProducts.length > 0 && (
          <div className="mt-32">
            <h3 className="text-xl font-bold mb-8">Related Products</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {relatedProducts.map((p) => (
                <Link to={`/product/${p.slug}`} key={p.id} className="group">
                  <div className="aspect-square bg-[#F8FAFA] border border-[#E0E7E7] rounded-xl flex items-center justify-center p-4 mb-3 group-hover:border-[#7EA1A1]/30 transition-all">
                    <img src={getImagePath(p.images)} alt="" className="max-w-full max-h-full object-contain mix-blend-multiply" />
                  </div>
                  <h4 className="text-xs font-bold text-[#37474F] line-clamp-2 mb-1 group-hover:text-[#7EA1A1] transition-all">{p.name}</h4>
                  <p className="text-sm font-bold text-[#37474F]">${Number(p.price).toLocaleString()}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Loader2(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`animate-spin ${props.className}`}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}
