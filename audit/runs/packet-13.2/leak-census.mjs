/**
 * Can a student read step one's answer off the card without dividing?
 *
 * The obvious probe — enumerate the draw's own number sets and forecast pairs and compare the
 * fields — reuses the very filter it is meant to test, so it can only ever find what that filter
 * already knows about. Verify A round 3 found the leak it did not know about: `asPctOfRate`,
 * printed as the third choice, was guarded against `points` and against nothing else, and it was
 * step one's answer in 99 of 542,810 combinations.
 *
 * So this reads the SHIPPING OUTPUT instead. It builds the item and scans every string a student
 * can see BEFORE answering — the stem, every step's label, method, prefix and suffix, and every
 * choice button — for the answer to step one as a standalone number. Feedback notes and the
 * worked solution are excluded: they appear after marking, and the solution contains the answer
 * by design. A new field printed on the card is covered by this the day it is added.
 *
 *   node audit/runs/packet-13.2/leak-census.mjs [draws]
 */
import { templates, buildItem } from '../../../lib/quant/index.mjs';

const DRAWS = Number(process.argv[2]) || 20000;
const failures = [];

for (const template of templates) {
  for (let i = 0; i < DRAWS; i++) {
    const item = buildItem(template.id, `leak-${template.id}-${i}`);
    const first = item.steps[0];
    if (first.type === 'choice' || !Number.isFinite(first.answer)) continue;

    // Thousands separators come out first, or the probe reads "$6,240,000" as printing a 6 and
    // reports a leak nobody can see. The digits of one number have to stay one number.
    const visible = [
      item.stem,
      ...item.steps.flatMap((s) => [s.label, s.method, s.prefix, s.suffix, ...(s.choices || [])]),
    ].filter(Boolean).join(' · ').replace(/(\d),(?=\d)/g, '$1');

    // The answer as it would be written, and as a student would type it: 6.25 and 6.3 both
    // count, because step one is marked to a tolerance of 0.05.
    const forms = new Set([String(first.answer), String(Number(first.answer.toFixed(1)))]);
    for (const form of forms) {
      const found = new RegExp(`(^|[^0-9.])${form.replace('.', '\\.')}([^0-9.]|$)`).test(visible);
      if (found) {
        failures.push({ template: template.id, seed: `leak-${template.id}-${i}`, answer: first.answer, form });
        break;
      }
    }
  }
}

const total = templates.length * DRAWS;
console.log(`${templates.length} templates × ${DRAWS.toLocaleString('en-US')} draws = ${total.toLocaleString('en-US')} cards read`);
if (!failures.length) {
  console.log('clean — on no card is step one\'s answer printed anywhere the student can see before answering');
  process.exit(0);
}
const byTemplate = {};
for (const f of failures) (byTemplate[f.template] ||= []).push(f);
for (const [id, list] of Object.entries(byTemplate)) {
  console.log(`\n  ${id}: ${list.length} of ${DRAWS} (1 in ${Math.round(DRAWS / list.length).toLocaleString('en-US')})`);
  for (const f of list.slice(0, 3)) console.log(`    ${f.seed} — answer ${f.answer} printed as "${f.form}"`);
}
process.exit(1);
