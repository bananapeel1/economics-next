// A/B of the runner's new copper-quiz arithmetic block (fix round 2): a copy of its three assertions, run on the real
// item and on plants. Run from the worktree root: node audit/runs/packet-46/fix2-ab-arith.mjs
const { QUIZ } = await import('../../../scripts/_packet46-assessment.mjs');
const check = (q) => {
  const bad = [];
  const [, share, fall] = q?.question.match(/earns (\d+)% of its export revenue from copper, and the world copper price falls by (\d+)%/) || [];
  const S = Number(share), F = Number(fall);
  const key = (S * F) / 100;
  const errors = [F, 100 - key, S];
  if (!(q && key === 52 && q.options[q.correctIndex] === `${key}%`)) bad.push('key');
  if (!(q && JSON.stringify([...q.options].sort()) === JSON.stringify([key, ...errors].map((v) => `${v}%`).sort()))) bad.push('options');
  if (!(q && q.explanation.includes(`${S / 100} × ${F}% = ${key}%`))) bad.push('explanation');
  return bad.join(',') || 'pass';
};
const q = QUIZ.find((x) => /export revenue from copper, and the world copper price falls by/.test(x.question));
console.log('index', QUIZ.indexOf(q), 'real item:', check(q));
console.log('planted wrong key (correctIndex -> 48%):', check({ ...q, correctIndex: q.options.indexOf('48%') }));
console.log('planted non-error option (80% -> 70%):', check({ ...q, options: q.options.map((o) => (o === '80%' ? '70%' : o)) }));
console.log('planted stem figure (65% -> 60%):', check({ ...q, question: q.question.replace('falls by 65%', 'falls by 60%') }));
console.log('planted explanation (0.8 × 65% -> 0.8 × 60%):', check({ ...q, explanation: q.explanation.replace('0.8 × 65%', '0.8 × 60%') }));
console.log('item missing:', check(undefined));
