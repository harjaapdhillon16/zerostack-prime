import type { Metadata } from "next";
import { LegalSection, LegalShell, legalList } from "@/components/legal";
import { BRAND, CONTACT, LEGAL_UPDATED, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Refunds & Cancellation",
  description: `${BRAND.name}'s refund and cancellation policy: a full refund before scope sign-off, a fair pro-rata settlement after work begins, and a full refund if ${BRAND.parent} cannot deliver.`,
};

export default function RefundsPage() {
  return (
    <LegalShell title="Refunds & Cancellation" updated={LEGAL_UPDATED}>
      <LegalSection n="01" title="Before scope sign-off">
        <p>
          If you change your mind before the scope document is signed off, any
          amount you have paid is refunded in full. No questions, no deductions,
          no forms to justify yourself on. The money is back with you within 7
          business days.
        </p>
      </LegalSection>

      <LegalSection n="02" title="After the build starts">
        <p>
          Once the scope is signed and the build begins, the advance is paying
          for work already underway — engineers are assigned and the days are
          real. So a cancellation after the start works like this:
        </p>
        <ul className={legalList}>
          <li>
            You receive everything built to date — code, designs, documents, in
            whatever state they are in. It is your work product.
          </li>
          <li>
            We assess, fairly and in writing, how much of the advance the
            completed work has earned, and refund the unearned portion
            pro-rata.
          </li>
        </ul>
        <p>
          You will see the arithmetic, not just the answer. If you think the
          assessment is wrong, say so — we would rather argue it out than leave
          you feeling shortchanged.
        </p>
      </LegalSection>

      <LegalSection n="03" title="If we fail to deliver">
        <p>
          If we cannot deliver the locked scope, our first obligation is to fix
          that — at our cost, on an extended timeline, per the terms. But if we
          cannot remedy it within a reasonable extension, you get a full refund
          of everything you have paid. Not a credit, not a partial gesture —
          everything.
        </p>
      </LegalSection>

      <LegalSection n="04" title="The second half is different">
        <p>
          The second 50% is only ever invoiced at handover — after the finished
          build is in front of you, working. You never pay the balance for
          something you have not seen. That structural choice does most of the
          work of this policy: the half at risk is only ever the half that
          bought work in progress.
        </p>
      </LegalSection>

      <LegalSection n="05" title="How to request a refund">
        <p>
          Email <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> or
          message us on{" "}
          <a href={whatsappLink(`Hi ${BRAND.name} — I'd like to request a refund.`)}>
            WhatsApp at {CONTACT.phoneDisplay}
          </a>{" "}
          with your name and project. Two commitments from us:
        </p>
        <ul className={legalList}>
          <li>We acknowledge your request within 2 business days.</li>
          <li>
            We resolve it — refund issued, or a written assessment you can
            respond to — within 14 days.
          </li>
        </ul>
      </LegalSection>

      <LegalSection n="06" title="How refunds are paid">
        <p>
          Refunds go back the way the money came: the same UPI ID or bank
          account you paid from. We do not issue refunds to third parties, and
          we do not convert refunds into “credit” unless you ask for that in
          writing.
        </p>
      </LegalSection>
    </LegalShell>
  );
}
