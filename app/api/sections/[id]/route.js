import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createServerClient } from '@/lib/supabase-server';
import { hasPremiumAccess } from '@/lib/entitlements';
import { getSubscriptionRow } from '@/lib/subscription-lookup';
import { sectionPayload } from '@/lib/preview-limits';

/**
 * GET /api/sections/[id] — everything the section view renders, subject to entitlement.
 *
 * F086, the half that mattered. This route used the anon client with no auth and no premium check
 * and returned the complete section payload to anyone: every quiz question with its `correctIndex`,
 * every flashcard, every extras chain. `components/StudyApp.jsx` fetches it and hands the arrays to
 * QuizTab, FlashcardsTab and ExtrasTab, which each did a client-side `.slice(0, PREVIEW_LIMIT)` and
 * drew a paywall over the rest. The data was already in the browser; the paywall was a picture of
 * one. Gating the Smart Practice route alone left this door open, which is the one the Quiz tab
 * actually uses.
 *
 * The free surfaces are untouched and still need no account: content, notes, diagrams, practice.
 * The server now sends the preview slice for the three preview surfaces, withholds the paid one,
 * and reports true totals separately so the paywall can still say "2 of 25" honestly.
 */
export async function GET(request, { params }) {
  // F092: 152 KB raw per section, refetched on every section switch with no cache header at all.
  //
  // It cannot be a shared public cache: since F086 this response depends on who is asking (a free
  // student gets 2 quiz questions, a paying one gets 25), so `s-maxage` on a CDN would serve one
  // student's entitlement to another. `private` keeps it in the student's own browser, which is
  // where the repeat cost actually falls when they move between sections and back.
  const { id } = await params;

  const supabaseAuth = await createClient();
  const { data: { user } } = await supabaseAuth.auth.getUser();

  const db = createServerClient();
  let isPremium = false;
  if (user) {
    const sub = await getSubscriptionRow(db, user.id);
    isPremium = hasPremiumAccess(sub) || user.app_metadata?.role === 'admin';
  }

  /*
   * Draft preview, development only (packet 16).
   *
   * Since packet 2 a content packet stages to `draft` and a student reads `data`, and since the
   * 15 September decision a section authored to the packet-7 recall contract may not be published
   * until packets 5 and 7 are on main. Three finished sections are now held that way, and the
   * PROTOCOL still requires a 390x844 walkthrough of each before its gate passes — which had no
   * route, because nothing on the student path reads `draft`.
   *
   * `?draft=1` selects `draft` and falls back to `data` per table, so a staged section renders
   * through the real components with the real engine. It is OFF in any production build, including
   * Vercel previews, which build with NODE_ENV=production: the flag cannot reach a student.
   */
  const wantDraft = process.env.NODE_ENV !== 'production'
    && new URL(request.url).searchParams.get('draft') === '1';
  const cols = wantDraft ? 'data, draft' : 'data';

  const [content, notes, diagrams, flashcards, quiz, mistakes, practice, extras] = await Promise.all([
    db.from('section_content').select(cols).eq('section_id', id).maybeSingle(),
    db.from('section_notes').select(cols).eq('section_id', id).maybeSingle(),
    db.from('section_diagrams').select(cols).eq('section_id', id).maybeSingle(),
    db.from('section_flashcards').select(cols).eq('section_id', id).maybeSingle(),
    db.from('section_quiz').select(cols).eq('section_id', id).maybeSingle(),
    db.from('section_common_mistakes').select(cols).eq('section_id', id).maybeSingle(),
    db.from('section_practice').select(cols).eq('section_id', id).maybeSingle(),
    db.from('section_extras').select(cols).eq('section_id', id).maybeSingle(),
  ]);

  const payload = (r) => (wantDraft && r.data?.draft != null ? r.data.draft : r.data?.data);
  const arr = (r) => (Array.isArray(payload(r)) ? payload(r) : []);

  /* V007. The slicing used to live here, which made this route the only door that could be trusted
     — and the topic pages walked straight past it with the anon client. `sectionPayload` is that
     same logic, lifted to `lib/preview-limits.js` so the pages and the homepage call it too. This
     route is still the only caller that may pass `isPremium: true`, because it is the only one that
     knows who is asking. */
  const body = sectionPayload({
    content: arr(content),
    notes: arr(notes),
    diagrams: arr(diagrams),
    practice: arr(practice),
    quiz: arr(quiz),
    flashcards: arr(flashcards),
    mistakes: arr(mistakes),
    extras: payload(extras) || { chains: [], evaluation: [] },
  }, { isPremium });

  return NextResponse.json(body, {
    headers: {
      // A draft preview must never be cached: it is re-staged repeatedly while a packet is built.
      'Cache-Control': wantDraft ? 'no-store' : 'private, max-age=300, stale-while-revalidate=3600',
      Vary: 'Cookie',
    },
  });
}
