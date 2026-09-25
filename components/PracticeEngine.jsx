'use client';

import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { shuffleAllOptions } from '@/lib/shuffle-options';
import { buildQueue, queueStats, computeNextReview, createDefaultProgress } from '@/lib/spaced-repetition';
import QuestionCard from '@/components/practice/QuestionCard';
import { signalMoment } from '@/lib/feedback/client';
import SessionSummary from '@/components/practice/SessionSummary';

/** "Next due in 6 hours" / "Next due tomorrow", from a timestamp. Empty string if nothing is scheduled. */
function formatNextDue(nextReview) {
  if (!nextReview) return '';
  const ms = nextReview - Date.now();
  if (ms <= 0) return 'The next one is due now.';
  const hours = Math.round(ms / 3600000);
  if (hours < 1) return 'The next one is due within the hour.';
  if (hours < 24) return `The next one is due in ${hours} hour${hours === 1 ? '' : 's'}.`;
  const days = Math.round(hours / 24);
  return `The next one is due in ${days} day${days === 1 ? '' : 's'}.`;
}

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
  progressSummary, accessNote, sessionSize, onSessionSize }) {
  // F085: every unit used to start collapsed, so the picker opened showing nothing to pick.
  // Open the first unit so the student can see what a topic chip is without hunting.
  const [expandedUnits, setExpandedUnits] = useState(() => {
    const first = (allUnits || [])
      .filter((u) => u.subject_id === subject?.id)
      .sort((a, b) => a.number - b.number)[0];
    return new Set(first ? [first.id] : []);
  });

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
          <p className="spe-topic-subtitle">Pick the topics you want to practise</p>
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
                {/* F085: this used to be the unit number, and clicking it silently selected or
                    cleared every topic in the unit. Nothing said so. It is now a labelled
                    checkbox, and the unit number moved into the title where it reads as a number. */}
                <label className="spe-unit-selectall" onClick={(e) => e.stopPropagation()}>
                  <input
                    type="checkbox"
                    checked={totalCount > 0 && selectedCount === totalCount}
                    ref={(el) => { if (el) el.indeterminate = selectedCount > 0 && selectedCount < totalCount; }}
                    onChange={() => onToggleUnit(unit.id)}
                  />
                  <span className="spe-unit-selectall-text">All</span>
                </label>
                <div className="spe-unit-header-mid" onClick={() => toggleExpand(unit.id)}>
                  <span className="spe-unit-title">Unit {unit.number} &middot; {unit.title}</span>
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
                          <span className="spe-chip-count">
                            {prog.total} question{prog.total === 1 ? '' : 's'}
                            {typeof prog.due === 'number' ? ` \u00b7 ${prog.due} due` : ''}
                          </span>
                        )}
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

      {accessNote && accessNote.kind !== 'preview' && (
        <div className="spe-access-note" role="alert">
          <span>{accessNote.message}</span>
          {accessNote.kind === 'signed-out' && (
            <a className="spe-access-note-btn" href="/login">Sign in</a>
          )}
        </div>
      )}

      {/* Sticky start bar */}
      <div className="spe-action-bar">
        <div className="spe-action-bar-inner">
          {/* F084: session length is the student's choice, not a fixed 20. */}
          <div className="spe-session-size" role="group" aria-label="Session length">
            {[10, 20, 40].map((n) => (
              <button
                key={n}
                className={`spe-session-size-btn${sessionSize === n ? ' active' : ''}`}
                aria-pressed={sessionSize === n}
                onClick={() => onSessionSize?.(n)}
              >
                {n}
              </button>
            ))}
          </div>
          <span className="spe-action-count">
            <span className="spe-action-count-num">{selectionCount}</span>
            {' '}topic{selectionCount !== 1 ? 's' : ''} selected
          </span>
          {/* Not `onClick={onStart}`: React passes the click event as the first argument, and
              handleStart's first parameter is `practiseEarly`. An event object is truthy, so every
              ordinary Start was pulling in not-yet-due cards and quietly defeating the spaced
              schedule. Caught by the packet verifier, not by the build. */}
          <button
            className="spe-start-btn"
            disabled={selectionCount === 0 || loading}
            onClick={() => onStart()}
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
  // A finished session is a moment the feedback card may answer (computers only; see lib/feedback).
  useEffect(() => { if (phase === 'summary') signalMoment('practice_complete', {}); }, [phase]);
  const [setupStep, setSetupStep] = useState(1);      // 1 = subject-select, 2 = topic-select
  const [selectedSubjectSlug, setSelectedSubjectSlug] = useState('');
  const [selectedSectionIds, setSelectedSectionIds] = useState(new Set());

  /*
   * F080. A student who finishes a topic in Learn Mode has met about five of its twenty-five
   * questions; the other twenty are only reachable here, and only after finding this page and
   * picking the topic out of a list of forty-three. The completion screen now links straight in
   * with the topic chosen.
   *
   * Read in an effect, never during render: the address bar does not exist on the server, and
   * reading it in the render body is what caused F118.
   */
  useEffect(() => {
    let wanted = null;
    try { wanted = new URLSearchParams(window.location.search).get('section'); } catch { return; }
    if (!wanted) return;
    const sec = sections.find((x) => String(x.id) === String(wanted));
    if (!sec) return;
    const unit = units.find((u) => u.id === sec.unit_id);
    const subject = unit ? subjects.find((sub) => sub.id === unit.subject_id) : null;
    if (subject?.slug) {
      setSelectedSubjectSlug(subject.slug);
      fetchProgressSummary(subject.slug);
    }
    setSelectedSectionIds(new Set([sec.id]));
    // Straight to topic selection with the topic already ticked. Going through
    // handleSelectSubject would clear the selection on its second line, which is why the link
    // did nothing at all before.
    setSetupStep(2);
    // Once, on mount. Re-running would fight the student's own selections.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [quizData, setQuizData] = useState({});
  const [progressMap, setProgressMap] = useState({});
  const [queue, setQueue] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sessionResults, setSessionResults] = useState([]);
  const [loading, setLoading] = useState(false);
  // Why a session could not start, or started short. Set from the questions endpoint so the empty
  // state can say what happened instead of reading as missing content (F086, and F084's complaint
  // that "no questions available" looks like the section is empty).
  const [accessNote, setAccessNote] = useState(null);
  // Keys already re-queued this session, so a wrong answer comes back exactly once (F077).
  const requeuedRef = useRef(new Set());
  // F084: the student chooses how long a session is instead of always getting 20.
  const [sessionSize, setSessionSize] = useState(20);
  // F078: what the selected topics actually hold, so an empty queue can explain itself.
  const [emptyReason, setEmptyReason] = useState(null);
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
      if (!json.summary) return;

      // F085: the endpoint only knows about a signed-in student's progress, so for everyone else
      // it reports every question as due. That is not a neutral default: it tells an anonymous
      // student who has already practised here that nothing has stuck. Their schedule lives in
      // localStorage, so recompute due from that rather than showing a number we know is wrong.
      if (!isLoggedIn) {
        const local = loadLocalProgress(sectionIds);
        const now = Date.now();
        for (const id of sectionIds) {
          const row = json.summary[id];
          if (!row) continue;
          let attempted = 0;
          let due = 0;
          for (const [key, val] of Object.entries(local)) {
            if (!key.startsWith(id + ':')) continue;
            attempted++;
            if (!val?.nextReview || val.nextReview <= now) due++;
          }
          row.attempted = attempted;
          row.mastered = 0;
          row.due = due + Math.max(0, row.total - attempted);
        }
      }

      setProgressSummary(json.summary);
    } catch {
      // silently ignore
    }
  }, [subjects, units, sections, isLoggedIn]);

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

  const handleStart = useCallback(async (practiseEarly = false) => {
    if (selectedSectionIds.size === 0) return;
    setLoading(true);

    try {
      const sectionArr = Array.from(selectedSectionIds);

      // 1. Fetch quiz data
      setAccessNote(null);
      requeuedRef.current = new Set();
      const qRes = await fetch(
        `/api/practice/questions?sections=${sectionArr.join(',')}`
      );
      const qJson = await qRes.json().catch(() => ({}));

      if (!qRes.ok) {
        setAccessNote(
          qRes.status === 401
            ? { kind: 'signed-out', message: qJson.error || 'Please sign in to use Smart Practice.' }
            : { kind: 'error', message: qJson.error || 'Could not load questions. Please try again.' }
        );
        setLoading(false);
        return;
      }
      if (qJson.limited) {
        setAccessNote({
          kind: 'preview',
          message: `Showing the first ${qJson.previewLimit} questions per topic, ${qJson.totalReturned} of ${qJson.totalAvailable}. The full bank is part of Pro.`,
        });
      }

      /*
       * F074. Smart Practice draws the same bank as the Quiz tab, where the correct answer is
       * option B in 64% of questions, and this surface was not shuffled — the finding names
       * components/practice/QuestionCard.jsx by file and line. Shuffled here, at the point the
       * bank enters the engine, with the same deterministic per-question order the section
       * surfaces use, so a question looks the same wherever the student meets it.
       */
      const raw = qJson.questions || {};
      const fetchedQuizData = {};
      for (const [sectionId, list] of Object.entries(raw)) {
        fetchedQuizData[sectionId] = Array.isArray(list) ? shuffleAllOptions(list) : list;
      }
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
        sessionSize,
        { includeNotDue: practiseEarly }
      );

      // F078: an empty queue used to render "No questions available", which reads as missing
      // content. Distinguish having nothing scheduled yet from having everything scheduled.
      if (sessionQueue.length === 0) {
        const stats = queueStats(fetchedProgressMap, sectionArr, fetchedQuizData);
        setEmptyReason(stats.total === 0 ? { kind: 'no-content', stats } : { kind: 'nothing-due', stats });
      } else {
        setEmptyReason(null);
      }

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
  }, [selectedSectionIds, isLoggedIn, sessionSize]);

  /* ─── Answer handler ─── */

  const handleAnswer = useCallback(
    async ({ correct, confidence = null }) => {
      const item = queue[currentIndex];
      if (!item) return;

      const key = `${item.sectionId}:${item.questionIndex}`;

      // Get current progress or create default
      const current =
        progressMap[key] ||
        createDefaultProgress(item.sectionId, item.questionIndex);

      // F076: confidence reaches the scheduler. computeNextReview already understood
      // 'guessed' and 'certain'; nothing had ever passed them.
      const updated = computeNextReview(current, correct, confidence);

      // Save progress
      if (isLoggedIn) {
        try {
          await fetch('/api/practice/progress', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              sectionId: updated.sectionId,
              questionIndex: updated.questionIndex,
              // Packet 2 dual-write. buildQueue carries the source item, which now has an id.
              // Sent alongside the index, never instead of it; packet 4 switches the key.
              itemId: item.question?.id,
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
          confidence,
        },
      ]);

      // F077: the card told the student "this question will come back" and nothing ever brought
      // it back within the session. Re-append a wrong item once, so the sentence is true. Once,
      // not repeatedly: a student who keeps missing it would never reach the end otherwise.
      if (!correct && !requeuedRef.current.has(key)) {
        requeuedRef.current.add(key);
        setQueue(prev => [...prev, { ...item, requeued: true }]);
      }
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
    setAccessNote(null);
    setEmptyReason(null);
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
        accessNote={accessNote}
        sessionSize={sessionSize}
        onSessionSize={setSessionSize}
      />
    );
  }

  // Session phase
  if (phase === 'session') {
    const item = queue[currentIndex];

    if (!item) {
      return (
        <div className="spe-empty">
          <p>
            {accessNote?.kind === 'signed-out' || accessNote?.kind === 'error'
              ? accessNote.message
              : emptyReason?.kind === 'no-content'
                ? 'These topics have no questions yet.'
                : emptyReason?.kind === 'nothing-due'
                  ? `All ${emptyReason.stats.total} questions in these topics are scheduled. ${formatNextDue(emptyReason.stats.nextReview)}`
                  : 'Nothing to practise in these topics right now.'}
          </p>
          {accessNote?.kind === 'signed-out' && (
            <a className="spe-btn spe-btn-primary" href="/login">Sign in</a>
          )}
          {emptyReason?.kind === 'nothing-due' && (
            <button className="spe-btn spe-btn-primary" onClick={() => handleStart(true)}>
              Practise anyway
            </button>
          )}
          <button className="spe-btn spe-btn-secondary" onClick={handleRestart}>
            Back to Setup
          </button>
        </div>
      );
    }

    const question = item.question;
    const sectionTitle = getSectionTitle(item.sectionId);

    return (
      <div className="spe-session">
        {accessNote?.kind === 'preview' && (
          <div className="spe-preview-note" role="note">
            {accessNote.message}
          </div>
        )}
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
            sectionId={item.sectionId}
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
