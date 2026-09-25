import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Bell,
  X,
  CheckCircle2,
  Clock,
  Volume2,
  Calendar,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationModal: React.FC<NotificationModalProps> = ({ isOpen, onClose }) => {
  const { reminders, camps, toggleReminderTaken, triggerSoundAlert, navigateTo } = useApp();

  if (!isOpen) return null;

  const upcomingCamps = camps.filter((c) => !c.isPast).slice(0, 2);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={onClose}
      />

      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-700 to-cyan-800 p-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
              <Bell className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-sm">Notifications & Reminders</h3>
              <p className="text-[11px] text-teal-100">Private Medicine Alarms & Camp News</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/20 text-teal-100 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="p-4 space-y-4 overflow-y-auto flex-1">
          {/* Section 1: Medicine Reminders */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-teal-600" />
                Today's Medicine Schedule
              </h4>
              <button
                onClick={() => {
                  onClose();
                  navigateTo('reminders');
                }}
                className="text-[11px] font-semibold text-teal-700 hover:underline"
              >
                Manage All
              </button>
            </div>

            {reminders.length === 0 ? (
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 text-center">
                <p className="text-xs text-slate-600">No active medicine reminders set.</p>
                <button
                  onClick={() => {
                    onClose();
                    navigateTo('reminders');
                  }}
                  className="mt-2 text-xs font-bold text-teal-700 hover:text-teal-800"
                >
                  + Add Private Reminder
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                {reminders.map((reminder) => (
                  <div
                    key={reminder.reminderId}
                    className={`p-3 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                      reminder.takenToday
                        ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                        : 'bg-white border-slate-200 shadow-xs'
                    }`}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-slate-900 truncate">
                          {reminder.medicineName}
                        </span>
                        <span className="text-[10px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full">
                          {reminder.time}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 truncate mt-0.5">
                        {reminder.notes || reminder.frequency}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => triggerSoundAlert(reminder.medicineName)}
                        title="Test Reminder Chime"
                        className="p-1.5 text-slate-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => toggleReminderTaken(reminder.reminderId)}
                        className={`px-2.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition-all ${
                          reminder.takenToday
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-100 text-slate-700 hover:bg-teal-100 hover:text-teal-800'
                        }`}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {reminder.takenToday ? 'Taken' : 'Mark'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Section 2: Upcoming Camps */}
          <div>
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5 mb-2">
              <Calendar className="w-3.5 h-3.5 text-cyan-600" />
              Karachi Camp Announcements
            </h4>
            <div className="space-y-2">
              {upcomingCamps.map((camp) => (
                <div
                  key={camp.campId}
                  onClick={() => {
                    onClose();
                    navigateTo('camps');
                  }}
                  className="p-3 rounded-2xl bg-cyan-50/60 border border-cyan-200/80 hover:bg-cyan-50 cursor-pointer transition-colors"
                >
                  <div className="flex items-center justify-between text-[11px] text-cyan-800 font-semibold mb-1">
                    <span>{camp.district}</span>
                    <span>{camp.date}</span>
                  </div>
                  <h5 className="font-bold text-xs text-slate-900 line-clamp-1">{camp.title}</h5>
                  <p className="text-[11px] text-slate-600 line-clamp-1 mt-0.5">{camp.location}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Privacy Footnote */}
          <div className="bg-slate-100/80 rounded-xl p-2.5 flex items-center gap-2 text-[11px] text-slate-600">
            <ShieldCheck className="w-4 h-4 text-teal-700 shrink-0" />
            <span>Reminders are strictly confidential and stored only on your personal device.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
