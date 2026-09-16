import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createServerClient } from '@/lib/supabase-server';
import { hasPremiumAccess } from '@/lib/entitlements';
import { getSubscriptionRow } from '@/lib/subscription-lookup';
import { PREVIEW_LIMITS, freeQuizPayload } from '@/lib/preview-limits';

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
  const allQuiz = arr(quiz);
  const allCards = arr(flashcards);
  const rawExtras = extras.data?.data || { chains: [], evaluation: [] };
  const chains = Array.isArray(rawExtras.chains) ? rawExtras.chains : [];
  const evaluation = Array.isArray(rawExtras.evaluation) ? rawExtras.evaluation : [];

  const cap = (list, n) => (isPremium ? list : list.slice(0, n));

  /* The quiz is not a flat slice: a block pins its question by array position, so slicing the array
     repoints the pins. freeQuizPayload picks the questions the section needs and rewrites that
     section's pins to match what is sent. Premium gets the bank and the pins as authored. */
  const free = isPremium ? null : freeQuizPayload(allQuiz, arr(content));

  return NextResponse.json({
    // Free, unchanged, no account needed.
    content: isPremium ? arr(content) : free.content,
    notes: arr(notes),
    diagrams: arr(diagrams),
    practice: arr(practice),

    // Preview then paywall. Sliced here, not in the browser.
    quiz: isPremium ? arr(allQuiz) : free.quiz,
    flashcards: cap(allCards, PREVIEW_LIMITS.flashcards),
    extras: {
      chains: cap(chains, PREVIEW_LIMITS.extrasChains),
      evaluation: cap(evaluation, PREVIEW_LIMITS.extrasEvaluation),
    },

    // Paid, no preview.
    mistakes: isPremium ? arr(mistakes) : [],

    // True sizes, so paywall copy stays honest once the arrays are capped.
    counts: {
      quiz: allQuiz.length,
      flashcards: allCards.length,
      extrasChains: chains.length,
      extrasEvaluation: evaluation.length,
      mistakes: arr(mistakes).length,
    },
    isPremium,
  });
}
