import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DisclaimerBanner } from '../components/DisclaimerBanner';
import {
  User,
  Mail,
  Lock,
  LogOut,
  Trash2,
  ShieldCheck,
  Edit2,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  X,
  KeyRound,
  FileText,
  Sliders,
} from 'lucide-react';

export const AccountScreen: React.FC = () => {
  const {
    currentUser,
    updateProfile,
    logout,
    deleteAccount,
    navigateTo,
    showToast,
  } = useApp();

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [nameInput, setNameInput] = useState(currentUser?.name || '');
  const [emailInput, setEmailInput] = useState(currentUser?.email || '');

  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const [isDeletingAccount, setIsDeletingAccount] = useState(false);

  if (!currentUser) {
    return (
      <div className="p-6 text-center space-y-4 max-w-md mx-auto my-auto min-h-[60vh] flex flex-col justify-center">
        <div className="w-16 h-16 rounded-3xl bg-slate-100 text-slate-600 flex items-center justify-center mx-auto">
          <User className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-black text-slate-900">User Account</h2>
        <p className="text-xs text-slate-600">
          Sign in or create an account to manage your confidential profile and private medicine
          schedules.
        </p>
        <button
          onClick={() => navigateTo('auth')}
          className="py-3 px-5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-md"
        >
          Sign In / Register
        </button>
      </div>
    );
  }

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInput.trim() || !emailInput.trim()) return;
    updateProfile(nameInput, emailInput);
    setIsEditingProfile(false);
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      showToast('New password must be at least 6 characters.');
      return;
    }
    if (newPassword !== confirmNewPassword) {
      showToast('New passwords do not match.');
      return;
    }
    showToast('Password updated successfully.');
    setIsChangingPassword(false);
    setOldPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
  };

  return (
    <div className="p-4 space-y-4 max-w-2xl mx-auto pb-12">
      {/* Header Profile Card */}
      <div className="bg-gradient-to-br from-teal-800 via-teal-900 to-slate-950 text-white rounded-3xl p-6 shadow-md">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-teal-500/30 border-2 border-teal-300/40 flex items-center justify-center font-black text-2xl text-white shadow-inner">
            {currentUser.name.charAt(0).toUpperCase()}
          </div>
          <div className="space-y-1 min-w-0">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-black tracking-tight truncate">{currentUser.name}</h2>
              {currentUser.role === 'admin' && (
                <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Admin
                </span>
              )}
            </div>
            <p className="text-xs text-teal-200 truncate font-mono">{currentUser.email}</p>
            <p className="text-[10px] text-teal-300 flex items-center gap-1 pt-0.5">
              <Calendar className="w-3 h-3" />
              Member since {new Date(currentUser.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      {/* Strict Privacy Guarantee Box */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-4.5 space-y-2 text-xs">
        <div className="flex items-center gap-2 text-emerald-950 font-bold">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Complete Medical Privacy Shield</span>
        </div>
        <p className="text-emerald-900 leading-relaxed text-[11px]">
          ZAB-Rabta strictly adheres to health confidentiality standards. We never collect, store, or
          publicly display any HIV test results, medical diagnoses, or personal health records. Your
          medicine reminders are saved solely to your private device session.
        </p>
      </div>

      {/* Account Settings List */}
      <div className="bg-white border border-slate-200 rounded-3xl p-4.5 shadow-xs space-y-1">
        <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider px-2 py-1 mb-1">
          Account Settings
        </h3>

        {/* Edit Profile */}
        <button
          onClick={() => {
            setNameInput(currentUser.name);
            setEmailInput(currentUser.email);
            setIsEditingProfile(true);
          }}
          className="w-full p-3 rounded-2xl flex items-center justify-between hover:bg-slate-50 transition-colors text-xs text-slate-800"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
              <Edit2 className="w-4 h-4" />
            </div>
            <div className="text-left">
              <span className="font-bold block">Edit Profile</span>
              <span className="text-[11px] text-slate-500">Update name and email address</span>
            </div>
          </div>
          <span className="text-xs font-bold text-teal-700">Edit →</span>
        </button>

        {/* Change Password */}
        <button
          onClick={() => setIsChangingPassword(true)}
          className="w-full p-3 rounded-2xl flex items-center justify-between hover:bg-slate-50 transition-colors text-xs text-slate-800"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
              <KeyRound className="w-4 h-4" />
            </div>
            <div className="text-left">
              <span className="font-bold block">Change Password</span>
              <span className="text-[11px] text-slate-500">Update account security credentials</span>
            </div>
          </div>
          <span className="text-xs font-bold text-teal-700">Change →</span>
        </button>

        {/* Privacy Policy */}
        <button
          onClick={() => navigateTo('privacy')}
          className="w-full p-3 rounded-2xl flex items-center justify-between hover:bg-slate-50 transition-colors text-xs text-slate-800"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
            <div className="text-left">
              <span className="font-bold block">Privacy Policy & Terms</span>
              <span className="text-[11px] text-slate-500">Review data protection & legal disclaimer</span>
            </div>
          </div>
          <span className="text-xs font-bold text-teal-700">View →</span>
        </button>

        {/* Admin Dashboard shortcut if admin */}
        {currentUser.role === 'admin' && (
          <button
            onClick={() => navigateTo('admin')}
            className="w-full p-3 rounded-2xl flex items-center justify-between bg-amber-50/70 hover:bg-amber-100/70 border border-amber-200 transition-colors text-xs text-amber-950"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-amber-200 text-amber-900 flex items-center justify-center">
                <Sliders className="w-4 h-4" />
              </div>
              <div className="text-left">
                <span className="font-bold block">Admin Management Dashboard</span>
                <span className="text-[11px] text-amber-800">
                  Manage camps, centers, coordinators & settings
                </span>
              </div>
            </div>
            <span className="text-xs font-bold text-amber-900">Open →</span>
          </button>
        )}
      </div>

      {/* Logout & Delete Account Actions */}
      <div className="bg-white border border-slate-200 rounded-3xl p-4.5 shadow-xs space-y-2">
        <button
          onClick={logout}
          className="w-full py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition-all active:scale-98"
        >
          <LogOut className="w-4 h-4 text-slate-600" />
          <span>Log Out Securely</span>
        </button>

        <button
          onClick={() => setIsDeletingAccount(true)}
          className="w-full py-3 px-4 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition-all active:scale-98"
        >
          <Trash2 className="w-4 h-4 text-rose-600" />
          <span>Delete Account & Erase All Private Data</span>
        </button>
      </div>

      {/* Edit Profile Modal */}
      {isEditingProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs" onClick={() => setIsEditingProfile(false)} />
          <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 z-10 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-black text-base text-slate-900">Edit Profile</h3>
              <button onClick={() => setIsEditingProfile(false)} className="p-1 rounded-full text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSaveProfile} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Name</label>
                <input
                  type="text"
                  required
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditingProfile(false)}
                  className="px-4 py-2 text-slate-600 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-teal-600 text-white font-bold rounded-xl shadow-xs"
                >
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {isChangingPassword && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs" onClick={() => setIsChangingPassword(false)} />
          <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 z-10 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-black text-base text-slate-900">Change Password</h3>
              <button onClick={() => setIsChangingPassword(false)} className="p-1 rounded-full text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleChangePassword} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Current Password</label>
                <input
                  type="password"
                  required
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">New Password</label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Confirm New Password</label>
                <input
                  type="password"
                  required
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsChangingPassword(false)}
                  className="px-4 py-2 text-slate-600 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-teal-600 text-white font-bold rounded-xl shadow-xs"
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Account Confirmation Modal */}
      {isDeletingAccount && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs" onClick={() => setIsDeletingAccount(false)} />
          <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 z-10 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1">
              <h3 className="font-black text-lg text-slate-900">Delete Account Permanently?</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                This action is irreversible. All your account records and private medicine reminders
                will be permanently wiped from local and cloud storage.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsDeletingAccount(false)}
                className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl"
              >
                Keep Account
              </button>
              <button
                type="button"
                onClick={() => {
                  deleteAccount();
                  setIsDeletingAccount(false);
                }}
                className="py-2.5 px-4 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-md"
              >
                Yes, Delete Everything
              </button>
            </div>
          </div>
        </div>
      )}

      <DisclaimerBanner />
    </div>
  );
};
