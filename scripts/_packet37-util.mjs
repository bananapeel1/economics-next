/**
 * PACKET 37 — national-income helpers: the id scheme, the formatters, the specification's own
 * lists, and the ONE OPEN ECONOMY that every figure in the section is read off.
 *
 * IAL Economics 2.3.4, Unit 2 (WEC12), `audit/raw/econ_spec.txt:1056-1082`. Four sub-topics —
 * National income · Injections and withdrawals · Equilibrium level of real output · The multiplier
 * — and **19 substantive leaves**.
 *
 * ════ THE PACKET ALSO CLOSES D013, AND HALF OF IT IS ALREADY DONE ════════
 *
 * `audit/SPEC-OWNERSHIP.md` has one unresolved row: the multiplier was taught in full twice, here
 * and in `aggregate-demand` (2.3.2). **Packet 32 did step 2 on 18 September**: it removed that
 * section's three multiplier subsections and its multiplier quiz items when it rebuilt, and kept
 * exactly one declared pointer (`_packet32-content.mjs:353`) saying the multiplier "belongs to
 * topic 2.3.4, national income". Steps 1 and 3 are this packet: 2.3.4 becomes the one place the
 * multiplier is taught, **including what determines its size**, which is the part only
 * `aggregate-demand` used to carry. Step 4 is the census, and the runner runs it.
 *
 * ════ THE NUMBER THE LEDGER DOUBTED IS THE ONE THAT WAS RIGHT ════════════
 *
 * `specGap-05` is unsure the app's "2.3.4" matches WEC12 and unsure the notes' cross-references do
 * either. All four are correct and each has a line: `:1056` "2.3.4 National income"; `:976`
 * "2.3.2 Aggregate demand (AD)"; output gaps at 2.3.5 · 4, `:1121-1125`; fiscal policy instruments
 * at 2.3.6 (continued) · 1b, `:1181`. It is the mirror of the 154-item class the ledger records —
 * there a finding cited a number that does not exist, here a finding doubted one that does — and
 * the answer is the same both times: look the requirement up by its WORDING.
 *
 * Five other items cite UK GCE numbers outright. `topFix-01`, `topFix-05`, `practice-01` and
 * `structure-05` say "2.1.1" and `specGap-01` says "2.4.1". Neither exists. The owner of GDP
 * measurement, real against nominal, per capita, GNI, PPPs and the limitations of GDP for
 * comparing living standards is **2.3.1** (`:884-910`), `measures-economic-performance`, packet 21.
 *
 * ════ THE SPINE · one open economy, and both formulae agreeing ═══════════
 *
 * 4c asks for "Calculations of the multiplier using the formula 1/(1-MPC) and 1/MPW, where
 * MPW = MPS + MPT + MPM" (`:1084-1085`). It hands over two formulae and does not say when they are
 * the same formula. They are the same whenever MPC is the fraction of an extra pound of NATIONAL
 * INCOME spent on DOMESTIC output, because then the four propensities exhaust the pound:
 *
 *     MPC 0.60 + MPS 0.10 + MPT 0.20 + MPM 0.10 = 1.00
 *     MPW = MPS + MPT + MPM = 0.40 = 1 − MPC
 *     1/(1 − MPC) = 1/MPW = 2.5
 *
 * That identity is the whole section's spine, and it is also the answer to the misconception
 * `structure-08` calls genuine: a student who takes MPC out of DISPOSABLE income, after tax, and
 * then puts it into 1/(1−MPC) gets a different and wrong number. The runner asserts the identity
 * rather than trusting it, so a change to any propensity that breaks it fails the build.
 *
 *     Y 500        C 300 + S 50 + T 100 + M 50        income disposed of
 *                  C 300 + I 60 + G 90 + X 50         expenditure on output
 *     J = I + G + X = 200   =   W = S + T + M = 200   equilibrium (3a)
 *
 *     ΔG +40  →  rounds 40, 24, 14.4, 8.64, 5.184 …  →  ΔY = 40 / 0.40 = 100,  k = 2.5
 *     new Y 600; withdrawals rise by 0.40 × 100 = 40, so J = W = 240 again
 *
 * The last line is the one that closes the model and the one the live section never draws: **the
 * multiplier stops exactly where withdrawals have grown by the size of the injection.** It is why
 * the process converges at all, and it is 2d and 4a in one sentence.
 *
 * And it reconciles to 2.3.2's identity without a second set of figures. Total consumption
 * spending is 350 — 300 on domestic output and 50 on imports — so
 * C + I + G + (X − M) = 350 + 60 + 90 + (50 − 50) = 500. The two accounting conventions are the
 * same arithmetic; a student who has met AD in 2.3.2 meets the same economy here.
 *
 * ════ RULE 2 · WHAT THIS SECTION MAY NOT SAY ═════════════════════════════
 *
 * `leakage` is **0 hits** in `econ_spec.txt`; the specification's word is `withdrawal` (`:1062`,
 * `:1068`, `:1072`). `unplanned`, `inventories`, `Keynesian cross`, `45-degree`, `paradox of
 * thrift`, `full employment`, `spare capacity`, `accelerator` and `factor market` are **each 0**,
 * which means the live section's entire "planned versus actual / adjustment through inventories"
 * apparatus is off-spec vocabulary — and that, not the redundancy, is the real content of
 * `structure-02`. The mechanism survives as the two sentences that explain WHY J = W is an
 * equilibrium; the apparatus the specification names for 3a and 3b is AD/AS (`:1077`).
 *
 * Money is in dollars, billions. One minus sign, U+2212, emitted by `money` itself (packet 18).
 */
import { createHash } from 'node:crypto';

export const SECTION = 'national-income';

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
/** Billions — the unit every figure in this section is in. */
export const bn = (n) => `${money(n)}bn`;
/** A propensity: two decimals, never a percentage, because the formulae take the decimal. */
export const prop = (n) => round2(n).toFixed(2);
/** The multiplier itself. 2.5 prints as "2.5", not "2.50": it is a ratio, not money. */
export const mult = (n) => String(round2(n));
export const pct = (n) => `${Number.isInteger(round2(n)) ? round2(n) : round1(n)}%`;
/** An index number, which is what the price level is measured in on an AD/AS diagram. */
export const idx = (n) => String(round1(n));

/* ══ THE ECONOMY · 2.3.4 · 1a, 2a-2d, 3a-3b, 4a-4d ═══════════════════════ */

/*
 * NOTHING BELOW IS TYPED IN EXCEPT THE FOUR PROPENSITIES, THE FIVE LEVELS AND THE THREE SHOCKS.
 * Every injection, every withdrawal, every round of the multiplier process and every AD/AS
 * position is computed from them, and the runner asserts the properties the teaching rests on —
 * that the propensities sum to one, that MPW equals 1 − MPC, that the two formulae give the same
 * number, that the rounds converge on it, and that withdrawals have grown by exactly the size of
 * the injection at the new equilibrium. A change to a figure that breaks one of those fails the
 * build rather than quietly teaching a section whose arithmetic no longer says what the prose says.
 */
export const ECON = (() => {
  const country = 'Marisel';           // a mid-sized open economy; no real country, no year
  const what = 'a mid-sized open economy that exports processed food and imports machinery';

  /* ── the four marginal propensities, out of national income (4b, :1078-1083) ── */
  const mpc = 0.6;    // spent on DOMESTICALLY produced goods and services
  const mps = 0.1;
  const mpt = 0.2;
  const mpm = 0.1;
  const mpw = round2(mps + mpt + mpm);
  const propensitySum = round2(mpc + mps + mpt + mpm);

  /* the two formulae 4c hands over, computed separately so the runner can compare them */
  const kFromMpc = round2(1 / (1 - mpc));
  const kFromMpw = round2(1 / mpw);
  const k = kFromMpw;

  /* ── the levels, in $bn (1a, 2b, 2c) ──────────────────────────────────────── */
  const Y = 500;
  const S = round0(Y * mps);           // 50
  const T = round0(Y * mpt);           // 100
  const M = round0(Y * mpm);           // 50
  const Cd = Y - S - T - M;            // 300, consumption of DOMESTIC output
  const I = 60;
  const G = 90;
  const X = Y - Cd - I - G;            // 50, so that expenditure on output equals Y
  const J = I + G + X;
  const W = S + T + M;
  /* the 2.3.2 convention: total consumption spending, imports included */
  const Ctotal = Cd + M;
  const adIdentity = Ctotal + I + G + (X - M);

  /* ── 2d · a net injection, and the multiplier process it sets off (4a) ────── */
  const shock = 40;                    // a rise in government expenditure, $bn
  const rounds = (n, start = shock) => Array.from({ length: n }, (_, i) => round2(start * mpc ** i));
  const ROUNDS = rounds(6);
  const roundsSum = (n) => round2(rounds(n).reduce((a, b) => a + b, 0));
  const deltaY = shock * k;            // 100
  const Y2 = Y + deltaY;               // 600
  /* the check that closes the model: withdrawals have grown by exactly the injection */
  const withdrawalRise = round2(deltaY * mpw);
  const S2 = round0(S + deltaY * mps);
  const T2 = round0(T + deltaY * mpt);
  const M2 = round0(M + deltaY * mpm);
  const W2 = S2 + T2 + M2;
  const J2 = I + (G + shock) + X;

  /* the share of the final effect the first five rounds have already delivered */
  const fiveRoundShare = (roundsSum(5) / deltaY) * 100;

  /* ── 3b · what a shift does on price-level / real-output axes ─────────────── */
  /*
   * ONE PAIR OF SLOPES, FOUR CASES, AND THE SIGNS ARE DERIVED RATHER THAN ASSERTED. The AD curve
   * moves right by the MULTIPLIED amount, `deltaY` — that is 4d and `specGap-03`. Where it settles
   * depends on the AS curve it meets, which is 2.3.3's leaf and is referred to here, not taught.
   *
   *     AD:    Y = A − b·P          b = 4     a fall in the price level raises real spending
   *     SRAS:  Y = c + d·P          d = 6     a rise in the price level raises real output
   *
   * Both curves pass through (Y 500, P 100). Solving them together gives ΔP = shift/(b+d) for a
   * horizontal AD shift and ΔP = −shift/(b+d) for a horizontal AS shift, and ΔY follows from
   * either curve — which is the point: the two ways of computing ΔY agree, and the runner checks
   * that they do. **An AD shift moves output and the price level the SAME way; an AS shift moves
   * them OPPOSITE ways.** That is not a fact to memorise, it is what falls out of the two slopes.
   */
  const P0 = 100;                      // the price level, as an index
  const adSlope = 4;                   // b — extra real spending per point the price level falls
  const srasSlope = 6;                 // d — extra real output per point the price level rises
  const adShift = deltaY;              // 100 — the horizontal shift, already multiplied

  /* upward-sloping SRAS: part output, part price */
  const Pad = round1(P0 + adShift / (adSlope + srasSlope));          // 110
  const Yad = round0(Y + srasSlope * (Pad - P0));                    // 560
  const YadViaAd = round0(Y + adShift - adSlope * (Pad - P0));       // 560, the same by the other curve

  /* the Keynesian shape (2.3.3 · 3a, `:1041`): below capacity the price level does not move */
  const Ykeynes = Y + adShift;         // 600
  const Pkeynes = P0;
  /* the classical shape at capacity: output cannot move, so all of it is price */
  const Yclassical = Y;
  const Pclassical = round1(P0 + adShift / adSlope);                 // 125

  /* an AS shift: cheaper imported machinery moves SRAS right (2.3.3 · 2a, `:1033-1035`) */
  const asShift = 50;
  const Pas = round1(P0 - asShift / (adSlope + srasSlope));          // 95
  const Yas = round0(Y + adSlope * (P0 - Pas));                      // 520
  const YasViaAs = round0(Y + asShift + srasSlope * (Pas - P0));     // 520, the same by the other curve

  /* ── 4c · the ratio direction, which is `specGap-04` ──────────────────────── */
  /*
   * The specification's formulae go from the propensities to k. The paper also goes the other way:
   * it gives ΔY and ΔJ and asks for k, and from k asks for MPW. Only the first direction is drilled
   * in the live section. These are a SECOND economy's figures on purpose, so that a student cannot
   * recover the answer by remembering 2.5.
   */
  const otherDeltaJ = 200;
  const otherDeltaY = 800;
  const otherK = otherDeltaY / otherDeltaJ;   // 4
  const otherMpw = 1 / otherK;                // 0.25
  const otherMpc = 1 - otherMpw;              // 0.75

  /* ── 2d · a net WITHDRAWAL, so the model is shown working downwards too ───── */
  const importShock = 20;              // a rise in imports, $bn: a withdrawal, not an injection
  const importDeltaY = round0(-importShock * k);            // −50
  const Yimport = Y + importDeltaY;    // 450

  /* ── 1b · income against wealth, the flow-and-stock pair (`:1061`) ────────── */
  const householdIncome = 40000;       // a year's income, in dollars
  const householdWealth = 260000;      // what the same household owns on one day
  const wealthYears = round1(householdWealth / householdIncome);

  return {
    country, what,
    mpc, mps, mpt, mpm, mpw, propensitySum, kFromMpc, kFromMpw, k,
    Y, Cd, S, T, M, I, G, X, J, W, Ctotal, adIdentity,
    shock, ROUNDS, rounds, roundsSum, deltaY, Y2, withdrawalRise, S2, T2, M2, W2, J2, fiveRoundShare,
    P0, adSlope, srasSlope, adShift, Yad, Pad, YadViaAd, Ykeynes, Pkeynes, Yclassical, Pclassical,
    asShift, Yas, Pas, YasViaAs,
    otherDeltaJ, otherDeltaY, otherK, otherMpw, otherMpc,
    importShock, importDeltaY, Yimport,
    householdIncome, householdWealth, wealthYears,
  };
})();

/* ══ The specification's own lists ════════════════════════════════════════ */

/** 2 · b (`:1064-1067`): the three injections, in the specification's own order and words. */
export const INJECTIONS = [
  ['Investment', 'I', 'Spending by firms on capital goods — the machines, buildings and vehicles that produce future output.'],
  ['Government expenditure', 'G', 'Government spending on goods and services: the hospital that is built, the teacher who is paid.'],
  ['Exports', 'X', 'Spending by foreign buyers on goods and services produced at home.'],
];

/** 2 · c (`:1068-1071`): the three withdrawals, in the specification's own order and words. */
export const WITHDRAWALS = [
  ['Savings', 'S', 'Income households receive and do not spend.'],
  ['Taxation', 'T', 'Income taken by the government before a household can spend it.'],
  ['Imports', 'M', 'Spending that leaves the country to pay for goods and services produced abroad.'],
];

/** 4 · b (`:1078-1083`): the four marginal propensities, in the specification's own order. */
export const PROPENSITIES = [
  ['MPC', 'marginal propensity to consume', 'mpc', 'spent on domestically produced goods and services'],
  ['MPS', 'marginal propensity to save', 'mps', 'saved rather than spent'],
  ['MPT', 'marginal propensity to tax', 'mpt', 'taken in taxation'],
  ['MPM', 'marginal propensity to import', 'mpm', 'spent on goods and services produced abroad'],
];

/*
 * BANNED, BECAUSE ANOTHER TOPIC OWNS IT OR BECAUSE THE SPECIFICATION DOES NOT USE THE WORD. Each
 * entry cites the line that settles it. The first is this section's sharpest rule-2 case: the live
 * section's central metaphor is a word the specification never uses.
 */
export const BANNED_ELSEWHERE = [
  /*
   * ONE BANNED WORD HAS TO BE SAYABLE IN ORDER TO BE REFUTED, and it is the one a student arrives
   * holding: many textbooks call a withdrawal a leakage. A flat ban deletes the sentence that
   * tells them which word the paper uses, which is packet 36's Appendix 8 problem and packet 29's
   * kinked-demand-curve problem. The rule: `leakage` may appear ONLY in a string that also says
   * "withdrawal" and names the specification, so the refutation always travels with it.
   */
  [/\bleakages?\b/i, '"leakage" — 0 hits in econ_spec.txt. The specification\'s word is "withdrawal" (:1062, :1068, :1072), and a student who writes "leakage" in an answer is writing a word the mark scheme does not contain', { exemptIf: /\bwithdrawal\b[\s\S]{0,200}\bspecification\b|\bspecification\b[\s\S]{0,200}\bwithdrawal\b/i, needsOne: true }],
  [/\breal (?:and|or) nominal\b|\bnominal GDP\b|\breal GDP\b|\bGNI\b|\bper capita\b|\bpurchasing power parit\w*\b|\bPPPs?\b(?! *\))|\bstandard of living\b|\bliving standards?\b|\brecession\b/i, 'the GDP-measurement family — 2.3.1 (econ_spec.txt:884-910), measures-economic-performance, packet 21. topFix-01, quiz-03, structure-05, practice-01 are that ten of the live MCQs and two of the five practice items test it here'],
  [/\boutput gaps?\b/i, 'output gaps — 2.3.5 · 4 (econ_spec.txt:1121-1125), economic-growth. A pointer is allowed; teaching it is not'],
  [/\bcrowding out\b/i, 'crowding out — 4.3.5 (econ_spec.txt:1838), role-state-macroeconomy, packet 52'],
  [/\bPhillips curve\b/i, 'the Phillips curve — 2.3.6 · 2a (econ_spec.txt:1143)'],
  [/\bunplanned\b|\binventor(?:y|ies)\b|\bKeynesian cross\b|\b45[- ]degree\b|\bparadox of thrift\b|\bfull employment\b|\bspare capacity\b|\baccelerator\b|\bfactor markets?\b/i, 'vocabulary with 0 hits in econ_spec.txt — the live section\'s "planned versus actual / adjustment through inventories" apparatus, which is structure-02\'s real content. The specification\'s apparatus for 3a and 3b is AD/AS (:1077)'],
  [/\bAssess\b|\bOutline\b/, 'command words IAL Economics does not have. Appendix 6 (econ_spec.txt:2696-2745) is the whole taxonomy: Define 2, Calculate 2 or 4, Draw 4, Explain 4, Analyse 6, Examine 8, Discuss 14, Evaluate 20. topFix-05 asks for the live "Assess (10)" to be CONVERTED; it is removed'],
];

/*
 * THE TWO NEIGHBOURS THAT MAY BE POINTED AT AND MAY NOT BE TAUGHT. 3b needs AD and AS to say
 * anything at all — "shifts in AD and/or AS curves" is its own wording (`:1077`) — but what MOVES
 * those curves is 2.3.2 and 2.3.3. The rule packet 32 used for the multiplier is used here in the
 * other direction: one declared pointer each, and the runner counts them.
 */
export const POINTER_ONLY = [
  { re: /\bconsumer confidence\b|\bavailability of credit\b|\bsavings ratio\b|\bbusiness confidence\b|\btax relief\b|\bcorporation tax\b|\bwealth effects?\b/i, why: 'the determinants of C, I, G and (X−M) are 2.3.2 (econ_spec.txt:980-1020), aggregate-demand, packet 32', max: 0 },
  { re: /\bSRAS\b|\bLRAS\b|\bclassical\b|\bKeynesian\b/, why: 'the shapes and shifters of the AS curve are 2.3.3 (econ_spec.txt:1026-1052), aggregate-supply, packet 44 — referred to here, not taught', max: 12 },
  { re: /\btransfer payments?\b/i, why: 'transfer payments are 4.3.5 · 1a (econ_spec.txt:1829), role-state-macroeconomy, packet 52 — named here only in the misconception that corrects it (accuracy-01, topFix-02, closed by packet 0)', max: 4 },
];

/*
 * TEACHING TERMS. `teachingWords` is the word budget, counted the way `lib/content-validator.mjs`
 * counts it; `TEACHING_TERMS` is the vocabulary the answer-recoverable check works over, so that a
 * recall cannot be answered by scrolling up to the subsection that set it.
 */
export const TEACHING_TERMS = [
  'circular flow of income', 'national income', 'income', 'wealth', 'flow', 'stock',
  'factors of production', 'households', 'firms', 'money flow', 'real flow',
  'injection', 'withdrawal', 'investment', 'government expenditure', 'exports',
  'savings', 'taxation', 'imports', 'net injection', 'net withdrawal',
  'equilibrium', 'real national output', 'aggregate demand', 'aggregate supply',
  'price level', 'multiplier', 'multiplier process',
  'marginal propensity to consume', 'marginal propensity to save',
  'marginal propensity to tax', 'marginal propensity to import',
  'marginal propensity to withdraw', 'level of economic activity',
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
