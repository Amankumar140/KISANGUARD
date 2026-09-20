// Utility functions for KrishiFlow AI
// Ensures consistent calculations across all pages

import { PRICING_DATA } from '../data/mockPricing';

export const calculateSupplyGap = (predictedDemand, currentSupply) => {
  return Math.max(0, predictedDemand - currentSupply);
};

export const calculateFarmerRealization = () => {
  const traditional = PRICING_DATA.traditional.farmerReceives;
  const krishiflow = PRICING_DATA.krishiflow.farmerReceives;
  return {
    traditional,
    krishiflow,
    gainPerKg: krishiflow - traditional,
    gainPct: ((krishiflow - traditional) / traditional * 100).toFixed(1),
  };
};

export const calculateBuyerSavings = () => {
  const traditional = PRICING_DATA.traditional.buyerPays;
  const krishiflow = PRICING_DATA.krishiflow.buyerPays;
  return {
    traditional,
    krishiflow,
    savingsPerKg: traditional - krishiflow,
    savingsPct: ((traditional - krishiflow) / traditional * 100).toFixed(1),
  };
};

export const calculateMatchScore = (farmer, requirements) => {
  let score = 70; // Base
  if (farmer.distanceKm < 15) score += 10;
  if (farmer.distanceKm < 8) score += 5;
  if (farmer.rating >= 4.8) score += 5;
  if (farmer.verified) score += 5;
  if (farmer.fpoMember) score += 3;
  if (farmer.reliabilityScore > 90) score += 2;
  return Math.min(100, score);
};

export const calculateOrderValue = (quantityKg, pricePerKg) => {
  return quantityKg * pricePerKg;
};

export const calculateLandedCost = (farmerPrice, logisticsPerKg = 5, platformPerKg = 0) => {
  return farmerPrice + logisticsPerKg + platformPerKg;
};

export const formatCurrency = (amount) => {
  return `₹${amount.toLocaleString('en-IN')}`;
};

export const formatWeight = (kg) => {
  return `${kg.toLocaleString('en-IN')} kg`;
};
