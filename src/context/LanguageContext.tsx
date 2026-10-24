"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
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

  // Restore the saved choice, otherwise follow the browser language
  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem("locale");
    } catch {}
    const initial = stored === "tr" || stored === "en"
      ? stored
      : navigator.language.toLowerCase().startsWith("tr") ? "tr" : "en";
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLocale(initial);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const toggleLanguage = useCallback(() => {
    setLocale((prev) => {
      const next = prev === "en" ? "tr" : "en";
      try {
        localStorage.setItem("locale", next);
      } catch {}
      return next;
    });
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
