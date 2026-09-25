import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createServerClient } from '@/lib/supabase-server';
import { resolveItem, str } from '@/lib/feedback/server';

/**
 * GET   /api/admin/inbox/:id?kind=issue|feedback   one issue with every report, or one feedback row
 * PATCH /api/admin/inbox/:id                        triage: status, severity, notes, ledger id
 *
 * The lifecycle lives in the database's CHECK constraints as well as here; this route exists to
 * turn a violation into a sentence the admin can act on, and to do the one thing SQL cannot: look
 * at the LIVE item before anything is called fixed.
 */

async function checkAdmin() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: 'Unauthorized', status: 401 };
  if (user.app_metadata?.role !== 'admin') return { error: 'Forbidden', status: 403 };
  return { user };
}

const SEVERITIES = ['critical', 'high', 'medium', 'low'];
const FIXES = ['fixed_content', 'fixed_code'];
const CLOSES = ['not_a_defect', 'duplicate', 'wont_fix', 'spam', 'cannot_reproduce'];
const FEEDBACK_STATUSES = ['open', 'in_review', 'resolved', 'ignored'];

export async function GET(request, { params }) {
  const auth = await checkAdmin();
  if (auth.error) return NextResponse.json({ error: auth.error }, { status: auth.status });
  const { id } = await params;
  const db = createServerClient();

  if (new URL(request.url).searchParams.get('kind') === 'feedback') {
    const { data, error } = await db.from('user_feedback').select('*').eq('id', id).maybeSingle();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return data ? NextResponse.json(data) : NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  const { data, error } = await db
    .from('content_issues')
    .select('*, content_reports(*)')
    .eq('id', id)
    .order('created_at', { referencedTable: 'content_reports', ascending: false })
    .maybeSingle();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return data ? NextResponse.json(data) : NextResponse.json({ error: 'Not found' }, { status: 404 });
}

/** Fingerprint of the item as students get it NOW, or 'removed' if it has left the live content. */
async function liveHash(db, issue) {
  const { data: latest } = await db
    .from('content_reports')
    .select('rendered')
    .eq('issue_id', issue.id)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();
  const item = await resolveItem(db, {
    sectionId: issue.section_id,
    surface: issue.surface,
    itemId: issue.item_key,
    stem: latest?.rendered?.stem ?? null,
    notes: issue.surface === 'notes' ? { chapterTitle: latest?.rendered?.chapterTitle ?? null } : null,
  });
  return item?.hash ?? 'removed';
}

export async function PATCH(request, { params }) {
  const auth = await checkAdmin();
  if (auth.error) return NextResponse.json({ error: auth.error }, { status: auth.status });
  const { id } = await params;
  const body = await request.json().catch(() => ({}));
  const db = createServerClient();
  const now = new Date().toISOString();

  // ── general feedback: light triage ──────────────────────────────────────────────────────────
  if (body.kind === 'feedback') {
    const patch = { updated_at: now };
    if (FEEDBACK_STATUSES.includes(body.status)) {
      Object.assign(patch, { status: body.status, status_changed_at: now, status_changed_by: auth.user.id });
    }
    if (Array.isArray(body.tags)) patch.tags = body.tags.map((t) => str(t, 32)?.toLowerCase()).filter(Boolean).slice(0, 8);
    if ('internal_note' in body) patch.internal_note = str(body.internal_note, 4000);
    const { data, error } = await db.from('user_feedback').update(patch).eq('id', id).not('status', 'is', null).select().maybeSingle();
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return data ? NextResponse.json(data) : NextResponse.json({ error: 'No message to triage on that row' }, { status: 404 });
  }

  // ── content issues ──────────────────────────────────────────────────────────────────────────
  const { data: issue } = await db.from('content_issues').select('*').eq('id', id).maybeSingle();
  if (!issue) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const patch = { updated_at: now };
  if ('internal_note' in body) patch.internal_note = str(body.internal_note, 4000);
  if ('ledger_id' in body) patch.ledger_id = str(body.ledger_id, 64);
  if (body.severity === 'auto') patch.severity_manual = false; // the next report recomputes it
  else if (SEVERITIES.includes(body.severity)) Object.assign(patch, { severity: body.severity, severity_manual: true });

  const to = body.status;
  if (to && to !== issue.status) {
    Object.assign(patch, { status: to, status_changed_at: now, status_changed_by: auth.user.id });
    const note = str(body.resolution_note, 1000);
    const evidence = str(body.evidence, 300);

    if (to === 'resolved') {
      if (!FIXES.includes(body.resolution)) {
        return NextResponse.json({ error: 'Say how it was fixed: in the content, or in the code.' }, { status: 400 });
      }
      Object.assign(patch, { resolution: body.resolution, resolution_note: note, evidence });
      if (body.resolution === 'fixed_content') {
        // The rule that keeps "fixed" honest: the item students are served must have changed.
        // A fix that is only in `draft` has not reached anybody yet.
        const hash = await liveHash(db, issue);
        if (hash === issue.reported_hash) {
          return NextResponse.json({
            error: 'The live item is unchanged since it was reported. If the fix is staged, mark it "Fix staged" and resolve it after publishing.',
          }, { status: 409 });
        }
        if (hash === 'removed' && !evidence) {
          return NextResponse.json({ error: 'The item is no longer live. Add the packet or commit that removed it.' }, { status: 400 });
        }
        patch.fixed_hash = hash;
      } else if (!evidence) {
        return NextResponse.json({ error: 'Name the commit or PR that fixed it.' }, { status: 400 });
      }
    } else if (to === 'ignored') {
      if (!CLOSES.includes(body.resolution)) {
        return NextResponse.json({ error: 'Say why it is closed without a fix.' }, { status: 400 });
      }
      Object.assign(patch, { resolution: body.resolution, resolution_note: note, evidence, fixed_hash: null });
    } else if (['open', 'in_review', 'fix_staged'].includes(to)) {
      Object.assign(patch, { resolution: null, fixed_hash: null }); // reopening wipes the verdict, keeps the notes
    } else {
      return NextResponse.json({ error: 'Unknown status' }, { status: 400 });
    }
  }

  const { data, error } = await db.from('content_issues').update(patch).eq('id', id).select().single();
  if (error?.code === '23505') {
    return NextResponse.json({ error: 'This item already has a newer open issue. Work that one instead.' }, { status: 409 });
  }
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(data);
}
