import React, { useState } from 'react';
import { Send, CheckCircle, Sparkles, PhoneCall, Gift, Zap } from 'lucide-react';
import { Lead } from '../types';

export default function LeadCapture() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [preferredCategory, setPreferredCategory] = useState('laptops');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim() || !phone.trim() || !email.trim()) {
      setErrorMsg('Please cover all required blocks (Name, Phone, and Email).');
      return;
    }

    if (!phone.startsWith('07') && !phone.startsWith('01') && !phone.startsWith('254')) {
      setErrorMsg('Please enter a valid Kenyan Safaricom/Airtel phone number (e.g., 0712345678).');
      return;
    }

    const newLead: Lead = {
      id: Math.random().toString(36).substring(2, 9),
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      preferredCategory,
      timestamp: new Date().toISOString()
    };

    // Store to localStorage to simulate real database captures
    const storedLeads = JSON.parse(localStorage.getItem('samdeals_leads') || '[]');
    storedLeads.push(newLead);
    localStorage.setItem('samdeals_leads', JSON.stringify(storedLeads));

    setIsSubmitted(true);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden p-6 md:p-8 relative" id="lead-capture-section">
      {/* Decorative backdrop glow */}
      <div className="absolute top-0 right-0 w-44 h-44 bg-green-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-8 -left-8 w-44 h-44 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>

      {!isSubmitted ? (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Left Block */}
          <div className="md:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-500/10 border border-green-500/20 text-green-400 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider">
              <Zap className="w-3 h-3 text-green-400 fill-current" /> Exclusive Early Access VIP
            </div>
            
            <h3 className="font-sans font-black text-2xl md:text-3xl text-white tracking-tight leading-tight">
              Get Instant Alerts on Kenya’s Fastest Electronics Deals! 🚀
            </h3>
            
            <p className="text-sm text-slate-400 leading-relaxed max-w-lg font-sans">
              Hot refurbished laptops, imported iPhones, and gaming rigs sell out in less than 24 hours. Sign up to get customized flash sale notifications directly via WhatsApp status updates/SMS or Email!
            </p>

            {/* Quick Reward callout */}
            <div className="flex gap-3 bg-slate-950 p-4 rounded-2xl border border-slate-800 max-w-sm">
              <div className="p-2.5 bg-yellow-500/10 text-yellow-500 rounded-xl flex-shrink-0 animate-bounce">
                <Gift className="w-5 h-5" />
              </div>
              <div>
                <h5 className="font-sans font-bold text-xs text-white">Join & Get KES 1,000 Off Discount</h5>
                <p className="text-[10px] text-slate-500 font-mono mt-0.5">Valid on your first upgrade check-in today.</p>
              </div>
            </div>
          </div>

          {/* Right Block: Form */}
          <form onSubmit={handleSubmit} className="md:col-span-5 bg-slate-950 border border-slate-800 p-6 rounded-2xl space-y-4">
            <h4 className="font-bold text-xs text-slate-300 font-mono uppercase tracking-wider">Early-bird Registration Form</h4>
            
            <div className="space-y-3">
              <div>
                <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Your Full Name:</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Samuel Mbindyo"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                  required
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">WhatsApp / Phone Number:</label>
                <input 
                  type="text" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 0712345678"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                  required
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">E-mail Address:</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. sammy@gmail.com"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                  required
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Category of Interest:</label>
                <select 
                  value={preferredCategory}
                  onChange={(e) => setPreferredCategory(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                >
                  <option value="laptops">Laptops / Ultrabooks</option>
                  <option value="smartphones">Smartphones (iPhone, Samsung)</option>
                  <option value="tvs">Smart TVs & Monitors</option>
                  <option value="woofers">Subwoofers & Sound Systems</option>
                  <option value="gaming">Gaming Devices (PlayStation, Xbox)</option>
                  <option value="accessories">Accessories / Audio</option>
                </select>
              </div>
            </div>

            {errorMsg && (
              <p className="text-[11px] text-red-400 font-semibold font-mono leading-relaxed bg-red-500/5 p-2 rounded-lg border border-red-500/10">
                ⚠️ {errorMsg}
              </p>
            )}

            <button
              type="submit"
              className="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-green-600 hover:bg-green-700 font-bold rounded-xl transition-all text-white text-xs font-sans shadow-md"
              id="submit-lead-btn"
            >
              <Send className="w-4 h-4" />
              Claim My KES 1,000 Off Code
            </button>
          </form>

        </div>
      ) : (
        <div className="text-center py-8 space-y-4 max-w-md mx-auto">
          <div className="w-16 h-16 bg-green-500/15 border border-green-500/30 rounded-2xl flex items-center justify-center text-green-400 mx-auto animate-pulse">
            <CheckCircle className="w-8 h-8" />
          </div>
          
          <div className="space-y-1">
            <h3 className="font-sans font-black text-2xl text-white tracking-tight">You Are Code Active! 🔓</h3>
            <p className="text-sm text-slate-400 font-sans animate-fade-in">
              Thank you, <span className="text-green-400 font-bold">{name}</span>! Your Safaricom contact <span className="text-white font-mono">{phone}</span> has been locked into our database VIP status updates system.
            </p>
          </div>

          {/* Reward reveal box */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-2">
            <span className="text-[10px] font-mono text-slate-500 uppercase block tracking-wider">Your Discount Code:</span>
            <div className="inline-block px-4 py-2 bg-green-500/5 text-green-400 border border-green-500/30 rounded-lg text-sm font-mono font-bold tracking-widest uppercase">
              SAMDEALS-1000
            </div>
            <p className="text-[10px] text-slate-550 font-mono mt-1">
              * Mention this code to our shop rep on WhatsApp checkout to get KES 1,000 off right now!
            </p>
          </div>

          <button
            onClick={() => setIsSubmitted(false)}
            className="text-xs text-slate-400 hover:text-white transition-colors underline font-mono"
          >
            Register Another Person
          </button>
        </div>
      )}
    </div>
  );
}
