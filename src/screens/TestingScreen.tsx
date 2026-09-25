import React from 'react';
import { useApp } from '../context/AppContext';
import { DisclaimerBanner } from '../components/DisclaimerBanner';
import {
  TestTube2,
  ShieldCheck,
  MapPin,
  Clock,
  PhoneCall,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Lock,
  ArrowRight,
} from 'lucide-react';

export const TestingScreen: React.FC = () => {
  const { navigateTo, settings } = useApp();

  return (
    <div className="p-4 space-y-4 max-w-2xl mx-auto pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-cyan-700 via-blue-800 to-slate-900 text-white rounded-3xl p-5 shadow-md">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
            <TestTube2 className="w-4 h-4 text-white" />
          </div>
          <span className="text-[11px] font-bold text-cyan-200 uppercase tracking-wider">
            Confidential Health Procedures
          </span>
        </div>
        <h2 className="text-xl font-black tracking-tight">HIV Testing Guide</h2>
        <p className="text-xs text-cyan-100/90 mt-1 leading-relaxed">
          Knowing your status is the single most important step for peace of mind and long-term health.
          Testing at designated Karachi centers is 100% confidential and free of charge.
        </p>
      </div>

      {/* Critical Safety Notice: Non-Diagnostic */}
      <div className="bg-rose-50 border-2 border-rose-300 rounded-2xl p-4 flex items-start gap-3 text-rose-950">
        <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
        <div className="text-xs space-y-1">
          <h4 className="font-extrabold uppercase tracking-wider text-rose-900 text-[11px]">
            Strict Non-Diagnostic Policy
          </h4>
          <p className="leading-relaxed text-rose-900/90 font-medium">
            This mobile application does NOT diagnose users, assess individual risk, or interpret test
            results. HIV diagnosis requires a certified laboratory blood test or approved rapid test kit
            performed by a licensed healthcare professional.
          </p>
        </div>
      </div>

      {/* Primary Action: Find a Center Button */}
      <div className="bg-gradient-to-r from-teal-600 to-cyan-700 text-white rounded-3xl p-5 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-full">
            Karachi Testing Hubs
          </span>
          <h3 className="font-black text-lg">Locate Free Testing Centers</h3>
          <p className="text-xs text-teal-100">
            Civil Hospital, Lyari General Hospital, and district clinics.
          </p>
        </div>

        <button
          onClick={() => navigateTo('centers')}
          className="w-full sm:w-auto py-3 px-5 bg-white text-teal-900 font-extrabold text-xs rounded-xl shadow-md hover:bg-teal-50 transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer"
        >
          <MapPin className="w-4 h-4 text-teal-700" />
          <span>Find a Center in Karachi</span>
          <ArrowRight className="w-4 h-4 text-teal-700" />
        </button>
      </div>

      {/* Why Testing is Important */}
      <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs space-y-3">
        <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-cyan-600" />
          Why HIV Testing is Vital
        </h3>
        <p className="text-xs text-slate-600 leading-relaxed">
          Most individuals infected with HIV experience no symptoms for several years. Testing is the
          only reliable method to determine one’s HIV status.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3 space-y-1">
            <span className="font-bold text-slate-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-teal-600" /> Early Intervention
            </span>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              Starting ART early preserves your immune system, preventing illness and hospital stays.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3 space-y-1">
            <span className="font-bold text-slate-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-teal-600" /> Protect Your Loved Ones
            </span>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              Knowing your status allows treatment that achieves U=U, completely stopping sexual
              transmission.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3 space-y-1">
            <span className="font-bold text-slate-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-teal-600" /> Protect Babies During Pregnancy
            </span>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              Timely maternal treatment virtually eliminates mother-to-child transmission.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3 space-y-1">
            <span className="font-bold text-slate-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-teal-600" /> Complete Peace of Mind
            </span>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              Replaces anxiety and uncertainty with clear medical facts and professional guidance.
            </p>
          </div>
        </div>
      </div>

      {/* General Types of HIV Tests */}
      <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs space-y-3">
        <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
          <TestTube2 className="w-4 h-4 text-cyan-600" />
          General Types of HIV Tests
        </h3>

        <div className="space-y-3">
          <div className="p-3.5 rounded-2xl bg-cyan-50/60 border border-cyan-200/80 space-y-1.5">
            <div className="flex items-center justify-between">
              <h4 className="font-extrabold text-xs text-cyan-950">
                1. Rapid Fingerprick Antibody / Antigen Test
              </h4>
              <span className="text-[10px] bg-cyan-200 text-cyan-900 font-bold px-2 py-0.5 rounded-full">
                15 - 20 Mins
              </span>
            </div>
            <p className="text-xs text-cyan-900/90 leading-relaxed">
              A quick fingerprick drop of blood placed on a rapid test cassette. Widely utilized in
              Karachi awareness camps and outpatient desks. Highly accurate for preliminary screening.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-indigo-50/60 border border-indigo-200/80 space-y-1.5">
            <div className="flex items-center justify-between">
              <h4 className="font-extrabold text-xs text-indigo-950">
                2. Laboratory 4th Generation ELISA Test
              </h4>
              <span className="text-[10px] bg-indigo-200 text-indigo-900 font-bold px-2 py-0.5 rounded-full">
                Same / Next Day
              </span>
            </div>
            <p className="text-xs text-indigo-900/90 leading-relaxed">
              Blood drawn from a vein and tested in a hospital laboratory. Detects both HIV antibodies
              and the p24 antigen, identifying infection sooner during the window period.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 space-y-1.5">
            <div className="flex items-center justify-between">
              <h4 className="font-extrabold text-xs text-emerald-950">
                3. Confirmatory Western Blot & PCR Viral Load Test
              </h4>
              <span className="text-[10px] bg-emerald-200 text-emerald-900 font-bold px-2 py-0.5 rounded-full">
                Definitive
              </span>
            </div>
            <p className="text-xs text-emerald-900/90 leading-relaxed">
              If a preliminary rapid screening test is reactive, official medical protocols mandate a
              confirmatory laboratory test before establishing a diagnosis.
            </p>
          </div>
        </div>
      </div>

      {/* What Happens During Testing */}
      <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs space-y-3">
        <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
          <Clock className="w-4 h-4 text-teal-600" />
          What Happens During Testing at a Center
        </h3>

        <div className="space-y-3 text-xs">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-teal-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
              1
            </div>
            <div>
              <h5 className="font-bold text-slate-900">Pre-Test Counseling</h5>
              <p className="text-slate-600 mt-0.5">
                A private one-on-one session with a certified counselor explaining how the test works,
                answering your questions, and ensuring your full voluntary consent.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-teal-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
              2
            </div>
            <div>
              <h5 className="font-bold text-slate-900">Sample Collection</h5>
              <p className="text-slate-600 mt-0.5">
                A quick, painless fingerprick using a single-use sterile lancet. The procedure takes less
                than 2 minutes.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-teal-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
              3
            </div>
            <div>
              <h5 className="font-bold text-slate-900">Private Result & Post-Test Counseling</h5>
              <p className="text-slate-600 mt-0.5">
                You receive your results privately in an enclosed room. If negative, counselors discuss
                future prevention. If reactive, compassionate staff guide you directly to free confirmatory
                testing and immediate free treatment support.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Confidentiality Information */}
      <div className="bg-gradient-to-br from-slate-900 to-teal-950 text-white rounded-3xl p-5 shadow-md space-y-2.5">
        <div className="flex items-center gap-2">
          <Lock className="w-5 h-5 text-teal-400" />
          <h4 className="font-bold text-sm text-white">Absolute Confidentiality Guarantee</h4>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          Under medical law in Sindh, HIV testing is strictly confidential. Testing centers utilize
          anonymous code numbers. Your name, workplace, or family will never be notified without your
          explicit permission.
        </p>
      </div>

      {/* Direct Call for Help */}
      <div className="bg-teal-50 border border-teal-200 rounded-3xl p-4 flex items-center justify-between gap-3">
        <div className="space-y-0.5">
          <p className="text-xs font-bold text-teal-950">Have questions before visiting a center?</p>
          <p className="text-[11px] text-teal-800">
            Talk to ZAB-Rabta support privately at {settings.contactNumber}.
          </p>
        </div>
        <a
          href={`tel:${settings.contactNumber}`}
          className="py-2 px-3.5 bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shrink-0 shadow-xs"
        >
          <PhoneCall className="w-3.5 h-3.5" /> Call Now
        </a>
      </div>

      <DisclaimerBanner />
    </div>
  );
};
