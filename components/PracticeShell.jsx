'use client';

/**
 * The practice shell: the extract beside the student's work. Packet 12.75, E040 and E045-E050.
 *
 * The approved design is `audit/specs/packet-12.75-mockup.html` (founder sign-off 26 September,
 * DECISIONS → Settled); the authority where the two differ is `audit/specs/packet-12.75.md`. This
 * renders it on a model-answer page whose written items carry `criteria` — Economics 1.3.5 today —
 * with the page's content prepared on the server by `lib/practice-shell.js`.
 *
 * WHAT THE SPEC CHANGED FROM THE MOCKUP, and why it is not copied:
 *   - no Exit button and no Esc exit: `SiteHeader` is the way out;
 *   - no ellipsis anywhere (DECISIONS 2026-09-26): the mockup's breadcrumb, source line and button
 *     labels used `text-overflow: ellipsis`; here text wraps or a tier removes an element whole, and
 *     "Your answer" is never clamped behind a fade;
 *   - minutes are `item.minutes` or `minutesForMarks()`, never the mockup's 1.3 min/mark;
 *   - AO codes are the item's own `ao` and each criterion's own `band`, never the mockup's.
 *
 * NOTHING LEAKS BEFORE MARKING, NOTHING IS MISSING FROM THE HTML (E048). Every question's criteria,
 * model answer, notes, examiner's note and mark scheme are rendered on the server inside elements
 * carrying the `hidden` attribute; `[hidden]{display:none!important}` beats any author `display`
 * rule, and a `<noscript>` style shows them all to a reader without JavaScript: every element that
 * holds content and carries `hidden` must also carry `data-ps-noscript-show` (the segment notes
 * missed it once — fix round 1), and the `<noscript>` style overrides `data-hidden-sm`, because below
 * 1024px the extract pane is served hidden behind tabs that need JavaScript. A student in Practise
 * mode sees none of it until she marks or asks for the answer.
 *
 * HYDRATION. The first client render is the server render: default mode, first question, empty
 * drafts. Storage (the mode, and each question's 12.6-compatible attempt record) is read in an
 * effect after mount, exactly as `MarkedScriptAttempt.jsx` does.
 *
 * SCROLLING (E045). On desktop the shell fills the viewport below `SiteHeader` and each pane scrolls
 * inside itself. `scrollIntoView` scrolls every scrollable ancestor, including the window, so an
 * in-pane link would move the page; `reveal()` scrolls the one pane by hand instead.
 */

import Link from 'next/link';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { readAttempt, writeAttempt } from '@/lib/attempt-storage';
import './practice-shell.css';

const MODE_PREFIX = 'rl:practice:v1:';

/* React 19 re-assigns `innerHTML` whenever the `dangerouslySetInnerHTML` OBJECT changes identity, even
   when the string is the same. A fresh `{ __html }` per render therefore rebuilt every model-answer
   sentence on every render (the timer ticks once a second), discarding the figure buttons' linked and
   pulse state and detaching any node a handler had just looked up — measured: a figure clicked in the
   extract found its target, then scrolled a node that no longer existed. One cached object per
   string keeps the identity stable, so React leaves the markup alone. */
const HTML = new Map();
const html = (str) => {
  const key = String(str ?? '');
  if (!HTML.has(key)) HTML.set(key, { __html: key });
  return HTML.get(key);
};
const DESKTOP = '(min-width: 1024px)';

const words = (t) => (String(t || '').trim().match(/\S+/g) || []).length;
const marksLabel = (m) => (Number(m) === 1 ? '1 mark' : `${m} marks`);
const fmt = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
const emptyAttempt = () => ({ draft: '', ticked: [], phase: 'attempt', time: 0 });
const isDesktop = () => typeof window !== 'undefined' && window.matchMedia(DESKTOP).matches;
const reducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function readPrefs(pageKey) {
  try {
    const raw = window.localStorage.getItem(MODE_PREFIX + pageKey);
    if (!raw) return null;
    const p = JSON.parse(raw);
    const essays = {};
    if (p?.essays && typeof p.essays === 'object') {
      for (const [k, v] of Object.entries(p.essays)) if (typeof v === 'string') essays[k] = v;
    }
    return {
      mode: p?.mode === 'answers' ? 'answers' : 'practise',
      textSize: Number.isInteger(p?.textSize) ? Math.max(-1, Math.min(3, p.textSize)) : 0,
      essays,
    };
  } catch {
    return null;
  }
}

function writePrefs(pageKey, prefs) {
  try {
    window.localStorage.setItem(MODE_PREFIX + pageKey, JSON.stringify(prefs));
  } catch {
    /* private window or blocked storage: the switch still works for this visit */
  }
}

/** Move one pane (desktop) or the window (below 1024px) so `el` is in view. Never scrollIntoView. */
function reveal(el) {
  if (!el) return;
  const behavior = reducedMotion() ? 'auto' : 'smooth';
  const pane = el.closest('.ps-pane-body');
  if (pane && isDesktop()) {
    const r = el.getBoundingClientRect();
    const pr = pane.getBoundingClientRect();
    pane.scrollTo({ top: pane.scrollTop + (r.top - pr.top) - pr.height / 2 + r.height / 2, behavior });
    return;
  }
  const root = el.closest('.ps');
  const tabs = root?.querySelector('.ps-set:not([hidden]) .ps-tabs');
  const header = parseFloat(getComputedStyle(root || document.documentElement).getPropertyValue('--rlh-h')) || 60;
  const clear = header + (tabs ? tabs.getBoundingClientRect().height : 0) + 24;
  const y = el.getBoundingClientRect().top + window.scrollY - clear;
  window.scrollTo({ top: Math.max(0, y), behavior });
}

/* ── The extract ─────────────────────────────────────────────────────────────────────────────── */

function Figure({ part, activeFig, onFigure }) {
  return (
    <button
      type="button"
      className={activeFig === part.text ? 'ps-fig is-linked' : 'ps-fig'}
      data-fig-id={part.id}
      data-fig-text={part.text}
      onClick={(e) => onFigure(e, part.text, 'extract')}
    >
      {part.text}
    </button>
  );
}

function Parts({ parts, activeFig, onFigure, keyPrefix }) {
  return parts.map((p, i) =>
    p.kind === 'figure' ? (
      <Figure key={`${keyPrefix}-${i}`} part={p} activeFig={activeFig} onFigure={onFigure} />
    ) : (
      <span key={`${keyPrefix}-${i}`}>{p.text}</span>
    ),
  );
}

function Tokens({ tokens, activeFig, onFigure, keyPrefix }) {
  return tokens.map((t, i) => {
    const inner = <Parts parts={t.parts} activeFig={activeFig} onFigure={onFigure} keyPrefix={`${keyPrefix}-${i}`} />;
    if (t.kind === 'strong') return <strong key={`${keyPrefix}-${i}`}>{inner}</strong>;
    if (t.kind === 'em') return <em key={`${keyPrefix}-${i}`}>{inner}</em>;
    return <span key={`${keyPrefix}-${i}`}>{inner}</span>;
  });
}

function Extract({ extract, focusRows, activeFig, onFigure, writing }) {
  return (
    <div className="ps-extract">
      {extract.blocks.map((b, bi) =>
        b.kind === 'table' ? (
          <div className="ps-table-block" key={`b${bi}`}>
            {b.caption && (
              <p className="ps-tcap">
                <Tokens tokens={b.caption} activeFig={activeFig} onFigure={onFigure} keyPrefix={`c${bi}`} />
              </p>
            )}
            <div className="ps-twrap">
              <table className="ps-table">
                <thead>
                  <tr>
                    {b.headParts.map((cell, j) => (
                      <th key={`h${j}`} scope="col">
                        <Parts parts={cell} activeFig={activeFig} onFigure={onFigure} keyPrefix={`h${bi}-${j}`} />
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {b.rowParts.map((row, r) => (
                    <tr key={`r${r}`} className={focusRows.includes(`${bi}-${r}`) ? 'is-focus' : undefined}>
                      {row.map((cell, c) => {
                        // `ps-tlabel` repeats the column heading inside the cell. It is display:none
                        // until the table's own container is too narrow for four columns, when the
                        // table stacks one row per block (E050: never a sideways scroll at phone width).
                        const inner = (
                          <>
                            <span className="ps-tlabel">{(b.head || [])[c] || ''}</span>
                            <span className="ps-tval">
                              <Parts parts={cell} activeFig={activeFig} onFigure={onFigure} keyPrefix={`r${bi}-${r}-${c}`} />
                            </span>
                          </>
                        );
                        return c === 0 ? (
                          <th key={`c${c}`} scope="row">{inner}</th>
                        ) : (
                          <td key={`c${c}`}>{inner}</td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <p className="ps-extract-para" key={`b${bi}`}>
            <Tokens tokens={b.tokens} activeFig={activeFig} onFigure={onFigure} keyPrefix={`t${bi}`} />
          </p>
        ),
      )}
      <p className="ps-hint">
        {writing
          ? 'Select any underlined figure to quote it into your answer at the cursor.'
          : 'Select a figure to see where the model answer uses it.'}
      </p>
      <p className="ps-hint ps-hint-link">
        <Link href={extract.href}>The full data-response piece</Link>
        {' — the same extract with its own question ladder.'}
      </p>
    </div>
  );
}

/* ── A question's own context (packet 12.8, E061) ──────────────────────────────────────────────

   A short answer or an essay opens with its own context — a sentence, a quoted statement, or a small
   table — exactly as the paper prints it above the task. It is the question's data, not its answer,
   so it shows in every mode and is in the server HTML. A table uses the extract's markup and
   classes, so it stacks under its own column headings below 420px of its own width rather than
   scrolling sideways (the no-cut-text rule, DECISIONS 2026-09-26). */

function Inline({ tokens, keyPrefix }) {
  return tokens.map((t, i) => {
    if (t.kind === 'strong') return <strong key={`${keyPrefix}-${i}`}>{t.text}</strong>;
    if (t.kind === 'em') return <em key={`${keyPrefix}-${i}`}>{t.text}</em>;
    return <span key={`${keyPrefix}-${i}`}>{t.text}</span>;
  });
}

function ContextBlocks({ blocks, id }) {
  return (
    <div className="ps-context" id={id}>
      {blocks.map((b, bi) =>
        b.kind === 'table' ? (
          <div className="ps-table-block ps-context-table" key={`b${bi}`}>
            <div className="ps-twrap">
              <table className="ps-table">
                <thead>
                  <tr>
                    {b.head.map((h, j) => <th key={`h${j}`} scope="col">{h}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {b.rows.map((row, r) => (
                    <tr key={`r${r}`}>
                      {row.map((cell, c) => {
                        const inner = (
                          <>
                            <span className="ps-tlabel">{b.head[c] || ''}</span>
                            <span className="ps-tval">{cell}</span>
                          </>
                        );
                        return c === 0 ? <th key={`c${c}`} scope="row">{inner}</th> : <td key={`c${c}`}>{inner}</td>;
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <p className="ps-context-para" key={`b${bi}`}>
            <Inline tokens={b.tokens} keyPrefix={`${id}-${bi}`} />
          </p>
        ),
      )}
    </div>
  );
}

/* ── One question's answer panels ─────────────────────────────────────────────────────────────── */

function segTag(crits, view, ticked) {
  if (!crits.length) return { cls: 'plain', text: 'Why this sentence is here' };
  if (view === 'marking') {
    const on = crits.filter((c) => ticked.includes(c.id));
    const text = crits
      .map((c) => {
        const got = ticked.includes(c.id);
        const missedRole = c.segRole === 'missed';
        if (got) return `You earned this · ${marksLabel(c.marks)}${missedRole ? ' — the model answer misses it here' : ''}`;
        return missedRole
          ? 'You missed this — so does the model answer; this is where it goes'
          : 'You missed this — here is how it’s earned';
      })
      .join(' · ');
    return { cls: on.length ? 'earned' : 'missed', text };
  }
  const allMissed = crits.every((c) => c.segRole === 'missed');
  const text = crits
    .map((c) =>
      c.segRole === 'missed'
        ? `Missed — this is where it goes · ${marksLabel(c.marks)}`
        : `Earns ${marksLabel(c.marks)} · ${c.band}`,
    )
    .join(' · ');
  return { cls: allMissed ? 'missed' : 'earned', text };
}

function Script({ item, view, ticked, activeSeg, onSeg, onFigure }) {
  const bySeg = useMemo(() => {
    const m = new Map();
    for (const c of item.criteria) {
      if (!m.has(c.seg)) m.set(c.seg, []);
      m.get(c.seg).push(c);
    }
    return m;
  }, [item.criteria]);

  const onClick = (e) => {
    const fig = e.target.closest('.ps-fig');
    if (fig) {
      onFigure(e, fig.dataset.figText, 'answer');
      return;
    }
    const seg = e.target.closest('[data-seg]');
    if (seg) onSeg(seg.dataset.seg, true);
  };

  return (
    // Clicks are delegated: the figure buttons live inside trusted segment HTML.
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div className="ps-script" onClick={onClick}>
      {item.script.map((p) => (
        <div className="ps-para" key={p.id}>
          <p className="ps-para-label">
            {p.label ? <span>{p.label}</span> : null}
            {p.aos?.length ? <span className="ps-para-aos">{p.aos.join(' · ')}</span> : null}
          </p>
          <p className="ps-para-text">
            {p.segments.map((s, i) => {
              const crits = bySeg.get(s.id) || [];
              const active = activeSeg === s.id;
              const tag = active ? segTag(crits, view, ticked) : null;
              return (
                <span key={s.id}>
                  {i > 0 ? ' ' : null}
                  <span
                    className={active ? `ps-seg is-${tag.cls}` : 'ps-seg'}
                    data-seg={s.id}
                    dangerouslySetInnerHTML={html(s.html)}
                  />
                </span>
              );
            })}
          </p>
          {p.segments.map((s) => {
            const crits = bySeg.get(s.id) || [];
            const active = activeSeg === s.id;
            const tag = segTag(crits, view, ticked);
            return (
              <div className="ps-note" key={`n-${s.id}`} hidden={!active} data-seg-note={s.id} data-ps-noscript-show="">
                <span className={`ps-note-tag is-${tag.cls}`}>{tag.text}</span>
                {s.note ? <span>{s.note}</span> : null}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

function MidBand({ midBand }) {
  if (!midBand) return null;
  return (
    <details className="ps-details">
      <summary>Why this loses marks — a mid-band attempt at the same question</summary>
      <p className="ps-small">
        {`Not a real script, and not written for this panel. It is ${midBand.basis}`}
      </p>
      {midBand.kept.map((p) => (
        <div key={p.index} className="ps-midband-para">
          <p className="ps-para-label"><span>{p.label}</span></p>
          <div className="ps-para-text" dangerouslySetInnerHTML={html(p.html)} />
        </div>
      ))}
      {midBand.outOfReach.length > 0 && (
        <>
          <p className="ps-small ps-strong">The band this attempt cannot reach</p>
          <dl className="ps-scheme">
            {midBand.outOfReach.map((r, i) => (
              <div key={`o${i}`}><dt>{r.range}</dt><dd>{r.desc}</dd></div>
            ))}
          </dl>
        </>
      )}
      {midBand.ceiling.length > 0 && (
        <>
          <p className="ps-small ps-strong">Where it tops out instead</p>
          <dl className="ps-scheme">
            {midBand.ceiling.map((r, i) => (
              <div key={`c${i}`}><dt>{r.range}</dt><dd>{r.desc}</dd></div>
            ))}
          </dl>
        </>
      )}
    </details>
  );
}

function Criteria({ item, view, ticked, activeSeg, onTick, onShow }) {
  const groups = [];
  for (const c of item.criteria) {
    const last = groups[groups.length - 1];
    if (last && last.band === c.band) last.items.push(c);
    else groups.push({ band: c.band, items: [c] });
  }
  const marking = view === 'marking';
  return groups.map((g) => (
    <div className="ps-aogroup" key={g.band}>
      <p className="ps-aohead">{g.band}</p>
      {g.items.map((c) => {
        const on = marking && ticked.includes(c.id);
        const cls = ['ps-crit', marking ? '' : 'is-ro', on ? 'is-on' : '', activeSeg === c.seg ? 'is-active' : '']
          .filter(Boolean)
          .join(' ');
        const inputId = `ps-ck-${item.id}-${c.id}`;
        return (
          <div className={cls} key={c.id}>
            <span className="ps-box-cell" hidden={!marking}>
              <input
                type="checkbox"
                id={inputId}
                className="ps-check"
                checked={on}
                disabled={!marking}
                onChange={() => onTick(c)}
              />
              <label htmlFor={inputId} className="ps-box" aria-hidden="true">
                <svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7" /></svg>
              </label>
            </span>
            <div className="ps-crit-body">
              {marking ? (
                <label htmlFor={inputId} className="ps-crit-text">{c.text}</label>
              ) : (
                <span className="ps-crit-text">{c.text}</span>
              )}
              <button type="button" className="ps-where" onClick={() => onShow(c.seg)} data-ps-js-only="">
                Show in the model answer
              </button>
            </div>
            <span className="ps-mk">{marksLabel(c.marks)}</span>
          </div>
        );
      })}
    </div>
  ));
}

function AnswerPanels({ item, view, state, activeSeg, onTick, onShow, onSeg, onFigure, onEdit }) {
  const marking = view === 'marking';
  const score = item.criteria.reduce((n, c) => (state.ticked.includes(c.id) ? n + Number(c.marks || 0) : n), 0);
  return (
    <div className="ps-answer" hidden={view === 'attempt'} data-ps-noscript-show="">
      {marking && !item.draw && (
        <div className="ps-block">
          <div className="ps-bhead">
            <h3>Your answer</h3>
            <button type="button" className="ps-linkbtn" onClick={onEdit}>Edit your answer</button>
          </div>
          <div className="ps-yours">{state.draft}</div>
        </div>
      )}
      {marking && item.draw && (
        <div className="ps-block">
          <p className="ps-small ps-draw-note">Your sketch is on your paper. Hold it beside the model diagram below and tick each point it shows.</p>
        </div>
      )}
      <div className="ps-block">
        <div className="ps-bhead">
          <h3>{marking ? 'Tick what your answer did' : 'What earns the marks'}</h3>
          {marking ? (
            <span className="ps-score" aria-live="polite">
              <span className="ps-score-n">{score}</span>
              <span className="ps-score-of">{`/ ${item.marks}`}</span>
            </span>
          ) : (
            <span className="ps-sub ps-mono">{marksLabel(item.marks)}</span>
          )}
        </div>
        <Criteria item={item} view={view} ticked={state.ticked} activeSeg={activeSeg} onTick={onTick} onShow={onShow} />
      </div>
      <div className="ps-block">
        <div className="ps-bhead">
          <h3>Model answer</h3>
          <span className="ps-sub">
            {item.likelyScore ? `Marked ${item.likelyScore} · ` : ''}
            Select a sentence to see why it scores
          </span>
        </div>
        {item.diagram && (
          <figure className="ps-diagram-fig">
            {/* The asset's colours are fixed for a light ground; its frame is light in every theme. */}
            <div className="ps-diagram">
              <img src={item.diagram.src} alt={item.diagram.alt} width={item.diagram.width || undefined} height={item.diagram.height || undefined} loading="lazy" />
            </div>
            {/* On a phone the diagram is drawn at about half size, so its labels are small; the file
                itself opens full size in a new tab, where it can be zoomed. */}
            <figcaption className="ps-diagram-cap">
              <a href={item.diagram.src} target="_blank" rel="noopener">Open the diagram full size</a>
            </figcaption>
          </figure>
        )}
        <Script item={item} view={view} ticked={state.ticked} activeSeg={activeSeg} onSeg={onSeg} onFigure={onFigure} />
      </div>
      {item.examinerHtml && (
        <div className="ps-examiner">
          <span className="ps-label ps-examiner-label">Examiner’s note</span>
          <div dangerouslySetInnerHTML={html(item.examinerHtml)} />
        </div>
      )}
      <MidBand midBand={item.midBand} />
      {item.markScheme.length > 0 && (
        <details className="ps-details">
          <summary>The mark scheme as written</summary>
          <dl className="ps-scheme">
            {item.markScheme.map((r, i) => (
              <div key={`m${i}`}><dt>{r.range}</dt><dd>{r.desc}</dd></div>
            ))}
          </dl>
        </details>
      )}
    </div>
  );
}

/* ── The shell ────────────────────────────────────────────────────────────────────────────────── */

export default function PracticeShell({ shell }) {
  const { pageKey, sets } = shell;
  const allItems = useMemo(() => sets.flatMap((s) => s.items), [sets]);

  const [mode, setMode] = useState('practise');
  const [textSize, setTextSize] = useState(0);
  const [setIdx, setSetIdx] = useState(0);
  const [cur, setCur] = useState(0);
  const [attempts, setAttempts] = useState(() => Object.fromEntries(allItems.map((it) => [it.id, emptyAttempt()])));
  const [activeSeg, setActiveSeg] = useState(null);
  const [activeFig, setActiveFig] = useState(null);
  const [tab, setTab] = useState('work');
  const [toast, setToast] = useState('');
  const [loaded, setLoaded] = useState(false);
  // Packet 12.8, E061: the essay a student has chosen in each essay section with a choice, by set id.
  const [essays, setEssays] = useState({});
  // Packet 12.8, E063: the site header's measured height (px), or null until it has been measured.
  const [headerH, setHeaderH] = useState(null);

  const rootRef = useRef(null);
  // Work that needs the NEXT render's DOM (scroll a pane, focus the box, pulse a figure). It runs in
  // an effect after the commit, not in requestAnimationFrame: rAF never fires in a hidden tab, and a
  // queued scroll that silently never happens is the failure mode the mockup notes warn about.
  const afterRender = useRef([]);
  const [, bump] = useState(0);
  const later = useCallback((fn) => {
    afterRender.current.push(fn);
    bump((n) => n + 1);
  }, []);
  useEffect(() => {
    const queue = afterRender.current.splice(0);
    queue.forEach((fn) => fn());
  });
  const caret = useRef({});
  const textareas = useRef({});
  const dirty = useRef(new Set());
  const toastTimer = useRef(null);

  const set = sets[setIdx];
  const item = set.items[cur];
  const state = attempts[item.id];
  const study = mode === 'answers';
  const view = study ? 'study' : state.phase;

  // Adopt what this browser already holds: the page's mode and text size, and every question's
  // attempt record (12.6 drafts included). After mount only — see HYDRATION above.
  useEffect(() => {
    const prefs = readPrefs(pageKey);
    if (prefs) {
      setMode(prefs.mode);
      setTextSize(prefs.textSize);
    }
    const saved = {};
    for (const it of allItems) {
      const a = readAttempt(it.id);
      if (a) saved[it.id] = { draft: a.draft, ticked: a.ticked, phase: a.phase, time: a.time };
    }
    setAttempts((prev) => ({ ...prev, ...saved }));
    // An essay section's choice: the one this browser recorded, else the essay the student already
    // started (a draft saved before the choice existed — 12.6/12.75 drafts are keyed by item id),
    // else none until she picks.
    const chosen = { ...(prefs?.essays || {}) };
    for (const st of sets) {
      if (!st.paper?.choice) continue;
      if (chosen[st.id] && st.items.some((it) => it.id === chosen[st.id])) continue;
      delete chosen[st.id];
      const started = st.items.find((it) => saved[it.id] && (saved[it.id].phase !== 'attempt' || words(saved[it.id].draft)));
      if (started) chosen[st.id] = started.id;
    }
    setEssays(chosen);
    setLoaded(true);
  }, [pageKey, allItems, sets]);

  useEffect(() => {
    if (loaded) writePrefs(pageKey, { mode, textSize, essays });
  }, [loaded, pageKey, mode, textSize, essays]);

  // E063. The frame fills the viewport below `SiteHeader`, so it needs the header's real height.
  // WHERE `.rlh` GETS ITS HEIGHT: styles/theme-night.css sets `--rlh-h: 60px` on `.rl-night` (and
  // `.elp-page`), and `.rlh { height: var(--rlh-h) }` — the header is sized FROM the variable, and the
  // frame reads the same variable, so the two agree by construction for as long as nobody sizes the
  // header another way. This measures the header and steps in only when they disagree (a restyle that
  // sets `.rlh`'s height directly, a banner inside it, a second line): the frame is then given the
  // measured height, so the dock never lands below the fold. When they agree nothing is written and the
  // inherited variable applies, which is also the server render. A ResizeObserver catches a change to
  // the header itself; the resize listener catches a change that comes with the window.
  useEffect(() => {
    const header = document.querySelector('.rlh');
    if (!header) return undefined;
    const apply = () => {
      const h = header.getBoundingClientRect().height;
      const declared = parseFloat(getComputedStyle(header).getPropertyValue('--rlh-h'));
      const next = h > 0 && !(Math.abs(h - declared) <= 0.5) ? h : null;
      setHeaderH((prev) => (prev === next ? prev : next));
    };
    apply();
    window.addEventListener('resize', apply);
    const ro = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(apply);
    ro?.observe(header);
    return () => {
      window.removeEventListener('resize', apply);
      ro?.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!loaded) return;
    for (const id of dirty.current) writeAttempt(id, attempts[id]);
    dirty.current.clear();
  }, [loaded, attempts]);

  const update = useCallback((id, patch) => {
    dirty.current.add(id);
    setAttempts((prev) => ({ ...prev, [id]: { ...prev[id], ...(typeof patch === 'function' ? patch(prev[id]) : patch) } }));
  }, []);

  const say = useCallback((msg) => {
    setToast(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(''), 2400);
  }, []);

  const scrollPanesTop = useCallback(() => {
    rootRef.current?.querySelectorAll('.ps-pane-body').forEach((p) => {
      p.scrollTop = 0;
    });
  }, []);

  // Below 1024px the panes do not scroll; the window does. A Next tapped in the sticky dock after a
  // long marked answer swaps in a shorter question, the document shrinks, and the browser clamps the
  // window to the bottom of the page: the student lands on the CTA below the shell with no question
  // and no dock on screen (verify B, 26 Sep, 3 of 3 at 390px). Bring the question row back to just
  // under the header, after the commit, and only upwards, never past where the student already is.
  const toQuestion = useCallback(() => {
    if (isDesktop()) return;
    const row = rootRef.current?.querySelector('.ps-qrow');
    if (!row) return;
    const header = parseFloat(getComputedStyle(row).getPropertyValue('--rlh-h')) || 60;
    const top = row.getBoundingClientRect().top + window.scrollY - header - 8;
    if (window.scrollY > top) window.scrollTo({ top: Math.max(0, top), behavior: 'auto' });
  }, []);

  const go = useCallback(
    (i) => {
      if (i < 0 || i >= set.items.length || i === cur) return;
      setCur(i);
      setActiveSeg(null);
      setActiveFig(null);
      setTab('work');
      scrollPanesTop();
      later(scrollPanesTop);
      later(toQuestion);
    },
    [set.items.length, cur, scrollPanesTop, toQuestion, later],
  );

  const goSet = useCallback(
    (i, at = 0) => {
      if (i < 0 || i >= sets.length || i === setIdx) return;
      setSetIdx(i);
      setCur(at === 'last' ? sets[i].items.length - 1 : 0);
      setActiveSeg(null);
      setActiveFig(null);
      setTab('work');
      scrollPanesTop();
      later(scrollPanesTop);
      later(toQuestion);
    },
    [sets, setIdx, scrollPanesTop, toQuestion, later],
  );

  // Packet 12.8, E061: ← and → walk every question in paper order, across sections — the last part
  // of Section C is followed by the first essay of Section D, as on the paper.
  const next = useCallback(() => {
    if (cur + 1 < set.items.length) go(cur + 1);
    else goSet(setIdx + 1);
  }, [cur, set.items.length, go, goSet, setIdx]);
  const prev = useCallback(() => {
    if (cur > 0) go(cur - 1);
    else goSet(setIdx - 1, 'last');
  }, [cur, go, goSet, setIdx]);

  // An essay section with a choice: which essay is this student's, and is this one locked behind the
  // choice? Model answers mode shows every essay; only Practise asks her to choose.
  const choiceIn = (s) => (s.paper?.choice ? essays[s.id] || null : null);
  const gatedFor = (s, it) => !!s.paper?.choice && choiceIn(s) !== it.id;
  const choose = useCallback((s, it) => {
    setEssays((prevChoice) => ({ ...prevChoice, [s.id]: it.id }));
    later(() => textareas.current[it.id]?.focus({ preventScroll: true }));
  }, [later]);
  const gated = !study && gatedFor(set, item);

  // A soft timer against the allocation: it counts, it never blocks and it never submits.
  useEffect(() => {
    if (view !== 'attempt' || gated) return undefined;
    const t = setInterval(() => {
      if (document.hidden) return;
      dirty.current.add(item.id);
      setAttempts((prev) => ({ ...prev, [item.id]: { ...prev[item.id], time: prev[item.id].time + 1 } }));
    }, 1000);
    return () => clearInterval(t);
  }, [view, item.id, gated]);

  // Linked figures inside the model-answer HTML are not React-managed; mark them by hand.
  useEffect(() => {
    rootRef.current?.querySelectorAll('.ps-script .ps-fig').forEach((el) => {
      el.classList.toggle('is-linked', !!activeFig && el.dataset.figText === activeFig);
    });
  }, [activeFig, cur, setIdx, view]);

  // Marks banked in a set. In an essay section with a choice only the chosen essay counts, and the
  // total is the paper's section total, not the sum of every essay offered (E061).
  const banked = (s) =>
    s.items.reduce((n, it) => {
      if (s.paper?.choice && choiceIn(s) !== it.id) return n;
      const a = attempts[it.id];
      if (a.phase !== 'marking') return n;
      return n + it.criteria.reduce((m, c) => (a.ticked.includes(c.id) ? m + Number(c.marks || 0) : m), 0);
    }, 0);
  const totalOf = (s) => (s.paper && Number.isFinite(s.paper.total) ? s.paper.total : s.items.reduce((n, it) => n + Number(it.marks || 0), 0));
  const setTotal = totalOf(set);

  const mark = useCallback(() => {
    update(item.id, { phase: 'marking' });
    setActiveSeg(null);
    setTab('work');
    later(scrollPanesTop);
    say('Tick each point your answer made');
  }, [item.id, update, say, scrollPanesTop, later]);

  const showAnswer = useCallback(() => {
    update(item.id, { phase: 'revealed' });
    setActiveSeg(null);
    setTab('work');
  }, [item.id, update]);

  const edit = useCallback(() => {
    update(item.id, { phase: 'attempt' });
    later(() => textareas.current[item.id]?.focus({ preventScroll: true }));
  }, [item.id, update, later]);

  const showSeg = useCallback(
    (segId, toggle) => {
      setActiveSeg((prev) => (toggle && prev === segId ? null : segId));
      later(() => {
        const root = rootRef.current;
        const el = root?.querySelector(`.ps-work[data-item="${item.id}"] [data-seg="${segId}"]`);
        if (el && el.offsetParent !== null) reveal(el);
      });
    },
    [item.id, later],
  );

  const tick = useCallback(
    (c) => {
      update(item.id, (prev) => ({
        ticked: prev.ticked.includes(c.id) ? prev.ticked.filter((x) => x !== c.id) : [...prev.ticked, c.id],
      }));
      setActiveSeg(c.seg);
      const n = rootRef.current?.querySelector('.ps-work:not([hidden]) .ps-score-n');
      if (n) {
        n.classList.remove('is-bump');
        void n.offsetWidth; // restart the animation
        n.classList.add('is-bump');
      }
    },
    [item.id, update],
  );

  const quote = useCallback(
    (text) => {
      const ta = textareas.current[item.id];
      const value = attempts[item.id].draft;
      // A textarea keeps its selection when focus moves to the figure button, so read it there;
      // the recorded caret is the fallback for a textarea that has not rendered yet.
      const [a, b] = ta && ta.value === value
        ? [ta.selectionStart, ta.selectionEnd]
        : caret.current[item.id] || [value.length, value.length];
      const before = value.slice(0, a);
      const after = value.slice(b);
      const pad = before && !/\s$/.test(before) ? ' ' : '';
      const ins = pad + text + (after && !/^[\s.,;:]/.test(after) ? ' ' : '');
      const pos = (before + ins).length;
      caret.current[item.id] = [pos, pos];
      update(item.id, { draft: before + ins + after });
      later(() => {
        if (!ta) return;
        ta.focus({ preventScroll: true });
        ta.setSelectionRange(pos, pos);
      });
    },
    [item.id, attempts, update, later],
  );

  const onFigure = useCallback(
    (e, text, from) => {
      e.stopPropagation();
      if (from === 'extract' && view === 'attempt') {
        quote(text);
        say(`Quoted “${text}”`);
        if (!isDesktop()) setTab('work');
        return;
      }
      const next = activeFig === text ? null : text;
      setActiveFig(next);
      if (!next) return;
      const root = rootRef.current;
      const scope = root?.querySelector(`.ps-set[data-set="${set.id}"]`);
      const target =
        from === 'extract'
          ? scope?.querySelector(`.ps-work[data-item="${item.id}"] .ps-script .ps-fig[data-fig-text="${CSS.escape(text)}"]`)
          : scope?.querySelector(`.ps-extract .ps-fig[data-fig-text="${CSS.escape(text)}"]`);
      if (!target) {
        if (from === 'extract') say('The model answer for this question does not use that figure');
        return;
      }
      if (!isDesktop()) setTab(from === 'extract' ? 'work' : 'extract');
      later(() => {
        reveal(target);
        rootRef.current?.querySelectorAll('.ps-fig.is-pulse').forEach((x) => x.classList.remove('is-pulse'));
        void target.offsetWidth;
        target.classList.add('is-pulse');
      });
    },
    [view, activeFig, quote, say, set.id, item.id, later],
  );

  const switchTab = useCallback(
    (t) => {
      if (tab === t) return;
      setTab(t);
      // Start the other pane at its top, not at whatever depth the last one was scrolled to: bring
      // the tab bar back to where it sticks, so the newly shown pane begins right under it.
      later(() => {
        const tabs = rootRef.current?.querySelector('.ps-set:not([hidden]) .ps-tabs');
        const panes = tabs?.nextElementSibling;
        if (!tabs || !panes) return;
        const header = parseFloat(getComputedStyle(tabs).getPropertyValue('--rlh-h')) || 60;
        const top = panes.getBoundingClientRect().top + window.scrollY - header - tabs.getBoundingClientRect().height - 12;
        if (window.scrollY > top) window.scrollTo({ top: Math.max(0, top), behavior: 'auto' });
      });
    },
    [tab, later],
  );

  const nextItem = set.items[cur + 1];
  const nextSet = sets[setIdx + 1];
  let primary;
  if (view === 'attempt' && gated) {
    primary = { act: 'choose', label: 'Answer this essay' };
  } else if (view === 'attempt' && item.draw) {
    // A Draw item is sketched on paper, so there is no draft to wait for: marking is always offered.
    primary = { act: 'mark', label: 'Mark my sketch', kbd: true };
  } else if (view === 'attempt') {
    primary = words(state.draft)
      ? { act: 'mark', label: 'Mark my answer', kbd: true }
      : { act: 'reveal', label: 'Show the model answer' };
  } else if (nextItem) {
    primary = { act: 'next', label: `Next: ${nextItem.commandWord}`, extra: ` · ${marksLabel(nextItem.marks)}` };
  } else if (nextSet) {
    primary = { act: 'nextset', label: nextSet.paper ? `Next: ${nextSet.label}` : `Next: ${nextSet.label} questions` };
  } else {
    primary = { act: 'finish', label: study ? 'Finish' : `Finish · ${banked(set)} of ${setTotal} banked` };
  }

  const onPrimary = () => {
    if (primary.act === 'mark') mark();
    else if (primary.act === 'choose') choose(set, item);
    else if (primary.act === 'reveal') showAnswer();
    else if (primary.act === 'next') go(cur + 1);
    else if (primary.act === 'nextset') goSet(setIdx + 1);
    else {
      const after = document.getElementById('ps-after');
      if (after) window.scrollTo({ top: after.getBoundingClientRect().top + window.scrollY - 70, behavior: reducedMotion() ? 'auto' : 'smooth' });
    }
  };

  // Keyboard: ← → move through every question in paper order, number keys jump within the current
  // section, ⌘/Ctrl+↵ marks. All inert while typing except ⌘/Ctrl+↵, and inert when focus is
  // somewhere else on the page (the coverage list below, a link).
  const keyState = useRef({});
  keyState.current = { view, draft: state.draft, draw: item.draw, gated, cur, n: set.items.length, go, next, prev, mark };
  useEffect(() => {
    const onKey = (e) => {
      const k = keyState.current;
      const target = e.target;
      const typing = target instanceof Element && target.matches('textarea, input:not([type=checkbox]), select, [contenteditable="true"]');
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        if (k.view === 'attempt' && !k.gated && (words(k.draft) || k.draw)) {
          e.preventDefault();
          k.mark();
        }
        return;
      }
      if (typing || e.metaKey || e.ctrlKey || e.altKey) return;
      const inShell = target === document.body || (rootRef.current && rootRef.current.contains(target));
      if (!inShell) return;
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        k.next();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        k.prev();
      } else if (/^[1-9]$/.test(e.key) && Number(e.key) <= k.n) {
        e.preventDefault();
        k.go(Number(e.key) - 1);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const cardState = (it, s) => {
    const a = attempts[it.id];
    if (study) return { cls: '', long: 'Reading', short: 'Read' };
    if (s.paper?.choice && choiceIn(s) && choiceIn(s) !== it.id) return { cls: '', long: 'Not your choice', short: 'Other' };
    if (a.phase === 'marking') {
      const got = it.criteria.reduce((m, c) => (a.ticked.includes(c.id) ? m + Number(c.marks || 0) : m), 0);
      return { cls: 'is-done', long: `You marked ${got} / ${it.marks}`, short: `${got}/${it.marks}` };
    }
    if (a.phase === 'revealed') return { cls: '', long: 'Answer shown', short: 'Shown' };
    const w = words(a.draft);
    if (w) return { cls: 'is-draft', long: `Draft · ${w} word${w === 1 ? '' : 's'}`, short: 'Draft' };
    return { cls: '', long: 'Not started', short: 'New' };
  };

  const workLabel = view === 'attempt' ? 'Your answer' : view === 'marking' ? 'Marking' : 'Model answer';
  const t = attempts[item.id].time;
  const over = t > item.minutes * 60;

  return (
    <section
      ref={rootRef}
      className={study ? 'ps is-study' : 'ps'}
      aria-label="Practice"
      style={{ '--ps-read': `${15.5 + textSize * 1.5}px`, ...(headerH ? { '--rlh-h': `${headerH}px` } : {}) }}
    >
      <noscript>
        <style>{`.ps [data-ps-noscript-show][hidden]{display:block!important}.ps [data-ps-js-only]{display:none!important}.ps{height:auto!important;display:block!important}.ps .ps-panes{display:block!important}.ps .ps-pane-body{overflow:visible!important}.ps .ps-pane[data-hidden-sm]{display:flex!important}.ps .ps-pane+.ps-pane{margin-top:16px}`}</style>
      </noscript>

      <div className="ps-top">
        <nav className="ps-crumbs" aria-label="Breadcrumb">
          <Link href={shell.backLink.href} className="ps-crumb-link">{shell.backLink.label}</Link>
          <span className="ps-crumb-sep" aria-hidden="true">/</span>
        </nav>
        <h1 className="ps-title">{shell.title}</h1>
        <div className="ps-modes" role="group" aria-label="How to use these questions" data-ps-js-only="">
          <button type="button" aria-pressed={!study} onClick={() => { setMode('practise'); setActiveSeg(null); }}>
            Practise
          </button>
          <button type="button" aria-pressed={study} onClick={() => { setMode('answers'); setActiveSeg(null); }}>
            Model answers
          </button>
        </div>
        {shell.sectionA && (
          <p className="ps-seca">
            <span className="ps-seca-h">{shell.sectionA.heading}</span>
            {' '}
            <Link href={shell.sectionA.href} className="ps-seca-link">{shell.sectionA.linkText}</Link>
            <span className="ps-seca-note">{` ${shell.sectionA.note}`}</span>
          </p>
        )}
      </div>

      <div className="ps-qrow" data-ps-js-only="">
        {sets.length > 1 && (
          <div className="ps-setswitch" role="group" aria-label={sets[0].paper ? 'Paper sections' : 'Question sets'}>
            {sets.map((s, i) => (
              <button
                type="button"
                key={s.id}
                aria-pressed={i === setIdx}
                aria-label={s.paper ? `${s.paper.heading}, ${s.items.length} question${s.items.length === 1 ? '' : 's'}` : undefined}
                onClick={() => goSet(i)}
              >
                {s.paper ? s.label : `${s.label} · ${s.items.length} question${s.items.length === 1 ? '' : 's'}`}
              </button>
            ))}
          </div>
        )}
        <ol className="ps-cards" aria-label="Questions" style={{ '--ps-n': set.items.length }}>
          {set.items.map((it, i) => {
            const st = cardState(it, set);
            return (
              <li key={it.id}>
                <button
                  type="button"
                  className={`ps-card ${st.cls}`.trim()}
                  aria-current={i === cur ? 'step' : undefined}
                  aria-label={`Question ${i + 1}: ${it.commandWord}, ${marksLabel(it.marks)}, about ${it.minutes} minutes. ${it.question} ${st.long}.`}
                  onClick={() => go(i)}
                >
                  <span className="ps-card-r1">
                    <span className="ps-card-cmd">
                      <span className="ps-dot" aria-hidden="true" />
                      <span>{`${it.part ? `(${it.part})` : i + 1} ${it.commandWord}`}</span>
                    </span>
                    <span className="ps-card-meta">
                      {marksLabel(it.marks)}
                      <span className="ps-card-mm">{` · ${it.minutes} min`}</span>
                    </span>
                  </span>
                  <span className="ps-card-r2">
                    <span className="ps-card-t">{it.cardLabel}</span>
                    <span className="ps-card-state">
                      <span className="ps-st-long">{st.long}</span>
                      <span className="ps-st-short">{st.short}</span>
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
        {!study && (
          <div className="ps-banked" aria-live="polite">
            <span className="ps-label">Marks banked</span>
            <span className="ps-banked-n">
              <span className="ps-banked-got">{banked(set)}</span>
              {` / ${setTotal}`}
            </span>
          </div>
        )}
      </div>

      <div className="ps-main">
        {sets.map((s, si) => {
          const extractSet = s.kind === 'extract' && !!s.extract;
          const currentSet = si === setIdx;
          return (
            <div className="ps-set" data-set={s.id} key={s.id} hidden={!currentSet} data-ps-noscript-show="">
              <div className="ps-qheads">
                {s.paper && (
                  <div className="ps-sechead">
                    <h2 className="ps-sechead-t">{s.paper.heading}</h2>
                    <p className="ps-sechead-n">{s.paper.note}</p>
                  </div>
                )}
                {s.items.map((it, i) => (
                  <div className="ps-qhead" key={it.id} hidden={!(currentSet && i === cur)} data-ps-noscript-show="">
                    <p className="ps-chips">
                      <span className="ps-chip is-strong">
                        {it.part
                          ? `${s.label}, part (${it.part})`
                          : s.paper?.kind === 'essay'
                            ? `${s.label}, essay ${i + 1} of ${s.items.length}`
                            : `${s.label}, question ${i + 1}`}
                      </span>
                      <span className="ps-chip is-strong">{marksLabel(it.marks)}</span>
                      {it.ao.length > 0 && <span className="ps-chip">{it.ao.join(' · ')}</span>}
                      <span className="ps-chip">{`About ${it.minutes} min`}</span>
                      {extractSet && <span className="ps-chip">{`Uses ${s.extractLabel}`}</span>}
                    </p>
                    {it.context && <ContextBlocks blocks={it.context} id={`ps-ctx-${it.id}`} />}
                    {s.paper ? (
                      <h3 className="ps-stem">
                        {it.stem.before}
                        {it.stem.term ? <em>{it.stem.term}</em> : null}
                        {it.stem.after}
                      </h3>
                    ) : (
                      <h2 className="ps-stem">
                        {it.stem.before}
                        {it.stem.term ? <em>{it.stem.term}</em> : null}
                        {it.stem.after}
                      </h2>
                    )}
                  </div>
                ))}
              </div>

              {extractSet && (
                <div className="ps-tabs" role="tablist" aria-label="View" data-ps-js-only="">
                  <button type="button" role="tab" aria-selected={currentSet && tab === 'extract'} onClick={() => switchTab('extract')}>
                    {s.extractLabel}
                  </button>
                  <button type="button" role="tab" aria-selected={!(currentSet && tab === 'extract')} onClick={() => switchTab('work')}>
                    {currentSet ? workLabel : 'Your answer'}
                  </button>
                </div>
              )}

              <div className={extractSet ? 'ps-panes' : 'ps-panes is-solo'}>
                {extractSet && (
                  <section
                    className="ps-pane ps-pane-extract"
                    aria-label={s.extractLabel}
                    data-hidden-sm={currentSet && tab !== 'extract' ? 'true' : 'false'}
                  >
                    <div className="ps-pane-head">
                      <span className="ps-label">{s.extractLabel}</span>
                      <span className="ps-textsize" role="group" aria-label="Text size" data-ps-js-only="">
                        <button type="button" aria-label="Smaller text" onClick={() => setTextSize((v) => Math.max(-1, v - 1))}>A−</button>
                        <button type="button" aria-label="Larger text" onClick={() => setTextSize((v) => Math.min(3, v + 1))}>A+</button>
                      </span>
                    </div>
                    <div className="ps-pane-body">
                      <Extract
                        extract={s.extract}
                        focusRows={currentSet && view !== 'attempt' ? item.focusRows : []}
                        activeFig={currentSet ? activeFig : null}
                        onFigure={onFigure}
                        writing={!currentSet || view === 'attempt'}
                      />
                    </div>
                  </section>
                )}
                <section
                  className="ps-pane ps-pane-work"
                  aria-label={currentSet ? workLabel : 'Your answer'}
                  data-hidden-sm={extractSet && currentSet && tab === 'extract' ? 'true' : 'false'}
                >
                  <div className="ps-pane-head" data-ps-js-only="">
                    {currentSet && view === 'attempt' && (
                      <>
                        <span className="ps-label">Your answer</span>
                        <span className="ps-saved">Saved in this browser only</span>
                      </>
                    )}
                    {currentSet && view === 'marking' && <span className="ps-label">Mark your answer</span>}
                    {currentSet && view === 'revealed' && (
                      <>
                        <span className="ps-label">Model answer · not marked</span>
                        <button type="button" className="ps-linkbtn" onClick={edit}>Try it yourself instead</button>
                      </>
                    )}
                    {currentSet && view === 'study' && <span className="ps-label">Model answer</span>}
                    {!currentSet && <span className="ps-label">Your answer</span>}
                  </div>
                  <div className="ps-pane-body">
                    {s.items.map((it, i) => {
                      const a = attempts[it.id];
                      const v = study ? 'study' : a.phase;
                      const isCur = currentSet && i === cur;
                      return (
                        <div className="ps-work" data-item={it.id} key={it.id} hidden={!isCur} data-ps-noscript-show="">
                          <div className="ps-attempt" hidden={v !== 'attempt'} data-ps-js-only="">
                            {!study && gatedFor(s, it) ? (
                              // E061: Section D offers a choice. Read both, pick one; only its marks bank.
                              <div className="ps-choice">
                                <p className="ps-choice-t">
                                  {choiceIn(s)
                                    ? `You chose essay ${s.items.findIndex((x) => x.id === choiceIn(s)) + 1}. Only that essay’s marks are banked.`
                                    : `In the exam you answer ${s.paper.choice.answer === 1 ? 'one' : s.paper.choice.answer} of these ${s.paper.choice.offered === 2 ? 'two' : s.paper.choice.offered} essays. Read the question, then choose the one you will attempt.`}
                                </p>
                                <div className="ps-under">
                                  <button type="button" className="ps-btn is-ghost" onClick={() => choose(s, it)}>
                                    {choiceIn(s) ? 'Answer this essay instead' : 'Answer this essay'}
                                  </button>
                                  <button type="button" className="ps-linkbtn" onClick={showAnswer}>
                                    Show the model answer without marking
                                  </button>
                                </div>
                                {choiceIn(s) ? (
                                  <p className="ps-small">Switching keeps both drafts in this browser; only the essay you are answering counts towards the section.</p>
                                ) : null}
                              </div>
                            ) : it.draw ? (
                              // E061: a Draw item is sketched on paper, then self-marked. No text box.
                              <div className="ps-choice ps-sketch">
                                <p className="ps-choice-t">Sketch the diagram on paper, as you would in the exam. Label the axes, every curve and every point you use.</p>
                                <p className="ps-small">When it is done, mark it: the next screen lists what earns each mark, and the model diagram is shown after you tick.</p>
                                <div className="ps-under">
                                  <button type="button" className="ps-btn is-ghost" onClick={mark}>Mark my sketch</button>
                                  <button type="button" className="ps-linkbtn" onClick={showAnswer}>
                                    Show the model answer without marking
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <>
                                <textarea
                                  ref={(el) => {
                                    textareas.current[it.id] = el;
                                  }}
                                  className="ps-draft"
                                  aria-label={`Your answer to question ${i + 1}`}
                                  placeholder="Write your answer as you would in the exam. It stays in this browser."
                                  value={a.draft}
                                  spellCheck
                                  onChange={(e) => update(it.id, { draft: e.target.value })}
                                  onSelect={(e) => {
                                    caret.current[it.id] = [e.currentTarget.selectionStart, e.currentTarget.selectionEnd];
                                  }}
                                />
                                <div className="ps-under">
                                  <span className="ps-mono">{`${words(a.draft)} word${words(a.draft) === 1 ? '' : 's'}`}</span>
                                  <button type="button" className="ps-linkbtn" onClick={showAnswer}>
                                    Show the model answer without marking
                                  </button>
                                </div>
                                <p className="ps-small">
                                  Saved in this browser only, against this question. Nothing is sent anywhere.
                                </p>
                              </>
                            )}
                          </div>
                          <AnswerPanels
                            item={it}
                            view={v}
                            state={a}
                            activeSeg={isCur ? activeSeg : null}
                            onTick={tick}
                            onShow={(seg) => showSeg(seg, false)}
                            onSeg={showSeg}
                            onFigure={onFigure}
                            onEdit={edit}
                          />
                        </div>
                      );
                    })}
                  </div>
                </section>
              </div>
            </div>
          );
        })}
      </div>

      <div className="ps-dock" data-ps-js-only="">
        <div className="ps-facts">
          <span>
            {'Question '}
            <b>{cur + 1}</b>
            {` of ${set.items.length}`}
          </span>
          {!study && (
            <span className="ps-facts-banked">
              {'Banked '}
              <b>{`${banked(set)} / ${setTotal}`}</b>
            </span>
          )}
          {!study && view === 'attempt' && (
            <span className={over ? 'ps-timer is-over' : 'ps-timer'}>
              {`${fmt(t)} / ${fmt(item.minutes * 60)}${over ? ' · over time' : ''}`}
            </span>
          )}
          {!study && view === 'marking' && <span className="ps-timer">{`Took ${fmt(t)}`}</span>}
        </div>
        <div className="ps-keys" aria-hidden="true">
          <kbd>←</kbd>
          <kbd>→</kbd>
          <span>questions</span>
          <kbd>⌘</kbd>
          <kbd>↵</kbd>
          <span>mark</span>
        </div>
        <div className="ps-actions">
          <button type="button" className="ps-btn is-ghost" disabled={cur === 0 && setIdx === 0} onClick={prev} aria-label="Previous question">
            <span aria-hidden="true">←</span>
            <span className="ps-prev-label">Previous</span>
          </button>
          <button
            type="button"
            className="ps-btn is-primary"
            onClick={onPrimary}
            aria-label={primary.extra ? `${primary.label},${primary.extra.replace(' ·', '')}` : undefined}
          >
            <span>
              {primary.label}
              {primary.extra ? <span className="ps-pm">{primary.extra}</span> : null}
            </span>
            {primary.kbd ? <span className="ps-k" aria-hidden="true">⌘↵</span> : null}
            {primary.act === 'next' || primary.act === 'nextset' ? <span aria-hidden="true">→</span> : null}
          </button>
        </div>
      </div>

      <div className={toast ? 'ps-toast is-show' : 'ps-toast'} role="status" aria-live="polite">
        {toast}
      </div>
    </section>
  );
}
