"use client";
import { useState } from 'react';
import { listSpecs, getSpec } from '@/lib/diagram/index.mjs';
import DiagramDrawDrill from '@/components/diagram/DiagramDrawDrill';

/**
 * Harness for the drawing drills (packet 13.6).
 *
 * Not a student surface. This is where a spec gets looked at before it is wired into Learn
 * Mode, which waits for packets 5 and 7. Run `npm run diagram-check` before shipping a spec
 * change: it proves the geometry, this proves it feels right.
 */
export default function DiagramDrillHarness() {
  const specs = listSpecs();
  const [id, setId] = useState(specs[0].id);
  const spec = getSpec(id);

  return (
    <div style={{ maxWidth: 760 }}>
      <h1 style={{ fontSize: 24, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6 }}>
        Drawing drills
      </h1>
      <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 20, maxWidth: '60ch' }}>
        Packet 13.6. The student shifts a curve, marks the new equilibrium and shades an area; the four
        marks are geometry, with no model call. Regions are built from the student&rsquo;s own curves, so a
        $20 shift is still marked on its own terms.
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
        {specs.map((s) => (
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
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10.5, opacity: 0.75 }}>{s.unit}</span>
            {s.title}
          </button>
        ))}
      </div>

      <DiagramDrawDrill key={id} spec={spec} />
    </div>
  );
}
