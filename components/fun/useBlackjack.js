import { useState, useCallback } from 'react';

const SUITS = ['hearts', 'diamonds', 'clubs', 'spades'];
const RANKS = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

function createDeck() {
  const deck = [];
  for (const suit of SUITS) {
    for (const rank of RANKS) {
      deck.push({ suit, rank });
    }
  }
  // Fisher-Yates shuffle
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

function cardValue(rank) {
  if (rank === 'A') return 11;
  if (['J', 'Q', 'K'].includes(rank)) return 10;
  return parseInt(rank);
}

function calculateScore(hand) {
  let total = 0;
  let aces = 0;
  for (const card of hand) {
    total += cardValue(card.rank);
    if (card.rank === 'A') aces++;
  }
  while (total > 21 && aces > 0) {
    total -= 10;
    aces--;
  }
  return total;
}

export default function useBlackjack() {
  const [deck, setDeck] = useState([]);
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);
  const [dealerHidden, setDealerHidden] = useState(true);
  const [phase, setPhase] = useState('idle'); // idle | player_turn | dealer_turn | resolved
  const [result, setResult] = useState(null); // win | lose | push | blackjack

  const playerScore = calculateScore(playerHand);
  const dealerScore = dealerHidden
    ? cardValue(dealerHand[0]?.rank || 'A')
    : calculateScore(dealerHand);
  const dealerFullScore = calculateScore(dealerHand);

  const startNewHand = useCallback(() => {
    const newDeck = createDeck();
    const pHand = [newDeck.pop(), newDeck.pop()];
    const dHand = [newDeck.pop(), newDeck.pop()];
    setDeck(newDeck);
    setPlayerHand(pHand);
    setDealerHand(dHand);
    setDealerHidden(true);
    setResult(null);

    // Check for natural blackjack
    if (calculateScore(pHand) === 21) {
      setDealerHidden(false);
      if (calculateScore(dHand) === 21) {
        setPhase('resolved');
        setResult('push');
      } else {
        setPhase('resolved');
        setResult('blackjack');
      }
    } else {
      setPhase('player_turn');
    }
  }, []);

  const hit = useCallback(() => {
    if (phase !== 'player_turn') return;
    setDeck(prev => {
      const newDeck = [...prev];
      const card = newDeck.pop();
      setPlayerHand(ph => {
        const newHand = [...ph, card];
        if (calculateScore(newHand) > 21) {
          // Bust
          setDealerHidden(false);
          setPhase('resolved');
          setResult('lose');
        }
        return newHand;
      });
      return newDeck;
    });
  }, [phase]);

  const stand = useCallback(() => {
    if (phase !== 'player_turn') return;
    setDealerHidden(false);
    setPhase('dealer_turn');

    // Dealer draws — we do it all at once for simplicity
    setDeck(prev => {
      const newDeck = [...prev];
      setDealerHand(dh => {
        const newHand = [...dh];
        while (calculateScore(newHand) < 17) {
          newHand.push(newDeck.pop());
        }
        const dScore = calculateScore(newHand);
        const pScore = calculateScore(playerHand);

        if (dScore > 21 || pScore > dScore) {
          setResult('win');
        } else if (dScore > pScore) {
          setResult('lose');
        } else {
          setResult('push');
        }
        setPhase('resolved');
        return newHand;
      });
      return newDeck;
    });
  }, [phase, playerHand]);

  return {
    playerHand,
    dealerHand,
    dealerHidden,
    phase,
    result,
    playerScore,
    dealerScore: dealerHidden ? dealerScore : dealerFullScore,
    startNewHand,
    hit,
    stand,
  };
}
