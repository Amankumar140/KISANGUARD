import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useRole } from '../../context/RoleContext';
import { useToast } from './Toast';
import { getNotifications } from '../../data/mockNotifications';
import { 
  Search, 
  Bell, 
  Menu, 
  ChevronDown, 
  ArrowLeftRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Header = ({ onOpenMobileMenu, currentRole: propRole, onRoleChange: propRoleChange }) => {
  const { language, setLanguage, t } = useLanguage();
  const { addToast } = useToast();
  const roleContext = useRole();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();

  const currentRole = propRole || roleContext.currentRole || 'buyer';
  const onRoleChange = propRoleChange || roleContext.setRole;
  const currentUser = roleContext.currentUser;

  const handleLanguageChange = (newLang) => {
    if (newLang !== language) {
      setLanguage(newLang);
      addToast(
        newLang === 'hi' 
          ? 'भाषा बदलकर हिन्दी कर दी गई।' 
          : 'Language changed to English.',
        'info'
      );
    }
  };

  const notifications = getNotifications(currentRole);
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="sticky top-9 z-20 h-14 bg-white border-b-3 border-charcoal px-4 sm:px-6 flex items-center justify-between shadow-bauhaus-sm">
      {/* Left side: Mobile menu toggle + Global Search */}
      <div className="flex items-center gap-3 flex-1 max-w-lg">
        <button
          onClick={onOpenMobileMenu}
          className="lg:hidden p-1.5 border-2 border-charcoal bg-white shadow-bauhaus-sm text-charcoal hover:bg-gold transition-colors"
          aria-label="Open navigation"
        >
          <Menu className="w-5 h-5 stroke-[2.5]" />
        </button>

        <div className="relative w-full max-w-sm hidden sm:block">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-charcoal stroke-[2.5]" />
          <input
            type="text"
            placeholder={t('nav.searchPlaceholder')}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-cream border-2 border-charcoal text-charcoal placeholder-charcoal/50 font-medium focus:outline-none focus:bg-white focus:shadow-bauhaus-sm transition-all"
          />
        </div>
      </div>

      {/* Right side controls */}
      <div className="flex items-center gap-3">
        {/* Switch Role Quick Button (Buyer <-> Farmer) */}
        <button
          onClick={() => {
            const nextRole = currentRole === 'buyer' ? 'farmer' : 'buyer';
            if (onRoleChange) onRoleChange(nextRole);
            navigate(nextRole === 'buyer' ? '/buyer' : '/farmer');
          }}
          className="hidden md:flex items-center gap-1.5 px-3 py-1 text-xs font-black uppercase tracking-wider text-charcoal bg-white hover:bg-gold border-2 border-charcoal shadow-bauhaus-sm transition-all active:translate-x-[2px] active:translate-y-[2px]"
          title="Switch view between Buyer and Farmer mode"
        >
          <ArrowLeftRight className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>{currentRole === 'buyer' ? t('nav.farmerPortal') : t('nav.buyerPortal')}</span>
        </button>

        {/* BAUHAUS LANGUAGE TOGGLE [ EN | हिन्दी ] WITH BULLETPROOF INLINE STYLES */}
        <div className="flex border-2 border-charcoal bg-cream shadow-bauhaus-sm">
          <button
            type="button"
            onClick={() => handleLanguageChange('en')}
            style={
              language === 'en'
                ? { backgroundColor: '#14532D', color: '#FFFFFF' }
                : { backgroundColor: '#FFFFFF', color: '#172016' }
            }
            className={`px-2.5 py-0.5 text-xs font-black transition-colors ${
              language === 'en'
                ? 'bg-forest text-white'
                : 'bg-white text-charcoal hover:bg-gold/30'
            }`}
          >
            EN
          </button>
          <button
            type="button"
            onClick={() => handleLanguageChange('hi')}
            style={
              language === 'hi'
                ? { backgroundColor: '#14532D', color: '#FFFFFF' }
                : { backgroundColor: '#FFFFFF', color: '#172016' }
            }
            className={`px-2.5 py-0.5 text-xs font-black transition-colors border-l-2 border-charcoal ${
              language === 'hi'
                ? 'bg-forest text-white'
                : 'bg-white text-charcoal hover:bg-gold/30'
            }`}
          >
            हिन्दी
          </button>
        </div>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-1.5 border-2 border-charcoal bg-white shadow-bauhaus-sm text-charcoal hover:bg-gold relative transition-all active:translate-x-[1px] active:translate-y-[1px]"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4 stroke-[2.5]" />
            <span
              style={{ backgroundColor: '#EAB308' }}
              className="absolute top-1 right-1 w-2 h-2 bg-gold rounded-full border border-charcoal"
            ></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white border-3 border-charcoal shadow-bauhaus-lg py-1 z-50 animate-in fade-in">
              <div className="px-3 py-2 border-b-2 border-charcoal flex items-center justify-between bg-cream">
                <span className="text-xs font-black uppercase text-charcoal tracking-wider">
                  {t('nav.notifications')}
                </span>
                <span className="text-[10px] font-mono font-bold text-forest cursor-pointer hover:underline">
                  {language === 'hi' ? 'चिह्नित करें' : 'Mark all read'}
                </span>
              </div>
              <div className="divide-y-2 divide-charcoal/10 max-h-64 overflow-y-auto">
                {notifications.map((n) => (
                  <div key={n.id} className="p-3 hover:bg-cream transition-colors">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-xs font-black text-charcoal">
                        {language === 'hi' ? (n.titleHi || n.title) : n.title}
                      </span>
                      <span className="text-[10px] font-mono text-charcoal/60">
                        {language === 'hi' ? (n.timeHi || n.time) : n.time}
                      </span>
                    </div>
                    <p className="text-xs text-charcoal/80 font-medium leading-snug">
                      {language === 'hi' ? (n.descHi || n.desc) : n.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile menu */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 p-1 border-2 border-charcoal bg-white hover:bg-cream shadow-bauhaus-sm transition-all text-left"
          >
            <div
              style={{ backgroundColor: '#14532D', color: '#FFFFFF' }}
              className="w-7 h-7 bg-forest text-white border border-charcoal flex items-center justify-center font-mono font-black text-xs"
            >
              {currentUser?.avatar || (currentRole === 'buyer' ? 'PS' : 'RK')}
            </div>
            <div className="hidden lg:block pr-1">
              <div className="text-xs font-black uppercase text-charcoal leading-tight">
                {language === 'hi' ? (currentUser?.nameHi || currentUser?.name) : (currentUser?.name || (currentRole === 'buyer' ? 'Priya S.' : 'Ramesh K.'))}
              </div>
              <div className="text-[10px] font-mono text-forest font-bold leading-tight">
                {currentRole === 'buyer' ? t('roles.buyer') : t('roles.farmer')}
              </div>
            </div>
            <ChevronDown className="w-3 h-3 text-charcoal hidden lg:block" />
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white border-3 border-charcoal shadow-bauhaus-lg py-1 z-50 text-xs animate-in fade-in">
              <div className="px-3 py-2 border-b-2 border-charcoal bg-cream">
                <p className="font-black uppercase text-charcoal">
                  {language === 'hi' ? (currentUser?.organizationHi || currentUser?.organization) : (currentUser?.organization || (currentRole === 'buyer' ? 'FreshBite Restaurants' : 'Dadri Farm Gate #1'))}
                </p>
                <p className="text-[11px] font-mono text-charcoal/60">
                  {language === 'hi' ? (currentUser?.locationHi || currentUser?.location) : (currentUser?.location || 'Sector 62, Noida')}
                </p>
              </div>
              <button
                onClick={() => {
                  setShowUserMenu(false);
                  navigate('/login');
                }}
                className="w-full text-left px-3 py-2 hover:bg-gold text-charcoal font-bold transition-colors"
              >
                {t('brand.demoRole')}
              </button>
              <button
                onClick={() => {
                  setShowUserMenu(false);
                  navigate('/');
                }}
                className="w-full text-left px-3 py-2 hover:bg-earth hover:text-white text-charcoal font-bold transition-colors border-t border-charcoal/20"
              >
                {t('nav.logout')}
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
