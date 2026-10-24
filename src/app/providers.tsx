"use client";

import { ThemeProvider } from "@/context/ThemeContext";
import { LanguageProvider } from "@/context/LanguageContext";
import type { Locale } from "@/i18n";

export function Providers({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <LanguageProvider locale={locale}>{children}</LanguageProvider>
    </ThemeProvider>
  );
}
