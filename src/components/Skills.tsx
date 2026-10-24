"use client";

import { useLanguage } from "@/context/LanguageContext";
import Section from "./Section";

// Proper names stay the same in both languages; translated groups come from the locale
const skillData: Record<string, string[] | null> = {
  languages: ["C", "C#", "Java", "JavaScript"],
  frameworks: ["ASP.NET", "Entity Framework", "MVC", "REST APIs"],
  databases: ["MySQL", "MongoDB", "MSSQL", "PostgreSQL"],
  enterprise: null,
  tools: ["Git", "Docker", "Jenkins", "Swagger"],
};

export default function Skills() {
  const { t } = useLanguage();

  return (
    <Section id="skills" title={t.skills.title}>
      <dl className="grid gap-x-12 gap-y-9 sm:grid-cols-2">
        {Object.entries(skillData).map(([category, skills]) => (
          <div key={category}>
            <dt className="text-lg font-semibold tracking-[-0.01em] text-accent">
              {t.skills.categories[category]}
            </dt>
            <dd className="mt-3">
              <ul className="flex flex-wrap gap-2">
                {(skills ?? t.skills.items[category]).map((skill: string) => (
                  <li
                    key={skill}
                    className="rounded-md border border-line bg-surface-2 px-2.5 py-1 text-[0.9375rem] text-ink"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
