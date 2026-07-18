import type { Metadata } from "next";
import { LegalSection, LegalShell, legalList } from "@/components/legal";
import { BRAND, CONTACT, LEGAL_UPDATED } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${BRAND.parent} collects, uses, and protects personal data across the ${BRAND.name} site and enquiry channels, under India's DPDP Act, 2023.`,
};

const formHost = CONTACT.formUrl.replace("https://", "");

export default function PrivacyPage() {
  return (
    <LegalShell title="Privacy Policy" updated={LEGAL_UPDATED}>
      <LegalSection n="01" title="Who we are">
        <p>
          {BRAND.parent} is a software company based in {CONTACT.location}.{" "}
          {BRAND.name} is our fixed-price build programme — it is a product line,
          not a separate company, so {BRAND.parent} is the legal entity behind
          everything on this site.
        </p>
        <p>
          Under India’s Digital Personal Data Protection Act, 2023 (the “DPDP
          Act”), {BRAND.parent} is the data fiduciary for the personal data this
          policy describes. If anything here is unclear, write to{" "}
          <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> or call{" "}
          <a href={`tel:${CONTACT.phoneE164}`}>{CONTACT.phoneDisplay}</a> — a
          person answers, not a queue.
        </p>
      </LegalSection>

      <LegalSection n="02" title="What we collect">
        <p>We collect what you give us, and very little else:</p>
        <ul className={legalList}>
          <li>
            Your name, phone number, email address, and company name when you
            get in touch.
          </li>
          <li>
            The project details you choose to share with us over WhatsApp,
            phone, email, or the enquiry form at{" "}
            <a href={CONTACT.formUrl}>{formHost}</a>.
          </li>
          <li>
            Basic, privacy-respecting site analytics — aggregate page counts
            that tell us which pages are read. No individual profiles are built
            from them.
          </li>
        </ul>
        <p>
          We run no advertising trackers, and we do not sell or rent personal
          data to anyone. Ever.
        </p>
      </LegalSection>

      <LegalSection n="03" title="Why we process it">
        <p>We use personal data for four things:</p>
        <ul className={legalList}>
          <li>Responding to your enquiry.</li>
          <li>Scoping and delivering an engagement if you go ahead.</li>
          <li>Invoicing, accounting, and GST compliance.</li>
          <li>Improving this site, using the aggregate analytics above.</li>
        </ul>
        <p>That is the whole list. There is no fifth purpose.</p>
      </LegalSection>

      <LegalSection n="04" title="Legal basis and consent">
        <p>
          When you contact us, you consent to us processing your details to
          respond. If we start an engagement together, we process what the
          contract needs — names on documents, invoices, payment records — and
          what tax law obliges us to keep.
        </p>
        <p>
          You can withdraw consent at any time by emailing{" "}
          <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>. We will stop
          processing and delete your data, except where Indian law requires us
          to retain a record (invoices, for instance).
        </p>
      </LegalSection>

      <LegalSection n="05" title="Where it lives and who touches it">
        <p>
          Your data sits with a small set of service providers acting on our
          instructions: our website hosting provider, our email provider, and
          WhatsApp Business for chat conversations. Each receives only what it
          needs to do its job.
        </p>
        <p>
          Beyond those processors, personal data is not transferred outside
          India and is not shared with anyone else — unless a law or a court
          order requires it, in which case we will comply and, where lawful,
          tell you.
        </p>
      </LegalSection>

      <LegalSection n="06" title="How long we keep it">
        <ul className={legalList}>
          <li>
            Enquiries that do not become engagements: deleted within 24 months
            of our last exchange.
          </li>
          <li>
            Contracts, invoices, and payment records: kept for as long as
            Indian tax and company law requires, then deleted.
          </li>
          <li>
            Site analytics: aggregate from the start, so there is nothing
            personal to delete.
          </li>
        </ul>
      </LegalSection>

      <LegalSection n="07" title="Your rights under the DPDP Act">
        <p>You have the right to:</p>
        <ul className={legalList}>
          <li>Access a copy of the personal data we hold about you.</li>
          <li>Have it corrected or completed.</li>
          <li>Have it erased, subject to legal retention duties.</li>
          <li>Grievance redressal.</li>
          <li>Withdraw consent at any time, as easily as you gave it.</li>
        </ul>
        <p>
          To exercise any of these, email our Grievance Officer at{" "}
          <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> with the
          subject line “DPDP request”. We respond within 30 days. If you are
          not satisfied with our answer, you may escalate to the Data
          Protection Board of India.
        </p>
      </LegalSection>

      <LegalSection n="08" title="Client project data">
        <p>
          The apps we build hold our clients’ data and their users’ data. That
          data belongs to the client — they are the data fiduciary for it, and
          their own privacy policy governs it, not this one.
        </p>
        <p>
          Our rule during and after a build: we access production data only
          with the client’s explicit permission, only for the stated purpose,
          and every access is logged.
        </p>
      </LegalSection>

      <LegalSection n="09" title="Cookies">
        <p>
          This site uses essential cookies only — the minimum needed for it to
          function. No advertising cookies, no cross-site tracking. That is why
          you do not see a cookie banner: there is nothing to consent to.
        </p>
      </LegalSection>

      <LegalSection n="10" title="Children">
        <p>
          Our services are for businesses and founders, not children. We do not
          knowingly collect personal data from anyone under 18. If you believe
          a child has sent us data, email{" "}
          <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> and we will
          delete it.
        </p>
      </LegalSection>

      <LegalSection n="11" title="Changes to this policy">
        <p>
          When this policy changes, the new version is posted here with a fresh
          “last updated” date. If a change materially affects an active client,
          we will also email them directly rather than hope they re-read this
          page.
        </p>
      </LegalSection>
    </LegalShell>
  );
}
