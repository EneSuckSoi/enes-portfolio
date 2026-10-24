"use client";

import { useLanguage } from "@/context/LanguageContext";
import Section from "./Section";

interface Item {
  role: string;
  company: string;
  description: string;
  highlights: string[];
}

export default function Experience() {
  const { t } = useLanguage();
  const items: Item[] = t.experience.items;

  // Consecutive roles at the same company share one timeline, newest first
  const groups = items.reduce<{ company: string; roles: Item[] }[]>((acc, item) => {
    const last = acc[acc.length - 1];
    if (last?.company === item.company) last.roles.push(item);
    else acc.push({ company: item.company, roles: [item] });
    return acc;
  }, []);

  return (
    <Section id="experience" title={t.experience.title}>
      <div className="space-y-16">
        {groups.map((group, gi) => (
          <div key={group.company}>
            <h3 className="font-display text-2xl font-medium tracking-tight text-ink sm:text-3xl">
              {group.company}
            </h3>

            <ol className="mt-8 border-l border-line">
              {group.roles.map((item, ri) => {
                const current = gi === 0 && ri === 0;
                return (
                  <li key={item.role} className="relative pb-12 pl-7 last:pb-0">
                    <span
                      aria-hidden="true"
                      className={`absolute -left-[5px] top-[0.55rem] h-[9px] w-[9px] rounded-full border ${
                        current ? "border-accent bg-accent" : "border-faint bg-bg"
                      }`}
                    />
                    <h4 className="text-lg font-medium text-ink">{item.role}</h4>
                    {current && (
                      <p className="mt-0.5 text-sm text-accent">{t.experience.current}</p>
                    )}
                    <p className="mt-3 leading-relaxed text-muted">{item.description}</p>
                    <ul className="mt-4 space-y-1.5 text-ink">
                      {item.highlights.map((h) => (
                        <li key={h} className="flex gap-3">
                          <span aria-hidden="true" className="mt-[0.7rem] h-px w-3 shrink-0 bg-faint" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </li>
                );
              })}
            </ol>
          </div>
        ))}
      </div>
    </Section>
  );
}
