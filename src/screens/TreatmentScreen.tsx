import React from 'react';
import { useApp } from '../context/AppContext';
import { DisclaimerBanner } from '../components/DisclaimerBanner';
import {
  HeartHandshake,
  Pill,
  ShieldAlert,
  Clock,
  Activity,
  Heart,
  Calendar,
  AlertTriangle,
  BellRing,
  ArrowRight,
  MapPin,
  CheckCircle,
} from 'lucide-react';

export const TreatmentScreen: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <div className="p-4 space-y-4 max-w-2xl mx-auto pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-indigo-700 via-indigo-800 to-slate-900 text-white rounded-3xl p-5 shadow-md">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
            <HeartHandshake className="w-4 h-4 text-white" />
          </div>
          <span className="text-[11px] font-bold text-indigo-200 uppercase tracking-wider">
            Medical Education
          </span>
        </div>
        <h2 className="text-xl font-black tracking-tight">HIV Treatment & Care</h2>
        <p className="text-xs text-indigo-100/90 mt-1 leading-relaxed">
          With modern Antiretroviral Therapy (ART), HIV is a manageable chronic health condition.
          Patients taking medication as prescribed live long, healthy, active, and fulfilling lives.
        </p>
      </div>

      {/* Critical Non-Prescribing Warning Banner */}
      <div className="bg-rose-50 border-2 border-rose-300 rounded-3xl p-4.5 text-rose-950 flex items-start gap-3.5 shadow-xs">
        <div className="w-9 h-9 rounded-2xl bg-rose-200 flex items-center justify-center shrink-0 text-rose-800">
          <AlertTriangle className="w-5 h-5" />
        </div>
        <div className="text-xs space-y-1">
          <h4 className="font-extrabold uppercase tracking-wider text-rose-950 text-[11px]">
            Strict Non-Prescription Policy
          </h4>
          <p className="leading-relaxed text-rose-900 font-medium">
            This application does <strong>NOT</strong> prescribe medicines, specify dosages, or create
            medical treatment plans. Never self-medicate or alter your medicine dosage without the direct
            supervision of a qualified physician at an authorized HIV clinic.
          </p>
        </div>
      </div>

      {/* Section 1: Antiretroviral Therapy (ART) */}
      <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Pill className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
            What is Antiretroviral Therapy (ART)?
          </h3>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          Antiretroviral therapy (ART) is the combination of medications prescribed by healthcare
          professionals to treat HIV.
        </p>

        <div className="space-y-2.5 text-xs text-slate-700">
          <div className="p-3 rounded-2xl bg-indigo-50/70 border border-indigo-100 space-y-1">
            <h5 className="font-bold text-indigo-950">How ART Works</h5>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              ART reduces the amount of HIV virus in the body (the "viral load") to an undetectable level.
              When the virus cannot replicate, your immune system (CD4 cells) can recover and stay strong.
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-100 space-y-1">
            <h5 className="font-bold text-emerald-950">Undetectable = Untransmittable (U = U)</h5>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              People living with HIV who take ART exactly as prescribed and achieve an undetectable viral
              load have effectively zero risk of sexually transmitting HIV to their partners.
            </p>
          </div>
        </div>
      </div>

      {/* Section 2: Importance of Adherence */}
      <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
              Treatment Adherence is Essential
            </h3>
          </div>
          <span className="text-[10px] font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full">
            Daily Routine
          </span>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          "Adherence" means taking your prescribed medication at the same time every day, without skipping
          or pausing doses.
        </p>

        <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5 space-y-2 text-xs">
          <h5 className="font-bold text-slate-900">Why Timing Matters:</h5>
          <ul className="space-y-1.5 text-[11px] text-slate-700">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
              <span>
                <strong>Prevents Drug Resistance:</strong> Inconsistent doses allow the virus to mutate,
                rendering current medications ineffective.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
              <span>
                <strong>Keeps Viral Load Suppressed:</strong> Consistent blood levels keep the virus dormant.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
              <span>
                <strong>Preserves Treatment Options:</strong> Staying on first-line ART avoids the need for
                complex backup regimens.
              </span>
            </li>
          </ul>
        </div>

        {/* Link to Private Medicine Reminder */}
        <div className="pt-2">
          <button
            onClick={() => navigateTo('reminders')}
            className="w-full py-3 px-4 bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded-2xl text-xs font-bold text-teal-900 flex items-center justify-between transition-colors"
          >
            <div className="flex items-center gap-2">
              <BellRing className="w-4 h-4 text-teal-700" />
              <span>Use our Private Medicine Reminder Feature</span>
            </div>
            <ArrowRight className="w-4 h-4 text-teal-700" />
          </button>
        </div>
      </div>

      {/* Section 3: Regular Medical Follow-up */}
      <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center">
            <Activity className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
            Regular Medical Follow-Up
          </h3>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          Staying connected with your healthcare team at Lyari General or Civil Hospital ensures your
          health is tracked objectively through regular lab investigations:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
            <span className="font-bold text-slate-900 block mb-0.5">Viral Load Monitoring</span>
            <p className="text-slate-600 text-[11px]">
              Conducted every 6 months to ensure the virus remains undetectable in your blood.
            </p>
          </div>
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
            <span className="font-bold text-slate-900 block mb-0.5">CD4 Cell Count</span>
            <p className="text-slate-600 text-[11px]">
              Assesses the rebuilding and strength of your immune system over time.
            </p>
          </div>
        </div>
      </div>

      {/* Section 4: General Health and Wellbeing */}
      <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
            <Heart className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
            General Health & Wellbeing
          </h3>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          Living well with HIV involves total body and mental wellness:
        </p>

        <div className="grid grid-cols-2 gap-2.5 text-xs">
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
            <span className="font-bold text-slate-800 block text-[11px]">Nutritious Diet</span>
            <span className="text-[10.5px] text-slate-500">
              Balanced proteins, fresh fruits, vegetables, and clean water.
            </span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
            <span className="font-bold text-slate-800 block text-[11px]">Routine Vaccines</span>
            <span className="text-[10.5px] text-slate-500">
              Hepatitis B, pneumococcal, and annual influenza vaccines.
            </span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
            <span className="font-bold text-slate-800 block text-[11px]">Mental Health Support</span>
            <span className="text-[10.5px] text-slate-500">
              Peer counseling, support groups, and reducing daily stress.
            </span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
            <span className="font-bold text-slate-800 block text-[11px]">Avoid Tobacco & Drugs</span>
            <span className="text-[10.5px] text-slate-500">
              Protects cardiovascular health and prevents liver strain.
            </span>
          </div>
        </div>
      </div>

      {/* Free Centers in Karachi Callout */}
      <div className="bg-gradient-to-r from-teal-800 to-cyan-900 text-white rounded-3xl p-5 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-full">
            Free Government Centers
          </span>
          <h4 className="font-black text-base">Free ART Treatment in Karachi</h4>
          <p className="text-xs text-teal-100/90">
            Lyari General Hospital & Dr. Ruth Pfau Civil Hospital provide 100% free medications.
          </p>
        </div>
        <button
          onClick={() => navigateTo('centers')}
          className="w-full sm:w-auto py-2.5 px-4 bg-white text-teal-900 font-extrabold text-xs rounded-xl shadow-md hover:bg-teal-50 transition-all flex items-center justify-center gap-1.5 shrink-0"
        >
          <MapPin className="w-4 h-4 text-teal-700" />
          <span>View Centers</span>
        </button>
      </div>

      <DisclaimerBanner />
    </div>
  );
};
