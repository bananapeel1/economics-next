const ROOT = '/Users/arongijsel/Claude APP/economics-next-remediation';
const { buildItem } = await import(`${ROOT}/lib/quant/index.mjs`);
let stemLeak = 0, cardLeak = 0, choiceCarries = 0;
const N = 2000;
for (let i = 0; i < N; i++) {
  const it = buildItem('percentage-change-economics', `leak-${i}`);
  const d = it.data;
  const pcts = [...it.stem.matchAll(/([\d.]+)%/g)].map((m) => Number(m[1]));
  if (pcts.includes(d.rateNow)) stemLeak++;
  // Everything a student can SEE on the card before answering step one: the stem plus every
  // step's label and, for the choice step, its options.
  const visible = [it.stem, ...it.steps.map((s) => `${s.label} ${s.method || ''} ${(s.choices || []).join(' ')}`)].join(' ');
  const vp = [...visible.matchAll(/([\d.]+)%/g)].map((m) => Number(m[1]));
  const vpts = [...visible.matchAll(/([\d.]+) percentage point/g)].map((m) => Number(m[1]));
  if (vp.includes(d.rateNow)) cardLeak++;
  // rateNow = rateNext + points, and `points` is printed twice among the three choices.
  if ((vp.includes(d.points) || vpts.includes(d.points)) && vp.includes(d.rateNext)) choiceCarries++;
}
console.log(`stem prints rateNow (exact % token): ${stemLeak}/${N}`);
console.log(`any visible text prints rateNow:     ${cardLeak}/${N}`);
console.log(`rateNext AND points both visible before answering (rateNow = sum): ${choiceCarries}/${N}`);
