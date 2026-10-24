"use client";

import { useLanguage } from "@/context/LanguageContext";
import Section from "./Section";

const EMAIL = "enes.aksoy.15.ea@gmail.com";

const profiles = [
  { name: "GitHub", url: "https://github.com/EneSuckSoi" },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/enesucksoi/" },
];

export default function Contact() {
  const { t } = useLanguage();

  return (
    <Section id="contact" title={t.contact.title}>
      <p className="text-muted">{t.contact.subtitle}</p>

      <a
        href={`mailto:${EMAIL}`}
        className="link mt-6 inline-block break-all font-display text-[clamp(1.6rem,5vw,3rem)] font-medium leading-tight tracking-tight"
      >
        {EMAIL}
      </a>

      <ul className="mt-10 flex gap-8">
        {profiles.map((p) => (
          <li key={p.name}>
            <a href={p.url} target="_blank" rel="noopener noreferrer" className="link">
              {p.name}
            </a>
          </li>
        ))}
      </ul>
    </Section>
  );
}
