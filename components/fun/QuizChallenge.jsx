"use client";
import { useState } from 'react';

export default function QuizChallenge({ questions, onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  const q = questions[currentIndex];
  const isCorrect = selectedAnswer === q.correctIndex;
  const isLast = currentIndex === questions.length - 1;

  function handleSelect(optIndex) {
    if (submitted) return;
    setSelectedAnswer(optIndex);
  }

  function handleSubmit() {
    if (selectedAnswer === null) return;
    setSubmitted(true);
    if (isCorrect) setCorrectCount(c => c + 1);
  }

  function handleNext() {
    setCurrentIndex(i => i + 1);
    setSelectedAnswer(null);
    setSubmitted(false);
  }

  function handleFinish() {
    onComplete({ correct: correctCount, total: questions.length });
  }

  return (
    <div className="fun-quiz">
      <div className="fun-quiz-header">
        <span className="fun-quiz-progress">Question {currentIndex + 1} of {questions.length}</span>
      </div>

      <div className="quiz-question">
        <div className="quiz-question-text">{q.question}</div>
        <div className="quiz-options">
          {q.options.map((opt, i) => {
            let className = 'quiz-option';
            if (submitted) {
              if (i === q.correctIndex) className += ' correct';
              else if (selectedAnswer === i) className += ' incorrect';
            } else if (selectedAnswer === i) {
              className += ' selected';
            }
            return (
              <button key={i} className={className} onClick={() => handleSelect(i)}>
                <div className="quiz-option-radio" />
                <span>{opt}</span>
              </button>
            );
          })}
        </div>

        {submitted && q.explanation && (
          <div className="quiz-explanation">{q.explanation}</div>
        )}
      </div>

      <div className="fun-quiz-actions">
        {!submitted ? (
          <button
            className="fun-btn fun-btn-hit"
            disabled={selectedAnswer === null}
            onClick={handleSubmit}
          >
            Check Answer
          </button>
        ) : isLast ? (
          <button className="fun-btn fun-btn-hit" onClick={handleFinish}>
            See Results
          </button>
        ) : (
          <button className="fun-btn fun-btn-hit" onClick={handleNext}>
            Next Question
          </button>
        )}
      </div>
    </div>
  );
}
