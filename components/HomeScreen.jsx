'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

function getRecommendation(data) {
  if (!data) return { type: 'start', text: 'Start your revision journey', sub: 'Pick a topic and begin learning', action: 'Get started' };
  if (data.overdueCount > 0) {
    const weakest = data.weakestTopics?.[0];
    return { type: 'review', text: `Review ${data.overdueCount} overdue cards`, sub: weakest?.title || 'Spaced repetition', action: 'Review now \u2192' };
  }
  if (data.weakestTopics?.length > 0 && data.weakestTopics[0].accuracy < 50) {
    return { type: 'practice', text: `Practice ${data.weakestTopics[0].title}`, sub: `${data.weakestTopics[0].accuracy}% mastery \u2014 needs work`, action: 'Practice \u2192' };
  }
  return { type: 'continue', text: 'Continue where you left off', sub: 'Keep building your knowledge', action: 'Continue \u2192' };
}

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 18) return 'Good afternoon';
  return 'Good evening';
}

function getRecommendIcon(type) {
  switch (type) {
    case 'review': return '\uD83D\uDD25';
    case 'practice': return '\uD83C\uDFAF';
    case 'continue': return '\uD83D\uDE80';
    default: return '\u2728';
  }
}

function getLocalStats() {
  try {
    let mastered = 0, learning = 0, total = 0;
    const practiceRaw = localStorage.getItem('revvy_practice_progress');
    if (practiceRaw) {
      const practice = JSON.parse(practiceRaw);
      Object.values(practice).forEach(sec => {
        Object.values(sec).forEach(q => {
          total++;
          if (q.repetitions >= 3) mastered++;
          else if (q.repetitions >= 1) learning++;
        });
      });
    }
    const fcRaw = localStorage.getItem('revvy_flashcard_progress');
    if (fcRaw) {
      const fc = JSON.parse(fcRaw);
      Object.values(fc).forEach(sec => {
        Object.values(sec).forEach(q => {
          total++;
          if (q.repetitions >= 3) mastered++;
          else if (q.repetitions >= 1) learning++;
        });
      });
    }
    const masteryPct = total > 0 ? Math.round((mastered / total) * 100) : 0;
    return { overall: { mastered, learning, total, masteryPct }, streak: 0, overdueCount: 0, recentActivity: { last7days: 0 }, bySubject: [], weakestTopics: [] };
  } catch {
    return null;
  }
}

export default function HomeScreen({ subjects, units, sections, user, isPremium, onNavigateToSection, onNavigateToTab }) {
  const [dashData, setDashData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Fetch dashboard data
    if (user) {
      fetch('/api/progress/dashboard')
        .then(res => res.ok ? res.json() : null)
        .then(data => { setDashData(data); setLoading(false); })
        .catch(() => { setDashData(getLocalStats()); setLoading(false); });
    } else {
      setDashData(getLocalStats());
      setLoading(false);
    }
  }, [user]);

  // Recommendation action handler
  function handleRecommendAction(rec) {
    if (rec.type === 'review') {
      window.location.href = '/flashcards-practice';
    } else if (rec.type === 'practice') {
      const weakest = dashData?.weakestTopics?.[0];
      if (weakest?.sectionId) {
        onNavigateToSection(weakest.sectionId);
        onNavigateToTab('learn-mode');
      } else {
        window.location.href = '/practice';
      }
    } else if (rec.type === 'continue') {
      const lastSection = typeof window !== 'undefined' ? localStorage.getItem('last-visited-section') : null;
      if (lastSection) {
        onNavigateToSection(lastSection);
        onNavigateToTab('learn-mode');
      }
    } else {
      // Default: go to first section
      const first = sections[0];
      if (first) {
        onNavigateToSection(first.id);
        onNavigateToTab('learn-mode');
      }
    }
  }

  // --- Loading ---
  if (loading) {
    return <div className="hs-loading">Loading your dashboard...</div>;
  }

  // --- Returning User Dashboard ---
  const greeting = getGreeting();
  const displayName = user?.email?.split('@')[0] || 'Student';
  const rec = getRecommendation(dashData);

  // Stats
  const streak = dashData?.streak || 0;
  const masteryPct = dashData?.overall?.masteryPct || 0;
  const thisWeek = dashData?.recentActivity?.last7days || 0;
  const overdueCount = dashData?.overdueCount || 0;

  // Topic mastery: use the active subject from localStorage or first subject
  const activeSubjectSlug = typeof window !== 'undefined' ? localStorage.getItem('last-visited-subject') : null;
  const activeSubjectData = dashData?.bySubject?.find(s => {
    if (activeSubjectSlug) {
      const matchSubject = subjects.find(sub => sub.id === activeSubjectSlug);
      return matchSubject && s.slug === matchSubject.slug;
    }
    return false;
  }) || dashData?.bySubject?.[0];

  return (
    <div className="hs-container">
      <h1 className="hs-greeting">{greeting}, {displayName}</h1>

      {/* Recommendation Card */}
      <div className="hs-recommend">
        <div className="hs-recommend-icon">{getRecommendIcon(rec.type)}</div>
        <div className="hs-recommend-body">
          <div className="hs-recommend-title">{rec.text}</div>
          <div className="hs-recommend-sub">{rec.sub}</div>
        </div>
        <button className="hs-recommend-btn" onClick={() => handleRecommendAction(rec)}>
          {rec.action}
        </button>
      </div>

      {/* Stats Row */}
      <div className="hs-stats">
        <div className="hs-stat">
          <div className="hs-stat-value">{streak > 0 ? `${streak}\uD83D\uDD25` : '0'}</div>
          <div className="hs-stat-label">Streak</div>
        </div>
        <div className="hs-stat">
          <div className="hs-stat-value">{masteryPct}%</div>
          <div className="hs-stat-label">Mastery</div>
        </div>
        <div className="hs-stat">
          <div className="hs-stat-value">{thisWeek}</div>
          <div className="hs-stat-label">This Week</div>
        </div>
        <div className="hs-stat">
          <div className="hs-stat-value">{overdueCount}</div>
          <div className="hs-stat-label">Overdue</div>
        </div>
      </div>

      {/* Quick Access Grid */}
      <div className="hs-quick">
        <button className="hs-quick-card" onClick={() => {
          const lastSection = typeof window !== 'undefined' ? localStorage.getItem('last-visited-section') : null;
          if (lastSection) { onNavigateToSection(lastSection); onNavigateToTab('learn-mode'); }
        }}>
          <span className="hs-quick-icon">{'\uD83D\uDCDA'}</span>
          Continue Learning
        </button>
        <Link href="/practice" className="hs-quick-card">
          <span className="hs-quick-icon">{'\u26A1'}</span>
          Practice Questions
        </Link>
        <Link href="/flashcards-practice" className="hs-quick-card">
          <span className="hs-quick-icon">{'\uD83C\uDCCF'}</span>
          Flashcards
        </Link>
        <Link href="/progress" className="hs-quick-card">
          <span className="hs-quick-icon">{'\uD83D\uDCC8'}</span>
          View Progress
        </Link>
      </div>

      {/* Topic Mastery */}
      {activeSubjectData && activeSubjectData.units && (
        <div>
          <div className="hs-topics-title">Topic Mastery</div>
          {activeSubjectData.units.map(unit => (
            <div key={unit.number}>
              <div className="hs-unit-label">
                <span className="hs-unit-badge">{unit.number}</span>
                {unit.title}
              </div>
              {unit.sections.map(sec => {
                const pct = sec.total > 0 ? Math.round((sec.mastered / sec.total) * 100) : 0;
                const barColor = pct >= 70 ? 'var(--accent-green)' : pct >= 40 ? 'var(--accent-amber, #f59e0b)' : 'var(--accent-red, #ef4444)';
                return (
                  <div key={sec.id} className="hs-topic-row" onClick={() => { onNavigateToSection(sec.id); onNavigateToTab('overview'); }} style={{ cursor: 'pointer' }} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter') { onNavigateToSection(sec.id); onNavigateToTab('overview'); } }}>
                    <span className="hs-topic-name">{sec.title}</span>
                    <div className="hs-topic-bar">
                      <div className="hs-topic-fill" style={{ width: `${pct}%`, background: barColor }} />
                    </div>
                    <span className="hs-topic-pct" style={{ color: barColor }}>{pct}%</span>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
