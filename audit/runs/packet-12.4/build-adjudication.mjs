/**
 * A blind, controlled sample for the question the agreement counts cannot answer — packet 12.4.
 *
 * 69 of the 120 written tags rest on pass 1 + pass 2 with pass 3 dissenting. Two readings fit that:
 * pass 3 is weak on this bank, or the two model passes share a blind spot and both proposed the same
 * plausible-but-wrong leaf. The counts cannot tell them apart, so a fourth reader adjudicates a
 * sample of (question, leaf) pairs one at a time, unlabelled and shuffled.
 *
 * THE CONTROLS ARE THE POINT. Ten treatment pairs alone would only measure how agreeable the
 * adjudicator is. Seven pairs no pass proposed (drawn from the same topic) should come back NO, and
 * seven unanimous pairs should come back YES. A run where all three groups score alike proves
 * nothing about the treatment group and says the adjudicator is not discriminating.
 *
 * Deterministic: a fixed seed, so the sample can be re-derived by anyone.
 */
import fs from 'node:fs';

const RUN = 'audit/runs/packet-12.4';
const read = (p) => JSON.parse(fs.readFileSync(p, 'utf8'));
const p1 = read(`${RUN}/pass1-tags.json`).tags;
const p2 = read(`${RUN}/pass2-tags.json`).tags;
const p3 = read(`${RUN}/pass3-tags.json`).tags;
const oracle = read('audit/raw/spec-items.json');
const { MODEL_ANSWERS } = await import(`file://${process.cwd()}/data/modelAnswersData.js`);
const byId = new Map(MODEL_ANSWERS.map((a) => [a.id, a]));

let seed = 20260922;
const rnd = () => { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff; };
const shuffle = (a) => { const x = a.slice(); for (let i = x.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [x[i], x[j]] = [x[j], x[i]]; } return x; };

const leafRow = new Map(oracle.items.filter((r) => r.kind === 'leaf').map((r) => [r.id, r]));
const rowById = new Map(oracle.items.map((r) => [r.id, r]));
const describe = (id) => {
  const r = leafRow.get(id);
  const parentId = id.replace(/-\d+$/, '');
  const parent = parentId !== id ? rowById.get(parentId) : null;
  return { subtopic: r.subtopicLabel || '', requirement: parent ? parent.wording : '', wording: r.wording };
};

const twoOnly = [];   // pass 1 + pass 2, pass 3 dissenting — the treatment
const unanimous = []; // all three — positive control
for (const a of MODEL_ANSWERS.filter((x) => x.subject === 'economics')) {
  const s = [new Set(p1[a.id] || []), new Set(p2[a.id] || []), new Set(p3[a.id] || [])];
  for (const id of new Set([...s[0], ...s[1], ...s[2]])) {
    const w = s.map((x) => x.has(id));
    if (w[0] && w[1] && w[2]) unanimous.push({ key: a.id, id });
    else if (w[0] && w[1]) twoOnly.push({ key: a.id, id });
  }
}
// Negative control: leaves of the same topic that NO pass proposed, one per sampled question.
const treatment = shuffle(twoOnly).slice(0, 10);
const positive = shuffle(unanimous).slice(0, 7);
const negative = [];
for (const t of shuffle(treatment).slice(0, 7)) {
  const a = byId.get(t.key);
  const proposed = new Set([...(p1[t.key] || []), ...(p2[t.key] || []), ...(p3[t.key] || [])]);
  const pool = oracle.items
    .filter((r) => r.kind === 'leaf' && r.subject === 'economics' && r.topic === a.sectionNumber && !proposed.has(r.id))
    .map((r) => r.id);
  negative.push({ key: t.key, id: pool[Math.floor(rnd() * pool.length)] });
}

const pairs = shuffle([
  ...treatment.map((x) => ({ ...x, group: 'treatment' })),
  ...positive.map((x) => ({ ...x, group: 'positive-control' })),
  ...negative.map((x) => ({ ...x, group: 'negative-control' })),
]).map((x, i) => ({ ref: `P${String(i + 1).padStart(2, '0')}`, ...x }));

fs.writeFileSync(`${RUN}/adjudication-key.json`, `${JSON.stringify({
  seed: 20260922,
  note: 'The answer key. The adjudicator never sees this file.',
  pairs,
}, null, 1)}\n`);

fs.writeFileSync(`${RUN}/adjudication-input.json`, `${JSON.stringify({
  instruction: 'For each pair, decide whether the question examines the requirement: does a student have to demonstrate this requirement to answer that question well?',
  pairs: pairs.map((x) => ({
    ref: x.ref,
    question: byId.get(x.key).question,
    requirement: describe(x.id),
  })),
}, null, 1)}\n`);

console.log(`treatment ${treatment.length} (of ${twoOnly.length}), positive ${positive.length} (of ${unanimous.length}), negative ${negative.length} — ${pairs.length} pairs`);
