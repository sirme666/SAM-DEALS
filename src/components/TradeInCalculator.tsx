import React, { useState } from 'react';
import { ArrowLeftRight, Check, Sparkles, MessageSquare, AlertCircle, HelpCircle } from 'lucide-react';
import { TRADE_IN_DEVICES, PRODUCTS, WHATSAPP_NUMBER } from '../data';
import { Product } from '../types';

export default function TradeInCalculator() {
  const [selectedBrand, setSelectedBrand] = useState('Apple');
  const [selectedDeviceIndex, setSelectedDeviceIndex] = useState(0);
  const [deviceCondition, setDeviceCondition] = useState<'flawless' | 'excellent' | 'good' | 'fair'>('excellent');
  
  // Upgrade Target
  const [upgradeProductId, setUpgradeProductId] = useState('');
  
  const brands = Array.from(new Set(TRADE_IN_DEVICES.map(d => d.brand)));
  const devicesOfSelectedBrand = TRADE_IN_DEVICES.filter(d => d.brand === selectedBrand);

  // Normalize selected device index if brand changes
  const activeDevice = devicesOfSelectedBrand[selectedDeviceIndex] || devicesOfSelectedBrand[0];

  const getConditionMultiplier = () => {
    switch (deviceCondition) {
      case 'flawless': return 1.0;
      case 'excellent': return 0.85;
      case 'good': return 0.70;
      case 'fair': return 0.55;
    }
  };

  const estimatedValue = activeDevice 
    ? Math.round(activeDevice.potentialValueKes * getConditionMultiplier()) 
    : 0;

  // Selected upgrade target metrics
  const targetProduct = PRODUCTS.find(p => p.id === upgradeProductId);
  const topUpRequired = targetProduct 
    ? Math.max(0, targetProduct.priceKes - estimatedValue) 
    : null;

  const handleWhatsAppSwap = () => {
    let text = `Hello SAM DEALS AND SERVICES Team! 🔌 I would like to do a Trade-In Swap Deal 🔄\n\n`;
    text += `*My Device to Trade-In:*\n`;
    text += `• Brand/Model: ${activeDevice ? activeDevice.brand : ''} ${activeDevice ? activeDevice.model : ''}\n`;
    text += `• Condition: ${deviceCondition.toUpperCase()} (${getConditionMultiplier() * 100}% estimated value)\n`;
    text += `• Estimated Swap Credit: KES ${estimatedValue.toLocaleString()}\n\n`;

    if (targetProduct) {
      text += `*I want to upgrading to:*\n`;
      text += `• Target Device: ${targetProduct.title} (${targetProduct.condition})\n`;
      text += `• Store Price: KES ${targetProduct.priceKes.toLocaleString()}\n`;
      text += `• *Estimated Top-Up required: KES ${topUpRequired?.toLocaleString()}*\n\n`;
    }

    text += `Please let me know if I can bring my device to your shop / CBD to get it tested and finalize this swap deal! 🙌`;

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden p-6 relative" id="trade-in-estimator">
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>
      
      {/* Label and Header */}
      <div className="flex items-center gap-2 mb-3">
        <span className="px-2.5 py-0.5 text-[10px] uppercase font-mono tracking-wider bg-blue-500/10 border border-blue-500/20 text-blue-400 font-bold rounded-full">
          Kenya Swap & Upgrade Service
        </span>
      </div>
      
      <h3 className="font-sans font-extrabold text-2xl text-white tracking-tight flex items-center gap-2">
        <ArrowLeftRight className="w-6 h-6 text-blue-400" />
        Trade-In Calculator
      </h3>
      <p className="text-sm text-slate-400 mt-1 max-w-xl font-sans">
        Estimate the value of your old smartphone or laptop and see how much cash top-up you need to upgrade to our premium tested gadgets!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
        
        {/* Left Side: Input options */}
        <div className="space-y-4">
          <p className="font-bold text-xs text-slate-300 uppercase tracking-wider font-mono">1. Select Your Device Specs</p>
          
          {/* Brand Tabs */}
          <div>
            <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1.5">Device Brand:</label>
            <div className="flex flex-wrap gap-2">
              {brands.map((b) => (
                <button
                  key={b}
                  onClick={() => {
                    setSelectedBrand(b);
                    setSelectedDeviceIndex(0);
                  }}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all border ${
                    selectedBrand === b 
                      ? 'bg-blue-500/10 border-blue-500 text-blue-400' 
                      : 'bg-slate-950 border-slate-800 text-slate-500 hover:text-slate-300'
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>

          {/* Model Selector */}
          <div>
            <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1.5">Device Model:</label>
            <select
              value={selectedDeviceIndex}
              onChange={(e) => setSelectedDeviceIndex(Number(e.target.value))}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              {devicesOfSelectedBrand.map((d, index) => (
                <option key={index} value={index}>
                  {d.model} (Standard Specs)
                </option>
              ))}
            </select>
          </div>

          {/* Condition Select Segment */}
          <div>
            <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1.5">Actual Device Condition:</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setDeviceCondition('flawless')}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  deviceCondition === 'flawless'
                    ? 'bg-green-500/10 border-green-500'
                    : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                }`}
              >
                <p className="text-xs font-bold text-white">Flawless/Mint</p>
                <p className="text-[10px] text-slate-500 mt-0.5">No scratches, looks completely new.</p>
              </button>

              <button
                type="button"
                onClick={() => setDeviceCondition('excellent')}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  deviceCondition === 'excellent'
                    ? 'bg-blue-500/10 border-blue-500'
                    : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                }`}
              >
                <p className="text-xs font-bold text-white">Excellent</p>
                <p className="text-[10px] text-slate-500 mt-0.5">Minor micro-scratches, fully functional.</p>
              </button>

              <button
                type="button"
                onClick={() => setDeviceCondition('good')}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  deviceCondition === 'good'
                    ? 'bg-amber-500/5 border-amber-500/30'
                    : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                }`}
              >
                <p className="text-xs font-bold text-white">Good / Used</p>
                <p className="text-[10px] text-slate-500 mt-0.5">Visible dents or scratches, perfect camera/screen.</p>
              </button>

              <button
                type="button"
                onClick={() => setDeviceCondition('fair')}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  deviceCondition === 'fair'
                    ? 'bg-orange-500/5 border-orange-500/30'
                    : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                }`}
              >
                <p className="text-xs font-bold text-white">Fair</p>
                <p className="text-[10px] text-slate-500 mt-0.5">Heavy wear signs, screen/battery slightly degraded.</p>
              </button>
            </div>
          </div>
          
          <div className="bg-slate-950 border border-slate-800 p-3 rounded-xl flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
            <p className="text-[10.5px] text-slate-400 leading-relaxed font-sans">
              <strong>Note:</strong> We perform hard resets, parts authentications, and Apple Serial activation checks in-person at checkout. Estimated value assumes screen and cameras are original.
            </p>
          </div>
        </div>

        {/* Right Side: Calculated Trade Value & Upgrade Options */}
        <div className="space-y-5 bg-slate-950 border border-slate-800 p-6 rounded-2xl relative flex flex-col justify-between">
          <div className="space-y-4">
            <p className="font-bold text-xs text-slate-300 uppercase tracking-wider font-mono">2. Upgrade Projection Summary</p>
            
            {/* The giant dollar highlight */}
            <div className="text-center py-5 border-b border-slate-800">
              <span className="text-[10px] font-mono text-slate-500 uppercase block">Estimated Swap Credit Value</span>
              <span className="text-4xl font-extrabold text-blue-400 font-mono tracking-tight block mt-1">
                KES {estimatedValue.toLocaleString()}
              </span>
              <span className="text-xs text-slate-400 mt-1 block">
                Based on: <span className="text-white font-semibold">{activeDevice?.model}</span> ({deviceCondition})
              </span>
            </div>

            {/* Target Upgrade selector */}
            <div className="pt-2">
              <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1.5">What do you want to upgrade to?</label>
              <select
                value={upgradeProductId}
                onChange={(e) => setUpgradeProductId(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              >
                <option value="">-- Choose one of our premium tested devices --</option>
                {PRODUCTS.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.title} ({p.condition}) - KES {p.priceKes.toLocaleString()}
                  </option>
                ))}
              </select>
            </div>

            {/* Top-Up Calculation */}
            {topUpRequired !== null && (
              <div className="p-4 bg-blue-500/5 rounded-xl border border-blue-500/10 space-y-2 animate-fade-in">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Target Device Cost:</span>
                  <span className="font-bold text-white font-mono">KES {targetProduct?.priceKes.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Your Trade-In value:</span>
                  <span className="font-bold text-red-400 font-mono">- KES {estimatedValue.toLocaleString()}</span>
                </div>
                <div className="h-px bg-slate-800 my-1"></div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-white">Estimated Cash Top-Up:</span>
                  <span className="text-lg font-extrabold text-green-400 font-mono">KES {topUpRequired.toLocaleString()}</span>
                </div>
              </div>
            )}
          </div>

          <div className="pt-4">
            <button
              onClick={handleWhatsAppSwap}
              className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-green-600 hover:bg-green-700 hover:shadow-[0_4px_20px_rgba(22,163,74,0.3)] text-white font-bold rounded-xl transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              Lock in Swap Value via WhatsApp
            </button>
            <p className="text-[9.5px] text-center text-slate-500 mt-2 font-mono">
              Speeds up transaction • Our technicians will call you back to schedule test!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
