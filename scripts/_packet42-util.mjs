/**
 * PACKET 42 — resource-management helpers: the id scheme, the formatters, the specification's own
 * lists, and the ONE MANUFACTURER every figure in the section is read off.
 *
 * IAL Business 2.3.4, Unit 2 (WBS12), `audit/raw/bus_spec.txt:965-1002`. Four sub-topics —
 * 1 Production, productivity and efficiency · 2 Capacity utilisation · 3 Inventory control ·
 * 4 Quality management — and **28 substantive leaves** (32 rows in `audit/raw/spec-items.json`,
 * four of which are the `requirement` parents 1a, 1b, 1c and 4a).
 *
 * ════ RULE 1 · THE LEDGER'S NUMBERING IS UK GCE AND IT DOES NOT EXIST HERE ══
 *
 * Nine of this section's thirty open ids cite `2.4.1`, `2.4.2`, `2.4.3` or `2.4.4` as though those
 * were this section's sub-topics. `grep -c "2\.4\.3" audit/raw/bus_spec.txt` returns **0**, and
 * the heading at `:965` reads `2.3.4 Resource management`. Every claim was therefore read by its
 * WORDING at `:965-1002` before anything was built. The runner asserts the numbering out of the
 * document by line number rather than trusting this comment.
 *
 *     `specGap-09` is INVERTED and is the one id this packet refuses: it asks to renumber correct
 *     content ("content sits under 2.3.4 but IAL Resource management is 2.4") into a chapter the
 *     specification does not contain. It is `wont-fix` with that evidence.
 *
 *     `specGap-06` cites "2.4.4c" for quality circles. Even after the 2.4 → 2.3.4 correction the
 *     letter is wrong: `circles` is the THIRD BULLET OF 4a (`:999`), beside `control` (`:997`) and
 *     `assurance`. 4c is Kaizen (`:1001`). `spec-coverage.json`'s own `thinItems` gets this right
 *     ("4a) Quality circles"); the ledger item does not. Built against 4a.
 *
 * ════ RULE 2 · SPEAK THE SPECIFICATION'S WORD ═══════════════════════════════
 *
 * Counted in `bus_spec.txt` rather than remembered:
 *
 *     inventory control  4        stock control     0
 *     buffer inventory   1        buffer stock      0
 *     waste minimisation 1        re-order          0
 *     lean production    1        lead time         0
 *     just in time       1        stock-out         0
 *     kaizen             1        seven wastes      0
 *     cell               2        quality circle    0  (but `Quality:` at :996 + `circles` at :999)
 *
 * `topFix-02`, `structure-05`, `specGap-01` and `specGap-02` are written ENTIRELY in the missing
 * column. The requirement each of them names is real; the vocabulary is not. This section says
 * **inventory control** and **buffer inventory**.
 *
 * The one place the conventional words belong is ON THE DRAWING. Leaf 3a is "Interpretation of
 * inventory control diagram", so a student has to be able to read a chart whose lines are labelled
 * the way an exam paper labels them. So `BANNED_IN_PROSE` below is enforced everywhere EXCEPT
 * inside a `<text>` element of a diagram SVG, which is the acceptance check the packet spec sets
 * ("0 outside diagram labels"). The teaching text names each line by what it does — "the level at
 * which a fresh order goes out", "the delivery delay" — and the drawing carries the label.
 *
 * `seven wastes` is 0 hits, so `topFix-04`'s "a fillin for the seven wastes" is built on the three
 * kinds of waste THIS SECTION costs out rather than on a taxonomy the specification never names.
 *
 * ════ THE SPINE · one assembler, one month, and every figure derived ════════
 *
 * NOTHING BELOW IS TYPED IN EXCEPT THE FIGURES MARKED `typed`. Everything else is computed, and
 * the runner asserts the properties the teaching rests on:
 *
 *   CAPACITY (2a)     3,000 of a possible 4,000 bicycles a month  →  75%
 *                     and the twist `structure-10` asks for: closing a line takes the MAXIMUM to
 *                     3,200, so the same 3,000 bicycles is 93.75% with nothing sold that was not
 *                     sold before. Utilisation rose because the denominator fell.
 *
 *   COST (1c)         fixed $240,000 · variable $60  →  average $140 at 3,000, $120 at 4,000.
 *                     Efficiency is the specification's own test — production at MINIMUM AVERAGE
 *                     COST — so the minimum of that curve is where the word points, and spare
 *                     capacity costs $20 a bicycle because the fixed cost is spread over fewer.
 *
 *   PRODUCTIVITY (1b) 3,000 ÷ 120 workers = 25 a worker a month; $900 of wages ÷ 25 = $36 of
 *                     labour in every bicycle. Training and better jigs take it to 30 a worker,
 *                     which is +20% and takes labour per bicycle to $30.
 *
 *   LABOUR v CAPITAL  the automated line costs $90,000 a month more in fixed charges and $24 a
 *   (1d)              bicycle less in variable cost, so the two methods cost THE SAME at
 *                     90,000 ÷ 24 = 3,750 bicycles. Below it labour-intensive wins, above it
 *                     capital-intensive does. The crossover is derived, not asserted.
 *
 *   INVENTORY (3a-3c) 2 tyres a bicycle × 3,000 ÷ 20 working days = 300 tyres a day. A maximum of
 *                     6,000 and a buffer of 1,200 make the order 4,800 and the cycle 16 days; a
 *                     four-day delivery delay puts the order point at 1,200 + 1,200 = 2,400.
 *                     Every label on the diagram is one of those five numbers.
 *
 *   JIT (3d)          holding costs $5,400 a month at an average of 3,600 tyres. Cutting the
 *                     buffer to one day takes the average to 450 and the cost to $675 — a saving
 *                     of $4,725. One day of stopped line costs 150 bicycles × $120 of contribution
 *                     = $18,000, which is 3.81 months of that saving. THAT is the JIT trade-off,
 *                     worked from this section's own figures — which is what the packet spec asks
 *                     for in place of the Toyota 2021 claim `accuracy-01` and `topFix-03` report.
 *
 *   WASTE (3e, 3f)    $5,400 held + $6,000 reworked + $7,200 waited and moved = $18,600 a month,
 *                     $6.20 a bicycle. Removing it takes average cost from $140 to $133.80, and
 *                     with the productivity gain to $127.80 — below the comparator's $132. That
 *                     is leaf 3f, "competitive advantage from lean production", as a number.
 *
 *   QUALITY (4a-4d)   inspecting at the end finds 4% of 3,000 = 120 bicycles at $50 = $6,000.
 *                     Building the checks into each stage takes the rate to 1.5% and the unit cost
 *                     of a correction to $16: 45 bicycles, $720. 0.8% still reach a customer, at
 *                     $180 each = $4,320 — the cost that never appears on a production report.
 *
 * Money: one symbol, `$`. No year, no real company, no UK frame. The assembler and its comparator
 * are invented, and the runner refuses a named real firm.
 */
import { createHash } from 'node:crypto';

export const SECTION = 'resource-management';

const norm = (s) => String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
export const hash8 = (s) => createHash('sha1').update(norm(s)).digest('hex').slice(0, 8);
export const id = (kind, key) => `${SECTION}:${kind}:${hash8(key)}`;
export const subId = (s) => `${SECTION}:sub:${s}`;

export const round3 = (n) => Math.round(n * 1000) / 1000;
export const round2 = (n) => Math.round(n * 100) / 100;
export const round1 = (n) => Math.round(n * 10) / 10;
export const round0 = (n) => Math.round(n);

/* ── formatting: one formatter a kind of figure (packet 18) ────────────────── */

const plain = (n) => (Number.isInteger(n)
  ? n.toLocaleString('en-GB')
  : round2(n).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));

/** Money. The ONLY currency symbol this section emits. */
export const usd = (n) => `$${plain(n)}`;
/** A count of things made, held or sold. Never money. */
export const units = (n, noun) => `${plain(n)}${noun ? ` ${noun}` : ''}`;
/** A percentage. */
export const pct = (n) => `${plain(round2(n))}%`;
/** Percentage POINTS — a difference between two percentages, never written with a % sign. */
export const pts = (n) => `${plain(round2(n))} percentage point${round2(n) === 1 ? '' : 's'}`;
/** A bare number: a ratio, an index, a count of days. */
export const num = (n) => plain(round2(n));
/** Days. */
export const days = (n) => `${plain(round2(n))} day${round2(n) === 1 ? '' : 's'}`;

/* ══ RULE 2 · the words this section may not say in prose ═══════════════════ */
/*
 * The exact five phrases the packet spec's acceptance check greps for, plus the two taxonomy
 * phrases the specification does not contain. Enforced by the runner over every readable string
 * EXCEPT the `<text>` content of a diagram SVG — leaf 3a needs the drawing to be labelled the way
 * a paper labels it, and nowhere else.
 */
export const BANNED_IN_PROSE = [
  [/stock control/i, 'the specification says "inventory control" (4 hits); "stock control" is 0'],
  [/buffer stock/i, 'the specification says "buffer inventory" (1 hit); "buffer stock" is 0'],
  [/re-?order level/i, 're-order level is 0 hits: it is a LABEL on the 3a drawing, not teaching vocabulary'],
  [/lead time/i, 'lead time is 0 hits: it is a LABEL on the 3a drawing. The spec\'s own phrase at 1e is "product lead-in times"'],
  [/stock-?out/i, 'stock-out is 0 hits; the specification\'s phrase is "implications of poor inventory control"'],
  [/seven wastes/i, 'seven wastes is 0 hits; leaf 3e is "waste minimisation" and this section costs three kinds of it'],
  [/cellular manufactur/i, 'the specification\'s word at 1a is the bare bullet "cell"'],
];

/*
 * ══ THE WORDS THAT ADDRESS THE AUDIT INSTEAD OF THE STUDENT ════════════════
 *
 * Verify B rejected this packet's first draft because 20 of 26 subsections OPENED with the audit's
 * own tree numbering — "Leaf 1a names four methods of production", "Leaf 3a asks for the
 * interpretation of an inventory control diagram". Nothing on screen defines "leaf". The content
 * was right and addressed to the wrong reader, and no check in the tree could see it: `validate`
 * reads schema and rules, Verify A reads the diff for coverage, and coverage was exactly what was
 * correct. So the class gets a guard rather than the 22 sentences getting an edit.
 *
 * The ban is the VOCABULARY of the build, not the vocabulary of the subject. A student has a
 * referent for "capacity utilisation" and none for "leaf 1b-4", "sub-topic 2" or "the audit". It
 * is enforced over every readable string INCLUDING diagram `<text>` bodies — there is no drawing
 * that needs to say "leaf" — which makes it stricter than `BANNED_IN_PROSE`, not a copy of it.
 *
 * `leaves` is a VERB three times in this section ("an improvement that leaves with the person who
 * made it"), so the plural is banned only behind a determiner or a count. A bare `/\bleaves\b/`
 * here would have failed the build on correct teaching prose and been loosened back out.
 *
 * The specification may still be QUOTED — "the specification's own wording is output per unit of
 * input per time period" is exam technique a student can use. What is banned is the specification
 * as the SPEAKER: a sentence where the document asks, requires or defines is a sentence addressed
 * to whoever is checking the document.
 */
export const SCAFFOLDING_IN_PROSE = [
  [/\bleaf\b/i, 'the audit\'s own tree word: "leaf 1a" is the build\'s numbering and a student has no referent for it. State the thing itself'],
  [/(?:\b(?:the|these|those|both|two|three|four|all|substantive|\d+)\s+)leaves\b/i, 'the same word in the plural ("the 28 leaves"); the VERB "leaves" is deliberately not banned'],
  [/\bsub-?topics?\b/i, 'the specification\'s filing word, not a student\'s: name the material ("capacity utilisation"), not the drawer it sits in'],
  [/\bspec(?:ification)?\s+points?\b/i, 'same defect wearing a different internal word'],
  [/\bthe\s+(?:audit|ledger)\b/i, 'the build talking about itself inside the thing it built'],
  [/\bpacket\s+\d/i, 'the build\'s own unit of work'],
  [/\bspec\s?gap\b/i, 'a ledger id, in prose'],
  [/\bspecification\s+(?:asks?|requires?|wants?|expects?|defines?|lists?|names?|says?)\b/i, 'the specification as the SPEAKER addresses the checker, not the student — quoting its wording ("the specification\'s own wording") stays allowed'],
];

/** Phrases that may appear ONLY as a label inside a diagram SVG. */
export const DIAGRAM_LABEL_ONLY = ['Maximum level', 'Re-order level', 'Buffer inventory', 'Lead time', 'Re-order quantity'];

/* ══ The specification's own lists, in its own order ════════════════════════ */

/** 1a — four methods, the fourth of which `specGap-04` says is taught as a lean aside today. */
export const METHODS = ['job', 'batch', 'flow', 'cell'];

/** 1b-2 — factors influencing productivity. `specGap-05`. */
export const PRODUCTIVITY_FACTORS = [
  'the skill and training of the workforce',
  'the quality and age of the equipment they work with',
  'how the work itself is organised and laid out',
  'motivation, and how the work is rewarded',
  'the reliability of the materials arriving',
];

/** 1b-4 — ways to improve productivity. */
export const PRODUCTIVITY_WAYS = [
  'train the workforce',
  'invest in better equipment',
  'reorganise the layout so less time is spent moving',
  'change how work is rewarded',
  'improve the reliability of what arrives from suppliers',
];

/** 1c-2 — factors influencing efficiency. `specGap-03`. */
export const EFFICIENCY_FACTORS = [
  'the scale the business operates at, because fixed costs are spread over the output',
  'how much capacity is being used',
  'how much has to be corrected, scrapped or held',
  'the price and reliability of what is bought in',
  'the method of production chosen for the volume being made',
];

/** 1c-3 — ways to improve efficiency. `specThin-01`. */
export const EFFICIENCY_WAYS = [
  'raise output towards the capacity that is already paid for',
  'cut the capacity that is not needed',
  'remove the waste that adds cost without adding value',
  'raise output per worker so each unit carries less labour cost',
  'buy in better, so less arrives faulty or late',
];

/** 3c — implications of poor inventory control. `specGap-02`, in the specification's vocabulary. */
export const POOR_INVENTORY = [
  'production stops when a part runs out, and the whole line waits for one item',
  'cash is tied up in items sitting on a shelf instead of in the business',
  'storage, insurance and handling have to be paid for whatever is held',
  'items deteriorate, are damaged, or are superseded before they are used',
  'orders are lost to a competitor who could deliver when the customer asked',
];

/** 3e — the three kinds of waste this section costs out. NOT a named taxonomy: see BANNED_IN_PROSE. */
export const WASTE_KINDS = ['holding more than is needed', 'correcting what was made wrong', 'waiting and moving'];

/** 2c — ways of improving capacity utilisation, BOTH directions (the leaf says "under and over"). */
export const RAISE_UTILISATION = [
  'sell more: promotion, a lower price, or a new market',
  'take in work for another business on subcontract',
  'reduce the capacity itself, by closing a line or redeploying staff',
];
export const RELIEVE_UTILISATION = [
  'send work out to a subcontractor',
  'add hours: overtime, a further shift, temporary staff',
  'invest in more capacity, which takes time and money',
  'manage the demand itself, by pricing or by scheduling it',
];

/** 4a, 4b, 4c, 4d — the quality family, in the specification's order. */
export const QUALITY_TERMS = ['control', 'assurance', 'circles'];

/* ══ THE BUSINESS · 2.3.4 · 1a-1e, 2a-2c, 3a-3f, 4a-4d ═════════════════════ */

export const BIZ = (() => {
  const firm = 'Anvari Cycles';
  const what = 'an assembler of bicycles that sells into its own region and into two neighbouring markets';
  const rival = 'Belvar Bikes';
  const product = 'bicycle';
  const products = 'bicycles';

  /* ── 2a · capacity utilisation, typed maximum and typed output ─────────── */
  const maxOutput = 4000;                 // typed: bicycles a month at normal hours
  const output = 3000;                    // typed: what is actually made
  const utilisation = round2((output / maxOutput) * 100);          // 75
  /* structure-10's twist: RATIONALISATION moves the denominator, not the numerator */
  const maxAfterClosure = 3200;           // typed: one of four lines closed
  const utilisationAfterClosure = round2((output / maxAfterClosure) * 100);   // 93.75
  const utilisationRisePts = round2(utilisationAfterClosure - utilisation);   // 18.75
  /* the peak month, which is leaf 2b's over-utilisation half */
  const peakOutput = 3900;                // typed
  const peakUtilisation = round2((peakOutput / maxOutput) * 100);   // 97.5

  /* ── 1c · the cost structure, and what "minimum average cost" means ─────── */
  const fixedCosts = 240000;              // typed: $ a month
  const materialsPerUnit = 24;            // typed: $ of materials in each bicycle
  const workers = 120;                    // typed
  const wagePerWorker = 900;              // typed: $ a worker a month
  const outputPerWorker = round2(output / workers);                 // 25
  const labourPerUnit = round2(wagePerWorker / outputPerWorker);    // 36
  const variableCost = round2(materialsPerUnit + labourPerUnit);    // 60
  const totalCost = (q, fixed = fixedCosts, variable = variableCost) => round2(fixed + variable * q);
  const averageCost = (q, fixed = fixedCosts, variable = variableCost) => round2(totalCost(q, fixed, variable) / q);
  const avgAtOutput = averageCost(output);            // 140
  const avgAtCapacity = averageCost(maxOutput);       // 120
  const fixedPerUnitAtOutput = round2(fixedCosts / output);         // 80
  const fixedPerUnitAtCapacity = round2(fixedCosts / maxOutput);    // 60
  const spareCapacityCostPerUnit = round2(fixedPerUnitAtOutput - fixedPerUnitAtCapacity);   // 20
  const spareCapacityCostMonthly = round2(spareCapacityCostPerUnit * output);               // 60,000
  /* the rationalisation twist, costed as well as measured */
  const fixedAfterClosure = 200000;       // typed: the closed line's own fixed charges go
  const avgAfterClosure = averageCost(output, fixedAfterClosure);   // 126.67

  /* ── 1b · productivity, and what it is worth per bicycle ───────────────── */
  const outputPerWorkerUp = 30;           // typed: after training and better jigs
  const productivityRisePct = round2(((outputPerWorkerUp - outputPerWorker) / outputPerWorker) * 100);  // 20
  const labourPerUnitUp = round2(wagePerWorker / outputPerWorkerUp);       // 30
  const labourSavingPerUnit = round2(labourPerUnit - labourPerUnitUp);     // 6
  const variableCostUp = round2(materialsPerUnit + labourPerUnitUp);       // 54
  const avgAtOutputUp = averageCost(output, fixedCosts, variableCostUp);   // 134

  /* ── 1d · the two methods, and the output at which they cost the same ──── */
  const autoExtraFixed = 90000;           // typed: the automated line's own monthly charge
  const autoFixed = round2(fixedCosts + autoExtraFixed);                   // 330,000
  const autoWorkers = 40;                 // typed
  const autoOutputPerWorker = round2(output / autoWorkers);                // 75
  const autoLabourPerUnit = round2((autoWorkers * wagePerWorker) / output); // 12
  const autoVariableCost = round2(materialsPerUnit + autoLabourPerUnit);   // 36
  const variableGap = round2(variableCost - autoVariableCost);             // 24
  /* DERIVED, not asserted: the crossover is the fixed gap over the variable gap */
  const crossoverOutput = round2(autoExtraFixed / variableGap);            // 3,750
  const avgLabourAtCrossover = averageCost(crossoverOutput);                             // 124
  const avgAutoAtCrossover = averageCost(crossoverOutput, autoFixed, autoVariableCost);  // 124
  const avgAutoAtOutput = averageCost(output, autoFixed, autoVariableCost);        // 146
  const avgAutoAtCapacity = averageCost(maxOutput, autoFixed, autoVariableCost);   // 118.5

  /* ── 3a, 3b · the inventory control diagram, every label derived ───────── */
  const tyresPerUnit = 2;                 // typed
  const workingDays = 20;                 // typed: a month
  const tyresPerDay = round2((output * tyresPerUnit) / workingDays);       // 300
  const maxInventory = 6000;              // typed: tyres the store holds
  const bufferInventory = 1200;           // typed
  const orderQuantity = round2(maxInventory - bufferInventory);            // 4,800
  const deliveryDelayDays = 4;            // typed
  const orderPoint = round2(bufferInventory + tyresPerDay * deliveryDelayDays);  // 2,400
  const cycleDays = round2(orderQuantity / tyresPerDay);                   // 16
  const bufferCoverDays = round2(bufferInventory / tyresPerDay);           // 4

  /* ── 3d · JIT, and the trade-off that replaces the Toyota claim ────────── */
  const holdingCostPerTyre = 1.5;         // typed: $ a tyre a month
  const averageInventory = round2((maxInventory + bufferInventory) / 2);   // 3,600
  const holdingCostMonthly = round2(averageInventory * holdingCostPerTyre); // 5,400
  const jitBuffer = round2(tyresPerDay);                                   // 300 — one day
  const jitMaxInventory = round2(jitBuffer + tyresPerDay);                 // 600
  const jitAverageInventory = round2((jitMaxInventory + jitBuffer) / 2);   // 450
  const jitHoldingCostMonthly = round2(jitAverageInventory * holdingCostPerTyre);  // 675
  const jitSavingMonthly = round2(holdingCostMonthly - jitHoldingCostMonthly);     // 4,725
  const price = 180;                      // typed: $ a bicycle
  const contribution = round2(price - variableCost);                       // 120
  const outputPerDay = round2(output / workingDays);                       // 150
  const stoppageCost = round2(outputPerDay * contribution);                // 18,000
  const stoppageMonthsOfSaving = round2(stoppageCost / jitSavingMonthly);  // 3.81

  /* ── 3e, 3f · waste, and what removing it is worth ─────────────────────── */
  const reworkRate = 4;                   // typed: % found at the final check
  const reworkUnits = round2(output * (reworkRate / 100));                 // 120
  const reworkCostLate = 50;              // typed: $ to put one right at the end
  const reworkCostMonthly = round2(reworkUnits * reworkCostLate);          // 6,000
  const waitingAndMovingMonthly = 7200;   // typed: the third kind, from the month's own audit
  const wasteMonthly = round2(holdingCostMonthly + reworkCostMonthly + waitingAndMovingMonthly);  // 18,600
  const wastePerUnit = round2(wasteMonthly / output);                      // 6.20
  const fixedAfterWaste = round2(fixedCosts - wasteMonthly);               // 221,400
  const avgAfterWaste = averageCost(output, fixedAfterWaste);              // 133.80
  const avgAfterWasteAndProductivity = averageCost(output, fixedAfterWaste, variableCostUp);  // 127.80
  const rivalAverageCost = 132;           // typed: the comparator's figure
  const advantagePerUnit = round2(rivalAverageCost - avgAfterWasteAndProductivity);   // 4.20
  /* 1c-1 again, on the improved curve: the MINIMUM of average cost is at capacity */
  const minimumAverageCost = averageCost(maxOutput, fixedAfterWaste, variableCostUp); // 109.35

  /* ── 4a-4d · what quality costs by the route chosen ────────────────────── */
  const assuranceRate = 1.5;              // typed: % needing correction once checks are in-stage
  const assuranceUnits = round2(output * (assuranceRate / 100));           // 45
  /* 16, not 15: at 15 the in-stage correction bill lands on $675, which is also what the JIT
     holding cost works out at. Two unrelated figures printing the same number in one section is
     how a reader starts checking whether one was copied from the other. */
  const reworkCostEarly = 16;             // typed: $ to put one right at the stage it happened
  const assuranceCostMonthly = round2(assuranceUnits * reworkCostEarly);   // 675
  const qualitySavingMonthly = round2(reworkCostMonthly - assuranceCostMonthly);  // 5,325
  const escapeRate = 0.8;                 // typed: % that still reach a customer faulty
  const escapeUnits = round2(output * (escapeRate / 100));                 // 24
  const warrantyCostPerUnit = 180;        // typed
  const warrantyCostMonthly = round2(escapeUnits * warrantyCostPerUnit);   // 4,320
  /* 2b, over-utilisation: the peak month's defect rate, and what it costs */
  const peakReworkRate = 6;               // typed
  const peakReworkUnits = round2(peakOutput * (peakReworkRate / 100));     // 234
  const normalRateAtPeak = round2(peakOutput * (reworkRate / 100));        // 156
  const peakExtraRework = round2(peakReworkUnits - normalRateAtPeak);      // 78
  const peakReworkCost = round2(peakExtraRework * reworkCostLate);         // 3,900
  const latePenalty = 8000;               // typed: $ of penalties in the peak month

  /* ── 1e · short product lead-in times ──────────────────────────────────── */
  const leadInMonthsBefore = 9;           // typed: design sign-off to first sale
  const leadInMonthsAfter = 5;            // typed
  const leadInMonthsSaved = round2(leadInMonthsBefore - leadInMonthsAfter);  // 4
  const newModelMonthlyUnits = 800;       // typed
  const leadInContributionMonthly = round2(newModelMonthlyUnits * contribution);      // 96,000
  const leadInContributionTotal = round2(leadInContributionMonthly * leadInMonthsSaved); // 384,000

  /* ── 2c · both directions, worked ──────────────────────────────────────── */
  const subcontractIn = 600;              // typed: units taken in from another business
  const outputWithSubcontract = round2(output + subcontractIn);            // 3,600
  const utilisationWithSubcontract = round2((outputWithSubcontract / maxOutput) * 100);  // 90
  const fixedPerUnitWithSubcontract = round2(fixedCosts / outputWithSubcontract);       // 66.67
  const subcontractOut = 400;             // typed: units of the peak sent out
  const inHouseAtPeak = round2(peakOutput - subcontractOut);               // 3,500
  const utilisationAfterRelief = round2((inHouseAtPeak / maxOutput) * 100);  // 87.5

  return {
    firm, what, rival, product, products,
    maxOutput, output, utilisation, maxAfterClosure, utilisationAfterClosure, utilisationRisePts,
    peakOutput, peakUtilisation,
    fixedCosts, materialsPerUnit, workers, wagePerWorker, outputPerWorker, labourPerUnit,
    variableCost, totalCost, averageCost, avgAtOutput, avgAtCapacity,
    fixedPerUnitAtOutput, fixedPerUnitAtCapacity, spareCapacityCostPerUnit, spareCapacityCostMonthly,
    fixedAfterClosure, avgAfterClosure,
    outputPerWorkerUp, productivityRisePct, labourPerUnitUp, labourSavingPerUnit, variableCostUp, avgAtOutputUp,
    autoExtraFixed, autoFixed, autoWorkers, autoOutputPerWorker, autoLabourPerUnit, autoVariableCost,
    variableGap, crossoverOutput, avgLabourAtCrossover, avgAutoAtCrossover, avgAutoAtOutput, avgAutoAtCapacity,
    tyresPerUnit, workingDays, tyresPerDay, maxInventory, bufferInventory, orderQuantity,
    deliveryDelayDays, orderPoint, cycleDays, bufferCoverDays,
    holdingCostPerTyre, averageInventory, holdingCostMonthly, jitBuffer, jitMaxInventory,
    jitAverageInventory, jitHoldingCostMonthly, jitSavingMonthly,
    price, contribution, outputPerDay, stoppageCost, stoppageMonthsOfSaving,
    reworkRate, reworkUnits, reworkCostLate, reworkCostMonthly, waitingAndMovingMonthly,
    wasteMonthly, wastePerUnit, fixedAfterWaste, avgAfterWaste, avgAfterWasteAndProductivity,
    rivalAverageCost, advantagePerUnit, minimumAverageCost,
    assuranceRate, assuranceUnits, reworkCostEarly, assuranceCostMonthly, qualitySavingMonthly,
    escapeRate, escapeUnits, warrantyCostPerUnit, warrantyCostMonthly,
    peakReworkRate, peakReworkUnits, normalRateAtPeak, peakExtraRework, peakReworkCost, latePenalty,
    leadInMonthsBefore, leadInMonthsAfter, leadInMonthsSaved, newModelMonthlyUnits,
    leadInContributionMonthly, leadInContributionTotal,
    subcontractIn, outputWithSubcontract, utilisationWithSubcontract, fixedPerUnitWithSubcontract,
    subcontractOut, inHouseAtPeak, utilisationAfterRelief,
  };
})();
