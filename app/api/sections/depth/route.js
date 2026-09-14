import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase-server';

/**
 * GET /api/sections/depth — how much each section holds, for the honest depth signal (F083).
 *
 * Units 3-4 are a fraction of Units 1-2: 2 chapters and 10 questions against 5-8 chapters and 25.
 * A Year 13 student who opens one finishes it in two steps and concludes the app does not cover
 * their year. Until the content packets fill those sections, the product should say so rather than
 * ship the thinner section silently. The thresholds are the validator's own (depth.blocks ≥ 4,
 * depth.quiz ≥ 20, lib/content-validator.mjs), so the signal and the gate agree.
 *
 * Public, no entitlement involved: counts only, no content. Cached for an hour at the edge; the
 * numbers move only when a content packet publishes.
 */
export const revalidate = 3600;

const MIN_CHAPTERS = 4;
const MIN_QUIZ = 20;

export async function GET() {
  const db = createServerClient();
  const [{ data: quiz, error: qErr }, { data: content, error: cErr }] = await Promise.all([
    db.from('section_quiz').select('section_id, data'),
    db.from('section_content').select('section_id, data'),
  ]);
  if (qErr || cErr) return NextResponse.json({ error: (qErr || cErr).message }, { status: 500 });

  const depth = {};
  for (const row of content || []) {
    const blocks = Array.isArray(row.data) ? row.data.length : 0;
    depth[row.section_id] = { chapters: blocks, quiz: 0 };
  }
  for (const row of quiz || []) {
    const n = Array.isArray(row.data) ? row.data.length : 0;
    depth[row.section_id] = { ...(depth[row.section_id] || { chapters: 0 }), quiz: n };
  }
  for (const id of Object.keys(depth)) {
    const d = depth[id];
    d.thin = d.chapters < MIN_CHAPTERS || d.quiz < MIN_QUIZ;
  }

  return NextResponse.json({ depth, thresholds: { chapters: MIN_CHAPTERS, quiz: MIN_QUIZ } }, {
    headers: { 'Cache-Control': 'public, max-age=300, s-maxage=3600, stale-while-revalidate=86400' },
  });
}
