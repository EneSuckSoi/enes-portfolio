"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

export default function Experience() {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="experience" className="py-24 px-4">
      <div ref={ref} className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl font-bold text-center mb-4"
          style={{ color: isDark ? "#f1f5f9" : "#0f172a" }}
        >
          {t.experience.title}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="w-16 h-1 mx-auto mb-12 rounded-full"
          style={{
            background: "linear-gradient(90deg, #22d3ee, #6366f1)",
          }}
        />

        <div className="relative">
          {/* Timeline line */}
          <div
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px"
            style={{
              backgroundColor: isDark
                ? "rgba(255,255,255,0.08)"
                : "rgba(0,0,0,0.08)",
            }}
          />

          {t.experience.items.map(
            (
              item: {
                role: string;
                description: string;
                highlights: string[];
              },
              i: number
            ) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.2, duration: 0.6 }}
                className={`relative mb-12 md:w-1/2 ${
                  i % 2 === 0
                    ? "md:pr-12 ml-12 md:ml-0"
                    : "md:pl-12 md:ml-auto ml-12"
                }`}
              >
                {/* Timeline dot (desktop) */}
                <div
                  className="absolute w-3 h-3 rounded-full top-6 hidden md:block"
                  style={{
                    ...(i % 2 === 0
                      ? { right: "-6px" }
                      : { left: "-6px" }),
                    background: "linear-gradient(135deg, #22d3ee, #6366f1)",
                    boxShadow: "0 0 12px rgba(34, 211, 238, 0.4)",
                  }}
                />
                {/* Mobile dot */}
                <div
                  className="absolute w-3 h-3 rounded-full top-6 md:hidden"
                  style={{
                    left: "-30px",
                    background: "linear-gradient(135deg, #22d3ee, #6366f1)",
                    boxShadow: "0 0 12px rgba(34, 211, 238, 0.4)",
                  }}
                />

                <div className="glass-card rounded-xl p-6 transition-all duration-300 hover:scale-[1.02]">
                  <h3
                    className="text-lg font-semibold mb-2"
                    style={{ color: isDark ? "#22d3ee" : "#0891b2" }}
                  >
                    {item.role}
                  </h3>
                  <p
                    className="text-sm mb-4 leading-relaxed"
                    style={{ color: isDark ? "#cbd5e1" : "#64748b" }}
                  >
                    {item.description}
                  </p>
                  <ul className="space-y-2">
                    {item.highlights.map((h: string, hi: number) => (
                      <li
                        key={hi}
                        className="flex items-start gap-2 text-sm"
                        style={{ color: isDark ? "#cbd5e1" : "#475569" }}
                      >
                        <span
                          className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                          style={{
                            background:
                              "linear-gradient(135deg, #22d3ee, #6366f1)",
                          }}
                        />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
