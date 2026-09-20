import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useRole } from '../context/RoleContext';
import {
  ArrowRight,
  Plus,
  TrendingUp,
  ChevronRight,
  ShieldCheck,
  Truck,
  Sparkles,
  MapPin,
  Star,
} from 'lucide-react';
import { MOCK_ORDERS_FULL } from '../data/mockOrders';
import { MOCK_FARMERS_FULL } from '../data/mockFarmers';

export const BuyerDashboard = () => {
  const { t, language } = useLanguage();
  const { currentUser } = useRole();
  const navigate = useNavigate();

  const isHi = language === 'hi';
  const recentOrders = MOCK_ORDERS_FULL.slice(0, 4);
  const recommendedSuppliers = MOCK_FARMERS_FULL.slice(0, 3);

  const metrics = [
    {
      title: isHi ? 'सक्रिय खरीद अनुरोध' : 'Active Procurement',
      value: '3',
      subtext: isHi ? 'टमाटर 500 किग्रा • आलू • प्याज़' : 'Tomato 500 kg • Potato • Onion',
      change: 'LIVE',
      shape: 'circle',
      accent: 'bg-forest',
      accentStyle: { backgroundColor: '#14532D' },
    },
    {
      title: isHi ? 'लंबित ऑर्डर' : 'Pending Orders',
      value: '3',
      subtext: isHi ? 'दादरी क्लस्टर से आज पिकअप' : 'Dadri cluster pickup today',
      change: 'ACTIVE',
      shape: 'square',
      accent: 'bg-gold',
      accentStyle: { backgroundColor: '#EAB308' },
    },
    {
      title: isHi ? 'सत्यापित नेटवर्क आपूर्ति' : 'Network Supply',
      value: '2,180 kg',
      subtext: isHi ? 'स्थानीय किसान एवं FPO' : 'Smallholders & FPO clusters',
      change: '+19%',
      shape: 'triangle',
      accent: 'bg-crop',
      accentStyle: { backgroundColor: '#4D7C0F' },
    },
    {
      title: isHi ? 'अनुमानित कुल बचत' : 'Estimated Savings',
      value: '₹18,400',
      subtext: isHi ? 'थोक मंडी दर से 10% कम' : '10.0% direct savings vs mandi',
      change: '-10%',
      shape: 'square',
      accent: 'bg-earth',
      accentStyle: { backgroundColor: '#92400E' },
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Header: Bauhaus Style */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b-3 border-charcoal">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-charcoal/70 mb-1 uppercase tracking-wider">
            <span>{isHi ? (currentUser?.organizationHi || 'फ्रेशबाइट रेस्टोरेंट्स') : (currentUser?.organization || 'FreshBite Restaurants')}</span>
            <span>■</span>
            <span>{isHi ? (currentUser?.locationHi || 'सेक्टर 62 हब, नोएडा') : (currentUser?.location || 'Sector 62 Hub, Noida')}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-charcoal uppercase tracking-tight">
            {t('buyerDashboard.greeting') || (isHi ? 'सुप्रभात, प्रिया।' : 'Good morning, Priya.')}
          </h1>
          <p className="text-xs text-charcoal/80 font-medium mt-0.5">
            {t('buyerDashboard.subGreeting') || (isHi ? 'यहाँ आपके सक्रिय खरीद चक्र और आपूर्ति प्रवाह की स्थिति है।' : 'Here is the live status of your procurement pipeline.')}
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => navigate('/buyer/demand')}
            className="btn-bauhaus-primary px-4 py-2 text-xs uppercase tracking-wider flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>{t('buyerDashboard.createNewDemand') || (isHi ? '+ नया खरीद अनुरोध' : '+ New Procurement')}</span>
          </button>
        </div>
      </div>

      {/* 4 Primary Operational Metric Blocks */}
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
                style={{ backgroundColor: '#EAB308', color: '#172016' }}
                className="text-[10px] font-mono font-bold text-charcoal bg-gold border border-charcoal px-1.5 py-0.2 shadow-bauhaus-sm"
              >
                {m.change}
              </span>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-charcoal font-mono tracking-tight">
                {m.value}
              </div>
              <p className="text-xs font-medium text-charcoal/70 mt-0.5">{m.subtext}</p>
            </div>
            <div
              style={m.accentStyle}
              className={`w-3 h-3 ${m.accent} border border-charcoal self-end mt-1 ${m.shape === 'circle' ? 'rounded-full' : ''}`}
            />
          </div>
        ))}
      </div>

      {/* Procurement Shortcut (Section 17) */}
      <div
        style={{ backgroundColor: '#DDE7D8', color: '#172016' }}
        className="p-5 bg-sage border-4 border-charcoal shadow-bauhaus-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
      >
        <div className="space-y-1 max-w-xl">
          <div className="flex items-center gap-2">
            <span
              style={{ backgroundColor: '#14532D', color: '#FFFFFF' }}
              className="px-2 py-0.5 bg-forest text-white text-[10px] font-mono font-black uppercase border border-charcoal shadow-bauhaus-sm"
            >
              {isHi ? 'त्वरित खरीद' : 'PROCUREMENT SHORTCUT'}
            </span>
            <span style={{ color: '#14532D' }} className="font-mono text-xs font-black">2,180 KG VERIFIED SUPPLY ACTIVE</span>
          </div>
          <h2 style={{ color: '#172016' }} className="text-base sm:text-lg font-black uppercase tracking-tight">
            {isHi ? 'क्या आपको ताज़ा उपज की आवश्यकता है?' : 'Need to source produce?'}
          </h2>
          <p style={{ color: 'rgba(23, 32, 22, 0.85)' }} className="text-xs font-medium leading-relaxed">
            {isHi
              ? 'सत्यापित व्यक्तिगत किसानों से सीधे खरीदें या हमारे एल्गोरिदम को आपकी आवश्यकता के लिए सर्वोत्तम उत्पादक संयोजन खोजने दें।'
              : 'Procure directly from verified local producers or let KrishiFlow smart matching fulfill your enterprise bulk batch.'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            onClick={() => navigate('/buyer/marketplace', { state: { sourcingMode: 'direct' } })}
            className="btn-bauhaus-primary px-4 py-2.5 text-xs uppercase tracking-wider flex items-center gap-1.5"
          >
            <span>{isHi ? 'किसान देखें' : 'BROWSE FARMERS'}</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
          </button>
          <button
            onClick={() => navigate('/buyer/demand')}
            className="px-4 py-2.5 text-xs font-bold uppercase tracking-wider bg-white text-charcoal border-2 border-charcoal hover:bg-gold shadow-bauhaus-sm transition-all"
          >
            <span>{isHi ? '+ खरीद अनुरोध बनाएं' : 'CREATE PROCUREMENT REQUEST'}</span>
          </button>
        </div>
      </div>

      {/* Recommended Matched Suppliers */}
      <div className="p-5 bg-white border-3 border-charcoal shadow-bauhaus space-y-4">
        <div className="flex items-center justify-between pb-3 border-b-2 border-charcoal">
          <div>
            <h2 className="text-xs font-black uppercase tracking-wider text-charcoal">
              {isHi ? 'अनुशंसित सत्यापित आपूर्तिकर्ता' : 'Top Matched Regional Suppliers'}
            </h2>
            <p className="text-[11px] text-charcoal/60 font-medium">
              {isHi ? 'आपके 500 किग्रा खरीद अनुरोध के लिए मिलान किए गए किसान' : 'Verified producers ready to fulfill your 500 kg Tomato procurement'}
            </p>
          </div>
          <Link
            to="/buyer/marketplace"
            state={{ sourcingMode: 'smart' }}
            style={{ color: '#14532D' }}
            className="text-xs font-bold uppercase text-forest hover:text-charcoal flex items-center gap-1"
          >
            <span>{isHi ? 'मार्केटप्लेस में देखें' : 'View in Marketplace'}</span>
            <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recommendedSuppliers.map((farmer) => (
            <div
              key={farmer.id}
              className="p-4 bg-cream border-2 border-charcoal shadow-bauhaus-sm space-y-2 relative"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-black text-charcoal text-sm uppercase block">
                    {isHi ? farmer.nameHi : farmer.name}
                  </span>
                  <span className="text-[11px] text-charcoal/70 flex items-center gap-1 font-medium">
                    <MapPin className="w-3 h-3" />
                    {isHi ? farmer.locationHi : farmer.location} ({farmer.distanceKm} km)
                  </span>
                </div>
                <span
                  style={{ backgroundColor: '#14532D', color: '#FFFFFF' }}
                  className="px-2 py-0.5 text-xs font-mono font-black border border-charcoal shadow-bauhaus-sm"
                >
                  {farmer.matchScore}%
                </span>
              </div>

              <div className="pt-2 border-t border-charcoal/10 flex items-center justify-between text-xs font-mono">
                <span className="text-charcoal/70">{farmer.produce[0]?.quantityKg} kg @ ₹{farmer.produce[0]?.pricePerKg}/kg</span>
                <span style={{ color: '#14532D' }} className="font-bold">{farmer.produce[0]?.grade}</span>
              </div>

              <button
                onClick={() => navigate('/buyer/marketplace', { state: { sourcingMode: 'smart' } })}
                className="btn-bauhaus-primary w-full py-1.5 text-[11px] uppercase tracking-wider mt-2 block text-center"
              >
                {isHi ? 'मार्केटप्लेस में देखें' : 'View in Marketplace'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Procurement Pipeline & Quick Tracking */}
      <div className="p-5 bg-white border-3 border-charcoal shadow-bauhaus space-y-4">
        <div className="flex items-center justify-between pb-3 border-b-2 border-charcoal">
          <div className="flex items-center gap-2">
            <span style={{ backgroundColor: '#4D7C0F' }} className="w-3 h-3 bg-crop border border-charcoal"></span>
            <h2 className="text-xs font-black uppercase tracking-wider text-charcoal">
              {t('buyerDashboard.pipelineTitle') || (isHi ? 'सक्रिय खरीद पाइपलाइन' : 'Active Procurement Pipeline')}
            </h2>
          </div>
          <span style={{ color: '#14532D' }} className="text-xs font-mono font-bold text-forest">BATCH #KF-2026-0903</span>
        </div>

        {/* 4 Pipeline Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          <div className="p-3 bg-cream border-2 border-charcoal">
            <span className="font-mono text-[10px] text-charcoal/60 block uppercase">Step 01</span>
            <span className="text-xs font-black uppercase text-charcoal block mt-0.5">
              {t('buyerDashboard.step1') || 'Demand Posted'}
            </span>
            <span style={{ color: '#14532D' }} className="text-[11px] font-bold mt-0.5 block">500 kg Tomato</span>
          </div>

          <div className="p-3 bg-cream border-2 border-charcoal">
            <span className="font-mono text-[10px] text-charcoal/60 block uppercase">Step 02</span>
            <span className="text-xs font-black uppercase text-charcoal block mt-0.5">
              {t('buyerDashboard.step2') || '3 Suppliers Matched'}
            </span>
            <span style={{ color: '#14532D' }} className="text-[11px] font-bold mt-0.5 block">Ramesh • Sita • Rajesh</span>
          </div>

          <div
            style={{ backgroundColor: '#EAB308' }}
            className="p-3 bg-gold border-2 border-charcoal shadow-bauhaus-sm"
          >
            <span className="font-mono text-[10px] text-charcoal block uppercase font-bold">Step 03 (Current)</span>
            <span className="text-xs font-black uppercase text-charcoal block mt-0.5">
              {t('buyerDashboard.step3') || 'Reefer Route Active'}
            </span>
            <span className="text-[11px] font-bold text-charcoal mt-0.5 block">ETA 11:30 AM (Dadri)</span>
          </div>

          <div className="p-3 bg-white border-2 border-charcoal/40 opacity-70">
            <span className="font-mono text-[10px] text-charcoal/40 block uppercase">Step 04</span>
            <span className="text-xs font-black uppercase text-charcoal/60 block mt-0.5">
              {t('buyerDashboard.step4') || 'Delivery & Settlement'}
            </span>
            <span className="text-[11px] text-charcoal/50 mt-0.5 block">UPI Escrow Release</span>
          </div>
        </div>
      </div>

      {/* Orders Data Table */}
      <div className="p-5 bg-white border-3 border-charcoal shadow-bauhaus space-y-4">
        <div className="flex items-center justify-between pb-3 border-b-2 border-charcoal">
          <h2 className="text-xs font-black uppercase tracking-wider text-charcoal">
            {t('buyerDashboard.recentProcurements') || (isHi ? 'हाल के खरीद ऑर्डर' : 'Recent Procurements')}
          </h2>
          <Link
            to="/orders"
            style={{ color: '#14532D' }}
            className="text-xs font-bold uppercase text-forest hover:text-charcoal flex items-center gap-1"
          >
            <span>{t('common.viewAll')}</span>
            <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-cream border-b-2 border-charcoal text-charcoal font-black uppercase text-[11px]">
              <tr>
                <th className="py-2.5 px-3">{t('orders.orderId')}</th>
                <th className="py-2.5 px-3">{isHi ? 'आपूर्तिकर्ता' : 'Supplier'}</th>
                <th className="py-2.5 px-3">{t('common.crop')}</th>
                <th className="py-2.5 px-3">{t('common.quantity')}</th>
                <th className="py-2.5 px-3">{t('common.grade')}</th>
                <th className="py-2.5 px-3">{t('common.price')}</th>
                <th className="py-2.5 px-3">{t('common.status')}</th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-charcoal/10 font-mono">
              {recentOrders.map((ord) => (
                <tr key={ord.id} className="hover:bg-cream/50 transition-colors">
                  <td className="py-2.5 px-3 font-bold text-charcoal">{ord.id}</td>
                  <td className="py-2.5 px-3 font-sans font-bold text-charcoal">
                    {isHi ? ord.farmerHi : ord.farmer}
                  </td>
                  <td className="py-2.5 px-3 font-sans text-charcoal">
                    {isHi ? ord.cropHi : ord.crop}
                  </td>
                  <td className="py-2.5 px-3 text-charcoal">{ord.quantityKg} kg</td>
                  <td className="py-2.5 px-3 font-sans text-charcoal">{ord.grade}</td>
                  <td style={{ color: '#14532D' }} className="py-2.5 px-3 font-bold text-forest">{ord.totalValueFormatted}</td>
                  <td className="py-2.5 px-3 font-sans">
                    <span
                      style={{
                        backgroundColor: ord.status === 'confirmed' || ord.status === 'pickupScheduled' ? '#EAB308' : '#4D7C0F',
                        color: ord.status === 'confirmed' || ord.status === 'pickupScheduled' ? '#172016' : '#FFFFFF',
                      }}
                      className="px-2 py-0.5 text-[10px] font-black uppercase border border-charcoal shadow-bauhaus-sm"
                    >
                      {isHi ? ord.statusLabelHi : ord.statusLabel}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BuyerDashboard;
