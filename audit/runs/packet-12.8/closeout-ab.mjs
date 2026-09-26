// Close-out A/B for E057 (packet 12.8). Mutates a CLONE of the worktree (scratchpad), never the
// worktree, and runs the full validator CLI end to end (--json) on each mutation. B = the close-out
// validator; A2 = the frozen round-2 validator (only its R9 findings are compared: its R13 expects
// the md "## Questions" the close-out removed).
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import crypto from 'node:crypto';

const CLONE = process.argv[2];
const MD = path.join(CLONE, 'content/data-response/econ-u1-market-failure.md');
const DATA = path.join(CLONE, 'data/modelAnswersData.js');
const EXP_LINE = 'export const MODEL_ANSWERS = [...BASE_ANSWERS, ...EXPANSION_ANSWERS];';
const md0 = fs.readFileSync(MD, 'utf8');
const data0 = fs.readFileSync(DATA, 'utf8');
const sha = (s) => crypto.createHash('sha256').update(s).digest('hex').slice(0, 12);

function run(script) {
  try {
    const out = execFileSync(process.execPath, [`audit/scripts/${script}`, '--json'], { cwd: CLONE, stdio: ['ignore', 'pipe', 'ignore'] });
    return JSON.parse(out).findings;
  } catch (e) { return JSON.parse(e.stdout.toString()).findings; }
}
const bankWith = (expr) => data0.replace(EXP_LINE, `export const MODEL_ANSWERS = ((xs) => ${expr})([...BASE_ANSWERS, ...EXPANSION_ANSWERS]);`);
const before = (anchor, add) => (m) => { if (!m.includes(anchor)) throw new Error(`anchor ${anchor}`); return m.replace(anchor, add + anchor); };
const DQ = (id) => `x.id === '${id}'`;
const E = 'mf-extract-evaluate-soft-drinks-excise-20';

const CASES = [
  ['C0', 'control: unmutated clone', null, null],
  ['Ma1', '(a) md carries "## Questions" again (one bank question line)', before('## Model Answers', '## Questions\n\n**Question (a) (2 marks)** — Define the term \'negative externality of consumption\', using an example from the stimulus.\n\n'), null],
  ['Ma2', '(a) md carries "## questions" (lower case), empty', before('## Model Answers', '## questions\n\n'), null],
  ['Mb1', '(b) new H2 "## Extension task" with a (f) (20 marks) task', before('## Common Mistakes', '## Extension task\n\n**(f) (20 marks)** — Evaluate whether a sugar-content tax would be more effective than the current 50% excise.\n\n'), null],
  ['Mb2', '(b) setext H2 "Extension task\\n---" (no # at all)', before('## Common Mistakes', 'Extension task\n---\n\nEvaluate whether a sugar-content tax would be more effective.\n\n'), null],
  ['Mb3', '(b) H3 "### Extension (20 marks)" inside Common Mistakes', before('## Diagram Reference', '### Extension (20 marks)\n\nEvaluate whether a sugar-content tax would be more effective.\n\n'), null],
  ['Mb4', '(b) "## Diagram Reference" repeated', (m) => `${m}\n## Diagram Reference\n\n- another\n`, null],
  ['Mb5', '(b) second H1 "# Question (f) (20 marks)" at the end', (m) => `${m}\n# Question (f) (20 marks)\n\nEvaluate whether a sugar-content tax would be more effective.\n`, null],
  ['Mb6', 'no-fire control: "## Extension" inside a fenced code block (the page renders code, not a heading)', before('## Common Mistakes', '```\n## Extension task\n```\n\n'), null],
  ['Mc1', '(c) extra "### Question (f) (20 marks)" in Model Answers', before('## Common Mistakes', '### Question (f) (20 marks)\n\nAn answer.\n\n'), null],
  ['Mc2', '(c) heading tariff drift: (e) headed at 20 marks', (m) => m.replace('### Question (e) (14 marks)', '### Question (e) (20 marks)'), null],
  ['Mc3', '(c) (c) and (d) headings swapped in order', (m) => m.replace('### Question (c) (6 marks)', '@@C@@').replace('### Question (d) (8 marks)', '### Question (c) (6 marks)').replace('@@C@@', '### Question (d) (8 marks)'), null],
  ['Mc4', '(c) the (b) heading removed', (m) => m.replace('### Question (b) (4 marks)\n\n', ''), null],
  ['Mc5', '(c) "#### Question (f) (20 marks)" (H4) under Model Answers', before('## Common Mistakes', '#### Question (f) (20 marks)\n\nAn answer.\n\n'), null],
  ['Mc6', '(c) "### Question (b) (4 marks)" twice', before('## Common Mistakes', '### Question (b) (4 marks)\n\nAgain.\n\n'), null],
  ['Mc7', '(c) heading in emphasis markup "### Question (f) (**20** marks)" (parsed text, not raw)', before('## Common Mistakes', '### Question (f) (**20** marks)\n\nAn answer.\n\n'), null],
  ['Bk1', 'bank: a part (f) added (copy of (e), 20 marks, stimulus unchanged)', null, `[...xs, { ...xs.find((x) => ${DQ(E)}), id: 'mf-extract-extra-f-20', marks: 20, paper: { section: 'C', kind: 'data_question', part: 'f' } }]`],
  ['Bk2', "bank: (e)'s tariff changed 14 -> 20", null, `xs.map((x) => ${DQ(E)} ? { ...x, marks: 20 } : x)`],
  ['Bk3', 'bank: (b) and (d) tariffs swapped (multiset unchanged, so R10 stays quiet)', null, `xs.map((x) => x.id === 'mf-extract-explain-tobacco-social-cost-4' ? { ...x, marks: 8 } : x.id === 'mf-extract-examine-bag-charge-optimum-8' ? { ...x, marks: 4 } : x)`],
  ['Bk4', 'bank: (c) stem edited (single source: nothing to drift, validator silent; page shows it, see page A/B)', null, `xs.map((x) => x.id === 'mf-extract-analyse-plastic-bag-charge-6' ? { ...x, question: x.question.replace('is likely to correct', 'is likely to reduce') } : x)`],
  ['Bk5', 'bank: every paper field stripped (file-side R13)', null, `xs.map(({ paper, ...x }) => x)`],
  ['Bk6', 'bank: a second page claims the same stimulus (1.3.5 parts copied to section 9.9.9)', null, `[...xs, ...xs.filter((x) => x.paper && x.paper.kind === 'data_question').map((x) => ({ ...x, id: x.id + '-dup', sectionNumber: '9.9.9' }))]`],
  ['T1', 'R9 tag strip: short-answer context "(0 < |PED| < 1)" prose, then (20 marks), then a later ">" line', null, `xs.map((x) => x.id === 'mf-short-explain-sea-wall-public-good-4' ? { ...x, paper: { ...x.paper, context: 'Demand here is inelastic (0 < |PED| < 1).\\n\\nExtension (20 marks): evaluate the scheme.\\n\\n> A resident said the wall was overdue.' } } : x)`],
  ['T2', 'R9 no-fire control: the same "(0 < |PED| < 1)" and ">" prose with no tariff', null, `xs.map((x) => x.id === 'mf-short-explain-sea-wall-public-good-4' ? { ...x, paper: { ...x.paper, context: 'Demand here is inelastic (0 < |PED| < 1).\\n\\n> A resident said the wall was overdue.' } } : x)`],
  ['T3', 'R9 no-fire control: a real tag is still stripped (<span title="(20)">, whose attribute alone would match)', null, `xs.map((x) => x.id === 'mf-short-explain-sea-wall-public-good-4' ? { ...x, paper: { ...x.paper, context: 'The council must <span title="(20)">decide</span> whether to build it.' } } : x)`],
  ['T4', 'T3 with the tag unstripped (attribute text in the prose) fires, so T3 is not blind', null, `xs.map((x) => x.id === 'mf-short-explain-sea-wall-public-good-4' ? { ...x, paper: { ...x.paper, context: 'The council must decide (20) whether to build it.' } } : x)`],
  ['R1', 'STATED RESIDUAL: a tariffed task as free prose inside Common Mistakes', before('## Diagram Reference', '**Extension (20 marks):** Evaluate whether a sugar-content tax would be more effective.\n\n'), null],
  ['C1', 'control after every restore', null, null],
];

const rows = [];
for (const [id, what, mdFn, bankExpr] of CASES) {
  fs.writeFileSync(MD, md0); fs.writeFileSync(DATA, data0);
  const md1 = mdFn ? mdFn(md0) : md0;
  const data1 = bankExpr ? bankWith(bankExpr) : data0;
  if (mdFn && md1 === md0) throw new Error(`${id} md mutation did not apply`);
  if (bankExpr && data1 === data0) throw new Error(`${id} bank mutation did not apply`);
  fs.writeFileSync(MD, md1); fs.writeFileSync(DATA, data1);
  const B = run('validate-model-answers.mjs');
  const A2 = run('validate-model-answers.round2.mjs');
  const tag = (f) => f.rule + (f.rule === 'R13' ? (f.detail.match(/^\((a|b|c)\)/) || ['', ''])[0] : '');
  const count = (fs_) => Object.entries(fs_.reduce((m, f) => ((m[tag(f)] = (m[tag(f)] || 0) + 1), m), {})).map(([k, v]) => `${k}×${v}`).join(' ') || '0';
  rows.push({ id, what, mutated: `${mdFn ? `md ${sha(md1)}` : ''}${bankExpr ? `bank ${sha(data1)}` : ''}` || '-', B: count(B), A2_R9: A2.filter((f) => f.rule === 'R9').length, first: B[0] ? `${B[0].rule} ${B[0].detail}`.slice(0, 170) : '' });
}
fs.writeFileSync(MD, md0); fs.writeFileSync(DATA, data0);
if (sha(fs.readFileSync(MD, 'utf8')) !== sha(md0) || sha(fs.readFileSync(DATA, 'utf8')) !== sha(data0)) throw new Error('restore failed');
console.log('| # | mutation | applied (sha) | B close-out findings | A2 round-2 R9 | B first finding |');
console.log('|---|---|---|---|---|---|');
for (const r of rows) console.log(`| ${r.id} | ${r.what} | ${r.mutated} | ${r.B} | ${r.A2_R9} | ${r.first.replace(/\|/g, '\\|')} |`);
