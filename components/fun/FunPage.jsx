"use client";
import { useState, useCallback } from 'react';
import { useAuth } from '../AuthProvider';
import SubjectSelect from './SubjectSelect';
import BlackjackGame from './BlackjackGame';
import QuizChallenge from './QuizChallenge';
import PlayerStats from './PlayerStats';
import LevelUpCelebration from './LevelUpCelebration';
import PaywallOverlay from '../PaywallOverlay';
import useBlackjack from './useBlackjack';
import useFunProgress from './useFunProgress';
import './fun.css';

const STATES = {
  SUBJECT_SELECT: 'subject_select',
  LOADING: 'loading',
  BLACKJACK: 'blackjack',
  QUIZ: 'quiz',
  LEVEL_UP: 'level_up',
  ROUND_RESULT: 'round_result',
};

export default function FunPage({ previewMode = false }) {
  const { user } = useAuth();
  const [gameState, setGameState] = useState(STATES.SUBJECT_SELECT);
  const [subject, setSubject] = useState(null);
  const [subjectId, setSubjectId] = useState(null);
  const [questionPool, setQuestionPool] = useState([]);
  const [usedIndices, setUsedIndices] = useState(new Set());
  const [currentQuestions, setCurrentQuestions] = useState([]);
  const [blackjackResult, setBlackjackResult] = useState(null);
  const [roundXp, setRoundXp] = useState(0);
  const [roundLevelUp, setRoundLevelUp] = useState(null);
  const [quizResult, setQuizResult] = useState(null);
  const [retryPool, setRetryPool] = useState([]);
  const [roundsPlayed, setRoundsPlayed] = useState(0);

  const blackjack = useBlackjack();
  const { progress, loading: progressLoading, processRound, xpForNext, xpIntoLevel, xpProgress } = useFunProgress(subjectId);

  const pickQuestions = useCallback((count) => {
    // Draw from retry pool first (questions previously answered wrong)
    const retryPicks = retryPool.slice(0, count);
    const remaining = count - retryPicks.length;

    // Remove used retry questions from the pool
    if (retryPicks.length > 0) {
      setRetryPool(prev => prev.slice(retryPicks.length));
    }

    let freshPicks = [];
    if (remaining > 0) {
      const available = questionPool
        .map((q, i) => ({ q, i }))
        .filter(({ i }) => !usedIndices.has(i));

      let source = available;
      if (available.length < remaining) {
        setUsedIndices(new Set());
        source = questionPool.map((q, i) => ({ q, i }));
      }

      const shuffled = [...source].sort(() => Math.random() - 0.5);
      const picked = shuffled.slice(0, remaining);
      setUsedIndices(prev => {
        const next = new Set(prev);
        picked.forEach(({ i }) => next.add(i));
        return next;
      });
      freshPicks = picked.map(({ q }) => q);
    }

    // Shuffle retry + fresh together so retries aren't always first
    return [...retryPicks, ...freshPicks].sort(() => Math.random() - 0.5);
  }, [questionPool, usedIndices, retryPool]);

  async function handleSubjectSelect(subj) {
    setSubject(subj);
    setGameState(STATES.LOADING);

    // Get subject ID
    try {
      const r = await fetch(`/api/fun/questions?subject=${subj}`);
      const data = await r.json();
      if (data?.questions) {
        setQuestionPool(data.questions);
      }
    } catch {}

    // Lookup subject ID for progress
    // Economics = 1, Business = 2 based on sort_order in seed
    // We'll use a simple lookup
    const id = subj === 'economics' ? 1 : 2;
    setSubjectId(id);

    // Start first hand after a brief moment
    setTimeout(() => {
      blackjack.startNewHand();
      setGameState(STATES.BLACKJACK);
    }, 300);
  }

  function handleBlackjackComplete() {
    const result = blackjack.result;
    setBlackjackResult(result);

    if (result === 'push') {
      if (previewMode) {
        // In preview, a push counts as a round — show result with paywall
        setRoundXp(0);
        setQuizResult(null);
        setRoundsPlayed(prev => prev + 1);
        setGameState(STATES.ROUND_RESULT);
        return;
      }
      // Push — award small XP, skip quiz, deal again
      const { xpEarned } = processRound('push', 0, 0);
      setRoundXp(xpEarned);
      blackjack.startNewHand();
      // Stay in blackjack state — just deal again
      return;
    }

    const isWin = result === 'win' || result === 'blackjack';
    const count = isWin ? 1 : 5;
    const questions = pickQuestions(count);
    setCurrentQuestions(questions);
    setGameState(STATES.QUIZ);
  }

  function handleQuizComplete({ correct, total, incorrectQuestions }) {
    setQuizResult({ correct, total });

    // Add incorrectly answered questions back to retry pool for future rounds
    if (incorrectQuestions && incorrectQuestions.length > 0) {
      setRetryPool(prev => [...prev, ...incorrectQuestions]);
    }

    const bjResult = blackjackResult;

    // Skip progress saving in preview mode
    if (previewMode) {
      setRoundXp(0);
      setRoundsPlayed(prev => prev + 1);
      setGameState(STATES.ROUND_RESULT);
      return;
    }

    const { leveled, xpEarned, newLevel } = processRound(bjResult, correct, total);
    setRoundXp(xpEarned);
    setRoundsPlayed(prev => prev + 1);

    if (leveled) {
      setRoundLevelUp(newLevel);
      setGameState(STATES.LEVEL_UP);
    } else {
      setGameState(STATES.ROUND_RESULT);
    }
  }

  function handleLevelUpDismiss() {
    setGameState(STATES.ROUND_RESULT);
  }

  function handleNextRound() {
    setBlackjackResult(null);
    setQuizResult(null);
    setRoundXp(0);
    setRoundLevelUp(null);
    blackjack.startNewHand();
    setGameState(STATES.BLACKJACK);
  }

  function handleChangeSubject() {
    setSubject(null);
    setSubjectId(null);
    setQuestionPool([]);
    setUsedIndices(new Set());
    setRetryPool([]);
    setGameState(STATES.SUBJECT_SELECT);
  }

  if (gameState === STATES.SUBJECT_SELECT) {
    return <SubjectSelect onSelect={handleSubjectSelect} />;
  }

  if (gameState === STATES.LOADING || progressLoading) {
    return (
      <div className="fun-loading">
        <div className="fun-loading-spinner" />
        <p>Shuffling the deck...</p>
      </div>
    );
  }

  return (
    <div className="fun-container">
      {!previewMode && (
        <PlayerStats
          progress={progress}
          subject={subject}
          xpForNext={xpForNext}
          xpIntoLevel={xpIntoLevel}
          xpProgress={xpProgress}
        />
      )}

      {gameState === STATES.BLACKJACK && (
        <BlackjackGame
          {...blackjack}
          onHit={blackjack.hit}
          onStand={blackjack.stand}
          onContinue={handleBlackjackComplete}
        />
      )}

      {gameState === STATES.QUIZ && (
        <div className="fun-quiz-container">
          <div className="fun-quiz-context">
            {(blackjackResult === 'win' || blackjackResult === 'blackjack')
              ? 'You won! Answer correctly to level up.'
              : 'You lost. Answer these questions to earn XP back.'}
          </div>
          <QuizChallenge questions={currentQuestions} onComplete={handleQuizComplete} />
        </div>
      )}

      {gameState === STATES.LEVEL_UP && (
        <LevelUpCelebration
          level={roundLevelUp}
          subject={subject}
          xpEarned={roundXp}
          onContinue={handleLevelUpDismiss}
        />
      )}

      {gameState === STATES.ROUND_RESULT && (
        <div className="fun-round-result">
          <div className="fun-round-card">
            <h3 className="fun-round-heading">Round Complete</h3>
            {quizResult && (
              <div className="fun-round-quiz-score">
                Quiz: {quizResult.correct}/{quizResult.total} correct
              </div>
            )}
            {!previewMode && <div className="fun-round-xp">+{roundXp} XP</div>}

            {previewMode && roundsPlayed >= 1 ? (
              <PaywallOverlay feature="Blackjack" inline />
            ) : (
              <div className="fun-round-actions">
                <button className="fun-btn fun-btn-hit" onClick={handleNextRound}>
                  Next Round
                </button>
                <button className="fun-btn fun-btn-stand" onClick={handleChangeSubject}>
                  Change Subject
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
