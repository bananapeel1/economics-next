'use client';

import { useMemo, useCallback, useState } from 'react';

/* ─── Subject icon map ─── */
const SUBJECT_ICONS = {
  microeconomics: '\u{1F4CA}',
  macroeconomics: '\u{1F30D}',
};

function getSubjectIcon(slug) {
  return SUBJECT_ICONS[slug] || '\u{1F4D6}';
}

export default function TopicSelector({
  subjects,
  units,
  sections,
  selectedSubjectSlug,
  onSubjectChange,
  selectedSectionIds,
  onToggleSection,
  onStart,
  loading,
}) {
  const [expandedUnits, setExpandedUnits] = useState(new Set());

  /* ─── Derived data ─── */

  const selectedSubject = useMemo(
    () => subjects.find(s => s.slug === selectedSubjectSlug) || null,
    [subjects, selectedSubjectSlug]
  );

  const filteredUnits = useMemo(
    () =>
      selectedSubject
        ? units.filter(u => u.subject_id === selectedSubject.id)
        : [],
    [units, selectedSubject]
  );

  const sectionsByUnit = useMemo(() => {
    const map = {};
    for (const unit of filteredUnits) {
      map[unit.id] = sections.filter(s => s.unit_id === unit.id);
    }
    return map;
  }, [filteredUnits, sections]);

  const selectionCount = selectedSectionIds.size;

  /* ─── Unit-level toggle ─── */

  const handleToggleUnit = useCallback(
    (unitId) => {
      const unitSections = sectionsByUnit[unitId] || [];
      const allSelected = unitSections.every(s => selectedSectionIds.has(s.id));

      for (const sec of unitSections) {
        if (allSelected) {
          if (selectedSectionIds.has(sec.id)) {
            onToggleSection(sec.id);
          }
        } else {
          if (!selectedSectionIds.has(sec.id)) {
            onToggleSection(sec.id);
          }
        }
      }
    },
    [sectionsByUnit, selectedSectionIds, onToggleSection]
  );

  const isUnitFullySelected = useCallback(
    (unitId) => {
      const unitSections = sectionsByUnit[unitId] || [];
      return unitSections.length > 0 && unitSections.every(s => selectedSectionIds.has(s.id));
    },
    [sectionsByUnit, selectedSectionIds]
  );

  const isUnitPartiallySelected = useCallback(
    (unitId) => {
      const unitSections = sectionsByUnit[unitId] || [];
      return (
        unitSections.some(s => selectedSectionIds.has(s.id)) &&
        !unitSections.every(s => selectedSectionIds.has(s.id))
      );
    },
    [sectionsByUnit, selectedSectionIds]
  );

  const getSelectedCountForUnit = useCallback(
    (unitId) => {
      const unitSections = sectionsByUnit[unitId] || [];
      return unitSections.filter(s => selectedSectionIds.has(s.id)).length;
    },
    [sectionsByUnit, selectedSectionIds]
  );

  /* ─── Expand / collapse ─── */

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

  /* ─── Render ─── */

  return (
    <div className="spe-selector">
      {/* Header */}
      <div className="spe-selector-header">
        <h2 className="spe-selector-title">Smart Practice</h2>
        <p className="spe-selector-subtitle">Choose your topics and start practicing</p>
      </div>

      {/* Subject toggle pills */}
      <div className="spe-subject-bar">
        {subjects.map(sub => {
          const isActive = sub.slug === selectedSubjectSlug;
          return (
            <button
              key={sub.slug}
              className={`spe-subject-pill${isActive ? ' spe-subject-pill--active' : ''}`}
              onClick={() => onSubjectChange(sub.slug)}
            >
              <span className="spe-subject-pill-icon">{getSubjectIcon(sub.slug)}</span>
              <span className="spe-subject-pill-label">{sub.name}</span>
            </button>
          );
        })}
      </div>

      {/* Unit accordion cards */}
      <div className="spe-units">
        {filteredUnits.map(unit => {
          const unitSections = sectionsByUnit[unit.id] || [];
          if (unitSections.length === 0) return null;

          const fullySelected = isUnitFullySelected(unit.id);
          const partiallySelected = isUnitPartiallySelected(unit.id);
          const selectedCount = getSelectedCountForUnit(unit.id);
          const totalCount = unitSections.length;
          const isExpanded = expandedUnits.has(unit.id);

          return (
            <div
              key={unit.id}
              className={`spe-unit-card${fullySelected ? ' spe-unit-card--selected' : ''}${partiallySelected ? ' spe-unit-card--partial' : ''}`}
            >
              {/* Unit header row */}
              <div className="spe-unit-header" onClick={() => toggleExpand(unit.id)}>
                <div className="spe-unit-header-left">
                  <span className="spe-unit-badge">{unit.number}</span>
                  <div className="spe-unit-info">
                    <span className="spe-unit-title">{unit.title}</span>
                    <span className="spe-unit-count">
                      {selectedCount > 0
                        ? `${selectedCount}/${totalCount} topics`
                        : `${totalCount} topics`}
                    </span>
                  </div>
                </div>
                <div className="spe-unit-header-right">
                  <button
                    className={`spe-unit-checkbox${fullySelected ? ' spe-unit-checkbox--checked' : ''}${partiallySelected ? ' spe-unit-checkbox--partial' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleUnit(unit.id);
                    }}
                    aria-label={fullySelected ? 'Deselect all sections' : 'Select all sections'}
                  >
                    {fullySelected && (
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M2.5 7L5.5 10L11.5 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                    {partiallySelected && (
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M3 7H11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    )}
                  </button>
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
                  {unitSections.map(sec => {
                    const isSelected = selectedSectionIds.has(sec.id);
                    return (
                      <button
                        key={sec.id}
                        className={`spe-section-chip${isSelected ? ' spe-section-chip--active' : ''}`}
                        onClick={() => onToggleSection(sec.id)}
                      >
                        {sec.short_title || sec.title}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Sticky action bar */}
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
