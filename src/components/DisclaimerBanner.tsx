import React from 'react';
import { AlertCircle, ShieldAlert } from 'lucide-react';

interface DisclaimerBannerProps {
  compact?: boolean;
  className?: string;
}

export const DisclaimerBanner: React.FC<DisclaimerBannerProps> = ({
  compact = false,
  className = '',
}) => {
  if (compact) {
    return (
      <div
        className={`bg-amber-50/90 border border-amber-200/80 rounded-xl p-3 flex items-start gap-2.5 text-xs text-amber-900 ${className}`}
      >
        <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="font-semibold text-amber-950">Medical Disclaimer: </strong>
          Information provided by this application is for general educational purposes and does not
          replace professional medical advice, diagnosis, or treatment.
        </p>
      </div>
    );
  }

  return (
    <div
      className={`bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-4 shadow-xs flex items-start gap-3.5 text-amber-950 ${className}`}
    >
      <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center shrink-0 text-amber-700">
        <ShieldAlert className="w-5 h-5" />
      </div>
      <div className="text-xs space-y-1">
        <h4 className="font-bold text-amber-900 uppercase tracking-wider text-[11px]">
          Important Health Safety Notice
        </h4>
        <p className="text-amber-900/90 leading-relaxed font-normal">
          Information provided by this application is for general educational purposes and does not
          replace professional medical advice, diagnosis, or treatment. Always consult qualified
          healthcare professionals for testing, diagnosis, and treatment plans.
        </p>
      </div>
    </div>
  );
};
