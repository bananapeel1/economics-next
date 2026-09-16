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
  const { id } = await params;

  const supabaseAuth = await createClient();
  const { data: { user } } = await supabaseAuth.auth.getUser();

  const db = createServerClient();
  let isPremium = false;
  if (user) {
    const sub = await getSubscriptionRow(db, user.id);
    isPremium = hasPremiumAccess(sub) || user.app_metadata?.role === 'admin';
  }

  const [content, notes, diagrams, flashcards, quiz, mistakes, practice, extras] = await Promise.all([
    db.from('section_content').select('data').eq('section_id', id).maybeSingle(),
    db.from('section_notes').select('data').eq('section_id', id).maybeSingle(),
    db.from('section_diagrams').select('data').eq('section_id', id).maybeSingle(),
    db.from('section_flashcards').select('data').eq('section_id', id).maybeSingle(),
    db.from('section_quiz').select('data').eq('section_id', id).maybeSingle(),
    db.from('section_common_mistakes').select('data').eq('section_id', id).maybeSingle(),
    db.from('section_practice').select('data').eq('section_id', id).maybeSingle(),
    db.from('section_extras').select('data').eq('section_id', id).maybeSingle(),
  ]);

  const arr = (r) => (Array.isArray(r.data?.data) ? r.data.data : []);

  /* One description of the preview, shared with the topic pages — see lib/preview-limits.js. They
     cannot check entitlement (a cached document is served to everyone), so they send what a free
     reader may see and the client upgrades here. Two copies of these caps is how the page and this
     route drifted apart in the first place. */
  return NextResponse.json(sectionPayload({
    content: arr(content),
    notes: arr(notes),
    diagrams: arr(diagrams),
    flashcards: arr(flashcards),
    quiz: arr(quiz),
    mistakes: arr(mistakes),
    practice: arr(practice),
    extras: extras.data?.data || { chains: [], evaluation: [] },
  }, { isPremium }));
}
