import React, { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  IndianRupee, 
  AlertCircle, 
  RotateCcw, 
  HelpCircle,
  BarChart2
} from 'lucide-react';
import { formatINR, formatUSD, formatPercent, isValidPositiveNumber } from '../utils/formatters';

export const RupeeWatcher: React.FC = () => {
  // Input strings to allow natural typing without NaN bugs
  const [invoiceUsdStr, setInvoiceUsdStr] = useState<string>('100000');
  const [bookingRateStr, setBookingRateStr] = useState<string>('84');
  const [settlementRateStr, setSettlementRateStr] = useState<string>('87');

  // Parse and validate numbers
  const isInvoiceValid = isValidPositiveNumber(invoiceUsdStr);
  const isBookingValid = isValidPositiveNumber(bookingRateStr) && Number(bookingRateStr) > 0;
  const isSettlementValid = isValidPositiveNumber(settlementRateStr) && Number(settlementRateStr) > 0;

  const allValid = isInvoiceValid && isBookingValid && isSettlementValid;

  const invoiceUsd = allValid ? Number(invoiceUsdStr) : 0;
  const bookingRate = allValid ? Number(bookingRateStr) : 0;
  const settlementRate = allValid ? Number(settlementRateStr) : 0;

  // FORMULAS:
  // INR Value = USD Amount * INR/USD Rate
  const bookingInr = invoiceUsd * bookingRate;
  const settlementInr = invoiceUsd * settlementRate;
  const inrDifference = settlementInr - bookingInr;
  const percentDifference = bookingRate > 0 ? ((settlementRate - bookingRate) / bookingRate) * 100 : 0;

  // Preset Scenario Handlers
  const handleRupeeDepreciates = () => {
    // Rupee weakens from 84 to 88.50 -> Exporter receives more INR
    setInvoiceUsdStr('100000');
    setBookingRateStr('84');
    setSettlementRateStr('88.50');
  };

  const handleRupeeAppreciates = () => {
    // Rupee strengthens from 86 to 83.50 -> Exporter receives fewer INR
    setInvoiceUsdStr('100000');
    setBookingRateStr('86');
    setSettlementRateStr('83.50');
  };

  const handleReset = () => {
    setInvoiceUsdStr('100000');
    setBookingRateStr('84');
    setSettlementRateStr('87');
  };

  // Visual chart proportions
  const maxInrVal = Math.max(bookingInr, settlementInr, 1);
  const bookingPct = Math.min(100, Math.max(10, (bookingInr / maxInrVal) * 100));
  const settlementPct = Math.min(100, Math.max(10, (settlementInr / maxInrVal) * 100));

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <IndianRupee className="w-5 h-5 text-emerald-700" />
              <h2 className="text-xl font-bold text-slate-900">Rupee Watcher: Exchange-Rate Education Calculator</h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Demonstrates the foreign exchange variance between shipment booking date and payment settlement date.
            </p>
          </div>
          <div className="text-xs bg-slate-100 border border-slate-200 text-slate-700 px-3 py-1.5 rounded-lg flex items-center gap-1.5 self-start sm:self-auto">
            <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
            <span>Deterministic Math Model</span>
          </div>
        </div>

        {/* Mandatory Educational Disclaimer */}
        <div className="mt-4 p-3 bg-amber-50/80 border border-amber-200 rounded-lg text-xs text-amber-900 flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <strong>Important Notice:</strong> Hypothetical scenario only — this tool does not predict future exchange rates.
          </div>
        </div>

        {/* Action Preset Buttons */}
        <div className="mt-4 flex flex-wrap items-center gap-2.5">
          <span className="text-xs font-bold text-slate-600 uppercase tracking-wider mr-1">
            Load Hypothetical Scenarios:
          </span>
          <button
            id="rupee-depreciates-btn"
            onClick={handleRupeeDepreciates}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-lg text-xs font-semibold transition-colors shadow-2xs"
          >
            <TrendingDown className="w-4 h-4 text-emerald-600" />
            <span>Rupee Depreciates (INR 84 → 88.50)</span>
          </button>
          <button
            id="rupee-appreciates-btn"
            onClick={handleRupeeAppreciates}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-300 rounded-lg text-xs font-semibold transition-colors shadow-2xs"
          >
            <TrendingUp className="w-4 h-4 text-rose-600" />
            <span>Rupee Appreciates (INR 86 → 83.50)</span>
          </button>
          <button
            onClick={handleReset}
            className="flex items-center gap-1 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-medium transition-colors ml-auto"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>
        </div>

        {/* Calculator Input Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6 pt-5 border-t border-slate-100">
          {/* Input 1: Invoice Value */}
          <div>
            <label htmlFor="rupee-invoice-usd" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Export Invoice Value (USD)
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">$</span>
              <input
                id="rupee-invoice-usd"
                type="number"
                min="0"
                step="1000"
                value={invoiceUsdStr}
                onChange={(e) => setInvoiceUsdStr(e.target.value)}
                placeholder="100000"
                className={`w-full pl-8 pr-3.5 py-2.5 bg-slate-50 border rounded-lg text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none transition ${
                  !isInvoiceValid ? 'border-red-500 bg-red-50' : 'border-slate-300'
                }`}
              />
            </div>
            {!isInvoiceValid ? (
              <p className="text-xs text-red-600 mt-1">Please enter a valid positive number.</p>
            ) : (
              <p className="text-[11px] text-slate-500 mt-1">Formatted: {formatUSD(invoiceUsd)}</p>
            )}
          </div>

          {/* Input 2: Booking Exchange Rate */}
          <div>
            <label htmlFor="rupee-booking-rate" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Booking Exchange Rate (INR / USD)
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">₹</span>
              <input
                id="rupee-booking-rate"
                type="number"
                min="0.01"
                step="0.05"
                value={bookingRateStr}
                onChange={(e) => setBookingRateStr(e.target.value)}
                placeholder="84"
                className={`w-full pl-8 pr-3.5 py-2.5 bg-slate-50 border rounded-lg text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none transition ${
                  !isBookingValid ? 'border-red-500 bg-red-50' : 'border-slate-300'
                }`}
              />
            </div>
            {!isBookingValid ? (
              <p className="text-xs text-red-600 mt-1">Please enter a valid positive number.</p>
            ) : (
              <p className="text-[11px] text-slate-500 mt-1">Rate locked on shipment order date</p>
            )}
          </div>

          {/* Input 3: Settlement Exchange Rate */}
          <div>
            <label htmlFor="rupee-settlement-rate" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Settlement Exchange Rate (INR / USD)
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">₹</span>
              <input
                id="rupee-settlement-rate"
                type="number"
                min="0.01"
                step="0.05"
                value={settlementRateStr}
                onChange={(e) => setSettlementRateStr(e.target.value)}
                placeholder="87"
                className={`w-full pl-8 pr-3.5 py-2.5 bg-slate-50 border rounded-lg text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none transition ${
                  !isSettlementValid ? 'border-red-500 bg-red-50' : 'border-slate-300'
                }`}
              />
            </div>
            {!isSettlementValid ? (
              <p className="text-xs text-red-600 mt-1">Please enter a valid positive number.</p>
            ) : (
              <p className="text-[11px] text-slate-500 mt-1">Rate realized upon bank realization</p>
            )}
          </div>
        </div>
      </div>

      {/* Calculated Results Display */}
      {allValid ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1: Booking INR */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              Booking INR Value
            </div>
            <div className="text-2xl font-extrabold text-slate-900 font-mono" id="booking-inr-display">
              {formatINR(bookingInr)}
            </div>
            <div className="text-xs text-slate-500 mt-2 font-mono bg-slate-50 p-2 rounded border border-slate-100">
              {invoiceUsd.toLocaleString()} USD × ₹{bookingRate.toFixed(2)}
            </div>
          </div>

          {/* Card 2: Settlement INR */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              Settlement INR Value
            </div>
            <div className="text-2xl font-extrabold text-emerald-800 font-mono" id="settlement-inr-display">
              {formatINR(settlementInr)}
            </div>
            <div className="text-xs text-slate-500 mt-2 font-mono bg-slate-50 p-2 rounded border border-slate-100">
              {invoiceUsd.toLocaleString()} USD × ₹{settlementRate.toFixed(2)}
            </div>
          </div>

          {/* Card 3: INR Difference & % */}
          <div className={`rounded-xl border p-5 shadow-xs ${
            inrDifference >= 0 
              ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950' 
              : 'bg-rose-50/70 border-rose-200 text-rose-950'
          }`}>
            <div className="flex items-center justify-between">
              <div className="text-xs font-bold uppercase tracking-wider opacity-80">
                INR Difference
              </div>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                inrDifference >= 0 ? 'bg-emerald-200 text-emerald-900' : 'bg-rose-200 text-rose-900'
              }`}>
                {formatPercent(percentDifference)}
              </span>
            </div>
            <div className="text-2xl font-extrabold font-mono mt-1" id="difference-inr-display">
              {formatINR(inrDifference)}
            </div>
            <div className="text-xs opacity-90 mt-2">
              {inrDifference >= 0
                ? '✓ Favorable exchange movement: exporter gains additional rupees'
                : '⚠ Adverse exchange movement: exporter receives fewer rupees than booked'}
            </div>
          </div>
        </div>
      ) : (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm font-medium">
          Please enter a valid positive number for all calculator fields above to view calculations.
        </div>
      )}

      {/* Visual Comparison Chart */}
      {allValid && (
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-emerald-700" />
              <h3 className="text-sm font-bold text-slate-900">Exchange Realization Visual Comparison</h3>
            </div>
            <span className="text-xs text-slate-500 font-mono">
              Variance: {inrDifference >= 0 ? '+' : ''}{formatINR(inrDifference)} ({formatPercent(percentDifference)})
            </span>
          </div>

          <div className="space-y-4">
            {/* Booking Bar */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-semibold text-slate-700 flex items-center gap-2">
                  <span className="w-3 h-3 rounded-xs bg-slate-800"></span>
                  Booking Rate Value (@ ₹{bookingRate.toFixed(2)})
                </span>
                <span className="font-mono font-bold text-slate-900">{formatINR(bookingInr)}</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-4 overflow-hidden">
                <div
                  className="bg-slate-800 h-full rounded-full transition-all duration-500"
                  style={{ width: `${bookingPct}%` }}
                ></div>
              </div>
            </div>

            {/* Settlement Bar */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-semibold text-slate-700 flex items-center gap-2">
                  <span className={`w-3 h-3 rounded-xs ${inrDifference >= 0 ? 'bg-emerald-600' : 'bg-rose-600'}`}></span>
                  Settlement Rate Value (@ ₹{settlementRate.toFixed(2)})
                </span>
                <span className="font-mono font-bold text-slate-900">{formatINR(settlementInr)}</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-4 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    inrDifference >= 0 ? 'bg-emerald-600' : 'bg-rose-600'
                  }`}
                  style={{ width: `${settlementPct}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Educational Concept Callout */}
          <div className="mt-5 p-3.5 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-600 space-y-1">
            <div className="font-bold text-slate-800">Key Educational Takeaway for Exporters:</div>
            <p>
              When the Indian Rupee depreciates against the USD between the order contract date and wire settlement date, the exporter receives more INR for the same USD invoice amount. Conversely, if the Rupee appreciates, realized revenue declines unless hedged via Forward Contracts or Currency Options with an Authorized Dealer (AD) Bank.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
