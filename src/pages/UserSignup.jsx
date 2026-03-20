import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, Loader2, ShieldCheck, ChevronLeft, Sparkles, LayoutGrid } from 'lucide-react';
import API_BASE_URL from '../config';
import SEO from '@/components/SEO';

export default function UserSignup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'user',
          name: formData.name,
          email: formData.email,
          password: formData.password
        })
      });

      const data = await response.json();

      if (data.status === 'success') {
        localStorage.setItem('user', JSON.stringify(data.data));
        window.dispatchEvent(new Event('storage'));
        navigate('/');
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      setError('Could not connect to server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFA] font-['Rubik'] px-6 py-20">
      <SEO title="Create Account | Identity Management" />

      <div className="max-w-[1000px] w-full grid grid-cols-1 lg:grid-cols-2 bg-white rounded-[3rem] overflow-hidden border border-[#E0E7E7] shadow-2xl shadow-blue-900/5">

        {/* --- LEFT: BRAND STAGE --- */}
        <div className="hidden lg:flex flex-col justify-between p-16 bg-[#37474F] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#7EA1A1] opacity-10 blur-[100px] rounded-full pointer-events-none" />
          
          <div className="relative z-10">
            <Link to="/" className="inline-flex items-center gap-3 text-white/50 hover:text-white transition-all mb-20 group">
              <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              <span className="text-[11px] font-bold uppercase tracking-widest">Return to catalog</span>
            </Link>

            <div className="space-y-8">
              <div className="flex items-center gap-3 text-[#7EA1A1]">
                <Sparkles size={20} />
                <span className="text-[11px] font-bold uppercase tracking-[0.4em]">Member Registration</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight">
                Establish <br /> your <span className="text-[#7EA1A1] italic font-light text-3xl">Profile.</span>
              </h2>
              <p className="text-white/50 text-lg font-medium leading-relaxed max-w-xs">
                Create a centralized identity to manage your hardware deployments and technical preferences.
              </p>
            </div>
          </div>

          <div className="relative z-10 flex items-center gap-3 text-white/30 text-[10px] font-bold uppercase tracking-[0.2em]">
            <ShieldCheck size={16} className="text-[#7EA1A1]" />
            <span>Secure Protocol Handshake</span>
          </div>
        </div>

        {/* --- RIGHT: FORM STAGE --- */}
        <div className="p-10 md:p-16 flex flex-col justify-center bg-white">
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-[#37474F] tracking-tight mb-2">Register.</h1>
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#7EA1A1]">System Enrollment</p>
          </div>

          <form onSubmit={handleSignup} className="space-y-6">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-red-50 text-red-600 text-[11px] font-bold uppercase tracking-widest rounded-xl border border-red-100 text-center"
              >
                {error}
              </motion.div>
            )}

            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-[11px] font-black text-[#94A3B8] uppercase tracking-[0.2em] ml-1">Full Identifier</label>
                <div className="relative group">
                  <User className="absolute left-5 top-1/2 -translate-y-1/2 text-[#E0E7E7] group-focus-within:text-[#7EA1A1] transition-colors" size={18} />
                  <input
                    required
                    type="text"
                    placeholder="e.g. Alex Sterling"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full h-14 pl-14 pr-6 bg-[#F8FAFA] border border-[#E0E7E7] rounded-2xl focus:bg-white focus:border-[#7EA1A1] outline-none text-[15px] font-medium text-[#37474F] transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-black text-[#94A3B8] uppercase tracking-[0.2em] ml-1">Connectivity ID</label>
                <div className="relative group">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-[#E0E7E7] group-focus-within:text-[#7EA1A1] transition-colors" size={18} />
                  <input
                    required
                    type="email"
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full h-14 pl-14 pr-6 bg-[#F8FAFA] border border-[#E0E7E7] rounded-2xl focus:bg-white focus:border-[#7EA1A1] outline-none text-[15px] font-medium text-[#37474F] transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-[#94A3B8] uppercase tracking-[0.2em] ml-1">Security Key</label>
                  <div className="relative group">
                    <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-[#E0E7E7] group-focus-within:text-[#7EA1A1] transition-colors" size={18} />
                    <input
                      required
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="w-full h-14 pl-14 pr-6 bg-[#F8FAFA] border border-[#E0E7E7] rounded-2xl focus:bg-white focus:border-[#7EA1A1] outline-none text-[15px] font-medium text-[#37474F] transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-black text-[#94A3B8] uppercase tracking-[0.2em] ml-1">Verify Key</label>
                  <div className="relative group">
                    <ShieldCheck className="absolute left-5 top-1/2 -translate-y-1/2 text-[#E0E7E7] group-focus-within:text-[#7EA1A1] transition-colors" size={18} />
                    <input
                      required
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      className="w-full h-14 pl-14 pr-6 bg-[#F8FAFA] border border-[#E0E7E7] rounded-2xl focus:bg-white focus:border-[#7EA1A1] outline-none text-[15px] font-medium text-[#37474F] transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>

            <button
              disabled={loading}
              className="w-full h-16 bg-[#37474F] text-white flex items-center justify-center gap-4 text-[13px] font-bold uppercase tracking-widest rounded-2xl hover:bg-[#7EA1A1] transition-all active:scale-[0.98] disabled:opacity-70 group shadow-xl shadow-[#37474F]/10 mt-4"
            >
              {loading ? <Loader2 className="animate-spin" size={24} /> : <>Initialize Account <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" /></>}
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-[#F1F5F5] text-center">
            <p className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-widest">
              Already registered?{' '}
              <Link to="/login" className="text-[#7EA1A1] hover:underline ml-2 font-black">Authentication Stream</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
