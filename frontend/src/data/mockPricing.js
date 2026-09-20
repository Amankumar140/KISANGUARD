// Centralized pricing data for KrishiFlow AI
// Separated data models for Buyer Procurement Economics vs Farmer Realization Economics

// Utility calculation functions (Section 13)
export const calculateLandedCost = (produceCost, logisticsCost, platformCost) =>
  produceCost + logisticsCost + platformCost;

export const calculateBuyerSaving = (traditionalCost, landedCost) =>
  traditionalCost - landedCost;

export const calculateBuyerSavingPercent = (traditionalCost, landedCost) =>
  Number((((traditionalCost - landedCost) / traditionalCost) * 100).toFixed(1));

export const calculateTotalProcurementCost = (costPerKg, quantityKg) =>
  costPerKg * quantityKg;

export const calculateFarmerRealization = (traditionalPrice, currentPrice) => ({
  improvementPerKg: currentPrice - traditionalPrice,
  improvementPercent: Number((((currentPrice - traditionalPrice) / traditionalPrice) * 100).toFixed(1)),
});

// Single source demo parameters
const DEMO_QTY = 500;
const TRADITIONAL_BUYER_PRICE = 30;
const KRISHIFLOW_BUYER_PRICE = 27;
const DIRECT_FARMER_PRICE = 22;
const LOGISTICS_PRICE = 3;
const PLATFORM_QA_PRICE = 2;

// 1. BUYER PROCUREMENT ECONOMICS DATA (Section 12)
export const buyerPricingData = {
  crop: 'Tomato',
  cropHi: 'टमाटर',
  unit: 'kg',
  quantity: DEMO_QTY,
  traditionalCost: TRADITIONAL_BUYER_PRICE,
  landedCost: KRISHIFLOW_BUYER_PRICE,
  savingPerKg: calculateBuyerSaving(TRADITIONAL_BUYER_PRICE, KRISHIFLOW_BUYER_PRICE),
  savingPercent: calculateBuyerSavingPercent(TRADITIONAL_BUYER_PRICE, KRISHIFLOW_BUYER_PRICE),
  totalCost: calculateTotalProcurementCost(KRISHIFLOW_BUYER_PRICE, DEMO_QTY),
  traditionalTotalCost: calculateTotalProcurementCost(TRADITIONAL_BUYER_PRICE, DEMO_QTY),
  totalSaving: calculateTotalProcurementCost(TRADITIONAL_BUYER_PRICE, DEMO_QTY) - calculateTotalProcurementCost(KRISHIFLOW_BUYER_PRICE, DEMO_QTY),
  
  produceCost: DIRECT_FARMER_PRICE,
  logisticsCost: LOGISTICS_PRICE,
  platformCost: PLATFORM_QA_PRICE,
  logisticsSharePercent: Number(((LOGISTICS_PRICE / KRISHIFLOW_BUYER_PRICE) * 100).toFixed(1)),

  headingEn: 'EVERY RUPEE, ACCOUNTED FOR.',
  headingHi: 'हर रुपये का पूरा हिसाब।',
  subtitleEn: 'See where your procurement cost goes and how direct sourcing reduces unnecessary intermediary margins.',
  subtitleHi: 'देखें कि आपकी खरीद लागत कहाँ जाती है और सीधा स्रोत अनावश्यक मध्यस्थ मार्जिन को कैसे कम करता है।',

  metrics: {
    card1: {
      titleEn: 'BUYER LANDED COST',
      titleHi: 'खरीदार लैंडेड लागत',
      value: '-10.0%',
      fromPrice: TRADITIONAL_BUYER_PRICE,
      toPrice: KRISHIFLOW_BUYER_PRICE,
      descEn: 'Direct procurement reduces your landed cost by eliminating unnecessary intermediary margins.',
      descHi: 'सीधी खरीद अनावश्यक मध्यस्थ मार्जिन को समाप्त करके आपकी लैंडेड लागत को कम करती है।',
    },
    card2: {
      titleEn: 'PROCUREMENT SAVING',
      titleHi: 'खरीद बचत',
      value: '₹3/kg',
      fromPrice: TRADITIONAL_BUYER_PRICE,
      toPrice: KRISHIFLOW_BUYER_PRICE,
      descEn: 'Estimated saving per kilogram compared with the traditional supply chain.',
      descHi: 'पारंपरिक आपूर्ति श्रृंखला की तुलना में प्रति किलोग्राम अनुमानित बचत।',
    },
    card3: {
      titleEn: 'TOTAL PROCUREMENT',
      titleHi: 'कुल खरीद मूल्य',
      qtyLabel: '500 kg',
      value: '₹13,500',
      descEn: 'Estimated landed value for the current procurement scenario.',
      descHi: 'वर्तमान खरीद परिदृश्य के लिए अनुमानित कुल लैंडेड मूल्य।',
    },
    card4: {
      titleEn: 'LOGISTICS SHARE',
      titleHi: 'लॉजिस्टिक्स हिस्सा',
      value: '₹3/kg',
      percentLabel: '11.1%',
      descEn: 'Estimated logistics component of the landed procurement cost.',
      descHi: 'लैंडेड खरीद लागत का अनुमानित लॉजिस्टिक्स घटक।',
    },
  },

  traditionalBreakdown: {
    titleEn: 'TRADITIONAL PROCUREMENT',
    titleHi: 'पारंपरिक खरीद प्रणाली',
    topologyEn: 'Farmer → Intermediary → Logistics → Buyer',
    topologyHi: 'किसान → बिचौलिया / आढ़तिया → लॉजिस्टिक्स → खरीदार',
    buyerPays: TRADITIONAL_BUYER_PRICE,
    items: [
      {
        labelEn: 'Farmer supply',
        labelHi: 'किसान को भुगतान',
        cost: 15,
        percent: 50,
        subtextEn: 'Base farmgate payout',
        subtextHi: 'मूल फार्मगेट मूल्य',
      },
      {
        labelEn: 'Intermediary margin',
        labelHi: 'मध्यस्थ मार्जिन',
        cost: 10,
        percent: 33,
        subtextEn: 'Commission arhtiyas & dalali',
        subtextHi: 'कमीशन आढ़तिया और दलाली',
      },
      {
        labelEn: 'Logistics',
        labelHi: 'लॉजिस्टिक्स',
        cost: 5,
        percent: 17,
        subtextEn: 'Uncoordinated individual haul',
        subtextHi: 'असमन्वित व्यक्तिगत परिवहन',
      },
    ],
  },

  krishiflowBreakdown: {
    titleEn: 'KRISHIFLOW DIRECT PROCUREMENT',
    titleHi: 'कृषिप्रवाह प्रत्यक्ष खरीद',
    topologyEn: 'Verified Farmer → KrishiFlow → Buyer',
    topologyHi: 'सत्यापित किसान → कृषिप्रवाह → खरीदार',
    buyerPays: KRISHIFLOW_BUYER_PRICE,
    items: [
      {
        labelEn: 'Direct produce',
        labelHi: 'सीधी उपज लागत',
        cost: DIRECT_FARMER_PRICE,
        percent: 81.5,
        subtextEn: 'Direct verified farmer payout',
        subtextHi: 'सत्यापित किसान को सीधा भुगतान',
      },
      {
        labelEn: 'Logistics',
        labelHi: 'लॉजिस्टिक्स',
        cost: LOGISTICS_PRICE,
        percent: 11.1,
        subtextEn: 'Clustered multi-pickup routing',
        subtextHi: 'क्लस्टर्ड मल्टी-पिकअप रूटिंग',
      },
      {
        labelEn: 'Platform & Quality Assurance',
        labelHi: 'प्लेटफ़ॉर्म एवं गुणवत्ता आश्वासन',
        cost: PLATFORM_QA_PRICE,
        percent: 7.4,
        subtextEn: 'Digital QC, escrow & matching',
        subtextHi: 'डिजिटल QC, एस्क्रो और मिलान',
      },
    ],
  },

  guarantees: [
    {
      titleEn: 'ESCROW SETTLEMENT',
      titleHi: 'एस्क्रो भुगतान सुरक्षा',
      descEn: 'Instant UPI / Escrow release upon digital QC confirmation.',
      descHi: 'डिजिटल गुणवत्ता पुष्टि के बाद तत्काल UPI / एस्क्रो भुगतान जारी।',
    },
    {
      titleEn: 'ZERO HIDDEN CUTS',
      titleHi: 'शून्य छिपा हुआ कमीशन',
      descEn: 'No undisclosed intermediary commissions or arbitrary deductions.',
      descHi: 'कोई अघोषित मध्यस्थ कमीशन या मनमानी मंडी कटौती नहीं।',
    },
    {
      titleEn: 'GRADE CALIBRATION',
      titleHi: 'कैलिब्रेटेड ग्रेडिंग',
      descEn: 'Standardized Grade A grading ensures transparent procurement quality.',
      descHi: 'मानकीकृत ग्रेड A परीक्षण पारदर्शी खरीद गुणवत्ता सुनिश्चित करता है।',
    },
  ],

  ctaPrimaryEn: 'CREATE PROCUREMENT REQUEST →',
  ctaPrimaryHi: 'खरीद अनुरोध बनाएं →',
  ctaPrimaryPath: '/buyer/demand',
  ctaSecondaryEn: 'VIEW SUPPLIERS →',
  ctaSecondaryHi: 'आपूर्तिकर्ता देखें →',
  ctaSecondaryPath: '/buyer/marketplace',
};

// 2. FARMER REALIZATION ECONOMICS DATA (Section 11 & 12)
export const farmerPricingData = {
  crop: 'Tomato',
  cropHi: 'टमाटर',
  unit: 'kg',
  traditionalRealization: 15,
  krishiFlowRealization: DIRECT_FARMER_PRICE,
  improvementPercent: 46.6,
  improvementPerKg: 7,

  headingEn: 'EVERY RUPEE YOU EARN, ACCOUNTED FOR.',
  headingHi: 'आपकी हर कमाई का पूरा हिसाब।',
  subtitleEn: 'See exactly how direct procurement changes your farmgate realization.',
  subtitleHi: 'देखें कि सीधी खरीद से आपकी फार्मगेट आय कैसे बदलती है।',

  primaryMetric: {
    labelEn: 'FARMER NET REALIZATION',
    labelHi: 'किसान शुद्ध आय',
    value: '+46.6%',
    fromPrice: 15,
    toPrice: DIRECT_FARMER_PRICE,
    descEn: 'Direct buyer procurement increases farmer realization by reducing intermediary margins.',
    descHi: 'बिचौलिया मार्जिन को हटाकर सीधी खरीद से किसान की आय बढ़ती है।',
  },
  secondaryMetric: {
    labelEn: 'YOUR DIRECT PAYOUT',
    labelHi: 'आपका सीधा भुगतान',
    value: '₹22/kg',
    traditional: '₹15/kg',
    improvement: '+₹7/kg',
    descEn: 'Guaranteed farmgate price credited directly via UPI upon digital inspection.',
    descHi: 'डिजिटल गुणवत्ता पुष्टि के बाद सीधे बैंक खाते में गारंटीड फार्मगेट भुगतान।',
  },

  traditionalChain: {
    titleEn: 'TRADITIONAL MANDI CHAIN',
    titleHi: 'पारंपरिक मंडी श्रृंखला',
    topologyEn: 'Farmer → Dalal → Commission Agent → Logistics → Retailer',
    topologyHi: 'किसान → दलाल → आढ़तिया → परिवहन → खुदरा विक्रेता',
    farmerReceives: 15,
    intermediaryMargins: 10,
    logistics: 5,
    terminalPrice: 30,
  },

  krishiflowChain: {
    titleEn: 'KRISHIFLOW DIRECT MODEL',
    titleHi: 'कृषिप्रवाह प्रत्यक्ष मॉडल',
    topologyEn: 'Farmer → KisanGuard → Enterprise Buyer',
    topologyHi: 'किसान → किसानगार्ड → संस्थागत खरीदार',
    farmerReceives: DIRECT_FARMER_PRICE,
    logistics: LOGISTICS_PRICE,
    platformFee: PLATFORM_QA_PRICE,
    terminalPrice: KRISHIFLOW_BUYER_PRICE,
  },

  ctaPrimaryEn: 'VIEW BUYER DEMAND →',
  ctaPrimaryHi: 'खरीदार मांग देखें →',
  ctaPrimaryPath: '/farmer/demand',
  ctaSecondaryEn: 'MY PRODUCE →',
  ctaSecondaryHi: 'मेरी उपज →',
  ctaSecondaryPath: '/farmer/produce',
};

// Aliases for compatibility
export const PRICING_DATA = {
  crop: 'Tomato',
  cropHi: 'टमाटर',
  unit: 'kg',
  traditional: {
    farmerReceives: 15,
    intermediaryMargins: 10,
    logistics: 5,
    buyerPays: TRADITIONAL_BUYER_PRICE,
  },
  krishiflow: {
    farmerReceives: DIRECT_FARMER_PRICE,
    logistics: LOGISTICS_PRICE,
    platform: PLATFORM_QA_PRICE,
    buyerPays: KRISHIFLOW_BUYER_PRICE,
  },
  metrics: {
    farmerGainPct: 46.6,
    farmerGainPerKg: 7,
    buyerSavingsPct: 10.0,
    buyerSavingsPerKg: 3,
    logisticsSavingsPct: 40.0,
  },
};

export const BUYER_PRICING = buyerPricingData;
export const FARMER_PRICING = farmerPricingData;
