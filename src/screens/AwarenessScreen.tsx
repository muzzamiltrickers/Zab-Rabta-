import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DisclaimerBanner } from '../components/DisclaimerBanner';
import { AwarenessPamphletGallery } from '../components/AwarenessPamphletGallery';
import {
  BookOpen,
  HelpCircle,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Share2,
  TestTube2,
  ArrowRight,
  Info,
  Heart,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

export const AwarenessScreen: React.FC = () => {
  const { articles, navigateTo, showToast } = useApp();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [expandedArticleId, setExpandedArticleId] = useState<string | null>(articles[0]?.articleId || null);

  const categories = [
    { id: 'all', label: 'All Topics' },
    { id: 'general', label: 'HIV vs AIDS' },
    { id: 'transmission', label: 'Transmission' },
    { id: 'prevention', label: 'Prevention & U=U' },
    { id: 'myths', label: 'Myths & Facts' },
    { id: 'stigma', label: 'Stigma & Rights' },
  ];

  const filteredArticles =
    activeCategory === 'all'
      ? articles
      : articles.filter((a) => a.category === activeCategory);

  const toggleExpand = (id: string) => {
    setExpandedArticleId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="p-4 space-y-4 max-w-2xl mx-auto pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-teal-700 via-teal-800 to-cyan-900 text-white rounded-3xl p-5 shadow-md">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
            <BookOpen className="w-4 h-4 text-white" />
          </div>
          <span className="text-[11px] font-bold text-teal-200 uppercase tracking-wider">
            Verified Healthcare Education
          </span>
        </div>
        <h2 className="text-xl font-black tracking-tight">HIV Educational Guide</h2>
        <p className="text-xs text-teal-100/90 mt-1 leading-relaxed">
          Simple, medically verified information on HIV transmission, prevention, testing, and
          eliminating discrimination across Karachi communities.
        </p>
      </div>

      {/* Featured Official Awareness Pamphlet Series */}
      <AwarenessPamphletGallery
        onNavigateToTesting={() => navigateTo('testing')}
        onNavigateToContact={() => navigateTo('contact')}
      />

      {/* Category Filter Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
              activeCategory === cat.id
                ? 'bg-teal-700 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Quick Comparison Card: HIV vs AIDS */}
      <div className="bg-white border border-teal-200 rounded-3xl p-4.5 shadow-xs">
        <h3 className="text-xs font-extrabold uppercase tracking-wider text-teal-800 mb-2.5 flex items-center gap-1.5">
          <Info className="w-4 h-4 text-teal-600" />
          Core Difference at a Glance: HIV vs AIDS
        </h3>
        <div className="grid grid-cols-2 gap-2.5 text-xs">
          <div className="bg-teal-50/80 border border-teal-100 rounded-2xl p-3">
            <span className="font-extrabold text-teal-900 block text-sm">HIV</span>
            <span className="text-[10px] text-teal-700 font-semibold uppercase block mb-1">
              The Virus
            </span>
            <p className="text-[11px] text-teal-950 leading-relaxed">
              Human Immunodeficiency Virus. An infectious agent that attacks CD4 immune cells. With
              daily ART, it is controlled and does not cause AIDS.
            </p>
          </div>
          <div className="bg-cyan-50/80 border border-cyan-100 rounded-2xl p-3">
            <span className="font-extrabold text-cyan-900 block text-sm">AIDS</span>
            <span className="text-[10px] text-cyan-700 font-semibold uppercase block mb-1">
              Late Stage Syndrome
            </span>
            <p className="text-[11px] text-cyan-950 leading-relaxed">
              Acquired Immunodeficiency Syndrome. The advanced stage of untreated HIV. Early testing
              and ART ensure most people never develop AIDS.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Myth Buster Callout */}
      <div className="bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10 border border-amber-300 rounded-3xl p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-black uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-amber-600" />
            Quick Myth Buster
          </span>
          <span className="text-[10px] font-bold bg-amber-200 text-amber-900 px-2 py-0.5 rounded-full">
            Medically Proven
          </span>
        </div>
        <div className="space-y-2 text-xs">
          <div className="bg-white/80 p-2.5 rounded-xl border border-amber-200/80 flex items-start gap-2">
            <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
            <p className="text-slate-800">
              <strong className="text-rose-900">Myth:</strong> "You can get HIV by sharing food,
              cups, or hugging in Karachi."
            </p>
          </div>
          <div className="bg-white/80 p-2.5 rounded-xl border border-amber-200/80 flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <p className="text-slate-800">
              <strong className="text-emerald-900">Fact:</strong> Medically impossible. HIV cannot
              survive outside the human body or in saliva. Everyday contact is 100% safe.
            </p>
          </div>
        </div>
      </div>

      {/* Articles Feed */}
      <div className="space-y-3">
        {filteredArticles.map((article) => {
          const isExpanded = expandedArticleId === article.articleId;

          return (
            <div
              key={article.articleId}
              className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs transition-all hover:border-teal-200"
            >
              <button
                onClick={() => toggleExpand(article.articleId)}
                className="w-full p-4.5 text-left flex items-start justify-between gap-3 focus:outline-hidden"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-teal-800 px-2 py-0.5 rounded-full">
                      {article.category}
                    </span>
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-base leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {article.summary}
                  </p>
                </div>
                <div className="text-slate-400 p-1">
                  {isExpanded ? <ChevronUp className="w-5 h-5 text-teal-600" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </button>

              {isExpanded && (
                <div className="px-4.5 pb-5 pt-1 border-t border-slate-100 space-y-3.5 animate-in fade-in duration-200">
                  {article.imageUrl && (
                    <img
                      src={article.imageUrl}
                      alt={article.title}
                      className="w-full h-44 object-cover rounded-2xl"
                    />
                  )}

                  <div className="text-xs text-slate-700 leading-relaxed whitespace-pre-line space-y-2">
                    {article.content}
                  </div>

                  {article.keyPoints && article.keyPoints.length > 0 && (
                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 space-y-2">
                      <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-700">
                        Key Takeaways:
                      </h4>
                      <ul className="space-y-1.5">
                        {article.keyPoints.map((pt, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                            <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-2">
                    <button
                      onClick={() => {
                        if (navigator.share) {
                          navigator.share({
                            title: article.title,
                            text: article.summary,
                            url: window.location.href,
                          });
                        } else {
                          showToast('Article link copied to clipboard.');
                        }
                      }}
                      className="text-xs font-semibold text-slate-600 hover:text-teal-700 flex items-center gap-1.5"
                    >
                      <Share2 className="w-3.5 h-3.5" /> Share Topic
                    </button>

                    <button
                      onClick={() => navigateTo('testing')}
                      className="text-xs font-bold text-teal-700 hover:text-teal-800 flex items-center gap-1"
                    >
                      Testing Details <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Action Banner to Testing */}
      <div className="bg-gradient-to-r from-teal-800 to-cyan-900 text-white rounded-3xl p-5 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="font-extrabold text-base">Ready to Know Your Status?</h4>
          <p className="text-xs text-teal-100/90">
            Testing in Karachi is voluntary, free, and protected by strict privacy rules.
          </p>
        </div>
        <button
          onClick={() => navigateTo('testing')}
          className="w-full sm:w-auto py-3 px-5 bg-white text-teal-900 font-extrabold text-xs rounded-xl shadow-md hover:bg-teal-50 transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer"
        >
          <TestTube2 className="w-4 h-4 text-teal-700" />
          <span>HIV Testing Guide</span>
        </button>
      </div>

      <DisclaimerBanner />
    </div>
  );
};
