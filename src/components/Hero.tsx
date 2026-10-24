"use client";

import { CSSProperties } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as CSSProperties;

export default function Hero() {
  const { t } = useLanguage();

  return (
    // Centred in the first screen; the extra bottom padding lifts the block slightly above the middle
    <section
      id="home"
      className="mx-auto flex min-h-[min(100svh,64rem)] max-w-5xl flex-col justify-center px-4 pb-24 pt-28 sm:px-6 sm:pb-32"
    >
      <Image
        src="/avatar.jpg"
        alt=""
        width={128}
        height={128}
        priority
        className="rise h-24 w-24 rounded-full object-cover ring-1 ring-line ring-offset-4 ring-offset-bg sm:h-32 sm:w-32"
      />

      <h1
        className="rise mt-9 text-[clamp(3.25rem,9.5vw,7.25rem)] font-semibold leading-[0.92] tracking-[-0.045em] text-ink"
        style={delay(80)}
      >
        {t.hero.name}
      </h1>

      <p
        className="rise mt-7 max-w-xl text-lg leading-relaxed text-body sm:text-xl sm:leading-relaxed"
        style={delay(220)}
      >
        {t.hero.subtitle}
      </p>

      <div
        className="rise mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 text-base"
        style={delay(340)}
      >
        <a href="#projects" className="button">
          {t.hero.viewProjects}
        </a>
        <a href="#contact" className="link">
          {t.hero.contactMe}
        </a>
      </div>
    </section>
  );
}
