"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

const focusIcons = ["⚙️", "🔗", "🗃️", "🚀"];

export default function About() {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" className="py-24 px-4">
      <div ref={ref} className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl font-bold text-center mb-4"
          style={{ color: isDark ? "#f1f5f9" : "#0f172a" }}
        >
          {t.about.title}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="w-16 h-1 mx-auto mb-8 rounded-full"
          style={{
            background: "linear-gradient(90deg, #22d3ee, #6366f1)",
          }}
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-12 text-base leading-relaxed"
          style={{ color: isDark ? "#cbd5e1" : "#64748b" }}
        >
          {t.about.description}
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {t.about.areas.map(
            (area: { title: string; desc: string }, i: number) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                className="glass-card rounded-xl p-6 transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="text-2xl mb-3">{focusIcons[i]}</div>
                <h3
                  className="text-lg font-semibold mb-2"
                  style={{ color: isDark ? "#e2e8f0" : "#0f172a" }}
                >
                  {area.title}
                </h3>
                <p
                  className="text-sm"
                  style={{ color: isDark ? "#cbd5e1" : "#64748b" }}
                >
                  {area.desc}
                </p>
              </motion.div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
