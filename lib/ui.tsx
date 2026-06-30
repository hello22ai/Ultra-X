import type { CSSProperties, ReactNode } from "react";

export const LOGO = "/logo.png";
export const SPACE = "'Space Grotesk',sans-serif";

type IconProps = { d?: string; c?: string; w?: number };

export const Svg = ({ s = 21, c, children }: { s?: number; c?: string; children: ReactNode }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" style={c ? { color: c } : undefined}>
    {children}
  </svg>
);
export const Pa = ({ d, c = "currentColor", w = 1.7 }: IconProps) => (
  <path d={d} stroke={c} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" />
);
export const Arrow = ({ c = "#1c1404" }: { c?: string }) => (
  <Svg s={16}><Pa d="M5 12h14M13 6l6 6-6 6" c={c} w={2} /></Svg>
);
export const Check = ({ c }: { c: string }) => (
  <Svg s={16}><circle cx="12" cy="12" r="10" stroke={c} strokeWidth="1.5" /><Pa d="M8 12l3 3 5-6" c={c} w={1.8} /></Svg>
);

export const sectionWrap = (max: number): CSSProperties => ({ padding: "clamp(70px,9vw,120px) 6vw", maxWidth: max, margin: "0 auto" });
export const kicker = (c: string): CSSProperties => ({ fontSize: "12.5px", letterSpacing: ".16em", textTransform: "uppercase", color: c });
export const h2style: CSSProperties = { fontFamily: SPACE, fontWeight: 600, fontSize: "clamp(30px,4.4vw,54px)", lineHeight: 1.04, letterSpacing: "-0.03em", margin: "16px 0 0" };
export const glassBtn: CSSProperties = { background: "var(--glass)", border: "1px solid var(--line2)" };
export const inputStyle: CSSProperties = { width: "100%", minWidth: 0, boxSizing: "border-box", padding: "14px 16px", borderRadius: 12, background: "rgba(0,0,0,.3)", border: "1px solid var(--line2)", color: "#fff", fontSize: 14, outline: "none", fontFamily: "inherit" };

export function PriceCard({ title, sub, price, note, cta, feats, chk }: { title: string; sub: string; price: string; note: string; cta: string; feats: string[]; chk: string }) {
  return (
    <div data-reveal style={{ border: "1px solid var(--line)", borderRadius: 24, background: "var(--surface)", padding: 32, display: "flex", flexDirection: "column" }}>
      <h3 style={{ fontSize: 17, fontWeight: 600, margin: "0 0 6px" }}>{title}</h3>
      <p style={{ fontSize: "13.5px", color: "var(--txt2)", margin: "0 0 24px" }}>{sub}</p>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 6, marginBottom: 24 }}><span style={{ fontFamily: SPACE, fontSize: 46, fontWeight: 600, letterSpacing: "-0.02em" }}>{price}</span><span style={{ fontSize: 14, color: "var(--txt2)", marginBottom: 9 }}>{note}</span></div>
      <a href="#contact" style={{ textAlign: "center", fontSize: "14.5px", fontWeight: 600, color: "#fff", padding: 13, borderRadius: 12, ...glassBtn, marginBottom: 26 }}>{cta}</a>
      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 13, fontSize: 14, color: "#d4d2dc" }}>
        {feats.map((f) => (<li key={f} style={{ display: "flex", gap: 10 }}><span style={{ color: chk }}>✓</span>{f}</li>))}
      </ul>
    </div>
  );
}
