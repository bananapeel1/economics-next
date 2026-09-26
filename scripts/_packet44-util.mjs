/**
 * PACKET 44 — aggregate-supply helpers: the id scheme, the formatters, the specification's own
 * lists, and the ONE ECONOMY every figure in the section is read off.
 *
 * IAL Economics 2.3.3, Unit 2 (WEC12), `audit/raw/econ_spec.txt:1026-1049`. Three sub-topics —
 * The characteristics of AS · Short-run AS (SRAS) · Long-run AS (LRAS) — and **14 substantive
 * leaves** under 17 oracle rows (`audit/raw/spec-items.json`, topic "2.3.3": 14 `leaf` rows and
 * three `requirement` rows, 2a, 3a and 3b, which only group the bullets beneath them).
 *
 * ════ THE SECTION'S SCOPE IS ITS SPECIFICATION NUMBER, AND THAT IS SETTLED ═════
 *
 * The live section is five blocks, and two and a half of them teach other topics' leaves:
 * "Macroeconomic Equilibrium" and "AD/AS Analysis of Macroeconomic Events" are 2.3.4 · 3
 * ("Equilibrium level of real output", `:1074-1077`), which `national-income` owns and packet 37
 * built at 19 of 19 leaves; and the `output-gaps` subsection is 2.3.5 · 4 (`:1121-1125`), which
 * `economic-growth` owns. `audit/SPEC-OWNERSHIP.md`'s rule is one line — "a topic is taught in the
 * section whose specification number contains it, and nowhere else" — and it has been applied to
 * six topics already. This packet adds the row and applies it: the rebuild is 2.3.3 and only
 * 2.3.3, and the two neighbours are POINTED AT, with a budget, rather than taught.
 *
 * What the live section called the "self-correcting mechanism" is NOT removed with them, because
 * it is not a neighbour's leaf. It is the classical explanation of WHY the classical long-run AS
 * curve is vertical — 3a's second bullet (`:1042`) — and it is taught there, once, on one diagram
 * carrying SRAS and LRAS together. That is `topFix-03`'s diagram and `specGap-07`'s question.
 *
 * ════ THE NUMBERS THE LEDGER CITES ═══════════════════════════════════════
 *
 * `structure-08` says this section "covers IAL 2.3.1-2.3.3 … plus 2.4.3 … plus 2.5.2". Neither
 * 2.4.3 nor 2.5.2 exists in `econ_spec.txt` (every Unit 2 topic is 2.3.x), and 2.3.1 is
 * "Measures of economic performance" (`:884`), which this section has never taught. `specGap-05`
 * cites "2.3.1" for a leaf that is 2.3.3 · 1c (`:1034-1035`); `specGap-06` cites "2.5.2" for
 * 2.3.5 · 4d; `specGap-07` cites "2.4.3". The runner asserts each real line by number and each
 * cited number ABSENT from the document, so a finding is refused on the document, not on a comment.
 *
 * ════ THE SPINE · capacity is workers times output per worker ════════════
 *
 * Nothing below is typed in except the labour force, output per worker, the SRAS slope, the cost
 * shares and the size of each change. Every capacity figure, every SRAS position and every
 * classical-adjustment price level is computed, and the runner asserts the properties the
 * teaching rests on:
 *
 *     capacity  = labour force × output per worker = 40m × $20,000 = $800bn     (3b)
 *     labour force = working-age population × participation = 50m × 80% = 40m   (3b-5)
 *     a cost shock: % rise in unit cost = cost share × % rise in that input price (2a)
 *     SRAS:  Y = c + 5·P, through ($800bn, 100)
 *
 * The SRAS shifters all move the curve by the SAME rule — a rise in unit costs of k% means firms
 * need a price level k% higher to supply the same output — so three shifters are one mechanism
 * with three different causes, and a student who has the mechanism has all three. The LRAS
 * shifters all move capacity through ONE of the two terms in the product — how many work, or how
 * much each produces — which is the whole of 3b in one line and the reason the section is built on
 * a product rather than on a list.
 *
 * Money is in dollars, billions. One minus sign, U+2212, emitted by `money` itself (packet 18).
 */
import { createHash } from 'node:crypto';

export const SECTION = 'aggregate-supply';

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
/** Billions — the unit every output figure in this section is in. */
export const bn = (n) => `${money(n)}bn`;
/** Millions of people. */
export const mn = (n) => `${round1(n)} million`;
export const pct = (n) => `${Number.isInteger(round2(n)) ? round2(n) : round1(n)}%`;
/** An index number, which is what the price level is measured in on an AS diagram. */
export const idx = (n) => String(round1(n));

/* ══ THE ECONOMY ══════════════════════════════════════════════════════════ */

export const ECON = (() => {
  const country = 'Tellmar';           // a mid-sized economy; no real country, no year
  const what = 'a mid-sized economy that imports almost all of its oil and exports electronics';

  /* ── 3b · capacity is a product of two terms ─────────────────────────────── */
  const workingAge = 50;               // million people of working age
  const participation = 0.8;           // share of them in, or looking for, work
  const labour = round2(workingAge * participation);                 // 40 million
  const perWorker = 20000;             // dollars of output per worker per year
  const capacity = round0((labour * 1e6 * perWorker) / 1e9);         // $800bn

  /* ── 1a-1c · the SRAS curve and a movement along it ──────────────────────── */
  const P0 = 100;                      // the price level, an index
  const srasSlope = 5;                 // $bn of extra output per point the price level rises
  const srasIntercept = capacity - srasSlope * P0;                   // 300: Y = 300 + 5P
  const srasAt = (p, shiftBn = 0) => srasIntercept + shiftBn + srasSlope * p;
  const P1 = 104;                      // a rise in the price level, costs unchanged
  const Ymove = srasAt(P1);            // 820: a movement ALONG the curve

  /* ── 2a · three causes, one mechanism: unit cost up k% → SRAS up k points ── */
  /* the vertical shift is the % rise in unit costs, applied to the price level index */
  const costShock = (share, rise) => round2(share * rise);           // % rise in unit costs
  const leftBy = (costPct) => round0(srasSlope * (P0 * costPct) / 100);
  /* 2a-1: raw materials and energy */
  const energyShare = 0.25, energyRise = 20;                          // a quarter of costs, up 20%
  const energyCost = costShock(energyShare, energyRise);              // 5%
  const energyLeft = leftBy(energyCost);                              // 25
  const Yenergy = srasAt(P0, -energyLeft);                            // 775 at the old price level
  /* 2a-2: exchange rates — imported inputs cost 10% more in local currency after a depreciation */
  const importShare = 0.3, importRise = 10;
  const fxCost = costShock(importShare, importRise);                  // 3%
  const fxLeft = leftBy(fxCost);                                      // 15
  const Yfx = srasAt(P0, -fxLeft);                                    // 785
  const Yappreciate = srasAt(P0, fxLeft);                             // 815: the reverse
  /* 2a-3: tax rates — a production tax rise adding 2% to what each unit costs to supply */
  const taxCost = 2;
  const taxLeft = leftBy(taxCost);                                    // 10
  const Ytax = srasAt(P0, -taxLeft);                                  // 790

  /* ── 3a · the classical adjustment, on ONE diagram with SRAS and LRAS ────── */
  /*
   * AD is 2.3.2's and is used here only as the thing that moves. AD: Y = 1300 − 5P passes through
   * the starting point (800, 100), where AD, SRAS and the classical LRAS all meet. AD falls by 60.
   *   short run:  1240 − 5P = 300 + 5P  →  P 94, Y 770   (output below capacity)
   *   long run:   costs fall until SRAS meets AD₁ at capacity: 1240 − 5P = 800  →  P 88
   * so SRAS has shifted right by exactly the fall in AD, and output is back where it started.
   */
  const adSlope = 5;
  const adIntercept = capacity + adSlope * P0;                        // 1300
  const adFall = 60;
  const Psr = round1((adIntercept - adFall - srasIntercept) / (adSlope + srasSlope));   // 94
  const Ysr = round0(srasAt(Psr));                                    // 770
  const YsrViaAd = round0(adIntercept - adFall - adSlope * Psr);      // 770, the other curve
  const Plr = round1((adIntercept - adFall - capacity) / adSlope);    // 88
  const srasRecovery = round0(capacity - srasAt(Plr));                // 60: how far SRAS moves right
  const Ylr = round0(srasAt(Plr, srasRecovery));                      // 800, back on LRAS

  /* ── 3a · the Keynesian shape, three ranges ──────────────────────────────── */
  const kFlatUntil = 640;              // below this, idle resources: the curve is horizontal
  const kFlatP = 90;                   // the price level along the horizontal range

  /* ── 3b · the LRAS shifters, each through ONE term of the product ────────── */
  const techRise = 5;                                                 // % rise in output per worker
  const perWorkerTech = round0(perWorker * (1 + techRise / 100));     // 21,000
  const capTech = round0((labour * 1e6 * perWorkerTech) / 1e9);       // 840
  /* productivity from more machinery per worker: output per worker up 3% */
  const prodRise = 3;
  const perWorkerProd = round0(perWorker * (1 + prodRise / 100));     // 20,600
  const capProd = round0((labour * 1e6 * perWorkerProd) / 1e9);       // 824
  /* education and skills: a quarter of the labour force trained, each producing 8% more */
  const trained = 10, skillRise = 8;
  const capSkills = round0(capacity + (trained * 1e6 * perWorker * skillRise / 100) / 1e9);  // 816
  /* demography: the working-age population shrinks by a million as the population ages */
  const ageingLoss = 1;
  const labourAgeing = round2((workingAge - ageingLoss) * participation);                   // 39.2
  const capAgeing = round0((labourAgeing * 1e6 * perWorker) / 1e9);                         // 784
  /* participation: 80% → 82% of the same working-age population */
  const participation2 = 0.82;
  const labourParticipation = round2(workingAge * participation2);                          // 41
  const capParticipation = round0((labourParticipation * 1e6 * perWorker) / 1e9);           // 820
  /* net migration: a net inflow of 1.5 million people of working age, all in the labour force */
  const netMigrants = 1.5;
  const capMigration = round0(((labour + netMigrants) * 1e6 * perWorker) / 1e9);            // 830

  return {
    country, what,
    workingAge, participation, labour, perWorker, capacity,
    P0, srasSlope, srasIntercept, srasAt, P1, Ymove,
    energyShare, energyRise, energyCost, energyLeft, Yenergy,
    importShare, importRise, fxCost, fxLeft, Yfx, Yappreciate,
    taxCost, taxLeft, Ytax,
    adSlope, adIntercept, adFall, Psr, Ysr, YsrViaAd, Plr, srasRecovery, Ylr,
    kFlatUntil, kFlatP,
    techRise, perWorkerTech, capTech, prodRise, perWorkerProd, capProd, trained, skillRise, capSkills,
    ageingLoss, labourAgeing, capAgeing, participation2, labourParticipation, capParticipation,
    netMigrants, capMigration,
  };
})();

/* ══ The specification's own lists ════════════════════════════════════════ */

/** 2 · a (`:1036-1039`): the three SRAS shifters, in the specification's own order and words. */
export const SRAS_FACTORS = ['costs of raw materials and energy', 'exchange rates', 'tax rates'];

/** 3 · b (`:1043-1049`): the six LRAS shifters, in the specification's own order and words. */
export const LRAS_FACTORS = [
  'the state of technology', 'productivity', 'education and skills',
  'government regulations and tax', 'demography and net migration', 'competition policy',
];

/*
 * BANNED, BECAUSE ANOTHER TOPIC OWNS IT OR BECAUSE THE SPECIFICATION DOES NOT USE THE WORD. Each
 * entry cites the line that settles it. The runner A/Bs every one against a string it must catch
 * and a string it must not.
 */
export const BANNED_ELSEWHERE = [
  [/\bstagflation\b/i, '"stagflation" — 0 hits in econ_spec.txt. The live section taught it twice with near-identical flows (structure-05), and what it names — a leftward SRAS shift raising the price level and lowering output — is taught here in the specification\'s own terms'],
  [/\bfull employment\b|\bnatural rate\b|\bNAIRU\b/i, '"full employment", "natural rate", "NAIRU" — each 0 hits in econ_spec.txt. What the LRAS curve measures is taught here as the economy\'s productive capacity — "the maximum productive potential of an economy" is the specification\'s own phrase (:529) — and potential growth is 2.3.5\'s (:1099)'],
  [/\bPhillips curve\b/i, 'the Phillips curve — 2.3.6 · 2a (econ_spec.txt:1143)'],
  [/\bcrowding out\b/i, 'crowding out — 4.3.5 (econ_spec.txt:1838), role-state-macroeconomy'],
  [/\bprivatis\w*|\bderegulation\b|\bregional policy\b|\bwelfare payments?\b|\bstart-ups?\b/i, 'the INSTRUMENTS of supply-side policy — 2.3.6 · 3b-3c (econ_spec.txt:1152-1164), macroeconomic-objectives-policies, packet 38. 3b names regulation, tax and competition policy as FACTORS; which policy to choose and how well it works is 2.3.6'],
  [/\bperfect competition\b|\bmonopolistic competition\b|\bconcentration ratio\b|\beconomies of scale\b/i, 'Unit 3 market-structure vocabulary (terms.later-unit) — 3.3.x, which a Unit 2 student has not met'],
  [/\bAssess\b|\bOutline\b/, 'command words IAL Economics does not have. Appendix 6 (econ_spec.txt:2696-2745) is the whole taxonomy: Define 2, Calculate 2 or 4, Draw 4, Explain 4, Analyse 6, Examine 8, Discuss 14, Evaluate 20. The live set carries "Assess (10)" and "Outline (4)"; both are removed'],
];

/*
 * THE NEIGHBOURS THAT MAY BE POINTED AT AND MAY NOT BE TAUGHT. Each carries the number of mentions
 * it is allowed; going over is a finding rather than a judgement call.
 */
export const POINTER_ONLY = [
  { re: /\boutput gaps?\b/i, why: 'output gaps are 2.3.5 · 4 (econ_spec.txt:1121-1125), economic-growth — one pointer, no teaching (structure-08, specGap-06)', max: 1, mustCite: /2\.3\.5/ },
  { re: /\bmultiplier\b/i, why: 'the multiplier is 2.3.4 · 4 (econ_spec.txt:1078-1085), national-income (D013)', max: 1, mustCite: /2\.3\.4/ },
  { re: /\bconsumer confidence\b|\bbusiness confidence\b|\bnet exports?\b|\bwealth effects?\b/i, why: 'what moves AD is 2.3.2 (econ_spec.txt:980-1020), aggregate-demand', max: 2, mustCite: /2\.3\.2/ },
  { re: /\bequilibrium (?:level of )?real (?:national )?output\b|\bequilibrium national output\b/i, why: 'equilibrium real output and what moves it are 2.3.4 · 3 (econ_spec.txt:1074-1077), national-income, packet 37 (structure-08, topFix-05)', max: 2, mustCite: /2\.3\.4/ },
];

/*
 * TEACHING TERMS: the vocabulary the answer-recoverable check works over, so that a recall cannot
 * be answered by scrolling up to the subsection that set it.
 */
export const TEACHING_TERMS = [
  'aggregate supply', 'price level', 'real output', 'real national output', 'as curve',
  'short-run aggregate supply', 'long-run aggregate supply', 'sras', 'lras',
  'movement along', 'shift', 'unit cost', 'raw materials', 'energy', 'exchange rate',
  'depreciation', 'appreciation', 'tax', 'capacity', 'productive capacity',
  'keynesian', 'classical', 'technology', 'productivity', 'education', 'skills',
  'regulation', 'demography', 'net migration', 'labour force', 'participation',
  'competition policy', 'competition',
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
  const hay = [sec.title, sec.keyIdea, ...(sec.body || []).flatMap((b) => [b.text, ...(b.items || []), ...(b.steps || []).map((x) => (typeof x === 'object' ? `${x.title} ${x.subtitle || ''}` : x))])].join(' ').toLowerCase();
  return TEACHING_TERMS.filter((t) => hay.includes(t));
}
