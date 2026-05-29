import React from 'react';
import { X, Clock, Calendar, Bookmark, Heart, Send, CheckCircle } from 'lucide-react';
import { BlogArticle, Product } from '../types';
import { PRODUCTS } from '../data';

interface BlogModalProps {
  article: BlogArticle;
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

export default function BlogModal({ article, isOpen, onClose, onSelectProduct }: BlogModalProps) {
  if (!isOpen) return null;

  // Retrieve products bound to this blog
  const relatedProducts = PRODUCTS.filter(p => article.relatedProductIds?.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fade-in" id="blog-modal-wrapper">
      <div 
        className="w-full max-w-3xl bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Banner Section */}
        <div className="relative h-64 w-full">
          <img 
            src={article.image} 
            alt={article.title} 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/40 to-transparent"></div>
          
          {/* Header Action Elements inside Banner */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-black/60 hover:bg-neutral-800 rounded-full text-white transition-all border border-neutral-700/50"
            id="close-blog-modal-btn"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6">
            <span className="px-3 py-1 text-[10px] uppercase font-mono tracking-wider bg-blue-500 border border-blue-400 text-white font-bold rounded-md">
              {article.category}
            </span>
            <h3 className="font-sans font-extrabold text-2xl text-white tracking-tight mt-2 drop-shadow-md">
              {article.title}
            </h3>
          </div>
        </div>

        {/* Content Body Container */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
          {/* Metadata Bar */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-400 font-mono pb-4 border-b border-neutral-800/60">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4 text-neutral-500" />
              {article.date}
            </span>
            <span className="w-1.5 h-1.5 bg-neutral-700 rounded-full"></span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-neutral-500" />
              {article.readTime}
            </span>
            <span className="w-1.5 h-1.5 bg-neutral-700 rounded-full"></span>
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <CheckCircle className="w-4 h-4" /> Verified Guide
            </span>
          </div>

          {/* Article Full Text */}
          <div className="prose prose-invert prose-sm text-neutral-300 leading-relaxed space-y-4 max-w-none">
            {article.content.split('\n\n').map((paragraph, idx) => {
              if (paragraph.startsWith('###')) {
                return (
                  <h4 key={idx} className="font-sans font-bold text-lg text-white mt-5 mb-2 border-l-2 border-blue-400 pl-3">
                    {paragraph.replace('###', '').trim()}
                  </h4>
                );
              }
              if (paragraph.startsWith('*')) {
                return (
                  <ul key={idx} className="list-disc list-inside pl-4 space-y-1 my-2">
                    {paragraph.split('\n').map((bullet, bidx) => (
                      <li key={bidx} className="text-neutral-300 text-sm">
                        {bullet.replace('*', '').trim()}
                      </li>
                    ))}
                  </ul>
                );
              }
              return (
                <p key={idx} className="text-sm">
                  {paragraph}
                </p>
              );
            })}
          </div>

          {/* Connected Recommendations / Internal linking for instant conversions! */}
          {relatedProducts.length > 0 && (
            <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-5 space-y-4">
              <h4 className="font-sans font-extrabold text-base text-white flex items-center gap-2">
                <Bookmark className="w-5 h-5 text-blue-400" />
                Featured SAM DEALS In This Article:
              </h4>
              <p className="text-xs text-neutral-400">
                These devices are currently tested, verified, and in stock at our store/CBD outlet. Click any to view full specs or start a WhatsApp transaction:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedProducts.map(p => (
                  <div 
                    key={p.id}
                    onClick={() => {
                      onSelectProduct(p);
                      onClose();
                    }}
                    className="group bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 rounded-xl p-3 flex gap-3 items-center cursor-pointer hover:border-neutral-700 transition-all"
                  >
                    <img 
                      src={p.images[0]} 
                      alt={p.title} 
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 object-cover rounded-lg border border-neutral-800 group-hover:scale-105 transition-transform"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-[9px] uppercase font-mono tracking-wider font-bold text-blue-400">
                        {p.condition}
                      </span>
                      <h5 className="font-bold text-white text-xs truncate group-hover:text-blue-400 transition-colors">
                        {p.title}
                      </h5>
                      <p className="text-xs font-bold text-emerald-400 font-mono mt-0.5">
                        KES {p.priceKes.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-neutral-800 bg-neutral-950 flex justify-between items-center sm:px-8">
          <span className="text-xs text-neutral-500 font-mono">
            Written by SAM DEALS Tech Team
          </span>
          <button 
            onClick={onClose}
            className="px-5 py-2 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-bold rounded-lg transition-all"
            id="close-blog-footer"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
}
