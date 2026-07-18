import type { Metadata } from "next";
import Link from "next/link";
import { LegalSection, LegalShell, legalList } from "@/components/legal";
import { BRAND, CONTACT, LEGAL_UPDATED, OFFER, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `The terms governing a ${BRAND.name} fixed-price engagement with ${BRAND.parent}: payment, scope control, IP transfer, warranty, and liability.`,
};

export default function TermsPage() {
  return (
    <LegalShell title="Terms of Service" updated={LEGAL_UPDATED}>
      <LegalSection n="01" title="The agreement">
        <p>
          These terms, together with the scope document you sign off before we
          start, form the entire contract between you and {BRAND.parent} for a{" "}
          {BRAND.name} engagement. The scope document describes what we will
          build; these terms describe how we will work together.
        </p>
        <p>
          If the two ever conflict, the signed scope document prevails — it is
          the more specific promise, and the one you approved.
        </p>
      </LegalSection>

      <LegalSection n="02" title="The engagement">
        <p>
          A {BRAND.name} engagement is a {OFFER.days}-day, fixed-price build of
          the product described in your scope document — typically a mobile
          app, an admin panel, and a backend, delivered as working software
          with full source code.
        </p>
        <p>
          The {OFFER.days}-day count starts on the later of two events: the
          scope document is signed off, and the advance payment is received.
          Until both happen, the clock has not started.
        </p>
      </LegalSection>

      <LegalSection n="03" title="Payment">
        <p>
          The fee is {OFFER.priceINR}, in Indian Rupees, plus GST at the
          prevailing rate. A GST invoice is issued for every payment. It splits
          in two:
        </p>
        <ul className={legalList}>
          <li>50% at scope sign-off — this starts the build.</li>
          <li>
            50% at handover — invoiced only once the finished build is in front
            of you.
          </li>
        </ul>
        <p>
          Payment is by bank transfer or UPI. If the second payment is late,
          handover pauses where it stands: the code, credentials, and IP
          transfer described in section 06 complete on receipt of full payment.
        </p>
      </LegalSection>

      <LegalSection n="04" title="Scope and change control">
        <p>
          The scope is frozen at sign-off. That freeze is what makes a{" "}
          {OFFER.days}-day date and a fixed price honest — for both of us.
        </p>
        <p>
          New ideas mid-build are normal and welcome; they are quoted as
          follow-on sprints rather than folded into the running one. And the
          risk cuts both ways: if we miss day {OFFER.days} on the locked scope,
          we keep working at no additional charge until it is delivered.
        </p>
      </LegalSection>

      <LegalSection n="05" title="What we need from you">
        <p>A {OFFER.days}-day build needs three things from your side:</p>
        <ul className={legalList}>
          <li>
            Feedback within 48 hours at the review points marked in the scope
            document.
          </li>
          <li>
            A decision-maker we can actually reach — someone who can say yes or
            no without a committee.
          </li>
          <li>
            The third-party accounts the product needs — app store developer
            accounts, cloud hosting, SMS, email, and payment providers — opened
            in your name, with their running costs on your side.
          </li>
        </ul>
        <p>
          If a review or account is delayed on your side, the delivery date
          moves by the same number of days. Fair is fair.
        </p>
      </LegalSection>

      <LegalSection n="06" title="Intellectual property and ownership">
        <p>
          On receipt of full payment, all intellectual property in the
          deliverables — source code, designs, documentation, and everything
          else built for you — is assigned to you. Your repository, your cloud
          accounts, your product.
        </p>
        <p>
          We retain ownership of pre-existing internal tooling and generic
          libraries we bring to every build. Where any of it ships inside your
          product, you receive a perpetual, royalty-free licence to keep using
          it — you never owe us anything for code you already paid to receive.
        </p>
        <p>
          Unless we sign an NDA, either party may reference the engagement
          publicly — a name, a logo, a short description of what was built.
        </p>
      </LegalSection>

      <LegalSection n="07" title="Warranty and support">
        <p>
          Every build includes a {OFFER.days}-day bug-fix warranty after
          handover. If something the locked scope says should work does not, we
          fix it at no charge.
        </p>
        <p>The warranty covers defects against the locked scope. It excludes:</p>
        <ul className={legalList}>
          <li>New features — those are follow-on sprints.</li>
          <li>Outages or changes in third-party services.</li>
          <li>
            Code modified by you or anyone else after handover — once a line
            changes, we can no longer stand behind it.
          </li>
        </ul>
      </LegalSection>

      <LegalSection n="08" title="Liability">
        <p>
          We provide the service with reasonable skill and care. Beyond that,
          our total liability under an engagement is capped at the fees you
          have actually paid us for it.
        </p>
        <p>
          Neither party is liable to the other for indirect or consequential
          losses — lost profits, lost data, or business interruption — however
          they arise.
        </p>
      </LegalSection>

      <LegalSection n="09" title="Confidentiality">
        <p>
          Each of us keeps the other’s non-public information confidential and
          uses it only for the engagement. This covers your idea, your data,
          and your numbers on our side, and our internal methods and pricing on
          yours. The duty survives the end of the engagement.
        </p>
        <p>
          It does not cover information that is already public, that a party
          knew independently, or that a court or regulator compels disclosure
          of.
        </p>
      </LegalSection>

      <LegalSection n="10" title="Suspension and termination">
        <p>
          Before scope sign-off, either party may walk away for any reason, and
          anything you have paid is refunded in full.
        </p>
        <p>
          After the build starts, cancellation is handled under our{" "}
          <Link href="/refunds">Refunds &amp; Cancellation policy</Link> — you
          keep the work done to date, and any unearned portion of what you paid
          comes back to you. We may pause work for non-payment after giving you
          written notice.
        </p>
      </LegalSection>

      <LegalSection n="11" title="Force majeure">
        <p>
          Neither party is responsible for delay caused by events genuinely
          beyond its reasonable control — natural disasters, war, government
          orders, or widespread infrastructure failure. The timeline extends by
          the length of the disruption. If the disruption runs past 30 days,
          either party may end the engagement and settle under the Refunds
          &amp; Cancellation policy.
        </p>
      </LegalSection>

      <LegalSection n="12" title="Governing law">
        <p>
          These terms are governed by the laws of India. The courts of Punjab,
          India have exclusive jurisdiction over any dispute — though we would
          much rather resolve it over a call first.
        </p>
      </LegalSection>

      <LegalSection n="13" title="Contact">
        <p>
          Questions about these terms:{" "}
          <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> or{" "}
          <a href={whatsappLink(`Hi ${BRAND.name} — I have a question about your terms.`)}>
            WhatsApp at {CONTACT.phoneDisplay}
          </a>
          . We are reachable {CONTACT.hours}, from {CONTACT.location}.
        </p>
      </LegalSection>
    </LegalShell>
  );
}
