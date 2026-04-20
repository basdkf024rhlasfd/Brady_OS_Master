# Monarch CSV Export Drop Zone

The financial-assistant skill automatically checks `~/Downloads/` first, then this folder. You don't need to move files manually — just export from Monarch and the skill will find it.

## How to export from Monarch

1. Open [Monarch Money](https://app.monarchmoney.com)
2. Go to **Transactions**
3. Set the date range (recommend: "All Time" or at least last 90 days)
4. Click **Export** (top right) → **Download CSV**
5. That's it — the skill checks Downloads automatically and copies the CSV here for archival

## File naming

Any `.csv` file in this folder will be processed. Monarch's default naming is fine.
The skill reads the date column inside the CSV to determine coverage, so the filename doesn't matter.

## Refresh cadence

- Weekly (before Sunday weekly sweep) is ideal
- The skill warns if the newest transaction is >14 days old
- Old CSVs can stay here — the skill reads all of them and deduplicates by date + amount + description

## Privacy

CSV files in this folder are **gitignored** and never committed to the repo.
