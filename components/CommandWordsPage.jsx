"use client";
import { useState } from 'react';

export default function CommandWordsPage({ words }) {
  const [search, setSearch] = useState('');

  const filtered = words.filter(w =>
    w.word.toLowerCase().includes(search.toLowerCase()) ||
    w.definition.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <input
        className="resource-search"
        type="text"
        placeholder="Search command words..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      {filtered.length === 0 ? (
        <div className="resource-empty">No command words found matching &quot;{search}&quot;</div>
      ) : (
        <div className="command-words-list">
          {filtered.map(word => (
            <div className="command-word-card" key={word.id}>
              <div className="command-word-name">{word.word}</div>
              <div className="command-word-definition">{word.definition}</div>
              <div className="command-word-section">
                <span className="command-word-section-label">What examiners expect</span>
                <p className="command-word-section-text">{word.examiner_expects}</p>
              </div>
              {word.example && (
                <div className="command-word-section">
                  <span className="command-word-section-label">Example</span>
                  <p className="command-word-section-text">{word.example}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
