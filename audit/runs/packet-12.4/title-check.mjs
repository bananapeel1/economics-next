/**
 * E027 — only the page with no model answers changed title. Every other title is what it was at
 * HEAD, character for character, checked against the HEAD copy of the rule rather than against a
 * remembered list.
 */
import { MODEL_ANSWER_PAGES, modelAnswersPath, modelAnswersMetaTitle } from '../../../data/modelAnswerPages.js';
const HEAD = process.argv[3];
const head = HEAD ? await import(`file://${HEAD}/modelAnswerPages.js`) : null;
const BASE = process.argv[2] || 'http://localhost:3001';
const unescape = (s) => s.replace(/&amp;/g, '&').replace(/&#x27;|&#39;/g, "'");

let changed = 0; let same = 0; let fails = 0;
for (const p of MODEL_ANSWER_PAGES) {
  const html = (await (await fetch(`${BASE}${modelAnswersPath(p)}`)).text()).replace(/<!-- -->/g, '');
  const served = unescape((html.match(/<title>([^<]*)<\/title>/) || [])[1] || '');
  const h1 = unescape((html.match(/<h1 class="resource-page-title">([^<]*)<\/h1>/) || [])[1] || '');
  const expected = modelAnswersMetaTitle(p, { hasAnswers: !/Model Answers In Progress/.test(served) });
  const atHead = head ? head.modelAnswersMetaTitle(p) : null;
  const inProgress = /Model Answers In Progress/.test(served);
  const problems = [];
  if (served !== unescape(expected)) problems.push(`served title != rule: ${served}`);
  if (!served.startsWith(h1)) problems.push(`<h1> and <title> disagree: "${h1}" vs "${served}"`);
  if (!inProgress && atHead && served !== unescape(atHead)) problems.push(`title moved from HEAD: "${unescape(atHead)}" -> "${served}"`);
  if (inProgress) changed++; else same++;
  if (problems.length) { fails++; console.log(`FAIL ${p.slug}: ${problems.join('; ')}`); }
}
console.log(`${same} pages keep their HEAD title character for character, ${changed} take the "Model Answers In Progress" form, ${fails} failing`);
process.exit(fails ? 1 : 0);
