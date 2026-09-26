// Packet 12.8, E062 — print the "## Questions" and "## Model Answers" sections of
// content/data-response/econ-u1-market-failure.md FROM the bank's five data-question parts, so the md
// file and the bank say the same words. Run once to write the sections; R13 in
// audit/scripts/validate-model-answers.mjs (questions and tariffs) and drift-check.mjs in this
// directory (answer text) keep them the same afterwards.
import { MODEL_ANSWERS } from '../../../data/modelAnswersData.js';
const md = (html) => String(html)
  .replace(/<span class="ma-ann[^"]*">[^<]*<\/span>/g, '')
  .replace(/<strong>(.*?)<\/strong>/g, '**$1**')
  .replace(/<em>(.*?)<\/em>/g, '*$1*')
  .replace(/<[^>]+>/g, '')
  .replace(/&rsquo;/g, '’').replace(/&amp;/g, '&')
  .replace(/\s+/g, ' ').trim();
const parts = MODEL_ANSWERS.filter((a) => a.paper?.kind === 'data_question' && a.stimulus === 'econ-u1-market-failure')
  .sort((a, b) => a.paper.part.localeCompare(b.paper.part));
const out = ['## Questions', ''];
for (const p of parts) out.push(`**Question (${p.paper.part}) (${p.marks} marks)** — ${p.question}`, '');
out.push('## Model Answers', '');
for (const p of parts) {
  out.push(`### Question (${p.paper.part}) (${p.marks} marks)`, '');
  for (const para of p.script) out.push(md(para.segments.map((s) => s.html).join(' ')), '');
  out.push(`**Examiner note:** ${md(p.examinerCommentary)}`, '');
}
process.stdout.write(out.join('\n'));
