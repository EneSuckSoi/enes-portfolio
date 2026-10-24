"use client";

import { useLanguage } from "@/context/LanguageContext";
import Section from "./Section";

export default function About() {
  const { t } = useLanguage();

  return (
    <Section id="about" title={t.about.title}>
      <p className="text-lg leading-relaxed text-ink sm:text-xl sm:leading-relaxed">
        {t.about.description}
      </p>

      <dl className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2">
        {t.about.areas.map((area: { title: string; desc: string }) => (
          <div key={area.title} className="border-t border-line pt-4">
            <dt className="font-medium text-ink">{area.title}</dt>
            <dd className="mt-1.5 leading-relaxed text-muted">{area.desc}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
