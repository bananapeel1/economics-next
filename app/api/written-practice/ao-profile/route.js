import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createServerClient } from '@/lib/supabase-server';
import { buildAOProfile } from '@/lib/ao-profile';

/**
 * GET /api/written-practice/ao-profile?subject=economics
 *
 * The read surface for the AO panel. Every sentence the panel prints is produced by
 * lib/ao-profile.js from this user's own written_ao_attempts rows; this route only fetches the
 * evidence and hands it over. It does no arithmetic and writes no copy, so there is exactly one
 * place where a claim can be phrased above its evidence.
 *
 * Auth-gated but deliberately NOT premium-gated: a lapsed subscriber keeps the record of answers
 * they already paid to have marked, and the page the panel mounts on is Pro-gated anyway.
 *
 * Until scripts/create-written-ao-attempts-table.sql has been run the table does not exist: the
 * route then answers 200 with a valid empty profile and logs once per server instance, so the code
 * can ship before the SQL is run.
 */
export const runtime = 'nodejs'; // service-role Supabase client; nothing here may run on the edge

// Supabase silently caps an unbounded select at 1000 rows, so the limit is explicit. Realistic
// per-user lifetime volume is double digits to low hundreds.
const ROW_LIMIT = 2000;
const SUBJECTS = ['economics', 'business'];

// Exactly the columns lib/ao-profile.js reads, plus created_at for the ordering. Not select('*'):
// every row also carries model_ao, ao_comments and gaps as JSONB — the marker's own prose, which
// this route never looks at — so a heavy user's read would drag megabytes across the wire to
// compute a handful of sums. Matches the column list the running line already uses in
// app/api/written-practice/evaluate/route.js.
const PROFILE_COLUMNS =
  'subject, section_id, command, tariff, ao1_marks, ao2_marks, ao3_marks, ao3_chains, ao4_marks, ' +
  'gap_tags, excluded_reason, created_at';

let warnedMissingTable = false;

export async function GET(request) {
  // 1. Authenticate. createClient() is for auth.getUser() only.
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // 2. The subject param is applied only when it is exactly one of the two slugs. An unrecognised
  // value scopes to nothing rather than to a guess — naming the wrong specification is the failure
  // this feature exists to prevent.
  const { searchParams } = new URL(request.url);
  const requestedSubject = searchParams.get('subject');
  const subject = SUBJECTS.includes(requestedSubject) ? requestedSubject : null;

  // 3. Everything below runs with the service role, which bypasses RLS — the explicit
  // .eq('user_id', user.id) on every user-scoped query IS the access control.
  const db = createServerClient();

  const [
    { data: attemptRows, error: attemptsError },
    { count: priorWaCount },
    { data: sections },
    { data: units },
    { data: subjectRows },
  ] = await Promise.all([
    // Ordered DESCENDING so that a user who ever passes the limit loses their oldest answers, not
    // their newest. An ascending limit would freeze the diagnosis on ancient rows while the student
    // kept writing, and the sentence "across your N marked answers" would silently stop matching
    // what they just did.
    db
      .from('written_ao_attempts')
      .select(PROFILE_COLUMNS)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(ROW_LIMIT),
    // Written-practice progress rows predate this table. A student who marked forty answers before
    // it shipped must be told the record started recently rather than "nothing here yet", which
    // would read as data loss. A count is enough; no backfill is possible.
    db
      .from('practice_question_progress')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .like('section_id', 'wa-%'),
    db.from('sections').select('id, title, short_title, unit_id'),
    db.from('units').select('id, number, subject_id'),
    db.from('subjects').select('id, slug'),
  ]);

  const priorWaRows = Number.isFinite(priorWaCount) ? priorWaCount : 0;

  if (attemptsError) {
    const missing = /schema cache|does not exist|42P01/i.test(attemptsError.message || '');
    if (missing) {
      if (!warnedMissingTable) {
        warnedMissingTable = true;
        console.warn('[ao] written_ao_attempts table missing — run scripts/create-written-ao-attempts-table.sql in the Supabase SQL editor. The AO panel shows its empty state until then.');
      }
      const empty = buildAOProfile([], { subject, priorWaRows });
      return NextResponse.json({
        ...empty,
        meta: { ...empty.meta, tableMissing: true, availableSubjects: [] },
      });
    }
    // A real read failure must not answer "nothing here yet" — that would be the panel lying about
    // the student's own record. The panel renders nothing at all on a non-200.
    console.error('[ao] profile read failed', attemptsError.message);
    return NextResponse.json({ error: 'Failed to load AO profile' }, { status: 500 });
  }

  const fetched = attemptRows || [];
  const truncated = fetched.length === ROW_LIMIT;
  // buildAOProfile reads oldest-first; the query is newest-first for the reason above.
  const rows = fetched.reverse();

  // 4. Section titles and canonical paths, so the secondary link can name a section. An incomplete
  // entry is left out entirely: buildAOProfile drops the link rather than printing a half-built one.
  const slugById = new Map((subjectRows || []).map(s => [s.id, s.slug]));
  const unitById = new Map((units || []).map(u => [u.id, u]));
  const sectionLookup = {};
  for (const s of (sections || [])) {
    const unit = unitById.get(s.unit_id);
    const subjectSlug = unit ? slugById.get(unit.subject_id) : null;
    if (!unit || !subjectSlug) continue;
    sectionLookup[s.id] = {
      title: s.short_title || s.title,
      unitNumber: unit.number,
      subjectSlug,
    };
  }

  // 5. Aggregate. The subject scoping happens inside buildAOProfile so the exclusions footnote's
  // denominator moves with it.
  const profile = buildAOProfile(rows, { subject, truncated, priorWaRows, sections: sectionLookup });

  // availableSubjects counts excluded rows too: it is a navigation affordance telling the client
  // which subjects this student has marked answers in, not a claim about any of them.
  const availableSubjects = SUBJECTS.filter(slug => rows.some(row => row.subject === slug));

  return NextResponse.json({
    ...profile,
    meta: { ...profile.meta, availableSubjects },
  });
}
