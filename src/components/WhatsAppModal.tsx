import React, { useState } from 'react';
import { X, MessageSquare, Check, Sparkles, AlertTriangle, Truck } from 'lucide-react';
import { Product } from '../types';
import { WHATSAPP_NUMBER } from '../data';

interface WhatsAppModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export default function WhatsAppModal({ product, isOpen, onClose }: WhatsAppModalProps) {
  const [includePhotos, setIncludePhotos] = useState(true);
  const [includeDelivery, setIncludeDelivery] = useState(true);
  const [includeWarranty, setIncludeWarranty] = useState(true);
  const [deliveryLocation, setDeliveryLocation] = useState('Ruiru Bypass');
  const [customQuestion, setCustomQuestion] = useState('');

  if (!isOpen) return null;

  const phoneNum = WHATSAPP_NUMBER; // Configurable WhatsApp Contact for SAM DEALS AND SERVICES
  
  const generateWhatsAppLink = () => {
    let text = `Hello SAM DEALS AND SERVICES! 🔌 I am interested in buying: *${product.title}* (${product.condition})\n`;
    text += `• Price: KES ${product.priceKes.toLocaleString()}\n`;
    if (product.storage && product.storage !== 'N/A') text += `• Storage: ${product.storage}\n`;
    if (product.ram && product.ram !== 'N/A') text += `• RAM: ${product.ram}\n`;
    if (product.batteryHealth && product.batteryHealth !== 'N/A') text += `• Battery Health: ${product.batteryHealth}\n`;
    
    text += `\n*My Inquiry Details:*\n`;
    if (includePhotos) {
      text += `📸 [ ] Please send me real physical photos of this unit (or a quick video of it working).\n`;
    }
    if (includeDelivery) {
      text += `🚚 [ ] I would like delivery to: *${deliveryLocation}*. Let me know the delivery rider fee.\n`;
    }
    if (includeWarranty) {
      text += `🛡️ [ ] Confirming the ${product.warranty} is active.\n`;
    }
    if (customQuestion.trim()) {
      text += `❓ [ ] Other Question: ${customQuestion.trim()}\n`;
    }
    
    text += `\nLooking forward to closing this deal! Cheers. ✨`;
    
    return `https://wa.me/${phoneNum}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in" id="whatsapp-modal">
      <div 
        className="w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-neutral-800 flex items-center justify-between bg-gradient-to-r from-emerald-950/20 to-neutral-900">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-sans font-bold text-lg text-white">WhatsApp Order Customizer</h3>
              <p className="text-xs text-neutral-400 font-mono">Bypasses slow cart • Open 24/7</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 hover:bg-neutral-800 rounded-lg transition-colors text-neutral-400 hover:text-white"
            id="close-wa-modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
          {/* Brief Product Preview Card */}
          <div className="flex items-center gap-4 p-3 bg-neutral-950 rounded-xl border border-neutral-800">
            <img 
              src={product.images[0]} 
              alt={product.title} 
              referrerPolicy="no-referrer"
              className="w-16 h-16 object-cover rounded-lg border border-neutral-800"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 text-[10px] uppercase tracking-wider bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold rounded">
                  {product.condition}
                </span>
                {product.quantityLeft <= 3 && (
                  <span className="text-red-400 text-xs font-semibold flex items-center gap-1 animate-pulse">
                    <span className="inline-block w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                    Only {product.quantityLeft} Left
                  </span>
                )}
              </div>
              <h4 className="font-sans font-bold text-white truncate mt-1 text-sm">{product.title}</h4>
              <p className="text-sm font-bold text-blue-400 font-mono">
                KES {product.priceKes.toLocaleString()} <span className="text-neutral-500 font-normal line-through text-xs ml-1 font-sans">KES {product.originalPriceKes.toLocaleString()}</span>
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-xs text-neutral-300 font-mono uppercase tracking-wider">Customize Your WhatsApp Inquiry Message:</h4>
            
            {/* Quick Template Toggles */}
            <div className="space-y-2">
              <label className="flex items-start gap-3 p-3 bg-neutral-950 rounded-xl border border-neutral-800 cursor-pointer hover:border-neutral-700 transition-colors">
                <input 
                  type="checkbox"
                  checked={includePhotos}
                  onChange={(e) => setIncludePhotos(e.target.checked)}
                  className="mt-1 accent-emerald-500 bg-neutral-900 border-neutral-800 rounded"
                />
                <div className="text-xs">
                  <p className="font-semibold text-white">Request Live Photos / Video Test</p>
                  <p className="text-neutral-400 mt-0.5">Asks our shop rep to record a live snap of this exact unit working.</p>
                </div>
              </label>

              <label className="flex items-start gap-3 p-3 bg-neutral-950 rounded-xl border border-neutral-800 cursor-pointer hover:border-neutral-700 transition-colors">
                <input 
                  type="checkbox"
                  checked={includeWarranty}
                  onChange={(e) => setIncludeWarranty(e.target.checked)}
                  className="mt-1 accent-emerald-500 bg-neutral-900 border-neutral-800 rounded"
                />
                <div className="text-xs">
                  <p className="font-semibold text-white">Confirm Warranty Details</p>
                  <p className="text-neutral-400 mt-0.5">Includes confirmation check box for the {product.warranty}.</p>
                </div>
              </label>

              <div className="flex flex-col gap-2 p-3 bg-neutral-950 rounded-xl border border-neutral-800">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input 
                    type="checkbox"
                    checked={includeDelivery}
                    onChange={(e) => setIncludeDelivery(e.target.checked)}
                    className="mt-1 accent-emerald-500 bg-neutral-900 border-neutral-800 rounded"
                  />
                  <div className="text-xs">
                    <p className="font-semibold text-white">Ask for Delivery Logistics</p>
                    <p className="text-neutral-400 mt-0.5">Calculate dispatch rider rates from our shop or CBD.</p>
                  </div>
                </label>
                {includeDelivery && (
                  <div className="mt-2 pl-6 animate-fade-in">
                    <label className="block text-[10px] font-mono text-neutral-400 uppercase">Your Delivery Town / Area:</label>
                    <input 
                      type="text" 
                      value={deliveryLocation}
                      onChange={(e) => setDeliveryLocation(e.target.value)}
                      placeholder="e.g. Ruiru Bypass, Juja, Nairobi CBD, Eldoret"
                      className="w-full mt-1 bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Custom Question input */}
            <div>
              <label className="block text-[10px] font-mono text-neutral-400 uppercase mb-1">Add A Custom Question (Optional):</label>
              <textarea 
                rows={2}
                value={customQuestion}
                onChange={(e) => setCustomQuestion(e.target.value)}
                placeholder="e.g. Can I pay in installments? Do you accept trade-ins for my iPhone 11?"
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Quick Trust Badges in modal */}
          <div className="grid grid-cols-2 gap-2 text-[11px] bg-neutral-950 p-3 rounded-xl border border-neutral-800">
            <div className="flex items-center gap-1.5 text-neutral-400 font-mono">
              <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
              <span>Tested & Verified Tech</span>
            </div>
            <div className="flex items-center gap-1.5 text-neutral-400 font-mono">
              <Truck className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
              <span>Pay on Delivery</span>
            </div>
          </div>
        </div>

        {/* Footer with primary action */}
        <div className="p-5 border-t border-neutral-800 bg-neutral-950">
          <a
            href={generateWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-emerald-500 hover:bg-emerald-600 active:scale-[0.98] text-black font-bold rounded-xl transition-all shadow-[0_4px_20px_rgba(16,185,129,0.3)] hover:shadow-[0_4px_25px_rgba(16,185,129,0.4)] text-center font-sans tracking-wide"
            id="redirect-to-whatsapp"
          >
            <MessageSquare className="w-5 h-5 fill-current" />
            Send Custom Inquiry on WhatsApp
          </a>
          <p className="text-[10px] text-center text-neutral-500 mt-2 font-mono">
            Will automatically generate text template and launch your WhatsApp app instant.
          </p>
        </div>
      </div>
    </div>
  );
}
