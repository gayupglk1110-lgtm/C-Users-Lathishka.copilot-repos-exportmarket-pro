/**
 * Currency and Numerical Formatters for EXPORTMARKET PRO
 * Strictly adheres to Indian numbering system formatting and international standards.
 */

export function formatINR(val: number, includeDecimals = false): string {
  if (!Number.isFinite(val)) return '₹0';
  const isNegative = val < 0;
  const absVal = Math.abs(val);
  
  const formatted = new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: includeDecimals ? 2 : 0,
    minimumFractionDigits: includeDecimals ? 2 : 0,
  }).format(absVal);

  return `${isNegative ? '-' : ''}₹${formatted}`;
}

export function formatUSD(val: number, includeDecimals = true): string {
  if (!Number.isFinite(val)) return '$0.00';
  const isNegative = val < 0;
  const absVal = Math.abs(val);

  const formatted = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: includeDecimals ? 2 : 0,
    minimumFractionDigits: includeDecimals ? 2 : 0,
  }).format(absVal);

  return `${isNegative ? '-' : ''}$${formatted}`;
}

export function formatForeignCurrency(val: number, currency: string): string {
  if (!Number.isFinite(val)) return '0';
  const symbols: Record<string, string> = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    JPY: '¥',
  };
  const sym = symbols[currency] || currency;
  const isJPY = currency === 'JPY';
  
  const formatted = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: isJPY ? 0 : 2,
    minimumFractionDigits: isJPY ? 0 : 2,
  }).format(val);

  return `${sym}${formatted}`;
}

export function formatPercent(val: number): string {
  if (!Number.isFinite(val)) return '0.00%';
  const sign = val > 0 ? '+' : '';
  return `${sign}${val.toFixed(2)}%`;
}

export function isValidPositiveNumber(val: unknown): boolean {
  if (typeof val === 'number') {
    return !Number.isNaN(val) && Number.isFinite(val) && val >= 0;
  }
  if (typeof val === 'string') {
    const trimmed = val.trim();
    if (trimmed === '') return false;
    const num = Number(trimmed);
    return !Number.isNaN(num) && Number.isFinite(num) && num >= 0;
  }
  return false;
}
