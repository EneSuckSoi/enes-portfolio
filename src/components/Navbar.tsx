"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";

const sections = ["about", "skills", "experience", "education", "projects", "contact"];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { t, otherLocale, rememberLocale } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mark the section that crosses the middle of the viewport as current
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );
    for (const id of ["home", ...sections]) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  const otherTheme = theme === "dark" ? "light" : "dark";
  const themeLabel = t.nav.switchTheme.replace("{theme}", t.nav[otherTheme].toLowerCase());

  const linkClass = (s: string) =>
    `transition-colors duration-150 hover:text-ink ${active === s ? "text-ink" : "text-muted"}`;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b backdrop-blur-md transition-colors duration-200 ${
        scrolled || mobileOpen
          ? "border-line bg-[color-mix(in_srgb,var(--bg)_78%,transparent)]"
          : "border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
        <a href="#home" className="text-lg font-semibold tracking-[-0.02em] text-ink">
          {t.hero.name}
        </a>

        <ul className="hidden items-center gap-6 text-[0.95rem] lg:flex">
          {sections.map((s) => (
            <li key={s}>
              <a
                href={`#${s}`}
                className={linkClass(s)}
                aria-current={active === s ? "true" : undefined}
              >
                {t.nav[s]}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-5 text-sm text-muted">
          <Link
            href={`/${otherLocale}`}
            // Same page in the other language: keep the reader where they are
            scroll={false}
            hrefLang={otherLocale}
            lang={otherLocale}
            onClick={() => rememberLocale(otherLocale)}
            className="transition-colors duration-150 hover:text-ink"
            aria-label={t.nav.language}
          >
            {otherLocale.toUpperCase()}
          </Link>
          <button
            onClick={toggleTheme}
            className="transition-colors duration-150 hover:text-ink"
            aria-label={themeLabel}
            title={themeLabel}
          >
            {t.nav[otherTheme]}
          </button>
          <button
            onClick={() => setMobileOpen((o) => !o)}
            className="text-ink lg:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            {mobileOpen ? t.nav.close : t.nav.menu}
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        className={`grid transition-[grid-template-rows] duration-200 lg:hidden ${
          mobileOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <ul className="overflow-hidden px-4 sm:px-6" inert={!mobileOpen}>
          {sections.map((s) => (
            <li key={s} className="border-t border-line first:border-t-0">
              <a
                href={`#${s}`}
                onClick={() => setMobileOpen(false)}
                className={`block py-3 text-lg ${linkClass(s)}`}
              >
                {t.nav[s]}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
