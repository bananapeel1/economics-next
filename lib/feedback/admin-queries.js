/**
 * Reads for /admin/inbox. Server components call these with the service-role client after the
 * admin layout has checked app_metadata.role. Filters arrive as URL search params, so a filtered
 * view is a link that can be bookmarked, shared, or reopened with the back button.
 *
 * Volume sets the strategy: a few hundred signed-in students produce reports in the tens per week.
 * Filtering and paging happen in PostgREST; the two aggregates (topic ratings, category mix) are
 * computed in JS over one bounded read, because Supabase ships with PostgREST aggregates off and
 * a SQL function would put the logic behind the hand-run DDL step. Move them into a function when
 * a single read passes ~10,000 rows.
 */

export const ACTIVE = ['open', 'in_review', 'fix_staged'];
const PAGE = 50;

const escapeLike = (s) => s.replace(/[\\%_]/g, (c) => `\\${c}`);

/** Parse ?status=&severity=&subject=&unit=&section=&surface=&q=&page= into a filter object. */
export function parseFilters(sp = {}) {
  // A plain GET form sends repeated keys (?status=open&status=in_review), which Next hands over as an
  // array; a hand-written link sends ?status=open,in_review. Both mean the same.
  const one = (v) => (Array.isArray(v) ? v[0] : v);
  const pick = (v, allowed) => (allowed.includes(one(v)) ? one(v) : null);
  const list = (v, allowed) => (Array.isArray(v) ? v : String(v || '').split(',')).flatMap((x) => String(x).split(',')).filter((x) => allowed.includes(x));
  return {
    statuses: list(sp.status, ['open', 'in_review', 'fix_staged', 'resolved', 'ignored']),
    severity: pick(sp.severity, ['critical', 'high', 'medium', 'low']),
    subject: pick(sp.subject, ['economics', 'business']),
    unit: /^W(EC|BS)1[1-4]$/.test(one(sp.unit) || '') ? one(sp.unit) : null,
    section: /^[a-z0-9-]{1,120}$/.test(one(sp.section) || '') ? one(sp.section) : null,
    surface: /^[a-z_]{1,20}$/.test(one(sp.surface) || '') ? one(sp.surface) : null,
    q: typeof one(sp.q) === 'string' && one(sp.q).trim() ? one(sp.q).trim().slice(0, 80) : null,
    page: Math.max(0, Number.parseInt(one(sp.page), 10) || 0),
  };
}

/** The queue: worst first, then most people affected, then most recent. */
export async function listIssues(db, f) {
  let q = db
    .from('content_issues')
    .select('id, item_key, surface, section_id, subject, unit_code, spec_ref, item_title, status, severity, severity_manual, report_count, reporter_count, last_reported_at, ledger_id, reopened_from', { count: 'exact' })
    .in('status', f.statuses.length ? f.statuses : ACTIVE);
  if (f.severity) q = q.eq('severity', f.severity);
  if (f.subject) q = q.eq('subject', f.subject);
  if (f.unit) q = q.eq('unit_code', f.unit);
  if (f.section) q = q.eq('section_id', f.section);
  if (f.surface) q = q.eq('surface', f.surface);
  if (f.q) q = q.ilike('item_title', `%${escapeLike(f.q)}%`);
  const { data, count, error } = await q
    .order('severity_rank', { ascending: true })
    .order('reporter_count', { ascending: false })
    .order('last_reported_at', { ascending: false })
    .range(f.page * PAGE, f.page * PAGE + PAGE - 1);
  if (error) throw error;
  return { rows: data ?? [], total: count ?? 0, pageSize: PAGE };
}

/** One issue with every report, newest first. */
export async function issueDetail(db, id) {
  const { data, error } = await db
    .from('content_issues')
    .select('*, content_reports(*)')
    .eq('id', id)
    .order('created_at', { referencedTable: 'content_reports', ascending: false })
    .maybeSingle();
  if (error) throw error;
  return data;
}

/** True once scripts/create-feedback-tables.sql has been run; the inbox says so plainly until then. */
export async function tablesReady(db) {
  const { error } = await db.from('content_issues').select('id', { count: 'exact', head: true });
  return !error;
}

/** The strip above the list. Each is one HEAD request with an exact count. */
export async function inboxCounts(db) {
  const head = { count: 'exact', head: true };
  const [urgent, staged, again, feedback] = await Promise.all([
    db.from('content_issues').select('id', head).in('status', ACTIVE).in('severity', ['critical', 'high']),
    db.from('content_issues').select('id', head).eq('status', 'fix_staged'),
    db.from('content_issues').select('id', head).in('status', ACTIVE).not('reopened_from', 'is', null),
    db.from('user_feedback').select('id', head).eq('status', 'open'),
  ]);
  return {
    urgent: urgent.count ?? 0,           // critical + high, not yet fixed
    awaitingPublish: staged.count ?? 0,  // fixed in draft; students still see the old version
    reportedAgain: again.count ?? 0,     // reported after a fix went live
    feedbackOpen: feedback.count ?? 0,
  };
}

export async function listFeedback(db, { status = 'open', topic = null, page = 0 } = {}) {
  // status 'all' shows every message; a bare rating never appears here either way.
  let q = db
    .from('user_feedback')
    .select('id, created_at, source, moment, topic, rating, reasons, message, section_id, subject, reporter_plan, status, tags, path', { count: 'exact' })
    .not('status', 'is', null); // a bare rating has nothing to triage
  if (status && status !== 'all') q = q.eq('status', status);
  if (topic) q = q.eq('topic', topic);
  const { data, count, error } = await q.order('created_at', { ascending: false }).range(page * PAGE, page * PAGE + PAGE - 1);
  if (error) throw error;
  return { rows: data ?? [], total: count ?? 0, pageSize: PAGE };
}

/**
 * "How useful was this topic?" per section, over the last `days`. Sections with fewer than
 * `minAnswers` are returned but flagged, because an average of three answers ranks noise.
 */
export async function topicRatings(db, { days = 90, minAnswers = 8 } = {}) {
  const since = new Date(Date.now() - days * 86_400_000).toISOString();
  const { data, error } = await db
    .from('user_feedback')
    .select('section_id, rating, reasons')
    .eq('moment', 'section_complete')
    .gte('created_at', since)
    .limit(10_000);
  if (error) throw error;
  return summariseRatings(data ?? [], minAnswers);
}

/** Pure, so it is testable: rows → per-section summary, lowest average first. */
export function summariseRatings(rows, minAnswers = 8) {
  const by = new Map();
  for (const r of rows) {
    if (!r.section_id || !Number.isInteger(r.rating)) continue;
    const s = by.get(r.section_id) ?? { sectionId: r.section_id, n: 0, sum: 0, low: 0, reasons: {} };
    s.n += 1;
    s.sum += r.rating;
    if (r.rating <= 2) s.low += 1;
    for (const x of r.reasons ?? []) s.reasons[x] = (s.reasons[x] ?? 0) + 1;
    by.set(r.section_id, s);
  }
  return [...by.values()]
    .map((s) => ({
      sectionId: s.sectionId,
      answers: s.n,
      average: Math.round((s.sum / s.n) * 100) / 100,
      shareLow: Math.round((s.low / s.n) * 100) / 100,
      topReason: Object.entries(s.reasons).sort((a, b) => b[1] - a[1])[0]?.[0] ?? null,
      enough: s.n >= minAnswers,
    }))
    .sort((a, b) => Number(b.enough) - Number(a.enough) || a.average - b.average);
}
