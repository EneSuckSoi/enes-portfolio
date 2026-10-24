import { NextRequest, NextResponse } from "next/server";
import { defaultLocale, isLocale, LOCALE_COOKIE, Locale } from "@/i18n";

// Pick the visitor's language: saved choice first, then Accept-Language
function preferredLocale(req: NextRequest): Locale {
  const saved = req.cookies.get(LOCALE_COOKIE)?.value;
  if (saved && isLocale(saved)) return saved;

  const accepted = (req.headers.get("accept-language") ?? "")
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { lang: tag.slice(0, 2).toLowerCase(), q: q ? Number(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);

  return accepted.find((a) => isLocale(a.lang))?.lang as Locale ?? defaultLocale;
}

export function proxy(req: NextRequest) {
  const { pathname, search } = req.nextUrl;
  const first = pathname.split("/")[1];
  if (isLocale(first)) return;

  const url = new URL(`/${preferredLocale(req)}${pathname === "/" ? "" : pathname}${search}`, req.url);
  return NextResponse.redirect(url);
}

export const config = {
  // Skip Next internals and any path with a file extension (icons, PDF, robots.txt, sitemap.xml)
  matcher: ["/((?!_next|_vercel|.*\\..*).*)"],
};
