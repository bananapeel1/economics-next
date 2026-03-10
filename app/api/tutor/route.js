import { NextResponse } from 'next/server';

export async function POST(request) {
  const { apiKey, messages, section, unit } = await request.json();

  if (!apiKey) {
    return NextResponse.json({ error: 'API key is required' }, { status: 400 });
  }

  const systemPrompt = `You are an expert Edexcel International A-Level Economics tutor. You are helping a student revise for their IAS Economics exam.

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
- If asked for a model answer, structure it as an examiner would expect`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1024,
        system: systemPrompt,
        messages: messages.map(m => ({ role: m.role, content: m.content })),
      }),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      return NextResponse.json(
        { error: err.error?.message || `API error: ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json({ text: data.content[0].text });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
