import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { District } from '../types';
import { DisclaimerBanner } from '../components/DisclaimerBanner';
import {
  Map,
  User,
  Phone,
  Calendar,
  Building,
  Edit2,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  X,
  PhoneCall,
} from 'lucide-react';

export const DistrictsScreen: React.FC = () => {
  const {
    districts,
    camps,
    centers,
    currentUser,
    updateDistrictCoordinator,
    navigateTo,
  } = useApp();

  const [editingDistrict, setEditingDistrict] = useState<District | null>(null);
  const [coordinatorInput, setCoordinatorInput] = useState('');
  const [descriptionInput, setDescriptionInput] = useState('');

  const openEditModal = (d: District) => {
    setEditingDistrict(d);
    setCoordinatorInput(d.coordinatorContact);
    setDescriptionInput(d.description);
  };

  const handleSaveCoordinator = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDistrict) return;
    updateDistrictCoordinator(
      editingDistrict.districtId,
      coordinatorInput,
      descriptionInput
    );
    setEditingDistrict(null);
  };

  return (
    <div className="p-4 space-y-4 max-w-2xl mx-auto pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-purple-800 via-indigo-900 to-slate-950 text-white rounded-3xl p-5 shadow-md">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
            <Map className="w-4 h-4 text-white" />
          </div>
          <span className="text-[11px] font-bold text-purple-200 uppercase tracking-wider">
            Citywide Health Coordination
          </span>
        </div>
        <h2 className="text-xl font-black tracking-tight">Karachi's 7 Administrative Districts</h2>
        <p className="text-xs text-purple-100/90 mt-1 leading-relaxed">
          Comprehensive district-level HIV voluntary screening programs, focal treatment centers,
          upcoming awareness camps, and district health coordinators.
        </p>
      </div>

      {/* District Cards */}
      <div className="space-y-4">
        {districts.map((district) => {
          // Find centers in this district
          const districtCenters = centers.filter(
            (c) => c.district.toLowerCase() === district.name.toLowerCase()
          );

          // Find camps in this district
          const districtCamps = camps.filter(
            (c) => c.district.toLowerCase() === district.name.toLowerCase()
          );

          const isComingSoon = district.coordinatorContact.toLowerCase().includes('coming soon');

          return (
            <div
              key={district.districtId}
              className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs hover:border-purple-200 transition-all space-y-3.5"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-600" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700">
                      Karachi District
                    </span>
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-lg leading-tight mt-0.5">
                    {district.name}
                  </h3>
                </div>

                {currentUser?.role === 'admin' && (
                  <button
                    onClick={() => openEditModal(district)}
                    className="p-1.5 text-slate-500 hover:text-purple-700 hover:bg-purple-50 rounded-lg transition-colors flex items-center gap-1 text-xs font-semibold"
                    title="Edit Coordinator Details"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>
                )}
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">{district.description}</p>

              {/* Coordinator Contact Box */}
              <div className="bg-purple-50/70 border border-purple-100 rounded-2xl p-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-purple-200/80 text-purple-900 flex items-center justify-center shrink-0">
                    <User className="w-4 h-4" />
                  </div>
                  <div className="leading-tight">
                    <span className="text-[10px] font-bold uppercase text-purple-900 tracking-wider">
                      District Coordinator Contact
                    </span>
                    <p
                      className={`text-xs font-bold mt-0.5 ${
                        isComingSoon ? 'text-amber-800 italic' : 'text-purple-950 font-mono'
                      }`}
                    >
                      {district.coordinatorContact}
                    </p>
                  </div>
                </div>

                {!isComingSoon && (
                  <a
                    href={`tel:${district.coordinatorContact}`}
                    className="p-2 bg-purple-700 text-white rounded-xl hover:bg-purple-800 transition-all active:scale-95"
                    title="Call Coordinator"
                  >
                    <PhoneCall className="w-4 h-4" />
                  </a>
                )}
              </div>

              {/* Focal Health Facilities */}
              {districtCenters.length > 0 ? (
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                    Focal Treatment & Testing Centers ({districtCenters.length})
                  </span>
                  <div className="space-y-1">
                    {districtCenters.map((c) => (
                      <div
                        key={c.centerId}
                        onClick={() => navigateTo('centers')}
                        className="p-2 rounded-xl bg-slate-50 border border-slate-100 hover:bg-teal-50 hover:border-teal-200 cursor-pointer transition-colors flex items-center justify-between text-xs"
                      >
                        <span className="font-semibold text-slate-800 truncate">{c.name}</span>
                        <span className="text-[10px] font-bold text-teal-700 shrink-0">
                          View Details →
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-100 flex items-center justify-between">
                  <span>Referred to Civil Hospital & Lyari General tertiary hubs.</span>
                  <button
                    onClick={() => navigateTo('centers')}
                    className="text-teal-700 font-bold hover:underline"
                  >
                    All Centers
                  </button>
                </div>
              )}

              {/* Camps in this district */}
              {districtCamps.length > 0 && (
                <div className="pt-1">
                  <button
                    onClick={() => navigateTo('camps')}
                    className="w-full py-2 px-3 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-xl text-xs font-bold text-amber-900 flex items-center justify-between transition-colors"
                  >
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-amber-700" />
                      <span>{districtCamps.length} Camp(s) Scheduled in {district.name}</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-amber-700" />
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Admin Coordinator Edit Modal */}
      {editingDistrict && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs"
            onClick={() => setEditingDistrict(null)}
          />

          <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 z-10 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-black text-base text-slate-900">
                Edit {editingDistrict.name} Coordinator
              </h3>
              <button
                onClick={() => setEditingDistrict(null)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCoordinator} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">
                  Coordinator Contact Phone
                </label>
                <input
                  type="text"
                  required
                  value={coordinatorInput}
                  onChange={(e) => setCoordinatorInput(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                  placeholder="e.g. 03303262384 or Coming Soon"
                />
                <span className="text-[10px] text-slate-500 mt-1 block">
                  Initial default is "Coming Soon". Enter official coordinator mobile when available.
                </span>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">
                  District Health Description
                </label>
                <textarea
                  rows={3}
                  value={descriptionInput}
                  onChange={(e) => setDescriptionInput(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingDistrict(null)}
                  className="px-4 py-2 text-slate-600 text-xs font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold rounded-xl shadow-md"
                >
                  Save Changes
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
