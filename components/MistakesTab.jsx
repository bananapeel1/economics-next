"use client";
import { useState, useEffect } from 'react';
import { readAnswerLog } from '@/lib/answer-log';

/**
 * Two kinds of mistake, in the order a student cares about them.
 *
 * F017. This tab only ever showed `common_mistakes` — mistakes *other* students make, written by
 * an author. A student's own wrong answers went nowhere: the finding's words were "the wrong
 * answer vanishes from the system". Their own are now shown first, because a mistake you actually
 * made outranks a mistake somebody might make.
 *
 * Read from the local answer log rather than a table. There is no table for per-question history
 * and no way to create one from code, so this follows the browser rather than the student. That
 * limit is real and is stated in the tab, rather than being left for them to discover when they
 * change device.
 */
function YourMistakes({ subjectId, sectionId, quizData }) {
  const [missed, setMissed] = useState([]);

  // In an effect: localStorage does not exist during the server render.
  useEffect(() => {
    const log = readAnswerLog(subjectId, sectionId).filter((e) => e.correct === false);
    if (!log.length) { setMissed([]); return; }
    const byKey = new Map(
      (quizData || []).map((q) => [String(q.question || '').replace(/\s+/g, ' ').trim().slice(0, 160), q]),
    );
    setMissed(
      log
        .map((e) => ({ entry: e, question: byKey.get(e.q) }))
        .filter((x) => x.question)
        .sort((a, b) => b.entry.ts - a.entry.ts),
    );
  }, [subjectId, sectionId, quizData]);

  if (!missed.length) return null;

  const confidenceLabel = {
    certain: 'you were certain',
    somewhat: 'you were fairly sure',
    guessed: 'you guessed',
  };

  return (
    <div className="mistakes-own">
      <h3 className="mistakes-own-title">
        What you got wrong here
        <span className="mistakes-own-count">{missed.length}</span>
      </h3>
      <p className="mistakes-own-sub">
        Saved on this device only, so it will not follow you to another browser.
      </p>
      {missed.map(({ entry, question }, i) => (
        <div className="mistake-card mistake-card-own" key={i}>
          <div className="mistake-own-q">{question.question}</div>
          <div className="mistake-own-answer">
            <strong>Answer:</strong> {question.options?.[question.correctIndex]}
          </div>
          {question.explanation && <div className="mistake-own-why">{question.explanation}</div>}
          {entry.confidence && (
            <div className="mistake-own-meta">
              {confidenceLabel[entry.confidence] || entry.confidence}
              {entry.confidence === 'certain' ? ' \u2014 worth a second look, because a confident wrong answer is a belief rather than a slip' : ''}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default function MistakesTab({ data, subjectId, sectionId, quizData }) {
  const hasAuthored = data && data.length > 0;

  return (
    <div className="mistakes-container">
      <YourMistakes subjectId={subjectId} sectionId={sectionId} quizData={quizData} />
      {hasAuthored ? (
        <>
          <div className="mistakes-intro">
            Avoid these common mistakes that students frequently make in exams.
          </div>
      {data.map((item, i) => (
        <div className="mistake-card" key={i}>
          <div className="mistake-card-title">{item.title}</div>

          <div className="mistake-wrong">
            <div className="mistake-label mistake-wrong-label">✗ Common Mistake</div>
            <div className="mistake-text">{item.mistake}</div>
          </div>

          <div className="mistake-correct">
            <div className="mistake-label mistake-correct-label">✓ Correct Approach</div>
            <div className="mistake-text">{item.correction}</div>
          </div>

          {item.examTip && (
            <div className="exam-tip">
              <strong>💡 Exam Tip:</strong> {item.examTip}
            </div>
          )}
        </div>
      ))}
        </>
      ) : (
        <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)' }}>
          <div style={{ fontSize: 14 }}>No common mistakes have been written for this section yet.</div>
        </div>
      )}
    </div>
  );
}
