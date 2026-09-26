/**
 * PACKET 41 — external-influences helpers: the id scheme, the formatters, the specification's own
 * lists, and the ONE FIRM whose single year of trading every figure in the section is read off.
 *
 * IAL Business 2.3.5, Unit 2 (WBS12), `audit/raw/bus_spec.txt:1009-1029`. Three sub-topics —
 * Economic influences, Legislation, The competitive environment — and **15 countable leaves**
 * under 3 parent requirements (`audit/raw/spec-items.json`, ids `BUS-2.3.5-1a-1` … `BUS-2.3.5-3b`;
 * 18 rows, of which `1a`, `2a` and `3a` are the requirements and the other 15 are the leaves the
 * validator's `spec.uncovered` walks). Counted this session, not taken from a summary.
 *
 * ════ THE NUMBER IS RIGHT, AND THAT IS WORTH SAYING ════
 *
 * `specGap-08` records the audit's own uncertainty: *"exact IAL sub-numbering (2.3.5 vs GCE 2.5) —
 * unsure"*. `bus_spec.txt:1009` is the heading "2.3.5 External influences" and the runner asserts
 * it BY LINE NUMBER, together with `:965` (2.3.4 Resource management) above it and `:1045`, where
 * Unit 3 begins, below it — so a renumber fails the build instead of being inherited. This is one of the sections whose ledger-cited number is NOT among
 * the 154 wrong UK-GCE citations MEMORY records; the check is here so the next reader does not have
 * to take that on trust.
 *
 * ════ THE SPECIFICATION NAMES NO STATUTE, NO CENTRAL BANK AND NO REGULATOR ════
 *
 * Counted against the document, this session: "Consumer Rights Act" 0, "National Insurance" 0,
 * "Bank of England" 0, "Competition and Markets" 0. What :1020-1026 asks for is the EFFECT ON
 * BUSINESSES of consumer protection, employee protection, environmental protection, competition
 * policy, health and safety and intellectual property rights. A student in Karachi, Lagos or Kuala
 * Lumpur is examined on what a rule does to a firm's costs, prices, processes and choices — never
 * on the name of a British Act. `accuracy-01`, `accuracy-02` and `topFix-02` are therefore right,
 * and they are answered by making the defect UNREPRESENTABLE: the runner bans every statute name,
 * every UK institution and every UK acronym over every surface including the SVG text, and A/Bs
 * each ban against a string it must catch and one it must not.
 *
 * ════ FOUR THINGS THE AUDIT ASKED FOR THAT THE SPECIFICATION DOES NOT SUPPORT ════
 *
 * Rule 1: an audit item is a claim. Four clauses are refused here, each against the document:
 *
 *  1. **`topFix-04`'s "a SPICED fillin".** SPICED is a UK-GCE mnemonic — Strong Pound, Imports
 *     Cheaper, Exports Dearer — and "SPICED" is 0 hits in `bus_spec.txt`. Its first letter is
 *     sterling, which `locale.uk` counts as a UK frame, so the item asks this packet to author the
 *     exact thing `topFix-02` and `accuracy-01` ask it to remove. The UNDERLYING content — an
 *     appreciation makes imports cheaper and exports dearer — is leaf `BUS-2.3.5-1a-2` and is
 *     taught and drilled, in a fill-in, without the mnemonic and without a named currency.
 *  2. **`accuracy-03`'s "Porter's Five Forces is not in the … specification (Unit 2 or elsewhere)".**
 *     The "or elsewhere" is false: `bus_spec.txt:1110` is "3.3.1 … c) Porter's five forces" and
 *     `:1390` is "4.3.2 … b) Application of Porter's five forces in assessing potential markets".
 *     It is examinable IAL Business content and it is not THIS leaf's. Packet 38's precedent
 *     (DECISIONS, 2026-09-21) is followed exactly: the phrase is banned with ONE exemption, a
 *     declared pointer sentence naming 3.3.1 and 4.3.2, and a `NEEDS_ONE` rule makes the pointer
 *     compulsory — because a ban with no positive obligation is satisfied by silence.
 *  3. **`specGap-06`'s "market size (value/volume, growth, saturation)".** :1027 asks for the
 *     effects of competition in terms of competitor **numbers, size and behaviour** — the size of
 *     the COMPETITORS, not of the market. "Saturated markets" is a real spec phrase and it is at
 *     `:1373`, inside 4.3.2, a different unit. Competitor size is taught in full; market size is
 *     not authored, and the reason is recorded rather than the gap being quietly closed.
 *  4. **`topFix-05`'s "10/12-mark Assess".** Appendix 6 (`:2238-2245`) carries 12 for Units 3 and 4
 *     only: "Assess 10 [Units 1/2], 12 [Units 3/4]". This is WBS12. Every Assess here is 10.
 *
 * And one clause is ACCEPTED WITH ITS SCOPE CORRECTED. `specGap-02` asks for "the effect of
 * economic uncertainty on the business environment". That is not a named 2.3.5 bullet — "risk and
 * uncertainty" is :518 and :769, both Unit 3. But :1009-1015's own stem is "The effect on
 * businesses of, **and how they can best respond to**, changes in", and a firm's response to a
 * cycle it cannot forecast is the response half of leaf `BUS-2.3.5-1a-5`. It is taught there, under
 * that leaf, and never as a leaf of its own.
 *
 * ════ MARANG SEATING · one firm, one year, every figure derived ══════════
 *
 *     20,000 chairs at $200 · revenue $4,000,000 · cost of sales $2,400,000 ($120 a chair,
 *     of which $1,600,000 is imported timber and fabric) · other operating expenses $1,200,000
 *     gross profit $1,600,000 (40%) · operating profit $400,000 (10%) · interest $90,000
 *     profit for the year $310,000 · exports $1,000,000 · public-sector orders $600,000
 *
 * Read the last three lines and the whole section is visible. **Every external influence in 2.3.5
 * lands on one of those lines, and the firm's $400,000 of operating profit is small enough that
 * naming the line is the same thing as pricing the shock.** A 20% fall in the currency costs
 * $400,000 of import cost and takes all of it; an 8% rise in input prices takes $192,000; a
 * three-point rise in the borrowing rate takes $45,000 and the demand it removes takes $160,000
 * more. That ordering — the channel nobody teaches being three times the channel everybody does —
 * is the section's central argument and it is arithmetic, not an opinion.
 *
 * ── THE TWO ASYMMETRIES THAT ARE PROPERTIES, NOT COINCIDENCES ──
 *
 * A fall of x in a currency is a rise of x/(1−x) in the home-currency cost of anything invoiced
 * abroad, and a rise of x is a fall of x/(1+x). 20% down is 25% dearer; 25% up is 20% cheaper. Both
 * are recomputed from the two rates every time they are printed and never typed in.
 *
 * And a cost rise is amplified by the margin it lands on. $192,000 on $2,400,000 of cost of sales
 * is 8%; on $400,000 of operating profit it is 48%. The runner asserts the amplification factor is
 * the reciprocal of the operating margin, so a change to any figure in the spine that breaks the
 * relationship fails the build.
 *
 * Money is in dollars, and in dollars only. The exchange rate is quoted as "$1 = 4.00 units" —
 * the supplier's currency is never given a symbol, because `locale.currency` allows one per section
 * and a section that priced imports in a second symbol would be teaching two currencies. One minus
 * sign, U+2212, emitted by `money` itself (packet 18).
 *
 * NO NAMED REAL COMPANY, NO REAL COUNTRY'S TAX RATE, NO YEAR. Packet 15's rule and packet 40's
 * founder ruling: a named country plus a year is a dated assertion this programme cannot re-check.
 * International context is carried by where the firm SELLS and where its students SIT, never by a
 * claim about a named economy in a named year.
 */
import { createHash } from 'node:crypto';

export const SECTION = 'external-influences';

const norm = (s) => String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
export const hash8 = (s) => createHash('sha1').update(norm(s)).digest('hex').slice(0, 8);
export const id = (kind, key) => `${SECTION}:${kind}:${hash8(key)}`;
export const subId = (s) => `${SECTION}:sub:${s}`;

export const round0 = (n) => Math.round(n);
export const round1 = (n) => Math.round(n * 10) / 10;
export const round2 = (n) => Math.round(n * 100) / 100;

/* ── formatting: one formatter a kind of figure (packet 18) ────────────────── */

export const MINUS = '−';
export const money = (n) => `${n < 0 ? MINUS : ''}$${Number.isInteger(Math.abs(n))
  ? Math.abs(n).toLocaleString('en-GB')
  : Math.abs(round2(n)).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
export const qty = (n) => (Number.isInteger(n) ? n.toLocaleString('en-GB') : round2(n).toLocaleString('en-GB'));
export const pct = (n) => `${Number.isInteger(round1(n)) ? round1(n) : round1(n).toFixed(1)}%`;
export const pts = (n) => `${qty(n)} percentage point${n === 1 ? '' : 's'}`;
/** The exchange rate, in the one form this section ever quotes it. No second currency symbol. */
export const fx = (n) => `$1 = ${round2(n).toFixed(2)} units`;
/** A quantity of the supplier's currency, named rather than symbolised, for the same reason. */
export const units = (n) => `${qty(n)} units`;
export const yrs = (n) => `${qty(n)} years`;

/**
 * A list read out in a sentence: "a, b and c". The specification's own lists are held in its own
 * lower-case wording, which is right mid-sentence and wrong at the start of one, so `Sentence`
 * capitalises rather than the list being stored twice.
 */
export const sentence = (s) => String(s).charAt(0).toUpperCase() + String(s).slice(1);
export const andList = (xs) => (xs.length < 2 ? String(xs[0] ?? '') : `${xs.slice(0, -1).join(', ')} and ${xs[xs.length - 1]}`);

/* ══ The specification's own lists, in its own words ═══════════════════════ */
/*
 * EACH ONE CARRIES THE LINE IT IS READ OFF. `bus_spec.txt:1009-1029`. Nothing below is a summary;
 * the runner re-parses the span and asserts these arrays against it, so a paraphrase that drifted
 * from the document would fail the build rather than be inherited by the next reader.
 */

/** 2.3.5 · 1a, `:1013-1017`. The five economic influences, in the specification's order. */
export const ECONOMIC_INFLUENCES = [
  'the rate of inflation',
  'exchange rates (appreciation, depreciation)',
  'interest rates',
  'taxation and government spending',
  'the business cycle',
];

/** 2.3.5 · 2a, `:1021-1026`. The six areas of legislation, in the specification's order. */
export const LEGISLATION_AREAS = [
  'consumer protection',
  'employee protection',
  'environmental protection',
  'competition policy',
  'health and safety',
  'intellectual property rights',
];

/** 2.3.5 · 3a, `:1028-1030`. The three dimensions of competition. */
export const COMPETITION_DIMENSIONS = ['numbers', 'size', 'behaviour'];

/** The three intellectual property rights the specification brackets at `:1025-1026`. */
export const IP_RIGHTS = [
  ['Patent', 'a new invention or process', 'applied for, examined and granted', 'up to 20 years from filing'],
  ['Copyright', 'a created work: drawings, photographs, catalogues, text, software', 'automatic the moment the work is made; no registration', 'decades after the work is made'],
  ['Trademark', 'a brand identifier: a name, a logo, a slogan', 'registered, in each market where it is used', 'renewable without limit while it is used'],
];

/** Appendix 6, `bus_spec.txt:2218-2245`. Command word to marks, for Units 1 and 2. */
export const TARIFFS = [
  ['Define', 2], ['Calculate', 4], ['Construct', 4], ['Explain', 4],
  ['Analyse', 6], ['Discuss', 8], ['Assess', 10], ['Evaluate', 20],
];

/* ══ MARANG SEATING ═══════════════════════════════════════════════════════ */
/*
 * THE SPINE. Every figure below is derived from the six inputs at the top; nothing is typed twice
 * and nothing is rounded into the object. The runner re-derives each one independently and fails
 * the build on a disagreement, which is packet 29's lesson: a picture drawn beside a typed figure
 * is a picture that can be wrong.
 */
const build = () => {
  const units0 = 20000;              // chairs sold in the year
  const price = 200;                 // list price, before any sales tax
  const unitCost = 120;              // cost of sales a chair
  const operatingExpenses = 1200000; // everything else it costs to run the firm
  const loan = 1500000;
  const interestRate = 6;

  const revenue = units0 * price;
  const costOfSales = units0 * unitCost;
  const grossProfit = revenue - costOfSales;
  const operatingProfit = grossProfit - operatingExpenses;
  const interest = (loan * interestRate) / 100;
  const profitForYear = operatingProfit - interest;
  const opMargin = (operatingProfit / revenue) * 100;
  const contribution = price - unitCost;

  /* what the operating expenses are made of — the lines legislation and taxation land on */
  const wages = 700000;
  const payrollRate = 12;
  const payrollCharge = (wages * payrollRate) / 100;
  const compliance = 150000;
  const otherExpenses = operatingExpenses - wages - payrollCharge - compliance;

  /* where the revenue and the input cost come from */
  const importedMaterials = 1600000;
  const exportRevenue = 1000000;
  const publicRevenue = 600000;

  /* the profit this year's trading would produce at any revenue, holding the margin structure */
  const profitAt = (rev) => round2(rev - rev * (unitCost / price) - operatingExpenses);
  /* and at any price, holding the volume — the case where no cost moves with the price */
  const profitAtPrice = (p, q = units0) => round2(q * p - q * unitCost - operatingExpenses);

  /* ── 1a-1 · inflation ─────────────────────────────────────────────────── */
  const inflation = 8;
  const inflatedCostOfSales = costOfSales * (1 + inflation / 100);
  const inflationCostRise = inflatedCostOfSales - costOfSales;
  const inflationProfit = revenue - inflatedCostOfSales - operatingExpenses;
  const priceRiseToHold = (inflationCostRise / revenue) * 100;
  const wageClaim = (wages * inflation) / 100;
  const inflationProfitWithWages = inflationProfit - wageClaim;
  /* the amplification: a cost rise is multiplied by the reciprocal of the operating margin */
  const inflationProfitFall = ((operatingProfit - inflationProfit) / operatingProfit) * 100;

  /* ── 1a-2 · exchange rates ────────────────────────────────────────────── */
  const e0 = 4.0;            // $1 = 4.00 units of the supplier's currency
  const e1 = 3.2;            // after a 20% depreciation of the home currency
  const e2 = 5.0;            // after a 25% appreciation
  const importInvoice = importedMaterials * e0;   // 6,400,000 units, fixed in the contract
  const exportInvoice = exportRevenue * e0;       // 4,000,000 units, the price the buyer abroad pays
  const depreciationPct = ((e0 - e1) / e0) * 100;
  const appreciationPct = ((e2 - e0) / e0) * 100;
  const importAtE1 = importInvoice / e1;
  const importAtE2 = importInvoice / e2;
  const exportAtE1 = exportInvoice / e1;
  const exportAtE2 = exportInvoice / e2;
  const importRisePct = ((importAtE1 - importedMaterials) / importedMaterials) * 100;
  const importFallPct = ((importedMaterials - importAtE2) / importedMaterials) * 100;
  const depProfit = operatingProfit + (exportAtE1 - exportRevenue) - (importAtE1 - importedMaterials);
  const appProfit = operatingProfit + (exportAtE2 - exportRevenue) - (importAtE2 - importedMaterials);

  /* ── 1a-3 · interest rates ────────────────────────────────────────────── */
  const rateRise = 3;
  const interestAfter = (loan * (interestRate + rateRise)) / 100;
  const interestExtra = interestAfter - interest;
  const pfyAfterRate = operatingProfit - interestAfter;
  const rateDemandFall = 10;
  const rateRevenue = revenue * (1 - rateDemandFall / 100);
  const rateDemandProfit = profitAt(rateRevenue);
  const rateBothProfit = rateDemandProfit - interestAfter;
  const demandChannel = operatingProfit - rateDemandProfit;

  /* ── 1a-4 · taxation and government spending ──────────────────────────── */
  const profitTax0 = 20;
  const profitTax1 = 25;
  const keptAfterTax0 = profitForYear * (1 - profitTax0 / 100);
  const keptAfterTax1 = profitForYear * (1 - profitTax1 / 100);
  const payrollRate1 = 15;
  const payrollAfter = (wages * payrollRate1) / 100;
  const payrollExtra = payrollAfter - payrollCharge;
  const payrollProfit = operatingProfit - payrollExtra;
  const salesTax0 = 6;
  const salesTax1 = 10;
  const buyerPrice0 = round2(price * (1 + salesTax0 / 100));
  const buyerPrice1 = round2(price * (1 + salesTax1 / 100));
  const buyerPriceRise = ((buyerPrice1 - buyerPrice0) / buyerPrice0) * 100;
  const publicCut = 30;
  const publicLost = (publicRevenue * publicCut) / 100;
  const publicCutProfit = profitAt(revenue - publicLost);
  const publicRiseProfit = profitAt(revenue + publicLost);
  const trainingGrant = 40000;

  /* ── 1a-5 · the business cycle ────────────────────────────────────────── */
  const economySwing = 2;    // the whole economy's output moves this far
  const orderSwing = 18;     // this firm's orders move this far — nine times as much
  const boomProfit = profitAt(revenue * (1 + orderSwing / 100));
  const recessionProfit = profitAt(revenue * (1 - orderSwing / 100));
  const slumpFall = 30;
  const slumpProfit = profitAt(revenue * (1 - slumpFall / 100));
  const amplification = orderSwing / economySwing;
  const breakEvenRevenue = operatingExpenses / (contribution / price);

  /* ── 2a · legislation ─────────────────────────────────────────────────── */
  const consumerAnnual = 45000;
  const employeeAnnual = 50000;
  const hsAnnual = 30000;
  const envAnnual = 25000;
  const hsCapital = 80000;
  const envCapital = 120000;
  const compliancePctRevenue = (compliance / revenue) * 100;
  const compliancePctProfit = (compliance / operatingProfit) * 100;
  const tradingDays = 250;
  const dailyRevenue = revenue / tradingDays;
  const accidentDays = 12;
  const accidentCost = dailyRevenue * accidentDays;
  const accidentMultiple = accidentCost / hsAnnual;
  const patentYears = 20;
  const licenceFee = 25000;

  /* ── 3a, 3b · the competitive environment ─────────────────────────────── */
  const smallRivals = 40;
  const largeRivals = 2;
  const newEntrants = 6;
  const marketUnits = 250000;
  const share = (units0 / marketUnits) * 100;
  const rivalUnitCost = 105;             // the large importer buys in container loads
  const scaleGap = ((unitCost - rivalUnitCost) / unitCost) * 100;
  const warPrice = 170;
  const warContribution = warPrice - unitCost;
  const matchProfit = profitAtPrice(warPrice);
  const holdVolumeFall = 20;
  const holdUnits = units0 * (1 - holdVolumeFall / 100);
  const holdProfit = profitAtPrice(price, holdUnits);
  const breakEvenUnits = operatingExpenses / contribution;
  const breakEvenUnitsWar = operatingExpenses / warContribution;
  const warVolumeNeeded = ((breakEvenUnitsWar - units0) / units0) * 100;
  const nicheUnits = 2000;
  const nichePrice = 260;
  const nicheUnitCost = 135;
  const nicheContribution = (nichePrice - nicheUnitCost) * nicheUnits;
  const standardContribution = contribution * nicheUnits;
  const nicheGain = nicheContribution - standardContribution;

  return {
    name: 'Marang Seating',
    what: 'makes office and café chairs, buys its timber and fabric abroad, and sells at home and for export',
    unit: 'chair',
    units0, price, unitCost, contribution, revenue, costOfSales, grossProfit, operatingExpenses,
    operatingProfit, loan, interestRate, interest, profitForYear, opMargin,
    wages, payrollRate, payrollCharge, compliance, otherExpenses,
    importedMaterials, exportRevenue, publicRevenue,
    profitAt, profitAtPrice,
    inflation, inflatedCostOfSales, inflationCostRise, inflationProfit, priceRiseToHold,
    wageClaim, inflationProfitWithWages, inflationProfitFall,
    e0, e1, e2, importInvoice, exportInvoice, depreciationPct, appreciationPct,
    importAtE1, importAtE2, exportAtE1, exportAtE2, importRisePct, importFallPct, depProfit, appProfit,
    rateRise, interestAfter, interestExtra, pfyAfterRate, rateDemandFall, rateRevenue,
    rateDemandProfit, rateBothProfit, demandChannel,
    profitTax0, profitTax1, keptAfterTax0, keptAfterTax1,
    payrollRate1, payrollAfter, payrollExtra, payrollProfit,
    salesTax0, salesTax1, buyerPrice0, buyerPrice1, buyerPriceRise,
    publicCut, publicLost, publicCutProfit, publicRiseProfit, trainingGrant,
    economySwing, orderSwing, boomProfit, recessionProfit, slumpFall, slumpProfit,
    amplification, breakEvenRevenue,
    consumerAnnual, employeeAnnual, hsAnnual, envAnnual, hsCapital, envCapital,
    compliancePctRevenue, compliancePctProfit, tradingDays, dailyRevenue,
    accidentDays, accidentCost, accidentMultiple, patentYears, licenceFee,
    smallRivals, largeRivals, newEntrants, marketUnits, share, rivalUnitCost, scaleGap,
    warPrice, warContribution, matchProfit, holdVolumeFall, holdUnits, holdProfit,
    breakEvenUnits, breakEvenUnitsWar, warVolumeNeeded,
    nicheUnits, nichePrice, nicheUnitCost, nicheContribution, standardContribution, nicheGain,
  };
};

export const FIRM = build();

/* ══ What may not be written, and the one thing that must be ══════════════ */
/*
 * NO `g` FLAG on any source pattern below. `RegExp.prototype.test` on a `/g` regex advances
 * `lastIndex`, so a second call against the same string starts past the match and returns false —
 * a stateful regex inside a filter is a bug that looks like a finding, and packet 29 lost a round
 * to exactly that. The runner rebuilds each one without the flag before using it.
 *
 * Each entry carries the line or the count that settles it. Each is A/B'd in the runner against a
 * string it must catch AND a legitimate string it must not.
 */
export const BANNED_ELSEWHERE = [
  [/\bConsumer Rights Act\b|\bTrade Descriptions\b|\bSale of Goods Act\b|\bConsumer Contracts Regulations\b|\bEmployment Rights Act\b|\bEquality Act\b|\bHealth and Safety at Work Act\b|\bData Protection Act\b/i,
    'a named UK statute — 0 hits for any of these in bus_spec.txt; 2.3.5 · 2a asks for the EFFECT of a kind of protection, never the name of an Act'],
  [/\bNational Insurance\b|\bNICs?\b(?![a-z])/,
    'National Insurance, a UK payroll charge — 0 hits in bus_spec.txt; the generic term is an employer payroll charge'],
  [/\bBank of England\b|\bMonetary Policy Committee\b|\bthe Chancellor\b|\bHMRC\b|\bOfgem\b|\bOfcom\b|\bNHS\b/i,
    'a UK institution as the frame of an example (locale.institution, F082/F116)'],
  [/\bCompetition and Markets Authority\b|\bCMA\b(?![a-z])/,
    'the CMA — 0 hits in bus_spec.txt; :1024 asks for the effects of "competition policy", which every market has and no student needs a British regulator to understand'],
  [/\bcost[- ]push\b|\bdemand[- ]pull\b/i,
    'cost-push / demand-pull — 0 hits in bus_spec.txt, and econ_spec.txt:917-918 in Economics; 2.3.5 · 1a asks what inflation DOES to a business, not what caused it'],
  [/\bperfect competition\b|\bmonopoly\b|\bmonopolist\b|\bmarket structure\b|\boligopol/i,
    'the market-structure taxonomy — "perfect competition", "monopoly" and "market structure" are each 0 hits in the whole of bus_spec.txt; :1027-1030 asks for competitor numbers, size and behaviour'],
  [/\bSPICED\b/,
    'SPICED — a UK-GCE sterling mnemonic, 0 hits in bus_spec.txt, and its own first letter is the UK frame this section is being cleared of'],
  [/\bmarket size\b|\bsaturated market\b|\bmarket saturation\b/i,
    'market size and saturation — :1027 asks for the size of the COMPETITORS; "saturated markets" is :1373, inside 4.3.2, a different unit'],
  [/\bExamine\b(?![a-z])|\bOutline\b(?![a-z])/,
    'a command word that is not in Appendix 6 for Business — Examine is an Economics word and Outline is in neither specification'],
];

/*
 * THE ONE EXEMPTION, AND THE OBLIGATION THAT COMES WITH IT (packet 38's precedent, DECISIONS
 * 2026-09-21). Porter's five forces IS examinable IAL Business content — 3.3.1 · 4c at :1110 and
 * 4.3.2 · 2b at :1390 — and is not this leaf's. A student who meets the phrase in a past paper or
 * a textbook must be told where it is taught rather than left to conclude the platform has never
 * heard of it. So the phrase is banned everywhere EXCEPT a sentence that names both owners, and
 * `NEEDS_ONE` makes that sentence compulsory: a ban with no positive obligation is satisfied by
 * silence, which is how the section would end up saying nothing at all.
 */
export const POINTER_ONLY = [
  {
    re: /\bPorter'?s five forces\b/i,
    owner: /\b3\.3\.1\b/,
    coOwner: /\b4\.3\.2\b/,
    why: 'Porter\'s five forces is taught at 3.3.1 (Unit 3) and applied at 4.3.2 (Unit 4); naming it here is allowed only in a sentence that says so',
  },
];

/*
 * TEACHING VOCABULARY. Every term a quiz item, a practice item, a flashcard or an extras chain may
 * lean on must appear in some subsection's own teaching text. `structure-06` and `structure-07` are
 * one defect read from two ends — the quiz and the practice test environmental protection and
 * competition policy, which `content[]` never teaches — and this list is how it is made
 * unrepresentable rather than corrected: the runner asserts every term below is taught, and asserts
 * that the assessment surfaces use nothing outside it.
 */
export const TEACHING_TERMS = [
  'inflation', 'exchange rate', 'appreciation', 'depreciation', 'interest rate',
  'taxation', 'government spending', 'business cycle', 'boom', 'recession', 'recovery',
  'consumer protection', 'employee protection', 'environmental protection',
  'competition policy', 'health and safety', 'intellectual property',
  'patent', 'copyright', 'trademark', 'compliance',
  'competitor', 'price war', 'new entrant', 'niche',
];

export const teachingWords = (text) => new Set(norm(text).split(' ').filter(Boolean));
export const teachingVocabulary = (texts) => {
  const all = new Set();
  for (const t of texts) for (const w of teachingWords(t)) all.add(w);
  return all;
};
