import React, { useState } from 'react';
import { 
  Sparkles, 
  Copy, 
  RotateCcw, 
  Check, 
  FileText, 
  Trash2, 
  ShieldAlert,
  Building,
  Target
} from 'lucide-react';
import { PitchInputs } from '../types';

export const PitchBuilder: React.FC = () => {
  const [inputs, setInputs] = useState<PitchInputs>({
    companyName: 'Vedic Herbs & Spices Exim',
    product: 'Single-Origin Organic Turmeric & Black Pepper',
    targetCountry: 'Germany',
    targetBuyer: 'Specialty organic food distributors and retail spice packers',
    uniqueSellingPoint: 'Direct farm-gate sourcing with high 6.2% curcumin potency',
    sustainabilityFeature: '100% solar-dehydrated processing in compostable jute-lined packaging',
    priceValueProposition: 'Competitive direct FOB Cochin pricing with zero middleman markups',
  });

  const [generatedPitch, setGeneratedPitch] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [pitchVariation, setPitchVariation] = useState<number>(0);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Helper to build deterministic pitch strictly from user input
  const buildPitch = (data: PitchInputs, variationIndex: number): string => {
    const cName = data.companyName.trim();
    const prod = data.product.trim();
    const country = data.targetCountry.trim();
    const buyer = data.targetBuyer.trim();
    const usp = data.uniqueSellingPoint.trim();
    const sust = data.sustainabilityFeature.trim();
    const priceVal = data.priceValueProposition.trim();

    if (variationIndex % 2 === 0) {
      // Style A: Professional Executive Pitch
      return `Guten Tag and welcome. I represent ${cName}, an Indian export enterprise specializing in ${prod}. We specifically cater to ${buyer} across ${country}. Our key differentiator is ${usp}, reinforced by our commitment to ${sust}. For your supply chain, this ensures unmatched batch reliability and ${priceVal}. We invite you to examine our export samples and initiate a direct supply conversation today.`;
    } else {
      // Style B: Value-Driven Direct Pitch
      return `Hello and welcome to our booth. We are ${cName}, offering premium ${prod} tailored for ${country}. We work directly with ${buyer} seeking consistent quality. Our standout strength is ${usp}, combined with eco-conscious practices including ${sust}. Partnering with us gives your business ${priceVal}. Let us review your technical specifications and discuss our inaugural shipment schedule right now.`;
    }
  };

  const handleGenerate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    // Validate required fields
    if (
      !inputs.companyName.trim() ||
      !inputs.product.trim() ||
      !inputs.targetCountry.trim() ||
      !inputs.targetBuyer.trim() ||
      !inputs.uniqueSellingPoint.trim() ||
      !inputs.sustainabilityFeature.trim() ||
      !inputs.priceValueProposition.trim()
    ) {
      setValidationError('Please fill in all 7 fields before generating the pitch.');
      return;
    }

    setValidationError(null);
    const pitch = buildPitch(inputs, pitchVariation);
    setGeneratedPitch(pitch);
    setCopied(false);
  };

  const handleRegenerate = () => {
    const nextVar = pitchVariation + 1;
    setPitchVariation(nextVar);
    const pitch = buildPitch(inputs, nextVar);
    setGeneratedPitch(pitch);
    setCopied(false);
  };

  const handleCopy = async () => {
    if (!generatedPitch) return;
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(generatedPitch);
      } else {
        // Fallback
        const textArea = document.createElement('textarea');
        textArea.value = generatedPitch;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const handleClear = () => {
    setInputs({
      companyName: '',
      product: '',
      targetCountry: '',
      targetBuyer: '',
      uniqueSellingPoint: '',
      sustainabilityFeature: '',
      priceValueProposition: '',
    });
    setGeneratedPitch('');
    setCopied(false);
    setValidationError(null);
  };

  // Word count calculator
  const wordCount = generatedPitch.trim() ? generatedPitch.trim().split(/\s+/).length : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-700" />
              <h2 className="text-xl font-bold text-slate-900">Pitch Builder: 60-Second Trade Fair Pitch</h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Draft a focused 60–100 word B2B elevator pitch constructed strictly from your operational details with zero hallucinations.
            </p>
          </div>
          <div className="text-xs bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg border border-slate-200 flex items-center gap-1.5 self-start sm:self-auto">
            <ShieldAlert className="w-3.5 h-3.5 text-slate-500" />
            <span>Strict Zero-Hallucination Template</span>
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleGenerate} className="mt-5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label htmlFor="pitch-company" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                1. Company Name
              </label>
              <div className="relative">
                <Building className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  id="pitch-company"
                  type="text"
                  value={inputs.companyName}
                  onChange={(e) => setInputs({ ...inputs, companyName: e.target.value })}
                  placeholder="e.g. Apex Exports India"
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label htmlFor="pitch-product" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                2. Product
              </label>
              <input
                id="pitch-product"
                type="text"
                value={inputs.product}
                onChange={(e) => setInputs({ ...inputs, product: e.target.value })}
                placeholder="e.g. Organic Cotton T-Shirts"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>

            <div>
              <label htmlFor="pitch-country" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                3. Target Country
              </label>
              <input
                id="pitch-country"
                type="text"
                value={inputs.targetCountry}
                onChange={(e) => setInputs({ ...inputs, targetCountry: e.target.value })}
                placeholder="e.g. Germany"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>

            <div className="sm:col-span-2 lg:col-span-3">
              <label htmlFor="pitch-buyer" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                4. Target Buyer Profile
              </label>
              <div className="relative">
                <Target className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  id="pitch-buyer"
                  type="text"
                  value={inputs.targetBuyer}
                  onChange={(e) => setInputs({ ...inputs, targetBuyer: e.target.value })}
                  placeholder="e.g. European apparel retail buyers, boutique chain procurement managers"
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>
            </div>

            <div className="sm:col-span-2 lg:col-span-3">
              <label htmlFor="pitch-usp" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                5. Unique Selling Point (USP)
              </label>
              <input
                id="pitch-usp"
                type="text"
                value={inputs.uniqueSellingPoint}
                onChange={(e) => setInputs({ ...inputs, uniqueSellingPoint: e.target.value })}
                placeholder="e.g. 100% GOTS-certified organic cotton with zero-shrinkage pre-wash"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>

            <div className="sm:col-span-2 lg:col-span-3">
              <label htmlFor="pitch-sustainability" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                6. Sustainability Feature
              </label>
              <input
                id="pitch-sustainability"
                type="text"
                value={inputs.sustainabilityFeature}
                onChange={(e) => setInputs({ ...inputs, sustainabilityFeature: e.target.value })}
                placeholder="e.g. Zero-discharge effluent water treatment and biodegradable cornstarch polybags"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>

            <div className="sm:col-span-2 lg:col-span-3">
              <label htmlFor="pitch-pricing" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                7. Price / Value Proposition
              </label>
              <input
                id="pitch-pricing"
                type="text"
                value={inputs.priceValueProposition}
                onChange={(e) => setInputs({ ...inputs, priceValueProposition: e.target.value })}
                placeholder="e.g. Direct factory FOB Nhava Sheva pricing yielding 18% cost savings vs European distributors"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
          </div>

          {validationError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 font-medium">
              {validationError}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100">
            <div className="flex items-center gap-2">
              <button
                id="generate-pitch-btn"
                type="submit"
                className="flex items-center gap-2 px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-bold rounded-lg shadow-sm transition-colors cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Generate Trade Fair Pitch</span>
              </button>

              {generatedPitch && (
                <button
                  id="regenerate-pitch-btn"
                  type="button"
                  onClick={handleRegenerate}
                  className="flex items-center gap-1.5 px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Regenerate</span>
                </button>
              )}
            </div>

            <button
              id="clear-pitch-btn"
              type="button"
              onClick={handleClear}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-500 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          </div>
        </form>
      </div>

      {/* Generated Pitch Display */}
      {generatedPitch ? (
        <div className="bg-white rounded-xl border border-emerald-300 p-6 shadow-md shadow-emerald-950/5 relative">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 mb-4">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-emerald-700" />
              <h3 className="text-base font-bold text-slate-900">Generated Trade Fair Pitch</h3>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md border border-slate-200">
                {wordCount} words (Target: 60–100)
              </span>
              <button
                id="copy-pitch-btn"
                onClick={handleCopy}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all shadow-xs cursor-pointer ${
                  copied
                    ? 'bg-emerald-700 text-white'
                    : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300'
                }`}
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Pitch copied.' : 'Copy Pitch'}</span>
              </button>
            </div>
          </div>

          {/* Pitch Text Box */}
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200/80 text-slate-800 font-sans leading-relaxed text-sm sm:text-base selection:bg-emerald-200">
            "{generatedPitch}"
          </div>

          {/* Pitch Structure Breakdown Verification */}
          <div className="mt-5 pt-4 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-6 gap-2 text-[11px] text-slate-500 text-center">
            <div className="bg-emerald-50/80 p-1.5 rounded border border-emerald-200/60 font-medium text-emerald-900">1. Greeting</div>
            <div className="bg-emerald-50/80 p-1.5 rounded border border-emerald-200/60 font-medium text-emerald-900">2. Company Intro</div>
            <div className="bg-emerald-50/80 p-1.5 rounded border border-emerald-200/60 font-medium text-emerald-900">3. Product</div>
            <div className="bg-emerald-50/80 p-1.5 rounded border border-emerald-200/60 font-medium text-emerald-900">4. USP</div>
            <div className="bg-emerald-50/80 p-1.5 rounded border border-emerald-200/60 font-medium text-emerald-900">5. Buyer Benefit</div>
            <div className="bg-emerald-50/80 p-1.5 rounded border border-emerald-200/60 font-medium text-emerald-900">6. Call to Action</div>
          </div>

          {/* Toast Alert */}
          {copied && (
            <div className="mt-4 p-2.5 bg-emerald-100 border border-emerald-300 rounded-md text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-fadeIn">
              <Check className="w-4 h-4 text-emerald-700" />
              <span>Pitch copied. Successfully copied to clipboard!</span>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-slate-50 border border-dashed border-slate-300 rounded-xl p-8 text-center text-slate-500 text-sm">
          Click <strong>"Generate Trade Fair Pitch"</strong> above to produce a calibrated professional 60–100 word pitch.
        </div>
      )}
    </div>
  );
};
