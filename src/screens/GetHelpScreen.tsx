import React from 'react';
import { useApp } from '../context/AppContext';
import { DisclaimerBanner } from '../components/DisclaimerBanner';
import {
  LifeBuoy,
  PhoneCall,
  MessageSquare,
  MapPin,
  TestTube2,
  HeartHandshake,
  ShieldCheck,
  HelpCircle,
  Clock,
  ArrowRight,
} from 'lucide-react';

export const GetHelpScreen: React.FC = () => {
  const { settings, navigateTo } = useApp();

  const helpTopics = [
    {
      title: 'HIV Testing Information',
      desc: 'Learn about test types, preparation, what to expect, and 100% confidential procedures.',
      screen: 'testing',
      icon: TestTube2,
      btnLabel: 'View Testing Guide',
      color: 'bg-cyan-50 border-cyan-200 text-cyan-900',
    },
    {
      title: 'Treatment & Care Information',
      desc: 'Understand Antiretroviral Therapy (ART), adherence support, and maintaining long-term wellness.',
      screen: 'treatment',
      icon: HeartHandshake,
      btnLabel: 'View Treatment Info',
      color: 'bg-indigo-50 border-indigo-200 text-indigo-900',
    },
    {
      title: 'Nearby Karachi HIV Centers',
      desc: 'Find directions, contacts, and services for Civil Hospital Karachi, Lyari Hospital, and clinics.',
      screen: 'centers',
      icon: MapPin,
      btnLabel: 'Find a Center',
      color: 'bg-emerald-50 border-emerald-200 text-emerald-900',
    },
  ];

  return (
    <div className="p-4 space-y-4 max-w-2xl mx-auto pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-rose-700 via-rose-800 to-slate-950 text-white rounded-3xl p-5 shadow-md">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
            <LifeBuoy className="w-4 h-4 text-white" />
          </div>
          <span className="text-[11px] font-bold text-rose-200 uppercase tracking-wider">
            Confidential Support Portal
          </span>
        </div>
        <h2 className="text-xl font-black tracking-tight">Need Help or Guidance?</h2>
        <p className="text-xs text-rose-100/90 mt-1 leading-relaxed">
          We are here to assist Karachi citizens with compassion, privacy, and verified medical
          information. Reach out anytime.
        </p>
      </div>

      {/* Primary Contact Card: ZAB-Rabta 03303262384 */}
      <div className="bg-white border-2 border-rose-200 rounded-3xl p-5 shadow-xs space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500 animate-ping" />
            <h3 className="font-black text-sm uppercase text-slate-900 tracking-wider">
              ZAB-Rabta Official Helpline
            </h3>
          </div>
          <span className="text-[10px] font-bold bg-rose-100 text-rose-800 px-2 py-0.5 rounded-full">
            Available for Karachi
          </span>
        </div>

        <div className="text-center py-2 bg-rose-50/60 rounded-2xl border border-rose-100">
          <span className="text-xs text-slate-500 font-semibold block mb-0.5">
            Direct Confidential Telephone
          </span>
          <a
            href={`tel:${settings.contactNumber}`}
            className="text-2xl font-black text-rose-950 font-mono tracking-tight hover:text-rose-700 transition-colors inline-block"
          >
            {settings.contactNumber}
          </a>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-1">
          <a
            href={`tel:${settings.contactNumber}`}
            className="py-3 px-4 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-black flex items-center justify-center gap-2 shadow-sm transition-all active:scale-98"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Call {settings.contactNumber}</span>
          </a>

          <a
            href={`https://wa.me/${settings.whatsappNumber}?text=Hello%20ZAB-Rabta%2C%20I%20need%20confidential%20support%20and%20information%20regarding%20HIV%20services.`}
            target="_blank"
            rel="noopener noreferrer"
            className="py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black flex items-center justify-center gap-2 shadow-sm transition-all active:scale-98"
          >
            <MessageSquare className="w-4 h-4" />
            <span>WhatsApp Chat</span>
          </a>
        </div>

        <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 pt-1">
          <ShieldCheck className="w-4 h-4 text-teal-600" />
          <span>Calls are strictly confidential and free from judgment.</span>
        </div>
      </div>

      {/* 3 Core Triage Help Sections as Requested */}
      <div className="space-y-3">
        <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider px-1">
          Essential Support Topics
        </h3>

        {helpTopics.map((topic, idx) => {
          const Icon = topic.icon;
          return (
            <div
              key={idx}
              className={`border rounded-3xl p-4.5 space-y-3 transition-all ${topic.color}`}
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-2xl bg-white shadow-xs flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-900 text-sm leading-tight">
                    {topic.title}
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{topic.desc}</p>
                </div>
              </div>

              <button
                onClick={() => navigateTo(topic.screen as any)}
                className="w-full py-2.5 px-4 bg-white hover:bg-slate-50 border border-slate-200 text-slate-900 font-extrabold text-xs rounded-xl flex items-center justify-between transition-all shadow-2xs"
              >
                <span>{topic.btnLabel}</span>
                <ArrowRight className="w-4 h-4 text-slate-500" />
              </button>
            </div>
          );
        })}
      </div>

      {/* FAQ Accordion */}
      <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs space-y-3">
        <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-teal-600" />
          Frequently Asked Questions
        </h3>

        <div className="space-y-2 text-xs">
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
            <h5 className="font-bold text-slate-900">Is HIV testing really free in Karachi?</h5>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              Yes. Both voluntary screening tests and full confirmatory laboratory evaluations are
              provided 100% free of charge at Dr. Ruth Pfau Civil Hospital Karachi and Lyari General
              Hospital.
            </p>
          </div>

          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
            <h5 className="font-bold text-slate-900">Will my employer or family find out?</h5>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              Never. The Sindh HIV and AIDS Control Act guarantees complete patient privacy. Centers use
              confidential client codes, and results are shared solely with you in person.
            </p>
          </div>

          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
            <h5 className="font-bold text-slate-900">What should I do if I think I was exposed?</h5>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              If a potential high-risk exposure occurred within the last 72 hours, Post-Exposure
              Prophylaxis (PEP) may prevent infection. Immediately visit Civil Hospital or call ZAB-Rabta
              at {settings.contactNumber}.
            </p>
          </div>
        </div>
      </div>

      <DisclaimerBanner />
    </div>
  );
};
