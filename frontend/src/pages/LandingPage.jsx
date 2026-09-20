import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { HeroCarousel } from '../components/HeroCarousel';
import KisanGuardLogo from '../components/common/KisanGuardLogo';
import {
  Sprout,
  ArrowRight,
  BrainCircuit,
  Layers,
  Truck,
  Receipt,
  Check,
  TrendingUp,
  TrendingDown,
  ShieldCheck,
  MapPin,
} from 'lucide-react';

export const LandingPage = () => {
  const { t, language, setLanguage } = useLanguage();
  const navigate = useNavigate();

  const handleLangToggle = (lang) => {
    setLanguage(lang);
  };

  const narrativeSteps = [
    {
      step: '01',
      shape: 'circle',
      title: language === 'hi' ? 'मांग पूर्वानुमान' : 'Demand Intelligence',
      desc: language === 'hi'
        ? 'मंडी मांग और संस्थागत आवश्यकताओं का 3 सप्ताह पहले सटीक पूर्वानुमान।'
        : 'Predict regional mandi demand and institutional purchase requirements up to 3 weeks ahead.',
      icon: BrainCircuit,
    },
    {
      step: '02',
      shape: 'square',
      title: language === 'hi' ? 'स्मार्ट समूहन' : 'Supply Aggregation',
      desc: language === 'hi'
        ? 'छोटे किसानों की बिखरी उपज को जोड़कर बड़े खरीदारों के लिए पूर्ण लॉट तैयार करना।'
        : 'Automatically cluster fragmented smallholder harvests into standard enterprise bulk batches.',
      icon: Layers,
    },
    {
      step: '03',
      shape: 'triangle',
      title: language === 'hi' ? 'गतिशील रूटिंग' : 'Dynamic Logistics',
      desc: language === 'hi'
        ? 'मल्टी-स्टॉप फार्म पिकअप और कोल्ड-चेन समन्वय से परिवहन दूरी में 31% कमी।'
        : 'Reduce transit distances by 31% with multi-stop farm pickup and cold-chain coordination.',
      icon: Truck,
    },
    {
      step: '04',
      shape: 'diamond',
      title: language === 'hi' ? 'पारदर्शी अर्थशास्त्र' : 'Fair Economics',
      desc: language === 'hi'
        ? 'बिचौलियों की मध्यस्थता समाप्त। किसानों को 46% अधिक आय और खरीदार को 10% बचत।'
        : 'Disintermediate opaque middlemen. Farmers earn 46% more while buyers save 10% on procurement.',
      icon: Receipt,
    },
  ];

  return (
    <div className="min-h-screen bg-cream text-charcoal font-sans antialiased selection:bg-gold selection:text-charcoal">
      {/* ========================================================
          1. NAVIGATION: BAUHAUS GEOMETRIC HEADER
          ======================================================== */}
      <header className="sticky top-0 z-50 bg-white border-b-4 border-charcoal px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-bauhaus-sm">
        <div className="flex items-center gap-3">
          <KisanGuardLogo className="w-9 h-9" />
          <div className="flex items-baseline gap-2">
            <span className="font-black text-lg sm:text-xl tracking-tighter text-charcoal uppercase">
              {t('brand.name')}
            </span>
            <span
              style={{ backgroundColor: '#EAB308', color: '#172016' }}
              className="hidden sm:inline-block text-[10px] font-mono font-bold px-1.5 py-0.2 bg-gold border border-charcoal text-charcoal"
            >
              AGRITECH 2026
            </span>
          </div>
        </div>

        {/* Language switcher & Live Demo CTA */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Segmented Bauhaus Language Toggle with bulletproof contrast */}
          <div className="flex border-2 border-charcoal bg-white shadow-bauhaus-sm">
            <button
              onClick={() => handleLangToggle('en')}
              style={
                language === 'en'
                  ? { backgroundColor: '#14532D', color: '#FFFFFF' }
                  : { backgroundColor: '#FFFFFF', color: '#172016' }
              }
              className={`px-3 py-1 text-xs font-black transition-colors ${
                language === 'en'
                  ? 'bg-forest text-white'
                  : 'text-charcoal hover:bg-gold/30'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => handleLangToggle('hi')}
              style={
                language === 'hi'
                  ? { backgroundColor: '#14532D', color: '#FFFFFF' }
                  : { backgroundColor: '#FFFFFF', color: '#172016' }
              }
              className={`px-3 py-1 text-xs font-black transition-colors border-l-2 border-charcoal ${
                language === 'hi'
                  ? 'bg-forest text-white'
                  : 'text-charcoal hover:bg-gold/30'
              }`}
            >
              हिन्दी
            </button>
          </div>

          <Link
            to="/login"
            className="text-xs font-bold uppercase tracking-wider text-charcoal hover:text-forest px-2 py-1 transition-colors hidden sm:block"
          >
            {t('nav.profile')}
          </Link>

          <Link
            to="/buyer"
            className="btn-bauhaus-primary px-4 py-2 text-xs uppercase tracking-wider flex items-center gap-1.5"
          >
            <span>{t('landing.viewLiveDemo')}</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
          </Link>
        </div>
      </header>

      {/* ========================================================
          2. HERO SECTION: WARM CREAM + BOLD BAUHAUS TYPOGRAPHY
          ======================================================== */}
      <section className="relative pt-12 pb-16 lg:pt-20 lg:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Bold Typography & Slogan */}
          <div className="lg:col-span-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border-2 border-charcoal text-charcoal text-xs font-bold uppercase tracking-wider mb-5 shadow-bauhaus-sm">
              <span
                style={{ backgroundColor: '#14532D' }}
                className="w-2.5 h-2.5 rounded-full bg-forest border border-charcoal"
              ></span>
              <span>{t('landing.heroBadge')}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-charcoal tracking-tight leading-[1.05] uppercase">
              {language === 'hi' ? (
                <>
                  खेत से मांग तक,<br />
                  <span
                    style={{ backgroundColor: '#14532D', color: '#EAB308' }}
                    className="bg-forest text-gold px-2 inline-block mt-1 border-2 border-charcoal shadow-bauhaus-sm"
                  >
                    बुद्धिमानी के साथ।
                  </span>
                </>
              ) : (
                <>
                  FROM FARM<br />
                  <span
                    style={{ backgroundColor: '#14532D', color: '#EAB308' }}
                    className="bg-forest text-gold px-2.5 py-0.5 inline-block mt-1 border-2 border-charcoal shadow-bauhaus-sm"
                  >
                    TO DEMAND.
                  </span>
                </>
              )}
            </h1>

            <p className="mt-5 text-base sm:text-lg text-charcoal font-medium leading-relaxed max-w-xl">
              {language === 'hi'
                ? 'AI आधारित मांग पूर्वानुमान, स्मार्ट समूहन और अनुकूलित मल्टी-पिकअप लॉजिस्टिक्स के साथ भारतीय किसानों को वास्तविक खरीदार मांग से जोड़ें।'
                : 'AI-powered agricultural sourcing that connects farmers with real demand using predictive forecasting, smallholder aggregation, and optimized logistics.'}
            </p>

            {/* Bauhaus Physical Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/buyer/demand"
                className="btn-bauhaus-primary px-6 py-3.5 text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2"
              >
                <span>{t('landing.startProcuring')}</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </Link>

              <Link
                to="/buyer/marketplace"
                className="btn-bauhaus-gold px-6 py-3.5 text-xs sm:text-sm uppercase tracking-wider"
              >
                <span>{t('landing.exploreMarketplace')}</span>
              </Link>

              <Link
                to="/farmer"
                className="px-4 py-3 bg-white hover:bg-cream border-2 border-charcoal shadow-bauhaus-sm text-charcoal font-bold text-xs uppercase tracking-wider transition-transform active:translate-x-[2px] active:translate-y-[2px]"
              >
                {t('landing.farmerLogin')} →
              </Link>
            </div>

            {/* Geometric Credibility Strip */}
            <div className="mt-10 pt-6 border-t-3 border-charcoal flex flex-wrap items-center gap-6 text-xs font-bold uppercase text-charcoal">
              <div className="flex items-center gap-2">
                <span style={{ backgroundColor: '#4D7C0F' }} className="w-3 h-3 bg-crop border border-charcoal"></span>
                <span>{language === 'hi' ? '1,200+ सत्यापित किसान' : '1,200+ Verified Farmers'}</span>
              </div>
              <div className="flex items-center gap-2">
                <span style={{ backgroundColor: '#EAB308' }} className="w-3 h-3 rounded-full bg-gold border border-charcoal"></span>
                <span>{language === 'hi' ? 'शून्य आढ़तिया कटौती' : 'Zero Middleman Markups'}</span>
              </div>
              <div className="flex items-center gap-2">
                <span style={{ backgroundColor: '#92400E' }} className="w-3 h-3 bg-earth border border-charcoal rotate-45"></span>
                <span>{language === 'hi' ? 'UPI एस्क्रो सुरक्षा' : '100% Escrow Settlement'}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Bauhaus Styled Agricultural Carousel */}
          <div className="lg:col-span-6 w-full">
            <HeroCarousel />
          </div>
        </div>
      </section>

      {/* ========================================================
          3. STATISTICS BAR: HARVEST GOLD FULL-WIDTH PANEL
          ======================================================== */}
      <section
        style={{ backgroundColor: '#EAB308' }}
        className="border-y-4 border-charcoal bg-gold py-10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="p-5 bg-white border-3 border-charcoal shadow-bauhaus">
              <span style={{ backgroundColor: '#14532D' }} className="w-3 h-3 rounded-full bg-forest inline-block mb-2 border border-charcoal"></span>
              <p className="text-3xl sm:text-4xl font-black text-charcoal font-mono tracking-tight">+46%</p>
              <p className="text-xs font-black uppercase text-charcoal mt-1">
                {t('impact.farmerPriceImprovement')}
              </p>
              <p className="text-[11px] font-medium text-charcoal/80 mt-1">
                {language === 'hi' ? 'बिचौलियों के बिना सीधी फार्मगेट आय' : 'Direct farmgate net payout'}
              </p>
            </div>

            <div className="p-5 bg-white border-3 border-charcoal shadow-bauhaus">
              <span style={{ backgroundColor: '#4D7C0F' }} className="w-3 h-3 bg-crop inline-block mb-2 border border-charcoal"></span>
              <p className="text-3xl sm:text-4xl font-black text-charcoal font-mono tracking-tight">-10%</p>
              <p className="text-xs font-black uppercase text-charcoal mt-1">
                {t('impact.buyerCostReduction')}
              </p>
              <p className="text-[11px] font-medium text-charcoal/80 mt-1">
                {language === 'hi' ? 'थोक खरीद पर संस्थागत बचत' : 'Institutional volume savings'}
              </p>
            </div>

            <div className="p-5 bg-white border-3 border-charcoal shadow-bauhaus">
              <span style={{ backgroundColor: '#92400E' }} className="w-3 h-3 bg-earth inline-block mb-2 border border-charcoal rotate-45"></span>
              <p className="text-3xl sm:text-4xl font-black text-charcoal font-mono tracking-tight">-31%</p>
              <p className="text-xs font-black uppercase text-charcoal mt-1">
                {t('impact.logisticsDistance')}
              </p>
              <p className="text-[11px] font-medium text-charcoal/80 mt-1">
                {language === 'hi' ? 'मल्टी-स्टॉप क्लस्टर रूटिंग' : 'Clustered pickup distance reduction'}
              </p>
            </div>

            <div className="p-5 bg-white border-3 border-charcoal shadow-bauhaus">
              <span style={{ backgroundColor: '#14532D' }} className="w-3 h-3 rounded-full bg-forest inline-block mb-2 border border-charcoal"></span>
              <p className="text-3xl sm:text-4xl font-black text-charcoal font-mono tracking-tight">94%</p>
              <p className="text-xs font-black uppercase text-charcoal mt-1">
                {t('impact.supplyFulfillment')}
              </p>
              <p className="text-[11px] font-medium text-charcoal/80 mt-1">
                {language === 'hi' ? 'सटीक ऑन-टाइम मांग पूर्ति' : 'On-time contract fulfillment index'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          4. HOW IT WORKS: SOFT SAGE COLOR BLOCK
          ======================================================== */}
      <section
        style={{ backgroundColor: '#DDE7D8', color: '#172016' }}
        className="bg-sage text-charcoal py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b-4 border-charcoal"
      >
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-12">
            <span
              style={{ backgroundColor: '#14532D', color: '#FFFFFF' }}
              className="inline-block px-2.5 py-1 bg-forest text-white text-xs font-black uppercase tracking-wider border-2 border-charcoal shadow-bauhaus-sm mb-3"
            >
              {language === 'hi' ? 'कार्यप्रणाली' : 'SYSTEM ARCHITECTURE'}
            </span>
            <h2
              style={{ color: '#172016' }}
              className="text-3xl sm:text-4xl font-black text-charcoal tracking-tight uppercase"
            >
              {t('landing.keyMetricsHeading')}
            </h2>
            <p
              style={{ color: 'rgba(23, 32, 22, 0.85)' }}
              className="text-sm text-charcoal/80 mt-2 font-medium"
            >
              {language === 'hi'
                ? 'मांग पूर्वानुमान से लेकर अंतिम किसान भुगतान तक का व्यवस्थित एवं कुशल तंत्र।'
                : 'An end-to-end network connecting fragmented Indian agriculture with institutional procurement.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {narrativeSteps.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className="p-6 bg-white text-charcoal border-3 border-charcoal shadow-bauhaus-lg flex flex-col justify-between space-y-4"
                >
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b-2 border-charcoal">
                      <div
                        style={{ backgroundColor: '#EAB308', color: '#172016' }}
                        className="w-10 h-10 bg-gold border-2 border-charcoal flex items-center justify-center text-charcoal shadow-bauhaus-sm"
                      >
                        <Icon className="w-5 h-5 stroke-[2.5]" />
                      </div>
                      <span
                        style={{ color: '#14532D' }}
                        className="font-mono font-black text-sm text-forest"
                      >
                        {item.step}
                      </span>
                    </div>

                    <h3 className="text-base font-black text-charcoal uppercase tracking-tight mt-4">
                      {item.title}
                    </h3>
                    <p className="text-xs text-charcoal/80 mt-2 font-medium leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-charcoal/20 flex items-center gap-1.5 text-[11px] font-bold text-forest">
                    <span>STAGE {item.step} COMPLETE</span>
                    <span style={{ color: '#4D7C0F' }}>■</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================
          4A. CHOOSE HOW YOU SOURCE (SECTION 21)
          ======================================================== */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b-4 border-charcoal">
        <div className="max-w-2xl mb-10 text-left">
          <span
            style={{ backgroundColor: '#14532D', color: '#FFFFFF' }}
            className="inline-block px-2.5 py-1 bg-forest text-white text-xs font-black uppercase tracking-wider border-2 border-charcoal shadow-bauhaus-sm mb-3"
          >
            {language === 'hi' ? 'खरीद विकल्प' : 'BUYER SOURCING ARCHITECTURE'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-charcoal uppercase tracking-tight">
            {language === 'hi' ? 'चुनें कि आप कैसे स्रोत करते हैं' : 'CHOOSE HOW YOU SOURCE'}
          </h2>
          <p className="text-sm text-charcoal/80 mt-2 font-medium">
            {language === 'hi'
              ? 'कृषिप्रवाह लचीलापन प्रदान करता है: व्यक्तिगत उत्पादक चुनें या हमारे इंटेलिजेंट मैचिंग इंजन को पूर्ण आपूर्ति बैच तैयार करने दें।'
              : 'KrishiFlow empowers enterprise buyers with two distinct, transparent procurement modes.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Direct Farmer Card */}
          <div className="p-6 bg-white border-4 border-charcoal shadow-bauhaus-lg flex flex-col justify-between space-y-5">
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-3 border-b-2 border-charcoal">
                <span className="text-xs font-black uppercase tracking-wider text-charcoal flex items-center gap-2">
                  <span style={{ backgroundColor: '#14532D' }} className="w-3 h-3 rounded-full bg-forest inline-block border border-charcoal"></span>
                  {language === 'hi' ? 'प्रत्यक्ष किसान' : 'DIRECT FARMER'}
                </span>
                <span className="text-[10px] font-mono font-bold bg-cream px-2 py-0.5 border border-charcoal">
                  1:1 TRADE
                </span>
              </div>

              <h3 className="text-xl font-black text-charcoal uppercase">
                {language === 'hi' ? 'उत्पादक से सीधी खरीद' : 'Direct Producer Sourcing'}
              </h3>
              <p className="text-xs sm:text-sm text-charcoal/80 font-medium leading-relaxed">
                {language === 'hi'
                  ? 'सत्यापित व्यक्तिगत उत्पादकों को स्वयं चुनें और सीधे फार्मगेट मूल्य पर खरीद करें।'
                  : 'Select and purchase directly from verified producers. Full visibility into individual farm gate economics and quality.'}
              </p>

              {/* Visual Diagram */}
              <div className="p-4 bg-cream border-2 border-charcoal font-mono text-xs font-bold space-y-2">
                <span className="text-[10px] text-charcoal/60 uppercase font-sans block">Sourcing Topology:</span>
                <div className="flex items-center justify-center gap-3 py-2 bg-white border border-charcoal shadow-bauhaus-sm">
                  <span className="px-2.5 py-1 bg-forest text-white text-[11px]">Farmer</span>
                  <span className="text-charcoal font-black">────────►</span>
                  <span className="px-2.5 py-1 bg-gold text-charcoal text-[11px]">Buyer</span>
                </div>
              </div>
            </div>

            <Link
              to="/buyer/marketplace"
              state={{ sourcingMode: 'direct' }}
              className="btn-bauhaus-primary py-3 text-xs uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <span>{language === 'hi' ? 'सीधे किसान ब्राउज़ करें →' : 'BROWSE VERIFIED FARMERS →'}</span>
            </Link>
          </div>

          {/* Smart Matching Card */}
          <div className="p-6 bg-white border-4 border-charcoal shadow-bauhaus-lg flex flex-col justify-between space-y-5">
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-3 border-b-2 border-charcoal">
                <span className="text-xs font-black uppercase tracking-wider text-charcoal flex items-center gap-2">
                  <span style={{ backgroundColor: '#EAB308' }} className="w-3 h-3 bg-gold inline-block border border-charcoal"></span>
                  {language === 'hi' ? 'स्मार्ट मिलान' : 'SMART MATCHING'}
                </span>
                <span
                  style={{ backgroundColor: '#EAB308', color: '#172016' }}
                  className="text-[10px] font-mono font-black px-2 py-0.5 border border-charcoal"
                >
                  ALGORITHMIC CLUSTER
                </span>
              </div>

              <h3 className="text-xl font-black text-charcoal uppercase">
                {language === 'hi' ? 'मल्टी-उत्पादक समूहन' : 'Optimized Multi-Supplier Aggregation'}
              </h3>
              <p className="text-xs sm:text-sm text-charcoal/80 font-medium leading-relaxed">
                {language === 'hi'
                  ? 'कृषिप्रवाह को बड़ी आवश्यकताओं को पूरा करने के लिए कई उत्पादकों की आपूर्ति को संयोजित करने दें।'
                  : 'Let KrishiFlow combine supply from multiple producers to fulfill larger requirements with unified logistics and 10% lower landed costs.'}
              </p>

              {/* Visual Diagram */}
              <div className="p-4 bg-cream border-2 border-charcoal font-mono text-xs font-bold space-y-2">
                <span className="text-[10px] text-charcoal/60 uppercase font-sans block">Sourcing Topology:</span>
                <div className="flex items-center justify-center gap-2 py-2 bg-white border border-charcoal shadow-bauhaus-sm text-[10px]">
                  <div className="flex flex-col gap-1 text-right">
                    <span className="px-1.5 py-0.5 bg-forest text-white">Farmer A</span>
                    <span className="px-1.5 py-0.5 bg-forest text-white">Farmer B</span>
                    <span className="px-1.5 py-0.5 bg-forest text-white">Farmer C</span>
                  </div>
                  <span className="text-charcoal font-mono font-bold leading-none text-base">─┼►</span>
                  <div className="px-2 py-1 bg-gold text-charcoal font-black border border-charcoal">
                    KrishiFlow
                  </div>
                  <span className="text-charcoal font-mono font-bold leading-none text-base">─►</span>
                  <span className="px-2 py-1 bg-charcoal text-white font-bold">Buyer</span>
                </div>
              </div>
            </div>

            <Link
              to="/buyer/marketplace"
              state={{ sourcingMode: 'smart' }}
              className="btn-bauhaus-gold py-3 text-xs uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <span>{language === 'hi' ? 'स्मार्ट मिलान आज़माएं →' : 'EXPLORE THE MARKETPLACE →'}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================
          4B. THE IMPACT OF DIRECT AGRICULTURAL TRADE (SECTION 4)
          Large Bauhaus-style impact cards
          ======================================================== */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b-4 border-charcoal">
        <div className="max-w-3xl mb-12 text-left">
          <span
            style={{ backgroundColor: '#14532D', color: '#FFFFFF' }}
            className="inline-block px-2.5 py-1 bg-forest text-white text-xs font-black uppercase tracking-wider border-2 border-charcoal shadow-bauhaus-sm mb-3"
          >
            {language === 'hi' ? 'प्लेटफ़ॉर्म प्रभाव' : 'WHAT KRISHIFLOW CHANGES'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-charcoal uppercase tracking-tight">
            {language === 'hi' ? 'प्रत्यक्ष कृषि व्यापार का वास्तविक प्रभाव' : 'THE IMPACT OF DIRECT AGRICULTURAL TRADE'}
          </h2>
          <p className="text-sm sm:text-base text-charcoal/85 mt-2 font-medium leading-relaxed">
            {language === 'hi'
              ? 'कृषिप्रवाह बिखरी हुई कृषि आपूर्ति को वास्तविक खरीदार मांग से जोड़ता है — अनावश्यक मध्यस्थ स्तरों को कम करते हुए मूल्य पारदर्शिता और लॉजिस्टिक्स दक्षता में सुधार करता है।'
              : 'KrishiFlow connects fragmented farm supply with real buyer demand — reducing unnecessary intermediary layers while improving price transparency and logistics efficiency.'}
          </p>
        </div>

        {/* 4 Bauhaus Impact Cards with Exact Colors & Numbers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Forest Green */}
          <div
            style={{ backgroundColor: '#14532D', color: '#FFFFFF' }}
            className="p-6 border-4 border-charcoal shadow-bauhaus-lg flex flex-col justify-between space-y-4 text-left"
          >
            <div>
              <div className="flex items-center justify-between pb-3 border-b-2 border-white/20">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-gold">CARD 01</span>
                <span className="w-3 h-3 rounded-full bg-gold border border-charcoal"></span>
              </div>
              <p style={{ color: '#EAB308' }} className="text-4xl sm:text-5xl font-black font-mono tracking-tight mt-3">
                +46.6%
              </p>
              <h3 className="text-sm font-black uppercase tracking-wider text-white mt-1">
                {language === 'hi' ? 'किसान शुद्ध आय' : 'FARMER REALIZATION'}
              </h3>
              <p className="text-xs text-white/80 font-medium mt-1">
                {language === 'hi' ? 'किसान शुद्ध आय में उदाहरणात्मक वृद्धि' : 'Illustrative increase in farmer net realization'}
              </p>
            </div>

            <div className="pt-3 border-t-2 border-white/20">
              <span
                style={{ backgroundColor: '#EAB308', color: '#172016' }}
                className="inline-block text-xs font-mono font-black px-2 py-0.5 border border-charcoal shadow-bauhaus-sm"
              >
                ₹15/kg → ₹22/kg
              </span>
            </div>
          </div>

          {/* Card 2: Harvest Yellow */}
          <div
            style={{ backgroundColor: '#EAB308', color: '#172016' }}
            className="p-6 border-4 border-charcoal shadow-bauhaus-lg flex flex-col justify-between space-y-4 text-left"
          >
            <div>
              <div className="flex items-center justify-between pb-3 border-b-2 border-charcoal/20">
                <span className="text-[10px] font-mono font-black uppercase tracking-wider text-charcoal">CARD 02</span>
                <span className="w-3 h-3 bg-forest border border-charcoal"></span>
              </div>
              <p className="text-4xl sm:text-5xl font-black font-mono tracking-tight text-charcoal mt-3">
                -10%
              </p>
              <h3 className="text-sm font-black uppercase tracking-wider text-charcoal mt-1">
                {language === 'hi' ? 'खरीदार खरीद लागत' : 'BUYER PROCUREMENT COST'}
              </h3>
              <p className="text-xs text-charcoal/80 font-medium mt-1">
                {language === 'hi' ? 'कुल लैंडेड खरीद लागत में उदाहरणात्मक कमी' : 'Illustrative reduction in landed procurement cost'}
              </p>
            </div>

            <div className="pt-3 border-t-2 border-charcoal/20">
              <span className="inline-block text-xs font-mono font-black px-2 py-0.5 bg-white text-charcoal border border-charcoal shadow-bauhaus-sm">
                ₹30/kg → ₹27/kg
              </span>
            </div>
          </div>

          {/* Card 3: Crop Green */}
          <div
            style={{ backgroundColor: '#4D7C0F', color: '#FFFFFF' }}
            className="p-6 border-4 border-charcoal shadow-bauhaus-lg flex flex-col justify-between space-y-4 text-left"
          >
            <div>
              <div className="flex items-center justify-between pb-3 border-b-2 border-white/20">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cream">CARD 03</span>
                <span className="w-3 h-3 bg-earth border border-charcoal rotate-45"></span>
              </div>
              <p className="text-4xl sm:text-5xl font-black font-mono tracking-tight text-white mt-3">
                18%
              </p>
              <h3 className="text-sm font-black uppercase tracking-wider text-white mt-1">
                {language === 'hi' ? 'मार्ग दूरी बचत' : 'ROUTE DISTANCE SAVED'}
              </h3>
              <p className="text-xs text-white/80 font-medium mt-1">
                {language === 'hi' ? 'उदाहरणात्मक लॉजिस्टिक्स अनुकूलन' : 'Illustrative logistics optimization'}
              </p>
            </div>

            <div className="pt-3 border-t-2 border-white/20">
              <span className="inline-block text-xs font-mono font-bold px-2 py-0.5 bg-white text-charcoal border border-charcoal shadow-bauhaus-sm">
                Traditional route → optimized route
              </span>
            </div>
          </div>

          {/* Card 4: Earth / Green Accent */}
          <div
            style={{ backgroundColor: '#F7F4EA', color: '#172016' }}
            className="p-6 border-4 border-charcoal shadow-bauhaus-lg flex flex-col justify-between space-y-4 text-left"
          >
            <div>
              <div className="flex items-center justify-between pb-3 border-b-2 border-charcoal/20">
                <span className="text-[10px] font-mono font-black uppercase tracking-wider text-forest">CARD 04</span>
                <span style={{ backgroundColor: '#92400E' }} className="w-3 h-3 bg-earth border border-charcoal"></span>
              </div>
              <p style={{ color: '#14532D' }} className="text-4xl sm:text-5xl font-black font-mono tracking-tight mt-3">
                94%
              </p>
              <h3 className="text-sm font-black uppercase tracking-wider text-charcoal mt-1">
                {language === 'hi' ? 'मिलान विश्वसनीयता' : 'MATCH CONFIDENCE'}
              </h3>
              <p className="text-xs text-charcoal/80 font-medium mt-1">
                {language === 'hi' ? 'सत्यापित आपूर्तिकर्ता मिलान विश्वास स्तर' : 'Example supplier matching confidence'}
              </p>
            </div>

            <div className="pt-3 border-t-2 border-charcoal/20">
              <span className="inline-block text-xs font-mono font-bold px-2 py-0.5 bg-white text-charcoal border border-charcoal shadow-bauhaus-sm">
                500 kg requirement → 500 kg fulfilled
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          4C. HOME PAGE IMPACT STORY: BEFORE / AFTER (SECTION 5)
          ======================================================== */}
      <section
        style={{ backgroundColor: '#DDE7D8' }}
        className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b-4 border-charcoal text-charcoal"
      >
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <div>
              <span
                style={{ backgroundColor: '#14532D', color: '#FFFFFF' }}
                className="inline-block px-2.5 py-1 bg-forest text-white text-xs font-black uppercase tracking-wider border-2 border-charcoal shadow-bauhaus-sm mb-2"
              >
                DISINTERMEDIATION ARCHITECTURE
              </span>
              <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-charcoal">
                {language === 'hi' ? 'बिखरी आपूर्ति से सीधा जुड़ाव' : 'FROM FRAGMENTED SUPPLY TO DIRECT CONNECTION'}
              </h2>
            </div>

            <span className="text-xs font-mono font-bold text-charcoal bg-white border-2 border-charcoal px-3 py-1 shadow-bauhaus-sm self-start sm:self-auto">
              Illustrative prototype economics
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* TRADITIONAL CHAIN */}
            <div className="p-6 bg-white border-4 border-charcoal shadow-bauhaus-lg space-y-5 text-left">
              <div className="pb-3 border-b-3 border-charcoal flex items-baseline justify-between">
                <div>
                  <span style={{ color: '#92400E' }} className="text-xs font-black uppercase tracking-wider block">
                    TRADITIONAL SUPPLY CHAIN
                  </span>
                  <span className="text-xs text-charcoal/60 font-bold">Multiple opaque intermediary layers</span>
                </div>
                <span className="text-xs font-mono font-bold bg-cream px-2 py-0.5 border border-charcoal">5 Layers</span>
              </div>

              {/* Vertical flow */}
              <div className="space-y-2 text-xs font-mono font-bold max-w-sm mx-auto">
                <div className="p-2.5 bg-cream border-2 border-charcoal text-center">Farmer</div>
                <div className="text-center text-charcoal/60 text-sm font-bold">↓</div>
                <div className="p-2.5 bg-cream border-2 border-charcoal text-center text-earth">Intermediary (Dalal)</div>
                <div className="text-center text-charcoal/60 text-sm font-bold">↓</div>
                <div className="p-2.5 bg-cream border-2 border-charcoal text-center text-earth">Trader / Commission Agent</div>
                <div className="text-center text-charcoal/60 text-sm font-bold">↓</div>
                <div className="p-2.5 bg-cream border-2 border-charcoal text-center">Uncoordinated Logistics</div>
                <div className="text-center text-charcoal/60 text-sm font-bold">↓</div>
                <div className="p-2.5 bg-cream border-2 border-charcoal text-center">Buyer</div>
              </div>

              {/* Economics Summary */}
              <div className="p-4 bg-cream border-2 border-charcoal space-y-2 text-xs font-mono">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-charcoal font-sans">Farmer realization:</span>
                  <span className="font-black text-earth text-sm">₹15/kg</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-charcoal font-sans">Buyer landed cost:</span>
                  <span className="font-black text-earth text-sm">₹30/kg</span>
                </div>
                <div className="pt-2 border-t border-charcoal/20 text-[11px] text-charcoal/70 font-sans font-medium">
                  Result: Opaque pricing, delayed settlements, high post-harvest loss.
                </div>
              </div>
            </div>

            {/* KRISHIFLOW AI DIRECT CHAIN */}
            <div className="p-6 bg-white border-4 border-charcoal shadow-bauhaus-lg space-y-5 text-left">
              <div className="pb-3 border-b-3 border-charcoal flex items-baseline justify-between">
                <div>
                  <span style={{ color: '#14532D' }} className="text-xs font-black uppercase tracking-wider block">
                    KRISHIFLOW AI CONNECTION
                  </span>
                  <span className="text-xs text-charcoal/60 font-bold">Logistics optimized separately</span>
                </div>
                <span
                  style={{ backgroundColor: '#14532D', color: '#FFFFFF' }}
                  className="text-xs font-mono font-black px-2 py-0.5 border border-charcoal"
                >
                  DIRECT
                </span>
              </div>

              {/* Vertical flow */}
              <div className="space-y-2 text-xs font-mono font-bold max-w-sm mx-auto">
                <div
                  style={{ backgroundColor: '#14532D', color: '#FFFFFF' }}
                  className="p-2.5 border-2 border-charcoal text-center shadow-bauhaus-sm"
                >
                  Farmer (Verified Producer)
                </div>
                <div className="text-center text-forest text-sm font-black">↓</div>
                <div
                  style={{ backgroundColor: '#EAB308', color: '#172016' }}
                  className="p-3 border-2 border-charcoal text-center font-black shadow-bauhaus-sm"
                >
                  KrishiFlow AI (Matching & Quality)
                </div>
                <div className="text-center text-forest text-sm font-black">↓</div>
                <div className="p-2.5 bg-charcoal text-white border-2 border-charcoal text-center">
                  Enterprise Buyer
                </div>
                <p className="text-[10px] text-charcoal/60 text-center font-mono pt-1">
                  (Multi-stop reefer logistics coordinated dynamically)
                </p>
              </div>

              {/* Economics Summary */}
              <div
                style={{ backgroundColor: '#DDE7D8' }}
                className="p-4 border-2 border-charcoal space-y-2 text-xs font-mono shadow-bauhaus-sm"
              >
                <div className="flex justify-between items-center">
                  <span className="font-bold text-charcoal font-sans">Farmer realization:</span>
                  <span style={{ color: '#14532D' }} className="font-black text-forest text-base">
                    ₹22/kg (+46.6%)
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-charcoal font-sans">Buyer landed cost:</span>
                  <span style={{ color: '#14532D' }} className="font-black text-forest text-base">
                    ₹27/kg (-10%)
                  </span>
                </div>
                <div className="pt-2 border-t border-charcoal/20 text-[11px] text-charcoal font-sans font-medium">
                  Result: Fair farmgate payout, guaranteed quality, zero middlemen commissions.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          4D. REAL DEMO IMPACT: ONE PROCUREMENT. THREE FARMERS. (SECTION 6)
          ======================================================== */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b-4 border-charcoal">
        <div className="p-8 bg-white border-4 border-charcoal shadow-bauhaus-lg space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b-3 border-charcoal">
            <div>
              <span
                style={{ backgroundColor: '#EAB308', color: '#172016' }}
                className="text-[10px] font-mono font-black uppercase px-2.5 py-0.5 border border-charcoal inline-block mb-2 shadow-bauhaus-sm"
              >
                LIVE BENCHMARK SCENARIO
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-charcoal uppercase tracking-tight">
                ONE PROCUREMENT. THREE FARMERS. ZERO GUESSWORK.
              </h2>
              <p className="text-xs sm:text-sm text-charcoal/80 font-medium mt-1">
                {language === 'hi'
                  ? 'देखें कि कैसे कृषिप्रवाह 3 छोटे किसानों को जोड़कर 500 किग्रा की थोक आवश्यकता को पारदर्शी ढंग से पूरा करता है।'
                  : 'How KrishiFlow aggregates smallholders to fulfill a 500 kg institutional tomato order seamlessly.'}
              </p>
            </div>

            <div className="p-3 bg-cream border-2 border-charcoal text-right font-mono text-xs">
              <span className="text-[10px] font-sans font-bold text-charcoal/60 uppercase block">Buyer Requirement</span>
              <span className="text-xl font-black text-charcoal">500 kg Tomato</span>
            </div>
          </div>

          {/* 3 Matched Farmers Breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-cream border-2 border-charcoal shadow-bauhaus-sm space-y-2">
              <div className="flex justify-between items-start">
                <span className="font-black text-sm uppercase text-charcoal">Ramesh Kumar</span>
                <span className="text-[10px] font-mono font-bold bg-white px-1.5 py-0.2 border border-charcoal">Dadri</span>
              </div>
              <p className="text-2xl font-black font-mono text-forest">250 kg</p>
              <p className="text-xs text-charcoal/70 font-mono">₹22/kg • 6.8 km away</p>
            </div>

            <div className="p-4 bg-cream border-2 border-charcoal shadow-bauhaus-sm space-y-2">
              <div className="flex justify-between items-start">
                <span className="font-black text-sm uppercase text-charcoal">Sita Devi</span>
                <span className="text-[10px] font-mono font-bold bg-white px-1.5 py-0.2 border border-charcoal">Jewar</span>
              </div>
              <p className="text-2xl font-black font-mono text-forest">150 kg</p>
              <p className="text-xs text-charcoal/70 font-mono">₹21.50/kg • 9.2 km away</p>
            </div>

            <div className="p-4 bg-cream border-2 border-charcoal shadow-bauhaus-sm space-y-2">
              <div className="flex justify-between items-start">
                <span className="font-black text-sm uppercase text-charcoal">Rajesh Yadav</span>
                <span className="text-[10px] font-mono font-bold bg-white px-1.5 py-0.2 border border-charcoal">Gr. Noida</span>
              </div>
              <p className="text-2xl font-black font-mono text-forest">100 kg</p>
              <p className="text-xs text-charcoal/70 font-mono">₹22/kg • 11.4 km away</p>
            </div>
          </div>

          {/* Aggregated Outcome Strip */}
          <div className="p-5 bg-gold border-3 border-charcoal shadow-bauhaus grid grid-cols-2 md:grid-cols-5 gap-4 text-xs font-mono text-center">
            <div>
              <span className="text-[10px] font-sans font-bold uppercase block text-charcoal/70">Total Fulfilled</span>
              <span className="text-lg font-black text-charcoal block mt-0.5">500 kg (100%)</span>
            </div>
            <div>
              <span className="text-[10px] font-sans font-bold uppercase block text-charcoal/70">Farmer Realization</span>
              <span style={{ color: '#14532D' }} className="text-lg font-black block mt-0.5">₹22/kg</span>
            </div>
            <div>
              <span className="text-[10px] font-sans font-bold uppercase block text-charcoal/70">Buyer Landed Cost</span>
              <span className="text-lg font-black text-charcoal block mt-0.5">₹27/kg</span>
            </div>
            <div>
              <span className="text-[10px] font-sans font-bold uppercase block text-charcoal/70">Optimized Route</span>
              <span className="text-lg font-black text-charcoal block mt-0.5">41.8 km (-18%)</span>
            </div>
            <div className="col-span-2 md:col-span-1">
              <span className="text-[10px] font-sans font-bold uppercase block text-charcoal/70">Match Confidence</span>
              <span style={{ color: '#14532D' }} className="text-lg font-black block mt-0.5">94%</span>
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <span className="text-xs font-bold text-charcoal/70">
              {language === 'hi' ? 'वास्तविक बाज़ार में यह कैसे काम करता है, स्वयं अनुभव करें:' : 'Experience how this works in real procurement:'}
            </span>
            <Link
              to="/buyer/marketplace"
              state={{ sourcingMode: 'smart' }}
              className="btn-bauhaus-primary px-6 py-3 text-xs uppercase tracking-wider flex items-center gap-2"
            >
              <span>SEE HOW KRISHIFLOW WORKS →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================
          5. LOGISTICS & DISPATCH: WARM CREAM COLOR BLOCK
          ======================================================== */}
      <section
        style={{ backgroundColor: '#F7F4EA' }}
        className="bg-cream py-16 px-4 sm:px-6 lg:px-8 border-b-4 border-charcoal"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-4 text-left">
              <span
                style={{ backgroundColor: '#14532D', color: '#FFFFFF' }}
                className="inline-block px-2.5 py-1 bg-forest text-white text-xs font-black uppercase tracking-wider border-2 border-charcoal shadow-bauhaus-sm"
              >
                DYNAMIC ROUTING
              </span>
              <h2 className="text-3xl font-black text-charcoal uppercase tracking-tight">
                {language === 'hi' ? 'मल्टी-स्टॉप क्लस्टर पिकअप' : 'Clustered Farmgate Logistics'}
              </h2>
              <p className="text-xs sm:text-sm text-charcoal/90 font-medium leading-relaxed">
                {language === 'hi'
                  ? 'व्यक्तिगत रूप से छोटी उपज लाने के बजाय, किसानगार्ड का डायनामिक रूटिंग इंजन एक ही इलेक्ट्रिक रेफ़र वाहन में आसपास के 3-4 खेतों से संकलन करता है।'
                  : 'Instead of uncoordinated individual trips, KisanGuard coordinates a single multi-stop run across adjacent smallholders with active cold-chain monitoring.'}
              </p>

              <div className="pt-2">
                <Link
                  to="/logistics"
                  className="btn-bauhaus-primary inline-flex items-center gap-2 px-5 py-2.5 text-xs uppercase"
                >
                  <span>{t('nav.logistics')}</span>
                  <ArrowRight className="w-4 h-4 stroke-[3]" />
                </Link>
              </div>
            </div>

            {/* Abstract Bauhaus Route Diagram */}
            <div className="lg:col-span-7 bg-white p-6 border-4 border-charcoal shadow-bauhaus-lg">
              <div className="flex items-center justify-between pb-3 border-b-2 border-charcoal text-xs font-mono font-bold">
                <span>ROUTE #KF-DADRI-903</span>
                <span
                  style={{ backgroundColor: '#EAB308', color: '#172016' }}
                  className="bg-gold px-2 py-0.5 border border-charcoal"
                >
                  42 KM TOTAL (-31%)
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mt-4 text-xs font-bold">
                <div className="p-3 bg-cream border-2 border-charcoal text-center">
                  <div
                    style={{ backgroundColor: '#14532D', color: '#FFFFFF' }}
                    className="w-6 h-6 rounded-full bg-forest text-white flex items-center justify-center mx-auto mb-1 text-[11px] font-mono border border-charcoal"
                  >
                    1
                  </div>
                  <p className="text-charcoal uppercase text-[11px]">Ramesh Kumar</p>
                  <p style={{ color: '#14532D' }} className="text-[10px] font-mono">250 kg • Dadri</p>
                </div>

                <div className="p-3 bg-cream border-2 border-charcoal text-center">
                  <div
                    style={{ backgroundColor: '#14532D', color: '#FFFFFF' }}
                    className="w-6 h-6 rounded-full bg-forest text-white flex items-center justify-center mx-auto mb-1 text-[11px] font-mono border border-charcoal"
                  >
                    2
                  </div>
                  <p className="text-charcoal uppercase text-[11px]">Sita Devi</p>
                  <p style={{ color: '#14532D' }} className="text-[10px] font-mono">150 kg • Rural Hub</p>
                </div>

                <div className="p-3 bg-cream border-2 border-charcoal text-center">
                  <div
                    style={{ backgroundColor: '#92400E', color: '#FFFFFF' }}
                    className="w-6 h-6 bg-earth text-white flex items-center justify-center mx-auto mb-1 text-[11px] font-mono border border-charcoal"
                  >
                    3
                  </div>
                  <p className="text-charcoal uppercase text-[11px]">Green Valley FPO</p>
                  <p style={{ color: '#14532D' }} className="text-[10px] font-mono">100 kg • Gate Node</p>
                </div>

                <div
                  style={{ backgroundColor: '#EAB308', color: '#172016' }}
                  className="p-3 bg-gold border-2 border-charcoal text-center shadow-bauhaus-sm"
                >
                  <div
                    style={{ backgroundColor: '#172016', color: '#FFFFFF' }}
                    className="w-6 h-6 bg-charcoal text-white flex items-center justify-center mx-auto mb-1 text-[11px] font-mono border border-charcoal"
                  >
                    ✓
                  </div>
                  <p className="text-charcoal uppercase text-[11px]">FreshBite Hub</p>
                  <p className="text-[10px] text-charcoal font-mono">500 kg Landed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          6. PRICE TRANSPARENCY: WARM CREAM + FOREST GREEN
          ======================================================== */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="max-w-2xl mb-12">
          <span
            style={{ backgroundColor: '#4D7C0F', color: '#FFFFFF' }}
            className="inline-block px-2.5 py-1 bg-crop text-white text-xs font-black uppercase tracking-wider border-2 border-charcoal shadow-bauhaus-sm mb-3"
          >
            FAIR ECONOMICS
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-charcoal uppercase tracking-tight">
            {t('pricing.title')}
          </h2>
          <p className="text-sm text-charcoal/80 mt-2 font-medium">
            {language === 'hi'
              ? 'बिचौलियों की 33% मार्जिन हटाकर किसानों को उचित मूल्य और खरीदारों को बचत।'
              : 'Direct disintermediation: removing opaque arhtiya commissions to uplift farmgate realization.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Traditional Supply Chain Box */}
          <div className="p-6 bg-white border-4 border-charcoal shadow-bauhaus-lg space-y-4">
            <div className="pb-4 border-b-3 border-charcoal flex items-baseline justify-between">
              <div>
                <span style={{ color: '#92400E' }} className="text-xs font-black uppercase tracking-wider">
                  {t('pricing.traditionalTitle')}
                </span>
                <p className="text-xs font-bold text-charcoal/60 mt-0.5">Farmer → Dalali → Intermediary → Buyer</p>
              </div>
              <span style={{ color: '#92400E' }} className="text-2xl font-black font-mono">₹30/kg</span>
            </div>

            <div className="space-y-2 text-xs font-bold">
              <div className="p-3 bg-cream border-2 border-charcoal flex justify-between">
                <span>{t('pricing.farmerReceives')}</span>
                <span className="font-mono">₹15.00/kg (50%)</span>
              </div>
              <div
                style={{ backgroundColor: 'rgba(146, 64, 14, 0.15)', color: '#92400E' }}
                className="p-3 border-2 border-charcoal flex justify-between"
              >
                <span>{t('pricing.intermediaryMargins')}</span>
                <span className="font-mono">₹10.00/kg (33%)</span>
              </div>
              <div className="p-3 bg-cream border-2 border-charcoal flex justify-between">
                <span>{t('pricing.logisticsCost')}</span>
                <span className="font-mono">₹5.00/kg (17%)</span>
              </div>
            </div>

            <p className="text-[11px] font-bold text-charcoal/60 text-center pt-2">
              {language === 'hi' ? 'किसान को केवल 50% मूल्य मिलता है।' : 'Farmer captures only 50% of the procurement rupee.'}
            </p>
          </div>

          {/* KrishiFlow AI Box (Light Soft Sage Background) */}
          <div
            style={{ backgroundColor: '#DDE7D8', color: '#172016' }}
            className="p-6 bg-sage text-charcoal border-4 border-charcoal shadow-bauhaus-lg space-y-4 relative"
          >
            <div className="pb-4 border-b-3 border-charcoal flex items-baseline justify-between">
              <div>
                <span style={{ color: '#14532D' }} className="text-xs font-black uppercase tracking-wider">
                  {t('pricing.krishiflowTitle')}
                </span>
                <p style={{ color: 'rgba(23, 32, 22, 0.75)' }} className="text-xs font-bold mt-0.5">
                  Farmer → KisanGuard → Buyer
                </p>
              </div>
              <span style={{ color: '#14532D' }} className="text-2xl font-black font-mono">₹27/kg</span>
            </div>

            <div className="space-y-2 text-xs font-bold text-charcoal">
              <div
                style={{ backgroundColor: '#EAB308', color: '#172016' }}
                className="p-3 bg-gold border-2 border-charcoal flex justify-between shadow-bauhaus-sm"
              >
                <span>{t('pricing.farmerReceives')} (+46.6%)</span>
                <span className="font-mono font-black">₹22.00/kg (81.5%)</span>
              </div>
              <div className="p-3 bg-white border-2 border-charcoal flex justify-between">
                <span>{t('pricing.logisticsCost')}</span>
                <span className="font-mono">₹3.00/kg (11.1%)</span>
              </div>
              <div className="p-3 bg-white border-2 border-charcoal flex justify-between">
                <span>{t('pricing.platformFee')}</span>
                <span className="font-mono">₹2.00/kg (7.4%)</span>
              </div>
            </div>

            <p style={{ color: '#14532D' }} className="text-[11px] font-black text-center pt-2 uppercase tracking-wide">
              {language === 'hi' ? 'किसान को 81.5% मूल्य सीधा मिलता है!' : 'Farmer captures 81.5% of total procurement spend!'}
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================
          7. FINAL CTA: LIGHT SOFT SAGE FULL WIDTH BLOCK
          ======================================================== */}
      <section
        style={{ backgroundColor: '#DDE7D8', color: '#172016' }}
        className="bg-sage border-y-4 border-charcoal py-14 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <span
              style={{ backgroundColor: '#FFFFFF', color: '#172016' }}
              className="text-xs font-mono font-black uppercase tracking-wider text-charcoal bg-white border-2 border-charcoal px-2.5 py-0.5 shadow-bauhaus-sm inline-block mb-2"
            >
              {t('landing.interactiveFlowTitle')}
            </span>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-charcoal uppercase">
              {language === 'hi' 
                ? '5 मिनट का संपूर्ण लाइव वॉकथ्रू' 
                : 'Experience the 5-Minute Live Procurement Journey'}
            </h3>
            <p className="text-xs sm:text-sm text-charcoal/80 font-medium mt-1 max-w-xl">
              {t('landing.interactiveFlowDesc')}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => navigate('/buyer')}
              className="btn-bauhaus-primary px-5 py-3 text-xs uppercase tracking-wider"
            >
              {language === 'hi' ? 'डेमो शुरू करें (प्रिया - खरीदार)' : 'Launch Demo (Buyer View)'}
            </button>
            <button
              onClick={() => navigate('/farmer')}
              className="btn-bauhaus-white px-4 py-3 text-xs uppercase tracking-wider"
            >
              {language === 'hi' ? 'किसान पोर्टल (रमेश)' : 'Farmer Portal (Ramesh)'}
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================
          8. FOOTER: DEEP CHARCOAL
          ======================================================== */}
      <footer
        style={{ backgroundColor: '#172016', color: '#F7F4EA' }}
        className="bg-charcoal text-cream py-10 px-4 sm:px-8 text-xs"
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-black uppercase text-sm tracking-wider">
            <KisanGuardLogo className="w-6 h-6" />
            <span>{t('brand.name')}</span>
          </div>
          <p style={{ color: 'rgba(247, 244, 234, 0.7)' }} className="text-[11px] font-mono">
            {language === 'hi' 
              ? 'राष्ट्रीय स्तर का कृषि आपूर्ति श्रृंखला प्रोटोटाइप'
              : 'National Agricultural Supply Chain Prototype'}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
