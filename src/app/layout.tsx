import type { Metadata } from "next";
import { IBM_Plex_Sans, IBM_Plex_Sans_Condensed } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";

const plex = IBM_Plex_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  variable: "--font-plex",
});

const plexCondensed = IBM_Plex_Sans_Condensed({
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600"],
  variable: "--font-plex-condensed",
});

// Runs before paint so the saved or system theme applies without a flash
const themeScript = `(function(){try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark"){t=matchMedia("(prefers-color-scheme: light)").matches?"light":"dark"}document.documentElement.classList.toggle("dark",t==="dark")}catch(e){document.documentElement.classList.add("dark")}})()`;

export const metadata: Metadata = {
  metadataBase: new URL("https://enesaksoy.com"),
  title: "Enes | Backend Developer Portfolio",
  description:
    "Backend Developer focused on APIs, scalable systems, and modern web technologies.",
  keywords: [
    "Backend Developer",
    "API",
    ".NET",
    "Node.js",
    "Portfolio",
    "Enes",
  ],
  openGraph: {
    title: "Enes | Backend Developer Portfolio",
    description:
      "Backend Developer focused on APIs, scalable systems, and modern web technologies.",
    url: "https://enesaksoy.com",
    siteName: "Enes | Backend Developer Portfolio",
    images: [
      {
        url: "/og-image.jpg", // Fotoğrafını public klasörüne og-image.jpg adıyla koymalısın
        width: 1200,
        height: 630,
        alt: "Enes | Backend Developer Portfolio",
      },
    ],
    locale: "tr_TR",
    type: "website",
  },
  alternates: {
    canonical: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Enes | Backend Developer Portfolio",
    description:
      "Backend Developer focused on APIs, scalable systems, and modern web technologies.",
    images: ["/og-image.jpg"],
  },
  verification: {
    google: "yR-seIRg5BzVnUJFOVN5Jlq1wwv3oUxLP57Esarysjw",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${plex.variable} ${plexCondensed.variable} antialiased`}>
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-B7LXBDTPY0"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-B7LXBDTPY0');
            `,
          }}
        />
        <Providers>
          {children}
          <Analytics />
          <SpeedInsights />
        </Providers>
      </body>
    </html>
  );
}
