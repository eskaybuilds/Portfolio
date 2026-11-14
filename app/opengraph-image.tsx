import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name}: ${site.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "#0a0a0a",
          color: "#ededed",
        }}
      >
        <div style={{ fontSize: 76, fontWeight: 700 }}>{site.name}</div>
        <div style={{ fontSize: 40, marginTop: 24, color: "#60a5fa" }}>{site.title}</div>
        <div style={{ fontSize: 28, marginTop: 56, color: "#a3a3a3" }}>
          {site.url.replace("https://", "")}
        </div>
      </div>
    ),
    size
  );
}
