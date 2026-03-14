"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

interface Skill {
  name: string;
  level: number;
  color: string;
}

const skillData: Record<string, Skill[]> = {
  backend: [
    { name: ".NET", level: 92, color: "#512bd4" },
    { name: "REST APIs", level: 90, color: "#0891b2" },
    { name: "Node.js", level: 75, color: "#339933" },
  ],
  frontend: [
    { name: "JavaScript", level: 90, color: "#f7df1e" },
    { name: "React", level: 78, color: "#61dafb" },
    { name: "Vue", level: 70, color: "#4fc08d" },
  ],
  databases: [
    { name: "MySQL", level: 93, color: "#4479a1" },
    { name: "MongoDB", level: 88, color: "#47a248" },
    { name: "MSSQL", level: 82, color: "#cc2927" },
    { name: "PostgreSQL", level: 75, color: "#4169e1" },
  ],
  tools: [
    { name: "Git", level: 90, color: "#f05032" },
    { name: "Docker", level: 78, color: "#2496ed" },
    { name: "Swagger", level: 88, color: "#85ea2d" },
  ],
};

function SkillBar({ skill, delay, isInView }: { skill: Skill; delay: number; isInView: boolean }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay, duration: 0.4 }}
      className="mb-4"
    >
      <div className="flex justify-between items-center mb-1.5">
        <span
          className="text-sm font-medium"
          style={{ color: isDark ? "#e2e8f0" : "#1e293b" }}
        >
          {skill.name}
        </span>
        <span
          className="text-xs"
          style={{ color: isDark ? "#94a3b8" : "#64748b" }}
        >
          {skill.level}%
        </span>
      </div>
      <div
        className="h-2 rounded-full overflow-hidden"
        style={{
          backgroundColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
        }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{ delay: delay + 0.2, duration: 0.8, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, ${skill.color}, ${skill.color}cc)`,
            boxShadow: `0 0 8px ${skill.color}40`,
          }}
        />
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const categories = Object.keys(skillData) as Array<keyof typeof skillData>;

  return (
    <section id="skills" className="py-24 px-4">
      <div ref={ref} className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl font-bold text-center mb-4"
          style={{ color: isDark ? "#f1f5f9" : "#0f172a" }}
        >
          {t.skills.title}
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((cat, ci) => (
            <motion.div
              key={cat}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + ci * 0.1, duration: 0.5 }}
              className="glass-card rounded-xl p-6"
            >
              <h3
                className="text-lg font-semibold mb-5 flex items-center gap-2"
                style={{ color: isDark ? "#22d3ee" : "#0891b2" }}
              >
                {cat === "backend" && "⚙️"}
                {cat === "frontend" && "🖥️"}
                {cat === "databases" && "🗃️"}
                {cat === "tools" && "🔧"}
                {t.skills.categories[cat]}
              </h3>
              {skillData[cat].map((skill, si) => (
                <SkillBar
                  key={skill.name}
                  skill={skill}
                  delay={0.4 + ci * 0.1 + si * 0.1}
                  isInView={isInView}
                />
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
