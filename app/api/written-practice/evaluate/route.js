import { generateText } from 'ai';
import { google } from '@ai-sdk/google';
import { createClient } from '@/lib/supabase/server';
import { createServerClient } from '@/lib/supabase-server';

export const maxDuration = 30;

const SYSTEM_PROMPT = `You are an experienced Edexcel IAL Economics & Business examiner. You are marking a student's written answer to an exam-style question.

MARKING RULES:
- Grade according to Edexcel mark scheme conventions
- Use the mark scheme guidance provided as reference for expected content
- Consider command word requirements:
  - "Define": Precise definition with key terms (usually 4 marks)
  - "Outline": Brief description of key points
  - "Explain": Clear mechanism/reasoning with development
  - "Analyse": Developed chain of reasoning showing cause and effect
  - "Assess": Analysis with weighing of significance/importance, reaching a supported judgement
  - "Evaluate": Balanced arguments for and against, with a reasoned final judgement
- For longer questions (10+ marks), expect AO1 (knowledge), AO2 (application), AO3 (analysis), and AO4 (evaluation)
- Be encouraging but honest about gaps
- Award marks generously for correct content even if imperfectly expressed

Respond in JSON ONLY with this exact structure:
{
  "grade": "excellent" | "good" | "partial" | "weak",
  "marksSuggested": <number>,
  "feedback": "<one or two sentence overall assessment>",
  "strengths": ["<strength 1>", "<strength 2>"],
  "gaps": ["<gap 1>", "<gap 2>"],
  "improvementTip": "<one specific, actionable suggestion for improvement>"
}

GRADING THRESHOLDS:
- "excellent": 80-100% of marks — comprehensive, well-structured, accurate
- "good": 60-79% of marks — solid understanding with minor gaps
- "partial": 40-59% of marks — some relevant points but incomplete or lacks development
- "weak": 0-39% of marks — significant gaps, inaccurate, or does not address the question

Keep strengths and gaps to max 3 items each. Use student-friendly language.`;

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
