"use client";
import { useState, useRef } from 'react';

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export default function GlossaryPage({ terms, subjects = [] }) {
  const [search, setSearch] = useState('');
  const [activeSubjectId, setActiveSubjectId] = useState('all');
  const groupRefs = useRef({});

  const filtered = terms.filter(t => {
    if (activeSubjectId !== 'all' && t.subject_id !== parseInt(activeSubjectId)) return false;
    if (search) {
      const q = search.toLowerCase();
      return t.term.toLowerCase().includes(q) || t.definition.toLowerCase().includes(q);
    }
    return true;
  });

  // Group by first letter
  const groups = {};
  filtered.forEach(term => {
    const letter = term.term[0]?.toUpperCase() || '#';
    if (!groups[letter]) groups[letter] = [];
    groups[letter].push(term);
  });

  function scrollToLetter(letter) {
    const el = groupRefs.current[letter];
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  const activeLetters = new Set(Object.keys(groups));

  return (
    <div>
      {/* Subject toggle */}
      {subjects.length > 1 && (
        <div className="resource-subject-toggle">
          <button
            className={`resource-subject-btn ${activeSubjectId === 'all' ? 'active' : ''}`}
            onClick={() => setActiveSubjectId('all')}
          >
            All Subjects
          </button>
          {subjects.map(s => (
            <button
              key={s.id}
              className={`resource-subject-btn ${activeSubjectId === String(s.id) ? 'active' : ''}`}
              onClick={() => setActiveSubjectId(String(s.id))}
            >
              {s.name}
            </button>
          ))}
        </div>
      )}

      <input
        className="resource-search"
        type="text"
        placeholder="Search terms..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      {/* Letter bar */}
      {!search && (
        <div className="glossary-letter-bar">
          {LETTERS.map(letter => (
            <button
              key={letter}
              className={`glossary-letter-btn ${activeLetters.has(letter) ? 'active' : ''}`}
              onClick={() => scrollToLetter(letter)}
              disabled={!activeLetters.has(letter)}
            >
              {letter}
            </button>
          ))}
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="resource-empty">No terms found{search ? ` matching "${search}"` : ' for this subject'}.</div>
      ) : (
        <div className="glossary-list">
          {LETTERS.filter(l => groups[l]).map(letter => (
            <div key={letter} className="glossary-group" ref={el => groupRefs.current[letter] = el}>
              <div className="glossary-group-letter">{letter}</div>
              {groups[letter].map(term => (
                <div className="glossary-term" key={term.id}>
                  <span className="glossary-term-name">{term.term}</span>
                  <span className="glossary-term-definition">{term.definition}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
