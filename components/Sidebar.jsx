"use client";
import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useAuth } from './AuthProvider';
import { Clipboard, Glossary, Document, CardClub, PdfFile, NetworkGraph, ModelAnswer, BookAlt, BoltIcon, CardsIcon, ProgressChart, PenIcon } from './Icons';
import { getStrengthData, nextReviewAt } from '@/lib/strength';

const SidebarHomeIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;

export default function Sidebar({ subjects, activeSubjectId, onSubjectChange, sections, units, activeSection, onSectionChange, isOpen, isCollapsed, onToggleCollapse, contentStepInfo, savedProgress, visitedFeatures = {}, onResourceVisit, learnModeCompletions = {}, onTabSelect, onHomeClick, depth = null }) {
  const { user, isPremium } = useAuth();
  const [moreOpen, setMoreOpen] = useState(false);

  /*
   * F004. A completed topic used to carry a small strength bar right beside the green tick that
   * said it was finished. The bar only ever shrank, it had no label in the small size, and it
   * disagreed with the tick: done, and visibly draining. That is the "punished for finishing"
   * complaint this finding is named for, and fixing the decay maths in lib/strength.js did not
   * remove it, because a bar that falls slower is still a bar that only falls.
   *
   * The sidebar now says one thing, and only when it is actionable: this topic is ready for a
   * review. Read in an effect rather than during render, because the source is localStorage and
   * the server has no access to it.
   */
  const [dueSections, setDueSections] = useState(() => new Set());
  const completedKey = useMemo(
    () => Object.keys(learnModeCompletions).filter((k) => learnModeCompletions[k]).sort().join(','),
    [learnModeCompletions],
  );
  useEffect(() => {
    const ids = completedKey ? completedKey.split(',') : [];
    if (!ids.length) { setDueSections(new Set()); return; }
    const now = Date.now();
    const due = new Set();
    for (const id of ids) {
      const data = getStrengthData(activeSubjectId, id);
      const at = data ? nextReviewAt(data) : null;
      if (at && at <= now) due.add(id);
    }
    setDueSections(due);
  }, [activeSubjectId, completedKey]);

  // Determine which unit the active section belongs to
  const activeUnitNumber = useMemo(() => {
    const section = sections.find(s => s.id === activeSection);
    if (!section) return null;
    const unit = units.find(u => u.id === section.unit_id);
    return unit?.number || null;
  }, [activeSection, sections, units]);

  // Smart collapse: only expand the unit that contains the active section
  // Default: unit 1 if no active section found
  const [expandedUnits, setExpandedUnits] = useState(() => {
    const state = {};
    units.forEach(u => { state[u.number] = false; });
    // Expand unit containing active section, or unit 1 by default
    const unitToExpand = activeUnitNumber || 1;
    state[unitToExpand] = true;
    return state;
  });

  // When the active section changes, auto-expand its unit and collapse others
  useEffect(() => {
    if (!activeUnitNumber) return;
    setExpandedUnits(prev => {
      // Only update if the active unit isn't already expanded
      if (prev[activeUnitNumber]) return prev;
      const next = {};
      units.forEach(u => { next[u.number] = u.number === activeUnitNumber; });
      return next;
    });
  }, [activeUnitNumber, units]);

  function toggleUnit(unitNum) {
    setExpandedUnits(prev => ({ ...prev, [unitNum]: !prev[unitNum] }));
  }

  // Determine the status indicator for a section
  function getSectionStatus(sectionId) {
    if (!user || !savedProgress) return null;

    // Active section: use live step info
    if (sectionId === activeSection && contentStepInfo) {
      const { furthestStep, totalSteps } = contentStepInfo;
      if (totalSteps <= 0) return null;
      const completed = furthestStep >= totalSteps - 1;
      return completed ? 'complete' : 'in-progress';
    }

    // Other sections: use saved progress
    const progress = savedProgress[sectionId];
    if (!progress) return null; // never visited
    return progress.completed ? 'complete' : 'in-progress';
  }

  return (
    <nav className={`sidebar ${isOpen ? 'open' : ''} ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <button className="sidebar-logo" onClick={onHomeClick} style={{ cursor: 'pointer', background: 'none', border: 'none', padding: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <img src="/logo.svg" alt="Revvy Learn" className="sidebar-logo-icon" />
          <span className="sidebar-logo-text">Revvy Learn</span>
        </button>
        <div className="sidebar-subtitle">Edexcel International A-Level</div>
        {onToggleCollapse && (
          <button className="sidebar-collapse-btn" onClick={onToggleCollapse} title="Collapse sidebar">
            &#x2190;
          </button>
        )}
      </div>

      {subjects && subjects.length > 1 && (
        <div className="sidebar-subject-selector">
          {subjects.map(subject => (
            <button
              key={subject.id}
              className={`sidebar-subject-btn ${activeSubjectId === subject.id ? 'active' : ''}`}
              onClick={() => onSubjectChange(subject.id)}
            >
              {subject.name}
            </button>
          ))}
        </div>
      )}

      {units.map(unit => {
        const unitSections = sections.filter(s => s.unit_id === unit.id);
        const isExpanded = expandedUnits[unit.number];

        return (
          <div className="sidebar-unit" key={unit.number}>
            <div className="sidebar-unit-header" onClick={() => toggleUnit(unit.number)}>
              <span className="sidebar-unit-title">Unit {unit.number}: {unit.title}</span>
              <span className={`sidebar-unit-chevron ${isExpanded ? 'open' : ''}`}>&#9654;</span>
            </div>
            {isExpanded && (
              <ul className="sidebar-section-list">
                {unitSections.map(section => {
                  const status = getSectionStatus(section.id);

                  return (
                    <li
                      key={section.id}
                      className={`sidebar-section-item ${activeSection === section.id ? 'active' : ''}`}
                      onClick={() => onSectionChange(section.id)}
                    >
                      <span className="sidebar-section-number">{section.number}</span>
                      <span className="sidebar-section-name">{section.short_title}</span>
                      {/* F083: a section below the Unit 1 template says how many questions it holds,
                          so a Year 13 student is told rather than left to conclude the app skips
                          their year. Thresholds are the validator's (/api/sections/depth). */}
                      {depth?.[section.id]?.thin && (
                        <span className="sidebar-section-depth" title="Shorter than a full section — more content coming">
                          {depth[section.id].quiz < 20 ? `${depth[section.id].quiz} q` : `${depth[section.id].chapters} ch`}
                        </span>
                      )}
                      {/* F033: two indicators used to sit here and disagree — a Learn Mode dot from
                          localStorage and a progress tick from the resume pointer, which counted
                          steps against the wrong total. A student saw a section marked complete
                          and in progress at once. One status now, completion from either source
                          winning, because finishing is finishing however it was recorded. */}
                      {(learnModeCompletions[section.id] || status) && (() => {
                        const isDone = learnModeCompletions[section.id] || status === 'complete';
                        const isDue = isDone && dueSections.has(section.id);
                        const state = isDue ? 'due' : isDone ? 'complete' : status;
                        const label = isDue ? 'Ready for review' : isDone ? 'Completed' : 'In progress';
                        return (
                          <span className={`sidebar-section-status ${state}`} title={label} aria-label={label}>
                            {isDue ? (
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                                <path d="M21 12a9 9 0 1 1-2.64-6.36" />
                                <polyline points="21 3 21 9 15 9" />
                              </svg>
                            ) : isDone ? (
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                                <circle cx="12" cy="12" r="10" />
                                <polyline points="16 8 10 16 7 13" />
                              </svg>
                            ) : (
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                                <circle cx="12" cy="12" r="10" />
                                <path d="M12 6v6l4 2" />
                              </svg>
                            )}
                          </span>
                        );
                      })()}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        );
      })}

      {/* Resources section — top items always visible */}
      <div className="sidebar-resources">
        <div className="sidebar-resources-title">Resources</div>
        <Link href="/practice" className="sidebar-resource-link">
          <span className="sidebar-resource-icon"><BoltIcon size={16} /></span>
          Smart Practice
          <span className="new-badge">New</span>
        </Link>
        <Link href="/flashcards-practice" className="sidebar-resource-link">
          <span className="sidebar-resource-icon"><CardsIcon size={16} /></span>
          Smart Flashcards
          <span className="new-badge">New</span>
        </Link>
        <Link href="/written-practice" className="sidebar-resource-link">
          <span className="sidebar-resource-icon"><PenIcon size={16} /></span>
          Written Practice
          <span className="new-badge">New</span>
        </Link>
        {onTabSelect && (
          <button className="sidebar-resource-link sidebar-content-link" onClick={() => onTabSelect('content')}>
            <span className="sidebar-resource-icon"><BookAlt size={16} /></span>
            Content Explorer
          </button>
        )}
        <Link href="/model-answers" className="sidebar-resource-link">
          <span className="sidebar-resource-icon"><ModelAnswer size={16} /></span>
          Model Answers
        </Link>
        <Link href="/pdfs" className="sidebar-resource-link" onClick={() => !visitedFeatures['resource-pdfs'] && onResourceVisit?.('resource-pdfs')}>
          <span className="sidebar-resource-icon"><PdfFile size={16} /></span>
          PDFs
          {!visitedFeatures['resource-pdfs'] && <span className="new-badge">New</span>}
        </Link>

        {/* Collapsible "More" */}
        <button className="sidebar-resource-more-btn" onClick={() => setMoreOpen(prev => !prev)}>
          {moreOpen ? '\u25BE' : '\u25B8'} More
        </button>
        {moreOpen && (
          <>
            <Link href="/topic-links" className="sidebar-resource-link" onClick={() => !visitedFeatures['resource-topic-links'] && onResourceVisit?.('resource-topic-links')}>
              <span className="sidebar-resource-icon"><NetworkGraph size={16} /></span>
              Topic Links
              {!visitedFeatures['resource-topic-links'] && <span className="new-badge">New</span>}
            </Link>
            <Link href="/past-papers" className="sidebar-resource-link">
              <span className="sidebar-resource-icon"><Document size={16} /></span>
              Past Papers
            </Link>
            <Link href="/command-words" className="sidebar-resource-link">
              <span className="sidebar-resource-icon"><Clipboard size={16} /></span>
              Command Words
            </Link>
            <Link href="/glossary" className="sidebar-resource-link">
              <span className="sidebar-resource-icon"><Glossary size={16} /></span>
              Glossary
            </Link>
          </>
        )}
      </div>

      {/* Fun section */}
      <div className="sidebar-break-time">
        <div className="sidebar-break-title">Fun</div>
        <Link href="/fun" className="sidebar-resource-link sidebar-break-link">
          <span className="sidebar-resource-icon"><CardClub size={16} /></span>
          Blackjack
        </Link>
      </div>
    </nav>
  );
}
