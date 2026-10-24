"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function NotFound() {
  const { locale, t } = useLanguage();

  return (
    <main className="mx-auto flex min-h-svh max-w-5xl flex-col justify-center px-4 sm:px-6">
      <h1 className="font-serif text-[clamp(3rem,10vw,7rem)] font-semibold leading-none tracking-tight text-ink">
        404
      </h1>
      <p className="mt-6 max-w-md text-lg">{t.notFound.message}</p>
      <Link href={`/${locale}`} className="link mt-8 self-start">
        {t.notFound.home}
      </Link>
    </main>
  );
}
