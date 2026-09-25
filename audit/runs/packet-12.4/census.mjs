import { MODEL_ANSWERS } from '../../../data/modelAnswersData.js';
const rows = MODEL_ANSWERS.map(a => ({
  id: a.id, subject: a.subject, topic: a.sectionNumber, title: a.sectionTitle,
  marks: a.marks, cmd: a.commandWord,
  tagged: Array.isArray(a.specItems) ? a.specItems.length : (a.specItems === undefined ? null : 'EMPTY'),
  file: a.__file || '',
}));
const by = {};
for (const r of rows) {
  const k = r.subject;
  by[k] = by[k] || { items: 0, tagged: 0, untagged: 0, empty: 0 };
  by[k].items++;
  if (r.tagged === null) by[k].untagged++;
  else if (r.tagged === 'EMPTY' || r.tagged === 0) by[k].empty++;
  else by[k].tagged++;
}
console.log(JSON.stringify(by, null, 1));
console.log('total items', rows.length);
const econ = rows.filter(r => r.subject === 'economics');
const topics = [...new Set(econ.map(r => r.topic))].sort();
console.log('econ topics', topics.length, topics.join(' '));
console.log('--- untagged econ ---');
for (const r of econ.filter(r => r.tagged === null)) console.log(`${r.topic}\t${r.id}\t${r.cmd} ${r.marks}`);
