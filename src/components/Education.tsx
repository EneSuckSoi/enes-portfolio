"use client";

import { useLanguage } from "@/context/LanguageContext";
import Section from "./Section";
import Period from "./Period";

interface Item {
  school: string;
  degree: string;
  start: string;
  end: string | null;
  gpa?: string;
}

export default function Education() {
  const { t } = useLanguage();
  const items: Item[] = t.education.items;

  return (
    <Section id="education" title={t.education.title}>
      <ul className="space-y-10">
        {items.map((item) => (
          <li key={item.school}>
            <h3 className="text-xl font-semibold tracking-[-0.015em] text-accent sm:text-2xl">
              {item.school}
            </h3>
            <div className="mt-3 flex flex-col gap-x-6 gap-y-1 sm:flex-row sm:items-baseline sm:justify-between">
              <h4 className="text-lg font-semibold text-ink">{item.degree}</h4>
              <Period start={item.start} end={item.end} />
            </div>
            {item.gpa && (
              <p className="mt-2 text-muted">
                {t.education.gpa}: <span className="tabular-nums text-body">{item.gpa}</span>
              </p>
            )}
          </li>
        ))}
      </ul>
    </Section>
  );
}
