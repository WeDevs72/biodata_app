import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "BioDataEarth — Biodata Maker for Matrimonial, Job & Business";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #fff7f0 0%, #ffedd5 45%, #fce7f3 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px 80px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Decorative background circles */}
        <div
          style={{
            position: "absolute",
            top: "-80px",
            right: "-80px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "rgba(249,115,22,0.12)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-100px",
            left: "-60px",
            width: "350px",
            height: "350px",
            borderRadius: "50%",
            background: "rgba(225,29,72,0.10)",
          }}
        />

        {/* Logo Row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            marginBottom: "36px",
          }}
        >
          <div
            style={{
              background: "linear-gradient(135deg, #f97316, #e11d48)",
              borderRadius: "22px",
              width: "80px",
              height: "80px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 8px 24px rgba(249,115,22,0.35)",
            }}
          >
            <span style={{ fontSize: "44px" }}>📄</span>
          </div>
          <span
            style={{
              fontSize: "58px",
              fontWeight: "800",
              color: "#ea580c",
              letterSpacing: "-1px",
            }}
          >
            BioDataEarth
          </span>
        </div>

        {/* Headline */}
        <p
          style={{
            fontSize: "32px",
            fontWeight: "700",
            color: "#1e293b",
            textAlign: "center",
            margin: "0 0 14px 0",
            lineHeight: "1.3",
            maxWidth: "820px",
          }}
        >
          Biodata Maker for Matrimonial, Job Resume & Business
        </p>

        {/* Sub-headline */}
        <p
          style={{
            fontSize: "22px",
            color: "#64748b",
            textAlign: "center",
            margin: "0 0 52px 0",
          }}
        >
          Beautiful templates • Instant PDF download • No signup needed
        </p>

        {/* Category Pills */}
        <div style={{ display: "flex", gap: "20px" }}>
          {[
            { emoji: "💒", label: "Matrimonial", color: "#e11d48", bg: "#fff1f2", border: "#fecdd3" },
            { emoji: "💼", label: "Job Resume", color: "#4f46e5", bg: "#eef2ff", border: "#c7d2fe" },
            { emoji: "🏢", label: "Business", color: "#d97706", bg: "#fffbeb", border: "#fde68a" },
          ].map(({ emoji, label, color, bg, border }) => (
            <div
              key={label}
              style={{
                background: bg,
                border: `2.5px solid ${border}`,
                borderRadius: "50px",
                padding: "14px 32px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                fontSize: "20px",
                fontWeight: "700",
                color,
                boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
              }}
            >
              <span style={{ fontSize: "24px" }}>{emoji}</span>
              {label}
            </div>
          ))}
        </div>

        {/* Bottom domain badge */}
        <div
          style={{
            position: "absolute",
            bottom: "32px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#22c55e",
            }}
          />
          <span style={{ fontSize: "16px", color: "#94a3b8", fontWeight: "500" }}>
            biodataearth.com
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
