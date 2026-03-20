import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '@/components/SEO';
import { ChevronDown, Search, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const faqData = [
  {
    category: "Orders & purchasing",
    questions: [
      { q: "How do I place an order?", a: "Simply browse our products, add your items to the cart, and complete the checkout using your preferred payment method." },
      { q: "Do I need an account to purchase?", a: "No. You can checkout as a guest. However, creating an account helps you track orders and access your purchase history." },
      { q: "How can I check my order status?", a: "Log into your account and visit My Orders to view real-time updates. You will also receive email notifications." },
      { q: "Can I modify or cancel my order?", a: "Orders can be modified or canceled before shipping. Once the item is dispatched, cancellations aren’t possible." },
      { q: "What payment methods do you accept?", a: "We accept major credit/debit cards (Visa, Mastercard), PayPal, and other secure digital payment options." },
      { q: "Is shopping here secure?", a: "Yes. All transactions are encrypted and processed through secure, PCI-compliant payment networks." }
    ]
  },
  {
    category: "Shipping & delivery",
    questions: [
      { q: "What are your shipping options?", a: "We offer standard and expedited shipping across the USA, depending on your location." },
      { q: "Do you deliver nationwide?", a: "Yes, we ship to all 50 states, including business addresses." },
      { q: "How long does delivery take?", a: "Delivery typically takes 3–7 business days, based on your region and order volume." },
      { q: "How much does shipping cost?", a: "Shipping charges vary by product weight, location, and delivery speed. Final charges appear at checkout." },
      { q: "Will I receive a tracking number?", a: "Yes. You’ll receive a tracking link via email as soon as your order ships." },
      { q: "What if my order is delayed?", a: "You can use your tracking link or contact our support team for an immediate update." }
    ]
  },
  {
    category: "Products & availability",
    questions: [
      { q: "Are your products covered under warranty?", a: "Yes. All products come with a manufacturer's warranty." },
      { q: "What brands do you sell?", a: "We sell printers and accessories from various trusted manufacturers." },
      { q: "How can I choose the right hardware?", a: "You can contact our support for personalized buying recommendations based on your usage and budget." },
      { q: "What if an item is out of stock?", a: "You can join the Back in Stock alert on the product page, and we’ll notify you as soon as it becomes available." }
    ]
  },
  {
    category: "Warranty & support",
    questions: [
      { q: "Do your products come with a manufacturer's warranty?", a: "Yes. Every product includes brand-backed warranty with repair/replacement coverage." },
      { q: "How do I claim warranty for products?", a: "You can contact the manufacturer directly or reach out to us for guidance and warranty assistance." },
      { q: "What if my hardware arrives damaged?", a: "Contact us within 48 hours with photos/videos. We’ll arrange a replacement or initiate a claim." },
      { q: "Do you provide technical support?", a: "Yes. We offer setup help, troubleshooting, installation support, and product-related guidance." }
    ]
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState('0-0');
  const [searchQuery, setSearchQuery] = useState('');

  const toggleAccordion = (catIdx, qIdx) => {
    const id = `${catIdx}-${qIdx}`;
    setOpenIndex(openIndex === id ? null : id);
  };

  return (
    <div className="bg-white min-h-screen font-['Rubik'] text-[#37474F] pb-20">
      <SEO title="FAQ | Harry's Printer Store" />

      {/* --- HEADER --- */}
      <div className="py-16 bg-[#F8FAFA] border-b border-[#E0E7E7] text-center px-6">
        <h1 className="text-3xl md:text-4xl font-bold text-[#37474F] mb-4">Frequently Asked Questions</h1>
        <div className="max-w-xl mx-auto relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]" size={18} />
          <input
            type="text"
            placeholder="Search for help..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-12 pl-12 pr-4 bg-white border border-[#E0E7E7] rounded-full focus:border-[#7EA1A1] outline-none shadow-sm transition-all"
          />
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-16">
        {faqData.map((cat, catIdx) => {
          const filteredQuestions = cat.questions.filter(q => 
            q.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
            q.a.toLowerCase().includes(searchQuery.toLowerCase())
          );

          if (filteredQuestions.length === 0) return null;

          return (
            <div key={catIdx} className="mb-12">
              <h2 className="text-lg font-bold text-[#7EA1A1] uppercase tracking-widest mb-6 px-2">{cat.category}</h2>
              <div className="space-y-4">
                {filteredQuestions.map((faq, qIdx) => {
                  const id = `${catIdx}-${qIdx}`;
                  const isOpen = openIndex === id;

                  return (
                    <div key={qIdx} className="border border-[#E0E7E7] rounded-xl overflow-hidden">
                      <button
                        onClick={() => toggleAccordion(catIdx, qIdx)}
                        className="w-full px-6 py-4 flex items-center justify-between text-left bg-white hover:bg-slate-50 transition-all"
                      >
                        <span className={`font-bold ${isOpen ? 'text-[#7EA1A1]' : 'text-[#37474F]'}`}>{faq.q}</span>
                        <ChevronDown size={18} className={`text-[#94A3B8] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                      </button>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="bg-slate-50 border-t border-[#E0E7E7]"
                          >
                            <div className="px-6 py-4 text-[#64748B] text-sm leading-relaxed font-medium">
                              {faq.a}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        <div className="mt-20 p-8 bg-[#37474F] rounded-2xl text-center text-white">
          <h3 className="text-xl font-bold mb-2">Still have questions?</h3>
          <p className="text-white/70 mb-6 font-medium">Our support team is available to assist you with any inquiries.</p>
          <Link to="/contact" className="inline-block px-8 py-3 bg-[#7EA1A1] text-white rounded-lg font-bold text-sm uppercase tracking-widest hover:bg-white hover:text-[#37474F] transition-all">
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
