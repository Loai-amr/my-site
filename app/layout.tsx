import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono, IBM_Plex_Sans_Arabic } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { getDict } from "@/lib/i18n";
import { themeScript } from "@/lib/theme";
import { siteUrl } from "@/lib/site";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Arabic page only, so it isn't preloaded for English visitors.
const plexArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-arabic",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  preload: false,
});

const keywords = [
  "Loai Amr",
  "Frontend Developer",
  "React Developer",
  "Next.js Developer",
  "TypeScript",
  "React.js",
  "Redux Toolkit",
  "Frontend Engineer Cairo",
  "Webelocity",
];

export async function generateMetadata(): Promise<Metadata> {
  const { lang, t } = await getDict();
  const { title, description, siteName } = t.meta;
  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: title,
      template: `%s · ${lang === "ar" ? "لؤي عمرو" : "Loai Amr"}`,
    },
    description,
    keywords,
    authors: [{ name: "Loai Amr", url: "https://github.com/Loai-amr" }],
    creator: "Loai Amr",
    openGraph: {
      title,
      description,
      type: "website",
      url: "/",
      siteName,
      locale: lang === "ar" ? "ar_EG" : "en_US",
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/opengraph-image"],
    },
    icons: {
      icon: [
        { url: "/favicon.ico" },
        { url: "/favicon.png", sizes: "16x16", type: "image/png" },
        { url: "/favicon.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon.png", sizes: "192x192", type: "image/png" },
      ],
      apple: [{ url: "/favicon.png", sizes: "192x192", type: "image/png" }],
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { lang, t } = await getDict();
  return (
    // data-theme is set by the inline script before React hydrates.
    <html lang={lang} dir={t.dir} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        className={`${jakarta.variable} ${jetbrainsMono.variable} ${lang === "ar" ? plexArabic.variable : ""} antialiased`}
      >
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
