"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { dictionaries, Locale, LOCALE_COOKIE } from "@/i18n";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface LanguageContextType {
  locale: Locale;
  t: any;
  otherLocale: Locale;
  rememberLocale: (locale: Locale) => void;
}

const LanguageContext = createContext<LanguageContextType>({
  locale: "en",
  t: dictionaries.en,
  otherLocale: "tr",
  rememberLocale: () => {},
});

// Saved so the proxy sends returning visitors at "/" to the language they chose
function rememberLocale(locale: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=31536000; samesite=lax`;
}

// The locale comes from the URL segment (/en or /tr), so pages are prerendered per language
export function LanguageProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  return (
    <LanguageContext.Provider
      value={{
        locale,
        t: dictionaries[locale],
        otherLocale: locale === "en" ? "tr" : "en",
        rememberLocale,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
