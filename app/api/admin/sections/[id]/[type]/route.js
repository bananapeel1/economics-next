import { createServerClient } from '@/lib/supabase-server';
import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import { buildContext, gateSection, loadBundle, sameJson, TABLE_TO_KEY } from '@/lib/content-gate.mjs';
import specItems from '@/audit/raw/spec-items.json';
import baseline from '@/audit/validator-baseline.json';

const TABLE_MAP = {
  content: 'section_content',
  notes: 'section_notes',
  diagrams: 'section_diagrams',
  flashcards: 'section_flashcards',
  quiz: 'section_quiz',
  mistakes: 'section_common_mistakes',
  practice: 'section_practice',
  extras: 'section_extras',
};

/**
 * Carry item ids across an admin save.
 *
 * This PUT replaces the whole `data` array. The admin UI round-trips JSON that a person
 * may have pasted or hand-edited, so an incoming array can easily lack the `id` fields
 * minted in packet 2 — and losing them breaks every pin and progress row pointing at them.
 *
 * Ids are matched by CONTENT, not by position. Position looks simpler and is wrong: delete
 * one item from the middle and every later item inherits its neighbour's id, so a student's
 * review history silently rebinds to a different question. Losing an id is recoverable
 * (re-run scripts/mint-item-ids.mjs); mis-assigning one is not, because nothing downstream
 * can tell it happened.
 *
 * An item whose text was edited in the same save has no match and keeps no id. That is the
 * safe direction: it becomes a new item, and pin-check reports the pin that now dangles.
 */
const idKey = (item) => {
  const text = item?.question ?? item?.title ?? item?.front ?? item?.mistake ?? item?.term ?? '';
  return String(text).toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
};

function restoreIds(oldItems, newItems) {
  if (!Array.isArray(oldItems) || !Array.isArray(newItems)) return newItems;

  const available = new Map();
  for (const item of oldItems) {
    if (!item || typeof item !== 'object' || !item.id) continue;
    const key = idKey(item);
    if (!key) continue;
    if (!available.has(key)) available.set(key, []);
    available.get(key).push(item);
  }

  return newItems.map((item) => {
    if (!item || typeof item !== 'object' || Array.isArray(item)) return item;

    let previous = null;
    if (!item.id) {
      const queue = available.get(idKey(item));
      if (queue?.length) previous = queue.shift();
    }
    const merged = item.id || !previous ? { ...item } : { ...item, id: previous.id };

    // section_content nests subsections, which carry their own ids and recall widgets.
    if (Array.isArray(merged.sections)) {
      merged.sections = restoreIds(previous?.sections || [], merged.sections).map((sub, j) => {
        const prevSub = (previous?.sections || [])[j];
        if (sub?.recall && !sub.recall.id && prevSub?.recall?.id && idKey(sub) === idKey(prevSub)) {
          return { ...sub, recall: { ...sub.recall, id: prevSub.recall.id } };
        }
        return sub;
      });
    }
    return merged;
  });
}

/**
 * Packet 3 (F110). This route writes `data` directly — it is the founder's live editor and has no
 * draft step — so it is the third sanctioned writer of `data`, after publish and restore, and it
 * runs the same gate they do: the whole section as it would be after this save, against the
 * committed baseline. A save that adds a BLOCK finding is refused with the findings in the body,
 * and the editor shows them. New DEBT is allowed and counted in the response. After the write the
 * row is read back and compared, so `success` means the database holds what was sent.
 */
export async function PUT(request, { params }) {
  // Auth check — require admin role
  const supabaseAuth = await createClient();
  const { data: { user } } = await supabaseAuth.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (user.app_metadata?.role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const { id, type } = await params;
  const tableName = TABLE_MAP[type];

  if (!tableName) {
    return NextResponse.json({ error: 'Invalid content type' }, { status: 400 });
  }

  const { data: jsonData } = await request.json();
  const supabase = createServerClient();

  // Check if row exists, and keep its item ids
  const { data: existing, error: existingErr } = await supabase
    .from(tableName)
    .select('id, data')
    .eq('section_id', id)
    .maybeSingle();
  if (existingErr) return NextResponse.json({ error: existingErr.message }, { status: 500 });

  const payload = existing ? restoreIds(existing.data, jsonData) : jsonData;

  // The gate: whole section, live copies of the other seven tables, this table as it would be.
  let verdict;
  try {
    const [live, ctx] = await Promise.all([loadBundle(supabase, id), buildContext(supabase, id, specItems.items)]);
    verdict = gateSection({ ...live, [TABLE_TO_KEY[tableName]]: payload }, ctx, baseline.keys);
  } catch (err) {
    return NextResponse.json({ error: `Could not validate the section: ${err.message}` }, { status: 500 });
  }
  if (!verdict.ok) {
    return NextResponse.json({
      error: `The validator refused this save: ${verdict.newBlocks.length} BLOCK finding${verdict.newBlocks.length === 1 ? '' : 's'} not in the baseline. Nothing was written.`,
      findings: verdict.newBlocks.map((f) => ({ rule: f.rule, where: f.where, detail: f.detail })),
      newDebt: verdict.newDebt.length,
    }, { status: 422 });
  }

  let result;
  if (existing) {
    result = await supabase
      .from(tableName)
      .update({ data: payload })
      .eq('section_id', id)
      .select()
      .single();
  } else {
    result = await supabase
      .from(tableName)
      .insert({ section_id: id, data: payload })
      .select()
      .single();
  }

  if (result.error) {
    return NextResponse.json({ error: result.error.message }, { status: 500 });
  }

  // Read back the row students now read.
  const { data: back, error: backErr } = await supabase.from(tableName).select('data').eq('section_id', id).single();
  if (backErr || !sameJson(back?.data, payload)) {
    return NextResponse.json({ error: `Written, but the row read back does not match what was sent${backErr ? `: ${backErr.message}` : ''}. Check the section before trusting it.` }, { status: 500 });
  }

  return NextResponse.json({
    success: true,
    data: result.data,
    validator: { newDebt: verdict.newDebt.length, block: verdict.summary.block, debt: verdict.summary.debt },
  });
}
