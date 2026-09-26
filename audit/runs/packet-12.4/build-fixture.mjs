import fs from 'node:fs';
const src = process.argv[2];      // directory holding modelAnswersData.js
const out = process.argv[3];
const { MODEL_ANSWERS } = await import(`file://${src}/modelAnswersData.js`);
const bySection = new Map();
for (const a of MODEL_ANSWERS) {
  const key = `${a.subject}__${a.sectionNumber}`;
  if (!bySection.has(key)) bySection.set(key, { slug: key, subject: a.subject, topic: a.sectionNumber, title: a.sectionTitle, items: [] });
  bySection.get(key).items.push({
    command: a.commandWord, marks: a.marks, question: a.question,
    specItems: a.specItems, kind: a.kind, ao: a.ao, stimulusRef: a.stimulusRef,
  });
}
fs.writeFileSync(out, `${JSON.stringify({ sections: [...bySection.values()] }, null, 1)}\n`);
console.log(`${MODEL_ANSWERS.length} items -> ${[...bySection.keys()].length} sections -> ${out}`);
