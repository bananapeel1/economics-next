import { generateText } from 'ai';
import { google } from '@ai-sdk/google';
import { createClient } from '@/lib/supabase/server';
import { createServerClient } from '@/lib/supabase-server';

export const maxDuration = 15;

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
    return Response.json({ error: 'AI grading requires a Pro subscription.' }, { status: 403 });
  }

  const { topic, explanation } = await request.json();

  if (!topic || !explanation || explanation.trim().length < 10) {
    return Response.json({ error: 'Please provide a longer explanation.' }, { status: 400 });
  }

  try {
    const { text } = await generateText({
      model: google('gemini-2.0-flash-lite'),
      system: `You are a friendly Edexcel A-Level Economics & Business examiner. Grade a student's explanation of a topic. Be encouraging but honest. Respond in JSON only with this exact structure:
{
  "grade": "good" | "partial" | "needs-work",
  "feedback": "One sentence overall feedback",
  "strengths": ["strength 1", "strength 2"],
  "gaps": ["gap 1", "gap 2"]
}
Keep strengths and gaps to max 3 items each. Use simple, student-friendly language.`,
      prompt: `Topic: "${topic}"\n\nStudent's explanation:\n"${explanation.trim()}"`,
      maxTokens: 300,
    });

    // Parse JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return Response.json({ error: 'Could not parse AI response.' }, { status: 500 });
    }

    const result = JSON.parse(jsonMatch[0]);
    return Response.json(result);
  } catch (e) {
    console.error('Grade explanation error:', e);
    return Response.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
