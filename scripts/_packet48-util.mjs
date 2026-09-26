/**
 * PACKET 48 — government-intervention-firms helpers: the id scheme, the formatters, the
 * specification's own lists, and the SIX MODELS every figure in the section is read off.
 *
 * IAL Economics 3.3.5 "Government intervention", Unit 3 (WEC13), `audit/raw/econ_spec.txt:1485-1535`.
 * Two numbered requirements — government intervention in product markets (1a-1f) and in labour
 * markets (2a-2b) — and 33 leaves under 39 oracle rows (`audit/raw/spec-items.json`, topic "3.3.5").
 * The oracle splits 1d's second bullet across a page break into two leaves ("employment legislation
 * to protect workers from" / "exploitation"); the runner re-reads the count rather than trusting this.
 *
 * ════ WHAT THIS SECTION OWNS THAT OTHERS POINT AT ════════════════════════════
 *
 * `audit/SPEC-OWNERSHIP.md`: the minimum wage IN EITHER MARKET, maximum wages, measures to reduce
 * immobility and discrimination are 3.3.5 · 2b and belong here. Packet 45 removed them from
 * `labour-markets` (3.3.4) and left counted pointers to this section. Packet 29 (published) teaches
 * the monopsony model itself (3.3.3 · 7) and natural monopoly (3.3.3 · 6e); this section USES both,
 * citing the topic number, and does not re-teach how a monopsony sets its wage or why a natural
 * monopoly's average cost falls. The causes of immobility are 3.3.4 · 4 and are cited, not re-taught:
 * this section owns the MEASURES.
 *
 * ════ THE SIX MODELS ═════════════════════════════════════════════════════════
 *
 * Nothing below is typed except intercepts, slopes and the size of each change; every outcome is
 * solved, and the runner re-derives each one a second way (packet 34's two-sources rule).
 *
 *   NAT   a natural monopoly (a water network): P = 100 − Q, MC = $20, AC = 20 + 1,200/Q.
 *         Unregulated MR = MC: Q 40, P $60, AC $50. Cap at AC: Q 60, P $40. Cap at MC: Q 80, P $20,
 *         a loss of $1,200 (thousand) — the fixed cost. A regulator believing a claimed AC $10 higher
 *         sets a cap of $60: no lower than the unregulated price.
 *   TEL   a telecoms market: P = 120 − 2Q. State monopoly MC $40: Q 20, P $80. Private monopoly MC
 *         $32: Q 22, P $76. Open to entry, P = MC = $32: Q 44.
 *   CEM   cement, with and without foreign suppliers: D Q = 100 − 2P, domestic S Q = 2P − 20, foreign
 *         S Q = P. Open: P $24, Q 52 (domestic 28). Foreign firms barred: P $30, Q 40 (all domestic).
 *   LAB   a competitive labour market (warehouse workers): L = 80 − 4W, L = 4W − 16. W $12, L 32,000.
 *         A minimum wage of $14: 24,000 hired, 40,000 willing. An employer contribution of $2 an
 *         hour: W $11, L 28,000, firms pay $13. Retraining +8,000: W $11, L 36,000. Discrimination
 *         (demand for one group 16,000 lower at every wage): W $10, L 24,000.
 *   MON   a monopsony labour market: supply W = 2 + 0.5L, marginal cost of labour W = 2 + L, the
 *         value of the extra worker's output W = 20 − 0.5L. Monopsony L 12, W $8; competitive L 18,
 *         W $11; a floor of $10: L 16, W $10.
 *   TOP   a maximum wage (senior managers, hundreds): L = 40 − W/5, L = W/5 − 8. W $120, L 1,600.
 *         A cap of $100: 1,200 willing, 2,000 wanted, a shortage of 800.
 *
 * Money is dollars; one minus sign, U+2212, emitted by `money` itself (packet 18).
 */
import { createHash } from 'node:crypto';

export const SECTION = 'government-intervention-firms';

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
/** An hourly wage. */
export const hr = (n) => `${money(n)} an hour`;
/** Thousands, printed in full: 32 → "32,000". */
export const k = (n) => (round0(n * 1000)).toLocaleString('en-GB');
/** Hundreds, printed in full: 16 → "1,600". */
export const h = (n) => (round0(n * 100)).toLocaleString('en-GB');
export const pct = (n) => `${Number.isInteger(round2(n)) ? round2(n) : round1(n)}%`;

/* ══ NAT · a natural monopoly: the water network ═════════════════════════ */

export const NAT = (() => {
  const a = 100, b = 1;                 // demand P = a − bQ, Q in thousand units a day, P in $ a unit
  const mc = 20;                        // constant marginal cost
  const fixed = 1200;                   // the network's fixed cost, $ thousand a day
  const price = (Q) => a - b * Q;
  const mr = (Q) => a - 2 * b * Q;
  const ac = (Q, extra = 0) => mc + extra + fixed / Q;
  /* unregulated: MR = MC */
  const mQ = (a - mc) / (2 * b);                                     // 40
  const mono = { Q: mQ, P: price(mQ), AC: ac(mQ) };                  // 40, $60, $50
  mono.profit = round2((mono.P - mono.AC) * mono.Q);                 // 400
  /* the larger root of a − bQ = c + F/Q ⇒ bQ² − (a − c)Q + F = 0 */
  const acCap = (extra = 0) => {
    const c = mc + extra;
    const Q = ((a - c) + Math.sqrt((a - c) ** 2 - 4 * b * fixed)) / (2 * b);
    return { Q: round2(Q), P: round2(price(Q)) };
  };
  const avg = acCap();                                               // 60, $40
  const mcQ = (a - mc) / b;                                          // 80
  const marg = { Q: mcQ, P: price(mcQ), AC: ac(mcQ) };               // 80, $20, $35
  marg.loss = round2((marg.AC - marg.P) * marg.Q);                   // 1,200
  /* an information gap: the firm claims every unit costs $10 more than it does */
  const padding = 10;
  const claimed = acCap(padding);                                    // 40, $60
  claimed.trueAC = ac(claimed.Q);                                    // $50
  claimed.profit = round2((claimed.P - claimed.trueAC) * claimed.Q); // 400
  /* CPI − X: the cap moves by inflation minus X each year, from the AC price */
  const cpi = 5, X = 2;
  const allowed = cpi - X;                                           // 3%
  const nextCap = round2(avg.P * (1 + allowed / 100));               // $41.20
  /* rate-of-return regulation: an allowed return on the capital base */
  const rate = 8, base = 500, added = 100;                           // %, $ million
  const allowedProfit = (base * rate) / 100;                         // $40m
  const allowedAfter = ((base + added) * rate) / 100;                // $48m
  return { a, b, mc, fixed, price, mr, ac, mono, avg, marg, padding, claimed, cpi, X, allowed, nextCap, rate, base, added, allowedProfit, allowedAfter };
})();

/* ══ TEL · a telecoms monopoly, privatised, then opened ═══════════════════ */

export const TEL = (() => {
  const a = 120, b = 2;                 // P = a − bQ, Q in million subscriptions, P in $ a month
  const price = (Q) => a - b * Q;
  const monoAt = (mc) => { const Q = (a - mc) / (2 * b); return { Q, P: price(Q), mc }; };
  const state = monoAt(40);                                          // 20, $80
  const privat = monoAt(32);                                         // 22, $76
  const openQ = (a - privat.mc) / b;
  const open = { Q: openQ, P: price(openQ) };                        // 44, $32
  return { a, b, price, state, privat, open };
})();

/* ══ CEM · cement, with and without foreign suppliers ═════════════════════ */

export const CEM = (() => {
  const dA = 100, dB = 2;               // Q = 100 − 2P, thousand bags a day, P in $ a bag
  const hA = -20, hB = 2;               // domestic supply Q = 2P − 20
  const fB = 1;                         // foreign supply Q = P
  const demand = (P) => dA - dB * P;
  const home = (P) => hA + hB * P;
  const foreign = (P) => fB * P;
  const openP = (dA - hA) / (dB + hB + fB);                          // $24
  const open = { P: openP, Q: demand(openP), home: home(openP), foreign: foreign(openP) }; // 52, 28, 24
  const shutP = (dA - hA) / (dB + hB);                               // $30
  const shut = { P: shutP, Q: demand(shutP), home: home(shutP) };    // 40, 40
  return { dA, dB, hA, hB, fB, demand, home, foreign, open, shut };
})();

/* ══ LAB · a competitive labour market: warehouse workers ═════════════════ */

export const LAB = (() => {
  const dA = 80, dB = 4;                // L = 80 − 4W, thousands; W in $ an hour
  const sA = -16, sB = 4;               // L = 4W − 16
  const demand = (W, shift = 0) => dA + shift - dB * W;
  const supply = (W, shift = 0) => sA + shift + sB * W;
  const solve = (dShift = 0, sShift = 0) => {
    const W = round2((dA + dShift - sA - sShift) / (dB + sB));
    return { W, L: round2(demand(W, dShift)) };
  };
  const eq = solve();                                                // $12, 32
  /* 2b · a minimum wage above equilibrium */
  const minW = 14;
  const minHired = demand(minW);                                     // 24
  const minWilling = supply(minW);                                   // 40
  const minSurplus = minWilling - minHired;                          // 16
  const minLost = eq.L - minHired;                                   // 8
  /* 2b · an employer contribution of $2 an hour: demand, in terms of the wage WORKERS receive, falls by dB × 2 */
  const tax = 2;
  const taxed = solve(-dB * tax, 0);                                 // $11, 28
  const firmPays = round2(taxed.W + tax);                            // $13
  /* 2b · retraining: 8,000 more able to do the job at every wage */
  const train = 8;
  const trained = solve(0, train);                                   // $11, 36
  /* 2b · discrimination: demand for one group's labour 16,000 lower at every wage */
  const bias = -16;
  const biased = solve(bias, 0);                                     // $10, 24
  return { dA, dB, sA, sB, demand, supply, solve, eq, minW, minHired, minWilling, minSurplus, minLost, tax, taxed, firmPays, train, trained, bias, biased };
})();

/* ══ MON · a monopsony labour market (the model is 3.3.3 · 7; the floor is 3.3.5 · 2b) ═ */

export const MON = (() => {
  const s0 = 2, s1 = 0.5;               // supply: W = 2 + 0.5L  (L in thousands)
  const v0 = 20, v1 = 0.5;              // value of the extra worker's output: W = 20 − 0.5L
  const supplyW = (L) => s0 + s1 * L;
  const mclW = (L) => s0 + 2 * s1 * L;
  const valueW = (L) => v0 - v1 * L;
  const monoL = (v0 - s0) / (2 * s1 + v1);                           // 12
  const mono = { L: monoL, W: supplyW(monoL) };                      // 12, $8
  const compL = (v0 - s0) / (s1 + v1);                               // 18
  const comp = { L: compL, W: supplyW(compL) };                      // 18, $11
  const floor = 10;
  /* with a floor, the firm pays the floor to everyone up to the quantity supply offers at it */
  const offered = (floor - s0) / s1;                                 // 16
  const wanted = (v0 - floor) / v1;                                  // 20
  const withFloor = { L: Math.min(offered, wanted), W: floor };      // 16, $10
  /* the floor above which employment falls below the unregulated monopsony's: the value of the monopsony's last worker */
  const highFloor = valueW(monoL);                                   // $14
  return { s0, s1, v0, v1, supplyW, mclW, valueW, mono, comp, floor, offered, wanted, withFloor, highFloor };
})();

/* ══ TOP · a maximum wage: senior managers, in hundreds ═════════════════════ */

export const TOP = (() => {
  const dA = 40, dB = 0.2;              // L = 40 − 0.2W (hundreds); W in $ an hour
  const sA = -8, sB = 0.2;              // L = 0.2W − 8
  const demand = (W) => dA - dB * W;
  const supply = (W) => sA + sB * W;
  const W = round2((dA - sA) / (dB + sB));                           // $120
  const eq = { W, L: round2(demand(W)) };                            // 16
  const cap = 100;
  const willing = round2(supply(cap));                               // 12
  const wanted = round2(demand(cap));                                // 20
  return { dA, dB, sA, sB, demand, supply, eq, cap, willing, wanted, shortage: round2(wanted - willing) };
})();

/* ══ The specification's own lists, in its words (`econ_spec.txt:1491-1535`) ══ */

export const MONOPOLY_MEASURES = ['price regulation', 'profit regulation', 'quality standards', 'performance targets', 'referral to regulatory authorities', 'legislation to control mergers and takeovers'];
export const COMPETITION_MEASURES = ['tax incentives and grants to promote small businesses and FDI', 'deregulation', 'privatisation', 'competitive tendering for public sector contracts', 'trade liberalisation'];
export const PROTECTION_MEASURES = ['local sourcing of raw materials and components', 'barriers to entry of foreign firms', 'restrictions on the monopsony power of firms', 'nationalisation'];
export const IMPACTS = ['price', 'profit', 'efficiency', 'quality', 'choice'];
export const LIMITS = ['regulatory capture', 'asymmetric information', 'inadequate resources', 'lack of regulatory power'];
export const LABOUR_MEASURES = ['maximum wage controls', 'minimum wage controls', 'national insurance contributions', 'corporation tax', 'geographical and occupational immobility', 'discrimination and exploitation'];

/*
 * BANNED, each with the reason and the line that settles it. The runner A/Bs every one against a
 * string it must catch and one it must not, and re-measures each "0 hits" claim against the document.
 */
export const BANNED_ELSEWHERE = [
  [/\bRPI\b|\bretail price index\b/i, 'RPI is a UK-only index (CONTENT-GATE checklist 3: "RPI … removed, with the international equivalent in its place (CPI…)"); the price cap is CPI − X here (topFix-05)'],
  [/\bCMA\b|\bCompetition and Markets Authority\b|\bOf(?:gem|wat|com)\b/, 'UK-only regulators as the frame (locale.institution; topFix-05). Competition authorities are named from the candidates\' own markets'],
  [/\bLaffer\b|\bpoverty trap\b/i, 'the Laffer curve and the poverty trap are not 3.3.5 content (quiz-01, quiz-03): the Laffer curve is Unit 4 fiscal policy (econ_spec.txt:1847) and the poverty trap is not in econ_spec.txt at all'],
  [/\bdeadweight\b/i, '"deadweight" — the specification says "welfare loss" (terms.off-spec)'],
  [/\bprisoner'?s'? dilemma\b|\bgame theory\b/i, 'game theory is 3.3.3 · 5c (market-structures-contestability); the live leniency paragraph leaned on it'],
  [/\bnational minimum wage\b|\bNational Living Wage\b/i, 'the UK\'s named wage floors (locale.institution lists "National Minimum Wage"); this section says "a minimum wage" or "a legal minimum wage"'],
  [/\b25[- ]mark\b|\b(10|12|16|18)[- ]mark\b/i, 'a tariff IAL Economics does not have — Appendix 6 gives 2, 4, 6, 8, 14 and 20 only (accuracy-01)'],
  [/\bAssess\b|\bOutline\b/, 'command words IAL Economics does not have. Appendix 6 (econ_spec.txt:2696-2745). The live set carries "Assess (10)" and "Outline (4)" (topFix-05)'],
  [/\bhuman capital\b/i, '"human capital" is Unit 4 vocabulary (econ_spec.txt:1765, :1953)'],
];

/*
 * THE NEIGHBOURS THIS SECTION LEANS ON: every sentence that uses one carries its topic number, and a
 * budget stops a pointer turning into a second treatment.
 */
export const POINTER_ONLY = [
  { re: /\bmarginal cost of labou?r\b|\bMCL\b/i, why: 'the monopsony construction is 3.3.3 · 7 (econ_spec.txt:1432-1434), market-structures-contestability; the floor that changes it is ours', max: 4, mustCite: /3\.3\.3/ },
  { re: /\bcontestable market\b|\bsunk costs?\b/i, why: 'contestable markets and sunk costs are 3.3.3 · 8 (econ_spec.txt:1435-1440)', max: 3, mustCite: /3\.3\.3/ },
  { re: /\bcauses of (?:geographical|occupational)?\s*immobility\b|\bhousing costs?\b|\bfamily ties\b/i, why: 'the causes of immobility are 3.3.4 · 4 (econ_spec.txt:1475-1479), labour-markets; this section owns the measures', max: 3, mustCite: /3\.3\.4/ },
];

/* TEACHING TERMS: the vocabulary the teaching-vocabulary check works over. */
export const TEACHING_TERMS = [
  'monopoly', 'natural monopoly', 'regulator', 'price cap', 'rate of return', 'quality standard', 'performance target',
  'competition authority', 'merger', 'takeover', 'small business', 'grant', 'tax incentive', 'foreign direct investment',
  'deregulation', 'privatisation', 'tendering', 'trade liberalisation', 'local sourcing', 'employment legislation',
  'exploitation', 'barriers to entry', 'monopsony', 'nationalisation', 'price', 'profit', 'efficiency', 'quality',
  'choice', 'regulatory capture', 'asymmetric information', 'resources', 'power', 'minimum wage', 'maximum wage',
  'national insurance', 'corporation tax', 'immobility', 'discrimination', 'labour market', 'wage', 'employment',
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

/** The terms a subsection actually teaches with. */
export function teachingVocabulary(sec) {
  const hay = [sec.title, sec.keyIdea, ...(sec.body || []).flatMap((b) => [b.text, ...(b.items || []), ...(b.steps || []).map((x) => (typeof x === 'object' ? `${x.title} ${x.subtitle || ''}` : x))])].join(' ').toLowerCase();
  return TEACHING_TERMS.filter((t) => hay.includes(t));
}
