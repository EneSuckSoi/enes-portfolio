"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";
import en from "@/locales/en.json";
import tr from "@/locales/tr.json";

type Locale = "en" | "tr";

/* eslint-disable @typescript-eslint/no-explicit-any */
const translations: Record<Locale, any> = { en, tr };

interface LanguageContextType {
  locale: Locale;
  t: any;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType>({
  locale: "en",
  t: en,
  toggleLanguage: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en");

  const toggleLanguage = useCallback(() => {
    setLocale((prev) => (prev === "en" ? "tr" : "en"));
  }, []);

  return (
    <LanguageContext.Provider
      value={{ locale, t: translations[locale], toggleLanguage }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
