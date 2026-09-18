/**
 * PACKET 36 — managing-finance helpers: the id scheme, the formatters, the specification's own
 * lists, and the ONE SET OF FINANCIAL STATEMENTS that every figure in the section is read off.
 *
 * IAL Business 2.3.3, Unit 2 (WBS12), `audit/raw/bus_spec.txt:921-958`. Three sub-topics — Profit,
 * Liquidity, Business failure — and **24 substantive leaves**.
 *
 * ════ THE FIRST FINDING IS THAT THE SECTION'S NUMBER IS ALREADY RIGHT ════
 *
 * `structure-01` says the meta number "2.3.3" with the title "Managing Finance" does not match the
 * IAL structure, because "2.3 is Managing finance with 2.3.1 Profit, 2.3.2 Liquidity, 2.3.3
 * Business failure". **That is UK GCE numbering and it does not exist in this specification.**
 * `bus_spec.txt:921` is the heading "2.3.3 Managing finance"; :885 is "2.3.2 Financial planning"
 * (packet 31) and :840 is 2.3.1, planning and raising finance (packet 19). Profit, Liquidity and
 * Business failure are sub-topics 1, 2 and 3 INSIDE 2.3.3, at :925, :935 and :943.
 *
 * The finding is refused on its remedy and it is right about nothing except the smell: what it
 * noticed is that the live section's own block titles do not follow the specification's three
 * sub-topics. They do now. Six of this packet's items — `specGap-01` through `-06` — repeat the
 * same wrong numbering in their text ("2.3.1 Profit", "2.3.2 Liquidity", "2.3.3 Business failure"),
 * which is the 154-item class MEMORY records: never look a requirement up by the number a ledger
 * item gives it. Every one of them is answered against the WORDING at :925-958 instead.
 *
 * ════ THE STATEMENTS ARE THE SPECIFICATION'S OWN, LINE FOR LINE ════
 *
 * Appendix 9 (`bus_spec.txt:2397-2455`) prints the two statements and the ratio formulae the paper
 * expects, and this section is authored ON that appendix rather than on a textbook:
 *
 *     revenue − cost of sales = GROSS PROFIT
 *     − other operating expenses = OPERATING PROFIT
 *     − interest = PROFIT FOR THE YEAR (NET PROFIT)
 *
 *     non-current assets + current assets − current liabilities − non-current liabilities
 *       = NET ASSETS,  and  share capital + retained profits = TOTAL EQUITY
 *
 * **Notice what is not in the ladder: tax.** The appendix goes operating profit − interest = profit
 * for the year, and nothing else. A statement authored from memory puts a tax line in and then has
 * to explain a figure the paper will never show.
 *
 * And the second citable fact, `bus_spec.txt:816-821`, inside Unit 2's own description: students
 * "need to be able to apply the accounting ratios given in Appendix 9 … **These ratios will not be
 * supplied in the examination.**" That answers `specGap-07`, which only ASKS whether extraction
 * from a supplied statement is expected. It is: the statement is given, the formula is not.
 *
 * ════ LANTANA TILES · one firm, one year, every figure derived ════════════
 *
 *     revenue $2,000,000 · cost of sales $1,300,000 · other operating expenses $500,000 · interest $40,000
 *     gross profit $700,000 (35%) · operating profit $200,000 (10%) · profit for the year $160,000 (8%)
 *     current assets $400,000 · current liabilities $250,000 · working capital $150,000
 *     current ratio 1.6 · acid test 0.64 · cash in the bank $10,000
 *
 * Read the last line twice and the whole section is already visible. **A firm earning $160,000 of
 * profit has $10,000 in the bank and owes $250,000 within the year**, and the reason is the
 * reconciliation below: inventory and trade receivables grew, a forklift was bought outright and
 * part of the loan was repaid, so the year's profit of $160,000 came with a cash movement of
 * −$100,000. That single pair of numbers carries 2a (profit against cash), 2b (the two ratios), 2c
 * (working capital) and the whole of sub-topic 3, because every cause of failure in the
 * specification is a way of making one of those lines worse.
 *
 * ── THE FOUR WAYS TO IMPROVE LIQUIDITY HAVE FOUR DIFFERENT SIGNATURES ──
 *
 * `2b`'s last bullet names four (`:939-940`), and the live section teaches them as a list of good
 * ideas — then contradicts itself, which is `structure-09`: the body offers selling underused
 * assets and the takeaway forbids it. The list is not the teaching. What each one does to the three
 * measures is:
 *
 *     SELL AN UNDERUSED ASSET   working capital UP   current ratio UP    acid test UP    cash UP
 *     EXTEND SUPPLIER CREDIT    unchanged            DOWN                UP              cash UP
 *     FACTORING                 down by the fee      down slightly       down slightly   cash UP a lot
 *     INVENTORY JIT             unchanged            unchanged           UP              cash UP
 *
 * Four rows, four different shapes, and two of them teach the arithmetic the live quiz gets wrong.
 * Adding the same amount to current assets and current liabilities — which is what taking longer to
 * pay a supplier does — leaves working capital untouched and drags EVERY ratio towards 1:1, so a
 * current ratio above one falls and an acid test below one rises. That is `topFix-04`'s Q19, whose
 * explanation claims raising current liabilities improves working capital; it does not move it at
 * all. And factoring converts one quick asset into another, minus the fee, so it is the one move
 * that rescues the bank balance while making the acid test slightly WORSE.
 *
 * ── WHICH LINE EACH CAUSE OF FAILURE HITS ──
 *
 * Sub-topic 3 lists six internal and eight external causes and the live section teaches them as two
 * lists of words. Every one of them lands on a line of the statement above, and the section is
 * built on that: a 5% price cut forced by competition halves operating profit, a 10% currency
 * movement against an importer takes 65% of it, and a rise in interest rates is the only cause in
 * the specification that leaves operating profit untouched and hits the line below it.
 *
 * Money is in dollars. One minus sign, U+2212, emitted by `money` itself (packet 18).
 *
 * NO NAMED REAL COMPANY AND NO YEAR. `topFix-05` asks for the Carillion example to be CORRECTED —
 * it says the firm was "profitable on paper" when it collapsed and it was loss-making. The example
 * is REMOVED instead, which is packet 15's rule: keep the shape of the claim and drop the claim. A
 * dated assertion about a real firm's accounts cannot be checked by this programme, and the
 * misconception it was carrying is real and is taught from Lantana's own figures, where every
 * number is derivable.
 */
import { createHash } from 'node:crypto';

export const SECTION = 'managing-finance';

const norm = (s) => String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
export const hash8 = (s) => createHash('sha1').update(norm(s)).digest('hex').slice(0, 8);
export const id = (kind, key) => `${SECTION}:${kind}:${hash8(key)}`;
export const subId = (s) => `${SECTION}:sub:${s}`;

export const round2 = (n) => Math.round(n * 100) / 100;
export const round0 = (n) => Math.round(n);

/* ── formatting: one formatter a kind of figure (packet 18) ────────────────── */

export const MINUS = '−';
export const money = (n) => `${n < 0 ? MINUS : ''}$${Number.isInteger(Math.abs(n)) ? Math.abs(n).toLocaleString('en-GB') : Math.abs(round2(n)).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
export const qty = (n) => (Number.isInteger(n) ? n.toLocaleString('en-GB') : round2(n).toLocaleString('en-GB'));
export const pct = (n) => `${Number.isInteger(round2(n)) ? round2(n) : round2(n).toFixed(1)}%`;
/** A ratio, in the form the specification's own appendix writes it (`:2426`, `:2432`). */
export const ratio = (n) => `${round2(n).toFixed(2)}:1`;
export const days = (n) => `${Math.round(n)} days`;
/*
 * A list interpolated at the start of a sentence. `INTERNAL_CAUSES` and the rest are held in the
 * specification's own lower-case words, which is right for the middle of a sentence and wrong at the
 * start of one: Verify B read a 10-mark Assess that opened "...failing to pay a supplier. weak cash
 * flow, overestimation of sales..." and took it for an unfinished template join. Capitalising at the
 * point of use keeps one copy of the specification's wording.
 */
export const sentence = (text) => String(text).charAt(0).toUpperCase() + String(text).slice(1);

/* ══ LANTANA TILES · the statements (2.3.3 · 1a-1c, 2a-2c, 3a-3b) ═════════ */

/*
 * NOTHING BELOW IS TYPED IN EXCEPT THE TWELVE FIGURES ON THE TWO STATEMENTS AND THE SIX ON THE CASH
 * RECONCILIATION. Every profit, every margin, every ratio and every one of the fourteen causes of
 * failure is computed from them by the functions here, and the runner asserts the properties the
 * teaching rests on — that the gross margin is 35%, that a 5% price cut halves operating profit,
 * that extending supplier credit leaves working capital untouched, that the acid test is below one
 * while the current ratio is above it. A change to a figure that breaks one of those fails the
 * build rather than quietly teaching a section whose arithmetic no longer says what the prose says.
 */
export const FIRM = (() => {
  const name = 'Lantana Tiles';
  const what = 'a wholesaler that imports floor tiles and sells them to builders on thirty days\' credit';
  const tradingDays = 250;

  /* ── statement of comprehensive income, in Appendix 9's order (:2400-2418) ── */
  const revenue = 2000000;
  const costOfSales = 1300000;
  const operatingExpenses = 500000;   // "other operating expenses" is the appendix's own label
  const interest = 40000;

  const grossProfit = revenue - costOfSales;
  const operatingProfit = grossProfit - operatingExpenses;
  const profitForYear = operatingProfit - interest;

  const marginOn = (profit, rev = revenue) => (profit / rev) * 100;
  const gpm = marginOn(grossProfit);
  const opm = marginOn(operatingProfit);
  const npm = marginOn(profitForYear);

  /* ── statement of financial position, in Appendix 9's order (:2420-2445) ──── */
  const inventory = 240000;
  const receivables = 150000;          // "trade receivables" (Appendix 8, :2357)
  const cash = 10000;
  const payables = 180000;             // "trade payables" (Appendix 8, :2373)
  const overdraft = 50000;
  const otherPayables = 20000;
  const nonCurrentAssets = 900000;
  const loan = 500000;                 // non-current liabilities
  const shareCapital = 300000;

  const currentAssets = inventory + receivables + cash;
  const currentLiabilities = payables + overdraft + otherPayables;
  const netAssets = nonCurrentAssets + currentAssets - currentLiabilities - loan;
  const retainedProfits = netAssets - shareCapital;

  const workingCapital = currentAssets - currentLiabilities;
  const currentRatio = currentAssets / currentLiabilities;
  const acidTest = (currentAssets - inventory) / currentLiabilities;
  const interestRate = (interest / loan) * 100;

  /*
   * THE LIQUIDITY POSITION AS A FUNCTION, so that every "way to improve liquidity" is the SAME
   * arithmetic with different arguments. A move that is described rather than computed is a move
   * whose effect on the other two measures nobody checked.
   */
  const position = ({ inv = inventory, rec = receivables, csh = cash, cl = currentLiabilities } = {}) => {
    const ca = inv + rec + csh;
    return {
      inventory: inv, receivables: rec, cash: csh, currentAssets: ca, currentLiabilities: cl,
      workingCapital: ca - cl, currentRatio: ca / cl, acidTest: (ca - inv) / cl,
    };
  };
  const base = position();

  /*
   * days, the way the specification's own ratios are built: a balance over a flow, times 365 —
   * ROUNDED HERE, ONCE, rather than at each `days()` call. The cycle is printed as its two stages
   * and as their total, and a fill-in hint tells the student the total is "the two stages of the
   * cycle added together": with the terms rounded separately at print time the page showed 67, 27
   * and 95, so a student who did exactly what the hint said typed 94 and was marked wrong. Every
   * printed total must be the sum of its own printed parts. Nothing computes money from these.
   */
  const inventoryDays = Math.round((inventory / costOfSales) * 365);
  const receivableDays = Math.round((receivables / revenue) * 365);
  const payableDays = Math.round((payables / costOfSales) * 365);

  /* ── 2b · the four ways to improve liquidity the specification names (:939-940) ── */
  const assetSale = 120000;                                  // an underused delivery yard
  const sellAsset = position({ csh: cash + assetSale });

  const creditExtraDays = 30;
  const creditExtra = round0((costOfSales * creditExtraDays) / 365);
  const supplierCredit = position({ csh: cash + creditExtra, cl: currentLiabilities + creditExtra });

  const factorFeeRate = 3;
  const factorFee = round0((receivables * factorFeeRate) / 100);
  const factoring = position({ rec: 0, csh: cash + receivables - factorFee });

  const jitDays = 30;
  const jitInventory = round0((costOfSales * jitDays) / 365);
  const jitReleased = inventory - jitInventory;
  const jit = position({ inv: jitInventory, csh: cash + jitReleased });

  /* ── 2a · why the profit and the bank balance are different numbers ────────── */
  /*
   * EVERY LINE IS SPEC VOCABULARY AND DEPRECIATION IS NOT AMONG THEM. `specGap-03` asks for
   * "credit sales, depreciation, capital purchases, loan repayments". Three of the four are here.
   * `depreciation` occurs ONCE in `bus_spec.txt`, at :1016, where it means a fall in the exchange
   * rate — and exchange rates are a leaf of THIS section (3b, :954). Teaching an accounting
   * depreciation the specification never names, under a word it uses for something else two
   * chapters later, is the defect rule 2 exists to stop.
   */
  const openingCash = 110000;
  const inventoryRise = 90000;
  const receivableRise = 60000;
  const payableRise = 70000;
  const assetBought = 100000;        // a forklift and racking, paid for outright
  const loanRepaid = 80000;
  const cashMovement = profitForYear - inventoryRise - receivableRise + payableRise - assetBought - loanRepaid;

  /* ── 3a · internal causes, each priced off the statement ───────────────────── */
  const overtradeGrowth = 50;        // per cent
  const overtradeInventory = round0((inventory * overtradeGrowth) / 100);
  const overtradeReceivables = round0((receivables * overtradeGrowth) / 100);
  const overtradePayables = round0((payables * overtradeGrowth) / 100);
  const overtradeNeed = overtradeInventory + overtradeReceivables - overtradePayables;

  const overestimate = 25;           // per cent too much bought in
  const overstock = round0((costOfSales * overestimate) / 100);
  const writeOffShare = 25;          // per cent of the overstock that never sells
  const writeOff = round0((overstock * writeOffShare) / 100);

  const returnRate = 3;              // per cent of tiles arriving broken and replaced free
  const qualityExtraCost = round0((costOfSales * returnRate) / 100);
  const qualityProfit = revenue - (costOfSales + qualityExtraCost) - operatingExpenses;

  const marketingFall = 15;          // per cent of volume lost when customers stop hearing from the firm
  const marketingProfit = (revenue * (1 - marketingFall / 100)) - (costOfSales * (1 - marketingFall / 100)) - operatingExpenses;

  /* ── 3b · external causes, each priced off the same statement ──────────────── */
  const priceCut = 5;                // per cent, forced by a competitor, volume unchanged
  const competitionRevenue = revenue * (1 - priceCut / 100);
  const competitionProfit = competitionRevenue - costOfSales - operatingExpenses;

  const currencyFall = 10;           // per cent depreciation against the currency tiles are bought in
  const currencyCostOfSales = round0(costOfSales * (1 + currencyFall / 100));
  const currencyProfit = revenue - currencyCostOfSales - operatingExpenses;

  const rateRise = 4;                // percentage points on the loan
  const rateInterest = round0((loan * (interestRate + rateRise)) / 100);
  const rateProfitForYear = operatingProfit - rateInterest;

  const demandFall = 10;             // per cent of volume lost when builders stop building
  const demandProfit = (revenue * (1 - demandFall / 100)) - (costOfSales * (1 - demandFall / 100)) - operatingExpenses;

  const supplierDaysLost = 20;
  const dailyRevenue = revenue / tradingDays;
  const supplierRevenueLost = round0(dailyRevenue * supplierDaysLost);
  const supplierProfit = (revenue - supplierRevenueLost) - (costOfSales * ((revenue - supplierRevenueLost) / revenue)) - operatingExpenses;

  const regulationScrapShare = 25;   // per cent of inventory that fails a new building standard
  const regulationScrap = round0((inventory * regulationScrapShare) / 100);

  return {
    name, what, tradingDays, dailyRevenue,
    /* income statement */
    revenue, costOfSales, operatingExpenses, interest,
    grossProfit, operatingProfit, profitForYear, marginOn, gpm, opm, npm,
    /* financial position */
    inventory, receivables, cash, payables, overdraft, otherPayables,
    nonCurrentAssets, loan, shareCapital, retainedProfits,
    currentAssets, currentLiabilities, netAssets,
    workingCapital, currentRatio, acidTest, interestRate,
    inventoryDays, receivableDays, payableDays,
    position, base,
    /* improving liquidity */
    assetSale, sellAsset,
    creditExtraDays, creditExtra, supplierCredit,
    factorFeeRate, factorFee, factoring,
    jitDays, jitInventory, jitReleased, jit,
    /* profit against cash */
    openingCash, inventoryRise, receivableRise, payableRise, assetBought, loanRepaid, cashMovement,
    /* internal causes */
    overtradeGrowth, overtradeInventory, overtradeReceivables, overtradePayables, overtradeNeed,
    overestimate, overstock, writeOffShare, writeOff,
    returnRate, qualityExtraCost, qualityProfit,
    marketingFall, marketingProfit,
    /* external causes */
    priceCut, competitionRevenue, competitionProfit,
    currencyFall, currencyCostOfSales, currencyProfit,
    rateRise, rateInterest, rateProfitForYear,
    demandFall, demandProfit,
    supplierDaysLost, supplierRevenueLost, supplierProfit,
    regulationScrapShare, regulationScrap,
  };
})();

/* ══ The specification's own lists ════════════════════════════════════════ */

/** 1 · a — the three profits, in the order Appendix 9 puts them (:2400-2418, :925-928). */
export const PROFITS = [
  ['Gross profit', 'revenue − cost of sales', 'What is left after paying for the goods themselves, and nothing else.'],
  ['Operating profit', 'gross profit − other operating expenses', 'What the trading operation earns before the cost of borrowing is taken off.'],
  ['Profit for the year', 'operating profit − interest', 'What is left for the owners, after the lenders have been paid. The paper also calls it net profit.'],
];

/** 2 · b, last bullet (:939-940): the four ways the specification names, in its own order. */
export const LIQUIDITY_MOVES = ['assets', 'supplier credit terms', 'factoring', 'inventory JIT'];

/** 3 · a (:944-949): the six internal causes, in the specification's own order and words. */
export const INTERNAL_CAUSES = [
  'poor management of cash flow', 'overestimation of sales', 'overtrading',
  'poor inventory control', 'poor marketing', 'poor quality',
];

/** 3 · b (:951-958): the eight external causes, in the specification's own order and words. */
export const EXTERNAL_CAUSES = [
  'market conditions', 'competition', 'economic', 'exchange rates',
  'interest rates', 'government regulations', 'supplier problems', 'natural phenomena',
];

/*
 * BANNED, BECAUSE ANOTHER SECTION OR ANOTHER UNIT OWNS IT, OR BECAUSE THE PAPER DOES NOT USE THE
 * WORD. Each entry cites the line that settles it. Four of them are this packet's rule-1 refusals
 * turned into a build failure; the fifth is Appendix 8, which is a statement about the assessment
 * and therefore about the vocabulary a student must be able to read.
 */
export const BANNED_ELSEWHERE = [
  [/\bgearing\b|\breturn on capital employed\b|\bROCE\b|\bratio analysis\b/i, 'gearing, ROCE and ratio analysis — 3.3.2 · 2 (bus_spec.txt:1229-1236), Unit 3; practice-01 and practice-02 are that the live section assesses them here'],
  [/\basset turnover\b|\bdividend yield\b/i, 'asset turnover and dividend yield — 0 hits in bus_spec.txt; they are on no IAL Business paper (practice-01)'],
  [/\bbreak[- ]even\b|\bmargin of safety\b|\bcontribution\b|\bvariance analysis\b|\bcash[- ]flow forecast\w*\b|\bzero[- ]based\b/i, 'break-even, contribution, variance and cash-flow forecasting — 2.3.2 (bus_spec.txt:885-914), built by packet 31'],
  [/\bdebtors?\b|\bcreditors?\b|\bstocks?\b|\bturnover\b|\bprofit and loss account\b(?! *\))/i, 'UK GAAP vocabulary — Appendix 8 (bus_spec.txt:2299-2304) says the assessments use International Accounting Standards terminology: inventory, trade receivables, trade payables, statement of comprehensive income'],
  [/\bdepreciation\b|\bamortisation\b/i, 'accounting depreciation — `depreciation` occurs once in bus_spec.txt, at :1016, where it means a FALL IN THE EXCHANGE RATE, which is a leaf of this very section (:954). specGap-03 asks for it; refused'],
];

/*
 * TEACHING TERMS. `teachingWords` is the word budget, counted the way `lib/content-validator.mjs`
 * counts it; `TEACHING_TERMS` is the vocabulary the forward-reference check works over, so that a
 * recall cannot name a term the student has not reached yet.
 */
export const TEACHING_TERMS = [
  'gross profit', 'operating profit', 'profit for the year', 'statement of comprehensive income',
  'gross profit margin', 'operating profit margin', 'profit for the year margin',
  'cost of sales', 'other operating expenses', 'interest',
  'statement of financial position', 'current assets', 'current liabilities',
  'non-current assets', 'non-current liabilities', 'inventory', 'trade receivables',
  'trade payables', 'working capital', 'current ratio', 'acid test',
  'factoring', 'supplier credit', 'overtrading', 'overestimation of sales',
  'poor inventory control', 'exchange rates', 'interest rates', 'supplier problems',
  'natural phenomena', 'market conditions', 'government regulations',
];

/**
 * The word budget, counted the way `lib/content-validator.mjs` counts it, so the runner and the
 * validator cannot disagree about whether a subsection is over 350.
 */
export function teachingWords(sec) {
  const normText = (s) => String(s ?? '').toLowerCase().replace(/\s+/g, ' ').trim();
  const words = (s) => normText(s).split(' ').filter(Boolean).length;
  const teaching = [sec?.keyIdea, ...(sec?.body || []).flatMap((b) => [b?.text, ...(b?.items || []), ...((b?.steps || []).map((x) => (typeof x === 'object' ? `${x.title} ${x.subtitle || ''}` : x))), b?.result]), sec?.realExample?.text, sec?.misconception, sec?.examMatters];
  return words(teaching.filter(Boolean).join(' '));
}

/** The terms a subsection actually teaches with — used by the answer-recoverable check. */
export function teachingVocabulary(sec) {
  const hay = [sec.title, sec.keyIdea, ...(sec.body || []).flatMap((b) => [b.text, ...(b.items || []), ...(b.steps || [])])].join(' ').toLowerCase();
  return TEACHING_TERMS.filter((t) => hay.includes(t));
}
