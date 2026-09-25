/**
 * Packet 13.2, fix round 1 — four defects, applied in one pass AFTER both verifiers reported.
 *
 * Held until then deliberately: the dev server on 3001 hot-reloads, and Verify B was mid-walk.
 * A file that moves under a verifier is how packet 16 ended up re-running a round.
 *
 *   1. (verifier, unclaimed-but-relevant) `payback` reaches no student. Its only section has two
 *      check-ins, slot 0 is reserved, `arr` takes the single free slot and the Quiz tab takes
 *      templatesForSection(...)[0], which is `arr` in registry order. One of the three templates
 *      this packet built renders nowhere — the exact defect the packet OPENED with, arriving by a
 *      different route. Slot 0 is now released when, and only when, reserving it would leave a
 *      drill unplaced: an unreachable drill is worse than a calculation at the first check-in.
 *   2. (verifier, under D020) an empty `unitCode` skipped the unit check while
 *      `subjectFrom('')` defaults to economics, so a Business section with no unit code would be
 *      handed `multiplier` on 2.3.4. Unreachable today; one `||` away. No unit code, no drill.
 *   3. (builder) `QuizTab`'s QuantCard had no `key`, so "New figures" redrew the question and left
 *      the student's old answers in the boxes and the old marking under them. CalculationItem's own
 *      header states the contract: callers pass key={item.id}.
 *   4. (builder) the Economics stem printed the answer to its own first step — "Forecasters expect
 *      the rate of growth to fall from 5% to 4.1%" over figures whose growth rate IS 5%. The
 *      forecast rate moves into the QS10 step's label, so the fall in points is derivable from the
 *      student's own step 1 and from nothing else.
 */
import { readFileSync, writeFileSync } from 'node:fs';

const edit = (path, pairs) => {
  let s = readFileSync(path, 'utf8');
  for (const [from, to] of pairs) {
    if (!s.includes(from)) { console.error(`MISS in ${path}: ${from.slice(0, 70)}…`); process.exit(1); }
    s = s.replace(from, to);
  }
  writeFileSync(path, s);
  console.log(`patched ${path} (${pairs.length})`);
};

/* ── 1 + 2: lib/quant-pool.js ── */
edit('lib/quant-pool.js', [
  [`  return templates.filter((t) => (
    t.subject === subject
    && t.specCode === number
    // A missing unit code on the section is not a reason to withhold the drill — the spec
    // number already identifies the section within a subject — but a mismatched one is.
    && (!unitCode || String(t.unit).toUpperCase() === unitCode)
  ));`,
   `  // No unit code, no drill. This used to fall through to "the spec number identifies the
  // section within a subject", which is true and beside the point: the SUBJECT comes from
  // \`subjectFrom(unitCode)\` at both call sites, and that defaults to economics on an empty
  // string (lib/ial-commands.js:36-40). A Business section arriving without its unit code would
  // therefore be read as Economics and handed \`multiplier\` on 2.3.4 — a macro drill on
  // resource management. Not reachable today; one missing prop away.
  if (!unitCode) return [];

  return templates.filter((t) => (
    t.subject === subject
    && t.specCode === number
    && String(t.unit).toUpperCase() === unitCode
  ));`],

  [` *   2. Otherwise, spread what is left over the check-ins after the first — never the first
 *      itself, because a six-mark calculation as the first thing a student is asked for is
 *      the step-0 wall packet 5 exists to pull down, moved four screens later. A matched
 *      drill may use the first check-in: there the chapter it belongs to is the reason.
 *   3. One drill per check-in, always.`,
   ` *   2. Otherwise, spread what is left over the check-ins after the first — never the first
 *      itself, because a six-mark calculation as the first thing a student is asked for is
 *      the step-0 wall packet 5 exists to pull down, moved four screens later. A matched
 *      drill may use the first check-in: there the chapter it belongs to is the reason.
 *   3. One drill per check-in, always — but the reservation in 2 yields before a drill goes
 *      unplaced. \`decision-making-techniques\` is the case that forced this: two check-ins, two
 *      drills, and reserving slot 0 left \`payback\` rendering nowhere in the product while
 *      passing every guard in the tree. An unreachable drill is worse than an early one.`],

  [`    const free = [];
    for (let i = 1; i < count; i++) if (!taken.has(i)) free.push(i);   // rule 2: never slot 0
    const n = Math.min(unmatched.length, free.length);`,
   `    const free = [];
    for (let i = 1; i < count; i++) if (!taken.has(i)) free.push(i);   // rule 2: not slot 0…
    // …unless holding it back would leave a drill with nowhere to go (rule 3).
    if (free.length < unmatched.length && !taken.has(0)) free.unshift(0);
    const n = Math.min(unmatched.length, free.length);`],
]);

/* ── 3: components/QuizTab.jsx ── */
edit('components/QuizTab.jsx', [
  [`      <CalculationItem item={item} onReseed={onReseed} />`,
   `      {/* key={item.id}: the card's own contract. Without it "New figures" redrew the question
          and left the previous answers in the boxes with the previous marking under them. */}
      <CalculationItem key={item.id} item={item} onReseed={onReseed} />`],
]);

/* ── 4: lib/quant/templates/percentage-change.mjs ── */
edit('lib/quant/templates/percentage-change.mjs', [
  [`    stem:
      \`Real GDP in **\${d.context}** was **$\${num(d.before)} billion** last year and \` +
      \`**$\${num(d.after)} billion** this year. Forecasters expect the rate of growth to fall \` +
      \`from **\${d.rateNow}%** to **\${d.rateNext}%** over the next two years.\`,`,
   `    // The forecast rate the QS10 step needs is in that step's own label, not here. In the stem
    // it printed the answer to step one: the rate it says growth is falling FROM is the rate the
    // stem's own two figures produce, so a student could read 5% off the question without
    // dividing — and since the other two steps carry from step one, the own figure rule never
    // got exercised either.
    stem:
      \`Real GDP in **\${d.context}** was **$\${num(d.before)} billion** last year and \` +
      \`**$\${num(d.after)} billion** this year.\`,`],

  [`        label: 'The forecast fall in the growth rate, and what it means for output',`,
   `        label: \`Forecasters expect growth of \${d.rateNext}% next year. Against this year's rate, that is\`,`],

  [`        answer: \`\${points(d)} — real GDP still rises, more slowly\`,
        choices: [
          \`\${points(d)} — real GDP still rises, more slowly\`,
          \`\${d.points}% — real GDP falls\`,
          \`\${d.asPctOfRate}% — real GDP falls\`,
        ],
        correctNote:
          \`\${d.rateNow}% to \${d.rateNext}% is a fall of \${points(d)}. Both rates are positive, \` +`,
   `        answer: \`\${points(d)} lower — real GDP still rises, more slowly\`,
        choices: [
          \`\${points(d)} lower — real GDP still rises, more slowly\`,
          \`\${d.points}% lower — real GDP falls\`,
          \`\${d.asPctOfRate}% lower — real GDP falls\`,
        ],
        correctNote:
          \`Growth this year was \${d.rateNow}%. \${d.rateNow}% to \${d.rateNext}% is a fall of \${points(d)}. Both rates are positive, \` +`],

  [`      \`\${d.rateNow}% − \${d.rateNext}% = **\${points(d)}**, not \${d.points}% — and not the \${d.asPctOfRate}% fall in the rate itself\`,`,
   `      \`Against next year's forecast: \${d.rateNow}% − \${d.rateNext}% = **\${points(d)}**, not \${d.points}% — and not the \${d.asPctOfRate}% fall in the rate itself\`,`],
]);

console.log('\nfix round 1 applied. Re-run: npm run quant-check, node --test lib/quant-pool.test.mjs, npm test, npm run build.');
