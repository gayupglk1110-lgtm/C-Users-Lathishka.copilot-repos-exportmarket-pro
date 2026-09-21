export interface ProductInfo {
  id: string;
  name: string;
  sector: string;
  hsCode: string;
  dataType: 'demo';
  description: string;
}

export interface CountryInfo {
  id: string;
  name: string;
  flag: string;
  currency: string;
  currencySymbol: string;
  region: string;
}

export interface MarketIndicatorValues {
  marketSize: number; // 0 - 100
  marketSizeLabel: string;
  demand: number; // 0 - 100
  demandLabel: string;
  importRequirement: number; // 0 - 100 (Compliance complexity)
  importRequirementLabel: string;
  tariffIndex: number; // 0 - 100 (Trade barrier indicator)
  tariffLabel: string;
  logistics: number; // 0 - 100 (Transit efficiency & ease)
  logisticsLabel: string;
  tradeFairRelevance: number; // 0 - 100
  tradeFairName: string;
  notes: string;
  dataType: 'demo';
}

export interface ProductCountryData {
  [productId: string]: {
    [countryName: string]: MarketIndicatorValues;
  };
}

export interface TradeFairTask {
  id: string;
  phase: 'before' | 'during' | 'after';
  title: string;
  description: string;
  completed: boolean;
}

export interface ExportChecklistItem {
  id: string;
  category: 'MARKET RESEARCH' | 'PRODUCT' | 'PRICING' | 'DOCUMENTATION' | 'LOGISTICS' | 'TRADE FAIR';
  title: string;
  description: string;
  completed: boolean;
}

export interface PitchInputs {
  companyName: string;
  product: string;
  targetCountry: string;
  targetBuyer: string;
  uniqueSellingPoint: string;
  sustainabilityFeature: string;
  priceValueProposition: string;
}

export type TabType = 
  | 'market-picker' 
  | 'rupee-watcher' 
  | 'revenue-simulator' 
  | 'trade-fair-coach' 
  | 'pitch-builder' 
  | 'export-checklist' 
  | 'sources';
