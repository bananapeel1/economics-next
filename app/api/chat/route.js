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

  const body = await request.json();
  const { messages: rawMessages, section, unit } = body;

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

  // Detect subject from unit code prefix
  const unitCode = unit?.code || '';
  const isBusinessSubject = unitCode.startsWith('WBS');
  const subjectName = isBusinessSubject ? 'Business' : 'Economics';

  const system = `You are a tutor for the **Edexcel International AS/A-Level (IAL)** ${subjectName} specification. This is the INTERNATIONAL qualification (unit codes ${isBusinessSubject ? 'WBS11-WBS14' : 'WEC11-WEC12'}), NOT the domestic UK GCE.

Section: ${section?.number} — ${section?.title}
Unit: Unit ${unit?.number} — ${unit?.title} (${unitCode})

RESPONSE STYLE — keep it simple and scannable:
- Use **bullet points** for explanations, not long paragraphs
- **Bold** key terms and definitions
- Keep answers SHORT — under 150 words unless the student asks for a full model answer
- For definitions: 1-2 clear sentences only
- For explanations: use cause → effect bullet chains
- For diagrams: briefly list axes, curves, shifts and label changes
- For essay structures: outline the key points per paragraph, don't write full prose unless asked

IAL EXAM TECHNIQUE:
- Mark scheme structure: **Knowledge** (define key terms) → **Application** (use context/data) → **Analysis** (build cause→effect chains) → **Evaluation** (weigh up, consider limitations, reach a justified judgement)
- Command words matter: "Define" = 2-4 marks (brief definition + example). "Explain" = 4-6 marks (definition + cause→effect chain). "Assess/Evaluate/Discuss" = 10-20 marks (KAAE structure with balanced argument)
- Always identify the **command word** and match your answer depth to the marks available
- For 20-mark essays: introduction not needed. Go straight into analysis paragraphs, then evaluation, then a justified conclusion

Focus on the content in this section. Use proper ${subjectName.toLowerCase()} terminology throughout.`;

  const result = streamText({
    model: google('gemini-2.5-flash-lite'),
    system,
    messages,
    maxTokens: 800,
  });

  return result.toUIMessageStreamResponse();
}
