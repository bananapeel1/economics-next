'use client';

import { useState, useCallback, useMemo } from 'react';
import { buildQueue, computeNextReview, createDefaultProgress } from '@/lib/spaced-repetition';
import WrittenQuestionCard from '@/components/written-practice/WrittenQuestionCard';
import WrittenSummary from '@/components/written-practice/WrittenSummary';

/* ─── Subject icon & area maps ─── */

const SUBJECT_ICONS = { economics: '\u{1F4C8}', business: '\u{1F3E2}' };
const SUBJECT_AREAS = { economics: 'Micro, Macro, Global', business: 'Marketing, Finance, HR, Operations' };
const CHIP_COLORS = ['#3b82f6', '#f59e0b', '#10b981', '#ef4444', '#8b5cf6', '#ec4899'];
const MARK_OPTIONS = ['all', '4', '6', '10', '20'];

/* ─── SubjectStep (inline) ─── */

function SubjectStep({ subjects, units, sections, onSelectSubject }) {
  const subjectStats = useMemo(() => {
    const stats = {};
    for (const sub of subjects) {
      const subUnits = units.filter(u => u.subject_id === sub.id);
      const subSections = sections.filter(s => subUnits.some(u => u.id === s.unit_id));
      stats[sub.slug] = { unitCount: subUnits.length, sectionCount: subSections.length };
    }
    return stats;
  }, [subjects, units, sections]);

  return (
    <div className="spe-subject-step">
      <div className="spe-step-label">STEP 1 OF 3</div>
      <h1 className="spe-step-heading">What are you studying?</h1>
      <p className="spe-step-subtitle">Choose a subject &mdash; you&rsquo;ll pick specific topics next.</p>
      <div className="spe-subject-cards">
        {subjects.map(sub => {
          const stats = subjectStats[sub.slug] || { unitCount: 0, sectionCount: 0 };
          return (
            <button key={sub.slug} className="spe-subject-card" onClick={() => onSelectSubject(sub.slug)}>
              <span className="spe-subject-card-icon">{SUBJECT_ICONS[sub.slug] || '\u{1F4D6}'}</span>
              <span className="spe-subject-card-name">{sub.name}</span>
              <span className="spe-subject-card-desc">Edexcel IAL &middot; Units 1&ndash;4</span>
              {SUBJECT_AREAS[sub.slug] && <span className="spe-subject-card-desc2">{SUBJECT_AREAS[sub.slug]}</span>}
              <span className="spe-subject-card-badge">{stats.unitCount} units &middot; {stats.sectionCount} topics</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ─── TopicStep (inline) ─── */

function TopicStep({
  subject, units: allUnits, sections: allSections, selectedSectionIds,
  onToggleSection, onToggleUnit, onSelectAll, onClearAll, onBack, onNext, loading, progressSummary,
}) {
  const [expandedUnits, setExpandedUnits] = useState(new Set());

  const filteredUnits = useMemo(
    () => (subject ? allUnits.filter(u => u.subject_id === subject.id) : []),
    [allUnits, subject]
  );
  const sectionsByUnit = useMemo(() => {
    const map = {};
    for (const unit of filteredUnits) map[unit.id] = allSections.filter(s => s.unit_id === unit.id);
    return map;
  }, [filteredUnits, allSections]);

  const toggleExpand = useCallback((unitId) => {
    setExpandedUnits(prev => {
      const next = new Set(prev);
      next.has(unitId) ? next.delete(unitId) : next.add(unitId);
      return next;
    });
  }, []);

  let globalChipIndex = 0;

  return (
    <div className="spe-topic-step">
      <button className="spe-back-link" onClick={onBack}>&larr; Change subject</button>
      <div className="spe-topic-header">
        <div>
          <h1 className="spe-topic-heading">{subject.name}</h1>
          <p className="spe-topic-subtitle">Select the topics for written practice</p>
        </div>
        <div className="spe-topic-header-actions">
          <button className="spe-pill-btn" onClick={onSelectAll}>Select all</button>
          <button className="spe-pill-btn" onClick={onClearAll}>Clear all</button>
        </div>
      </div>

      <div className="spe-units">
        {filteredUnits.map(unit => {
          const unitSections = sectionsByUnit[unit.id] || [];
          if (unitSections.length === 0) return null;
          const selectedCount = unitSections.filter(s => selectedSectionIds.has(s.id)).length;
          const totalCount = unitSections.length;
          const isExpanded = expandedUnits.has(unit.id);
          const unitStartIndex = globalChipIndex;
          globalChipIndex += unitSections.length;

          return (
            <div key={unit.id} className="spe-unit-card">
              <div className="spe-unit-header">
                <button className={`spe-unit-badge${selectedCount > 0 ? ' spe-unit-badge--active' : ''}`} onClick={(e) => { e.stopPropagation(); onToggleUnit(unit.id); }} title={selectedCount === totalCount ? 'Deselect all' : 'Select all'}>
                  {selectedCount === totalCount ? '\u2713' : unit.number}
                </button>
                <div className="spe-unit-header-mid" onClick={() => toggleExpand(unit.id)}>
                  <span className="spe-unit-title">{unit.title}</span>
                </div>
                <div className="spe-unit-header-right" onClick={() => toggleExpand(unit.id)}>
                  <span className="spe-unit-counter-pill">{selectedCount} / {totalCount}</span>
                  <span className={`spe-unit-chevron${isExpanded ? ' spe-unit-chevron--open' : ''}`}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                </div>
              </div>
              <div className={`spe-section-grid${isExpanded ? ' spe-section-grid--open' : ''}`}>
                <div className="spe-section-grid-inner">
                  {unitSections.map((sec, i) => {
                    const isSelected = selectedSectionIds.has(sec.id);
                    const chipColor = CHIP_COLORS[(unitStartIndex + i) % CHIP_COLORS.length];
                    const prog = progressSummary?.[sec.id];
                    const masteryPct = prog && prog.total > 0 ? Math.round((prog.mastered / prog.total) * 100) : 0;
                    return (
                      <button key={sec.id} className={`spe-section-chip${isSelected ? ' spe-section-chip--active' : ''}`} onClick={() => onToggleSection(sec.id)} style={{ borderBottom: `3px solid ${isSelected ? '#22c55e' : chipColor}` }}>
                        <span className="spe-chip-text">{sec.short_title || sec.title}</span>
                        {prog && prog.total > 0 && (
                          <span className="spe-chip-progress"><span className="spe-chip-progress-fill" style={{ width: `${masteryPct}%` }} /></span>
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

      <div className="spe-action-bar">
        <div className="spe-action-bar-inner">
          <span className="spe-action-count">
            <span className="spe-action-count-num">{selectedSectionIds.size}</span>
            {' '}topic{selectedSectionIds.size !== 1 ? 's' : ''} selected
          </span>
          <button className="spe-start-btn" disabled={selectedSectionIds.size === 0} onClick={onNext}>
            Next: Choose marks &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── MarkFilterStep (inline) ─── */

function MarkFilterStep({ questionData, selectedMarks, onSelectMarks, onBack, onStart, loading }) {
  // Count available questions per mark value
  const markCounts = useMemo(() => {
    const counts = { all: 0, 4: 0, 6: 0, 10: 0, 20: 0 };
    for (const questions of Object.values(questionData)) {
      for (const q of questions) {
        if (counts[q.marks] !== undefined) counts[q.marks]++;
        counts.all++;
      }
    }
    return counts;
  }, [questionData]);

  return (
    <div className="wap-marks-step">
      <button className="spe-back-link" onClick={onBack}>&larr; Change topics</button>
      <div className="spe-step-label">STEP 3 OF 3</div>
      <h1 className="spe-step-heading">What mark level?</h1>
      <p className="spe-step-subtitle">Filter by question difficulty or practise all mark values.</p>

      <div className="wap-marks-pills">
        {MARK_OPTIONS.map(opt => {
          const label = opt === 'all' ? 'All marks' : `${opt} marks`;
          const count = markCounts[opt] || 0;
          return (
            <button
              key={opt}
              className={`wap-marks-pill${selectedMarks === opt ? ' wap-marks-pill--active' : ''}`}
              onClick={() => onSelectMarks(opt)}
            >
              <span className="wap-marks-pill-label">{label}</span>
              <span className="wap-marks-pill-count">{count} Q{count !== 1 ? 's' : ''}</span>
            </button>
          );
        })}
      </div>

      <div className="spe-action-bar">
        <div className="spe-action-bar-inner">
          <span className="spe-action-count">
            <span className="spe-action-count-num">{markCounts[selectedMarks] || 0}</span>
            {' '}question{(markCounts[selectedMarks] || 0) !== 1 ? 's' : ''} available
          </span>
          <button
            className="spe-start-btn"
            disabled={(markCounts[selectedMarks] || 0) === 0 || loading}
            onClick={onStart}
          >
            {loading ? (
              <span className="spe-start-btn-loading"><span className="spe-spinner" />Loading...</span>
            ) : (
              <>Start Written Practice &rarr;</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── WrittenPracticeEngine ─── */

export default function WrittenPracticeEngine({ subjects, units, sections, isLoggedIn }) {
  const [phase, setPhase] = useState('setup');        // 'setup' | 'session' | 'summary'
  const [setupStep, setSetupStep] = useState(1);      // 1 = subject, 2 = topics, 3 = marks
  const [selectedSubjectSlug, setSelectedSubjectSlug] = useState('');
  const [selectedSectionIds, setSelectedSectionIds] = useState(new Set());
  const [selectedMarks, setSelectedMarks] = useState('all');
  const [questionData, setQuestionData] = useState({});
  const [progressMap, setProgressMap] = useState({});
  const [queue, setQueue] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sessionResults, setSessionResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [questionKey, setQuestionKey] = useState(0);
  const [progressSummary, setProgressSummary] = useState({});

  /* ─── Fetch progress summary ─── */
  const fetchProgressSummary = useCallback(async (subjectSlug) => {
    const sub = subjects.find(s => s.slug === subjectSlug);
    if (!sub) return;
    const subUnits = units.filter(u => u.subject_id === sub.id);
    const subSections = sections.filter(s => subUnits.some(u => u.id === s.unit_id));
    const sectionIds = subSections.map(s => s.id);
    if (sectionIds.length === 0) return;
    try {
      const res = await fetch(`/api/written-practice/progress-summary?sections=${sectionIds.join(',')}`);
      const json = await res.json();
      if (json.summary) setProgressSummary(json.summary);
    } catch { /* silently ignore */ }
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
    for (const unit of filteredUnits) map[unit.id] = sections.filter(s => s.unit_id === unit.id);
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
      next.has(sectionId) ? next.delete(sectionId) : next.add(sectionId);
      return next;
    });
  }, []);

  const handleToggleUnit = useCallback((unitId) => {
    const unitSections = sectionsByUnit[unitId] || [];
    const allSelected = unitSections.every(s => selectedSectionIds.has(s.id));
    setSelectedSectionIds(prev => {
      const next = new Set(prev);
      for (const sec of unitSections) {
        allSelected ? next.delete(sec.id) : next.add(sec.id);
      }
      return next;
    });
  }, [sectionsByUnit, selectedSectionIds]);

  const handleSelectAll = useCallback(() => {
    const allIds = new Set();
    for (const unit of filteredUnits) {
      for (const sec of (sectionsByUnit[unit.id] || [])) allIds.add(sec.id);
    }
    setSelectedSectionIds(allIds);
  }, [filteredUnits, sectionsByUnit]);

  const handleClearAll = useCallback(() => setSelectedSectionIds(new Set()), []);

  /* ─── Advance to marks step — pre-fetch questions ─── */
  const handleAdvanceToMarks = useCallback(async () => {
    if (selectedSectionIds.size === 0) return;
    setLoading(true);
    try {
      const sectionArr = Array.from(selectedSectionIds);
      const res = await fetch(`/api/written-practice/questions?sections=${sectionArr.join(',')}`);
      const json = await res.json();
      setQuestionData(json.questions || {});
      setSelectedMarks('all');
      setSetupStep(3);
    } catch (err) {
      console.error('Failed to fetch written questions:', err);
    } finally {
      setLoading(false);
    }
  }, [selectedSectionIds]);

  const handleBackToTopics = useCallback(() => {
    setSetupStep(2);
  }, []);

  /* ─── Start session ─── */
  const handleStart = useCallback(async () => {
    setLoading(true);
    try {
      const sectionArr = Array.from(selectedSectionIds);

      // Filter questions by selected marks
      let filteredData = {};
      for (const [secId, questions] of Object.entries(questionData)) {
        if (selectedMarks === 'all') {
          filteredData[secId] = questions;
        } else {
          const target = parseInt(selectedMarks, 10);
          filteredData[secId] = questions.filter(q => q.marks === target);
        }
      }

      // Fetch progress
      let fetchedProgressMap = {};
      if (isLoggedIn) {
        const pRes = await fetch(`/api/written-practice/progress?sections=${sectionArr.join(',')}`);
        const pJson = await pRes.json();
        for (const row of (pJson.progress || [])) {
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
      }
      setProgressMap(fetchedProgressMap);

      // Build queue — adapt progress keys (remove wa- prefix for buildQueue)
      const adaptedProgressMap = {};
      for (const [key, val] of Object.entries(fetchedProgressMap)) {
        adaptedProgressMap[key.replace(/^wa-/, '')] = val;
      }

      const sessionQueue = buildQueue(adaptedProgressMap, sectionArr, filteredData, 5);
      setQueue(sessionQueue);
      setCurrentIndex(0);
      setSessionResults([]);
      setQuestionKey(Date.now());
      setPhase('session');
    } catch (err) {
      console.error('Failed to start written practice session:', err);
    } finally {
      setLoading(false);
    }
  }, [selectedSectionIds, selectedMarks, questionData, isLoggedIn]);

  /* ─── Handle graded answer ─── */
  const handleGraded = useCallback(
    async ({ marksAwarded, grade, feedback }) => {
      const item = queue[currentIndex];
      if (!item) return;

      const correct = grade === 'excellent' || grade === 'good';
      const waSectionId = `wa-${item.sectionId}`;
      const key = `${waSectionId}:${item.questionIndex}`;

      const current = progressMap[key] || createDefaultProgress(waSectionId, item.questionIndex);
      const updated = computeNextReview(current, correct);

      // Save progress
      if (isLoggedIn) {
        try {
          await fetch('/api/written-practice/progress', {
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
          console.error('Failed to save written practice progress:', err);
        }
      }

      setProgressMap(prev => ({ ...prev, [key]: updated }));

      // Get the question to record marks
      const q = questionData[item.sectionId]?.[item.questionIndex];
      setSessionResults(prev => [
        ...prev,
        {
          sectionId: item.sectionId,
          questionIndex: item.questionIndex,
          marks: q?.marks || 0,
          marksAwarded,
          grade,
        },
      ]);
    },
    [queue, currentIndex, progressMap, questionData, isLoggedIn]
  );

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

  /* ─── Skip ─── */
  const handleSkip = useCallback(() => {
    const nextIdx = currentIndex + 1;
    if (nextIdx >= queue.length) {
      setPhase('summary');
    } else {
      setCurrentIndex(nextIdx);
      setQuestionKey(Date.now());
    }
  }, [currentIndex, queue.length]);

  /* ─── Restart / Change topics ─── */
  const handleRestart = useCallback(() => {
    setPhase('setup');
    setSetupStep(3);
    setQueue([]);
    setCurrentIndex(0);
    setSessionResults([]);
  }, []);

  const handleChangeTopics = useCallback(() => {
    setPhase('setup');
    setSetupStep(2);
    setQueue([]);
    setCurrentIndex(0);
    setSessionResults([]);
  }, []);

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

    if (setupStep === 2) {
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
          onNext={handleAdvanceToMarks}
          loading={loading}
          progressSummary={progressSummary}
        />
      );
    }

    if (setupStep === 3) {
      return (
        <MarkFilterStep
          questionData={questionData}
          selectedMarks={selectedMarks}
          onSelectMarks={setSelectedMarks}
          onBack={handleBackToTopics}
          onStart={handleStart}
          loading={loading}
        />
      );
    }
  }

  // Session phase
  if (phase === 'session') {
    const item = queue[currentIndex];
    if (!item) return null;

    const q = questionData[item.sectionId]?.[item.questionIndex];
    if (!q) return null;

    const sec = sections.find(s => s.id === item.sectionId);
    const sectionTitle = sec?.short_title || sec?.title || item.sectionId;

    return (
      <div className="wap-session">
        {/* Progress bar */}
        <div className="spe-session-top">
          <div className="spe-session-progress-bar">
            <div
              className="spe-session-progress-fill"
              style={{ width: `${((currentIndex + 1) / queue.length) * 100}%` }}
            />
          </div>
          <span className="spe-session-progress-text">
            {currentIndex + 1} / {queue.length}
          </span>
        </div>

        <WrittenQuestionCard
          key={questionKey}
          question={q}
          sectionTitle={sectionTitle}
          questionNumber={currentIndex + 1}
          totalQuestions={queue.length}
          onGraded={handleGraded}
          onNext={handleNext}
          onSkip={handleSkip}
        />
      </div>
    );
  }

  // Summary phase
  if (phase === 'summary') {
    return (
      <WrittenSummary
        results={sessionResults}
        sections={sections}
        onRestart={handleRestart}
        onChangeTopics={handleChangeTopics}
      />
    );
  }

  return null;
}
