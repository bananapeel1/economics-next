"use client";
import { useState, useEffect, useCallback } from 'react';

/* ── Flashcard Card — Smart Flashcards Engine ── */
export default function FlashcardCard({ card, sectionTitle, cardNumber, totalCards, onRate, onSkip }) {
  const [flipped, setFlipped] = useState(false);

  // Reset flipped state when card changes
  useEffect(() => {
    setFlipped(false);
  }, [card]);

  const handleFlip = useCallback(() => {
    setFlipped(prev => !prev);
  }, []);

  const handleKnown = useCallback(() => {
    onRate({ known: true });
  }, [onRate]);

  const handleLearning = useCallback(() => {
    onRate({ known: false });
  }, [onRate]);

  // Keyboard support
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      // Space or Enter: flip card
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        setFlipped(prev => !prev);
        return;
      }

      // Only allow rating when flipped
      if (flipped) {
        // 1 or ArrowLeft: Still learning
        if (e.key === '1' || e.key === 'ArrowLeft') {
          e.preventDefault();
          onRate({ known: false });
          return;
        }
        // 2 or ArrowRight: Got it
        if (e.key === '2' || e.key === 'ArrowRight') {
          e.preventDefault();
          onRate({ known: true });
          return;
        }
      }

      // S: skip
      if (e.key === 's' || e.key === 'S') {
        e.preventDefault();
        onSkip();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [flipped, onRate, onSkip]);

  // Chain type detection: render front/back differently
  const isChain = card.type === 'chain';

  const renderFront = () => {
    if (isChain && card.front) {
      return (
        <div className="sfc-chain-front">
          <div className="sfc-card-content" dangerouslySetInnerHTML={{ __html: card.front }} />
        </div>
      );
    }
    return <div className="sfc-card-content" dangerouslySetInnerHTML={{ __html: card.front }} />;
  };

  const renderBack = () => {
    if (isChain && card.back) {
      return (
        <div className="sfc-chain-back">
          <div className="sfc-card-content" dangerouslySetInnerHTML={{ __html: card.back }} />
        </div>
      );
    }
    return <div className="sfc-card-content" dangerouslySetInnerHTML={{ __html: card.back }} />;
  };

  return (
    <div className="sfc-card-wrapper">
      <div className="sfc-card-top">
        <span className="sfc-card-badge">{sectionTitle}</span>
        <span className="sfc-card-counter">{cardNumber} / {totalCards}</span>
      </div>

      <div
        className={`sfc-card${flipped ? ' sfc-card--flipped' : ''}`}
        onClick={handleFlip}
        role="button"
        tabIndex={0}
        aria-label={flipped ? 'Showing answer. Click to show question.' : 'Showing question. Click to reveal answer.'}
      >
        <div className="sfc-card-inner">
          <div className="sfc-card-face sfc-card-front">
            <div className="sfc-card-label">QUESTION</div>
            {renderFront()}
            <div className="sfc-card-hint">Tap to reveal</div>
          </div>
          <div className="sfc-card-face sfc-card-back">
            <div className="sfc-card-label">ANSWER</div>
            {renderBack()}
          </div>
        </div>
      </div>

      {/* Rating buttons — only show after flip */}
      {flipped && (
        <div className="sfc-rate-row">
          <button className="sfc-rate-btn sfc-rate-learning" onClick={handleLearning}>
            <span className="sfc-rate-icon">&times;</span> Still learning
          </button>
          <button className="sfc-rate-btn sfc-rate-known" onClick={handleKnown}>
            <span className="sfc-rate-icon">&#10003;</span> Got it
          </button>
        </div>
      )}

      <button className="sfc-skip-btn" onClick={onSkip}>Skip</button>
    </div>
  );
}
