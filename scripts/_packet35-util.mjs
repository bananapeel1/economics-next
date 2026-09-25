/**
 * PACKET 35 — entrepreneurs-leaders helpers: the id scheme, the formatters, the specification's own
 * lists, and the ONE DEMAND SCHEDULE that carries every figure in the section.
 *
 * IAL Business 1.3.5, Unit 1 (WBS11), `audit/raw/bus_spec.txt:760-788`. Four sub-topics,
 * **22 substantive leaves**.
 *
 * ════ THE SECTION IS CALLED "ENTREPRENEURS AND LEADERS" AND HAS NO LEADERSHIP LEAF ════
 *
 * That sentence is the whole of this packet's rule-1 work, so it is written at the top of the first
 * file anybody opens. The heading at `bus_spec.txt:760` is the specification's own, and the four
 * sub-topics under it are Role of an entrepreneur, Entrepreneurial motives and characteristics,
 * Business objectives, Business choices. **Not one of them mentions leadership.** Leadership is
 * `1.3.4 · 5` (:746-753) — the distinction between management and leadership, the four styles, and
 * `5c`, "The difficulty of moving from entrepreneur to leader" (:753). `managing-people` owns all of
 * it and packet 30 taught it on 17 September, having REFUSED two findings that asked to move `5c`
 * into this section.
 *
 * Four of this packet's twenty-seven items ask this section to build the other half of that same
 * refusal: `specGap-01` and `topFix-01` want a block on moving from entrepreneur to leader, and
 * `structure-01` calls the absence a title/coverage mismatch. They are refused, with :753 cited. Had
 * both packets obeyed their own findings, the leaf would have been taught twice; had both refused in
 * the other direction, nowhere. This is the ADD-side of packet 26's delete-findings, and it is the
 * same defect: **an audit item is a claim about the specification, and the specification is on disk.**
 *
 * `specGap-02` and the rest of `topFix-01` want forms of business — sole trader, partnership, private
 * limited company, franchising, social enterprise, lifestyle and online businesses, flotation,
 * liability. Every one of those is `2.3.1 · 4` and `2.3.1 · 5` (:870-878), which is
 * `planning-raising-finance`, built by packet 19. Zero of them occur between :760 and :788.
 *
 * So this file bans them. `BANNED_ELSEWHERE` below is not a style preference: it is the boundary of
 * `SPEC-OWNERSHIP.md` expressed as a build failure.
 *
 * ════ A TOPIC ABOUT PEOPLE'S REASONS, WITH ONE SCHEDULE UNDER ALL OF IT ════
 *
 * Sub-topics 3 and 4 — business objectives, opportunity cost and trade-offs — look qualitative and
 * are not. The specification names survival, profit maximisation, sales maximisation, market share,
 * cost efficiency, employee welfare, customer satisfaction and social objectives as separate things,
 * and the only way to show that they ARE separate is to price the same firm for each one and read
 * off what it gets. A section that describes them in prose can assert that objectives conflict; a
 * section with a schedule can say the conflict costs $5,000.
 *
 * So there is one firm, ALTAN FURNITURE, and one line:
 *
 *     Q = 12,000 − 200P        fixed costs $80,000        variable cost $10 a chair
 *
 * Everything below is solved out of it. Nothing is typed in except the three numbers on that line
 * and the founder's three alternative uses of a year.
 *
 * ── THE FOUR OBJECTIVES ARE FOUR PRICES ON ONE HILL ──
 *
 *     PROFIT MAXIMISATION  (3b)   P = $35   Q = 5,000   revenue $175,000   profit $45,000
 *     SALES MAXIMISATION   (3c)   P = $30   Q = 6,000   revenue $180,000   profit $40,000
 *     PROFIT SATISFICING   (2b)   P = $40   Q = 4,000   revenue $160,000   profit $40,000
 *     MARKET SHARE         (3c)   P = $20   Q = 8,000   revenue $160,000   profit $0
 *     SURVIVAL             (3a)   any price from $20 to $50 — the two prices where profit is zero
 *
 * Read that table twice and the section's hardest idea is already visible. **Sales maximisation and
 * profit satisficing earn the SAME $40,000 on opposite sides of the peak** — $30 selling 6,000 and
 * $40 selling 4,000 — which is what makes profit a hill rather than a direction, and which no amount
 * of prose about "balancing objectives" conveys. The runner asserts that equality rather than
 * printing it, so an edit to the schedule that destroys the symmetry fails the build.
 *
 * And the break-even prices are $20 and $50 EXACTLY, because the schedule was chosen for it:
 * (P − 10)(60 − P) = 400 has integer roots. Survival is then a range a student can state, not a
 * platitude, and market share is the bottom of it — the largest output the firm can reach while
 * still surviving, which is why it earns nothing.
 *
 * ── OPPORTUNITY COST IS THE NEXT BEST AND NOT THE SUM, WHICH IS A SUBTRACTION ──
 *
 * `4a` is one line of specification and one of the two most-failed ideas in Unit 1. The founder has
 * ONE year and four mutually exclusive uses of it, so the alternatives cannot be added: taking the
 * salaried post is not compatible with taking the agency. Opportunity cost is $36,000, the best
 * forgone; the sum of all three forgone is $78,000 and is the wrong answer the misconception
 * produces. The difference decides the case: $45,000 against $36,000 is a gain of $9,000, and a
 * student who sums concludes the founder should shut the workshop.
 *
 * Money is in dollars. One minus sign, U+2212, emitted by `money` itself (packet 18).
 *
 * EVERY EXAMPLE IS A KIND OF FIRM WITH NO YEAR, NO NAMED REAL COMPANY AND NO REAL PERSON. The live
 * section fails this twice — `topFix-04` names Amazon "reinvesting revenue with minimal dividends"
 * and Bezos as running "the world's largest retailer", neither of which is checkable and the second
 * of which is not true — and the audience sits WBS11 in Hong Kong, Malaysia, Pakistan and the Gulf.
 * The founder is "the founder" rather than a name, because a topic about entrepreneurs invites
 * inventing a person and an invented person acquires a nationality, a gender and a biography that
 * nothing in the specification asked for.
 */
import { createHash } from 'node:crypto';

export const SECTION = 'entrepreneurs-leaders';

const norm = (s) => String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
export const hash8 = (s) => createHash('sha1').update(norm(s)).digest('hex').slice(0, 8);
export const id = (kind, key) => `${SECTION}:${kind}:${hash8(key)}`;
export const subId = (s) => `${SECTION}:sub:${s}`;

export const round2 = (n) => Math.round(n * 100) / 100;

/* ── formatting: one formatter a kind of figure (packet 18) ────────────────── */

export const MINUS = '−';
export const money = (n) => `${n < 0 ? MINUS : ''}$${Number.isInteger(Math.abs(n)) ? Math.abs(n).toLocaleString('en-GB') : Math.abs(n).toFixed(2)}`;
export const qty = (n) => (Number.isInteger(n) ? n.toLocaleString('en-GB') : n.toFixed(2));
export const pct = (n) => `${Number.isInteger(n) ? n : n.toFixed(1)}%`;

/* ══ ALTAN FURNITURE · the schedule (1.3.5 · 2b, 3a, 3b, 3c, 4a, 4b) ═══════ */

/*
 * THE PRICES ARE SOLVED FOR, NOT CHOSEN. `peakOf` differentiates the profit expression numerically
 * over the integer prices in the surviving range and returns the best; the runner then asserts that
 * what it found is $35, and that the two break-even prices are $20 and $50. If anybody edits the
 * schedule, the build fails rather than the section quietly teaching four prices that no longer sit
 * where the arithmetic puts them.
 */
export const FIRM = (() => {
  const name = 'Altan Furniture';
  const what = 'a small workshop making one design of wooden chair';
  const unit = 'chair';

  const a = 12000;          // the intercept of the demand schedule
  const b = 200;            // chairs lost a dollar of price
  const fixed = 80000;      // rent, machinery, the founder's own drawings
  const variable = 10;      // timber, fittings and the labour of one chair

  const qAt = (p) => a - b * p;
  const revenueAt = (p) => p * qAt(p);
  const costAt = (p, v = variable) => fixed + v * qAt(p);
  const profitAt = (p, v = variable) => revenueAt(p) - costAt(p, v);

  /* the surviving range: every integer price at which profit is not negative */
  const surviving = [];
  for (let p = 1; p <= a / b; p += 1) if (profitAt(p) >= 0) surviving.push(p);
  const breakEvenLow = surviving[0];
  const breakEvenHigh = surviving[surviving.length - 1];

  const peakOf = (fn) => {
    let best = surviving[0];
    for (const p of surviving) if (fn(p) > fn(best)) best = p;
    return best;
  };

  const profitPrice = peakOf((p) => profitAt(p));
  const salesPrice = peakOf((p) => revenueAt(p));
  /* market share is the largest output the firm can reach while still surviving */
  const sharePrice = breakEvenLow;
  /*
   * SATISFICING IS THE ONE OBJECTIVE DEFINED BY A SUFFICIENCY RATHER THAN A MAXIMUM, AND THE
   * DIFFERENCE IS WHICH VARIABLE THE FOUNDER CHOOSES FIRST.
   *
   * A profit maximiser chooses the PRICE and takes whatever working year follows from it: $35 means
   * 5,000 chairs, which is 25 a day over a 200-day year. A satisficer chooses the WORKING YEAR and
   * takes whatever profit follows: 20 chairs a day over the same 200 days is 4,000 chairs, and the
   * schedule then says the price must be $40. Nothing here is typed in but the working year and the
   * day's output, and the test that matters is applied afterwards — the profit that results must
   * still clear the opportunity cost, or satisficing would not be a choice but a mistake.
   *
   * That is also where the section's sharpest arithmetic sits. $40 selling 4,000 and $30 selling
   * 6,000 earn the SAME profit on opposite sides of the peak, which is what makes profit a hill.
   */
  const workingDays = 200;
  const satisficeChairsPerDay = 20;
  const satisficeQ = workingDays * satisficeChairsPerDay;
  const satisficePrice = (a - satisficeQ) / b;

  const alternatives = [
    ['Managing a larger workshop for a salary', 36000],
    ['Taking a timber supplier\'s sales agency', 24000],
    ['Going back to the bench as an employed cabinetmaker', 18000],
  ];
  const opportunityCost = Math.max(...alternatives.map(([, v]) => v));

  const at = (p, v = variable) => ({
    price: p, q: qAt(p), revenue: revenueAt(p), cost: costAt(p, v), profit: profitAt(p, v),
  });

  const profitMax = at(profitPrice);
  const salesMax = at(salesPrice);
  const marketShare = at(sharePrice);
  const satisfice = at(satisficePrice);

  /* cost efficiency (3c): two dollars off the variable cost, and the peak MOVES */
  const efficientVariable = variable - 2;
  const efficientPeak = (() => {
    let best = 1;
    for (let p = 1; p <= a / b; p += 1) if (profitAt(p, efficientVariable) > profitAt(best, efficientVariable)) best = p;
    return best;
  })();
  const efficient = at(efficientPeak, efficientVariable);
  const efficientAtOldPrice = at(profitPrice, efficientVariable);

  /* employee welfare (3c): two dollars on, at the same price */
  const welfareVariable = variable + 2;
  const welfare = at(profitPrice, welfareVariable);

  return {
    name, what, unit, a, b, fixed, variable, workingDays, satisficeChairsPerDay,
    qAt, revenueAt, costAt, profitAt, surviving, breakEvenLow, breakEvenHigh,
    profitMax, salesMax, marketShare, satisfice,
    profitMaxPerDay: profitMax.q / workingDays,
    efficientVariable, efficient, efficientAtOldPrice, efficiencyGain: efficientAtOldPrice.profit - profitMax.profit,
    welfareVariable, welfare, welfareCost: profitMax.profit - welfare.profit,
    alternatives, opportunityCost,
    wrongSum: alternatives.reduce((n, [, v]) => n + v, 0),
    economicGain: profitMax.profit - opportunityCost,
    /* the two trade-offs the section teaches, both read off the table */
    tradeSales: { profit: profitMax.profit - salesMax.profit, revenue: salesMax.revenue - profitMax.revenue, units: salesMax.q - profitMax.q },
    tradeShare: { profit: profitMax.profit - marketShare.profit, units: marketShare.q - profitMax.q },
    tradeSatisfice: { profit: profitMax.profit - satisfice.profit, units: profitMax.q - satisfice.q },
    demand: `Q = ${qty(a)} ${MINUS} ${qty(b)}P`,
  };
})();

/* ══ The specification's own lists ════════════════════════════════════════ */
/*
 * THE SPEC NAMES NO BULLETS FOR `1d` OR `2a`, AND THAT IS WHY BOTH LISTS BELOW ARE DERIVED.
 *
 * `specGap-07` says "lack of skills/experience and fear of failure are spec-typical barriers".
 * They are not spec-named at all: `lack of skills` and `fear of failure` are BOTH 0 hits in
 * `bus_spec.txt`. `1d` (:768) is the bare phrase "Barriers to entrepreneurship" with nothing under
 * it, and `2a` (:770) is "Characteristics and skills required" with nothing under it.
 *
 * Packet 20's rule applies: where the specification supplies no vocabulary for a leaf, teach the
 * mechanism in the specification's own words. So each barrier and each characteristic below is
 * ANCHORED to a leaf the specification does name, and carries the anchor with it. A student who
 * learns four barriers from a list has learned a list; a student who can say which requirement of
 * the role each barrier obstructs can derive the list under exam conditions.
 */

/* every characteristic is read off a requirement of sub-topic 1, which is where the role is defined */
export const CHARACTERISTICS = [
  ['Organisation', '1 · a', 'Creating and setting up', 'getting premises, capital, stock and people together so the first sale can happen'],
  ['Determination', '1 · b', 'Running and developing', 'the second year, when the novelty has gone and the business still opens every morning'],
  ['Innovation', '1 · c', 'Innovation within a business', 'finding the change worth making, new firm or old'],
  ['Risk tolerance', '1 · e', 'Anticipating risk and uncertainty', 'acting while the outcome is genuinely unknown'],
];

/* every barrier obstructs a named requirement; the spec names the requirement, not the barrier */
export const BARRIERS = [
  ['Capital', 'A new firm has no trading record to show a lender, and cannot be created without the money to create it.', 'Obstructs 1 · a, creating and setting up a business.'],
  ['Skills and experience', 'The role needs organising, selling, costing and managing at once, and few people arrive with all four.', 'Obstructs 1 · a and 1 · b.'],
  ['Risk and uncertainty', 'Part of what a new firm faces cannot be estimated at all, and that part is what stops people.', 'Obstructs 1 · e directly.'],
  ['Opportunity cost', 'Starting means giving up the best alternative use of the founder\'s year.', 'This is 4 · a read as a barrier.'],
];

/* 2 · b, both bullets, in the specification's own words (:774-776) */
export const FINANCIAL_MOTIVES = [
  ['Profit maximisation', 'Setting the business up to earn as much profit as the market allows, and accepting the work that goes with it.'],
  ['Profit satisficing', 'Taking a profit that is good enough rather than the largest available, because something else — time, risk, independence — is worth more than the difference.'],
];

export const NON_FINANCIAL_MOTIVES = [
  ['Ethical stance', 'Founding the business in order to trade in a particular way — on what it will not sell, not only on what it will.'],
  ['Social entrepreneurship', 'Founding it to meet a social need, with the trading surplus serving that purpose rather than the founder.'],
  ['Independence', 'Founding it in order to answer to nobody else\'s decisions about how the work is done.'],
  ['Home working', 'Founding it so that the work happens where the founder lives, which is a reason for the business to exist in the shape it has.'],
];

/* 3 · c, the six other objectives, in the specification's own words (:781-786) */
export const OTHER_OBJECTIVES = [
  'sales maximisation', 'market share', 'cost efficiency',
  'employee welfare', 'customer satisfaction', 'social objectives',
];

/*
 * BANNED, BECAUSE ANOTHER SECTION OWNS IT. Each entry cites the line that settles it. These are the
 * findings of this packet's rule-1 pass turned into a build failure, so that no later edit can walk
 * the boundary back without the runner saying so.
 */
export const BANNED_ELSEWHERE = [
  [/\bautocratic\b|\bpaternalistic\b|\blaissez[- ]faire\b|\bdemocratic leadership\b|\bleadership styles?\b/i, 'leadership style vocabulary — 1.3.4 · 5b (bus_spec.txt:748-752), taught by managing-people'],
  [/\bmoving from entrepreneur to leader\b|\bentrepreneur to leader\b/i, 'moving from entrepreneur to leader — 1.3.4 · 5c (bus_spec.txt:753), taught by managing-people (specGap-01, refused)'],
  [/\bsole trader\b|\bpartnership\b|\bprivate limited\b|\bpublic limited\b|\bflotation\b|\bfranchis\w*\b|\bsocial enterprise\b|\blifestyle business\w*\b|\bunlimited liability\b|\blimited liability\b/i, 'forms of business or liability — 2.3.1 · 4 and · 5 (bus_spec.txt:870-878), taught by planning-raising-finance (specGap-02, refused)'],
  [/\brevenue maximisation\b/i, 'revenue maximisation — 0 hits in bus_spec.txt; the specification\'s name is sales maximisation (:781) (specGap-06)'],
  [/\bbarriers to entry\b/i, 'barriers to entry — the leaf is barriers to entrepreneurship (:768); barriers to entry is 3.3.3 market structures (topFix-04)'],
  [/\bGreiner\b/i, 'Greiner\'s growth model — 0 hits in bus_spec.txt; named by specGap-01, which is refused'],
  /*
   * THE SOURCES OF FINANCE ARE 2.3.1 · 3 (bus_spec.txt:850-869) AND LAYER 6 FOUND THE ONE PLACE THIS
   * SECTION NAMED THEM. `1d`, barriers to entrepreneurship, has no bullets, so "how is the capital
   * barrier lowered?" pulls towards a list of sources — and four of them (personal savings :850,
   * family and friends :855, leasing :867, grants :869) had arrived in one sentence and a recall
   * item. Naming the BARRIER is this section's leaf; naming the instruments is Unit 2's.
   */
  [/\bpersonal savings\b|\bventure capital\b|\bshare capital\b|\bovertdraft\b|\boverdrafts?\b|\btrade credit\b|\bleasing\b|\bstart-up grants?\b|\bbusiness angel/i, 'a named source of finance — 2.3.1 · 3 (bus_spec.txt:850-869), taught by planning-raising-finance. This section names the capital BARRIER, not the instruments that lower it'],
];

/*
 * TEACHING TERMS. `teachingWords` is the set of words a subsection actually teaches with, used by
 * the runner's answer-recoverable check. Kept here so the check and the content cannot drift.
 */
export const TEACHING_TERMS = [
  'entrepreneur', 'intrapreneurship', 'innovation', 'risk', 'uncertainty', 'barrier',
  'profit', 'satisficing', 'maximisation', 'survival', 'sales', 'market share',
  'cost efficiency', 'employee welfare', 'customer satisfaction', 'social objectives',
  'ethical stance', 'social entrepreneurship', 'independence', 'home working',
  'opportunity cost', 'trade-off',
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
