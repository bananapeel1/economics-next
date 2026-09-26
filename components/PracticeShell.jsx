'use client';

/**
 * The practice page as the exam paper and the examiner's marked script. Packet 12.85, E065-E072.
 *
 * The approved design is `audit/specs/practice-redesign-v8-mockup.html` (founder sign-off 26
 * September; DECISIONS → Settled, the 2026-09-26 redesign entry, v8 superseding v7). The authority
 * where the two differ is `audit/specs/packet-12.85.md`. It replaces packet 12.75's shell (cards, dock,
 * timer, two panes) on every page that renders the shell: Economics 1.3.5 today. Content is prepared
 * on the server by `components/SectionModelAnswersPage.jsx` and `lib/practice-shell.js`; this file
 * only decides what is visible.
 *
 * WHAT IS NOT COPIED FROM THE MOCKUP, and why:
 *   - its question text: the content is the bank's (packet 12.8), never the mockup's illustrations;
 *   - its inline diagram: a Draw question's model diagram is the file its item names in
 *     public/diagrams/ (validator R9), on a light ground in both themes because the file's own
 *     colours are fixed;
 *   - its hex palette: every colour is an `app/globals.css` token (E070), resolved inside this
 *     component's own `data-theme` so the page is paper by default whatever the site theme is;
 *   - "Practise them in the topic quiz": the app has no deep link into its Quiz tab (E056), so the
 *     Section A row names the topic and says where the quiz is instead (E069);
 *   - the Prototype menu.
 *
 * NOTHING LEAKS BEFORE MARKING, NOTHING IS MISSING FROM THE HTML (E072). Every question's mark scheme,
 * level descriptors, indicative content and model answer are rendered on the server inside elements
 * carrying `hidden` (`.psx [hidden]` is display:none!important, which beats any author display rule).
 * Each such element also carries `data-ps-noscript-show`, and the `<noscript>` style shows them all to
 * a reader without JavaScript. A student in Practise sees none of it until she marks or asks for the
 * answer.
 *
 * DARK ONLY BY CHOICE (E070). `components/ThemeProvider.jsx` writes `localStorage.theme` on every load,
 * default included, so that key cannot say whether a student chose dark. This page therefore starts on
 * paper, and its own switch records an explicit choice under THEME_KEY and writes the site's `theme`
 * key through the provider, so a student who picks dark here keeps dark here and across the site.
 *
 * HYDRATION. The first client render is the server render: Practise, the first question, empty drafts,
 * paper. Storage (the mode, the question, the essay choice, the theme choice, each question's attempt
 * record) is read in an effect after mount.
 */

import Link from 'next/link';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { readAttempt, writeAttempt } from '@/lib/attempt-storage';
import { useTheme } from '@/components/ThemeProvider';
import './practice-shell.css';

// The page's own preferences. The key is packet 12.75's, unchanged; the record is extended (`cur`).
const MODE_PREFIX = 'rl:practice:v1:';
// An explicit theme choice made on a practice page: 'dark' or 'light'. Absent means paper.
const THEME_KEY = 'rl:practice:theme';

/* React 19 re-assigns `innerHTML` whenever the `dangerouslySetInnerHTML` OBJECT changes identity. One
   cached object per string keeps the model answer's markup (and its figure buttons) stable. */
const HTML = new Map();
const html = (str) => {
  const key = String(str ?? '');
  if (!HTML.has(key)) HTML.set(key, { __html: key });
  return HTML.get(key);
};

const PHONE = '(max-width: 980px)';
const WIDE = '(min-width: 1181px)';
const emptyAttempt = () => ({ draft: '', ticked: [], levels: {}, phase: 'attempt', time: 0 });
const matches = (q) => typeof window !== 'undefined' && window.matchMedia(q).matches;
const reducedMotion = () => matches('(prefers-reduced-motion: reduce)');
const OBJECTIVE = { K: 'Knowledge', App: 'Application', An: 'Analysis', E: 'Evaluation' };
const STRAND = { KAA: 'knowledge, application and analysis', E: 'evaluation' };

function readJSON(key) {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
function writeJSON(key, value) {
  try {
    window.localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value));
  } catch {
    /* private window or blocked storage: the page still works for this visit */
  }
}

/** Scroll the booklet (its own scroller on wide screens) or the window so `el` is in view. Never
 *  scrollIntoView: it scrolls every scrollable ancestor, the window included. */
function reveal(el) {
  if (!el) return;
  const behavior = reducedMotion() ? 'auto' : 'smooth';
  const box = el.closest('.psx-booklet');
  if (box && matches(WIDE)) {
    const r = el.getBoundingClientRect();
    const br = box.getBoundingClientRect();
    box.scrollTo({ top: box.scrollTop + (r.top - br.top) - br.height / 2, behavior });
    return;
  }
  const top = document.querySelector('.psx-top');
  const clear = (top && getComputedStyle(top).position === 'sticky' ? top.getBoundingClientRect().height : 0) + 80;
  window.scrollTo({ top: Math.max(0, el.getBoundingClientRect().top + window.scrollY - clear), behavior });
}

/* ── The source booklet ──────────────────────────────────────────────────────────────────────── */

function Parts({ parts, activeFig, onFigure, keyPrefix }) {
  return parts.map((p, i) =>
    p.kind === 'figure' ? (
      <button
        type="button"
        key={`${keyPrefix}-${i}`}
        className={activeFig === p.text ? 'ps-fig is-linked' : 'ps-fig'}
        data-fig-id={p.id}
        data-fig-text={p.text}
        onClick={(e) => onFigure(e, p.text, 'booklet')}
      >
        {p.text}
      </button>
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

function Booklet({ set, focusRows, activeFig, onFigure, textSize, setTextSize }) {
  const { extract } = set;
  return (
    <>
      <div className="psx-bhead">
        <span className="psx-small"><b>Source booklet</b>{` · ${set.extractLabel}`}</span>
        <span className="psx-textsize" role="group" aria-label="Text size" data-js-only="">
          <button type="button" aria-label="Smaller text" onClick={() => setTextSize(Math.max(-1, textSize - 1))}>A−</button>
          <button type="button" aria-label="Larger text" onClick={() => setTextSize(Math.min(3, textSize + 1))}>A+</button>
        </span>
      </div>
      <div className="psx-bbody">
        {extract.blocks.map((b, bi) =>
          b.kind === 'table' ? (
            <div className="psx-tblock" key={`b${bi}`}>
              {b.caption && (
                <p className="psx-tcap">
                  <Tokens tokens={b.caption} activeFig={activeFig} onFigure={onFigure} keyPrefix={`c${bi}`} />
                </p>
              )}
              <div className="psx-twrap">
                <table className="psx-table">
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
                          // `psx-tlabel` repeats the column heading inside the cell; it shows only when
                          // the table is too narrow for its columns and stacks one row per block (no
                          // sideways scroll at phone width, the no-cut-text rule).
                          const inner = (
                            <>
                              <span className="psx-tlabel">{(b.head || [])[c] || ''}</span>
                              <span className="psx-tval">
                                <Parts parts={cell} activeFig={activeFig} onFigure={onFigure} keyPrefix={`r${bi}-${r}-${c}`} />
                              </span>
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
            <p key={`b${bi}`}>
              <Tokens tokens={b.tokens} activeFig={activeFig} onFigure={onFigure} keyPrefix={`t${bi}`} />
            </p>
          ),
        )}
      </div>
    </>
  );
}

/* ── A question's own context: a sentence, a quoted statement or a small table (12.8, E061) ───── */

function Inline({ tokens, keyPrefix }) {
  return tokens.map((t, i) => {
    if (t.kind === 'strong') return <strong key={`${keyPrefix}-${i}`}>{t.text}</strong>;
    if (t.kind === 'em') return <em key={`${keyPrefix}-${i}`}>{t.text}</em>;
    return <span key={`${keyPrefix}-${i}`}>{t.text}</span>;
  });
}

function Context({ blocks, id, quote }) {
  return (
    <div className={quote ? 'psx-context is-quote' : 'psx-context'} id={id}>
      {blocks.map((b, bi) =>
        b.kind === 'table' ? (
          <div className="psx-tblock psx-ctable" key={`b${bi}`}>
            <div className="psx-twrap">
              <table className="psx-table">
                <thead>
                  <tr>{b.head.map((h, j) => <th key={`h${j}`} scope="col">{h}</th>)}</tr>
                </thead>
                <tbody>
                  {b.rows.map((row, r) => (
                    <tr key={`r${r}`}>
                      {row.map((cell, c) => {
                        const inner = (
                          <>
                            <span className="psx-tlabel">{b.head[c] || ''}</span>
                            <span className="psx-tval">{cell}</span>
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
          <p key={`b${bi}`}><Inline tokens={b.tokens} keyPrefix={`${id}-${bi}`} /></p>
        ),
      )}
    </div>
  );
}

function Stem({ item }) {
  return (
    <div className="psx-qline">
      <span className="psx-num">{item.label}</span>
      <p className="psx-stem">
        {item.stem.before}
        {item.stem.term ? <em>{item.stem.term}</em> : null}
        {item.stem.after}
      </p>
      <span className="psx-mk">{`(${item.marks})`}</span>
    </div>
  );
}

/* ── The mark scheme, in Pearson's two formats ───────────────────────────────────────────────── */

function PointsScheme({ item, interactive, ticked, onTick, onSee }) {
  return item.groups.map((g) => (
    <div className="psx-aogroup" key={g.band}>
      <p className="psx-ao">{g.band}</p>
      {g.items.map((c) => {
        const inputId = `psx-ck-${item.id}-${c.id}`;
        return (
          <div className={interactive ? 'psx-pt' : 'psx-pt is-ro'} key={c.id}>
            {interactive ? (
              <input type="checkbox" id={inputId} checked={ticked.includes(c.id)} onChange={() => onTick(c)} />
            ) : (
              <span className="psx-dot" aria-hidden="true">·</span>
            )}
            {interactive ? <label htmlFor={inputId}>{c.text}</label> : <span>{c.text}</span>}
            <button type="button" className="psx-see" onClick={() => onSee(c.seg)} data-js-only="">
              See it
            </button>
          </div>
        );
      })}
    </div>
  ));
}

function LevelsScheme({ item, interactive, chosen, onLevel }) {
  return item.scheme.map((st) => {
    const mark = chosen[st.strand] || 0;
    const on = st.levels.find((l) => mark >= l.lo && mark <= l.hi) || null;
    return (
      <div className="psx-strand" key={st.strand}>
        <p className="psx-ao">{`${st.name} · ${st.marks} marks`}</p>
        <table className="psx-levels">
          <tbody>
            {st.levels.map((l) => (
              <tr
                key={l.level}
                className={interactive && on && on.level === l.level ? 'is-on' : undefined}
                onClick={interactive ? () => onLevel(st.strand, on && on.level === l.level ? mark : l.lo) : undefined}
              >
                <td className="psx-lv">
                  {interactive ? (
                    <button
                      type="button"
                      aria-pressed={!!(on && on.level === l.level)}
                      onClick={(e) => { e.stopPropagation(); onLevel(st.strand, on && on.level === l.level ? mark : l.lo); }}
                    >
                      {`Level ${l.level}`}
                    </button>
                  ) : (
                    `Level ${l.level}`
                  )}
                </td>
                <td className="psx-band">{`${l.lo}–${l.hi}`}</td>
                <td>{l.descriptor}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {interactive && on ? (
          <div className="psx-pick" role="group" aria-label={`Your mark within Level ${on.level}`}>
            {Array.from({ length: on.hi - on.lo + 1 }, (_, k) => on.lo + k).map((m) => (
              <button type="button" key={m} aria-pressed={m === mark} onClick={() => onLevel(st.strand, m)}>
                {m}
              </button>
            ))}
          </div>
        ) : null}
        <p className="psx-small psx-lookfor">What examiners look for</p>
        <ul className="psx-indic">
          {st.indicative.map((t, i) => <li key={`i${i}`}>{t}</li>)}
        </ul>
      </div>
    );
  });
}

/* ── The model answer as an examiner's exemplar ──────────────────────────────────────────────── */

/** What the note under a highlighted sentence says, in words (never colour alone). */
function segNote(item, seg, { marking, ticked }) {
  if (item.marking === 'levels') {
    const strand = seg.strand ? `Counts towards ${STRAND[seg.strand] || seg.strand}.` : '';
    return { cls: 'is-earned', text: strand };
  }
  const crits = item.groups.flatMap((g) => g.items).filter((c) => c.seg === seg.id);
  if (!crits.length) return { cls: 'is-earned', text: '' };
  if (marking) {
    if (crits.some((c) => ticked.includes(c.id))) return { cls: 'is-earned', text: 'You made this point.' };
    if (crits.every((c) => c.segRole === 'missed')) {
      return { cls: 'is-missed', text: 'You missed this point, and so does the model answer. This is where it belongs.' };
    }
    return { cls: 'is-missed', text: 'You missed this point. This is how the model answer earns it.' };
  }
  if (crits.every((c) => c.segRole === 'missed')) {
    return { cls: 'is-missed', text: 'The model answer misses this point. This is where it belongs.' };
  }
  return { cls: 'is-earned', text: `This earns ${[...new Set(crits.map((c) => c.band.replace(/\s\d+$/, '').toLowerCase()))].join(' and ')}.` };
}

function Exemplar({ item, activeSeg, marking, ticked, onSeg, onFigure }) {
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
    <div className="psx-exemplar">
      <h3 className="psx-h3">
        Model answer <span className="psx-small">as an examiner would mark it</span>
      </h3>
      {item.diagram && (
        <figure className="psx-diagram" data-theme="light">
          <img src={item.diagram.src} alt={item.diagram.alt} width={item.diagram.width || undefined} height={item.diagram.height || undefined} loading="lazy" />
          <figcaption className="psx-small">
            <a href={item.diagram.src} target="_blank" rel="noopener">Open the diagram full size</a>
          </figcaption>
        </figure>
      )}
      {/* Clicks are delegated: the figure buttons live inside trusted segment HTML. */}
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
      <div className="psx-script" onClick={onClick}>
        {item.script.map((p) => {
          const lit = p.segments.find((s) => s.id === activeSeg) || null;
          const note = lit ? segNote(item, lit, { marking, ticked }) : null;
          return (
            <div className="psx-para" key={p.id}>
              <p>
                {p.segments.map((s, i) => {
                  const cls = ['psx-seg', s.id === activeSeg ? `is-lit ${note ? note.cls : ''}` : ''].join(' ').trim();
                  return (
                    <span key={s.id}>
                      {i > 0 ? ' ' : null}
                      <span className={cls} data-seg={s.id} dangerouslySetInnerHTML={html(s.html)} />
                    </span>
                  );
                })}
              </p>
              <span className="psx-margin">
                {p.margin.join(' · ')}
                {p.missed.length ? <span className="psx-margin-missed">{`${p.missed.join(' · ')} missed`}</span> : null}
              </span>
              {p.segments.map((s) => {
                const n = s.id === activeSeg ? note : segNote(item, s, { marking: false, ticked: [] });
                return (
                  <div
                    className={`psx-note ${n.cls}`}
                    key={`n-${s.id}`}
                    hidden={s.id !== activeSeg}
                    data-seg-note={s.id}
                    data-ps-noscript-show=""
                  >
                    {n.text ? <b>{n.text}</b> : null}
                    {n.text && s.note ? ' ' : null}
                    {s.note}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      <p className="psx-verdict">{item.verdict}</p>
      {item.examinerHtml && (
        <div className="psx-examiner">
          <b>Examiner’s comment</b>
          <div dangerouslySetInnerHTML={html(item.examinerHtml)} />
        </div>
      )}
    </div>
  );
}

/* ── The page ────────────────────────────────────────────────────────────────────────────────── */

export default function PracticeShell({ shell, children }) {
  const { pageKey, sets } = shell;
  const order = useMemo(() => sets.flatMap((s) => s.items.map((it) => ({ set: s, item: it }))), [sets]);
  const find = useCallback((id) => order.find((o) => o.item.id === id) || order[0], [order]);
  const { theme: siteTheme, toggleTheme } = useTheme();

  const [mode, setMode] = useState('practise');
  const [paper, setPaper] = useState('light');
  const [cur, setCur] = useState(order[0].item.id);
  const [attempts, setAttempts] = useState(() => Object.fromEntries(order.map(({ item }) => [item.id, emptyAttempt()])));
  const [essays, setEssays] = useState({});
  const [activeSeg, setActiveSeg] = useState(null);
  const [activeFig, setActiveFig] = useState(null);
  const [tab, setTab] = useState('paper');
  const [outlineOpen, setOutlineOpen] = useState(false);
  const [textSize, setTextSize] = useState(0);
  const [toast, setToast] = useState('');
  const [saved, setSaved] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const rootRef = useRef(null);
  const textareas = useRef({});
  const caret = useRef({});
  const dirty = useRef(new Set());
  const toastTimer = useRef(null);
  // Work that needs the NEXT render's DOM (scroll, focus). It runs in an effect after the commit, not
  // in requestAnimationFrame: rAF never fires in a hidden tab.
  const afterRender = useRef([]);
  const [, bump] = useState(0);
  const later = useCallback((fn) => {
    afterRender.current.push(fn);
    bump((n) => n + 1);
  }, []);
  useEffect(() => {
    afterRender.current.splice(0).forEach((fn) => fn());
  });

  const { set, item } = find(cur);
  const state = attempts[item.id];
  const study = mode === 'answers';
  const phase = study ? 'study' : state.phase;
  const chosenIn = (s) => (s.choice ? essays[s.id] || null : null);
  const picking = !study && !!set.choice && !chosenIn(set);
  const notChosen = !study && !!set.choice && !!chosenIn(set) && chosenIn(set) !== item.id;

  // Adopt what this browser already holds, after mount only (see HYDRATION above).
  useEffect(() => {
    const prefs = readJSON(MODE_PREFIX + pageKey) || {};
    if (prefs.mode === 'answers') setMode('answers');
    if (Number.isInteger(prefs.textSize)) setTextSize(Math.max(-1, Math.min(3, prefs.textSize)));
    if (typeof prefs.cur === 'string' && order.some((o) => o.item.id === prefs.cur)) setCur(prefs.cur);
    let chosenTheme = null;
    try { chosenTheme = window.localStorage.getItem(THEME_KEY); } catch { /* blocked */ }
    if (chosenTheme === 'dark') setPaper('dark');
    const got = {};
    for (const { item: it } of order) {
      const a = readAttempt(it.id);
      if (a) got[it.id] = { draft: a.draft, ticked: a.ticked, levels: a.levels || {}, phase: a.phase, time: a.time };
    }
    setAttempts((prev) => ({ ...prev, ...got }));
    // An essay section's choice: the one recorded, else the essay the student already started.
    const chosen = {};
    for (const s of sets) {
      if (!s.choice) continue;
      const rec = prefs.essays && prefs.essays[s.id];
      if (typeof rec === 'string' && s.items.some((it) => it.id === rec)) { chosen[s.id] = rec; continue; }
      const started = s.items.find((it) => got[it.id] && (got[it.id].phase !== 'attempt' || got[it.id].draft.trim()));
      if (started) chosen[s.id] = started.id;
    }
    setEssays(chosen);
    setLoaded(true);
  }, [pageKey, order, sets]);

  useEffect(() => {
    if (!loaded) return;
    const prev = readJSON(MODE_PREFIX + pageKey) || {};
    writeJSON(MODE_PREFIX + pageKey, { ...prev, mode, textSize, essays, cur });
  }, [loaded, pageKey, mode, textSize, essays, cur]);

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

  const toTop = useCallback(() => {
    const work = rootRef.current?.querySelector('.psx-desk');
    const top = rootRef.current?.querySelector('.psx-top');
    const sticky = top && getComputedStyle(top).position === 'sticky' ? top.getBoundingClientRect().height : 0;
    const y = work ? work.getBoundingClientRect().top + window.scrollY - sticky : 0;
    if (window.scrollY > y) window.scrollTo({ top: Math.max(0, y), behavior: 'auto' });
  }, []);

  const go = useCallback((id) => {
    if (!id || id === cur) return;
    setCur(id);
    setActiveSeg(null);
    setActiveFig(null);
    setTab('paper');
    setOutlineOpen(false);
    setSaved(false);
    later(toTop);
  }, [cur, later, toTop]);

  const idx = order.findIndex((o) => o.item.id === cur);
  const prevQ = order[idx - 1] || null;
  const nextQ = order[idx + 1] || null;

  // ← → walk the whole paper in order, inert while typing and when focus is outside the page.
  const keyState = useRef({});
  keyState.current = { prevQ, nextQ, go };
  useEffect(() => {
    const onKey = (e) => {
      const t = e.target;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (t instanceof Element && t.matches('textarea, input:not([type=checkbox]), select, [contenteditable="true"]')) return;
      if (!(t === document.body || (rootRef.current && rootRef.current.contains(t)))) return;
      const k = keyState.current;
      if (e.key === 'ArrowRight' && k.nextQ) { e.preventDefault(); k.go(k.nextQ.item.id); }
      if (e.key === 'ArrowLeft' && k.prevQ) { e.preventDefault(); k.go(k.prevQ.item.id); }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  // The answer space grows with its text (E066) and is never shorter than its ruled lines: fit the
  // visible box after every render (a draft restored from storage, a question just opened, a quote
  // inserted) and whenever the width changes, so no line of a draft is ever hidden below its edge.
  const fitBoxes = useCallback(() => {
    if (typeof CSS !== 'undefined' && CSS.supports && CSS.supports('field-sizing', 'content')) return;
    rootRef.current?.querySelectorAll('textarea.psx-lined').forEach((el) => {
      if (el.offsetParent === null) return;
      el.style.height = 'auto';
      el.style.height = `${Math.max(el.scrollHeight, parseFloat(getComputedStyle(el).minHeight) || 0)}px`;
    });
  }, []);
  useEffect(() => { fitBoxes(); });
  useEffect(() => {
    window.addEventListener('resize', fitBoxes);
    // Only a change of WIDTH re-flows a draft; reacting to height would re-fit on its own growth.
    let lastW = -1;
    const ro = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver((entries) => {
      const w = Math.round(entries[0].contentRect.width);
      if (w !== lastW) { lastW = w; fitBoxes(); }
    });
    if (ro && rootRef.current) ro.observe(rootRef.current);
    return () => { window.removeEventListener('resize', fitBoxes); ro?.disconnect(); };
  }, [fitBoxes]);

  // Figures inside the model-answer HTML are not React-managed; mark the linked one by hand.
  useEffect(() => {
    rootRef.current?.querySelectorAll('.psx-script .ps-fig').forEach((el) => {
      el.classList.toggle('is-linked', !!activeFig && el.dataset.figText === activeFig);
    });
  }, [activeFig, cur, phase]);

  const scoreOf = (it, a) => {
    if (a.phase !== 'marking') return null;
    if (it.marking === 'levels') return it.scheme.reduce((n, st) => n + (a.levels[st.strand] || 0), 0);
    return it.groups.reduce((n, g) => n + g.items.reduce((m, c) => (a.ticked.includes(c.id) ? m + c.marks : m), 0), 0);
  };

  // THE one total (E065): marked questions of the paper, the chosen essay only; More practice is not
  // part of the paper and is not counted.
  let got = 0;
  let of = 0;
  for (const s of sets) {
    if (!s.inPaper) continue;
    for (const it of s.items) {
      if (s.choice && chosenIn(s) !== it.id) continue;
      const g = scoreOf(it, attempts[it.id]);
      if (g === null) continue;
      got += g;
      of += it.marks;
    }
  }

  const stateText = (s, it) => {
    if (study) return '';
    const a = attempts[it.id];
    const g = scoreOf(it, a);
    if (g !== null) return `${g}/${it.marks}`;
    if (a.phase === 'revealed') return 'answer seen';
    if (a.draft.trim()) return 'draft';
    return '';
  };

  /* ── actions ── */

  const mark = () => {
    if (!item.draw && !state.draft.trim()) {
      say('Write your answer first, or show the model answer.');
      return;
    }
    update(item.id, { phase: 'marking' });
    setActiveSeg(null);
  };
  const showAnswer = () => { update(item.id, { phase: 'revealed' }); setActiveSeg(null); };
  const edit = () => {
    update(item.id, { phase: 'attempt' });
    later(() => textareas.current[item.id]?.focus({ preventScroll: true }));
  };
  const choose = (s, it) => {
    setEssays((prev) => ({ ...prev, [s.id]: it.id }));
    setCur(it.id);
    later(toTop);
  };
  const tick = (c) => {
    update(item.id, (prev) => ({
      ticked: prev.ticked.includes(c.id) ? prev.ticked.filter((x) => x !== c.id) : [...prev.ticked, c.id],
    }));
    setActiveSeg(c.seg);
  };
  const setLevel = (strand, m) => {
    update(item.id, (prev) => ({ levels: { ...prev.levels, [strand]: m } }));
  };
  const see = (segId) => {
    setActiveSeg(segId);
    later(() => reveal(rootRef.current?.querySelector(`.psx-q[data-item="${item.id}"] [data-seg="${segId}"]`)));
  };
  const toggleSeg = (segId) => setActiveSeg((prev) => (prev === segId ? null : segId));

  const quote = (text) => {
    const ta = textareas.current[item.id];
    const value = state.draft;
    const [a, b] = ta && ta.value === value ? [ta.selectionStart, ta.selectionEnd] : caret.current[item.id] || [value.length, value.length];
    const before = value.slice(0, a);
    const after = value.slice(b);
    const ins = (before && !/\s$/.test(before) ? ' ' : '') + text + (after && !/^[\s.,;:]/.test(after) ? ' ' : '');
    const pos = (before + ins).length;
    caret.current[item.id] = [pos, pos];
    update(item.id, { draft: before + ins + after });
    setSaved(true);
    later(() => {
      if (!ta) return;
      ta.focus({ preventScroll: true });
      ta.setSelectionRange(pos, pos);
    });
  };

  const onFigure = (e, text, from) => {
    e.stopPropagation();
    const writing = !study && state.phase === 'attempt' && !item.draw && !picking && !notChosen;
    if (from === 'booklet' && writing && set.kind === 'extract') {
      quote(text);
      say(`Quoted ${text}`);
      if (matches(PHONE)) setTab('paper');
      return;
    }
    const next = activeFig === text ? null : text;
    setActiveFig(next);
    if (!next) return;
    const root = rootRef.current;
    const target = from === 'booklet'
      ? root?.querySelector(`.psx-q[data-item="${item.id}"] .psx-script .ps-fig[data-fig-text="${CSS.escape(text)}"]`)
      : root?.querySelector(`.psx-booklet .ps-fig[data-fig-text="${CSS.escape(text)}"]`);
    const visible = target && target.closest('[hidden]') === null;
    if (!visible) {
      if (from === 'booklet') say(phase === 'attempt' ? 'Mark your answer to see where the model answer uses it.' : 'The model answer for this part does not use that figure.');
      return;
    }
    if (matches(PHONE)) setTab(from === 'booklet' ? 'paper' : 'booklet');
    later(() => reveal(target));
  };

  const switchTab = (t) => {
    if (t === tab) return;
    setTab(t);
    later(toTop);
  };

  const pickTheme = () => {
    const next = paper === 'dark' ? 'light' : 'dark';
    setPaper(next);
    writeJSON(THEME_KEY, next);
    if (siteTheme !== next) toggleTheme();
  };

  const bookletSet = sets.find((s) => s.kind === 'extract') || null;
  const showBooklet = !!bookletSet && set.id === bookletSet.id;
  const where = `${set.label} · ${set.inPaper && !item.part ? `Question ${item.short}` : item.short}`;
  const focusRows = showBooklet && phase !== 'attempt' ? item.focusRows : [];
  const bsize = `${15.5 + textSize * 1.5}px`;

  return (
    <div ref={rootRef} className={study ? 'psx is-study' : 'psx'} data-theme={paper} style={{ '--psx-bsize': bsize }}>
      <noscript>
        <style>{'.psx [data-ps-noscript-show][hidden]{display:block!important}.psx [data-js-only]{display:none!important}.psx .psx-booklet[hidden]{display:block!important}.psx .psx-sec[hidden],.psx .psx-q[hidden]{display:block!important}.psx .psx-sec+.psx-sec{margin-top:32px}.psx .psx-q+.psx-q{margin-top:28px}'}</style>
      </noscript>

      <header className="psx-top">
        <a className="psx-logo" href={shell.appHref} title="Back to Revvy Learn">
          <img src="/logo.svg" width={28} height={28} alt="" />
          <span className="psx-name">Revvy Learn</span>
        </a>
        <nav className="psx-crumb" aria-label="Breadcrumb">
          {shell.crumbs.map((c) => (
            <span className={c.href ? 'psx-crumb-i is-wide' : 'psx-crumb-i'} key={c.label}>
              {c.href ? <Link href={c.href}>{c.label}</Link> : <span>{c.label}</span>}
              <span className="psx-sep" aria-hidden="true">/</span>
            </span>
          ))}
          <h1 className="psx-h1">
            {shell.headingLead}
            {shell.headingRest ? <span className="psx-h1-rest">{shell.headingRest}</span> : null}
          </h1>
        </nav>
        <span className="psx-grow" />
        <div className="psx-mode" role="group" aria-label="How to use this paper" data-js-only="">
          <button type="button" aria-pressed={!study} onClick={() => { setMode('practise'); setActiveSeg(null); }}>Practise</button>
          <button type="button" aria-pressed={study} onClick={() => { setMode('answers'); setActiveSeg(null); }}>Model answers</button>
        </div>
        <button type="button" className="psx-theme" aria-label={paper === 'dark' ? 'Switch to paper' : 'Switch to dark'} aria-pressed={paper === 'dark'} onClick={pickTheme} data-js-only="">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /></svg>
        </button>
      </header>

      <div className="psx-desk">
        <div className="psx-mbar" data-js-only="">
          <button type="button" aria-expanded={outlineOpen} aria-controls="psx-outline" onClick={() => setOutlineOpen((v) => !v)}>
            <span>{where}</span>
            <span className="psx-small">All questions <span aria-hidden="true">▾</span></span>
          </button>
        </div>

        <nav className={outlineOpen ? 'psx-outline is-open' : 'psx-outline'} id="psx-outline" aria-label="Paper outline" data-js-only="">
          {shell.sectionA && (
            <div className="psx-osec">
              <h2 className="psx-oh">{shell.sectionA.label} <span>{`${shell.sectionA.what} · ${shell.sectionA.total}`}</span></h2>
              <p className="psx-onote">{shell.sectionA.lead}</p>
              <p className="psx-onote">
                <Link className="psx-olink" href={shell.sectionA.href}>{shell.sectionA.linkText}</Link>
                {` ${shell.sectionA.note}`}
              </p>
            </div>
          )}
          {sets.filter((s) => s.inPaper).map((s) => (
            <div className="psx-osec" key={s.id}>
              <h2 className="psx-oh">{s.label} <span>{`${s.what} · ${s.total}`}</span></h2>
              {s.choice ? <p className="psx-onote">{`Answer one of ${s.choice.offered === 2 ? 'two' : s.choice.offered}.`}</p> : null}
              {s.items.map((it) => {
                const st = stateText(s, it);
                const off = !study && s.choice && chosenIn(s) && chosenIn(s) !== it.id;
                const done = scoreOf(it, attempts[it.id]) !== null && !study;
                return (
                  <button
                    type="button"
                    key={it.id}
                    className={['psx-oq', done ? 'is-done' : '', off ? 'is-off' : ''].join(' ').trim()}
                    aria-current={cur === it.id ? 'true' : undefined}
                    onClick={() => go(it.id)}
                  >
                    <span className="psx-on">{it.railLabel}</span>
                    <span>{`${it.commandWord} ${it.marks}`}</span>
                    <span className="psx-os">{st}</span>
                  </button>
                );
              })}
            </div>
          ))}
          {study ? (
            <p className="psx-ototal psx-small">Model answers mode: every answer and mark scheme is open. Nothing is scored.</p>
          ) : (
            <p className="psx-ototal" aria-live="polite">
              Your marks so far
              <br />
              <b>{got}</b>
              <span className="psx-small">{` of ${of} marked · paper out of ${shell.paperTotal}`}</span>
            </p>
          )}
          {sets.filter((s) => !s.inPaper).map((s) => (
            <div className="psx-osec" key={s.id}>
              <h2 className="psx-oh">{s.label} <span>{s.what}</span></h2>
              {s.items.map((it) => (
                <button
                  type="button"
                  key={it.id}
                  className={['psx-oq', !study && scoreOf(it, attempts[it.id]) !== null ? 'is-done' : ''].join(' ').trim()}
                  aria-current={cur === it.id ? 'true' : undefined}
                  onClick={() => go(it.id)}
                >
                  <span className="psx-on">{it.railLabel}</span>
                  <span>{`${it.commandWord} ${it.marks}`}</span>
                  <span className="psx-os">{stateText(s, it)}</span>
                </button>
              ))}
            </div>
          ))}
        </nav>

        <main className={showBooklet ? 'psx-work with-booklet' : 'psx-work'}>
          {bookletSet && (
            <div className="psx-mtabs" role="tablist" aria-label="View" hidden={!showBooklet} data-js-only="">
              <button type="button" role="tab" aria-selected={tab === 'paper'} onClick={() => switchTab('paper')}>Question paper</button>
              <button type="button" role="tab" aria-selected={tab === 'booklet'} onClick={() => switchTab('booklet')}>Source booklet</button>
            </div>
          )}

          {bookletSet && (
            <section
              className="psx-sheet psx-booklet"
              aria-label="Source booklet"
              hidden={!showBooklet}
              data-tab={tab === 'booklet' ? 'on' : 'off'}
            >
              <Booklet set={bookletSet} focusRows={focusRows} activeFig={activeFig} onFigure={onFigure} textSize={textSize} setTextSize={setTextSize} />
            </section>
          )}

          <section className="psx-sheet psx-qpaper" aria-label="Question paper" data-tab={showBooklet && tab === 'booklet' ? 'off' : 'on'}>
            {sets.map((s) => {
              const current = s.id === set.id;
              const pickHere = !study && !!s.choice && !chosenIn(s);
              return (
                <div className="psx-sec" key={s.id} hidden={!current} data-ps-noscript-show="">
                  <div className="psx-sechead">
                    <h2>{s.label}</h2>
                    <span className="psx-small">{s.inPaper ? `${s.what} · ${s.total} marks` : s.what}</span>
                  </div>
                  <div className="psx-instr">
                    {s.instructions.map((t) => <p key={t}>{t}</p>)}
                  </div>

                  {s.choice && (
                    <div className="psx-pickessay" hidden={!(current && pickHere)} data-js-only="">
                      {s.items.map((it) => (
                        <div className="psx-essaycard" key={it.id}>
                          {it.context && <Context blocks={it.context} id={`psx-pick-${it.id}`} quote />}
                          <Stem item={it} />
                          <div className="psx-qbody">
                            <button type="button" className="psx-btn is-primary" onClick={() => choose(s, it)}>Answer this question</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {s.items.map((it, i) => {
                    const a = attempts[it.id];
                    const isCur = current && it.id === cur && !(pickHere && current);
                    const p = study ? 'study' : a.phase;
                    const other = !study && s.choice && chosenIn(s) && chosenIn(s) !== it.id;
                    const g = scoreOf(it, a);
                    const lastPart = s.closing && i === s.items.length - 1;
                    return (
                      <article className="psx-q" data-item={it.id} key={it.id} hidden={!isCur} data-ps-noscript-show="">
                        {it.context && <Context blocks={it.context} id={`psx-ctx-${it.id}`} quote={s.paperKind === 'essay'} />}
                        <Stem item={it} />
                        <div className="psx-qbody">
                          {other ? (
                            <div className="psx-under" data-js-only="">
                              <span className="psx-small">{`You chose question ${s.items.find((x) => x.id === chosenIn(s)).short}. Only one question from this section counts.`}</span>
                              <button type="button" className="psx-btn is-quiet" onClick={() => choose(s, it)}>Answer this question instead</button>
                            </div>
                          ) : null}

                          {!other && p === 'attempt' && (
                            <div data-js-only="">
                              {it.draw ? (
                                <div className="psx-draw">
                                  <b>Draw this on paper.</b>
                                  <span>Label your axes and curves as you would in the exam, then mark your diagram against the mark scheme.</span>
                                  <div className="psx-actions">
                                    <button type="button" className="psx-btn is-quiet" onClick={showAnswer}>Show the model answer</button>
                                    <button type="button" className="psx-btn is-primary" onClick={mark}>I’ve drawn it: mark it</button>
                                  </div>
                                </div>
                              ) : (
                                <>
                                  <textarea
                                    ref={(el) => { textareas.current[it.id] = el; }}
                                    className="psx-lined"
                                    aria-label={`Your answer to question ${it.short}`}
                                    style={{ '--psx-lines': it.lines }}
                                    value={a.draft}
                                    spellCheck
                                    onChange={(e) => {
                                      update(it.id, { draft: e.target.value });
                                      setSaved(true);
                                    }}
                                    onSelect={(e) => { caret.current[it.id] = [e.currentTarget.selectionStart, e.currentTarget.selectionEnd]; }}
                                  />
                                  <div className="psx-under">
                                    <span className="psx-saved" aria-live="polite">{saved && isCur && a.draft.trim() ? 'Saved' : ''}</span>
                                    <div className="psx-actions">
                                      <button type="button" className="psx-btn is-quiet" onClick={showAnswer}>Show the model answer</button>
                                      <button type="button" className="psx-btn is-primary" onClick={mark}>Mark my answer</button>
                                    </div>
                                  </div>
                                </>
                              )}
                            </div>
                          )}

                          {!other && (p === 'marking' || p === 'revealed') && !it.draw && a.draft.trim() ? (
                            <>
                              {/* A marked answer is a ruled block that grows with its text (E066), never a
                                  fixed-height box: the text-fit sweep's VCLIP check fails the other kind. */}
                              <div className="psx-yours" aria-label="Your answer">{a.draft}</div>
                              <div className="psx-under">
                                <span className="psx-small">Your answer</span>
                                <button type="button" className="psx-btn is-quiet" onClick={edit}>Edit my answer</button>
                              </div>
                            </>
                          ) : null}

                          <div className="psx-markblock" hidden={p === 'attempt' || !!other} data-ps-noscript-show="">
                            <h3 className="psx-h3">
                              Mark scheme
                              {p === 'marking' ? (
                                <span className="psx-score" aria-live="polite">{g}<small>{` / ${it.marks}`}</small></span>
                              ) : (
                                <span className="psx-small">{p === 'revealed' ? 'not marked' : `${it.marks} marks`}</span>
                              )}
                            </h3>
                            {p === 'marking' ? (
                              <p className="psx-small psx-how">
                                {it.marking === 'points'
                                  ? 'Tick each point your answer makes.'
                                  : 'Choose the level your answer reaches in each part, then a mark within it.'}
                              </p>
                            ) : null}
                            {it.marking === 'points' ? (
                              <PointsScheme item={it} interactive={p === 'marking'} ticked={a.ticked} onTick={tick} onSee={see} />
                            ) : (
                              <LevelsScheme item={it} interactive={p === 'marking'} chosen={a.levels} onLevel={setLevel} />
                            )}
                            {p === 'revealed' && (it.draw || a.draft.trim()) ? (
                              <div className="psx-actions psx-after" data-js-only="">
                                <button type="button" className="psx-btn is-quiet" onClick={() => update(it.id, { phase: 'marking' })}>Mark my answer after all</button>
                              </div>
                            ) : null}
                          </div>

                          <div className="psx-exblock" hidden={p === 'attempt' || !!other} data-ps-noscript-show="">
                            <Exemplar
                              item={it}
                              activeSeg={isCur ? activeSeg : null}
                              marking={p === 'marking'}
                              ticked={a.ticked}
                              onSeg={toggleSeg}
                              onFigure={onFigure}
                            />
                          </div>
                        </div>
                        {lastPart ? <p className="psx-total">{s.closing}</p> : null}
                      </article>
                    );
                  })}
                </div>
              );
            })}

            <div className="psx-pager" data-js-only="">
              <button type="button" disabled={!prevQ} onClick={() => prevQ && go(prevQ.item.id)}>
                {prevQ ? `← ${prevQ.item.short}` : '←'}
              </button>
              <button type="button" className="psx-next" disabled={!nextQ} onClick={() => nextQ && go(nextQ.item.id)}>
                {nextQ ? `${nextQ.item.short}${nextQ.set.inPaper ? ` ${nextQ.item.commandWord}` : ''} →` : 'End of paper'}
              </button>
            </div>
          </section>

          <p className="psx-appline">
            <a href={shell.appHref}>{shell.appLine}</a>
          </p>
          {children}
        </main>
      </div>

      <div className={toast ? 'psx-toast is-show' : 'psx-toast'} role="status" aria-live="polite">{toast}</div>
    </div>
  );
}
