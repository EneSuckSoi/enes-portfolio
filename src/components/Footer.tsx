"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-8 text-sm text-faint sm:px-6">
        <p>
          © {year} {t.hero.name}
        </p>
        <a href="#home" className="transition-colors duration-150 hover:text-ink">
          {t.footer.top}
        </a>
      </div>
    </footer>
  );
}
