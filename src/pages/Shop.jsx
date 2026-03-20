import { useState, useEffect } from 'react';
import { useSearchParams, Link, useParams, useNavigate } from 'react-router-dom';
import SEO from '@/components/SEO';
import { useCart } from '../context/CartContext';
import {
  Search,
  ChevronDown,
  LayoutGrid,
  List,
  Heart,
  Loader2,
  ChevronRight,
  Plus,
  CheckCircle2,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import API_BASE_URL from '../config';

export default function Shop() {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const { category: pathCategory } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [total, setTotal] = useState(0);
  const [viewMode, setViewMode] = useState('grid');

  const category = searchParams.get('category') || pathCategory || '';
  const sort = searchParams.get('sort') || 'newest';
  const search = searchParams.get('search') || '';

  useEffect(() => {
    fetch(`${API_BASE_URL}/categories`)
      .then((res) => res.json())
      .then((d) => {
        if (d.status === 'success') {
          const printers = d.data.find((c) => c.slug === 'printers' || c.id === 46);
          setCategories(printers ? printers.children : []);
        }
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams(searchParams);
    params.set('limit', '1000');
    params.delete('brand'); 

    fetch(`${API_BASE_URL}/products?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'success') {
          const filteredProducts = data.data.filter(
            (p) =>
              !p.name.toLowerCase().includes('laptop') &&
              !p.name.toLowerCase().includes('macbook') &&
              !p.name.toLowerCase().includes('notebook')
          );
          setProducts(filteredProducts);
          setTotal(filteredProducts.length);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [searchParams]);

  const updateFilter = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) newParams.set(key, value);
    else newParams.delete(key);
    setSearchParams(newParams);
    setActiveDropdown(null);
  };

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

  return (
    <div className="min-h-screen bg-white font-['Rubik'] text-[#37474F]">
      <SEO title="Shop | Harry's Printer Store" />

      {/* --- STANDARD HEADER --- */}
      <div className="border-b border-[#E0E7E7] py-8">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex items-center gap-2 text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest mb-2">
            <Link to="/" className="hover:text-[#7EA1A1]">Home</Link>
            <ChevronRight size={12} />
            <span className="text-[#7EA1A1]">Shop</span>
          </nav>
          <h1 className="text-2xl font-bold text-[#37474F]">All Products</h1>
        </div>
      </div>

      {/* --- SIMPLE FILTER BAR --- */}
      <div className="bg-white border-b border-[#E0E7E7] sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
          
          <div className="flex items-center gap-4 flex-1">
            <div className="relative">
              <button
                onClick={() => setActiveDropdown(activeDropdown === 'cat' ? null : 'cat')}
                className="flex items-center gap-2 px-4 py-2 bg-[#F8FAFA] border border-[#E0E7E7] rounded-lg text-xs font-bold text-[#37474F] hover:border-[#7EA1A1] transition-all"
              >
                {category ? category.replace('-', ' ') : 'All Categories'}
                <ChevronDown size={14} className={activeDropdown === 'cat' ? 'rotate-180' : ''} />
              </button>
              
              <AnimatePresence>
                {activeDropdown === 'cat' && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-full left-0 mt-2 w-56 bg-white border border-[#E0E7E7] rounded-xl shadow-lg p-2 z-50"
                  >
                    <button onClick={() => updateFilter('category', '')} className="w-full text-left px-4 py-2 text-xs font-bold text-[#94A3B8] hover:bg-slate-50 rounded-lg">All Products</button>
                    {categories.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => updateFilter('category', c.slug)}
                        className={`w-full text-left px-4 py-2 text-xs font-medium rounded-lg ${category === c.slug ? 'bg-[#7EA1A1]/10 text-[#7EA1A1]' : 'hover:bg-slate-50 text-[#37474F]'}`}
                      >
                        {c.name}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="relative hidden md:block max-w-xs w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" size={14} />
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => updateFilter('search', e.target.value)}
                className="w-full h-9 pl-9 pr-4 bg-[#F8FAFA] border border-[#E0E7E7] rounded-lg text-xs focus:bg-white focus:border-[#7EA1A1] outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <select
                value={sort}
                onChange={(e) => updateFilter('sort', e.target.value)}
                className="appearance-none h-9 bg-white border border-[#E0E7E7] rounded-lg pl-3 pr-8 text-xs font-bold text-[#37474F] outline-none cursor-pointer"
              >
                <option value="newest">Latest</option>
                <option value="price_low">Price Low</option>
                <option value="price_high">Price High</option>
              </select>
              <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] pointer-events-none" />
            </div>
          </div>

        </div>
      </div>

      {/* --- PRODUCTS GRID --- */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {loading ? (
          <div className="py-24 text-center">
            <Loader2 className="animate-spin text-[#7EA1A1] mx-auto mb-4" size={32} />
            <p className="text-xs font-bold text-[#94A3B8] uppercase">Loading Products...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="py-20 text-center">
            <h2 className="text-xl font-bold text-[#37474F] mb-2">No results.</h2>
            <button onClick={() => navigate('/shop')} className="text-xs font-bold text-[#7EA1A1] underline">Clear all filters</button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {products.map((p) => (
              <div key={p.id} className="group flex flex-col">
                <div className="relative aspect-square rounded-xl bg-[#F8FAFA] border border-[#E0E7E7] overflow-hidden flex items-center justify-center p-4 transition-all hover:bg-white hover:border-[#7EA1A1]/30">
                  <Link to={`/product/${p.slug}`} className="w-full h-full flex items-center justify-center">
                    <img src={getImagePath(p.images)} alt={p.name} className="max-w-full max-h-full object-contain mix-blend-multiply" />
                  </Link>
                  <button onClick={() => toggleWishlist(p)} className="absolute top-2 right-2 p-1.5 rounded-full bg-white shadow-sm transition-all">
                    <Heart size={14} className={isInWishlist(p.id) ? 'text-red-500 fill-red-500' : 'text-slate-300'} />
                  </button>
                </div>

                <div className="mt-3 flex flex-col flex-1">
                  <span className="text-[9px] font-bold text-[#94A3B8] uppercase tracking-widest mb-1">Hardware</span>
                  <Link to={`/product/${p.slug}`}>
                    <h3 className="text-xs font-bold text-[#37474F] leading-tight hover:text-[#7EA1A1] line-clamp-2 h-8 mb-2">{p.name}</h3>
                  </Link>
                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-sm font-bold text-[#37474F]">${Number(p.price).toLocaleString()}</span>
                    <button onClick={() => addToCart(p)} className="text-[10px] font-bold text-[#7EA1A1] uppercase hover:underline">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
