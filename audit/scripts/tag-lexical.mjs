#!/usr/bin/env node
/**
 * Blind lexical tagger — pass 2 of the two-pass tagging method (packet 12.1, E007).
 *
 *   node audit/scripts/tag-lexical.mjs <topic> [--subject economics|business]
 *   node audit/scripts/tag-lexical.mjs 1.3.5
 *
 * WHY THIS EXISTS. audit/EXAM-PRACTICE.md, "The independence rule": if the pass that writes a
 * question also tags what it examines, the tag is self-fulfilling and the coverage guard certifies
 * nothing. So a second pass reads each question COLD and says what it examines, and only tags the
 * two passes agree on are written.
 *
 * WHAT IT SEES. The question text and the topic's rows of audit/raw/spec-items.json. Nothing else:
 * not the guidance, not the mark scheme, not pass 1's tags, not this packet's notes. It is a pure
 * function of those two inputs, so it can be re-run and its output re-derived by anyone.
 *
 * THE RULE, fixed before any output was looked at, so it cannot be tuned to agree:
 *   - Compare crude stems of content words, stopwords dropped.
 *   - A leaf's text is its own wording plus its parent requirement's wording plus its subtopic
 *     label, because a leaf like "transport" or "insurance" means nothing on its own.
 *   - A token is DISTINCTIVE for the topic when it appears in at most 40% of the topic's leaves.
 *     "market" and "good" are not distinctive inside Market Failure; "excludable" is.
 *   - Tag a leaf when the question shares at least TWO distinctive stems with it, OR one stem that
 *     is unique to that single leaf in the whole topic.
 *
 * WHAT IT IS NOT. It is not a semantic reader. It will miss a question that examines a leaf in
 * other words, and that is the point: the disagreements it produces are the review list. A tag
 * nobody agrees on is not written, and an unexamined leaf stays visibly unexamined.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');

const STOPWORDS = new Set([
  'a', 'an', 'the', 'and', 'or', 'of', 'to', 'in', 'on', 'for', 'from', 'by', 'with', 'at', 'as',
  'is', 'are', 'be', 'been', 'was', 'were', 'it', 'its', 'this', 'that', 'these', 'those', 'which',
  'what', 'why', 'how', 'when', 'who', 'whom', 'may', 'might', 'can', 'could', 'would', 'will',
  'shall', 'should', 'must', 'not', 'no', 'do', 'does', 'did', 'has', 'have', 'had', 'more', 'most',
  'two', 'three', 'one', 'other', 'others', 'such', 'than', 'then', 'there', 'their', 'them', 'they',
  'between', 'into', 'about', 'given', 'give', 'using', 'use', 'used', 'including', 'various',
  'context', 'contexts', 'term', 'terms', 'example', 'examples', 'mark', 'marks', 'view', 'reason',
  'reasons', 'way', 'ways', 'make', 'making', 'reference', 'distinction', 'impact', 'significance',
  'level', 'levels', 'compared', 'occur', 'occurs', 'arise', 'arises', 'lead', 'leads', 'led',
  'identify', 'identification', 'illustrate', 'show', 'shows', 'area', 'areas', 'sector', 'sectors',
]);

/** Crude stemmer: enough to join plural to singular and gerund to stem. No dictionary. */
function stem(word) {
  let w = word;
  if (w.length > 5 && w.endsWith('ies')) return `${w.slice(0, -3)}y`;
  if (w.length > 4 && w.endsWith('ses')) return w.slice(0, -2);
  if (w.length > 4 && w.endsWith('es')) return w.slice(0, -2);
  if (w.length > 3 && w.endsWith('s') && !w.endsWith('ss')) return w.slice(0, -1);
  if (w.length > 5 && w.endsWith('ing')) return w.slice(0, -3);
  if (w.length > 4 && w.endsWith('ed')) return w.slice(0, -2);
  return w;
}

export function stems(text) {
  return new Set(
    String(text || '')
      .toLowerCase()
      .split(/[^a-z-]+/)
      .filter((w) => w.length > 2 && !STOPWORDS.has(w))
      .map(stem)
      .filter((w) => w.length > 2),
  );
}

/**
 * Build the topic's leaf index: id -> { stems, wording }. A leaf inherits its parent requirement's
 * wording and the subtopic label so that bare leaves ("transport") carry their sense.
 */
export function leafIndex(items, subject, topic) {
  const rows = items.filter((r) => r.subject === subject && r.topic === topic);
  const byId = new Map(rows.map((r) => [r.id, r]));
  const index = new Map();
  for (const row of rows) {
    if (row.kind !== 'leaf') continue;
    const parentId = row.id.replace(/-\d+$/, '');
    const parent = parentId !== row.id ? byId.get(parentId) : null;
    const text = [row.wording, parent?.wording, row.subtopicLabel].filter(Boolean).join(' ');
    index.set(row.id, { stems: stems(text), wording: row.wording, text });
  }
  return index;
}

/** Stems appearing in at most 40% of the topic's leaves, plus the set unique to exactly one leaf. */
export function distinctiveness(index) {
  const freq = new Map();
  for (const { stems: s } of index.values()) {
    for (const t of s) freq.set(t, (freq.get(t) || 0) + 1);
  }
  const total = index.size;
  const distinctive = new Set();
  const unique = new Set();
  for (const [t, n] of freq) {
    if (n <= Math.max(1, Math.floor(total * 0.4))) distinctive.add(t);
    if (n === 1) unique.add(t);
  }
  return { distinctive, unique };
}

/** The leaf ids this question text examines, by the rule documented at the top of this file. */
export function tagQuestion(questionText, index, { distinctive, unique }) {
  const q = stems(questionText);
  const hits = [];
  for (const [id, leaf] of index) {
    const shared = [...leaf.stems].filter((t) => q.has(t));
    const sharedDistinctive = shared.filter((t) => distinctive.has(t));
    const sharedUnique = shared.filter((t) => unique.has(t));
    if (sharedDistinctive.length >= 2 || sharedUnique.length >= 1) {
      hits.push({ id, on: sharedDistinctive.length ? sharedDistinctive : sharedUnique });
    }
  }
  return hits;
}

/* ── CLI ─────────────────────────────────────────────────────────────────────────────────────── */

// `file://${argv[1]}` does not round-trip when the repository path contains a space, which this
// one does ("Claude APP"). Compare resolved paths instead.
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const topic = process.argv[2];
  if (!topic) {
    console.error('usage: node audit/scripts/tag-lexical.mjs <topic> [--subject economics|business]');
    process.exit(2);
  }
  const si = process.argv.indexOf('--subject');
  const subject = si > -1 ? process.argv[si + 1] : 'economics';
  const oracle = JSON.parse(fs.readFileSync(path.join(ROOT, 'audit/raw/spec-items.json'), 'utf8'));
  const index = leafIndex(oracle.items, subject, topic);
  const dist = distinctiveness(index);

  const questions = JSON.parse(fs.readFileSync(0, 'utf8')); // [{ key, question }] on stdin
  const out = {};
  for (const q of questions) {
    out[q.key] = tagQuestion(q.question, index, dist).map((h) => h.id);
  }
  process.stdout.write(`${JSON.stringify(out, null, 2)}\n`);
}
