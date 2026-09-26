import fs from 'node:fs';
import { MODEL_ANSWERS } from '../../../data/modelAnswersData.js';

const oracle = JSON.parse(fs.readFileSync('audit/raw/spec-items.json', 'utf8'));
const OUT = 'audit/runs/packet-12.4/pass2-input';

const econ = MODEL_ANSWERS.filter((a) => a.subject === 'economics');
const topics = [...new Set(econ.map((a) => a.sectionNumber))].sort();

const manifest = [];
for (const topic of topics) {
  const rows = oracle.items.filter((r) => r.subject === 'economics' && r.topic === topic);
  const byId = new Map(rows.map((r) => [r.id, r]));
  const leaves = rows.filter((r) => r.kind === 'leaf').map((r) => {
    const parentId = r.id.replace(/-\d+$/, '');
    const parent = parentId !== r.id ? byId.get(parentId) : null;
    return {
      id: r.id,
      subtopic: r.subtopicLabel || '',
      requirement: parent ? parent.wording : '',
      wording: r.wording,
    };
  });
  const questions = econ
    .filter((a) => a.sectionNumber === topic)
    .map((a) => ({ key: a.id, question: a.question }));
  const payload = {
    subject: 'economics',
    topic,
    title: rows[0]?.title || '',
    questions,
    leaves,
  };
  fs.writeFileSync(`${OUT}/${topic}.json`, `${JSON.stringify(payload, null, 1)}\n`);
  manifest.push({ topic, questions: questions.length, leaves: leaves.length });
}
fs.writeFileSync(`${OUT}/manifest.json`, `${JSON.stringify(manifest, null, 1)}\n`);
console.log(`${topics.length} topics, ${econ.length} econ questions, ${manifest.reduce((n,m)=>n+m.leaves,0)} leaves`);
console.log(manifest.map((m) => `${m.topic}: ${m.questions}q / ${m.leaves}L`).join('\n'));
