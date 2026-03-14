"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import ProjectCard from "./ProjectCard";

interface Repo {
  id: number;
  name: string;
  description: string | null;
  language: string | null;
  html_url: string;
  stargazers_count: number;
  updated_at: string;
}

const REQUIRED_REPOS = ["BackendTask", "UserManagementAPI"];
const IGNORED_REPOS = ["EneSuckSoi", "Akbank-DL-Bootcamp-Project"];
const MAX_REPOS = 6;

export default function Projects() {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRepos() {
      try {
        const res = await fetch(
          "https://api.github.com/users/EneSuckSoi/repos?sort=updated&per_page=30"
        );
        if (!res.ok) throw new Error("Failed to fetch");
        const data: Repo[] = await res.json();

        // 1. Remove unwanted repos immediately
        const filteredData = data.filter(
          (r) => !IGNORED_REPOS.includes(r.name)
        );

        // 2. Extract and strictly sort required repos
        const required = REQUIRED_REPOS.map(
          (reqName) => filteredData.find((r) => r.name === reqName)
        ).filter((r): r is Repo => r !== undefined);

        // 3. Extract the remaining repos and sort them by recently updated
        const others = filteredData
          .filter((r) => !REQUIRED_REPOS.includes(r.name))
          .sort(
            (a, b) =>
              new Date(b.updated_at).getTime() -
              new Date(a.updated_at).getTime()
          );

        // Combine: strictly ordered required repos first, then the latest active repos
        const remainingSlots = MAX_REPOS - required.length;
        const combined = [...required, ...others.slice(0, remainingSlots)];
        
        setRepos(combined.slice(0, MAX_REPOS));
      } catch (err) {
        console.error("Failed to fetch repos:", err);
        // Fallback data
        setRepos([
          {
            id: 1,
            name: "UserManagementAPI",
            description: "User management REST API built with .NET",
            language: "C#",
            html_url: "https://github.com/EneSuckSoi/UserManagementAPI",
            stargazers_count: 0,
            updated_at: new Date().toISOString(),
          },
          {
            id: 2,
            name: "BackendTask",
            description: "Backend task management application",
            language: "C#",
            html_url: "https://github.com/EneSuckSoi/BackendTask",
            stargazers_count: 0,
            updated_at: new Date().toISOString(),
          },
        ]);
      } finally {
        setLoading(false);
      }
    }

    fetchRepos();
  }, []);

  return (
    <section id="projects" className="py-24 px-4">
      <div ref={ref} className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl font-bold text-center mb-4"
          style={{ color: isDark ? "#f1f5f9" : "#0f172a" }}
        >
          {t.projects.title}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="w-16 h-1 mx-auto mb-4 rounded-full"
          style={{
            background: "linear-gradient(90deg, #22d3ee, #6366f1)",
          }}
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-center mb-12 text-sm"
          style={{ color: isDark ? "#94a3b8" : "#64748b" }}
        >
          {t.projects.subtitle}
        </motion.p>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="glass-card rounded-xl p-6 animate-pulse"
                style={{ height: 180 }}
              >
                <div
                  className="h-4 rounded mb-3"
                  style={{
                    backgroundColor: isDark
                      ? "rgba(255,255,255,0.06)"
                      : "rgba(0,0,0,0.06)",
                    width: "60%",
                  }}
                />
                <div
                  className="h-3 rounded mb-2"
                  style={{
                    backgroundColor: isDark
                      ? "rgba(255,255,255,0.04)"
                      : "rgba(0,0,0,0.04)",
                    width: "100%",
                  }}
                />
                <div
                  className="h-3 rounded"
                  style={{
                    backgroundColor: isDark
                      ? "rgba(255,255,255,0.04)"
                      : "rgba(0,0,0,0.04)",
                    width: "80%",
                  }}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {repos.map((repo, i) => (
              <ProjectCard
                key={repo.id}
                name={repo.name}
                description={repo.description}
                language={repo.language}
                html_url={repo.html_url}
                index={i}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
