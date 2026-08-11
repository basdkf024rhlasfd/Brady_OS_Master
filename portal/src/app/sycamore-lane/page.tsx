import { requireProjectAccess } from "@/lib/portal-access";

export default async function SycamoreLanePage() {
  await requireProjectAccess("sycamore-lane");

  return (
    <>
      <style>{`
        :root {
          --sl-navy: #0d1b3e;
          --sl-navy-deep: #091430;
          --sl-navy-soft: #16264f;
          --sl-cream: #f5f1e8;
          --sl-cream-deep: #efe9dc;
          --sl-gold: #c9a450;
          --sl-gold-bright: #dcb968;
          --sl-text-dark: #1c2b4a;
          --sl-text-muted: #64748b;
          --sl-border: #e2ddd4;
          --sl-serif: var(--font-playfair, Georgia, serif);
          --sl-sans: var(--font-inter, system-ui, sans-serif);
        }

        #sl {
          font-family: var(--sl-sans); color: var(--sl-text-dark);
          margin: 0; padding: 0;
          -webkit-font-smoothing: antialiased;
          scroll-behavior: smooth;
        }
        #sl ::selection { background: var(--sl-gold); color: var(--sl-navy); }

        /* Shared editorial eyebrow */
        .sl-eyebrow {
          display: inline-flex; align-items: center; gap: 12px;
          color: var(--sl-gold); font-size: 11px; font-weight: 600;
          letter-spacing: 4px; text-transform: uppercase;
          margin: 0 0 20px;
        }
        .sl-eyebrow::before, .sl-eyebrow::after {
          content: ""; display: block; width: 28px; height: 1px;
          background: currentColor; opacity: 0.55;
        }
        .sl-eyebrow--left::after { display: none; }
        .sl-eyebrow--left::before { width: 22px; }

        /* NAV */
        #sl-nav {
          position: sticky; top: 0; z-index: 50;
          background: rgba(13,27,62,0.92);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(201,164,80,0.22);
          padding: 14px 48px;
          display: flex; align-items: center; justify-content: space-between;
        }
        .sl-logo-wrap {
          display: flex; flex-direction: column; align-items: flex-start;
          border: 1px solid rgba(201,164,80,0.4);
          padding: 7px 15px;
          position: relative;
          transition: border-color 0.3s ease;
        }
        .sl-logo-wrap::after {
          content: ""; position: absolute; inset: 3px;
          border: 1px solid rgba(201,164,80,0.14);
          pointer-events: none;
        }
        .sl-logo-wrap:hover { border-color: rgba(201,164,80,0.7); }
        .sl-logo-mono {
          font-family: var(--sl-serif);
          color: white; font-size: 20px; letter-spacing: 5px;
          line-height: 1; font-weight: 600;
        }
        .sl-logo-name {
          color: white; font-size: 8px; letter-spacing: 3.5px;
          text-transform: uppercase; line-height: 1.4; margin-top: 3px;
        }
        .sl-logo-tagline {
          color: var(--sl-gold); font-size: 7px; font-style: italic;
          letter-spacing: 1px; line-height: 1.4;
        }
        .sl-hamburger { display: flex; flex-direction: column; gap: 5px; padding: 8px; cursor: pointer; }
        .sl-hamburger span {
          display: block; width: 22px; height: 2px; background: white; border-radius: 1px;
          transition: width 0.25s ease;
        }
        .sl-hamburger span:nth-child(2) { width: 16px; }
        .sl-hamburger:hover span { width: 22px; }

        /* HERO */
        #sl-hero {
          position: relative; overflow: hidden;
          background-color: var(--sl-navy);
          background-image:
            radial-gradient(ellipse 70% 55% at 50% -10%, rgba(201,164,80,0.14), transparent 65%),
            radial-gradient(ellipse 60% 50% at 50% 115%, rgba(9,20,48,0.9), transparent 70%),
            repeating-linear-gradient(45deg, rgba(255,255,255,0.02) 0, rgba(255,255,255,0.02) 1px, transparent 0, transparent 50%),
            repeating-linear-gradient(135deg, rgba(255,255,255,0.02) 0, rgba(255,255,255,0.02) 1px, transparent 0, transparent 50%);
          background-size: 100% 100%, 100% 100%, 50px 50px, 50px 50px;
          min-height: 92vh;
          display: flex; flex-direction: column; align-items: center;
          justify-content: center; text-align: center;
          padding: 96px 48px 110px;
        }
        @keyframes sl-rise {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .sl-hero-eyebrow { animation: sl-rise 0.7s ease both; }
        .sl-hero-heading {
          font-family: var(--sl-serif);
          color: white;
          font-size: clamp(38px, 5.2vw, 66px);
          font-weight: 400; line-height: 1.16;
          letter-spacing: -0.01em;
          max-width: 860px; margin: 0 0 28px;
          animation: sl-rise 0.7s 0.1s ease both;
        }
        .sl-hero-heading em {
          color: var(--sl-gold-bright); font-style: italic;
        }
        .sl-hero-rule {
          width: 64px; height: 1px; border: none;
          background: linear-gradient(90deg, transparent, var(--sl-gold), transparent);
          margin: 0 auto 28px;
          animation: sl-rise 0.7s 0.18s ease both;
        }
        .sl-hero-sub {
          color: rgba(255,255,255,0.72); font-size: 18px; font-weight: 300;
          max-width: 580px; line-height: 1.8; margin: 0 0 44px;
          animation: sl-rise 0.7s 0.24s ease both;
        }
        .sl-hero-ctas {
          display: flex; gap: 16px; flex-wrap: wrap; justify-content: center;
          animation: sl-rise 0.7s 0.32s ease both;
        }
        .sl-btn-primary {
          background: var(--sl-gold); color: var(--sl-navy);
          font-weight: 600; font-size: 15px; padding: 15px 32px;
          border: 1px solid var(--sl-gold); cursor: pointer; letter-spacing: 0.5px;
          text-decoration: none; display: inline-block;
          font-family: var(--sl-sans);
          transition: background 0.25s ease, border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;
        }
        .sl-btn-primary:hover {
          background: var(--sl-gold-bright); border-color: var(--sl-gold-bright);
          transform: translateY(-2px);
          box-shadow: 0 10px 28px rgba(0,0,0,0.28);
        }
        .sl-btn-outline {
          background: transparent; color: white;
          font-weight: 500; font-size: 15px; padding: 15px 32px;
          border: 1px solid rgba(255,255,255,0.35);
          cursor: pointer; text-decoration: none; display: inline-block;
          font-family: var(--sl-sans);
          transition: border-color 0.25s ease, background 0.25s ease, transform 0.25s ease;
        }
        .sl-btn-outline:hover {
          border-color: var(--sl-gold); background: rgba(201,164,80,0.08);
          transform: translateY(-2px);
        }
        .sl-hero-scroll {
          position: absolute; bottom: 32px; left: 50%; transform: translateX(-50%);
          display: flex; flex-direction: column; align-items: center; gap: 10px;
          color: rgba(255,255,255,0.4); font-size: 9px; letter-spacing: 3px;
          text-transform: uppercase; text-decoration: none;
          transition: color 0.3s ease;
        }
        .sl-hero-scroll:hover { color: var(--sl-gold); }
        .sl-hero-scroll::after {
          content: ""; width: 1px; height: 36px;
          background: linear-gradient(to bottom, currentColor, transparent);
        }

        /* LOGOS BAR */
        #sl-logos {
          background: var(--sl-cream); padding: 48px 48px; text-align: center;
          border-top: 3px solid var(--sl-gold);
        }
        .sl-logos-label {
          font-size: 11px; letter-spacing: 3px; text-transform: uppercase;
          color: var(--sl-text-muted); margin: 0 0 24px;
        }
        .sl-logos-list {
          display: flex; align-items: center; justify-content: center;
          flex-wrap: wrap;
        }
        .sl-logo-item {
          font-family: var(--sl-serif);
          color: var(--sl-text-dark); font-size: 19px; font-weight: 500;
          padding: 8px 36px; letter-spacing: 0.5px; opacity: 0.75;
          transition: opacity 0.3s ease;
        }
        .sl-logo-item:hover { opacity: 1; }
        .sl-logo-item + .sl-logo-item { border-left: 1px solid var(--sl-border); }

        /* SERVICES */
        #sl-services {
          background: linear-gradient(to bottom, var(--sl-cream), var(--sl-cream-deep));
          padding: 96px 48px; text-align: center;
        }
        .sl-section-heading {
          font-family: var(--sl-serif);
          font-size: clamp(28px, 3.5vw, 46px);
          font-weight: 400; color: var(--sl-navy); margin: 0 0 18px;
          letter-spacing: -0.01em;
        }
        .sl-section-sub {
          color: var(--sl-text-muted); font-size: 16px;
          max-width: 600px; margin: 0 auto 60px; line-height: 1.7;
        }
        .sl-cards {
          display: grid; grid-template-columns: repeat(4, 1fr);
          gap: 20px; max-width: 1100px; margin: 0 auto;
        }
        .sl-card {
          position: relative;
          background: white; border: 1px solid var(--sl-border);
          padding: 32px 26px 28px; text-align: left;
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
        }
        .sl-card::before {
          content: ""; position: absolute; top: -1px; left: -1px; right: -1px;
          height: 2px; background: var(--sl-gold);
          transform: scaleX(0); transform-origin: left;
          transition: transform 0.35s ease;
        }
        .sl-card:hover {
          transform: translateY(-5px);
          border-color: rgba(201,164,80,0.45);
          box-shadow: 0 18px 40px rgba(13,27,62,0.1);
        }
        .sl-card:hover::before { transform: scaleX(1); }
        .sl-card-icon {
          width: 44px; height: 44px;
          background: rgba(201,164,80,0.1); border: 1px solid rgba(201,164,80,0.3);
          display: flex; align-items: center; justify-content: center; margin-bottom: 20px;
          transition: background 0.3s ease, border-color 0.3s ease;
        }
        .sl-card:hover .sl-card-icon {
          background: rgba(201,164,80,0.18); border-color: rgba(201,164,80,0.55);
        }
        .sl-card-icon svg {
          width: 20px; height: 20px; stroke: var(--sl-gold);
          fill: none; stroke-width: 1.5; stroke-linecap: round; stroke-linejoin: round;
        }
        .sl-card-title {
          font-family: var(--sl-serif);
          font-weight: 600; font-size: 17px; color: var(--sl-navy); margin: 0 0 10px;
        }
        .sl-card-desc { font-size: 14px; color: var(--sl-text-muted); line-height: 1.7; margin: 0; }

        /* STATS */
        #sl-stats {
          background:
            radial-gradient(ellipse 60% 90% at 50% 50%, rgba(201,164,80,0.06), transparent 70%),
            var(--sl-navy);
          padding: 72px 0;
          display: grid; grid-template-columns: repeat(4, 1fr);
        }
        .sl-stat { text-align: center; padding: 24px 32px; border-right: 1px solid rgba(255,255,255,0.08); }
        .sl-stat:last-child { border-right: none; }
        .sl-stat-num {
          font-family: var(--sl-serif); color: var(--sl-gold);
          font-size: clamp(30px, 4vw, 54px); font-weight: 400;
          line-height: 1; margin-bottom: 14px;
        }
        .sl-stat-label {
          color: rgba(255,255,255,0.6); font-size: 11px;
          letter-spacing: 2.5px; text-transform: uppercase;
        }

        /* ABOUT */
        #sl-about { background: var(--sl-cream); padding: 100px 48px; }
        .sl-about-inner {
          display: grid; grid-template-columns: auto 1fr;
          gap: 72px; align-items: center; max-width: 1000px; margin: 0 auto;
        }
        .sl-about-img {
          position: relative;
          width: 280px; height: 360px;
          background:
            radial-gradient(ellipse 80% 60% at 50% 30%, rgba(201,164,80,0.12), transparent 70%),
            linear-gradient(145deg, #1c2b4a 0%, #0d1b3e 100%);
          border: 1px solid rgba(201,164,80,0.6);
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .sl-about-img::before {
          content: ""; position: absolute; inset: -14px;
          border: 1px solid rgba(201,164,80,0.35);
          pointer-events: none;
          transform: translate(10px, 10px);
        }
        .sl-about-initials {
          font-family: var(--sl-serif); color: var(--sl-gold);
          font-size: 56px; font-weight: 400; letter-spacing: 4px; opacity: 0.6;
        }
        .sl-about-text h2 {
          font-family: var(--sl-serif);
          font-size: clamp(28px, 3vw, 42px);
          font-weight: 400; color: var(--sl-navy); margin: 0 0 22px;
          letter-spacing: -0.01em;
        }
        .sl-about-text p {
          color: var(--sl-text-muted); font-size: 16px; line-height: 1.85;
          margin: 0 0 32px; max-width: 520px;
        }
        .sl-btn-link {
          color: var(--sl-navy); font-size: 14px; font-weight: 500;
          text-decoration: none; border: 1px solid var(--sl-navy);
          padding: 12px 24px; display: inline-flex; align-items: center; gap: 8px;
          letter-spacing: 0.3px; font-family: var(--sl-sans);
          transition: background 0.25s ease, color 0.25s ease;
        }
        .sl-btn-link span { transition: transform 0.25s ease; }
        .sl-btn-link:hover { background: var(--sl-navy); color: var(--sl-cream); }
        .sl-btn-link:hover span { transform: translateX(4px); }

        /* INSIGHTS */
        #sl-insights { background: var(--sl-cream); padding: 0 48px 96px; }
        .sl-insights-inner { max-width: 1100px; margin: 0 auto; }
        .sl-insights-header {
          display: flex; align-items: flex-end; justify-content: space-between;
          margin-bottom: 36px; border-top: 1px solid var(--sl-border); padding-top: 64px;
        }
        .sl-insights-header h2 {
          font-family: var(--sl-serif); font-size: 34px; font-weight: 400;
          color: var(--sl-navy); margin: 0 0 6px; letter-spacing: -0.01em;
        }
        .sl-insights-header p { color: var(--sl-text-muted); font-size: 14px; margin: 0; }
        .sl-view-all {
          color: var(--sl-navy); font-size: 14px; text-decoration: none;
          display: flex; align-items: center; gap: 6px; white-space: nowrap; font-weight: 500;
          border-bottom: 1px solid transparent;
          transition: color 0.25s ease, border-color 0.25s ease;
        }
        .sl-view-all:hover { color: var(--sl-gold); border-color: var(--sl-gold); }
        .sl-insight-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .sl-insight-card {
          background: white; border: 1px solid var(--sl-border);
          padding: 28px 24px; border-radius: 2px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .sl-insight-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 32px rgba(13,27,62,0.08);
        }
        .sl-skeleton {
          background: linear-gradient(90deg, #e8e3d8 25%, #f0ebe0 50%, #e8e3d8 75%);
          background-size: 200% 100%; border-radius: 3px;
          animation: sl-shimmer 1.6s ease-in-out infinite;
        }
        @keyframes sl-shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        /* CTA */
        #sl-cta {
          position: relative; overflow: hidden;
          background:
            radial-gradient(ellipse 65% 90% at 50% 120%, rgba(201,164,80,0.12), transparent 70%),
            var(--sl-navy);
          border-top: 3px solid var(--sl-gold);
          padding: 96px 48px; text-align: center;
        }
        #sl-cta h2 {
          font-family: var(--sl-serif); color: white;
          font-size: clamp(26px, 3.2vw, 42px); font-weight: 400; margin: 0 0 18px;
          letter-spacing: -0.01em;
        }
        #sl-cta h2 em { color: var(--sl-gold-bright); font-style: italic; }
        #sl-cta p {
          color: rgba(255,255,255,0.68); font-size: 17px; font-weight: 300;
          max-width: 520px; margin: 0 auto 40px; line-height: 1.75;
        }

        /* FOOTER */
        #sl-footer {
          background: var(--sl-navy-deep);
          border-top: 1px solid rgba(255,255,255,0.08);
          padding: 64px 48px 32px;
        }
        .sl-footer-grid { display: grid; grid-template-columns: 1.2fr 1fr 1fr 1.3fr; gap: 48px; margin-bottom: 56px; }
        .sl-footer-logo-wrap {
          display: flex; flex-direction: column; align-items: flex-start;
          border: 1px solid rgba(201,164,80,0.3); padding: 7px 13px;
          margin-bottom: 16px; width: fit-content;
        }
        .sl-footer-tagline { color: rgba(255,255,255,0.5); font-size: 13px; font-style: italic; letter-spacing: 0.5px; }
        .sl-footer-col h4 {
          color: var(--sl-gold); font-size: 11px; font-weight: 600;
          letter-spacing: 2.5px; text-transform: uppercase; margin: 0 0 18px;
        }
        .sl-footer-col ul { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 11px; }
        .sl-footer-col a {
          color: rgba(255,255,255,0.6); text-decoration: none; font-size: 14px;
          transition: color 0.25s ease;
        }
        .sl-footer-col a:hover { color: var(--sl-gold-bright); }
        .sl-contact-item { display: flex; align-items: center; gap: 10px; color: rgba(255,255,255,0.6); font-size: 14px; margin-bottom: 11px; }
        .sl-contact-item svg { width: 14px; height: 14px; stroke: rgba(201,164,80,0.7); fill: none; stroke-width: 2; flex-shrink: 0; }
        .sl-linkedin {
          display: inline-flex; align-items: center; justify-content: center;
          width: 34px; height: 34px; border: 1px solid rgba(255,255,255,0.2); border-radius: 50%; margin-top: 10px;
          transition: border-color 0.25s ease, background 0.25s ease;
        }
        .sl-linkedin:hover { border-color: var(--sl-gold); background: rgba(201,164,80,0.1); }
        .sl-linkedin svg { width: 14px; height: 14px; fill: rgba(255,255,255,0.6); transition: fill 0.25s ease; }
        .sl-linkedin:hover svg { fill: var(--sl-gold-bright); }
        .sl-footer-bottom {
          border-top: 1px solid rgba(255,255,255,0.08); padding-top: 24px;
          display: flex; align-items: center; justify-content: space-between;
        }
        .sl-footer-bottom p { color: rgba(255,255,255,0.4); font-size: 13px; margin: 0; }
        .sl-footer-legal { display: flex; gap: 24px; }
        .sl-footer-legal a {
          color: rgba(255,255,255,0.4); font-size: 13px; text-decoration: none;
          transition: color 0.25s ease;
        }
        .sl-footer-legal a:hover { color: rgba(255,255,255,0.75); }

        /* RESPONSIVE */
        @media (max-width: 900px) {
          .sl-cards { grid-template-columns: repeat(2, 1fr); }
          #sl-stats { grid-template-columns: repeat(2, 1fr); }
          .sl-stat:nth-child(2) { border-right: none; }
          .sl-stat:nth-child(-n+2) { border-bottom: 1px solid rgba(255,255,255,0.08); }
          .sl-about-inner { grid-template-columns: 1fr; gap: 48px; }
          .sl-about-img { width: 100%; height: 220px; }
          .sl-about-img::before { inset: -10px; transform: translate(7px, 7px); }
          .sl-insight-cards { grid-template-columns: 1fr; }
          .sl-footer-grid { grid-template-columns: 1fr 1fr; }
          .sl-insights-header { flex-direction: column; align-items: flex-start; gap: 12px; }
        }
        @media (max-width: 600px) {
          .sl-cards { grid-template-columns: 1fr; }
          #sl-stats { grid-template-columns: 1fr 1fr; }
          .sl-footer-grid { grid-template-columns: 1fr; }
          #sl-nav, #sl-logos { padding-left: 24px; padding-right: 24px; }
          #sl-hero, #sl-services, #sl-about, #sl-cta, #sl-footer { padding-left: 24px; padding-right: 24px; }
          #sl-insights { padding-left: 24px; padding-right: 24px; }
          .sl-logo-item { padding: 6px 16px; font-size: 15px; }
          .sl-hero-scroll { display: none; }
        }
        @media (prefers-reduced-motion: reduce) {
          .sl-hero-eyebrow, .sl-hero-heading, .sl-hero-rule, .sl-hero-sub, .sl-hero-ctas { animation: none; }
          .sl-card, .sl-insight-card, .sl-btn-primary, .sl-btn-outline { transition: none; }
        }
      `}</style>

      <div id="sl">

        {/* ── NAV ── */}
        <nav id="sl-nav">
          <div className="sl-logo-wrap">
            <span className="sl-logo-mono">SL</span>
            <span className="sl-logo-name">Sycamore Lane</span>
            <span className="sl-logo-tagline">— Acquire. Operate. Scale. —</span>
          </div>
          <div className="sl-hamburger">
            <span /><span /><span />
          </div>
        </nav>

        {/* ── HERO ── */}
        <section id="sl-hero">
          <p className="sl-eyebrow sl-hero-eyebrow">Sycamore Lane Holdings</p>
          <h1 className="sl-hero-heading">
            Operator-Led Strategy for{" "}
            <em>CPG, Retail</em>
            {" "}&amp; <em>Foodservice</em>
          </h1>
          <hr className="sl-hero-rule" />
          <p className="sl-hero-sub">
            I&apos;ve spent 16 years building, fixing, and scaling consumer businesses large
            and small. Now I help brands, portfolio companies, and operators do the same.
          </p>
          <div className="sl-hero-ctas">
            <a href="#sl-cta" className="sl-btn-primary">Book a Conversation</a>
            <a href="#sl-services" className="sl-btn-outline">Explore Our Work</a>
          </div>
          <a href="#sl-logos" className="sl-hero-scroll">Scroll</a>
        </section>

        {/* ── LOGOS BAR ── */}
        <section id="sl-logos">
          <p className="sl-logos-label">Operator experience across leading organizations</p>
          <div className="sl-logos-list">
            {["Walmart", "Kraft Heinz", "Sysco", "Darden"].map((name) => (
              <span key={name} className="sl-logo-item">{name}</span>
            ))}
          </div>
        </section>

        {/* ── SERVICES ── */}
        <section id="sl-services">
          <p className="sl-eyebrow">What I Do</p>
          <h2 className="sl-section-heading">How I Help Organizations Scale</h2>
          <p className="sl-section-sub">
            Drawing on 16 years of executive operating experience, I provide hands-on,
            actionable strategy that drives measurable bottom-line results.
          </p>
          <div className="sl-cards">
            <div className="sl-card">
              <div className="sl-card-icon">
                <svg viewBox="0 0 24 24">
                  <rect x="3" y="12" width="4" height="9" />
                  <rect x="10" y="7" width="4" height="14" />
                  <rect x="17" y="3" width="4" height="18" />
                </svg>
              </div>
              <h3 className="sl-card-title">CPG &amp; Retail Strategy</h3>
              <p className="sl-card-desc">
                Brand growth architecture, pricing strategy, and go-to-market execution
                for consumer packaged goods.
              </p>
            </div>
            <div className="sl-card">
              <div className="sl-card-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M3 7h18M3 12h18M3 17h18" />
                  <path d="M8 3v18M16 3v18" />
                </svg>
              </div>
              <h3 className="sl-card-title">Foodservice Advisory</h3>
              <p className="sl-card-desc">
                Operator-led guidance for restaurant groups, distributors, and foodservice
                brands navigating growth.
              </p>
            </div>
            <div className="sl-card">
              <div className="sl-card-icon">
                <svg viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </div>
              <h3 className="sl-card-title">Acquisition &amp; Diligence</h3>
              <p className="sl-card-desc">
                Pre-acquisition commercial assessment and post-close value creation for
                portfolio investments.
              </p>
            </div>
            <div className="sl-card">
              <div className="sl-card-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <h3 className="sl-card-title">Fractional Leadership</h3>
              <p className="sl-card-desc">
                Interim executive and board advisory for businesses at critical
                inflection points.
              </p>
            </div>
          </div>
        </section>

        {/* ── STATS ── */}
        <section id="sl-stats">
          <div className="sl-stat">
            <div className="sl-stat-num">$2B+</div>
            <div className="sl-stat-label">Operations Managed</div>
          </div>
          <div className="sl-stat">
            <div className="sl-stat-num">3</div>
            <div className="sl-stat-label">Industries</div>
          </div>
          <div className="sl-stat">
            <div className="sl-stat-num">16 Yrs</div>
            <div className="sl-stat-label">Operator Experience</div>
          </div>
          <div className="sl-stat">
            <div className="sl-stat-num">Booth</div>
            <div className="sl-stat-label">Chicago MBA</div>
          </div>
        </section>

        {/* ── ABOUT ── */}
        <section id="sl-about">
          <div className="sl-about-inner">
            <div className="sl-about-img">
              <span className="sl-about-initials">BS</span>
            </div>
            <div className="sl-about-text">
              <p className="sl-eyebrow sl-eyebrow--left">About</p>
              <h2>Meet Brady Smallwood</h2>
              <p>
                As a former COO and board member with a Chicago Booth MBA, I&apos;ve spent
                16 years inside the consumer, retail, and foodservice industries. Sycamore
                Lane Holdings is how I put that experience to work — for operators, founders,
                and investors who are building something real.
              </p>
              <a href="#" className="sl-btn-link">
                Learn More About Brady <span>→</span>
              </a>
            </div>
          </div>
        </section>

        {/* ── INSIGHTS ── */}
        <section id="sl-insights">
          <div className="sl-insights-inner">
            <div className="sl-insights-header">
              <div>
                <p className="sl-eyebrow sl-eyebrow--left">Perspectives</p>
                <h2>Latest Insights</h2>
                <p>Strategic perspectives on CPG, retail, and foodservice operations.</p>
              </div>
              <a href="#" className="sl-view-all">View All Insights →</a>
            </div>
            <div className="sl-insight-cards">
              {[0, 1, 2].map((i) => (
                <div key={i} className="sl-insight-card">
                  <div className="sl-skeleton" style={{ height: 11, width: "38%", marginBottom: 14 }} />
                  <div className="sl-skeleton" style={{ height: 14, width: "88%", marginBottom: 8 }} />
                  <div className="sl-skeleton" style={{ height: 14, width: "64%", marginBottom: 22 }} />
                  <div className="sl-skeleton" style={{ height: 11, width: "92%", marginBottom: 6 }} />
                  <div className="sl-skeleton" style={{ height: 11, width: "78%", marginBottom: 6 }} />
                  <div className="sl-skeleton" style={{ height: 11, width: "52%" }} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section id="sl-cta">
          <p className="sl-eyebrow">Get Started</p>
          <h2>Ready to Build Something That <em>Lasts</em>?</h2>
          <p>
            Let&apos;s discuss how Sycamore Lane can accelerate your growth and create
            lasting value.
          </p>
          <a href="mailto:brady.smallwood@gmail.com" className="sl-btn-primary">
            Start the Conversation
          </a>
        </section>

        {/* ── FOOTER ── */}
        <footer id="sl-footer">
          <div className="sl-footer-grid">
            <div>
              <div className="sl-footer-logo-wrap">
                <span className="sl-logo-mono" style={{ fontSize: 16 }}>SL</span>
                <span className="sl-logo-name">Sycamore Lane</span>
              </div>
              <p className="sl-footer-tagline">Acquire. Operate. Scale.</p>
            </div>
            <div className="sl-footer-col">
              <h4>Company</h4>
              <ul>
                <li><a href="#">About Brady</a></li>
                <li><a href="#">Services</a></li>
                <li><a href="#">Portfolio</a></li>
                <li><a href="#">Results</a></li>
              </ul>
            </div>
            <div className="sl-footer-col">
              <h4>Resources</h4>
              <ul>
                <li><a href="#">How I Work</a></li>
                <li><a href="#">Insights &amp; Blog</a></li>
                <li><a href="#">Contact</a></li>
              </ul>
            </div>
            <div className="sl-footer-col">
              <h4>Contact</h4>
              <div className="sl-contact-item">
                <svg viewBox="0 0 24 24">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <span>brady.smallwood@gmail.com</span>
              </div>
              <div className="sl-contact-item">
                <svg viewBox="0 0 24 24">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>Bentonville, AR</span>
              </div>
              <a href="#" className="sl-linkedin">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
            </div>
          </div>
          <div className="sl-footer-bottom">
            <p>© 2026 Sycamore Lane Holdings. All rights reserved.</p>
            <div className="sl-footer-legal">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}
