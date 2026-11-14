import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name}: something is awakening`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background:
            "radial-gradient(circle at 78% 45%, rgba(94,242,255,0.35), transparent 35%), radial-gradient(circle at 10% 0%, rgba(139,92,255,0.45), transparent 45%), #05060a",
          color: "#e8f1ff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 26, letterSpacing: 8, fontWeight: 700 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 999,
              border: "4px solid #5ef2ff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ width: 12, height: 12, borderRadius: 999, background: "#fff" }} />
          </div>
          SOULCAST ROBOTICS
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 28, color: "#5ef2ff", letterSpacing: 6, marginBottom: 18 }}>
            ● TRANSMISSION INCOMING
          </div>
          <div style={{ fontSize: 108, fontWeight: 800, lineHeight: 1, letterSpacing: -4 }}>Something</div>
          <div style={{ display: "flex", fontSize: 108, fontWeight: 800, lineHeight: 1.05, letterSpacing: -4 }}>
            is&nbsp;<span style={{ color: "#8fe9ff" }}>awakening.</span>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "#8a94ad" }}>
          <span>AI + Robotics · Changing how every industry works</span>
          <span>Kozhikode, Kerala</span>
        </div>
      </div>
    ),
    size
  );
}
