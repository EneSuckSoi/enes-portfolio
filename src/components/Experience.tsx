"use client";

import { useLanguage } from "@/context/LanguageContext";
import type { Locale } from "@/i18n";
import Section from "./Section";

interface Item {
  role: string;
  company: string;
  start: string;
  end: string | null;
  description: string;
  highlights: string[];
}

// Fixed month names keep server and browser output identical (Intl data can differ between them)
const MONTHS: Record<Locale, string[]> = {
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  tr: ["Oca", "Şub", "Mar", "Nis", "May", "Haz", "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara"],
};

function formatMonth(value: string, locale: Locale) {
  const [year, month] = value.split("-");
  return `${MONTHS[locale][Number(month) - 1]} ${year}`;
}

export default function Experience() {
  const { locale, t } = useLanguage();
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
        {groups.map((group) => (
          <div key={group.company}>
            <h3 className="font-display text-2xl font-medium tracking-tight text-ink sm:text-3xl">
              {group.company}
            </h3>

            <ol className="mt-8 border-l border-line">
              {group.roles.map((item) => {
                const current = item.end === null;
                return (
                  <li key={item.role} className="relative pb-12 pl-7 last:pb-0">
                    <span
                      aria-hidden="true"
                      className={`absolute -left-[5px] top-[0.55rem] h-[9px] w-[9px] rounded-full border ${
                        current ? "border-accent bg-accent" : "border-faint bg-bg"
                      }`}
                    />
                    <div className="flex flex-col gap-x-6 gap-y-0.5 sm:flex-row sm:items-baseline sm:justify-between">
                      <h4 className="text-lg font-medium text-ink">{item.role}</h4>
                      <p className="shrink-0 text-sm tabular-nums text-muted">
                        <time dateTime={item.start}>{formatMonth(item.start, locale)}</time>
                        {" – "}
                        {item.end ? (
                          <time dateTime={item.end}>{formatMonth(item.end, locale)}</time>
                        ) : (
                          <span className="text-accent">{t.experience.present}</span>
                        )}
                      </p>
                    </div>
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
