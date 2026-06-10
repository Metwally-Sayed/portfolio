import { ImageResponse } from "next/og"

export const OG_SIZE = { width: 1200, height: 630 }
export const OG_CONTENT_TYPE = "image/png"

export function ogCard({
  title,
  subtitle,
}: {
  title: string
  subtitle: string
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background: "#0a0a0a",
          color: "#ededed",
          fontFamily: "monospace",
        }}
      >
        <div style={{ fontSize: 28, color: "#a1a1a1" }}>[ms]</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 72, fontWeight: 700, letterSpacing: "-0.02em" }}>
            {title}
          </div>
          <div style={{ fontSize: 32, color: "#a1a1a1", marginTop: 16 }}>
            {subtitle}
          </div>
        </div>
        <div style={{ fontSize: 24, color: "#a1a1a1" }}>
          metwally-sayed.vercel.app
        </div>
      </div>
    ),
    { ...OG_SIZE }
  )
}
