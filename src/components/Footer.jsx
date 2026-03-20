import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Mail,
  MapPin,
  Lock,
} from 'lucide-react';
import API_BASE_URL from '../config';

export default function Footer() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/categories`)
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          const printerParent = data.data.find(cat => cat.slug === 'printers' || cat.id === 46);
          if (printerParent && printerParent.children) {
            setCategories(printerParent.children.slice(0, 5));
          }
        }
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <footer className="w-full bg-white font-['Rubik'] border-t border-[#F1F5F5]">

      {/* MAIN FOOTER AREA */}
      <div className="max-w-[1800px] mx-auto px-6 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16">

          {/* BRAND COLUMN */}
          <div className="flex flex-col">
            <Link to="/" className="inline-block mb-6">
              <img src="/logo/logo.png" alt="Harry's Printer Store" className="h-9 object-contain" />
            </Link>
            <p className="text-[#64748B] text-[15px] font-medium leading-relaxed max-w-xs mb-8">
              Your trusted partner for high-performance printers, ink, and professional supplies.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail size={18} className="text-[#7EA1A1] shrink-0 mt-1" />
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest">Email Support</span>
                  <a href="mailto:info@harryprinterstore.shop" className="text-[#37474F] font-semibold text-[14px] hover:text-[#7EA1A1] transition-colors">
                    info@harryprinterstore.shop
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-[#7EA1A1] shrink-0 mt-1" />
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest">Office Address</span>
                  <p className="text-[#37474F] font-semibold text-[14px] leading-snug">
                    2700 Bell Ave, Des Moines, <br /> IA 50321, USA
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* SHOP DEPARTMENTS */}
          <div>
            <h4 className="text-[#37474F] font-bold text-[14px] uppercase tracking-wider mb-8">
              Categories
            </h4>
            <ul className="space-y-4">
              {categories.map(cat => (
                <li key={cat.id}>
                  <Link to={`/shop?category=${cat.slug}`} className="text-[#64748B] hover:text-[#7EA1A1] font-semibold text-[14px] transition-all capitalize">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h4 className="text-[#37474F] font-bold text-[14px] uppercase tracking-wider mb-8">
              Company
            </h4>
            <ul className="space-y-4">
              {['About', 'Contact', 'FAQ', 'Track Order'].map(item => (
                <li key={item}>
                  <Link to={`/${item.toLowerCase().replace(' ', '-')}`} className="text-[#64748B] hover:text-[#7EA1A1] font-semibold text-[14px] transition-all">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* POLICIES */}
          <div>
            <h4 className="text-[#37474F] font-bold text-[14px] uppercase tracking-wider mb-8">
              Policies
            </h4>
            <ul className="space-y-4">
              {[
                { name: 'Privacy Policy', path: '/privacy-policy' },
                { name: 'Terms & Conditions', path: '/terms-and-conditions' },
                { name: 'Shipping Policy', path: '/shipping-policy' },
                { name: 'Return Policy', path: '/return-policy' }
              ].map(link => (
                <li key={link.name}>
                  <Link to={link.path} className="text-[#64748B] hover:text-[#7EA1A1] font-semibold text-[14px] transition-all">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* BOTTOM STRIP */}
      <div className="w-full border-t border-[#F1F5F5] py-10">
        <div className="max-w-[1800px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          
          <div className="text-[#94A3B8] text-[13px] font-medium text-center md:text-left">
            &copy; {new Date().getFullYear()} <span className="text-[#37474F] font-bold tracking-tight">Harry's Printer Store Inc.</span> All rights reserved.
          </div>

          <div className="flex items-center gap-10">
            <img src="/logo/PayPal.svg.webp" alt="PayPal" className="h-4 opacity-40 grayscale" />
            <div className="hidden sm:flex items-center gap-2 text-[#94A3B8] text-[11px] font-bold uppercase tracking-widest">
              <Lock size={12} className="text-[#7EA1A1]" /> Secure Checkout
            </div>
          </div>

        </div>
      </div>

    </footer>
  );
}
