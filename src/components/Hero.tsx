"use client";

import { CSSProperties } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as CSSProperties;

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section
      id="home"
      className="mx-auto flex min-h-[88svh] max-w-5xl flex-col justify-end px-4 pb-16 pt-32 sm:px-6 sm:pb-24"
    >
      <Image
        src="/avatar.jpg"
        alt=""
        width={72}
        height={72}
        priority
        className="rise mb-8 h-16 w-16 rounded-full border border-line object-cover sm:h-[72px] sm:w-[72px]"
      />

      <h1
        className="rise font-serif text-[clamp(3.5rem,11vw,8rem)] font-semibold leading-[0.95] tracking-[-0.02em] text-ink"
        style={delay(80)}
      >
        {t.hero.name}
      </h1>

      <p
        className="rise mt-7 max-w-xl text-lg leading-relaxed text-body sm:text-xl"
        style={delay(220)}
      >
        {t.hero.subtitle}
      </p>

      <div className="rise mt-10 flex flex-wrap gap-x-8 gap-y-3 text-base" style={delay(340)}>
        <a href="#projects" className="link">
          {t.hero.viewProjects}
        </a>
        <a href="#contact" className="link">
          {t.hero.contactMe}
        </a>
      </div>
    </section>
  );
}
