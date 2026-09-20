import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from '../components/common/Toast';
import {
  MapPin,
  ArrowRight,
  X,
  CheckCircle2,
  Calendar,
  Building2,
  ShieldCheck,
} from 'lucide-react';

import { MOCK_DEMAND_RECORDS, getFarmerNearbyDemand } from '../data/mockDemand';

export const FarmerDemand = () => {
  const { t, language } = useLanguage();
  const { addToast } = useToast();
  const [selectedDemand, setSelectedDemand] = useState(null);

  const demands = getFarmerNearbyDemand();

  const handleSupplyOffer = (buyerName) => {
    addToast(
      language === 'hi'
        ? `${buyerName} के लिए आपूर्ति प्रस्ताव दर्ज कर दिया गया है!`
        : `Supply allotment offered to ${buyerName}!`,
      'success'
    );
    setSelectedDemand(null);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="pb-4 border-b-3 border-charcoal">
        <h1 className="text-2xl sm:text-3xl font-black text-charcoal uppercase tracking-tight">
          {language === 'hi' ? 'निकटवर्ती खरीदार मांग' : 'NEARBY BUYER DEMANDS'}
        </h1>
        <p className="text-xs text-charcoal/80 font-medium mt-0.5">
          {language === 'hi' 
            ? 'सत्यापित संस्थागत खरीदारों से सीधे खरीद आवश्यकताओं को पूरा करें।'
            : 'Aggregate and fulfill direct procurement requirements from verified institutional buyers.'}
        </p>
      </div>

      {/* Demands Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {demands.map((item) => (
          <div
            key={item.id}
            className="p-5 bg-white border-3 border-charcoal shadow-bauhaus flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-3 border-b-2 border-charcoal">
                <span className="text-xs font-black uppercase text-charcoal">
                  {language === 'hi' ? item.buyerHi : item.buyer}
                </span>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-gold text-charcoal border border-charcoal shadow-bauhaus-sm">
                  ACTIVE
                </span>
              </div>

              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-charcoal/70 font-sans font-bold uppercase text-[10px]">{t('common.crop')}</span>
                  <span className="font-sans font-bold text-charcoal">
                    {language === 'hi' ? item.cropHi : item.crop}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-charcoal/70 font-sans font-bold uppercase text-[10px]">{t('common.quantity')}</span>
                  <span className="font-bold text-charcoal">
                    {item.quantityKg || item.volumeKg} kg ({item.grade})
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-charcoal/70 font-sans font-bold uppercase text-[10px]">{language === 'hi' ? 'प्रस्तावित दर' : 'Price per kg'}</span>
                  <span className="font-black text-forest text-sm">
                    {item.pricePerKg ? `₹${item.pricePerKg}/kg` : item.offeredBudget}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-[11px] font-sans font-medium text-charcoal/70 pt-2 border-t border-charcoal/15">
                  <MapPin className="w-3.5 h-3.5 text-charcoal stroke-[2.5] shrink-0" />
                  <span className="truncate">{language === 'hi' ? item.locationHi : item.location}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setSelectedDemand(item)}
              className="btn-bauhaus-primary w-full py-2.5 text-xs uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <span>{language === 'hi' ? 'मांग देखें' : 'VIEW DEMAND'}</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
            </button>
          </div>
        ))}
      </div>

      {/* Demand Detail Modal */}
      {selectedDemand && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/75 backdrop-blur-xs p-4 animate-fade-in">
          <div className="bg-white border-4 border-charcoal shadow-bauhaus-lg max-w-lg w-full p-6 space-y-5 animate-scale-up">
            <div className="flex items-start justify-between border-b-3 border-charcoal pb-3">
              <div>
                <span className="text-[10px] font-mono font-bold bg-gold px-2 py-0.5 border border-charcoal uppercase shadow-bauhaus-sm">
                  {language === 'hi' ? 'सत्यापित खरीदार मांग' : 'VERIFIED BUYER DEMAND'}
                </span>
                <h3 className="text-xl font-black text-charcoal uppercase mt-1">
                  {language === 'hi' ? selectedDemand.buyerHi : selectedDemand.buyer}
                </h3>
              </div>
              <button
                onClick={() => setSelectedDemand(null)}
                className="p-1.5 border-2 border-charcoal hover:bg-cream transition-colors"
              >
                <X className="w-5 h-5 text-charcoal stroke-[3]" />
              </button>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div className="p-3 bg-cream border-2 border-charcoal flex justify-between items-center">
                <span className="text-charcoal/70 font-sans font-bold uppercase">{language === 'hi' ? 'फसल व ग्रेड' : 'Crop & Grade'}</span>
                <span className="font-black text-charcoal">
                  {language === 'hi' ? selectedDemand.cropHi : selectedDemand.crop} • {selectedDemand.grade}
                </span>
              </div>

              <div className="p-3 bg-cream border-2 border-charcoal flex justify-between items-center">
                <span className="text-charcoal/70 font-sans font-bold uppercase">{language === 'hi' ? 'आवश्यक मात्रा' : 'Required Quantity'}</span>
                <span className="font-black text-charcoal">
                  {selectedDemand.quantityKg || selectedDemand.volumeKg} kg
                </span>
              </div>

              <div className="p-3 bg-forest text-white border-2 border-charcoal flex justify-between items-center">
                <span className="text-cream/90 font-sans font-bold uppercase">{language === 'hi' ? 'प्रस्तावित फार्मगेट दर' : 'Offered Farmgate Rate'}</span>
                <span className="font-black text-gold text-base">
                  {selectedDemand.pricePerKg ? `₹${selectedDemand.pricePerKg}/kg` : selectedDemand.offeredBudget}
                </span>
              </div>

              <div className="p-3 bg-cream border-2 border-charcoal flex justify-between items-center">
                <span className="text-charcoal/70 font-sans font-bold uppercase">{language === 'hi' ? 'वितरण गंतव्य' : 'Delivery Location'}</span>
                <span className="font-bold text-charcoal text-right">
                  {language === 'hi' ? selectedDemand.locationHi : selectedDemand.location}
                </span>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setSelectedDemand(null)}
                className="btn-bauhaus-white flex-1 py-2.5 text-xs uppercase"
              >
                {language === 'hi' ? 'बंद करें' : 'CLOSE'}
              </button>
              <button
                onClick={() => handleSupplyOffer(language === 'hi' ? selectedDemand.buyerHi : selectedDemand.buyer)}
                className="btn-bauhaus-primary flex-1 py-2.5 text-xs uppercase flex items-center justify-center gap-1.5"
              >
                <span>{language === 'hi' ? 'आपूर्ति प्रस्ताव दें' : 'OFFER SUPPLY'}</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FarmerDemand;
