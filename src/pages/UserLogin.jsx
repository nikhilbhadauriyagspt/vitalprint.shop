import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
import API_BASE_URL from '../config';
import SEO from '@/components/SEO';

export default function UserLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'user', identifier: email, password })
      });

      const data = await response.json();
      if (data.status === 'success') {
        localStorage.setItem('user', JSON.stringify(data.data));
        window.dispatchEvent(new Event('storage'));
        navigate('/');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Could not connect to server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFA] px-6 py-20 font-['Rubik']">
      <SEO title="Login | Harry's Printer Store" />

      <div className="max-w-md w-full bg-white rounded-2xl border border-[#E0E7E7] shadow-sm p-8 md:p-10">
        <div className="text-center mb-10">
          <h1 className="text-2xl font-bold text-[#37474F]">Welcome Back</h1>
          <p className="text-sm text-[#64748B] mt-2 font-medium">Please enter your details to sign in.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {error && (
            <div className="p-3 bg-red-50 text-red-600 text-xs font-bold rounded-lg border border-red-100 text-center">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#94A3B8] uppercase ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <input
                  required
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-12 pl-11 pr-4 bg-[#F8FAFA] border border-[#E0E7E7] rounded-xl outline-none focus:border-[#7EA1A1] transition-all text-sm font-medium"
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center px-1">
                <label className="text-xs font-bold text-[#94A3B8] uppercase">Password</label>
                <Link to="#" className="text-[10px] font-bold text-[#7EA1A1] hover:underline uppercase">Forgot?</Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-12 pl-11 pr-12 bg-[#F8FAFA] border border-[#E0E7E7] rounded-xl outline-none focus:border-[#7EA1A1] transition-all text-sm font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-[#7EA1A1]"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          </div>

          <button
            disabled={loading}
            className="w-full h-12 bg-[#37474F] text-white rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-[#7EA1A1] transition-all disabled:opacity-70"
          >
            {loading ? <Loader2 className="animate-spin mx-auto" size={20} /> : 'Sign In'}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-[#F1F5F5] text-center">
          <p className="text-sm text-[#64748B] font-medium">
            Don't have an account?{' '}
            <Link to="/signup" className="text-[#7EA1A1] font-bold hover:underline">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
