import Link from 'next/link';
import { createServerClient } from '@/lib/supabase-server';
import { SURFACES, CATEGORIES, TOPICS, REASONS } from '@/lib/feedback/taxonomy';
import {
  ACTIVE, parseFilters, listIssues, issueDetail, inboxCounts, listFeedback, topicRatings, tablesReady,
} from '@/lib/feedback/admin-queries';
import InboxActions from '@/components/admin/InboxActions';

/**
 * /admin/inbox — content issues, general feedback and topic ratings in one place.
 *
 * Built like the other admin pages: the layout has already checked app_metadata.role, reads use the
 * service-role client, and every filter is a URL search param so a view can be linked to. Writes go
 * through PATCH /api/admin/inbox/:id (components/admin/InboxActions.jsx).
 */

export const metadata = { title: 'Inbox — Admin — Revvy Learn' };

const C = { line: '#2a3045', soft: '#1f2536', text: '#e8ecf5', dim: '#cdd4e6', muted: '#8892a8', faint: '#7f8daa', card: '#161a27', panel: '#151a28', sel: '#182033', green: '#10b981' };
const SEV = { critical: '#d03b3b', high: '#ec835a', medium: '#fab219', low: '#8892a8' };
const S = {
  h1: { fontSize: 22, fontWeight: 700, color: C.text, margin: 0 },
  sub: { fontSize: 13, color: C.muted, margin: '4px 0 18px' },
  kpis: { display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 10 },
  kpi: { display: 'grid', gap: 2, padding: '12px 14px', border: `1px solid ${C.line}`, borderRadius: 10, background: C.card, color: C.text, textDecoration: 'none' },
  kpiL: { fontSize: 12, color: '#9aa4b9' },
  kpiV: { fontSize: 24, fontWeight: 600, lineHeight: 1.2 },
  kpiN: { fontSize: 11.5, color: C.muted },
  tabs: { display: 'flex', gap: 18, marginTop: 18, borderBottom: `1px solid ${C.line}` },
  tab: (on) => ({ padding: '8px 0', color: on ? C.text : C.muted, textDecoration: 'none', fontSize: 13, boxShadow: on ? `inset 0 -2px 0 ${C.green}` : 'none' }),
  form: { display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center', margin: '12px 0' },
  check: { display: 'inline-flex', gap: 4, alignItems: 'center', fontSize: 12, color: '#9aa4b9' },
  select: { padding: '5px 8px', borderRadius: 6, border: `1px solid ${C.line}`, background: '#151825', color: C.dim, fontSize: 12 },
  search: { padding: '5px 10px', borderRadius: 6, border: `1px solid ${C.line}`, background: '#151825', color: C.text, fontSize: 12, minWidth: 180 },
  apply: { padding: '5px 12px', borderRadius: 6, border: `1px solid ${C.green}`, background: C.green, color: '#0f1117', fontSize: 12, fontWeight: 600, cursor: 'pointer' },
  split: { display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 400px', gap: 14, alignItems: 'start' },
  table: { width: '100%', borderCollapse: 'collapse', fontSize: 13 },
  th: { textAlign: 'left', fontSize: 10.5, letterSpacing: '.05em', textTransform: 'uppercase', color: C.faint, padding: '6px 8px', borderBottom: `1px solid ${C.line}`, whiteSpace: 'nowrap' },
  td: { padding: '9px 8px', borderBottom: `1px solid ${C.soft}`, verticalAlign: 'top', color: C.dim },
  rowLink: { color: C.text, textDecoration: 'none', fontWeight: 500 },
  meta: { color: C.muted, fontSize: 12, marginTop: 2 },
  detail: { border: `1px solid ${C.line}`, borderRadius: 10, background: C.panel, padding: 14, display: 'grid', gap: 12, position: 'sticky', top: 0 },
  h5: { margin: 0, fontSize: 10.5, letterSpacing: '.05em', textTransform: 'uppercase', color: C.faint, fontWeight: 500 },
  snap: { border: `1px solid ${C.line}`, borderRadius: 8, padding: 10, background: '#0f1320' },
  opt: (key) => ({ display: 'flex', justifyContent: 'space-between', gap: 8, padding: '4px 6px', borderRadius: 5, fontSize: 12, color: C.dim, background: key ? 'rgba(16,185,129,.12)' : 'transparent' }),
  rep: { borderTop: `1px solid #232a3c`, paddingTop: 8, fontSize: 12 },
  pill: { fontSize: 10, fontWeight: 600, padding: '1px 6px', borderRadius: 4, background: 'rgba(16,185,129,.16)', color: '#6ee7b7', marginLeft: 4 },
  warn: { borderLeft: '3px solid #fab219', padding: '6px 10px', background: 'rgba(250,178,25,.08)', color: C.text, fontSize: 12, borderRadius: '0 6px 6px 0' },
  links: { display: 'flex', flexWrap: 'wrap', gap: 12, fontSize: 12 },
  a: { color: '#6ee7b7' },
  empty: { padding: '28px 0', color: C.muted, fontSize: 13 },
};

const STATUS_LABEL = { open: 'Open', in_review: 'In review', fix_staged: 'Fix staged', resolved: 'Resolved', ignored: 'Closed' };
const one = (v) => (Array.isArray(v) ? v[0] : v);
const unitNumber = (code) => code?.match(/(\d)$/)?.[1] ?? null;
const topicHref = (i) => (i.subject && unitNumber(i.unit_code) && i.section_id ? `/${i.subject}/unit-${unitNumber(i.unit_code)}/${i.section_id}` : null);
const norm = (s) => String(s || '').toLowerCase().replace(/\s+/g, ' ').trim();

function ago(ts) {
  const s = Math.max(0, (Date.now() - Date.parse(ts)) / 1000);
  if (s < 3600) return `${Math.max(1, Math.round(s / 60))}m`;
  if (s < 86400) return `${Math.round(s / 3600)}h`;
  return `${Math.round(s / 86400)}d`;
}

function Sev({ level }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, color: C.text, whiteSpace: 'nowrap' }}>
      <i style={{ width: 8, height: 8, borderRadius: 2, display: 'inline-block', background: SEV[level] || C.muted }} />
      {level ? level[0].toUpperCase() + level.slice(1) : '–'}
    </span>
  );
}

/** Keep the current filters when a row or tab link changes one thing. */
function withParams(sp, patch) {
  const p = new URLSearchParams();
  for (const [k, v] of Object.entries(sp)) {
    if (v == null || k in patch) continue;
    (Array.isArray(v) ? v : [v]).forEach((x) => p.append(k, x));
  }
  for (const [k, v] of Object.entries(patch)) if (v != null) p.set(k, v);
  const q = p.toString();
  return q ? `/admin/inbox?${q}` : '/admin/inbox';
}

export default async function InboxPage({ searchParams }) {
  const sp = await searchParams;
  const view = ['issues', 'feedback', 'ratings'].includes(one(sp.view)) ? one(sp.view) : 'issues';
  const db = createServerClient();

  if (!(await tablesReady(db))) {
    return (
      <div>
        <h1 style={S.h1}>Inbox</h1>
        <p style={S.sub}>The feedback tables do not exist yet.</p>
        <div style={S.warn}>
          Run <code>scripts/create-feedback-tables.sql</code> in the Supabase SQL editor with nothing selected, then
          reload. Until then the student routes answer 503 and the report sheet says it could not send.
        </div>
      </div>
    );
  }

  const counts = await inboxCounts(db);

  return (
    <div style={{ maxWidth: 1400 }}>
      <h1 style={S.h1}>Inbox</h1>
      <p style={S.sub}>Problems students report on items, what they tell us after a finished task, and how useful they rate each topic.</p>

      <div style={S.kpis}>
        {/* The queue is already sorted worst first, so the open queue IS the urgent view. */}
        <Link style={S.kpi} href="/admin/inbox">
          <span style={S.kpiL}>Urgent, not fixed</span><span style={S.kpiV}>{counts.urgent}</span><span style={S.kpiN}>critical and high</span>
        </Link>
        <Link style={S.kpi} href={withParams({}, { view: 'issues', status: 'fix_staged' })}>
          <span style={S.kpiL}>Awaiting publish</span><span style={S.kpiV}>{counts.awaitingPublish}</span><span style={S.kpiN}>fixed in draft, old version still live</span>
        </Link>
        <Link style={S.kpi} href="/admin/inbox">
          <span style={S.kpiL}>Reported again</span><span style={S.kpiV}>{counts.reportedAgain}</span><span style={S.kpiN}>after a fix went live</span>
        </Link>
        <Link style={S.kpi} href={withParams({}, { view: 'feedback' })}>
          <span style={S.kpiL}>Feedback to read</span><span style={S.kpiV}>{counts.feedbackOpen}</span><span style={S.kpiN}>messages, not bare ratings</span>
        </Link>
      </div>

      <nav style={S.tabs} aria-label="Inbox views">
        <Link href="/admin/inbox" style={S.tab(view === 'issues')}>Content issues</Link>
        <Link href="/admin/inbox?view=feedback" style={S.tab(view === 'feedback')}>Feedback</Link>
        <Link href="/admin/inbox?view=ratings" style={S.tab(view === 'ratings')}>Topic ratings</Link>
      </nav>

      {view === 'issues' && <Issues db={db} sp={sp} />}
      {view === 'feedback' && <Feedback db={db} sp={sp} />}
      {view === 'ratings' && <Ratings db={db} />}
    </div>
  );
}

async function Issues({ db, sp }) {
  const f = parseFilters(sp);
  const statuses = f.statuses.length ? f.statuses : ACTIVE;
  const { rows, total, pageSize } = await listIssues(db, f);
  const selectedId = Number.parseInt(one(sp.id), 10) || null;
  const selected = selectedId ? await issueDetail(db, selectedId) : null;

  return (
    <>
      <form method="get" action="/admin/inbox" style={S.form}>
        {['open', 'in_review', 'fix_staged', 'resolved', 'ignored'].map((st) => (
          <label key={st} style={S.check}>
            <input type="checkbox" name="status" value={st} defaultChecked={statuses.includes(st)} />
            {STATUS_LABEL[st]}
          </label>
        ))}
        <select name="severity" defaultValue={f.severity || ''} style={S.select} aria-label="Severity">
          <option value="">Any severity</option>
          {['critical', 'high', 'medium', 'low'].map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <select name="subject" defaultValue={f.subject || ''} style={S.select} aria-label="Subject">
          <option value="">Any subject</option><option value="economics">Economics</option><option value="business">Business</option>
        </select>
        <select name="unit" defaultValue={f.unit || ''} style={S.select} aria-label="Unit">
          <option value="">Any unit</option>
          {['WEC11', 'WEC12', 'WEC13', 'WEC14', 'WBS11', 'WBS12', 'WBS13', 'WBS14'].map((u) => <option key={u} value={u}>{u}</option>)}
        </select>
        <select name="surface" defaultValue={f.surface || ''} style={S.select} aria-label="Where it was reported">
          <option value="">Anywhere</option>
          {Object.entries(SURFACES).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
        </select>
        <input name="q" defaultValue={f.q || ''} placeholder="Search item text" style={S.search} aria-label="Search item text" />
        <button type="submit" style={S.apply}>Apply</button>
        <span style={{ fontSize: 12, color: C.muted, marginLeft: 'auto' }}>{total} {total === 1 ? 'issue' : 'issues'}</span>
      </form>

      <div style={S.split}>
        <div>
          {rows.length === 0 ? (
            <p style={S.empty}>Nothing matches. {statuses.every((s) => ACTIVE.includes(s)) ? 'No open issues: every report so far is dealt with.' : ''}</p>
          ) : (
            <table style={S.table}>
              <thead><tr><th style={S.th}>Severity</th><th style={S.th}>Item</th><th style={S.th}>Reports</th><th style={S.th}>Last</th><th style={S.th}>Status</th></tr></thead>
              <tbody>
                {rows.map((i) => {
                  const on = i.id === selectedId;
                  return (
                    <tr key={i.id} style={on ? { background: C.sel } : undefined}>
                      <td style={{ ...S.td, boxShadow: on ? `inset 2px 0 0 ${C.green}` : 'none' }}><Sev level={i.severity} /></td>
                      <td style={S.td}>
                        <Link href={withParams(sp, { id: String(i.id) })} style={S.rowLink}>{i.item_title || i.item_key}</Link>
                        <div style={S.meta}>
                          {SURFACES[i.surface]?.label ?? i.surface} · {i.section_id ?? 'unknown section'}{i.unit_code ? ` · ${i.unit_code} ${i.spec_ref ?? ''}` : ''}
                          {i.reopened_from && <span style={{ color: '#f5c46b' }}> · reported again after a fix</span>}
                        </div>
                      </td>
                      <td style={{ ...S.td, whiteSpace: 'nowrap' }}>{i.report_count} · {i.reporter_count} {i.reporter_count === 1 ? 'student' : 'students'}</td>
                      <td style={{ ...S.td, whiteSpace: 'nowrap' }}>{ago(i.last_reported_at)}</td>
                      <td style={{ ...S.td, whiteSpace: 'nowrap' }}>{STATUS_LABEL[i.status]}{i.ledger_id && <div style={S.meta}>ledger {i.ledger_id}</div>}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
          {total > pageSize && (
            <div style={{ display: 'flex', gap: 12, marginTop: 10, fontSize: 12 }}>
              {f.page > 0 && <Link style={S.a} href={withParams(sp, { page: String(f.page - 1), id: null })}>← Newer</Link>}
              {(f.page + 1) * pageSize < total && <Link style={S.a} href={withParams(sp, { page: String(f.page + 1), id: null })}>Older →</Link>}
            </div>
          )}
        </div>
        <div>{selected ? <IssueDetail issue={selected} /> : <p style={S.empty}>Choose an issue to see what students were served and what they said.</p>}</div>
      </div>
    </>
  );
}

function IssueDetail({ issue }) {
  const reports = issue.content_reports || [];
  const latest = reports[0];
  const snap = latest?.item_snapshot;
  const chosenCount = (text) => reports.filter((r) => r.answer?.chosen && norm(r.answer.chosen) === norm(text)).length;
  const saw = latest?.rendered?.stem;
  const staleView = saw && snap?.question && norm(saw) !== norm(snap.question);
  const href = topicHref(issue);
  const ledgerCmd = `node audit/scripts/ledger.mjs add <packet> S${issue.id} "${(issue.item_title || issue.item_key).replace(/"/g, "'").slice(0, 80)}" --file ${issue.section_id ?? ''}`;

  return (
    <aside style={S.detail} aria-label="Issue detail">
      <div>
        <Sev level={issue.severity} />
        <span style={{ ...S.meta, marginLeft: 6 }}>
          {issue.severity_manual ? 'set by hand' : `worked out from ${issue.reporter_count} ${issue.reporter_count === 1 ? 'student' : 'students'}`} · {STATUS_LABEL[issue.status]}
          {issue.resolution ? ` · ${issue.resolution.replace(/_/g, ' ')}` : ''}
        </span>
        <div style={{ ...S.meta, fontFamily: 'ui-monospace, monospace' }}>{issue.item_key}</div>
      </div>

      <div>
        <h5 style={S.h5}>What students were served</h5>
        {!snap ? (
          <div style={S.warn}>This item was not in the live content when it was reported (key <code>{issue.item_key}</code>). Students may be seeing a deleted or stale item.</div>
        ) : (
          <div style={S.snap}>
            <p style={{ margin: '0 0 6px', fontWeight: 500, color: C.text }}>{snap.question || snap.title || snap.front || snap.mistake || snap.keyIdea || '(no text)'}</p>
            {Array.isArray(snap.options) && snap.options.map((o, idx) => {
              const n = chosenCount(o);
              return (
                <div key={idx} style={S.opt(idx === snap.correctIndex)}>
                  <span>{String.fromCharCode(65 + idx)}. {o}</span>
                  <em style={{ fontStyle: 'normal', color: '#9aa4b9', whiteSpace: 'nowrap' }}>
                    {idx === snap.correctIndex ? 'marked correct' : ''}{n ? `${idx === snap.correctIndex ? ' · ' : ''}chosen by ${n}` : ''}
                  </em>
                </div>
              );
            })}
            {snap.explanation && <p style={{ ...S.meta, marginTop: 8 }}><b style={{ color: C.dim }}>Explanation:</b> {snap.explanation}</p>}
            {snap.guidance && <p style={{ ...S.meta, marginTop: 8, whiteSpace: 'pre-wrap' }}><b style={{ color: C.dim }}>Guidance:</b> {snap.guidance}</p>}
            {snap.back && <p style={{ ...S.meta, marginTop: 8 }}><b style={{ color: C.dim }}>Back:</b> {String(snap.back).replace(/<[^>]+>/g, '')}</p>}
          </div>
        )}
        {staleView && <div style={{ ...S.warn, marginTop: 8 }}>The newest report quotes different wording from the live item, so that student saw an older version (a cached page or an old review copy).</div>}
      </div>

      <div>
        <h5 style={S.h5}>Reports · {reports.length}</h5>
        {reports.map((r, idx) => (
          <div key={r.id} style={idx ? S.rep : { fontSize: 12 }}>
            <b style={{ color: C.text }}>{CATEGORIES[r.category]?.label ?? r.category}</b>
            {r.reporter_plan && r.reporter_plan !== 'free' && <span style={S.pill}>{r.reporter_plan === 'lifetime' ? 'LIFETIME' : 'PRO'}</span>}
            {/* Student text is rendered as text, never as markup. */}
            {r.note && <div style={{ color: C.dim, margin: '2px 0' }}>“{r.note}”</div>}
            {r.answer?.chosen && <div style={S.meta}>Chose: {r.answer.chosen}{r.answer.revealed === false ? ' (before the answer was shown)' : ''}</div>}
            <div style={S.meta}>
              {r.user_id ? 'signed in' : 'signed out'} · {SURFACES[r.surface]?.label ?? r.surface}
              {r.viewport_w ? ` · ${r.viewport_w}×${r.viewport_h}` : ''}{r.theme ? ` · ${r.theme}` : ''} · {ago(r.created_at)} ago
            </div>
            {r.user_agent && <div style={{ ...S.meta, fontSize: 11, wordBreak: 'break-word' }}>{r.user_agent}</div>}
          </div>
        ))}
      </div>

      <div style={S.links}>
        {href && <a style={S.a} href={href} target="_blank" rel="noreferrer">Open in app ↗</a>}
        {href && process.env.NODE_ENV !== 'production' && <a style={S.a} href={`${href}?draft=1`} target="_blank" rel="noreferrer">Draft preview ↗</a>}
      </div>
      <div>
        <h5 style={S.h5}>Ledger command</h5>
        <code style={{ display: 'block', fontSize: 11, color: C.dim, background: '#0f1320', border: `1px solid ${C.line}`, borderRadius: 6, padding: 8, wordBreak: 'break-all' }}>{ledgerCmd}</code>
      </div>

      <InboxActions
        kind="issue"
        id={issue.id}
        status={issue.status}
        severity={issue.severity}
        severityManual={issue.severity_manual}
        internalNote={issue.internal_note}
        ledgerId={issue.ledger_id}
      />
      {issue.resolution_note && <div style={S.meta}><b style={{ color: C.dim }}>Note to reporters:</b> {issue.resolution_note}</div>}
      {issue.evidence && <div style={S.meta}><b style={{ color: C.dim }}>Evidence:</b> {issue.evidence}</div>}
    </aside>
  );
}

async function Feedback({ db, sp }) {
  const status = ['open', 'in_review', 'resolved', 'ignored', 'all'].includes(one(sp.status)) ? one(sp.status) : 'open';
  const topic = TOPICS.some(([id]) => id === one(sp.topic)) ? one(sp.topic) : null;
  const page = Math.max(0, Number.parseInt(one(sp.page), 10) || 0);
  const { rows, total, pageSize } = await listFeedback(db, { status, topic, page });
  const reasonLabel = Object.fromEntries(Object.values(REASONS).flat());
  const topicLabel = Object.fromEntries(TOPICS);

  return (
    <>
      <form method="get" action="/admin/inbox" style={S.form}>
        <input type="hidden" name="view" value="feedback" />
        <select name="status" defaultValue={status} style={S.select} aria-label="Status">
          <option value="open">Open</option><option value="in_review">In review</option><option value="resolved">Acted on</option><option value="ignored">Ignored</option><option value="all">All</option>
        </select>
        <select name="topic" defaultValue={topic || ''} style={S.select} aria-label="Topic">
          <option value="">Any topic</option>
          {TOPICS.map(([id, label]) => <option key={id} value={id}>{label}</option>)}
        </select>
        <button type="submit" style={S.apply}>Apply</button>
        <span style={{ fontSize: 12, color: C.muted, marginLeft: 'auto' }}>{total} {total === 1 ? 'message' : 'messages'}</span>
      </form>
      {rows.length === 0 ? <p style={S.empty}>No messages here.</p> : (
        <div style={{ display: 'grid', gap: 10 }}>
          {rows.map((r) => (
            <div key={r.id} style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 360px', gap: 14, border: `1px solid ${C.line}`, borderRadius: 10, padding: 12, background: C.card }}>
              <div>
                <div style={S.meta}>
                  {r.source === 'moment' ? `After a finished task · rated ${r.rating}/5` : `From “Send feedback” · ${topicLabel[r.topic] ?? r.topic}`}
                  {r.section_id ? ` · ${r.section_id}` : ''} · {ago(r.created_at)} ago
                  {r.reporter_plan && r.reporter_plan !== 'free' && <span style={S.pill}>{r.reporter_plan === 'lifetime' ? 'LIFETIME' : 'PRO'}</span>}
                </div>
                {/* Student text is rendered as text, never as markup. */}
                <p style={{ margin: '6px 0', color: C.text, fontSize: 14, whiteSpace: 'pre-wrap' }}>{r.message}</p>
                {r.reasons?.length > 0 && <div style={S.meta}>Chips: {r.reasons.map((x) => reasonLabel[x] ?? x).join(', ')}</div>}
                {r.tags?.length > 0 && <div style={S.meta}>Themes: {r.tags.join(', ')}</div>}
              </div>
              <InboxActions kind="feedback" id={r.id} status={r.status} tags={r.tags} />
            </div>
          ))}
        </div>
      )}
      {total > pageSize && (
        <div style={{ display: 'flex', gap: 12, marginTop: 10, fontSize: 12 }}>
          {page > 0 && <Link style={S.a} href={withParams(sp, { page: String(page - 1) })}>← Newer</Link>}
          {(page + 1) * pageSize < total && <Link style={S.a} href={withParams(sp, { page: String(page + 1) })}>Older →</Link>}
        </div>
      )}
    </>
  );
}

async function Ratings({ db }) {
  const rows = await topicRatings(db, { days: 90, minAnswers: 8 });
  const reasonLabel = Object.fromEntries(Object.values(REASONS).flat());
  if (!rows.length) return <p style={S.empty}>No ratings yet. They arrive from the card students see after finishing a topic on a computer.</p>;
  return (
    <table style={{ ...S.table, marginTop: 14 }}>
      <thead><tr><th style={S.th}>Topic · last 90 days</th><th style={S.th}>Answers</th><th style={S.th}>Average</th><th style={S.th}>Rated 1–2</th><th style={S.th}>Most chosen chip</th></tr></thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.sectionId} style={r.enough ? undefined : { opacity: 0.55 }}>
            <td style={S.td}>{r.sectionId}</td>
            <td style={S.td}>{r.answers}</td>
            <td style={{ ...S.td, whiteSpace: 'nowrap' }}>
              {r.enough ? (
                <>
                  <span title={`${r.average} of 5`} style={{ display: 'inline-block', width: 120, height: 6, borderRadius: 3, background: 'rgba(16,185,129,.18)', verticalAlign: 'middle', marginRight: 8, overflow: 'hidden' }}>
                    <i style={{ display: 'block', height: '100%', width: `${(r.average / 5) * 100}%`, background: C.green, borderRadius: 3 }} />
                  </span>
                  {r.average.toFixed(1)}
                </>
              ) : 'too few to rank'}
            </td>
            <td style={S.td}>{r.enough ? `${Math.round(r.shareLow * 100)}%` : '–'}</td>
            <td style={S.td}>{r.enough && r.topReason ? (reasonLabel[r.topReason] ?? r.topReason) : '–'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
