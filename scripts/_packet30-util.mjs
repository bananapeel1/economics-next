/**
 * PACKET 30 — managing-people helpers: the id scheme, the formatters, the specification's own lists,
 * and the ONE FIRM that carries every figure in the section.
 *
 * IAL Business 1.3.4, Unit 1 (WBS11), `audit/raw/bus_spec.txt:676-753`. Five sub-topics, 57 oracle
 * rows, **46 substantive leaves** — second only to packet 29's 54 and level with packet 22's 46.
 *
 * THE ORACLE SAYS 96% AND THE ORACLE IS WRONG, WHICH IS V025 IN ITS PUREST FORM. Coverage matches by
 * SUBSTRING and this topic's leaves are single words: `bonus`, `hierarchy`, `induction`, `commission`,
 * `delegation`, `consultation`, `empowerment`, `flat`, `matrix`. So `specGap-08` ("bonus as a named
 * financial incentive not taught") and a 96% coverage figure are both true at once — the word `bonus`
 * occurs in the live section inside `bonuses` in a sentence about something else. The runner's hand
 * `LEAF_MAP` names the subsection that teaches each of the 46 and refuses if one is missing; the
 * oracle figure is printed beside it and is not the gate.
 *
 * ════ A QUALITATIVE TOPIC STILL HAS TO BE EXACT ════
 *
 * Managing people has no equilibrium to solve, and the live section took that as licence: one
 * fabricated specific (`accuracy-01`, "M&S reduced management layers from seven to five in 2022",
 * which cannot be corroborated) and no arithmetic at all. But Business Unit 1 carries `Calculate (4)`
 * and `Construct (4)` — "draw an accurately labelled diagram" — and three of this topic's leaves are
 * quantitative whether or not anybody notices: span of control, the costs of recruitment, selection
 * and training, and the five financial methods of improving performance.
 *
 * So there is one firm, SABARI TEXTILES, and every figure below is derived from it. Packet 17's rule,
 * which packets 20, 24, 28 and 29 have each re-earned: where a section's arithmetic recurs, define it
 * once as a function and generate every surface from it.
 *
 * ── 31 PEOPLE, TWO SHAPES, AND THEY ARE THE SAME FIRM ──
 *
 *     total(span, levels) = (span**levels − 1) / (span − 1)
 *
 *     TALL   span 2, 5 levels:  1 + 2 + 4 + 8 + 16 = 31     chain of command 4 links
 *     FLAT   span 5, 3 levels:  1 + 5 + 25        = 31     chain of command 2 links
 *
 * That pair is the reason `3a` and `3b` are one calculation in this section rather than two drawings
 * that have to agree. Tall and flat are not two firms: they are ONE firm reorganised, and the 31 is
 * not a coincidence to be admired but the only headcount under 60 that a span of 2 and a span of 5
 * both reach exactly. Hierarchy, chain of command and span of control are then three readings of one
 * arithmetic, and the two org charts are generated from the formula rather than drawn.
 *
 * And the consequence a student can actually use: the tall firm's first four levels are 15 MANAGERS
 * and its fifth is 16 workers; the flat firm's first two are 6 managers and its third is 25 workers.
 * **Nine posts move from supervising to making**, with the headcount unchanged — which is what `3c`,
 * "the impact of different organisational structures on business efficiency and employee motivation",
 * is asking about, and it is a subtraction rather than an opinion.
 *
 * ── RECRUITING ONE SUPERVISOR COSTS $10,800, WHICH IS EXACTLY 30% OF THE SALARY ──
 *
 * `2b` is one spec line — "Costs of recruitment, selection and training" — and `specGap-03` says the
 * live section treats it in passing. It is a sum, and every term of it is derived from the same two
 * day rates: a supervisor on $36,000 over 200 working days is $180 a day, and a manager on $72,000 is
 * $360 a day, or $45 an hour. Nothing in the list is typed in except the advertising bill.
 *
 * ── ONE WORKER, FIVE FINANCIAL METHODS, ALL EQUAL AT STANDARD OUTPUT ──
 *
 * `4c` names piecework, commission, bonus, profit share and performance-related pay. Set so that all
 * five pay the SAME $360 in a standard week, the comparison stops being about generosity and becomes
 * about what happens when the week is not standard — which is the only thing that distinguishes them.
 *
 * Money is in dollars. One minus sign, U+2212, emitted by `money` itself (packet 18: 55 ASCII hyphens
 * shipped beside 13 typed ones in a section about negative numbers, because the sign lived in a
 * helper somebody had to remember to reach for).
 *
 * EVERY EXAMPLE IS A KIND OF FIRM WITH NO YEAR, NO NAMED COMPANY AND NO FIGURE. That is one decision
 * answering two findings: `accuracy-01`'s fabricated M&S layer count, and `locale.uk`, for an
 * audience sitting WBS11 in Hong Kong, Malaysia, Pakistan and the Gulf.
 */
import { createHash } from 'node:crypto';

export const SECTION = 'managing-people';

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

/* ══ SABARI TEXTILES · the organisation (1.3.4 · 3a, 3b, 3c) ═══════════════ */

/*
 * THE HEADCOUNT IS NOT CHOSEN, IT IS SOLVED FOR. `sameTotal` searches spans and level counts for a
 * headcount two different spans reach exactly, and the runner asserts the pair it returns is (2,5)
 * and (5,3) at 31 — so if anybody edits the search, the build fails rather than the section quietly
 * teaching a tall firm and a flat firm of different sizes.
 */
const totalFor = (span, levels) => (span ** levels - 1) / (span - 1);

export const ORG = (() => {
  const workerSalary = 36000;
  const managerSalary = 72000;
  const workingDays = 200;

  const shape = (span, levels) => {
    const perLevel = Array.from({ length: levels }, (_, i) => span ** i);
    const headcount = perLevel.reduce((a, b) => a + b, 0);
    const managers = perLevel.slice(0, -1).reduce((a, b) => a + b, 0);
    const workers = perLevel[perLevel.length - 1];
    return {
      span, levels, perLevel, headcount, managers, workers,
      chain: levels - 1,
      wageBill: managers * managerSalary + workers * workerSalary,
      formula: `(${span}^${levels} − 1) ÷ ${span - 1}`,
      sum: perLevel.join(' + '),
    };
  };

  /* The search: every (span, levels) pair up to a 60-person firm, grouped by headcount. */
  const sameTotal = (() => {
    const found = new Map();
    for (let span = 2; span <= 8; span += 1) {
      for (let levels = 3; levels <= 6; levels += 1) {
        const n = totalFor(span, levels);
        if (!Number.isInteger(n) || n > 60) continue;
        (found.get(n) || found.set(n, []).get(n)).push({ span, levels });
      }
    }
    for (const [n, pairs] of [...found.entries()].sort((a, b) => a[0] - b[0])) {
      const tallest = pairs.reduce((a, b) => (b.levels > a.levels ? b : a));
      const flattest = pairs.reduce((a, b) => (b.levels < a.levels ? b : a));
      if (tallest.levels - flattest.levels >= 2) return { headcount: n, tall: tallest, flat: flattest };
    }
    throw new Error('no headcount is reached exactly by two spans two levels apart');
  })();

  const tall = shape(sameTotal.tall.span, sameTotal.tall.levels);
  const flat = shape(sameTotal.flat.span, sameTotal.flat.levels);

  return {
    name: 'Sabari Textiles',
    what: 'a clothing manufacturer',
    headcount: sameTotal.headcount,
    tall, flat,
    totalFor,
    workerSalary, managerSalary, workingDays,
    workerDay: round2(workerSalary / workingDays),
    managerDay: round2(managerSalary / workingDays),
    managerHour: round2(managerSalary / workingDays / 8),
    /** Nine posts move from supervising to making, at constant headcount. */
    postsMoved: tall.managers - flat.managers,
    wageSaving: tall.wageBill - flat.wageBill,
    /** The matrix team: drawn from both structures, which is the whole point of a matrix. */
    matrixProject: 'the school-uniform contract',
    matrixFunctions: ['Design', 'Production', 'Quality', 'Sales'],
  };
})();

/* ══ SABARI TEXTILES · recruiting one supervisor (1.3.4 · 2a, 2b, 2c) ══════ */

export const RECRUIT = (() => {
  const salary = ORG.workerSalary;
  const day = ORG.workerDay;
  const hour = ORG.managerHour;
  /*
   * A SHORT LABEL AND A SHORT WORKING PER ITEM, for the same reason the other lists carry two forms:
   * `gridColumns` refuses a table wider than its frame, and the full label of the last item is 42
   * characters, which alone is most of a 508-unit row. The prose uses `label`; the table uses `short`.
   */
  const items = [
    { label: 'Advertising the post', short: 'Advertising the post', amount: 1200, workings: 'two trade-press listings and one job board', shortWorkings: 'two listings, one board' },
    { label: 'Recruitment agency fee', short: 'Agency fee', amount: round2(0.15 * salary), workings: `15% of the ${money(salary)} salary`, shortWorkings: '15% of the salary' },
    { label: "Managers' time shortlisting and interviewing", short: "Managers' time", amount: round2(20 * hour), workings: `20 hours at ${money(hour)} an hour`, shortWorkings: `20 h at ${money(hour)}` },
    { label: 'Induction training', short: 'Induction training', amount: round2(5 * day), workings: `5 days at ${money(day)} a day`, shortWorkings: `5 days at ${money(day)}` },
    { label: 'Off-the-job supervisory course', short: 'Off-the-job course', amount: 600, workings: 'one external short course', shortWorkings: 'one short course' },
    { label: 'Output lost while the new supervisor learns', short: 'Output lost learning', amount: round2(10 * day), workings: `10 days at ${money(day)} a day`, shortWorkings: `10 days at ${money(day)}` },
  ];
  const total = items.reduce((a, b) => a + b.amount, 0);
  const leaversBefore = 4;
  const leaversAfter = 1;
  return {
    salary, day, hour, items, total,
    share: round2((100 * total) / salary),
    leaversBefore, leaversAfter,
    annualBefore: total * leaversBefore,
    annualAfter: total * leaversAfter,
    retentionSaving: total * (leaversBefore - leaversAfter),
    /* The three stages the spec line names, and what each one costs. */
    stages: [
      ['Recruitment', items.slice(0, 2).reduce((a, b) => a + b.amount, 0)],
      ['Selection', items[2].amount],
      ['Training', items.slice(3).reduce((a, b) => a + b.amount, 0)],
    ],
  };
})();

/* ══ SABARI TEXTILES · one machinist, five financial methods (1.3.4 · 4c) ══ */

/*
 * ALL FIVE PAY THE SAME IN A STANDARD WEEK, BY CONSTRUCTION. A method that paid more would win the
 * comparison for the wrong reason, and the leaf asks what each method DOES, not which is generous.
 * The standard week is the pivot: below it piecework and commission fall and the other three do not.
 */
export const PAY = (() => {
  const hours = 40;
  const rate = 9;
  const basic = hours * rate;                                  /* $360 */
  const pieceUnits = 240;
  const pieceRate = round2(basic / pieceUnits);                 /* $1.50 */
  const commissionSales = 9000;
  const commissionRate = round2((100 * basic) / commissionSales); /* 4% */
  const quarterWeeks = 13;
  const quarterBasic = basic * quarterWeeks;
  const bonusRate = 10;
  const bonus = round2((bonusRate / 100) * quarterBasic);        /* $468 */
  const profit = 111600;
  const shareRate = 5;
  const pool = round2((shareRate / 100) * profit);               /* $5,580 */
  const prpUplift = 5;
  const prpRate = round2(rate * (1 + prpUplift / 100));          /* $9.45 */
  return {
    hours, rate, basic,
    pieceUnits, pieceRate,
    /** Piecework at any output. */
    piece: (units) => round2(units * pieceRate),
    slowWeek: 200, fastWeek: 280,
    commissionSales, commissionRate,
    commission: (sales) => round2((commissionRate / 100) * sales),
    slowSales: 7500, fastSales: 10500,
    quarterWeeks, quarterBasic, bonusRate, bonus,
    bonusPerWeek: round2(bonus / quarterWeeks),                  /* $36 */
    profit, shareRate, pool,
    perHead: round2(pool / ORG.headcount),                       /* $180 */
    prpUplift, prpRate,
    prpWeek: round2(prpRate * hours),                            /* $378 */
    prpGain: round2(prpRate * hours - basic),                    /* $18 */
  };
})();

/* ══ The specification's own lists, in the specification's own words ════════ */

/*
 * EVERY LIST BELOW IS TRANSCRIBED FROM THE SPEC SPAN AND IS THE ONLY SOURCE FOR THE LISTS ON THE
 * PAGE. Rule 2 of the programme: where the specification supplies vocabulary, use ITS vocabulary.
 * That matters twice in this topic. `1b-4` is "flexible hours and home working" — NOT "work-life
 * balance", which `specGap-10` asks about and which is 0 hits in `bus_spec.txt`. And `4d-5` is
 * "flexible working" as a NON-FINANCIAL METHOD, a different leaf from `1b-4`'s flexible hours, which
 * the live section runs together.
 */

/*
 * EVERY LIST CARRIES A SHORT FORM AND A FULL ONE, and the short form is not an abbreviation for
 * convenience. `gridColumns` THROWS when a table does not fit its frame, so the reference tables can
 * only hold cells that are legible in the column a reader actually gets — the constraint packet 20
 * met as twelve colliding cells on a phone. The full sentence goes in the prose or the caption, both
 * of which wrap; the table gets the short one. Authoring them side by side here is what stops the two
 * drifting apart.
 */

/** 1b · Flexible workforce — five bullets, :683-687. */
export const FLEXIBLE = [
  ['Multi-skilling', 'One worker, several jobs', 'Training one worker to do several jobs, so cover moves to wherever the work is'],
  ['Part-time and temporary', 'Fewer hours, or a fixed term', 'Contracts for fewer hours, or for a fixed period, matching staff to demand'],
  ['Zero-hour contracts', 'No hours guaranteed at all', 'No guaranteed hours: the firm offers work shift by shift and the worker may decline'],
  ['Flexible hours and home working', 'Same hours, when or where', 'The same hours arranged differently, or done away from the workplace'],
  ['Outsourcing', 'Another firm does the work', 'Paying another firm to do the work instead of employing anybody to do it'],
];

/** 2c · Types of training — three bullets, :695-698. */
export const TRAINING = [
  ['Induction', 'On arrival: job, place, people, rules', 'Given on arrival: the job, the place, the people and the rules'],
  ['On-the-job', 'Learning while doing the work', 'Learning while doing the work, alongside somebody who already does it'],
  ['Off-the-job', 'Learning away, on a course', 'Learning away from the work, on a course or at a provider'],
];

/** 3a · Structure — four bullets, :700-704. */
export const STRUCTURE_TERMS = [
  ['Hierarchy', 'The levels of authority', 'The levels of authority in a firm, from the top to the shop floor'],
  ['Chain of command', 'The route down, in links', 'The route an instruction travels down those levels, counted in links'],
  ['Span of control', 'Direct reports per manager', 'How many people report directly to one manager'],
  ['Centralised and decentralised', 'Who takes the decisions', 'Whether decisions are taken at the top or passed down the hierarchy'],
];

/** 3b · Types of structure — three bullets, :705-708. */
export const STRUCTURE_TYPES = ['Tall', 'Flat', 'Matrix'];

/** 4b · Motivation theories — four bullets, :722-726. */
export const THEORISTS = [
  ['Taylor', 'scientific management'],
  ['Mayo', 'human relations theory'],
  ['Maslow', 'hierarchy of needs'],
  ['Herzberg', 'two-factor theory'],
];

/** 4c · Financial methods — five bullets, :727-732. */
export const FINANCIAL = ['Piecework', 'Commission', 'Bonus', 'Profit share', 'Performance-related pay'];

/** 4d · Non-financial methods — eight bullets, :733-741. */
export const NON_FINANCIAL = [
  ['Delegation', 'A task AND the authority for it', 'Passing a task AND the authority to decide how it is done'],
  ['Consultation', 'Asked before the decision', 'Asking staff before deciding, and being seen to have listened'],
  ['Empowerment', 'Control over how the work is done', 'Giving staff control over how they do the work, within limits'],
  ['Team working', 'A group with a shared output', 'Organising the work around a group with a shared output'],
  ['Flexible working', 'Choice over when or where', 'Letting staff choose when or where the hours are worked'],
  ['Job enrichment', 'Harder work, more responsibility', 'Adding harder tasks and more responsibility to a job'],
  ['Job rotation', 'Between jobs, same difficulty', 'Moving staff between jobs at the same level of difficulty'],
  ['Job enlargement', 'More tasks, same difficulty', 'Adding more tasks at the same level of difficulty to one job'],
];

/** 5b · Types of leadership style — four bullets, :748-752. */
export const STYLES = [
  ['Autocratic', 'The leader, alone', 'The leader decides and tells'],
  ['Paternalistic', 'The leader, having explained', 'The leader decides, explains, and takes the staff interest into account'],
  ['Democratic', 'The leader with the staff', 'The leader decides with the staff, or lets them decide'],
  ['Laissez-faire', 'The staff, within a goal', 'The leader sets the goal and leaves the staff to it'],
];

/*
 * MASLOW'S FIVE LEVELS AND HERZBERG'S TWO FACTORS ARE THE THEORIES' OWN VOCABULARY, NOT THE SPEC'S.
 * `self-actualisation`, `esteem`, `hygiene` and `Hawthorne` are each 0 hits in `bus_spec.txt` — but
 * `4b` names "Maslow (hierarchy of needs)" and "Herzberg (two-factor theory)" explicitly, so the
 * internal vocabulary of a NAMED theory is required content rather than another syllabus's language.
 * That is the difference from packet 20's case, where a section's whole central vocabulary belonged
 * to a different specification and displaced this one's. Stated here because the distinction is the
 * kind that is obvious once and forgotten twice.
 */
export const MASLOW = [
  ['Self-actualisation', 'Work that stretches you as far as you can go', 'A machinist trusted to redesign the line'],
  ['Esteem', 'Recognition, status and a job others respect', 'Being named as the person who trains the new starters'],
  ['Social', 'Belonging to a group at work', 'A production team that takes its breaks together'],
  ['Safety', 'A job that will still be there next month, worked safely', 'A permanent contract and guarded machines'],
  ['Physiological', 'Pay enough to eat, live and travel to work', 'A wage that covers the rent'],
];

export const HERZBERG = {
  motivators: ['Achievement', 'Recognition', 'The work itself', 'Responsibility', 'Advancement'],
  hygiene: ['Pay', 'Company policy', 'Supervision', 'Working conditions', 'Job security'],
};

/*
 * THE WORDS THIS SECTION TEACHES, for the runner's vocabulary checks. Kept here rather than in the
 * runner so the list cannot drift from the lists above it.
 */
export const TEACHING_TERMS = [
  ...FLEXIBLE.map(([k]) => k), ...TRAINING.map(([k]) => k), ...STRUCTURE_TERMS.map(([k]) => k),
  ...STRUCTURE_TYPES, ...THEORISTS.map(([k]) => k), ...FINANCIAL, ...NON_FINANCIAL.map(([k]) => k),
  ...STYLES.map(([k]) => k),
].map((s) => s.toLowerCase());

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
