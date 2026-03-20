import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import {
  ChevronLeft,
  CreditCard,
  Truck,
  ShieldCheck,
  ArrowRight,
  Lock,
  MapPin,
  Mail,
  Loader2,
  CheckCircle2,
  Package
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PayPalButtons } from "@paypal/react-paypal-js";
import API_BASE_URL from '../config';
import SEO from '@/components/SEO';

export default function Checkout() {
  const { cart, cartCount, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const [formData, setFormData] = useState({
    email: user?.email || '',
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ')[1] || '',
    address: '',
    city: '',
    zipCode: '',
    phone: '',
    paymentMethod: 'cod',
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOrderSuccess = async (paymentDetails = null) => {
    setLoading(true);
    try {
      const orderData = {
        ...formData,
        user_id: user?.id,
        total: total,
        items: cart,
        payment_details: paymentDetails,
        source: 'harryprinterstore.shop',
      };

      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();
      if (data.status === 'success') {
        setOrderId(data.order_id);
        setStep(3);
        clearCart();
      }
    } catch (err) {
      alert('Error placing order.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step === 1) setStep(2);
    else if (formData.paymentMethod === 'cod') await handleOrderSuccess();
  };

  if (cart.length === 0 && step !== 3) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6">
        <h2 className="text-xl font-bold mb-4">Your cart is empty</h2>
        <Link to="/shop" className="text-[#7EA1A1] font-bold">Return to Shop</Link>
      </div>
    );
  }

  if (step === 3) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <CheckCircle2 size={64} className="text-emerald-500 mb-6" />
        <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
        <p className="text-[#64748B] mb-8">Thank you for your purchase. Your order ID is #DSP-{orderId}</p>
        <Link to="/" className="px-8 py-3 bg-[#37474F] text-white rounded-lg font-bold">Return Home</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-['Rubik'] text-[#37474F] pb-20">
      <SEO title="Checkout | Harry's Printer Store" />

      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-12">
          <h1 className="text-2xl font-bold">Checkout</h1>
          <div className="flex items-center gap-2 text-xs font-bold text-[#94A3B8]">
            <span className={step >= 1 ? 'text-[#37474F]' : ''}>Shipping</span>
            <ArrowRight size={14} />
            <span className={step >= 2 ? 'text-[#37474F]' : ''}>Payment</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              {step === 1 ? (
                <div className="space-y-6">
                  <h3 className="text-lg font-bold">Shipping Information</h3>
                  <div className="space-y-4">
                    <input required name="email" value={formData.email} onChange={handleInputChange} type="email" placeholder="Email" className="w-full h-12 px-4 bg-[#F8FAFA] border border-[#E0E7E7] rounded-lg" />
                    <div className="grid grid-cols-2 gap-4">
                      <input required name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="First Name" className="w-full h-12 px-4 bg-[#F8FAFA] border border-[#E0E7E7] rounded-lg" />
                      <input required name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Last Name" className="w-full h-12 px-4 bg-[#F8FAFA] border border-[#E0E7E7] rounded-lg" />
                    </div>
                    <input required name="address" value={formData.address} onChange={handleInputChange} placeholder="Address" className="w-full h-12 px-4 bg-[#F8FAFA] border border-[#E0E7E7] rounded-lg" />
                    <div className="grid grid-cols-2 gap-4">
                      <input required name="city" value={formData.city} onChange={handleInputChange} placeholder="City" className="w-full h-12 px-4 bg-[#F8FAFA] border border-[#E0E7E7] rounded-lg" />
                      <input required name="zipCode" value={formData.zipCode} onChange={handleInputChange} placeholder="Zip Code" className="w-full h-12 px-4 bg-[#F8FAFA] border border-[#E0E7E7] rounded-lg" />
                    </div>
                    <input required name="phone" value={formData.phone} onChange={handleInputChange} type="tel" placeholder="Phone" className="w-full h-12 px-4 bg-[#F8FAFA] border border-[#E0E7E7] rounded-lg" />
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <h3 className="text-lg font-bold">Payment Method</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div onClick={() => setFormData({ ...formData, paymentMethod: 'cod' })} className={`p-6 border-2 rounded-xl cursor-pointer ${formData.paymentMethod === 'cod' ? 'border-[#7EA1A1] bg-[#7EA1A1]/5' : 'border-[#E0E7E7]'}`}>
                      <p className="font-bold">Cash on Delivery</p>
                    </div>
                    <div onClick={() => setFormData({ ...formData, paymentMethod: 'paypal' })} className={`p-6 border-2 rounded-xl cursor-pointer ${formData.paymentMethod === 'paypal' ? 'border-[#7EA1A1] bg-[#7EA1A1]/5' : 'border-[#E0E7E7]'}`}>
                      <p className="font-bold">PayPal</p>
                    </div>
                  </div>
                  {formData.paymentMethod === 'paypal' && (
                    <div className="pt-4">
                      <PayPalButtons 
                        style={{ layout: "vertical" }}
                        createOrder={(data, actions) => actions.order.create({ purchase_units: [{ amount: { value: total.toString() } }] })}
                        onApprove={async (data, actions) => {
                          const details = await actions.order.capture();
                          await handleOrderSuccess(details);
                        }}
                      />
                    </div>
                  )}
                </div>
              )}

              <div className="flex gap-4 pt-6">
                {step === 2 && <button type="button" onClick={() => setStep(1)} className="px-6 h-12 border border-[#E0E7E7] rounded-lg font-bold text-sm">Back</button>}
                {(step === 1 || formData.paymentMethod === 'cod') && (
                  <button type="submit" disabled={loading} className="flex-1 h-12 bg-[#37474F] text-white rounded-lg font-bold text-sm uppercase tracking-widest hover:bg-[#7EA1A1] transition-all">
                    {loading ? 'Processing...' : step === 1 ? 'Continue' : 'Place Order'}
                  </button>
                )}
              </div>
            </form>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-[#F8FAFA] border border-[#E0E7E7] rounded-2xl p-6">
              <h3 className="font-bold mb-6">Summary</h3>
              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-[#64748B] line-clamp-1 flex-1 pr-4">{item.name} x {item.quantity}</span>
                    <span className="font-bold">${(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <div className="pt-4 border-t border-[#E0E7E7] flex justify-between font-bold">
                <span>Total</span>
                <span>${total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
