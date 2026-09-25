import React from 'react';
import { useApp } from '../context/AppContext';
import { Logo } from './Logo';
import {
  BookOpen,
  TestTube2,
  HeartHandshake,
  Map,
  LifeBuoy,
  Phone,
  Instagram,
  ShieldCheck,
  Info,
  Sliders,
  LogOut,
  LogIn,
  X,
  PhoneCall,
  UserCheck,
} from 'lucide-react';

export const Drawer: React.FC = () => {
  const {
    isDrawerOpen,
    setIsDrawerOpen,
    navigateTo,
    currentUser,
    logout,
    settings,
  } = useApp();

  if (!isDrawerOpen) return null;

  const menuSections = [
    { id: 'awareness', label: 'HIV Awareness', icon: BookOpen, desc: 'Facts, myths, transmission & prevention' },
    { id: 'testing', label: 'HIV Testing', icon: TestTube2, desc: 'Why test, test types & confidentiality' },
    { id: 'treatment', label: 'Treatment & Care', icon: HeartHandshake, desc: 'ART education, adherence & health' },
    { id: 'districts', label: 'Karachi Districts', icon: Map, desc: 'Coordinators, 7 districts & services' },
    { id: 'get_help', label: 'Get Help', icon: LifeBuoy, desc: 'Urgent assistance & confidential triage' },
    { id: 'contact', label: 'Contact ZAB-Rabta', icon: Phone, desc: `Helpline: ${settings.contactNumber}` },
    { id: 'instagram', label: 'Instagram', icon: Instagram, desc: 'Follow ZAB-Rabta on Instagram' },
    { id: 'privacy', label: 'Privacy Policy & Terms', icon: ShieldCheck, desc: 'Confidentiality & health disclaimers' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={() => setIsDrawerOpen(false)}
      />

      {/* Drawer Panel */}
      <div className="relative w-80 max-w-[85vw] bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-250">
        {/* Drawer Header */}
        <div className="bg-gradient-to-br from-teal-700 via-teal-800 to-cyan-950 p-5 text-white relative">
          <button
            onClick={() => setIsDrawerOpen(false)}
            className="absolute top-4 right-4 p-1.5 rounded-full text-teal-200 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close Drawer"
          >
            <X className="w-5 h-5" />
          </button>

          <Logo size="md" light={true} />
          <p className="text-xs text-teal-100/90 mt-2 font-light">
            Confidential HIV support, testing information & care for Karachi citizens.
          </p>

          {/* User Status Card */}
          <div className="mt-4 pt-3 border-t border-teal-600/40 flex items-center justify-between">
            {currentUser ? (
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-teal-500/40 border border-teal-300/40 flex items-center justify-center font-bold text-xs text-white">
                  {currentUser.name.charAt(0).toUpperCase()}
                </div>
                <div className="leading-tight">
                  <p className="font-semibold text-xs text-white truncate max-w-[130px]">
                    {currentUser.name}
                  </p>
                  <p className="text-[10px] text-teal-200 flex items-center gap-1">
                    <UserCheck className="w-3 h-3 text-teal-300" />
                    {currentUser.role === 'admin' ? 'Administrator' : 'Private Member'}
                  </p>
                </div>
              </div>
            ) : (
              <button
                onClick={() => navigateTo('auth')}
                className="text-xs font-semibold text-white bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5"
              >
                <LogIn className="w-3.5 h-3.5" />
                Sign In / Register
              </button>
            )}

            {currentUser?.role === 'admin' && (
              <button
                onClick={() => navigateTo('admin')}
                className="bg-amber-400 text-slate-950 text-[11px] font-bold px-2 py-1 rounded-lg flex items-center gap-1 shadow-xs hover:bg-amber-300"
              >
                <Sliders className="w-3 h-3" />
                Admin
              </button>
            )}
          </div>
        </div>

        {/* Menu Items */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          {menuSections.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => navigateTo(item.id as any)}
                className="w-full flex items-center gap-3.5 px-3 py-2.5 rounded-xl text-left hover:bg-teal-50/80 group transition-colors"
              >
                <div className="w-9 h-9 rounded-xl bg-slate-100 group-hover:bg-teal-100 text-slate-700 group-hover:text-teal-700 flex items-center justify-center shrink-0 transition-colors">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-800 group-hover:text-teal-900 truncate">
                    {item.label}
                  </p>
                  <p className="text-[11px] text-slate-500 truncate">{item.desc}</p>
                </div>
              </button>
            );
          })}

          {currentUser?.role === 'admin' && (
            <button
              onClick={() => navigateTo('admin')}
              className="w-full flex items-center gap-3.5 px-3 py-2.5 rounded-xl text-left bg-amber-50 hover:bg-amber-100 text-amber-950 transition-colors border border-amber-200/70"
            >
              <div className="w-9 h-9 rounded-xl bg-amber-200/80 text-amber-800 flex items-center justify-center shrink-0">
                <Sliders className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-amber-950">Admin Panel</p>
                <p className="text-[11px] text-amber-800">Manage centers, camps, coordinators</p>
              </div>
            </button>
          )}
        </div>

        {/* Drawer Footer with Quick Call */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 space-y-2.5">
          <a
            href={`tel:${settings.contactNumber}`}
            className="w-full py-2.5 px-3 bg-gradient-to-r from-teal-600 to-cyan-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-xs hover:shadow-md transition-all active:scale-98"
          >
            <PhoneCall className="w-4 h-4 animate-pulse" />
            Call ZAB-Rabta: {settings.contactNumber}
          </a>

          {currentUser && (
            <button
              onClick={logout}
              className="w-full py-2 px-3 text-slate-600 hover:text-rose-600 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              Sign Out Securely
            </button>
          )}

          <p className="text-[10px] text-center text-slate-400 font-medium">
            ZAB-Rabta • Karachi Community Health Initiative
          </p>
        </div>
      </div>
    </div>
  );
};
