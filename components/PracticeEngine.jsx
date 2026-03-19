'use client';

import { useState, useCallback, useMemo } from 'react';
import { buildQueue, computeNextReview, createDefaultProgress } from '@/lib/spaced-repetition';
import QuestionCard from '@/components/practice/QuestionCard';
import SessionSummary from '@/components/practice/SessionSummary';

/* ─── localStorage helpers (for non-auth users) ─── */

function loadLocalProgress(sectionIds) {
  try {
    const raw = JSON.parse(localStorage.getItem('revvy_practice_progress') || '{}');
    const filtered = {};
    for (const [key, val] of Object.entries(raw)) {
      if (sectionIds.some(id => key.startsWith(id + ':'))) {
        filtered[key] = val;
      }
    }
    return filtered;
  } catch {
    return {};
  }
}

function saveLocalProgress(key, progressObj) {
  try {
    const raw = JSON.parse(localStorage.getItem('revvy_practice_progress') || '{}');
    raw[key] = progressObj;
    localStorage.setItem('revvy_practice_progress', JSON.stringify(raw));
  } catch {
    // silently ignore storage errors
  }
}

/* ─── Subject icon & area maps ─── */

const SUBJECT_ICONS = {
  economics: '\u{1F4C8}',
  business: '\u{1F3E2}',
};

const SUBJECT_AREAS = {
  economics: 'Micro, Macro, Global',
  business: 'Marketing, Finance, HR, Operations',
};

function getSubjectIcon(slug) {
  return SUBJECT_ICONS[slug] || '\u{1F4D6}';
}

function getSubjectAreas(slug) {
  return SUBJECT_AREAS[slug] || '';
}

/* ─── Chip underline color palette ─── */

const CHIP_COLORS = ['#3b82f6', '#f59e0b', '#10b981', '#ef4444', '#8b5cf6', '#ec4899'];

/* ─── SubjectStep (inline) ─── */

function SubjectStep({ subjects, units, sections, onSelectSubject }) {
  // Count units and sections per subject
  const subjectStats = useMemo(() => {
    const stats = {};
    for (const sub of subjects) {
      const subUnits = units.filter(u => u.subject_id === sub.id);
      const subSections = sections.filter(s =>
        subUnits.some(u => u.id === s.unit_id)
      );
      stats[sub.slug] = {
        unitCount: subUnits.length,
        sectionCount: subSections.length,
      };
    }
    return stats;
  }, [subjects, units, sections]);

  return (
    <div className="spe-subject-step">
      <div className="spe-step-label">STEP 1 OF 2</div>
      <h1 className="spe-step-heading">What are you studying?</h1>
      <p className="spe-step-subtitle">Choose a subject &mdash; you&rsquo;ll pick specific topics next.</p>
      <div className="spe-subject-cards">
        {subjects.map(sub => {
          const stats = subjectStats[sub.slug] || { unitCount: 0, sectionCount: 0 };
          const icon = getSubjectIcon(sub.slug);
          const areas = getSubjectAreas(sub.slug);
          return (
            <button
              key={sub.slug}
              className="spe-subject-card"
              onClick={() => onSelectSubject(sub.slug)}
            >
              <span className="spe-subject-card-icon">{icon}</span>
              <span className="spe-subject-card-name">{sub.name}</span>
              <span className="spe-subject-card-desc">Edexcel IAL &middot; Units 1&ndash;4</span>
              {areas && <span className="spe-subject-card-desc2">{areas}</span>}
              <span className="spe-subject-card-badge">
                {stats.unitCount} units &middot; {stats.sectionCount} topics
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ─── TopicStep (inline) ─── */

function TopicStep({
  subject,
  units: allUnits,
  sections: allSections,
  selectedSectionIds,
  onToggleSection,
  onToggleUnit,
  onSelectAll,
  onClearAll,
  onBack,
  onStart,
  loading,
  progressSummary,
}) {
  const [expandedUnits, setExpandedUnits] = useState(new Set());

  const filteredUnits = useMemo(
    () => (subject ? allUnits.filter(u => u.subject_id === subject.id) : []),
    [allUnits, subject]
  );

  const sectionsByUnit = useMemo(() => {
    const map = {};
    for (const unit of filteredUnits) {
      map[unit.id] = allSections.filter(s => s.unit_id === unit.id);
    }
    return map;
  }, [filteredUnits, allSections]);

  const selectionCount = selectedSectionIds.size;

  const toggleExpand = useCallback((unitId) => {
    setExpandedUnits(prev => {
      const next = new Set(prev);
      if (next.has(unitId)) {
        next.delete(unitId);
      } else {
        next.add(unitId);
      }
      return next;
    });
  }, []);

  // Track a running chip index across all units for color cycling
  let globalChipIndex = 0;

  return (
    <div className="spe-topic-step">
      <button className="spe-back-link" onClick={onBack}>
        &larr; Change subject
      </button>

      <div className="spe-topic-header">
        <div>
          <h1 className="spe-topic-heading">{subject.name}</h1>
          <p className="spe-topic-subtitle">Select the topics you want to be assessed on</p>
        </div>
        <div className="spe-topic-header-actions">
          <button className="spe-pill-btn" onClick={onSelectAll}>Select all</button>
          <button className="spe-pill-btn" onClick={onClearAll}>Clear all</button>
        </div>
      </div>

      {/* Unit accordion cards */}
      <div className="spe-units">
        {filteredUnits.map(unit => {
          const unitSections = sectionsByUnit[unit.id] || [];
          if (unitSections.length === 0) return null;

          const selectedCount = unitSections.filter(s => selectedSectionIds.has(s.id)).length;
          const totalCount = unitSections.length;
          const isExpanded = expandedUnits.has(unit.id);

          // Save starting chip index for this unit
          const unitStartIndex = globalChipIndex;
          globalChipIndex += unitSections.length;

          return (
            <div key={unit.id} className="spe-unit-card">
              {/* Unit header row */}
              <div className="spe-unit-header">
                <button className={`spe-unit-badge${selectedCount > 0 ? ' spe-unit-badge--active' : ''}`} onClick={(e) => { e.stopPropagation(); onToggleUnit(unit.id); }} title={selectedCount === totalCount ? 'Deselect all' : 'Select all'}>
                  {selectedCount === totalCount ? '\u2713' : unit.number}
                </button>
                <div className="spe-unit-header-mid" onClick={() => toggleExpand(unit.id)}>
                  <span className="spe-unit-title">{unit.title}</span>
                </div>
                <div className="spe-unit-header-right" onClick={() => toggleExpand(unit.id)}>
                  <span className="spe-unit-counter-pill">
                    {selectedCount} / {totalCount}
                  </span>
                  <span className={`spe-unit-chevron${isExpanded ? ' spe-unit-chevron--open' : ''}`}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </div>
              </div>

              {/* Section chips grid */}
              <div className={`spe-section-grid${isExpanded ? ' spe-section-grid--open' : ''}`}>
                <div className="spe-section-grid-inner">
                  {unitSections.map((sec, i) => {
                    const isSelected = selectedSectionIds.has(sec.id);
                    const chipColor = CHIP_COLORS[(unitStartIndex + i) % CHIP_COLORS.length];
                    const prog = progressSummary?.[sec.id];
                    const masteryPct = prog && prog.total > 0 ? Math.round((prog.mastered / prog.total) * 100) : 0;
                    return (
                      <button
                        key={sec.id}
                        className={`spe-section-chip${isSelected ? ' spe-section-chip--active' : ''}`}
                        onClick={() => onToggleSection(sec.id)}
                        style={{
                          borderBottom: `3px solid ${isSelected ? '#22c55e' : chipColor}`,
                        }}
                      >
                        <span className="spe-chip-text">{sec.short_title || sec.title}</span>
                        {prog && prog.total > 0 && (
                          <span className="spe-chip-progress">
                            <span className="spe-chip-progress-fill" style={{ width: `${masteryPct}%` }} />
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Sticky start bar */}
      <div className="spe-action-bar">
        <div className="spe-action-bar-inner">
          <span className="spe-action-count">
            <span className="spe-action-count-num">{selectionCount}</span>
            {' '}topic{selectionCount !== 1 ? 's' : ''} selected
          </span>
          <button
            className="spe-start-btn"
            disabled={selectionCount === 0 || loading}
            onClick={onStart}
          >
            {loading ? (
              <span className="spe-start-btn-loading">
                <span className="spe-spinner" />
                Loading...
              </span>
            ) : (
              <>Start Practice &rarr;</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── PracticeEngine ─── */

export default function PracticeEngine({ subjects, units, sections, isLoggedIn }) {
  const [phase, setPhase] = useState('setup');        // 'setup' | 'session' | 'summary'
  const [setupStep, setSetupStep] = useState(1);      // 1 = subject-select, 2 = topic-select
  const [selectedSubjectSlug, setSelectedSubjectSlug] = useState('');
  const [selectedSectionIds, setSelectedSectionIds] = useState(new Set());
  const [quizData, setQuizData] = useState({});
  const [progressMap, setProgressMap] = useState({});
  const [queue, setQueue] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sessionResults, setSessionResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [questionKey, setQuestionKey] = useState(0);
  const [progressSummary, setProgressSummary] = useState({});

  /* ─── Fetch progress summary when entering topic step ─── */
  const fetchProgressSummary = useCallback(async (subjectSlug) => {
    const sub = subjects.find(s => s.slug === subjectSlug);
    if (!sub) return;
    const subUnits = units.filter(u => u.subject_id === sub.id);
    const subSections = sections.filter(s => subUnits.some(u => u.id === s.unit_id));
    const sectionIds = subSections.map(s => s.id);
    if (sectionIds.length === 0) return;

    try {
      const res = await fetch(`/api/practice/progress-summary?sections=${sectionIds.join(',')}`);
      const json = await res.json();
      if (json.summary) setProgressSummary(json.summary);
    } catch {
      // silently ignore
    }
  }, [subjects, units, sections]);

  /* ─── Derived data ─── */

  const selectedSubject = useMemo(
    () => subjects.find(s => s.slug === selectedSubjectSlug) || null,
    [subjects, selectedSubjectSlug]
  );

  const filteredUnits = useMemo(
    () => (selectedSubject ? units.filter(u => u.subject_id === selectedSubject.id) : []),
    [units, selectedSubject]
  );

  const sectionsByUnit = useMemo(() => {
    const map = {};
    for (const unit of filteredUnits) {
      map[unit.id] = sections.filter(s => s.unit_id === unit.id);
    }
    return map;
  }, [filteredUnits, sections]);

  /* ─── Setup callbacks ─── */

  const handleSelectSubject = useCallback((slug) => {
    setSelectedSubjectSlug(slug);
    setSelectedSectionIds(new Set());
    setSetupStep(2);
    fetchProgressSummary(slug);
  }, [fetchProgressSummary]);

  const handleBackToSubject = useCallback(() => {
    setSetupStep(1);
    setSelectedSubjectSlug('');
    setSelectedSectionIds(new Set());
  }, []);

  const handleToggleSection = useCallback((sectionId) => {
    setSelectedSectionIds(prev => {
      const next = new Set(prev);
      if (next.has(sectionId)) {
        next.delete(sectionId);
      } else {
        next.add(sectionId);
      }
      return next;
    });
  }, []);

  const handleToggleUnit = useCallback(
    (unitId) => {
      const unitSections = sectionsByUnit[unitId] || [];
      const allSelected = unitSections.every(s => selectedSectionIds.has(s.id));

      setSelectedSectionIds(prev => {
        const next = new Set(prev);
        for (const sec of unitSections) {
          if (allSelected) {
            next.delete(sec.id);
          } else {
            next.add(sec.id);
          }
        }
        return next;
      });
    },
    [sectionsByUnit, selectedSectionIds]
  );

  const handleSelectAll = useCallback(() => {
    const allIds = new Set();
    for (const unit of filteredUnits) {
      const unitSections = sectionsByUnit[unit.id] || [];
      for (const sec of unitSections) {
        allIds.add(sec.id);
      }
    }
    setSelectedSectionIds(allIds);
  }, [filteredUnits, sectionsByUnit]);

  const handleClearAll = useCallback(() => {
    setSelectedSectionIds(new Set());
  }, []);

  /* ─── Start session ─── */

  const handleStart = useCallback(async () => {
    if (selectedSectionIds.size === 0) return;
    setLoading(true);

    try {
      const sectionArr = Array.from(selectedSectionIds);

      // 1. Fetch quiz data
      const qRes = await fetch(
        `/api/practice/questions?sections=${sectionArr.join(',')}`
      );
      const qJson = await qRes.json();
      const fetchedQuizData = qJson.questions || {};
      setQuizData(fetchedQuizData);

      // 2. Fetch progress
      let fetchedProgressMap = {};

      if (isLoggedIn) {
        const pRes = await fetch(
          `/api/practice/progress?sections=${sectionArr.join(',')}`
        );
        const pJson = await pRes.json();
        const rows = pJson.progress || [];

        for (const row of rows) {
          const key = `${row.section_id}:${row.question_index}`;
          fetchedProgressMap[key] = {
            sectionId: row.section_id,
            questionIndex: row.question_index,
            ease: row.ease,
            intervalDays: row.interval_days,
            repetitions: row.repetitions,
            nextReview: new Date(row.next_review).getTime(),
            lastResult: row.last_result,
            lastConfidence: row.last_confidence,
          };
        }
      } else {
        fetchedProgressMap = loadLocalProgress(sectionArr);
      }

      setProgressMap(fetchedProgressMap);

      // 3. Build queue
      const sessionQueue = buildQueue(
        fetchedProgressMap,
        sectionArr,
        fetchedQuizData,
        20
      );

      setQueue(sessionQueue);
      setCurrentIndex(0);
      setSessionResults([]);
      setQuestionKey(Date.now());
      setPhase('session');
    } catch (err) {
      console.error('Failed to start practice session:', err);
    } finally {
      setLoading(false);
    }
  }, [selectedSectionIds, isLoggedIn]);

  /* ─── Answer handler ─── */

  const handleAnswer = useCallback(
    async ({ correct }) => {
      const item = queue[currentIndex];
      if (!item) return;

      const key = `${item.sectionId}:${item.questionIndex}`;

      // Get current progress or create default
      const current =
        progressMap[key] ||
        createDefaultProgress(item.sectionId, item.questionIndex);

      // Compute next review (no confidence parameter)
      const updated = computeNextReview(current, correct);

      // Save progress
      if (isLoggedIn) {
        try {
          await fetch('/api/practice/progress', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              sectionId: updated.sectionId,
              questionIndex: updated.questionIndex,
              ease: updated.ease,
              intervalDays: updated.intervalDays,
              repetitions: updated.repetitions,
              nextReview: updated.nextReview,
              lastResult: updated.lastResult,
              lastConfidence: updated.lastConfidence,
            }),
          });
        } catch (err) {
          console.error('Failed to save progress:', err);
        }
      } else {
        saveLocalProgress(key, updated);
      }

      // Update local state
      setProgressMap(prev => ({ ...prev, [key]: updated }));
      setSessionResults(prev => [
        ...prev,
        {
          sectionId: item.sectionId,
          questionIndex: item.questionIndex,
          correct,
        },
      ]);
    },
    [queue, currentIndex, progressMap, isLoggedIn]
  );

  /* ─── Skip question (no recording) ─── */

  const handleSkip = useCallback(() => {
    const nextIdx = currentIndex + 1;
    if (nextIdx >= queue.length) {
      setPhase('summary');
    } else {
      setCurrentIndex(nextIdx);
      setQuestionKey(Date.now());
    }
  }, [currentIndex, queue.length]);

  /* ─── Next question ─── */

  const handleNext = useCallback(() => {
    const nextIdx = currentIndex + 1;
    if (nextIdx >= queue.length) {
      setPhase('summary');
    } else {
      setCurrentIndex(nextIdx);
      setQuestionKey(Date.now());
    }
  }, [currentIndex, queue.length]);

  /* ─── End session early ─── */

  const handleEndSession = useCallback(() => {
    setPhase('summary');
  }, []);

  /* ─── Change topics (keep subject, go to topic selector) ─── */

  const handleChangeTopics = useCallback(() => {
    setPhase('setup');
    setSetupStep(2);
    setQueue([]);
    setCurrentIndex(0);
    setSessionResults([]);
    setQuestionKey(0);
    fetchProgressSummary(selectedSubjectSlug);
  }, [selectedSubjectSlug, fetchProgressSummary]);

  /* ─── Restart (full reset) ─── */

  const handleRestart = useCallback(() => {
    setPhase('setup');
    setSetupStep(1);
    setQueue([]);
    setCurrentIndex(0);
    setSessionResults([]);
    setQuestionKey(0);
    setSelectedSubjectSlug('');
    setSelectedSectionIds(new Set());
    setProgressSummary({});
  }, []);

  /* ─── Section title lookup ─── */

  const getSectionTitle = useCallback(
    (sectionId) => {
      const sec = sections.find(s => s.id === sectionId);
      return sec?.short_title || sec?.title || sectionId;
    },
    [sections]
  );

  /* ─── Render ─── */

  // Setup phase
  if (phase === 'setup') {
    if (setupStep === 1) {
      return (
        <SubjectStep
          subjects={subjects}
          units={units}
          sections={sections}
          onSelectSubject={handleSelectSubject}
        />
      );
    }

    // setupStep === 2
    return (
      <TopicStep
        subject={selectedSubject}
        units={units}
        sections={sections}
        selectedSectionIds={selectedSectionIds}
        onToggleSection={handleToggleSection}
        onToggleUnit={handleToggleUnit}
        onSelectAll={handleSelectAll}
        onClearAll={handleClearAll}
        onBack={handleBackToSubject}
        onStart={handleStart}
        loading={loading}
        progressSummary={progressSummary}
      />
    );
  }

  // Session phase
  if (phase === 'session') {
    const item = queue[currentIndex];

    if (!item) {
      return (
        <div className="spe-empty">
          <p>No questions available for the selected topics.</p>
          <button className="spe-btn spe-btn-primary" onClick={handleRestart}>
            Back to Setup
          </button>
        </div>
      );
    }

    const question = item.question;
    const sectionTitle = getSectionTitle(item.sectionId);

    return (
      <div className="spe-session">
        {/* Top bar with progress */}
        <div className="spe-session-top">
          <div className="spe-session-top-left">
            <span className="spe-session-dot" />
            <span className="spe-session-label">Practice</span>
          </div>
          <div className="spe-progress-bar">
            <div
              className="spe-progress-fill"
              style={{ width: `${((currentIndex + 1) / queue.length) * 100}%` }}
            />
          </div>
          <span className="spe-progress-count">
            {currentIndex + 1} / {queue.length}
          </span>
          <button className="spe-end-session-btn" onClick={handleEndSession}>
            End session
          </button>
        </div>

        {/* Question with animation key */}
        <div className="spe-question-animate" key={questionKey}>
          <QuestionCard
            question={question}
            sectionTitle={sectionTitle}
            questionNumber={currentIndex + 1}
            totalQuestions={queue.length}
            onAnswer={handleAnswer}
            onNext={handleNext}
            onSkip={handleSkip}
          />
        </div>
      </div>
    );
  }

  // Summary phase
  if (phase === 'summary') {
    return (
      <SessionSummary
        results={sessionResults}
        sections={sections}
        totalQuestions={queue.length}
        onRestart={handleRestart}
        onChangeTopics={handleChangeTopics}
      />
    );
  }

  return null;
}
