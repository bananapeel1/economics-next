"use client";
import { useState } from 'react';

/**
 * Active recall checkpoint shown at the top of each step (when currentStep > 0).
 * Tests recall of the previous step's key concept.
 * Student types what they remember → reveals model answer → self-rates.
 */
export default function RecallCheckpoint({ previousBlock }) {
  const [phase, setPhase] = useState('prompt'); // 'prompt' | 'reveal' | 'rated'
  const [text, setText] = useState('');
  const [rating, setRating] = useState(null);
  const [dismissed, setDismissed] = useState(false);
  const [dismissing, setDismissing] = useState(false);

  if (dismissed) return null;

  // Extract prompt and model answer from previous block (supports both formats)
  const concept = previousBlock?.concepts?.[0];
  const section = previousBlock?.sections?.[0];
  if (!concept && !section) return null;

  const prompt = concept?.title || section?.title;
  const modelAnswer = concept?.points?.[0] || concept?.text || section?.keyIdea || '';
  // Strip HTML tags and markdown for clean display
  const cleanAnswer = modelAnswer.replace(/<[^>]+>/g, '').replace(/\*\*/g, '');

  function handleReveal() {
    setPhase('reveal');
  }

  function handleRate(level) {
    setRating(level);
    setPhase('rated');
    // Show feedback, then animate out, then remove
    setTimeout(() => setDismissing(true), 1200);
    setTimeout(() => setDismissed(true), 1200 + 350);
  }

  function handleSkip() {
    setDismissing(true);
    setTimeout(() => setDismissed(true), 350);
  }

  return (
    <div className={`lm-recall-checkpoint ${dismissing ? 'lm-recall-dismissing' : ''}`}>
      <div className="lm-recall-header">
        <span className="lm-recall-icon">&#129504;</span>
        <span className="lm-recall-title">Quick recall</span>
        <button className="lm-recall-dismiss" onClick={handleSkip}>&times;</button>
      </div>

      <p className="lm-recall-prompt">
        What do you remember about <strong>{prompt}</strong>?
      </p>

      {phase === 'prompt' && (
        <>
          <textarea
            className="lm-recall-textarea"
            placeholder="Type what you remember..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={3}
          />
          <div className="lm-recall-actions">
            <button
              className="lm-recall-reveal-btn"
              onClick={handleReveal}
              disabled={text.trim().length < 3}
            >
              Check answer
            </button>
            <button className="lm-recall-skip-btn" onClick={handleSkip}>
              Skip
            </button>
          </div>
        </>
      )}

      {phase === 'reveal' && (
        <>
          <div className="lm-recall-model-answer">
            <div className="lm-recall-model-label">Key point:</div>
            <p>{cleanAnswer}</p>
          </div>
          <div className="lm-recall-rating">
            <span className="lm-recall-rating-prompt">How did you do?</span>
            <div className="lm-recall-rating-buttons">
              <button className="lm-recall-rate-btn lm-rate-got-it" onClick={() => handleRate('got-it')}>
                Got it
              </button>
              <button className="lm-recall-rate-btn lm-rate-partial" onClick={() => handleRate('partial')}>
                Partially
              </button>
              <button className="lm-recall-rate-btn lm-rate-missed" onClick={() => handleRate('missed')}>
                Missed it
              </button>
            </div>
          </div>
        </>
      )}

      {phase === 'rated' && (
        <div className="lm-recall-feedback">
          {rating === 'got-it' && 'Nice recall! Your memory is strengthening.'}
          {rating === 'partial' && 'Good effort \u2014 re-reading will help cement it.'}
          {rating === 'missed' && 'That\'s okay \u2014 this is exactly how you build long-term memory.'}
        </div>
      )}
    </div>
  );
}
