"use client";

import { useLanguage } from "@/context/LanguageContext";
import Section from "./Section";

const skillData: Record<string, string[]> = {
  backend: [".NET", "REST APIs", "Node.js"],
  frontend: ["JavaScript", "React", "Vue"],
  databases: ["MySQL", "MongoDB", "MSSQL", "PostgreSQL"],
  tools: ["Git", "Docker", "Swagger"],
};

export default function Skills() {
  const { t } = useLanguage();

  return (
    <Section id="skills" title={t.skills.title}>
      <dl className="border-b border-line">
        {Object.entries(skillData).map(([category, skills]) => (
          <div
            key={category}
            className="grid gap-2 border-t border-line py-5 sm:grid-cols-[9rem_1fr] sm:gap-6"
          >
            <dt className="text-muted">{t.skills.categories[category]}</dt>
            <dd>
              <ul className="flex flex-wrap gap-x-6 gap-y-1.5 text-lg text-ink">
                {skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
