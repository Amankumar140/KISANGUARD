// Deterministic demo scenario for KrishiFlow AI hackathon presentation
// This file defines the exact demo flow data so it's consistent across reloads

export const DEMO_SCENARIO = {
  // Core procurement story
  procurement: {
    id: 'PR-1042',
    buyer: 'FreshBite Restaurants',
    buyerHi: 'फ्रेशबाइट रेस्टोरेंट्स',
    buyerContact: 'Priya Sharma',
    crop: 'Tomato',
    cropHi: 'टमाटर',
    cropId: 'tomato',
    quantityKg: 500,
    grade: 'Grade A',
    requiredDate: '2026-09-24',
    deliveryLocation: 'FreshBite Distribution Center, Sector 62, Noida',
  },

  // AI Forecast data
  forecast: {
    demandGrowthPct: 19,
    predictedDemandKg: 2500,
    currentSupplyKg: 2180,
    supplyGapKg: 320,
    confidencePct: 94.8,
  },

  // Smart Matching
  matching: {
    matchScore: 94,
    suppliers: [
      { name: 'Ramesh Kumar', nameHi: 'रमेश कुमार', quantityKg: 250, pricePerKg: 22, distanceKm: 6.8 },
      { name: 'Sita Devi', nameHi: 'सीता देवी', quantityKg: 150, pricePerKg: 21.5, distanceKm: 9.2 },
      { name: 'Rajesh Yadav', nameHi: 'राजेश यादव', quantityKg: 100, pricePerKg: 22, distanceKm: 11.4 },
    ],
    totalMatchedKg: 500,
  },

  // Logistics
  logistics: {
    pickups: 3,
    destinations: 1,
    optimizedDistanceKm: 41.8,
    distanceSavedPct: 18,
    estimatedTime: '1h 32m',
    estimatedCostInr: 1850,
    vehicle: 'Tata Ace EV Reefer',
  },

  // Economics
  economics: {
    buyerLandedCostPerKg: 27,
    traditionalBuyerCostPerKg: 30,
    buyerSavingsPct: 10,
    farmerRealizationPerKg: 22,
    traditionalFarmerPerKg: 15,
    farmerImprovementPct: 46.6,
  },

  // Farmer demo story
  farmerStory: {
    farmer: 'Ramesh Kumar',
    farmerHi: 'रमेश कुमार',
    produce: { crop: 'Tomato', cropHi: 'टमाटर', quantityKg: 250, grade: 'Grade A', pricePerKg: 22 },
    matchedBuyer: 'FreshBite Restaurants',
    matchedBuyerHi: 'फ्रेशबाइट रेस्टोरेंट्स',
    orderValue: 5500,
    orderValueFormatted: '₹5,500',
    pickupTime: '09:25 AM',
  },
};

export default DEMO_SCENARIO;
