import React from 'react';
import { useApp } from '../context/AppContext';
import { ScreenId } from '../types';
import { Home, MapPin, Calendar, BellRing, User } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { currentScreen, navigateTo, reminders, currentUser } = useApp();

  const pendingReminders = reminders.filter((r) => !r.takenToday).length;

  const navItems: { id: ScreenId; label: string; icon: React.FC<{ className?: string }>; badge?: number }[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'centers', label: 'Centers', icon: MapPin },
    { id: 'camps', label: 'Camps', icon: Calendar },
    {
      id: 'reminders',
      label: 'Reminders',
      icon: BellRing,
      badge: pendingReminders > 0 ? pendingReminders : undefined,
    },
    { id: currentUser ? 'account' : 'auth', label: currentUser ? 'Account' : 'Login', icon: User },
  ];

  return (
    <nav className="sticky bottom-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-lg px-2 py-1.5 pb-safe">
      <div className="grid grid-cols-5 items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive =
            currentScreen === item.id ||
            (item.id === 'auth' && currentScreen === 'auth') ||
            (item.id === 'account' && currentScreen === 'account');

          const IconComponent = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => navigateTo(item.id)}
              className={`flex flex-col items-center justify-center py-1 px-1 rounded-2xl transition-all duration-200 active:scale-95 group relative ${
                isActive ? 'text-teal-700' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {/* Material 3 Active pill background */}
              <div
                className={`px-4 py-1 rounded-full flex items-center justify-center transition-all ${
                  isActive ? 'bg-teal-100/90 text-teal-800 scale-105' : 'bg-transparent'
                }`}
              >
                <div className="relative">
                  <IconComponent className={`w-5 h-5 ${isActive ? 'stroke-[2.4]' : 'stroke-[1.8]'}`} />
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="absolute -top-1.5 -right-2.5 min-w-4 h-4 px-1 bg-amber-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </div>
              </div>
              <span
                className={`text-[10.5px] mt-0.5 tracking-tight font-medium ${
                  isActive ? 'font-bold text-teal-900' : 'text-slate-500'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
