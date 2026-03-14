"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";

interface ProjectCardProps {
  name: string;
  description: string | null;
  language: string | null;
  html_url: string;
  index: number;
}

const langColors: Record<string, string> = {
  "C#": "#178600",
  JavaScript: "#f7df1e",
  TypeScript: "#3178c6",
  Python: "#3572a5",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Java: "#b07219",
  Go: "#00add8",
  Rust: "#dea584",
  Vue: "#4fc08d",
  PHP: "#4f5d95",
};

export default function ProjectCard({
  name,
  description,
  language,
  html_url,
  index,
}: ProjectCardProps) {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const isDark = theme === "dark";
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ scale: 1.03, y: -4 }}
      className="glass-card rounded-xl p-6 flex flex-col justify-between transition-shadow duration-300"
      style={{
        boxShadow: isDark
          ? "0 4px 20px rgba(0, 0, 0, 0.3)"
          : "0 4px 20px rgba(0, 0, 0, 0.08)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = isDark
          ? "0 8px 40px rgba(34, 211, 238, 0.15), 0 4px 20px rgba(99, 102, 241, 0.1)"
          : "0 8px 40px rgba(8, 145, 178, 0.15)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = isDark
          ? "0 4px 20px rgba(0, 0, 0, 0.3)"
          : "0 4px 20px rgba(0, 0, 0, 0.08)";
      }}
    >
      <div>
        {/* Repo icon + name */}
        <div className="flex items-center gap-2 mb-3">
          <svg
            width="18"
            height="18"
            viewBox="0 0 16 16"
            fill={isDark ? "#94a3b8" : "#64748b"}
          >
            <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z" />
          </svg>
          <h3
            className="text-base font-semibold truncate"
            style={{ color: isDark ? "#e2e8f0" : "#0f172a" }}
          >
            {name}
          </h3>
        </div>

        {/* Description */}
        <p
          className="text-sm mb-4 line-clamp-2 min-h-[2.5rem]"
          style={{ color: isDark ? "#cbd5e1" : "#64748b" }}
        >
          {description || t.projects.noDescription}
        </p>
      </div>

      <div className="flex items-center justify-between mt-auto">
        {/* Language badge */}
        {language && (
          <div className="flex items-center gap-1.5">
            <span
              className="w-3 h-3 rounded-full"
              style={{
                backgroundColor: langColors[language] || "#6b7280",
              }}
            />
            <span
              className="text-xs"
              style={{ color: isDark ? "#cbd5e1" : "#64748b" }}
            >
              {language}
            </span>
          </div>
        )}

        {/* GitHub link */}
        <a
          href={html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-medium transition-colors duration-200"
          style={{ color: isDark ? "#22d3ee" : "#0891b2" }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.color = isDark
              ? "#67e8f9"
              : "#06b6d4";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.color = isDark
              ? "#22d3ee"
              : "#0891b2";
          }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
          {t.projects.viewOnGithub}
        </a>
      </div>
    </motion.div>
  );
}
