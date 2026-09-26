#!/usr/bin/env node
/**
 * Packet 12.5 — merge the passes and write the tags, both banks.
 *
 *   node audit/runs/packet-12.5/merge.mjs
 *
 * Reads pass1-tags.json (frozen before pass 2 ran), pass2-tags.json, adjudication/scored.json and
 * census.json. Writes:
 *   audit/practice-spec-items.json          the tags npm run spec-coverage reads, keyed by item id
 *   audit/runs/packet-12.5/review.json      EVERY item in the census, with its verdict and both passes
 *   audit/runs/packet-12.5/tagging-diff.md  the same, for a human
 *
 * A tag is written when (a) both passes proposed it, or (b) the disagreement was STRUCTURAL — every
 * pass-1 leaf shares no distinctive stem with the question, so the lexical rule could not have agreed
 * whatever the truth was — and a blind fourth reader confirmed that leaf while picking none of the
 * negative controls hidden among its candidates. Everything else is a review line, not a tag.
 *
 * An item with no written tag is ABSENT from the tags file. It is never written as `[]`: absent means
 * "not tagged", `[]` would mean "examines nothing", and the guard treats the second as a failure.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..');
const R = path.join(ROOT, 'audit/runs/packet-12.5');
const read = (p) => JSON.parse(fs.readFileSync(path.join(R, p), 'utf8'));

const p1 = read('pass1-tags.json');
const p2 = read('pass2-tags.json');
const probe = read('merge-probe.json');
const scored = read('adjudication/scored.json');
const census = read('census.json');
const oracle = JSON.parse(fs.readFileSync(path.join(ROOT, 'audit/raw/spec-items.json'), 'utf8'));
const leafById = new Map(oracle.items.filter((x) => x.kind === 'leaf').map((x) => [x.id, x]));

const banksOf = new Map();
for (const it of census.items) {
  if (!banksOf.has(it.id)) banksOf.set(it.id, { ...it, banks: [] });
  banksOf.get(it.id).banks.push(it.bank);
}

const review = [];
const tags = {};
for (const row of probe) {
  const it = banksOf.get(row.id);
  const adj = scored.items[row.id];
  let verdict;
  let write = [];
  if (row.agreed.length) { verdict = 'agreed'; write = row.agreed; }
  else if (row.cls === 'structural' && adj?.write.length) { verdict = 'adjudicated'; write = adj.write; }
  else if (row.cls === 'structural') { verdict = adj?.controlsPicked.length ? 'untagged: structural, reader picked a control' : 'untagged: structural, reader confirmed nothing'; }
  else verdict = { 'both-empty': 'untagged: neither pass tagged it', 'pass1-empty': 'untagged: pass 1 read it as examining nothing', substantive: 'untagged: the passes disagree on substance' }[row.cls];
  for (const id of write) {
    const leaf = leafById.get(id);
    if (!leaf || leaf.subject !== it.subject || leaf.topic !== it.topic) throw new Error(`${row.id}: ${id} is not a leaf of ${it.subject} ${it.topic}`);
  }
  if (write.length) tags[row.id] = { section: it.section, specItems: [...write].sort(), via: verdict };
  review.push({
    id: row.id, section: it.section, subject: it.subject, topic: it.topic, banks: it.banks, question: it.question,
    verdict, written: write.length ? [...write].sort() : null,
    pass1: p1.tags[row.id], pass2: p2.tags[row.id],
    pass1Only: row.p1only.map((x) => x.id), pass2Only: row.p2only,
    ...(adj ? { adjudication: { confirmed: adj.confirmed, rejected: adj.rejected, controlsPicked: adj.controlsPicked } } : {}),
  });
}
if (review.length !== census.totals.distinctIds) throw new Error(`review has ${review.length} items, census ${census.totals.distinctIds}`);

fs.writeFileSync(path.join(ROOT, 'audit/practice-spec-items.json'), `${JSON.stringify({
  note: 'What each section_practice question examines, keyed by item id (a content hash of the question text, so a rewritten question has a new id and falls back to untagged). Read by npm run spec-coverage and nothing else. An id absent from `items` is NOT TAGGED; no value is ever []. Written by audit/runs/packet-12.5/merge.mjs; do not edit by hand.',
  generated: new Date().toISOString().slice(0, 10),
  method: 'Two-pass agreement (packet 12.1: an independent reader on question text only, then audit/scripts/tag-lexical.mjs blind to it), plus a blind fourth reader with hidden negative controls where the disagreement was structural. Evidence: audit/runs/packet-12.5/.',
  census: `audit/runs/packet-12.5/census.json, taken ${census.taken}: ${census.totals.live} live + ${census.totals.staged} staged = ${census.totals.distinctIds} items`,
  items: Object.fromEntries(Object.entries(tags).sort(([a], [b]) => a.localeCompare(b))),
}, null, 1)}\n`);
fs.writeFileSync(path.join(R, 'review.json'), `${JSON.stringify(review, null, 1)}\n`);

/* ── tagging-diff.md ─────────────────────────────────────────────────────────────────────────── */
const n = (f) => review.filter(f).length;
const sum = (f) => review.filter(f).reduce((k, r) => k + (r.written?.length || 0), 0);
const md = [];
md.push('# Packet 12.5 — tagging both practice banks');
md.push('');
md.push('Generated by `node audit/runs/packet-12.5/merge.mjs`; do not edit by hand. Every item in the census is below — none is skipped.');
md.push('');
md.push(`Census: ${census.taken} — ${census.totals.live} live + ${census.totals.staged} staged = **${census.totals.distinctIds} items** across ${census.totals.sections} sections (${census.totals.sectionsWithDraft} held drafts).`);
md.push('');
md.push('| verdict | items | tags written |');
md.push('|---|---|---|');
for (const v of [...new Set(review.map((r) => r.verdict))].sort()) md.push(`| ${v} | ${n((r) => r.verdict === v)} | ${sum((r) => r.verdict === v)} |`);
md.push(`| **total** | **${review.length}** | **${sum(() => true)}** |`);
md.push('');
md.push(`Pass 1 proposed ${Object.values(p1.tags).reduce((k, v) => k + v.length, 0)} tags, pass 2 proposed ${Object.values(p2.tags).reduce((k, v) => k + v.length, 0)}; they agreed on ${review.reduce((k, r) => k + (r.verdict === 'agreed' ? r.written.length : 0), 0)}.`);
md.push(`Blind adjudication (structural disagreements only): ${scored.summary.realConfirmed} of ${scored.summary.realTotal} pass-1 leaves confirmed, ${scored.summary.ctlPicked} of ${scored.summary.ctlTotal} hidden controls picked (${scored.summary.itemsWithControlPicked} item left untagged for it).`);
md.push('');
const adjWithP2 = review.filter((r) => r.verdict === 'adjudicated' && r.pass2.length).length;
md.push(`**A limit of the adjudication, stated rather than tuned away.** "Structural" was defined before the reader ran as: every pass-1 leaf shares no distinctive stem with the question. It says nothing about pass 2. In ${adjWithP2} of the ${n((r) => r.verdict === 'adjudicated')} adjudicated items pass 2 had proposed OTHER leaves, and those were not among the reader's candidates (its controls were drawn from leaves neither pass proposed). So for those items the reader confirmed pass 1's leaf on its own merits but was never asked about pass 2's; the pass-2 leaves stay on the review list below. The two LLM readers are also less independent of each other than either is of the lexical pass — the 1-in-87 control rate is the evidence the reader was not simply agreeing.`);
md.push('');
md.push('## Per section');
md.push('');
md.push('| section | topic | items | tagged | leaves examined by practice | of |');
md.push('|---|---|---|---|---|---|');
const secs = [...new Set(review.map((r) => r.section))].sort();
for (const s of secs) {
  const rs = review.filter((r) => r.section === s);
  const leaves = oracle.items.filter((x) => x.kind === 'leaf' && x.subject === rs[0].subject && x.topic === rs[0].topic).length;
  const ex = new Set(rs.flatMap((r) => r.written || []));
  md.push(`| ${s} | ${rs[0].subject} ${rs[0].topic} | ${rs.length} | ${rs.filter((r) => r.written).length} | ${ex.size} | ${leaves} |`);
}
md.push('');
md.push('## Per item');
md.push('');
for (const s of secs) {
  md.push(`### ${s}`);
  md.push('');
  for (const r of review.filter((x) => x.section === s)) {
    md.push(`- \`${r.id}\` (${r.banks.join('+')}) — **${r.verdict}**${r.written ? `: ${r.written.map((i) => `\`${i}\``).join(', ')}` : ''}`);
    if (r.pass1Only.length) md.push(`  - pass 1 only: ${r.pass1Only.map((i) => `\`${i}\``).join(', ')}`);
    if (r.pass2Only.length) md.push(`  - pass 2 only: ${r.pass2Only.map((i) => `\`${i}\``).join(', ')}`);
    if (r.adjudication) md.push(`  - blind reader: confirmed ${r.adjudication.confirmed.join(', ') || 'none'}; controls picked ${r.adjudication.controlsPicked.join(', ') || 'none'}`);
  }
  md.push('');
}
fs.writeFileSync(path.join(R, 'tagging-diff.md'), `${md.join('\n')}\n`);
console.log({ items: review.length, tagged: Object.keys(tags).length, tags: Object.values(tags).reduce((k, t) => k + t.specItems.length, 0), byVerdict: Object.fromEntries([...new Set(review.map((r) => r.verdict))].map((v) => [v, n((r) => r.verdict === v)])) });
