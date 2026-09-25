import React from 'react';
import { useApp } from '../context/AppContext';
import { DisclaimerBanner } from '../components/DisclaimerBanner';
import {
  ShieldCheck,
  Lock,
  EyeOff,
  Trash2,
  FileText,
  AlertTriangle,
  Heart,
  Scale,
  CheckCircle,
} from 'lucide-react';

export const PrivacyScreen: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <div className="p-4 space-y-4 max-w-2xl mx-auto pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-slate-800 via-slate-900 to-teal-950 text-white rounded-3xl p-6 shadow-md text-center">
        <div className="w-12 h-12 rounded-2xl bg-teal-500/20 text-teal-400 flex items-center justify-center mx-auto mb-2">
          <ShieldCheck className="w-7 h-7" />
        </div>
        <h2 className="text-2xl font-black tracking-tight">Privacy Policy & Terms</h2>
        <p className="text-xs text-slate-300 mt-1 max-w-sm mx-auto">
          ZAB-Rabta is built on an uncompromising commitment to medical confidentiality and digital
          privacy.
        </p>
      </div>

      {/* Prominent Health Disclaimer */}
      <DisclaimerBanner />

      {/* Privacy Commitments */}
      <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs space-y-4 text-xs">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
          <Lock className="w-4 h-4 text-teal-600" />
          <h3 className="font-extrabold text-sm uppercase text-slate-900 tracking-wider">
            1. Zero Health Information Profiling
          </h3>
        </div>

        <p className="text-slate-600 leading-relaxed">
          ZAB-Rabta does <strong>not</strong> require, record, or track your personal HIV status, medical
          test results, diagnosis, or clinical history. We believe that access to healthcare knowledge
          should never be contingent on forfeiting one's digital privacy.
        </p>

        <ul className="space-y-2 text-slate-700">
          <li className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
            <span>
              <strong>No Public Profiles:</strong> There are no social feeds, public member directories,
              or badges displaying personal user activity.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
            <span>
              <strong>Private Medicine Reminders:</strong> Reminders configured in the app are tied
              solely to your private user account ID and are completely inaccessible to other users or
              unauthorized third parties.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
            <span>
              <strong>Minimum Necessary Data:</strong> We only store a user's name/alias and email
              address for authentication and session recovery.
            </span>
          </li>
        </ul>
      </div>

      {/* Data Security & Deletion */}
      <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs space-y-3 text-xs">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
          <Trash2 className="w-4 h-4 text-rose-600" />
          <h3 className="font-extrabold text-sm uppercase text-slate-900 tracking-wider">
            2. Google Play Store & User Deletion Rights
          </h3>
        </div>

        <p className="text-slate-600 leading-relaxed">
          In full accordance with Google Play Store policies and international data protection standards,
          every registered user has the unconditional right to delete their account and associated data
          at any time.
        </p>

        <div className="bg-rose-50/70 border border-rose-200 rounded-2xl p-3 flex items-start gap-2.5">
          <Trash2 className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold text-rose-950">How to Delete Your Account:</span>
            <p className="text-rose-900/90 leading-relaxed text-[11px]">
              Navigate to the <strong>Account</strong> screen and tap "Delete Account & Erase All Private
              Data". All your stored profile details and reminder records will be erased immediately.
            </p>
          </div>
        </div>
      </div>

      {/* Sindh Legal Protection */}
      <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs space-y-3 text-xs">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
          <Scale className="w-4 h-4 text-indigo-600" />
          <h3 className="font-extrabold text-sm uppercase text-slate-900 tracking-wider">
            3. Legal Confidentiality Under Sindh Law
          </h3>
        </div>

        <p className="text-slate-600 leading-relaxed">
          Under the Sindh HIV and AIDS Control Act and national healthcare ethics in Pakistan:
        </p>

        <ul className="space-y-1.5 text-slate-700 text-[11px]">
          <li>• HIV testing must be conducted with informed consent.</li>
          <li>• Test results must remain strictly confidential between doctor and patient.</li>
          <li>
            • Discrimination against individuals living with or affected by HIV in employment,
            education, and public accommodations is illegal.
          </li>
        </ul>
      </div>

      {/* Terms of Use & Medical Disclaimer */}
      <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs space-y-3 text-xs">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
          <AlertTriangle className="w-4 h-4 text-amber-600" />
          <h3 className="font-extrabold text-sm uppercase text-slate-900 tracking-wider">
            4. Terms of Educational Use
          </h3>
        </div>

        <p className="text-slate-600 leading-relaxed">
          The ZAB-Rabta mobile application is designed exclusively for public awareness, general health
          literacy, and community service navigation. It does not provide medical consultations,
          telemedicine diagnosis, prescription generation, or therapeutic decision-making.
        </p>

        <p className="text-slate-600 leading-relaxed">
          For any urgent medical emergencies or post-exposure prophylaxis needs, immediately visit the
          emergency department at Civil Hospital Karachi or Lyari General Hospital.
        </p>
      </div>

      {/* Contact Section */}
      <div className="text-center pt-2">
        <p className="text-xs text-slate-500">
          For privacy inquiries or data rights requests, contact ZAB-Rabta at:
        </p>
        <p className="text-xs font-bold text-teal-800 mt-1">info@zabrabta.org • 03303262384</p>
      </div>
    </div>
  );
};
