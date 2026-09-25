import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { HIVCenter, Camp, District, AwarenessArticle } from '../types';
import {
  Sliders,
  ShieldAlert,
  Phone,
  Instagram,
  Bell,
  MapPin,
  Calendar,
  BookOpen,
  Map,
  Plus,
  Edit2,
  Trash2,
  Save,
  CheckCircle2,
  X,
  Lock,
  ArrowRight,
} from 'lucide-react';

export const AdminScreen: React.FC = () => {
  const {
    currentUser,
    settings,
    updateSettings,
    centers,
    addCenter,
    updateCenter,
    deleteCenter,
    districts,
    updateDistrictCoordinator,
    camps,
    addCamp,
    updateCamp,
    deleteCamp,
    articles,
    addArticle,
    updateArticle,
    deleteArticle,
    navigateTo,
    showToast,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'settings' | 'centers' | 'camps' | 'districts' | 'articles'>('settings');

  // App Settings state
  const [contactNumber, setContactNumber] = useState(settings.contactNumber);
  const [whatsappNumber, setWhatsappNumber] = useState(settings.whatsappNumber);
  const [instagramUrl, setInstagramUrl] = useState(settings.instagramUrl);
  const [announcement, setAnnouncement] = useState(settings.announcement);
  const [tagline, setTagline] = useState(settings.tagline);

  // Security Check: Normal users must NOT have access to the admin panel
  if (!currentUser || currentUser.role !== 'admin') {
    return (
      <div className="p-6 text-center space-y-4 max-w-md mx-auto my-auto min-h-[60vh] flex flex-col justify-center">
        <div className="w-16 h-16 rounded-3xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto shadow-sm">
          <Lock className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-black text-slate-900">Administrator Access Required</h2>
        <p className="text-xs text-slate-600 leading-relaxed max-w-xs mx-auto">
          The administrative control panel is restricted to authorized ZAB-Rabta healthcare coordinators.
        </p>
        <div className="pt-2">
          <button
            onClick={() => navigateTo('auth')}
            className="py-2.5 px-5 bg-slate-900 hover:bg-slate-800 text-amber-300 font-bold text-xs rounded-xl shadow-md"
          >
            Switch to Admin Login (admin@zabrabta.org)
          </button>
        </div>
      </div>
    );
  }

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      contactNumber: contactNumber.trim(),
      whatsappNumber: whatsappNumber.trim(),
      instagramUrl: instagramUrl.trim(),
      announcement: announcement.trim(),
      tagline: tagline.trim(),
    });
  };

  return (
    <div className="p-4 space-y-4 max-w-2xl mx-auto pb-16">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-amber-950 text-white rounded-3xl p-5 shadow-lg flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
              Super Admin
            </span>
            <span className="text-[11px] text-amber-200">Live Production Panel</span>
          </div>
          <h2 className="text-xl font-black tracking-tight text-white">ZAB-Rabta Management</h2>
          <p className="text-xs text-slate-300">
            Dynamically update application content, centers, camps, and contact numbers.
          </p>
        </div>

        <div className="w-12 h-12 rounded-2xl bg-amber-400/20 text-amber-400 flex items-center justify-center shrink-0 border border-amber-400/30">
          <Sliders className="w-6 h-6" />
        </div>
      </div>

      {/* Admin Navigation Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        {[
          { id: 'settings', label: 'App Settings', icon: Sliders },
          { id: 'centers', label: `Centers (${centers.length})`, icon: MapPin },
          { id: 'camps', label: `Camps (${camps.length})`, icon: Calendar },
          { id: 'districts', label: `Districts (${districts.length})`, icon: Map },
          { id: 'articles', label: `Articles (${articles.length})`, icon: BookOpen },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-2 rounded-2xl text-xs font-bold whitespace-nowrap flex items-center gap-1.5 transition-all ${
                activeTab === tab.id
                  ? 'bg-slate-900 text-amber-300 shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: Global App Settings */}
      {activeTab === 'settings' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div>
              <h3 className="font-extrabold text-sm text-slate-900 uppercase tracking-wider">
                Application Global Settings
              </h3>
              <p className="text-xs text-slate-500">
                Changes apply instantly across all mobile screens without a rebuild.
              </p>
            </div>
            <button
              onClick={handleSaveSettings}
              className="py-2 px-4 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm active:scale-95"
            >
              <Save className="w-4 h-4" /> Save Settings
            </button>
          </div>

          <form onSubmit={handleSaveSettings} className="space-y-3.5 text-xs">
            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">
                ZAB-Rabta Contact Phone (Default: 03303262384)
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-sm text-slate-900"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">
                WhatsApp Hotline (International format, no +)
              </label>
              <input
                type="text"
                required
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-sm text-slate-900"
                placeholder="923303262384"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">
                Instagram Profile URL (Editable)
              </label>
              <div className="relative">
                <Instagram className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="url"
                  required
                  value={instagramUrl}
                  onChange={(e) => setInstagramUrl(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs text-slate-900"
                />
              </div>
              <span className="text-[10px] text-slate-500 mt-1 block">
                The exact profile URL will be set later by administrators.
              </span>
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">
                App Subtitle / Tagline
              </label>
              <input
                type="text"
                required
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">
                Home Dashboard Announcement Ticker
              </label>
              <textarea
                rows={2}
                value={announcement}
                onChange={(e) => setAnnouncement(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" /> Save All Application Settings
            </button>
          </form>
        </div>
      )}

      {/* TAB 2: Centers Management */}
      {activeTab === 'centers' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="font-extrabold text-xs uppercase text-slate-900 tracking-wider">
              Karachi Centers ({centers.length})
            </h3>
            <button
              onClick={() => navigateTo('centers')}
              className="text-xs font-bold text-teal-700 hover:underline flex items-center gap-1"
            >
              Open Centers Screen <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {centers.map((c) => (
              <div
                key={c.centerId}
                className="bg-white border border-slate-200 rounded-3xl p-4 shadow-xs flex items-center justify-between gap-3 text-xs"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm truncate">{c.name}</span>
                    <span className="text-[10px] bg-teal-50 text-teal-800 font-bold px-2 py-0.5 rounded-full">
                      {c.district}
                    </span>
                  </div>
                  <p className="text-slate-500 truncate mt-0.5">{c.address}</p>
                  <p className="text-slate-600 text-[11px] mt-0.5 font-mono">Phone: {c.phone}</p>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => {
                      if (confirm(`Remove center "${c.name}"?`)) {
                        deleteCenter(c.centerId);
                      }
                    }}
                    className="p-2 text-rose-600 hover:bg-rose-50 rounded-xl"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: Camps Management */}
      {activeTab === 'camps' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="font-extrabold text-xs uppercase text-slate-900 tracking-wider">
              Karachi Camps ({camps.length})
            </h3>
            <button
              onClick={() => navigateTo('camps')}
              className="text-xs font-bold text-amber-800 hover:underline flex items-center gap-1"
            >
              Open Camps Feed <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {camps.map((camp) => (
              <div
                key={camp.campId}
                className="bg-white border border-slate-200 rounded-3xl p-4 shadow-xs flex items-center justify-between gap-3 text-xs"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm truncate">{camp.title}</span>
                    <span className="text-[10px] bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded-full">
                      {camp.district}
                    </span>
                  </div>
                  <p className="text-slate-500 truncate mt-0.5">{camp.location}</p>
                  <p className="text-amber-800 text-[11px] mt-0.5 font-medium">
                    {camp.date} • {camp.time}
                  </p>
                </div>

                <button
                  onClick={() => {
                    if (confirm(`Delete camp "${camp.title}"?`)) {
                      deleteCamp(camp.campId);
                    }
                  }}
                  className="p-2 text-rose-600 hover:bg-rose-50 rounded-xl shrink-0"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: Districts Coordinators */}
      {activeTab === 'districts' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="font-extrabold text-xs uppercase text-slate-900 tracking-wider">
              Karachi District Coordinators ({districts.length})
            </h3>
            <button
              onClick={() => navigateTo('districts')}
              className="text-xs font-bold text-purple-700 hover:underline flex items-center gap-1"
            >
              Open Districts Screen <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2.5">
            {districts.map((d) => (
              <div
                key={d.districtId}
                className="bg-white border border-slate-200 rounded-3xl p-4 shadow-xs flex items-center justify-between gap-3 text-xs"
              >
                <div>
                  <h4 className="font-extrabold text-slate-900 text-sm">{d.name}</h4>
                  <p className="text-slate-500 text-[11px] line-clamp-1">{d.description}</p>
                  <p className="text-purple-900 font-bold mt-1">
                    Coordinator: <span className="font-mono">{d.coordinatorContact}</span>
                  </p>
                </div>

                <button
                  onClick={() => {
                    const newContact = prompt(
                      `Enter new phone number for ${d.name} coordinator:`,
                      d.coordinatorContact
                    );
                    if (newContact !== null) {
                      updateDistrictCoordinator(d.districtId, newContact);
                    }
                  }}
                  className="py-1.5 px-3 bg-purple-50 hover:bg-purple-100 text-purple-900 font-bold rounded-xl text-xs shrink-0 flex items-center gap-1"
                >
                  <Edit2 className="w-3.5 h-3.5" /> Edit Phone
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: Educational Articles */}
      {activeTab === 'articles' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="font-extrabold text-xs uppercase text-slate-900 tracking-wider">
              HIV Awareness Articles ({articles.length})
            </h3>
            <button
              onClick={() => navigateTo('awareness')}
              className="text-xs font-bold text-teal-700 hover:underline flex items-center gap-1"
            >
              Open Awareness Screen <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2.5">
            {articles.map((art) => (
              <div
                key={art.articleId}
                className="bg-white border border-slate-200 rounded-3xl p-4 shadow-xs flex items-center justify-between gap-3 text-xs"
              >
                <div className="min-w-0">
                  <span className="text-[10px] font-bold uppercase text-teal-800 bg-teal-50 px-2 py-0.5 rounded-full">
                    {art.category}
                  </span>
                  <h4 className="font-extrabold text-slate-900 text-sm mt-1">{art.title}</h4>
                  <p className="text-slate-500 text-[11px] line-clamp-1">{art.summary}</p>
                </div>

                <button
                  onClick={() => {
                    if (confirm(`Remove article "${art.title}"?`)) {
                      deleteArticle(art.articleId);
                    }
                  }}
                  className="p-2 text-rose-600 hover:bg-rose-50 rounded-xl shrink-0"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
