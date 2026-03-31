import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

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
      <body className={`${inter.variable} antialiased`}>
        <Providers>
          {children}
          <Analytics />
          <SpeedInsights />
        </Providers>
      </body>
    </html>
  );
}
