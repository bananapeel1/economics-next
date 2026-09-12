import { generateText } from 'ai';
import { google } from '@ai-sdk/google';
import { createClient } from '@/lib/supabase/server';
import { createServerClient } from '@/lib/supabase-server';
import { hasPremiumAccess } from '@/lib/entitlements';
import { getSubscriptionRow } from '@/lib/subscription-lookup';
import { rateLimit } from '@/lib/rate-limit';
import { practiceCommand } from '@/lib/ial-commands';
import { normaliseAO } from '@/lib/ao-spec';
import { buildAOProfile } from '@/lib/ao-profile';
import { SYSTEM_PROMPT, RUBRIC_VERSION, AO_MAP_VERSION, hashQuestion } from '@/lib/ao-rubric';

/**
 * POST /api/written-practice/evaluate — marks one written answer and records it.
 *
 * This route is the ONLY writer of written_ao_attempts. The AO breakdown it returns used to live
 * for as long as the feedback card was on screen and was then thrown away, so the app could say how
 * one answer went and could never say what keeps happening. Writing the row here, inside the request
 * that produced the marks, is what makes the record's provenance structural: no browser can POST a
 * fabricated AO row, nothing is lost when a student closes the tab, and the stored numbers are
 * byte-identical to the ones the student was just shown.
 *
 * Nothing is written on a 401, 403, 429, 400 or a parse failure, which is why the panel is entitled
 * to say "marked" rather than "attempted".
 */
export const runtime = 'nodejs'; // node:crypto runs at module load via @/lib/ao-rubric
export const maxDuration = 30;

const MARKER_MODEL = 'gemini-2.5-flash-lite';
const AO_KEYS = ['ao1', 'ao2', 'ao3', 'ao4'];
const GRADES = new Set(['excellent', 'good', 'partial', 'weak']);

// The running line reads the most recent rows, not the oldest: ascending + limit would freeze the
// diagnosis on ancient answers the moment a user passed the limit, while the sentence still claimed
// to describe everything they had written.
const RUNNING_LIMIT = 500;

let warnedMissingTable = false;

/** A string that will satisfy the column's length CHECK, else null — an over-long value would
 *  reject the whole row rather than truncate one field. */
const str = (v, max) => (typeof v === 'string' && v.trim() !== '' && v.length <= max ? v.trim() : null);

function buildUserPrompt({ question, command, marks, guidance, studentAnswer }) {
  return `QUESTION (${marks} marks, "${command}" command word):
"${question}"

MARK SCHEME GUIDANCE (for reference — this shows the expected answer and mark allocation):
${guidance}

STUDENT'S ANSWER:
"${studentAnswer.trim()}"

Grade this answer according to the marking rules. Return JSON only.`;
}

export async function POST(request) {
  // Auth check
  const supabaseAuth = await createClient();
  const { data: { user } } = await supabaseAuth.auth.getUser();

  if (!user) {
    return Response.json({ error: 'Please sign in.' }, { status: 401 });
  }

  // Premium check
  const supabase = createServerClient();
  const sub = await getSubscriptionRow(supabase, user.id);

  const isPremium = hasPremiumAccess(sub);
  const isAdmin = user.app_metadata?.role === 'admin';

  if (!isPremium && !isAdmin) {
    return Response.json({ error: 'Written answer marking requires a Pro subscription.' }, { status: 403 });
  }

  // Rate limit: 50 evaluations per user per day
  const { allowed, remaining } = rateLimit(`wa-eval:${user.id}`, 50);
  if (!allowed) {
    return Response.json({ error: 'Daily limit reached. Please try again tomorrow.' }, { status: 429 });
  }

  // sectionId, questionIndex and sessionId locate the row; they never define what it is worth.
  // The client also sends `subject` and `wordCount`, and both are deliberately read from neither
  // place: subject is resolved from the sections join below because it drives the whole eligibility
  // map, and the word count is measured here off the answer the server was actually given. They are
  // accepted only so that an older or newer client can never be answered with a 400.
  const {
    question, command, marks, guidance, studentAnswer,
    sectionId, questionIndex, sessionId,
  } = await request.json();

  if (!question || !studentAnswer || studentAnswer.trim().length < 10) {
    return Response.json({ error: 'Please provide a longer answer (at least 10 characters).' }, { status: 400 });
  }

  // The tariff was unvalidated until now, so a missing one made marksSuggested NaN and serialised as
  // null. It is also the clamp bound for every AO maximum, so it must be an integer before anything
  // downstream runs.
  const tariffRaw = Number(marks);
  const tariff = Number.isInteger(tariffRaw) && tariffRaw > 0 && tariffRaw <= 40 ? tariffRaw : null;
  if (tariff === null) {
    return Response.json({ error: 'This question is missing its mark tariff.' }, { status: 400 });
  }

  try {
    const { text, finishReason } = await generateText({
      model: google(MARKER_MODEL),
      system: SYSTEM_PROMPT,
      prompt: buildUserPrompt({ question, command, marks, guidance, studentAnswer }),
    });

    // Parse JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return Response.json({ error: 'Could not parse AI response.' }, { status: 500 });
    }

    const result = JSON.parse(jsonMatch[0]);

    // Validate and clamp marksSuggested
    if (typeof result.marksSuggested === 'number') {
      result.marksSuggested = Math.max(0, Math.min(tariff, Math.round(result.marksSuggested)));
    }

    // Ensure arrays exist
    if (!Array.isArray(result.strengths)) result.strengths = [];
    if (!Array.isArray(result.gaps)) result.gaps = [];

    // The marker's own per-objective objects, captured BEFORE the clamped writeback overwrites them.
    // Stored raw so the divergence between what the model returned and what we counted is measurable
    // rather than assumed.
    const modelAO = {};
    for (const k of AO_KEYS) modelAO[k] = result[k] ?? null;

    // ── SERVER-SIDE QUESTION RESOLUTION ──────────────────────────────────────────────────────────
    // Subject, command and tariff all arrive from browser state today, and subject alone flips the
    // entire eligibility map. "True by construction" cannot rest on what the browser said the
    // question was, so the item is found again here by hashing its text — which also survives the
    // section_practice renumbering that every content packet performs.
    const questionHash = hashQuestion(question);
    const sectionKey = str(sectionId, 120);
    let subject = null;
    let resolvedCommand = null;
    let hidden = false;
    let bankIndex = null;
    let bankTariff = null;
    let excludedReason = sectionKey ? null : 'item_unresolved';

    if (sectionKey) {
      try {
        const [{ data: secRow, error: secErr }, { data: bank, error: bankErr }] = await Promise.all([
          supabase.from('sections').select('id, unit_id, units(number, subjects(slug))').eq('id', sectionKey).maybeSingle(),
          supabase.from('section_practice').select('data').eq('section_id', sectionKey).maybeSingle(),
        ]);
        if (secErr || bankErr) throw new Error(secErr?.message || bankErr?.message);

        // Never subjectFrom(slug || ''): it answers 'economics' for ANY unrecognised input, so a
        // failed join would file a Business answer under the Economics Appendix 6 table and store a
        // denominator that is simply wrong. An unresolved subject excludes the row instead.
        const slug = secRow?.units?.subjects?.slug;
        subject = slug === 'economics' || slug === 'business' ? slug : null;

        const items = Array.isArray(bank?.data) ? bank.data : [];
        const foundAt = items.findIndex(it => hashQuestion(String(it?.question || '')) === questionHash);
        const item = foundAt >= 0 ? items[foundAt] : null;
        bankIndex = foundAt >= 0 ? foundAt : null;
        resolvedCommand = item ? str(practiceCommand(item), 32) : null;
        hidden = !!item?.hidden;

        // The tariff is a DENOMINATOR, so it is read off the bank item exactly like the command
        // word rather than believed from the body — the header of
        // scripts/create-written-ao-attempts-table.sql says command, tariff, subject and
        // question_hash are all server-side snapshots, and until now tariff alone was not one.
        // When the item's own tariff is not the one the marker was told, the marks in hand were
        // awarded on a different basis from the allocation they would be counted against, so the
        // attempt is kept and excluded rather than scored against a split it never sat.
        const bankMarks = Number(item?.marks);
        bankTariff = Number.isInteger(bankMarks) && bankMarks > 0 && bankMarks <= 40 ? bankMarks : null;
        if (item && bankTariff !== tariff) excludedReason = 'item_unresolved';
      } catch (e) {
        subject = null;
        resolvedCommand = null;
        hidden = false;
        bankIndex = null;
        bankTariff = null;
        excludedReason = 'item_unresolved';
        console.error('[ao] question resolution failed', e?.message || e);
      }
    }

    // normaliseAO supplies 'item_unresolved' itself when subject or command came back null, so an
    // unresolvable answer is still recorded and still counted in the exclusions footnote. A marked
    // answer that vanishes with no trace is the silent exclusion this table exists to prevent.
    // The tariff the allocation is built from and the tariff the row stores: the bank's own
    // whenever the item was found, and the marking tariff only on a row that is already excluded
    // and is kept for debugging. A counted row's tariff therefore never came from the browser.
    const aoTariff = bankTariff ?? tariff;
    const ao = normaliseAO(result, { subject, command: resolvedCommand, tariff: aoTariff, hidden, excludedReason });

    // Write the clamped values back onto the response, so the feedback card can only ever show what
    // was stored: a model returning ao4 {marks:8, max:6} was rendered verbatim until now.
    for (const k of AO_KEYS) {
      result[k] = {
        ...(result[k] || {}),
        marks: ao.perAO[k].marks,
        max: ao.perAO[k].max,
        ...(k === 'ao3' ? { chains: ao.chains } : {}),
      };
    }
    result.gapTags = ao.gapTags;

    // ── THE INSERT ───────────────────────────────────────────────────────────────────────────────
    // In its own try/catch, and it may never fail the response: an answer that cannot be recorded is
    // still an answer that was marked, and the student has already paid for the marking.
    let stored = false;
    if (sectionKey) {
      try {
        const words = studentAnswer.trim().split(/\s+/).filter(Boolean).length;
        const row = {
          user_id: user.id,
          session_id: str(sessionId, 64),
          subject,
          section_id: sectionKey,
          // Debug-only, and never read by an aggregate: the position we resolved ourselves, falling
          // back to the client's for exactly the unresolved rows where it is the only clue left.
          question_index: bankIndex ?? (Number.isInteger(questionIndex) && questionIndex >= 0 && questionIndex <= 10000 ? questionIndex : null),
          question_hash: questionHash,
          command: resolvedCommand,
          tariff: aoTariff,
          grade: GRADES.has(result.grade) ? result.grade : null,
          marks_awarded: Number.isInteger(result.marksSuggested) ? result.marksSuggested : null,
          word_count: Math.min(words, 5000),
          ao3_chains: ao.chains,
          gap_tags: ao.gapTags.length ? ao.gapTags : null,
          ao_comments: Object.fromEntries(AO_KEYS.map(k => [k, typeof modelAO[k]?.comment === 'string' ? modelAO[k].comment : null])),
          gaps: result.gaps,
          improvement_tip: (typeof result.improvementTip === 'string' ? result.improvementTip : '').slice(0, 600) || null,
          marker_model: MARKER_MODEL,
          rubric_version: RUBRIC_VERSION,
          ao_map_version: AO_MAP_VERSION,
          finish_reason: str(finishReason, 24),
          model_ao: modelAO,
          excluded_reason: ao.excludedReason,
        };
        for (const k of AO_KEYS) {
          row[`${k}_marks`] = ao.perAO[k].marks;
          row[`${k}_max`] = ao.perAO[k].max;
          row[`${k}_counts`] = ao.perAO[k].counts;
        }

        const { error } = await supabase.from('written_ao_attempts').insert(row);
        if (error) {
          // Deploy-order guarantee: this code ships before the founder runs the SQL by hand, so a
          // missing table warns once per server instance and is otherwise silent.
          if (/schema cache|does not exist|42P01/i.test(error.message || '')) {
            if (!warnedMissingTable) {
              warnedMissingTable = true;
              console.warn('[ao] written_ao_attempts table missing — run scripts/create-written-ao-attempts-table.sql in the Supabase SQL editor. AO rows are being dropped until then.');
            }
          } else {
            console.error('[ao] insert failed', error.message);
          }
        } else {
          stored = true;
        }
      } catch (e) {
        console.error('[ao] insert threw', e?.message || e);
      }
    }

    // ── RUNNING LINE ─────────────────────────────────────────────────────────────────────────────
    // One indexed select on a call that has already waited several seconds for Gemini, so the
    // diagnosis reaches the student inside the feedback they are already reading. Scoped to the
    // resolved subject; with no subject there is no set of answers the sentence could honestly be
    // about, so there is no line.
    result.aoRunning = null;
    if (subject) {
      try {
        const { data: rows } = await supabase
          .from('written_ao_attempts')
          .select('subject, section_id, command, tariff, ao1_marks, ao1_max, ao2_marks, ao2_max, ao3_marks, ao3_max, ao3_chains, ao4_marks, ao4_max, gap_tags, excluded_reason, created_at')
          .eq('user_id', user.id)
          .eq('subject', subject)
          .order('created_at', { ascending: false })
          .limit(RUNNING_LIMIT);

        const recent = rows || [];
        // Descending in SQL so the newest answers are the ones kept, reversed here because
        // buildAOProfile aggregates oldest-first.
        const profile = buildAOProfile(recent.slice().reverse(), {
          subject,
          truncated: recent.length === RUNNING_LIMIT,
        });
        result.aoRunning = profile.inline;
      } catch (e) {
        console.error('[ao] running line failed', e?.message || e);
        result.aoRunning = null;
      }
    }

    result.aoStored = stored;

    return Response.json(result);
  } catch (e) {
    console.error('Written practice evaluate error:', e);
    return Response.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
