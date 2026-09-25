import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DisclaimerBanner } from '../components/DisclaimerBanner';
import {
  Instagram,
  ExternalLink,
  Edit2,
  Check,
  Sparkles,
  Share2,
  ShieldCheck,
  Video,
  Heart,
  MessageCircle,
} from 'lucide-react';

export const InstagramScreen: React.FC = () => {
  const { settings, currentUser, updateSettings, showToast } = useApp();

  const [isEditingUrl, setIsEditingUrl] = useState(false);
  const [urlInput, setUrlInput] = useState(settings.instagramUrl);

  const handleSaveUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) return;
    updateSettings({ instagramUrl: urlInput.trim() });
    setIsEditingUrl(false);
  };

  return (
    <div className="p-4 space-y-4 max-w-2xl mx-auto pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-pink-600 via-rose-600 to-amber-600 text-white rounded-3xl p-6 shadow-md text-center">
        <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center mx-auto mb-3 shadow-md">
          <Instagram className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-black tracking-tight">ZAB-Rabta on Instagram</h2>
        <p className="text-xs text-pink-100 mt-1 max-w-xs mx-auto">
          Follow our official social page for live camp schedules, doctor talks, myth busters, and
          Karachi youth awareness campaigns.
        </p>

        {/* Primary Requested Button */}
        <div className="mt-5 max-w-sm mx-auto">
          <a
            href={settings.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-4 px-6 bg-white text-pink-700 hover:text-pink-800 font-black text-sm rounded-2xl shadow-xl hover:bg-pink-50 transition-all flex items-center justify-center gap-2.5 active:scale-98"
          >
            <Instagram className="w-5 h-5 text-pink-600" />
            <span>Follow Zab Rabta on Instagram</span>
            <ExternalLink className="w-4 h-4 text-pink-500" />
          </a>
        </div>
      </div>

      {/* Admin Editable URL Portal */}
      {currentUser?.role === 'admin' && (
        <div className="bg-amber-50 border border-amber-300 rounded-3xl p-4.5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-200 text-amber-900 px-2 py-0.5 rounded-full">
                Admin Config
              </span>
              <h4 className="text-xs font-bold text-amber-950">Instagram Target URL</h4>
            </div>

            {!isEditingUrl && (
              <button
                onClick={() => {
                  setUrlInput(settings.instagramUrl);
                  setIsEditingUrl(true);
                }}
                className="text-xs font-bold text-amber-900 flex items-center gap-1 hover:underline"
              >
                <Edit2 className="w-3.5 h-3.5" /> Edit URL
              </button>
            )}
          </div>

          {isEditingUrl ? (
            <form onSubmit={handleSaveUrl} className="space-y-2 text-xs">
              <input
                type="url"
                required
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="https://instagram.com/your_handle"
                className="w-full p-2.5 bg-white border border-amber-300 rounded-xl text-xs font-mono text-slate-900"
              />
              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditingUrl(false)}
                  className="px-3 py-1.5 text-slate-600 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl shadow-xs"
                >
                  Save URL
                </button>
              </div>
            </form>
          ) : (
            <p className="text-xs text-amber-900/90 font-mono truncate bg-white/70 p-2 rounded-xl border border-amber-200">
              Current URL: {settings.instagramUrl}
            </p>
          )}

          <p className="text-[10px] text-amber-800">
            Note: The Instagram URL can be updated whenever the final official profile is ready.
          </p>
        </div>
      )}

      {/* Social Highlights Preview */}
      <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs space-y-4">
        <h3 className="font-extrabold text-slate-900 text-sm uppercase tracking-wider flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-pink-600" />
          What We Share on Instagram
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3 bg-pink-50/60 border border-pink-100 rounded-2xl space-y-1">
            <span className="font-bold text-pink-950 flex items-center gap-1.5">
              <Video className="w-4 h-4 text-pink-600" /> Doctor Q&A Reels
            </span>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              Leading Karachi infectious disease specialists answering questions regarding testing,
              ART adherence, and U=U.
            </p>
          </div>

          <div className="p-3 bg-rose-50/60 border border-rose-100 rounded-2xl space-y-1">
            <span className="font-bold text-rose-950 flex items-center gap-1.5">
              <Heart className="w-4 h-4 text-rose-600" /> Destigmatization Stories
            </span>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              Empowering community voices dismantling fear, shame, and discrimination in schools and
              workplaces.
            </p>
          </div>

          <div className="p-3 bg-amber-50/60 border border-amber-100 rounded-2xl space-y-1">
            <span className="font-bold text-amber-950 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-600" /> Live Camp Alerts
            </span>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              Real-time locations of mobile voluntary health vans and free screening camps in Karachi.
            </p>
          </div>

          <div className="p-3 bg-purple-50/60 border border-purple-100 rounded-2xl space-y-1">
            <span className="font-bold text-purple-950 flex items-center gap-1.5">
              <MessageCircle className="w-4 h-4 text-purple-600" /> Youth Outreach
            </span>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              Engaging infographic carousels explaining transmission facts and safe healthcare practices.
            </p>
          </div>
        </div>

        {/* Share Button */}
        <div className="pt-2">
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: 'ZAB-Rabta Instagram',
                  text: 'Follow ZAB-Rabta on Instagram for Karachi HIV awareness & free testing updates.',
                  url: settings.instagramUrl,
                });
              } else {
                showToast('Instagram link copied to clipboard.');
              }
            }}
            className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Instagram Page with Friends</span>
          </button>
        </div>
      </div>

      <DisclaimerBanner />
    </div>
  );
};
