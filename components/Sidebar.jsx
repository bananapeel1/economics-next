"use client";
import { useState } from 'react';

export default function Sidebar({ sections, units, activeSection, onSectionChange, isOpen }) {
  const [expandedUnits, setExpandedUnits] = useState({ 1: true, 2: true });

  function toggleUnit(unitNum) {
    setExpandedUnits(prev => ({ ...prev, [unitNum]: !prev[unitNum] }));
  }

  return (
    <nav className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon">E</div>
          <span className="sidebar-logo-text">Economics IAS</span>
        </div>
        <div className="sidebar-subtitle">Edexcel International A-Level</div>
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
    </nav>
  );
}
