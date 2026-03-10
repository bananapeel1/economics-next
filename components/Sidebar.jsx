"use client";
import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from './AuthProvider';

export default function Sidebar({ sections, units, activeSection, onSectionChange, isOpen, isCollapsed, onToggleCollapse }) {
  const [expandedUnits, setExpandedUnits] = useState({ 1: true, 2: true });
  const { user } = useAuth();

  function toggleUnit(unitNum) {
    setExpandedUnits(prev => ({ ...prev, [unitNum]: !prev[unitNum] }));
  }

  return (
    <nav className={`sidebar ${isOpen ? 'open' : ''} ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon">R</div>
          <span className="sidebar-logo-text">Rivvy Learn</span>
        </div>
        <div className="sidebar-subtitle">Edexcel International A-Level</div>
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
                {unitSections.map(section => (
                  <li
                    key={section.id}
                    className={`sidebar-section-item ${activeSection === section.id ? 'active' : ''}`}
                    onClick={() => onSectionChange(section.id)}
                  >
                    <span className="sidebar-section-number">{section.number}</span>
                    <span>{section.short_title}</span>
                  </li>
                ))}
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
