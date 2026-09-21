import React, { useState } from 'react';
import { 
  Compass, 
  HelpCircle, 
  ShieldCheck, 
  MessageSquare, 
  CheckCircle2, 
  Send, 
  Sparkles,
  X
} from 'lucide-react';

interface AgentScopeAndAboutProps {
  isOpen?: boolean;
  onClose?: () => void;
  isInline?: boolean;
}

export const AgentScopeAndAbout: React.FC<AgentScopeAndAboutProps> = ({ isOpen, onClose, isInline = false }) => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState<string | null>(null);

  const handleAskQuery = (testText?: string) => {
    const textToEvaluate = (testText || query).trim().toLowerCase();
    if (!textToEvaluate) return;

    if (testText) {
      setQuery(testText);
    }

    // Exact prompt guardrails from specifications:
    // 1. "Which country will definitely be the best?"
    if (
      textToEvaluate.includes('definitely be the best') ||
      textToEvaluate.includes('which country will definitely') ||
      textToEvaluate.includes('which market will definitely') ||
      textToEvaluate.includes('guarantee which country') ||
      textToEvaluate.includes('which is definitely the best')
    ) {
      setResponse('I cannot guarantee or predict which market will be best. I can compare the available information for the selected markets.');
      return;
    }

    // 2. "What will USD/INR be next month?" (future exchange rate predictions)
    if (
      textToEvaluate.includes('usd/inr') ||
      textToEvaluate.includes('usd inr') ||
      textToEvaluate.includes('exchange rate') ||
      textToEvaluate.includes('rupee rate') ||
      textToEvaluate.includes('predict') ||
      textToEvaluate.includes('next month') ||
      textToEvaluate.includes('forecast')
    ) {
      setResponse('I cannot predict future exchange rates. I can demonstrate hypothetical exchange-rate scenarios instead.');
      return;
    }

    // 3. Allowed in-scope domains:
    const inScopeKeywords = [
      'export', 'market', 'trade fair', 'trade', 'rupee', 'currency', 'pitch', 
      'checklist', 'tariffs', 'hs code', 'buyer', 'revenue', 'fob', 'cif'
    ];

    const isScopeMatch = inScopeKeywords.some((kw) => textToEvaluate.includes(kw));

    if (isScopeMatch) {
      setResponse('ExportMarket Pro provides structured tools for your query. You can explore our Market Picker for country comparisons, Rupee Watcher for exchange volatility, Revenue Simulator for net calculations, or Trade Fair Coach for event planning.');
    } else {
      // Out of scope requests (Test 12):
      setResponse('ExportMarket Pro is designed for Indian export-market exploration, trade-fair preparation, exchange-rate education and export readiness.');
    }
  };

  const content = (
    <div className="space-y-6 text-slate-800">
      {/* About Section */}
      <div className="bg-slate-900 text-white p-6 rounded-xl shadow-xs">
        <div className="flex items-center gap-2 mb-3">
          <Compass className="w-6 h-6 text-emerald-400" />
          <h3 className="text-xl font-bold">About ExportMarket Pro</h3>
        </div>
        <p className="text-slate-200 text-sm leading-relaxed mb-4">
          ExportMarket Pro is an educational export-planning agent designed for Indian International Business students and exporters. It combines structured trade information, user inputs and deterministic calculators to demonstrate market comparison, export preparation and exchange-rate scenarios.
        </p>

        {/* 4 Steps */}
        <div className="pt-4 border-t border-slate-700 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700">
            <span className="text-emerald-400 font-bold font-mono text-xs block mb-1">Step 1</span>
            <span className="text-xs text-slate-200">User enters operational parameters &amp; selects target markets.</span>
          </div>
          <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700">
            <span className="text-emerald-400 font-bold font-mono text-xs block mb-1">Step 2</span>
            <span className="text-xs text-slate-200">The application uses its built-in knowledge/data base.</span>
          </div>
          <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700">
            <span className="text-emerald-400 font-bold font-mono text-xs block mb-1">Step 3</span>
            <span className="text-xs text-slate-200">Calculators perform deterministic calculations in real-time.</span>
          </div>
          <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700">
            <span className="text-emerald-400 font-bold font-mono text-xs block mb-1">Step 4</span>
            <span className="text-xs text-slate-200">Results are displayed with appropriate limitations &amp; disclaimers.</span>
          </div>
        </div>
      </div>

      {/* Scope & Guardrail Policy */}
      <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-xs">
        <div className="flex items-center gap-2 mb-3">
          <ShieldCheck className="w-5 h-5 text-emerald-700" />
          <h4 className="text-base font-bold text-slate-900">Agent Scope &amp; Guardrails</h4>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 mb-3 leading-relaxed">
          The application is explicitly designed for:
        </p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold text-slate-700 mb-5">
          <li className="flex items-center gap-2 bg-slate-50 p-2 rounded border border-slate-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Export-market exploration</span>
          </li>
          <li className="flex items-center gap-2 bg-slate-50 p-2 rounded border border-slate-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Trade-fair preparation</span>
          </li>
          <li className="flex items-center gap-2 bg-slate-50 p-2 rounded border border-slate-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Export readiness checklists</span>
          </li>
          <li className="flex items-center gap-2 bg-slate-50 p-2 rounded border border-slate-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Exchange-rate education</span>
          </li>
          <li className="flex items-center gap-2 bg-slate-50 p-2 rounded border border-slate-200 sm:col-span-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Hypothetical revenue calculations</span>
          </li>
        </ul>

        {/* Interactive Scope & Guardrail Query Verification Tester */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
            <MessageSquare className="w-4 h-4 text-emerald-700" />
            <span>Interactive Scope Verification Tester</span>
          </div>
          <p className="text-xs text-slate-500 mb-3">
            Test how the agent refuses speculative predictions or out-of-scope inquiries:
          </p>

          {/* Quick Preset Buttons for Test 11 & Test 12 */}
          <div className="flex flex-wrap gap-2 mb-3">
            <button
              id="test-btn-best-country"
              type="button"
              onClick={() => handleAskQuery('Which country will definitely be the best?')}
              className="text-[11px] font-semibold bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
            >
              Test: "Which country will definitely be the best?"
            </button>
            <button
              id="test-btn-future-rate"
              type="button"
              onClick={() => handleAskQuery('What will USD/INR be next month?')}
              className="text-[11px] font-semibold bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
            >
              Test: "What will USD/INR be next month?"
            </button>
            <button
              id="test-btn-unrelated-query"
              type="button"
              onClick={() => handleAskQuery('What is the weather in Paris?')}
              className="text-[11px] font-semibold bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
            >
              Test Unrelated: "What is the weather in Paris?"
            </button>
          </div>

          {/* Custom Input */}
          <div className="flex gap-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAskQuery()}
              placeholder="Type any inquiry or question to test agent scope..."
              className="flex-1 px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none"
            />
            <button
              id="ask-agent-query-btn"
              type="button"
              onClick={() => handleAskQuery()}
              className="flex items-center gap-1 px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
            >
              <Send className="w-3 h-3" />
              <span>Ask</span>
            </button>
          </div>

          {/* Result Answer Box */}
          {response && (
            <div className="mt-3 p-3 bg-white border-l-4 border-emerald-600 rounded-r-lg border border-slate-200 text-xs text-slate-800 animate-fadeIn" id="agent-guardrail-response">
              <span className="font-bold text-slate-900 block mb-1">Agent Response:</span>
              <p className="leading-relaxed font-mono text-[11px] sm:text-xs">{response}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  if (isInline) {
    return content;
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-100 w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden border border-slate-300 my-8 max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-400" />
            <h2 className="font-bold text-base sm:text-lg">Agent Scope, Architecture &amp; Guardrails</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {content}
        </div>

        {/* Modal Footer */}
        <div className="bg-white px-6 py-3.5 border-t border-slate-200 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
