import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useRole } from '../context/RoleContext';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Check,
  Building2,
  Wallet,
  Receipt,
  Truck,
  Layers,
} from 'lucide-react';
import {
  buyerPricingData,
  farmerPricingData,
} from '../data/mockPricing';

// ========================================================
// 1. BUYER PRICING VIEW (PROCUREMENT ECONOMICS ONLY)
// ========================================================
const BuyerPricingView = ({ isHi }) => {
  const navigate = useNavigate();
  const data = buyerPricingData;

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Buyer Page Header (Section 2) */}
      <div className="pb-4 border-b-3 border-charcoal flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span
              style={{ backgroundColor: '#EAB308', color: '#172016' }}
              className="text-[10px] font-mono font-black uppercase px-2 py-0.5 border border-charcoal shadow-bauhaus-sm"
            >
              {isHi ? 'खरीदार पोर्टल' : 'BUYER PORTAL'}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-charcoal uppercase tracking-tight">
            {isHi ? data.headingHi : data.headingEn}
          </h1>
          <p className="text-xs text-charcoal/80 font-medium mt-0.5">
            {isHi ? data.subtitleHi : data.subtitleEn}
          </p>
        </div>

        <span className="text-xs font-mono font-bold text-charcoal bg-gold border border-charcoal px-2.5 py-1 shadow-bauhaus-sm self-start sm:self-auto">
          {isHi
            ? 'वर्तमान टमाटर खरीद पर आधारित सांकेतिक प्रोटोटाइप अर्थशास्त्र (₹/किग्रा)'
            : 'Illustrative prototype economics based on current Tomato procurement (₹/kg)'}
        </span>
      </div>

      {/* Buyer Top Metrics: 4 Primary Procurement Cards (Section 3 & 4) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* CARD 1: BUYER LANDED COST (Forest Green) */}
        <div
          style={{ backgroundColor: '#FFFFFF' }}
          className="p-5 bg-white border-3 border-charcoal shadow-bauhaus space-y-2 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase text-charcoal/70 tracking-wider">
                {isHi ? data.metrics.card1.titleHi : data.metrics.card1.titleEn}
              </span>
              <span style={{ backgroundColor: '#14532D' }} className="w-3 h-3 rounded-full bg-forest border border-charcoal"></span>
            </div>
            <div style={{ color: '#14532D' }} className="text-3xl sm:text-4xl font-black font-mono tracking-tight mt-1">
              {data.metrics.card1.value}
            </div>
            <div className="flex items-center gap-2 pt-1 font-mono">
              <span className="text-xs font-bold text-charcoal/60 line-through">₹{data.metrics.card1.fromPrice}/kg</span>
              <span className="text-xs font-bold text-charcoal">→</span>
              <span
                style={{ backgroundColor: '#14532D', color: '#FFFFFF' }}
                className="text-sm font-black px-1.5 py-0.2 border border-charcoal"
              >
                ₹{data.metrics.card1.toPrice}/kg
              </span>
            </div>
          </div>
          <p className="text-[11px] text-charcoal/70 font-medium leading-snug pt-2 border-t border-charcoal/10">
            {isHi ? data.metrics.card1.descHi : data.metrics.card1.descEn}
          </p>
        </div>

        {/* CARD 2: PROCUREMENT SAVING (Harvest Yellow) */}
        <div
          style={{ backgroundColor: '#FFFFFF' }}
          className="p-5 bg-white border-3 border-charcoal shadow-bauhaus space-y-2 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase text-charcoal/70 tracking-wider">
                {isHi ? data.metrics.card2.titleHi : data.metrics.card2.titleEn}
              </span>
              <span style={{ backgroundColor: '#EAB308' }} className="w-3 h-3 bg-gold border border-charcoal"></span>
            </div>
            <div className="text-3xl sm:text-4xl font-black text-charcoal font-mono tracking-tight mt-1">
              {data.metrics.card2.value}
            </div>
            <div className="flex items-center gap-2 pt-1 font-mono">
              <span className="text-xs font-bold text-charcoal/60 line-through">₹{data.metrics.card2.fromPrice}/kg</span>
              <span className="text-xs font-bold text-charcoal">→</span>
              <span
                style={{ backgroundColor: '#EAB308', color: '#172016' }}
                className="text-sm font-black px-1.5 py-0.2 border border-charcoal"
              >
                ₹{data.metrics.card2.toPrice}/kg
              </span>
            </div>
          </div>
          <p className="text-[11px] text-charcoal/70 font-medium leading-snug pt-2 border-t border-charcoal/10">
            {isHi ? data.metrics.card2.descHi : data.metrics.card2.descEn}
          </p>
        </div>

        {/* CARD 3: TOTAL PROCUREMENT */}
        <div
          style={{ backgroundColor: '#FFFFFF' }}
          className="p-5 bg-white border-3 border-charcoal shadow-bauhaus space-y-2 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase text-charcoal/70 tracking-wider">
                {isHi ? data.metrics.card3.titleHi : data.metrics.card3.titleEn}
              </span>
              <span style={{ backgroundColor: '#4D7C0F' }} className="w-3 h-3 bg-crop border border-charcoal"></span>
            </div>
            <div className="text-3xl sm:text-4xl font-black text-charcoal font-mono tracking-tight mt-1">
              {data.metrics.card3.qtyLabel}
            </div>
            <div className="flex items-center gap-2 pt-1 font-mono">
              <span className="text-sm font-black text-forest bg-cream px-1.5 py-0.2 border border-charcoal">
                {data.metrics.card3.value} Landed
              </span>
            </div>
          </div>
          <p className="text-[11px] text-charcoal/70 font-medium leading-snug pt-2 border-t border-charcoal/10">
            {isHi ? data.metrics.card3.descHi : data.metrics.card3.descEn}
          </p>
        </div>

        {/* CARD 4: LOGISTICS SHARE */}
        <div
          style={{ backgroundColor: '#FFFFFF' }}
          className="p-5 bg-white border-3 border-charcoal shadow-bauhaus space-y-2 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase text-charcoal/70 tracking-wider">
                {isHi ? data.metrics.card4.titleHi : data.metrics.card4.titleEn}
              </span>
              <span style={{ backgroundColor: '#92400E' }} className="w-3 h-3 bg-earth border border-charcoal"></span>
            </div>
            <div className="text-3xl sm:text-4xl font-black text-charcoal font-mono tracking-tight mt-1">
              {data.metrics.card4.value}
            </div>
            <div className="flex items-center gap-2 pt-1 font-mono">
              <span
                style={{ backgroundColor: '#DDE7D8', color: '#172016' }}
                className="text-xs font-black px-1.5 py-0.2 border border-charcoal"
              >
                {data.metrics.card4.percentLabel} of landed cost
              </span>
            </div>
          </div>
          <p className="text-[11px] text-charcoal/70 font-medium leading-snug pt-2 border-t border-charcoal/10">
            {isHi ? data.metrics.card4.descHi : data.metrics.card4.descEn}
          </p>
        </div>
      </div>

      {/* Buyer Supply Chain Comparison (Section 5) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* LEFT: TRADITIONAL PROCUREMENT */}
        <div className="p-6 bg-white border-4 border-charcoal shadow-bauhaus-lg space-y-4">
          <div className="pb-3 border-b-2 border-charcoal flex items-baseline justify-between">
            <div>
              <span style={{ color: '#92400E' }} className="text-xs font-black uppercase tracking-wider block">
                {isHi ? data.traditionalBreakdown.titleHi : data.traditionalBreakdown.titleEn}
              </span>
              <p className="text-xs font-bold text-charcoal/60 mt-0.5">
                {isHi ? data.traditionalBreakdown.topologyHi : data.traditionalBreakdown.topologyEn}
              </p>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-mono text-charcoal/60 uppercase block">
                {isHi ? 'खरीदार भुगतान' : 'BUYER PAYS'}
              </span>
              <span className="text-2xl font-black text-earth font-mono">
                ₹{data.traditionalBreakdown.buyerPays}<span className="text-xs font-normal text-charcoal/60">/kg</span>
              </span>
            </div>
          </div>

          <div className="space-y-2 text-xs font-bold">
            {data.traditionalBreakdown.items.map((item, idx) => (
              <div
                key={idx}
                className={`p-3 border-2 border-charcoal flex items-center justify-between ${
                  item.cost === 10 ? 'bg-earth/15 text-earth' : 'bg-cream text-charcoal'
                }`}
              >
                <div>
                  <span className="block">{isHi ? item.labelHi : item.labelEn}</span>
                  <span className="text-[10px] opacity-75">{isHi ? item.subtextHi : item.subtextEn}</span>
                </div>
                <span className="font-mono">
                  ₹{item.cost.toFixed(2)}/kg ({item.percent}%)
                </span>
              </div>
            ))}
          </div>

          <div className="p-3 bg-cream border-2 border-charcoal flex items-center justify-between text-xs font-mono font-bold">
            <span className="uppercase text-charcoal">{isHi ? 'कुल पारंपरिक लागत' : 'TOTAL TRADITIONAL COST'}:</span>
            <span className="text-sm font-black text-earth">₹{data.traditionalBreakdown.buyerPays}.00/kg</span>
          </div>
        </div>

        {/* RIGHT: KRISHIFLOW DIRECT PROCUREMENT */}
        <div
          style={{ backgroundColor: '#DDE7D8', color: '#172016' }}
          className="p-6 bg-sage text-charcoal border-4 border-charcoal shadow-bauhaus-lg space-y-4"
        >
          <div className="pb-3 border-b-2 border-charcoal flex items-baseline justify-between">
            <div>
              <span style={{ color: '#14532D' }} className="text-xs font-black uppercase tracking-wider block">
                {isHi ? data.krishiflowBreakdown.titleHi : data.krishiflowBreakdown.titleEn}
              </span>
              <p style={{ color: 'rgba(23, 32, 22, 0.75)' }} className="text-xs font-bold mt-0.5">
                {isHi ? data.krishiflowBreakdown.topologyHi : data.krishiflowBreakdown.topologyEn}
              </p>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-mono text-charcoal/70 uppercase block">
                {isHi ? 'खरीदार भुगतान' : 'BUYER PAYS'}
              </span>
              <span style={{ color: '#14532D' }} className="text-2xl font-black font-mono">
                ₹{data.krishiflowBreakdown.buyerPays}<span className="text-xs font-normal text-charcoal/70">/kg</span>
              </span>
            </div>
          </div>

          <div className="space-y-2 text-xs font-bold text-charcoal">
            {data.krishiflowBreakdown.items.map((item, idx) => (
              <div
                key={idx}
                className="p-3 bg-white border-2 border-charcoal flex items-center justify-between shadow-bauhaus-sm"
              >
                <div>
                  <span className="block">{isHi ? item.labelHi : item.labelEn}</span>
                  <span className="text-[10px] text-charcoal/60">{isHi ? item.subtextHi : item.subtextEn}</span>
                </div>
                <span className="font-mono font-bold text-charcoal">
                  ₹{item.cost.toFixed(2)}/kg ({item.percent}%)
                </span>
              </div>
            ))}
          </div>

          {/* Strong Highlighted Buyer Savings Box (Section 5) */}
          <div
            style={{ backgroundColor: '#14532D', color: '#FFFFFF' }}
            className="p-3 border-2 border-charcoal flex items-center justify-between text-xs font-mono shadow-bauhaus-sm"
          >
            <span style={{ color: '#EAB308' }} className="font-black uppercase tracking-wider">
              {isHi ? 'आपकी शुद्ध बचत: ₹3/किग्रा' : 'YOU SAVE ₹3/KG'}
            </span>
            <span
              style={{ backgroundColor: '#EAB308', color: '#172016' }}
              className="text-[11px] font-black px-2 py-0.5 border border-charcoal uppercase"
            >
              {isHi ? '10% कम लैंडेड लागत' : '10% LOWER LANDED COST'}
            </span>
          </div>
        </div>
      </div>

      {/* Procurement Cost Breakdown Component (Section 6) */}
      <div className="p-5 bg-white border-3 border-charcoal shadow-bauhaus space-y-4">
        <div className="flex items-center justify-between pb-3 border-b-2 border-charcoal">
          <div>
            <h2 className="text-xs font-black uppercase tracking-wider text-charcoal">
              {isHi ? 'खरीद लागत विवरण' : 'PROCUREMENT COST BREAKDOWN'}
            </h2>
            <p className="text-[11px] text-charcoal/60 font-medium">
              {isHi
                ? 'पारदर्शी घटक: आपका ₹27/किग्रा भुगतान कहाँ जाता है'
                : 'Full transparency into where your ₹27/kg landed procurement rupee goes'}
            </p>
          </div>
          <span
            style={{ backgroundColor: '#EAB308', color: '#172016' }}
            className="text-[10px] font-mono font-black uppercase px-2 py-0.5 border border-charcoal"
          >
            ₹27/KG LANDED
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
          <div className="p-3.5 bg-cream border-2 border-charcoal space-y-1">
            <span className="text-[10px] font-sans font-bold text-charcoal/70 uppercase block">
              {isHi ? 'सीधी उत्पादक उपज लागत' : 'Direct Producer Produce'}
            </span>
            <p className="text-xl font-black text-forest">₹{data.produceCost}.00<span className="text-xs font-normal">/kg</span></p>
            <p className="text-[10px] font-sans text-charcoal/60">
              {isHi ? 'सत्यापित किसान को सीधा फार्मगेट भुगतान' : 'Paid directly to verified farmers (81.5%)'}
            </p>
          </div>

          <div className="p-3.5 bg-cream border-2 border-charcoal space-y-1">
            <span className="text-[10px] font-sans font-bold text-charcoal/70 uppercase block">
              {isHi ? 'अनुकूलित लॉजिस्टिक्स' : 'Optimized Logistics'}
            </span>
            <p className="text-xl font-black text-charcoal">₹{data.logisticsCost}.00<span className="text-xs font-normal">/kg</span></p>
            <p className="text-[10px] font-sans text-charcoal/60">
              {isHi ? 'मल्टी-स्टॉप रेफ़र कोल्ड-चेन परिवहन' : 'Multi-stop reefer cold-chain transit (11.1%)'}
            </p>
          </div>

          <div className="p-3.5 bg-cream border-2 border-charcoal space-y-1">
            <span className="text-[10px] font-sans font-bold text-charcoal/70 uppercase block">
              {isHi ? 'प्लेटफ़ॉर्म व गुणवत्ता नियंत्रण' : 'Platform & QA'}
            </span>
            <p className="text-xl font-black text-charcoal">₹{data.platformCost}.00<span className="text-xs font-normal">/kg</span></p>
            <p className="text-[10px] font-sans text-charcoal/60">
              {isHi ? 'डिजिटल ग्रेडिंग, मिलान एवं एस्क्रो सुरक्षा' : 'Digital QC, matching engine & escrow (7.4%)'}
            </p>
          </div>
        </div>
      </div>

      {/* Fair Trade Guarantees (Section 7) */}
      <div className="p-5 bg-white border-3 border-charcoal shadow-bauhaus space-y-4">
        <h2 className="text-xs font-black uppercase tracking-wider text-charcoal">
          {isHi ? 'खरीदार व्यापार सुरक्षा एवं गारंटी' : 'FAIR TRADE GUARANTEES'}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          {data.guarantees.map((g, idx) => (
            <div key={idx} className="p-3.5 bg-cream border-2 border-charcoal space-y-1">
              <span className="font-black uppercase text-charcoal block">
                {isHi ? g.titleHi : g.titleEn}
              </span>
              <p className="text-charcoal/80 font-medium leading-relaxed">
                {isHi ? g.descHi : g.descEn}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Buyer-Specific Summary Box (Section 9) */}
      <div
        style={{ backgroundColor: '#F7F4EA' }}
        className="p-6 bg-cream border-4 border-charcoal shadow-bauhaus-lg space-y-5"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b-2 border-charcoal">
          <div>
            <span
              style={{ backgroundColor: '#14532D', color: '#FFFFFF' }}
              className="text-[10px] font-mono font-black uppercase px-2 py-0.5 border border-charcoal inline-block mb-1"
            >
              {isHi ? 'आपकी खरीद सारांश' : 'YOUR PROCUREMENT'}
            </span>
            <h3 className="text-xl font-black text-charcoal uppercase">
              {data.quantity} kg {data.crop}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate(data.ctaPrimaryPath)}
              className="btn-bauhaus-primary px-4 py-2.5 text-xs uppercase tracking-wider flex items-center gap-1.5"
            >
              <span>{isHi ? data.ctaPrimaryHi : data.ctaPrimaryEn}</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
            </button>
            <button
              onClick={() => navigate(data.ctaSecondaryPath)}
              className="px-4 py-2.5 text-xs font-bold uppercase tracking-wider bg-white text-charcoal border-2 border-charcoal hover:bg-gold shadow-bauhaus-sm transition-all"
            >
              <span>{isHi ? data.ctaSecondaryHi : data.ctaSecondaryEn}</span>
            </button>
          </div>
        </div>

        {/* 3 Metric Cards for Procurement Total */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-center">
          <div className="p-4 bg-white border-2 border-charcoal shadow-bauhaus-sm">
            <span className="text-[10px] font-sans font-bold text-charcoal/60 uppercase block">
              {isHi ? 'कृषिप्रवाह कुल खरीद लागत' : 'PROCUREMENT COST'}
            </span>
            <p style={{ color: '#14532D' }} className="text-2xl font-black mt-1">
              ₹{data.totalCost.toLocaleString()}
            </p>
            <p className="text-[11px] text-charcoal/70 mt-0.5">{data.quantity} kg @ ₹{data.landedCost}/kg</p>
          </div>

          <div className="p-4 bg-white border-2 border-charcoal shadow-bauhaus-sm">
            <span className="text-[10px] font-sans font-bold text-charcoal/60 uppercase block">
              {isHi ? 'पारंपरिक थोक लागत' : 'TRADITIONAL COST'}
            </span>
            <p className="text-2xl font-black text-charcoal/60 line-through mt-1">
              ₹{data.traditionalTotalCost.toLocaleString()}
            </p>
            <p className="text-[11px] text-charcoal/60 mt-0.5">{data.quantity} kg @ ₹{data.traditionalCost}/kg</p>
          </div>

          <div
            style={{ backgroundColor: '#EAB308', color: '#172016' }}
            className="p-4 bg-gold border-2 border-charcoal shadow-bauhaus-sm"
          >
            <span className="text-[10px] font-sans font-black uppercase block">
              {isHi ? 'कुल अनुमानित बचत' : 'SAVINGS'}
            </span>
            <p className="text-2xl font-black text-charcoal mt-1">
              ₹{data.totalSaving.toLocaleString()}
            </p>
            <p className="text-[11px] font-bold text-charcoal mt-0.5">₹3/kg • 10.0% Direct Savings</p>
          </div>
        </div>

        {/* Bottom CTA to continue */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={() => navigate('/buyer/demand')}
            className="btn-bauhaus-primary px-6 py-3 text-xs uppercase tracking-wider flex items-center gap-2"
          >
            <span>{isHi ? 'खरीद जारी रखें →' : 'CONTINUE TO PROCUREMENT →'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// ========================================================
// 2. FARMER PRICING VIEW (FARMER REALIZATION ECONOMICS)
// ========================================================
const FarmerPricingView = ({ isHi }) => {
  const navigate = useNavigate();
  const data = farmerPricingData;

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="pb-4 border-b-3 border-charcoal flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span
              style={{ backgroundColor: '#14532D', color: '#FFFFFF' }}
              className="text-[10px] font-mono font-black uppercase px-2 py-0.5 border border-charcoal shadow-bauhaus-sm"
            >
              {isHi ? 'किसान पोर्टल' : 'FARMER PORTAL'}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-charcoal uppercase tracking-tight">
            {isHi ? data.headingHi : data.headingEn}
          </h1>
          <p className="text-xs text-charcoal/80 font-medium mt-0.5">
            {isHi ? data.subtitleHi : data.subtitleEn}
          </p>
        </div>

        <span className="text-xs font-mono font-bold text-charcoal bg-gold border border-charcoal px-2.5 py-1 shadow-bauhaus-sm self-start sm:self-auto">
          {isHi
            ? 'वर्तमान टमाटर फसल पर आधारित सांकेतिक प्रोटोटाइप अर्थशास्त्र (₹/किग्रा)'
            : 'Illustrative prototype economics based on current Tomato harvest (₹/kg)'}
        </span>
      </div>

      {/* Top 2 Core Economic Metrics: Large Typography */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-5 bg-white border-3 border-charcoal shadow-bauhaus space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase text-charcoal/70 tracking-wider">
              {isHi ? data.primaryMetric.labelHi : data.primaryMetric.labelEn}
            </span>
            <span className="w-3 h-3 rounded-full bg-forest border border-charcoal"></span>
          </div>
          <div className="text-3xl sm:text-4xl font-black text-forest font-mono tracking-tight">
            {data.primaryMetric.value}
          </div>
          <div className="flex items-center gap-2 pt-1">
            <span className="text-base font-mono font-black text-charcoal/60 line-through">₹{data.primaryMetric.fromPrice}/kg</span>
            <span className="text-xs font-mono font-bold text-charcoal">→</span>
            <span className="text-lg font-mono font-black text-forest bg-gold px-1.5 border border-charcoal">₹{data.primaryMetric.toPrice}/kg</span>
          </div>
          <p className="text-xs text-charcoal/70 font-medium mt-1">
            {isHi ? data.primaryMetric.descHi : data.primaryMetric.descEn}
          </p>
        </div>

        <div className="p-5 bg-white border-3 border-charcoal shadow-bauhaus space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase text-charcoal/70 tracking-wider">
              {isHi ? data.secondaryMetric.labelHi : data.secondaryMetric.labelEn}
            </span>
            <span className="w-3 h-3 bg-gold border border-charcoal"></span>
          </div>
          <div className="text-3xl sm:text-4xl font-black text-charcoal font-mono tracking-tight">
            {data.secondaryMetric.value}
          </div>
          <div className="flex items-center gap-2 pt-1">
            <span className="text-xs font-mono font-bold text-forest bg-sage px-1.5 border border-charcoal">
              {data.secondaryMetric.improvement} {isHi ? 'मंडी से अधिक' : 'over mandi'}
            </span>
          </div>
          <p className="text-xs text-charcoal/70 font-medium mt-1">
            {isHi ? data.secondaryMetric.descHi : data.secondaryMetric.descEn}
          </p>
        </div>
      </div>

      {/* Side-by-Side Model Comparison for Farmer */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* TRADITIONAL MANDI SUPPLY CHAIN */}
        <div className="p-6 bg-white border-4 border-charcoal shadow-bauhaus-lg space-y-4">
          <div className="pb-3 border-b-2 border-charcoal flex items-baseline justify-between">
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-earth">
                {isHi ? data.traditionalChain.titleHi : data.traditionalChain.titleEn}
              </span>
              <p className="text-xs font-bold text-charcoal/60 mt-0.5">
                {isHi ? data.traditionalChain.topologyHi : data.traditionalChain.topologyEn}
              </p>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-mono text-charcoal/60 uppercase block">
                {isHi ? 'अंतिम उपभोक्ता दर' : 'TERMINAL SPEND'}
              </span>
              <span className="text-2xl font-black text-earth font-mono">
                ₹{data.traditionalChain.terminalPrice}<span className="text-xs font-normal text-charcoal/60">/kg</span>
              </span>
            </div>
          </div>

          <div className="space-y-2 text-xs font-bold">
            <div className="p-3 bg-cream border-2 border-charcoal flex items-center justify-between">
              <span className="text-charcoal">{isHi ? 'किसान को प्राप्त:' : 'Farmer receives'}</span>
              <span className="font-mono text-charcoal">₹{data.traditionalChain.farmerReceives}.00/kg (50%)</span>
            </div>

            <div className="p-3 bg-earth/15 border-2 border-charcoal flex items-center justify-between text-earth">
              <div>
                <span className="block">{isHi ? 'बिचौलिया कमीशन एवं दलाली' : 'Intermediary margins'}</span>
                <span className="text-[10px] text-earth/80">Commission arhtiyas & dalali</span>
              </div>
              <span className="font-mono">₹{data.traditionalChain.intermediaryMargins}.00/kg (33%)</span>
            </div>

            <div className="p-3 bg-cream border-2 border-charcoal flex items-center justify-between">
              <div>
                <span className="text-charcoal block">{isHi ? 'परिवहन लागत' : 'Logistics cost'}</span>
                <span className="text-[10px] text-charcoal/60">Uncoordinated individual haul</span>
              </div>
              <span className="font-mono text-charcoal">₹{data.traditionalChain.logistics}.00/kg (17%)</span>
            </div>
          </div>

          <div className="pt-2 text-[11px] font-bold text-charcoal/60 text-center uppercase tracking-wide">
            {isHi ? 'किसान को उपभोक्ता रुपये का केवल 50% मिलता है।' : 'Farmer captures only 50% of terminal spend.'}
          </div>
        </div>

        {/* KRISHIFLOW AI (Farmer Realization View) */}
        <div
          style={{ backgroundColor: '#DDE7D8', color: '#172016' }}
          className="p-6 bg-sage text-charcoal border-4 border-charcoal shadow-bauhaus-lg space-y-4"
        >
          <div className="pb-3 border-b-2 border-charcoal flex items-baseline justify-between">
            <div>
              <span style={{ color: '#14532D' }} className="text-xs font-black uppercase tracking-wider">
                {isHi ? data.krishiflowChain.titleHi : data.krishiflowChain.titleEn}
              </span>
              <p style={{ color: 'rgba(23, 32, 22, 0.75)' }} className="text-xs font-bold mt-0.5">
                {isHi ? data.krishiflowChain.topologyHi : data.krishiflowChain.topologyEn}
              </p>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-mono text-charcoal/70 uppercase block">
                {isHi ? 'खरीदार भुगतान' : 'BUYER PAYS'}
              </span>
              <span style={{ color: '#14532D' }} className="text-2xl font-black font-mono">
                ₹{data.krishiflowChain.terminalPrice}<span className="text-xs font-normal text-charcoal/70">/kg</span>
              </span>
            </div>
          </div>

          <div className="space-y-2 text-xs font-bold text-charcoal">
            <div
              style={{ backgroundColor: '#EAB308', color: '#172016' }}
              className="p-3 bg-gold border-2 border-charcoal shadow-bauhaus-sm flex items-center justify-between"
            >
              <div>
                <span className="block">{isHi ? 'किसान को सीधा भुगतान' : 'Farmer receives'}</span>
                <span className="text-[10px] text-charcoal/80">+46.6% direct farmgate realization</span>
              </div>
              <span className="font-mono font-black text-sm">₹{data.krishiflowChain.farmerReceives}.00/kg (81.5%)</span>
            </div>

            <div className="p-3 bg-white border-2 border-charcoal flex items-center justify-between">
              <div>
                <span className="block">{isHi ? 'क्लस्टर्ड लॉजिस्टिक्स' : 'Logistics'}</span>
                <span className="text-[10px] text-charcoal/60">Clustered multi-pickup routing</span>
              </div>
              <span className="font-mono">₹{data.krishiflowChain.logistics}.00/kg (11.1%)</span>
            </div>

            <div className="p-3 bg-white border-2 border-charcoal flex items-center justify-between">
              <div>
                <span className="block">{isHi ? 'प्लेटफ़ॉर्म एवं गुणवत्ता' : 'Platform & Quality Assurance'}</span>
                <span className="text-[10px] text-charcoal/60">Testing, matching & escrow</span>
              </div>
              <span className="font-mono">₹{data.krishiflowChain.platformFee}.00/kg (7.4%)</span>
            </div>
          </div>

          <div style={{ color: '#14532D' }} className="pt-2 text-[11px] font-black text-center uppercase tracking-wide">
            {isHi ? 'किसान को 81.5% मूल्य सीधा मिलता है।' : 'Farmer captures 81.5% of total procurement spend.'}
          </div>
        </div>
      </div>

      {/* Fair Trade Guarantees for Farmer */}
      <div className="p-5 bg-white border-3 border-charcoal shadow-bauhaus space-y-4">
        <h2 className="text-xs font-black uppercase tracking-wider text-charcoal">
          {isHi ? 'पारदर्शी व्यापार सुरक्षा' : 'FAIR TRADE GUARANTEES'}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-3.5 bg-cream border-2 border-charcoal space-y-1">
            <span className="font-black uppercase text-charcoal block">
              {isHi ? 'UPI एस्क्रो सुरक्षित' : 'Escrow Settlement'}
            </span>
            <p className="text-charcoal/80 font-medium leading-relaxed">
              {isHi
                ? 'डिजिटल वजन और गुणवत्ता पुष्टि के बाद बैंक खाते में सीधा UPI ट्रांसफर।'
                : 'Direct farmgate pickup with guaranteed escrow payment without deduction.'}
            </p>
          </div>

          <div className="p-3.5 bg-cream border-2 border-charcoal space-y-1">
            <span className="font-black uppercase text-charcoal block">
              {isHi ? 'शून्य गुप्त कमीशन' : 'Zero Hidden Cuts'}
            </span>
            <p className="text-charcoal/80 font-medium leading-relaxed">
              {isHi
                ? 'मंडी शुल्क या आढ़तिया कटौती से मुक्त, पारदर्शी शुद्ध भुगतान।'
                : 'Zero undisclosed intermediary commission or arbitrary moisture penalties.'}
            </p>
          </div>

          <div className="p-3.5 bg-cream border-2 border-charcoal space-y-1">
            <span className="font-black uppercase text-charcoal block">
              {isHi ? 'कैलिब्रेटेड ग्रेडिंग' : 'Calibrated Grading'}
            </span>
            <p className="text-charcoal/80 font-medium leading-relaxed">
              {isHi
                ? 'उचित मूल्य निर्धारण के लिए मानकीकृत ग्रेड A परीक्षण।'
                : 'Transparent Grade A quality verification standardizes honest farm pricing.'}
            </p>
          </div>
        </div>

        <div className="pt-3 border-t-2 border-charcoal flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-[11px] font-mono text-charcoal/60">
            {isHi ? 'सांकेतिक प्रोटोटाइप अर्थशास्त्र' : 'Illustrative prototype economics'}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate(data.ctaPrimaryPath)}
              className="btn-bauhaus-primary px-4 py-2 text-xs uppercase tracking-wider flex items-center gap-1.5"
            >
              <span>{isHi ? data.ctaPrimaryHi : data.ctaPrimaryEn}</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
            </button>
            <button
              onClick={() => navigate(data.ctaSecondaryPath)}
              className="px-4 py-2 text-xs font-bold uppercase tracking-wider bg-white text-charcoal border-2 border-charcoal hover:bg-gold shadow-bauhaus-sm transition-all"
            >
              <span>{isHi ? data.ctaSecondaryHi : data.ctaSecondaryEn}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ========================================================
// 3. MAIN COMPONENT WITH STRICT ROLE SEPARATION (SECTION 1)
// ========================================================
export const PriceTransparency = () => {
  const { language } = useLanguage();
  const { currentRole } = useRole();
  const isFarmer = currentRole === 'farmer';
  const isHi = language === 'hi';

  // Strict role separation: render completely distinct views
  return isFarmer ? (
    <FarmerPricingView isHi={isHi} />
  ) : (
    <BuyerPricingView isHi={isHi} />
  );
};

export default PriceTransparency;
