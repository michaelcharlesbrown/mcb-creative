export const metadata = {
  title: "MCB Creative — Type Style Guide",
};

export default function StyleGuidePage() {
  return (
    <>
      <style>{`
        .sg-wrap {
          font-family: var(--font-family-mono);
          font-size: 12px;
          line-height: 1.6;
          color: #0a0a0a;
          background: #fcfcfc;
          padding: 60px 40px;
          max-width: 1100px;
          margin: 0 auto;
        }

        /* HEADER */
        .sg-header {
          border-bottom: 1px solid #0a0a0a;
          padding-bottom: 24px;
          margin-bottom: 80px;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
        }
        .sg-eyebrow {
          font-size: 10px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          opacity: 0.4;
          margin-bottom: 4px;
        }
        .sg-subtitle {
          font-size: 11px;
          opacity: 0.5;
        }

        /* NOTE BANNER */
        .sg-note {
          background: #fffbea;
          border-left: 3px solid #e5c200;
          padding: 12px 16px;
          font-size: 10px;
          line-height: 1.6;
          margin-bottom: 80px;
          opacity: 0.85;
        }

        /* SECTIONS */
        .sg-section {
          margin-bottom: 80px;
          padding-bottom: 80px;
          border-bottom: 1px solid rgba(10,10,10,0.12);
        }
        .sg-section:last-child {
          border-bottom: none;
        }
        .sg-section-label {
          font-size: 10px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          opacity: 0.35;
          margin-bottom: 40px;
          padding-bottom: 8px;
          border-bottom: 1px solid rgba(10,10,10,0.08);
        }

        /* ROW LAYOUT */
        .sg-row {
          display: grid;
          grid-template-columns: 140px 1fr;
          gap: 16px;
          align-items: baseline;
          margin-bottom: 40px;
        }
        .sg-meta {
          font-size: 10px;
          line-height: 1.5;
          opacity: 0.35;
          padding-top: 4px;
        }
        .sg-meta span { display: block; }
        .sg-token {
          font-size: 9px;
          background: rgba(10,10,10,0.06);
          padding: 2px 5px;
          border-radius: 2px;
          letter-spacing: 0.04em;
          display: inline-block;
          margin-top: 5px;
          opacity: 0.7;
        }

        /* HEADINGS — inherit from globals */
        .sg-wrap h1 { font-size: clamp(2.5rem, 5vw, 4.5rem); line-height: 1.05; letter-spacing: -0.02em; }
        .sg-wrap h2 { font-size: clamp(1.75rem, 3vw, 2.75rem); line-height: 1.1; letter-spacing: -0.015em; }
        .sg-wrap h3 { font-size: clamp(1.25rem, 2vw, 1.75rem); line-height: 1.2; letter-spacing: -0.01em; }
        .sg-wrap h4 { font-size: clamp(1rem, 1.5vw, 1.25rem); line-height: 1.3; letter-spacing: -0.005em; }
        .sg-wrap h1 { margin-bottom: 0; }
        .sg-wrap h2 { margin-bottom: 0; }
        .sg-wrap h3 { margin-bottom: 0; }
        .sg-wrap h4 { margin-bottom: 0; }

        /* BODY DEMO */
        .sg-body-demo p { margin-bottom: 14px; }
        .sg-body-demo p:last-child { margin-bottom: 0; }

        /* DISPLAY / WORDMARK */
        .sg-display {
          font-family: var(--font-family-wordmark), var(--font-family-headline);
          font-size: clamp(4rem, 12vw, 14rem);
          line-height: 0.9;
          letter-spacing: -0.03em;
          font-weight: 700;
        }

        /* LABELS */
        .sg-label {
          font-size: 10px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          opacity: 0.5;
        }

        /* INLINE SAMPLES */
        .sg-inline-samples {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .sg-wrap a {
          color: #0a0a0a;
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        .sg-wrap a:hover { opacity: 0.5; }

        /* IN CONTEXT */
        .sg-context-light {
          max-width: 640px;
        }
        .sg-context-light .sg-label { margin-bottom: 14px; }
        .sg-context-light h2 { margin-bottom: 14px; }
        .sg-context-light p { margin-bottom: 14px; }

        .sg-dark-panel {
          background: #0a0a0a;
          color: #fcfcfc;
          padding: 48px 40px;
          border-radius: 2px;
          max-width: 640px;
        }
        .sg-dark-panel .sg-label { color: #fcfcfc; opacity: 0.35; margin-bottom: 14px; }
        .sg-dark-panel h2 { color: #fcfcfc; margin-bottom: 14px; }
        .sg-dark-panel p { color: #fcfcfc; opacity: 0.75; margin-bottom: 14px; }
        .sg-dark-panel a { color: #fcfcfc; }

        /* TOKEN BLOCK */
        .sg-token-block {
          font-size: 11px;
          line-height: 1.8;
          background: rgba(10,10,10,0.04);
          padding: 28px 32px;
          border-radius: 2px;
          overflow-x: auto;
          opacity: 0.75;
        }

        /* NOTE UNDER DISPLAY */
        .sg-color-note {
          font-size: 10px;
          opacity: 0.35;
          margin-top: 8px;
        }
      `}</style>

      <div className="sg-wrap">

        {/* HEADER */}
        <div className="sg-header">
          <div>
            <div className="sg-eyebrow">MCB Creative</div>
            <div className="sg-subtitle">Typography Style Guide — v1</div>
          </div>
          <div className="sg-eyebrow">Edit CSS variables to dial in values</div>
        </div>

        {/* HOW TO USE */}
        <div className="sg-note">
          ✦ HOW TO USE — This page inherits all fonts and tokens directly from globals.css and layout.tsx.
          Every change you make to the type system shows up here instantly.
          Use this as your ground truth before touching any other component.
        </div>

        {/* 01 — DISPLAY */}
        <div className="sg-section">
          <div className="sg-section-label">01 — Display / Wordmark (Clash Display)</div>
          <div className="sg-row">
            <div className="sg-meta">
              <span>Clash Display</span>
              <span>clamp 4–14rem</span>
              <span>lh 0.9</span>
              <span className="sg-token">--font-family-wordmark</span>
            </div>
            <div className="sg-display">MCB Creative</div>
          </div>
          <div className="sg-color-note">
            Clash Display loads via next/font/local in layout.tsx (`--font-family-wordmark`). Live hero/footer wordmarks use SVG files; this sample shows the display face only.
          </div>
        </div>

        {/* 02 — HEADLINES */}
        <div className="sg-section">
          <div className="sg-section-label">02 — Headlines (Geist Sans)</div>

          <div className="sg-row">
            <div className="sg-meta">
              <span>h1</span>
              <span>Geist 700</span>
              <span className="sg-token">--h1-size</span>
            </div>
            <h1>Creative Direction</h1>
          </div>

          <div className="sg-row">
            <div className="sg-meta">
              <span>h2</span>
              <span>Geist 700</span>
              <span className="sg-token">--h2-size</span>
            </div>
            <h2>Brand Identity & Motion</h2>
          </div>

          <div className="sg-row">
            <div className="sg-meta">
              <span>h3</span>
              <span>Geist 700</span>
              <span className="sg-token">--h3-size</span>
            </div>
            <h3>BitTorrent Global Rebrand</h3>
          </div>

          <div className="sg-row">
            <div className="sg-meta">
              <span>h4</span>
              <span>Geist 700</span>
              <span className="sg-token">--h4-size</span>
            </div>
            <h4>Project Overview</h4>
          </div>
        </div>

        {/* 03 — BODY */}
        <div className="sg-section">
          <div className="sg-section-label">03 — Body Copy (Geist Mono)</div>
          <div className="sg-row">
            <div className="sg-meta">
              <span>body / p</span>
              <span>Geist Mono 400</span>
              <span>12px / 1.6</span>
              <span className="sg-token">--font-family-mono</span>
            </div>
            <div className="sg-body-demo">
              <p>
                Michael Charles Brown is a Creative Director and designer based in Los Angeles
                with over 15 years of experience bridging visual identity, motion graphics, and
                technical execution. His practice spans branding, interactive design, and music —
                a rare combination that informs how he thinks about systems.
              </p>
              <p>
                Selected clients include BitTorrent, Avid Pro Tools, SparkPR, and ShiftDrink.
                He currently runs MCB Creative as an independent studio and serves as co-founder
                and Creative Director at ShiftDrink.
              </p>
            </div>
          </div>
        </div>

        {/* 04 — INLINE ELEMENTS */}
        <div className="sg-section">
          <div className="sg-section-label">04 — Inline Elements</div>

          <div className="sg-row">
            <div className="sg-meta">
              <span>a / link</span>
              <span>inherits body</span>
              <span>underline offset 3px</span>
            </div>
            <div className="sg-inline-samples">
              <div>This is a <a href="#">hyperlink that inherits</a> body styles with underline offset.</div>
              <div><a href="#">View case study →</a></div>
            </div>
          </div>

          <div className="sg-row">
            <div className="sg-meta">
              <span>label / small</span>
              <span>10px uppercase</span>
              <span>ls 0.08em</span>
            </div>
            <div className="sg-inline-samples">
              <span className="sg-label">Brand Identity — 2024</span>
              <span className="sg-label">Creative Direction / Motion</span>
              <span className="sg-label">01 — Selected Work</span>
            </div>
          </div>
        </div>

        {/* 05 — IN CONTEXT LIGHT */}
        <div className="sg-section">
          <div className="sg-section-label">05 — In Context (light)</div>
          <div className="sg-context-light">
            <div className="sg-label" style={{ marginBottom: 14 }}>Brand Identity — 2023</div>
            <h2>BitTorrent Global Rebrand</h2>
            <p style={{ marginTop: 14 }}>
              Led the complete visual identity overhaul for BitTorrent's transition from
              peer-to-peer utility to a creator-focused platform. Developed brand guidelines,
              motion language, and a counterculture-rooted visual system across all digital
              and physical touchpoints.
            </p>
            <a href="#">View case study →</a>
          </div>
        </div>

        {/* 06 — IN CONTEXT DARK */}
        <div className="sg-section">
          <div className="sg-section-label">06 — In Context (dark panel)</div>
          <div className="sg-dark-panel">
            <div className="sg-label">Selected Work</div>
            <h2>ShiftDrink</h2>
            <p>
              AI-powered training platform for the hospitality industry. Brand identity,
              marketing site, and product UI — all built from scratch.
            </p>
            <a href="#">View case study →</a>
          </div>
        </div>

        {/* 07 — TOKEN REFERENCE */}
        <div className="sg-section">
          <div className="sg-section-label">07 — Token Reference (copy to globals.css)</div>
          <pre className="sg-token-block">{`
:root {
  /* fonts — variables set in layout.tsx */
  /* --font-family-mono       Geist Mono  */
  /* --font-family-headline   Geist Sans  */
  /* --font-family-wordmark   Clash Display via next/font/local */

  /* base */
  font-size: 12px;

  /* heading scale */
  --h1-size: clamp(2.5rem, 5vw, 4.5rem);    --h1-lh: 1.05;  --h1-ls: -0.02em;
  --h2-size: clamp(1.75rem, 3vw, 2.75rem);  --h2-lh: 1.1;   --h2-ls: -0.015em;
  --h3-size: clamp(1.25rem, 2vw, 1.75rem);  --h3-lh: 1.2;   --h3-ls: -0.01em;
  --h4-size: clamp(1rem, 1.5vw, 1.25rem);   --h4-lh: 1.3;   --h4-ls: -0.005em;

  /* body */
  --body-lh: 1.6;

  /* labels */
  --small-size: 10px;
  --small-ls: 0.08em;
}

body {
  font-family: var(--font-family-mono);
  font-size: 12px;
  line-height: var(--body-lh);
  -webkit-font-smoothing: antialiased;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-family-headline);
  font-weight: 700;
  text-transform: none;
}

h1 { font-size: var(--h1-size); line-height: var(--h1-lh); letter-spacing: var(--h1-ls); }
h2 { font-size: var(--h2-size); line-height: var(--h2-lh); letter-spacing: var(--h2-ls); }
h3 { font-size: var(--h3-size); line-height: var(--h3-lh); letter-spacing: var(--h3-ls); }
h4 { font-size: var(--h4-size); line-height: var(--h4-lh); letter-spacing: var(--h4-ls); }

a { color: inherit; text-decoration: underline; text-underline-offset: 3px; }
          `}</pre>
        </div>

      </div>
    </>
  );
}