import type { Lang } from "@/lib/i18n";

// Links and files are the same in both languages.
const links = {
  email: "loaiamr@gmail.com",
  linkedin: "https://linkedin.com/in/loai-amrr",
  github: "https://github.com/Loai-amr",
  instagram: "https://www.instagram.com/loaiiiamr/",
  tiktok: "https://www.tiktok.com/@loaiiamr",
  resumeHref: "/Loai_Amr_Frontend_Developer.pdf",
  ecommerceResumeHref: "/Loai_Amr_CV_Senior_Shopify_WordPress_Developer.pdf",
};

export type Experience = {
  role: string;
  org: string;
  location: string;
  period: string;
  summary: string;
  highlights: string[];
};

export type Service = {
  id: string;
  icon: string;
  title: string;
  desc: string;
  tags: string[];
};

export type FreeApp = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  url: string;
  source?: string;
  tags: string[];
  features: string[];
  // Phone screenshots (1170×2532). The middle one is shown in front.
  screenshots: { src: string; alt: string }[];
};

const en = {
  profile: {
    ...links,
    name: "Loai Amr",
    title: "Senior Frontend Developer",
    tagline: "React.js & Next.js",
    location: "Cairo, EG",
  },

  heroKeywords: ["React", "Next.js", "TypeScript", "Redux Toolkit", "Tailwind CSS", "Performance"],

  experience: [
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
  ] as Experience[],

  stack: [
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
  ] as { label: string; items: string[]; featured?: boolean }[],

  education: [
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
  ],

  otherWorkServices: [
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
  ] as Service[],


  caseStudy: {
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
    terminal: {
      comment: "// back-of-envelope, using the business's own numbers",
      visits: "1,000 monthly visits, 80% leave by second 2",
      at16: "→ at 16s: ~800 of 1,000 visits bounce before the page is usable",
      at12: "→ at 1.2s: those 800 visits become reachable",
      conversion: "even a modest 3% conversion on the newly-reachable traffic",
      leads: "→ ~24 additional leads/month, previously invisible to the funnel",
      disclaimer:
        "// illustrative math based on a common industry bounce assumption — always validate against real analytics before quoting this to a client.",
    },
  },

  freeApps: [
    {
      slug: "goals-tracker",
      name: "Goals Tracker",
      tagline: "Save toward anything, one deposit at a time.",
      description:
        "Set a goal, log deposits and withdrawals, and watch the bar fill up. It installs on your phone like a native app, works fully offline, and keeps every number on your device: no account, no ads, no server.",
      url: "https://mygoalstracking.loaiamr.com/",
      source: "https://github.com/Loai-amr/Personal-savings-tracker-PWA",
      tags: ["PWA", "Works offline", "No sign-up", "Vanilla JS"],
      features: [
        "EGP, USD, EUR or SAR goals",
        "Deposits & withdrawals with notes and dates",
        "Numbers-only mode: hide history and buttons",
        "Export / import your data as a backup",
        "Add to Home Screen on iPhone or Android",
      ],
      screenshots: [
        { src: "/apps/goals-tracker/goals-add.webp", alt: "Goals Tracker: adding a deposit" },
        { src: "/apps/goals-tracker/goals-main.webp", alt: "Goals Tracker: an emergency fund at 68% with deposit history" },
        { src: "/apps/goals-tracker/goals-minimal.webp", alt: "Goals Tracker: numbers-only view" },
      ],
    },
  ] as FreeApp[],
};

const ar: typeof en = {
  profile: {
    ...links,
    name: "لؤي عمرو",
    title: "مطوّر واجهات أمامية أول",
    tagline: "React.js و Next.js",
    location: "القاهرة، مصر",
  },

  heroKeywords: en.heroKeywords,

  experience: [
    {
      role: "مطوّر واجهات أمامية أول",
      org: "Webelocity",
      location: "شركة كندية، عن بُعد",
      period: "أكتوبر 2024 — حتى الآن",
      summary:
        "أقود معمارية الواجهات الأمامية وأوجّه فريق التطوير لمنصة إدارة محتوى للتجارة الإلكترونية B2B.",
      highlights: [
        "تصميم أنظمة واجهات أمامية قابلة للتوسع بـ React و Next.js و TypeScript",
        "وضع معايير كتابة الكود وأنماط معمارية المكوّنات للفريق",
        "توجيه المطورين الجدد في أفضل ممارسات React وتحسين الأداء",
        "قيادة مراجعات الكود ووضع معايير الاختبارات",
        "إعداد وصيانة خطوط CI/CD باستخدام GitHub Actions",
      ],
    },
    {
      role: "مطوّر واجهات أمامية",
      org: "Webelocity",
      location: "شركة كندية، عن بُعد",
      period: "سبتمبر 2022 — أكتوبر 2024",
      summary: "بناء تطبيقات الواجهة الأمامية لمنصة تجارة إلكترونية B2B تخدم أكثر من 20 متجرًا.",
      highlights: [
        "بناء تطبيقات React و Next.js متجاوبة بـ TypeScript لعدة متاجر",
        "تنفيذ مكتبات مكوّنات وأنماط واجهات قابلة للتوسع",
        "تحسين الأداء: تقسيم الكود، التحميل الكسول، الـ memoization، ومؤشرات Core Web Vitals",
        "إدارة الحالة بـ Redux Toolkit و React Query لتدفقات بيانات معقدة",
        "ربط واجهات REST و GraphQL",
        "كتابة اختبارات الوحدات والتكامل بـ Jest و React Testing Library",
      ],
    },
    {
      role: "مطوّر واجهات أمامية — عمل حر",
      org: "Upwork و مستقل",
      location: "منصات العمل الحر",
      period: "2021 — أكتوبر 2024",
      summary:
        "تسليم أكثر من 50 مشروع واجهات أمامية بـ React و Next.js وتقنيات الويب الحديثة لعملاء متنوعين.",
      highlights: [],
    },
  ],

  stack: [
    { label: "أطر العمل واللغات", items: en.stack[0].items, featured: true },
    { label: "إدارة الحالة", items: en.stack[1].items },
    {
      label: "التصميم والواجهات",
      items: ["Tailwind CSS", "SCSS", "CSS3", "Bootstrap", "تصميم متجاوب يبدأ بالموبايل"],
    },
    { label: "الاختبارات", items: en.stack[3].items },
    { label: "الواجهات البرمجية والبيانات", items: ["REST APIs", "GraphQL", "بيانات لحظية"] },
    { label: "النشر والأدوات", items: en.stack[5].items },
  ],

  education: [
    {
      title: "بكالوريوس علوم الحاسب",
      org: "جامعة MTI، القاهرة، مصر",
      period: "2019 — 2023",
    },
    {
      title: "Nanodegree تطوير الواجهات الأمامية",
      org: "Udacity",
      period: "2021 — 2022",
    },
  ],

  otherWorkServices: [
    {
      id: "shopify",
      icon: "S",
      title: "Shopify",
      desc: "متاجر مخصصة، وتعديلات على القوالب مكتوبة مباشرة بـ Liquid و JS و CSS، وربط بوابات الدفع.",
      tags: ["تخصيص القوالب", "ربط بوابات الدفع", "قوالب المنتجات والمجموعات"],
    },
    {
      id: "wp",
      icon: "W",
      title: "WordPress",
      desc: "مواقع Elementor، ومتاجر WooCommerce، و WordPress كـ Headless CMS مع React، بالإضافة إلى تحسين الأداء والـ SEO.",
      tags: ["Elementor و WooCommerce", "Headless WordPress", "السرعة والـ SEO التقني"],
    },
  ],


  caseStudy: {
    ...en.caseStudy,
    role: "وكالة تسويق، إعادة بناء بـ WordPress و Elementor",
    before: "16.0 ث",
    after: "1.2 ث",
    footnote: "التحميل الكامل للصفحة الرئيسية — PageSpeed Insights و GTmetrix، موبايل بسرعة إنترنت محدودة",
    fixes: [
      { num: "01", title: "معالجة الصور", desc: "صور بالحجم الكامل ← صور WebP مضغوطة ومتجاوبة" },
      { num: "02", title: "الملفات التي تعطّل العرض", desc: "سكربتات متزامنة في الـ head ← مؤجلة ومضغوطة" },
      { num: "03", title: "التخزين المؤقت", desc: "بدون أي إعداد ← تخزين كامل للصفحات + CDN" },
      { num: "04", title: "تضخم الإضافات", desc: "سكربتات على كل الموقع ← فقط ما تحتاجه كل صفحة" },
    ],
    terminal: {
      comment: "// حسبة تقريبية بأرقام النشاط نفسه",
      visits: "1,000 زيارة شهريًا، 80% يغادرون قبل الثانية الثانية",
      at16: "← عند 16 ث: ~800 من 1,000 زيارة تغادر قبل أن تصبح الصفحة قابلة للاستخدام",
      at12: "← عند 1.2 ث: هذه الـ 800 زيارة أصبحت ممكنة",
      conversion: "حتى بنسبة تحويل متواضعة 3% على الزيارات الجديدة",
      leads: "← ~24 عميل محتمل إضافي شهريًا، لم يكونوا يظهرون في المسار من قبل",
      disclaimer:
        "// حسبة توضيحية مبنية على افتراض شائع لنسبة المغادرة؛ تحقق دائمًا من بيانات التحليلات الحقيقية قبل عرضها على عميل.",
    },
  },

  freeApps: [
    {
      ...en.freeApps[0],
      name: "Goals Tracker",
      tagline: "ادّخر لأي هدف، إيداعًا بعد إيداع.",
      description:
        "حدّد هدفًا، وسجّل الإيداعات والسحوبات، وشاهد الشريط يمتلئ. يُثبَّت على هاتفك مثل التطبيقات العادية، ويعمل بالكامل بدون إنترنت، ويحفظ كل الأرقام على جهازك: بدون حساب أو إعلانات أو خادم.",
      tags: ["PWA", "يعمل بدون إنترنت", "بدون تسجيل", "Vanilla JS"],
      features: [
        "أهداف بالجنيه المصري أو الدولار أو اليورو أو الريال السعودي",
        "إيداعات وسحوبات مع ملاحظات وتواريخ",
        "وضع الأرقام فقط: إخفاء السجل والأزرار",
        "تصدير واستيراد بياناتك كنسخة احتياطية",
        "إضافة إلى الشاشة الرئيسية على iPhone أو Android",
      ],
      screenshots: [
        { src: "/apps/goals-tracker/goals-add.webp", alt: "Goals Tracker: إضافة إيداع" },
        { src: "/apps/goals-tracker/goals-main.webp", alt: "Goals Tracker: صندوق طوارئ عند 68% مع سجل الإيداعات" },
        { src: "/apps/goals-tracker/goals-minimal.webp", alt: "Goals Tracker: عرض الأرقام فقط" },
      ],
    },
  ],
};

/** All page copy (experience, stack, projects, services) in the visitor's language. */
export function getContent(lang: Lang) {
  return lang === "ar" ? ar : en;
}
