import React from 'react';
import { Globe2, ShieldAlert, Award, Compass } from 'lucide-react';
import { TabType } from '../types';

interface HeaderProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  onOpenScopeModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenScopeModal }) => {
  return (
    <header className="bg-slate-900 text-white border-b border-slate-800">
      {/* Top Demo Data Safety Banner */}
      <div className="bg-amber-500/15 border-b border-amber-500/30 text-amber-200 px-4 py-2 text-xs md:text-sm font-medium flex items-center justify-between">
        <div className="flex items-center gap-2 max-w-5xl mx-auto w-full">
          <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
          <span>
            <strong>NOTICE:</strong> Some figures shown in this prototype are <strong>SAMPLE / DEMO DATA</strong> for educational purposes.
          </span>
        </div>
        {onOpenScopeModal && (
          <button
            onClick={onOpenScopeModal}
            className="hidden sm:flex items-center gap-1 text-xs bg-slate-800 hover:bg-slate-700 text-amber-300 px-2.5 py-1 rounded border border-amber-500/30 transition-colors"
          >
            <Compass className="w-3.5 h-3.5" />
            Agent Scope & Guide
          </button>
        )}
      </div>

      {/* Main Header Brand */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white shadow-lg shadow-emerald-900/30 shrink-0 ring-2 ring-emerald-400/20">
              <Globe2 className="w-7 h-7" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-sans">
                  EXPORTMARKET <span className="text-emerald-400">PRO</span>
                </h1>
                <span className="text-xs font-semibold uppercase tracking-wider bg-emerald-950 text-emerald-300 px-2.5 py-0.5 rounded-full border border-emerald-500/40">
                  INDIA TRADE HUB
                </span>
              </div>
              <p className="text-slate-300 text-xs sm:text-sm mt-0.5 font-medium">
                Global Market Intelligence &amp; Export Readiness for Indian Exporters
              </p>
            </div>
          </div>

          {/* Academic Badge */}
          <div className="flex items-center gap-2.5 bg-slate-800/80 border border-slate-700/80 rounded-lg px-3.5 py-2 text-xs text-slate-300 self-start md:self-auto shadow-sm">
            <Award className="w-4 h-4 text-emerald-400 shrink-0" />
            <div className="leading-tight">
              <div className="font-semibold text-white">KCLAS Liberal Edge Week 2026</div>
              <div className="text-slate-400 text-[11px]">Team 2 • BBA International Business</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
