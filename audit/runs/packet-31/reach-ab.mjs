/*
 * V035 reach A/B — do this packet's own guards still REACH the text it rewrote?
 *
 * Packet 35's lesson: a content fix can blind the check on that content. Its gloss guards went to
 * 0 of 3 after a rewrite changed the shape of the sentences they matched, and the build stayed
 * green while an unreached tip was sabotaged. So: plant a phrase each runner's own frequency
 * guard is written to catch INSIDE the new `content` string of every rewritten frame, run the
 * runner, and require it to fire. Then restore and require it to clear.
 *
 * The planted phrase is taken from the runner's OWN constant, not a hand-copied duplicate —
 * packet 35's second lesson ("an A/B that copies the pattern proves nothing": deleting `Amazon`
 * from the ban left the build green because the probe tested a copy).
 */
import { readFileSync, writeFileSync, copyFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const BAK = '/private/tmp/claude-503/-Users-arongijsel-Claude-APP/ef8cea0c-8ed2-47e3-925f-f597298039dd/scratchpad/reach';
const PACKETS = [
  { n: 23, runner: 'scripts/packet-23-supply.mjs' },
  { n: 24, runner: 'scripts/packet-24-price-determination.mjs' },
  { n: 25, runner: 'scripts/packet-25-market-failure.mjs' },
  { n: 27, runner: 'scripts/packet-27-business-objectives-strategy.mjs' },
];

/* Pull a live alternative out of each runner's own FREQUENCY_CLAIM source, so the probe cannot
 * drift from the guard it is testing. */
function plantPhraseFrom(runnerPath) {
  const src = readFileSync(runnerPath, 'utf8');
  const m = src.match(/const FREQUENCY_CLAIM = \/\\b\(([^)]+)\)/);
  if (!m) throw new Error(`${runnerPath}: could not read FREQUENCY_CLAIM out of the runner`);
  const first = m[1].split('|')[0].replace(/\\/g, '');
  if (!first) throw new Error(`${runnerPath}: FREQUENCY_CLAIM alternation is empty`);
  return first;                                   // e.g. "almost every paper"
}

const run = (runner) => {
  try {
    return execFileSync('node', [runner, '--dump'], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
  } catch (e) {
    return `${e.stdout || ''}${e.stderr || ''}`;
  }
};

let bad = [];
for (const p of PACKETS) {
  const file = `scripts/_packet${p.n}-assessment.mjs`;
  const bak = `${BAK}/_packet${p.n}-assessment.mjs.bak`;
  const phrase = plantPhraseFrom(p.runner);
  const original = readFileSync(bak, 'utf8');

  /* Plant into the FIRST rewritten evaluation `content:` string in the file's evaluation block. */
  const evalAt = original.indexOf('  evaluation: [');
  if (evalAt < 0) { bad.push(`packet ${p.n}: no evaluation block found`); continue; }
  const head = original.slice(0, evalAt);
  const tail = original.slice(evalAt);
  const planted = head + tail.replace(/(content: ')/, `$1This topic is in ${phrase}. `);
  if (planted === original) { bad.push(`packet ${p.n}: nothing planted — no \`content: '\` in the evaluation block`); continue; }

  writeFileSync(file, planted);
  const withDefect = run(p.runner);
  copyFileSync(bak, file);
  const restored = run(p.runner);

  const fires = /claim about how often a paper asks something/.test(withDefect);
  const clears = !/claim about how often a paper asks something/.test(restored);
  const staged = /NOT STAGED|Dry run/.test(withDefect);
  console.log(`packet ${p.n}  planted "${phrase}"  →  guard ${fires ? 'FIRES' : 'IS BLIND'} · restored ${clears ? 'clears' : 'STILL FIRES'}`);
  if (!fires) bad.push(`packet ${p.n}: the frequency guard does NOT reach the rewritten evaluation content`);
  if (!clears) bad.push(`packet ${p.n}: the guard still fires after restore — the probe left the tree dirty`);
  if (!staged) bad.push(`packet ${p.n}: runner did not reach its staging decision with the defect planted`);
}

if (bad.length) { console.log(`\nA/B FAILED:\n${bad.map((b) => `  - ${b}`).join('\n')}`); process.exit(1); }
console.log('\nA/B clean: every rewritten evaluation frame is inside the reach of its own runner\'s prose guards.');
