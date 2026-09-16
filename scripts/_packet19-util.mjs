/**
 * Packet 19 helpers: the id scheme scripts/mint-item-ids.mjs uses, so hand-authored items carry ids
 * of the same shape (`<section>:<kind>:<hash8(key)>`), the validator's own word counter, and Yusra
 * Foods — the one firm whose figures this section carries across its body, diagrams, notes and
 * assessment.
 *
 * WHY ONE FIRM WITH ONE FUNDING HISTORY. IAL Business 2.3.1 asks for internal finance (2), six
 * SOURCES and seven METHODS of external finance "and their suitability for different circumstances"
 * (3a, 3b), four forms of business (4) and the finance appropriate to limited and unlimited
 * liability (5b). Those are not five topics: they are five questions about the same decision, asked
 * at different moments in one firm's life. So the section follows one firm from a founder's savings
 * to a stock market flotation, and every source, method, form and liability question is a moment in
 * that history:
 *
 *      start-up $240,000  =  owner's capital $60,000 + family and friends $30,000
 *                            + a bank loan $90,000 + a business angel $60,000
 *
 * The angel's $60,000 buys 30,000 new shares beside the founder's 120,000, so the founder holds
 * exactly 80% and the angel 20%; at flotation another 150,000 shares take the founder to 40%. Both
 * are exact, which is the point — a dilution a student can check beats a dilution asserted.
 *
 * Every figure below is derived here and re-derived by the runner from the emitted SVG, so a number
 * that changes in one surface and not another fails the build (packet 15's accuracy-01 rule). Yusra
 * Foods is fictional and, like packet 16's Zuri and packet 17's Tafari, is given no country: the
 * REAL examples carry the internationalisation this section was missing (structure-09: 10 of its 12
 * March examples were UK firms, and the two that were not included the invented Tesla narrative).
 * One currency: dollars.
 */
import { createHash } from 'node:crypto';

export const SECTION = 'planning-raising-finance';

const norm = (s) => String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
export const hash8 = (s) => createHash('sha1').update(norm(s)).digest('hex').slice(0, 8);
export const id = (kind, key) => `${SECTION}:${kind}:${hash8(key)}`;
export const subId = (s) => `${SECTION}:sub:${s}`;

/* ── the start-up funding package (2a, 3a-1, 3a-2, 3a-4) ───────────────────── */

export const NEED = 240000;            // what the first production line and premises cost
export const OWNER_CAPITAL = 60000;    // 2a  the founder's own savings
export const FAMILY = 30000;           // 3a-1 family and friends
export const BANK_LOAN = 90000;        // 3a-2 / 3b-1 a five-year bank loan
export const ANGEL = 60000;            // 3a-4 / 3b-2 a business angel, for equity
export const STACK = [
  { label: "Owner's capital", amount: OWNER_CAPITAL, kind: 'internal', leaf: '2a' },
  { label: 'Family and friends', amount: FAMILY, kind: 'equity', leaf: '3a-1' },
  { label: 'Bank loan', amount: BANK_LOAN, kind: 'debt', leaf: '3b-1' },
  { label: 'Business angel', amount: ANGEL, kind: 'equity', leaf: '3a-4' },
];
export const stackTotal = () => STACK.reduce((n, s) => n + s.amount, 0);

/* ── ownership, and what issuing shares does to it (3b-2, 4c, 5b) ──────────── */

export const FOUNDER_SHARES = 120000;
export const ANGEL_SHARES = 30000;          // $60,000 at $2.00 a share
export const ANGEL_PRICE = 2;
export const FLOAT_SHARES = 150000;         // sold to the public at $6.00 at flotation
export const FLOAT_PRICE = 6;
export const floatRaised = () => FLOAT_SHARES * FLOAT_PRICE;               // $900,000
export const sharesAfterAngel = () => FOUNDER_SHARES + ANGEL_SHARES;        // 150,000
export const sharesAfterFloat = () => sharesAfterAngel() + FLOAT_SHARES;    // 300,000
/** A holding as a whole-number percentage of the shares in issue at that moment. */
export const stake = (shares, total) => Math.round((shares / total) * 1000) / 10;
export const FOUNDER_AT_START = () => stake(FOUNDER_SHARES, FOUNDER_SHARES);        // 100
export const FOUNDER_AFTER_ANGEL = () => stake(FOUNDER_SHARES, sharesAfterAngel()); // 80
export const ANGEL_AFTER_ANGEL = () => stake(ANGEL_SHARES, sharesAfterAngel());     // 20
export const FOUNDER_AFTER_FLOAT = () => stake(FOUNDER_SHARES, sharesAfterFloat()); // 40
export const ANGEL_AFTER_FLOAT = () => stake(ANGEL_SHARES, sharesAfterFloat());     // 10
export const PUBLIC_AFTER_FLOAT = () => stake(FLOAT_SHARES, sharesAfterFloat());    // 50

/* ── internal finance in year three (2b, 2c) ───────────────────────────────── */

export const PROFIT_AFTER_TAX = 48000;   // 2b
export const DIVIDENDS = 12000;
export const retained = () => PROFIT_AFTER_TAX - DIVIDENDS;   // $36,000
/*
 * The contradiction packet 19 was sent to fix (topFix-04): the March body said retained profit "has
 * no cost — there is no interest to pay", and the same section's own 20-mark answer said using it
 * carries an opportunity cost. Both cannot be taught. The section teaches the second and prices it:
 * money kept in the business is money not placed anywhere else, and a deposit rate makes that
 * visible without asserting anything about any real market.
 */
export const DEPOSIT_RATE = 5;           // % a year, the stated alternative use
export const retainedOpportunityCost = () => Math.round(retained() * (DEPOSIT_RATE / 100));  // $1,800
export const VAN_SALE = 8000;            // 2c  an ageing delivery van, sold outright

/* ── the methods, priced (3b-1, 3b-4, 3b-5, 3b-6, 3b-7) ────────────────────── */

export const LOAN_YEARS = 5;
export const LOAN_MONTHLY = 1800;
export const loanRepaid = () => LOAN_MONTHLY * LOAN_YEARS * 12;        // $108,000
export const loanInterest = () => loanRepaid() - BANK_LOAN;            // $18,000
export const OVERDRAFT_LIMIT = 20000;                                   // 3b-4
export const MACHINE_PRICE = 40000;                                     // 3b-5 buy outright
export const LEASE_MONTHLY = 900;
export const LEASE_MONTHS = 48;
export const leaseTotal = () => LEASE_MONTHLY * LEASE_MONTHS;          // $43,200
export const leasePremium = () => leaseTotal() - MACHINE_PRICE;        // $3,200
export const SUPPLY_MONTHLY = 15000;                                    // 3b-6 trade credit
export const CREDIT_DAYS = 60;
export const tradeCreditHeld = () => SUPPLY_MONTHLY * (CREDIT_DAYS / 30);  // $30,000
export const GRANT = 20000;                                             // 3b-7
export const P2P = 25000;                                               // 3a-3
export const CROWD = 18000;                                             // 3a-5
export const PARTNER_FIRM = 50000;                                      // 3a-6 another business

/* ── formatting ────────────────────────────────────────────────────────────── */
/** One money format for the whole section (packet 16's Layer 6 caught $108000 beside $108,000). */
export const money = (n) => (Number.isInteger(n) ? `$${n.toLocaleString('en-GB')}` : `$${n.toFixed(2)}`);
/** A percentage as a student would write it, with no trailing .0 on a whole number. */
export const pc = (n) => `${Number.isInteger(n) ? n : n.toFixed(1)}%`;

/** Words of teaching text in a subsection, exactly as lib/content-validator.mjs counts them. */
export function teachingWords(sec) {
  const normText = (s) => String(s ?? '').toLowerCase().replace(/\s+/g, ' ').trim();
  const words = (s) => normText(s).split(' ').filter(Boolean).length;
  const teaching = [sec?.keyIdea, ...(sec?.body || []).flatMap((b) => [b?.text, ...(b?.items || []), ...((b?.steps || []).map((s) => (typeof s === 'object' ? `${s.title} ${s.subtitle || ''}` : s))), b?.result]), sec?.realExample?.text, sec?.misconception, sec?.examMatters];
  return words(teaching.filter(Boolean).join(' '));
}
