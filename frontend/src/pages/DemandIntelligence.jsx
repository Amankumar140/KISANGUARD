import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useRole } from '../context/RoleContext';
import { useNavigate, Navigate } from 'react-router-dom';
import {
  ArrowRight,
  Sparkles,
  TrendingUp,
  AlertTriangle,
  HelpCircle,
  Clock,
  CheckCircle2,
  PackageCheck,
  Store,
} from 'lucide-react';
import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { MOCK_FORECASTS } from '../data/mockForecasts';

export const DemandIntelligence = () => {
  const { t, language } = useLanguage();
  const { currentRole } = useRole();
  const navigate = useNavigate();
  const [selectedCrop, setSelectedCrop] = useState('tomato');

  // Guard: If buyer accesses /ai, redirect to /buyer/marketplace
  if (currentRole === 'buyer') {
    return <Navigate to="/buyer/marketplace" replace />;
  }

  const isFarmer = currentRole === 'farmer';
  const isHi = language === 'hi';

  const forecast = MOCK_FORECASTS[selectedCrop] || MOCK_FORECASTS.tomato;
  const cropDisplayName = isHi ? forecast.cropHi : forecast.crop;

  // 1. Separate Farmer AI Data Object
  const farmerAIData = {
    title: t('aiIntelligence.farmerTitle') || (isHi ? 'किसान मांग इंटेलिजेंस' : 'FARMER DEMAND INTELLIGENCE'),
    subtitle: t('aiIntelligence.farmerSubtitle') || (isHi ? 'मांग चरम पर पहुँचने से पहले जानें कि खरीदारों को क्या चाहिए।' : 'Know what buyers will need before demand peaks.'),
    badge: isHi ? 'किसान पोर्टल' : 'FARMER PORTAL',
    badgeStyle: { backgroundColor: '#14532D', color: '#FFFFFF' },

    metrics: [
      {
        title: isHi ? 'खरीदार मांग पूर्वानुमान' : 'BUYER DEMAND FORECAST',
        value: `${forecast.predictedDemandKg.toLocaleString()} kg`,
        subtext: isHi ? '+19% अगले 3 सप्ताह' : '+19% next 3 weeks',
        accentStyle: { backgroundColor: '#14532D' },
        isBadge: false,
      },
      {
        title: isHi ? 'स्थानीय आपूर्ति अवसर' : 'LOCAL SUPPLY OPPORTUNITY',
        value: `${forecast.supplyGapKg} kg`,
        subtext: isHi ? 'अनुमानित मांग अंतर' : 'Projected demand gap',
        accentStyle: { backgroundColor: '#EAB308' },
        isBadge: true,
        badgeText: isHi ? 'अवसर' : 'OPPORTUNITY',
        badgeBg: '#14532D',
      },
      {
        title: isHi ? 'अपेक्षित फार्म-गेट मूल्य' : 'EXPECTED FARMGATE PRICE',
        value: '₹22/kg',
        subtext: isHi ? `ग्रेड A ${cropDisplayName}` : `Grade A ${forecast.crop.toLowerCase()}`,
        accentStyle: { backgroundColor: '#4D7C0F' },
        isBadge: false,
      },
      {
        title: isHi ? 'आपका बिक्री अवसर' : 'YOUR SALES OPPORTUNITY',
        value: '250 kg',
        subtext: isHi ? 'सूचीबद्ध करने हेतु अनुशंसित मात्रा' : 'Recommended quantity to list',
        accentStyle: { backgroundColor: '#92400E' },
        isBadge: false,
      },
    ],

    alert: {
      label: isHi ? 'AI मांग संकेत' : 'AI DEMAND SIGNAL',
      signal: isHi ? `${cropDisplayName} • +19% मांग` : `${forecast.crop} • +19% demand`,
      title: isHi ? `${cropDisplayName.toUpperCase()} की मांग बढ़ रही है` : `${forecast.crop.toUpperCase()} DEMAND IS RISING`,
      desc1: isHi
        ? `दिल्ली-NCR नेटवर्क में ग्रेड A ${cropDisplayName} की खरीदार मांग अगले 3 सप्ताह में 19% बढ़ने की उम्मीद है।`
        : `Buyer demand for Grade A ${forecast.crop.toLowerCase()}s in the Delhi-NCR network is expected to increase by 19% over the next 3 weeks.`,
      desc2: isHi
        ? `लगभग ${forecast.supplyGapKg} किग्रा का आपूर्ति अंतर निकटवर्ती किसानों के लिए बड़ा अवसर बन सकता है।`
        : `An estimated ${forecast.supplyGapKg} kg supply gap could create an opportunity for nearby farmers.`,
      primaryBtn: {
        label: isHi ? 'नज़दीकी मांग देखें →' : 'VIEW NEARBY DEMAND →',
        action: () => navigate('/farmer/demand'),
      },
      secondaryBtn: {
        label: isHi ? `${cropDisplayName} सूचीबद्ध करें →` : `LIST ${forecast.crop.toUpperCase()}S →`,
        action: () => navigate('/farmer/produce'),
      },
    },

    recommendations: {
      heading: isHi ? 'आपके लिए AI अनुशंसाएं' : 'AI RECOMMENDATIONS FOR YOU',
      items: [
        {
          id: 'rec-1',
          title: isHi ? `250 किग्रा ${cropDisplayName} सूचीबद्ध करें` : `LIST 250 KG ${forecast.crop.toUpperCase()}S`,
          desc: isHi
            ? `वर्तमान खरीदार मांग और संभावित कमी ग्रेड A ${cropDisplayName} के लिए एक मजबूत अवसर दर्शाती है।`
            : `Current buyer demand and projected shortage indicate a strong opportunity for Grade A ${forecast.crop.toLowerCase()}s.`,
          btnText: isHi ? 'उपज सूचीबद्ध करें' : 'LIST PRODUCE',
          action: () => navigate('/farmer/produce'),
        },
        {
          id: 'rec-2',
          title: isHi ? `फ्रेशबाइट को 180 किग्रा की आवश्यकता हो सकती है` : 'FRESHBITE MAY NEED 180 KG',
          desc: isHi
            ? `फ्रेशबाइट रेस्टोरेंट्स की ग्रेड A ${cropDisplayName} के लिए आगामी आवश्यकता है।`
            : `FreshBite Restaurants has an upcoming requirement for Grade A ${forecast.crop.toLowerCase()}s.`,
          btnText: isHi ? 'मांग देखें' : 'VIEW DEMAND',
          action: () => navigate('/farmer/demand'),
        },
        {
          id: 'rec-3',
          title: isHi ? 'अपेक्षित मूल्य: ₹21–23/किग्रा' : 'EXPECTED PRICE: ₹21–23/KG',
          desc: isHi
            ? 'वर्तमान प्रत्यक्ष खरीदार प्रस्ताव लगभग ₹22/किग्रा हैं।'
            : 'Current direct buyer offers are around ₹22/kg.',
          btnText: isHi ? 'ऑफ़र देखें' : 'VIEW OFFERS',
          action: () => navigate('/pricing'),
        },
        {
          id: 'rec-4',
          title: isHi ? '7 दिनों में मांग चरम अपेक्षित' : 'DEMAND PEAK EXPECTED IN 7 DAYS',
          desc: isHi
            ? 'आगामी खरीदार आवश्यकताओं के लिए अपनी फसल तैयार करने पर विचार करें।'
            : 'Consider preparing your harvest for upcoming buyer requirements.',
          btnText: isHi ? 'पूर्वानुमान देखें' : 'VIEW FORECAST',
          action: () => {
            const el = document.getElementById('forecast-chart');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          },
        },
      ],
    },

    chart: {
      heading: isHi ? 'मुझे कब बेचना चाहिए? — खरीदार मांग पूर्वानुमान' : 'WHEN SHOULD I SELL? — BUYER DEMAND FORECAST',
      subtitle: isHi
        ? 'ऐतिहासिक खरीदार मांग + अनुमानित खरीदार मांग (अगले 30 दिन)'
        : 'Historical Buyer Demand + Forecast Buyer Demand (Next 30 Days)',
      badge: isHi ? '7 दिनों में मांग चरम • +19% अनुमानित वृद्धि' : 'Demand peak in 7 days • +19% projected growth',
      data: [
        { date: 'Sep 20', historicalDemand: 2050, forecastDemand: null },
        { date: 'Sep 23', historicalDemand: 2180, forecastDemand: null },
        { date: 'Sep 26', historicalDemand: 2300, forecastDemand: 2300 },
        { date: 'Sep 29', historicalDemand: null, forecastDemand: 2500 },
        { date: 'Oct 02', historicalDemand: null, forecastDemand: 2620 },
        { date: 'Oct 05', historicalDemand: null, forecastDemand: 2550 },
        { date: 'Oct 09', historicalDemand: null, forecastDemand: 2420 },
      ],
      legends: [
        { label: isHi ? 'ऐतिहासिक मांग' : 'HISTORICAL DEMAND', color: '#14532D' },
        { label: isHi ? 'AI मांग पूर्वानुमान' : 'AI DEMAND FORECAST', color: '#EAB308' },
      ],
    },

    quickQuestions: isHi
      ? [
          'मुझे इस सप्ताह क्या बेचना चाहिए?',
          'मेरे निकट टमाटर किसे चाहिए?',
          'मुझे क्या मूल्य मिल सकता है?',
          'टमाटर की मांग क्यों बढ़ रही है?',
          'कौन से खरीदार मेरी उपज तलाश रहे हैं?',
          'मुझे कितनी मात्रा सूचीबद्ध करनी चाहिए?',
        ]
      : [
          'What should I sell this week?',
          'Who needs tomatoes near me?',
          'What price can I expect?',
          'Why is tomato demand increasing?',
          'Which buyers are looking for my produce?',
          'What quantity should I list?',
        ],
  };

  // 2. Separate Buyer AI Data Object
  const buyerAIData = {
    title: t('aiIntelligence.buyerTitle') || (isHi ? 'खरीद इंटेलिजेंस' : 'PROCUREMENT INTELLIGENCE'),
    subtitle: t('aiIntelligence.buyerSubtitle') || (isHi ? 'कीमतें बदलने से पहले जानें कि आपूर्ति अंतर कहाँ बन रहा है।' : 'Know where supply gaps are forming before prices move.'),
    badge: isHi ? 'खरीदार पोर्टल' : 'BUYER PORTAL',
    badgeStyle: { backgroundColor: '#EAB308', color: '#172016' },

    metrics: [
      {
        title: isHi ? 'अनुमानित खरीद मांग' : 'PREDICTED PROCUREMENT DEMAND',
        value: `${forecast.predictedDemandKg.toLocaleString()} kg`,
        subtext: isHi ? 'वर्तमान मांग से +19% अधिक' : '+19% vs current demand',
        accentStyle: { backgroundColor: '#14532D' },
        isBadge: false,
      },
      {
        title: isHi ? 'सत्यापित नेटवर्क आपूर्ति' : 'VERIFIED NETWORK SUPPLY',
        value: `${forecast.currentSupplyKg.toLocaleString()} kg`,
        subtext: isHi ? 'निकटवर्ती उत्पादकों से उपलब्ध' : 'Available from nearby producers',
        accentStyle: { backgroundColor: '#4D7C0F' },
        isBadge: false,
      },
      {
        title: isHi ? 'आपूर्ति अंतर' : 'SUPPLY GAP',
        value: `${forecast.supplyGapKg} kg`,
        subtext: isHi ? 'आवश्यक अतिरिक्त मात्रा' : 'Additional quantity required',
        accentStyle: { backgroundColor: '#92400E' },
        isBadge: true,
        badgeText: isHi ? 'कमी' : 'DEFICIT',
        badgeBg: '#92400E',
      },
      {
        title: isHi ? 'पूर्वानुमान सटीकता' : 'FORECAST CONFIDENCE',
        value: `${forecast.confidencePct}%`,
        subtext: isHi ? 'AI पूर्वानुमान विश्वसनीयता' : 'AI forecast confidence',
        accentStyle: { backgroundColor: '#EAB308' },
        isBadge: false,
      },
    ],

    alert: {
      label: isHi ? 'AI खरीद संकेत' : 'AI PROCUREMENT SIGNAL',
      signal: isHi ? `${cropDisplayName} • 320 किग्रा कमी` : `${forecast.crop} • 320 kg deficit`,
      title: isHi ? 'खरीद की कमी का पता चला' : 'PROCUREMENT GAP DETECTED',
      desc1: isHi
        ? `अनुमानित ${cropDisplayName} मांग 2,500 किग्रा है जबकि सत्यापित नेटवर्क आपूर्ति वर्तमान में 2,180 किग्रा है।`
        : `Projected ${forecast.crop.toLowerCase()} demand is 2,500 kg while verified network supply is currently 2,180 kg.`,
      desc2: isHi
        ? 'अनुमानित मांग चरम से पहले अतिरिक्त 320 किग्रा सुरक्षित किया जाना चाहिए।'
        : 'An additional 320 kg should be secured before the projected demand peak.',
      primaryBtn: {
        label: isHi ? 'खरीद अनुरोध बनाएं →' : 'CREATE PROCUREMENT REQUEST →',
        action: () => navigate('/buyer/demand'),
      },
      secondaryBtn: {
        label: isHi ? 'मिलान किए गए आपूर्तिकर्ता देखें →' : 'VIEW MATCHED SUPPLIERS →',
        action: () => navigate('/buyer/matching'),
      },
    },

    recommendations: {
      heading: isHi ? 'AI खरीद अनुशंसाएं' : 'AI PROCUREMENT RECOMMENDATIONS',
      items: [
        {
          id: 'rec-1',
          title: isHi ? `500 किग्रा ${cropDisplayName} सुरक्षित करें` : `SECURE 500 KG ${forecast.crop.toUpperCase()}S`,
          desc: isHi
            ? 'वर्तमान मांग रुझान और आपूर्तिकर्ता उपलब्धता 500 किग्रा सुरक्षित करने का समर्थन करती है।'
            : `Current demand trend and supplier availability support securing 500 kg.`,
          btnText: isHi ? 'अनुरोध बनाएं' : 'CREATE REQUEST',
          action: () => navigate('/buyer/demand'),
        },
        {
          id: 'rec-2',
          title: isHi ? '3 आपूर्तिकर्ता पूरा कर सकते हैं' : '3 SUPPLIERS CAN FULFILL',
          desc: isHi
            ? 'रमेश कुमार, सीता देवी और राजेश यादव मिलकर 500 किग्रा प्रदान कर सकते हैं।'
            : 'Ramesh Kumar, Sita Devi and Rajesh Yadav can collectively provide 500 kg.',
          btnText: isHi ? 'मिलान देखें' : 'VIEW MATCHING',
          action: () => navigate('/buyer/matching'),
        },
        {
          id: 'rec-3',
          title: isHi ? 'अपेक्षित फार्म-गेट मूल्य: ₹22/किग्रा' : 'EXPECTED FARMGATE PRICE: ₹22/KG',
          desc: isHi
            ? 'प्रत्यक्ष आपूर्तिकर्ता प्रस्ताव वर्तमान में लगभग ₹21.50–22/किग्रा हैं।'
            : 'Direct supplier offers are currently around ₹21.50–22/kg.',
          btnText: isHi ? 'कीमतें देखें' : 'VIEW PRICES',
          action: () => navigate('/pricing'),
        },
        {
          id: 'rec-4',
          title: isHi ? '7 दिनों में मांग चरम' : 'DEMAND PEAK IN 7 DAYS',
          desc: isHi
            ? 'अनुमानित चरम से पहले आपूर्ति सुरक्षित करने से खरीद दबाव कम हो सकता है।'
            : 'Securing supply before the projected peak may reduce procurement pressure.',
          btnText: isHi ? 'खरीद की योजना बनाएं' : 'PLAN PROCUREMENT',
          action: () => navigate('/buyer/demand'),
        },
      ],
    },

    chart: {
      heading: isHi ? 'मुझे कब खरीद करनी चाहिए? — आपूर्ति बनाम मांग पूर्वानुमान' : 'WHEN SHOULD I PROCURE? — SUPPLY VS DEMAND FORECAST',
      subtitle: isHi
        ? 'अनुमानित खरीद मांग बनाम उपलब्ध सत्यापित नेटवर्क आपूर्ति (अगले 30 दिन)'
        : 'Projected procurement demand vs available verified network supply (Next 30 Days)',
      badge: isHi ? '320 किग्रा आपूर्ति कमी • अनुशंसित खरीद समय' : '320 KG SUPPLY GAP • Recommended procurement window',
      data: [
        { date: 'Sep 20', historicalDemand: 2050, forecastDemand: null, networkSupply: 2180 },
        { date: 'Sep 23', historicalDemand: 2250, forecastDemand: null, networkSupply: 2180 },
        { date: 'Sep 26', historicalDemand: 2350, forecastDemand: 2350, networkSupply: 2180 },
        { date: 'Sep 29', historicalDemand: null, forecastDemand: 2500, networkSupply: 2180 },
        { date: 'Oct 02', historicalDemand: null, forecastDemand: 2620, networkSupply: 2180 },
        { date: 'Oct 05', historicalDemand: null, forecastDemand: 2550, networkSupply: 2180 },
        { date: 'Oct 09', historicalDemand: null, forecastDemand: 2420, networkSupply: 2180 },
      ],
      legends: [
        { label: isHi ? 'ऐतिहासिक मांग' : 'HISTORICAL DEMAND', color: '#14532D' },
        { label: isHi ? 'AI पूर्वानुमान' : 'AI FORECAST', color: '#EAB308' },
        { label: isHi ? 'नेटवर्क आपूर्ति' : 'NETWORK SUPPLY', color: '#4D7C0F' },
      ],
    },

    quickQuestions: isHi
      ? [
          'मैं 500 किग्रा टमाटर कहाँ से खरीद सकता हूँ?',
          'कौन से आपूर्तिकर्ता मेरा अनुरोध पूरा कर सकते हैं?',
          'मेरी कुल लैंडेड लागत क्या होगी?',
          'मुझे कब खरीद करनी चाहिए?',
          'टमाटर की मांग क्यों बढ़ रही है?',
          'क्या आप सबसे अच्छा आपूर्तिकर्ता संयोजन खोज सकते हैं?',
        ]
      : [
          'Where can I source 500 kg tomatoes?',
          'Which suppliers can fulfill my request?',
          'What will my landed cost be?',
          'When should I procure?',
          'Why is tomato demand increasing?',
          'Can you find the best supplier combination?',
        ],
  };

  // 3. Current active dataset based strictly on role
  const aiData = isFarmer ? farmerAIData : buyerAIData;

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* 1. Header Section with Role Badge & Title */}
      <div className="pb-4 border-b-3 border-charcoal flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span
              style={aiData.badgeStyle}
              className="text-[10px] font-mono font-black uppercase px-2 py-0.5 border border-charcoal shadow-bauhaus-sm"
            >
              {aiData.badge}
            </span>
            <span className="text-[10px] font-mono font-bold text-charcoal/60 uppercase tracking-widest">
              {isFarmer
                ? (isHi ? 'स्मार्ट बिक्री मार्गदर्शन' : 'SMART SALES GUIDANCE')
                : (isHi ? 'स्मार्ट खरीद मार्गदर्शन' : 'SMART PROCUREMENT GUIDANCE')}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-charcoal uppercase tracking-tight">
            {aiData.title}
          </h1>
          <p className="text-xs text-charcoal/80 font-medium mt-1">
            {aiData.subtitle}
          </p>
        </div>

        <div>
          <label className="text-[10px] font-mono font-bold uppercase text-charcoal/70 block mb-1">
            {isHi ? 'फसल चुनें' : 'SELECT CROP'}
          </label>
          <select
            value={selectedCrop}
            onChange={(e) => setSelectedCrop(e.target.value)}
            className="px-3 py-1.5 bg-cream border-2 border-charcoal text-xs font-bold text-charcoal shadow-bauhaus-sm focus:bg-white focus:outline-none"
          >
            <option value="tomato">{isHi ? 'टमाटर (Tomato)' : 'Tomato'}</option>
            <option value="potato">{isHi ? 'आलू (Potato)' : 'Potato'}</option>
            <option value="onion">{isHi ? 'प्याज़ (Onion)' : 'Onion'}</option>
            <option value="carrot">{isHi ? 'गाजर (Carrot)' : 'Carrot'}</option>
            <option value="cauliflower">{isHi ? 'फूलगोभी (Cauliflower)' : 'Cauliflower'}</option>
          </select>
        </div>
      </div>

      {/* 2. Top Metric Cards — Strictly Role Specific */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {aiData.metrics.map((m, idx) => (
          <div
            key={idx}
            className="p-4 bg-white border-3 border-charcoal shadow-bauhaus space-y-1.5 relative flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-black uppercase text-charcoal/70 tracking-wider">
                  {m.title}
                </span>
                {m.isBadge ? (
                  <span
                    style={{ backgroundColor: m.badgeBg, color: '#FFFFFF' }}
                    className="text-[9px] font-mono font-bold px-1.5 py-0.5 border border-charcoal uppercase tracking-wider"
                  >
                    {m.badgeText}
                  </span>
                ) : (
                  <span
                    style={m.accentStyle}
                    className="w-2.5 h-2.5 border border-charcoal shrink-0"
                  />
                )}
              </div>
              <div className="text-2xl sm:text-3xl font-black text-charcoal font-mono tracking-tight">
                {m.value}
              </div>
            </div>
            <p className="text-xs text-charcoal/70 font-medium">{m.subtext}</p>
          </div>
        ))}
      </div>

      {/* 3. AI Insight Alert Panel — Tailored to Farmer vs Buyer */}
      <div
        style={{ backgroundColor: '#DDE7D8', color: '#172016' }}
        className="p-5 bg-sage border-4 border-charcoal shadow-bauhaus-md flex flex-col md:flex-row items-start md:items-center justify-between gap-5"
      >
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2.5">
            <span
              style={{ backgroundColor: isFarmer ? '#14532D' : '#EAB308', color: isFarmer ? '#FFFFFF' : '#172016' }}
              className="px-2.5 py-0.5 text-[10px] font-mono font-black uppercase border border-charcoal shadow-bauhaus-sm"
            >
              {aiData.alert.label}
            </span>
            <span style={{ color: '#14532D' }} className="font-mono text-xs font-black uppercase">
              {aiData.alert.signal}
            </span>
          </div>

          <h2 style={{ color: '#172016' }} className="text-base sm:text-lg font-black uppercase tracking-tight">
            {aiData.alert.title}
          </h2>

          <div className="space-y-1">
            <p style={{ color: 'rgba(23, 32, 22, 0.9)' }} className="text-xs font-medium leading-relaxed">
              {aiData.alert.desc1}
            </p>
            <p style={{ color: 'rgba(23, 32, 22, 0.9)' }} className="text-xs font-bold leading-relaxed">
              {aiData.alert.desc2}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={aiData.alert.primaryBtn.action}
            className="btn-bauhaus-primary px-4 py-2.5 text-xs uppercase tracking-wider flex items-center gap-2"
          >
            <span>{aiData.alert.primaryBtn.label}</span>
          </button>
          <button
            type="button"
            onClick={aiData.alert.secondaryBtn.action}
            className="btn-bauhaus-secondary px-4 py-2.5 text-xs uppercase tracking-wider flex items-center gap-1.5"
          >
            <span>{aiData.alert.secondaryBtn.label}</span>
          </button>
        </div>
      </div>

      {/* 4. AI Recommendations Grid — 4 Rich Actionable Cards with Buttons */}
      <div className="p-5 bg-white border-3 border-charcoal shadow-bauhaus space-y-4">
        <div className="flex items-center justify-between pb-3 border-b-2 border-charcoal">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-forest" />
            <h2 className="text-xs font-black uppercase tracking-wider text-charcoal">
              {aiData.recommendations.heading}
            </h2>
          </div>
          <span className="text-[10px] font-mono font-bold text-charcoal/60 uppercase">
            {isFarmer
              ? (isHi ? 'किसान कार्य योजना' : 'PRODUCER ACTION PLAN')
              : (isHi ? 'खरीद कार्य योजना' : 'PROCUREMENT ACTION PLAN')}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {aiData.recommendations.items.map((rec, i) => (
            <div
              key={rec.id || i}
              className="p-3.5 bg-cream border-2 border-charcoal shadow-bauhaus-sm flex flex-col justify-between space-y-3"
            >
              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5 font-bold text-charcoal text-[10px] font-mono uppercase">
                  <span
                    style={{ backgroundColor: isFarmer ? '#14532D' : '#EAB308' }}
                    className="w-2 h-2 rounded-full border border-charcoal"
                  />
                  <span>{isHi ? `अनुशंसा #${i + 1}` : `INSIGHT #${i + 1}`}</span>
                </div>
                <h3 className="text-xs font-black text-charcoal uppercase tracking-tight leading-snug">
                  {rec.title}
                </h3>
                <p className="text-[11px] text-charcoal/80 font-medium leading-relaxed">
                  {rec.desc}
                </p>
              </div>

              <button
                type="button"
                onClick={rec.action}
                className="w-full py-1.5 px-2 bg-white border-2 border-charcoal shadow-bauhaus-sm text-[10px] font-mono font-black uppercase text-charcoal hover:bg-gold transition-colors flex items-center justify-center gap-1.5"
              >
                <span>{rec.btnText}</span>
                <ArrowRight className="w-3 h-3 stroke-[3]" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Forecast Chart — "WHEN SHOULD I SELL?" vs "WHEN SHOULD I PROCURE?" */}
      <div id="forecast-chart" className="p-5 bg-white border-3 border-charcoal shadow-bauhaus space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b-2 border-charcoal">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span
                style={{ backgroundColor: '#172016', color: '#FFFFFF' }}
                className="text-[9px] font-mono font-black uppercase px-2 py-0.5"
              >
                {isFarmer ? (isHi ? 'बिक्री समय' : 'TIMING') : (isHi ? 'खरीद समय' : 'TIMING')}
              </span>
              <span className="text-[10px] font-mono font-bold text-forest uppercase">
                {aiData.chart.badge}
              </span>
            </div>
            <h2 className="text-xs sm:text-sm font-black uppercase tracking-wider text-charcoal">
              {aiData.chart.heading}
            </h2>
            <p className="text-xs text-charcoal/70 font-medium mt-0.5">
              {aiData.chart.subtitle}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3.5 text-xs font-mono font-bold">
            {aiData.chart.legends.map((leg, idx) => (
              <div key={idx} className="flex items-center gap-1.5">
                <span
                  style={{ backgroundColor: leg.color }}
                  className="w-3 h-3 border border-charcoal"
                />
                <span className="text-charcoal uppercase text-[10px]">{leg.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recharts Component with Role Differentiation */}
        <div className="h-72 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={aiData.chart.data}
              margin={{ top: 10, right: 15, left: -10, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorHistorical" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#14532D" stopOpacity={0.65} />
                  <stop offset="95%" stopColor="#14532D" stopOpacity={0.05} />
                </linearGradient>
                <linearGradient id="colorForecast" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#EAB308" stopOpacity={0.75} />
                  <stop offset="95%" stopColor="#EAB308" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#172016" strokeDasharray="3 3" strokeOpacity={0.15} vertical={false} />
              <XAxis
                dataKey="date"
                stroke="#172016"
                fontSize={11}
                tickLine={true}
                axisLine={{ stroke: '#172016', strokeWidth: 2 }}
                tickFormatter={(val) => isHi && val ? val.replace('Sep', 'सितं').replace('Oct', 'अक्तू') : val}
              />
              <YAxis
                stroke="#172016"
                fontSize={11}
                tickLine={true}
                axisLine={{ stroke: '#172016', strokeWidth: 2 }}
                unit="kg"
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  borderColor: '#172016',
                  borderWidth: '2px',
                  boxShadow: '4px 4px 0px #172016',
                  color: '#172016',
                  fontSize: '0.75rem',
                  fontWeight: '700',
                }}
              />
              <Area
                type="monotone"
                dataKey="historicalDemand"
                name={isHi ? 'ऐतिहासिक मांग' : 'Historical Demand'}
                stroke="#14532D"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorHistorical)"
              />
              <Area
                type="monotone"
                dataKey="forecastDemand"
                name={isHi ? 'AI मांग पूर्वानुमान' : 'AI Forecast Demand'}
                stroke="#EAB308"
                strokeWidth={3}
                strokeDasharray="4 4"
                fillOpacity={1}
                fill="url(#colorForecast)"
              />
              {!isFarmer && (
                <Line
                  type="monotone"
                  dataKey="networkSupply"
                  name={isHi ? 'सत्यापित नेटवर्क आपूर्ति' : 'Verified Network Supply'}
                  stroke="#4D7C0F"
                  strokeWidth={2.5}
                  strokeDasharray="6 3"
                  dot={{ stroke: '#172016', strokeWidth: 1.5, r: 3, fill: '#4D7C0F' }}
                />
              )}
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 6. Quick AI Questions Section — Tailored to Farmer vs Buyer */}
      <div className="p-5 bg-cream border-3 border-charcoal shadow-bauhaus space-y-3">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-forest" />
          <h2 className="text-xs font-black uppercase tracking-wider text-charcoal">
            {isFarmer
              ? (isHi ? 'त्वरित AI प्रश्न (किसान)' : 'QUICK AI INQUIRIES (FARMER)')
              : (isHi ? 'त्वरित AI प्रश्न (खरीदार)' : 'QUICK AI INQUIRIES (BUYER)')}
          </h2>
        </div>
        <p className="text-xs text-charcoal/70 font-medium">
          {isFarmer
            ? (isHi
                ? 'नीचे दिए गए किसी भी प्रश्न पर क्लिक करके तुरंत किसानगार्ड से बिक्री मार्गदर्शन प्राप्त करें:'
                : 'Click any query below to immediately receive KisanGuard selling advice:')
            : (isHi
                ? 'नीचे दिए गए किसी भी प्रश्न पर क्लिक करके तुरंत किसानगार्ड से खरीद मार्गदर्शन प्राप्त करें:'
                : 'Click any query below to immediately receive KisanGuard procurement advice:')
          }
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 pt-1">
          {aiData.quickQuestions.map((q, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                // Open global AI assistant button programmatically if available
                const chatBtn = document.querySelector('button[aria-label="KisanGuard Assistant"]') ||
                                document.querySelector('button[aria-label="किसानगार्ड सहायक"]') ||
                                document.querySelector('button[aria-label="KrishiFlow AI Assistant"]');
                if (chatBtn) chatBtn.click();
              }}
              className="p-2.5 bg-white border-2 border-charcoal shadow-bauhaus-sm text-left hover:bg-gold transition-colors flex items-center justify-between group"
            >
              <span className="text-xs font-bold text-charcoal">{q}</span>
              <ArrowRight className="w-3 h-3 text-charcoal/40 group-hover:text-charcoal group-hover:translate-x-0.5 transition-all shrink-0 ml-1.5" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DemandIntelligence;
