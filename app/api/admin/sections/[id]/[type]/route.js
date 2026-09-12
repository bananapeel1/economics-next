import { createServerClient } from '@/lib/supabase-server';
import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

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
  const { data: existing } = await supabase
    .from(tableName)
    .select('id, data')
    .eq('section_id', id)
    .single();

  let result;
  if (existing) {
    result = await supabase
      .from(tableName)
      .update({ data: restoreIds(existing.data, jsonData) })
      .eq('section_id', id)
      .select()
      .single();
  } else {
    result = await supabase
      .from(tableName)
      .insert({ section_id: id, data: jsonData })
      .select()
      .single();
  }

  if (result.error) {
    return NextResponse.json({ error: result.error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, data: result.data });
}
