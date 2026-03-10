"use client";
import { useState, useEffect } from 'react';

export default function FlashcardsTab({ cards, sectionId }) {
  const storageKey = `flashcards-${sectionId}`;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [statuses, setStatuses] = useState(() => {
    if (typeof window === 'undefined') return {};
    try {
      const saved = localStorage.getItem(storageKey);
      return saved ? JSON.parse(saved) : {};
    } catch { return {}; }
  });

  useEffect(() => {
    setCurrentIndex(0);
    setFlipped(false);
    try {
      const saved = localStorage.getItem(storageKey);
      setStatuses(saved ? JSON.parse(saved) : {});
    } catch { setStatuses({}); }
  }, [sectionId]);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(statuses));
  }, [statuses, storageKey]);

  if (!cards || !cards.length) {
    return <div style={{ color: '#6b7a99', textAlign: 'center', padding: 40 }}>No flashcards available.</div>;
  }

  const gotItCount = Object.values(statuses).filter(s => s === 'got-it').length;
  const progress = (gotItCount / cards.length) * 100;
  const card = cards[currentIndex];

  function markCard(status) {
    setStatuses(prev => ({ ...prev, [currentIndex]: status }));
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setFlipped(false);
    }
  }

  function goTo(index) {
    setCurrentIndex(index);
    setFlipped(false);
  }

  return (
    <div className="flashcard-container">
      <div className="flashcard-progress">
        <div className="flashcard-progress-bar-bg">
          <div className="flashcard-progress-bar" style={{ width: `${progress}%` }} />
        </div>
        <div className="flashcard-progress-text">
          {gotItCount} of {cards.length} mastered
        </div>
      </div>

      <div className="flashcard" onClick={() => setFlipped(!flipped)}>
        <div className={`flashcard-inner ${flipped ? 'flipped' : ''}`}>
          <div className="flashcard-front">
            <div className="flashcard-label">Question {currentIndex + 1} of {cards.length}</div>
            <div className="flashcard-question">{card.front}</div>
            <div style={{ fontSize: 12, color: '#4a5568', marginTop: 16 }}>Click to reveal answer</div>
          </div>
          <div className="flashcard-back">
            <div className="flashcard-label">Answer</div>
            <div className="flashcard-answer" dangerouslySetInnerHTML={{ __html: card.back }} />
          </div>
        </div>
      </div>

      <div className="flashcard-actions">
        <button className="flashcard-btn got-it" onClick={(e) => { e.stopPropagation(); markCard('got-it'); }}>
          &#10003; Got it
        </button>
        <button className="flashcard-btn learning" onClick={(e) => { e.stopPropagation(); markCard('learning'); }}>
          &#8635; Still learning
        </button>
      </div>

      <div className="flashcard-nav">
        <button className="flashcard-nav-btn" disabled={currentIndex === 0} onClick={() => goTo(currentIndex - 1)}>&larr;</button>
        <div className="flashcard-dots">
          {cards.map((_, i) => (
            <div
              key={i}
              className={`flashcard-dot ${i === currentIndex ? 'active' : ''} ${statuses[i] || ''}`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
        <button className="flashcard-nav-btn" disabled={currentIndex === cards.length - 1} onClick={() => goTo(currentIndex + 1)}>&rarr;</button>
      </div>
    </div>
  );
}
