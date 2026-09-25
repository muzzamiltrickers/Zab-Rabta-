import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Logo } from '../components/Logo';
import { DisclaimerBanner } from '../components/DisclaimerBanner';
import {
  Phone,
  PhoneCall,
  MessageSquare,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Send,
  CheckCircle2,
  Share2,
} from 'lucide-react';

export const ContactScreen: React.FC = () => {
  const { settings, showToast } = useApp();

  const [inquiryName, setInquiryName] = useState('');
  const [inquiryContact, setInquiryContact] = useState('');
  const [inquiryDistrict, setInquiryDistrict] = useState('Karachi South');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryMessage.trim()) return;

    // Send via WhatsApp or copy message
    const formatted = `Hello ZAB-Rabta,\nName: ${inquiryName || 'Anonymous'}\nDistrict: ${inquiryDistrict}\nMessage: ${inquiryMessage}`;
    const waUrl = `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(formatted)}`;

    setSubmitted(true);
    showToast('Inquiry drafted! Opening confidential chat...');
    window.open(waUrl, '_blank');
  };

  return (
    <div className="p-4 space-y-4 max-w-2xl mx-auto pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-teal-800 via-teal-900 to-slate-950 text-white rounded-3xl p-6 shadow-md text-center">
        <div className="inline-flex justify-center mb-2">
          <Logo size="lg" showText={false} light={true} />
        </div>
        <h2 className="text-2xl font-black tracking-tight">Contact ZAB-Rabta</h2>
        <p className="text-xs text-teal-200 mt-1 max-w-sm mx-auto">
          Official Community Support, HIV Awareness & Voluntary Testing Helpdesk for Karachi, Sindh.
        </p>

        {/* Primary Contact Number Callout */}
        <div className="mt-5 p-4 bg-white/10 backdrop-blur-xs rounded-2xl border border-white/15 max-w-xs mx-auto">
          <span className="text-[11px] text-teal-200 font-semibold uppercase tracking-wider block mb-1">
            Direct Helpline Phone
          </span>
          <a
            href={`tel:${settings.contactNumber}`}
            className="text-2xl font-black text-white font-mono tracking-tight hover:text-teal-200 transition-colors"
          >
            {settings.contactNumber}
          </a>
        </div>
      </div>

      {/* Direct Call & WhatsApp Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <a
          href={`tel:${settings.contactNumber}`}
          className="p-4 bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white rounded-2xl font-black text-sm flex items-center justify-center gap-2.5 shadow-md shadow-teal-700/20 transition-all active:scale-98"
        >
          <PhoneCall className="w-5 h-5 animate-pulse" />
          <span>Call Helpline ({settings.contactNumber})</span>
        </a>

        <a
          href={`https://wa.me/${settings.whatsappNumber}?text=Hello%20ZAB-Rabta%2C%20I%20am%20contacting%20you%20for%20confidential%20HIV%20information.`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-4 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white rounded-2xl font-black text-sm flex items-center justify-center gap-2.5 shadow-md shadow-emerald-700/20 transition-all active:scale-98"
        >
          <MessageSquare className="w-5 h-5" />
          <span>Chat on WhatsApp</span>
        </a>
      </div>

      {/* Operating Information */}
      <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs space-y-3 text-xs">
        <h3 className="font-extrabold text-slate-900 text-sm uppercase tracking-wider">
          Contact & Coverage Details
        </h3>

        <div className="space-y-2.5 text-slate-700">
          <div className="flex items-start gap-3">
            <Clock className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-900">Helpline Hours:</strong>
              <p className="text-slate-600">Monday - Saturday: 8:00 AM - 8:00 PM (Emergency WhatsApp 24/7)</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <MapPin className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-900">Geographic Coverage:</strong>
              <p className="text-slate-600">
                All 7 Karachi Districts: Central, East, South, West, Korangi, Malir, Keamari.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Mail className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-900">Email Inquiries:</strong>
              <p className="text-slate-600 font-mono">info@zabrabta.org</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-900">Privacy Pledge:</strong>
              <p className="text-slate-600">
                Your calls and messages are strictly confidential. We never record calls or disclose
                conversations to third parties.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Confidential Inquiry Form */}
      <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs space-y-3">
        <h3 className="font-extrabold text-slate-900 text-sm uppercase tracking-wider">
          Send a Confidential Inquiry
        </h3>
        <p className="text-xs text-slate-500">
          Have a question about testing centers, upcoming camps, or need counseling? Fill this form to
          connect directly.
        </p>

        {submitted ? (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
            <h4 className="font-bold text-emerald-950 text-sm">Message Prepared!</h4>
            <p className="text-xs text-emerald-800">
              Your inquiry has been formulated. If WhatsApp did not open automatically, tap the WhatsApp
              button above.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="text-xs font-bold text-teal-700 underline pt-1"
            >
              Send Another Inquiry
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmitInquiry} className="space-y-3 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">
                  Name / Alias (Optional)
                </label>
                <input
                  type="text"
                  value={inquiryName}
                  onChange={(e) => setInquiryName(e.target.value)}
                  placeholder="Anonymous or Name"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Karachi District</label>
                <select
                  value={inquiryDistrict}
                  onChange={(e) => setInquiryDistrict(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                >
                  {[
                    'Karachi South',
                    'Karachi Central',
                    'Karachi East',
                    'Karachi West',
                    'Korangi',
                    'Malir',
                    'Keamari',
                  ].map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">
                Your Question or Inquiry
              </label>
              <textarea
                rows={3}
                required
                value={inquiryMessage}
                onChange={(e) => setInquiryMessage(e.target.value)}
                placeholder="Ask about free testing, clinic hours, camps, or general information..."
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-teal-600 hover:bg-teal-700 text-white font-extrabold rounded-xl shadow-xs flex items-center justify-center gap-2 text-xs transition-all active:scale-98 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Send Confidential Message via WhatsApp</span>
            </button>
          </form>
        )}
      </div>

      <DisclaimerBanner />
    </div>
  );
};
