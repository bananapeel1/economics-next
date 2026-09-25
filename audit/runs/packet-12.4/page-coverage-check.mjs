/**
 * E026 — does the headline on each model-answer page equal what lib/spec-coverage.js computes for
 * the questions that page actually displays?
 *
 * The expected value is computed here from the module the page uses (`sectionCoverage`) over the
 * same item list the route builds (`MODEL_ANSWERS` for the section, valid IAL tariffs only). The
 * observed value is scraped out of the served HTML. If the page ever restated the computation
 * instead of calling the module, these two would drift apart and this check is what would say so.
 *
 *   node audit/runs/packet-12.4/page-coverage-check.mjs [base]     default http://localhost:3001
 */
import { MODEL_ANSWER_PAGES, modelAnswersPath } from '../../../data/modelAnswerPages.js';
import { MODEL_ANSWERS } from '../../../data/modelAnswersData.js';
import { isValidTariff } from '../../../lib/practice-tariffs.js';
import { sectionCoverage } from '../../../lib/spec-coverage.js';

const BASE = process.argv[2] || 'http://localhost:3001';
const only = process.argv[3];

const strip = (s) => s.replace(/<[^>]+>/g, '').replace(/&#x27;|&#39;/g, "'").replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ');

let fails = 0;
let checked = 0;
const rows = [];
for (const page of MODEL_ANSWER_PAGES) {
  if (only && only !== 'all' && page.subject !== only) continue;
  const written = MODEL_ANSWERS
    .filter((a) => a.subject === page.subject && a.sectionNumber === page.sectionNumber)
    .filter((a) => isValidTariff(page.subject, a.commandWord, a.marks));
  const cov = sectionCoverage({
    subject: page.subject,
    topic: page.sectionNumber,
    slug: page.sectionId,
    items: written.map((a) => ({
      bank: 'modelAnswers', ref: a.id, command: a.commandWord, commandWord: a.commandWord,
      marks: a.marks, question: a.question, specItems: a.specItems, kind: a.kind, ao: a.ao,
      stimulusRef: a.stimulusRef, subject: page.subject,
    })),
  });
  const url = `${BASE}${modelAnswersPath(page)}`;
  const res = await fetch(url);
  // React splits adjacent text nodes with an empty comment, so `{examined} of {leaves}` is served as
  // "8<!-- --> of <!-- -->19". Remove them before matching or every assertion below misses.
  const html = (await res.text()).replace(/<!-- -->/g, '');

  const pct = html.match(/class="lab-coverage-pct">([\d.]+)%<\/span>/);
  const head = strip((html.match(/<h2 id="lab-coverage-head"[^>]*>([\s\S]*?)<\/h2>/) || [])[1] || '');
  const examines = head.match(/examines\s+(\d+)\s+of\s+(\d+)\s+requirements/);
  const floor = /carry no spec tag yet, so this number is a floor/.test(html);
  const title = strip((html.match(/<title[^>]*>([\s\S]*?)<\/title>/) || [])[1] || '');

  const problems = [];
  if (res.status !== 200) problems.push(`HTTP ${res.status}`);

  // E031: a page with no questions shows no percentage at all, and says so in words. Checking it
  // against the same regex as a page with questions would read "no percentage" as a failure, which
  // is the behaviour the packet deliberately introduced.
  if (written.length === 0) {
    const says = /No questions on this page yet, so there is no coverage figure/.test(html);
    if (pct) problems.push('a page with no questions still prints a percentage');
    if (!says) problems.push('a page with no questions does not say so in the coverage block');
    if (/requirements in .* that no question on this page examines/.test(html)) {
      problems.push('a page with no questions still enumerates the requirements it does not examine');
    }
    checked++;
    if (problems.length) fails++;
    rows.push({ slug: page.slug, subject: page.subject, status: res.status, pct: 'none',
      computed: 'n/a', examined: 0, leaves: cov.leaves, qs: 0, untagged: 0, floor: false, title, problems });
    continue;
  }

  if (!pct) problems.push('no coverage percentage in the HTML');
  else if (pct[1] !== cov.pct.toFixed(1)) problems.push(`pct ${pct[1]}% != computed ${cov.pct.toFixed(1)}%`);
  if (!examines) problems.push('no "examines X of Y requirements" line');
  else {
    if (Number(examines[1]) !== cov.examined) problems.push(`examined ${examines[1]} != computed ${cov.examined}`);
    if (Number(examines[2]) !== cov.leaves) problems.push(`leaves ${examines[2]} != computed ${cov.leaves}`);
  }
  if (cov.untagged > 0 && !floor) problems.push(`${cov.untagged} untagged question(s) but no floor caveat`);
  if (cov.untagged === 0 && floor) problems.push('floor caveat shown with nothing untagged');

  checked++;
  if (problems.length) fails++;
  rows.push({ slug: page.slug, subject: page.subject, status: res.status, pct: pct ? `${pct[1]}%` : '-',
    computed: `${cov.pct.toFixed(1)}%`, examined: cov.examined, leaves: cov.leaves, qs: written.length,
    untagged: cov.untagged, floor, title, problems });
}

for (const r of rows) {
  console.log(`${r.problems.length ? 'FAIL' : 'ok  '}  ${r.subject.slice(0, 4)}  ${r.slug.padEnd(48)} ${String(r.status)}  page ${r.pct.padStart(6)} = computed ${r.computed.padStart(6)}  (${r.examined}/${r.leaves} over ${r.qs} q, ${r.untagged} untagged, floor ${r.floor ? 'yes' : 'no'})${r.problems.length ? `  → ${r.problems.join('; ')}` : ''}`);
}
console.log('');
console.log(`${checked} pages checked, ${fails} failing`);
process.exit(fails ? 1 : 0);
