// Every fact on the site outside the case studies lives here. Keep it in step with the CV.

export const site = {
  url: "https://eskaybuilds.vercel.app",
  name: "Sikiru Razak",
  location: "", // shown above the name when set, e.g. "City, Country"
  title: "Senior Mobile Engineer (React Native), fintech",
  positioning:
    "I build React Native apps for fintech products, and I know how money moves: I designed and built a ledger and payment reconciliation backend end to end.",
  email: "sikirurazak1@gmail.com",
  cv: "/sikiru-razak-cv.pdf",
  links: [
    { label: "GitHub", href: "https://github.com/eskaybuilds" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/sikiru-razak/" },
    { label: "X", href: "https://x.com/hey_eskay" },
  ],
};

type Role = {
  company: string;
  role: string;
  label?: string;
  dates: string;
  line: string;
};

// Newest first. Labels and dates must match the CV exactly.
export const experience: Role[] = [
  {
    company: "Coronation Technology",
    role: "Mobile React Native Engineer",
    label: "Full-time",
    dates: "Apr 2026 to present",
    line: "Led a biometric security feature for the Coronation Wealth app and designed its progressive onboarding flow; work with product, design and backend teams on mobile wealth-management journeys.",
  },
  {
    company: "Peerdict",
    role: "Senior Backend Engineer",
    label: "Contract, part-time",
    dates: "May 2025 to Mar 2026",
    line: "Sole backend engineer for a sports-prediction MVP: ledger-backed accounting, payment reconciliation and pool settlement, from MVP to prelaunch.",
  },
  {
    company: "Kargoplex",
    role: "Mobile Engineer",
    label: "Full-time",
    dates: "Mar 2025 to Jun 2026",
    line: "Shipper and Forwarder apps: shipment tracking and booking, payment gateway integration with idempotency safeguards, offline caching and synchronisation.",
  },
  {
    company: "WebCode Drum (client: Sterling Bank Plc.)",
    role: "Senior Frontend Engineer",
    dates: "Feb 2024 to Mar 2025",
    line: "Owned the Credit Loan Service micro-frontend on SeaBaaS, Sterling's core banking platform; 80%+ test coverage; shipped within staged release and regulatory processes.",
  },
  {
    company: "Tubda Inc.",
    role: "Mobile Developer",
    label: "Part-time, freelance",
    dates: "Feb 2024 to Mar 2025",
    line: "React Native messaging with WebSockets, offline persistence and read receipts; audio streaming.",
  },
  {
    company: "AMTIL Inc.",
    role: "Frontend Engineer",
    label: "Part-time (currently advisory)",
    dates: "Feb 2023 to present",
    line: "Led React/Next.js delivery of 3D aviation-training modules and multilingual text-to-speech; load times down about 30%.",
  },
  {
    company: "Nubytes",
    role: "Frontend Engineer",
    dates: "Jul 2022 to Feb 2023",
    line: "Legal-tech SaaS: document automation, CRM, streamed-response AI assistant; test coverage above 80%.",
  },
  {
    company: "Aibanc",
    role: "Mobile Developer / Full-Stack Engineer",
    label: "Contract",
    dates: "Jul 2021 to Jan 2023",
    line: "Lending and cross-border payments: GraphQL to REST migration, React Query adoption, transaction idempotency.",
  },
  {
    company: "Purscliq",
    role: "Frontend Engineer",
    dates: "Feb 2021 to Jul 2022",
    line: "Led frontend for payments, payroll, invoicing and business dashboards.",
  },
];

// The Projects section appears once this list has an entry.
export const projects: { name: string; tags: string[]; line: string; href: string }[] = [
  {
    name: "TalkPay mobile",
    tags: ["Expo", "TanStack Query"],
    line: "Mobile app for a chat-driven wallet: chat with an AI agent to check balances and send money. Expo Router, Nx and Zod, with an API client generated from the OpenAPI spec.",
    href: "https://github.com/eskaybuilds/mobile.talkpay",
  },
  {
    name: "TalkPay API",
    tags: ["NestJS", "PostgreSQL"],
    line: "Backend for TalkPay: NestJS, Fastify and TypeORM on Postgres, with a double-entry ledger and an AI agent that proposes payments for biometric confirmation.",
    href: "https://github.com/eskaybuilds/api.talkpay",
  },
  {
    name: "secure-auth",
    tags: ["Swift", "Kotlin"],
    line: "Expo native module for biometric confirmation and secure key storage, built with the Expo Modules API. TalkPay uses it to approve payments.",
    href: "https://github.com/eskaybuilds/secure-auth.talkpay",
  },
  {
    name: "Offline sync mobile app",
    tags: ["Expo", "TypeScript"],
    line: "Shipment app built with Expo: logistics tracking, connection-aware sync, and custom form components with React Hook Form and Yup.",
    href: "https://github.com/eskaybuilds/offline-sync-native-mobile-app",
  },
  {
    name: "React Native shipment app",
    tags: ["Expo", "TypeScript"],
    line: "Shipment app built with Expo and Expo Router.",
    href: "https://github.com/eskaybuilds/react-native-shipment-app",
  },
  {
    name: "Accounting microservice",
    tags: ["Java", "Spring Boot"],
    line: "Bootstrap for a fintech accounting and transaction-processing service: double-entry, append-only ledger, idempotent API and webhook processing, Kafka and PostgreSQL.",
    href: "https://github.com/eskaybuilds/accounting-microservice",
  },
  {
    name: "Payment processor service",
    tags: ["Go"],
    line: "Standalone payment processor service.",
    href: "https://github.com/eskaybuilds/payment-processor-service",
  },
  {
    name: "AliasFile",
    tags: ["Go", "CLI"],
    line: "Share or upload a file under a different name, without renaming or touching the original.",
    href: "https://github.com/eskaybuilds/aliasfile",
  },
  {
    name: "Personal Learning Agent Framework",
    tags: ["Python"],
    line: "Open-source, model-agnostic learning assistant with durable memory and pluggable integrations.",
    href: "https://github.com/eskaybuilds/personal-learning-agent-framework",
  },
];

export const skills: { group: string; items: string[] }[] = [
  {
    group: "Mobile",
    items: ["React Native", "TypeScript", "native integrations", "secure storage", "push notifications"],
  },
  {
    group: "Frontend",
    items: ["React", "Next.js", "Vue.js", "micro-frontends", "Tailwind CSS"],
  },
  {
    group: "Data and forms",
    items: ["TanStack Query", "React Hook Form", "Zod/Yup", "REST APIs", "WebSockets"],
  },
  {
    group: "Backend",
    items: ["Node.js", "NestJS", "Go", "Java", "PostgreSQL", "MySQL", "MongoDB", "Redis/Bull"],
  },
  {
    group: "Quality and tools",
    items: ["Jest", "React Testing Library", "Git", "Docker", "CI/CD", "Figma"],
  },
];
