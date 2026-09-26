/**
 * Packet 54 fix round 1 — independent check of the pay-gap class (topFix-01, topFix-02, specGap-05).
 * Does NOT import FIRM or any packet-54 module. Reads the STAGED DRAFT from the database (select only),
 * walks EVERY string in every table (flow steps, takeaways, flashcards, SVG text, schemes), and:
 *   1. re-derives the wage bill from the Source A wording itself (staff, monthly pay, opex parsed as text);
 *   2. re-derives the pay-gap cost from the same wording and compares it with every stated pay-gap figure;
 *   3. lists every string that states a multiple or comparison against turnover cost, for reading;
 *   4. fails on any survivor of the old figures ($14,000, $15,000, $2.4m, "five times").
 * Run: node audit/runs/packet-54/payfit-check.mjs
 */
import { supabase } from '../../../scripts/_db.mjs';
const SECTION = 'assessing-competitiveness';
const TABLES = ['section_content', 'section_notes', 'section_quiz', 'section_practice', 'section_flashcards', 'section_diagrams', 'section_extras', 'section_common_mistakes'];
const strings = [];
const walk = (v, path) => {
  if (typeof v === 'string') strings.push([path, v]);
  else if (Array.isArray(v)) v.forEach((x, i) => walk(x, `${path}[${i}]`));
  else if (v && typeof v === 'object') for (const [k, x] of Object.entries(v)) walk(x, `${path}.${k}`);
};
/* --bundle <file>: read a dumped bundle instead (for the A/B against the pre-fix text only) */
const bi = process.argv.indexOf('--bundle');
if (bi > 0) {
  const { readFileSync } = await import('node:fs');
  const tb = JSON.parse(readFileSync(process.argv[bi + 1], 'utf8')).tables;
  const K = { section_content: 'content', section_notes: 'notes', section_quiz: 'quiz', section_practice: 'practice', section_flashcards: 'flashcards', section_diagrams: 'diagrams', section_extras: 'extras', section_common_mistakes: 'mistakes' };
  for (const t of TABLES) walk(tb[K[t]], t);
} else for (const t of TABLES) {
  const { data, error } = await supabase.from(t).select('draft').eq('section_id', SECTION).maybeSingle();
  if (error || !data) { console.log(`${t}: ${error?.message || 'no row'}`); process.exit(2); }
  walk(data.draft, t);
}
let bad = 0;
const fail = (m) => { bad += 1; console.log(`FAIL ${m}`); };
const money = (s) => { const m = /\$([\d,.]+)(m?)/.exec(s); if (!m) return NaN; return Number(m[1].replace(/,/g, '')) * (m[2] ? 1e6 : 1); };

/* 1 + 2: from the Source A wording */
const src = strings.find(([, s]) => /Source A\./.test(s) && /Shop staff earn/.test(s));
if (!src) fail('no Source A found in the draft');
else {
  const s = src[1];
  const staff = Number(/shops employed an average of (\d+) staff/.exec(s)?.[1]);
  const pay = money(/Shop staff earn (\$[\d,.]+m?) a month/.exec(s)?.[1] || '');
  const rival = money(/rival chains pay (\$[\d,.]+m?)/.exec(s)?.[1] || '');
  const opex = money(/other operating expenses (\$[\d,.]+m?)/.exec(s)?.[1] || '');
  const leavers = Number(/of whom (\d+) \(\d+\) left/.exec(s)?.[1]);
  const replace = money(/replacing each leaver costs (\$[\d,.]+m?)/.exec(s)?.[1] || '');
  const bill = staff * pay * 12, gap = staff * (rival - pay) * 12, turn = leavers * replace;
  console.log(`Source A as written: ${staff} staff × ${pay}/month × 12 = ${bill} against opex ${opex} (${(100 * bill / opex).toFixed(0)}%); at rivals' pay ${staff * rival * 12}`);
  console.log(`Source A as written: gap ${staff} × (${rival} − ${pay}) × 12 = ${gap}; turnover ${leavers} × ${replace} = ${turn}; ratio ${(gap / turn).toFixed(2)}`);
  if ([staff, pay, rival, opex, leavers, replace].some((x) => !Number.isFinite(x))) fail('could not parse a Source A figure');
  if (bill >= opex || staff * rival * 12 >= opex) fail('the wage bill does not fit inside other operating expenses');
  /* every string that states the pay-gap cost must state THIS figure */
  const gapStr = `$${gap.toLocaleString('en-GB')}`;
  for (const [p, x] of strings) {
    if (/(closing (the|it)|pay gap)[^.]{0,120}cost/i.test(x) || /closing (the|it)[^.]{0,40}(gap)?/i.test(x) && /\$/.test(x)) {
      const ok = x.includes(gapStr);
      console.log(`${ok ? 'ok  ' : 'READ'} ${p}: …${x.slice(Math.max(0, x.search(/clos|pay gap/i) - 20), x.search(/clos|pay gap/i) + 160).replace(/\s+/g, ' ')}…`);
    }
  }
}
/* 3: every comparison against turnover, printed for a human read */
console.log('\n-- every string comparing a cost with turnover --');
for (const [p, x] of strings) {
  for (const m of x.matchAll(/[^.]*\b(as much as|times as much|far more|more than|less than|same as|pay for itself|repay|cover it)\b[^.]*(?:\.|$)/gi)) {
    if (/turnover|leaver/i.test(m[0])) console.log(`${p}: ${m[0].trim().replace(/<[^>]+>/g, '')}`);
  }
}
/* 4: survivors of the old figures, anywhere */
for (const [p, x] of strings) {
  const hit = /\$1[45],000|\$2\.4m|(?<!-)\bfive times|\b5 times|\b5x\b/i.exec(x);
  if (hit) fail(`${p} still says "${hit[0]}"`);
}
console.log(`\n${strings.length} strings read from 8 draft tables; ${bad ? `${bad} FAIL` : 'no failure'}`);
process.exit(bad ? 1 : 0);
