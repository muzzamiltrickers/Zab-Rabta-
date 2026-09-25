import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  ShieldAlert,
  Syringe,
  AlertTriangle,
  FileText,
  Users,
  Baby,
  HeartHandshake,
  CheckCircle,
  HelpCircle,
  ExternalLink,
  Download,
  Share2,
  Shield,
  Heart,
} from 'lucide-react';

const PamphletCoverGraphic: React.FC<{ compact?: boolean }> = ({ compact = false }) => (
  <div className={`relative rounded-2xl overflow-hidden shadow-lg border-2 border-amber-300 bg-gradient-to-b from-amber-500 via-rose-600 to-amber-700 text-white p-5 flex flex-col justify-between items-center text-center ${compact ? 'max-w-[280px] w-full min-h-[340px]' : 'max-w-[340px] w-full min-h-[380px]'}`}>
    {/* Decorative background ambient glows */}
    <div className="absolute -top-12 -right-12 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none" />
    <div className="absolute -bottom-10 -left-10 w-28 h-28 bg-black/25 rounded-full blur-lg pointer-events-none" />

    {/* Top Header Badge */}
    <div className="z-10 w-full flex items-center justify-between pb-2 border-b border-white/20">
      <span className="text-[10px] font-black uppercase tracking-wider bg-black/30 px-2.5 py-0.5 rounded-full">
        Public Health Guide
      </span>
      <span className="text-[10px] font-bold text-amber-200">#khamoshijurmhai</span>
    </div>

    {/* Center Red Ribbon & Protection Vector */}
    <div className="z-10 my-auto py-3 flex flex-col items-center">
      {/* HIV Awareness Red Ribbon Vector */}
      <div className="w-16 h-20 mb-2 relative flex items-center justify-center drop-shadow-md">
        <svg viewBox="0 0 100 125" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M32 95 C 22 75, 20 50, 40 25 C 50 12, 60 12, 70 25 C 90 50, 88 75, 78 95 C 75 102, 65 96, 68 88 C 76 65, 70 42, 50 35 C 40 31, 35 40, 36 50 C 37 60, 48 78, 62 95"
            fill="#dc2626"
            stroke="#991b1b"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <path
            d="M68 95 C 78 75, 80 50, 60 25 C 50 12, 40 12, 30 25 C 10 50, 12 75, 22 95 C 25 102, 35 96, 32 88 C 24 65, 30 42, 50 35 C 60 31, 65 40, 64 50 C 63 60, 52 78, 38 95"
            fill="#ef4444"
            stroke="#b91c1c"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <h4 className="text-xl font-black tracking-tight uppercase text-white drop-shadow-xs">
        HIV and AIDS
      </h4>
      <p className="text-xs font-semibold text-amber-100 max-w-[220px] mt-1 leading-snug">
        How to keep you and your family safe
      </p>

      {/* Urdu Campaign Slogan */}
      <div className="mt-3 bg-black/30 backdrop-blur-xs px-3.5 py-1.5 rounded-xl border border-white/20">
        <span className="text-sm font-bold text-amber-200">خاموشی جرم ہے</span>
        <span className="text-[10px] text-white/90 block font-medium">Silence is a Crime</span>
      </div>
    </div>

    {/* Bottom Footer Tag */}
    <div className="z-10 w-full pt-2 border-t border-white/20 flex items-center justify-between text-[10px] text-white/80 font-medium">
      <span>Bulhan Bachao</span>
      <span>•</span>
      <span>ZAB-Rabta</span>
    </div>
  </div>
);

export interface PamphletSlide {
  id: number;
  title: string;
  subtitle: string;
  badge: string;
  category: 'cover' | 'transmission' | 'hospital' | 'symptoms' | 'men' | 'prep' | 'women' | 'faqs_aids' | 'faqs_spread' | 'campaign';
  themeColor: string;
  accentBg: string;
  content: {
    heading: string;
    subheading?: string;
    points?: { title?: string; desc: string; iconType?: 'check' | 'cross' | 'warn' | 'info' }[];
    callouts?: { title: string; text: string; alert?: boolean }[];
    footerTag?: string;
  };
}

export const PAMPHLET_SLIDES: PamphletSlide[] = [
  {
    id: 1,
    title: 'HIV and AIDS',
    subtitle: 'How to keep you and your family safe',
    badge: 'Cover • Public Guide',
    category: 'cover',
    themeColor: 'from-amber-600 to-rose-600',
    accentBg: 'bg-amber-50',
    content: {
      heading: 'HIV and AIDS: How to keep you and your family safe',
      subheading: 'Official Community Health Outreach Pamphlet • ZAB-Rabta Campaign',
      points: [
        {
          title: 'Community Initiative',
          desc: 'A public health education series in collaboration with Bulhan Bachao & ZAB-Rabta.',
          iconType: 'info',
        },
        {
          title: 'Core Mission',
          desc: 'Ending ignorance, stopping reusable syringe infections, and breaking social stigma: #khamoshijurmhai (Silence is a Crime).',
          iconType: 'warn',
        },
        {
          title: 'Guidance Inside',
          desc: '10 comprehensive slides covering transmission facts, hospital syringe safety, symptoms, men & women protection, PrEP, and FAQs.',
          iconType: 'check',
        },
      ],
      footerTag: '#khamoshijurmhai • Bulhan Bachao • ZAB-Rabta',
    },
  },
  {
    id: 2,
    title: 'How is HIV spread?',
    subtitle: 'HIV spread in 2 ways only',
    badge: 'Transmission Facts',
    category: 'transmission',
    themeColor: 'from-rose-600 to-amber-600',
    accentBg: 'bg-rose-50',
    content: {
      heading: 'HIV spread in 2 ways only:',
      subheading: 'Scientific medical consensus on realistic modes of HIV infection',
      points: [
        {
          title: '1. Through Unprotected Sex',
          desc: 'Sexual fluids during intercourse without protection (condoms) transfer the virus directly into bloodstream or mucous membranes.',
          iconType: 'cross',
        },
        {
          title: '2. Sharing Needles with Someone who is Infected',
          desc: 'Direct blood-to-blood contact through contaminated syringes, drug injection equipment, or non-sterile medical procedures.',
          iconType: 'warn',
        },
      ],
      callouts: [
        {
          title: 'Crucial Understanding',
          text: 'HIV is NOT transmitted through saliva, sweat, tears, casual physical touch, sharing utensils, or toilet seats.',
          alert: false,
        },
      ],
      footerTag: 'Community Health Awareness • #khamoshijurmhai',
    },
  },
  {
    id: 3,
    title: 'Hospital & Syringe Safety',
    subtitle: 'Preventing Reused Syringes in Healthcare',
    badge: 'Urgent Patient Alert',
    category: 'hospital',
    themeColor: 'from-red-600 to-orange-600',
    accentBg: 'bg-orange-50',
    content: {
      heading: 'Demand a New Syringe Opened In Front of You',
      subheading: 'Protect yourself and your family at clinics, dispensaries, and hospitals',
      points: [
        {
          title: 'Common Risk in Clinical Settings',
          desc: 'In many government hospitals and informal clinics, needles have historically been reused or improperly sterilized between patients.',
          iconType: 'warn',
        },
        {
          title: 'Always Verify the Sealed Packet',
          desc: 'Make sure that your doctor or paramedic opens a brand-new, sterile syringe packet right in front of you before any injection.',
          iconType: 'check',
        },
        {
          title: 'You Have the Right to Say STOP!',
          desc: 'If a doctor or practitioner wants to inject you with a syringe they did not remove from a sealed packet, STOP them immediately and insist they tear open a new packet in your sight.',
          iconType: 'cross',
        },
      ],
      callouts: [
        {
          title: 'Your Health, Your Right',
          text: 'Never hesitate or feel shy to challenge an unsealed needle. It takes 2 seconds to insist on a new packet and saves lives.',
          alert: true,
        },
      ],
      footerTag: 'Stop Needle Reuse • Safe Injections Save Lives',
    },
  },
  {
    id: 4,
    title: 'Symptoms & Testing',
    subtitle: 'HIV affects men, women and children equally',
    badge: 'Early Detection',
    category: 'symptoms',
    themeColor: 'from-amber-600 to-yellow-600',
    accentBg: 'bg-amber-50',
    content: {
      heading: 'Possible Signs of HIV ➔ GET TESTED!',
      subheading: 'HIV affects men, women, and children equally regardless of background',
      points: [
        {
          title: 'Light or High Fever',
          desc: 'Recurrent or persistent fever without an obvious immediate explanation.',
          iconType: 'warn',
        },
        {
          title: 'Body Aches & Muscle Pains',
          desc: 'General persistent joint or muscular pain and exhaustion.',
          iconType: 'warn',
        },
        {
          title: 'Lack of Appetite & Sudden Weight Loss',
          desc: 'Noticeable drop in eating drive or unexplained physical wasting.',
          iconType: 'warn',
        },
        {
          title: 'Nausea & Gastrointestinal Distress',
          desc: 'Persistent upset stomach, nausea, or prolonged loose motions.',
          iconType: 'warn',
        },
      ],
      callouts: [
        {
          title: 'Action Step',
          text: 'These can be early signs of HIV seroconversion. It is critically important that you get tested at your nearest government or private hospital. Testing is rapid and confidential.',
          alert: true,
        },
      ],
      footerTag: 'Get Tested Early • Treatment is 100% Free at ART Centers',
    },
  },
  {
    id: 5,
    title: 'HIV and Men: Harm Reduction',
    subtitle: 'Needle Safety & Sexual Health for Men',
    badge: 'Men Health & Prevention',
    category: 'men',
    themeColor: 'from-blue-600 to-indigo-700',
    accentBg: 'bg-indigo-50',
    content: {
      heading: 'HIV and Men: Harm Reduction & Safe Practices',
      subheading: 'Targeted prevention guidance for male health and high-risk habits',
      points: [
        {
          title: 'Needle Safety for Drug Users',
          desc: 'If you are a heroin or substance user, please make sure NEVER to share needles with anyone. Always use your own sterile equipment or purchase new syringes.',
          iconType: 'cross',
        },
        {
          title: 'Use a Condom Every Time',
          desc: 'Unprotected intercourse is a direct conduit for HIV. Using quality condoms consistently protects you and your sexual partners.',
          iconType: 'check',
        },
        {
          title: 'Have Sex with One Faithful Partner',
          desc: 'Limiting sexual partners and maintaining mutual fidelity drastically diminishes the likelihood of contracting STIs and HIV.',
          iconType: 'check',
        },
      ],
      callouts: [
        {
          title: 'Harm Reduction Saves Lives',
          text: 'Needle exchange and harm reduction centers exist across Karachi to provide clean syringes without moral judgment or police hassle.',
          alert: false,
        },
      ],
      footerTag: '#khamoshijurmhai • Men Health Outreach',
    },
  },
  {
    id: 6,
    title: 'HIV and Men: PrEP & Marriage',
    subtitle: 'Free Medication from NACP & Pre-Marital Tests',
    badge: 'PrEP & Family Planning',
    category: 'prep',
    themeColor: 'from-teal-600 to-emerald-700',
    accentBg: 'bg-emerald-50',
    content: {
      heading: 'Free NACP Medication & Family Planning',
      subheading: 'Modern biomedical prevention and safeguarding your future children',
      points: [
        {
          title: 'Register with NACP for Free Medication',
          desc: 'You can register with the National AIDS Control Programme (NACP) / Sindh AIDS Control to receive HIV medication completely free of cost.',
          iconType: 'check',
        },
        {
          title: 'PrEP (Pre-Exposure Prophylaxis)',
          desc: 'Even if you are NOT HIV positive, taking the daily preventive pill (PrEP) prevents HIV from establishing an infection in your body if exposed.',
          iconType: 'check',
        },
        {
          title: 'Pre-Marital & Pregnancy Screening',
          desc: 'If you intend on marrying your partner and wish to have children, both partners MUST get tested at an accredited lab.',
          iconType: 'warn',
        },
        {
          title: 'Protecting the Next Generation',
          desc: 'HIV can travel from mother to child in the womb or via breastfeeding if untreated, but proper medication completely blocks transmission!',
          iconType: 'info',
        },
      ],
      callouts: [
        {
          title: 'Government Supported',
          text: 'NACP and SACP provide lifelong free ART and PrEP counseling across designated hospital hubs in Sindh.',
          alert: false,
        },
      ],
      footerTag: 'PrEP • NACP Register • Safe Family Future',
    },
  },
  {
    id: 7,
    title: 'HIV and Women',
    subtitle: 'Protecting Mothers and Children in Healthcare',
    badge: 'Maternal & Child Health',
    category: 'women',
    themeColor: 'from-purple-600 to-pink-600',
    accentBg: 'bg-pink-50',
    content: {
      heading: 'Protecting Mothers and Children from Unsafe Injections',
      subheading: 'Maternal awareness regarding pediatric injections and vertical transmission',
      points: [
        {
          title: 'Check Your Child’s Injection Packet',
          desc: 'Ensure that when a doctor or vaccinator is about to inject a syringe into your child, that it is brand-new and still sealed in the sterile packet.',
          iconType: 'check',
        },
        {
          title: 'Ensure the Same for Yourself',
          desc: 'During prenatal checkups, delivery, dental procedures, and routine illness, demand a fresh syringe packet opened before your eyes.',
          iconType: 'check',
        },
        {
          title: 'Mother-to-Child Transmission (PPTCT)',
          desc: 'HIV can be passed from mother to child in the womb, during delivery, and via breastfeeding. With modern antenatal medication, this transmission rate drops to practically ZERO (<1%).',
          iconType: 'warn',
        },
      ],
      callouts: [
        {
          title: 'Free PPTCT Services',
          text: 'Civil Hospital and Lyari General provide specialized maternal care so HIV-positive mothers deliver 100% healthy, HIV-negative babies.',
          alert: false,
        },
      ],
      footerTag: 'Protect Our Mothers & Children • Zero Vertical Transmission',
    },
  },
  {
    id: 8,
    title: 'FAQs: HIV vs. AIDS',
    subtitle: 'Understanding the Medical Difference (Not the Same Thing!)',
    badge: 'Medical Facts',
    category: 'faqs_aids',
    themeColor: 'from-slate-700 to-teal-800',
    accentBg: 'bg-slate-50',
    content: {
      heading: 'HIV vs AIDS: Not the Same Thing!',
      subheading: 'Clear distinction between the initial virus and the late-stage syndrome',
      points: [
        {
          title: 'What is HIV?',
          desc: 'Human Immunodeficiency Virus. HIV can live quietly in your body for 10+ years before advancing to AIDS. Often shows initial mild flu-like aches for 1-4 weeks during early viral multiplication (seroconversion), then remains dormant for years.',
          iconType: 'info',
        },
        {
          title: 'What is AIDS?',
          desc: 'Acquired Immunodeficiency Syndrome. AIDS is the final stage where untreated HIV has destroyed CD4 white blood cells. Patients suffer severe opportunistic infections, rapid weight loss, and dark skin lesions (Kaposi sarcoma).',
          iconType: 'warn',
        },
        {
          title: 'Treatment Changes Everything',
          desc: 'Taking daily ART pills keeps the viral load undetectable. HIV NEVER turns into AIDS when patients are on continuous medicine!',
          iconType: 'check',
        },
      ],
      callouts: [
        {
          title: 'Life Expectancy',
          text: 'A person living with HIV on modern ART has the exact same life expectancy as someone without HIV.',
          alert: false,
        },
      ],
      footerTag: 'HIV is Manageable • AIDS is Preventable',
    },
  },
  {
    id: 9,
    title: 'FAQs: How HIV is NOT Spread',
    subtitle: 'Myths Debunked & Hospital Outbreak Accountability',
    badge: 'Myths vs Real Crime',
    category: 'faqs_spread',
    themeColor: 'from-emerald-700 to-teal-800',
    accentBg: 'bg-emerald-50',
    content: {
      heading: 'HIV is NOT Spread By Casual Contact',
      subheading: 'Clarifying everyday interactions versus systemic clinical malpractice',
      points: [
        {
          title: '100% Safe Everyday Actions',
          desc: 'Touching & hugging • Salon haircuts & combs • Mosquito & insect bites • Toilet seats • Sharing food, utensils & cups. HIV dies instantly outside living host cells.',
          iconType: 'check',
        },
        {
          title: 'How HIV is ACTUALLY Spread in Local Outbreaks',
          desc: 'In Pakistan, the majority of severe regional outbreaks (e.g. Ratodero, Larkana) stemmed from hospitals and unregulated clinics where quacks, nurses, and staff injected people with re-used needles.',
          iconType: 'cross',
        },
        {
          title: 'Reusing Needles is a Crime Equivalent to Murder',
          desc: 'Injecting patients with re-used medical equipment is criminal negligence and malpractice that must be prosecuted under Pakistani penal law.',
          iconType: 'warn',
        },
      ],
      callouts: [
        {
          title: 'Stand Up and Speak Out',
          text: 'Report any clinic or medical practitioner caught reusing needles to the Sindh Healthcare Commission (SHCC).',
          alert: true,
        },
      ],
      footerTag: '#khamoshijurmhai • Report Unsafe Practitioners',
    },
  },
  {
    id: 10,
    title: '#khamoshijurmhai Campaign',
    subtitle: 'Silence is a Crime • Bulhan Bachao & ZAB-Rabta',
    badge: 'Community Movement',
    category: 'campaign',
    themeColor: 'from-rose-700 to-amber-700',
    accentBg: 'bg-rose-50',
    content: {
      heading: '#khamoshijurmhai: Break the Silence',
      subheading: 'A community movement to eradicate stigma, ensure patient dignity, and enforce safe healthcare',
      points: [
        {
          title: 'خاموشی جرم ہے (Khamoshi Jurm Hai)',
          desc: 'Staying silent when needles are reused is a crime. Staying silent about testing is a risk. Staying silent when patients are stigmatized harms our entire community.',
          iconType: 'warn',
        },
        {
          title: 'Partnering Organizations',
          desc: 'Led by youth advocates, public health awareness initiatives, Bulhan Bachao, and ZAB-Rabta across Sindh.',
          iconType: 'info',
        },
        {
          title: 'Free Help and Support Always Available',
          desc: 'Call the ZAB-Rabta helpline at 03303262384 or message on WhatsApp at +92 330 3262384 for 100% anonymous counseling and hospital navigation.',
          iconType: 'check',
        },
      ],
      callouts: [
        {
          title: 'Join the Movement',
          text: 'Share these pamphlet cards on WhatsApp, Facebook, and Instagram to spread life-saving knowledge to every home in Karachi.',
          alert: false,
        },
      ],
      footerTag: '#khamoshijurmhai • Bulhan Bachao • ZAB-Rabta',
    },
  },
];

interface AwarenessPamphletGalleryProps {
  onNavigateToTesting?: () => void;
  onNavigateToContact?: () => void;
}

export const AwarenessPamphletGallery: React.FC<AwarenessPamphletGalleryProps> = ({
  onNavigateToTesting,
  onNavigateToContact,
}) => {
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'interactive' | 'grid'>('interactive');

  const currentSlide = PAMPHLET_SLIDES[activeSlideIndex];

  const handleNext = () => {
    setActiveSlideIndex((prev) => (prev + 1) % PAMPHLET_SLIDES.length);
  };

  const handlePrev = () => {
    setActiveSlideIndex((prev) => (prev - 1 + PAMPHLET_SLIDES.length) % PAMPHLET_SLIDES.length);
  };

  const copyPamphletSummary = () => {
    const summary = `*${currentSlide.title}* - ${currentSlide.subtitle}\n\n${currentSlide.content.heading}\n\n${currentSlide.content.points
      ?.map((p) => `• ${p.title ? p.title + ': ' : ''}${p.desc}`)
      .join('\n')}\n\n#khamoshijurmhai | ZAB-Rabta Helpline: 03303262384`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(summary);
      alert('Slide summary copied to clipboard! Share it on WhatsApp.');
    }
  };

  return (
    <div className="bg-amber-50/70 border-2 border-amber-300 rounded-3xl p-4 sm:p-6 shadow-sm space-y-4">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-amber-200">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="bg-rose-600 text-white font-black text-[10px] tracking-wider uppercase px-2.5 py-0.5 rounded-full">
              Official Campaign Pamphlet
            </span>
            <span className="text-amber-900 font-bold text-xs bg-amber-100 px-2 py-0.5 rounded-md">
              Community Health Series
            </span>
          </div>
          <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
            <span>HIV and AIDS: How to Keep You & Your Family Safe</span>
          </h3>
          <p className="text-xs text-slate-600">
            Swipe or click through all 10 illustrated awareness cards. Features #khamoshijurmhai, syringe safety, and prevention.
          </p>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center gap-1.5 self-start sm:self-center bg-amber-100/80 p-1 rounded-xl">
          <button
            onClick={() => setViewMode('interactive')}
            className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
              viewMode === 'interactive'
                ? 'bg-amber-700 text-white shadow-xs'
                : 'text-amber-900 hover:bg-amber-200/60'
            }`}
          >
            Slideshow ({activeSlideIndex + 1}/{PAMPHLET_SLIDES.length})
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
              viewMode === 'grid'
                ? 'bg-amber-700 text-white shadow-xs'
                : 'text-amber-900 hover:bg-amber-200/60'
            }`}
          >
            View All 10 Cards
          </button>
        </div>
      </div>

      {/* Main Interactive Slide View */}
      {viewMode === 'interactive' && (
        <div className="space-y-4">
          <div className="relative bg-white border-2 border-amber-300 rounded-3xl overflow-hidden shadow-md">
            {/* Top Banner on the Card */}
            <div className={`p-4 bg-gradient-to-r ${currentSlide.themeColor} text-white flex items-center justify-between`}>
              <div className="space-y-0.5">
                <span className="text-[10px] font-black uppercase tracking-wider bg-black/25 px-2 py-0.5 rounded-full inline-block">
                  {currentSlide.badge}
                </span>
                <h4 className="text-base sm:text-lg font-black leading-snug">{currentSlide.title}</h4>
                <p className="text-xs text-white/90 font-medium">{currentSlide.subtitle}</p>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setIsModalOpen(true)}
                  title="Expand card view"
                  className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all cursor-pointer"
                >
                  <Maximize2 className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>

            {/* Card Content Area */}
            <div className="p-5 sm:p-6 space-y-4">
              {/* If it's the cover, showcase the generated high-fidelity cover illustration */}
              {currentSlide.category === 'cover' && (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                  <div className="md:col-span-5 flex justify-center">
                    <PamphletCoverGraphic compact={true} />
                  </div>
                  <div className="md:col-span-7 space-y-3">
                    <h5 className="text-base sm:text-lg font-black text-slate-900 leading-tight">
                      {currentSlide.content.heading}
                    </h5>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium">
                      {currentSlide.content.subheading}
                    </p>
                    <div className="space-y-2.5 pt-1">
                      {currentSlide.content.points?.map((pt, i) => (
                        <div key={i} className="flex items-start gap-2.5 bg-amber-50/80 p-2.5 rounded-xl border border-amber-200/80">
                          <CheckCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                          <div>
                            <strong className="text-xs font-black text-slate-900 block">{pt.title}</strong>
                            <p className="text-xs text-slate-700 leading-relaxed">{pt.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Other Slides Visual Layout */}
              {currentSlide.category !== 'cover' && (
                <div className="space-y-4">
                  <div className="border-b border-slate-100 pb-2">
                    <h5 className="text-base sm:text-lg font-black text-slate-900">
                      {currentSlide.content.heading}
                    </h5>
                    {currentSlide.content.subheading && (
                      <p className="text-xs text-slate-500 font-medium mt-0.5">
                        {currentSlide.content.subheading}
                      </p>
                    )}
                  </div>

                  {/* Bullet Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {currentSlide.content.points?.map((pt, i) => {
                      const isCross = pt.iconType === 'cross';
                      const isWarn = pt.iconType === 'warn';
                      return (
                        <div
                          key={i}
                          className={`p-3.5 rounded-2xl border transition-all ${
                            isCross
                              ? 'bg-rose-50/80 border-rose-200'
                              : isWarn
                              ? 'bg-amber-50/80 border-amber-200'
                              : 'bg-teal-50/80 border-teal-200'
                          }`}
                        >
                          <div className="flex items-start gap-2.5">
                            {isCross && <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />}
                            {isWarn && <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />}
                            {!isCross && !isWarn && <CheckCircle className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />}
                            <div>
                              {pt.title && (
                                <strong
                                  className={`text-xs font-black block mb-0.5 ${
                                    isCross
                                      ? 'text-rose-900'
                                      : isWarn
                                      ? 'text-amber-950'
                                      : 'text-teal-950'
                                  }`}
                                >
                                  {pt.title}
                                </strong>
                              )}
                              <p className="text-xs text-slate-700 leading-relaxed">{pt.desc}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Callouts */}
                  {currentSlide.content.callouts?.map((callout, i) => (
                    <div
                      key={i}
                      className={`p-3 rounded-2xl border text-xs flex items-start gap-2.5 ${
                        callout.alert
                          ? 'bg-rose-100/80 border-rose-300 text-rose-950'
                          : 'bg-amber-100/70 border-amber-300 text-amber-950'
                      }`}
                    >
                      <AlertTriangle className={`w-4 h-4 shrink-0 mt-0.5 ${callout.alert ? 'text-rose-700' : 'text-amber-700'}`} />
                      <div>
                        <strong className="font-black block">{callout.title}</strong>
                        <p className="leading-relaxed font-medium">{callout.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Bottom Logos & Tag Bar replicating the official pamphlet style */}
              <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 font-black text-rose-800 bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-200">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-600 inline-block animate-pulse"></span>
                    <span>#khamoshijurmhai</span>
                  </div>
                  <span className="text-[11px] font-bold text-slate-500">
                    Bulhan Bachao • ZAB-Rabta
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={copyPamphletSummary}
                    className="flex items-center gap-1 text-[11px] font-bold text-amber-900 bg-amber-100 hover:bg-amber-200 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Copy Card Text</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Slider Navigation Bar */}
            <div className="bg-slate-50 px-4 py-3 border-t border-slate-200 flex items-center justify-between">
              <button
                onClick={handlePrev}
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white border border-slate-300 hover:bg-slate-100 text-xs font-black text-slate-800 shadow-2xs transition-all cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              <div className="flex items-center gap-1 overflow-x-auto max-w-[200px] sm:max-w-none">
                {PAMPHLET_SLIDES.map((slide, idx) => (
                  <button
                    key={slide.id}
                    onClick={() => setActiveSlideIndex(idx)}
                    title={`Go to slide ${slide.id}: ${slide.title}`}
                    className={`w-6 h-6 rounded-full text-[10px] font-black transition-all flex items-center justify-center cursor-pointer ${
                      idx === activeSlideIndex
                        ? 'bg-rose-600 text-white scale-110 shadow-xs'
                        : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                    }`}
                  >
                    {slide.id}
                  </button>
                ))}
              </div>

              <button
                onClick={handleNext}
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white border border-slate-300 hover:bg-slate-100 text-xs font-black text-slate-800 shadow-2xs transition-all cursor-pointer"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Grid Mode: Displays all 10 cards */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PAMPHLET_SLIDES.map((slide, idx) => (
            <div
              key={slide.id}
              onClick={() => {
                setActiveSlideIndex(idx);
                setViewMode('interactive');
              }}
              className="bg-white border-2 border-amber-200 hover:border-amber-400 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className={`p-3 bg-gradient-to-r ${slide.themeColor} text-white flex items-center justify-between`}>
                  <div>
                    <span className="text-[9px] font-black uppercase tracking-wider bg-black/20 px-2 py-0.5 rounded-md inline-block">
                      Card {slide.id} of 10
                    </span>
                    <h5 className="text-sm font-black mt-0.5">{slide.title}</h5>
                  </div>
                  <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-bold">
                    {slide.badge.split('•')[0]}
                  </span>
                </div>

                <div className="p-3.5 space-y-2">
                  <p className="text-xs font-extrabold text-slate-800">{slide.content.heading}</p>
                  <ul className="space-y-1">
                    {slide.content.points?.slice(0, 2).map((p, i) => (
                      <li key={i} className="text-[11px] text-slate-600 line-clamp-2 flex items-start gap-1.5">
                        <span className="text-amber-600 font-bold">•</span>
                        <span>{p.desc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="px-3.5 py-2 bg-amber-50/60 border-t border-amber-100 flex items-center justify-between text-[11px]">
                <span className="text-rose-700 font-bold">#khamoshijurmhai</span>
                <span className="text-slate-500 font-semibold hover:text-amber-800 flex items-center gap-1">
                  Click to Expand &rarr;
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Quick Action Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 pt-2 border-t border-amber-200/80">
        <div className="flex items-center gap-2">
          <span className="text-xs font-black text-amber-950">Got Questions on these guidelines?</span>
        </div>
        <div className="flex items-center gap-2">
          {onNavigateToTesting && (
            <button
              onClick={onNavigateToTesting}
              className="text-xs font-black bg-teal-700 hover:bg-teal-800 text-white px-3.5 py-2 rounded-xl transition-all shadow-xs cursor-pointer"
            >
              Find Testing Centers
            </button>
          )}
          {onNavigateToContact && (
            <button
              onClick={onNavigateToContact}
              className="text-xs font-black bg-rose-700 hover:bg-rose-800 text-white px-3.5 py-2 rounded-xl transition-all shadow-xs cursor-pointer"
            >
              ZAB-Rabta Helpline
            </button>
          )}
        </div>
      </div>

      {/* Modal Popup for Fullscreen Reading */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border-4 border-amber-300">
            <div className={`p-4 bg-gradient-to-r ${currentSlide.themeColor} text-white flex items-center justify-between sticky top-0 z-10`}>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider bg-black/30 px-2 py-0.5 rounded-full inline-block">
                  Card {currentSlide.id} of 10 • {currentSlide.badge}
                </span>
                <h4 className="text-lg font-black mt-0.5">{currentSlide.title}</h4>
                <p className="text-xs text-white/90">{currentSlide.subtitle}</p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all cursor-pointer"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {currentSlide.category === 'cover' && (
                <div className="flex justify-center mb-4">
                  <PamphletCoverGraphic compact={false} />
                </div>
              )}

              <h4 className="text-lg font-black text-slate-900">{currentSlide.content.heading}</h4>
              {currentSlide.content.subheading && (
                <p className="text-xs font-bold text-amber-800">{currentSlide.content.subheading}</p>
              )}

              <div className="space-y-3 pt-2">
                {currentSlide.content.points?.map((pt, i) => (
                  <div key={i} className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                    {pt.title && <strong className="text-xs font-black text-slate-900 block">{pt.title}</strong>}
                    <p className="text-xs text-slate-700 leading-relaxed">{pt.desc}</p>
                  </div>
                ))}
              </div>

              {currentSlide.content.callouts?.map((c, i) => (
                <div
                  key={i}
                  className={`p-3.5 rounded-2xl border text-xs ${
                    c.alert ? 'bg-rose-50 border-rose-300 text-rose-950 font-bold' : 'bg-amber-50 border-amber-300 text-amber-950 font-bold'
                  }`}
                >
                  <p className="uppercase text-[10px] tracking-wider mb-0.5">{c.title}</p>
                  <p>{c.text}</p>
                </div>
              ))}

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-black text-rose-700">#khamoshijurmhai</span>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 cursor-pointer"
                >
                  Close Card
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
