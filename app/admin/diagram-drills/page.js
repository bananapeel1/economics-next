"use client";
import { useState } from 'react';
import { listSpecs, getSpec } from '@/lib/diagram/index.mjs';
import { shapes } from '@/lib/diagram/fixtures.mjs';
import DiagramDrawDrill from '@/components/diagram/DiagramDrawDrill';

/**
 * Harness for the drawing drills (packet 13.6; shape fixtures added in 13.7).
 *
 * Not a student surface. This is where a spec gets looked at before it is wired into Learn
 * Mode. Run `npm run diagram-check` before shipping a spec change: it proves the geometry, this
 * proves it feels right. The second row is the shape fixtures (lib/diagram/fixtures.mjs) — one per
 * diagram shape that has no shipped spec yet. They are engine proofs, not content: no citation,
 * no mark scheme checked, and nothing a student can reach.
 */
export default function DiagramDrillHarness() {
  const specs = listSpecs();
  const [id, setId] = useState(specs[0].id);
  const spec = shapes.find((s) => s.id === id) || getSpec(id);

  const chip = (s, label) => (
    <button
      key={s.id}
      type="button"
      onClick={() => setId(s.id)}
      style={{
        display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer',
        fontFamily: 'inherit', fontSize: 13, fontWeight: 500,
        padding: '7px 12px', borderRadius: 9,
        border: `1.5px solid ${s.id === id ? 'var(--accent-green)' : 'var(--border-primary)'}`,
        background: s.id === id ? 'var(--green-15)' : 'var(--bg-card)',
        color: s.id === id ? 'var(--accent-green)' : 'var(--text-muted)',
      }}
    >
      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10.5, opacity: 0.75 }}>{label}</span>
      {s.title}
    </button>
  );

  return (
    <div style={{ maxWidth: 760 }}>
      <h1 style={{ fontSize: 24, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6 }}>
        Drawing drills
      </h1>
      <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 20, maxWidth: '60ch' }}>
        The student moves a line, marks a point and shades an area; every mark is geometry, with no
        model call. Regions are built from the student&rsquo;s own curves, so a $20 shift is still
        marked on its own terms.
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 10 }}>
        {specs.map((s) => chip(s, `${s.unit} · ${s.specCode}`))}
      </div>
      <div style={{ fontSize: 12, color: 'var(--text-dim)', margin: '12px 0 6px' }}>
        Shape fixtures — engine proofs, not content
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
        {shapes.map((s) => chip(s, 'fixture'))}
      </div>

      <DiagramDrawDrill key={id} spec={spec} />
    </div>
  );
}
