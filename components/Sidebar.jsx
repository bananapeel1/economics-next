"use client";
import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from './AuthProvider';
import { useTheme } from './ThemeProvider';

export default function Sidebar({ sections, units, activeSection, onSectionChange, isOpen, isCollapsed, onToggleCollapse, contentStepInfo, savedProgress }) {
  const [expandedUnits, setExpandedUnits] = useState({ 1: true, 2: true });
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();

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
          <img src="/logo.png" alt="Revvy Learn" className="sidebar-logo-icon" />
          <span className="sidebar-logo-text">Revvy Learn</span>
        </div>
        <div className="sidebar-subtitle">Edexcel International A-Level</div>
        <button
          className="theme-toggle-btn"
          onClick={toggleTheme}
          title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
        {onToggleCollapse && (
          <button className="sidebar-collapse-btn" onClick={onToggleCollapse} title="Collapse sidebar">
            &#x2190;
          </button>
        )}
      </div>

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

      {/* Resources section */}
      <div className="sidebar-resources">
        <div className="sidebar-resources-title">Resources</div>
        <Link href="/command-words" className="sidebar-resource-link">
          <span className="sidebar-resource-icon">📋</span>
          Command Words
        </Link>
        <Link href="/glossary" className="sidebar-resource-link">
          <span className="sidebar-resource-icon">📖</span>
          Glossary
        </Link>
        <Link href="/past-papers" className="sidebar-resource-link">
          <span className="sidebar-resource-icon">📄</span>
          Past Papers
        </Link>
        {user && (
          <Link href="/bookmarks" className="sidebar-resource-link">
            <span className="sidebar-resource-icon">🔖</span>
            Bookmarks
          </Link>
        )}
      </div>
    </nav>
  );
}
