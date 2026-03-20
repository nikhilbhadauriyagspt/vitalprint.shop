import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '@/components/SEO';
import {
  Mail,
  MapPin,
  Send,
  Loader2,
  CheckCircle2,
  Phone,
  Clock,
  ChevronDown
} from 'lucide-react';
import API_BASE_URL from '../config';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const response = await fetch(`${API_BASE_URL}/contacts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.status === 'success') {
        setStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: 'General Inquiry',
          message: '',
        });
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-['Rubik'] text-[#37474F] pb-20">
      <SEO title="Contact Us | Harry's Printer Store" />

      {/* --- SIMPLE HEADER --- */}
      <div className="py-16 bg-[#F8FAFA] border-b border-[#E0E7E7] text-center px-6">
        <h1 className="text-3xl md:text-4xl font-bold text-[#37474F] mb-4">Contact Us</h1>
        <p className="text-[#64748B] max-w-2xl mx-auto">Have questions? We're here to help. Send us a message and we'll get back to you as soon as possible.</p>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* --- INFO COLUMN --- */}
          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-[#7EA1A1]/10 rounded-full flex items-center justify-center text-[#7EA1A1] shrink-0">
                <Mail size={20} />
              </div>
              <div>
                <h4 className="font-bold text-sm uppercase tracking-wider text-[#94A3B8] mb-1">Email</h4>
                <p className="text-[#37474F] font-medium">info@harryprinterstore.shop</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 bg-[#7EA1A1]/10 rounded-full flex items-center justify-center text-[#7EA1A1] shrink-0">
                <MapPin size={20} />
              </div>
              <div>
                <h4 className="font-bold text-sm uppercase tracking-wider text-[#94A3B8] mb-1">Address</h4>
                <p className="text-[#37474F] font-medium leading-relaxed">
                  2700 Bell Ave, <br />
                  Des Moines, IA 50321, USA
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 bg-[#7EA1A1]/10 rounded-full flex items-center justify-center text-[#7EA1A1] shrink-0">
                <Clock size={20} />
              </div>
              <div>
                <h4 className="font-bold text-sm uppercase tracking-wider text-[#94A3B8] mb-1">Hours</h4>
                <p className="text-[#37474F] font-medium">Mon - Fri: 9am - 6pm</p>
              </div>
            </div>
          </div>

          {/* --- FORM COLUMN --- */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-[#E0E7E7] rounded-3xl p-8 md:p-10 shadow-sm">
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-10"
                  >
                    <CheckCircle2 size={48} className="text-emerald-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-[#37474F] mb-2">Message Sent!</h2>
                    <p className="text-[#64748B] mb-8">We've received your inquiry and will respond shortly.</p>
                    <button
                      onClick={() => setStatus(null)}
                      className="px-8 py-3 bg-[#37474F] text-white rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-[#7EA1A1] transition-all"
                    >
                      Send Another
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-[#94A3B8] uppercase ml-1">Your Name</label>
                        <input
                          required
                          type="text"
                          placeholder="Enter name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full h-12 px-4 bg-[#F8FAFA] border border-[#E0E7E7] rounded-xl outline-none focus:border-[#7EA1A1] transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-[#94A3B8] uppercase ml-1">Email Address</label>
                        <input
                          required
                          type="email"
                          placeholder="Enter email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full h-12 px-4 bg-[#F8FAFA] border border-[#E0E7E7] rounded-xl outline-none focus:border-[#7EA1A1] transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-[#94A3B8] uppercase ml-1">Phone (Optional)</label>
                        <input
                          type="tel"
                          placeholder="Enter phone"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full h-12 px-4 bg-[#F8FAFA] border border-[#E0E7E7] rounded-xl outline-none focus:border-[#7EA1A1] transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-[#94A3B8] uppercase ml-1">Subject</label>
                        <div className="relative">
                          <select
                            value={formData.subject}
                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                            className="w-full h-12 px-4 bg-[#F8FAFA] border border-[#E0E7E7] rounded-xl outline-none focus:border-[#7EA1A1] appearance-none cursor-pointer"
                          >
                            <option>General Inquiry</option>
                            <option>Technical Support</option>
                            <option>Order Status</option>
                          </select>
                          <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#94A3B8] pointer-events-none" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-[#94A3B8] uppercase ml-1">Message</label>
                      <textarea
                        required
                        rows="5"
                        placeholder="How can we help you?"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full p-4 bg-[#F8FAFA] border border-[#E0E7E7] rounded-xl outline-none focus:border-[#7EA1A1] transition-all resize-none"
                      ></textarea>
                    </div>

                    <button
                      disabled={loading}
                      className="w-full h-14 bg-[#37474F] text-white rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-[#7EA1A1] transition-all disabled:opacity-50"
                    >
                      {loading ? <Loader2 className="animate-spin mx-auto" size={20} /> : 'Send Message'}
                    </button>

                    {status === 'error' && (
                      <p className="text-center text-red-500 text-xs font-bold mt-2">Error sending message. Please try again.</p>
                    )}
                  </form>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
