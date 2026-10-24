"use client";

import { useLanguage } from "@/context/LanguageContext";
import { formatMonth } from "@/lib/dates";

// Date range in the sand tone used for time throughout the site
export default function Period({ start, end }: { start: string; end: string | null }) {
  const { locale, t } = useLanguage();

  return (
    <p className="shrink-0 text-[0.9375rem] tabular-nums text-sand">
      <time dateTime={start}>{formatMonth(start, locale)}</time>
      {" – "}
      {end ? (
        <time dateTime={end}>{formatMonth(end, locale)}</time>
      ) : (
        t.experience.present
      )}
    </p>
  );
}
