import React from 'react';
import { ExternalLink, ShieldCheck, BookOpen, AlertTriangle } from 'lucide-react';
import { OFFICIAL_SOURCES } from '../data/marketData';

export const Sources: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-emerald-700" />
              <h2 className="text-xl font-bold text-slate-900">Official Indian Trade Regulatory Sources</h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Authoritative portals, statutory foreign trade policies, and export promotion agencies for Indian businesses.
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-xs bg-slate-100 border border-slate-200 text-slate-700 px-3 py-1.5 rounded-lg self-start sm:self-auto">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Verified Official Portals</span>
          </div>
        </div>

        {/* Mandatory Reference Disclosure */}
        <div className="mt-5 p-4 bg-amber-50/90 border border-amber-300 rounded-xl text-xs sm:text-sm text-amber-900 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <div className="font-bold text-amber-950">Statutory Transparency Disclaimer:</div>
            <p className="leading-relaxed">
              Links are provided as official reference sources. Built-in comparison figures in this educational prototype are demo data unless specifically identified as sourced.
            </p>
            <p className="text-xs text-amber-800">
              Demo datasets embedded within this student prototype are not claimed to originate directly from these statutory websites. Always consult the official websites listed below for live tariffs, notifications, and customs circulars.
            </p>
          </div>
        </div>
      </div>

      {/* Sources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {OFFICIAL_SOURCES.map((source) => (
          <div
            key={source.id}
            className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between hover:border-emerald-500/60 hover:shadow-md transition-all group"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-2">
                <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                  {source.name}
                </h3>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200 shrink-0">
                  Gov / Apex
                </span>
              </div>
              <div className="text-xs font-semibold text-emerald-700 mb-3">
                {source.agency}
              </div>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                {source.description}
              </p>
              <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 text-[11px] text-slate-600 mb-4">
                <span className="font-bold text-slate-700 block mb-0.5">Core Statutory Scope:</span>
                <span>{source.focusArea}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400 truncate max-w-[200px]">
                {source.url}
              </span>
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-slate-900 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold transition-colors"
              >
                <span>Visit Official Site</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
