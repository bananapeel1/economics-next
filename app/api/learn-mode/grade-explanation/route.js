import { generateText } from 'ai';
import { google } from '@ai-sdk/google';
import { createClient } from '@/lib/supabase/server';
import { createServerClient } from '@/lib/supabase-server';
import { hasPremiumAccess } from '@/lib/entitlements';
import { getSubscriptionRow } from '@/lib/subscription-lookup';
import { rateLimit } from '@/lib/rate-limit';
import { specForUnitCode, markingGuidance, ESSAY_20_STRUCTURE } from '@/lib/ial-marking';

export const maxDuration = 15;

const GRADES = new Set(['good', 'partial', 'needs-work']);

/**
 * Build the marking rubric from the chapter the student just read.
 *
 * The old prompt passed the chapter TITLE and nothing else, so the model marked an IAL answer
 * against its own general knowledge of "Economics & Business". Everything below is content the
 * client already holds; passing it turns a vibe check into marking against what was taught.
 */
function buildRubric({ keyIdea, takeaway, misconception, examMatters }) {
  const parts = [];
  if (keyIdea) parts.push(`KEY IDEA the explanation should capture:\n${keyIdea}`);
  if (Array.isArray(takeaway) && takeaway.length) {
    parts.push(`POINTS THE CHAPTER TREATS AS ESSENTIAL:\n${takeaway.map((t) => `- ${t}`).join('\n')}`);
  } else if (typeof takeaway === 'string' && takeaway.trim()) {
    parts.push(`POINTS THE CHAPTER TREATS AS ESSENTIAL:\n${takeaway.trim()}`);
  }
  if (misconception) {
    parts.push(`COMMON MISCONCEPTION. If the student has written this, say so plainly and correct it:\n${misconception}`);
  }
  if (examMatters) parts.push(`WHY IT MATTERS IN THE EXAM:\n${examMatters}`);
  return parts.join('\n\n');
}

const SHAPE = `Respond with JSON only, no prose around it, exactly this shape:
{
  "grade": "good" | "partial" | "needs-work",
  "feedback": "one sentence, addressed to the student",
  "strengths": ["at most 3 short items"],
  "gaps": ["at most 3 short items"]
}`;

/** Pull the first balanced JSON object out of a model response. */
function extractJson(text) {
  const start = text.indexOf('{');
  if (start < 0) return null;
  let depth = 0;
  let inString = false;
  let escaped = false;
  for (let i = start; i < text.length; i++) {
    const c = text[i];
    if (escaped) { escaped = false; continue; }
    if (c === '\\') { escaped = true; continue; }
    if (c === '"') inString = !inString;
    if (inString) continue;
    if (c === '{') depth++;
    else if (c === '}' && --depth === 0) {
      try { return JSON.parse(text.slice(start, i + 1)); } catch { return null; }
    }
  }
  return null;
}

/** Coerce whatever came back into the documented shape, or null if it is unusable. */
function normalise(raw) {
  if (!raw || typeof raw !== 'object') return null;
  const grade = String(raw.grade || '').toLowerCase();
  if (!GRADES.has(grade)) return null;
  const list = (v) => (Array.isArray(v) ? v : typeof v === 'string' && v.trim() ? [v] : [])
    .filter((x) => typeof x === 'string' && x.trim())
    .slice(0, 3)
    .map((x) => x.trim());
  const feedback = typeof raw.feedback === 'string' ? raw.feedback.trim() : '';
  if (!feedback) return null;
  return { grade, feedback, strengths: list(raw.strengths), gaps: list(raw.gaps) };
}

export async function POST(request) {
  const supabaseAuth = await createClient();
  const { data: { user } } = await supabaseAuth.auth.getUser();

  if (!user) {
    return Response.json({ error: 'Please sign in.' }, { status: 401 });
  }

  const supabase = createServerClient();
  const sub = await getSubscriptionRow(supabase, user.id);

  const isPremium = hasPremiumAccess(sub);
  const isAdmin = user.app_metadata?.role === 'admin';

  if (!isPremium && !isAdmin) {
    return Response.json({ error: 'AI grading requires a Pro subscription.' }, { status: 403 });
  }

  const { allowed } = rateLimit(`grade-exp:${user.id}`, 50);
  if (!allowed) {
    return Response.json({ error: 'Daily limit reached. Please try again tomorrow.' }, { status: 429 });
  }

  const { topic, explanation, unitCode, keyIdea, takeaway, misconception, examMatters } = await request.json();

  if (!topic || !explanation || explanation.trim().length < 10) {
    return Response.json({ error: 'Please provide a longer explanation.' }, { status: 400 });
  }

  const spec = specForUnitCode(unitCode);
  const rubric = buildRubric({ keyIdea, takeaway, misconception, examMatters });

  const system = `You are an experienced Edexcel International A-Level (IAL) ${spec.subject} examiner marking a
student's own-words explanation of a chapter they have just read. Be encouraging and honest; they are 16 to 18
and revising, often on a phone.

${markingGuidance(spec)}

${ESSAY_20_STRUCTURE}

MARK AGAINST THE CHAPTER, NOT AGAINST EVERYTHING YOU KNOW. If the student has covered what the chapter
teaches, that is "good", even if a fuller answer exists. Reserve "needs-work" for an explanation that is wrong
or misses the key idea, not for one that is merely brief. Quote the student's own words when naming a gap.
Do not invent a gap to seem rigorous: an empty gaps list is a valid response.

${SHAPE}`;

  const prompt = `CHAPTER: "${topic}"
${rubric ? `\n${rubric}\n` : '\n(No chapter rubric was supplied. Mark against standard IAL expectations for this topic and say so in the feedback.)\n'}
STUDENT'S EXPLANATION:
"""
${explanation.trim()}
"""`;

  // One retry. The old route regex-matched the first {...} it could see and 500'd on any miss,
  // which turned an occasional stray preamble into a dead button for the student.
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const { text } = await generateText({
        model: google('gemini-2.0-flash-lite'),
        system: attempt === 0 ? system : `${system}\n\nYour previous reply could not be parsed. Return ONLY the JSON object.`,
        prompt,
        maxOutputTokens: 400,
        temperature: attempt === 0 ? 0.3 : 0,
      });
      const result = normalise(extractJson(text));
      if (result) return Response.json(result);
    } catch (e) {
      console.error('[grade-explanation] attempt', attempt, e?.message || e);
      if (attempt === 1) {
        return Response.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
      }
    }
  }

  return Response.json({ error: 'Could not mark that answer. Please try again.' }, { status: 502 });
}
