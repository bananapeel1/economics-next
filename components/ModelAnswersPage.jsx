"use client";
import { useState, useMemo } from 'react';
import { useAuth } from './AuthProvider';
import PaywallOverlay from './PaywallOverlay';

/* ── Chevron SVG (toggle arrow) ── */
function ChevronDown({ open }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"
      style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

/* ── Badge class for mark count ── */
function badgeClass(marks) {
  if (marks <= 4) return 'ma-badge-4';
  if (marks <= 8) return 'ma-badge-8';
  return 'ma-badge-20';
}

function filterClass(marks) {
  if (marks <= 4) return 'ma-f4';
  if (marks <= 8) return 'ma-f8';
  return 'ma-f20';
}

/* ── Mark Scheme section ── */
function MarkScheme({ rows }) {
  return (
    <div className="ma-mark-scheme">
      <div className="ma-mark-scheme-title">Mark Scheme Breakdown</div>
      {rows.map((r, i) => (
        <div className="ma-mark-row" key={i}>
          <span className="ma-mark-label">{r.range}</span>
          <span className="ma-mark-desc">{r.desc}</span>
        </div>
      ))}
    </div>
  );
}

/* ── PEEL grid ── */
function PeelGrid({ peel }) {
  if (!peel) return null;
  return (
    <div className="ma-peel-section">
      <div className="ma-peel-title">PEEL Structure</div>
      <div className="ma-peel-grid">
        <div className="ma-peel-cell ma-peel-p">
          <div className="ma-peel-letter">P</div>
          <div className="ma-peel-word">Point</div>
          <p>{peel.point}</p>
        </div>
        <div className="ma-peel-cell ma-peel-e">
          <div className="ma-peel-letter">E</div>
          <div className="ma-peel-word">Evidence</div>
          <p>{peel.evidence}</p>
        </div>
        <div className="ma-peel-cell ma-peel-ex">
          <div className="ma-peel-letter">E</div>
          <div className="ma-peel-word">Explain</div>
          <p>{peel.explain}</p>
        </div>
        <div className="ma-peel-cell ma-peel-l">
          <div className="ma-peel-letter">L</div>
          <div className="ma-peel-word">Link</div>
          <p>{peel.link}</p>
        </div>
      </div>
    </div>
  );
}

/* ── Annotation legend ── */
function AnnotationLegend({ items }) {
  return (
    <div className="ma-ann-legend">
      {items.map((a, i) => (
        <div className="ma-ann-item" key={i}>
          <span className={`ma-ann ma-ann-${a.color}`}>{a.code}</span>
          <span>{a.label}</span>
        </div>
      ))}
    </div>
  );
}

/* ── Answer paragraphs ── */
function AnswerBlocks({ paragraphs }) {
  return (
    <div className="ma-answer-body">
      <div className="ma-section-title">Model Answer</div>
      {paragraphs.map((p, i) => (
        <div className="ma-answer-block" key={i}>
          {p.label && <div className="ma-paragraph-label">{p.label}</div>}
          <div dangerouslySetInnerHTML={{ __html: p.html }} />
        </div>
      ))}
    </div>
  );
}

/* ── Examiner commentary ── */
function ExaminerCommentary({ html }) {
  return (
    <div className="ma-examiner">
      <div className="ma-examiner-title">Examiner Commentary</div>
      <p dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}

/* ── Score footer ── */
function ScoreFooter({ score }) {
  return (
    <div className="ma-score">
      <span className="ma-score-label">Likely Score</span>
      <span className="ma-score-value">{score}</span>
    </div>
  );
}

/* ══════════════════════════════════════
   BROWSE-BY-TOPIC FILTER
   ══════════════════════════════════════ */
function BrowseFilter({ sectionsMeta, answers, subjectFilter, setSubjectFilter, unitFilter, setUnitFilter, sectionFilter, setSectionFilter }) {
  /* Derive visible sections based on current subject + unit selection */
  const visibleSections = useMemo(() => {
    if (subjectFilter === 'all') {
      /* Show all sections across all subjects */
      const all = [];
      for (const [, subj] of Object.entries(sectionsMeta)) {
        for (const [, unit] of Object.entries(subj.units)) {
          for (const sec of unit.sections) all.push(sec);
        }
      }
      if (unitFilter !== 'all') {
        return all.filter(s => {
          const num = s.number;
          /* Unit 1 sections start with 1, Unit 2 start with 2 */
          return num.startsWith(String(unitFilter) + '.');
        });
      }
      return all;
    }
    const subj = sectionsMeta[subjectFilter];
    if (!subj) return [];
    if (unitFilter === 'all') {
      const all = [];
      for (const [, unit] of Object.entries(subj.units)) {
        for (const sec of unit.sections) all.push(sec);
      }
      return all;
    }
    const unit = subj.units[unitFilter];
    return unit ? unit.sections : [];
  }, [sectionsMeta, subjectFilter, unitFilter]);

  /* Count answers per section */
  const countMap = useMemo(() => {
    const map = {};
    answers.forEach(a => {
      map[a.sectionNumber] = (map[a.sectionNumber] || 0) + 1;
    });
    return map;
  }, [answers]);

  return (
    <div className="ma-browse-section">
      <h2>Browse by Topic</h2>

      {/* Step 1: Choose subject */}
      <p className="ma-browse-step-label">Choose a subject:</p>
      <div className="ma-subject-toggle">
        {Object.keys(sectionsMeta).map(key => (
          <button
            key={key}
            className={`ma-subject-btn ${subjectFilter === key ? 'active' : ''}`}
            onClick={() => {
              if (subjectFilter === key) {
                setSubjectFilter('all');
                setUnitFilter('all');
                setSectionFilter('all');
              } else {
                setSubjectFilter(key);
                setUnitFilter('all');
                setSectionFilter('all');
              }
            }}
          >
            {sectionsMeta[key].label}
          </button>
        ))}
      </div>

      {/* Step 2: Choose unit — only shows after subject is picked */}
      {subjectFilter !== 'all' && (
        <>
          <p className="ma-browse-step-label">Choose a unit:</p>
          <div className="ma-unit-tabs">
            {Object.keys(sectionsMeta[subjectFilter].units).map(u => (
              <button
                key={u}
                className={`ma-unit-btn ${unitFilter === u ? 'active' : ''}`}
                onClick={() => {
                  if (unitFilter === u) {
                    setUnitFilter('all');
                    setSectionFilter('all');
                  } else {
                    setUnitFilter(u);
                    setSectionFilter('all');
                  }
                }}
              >
                {sectionsMeta[subjectFilter].units[u].label}
              </button>
            ))}
          </div>
        </>
      )}

      {/* Step 3: Choose topic — only shows after unit is picked */}
      {subjectFilter !== 'all' && unitFilter !== 'all' && (
        <>
          <p className="ma-browse-step-label">Choose a topic:</p>
          <div className="ma-section-pills">
            {visibleSections.map(sec => {
              const count = countMap[sec.number] || 0;
              const isActive = sectionFilter === sec.number;
              return (
                <button
                  key={sec.number}
                  className={`ma-section-pill ${isActive ? 'active' : ''}`}
                  onClick={() => setSectionFilter(isActive ? 'all' : sec.number)}
                >
                  {sec.title}
                  <span className="ma-pill-count">{count}</span>
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

/* ══════════════════════════════════════
   MAIN COMPONENT
   ══════════════════════════════════════ */
export default function ModelAnswersPage({ answers, freeMode = false, sectionsMeta }) {
  const { isPremium } = useAuth();
  const [markFilter, setMarkFilter] = useState('all');
  const [subjectFilter, setSubjectFilter] = useState('all');
  const [unitFilter, setUnitFilter] = useState('all');
  const [sectionFilter, setSectionFilter] = useState('all');
  const [openCards, setOpenCards] = useState(new Set([answers[0]?.id]));

  const markOptions = useMemo(() => {
    const marks = [...new Set(answers.map(a => a.marks))].sort((a, b) => a - b);
    return marks;
  }, [answers]);

  const filtered = useMemo(() => {
    let result = answers;
    if (subjectFilter !== 'all') result = result.filter(a => a.subject === subjectFilter);
    if (unitFilter !== 'all') result = result.filter(a => a.unit === Number(unitFilter));
    if (sectionFilter !== 'all') result = result.filter(a => a.sectionNumber === sectionFilter);
    if (markFilter !== 'all') result = result.filter(a => a.marks === Number(markFilter));
    return result;
  }, [answers, subjectFilter, unitFilter, sectionFilter, markFilter]);

  function toggleCard(id) {
    setOpenCards(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  /* First answer is free; rest locked for non-premium. freeMode bypasses paywall for SEO pages. */
  function isLocked(index) {
    if (freeMode) return false;
    if (isPremium) return false;
    return index > 0;
  }

  return (
    <>
      {/* Hierarchical browse filter — only on hub page */}
      {sectionsMeta && (
        <BrowseFilter
          sectionsMeta={sectionsMeta}
          answers={answers}
          subjectFilter={subjectFilter}
          setSubjectFilter={setSubjectFilter}
          unitFilter={unitFilter}
          setUnitFilter={setUnitFilter}
          sectionFilter={sectionFilter}
          setSectionFilter={setSectionFilter}
        />
      )}

      {/* SEO intro paragraph */}
      <div className="ma-seo-intro">
        These <strong>model answers</strong> demonstrate how to structure responses for <strong>Edexcel International A-Level (IAL) Economics and Business</strong> exams.
        Each answer includes a <strong>mark scheme breakdown</strong>, <strong>PEEL structure</strong> (where applicable), <strong>annotated paragraphs</strong>, and <strong>examiner commentary</strong> explaining what earns marks at each band.
      </div>

      {/* Filter bar */}
      <div className="ma-filter-bar">
        <span className="ma-filter-label">Filter by marks:</span>
        <button
          className={`ma-filter-btn ${markFilter === 'all' ? 'active' : ''}`}
          onClick={() => setMarkFilter('all')}
        >
          All
        </button>
        {markOptions.map(m => (
          <button
            key={m}
            className={`ma-filter-btn ${filterClass(m)} ${markFilter === String(m) ? 'active' : ''}`}
            onClick={() => setMarkFilter(String(m))}
          >
            {m} marks
          </button>
        ))}
      </div>

      {/* Question cards */}
      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)', fontSize: 14 }}>
          No model answers match the current filters.
        </div>
      )}
      {filtered.map((answer, idx) => {
        const isOpen = openCards.has(answer.id);
        const locked = isLocked(idx);

        return (
          <div className="ma-card" key={answer.id}>
            {/* Header — always visible */}
            <div className="ma-header" onClick={() => toggleCard(answer.id)}>
              <span className={`ma-marks-badge ${badgeClass(answer.marks)}`}>
                {answer.marks} marks
              </span>
              <div className="ma-meta">
                <div className="ma-unit">
                  Unit {answer.unit} &middot; {answer.sectionNumber} {answer.sectionTitle} &middot; {answer.type}
                </div>
                <div className="ma-question-text">
                  <span className="ma-command">{answer.commandWord}:</span> {answer.question.replace(`${answer.commandWord} `, '').replace(`${answer.commandWord.toLowerCase()} `, '')}
                </div>
              </div>
              <button className={`ma-toggle ${isOpen ? 'open' : ''}`} aria-label="Toggle answer">
                <ChevronDown open={isOpen} />
              </button>
            </div>

            {/* Body — expandable */}
            <div className={`ma-body ${isOpen ? 'open' : ''}`}>
              {locked ? (
                <div className="ma-locked-body">
                  <PaywallOverlay feature="Model Answers" inline />
                </div>
              ) : (
                <>
                  <MarkScheme rows={answer.markScheme} />
                  <PeelGrid peel={answer.peel} />
                  <AnnotationLegend items={answer.annotationLegend} />
                  <AnswerBlocks paragraphs={answer.answerParagraphs} />
                  <ExaminerCommentary html={answer.examinerCommentary} />
                  <ScoreFooter score={answer.likelyScore} />
                </>
              )}
            </div>
          </div>
        );
      })}
    </>
  );
}
