'use client';

import { useMemo, useCallback } from 'react';

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
          // Deselect all in this unit
          if (selectedSectionIds.has(sec.id)) {
            onToggleSection(sec.id);
          }
        } else {
          // Select all in this unit
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

  /* ─── Render ─── */

  return (
    <div className="spe-selector">
      {/* Subject toggle */}
      <div className="spe-subject-bar">
        {subjects.map(sub => (
          <button
            key={sub.slug}
            className={`spe-subject-btn${sub.slug === selectedSubjectSlug ? ' spe-subject-btn--active' : ''}`}
            onClick={() => onSubjectChange(sub.slug)}
          >
            {sub.name}
          </button>
        ))}
      </div>

      {/* Unit groups */}
      <div className="spe-units">
        {filteredUnits.map(unit => {
          const unitSections = sectionsByUnit[unit.id] || [];
          if (unitSections.length === 0) return null;

          const fullySelected = isUnitFullySelected(unit.id);
          const partiallySelected = isUnitPartiallySelected(unit.id);

          return (
            <div key={unit.id} className="spe-unit-group">
              <label className="spe-unit-header">
                <span className="spe-checkbox-wrap">
                  <input
                    type="checkbox"
                    checked={fullySelected}
                    ref={el => {
                      if (el) el.indeterminate = partiallySelected;
                    }}
                    onChange={() => handleToggleUnit(unit.id)}
                    className="spe-checkbox"
                  />
                </span>
                <span className="spe-unit-title">
                  Unit {unit.number}: {unit.title}
                </span>
              </label>

              <div className="spe-section-grid">
                {unitSections.map(sec => (
                  <label key={sec.id} className="spe-section-item">
                    <input
                      type="checkbox"
                      checked={selectedSectionIds.has(sec.id)}
                      onChange={() => onToggleSection(sec.id)}
                      className="spe-checkbox"
                    />
                    <span className="spe-section-label">
                      {sec.short_title || sec.title}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Action bar */}
      <div className="spe-action-bar">
        <span className="spe-action-count">
          {selectionCount} topic{selectionCount !== 1 ? 's' : ''} selected
        </span>
        <button
          className="spe-btn spe-btn-primary"
          disabled={selectionCount === 0 || loading}
          onClick={onStart}
        >
          {loading ? 'Loading...' : 'Start Practice'}
        </button>
      </div>
    </div>
  );
}
