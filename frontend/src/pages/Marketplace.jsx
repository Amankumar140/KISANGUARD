import React, { useState, useMemo, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { useToast } from '../components/common/Toast';
import {
  MapPin,
  Star,
  ArrowRight,
  Check,
  Building2,
  User,
  SlidersHorizontal,
  X,
  ShieldCheck,
  Truck,
  Sparkles,
  ChevronRight,
  RotateCcw,
} from 'lucide-react';
import { MOCK_FARMERS_FULL } from '../data/mockFarmers';

const CROPS_LIST = [
  { id: 'all', nameEn: 'All Crops', nameHi: 'सभी फसलें' },
  { id: 'tomato', nameEn: 'Tomato', nameHi: 'टमाटर' },
  { id: 'potato', nameEn: 'Potato', nameHi: 'आलू' },
  { id: 'onion', nameEn: 'Onion', nameHi: 'प्याज़' },
  { id: 'carrot', nameEn: 'Carrot', nameHi: 'गाजर' },
  { id: 'cauliflower', nameEn: 'Cauliflower', nameHi: 'फूलगोभी' },
  { id: 'wheat', nameEn: 'Wheat', nameHi: 'गेहूं' },
  { id: 'rice', nameEn: 'Basmati Rice', nameHi: 'बासमती चावल' },
];

export const Marketplace = () => {
  const { t, language } = useLanguage();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const isHi = language === 'hi';

  // Sourcing method state: 'direct' or 'smart' (persisted in session)
  const [sourcingMode, setSourcingMode] = useState(() => {
    if (location.state?.sourcingMode) return location.state.sourcingMode;
    try {
      return sessionStorage.getItem('krishiflow_sourcing_mode') || 'direct';
    } catch {
      return 'direct';
    }
  });

  const handleModeChange = (mode) => {
    setSourcingMode(mode);
    try {
      sessionStorage.setItem('krishiflow_sourcing_mode', mode);
    } catch {
      // ignore storage errors
    }
  };

  // Requirement selector state
  const [reqProduct, setReqProduct] = useState(location.state?.demand?.product || 'Tomato');
  const [reqQuantity, setReqQuantity] = useState(location.state?.demand?.quantity || '500');
  const [reqGrade, setReqGrade] = useState(location.state?.demand?.qualityGrade || 'Grade A');
  const [reqDate, setReqDate] = useState(location.state?.demand?.requiredDate || '2026-09-24');

  // Direct mode crop filter
  const [selectedCropFilter, setSelectedCropFilter] = useState('all');

  // Direct buy modal state
  const [activeBuyFarmer, setActiveBuyFarmer] = useState(null);
  const [buyQuantity, setBuyQuantity] = useState(250);

  // View farmer profile modal state
  const [viewFarmer, setViewFarmer] = useState(null);

  // Smart Matching supplier selection state
  // Default selected ids for 500 kg Tomato scenario: Ramesh, Sita, Rajesh
  const [smartSelectedIds, setSmartSelectedIds] = useState(['f1', 'f2', 'f3']);

  // Reset or initialize matching when crop changes
  useEffect(() => {
    if (reqProduct.toLowerCase() === 'tomato') {
      setSmartSelectedIds(['f1', 'f2', 'f3']);
    } else {
      // Find farmers producing this crop
      const matched = MOCK_FARMERS_FULL.filter(f =>
        f.produce.some(p => p.crop.toLowerCase().includes(reqProduct.toLowerCase()) || p.cropId === reqProduct.toLowerCase())
      ).slice(0, 3).map(f => f.id);
      setSmartSelectedIds(matched.length > 0 ? matched : ['f1']);
    }
  }, [reqProduct]);

  // Direct Mode Farmers list: map all farmers with their crop produce
  const directFarmerList = useMemo(() => {
    let list = [];
    MOCK_FARMERS_FULL.forEach(farmer => {
      farmer.produce.forEach(p => {
        list.push({
          id: `${farmer.id}-${p.cropId}`,
          farmerId: farmer.id,
          name: farmer.name,
          nameHi: farmer.nameHi,
          phone: farmer.phone,
          location: farmer.location,
          locationHi: farmer.locationHi,
          district: farmer.district,
          distanceKm: farmer.distanceKm,
          rating: farmer.rating,
          verified: farmer.verified,
          isFpo: farmer.fpoMember || farmer.isFpo,
          crop: p.crop,
          cropHi: p.cropHi,
          cropId: p.cropId,
          availableQtyKg: p.quantityKg,
          pricePerKg: p.pricePerKg,
          grade: p.grade,
          harvestDate: p.harvestDate,
          badges: farmer.badges || [],
        });
      });
    });

    if (selectedCropFilter === 'all') return list;
    return list.filter(item => item.cropId === selectedCropFilter);
  }, [selectedCropFilter]);

  // Smart Matching candidates
  const smartCandidates = useMemo(() => {
    const cropKey = reqProduct.toLowerCase();
    const list = [];
    MOCK_FARMERS_FULL.forEach(farmer => {
      const matchProduce = farmer.produce.find(p =>
        p.crop.toLowerCase().includes(cropKey) || p.cropId === cropKey
      );
      if (matchProduce) {
        list.push({
          id: farmer.id,
          name: farmer.name,
          nameHi: farmer.nameHi,
          role: farmer.fpoMember ? 'FPO Partner' : 'Smallholder Producer',
          roleHi: farmer.fpoMember ? 'FPO भागीदार' : 'सीमांत किसान',
          location: farmer.location,
          locationHi: farmer.locationHi,
          distanceKm: farmer.distanceKm,
          crop: matchProduce.crop,
          cropHi: matchProduce.cropHi,
          grade: matchProduce.grade,
          quantityKg: matchProduce.quantityKg,
          pricePerKg: matchProduce.pricePerKg,
          matchScore: farmer.matchScore || 90,
          isFpo: farmer.fpoMember,
          harvestDate: matchProduce.harvestDate,
        });
      }
    });

    // Sort by demo scenario order for Tomato: Ramesh (f1), Sita (f2), Rajesh (f3), then others
    if (cropKey.includes('tomato')) {
      const priorityOrder = { f1: 1, f2: 2, f3: 3, f8: 4, f6: 5 };
      list.sort((a, b) => (priorityOrder[a.id] || 99) - (priorityOrder[b.id] || 99));
    }
    return list;
  }, [reqProduct]);

  // Smart matching calculations
  const targetReqQty = parseInt(reqQuantity, 10) || 500;
  const smartAllocatedKg = useMemo(() => {
    return smartCandidates
      .filter(s => smartSelectedIds.includes(s.id))
      .reduce((sum, s) => sum + s.quantityKg, 0);
  }, [smartCandidates, smartSelectedIds]);

  const smartBlendedFarmgate = useMemo(() => {
    const selected = smartCandidates.filter(s => smartSelectedIds.includes(s.id));
    if (selected.length === 0 || smartAllocatedKg === 0) return 0;
    const totalCost = selected.reduce((sum, s) => sum + s.quantityKg * s.pricePerKg, 0);
    return (totalCost / smartAllocatedKg).toFixed(2);
  }, [smartCandidates, smartSelectedIds, smartAllocatedKg]);

  // Landed cost calculation (Blended farmgate + ~₹5/kg logistics & platform optimization = ₹27/kg for demo)
  const smartEstimatedLandedCost = useMemo(() => {
    if (reqProduct.toLowerCase() === 'tomato' && targetReqQty === 500) {
      return '27.00';
    }
    const base = parseFloat(smartBlendedFarmgate) || 22;
    return (base + 5.0).toFixed(2);
  }, [reqProduct, targetReqQty, smartBlendedFarmgate]);

  const toggleSmartSelect = (id) => {
    setSmartSelectedIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Direct Buy trigger
  const handleOpenBuyDirect = (farmerItem) => {
    setActiveBuyFarmer(farmerItem);
    setBuyQuantity(farmerItem.availableQtyKg);
  };

  // Confirm direct order & proceed to logistics
  const handleConfirmDirectProcurement = () => {
    if (!activeBuyFarmer) return;
    const totalAmount = buyQuantity * activeBuyFarmer.pricePerKg;

    addToast(
      isHi
        ? `${activeBuyFarmer.nameHi} से ${buyQuantity} किग्रा ${activeBuyFarmer.cropHi} की सीधी खरीद (₹${totalAmount.toLocaleString()})`
        : `Direct order created with ${activeBuyFarmer.name} (${buyQuantity} kg @ ₹${activeBuyFarmer.pricePerKg}/kg = ₹${totalAmount.toLocaleString()})`,
      'success'
    );

    navigate('/logistics', {
      state: {
        sourcingMode: 'direct',
        batch: {
          product: activeBuyFarmer.crop,
          productHi: activeBuyFarmer.cropHi,
          totalQty: buyQuantity,
          blendedPrice: activeBuyFarmer.pricePerKg,
          landedCost: (activeBuyFarmer.pricePerKg + 5).toFixed(2),
          suppliers: [
            {
              id: activeBuyFarmer.farmerId,
              name: activeBuyFarmer.name,
              nameHi: activeBuyFarmer.nameHi,
              location: activeBuyFarmer.location,
              locationHi: activeBuyFarmer.locationHi,
              distanceKm: activeBuyFarmer.distanceKm,
              quantityKg: buyQuantity,
              pricePerKg: activeBuyFarmer.pricePerKg,
              crop: activeBuyFarmer.crop,
              grade: activeBuyFarmer.grade,
            },
          ],
        },
      },
    });
  };

  // Confirm Smart Match & proceed to logistics
  const handleAcceptSmartMatch = () => {
    const selectedSuppliers = smartCandidates.filter(s => smartSelectedIds.includes(s.id));

    addToast(
      isHi
        ? `स्मार्ट मिलान स्वीकृत! ${smartAllocatedKg} किग्रा @ ₹${smartEstimatedLandedCost}/किग्रा लैंडेड लागत`
        : `Smart match accepted! ${smartAllocatedKg} kg aggregated @ ₹${smartEstimatedLandedCost}/kg landed cost`,
      'success'
    );

    navigate('/logistics', {
      state: {
        sourcingMode: 'smart',
        batch: {
          product: reqProduct,
          totalQty: smartAllocatedKg,
          blendedPrice: smartBlendedFarmgate,
          landedCost: smartEstimatedLandedCost,
          matchScore: 94,
          suppliers: selectedSuppliers,
        },
      },
    });
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* ========================================================
          1. HEADER & SOURCING METHOD DECISION (SECTIONS 8, 11, 18)
          ======================================================== */}
      <div className="pb-4 border-b-3 border-charcoal space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 bg-white border-2 border-charcoal text-[10px] font-mono font-black uppercase tracking-wider mb-1 shadow-bauhaus-sm">
              <span style={{ backgroundColor: '#14532D' }} className="w-2 h-2 rounded-full bg-forest"></span>
              <span>{isHi ? 'सत्यापित उत्पादक खरीद' : 'PROCURE DIRECTLY FROM VERIFIED PRODUCERS'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-charcoal uppercase tracking-tight">
              {isHi ? 'खरीदार मार्केटप्लेस' : 'BUYER MARKETPLACE'}
            </h1>
            <p className="text-xs text-charcoal/80 font-medium">
              {isHi
                ? 'निर्णय लें कि आप कैसे स्रोत करना चाहते हैं: व्यक्तिगत किसान चुनें या स्मार्ट मिलान का उपयोग करें।'
                : 'Choose your sourcing method: pick individual verified producers directly or let KrishiFlow combine optimal supply.'}
            </p>
          </div>

          <button
            onClick={() => navigate('/buyer/demand')}
            className="btn-bauhaus-primary px-3.5 py-2 text-xs uppercase tracking-wider self-start sm:self-auto flex items-center gap-1.5"
          >
            <span>+ {isHi ? 'मांग फॉर्म' : 'Procurement Form'}</span>
          </button>
        </div>

        {/* ========================================================
            2. INTERACTIVE SOURCING METHOD TOGGLE (SECTION 8 & 11)
            Thick border, hard shadow, forest green selected, no generic SaaS
            ======================================================== */}
        <div className="p-4 bg-white border-3 border-charcoal shadow-bauhaus space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-charcoal flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-forest stroke-[2.5]" />
              <span>{isHi ? 'आप कैसे स्रोत करना चाहते हैं?' : 'HOW WOULD YOU LIKE TO SOURCE?'}</span>
            </span>
            <span
              style={{ backgroundColor: '#EAB308', color: '#172016' }}
              className="text-[10px] font-mono font-bold px-2 py-0.5 border border-charcoal"
            >
              {isHi ? 'खरीदार का निर्णय' : 'BUYER DECISION'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Direct Farmer Card Option */}
            <button
              type="button"
              onClick={() => handleModeChange('direct')}
              style={
                sourcingMode === 'direct'
                  ? { backgroundColor: '#14532D', color: '#FFFFFF' }
                  : { backgroundColor: '#F7F4EA', color: '#172016' }
              }
              className={`p-4 border-3 border-charcoal text-left transition-all relative ${
                sourcingMode === 'direct'
                  ? 'bg-forest text-white shadow-bauhaus translate-x-[1px] translate-y-[1px]'
                  : 'bg-cream text-charcoal hover:bg-white shadow-bauhaus-sm'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 stroke-[2.5]" />
                    <span className="font-black text-sm uppercase tracking-wide">
                      {isHi ? 'प्रत्यक्ष किसान' : 'DIRECT FARMER'}
                    </span>
                  </div>
                  <p
                    style={{
                      color: sourcingMode === 'direct' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(23, 32, 22, 0.75)',
                    }}
                    className="text-xs font-medium mt-1 leading-snug"
                  >
                    {isHi
                      ? 'मैं उत्पादकों को स्वयं चुनना चाहता हूँ।'
                      : 'I want to choose producers myself'}
                  </p>
                </div>

                <div
                  style={{
                    backgroundColor: sourcingMode === 'direct' ? '#EAB308' : '#FFFFFF',
                    color: '#172016',
                  }}
                  className="w-5 h-5 border-2 border-charcoal flex items-center justify-center font-bold text-xs shrink-0"
                >
                  {sourcingMode === 'direct' && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-charcoal/20 flex items-center justify-between text-[10px] font-mono">
                <span className="font-bold uppercase tracking-wider">
                  {isHi ? 'पारदर्शी फार्मगेट' : '1:1 Direct Procurement'}
                </span>
                <span className="font-bold underline">
                  {isHi ? 'व्यक्तिगत चयन' : 'Manual Selection'}
                </span>
              </div>
            </button>

            {/* Smart Matching Card Option */}
            <button
              type="button"
              onClick={() => handleModeChange('smart')}
              style={
                sourcingMode === 'smart'
                  ? { backgroundColor: '#14532D', color: '#FFFFFF' }
                  : { backgroundColor: '#F7F4EA', color: '#172016' }
              }
              className={`p-4 border-3 border-charcoal text-left transition-all relative ${
                sourcingMode === 'smart'
                  ? 'bg-forest text-white shadow-bauhaus translate-x-[1px] translate-y-[1px]'
                  : 'bg-cream text-charcoal hover:bg-white shadow-bauhaus-sm'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 stroke-[2.5]" />
                    <span className="font-black text-sm uppercase tracking-wide">
                      {isHi ? 'स्मार्ट मिलान' : 'SMART MATCHING'}
                    </span>
                  </div>
                  <p
                    style={{
                      color: sourcingMode === 'smart' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(23, 32, 22, 0.75)',
                    }}
                    className="text-xs font-medium mt-1 leading-snug"
                  >
                    {isHi
                      ? 'सबसे अच्छा आपूर्तिकर्ता संयोजन खोजें।'
                      : 'Find the best supplier combination'}
                  </p>
                </div>

                <div
                  style={{
                    backgroundColor: sourcingMode === 'smart' ? '#EAB308' : '#FFFFFF',
                    color: '#172016',
                  }}
                  className="w-5 h-5 border-2 border-charcoal flex items-center justify-center font-bold text-xs shrink-0"
                >
                  {sourcingMode === 'smart' && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-charcoal/20 flex items-center justify-between text-[10px] font-mono">
                <span className="font-bold uppercase tracking-wider">
                  {isHi ? 'मल्टी-फार्म समूहन' : 'Clustered Aggregation'}
                </span>
                <span className="font-bold text-gold">
                  {isHi ? '94% मिलान स्कोर' : '94% Match Engine'}
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Quick Requirement Parameters Bar (Section 18) */}
        <div className="p-3 bg-cream border-2 border-charcoal flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex flex-wrap items-center gap-4">
            <div>
              <span className="text-charcoal/60 uppercase text-[10px] block font-bold font-sans">
                {isHi ? 'उत्पाद' : 'Product'}
              </span>
              <select
                value={reqProduct}
                onChange={(e) => setReqProduct(e.target.value)}
                className="bg-white border border-charcoal px-2 py-0.5 font-bold font-sans text-xs focus:outline-none"
              >
                <option value="Tomato">{isHi ? 'टमाटर (Tomato)' : 'Tomato'}</option>
                <option value="Potato">{isHi ? 'आलू (Potato)' : 'Potato'}</option>
                <option value="Onion">{isHi ? 'प्याज़ (Onion)' : 'Onion'}</option>
                <option value="Carrot">{isHi ? 'गाजर (Carrot)' : 'Carrot'}</option>
                <option value="Cauliflower">{isHi ? 'फूलगोभी (Cauliflower)' : 'Cauliflower'}</option>
                <option value="Wheat">{isHi ? 'गेहूं (Wheat)' : 'Wheat'}</option>
                <option value="Basmati Rice">{isHi ? 'बासमती चावल (Basmati Rice)' : 'Basmati Rice'}</option>
              </select>
            </div>

            <div>
              <span className="text-charcoal/60 uppercase text-[10px] block font-bold font-sans">
                {isHi ? 'मात्रा' : 'Quantity'}
              </span>
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  value={reqQuantity}
                  onChange={(e) => setReqQuantity(e.target.value)}
                  className="w-20 bg-white border border-charcoal px-2 py-0.5 font-bold text-xs font-mono focus:outline-none"
                />
                <span className="font-bold text-charcoal">kg</span>
              </div>
            </div>

            <div>
              <span className="text-charcoal/60 uppercase text-[10px] block font-bold font-sans">
                {isHi ? 'गुणवत्ता ग्रेड' : 'Quality'}
              </span>
              <span className="bg-white border border-charcoal px-2 py-0.5 font-bold inline-block text-xs">
                {reqGrade}
              </span>
            </div>

            <div>
              <span className="text-charcoal/60 uppercase text-[10px] block font-bold font-sans">
                {isHi ? 'आवश्यक तिथि' : 'Required by'}
              </span>
              <span className="bg-white border border-charcoal px-2 py-0.5 font-bold inline-block text-xs">
                {reqDate}
              </span>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-charcoal/60 uppercase font-sans font-bold block">
              {isHi ? 'वर्तमान मोड' : 'Active Sourcing'}
            </span>
            <span
              style={{
                backgroundColor: sourcingMode === 'direct' ? '#14532D' : '#EAB308',
                color: sourcingMode === 'direct' ? '#FFFFFF' : '#172016',
              }}
              className="text-[10px] font-mono font-black uppercase px-2 py-0.5 border border-charcoal"
            >
              {sourcingMode === 'direct' ? (isHi ? 'प्रत्यक्ष किसान' : 'DIRECT FARMER') : (isHi ? 'स्मार्ट मिलान' : 'SMART MATCHING')}
            </span>
          </div>
        </div>
      </div>

      {/* ========================================================
          3. DIRECT FARMER MODE CONTENT (SECTIONS 9 & 13)
          ======================================================== */}
      {sourcingMode === 'direct' && (
        <div className="space-y-5">
          {/* Section Heading & Crop Filter */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-charcoal uppercase tracking-tight">
                {isHi ? 'प्रत्यक्ष किसान मार्केटप्लेस' : 'DIRECT FARMER MARKETPLACE'}
              </h2>
              <p className="text-xs text-charcoal/80 font-medium">
                {isHi
                  ? 'सत्यापित उत्पादक चुनें और सीधे खरीद करें।'
                  : 'Choose a verified producer and procure directly.'}
              </p>
            </div>

            {/* Crop filter pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              {CROPS_LIST.map((c) => {
                const isActive = selectedCropFilter === c.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCropFilter(c.id)}
                    style={
                      isActive
                        ? { backgroundColor: '#14532D', color: '#FFFFFF' }
                        : { backgroundColor: '#FFFFFF', color: '#172016' }
                    }
                    className={`px-3 py-1 text-xs font-black uppercase tracking-wider border-2 border-charcoal transition-all whitespace-nowrap ${
                      isActive
                        ? 'bg-forest text-white shadow-bauhaus-sm'
                        : 'bg-white text-charcoal hover:bg-gold/40'
                    }`}
                  >
                    {isHi ? c.nameHi : c.nameEn}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Farmer Cards Grid (At least 8-10 farmers) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {directFarmerList.map((farmer) => (
              <div
                key={farmer.id}
                className="p-5 bg-white border-3 border-charcoal shadow-bauhaus flex flex-col justify-between space-y-4 relative"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-black text-charcoal text-base uppercase">
                          {isHi ? farmer.nameHi : farmer.name}
                        </span>
                        <span
                          style={{
                            backgroundColor: farmer.isFpo ? '#EAB308' : '#4D7C0F',
                            color: farmer.isFpo ? '#172016' : '#FFFFFF',
                          }}
                          className="text-[9px] font-mono font-black uppercase px-1.5 py-0.2 border border-charcoal"
                        >
                          {farmer.isFpo ? 'FPO' : (isHi ? 'किसान' : 'FARMER')}
                        </span>
                      </div>
                      <p className="text-xs text-charcoal/70 flex items-center gap-1 mt-0.5 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-charcoal stroke-[2.5]" />
                        <span>{isHi ? farmer.locationHi : farmer.location}</span>
                        <span className="font-mono text-[11px] text-charcoal/60">({farmer.distanceKm} km away)</span>
                      </p>
                    </div>

                    <div
                      style={{ backgroundColor: '#EAB308', color: '#172016' }}
                      className="flex items-center gap-1 text-xs font-mono font-bold text-charcoal bg-gold px-2 py-0.5 border border-charcoal shadow-bauhaus-sm"
                    >
                      <Star className="w-3 h-3 text-charcoal fill-charcoal" />
                      <span>{farmer.rating}</span>
                    </div>
                  </div>

                  {/* Produce specification block */}
                  <div className="p-3 bg-cream border-2 border-charcoal space-y-1.5 text-xs font-mono">
                    <div className="flex items-center justify-between">
                      <span className="text-charcoal/70 font-sans font-bold uppercase text-[10px]">
                        {isHi ? 'फसल' : 'Crop'}
                      </span>
                      <span className="font-sans font-black text-charcoal text-xs">
                        {isHi ? farmer.cropHi : farmer.crop}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-charcoal/70 font-sans font-bold uppercase text-[10px]">
                        {isHi ? 'उपलब्ध मात्रा' : 'Available'}
                      </span>
                      <span className="font-bold text-charcoal">
                        {farmer.availableQtyKg} kg
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-charcoal/70 font-sans font-bold uppercase text-[10px]">
                        {isHi ? 'गुणवत्ता' : 'Quality'}
                      </span>
                      <span className="font-bold text-charcoal">
                        {farmer.grade}
                      </span>
                    </div>
                    <div className="flex items-center justify-between pt-1 border-t border-charcoal/20">
                      <span className="text-charcoal/70 font-sans font-bold uppercase text-[10px]">
                        {isHi ? 'फार्मगेट मूल्य' : 'Farmgate Price'}
                      </span>
                      <span style={{ color: '#14532D' }} className="font-black text-forest text-sm">
                        ₹{farmer.pricePerKg} <span className="text-charcoal/60 text-xs font-normal">/kg</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Direct Action Buttons: [ VIEW FARMER ] and [ BUY DIRECT ] */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-charcoal/10">
                  <button
                    type="button"
                    onClick={() => setViewFarmer(farmer)}
                    className="px-3 py-2 text-xs font-bold uppercase tracking-wider bg-white text-charcoal border-2 border-charcoal hover:bg-cream shadow-bauhaus-sm transition-all"
                  >
                    {isHi ? 'किसान विवरण' : 'VIEW FARMER'}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleOpenBuyDirect(farmer)}
                    className="btn-bauhaus-primary py-2 text-xs uppercase tracking-wider flex items-center justify-center gap-1"
                  >
                    <span>{isHi ? 'सीधा खरीदें' : 'BUY DIRECT'}</span>
                    <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================
          4. SMART MATCHING MODE CONTENT (SECTIONS 10 & 14)
          ======================================================== */}
      {sourcingMode === 'smart' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-charcoal uppercase tracking-tight">
              {isHi ? 'स्मार्ट आपूर्तिकर्ता मिलान' : 'SMART SUPPLIER MATCHING'}
            </h2>
            <p className="text-xs text-charcoal/80 font-medium">
              {isHi
                ? 'कृषिप्रवाह को आपके अनुरोध के लिए सत्यापित उत्पादकों का सर्वोत्तम संयोजन खोजने दें।'
                : 'Let KrishiFlow find the best combination of verified producers for your requirement.'}
            </p>
          </div>

          {/* Aggregated Match Scorecard Banner */}
          <div className="p-5 bg-white border-3 border-charcoal shadow-bauhaus space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b-2 border-charcoal">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase text-charcoal/60 block">
                  {isHi ? 'खरीद आवश्यकता' : 'Procurement Requirement'}
                </span>
                <span className="text-xl sm:text-2xl font-black uppercase text-charcoal font-sans">
                  {targetReqQty} kg {reqProduct} • {reqGrade}
                </span>
                <span className="text-xs font-mono font-bold text-charcoal/70 block mt-0.5">
                  {isHi ? 'आवश्यक तिथि: ' : 'Required: '}{reqDate} • FreshBite Sector 62 Hub, Noida
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
                <div className="p-3 bg-cream border-2 border-charcoal text-center">
                  <span className="text-[10px] font-sans font-bold text-charcoal/60 uppercase block">
                    {isHi ? 'मिलान स्कोर' : 'MATCH SCORE'}
                  </span>
                  <span
                    style={{ backgroundColor: '#EAB308', color: '#172016' }}
                    className="text-lg font-black font-mono px-2 py-0.5 border border-charcoal inline-block mt-0.5"
                  >
                    94%
                  </span>
                </div>

                <div className="p-3 bg-cream border-2 border-charcoal text-center">
                  <span className="text-[10px] font-sans font-bold text-charcoal/60 uppercase block">
                    {isHi ? 'औसत फार्मगेट दर' : 'BLENDED FARMGATE'}
                  </span>
                  <span style={{ color: '#14532D' }} className="text-lg font-black font-mono block mt-0.5">
                    ₹{smartBlendedFarmgate}/kg
                  </span>
                </div>

                <div
                  style={{ backgroundColor: '#14532D', color: '#FFFFFF' }}
                  className="p-3 border-2 border-charcoal text-center shadow-bauhaus-sm"
                >
                  <span className="text-[10px] font-sans font-bold uppercase block text-white/80">
                    {isHi ? 'अनुमानित लैंडेड लागत' : 'ESTIMATED LANDED COST'}
                  </span>
                  <span style={{ color: '#EAB308' }} className="text-xl font-black font-mono block mt-0.5">
                    ₹{smartEstimatedLandedCost}/kg
                  </span>
                </div>
              </div>
            </div>

            {/* Aggregation Progress Bar */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="uppercase text-charcoal">
                  {isHi ? 'कुल संकलित मात्रा:' : 'TOTAL FULFILLED VOLUME:'} <strong className="font-mono">{smartAllocatedKg} / {targetReqQty} kg</strong>
                </span>
                <span style={{ color: '#14532D' }} className="font-mono">
                  {Math.min(100, Math.round((smartAllocatedKg / targetReqQty) * 100))}% Fulfilled
                </span>
              </div>
              <div className="w-full h-4 bg-cream border-2 border-charcoal shadow-bauhaus-sm overflow-hidden">
                <div
                  className="h-full bg-forest transition-all duration-300"
                  style={{ width: `${Math.min(100, (smartAllocatedKg / targetReqQty) * 100)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Matched Clustered Smallholder Producers */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-charcoal block">
                {isHi ? 'अनुशंसित उत्पादक संयोजन' : 'RECOMMENDED SUPPLIER COMBINATION'}
              </span>
              <span className="text-[11px] font-medium text-charcoal/70">
                {isHi ? 'दूरी, गुणवत्ता व कीमत के आधार पर अनुकूलित' : 'Optimized by proximity, quality & reliability'}
              </span>
            </div>

            {smartCandidates.map((s) => {
              const isSelected = smartSelectedIds.includes(s.id);
              return (
                <div
                  key={s.id}
                  onClick={() => toggleSmartSelect(s.id)}
                  className={`p-4 border-3 border-charcoal transition-all cursor-pointer select-none flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                    isSelected
                      ? 'bg-white shadow-bauhaus'
                      : 'bg-cream/40 opacity-60 border-charcoal/40'
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    <div
                      style={
                        isSelected
                          ? { backgroundColor: '#14532D', color: '#FFFFFF' }
                          : { backgroundColor: '#FFFFFF' }
                      }
                      className="w-5 h-5 border-2 border-charcoal flex items-center justify-center mt-0.5 shadow-bauhaus-sm"
                    >
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-black text-sm uppercase text-charcoal">
                          {isHi ? s.nameHi : s.name}
                        </span>
                        <span
                          style={{
                            backgroundColor: s.isFpo ? '#EAB308' : '#4D7C0F',
                            color: s.isFpo ? '#172016' : '#FFFFFF',
                          }}
                          className="text-[9px] font-mono font-bold px-1.5 py-0.2 border border-charcoal"
                        >
                          {s.isFpo ? 'FPO' : 'FARMER'}
                        </span>
                      </div>

                      <p className="text-xs text-charcoal/70 mt-0.5 font-medium">
                        {isHi ? s.locationHi : s.location} • <span className="font-mono">{s.distanceKm} km</span> away
                      </p>
                    </div>
                  </div>

                  {/* Volume, Grade, Price */}
                  <div className="flex items-center gap-5 sm:gap-8 self-end sm:self-center font-mono text-xs">
                    <div className="text-right">
                      <span className="text-[10px] font-bold text-charcoal/60 uppercase block font-sans">
                        {isHi ? 'आवंटित मात्रा' : 'Allocated'}
                      </span>
                      <span className="font-black text-charcoal text-sm">{s.quantityKg} kg</span>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] font-bold text-charcoal/60 uppercase block font-sans">
                        {isHi ? 'ग्रेड' : 'Grade'}
                      </span>
                      <span className="font-bold text-charcoal">{s.grade}</span>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] font-bold text-charcoal/60 uppercase block font-sans">
                        {isHi ? 'फार्मगेट' : 'Farmgate'}
                      </span>
                      <span style={{ color: '#14532D' }} className="font-black text-forest text-sm">
                        ₹{s.pricePerKg}/kg
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] font-bold text-charcoal/60 uppercase block font-sans">
                        {isHi ? 'मिलान' : 'Match'}
                      </span>
                      <span
                        style={{ backgroundColor: '#EAB308', color: '#172016' }}
                        className="font-bold text-charcoal bg-gold px-1.5 py-0.2 border border-charcoal"
                      >
                        {s.matchScore}%
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Sticky Action Footer for Smart Matching */}
          <div className="p-4 bg-gold border-4 border-charcoal shadow-bauhaus-lg flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-charcoal block">
                {isHi ? 'कुल संकलित लॉट' : 'TOTAL AGGREGATED BATCH'}
              </span>
              <p className="text-xs text-charcoal font-medium">
                {smartAllocatedKg} kg {reqProduct} • Blended Farmgate: <strong className="font-mono">₹{smartBlendedFarmgate}/kg</strong> • Landed: <strong className="font-mono font-black">₹{smartEstimatedLandedCost}/kg</strong> (-10% vs Mandi)
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => navigate('/buyer/demand')}
                className="px-4 py-2.5 text-xs font-bold uppercase tracking-wider bg-white text-charcoal border-2 border-charcoal hover:bg-cream shadow-bauhaus-sm"
              >
                {isHi ? 'आवश्यकता समायोजित करें' : 'ADJUST REQUIREMENT'}
              </button>

              <button
                type="button"
                onClick={handleAcceptSmartMatch}
                disabled={smartAllocatedKg < targetReqQty}
                className="btn-bauhaus-primary px-6 py-2.5 text-xs uppercase tracking-wider flex items-center gap-2 disabled:opacity-50"
              >
                <span>{isHi ? 'मिलान स्वीकार करें' : 'ACCEPT MATCH'}</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          5. DIRECT BUY MODAL (SECTION 13)
          ======================================================== */}
      {activeBuyFarmer && (
        <div className="fixed inset-0 z-50 bg-charcoal/50 flex items-center justify-center p-4">
          <div className="bg-white border-4 border-charcoal shadow-bauhaus-lg max-w-lg w-full p-6 space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between pb-3 border-b-2 border-charcoal">
              <div>
                <span
                  style={{ backgroundColor: '#14532D', color: '#FFFFFF' }}
                  className="text-[10px] font-mono font-black uppercase px-2 py-0.5 border border-charcoal inline-block mb-1"
                >
                  {isHi ? 'प्रत्यक्ष खरीद ऑर्डर' : 'DIRECT PROCUREMENT ORDER'}
                </span>
                <h3 className="text-xl font-black text-charcoal uppercase">
                  {isHi ? activeBuyFarmer.nameHi : activeBuyFarmer.name}
                </h3>
                <p className="text-xs text-charcoal/70 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5" />
                  {isHi ? activeBuyFarmer.locationHi : activeBuyFarmer.location} • {activeBuyFarmer.distanceKm} km away
                </p>
              </div>

              <button
                onClick={() => setActiveBuyFarmer(null)}
                className="p-1.5 border-2 border-charcoal hover:bg-gold transition-colors"
              >
                <X className="w-4 h-4 stroke-[3]" />
              </button>
            </div>

            {/* Price & Quantity Calculation */}
            <div className="p-4 bg-cream border-2 border-charcoal space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-charcoal uppercase">{isHi ? 'फसल एवं ग्रेड' : 'Crop & Grade'}:</span>
                <span className="font-black text-charcoal">{activeBuyFarmer.crop} ({activeBuyFarmer.grade})</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-charcoal uppercase">{isHi ? 'फार्मगेट दर' : 'Farmgate Price'}:</span>
                <span className="font-black font-mono text-forest text-sm">₹{activeBuyFarmer.pricePerKg} / kg</span>
              </div>

              <div className="pt-2 border-t border-charcoal/20 space-y-1">
                <div className="flex items-center justify-between font-bold">
                  <span>{isHi ? 'खरीद मात्रा (किग्रा)' : 'Procurement Quantity (kg)'}:</span>
                  <span className="text-[11px] text-charcoal/60">Max: {activeBuyFarmer.availableQtyKg} kg</span>
                </div>
                <input
                  type="number"
                  min="10"
                  max={activeBuyFarmer.availableQtyKg}
                  value={buyQuantity}
                  onChange={(e) => setBuyQuantity(Math.min(activeBuyFarmer.availableQtyKg, Math.max(1, parseInt(e.target.value) || 0)))}
                  className="w-full bg-white border-2 border-charcoal px-3 py-2 font-mono font-bold text-sm focus:outline-none"
                />
              </div>

              <div className="pt-2 border-t border-charcoal/20 flex items-center justify-between text-sm">
                <span className="font-black uppercase">{isHi ? 'कुल किसान भुगतान' : 'Total Farmer Payout'}:</span>
                <span style={{ color: '#14532D' }} className="font-mono font-black text-base">
                  ₹{(buyQuantity * activeBuyFarmer.pricePerKg).toLocaleString()}
                </span>
              </div>
            </div>

            {/* Logistics Preview */}
            <div className="p-3 bg-white border-2 border-charcoal flex items-center gap-3 text-xs">
              <Truck className="w-5 h-5 text-forest shrink-0 stroke-[2.5]" />
              <div>
                <p className="font-bold text-charcoal">
                  {isHi ? 'सीधा फार्मगेट पिकअप और डिलीवरी' : 'Direct Farmgate Pickup & Reefer Delivery'}
                </p>
                <p className="text-[11px] text-charcoal/70">
                  {isHi
                    ? `पिकअप: ${activeBuyFarmer.location} → डिलीवरी: FreshBite Hub, Sector 62, Noida`
                    : `Pickup: ${activeBuyFarmer.location} → Delivery: FreshBite Hub, Sector 62, Noida`}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setActiveBuyFarmer(null)}
                className="px-4 py-2.5 text-xs font-bold uppercase border-2 border-charcoal bg-white hover:bg-cream"
              >
                {isHi ? 'रद्द करें' : 'Cancel'}
              </button>
              <button
                type="button"
                onClick={handleConfirmDirectProcurement}
                className="btn-bauhaus-primary px-5 py-2.5 text-xs uppercase tracking-wider flex items-center gap-1.5"
              >
                <span>{isHi ? 'लॉजिस्टिक्स पर आगे बढ़ें' : 'PROCEED TO LOGISTICS'}</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          6. VIEW FARMER PROFILE MODAL
          ======================================================== */}
      {viewFarmer && (
        <div className="fixed inset-0 z-50 bg-charcoal/50 flex items-center justify-center p-4">
          <div className="bg-white border-4 border-charcoal shadow-bauhaus-lg max-w-md w-full p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between pb-3 border-b-2 border-charcoal">
              <div>
                <span
                  style={{ backgroundColor: viewFarmer.isFpo ? '#EAB308' : '#14532D', color: viewFarmer.isFpo ? '#172016' : '#FFFFFF' }}
                  className="text-[10px] font-mono font-black uppercase px-2 py-0.5 border border-charcoal inline-block mb-1"
                >
                  {viewFarmer.isFpo ? 'FPO Partner' : 'Verified Producer'}
                </span>
                <h3 className="text-xl font-black text-charcoal uppercase">
                  {isHi ? viewFarmer.nameHi : viewFarmer.name}
                </h3>
                <p className="text-xs text-charcoal/70 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5" />
                  {isHi ? viewFarmer.locationHi : viewFarmer.location} ({viewFarmer.distanceKm} km away)
                </p>
              </div>

              <button
                onClick={() => setViewFarmer(null)}
                className="p-1.5 border-2 border-charcoal hover:bg-gold transition-colors"
              >
                <X className="w-4 h-4 stroke-[3]" />
              </button>
            </div>

            <div className="p-3 bg-cream border-2 border-charcoal space-y-2 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-charcoal/70 font-sans font-bold uppercase">Rating:</span>
                <span className="font-bold flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-gold fill-gold" />
                  {viewFarmer.rating} / 5.0
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal/70 font-sans font-bold uppercase">Crop:</span>
                <span className="font-bold">{viewFarmer.crop} ({viewFarmer.grade})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal/70 font-sans font-bold uppercase">Harvest Date:</span>
                <span className="font-bold">{viewFarmer.harvestDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal/70 font-sans font-bold uppercase">Farmgate Rate:</span>
                <span className="font-bold text-forest text-sm">₹{viewFarmer.pricePerKg} / kg</span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal/70 font-sans font-bold uppercase">Available Volume:</span>
                <span className="font-bold">{viewFarmer.availableQtyKg} kg</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setViewFarmer(null)}
                className="px-4 py-2 text-xs font-bold uppercase border-2 border-charcoal bg-white hover:bg-cream"
              >
                {isHi ? 'बंद करें' : 'Close'}
              </button>
              <button
                type="button"
                onClick={() => {
                  const item = viewFarmer;
                  setViewFarmer(null);
                  handleOpenBuyDirect(item);
                }}
                className="btn-bauhaus-primary px-4 py-2 text-xs uppercase tracking-wider flex items-center gap-1.5"
              >
                <span>{isHi ? 'सीधा खरीदें' : 'BUY DIRECT'}</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Marketplace;
