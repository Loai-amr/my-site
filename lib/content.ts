export const profile = {
  name: "Loai Amr",
  title: "Senior Frontend Developer",
  tagline: "React.js & Next.js",
  location: "Cairo, EG",
  email: "loaiamr@gmail.com",
  linkedin: "https://linkedin.com/in/loai-amrr",
  github: "https://github.com/Loai-amr",
  resumeHref: "/Loai_Amr_Frontend_Developer.pdf",
  ecommerceResumeHref: "/Loai_Amr_CV_Senior_Shopify_WordPress_Developer.pdf",
};

export const heroKeywords = [
  "React",
  "Next.js",
  "TypeScript",
  "Redux Toolkit",
  "Tailwind CSS",
  "Performance",
];

export type Experience = {
  role: string;
  org: string;
  location: string;
  period: string;
  summary: string;
  highlights: string[];
};

export const experience: Experience[] = [
  {
    role: "Senior Frontend Developer",
    org: "Webelocity",
    location: "Canada-based, Remote",
    period: "Oct 2024 — Present",
    summary:
      "Leading frontend architecture and mentoring the development team for a B2B eCommerce CMS platform.",
    highlights: [
      "Architect scalable React and Next.js frontend systems with TypeScript",
      "Establish coding standards and component architecture patterns across the team",
      "Mentor junior developers on React best practices and performance optimization",
      "Lead frontend code reviews and set testing standards",
      "Set up and maintain CI/CD pipelines using GitHub Actions",
    ],
  },
  {
    role: "Frontend Developer",
    org: "Webelocity",
    location: "Canada-based, Remote",
    period: "Sep 2022 — Oct 2024",
    summary:
      "Built frontend applications for a B2B eCommerce platform serving 20+ storefronts.",
    highlights: [
      "Built responsive React and Next.js applications with TypeScript across multiple storefronts",
      "Implemented component libraries and frontend patterns for scalability",
      "Optimized performance: code splitting, lazy loading, memoization, Core Web Vitals",
      "Managed state with Redux Toolkit and React Query for complex data flows",
      "Integrated REST and GraphQL APIs",
      "Wrote unit and integration tests with Jest and React Testing Library",
    ],
  },
  {
    role: "Frontend Developer — Freelance",
    org: "Upwork & Mostaql",
    location: "Freelance Marketplace",
    period: "2021 — Oct 2024",
    summary:
      "Delivered 50+ frontend projects using React, Next.js, and modern web technologies for diverse clients.",
    highlights: [],
  },
];

export const stack = [
  {
    label: "Frameworks & Languages",
    items: ["React.js", "Next.js", "TypeScript", "JavaScript (ES6+)"],
    featured: true,
  },
  {
    label: "State Management",
    items: ["Redux Toolkit", "React Query", "Zustand", "Context API"],
  },
  {
    label: "Styling & UI",
    items: ["Tailwind CSS", "SCSS", "CSS3", "Bootstrap", "Responsive / mobile-first"],
  },
  {
    label: "Testing",
    items: ["Jest", "React Testing Library", "Playwright", "Cypress"],
  },
  {
    label: "APIs & Data",
    items: ["REST APIs", "GraphQL", "Real-time data patterns"],
  },
  {
    label: "Deployment & Tools",
    items: ["Vercel", "GitHub Actions", "AWS", "Cloudflare", "Git"],
  },
];

export const education = [
  {
    title: "B.Sc. Computer Science",
    org: "MTI University, Cairo, Egypt",
    period: "2019 — 2023",
  },
  {
    title: "Front-End Web Developer Nanodegree",
    org: "Udacity",
    period: "2021 — 2022",
  },
];

export type Service = {
  id: string;
  icon: string;
  title: string;
  desc: string;
  tags: string[];
};

export const otherWorkServices: Service[] = [
  {
    id: "shopify",
    icon: "S",
    title: "Shopify",
    desc: "Custom storefronts, theme edits written directly in Liquid/JS/CSS, and payment gateway integrations.",
    tags: ["Theme customization", "Payment integrations", "Product & collection templates"],
  },
  {
    id: "wp",
    icon: "W",
    title: "WordPress",
    desc: "Elementor builds, WooCommerce stores, and headless WordPress paired with React, plus performance and SEO work.",
    tags: ["Elementor & WooCommerce", "Headless WordPress", "Speed & technical SEO"],
  },
];

export type Project = {
  tag: string;
  tagClass: "shopify" | "wp" | "b2b" | "scale";
  title: string;
  stackLine: string;
  desc: string;
};

export const otherWorkProjects: Project[] = [
  {
    tag: "shopify",
    tagClass: "shopify",
    title: "Shopify Store Builds & Theme Customization",
    stackLine: "Shopify · Liquid · JavaScript",
    desc: "Storefront builds and theme customization across every eCommerce engagement to date — custom sections, checkout tuning, and payment integrations.",
  },
  {
    tag: "wordpress",
    tagClass: "wp",
    title: "Kodiak Fitness Center",
    stackLine: "WordPress · Elementor Pro",
    desc: "Multi-location gym brand site with a pre-sell landing page that turned a \"coming soon\" page into a working membership funnel before launch.",
  },
  {
    tag: "wordpress",
    tagClass: "wp",
    title: "Phil & Lee's Homes",
    stackLine: "WordPress · Elementor",
    desc: "Home builder site matched precisely to an existing brand system, including a conversion-focused post-contact \"Thank You\" flow.",
  },
  {
    tag: "wordpress",
    tagClass: "wp",
    title: "Syslo Ventures — Agency Site",
    stackLine: "WordPress · Elementor",
    desc: "Marketing agency's own site and campaign pages — including the 16s → 1.2s performance rebuild below.",
  },
];

export const caseStudy = {
  client: "Syslo Ventures",
  role: "Marketing agency, WordPress/Elementor rebuild",
  url: "https://sysloventures.com",
  before: "16.0s",
  after: "1.2s",
  footnote: "Full page load, homepage — PageSpeed Insights / GTmetrix, mobile throttled",
  fixes: [
    { num: "01", title: "Image pipeline", desc: "Full-res uploads → compressed, responsive WebP" },
    { num: "02", title: "Render-blocking assets", desc: "Synchronous head scripts → deferred & minified" },
    { num: "03", title: "Caching", desc: "None configured → full-page + CDN edge cache" },
    { num: "04", title: "Plugin bloat", desc: "Site-wide scripts → trimmed to what each page uses" },
  ],
};
