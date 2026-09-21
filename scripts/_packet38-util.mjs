/**
 * PACKET 38 — macroeconomic-objectives-policies helpers: the id scheme, the formatters, the
 * specification's own lists, and the ONE ECONOMY every figure in the section is read off.
 *
 * IAL Economics 2.3.6, Unit 2 (WEC12), `audit/raw/econ_spec.txt:1132-1197`. Four sub-topics —
 * Macroeconomic objectives · Possible conflicts between macroeconomic objectives · Macroeconomic
 * supply-side policies · Macroeconomic demand-side policies — and **34 substantive leaves**, which
 * is the largest count in Unit 2 (2.3.4 has 19, 2.3.3 has 24).
 *
 * ════ RULE 1 · FOUR FINDINGS ASK THIS SECTION TO BUILD UNIT 4 ════════════
 *
 * The dangerous class, because building another section's bullet costs two packets and the second
 * one only finds out when its own coverage check comes back short.
 *
 *   `specGap-04`  Great Depression + 2008 GFC. `Great Depression` is **0 hits** in the whole
 *                 specification. `2008` has ONE hit, `:1880` — **4.3.5 · 4b**, "Use of demand-side
 *                 policies in response to the global financial crisis of 2008". Unit 4, and the
 *                 owner is `role-state-macroeconomy`. The finding flagged itself "verify".
 *   `specGap-02`  national debt as a stock. **0 hits in 2.3.6**; 4 hits, all `:1856-1875`, which is
 *                 **4.3.5 · 3a-3c**. What 2.3.6 owns is `1e`, "Balanced government budget", and
 *                 that IS untaught and IS built here — as an objective, not as a debt stock.
 *   `specGap-06`  "supply-side policies vs supply-side improvements". `supply-side improvement` is
 *                 **0 hits**. UK GCE 2.6.1.
 *   `specGap-08`  "policy conflicts as opposed to objective conflicts". Sub-topic 2 is headed
 *                 "Possible conflicts between macroeconomic OBJECTIVES" and all four of its leaves
 *                 are objective pairs. The substance goes to `3d` and `4e` instead.
 *   `topFix-02`   asks, in its fourth clause, to "merge the simultaneous steps in
 *                 automatic-stabilisers". **`automatic stabilisers` is ECON-4.3.5-3a-2**, `:1855`,
 *                 "automatic stabilisers and discretionary fiscal policy" — Unit 4 again. Found by
 *                 this packet, not by the audit, which asked to IMPROVE the subsection. The
 *                 subsection is removed. Its first three clauses are correct and are built.
 *
 * And `practice-02` asserts that "Assess … (10 marks)" matches IAL. Appendix 6 (`:2700-2745`) is
 * Define 2 · Calculate 2/4 · Draw 4 · Explain 4 · Analyse 6 · Examine 8 · Discuss 14 · Evaluate 20.
 * **No Assess. No 10-mark.** `audit/scripts/spec-coverage-check.mjs` reports the same independently.
 *
 * ════ RULE 2 · WHAT THIS SECTION MAY NOT SAY ═════════════════════════════
 *
 * `long-run Phillips`, `expectations-augmented`, `NAIRU` and `natural rate` are each **0 hits**.
 * `2a` says "including the **short-run** Phillips curve" and stops there, so the live block 4's
 * vertical long-run curve is off-spec depth wearing a "most frequently examined" label — which is
 * `specGap-09`, and the finding's doubt was right. Banned, and the ban carries the packet-37
 * carve-out: **a banned word may be sayable exactly once, in the string that refutes it**, so
 * `long run` survives inside the misconception that says the trade-off is not permanent. The
 * exemption is A/B'd against a sentence it must exempt and one it must not.
 *
 * `Bank of England`, `Monetary Policy Committee` and `the Chancellor` are BLOCK under
 * `locale.institution`; `public expenditure` and `public sector` are Unit 4 topic titles and fire
 * `terms.later-unit`. The specification's own words are "government spending and taxation" (`4b-1`)
 * and "central bank" (`4d`), and they are what is used.
 *
 * THE MULTIPLIER IS 2.3.4's LEAF AND IS NOT TAUGHT HERE. Packet 37 closed D013 by making
 * `national-income` the one place it is taught in full. A fiscal expansion moves AD by more than
 * the injection, and this section says so in one declared pointer and does not derive it.
 *
 * ════ THE SPINE · one economy, and both diagrams derived from it ═════════
 *
 * NOTHING BELOW IS TYPED IN EXCEPT THE SIX HEADLINE FIGURES, THE TWO SLOPES AND THE THREE SHIFTS.
 * Every curve position, every trade-off and every arithmetic line in the content is computed from
 * them, and the runner asserts the properties the teaching rests on — that an AD shift moves
 * output and the price level the SAME way, that a supply-side shift moves them OPPOSITE ways, that
 * the Phillips curve slopes down and is convex, and that the budget balance is the gap between the
 * two figures the section prints. A change that breaks one of those fails the build.
 *
 * Money is in dollars, billions. One minus sign, U+2212, emitted by `money` itself (packet 18).
 */
import { createHash } from 'node:crypto';

export const SECTION = 'macroeconomic-objectives-policies';

const norm = (s) => String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
export const hash8 = (s) => createHash('sha1').update(norm(s)).digest('hex').slice(0, 8);
export const id = (kind, key) => `${SECTION}:${kind}:${hash8(key)}`;
export const subId = (s) => `${SECTION}:sub:${s}`;

export const round2 = (n) => Math.round(n * 100) / 100;
export const round1 = (n) => Math.round(n * 10) / 10;
export const round0 = (n) => Math.round(n);

/* ── formatting: one formatter a kind of figure (packet 18) ────────────────── */

export const MINUS = '−';
const abs = (n) => Math.abs(n);
/** A money amount in dollars. Integers print plain; anything else to two decimals. */
export const money = (n) => `${n < 0 ? MINUS : ''}$${Number.isInteger(abs(n)) ? abs(n).toLocaleString('en-GB') : abs(round2(n)).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
/** Billions — the unit every money figure in this section is in. */
export const bn = (n) => `${money(n)}bn`;
/** A rate: inflation, unemployment, growth, a policy interest rate. One decimal unless whole. */
export const pct = (n) => `${Number.isInteger(round1(n)) ? round0(n) : round1(n)}%`;
/** An index number, which is what the price level is measured in on an AD/AS diagram. */
export const idx = (n) => String(round1(n));
/** A share of GDP, which is how a budget balance and a current account balance are quoted. */
export const ofGdp = (n) => `${round1(n)}% of GDP`;

/* ══ THE ECONOMY · Kalindra ═══════════════════════════════════════════════ */

/*
 * A fictional mid-sized open economy, so that no real country is given a figure it does not have —
 * which is `accuracy-01` (the live section says UK unemployment exceeded 10% in the 1970s; it was
 * roughly 3-6% and passed 10% only in 1981-82) and `topFix-04` (the live section invents a UK 2%
 * GROWTH target; the 2% target every central bank quoting one has is for INFLATION).
 *
 * The REAL examples in the content are real and are named, and after `structure-08` they are
 * weighted to the centres' own markets: Japan, Singapore, Korea, India, Malaysia, the Gulf. The
 * ARITHMETIC is Kalindra's, so a figure can never be wrong about a real economy.
 */
export const ECON = (() => {
  const country = 'Kalindra';
  const what = 'a mid-sized open economy that exports refined metals and imports food and machinery';

  /* ── the six headline figures, and nothing else typed in ─────────────────── */
  const gdp = 800;              // $bn, real GDP
  const growth = 1.4;           // %, current real GDP growth
  const growthTarget = 3;       // %, the growth the government judges sustainable
  const inflation = 3;          // %, current CPI inflation
  const inflationTarget = 2;    // %, the target the central bank is set (4d-2)
  const inflationBand = 1;      // the tolerance either side of it
  const unemployment = 6;       // %, current
  const policyRate = 5;         // %, the central bank's policy interest rate (4c-1)

  /* ── 1e · the budget, as a balance between two flows the section prints ──── */
  const govSpending = 260;      // $bn (4b-1)
  const taxRevenue = 228;       // $bn (4b-1)
  const budgetBalance = taxRevenue - govSpending;            // −32, a deficit
  const budgetPctGdp = round1((budgetBalance / gdp) * 100);  // −4.0

  /* ── 1d · the current account, quoted the same way ───────────────────────── */
  const currentAccount = -24;   // $bn
  const currentAccountPctGdp = round1((currentAccount / gdp) * 100);   // −3.0

  /* ── 1f · income equality, as the share of income the top fifth receives ── */
  const topFifthShare = 44;     // %
  const bottomFifthShare = 7;   // %
  const equalityRatio = round1(topFifthShare / bottomFifthShare);      // 6.3

  /* ══ AD / AS · one pair of slopes, and the signs DERIVED not asserted ═════
   *
   *     AD:    Y = A − b·P          b = 4     a fall in the price level raises real spending
   *     SRAS:  Y = c + d·P          d = 6     a rise in the price level raises real output
   *
   * Both pass through (Y 800, P 100). Solving them together gives ΔP = shift/(b+d) for a
   * horizontal AD shift, and ΔY follows from EITHER curve — which is the point: the two ways of
   * computing ΔY must agree, and the runner checks that they do. A supply-side policy moves the
   * VERTICAL long-run curve instead, and there output and the price level move OPPOSITE ways.
   */
  const P0 = 100;
  const adSlope = 4;            // b
  const srasSlope = 6;          // d
  const adIntercept = gdp + adSlope * P0;        // A, so that AD passes through (800, 100)

  /* 4b · a fiscal expansion. The shift is already multiplied — 2.3.4's leaf, pointed at, not taught */
  const fiscalInjection = 16;   // $bn of extra government spending
  const fiscalMultiplier = 2.5; // 2.3.4 · 4c, quoted as a given
  const adShift = fiscalInjection * fiscalMultiplier;                  // 40
  const Pfiscal = round1(P0 + adShift / (adSlope + srasSlope));        // 104
  const Yfiscal = round0(gdp + srasSlope * (Pfiscal - P0));            // 824
  const YfiscalViaAd = round0(adIntercept + adShift - adSlope * Pfiscal); // 824, the other curve

  /* 4a-2 · the deflationary direction: the same apparatus with the sign reversed */
  const fiscalSqueeze = -fiscalInjection;
  const adShiftDown = fiscalSqueeze * fiscalMultiplier;                // −40
  const Pdeflate = round1(P0 + adShiftDown / (adSlope + srasSlope));   // 96
  const Ydeflate = round0(gdp + srasSlope * (Pdeflate - P0));          // 776

  /* 3 · a supply-side policy moves the LONG-RUN curve, which is vertical */
  const lrasShift = 30;         // $bn of extra productive capacity
  const Ysupply = gdp + lrasShift;                                     // 830
  const Psupply = round1((adIntercept - Ysupply) / adSlope);           // 92.5

  /* ══ 2a · the SHORT-RUN Phillips curve, and only the short run ═══════════
   *
   * π = phA/u − phB, a convex curve through the economy's own point. Downward-sloping and convex
   * are both asserted by the runner off the sampled points rather than claimed in a caption.
   * There is no long-run curve here and the vocabulary for one is banned: `2a` says "including the
   * short-run Phillips curve" and the specification says nothing further.
   */
  const phA = 30;
  const phB = 2;
  const phillips = (u) => round1(phA / u - phB);
  const PH_U = [4, 5, 6, 8, 10];
  const PH_POINTS = PH_U.map((u) => ({ u, pi: phillips(u) }));
  /* the economy sits at unemployment 6, inflation 3 — the curve is built to pass through it */
  const phillipsHere = phillips(unemployment);
  /* a reflationary move down the curve: two points of unemployment bought with inflation */
  const uTarget = 4;
  const piAtTarget = phillips(uTarget);
  const unemploymentBought = round1(unemployment - uTarget);
  const inflationPaid = round1(piAtTarget - phillipsHere);

  return {
    country, what, gdp, growth, growthTarget, inflation, inflationTarget, inflationBand,
    unemployment, policyRate,
    govSpending, taxRevenue, budgetBalance, budgetPctGdp,
    currentAccount, currentAccountPctGdp,
    topFifthShare, bottomFifthShare, equalityRatio,
    P0, adSlope, srasSlope, adIntercept,
    fiscalInjection, fiscalMultiplier, adShift, Pfiscal, Yfiscal, YfiscalViaAd,
    fiscalSqueeze, adShiftDown, Pdeflate, Ydeflate,
    lrasShift, Ysupply, Psupply,
    phillips, PH_U, PH_POINTS, phillipsHere, uTarget, piAtTarget, unemploymentBought, inflationPaid,
  };
})();

/* ══ THE SPECIFICATION'S OWN LISTS ════════════════════════════════════════ */

/*
 * Each of these is the specification's wording, at its line, and the runner asserts every one of
 * them against `audit/raw/econ_spec.txt` rather than against this comment. The live section's
 * supply-side blocks name four free-market policies and four interventionist ones; the
 * specification names FIVE of each, which is `specGap-07` and more of `topFix-05`.
 */

/** 1a-1f, `:1136-1142`. SIX objectives, and "protection of the environment" is NOT one of them. */
export const OBJECTIVES = [
  { leaf: '1a', name: 'Economic growth', line: 1136 },
  { leaf: '1b', name: 'Low and stable rate of inflation', line: 1138 },
  { leaf: '1c', name: 'Low unemployment', line: 1139 },
  { leaf: '1d', name: 'Balance of payments equilibrium on current account', line: 1140 },
  { leaf: '1e', name: 'Balanced government budget', line: 1141 },
  { leaf: '1f', name: 'Greater income equality', line: 1142 },
];

/** 2a-2d, `:1144-1151`. FOUR conflicts, each between two objectives. */
export const CONFLICTS = [
  { leaf: '2a', pair: 'Inflation and unemployment, including the short-run Phillips curve' },
  { leaf: '2b', pair: 'Economic growth and protection of the environment' },
  { leaf: '2c', pair: 'Inflation and equilibrium on the current account of the balance of payments' },
  { leaf: '2d', pair: 'Economic growth and income equality' },
];

/** 3b, `:1155-1159`. FIVE free-market policies. */
export const FREE_MARKET = [
  'deregulation of product and labour markets',
  'privatisation',
  'reduction in taxation',
  'changing the levels of welfare payments',
  'cutting the costs of bureaucracy for firms',
];

/** 3c, `:1161-1165`. FIVE interventionist policies. */
export const INTERVENTIONIST = [
  'investment in education, training and skills',
  'incentives to encourage investment: tax incentive or subsidies',
  'infrastructure investment',
  'finance for business start-ups',
  'regional policy',
];

/** 4c, `:1184-1188`. FOUR monetary instruments — the live section teaches two. */
export const MONETARY_INSTRUMENTS = [
  'interest rates',
  'asset purchases to increase money supply (quantitative easing)',
  'changes in lending criteria',
  'reserve asset (liquidity) requirements',
];

/** 4d, `:1190-1193`. FOUR central-bank roles — `specGap-03`, and all four are untaught today. */
export const CENTRAL_BANK_ROLES = [
  'implementation of monetary policy',
  'achieving an inflation target',
  'as banker to the government',
  'as banker to the banks – lender of last resort',
];

/* ══ RULE 2 · THE BANS, AND THE ONE CARVE-OUT ═════════════════════════════ */

/*
 * Every entry is 0 hits in `econ_spec.txt` unless the note says otherwise, and the runner re-greps
 * the specification for each rather than trusting the list.
 */
export const BANNED = [
  /* `specGap-09`: 2a is the SHORT-RUN curve and the specification stops there */
  { re: /\bexpectations[-\s]augmented\b/i, why: 'expectations-augmented Phillips curve is off-spec (2a is the short-run curve)' },
  { re: /\bNAIRU\b/, why: 'NAIRU is off-spec' },
  { re: /\bnatural rate of unemployment\b/i, why: 'the natural rate is off-spec' },
  { re: /\blong[-\s]run Phillips\b/i, why: 'there is no long-run Phillips curve in this specification' },
  /* Unit 4 · 4.3.5, and `terms.later-unit` for the topic titles */
  { re: /\bnational debt\b/i, why: 'national debt is 4.3.5 · 3a (Unit 4)' },
  { re: /\bstructural (?:and cyclical )?(?:fiscal )?deficit\b/i, why: 'structural and cyclical deficits are 4.3.5 · 3a (Unit 4)' },
  { re: /\bLaffer\b/, why: 'the Laffer curve is 4.3.5 · 2c (Unit 4)' },
  { re: /\btransfer payments?\b/i, why: 'transfer payments are 4.3.5 · 1a (Unit 4)' },
  { re: /\bpublic expenditure\b/i, why: 'a Unit 4 topic title; the specification\'s words at 4b-1 are "government spending and taxation"' },
  { re: /\bpublic sector\b/i, why: 'a Unit 4 topic title (terms.later-unit)' },
  /*
   * THE ONE CARVE-OUT, AND IT IS THE PACKET-37 SHAPE (kinked demand curve, Appendix 8, "leakage").
   * A banned term may be sayable exactly once, in the string that sends it somewhere else. The
   * section has to be able to tell a student where automatic stabilisers ARE taught, or a reader
   * who meets the phrase in a past paper has been left with nothing. `exemptIf` is the declared
   * pointer — a sentence that names the owning topic — and `NEEDS_ONE` below makes the pointer
   * COMPULSORY, so the ban cannot be satisfied by silence. Both directions are A/B'd in the runner.
   */
  { re: /\bautomatic stabilis[ea]rs?\b/i, exemptIf: /\b4\.3\.5\b|\btopic 4\.3\.5\b/, why: 'automatic stabilisers are ECON-4.3.5-3a-2 (Unit 4); topFix-02 asks this packet to IMPROVE a subsection that is another section\'s leaf' },
  { re: /\bdiscretionary fiscal policy\b/i, why: 'the same oracle row, ECON-4.3.5-3a-2 (Unit 4)' },
  { re: /\bGreat Depression\b/i, why: '0 hits in either specification; UK GCE Theme 2' },
  { re: /\bglobal financial crisis\b/i, why: 'the 2008 crisis is 4.3.5 · 4b (Unit 4)' },
  { re: /\bsupply[-\s]side improvements?\b/i, why: '0 hits; the policies/improvements distinction is UK GCE 2.6.1' },
  /* Appendix 6: neither exists in IAL Economics */
  { re: /\bAssess\b/, why: 'Assess is not an IAL Economics command word (Appendix 6)' },
  { re: /\bOutline\b/, why: 'Outline is not a command word in either specification' },
  { re: /\b10 marks?\b/i, why: 'there is no 10-mark tariff in IAL Economics (Appendix 6)' },
  { re: /\bmerit goods?\b|\bdemerit goods?\b|\bdeadweight loss\b/i, why: 'terms.off-spec' },
];

/*
 * THE CARVE-OUT, AND WHY IT IS SHAPED LIKE THIS (packet 37, and packets 29 and 36 before it).
 *
 * "long run" on its own is ordinary English and the section needs it exactly once: the
 * misconception that corrects the live section's permanent trade-off has to be able to say that
 * the short-run curve does not hold in the long run. So the ban is on `long-run Phillips`, which
 * is the off-spec OBJECT, and not on the words — and the refutation must EXIST, which `needsOne`
 * asserts. A ban with no positive obligation lets a packet satisfy it by silence.
 */
export const NEEDS_ONE = [
  {
    re: /\bshort[-\s]run trade-?off\b/i,
    why: 'the short-run trade-off must be named AS short-run somewhere, or the ban on the long-run curve is satisfied by silence',
  },
  {
    re: /\bautomatic stabilis[ea]rs?\b[^.]*4\.3\.5|4\.3\.5[^.]*\bautomatic stabilis[ea]rs?\b/i,
    why: 'automatic stabilisers must carry their declared pointer to 4.3.5 — the exemption above is only worth having if the pointer exists',
  },
  {
    re: /\bmultiplier\b[^.]*2\.3\.4|2\.3\.4[^.]*\bmultiplier\b/i,
    why: 'the multiplier must carry its declared pointer to 2.3.4, because this section uses it without teaching it (D013)',
  },
];

/** Terms the section MUST use, because they are the specification's own words for its leaves. */
export const TEACHING_TERMS = [
  'short-run Phillips curve', 'reflationary', 'deflationary', 'quantitative easing',
  'lending criteria', 'reserve asset', 'lender of last resort', 'inflation target',
  'balanced government budget', 'income equality', 'deregulation', 'privatisation',
  'regional policy', 'infrastructure investment',
];
