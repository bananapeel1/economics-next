// Before/after over every live card: the old tab (item.mistake / item.correction) vs lib/mistakes-shape.js.
import { readFileSync } from 'node:fs';
import { readMistake, mistakeGaps } from '../../../lib/mistakes-shape.js';
const { all } = JSON.parse(readFileSync(process.argv[2], 'utf8'));
const blank = (t) => !(typeof t === 'string' && t.trim());
const oldBad = all.filter(({ card }) => blank(card.mistake) || blank(card.correction));
const newBad = all.filter(({ card }) => mistakeGaps(card).length);
const secs = (xs) => new Set(xs.map((x) => x.section)).size;
console.log(`live cards ${all.length} in ${secs(all)} sections`);
console.log(`old tab: ${oldBad.length} cards with an empty box, in ${secs(oldBad)} sections`);
console.log(`new tab: ${newBad.length} cards with an empty box, in ${secs(newBad)} sections`);
newBad.forEach(({ section, card }) => console.log('  STILL BLANK', section, mistakeGaps(card).join('; ')));
