// Packet 12.8, E062 — the md file and the bank say the same words, for all five data-question parts.
// Adapted from packet 12.7's drift-check (which knew three numbered questions). Reads the md file's
// "### Question (x)" answers BY HEADING and compares, after normalising markup, entities and quote
// marks, with the bank item's answerParagraphs (chips stripped) and with its script segments joined,
// and the md question line with the bank's question. R13 in validate-model-answers.mjs holds the
// questions and tariffs permanently; this holds the answer text, and exits 1 on any drift.
import fs from 'node:fs';
import { MODEL_ANSWERS } from '../../../data/modelAnswersData.js';

const md = fs.readFileSync(new URL('../../../content/data-response/econ-u1-market-failure.md', import.meta.url), 'utf8');
const norm = (s) => s
  .replace(/<img[^>]*>/g, ' ')
  .replace(/<span class="ma-ann[^"]*">[^<]*<\/span>/g, ' ')
  .replace(/<[^>]+>/g, '')
  .replace(/\*\*|\*/g, '')
  .replace(/&rsquo;|’/g, "'").replace(/&amp;/g, '&')
  .replace(/\s+/g, ' ').trim();
const stem = (s) => norm(s).replace(/['"‘“”]/g, '');
const parts = MODEL_ANSWERS.filter((a) => a.paper?.kind === 'data_question' && a.stimulus === 'econ-u1-market-failure');
let bad = 0;
for (const item of parts.sort((a, b) => a.paper.part.localeCompare(b.paper.part))) {
  const p = item.paper.part;
  const head = `### Question (${p}) (`;
  const start = md.indexOf(head);
  if (start === -1) { console.log(`MISSING  (${p}) ${item.id}`); bad++; continue; }
  const body = md.slice(md.indexOf('\n', start) + 1);
  const answer = norm(body.slice(0, body.search(/\n\*\*Examiner note:\*\*/)));
  const paras = norm(item.answerParagraphs.map((x) => x.html).join(' '));
  const segs = norm(item.script.flatMap((x) => x.segments.map((s) => s.html)).join(' '));
  const q = (md.match(new RegExp(`\\*\\*Question \\(${p}\\) \\((\\d+) marks\\)\\*\\* — (.*)`)) || []);
  const note = norm((body.match(/\*\*Examiner note:\*\* (.*)/) || [])[1] || '');
  const ok = answer === paras && answer === segs && Number(q[1]) === item.marks && stem(q[2] || '') === stem(item.question) && note === norm(item.examinerCommentary);
  if (!ok) bad++;
  console.log(`${ok ? 'MATCH' : 'DRIFT'}  (${p}) ${item.marks}m ${item.commandWord.padEnd(8)} md-words=${answer.split(' ').length}`);
  console.log(`   md==answerParagraphs ${answer === paras} · md==script ${answer === segs} · tariff ${q[1]}/${item.marks} · question ${stem(q[2] || '') === stem(item.question)} · examiner note ${note === norm(item.examinerCommentary)}`);
}
process.exit(bad ? 1 : 0);
