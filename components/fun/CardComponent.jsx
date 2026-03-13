"use client";

const SUIT_SYMBOLS = {
  hearts: '\u2665',
  diamonds: '\u2666',
  clubs: '\u2663',
  spades: '\u2660',
};

export default function CardComponent({ card, hidden, delay = 0 }) {
  if (hidden) {
    return (
      <div className="fun-card fun-card-back fun-card-deal" style={{ animationDelay: `${delay}ms` }}>
        <div className="fun-card-back-pattern" />
      </div>
    );
  }

  const isRed = card.suit === 'hearts' || card.suit === 'diamonds';
  const symbol = SUIT_SYMBOLS[card.suit];

  return (
    <div
      className={`fun-card ${isRed ? 'red' : 'black'} fun-card-deal`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <span className="fun-card-corner top">{card.rank}{symbol}</span>
      <span className="fun-card-center">{symbol}</span>
      <span className="fun-card-corner bottom">{card.rank}{symbol}</span>
    </div>
  );
}
