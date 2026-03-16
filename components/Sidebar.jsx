"use client";
import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useAuth } from './AuthProvider';
import { Clipboard, Glossary, Document, CardClub, PdfFile, NetworkGraph, ModelAnswer } from './Icons';

export default function Sidebar({ subjects, activeSubjectId, onSubjectChange, sections, units, activeSection, onSectionChange, isOpen, isCollapsed, onToggleCollapse, contentStepInfo, savedProgress, visitedFeatures = {}, onResourceVisit }) {
  const { user, isPremium } = useAuth();
  const [moreOpen, setMoreOpen] = useState(false);

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
        <div className="sidebar-logo">
          <img src="/logo.svg" alt="Revvy Learn" className="sidebar-logo-icon" />
          <span className="sidebar-logo-text">Revvy Learn</span>
        </div>
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
                      {status && (
                        <span className={`sidebar-section-status ${status}`} title={status === 'complete' ? 'Completed' : 'In progress'}>
                          {status === 'complete' ? (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <circle cx="12" cy="12" r="10" />
                              <polyline points="16 8 10 16 7 13" />
                            </svg>
                          ) : (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <circle cx="12" cy="12" r="10" />
                              <path d="M12 6v6l4 2" />
                            </svg>
                          )}
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        );
      })}

      {/* Resources section — top 3 always visible */}
      <div className="sidebar-resources">
        <div className="sidebar-resources-title">Resources</div>
        <Link href="/model-answers" className="sidebar-resource-link">
          <span className="sidebar-resource-icon"><ModelAnswer size={16} /></span>
          Model Answers
        </Link>
        <Link href="/pdfs" className="sidebar-resource-link" onClick={() => !visitedFeatures['resource-pdfs'] && onResourceVisit?.('resource-pdfs')}>
          <span className="sidebar-resource-icon"><PdfFile size={16} /></span>
          PDFs
          {!visitedFeatures['resource-pdfs'] && <span className="new-badge">New</span>}
        </Link>
        <Link href="/topic-links" className="sidebar-resource-link" onClick={() => !visitedFeatures['resource-topic-links'] && onResourceVisit?.('resource-topic-links')}>
          <span className="sidebar-resource-icon"><NetworkGraph size={16} /></span>
          Topic Links
          {!visitedFeatures['resource-topic-links'] && <span className="new-badge">New</span>}
        </Link>

        {/* Collapsible "More" */}
        <button className="sidebar-resource-more-btn" onClick={() => setMoreOpen(prev => !prev)}>
          {moreOpen ? '\u25BE' : '\u25B8'} More
        </button>
        {moreOpen && (
          <>
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

      {/* Break Time section */}
      <div className="sidebar-break-time">
        <div className="sidebar-break-title">Break Time</div>
        <Link href="/fun" className="sidebar-resource-link sidebar-break-link">
          <span className="sidebar-resource-icon"><CardClub size={16} /></span>
          Blackjack
        </Link>
      </div>
    </nav>
  );
}
