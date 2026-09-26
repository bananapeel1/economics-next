"use client";
import { classifyAnswer } from '@/lib/spaced-repetition';

/*
 * Four outcomes rather than one score. "82% correct" counts a lucky guess as knowledge and says
 * nothing about what to do next; the confidence given with each answer lets the summary say which
 * ones were known, which were luck, and which were a confident misunderstanding worth reading up on.
 */
const GROUPS = [
  { id: 'knew', label: 'Knew it', note: 'Moved further back in your schedule' },
  { id: 'lucky', label: 'Lucky guesses', note: 'Right, but back tomorrow to check' },
  { id: 'misconception', label: 'Sure but wrong', note: 'Worth reading the note again' },
  { id: 'gap', label: 'Gaps', note: 'Guessed and missed' },
];

/* ── Session Summary — Smart Practice Engine ── */
export default function SessionSummary({ results, sections, onRestart, onChangeTopics }) {
  // A wrong answer comes back once in the session. The first attempt is what the student knew;
  // the retry is reported separately, so a question does not count twice.
  const firsts = new Map();
  const retries = new Map();
  for (const r of results) {
    const k = r.key || `${r.sectionId}:${r.questionIndex}`;
    if (!firsts.has(k)) firsts.set(k, r);
    else retries.set(k, r);
  }
  const answered = [...firsts.values()];
  const totalAnswered = answered.length;
  const fixedOnRetry = [...retries.values()].filter((r) => r.correct).length;

  const byGroup = { knew: [], lucky: [], misconception: [], gap: [] };
  for (const r of answered) byGroup[classifyAnswer(r.correct, r.confidence)].push(r);

  const known = byGroup.knew.length;
  const knownPct = totalAnswered > 0 ? Math.round((known / totalAnswered) * 100) : 0;
  const uniqueTopics = new Set(answered.map((r) => r.sectionId)).size;

  let message;
  if (totalAnswered === 0) message = 'No questions answered';
  else if (knownPct >= 85) message = 'Strong session';
  else if (byGroup.misconception.length > 0) message = 'A few things to fix';
  else if (knownPct >= 50) message = 'Good work';
  else message = 'Keep practising';

  const titleOf = (id) => {
    const sec = sections?.find((s) => String(s.id) === String(id));
    return sec?.short_title || sec?.title || id;
  };

  // What to do next: confident mistakes first, because they are the ones a marker punishes and
  // nothing else will flag them.
  const toFix = [...byGroup.misconception, ...byGroup.gap];

  const questionLabel = totalAnswered === 1 ? 'question' : 'questions';
  const topicLabel = uniqueTopics === 1 ? 'topic' : 'topics';

  return (
    <div className="spe-summary-card">
      <h2 className="spe-summary-heading">{message}</h2>
      <p className="spe-summary-subtitle">
        {totalAnswered} {questionLabel} across {uniqueTopics} {topicLabel}
        {totalAnswered > 0 && <> &middot; you knew {known} of {totalAnswered} for sure</>}
      </p>

      <div className="spe-summary-groups">
        {GROUPS.map((g) => (
          <div key={g.id} className={`spe-group spe-group--${g.id}`}>
            <span className="spe-group-num">{byGroup[g.id].length}</span>
            <span className="spe-group-label">{g.label}</span>
            <span className="spe-group-note">{g.note}</span>
          </div>
        ))}
      </div>

      {fixedOnRetry > 0 && (
        <p className="spe-summary-retry">
          You put {fixedOnRetry} {fixedOnRetry === 1 ? 'mistake' : 'mistakes'} right on the second go.
        </p>
      )}

      {toFix.length > 0 && (
        <div className="spe-summary-fix">
          <h3 className="spe-summary-fix-title">Worth another look</h3>
          <ul className="spe-summary-fix-list">
            {toFix.slice(0, 8).map((r) => (
              <li key={r.key || `${r.sectionId}:${r.questionIndex}`} className="spe-summary-fix-item">
                <span className={`spe-fix-tag spe-fix-tag--${classifyAnswer(r.correct, r.confidence)}`}>
                  {classifyAnswer(r.correct, r.confidence) === 'misconception' ? 'Sure but wrong' : 'Gap'}
                </span>
                <span className="spe-fix-stem">{r.stem}</span>
                <a className="spe-fix-link" href={`/?section=${r.sectionId}`} target="_blank" rel="noopener noreferrer">
                  {titleOf(r.sectionId)}{" \u2192"}
                </a>
              </li>
            ))}
          </ul>
          {toFix.length > 8 && (
            <p className="spe-summary-fix-more">
              And {toFix.length - 8} more. Each topic&rsquo;s Mistakes tab keeps the full list.
            </p>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="spe-summary-btns">
        <button className="spe-summary-btn-primary" onClick={onRestart}>Practise again</button>
        <button className="spe-summary-btn-secondary" onClick={onChangeTopics}>Change topics</button>
      </div>
    </div>
  );
}
