import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createServerClient } from '@/lib/supabase-server';
import { quantCount, quantProgressSection, sectionFromQuantProgress } from '@/lib/quant-practice';

/**
 * GET /api/calculations-practice/progress-summary?sections=section1,section2,...
 * Per-topic stats for the calculations session (packet 13.4), in the shape the Smart Practice and
 * flashcards summaries return: `{ [sectionId]: { total, attempted, mastered, due } }`.
 *
 * `total` is not read from a table. A topic's calculations are the templates that claim its spec
 * number (lib/quant-pool.js), so the count comes from the section's own number and unit code and
 * changes the day a template is registered, with nothing to migrate. Progress rows are the
 * student's `qt-<section>` rows in practice_question_progress (lib/quant-practice.js).
 *
 * Signed out, every figure but `total` is zero and the client recomputes from localStorage, as the
 * other two summaries already do (F085).
 */
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const sectionIds = (searchParams.get('sections') || '').split(',').filter(Boolean);
  if (!sectionIds.length) return NextResponse.json({ summary: {} });
  if (sectionIds.length > 50) return NextResponse.json({ error: 'Too many sections requested.' }, { status: 400 });

  const db = createServerClient();
  const { data: sections } = await db
    .from('sections')
    .select('id, number, unit_id, units(code, subjects(slug))')
    .in('id', sectionIds);

  const totals = {};
  for (const s of sections || []) {
    totals[s.id] = quantCount({
      id: s.id,
      subject: s.units?.subjects?.slug,
      unitCode: s.units?.code,
      number: s.number,
    });
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const progressBySec = {};
  if (user) {
    const { data: rows } = await db
      .from('practice_question_progress')
      .select('section_id, repetitions, next_review')
      .eq('user_id', user.id)
      .in('section_id', sectionIds.map(quantProgressSection));
    for (const row of rows || []) {
      const id = sectionFromQuantProgress(row.section_id);
      const p = (progressBySec[id] ||= { attempted: 0, mastered: 0, due: 0 });
      p.attempted += 1;
      if (row.repetitions >= 3) p.mastered += 1;
      if (row.next_review && new Date(row.next_review).getTime() <= Date.now()) p.due += 1;
    }
  }

  const summary = {};
  for (const id of sectionIds) {
    const total = totals[id] || 0;
    const p = progressBySec[id] || { attempted: 0, mastered: 0, due: 0 };
    summary[id] = { total, attempted: p.attempted, mastered: p.mastered, due: p.due + Math.max(0, total - p.attempted) };
  }
  return NextResponse.json({ summary });
}
