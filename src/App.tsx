import React, { useState, useEffect } from 'react';
import { 
  Search, 
  MessageSquare, 
  ArrowLeftRight, 
  Check, 
  Award, 
  Truck, 
  ShieldCheck, 
  Star, 
  Sparkles, 
  Filter, 
  ChevronRight, 
  HelpCircle, 
  PhoneCall, 
  Info,
  Layers,
  Heart,
  Clock,
  ExternalLink,
  BookOpen
} from 'lucide-react';

import { PRODUCTS, TESTIMONIALS, BLOG_ARTICLES, WHATSAPP_NUMBER } from './data';
import { Product, BlogArticle } from './types';

// Composed Child Components
import ProductDetailModal from './components/ProductDetailModal';
import WhatsAppModal from './components/WhatsAppModal';
import CompareModal from './components/CompareModal';
import BlogModal from './components/BlogModal';
import TradeInCalculator from './components/TradeInCalculator';
import LeadCapture from './components/LeadCapture';
import GoogleContactsManager from './components/GoogleContactsManager';

export default function App() {
  // Navigation / Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedCondition, setSelectedCondition] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('popular');

  // Selected item states for Modals
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeWhatsAppProduct, setActiveWhatsAppProduct] = useState<Product | null>(null);
  const [activeBlog, setActiveBlog] = useState<BlogArticle | null>(null);
  
  // High-conversional system state trackers
  const [recentlyViewedIds, setRecentlyViewedIds] = useState<string[]>([]);
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  // Active Countdown Timer State (creating simulated urge to complete purchases!)
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 12, seconds: 20 });

  // Load recently viewed & presets on mount
  useEffect(() => {
    const savedViewed = localStorage.getItem('wataalam_recently_viewed');
    if (savedViewed) {
      setRecentlyViewedIds(JSON.parse(savedViewed));
    }
  }, []);

  // Update Countdown Timer every second
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          // Reset countdown timer once it hits zero to loop the deal!
          return { hours: 5, minutes: 24, seconds: 12 };
        }
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Handle viewing product detail
  const handleViewProductDetails = (product: Product) => {
    setSelectedProduct(product);
    
    // Add to Recently Viewed tracker
    setRecentlyViewedIds(prev => {
      const filtered = prev.filter(id => id !== product.id);
      const updated = [product.id, ...filtered].slice(0, 4); // Keep top 4
      localStorage.setItem('wataalam_recently_viewed', JSON.stringify(updated));
      return updated;
    });
  };

  // Compare Device management
  const handleToggleCompare = (product: Product) => {
    setCompareIds(prev => {
      if (prev.includes(product.id)) {
        return prev.filter(id => id !== product.id);
      } else {
        if (prev.length >= 2) {
          // If already has 2 items, replace the oldest one
          return [prev[1], product.id];
        }
        return [...prev, product.id];
      }
    });
  };

  const handleRemoveFromCompare = (productId: string) => {
    setCompareIds(prev => prev.filter(id => id !== productId));
  };

  // Live filter computation
  const filteredProducts = PRODUCTS.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    
    const matchesCondition = selectedCondition === 'all' || 
                             (selectedCondition === 'new' && product.condition === 'Brand New') ||
                             (selectedCondition === 'refurbished' && product.condition.startsWith('Refurbished')) ||
                             (selectedCondition === 'openbox' && product.condition === 'Open Box');

    return matchesSearch && matchesCategory && matchesCondition;
  }).sort((a, b) => {
    if (sortBy === 'price-low') return a.priceKes - b.priceKes;
    if (sortBy === 'price-high') return b.priceKes - a.priceKes;
    if (sortBy === 'rating') return b.rating - a.rating;
    return b.reviewsCount - a.reviewsCount; // default popular
  });

  const comparedProducts = PRODUCTS.filter(p => compareIds.includes(p.id));
  const recentlyViewedProducts = PRODUCTS.filter(p => recentlyViewedIds.includes(p.id));

  // Quick helper to initiate general WhatsApp inquire
  const handleInquireGeneral = () => {
    const text = `Hello SAM DEALS AND SERVICES! 🔌 I am visiting your deals website. I wanted to inquire general questions about your location, delivery logistics, or payment on delivery terms! Let's chat!`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      
      {/* ⚠️ TOP ANNOUNCEMENT URGENCY HEADER BAR */}
      <div className="bg-blue-600 py-2 px-6 flex flex-col sm:flex-row justify-between items-center text-xs font-bold tracking-wider uppercase text-white" id="announcement-bar">
        <span className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 animate-pulse text-yellow-300" />
          ⚡ Flash Sale: Tested & Verified Devices with Nationwide Rider Delivery!
        </span>
        <span className="flex items-center gap-4 mt-2 sm:mt-0 font-sans normal-case text-[11px] tracking-normal font-medium">
          <span>Ends in: <span className="bg-slate-900 px-2 py-0.5 rounded text-yellow-400 font-mono font-bold">{String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}</span></span>
          <button 
            onClick={handleInquireGeneral}
            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-full flex items-center gap-1.5 transition-colors uppercase text-[10px] tracking-wider font-bold"
          >
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
            WhatsApp Location 📍
          </button>
        </span>
      </div>

      {/* CORE LOGO & SEARCH HEADER BAR */}
      <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-850 px-4 py-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row gap-4 justify-between items-center">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center font-black italic text-white text-base">
              S
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold tracking-tight text-white">
                  SAM<span className="text-blue-500 underline decoration-2"> DEALS AND SERVICES</span>
                </h1>
                <span className="px-1.5 py-0.5 text-[8px] bg-slate-800 text-slate-300 border border-slate-700 rounded font-mono font-bold uppercase tracking-wider">
                  VERIFIED PLUG
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-mono tracking-wider mt-0.5">KENYA ELECTRONICS DEALS HUB</p>
            </div>
          </div>

          {/* Quick Search bar */}
          <div className="relative w-full sm:max-w-md flex-1">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-500">
              <Search className="w-4 h-4" />
            </span>
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search phones, laptops, accessories..."
              className="w-full bg-slate-800 border border-slate-700 rounded-full py-2 px-10 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-sans"
              id="global-search-input"
            />
          </div>

          {/* Dynamic Navigation elements */}
          <div className="flex items-center gap-2">
            <button 
              onClick={() => {
                const specCalc = document.getElementById('trade-in-estimator');
                specCalc?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-lg transition-all border border-slate-700 flex items-center gap-1.5"
            >
              <ArrowLeftRight className="w-3.5 h-3.5 text-blue-400" />
              Swap Device
            </button>

            {/* Compare Drawer counter trigger */}
            <button
              onClick={() => setIsCompareModalOpen(true)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all flex items-center gap-1.5 relative ${
                compareIds.length > 0 
                  ? 'bg-blue-500/10 border-blue-500 text-blue-400' 
                  : 'bg-slate-800 border-slate-700 text-slate-450 hover:text-slate-200'
              }`}
              id="header-compare-trigger-btn"
            >
              <Layers className="w-3.5 h-3.5" />
              Compare
              {compareIds.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-blue-500 text-white rounded-full flex items-center justify-center text-[9px] font-extrabold animate-bounce">
                  {compareIds.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* CORE HERO SECTION */}
      <section className="relative px-4 py-16 md:px-8 bg-slate-950 overflow-hidden border-b border-slate-800">
        
        {/* Ambient Blur backdrops */}
        <div className="absolute top-1/4 right-12 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-12 left-10 w-64 h-64 bg-blue-900/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto text-center space-y-6 relative">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-900/30 text-blue-450 rounded-full text-xs font-semibold border border-blue-900/40">
            <svg className="w-3 h-3 text-blue-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/><path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h.01a1 1 0 100-2H10zm3 0a1 1 0 000 2h.01a1 1 0 100-2H13zM7 13a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h.01a1 1 0 100-2H10zm3 0a1 1 0 000 2h.01a1 1 0 100-2H13z" clip-rule="evenodd"/></svg>
            Tested & Verified Devices
          </div>

          <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-slate-100 tracking-tight max-w-4xl mx-auto leading-tight">
            Premium Tech.<br/><span className="text-blue-500 underline decoration-2">Honest Prices.</span>
          </h2>

          <p className="text-sm md:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Your trusted plug for phones, laptops, and accessories in Kenya. Skip buggy street devices; every item is tested on a strict commercial diagnostic benchmark before delivery. Check warranty details, play-on-delivery, and trade-in support standard.
          </p>

          {/* Dual Main CTAs */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
            <button
              onClick={() => {
                const shopGrid = document.getElementById('shop-section');
                shopGrid?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-blue-600 px-8 py-3.5 rounded-xl font-bold hover:bg-blue-500 transition-all text-white text-sm tracking-wide shadow-lg shadow-blue-900/20 active:scale-[0.98]"
              id="hero-shop-deals-btn"
            >
              Shop Hot Deals
            </button>

            <button
              onClick={handleInquireGeneral}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all text-sm tracking-wide active:scale-[0.98]"
              id="hero-whatsapp-chat-btn"
            >
              <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
              Join Weekly Plug List
            </button>
          </div>

          {/* Quick Social Proof */}
          <div className="pt-8 border-t border-slate-900 flex justify-center items-center gap-4">
            <div className="flex -space-x-3">
              <div className="w-10 h-10 rounded-full border-2 border-slate-950 bg-slate-800 flex items-center justify-center text-xs text-slate-100 font-bold">JM</div>
              <div className="w-10 h-10 rounded-full border-2 border-slate-950 bg-slate-800 flex items-center justify-center text-xs text-slate-100 font-bold">AK</div>
              <div className="w-10 h-10 rounded-full border-2 border-slate-950 bg-slate-800 flex items-center justify-center text-xs text-slate-400 font-bold">+</div>
            </div>
            <div className="text-left font-sans">
              <div className="flex text-yellow-400 text-sm">
                ★★★★★
              </div>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Trusted by 500+ Customers</p>
            </div>
          </div>

        </div>
      </section>

      {/* ⏰ DEAL OF THE DAY TICKER & URGENCY */}
      <section className="bg-slate-900 border-y border-slate-800 py-6 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-red-500/10 text-red-400 rounded-xl">
              <Clock className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                <h3 className="font-sans font-extrabold text-sm uppercase tracking-wider text-red-400">TODAY'S SPECIAL OUTLET FLASHSALE</h3>
              </div>
              <p className="text-xs text-slate-450 font-sans mt-0.5">Price drops are reserved only for customers checking out before timer expires!</p>
            </div>
          </div>

          {/* Urgency Countdown Ticker */}
          <div className="flex items-center gap-3 bg-slate-950 border border-slate-800 px-5 py-3 rounded-2xl">
            <div className="text-center min-w-[40px]">
              <span className="text-xl font-mono font-black text-white">{String(timeLeft.hours).padStart(2, '0')}</span>
              <span className="text-[9px] font-mono text-slate-500 block">HRS</span>
            </div>
            <span className="text-lg font-mono text-slate-700">:</span>
            <div className="text-center min-w-[40px]">
              <span className="text-xl font-mono font-black text-white">{String(timeLeft.minutes).padStart(2, '0')}</span>
              <span className="text-[9px] font-mono text-slate-500 block">MIN</span>
            </div>
            <span className="text-lg font-mono text-slate-700">:</span>
            <div className="text-center min-w-[40px]">
              <span className="text-xl font-mono font-black text-yellow-400">{String(timeLeft.seconds).padStart(2, '0')}</span>
              <span className="text-[9px] font-mono text-slate-500 block">SEC</span>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN PRODUCTS & FILTER SECTON */}
      <main className="max-w-7xl mx-auto px-4 py-12 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8" id="shop-section">
        
        {/* Left Filters Rail Panel: (Col Span 3) */}
        <aside className="lg:col-span-3 space-y-6">
          
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-sans font-bold text-sm text-white flex items-center gap-1.5 uppercase">
                <Filter className="w-4 h-4 text-blue-400" />
                Filter Devices
              </h3>
              <button 
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedCondition('all');
                  setSortBy('popular');
                  setSearchQuery('');
                }}
                className="text-[10px] text-slate-500 hover:text-white underline font-mono"
              >
                Reset All
              </button>
            </div>

            {/* Category Filter Group */}
            <div className="space-y-2">
              <h4 className="text-[10px] font-mono tracking-wider uppercase text-slate-500">Categories</h4>
              <div className="flex flex-col gap-1.5 text-xs text-slate-400">
                {[
                  { id: 'all', label: 'All Catalog' },
                  { id: 'smartphones', label: 'Smartphones (iPhones/Samsung)' },
                  { id: 'laptops', label: 'Professional Laptops' },
                  { id: 'tvs', label: 'Smart TVs & Monitors' },
                  { id: 'woofers', label: 'Subwoofers & Sound Systems' },
                  { id: 'gaming', label: 'Console Gaming (PS5)' },
                  { id: 'accessories', label: 'Accessories' },
                  { id: 'smartwatches', label: 'Smartwatches' }
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedCategory(item.id)}
                    className={`w-full py-2 px-3 text-left rounded-lg transition-all flex items-center justify-between ${
                      selectedCategory === item.id 
                        ? 'bg-blue-500/10 text-blue-400 font-bold border-l-2 border-blue-500' 
                        : 'hover:bg-slate-950/60 hover:text-slate-200'
                    }`}
                  >
                    <span>{item.label}</span>
                    {selectedCategory === item.id && <Check className="w-3.5 h-3.5 text-blue-400" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Condition Filter */}
            <div className="space-y-2 pt-2">
              <h4 className="text-[10px] font-mono tracking-wider uppercase text-slate-500">Condition State</h4>
              <div className="flex flex-col gap-1.5 text-xs">
                {[
                  { id: 'all', label: 'All Conditions' },
                  { id: 'new', label: 'Brand New Sealed' },
                  { id: 'refurbished', label: 'Tested Refurbished' },
                  { id: 'openbox', label: 'Open Box Deals' }
                ].map(cond => (
                  <button
                    key={cond.id}
                    onClick={() => setSelectedCondition(cond.id)}
                    className={`w-full py-2 px-3 text-left rounded-lg transition-all flex items-center justify-between ${
                      selectedCondition === cond.id 
                        ? 'bg-orange-500/10 text-orange-400 font-bold border-l-2 border-orange-500' 
                        : 'hover:bg-slate-950/60 hover:text-slate-200 text-slate-400'
                    }`}
                  >
                    <span>{cond.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Sort Dropdown */}
            <div className="space-y-1.5 pt-2 border-t border-slate-800/60 font-sans">
              <label className="block text-[10px] font-mono tracking-wider uppercase text-slate-500">Sort Deals By:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              >
                <option value="popular">Most Inquired / Popular</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating: Highest Reviews</option>
              </select>
            </div>
          </div>

          {/* Quick Recently Viewed Section (Highly Conversional Retention Feature!) */}
          {recentlyViewedProducts.length > 0 && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
              <h4 className="font-sans font-bold text-xs text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-blue-400" />
                Recently Viewed
              </h4>
              <div className="space-y-3">
                {recentlyViewedProducts.map(p => (
                  <div 
                    key={p.id}
                    onClick={() => handleViewProductDetails(p)}
                    className="flex gap-3 items-center group cursor-pointer"
                  >
                    <img 
                      src={p.images[0]} 
                      alt="" 
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 object-cover rounded-lg border border-slate-800 group-hover:border-blue-500 transition-all flex-shrink-0" 
                    />
                    <div className="flex-1 min-w-0">
                      <h5 className="font-bold text-white text-xs truncate group-hover:text-blue-400 transition-colors">
                        {p.title}
                      </h5>
                      <p className="text-[11px] font-mono text-blue-400 mt-0.5">KES {p.priceKes.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </aside>

        {/* Right Content Panels: (Col Span 9) */}
        <div className="lg:col-span-9 space-y-8">
          
          {/* Active stats, headers, count */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center bg-slate-900 border border-slate-800 p-4 rounded-xl">
            <div className="text-xs text-slate-400 font-sans">
              Showing <span className="text-white font-bold">{filteredProducts.length}</span> verified results 
              {selectedCategory !== 'all' && <span> in <span className="text-blue-400 font-semibold">{selectedCategory}</span></span>}
            </div>

            {/* Compare items alert summary bar floating when compare contains items */}
            {compareIds.length > 0 && (
              <div className="flex items-center gap-3 text-xs bg-blue-500/10 border border-blue-500/30 px-3 py-1.5 rounded-lg animate-fade-in">
                <Layers className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
                <span className="text-neutral-300">
                  Comparing <strong className="text-white">{compareIds.length}</strong> device{compareIds.length > 1 ? 's' : ''}
                </span>
                <button 
                  onClick={() => setIsCompareModalOpen(true)}
                  className="font-bold text-blue-400 hover:underline flex items-center gap-1 font-mono text-[11px]"
                >
                  View Spec Sheet <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>

          {/* Product Cards Layout Grid */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16 bg-slate-900 border border-slate-800 rounded-2xl space-y-3">
              <Search className="w-12 h-12 text-slate-600 mx-auto stroke-1" />
              <p className="text-slate-400 text-sm font-sans">No electronics matched your active search query / conditions.</p>
              <button 
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedCondition('all');
                  setSearchQuery('');
                }}
                className="px-4 py-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold rounded-xl hover:bg-blue-500/20 transition-all font-mono"
              >
                Show All Catalog Items
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredProducts.map(product => {
                const isCompared = compareIds.includes(product.id);
                
                return (
                  <div 
                    key={product.id} 
                    className="group bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 hover:shadow-xl hover:shadow-blue-900/10 transition-all duration-300 flex flex-col justify-between"
                  >
                    {/* Upper Thumbnail card photo */}
                    <div className="relative h-48 w-full overflow-hidden bg-slate-950">
                      <img 
                        src={product.images[0]} 
                        alt={product.title} 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
                      />
                      
                      {/* Floating Category/Condition Tags */}
                      <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                        <span className="px-2 py-0.5 text-[9px] uppercase tracking-wider bg-black/60 backdrop-blur-md rounded border border-slate-700 text-white font-mono">
                          {product.category}
                        </span>
                        <span className={`px-2.5 py-0.5 text-[9px] uppercase tracking-wider font-extrabold rounded ${
                          product.condition.startsWith('Brand New') 
                            ? 'bg-yellow-500 text-black shadow-md' 
                            : 'bg-green-500/15 text-green-400 border border-green-500/20 backdrop-blur-md'
                        }`}>
                          {product.condition}
                        </span>
                      </div>

                      {/* Hot Sale countdown tag absolute */}
                      {product.isDealOfTheDay && (
                        <div className="absolute bottom-3 left-3 px-2 py-0.5 text-[9px] bg-red-600 border border-red-500 text-white font-bold uppercase rounded font-mono flex items-center gap-1 animate-pulse">
                          <span>Today's Drop Drop 🔥</span>
                        </div>
                      )}

                      {/* Add/remove comparison tag icon */}
                      <button
                        onClick={() => handleToggleCompare(product)}
                        className={`absolute top-3 right-3 p-2 rounded-full border backdrop-blur-md transition-all ${
                          isCompared 
                            ? 'bg-blue-500/10 border-blue-500 text-blue-400' 
                            : 'bg-black/45 border-slate-750 text-white hover:bg-slate-800'
                        }`}
                        title={isCompared ? 'Remove from Compare' : 'Add to Compare'}
                        id={`compare-toggle-${product.id}`}
                      >
                        <ArrowLeftRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Middle Card Content specs */}
                    <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                      <div className="space-y-1">
                        
                        {/* Interactive Ratings Row */}
                        <div className="flex items-center gap-1.5 text-xs">
                          <div className="flex items-center text-yellow-500">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`w-3 h-3 fill-current ${i < Math.floor(product.rating) ? 'text-yellow-500' : 'text-slate-700'}`} />
                            ))}
                          </div>
                          <span className="text-[10.5px] text-slate-400 font-mono">({product.reviewsCount} reviews)</span>
                        </div>

                        {/* Card Title */}
                        <h4 className="font-sans font-extrabold text-sm text-white group-hover:text-blue-400 transition-all leading-tight">
                          {product.title}
                        </h4>
                        
                        {/* Subspec label */}
                        <p className="text-[11px] text-slate-400 font-mono">
                          {product.storage && <span>{product.storage} • </span>}
                          {product.ram && <span>{product.ram} RAM • </span>}
                          <span>{product.warranty.split(' ')[0]} {product.warranty.split(' ')[1]}</span>
                        </p>
                      </div>

                      {/* Dynamic Scarcity Notification Alerts */}
                      {product.quantityLeft <= 3 && (
                        <div className="text-[10px] text-red-400 font-semibold flex items-center gap-1.5 bg-red-500/5 p-1 px-2 rounded-lg border border-red-500/15 animate-pulse">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                          <span>Hurry! Only {product.quantityLeft} left in Ruiru Bypass stock</span>
                        </div>
                      )}

                      {/* Price Grid */}
                      <div className="flex items-baseline gap-2 pt-2 border-t border-slate-800/60 font-sans">
                        <span className="text-base font-extrabold font-mono text-white">
                          KES {product.priceKes.toLocaleString()}
                        </span>
                        <span className="text-[11px] text-slate-500 line-through font-sans">
                          KES {product.originalPriceKes.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* Lower Buttons actions area */}
                    <div className="p-4 pt-0 grid grid-cols-2 gap-2">
                      <button 
                        onClick={() => handleViewProductDetails(product)}
                        className="py-2 px-3 text-center bg-slate-950 border border-slate-800 text-[11px] font-bold rounded-xl hover:border-slate-700 hover:text-white transition-all font-mono"
                        id={`view-specs-btn-${product.id}`}
                      >
                        View Specs ⚙
                      </button>

                      <button 
                        onClick={() => setActiveWhatsAppProduct(product)}
                        className="py-2 px-3 text-center bg-green-600 hover:bg-green-700 text-white text-[11.5px] font-extrabold rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5"
                        id={`whatsapp-buy-btn-${product.id}`}
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        Inquire
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* TRADE-IN UPGRADE COMPONENT CONTAINER */}
          <section className="pt-6">
            <TradeInCalculator />
          </section>

          {/* CUSTOMER REVIEWS & SOCIAL PROOF CARDS */}
          <section className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6 relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="space-y-1">
                <span className="px-2.5 py-0.5 text-[9px] uppercase font-mono tracking-wider bg-green-500/10 border border-green-500/20 text-green-400 font-bold rounded-full">
                  100% Verifiable Social Proof
                </span>
                <h3 className="font-sans font-black text-2xl text-white tracking-tight">
                  Trusted by Techies in Ruiru & JKUAT
                </h3>
                <p className="text-xs text-slate-400 max-w-xl">
                  We verify customer reviews from Facebook groups, WhatsApp deliveries, and Google reviews. Here is what real buyers are saying about our electronics deals:
                </p>
              </div>

              {/* Verified Badge */}
              <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 flex items-center gap-2">
                <Check className="w-5 h-5 text-green-400" />
                <div className="text-xs">
                  <p className="font-bold text-white leading-none">4.9 / 5.0 Star Rating</p>
                  <p className="text-slate-500 text-[10px] font-mono mt-0.5">Based on 145+ verified transactions</p>
                </div>
              </div>
            </div>

            {/* Simulated Reviews Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {TESTIMONIALS.map((t) => (
                <div key={t.id} className="bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-xs text-white truncate max-w-[150px]">{t.name}</h4>
                      <p className="text-[10px] text-slate-500 font-mono">{t.location} • {t.date}</p>
                    </div>
                    <span className="px-1.5 py-0.5 text-[8px] bg-blue-500/10 text-blue-400 border border-blue-500/20 font-mono rounded">
                      Verified Buyer
                    </span>
                  </div>

                  <p className="text-xs text-slate-350 leading-relaxed font-sans italic">
                    "{t.text}"
                  </p>

                  <div className="flex items-center justify-between text-[11px] pt-3 border-t border-slate-900 font-mono">
                    <span className="text-slate-450">Bought: <strong className="text-slate-300">{t.deviceBought}</strong></span>
                    <div className="flex items-center text-yellow-500">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-current text-yellow-500" />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Screenshot simulation */}
            <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500/10 text-green-400 rounded-xl flex items-center justify-center font-bold text-lg">
                  💬
                </div>
                <div>
                  <h4 className="font-bold text-xs text-white">Want to see our original customer chats?</h4>
                  <p className="text-[10.5px] text-slate-400 font-sans">We post real screenshots from our daily WhatsApp buyers on status updates.</p>
                </div>
              </div>
              <button
                onClick={handleInquireGeneral}
                className="py-2 px-4 bg-green-500/10 border border-green-500/20 hover:bg-green-500/20 text-green-400 font-bold rounded-xl text-xs flex items-center gap-1.5 transition-all font-mono"
              >
                View Live Status Deals
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </section>

          {/* SEO RESOURCE GUIDES / BLOG SYSTEM */}
          <section className="space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-slate-900">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500">Tech advice from SAM DEALS</span>
                <h3 className="font-sans font-black text-2xl text-white tracking-tight">
                  Buying Intel & Field Guides
                </h3>
              </div>
              <div className="flex items-center gap-1 text-xs text-blue-400 font-semibold font-mono">
                <BookOpen className="w-4 h-4" /> SEO Hub
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {BLOG_ARTICLES.map(article => (
                <div 
                  key={article.id} 
                  onClick={() => setActiveBlog(article)}
                  className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-3xl overflow-hidden cursor-pointer hover:shadow-lg hover:shadow-blue-900/5 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="h-44 w-full relative overflow-hidden">
                      <img 
                        src={article.image} 
                        alt={article.title} 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-all"
                      />
                      <span className="absolute bottom-3 left-3 px-2 py-0.5 text-[9px] uppercase tracking-wider bg-black/70 backdrop-blur-sm shadow border border-slate-700 text-white font-mono">
                        {article.category}
                      </span>
                    </div>

                    <div className="p-5 space-y-2">
                      <div className="flex gap-2 text-[10px] text-slate-500 font-mono">
                        <span>{article.date}</span>
                        <span>•</span>
                        <span>{article.readTime}</span>
                      </div>
                      <h4 className="font-sans font-bold text-base text-white group-hover:text-blue-400 transition-colors leading-snug">
                        {article.title}
                      </h4>
                      <p className="text-xs text-slate-400 leading-relaxed font-sans line-clamp-2">
                        {article.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="p-5 pt-0 border-t border-slate-800 flex items-center justify-between text-xs font-semibold text-blue-400 font-mono">
                    <span>Read Full Guide</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* GOOGLE CONTACTS CRM & REFERRAL CENTER */}
          <section>
            <GoogleContactsManager />
          </section>

          {/* PRESTINE LEAD CAPTURE FORM (Local / Simulated database) */}
          <section>
            <LeadCapture />
          </section>

          {/* FAQ SELECTION ZONE FOR TRUST FA-Q */}
          <section className="bg-slate-900/40 border border-slate-800 p-6 md:p-8 rounded-3xl space-y-5">
            <h3 className="font-sans font-black text-xl text-white">Frequently Answered Questions FAQ</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-350">
              <div className="space-y-1.5 p-4 bg-slate-950/40 rounded-2xl border border-slate-800">
                <h5 className="font-bold text-white flex items-center gap-1.5">
                  <span className="p-1 bg-blue-500/10 text-blue-400 rounded">Q</span>
                  Do you allow check and payment on delivery?
                </h5>
                <p className="text-slate-400 pl-6 leading-relaxed">
                  Yes! Inside Ruiru, Juja, Thika, and Nairobi CBD, our dispatch rider brings the device, allows you to check FaceID/Serial status/storage fully before paying via M-Pesa.
                </p>
              </div>

              <div className="space-y-1.5 p-4 bg-slate-950/40 rounded-2xl border border-slate-800">
                <h5 className="font-bold text-white flex items-center gap-1.5">
                  <span className="p-1 bg-blue-500/10 text-blue-400 rounded">Q</span>
                  Do you provide diagnostic tests charts?
                </h5>
                <p className="text-slate-400 pl-6 leading-relaxed">
                  Every Apple/Android device undergoes certification checks. We check iPhones on 3uTools and laptops on diagnostic hardware to verify original screens and battery status metrics.
                </p>
              </div>

              <div className="space-y-1.5 p-4 bg-slate-950/40 rounded-2xl border border-slate-800">
                <h5 className="font-bold text-white flex items-center gap-1.5">
                  <span className="p-1 bg-blue-500/10 text-blue-400 rounded">Q</span>
                  What is your return / check warranty policy?
                </h5>
                <p className="text-slate-400 pl-6 leading-relaxed">
                  All devices come packed with check warranties (3-6 Months local warranty depending on condition). If there's any hardware motherboard fault in that window, we fix or replace instantly.
                </p>
              </div>

              <div className="space-y-1.5 p-4 bg-slate-950/40 rounded-2xl border border-slate-800">
                <h5 className="font-bold text-white flex items-center gap-1.5">
                  <span className="p-1 bg-blue-500/10 text-blue-400 rounded">Q</span>
                  How can I claim upgrading/swap deal valuation?
                </h5>
                <p className="text-slate-400 pl-6 leading-relaxed">
                  Simply use our Trade-In Calculator on this page to log estimated valuation, and click "WhatsApp Swap Deals" to send a checklist to our live shop reps. They will book testing for your device!
                </p>
              </div>
            </div>
          </section>

        </div>
      </main>

      {/* CORE FOOTER BRAND SIGNATURE */}
      <footer className="bg-slate-950 border-t border-slate-900 py-12 px-4 md:px-8 mt-auto text-xs text-slate-400">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-lg">🔌</span>
              <h4 className="font-display font-extrabold text-white text-base">SAM DEALS AND SERVICES</h4>
            </div>
            <p className="text-slate-500">
              The premier certified electronics plug in Kenya. Bringing you high-end specifications laptops, iPhones, and gaming items with direct WhatsApp orders and checking.
            </p>
            <p className="text-slate-600 text-[10.5px] font-mono">
              Ruiru Bypass Outlet • Nairobi CBD Commercial Centre
            </p>
          </div>

          <div>
            <h5 className="font-bold text-slate-300 uppercase tracking-wider mb-3 font-mono text-[10px]">Deals Categories</h5>
            <ul className="space-y-2">
              <li><button onClick={() => { setSelectedCategory('laptops'); document.getElementById('shop-section')?.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-blue-400">Tested Laptops & Ultrabooks</button></li>
              <li><button onClick={() => { setSelectedCategory('smartphones'); document.getElementById('shop-section')?.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-blue-400">Refurbished Smartphones</button></li>
              <li><button onClick={() => { setSelectedCategory('gaming'); document.getElementById('shop-section')?.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-blue-400">Digital Gaming Consoles</button></li>
              <li><button onClick={() => { setSelectedCategory('accessories'); document.getElementById('shop-section')?.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-blue-400">Premium Brand Accessories</button></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-slate-300 uppercase tracking-wider mb-3 font-mono text-[10px]">SAM DEALS Utilities</h5>
            <ul className="space-y-2">
              <li><button onClick={() => document.getElementById('trade-in-estimator')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-blue-400">Device Swap Calculator</button></li>
              <li><button onClick={() => setIsCompareModalOpen(true)} className="hover:text-blue-400">Side-by-side Spec Compare</button></li>
              <li><button onClick={() => document.getElementById('lead-capture-section')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-blue-400">Flash Sales VIP SMS Alerts</button></li>
              <li><button onClick={handleInquireGeneral} className="hover:text-blue-400">Direct WhatsApp Desk</button></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h5 className="font-bold text-slate-300 uppercase tracking-wider font-mono text-[10px]">Contact SAM DEALS Rep</h5>
            <p className="text-slate-500 leading-relaxed text-[11px]">
              Want instant help checking device components, Face ID, graphics benchmarks? Chat now with our lead tech representative.
            </p>
            <button
              onClick={handleInquireGeneral}
              className="flex items-center gap-1.5 text-green-400 hover:text-green-300 font-bold transition-all underline font-mono text-[11px]"
            >
              <PhoneCall className="w-4 h-4 text-green-500 fill-current" />
              Safaricom Active Support Desk 📞
            </button>
          </div>

        </div>

        <div className="max-w-7xl mx-auto pt-8 mt-8 border-t border-slate-900 flex flex-col sm:flex-row justify-between items-center gap-4 text-slate-600 text-[10.5px]">
          <p>© {new Date().getFullYear()} SAM DEALS AND SERVICES Electronics Plug. All rights reserved. High-Conversion Layout by AI Studio Build.</p>
          <div className="flex gap-4">
            <span className="hover:text-slate-500 cursor-pointer">Sitemap</span>
            <span className="hover:text-slate-500 cursor-pointer">Privacy Pledges</span>
            <span className="hover:text-slate-500 cursor-pointer">Warranty Terms</span>
          </div>
        </div>
      </footer>

      {/* 🟢 STICKY WHATSAPP BOTTOM CHAT FLOATER */}
      <div className="fixed bottom-6 right-6 z-40 group flex flex-col items-end gap-2 animate-fade-in" id="sticky-whatsapp-floater">
        
        {/* Animated Popover text bubble */}
        <div className="bg-slate-900 border border-slate-800 p-2.5 px-3.5 rounded-2xl shadow-xl max-w-xs text-[11px] text-slate-300 animate-bounce cursor-pointer group-hover:scale-105 transition-all text-right mr-2 hidden sm:block" onClick={handleInquireGeneral}>
          <p className="font-bold text-white flex items-center justify-end gap-1">
            <Sparkles className="w-3.5 h-3.5 text-yellow-500 fill-current" />
            SAM DEALS Lead Is Online
          </p>
          <p className="text-[10px] text-slate-400">Ask components, availability, or pay on delivery rates!</p>
        </div>

        {/* Real giant green button */}
        <button
          onClick={handleInquireGeneral}
          className="p-4 bg-green-600 hover:bg-green-700 active:scale-[0.95] text-white rounded-full shadow-[0_4px_30px_rgba(22,163,74,0.5)] transition-all flex items-center justify-center relative hover:rotate-3"
          id="sticky-whatsapp-click-btn"
          title="Chat Instantly on WhatsApp"
        >
          <MessageSquare className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 border-2 border-slate-950 rounded-full"></span>
        </button>
      </div>

      {/* MODAL MOUNT POINTS */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCompare={handleToggleCompare}
          isCompared={compareIds.includes(selectedProduct.id)}
          onOpenWhatsAppModal={(prod) => {
            setSelectedProduct(null);
            setActiveWhatsAppProduct(prod);
          }}
        />
      )}

      {activeWhatsAppProduct && (
        <WhatsAppModal
          product={activeWhatsAppProduct}
          isOpen={!!activeWhatsAppProduct}
          onClose={() => setActiveWhatsAppProduct(null)}
        />
      )}

      {isCompareModalOpen && (
        <CompareModal
          products={comparedProducts}
          isOpen={isCompareModalOpen}
          onClose={() => setIsCompareModalOpen(false)}
          onRemoveFromCompare={handleRemoveFromCompare}
        />
      )}

      {activeBlog && (
        <BlogModal
          article={activeBlog}
          isOpen={!!activeBlog}
          onClose={() => setActiveBlog(null)}
          onSelectProduct={(product) => handleViewProductDetails(product)}
        />
      )}

    </div>
  );
}
