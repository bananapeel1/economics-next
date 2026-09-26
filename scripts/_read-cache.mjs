/**
 * A read cache for the scripts' Supabase client (scripts/_db.mjs), installed as its `fetch`.
 *
 * WHY IT EXISTS. On 26 Sep 2026 the org went over the Free plan's 5 GB egress (7.03 GB, with
 * ten days of the cycle left; the previous cycle used 0.76 GB with the same ~98 users). The
 * API logs put 88% of requests on this Mac, and the largest single shape was
 * `select=data,draft&section_id=eq.X` with the service key: 166,105 requests in 24 hours. That
 * is the gate scripts (recall-census, exposure-census, checkin-attribution, the validator,
 * pin-check) each reading the whole corpus, section by section, on every gate pass of every
 * parallel packet session — and recall-census reads it twice per run. The corpus barely changes
 * between those reads, so nearly all of it was the same bytes fetched again.
 *
 * HOW IT STAYS CORRECT. Egress is billed on bytes, not requests, so a cached copy is only reused
 * after a cheap check that it is still current:
 *
 *   - `public.content_versions` (scripts/content-versions.sql) holds one version number per
 *     (content table, section_id), bumped by a trigger on every insert, update and delete. One
 *     small request reads the whole table (~350 rows) and is re-read at most every
 *     REVVY_READ_CACHE_TTL_MS (default 5 s).
 *   - A query filtered to one section (`section_id=eq.X`, or `in.(…)`) is stamped with that
 *     section's version; any other query on the table is stamped with the whole table's
 *     versions. A saved response is served only when its stamp equals the current one.
 *   - Saved responses live on disk, shared by every session and worktree on this machine.
 *   - ANY write this client makes (POST/PATCH/PUT/DELETE under /rest/v1) drops the in-memory
 *     copies and forces a fresh version read before the next read, so a script that stages a
 *     draft and reads it back (scripts/_content-write.mjs) always sees its own write.
 *
 *   So a read is never older than the database was at most TTL ago, and never older than this
 *   process's own last write. A write by ANOTHER process becomes visible within TTL.
 *
 *   Until the SQL has been run, the version read fails and the cache falls back to memory only:
 *   an identical read is fetched once per process and cleared by that process's writes.
 *
 * Only GETs on the eight content tables are cached, and never one whose `select` embeds another
 * table (it contains a parenthesis). Everything else passes straight through.
 *
 *   REVVY_READ_CACHE=off          no cache at all (the plain fetch)
 *   REVVY_READ_CACHE_TTL_MS=5000  how stale a version read may get
 *   REVVY_READ_CACHE_DIR=<path>   where saved responses live (default: the user cache dir)
 *   REVVY_READ_CACHE_STATS=1      print hit/miss/bytes to stderr when the process exits
 *
 * Emptying the cache directory is always safe: it only costs the next reads a refetch.
 */
import { createHash, randomBytes } from 'node:crypto';
import { mkdirSync, readFileSync, renameSync, writeFileSync } from 'node:fs';
import { homedir, platform } from 'node:os';
import { join } from 'node:path';

export const CACHED_TABLES = [
  'section_content', 'section_notes', 'section_quiz', 'section_practice',
  'section_flashcards', 'section_diagrams', 'section_extras', 'section_common_mistakes',
];

const WRITES = new Set(['POST', 'PATCH', 'PUT', 'DELETE']);
const KEPT_HEADERS = ['content-type', 'content-range'];

export function defaultCacheDir() {
  if (process.env.REVVY_READ_CACHE_DIR) return process.env.REVVY_READ_CACHE_DIR;
  const base = platform() === 'darwin'
    ? join(homedir(), 'Library', 'Caches')
    : (process.env.XDG_CACHE_HOME || join(homedir(), '.cache'));
  return join(base, 'revvy-learn', 'read-cache');
}

const sha = (s) => createHash('sha256').update(s).digest('hex');

/**
 * The section ids a query is confined to, or null when it is not confined to a known set.
 * PostgREST ANDs top-level filters, so one `section_id=eq.X` confines the result to X's rows
 * whatever else the query says.
 */
export function sectionIdsOf(searchParams) {
  const values = searchParams.getAll('section_id');
  if (values.length !== 1) return null;
  const v = values[0];
  if (v.startsWith('eq.')) return [v.slice(3)];
  const m = v.match(/^in\.\((.*)\)$/);
  if (m && !m[1].includes('"')) return m[1].split(',');
  return null;
}

/**
 * @param {object} o
 * @param {typeof fetch} [o.fetch]  the real fetch
 * @param {string} [o.dir]          disk cache root; null keeps everything in memory
 * @param {number} [o.ttlMs]        version-read lifetime
 * @param {() => number} [o.now]
 */
export function createReadCache({
  fetch: baseFetch = globalThis.fetch,
  dir = defaultCacheDir(),
  ttlMs = Number(process.env.REVVY_READ_CACHE_TTL_MS) || 5000,
  now = Date.now,
} = {}) {
  const tables = new Set(CACHED_TABLES);
  const mem = new Map();          // key -> entry
  const inflight = new Map();     // key -> Promise<entry|null>
  const stats = { reads: 0, memHits: 0, diskHits: 0, misses: 0, bytesServed: 0, bytesFetched: 0, versionReads: 0, writes: 0, mode: 'pending' };

  // Version state. mode: 'pending' until the first version read, then 'shared' or 'memory'.
  let mode = 'pending';
  let modeReason = '';
  let versions = null;            // Map(table -> Map(section_id -> version))
  let fingerprints = new Map();   // table -> hash of its versions
  let versionsAt = -Infinity;
  let versionsPending = null;
  let generation = 0;             // bumped by this process's writes

  function invalidate() {
    generation += 1;
    versionsAt = -Infinity;
    mem.clear();
  }

  async function readVersions(origin, reqHeaders) {
    if (mode === 'memory') return;
    if (versions && now() - versionsAt < ttlMs) return;
    if (versionsPending) return versionsPending;
    const startGen = generation;
    versionsPending = (async () => {
      try {
        const h = new Headers();
        for (const k of ['apikey', 'authorization']) if (reqHeaders.get(k)) h.set(k, reqHeaders.get(k));
        h.set('accept', 'application/json');
        h.set('prefer', 'count=exact');
        stats.versionReads += 1;
        const res = await baseFetch(`${origin}/rest/v1/content_versions?select=table_name,section_id,version`, { method: 'GET', headers: h });
        const text = await res.text();
        if (!res.ok) throw new Error(`content_versions: HTTP ${res.status} ${text.slice(0, 120)}`);
        const rows = JSON.parse(text);
        const total = Number((res.headers.get('content-range') || '').split('/')[1]);
        // A truncated read (the API caps rows per response) would hide a version and could let
        // a stale copy through, so it disables the shared cache rather than being trusted.
        if (!Array.isArray(rows) || (Number.isFinite(total) && total !== rows.length)) {
          throw new Error(`content_versions: read ${Array.isArray(rows) ? rows.length : '?'} of ${total} rows`);
        }
        const next = new Map();
        for (const r of rows) {
          if (!next.has(r.table_name)) next.set(r.table_name, new Map());
          next.get(r.table_name).set(String(r.section_id), String(r.version));
        }
        versions = next;
        fingerprints = new Map();
        // A write that happened while this read was in flight may not be in it: leave it expired.
        versionsAt = generation === startGen ? now() : -Infinity;
        mode = 'shared';
      } catch (e) {
        mode = 'memory';
        modeReason = e.message;
        versions = null;
      } finally {
        stats.mode = mode;
        versionsPending = null;
      }
    })();
    return versionsPending;
  }

  function fingerprint(table) {
    if (!fingerprints.has(table)) {
      const m = versions.get(table) || new Map();
      fingerprints.set(table, sha([...m].sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0)).map(([s, v]) => `${s}=${v}`).join('\n')));
    }
    return fingerprints.get(table);
  }

  function stampFor(table, searchParams) {
    if (mode !== 'shared') return `gen:${generation}`;
    const ids = sectionIdsOf(searchParams);
    if (!ids) return `table:${fingerprint(table)}`;
    const m = versions.get(table) || new Map();
    return `rows:${ids.map((id) => `${id}=${m.get(id) ?? 'absent'}`).join(',')}`;
  }

  function diskPath(key) {
    return dir ? join(dir, `${sha(key)}.json`) : null;
  }

  function readDisk(key) {
    const p = diskPath(key);
    if (!p) return null;
    try {
      const e = JSON.parse(readFileSync(p, 'utf8'));
      return e && e.key === key ? e : null;
    } catch { return null; }
  }

  function writeDisk(entry) {
    const p = diskPath(entry.key);
    if (!p) return;
    try {
      mkdirSync(dir, { recursive: true, mode: 0o700 });
      const tmp = `${p}.${process.pid}.${randomBytes(4).toString('hex')}.tmp`;
      writeFileSync(tmp, JSON.stringify(entry), { mode: 0o600 });
      renameSync(tmp, p);   // atomic: a parallel reader sees the old file or the new one, never half
    } catch { /* a cache that cannot write is just a cache that misses */ }
  }

  const respond = (e) => new Response(e.body, { status: e.status, statusText: e.statusText, headers: e.headers });

  async function cachedFetch(input, init = {}) {
    const url = new URL(typeof input === 'string' ? input : input.url ?? String(input));
    const method = String(init.method || input?.method || 'GET').toUpperCase();
    const rest = url.pathname.match(/^\/rest\/v1\/(.+)$/);
    if (!rest) return baseFetch(input, init);
    if (WRITES.has(method)) {
      stats.writes += 1;
      invalidate();
      return baseFetch(input, init);
    }
    const table = rest[1];
    if (method !== 'GET' || !tables.has(table) || (url.searchParams.get('select') || '').includes('(')) {
      return baseFetch(input, init);
    }

    stats.reads += 1;
    const headers = new Headers(init.headers);
    await readVersions(url.origin, headers);
    const stamp = stampFor(table, url.searchParams);
    // The credentials decide what RLS lets through, so they are part of the key, hashed.
    const who = sha(`${headers.get('apikey') || ''}|${headers.get('authorization') || ''}`).slice(0, 16);
    const key = [url.href, `accept=${headers.get('accept') || ''}`, `prefer=${headers.get('prefer') || ''}`,
      `range=${headers.get('range') || ''}`, `profile=${headers.get('accept-profile') || ''}`, `who=${who}`].join(' | ');

    const hit = mem.get(key);
    if (hit && hit.stamp === stamp) {
      stats.memHits += 1; stats.bytesServed += hit.body.length;
      return respond(hit);
    }
    if (mode === 'shared') {
      const d = readDisk(key);
      if (d && d.stamp === stamp) {
        mem.set(key, d);
        stats.diskHits += 1; stats.bytesServed += d.body.length;
        return respond(d);
      }
    }

    // Identical reads issued together (Promise.all) share one fetch.
    const flightKey = `${key} | ${stamp}`;
    const pending = inflight.get(flightKey);
    if (pending) {
      const e = await pending;
      if (e) { stats.memHits += 1; stats.bytesServed += e.body.length; return respond(e); }
      return baseFetch(input, init);
    }
    stats.misses += 1;
    const genAtStart = generation;
    const work = (async () => {
      const res = await baseFetch(input, { ...init, headers });
      if (res.status !== 200 && res.status !== 206) return { passthrough: res };
      const body = await res.text();
      stats.bytesFetched += body.length;
      const kept = {};
      for (const h of KEPT_HEADERS) if (res.headers.get(h) != null) kept[h] = res.headers.get(h);
      const entry = { key, stamp, status: res.status, statusText: res.statusText, headers: kept, body };
      // Stored only if no write of ours landed meanwhile. The fetch read the database after the
      // version read, so the body is at least as new as its stamp.
      if (generation === genAtStart) {
        mem.set(key, entry);
        if (mode === 'shared') writeDisk(entry);
      }
      return { entry };
    })();
    inflight.set(flightKey, work.then((r) => r.entry ?? null, () => null));
    try {
      const r = await work;
      return r.passthrough ?? respond(r.entry);
    } finally {
      inflight.delete(flightKey);
    }
  }

  return {
    fetch: cachedFetch,
    stats,
    get mode() { return mode; },
    get modeReason() { return modeReason; },
    invalidate,
  };
}

/** One stderr line, for REVVY_READ_CACHE_STATS=1. */
export function formatStats(s, reason = '') {
  const mb = (n) => `${(n / 1e6).toFixed(2)} MB`;
  return `[read-cache] mode=${s.mode}${s.mode === 'memory' && reason ? ` (${reason})` : ''} reads=${s.reads} ` +
    `memHits=${s.memHits} diskHits=${s.diskHits} misses=${s.misses} versionReads=${s.versionReads} writes=${s.writes} ` +
    `fetched=${mb(s.bytesFetched)} served-from-cache=${mb(s.bytesServed)}`;
}
