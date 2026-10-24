import en from "@/locales/en.json";
import tr from "@/locales/tr.json";

export const locales = ["en", "tr"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";
export const LOCALE_COOKIE = "NEXT_LOCALE";

export const SITE_URL = "https://enesaksoy.com";

export const dictionaries = { en, tr };

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
