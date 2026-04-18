# Monarch CSV Export Drop Zone

Drop Monarch Money CSV exports here. The financial-assistant skill will parse them automatically.

## How to export from Monarch

1. Open [Monarch Money](https://app.monarchmoney.com)
2. Go to **Transactions**
3. Set the date range (recommend: last 90 days for trend analysis)
4. Click **Export** (top right) → **Download CSV**
5. Move the downloaded CSV into this folder

## File naming

Any `.csv` file in this folder will be processed. Monarch's default naming is fine.
The skill reads the date column inside the CSV to determine coverage, so the filename doesn't matter.

## Refresh cadence

- Weekly (before Sunday weekly sweep) is ideal
- The skill warns if the newest transaction is >14 days old
- Old CSVs can stay here — the skill reads all of them and deduplicates by date + amount + description

## Privacy

CSV files in this folder are **gitignored** and never committed to the repo.
