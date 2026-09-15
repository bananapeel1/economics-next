/**
 * Packet 15 helpers: the id scheme scripts/mint-item-ids.mjs uses, so hand-authored items carry ids of
 * the same shape (`<section>:<kind>:<hash8(key)>`), a word counter that matches the validator's
 * `step.words` formula, and Maraya's production possibility frontier — the one set of worked figures
 * this section carries across its body, diagrams, notes and assessment.
 */
import { createHash } from 'node:crypto';

export const SECTION = 'introductory-concepts';

const norm = (s) => String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
export const hash8 = (s) => createHash('sha1').update(norm(s)).digest('hex').slice(0, 8);
export const slug = (s) => norm(s).replace(/\s+/g, '-').slice(0, 48);
export const id = (kind, key) => `${SECTION}:${kind}:${hash8(key)}`;
export const subId = (s) => `${SECTION}:sub:${s}`;

/**
 * Maraya's PPF: consumer goods C on the horizontal axis, capital goods K on the vertical, both in
 * thousands of units. K = -0.015·C² - 0.05·C + 40, so dK/dC = -(0.03·C + 0.05) and the gradient
 * steepens from 0.05 to 1.55 without ever easing: the curve is strictly concave, which is what
 * accuracy-01 says the March path was not. The six labelled points are exact values of that
 * function, not a table drawn beside a curve that disagrees with it.
 */
export const ppfK = (C) => -0.015 * C * C - 0.05 * C + 40;
export const PPF_POINTS = [
  { name: 'A', C: 0, K: 40 },
  { name: 'B', C: 10, K: 38 },
  { name: 'C', C: 20, K: 33 },
  { name: 'D', C: 30, K: 25 },
  { name: 'E', C: 40, K: 14 },
  { name: 'F', C: 50, K: 0 },
];
/** Capital goods given up for each extra 10 thousand consumer goods: 2, 5, 8, 11, 14 — rising by 3. */
export const PPF_STEPS = PPF_POINTS.slice(1).map((p, i) => ({
  from: PPF_POINTS[i].name, to: p.name, gained: p.C - PPF_POINTS[i].C, givenUp: PPF_POINTS[i].K - p.K,
  perUnit: (PPF_POINTS[i].K - p.K) / (p.C - PPF_POINTS[i].C),
}));

/** Words of teaching text in a subsection, exactly as lib/content-validator.mjs counts them. */
export function teachingWords(sec) {
  const normText = (s) => String(s ?? '').toLowerCase().replace(/\s+/g, ' ').trim();
  const words = (s) => normText(s).split(' ').filter(Boolean).length;
  const teaching = [sec?.keyIdea, ...(sec?.body || []).flatMap((b) => [b?.text, ...(b?.items || []), ...((b?.steps || []).map((s) => (typeof s === 'object' ? `${s.title} ${s.subtitle || ''}` : s))), b?.result]), sec?.realExample?.text, sec?.misconception, sec?.examMatters];
  return words(teaching.filter(Boolean).join(' '));
}
