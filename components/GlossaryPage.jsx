"use client";
import { useState, useRef } from 'react';

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export default function GlossaryPage({ terms }) {
  const [search, setSearch] = useState('');
  const groupRefs = useRef({});

  const filtered = terms.filter(t =>
    t.term.toLowerCase().includes(search.toLowerCase()) ||
    t.definition.toLowerCase().includes(search.toLowerCase())
  );

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
        <div className="resource-empty">No terms found matching &quot;{search}&quot;</div>
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
