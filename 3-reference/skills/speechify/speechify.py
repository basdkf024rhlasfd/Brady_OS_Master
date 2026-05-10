#!/usr/bin/env python3
"""
Speechify skill — send content to Brady's Speechify library via the
Premium Send-to-Speechify forwarding email.

Usage:
    python3 speechify.py <path-or-url-or-text> [--force] [--auto-send]
    python3 speechify.py - < some_file.md     (read stdin)

Outputs the cleaned plaintext, the suggested subject line, and either
prints "DRAFT-READY" with the email body for the caller to hand to the
Gmail MCP, or prints "AUTO-SEND" if auto-send config is on.

The actual email send happens via the Gmail MCP tool that the calling
skill invocation has loaded. This script is the prep step.
"""
from __future__ import annotations

import argparse
import os
import re
import sys
import tempfile
from datetime import datetime
from pathlib import Path
from urllib.parse import urlparse

CONFIG_DIR = Path.home() / ".config" / "speechify"
FORWARDING_EMAIL_FILE = CONFIG_DIR / "forwarding-email.txt"
AUTO_SEND_FILE = CONFIG_DIR / "auto-send.txt"
SENT_LOG = CONFIG_DIR / "sent-log.txt"

WORDS_PER_MINUTE_TTS = 175  # standard TTS pace estimate
MIN_BODY_CHARS = 100
MAX_BODY_CHARS = 250_000  # Speechify Premium per-email cap (approximate)
MIN_DURATION_SEC = 30
MAX_DURATION_SEC = 8 * 3600


class SpeechifyError(Exception):
    pass


def load_forwarding_email() -> str:
    if not FORWARDING_EMAIL_FILE.exists():
        raise SpeechifyError(
            f"Speechify forwarding email not configured.\n"
            f"Create {FORWARDING_EMAIL_FILE} containing your unique\n"
            f"Send-to-Speechify forwarding address (one line, no extra text).\n"
            f"Find it in Speechify: Settings → Send to Speechify Email."
        )
    addr = FORWARDING_EMAIL_FILE.read_text().strip()
    if not re.match(r"^[^@\s]+@speechify\.com$", addr):
        raise SpeechifyError(
            f"Forwarding address in {FORWARDING_EMAIL_FILE} doesn't look right: {addr!r}\n"
            f"Expected pattern: <something>@speechify.com"
        )
    return addr


def auto_send_enabled() -> bool:
    if not AUTO_SEND_FILE.exists():
        return False
    return AUTO_SEND_FILE.read_text().strip().lower() in ("yes", "y", "true", "1", "on")


def is_url(s: str) -> bool:
    return s.startswith(("http://", "https://"))


def fetch_url(url: str) -> tuple[str, str]:
    """Returns (raw_content, content_type)."""
    import requests
    headers = {"User-Agent": "Mozilla/5.0 (Speechify-skill via brady-os)"}
    resp = requests.get(url, headers=headers, timeout=30)
    resp.raise_for_status()
    return resp.text if "text" in resp.headers.get("Content-Type", "") else resp.content, resp.headers.get("Content-Type", "")


def extract_pdf(path: Path) -> str:
    try:
        import fitz  # pymupdf
        doc = fitz.open(str(path))
        return "\n\n".join(page.get_text() for page in doc)
    except ImportError:
        pass
    try:
        import pdfplumber
        with pdfplumber.open(str(path)) as pdf:
            return "\n\n".join((p.extract_text() or "") for p in pdf.pages)
    except ImportError:
        pass
    raise SpeechifyError("No PDF extraction library available. pip install pymupdf or pdfplumber.")


def extract_html(html: str) -> tuple[str, str | None]:
    """Returns (text, title-or-None)."""
    try:
        from bs4 import BeautifulSoup
    except ImportError:
        raise SpeechifyError("BeautifulSoup not available. pip install beautifulsoup4.")
    soup = BeautifulSoup(html, "html.parser")
    for tag in soup(["script", "style", "nav", "footer", "header", "aside", "form"]):
        tag.decompose()
    title_tag = soup.find("h1") or soup.find("title")
    title = title_tag.get_text(strip=True) if title_tag else None
    article = soup.find("article") or soup.find("main") or soup.body or soup
    text = article.get_text("\n", strip=False)
    text = re.sub(r"\n{3,}", "\n\n", text)
    return text.strip(), title


def clean_markdown(md: str) -> tuple[str, str | None]:
    """Strip markdown formatting characters; return (text, h1_title-or-None)."""
    title_match = re.search(r"^#\s+(.+)$", md, re.MULTILINE)
    title = title_match.group(1).strip() if title_match else None
    text = md
    text = re.sub(r"```.*?```", "", text, flags=re.DOTALL)  # code fences
    text = re.sub(r"`([^`]+)`", r"\1", text)  # inline code
    text = re.sub(r"!\[([^\]]*)\]\([^)]+\)", "", text)  # images
    text = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", text)  # links → link text only
    text = re.sub(r"^\s*\|.*\|\s*$", "", text, flags=re.MULTILINE)  # tables
    text = re.sub(r"^\s*[-=*_]{3,}\s*$", "", text, flags=re.MULTILINE)  # hr
    text = re.sub(r"^#{1,6}\s+(.+)$", r"\1.", text, flags=re.MULTILINE)  # headings
    text = re.sub(r"\*\*\*([^*]+)\*\*\*|___([^_]+)___", lambda m: m.group(1) or m.group(2), text)
    text = re.sub(r"\*\*([^*]+)\*\*|__([^_]+)__", lambda m: m.group(1) or m.group(2), text)
    text = re.sub(r"\*([^*]+)\*|_([^_]+)_", lambda m: m.group(1) or m.group(2), text)
    text = re.sub(r"^\s*>\s?", "", text, flags=re.MULTILINE)  # blockquote markers
    text = re.sub(r"^\s*[-*+]\s+", "", text, flags=re.MULTILINE)  # bullets
    text = re.sub(r"^\s*\d+\.\s+", "", text, flags=re.MULTILINE)  # numbered
    text = re.sub(r"<span[^>]*>(.*?)</span>", r"\1", text, flags=re.DOTALL)  # span markers
    text = re.sub(r"<[^>]+>", "", text)  # any other HTML
    text = re.sub(r"\n{3,}", "\n\n", text)
    return text.strip(), title


def resolve_input(arg: str) -> tuple[str, str | None, str]:
    """
    Returns (cleaned_text, suggested_title, source_label).
    """
    if arg == "-":
        raw = sys.stdin.read()
        text, title = clean_markdown(raw)
        return text, title, "stdin"

    if is_url(arg):
        content, content_type = fetch_url(arg)
        if "pdf" in content_type:
            with tempfile.NamedTemporaryFile(suffix=".pdf", delete=False) as f:
                f.write(content if isinstance(content, bytes) else content.encode())
                tmp_path = Path(f.name)
            text = extract_pdf(tmp_path)
            tmp_path.unlink()
            title = urlparse(arg).path.rsplit("/", 1)[-1] or "Untitled PDF"
            return text, title, arg
        if "html" in content_type:
            text, title = extract_html(content if isinstance(content, str) else content.decode())
            return text, title or "Untitled article", arg
        text = content if isinstance(content, str) else content.decode("utf-8", errors="replace")
        return text, urlparse(arg).path.rsplit("/", 1)[-1] or "Untitled URL", arg

    p = Path(arg).expanduser()
    if p.is_file():
        ext = p.suffix.lower()
        if ext == ".pdf":
            text = extract_pdf(p)
            return text, p.stem, str(p)
        if ext in (".md", ".markdown", ".txt"):
            raw = p.read_text(encoding="utf-8")
            text, title = clean_markdown(raw)
            return text, title or p.stem, str(p)
        if ext in (".html", ".htm"):
            text, title = extract_html(p.read_text(encoding="utf-8"))
            return text, title or p.stem, str(p)
        raise SpeechifyError(f"Unsupported file extension: {ext}. Convert to .md/.txt/.pdf/.html first.")

    text, title = clean_markdown(arg)
    return text, title or "Inline text", "inline"


def estimate_duration_seconds(text: str) -> int:
    word_count = len(text.split())
    return int(round(word_count / WORDS_PER_MINUTE_TTS * 60))


def quality_check(text: str, title: str, force: bool):
    if len(text) < MIN_BODY_CHARS and not force:
        raise SpeechifyError(f"Cleaned body only {len(text)} chars. Min {MIN_BODY_CHARS}. Use --force to override.")
    if len(text) > MAX_BODY_CHARS and not force:
        raise SpeechifyError(
            f"Cleaned body {len(text):,} chars, exceeds Speechify per-email cap ({MAX_BODY_CHARS:,}).\n"
            f"Split at section breaks and send as multiple emails ('Part 1 of N')."
        )
    if not title or len(title) > 120:
        raise SpeechifyError(f"Subject line invalid (title length: {len(title or '')}; max 120).")
    duration = estimate_duration_seconds(text)
    if duration < MIN_DURATION_SEC and not force:
        raise SpeechifyError(f"Estimated duration only {duration}s — too short. Use --force to override.")
    if duration > MAX_DURATION_SEC and not force:
        raise SpeechifyError(f"Estimated duration {duration//3600}h{(duration%3600)//60}m — too long. Split.")
    upper_ratio = sum(1 for c in text if c.isupper()) / max(sum(1 for c in text if c.isalpha()), 1)
    if upper_ratio > 0.5 and not force:
        raise SpeechifyError(f"Cleaned body looks like a bad PDF extraction ({upper_ratio:.0%} uppercase). Use --force to override.")


def log_sent(source: str, char_count: int, duration_sec: int):
    CONFIG_DIR.mkdir(parents=True, exist_ok=True)
    line = f"{datetime.utcnow().isoformat(timespec='seconds')}Z | {source} | {char_count:,} chars | ~{duration_sec//60}m audio\n"
    with SENT_LOG.open("a") as f:
        f.write(line)


def main(argv: list[str]) -> int:
    parser = argparse.ArgumentParser(description="Send content to Brady's Speechify library.")
    parser.add_argument("input", help="File path, URL, or '-' for stdin, or inline text")
    parser.add_argument("--force", action="store_true", help="Override quality gates")
    parser.add_argument("--auto-send", action="store_true", help="Skip the draft step (overrides config)")
    args = parser.parse_args(argv)

    try:
        forwarding_email = load_forwarding_email()
    except SpeechifyError as e:
        print(f"ERROR: {e}", file=sys.stderr)
        return 2

    try:
        text, title, source = resolve_input(args.input)
    except SpeechifyError as e:
        print(f"ERROR: {e}", file=sys.stderr)
        return 3

    title = title or "Untitled"
    subject = f"[Speechify] {title}"

    try:
        quality_check(text, title, args.force)
    except SpeechifyError as e:
        print(f"QUALITY GATE FAILED: {e}", file=sys.stderr)
        return 4

    char_count = len(text)
    duration_sec = estimate_duration_seconds(text)

    auto = args.auto_send or auto_send_enabled()

    print("=" * 60)
    print(f"To:      {forwarding_email}")
    print(f"Subject: {subject}")
    print(f"Length:  {char_count:,} chars (~{char_count/5:.0f} words, ~{duration_sec//60}m {duration_sec%60}s audio)")
    print(f"Source:  {source}")
    print(f"Mode:    {'AUTO-SEND' if auto else 'DRAFT-READY'}")
    print("=" * 60)
    print()
    print(text)
    print()
    print("=" * 60)
    print(f"END OF BODY — caller should now invoke Gmail MCP to {'send' if auto else 'create draft'}.")
    log_sent(source, char_count, duration_sec)
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
