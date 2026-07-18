import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Instrument_Sans, Inter } from "next/font/google";
import { BRAND, OFFER } from "@/lib/site";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { DayRail } from "@/components/day-rail";
import "./globals.css";

// Enterprise pairing: Instrument Sans (GT-America-class grotesk) carries the
// display voice, Inter carries body and UI. Mono survives only inside actual
// code artifacts — the terminal and the receipt.
const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

const title = `${BRAND.name} — your product, built and live in ${OFFER.days} days. From ${OFFER.priceFrom}.`;
const description = `${BRAND.lockup}: a production mobile app, admin panel, Node.js API, and PostgreSQL database — built by day ${OFFER.buildDays}, carried through App Store and Play Store release by day ${OFFER.days}. Fixed quote of ${OFFER.priceINR}, agreed at discovery. You own every line.`;

export const metadata: Metadata = {
  metadataBase: new URL(`https://${BRAND.domain}`),
  title: {
    default: title,
    template: `%s — ${BRAND.name}`,
  },
  description,
  applicationName: BRAND.name,
  keywords: [
    "MVP development India",
    "30 day app development",
    "fixed price app development",
    "React Native development India",
    "startup MVP agency",
    "build an app in 30 days",
  ],
  authors: [{ name: BRAND.parent, url: BRAND.parentUrl }],
  openGraph: {
    type: "website",
    title,
    description,
    siteName: BRAND.lockup,
    locale: "en_IN",
  },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#f7f8fa",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-IN"
      className={`${instrumentSans.variable} ${inter.variable} ${plexMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-signal focus:px-5 focus:py-2.5 focus:font-mono focus:text-sm focus:text-ink"
        >
          Skip to content
        </a>
        <SiteHeader />
        <DayRail />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
