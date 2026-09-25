import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Camp } from '../types';
import { DisclaimerBanner } from '../components/DisclaimerBanner';
import {
  Calendar,
  Clock,
  MapPin,
  Phone,
  TestTube2,
  CheckCircle2,
  Plus,
  Edit2,
  Trash2,
  Sparkles,
  Share2,
  PhoneCall,
  X,
  Image as ImageIcon,
} from 'lucide-react';

export const CampsScreen: React.FC = () => {
  const { camps, currentUser, addCamp, updateCamp, deleteCamp, showToast } = useApp();

  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('All');
  const [isAddingCamp, setIsAddingCamp] = useState(false);
  const [editingCamp, setEditingCamp] = useState<Camp | null>(null);

  // Form states
  const [formTitle, setFormTitle] = useState('');
  const [formDate, setFormDate] = useState('October 20, 2026');
  const [formTime, setFormTime] = useState('09:00 AM - 03:00 PM');
  const [formDistrict, setFormDistrict] = useState('Karachi South');
  const [formLocation, setFormLocation] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formImage, setFormImage] = useState(
    'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80'
  );
  const [formTesting, setFormTesting] = useState(true);
  const [formContact, setFormContact] = useState('03303262384');
  const [formIsPast, setFormIsPast] = useState(false);

  const districtsList = [
    'All',
    'Karachi South',
    'Karachi Central',
    'Karachi East',
    'Karachi West',
    'Korangi',
    'Malir',
    'Keamari',
  ];

  const filteredCamps = camps.filter((camp) => {
    const isPast = !!camp.isPast;
    const matchesTab = activeTab === 'past' ? isPast : !isPast;
    const matchesDistrict =
      selectedDistrict === 'All' || camp.district.toLowerCase() === selectedDistrict.toLowerCase();
    return matchesTab && matchesDistrict;
  });

  const openAddModal = () => {
    setFormTitle('');
    setFormDate('October 25, 2026');
    setFormTime('09:30 AM - 02:30 PM');
    setFormDistrict('Karachi East');
    setFormLocation('Community Ground, Karachi');
    setFormDesc(
      'Free, confidential voluntary screening by certified health counselors. Free educational brochures, personal consultations, and barrier protection methods.'
    );
    setFormImage(
      'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&auto=format&fit=crop&q=80'
    );
    setFormTesting(true);
    setFormContact('03303262384');
    setFormIsPast(false);
    setIsAddingCamp(true);
  };

  const openEditModal = (camp: Camp) => {
    setEditingCamp(camp);
    setFormTitle(camp.title);
    setFormDate(camp.date);
    setFormTime(camp.time);
    setFormDistrict(camp.district);
    setFormLocation(camp.location);
    setFormDesc(camp.description);
    setFormImage(camp.imageUrl);
    setFormTesting(camp.testingAvailable);
    setFormContact(camp.contact);
    setFormIsPast(!!camp.isPast);
  };

  const handleSaveCamp = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCamp) {
      updateCamp({
        ...editingCamp,
        title: formTitle,
        date: formDate,
        time: formTime,
        district: formDistrict,
        location: formLocation,
        description: formDesc,
        imageUrl: formImage,
        testingAvailable: formTesting,
        contact: formContact,
        isPast: formIsPast,
      });
      setEditingCamp(null);
    } else {
      addCamp({
        title: formTitle,
        date: formDate,
        time: formTime,
        district: formDistrict,
        location: formLocation,
        description: formDesc,
        imageUrl: formImage,
        testingAvailable: formTesting,
        contact: formContact,
        isPast: formIsPast,
      });
      setIsAddingCamp(false);
    }
  };

  return (
    <div className="p-4 space-y-4 max-w-2xl mx-auto pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-amber-700 via-orange-800 to-slate-900 text-white rounded-3xl p-5 shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
              <Calendar className="w-4 h-4 text-white" />
            </div>
            <span className="text-[11px] font-bold text-amber-200 uppercase tracking-wider">
              Community Health Events
            </span>
          </div>

          {currentUser?.role === 'admin' && (
            <button
              onClick={openAddModal}
              className="py-1.5 px-3 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold rounded-xl flex items-center gap-1 shadow-sm transition-all active:scale-95"
            >
              <Plus className="w-3.5 h-3.5" /> Post New Camp
            </button>
          )}
        </div>

        <h2 className="text-xl font-black tracking-tight">Karachi HIV Awareness & Testing Camps</h2>
        <p className="text-xs text-amber-100/90 mt-1 leading-relaxed">
          Free, anonymous community outreach camps offering rapid fingerprick screenings, medical
          counseling, and educational sessions across Karachi districts.
        </p>
      </div>

      {/* Toggle Upcoming vs Previous Camps */}
      <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-2xl">
        <button
          onClick={() => setActiveTab('upcoming')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'upcoming'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Upcoming Camps ({camps.filter((c) => !c.isPast).length})
        </button>
        <button
          onClick={() => setActiveTab('past')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'past'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Previous Camps ({camps.filter((c) => c.isPast).length})
        </button>
      </div>

      {/* District Filter Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        {districtsList.map((dist) => (
          <button
            key={dist}
            onClick={() => setSelectedDistrict(dist)}
            className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
              selectedDistrict === dist
                ? 'bg-amber-700 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {dist}
          </button>
        ))}
      </div>

      {/* Camps Feed */}
      <div className="space-y-4">
        {filteredCamps.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-3xl p-8 text-center text-slate-500 text-xs">
            <p className="font-semibold text-slate-700">No camps found for this filter.</p>
            <p className="mt-1">
              Check back soon or call ZAB-Rabta helpline to request a camp in your neighborhood.
            </p>
          </div>
        ) : (
          filteredCamps.map((camp) => (
            <div
              key={camp.campId}
              className="bg-white border border-slate-200/90 rounded-3xl overflow-hidden shadow-xs hover:shadow-md transition-all space-y-3"
            >
              {/* Camp Poster Header */}
              {camp.imageUrl && (
                <div className="relative h-48 w-full bg-slate-900">
                  <img
                    src={camp.imageUrl}
                    alt={camp.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                  {/* Badges on poster */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-900/90 text-amber-300 backdrop-blur-xs px-2.5 py-1 rounded-full border border-amber-300/30">
                      {camp.district}
                    </span>
                    {camp.testingAvailable && (
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-600 text-white px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
                        <TestTube2 className="w-3 h-3" /> Free Rapid Testing
                      </span>
                    )}
                  </div>

                  {camp.isPast && (
                    <div className="absolute top-3 right-3 bg-slate-800/90 text-slate-300 text-[10px] font-bold uppercase px-2.5 py-1 rounded-full">
                      Concluded
                    </div>
                  )}

                  <div className="absolute bottom-3 left-4 right-4">
                    <h3 className="font-black text-lg text-white leading-tight drop-shadow-sm">
                      {camp.title}
                    </h3>
                  </div>
                </div>
              )}

              {/* Camp Details */}
              <div className="p-4.5 pt-1 space-y-3">
                {/* Date & Time pills */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs bg-amber-50/70 p-3 rounded-2xl border border-amber-100/80">
                  <div className="flex items-center gap-2 text-amber-950 font-semibold">
                    <Calendar className="w-4 h-4 text-amber-700 shrink-0" />
                    <span>{camp.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-amber-950 font-semibold">
                    <Clock className="w-4 h-4 text-amber-700 shrink-0" />
                    <span>{camp.time}</span>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-2 text-xs text-slate-700">
                  <MapPin className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <span className="font-medium">{camp.location}</span>
                </div>

                {/* Description & Awareness Information */}
                <p className="text-xs text-slate-600 leading-relaxed">{camp.description}</p>

                {/* Contact Information & Admin controls */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-1.5 text-xs text-slate-700">
                    <Phone className="w-3.5 h-3.5 text-teal-600" />
                    <span>Inquiries: </span>
                    <strong className="text-slate-900 font-mono">{camp.contact}</strong>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <a
                      href={`tel:${camp.contact}`}
                      className="py-1.5 px-3 bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold rounded-xl flex items-center gap-1 transition-all active:scale-95"
                    >
                      <PhoneCall className="w-3 h-3" /> Call
                    </a>

                    {currentUser?.role === 'admin' && (
                      <div className="flex items-center gap-1 ml-1 border-l border-slate-200 pl-2">
                        <button
                          onClick={() => openEditModal(camp)}
                          className="p-1.5 text-slate-500 hover:text-amber-700 hover:bg-amber-50 rounded-lg transition-colors"
                          title="Edit Camp"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Delete camp post "${camp.title}"?`)) {
                              deleteCamp(camp.campId);
                            }
                          }}
                          className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                          title="Delete Camp"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Admin Add/Edit Camp Modal */}
      {(isAddingCamp || editingCamp) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs"
            onClick={() => {
              setIsAddingCamp(false);
              setEditingCamp(null);
            }}
          />

          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl p-6 z-10 max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-black text-base text-slate-900">
                {editingCamp ? 'Edit Camp Post' : 'Post New Camp'}
              </h3>
              <button
                onClick={() => {
                  setIsAddingCamp(false);
                  setEditingCamp(null);
                }}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCamp} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Camp Title</label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                  placeholder="e.g. Karachi South Free Voluntary Testing Camp"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Date</label>
                  <input
                    type="text"
                    required
                    value={formDate}
                    onChange={(e) => setFormDate(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                    placeholder="October 15, 2026"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Time</label>
                  <input
                    type="text"
                    required
                    value={formTime}
                    onChange={(e) => setFormTime(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                    placeholder="09:00 AM - 03:00 PM"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">District</label>
                  <select
                    value={formDistrict}
                    onChange={(e) => setFormDistrict(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                  >
                    {districtsList
                      .filter((d) => d !== 'All')
                      .map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">
                    Contact Phone
                  </label>
                  <input
                    type="text"
                    required
                    value={formContact}
                    onChange={(e) => setFormContact(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                    placeholder="03303262384"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Location Details</label>
                <input
                  type="text"
                  required
                  value={formLocation}
                  onChange={(e) => setFormLocation(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                  placeholder="Community Center Grounds, Lyari, Karachi"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Poster Image URL</label>
                <input
                  type="url"
                  value={formImage}
                  onChange={(e) => setFormImage(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                  placeholder="https://..."
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Description</label>
                <textarea
                  rows={3}
                  required
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                  placeholder="Camp activities, counseling availability..."
                />
              </div>

              <div className="flex items-center gap-4 pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formTesting}
                    onChange={(e) => setFormTesting(e.target.checked)}
                    className="w-4 h-4 text-teal-600 rounded"
                  />
                  <span className="font-semibold text-slate-700">Free Rapid HIV Testing Available</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formIsPast}
                    onChange={(e) => setFormIsPast(e.target.checked)}
                    className="w-4 h-4 text-slate-600 rounded"
                  />
                  <span className="font-semibold text-slate-700">Mark as Concluded (Past)</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddingCamp(false);
                    setEditingCamp(null);
                  }}
                  className="px-4 py-2 text-slate-600 text-xs font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl shadow-md"
                >
                  Save Camp Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <DisclaimerBanner />
    </div>
  );
};
