import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Logo } from '../components/Logo';
import {
  Mail,
  Lock,
  User as UserIcon,
  ShieldCheck,
  Eye,
  EyeOff,
  ArrowRight,
  Check,
  AlertCircle,
  Sparkles,
} from 'lucide-react';

export const AuthScreen: React.FC = () => {
  const { login, register, navigateTo, showToast } = useApp();

  const [mode, setMode] = useState<'login' | 'signup' | 'forgot'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreedPrivacy, setAgreedPrivacy] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (mode === 'forgot') {
      if (!email.trim()) {
        setError('Please enter your registered email address.');
        return;
      }
      showToast('Password reset link sent to your email.');
      setMode('login');
      return;
    }

    if (mode === 'signup') {
      if (!name.trim()) {
        setError('Please enter your full name or nickname.');
        return;
      }
      if (!email.trim()) {
        setError('Please enter a valid email address.');
        return;
      }
      if (password.length < 6) {
        setError('Password must be at least 6 characters long.');
        return;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        return;
      }
      if (!agreedPrivacy) {
        setError('You must accept the Privacy Policy to create an account.');
        return;
      }

      setLoading(true);
      const res = await register(name, email, password);
      setLoading(false);
      if (res.success) {
        navigateTo('home');
      } else {
        setError(res.message || 'Registration failed.');
      }
    } else {
      // Login
      if (!email.trim()) {
        setError('Please enter your email.');
        return;
      }
      if (!password) {
        setError('Please enter your password.');
        return;
      }

      setLoading(true);
      const res = await login(email, password);
      setLoading(false);
      if (res.success) {
        navigateTo('home');
      } else {
        setError(res.message || 'Login failed.');
      }
    }
  };

  const handleQuickDemo = async (type: 'citizen' | 'admin') => {
    setError(null);
    if (type === 'admin') {
      await login('admin@zabrabta.org');
      navigateTo('home');
    } else {
      await login('citizen@zabrabta.org');
      navigateTo('home');
    }
  };

  return (
    <div className="p-4 sm:p-6 max-w-md mx-auto min-h-full flex flex-col justify-center">
      {/* Brand Header */}
      <div className="text-center mb-6">
        <div className="inline-flex justify-center mb-3">
          <Logo size="lg" showText={false} />
        </div>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">
          {mode === 'login' && 'Welcome Back'}
          {mode === 'signup' && 'Create Confidential Account'}
          {mode === 'forgot' && 'Reset Password'}
        </h2>
        <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
          {mode === 'login' && 'Sign in to access your private medicine reminders and Karachi resources.'}
          {mode === 'signup' && 'Your personal information is kept strictly confidential. No health status is ever stored.'}
          {mode === 'forgot' && 'Enter your email to receive recovery instructions.'}
        </p>
      </div>

      {/* Demo fast-switches */}
      <div className="mb-5 bg-teal-50/70 border border-teal-200/80 rounded-2xl p-3">
        <div className="flex items-center justify-between text-[11px] font-semibold text-teal-900 mb-2">
          <span className="flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            Quick Demo Logins:
          </span>
          <span className="text-[10px] text-teal-700">Instant Access</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => handleQuickDemo('citizen')}
            className="py-1.5 px-2 bg-white hover:bg-teal-100 text-teal-800 text-xs font-bold rounded-xl border border-teal-200 transition-colors flex items-center justify-center gap-1 shadow-2xs"
          >
            👤 Citizen User
          </button>
          <button
            type="button"
            onClick={() => handleQuickDemo('admin')}
            className="py-1.5 px-2 bg-slate-900 hover:bg-slate-800 text-amber-300 text-xs font-bold rounded-xl border border-slate-700 transition-colors flex items-center justify-center gap-1 shadow-2xs"
          >
            🛡️ Admin Portal
          </button>
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
        {error && (
          <div className="mb-4 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl p-3 text-xs flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Full Name / Alias
              </label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Tariq Khan"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-teal-500 transition-all"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-teal-500 transition-all"
              />
            </div>
          </div>

          {mode !== 'forgot' && (
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Password
                </label>
                {mode === 'login' && (
                  <button
                    type="button"
                    onClick={() => setMode('forgot')}
                    className="text-[11px] font-semibold text-teal-700 hover:underline"
                  >
                    Forgot Password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-teal-500 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          )}

          {mode === 'signup' && (
            <>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-10 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-teal-500 transition-all"
                  />
                </div>
              </div>

              {/* Privacy Policy Checkbox (Required) */}
              <div className="pt-1">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreedPrivacy}
                    onChange={(e) => setAgreedPrivacy(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded text-teal-600 focus:ring-teal-500 border-slate-300"
                  />
                  <span className="text-xs text-slate-600 leading-tight">
                    I agree to the{' '}
                    <button
                      type="button"
                      onClick={() => navigateTo('privacy')}
                      className="text-teal-700 font-bold hover:underline"
                    >
                      Privacy Policy
                    </button>{' '}
                    and acknowledge that this app does not replace professional medical advice.
                  </span>
                </label>
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white font-extrabold rounded-xl shadow-md shadow-teal-600/20 flex items-center justify-center gap-2 text-sm transition-all active:scale-98 cursor-pointer mt-2"
          >
            <span>
              {mode === 'login' && 'Sign In'}
              {mode === 'signup' && 'Create Account'}
              {mode === 'forgot' && 'Send Reset Email'}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Toggle Mode */}
        <div className="mt-5 pt-4 border-t border-slate-100 text-center text-xs text-slate-600">
          {mode === 'login' ? (
            <p>
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => {
                  setError(null);
                  setMode('signup');
                }}
                className="text-teal-700 font-bold hover:underline"
              >
                Sign Up
              </button>
            </p>
          ) : (
            <p>
              Already registered?{' '}
              <button
                type="button"
                onClick={() => {
                  setError(null);
                  setMode('login');
                }}
                className="text-teal-700 font-bold hover:underline"
              >
                Log In
              </button>
            </p>
          )}
        </div>
      </div>

      {/* Health privacy note */}
      <div className="mt-6 flex items-center justify-center gap-2 text-slate-400 text-xs">
        <ShieldCheck className="w-4 h-4 text-teal-600" />
        <span>Strict zero-health-tracking privacy guarantee</span>
      </div>
    </div>
  );
};
