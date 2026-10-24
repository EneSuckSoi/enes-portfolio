"use client";

import { useLanguage } from "@/context/LanguageContext";
import Section from "./Section";
import Period from "./Period";

interface Item {
  role: string;
  company: string;
  start: string;
  end: string | null;
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
      <div className="space-y-14">
        {groups.map((group) => (
          <div key={group.company}>
            <h3 className="font-serif text-2xl font-semibold text-accent sm:text-[1.625rem]">
              {group.company}
            </h3>

            <ol className="mt-7 border-l-2 border-line">
              {group.roles.map((item) => {
                const current = item.end === null;
                return (
                  <li key={item.role} className="relative pb-12 pl-7 last:pb-0">
                    <span
                      aria-hidden="true"
                      className={`absolute -left-[7px] top-[0.45rem] h-3 w-3 rounded-full border-2 ${
                        current ? "border-accent bg-accent" : "border-muted bg-surface-2"
                      }`}
                    />
                    <div className="flex flex-col gap-x-6 gap-y-1 sm:flex-row sm:items-baseline sm:justify-between">
                      <h4 className="text-lg font-semibold text-ink">{item.role}</h4>
                      <Period start={item.start} end={item.end} />
                    </div>
                    <p className="mt-3 leading-relaxed">{item.description}</p>
                    <ul className="mt-4 space-y-2">
                      {item.highlights.map((h) => (
                        <li key={h} className="flex gap-3 leading-relaxed">
                          <span aria-hidden="true" className="mt-[0.8rem] h-px w-3 shrink-0 bg-muted" />
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
