"use client";
import { useState, useMemo } from 'react';

export default function PastPapersPage({ papers, subjects = [], units = [] }) {
  const [search, setSearch] = useState('');
  const [activeSubjectId, setActiveSubjectId] = useState('all');
  const [filterUnit, setFilterUnit] = useState('all');
  const [filterYear, setFilterYear] = useState('all');

  // Get papers for the active subject
  const subjectPapers = useMemo(() => {
    if (activeSubjectId === 'all') return papers;
    return papers.filter(p => p.subject_id === parseInt(activeSubjectId));
  }, [papers, activeSubjectId]);

  // Dynamic unit options based on selected subject
  const unitOptions = useMemo(() => {
    if (activeSubjectId === 'all') {
      const allUnits = new Set(papers.map(p => p.unit));
      return [...allUnits].sort((a, b) => a - b);
    }
    const subjectUnitNums = units
      .filter(u => u.subject_id === parseInt(activeSubjectId))
      .map(u => u.number)
      .sort((a, b) => a - b);
    return subjectUnitNums;
  }, [papers, units, activeSubjectId]);

  const years = useMemo(() => {
    const set = new Set(subjectPapers.map(p => p.year));
    return [...set].sort((a, b) => b - a);
  }, [subjectPapers]);

  const filtered = useMemo(() => {
    return subjectPapers.filter(p => {
      if (filterUnit !== 'all' && p.unit !== parseInt(filterUnit)) return false;
      if (filterYear !== 'all' && p.year !== parseInt(filterYear)) return false;
      if (search) {
        const q = search.toLowerCase();
        return p.title.toLowerCase().includes(q) ||
          p.session.toLowerCase().includes(q) ||
          String(p.year).includes(q);
      }
      return true;
    });
  }, [subjectPapers, search, filterUnit, filterYear]);

  // Group by year
  const grouped = useMemo(() => {
    const map = {};
    filtered.forEach(p => {
      if (!map[p.year]) map[p.year] = [];
      map[p.year].push(p);
    });
    return Object.entries(map).sort(([a], [b]) => b - a);
  }, [filtered]);

  // Reset unit and year filters when subject changes
  function handleSubjectChange(subjectId) {
    setActiveSubjectId(subjectId);
    setFilterUnit('all');
    setFilterYear('all');
  }

  if (!papers.length) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>📄</div>
        <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 8 }}>No past papers yet</div>
        <div style={{ fontSize: 14 }}>Past papers will be available here once uploaded.</div>
      </div>
    );
  }

  return (
    <div>
      {/* Subject toggle */}
      {subjects.length > 1 && (
        <div className="resource-subject-toggle">
          <button
            className={`resource-subject-btn ${activeSubjectId === 'all' ? 'active' : ''}`}
            onClick={() => handleSubjectChange('all')}
          >
            All Subjects
          </button>
          {subjects.map(s => (
            <button
              key={s.id}
              className={`resource-subject-btn ${activeSubjectId === String(s.id) ? 'active' : ''}`}
              onClick={() => handleSubjectChange(String(s.id))}
            >
              {s.name}
            </button>
          ))}
        </div>
      )}

      <div className="past-papers-filters">
        <input
          className="resource-search"
          type="text"
          placeholder="Search papers..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select
          className="past-papers-select"
          value={filterUnit}
          onChange={e => setFilterUnit(e.target.value)}
        >
          <option value="all">All Units</option>
          {unitOptions.map(u => (
            <option key={u} value={u}>Unit {u}</option>
          ))}
        </select>
        <select
          className="past-papers-select"
          value={filterYear}
          onChange={e => setFilterYear(e.target.value)}
        >
          <option value="all">All Years</option>
          {years.map(y => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
      </div>

      {grouped.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 40, color: 'var(--text-muted)' }}>
          No papers match your filters.
        </div>
      ) : (
        grouped.map(([year, yearPapers]) => (
          <div key={year} className="past-papers-year-group">
            <h2 className="past-papers-year-title">{year}</h2>
            <div className="past-papers-grid">
              {yearPapers.map(paper => (
                <div key={paper.id} className="past-paper-card">
                  <div className="past-paper-card-header">
                    <span className="past-paper-badge">Unit {paper.unit}</span>
                    <span className="past-paper-session">{paper.session}</span>
                  </div>
                  <h3 className="past-paper-title">{paper.title}</h3>
                  <div className="past-paper-actions">
                    {paper.paper_url && (
                      <a
                        href={paper.paper_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="past-paper-btn past-paper-btn-primary"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
                        </svg>
                        Question Paper
                      </a>
                    )}
                    {paper.mark_scheme_url && (
                      <a
                        href={paper.mark_scheme_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="past-paper-btn past-paper-btn-secondary"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
                        </svg>
                        Mark Scheme
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
