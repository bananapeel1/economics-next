import { createServerClient } from '@/lib/supabase-server';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  const { id } = await params;
  const supabase = createServerClient();

  const [content, notes, diagrams, flashcards, quiz, mistakes, practice] = await Promise.all([
    supabase.from('section_content').select('data').eq('section_id', id).single(),
    supabase.from('section_notes').select('data').eq('section_id', id).single(),
    supabase.from('section_diagrams').select('data').eq('section_id', id).single(),
    supabase.from('section_flashcards').select('data').eq('section_id', id).single(),
    supabase.from('section_quiz').select('data').eq('section_id', id).single(),
    supabase.from('section_common_mistakes').select('data').eq('section_id', id).single(),
    supabase.from('section_practice').select('data').eq('section_id', id).single(),
  ]);

  return NextResponse.json({
    content: content.data?.data || [],
    notes: notes.data?.data || [],
    diagrams: diagrams.data?.data || [],
    flashcards: flashcards.data?.data || [],
    quiz: quiz.data?.data || [],
    mistakes: mistakes.data?.data || [],
    practice: practice.data?.data || [],
  });
}
