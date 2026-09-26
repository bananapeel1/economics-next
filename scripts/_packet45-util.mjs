/**
 * PACKET 45 — labour-markets helpers: the id scheme, the formatters, the specification's own lists,
 * and the ONE LABOUR MARKET every figure in the section is read off.
 *
 * IAL Economics 3.3.4, Unit 3 (WEC13), `audit/raw/econ_spec.txt:1447-1479`. Four numbered
 * requirements — the demand for labour · the supply of labour · the determination of wage rates in
 * competitive and non-competitive markets · market failure in the labour market — and **17
 * substantive leaves** under 19 oracle rows (`audit/raw/spec-items.json`, topic "3.3.4": 17 `leaf`
 * rows and two `requirement` rows, 1a and 2c, which only group the bullets beneath them).
 *
 * ════ THE SECTION'S SCOPE IS ITS SPECIFICATION NUMBER ═════════════════════════
 *
 * The live section teaches three things 3.3.4 does not contain, and each has an owner that already
 * teaches it (`audit/SPEC-OWNERSHIP.md`, rule of packet 13):
 *
 *   - MONOPSONY is 3.3.3 · 7a-7b (`econ_spec.txt:1432-1434`), `market-structures-contestability`,
 *     packet 29 — a single-buyer subsection with the marginal-cost-of-labour construction, the
 *     monopsony diagram (wage read off supply, `_packet29-diagrams.mjs:772`) and the minimum wage
 *     that raises both wage and employment. The live labour-markets copy is the one whose SVGs
 *     `topFix-04` says are mis-drawn.
 *   - THE MINIMUM WAGE, MAXIMUM WAGES AND MEASURES AGAINST IMMOBILITY are 3.3.5 · 2b (`:1526-1535`),
 *     "Government intervention in labour markets", `government-intervention-firms`, packet 48.
 *   - DISCRIMINATION appears in the specification only at 3.3.5 · 2b ("measures to reduce
 *     discrimination and exploitation", `:1535`). It is not a 3.3.4 leaf.
 *
 * Each is POINTED AT with a budget the runner counts (`POINTER_ONLY`), and every pointer carries
 * its topic number. What 3.3.4 · 3 calls "non-competitive markets" is taught here through its own
 * leaves: trade unions (2c) and wage setting in the public sector (3c).
 *
 * ════ VOCABULARY THE SPECIFICATION DOES NOT USE ═══════════════════════════════
 *
 * "Backward-bending", "income effect", "substitution effect", "leisure", "wage differential",
 * "compensating differential", "bilateral monopoly" and "marginal revenue product" are each 0 hits
 * in `econ_spec.txt` (the runner re-measures every one). DECISIONS, packet 17: where the
 * specification supplies no vocabulary for a leaf, teach the mechanism in its own words and name the
 * standard term as an aside only if a student would otherwise be lost. The first six are removed.
 * The marginal revenue product is kept as a NAMED ASIDE, once per surface that needs it: it is the
 * mechanism behind two of the specification's own bullets (1a "productivity of labour" and "price
 * of the product"), it is the label on the demand curve in every textbook, and
 * `market-structures-contestability` already uses the term. The specification's own phrase,
 * "diminishing marginal productivity" (`:1305`), carries the slope.
 *
 * ════ THE SPINE · one occupation, one firm, one market ═══════════════════════
 *
 * Tellmar's garment machinists. Nothing below is typed in except the curves' intercepts and slopes
 * and the size of each change; every equilibrium is solved, and the runner re-derives each one off
 * BOTH curves (packet 34's two-sources rule):
 *
 *     the firm:    the Lth machinist adds (10 − L) shirts an hour; a shirt sells for $3
 *                  so the value of what the Lth adds = 3 × (10 − L) = 30 − 3L dollars an hour
 *     the market:  demand  L = 60 − 2W   (thousand machinists, W in dollars an hour)
 *                  supply  L = 4W − 12
 *                  equilibrium W = $12, L = 36,000; the firm, a wage-taker at $12, hires 6
 *
 * Money is dollars; one minus sign, U+2212, emitted by `money` itself (packet 18).
 */
import { createHash } from 'node:crypto';

export const SECTION = 'labour-markets';

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
/** Thousands of workers, printed in full: 36 → "36,000". */
export const k = (n) => (round0(n * 1000)).toLocaleString('en-GB');
export const pct = (n) => `${Number.isInteger(round2(n)) ? round2(n) : round1(n)}%`;

/* ══ THE LABOUR MARKET ════════════════════════════════════════════════════ */

export const LAB = (() => {
  const country = 'Tellmar';
  const job = 'garment machinists';
  const firm = 'Arun Shirts';            // one workshop among hundreds

  /* ── 1a · the firm: diminishing marginal productivity, the product price ── */
  const price = 3;                        // dollars a shirt
  const mpp0 = 10;                        // the Lth machinist adds (mpp0 − L) shirts an hour
  const mpp = (L, base = mpp0) => base - L;
  const value = (L, p = price, base = mpp0) => p * mpp(L, base);   // what the Lth adds, in dollars
  /** the firm hires every worker whose output is worth at least the wage: largest L with value ≥ W */
  const hires = (W, p = price, base = mpp0) => { let L = 0; while (value(L + 1, p, base) >= W) L += 1; return L; };

  /* ── 3a · the market: linear demand and supply, thousands of machinists ─── */
  const dA = 60, dB = 2;                  // demand  L = dA − dB·W
  const sA = -12, sB = 4;                 // supply  L = sA + sB·W
  const demand = (W, shift = 0) => dA + shift - dB * W;
  const supply = (W, shift = 0) => sA + shift + sB * W;
  const solve = (dShift = 0, sShift = 0) => {
    const W = round2((dA + dShift - sA - sShift) / (dB + sB));
    return { W, L: round2(demand(W, dShift)), Ls: round2(supply(W, sShift)) };
  };
  const eq = solve();                                                  // $12, 36

  /* the firm is a wage-taker at the market wage */
  const firmL = hires(eq.W);                                           // 6
  const firmNext = value(firmL + 1);                                   // the 7th adds $9 < $12

  /* 1a-2 and 1a-3: productivity and the product price SHIFT the firm's demand */
  const price2 = 4;
  const firmLPrice = hires(eq.W, price2);                              // 7
  const mppTrained = 11;                                               // training: each adds one more shirt
  const firmLTrained = hires(eq.W, price, mppTrained);                 // 7
  /* a change in the wage MOVES along it */
  const W2 = 15;
  const firmLW2 = hires(W2);                                           // 5

  /* 1a-4 · the wage relative to the price of capital */
  const machineCost = 30;                 // an automatic cutter, dollars an hour, does the work of 3
  const machineDoes = 3;
  const breakEvenW = round2(machineCost / machineDoes);                // $10
  const lowW = 9;

  /* 1b · the elasticity of demand for labour, on the market curve */
  const pctW = round2(((W2 - eq.W) / eq.W) * 100);                     // +25%
  const Lat15 = demand(W2);                                            // 30
  const pctL = round2(((Lat15 - eq.L) / eq.L) * 100);                  // −16.67%
  const edl = round2(pctL / pctW);                                     // −0.67

  /* 3b · shifts: demand +12 (export orders), supply +12 (net migration), supply −6 (tax/benefits),
   *       supply −12 (a licence requirement) */
  const dUp = 12, sUp = 12, sTax = -6, sReg = -12;
  const eqD = solve(dUp, 0);                                           // $14, 44
  const eqS = solve(0, sUp);                                           // $10, 40
  const eqTax = solve(0, sTax);                                        // $13, 34
  const eqReg = solve(0, sReg);                                        // $14, 32

  /* 2c-6 · trade unions: a negotiated wage above equilibrium, and a restriction on entry */
  const unionW = 15;
  const unionJobs = demand(unionW);                                    // 30
  const unionWilling = supply(unionW);                                 // 48
  const unionExcess = unionWilling - unionJobs;                        // 18
  const unionLost = eq.L - unionJobs;                                  // 6
  const sEntry = -18;
  const eqEntry = solve(0, sEntry);                                    // $15, 30 — the same outcome

  /* 2d · elasticity of supply: the SAME rise in demand (+12) against two supply curves through the
   * same starting point ($12, 36). Elastic: L = 4W − 12 (the machinists' own). Inelastic: L = W + 24,
   * an occupation whose training takes years, so few extra workers appear when pay rises. */
  const inel = (() => {
    const sA2 = 24, sB2 = 1;
    const at = (dShift) => { const W = round2((dA + dShift - sA2) / (dB + sB2)); return { W, L: round2(demand(W, dShift)) }; };
    const start = at(0);                                               // $12, 36 — the same point
    const after = at(dUp);                                             // $16, 40
    return { sA2, sB2, start, after };
  })();

  /* 3c · public-sector pay: nurses, pay set by a commission */
  const nurse = (() => {
    const dA3 = 50, dB3 = 1, sA3 = -22, sB3 = 2;
    const W = round2((dA3 - sA3) / (dB3 + sB3));                       // $24
    const L = round2(dA3 - dB3 * W);                                   // 26
    const set = 21;
    const wanted = dA3 - dB3 * set;                                    // 29
    const willing = sA3 + sB3 * set;                                   // 20
    return { dA3, dB3, sA3, sB3, W, L, set, wanted, willing, vacancies: wanted - willing };
  })();

  /* 4a · geographical immobility: demand falls by 12 in the North, rises by 12 in the South */
  const north = solve(-12, 0);                                         // $10, 28
  const south = solve(12, 0);                                          // $14, 44
  const northJobless = eq.L - demand(eq.W, -12);                       // at a sticky $12: 12 without work
  const southVacant = demand(eq.W, 12) - eq.L;                         // and 12 vacancies
  const regionalGap = round2(south.W - north.W);                       // $4

  return {
    country, job, firm,
    price, mpp0, mpp, value, hires,
    dA, dB, sA, sB, demand, supply, solve, eq,
    firmL, firmNext, price2, firmLPrice, mppTrained, firmLTrained, W2, firmLW2,
    machineCost, machineDoes, breakEvenW, lowW,
    pctW, Lat15, pctL, edl,
    dUp, sUp, sTax, sReg, eqD, eqS, eqTax, eqReg,
    unionW, unionJobs, unionWilling, unionExcess, unionLost, sEntry, eqEntry,
    inel, nurse, north, south, northJobless, southVacant, regionalGap,
  };
})();

/* ══ The specification's own lists ════════════════════════════════════════ */

/** 1 · a (`:1452-1456`): the four factors that influence the demand for labour, in the spec's words. */
export const DEMAND_FACTORS = [
  'demand for the final product', 'productivity of labour', 'price of the product', 'wage rate relative to price of capital',
];

/** 2 · c (`:1459-1465`): the six factors that influence the supply of labour, in the spec's words. */
export const SUPPLY_FACTORS = [
  'size of population', 'net migration', 'income tax rates', 'level of welfare benefits', 'government regulations', 'trade unions',
];

/*
 * BANNED, BECAUSE ANOTHER TOPIC OWNS IT OR BECAUSE THE SPECIFICATION DOES NOT USE THE WORD. Each
 * entry cites the line that settles it; the runner A/Bs every one against a string it must catch
 * and one it must not, and re-measures each "0 hits" claim against the document.
 */
export const BANNED_ELSEWHERE = [
  [/\bbackward[- ]bending\b|\bincome effect\b|\bsubstitution effect\b|\bleisure\b/i, 'the backward-bending individual supply curve and the income/substitution effects — 0 hits in econ_spec.txt (DECISIONS, packet 17: "not IAL Economics vocabulary"). 2c asks for the supply of labour to an OCCUPATION and lists six factors; none is the individual\'s choice of hours. This is the structure-10 contradiction removed at its root'],
  [/\bMCL\b|\bmarginal cost of labou?r\b|\bexploit\w*/i, 'the monopsony construction — 3.3.3 · 7a-7b (econ_spec.txt:1432-1434), market-structures-contestability, packet 29. The live section\'s copy is the one topFix-04 says is mis-drawn'],
  [/\bbilateral monopoly\b/i, '"bilateral monopoly" — 0 hits in econ_spec.txt, and it presupposes the monopsony model this section does not teach'],
  [/\bmaximum wages?\b|\bwage cap\b/i, 'maximum wage controls — 3.3.5 · 2b (econ_spec.txt:1529), government-intervention-firms'],
  [/\bdiscriminat\w*/i, 'discrimination — econ_spec.txt mentions it in labour only at 3.3.5 · 2b (:1535), "measures to reduce discrimination and exploitation"; it is not a 3.3.4 leaf (specGap-07)'],
  [/\bhuman capital\b|\bcompensating differentials?\b|\bwage differentials?\b/i, '"human capital" is Unit 4 vocabulary (econ_spec.txt:1765, :1953); "compensating differential" and "wage differential" are 0 hits. Why pay differs between occupations is taught here in the specification\'s own terms: demand, supply and their elasticities'],
  [/\bAssess\b|\bOutline\b/, 'command words IAL Economics does not have. Appendix 6 (econ_spec.txt:2696-2745): Define 2, Calculate 2 or 4, Draw 4, Explain 4, Analyse 6, Examine 8, Discuss 14, Evaluate 20. The live set carries "Assess (10)" and "Outline (4)" (topFix-05)'],
];

/*
 * THE NEIGHBOURS THAT MAY BE POINTED AT AND MAY NOT BE TAUGHT. Each carries the number of mentions
 * it is allowed and the topic number every mention must carry.
 */
export const POINTER_ONLY = [
  { re: /\bmonopsony\b/i, why: 'monopsony is 3.3.3 · 7 (econ_spec.txt:1432-1434), market-structures-contestability', max: 2, mustCite: /3\.3\.3/ },
  { re: /\bminimum wages?\b/i, why: 'minimum wage controls are 3.3.5 · 2b (econ_spec.txt:1530), government-intervention-firms (specGap-03)', max: 2, mustCite: /3\.3\.5/ },
  { re: /\bmeasures to reduce\b|\brelocation (?:grants?|subsid\w*)\b|\bgovernment (?:can|could) (?:reduce|tackle)\b/i, why: 'measures to reduce immobility are 3.3.5 · 2b (econ_spec.txt:1533-1534), government-intervention-firms (specGap-04)', max: 2, mustCite: /3\.3\.5/ },
];

/*
 * TEACHING TERMS: the vocabulary the answer-recoverable check works over.
 */
export const TEACHING_TERMS = [
  'derived demand', 'demand for labour', 'supply of labour', 'productivity', 'price of the product',
  'price of capital', 'capital', 'wage', 'elasticity', 'elastic', 'inelastic', 'population',
  'net migration', 'income tax', 'welfare benefits', 'regulation', 'trade union', 'equilibrium',
  'shift', 'movement along', 'public sector', 'state-owned', 'immobility', 'geographical', 'occupational',
  'market failure', 'unemployment', 'vacancies', 'machinists', 'diminishing',
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
