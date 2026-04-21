#!/usr/bin/env python3
"""
Monarch Money CSV auto-exporter.

Logs into app.monarchmoney.com, exports the full Transactions CSV, and drops it
into the financial-assistant data/ directory so the skill always has fresh data.

Usage:
    python3 monarch-export.py

Required env vars:
    MONARCH_EMAIL     Brady's Monarch Money login email
    MONARCH_PASSWORD  Brady's Monarch Money login password

Optional:
    MONARCH_OUT_DIR   Override output directory (default: ../data/ relative to this script)
"""

import os
import sys
import time
from datetime import datetime
from pathlib import Path
from playwright.sync_api import sync_playwright, TimeoutError as PWTimeout

EMAIL = os.environ.get("MONARCH_EMAIL")
PASSWORD = os.environ.get("MONARCH_PASSWORD")

SCRIPT_DIR = Path(__file__).parent
DATA_DIR = Path(os.environ.get("MONARCH_OUT_DIR", SCRIPT_DIR / "../data")).resolve()

LOGIN_URL = "https://app.monarchmoney.com/login"
TRANSACTIONS_URL = "https://app.monarchmoney.com/transactions"


def bail(msg: str):
    print(f"[monarch-export] ERROR: {msg}", file=sys.stderr)
    sys.exit(1)


def run():
    if not EMAIL or not PASSWORD:
        bail("MONARCH_EMAIL and MONARCH_PASSWORD must be set in the environment.")

    DATA_DIR.mkdir(parents=True, exist_ok=True)

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False)  # headless=False helps with Cloudflare
        context = browser.new_context(accept_downloads=True)
        page = context.new_page()

        # --- Login ---
        print("[monarch-export] Navigating to login...")
        page.goto(LOGIN_URL, wait_until="domcontentloaded")
        time.sleep(3)  # let React hydrate

        # Try multiple selector strategies for the email field
        email_selectors = [
            'input[type="email"]',
            'input[name="email"]',
            'input[autocomplete="email"]',
            'input[autocomplete="username"]',
            'input[placeholder*="Email" i]',
            'input[placeholder*="email" i]',
            'input[id*="email" i]',
        ]
        email_field = None
        for sel in email_selectors:
            try:
                el = page.locator(sel).first
                el.wait_for(state="visible", timeout=5_000)
                email_field = el
                print(f"[monarch-export] Found email field: {sel}")
                break
            except Exception:
                continue

        if email_field is None:
            # Last resort: take a screenshot so we can see what's on the page
            page.screenshot(path=str(SCRIPT_DIR / "login-debug.png"))
            bail(
                "Could not find email input. Screenshot saved to scripts/login-debug.png. "
                "Open it to see what Monarch is showing (Cloudflare challenge, different UI, etc.)."
            )

        email_field.fill(EMAIL)

        password_selectors = [
            'input[type="password"]',
            'input[name="password"]',
            'input[autocomplete="current-password"]',
            'input[placeholder*="Password" i]',
        ]
        password_field = None
        for sel in password_selectors:
            try:
                el = page.locator(sel).first
                el.wait_for(state="visible", timeout=3_000)
                password_field = el
                break
            except Exception:
                continue

        if password_field is None:
            bail("Could not find password input.")

        password_field.fill(PASSWORD)
        page.click('button[type="submit"]')

        # Wait for post-login redirect (Monarch may land on /dashboard, /accounts, or /transactions)
        try:
            page.wait_for_function(
                "() => !window.location.pathname.includes('/login')",
                timeout=30_000,
            )
            print(f"[monarch-export] Logged in — at {page.url}")
        except PWTimeout:
            page.screenshot(path=str(SCRIPT_DIR / "login-debug.png"))
            bail("Login did not redirect away from /login. Screenshot saved to scripts/login-debug.png.")

        print("[monarch-export] Logged in.")

        # --- Navigate to Transactions ---
        page.goto(TRANSACTIONS_URL, wait_until="networkidle")
        print("[monarch-export] On transactions page.")

        time.sleep(2)

        # --- Trigger CSV export ---
        export_selectors = [
            'button[aria-label*="Export"]',
            'button[aria-label*="Download"]',
            '[data-testid="export-button"]',
            '[data-testid="download-csv"]',
            'button:has-text("Export")',
            'button:has-text("Download CSV")',
            'button:has-text("Download")',
            '[aria-label*="More options"]',
            '[aria-label*="Options"]',
        ]

        export_btn = None
        for sel in export_selectors:
            try:
                btn = page.locator(sel).first
                if btn.is_visible(timeout=2_000):
                    export_btn = btn
                    print(f"[monarch-export] Found export control: {sel}")
                    break
            except Exception:
                continue

        if export_btn is None:
            bail(
                "Could not find an Export/Download button on the Transactions page. "
                "Monarch may have updated their UI — update export_selectors in this script."
            )

        label = (export_btn.get_attribute("aria-label") or "").lower()
        if "option" in label or "more" in label:
            export_btn.click(force=True)
            time.sleep(0.5)
            # Try each selector individually — comma-separated text= is not valid Playwright syntax
            csv_option = None
            for csv_sel in [
                'text="Export CSV"',
                'text="Download CSV"',
                '[role="menuitem"]:has-text("Export")',
                '[role="option"]:has-text("Export")',
                'li:has-text("Export")',
                'text="Export"',
            ]:
                try:
                    opt = page.locator(csv_sel).first
                    if opt.is_visible(timeout=1_500):
                        csv_option = opt
                        print(f"[monarch-export] Found CSV menu item: {csv_sel}")
                        break
                except Exception:
                    continue
            if csv_option is None:
                bail("Could not find CSV export menu item after clicking More options.")
            with page.expect_download(timeout=30_000) as dl_info:
                csv_option.click(force=True)
        else:
            with page.expect_download(timeout=30_000) as dl_info:
                export_btn.click(force=True)

        download = dl_info.value

        # --- Save to data/ ---
        timestamp = datetime.now().strftime("%Y-%m-%dT%H-%M-%S")
        dest = DATA_DIR / f"Transactions_{timestamp}.csv"
        download.save_as(dest)
        print(f"[monarch-export] Saved: {dest}")

        context.close()
        browser.close()

    return dest


if __name__ == "__main__":
    result = run()
    print(f"[monarch-export] Done — {result}")
