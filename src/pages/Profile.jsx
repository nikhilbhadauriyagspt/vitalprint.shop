import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import API_BASE_URL from '../config';
import {
  User,
  Lock,
  ShoppingBag, ArrowRight,
  Package,
  ChevronRight,
  LogOut,
  ShieldCheck,
  Eye,
  EyeOff,
  Loader2,
  Sparkles,
  LayoutGrid,
  Shield,
  MapPin,
  Phone
} from 'lucide-react';
import SEO from '@/components/SEO';

export default function Profile() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || 'null'));
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('profile'); // 'profile', 'orders', 'security'
  const [isUpdating, setIsUpdating] = useState(false);
  const { showToast } = useCart();
  const navigate = useNavigate();

  // Form states
  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: user?.address || ''
  });
  const [securityForm, setSecurityForm] = useState({
    password: '',
    confirmPassword: ''
  });
  const [showPass, setShowPass] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchOrders();
  }, [user]);

  const fetchOrders = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/orders?user_id=${user.id}`);
      const data = await response.json();
      if (data.status === 'success') setOrders(data.data);
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      const response = await fetch(`${API_BASE_URL}/users/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileForm)
      });
      const data = await response.json();
      if (data.status === 'success') {
        localStorage.setItem('user', JSON.stringify(data.data));
        setUser(data.data);
        showToast("Identity parameters synchronized.");
      }
    } catch (err) {
      showToast("Update sequence failed", "error");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSecurityUpdate = async (e) => {
    e.preventDefault();
    if (securityForm.password !== securityForm.confirmPassword) {
      showToast("Credential mismatch", "error");
      return;
    }
    setIsUpdating(true);
    try {
      const response = await fetch(`${API_BASE_URL}/users/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: securityForm.password })
      });
      const data = await response.json();
      if (data.status === 'success') {
        showToast("Protocol updated.");
        setSecurityForm({ password: '', confirmPassword: '' });
      }
    } catch (err) {
      showToast("Sync failed", "error");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.dispatchEvent(new Event('storage'));
    navigate('/');
  };

  if (!user) return null;

  return (
    <div className="bg-white min-h-screen font-['Rubik'] text-[#37474F] pb-20">
      <SEO title="User Dashboard | Account Management" />

      {/* --- REFINED PAGE HEADER --- */}
      <div className="bg-[#F8FAFA] border-b border-[#E0E7E7] py-12 md:py-16 mb-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/4 h-full bg-[#7EA1A1]/5 skew-x-12 translate-x-1/2" />

        <div className="max-w-[1800px] mx-auto px-6 lg:px-10 flex flex-col md:flex-row md:items-end justify-between gap-8 relative z-10">
          <div>
            <nav className="flex items-center gap-2 text-[11px] font-bold text-[#7EA1A1] uppercase tracking-[0.4em] mb-6">
              <Link to="/" className="hover:text-[#37474F] transition-colors">Home</Link>
              <ChevronRight size={14} className="text-[#E0E7E7]" />
              <span className="text-[#94A3B8]">Professional Hub</span>
            </nav>
            <h1 className="text-4xl md:text-6xl font-bold text-[#37474F] leading-none tracking-tight">
              Control <span className="text-[#7EA1A1] italic">Panel.</span>
            </h1>
          </div>

          <div className="flex items-center gap-3 px-6 py-3 bg-white text-[#37474F] rounded-2xl border border-[#E0E7E7] shadow-sm">
            <ShieldCheck size={20} className="text-[#7EA1A1]" />
            <span className="text-[11px] font-black uppercase tracking-widest text-[#94A3B8]">Authenticated Stream Active</span>
          </div>
        </div>
      </div>

      <div className="max-w-[1800px] mx-auto px-6 lg:px-10 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-20">

          {/* --- SIDEBAR PANEL --- */}
          <div className="lg:col-span-4">
            <div className="bg-[#F8FAFA] p-10 rounded-[3rem] border border-[#E0E7E7] sticky top-32">
              <div className="flex flex-col items-center text-center mb-12">
                <div className="h-24 w-24 bg-[#37474F] text-white flex items-center justify-center text-3xl font-bold rounded-3xl mb-6 shadow-xl shadow-[#37474F]/10 border-4 border-white">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <h2 className="text-2xl font-bold text-[#37474F] capitalize tracking-tight">{user.name}</h2>
                <p className="text-sm font-medium text-[#94A3B8] mt-2 uppercase tracking-widest text-[10px]">{user.email}</p>
              </div>

              <div className="space-y-3">
                {[
                  { id: 'profile', label: 'Identity Settings', icon: User },
                  { id: 'orders', label: 'Hardware Logs', icon: Package },
                  { id: 'security', label: 'Access Protocols', icon: Shield }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-4 px-6 py-4 text-[14px] font-bold transition-all rounded-2xl border-2 ${activeTab === tab.id
                      ? 'bg-white text-[#7EA1A1] border-[#7EA1A1] shadow-xl shadow-[#7EA1A1]/5'
                      : 'text-[#64748B] border-transparent hover:bg-white hover:text-[#37474F] hover:border-[#E0E7E7]'
                      }`}
                  >
                    <tab.icon size={18} />
                    <span className="tracking-tight">{tab.label}</span>
                  </button>
                ))}

                <div className="pt-8 mt-8 border-t border-[#E0E7E7]">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-4 px-6 py-4 text-[14px] font-bold text-red-500 hover:bg-red-50 transition-all rounded-2xl group"
                  >
                    <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
                    Terminate Session
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* --- MAIN STAGE PANEL --- */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {activeTab === 'profile' && (
                <motion.div
                  key="profile" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }}
                  className="bg-white p-8 md:p-16 rounded-[3rem] border border-[#E0E7E7]/60 shadow-sm"
                >
                  <div className="flex items-center gap-5 mb-16 pb-8 border-b border-[#F8FAFA]">
                    <div className="h-14 w-14 bg-[#F8FAFA] text-[#7EA1A1] flex items-center justify-center rounded-2xl border border-[#E0E7E7]">
                      <User size={28} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-[#37474F] tracking-tight">Identity Parameters</h3>
                      <p className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-[0.2em] mt-1">Update your verified contact data</p>
                    </div>
                  </div>

                  <form onSubmit={handleProfileUpdate} className="space-y-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-[11px] font-black text-[#94A3B8] uppercase tracking-[0.2em] ml-4">Full Identifier</label>
                        <input
                          required value={profileForm.name}
                          onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                          className="w-full h-16 px-8 bg-[#F8FAFA] border border-[#E0E7E7] rounded-2xl focus:bg-white focus:border-[#7EA1A1] outline-none text-[15px] font-medium text-[#37474F] transition-all"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[11px] font-black text-[#94A3B8] uppercase tracking-[0.2em] ml-4">Communication Line</label>
                        <input
                          value={profileForm.phone}
                          onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                          placeholder="+1 (000) 000-0000"
                          className="w-full h-16 px-8 bg-[#F8FAFA] border border-[#E0E7E7] rounded-2xl focus:bg-white focus:border-[#7EA1A1] outline-none text-[15px] font-medium text-[#37474F] transition-all"
                        />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[11px] font-black text-[#94A3B8] uppercase tracking-[0.2em] ml-4">Standard Deployment Address</label>
                      <textarea
                        rows="4" value={profileForm.address}
                        onChange={(e) => setProfileForm({ ...profileForm, address: e.target.value })}
                        placeholder="Complete logistics coordinates..."
                        className="w-full p-8 bg-[#F8FAFA] border border-[#E0E7E7] rounded-[2.5rem] focus:bg-white focus:border-[#7EA1A1] outline-none text-[15px] font-medium text-[#37474F] transition-all resize-none"
                      ></textarea>
                    </div>
                    <button
                      disabled={isUpdating}
                      className="h-16 px-12 bg-[#37474F] text-white font-bold text-sm uppercase tracking-widest rounded-2xl hover:bg-[#7EA1A1] transition-all disabled:opacity-50 shadow-xl shadow-[#37474F]/10 flex items-center gap-3"
                    >
                      {isUpdating ? "Synchronizing..." : "Commit Changes"}
                      {!isUpdating && <ArrowRight size={18} />}
                    </button>
                  </form>
                </motion.div>
              )}

              {activeTab === 'orders' && (
                <motion.div
                  key="orders" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }}
                  className="space-y-8"
                >
                  <div className="bg-white p-10 md:p-12 rounded-[3rem] border border-[#E0E7E7]/60 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-5">
                      <div className="h-14 w-14 bg-[#F8FAFA] text-[#7EA1A1] flex items-center justify-center rounded-2xl border border-[#E0E7E7]">
                        <Package size={28} />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-[#37474F] tracking-tight">Deployment Logs</h3>
                        <p className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-[0.2em] mt-1">{orders.length} Active Procurements</p>
                      </div>
                    </div>
                    <Link to="/shop" className="h-12 px-6 flex items-center justify-center bg-[#F8FAFA] text-[11px] font-bold text-[#7EA1A1] uppercase tracking-widest rounded-xl border border-[#E0E7E7] hover:bg-[#7EA1A1] hover:text-white transition-all">New Acquisition</Link>
                  </div>

                  {orders.length === 0 ? (
                    <div className="bg-[#F8FAFA] p-24 text-center rounded-[3rem] border border-[#E0E7E7]">
                      <div className="w-20 h-20 bg-white rounded-[2rem] flex items-center justify-center mx-auto mb-8 border border-[#E0E7E7] shadow-sm">
                        <LayoutGrid size={32} className="text-[#E0E7E7]" />
                      </div>
                      <p className="text-[#94A3B8] font-bold uppercase text-[11px] tracking-[0.3em]">No hardware records in current stream.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-6">
                      {orders.map((order) => (
                        <div key={order.id} className="bg-white border border-[#E0E7E7]/60 rounded-[2.5rem] overflow-hidden group hover:border-[#7EA1A1]/30 transition-all duration-500 shadow-sm">
                          <div className="p-10 flex flex-col md:flex-row md:items-center justify-between gap-8 border-b border-[#F8FAFA]">
                            <div>
                              <p className="text-[10px] font-black text-[#94A3B8] uppercase tracking-[0.3em] mb-3">Unit ID #DSP-{order.id}</p>
                              <span className={`px-4 py-1.5 text-[10px] font-bold uppercase rounded-lg border ${order.status === 'delivered' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-blue-50 text-[#7EA1A1] border-blue-100'}`}>
                                {order.status}
                              </span>
                            </div>
                            <div className="md:text-right space-y-1">
                              <p className="text-3xl font-black text-[#37474F] tracking-tighter">${Number(order.total_amount).toLocaleString()}</p>
                              <p className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-widest">{new Date(order.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                            </div>
                          </div>
                          <div className="p-6 bg-[#F8FAFA]/50 group-hover:bg-white transition-colors">
                            <Link to={`/checkout?order_id=${order.id}`} className="flex items-center justify-center gap-3 text-[11px] font-bold text-[#37474F] uppercase tracking-widest hover:text-[#7EA1A1] transition-all group/btn">
                              <span>Track Hardware Status</span> <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              {activeTab === 'security' && (
                <motion.div
                  key="security" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }}
                  className="bg-white p-8 md:p-16 rounded-[3rem] border border-[#E0E7E7]/60 shadow-sm"
                >
                  <div className="flex items-center gap-5 mb-16 pb-8 border-b border-[#F8FAFA]">
                    <div className="h-14 w-14 bg-red-50 text-red-500 flex items-center justify-center rounded-2xl border border-red-100">
                      <Shield size={28} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-[#37474F] tracking-tight">Access Protocols</h3>
                      <p className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-[0.2em] mt-1">Manage your authentication layer</p>
                    </div>
                  </div>

                  <form onSubmit={handleSecurityUpdate} className="space-y-10">
                    <div className="space-y-3">
                      <label className="text-[11px] font-black text-[#94A3B8] uppercase tracking-[0.2em] ml-4">New Protocol Code</label>
                      <div className="relative group">
                        <input
                          type={showPass ? "text" : "password"} required
                          placeholder="••••••••"
                          value={securityForm.password} onChange={(e) => setSecurityForm({ ...securityForm, password: e.target.value })}
                          className="w-full h-16 pl-8 pr-16 bg-[#F8FAFA] border border-[#E0E7E7] rounded-2xl focus:bg-white focus:border-[#7EA1A1] outline-none text-[15px] font-medium text-[#37474F] transition-all"
                        />
                        <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-6 top-1/2 -translate-y-1/2 text-[#E0E7E7] hover:text-[#7EA1A1] transition-colors">
                          {showPass ? <EyeOff size={22} /> : <Eye size={22} />}
                        </button>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[11px] font-black text-[#94A3B8] uppercase tracking-[0.2em] ml-4">Verify Access Key</label>
                      <input
                        type={showPass ? "text" : "password"} required
                        placeholder="••••••••"
                        value={securityForm.confirmPassword} onChange={(e) => setSecurityForm({ ...securityForm, confirmPassword: e.target.value })}
                        className="w-full h-16 px-8 bg-[#F8FAFA] border border-[#E0E7E7] rounded-2xl focus:bg-white focus:border-[#7EA1A1] outline-none text-[15px] font-medium text-[#37474F] transition-all"
                      />
                    </div>
                    <button
                      disabled={isUpdating}
                      className="h-16 px-12 bg-[#37474F] text-white font-bold text-sm uppercase tracking-widest rounded-2xl hover:bg-[#7EA1A1] transition-all disabled:opacity-50 shadow-xl shadow-[#37474F]/10 flex items-center gap-3"
                    >
                      {isUpdating ? "Encoding..." : "Update Security Credentials"}
                      {!isUpdating && <ShieldCheck size={18} />}
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  );
}
