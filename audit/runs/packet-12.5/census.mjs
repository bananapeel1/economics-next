#!/usr/bin/env node
/**
 * Packet 12.5, step 1 — count BOTH practice banks before sizing anything. READ-ONLY.
 *
 *   node audit/runs/packet-12.5/census.mjs            write census.json + pass1-input/*.json
 *
 * Reads `section_practice` straight from the database, because the files the coverage guard reads
 * are not the banks any more: `audit/content-sections/` is the t=0 dump (215 items, no ids), and the
 * 25 September checkpoint published most rebuilds over it. The live bank is `data`, the staged bank
 * is `draft` (non-null only while a rebuild is staged). Nothing here writes to the database.
 *
 * WHAT THE PASS-1 INPUTS CONTAIN, AND WHAT THEY DO NOT. Per the independence rule
 * (audit/EXAM-PRACTICE.md §4) a reader tags a question from its TEXT ONLY against its topic's rows of
 * audit/raw/spec-items.json. So each input carries `{ key, question }` per item and
 * `{ id, subtopic, requirement, wording }` per leaf — never `guidance`, `context`, `command`, marks,
 * a mark scheme, packet 12.1's tags, or pass 2's output.
 *
 * Market Failure's items whose text matches packet 12.1's staged bank exactly are NOT re-read: 12.1's
 * pass 1 for them was recorded before its pass 2 ran, so it stands, and reusing it is what lets the
 * merge be checked against the 12.1 artefact (SPEC.md, "If the script and the artefact disagree about
 * Market Failure, the script is wrong").
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { supabase } from '../../../scripts/_db.mjs';
import { loadSections } from '../../../lib/spec-coverage.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..');
const RUN = path.join(ROOT, 'audit/runs/packet-12.5');
const oracle = JSON.parse(fs.readFileSync(path.join(ROOT, 'audit/raw/spec-items.json'), 'utf8'));

const sections = loadSections();
if (sections.length !== 43) throw new Error(`expected 43 sections from lib/spec-coverage.js, got ${sections.length}`);
const bySlug = new Map(sections.map((s) => [s.slug, s]));

const { data: rows, error } = await supabase.from('section_practice').select('section_id, data, draft, spec_items, kind').order('section_id');
if (error) throw new Error(error.message);

// 12.1's pass 1 for Market Failure, keyed by question text via 12.1's own bank files.
const p121 = JSON.parse(fs.readFileSync(path.join(ROOT, 'audit/runs/packet-12.1/pass1-tags.json'), 'utf8'));
const p121Bank = JSON.parse(fs.readFileSync(path.join(ROOT, 'audit/snapshots/packet-25-bundle__economics__market-failure.json'), 'utf8'));
const p121Staged = (p121Bank.practice || p121Bank.tables?.practice || []);
const p121ByText = new Map(p121Staged.map((q, i) => [q.question, { key: `section_practice.staged:${i}`, tags: p121.tags[`section_practice.staged:${i}`] }]));

const census = { taken: new Date().toISOString(), note: 'Read-only census of section_practice. live = data, staged = draft. Ids are content hashes of the question text (`<slug>:practice:<hash8>`), so a rewritten question gets a new id.', sections: [], items: [] };
const reused = {};
fs.mkdirSync(path.join(RUN, 'pass1-input'), { recursive: true });

for (const r of rows) {
  const s = bySlug.get(r.section_id);
  if (!s) throw new Error(`section_practice row ${r.section_id} is not one of the 43 sections`);
  const live = Array.isArray(r.data) ? r.data : [];
  const staged = Array.isArray(r.draft) ? r.draft : null;
  census.sections.push({ slug: s.slug, subject: s.subject, topic: s.topic, live: live.length, staged: staged ? staged.length : null, columnSpecItems: r.spec_items, columnKind: r.kind });
  const bankItems = [...live.map((q) => ['live', q]), ...(staged || []).map((q) => ['staged', q])];
  const toRead = [];
  for (const [bank, q] of bankItems) {
    if (!q.id) throw new Error(`${s.slug} ${bank} item without an id`);
    census.items.push({ id: q.id, section: s.slug, subject: s.subject, topic: s.topic, bank, command: q.command, marks: q.marks, question: q.question });
    const prior = s.slug === 'market-failure' ? p121ByText.get(q.question) : null;
    if (prior && prior.tags) { reused[q.id] = { from: `packet-12.1 pass1 ${prior.key}`, tags: prior.tags }; continue; }
    if (!toRead.some((t) => t.key === q.id)) toRead.push({ key: q.id, question: q.question });
  }
  const topicRows = oracle.items.filter((x) => x.subject === s.subject && x.topic === s.topic);
  const byId = new Map(topicRows.map((x) => [x.id, x]));
  const leaves = topicRows.filter((x) => x.kind === 'leaf').map((x) => ({
    id: x.id,
    subtopic: x.subtopicLabel,
    requirement: x.parent ? byId.get(x.parent)?.wording : undefined,
    wording: x.wording,
  }));
  if (!leaves.length) throw new Error(`no oracle leaves for ${s.subject} ${s.topic}`);
  if (toRead.length) {
    fs.writeFileSync(path.join(RUN, 'pass1-input', `${s.slug}.json`), `${JSON.stringify({ section: s.slug, subject: s.subject, topic: s.topic, title: s.title, questions: toRead, leaves }, null, 1)}\n`);
  }
}

census.totals = {
  sections: census.sections.length,
  live: census.items.filter((i) => i.bank === 'live').length,
  staged: census.items.filter((i) => i.bank === 'staged').length,
  sectionsWithDraft: census.sections.filter((s) => s.staged !== null).length,
  distinctIds: new Set(census.items.map((i) => i.id)).size,
  reusedFrom121: Object.keys(reused).length,
  columnNonNull: census.sections.filter((s) => s.columnSpecItems !== null || s.columnKind !== null).length,
};
fs.writeFileSync(path.join(RUN, 'census.json'), `${JSON.stringify(census, null, 1)}\n`);
fs.writeFileSync(path.join(RUN, 'pass1-reused-12.1.json'), `${JSON.stringify({ note: 'Market Failure items whose question text is byte-identical to packet 12.1 staged items; their pass 1 is 12.1\'s, recorded before 12.1 ran pass 2.', tags: reused }, null, 1)}\n`);
console.log(census.totals);
