import React from 'react';
import { X, Check, ArrowLeftRight, MessageSquare, Battery, HardDrive, ShieldAlert, BadgeCheck } from 'lucide-react';
import { Product } from '../types';
import { WHATSAPP_NUMBER } from '../data';

interface CompareModalProps {
  products: Product[];
  isOpen: boolean;
  onClose: () => void;
  onRemoveFromCompare: (id: string) => void;
}

export default function CompareModal({ products, isOpen, onClose, onRemoveFromCompare }: CompareModalProps) {
  if (!isOpen) return null;

  const handleWhatsAppInquiry = (product: Product) => {
    let text = `Hello SAM DEALS AND SERVICES! 🔌 I checked your comparison page and decided to inquire about this device:\n\n`;
    text += `*${product.title}*\n`;
    text += `• Price: KES ${product.priceKes.toLocaleString()}\n`;
    text += `• Condition: ${product.condition}\n`;
    if (product.storage) text += `• Storage: ${product.storage}\n`;
    if (product.ram) text += `• RAM: ${product.ram}\n`;
    text += `• Warranty: ${product.warranty}\n\n`;
    text += `Is this item available for delivery or can I come down to view it? Thanks!`;
    
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-fade-in" id="compare-modal-wrapper">
      <div 
        className="w-full max-w-4xl bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-neutral-800 flex items-center justify-between bg-gradient-to-r from-blue-950/20 to-neutral-900">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
              <ArrowLeftRight className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-sans font-extrabold text-xl text-white">Side-by-Side Comparison</h3>
              <p className="text-xs text-neutral-400 font-mono">Detailed specifications comparison • Choose the best deals</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 hover:bg-neutral-800 rounded-lg transition-colors text-neutral-400 hover:text-white"
            id="close-compare-modal-btn"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Outer Body Container */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {products.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <ArrowLeftRight className="w-12 h-12 text-neutral-600 mx-auto stroke-1" />
              <p className="text-neutral-400 text-sm">No devices selected for comparison.</p>
              <button 
                onClick={onClose}
                className="px-4 py-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold rounded-lg hover:bg-blue-500/20 transition-all"
              >
                Go Browse Deals
              </button>
            </div>
          ) : products.length === 1 ? (
            <div className="text-center py-12 space-y-4">
              <div className="flex justify-center">
                <img 
                  src={products[0].images[0]} 
                  alt={products[0].title}
                  referrerPolicy="no-referrer"
                  className="w-24 h-24 object-cover rounded-xl border border-neutral-800"
                />
              </div>
              <p className="text-neutral-400 text-sm">
                You have selected <span className="text-white font-semibold">{products[0].title}</span>. Select another item from the catalog to compare them side-by-side!
              </p>
              <button 
                onClick={onClose}
                className="px-4 py-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold rounded-lg hover:bg-blue-500/20 transition-all"
              >
                Close and Add Second Device
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              {products.map((p) => (
                <div key={p.id} className="bg-neutral-950 rounded-2xl border border-neutral-800 p-5 space-y-5 relative">
                  
                  {/* Remove target */}
                  <button 
                    onClick={() => onRemoveFromCompare(p.id)}
                    className="absolute top-4 right-4 p-1.5 bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-red-400 rounded-lg hover:border-red-500/20 transition-all text-xs flex items-center gap-1"
                    id={`remove-compare-${p.id}`}
                  >
                    <X className="w-3.5 h-3.5" />
                    Remove
                  </button>

                  <div className="space-y-3">
                    <img 
                      src={p.images[0]} 
                      alt={p.title} 
                      referrerPolicy="no-referrer"
                      className="w-full h-44 object-cover rounded-xl border border-neutral-800"
                    />
                    <div>
                      <span className="px-2.5 py-0.5 text-[9px] uppercase tracking-wider bg-orange-500/10 border border-orange-500/20 text-orange-400 font-bold rounded-full">
                        {p.condition}
                      </span>
                      <h4 className="font-sans font-bold text-white text-base mt-2 leading-snug">{p.title}</h4>
                      <p className="text-xl font-extrabold text-blue-400 font-mono mt-1">
                        KES {p.priceKes.toLocaleString()}
                        <span className="text-neutral-500 font-normal line-through text-xs ml-1.5 font-sans">
                          KES {p.originalPriceKes.toLocaleString()}
                        </span>
                      </p>
                    </div>
                  </div>

                  <hr className="border-neutral-800/60" />

                  {/* Specifications stack */}
                  <div className="space-y-3">
                    <h5 className="text-[10px] uppercase font-mono tracking-wider text-neutral-500">Core Specifications</h5>
                    
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {p.storage && p.storage !== 'N/A' && (
                        <div className="p-2.5 bg-neutral-900 border border-neutral-800/40 rounded-xl flex items-center gap-2">
                          <HardDrive className="w-4 h-4 text-neutral-400" />
                          <div>
                            <span className="text-[10px] text-neutral-500 font-mono block">STORAGE</span>
                            <span className="font-bold text-neutral-200">{p.storage}</span>
                          </div>
                        </div>
                      )}

                      {p.ram && p.ram !== 'N/A' && (
                        <div className="p-2.5 bg-neutral-900 border border-neutral-800/40 rounded-xl flex items-center gap-2">
                          <Check className="w-4 h-4 text-neutral-400" />
                          <div>
                            <span className="text-[10px] text-neutral-500 font-mono block">MEMORY</span>
                            <span className="font-bold text-neutral-200">{p.ram}</span>
                          </div>
                        </div>
                      )}

                      {p.batteryHealth && p.batteryHealth !== 'N/A' && (
                        <div className="p-2.5 bg-neutral-900 border border-neutral-800/40 rounded-xl flex items-center gap-2">
                          <Battery className="w-4 h-4 text-neutral-400" />
                          <div>
                            <span className="text-[10px] text-neutral-500 font-mono block">BATTERY HEALTH</span>
                            <span className="font-bold text-neutral-200">{p.batteryHealth}</span>
                          </div>
                        </div>
                      )}

                      <div className="p-2.5 bg-neutral-900 border border-neutral-800/40 rounded-xl flex items-center gap-2">
                        <BadgeCheck className="w-4 h-4 text-emerald-400" />
                        <div>
                          <span className="text-[10px] text-neutral-500 font-mono block">WARRANTY</span>
                          <span className="font-bold text-emerald-400">{p.warranty.split(' ')[0]} {p.warranty.split(' ')[1]}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bullet Spec Grid */}
                  <div className="space-y-2 pt-2 text-xs text-neutral-300">
                    <p className="text-[10px] uppercase font-mono tracking-wider text-neutral-500">Feature Details:</p>
                    <ul className="space-y-1.5">
                      {p.keySpecs.map((spec, sidx) => (
                        <li key={sidx} className="flex justify-between items-center py-1 border-b border-neutral-900">
                          <span className="text-neutral-500">{spec.label}</span>
                          <span className="font-semibold text-white text-right">{spec.value}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Hot WhatsApp action unique to card */}
                  <div className="pt-4">
                    <button
                      onClick={() => handleWhatsAppInquiry(p)}
                      className="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-emerald-500 hover:bg-emerald-600 active:scale-[0.98] text-black font-extrabold rounded-xl transition-all shadow-md font-sans text-xs"
                      id={`compare-inquire-${p.id}`}
                    >
                      <MessageSquare className="w-4 h-4 fill-current" />
                      Inquire About This Device
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-neutral-800 bg-neutral-950 flex justify-between items-center">
          <p className="text-[10px] text-neutral-400 font-mono">
            * Selected products will be kept in memory for quick comparisons.
          </p>
          <button 
            onClick={onClose}
            className="px-5 py-2 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-bold rounded-lg transition-all"
            id="comparison-close-footer"
          >
            Close Comparison
          </button>
        </div>
      </div>
    </div>
  );
}
