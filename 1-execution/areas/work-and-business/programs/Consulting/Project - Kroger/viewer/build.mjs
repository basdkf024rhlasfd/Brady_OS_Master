#!/usr/bin/env node
/**
 * Kroger Viewer — Build Script
 * Reads markdown + HTML source files, converts to HTML, and outputs a single index.html.
 * Zero dependencies — uses a lightweight inline markdown converter.
 */
import { readFileSync, writeFileSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT = resolve(__dirname, "..");
const DRAFTS = resolve(PROJECT, "drafts");
const REPO_ROOT = resolve(__dirname, "../../../../../../..");
const CONTEXT = resolve(REPO_ROOT, ".context");

// ── Lightweight Markdown → HTML ──────────────────────────────────────────────

function md(src) {
  let html = src;

  // Normalize line endings
  html = html.replace(/\r\n/g, "\n");

  // Fenced code blocks
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) => {
    const escaped = esc(code.trimEnd());
    return `<pre><code class="lang-${lang || "text"}">${escaped}</code></pre>`;
  });

  // Inline code (before other inline processing)
  html = html.replace(/`([^`]+)`/g, "<code>$1</code>");

  // Tables
  html = html.replace(
    /^(\|.+\|)\n(\|[\s:|-]+\|)\n((?:\|.+\|\n?)*)/gm,
    (_, header, _sep, body) => {
      const th = header
        .split("|")
        .filter(Boolean)
        .map((c) => `<th>${c.trim()}</th>`)
        .join("");
      const rows = body
        .trim()
        .split("\n")
        .map((r) => {
          const cells = r
            .split("|")
            .filter(Boolean)
            .map((c) => `<td>${c.trim()}</td>`)
            .join("");
          return `<tr>${cells}</tr>`;
        })
        .join("\n");
      return `<table><thead><tr>${th}</tr></thead><tbody>${rows}</tbody></table>`;
    }
  );

  // Blockquotes (multi-line)
  html = html.replace(/^((?:>.*\n?)+)/gm, (block) => {
    const inner = block.replace(/^>\s?/gm, "").trim();
    return `<blockquote><p>${inner}</p></blockquote>\n`;
  });

  // Headings
  html = html.replace(/^######\s+(.+)$/gm, "<h6>$1</h6>");
  html = html.replace(/^#####\s+(.+)$/gm, "<h5>$1</h5>");
  html = html.replace(/^####\s+(.+)$/gm, "<h4>$1</h4>");
  html = html.replace(/^###\s+(.+)$/gm, "<h3>$1</h3>");
  html = html.replace(/^##\s+(.+)$/gm, "<h2>$1</h2>");
  html = html.replace(/^#\s+(.+)$/gm, "<h1>$1</h1>");

  // Horizontal rules
  html = html.replace(/^---+$/gm, "<hr>");

  // Unordered lists
  html = html.replace(/^((?:[-*]\s+.+\n?)+)/gm, (block) => {
    const items = block
      .trim()
      .split("\n")
      .map((l) => `<li>${l.replace(/^[-*]\s+/, "")}</li>`)
      .join("\n");
    return `<ul>${items}</ul>\n`;
  });

  // Ordered lists
  html = html.replace(/^((?:\d+\.\s+.+\n?)+)/gm, (block) => {
    const items = block
      .trim()
      .split("\n")
      .map((l) => `<li>${l.replace(/^\d+\.\s+/, "")}</li>`)
      .join("\n");
    return `<ol>${items}</ol>\n`;
  });

  // Bold + italic
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, "<strong><em>$1</em></strong>");
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');

  // Wrap remaining bare lines in paragraphs
  html = html
    .split("\n\n")
    .map((block) => {
      block = block.trim();
      if (!block) return "";
      if (
        block.startsWith("<h") ||
        block.startsWith("<ul") ||
        block.startsWith("<ol") ||
        block.startsWith("<table") ||
        block.startsWith("<pre") ||
        block.startsWith("<blockquote") ||
        block.startsWith("<hr")
      ) {
        return block;
      }
      return `<p>${block.replace(/\n/g, "<br>")}</p>`;
    })
    .join("\n\n");

  return html;
}

function esc(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// ── Section Definitions ──────────────────────────────────────────────────────

const sections = [
  // Tier 1 — Featured
  {
    id: "overview",
    label: "Overview",
    group: "Featured",
    type: "md",
    file: resolve(PROJECT, "kroger-ocado-primer.md"),
  },
  {
    id: "transformation-map",
    label: "Transformation Map",
    group: "Featured",
    type: "html-iframe",
    file: resolve(CONTEXT, "kroger-transformation-map.html"),
  },
  {
    id: "foran-research",
    label: "Greg Foran \u2014 Deep Research",
    group: "Featured",
    type: "md",
    file: resolve(PROJECT, "deep-research-greg-foran.md"),
  },
  {
    id: "era-analysis",
    label: "Stock Era Analysis (WMT vs KR)",
    group: "Featured",
    type: "md",
    file: resolve(PROJECT, "era-definitions.md"),
  },
  {
    id: "reasons-to-believe",
    label: "Why This System",
    group: "Featured",
    type: "md",
    file: resolve(PROJECT, "drafts", "section-12-reasons-to-believe.md"),
  },
  {
    id: "pitch-to-greg",
    label: "Pitch to Greg",
    group: "Featured",
    type: "md",
    file: resolve(PROJECT, "claudine-pitch-to-greg.md"),
  },

  // Tier 2 — Research & Strategy
  {
    id: "foran-debate",
    label: "Foran Strategy Debate",
    group: "Research & Strategy",
    type: "md",
    file: resolve(PROJECT, "foran-debate.md"),
  },
  {
    id: "org-structure",
    label: "Org Structure & SCR Review",
    group: "Research & Strategy",
    type: "md",
    file: resolve(PROJECT, "drafts", "section-6-org-structure-scr-review.md"),
  },
  {
    id: "ai-dissent",
    label: "AI Section \u2014 Dissent Memo",
    group: "Research & Strategy",
    type: "html-iframe",
    file: resolve(PROJECT, "wyatt-earp-memo-ai-section-dissent.html"),
  },

  // Tier 3 — Whitepaper Sections
  {
    id: "s2-1",
    label: "2.1 Financial Snapshot",
    group: "Whitepaper",
    type: "md",
    file: resolve(DRAFTS, "section-2-1-financial-snapshot.md"),
  },
  {
    id: "s2-3",
    label: "2.3 The Foran Opportunity",
    group: "Whitepaper",
    type: "md",
    file: resolve(DRAFTS, "section-2-3-foran-opportunity.md"),
  },
  {
    id: "s3-1",
    label: "3.1 Pricing Architecture",
    group: "Whitepaper",
    type: "md",
    file: resolve(DRAFTS, "section-3-1-pricing-architecture.md"),
  },
  {
    id: "s3-2",
    label: "3.2 Promotional Strategy",
    group: "Whitepaper",
    type: "md",
    file: resolve(DRAFTS, "section-3-2-promotional-strategy.md"),
  },
  {
    id: "s3-3",
    label: "3.3 Assortment & Private Label",
    group: "Whitepaper",
    type: "md",
    file: resolve(DRAFTS, "section-3-3-assortment-private-label.md"),
  },
  {
    id: "s4-1",
    label: "4.1 The Ocado Exit",
    group: "Whitepaper",
    type: "md",
    file: resolve(DRAFTS, "section-4-1-ocado-exit.md"),
  },
  {
    id: "s4-2",
    label: "4.2 Store-Based Fulfillment",
    group: "Whitepaper",
    type: "md",
    file: resolve(DRAFTS, "section-4-2-store-based-fulfillment.md"),
  },
  {
    id: "s4-3",
    label: "4.3 Delivery Partnerships",
    group: "Whitepaper",
    type: "md",
    file: resolve(DRAFTS, "section-4-3-delivery-partnerships.md"),
  },
  {
    id: "s4-4",
    label: "4.4 Pickup",
    group: "Whitepaper",
    type: "md",
    file: resolve(DRAFTS, "section-4-4-pickup.md"),
  },
  {
    id: "s5-1",
    label: "5.1 AI Capability Gap",
    group: "Whitepaper",
    type: "md",
    file: resolve(DRAFTS, "section-5-1-ai-capability-gap.md"),
  },
  {
    id: "s5-2",
    label: "5.2 Where AI Matters",
    group: "Whitepaper",
    type: "md",
    file: resolve(DRAFTS, "section-5-2-where-ai-matters.md"),
  },
  {
    id: "s5-3",
    label: "5.3 Board AI Gap",
    group: "Whitepaper",
    type: "md",
    file: resolve(DRAFTS, "section-5-3-board-ai-gap.md"),
  },
  {
    id: "s5-4",
    label: "5.4 AI Talent Strategy",
    group: "Whitepaper",
    type: "md",
    file: resolve(DRAFTS, "section-5-4-ai-talent-strategy.md"),
  },
  {
    id: "s5-5",
    label: "5.5 Technology Infrastructure",
    group: "Whitepaper",
    type: "md",
    file: resolve(DRAFTS, "section-5-5-technology-infrastructure.md"),
  },
  {
    id: "s7-1",
    label: "7.1 Banner Divestitures",
    group: "Whitepaper",
    type: "md",
    file: resolve(DRAFTS, "section-7-1-banner-divestitures.md"),
  },
  {
    id: "s7-2",
    label: "7.2 Format Strategy",
    group: "Whitepaper",
    type: "md",
    file: resolve(DRAFTS, "section-7-2-format-strategy.md"),
  },
  {
    id: "s8-1",
    label: "8.1 Distribution Network",
    group: "Whitepaper",
    type: "md",
    file: resolve(DRAFTS, "section-8-1-distribution-network.md"),
  },
  {
    id: "s8-2",
    label: "8.2 Supplier Relationships",
    group: "Whitepaper",
    type: "md",
    file: resolve(DRAFTS, "section-8-2-supplier-relationships.md"),
  },
  {
    id: "s9-1",
    label: "9.1 Kroger Precision Marketing",
    group: "Whitepaper",
    type: "md",
    file: resolve(DRAFTS, "section-9-1-kroger-precision-marketing.md"),
  },
  {
    id: "s9-2",
    label: "9.2 Data Monetization",
    group: "Whitepaper",
    type: "md",
    file: resolve(DRAFTS, "section-9-2-data-monetization.md"),
  },
  {
    id: "s10-1",
    label: "10.1 Post-Ocado Capital",
    group: "Whitepaper",
    type: "md",
    file: resolve(DRAFTS, "section-10-1-post-ocado-capital.md"),
  },
  {
    id: "s10-2",
    label: "10.2 Investment Priorities",
    group: "Whitepaper",
    type: "md",
    file: resolve(DRAFTS, "section-10-2-investment-priorities.md"),
  },
  {
    id: "s10-3",
    label: "10.3 Shareholder Return Framework",
    group: "Whitepaper",
    type: "md",
    file: resolve(DRAFTS, "section-10-3-shareholder-return-framework.md"),
  },
  {
    id: "s11-1",
    label: "11.1 First 100 Days",
    group: "Whitepaper",
    type: "md",
    file: resolve(DRAFTS, "section-11-1-first-100-days.md"),
  },
  {
    id: "s11-2",
    label: "11.2 Year 1 Priorities",
    group: "Whitepaper",
    type: "md",
    file: resolve(DRAFTS, "section-11-2-year-1-priorities.md"),
  },
  {
    id: "s11-3",
    label: "11.3 Years 2\u20133 Horizon",
    group: "Whitepaper",
    type: "md",
    file: resolve(DRAFTS, "section-11-3-years-2-3-horizon.md"),
  },

  // Appendices
  {
    id: "app-a",
    label: "Appendix A \u2014 Walmart AI Tools",
    group: "Appendices",
    type: "md",
    file: resolve(DRAFTS, "appendix-a-walmart-ai-tools.md"),
  },
  {
    id: "app-c",
    label: "Appendix C \u2014 Ocado Post-Mortem",
    group: "Appendices",
    type: "md",
    file: resolve(DRAFTS, "appendix-c-ocado-post-mortem.md"),
  },
  {
    id: "app-d",
    label: "Appendix D \u2014 Financial Tables",
    group: "Appendices",
    type: "md",
    file: resolve(DRAFTS, "appendix-d-financial-tables.md"),
  },
];

// ── Build ────────────────────────────────────────────────────────────────────

function loadSection(s) {
  if (!existsSync(s.file)) {
    console.warn(`  SKIP (not found): ${s.file}`);
    return null;
  }
  const raw = readFileSync(s.file, "utf-8");
  if (s.type === "md") {
    return { ...s, html: md(raw) };
  }
  if (s.type === "html-iframe") {
    // Escape for srcdoc embedding
    const escaped = raw.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
    return { ...s, srcdoc: escaped };
  }
  return null;
}

console.log("Building Kroger viewer...");
const loaded = sections.map(loadSection).filter(Boolean);
console.log(`  ${loaded.length}/${sections.length} sections loaded`);

// Build nav HTML
const groups = [...new Set(loaded.map((s) => s.group))];
let navHtml = "";
for (const g of groups) {
  const items = loaded.filter((s) => s.group === g);
  const isCollapsible = g === "Whitepaper" || g === "Appendices";
  navHtml += `<div class="nav-group${isCollapsible ? " collapsible collapsed" : ""}" data-group="${g}">`;
  navHtml += `<div class="nav-group-label" onclick="this.parentElement.classList.toggle('collapsed')">${g}${isCollapsible ? ' <span class="caret">&#9654;</span>' : ""}</div>`;
  navHtml += `<div class="nav-items">`;
  for (const s of items) {
    navHtml += `<a href="#${s.id}" data-section="${s.id}">${s.label}</a>`;
  }
  navHtml += `</div></div>`;
}

// Build content HTML
let contentHtml = "";
for (const s of loaded) {
  if (s.srcdoc) {
    contentHtml += `<div class="section-content" id="content-${s.id}" style="display:none"><iframe class="embedded-html" srcdoc="${s.srcdoc}" sandbox="allow-scripts allow-same-origin"></iframe></div>\n`;
  } else {
    contentHtml += `<div class="section-content" id="content-${s.id}" style="display:none"><div class="prose">${s.html}</div></div>\n`;
  }
}

// Assemble final HTML
const template = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Kroger Management Operating System</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif; background: #0a0a0a; color: #e0e0e0; display: flex; height: 100vh; }

  /* Sidebar */
  nav {
    width: 280px; min-width: 280px; background: #111; border-right: 1px solid #222;
    display: flex; flex-direction: column; overflow-y: auto;
  }
  nav .brand { padding: 20px 16px 16px; border-bottom: 1px solid #222; }
  nav .brand .eyebrow { font-size: 11px; text-transform: uppercase; letter-spacing: 2.2px; color: #555; }
  nav .brand .title { font-size: 17px; font-weight: 600; color: #fff; margin-top: 6px; line-height: 1.3; }
  nav .brand .subtitle { font-size: 12px; color: #666; margin-top: 4px; }

  .nav-group { padding: 0; }
  .nav-group-label {
    font-size: 11px; text-transform: uppercase; letter-spacing: 1.8px; color: #555;
    padding: 16px 16px 6px; cursor: default; user-select: none;
  }
  .nav-group.collapsible .nav-group-label { cursor: pointer; }
  .nav-group.collapsible .nav-group-label:hover { color: #888; }
  .nav-group.collapsed .nav-items { display: none; }
  .nav-group.collapsed .caret { display: inline-block; }
  .nav-group:not(.collapsed) .caret { display: inline-block; transform: rotate(90deg); }
  .caret { font-size: 9px; margin-left: 4px; transition: transform 0.15s; }

  .nav-items a {
    display: block; padding: 8px 16px; color: #aaa; text-decoration: none;
    font-size: 13px; border-left: 3px solid transparent; transition: all 0.15s;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }
  .nav-items a:hover { background: #1a1a1a; color: #fff; }
  .nav-items a.active { background: #0d1a2e; color: #5b9ef5; border-left-color: #1a73e8; }

  /* Main */
  main { flex: 1; overflow-y: auto; padding: 0; }
  .content-wrap { max-width: 860px; margin: 0 auto; padding: 40px 48px 80px; }

  /* Prose */
  .prose h1 { font-size: 28px; color: #fff; margin: 0 0 16px; line-height: 1.25; }
  .prose h2 { font-size: 22px; color: #93c5fd; margin: 32px 0 12px; padding-bottom: 6px; border-bottom: 1px solid #1a2744; }
  .prose h3 { font-size: 18px; color: #bbd4f1; margin: 24px 0 8px; }
  .prose h4 { font-size: 15px; color: #93c5fd; margin: 20px 0 6px; text-transform: uppercase; letter-spacing: 0.5px; }
  .prose p { line-height: 1.75; margin: 0 0 14px; color: #bbb; font-size: 15px; }
  .prose strong { color: #e0e0e0; }
  .prose em { color: #ccc; font-style: italic; }
  .prose a { color: #5b9ef5; text-decoration: none; border-bottom: 1px solid rgba(91,158,245,0.3); }
  .prose a:hover { border-bottom-color: #5b9ef5; }
  .prose hr { border: none; border-top: 1px solid #222; margin: 28px 0; }
  .prose ul, .prose ol { margin: 0 0 14px 24px; }
  .prose li { line-height: 1.7; margin-bottom: 4px; color: #bbb; font-size: 15px; }
  .prose blockquote { border-left: 3px solid #1a73e8; padding: 8px 16px; margin: 16px 0; background: #0d1117; border-radius: 4px; }
  .prose blockquote p { color: #93c5fd; margin: 0; font-style: italic; }
  .prose pre { background: #161b22; border: 1px solid #222; border-radius: 6px; padding: 16px; overflow-x: auto; margin: 16px 0; }
  .prose code { font-family: 'SF Mono', 'Fira Code', monospace; font-size: 13px; color: #d2a8ff; }
  .prose pre code { color: #c9d1d9; }
  .prose table { width: 100%; border-collapse: collapse; margin: 16px 0; font-size: 14px; }
  .prose th { text-align: left; padding: 8px 12px; border-bottom: 2px solid #333; color: #93c5fd; font-weight: 600; }
  .prose td { padding: 8px 12px; border-bottom: 1px solid #1a1a1a; color: #bbb; }
  .prose tr:hover td { background: #111; }

  /* Iframe sections */
  .embedded-html { width: 100%; height: calc(100vh - 80px); border: none; border-radius: 8px; background: #0f1419; }

  /* Section visibility */
  .section-content { display: none; }
  .section-content.active { display: block; }

  /* Mobile */
  .mobile-header { display: none; }
  .mobile-overlay { display: none; }

  @media (max-width: 768px) {
    body { flex-direction: column; height: auto; min-height: 100vh; }
    nav {
      position: fixed; top: 0; left: -300px; width: 280px; min-width: 0;
      height: 100vh; z-index: 200; transition: left 0.25s;
    }
    nav.open { left: 0; }
    .mobile-overlay {
      display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.6);
      z-index: 199;
    }
    .mobile-overlay.show { display: block; }
    .mobile-header {
      display: flex; align-items: center; gap: 12px;
      background: #111; border-bottom: 1px solid #222;
      padding: 12px 16px; position: sticky; top: 0; z-index: 50;
    }
    .mobile-header .hamburger {
      background: none; border: none; color: #fff; font-size: 22px; cursor: pointer; padding: 4px;
    }
    .mobile-header .mob-title { font-size: 14px; color: #ccc; font-weight: 600; }
    .content-wrap { padding: 24px 16px 60px; }
  }
</style>
</head>
<body>

<div class="mobile-overlay" onclick="closeMobileNav()"></div>
<div class="mobile-header">
  <button class="hamburger" onclick="openMobileNav()">&#9776;</button>
  <span class="mob-title">Kroger MOS</span>
</div>

<nav id="sidebar">
  <div class="brand">
    <div class="eyebrow">mception.ai</div>
    <div class="title">Kroger Management<br>Operating System</div>
    <div class="subtitle">Strategic Playbook &amp; Research</div>
  </div>
  ${navHtml}
</nav>

<main>
  <div class="content-wrap" id="content-area">
    ${contentHtml}
  </div>
</main>

<script>
(function() {
  const links = document.querySelectorAll('.nav-items a');
  const sections = document.querySelectorAll('.section-content');

  function show(id) {
    sections.forEach(s => { s.style.display = 'none'; s.classList.remove('active'); });
    links.forEach(a => a.classList.remove('active'));
    const target = document.getElementById('content-' + id);
    const link = document.querySelector('a[data-section="' + id + '"]');
    if (target) { target.style.display = 'block'; target.classList.add('active'); }
    if (link) {
      link.classList.add('active');
      // Expand parent group if collapsed
      const group = link.closest('.nav-group');
      if (group && group.classList.contains('collapsed')) group.classList.remove('collapsed');
    }
  }

  links.forEach(a => {
    a.addEventListener('click', function(e) {
      e.preventDefault();
      const id = this.dataset.section;
      history.replaceState(null, '', '#' + id);
      show(id);
      closeMobileNav();
      document.querySelector('main').scrollTop = 0;
    });
  });

  // Initial section
  const hash = location.hash.slice(1);
  const firstId = links.length ? links[0].dataset.section : null;
  show(hash || firstId);
})();

function openMobileNav() {
  document.getElementById('sidebar').classList.add('open');
  document.querySelector('.mobile-overlay').classList.add('show');
}
function closeMobileNav() {
  document.getElementById('sidebar').classList.remove('open');
  document.querySelector('.mobile-overlay').classList.remove('show');
}
</script>
</body>
</html>`;

writeFileSync(resolve(__dirname, "index.html"), template);
console.log("  Written: viewer/index.html");
console.log("Done.");
