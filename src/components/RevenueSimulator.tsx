import React, { useState } from 'react';
import { 
  Calculator, 
  RotateCcw, 
  Sparkles, 
  AlertCircle, 
  BarChart3, 
  Coins, 
  Landmark,
  Layers
} from 'lucide-react';
import { formatINR, formatForeignCurrency, formatPercent, isValidPositiveNumber } from '../utils/formatters';

export const RevenueSimulator: React.FC = () => {
  const [currency, setCurrency] = useState<string>('USD');
  const [invoiceAmountStr, setInvoiceAmountStr] = useState<string>('50000');
  const [baseRateStr, setBaseRateStr] = useState<string>('86.60');
  const [scenarioRateStr, setScenarioRateStr] = useState<string>('90.00');
  const [bankSpreadStr, setBankSpreadStr] = useState<string>('0.25');

  // Input validation
  const isInvoiceValid = isValidPositiveNumber(invoiceAmountStr);
  const isBaseRateValid = isValidPositiveNumber(baseRateStr) && Number(baseRateStr) > 0;
  const isScenarioRateValid = isValidPositiveNumber(scenarioRateStr) && Number(scenarioRateStr) > 0;
  const isSpreadValid = isValidPositiveNumber(bankSpreadStr);

  const allValid = isInvoiceValid && isBaseRateValid && isScenarioRateValid && isSpreadValid;

  const invoiceAmount = allValid ? Number(invoiceAmountStr) : 0;
  const baseRate = allValid ? Number(baseRateStr) : 0;
  const scenarioRate = allValid ? Number(scenarioRateStr) : 0;
  const bankSpread = allValid ? Number(bankSpreadStr) : 0;

  // FORMULAS:
  // Base INR = Invoice * Base Rate
  // Scenario INR = Invoice * Scenario Rate
  // Conversion Cost = Scenario INR * Spread / 100
  // Estimated Received = Scenario INR - Conversion Cost
  // Difference = Estimated Received - Base INR
  // Percentage Difference = (Difference / Base INR) * 100
  const baseInr = invoiceAmount * baseRate;
  const scenarioInr = invoiceAmount * scenarioRate;
  const conversionCost = (scenarioInr * bankSpread) / 100;
  const estimatedReceived = scenarioInr - conversionCost;
  const differenceInr = estimatedReceived - baseInr;
  const percentDifference = baseInr > 0 ? (differenceInr / baseInr) * 100 : 0;

  const handleReset = () => {
    setCurrency('USD');
    setInvoiceAmountStr('50000');
    setBaseRateStr('86.60');
    setScenarioRateStr('90.00');
    setBankSpreadStr('0.25');
  };

  const handleLoadExample = () => {
    // Example: Euro transaction
    setCurrency('EUR');
    setInvoiceAmountStr('75000');
    setBaseRateStr('92.40');
    setScenarioRateStr('95.80');
    setBankSpreadStr('0.30');
  };

  // Currency quick presets for typical base exchange rates
  const handleCurrencyChange = (newCurr: string) => {
    setCurrency(newCurr);
    if (newCurr === 'USD') {
      setBaseRateStr('86.60');
      setScenarioRateStr('90.00');
    } else if (newCurr === 'EUR') {
      setBaseRateStr('92.50');
      setScenarioRateStr('95.00');
    } else if (newCurr === 'GBP') {
      setBaseRateStr('110.20');
      setScenarioRateStr('114.50');
    } else if (newCurr === 'JPY') {
      setBaseRateStr('0.58');
      setScenarioRateStr('0.62');
    }
  };

  // Visual chart proportions
  const maxBarValue = Math.max(baseInr, scenarioInr, estimatedReceived, 1);
  const baseBarPct = Math.min(100, Math.max(10, (baseInr / maxBarValue) * 100));
  const scenarioBarPct = Math.min(100, Math.max(10, (scenarioInr / maxBarValue) * 100));
  const estimatedBarPct = Math.min(100, Math.max(10, (estimatedReceived / maxBarValue) * 100));

  return (
    <div className="space-y-6">
      {/* Simulator Control Card */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <Calculator className="w-5 h-5 text-emerald-700" />
              <h2 className="text-xl font-bold text-slate-900">Revenue Simulator: Multi-Currency &amp; Bank Spread</h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Simulate foreign currency receipts, bank conversion margins (TT buying spread), and net INR credited to your EEFC / Current account.
            </p>
          </div>
          <span className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-900 border border-amber-300">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            HYPOTHETICAL SCENARIO
          </span>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Presets:</span>
            <button
              id="revenue-load-example-btn"
              onClick={handleLoadExample}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-lg text-xs font-semibold transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Load Example (EUR 75k)</span>
            </button>
            <button
              id="revenue-reset-btn"
              onClick={handleReset}
              className="flex items-center gap-1 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-medium transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>
          </div>
          <div className="text-xs text-slate-500 italic">
            Dynamic client-side recalculation
          </div>
        </div>

        {/* Inputs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-6 pt-5 border-t border-slate-100">
          {/* Input 1: Invoice Currency */}
          <div>
            <label htmlFor="sim-currency" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Invoice Currency
            </label>
            <select
              id="sim-currency"
              value={currency}
              onChange={(e) => handleCurrencyChange(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none transition"
            >
              <option value="USD">USD ($ - US Dollar)</option>
              <option value="EUR">EUR (€ - Euro)</option>
              <option value="GBP">GBP (£ - British Pound)</option>
              <option value="JPY">JPY (¥ - Japanese Yen)</option>
            </select>
            <p className="text-[11px] text-slate-500 mt-1">Billing denomination</p>
          </div>

          {/* Input 2: Export Invoice Amount */}
          <div>
            <label htmlFor="sim-invoice-amount" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Export Invoice Amount
            </label>
            <input
              id="sim-invoice-amount"
              type="number"
              min="0"
              step="1000"
              value={invoiceAmountStr}
              onChange={(e) => setInvoiceAmountStr(e.target.value)}
              placeholder="50000"
              className={`w-full px-3 py-2.5 bg-slate-50 border rounded-lg text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none transition ${
                !isInvoiceValid ? 'border-red-500 bg-red-50' : 'border-slate-300'
              }`}
            />
            {!isInvoiceValid ? (
              <p className="text-xs text-red-600 mt-1">Please enter a valid positive number.</p>
            ) : (
              <p className="text-[11px] text-slate-500 mt-1">Formatted: {formatForeignCurrency(invoiceAmount, currency)}</p>
            )}
          </div>

          {/* Input 3: Base Exchange Rate */}
          <div>
            <label htmlFor="sim-base-rate" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Base Rate (INR/{currency})
            </label>
            <input
              id="sim-base-rate"
              type="number"
              min="0.01"
              step="0.05"
              value={baseRateStr}
              onChange={(e) => setBaseRateStr(e.target.value)}
              placeholder="86.60"
              className={`w-full px-3 py-2.5 bg-slate-50 border rounded-lg text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none transition ${
                !isBaseRateValid ? 'border-red-500 bg-red-50' : 'border-slate-300'
              }`}
            />
            {!isBaseRateValid ? (
              <p className="text-xs text-red-600 mt-1">Please enter a valid positive number.</p>
            ) : (
              <p className="text-[11px] text-slate-500 mt-1">Baseline quote</p>
            )}
          </div>

          {/* Input 4: Scenario Exchange Rate */}
          <div>
            <label htmlFor="sim-scenario-rate" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Scenario Rate (INR/{currency})
            </label>
            <input
              id="sim-scenario-rate"
              type="number"
              min="0.01"
              step="0.05"
              value={scenarioRateStr}
              onChange={(e) => setScenarioRateStr(e.target.value)}
              placeholder="90.00"
              className={`w-full px-3 py-2.5 bg-slate-50 border rounded-lg text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none transition ${
                !isScenarioRateValid ? 'border-red-500 bg-red-50' : 'border-slate-300'
              }`}
            />
            {!isScenarioRateValid ? (
              <p className="text-xs text-red-600 mt-1">Please enter a valid positive number.</p>
            ) : (
              <p className="text-[11px] text-slate-500 mt-1">Simulated rate</p>
            )}
          </div>

          {/* Input 5: Bank Conversion Spread (%) */}
          <div>
            <label htmlFor="sim-spread" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Bank Spread (%)
            </label>
            <input
              id="sim-spread"
              type="number"
              min="0"
              max="10"
              step="0.05"
              value={bankSpreadStr}
              onChange={(e) => setBankSpreadStr(e.target.value)}
              placeholder="0.25"
              className={`w-full px-3 py-2.5 bg-slate-50 border rounded-lg text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none transition ${
                !isSpreadValid ? 'border-red-500 bg-red-50' : 'border-slate-300'
              }`}
            />
            {!isSpreadValid ? (
              <p className="text-xs text-red-600 mt-1">Please enter a valid positive number.</p>
            ) : (
              <p className="text-[11px] text-slate-500 mt-1">Bank margin deduction</p>
            )}
          </div>
        </div>
      </div>

      {/* Dynamic Results Breakdown */}
      {allValid ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1: Base INR Value */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <span>Base INR Value</span>
              <Coins className="w-4 h-4 text-slate-400" />
            </div>
            <div className="text-2xl font-extrabold text-slate-900 font-mono" id="base-inr-display">
              {formatINR(baseInr, true)}
            </div>
            <div className="text-xs text-slate-500 mt-2 font-mono bg-slate-50 p-2 rounded">
              {invoiceAmount.toLocaleString()} {currency} × ₹{baseRate.toFixed(2)}
            </div>
          </div>

          {/* Card 2: Scenario Gross INR */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <span>Scenario Gross INR</span>
              <Layers className="w-4 h-4 text-slate-400" />
            </div>
            <div className="text-2xl font-extrabold text-slate-800 font-mono" id="scenario-inr-display">
              {formatINR(scenarioInr, true)}
            </div>
            <div className="text-xs text-slate-500 mt-2 font-mono bg-slate-50 p-2 rounded">
              {invoiceAmount.toLocaleString()} {currency} × ₹{scenarioRate.toFixed(2)}
            </div>
          </div>

          {/* Card 3: Bank Spread Cost */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-amber-700 mb-1">
              <span>Bank Conversion Cost</span>
              <Landmark className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-2xl font-extrabold text-amber-700 font-mono" id="conversion-cost-display">
              {formatINR(conversionCost, true)}
            </div>
            <div className="text-xs text-amber-800/80 mt-2 font-mono bg-amber-50 p-2 rounded">
              {bankSpread.toFixed(2)}% of {formatINR(scenarioInr)}
            </div>
          </div>

          {/* Card 4: Estimated INR Received & Difference */}
          <div className={`rounded-xl border p-5 shadow-xs ${
            differenceInr >= 0 
              ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950' 
              : 'bg-rose-50/70 border-rose-200 text-rose-950'
          }`}>
            <div className="flex items-center justify-between">
              <div className="text-xs font-bold uppercase tracking-wider opacity-80">
                Estimated Net Received
              </div>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                differenceInr >= 0 ? 'bg-emerald-200 text-emerald-900' : 'bg-rose-200 text-rose-900'
              }`}>
                {formatPercent(percentDifference)}
              </span>
            </div>
            <div className="text-2xl font-extrabold font-mono mt-1" id="estimated-received-display">
              {formatINR(estimatedReceived, true)}
            </div>
            <div className="text-xs font-semibold mt-2 flex items-center justify-between border-t border-current/15 pt-2">
              <span>Net Variance:</span>
              <span className="font-mono">{differenceInr >= 0 ? '+' : ''}{formatINR(differenceInr, true)}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm font-medium flex items-center gap-2">
          <AlertCircle className="w-4 h-4" />
          Please enter valid positive numbers for all input fields.
        </div>
      )}

      {/* Comparison Chart: Base vs Scenario vs Net Received */}
      {allValid && (
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-emerald-700" />
              <h3 className="text-sm font-bold text-slate-900">Revenue Flow &amp; Spread Impact Chart</h3>
            </div>
            <span className="text-xs text-slate-500 font-mono">
              Net Difference: {differenceInr >= 0 ? '+' : ''}{formatINR(differenceInr, true)} ({formatPercent(percentDifference)})
            </span>
          </div>

          <div className="space-y-4">
            {/* Base INR Bar */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-semibold text-slate-700 flex items-center gap-2">
                  <span className="w-3 h-3 rounded-xs bg-slate-700"></span>
                  Base INR (Rate: {baseRate.toFixed(2)})
                </span>
                <span className="font-mono font-bold text-slate-900">{formatINR(baseInr, true)}</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-4 overflow-hidden">
                <div
                  className="bg-slate-700 h-full rounded-full transition-all duration-500"
                  style={{ width: `${baseBarPct}%` }}
                ></div>
              </div>
            </div>

            {/* Scenario Gross Bar */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-semibold text-slate-700 flex items-center gap-2">
                  <span className="w-3 h-3 rounded-xs bg-blue-600"></span>
                  Scenario Gross INR (Rate: {scenarioRate.toFixed(2)})
                </span>
                <span className="font-mono font-bold text-slate-900">{formatINR(scenarioInr, true)}</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-4 overflow-hidden">
                <div
                  className="bg-blue-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${scenarioBarPct}%` }}
                ></div>
              </div>
            </div>

            {/* Estimated Net Received Bar */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-semibold text-slate-700 flex items-center gap-2">
                  <span className="w-3 h-3 rounded-xs bg-emerald-600"></span>
                  Estimated Net Received (After {bankSpread.toFixed(2)}% Bank Spread)
                </span>
                <span className="font-mono font-bold text-emerald-800">{formatINR(estimatedReceived, true)}</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-4 overflow-hidden">
                <div
                  className="bg-emerald-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${estimatedBarPct}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="mt-5 p-3 bg-slate-50 rounded-lg text-xs text-slate-600 border border-slate-200">
            <span className="font-bold text-slate-800">Formula Check:</span> Base INR = {invoiceAmount.toLocaleString()} × {baseRate.toFixed(2)} = {formatINR(baseInr)}. Scenario Gross = {formatINR(scenarioInr)}. Bank spread cost = {formatINR(conversionCost, true)}. Final net credited = {formatINR(estimatedReceived, true)}.
          </div>
        </div>
      )}
    </div>
  );
};
