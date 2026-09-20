import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useRole } from '../../context/RoleContext';
import { getNavItems, BADGE_STYLES } from '../../config/roleConfig';
import KisanGuardLogo from './KisanGuardLogo';
import {
  LayoutDashboard,
  Sprout,
  TrendingUp,
  PackageCheck,
  BrainCircuit,
  Receipt,
  Leaf,
  Store,
  FilePlus2,
  GitMerge,
  Truck,
  X,
} from 'lucide-react';

const ICON_MAP = {
  LayoutDashboard,
  Sprout,
  TrendingUp,
  PackageCheck,
  BrainCircuit,
  Receipt,
  Leaf,
  Store,
  FilePlus2,
  GitMerge,
  Truck,
};

export const Sidebar = ({ isOpen, onClose }) => {
  const { language } = useLanguage();
  const { currentRole } = useRole();
  const location = useLocation();
  const navItems = getNavItems(currentRole);

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-charcoal/40 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Panel */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 lg:top-9 lg:z-30 w-64 bg-cream border-r-3 border-charcoal flex flex-col transition-transform duration-200 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Sidebar Header */}
        <div className="h-14 flex items-center justify-between px-5 border-b-3 border-charcoal bg-white shrink-0">
          <div className="flex items-center gap-2.5">
            <KisanGuardLogo className="w-8 h-8" />
            <div>
              <span className="text-sm font-black text-charcoal uppercase tracking-tight block leading-none">
                {language === 'hi' ? 'किसानगार्ड' : 'KisanGuard'}
              </span>
              <span className="text-[10px] font-mono font-bold text-charcoal/60 uppercase tracking-wider">
                {currentRole === 'farmer'
                  ? (language === 'hi' ? 'किसान पोर्टल' : 'FARMER PORTAL')
                  : (language === 'hi' ? 'खरीदार पोर्टल' : 'BUYER PORTAL')
                }
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="lg:hidden p-1.5 text-charcoal border-2 border-charcoal hover:bg-gold/30 transition-colors"
          >
            <X className="w-4 h-4 stroke-[3]" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto py-3 px-3 space-y-0.5">
          {navItems.map((item) => {
            const Icon = ICON_MAP[item.icon] || LayoutDashboard;
            const label = language === 'hi' ? item.labelHi : item.labelEn;
            const isActive = location.pathname === item.path;
            const badgeText = item.badge
              ? (language === 'hi' && item.badgeHi ? item.badgeHi : item.badge)
              : null;
            const badgeStyle = item.badgeColor ? BADGE_STYLES[item.badgeColor] : null;

            return (
              <NavLink
                key={item.key}
                to={item.path}
                onClick={onClose}
                className={`flex items-center justify-between px-3 py-2.5 text-xs font-bold uppercase tracking-wider transition-all border-2 ${
                  isActive
                    ? 'bg-forest text-white border-charcoal shadow-bauhaus-sm'
                    : 'bg-transparent text-charcoal border-transparent hover:bg-white hover:border-charcoal/20'
                }`}
                style={isActive ? { backgroundColor: '#14532D', color: '#FFFFFF' } : {}}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4 stroke-[2.5]" />
                  <span>{label}</span>
                </div>

                {badgeText && badgeStyle && (
                  <span
                    style={{
                      backgroundColor: isActive ? 'rgba(234,179,8,0.3)' : badgeStyle.bg,
                      color: isActive ? '#FFFFFF' : badgeStyle.color,
                      borderColor: isActive ? 'rgba(255,255,255,0.3)' : badgeStyle.border,
                    }}
                    className="text-[9px] font-mono font-black px-1.5 py-0.5 border"
                  >
                    {badgeText}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>

         
        
      </aside>
    </>
  );
};

export default Sidebar;
