// Packet 2.9. proposals/*.json -> pins.json (what the pin script applies) and verify-input.json (what the
// blind verifier sees: the choice and the item text, never the author's evidence or reasoning).
//   node audit/runs/packet-2.9/merge-proposals.mjs <live-dump.json>
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';

const DIR = 'audit/runs/packet-2.9';
const live = JSON.parse(readFileSync(process.argv[2], 'utf8'));
const proposals = {};
for (const f of readdirSync(`${DIR}/proposals`).filter((x) => x.endsWith('.json'))) {
  Object.assign(proposals, JSON.parse(readFileSync(`${DIR}/proposals/${f}`, 'utf8')));
}

/* Practice pins withheld because the slot they land in is GUIDED and the item's opening paragraph is its
   mark scheme (practice.opening). scripts/packet-2.9-pin-banks.mjs check 6 refused all six. Each was the
   only eligible item for its chapter that the reader chose, and every alternative the reader judged
   eligible either leaks too or is early (labour-markets p2 leans on chapter 3). Restore by deleting the
   entry here once the founder takes the getPracticeMode fix or the item gets an opening paragraph. */
const GUIDED_WITHHOLD = {
  'government-intervention-firms': [1],
  'labour-markets': [1],
  'market-structures-contestability': [1, 2],
  'types-sizes-businesses': [1, 2],
};

/* Replacements the BLIND verifier proposed as BETTER (verdicts/*.json) — an unchosen item it judged to meet
   all four rules and to test the chapter more squarely than the chosen one. Applied after the proposals;
   the index is checked against the live bank below like every other pin. */
const ADOPT_BETTER = {
  // q4 (what transfer pricing is) is taught in full in chapter 1; q7 (OECD BEPS) only in chapter 2.
  'global-industries-mncs': [{ block: 1, kind: 'quiz', index: 7 }],
  // p3 restates chapter 1's shareholder/stakeholder debate, which is already chapter 1's practice;
  // p1 (ethics against profit) is chapter 2's own case.
  'influences-business-decisions': [{ block: 1, kind: 'practice', index: 1 }],
};
/* Pins the blind verifier FAILED. Every empty slot was checked for a MISSED item and none qualified, so a
   failed pin becomes a decided-empty chapter rather than a substitute. */
const VERIFIER_FAILED = {
  // q3 (principal-agent) is taught in chapter 1 — different objectives, imperfect information; chapter 2
  // only names the divorce of ownership and control. The one other candidate, q6 (co-operatives), is
  // taught nowhere in the section.
  'types-sizes-businesses': [{ block: 1, kind: 'quiz' }],
};
for (const [sectionId, fails] of Object.entries(VERIFIER_FAILED)) {
  for (const { block, kind } of fails) proposals[sectionId].chapters.find((c) => c.block === block)[kind] = null;
}

/* Advisory BETTER items NOT adopted, recorded so the choice is visible:
   - government-intervention-firms ch2 q0 (RPI–X): its answer, 1%, is the chapter's own worked-example
     figure, so it can be picked without the sum — the printed-answer class.
   - government-intervention-firms ch3 q4, revenue-costs-profits ch2 q3, role-state-macroeconomy ch2 p0:
     coverage preferences (test the chapter's other half); the chosen items PASS and are about the chapter. */
for (const [sectionId, swaps] of Object.entries(ADOPT_BETTER)) {
  for (const { block, kind, index } of swaps) {
    const ch = proposals[sectionId].chapters.find((c) => c.block === block);
    const bank = live[sectionId].live[kind];
    ch[kind] = { index, id: bank[index].id, adoptedFromVerifier: true };
  }
}

const pins = {};
const verifyInput = {};
const problems = [];
for (const [sectionId, p] of Object.entries(proposals)) {
  const row = live[sectionId];
  if (!row) { problems.push(`${sectionId}: not in the live dump`); continue; }
  const content = row.live.content || [];
  const quiz = row.live.quiz || [];
  const practice = row.live.practice || [];
  pins[sectionId] = { chapters: [] };
  verifyInput[sectionId] = [];
  for (const ch of p.chapters) {
    const block = content[ch.block];
    const pick = (x) => (x ? { index: x.index, id: x.id } : null);
    for (const [kind, bank] of [['quiz', quiz], ['practice', practice]]) {
      const c = ch[kind];
      if (c && bank[c.index]?.id !== c.id) problems.push(`${sectionId} ch${ch.block + 1} ${kind}: index ${c.index} is ${bank[c.index]?.id}, proposal says ${c.id}`);
    }
    const withheld = (GUIDED_WITHHOLD[sectionId] || []).includes(ch.block) && ch.practice;
    pins[sectionId].chapters.push({
      block: ch.block, blockId: block?.id, quiz: pick(ch.quiz), practice: withheld ? null : pick(ch.practice),
      ...(withheld ? { practiceWithheld: { ...pick(ch.practice), reason: 'guided slot; practice.opening' } } : {}),
    });
    const q = ch.quiz ? quiz[ch.quiz.index] : null;
    const pr = ch.practice ? practice[ch.practice.index] : null;
    verifyInput[sectionId].push({
      block: ch.block,
      chapter: block?.title,
      quiz: q ? { index: ch.quiz.index, id: q.id, question: q.question, options: q.options, keyed: q.options?.[q.correctIndex] } : null,
      practice: pr ? { index: ch.practice.index, id: pr.id, marks: pr.marks, question: pr.question } : null,
    });
  }
}
writeFileSync(`${DIR}/pins.json`, JSON.stringify(pins, null, 1));
writeFileSync(`${DIR}/verify-input.json`, JSON.stringify(verifyInput, null, 1));
const chapters = Object.values(pins).flatMap((s) => s.chapters);
console.log(`sections ${Object.keys(pins).length} · chapters ${chapters.length} · quiz pinned ${chapters.filter((c) => c.quiz).length} · practice pinned ${chapters.filter((c) => c.practice).length}`);
if (problems.length) { console.log(problems.join('\n')); process.exit(1); }
