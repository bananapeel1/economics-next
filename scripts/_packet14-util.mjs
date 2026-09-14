/**
 * Packet 14 helpers: the id scheme scripts/mint-item-ids.mjs uses, so hand-authored items carry ids of
 * the same shape (`<section>:<kind>:<hash8(key)>`), and a word counter that matches the validator's
 * `step.words` formula so the runner can report a subsection's reading budget before staging.
 */
import { createHash } from 'node:crypto';

export const SECTION = 'decision-making-techniques';

const norm = (s) => String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
export const hash8 = (s) => createHash('sha1').update(norm(s)).digest('hex').slice(0, 8);
export const slug = (s) => norm(s).replace(/\s+/g, '-').slice(0, 48);
export const id = (kind, key) => `${SECTION}:${kind}:${hash8(key)}`;
export const subId = (s) => `${SECTION}:sub:${s}`;

/** Words of teaching text in a subsection, exactly as lib/content-validator.mjs counts them. */
export function teachingWords(sec) {
  const normText = (s) => String(s ?? '').toLowerCase().replace(/\s+/g, ' ').trim();
  const words = (s) => normText(s).split(' ').filter(Boolean).length;
  const teaching = [sec?.keyIdea, ...(sec?.body || []).flatMap((b) => [b?.text, ...(b?.items || []), ...((b?.steps || []).map((s) => (typeof s === 'object' ? `${s.title} ${s.subtitle || ''}` : s))), b?.result]), sec?.realExample?.text, sec?.misconception, sec?.examMatters];
  return words(teaching.filter(Boolean).join(' '));
}
