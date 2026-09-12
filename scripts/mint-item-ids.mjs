#!/usr/bin/env node
// Mint a stable `id` onto every content item that does not have one.
//
//   node scripts/mint-item-ids.mjs                  dry run over all 43 sections
//   node scripts/mint-item-ids.mjs --confirm        write
//   node scripts/mint-item-ids.mjs supply --confirm one section
//   node scripts/mint-item-ids.mjs --verify         re-read and check ids, write nothing
//
// Rules, in order of importance:
//
//  1. NEVER overwrite an existing id. An id is minted once and is then permanent. The
//     hash below is only how the first value is chosen; it is not a function the id has
//     to keep satisfying. Packets 14-56 will rewrite these stems constantly, and the id
//     must survive that — pins and progress rows point at it.
//  2. NEVER reorder, insert or remove anything. This is an in-place field addition, so
//     every existing positional index keeps meaning what it meant (DECISIONS.md,
//     2026-09-11) and the switch to ids can happen afterwards, separately.
//  3. Idempotent. Run it twice and the second run mints nothing.
//
// Ids are `<sectionId>:<kind>:<key>` and so are globally unique — 7 subsection slugs are
// reused across sections, so a bare local id could not key a progress row.
import { supabase } from './_db.mjs';
import { createHash } from 'node:crypto';

const args = process.argv.slice(2);
const CONFIRM = args.includes('--confirm');
const VERIFY = args.includes('--verify');
const only = args.filter((a) => !a.startsWith('--'));

const norm = (s) => String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
const hash8 = (s) => createHash('sha1').update(norm(s)).digest('hex').slice(0, 8);
const slug = (s) => norm(s).replace(/\s+/g, '-').slice(0, 48);

/** Item-bearing tables: [table, kind, how to derive the hash key]. */
const TABLES = [
  ['section_quiz', 'quiz', (it) => it.question],
  ['section_practice', 'practice', (it) => it.question],
  ['section_flashcards', 'card', (it) => `${it.front}|${it.back}`],
  ['section_diagrams', 'diagram', (it) => it.title],
  ['section_common_mistakes', 'mistake', (it) => it.title || it.mistake],
];

/**
 * Assign ids across one array, resolving collisions deterministically by position.
 * Returns the number minted.
 */
function mintArray(items, sectionId, kind, keyOf, used) {
  let minted = 0;
  for (const item of items) {
    if (!item || typeof item !== 'object') continue;
    if (item.id) { used.add(item.id); continue; }
    const base = `${sectionId}:${kind}:${hash8(keyOf(item))}`;
    let id = base;
    // 2 quiz stems and 29 flashcard fronts are duplicated inside a section, so a
    // hash of the stem alone is not unique. Suffix by discovery order.
    for (let n = 2; used.has(id); n++) id = `${base}-${n}`;
    item.id = id;
    used.add(id);
    minted++;
  }
  return minted;
}

async function run() {
  const { data: sections, error } = await supabase.from('sections').select('id').order('id');
  if (error) throw new Error(`sections: ${error.message}`);
  const targets = only.length ? sections.filter((s) => only.includes(s.id)) : sections;

  const totals = {};
  let writes = 0;

  for (const { id: sectionId } of targets) {
    const used = new Set();
    const changes = [];

    for (const [table, kind, keyOf] of TABLES) {
      const { data, error: readErr } = await supabase.from(table).select('data').eq('section_id', sectionId).maybeSingle();
      if (readErr) throw new Error(`${sectionId} ${table}: ${readErr.message}`);
      if (!data?.data || !Array.isArray(data.data)) continue;

      const items = data.data;
      const minted = mintArray(items, sectionId, kind, keyOf, used);
      totals[kind] = (totals[kind] || 0) + minted;
      if (minted) changes.push({ table, payload: items, minted, kind });
    }

    // section_content is nested: blocks → subsections → recall
    const { data: content, error: cErr } = await supabase.from('section_content').select('data').eq('section_id', sectionId).maybeSingle();
    if (cErr) throw new Error(`${sectionId} section_content: ${cErr.message}`);
    if (content?.data && Array.isArray(content.data)) {
      const blocks = content.data;
      let minted = 0;

      minted += mintArray(blocks, sectionId, 'block', (b) => b.title, used);

      for (const block of blocks) {
        for (const sub of block.sections || []) {
          // Subsections already carry an authored slug. Keep it — it is readable and
          // stable — but scope it to the section, because 7 slugs repeat across sections.
          if (!sub.id || !String(sub.id).includes(':')) {
            const local = sub.id ? slug(sub.id) : slug(sub.title);
            const base = `${sectionId}:sub:${local}`;
            let id = base;
            for (let n = 2; used.has(id); n++) id = `${base}-${n}`;
            sub.id = id;
            used.add(id);
            minted++;
          } else {
            used.add(sub.id);
          }

          if (sub.recall && typeof sub.recall === 'object' && !sub.recall.id) {
            const base = `${sub.id}:recall`;
            let id = base;
            for (let n = 2; used.has(id); n++) id = `${base}-${n}`;
            sub.recall.id = id;
            used.add(id);
            totals.recall = (totals.recall || 0) + 1;
          }
        }
      }

      totals.block_and_sub = (totals.block_and_sub || 0) + minted;
      if (minted || blocks.some((b) => (b.sections || []).some((s) => s.recall?.id))) {
        changes.push({ table: 'section_content', payload: blocks, minted, kind: 'content' });
      }
    }

    if (!changes.length) continue;
    writes++;

    if (CONFIRM) {
      for (const { table, payload } of changes) {
        const { error: wErr } = await supabase.from(table).update({ data: payload }).eq('section_id', sectionId);
        if (wErr) throw new Error(`WRITE FAILED ${sectionId} ${table}: ${wErr.message}`);
      }
      console.log(`  ${sectionId.padEnd(36)} ${changes.map((c) => `${c.table.replace('section_', '')}+${c.minted}`).join(' ')}`);
    } else {
      console.log(`  ${sectionId.padEnd(36)} would mint ${changes.map((c) => `${c.table.replace('section_', '')}+${c.minted}`).join(' ')}`);
    }
  }

  console.log('');
  for (const [kind, n] of Object.entries(totals)) console.log(`  ${kind.padEnd(16)} ${n}`);
  console.log(`\n${CONFIRM ? 'minted' : 'would mint'} ids across ${writes} section(s)`);
  if (!CONFIRM) console.log('re-run with --confirm to write. Snapshot first: node scripts/snapshot-section.mjs --all --label <name>');
}

/** Re-read everything and assert the invariant: every item has a unique id. */
async function verify() {
  const { data: sections } = await supabase.from('sections').select('id').order('id');
  const globalIds = new Map();
  let items = 0, missing = 0, dupes = 0;

  for (const { id: sectionId } of sections) {
    for (const [table] of [...TABLES, ['section_content']]) {
      const { data } = await supabase.from(table).select('data').eq('section_id', sectionId).maybeSingle();
      if (!data?.data || !Array.isArray(data.data)) continue;

      const walk = (arr, label) => {
        for (const item of arr) {
          if (!item || typeof item !== 'object') continue;
          items++;
          if (!item.id) { missing++; console.log(`  MISSING id: ${sectionId} ${label}`); continue; }
          if (globalIds.has(item.id)) { dupes++; console.log(`  DUPLICATE id: ${item.id}`); }
          globalIds.set(item.id, true);
          if (Array.isArray(item.sections)) {
            walk(item.sections, `${label}.sections`);
            for (const sub of item.sections) if (sub.recall) { items++; if (!sub.recall.id) { missing++; console.log(`  MISSING recall id: ${sub.id}`); } }
          }
        }
      };
      walk(data.data, table);
    }
  }

  console.log(`\nverify: ${items} items, ${globalIds.size} unique ids, ${missing} missing, ${dupes} duplicated`);
  if (missing || dupes) process.exit(1);
  console.log('every item carries a globally unique id');
}

if (VERIFY) await verify();
else await run();
