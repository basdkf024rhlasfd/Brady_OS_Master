import { requireProjectAccess } from "@/lib/portal-access";

export default async function SycamoreLanePage() {
  await requireProjectAccess("sycamore-lane");

  return (
    <>
      <style>{`
        :root {
          --sl-navy: #0d1b3e;
          --sl-cream: #f5f1e8;
          --sl-gold: #c9a450;
          --sl-text-dark: #1c2b4a;
          --sl-text-muted: #64748b;
          --sl-border: #e2ddd4;
          --sl-serif: var(--font-playfair, Georgia, serif);
          --sl-sans: var(--font-inter, system-ui, sans-serif);
        }

        #sl { font-family: var(--sl-sans); color: var(--sl-text-dark); margin: 0; padding: 0; }

        /* NAV */
        #sl-nav {
          position: sticky; top: 0; z-index: 50;
          background: var(--sl-navy);
          padding: 16px 48px;
          display: flex; align-items: center; justify-content: space-between;
        }
        .sl-logo-wrap {
          display: flex; flex-direction: column; align-items: flex-start;
          border: 1px solid rgba(201,164,80,0.35);
          padding: 6px 14px;
        }
        .sl-logo-mono {
          font-family: var(--sl-serif);
          color: white; font-size: 20px; letter-spacing: 5px;
          line-height: 1; font-weight: 600;
        }
        .sl-logo-name {
          color: white; font-size: 8px; letter-spacing: 3.5px;
          text-transform: uppercase; line-height: 1.4; margin-top: 2px;
        }
        .sl-logo-tagline {
          color: var(--sl-gold); font-size: 7px; font-style: italic;
          letter-spacing: 1px; line-height: 1.4;
        }
        .sl-hamburger { display: flex; flex-direction: column; gap: 5px; padding: 8px; cursor: pointer; }
        .sl-hamburger span { display: block; width: 22px; height: 2px; background: white; border-radius: 1px; }

        /* HERO */
        #sl-hero {
          background-color: var(--sl-navy);
          background-image:
            repeating-linear-gradient(45deg, rgba(255,255,255,0.025) 0, rgba(255,255,255,0.025) 1px, transparent 0, transparent 50%),
            repeating-linear-gradient(135deg, rgba(255,255,255,0.025) 0, rgba(255,255,255,0.025) 1px, transparent 0, transparent 50%);
          background-size: 50px 50px;
          min-height: 90vh;
          display: flex; flex-direction: column; align-items: center;
          justify-content: center; text-align: center;
          padding: 80px 48px;
        }
        .sl-hero-heading {
          font-family: var(--sl-serif);
          color: white;
          font-size: clamp(36px, 5vw, 62px);
          font-weight: 400; line-height: 1.2;
          max-width: 820px; margin: 0 0 24px;
        }
        .sl-hero-heading em { color: var(--sl-gold); font-style: italic; }
        .sl-hero-sub {
          color: rgba(255,255,255,0.72); font-size: 18px;
          max-width: 560px; line-height: 1.75; margin: 0 0 40px;
        }
        .sl-hero-ctas { display: flex; gap: 16px; flex-wrap: wrap; justify-content: center; }
        .sl-btn-primary {
          background: var(--sl-gold); color: var(--sl-navy);
          font-weight: 600; font-size: 15px; padding: 14px 28px;
          border: none; cursor: pointer; letter-spacing: 0.5px;
          text-decoration: none; display: inline-block;
          font-family: var(--sl-sans);
        }
        .sl-btn-primary:hover { opacity: 0.9; }
        .sl-btn-outline {
          background: transparent; color: white;
          font-weight: 500; font-size: 15px; padding: 13px 27px;
          border: 1px solid rgba(255,255,255,0.4);
          cursor: pointer; text-decoration: none; display: inline-block;
          font-family: var(--sl-sans);
        }
        .sl-btn-outline:hover { border-color: white; }

        /* LOGOS BAR */
        #sl-logos {
          background: var(--sl-cream); padding: 40px 48px; text-align: center;
          border-top: 1px solid var(--sl-border);
        }
        .sl-logos-label {
          font-size: 11px; letter-spacing: 3px; text-transform: uppercase;
          color: var(--sl-text-muted); margin: 0 0 20px;
        }
        .sl-logos-list {
          display: flex; align-items: center; justify-content: center;
          flex-wrap: wrap;
        }
        .sl-logo-item {
          color: var(--sl-text-dark); font-size: 17px; font-weight: 500;
          padding: 8px 32px; letter-spacing: 0.5px;
        }
        .sl-logo-item + .sl-logo-item { border-left: 1px solid var(--sl-border); }

        /* SERVICES */
        #sl-services { background: var(--sl-cream); padding: 80px 48px; text-align: center; }
        .sl-section-heading {
          font-family: var(--sl-serif);
          font-size: clamp(28px, 3.5vw, 44px);
          font-weight: 400; color: var(--sl-navy); margin: 0 0 16px;
        }
        .sl-section-sub {
          color: var(--sl-text-muted); font-size: 16px;
          max-width: 600px; margin: 0 auto 56px; line-height: 1.7;
        }
        .sl-cards {
          display: grid; grid-template-columns: repeat(4, 1fr);
          gap: 20px; max-width: 1100px; margin: 0 auto;
        }
        .sl-card { background: white; border: 1px solid var(--sl-border); padding: 28px 24px; text-align: left; }
        .sl-card-icon {
          width: 40px; height: 40px;
          background: rgba(201,164,80,0.1); border: 1px solid rgba(201,164,80,0.3);
          display: flex; align-items: center; justify-content: center; margin-bottom: 18px;
        }
        .sl-card-icon svg {
          width: 20px; height: 20px; stroke: var(--sl-gold);
          fill: none; stroke-width: 1.5; stroke-linecap: round; stroke-linejoin: round;
        }
        .sl-card-title { font-weight: 600; font-size: 15px; color: var(--sl-navy); margin: 0 0 10px; }
        .sl-card-desc { font-size: 14px; color: var(--sl-text-muted); line-height: 1.65; margin: 0; }

        /* STATS */
        #sl-stats {
          background: var(--sl-navy); padding: 64px 0;
          display: grid; grid-template-columns: repeat(4, 1fr);
        }
        .sl-stat { text-align: center; padding: 24px 32px; border-right: 1px solid rgba(255,255,255,0.08); }
        .sl-stat:last-child { border-right: none; }
        .sl-stat-num {
          font-family: var(--sl-serif); color: var(--sl-gold);
          font-size: clamp(30px, 4vw, 52px); font-weight: 400;
          line-height: 1; margin-bottom: 10px;
        }
        .sl-stat-label { color: rgba(255,255,255,0.65); font-size: 11px; letter-spacing: 2.5px; text-transform: uppercase; }

        /* ABOUT */
        #sl-about { background: var(--sl-cream); padding: 80px 48px; }
        .sl-about-inner {
          display: grid; grid-template-columns: auto 1fr;
          gap: 64px; align-items: center; max-width: 1000px; margin: 0 auto;
        }
        .sl-about-img {
          width: 280px; height: 360px;
          background: linear-gradient(145deg, #1c2b4a 0%, #0d1b3e 100%);
          border: 2px solid rgba(201,164,80,0.5);
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .sl-about-initials {
          font-family: var(--sl-serif); color: var(--sl-gold);
          font-size: 52px; font-weight: 400; letter-spacing: 4px; opacity: 0.55;
        }
        .sl-about-text h2 {
          font-family: var(--sl-serif);
          font-size: clamp(28px, 3vw, 40px);
          font-weight: 400; color: var(--sl-navy); margin: 0 0 20px;
        }
        .sl-about-text p {
          color: var(--sl-text-muted); font-size: 16px; line-height: 1.8;
          margin: 0 0 28px; max-width: 520px;
        }
        .sl-btn-link {
          color: var(--sl-navy); font-size: 14px; font-weight: 500;
          text-decoration: none; border: 1px solid var(--sl-navy);
          padding: 10px 20px; display: inline-flex; align-items: center; gap: 8px;
          letter-spacing: 0.3px; font-family: var(--sl-sans);
        }
        .sl-btn-link:hover { background: rgba(13,27,62,0.05); }

        /* INSIGHTS */
        #sl-insights { background: var(--sl-cream); padding: 0 48px 80px; }
        .sl-insights-header {
          display: flex; align-items: flex-end; justify-content: space-between;
          margin-bottom: 32px; border-top: 1px solid var(--sl-border); padding-top: 56px;
        }
        .sl-insights-header h2 {
          font-family: var(--sl-serif); font-size: 32px; font-weight: 400;
          color: var(--sl-navy); margin: 0 0 6px;
        }
        .sl-insights-header p { color: var(--sl-text-muted); font-size: 14px; margin: 0; }
        .sl-view-all {
          color: var(--sl-navy); font-size: 14px; text-decoration: none;
          display: flex; align-items: center; gap: 6px; white-space: nowrap; font-weight: 500;
        }
        .sl-insight-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .sl-insight-card { background: white; border: 1px solid var(--sl-border); padding: 28px 24px; border-radius: 2px; }
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
        #sl-cta { background: var(--sl-navy); padding: 80px 48px; text-align: center; }
        #sl-cta h2 {
          font-family: var(--sl-serif); color: white;
          font-size: clamp(24px, 3vw, 38px); font-weight: 400; margin: 0 0 16px;
        }
        #sl-cta p { color: rgba(255,255,255,0.68); font-size: 17px; margin: 0 0 36px; }

        /* FOOTER */
        #sl-footer { background: var(--sl-navy); border-top: 1px solid rgba(255,255,255,0.08); padding: 56px 48px 32px; }
        .sl-footer-grid { display: grid; grid-template-columns: 1.2fr 1fr 1fr 1.3fr; gap: 48px; margin-bottom: 48px; }
        .sl-footer-logo-wrap {
          display: flex; flex-direction: column; align-items: flex-start;
          border: 1px solid rgba(201,164,80,0.25); padding: 6px 12px;
          margin-bottom: 14px; width: fit-content;
        }
        .sl-footer-tagline { color: rgba(255,255,255,0.5); font-size: 13px; font-style: italic; letter-spacing: 0.5px; }
        .sl-footer-col h4 {
          color: white; font-size: 12px; font-weight: 600;
          letter-spacing: 1.5px; text-transform: uppercase; margin: 0 0 16px;
        }
        .sl-footer-col ul { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px; }
        .sl-footer-col a { color: rgba(255,255,255,0.6); text-decoration: none; font-size: 14px; }
        .sl-footer-col a:hover { color: white; }
        .sl-contact-item { display: flex; align-items: center; gap: 10px; color: rgba(255,255,255,0.6); font-size: 14px; margin-bottom: 10px; }
        .sl-contact-item svg { width: 14px; height: 14px; stroke: rgba(255,255,255,0.5); fill: none; stroke-width: 2; flex-shrink: 0; }
        .sl-linkedin {
          display: inline-flex; align-items: center; justify-content: center;
          width: 32px; height: 32px; border: 1px solid rgba(255,255,255,0.2); border-radius: 50%; margin-top: 8px;
        }
        .sl-linkedin svg { width: 14px; height: 14px; fill: rgba(255,255,255,0.6); }
        .sl-footer-bottom {
          border-top: 1px solid rgba(255,255,255,0.08); padding-top: 24px;
          display: flex; align-items: center; justify-content: space-between;
        }
        .sl-footer-bottom p { color: rgba(255,255,255,0.4); font-size: 13px; margin: 0; }
        .sl-footer-legal { display: flex; gap: 24px; }
        .sl-footer-legal a { color: rgba(255,255,255,0.4); font-size: 13px; text-decoration: none; }
        .sl-footer-legal a:hover { color: rgba(255,255,255,0.7); }

        /* RESPONSIVE */
        @media (max-width: 900px) {
          .sl-cards { grid-template-columns: repeat(2, 1fr); }
          #sl-stats { grid-template-columns: repeat(2, 1fr); }
          .sl-about-inner { grid-template-columns: 1fr; }
          .sl-about-img { width: 100%; height: 220px; }
          .sl-insight-cards { grid-template-columns: 1fr; }
          .sl-footer-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 600px) {
          .sl-cards { grid-template-columns: 1fr; }
          #sl-stats { grid-template-columns: 1fr 1fr; }
          .sl-footer-grid { grid-template-columns: 1fr; }
          #sl-nav, #sl-logos { padding-left: 24px; padding-right: 24px; }
          #sl-hero, #sl-services, #sl-about, #sl-cta, #sl-footer { padding-left: 24px; padding-right: 24px; }
          #sl-insights { padding-left: 24px; padding-right: 24px; }
          .sl-logo-item { padding: 6px 16px; font-size: 14px; }
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
          <h1 className="sl-hero-heading">
            Operator-Led Strategy for{" "}
            <em>CPG, Retail</em>
            {" "}&amp; <em>Foodservice</em>
          </h1>
          <p className="sl-hero-sub">
            I&apos;ve spent 16 years building, fixing, and scaling consumer businesses large
            and small. Now I help brands, portfolio companies, and operators do the same.
          </p>
          <div className="sl-hero-ctas">
            <a href="#sl-cta" className="sl-btn-primary">Book a Conversation</a>
            <a href="#sl-services" className="sl-btn-outline">Explore Our Work</a>
          </div>
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
          <div className="sl-insights-header">
            <div>
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
        </section>

        {/* ── CTA ── */}
        <section id="sl-cta">
          <h2>Ready to Build Something That Lasts?</h2>
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
