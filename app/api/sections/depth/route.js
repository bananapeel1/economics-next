import { NextResponse } from 'next/server';
import { createAnonClient } from '@/lib/supabase-anon';

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
 *
 * Two deployment facts this route learned the hard way, on the Vercel preview for packet 5:
 *
 *  1. It must NOT be prerendered. `export const revalidate` made Next run the handler during
 *     `next build`, and a build that talks to Supabase fails wherever the key is absent — which is
 *     every Preview deployment, because `SUPABASE_SERVICE_ROLE_KEY` is Production-only. The build
 *     failed with "supabaseKey is required" and took the whole deployment with it. The hourly cache
 *     is the CDN's job, via the `s-maxage` header below, not the build's.
 *  2. It reads with the ANON key. These are public counts over tables the public topic pages already
 *     read anonymously, so the service role buys nothing and costs the Preview environment. And
 *     `createAnonClient()` falls back to a no-op client when the env vars are missing, so a missing
 *     variable degrades the depth chip instead of breaking a build.
 */
export const dynamic = 'force-dynamic';

const MIN_CHAPTERS = 4;
const MIN_QUIZ = 20;

export async function GET() {
  const db = createAnonClient();
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
