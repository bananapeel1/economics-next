// Packet 12.7, E043/E044 — the md file and the bank must say the same thing.
// Reads the md file's "### Question N" answers by heading (not by line number) and compares, after
// normalising markup, entities and apostrophes, with (a) the bank item's answerParagraphs (chips
// stripped) and (b) its script segments joined. Also prints the AO split of each item's criteria.
import fs from 'node:fs';
import { MODEL_ANSWERS } from '../../../data/modelAnswersData.js';

const md = fs.readFileSync(new URL('../../../content/data-response/econ-u1-market-failure.md', import.meta.url), 'utf8');
const norm = (s) => s
  .replace(/<span class="ma-ann[^"]*">[^<]*<\/span>/g, ' ')
  .replace(/<[^>]+>/g, '')
  .replace(/\*\*|\*/g, '')
  .replace(/&rsquo;|’/g, "'").replace(/&amp;/g, '&')
  .replace(/\s+/g, ' ').trim();
function mdAnswer(n) {
  const start = md.indexOf(`### Question ${n} (`);
  const body = md.slice(md.indexOf('\n', start) + 1);
  const end = body.search(/\n\*\*Examiner note:\*\*/);
  return { heading: md.slice(start, md.indexOf('\n', start)), text: body.slice(0, end) };
}
// Question stems: the md italicises the defined term, the bank quotes it as a paper would; that is the
// only difference allowed, so quote marks are dropped for the stem comparison and nowhere else.
const stem = (s) => norm(s).replace(/['"]/g, '');
const ids = { 1: 'mf-extract-define-consumption-externality-2', 2: 'mf-extract-analyse-plastic-bag-charge-6', 3: 'mf-extract-evaluate-soft-drinks-excise-20' };
let bad = 0;
for (const [n, id] of Object.entries(ids)) {
  const item = MODEL_ANSWERS.find((a) => a.id === id);
  const { heading, text } = mdAnswer(n);
  const m = norm(text);
  const paras = norm(item.answerParagraphs.map((p) => p.html).join(' '));
  const segs = norm(item.script.flatMap((p) => p.segments.map((s) => s.html)).join(' '));
  const qMd = (md.match(new RegExp(`\\*\\*Question ${n} \\((\\d+) marks\\)\\*\\* — (.*)`)) || []);
  const ao = {};
  for (const c of item.criteria) { const k = (c.band.match(/AO\d/) || ['(no AO)'])[0]; ao[k] = (ao[k] || 0) + c.marks; }
  const ok = m === paras && m === segs && Number(qMd[1]) === item.marks && stem(qMd[2]) === stem(item.question);
  if (!ok) bad++;
  console.log(`${ok ? 'MATCH' : 'DRIFT'}  Q${n}  ${heading}  md-words=${m.split(' ').length}`);
  console.log(`   md==answerParagraphs ${m === paras} · md==script ${m === segs} · tariff md ${qMd[1]} / bank ${item.marks} · question text equal ${stem(qMd[2] || '') === stem(item.question)}`);
  console.log(`   criteria by AO: ${JSON.stringify(ao)} · segRoles: ${[...new Set(item.criteria.map((c) => c.segRole))].join(',')}`);
}
process.exit(bad ? 1 : 0);
