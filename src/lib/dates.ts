import type { Locale } from "@/i18n";

// Fixed month names keep server and browser output identical (Intl data can differ between them)
const MONTHS: Record<Locale, string[]> = {
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  tr: ["Oca", "Şub", "Mar", "Nis", "May", "Haz", "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara"],
};

// "2025-03" → "Mar 2025"
export function formatMonth(value: string, locale: Locale) {
  const [year, month] = value.split("-");
  return `${MONTHS[locale][Number(month) - 1]} ${year}`;
}
