import React from 'react';
import { useApp } from '../context/AppContext';
import { Logo } from '../components/Logo';
import { ShieldCheck, Heart, ArrowRight, PhoneCall, Sparkles, MapPin } from 'lucide-react';

export const SplashScreen: React.FC = () => {
  const { navigateTo, settings, currentUser } = useApp();

  return (
    <div className="min-h-full flex flex-col justify-between bg-gradient-to-b from-teal-900 via-teal-800 to-slate-950 text-white p-6 relative overflow-hidden select-none">
      {/* Decorative background glow circles */}
      <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-teal-500/20 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -left-20 w-64 h-64 rounded-full bg-cyan-500/15 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 right-0 w-72 h-72 rounded-full bg-emerald-500/20 blur-3xl pointer-events-none" />

      {/* Top bar with quick helpline */}
      <div className="flex items-center justify-between z-10 pt-2">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-teal-200 bg-white/10 px-3 py-1 rounded-full backdrop-blur-xs flex items-center gap-1.5">
          <MapPin className="w-3 h-3 text-teal-300" /> Karachi, Pakistan
        </span>

        <a
          href={`tel:${settings.contactNumber}`}
          className="text-xs text-teal-100 bg-teal-700/60 hover:bg-teal-700 px-3 py-1.5 rounded-full flex items-center gap-1.5 backdrop-blur-xs border border-teal-500/30 transition-colors"
        >
          <PhoneCall className="w-3 h-3 text-teal-300 animate-pulse" />
          <span>{settings.contactNumber}</span>
        </a>
      </div>

      {/* Center Hero */}
      <div className="my-auto py-10 flex flex-col items-center text-center z-10 max-w-sm mx-auto">
        {/* Emblem badge */}
        <div className="relative mb-6">
          <div className="p-1.5 rounded-full bg-gradient-to-br from-amber-400 via-teal-400 to-cyan-500 shadow-2xl shadow-teal-500/40 animate-in zoom-in-75 duration-500">
            <Logo size="xl" showText={false} />
          </div>
          <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-slate-950 p-1.5 rounded-full shadow-lg border-2 border-slate-900">
            <ShieldCheck className="w-4 h-4" />
          </div>
        </div>

        <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2">
          ZAB-Rabta
        </h1>
        <p className="text-base font-semibold text-teal-200 tracking-wide mb-4">
          HIV Awareness, Testing & Care
        </p>

        <p className="text-xs text-teal-100/80 leading-relaxed max-w-xs mb-6">
          A confidential, compassionate platform connecting Karachi citizens with accurate medical
          information, free testing centers, community camps, and private health adherence tools.
        </p>

        {/* Feature pillars */}
        <div className="grid grid-cols-3 gap-2.5 w-full text-center mb-4">
          <div className="bg-white/10 backdrop-blur-xs p-2.5 rounded-2xl border border-white/10">
            <span className="text-base block mb-0.5">🔒</span>
            <span className="text-[11px] font-bold text-white block">100% Private</span>
            <span className="text-[9.5px] text-teal-200">No public data</span>
          </div>
          <div className="bg-white/10 backdrop-blur-xs p-2.5 rounded-2xl border border-white/10">
            <span className="text-base block mb-0.5">🏥</span>
            <span className="text-[11px] font-bold text-white block">Karachi Centers</span>
            <span className="text-[9.5px] text-teal-200">Civil & Lyari</span>
          </div>
          <div className="bg-white/10 backdrop-blur-xs p-2.5 rounded-2xl border border-white/10">
            <span className="text-base block mb-0.5">⏰</span>
            <span className="text-[11px] font-bold text-white block">Reminders</span>
            <span className="text-[9.5px] text-teal-200">Private & local</span>
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="z-10 space-y-3 pb-4 max-w-sm mx-auto w-full">
        <button
          onClick={() => navigateTo('home')}
          className="w-full py-4 px-6 bg-gradient-to-r from-teal-400 via-teal-300 to-cyan-300 hover:from-teal-300 hover:to-cyan-200 text-slate-950 font-extrabold rounded-2xl shadow-xl shadow-teal-500/25 flex items-center justify-center gap-2.5 text-base transition-all active:scale-98 group cursor-pointer"
        >
          <span>Get Started</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>

        {!currentUser && (
          <div className="flex items-center justify-center gap-4 text-xs pt-1">
            <button
              onClick={() => navigateTo('auth')}
              className="text-teal-200 hover:text-white underline font-semibold transition-colors"
            >
              Sign In to Your Account
            </button>
            <span className="text-teal-400/40">•</span>
            <button
              onClick={() => navigateTo('awareness')}
              className="text-teal-200 hover:text-white underline font-semibold transition-colors"
            >
              Learn About HIV
            </button>
          </div>
        )}

        {/* Safety Note */}
        <p className="text-[10px] text-center text-teal-300/70 pt-2 leading-tight">
          Strictly confidential • For educational & support purposes only
        </p>
      </div>
    </div>
  );
};
