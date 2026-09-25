/**
 * E028 — as served. Which pages still show a "Why this loses marks" panel, and for every one that
 * does, does the band it says it tops out in differ from the band the model answer above it is
 * marked in? Read out of the HTML, not out of the module, so a component that rendered a suppressed
 * panel some other way would still be caught.
 */
import { MODEL_ANSWER_PAGES, modelAnswersPath } from '../../../data/modelAnswerPages.js';
import { markRange } from '../../../lib/mid-band-answer.js';

const BASE = process.argv[2] || 'http://localhost:3001';
const strip = (s) => s.replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();

let panels = 0; let none = 0; let fails = 0;
const lost = [];
for (const p of MODEL_ANSWER_PAGES) {
  const html = (await (await fetch(`${BASE}${modelAnswersPath(p)}`)).text()).replace(/<!-- -->/g, '');
  // PAIR THE PANEL WITH ITS OWN ITEM, not with the first model answer on the page. A page carries
  // several <li class="lab-item"> and the panel sits inside exactly one of them; reading the first
  // <summary> on the page compares the panel to a different question's score, which is how this
  // probe first reported national-income as a failure when the fallback had in fact worked.
  const items = html.split('<li class="lab-item">').slice(1);
  const item = items.find((x) => x.includes('lab-details-midband'));
  if (!item) { none++; lost.push(p.slug); continue; }
  panels++;
  const body = (item.match(/<details class="lab-details lab-details-midband">([\s\S]*?)<\/details>/) || [])[1] || '';
  const tops = strip((body.match(/Where it tops out instead<\/h4>([\s\S]*?)<\/dl>/) || [])[1] || '');
  const ceiling = markRange(tops);
  // The score of the model answer in THIS item.
  const score = markRange(((item.match(/<summary>Model answer — ([^<]*)<\/summary>/) || [])[1] || '').split('/')[0]);
  const aoScheme = /AO[1-4]/.test(tops);
  const overlap = !aoScheme && score && ceiling && !(score[1] < ceiling[0] || score[0] > ceiling[1]);
  if (overlap) { fails++; console.log(`FAIL ${p.slug}: model answer ${score.join('–')} and ceiling ${ceiling.join('–')} are the same band`); }
}
console.log(`${panels} pages show a panel, ${none} show none, ${fails} show one in the model answer's own band`);
console.log(`pages with no panel: ${lost.join(', ')}`);
process.exit(fails ? 1 : 0);
