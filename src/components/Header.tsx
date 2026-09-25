import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Logo } from './Logo';
import {
  Menu,
  ChevronLeft,
  Bell,
  PhoneCall,
  ShieldCheck,
  Smartphone,
  Maximize2,
  X,
} from 'lucide-react';

interface HeaderProps {
  onOpenNotifications?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenNotifications }) => {
  const {
    currentScreen,
    goBack,
    setIsDrawerOpen,
    currentUser,
    settings,
    reminders,
    camps,
    isMobileFrame,
    toggleMobileFrame,
  } = useApp();

  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })
      );
    };
    update();
    const interval = setInterval(update, 30000);
    return () => clearInterval(interval);
  }, []);

  const showBackButton = currentScreen !== 'home' && currentScreen !== 'splash';

  // Compute pending reminders for badge
  const pendingRemindersCount = reminders.filter((r) => !r.takenToday).length;
  const upcomingCampsCount = camps.filter((c) => !c.isPast).length;
  const badgeTotal = pendingRemindersCount + (upcomingCampsCount > 0 ? 1 : 0);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* Android System Status Bar Simulation */}
      <div className="bg-slate-900 text-slate-300 text-[11px] font-medium px-4 py-1 flex items-center justify-between select-none tracking-tight">
        <span>{currentTime || '12:00 PM'}</span>
        <div className="flex items-center gap-2">
          {currentUser?.role === 'admin' && (
            <span className="text-[10px] bg-teal-500/20 text-teal-300 px-1.5 py-0.5 rounded-full font-semibold border border-teal-500/40">
              Admin Mode
            </span>
          )}
          <span>Karachi, PK</span>
          <div className="flex items-center gap-1">
            <span className="text-[10px]">5G</span>
            {/* Battery bar */}
            <div className="w-5 h-2.5 border border-slate-400 rounded-xs p-0.5 flex items-center">
              <div className="h-full w-4/5 bg-teal-400 rounded-2xs"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main App Bar */}
      <div className="px-3.5 py-2.5 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {showBackButton ? (
            <button
              onClick={goBack}
              aria-label="Go Back"
              className="p-2 -ml-1 text-slate-700 hover:text-teal-700 hover:bg-slate-100 rounded-xl transition-colors active:scale-95 flex items-center"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          ) : (
            <button
              onClick={() => setIsDrawerOpen(true)}
              aria-label="Open Navigation Menu"
              className="p-2 -ml-1 text-slate-700 hover:text-teal-700 hover:bg-slate-100 rounded-xl transition-colors active:scale-95"
            >
              <Menu className="w-6 h-6" />
            </button>
          )}

          <div className="flex items-center gap-1.5">
            <Logo size="sm" showText={false} />
            <div className="leading-tight">
              <h1 className="font-bold text-slate-900 text-base tracking-tight flex items-center gap-1.5">
                ZAB-Rabta
                {currentUser?.role === 'admin' && (
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-semibold px-1.5 py-0.2 rounded-md">
                    Admin
                  </span>
                )}
              </h1>
              <p className="text-[10px] text-teal-700 font-semibold tracking-wide">
                Karachi HIV Support
              </p>
            </div>
          </div>
        </div>

        {/* Right Action Icons */}
        <div className="flex items-center gap-1.5">
          {/* Direct helpline phone button */}
          <a
            href={`tel:${settings.contactNumber}`}
            className="p-2 text-rose-600 hover:bg-rose-50 rounded-xl transition-colors active:scale-95 relative"
            title={`Call ZAB-Rabta Helpline (${settings.contactNumber})`}
          >
            <PhoneCall className="w-5 h-5" />
          </a>

          {/* Notifications button */}
          <button
            onClick={onOpenNotifications}
            className="p-2 text-slate-700 hover:text-teal-700 hover:bg-slate-100 rounded-xl transition-colors active:scale-95 relative"
            title="Notifications & Reminders"
          >
            <Bell className="w-5 h-5" />
            {badgeTotal > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-teal-600 text-white text-[9px] font-bold rounded-full flex items-center justify-center animate-pulse">
                {badgeTotal}
              </span>
            )}
          </button>

          {/* Toggle frame button */}
          <button
            onClick={toggleMobileFrame}
            className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors hidden sm:flex items-center"
            title={isMobileFrame ? 'Expand to Full Width' : 'Switch to Mobile Frame'}
          >
            {isMobileFrame ? <Maximize2 className="w-4 h-4" /> : <Smartphone className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
};
