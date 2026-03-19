import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createServerClient } from '@/lib/supabase-server';

/**
 * GET /api/progress/dashboard
 * Aggregates all progress data for the authenticated user.
 * Returns overall mastery, per-subject breakdown, recent activity,
 * streak, overdue count, and weakest topics.
 */
export async function GET() {
  // 1. Authenticate
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const db = createServerClient();

  // 2. Fetch structure: subjects, units, sections
  const [{ data: subjects }, { data: units }, { data: sections }] = await Promise.all([
    db.from('subjects').select('id, name, slug, sort_order').order('sort_order'),
    db.from('units').select('id, number, title, subject_id').order('number'),
    db.from('sections').select('id, title, short_title, unit_id, sort_order').order('sort_order'),
  ]);

  // 3. Fetch question counts from section_quiz AND section_flashcards
  const sectionIds = (sections || []).map(s => s.id);

  const [{ data: quizRows }, { data: flashcardRows }] = await Promise.all([
    db.from('section_quiz').select('section_id, data').in('section_id', sectionIds),
    db.from('section_flashcards').select('section_id, data').in('section_id', sectionIds),
  ]);

  // Quiz question counts per section
  const quizCounts = {};
  for (const row of (quizRows || [])) {
    quizCounts[row.section_id] = Array.isArray(row.data) ? row.data.length : 0;
  }

  // Flashcard counts per section
  const fcCounts = {};
  for (const row of (flashcardRows || [])) {
    fcCounts[row.section_id] = Array.isArray(row.data) ? row.data.length : 0;
  }

  // Total questions per section = quiz + flashcards
  const totalPerSection = {};
  for (const id of sectionIds) {
    totalPerSection[id] = (quizCounts[id] || 0) + (fcCounts[id] || 0);
  }

  // 4. Fetch ALL practice_question_progress for user (quiz + flashcard fc- prefixed)
  const { data: allProgress } = await db
    .from('practice_question_progress')
    .select('section_id, question_index, repetitions, next_review, updated_at')
    .eq('user_id', user.id);

  const progressRows = allProgress || [];

  // 5. Group progress by section (merge fc- prefix back to original section)
  const progressBySec = {};
  for (const row of progressRows) {
    const originalId = row.section_id.replace(/^fc-/, '');
    if (!progressBySec[originalId]) {
      progressBySec[originalId] = { mastered: 0, learning: 0 };
    }
    if (row.repetitions >= 3) {
      progressBySec[originalId].mastered += 1;
    } else if (row.repetitions >= 1) {
      progressBySec[originalId].learning += 1;
    }
  }

  // 6. Build per-section stats
  const sectionStats = {};
  for (const id of sectionIds) {
    const total = totalPerSection[id] || 0;
    const prog = progressBySec[id] || { mastered: 0, learning: 0 };
    const newCount = Math.max(0, total - prog.mastered - prog.learning);
    sectionStats[id] = {
      mastered: prog.mastered,
      learning: prog.learning,
      new: newCount,
      total,
    };
  }

  // 7. Build subject → unit → section hierarchy
  const unitMap = {};
  for (const u of (units || [])) {
    unitMap[u.id] = u;
  }

  const sectionsByUnit = {};
  for (const s of (sections || [])) {
    if (!sectionsByUnit[s.unit_id]) sectionsByUnit[s.unit_id] = [];
    sectionsByUnit[s.unit_id].push(s);
  }

  const bySubject = (subjects || []).map(sub => {
    const subUnits = (units || []).filter(u => u.subject_id === sub.id);
    let subMastered = 0, subLearning = 0, subTotal = 0;

    const unitsData = subUnits.map(u => {
      const uSections = (sectionsByUnit[u.id] || []).map(s => {
        const stats = sectionStats[s.id] || { mastered: 0, learning: 0, new: 0, total: 0 };
        subMastered += stats.mastered;
        subLearning += stats.learning;
        subTotal += stats.total;
        return {
          id: s.id,
          title: s.short_title || s.title,
          mastered: stats.mastered,
          learning: stats.learning,
          total: stats.total,
        };
      });
      return {
        number: u.number,
        title: u.title,
        sections: uSections,
      };
    });

    return {
      slug: sub.slug,
      name: sub.name,
      mastered: subMastered,
      learning: subLearning,
      total: subTotal,
      units: unitsData,
    };
  });

  // 8. Overall stats
  let overallMastered = 0, overallLearning = 0, overallTotal = 0;
  for (const sub of bySubject) {
    overallMastered += sub.mastered;
    overallLearning += sub.learning;
    overallTotal += sub.total;
  }
  const overallNew = Math.max(0, overallTotal - overallMastered - overallLearning);
  const masteryPct = overallTotal > 0 ? Math.round((overallMastered / overallTotal) * 100) : 0;

  // 9. Overdue count: next_review < now
  const now = new Date();
  let overdueCount = 0;
  for (const row of progressRows) {
    if (row.next_review && new Date(row.next_review) < now && row.repetitions >= 1) {
      overdueCount++;
    }
  }

  // 10. Recent activity: count unique rows updated in last 7/30 days
  const day7ago = new Date(now);
  day7ago.setDate(day7ago.getDate() - 7);
  const day30ago = new Date(now);
  day30ago.setDate(day30ago.getDate() - 30);

  let last7days = 0, last30days = 0;
  for (const row of progressRows) {
    if (row.updated_at) {
      const updDate = new Date(row.updated_at);
      if (updDate >= day7ago) last7days++;
      if (updDate >= day30ago) last30days++;
    }
  }

  // 11. Activity per day (last 7 days) for chart
  const activityByDay = {};
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    activityByDay[key] = 0;
  }
  for (const row of progressRows) {
    if (row.updated_at) {
      const key = row.updated_at.slice(0, 10);
      if (activityByDay.hasOwnProperty(key)) {
        activityByDay[key]++;
      }
    }
  }
  const dailyActivity = Object.entries(activityByDay).map(([date, count]) => ({
    date,
    count,
    label: new Date(date + 'T12:00:00').toLocaleDateString('en-GB', { weekday: 'short' }),
  }));

  // 12. Streak: consecutive days with activity going back from today/yesterday
  let streak = 0;
  const activityDates = new Set();
  for (const row of progressRows) {
    if (row.updated_at) {
      activityDates.add(row.updated_at.slice(0, 10));
    }
  }
  const todayStr = now.toISOString().slice(0, 10);
  // Start from today; if no activity today, check if yesterday had activity
  let checkDate = new Date(now);
  if (!activityDates.has(todayStr)) {
    checkDate.setDate(checkDate.getDate() - 1);
    if (!activityDates.has(checkDate.toISOString().slice(0, 10))) {
      streak = 0;
    } else {
      // Count from yesterday
      while (activityDates.has(checkDate.toISOString().slice(0, 10))) {
        streak++;
        checkDate.setDate(checkDate.getDate() - 1);
      }
    }
  } else {
    while (activityDates.has(checkDate.toISOString().slice(0, 10))) {
      streak++;
      checkDate.setDate(checkDate.getDate() - 1);
    }
  }

  // 13. Weakest topics: sections with lowest accuracy (mastered/total), bottom 5
  const weakCandidates = [];
  for (const id of sectionIds) {
    const stats = sectionStats[id];
    if (!stats || stats.total === 0) continue;
    // Only include sections the user has attempted
    const prog = progressBySec[id];
    if (!prog) continue;
    const attempted = prog.mastered + prog.learning;
    if (attempted === 0) continue;
    const accuracy = Math.round((prog.mastered / stats.total) * 100);
    const section = (sections || []).find(s => s.id === id);
    weakCandidates.push({
      sectionId: id,
      title: section?.short_title || section?.title || id,
      accuracy,
      total: stats.total,
      mastered: prog.mastered,
    });
  }
  weakCandidates.sort((a, b) => a.accuracy - b.accuracy);
  const weakestTopics = weakCandidates.slice(0, 5);

  return NextResponse.json({
    overall: {
      mastered: overallMastered,
      learning: overallLearning,
      new: overallNew,
      total: overallTotal,
      masteryPct,
    },
    bySubject,
    recentActivity: { last7days, last30days },
    dailyActivity,
    streak,
    overdueCount,
    weakestTopics,
  });
}
