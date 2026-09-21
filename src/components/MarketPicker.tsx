import React, { useState } from 'react';
import { 
  BarChart3, 
  AlertTriangle, 
  ArrowRightLeft, 
  FileText, 
  ShieldCheck, 
  Calendar, 
  Ship, 
  Scale, 
  DollarSign,
  Info
} from 'lucide-react';
import { PRODUCTS, COUNTRIES, MARKET_COMPARISONS } from '../data/marketData';

export const MarketPicker: React.FC = () => {
  const [selectedProductId, setSelectedProductId] = useState<string>('cotton-tshirts');
  const [countryA, setCountryA] = useState<string>('Germany');
  const [countryB, setCountryB] = useState<string>('UAE');
  const [errorNotice, setErrorNotice] = useState<string | null>(null);

  const currentProduct = PRODUCTS.find((p) => p.id === selectedProductId) || PRODUCTS[0];
  const countryAInfo = COUNTRIES.find((c) => c.name === countryA) || COUNTRIES[0];
  const countryBInfo = COUNTRIES.find((c) => c.name === countryB) || COUNTRIES[1];

  const dataA = MARKET_COMPARISONS[selectedProductId]?.[countryA];
  const dataB = MARKET_COMPARISONS[selectedProductId]?.[countryB];

  const handleCountryAChange = (newCountry: string) => {
    if (newCountry === countryB) {
      setErrorNotice(`Country A and Country B cannot both be ${newCountry}. Please choose two different markets.`);
      return;
    }
    setErrorNotice(null);
    setCountryA(newCountry);
  };

  const handleCountryBChange = (newCountry: string) => {
    if (newCountry === countryA) {
      setErrorNotice(`Country A and Country B cannot both be ${newCountry}. Please choose two different markets.`);
      return;
    }
    setErrorNotice(null);
    setCountryB(newCountry);
  };

  const handleSwapCountries = () => {
    const temp = countryA;
    setCountryA(countryB);
    setCountryB(temp);
    setErrorNotice(null);
  };

  // Indicators to compare in table and bar chart
  const indicators = [
    { key: 'marketSize', label: 'Market Size Index', valA: dataA?.marketSize ?? 0, valB: dataB?.marketSize ?? 0, descA: dataA?.marketSizeLabel, descB: dataB?.marketSizeLabel },
    { key: 'demand', label: 'Demand Index', valA: dataA?.demand ?? 0, valB: dataB?.demand ?? 0, descA: dataA?.demandLabel, descB: dataB?.demandLabel },
    { key: 'importRequirement', label: 'Compliance & Import Standard', valA: dataA?.importRequirement ?? 0, valB: dataB?.importRequirement ?? 0, descA: dataA?.importRequirementLabel, descB: dataB?.importRequirementLabel },
    { key: 'tariffIndex', label: 'Tariff / Barrier Index', valA: dataA?.tariffIndex ?? 0, valB: dataB?.tariffIndex ?? 0, descA: dataA?.tariffLabel, descB: dataB?.tariffLabel },
    { key: 'logistics', label: 'Logistics & Transit Ease', valA: dataA?.logistics ?? 0, valB: dataB?.logistics ?? 0, descA: dataA?.logisticsLabel, descB: dataB?.logisticsLabel },
    { key: 'tradeFairRelevance', label: 'Trade Fair Prominence', valA: dataA?.tradeFairRelevance ?? 0, valB: dataB?.tradeFairRelevance ?? 0, descA: dataA?.tradeFairName, descB: dataB?.tradeFairName },
  ];

  return (
    <div className="space-y-6">
      {/* Title & Context */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-emerald-700" />
              <h2 className="text-xl font-bold text-slate-900">Market Picker &amp; Country Comparison</h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Select an export product and two distinct destination markets to analyze regulatory requirements, tariffs, and logistical realities.
            </p>
          </div>
          <span className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-300">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            DEMO DATA — FOR EDUCATIONAL PROTOTYPE
          </span>
        </div>

        {/* Product & Country Selector Controls */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mt-5">
          {/* Product Dropdown */}
          <div className="md:col-span-4">
            <label htmlFor="product-select" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              1. Select Export Product
            </label>
            <select
              id="product-select"
              value={selectedProductId}
              onChange={(e) => {
                setSelectedProductId(e.target.value);
                setErrorNotice(null);
              }}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
            >
              {PRODUCTS.map((prod) => (
                <option key={prod.id} value={prod.id}>
                  {prod.name} (HS: {prod.hsCode}) — {prod.sector}
                </option>
              ))}
            </select>
            <div className="mt-2 text-xs text-slate-600 flex items-center gap-2 bg-slate-100/80 px-2.5 py-1.5 rounded-md">
              <span className="font-semibold text-slate-800">HS Code {currentProduct.hsCode}:</span>
              <span className="truncate">{currentProduct.sector}</span>
              <span className="text-[10px] bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded font-mono ml-auto">
                Demo
              </span>
            </div>
          </div>

          {/* Country A Dropdown */}
          <div className="md:col-span-3">
            <label htmlFor="country-a-select" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              2. Country A (Primary)
            </label>
            <select
              id="country-a-select"
              value={countryA}
              onChange={(e) => handleCountryAChange(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
            >
              {COUNTRIES.map((c) => (
                <option key={`a-${c.id}`} value={c.name} disabled={c.name === countryB}>
                  {c.flag} {c.name} {c.name === countryB ? '(Selected in B)' : ''}
                </option>
              ))}
            </select>
            <div className="mt-2 text-xs text-slate-500 flex items-center justify-between">
              <span>Region: {countryAInfo.region}</span>
              <span className="font-semibold text-slate-700">Curr: {countryAInfo.currency}</span>
            </div>
          </div>

          {/* Swap Button */}
          <div className="md:col-span-1 flex items-end justify-center pb-2">
            <button
              id="swap-countries-btn"
              onClick={handleSwapCountries}
              title="Swap Country A and Country B"
              className="p-2.5 text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg border border-slate-200 transition-colors"
            >
              <ArrowRightLeft className="w-4 h-4" />
            </button>
          </div>

          {/* Country B Dropdown */}
          <div className="md:col-span-4">
            <label htmlFor="country-b-select" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              3. Country B (Comparison Target)
            </label>
            <select
              id="country-b-select"
              value={countryB}
              onChange={(e) => handleCountryBChange(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
            >
              {COUNTRIES.map((c) => (
                <option key={`b-${c.id}`} value={c.name} disabled={c.name === countryA}>
                  {c.flag} {c.name} {c.name === countryA ? '(Selected in A)' : ''}
                </option>
              ))}
            </select>
            <div className="mt-2 text-xs text-slate-500 flex items-center justify-between">
              <span>Region: {countryBInfo.region}</span>
              <span className="font-semibold text-slate-700">Curr: {countryBInfo.currency}</span>
            </div>
          </div>
        </div>

        {/* Error / Guardrail Notice if duplicate selection attempted */}
        {errorNotice && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-xs sm:text-sm text-red-700 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0 text-red-600" />
            <span>{errorNotice}</span>
          </div>
        )}
      </div>

      {/* Comparison Badge & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider bg-slate-800 text-white px-2.5 py-1 rounded">
            FACTUAL COMPARISON
          </span>
          <span className="text-sm font-semibold text-slate-700">
            {currentProduct.name}: {countryA} vs {countryB}
          </span>
        </div>
        <div className="text-xs text-slate-500 italic">
          Objective criteria breakdown • Does not declare a winner
        </div>
      </div>

      {/* Visual Bar Chart Comparing Indicators */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-emerald-700" />
              Comparative Demo Indicator Index (Scale: 0 - 100)
            </h3>
            <p className="text-xs text-slate-500">
              Quantitative benchmark comparison across 6 operational export dimensions.
            </p>
          </div>
          {/* Legend */}
          <div className="flex items-center gap-4 text-xs font-semibold">
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded-xs bg-slate-900"></span>
              <span>{countryAInfo.flag} {countryA}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded-xs bg-emerald-600"></span>
              <span>{countryBInfo.flag} {countryB}</span>
            </div>
          </div>
        </div>

        {/* Dynamic Horizontal Bar Groupings */}
        <div className="space-y-4">
          {indicators.map((ind) => (
            <div key={ind.key} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-800">{ind.label}</span>
                <div className="flex items-center gap-4 font-mono font-medium">
                  <span className="text-slate-900">{countryA}: {ind.valA}/100</span>
                  <span className="text-emerald-700">{countryB}: {ind.valB}/100</span>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-1.5 bg-slate-50 p-2 rounded-lg border border-slate-100">
                {/* Bar A */}
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-semibold text-slate-600 w-20 truncate">{countryA}</span>
                  <div className="flex-1 bg-slate-200 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-slate-900 h-full rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(100, Math.max(5, ind.valA))}%` }}
                    ></div>
                  </div>
                  <span className="text-[11px] font-mono font-bold text-slate-800 w-8 text-right">{ind.valA}</span>
                </div>
                {/* Bar B */}
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-semibold text-slate-600 w-20 truncate">{countryB}</span>
                  <div className="flex-1 bg-slate-200 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-emerald-600 h-full rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(100, Math.max(5, ind.valB))}%` }}
                    ></div>
                  </div>
                  <span className="text-[11px] font-mono font-bold text-emerald-800 w-8 text-right">{ind.valB}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Side-by-Side Comparison Cards & Factual Differences */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Country A Card */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl">{countryAInfo.flag}</span>
              <div>
                <h3 className="font-bold text-base leading-tight">{countryA}</h3>
                <span className="text-xs text-slate-300">{countryAInfo.region}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs uppercase tracking-wider text-slate-400">Currency</div>
              <div className="font-mono font-bold text-emerald-400">{countryAInfo.currency} ({countryAInfo.currencySymbol})</div>
            </div>
          </div>

          <div className="p-4 divide-y divide-slate-100 text-xs sm:text-sm space-y-3">
            <div className="pt-2 flex items-start gap-2.5">
              <Scale className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-slate-700">Market Size Indicator</div>
                <div className="text-slate-600">{dataA?.marketSizeLabel}</div>
              </div>
            </div>

            <div className="pt-3 flex items-start gap-2.5">
              <DollarSign className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-slate-700">Demand Indicator</div>
                <div className="text-slate-600">{dataA?.demandLabel}</div>
              </div>
            </div>

            <div className="pt-3 flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-slate-700">Import &amp; Compliance Requirement</div>
                <div className="text-slate-600">{dataA?.importRequirementLabel}</div>
              </div>
            </div>

            <div className="pt-3 flex items-start gap-2.5">
              <FileText className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-slate-700">Tariff Indicator</div>
                <div className="text-slate-600">{dataA?.tariffLabel}</div>
              </div>
            </div>

            <div className="pt-3 flex items-start gap-2.5">
              <Ship className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-slate-700">Logistics &amp; Shipping Indicator</div>
                <div className="text-slate-600">{dataA?.logisticsLabel}</div>
              </div>
            </div>

            <div className="pt-3 flex items-start gap-2.5">
              <Calendar className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-slate-700">Trade-Fair Relevance</div>
                <div className="text-slate-800 font-medium">{dataA?.tradeFairName}</div>
              </div>
            </div>

            <div className="pt-3 bg-slate-50 p-3 rounded-lg border border-slate-200/60 mt-3">
              <div className="font-semibold text-slate-900 text-xs uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-slate-600" />
                Operational Notes ({countryA})
              </div>
              <p className="text-slate-700 text-xs leading-relaxed">{dataA?.notes}</p>
            </div>
          </div>
        </div>

        {/* Country B Card */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="bg-emerald-900 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl">{countryBInfo.flag}</span>
              <div>
                <h3 className="font-bold text-base leading-tight">{countryB}</h3>
                <span className="text-xs text-emerald-200">{countryBInfo.region}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs uppercase tracking-wider text-emerald-300">Currency</div>
              <div className="font-mono font-bold text-amber-300">{countryBInfo.currency} ({countryBInfo.currencySymbol})</div>
            </div>
          </div>

          <div className="p-4 divide-y divide-slate-100 text-xs sm:text-sm space-y-3">
            <div className="pt-2 flex items-start gap-2.5">
              <Scale className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-slate-700">Market Size Indicator</div>
                <div className="text-slate-600">{dataB?.marketSizeLabel}</div>
              </div>
            </div>

            <div className="pt-3 flex items-start gap-2.5">
              <DollarSign className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-slate-700">Demand Indicator</div>
                <div className="text-slate-600">{dataB?.demandLabel}</div>
              </div>
            </div>

            <div className="pt-3 flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-slate-700">Import &amp; Compliance Requirement</div>
                <div className="text-slate-600">{dataB?.importRequirementLabel}</div>
              </div>
            </div>

            <div className="pt-3 flex items-start gap-2.5">
              <FileText className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-slate-700">Tariff Indicator</div>
                <div className="text-slate-600">{dataB?.tariffLabel}</div>
              </div>
            </div>

            <div className="pt-3 flex items-start gap-2.5">
              <Ship className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-slate-700">Logistics &amp; Shipping Indicator</div>
                <div className="text-slate-600">{dataB?.logisticsLabel}</div>
              </div>
            </div>

            <div className="pt-3 flex items-start gap-2.5">
              <Calendar className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-slate-700">Trade-Fair Relevance</div>
                <div className="text-slate-800 font-medium">{dataB?.tradeFairName}</div>
              </div>
            </div>

            <div className="pt-3 bg-emerald-50/60 p-3 rounded-lg border border-emerald-200/60 mt-3">
              <div className="font-semibold text-emerald-950 text-xs uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-emerald-700" />
                Operational Notes ({countryB})
              </div>
              <p className="text-emerald-900 text-xs leading-relaxed">{dataB?.notes}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Factual Differences Summary Box */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
          Factual Difference Analysis for {currentProduct.name}
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-700">
          <div className="bg-white p-3 rounded-lg border border-slate-200">
            <span className="font-bold text-slate-900 block mb-1">Tariff &amp; Trade Agreements</span>
            {countryAInfo.name === 'UAE' || countryBInfo.name === 'UAE' ? (
              <p>The India-UAE CEPA eliminates or minimizes tariffs on most goods, whereas Western destinations (such as the EU or USA) generally levy standard MFN duty rates unless specific GSP/DCTS schemes apply.</p>
            ) : countryAInfo.name === 'Australia' || countryBInfo.name === 'Australia' ? (
              <p>The India-Australia ECTA provides significant preferential duty-free market access across over 90% of Indian tariff lines.</p>
            ) : (
              <p>Both destinations operate distinct national tariff regimes and quota allocations; verify exact HS code schedules on the Indian DGFT portal.</p>
            )}
          </div>
          <div className="bg-white p-3 rounded-lg border border-slate-200">
            <span className="font-bold text-slate-900 block mb-1">Logistics &amp; Transit Times</span>
            <p>
              Gulf and Southeast Asian destinations (UAE, Singapore) offer rapid ocean transit (3 to 7 days from Western Indian ports like Nhava Sheva/Mundra), while North American and European corridors range from 20 to 35 maritime days.
            </p>
          </div>
          <div className="bg-white p-3 rounded-lg border border-slate-200">
            <span className="font-bold text-slate-900 block mb-1">Regulatory Standards</span>
            <p>
              EU, UK, and USA markets enforce stringent testing and product safety standards (REACH, FDA, UKCA), demanding higher upfront lab accreditation compared to standard ESMA or regional frameworks.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
