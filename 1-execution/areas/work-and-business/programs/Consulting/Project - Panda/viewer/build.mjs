#!/usr/bin/env node
/**
 * Panda Viewer — Build Script
 * Reads markdown source files, converts to HTML, and outputs a single index.html.
 * Zero dependencies — uses a lightweight inline markdown converter.
 * Adapted from Kroger viewer pattern.
 */
import { readFileSync, writeFileSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT = resolve(__dirname, "..");

// ── Lightweight Markdown → HTML ──────────────────────────────────────────────

function md(src) {
  let html = src;
  html = html.replace(/\r\n/g, "\n");

  // Fenced code blocks
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) => {
    const escaped = esc(code.trimEnd());
    return `<pre><code class="lang-${lang || "text"}">${escaped}</code></pre>`;
  });

  // Inline code
  html = html.replace(/`([^`]+)`/g, "<code>$1</code>");

  // Tables
  html = html.replace(
    /^(\|.+\|)\n(\|[\s:|-]+\|)\n((?:\|.+\|\n?)*)/gm,
    (_, header, _sep, body) => {
      const th = header.split("|").filter(Boolean).map(c => `<th>${c.trim()}</th>`).join("");
      const rows = body.trim().split("\n").map(r => {
        const cells = r.split("|").filter(Boolean).map(c => `<td>${c.trim()}</td>`).join("");
        return `<tr>${cells}</tr>`;
      }).join("\n");
      return `<table><thead><tr>${th}</tr></thead><tbody>${rows}</tbody></table>`;
    }
  );

  // Blockquotes
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
    const items = block.trim().split("\n").map(l => `<li>${l.replace(/^[-*]\s+/, "")}</li>`).join("\n");
    return `<ul>${items}</ul>\n`;
  });

  // Ordered lists
  html = html.replace(/^((?:\d+\.\s+.+\n?)+)/gm, (block) => {
    const items = block.trim().split("\n").map(l => `<li>${l.replace(/^\d+\.\s+/, "")}</li>`).join("\n");
    return `<ol>${items}</ol>\n`;
  });

  // Bold + italic
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, "<strong><em>$1</em></strong>");
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');

  // Wrap remaining bare lines in paragraphs
  html = html.split("\n\n").map(block => {
    block = block.trim();
    if (!block) return "";
    if (block.startsWith("<h") || block.startsWith("<ul") || block.startsWith("<ol") ||
        block.startsWith("<table") || block.startsWith("<pre") ||
        block.startsWith("<blockquote") || block.startsWith("<hr")) {
      return block;
    }
    return `<p>${block.replace(/\n/g, "<br>")}</p>`;
  }).join("\n\n");

  return html;
}

function esc(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// ── Section Definitions ──────────────────────────────────────────────────────

const sections = [
  // Featured
  {
    id: "company-overview",
    label: "Company Overview",
    group: "Featured",
    type: "md",
    file: resolve(PROJECT, "panda-company-research.md"),
  },
  {
    id: "james-ku",
    label: "James Ku — CDO Profile",
    group: "Featured",
    type: "md",
    file: resolve(PROJECT, "james-ku-research.md"),
  },
  {
    id: "talk-track",
    label: "Talk Track",
    group: "Featured",
    type: "md",
    file: resolve(PROJECT, "talk-track.md"),
  },

  // Store Innovation
  {
    id: "store-innovation",
    label: "Store Innovation Benchmark",
    group: "Store Innovation",
    type: "md",
    file: resolve(PROJECT, "store-innovation-benchmark.md"),
  },
];

// ── Build ────────────────────────────────────────────────────────────────────

function loadSection(s) {
  if (!existsSync(s.file)) {
    console.warn(`  SKIP (not found): ${s.file}`);
    return null;
  }
  const raw = readFileSync(s.file, "utf-8");
  return { ...s, html: md(raw) };
}

console.log("Building Panda viewer...");
const loaded = sections.map(loadSection).filter(Boolean);
console.log(`  ${loaded.length}/${sections.length} sections loaded`);

// Build nav HTML
const groups = [...new Set(loaded.map(s => s.group))];
let navHtml = "";
for (const g of groups) {
  const items = loaded.filter(s => s.group === g);
  navHtml += `<div class="nav-group" data-group="${g}">`;
  navHtml += `<div class="nav-group-label">${g}</div>`;
  navHtml += `<div class="nav-items">`;
  for (const s of items) {
    navHtml += `<a href="#${s.id}" data-section="${s.id}">${s.label}</a>`;
  }
  navHtml += `</div></div>`;
}

// Build content HTML
let contentHtml = "";
for (const s of loaded) {
  contentHtml += `<div class="section-content" id="content-${s.id}" style="display:none"><div class="prose">${s.html}</div></div>\n`;
}

// Assemble final HTML
const template = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Panda Restaurant Group — Research Brief</title>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=DM+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
  :root {
    --bg: #0C0F14;
    --bg-card: #13161D;
    --bg-card-alt: #181C25;
    --gold: #D4A843;
    --gold-dim: #9A7B32;
    --blue: #4A7FB5;
    --dark-blue: #1E3A5F;
    --white: #F0EDE6;
    --gray: #8A8D94;
    --gray-light: #B0B3BA;
    --red: #C45C5C;
    --red-dim: #8B3A3A;
  }

  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
    background: var(--bg);
    color: var(--white);
    display: flex;
    height: 100vh;
  }

  /* Sidebar */
  nav {
    width: 280px; min-width: 280px;
    background: var(--bg-card);
    border-right: 1px solid rgba(255,255,255,0.06);
    display: flex; flex-direction: column; overflow-y: auto;
  }
  nav .brand {
    padding: 24px 20px 20px;
    border-bottom: 1px solid rgba(255,255,255,0.06);
  }
  nav .brand .eyebrow {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 3px;
    color: var(--gold);
  }
  nav .brand .title {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 18px;
    font-weight: 700;
    color: var(--white);
    margin-top: 8px;
    line-height: 1.3;
    letter-spacing: -0.5px;
  }
  nav .brand .subtitle {
    font-family: 'DM Sans', sans-serif;
    font-size: 12px;
    color: var(--gray);
    margin-top: 4px;
  }

  .nav-group { padding: 0; }
  .nav-group-label {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 2.5px;
    color: var(--gold-dim);
    padding: 20px 20px 8px;
    user-select: none;
  }
  .nav-items a {
    display: block; padding: 10px 20px;
    color: var(--gray-light);
    text-decoration: none;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    border-left: 3px solid transparent;
    transition: all 0.15s;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }
  .nav-items a:hover {
    background: var(--bg-card-alt);
    color: var(--white);
  }
  .nav-items a.active {
    background: rgba(212,168,67,0.08);
    color: var(--gold);
    border-left-color: var(--gold);
  }

  /* Main */
  main { flex: 1; overflow-y: auto; padding: 0; }
  .content-wrap { max-width: 860px; margin: 0 auto; padding: 40px 52px 80px; }

  /* Prose — mception design system */
  .prose h1 {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 28px;
    font-weight: 700;
    color: var(--white);
    margin: 0 0 16px;
    line-height: 1.25;
    letter-spacing: -1px;
  }
  .prose h2 {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 22px;
    font-weight: 700;
    color: var(--gold);
    margin: 36px 0 14px;
    padding-bottom: 8px;
    border-bottom: 1px solid rgba(212,168,67,0.2);
  }
  .prose h3 {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 17px;
    font-weight: 600;
    color: var(--white);
    margin: 28px 0 10px;
  }
  .prose h4 {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    font-weight: 500;
    color: var(--gold);
    margin: 24px 0 8px;
    text-transform: uppercase;
    letter-spacing: 2px;
  }
  .prose p {
    font-family: 'DM Sans', sans-serif;
    line-height: 1.75;
    margin: 0 0 14px;
    color: var(--gray-light);
    font-size: 15px;
  }
  .prose strong { color: var(--white); }
  .prose em { color: var(--gray-light); font-style: italic; }
  .prose a {
    color: var(--gold);
    text-decoration: none;
    border-bottom: 1px solid rgba(212,168,67,0.3);
  }
  .prose a:hover { border-bottom-color: var(--gold); }
  .prose hr { border: none; border-top: 1px solid rgba(255,255,255,0.06); margin: 28px 0; }
  .prose ul, .prose ol { margin: 0 0 14px 24px; }
  .prose li {
    line-height: 1.7;
    margin-bottom: 4px;
    color: var(--gray-light);
    font-size: 15px;
    font-family: 'DM Sans', sans-serif;
  }
  .prose blockquote {
    border-left: 3px solid var(--gold-dim);
    padding: 10px 18px;
    margin: 16px 0;
    background: var(--bg-card);
    border-radius: 6px;
  }
  .prose blockquote p { color: var(--gold); margin: 0; font-style: italic; }
  .prose pre {
    background: var(--bg-card-alt);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 8px;
    padding: 16px;
    overflow-x: auto;
    margin: 16px 0;
  }
  .prose code {
    font-family: 'JetBrains Mono', monospace;
    font-size: 13px;
    color: var(--gold);
  }
  .prose pre code { color: var(--gray-light); }
  .prose table {
    width: 100%; border-collapse: collapse; margin: 16px 0; font-size: 14px;
  }
  .prose th {
    font-family: 'JetBrains Mono', monospace;
    text-align: left;
    padding: 10px 14px;
    border-bottom: 2px solid rgba(212,168,67,0.3);
    color: var(--gold);
    font-weight: 500;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  .prose td {
    padding: 10px 14px;
    border-bottom: 1px solid rgba(255,255,255,0.04);
    color: var(--gray-light);
    font-family: 'DM Sans', sans-serif;
  }
  .prose tr:hover td { background: var(--bg-card); }

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
      background: var(--bg-card);
      border-bottom: 1px solid rgba(255,255,255,0.06);
      padding: 14px 20px; position: sticky; top: 0; z-index: 50;
    }
    .mobile-header .hamburger {
      background: none; border: none; color: var(--white); font-size: 22px; cursor: pointer; padding: 4px;
    }
    .mobile-header .mob-title {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 14px; color: var(--white); font-weight: 600;
    }
    .content-wrap { padding: 24px 16px 60px; }
  }
</style>
</head>
<body>

<div class="mobile-overlay" onclick="closeMobileNav()"></div>
<div class="mobile-header">
  <button class="hamburger" onclick="openMobileNav()">&#9776;</button>
  <span class="mob-title">Panda Restaurant Group</span>
</div>

<nav id="sidebar">
  <div class="brand">
    <div class="eyebrow">mception.ai</div>
    <div class="title">Panda Restaurant Group</div>
    <div class="subtitle">Research Brief &amp; Meeting Prep</div>
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
    if (link) link.classList.add('active');
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
