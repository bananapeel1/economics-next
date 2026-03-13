"use client";
import CardComponent from './CardComponent';

export default function BlackjackGame({ playerHand, dealerHand, dealerHidden, phase, result, playerScore, dealerScore, onHit, onStand, onContinue }) {
  const resultMessages = {
    win: 'You Win!',
    blackjack: 'Blackjack!',
    lose: 'Dealer Wins',
    push: 'Push — Tie!',
  };

  const resultClass = {
    win: 'fun-result-win',
    blackjack: 'fun-result-win',
    lose: 'fun-result-lose',
    push: 'fun-result-push',
  };

  return (
    <div className="fun-table">
      {/* Dealer */}
      <div className="fun-hand-section">
        <div className="fun-hand-label">
          Dealer {phase === 'resolved' ? `(${dealerScore})` : dealerHidden ? '' : `(${dealerScore})`}
        </div>
        <div className="fun-hand">
          {dealerHand.map((card, i) => (
            <CardComponent
              key={i}
              card={card}
              hidden={dealerHidden && i === 1}
              delay={i < 2 ? i * 150 : 0}
              isHit={i >= 2}
            />
          ))}
        </div>
      </div>

      {/* Result */}
      {phase === 'resolved' && result && (
        <div className={`fun-result ${resultClass[result]}`}>
          <span className="fun-result-text">{resultMessages[result]}</span>
          <button className="fun-btn fun-btn-continue" onClick={onContinue}>
            {result === 'push' ? 'Deal Again' : 'Continue'}
          </button>
        </div>
      )}

      {/* Divider */}
      {phase !== 'resolved' && <div className="fun-table-divider" />}

      {/* Player */}
      <div className="fun-hand-section">
        <div className="fun-hand-label">You ({playerScore})</div>
        <div className="fun-hand">
          {playerHand.map((card, i) => (
            <CardComponent key={i} card={card} delay={i < 2 ? i * 150 + 350 : 0} isHit={i >= 2} />
          ))}
        </div>
      </div>

      {/* Actions */}
      {phase === 'player_turn' && (
        <div className="fun-actions">
          <button className="fun-btn fun-btn-hit" onClick={onHit}>Hit</button>
          <button className="fun-btn fun-btn-stand" onClick={onStand}>Stand</button>
        </div>
      )}
    </div>
  );
}
