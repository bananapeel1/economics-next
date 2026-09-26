// A/B of the runner's new dependency-quiz arithmetic block (a copy of its three assertions, run on the real item and on plants).
// Run from the worktree root: node audit/runs/packet-46/fix-ab-arith.mjs
const { QUIZ } = await import("../../../scripts/_packet46-assessment.mjs");
const check = (q) => {
  const bad = [];
  const [, young, old] = q?.question.match(/(\d+)% of its people are under 15 and (\d+)% are over 64/) || [];
  const Y = Number(young), O = Number(old), W = 100 - Y - O;
  const key = Math.round(((Y + O) / W) * 100);
  const errors = [Math.round(((Y + O) / (100 - Y)) * 100), Math.round((Y / W) * 100), Math.round((100 / W) * 100)];
  if (!(q && W === 75 && key === 33 && q.options[q.correctIndex] === String(key))) bad.push('key');
  if (!(q && JSON.stringify([...q.options].sort()) === JSON.stringify([key, ...errors].map(String).sort()))) bad.push('options');
  if (!(q && q.explanation.includes(`100 − ${Y} − ${O} = ${W}%`) && q.explanation.includes(`${Y + O} ÷ ${W} × 100 = ${key}`))) bad.push('explanation');
  return bad.join(',') || 'pass';
};
const q = QUIZ.find((x) => /dependency ratio is approximately/.test(x.question));
console.log('index', QUIZ.indexOf(q), 'real item:', check(q));
console.log('planted wrong key (correctIndex -> 31):', check({ ...q, correctIndex: q.options.indexOf('31') }));
console.log('planted non-error option (27 -> 45):', check({ ...q, options: q.options.map((o) => (o === '27' ? '45' : o)) }));
console.log('planted stem figures (5% -> 6%):', check({ ...q, question: q.question.replace('5% are over 64', '6% are over 64') }));
console.log('planted explanation (25 ÷ 75 -> 25 ÷ 80):', check({ ...q, explanation: q.explanation.replace('25 ÷ 75', '25 ÷ 80') }));
console.log('item missing:', check(undefined));
