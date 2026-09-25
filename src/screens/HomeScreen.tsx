import React from 'react';
import { useApp } from '../context/AppContext';
import { DisclaimerBanner } from '../components/DisclaimerBanner';
import {
  BookOpen,
  TestTube2,
  HeartHandshake,
  MapPin,
  Calendar,
  BellRing,
  Map,
  LifeBuoy,
  Phone,
  Instagram,
  PhoneCall,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  ChevronRight,
  Sliders,
  CheckCircle,
} from 'lucide-react';

export const HomeScreen: React.FC = () => {
  const {
    navigateTo,
    settings,
    currentUser,
    camps,
    reminders,
  } = useApp();

  // 10 Requested Dashboard Cards
  const dashboardCards = [
    {
      id: 'awareness',
      title: 'HIV Awareness',
      subtitle: 'Understand facts, transmission & debunk myths',
      icon: BookOpen,
      gradient: 'from-teal-600 to-emerald-700',
      badge: 'Educational',
      badgeColor: 'bg-teal-100 text-teal-800',
    },
    {
      id: 'testing',
      title: 'HIV Testing',
      subtitle: 'Why test, test types & absolute confidentiality',
      icon: TestTube2,
      gradient: 'from-cyan-600 to-blue-700',
      badge: 'Free & Private',
      badgeColor: 'bg-cyan-100 text-cyan-800',
    },
    {
      id: 'treatment',
      title: 'Treatment & Care',
      subtitle: 'Antiretroviral therapy (ART) & healthy living',
      icon: HeartHandshake,
      gradient: 'from-indigo-600 to-violet-700',
      badge: 'Life-Saving',
      badgeColor: 'bg-indigo-100 text-indigo-800',
    },
    {
      id: 'centers',
      title: 'Find HIV Centers',
      subtitle: 'Lyari General, Civil Hospital & Karachi clinics',
      icon: MapPin,
      gradient: 'from-emerald-600 to-teal-800',
      badge: 'Karachi Hubs',
      badgeColor: 'bg-emerald-100 text-emerald-800',
    },
    {
      id: 'camps',
      title: 'Camp Updates',
      subtitle: 'Free voluntary screening camps across districts',
      icon: Calendar,
      gradient: 'from-amber-600 to-orange-700',
      badge: `${camps.filter((c) => !c.isPast).length} Upcoming`,
      badgeColor: 'bg-amber-100 text-amber-900',
    },
    {
      id: 'reminders',
      title: 'Medicine Reminder',
      subtitle: 'Private daily adherence alarm for prescribed care',
      icon: BellRing,
      gradient: 'from-sky-600 to-cyan-700',
      badge: `${reminders.length} Active`,
      badgeColor: 'bg-sky-100 text-sky-900',
    },
    {
      id: 'districts',
      title: 'Karachi Districts',
      subtitle: 'Central, East, South, West, Korangi, Malir, Keamari',
      icon: Map,
      gradient: 'from-purple-600 to-indigo-800',
      badge: '7 Districts',
      badgeColor: 'bg-purple-100 text-purple-900',
    },
    {
      id: 'get_help',
      title: 'Get Help',
      subtitle: 'Immediate triage, confidential counseling & FAQs',
      icon: LifeBuoy,
      gradient: 'from-rose-600 to-pink-700',
      badge: 'Confidential',
      badgeColor: 'bg-rose-100 text-rose-900',
    },
    {
      id: 'contact',
      title: 'Contact ZAB-Rabta',
      subtitle: `Official helpline: ${settings.contactNumber}`,
      icon: Phone,
      gradient: 'from-teal-700 to-slate-800',
      badge: 'Direct Call',
      badgeColor: 'bg-slate-100 text-slate-800',
    },
    {
      id: 'instagram',
      title: 'Instagram',
      subtitle: 'Follow Zab Rabta on Instagram for live updates',
      icon: Instagram,
      gradient: 'from-pink-600 via-rose-600 to-amber-600',
      badge: 'Social',
      badgeColor: 'bg-pink-100 text-pink-900',
    },
  ];

  return (
    <div className="p-4 space-y-4 pb-12 max-w-2xl mx-auto">
      {/* Announcement Banner */}
      {settings.announcement && (
        <div className="bg-gradient-to-r from-teal-50 to-cyan-50 border border-teal-200/80 rounded-2xl p-3 flex items-center justify-between gap-3 shadow-2xs">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="w-2 h-2 rounded-full bg-teal-500 animate-ping shrink-0" />
            <p className="text-xs text-teal-950 font-medium truncate">
              {settings.announcement}
            </p>
          </div>
          <button
            onClick={() => navigateTo('camps')}
            className="text-[11px] font-bold text-teal-800 hover:text-teal-950 shrink-0 flex items-center gap-0.5 underline"
          >
            View Camps <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Prominent Quick Helpline Card */}
      <div className="bg-gradient-to-br from-teal-800 via-teal-900 to-slate-950 text-white rounded-3xl p-5 shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-44 h-44 rounded-full bg-teal-500/15 blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="bg-emerald-500/30 text-emerald-300 border border-emerald-400/40 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                Karachi HIV Helpline
              </span>
              <span className="text-[10px] text-teal-200">100% Confidential</span>
            </div>
            <h2 className="text-xl font-black tracking-tight text-white">
              Need Direct Guidance?
            </h2>
            <p className="text-xs text-teal-100/80 max-w-sm">
              Speak securely with ZAB-Rabta counselors regarding free testing, treatment centers, or community camps.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href={`tel:${settings.contactNumber}`}
              className="py-2.5 px-4 bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-slate-950 text-xs font-black rounded-xl shadow-md flex items-center gap-1.5 transition-all active:scale-95"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call {settings.contactNumber}</span>
            </a>

            <a
              href={`https://wa.me/${settings.whatsappNumber}?text=Hello%20ZAB-Rabta%2C%20I%20am%20seeking%20confidential%20information%20regarding%20HIV%20services%20in%20Karachi.`}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-3 bg-white/15 hover:bg-white/25 text-white text-xs font-bold rounded-xl border border-white/20 transition-all flex items-center gap-1"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Admin Quick Switch Alert */}
      {currentUser?.role === 'admin' && (
        <div className="bg-amber-50 border border-amber-300 rounded-2xl p-3 flex items-center justify-between gap-2 shadow-2xs">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-200 flex items-center justify-center text-amber-900 font-bold">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-amber-950">Administrator Access Active</p>
              <p className="text-[11px] text-amber-800">You can edit centers, camps, districts & contact info.</p>
            </div>
          </div>
          <button
            onClick={() => navigateTo('admin')}
            className="text-xs font-bold bg-amber-500 hover:bg-amber-600 text-slate-950 px-3 py-1.5 rounded-xl transition-all shadow-xs"
          >
            Admin Panel
          </button>
        </div>
      )}

      {/* Featured Awareness Pamphlet Teaser */}
      <div
        onClick={() => navigateTo('awareness')}
        className="bg-gradient-to-r from-amber-500 via-rose-500 to-amber-600 p-0.5 rounded-3xl shadow-md cursor-pointer transition-all hover:scale-[1.01]"
      >
        <div className="bg-white rounded-[22px] p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center shrink-0 border border-amber-300">
              <span className="text-xl">🛡️</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-black uppercase tracking-wider bg-rose-100 text-rose-800 px-2 py-0.5 rounded-full">
                  Community Health Guide
                </span>
                <span className="text-[10px] font-bold text-amber-800">#khamoshijurmhai</span>
              </div>
              <h4 className="text-sm font-black text-slate-900 mt-0.5">
                HIV and AIDS: How to keep you and your family safe
              </h4>
              <p className="text-[11px] text-slate-500">
                10-card illustrated public guide on hospital syringe safety, symptoms & prevention.
              </p>
            </div>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigateTo('awareness');
            }}
            className="w-full sm:w-auto px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-black rounded-xl shrink-0 flex items-center justify-center gap-1 cursor-pointer"
          >
            <span>View Pamphlet</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Grid: 10 Large Cards / Buttons as Requested */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
            ZAB-Rabta Services & Resources
          </h3>
          <span className="text-[11px] font-semibold text-slate-500">10 Modules</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {dashboardCards.map((card) => {
            const Icon = card.icon;
            return (
              <button
                key={card.id}
                onClick={() => navigateTo(card.id as any)}
                className="group relative bg-white border border-slate-200/90 hover:border-teal-300 rounded-3xl p-4 text-left shadow-xs hover:shadow-md transition-all duration-200 active:scale-[0.98] flex items-start gap-3.5 overflow-hidden"
              >
                {/* Visual Icon Accent */}
                <div
                  className={`w-13 h-13 rounded-2xl bg-gradient-to-br ${card.gradient} text-white flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform duration-200`}
                >
                  <Icon className="w-6 h-6 stroke-[2]" />
                </div>

                <div className="flex-1 min-w-0 pr-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${card.badgeColor}`}
                    >
                      {card.badge}
                    </span>
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-base leading-tight group-hover:text-teal-700 transition-colors">
                    {card.title}
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-snug">
                    {card.subtitle}
                  </p>
                </div>

                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-300 group-hover:text-teal-600 group-hover:translate-x-0.5 transition-all">
                  <ChevronRight className="w-5 h-5" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Karachi Districts Highlight Strip */}
      <div className="bg-slate-900 text-white rounded-3xl p-4.5 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Map className="w-4 h-4 text-teal-400" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-teal-200">
              Karachi Coverage Districts
            </h4>
          </div>
          <button
            onClick={() => navigateTo('districts')}
            className="text-[11px] font-semibold text-teal-300 hover:text-white flex items-center gap-1"
          >
            View All (7) <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <p className="text-xs text-slate-300">
          ZAB-Rabta coordinates testing and awareness across all 7 Karachi districts: Central, East,
          South, West, Korangi, Malir, and Keamari.
        </p>

        <div className="flex flex-wrap gap-1.5 pt-1">
          {[
            'Karachi South (Civil & Lyari)',
            'Karachi Central',
            'Karachi East',
            'Karachi West',
            'Korangi',
            'Malir',
            'Keamari',
          ].map((d) => (
            <span
              key={d}
              onClick={() => navigateTo('districts')}
              className="cursor-pointer text-[10px] font-semibold bg-white/10 hover:bg-white/20 text-slate-200 px-2.5 py-1 rounded-full transition-colors"
            >
              {d}
            </span>
          ))}
        </div>
      </div>

      {/* Prominent Mandatory Health Safety Disclaimer */}
      <DisclaimerBanner />
    </div>
  );
};
