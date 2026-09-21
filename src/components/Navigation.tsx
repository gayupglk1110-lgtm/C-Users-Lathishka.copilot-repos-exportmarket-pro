import React, { useState } from 'react';
import { 
  BarChart3, 
  IndianRupee, 
  Calculator, 
  Building2, 
  Sparkles, 
  CheckSquare, 
  BookOpen, 
  Menu, 
  X,
  Compass
} from 'lucide-react';
import { TabType } from '../types';

interface NavigationProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  onOpenScopeModal: () => void;
}

interface NavItem {
  id: TabType;
  label: string;
  icon: React.ReactNode;
  badge?: string;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab, onOpenScopeModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: NavItem[] = [
    { id: 'market-picker', label: 'Market Picker', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'rupee-watcher', label: 'Rupee Watcher', icon: <IndianRupee className="w-4 h-4" /> },
    { id: 'revenue-simulator', label: 'Revenue Simulator', icon: <Calculator className="w-4 h-4" /> },
    { id: 'trade-fair-coach', label: 'Trade Fair Coach', icon: <Building2 className="w-4 h-4" /> },
    { id: 'pitch-builder', label: 'Pitch Builder', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'export-checklist', label: 'Export Checklist', icon: <CheckSquare className="w-4 h-4" /> },
    { id: 'sources', label: 'Sources', icon: <BookOpen className="w-4 h-4" /> },
  ];

  const handleSelect = (id: TabType) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Desktop Horizontal Tabs */}
          <div className="hidden lg:flex items-center space-x-1 overflow-x-auto py-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-tab-${item.id}`}
                  onClick={() => handleSelect(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-emerald-700 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Medium screen horizontal scrollable bar with visible buttons */}
          <div className="hidden sm:flex lg:hidden items-center space-x-1 overflow-x-auto py-1 w-full mr-2 scrollbar-none">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-tab-md-${item.id}`}
                  onClick={() => handleSelect(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-colors ${
                    isActive
                      ? 'bg-emerald-700 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Desktop Right Utilities */}
          <div className="hidden lg:flex items-center gap-2">
            <button
              onClick={onOpenScopeModal}
              className="flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-emerald-700 bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 px-3 py-1.5 rounded-lg transition-colors"
              title="Agent Scope & Verification Guide"
            >
              <Compass className="w-3.5 h-3.5 text-emerald-600" />
              <span>Scope &amp; Guide</span>
            </button>
          </div>

          {/* Mobile Current View & Hamburger Button */}
          <div className="flex sm:hidden items-center justify-between w-full">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900 truncate">
              <span className="text-emerald-700">
                {navItems.find((n) => n.id === activeTab)?.icon}
              </span>
              <span className="truncate">
                {navItems.find((n) => n.id === activeTab)?.label}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={onOpenScopeModal}
                className="p-1.5 text-slate-600 hover:text-emerald-700 rounded-lg hover:bg-slate-100"
                aria-label="Agent Scope"
                title="Agent Scope"
              >
                <Compass className="w-5 h-5 text-emerald-600" />
              </button>
              <button
                id="mobile-nav-toggle-btn"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-slate-200 bg-slate-50 px-4 pt-2 pb-4 space-y-1 shadow-lg animate-fadeIn">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-3 py-1">
            Navigation Tabs
          </div>
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`mobile-nav-item-${item.id}`}
                onClick={() => handleSelect(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-emerald-700 text-white font-semibold shadow-sm'
                    : 'text-slate-700 hover:bg-slate-200/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={isActive ? 'text-white' : 'text-slate-500'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>
                {isActive && <span className="text-xs text-emerald-100 font-normal">Active</span>}
              </button>
            );
          })}
          <div className="pt-2 border-t border-slate-200">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenScopeModal();
              }}
              className="w-full flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-emerald-800 bg-emerald-100/70 hover:bg-emerald-100 rounded-lg"
            >
              <Compass className="w-4 h-4" />
              <span>About Agent, Scope &amp; Guardrails</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
