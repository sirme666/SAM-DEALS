import React, { useState, useEffect } from 'react';
import { X, Check, ArrowLeftRight, MessageSquare, Battery, ShieldAlert, Award, ArrowRight, Layers, Bell, TrendingDown } from 'lucide-react';
import { Product } from '../types';

interface ProductDetailModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onAddToCompare: (product: Product) => void;
  isCompared: boolean;
  onOpenWhatsAppModal: (product: Product) => void;
}

export default function ProductDetailModal({ 
  product, 
  isOpen, 
  onClose, 
  onAddToCompare, 
  isCompared,
  onOpenWhatsAppModal
}: ProductDetailModalProps) {
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [isAlertFormOpen, setIsAlertFormOpen] = useState(false);
  const [emailInput, setEmailInput] = useState(() => localStorage.getItem('last_user_email') || '');
  const [targetPriceInput, setTargetPriceInput] = useState(() => String(Math.round(product.priceKes * 0.9)));
  const [forceRerender, setForceRerender] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setActiveImageIdx(0);
      setTargetPriceInput(String(Math.round(product.priceKes * 0.9)));
      setIsAlertFormOpen(false);
    }
  }, [product.id, isOpen]);

  if (!isOpen) return null;

  // Read existing notification setups from localStorage for this product
  const getSubscribedAlert = () => {
    try {
      const allAlerts = JSON.parse(localStorage.getItem('samdeals_price_alerts') || '[]');
      return allAlerts.find((item: any) => item.productId === product.id);
    } catch {
      return null;
    }
  };

  const activeAlert = getSubscribedAlert();
  const isSubscribed = !!activeAlert;
  const alertEmail = activeAlert?.email || '';
  const alertPrice = activeAlert?.targetPrice || 0;

  const handleSetAlert = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedPrice = parseFloat(targetPriceInput);
    if (!emailInput || isNaN(parsedPrice) || parsedPrice <= 0) {
      return;
    }

    try {
      const allAlerts = JSON.parse(localStorage.getItem('samdeals_price_alerts') || '[]');
      const filtered = allAlerts.filter((item: any) => item.productId !== product.id);
      filtered.push({
        productId: product.id,
        targetPrice: parsedPrice,
        email: emailInput
      });
      localStorage.setItem('samdeals_price_alerts', JSON.stringify(filtered));
      localStorage.setItem('last_user_email', emailInput);
      setForceRerender(prev => prev + 1);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCancelSubscription = () => {
    try {
      const allAlerts = JSON.parse(localStorage.getItem('samdeals_price_alerts') || '[]');
      const filtered = allAlerts.filter((item: any) => item.productId !== product.id);
      localStorage.setItem('samdeals_price_alerts', JSON.stringify(filtered));
      setForceRerender(prev => prev + 1);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fade-in" id="product-detail-modal">
      <div 
        className="w-full max-w-4xl bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left Side: Images */}
        <div className="w-full md:w-1/2 bg-neutral-950 p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-neutral-800">
          <div className="space-y-4">
            {/* Main display photo */}
            <div className="relative h-64 md:h-80 w-full rounded-2xl overflow-hidden border border-neutral-850">
              <img 
                src={product.images[activeImageIdx]} 
                alt={product.title} 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-all duration-300"
              />
              <span className="absolute top-4 left-4 px-3 py-1 text-[10px] font-bold uppercase tracking-wider bg-black/70 text-emerald-400 backdrop-blur-md rounded-full border border-emerald-500/20">
                {product.condition}
              </span>
            </div>

            {/* Carousel Thumbnails */}
            <div className="flex gap-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIdx(idx)}
                  className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                    activeImageIdx === idx ? 'border-blue-500 scale-95' : 'border-neutral-800/80 grayscale hover:grayscale-0'
                  }`}
                >
                  <img src={img} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Quick Quality Pledge */}
          <div className="mt-6 pt-4 border-t border-neutral-900 hidden md:block">
            <h5 className="text-xs font-bold text-neutral-300 flex items-center gap-1.5 uppercase font-mono">
              <Award className="w-4 h-4 text-emerald-400" />
              SAM DEALS Tested Badge
            </h5>
            <p className="text-[11px] text-neutral-500 leading-relaxed mt-1">
              Every gadget goes through a strict 35-point testing schedule including Face ID validation, board diagnostics, sensor checks, and custom load testing.
            </p>
          </div>
        </div>

        {/* Right Side: Data specifications */}
        <div className="w-full md:w-1/2 p-6 md:p-8 overflow-y-auto flex flex-col justify-between max-h-[50vh] md:max-h-[90vh]">
          <div className="space-y-5">
            {/* Header, title & cost */}
            <div>
              <div className="flex justify-between items-start">
                <span className="px-2.5 py-0.5 text-[9px] uppercase font-mono tracking-wider bg-blue-500/10 text-blue-400 font-bold border border-blue-500/20 rounded-full">
                  {product.category.toUpperCase()}
                </span>
                
                {/* Close Button */}
                <button 
                  onClick={onClose}
                  className="p-1.5 hover:bg-neutral-800 rounded-lg text-neutral-400 hover:text-white"
                  id="prod-detail-close-btn"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <h3 className="font-sans font-extrabold text-2xl text-white tracking-tight mt-2 leading-tight">
                {product.title}
              </h3>

              <div className="flex items-center gap-3 mt-2">
                <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 font-mono">
                  KES {product.priceKes.toLocaleString()}
                </span>
                <span className="text-sm text-neutral-500 line-through font-sans">
                  KES {product.originalPriceKes.toLocaleString()}
                </span>
                <span className="text-[10px] bg-red-500/10 text-red-400 font-bold px-2 py-0.5 rounded border border-red-500/20">
                  SAVE {Math.round(((product.originalPriceKes - product.priceKes) / product.originalPriceKes) * 100)}%
                </span>
              </div>
            </div>

            {/* Condition Check Grid */}
            <div className="grid grid-cols-2 gap-2 text-xs bg-neutral-950 p-3 rounded-2xl border border-neutral-800/80">
              {product.storage && (
                <div>
                  <span className="text-neutral-500 text-[10px] font-mono block">STORAGE LIMIT</span>
                  <span className="font-bold text-neutral-200">{product.storage}</span>
                </div>
              )}
              {product.ram && (
                <div>
                  <span className="text-neutral-500 text-[10px] font-mono block">SYSTEM MEMORY</span>
                  <span className="font-bold text-neutral-200">{product.ram}</span>
                </div>
              )}
              {product.batteryHealth && product.batteryHealth !== 'N/A' && (
                <div className="mt-2 pt-2 border-t border-neutral-900 col-span-2 flex items-center gap-2">
                  <div className="p-1.5 bg-emerald-500/10 text-emerald-400 rounded-md">
                    <Battery className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-neutral-500 text-[9px] font-mono block">BATTERY CAPACITY</span>
                    <span className="font-bold text-emerald-400">{product.batteryHealth} Battery Health</span>
                  </div>
                </div>
              )}
            </div>

            {/* Main Desc */}
            <div className="space-y-1.5">
              <span className="text-[10px] uppercase font-mono tracking-wider text-neutral-500">Overview Description:</span>
              <p className="text-xs text-neutral-300 leading-relaxed font-sans">{product.description}</p>
            </div>

            {/* Technical Bullet Specs */}
            <div className="space-y-2">
              <span className="text-[10px] uppercase font-mono tracking-wider text-neutral-500">Technical Spec Sheet:</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-xs">
                {product.keySpecs.map((spec, sidx) => (
                  <div key={sidx} className="flex justify-between py-1 border-b border-neutral-850">
                    <span className="text-neutral-500 font-sans">{spec.label}:</span>
                    <span className="font-semibold text-white font-sans">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sticky Guarantee indicators */}
            <div className="space-y-2 p-3 bg-neutral-950 rounded-2xl border border-neutral-800 text-xs">
              <div className="flex items-center gap-2 text-neutral-300">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Local Shop Warranty: <strong className="text-emerald-400">{product.warranty}</strong></span>
              </div>
              <div className="flex items-center gap-2 text-neutral-300">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Countrywide Dispatch delivery or in-person pickup</span>
              </div>
            </div>
          </div>

          {/* Core CTAs layout */}
          <div className="space-y-3 pt-6 border-t border-neutral-800">
            <div className="flex gap-2">
              {/* Add to Compare */}
              <button
                onClick={() => onAddToCompare(product)}
                className={`flex-1 py-3 px-4 rounded-xl font-bold font-sans text-xs flex items-center justify-center gap-1.5 border transition-all ${
                  isCompared 
                    ? 'bg-blue-500/15 border-blue-500 text-blue-400 shadow-inner' 
                    : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700'
                }`}
                id={`add-compare-modal-btn-${product.id}`}
              >
                <ArrowLeftRight className="w-4 h-4" />
                {isCompared ? 'Compared!' : 'Add to Compare'}
              </button>

              {/* Price Drop Alert */}
              <button
                onClick={() => setIsAlertFormOpen(!isAlertFormOpen)}
                className={`flex-1 py-3 px-4 rounded-xl font-bold font-sans text-xs flex items-center justify-center gap-1.5 border transition-all ${
                  isSubscribed 
                    ? 'bg-amber-500/15 border-amber-500 text-amber-400 shadow-inner' 
                    : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700'
                }`}
                id={`price-alert-modal-btn-${product.id}`}
              >
                <Bell className="w-4 h-4" />
                {isSubscribed ? 'Alert Active!' : 'Set Price Alert'}
              </button>
            </div>

            {/* Subscriptions inline form panel */}
            {isAlertFormOpen && (
              <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-2xl space-y-3 animate-fade-in text-left">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1">
                    <TrendingDown className="w-3.5 h-3.5" />
                    Set Price Alert
                  </span>
                  <button 
                    onClick={() => setIsAlertFormOpen(false)}
                    className="text-[10px] text-neutral-500 hover:text-white font-mono"
                  >
                    Close
                  </button>
                </div>

                {isSubscribed ? (
                  <div className="space-y-2 py-1">
                    <div className="p-2.5 bg-green-500/10 border border-green-500/20 rounded-xl text-xs text-green-400">
                      <p className="font-semibold flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Subscription Active
                      </p>
                      <p className="text-[10.5px] text-neutral-400 mt-1">
                        We will notify <strong className="text-neutral-300">{alertEmail}</strong> when {product.title} reaches <strong className="text-neutral-300 font-mono">KES {alertPrice?.toLocaleString()}</strong> or lower!
                      </p>
                    </div>
                    <button 
                      type="button"
                      onClick={handleCancelSubscription}
                      className="text-[10px] text-red-400 hover:underline block font-mono align-left"
                    >
                      Cancel Alert Subscription
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSetAlert} className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                       <div>
                         <label className="text-[9px] font-mono text-neutral-500 uppercase block mb-1">Target Price (KES)</label>
                         <div className="relative">
                           <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[9px] text-neutral-500 font-mono">KES</span>
                           <input 
                             type="number"
                             required
                             min="1000"
                             max={product.priceKes - 1}
                             value={targetPriceInput}
                             onChange={(e) => setTargetPriceInput(e.target.value)}
                             className="w-full pl-9 pr-2 py-2 bg-neutral-900 border border-neutral-850 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500 font-bold font-mono"
                             placeholder={`e.g. ${Math.round(product.priceKes * 0.9)}`}
                           />
                         </div>
                       </div>
                       <div>
                         <label className="text-[9px] font-mono text-neutral-500 uppercase block mb-1">Your Email</label>
                         <input 
                           type="email"
                           required
                           value={emailInput}
                           onChange={(e) => setEmailInput(e.target.value)}
                           className="w-full px-2.5 py-2 bg-neutral-900 border border-neutral-850 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
                           placeholder="e.g. sam@domain.com"
                         />
                       </div>
                    </div>

                    <div className="flex gap-1.5 justify-between items-center pt-1">
                      <div className="flex gap-1.5">
                        <button 
                          type="button"
                          onClick={() => setTargetPriceInput(String(Math.round(product.priceKes * 0.9)))}
                          className="px-2 py-1 bg-neutral-900 border border-neutral-850 hover:border-neutral-700 rounded-lg text-[9px] text-neutral-400 font-mono"
                        >
                          -10%
                        </button>
                        <button 
                          type="button"
                          onClick={() => setTargetPriceInput(String(Math.round(product.priceKes * 0.85)))}
                          className="px-2 py-1 bg-neutral-900 border border-neutral-850 hover:border-neutral-700 rounded-lg text-[9px] text-neutral-400 font-mono"
                        >
                          -15%
                        </button>
                      </div>

                      <button
                        type="submit"
                        className="py-1.5 px-4 bg-amber-500 hover:bg-amber-600 font-bold rounded-xl text-xs text-black transition-all"
                      >
                        Set Alert
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}

            {/* Massive instant WhatsApp checkout drawer */}
            <button
              onClick={() => onOpenWhatsAppModal(product)}
              className="w-full py-3.5 px-4 bg-emerald-500 hover:bg-emerald-600 active:scale-[0.98] text-black font-extrabold rounded-xl transition-all shadow-[0_4px_25px_rgba(16,185,129,0.3)] flex items-center justify-center gap-2 font-sans tracking-wide"
              id={`buy-whatsapp-modal-btn-${product.id}`}
            >
              <MessageSquare className="w-5 h-5 fill-current" />
              Inquire / Customize WhatsApp Order
            </button>
            <p className="text-[9px] text-center text-neutral-500 font-mono">
              ⚡ Open template builder • Pay-On-Delivery accepted Countrywide!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
