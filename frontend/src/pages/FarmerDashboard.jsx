import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useRole } from '../context/RoleContext';
import {
  Plus,
  ArrowRight,
  ChevronRight,
  Sparkles,
  MapPin,
  Calendar,
} from 'lucide-react';
import { getFarmerNearbyDemand } from '../data/mockDemand';

export const FarmerDashboard = () => {
  const { t, language } = useLanguage();
  const { currentUser } = useRole();
  const navigate = useNavigate();

  const isHi = language === 'hi';
  const nearbyDemands = getFarmerNearbyDemand().slice(0, 3);

  const metrics = [
    {
      title: t('farmerDashboard.availableProduce') || (isHi ? 'आज की उपलब्ध उपज' : "Today's Available Produce"),
      value: '680 kg',
      subtext: isHi ? 'टमाटर 280 किग्रा • आलू 400 किग्रा' : 'Tomato 280 kg • Potato 400 kg',
      accent: 'bg-crop',
      accentStyle: { backgroundColor: '#4D7C0F' },
      shape: 'square',
    },
    {
      title: t('farmerDashboard.pendingOrders') || (isHi ? 'लंबित ऑर्डर' : 'Pending Orders'),
      value: '1',
      subtext: isHi ? 'पिकअप आज सुबह 09:25' : 'Reefer pickup today 09:25 AM',
      accent: 'bg-gold',
      accentStyle: { backgroundColor: '#EAB308' },
      shape: 'triangle',
    },
    {
      title: t('farmerDashboard.expectedPayout') || (isHi ? 'अनुमानित भुगतान' : 'Expected Payout'),
      value: '₹14,850',
      subtext: isHi ? '₹22/किग्रा टमाटर • ₹19/किग्रा आलू' : '₹22/kg tomato • ₹19/kg potato',
      accent: 'bg-forest',
      accentStyle: { backgroundColor: '#14532D' },
      shape: 'circle',
    },
    {
      title: t('farmerDashboard.localDemandOpportunity') || (isHi ? 'स्थानीय मांग अवसर' : 'Local Demand Opportunity'),
      value: '320 kg',
      subtext: isHi ? 'टमाटर मांग अंतर • गौतम बुद्ध नगर' : 'Tomato deficit • Gautam Buddha Nagar',
      accent: 'bg-earth',
      accentStyle: { backgroundColor: '#92400E' },
      shape: 'square',
    },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Welcome Header */}
      <div className="pb-4 border-b-3 border-charcoal flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-charcoal/70 mb-1 uppercase tracking-wider">
            <span>{isHi ? (currentUser?.nameHi || 'रमेश कुमार') : (currentUser?.name || 'Ramesh Kumar')}</span>
            <span>■</span>
            <span>{isHi ? (currentUser?.organizationHi || 'दादरी कृषि क्लस्टर') : (currentUser?.organization || 'Dadri Smallholder Cluster')}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-charcoal uppercase tracking-tight">
            {t('farmerDashboard.greeting') || (isHi ? 'सुप्रभात, रमेश।' : 'Good morning, Ramesh.')}
          </h1>
          <p className="text-xs text-charcoal/80 font-medium mt-0.5">
            {t('farmerDashboard.subGreeting') || (isHi ? 'आज आपके खेत के आसपास क्या हो रहा है, यहाँ देखें।' : 'Here is what is happening around your farm today.')}
          </p>
        </div>

        <button
          onClick={() => navigate('/farmer/produce')}
          className="btn-bauhaus-primary px-4 py-2 text-xs uppercase tracking-wider flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>{t('farmerDashboard.listProduceBtn') || (isHi ? '+ नई उपज सूचीबद्ध करें' : '+ List New Produce')}</span>
        </button>
      </div>

      {/* 4 Metrics with Section 9 Agricultural Palette */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m, idx) => (
          <div
            key={idx}
            className="p-5 bg-white border-3 border-charcoal shadow-bauhaus flex flex-col justify-between space-y-2 relative"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase text-charcoal/70 tracking-wider">
                {m.title}
              </span>
              <span
                style={m.accentStyle}
                className={`w-3 h-3 ${m.accent} border border-charcoal ${m.shape === 'circle' ? 'rounded-full' : ''}`}
              ></span>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-charcoal font-mono tracking-tight">
                {m.value}
              </div>
              <p className="text-xs font-medium text-charcoal/70 mt-0.5 leading-tight">{m.subtext}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Bauhaus Demand Recommendation Box */}
      <div
        style={{ backgroundColor: '#DDE7D8', color: '#172016' }}
        className="p-5 bg-sage border-4 border-charcoal shadow-bauhaus-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
      >
        <div className="space-y-1 max-w-2xl">
          <div className="flex items-center gap-2">
            <span
              style={{ backgroundColor: '#EAB308', color: '#172016' }}
              className="px-2 py-0.5 bg-gold text-charcoal text-[10px] font-mono font-black uppercase border border-charcoal shadow-bauhaus-sm"
            >
              {t('farmerDashboard.aiInsightTitle') || 'AI OPPORTUNITY'}
            </span>
            <span style={{ color: '#14532D' }} className="font-mono text-xs font-black">REGIONAL MANDI FORECAST</span>
          </div>
          <p style={{ color: '#172016' }} className="text-sm sm:text-base font-black uppercase leading-snug">
            "{t('farmerDashboard.aiInsightHeadline') || 'Tomato demand is rising +19%.'}"
          </p>
          <p style={{ color: 'rgba(23, 32, 22, 0.85)' }} className="text-xs font-medium">
            {t('farmerDashboard.aiInsightRecommendation') || 'List 250 kg this week to access current buyer demand.'}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => navigate('/ai')}
            className="btn-bauhaus-primary px-4 py-2 text-xs uppercase tracking-wider flex items-center gap-1.5"
          >
            <span>{isHi ? 'मांग विश्लेषण देखें' : 'View AI Insights'}</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
          </button>
        </div>
      </div>

      {/* Active Listings & Escrow Settlement */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Listings (Left 2 Columns) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Your Produce Section */}
          <div className="p-5 bg-white border-3 border-charcoal shadow-bauhaus space-y-4">
            <div className="flex items-center justify-between pb-3 border-b-2 border-charcoal">
              <h2 className="text-xs font-black uppercase tracking-wider text-charcoal">
                {t('farmerDashboard.yourProduce') || (isHi ? 'आपकी उपज' : 'Your Produce')}
              </h2>
              <Link
                to="/farmer/produce"
                style={{ color: '#14532D' }}
                className="text-xs font-bold uppercase text-forest hover:text-charcoal flex items-center gap-1"
              >
                <span>{t('common.viewAll')}</span>
                <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </Link>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-3 bg-cream border-2 border-charcoal flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="font-black text-charcoal text-sm uppercase">
                    {isHi ? 'टमाटर (हाइब्रिड लाल)' : 'Tomato (Hybrid Red)'}
                  </span>
                  <p className="text-charcoal/70 font-medium mt-0.5">
                    {isHi ? 'ग्रेड A • 280 किग्रा • कटाई: 24 सितम्बर' : 'Grade A • 280 kg • Harvest: Sep 24'}
                  </p>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-center font-mono">
                  <span style={{ color: '#14532D' }} className="font-black text-forest text-sm">₹22/kg</span>
                  <span
                    style={{ backgroundColor: '#EAB308', color: '#172016' }}
                    className="px-2 py-0.5 text-[10px] font-black uppercase bg-gold text-charcoal border border-charcoal shadow-bauhaus-sm"
                  >
                    {isHi ? 'ऑर्डर पुष्ट' : 'CONFIRMED'}
                  </span>
                </div>
              </div>

              <div className="p-3 bg-cream border-2 border-charcoal flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="font-black text-charcoal text-sm uppercase">
                    {isHi ? 'आलू (पुखराज)' : 'Potato (Pukhraj)'}
                  </span>
                  <p className="text-charcoal/70 font-medium mt-0.5">
                    {isHi ? 'ग्रेड A • 400 किग्रा • कटाई: 25 सितम्बर' : 'Grade A • 400 kg • Harvest: Sep 25'}
                  </p>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-center font-mono">
                  <span className="font-black text-charcoal text-sm">₹19/kg</span>
                  <span
                    style={{ backgroundColor: '#FFFFFF', color: '#172016' }}
                    className="px-2 py-0.5 text-[10px] font-black uppercase bg-white text-charcoal border border-charcoal shadow-bauhaus-sm"
                  >
                    {isHi ? 'सक्रिय सूची' : 'LISTED'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Nearby Buyer Demand Section */}
          <div className="p-5 bg-white border-3 border-charcoal shadow-bauhaus space-y-4">
            <div className="flex items-center justify-between pb-3 border-b-2 border-charcoal">
              <div>
                <h2 className="text-xs font-black uppercase tracking-wider text-charcoal">
                  {t('farmerDashboard.buyerDemandsNearby') || (isHi ? 'नज़दीकी खरीदार मांग' : 'Nearby Buyer Demand')}
                </h2>
                <p className="text-[11px] text-charcoal/60 font-medium">
                  {isHi ? 'स्थानीय संस्थागत खरीदार जो आपकी उपज सीधे खरीद रहे हैं' : 'Verified institutional buyers actively procuring in your region'}
                </p>
              </div>
              <Link
                to="/farmer/demand"
                style={{ color: '#14532D' }}
                className="text-xs font-bold uppercase text-forest hover:text-charcoal flex items-center gap-1"
              >
                <span>{t('common.viewAll')}</span>
                <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </Link>
            </div>

            <div className="space-y-2 text-xs">
              {nearbyDemands.map((demand) => (
                <div
                  key={demand.id}
                  className="p-3 bg-cream border-2 border-charcoal flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-white transition-colors"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-black text-charcoal text-sm uppercase">
                        {isHi ? demand.buyerHi : demand.buyer}
                      </span>
                      {demand.urgency === 'high' && (
                        <span
                          style={{ backgroundColor: '#92400E', color: '#FFFFFF' }}
                          className="px-1.5 py-0.2 text-[9px] font-mono font-bold uppercase border border-charcoal"
                        >
                          {isHi ? 'तत्काल' : 'URGENT'}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-charcoal/70 text-[11px] font-medium">
                      <span>{isHi ? demand.cropHi : demand.crop} • {demand.quantityKg} kg ({demand.grade})</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {isHi ? demand.locationHi : demand.location}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-center">
                    <div className="text-right font-mono">
                      <span style={{ color: '#14532D' }} className="font-black text-forest text-sm">
                        ₹{demand.pricePerKg}/kg
                      </span>
                      <span className="text-[10px] text-charcoal/60 block">
                        ₹{(demand.quantityKg * demand.pricePerKg).toLocaleString()}
                      </span>
                    </div>
                    <button
                      onClick={() => navigate('/farmer/produce')}
                      className="btn-bauhaus-primary px-2.5 py-1 text-[11px] uppercase tracking-wider"
                    >
                      {t('farmerDashboard.viewRequest') || (isHi ? 'आपूर्ति करें' : 'Fulfill')}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Settlement & Escrow column (Right 1 Column) */}
        <div className="p-5 bg-white border-3 border-charcoal shadow-bauhaus space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <h2 className="text-xs font-black uppercase tracking-wider text-charcoal pb-2 border-b-2 border-charcoal">
              {isHi ? 'एस्क्रो एवं भुगतान स्थिति' : 'UPI Escrow Settlement'}
            </h2>

            <div className="p-3.5 bg-sage border-2 border-charcoal space-y-2 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-charcoal/70 uppercase">{isHi ? 'खाते में जमा:' : 'Settled to Account:'}</span>
                <span className="font-black text-forest text-sm">₹5,500</span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal/70 uppercase">{isHi ? 'एस्क्रो में सुरक्षित:' : 'In Escrow (Transit):'}</span>
                <span className="font-black text-charcoal text-sm">₹9,350</span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal/70 uppercase">{isHi ? 'आढ़तिया कटौती:' : 'Mandi Commission:'}</span>
                <span style={{ color: '#14532D' }} className="font-black text-forest">₹0 (0%)</span>
              </div>
              <div className="pt-2 border-t border-charcoal/20 text-[11px] font-sans font-medium text-charcoal leading-relaxed">
                {t('farmerDashboard.earningsBreakdown') || (isHi ? 'भुगतान स्थिति: ₹5,500 UPI द्वारा प्राप्त • ₹9,350 एस्क्रो सुरक्षित' : 'Payment Status: ₹5,500 settled via UPI • ₹9,350 in Transit Escrow')}
              </div>
            </div>

            <div className="p-3 bg-cream border-2 border-charcoal space-y-1 text-xs">
              <div className="font-bold text-charcoal uppercase">
                {isHi ? 'निर्धारित पिकअप वाहन' : 'Scheduled Pickup'}
              </div>
              <p className="text-charcoal/70 text-[11px] font-medium leading-tight">
                {isHi ? 'टाटा ऐस EV रेफ़र (UP 16 BT 9821) आज सुबह 09:25 बजे दादरी गेट 1 पहुंचेगा।' : 'Tata Ace EV Reefer (UP 16 BT 9821) arriving at Dadri Gate 1 at 09:25 AM today.'}
              </p>
            </div>
          </div>

          <div className="space-y-2 pt-4">
            <Link
              to="/farmer/orders"
              className="btn-bauhaus-primary w-full py-2 text-center text-xs uppercase tracking-wider block"
            >
              {t('farmerDashboard.viewOrdersBtn') || (isHi ? 'डिस्पैच प्रबंधित करें' : 'Manage Dispatches')}
            </Link>
            <Link
              to="/pricing"
              className="btn-bauhaus-white w-full py-2 text-center text-xs uppercase tracking-wider block"
            >
              {isHi ? 'उचित मूल्य देखें' : 'View Price Breakdown'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerDashboard;
