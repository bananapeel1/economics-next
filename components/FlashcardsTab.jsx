"use client";
import { useState, useEffect, useRef, useCallback } from 'react';
import { useAuth } from './AuthProvider';

export default function FlashcardsTab({ cards, sectionId }) {
  const { user } = useAuth();
  const storageKey = `flashcards-${sectionId}`;
  const [statuses, setStatuses] = useState(() => {
    if (typeof window === 'undefined') return {};
    try {
      const saved = localStorage.getItem(storageKey);
      return saved ? JSON.parse(saved) : {};
    } catch { return {}; }
  });
  const syncTimer = useRef(null);

  // Deck = indices of cards to review this round
  const [deck, setDeck] = useState([]);
  const [deckPos, setDeckPos] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [round, setRound] = useState(1);
  const [roundSummary, setRoundSummary] = useState(null); // { correct, incorrect, total }
  const [allComplete, setAllComplete] = useState(false);

  // Build initial deck when cards or section changes
  const buildDeck = useCallback((currentStatuses) => {
    if (!cards || !cards.length) return;
    const allGreen = cards.every((_, i) => currentStatuses[i] === 'got-it');
    if (allGreen) {
      setAllComplete(true);
      setRoundSummary(null);
      return;
    }
    setAllComplete(false);
    setRoundSummary(null);
    // First round: all cards. Later rounds: only non-mastered
    const indices = cards.map((_, i) => i).filter(i => currentStatuses[i] !== 'got-it');
    setDeck(indices.length > 0 ? indices : cards.map((_, i) => i));
    setDeckPos(0);
    setFlipped(false);
  }, [cards]);

  // Load statuses on section change
  useEffect(() => {
    setFlipped(false);
    setRound(1);
    setRoundSummary(null);
    setAllComplete(false);

    // Load from localStorage first (instant)
    let localStatuses = {};
    try {
      const saved = localStorage.getItem(storageKey);
      localStatuses = saved ? JSON.parse(saved) : {};
    } catch { /* ignore */ }
    setStatuses(localStatuses);
    buildDeck(localStatuses);

    // If logged in, fetch from database
    if (user) {
      fetch(`/api/progress/flashcards?sectionId=${sectionId}`)
        .then(res => res.ok ? res.json() : null)
        .then(data => {
          if (!data) return;
          const dbStatuses = data.statuses || {};

          if (Object.keys(dbStatuses).length > 0) {
            setStatuses(dbStatuses);
            localStorage.setItem(storageKey, JSON.stringify(dbStatuses));
            buildDeck(dbStatuses);
          } else if (Object.keys(localStatuses).length > 0) {
            fetch('/api/progress/flashcards', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ sectionId, statuses: localStatuses }),
            }).catch(() => {});
          }
        })
        .catch(() => {});
    }
  }, [sectionId, user, storageKey, buildDeck]);

  // Save to localStorage on every change
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(statuses));
  }, [statuses, storageKey]);

  // Debounced sync to database when logged in
  function syncToDatabase(newStatuses) {
    if (!user) return;
    if (syncTimer.current) clearTimeout(syncTimer.current);
    syncTimer.current = setTimeout(() => {
      fetch('/api/progress/flashcards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sectionId, statuses: newStatuses }),
      }).catch(() => {});
    }, 1000);
  }

  if (!cards || !cards.length) {
    return <div style={{ color: 'var(--text-muted)', textAlign: 'center', padding: 40 }}>No flashcards available.</div>;
  }

  if (!deck.length) {
    return <div style={{ color: 'var(--text-muted)', textAlign: 'center', padding: 40 }}>Loading flashcards...</div>;
  }

  const gotItCount = Object.values(statuses).filter(s => s === 'got-it').length;
  const progress = (gotItCount / cards.length) * 100;

  function markCard(status) {
    const cardIndex = deck[deckPos];
    const newStatuses = { ...statuses, [cardIndex]: status };
    setStatuses(newStatuses);
    syncToDatabase(newStatuses);

    // If this was the last card in the deck, end the round
    if (deckPos >= deck.length - 1) {
      const correctThisRound = deck.filter(i => newStatuses[i] === 'got-it').length;
      const incorrectThisRound = deck.length - correctThisRound;

      if (incorrectThisRound === 0) {
        // All mastered!
        setAllComplete(true);
      } else {
        // Show round summary
        setRoundSummary({
          correct: correctThisRound,
          incorrect: incorrectThisRound,
          total: deck.length,
        });
      }
    } else {
      setDeckPos(deckPos + 1);
      setFlipped(false);
    }
  }

  function startNextRound() {
    const remaining = cards.map((_, i) => i).filter(i => statuses[i] !== 'got-it');
    setDeck(remaining);
    setDeckPos(0);
    setFlipped(false);
    setRound(round + 1);
    setRoundSummary(null);
  }

  function resetAll() {
    const cleared = {};
    setStatuses(cleared);
    syncToDatabase(cleared);
    setRound(1);
    setAllComplete(false);
    setRoundSummary(null);
    setDeck(cards.map((_, i) => i));
    setDeckPos(0);
    setFlipped(false);
  }

  function goTo(pos) {
    if (pos >= 0 && pos < deck.length) {
      setDeckPos(pos);
      setFlipped(false);
    }
  }

  // All complete celebration
  if (allComplete) {
    return (
      <div className="flashcard-container">
        <div className="flashcard-complete">
          <div className="flashcard-complete-icon">🎉</div>
          <h2 className="flashcard-complete-title">All Cards Mastered!</h2>
          <p className="flashcard-complete-text">
            You've correctly answered all {cards.length} flashcards.
            {round > 1 && ` It took ${round} round${round > 1 ? 's' : ''} to master them all.`}
          </p>
          <div className="flashcard-progress" style={{ width: '100%', maxWidth: 400 }}>
            <div className="flashcard-progress-bar-bg">
              <div className="flashcard-progress-bar" style={{ width: '100%' }} />
            </div>
            <div className="flashcard-progress-text">{cards.length} of {cards.length} mastered</div>
          </div>
          <button className="flashcard-btn restart" onClick={resetAll}>
            ↻ Start Over
          </button>
        </div>
      </div>
    );
  }

  // Round summary screen
  if (roundSummary) {
    return (
      <div className="flashcard-container">
        <div className="flashcard-round-summary">
          <h2 className="flashcard-round-title">Round {round} Complete</h2>
          <div className="flashcard-round-stats">
            <div className="flashcard-round-stat correct">
              <span className="flashcard-round-stat-num">{roundSummary.correct}</span>
              <span className="flashcard-round-stat-label">Mastered</span>
            </div>
            <div className="flashcard-round-stat incorrect">
              <span className="flashcard-round-stat-num">{roundSummary.incorrect}</span>
              <span className="flashcard-round-stat-label">To review</span>
            </div>
          </div>
          <div className="flashcard-progress" style={{ width: '100%', maxWidth: 400 }}>
            <div className="flashcard-progress-bar-bg">
              <div className="flashcard-progress-bar" style={{ width: `${progress}%` }} />
            </div>
            <div className="flashcard-progress-text">{gotItCount} of {cards.length} mastered overall</div>
          </div>
          <p className="flashcard-round-info">
            {roundSummary.incorrect} card{roundSummary.incorrect !== 1 ? 's' : ''} will be shown again in the next round.
          </p>
          <button className="flashcard-btn got-it" onClick={startNextRound}>
            Continue → Round {round + 1}
          </button>
        </div>
      </div>
    );
  }

  // Normal card view
  const cardIndex = deck[deckPos];
  const card = cards[cardIndex];

  return (
    <div className="flashcard-container">
      <div className="flashcard-progress">
        <div className="flashcard-progress-bar-bg">
          <div className="flashcard-progress-bar" style={{ width: `${progress}%` }} />
        </div>
        <div className="flashcard-progress-text">
          {gotItCount} of {cards.length} mastered
          {round > 1 && <span className="flashcard-round-badge">Round {round}</span>}
        </div>
      </div>

      <div className="flashcard" onClick={() => setFlipped(!flipped)}>
        <div className={`flashcard-inner ${flipped ? 'flipped' : ''}`}>
          <div className="flashcard-front">
            <div className="flashcard-label">
              Card {deckPos + 1} of {deck.length}
              {round > 1 && <span style={{ opacity: 0.6 }}> · Review</span>}
            </div>
            <div className="flashcard-question">{card.front}</div>
            <div style={{ fontSize: 12, color: 'var(--text-dim)', marginTop: 16 }}>Click to reveal answer</div>
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
        <button className="flashcard-nav-btn" disabled={deckPos === 0} onClick={() => goTo(deckPos - 1)}>&larr;</button>
        <div className="flashcard-dots">
          {deck.map((cardIdx, pos) => (
            <div
              key={cardIdx}
              className={`flashcard-dot ${pos === deckPos ? 'active' : ''} ${statuses[cardIdx] || ''}`}
              onClick={() => goTo(pos)}
            />
          ))}
        </div>
        <button className="flashcard-nav-btn" disabled={deckPos === deck.length - 1} onClick={() => goTo(deckPos + 1)}>&rarr;</button>
      </div>
    </div>
  );
}
