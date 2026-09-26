/**
 * PACKET 50 — managing-change helpers: the id scheme, the formatters, the specification's own
 * lists, and the ONE FIRM every figure in the section is read off.
 *
 * IAL Business 3.3.6, Unit 3 (WBS13), `audit/raw/bus_spec.txt:1255-1271`. The heading reads
 * "3.3.6 Manging change" — the missing "a" is the document's own. Two sub-topics:
 *
 *   1 Key factors in change   a organisational culture · b size of organisation · c time/speed of
 *                             change · d managing resistance to change · e transformative leadership
 *   2 Contingency planning    a identifying key risks through risk assessment: natural disasters,
 *                             IT systems failure, loss of key staff
 *                             b planning for risk mitigation: business continuity, succession planning
 *
 * 12 rows in `audit/raw/spec-items.json`, 10 of them leaves (2a and 2b are `requirement` parents).
 *
 * ════ RULE 1 · THE LEDGER'S NUMBERING IS UK GCE AND IT DOES NOT EXIST HERE ══
 *
 * The ledger cites "3.6.1"-"3.6.3" (and "3.6.3c"). `grep -c "3\.6\.[0-9]" bus_spec.txt` is 0. Every
 * claim was read by its WORDING at `:1255-1271`, and the runner re-measures each one:
 *
 *   Kotter / Schlesinger / Lewin / "force field"      0 hits anywhere in bus_spec.txt
 *   transactional / transformational                    0 hits; the leaf says "Transformative leadership"
 *   scenario / disrupt                                  0 hits
 *   "causes and effects of change"                      NOT a lettered point — it is the Unit 3
 *                                                       DESCRIPTION, `:1055`: "The unit also covers the
 *                                                       causes and effects of change and how businesses
 *                                                       mitigate risk and uncertainty." So specGap-01/02
 *                                                       are built as one chapter's opening context,
 *                                                       grounded on that line, not as leaves.
 *   "costs and benefits of contingency planning"        no such point (no "3.3.6 · 2c" exists); built
 *                                                       as the EVALUATION of 2b — whether a mitigation
 *                                                       plan is worth what it costs — not as a leaf.
 *   the section's own number                            `:1255` reads 3.3.6, so structure-11 (which
 *                                                       says the heading is "3.6") is inverted.
 *
 * ════ WHAT THIS SECTION MAY NOT TEACH, AND WHAT IT MAY ONLY POINT AT ═════════
 *
 *   Handy's power/role/task/person cultures   3.3.4 · 1b (`:1189-1193`), with 1d "difficulties in
 *                                             changing an established culture" (`:1195`) — the
 *                                             `influences-business-decisions` section's
 *   leadership styles (autocratic …)          1.3.4 · 5b (`:748-752`), `managing-people`
 *   continuous improvement (Kaizen)           2.3.4 · 3c (`:1001`), `resource-management`
 *   scenario planning                         0 hits; one sentence, to say contingency planning is
 *                                             something else (topFix-01 "demote to one sentence")
 *
 * ════ THE SPINE · one insurer, and every figure derived ═══════════════════
 *
 *   Harbourline Insurance, Hong Kong. 2,400 staff, 60 branches, seven layers of management.
 *   THE CHANGE (1, and the unit description's causes/effects): a new chief executive moves claims
 *   onto a phone app and closes 24 of the 60 branches (40%).
 *   PRODUCTIVITY (effects): 600 claims handlers deal with 90,000 claims a month (150 each); after
 *   the change 480 deal with 96,000 (200 each) — a rise of a third (33.33%).
 *   JOBS (1d): 120 handler posts go; 70 people retrain as app-support staff, 50 leave (30 retire,
 *   20 take voluntary redundancy).
 *   SPEED (1c): the chief executive's plan is 6 months; the alternative 24 months.
 *   RISK (2a): likelihood × impact, each scored 1-5 — typhoon closing head office 4 × 2 = 8;
 *   claims-system failure 3 × 5 = 15; loss of the chief actuary 3 × 4 = 12. Ranked 15 > 12 > 8.
 *   CONTINUITY (2b): a day with no claims system costs about $250,000. Two years ago the system
 *   was down 8 days ($2m). A standby system restores it within 1 day ($250,000) and costs
 *   $600,000 a year, so one outage it shortens saves $1.75m, net $1.15m in that year.
 *
 * Money: one symbol, `$`. No year, no real company, no UK frame.
 */
import { createHash } from 'node:crypto';

export const SECTION = 'managing-change';

const norm = (s) => String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
export const hash8 = (s) => createHash('sha1').update(norm(s)).digest('hex').slice(0, 8);
export const id = (kind, key) => `${SECTION}:${kind}:${hash8(key)}`;
export const subId = (s) => `${SECTION}:sub:${s}`;

export const round2 = (n) => Math.round(n * 100) / 100;

/* ── formatting: one formatter a kind of figure (packet 18) ────────────────── */
export const MINUS = '−';
const plain = (n) => (Number.isInteger(n)
  ? n.toLocaleString('en-GB')
  : round2(n).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));

/** Money. The ONLY currency symbol this section emits. */
export const usd = (n) => `${n < 0 ? MINUS : ''}$${plain(Math.abs(n))}`;
/** Money in millions: $1.75m. */
export const usdm = (n) => `${n < 0 ? MINUS : ''}$${(round2(Math.abs(n) / 1e6)).toLocaleString('en-GB', { maximumFractionDigits: 2 })}m`;
/** A count of things. */
export const units = (n, noun) => `${plain(n)}${noun ? ` ${noun}` : ''}`;
/** A percentage. */
export const pct = (n) => `${plain(round2(n))}%`;

/* ══ THE FIRM ═══════════════════════════════════════════════════════════════ */

export const FIRM = (() => {
  const name = 'Harbourline';
  const full = 'Harbourline Insurance';
  const home = 'Hong Kong';

  const staff = 2_400;                  // typed
  const branches = 60;                  // typed
  const closing = 24;                   // typed
  const closingPct = (closing / branches) * 100;               // 40
  const layers = 7;                     // typed

  /* effects of change: productivity */
  const handlersBefore = 600;           // typed
  const claimsBefore = 90_000;          // typed, a month
  const handlersAfter = 480;            // typed
  const claimsAfter = 96_000;           // typed, a month
  const perHandlerBefore = claimsBefore / handlersBefore;      // 150
  const perHandlerAfter = claimsAfter / handlersAfter;         // 200
  const productivityRise = ((perHandlerAfter - perHandlerBefore) / perHandlerBefore) * 100;  // 33.33

  /* 1d: the jobs */
  const postsLost = handlersBefore - handlersAfter;            // 120
  const retrained = 70;                 // typed
  const leaving = postsLost - retrained;                       // 50
  const retiring = 30;                  // typed
  const voluntary = leaving - retiring;                        // 20

  /* 1c: speed */
  const fastMonths = 6;                 // typed
  const slowMonths = 24;                // typed
  const actuaryRetiresMonths = 18;      // typed: 2b, the chief actuary's retirement

  /* 2a: risk assessment, likelihood × impact on 1-5 scales */
  const risks = [
    { key: 'typhoon', name: 'Typhoon closes head office', kind: 'natural disaster', likelihood: 4, impact: 2 },
    { key: 'it', name: 'Claims system fails', kind: 'IT systems failure', likelihood: 3, impact: 5 },
    { key: 'staff', name: 'Chief actuary leaves', kind: 'loss of key staff', likelihood: 3, impact: 4 },
  ].map((r) => ({ ...r, score: r.likelihood * r.impact }));
  const ranked = [...risks].sort((a, b) => b.score - a.score);

  /* 2b: business continuity */
  const costPerDay = 250_000;           // typed
  const daysNoPlan = 8;                 // typed
  const daysWithPlan = 1;               // typed
  const outageNoPlan = costPerDay * daysNoPlan;                // 2,000,000
  const outageWithPlan = costPerDay * daysWithPlan;            // 250,000
  const standbyCost = 600_000;          // typed, a year
  const outageSaving = outageNoPlan - outageWithPlan;          // 1,750,000
  const netFirstYear = outageSaving - standbyCost;             // 1,150,000

  return {
    name, full, home, staff, branches, closing, closingPct, layers,
    handlersBefore, claimsBefore, handlersAfter, claimsAfter, perHandlerBefore, perHandlerAfter, productivityRise,
    postsLost, retrained, leaving, retiring, voluntary,
    fastMonths, slowMonths, actuaryRetiresMonths,
    risks, ranked,
    costPerDay, daysNoPlan, daysWithPlan, outageNoPlan, outageWithPlan, standbyCost, outageSaving, netFirstYear,
  };
})();

/* ══ The specification's own lists, in its own order and words ═════════════ */

/** 1 · a-e (`:1259-1264`). */
export const KEY_FACTORS = [
  'organisational culture', 'size of organisation', 'time/speed of change',
  'managing resistance to change', 'transformative leadership',
];
/** 2 · a (`:1265-1268`). */
export const KEY_RISKS = ['natural disasters', 'IT systems failure', 'loss of key staff'];
/** 2 · b (`:1269-1271`). */
export const MITIGATION = ['business continuity', 'succession planning'];

/*
 * BANNED, BECAUSE THE SPECIFICATION DOES NOT CONTAIN IT. Each entry cites the measurement that
 * settles it; the runner A/Bs every one both ways and re-measures the document.
 */
export const BANNED_ELSEWHERE = [
  [/\bKotter\b|\bSchlesinger\b|\beight[- ]step\b|\b8[- ]step\b/i, 'Kotter\'s eight steps and Kotter & Schlesinger — 0 hits in bus_spec.txt (topFix-02, topFix-04, quiz-01, structure-02, structure-04, specGap-03)'],
  [/\bLewin\b|\bforce[- ]field\b|\bdriving forces?\b|\brestraining forces?\b|\bunfreez\w*|\brefreez\w*/i, 'Lewin\'s force field and three-stage model — 0 hits in bus_spec.txt (topFix-04, structure-02, structure-03)'],
  [/\bdisruptive change\b|\bevolutionary change\b|\btransformational\b|\btransactional\b/i, 'the live section\'s four labels for two ideas (accuracy-01, structure-09) and "transformational/transactional leadership" — the leaf says Transformative leadership (bus_spec.txt:1264)'],
  [/\bOutline\b|\bExamine\b|\bDefine\b[^()]{0,200}\(\s*4\s*marks?\s*\)|\bAnalyse\b[^()]{0,200}\(\s*6\s*marks?\s*\)/, 'command words and tariffs this paper does not set: Outline is not IAL, Examine is Economics, Define is 2, and the Units 3-4 source set has no 6-mark Analyse (topFix-05)'],
  [/\bcrisis management\b|\bCOVID\b|\bpandemic\b|\bShell\b|\bKodak\b|\bToyota\b|\bMicrosoft\b|\bNadella\b/i, 'the live section\'s off-specification practice item and its named real firms and dated events (topFix-05, structure-05, structure-06)'],
];

/*
 * THE NEIGHBOURS THAT MAY BE POINTED AT AND MAY NOT BE TAUGHT. `max` mentions across every surface a
 * student can read, each carrying `mustCite` in the same string.
 */
export const POINTER_ONLY = [
  { re: /\bHandy\b|\b(?:power|role|task|person) cultures?\b/i, why: 'the classification of company cultures is 3.3.4 · 1b (bus_spec.txt:1189)', max: 1, mustCite: /3\.3\.4/ },
  { re: /\bautocratic\b|\bpaternalistic\b|\bdemocratic\b|\blaissez-faire\b/i, why: 'leadership styles are 1.3.4 · 5b (bus_spec.txt:748)', max: 1, mustCite: /1\.3\.4/ },
  { re: /\bkaizen\b|\bcontinuous improvement\b/i, why: 'continuous improvement (Kaizen) is 2.3.4 · 3c (bus_spec.txt:1001)', max: 1, mustCite: /2\.3\.4/ },
  { re: /\bscenario planning\b/i, why: 'scenario planning is 0 hits in bus_spec.txt; topFix-01 allows it one sentence', max: 1, mustCite: /contingency/i },
];

/* The vocabulary a subsection teaches with; every subsection must use at least one. */
export const TEACHING_TERMS = [
  'change', 'trigger', 'new ownership', 'poor performance', 'productivity', 'competitiveness',
  'stakeholder', 'incremental', 'step change', 'speed', 'culture', 'size', 'layers', 'transformative',
  'vision', 'resistance', 'resist', 'communication', 'involvement', 'negotiation', 'coercion',
  'contingency', 'risk assessment', 'likelihood', 'impact', 'natural disaster', 'it systems failure',
  'key staff', 'business continuity', 'succession', 'mitigation', 'backup', 'standby',
];

/** The word budget, counted the way `lib/content-validator.mjs` counts it (packet 44). */
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
