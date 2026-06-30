"use client";

import { useEffect, useRef, useState } from "react";
import {
  Svg, Pa, Arrow, Check, PriceCard,
  LOGO, SPACE, sectionWrap, kicker, h2style, glassBtn, inputStyle,
} from "@/lib/ui";
import {
  whyFeatures, appFeatures, contentCats, products, compareRows,
  specs, inbox, steps, testimonials, faqData, TVTABS, TVSETS,
} from "@/lib/data";

export default function UltraX() {
  const [scrolled, setScrolled] = useState(false);
  const [mega, setMega] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [prod, setProd] = useState(0);
  const [slide, setSlide] = useState(0);
  const [faq, setFaq] = useState<number>(0);
  const [annual, setAnnual] = useState(false);
  const [formMsg, setFormMsg] = useState("We typically reply within a few minutes.");
  const [tvTab, setTvTab] = useState(0);
  const glowRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    document.documentElement.style.scrollBehavior = "smooth";

    // reveal
    const io = new IntersectionObserver(
      (ents) => ents.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
      { threshold: 0.08, rootMargin: "0px 0px -6% 0px" },
    );
    root.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));

    // counters
    const cio = new IntersectionObserver(
      (ents) => ents.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target as HTMLElement;
        cio.unobserve(el);
        const to = parseFloat(el.dataset.count || "0");
        const dec = parseInt(el.dataset.dec || "0");
        const suf = el.dataset.suffix || "";
        const t0 = performance.now();
        const tick = (t: number) => {
          let p = Math.min(1, (t - t0) / 1700); p = 1 - Math.pow(1 - p, 3);
          const v = to * p;
          el.textContent = (dec > 0 ? v.toFixed(dec) : Math.round(v).toLocaleString("en-US")) + suf;
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }),
      { threshold: 0.5 },
    );
    root.querySelectorAll("[data-count]").forEach((el) => cio.observe(el));

    // nav scroll
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // cursor glow
    const m = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const c = { ...m };
    const onMove = (e: MouseEvent) => { m.x = e.clientX; m.y = e.clientY; };
    window.addEventListener("mousemove", onMove, { passive: true });
    let raf = 0;
    const loop = () => {
      c.x += (m.x - c.x) * 0.12; c.y += (m.y - c.y) * 0.12;
      if (glowRef.current) glowRef.current.style.transform = `translate(${c.x}px,${c.y}px)`;
      raf = requestAnimationFrame(loop);
    };
    loop();

    // light parallax
    const plx = Array.from(root.querySelectorAll<HTMLElement>("[data-parallax]"));
    const onPlx = () => {
      const vh = window.innerHeight;
      plx.forEach((el) => {
        const sp = parseFloat(el.dataset.parallax || "0.1");
        const r = el.getBoundingClientRect();
        const prog = (vh - r.top) / (vh + r.height);
        el.style.transform = `translateY(${-(prog - 0.5) * sp * 240}px)`;
      });
    };
    onPlx();
    window.addEventListener("scroll", onPlx, { passive: true });

    return () => {
      io.disconnect(); cio.disconnect(); cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("scroll", onPlx);
      window.removeEventListener("mousemove", onMove);
      document.documentElement.style.scrollBehavior = "";
    };
  }, []);

  // Auto-cycle the TV showcase tabs: For You → Sports → Movies → Kids
  useEffect(() => {
    const id = setInterval(() => setTvTab((t) => (t + 1) % TVTABS.length), 2600);
    return () => clearInterval(id);
  }, []);

  const cur = products[prod];

  return (
    <div className="uxp" ref={rootRef} id="top">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap"
      />

      {/* grain */}
      <div style={{ position: "fixed", inset: 0, zIndex: 60, pointerEvents: "none", opacity: 0.05, mixBlendMode: "overlay", backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }} />

      {/* aurora */}
      <div style={{ position: "fixed", inset: "-20% -10%", zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-10%", left: "8%", width: "48vw", height: "48vw", borderRadius: "50%", background: "radial-gradient(circle at 50% 50%, var(--accent), transparent 62%)", filter: "blur(70px)", opacity: 0.4, animation: "auroraA 22s ease-in-out infinite" }} />
        <div style={{ position: "absolute", top: "6%", right: "2%", width: "42vw", height: "42vw", borderRadius: "50%", background: "radial-gradient(circle at 50% 50%, var(--accent2), transparent 62%)", filter: "blur(80px)", opacity: 0.3, animation: "auroraB 26s ease-in-out infinite" }} />
        <div style={{ position: "absolute", bottom: "-12%", left: "30%", width: "44vw", height: "44vw", borderRadius: "50%", background: "radial-gradient(circle at 50% 50%, var(--accent3), transparent 64%)", filter: "blur(90px)", opacity: 0.2, animation: "auroraC 30s ease-in-out infinite" }} />
      </div>
      <div ref={glowRef} style={{ position: "fixed", top: 0, left: 0, width: 520, height: 520, margin: "-260px 0 0 -260px", zIndex: 1, pointerEvents: "none", background: "radial-gradient(circle at 50% 50%, color-mix(in srgb, var(--accent) 55%, transparent), transparent 60%)", mixBlendMode: "screen", opacity: 0.35, willChange: "transform" }} />

      {/* offer bar */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 51, textAlign: "center", padding: "9px 16px", fontSize: 13, fontWeight: 500, background: "linear-gradient(90deg,var(--accent),var(--accent2),var(--accent3))", color: "#1c1404" }}>
        🎉 Get a <strong>FREE Mobile App</strong> with every Latest Box purchase — limited launch offer
      </div>

      {/* nav */}
      <nav style={{ position: "fixed", top: 48, left: "50%", transform: "translateX(-50%)", zIndex: 50, width: "min(1280px,92vw)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px 12px 22px", border: `1px solid ${scrolled ? "rgba(255,255,255,.13)" : "var(--line)"}`, borderRadius: 20, background: scrolled ? "rgba(10,8,16,.78)" : "rgba(10,8,16,.35)", backdropFilter: "blur(22px)", WebkitBackdropFilter: "blur(22px)", boxShadow: scrolled ? "0 16px 50px rgba(0,0,0,.45)" : "none", transition: "background .35s,border-color .35s,box-shadow .35s" }}>
        <a href="#top"><img src={LOGO} alt="Ultra X Player" style={{ height: 46, width: "auto", display: "block" }} /></a>
        <div data-navlinks style={{ display: "flex", alignItems: "center", gap: 4, fontSize: "14.5px", color: "var(--txt2)" }}>
          <a href="#top" style={{ padding: "9px 14px", borderRadius: 10 }}>Home</a>
          <div style={{ position: "relative" }} onMouseEnter={() => setMega(true)} onMouseLeave={() => setMega(false)}>
            <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 14px", borderRadius: 10, background: "none", border: "none", color: "inherit", fontSize: "14.5px" }}>
              Products
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" style={{ transition: "transform .25s", transform: mega ? "rotate(180deg)" : "rotate(0deg)" }}><path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            {mega && (
              <div style={{ position: "absolute", top: "calc(100% + 14px)", left: "50%", transform: "translateX(-50%)", width: 640, padding: 22, border: "1px solid var(--line)", borderRadius: 22, background: "rgba(14,12,20,.94)", backdropFilter: "blur(28px)", boxShadow: "0 30px 80px rgba(0,0,0,.6)", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                <div style={{ gridColumn: "1/-1", fontSize: 11, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--txt3)", padding: "4px 10px 8px" }}>The Ultra X lineup</div>
                {[["X", "Ultra Box X", "Flagship 4K box with AI & voice control.", "var(--accent)"], ["H3", "Hybrid 3", "Live TV, radio & on-demand in one.", "var(--accent3)"], ["P", "Pro Edition", "Ultra HD, OTT apps & cloud streaming.", "var(--accent2)"]].map(([k, n, d, col]) => (
                  <a key={n} href="#products" style={{ display: "flex", gap: 13, padding: 13, borderRadius: 14 }}>
                    <span style={{ flex: "none", width: 42, height: 42, borderRadius: 11, background: `color-mix(in srgb,${col} 18%,transparent)`, display: "grid", placeItems: "center", fontWeight: 600, color: col }}>{k}</span>
                    <span><span style={{ display: "block", fontWeight: 600, color: "var(--txt)", fontSize: "14.5px", marginBottom: 3 }}>{n}</span><span style={{ fontSize: "12.5px", color: "var(--txt2)", lineHeight: 1.45 }}>{d}</span></span>
                  </a>
                ))}
                <a href="#compare" style={{ display: "flex", gap: 13, padding: 13, borderRadius: 14 }}>
                  <span style={{ flex: "none", width: 42, height: 42, borderRadius: 11, background: "rgba(255,255,255,.06)", display: "grid", placeItems: "center" }}><Svg s={20}><Pa d="M4 6h7M4 12h7M4 18h7M16 6h4M16 12h4M16 18h4" c="#fff" w={1.6} /></Svg></span>
                  <span><span style={{ display: "block", fontWeight: 600, color: "var(--txt)", fontSize: "14.5px", marginBottom: 3 }}>Compare all models</span><span style={{ fontSize: "12.5px", color: "var(--txt2)", lineHeight: 1.45 }}>Side-by-side specs to find your fit.</span></span>
                </a>
              </div>
            )}
          </div>
          <a href="#setup" style={{ padding: "9px 14px", borderRadius: 10 }}>Setup</a>
          <a href="#app" style={{ padding: "9px 14px", borderRadius: 10 }}>Mobile App</a>
          <a href="#buy" style={{ padding: "9px 14px", borderRadius: 10 }}>Buy</a>
          <a href="#contact" style={{ padding: "9px 14px", borderRadius: 10 }}>Contact</a>
        </div>
        <div data-navcta style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <a href="#app" style={{ fontSize: "14.5px", color: "var(--txt2)", padding: "9px 8px" }}>Download App</a>
          <a href="#buy" style={{ fontSize: "14.5px", fontWeight: 700, color: "#1c1404", padding: "11px 22px", borderRadius: 12, background: "linear-gradient(135deg,var(--accent),var(--accent2))", boxShadow: "0 8px 24px color-mix(in srgb,var(--accent) 36%,transparent)" }}>Buy Now</a>
        </div>
        <button data-menubtn onClick={() => setMobile(true)} style={{ display: "none", width: 42, height: 42, borderRadius: 12, background: "var(--glass)", border: "1px solid var(--line)", color: "#fff", alignItems: "center", justifyContent: "center" }}>
          <Svg s={20}><Pa d="M4 7h16M4 12h16M4 17h16" c="#fff" w={1.8} /></Svg>
        </button>
      </nav>

      {mobile && (
        <div style={{ position: "fixed", inset: 0, zIndex: 52, background: "rgba(6,5,9,.97)", backdropFilter: "blur(20px)", display: "flex", flexDirection: "column", justifyContent: "center", gap: 6, padding: "0 8vw", fontFamily: SPACE }}>
          {[["#top", "Home"], ["#products", "Products"], ["#setup", "Setup"], ["#app", "Mobile App"], ["#contact", "Contact"]].map(([h, l]) => (
            <a key={h} href={h} onClick={() => setMobile(false)} style={{ fontSize: 32, fontWeight: 600, padding: "9px 0", color: "#fff" }}>{l}</a>
          ))}
          <a href="#buy" onClick={() => setMobile(false)} style={{ marginTop: 22, fontSize: 17, fontWeight: 700, color: "#1c1404", padding: 16, borderRadius: 14, background: "linear-gradient(135deg,var(--accent),var(--accent2))", textAlign: "center", fontFamily: "'Inter',sans-serif" }}>Buy Now</a>
          <button onClick={() => setMobile(false)} style={{ position: "absolute", top: 26, right: "8vw", width: 44, height: 44, borderRadius: 12, background: "var(--glass)", border: "1px solid var(--line)", color: "#fff" }}><Svg s={22}><Pa d="M6 6l12 12M18 6L6 18" c="#fff" w={1.8} /></Svg></button>
        </div>
      )}

      <main style={{ position: "relative", zIndex: 2 }}>
        {/* HERO */}
        <section data-feat-row style={{ position: "relative", padding: "184px 6vw 80px", maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "1.02fr .98fr", gap: 50, alignItems: "center" }}>
          <div>
            <div data-reveal style={{ display: "inline-flex", alignItems: "center", gap: 9, padding: "7px 16px", border: "1px solid var(--line)", borderRadius: 100, background: "var(--glass)", fontSize: 13, color: "var(--txt2)", marginBottom: 28 }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--accent3)", boxShadow: "0 0 10px var(--accent3)" }} />
              Now streaming in 12 countries
            </div>
            <h1 data-reveal style={{ fontFamily: SPACE, fontWeight: 600, fontSize: "clamp(40px,5.6vw,76px)", lineHeight: 1.0, letterSpacing: "-0.035em", margin: "0 0 22px" }}>
              The best entertainment box for your <span style={{ background: "linear-gradient(110deg,var(--accent),var(--accent2) 50%,var(--accent3))", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", backgroundSize: "200% auto", animation: "uxpShimmer 7s linear infinite" }}>whole family</span>
            </h1>
            <p data-reveal style={{ maxWidth: 520, fontSize: "clamp(16px,1.4vw,18.5px)", lineHeight: 1.6, color: "var(--txt2)", margin: "0 0 30px" }}>
              Watch live TV, movies, sports and on-demand entertainment — anytime, anywhere. Thousands of channels in your language, in stunning 4K, on one beautifully simple device.
            </p>
            <div data-hero-actions data-reveal style={{ display: "flex", gap: 13, marginBottom: 34 }}>
              <a href="#buy" style={{ display: "inline-flex", alignItems: "center", gap: 10, fontSize: "15.5px", fontWeight: 700, color: "#1c1404", padding: "16px 28px", borderRadius: 14, background: "linear-gradient(135deg,var(--accent),var(--accent2))", boxShadow: "0 12px 40px color-mix(in srgb,var(--accent) 40%,transparent)" }}>Buy Now <Arrow /></a>
              <a href="#app" style={{ display: "inline-flex", alignItems: "center", gap: 10, fontSize: "15.5px", fontWeight: 600, color: "#fff", padding: "16px 26px", borderRadius: 14, ...glassBtn, backdropFilter: "blur(10px)" }}><Svg s={17}><Pa d="M12 18.5v.01M8 3h8a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" c="#fff" w={1.6} /></Svg>Download App</a>
            </div>
            <div data-reveal style={{ display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap", fontSize: "13.5px", color: "var(--txt2)" }}>
              {["Free app included", "24×7 support", "Zero-buffer tech"].map((t) => (
                <span key={t} style={{ display: "flex", alignItems: "center", gap: 8 }}><Check c="var(--accent3)" />{t}</span>
              ))}
            </div>
          </div>

          {/* TV showcase */}
          <div data-reveal style={{ position: "relative" }}>
            <div data-parallax="0.05" style={{ position: "absolute", inset: "-12% -6% 20%", borderRadius: "50%", background: "radial-gradient(ellipse at 50% 40%, color-mix(in srgb,var(--accent) 55%,transparent), transparent 70%)", filter: "blur(60px)", opacity: 0.55, zIndex: -1 }} />
            <div style={{ position: "relative", border: "1px solid var(--line2)", borderRadius: 18, padding: 10, background: "linear-gradient(180deg,#1a1620,#0c0a12)", boxShadow: "0 50px 110px rgba(0,0,0,.7), inset 0 1px 0 rgba(255,255,255,.06)" }}>
              <div style={{ position: "relative", borderRadius: 11, overflow: "hidden", aspectRatio: "16/10", background: "linear-gradient(135deg,#120f1c,#0a0810)" }}>
                <div style={{ position: "absolute", inset: 0, opacity: 0.5, background: "radial-gradient(circle at 25% 20%,color-mix(in srgb,var(--accent) 40%,transparent),transparent 50%),radial-gradient(circle at 80% 80%,color-mix(in srgb,var(--accent3) 34%,transparent),transparent 55%)" }} />
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "30%", background: "linear-gradient(180deg,rgba(255,255,255,.06),transparent)", pointerEvents: "none", animation: "scanline 6s linear infinite" }} />
                <div style={{ position: "relative", padding: 16 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                    <span style={{ fontFamily: SPACE, fontSize: 13, fontWeight: 600 }}>Ultra X Home</span>
                    <span style={{ display: "flex", gap: 6, alignItems: "center", fontSize: "9.5px", color: "var(--accent3)" }}><span style={{ width: 5, height: 5, borderRadius: "50%", background: "#FF4D4D", boxShadow: "0 0 6px #FF4D4D" }} />LIVE</span>
                  </div>
                  <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
                    {TVTABS.map((t, i) => {
                      const on = i === tvTab;
                      return (
                        <span key={t} style={{ fontSize: "9.5px", padding: "5px 11px", borderRadius: 100, background: on ? "rgba(255,255,255,.12)" : "transparent", fontWeight: on ? 600 : 400, color: on ? "#fff" : "var(--txt2)", transition: "background .3s, color .3s" }}>{t}</span>
                      );
                    })}
                  </div>
                  <div key={tvTab} style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8, animation: "fadeIn .6s ease" }}>
                    {TVSETS[tvTab].map((src, i) => (
                      <div key={i} style={{ position: "relative", aspectRatio: "2/3", borderRadius: 7, overflow: "hidden" }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={src} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,transparent 52%,rgba(0,0,0,.55))" }} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div style={{ width: "34%", height: 14, margin: "0 auto", background: "linear-gradient(180deg,#1a1620,#0c0a12)", borderRadius: "0 0 6px 6px" }} />
            <div style={{ width: "46%", height: 7, margin: "0 auto", background: "#0c0a12", borderRadius: 3 }} />

            <div style={{ position: "absolute", bottom: "-6%", left: "-7%", width: 130, padding: 13, borderRadius: 16, background: "rgba(16,13,22,.9)", border: "1px solid var(--line2)", backdropFilter: "blur(16px)", boxShadow: "0 24px 50px rgba(0,0,0,.55)", animation: "floatY 6s ease-in-out infinite" }}>
              <div style={{ aspectRatio: "1/1", borderRadius: 11, background: "linear-gradient(145deg,#1c1726,#0d0a14)", border: "1px solid var(--line)", display: "grid", placeItems: "center", position: "relative", overflow: "hidden" }}>
                <span style={{ position: "absolute", bottom: 9, right: 9, width: 7, height: 7, borderRadius: "50%", background: "var(--accent3)", boxShadow: "0 0 8px var(--accent3)", animation: "pulseGlow 1.6s infinite" }} />
                <span style={{ fontFamily: SPACE, fontWeight: 600, fontSize: 15, letterSpacing: "-0.02em", background: "linear-gradient(135deg,var(--accent),var(--accent3))", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>Ultra X</span>
              </div>
              <div style={{ fontSize: 10, color: "var(--txt2)", marginTop: 9, textAlign: "center" }}>4K Box · in the kit</div>
            </div>
            <div style={{ position: "absolute", top: "8%", right: "-8%", padding: "13px 15px", borderRadius: 16, background: "rgba(16,13,22,.9)", border: "1px solid var(--line2)", backdropFilter: "blur(16px)", boxShadow: "0 24px 50px rgba(0,0,0,.55)", animation: "floatY2 7s ease-in-out infinite", display: "flex", gap: 11, alignItems: "center" }}>
              <span style={{ width: 34, height: 34, borderRadius: 10, background: "color-mix(in srgb,var(--accent2) 20%,transparent)", display: "grid", placeItems: "center" }}><Svg s={17}><path d="M12 15a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3z" stroke="var(--accent2)" strokeWidth="1.6" /><Pa d="M19 11a7 7 0 0 1-14 0M12 18v3" c="var(--accent2)" w={1.6} /></Svg></span>
              <span><span style={{ display: "block", fontSize: 11, color: "var(--txt2)" }}>Just say it</span><span style={{ display: "block", fontSize: 14, fontWeight: 600 }}>Voice search</span></span>
            </div>
          </div>
        </section>

        {/* FEATURE BAR */}
        <section style={{ padding: "30px 6vw 70px", maxWidth: 1280, margin: "0 auto" }}>
          <div data-reveal data-featbar style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
            {[["M12 2a10 10 0 1 0 10 10|M12 6v6l4 2", "var(--accent)", "24×7 Customer", "Support"], ["rect", "var(--accent3)", "Thousands of", "Live Channels"], ["M4 5h16v14H4z|M4 9h16M9 5v4M15 5v4M9 19v-4M15 19v-4M4 15h16", "var(--accent2)", "Unlimited Movies", "& TV Shows"], ["M7 2h10v20H7z|M11 18h2", "var(--accent)", "FREE Mobile", "App Included"]].map(([p, col, a, b], i) => (
              <div key={i} style={{ display: "flex", gap: 13, alignItems: "center", padding: "20px 22px", border: "1px solid var(--line)", borderRadius: 18, background: "var(--glass)" }}>
                <span style={{ flex: "none", width: 42, height: 42, borderRadius: 12, background: `color-mix(in srgb,${col} 16%,transparent)`, display: "grid", placeItems: "center" }}>
                  <Svg s={21}>{p === "rect" ? (<><rect x="3" y="5" width="18" height="13" rx="2" stroke={col as string} strokeWidth="1.7" /><Pa d="M8 21h8M10 11l4 2.5-4 2.5v-5z" c={col as string} w={1.5} /></>) : (p as string).split("|").map((d, j) => <Pa key={j} d={d} c={col as string} />)}</Svg>
                </span>
                <span style={{ fontSize: "14.5px", fontWeight: 600, lineHeight: 1.3 }}>{a}<br />{b}</span>
              </div>
            ))}
          </div>
        </section>

        {/* MARQUEE */}
        <section style={{ padding: "30px 0 60px", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
          <p data-reveal style={{ textAlign: "center", fontSize: "12.5px", letterSpacing: ".18em", textTransform: "uppercase", color: "var(--txt3)", margin: "0 0 30px" }}>Streaming the channels you love</p>
          <div style={{ position: "relative", overflow: "hidden", WebkitMaskImage: "linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent)", maskImage: "linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent)" }}>
            <div style={{ display: "flex", gap: 60, width: "max-content", animation: "uxpMarquee 34s linear infinite", alignItems: "center", fontFamily: SPACE, fontSize: 21, fontWeight: 600, color: "#fff", opacity: 0.5 }}>
              {Array.from({ length: 2 }).flatMap((_, k) => ["Live Sports", "Cinema", "News 24/7", "Kids Zone", "Music TV", "Regional", "Documentaries", "Web Series"].map((t, i) => <span key={`${k}-${i}`}>{t}</span>))}
            </div>
          </div>
        </section>

        {/* WHY */}
        <section id="why" style={sectionWrap(1280)}>
          <div data-feat-row style={{ display: "grid", gridTemplateColumns: ".9fr 1.1fr", gap: 60, alignItems: "center" }}>
            <div data-reveal>
              <span style={kicker("var(--accent)")}>Why choose Ultra X</span>
              <h2 style={{ ...h2style, fontSize: "clamp(32px,4.6vw,56px)", lineHeight: 1.03, margin: "16px 0 18px" }}>Entertainment, made simple</h2>
              <p style={{ fontSize: 16, lineHeight: 1.65, color: "var(--txt2)", margin: "0 0 26px", maxWidth: 440 }}>Transform your television into a complete entertainment hub with advanced streaming technology, crystal-clear picture quality, and an interface anyone in the family can use.</p>
              <a href="#products" style={{ display: "inline-flex", alignItems: "center", gap: 9, fontSize: 15, fontWeight: 600, color: "#fff", padding: "13px 22px", borderRadius: 13, ...glassBtn }}>Explore the lineup <Arrow c="#fff" /></a>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {whyFeatures.map((f) => (
                <div key={f.t} data-reveal style={{ padding: 22, border: "1px solid var(--line)", borderRadius: 18, background: "var(--surface)" }}>
                  <span style={{ display: "inline-grid", placeItems: "center", width: 42, height: 42, borderRadius: 12, background: `color-mix(in srgb,${f.c} 16%,transparent)`, marginBottom: 16 }}><Svg s={21}>{f.i}</Svg></span>
                  <h3 style={{ fontSize: 16, fontWeight: 600, margin: "0 0 6px", fontFamily: SPACE }}>{f.t}</h3>
                  <p style={{ fontSize: 13, color: "var(--txt2)", margin: 0, lineHeight: 1.5 }}>{f.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* MOBILE APP */}
        <section id="app" style={{ padding: "clamp(70px,9vw,120px) 6vw", maxWidth: 1280, margin: "0 auto" }}>
          <div data-app-grid style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
            <div data-reveal style={{ position: "relative", display: "flex", justifyContent: "center" }}>
              <div data-parallax="0.06" style={{ position: "absolute", inset: "6% 20%", borderRadius: "50%", background: "radial-gradient(circle,color-mix(in srgb,var(--accent2) 50%,transparent),transparent 65%)", filter: "blur(55px)", opacity: 0.5, zIndex: -1 }} />
              <div style={{ position: "relative" }}>
                {/* side buttons */}
                <div style={{ position: "absolute", left: -3, top: 104, width: 3, height: 24, borderRadius: 3, background: "#0d0a12" }} />
                <div style={{ position: "absolute", left: -3, top: 140, width: 3, height: 40, borderRadius: 3, background: "#0d0a12" }} />
                <div style={{ position: "absolute", left: -3, top: 188, width: 3, height: 40, borderRadius: 3, background: "#0d0a12" }} />
                <div style={{ position: "absolute", right: -3, top: 156, width: 3, height: 58, borderRadius: 3, background: "#0d0a12" }} />
                <div style={{ width: 258, border: "9px solid #14111c", borderRadius: 44, background: "#0a0810", boxShadow: "0 44px 90px rgba(0,0,0,.6), inset 0 1px 0 rgba(255,255,255,.05)", overflow: "hidden", position: "relative" }}>
                  {/* dynamic island */}
                  <div style={{ position: "absolute", top: 12, left: "50%", transform: "translateX(-50%)", width: 62, height: 21, background: "#000", borderRadius: 12, zIndex: 3 }} />
                  <div style={{ aspectRatio: "9/19.3", background: "radial-gradient(circle at 50% 0%,color-mix(in srgb,var(--accent) 22%,transparent),#0a0810 52%)", display: "flex", flexDirection: "column" }}>
                    {/* status bar */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 18px 7px", fontSize: 12, fontWeight: 700, letterSpacing: ".02em", whiteSpace: "nowrap" }}>
                      <span style={{ flexShrink: 0 }}>9:41</span>
                      <span style={{ display: "flex", gap: 5, alignItems: "center", flexShrink: 0 }}>
                        {/* cellular */}
                        <svg width="18" height="11" viewBox="0 0 18 11" fill="#fff"><rect x="0" y="7" width="3" height="4" rx="1" /><rect x="5" y="4.5" width="3" height="6.5" rx="1" /><rect x="10" y="2" width="3" height="9" rx="1" /><rect x="15" y="0" width="3" height="11" rx="1" /></svg>
                        {/* wifi */}
                        <svg width="16" height="12" viewBox="0 0 16 12" fill="#fff"><path d="M8 2.3c2.6 0 5 1 6.8 2.7.2.2.2.5 0 .7l-.85.85c-.2.2-.5.2-.7 0A7.4 7.4 0 0 0 8 4.2 7.4 7.4 0 0 0 2.75 6.55c-.2.2-.5.2-.7 0L1.2 5.7a.5.5 0 0 1 0-.7A9.6 9.6 0 0 1 8 2.3z" /><path d="M8 5.9c1.4 0 2.7.55 3.7 1.5.2.2.2.45 0 .6l-.9.9c-.18.18-.42.18-.6 0A2.95 2.95 0 0 0 8 8a2.95 2.95 0 0 0-2.2.9c-.18.18-.42.18-.6 0l-.9-.9a.4.4 0 0 1 0-.6A5.1 5.1 0 0 1 8 5.9z" /><path d="M8 9.3c.5 0 1 .2 1.4.6.2.2.18.45 0 .6l-1.05 1.05c-.2.2-.5.2-.7 0L6.6 10.5a.4.4 0 0 1 0-.6c.4-.4.9-.6 1.4-.6z" /></svg>
                        {/* battery */}
                        <span style={{ display: "inline-flex", alignItems: "center" }}>
                          <span style={{ width: 23, height: 11, borderRadius: 3.5, border: "1px solid rgba(255,255,255,.55)", padding: 1.5, display: "inline-flex" }}><span style={{ flex: 1, background: "#fff", borderRadius: 1.5 }} /></span>
                          <span style={{ width: 1.5, height: 4, background: "rgba(255,255,255,.55)", borderRadius: "0 1px 1px 0", marginLeft: 0.5 }} />
                        </span>
                      </span>
                    </div>
                    {/* content */}
                    <div style={{ flex: 1, padding: "6px 14px 0", overflow: "hidden" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                        <span style={{ display: "flex", alignItems: "center", gap: 7 }}>
                          <span style={{ width: 25, height: 25, borderRadius: 8, background: "linear-gradient(135deg,var(--accent),var(--accent2))", display: "grid", placeItems: "center", fontFamily: SPACE, fontWeight: 700, fontSize: 14, color: "#1c1404", boxShadow: "0 4px 12px color-mix(in srgb,var(--accent) 35%,transparent)" }}>X</span>
                          <span style={{ fontFamily: SPACE, fontWeight: 600, fontSize: 14, letterSpacing: "-0.01em" }}>Ultra X</span>
                        </span>
                        <span style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg,var(--accent),var(--accent2))", display: "grid", placeItems: "center", fontSize: 11, fontWeight: 700, color: "#1c1404" }}>A</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 12px", borderRadius: 11, background: "rgba(255,255,255,.06)", border: "1px solid var(--line)", marginBottom: 13, fontSize: 11, color: "var(--txt2)" }}>
                        <Svg s={13}><circle cx="11" cy="11" r="7" stroke="var(--txt2)" strokeWidth="1.6" /><Pa d="M21 21l-4-4" c="var(--txt2)" w={1.6} /></Svg>Search shows, channels…
                      </div>
                      <div style={{ position: "relative", borderRadius: 14, overflow: "hidden", marginBottom: 14 }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/tiles/cricket.jpg" alt="" style={{ width: "100%", aspectRatio: "16/10", objectFit: "cover", display: "block" }} />
                        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,transparent 38%,rgba(0,0,0,.82))" }} />
                        <span style={{ position: "absolute", top: 8, left: 8, fontSize: 9, fontWeight: 700, color: "#fff", background: "#FF3B3B", padding: "3px 7px", borderRadius: 5, display: "flex", alignItems: "center", gap: 4 }}><span style={{ width: 4, height: 4, borderRadius: "50%", background: "#fff" }} />LIVE</span>
                        <span style={{ position: "absolute", top: 8, right: 8, fontSize: 9, color: "#fff", background: "rgba(0,0,0,.5)", padding: "3px 7px", borderRadius: 5 }}>Ch 204</span>
                        <span style={{ position: "absolute", top: "40%", left: "50%", transform: "translate(-50%,-50%)", width: 34, height: 34, borderRadius: "50%", background: "rgba(255,255,255,.92)", display: "grid", placeItems: "center" }}><svg width="15" height="15" viewBox="0 0 24 24" fill="#000"><path d="M8 5v14l11-7z" /></svg></span>
                        <span style={{ position: "absolute", bottom: 8, left: 10, right: 10, fontSize: "11.5px", fontWeight: 600, color: "#fff" }}>Premier League · Final</span>
                      </div>
                      <div style={{ display: "flex", gap: 6, marginBottom: 13 }}>
                        {["Sports", "Movies", "Kids", "News"].map((t, i) => (
                          <span key={t} style={{ fontSize: "9.5px", padding: "5px 10px", borderRadius: 100, background: i === 0 ? "linear-gradient(135deg,var(--accent),var(--accent2))" : "rgba(255,255,255,.06)", color: i === 0 ? "#1c1404" : "var(--txt2)", fontWeight: i === 0 ? 700 : 500 }}>{t}</span>
                        ))}
                      </div>
                      <div style={{ fontSize: 11, fontWeight: 600, marginBottom: 8 }}>Trending now</div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
                        {["/tiles/sets/sports/1.jpg", "/tiles/sets/movies/1.jpg", "/tiles/music.jpg"].map((src) => (
                          <div key={src} style={{ aspectRatio: "3/4", borderRadius: 9, overflow: "hidden" }}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* bottom tab bar */}
                    <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center", padding: "10px 10px 13px", borderTop: "1px solid var(--line)", background: "rgba(0,0,0,.35)" }}>
                      {[["M3 11l9-8 9 8M5 10v10h6v-6h2v6h6V10", "Home", true], ["M4 6h16v11H4zM9 9.5l5 3-5 3z", "Live", false], ["M4 5h7v14H4zM13 5h7v14h-7z", "Library", false], ["M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM5 21a7 7 0 0 1 14 0", "Profile", false]].map(([d, label, on]) => (
                        <span key={label as string} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
                          <Svg s={18} c={on ? "var(--accent)" : "var(--txt3)"}><Pa d={d as string} c={on ? "var(--accent)" : "var(--txt3)"} w={1.7} /></Svg>
                          <span style={{ fontSize: "8.5px", color: on ? "var(--accent)" : "var(--txt3)", fontWeight: on ? 600 : 500 }}>{label}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div data-reveal>
              <span style={kicker("var(--accent2)")}>Free companion app</span>
              <h2 style={{ ...h2style, fontSize: "clamp(30px,4.4vw,52px)", margin: "16px 0 16px" }}>Your TV, now in your pocket</h2>
              <p style={{ fontSize: 16, lineHeight: 1.65, color: "var(--txt2)", margin: "0 0 26px", maxWidth: 460 }}>Control your whole TV experience right from your smartphone — and keep watching even when you leave the room.</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 11, maxWidth: 480, marginBottom: 30 }}>
                {appFeatures.map((a) => (
                  <div key={a} style={{ display: "flex", gap: 10, alignItems: "center", padding: "13px 15px", border: "1px solid var(--line)", borderRadius: 13, background: "var(--glass)", fontSize: 14, fontWeight: 500 }}><Svg s={16}><Pa d="M5 12l5 5L20 7" c="var(--accent3)" w={2.2} /></Svg>{a}</div>
                ))}
              </div>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                {[["GET IT ON", "Google Play"], ["Download on the", "App Store"]].map(([s, n]) => (
                  <a key={n} href="#app" style={{ display: "flex", alignItems: "center", gap: 11, padding: "12px 20px", borderRadius: 14, background: "#fff", color: "#000" }}><svg width="22" height="22" viewBox="0 0 24 24" fill="#000"><path d="M3 20.5V3.5c0-.4.5-.7.9-.5l14.7 8.5c.4.2.4.8 0 1L4.1 21c-.4.2-1-.1-1-.5z" /></svg><span><span style={{ display: "block", fontSize: 10, lineHeight: 1 }}>{s}</span><span style={{ display: "block", fontSize: 15, fontWeight: 600, lineHeight: 1.2 }}>{n}</span></span></a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CONTENT CATEGORIES */}
        <section style={{ padding: "clamp(70px,9vw,120px) 6vw", maxWidth: 1280, margin: "0 auto" }}>
          <div data-reveal style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 50px" }}>
            <span style={kicker("var(--accent3)")}>Why customers love us</span>
            <h2 style={h2style}>Every channel, every language</h2>
          </div>
          <div data-cats style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
            {contentCats.map((c) => (
              <div key={c.t} data-reveal style={{ position: "relative", aspectRatio: "4/5", borderRadius: 18, overflow: "hidden", border: "1px solid var(--line)" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={c.img} alt={c.t} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,transparent 38%,rgba(0,0,0,.82))" }} />
                <div style={{ position: "absolute", bottom: 16, left: 16, right: 16 }}>
                  <span style={{ display: "block", fontSize: 16, fontWeight: 600, fontFamily: SPACE, lineHeight: 1.2 }}>{c.t}</span>
                  <span style={{ display: "block", fontSize: 12, color: "rgba(255,255,255,.7)", marginTop: 3 }}>{c.m}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PRODUCTS TABS */}
        <section id="products" style={{ padding: "clamp(80px,10vw,140px) 6vw", maxWidth: 1280, margin: "0 auto" }}>
          <div data-reveal style={{ textAlign: "center", maxWidth: 660, margin: "0 auto 44px" }}>
            <span style={kicker("var(--accent)")}>The lineup</span>
            <h2 style={{ ...h2style, fontSize: "clamp(32px,4.6vw,58px)" }}>Find your perfect box</h2>
          </div>
          <div data-reveal style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 36, flexWrap: "wrap" }}>
            {products.map((p, i) => (
              <button key={p.label} onClick={() => setProd(i)} style={{ padding: "11px 22px", borderRadius: 12, fontSize: 14, fontWeight: 600, border: `1px solid ${prod === i ? "rgba(255,255,255,.18)" : "transparent"}`, background: prod === i ? "rgba(255,255,255,.08)" : "transparent", color: prod === i ? "#fff" : "var(--txt2)", transition: "all .25s" }}>{p.label}</button>
            ))}
          </div>
          <div style={{ position: "relative", border: "1px solid var(--line2)", borderRadius: 28, background: "linear-gradient(180deg,rgba(20,16,26,.8),rgba(9,7,13,.9))", backdropFilter: "blur(24px)", boxShadow: "0 40px 100px rgba(0,0,0,.6)", overflow: "hidden", padding: "clamp(28px,4vw,48px)" }}>
            <div style={{ position: "absolute", top: "-30%", right: "-10%", width: "50%", height: "90%", borderRadius: "50%", background: `radial-gradient(circle,${cur.glow},transparent 60%)`, filter: "blur(70px)", pointerEvents: "none", transition: "background .5s" }} />
            <div data-feat-row style={{ position: "relative", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }}>
              <div>
                <span style={{ display: "inline-block", fontSize: 12, fontWeight: 600, letterSpacing: ".04em", padding: "6px 14px", borderRadius: 100, border: "1px solid var(--line2)", color: cur.accent, marginBottom: 18 }}>{cur.badge}</span>
                <h3 style={{ fontFamily: SPACE, fontSize: "clamp(28px,3.4vw,42px)", fontWeight: 600, letterSpacing: "-0.02em", margin: "0 0 12px" }}>{cur.name}</h3>
                <p style={{ fontSize: "15.5px", lineHeight: 1.6, color: "var(--txt2)", margin: "0 0 24px", maxWidth: 440 }}>{cur.desc}</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 11, marginBottom: 28, maxWidth: 440 }}>
                  {cur.features.map((pf) => (<div key={pf} style={{ display: "flex", gap: 9, alignItems: "center", fontSize: 14, color: "#e6e4ec" }}><Check c={cur.accent} />{pf}</div>))}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap" }}>
                  <a href="#buy" style={{ display: "inline-flex", alignItems: "center", gap: 9, fontSize: 15, fontWeight: 700, color: "#1c1404", padding: "14px 26px", borderRadius: 13, background: "linear-gradient(135deg,var(--accent),var(--accent2))" }}>Buy {cur.name} <Arrow /></a>
                  <span style={{ fontSize: 13, color: "var(--txt2)" }}>{cur.price}</span>
                </div>
              </div>
              <div style={{ position: "relative", aspectRatio: "4/3", borderRadius: 20, border: "1px solid var(--line)", background: "radial-gradient(circle at 50% 40%,rgba(255,255,255,.05),transparent),linear-gradient(160deg,rgba(255,255,255,.03),transparent)", display: "grid", placeItems: "center", overflow: "hidden" }}>
                <div style={{ position: "absolute", width: "60%", aspectRatio: "1", borderRadius: "50%", background: `radial-gradient(circle,${cur.glow},transparent 65%)`, filter: "blur(40px)" }} />
                <div style={{ position: "relative", width: "54%", aspectRatio: "1", borderRadius: 26, background: "linear-gradient(145deg,#1c1726,#0d0a14)", border: "1px solid var(--line2)", display: "grid", placeItems: "center", boxShadow: "0 30px 60px rgba(0,0,0,.5)" }}>
                  <span style={{ position: "absolute", bottom: 14, right: 14, width: 8, height: 8, borderRadius: "50%", background: cur.accent, boxShadow: `0 0 10px ${cur.accent}`, animation: "pulseGlow 1.8s infinite" }} />
                  <span style={{ fontFamily: SPACE, fontWeight: 600, fontSize: "clamp(20px,2.4vw,30px)", letterSpacing: "-0.02em", background: "linear-gradient(135deg,var(--accent),var(--accent3))", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>{cur.short}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* COMPARE */}
        <section id="compare" style={{ padding: "clamp(70px,9vw,120px) 6vw", maxWidth: 1080, margin: "0 auto" }}>
          <div data-reveal style={{ textAlign: "center", marginBottom: 44 }}>
            <span style={kicker("var(--accent3)")}>Compare products</span>
            <h2 style={{ ...h2style, fontSize: "clamp(30px,4.4vw,52px)" }}>Side by side</h2>
          </div>
          <div data-reveal style={{ border: "1px solid var(--line2)", borderRadius: 24, overflow: "hidden", background: "var(--surface)" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "rgba(255,255,255,.03)" }}>
                  <th style={{ textAlign: "left", padding: "20px 22px", fontSize: 13, fontWeight: 600, color: "var(--txt2)", borderBottom: "1px solid var(--line)" }}>Specification</th>
                  <th style={{ padding: "20px 16px", fontSize: 14, fontWeight: 600, borderBottom: "1px solid var(--line)" }}>Hybrid 3</th>
                  <th style={{ padding: "20px 16px", fontSize: 14, fontWeight: 600, borderBottom: "1px solid var(--line)" }}><span style={{ color: "var(--accent)" }}>Box X</span><span style={{ display: "block", fontSize: 10, color: "var(--accent3)", fontWeight: 500 }}>Most popular</span></th>
                  <th style={{ padding: "20px 16px", fontSize: 14, fontWeight: 600, borderBottom: "1px solid var(--line)" }}>Pro Edition</th>
                </tr>
              </thead>
              <tbody>
                {compareRows.map((r, i) => (
                  <tr key={r[0]} style={{ borderBottom: "1px solid var(--line)", background: i % 2 ? "rgba(255,255,255,.015)" : undefined }}>
                    <td style={{ textAlign: "left", padding: "15px 22px", fontSize: "13.5px", color: "var(--txt2)" }}>{r[0]}</td>
                    <td style={{ padding: "15px 16px", textAlign: "center", fontSize: "13.5px" }}>{r[2]}</td>
                    <td style={{ padding: "15px 16px", textAlign: "center", fontSize: "13.5px", fontWeight: 600, background: "color-mix(in srgb,var(--accent) 7%,transparent)" }}>{r[1]}</td>
                    <td style={{ padding: "15px 16px", textAlign: "center", fontSize: "13.5px" }}>{r[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* SPECS + INBOX */}
        <section style={{ padding: "clamp(70px,9vw,120px) 6vw", maxWidth: 1280, margin: "0 auto" }}>
          <div data-feat-row style={{ display: "grid", gridTemplateColumns: "1.45fr 1fr", gap: 48, alignItems: "start" }}>
            <div>
              <div data-reveal style={{ marginBottom: 30 }}>
                <span style={{ ...kicker("var(--accent)"), display: "inline-block", lineHeight: 1 }}>Technical specifications</span>
                <h2 style={{ ...h2style, fontSize: "clamp(28px,3.6vw,46px)", lineHeight: 1.05, margin: "14px 0 0" }}>Built for serious streaming</h2>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 12 }}>
                {specs.map(([label, p]) => (
                  <div key={label} data-reveal style={{ display: "flex", gap: 12, alignItems: "center", padding: "16px 18px", border: "1px solid var(--line)", borderRadius: 14, background: "var(--glass)" }}>
                    <span style={{ flex: "none", width: 36, height: 36, borderRadius: 10, background: "rgba(255,255,255,.05)", display: "grid", placeItems: "center", color: "var(--accent3)" }}><Svg s={18}><Pa d={p} w={1.6} /></Svg></span>
                    <span style={{ fontSize: 14, fontWeight: 500 }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div data-reveal style={{ position: "relative", border: "1px solid var(--line2)", borderRadius: 24, padding: 30, background: "linear-gradient(160deg,color-mix(in srgb,var(--accent2) 12%,transparent),var(--surface))", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: "-20%", right: "-20%", width: "60%", height: "60%", borderRadius: "50%", background: "radial-gradient(circle,color-mix(in srgb,var(--accent2) 30%,transparent),transparent 60%)", filter: "blur(45px)" }} />
              <h3 style={{ position: "relative", fontFamily: SPACE, fontSize: 21, fontWeight: 600, margin: "0 0 6px" }}>What&apos;s inside the box</h3>
              <p style={{ position: "relative", fontSize: "13.5px", color: "var(--txt2)", margin: "0 0 22px" }}>Everything you need to start watching tonight.</p>
              <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 10 }}>
                {inbox.map(([label, p]) => (
                  <div key={label} style={{ display: "flex", gap: 13, alignItems: "center", padding: "13px 15px", border: "1px solid var(--line)", borderRadius: 13, background: "rgba(255,255,255,.03)" }}>
                    <span style={{ flex: "none", width: 34, height: 34, borderRadius: 9, background: "rgba(255,255,255,.06)", display: "grid", placeItems: "center", color: "var(--accent2)" }}><Svg s={18}><Pa d={p} w={1.6} /></Svg></span>
                    <span style={{ fontSize: "14.5px", fontWeight: 500 }}>{label}</span>
                    <span style={{ marginLeft: "auto", fontSize: 11, color: "var(--accent3)" }}>✓ Included</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SETUP TIMELINE */}
        <section id="setup" style={{ padding: "clamp(80px,10vw,140px) 6vw", maxWidth: 1100, margin: "0 auto" }}>
          <div data-reveal style={{ textAlign: "center", marginBottom: 60 }}>
            <span style={kicker("var(--accent3)")}>Setup guide</span>
            <h2 style={{ ...h2style, margin: "16px 0 8px" }}>From box to binge in 5 steps</h2>
            <p style={{ fontSize: 15, color: "var(--txt2)", maxWidth: 480, margin: "0 auto" }}>No technician, no hassle. The whole thing takes about five minutes.</p>
          </div>
          <div data-setup style={{ position: "relative", display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 14 }}>
            <div style={{ position: "absolute", left: "6%", right: "6%", top: 34, height: 2, background: "linear-gradient(90deg,var(--accent),var(--accent2),var(--accent3))", opacity: 0.35 }} />
            {steps.map((st) => (
              <div key={st.n} data-reveal style={{ position: "relative", textAlign: "center" }}>
                <span style={{ position: "relative", zIndex: 1, display: "inline-grid", placeItems: "center", width: 68, height: 68, borderRadius: "50%", background: "var(--bg)", border: "1px solid var(--line2)", marginBottom: 18, color: st.c }}><Svg s={26}><Pa d={st.p} c={st.c} w={1.6} /></Svg></span>
                <div style={{ fontFamily: SPACE, fontSize: 12, fontWeight: 600, color: st.c, letterSpacing: ".08em", marginBottom: 6 }}>STEP {st.n}</div>
                <h3 style={{ fontSize: "15.5px", fontWeight: 600, margin: "0 0 6px", fontFamily: SPACE }}>{st.t}</h3>
                <p style={{ fontSize: 13, color: "var(--txt2)", margin: 0, lineHeight: 1.5, padding: "0 6px" }}>{st.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* STATS */}
        <section style={{ padding: "30px 6vw", maxWidth: 1280, margin: "0 auto" }}>
          <div data-stats data-reveal style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24, padding: "44px 36px", border: "1px solid var(--line2)", borderRadius: 28, background: "linear-gradient(135deg,color-mix(in srgb,var(--accent) 12%,transparent),color-mix(in srgb,var(--accent3) 8%,transparent))", textAlign: "center" }}>
            {[["10000", "+", "0", "Live channels"], ["50000", "+", "0", "Movies & shows"], ["180", "K+", "0", "Happy families"], ["4.9", "★", "0", "Average rating"]].map(([count, suf, , label], i) => (
              <div key={label}>
                <div data-count={count} data-suffix={suf} data-dec={i === 3 ? "1" : "0"} style={{ fontFamily: SPACE, fontSize: "clamp(28px,3.6vw,46px)", fontWeight: 600, letterSpacing: "-0.02em" }}>0</div>
                <div style={{ fontSize: 13, color: "var(--txt2)", marginTop: 4 }}>{label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section id="reviews" style={{ padding: "clamp(80px,10vw,140px) 6vw", maxWidth: 1040, margin: "0 auto", overflow: "hidden" }}>
          <div data-reveal style={{ textAlign: "center", marginBottom: 44 }}>
            <span style={kicker("var(--accent)")}>Customer reviews</span>
            <h2 style={h2style}>Real stories from happy families</h2>
          </div>
          <div style={{ position: "relative", overflow: "hidden", borderRadius: 28 }}>
            <div style={{ display: "flex", width: "400%", transition: "transform .7s cubic-bezier(.16,1,.3,1)", transform: `translateX(-${slide * 25}%)` }}>
              {testimonials.map((t) => (
                <div key={t.name} style={{ width: "25%", flex: "none", padding: 6 }}>
                  <div style={{ border: "1px solid var(--line2)", borderRadius: 24, background: "linear-gradient(160deg,rgba(20,16,26,.7),rgba(10,8,13,.85))", backdropFilter: "blur(20px)", padding: 44, textAlign: "center" }}>
                    <div style={{ fontSize: 18, letterSpacing: 3, color: "var(--accent3)", marginBottom: 22 }}>★★★★★</div>
                    <p style={{ fontFamily: SPACE, fontSize: "clamp(19px,2.4vw,27px)", lineHeight: 1.42, fontWeight: 500, letterSpacing: "-0.02em", margin: "0 0 28px" }}>&ldquo;{t.q}&rdquo;</p>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 13 }}>
                      <span style={{ width: 46, height: 46, borderRadius: "50%", background: t.g, display: "grid", placeItems: "center", fontWeight: 600, fontSize: 16 }}>{t.in}</span>
                      <span style={{ textAlign: "left" }}><span style={{ display: "block", fontSize: 15, fontWeight: 600 }}>{t.name}</span><span style={{ display: "block", fontSize: 13, color: "var(--txt2)" }}>{t.role}</span></span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 16, marginTop: 30 }}>
            <button onClick={() => setSlide((s) => (s + 3) % 4)} style={{ width: 44, height: 44, borderRadius: "50%", ...glassBtn, color: "#fff", display: "grid", placeItems: "center" }}><Svg s={18}><Pa d="M15 6l-6 6 6 6" c="#fff" w={2} /></Svg></button>
            <div style={{ display: "flex", gap: 8 }}>
              {testimonials.map((_, i) => (<button key={i} onClick={() => setSlide(i)} style={{ width: slide === i ? 26 : 8, height: 8, borderRadius: 100, border: "none", cursor: "pointer", transition: "all .3s", background: slide === i ? "#fff" : "rgba(255,255,255,.25)" }} />))}
            </div>
            <button onClick={() => setSlide((s) => (s + 1) % 4)} style={{ width: 44, height: 44, borderRadius: "50%", ...glassBtn, color: "#fff", display: "grid", placeItems: "center" }}><Svg s={18}><Pa d="M9 6l6 6-6 6" c="#fff" w={2} /></Svg></button>
          </div>
          <div data-reveal style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 14, marginTop: 48 }}>
            {[["M12 2l2.4 6.9H22l-6 4.3 2.3 7-6.3-4.5L5.7 20l2.3-7-6-4.3h7.6L12 2z", "var(--accent3)", "Best Streaming Device 2025"], ["M12 2a10 10 0 1 0 10 10|M8 12l3 3 6-7", "var(--accent2)", "Trusted by 180K+ homes"], ["M12 2l2.4 6.9H22l-6 4.3 2.3 7-6.3-4.5L5.7 20l2.3-7-6-4.3h7.6L12 2z", "var(--accent)", "Editor's Choice Award"]].map(([p, col, label]) => (
              <span key={label} style={{ display: "flex", alignItems: "center", gap: 9, padding: "11px 20px", borderRadius: 100, border: "1px solid var(--line2)", background: "var(--glass)", fontSize: "13.5px", color: "#e6e4ec" }}><Svg s={16}>{(p as string).split("|").map((d, j) => <Pa key={j} d={d} c={col as string} w={1.5} />)}</Svg>{label}</span>
            ))}
          </div>
        </section>

        {/* PRICING */}
        <section id="buy" style={{ padding: "clamp(80px,10vw,140px) 6vw", maxWidth: 1180, margin: "0 auto" }}>
          <div data-reveal style={{ textAlign: "center", marginBottom: 40 }}>
            <span style={kicker("var(--accent2)")}>Buy now</span>
            <h2 style={{ ...h2style, fontSize: "clamp(32px,4.6vw,56px)", margin: "16px 0 24px" }}>Choose your package</h2>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: 5, borderRadius: 100, border: "1px solid var(--line2)", background: "var(--glass)" }}>
              {[["Device only", false], ["+ 2-Year Plan", true]].map(([l, a]) => (
                <button key={String(l)} onClick={() => setAnnual(a as boolean)} style={{ padding: "9px 18px", borderRadius: 100, border: "none", cursor: "pointer", fontSize: "13.5px", fontWeight: 600, transition: "all .25s", display: "inline-flex", alignItems: "center", gap: 6, background: annual === a ? "#fff" : "transparent", color: annual === a ? "#000" : "var(--txt2)" }}>{l}{a ? <span style={{ fontSize: 11, color: annual ? "#000" : "var(--accent3)" }}>Best value</span> : null}</button>
              ))}
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(290px,1fr))", gap: 20, alignItems: "stretch" }}>
            <PriceCard title="Standard" sub="Hybrid 3 box for everyday viewing" price="$99" note="one-time" cta="Buy Standard" feats={["Hybrid 3 streaming box", "Bluetooth remote", "Free mobile app", "3 months subscription"]} chk="var(--accent)" />
            <div data-reveal style={{ position: "relative", border: "1px solid color-mix(in srgb,var(--accent) 45%,transparent)", borderRadius: 24, background: "linear-gradient(170deg,color-mix(in srgb,var(--accent) 14%,transparent),var(--surface))", padding: 32, display: "flex", flexDirection: "column", boxShadow: "0 30px 80px color-mix(in srgb,var(--accent) 18%,transparent)" }}>
              <span style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", fontSize: "11.5px", fontWeight: 600, letterSpacing: ".04em", padding: "6px 14px", borderRadius: 100, background: "linear-gradient(135deg,var(--accent),var(--accent2))", color: "#1c1404" }}>MOST POPULAR</span>
              <h3 style={{ fontSize: 17, fontWeight: 600, margin: "0 0 6px" }}>Premium</h3>
              <p style={{ fontSize: "13.5px", color: "var(--txt2)", margin: "0 0 24px" }}>Flagship Box X with everything on</p>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 6, marginBottom: 24 }}><span style={{ fontFamily: SPACE, fontSize: 46, fontWeight: 600, letterSpacing: "-0.02em" }}>${annual ? "249" : "149"}</span><span style={{ fontSize: 14, color: "var(--txt2)", marginBottom: 9 }}>{annual ? "+ 2yr plan" : "one-time"}</span></div>
              <a href="#contact" style={{ textAlign: "center", fontSize: "14.5px", fontWeight: 700, color: "#1c1404", padding: 13, borderRadius: 12, background: "linear-gradient(135deg,var(--accent),var(--accent2))", marginBottom: 26 }}>Buy Premium</a>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 13, fontSize: 14, color: "#e6e4ec" }}>
                {["Flagship Box X (4K + AI)", "Voice Bluetooth remote", "Free mobile app", annual ? "2 years subscription included" : "6 months subscription", "Priority 24×7 support"].map((f) => (<li key={f} style={{ display: "flex", gap: 10 }}><span style={{ color: "var(--accent3)" }}>✓</span>{f}</li>))}
              </ul>
            </div>
            <PriceCard title="Accessories" sub="Top up your setup" price="$19" note="from" cta="Shop add-ons" feats={["Spare voice remote", "Premium HDMI cable", "Wall mount kit", "Subscription recharge"]} chk="var(--accent2)" />
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" style={{ padding: "clamp(70px,9vw,120px) 6vw", maxWidth: 860, margin: "0 auto" }}>
          <div data-reveal style={{ textAlign: "center", marginBottom: 44 }}>
            <span style={kicker("var(--accent3)")}>FAQ</span>
            <h2 style={h2style}>Questions, answered</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {faqData.map(([q, a], i) => {
              const open = faq === i;
              return (
                <div key={q} data-reveal style={{ border: "1px solid var(--line)", borderRadius: 18, background: "var(--glass)", overflow: "hidden" }}>
                  <button onClick={() => setFaq(open ? -1 : i)} style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, padding: "22px 24px", background: "none", border: "none", color: "#fff", textAlign: "left", fontSize: 16, fontWeight: 500, fontFamily: SPACE }}>
                    {q}
                    <span style={{ flex: "none", width: 30, height: 30, borderRadius: "50%", background: "rgba(255,255,255,.06)", display: "grid", placeItems: "center", transition: "transform .3s", transform: open ? "rotate(45deg)" : "rotate(0deg)" }}><Svg s={15}><Pa d="M12 5v14M5 12h14" c="#fff" w={2} /></Svg></span>
                  </button>
                  <div style={{ maxHeight: open ? 260 : 0, overflow: "hidden", transition: "max-height .4s ease" }}>
                    <p style={{ margin: 0, padding: "0 24px 24px", fontSize: "14.5px", lineHeight: 1.65, color: "var(--txt2)" }}>{a}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" style={{ padding: "clamp(70px,9vw,120px) 6vw", maxWidth: 1180, margin: "0 auto" }}>
          <div data-feat-row style={{ display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: 48, alignItems: "start" }}>
            <div data-reveal>
              <span style={kicker("var(--accent)")}>Contact us</span>
              <h2 style={{ ...h2style, fontSize: "clamp(30px,4.2vw,50px)", margin: "16px 0 16px" }}>We&apos;re here, 24×7</h2>
              <p style={{ fontSize: "15.5px", lineHeight: 1.65, color: "var(--txt2)", margin: "0 0 28px", maxWidth: 420 }}>Real people, ready to help — by phone, email, or chat. Most questions are answered in minutes.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <a href="#contact" style={{ display: "flex", gap: 13, alignItems: "center", padding: "16px 18px", border: "1px solid var(--line)", borderRadius: 14, background: "var(--glass)" }}><span style={{ flex: "none", width: 40, height: 40, borderRadius: 11, background: "color-mix(in srgb,var(--accent) 16%,transparent)", display: "grid", placeItems: "center" }}><Svg s={19}><Pa d="M3 5c0 9 7 16 16 16l2.5-3.5-4.5-2-2 2c-3-1.5-5.5-4-7-7l2-2-2-4.5L4.5 3C3.7 3.5 3 4.2 3 5z" c="var(--accent)" w={1.5} /></Svg></span><span><span style={{ display: "block", fontSize: 12, color: "var(--txt2)" }}>Phone</span><span style={{ display: "block", fontSize: 15, fontWeight: 600 }}>+1 (800) 555-0142</span></span></a>
                <a href="#contact" style={{ display: "flex", gap: 13, alignItems: "center", padding: "16px 18px", border: "1px solid var(--line)", borderRadius: 14, background: "var(--glass)" }}><span style={{ flex: "none", width: 40, height: 40, borderRadius: 11, background: "color-mix(in srgb,var(--accent3) 16%,transparent)", display: "grid", placeItems: "center" }}><Svg s={19}><rect x="3" y="5" width="18" height="14" rx="2" stroke="var(--accent3)" strokeWidth="1.5" /><Pa d="M3 7l9 6 9-6" c="var(--accent3)" w={1.5} /></Svg></span><span><span style={{ display: "block", fontSize: 12, color: "var(--txt2)" }}>Email</span><span style={{ display: "block", fontSize: 15, fontWeight: 600 }}>support@ultraxplayer.com</span></span></a>
              </div>
              <p style={{ fontSize: 13, color: "var(--txt3)", margin: "22px 0 0", display: "flex", alignItems: "center", gap: 8 }}><span style={{ width: 7, height: 7, borderRadius: "50%", background: "#28c840", boxShadow: "0 0 8px #28c840" }} />Support open 24 hours · 7 days a week</p>
            </div>
            <div data-reveal style={{ position: "relative", overflow: "hidden", border: "1px solid var(--line2)", borderRadius: 28, padding: "clamp(28px,3vw,40px)", background: "linear-gradient(160deg,color-mix(in srgb,var(--accent) 12%,transparent),var(--surface))" }}>
              <div style={{ position: "absolute", top: "-20%", right: "-15%", width: "55%", height: "55%", borderRadius: "50%", background: "radial-gradient(circle,color-mix(in srgb,var(--accent2) 28%,transparent),transparent 60%)", filter: "blur(50px)" }} />
              <form onSubmit={(e) => { e.preventDefault(); setFormMsg("✓ Thanks — our team will get back to you shortly."); (e.target as HTMLFormElement).reset(); }} style={{ position: "relative", display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  <label style={{ display: "flex", flexDirection: "column", gap: 7, fontSize: 13, color: "var(--txt2)" }}>Name<input required placeholder="Your name" style={inputStyle} /></label>
                  <label style={{ display: "flex", flexDirection: "column", gap: 7, fontSize: 13, color: "var(--txt2)" }}>Phone<input placeholder="+1 ..." style={inputStyle} /></label>
                </div>
                <label style={{ display: "flex", flexDirection: "column", gap: 7, fontSize: 13, color: "var(--txt2)" }}>Email<input type="email" required placeholder="you@email.com" style={inputStyle} /></label>
                <label style={{ display: "flex", flexDirection: "column", gap: 7, fontSize: 13, color: "var(--txt2)" }}>Message<textarea required rows={4} placeholder="How can we help?" style={{ ...inputStyle, resize: "vertical" }} /></label>
                <button type="submit" style={{ marginTop: 4, fontSize: 15, fontWeight: 700, color: "#1c1404", padding: 15, borderRadius: 13, background: "linear-gradient(135deg,var(--accent),var(--accent2))", border: "none" }}>Send message</button>
                <p style={{ fontSize: "12.5px", color: "var(--txt3)", margin: "2px 0 0", textAlign: "center" }}>{formMsg}</p>
              </form>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section style={{ padding: "30px 6vw clamp(60px,8vw,100px)", maxWidth: 1180, margin: "0 auto" }}>
          <div data-reveal style={{ position: "relative", overflow: "hidden", border: "1px solid var(--line2)", borderRadius: 36, padding: "clamp(40px,6vw,80px)", textAlign: "center", background: "linear-gradient(135deg,color-mix(in srgb,var(--accent) 18%,transparent),color-mix(in srgb,var(--accent2) 12%,transparent),color-mix(in srgb,var(--accent3) 8%,transparent))" }}>
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 50% 0%,color-mix(in srgb,var(--accent) 26%,transparent),transparent 55%)" }} />
            <div style={{ position: "relative", maxWidth: 600, margin: "0 auto" }}>
              <h2 style={{ fontFamily: SPACE, fontWeight: 600, fontSize: "clamp(30px,4.8vw,58px)", lineHeight: 1.0, letterSpacing: "-0.035em", margin: "0 0 18px" }}>Bring the cinema home tonight</h2>
              <p style={{ fontSize: "clamp(16px,1.5vw,18.5px)", color: "var(--txt2)", lineHeight: 1.6, margin: "0 0 32px" }}>Join 180,000+ families streaming on Ultra X Player. Free app included with every box.</p>
              <div style={{ display: "flex", gap: 13, justifyContent: "center", flexWrap: "wrap" }}>
                <a href="#buy" style={{ display: "inline-flex", alignItems: "center", gap: 9, fontSize: "15.5px", fontWeight: 600, color: "#000", padding: "16px 30px", borderRadius: 14, background: "#fff" }}>Buy your box <Arrow c="#000" /></a>
                <a href="#app" style={{ display: "inline-flex", alignItems: "center", gap: 9, fontSize: "15.5px", fontWeight: 600, color: "#fff", padding: "16px 28px", borderRadius: 14, ...glassBtn }}>Download app</a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer style={{ position: "relative", zIndex: 2, borderTop: "1px solid var(--line)", padding: "64px 6vw 36px", maxWidth: 1280, margin: "0 auto" }}>
        <div data-footcols style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr 1fr 1fr 1fr", gap: 36, marginBottom: 48 }}>
          <div style={{ maxWidth: 300 }}>
            <a href="#top" style={{ display: "inline-flex", alignItems: "center", marginBottom: 16 }}><img src={LOGO} alt="Ultra X Player" style={{ height: 54, width: "auto", display: "block" }} /></a>
            <p style={{ fontSize: 14, color: "var(--txt2)", lineHeight: 1.6, margin: "0 0 20px" }}>Premium entertainment for families everywhere. Live TV, movies, sports and on-demand — on one beautifully simple box.</p>
          </div>
          {[["Quick Links", ["Home", "Buy Now", "Compare", "Accessories", "Blogs"]], ["Dealers", ["Become a Dealer", "Dealer Recharge", "Branding Downloads"]], ["Legal", ["Privacy Policy", "Terms & Conditions", "Return Policy", "Disclaimer"]], ["Countries", ["Australia · USA · UK · Canada · NZ · Europe · Japan · Singapore"]]].map(([title, items]) => (
            <div key={title as string}>
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 16, color: "#fff" }}>{title}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 11, fontSize: "13.5px", color: "var(--txt2)" }}>
                {(items as string[]).map((it) => <a key={it} href="#top">{it}</a>)}
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 14, paddingTop: 26, borderTop: "1px solid var(--line)", fontSize: 13, color: "var(--txt3)" }}>
          <span>© 2026 Ultra X Player. All rights reserved.</span>
          <span style={{ display: "flex", alignItems: "center", gap: 8 }}><span style={{ width: 7, height: 7, borderRadius: "50%", background: "#28c840", boxShadow: "0 0 8px #28c840" }} />All systems operational</span>
        </div>
      </footer>
    </div>
  );
}
