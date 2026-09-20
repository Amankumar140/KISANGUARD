// Centralized role configuration for KrishiFlow AI
// Controls sidebar navigation, terminology, dashboard content, AI content, and CTAs per role

export const ROLES = {
  FARMER: 'farmer',
  BUYER: 'buyer',
};

export const ROLE_PROFILES = {
  farmer: {
    id: 'farmer',
    name: 'Ramesh Kumar',
    nameHi: 'रमेश कुमार',
    roleLabel: 'Producer / Farmer',
    roleLabelHi: 'उत्पादक / किसान',
    initials: 'RK',
    organization: 'Dadri Farm Gate #1',
    organizationHi: 'दादरी फार्म गेट #1',
    location: 'Dadri, Gautam Buddha Nagar',
    locationHi: 'दादरी, गौतम बुद्ध नगर',
  },
  buyer: {
    id: 'buyer',
    name: 'Priya Sharma',
    nameHi: 'प्रिया शर्मा',
    roleLabel: 'Enterprise Buyer',
    roleLabelHi: 'संस्थागत खरीदार',
    initials: 'PS',
    organization: 'FreshBite Restaurants',
    organizationHi: 'फ्रेशबाइट रेस्टोरेंट्स',
    location: 'Sector 62, Noida',
    locationHi: 'सेक्टर 62, नोएडा',
  },
};

export const FARMER_NAV = [
  { key: 'dashboard', path: '/farmer', labelEn: 'Dashboard', labelHi: 'डैशबोर्ड', icon: 'LayoutDashboard', badge: null },
  { key: 'produce', path: '/farmer/produce', labelEn: 'My Produce', labelHi: 'मेरी उपज', icon: 'Sprout', badge: null },
  { key: 'demand', path: '/farmer/demand', labelEn: 'Nearby Demand', labelHi: 'नज़दीकी मांग', icon: 'TrendingUp', badge: 'LIVE', badgeHi: 'लाइव', badgeColor: 'gold' },
  { key: 'orders', path: '/farmer/orders', labelEn: 'Orders', labelHi: 'ऑर्डर', icon: 'PackageCheck', badge: '1', badgeColor: 'crop' },
  { key: 'ai', path: '/ai', labelEn: 'AI Intelligence', labelHi: 'AI जानकारी', icon: 'BrainCircuit', badge: '+19%', badgeColor: 'gold' },
  { key: 'pricing', path: '/pricing', labelEn: 'Price Breakdown', labelHi: 'मूल्य विवरण', icon: 'Receipt', badge: null },
];

export const BUYER_NAV = [
  { key: 'dashboard', path: '/buyer', labelEn: 'Dashboard', labelHi: 'डैशबोर्ड', icon: 'LayoutDashboard', badge: null },
  { key: 'marketplace', path: '/buyer/marketplace', labelEn: 'Marketplace', labelHi: 'मार्केटप्लेस', icon: 'Store', badge: null },
  { key: 'procurement', path: '/buyer/demand', labelEn: 'Procurement', labelHi: 'खरीद', icon: 'FilePlus2', badge: 'NEW', badgeHi: 'नया', badgeColor: 'gold' },
  { key: 'logistics', path: '/logistics', labelEn: 'Smart Logistics', labelHi: 'स्मार्ट लॉजिस्टिक्स', icon: 'Truck', badge: null },
  { key: 'orders', path: '/orders', labelEn: 'Orders', labelHi: 'ऑर्डर', icon: 'PackageCheck', badge: '3', badgeColor: 'cream' },
  { key: 'pricing', path: '/pricing', labelEn: 'Price Breakdown', labelHi: 'मूल्य विवरण', icon: 'Receipt', badge: null },
];

export const FARMER_PIPELINE = [
  { path: '/farmer', labelEn: '1. Dashboard', labelHi: '1. डैशबोर्ड' },
  { path: '/farmer/produce', labelEn: '2. List Produce', labelHi: '2. उपज' },
  { path: '/farmer/demand', labelEn: '3. Demand', labelHi: '3. मांग' },
  { path: '/ai', labelEn: '4. AI Forecast', labelHi: '4. पूर्वानुमान' },
  { path: '/farmer/orders', labelEn: '5. Orders', labelHi: '5. ऑर्डर' },
  { path: '/pricing', labelEn: '6. Economics', labelHi: '6. अर्थशास्त्र' },
];

export const BUYER_PIPELINE = [
  { path: '/buyer', labelEn: '1. Overview', labelHi: '1. डैशबोर्ड' },
  { path: '/buyer/marketplace', labelEn: '2. Marketplace', labelHi: '2. मार्केटप्लेस' },
  { path: '/buyer/demand', labelEn: '3. Procurement', labelHi: '3. मांग दर्ज' },
  { path: '/logistics', labelEn: '4. Logistics', labelHi: '4. लॉजिस्टिक्स' },
  { path: '/orders', labelEn: '5. Orders', labelHi: '5. ऑर्डर' },
  { path: '/pricing', labelEn: '6. Economics', labelHi: '6. अर्थशास्त्र' },
];

export const BADGE_STYLES = {
  gold: { bg: '#EAB308', color: '#172016', border: '#172016' },
  crop: { bg: '#4D7C0F', color: '#FFFFFF', border: '#172016' },
  forest: { bg: '#14532D', color: '#EAB308', border: '#172016' },
  cream: { bg: '#F7F4EA', color: '#172016', border: '#172016' },
  earth: { bg: '#92400E', color: '#FFFFFF', border: '#172016' },
};

export const getNavItems = (role) => role === 'farmer' ? FARMER_NAV : BUYER_NAV;
export const getPipeline = (role) => role === 'farmer' ? FARMER_PIPELINE : BUYER_PIPELINE;
export const getRoleProfile = (role) => ROLE_PROFILES[role] || ROLE_PROFILES.buyer;
