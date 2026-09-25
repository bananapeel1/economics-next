/**
 * Packet 12.3 — what is actually in the server HTML of all 32 model-answer pages.
 *
 * Reads `.next/server/app/**` — the bytes Next emitted — not the data file the pages were built
 * from. Acceptance checks 3 and 4 plus E021's structured data. Run after `npm run build`.
 */

import fs from 'node:fs';
import path from 'node:path';

// A snapshot of `.next/server/app`'s model-answer HTML, taken the moment the build finished.
// Four sessions share this worktree and one of them wiped `.next` under this script's first run;
// verifying a snapshot means the evidence cannot vanish between the build and the check.
const BUILT = path.join(process.cwd(), 'audit', 'runs', 'packet-12.3', 'built-html');
const problems = [];
const rows = [];

for (const subject of ['economics', 'business']) {
  const dir = path.join(BUILT, subject);
  for (const name of fs.readdirSync(dir).filter((n) => n.endsWith('-model-answers.html')).sort()) {
    const url = `/${subject}/${name.replace(/\.html$/, '')}`;
    const html = fs.readFileSync(path.join(dir, name), 'utf8');

    const questions = (html.match(/class="lab-item-question"/g) || []).length;
    const markSchemes = (html.match(/Mark scheme/g) || []).length;
    const midBand = html.includes('lab-details-midband');
    // React separates adjacent text nodes with `<!-- -->` in SSR output, so the sentence is
    // "examines <!-- -->2<!-- --> of <!-- -->35<!-- --> requirements" in the bytes. The first
    // version of this check looked for the sentence a human reads and failed on all 32 pages while
    // every page was in fact correct — the raw HTML settled it, not the assertion.
    const coverage = /This page examines (?:<!-- -->)?\d+(?:<!-- -->)? of (?:<!-- -->)?\d+(?:<!-- -->)? requirements/.test(html);
    const emptyNote = html.includes('lab-empty-note');

    // The Quiz block, parsed rather than pattern-matched: invalid JSON is a broken rich result.
    const blocks = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map((m) =>
      m[1].replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>'),
    );
    let quiz = null;
    for (const raw of blocks) {
      let parsed;
      try { parsed = JSON.parse(raw); } catch { problems.push(`${url}: a JSON-LD block does not parse`); continue; }
      if (parsed['@type'] === 'Quiz') quiz = parsed;
    }

    if (questions === 0 && !emptyNote) problems.push(`${url}: no question and no empty state`);
    if (questions > 0 && markSchemes === 0) problems.push(`${url}: acceptance check 4 — no mark scheme in the server HTML`);
    if (questions > 0 && !quiz) problems.push(`${url}: has questions but no Quiz structured data`);
    if (questions === 0 && quiz) problems.push(`${url}: emits a Quiz with no questions on the page`);
    if (!coverage) problems.push(`${url}: no coverage line`);

    if (quiz) {
      const parts = quiz.hasPart || [];
      if (parts.length !== questions) problems.push(`${url}: Quiz claims ${parts.length} questions, page shows ${questions}`);
      const props = new Set(parts.flatMap((p) => Object.keys(p)));
      const allowed = new Set(['@type', 'name', 'text', 'answerCount', 'acceptedAnswer']);
      for (const p of props) if (!allowed.has(p)) problems.push(`${url}: unexpected Question property "${p}"`);
      for (const p of parts) {
        if (p['@type'] !== 'Question') problems.push(`${url}: hasPart member is not a Question`);
        if (!p.text) problems.push(`${url}: a Question has no text`);
        if (!p.acceptedAnswer?.text) problems.push(`${url}: a Question has no acceptedAnswer text`);
        if (p.acceptedAnswer && p.acceptedAnswer['@type'] !== 'Answer') problems.push(`${url}: acceptedAnswer is not an Answer`);
        if (/<[a-z]/i.test(p.acceptedAnswer?.text || '')) problems.push(`${url}: acceptedAnswer still carries HTML tags`);
      }
    }

    rows.push({ url, questions, markSchemes, midBand, coverage, quiz: quiz ? (quiz.hasPart || []).length : 0, emptyNote });
  }
}

const pad = (s, n) => String(s).padEnd(n);
console.log(pad('url', 58), pad('Q', 3), pad('MS', 3), pad('mid', 4), pad('cov', 4), pad('quiz', 5), 'empty');
for (const r of rows) {
  console.log(pad(r.url, 58), pad(r.questions, 3), pad(r.markSchemes, 3), pad(r.midBand ? 'y' : '-', 4), pad(r.coverage ? 'y' : '-', 4), pad(r.quiz, 5), r.emptyNote ? 'y' : '-');
}
console.log(`\npages: ${rows.length}  with questions: ${rows.filter((r) => r.questions > 0).length}  empty state: ${rows.filter((r) => r.emptyNote).length}`);
for (const p of problems) console.log('PROBLEM', p);
console.log(problems.length === 0 ? 'PASS' : `FAIL (${problems.length})`);
process.exit(problems.length === 0 ? 0 : 1);
