/**
 * Server half of student feedback and content reports. Imported by /api/report, /api/feedback and
 * /api/admin/inbox only; node:crypto keeps it out of any client bundle.
 *
 * Three rules this file exists to hold in one place:
 *
 *   1. WHO is decided here, never by the request body. user_id comes from the session cookie
 *      (/api/* is outside middleware's PUBLIC_PREFIXES, so the cookie is refreshed on the way in);
 *      anon_id is the per-browser id lib/funnel.js already mints; the IP is kept only as a salted
 *      daily hash, for rate limiting.
 *   2. WHAT was reported is resolved here, from the published `data` column, never trusted from the
 *      client. The client says which item; the server says what that item is.
 *   3. Nothing here may run during `next build`. Every export is called from a request handler.
 */
import { createHash } from 'node:crypto';
import { createClient } from '@/lib/supabase/server';
import { createServerClient } from '@/lib/supabase-server';
import { rateLimit } from '@/lib/rate-limit';
import { getSubscriptionRow } from '@/lib/subscription-lookup';
import { hasPremiumAccess, isLifetime } from '@/lib/entitlements';
import { SURFACES } from '@/lib/feedback/taxonomy';
import { computeSeverity } from '@/lib/feedback/severity';

// ── small validators, in the app_events route's style ─────────────────────────────────────────
export const str = (v, max) => (typeof v === 'string' && v.trim() && v.length <= max ? v.trim() : null);
export const int = (v, min, max) => (Number.isInteger(v) && v >= min && v <= max ? v : null);
export const ts = (v) => (typeof v === 'string' && !Number.isNaN(Date.parse(v)) ? new Date(v).toISOString() : null);

/** Parse a JSON body no larger than `maxBytes`. Returns null for anything else. */
export async function readJson(request, maxBytes) {
  const declared = Number(request.headers.get('content-length') || 0);
  if (declared > maxBytes) return null;
  if (!(request.headers.get('content-type') || '').includes('application/json')) return null;
  try {
    const text = await request.text();
    if (text.length > maxBytes) return null;
    const body = JSON.parse(text);
    return body && typeof body === 'object' && !Array.isArray(body) ? body : null;
  } catch {
    return null;
  }
}

/**
 * A cookie-authenticated POST from another site is refused. Browsers send Origin on every
 * cross-origin POST; a same-origin fetch may omit it, which is allowed. Requiring
 * application/json (readJson) already rules out a plain HTML form.
 */
export function sameOrigin(request) {
  const origin = request.headers.get('origin');
  if (!origin) return true;
  try {
    return new URL(origin).host === request.headers.get('host');
  } catch {
    return false;
  }
}

/** The service-role client, or null where the key is absent (Vercel Preview: see DECISIONS). */
export function serviceDb() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) return null;
  return createServerClient();
}

export const isMissingTable = (error) => /schema cache|does not exist|42P01/i.test(error?.message || '');

const hash16 = (s) => createHash('sha256').update(s).digest('hex').slice(0, 16);

// The same expression as the reporter_key generated column. They must agree, or rate limits and
// duplicate checks silently compare against nothing.
export const reporterKeyOf = ({ userId, anonId, ipHash }) =>
  (userId ? `u:${userId}` : anonId ? `a:${anonId}` : ipHash ? `i:${ipHash}` : null);

/**
 * Who is reporting, decided on the server.
 * @returns {{ userId: string|null, anonId: string|null, ipHash: string|null, reporterKey: string|null, plan: string|null }}
 */
export async function identify(request, bodyAnonId, db) {
  let userId = null;
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    userId = user?.id ?? null;
  } catch {}

  const anonId = str(bodyAnonId, 64);
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || null;
  // The UTC date is inside the hash, so the same device hashes differently tomorrow: enough to
  // throttle a burst, not enough to follow anyone.
  const ipHash = ip ? hash16(`${ip}|${process.env.FEEDBACK_IP_SALT || ''}|${new Date().toISOString().slice(0, 10)}`) : null;

  let plan = null;
  if (userId && db) {
    const sub = await getSubscriptionRow(db, userId); // one DB read; never Stripe
    plan = hasPremiumAccess(sub) ? (isLifetime(sub) ? 'lifetime' : 'premium') : 'free';
  }
  const who = { userId, anonId, ipHash, plan };
  return { ...who, reporterKey: reporterKeyOf(who) };
}

/**
 * Two layers. The in-memory limiter answers a burst without a query but resets per serverless
 * instance (lib/rate-limit.js says so itself); the database count is the one that holds. The IP
 * hash is counted too, because an anonymous id is one "clear site data" away from new.
 */
export async function overLimit(db, table, who, { perHour, perDay }) {
  if (!rateLimit(`${table}:${who.reporterKey}`, perHour, 60 * 60 * 1000).allowed) return true;
  const since = (ms) => new Date(Date.now() - ms).toISOString();
  const count = async (col, val, ms) => {
    if (!val) return 0;
    const { count: n } = await db.from(table).select('id', { count: 'exact', head: true }).eq(col, val).gte('created_at', since(ms));
    return n ?? 0;
  };
  const [hour, day, ipHour] = await Promise.all([
    count('reporter_key', who.reporterKey, 60 * 60 * 1000),
    count('reporter_key', who.reporterKey, 24 * 60 * 60 * 1000),
    count('ip_hash', who.ipHash, 60 * 60 * 1000),
  ]);
  return hour >= perHour || day >= perDay || ipHour >= perHour * 3;
}

/** Common request fields. The user agent comes from the header, not the body. */
export function pageFields(body, request) {
  const path = str(body.path, 200);
  const theme = body.theme === 'light' || body.theme === 'dark' ? body.theme : null;
  return {
    path: path?.startsWith('/') ? path.split('?')[0] : null,
    viewport_w: int(body.viewportW, 1, 10000),
    viewport_h: int(body.viewportH, 1, 10000),
    theme,
    user_agent: (request.headers.get('user-agent') || '').slice(0, 300) || null,
    app_version: (process.env.VERCEL_GIT_COMMIT_SHA || '').slice(0, 40) || null,
    client_ts: ts(body.clientTs),
    tz_offset_min: int(body.tzOffsetMin, -900, 900),
  };
}

// ── section and item resolution ───────────────────────────────────────────────────────────────

/** Subject, unit and spec reference for a section, from the database (the same join as the middleware's section map). */
export async function resolveSection(db, sectionId) {
  const { data } = await db
    .from('sections')
    .select('id, number, title, units(number, code, subjects(slug))')
    .eq('id', sectionId)
    .maybeSingle();
  if (!data) return null;
  const slug = data.units?.subjects?.slug;
  return {
    id: data.id,
    title: data.title ?? null,
    specRef: data.number ?? null,
    unitCode: data.units?.code ?? null,
    unitNumber: data.units?.number ?? null,
    subject: slug === 'economics' || slug === 'business' ? slug : null,
  };
}

/** Deterministic JSON (sorted keys), so the same item always fingerprints the same. */
export function stableStringify(v) {
  if (Array.isArray(v)) return `[${v.map(stableStringify).join(',')}]`;
  if (v && typeof v === 'object') {
    return `{${Object.keys(v).sort().map((k) => `${JSON.stringify(k)}:${stableStringify(v[k])}`).join(',')}}`;
  }
  return JSON.stringify(v ?? null);
}
export const fingerprint = (item) => hash16(stableStringify(item));

const norm = (s) => String(s || '').toLowerCase().replace(/\s+/g, ' ').trim();
export const slug = (s) => norm(s).replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60);

/** First object anywhere in `data` whose `id` is `id`. Blocks hold subsections, subsections hold recalls. */
export function findById(data, id, depth = 0) {
  if (!id || depth > 6 || data == null || typeof data !== 'object') return null;
  if (!Array.isArray(data) && data.id === id) return data;
  for (const v of Array.isArray(data) ? data : Object.values(data)) {
    const hit = findById(v, id, depth + 1);
    if (hit) return hit;
  }
  return null;
}

/**
 * A copy small enough to store: SVG bodies become their fingerprint (a diagram's SVG alone can be
 * most of a 152 KB section), long strings are cut, and anything still too big keeps only its text.
 */
export function snapshotOf(item) {
  const strip = (v, depth) => {
    if (typeof v === 'string') return v.length > 2000 ? `${v.slice(0, 2000)}…` : v;
    if (Array.isArray(v)) return v.slice(0, 40).map((x) => strip(x, depth + 1));
    if (v && typeof v === 'object') {
      if (depth > 5) return '[nested]';
      const out = {};
      for (const [k, x] of Object.entries(v)) {
        if (k === 'svg' && typeof x === 'string') out.svg_sha = hash16(x);
        else out[k] = strip(x, depth + 1);
      }
      return out;
    }
    return v;
  };
  const snap = strip(item, 0);
  if (JSON.stringify(snap).length <= 12000) return snap;
  const text = {};
  for (const [k, v] of Object.entries(item)) if (typeof v === 'string' && k !== 'svg') text[k] = v.slice(0, 1500);
  return { ...text, truncated: true };
}

const titleOf = (item) =>
  String(item?.question || item?.title || item?.front || item?.mistake || item?.keyIdea || '').replace(/<[^>]+>/g, '').slice(0, 140) || null;

/**
 * The live item a report is about. Returns { key, snapshot, hash, title }, or null when the section
 * has no such item — a report on an item that is no longer live is still accepted, and says so.
 */
export async function resolveItem(db, { sectionId, surface, itemId, stem, notes }) {
  const table = SURFACES[surface]?.table;
  if (!table) return null;
  const { data: row } = await db.from(table).select('data').eq('section_id', sectionId).maybeSingle();
  const data = row?.data;
  if (!data) return null;

  let item = null;
  let key = null;
  if (surface === 'notes') {
    // Notes chapters carry no id. The title is steadier than the position; the position breaks ties.
    const chapters = Array.isArray(data) ? data : [];
    const byTitle = notes?.chapterTitle ? chapters.filter((c) => norm(c?.title) === norm(notes.chapterTitle)) : [];
    item = byTitle.length === 1 ? byTitle[0] : chapters[notes?.chapterIndex] ?? null;
    if (item) key = `${sectionId}:notes:${slug(item.title) || notes?.chapterIndex}`;
  } else {
    item = findById(data, itemId);
    // A recall without a stored id is addressed as `<subsectionId>:recall` (lib/learn-steps.js
    // recallId); report on the subsection that holds it, under the recall's own key.
    if (!item && itemId?.endsWith(':recall')) {
      const sub = findById(data, itemId.slice(0, -':recall'.length));
      if (sub?.recall) { item = sub.recall; key = itemId; }
    }
    // PreTest's stored copy drops ids (PreTest.jsx:64-70), so a PostTest item arrives without one.
    // The stem is the fallback, matched whole, never by prefix.
    if (!item && stem && Array.isArray(data)) item = data.find((x) => norm(x?.question) === norm(stem)) ?? null;
    if (item && !key) key = item.id || `${sectionId}:${surface}:${hash16(norm(stem))}`;
  }
  if (!item) return null;
  return { key, snapshot: snapshotOf(item), hash: fingerprint(item), title: titleOf(item) };
}

// ── the report itself ─────────────────────────────────────────────────────────────────────────

async function activeIssue(db, itemKey) {
  const { data } = await db
    .from('content_issues')
    .select('id, severity_manual')
    .eq('item_key', itemKey)
    .in('status', ['open', 'in_review', 'fix_staged'])
    .maybeSingle();
  return data ?? null;
}

/**
 * Attach a report to the item's active issue, opening one if there is none, then recompute the
 * issue's counts and severity from ALL its reports. Throws on a database error; the route turns
 * that into a status code.
 *
 * @param {object} db  service-role client
 * @param {object} r   { itemKey, surface, section, item, who, category, note, report: {...row fields} }
 */
export async function ingestReport(db, r) {
  let issue = await activeIssue(db, r.itemKey);
  if (!issue) {
    const { data: prior } = await db
      .from('content_issues')
      .select('id')
      .eq('item_key', r.itemKey)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();
    const { data, error } = await db
      .from('content_issues')
      .insert({
        item_key: r.itemKey,
        surface: r.surface,
        section_id: r.section.id,
        subject: r.section.subject,
        unit_code: r.section.unitCode,
        spec_ref: r.section.specRef,
        item_title: r.item?.title ?? null,
        reported_hash: r.item?.hash ?? null,
        reopened_from: prior?.id ?? null,
      })
      .select('id, severity_manual')
      .single();
    if (error?.code === '23505') issue = await activeIssue(db, r.itemKey); // another report won the race
    else if (error) throw error;
    else issue = data;
    if (!issue) throw new Error('issue vanished after a unique violation');
  }

  // The same student, the same item, the same complaint, inside a day: a double tap, not news.
  const { data: dup } = await db
    .from('content_reports')
    .select('id')
    .eq('issue_id', issue.id)
    .eq('reporter_key', r.who.reporterKey)
    .eq('category', r.category)
    .gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())
    .limit(1);
  if (dup?.length) return { issueId: issue.id, duplicate: true };

  const { error: insertError } = await db.from('content_reports').insert({
    issue_id: issue.id,
    user_id: r.who.userId,
    anon_id: r.who.anonId,
    ip_hash: r.who.ipHash,
    reporter_plan: r.who.plan,
    category: r.category,
    note: r.note,
    surface: r.surface,
    item_key: r.itemKey,
    item_snapshot: r.item?.snapshot ?? null,
    item_hash: r.item?.hash ?? null,
    ...r.report,
  });
  if (insertError) throw insertError;

  const { data: all, error: readError } = await db
    .from('content_reports')
    .select('category, reporter_key')
    .eq('issue_id', issue.id);
  if (readError) throw readError;
  const now = new Date().toISOString();
  const patch = {
    report_count: all.length,
    reporter_count: new Set(all.map((x) => x.reporter_key)).size,
    last_reported_at: now,
    updated_at: now,
  };
  if (!issue.severity_manual) {
    patch.severity = computeSeverity(all.map((x) => ({ category: x.category, reporterKey: x.reporter_key })));
  }
  const { error: updateError } = await db.from('content_issues').update(patch).eq('id', issue.id);
  if (updateError) throw updateError;
  return { issueId: issue.id, duplicate: false };
}
