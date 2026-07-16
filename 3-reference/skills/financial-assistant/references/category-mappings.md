# Category Mappings

Maps Monarch Money export categories to Brady's unified analysis categories.

## Monarch CSV Column Format
Columns: `Date, Merchant, Category, Account, Original Statement, Notes, Amount, Tags, Owner`

**Amount convention:**
- Negative = money spent (purchases)
- Positive = money received (returns, refunds, income, transfers IN)

---

## Spending Categories (Negative Amounts)

### Groceries
- Groceries

### Dining Out
- Restaurants
- Fast Food
- Coffee Shops
- Food & Drink
- Alcohol & Bars

### Shopping / Retail
- Shopping
- Clothing
- Electronics & Software
- Hobbies
- Home Improvement
- Home Supplies
- Furniture
- General Merchandise

### Gas / Transportation
- Gas
- Auto & Transport
- Parking
- Ride Share
- Auto Maintenance
- Auto Insurance

### Kids / Family
- Kids
- Baby
- Education
- Toys
- Kids Activities
- Pets

### Medical / Health
- Doctor
- Pharmacy
- Dentist
- Dental
- Health & Fitness
- Personal Care
- Medical

### Housing
- Mortgage & Rent
- Home Services
- Utilities

### Subscriptions / Services
- Subscriptions
- Streaming Services
- Internet & Phone
- Mobile Phone
- Software

### Insurance
- Insurance
- Life Insurance
- Health Insurance

### Business
- Business Services
- Office Supplies

### Other Spending
- Gifts & Donations
- Charity
- Travel
- Hotels
- Flights
- Entertainment
- Arts
- Books & News
- Fees & Charges
- ATM
- Service Charges
- Late Fees

---

## Non-Spending (Exclude from spend totals)

### Accounts to Exclude Entirely
Transactions originating from these accounts are excluded from all spending analysis.
The mortgage escrow account disburses property taxes and insurance on Brady's behalf —
those are already baked into the mortgage payment and should not appear as separate spend lines.

- `Mortgage 6368 (...6368)` — Truist escrow disbursements (property tax, insurance). Exclude all.

### Transfers (Excluded)
- Transfer
- Credit Card Payment
- Savings
- Investment
- Loan Payment

### Income (Track separately)
- Paycheck
- Income
- Interest
- Dividend
- Refund
- Reimbursement

---

## Return Detection Rules

Positive amounts that are NOT income/transfers are merchant returns. To isolate actual merchant returns:

**EXCLUDE these merchants/patterns from return counts:**
- arvest, tnxi, trinet, transfer, paycheck, betterment, venmo, greenlight, payroll, loan, zelle, wageworks

**Everything else with a positive amount = merchant return.**

---

## High-Frequency Merchants to Track Individually

Never aggregate these into "Other" — always show individually:
- Walmart
- Amazon
- Target
- DoorDash
- McDonald's
- Chick-fil-A
- Domino's
- Shogun
- Tokyo House
- Barnes & Noble
- Casey's
- Sam's Club
- H&M
- American Eagle
