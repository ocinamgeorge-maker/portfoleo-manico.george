import { ImageResponse } from "next/og";

import { siteConfig } from "@/lib/seo";

export const alt = `${siteConfig.name} — Software Developer Apprentice at Swisscom`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f7f7f4",
          color: "#111111",
          padding: "58px 70px 62px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "2px solid rgba(17, 17, 17, 0.18)",
            paddingBottom: 24,
          }}
        >
          <div style={{ display: "flex", fontSize: 32, fontWeight: 700 }}>
            MG.
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 18,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#666666",
            }}
          >
            Portfolio
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: 64,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
              maxWidth: 490,
            }}
          >
            <div style={{ display: "flex", fontSize: 48, fontWeight: 700 }}>
              {siteConfig.name}
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 24,
                lineHeight: 1.35,
                color: "#555555",
              }}
            >
              Software Developer Apprentice @ Swisscom
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              fontSize: 72,
              fontWeight: 600,
              lineHeight: 0.95,
              letterSpacing: "-0.045em",
              textAlign: "right",
            }}
          >
            <div style={{ display: "flex" }}>Fullstack &amp;</div>
            <div style={{ display: "flex" }}>AI Development</div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
