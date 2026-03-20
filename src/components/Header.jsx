import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useCart } from '../context/CartContext';
import API_BASE_URL from '../config';
import {
  Search,
  User,
  Heart,
  ShoppingCart,
  Menu,
  X,
  ChevronDown,
  LayoutGrid,
  Mail,
  ArrowRight,
  Headphones,
  Phone,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const { cartCount, wishlistCount, openCartDrawer } = useCart();
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const searchRef = useRef(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/categories`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'success') {
          const printerParent = data.data.find(
            (cat) => cat.slug === 'printers' || cat.id === 46
          );
          if (printerParent && printerParent.children) {
            setCategories(printerParent.children);
          }
        }
      })
      .catch((err) => console.error(err));

    const checkUser = () => {
      const storedUser = localStorage.getItem('user');
      setUser(storedUser ? JSON.parse(storedUser) : null);
    };

    checkUser();
    window.addEventListener('storage', checkUser);

    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('storage', checkUser);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchValue.length > 1) {
        setIsLoading(true);
        fetch(`${API_BASE_URL}/products?search=${encodeURIComponent(searchValue)}`)
          .then((res) => res.json())
          .then((data) => {
            if (data.status === 'success') {
              setSearchResults(data.data);
            } else {
              setSearchResults([]);
            }
            setIsLoading(false);
          })
          .catch((err) => {
            console.error(err);
            setSearchResults([]);
            setIsLoading(false);
          });
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchValue]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'FAQ', path: '/faq' },
  ];

  const handleSearchTrigger = (term) => {
    const searchParam = term || searchValue;
    if (searchParam.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchParam.trim())}`);
      setIsSearchFocused(false);
      setSearchValue(searchParam);
    }
  };

  const getImagePath = (product) => {
    let imagePath = '/logo/fabicon.png';
    try {
      const images = JSON.parse(product.images);
      if (images && images.length > 0) {
        imagePath = `/${images[0].replace(/\\/g, '/')}`;
      }
    } catch (e) { }
    return imagePath;
  };

  return (
    <header className="w-full font-['Rubik'] relative z-[1000]">
      {/* LAYER 1: WHITE BACKGROUND - LOGO, SEARCH, ICONS */}
      <div className="bg-white">
        <div className="max-w-[1800px] mx-auto px-4 md:px-6 py-4 md:py-6 flex items-center justify-between gap-6 md:gap-12">
          {/* LOGO */}
          <Link to="/" className="shrink-0">
            <img src="/logo/logo.png" alt="Logo" className="h-8 md:h-11 object-contain" />
          </Link>

          {/* SEARCH BAR */}
          <div ref={searchRef} className="hidden lg:flex flex-1 max-w-[700px] relative">
            <div className="w-full relative group">
              <div className={`relative h-[46px] rounded-lg border transition-all duration-300 flex items-center bg-[#F8FAFA] ${isSearchFocused ? 'border-[#7EA1A1] bg-white ring-2 ring-[#7EA1A1]/10' : 'border-[#E0E7E7] hover:border-[#7EA1A1]/50'}`}>
                <input
                  type="text"
                  placeholder="Search for products, brands..."
                  className="w-full h-full bg-transparent pl-5 pr-12 text-[14px] text-[#37474F] outline-none placeholder:text-[#94A3B8] font-medium"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearchTrigger()}
                />
                <button 
                  onClick={() => handleSearchTrigger()}
                  className="absolute right-0 h-full w-[50px] flex items-center justify-center text-[#94A3B8] hover:text-[#7EA1A1] transition-colors"
                >
                  <Search size={20} />
                </button>
              </div>

              <AnimatePresence>
                {isSearchFocused && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-[calc(100%+8px)] left-0 w-full bg-white border border-[#E0E7E7] rounded-xl shadow-2xl z-[2200] overflow-hidden"
                  >
                    <div className="p-4">
                      {searchValue.length > 1 ? (
                        <>
                          <div className="flex items-center justify-between mb-4 px-2">
                            <span className="text-[11px] font-bold text-[#94A3B8] uppercase">Top Results</span>
                            {isLoading && <div className="w-4 h-4 border-2 border-[#7EA1A1]/20 border-t-[#7EA1A1] rounded-full animate-spin" />}
                          </div>
                          {searchResults.length > 0 ? (
                            <div className="space-y-1 max-h-[350px] overflow-y-auto custom-scrollbar">
                              {searchResults.map((product) => (
                                <Link
                                  key={product.id}
                                  to={`/product/${product.slug}`}
                                  onClick={() => setIsSearchFocused(false)}
                                  className="flex items-center gap-4 p-2 rounded-lg hover:bg-[#F8FAFA] transition-all group/item"
                                >
                                  <div className="w-12 h-12 rounded bg-white border border-[#E0E7E7] flex items-center justify-center shrink-0">
                                    <img src={getImagePath(product)} alt="" className="w-full h-full object-contain p-1.5" />
                                  </div>
                                  <div className="min-w-0">
                                    <p className="text-[14px] font-semibold text-[#37474F] truncate group-hover/item:text-[#7EA1A1]">{product.name}</p>
                                    <p className="text-[14px] font-bold text-[#7EA1A1] mt-0.5">${product.price}</p>
                                  </div>
                                </Link>
                              ))}
                            </div>
                          ) : !isLoading && (
                            <p className="text-[13px] text-[#94A3B8] text-center py-6">No matches found for "{searchValue}"</p>
                          )}
                        </>
                      ) : (
                        <div className="px-2 pb-2">
                          <p className="text-[11px] font-bold text-[#94A3B8] uppercase mb-3">Popular searches</p>
                          <div className="flex flex-wrap gap-2">
                            {['EcoTank', 'LaserJet', 'Brother', 'Cartridge'].map((tag) => (
                              <button
                                key={tag}
                                onClick={() => handleSearchTrigger(tag)}
                                className="px-4 py-1.5 rounded-full border border-[#E0E7E7] text-[13px] font-medium text-[#64748B] hover:border-[#7EA1A1] hover:text-[#7EA1A1] transition-all"
                              >
                                {tag}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* ICONS */}
          <div className="flex items-center gap-4 md:gap-8">
            <Link to={user ? '/profile' : '/login'} className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full border border-[#E0E7E7] flex items-center justify-center text-[#37474F] group-hover:bg-[#7EA1A1] group-hover:border-[#7EA1A1] group-hover:text-white transition-all">
                <User size={20} />
              </div>
              <div className="hidden xl:block">
                <p className="text-[11px] text-[#94A3B8] font-medium uppercase leading-none">Hello, Sign In</p>
                <p className="text-[13px] font-semibold text-[#37474F] mt-1">My Account</p>
              </div>
            </Link>

            <Link to="/wishlist" className="relative group">
              <div className="w-10 h-10 rounded-full border border-[#E0E7E7] flex items-center justify-center text-[#37474F] group-hover:bg-[#7EA1A1] group-hover:border-[#7EA1A1] group-hover:text-white transition-all">
                <Heart size={20} />
              </div>
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#7EA1A1] text-white text-[10px] font-bold flex items-center justify-center border-2 border-white shadow-sm">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <button onClick={openCartDrawer} className="relative group flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#37474F] flex items-center justify-center text-white group-hover:bg-[#7EA1A1] transition-all">
                <ShoppingCart size={20} />
              </div>
              <div className="hidden xl:block text-left">
                <p className="text-[11px] text-[#94A3B8] font-medium uppercase leading-none">Your Cart</p>
                <p className="text-[13px] font-semibold text-[#37474F] mt-1">${cartCount > 0 ? 'View Cart' : '0.00'}</p>
              </div>
              {cartCount > 0 && (
                <span className="absolute -top-1 left-7 w-5 h-5 rounded-full bg-[#7EA1A1] text-white text-[10px] font-bold flex items-center justify-center border-2 border-white shadow-sm">
                  {cartCount}
                </span>
              )}
            </button>
            <button className="xl:hidden text-[#37474F]" onClick={() => setIsMobileMenuOpen(true)}>
              <Menu size={28} />
            </button>
          </div>
        </div>
      </div>

      {/* LAYER 2: SOLID MAIN COLOR BACKGROUND - CATEGORIES & NAVIGATION */}
      <div className="bg-[#7EA1A1]">
        <div className="max-w-[1800px] mx-auto px-4 md:px-6 h-[50px] flex items-center justify-between">
          <div className="flex items-center h-full gap-4 md:gap-10">
            {/* CATEGORIES BUTTON */}
            <div
              className="relative h-full"
              onMouseEnter={() => setIsCategoryOpen(true)}
              onMouseLeave={() => setIsCategoryOpen(false)}
            >
              <button className="h-full flex items-center gap-3 px-4 md:px-6 bg-black/5 text-white font-semibold text-[14px] uppercase hover:bg-black/10 transition-all">
                <LayoutGrid size={18} />
                Categories
                <ChevronDown size={14} className={`transition-transform duration-300 ${isCategoryOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isCategoryOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 w-[260px] bg-white border border-[#E0E7E7] shadow-2xl z-[2200] overflow-hidden py-2"
                  >
                    {categories.map((cat) => (
                      <Link
                        key={cat.id}
                        to={`/shop?category=${cat.slug}`}
                        className="flex items-center justify-between px-6 py-3 text-[14px] font-semibold text-[#64748B] hover:bg-[#F8FAFA] hover:text-[#7EA1A1] transition-all"
                      >
                        {cat.name}
                        <ArrowRight size={14} className="opacity-30" />
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* NAVIGATION LINKS */}
            <nav className="hidden lg:flex items-center h-full">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`px-5 h-full flex items-center text-[13px] font-semibold text-white uppercase transition-all relative hover:bg-white/10 ${
                      isActive ? 'bg-white/20' : ''
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <div className="absolute bottom-0 left-0 w-full h-[3px] bg-white" />
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="hidden sm:flex items-center gap-6 text-white">
            <div className="flex items-center gap-3">
              <Mail size={16} />
              <div className="flex flex-col">
                <span className="text-[10px] opacity-80 uppercase leading-none font-medium">Email Support</span>
                <span className="text-[13px] font-semibold mt-1">info@harryprinterstore.shop</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE MENU DRAWER */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-[2000]"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              className="fixed top-0 left-0 bottom-0 w-[85%] max-w-[340px] bg-white z-[2100] flex flex-col"
            >
              <div className="p-5 border-b border-[#efefef] flex items-center justify-between">
                <img src="/logo/logo.png" alt="Logo" className="h-8 object-contain" />
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-9 h-9 rounded-full border border-[#e0e0e0] flex items-center justify-center text-[#444]"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-5">
                <div className="mb-8">
                  <h3 className="text-[11px] font-semibold uppercase text-[#999] mb-4">
                    Navigation
                  </h3>
                  <div className="space-y-1">
                    {navLinks.map((link) => (
                      <Link
                        key={link.name}
                        to={link.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block py-3.5 text-[15px] font-semibold text-[#222] border-b border-[#f3f3f3] last:border-0"
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-[11px] font-semibold uppercase text-[#999] mb-4">
                    Categories
                  </h3>
                  <div className="space-y-1">
                    {categories.map((cat) => (
                      <Link
                        key={cat.id}
                        to={`/shop?category=${cat.slug}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block py-3 text-[14px] font-semibold text-[#555] capitalize"
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-5 border-t border-[#efefef] bg-[#fafafa]">
                <Link
                  to={user ? '/profile' : '/login'}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 text-[14px] font-semibold text-[#222]"
                >
                  <div className="w-9 h-9 rounded-full bg-white border border-[#e0e0e0] flex items-center justify-center">
                    <User size={16} />
                  </div>
                  {user ? user.name.split(' ')[0] : 'Sign In / Register'}
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #dddddd;
          border-radius: 999px;
        }
      `}</style>
    </header>
  );
}
