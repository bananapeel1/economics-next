/**
 * Packet 53 fix round 1 — independent of the runner. Reads the SERVED draft over HTTP (not the modules,
 * not the bundle file), places items with PRODUCTION's code (`git archive origin/main lib` into $PROD),
 * and for each check-in prints the diagram's visible text next to the practice item actually placed there.
 * It then lists every number in that item's mark scheme and says whether the diagram, or the teaching
 * text a reader has passed before the check-in (the chapter's subsections, and its notes twin), prints it.
 * Numbers are read with a plain \d regex over ALL numerals (no ≥13 filter, no RM/% filter — the runner's
 * `figs` filters; this does not). SVG text is taken by stripping tags, not by the runner's textsOf.
 * Usage: PROD=<dir with origin/main lib> node audit/runs/packet-53/fix1-checkin-probe.mjs
 */
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
const PROD = process.env.PROD;
const { placeChapterItems } = await import(pathToFileURL(resolve(PROD, 'lib/checkin-placement.js')).href);
const { buildSteps } = await import(pathToFileURL(resolve(PROD, 'lib/learn-steps.js')).href);
/* A/B: BUNDLE=<a bundle json> reads a file instead of the served draft (used only to prove the probe fires) */
import { readFileSync } from 'node:fs';
const bank = process.env.BUNDLE
  ? JSON.parse(readFileSync(process.env.BUNDLE, 'utf8')).tables
  : await (await fetch('http://localhost:3001/api/sections/influences-business-decisions?draft=1')).json();
console.log(`source: ${process.env.BUNDLE || 'GET localhost:3001/api/sections/influences-business-decisions?draft=1 (signed out)'}`);

const flatSteps = buildSteps(bank.content);
const { practiceMap, diagramMap, quizMap } = placeChapterItems({
  flatSteps, contentData: bank.content, diagramsData: bank.diagrams, quizData: bank.quiz, practiceData: bank.practice,
});
const stripSvg = (svg) => String(svg || '').replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ');
const diagramText = (d) => [d.title, d.description, ...(d.checklist || []), ...(d.scenarios || []).flatMap((s) => [s.label, stripSvg(s.svg)])].join(' | ');
/* mark allocations, level names and the "to 1" of a ratio are scaffolding, not figures the scheme reaches */
const scaffold = (s) => String(s).replace(/Level [1-4]/g, ' ').replace(/\(\d+ marks?\)/g, ' ').replace(/\bto 1\b/g, ' ');
const nums = (s) => [...new Set([...String(s).matchAll(/\d[\d,]*(?:\.\d+)?/g)].map((m) => m[0].replace(/,$/, '')))];
const has = (hay, n) => new RegExp(`(^|[^\\d.,])${n.replace(/\./g, '\\.')}(?![\\d]|,\\d|\\.\\d)`).test(hay);

let leaks = 0;
flatSteps.forEach((s, idx) => {
  if (s.type !== 'checkin') return;
  const block = bank.content[s.blockIndex];
  const d = diagramMap[idx]; const p = practiceMap[idx]; const q = quizMap[idx];
  const dt = d ? diagramText(d) : '';
  const blockText = JSON.stringify(block) + JSON.stringify(bank.notes?.[s.blockIndex] ?? '');
  console.log(`\n=== check-in ${s.blockIndex + 1} "${block.title}" · diagram ${d ? `"${d.title}"` : 'none'} · quiz ${q ? 'yes' : 'none'} · practice ${p ? `${p.command} ${p.marks}` : 'none'}`);
  if (!p) return;
  console.log(`  practice asks: ${p.question.split('profit target is met. ').pop()}`);
  const given = new Set(nums(p.question));
  for (const n of nums(scaffold(p.guidance))) {
    if (given.has(n)) continue;
    const onD = has(dt, n); const inBody = has(blockText, n);
    if (onD) leaks++;
    console.log(`  scheme reaches ${n.padEnd(8)} diagram: ${onD ? 'PRINTS IT' : 'no'} · chapter body/notes: ${inBody ? 'prints it' : 'no'}`);
  }
});
console.log(`\nscheme figures (not given in the stem) that a check-in's diagram prints: ${leaks}`);
process.exit(leaks ? 1 : 0);
