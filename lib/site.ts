/**
 * Single source of truth for brand, offer, contact, and long-form content.
 * Every page reads from here; no string below is duplicated elsewhere.
 */

export const BRAND = {
  name: "ZeroStack",
  parent: "Prime Depth Labs",
  parentUrl: "https://www.primedepthlabs.com",
  lockup: "ZeroStack by Prime Depth Labs",
  tagline: "A real product. Thirty days. One fixed price.",
  domain: "primedepthlabs.com",
} as const;

export const OFFER = {
  /** Delivery window after discovery: product ready day 20, stores by day 30. */
  days: 30,
  buildDays: 20,
  /** Quote band — the exact figure is fixed in writing at the end of discovery. */
  priceINR: "₹50,000–₹1,00,000",
  priceFrom: "₹50,000",
  priceUSDApprox: "~$600–1,200",
  currency: "INR",
} as const;

export const CONTACT = {
  phoneDisplay: "+91 81468 51290",
  phoneE164: "+918146851290",
  whatsappNumber: "918146851290",
  email: "hello@primedepthlabs.com",
  formUrl: "https://form.primedepthlabs.com",
  location: "Punjab, India",
  hours: "Mon–Sat, 10:00–19:00 IST",
} as const;

export function whatsappLink(
  message = `Hi ${BRAND.name} — I want to build a product in ${OFFER.days} days. Can we talk?`,
) {
  return `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const NAV = [
  { label: "How it works", href: "/how-it-works" },
  { label: "What ships", href: "/#ships" },
  { label: "Pricing", href: "/pricing" },
  { label: "Work", href: "/work" },
  { label: "Contact", href: "/contact" },
] as const;

/* ------------------------------------------------------------------ */
/* The 30-day programme                                                */
/* ------------------------------------------------------------------ */

export const TIMELINE = [
  {
    phase: "Discovery · 3–4 days",
    title: "Discovery & consulting",
    kicker: "Before the clock starts",
    body:
      "Three to four days to understand the business — what you sell, who pays, and what the product has to prove. We consult on the right way to build it, write every screen, table, and endpoint into a scope document, and fix your quote. The 30-day clock starts only when you sign off.",
    outputs: ["Business deep-dive", "Solution consulting", "Screen-by-screen scope doc", "Fixed quote + fixed date"],
  },
  {
    phase: "Day 01–06",
    title: "Foundation",
    kicker: "The unglamorous half, done properly",
    body:
      "PostgreSQL schema and migrations, authentication, the role model, CI, and a staging environment. This is the half of a product nobody screenshots — and the half that decides whether month six is pleasant or miserable.",
    outputs: ["PostgreSQL + migrations", "Auth & roles", "Staging environment", "CI pipeline"],
  },
  {
    phase: "Day 07–16",
    title: "The build",
    kicker: "AI writes volume. Engineers own it.",
    body:
      "App, API, and admin panel are built in parallel. AI generates the repetitive mass — CRUD, forms, types, tests, migrations — and an engineer reviews every line before it merges. The speed comes from removing typing, not judgement.",
    outputs: ["React Native app", "Node.js API", "Admin panel", "Automated tests"],
  },
  {
    phase: "Day 17–20",
    title: "Hardening & QA",
    kicker: "Product ready by day 20",
    body:
      "Load tests, error states, offline behaviour, permission edge cases, and a manual QA pass on real devices. By day 20 the product is finished — built, tested, and demo-ready.",
    outputs: ["QA on real devices", "Load & error testing", "Security review", "Day-20 finished build"],
  },
  {
    phase: "Day 21–30",
    title: "Release management",
    kicker: "The stores take their time — we manage it",
    body:
      "Submission to the App Store and Play Store, review-cycle management, fixes for store feedback, production deployment, and handover. Apple and Google reviews are the one step nobody can rush — we budget for them honestly instead of pretending they don't exist.",
    outputs: ["App Store + Play Store submission", "Review-cycle management", "Production deploy", "Keys, code, walkthrough"],
  },
] as const;

/* ------------------------------------------------------------------ */
/* Deliverables                                                        */
/* ------------------------------------------------------------------ */

export const DELIVERABLES = [
  {
    title: "A mobile app",
    body:
      "React Native — one codebase, genuinely native on iOS and Android, submitted to both stores under your developer accounts.",
    meta: "iOS + Android",
  },
  {
    title: "An admin panel",
    body:
      "The piece agencies quote separately. Every user, record, and transaction — searchable, editable, exportable from your browser.",
    meta: "Web · role-based",
  },
  {
    title: "A real backend",
    body:
      "Node.js and PostgreSQL. Migrations, indexes, backups, and a documented API — not a no-code base that folds at ten thousand rows.",
    meta: "Node.js + PostgreSQL",
  },
  {
    title: "The source code",
    body:
      "Your repository, your cloud account, your data. Handed over on day 30 with commit history intact. Walk away whenever you like.",
    meta: "Owned, not licensed",
  },
  {
    title: "Deployment",
    body:
      "Production and staging infrastructure, CI, monitoring, and error tracking — configured and running before handover, not left as homework.",
    meta: "Live, not a demo",
  },
  {
    title: "Documentation",
    body:
      "Architecture notes, environment setup, and a recorded walkthrough. Any competent developer can pick it up without calling us.",
    meta: "Written for your next hire",
  },
] as const;

/* ------------------------------------------------------------------ */
/* Stack                                                               */
/* ------------------------------------------------------------------ */

export const STACK = [
  { name: "React Native", role: "The app", note: "One codebase, both stores" },
  { name: "React", role: "The admin panel", note: "Run the business from a browser" },
  { name: "Node.js", role: "The API", note: "Typed, tested, documented" },
  { name: "PostgreSQL", role: "The data", note: "Relational, indexed, backed up" },
  { name: "TypeScript", role: "Everywhere", note: "No untyped seams, end to end" },
  { name: "AI copilots", role: "Throughput", note: "Volume code, human-reviewed" },
] as const;

/* ------------------------------------------------------------------ */
/* Quality gates                                                       */
/* ------------------------------------------------------------------ */

export const GATES = [
  {
    n: "01",
    title: "Every line is reviewed by a human",
    body:
      "AI writes a large share of the code. An engineer reads all of it before merge. Nothing reaches your repository because a model felt confident about it.",
  },
  {
    n: "02",
    title: "Tests gate every commit",
    body:
      "Type checks, unit tests, and integration tests run in CI. A red build cannot deploy — including when we are the ones in a hurry on day 29.",
  },
  {
    n: "03",
    title: "Tested on real devices",
    body:
      "Not a simulator on a fast Mac. Mid-range Android, older iPhones, bad networks — the conditions your actual users live in.",
  },
  {
    n: "04",
    title: "Security review before handover",
    body:
      "Auth flows, permission boundaries, injection surfaces, secret handling, dependency audit. Documented, with anything outstanding disclosed in writing.",
  },
] as const;

/* ------------------------------------------------------------------ */
/* Pricing                                                             */
/* ------------------------------------------------------------------ */

/** Line items printed on the receipt. */
export const RECEIPT = [
  { item: "Scope + architecture + schema design", code: "SCOPE" },
  { item: "React Native app (iOS + Android)", code: "APP" },
  { item: "Admin panel, role-based", code: "ADMIN" },
  { item: "Node.js API + documentation", code: "API" },
  { item: "PostgreSQL, migrations, backups", code: "DB" },
  { item: "Test suite + CI pipeline", code: "CI" },
  { item: "Production + staging deploy", code: "INFRA" },
  { item: "QA pass on real devices", code: "QA" },
  { item: "Security review", code: "SEC" },
  { item: "Store submission", code: "SHIP" },
  { item: "Source + infra handover", code: "KEYS" },
  { item: "30 days post-launch bug support", code: "CARE" },
] as const;

export const NOT_INCLUDED = [
  {
    item: "Third-party running costs",
    detail:
      "Cloud hosting, store developer accounts, SMS/email providers, payment gateway fees. Billed to your own accounts — typically ₹2,000–8,000 a month early on.",
  },
  {
    item: "Scope added mid-build",
    detail:
      "New features after scope lock go into a follow-on sprint, quoted separately. This rule is what protects your delivery date, not just ours.",
  },
  {
    item: "Ongoing feature development",
    detail:
      "The fee covers the build and 30 days of bug support. Continued development is a separate monthly arrangement — entirely optional.",
  },
  {
    item: "Brand and marketing design",
    detail:
      "We design the product interface. Logos, brand systems, and marketing sites are a different discipline and a different engagement.",
  },
] as const;

/** The comparison table on /pricing. */
export const COMPARE = {
  columns: ["Typical agency", "Freelancer", "No-code platform", "ZeroStack"],
  rows: [
    { label: "Price", values: ["₹4–8 lakh", "₹1–2 lakh", "₹60k+/year, forever", "₹50k–₹1L, fixed at discovery"] },
    { label: "Time to launch", values: ["3–6 months", "2–4 months", "Weeks", "30 days, fixed"] },
    { label: "Code review", values: ["Sometimes", "Rarely", "No code to review", "Every line"] },
    { label: "Admin panel", values: ["Quoted extra", "Usually skipped", "Limited", "Included"] },
    { label: "Who owns it", values: ["You, eventually", "You, hopefully", "The platform", "You, from day one"] },
    { label: "If the date slips", values: ["You pay more", "You wait", "—", "We work free until done"] },
  ],
} as const;

export const PAYMENT_TERMS =
  "Half on scope sign-off, half on handover. Bank transfer or UPI, GST invoice issued. Nothing is due before you have seen and approved the written scope." as const;

/* ------------------------------------------------------------------ */
/* FAQ                                                                 */
/* ------------------------------------------------------------------ */

export const FAQ = [
  {
    q: `How is ${OFFER.priceINR} possible when agencies quote in multiples of that?`,
    a:
      "Two reasons, neither of which is cut corners. First, scope is fixed before we start — that removes the open-ended discovery and change-request cycles that make up most of a traditional invoice. Second, AI now writes the repetitive volume of an application — CRUD, forms, types, migrations, test scaffolding — in a fraction of the old time. Our engineers spend their hours on architecture, edge cases, and review, which is where the value always was.",
  },
  {
    q: "Why is the price a range?",
    a:
      "Because scope varies. A directory app with four screens is not a two-sided marketplace with payments. During the 3–4 day discovery we map exactly what you need, and your quote lands between ₹50,000 and ₹1,00,000 — fixed in writing before any payment, and it never moves after that. If we misjudge the effort, the difference is ours to absorb.",
  },
  {
    q: "When is the product actually ready?",
    a:
      "The finished product — app, admin panel, backend — is built, tested, and demo-ready by day 20 after discovery. Days 21–30 are release management: App Store and Play Store submission, review cycles, store-feedback fixes, and production rollout. The stores' review timelines are the one step nobody can compress, so we budget for them honestly.",
  },
  {
    q: "What's the catch?",
    a:
      "The scope is genuinely fixed. If you change your mind about a core feature on day 18, it goes into a follow-on sprint rather than this one. Founders who want to explore as they build are better served by a monthly arrangement — and we will say so on the first call, not after you have paid.",
  },
  {
    q: "Is AI writing my product unsupervised?",
    a:
      "No. AI is a throughput tool here, not a decision-maker. An engineer designs the architecture, reviews every merged line, and is accountable for what ships. The speed comes from removing typing, not removing judgement.",
  },
  {
    q: "What happens if you miss day 30?",
    a:
      "We keep working at no additional cost until the locked scope is delivered. The date is our risk, not yours — which is exactly why we are strict about the scope document up front.",
  },
  {
    q: "Who owns the code?",
    a:
      "You do, completely, from day one. Your repository, your cloud accounts, your data, full commit history. No license, no lock-in, no obligation to keep working with us.",
  },
  {
    q: "Can you take over an existing codebase?",
    a:
      "Sometimes. A fixed-price 30-day build assumes a clean start, because inherited code carries unknown risk. Send it over — we will look and tell you honestly whether the fixed price still works or you need a different arrangement.",
  },
  {
    q: "What products suit this?",
    a:
      "Marketplaces, booking and scheduling, internal operations tools, delivery and logistics, subscriptions, directories, community apps. Anything where the shape is understood and the value is in execution.",
  },
  {
    q: "What doesn't?",
    a:
      "Novel ML research, hardware integration, financial licensing, heavy regulatory compliance — or products where nobody yet knows what should be built. We will say so early rather than take the deposit.",
  },
  {
    q: "How do payments work?",
    a: PAYMENT_TERMS,
  },
  {
    q: "How many builds do you run at once?",
    a:
      "A deliberately small number. Thirty days is only achievable with a dedicated team, so slots are limited and booked ahead. If we are full, we tell you the next open start date rather than start you late.",
  },
] as const;

/* ------------------------------------------------------------------ */
/* Case studies (parent company portfolio)                             */
/* ------------------------------------------------------------------ */

export const WORK = [
  { name: "Rideshare", domain: "Mobility", body: "Rider and driver apps with live trip tracking, fare logic, and an operations dashboard." },
  { name: "Edulinks", domain: "Education", body: "Course delivery and student management with role-based access for institutions." },
  { name: "Astromantra", domain: "Consumer", body: "Consultation marketplace with scheduling, payments, and practitioner tooling." },
  { name: "Fitwiser", domain: "Health", body: "Training and nutrition tracking with coach oversight and progress analytics." },
  { name: "Jobjaro", domain: "Marketplace", body: "Two-sided hiring marketplace with matching, applications, and employer tools." },
  { name: "Zipdy", domain: "Logistics", body: "Delivery coordination with dispatch, live tracking, and partner management." },
  { name: "Blush Finance", domain: "Fintech", body: "Financial product with onboarding, KYC handling, and a compliance-aware admin layer." },
  { name: "Touchstone", domain: "Enterprise", body: "Internal operations platform replacing spreadsheet-driven process at scale." },
] as const;

export const LEGAL_UPDATED = "18 July 2026";
