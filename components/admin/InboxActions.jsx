'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

/**
 * Triage controls for one content issue or one feedback message on /admin/inbox. Every change goes
 * through PATCH /api/admin/inbox/:id, which enforces the lifecycle; this component only reports what
 * the route says. In particular, "Resolve · fixed in content" is refused (409) while the live item is
 * unchanged, and that sentence is shown here as it comes back.
 */

const S = {
  row: { display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center' },
  btn: { padding: '6px 10px', borderRadius: 6, border: '1px solid #2a3045', background: '#1a1f2e', color: '#cdd4e6', fontSize: 12, cursor: 'pointer' },
  go: { padding: '6px 10px', borderRadius: 6, border: '1px solid #10b981', background: '#10b981', color: '#0f1117', fontSize: 12, fontWeight: 600, cursor: 'pointer' },
  label: { display: 'block', fontSize: 11, color: '#7f8daa', margin: '8px 0 3px', textTransform: 'uppercase', letterSpacing: '.05em' },
  input: { width: '100%', boxSizing: 'border-box', padding: '7px 9px', borderRadius: 6, border: '1px solid #2a3045', background: '#0f1320', color: '#e8ecf5', fontSize: 13, fontFamily: 'inherit' },
  select: { padding: '6px 8px', borderRadius: 6, border: '1px solid #2a3045', background: '#151825', color: '#cdd4e6', fontSize: 12 },
  alert: { borderLeft: '3px solid #ec835a', padding: '6px 10px', background: 'rgba(236,131,90,.08)', color: '#e8ecf5', fontSize: 12, borderRadius: '0 6px 6px 0', marginTop: 8 },
  panel: { border: '1px solid #2a3045', borderRadius: 8, padding: 10, marginTop: 8, background: '#121726' },
};

const FIXES = [['fixed_content', 'Fixed in the content'], ['fixed_code', 'Fixed in the code']];
const CLOSES = [['not_a_defect', 'Not a defect'], ['duplicate', 'Duplicate'], ['wont_fix', 'Won’t fix'], ['spam', 'Spam'], ['cannot_reproduce', 'Can’t reproduce']];

export default function InboxActions({ kind, id, status, severity, severityManual, internalNote, ledgerId, tags }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);
  const [mode, setMode] = useState(null); // null | 'resolve' | 'close'
  const [resolution, setResolution] = useState('fixed_content');
  const [studentNote, setStudentNote] = useState('');
  const [evidence, setEvidence] = useState('');
  const [internal, setInternal] = useState(internalNote || '');
  const [ledger, setLedger] = useState(ledgerId || '');
  const [tagText, setTagText] = useState((tags || []).join(', '));

  async function patch(body) {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/inbox/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ kind, ...body }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) { setError(json.error || `That did not save (${res.status}).`); return; }
      setMode(null);
      router.refresh();
    } catch {
      setError('That did not save. Check your connection.');
    } finally {
      setBusy(false);
    }
  }

  const closed = status === 'resolved' || status === 'ignored';

  if (kind === 'feedback') {
    return (
      <div>
        <div style={S.row}>
          {status !== 'in_review' && <button style={S.btn} disabled={busy} onClick={() => patch({ status: 'in_review' })}>In review</button>}
          {status !== 'resolved' && <button style={S.btn} disabled={busy} onClick={() => patch({ status: 'resolved' })}>Acted on</button>}
          {status !== 'ignored' && <button style={S.btn} disabled={busy} onClick={() => patch({ status: 'ignored' })}>Ignore</button>}
          {status !== 'open' && <button style={S.btn} disabled={busy} onClick={() => patch({ status: 'open' })}>Reopen</button>}
        </div>
        <label style={S.label} htmlFor={`tags-${id}`}>Themes (comma separated)</label>
        <div style={S.row}>
          <input id={`tags-${id}`} style={{ ...S.input, flex: 1 }} value={tagText} onChange={(e) => setTagText(e.target.value)} placeholder="past-papers, mobile, pricing" />
          <button style={S.btn} disabled={busy} onClick={() => patch({ tags: tagText.split(',').map((t) => t.trim()).filter(Boolean) })}>Save</button>
        </div>
        <label style={S.label} htmlFor={`note-${id}`}>Internal note</label>
        <textarea id={`note-${id}`} style={{ ...S.input, minHeight: 56 }} value={internal} onChange={(e) => setInternal(e.target.value)} />
        <div style={{ ...S.row, marginTop: 6 }}><button style={S.btn} disabled={busy} onClick={() => patch({ internal_note: internal })}>Save note</button></div>
        {error && <div style={S.alert} role="alert">{error}</div>}
      </div>
    );
  }

  return (
    <div>
      <div style={S.row}>
        {status === 'open' && <button style={S.btn} disabled={busy} onClick={() => patch({ status: 'in_review' })}>Start review</button>}
        {!closed && status !== 'fix_staged' && <button style={S.btn} disabled={busy} onClick={() => patch({ status: 'fix_staged' })}>Fix staged</button>}
        {!closed && <button style={S.go} disabled={busy} onClick={() => { setMode('resolve'); setResolution('fixed_content'); setError(null); }}>Resolve…</button>}
        {!closed && <button style={S.btn} disabled={busy} onClick={() => { setMode('close'); setResolution('not_a_defect'); setError(null); }}>Close without fix…</button>}
        {closed && <button style={S.btn} disabled={busy} onClick={() => patch({ status: 'open' })}>Reopen</button>}
        <select
          style={S.select}
          aria-label="Severity"
          value={severityManual ? severity : 'auto'}
          disabled={busy}
          onChange={(e) => patch({ severity: e.target.value })}
        >
          <option value="auto">Severity: worked out ({severity})</option>
          <option value="critical">Critical (manual)</option>
          <option value="high">High (manual)</option>
          <option value="medium">Medium (manual)</option>
          <option value="low">Low (manual)</option>
        </select>
      </div>

      {mode && (
        <div style={S.panel}>
          <label style={S.label} htmlFor={`res-${id}`}>{mode === 'resolve' ? 'How it was fixed' : 'Why it is closed'}</label>
          <select id={`res-${id}`} style={S.select} value={resolution} onChange={(e) => setResolution(e.target.value)}>
            {(mode === 'resolve' ? FIXES : CLOSES).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
          </select>
          <label style={S.label} htmlFor={`ev-${id}`}>
            {resolution === 'fixed_code' ? 'Commit or PR (required)' : 'Evidence: commit, packet, publish time'}
          </label>
          <input id={`ev-${id}`} style={S.input} value={evidence} onChange={(e) => setEvidence(e.target.value)} placeholder="f3c3886, packet 37, published 30 Sep" />
          <label style={S.label} htmlFor={`sn-${id}`}>Note to the students who reported it (may be shown to them later)</label>
          <textarea id={`sn-${id}`} style={{ ...S.input, minHeight: 56 }} value={studentNote} onChange={(e) => setStudentNote(e.target.value)} />
          <div style={{ ...S.row, marginTop: 8 }}>
            <button
              style={S.go}
              disabled={busy}
              onClick={() => patch({
                status: mode === 'resolve' ? 'resolved' : 'ignored',
                resolution,
                evidence: evidence || null,
                resolution_note: studentNote || null,
              })}
            >
              {busy ? 'Saving…' : mode === 'resolve' ? 'Resolve' : 'Close'}
            </button>
            <button style={S.btn} disabled={busy} onClick={() => setMode(null)}>Cancel</button>
          </div>
        </div>
      )}

      {error && <div style={S.alert} role="alert">{error}</div>}

      <label style={S.label} htmlFor={`note-${id}`}>Internal note</label>
      <textarea id={`note-${id}`} style={{ ...S.input, minHeight: 64 }} value={internal} onChange={(e) => setInternal(e.target.value)} placeholder="What the spec says, what the fix is, which packet takes it" />
      <div style={{ ...S.row, marginTop: 6 }}>
        <button style={S.btn} disabled={busy} onClick={() => patch({ internal_note: internal })}>Save note</button>
      </div>

      <label style={S.label} htmlFor={`ledger-${id}`}>Ledger id</label>
      <div style={S.row}>
        <input id={`ledger-${id}`} style={{ ...S.input, flex: 1 }} value={ledger} onChange={(e) => setLedger(e.target.value)} placeholder={`S${id}`} />
        <button style={S.btn} disabled={busy} onClick={() => patch({ ledger_id: ledger || null })}>Save</button>
      </div>
    </div>
  );
}
