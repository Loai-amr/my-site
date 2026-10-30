import type { Lang } from "@/lib/i18n";

// Screenshots live in public/projects/<slug>-desktop.webp (1440px wide) and <slug>-mobile.webp
// (780px wide, 2x), with their heights in lib/shots.json. To add a site: drop the two screenshots
// in, add its heights to shots.json and add a line below.
export type ProjectShot = { slug: string; name: string; url: string; label?: string };

export type Product = {
  id: string;
  name: string;
  url: string;
  tagline: string;
  summary: string;
  // What was built, shown as chips.
  parts: string[];
  // Optional longer breakdown (used by the featured case study).
  details?: { title: string; desc: string }[];
  appUrl?: string;
  shots: ProjectShot[];
};

/** "example.com" or "example.com/some-page" (no www, no trailing slash). */
export function siteDomain(url: string): string {
  const u = new URL(url);
  return (u.hostname.replace(/^www\./, "") + u.pathname).replace(/\/$/, "");
}

// Same order and URLs in both languages; only the labels differ.
const site = (slug: string, name: string, url: string): ProjectShot => ({ slug, name, url });

const clientSites: ProjectShot[] = [
  site("lumbercart", "LUMBERCART", "https://www.lumbercart.ca/"),
  site("hcinc", "Home Central Stores", "https://www.hcinc.com/"),
  site("aurora", "Aurora Home Hardware", "https://www.aurorahomehardware.ca/"),
  site("amherstsupply", "Amherst Supply", "https://www.amherstsupply.com/"),
  site("camufacturing", "CAMufacturing Solutions", "https://www.camufacturing.com/"),
  site("superwood", "Superior Wood", "https://www.superwood.ca/"),
  site("mdrsupply", "MDR Electrical Supply", "https://staging.mdrsupply.com/"),
  site("rdsupply", "RD Electrical Supply", "https://staging.rdsupplynj.com/"),
  site("lloyds", "Lloyd's Cabinet Shop", "https://www.lloydscabinetshop.com/"),
  site("keenstudio", "Keen Design Studio", "https://www.keenstudio.ca/"),
  site("filterco", "Filterco Water Treatment", "https://www.filterco.net/"),
  site("valley", "Valley Water Treatment", "https://www.valleywatertreatment.ca/"),
  site("tsw", "TSW Trading", "https://www.tswtrading.com/"),
  site("greatnorthrc", "Great North RC", "https://www.greatnorthrc.ca/"),
  site("brightandpurehearts", "Bright & Pure Hearts", "https://www.brightandpurehearts.com/"),
  site("eaglewatch", "Eagle Watch Group", "https://www.eaglewatch-group.com/"),
  site("citypharmacy", "City Pharmacy", "https://www.citypharmacy.ca/"),
  site("wellplus", "Well Plus Pharmacy", "https://www.wellpluspharmacy.ca/"),
  site("lancaster", "Lancaster Wellness Pharmacy", "https://www.lancasterwellnesspharmacy.com/"),
  site("fraserheights", "Fraser Heights Pharmacy", "https://www.fraserheightspharmacy.ca/"),
  site("hamilton", "Hamilton Pharmacy", "https://www.hamilton-pharmacy.com/"),
  site("commissioners", "Commissioners Pharmacy", "https://www.commissionerspharmacy.com/"),
  site("chancellors", "Chancellors Way Pharmacy", "https://www.chancellorswaypharmacy.com/"),
  site("winona", "Winona Pharmacy", "https://www.winona-pharmacy.com/"),
];

const wordpressSites: ProjectShot[] = [
  site("sysloventures", "Syslo Ventures", "https://sysloventures.com/"),
  site("kodiak", "Kodiak Fitness Center", "https://kodiakfitnesscentercs.com/"),
  site("philandlees", "Phil & Lee's Homes", "https://philandlees.com/"),
  site("johnsonads", "Johnson Advertising", "https://johnsonads.com/"),
  site("unwiredproducts", "Unwired Products", "https://unwiredproducts.com/"),
  site("unwiredmedia", "Unwired Media", "https://unwired-media.com/"),
  site("mdcc", "Million Dollar Concrete Contractor", "https://milliondollarconcretecontractor.com/"),
  site("ivyjohnson", "Ivy Johnson", "https://ivyjohnson.com/"),
  site("weightedgang", "Weighted Gang", "https://weightedgang.com/"),
  site("datumdraw", "Datum · Contract & Budget Audit", "https://datumdraw.com/contract-budget-audit/"),
  site("amsrvcs", "American Services", "https://www.amsrvcs.com/"),
  site("daviddweck", "David Dweck", "https://www.daviddweck.com/"),
  site("danielkrynzel", "Daniel Krynzel", "https://danielkrynzel.com/"),
  site("goat", "The GOAT Academy", "https://goat-academy.com/"),
  site("landmark", "Landmark Services", "https://landmarksvcs.com/"),
  site("coastconcrete", "Coast Concrete", "https://coastconcrete.net/"),
  site("bigballs", "Big Balls Brotherhood", "https://bigballsbrotherhood.com/"),
  site("fets", "FETS", "https://fets-sa.com/"),
  site("ghelalalbaraka", "Ghelal Albaraka", "https://ghelalalbaraka.com/"),
  site("alisalah", "Ali Salah Architect", "https://alisalaharch.com/"),
];

const toolswiftUrls = {
  site: "https://www.toolswift.ai/",
  admin: "https://app.toolswift.ca/",
  customer: "https://customer.toolswift.ca/",
  trust: "https://trust.toolswift.ai/",
  app: "https://play.google.com/store/apps/details?id=com.toolswift.tsa",
};

const en = {
  toolswift: {
    id: "toolswift",
    name: "ToolSwift",
    url: toolswiftUrls.site,
    appUrl: toolswiftUrls.app,
    tagline: "eCommerce platform for lumber yards, hardware stores and B2B dealers.",
    summary:
      "One catalog runs each dealer's storefront, contractor dashboard and branded mobile app, with quotes, credit-aware checkout, AR and ERP sync built in. I worked on every side of it: the client-facing website, the admin dashboard, the customer dashboard and the mobile app, plus parts of the backend API.",
    parts: ["Client-facing website", "Admin dashboard", "Customer dashboard", "Mobile app", "Trust center", "Backend API (contributions)"],
    details: [
      { title: "Admin dashboard", desc: "Where dealers run the business: products, quotes, orders, inventory, customers and sales across every location." },
      { title: "Customer dashboard", desc: "Contractors reorder past jobs, track orders, manage quotes and pay invoices with their own pricing applied." },
      { title: "Website & storefronts", desc: "The marketing site plus the dealer storefronts built on the platform, a lot of them in the carousel below." },
      { title: "Mobile app & backend", desc: "The dealers' branded mobile app, and contributions to the API behind all of it." },
    ],
    shots: [
      { slug: "toolswift-site", name: "ToolSwift", label: "Client-facing website", url: toolswiftUrls.site },
      { slug: "toolswift-admin", name: "ToolSwift", label: "Admin dashboard", url: toolswiftUrls.admin },
      { slug: "toolswift-customer", name: "ToolSwift", label: "Customer dashboard", url: toolswiftUrls.customer },
      { slug: "toolswift-trust", name: "ToolSwift", label: "Trust center", url: toolswiftUrls.trust },
    ],
  } as Product,
  products: [
    {
      id: "onemore",
      name: "ONE MORE",
      url: "https://www.onemoreeg.com/",
      tagline: "Egypt's home for sport.",
      summary:
        "Shop verified stores and official brands, follow athletes, book courts and gyms, and compete, all in one account. I built the frontend for every side: the client-facing website, the admin dashboard and the customer dashboard.",
      parts: ["Client-facing website", "Admin dashboard", "Customer dashboard", "Partner portal"],
      shots: [
        { slug: "onemore-site", name: "ONE MORE", label: "Client-facing website", url: "https://www.onemoreeg.com/" },
        { slug: "onemore-portal", name: "ONE MORE", label: "Partner portal", url: "https://portal.onemoreeg.com/" },
      ],
    },
    {
      id: "witan",
      name: "Witan Advisory",
      url: "https://staging.witanadvisory.com/",
      tagline: "Finance & accounting talent across the Gulf.",
      summary:
        "Scored matching for finance leaders, from CFO to analyst. I built the frontend for the client-facing website and both dashboards: Witan Command, an AI-assisted workspace for CFOs, auditors and analysts, and Witan Ops, the internal talent-matching workspace.",
      parts: ["Client-facing website", "CFO dashboard", "Talent dashboard"],
      shots: [
        { slug: "witan-site", name: "Witan Advisory", label: "Client-facing website", url: "https://staging.witanadvisory.com/" },
        { slug: "witan-cfo", name: "Witan Command", label: "CFO dashboard", url: "https://cfo.witanadvisory.com/login" },
        { slug: "witan-talent", name: "Witan Ops", label: "Talent dashboard", url: "https://talent.witanadvisory.com/login" },
      ],
    },
  ] as Product[],
  clientSites,
  wordpressSites,
};

const ar: typeof en = {
  toolswift: {
    ...en.toolswift,
    tagline: "منصة تجارة إلكترونية لمخازن الأخشاب ومحلات العدد والأدوات وموزعي B2B.",
    summary:
      "كتالوج واحد يشغّل متجر كل موزع ولوحة تحكم المقاولين وتطبيق الموبايل الخاص به، مع عروض الأسعار والدفع المرتبط بحد الائتمان والحسابات والربط مع أنظمة ERP. عملت على كل أجزائها: الموقع الموجّه للعملاء، ولوحة تحكم الإدارة، ولوحة تحكم العملاء، وتطبيق الموبايل، بالإضافة إلى أجزاء من الـ Backend API.",
    parts: ["الموقع الموجّه للعملاء", "لوحة تحكم الإدارة", "لوحة تحكم العملاء", "تطبيق الموبايل", "مركز الثقة", "Backend API (مساهمات)"],
    details: [
      { title: "لوحة تحكم الإدارة", desc: "حيث يدير الموزع عمله: المنتجات وعروض الأسعار والطلبات والمخزون والعملاء والمبيعات في كل الفروع." },
      { title: "لوحة تحكم العملاء", desc: "المقاول يعيد طلب مشاريعه السابقة، ويتابع الطلبات، ويدير عروض الأسعار، ويدفع الفواتير بأسعاره الخاصة." },
      { title: "الموقع والمتاجر", desc: "الموقع التسويقي ومتاجر الموزعين المبنية على المنصة، وكثير منها في العرض بالأسفل." },
      { title: "تطبيق الموبايل والـ Backend", desc: "تطبيق الموبايل بعلامة كل موزع، ومساهمات في الـ API الذي يشغّل كل ذلك." },
    ],
    shots: [
      { ...en.toolswift.shots[0], label: "الموقع الموجّه للعملاء" },
      { ...en.toolswift.shots[1], label: "لوحة تحكم الإدارة" },
      { ...en.toolswift.shots[2], label: "لوحة تحكم العملاء" },
      { ...en.toolswift.shots[3], label: "مركز الثقة" },
    ],
  },
  products: [
    {
      ...en.products[0],
      tagline: "بيت الرياضة في مصر.",
      summary:
        "تسوّق من متاجر موثّقة وعلامات رسمية، وتابع الرياضيين، واحجز الملاعب والجيم، ونافس، كل ذلك بحساب واحد. بنيت الواجهة الأمامية لكل الأجزاء: الموقع الموجّه للعملاء، ولوحة تحكم الإدارة، ولوحة تحكم العملاء.",
      parts: ["الموقع الموجّه للعملاء", "لوحة تحكم الإدارة", "لوحة تحكم العملاء", "بوابة الشركاء"],
      shots: [
        { ...en.products[0].shots[0], label: "الموقع الموجّه للعملاء" },
        { ...en.products[0].shots[1], label: "بوابة الشركاء" },
      ],
    },
    {
      ...en.products[1],
      tagline: "كفاءات المالية والمحاسبة في الخليج.",
      summary:
        "مطابقة مدعومة بالتقييم لقيادات المالية، من المدير المالي إلى المحلل. بنيت الواجهة الأمامية للموقع الموجّه للعملاء ولوحتي التحكم: Witan Command، مساحة عمل مدعومة بالذكاء الاصطناعي للمديرين الماليين والمراجعين والمحللين، و Witan Ops، مساحة العمل الداخلية لمطابقة الكفاءات.",
      parts: ["الموقع الموجّه للعملاء", "لوحة تحكم المدير المالي", "لوحة تحكم الكفاءات"],
      shots: [
        { ...en.products[1].shots[0], label: "الموقع الموجّه للعملاء" },
        { ...en.products[1].shots[1], label: "لوحة تحكم المدير المالي" },
        { ...en.products[1].shots[2], label: "لوحة تحكم الكفاءات" },
      ],
    },
  ],
  clientSites,
  wordpressSites,
};

export function getProjects(lang: Lang) {
  return lang === "ar" ? ar : en;
}
