import { streamText } from 'ai';
import { google } from '@ai-sdk/google';
import { createClient } from '@/lib/supabase/server';
import { createServerClient } from '@/lib/supabase-server';
import { hasPremiumAccess } from '@/lib/entitlements';
import { getSubscriptionRow } from '@/lib/subscription-lookup';
import { rateLimit } from '@/lib/rate-limit';
import { specForUnitCode, markingGuidance, ESSAY_20_STRUCTURE } from '@/lib/ial-marking';

export const maxDuration = 30;

const DAILY_LIMIT = 30;

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
  const sub = await getSubscriptionRow(supabase, user.id);

  const isPremium = hasPremiumAccess(sub);
  // Also allow admin users
  const isAdmin = user.app_metadata?.role === 'admin';

  if (!isPremium && !isAdmin) {
    return new Response(JSON.stringify({ error: 'AI Tutor requires a Pro subscription.' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Rate limiting. Shared limiter, so the two AI routes cannot each grant a separate allowance.
  // Honest caveat: this is per-instance memory, so on Vercel it bounds a burst rather than a day.
  // A durable limiter needs a store; tracked as F019 and out of scope for a prompt-correctness packet.
  if (!rateLimit(`chat:${user.id}`, DAILY_LIMIT).allowed) {
    return new Response(
      JSON.stringify({ error: 'Daily limit reached (30 messages). Try again tomorrow!' }),
      { status: 429, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const body = await request.json();
  const { messages: rawMessages, section, unit, sectionBrief } = body;

  // Convert UIMessages (parts-based) to ModelMessages (content-based) for streamText
  const messages = (rawMessages || []).map(msg => {
    // If message already has content string, use it directly
    if (typeof msg.content === 'string') {
      return { role: msg.role, content: msg.content };
    }
    // Convert parts-based UIMessage to content string
    if (msg.parts) {
      const text = msg.parts
        .filter(p => p.type === 'text')
        .map(p => p.text)
        .join('');
      return { role: msg.role, content: text };
    }
    return { role: msg.role, content: '' };
  });

  const unitCode = unit?.code || '';

  // The chapter the student is actually on. Without this the tutor answers from general knowledge
  // and can contradict the notes on screen — the substance of finding F018.
  const briefBlock = Array.isArray(sectionBrief) && sectionBrief.length
    ? `WHAT THIS SECTION TEACHES. Answer from this first, and say so if the student asks about
something outside it. Do not contradict these; if you believe one is wrong, say the notes say X and
explain the distinction rather than asserting the opposite.

${sectionBrief.map((c) => {
        const ideas = (c.keyIdeas || []).map((k) => `    - ${k}`).join('\n');
        const exam = (c.examMatters || []).map((k) => `    Exam: ${k}`).join('\n');
        return `  ${c.title}\n${ideas}${exam ? `\n${exam}` : ''}`;
      }).join('\n')}
`
    : '';

  const spec = specForUnitCode(unitCode);
  const subjectName = spec.subject;

  const system = `You are a tutor for the Edexcel International A-Level (IAL) ${subjectName} specification.

Section: ${section?.number} — ${section?.title}
Unit: Unit ${unit?.number} — ${unit?.title} (${unitCode})
${briefBlock}

${markingGuidance(spec)}

RESPONSE STYLE — keep it simple and scannable:
- Use bullet points for explanations, not long paragraphs
- Bold key terms and definitions
- Keep answers SHORT, under 150 words, unless the student asks for a full model answer
- For definitions: one or two clear sentences
- For explanations: cause and effect bullet chains
- For diagrams: list axes, curves, shifts and the label changes that earn marks
- For essay structures: outline the points per paragraph rather than writing the prose

ANSWERING ABOUT MARKS:
- Always name the command word first and match the depth of your answer to its tariff above.
- Never quote a tariff that is not in the list for this subject. If a student asks about one of
  ${spec.absent.join(' or ')}, tell them it does not appear in IAL ${subjectName} and give them the
  command word their paper actually uses.
${ESSAY_20_STRUCTURE}

Stay on the content of this section. Use proper ${subjectName.toLowerCase()} terminology throughout.`;

  const result = streamText({
    model: google('gemini-2.5-flash-lite'),
    system,
    messages,
    maxOutputTokens: 800,
  });

  return result.toUIMessageStreamResponse();
}
