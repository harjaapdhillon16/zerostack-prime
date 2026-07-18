import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[80svh] items-center justify-center">
      <div className="shell py-32 text-center">
        <p className="daytag">Day NaN · route not found</p>
        <h1 className="text-display mt-6">
          <span className="numerals text-signal">404</span>
        </h1>
        <p className="text-lead mx-auto mt-6 max-w-md text-fg-muted">
          This page didn&apos;t survive review. The rest of the site passed QA — head back
          and try from there.
        </p>
        <div className="mt-10 flex justify-center gap-4">
          <ButtonLink href="/">Back to day 00</ButtonLink>
          <Link
            href="/contact"
            className="inline-flex h-11 items-center px-4 text-[0.9375rem] text-fg-muted transition-colors hover:text-fg"
          >
            Report it to a human →
          </Link>
        </div>
      </div>
    </div>
  );
}
