import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // The generated blog covers read this file at runtime (lib/blog/cover.tsx).
  outputFileTracingIncludes: {
    "/blog/[slug]/cover.png": ["./public/blog/avatar.jpg"],
  },
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
