"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";

const sections = ["home", "about", "skills", "experience", "projects", "contact"];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { locale, t, toggleLanguage } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setMobileOpen(false);
    }
  };

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 navbar-blur bg-navy/70 dark:bg-navy/70 border-b border-white/5 dark:border-white/5"
      style={{
        backgroundColor:
          theme === "dark" ? "rgba(10, 14, 26, 0.7)" : "rgba(248, 250, 252, 0.85)",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <button
          onClick={() => scrollTo("home")}
          className="text-lg font-bold tracking-tight"
          style={{ color: theme === "dark" ? "#67e8f9" : "#0e7490" }}
        >
          &lt;Enes /&gt;
        </button>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1">
          {sections.map((s) => (
            <li key={s}>
              <button
                onClick={() => scrollTo(s)}
                className="px-3 py-2 text-base rounded-lg transition-colors duration-200"
                style={{
                  color: theme === "dark" ? "#cbd5e1" : "#334155",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor =
                    theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.07)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                }}
              >
                {t.nav[s]}
              </button>
            </li>
          ))}
        </ul>

        {/* Controls */}
        <div className="flex items-center gap-2">
          {/* Language toggle */}
          <button
            onClick={toggleLanguage}
            className="px-2 py-1 text-xs font-semibold rounded-md border transition-colors duration-200"
            style={{
              borderColor: theme === "dark" ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)",
              color: theme === "dark" ? "#e2e8f0" : "#334155",
            }}
          >
            {locale === "en" ? "TR" : "EN"}
          </button>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg transition-colors duration-200"
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor =
                theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.07)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
            }}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg"
            aria-label="Toggle menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={theme === "dark" ? "#e2e8f0" : "#334155"} strokeWidth="2" strokeLinecap="round">
              {mobileOpen ? (
                <>
                  <path d="M18 6L6 18" />
                  <path d="M6 6l12 12" />
                </>
              ) : (
                <>
                  <path d="M3 6h18" />
                  <path d="M3 12h18" />
                  <path d="M3 18h18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/5 overflow-hidden"
            style={{
              backgroundColor:
                theme === "dark" ? "rgba(10, 14, 26, 0.95)" : "rgba(248, 250, 252, 0.95)",
            }}
          >
            <div className="px-4 py-3 flex flex-col gap-1">
              {sections.map((s) => (
                <button
                  key={s}
                  onClick={() => scrollTo(s)}
                  className="text-left px-3 py-2 text-base rounded-lg transition-colors duration-200"
                  style={{ color: theme === "dark" ? "#cbd5e1" : "#334155" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor =
                      theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.07)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                  }}
                >
                  {t.nav[s]}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
