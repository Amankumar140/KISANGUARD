import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { ToastProvider } from './components/common/Toast';
import { RoleProvider, useRole } from './context/RoleContext';
import AppLayout from './layouts/AppLayout';
import GlobalAIAssistant from './components/GlobalAIAssistant';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import BuyerDashboard from './pages/BuyerDashboard';
import ProcurementRequest from './pages/ProcurementRequest';
import SmartMatching from './pages/SmartMatching';
import DemandIntelligence from './pages/DemandIntelligence';
import SmartLogistics from './pages/SmartLogistics';
import OrderTracking from './pages/OrderTracking';
import PriceTransparency from './pages/PriceTransparency';
import ImpactDashboard from './pages/ImpactDashboard';
import Marketplace from './pages/Marketplace';

// Farmer pages
import FarmerDashboard from './pages/FarmerDashboard';
import FarmerProduce from './pages/FarmerProduce';
import FarmerDemand from './pages/FarmerDemand';
import FarmerOrders from './pages/FarmerOrders';

const AppContent = () => {
  const { currentRole, setRole } = useRole();

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Landing & Login */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage onSelectRole={setRole} />} />

        {/* Authenticated / App Portal Routes */}
        <Route element={<AppLayout currentRole={currentRole} onRoleChange={setRole} />}>
          {/* Buyer Routes */}
          <Route path="/buyer" element={<BuyerDashboard />} />
          <Route path="/buyer/marketplace" element={<Marketplace />} />
          <Route path="/buyer/demand" element={<ProcurementRequest />} />
          <Route path="/buyer/matching" element={<Navigate to="/buyer/marketplace" replace />} />

          {/* Core Intelligence & Operations with role-aware guarding */}
          <Route
            path="/ai"
            element={
              currentRole === 'buyer'
                ? <Navigate to="/buyer/marketplace" replace />
                : <DemandIntelligence />
            }
          />
          <Route path="/logistics" element={<SmartLogistics />} />
          <Route path="/orders" element={<OrderTracking />} />
          <Route path="/pricing" element={<PriceTransparency />} />
          <Route path="/impact" element={<Navigate to="/" replace />} />

          {/* Farmer Routes */}
          <Route path="/farmer" element={<FarmerDashboard />} />
          <Route path="/farmer/produce" element={<FarmerProduce />} />
          <Route path="/farmer/demand" element={<FarmerDemand />} />
          <Route path="/farmer/orders" element={<FarmerOrders />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Global AI Assistant Floating Button & Chat Panel */}
      <GlobalAIAssistant currentRole={currentRole} />
    </BrowserRouter>
  );
};

export const App = () => {
  return (
    <RoleProvider>
      <LanguageProvider>
        <ToastProvider>
          <AppContent />
        </ToastProvider>
      </LanguageProvider>
    </RoleProvider>
  );
};

export default App;
