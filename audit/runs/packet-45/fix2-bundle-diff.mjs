// Fix round 2: compare the pre-fix dump with the new dump, table by table and quiz item by item.
// Reads only the two JSON files, not the runner or its modules.
import { readFileSync } from 'node:fs';
const [a, b] = ['audit/runs/packet-45/fix2-bundle-before.json', 'audit/snapshots/packet-45-bundle__economics__labour-markets.json'].map((f) => JSON.parse(readFileSync(f)).tables);
for (const t of Object.keys({ ...a, ...b })) console.log(`${t}: ${JSON.stringify(a[t]) === JSON.stringify(b[t]) ? 'identical' : 'DIFFERS'}`);
const changed = a.quiz.map((q, i) => i).filter((i) => JSON.stringify(a.quiz[i]) !== JSON.stringify(b.quiz[i]));
console.log(`quiz items changed: ${JSON.stringify(changed)} of ${a.quiz.length} (${b.quiz.length} after)`);
for (const i of changed) console.log(`  [${i}] block "${a.quiz[i].block}"→"${b.quiz[i].block}" correctIndex ${a.quiz[i].correctIndex}→${b.quiz[i].correctIndex} id ${a.quiz[i].id}→${b.quiz[i].id}`);
const keysMoved = a.quiz.filter((q, i) => q.correctIndex !== b.quiz[i].correctIndex).length;
console.log(`correctIndex moved on ${keysMoved} items; histogram after ${JSON.stringify([0, 1, 2, 3].map((k) => b.quiz.filter((q) => q.correctIndex === k).length))}`);
const pins = (c) => JSON.stringify(c.map((x) => [x.quizIndices, x.practiceIndices, x.diagramId, x.quizIds || null]));
console.log(`pins identical: ${pins(a.content) === pins(b.content)}`);
