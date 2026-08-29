import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
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

const title = "Loai Amr — Senior Frontend Developer (React & Next.js)";
const description =
  "Senior Frontend Developer with 4+ years building responsive, high-performance web applications with React, Next.js, and TypeScript. Based in Cairo, Egypt.";
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

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://loai-amr.vercel.app"),
  title: {
    default: title,
    template: "%s · Loai Amr",
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
    siteName: "Loai Amr — Frontend Developer",
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
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/favicon-192.png", sizes: "192x192", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jakarta.variable} ${jetbrainsMono.variable} antialiased`}>
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
