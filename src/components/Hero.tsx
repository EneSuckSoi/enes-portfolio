"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

const techBubbles = [
  { name: "JavaScript", color: "#f7df1e", icon: "⚡", delay: 0, x: -35, y: -35 }, // Top-Left
  { name: "HTML/CSS", color: "#e34f26", icon: "🌐", delay: 0.3, x: 35, y: -35 },   // Top-Right
  { name: "Docker", color: "#2496ed", icon: "🐳", delay: 0.6, x: -35, y: 35 },   // Bottom-Left
  { name: "Development", color: "#61dafb", icon: "💻", delay: 0.9, x: 35, y: 35 }, // Bottom-Right
];

export default function Hero() {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
    >
      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-4xl mx-auto">
        {/* Avatar + Bubbles container */}
        <div className="relative mb-8 w-full max-w-[320px] sm:max-w-[500px] aspect-square">
          {/* Floating tech bubbles */}
          {techBubbles.map((bubble, i) => (
            <div
              key={bubble.name}
              className="absolute z-10"
              style={{
                left: `calc(50% + ${bubble.x}%)`,
                top: `calc(54% + ${bubble.y}%)`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + bubble.delay * 0.5, duration: 0.5, type: "spring" }}
                className="group cursor-default"
              >
                <motion.div
                  animate={{
                    y: [0, -50, 0], // Only animate up and down
                  }}
                  transition={{
                    duration: 2 + (i % 2),
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.3,
                  }}
                  className="relative flex items-center justify-center w-14 h-14 rounded-full text-2xl transition-all duration-300 hover:scale-110"
                  style={{
                    backgroundColor: isDark
                      ? `${bubble.color}25`
                      : `${bubble.color}18`,
                    border: `2px solid ${bubble.color}50`,
                    boxShadow: `0 0 16px ${bubble.color}30`,
                  }}
                  whileHover={{
                    boxShadow: `0 0 28px ${bubble.color}60`,
                  }}
                >
                  <span>{bubble.icon}</span>
                </motion.div>
              </motion.div>
            </div>
          ))}

          {/* Avatar */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
            >
              <div
                className="w-56 h-56 sm:w-80 sm:h-80 rounded-full overflow-hidden border-2 animate-pulse-glow"
                style={{
                  borderColor: isDark ? "#22d3ee" : "#0891b2",
                }}
              >
                <img
                  src="https://github.com/EneSuckSoi.png"
                  alt="Enes"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Text */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4"
          style={{ color: isDark ? "#f1f5f9" : "#0f172a" }}
        >
          {t.hero.greeting}{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #22d3ee, #6366f1)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {t.hero.name}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-base sm:text-lg max-w-xl mb-8"
          style={{ color: isDark ? "#94a3b8" : "#64748b" }}
        >
          {t.hero.subtitle}
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <button
            onClick={() => scrollTo("projects")}
            className="px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
            style={{
              background: "linear-gradient(135deg, #0891b2, #6366f1)",
              boxShadow: "0 4px 20px rgba(8, 145, 178, 0.3)",
            }}
          >
            {t.hero.viewProjects}
          </button>
          <button
            onClick={() => scrollTo("contact")}
            className="px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-105"
            style={{
              border: `1px solid ${isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)"}`,
              color: isDark ? "#e2e8f0" : "#334155",
              backgroundColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)",
            }}
          >
            {t.hero.contactMe}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
