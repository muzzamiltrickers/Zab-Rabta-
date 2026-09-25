import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MedicineReminder } from '../types';
import { DisclaimerBanner } from '../components/DisclaimerBanner';
import {
  BellRing,
  Plus,
  Clock,
  Calendar,
  CheckCircle2,
  Trash2,
  Edit2,
  Volume2,
  ShieldCheck,
  AlertTriangle,
  Lock,
  X,
  FileText,
  UserCheck,
} from 'lucide-react';

export const RemindersScreen: React.FC = () => {
  const {
    currentUser,
    reminders,
    addReminder,
    updateReminder,
    deleteReminder,
    toggleReminderTaken,
    triggerSoundAlert,
    navigateTo,
  } = useApp();

  const [isAdding, setIsAdding] = useState(false);
  const [editingReminder, setEditingReminder] = useState<MedicineReminder | null>(null);

  // Form states
  const [medName, setMedName] = useState('');
  const [remTime, setRemTime] = useState('09:00');
  const [frequency, setFrequency] = useState('Once Daily');
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState('');
  const [notes, setNotes] = useState('');

  const frequencyOptions = [
    'Once Daily (Every 24h)',
    'Twice Daily (Every 12h)',
    'Three Times Daily (Every 8h)',
    'Weekly',
    'Custom Doctor Schedule',
  ];

  const openAddModal = () => {
    setMedName('');
    setRemTime('09:00');
    setFrequency('Once Daily (Every 24h)');
    setStartDate(new Date().toISOString().split('T')[0]);
    setEndDate('');
    setNotes('Take with clean water after food as advised by physician.');
    setIsAdding(true);
  };

  const openEditModal = (r: MedicineReminder) => {
    setEditingReminder(r);
    setMedName(r.medicineName);
    setRemTime(r.time);
    setFrequency(r.frequency);
    setStartDate(r.startDate);
    setEndDate(r.endDate || '');
    setNotes(r.notes || '');
  };

  const handleSaveReminder = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingReminder) {
      updateReminder({
        ...editingReminder,
        medicineName: medName,
        time: remTime,
        frequency,
        startDate,
        endDate: endDate || undefined,
        notes: notes || undefined,
      });
      setEditingReminder(null);
    } else {
      addReminder({
        medicineName: medName,
        time: remTime,
        frequency,
        startDate,
        endDate: endDate || undefined,
        notes: notes || undefined,
        takenToday: false,
      });
      setIsAdding(false);
    }
  };

  // If not logged in, prompt user to log in or create account
  if (!currentUser) {
    return (
      <div className="p-4 sm:p-6 max-w-md mx-auto text-center space-y-4 my-auto min-h-[60vh] flex flex-col justify-center">
        <div className="w-16 h-16 rounded-3xl bg-teal-100 text-teal-700 flex items-center justify-center mx-auto shadow-sm">
          <Lock className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-black text-slate-900">Private Medicine Reminders</h2>
        <p className="text-xs text-slate-600 leading-relaxed max-w-xs mx-auto">
          To maintain strict medical privacy and ensure zero public exposure, your medicine reminders
          are encrypted and tied only to your confidential account.
        </p>
        <div className="pt-2 space-y-2">
          <button
            onClick={() => navigateTo('auth')}
            className="w-full py-3 px-4 bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-all"
          >
            Sign In to Access Reminders
          </button>
        </div>
        <DisclaimerBanner compact={true} />
      </div>
    );
  }

  const takenCount = reminders.filter((r) => r.takenToday).length;

  return (
    <div className="p-4 space-y-4 max-w-2xl mx-auto pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-sky-700 via-teal-800 to-slate-900 text-white rounded-3xl p-5 shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
              <BellRing className="w-4 h-4 text-white" />
            </div>
            <span className="text-[11px] font-bold text-sky-200 uppercase tracking-wider">
              Private Adherence Tool
            </span>
          </div>

          <button
            onClick={openAddModal}
            className="py-1.5 px-3 bg-white text-slate-950 text-xs font-black rounded-xl flex items-center gap-1 shadow-sm hover:bg-sky-50 transition-all active:scale-95"
          >
            <Plus className="w-3.5 h-3.5 text-teal-700" /> Add Reminder
          </button>
        </div>

        <h2 className="text-xl font-black tracking-tight">Medicine Adherence Reminders</h2>
        <p className="text-xs text-sky-100/90 mt-1 leading-relaxed">
          Private, local reminders to help you take doctor-prescribed medications consistently on time.
        </p>

        {/* Adherence Progress Ticker */}
        {reminders.length > 0 && (
          <div className="mt-4 pt-3 border-t border-white/15 flex items-center justify-between text-xs">
            <span className="text-sky-100 font-medium">
              Today's Adherence: <strong>{takenCount} of {reminders.length} doses taken</strong>
            </span>
            <span className="bg-emerald-500/30 text-emerald-200 font-bold px-2 py-0.5 rounded-full text-[10px]">
              {takenCount === reminders.length ? '100% Adherent Today' : 'In Progress'}
            </span>
          </div>
        )}
      </div>

      {/* Critical Health Safety Disclaimer Callout */}
      <div className="bg-amber-50/90 border border-amber-300 rounded-2xl p-4 flex items-start gap-3 text-amber-950">
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="text-xs space-y-1">
          <h4 className="font-extrabold uppercase tracking-wider text-amber-950 text-[11px]">
            Strict Adherence Disclaimer
          </h4>
          <p className="leading-relaxed text-amber-900/90 font-medium">
            This tool is <strong>only</strong> a reminder schedule for medicines already prescribed by
            your qualified healthcare professional. ZAB-Rabta does not recommend, prescribe, or endorse
            any specific brand, drug, or dosage.
          </p>
        </div>
      </div>

      {/* User Privacy Guarantee */}
      <div className="bg-slate-100/90 border border-slate-200/80 rounded-2xl p-3 flex items-center justify-between text-xs text-slate-700">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-teal-700 shrink-0" />
          <span>Reminders are strictly private to {currentUser.name}.</span>
        </div>
        <span className="text-[10px] text-teal-800 font-semibold bg-white px-2 py-0.5 rounded-md">
          Encrypted Storage
        </span>
      </div>

      {/* Reminders List */}
      <div className="space-y-3">
        {reminders.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-3xl p-8 text-center text-slate-500 text-xs space-y-2">
            <p className="font-semibold text-slate-800 text-sm">No reminders added yet.</p>
            <p className="text-slate-500 max-w-xs mx-auto">
              Add your daily doctor-prescribed medications to receive alerts and keep track of daily adherence.
            </p>
            <button
              onClick={openAddModal}
              className="mt-2 py-2 px-4 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl text-xs inline-flex items-center gap-1.5 shadow-sm"
            >
              <Plus className="w-4 h-4" /> Add First Reminder
            </button>
          </div>
        ) : (
          reminders.map((reminder) => (
            <div
              key={reminder.reminderId}
              className={`border rounded-3xl p-4.5 shadow-xs transition-all space-y-3 ${
                reminder.takenToday
                  ? 'bg-emerald-50/50 border-emerald-200'
                  : 'bg-white border-slate-200 hover:border-teal-200'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-black text-slate-900">
                      {reminder.medicineName}
                    </span>
                    <span className="text-[10px] font-bold bg-teal-100 text-teal-800 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {reminder.time}
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 font-medium">
                    Frequency: <strong className="text-slate-800">{reminder.frequency}</strong>
                  </p>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => triggerSoundAlert(reminder.medicineName)}
                    className="p-1.5 text-slate-400 hover:text-teal-700 hover:bg-teal-50 rounded-lg transition-colors"
                    title="Test Sound Alarm"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => openEditModal(reminder)}
                    className="p-1.5 text-slate-400 hover:text-teal-700 hover:bg-teal-50 rounded-lg transition-colors"
                    title="Edit Schedule"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => {
                      if (confirm(`Delete reminder for ${reminder.medicineName}?`)) {
                        deleteReminder(reminder.reminderId);
                      }
                    }}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    title="Delete Reminder"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {reminder.notes && (
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-xs text-slate-600 flex items-start gap-2">
                  <FileText className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                  <span className="leading-snug">{reminder.notes}</span>
                </div>
              )}

              {/* Action: Mark as taken */}
              <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                <span className="text-[11px] text-slate-500">
                  Started: {reminder.startDate} {reminder.endDate ? `• Ends: ${reminder.endDate}` : ''}
                </span>

                <button
                  onClick={() => toggleReminderTaken(reminder.reminderId)}
                  className={`py-1.5 px-3.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                    reminder.takenToday
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-teal-100 hover:text-teal-800'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{reminder.takenToday ? 'Dose Taken Today' : 'Mark as Taken'}</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add / Edit Reminder Modal */}
      {(isAdding || editingReminder) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs"
            onClick={() => {
              setIsAdding(false);
              setEditingReminder(null);
            }}
          />

          <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 z-10 max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-black text-base text-slate-900">
                {editingReminder ? 'Edit Medicine Reminder' : 'Add Prescribed Medicine Reminder'}
              </h3>
              <button
                onClick={() => {
                  setIsAdding(false);
                  setEditingReminder(null);
                }}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveReminder} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">
                  Medicine Name (Prescribed)
                </label>
                <input
                  type="text"
                  required
                  value={medName}
                  onChange={(e) => setMedName(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                  placeholder="e.g. Prescribed Daily Tablet"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">
                    Reminder Time
                  </label>
                  <input
                    type="time"
                    required
                    value={remTime}
                    onChange={(e) => setRemTime(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Frequency</label>
                  <select
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                  >
                    {frequencyOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Start Date</label>
                  <input
                    type="date"
                    required
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">
                    End Date (Optional)
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">
                  Doctor's Instructions / Notes
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                  placeholder="e.g. Take with warm water after dinner. Do not skip."
                />
              </div>

              <div className="p-3 bg-amber-50 rounded-xl text-[11px] text-amber-900 border border-amber-200">
                <strong>Medical Reminder:</strong> Only enter medications prescribed to you by a licensed
                physician.
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsAdding(false);
                    setEditingReminder(null);
                  }}
                  className="px-4 py-2 text-slate-600 text-xs font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-xl shadow-md"
                >
                  Save Reminder
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
