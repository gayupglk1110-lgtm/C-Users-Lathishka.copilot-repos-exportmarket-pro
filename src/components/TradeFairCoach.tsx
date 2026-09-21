import React, { useState } from 'react';
import { 
  Building2, 
  Calendar, 
  CheckSquare, 
  Clock, 
  RotateCcw, 
  Sparkles, 
  MapPin, 
  Briefcase, 
  CheckCircle2
} from 'lucide-react';
import { TradeFairTask } from '../types';

export const TradeFairCoach: React.FC = () => {
  const [companyName, setCompanyName] = useState('Apex Textiles India');
  const [product, setProduct] = useState('Organic Cotton Knitwear');
  const [targetCountry, setTargetCountry] = useState('Germany');
  const [tradeFairName, setTradeFairName] = useState('Munich Fabric Start 2026');
  const [numberOfDays, setNumberOfDays] = useState('4');
  const [budget, setBudget] = useState('₹4,50,000');

  // Plan generation state
  const [isPlanGenerated, setIsPlanGenerated] = useState<boolean>(true);

  // Initial task items list
  const defaultTasks: TradeFairTask[] = [
    // BEFORE THE FAIR (11 tasks)
    { id: 'b-1', phase: 'before', title: 'Market research', description: 'Analyze host nation retail trends, competitor pricing, and buyer preferences.', completed: true },
    { id: 'b-2', phase: 'before', title: 'Buyer research', description: 'Compile pre-vetted list of procurement heads, wholesalers, and retail buyers attending.', completed: true },
    { id: 'b-3', phase: 'before', title: 'Product catalogue', description: 'Produce printed lookbooks and mobile-responsive digital QR catalogues.', completed: false },
    { id: 'b-4', phase: 'before', title: 'Product samples', description: 'Prepare showroom-finish samples in tamper-proof branded travel cases.', completed: false },
    { id: 'b-5', phase: 'before', title: 'Pricing sheet', description: 'Finalize FOB Mumbai / CIF Hamburg multi-tier pricing schedules.', completed: false },
    { id: 'b-6', phase: 'before', title: 'Company profile', description: 'Draft 1-page corporate overview emphasizing factory certifications and audit reports.', completed: true },
    { id: 'b-7', phase: 'before', title: 'Business cards', description: 'Print bilingual business cards with WhatsApp and executive email.', completed: false },
    { id: 'b-8', phase: 'before', title: 'Pitch preparation', description: 'Refine and rehearse concise 60-second value proposition with team.', completed: false },
    { id: 'b-9', phase: 'before', title: 'Travel planning', description: 'Secure Schengen/host business visas, flight bookings, and hotel close to venue.', completed: false },
    { id: 'b-10', phase: 'before', title: 'Shipping/logistics', description: 'Dispatch sample crates via ATA Carnet or courier well before exhibitor freight cut-off.', completed: false },
    { id: 'b-11', phase: 'before', title: 'Required documents', description: 'Carry physical & cloud copies of IEC, GST, RCMC, and product test certificates.', completed: false },

    // DURING THE FAIR (7 tasks)
    { id: 'd-1', phase: 'during', title: 'Booth setup', description: 'Supervise banner mounting, spotlights, electrical hookups, and promotional displays.', completed: false },
    { id: 'd-2', phase: 'during', title: 'Product display', description: 'Arrange merchandise logically with clear technical tags and touch-and-feel accessibility.', completed: false },
    { id: 'd-3', phase: 'during', title: 'Buyer meetings', description: 'Conduct scheduled pre-booked B2B buyer sessions with structured agenda.', completed: false },
    { id: 'd-4', phase: 'during', title: 'Lead collection', description: 'Scan badges or gather physical business cards systematically in lead card binders.', completed: false },
    { id: 'd-5', phase: 'during', title: 'Contact details', description: 'Log WhatsApp numbers, LinkedIn profiles, and verified direct procurement emails.', completed: false },
    { id: 'd-6', phase: 'during', title: 'Product demonstration', description: 'Demonstrate material softness, tensile strength, and eco-dye certificates live.', completed: false },
    { id: 'd-7', phase: 'during', title: 'Meeting notes', description: 'Immediately record specific sample requests, target price expectations, and delivery windows.', completed: false },

    // AFTER THE FAIR (5 tasks)
    { id: 'a-1', phase: 'after', title: 'Organize leads', description: 'Segment captured leads into Hot (immediate RFQ), Warm (sample interest), and Cold.', completed: false },
    { id: 'a-2', phase: 'after', title: 'Send follow-up emails', description: 'Transmit personalized thank-you emails with digital catalogue within 48-72 hours.', completed: false },
    { id: 'a-3', phase: 'after', title: 'Send quotations', description: 'Submit formal proforma invoices and Incoterm quotations tailored to requested MOQs.', completed: false },
    { id: 'a-4', phase: 'after', title: 'Evaluate prospects', description: 'Verify buyer creditworthiness, store locations, and financial stability via ECGC / credit rating.', completed: false },
    { id: 'a-5', phase: 'after', title: 'Record outcomes', description: 'Calculate total fair ROI against budget and archive buyer notes into corporate records.', completed: false },
  ];

  const [tasks, setTasks] = useState<TradeFairTask[]>(defaultTasks);

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const handleCreatePlan = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPlanGenerated(true);
  };

  const handleResetChecklist = () => {
    setTasks((prev) => prev.map((t) => ({ ...t, completed: false })));
  };

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const progressPercent = Math.round((completedTasks / totalTasks) * 100);

  const beforeTasks = tasks.filter((t) => t.phase === 'before');
  const duringTasks = tasks.filter((t) => t.phase === 'during');
  const afterTasks = tasks.filter((t) => t.phase === 'after');

  return (
    <div className="space-y-6">
      {/* Header Form */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-emerald-700" />
              <h2 className="text-xl font-bold text-slate-900">Trade Fair Coach: Exhibition Readiness</h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Plan, execute, and capitalize on international buyer fairs with a structured three-phase roadmap.
            </p>
          </div>
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="text-xs font-semibold px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-300 rounded-full flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Interactive Task Manager
            </span>
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleCreatePlan} className="mt-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label htmlFor="tf-company" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Company Name
              </label>
              <input
                id="tf-company"
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
                placeholder="e.g. Apex Textiles India"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>

            <div>
              <label htmlFor="tf-product" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Product
              </label>
              <input
                id="tf-product"
                type="text"
                value={product}
                onChange={(e) => setProduct(e.target.value)}
                required
                placeholder="e.g. Cotton T-Shirts"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>

            <div>
              <label htmlFor="tf-country" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Target Country
              </label>
              <input
                id="tf-country"
                type="text"
                value={targetCountry}
                onChange={(e) => setTargetCountry(e.target.value)}
                required
                placeholder="e.g. Germany"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>

            <div>
              <label htmlFor="tf-fair-name" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Trade Fair Name
              </label>
              <input
                id="tf-fair-name"
                type="text"
                value={tradeFairName}
                onChange={(e) => setTradeFairName(e.target.value)}
                required
                placeholder="e.g. Munich Fabric Start"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>

            <div>
              <label htmlFor="tf-days" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Number of Days
              </label>
              <input
                id="tf-days"
                type="text"
                value={numberOfDays}
                onChange={(e) => setNumberOfDays(e.target.value)}
                required
                placeholder="e.g. 4"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>

            <div>
              <label htmlFor="tf-budget" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Estimated Budget
              </label>
              <input
                id="tf-budget"
                type="text"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                required
                placeholder="e.g. ₹4,50,000"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100">
            <button
              id="create-trade-plan-btn"
              type="submit"
              className="flex items-center gap-2 px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-bold rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Create Preparation Plan</span>
            </button>

            <button
              id="reset-checklist-btn"
              type="button"
              onClick={handleResetChecklist}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Checklist</span>
            </button>
          </div>
        </form>
      </div>

      {/* Preparation Progress Widget */}
      {isPlanGenerated && (
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
            <div>
              <div className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <CheckSquare className="w-4 h-4 text-emerald-700" />
                <span>Preparation Progress: {progressPercent}%</span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Completed {completedTasks} of {totalTasks} mandatory trade fair milestones for {tradeFairName} ({targetCountry}).
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold bg-slate-100 px-3 py-1.5 rounded-lg text-slate-700 self-start sm:self-auto">
              <span>{completedTasks}/{totalTasks} TASKS DONE</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
            <div
              className="bg-emerald-600 h-full rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>

          {/* Context Details */}
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-slate-50 p-3 rounded-lg border border-slate-100">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Exhibitor</span>
              <span className="font-semibold text-slate-800 truncate block">{companyName}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Product Focus</span>
              <span className="font-semibold text-slate-800 truncate block">{product}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Duration</span>
              <span className="font-semibold text-slate-800 block">{numberOfDays} Days</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Budget Allocated</span>
              <span className="font-semibold text-emerald-700 font-mono block">{budget}</span>
            </div>
          </div>
        </div>
      )}

      {/* Task Checklist Sections */}
      {isPlanGenerated && (
        <div className="space-y-6">
          {/* Phase 1: BEFORE THE FAIR */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="bg-slate-900 text-white px-5 py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-bold uppercase tracking-wider">
                  BEFORE THE FAIR (Pre-Show Preparation)
                </h3>
              </div>
              <span className="text-xs bg-slate-800 text-slate-300 px-2.5 py-0.5 rounded-full font-mono font-medium">
                {beforeTasks.filter((t) => t.completed).length}/{beforeTasks.length} Done
              </span>
            </div>
            <div className="p-5 divide-y divide-slate-100">
              {beforeTasks.map((task) => (
                <label
                  key={task.id}
                  htmlFor={`task-check-${task.id}`}
                  className="py-3 flex items-start gap-3 cursor-pointer hover:bg-slate-50 px-2 -mx-2 rounded-lg transition-colors"
                >
                  <input
                    id={`task-check-${task.id}`}
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                    className="w-4 h-4 mt-1 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500 cursor-pointer"
                  />
                  <div className="flex-1">
                    <span className={`text-sm font-semibold block ${task.completed ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                      {task.title}
                    </span>
                    <span className="text-xs text-slate-500 leading-relaxed block mt-0.5">
                      {task.description}
                    </span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Phase 2: DURING THE FAIR */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="bg-emerald-900 text-white px-5 py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-amber-300" />
                <h3 className="text-sm font-bold uppercase tracking-wider">
                  DURING THE FAIR (On-Site Execution)
                </h3>
              </div>
              <span className="text-xs bg-emerald-950 text-emerald-200 px-2.5 py-0.5 rounded-full font-mono font-medium">
                {duringTasks.filter((t) => t.completed).length}/{duringTasks.length} Done
              </span>
            </div>
            <div className="p-5 divide-y divide-slate-100">
              {duringTasks.map((task) => (
                <label
                  key={task.id}
                  htmlFor={`task-check-${task.id}`}
                  className="py-3 flex items-start gap-3 cursor-pointer hover:bg-slate-50 px-2 -mx-2 rounded-lg transition-colors"
                >
                  <input
                    id={`task-check-${task.id}`}
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                    className="w-4 h-4 mt-1 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500 cursor-pointer"
                  />
                  <div className="flex-1">
                    <span className={`text-sm font-semibold block ${task.completed ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                      {task.title}
                    </span>
                    <span className="text-xs text-slate-500 leading-relaxed block mt-0.5">
                      {task.description}
                    </span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Phase 3: AFTER THE FAIR */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="bg-slate-800 text-white px-5 py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-bold uppercase tracking-wider">
                  AFTER THE FAIR (Post-Show Follow-Up &amp; Lead Conversion)
                </h3>
              </div>
              <span className="text-xs bg-slate-900 text-slate-300 px-2.5 py-0.5 rounded-full font-mono font-medium">
                {afterTasks.filter((t) => t.completed).length}/{afterTasks.length} Done
              </span>
            </div>
            <div className="p-5 divide-y divide-slate-100">
              {afterTasks.map((task) => (
                <label
                  key={task.id}
                  htmlFor={`task-check-${task.id}`}
                  className="py-3 flex items-start gap-3 cursor-pointer hover:bg-slate-50 px-2 -mx-2 rounded-lg transition-colors"
                >
                  <input
                    id={`task-check-${task.id}`}
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                    className="w-4 h-4 mt-1 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500 cursor-pointer"
                  />
                  <div className="flex-1">
                    <span className={`text-sm font-semibold block ${task.completed ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                      {task.title}
                    </span>
                    <span className="text-xs text-slate-500 leading-relaxed block mt-0.5">
                      {task.description}
                    </span>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
