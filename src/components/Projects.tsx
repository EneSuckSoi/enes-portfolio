"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import Section from "./Section";

interface Repo {
  id: number;
  name: string;
  description: string | null;
  language: string | null;
  html_url: string;
  stargazers_count: number;
  updated_at: string;
}

const GITHUB_USER = "EneSuckSoi";
const REQUIRED_REPOS = ["BackendTask", "UserManagementAPI"];
const IGNORED_REPOS = ["EneSuckSoi", "Akbank-DL-Bootcamp-Project"];
const MAX_REPOS = 6;

const FALLBACK_REPOS: Repo[] = [
  {
    id: 1,
    name: "UserManagementAPI",
    description: "User management REST API built with .NET",
    language: "C#",
    html_url: `https://github.com/${GITHUB_USER}/UserManagementAPI`,
    stargazers_count: 0,
    updated_at: "",
  },
  {
    id: 2,
    name: "BackendTask",
    description: "Backend task management application",
    language: "C#",
    html_url: `https://github.com/${GITHUB_USER}/BackendTask`,
    stargazers_count: 0,
    updated_at: "",
  },
];

export default function Projects() {
  const { t } = useLanguage();
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRepos() {
      try {
        const res = await fetch(
          `https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=30`
        );
        if (!res.ok) throw new Error("Failed to fetch");
        const data: Repo[] = await res.json();

        const filtered = data.filter((r) => !IGNORED_REPOS.includes(r.name));

        // Required repos first, in the listed order, then the most recently updated
        const required = REQUIRED_REPOS.map((name) =>
          filtered.find((r) => r.name === name)
        ).filter((r): r is Repo => r !== undefined);

        const others = filtered
          .filter((r) => !REQUIRED_REPOS.includes(r.name))
          .sort(
            (a, b) =>
              new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
          );

        setRepos([...required, ...others].slice(0, MAX_REPOS));
      } catch (err) {
        console.error("Failed to fetch repos:", err);
        setRepos(FALLBACK_REPOS);
      } finally {
        setLoading(false);
      }
    }

    fetchRepos();
  }, []);

  return (
    <Section id="projects" title={t.projects.title}>
      <p className="mb-8 text-muted">{t.projects.subtitle}</p>

      <ul className="border-b border-line" aria-busy={loading}>
        {loading
          ? [0, 1, 2].map((i) => (
              <li key={i} className="border-t border-line py-6">
                <div className="h-4 w-1/3 animate-pulse rounded bg-line" />
                <div className="mt-3 h-3 w-2/3 animate-pulse rounded bg-line" />
              </li>
            ))
          : repos.map((repo) => (
              <li key={repo.id} className="border-t border-line">
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group grid gap-x-6 gap-y-1.5 py-5 sm:grid-cols-[1fr_auto]"
                >
                  <span className="text-lg font-semibold text-ink transition-colors duration-150 group-hover:text-accent">
                    {repo.name}
                  </span>
                  {repo.language && (
                    <span className="justify-self-start rounded-md border border-line bg-surface-2 px-2 py-0.5 text-sm text-muted sm:justify-self-end">
                      {repo.language}
                    </span>
                  )}
                  <span className="max-w-3xl leading-relaxed sm:col-start-1">
                    {repo.description || t.projects.noDescription}
                  </span>
                </a>
              </li>
            ))}
      </ul>

      <a
        href={`https://github.com/${GITHUB_USER}?tab=repositories`}
        target="_blank"
        rel="noopener noreferrer"
        className="link mt-8 inline-block"
      >
        {t.projects.all}
      </a>
    </Section>
  );
}
