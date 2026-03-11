"use client";
import { useState, useMemo } from 'react';

export default function PastPapersPage({ papers }) {
  const [search, setSearch] = useState('');
  const [filterUnit, setFilterUnit] = useState('all');
  const [filterYear, setFilterYear] = useState('all');

  const years = useMemo(() => {
    const set = new Set(papers.map(p => p.year));
    return [...set].sort((a, b) => b - a);
  }, [papers]);

  const filtered = useMemo(() => {
    return papers.filter(p => {
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
  }, [papers, search, filterUnit, filterYear]);

  // Group by year
  const grouped = useMemo(() => {
    const map = {};
    filtered.forEach(p => {
      if (!map[p.year]) map[p.year] = [];
      map[p.year].push(p);
    });
    return Object.entries(map).sort(([a], [b]) => b - a);
  }, [filtered]);

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
          <option value="1">Unit 1</option>
          <option value="2">Unit 2</option>
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
