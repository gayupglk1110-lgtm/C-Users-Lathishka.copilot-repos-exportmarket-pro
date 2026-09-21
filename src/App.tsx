import { useState } from 'react';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { HeroQuickActions } from './components/HeroQuickActions';
import { MarketPicker } from './components/MarketPicker';
import { RupeeWatcher } from './components/RupeeWatcher';
import { RevenueSimulator } from './components/RevenueSimulator';
import { TradeFairCoach } from './components/TradeFairCoach';
import { PitchBuilder } from './components/PitchBuilder';
import { ExportChecklist } from './components/ExportChecklist';
import { Sources } from './components/Sources';
import { AgentScopeAndAbout } from './components/AgentScopeAndAbout';
import { Footer } from './components/Footer';
import { TabType } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('market-picker');
  const [isScopeModalOpen, setIsScopeModalOpen] = useState<boolean>(false);

  const handleSelectTab = (tab: TabType) => {
    setActiveTab(tab);
    window.scrollTo({ top: 380, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 text-slate-900 font-sans selection:bg-emerald-200">
      {/* 1. Header with Statutory Demo Notice Banner */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenScopeModal={() => setIsScopeModalOpen(true)}
      />

      {/* 2. Responsive Navigation Bar */}
      <Navigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenScopeModal={() => setIsScopeModalOpen(true)}
      />

      {/* 3. Hero Header with 3 Large Quick-Action Cards */}
      <HeroQuickActions onSelectTab={handleSelectTab} />

      {/* 4. Main Application Workspace Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {activeTab === 'market-picker' && <MarketPicker />}
        {activeTab === 'rupee-watcher' && <RupeeWatcher />}
        {activeTab === 'revenue-simulator' && <RevenueSimulator />}
        {activeTab === 'trade-fair-coach' && <TradeFairCoach />}
        {activeTab === 'pitch-builder' && <PitchBuilder />}
        {activeTab === 'export-checklist' && <ExportChecklist />}
        {activeTab === 'sources' && <Sources />}

        {/* Dedicated Section: Agent Scope & How It Works (Always accessible below the active module) */}
        <div className="mt-14 pt-8 border-t border-slate-300/70">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-600">
              Agent Governance &amp; Educational Architecture
            </h3>
            <button
              onClick={() => setIsScopeModalOpen(true)}
              className="text-xs text-emerald-700 hover:text-emerald-800 font-semibold underline cursor-pointer"
            >
              Open in Dedicated Dialog
            </button>
          </div>
          <AgentScopeAndAbout isInline={true} />
        </div>
      </main>

      {/* 5. Footer with Mandatory Statutory Disclaimer */}
      <Footer
        onSelectTab={handleSelectTab}
        onOpenScopeModal={() => setIsScopeModalOpen(true)}
      />

      {/* 6. Scope & Architecture Modal */}
      <AgentScopeAndAbout
        isOpen={isScopeModalOpen}
        onClose={() => setIsScopeModalOpen(false)}
      />
    </div>
  );
}
