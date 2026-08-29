import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#ffffff",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 30, fontWeight: 700, color: "#0f172a" }}>loai</span>
          <span style={{ fontSize: 30, fontWeight: 700, color: "#2563eb" }}>_</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <span style={{ fontSize: 26, fontWeight: 600, color: "#2563eb" }}>
            Also in the toolkit
          </span>
          <span
            style={{
              fontSize: 66,
              fontWeight: 800,
              color: "#0f172a",
              lineHeight: 1.15,
              maxWidth: 980,
            }}
          >
            Shopify &amp; WordPress development.
          </span>
        </div>

        <div style={{ display: "flex", gap: 14 }}>
          {["Shopify", "WordPress", "Elementor", "WooCommerce"].map((kw) => (
            <div
              key={kw}
              style={{
                display: "flex",
                border: "1px solid #e2e8f0",
                borderRadius: 999,
                padding: "10px 20px",
                fontSize: 22,
                color: "#475569",
              }}
            >
              {kw}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
