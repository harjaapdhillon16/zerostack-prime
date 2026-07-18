import Link from "next/link";
import { BRAND, CONTACT, OFFER, whatsappLink } from "@/lib/site";
import { Logo } from "./logo";
import { ArrowIcon, ButtonLink, WhatsAppIcon } from "./ui/button";

const columns = [
  {
    title: "The offer",
    links: [
      { label: "How it works", href: "/how-it-works" },
      { label: "What ships", href: "/#ships" },
      { label: "Pricing", href: "/pricing" },
      { label: "Questions", href: "/#faq" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Selected work", href: "/work" },
      { label: "Contact", href: "/contact" },
      { label: BRAND.parent, href: BRAND.parentUrl },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy policy", href: "/privacy" },
      { label: "Terms of service", href: "/terms" },
      { label: "Refunds & cancellation", href: "/refunds" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-surface/40">
      <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-signal/40 to-transparent" />

      <div className="shell py-20 md:py-24">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_2fr]">
          <div>
            <Logo />
            <p className="text-lead mt-6 max-w-sm text-fg-muted">{BRAND.tagline}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={whatsappLink()}>
                <WhatsAppIcon />
                WhatsApp us
              </ButtonLink>
              <ButtonLink href={`tel:${CONTACT.phoneE164}`} variant="ghost">
                {CONTACT.phoneDisplay}
              </ButtonLink>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            {columns.map((col) => (
              <div key={col.title}>
                <h3 className="label">{col.title}</h3>
                <ul className="mt-5 space-y-3.5">
                  {col.links.map((link) => {
                    const external = link.href.startsWith("http");
                    return (
                      <li key={link.label}>
                        {external ? (
                          <a
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center gap-1.5 text-[0.9375rem] text-fg-muted transition-colors hover:text-fg"
                          >
                            {link.label}
                            <ArrowIcon className="size-3 -rotate-45" />
                          </a>
                        ) : (
                          <Link
                            href={link.href}
                            className="text-[0.9375rem] text-fg-muted transition-colors hover:text-fg"
                          >
                            {link.label}
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-5 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-fg-faint">
            © {new Date().getFullYear()} {BRAND.parent}. {CONTACT.location}.
          </p>
          <p className="text-xs font-medium text-fg-faint">
            {OFFER.days} days · {OFFER.priceINR} flat · you own the code
          </p>
        </div>
      </div>
    </footer>
  );
}
