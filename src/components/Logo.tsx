import React, { useState } from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  light?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  showText = true,
  light = false,
  className = '',
}) => {
  const [imgError, setImgError] = useState(false);

  const iconSizeClasses = {
    sm: 'w-8 h-8 min-w-8 min-h-8',
    md: 'w-11 h-11 min-w-11 min-h-11',
    lg: 'w-20 h-20 min-w-20 min-h-20',
    xl: 'w-28 h-28 min-w-28 min-h-28',
  };

  const textClasses = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl',
  };

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Official ZAB-Rabta Circular Emblem */}
      <div
        className={`${iconSizeClasses[size]} rounded-full flex items-center justify-center relative overflow-hidden transition-transform active:scale-95 shadow-md shadow-slate-900/20 bg-black shrink-0 border border-slate-700/40`}
        title="ZAB-Rabta Official Logo"
      >
        {!imgError ? (
          <img
            src="/logo.png"
            alt="ZAB-Rabta Logo"
            className="w-full h-full object-cover rounded-full"
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
          />
        ) : (
          <img
            src="/logo.svg"
            alt="ZAB-Rabta Logo"
            className="w-full h-full object-contain rounded-full"
            referrerPolicy="no-referrer"
          />
        )}
      </div>

      {showText && (
        <div className="flex flex-col leading-none">
          <div className="flex items-center gap-1.5">
            <span
              className={`font-black tracking-tight ${textClasses[size]} ${
                light ? 'text-white' : 'text-slate-900'
              }`}
            >
              ZAB-Rabta
            </span>
          </div>
          <span
            className={`text-[10px] font-medium tracking-wide uppercase mt-0.5 ${
              light ? 'text-teal-200' : 'text-teal-700'
            }`}
          >
            HIV Awareness, Testing & Care
          </span>
        </div>
      )}
    </div>
  );
};
