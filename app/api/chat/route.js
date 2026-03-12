import { streamText } from 'ai';
import { google } from '@ai-sdk/google';
import { createClient } from '@/lib/supabase/server';
import { createServerClient } from '@/lib/supabase-server';

export const maxDuration = 30;

// Simple in-memory rate limiter: 30 messages per user per day
const rateLimitMap = new Map();
const DAILY_LIMIT = 30;

function checkRateLimit(userId) {
  const now = Date.now();
  const dayMs = 24 * 60 * 60 * 1000;
  const entry = rateLimitMap.get(userId);

  if (!entry || now - entry.start > dayMs) {
    rateLimitMap.set(userId, { start: now, count: 1 });
    return true;
  }

  if (entry.count >= DAILY_LIMIT) {
    return false;
  }

  entry.count++;
  return true;
}

export async function POST(request) {
  // Auth check — require logged-in user
  const supabaseAuth = await createClient();
  const { data: { user } } = await supabaseAuth.auth.getUser();

  if (!user) {
    return new Response(JSON.stringify({ error: 'Please sign in to use the AI Tutor.' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Check subscription — require premium
  const supabase = createServerClient();
  const { data: sub } = await supabase
    .from('user_subscriptions')
    .select('plan, status')
    .eq('user_id', user.id)
    .single();

  const isPremium = sub?.plan === 'premium' && sub?.status === 'active';
  // Also allow admin users
  const isAdmin = user.app_metadata?.role === 'admin';

  if (!isPremium && !isAdmin) {
    return new Response(JSON.stringify({ error: 'AI Tutor requires a Pro subscription.' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Rate limiting
  if (!checkRateLimit(user.id)) {
    return new Response(
      JSON.stringify({ error: 'Daily limit reached (30 messages). Try again tomorrow!' }),
      { status: 429, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const { messages, section, unit } = await request.json();

  const system = `You are an expert Edexcel International A-Level Economics tutor. You are helping a student revise for their IAS Economics exam.

Current section: ${section?.number} — ${section?.title}
Unit: Unit ${unit?.number} — ${unit?.title} (${unit?.code})
Exam board: Edexcel International AS Level (IAL)
Exam format: 1h 45min, 80 marks — MCQs, short answer, data response, and one 20-mark essay

Your role:
- Focus specifically on the content in this section
- Reference Edexcel mark scheme requirements where relevant
- Use proper economic terminology
- When explaining diagrams, describe them clearly with labels
- For essay questions, teach the KAAE structure (Knowledge, Application, Analysis, Evaluation)
- Be concise but thorough — students need exam-ready answers
- If asked for a model answer, structure it as an examiner would expect
- Format responses with clear paragraphs. Use **bold** for key terms.`;

  const result = streamText({
    model: google('gemini-2.0-flash'),
    system,
    messages,
    maxTokens: 1024,
  });

  return result.toDataStreamResponse();
}
