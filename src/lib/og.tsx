import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const WINE = "#7b1e2e";
const CANVAS = "#f5f4f0";
const INK = "#221f1d";

// Paths are scoped to fixed folders so the build only traces these assets.
const toDataUri = (buf: Buffer, type: string) => `data:${type};base64,${buf.toString("base64")}`;
const brand = (file: string) => readFile(join(process.cwd(), "public", "brand", file));
const blogCover = (file: string) => readFile(join(process.cwd(), "public", "blog", file));

/** Branded share image. With a cover it becomes a split layout (wine panel + photo). */
export async function renderOg({ eyebrow, title, cover }: { eyebrow: string; title: string; cover?: string }) {
  const [serif, logoLight, logo] = await Promise.all([
    readFile(join(process.cwd(), "src", "assets", "DMSerifDisplay-Regular.ttf")),
    brand("logo-light.png").then((b) => toDataUri(b, "image/png")),
    brand("logo.png").then((b) => toDataUri(b, "image/png")),
  ]);
  const coverSrc = cover ? toDataUri(await blogCover(cover.split("/").pop()!), "image/jpeg") : null;
  const fonts = [{ name: "Serif", data: serif, weight: 400 as const, style: "normal" as const }];
  const titleSize = title.length > 70 ? 52 : title.length > 45 ? 60 : 72;

  if (coverSrc) {
    return new ImageResponse(
      (
        <div style={{ display: "flex", width: "100%", height: "100%", fontFamily: "Serif" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              width: 640,
              height: "100%",
              padding: "56px 60px",
              background: WINE,
              color: "white",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logoLight} height={64} alt="" style={{ objectFit: "contain", objectPosition: "left" }} />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", fontSize: 24, letterSpacing: 2, textTransform: "uppercase", opacity: 0.8 }}>
                {eyebrow}
              </div>
              <div style={{ display: "flex", marginTop: 20, fontSize: titleSize - 8, lineHeight: 1.08 }}>{title}</div>
            </div>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={coverSrc} width={560} height={630} alt="" style={{ objectFit: "cover" }} />
        </div>
      ),
      { ...ogSize, fonts },
    );
  }

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          padding: "60px 72px",
          background: CANVAS,
          color: INK,
          fontFamily: "Serif",
          borderBottom: `24px solid ${WINE}`,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logo} height={80} alt="" style={{ objectFit: "contain", objectPosition: "left" }} />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 26, letterSpacing: 3, textTransform: "uppercase", color: WINE }}>
            {eyebrow}
          </div>
          <div style={{ display: "flex", marginTop: 22, fontSize: titleSize, lineHeight: 1.05, maxWidth: 1000 }}>{title}</div>
        </div>
      </div>
    ),
    { ...ogSize, fonts },
  );
}
