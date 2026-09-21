import React from 'react';
import { ArrowRight, Globe, IndianRupee, Building2, Sparkles, CheckSquare, Calculator, FileSpreadsheet } from 'lucide-react';
import { TabType } from '../types';

interface HeroQuickActionsProps {
  onSelectTab: (tab: TabType) => void;
}

export const HeroQuickActions: React.FC<HeroQuickActionsProps> = ({ onSelectTab }) => {
  return (
    <div className="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white py-8 px-4 sm:px-6 lg:px-8 border-b border-slate-700/60 mb-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-semibold px-3 py-1 rounded-full mb-3 shadow-inner">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Empowering Indian MSME &amp; Corporate Exporters
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Global Market Intelligence &amp; Readiness
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-2 max-w-2xl mx-auto">
            A deterministic export-readiness suite built for Indian exporters to evaluate foreign markets, model currency scenarios, and execute international trade fairs.
          </p>
        </div>

        {/* Three Large Quick-Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          {/* Card 1: Compare Markets */}
          <div
            id="hero-action-compare-markets"
            onClick={() => onSelectTab('market-picker')}
            className="group cursor-pointer bg-slate-800/90 hover:bg-slate-750 border border-slate-700 hover:border-emerald-500/60 rounded-xl p-6 transition-all duration-200 hover:shadow-xl hover:shadow-emerald-950/30 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mb-4 text-2xl group-hover:scale-105 transition-transform">
                🌍
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 flex items-center gap-1.5 transition-colors">
                Compare Markets
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm mt-1.5 leading-relaxed">
                Side-by-side factual comparison of tariffs, demand indicators, transit logistics, and trade fairs across 7 global destinations.
              </p>
            </div>
            <div className="mt-5 pt-4 border-t border-slate-700/60 flex items-center justify-between text-xs font-semibold text-emerald-400 group-hover:text-emerald-300">
              <span>Open Market Picker</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2: Simulate Exchange Rates */}
          <div
            id="hero-action-simulate-rates"
            onClick={() => onSelectTab('rupee-watcher')}
            className="group cursor-pointer bg-slate-800/90 hover:bg-slate-750 border border-slate-700 hover:border-emerald-500/60 rounded-xl p-6 transition-all duration-200 hover:shadow-xl hover:shadow-emerald-950/30 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mb-4 text-2xl group-hover:scale-105 transition-transform">
                ₹
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 flex items-center gap-1.5 transition-colors">
                Simulate Exchange Rates
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm mt-1.5 leading-relaxed">
                Model real-time INR booking vs settlement outcomes, evaluate rupee appreciation or depreciation, and forecast bank conversion spreads.
              </p>
            </div>
            <div className="mt-5 pt-4 border-t border-slate-700/60 flex items-center justify-between text-xs font-semibold text-emerald-400 group-hover:text-emerald-300">
              <span>Open Rupee Watcher</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 3: Prepare for a Trade Fair */}
          <div
            id="hero-action-trade-fair-prep"
            onClick={() => onSelectTab('trade-fair-coach')}
            className="group cursor-pointer bg-slate-800/90 hover:bg-slate-750 border border-slate-700 hover:border-emerald-500/60 rounded-xl p-6 transition-all duration-200 hover:shadow-xl hover:shadow-emerald-950/30 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mb-4 text-2xl group-hover:scale-105 transition-transform">
                🏢
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 flex items-center gap-1.5 transition-colors">
                Prepare for a Trade Fair
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm mt-1.5 leading-relaxed">
                Generate a 3-phase international expo readiness checklist (Before, During, and After) customized to your company and budget.
              </p>
            </div>
            <div className="mt-5 pt-4 border-t border-slate-700/60 flex items-center justify-between text-xs font-semibold text-emerald-400 group-hover:text-emerald-300">
              <span>Open Trade Fair Coach</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>

        {/* Quick Jump Directory Bar */}
        <div className="bg-slate-950/60 border border-slate-700/60 rounded-lg p-3 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-300">
          <span className="font-semibold text-slate-400 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
            Suite Modules:
          </span>
          <div className="flex flex-wrap items-center gap-2 sm:gap-4">
            <button
              onClick={() => onSelectTab('market-picker')}
              className="hover:text-emerald-300 transition-colors flex items-center gap-1"
            >
              <Globe className="w-3 h-3 text-emerald-400" /> Market Picker
            </button>
            <span className="text-slate-700">•</span>
            <button
              onClick={() => onSelectTab('rupee-watcher')}
              className="hover:text-emerald-300 transition-colors flex items-center gap-1"
            >
              <IndianRupee className="w-3 h-3 text-emerald-400" /> Rupee Watcher
            </button>
            <span className="text-slate-700">•</span>
            <button
              onClick={() => onSelectTab('revenue-simulator')}
              className="hover:text-emerald-300 transition-colors flex items-center gap-1"
            >
              <Calculator className="w-3 h-3 text-emerald-400" /> Revenue Simulator
            </button>
            <span className="text-slate-700">•</span>
            <button
              onClick={() => onSelectTab('trade-fair-coach')}
              className="hover:text-emerald-300 transition-colors flex items-center gap-1"
            >
              <Building2 className="w-3 h-3 text-emerald-400" /> Trade Fair Coach
            </button>
            <span className="text-slate-700">•</span>
            <button
              onClick={() => onSelectTab('pitch-builder')}
              className="hover:text-emerald-300 transition-colors flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3 text-emerald-400" /> Pitch Builder
            </button>
            <span className="text-slate-700">•</span>
            <button
              onClick={() => onSelectTab('export-checklist')}
              className="hover:text-emerald-300 transition-colors flex items-center gap-1"
            >
              <CheckSquare className="w-3 h-3 text-emerald-400" /> Export Checklist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
