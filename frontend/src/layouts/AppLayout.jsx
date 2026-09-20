import React, { useState } from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import Header from '../components/common/Header';
import Sidebar from '../components/common/Sidebar';
import { useLanguage } from '../context/LanguageContext';
import { useRole } from '../context/RoleContext';

export const AppLayout = ({ currentRole: propRole, onRoleChange: propRoleChange }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { language } = useLanguage();
  const roleContext = useRole();

  const currentRole = propRole || roleContext.currentRole || 'buyer';
  const onRoleChange = propRoleChange || roleContext.setRole;

  const buyerPipeline = [
    { path: '/buyer', label: language === 'hi' ? '1. डैशबोर्ड' : '1. Overview' },
    { path: '/buyer/marketplace', label: language === 'hi' ? '2. मार्केटप्लेस' : '2. Marketplace' },
    { path: '/buyer/demand', label: language === 'hi' ? '3. मांग दर्ज' : '3. Procurement' },
    { path: '/logistics', label: language === 'hi' ? '4. लॉजिस्टिक्स' : '4. Logistics' },
    { path: '/orders', label: language === 'hi' ? '5. ऑर्डर' : '5. Orders' },
    { path: '/pricing', label: language === 'hi' ? '6. अर्थशास्त्र' : '6. Economics' },
  ];

  const farmerPipeline = [
    { path: '/farmer', label: language === 'hi' ? '1. डैशबोर्ड' : '1. Overview' },
    { path: '/farmer/produce', label: language === 'hi' ? '2. मेरी उपज' : '2. Produce' },
    { path: '/farmer/demand', label: language === 'hi' ? '3. खरीदार मांग' : '3. Demand' },
    { path: '/ai', label: language === 'hi' ? '4. मांग इंटेलिजेंस' : '4. AI Forecast' },
    { path: '/farmer/orders', label: language === 'hi' ? '5. ऑर्डर' : '5. Orders' },
    { path: '/pricing', label: language === 'hi' ? '6. उचित मूल्य' : '6. Fair Price' },
  ];

  const demoPipeline = currentRole === 'farmer' ? farmerPipeline : buyerPipeline;

  return (
    <div className="min-h-screen bg-cream flex flex-col font-sans antialiased text-charcoal">
      {/* Bauhaus Workflow Navigator Bar */}
      <div
        style={{ backgroundColor: '#172016', color: '#F7F4EA' }}
        className="sticky top-0 z-40 h-9 bg-charcoal text-cream text-xs px-4 border-b-3 border-charcoal flex items-center justify-between overflow-x-auto whitespace-nowrap select-none"
      >
        <div className="flex items-center gap-2 shrink-0 pr-3 border-r-2 border-charcoal-muted">
          <span
            style={{ backgroundColor: '#EAB308' }}
            className="w-2 h-2 rounded-full bg-gold"
          ></span>
          <span
            style={{ color: '#EAB308' }}
            className="font-mono text-[11px] uppercase font-black tracking-wider text-gold"
          >
            {language === 'hi' ? 'लाइव प्रवाह' : 'PIPELINE'}
          </span>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto text-xs pl-3">
          {demoPipeline.map((step, idx) => {
            const isActive = location.pathname === step.path;
            return (
              <React.Fragment key={step.path}>
                <Link
                  to={step.path}
                  style={
                    isActive
                      ? { backgroundColor: '#EAB308', color: '#172016' }
                      : { color: 'rgba(247, 244, 234, 0.75)' }
                  }
                  className={`px-2.5 py-0.5 text-[11px] font-mono font-bold transition-all ${
                    isActive
                      ? 'bg-gold text-charcoal shadow-bauhaus-sm border border-charcoal'
                      : 'text-cream/70 hover:text-white hover:underline'
                  }`}
                >
                  {step.label}
                </Link>
                {idx < demoPipeline.length - 1 && (
                  <span style={{ color: 'rgba(247, 244, 234, 0.4)' }} className="text-cream/40 text-[10px] font-mono">›</span>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      <div className="flex flex-1 relative">
        {/* Sidebar */}
        <Sidebar
          isOpen={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
          currentRole={currentRole}
        />

        {/* Main Content Area */}
        <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
          <Header
            onOpenMobileMenu={() => setMobileMenuOpen(true)}
            currentRole={currentRole}
            onRoleChange={onRoleChange}
          />

          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
