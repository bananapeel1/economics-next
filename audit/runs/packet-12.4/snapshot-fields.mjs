import fs from 'node:fs';
import { MODEL_ANSWERS } from '../../../data/modelAnswersData.js';
const out = process.argv[2];
const rows = MODEL_ANSWERS.map((a) => {
  const { specItems, ...rest } = a;
  return { id: a.id, fields: rest };
}).sort((x, y) => x.id.localeCompare(y.id));
fs.writeFileSync(out, `${JSON.stringify(rows, null, 1)}\n`);
console.log(`${rows.length} items, every field except specItems, -> ${out}`);
