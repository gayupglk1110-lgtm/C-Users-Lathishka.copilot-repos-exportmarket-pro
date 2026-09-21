import React from 'react';
import { AlertCircle, Globe2, ShieldCheck } from 'lucide-react';
import { TabType } from '../types';

interface FooterProps {
  onSelectTab: (tab: TabType) => void;
  onOpenScopeModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab, onOpenScopeModal }) => {
  return (
    <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800 mt-16">
      {/* Mandatory Statutory Disclaimer Section */}
      <div className="bg-slate-950/80 border-b border-slate-800 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-start gap-3 text-slate-300">
          <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs leading-relaxed">
            <div className="font-bold text-amber-300 uppercase tracking-wider text-[11px]">
              Mandatory Statutory Disclaimer
            </div>
            <p id="statutory-disclaimer-text">
              Educational prototype only. Some information is sample/demo data. This application does not provide legal, tax, customs, financial or investment advice, does not predict future markets or exchange rates, and does not guarantee export success.
            </p>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Credentials */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Col 1: Brand */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2 text-white">
              <div className="w-8 h-8 rounded-lg bg-emerald-700 flex items-center justify-center text-white">
                <Globe2 className="w-4 h-4" />
              </div>
              <span className="font-bold text-base tracking-tight">EXPORTMARKET PRO</span>
              <span className="text-[10px] bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30">
                INDIA TRADE HUB
              </span>
            </div>
            <p className="text-slate-400 text-xs max-w-md leading-relaxed">
              Global Market Intelligence &amp; Export Readiness for Indian Exporters. Developed as an educational interactive dashboard for international business research.
            </p>
            <div className="pt-2 text-[11px] text-slate-400">
              Project: <strong className="text-slate-200">KCLAS Liberal Edge Week 2026 • Team 2 – BBA International Business</strong>
            </div>
          </div>

          {/* Col 2: Navigation Modules */}
          <div>
            <div className="font-bold text-slate-200 uppercase tracking-wider text-[11px] mb-3">
              Application Modules
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onSelectTab('market-picker')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Market Picker
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('rupee-watcher')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Rupee Watcher
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('revenue-simulator')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Revenue Simulator
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('trade-fair-coach')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Trade Fair Coach
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('pitch-builder')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Pitch Builder
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('export-checklist')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Export Checklist
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Statutory & Scope */}
          <div>
            <div className="font-bold text-slate-200 uppercase tracking-wider text-[11px] mb-3">
              Reference &amp; Scope
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onSelectTab('sources')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Official Sources (DGFT, RBI, FIEO)
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenScopeModal}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Agent Scope &amp; Guardrails</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400">
          <div>
            © 2026 EXPORTMARKET PRO • KCLAS Liberal Edge Week 2026 Team 2
          </div>
          <div className="flex items-center gap-4">
            <span>Deterministic Client-Side Architecture</span>
            <span>•</span>
            <span>No Auth Required</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
