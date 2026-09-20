// Mock API Service for KrishiFlow AI
// Structured so it can be replaced by FastAPI endpoints later

import { MOCK_FARMERS_FULL, getFarmersByCrop } from '../data/mockFarmers';
import { MOCK_BUYERS_FULL } from '../data/mockBuyers';
import { MOCK_PRODUCTS, getProductById } from '../data/mockProducts';
import { MOCK_DEMAND_RECORDS } from '../data/mockDemand';
import { MOCK_ORDERS_FULL, getOrdersForFarmer, getOrdersForBuyer } from '../data/mockOrders';
import { MOCK_PROCUREMENT_REQUESTS } from '../data/mockProcurement';
import { MOCK_FORECASTS, getForecast } from '../data/mockForecasts';
import { MOCK_LOGISTICS_ROUTES, getActiveRoute } from '../data/mockLogistics';
import { PRICING_DATA, FARMER_PRICING, BUYER_PRICING } from '../data/mockPricing';
import { getNotifications } from '../data/mockNotifications';
import { getCurrentUser } from '../data/mockUsers';
import { DEMO_SCENARIO } from '../data/demoScenario';

const delay = (ms = 200) => new Promise((resolve) => setTimeout(resolve, ms));

export const mockApi = {
  // Auth / Users
  async getCurrentUser(role = 'buyer') {
    await delay(100);
    return getCurrentUser(role);
  },

  // Products / Crops
  async getProducts() {
    await delay(150);
    return [...MOCK_PRODUCTS];
  },

  // Farmers / Producers
  async getFarmers(filter = {}) {
    await delay(200);
    let list = [...MOCK_FARMERS_FULL];
    if (filter.cropId) {
      list = getFarmersByCrop(filter.cropId);
    }
    return list;
  },

  // Buyers
  async getBuyers() {
    await delay(200);
    return [...MOCK_BUYERS_FULL];
  },

  // Dashboard data
  async getDashboardData(role = 'buyer') {
    await delay(200);
    if (role === 'farmer') {
      return {
        availableProduceKg: 680,
        pendingOrders: 1,
        expectedPayout: 14850,
        localDemandOpportunityKg: 320,
      };
    }
    return {
      activeProcurement: 3,
      pendingOrders: 3,
      networkSupplyKg: 2180,
      estimatedSavings: 18400,
    };
  },

  // Demand records
  async getDemandData(cropId = null) {
    await delay(200);
    if (cropId) {
      return MOCK_DEMAND_RECORDS.filter(d => d.cropId === cropId);
    }
    return [...MOCK_DEMAND_RECORDS];
  },

  // Forecast data
  async getForecastData(cropId = 'tomato') {
    await delay(250);
    return getForecast(cropId);
  },

  // Procurement Requests
  async getProcurementRequests() {
    await delay(200);
    return [...MOCK_PROCUREMENT_REQUESTS];
  },

  // Smart Matching
  async getMatchingSuppliers(cropId = 'tomato', targetQuantityKg = 500) {
    await delay(300);
    const matchingFarmers = getFarmersByCrop(cropId);
    const demoSuppliers = DEMO_SCENARIO.matching.suppliers;
    
    return {
      targetCrop: cropId,
      targetQuantityKg,
      totalMatchedSupplyKg: 500,
      matchScore: DEMO_SCENARIO.matching.matchScore,
      matchedSuppliers: matchingFarmers.length > 0 ? matchingFarmers.slice(0, 3) : MOCK_FARMERS_FULL.slice(0, 3),
      demoSuppliers,
      aggregations: {
        totalFarms: 3,
        averageRadiusKm: 9.1,
        blendedPricePerKg: 21.9,
        projectedSavings: '₹4,050',
      },
    };
  },

  // Orders
  async getOrders(role = 'buyer', farmerName = 'Ramesh Kumar') {
    await delay(200);
    if (role === 'farmer') {
      return getOrdersForFarmer(farmerName);
    }
    return getOrdersForBuyer();
  },

  // Logistics
  async getLogisticsRoutes() {
    await delay(300);
    return [...MOCK_LOGISTICS_ROUTES];
  },

  async optimizeRoute(demandId) {
    await delay(300);
    return { ...getActiveRoute(), demandId };
  },

  // Pricing
  async getPricingBreakdown(role = 'buyer') {
    await delay(200);
    return {
      ...PRICING_DATA,
      roleContent: role === 'farmer' ? FARMER_PRICING : BUYER_PRICING,
    };
  },

  // Impact
  async getImpactData(role = 'buyer') {
    await delay(200);
    return {
      farmerPriceImprovementPct: 46.6,
      buyerCostReductionPct: 10.0,
      logisticsDistanceReductionPct: 31.2,
      supplyFulfillmentRatePct: 94.4,
      economicComparison: PRICING_DATA,
      role,
    };
  },

  // Notifications
  async getNotifications(role = 'buyer') {
    await delay(100);
    return getNotifications(role);
  },

  // Create Demand
  async createDemand(demandPayload) {
    await delay(350);
    const id = `DEM-${Date.now().toString().slice(-4)}`;
    return {
      success: true,
      demandId: id,
      data: { id, ...demandPayload, status: 'matched', createdAt: new Date().toISOString() },
    };
  },
};

export { getNotifications } from '../data/mockNotifications';
export default mockApi;
