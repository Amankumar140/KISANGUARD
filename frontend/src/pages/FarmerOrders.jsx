import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { getOrdersForFarmer } from '../data/mockOrders';

export const FarmerOrders = () => {
  const { t, language } = useLanguage();

  const orders = getOrdersForFarmer('Ramesh Kumar');

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="pb-4 border-b-3 border-charcoal">
        <h1 className="text-2xl sm:text-3xl font-black text-charcoal uppercase tracking-tight">
          {t('farmerOrders.title')}
        </h1>
        <p className="text-xs text-charcoal/80 font-medium mt-0.5">
          {t('farmerOrders.subtitle')}
        </p>
      </div>

      {/* Bauhaus Table of Dispatches */}
      <div className="bg-white border-3 border-charcoal shadow-bauhaus overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-cream text-charcoal uppercase tracking-wider text-[11px] font-black border-b-2 border-charcoal">
              <tr>
                <th className="py-3 px-4">{t('farmerOrders.orderId')}</th>
                <th className="py-3 px-4">{t('farmerOrders.crop')}</th>
                <th className="py-3 px-4">{t('farmerOrders.quantity')}</th>
                <th className="py-3 px-4">{t('farmerOrders.buyer')}</th>
                <th className="py-3 px-4">{t('farmerOrders.pickupDate')}</th>
                <th className="py-3 px-4">{t('farmerOrders.payoutAmount')}</th>
                <th className="py-3 px-4">{t('farmerOrders.status')}</th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-charcoal/10 font-mono">
              {orders.map((o) => (
                <tr key={o.id} className="hover:bg-cream/50 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-charcoal">{o.id}</td>
                  <td className="py-3.5 px-4 font-sans font-bold text-charcoal">
                    {language === 'hi' ? o.cropHi : o.crop}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-charcoal">{o.quantityKg || o.quantity} kg</td>
                  <td className="py-3.5 px-4 font-sans font-medium text-charcoal">
                    {language === 'hi' ? o.buyerHi : o.buyer}
                  </td>
                  <td className="py-3.5 px-4 text-charcoal/70">
                    {o.pickupDate}
                  </td>
                  <td className="py-3.5 px-4 font-black text-forest text-sm">{o.totalValueFormatted || o.payout}</td>
                  <td className="py-3.5 px-4 font-sans">
                    <span
                      style={{
                        backgroundColor: o.status === 'inTransit' || o.status === 'pickupScheduled' || o.status === 'confirmed' ? '#EAB308' : '#4D7C0F',
                        color: o.status === 'inTransit' || o.status === 'pickupScheduled' || o.status === 'confirmed' ? '#172016' : '#FFFFFF',
                      }}
                      className="px-2 py-0.5 text-[10px] font-black uppercase border border-charcoal shadow-bauhaus-sm"
                    >
                      {language === 'hi' ? (o.statusLabelHi || o.status) : (o.statusLabel || o.status)}
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

export default FarmerOrders;
