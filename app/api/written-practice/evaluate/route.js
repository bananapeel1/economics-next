import { generateText } from 'ai';
import { google } from '@ai-sdk/google';
import { createClient } from '@/lib/supabase/server';
import { createServerClient } from '@/lib/supabase-server';
import { rateLimit } from '@/lib/rate-limit';

export const maxDuration = 30;

const SYSTEM_PROMPT = `You are a senior Edexcel IAL Economics & Business examiner. Mark the student's answer using the EXACT Edexcel assessment objective (AO) framework.

═══ EDEXCEL IAL ASSESSMENT OBJECTIVES ═══

AO1 — KNOWLEDGE (definitions, concepts, theories, models)
  Award marks for: accurate definitions, correct use of terminology, relevant theory cited.

AO2 — APPLICATION (using knowledge in context)
  Award marks for: applying concepts to the specific scenario/question, using data or examples from the question stem, contextualised reasoning.

AO3 — ANALYSIS (chains of reasoning)
  Award marks for developed chains of reasoning showing cause → mechanism → effect.
  Each chain should have 2-3 logical links minimum.
  Example chain: "A rise in income tax → disposable income falls → consumption falls → AD shifts left → real GDP falls → demand-deficient unemployment rises."
  Count how many distinct analytical chains the student provides.

AO4 — EVALUATION (judgement, counter-arguments, qualified conclusions)
  Award marks for: weighing arguments, counter-arguments ("However..."), qualifying with conditions ("It depends on..."), reaching a reasoned conclusion, considering short-run vs long-run, significance/magnitude.

═══ MARK ALLOCATION BY QUESTION TYPE ═══

4-mark questions (Define/Explain):
  AO1: 2 marks (accurate definition + key terms)
  AO2: 2 marks (application/development with example)
  Expected: 1 well-developed paragraph. No evaluation needed.

6-mark questions (Explain):
  AO1: 2 marks (knowledge)
  AO2: 2 marks (application)
  AO3: 2 marks (1 developed chain of analysis)
  Expected: 2 paragraphs with one analytical chain.

8-mark questions (Analyse/Explain):
  AO1: 2 marks (knowledge)
  AO2: 2 marks (application)
  AO3: 4 marks (2 developed chains of analysis)
  Expected: 2-3 paragraphs with two clear analytical chains.

10-mark questions (Assess/Analyse):
  AO1: 2 marks (knowledge)
  AO2: 2 marks (application)
  AO3: 4 marks (2 developed chains)
  AO4: 2 marks (brief evaluation or judgement)
  Expected: 3 paragraphs + brief evaluative conclusion.

20-mark questions (Evaluate/Discuss):
  AO1: 4 marks (knowledge — definitions, theory, models)
  AO2: 4 marks (application to context)
  AO3: 6 marks (3 developed chains of analysis, for AND against)
  AO4: 6 marks (evaluation — counter-arguments, "it depends on", qualified judgement, conclusion)
  Expected structure: Introduction → Argument 1 (with chain) → Argument 2 (with chain) → Counter-argument (with chain) → Evaluation/Conclusion.

═══ MARKING INSTRUCTIONS ═══
- Mark against the AO framework above, not impressionistically
- For each AO, state whether the student earned full/partial/no marks
- Count the number of distinct analytical chains (AO3)
- Check if evaluation is present AND developed (AO4)
- Be encouraging but precise about what is missing
- For Business questions: apply same AO structure but accept business-specific terminology and frameworks (SWOT, PESTLE, Ansoff, Porter, stakeholder analysis)

Respond in JSON ONLY:
{
  "grade": "excellent" | "good" | "partial" | "weak",
  "marksSuggested": <number>,
  "ao1": {"marks": <number>, "max": <number>, "comment": "<what they showed/missed>"},
  "ao2": {"marks": <number>, "max": <number>, "comment": "<what they showed/missed>"},
  "ao3": {"marks": <number>, "max": <number>, "chains": <number>, "comment": "<what they showed/missed>"},
  "ao4": {"marks": <number>, "max": <number>, "comment": "<what they showed/missed>"},
  "feedback": "<one or two sentence overall assessment>",
  "strengths": ["<strength 1>", "<strength 2>"],
  "gaps": ["<gap 1>", "<gap 2>"],
  "improvementTip": "<one specific, actionable suggestion>"
}

For 4-mark questions, omit ao3 and ao4 (set marks to 0, max to 0).
For 6-mark questions, omit ao4 (set marks to 0, max to 0).

GRADING THRESHOLDS:
- "excellent": 80-100% of marks
- "good": 60-79% of marks
- "partial": 40-59% of marks
- "weak": 0-39% of marks

Keep strengths and gaps to max 3 items each. Student-friendly language.`;

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
  const { data: sub } = await supabase
    .from('user_subscriptions')
    .select('plan, status')
    .eq('user_id', user.id)
    .single();

  const isPremium = sub?.plan === 'premium' && sub?.status === 'active';
  const isAdmin = user.app_metadata?.role === 'admin';

  if (!isPremium && !isAdmin) {
    return Response.json({ error: 'Written answer marking requires a Pro subscription.' }, { status: 403 });
  }

  // Rate limit: 50 evaluations per user per day
  const { allowed, remaining } = rateLimit(`wa-eval:${user.id}`, 50);
  if (!allowed) {
    return Response.json({ error: 'Daily limit reached. Please try again tomorrow.' }, { status: 429 });
  }

  const { question, command, marks, guidance, studentAnswer } = await request.json();

  if (!question || !studentAnswer || studentAnswer.trim().length < 10) {
    return Response.json({ error: 'Please provide a longer answer (at least 10 characters).' }, { status: 400 });
  }

  try {
    const { text } = await generateText({
      model: google('gemini-2.5-flash-lite'),
      system: SYSTEM_PROMPT,
      prompt: buildUserPrompt({ question, command, marks, guidance, studentAnswer }),
      maxTokens: 800,
    });

    // Parse JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return Response.json({ error: 'Could not parse AI response.' }, { status: 500 });
    }

    const result = JSON.parse(jsonMatch[0]);

    // Validate and clamp marksSuggested
    if (typeof result.marksSuggested === 'number') {
      result.marksSuggested = Math.max(0, Math.min(marks, Math.round(result.marksSuggested)));
    }

    // Ensure arrays exist
    if (!Array.isArray(result.strengths)) result.strengths = [];
    if (!Array.isArray(result.gaps)) result.gaps = [];

    return Response.json(result);
  } catch (e) {
    console.error('Written practice evaluate error:', e);
    return Response.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
