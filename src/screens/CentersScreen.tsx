import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { HIVCenter } from '../types';
import { DisclaimerBanner } from '../components/DisclaimerBanner';
import {
  MapPin,
  Search,
  Phone,
  Clock,
  Navigation,
  CheckCircle2,
  Sliders,
  Plus,
  Edit2,
  Trash2,
  Building2,
  ExternalLink,
  X,
} from 'lucide-react';

export const CentersScreen: React.FC = () => {
  const {
    centers,
    currentUser,
    addCenter,
    updateCenter,
    deleteCenter,
    navigateTo,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('All');
  const [editingCenter, setEditingCenter] = useState<HIVCenter | null>(null);
  const [isAddingCenter, setIsAddingCenter] = useState(false);

  // Form state for Admin
  const [formName, setFormName] = useState('');
  const [formAddress, setFormAddress] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formDistrict, setFormDistrict] = useState('Karachi South');
  const [formHours, setFormHours] = useState('Mon - Sat: 8:00 AM - 2:00 PM');
  const [formServices, setFormServices] = useState('Voluntary Counseling & Testing, Free ART Dispensing');
  const [formLat, setFormLat] = useState('24.8600');
  const [formLng, setFormLng] = useState('67.0100');

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

  const filteredCenters = centers.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.services.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesDistrict =
      selectedDistrict === 'All' || c.district.toLowerCase() === selectedDistrict.toLowerCase();

    return matchesSearch && matchesDistrict;
  });

  const openAddModal = () => {
    setFormName('');
    setFormAddress('');
    setFormPhone('021-');
    setFormDistrict('Karachi South');
    setFormHours('Mon - Sat: 8:00 AM - 2:00 PM');
    setFormServices('Voluntary Counseling and Testing (VCT), Free ART Dispensing, CD4 Testing');
    setFormLat('24.8600');
    setFormLng('67.0100');
    setIsAddingCenter(true);
  };

  const openEditModal = (center: HIVCenter) => {
    setEditingCenter(center);
    setFormName(center.name);
    setFormAddress(center.address);
    setFormPhone(center.phone);
    setFormDistrict(center.district);
    setFormHours(center.openingHours);
    setFormServices(center.services.join(', '));
    setFormLat(center.latitude.toString());
    setFormLng(center.longitude.toString());
  };

  const handleSaveCenter = (e: React.FormEvent) => {
    e.preventDefault();
    const servicesArray = formServices
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    if (editingCenter) {
      updateCenter({
        ...editingCenter,
        name: formName,
        address: formAddress,
        phone: formPhone,
        district: formDistrict,
        openingHours: formHours,
        services: servicesArray,
        latitude: parseFloat(formLat) || 24.86,
        longitude: parseFloat(formLng) || 67.01,
      });
      setEditingCenter(null);
    } else {
      addCenter({
        name: formName,
        address: formAddress,
        phone: formPhone,
        district: formDistrict,
        openingHours: formHours,
        services: servicesArray,
        latitude: parseFloat(formLat) || 24.86,
        longitude: parseFloat(formLng) || 67.01,
        isGovernment: true,
      });
      setIsAddingCenter(false);
    }
  };

  return (
    <div className="p-4 space-y-4 max-w-2xl mx-auto pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-teal-700 via-teal-800 to-cyan-950 text-white rounded-3xl p-5 shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
              <MapPin className="w-4 h-4 text-white" />
            </div>
            <span className="text-[11px] font-bold text-teal-200 uppercase tracking-wider">
              Karachi Facilities
            </span>
          </div>

          {currentUser?.role === 'admin' && (
            <button
              onClick={openAddModal}
              className="py-1.5 px-3 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold rounded-xl flex items-center gap-1 shadow-sm transition-all active:scale-95"
            >
              <Plus className="w-3.5 h-3.5" /> Add Center
            </button>
          )}
        </div>

        <h2 className="text-xl font-black tracking-tight">Karachi HIV Testing & ART Centers</h2>
        <p className="text-xs text-teal-100/90 mt-1 leading-relaxed">
          Authorized public healthcare facilities offering free testing, counseling, CD4 monitoring,
          and Antiretroviral Therapy (ART) dispensing.
        </p>
      </div>

      {/* Search and District Filter */}
      <div className="space-y-2">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Search center name, address, or service..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-teal-500 shadow-2xs"
          />
        </div>

        {/* District selection pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {districtsList.map((dist) => (
            <button
              key={dist}
              onClick={() => setSelectedDistrict(dist)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                selectedDistrict === dist
                  ? 'bg-teal-700 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {dist}
            </button>
          ))}
        </div>
      </div>

      {/* Centers Count */}
      <div className="flex items-center justify-between px-1 text-xs text-slate-500">
        <span>Showing {filteredCenters.length} verified centers</span>
        <button
          onClick={() => navigateTo('districts')}
          className="text-teal-700 font-bold hover:underline"
        >
          View 7 Karachi Districts
        </button>
      </div>

      {/* Centers List */}
      <div className="space-y-4">
        {filteredCenters.map((center) => (
          <div
            key={center.centerId}
            className="bg-white border border-slate-200/90 rounded-3xl p-5 shadow-xs hover:shadow-md transition-all space-y-3.5 relative"
          >
            {/* Top row */}
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-teal-100 text-teal-800 px-2 py-0.5 rounded-full">
                    {center.district}
                  </span>
                  {center.isGovernment && (
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                      Free Govt Center
                    </span>
                  )}
                </div>
                <h3 className="font-extrabold text-slate-900 text-base leading-tight">
                  {center.name}
                </h3>
                <p className="text-xs text-slate-500 leading-snug flex items-start gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                  <span>{center.address}</span>
                </p>
              </div>

              {/* Admin quick controls */}
              {currentUser?.role === 'admin' && (
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => openEditModal(center)}
                    className="p-1.5 text-slate-500 hover:text-teal-700 hover:bg-teal-50 rounded-lg transition-colors"
                    title="Edit Center"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Are you sure you want to delete ${center.name}?`)) {
                        deleteCenter(center.centerId);
                      }
                    }}
                    className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    title="Delete Center"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Timings and Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs bg-slate-50 p-3 rounded-2xl border border-slate-100">
              <div className="flex items-center gap-2 text-slate-700">
                <Clock className="w-4 h-4 text-teal-600 shrink-0" />
                <span>
                  <strong className="text-slate-900">Hours:</strong> {center.openingHours}
                </span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <Phone className="w-4 h-4 text-teal-600 shrink-0" />
                <span className="truncate">
                  <strong className="text-slate-900">Phone:</strong> {center.phone}
                </span>
              </div>
            </div>

            {/* Services Tags */}
            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                Available Services:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {center.services.map((srv, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] font-medium bg-teal-50 text-teal-900 border border-teal-200/80 px-2.5 py-0.5 rounded-full"
                  >
                    {srv}
                  </span>
                ))}
              </div>
            </div>

            {/* Map-ready Coordinates Display */}
            <div className="text-[10px] text-slate-400 flex items-center justify-between border-t border-slate-100 pt-2">
              <span>
                Coordinates: {center.latitude.toFixed(4)}° N, {center.longitude.toFixed(4)}° E
              </span>
              <span className="text-emerald-700 font-semibold">100% Free Consultation</span>
            </div>

            {/* Action Buttons: Get Directions & Call */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${center.latitude},${center.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-3 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-all active:scale-98"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Get Directions</span>
              </a>

              <a
                href={`tel:${center.phone.split('/')[0].trim()}`}
                className="py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-900 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all active:scale-98"
              >
                <Phone className="w-3.5 h-3.5 text-teal-700" />
                <span>Call Center</span>
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Admin Add/Edit Modal */}
      {(isAddingCenter || editingCenter) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs"
            onClick={() => {
              setIsAddingCenter(false);
              setEditingCenter(null);
            }}
          />

          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl p-6 z-10 max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-black text-base text-slate-900">
                {editingCenter ? 'Edit Health Center' : 'Add New Health Center'}
              </h3>
              <button
                onClick={() => {
                  setIsAddingCenter(false);
                  setEditingCenter(null);
                }}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCenter} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Center Name</label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                  placeholder="e.g. Lyari General Hospital"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Address</label>
                <input
                  type="text"
                  required
                  value={formAddress}
                  onChange={(e) => setFormAddress(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                  placeholder="Road, Area, Karachi"
                />
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
                  <label className="block font-bold text-slate-700 uppercase mb-1">Phone</label>
                  <input
                    type="text"
                    required
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                    placeholder="021-99215740"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Opening Hours</label>
                <input
                  type="text"
                  required
                  value={formHours}
                  onChange={(e) => setFormHours(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                  placeholder="Mon - Sat: 8:00 AM - 2:00 PM"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">
                  Services (Comma Separated)
                </label>
                <textarea
                  rows={2}
                  required
                  value={formServices}
                  onChange={(e) => setFormServices(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                  placeholder="VCT, Free ART Center, CD4 Testing, PMTCT"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Latitude</label>
                  <input
                    type="number"
                    step="0.0001"
                    value={formLat}
                    onChange={(e) => setFormLat(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Longitude</label>
                  <input
                    type="number"
                    step="0.0001"
                    value={formLng}
                    onChange={(e) => setFormLng(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddingCenter(false);
                    setEditingCenter(null);
                  }}
                  className="px-4 py-2 text-slate-600 text-xs font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-xl shadow-md"
                >
                  Save Center
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
