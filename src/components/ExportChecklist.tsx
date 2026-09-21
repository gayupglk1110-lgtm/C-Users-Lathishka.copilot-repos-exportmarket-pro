import React, { useState, useEffect } from 'react';
import { 
  CheckSquare, 
  RotateCcw, 
  Search, 
  Package, 
  CircleDollarSign, 
  FileText, 
  Truck, 
  Store,
  CheckCircle2,
  BookmarkCheck
} from 'lucide-react';
import { INITIAL_EXPORT_CHECKLIST } from '../data/marketData';
import { ExportChecklistItem } from '../types';

const STORAGE_KEY = 'exportmarket_pro_checklist_v1';

export const ExportChecklist: React.FC = () => {
  // Initialize state from localStorage or fallback to default
  const [items, setItems] = useState<ExportChecklistItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // localStorage read failed or unavailable
    }
    return INITIAL_EXPORT_CHECKLIST;
  });

  // Save changes to localStorage whenever items change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // localStorage write error handled gracefully
    }
  }, [items]);

  const toggleItem = (id: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item))
    );
  };

  const handleResetAll = () => {
    const uncompleted = items.map((item) => ({ ...item, completed: false }));
    setItems(uncompleted);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(uncompleted));
    } catch {
      // ignore
    }
  };

  // Metrics
  const totalTasks = items.length;
  const completedTasks = items.filter((i) => i.completed).length;
  const remainingTasks = totalTasks - completedTasks;
  const overallProgress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Group items by category
  const categories: Array<{
    name: ExportChecklistItem['category'];
    icon: React.ReactNode;
    color: string;
  }> = [
    { name: 'MARKET RESEARCH', icon: <Search className="w-4 h-4" />, color: 'border-blue-500 text-blue-700 bg-blue-50' },
    { name: 'PRODUCT', icon: <Package className="w-4 h-4" />, color: 'border-emerald-500 text-emerald-700 bg-emerald-50' },
    { name: 'PRICING', icon: <CircleDollarSign className="w-4 h-4" />, color: 'border-amber-500 text-amber-700 bg-amber-50' },
    { name: 'DOCUMENTATION', icon: <FileText className="w-4 h-4" />, color: 'border-indigo-500 text-indigo-700 bg-indigo-50' },
    { name: 'LOGISTICS', icon: <Truck className="w-4 h-4" />, color: 'border-cyan-500 text-cyan-700 bg-cyan-50' },
    { name: 'TRADE FAIR', icon: <Store className="w-4 h-4" />, color: 'border-rose-500 text-rose-700 bg-rose-50' },
  ];

  return (
    <div className="space-y-6">
      {/* Header card with summary metrics */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <CheckSquare className="w-5 h-5 text-emerald-700" />
              <h2 className="text-xl font-bold text-slate-900">Export Readiness Checklist</h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Comprehensive 6-pillar milestone audit for Indian exporters with persistent browser storage.
            </p>
          </div>
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-700 border border-slate-200 rounded-lg flex items-center gap-1.5">
              <BookmarkCheck className="w-3.5 h-3.5 text-emerald-600" />
              Auto-saved in LocalStorage
            </span>
            <button
              id="reset-all-checklist-btn"
              onClick={handleResetAll}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-700 hover:text-rose-800 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset All</span>
            </button>
          </div>
        </div>

        {/* 4 Key Statistics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Total Tasks</div>
            <div className="text-2xl font-extrabold text-slate-900 font-mono mt-0.5" id="checklist-total-tasks">
              {totalTasks}
            </div>
          </div>

          <div className="bg-emerald-50/70 border border-emerald-200 rounded-lg p-3.5">
            <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">Completed Tasks</div>
            <div className="text-2xl font-extrabold text-emerald-700 font-mono mt-0.5" id="checklist-completed-tasks">
              {completedTasks}
            </div>
          </div>

          <div className="bg-amber-50/70 border border-amber-200 rounded-lg p-3.5">
            <div className="text-[11px] font-bold uppercase tracking-wider text-amber-800">Remaining Tasks</div>
            <div className="text-2xl font-extrabold text-amber-700 font-mono mt-0.5" id="checklist-remaining-tasks">
              {remainingTasks}
            </div>
          </div>

          <div className="bg-slate-900 text-white rounded-lg p-3.5 border border-slate-800">
            <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">Overall Progress</div>
            <div className="text-2xl font-extrabold font-mono mt-0.5" id="checklist-progress-percent">
              {overallProgress}%
            </div>
          </div>
        </div>

        {/* Overall Progress Bar */}
        <div className="mt-5">
          <div className="flex items-center justify-between text-xs text-slate-600 font-semibold mb-1.5">
            <span>Progress Toward Complete Export Readiness</span>
            <span className="font-mono">{completedTasks} / {totalTasks} Completed</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
            <div
              className="bg-emerald-600 h-full rounded-full transition-all duration-300"
              style={{ width: `${overallProgress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((cat) => {
          const catItems = items.filter((i) => i.category === cat.name);
          const catCompleted = catItems.filter((i) => i.completed).length;

          return (
            <div
              key={cat.name}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs flex flex-col"
            >
              {/* Category Header */}
              <div className="bg-slate-900 text-white px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-md bg-slate-800 text-emerald-400">
                    {cat.icon}
                  </span>
                  <h3 className="font-bold text-xs uppercase tracking-wider">{cat.name}</h3>
                </div>
                <span className="text-xs font-mono bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full">
                  {catCompleted}/{catItems.length}
                </span>
              </div>

              {/* Items List */}
              <div className="p-4 divide-y divide-slate-100 flex-1">
                {catItems.map((item) => (
                  <label
                    key={item.id}
                    htmlFor={`check-item-${item.id}`}
                    className="py-2.5 flex items-start gap-3 cursor-pointer hover:bg-slate-50 px-2 -mx-2 rounded-lg transition-colors"
                  >
                    <input
                      id={`check-item-${item.id}`}
                      type="checkbox"
                      checked={item.completed}
                      onChange={() => toggleItem(item.id)}
                      className="w-4 h-4 mt-1 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500 cursor-pointer"
                    />
                    <div className="flex-1">
                      <span className={`text-sm font-semibold block ${item.completed ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                        {item.title}
                      </span>
                      <span className="text-xs text-slate-500 block leading-tight mt-0.5">
                        {item.description}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
