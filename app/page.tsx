import { BRAND, CONTACT, FAQ, OFFER } from "@/lib/site";
import { Hero } from "@/components/sections/hero";
import { Telemetry } from "@/components/sections/telemetry";
import { Scope } from "@/components/sections/scope";
import { Pipeline } from "@/components/sections/pipeline";
import { Stack } from "@/components/sections/stack";
import { Timeline } from "@/components/sections/timeline";
import { Ships } from "@/components/sections/ships";
import { QualityGates } from "@/components/sections/gates";
import { Receipt } from "@/components/sections/receipt";
import { Faq } from "@/components/sections/faq";
import { Cta } from "@/components/sections/cta";
import { Rule } from "@/components/ui/section";

/** Service + FAQ structured data for search engines. */
function JsonLd() {
  const data = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: `${BRAND.name} — 30-day product build`,
      provider: {
        "@type": "Organization",
        name: BRAND.parent,
        url: BRAND.parentUrl,
        telephone: CONTACT.phoneE164,
        address: { "@type": "PostalAddress", addressRegion: CONTACT.location, addressCountry: "IN" },
      },
      description: `A production mobile app, admin panel, Node.js API, and PostgreSQL database delivered in ${OFFER.days} days for a flat ${OFFER.priceINR}.`,
      offers: {
        "@type": "Offer",
        price: "50000",
        priceCurrency: OFFER.currency,
      },
      areaServed: "IN",
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQ.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function HomePage() {
  return (
    <>
      <JsonLd />
      <Hero />
      <Telemetry />
      <Scope />
      <Rule />
      <Pipeline />
      <Stack />
      <Timeline />
      <Rule />
      <Ships />
      <QualityGates />
      <Receipt />
      <Faq />
      <Rule />
      <Cta />
    </>
  );
}
