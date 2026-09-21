'use client';

/**
 * Quick Check — the section's MCQs, marked in the browser on click.
 *
 * Packet 12.2, E010. Deliberately small: no timer, no streak, no persistence. The lab page is a
 * question-first page and this is the cheapest question a student can answer.
 *
 * THE ANSWER KEY IS IN THE PAYLOAD, AND SAYING SO IS THE POINT. `answer` below is the index of the
 * correct option and it reaches the browser with the question. Packet 12's F086 flagged exactly
 * this field — `section_quiz.correctIndex` — leaking on the unauthenticated
 * `/api/practice/questions` route, and the settled decision of 2026-09-12 is that the quiz bank is
 * deliberately paid, so the leak there is a real defect rather than untidiness.
 *
 * It is not obfuscated here, for three reasons, and `audit/runs/packet-12.2/built.md` carries the
 * same argument in full:
 *   1. Marking in the browser means the key is in the browser. A hash, a rotated index or a
 *      per-option digest is recovered by hashing the four visible options, so it buys nothing and
 *      costs the reader the ability to see what the page is doing. A page whose argument is honesty
 *      cannot ship security theatre.
 *   2. The real fix for F086 is server-side marking on the route that serves the paid bank to
 *      anonymous users. That route is untouched by this packet and the defect there is unchanged.
 *   3. What IS done instead is to reduce the quantity: the page ships a small sample of the
 *      section's bank, not all 25, and says how many it is showing out of how many exist.
 */

import { useState } from 'react';

export default function LabQuickCheck({ questions, bankSize }) {
  const [chosen, setChosen] = useState(() => questions.map(() => null));

  const answered = chosen.filter((c) => c !== null).length;
  const right = chosen.filter((c, i) => c !== null && c === questions[i].answer).length;

  return (
    <section className="lab-block" aria-labelledby="lab-quick-check">
      <div className="lab-block-head">
        <h2 id="lab-quick-check">Quick Check</h2>
        {/* One expression, not a multi-line text node: JSX trims the leading space of a text node
            that spans more than one line, which rendered "25multiple-choice" first time out. */}
        <p className="lab-block-sub">
          {`${questions.length} of ${bankSize} multiple-choice questions in this section’s bank. One mark each, marked here as you click.`}
          {answered > 0 && <> <strong>{`${right} of ${answered} right so far.`}</strong></>}
        </p>
      </div>

      <ol className="lab-mcq-list">
        {questions.map((q, qi) => {
          const pick = chosen[qi];
          const done = pick !== null;
          return (
            <li key={q.question} className="lab-mcq">
              <p className="lab-mcq-question">{q.question}</p>
              <ul className="lab-mcq-options">
                {q.options.map((opt, oi) => {
                  const isAnswer = oi === q.answer;
                  const isPick = pick === oi;
                  let state = '';
                  if (done && isAnswer) state = ' is-right';
                  else if (done && isPick) state = ' is-wrong';
                  return (
                    <li key={opt}>
                      <button
                        type="button"
                        className={`lab-mcq-option${state}${isPick ? ' is-pick' : ''}`}
                        aria-pressed={isPick}
                        disabled={done}
                        onClick={() => {
                          setChosen((prev) => {
                            const next = prev.slice();
                            next[qi] = oi;
                            return next;
                          });
                        }}
                      >
                        <span className="lab-mcq-letter">{'ABCDEFGH'[oi]}</span>
                        <span>{opt}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
              {done && (
                <div className={`lab-mcq-verdict${pick === q.answer ? ' is-right' : ' is-wrong'}`} role="status">
                  <strong>{pick === q.answer ? 'Correct.' : 'Not this one.'}</strong>{' '}
                  {q.explanation}
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </section>
  );
}
