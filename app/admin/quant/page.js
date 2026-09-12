"use client";
import { useState } from 'react';
import { buildItem, listTemplates, newSeed } from '@/lib/quant/index.mjs';
import CalculationItem from '@/components/quant/CalculationItem';

/**
 * Harness for the quantitative drill templates (packet 13.1).
 *
 * Not a student surface — this is how a template gets eyeballed before it is wired
 * into Learn Mode in 13.2. The seed is in the URL of the question id, so a bad draw
 * can be reported and reproduced exactly.
 *
 * The first render uses a fixed seed rather than newSeed(), so the server and client
 * agree on the numbers and hydration stays quiet.
 */
export default function QuantHarness() {
  const templates = listTemplates();
  const [templateId, setTemplateId] = useState(templates[0].id);
  const [seed, setSeed] = useState('preview-1');

  let item = null;
  let error = null;
  try {
    item = buildItem(templateId, seed);
  } catch (err) {
    error = err.message;
  }

  return (
    <div style={{ maxWidth: 760 }}>
      <h1 style={{ fontSize: 24, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6 }}>
        Quantitative drills
      </h1>
      <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 20, maxWidth: '60ch' }}>
        Packet 13.1. Items are generated from a template and a seed, never stored. The same seed always
        rebuilds the same question, so anything wrong here can be reproduced from the item id alone.
        Run <code style={{ fontFamily: "'DM Mono', monospace" }}>npm run quant-check</code> before shipping a
        template change.
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
        {templates.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTemplateId(t.id)}
            style={{
              display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer',
              fontFamily: 'inherit', fontSize: 13, fontWeight: 500,
              padding: '7px 12px', borderRadius: 9,
              border: `1.5px solid ${t.id === templateId ? 'var(--accent-green)' : 'var(--border-primary)'}`,
              background: t.id === templateId ? 'var(--green-15)' : 'var(--bg-card)',
              color: t.id === templateId ? 'var(--accent-green)' : 'var(--text-muted)',
            }}
          >
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10.5, opacity: 0.75 }}>{t.unit}</span>
            {t.title}
          </button>
        ))}
      </div>

      {error ? (
        <p style={{ color: 'var(--accent-red)', fontSize: 14 }}>
          This template could not draw a clean question: {error}
        </p>
      ) : (
        <>
          <CalculationItem key={item.id} item={item} />

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center', marginTop: 16 }}>
            <button
              type="button"
              onClick={() => setSeed(newSeed())}
              style={{
                fontFamily: 'inherit', fontSize: 13.5, fontWeight: 600, cursor: 'pointer',
                padding: '10px 16px', borderRadius: 10,
                border: '1.5px solid var(--border-primary)', background: 'var(--bg-card)',
                color: 'var(--text-secondary)',
              }}
            >
              New numbers
            </button>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11.5, color: 'var(--text-dim)' }}>
              {item.id} · ~{templates.find((t) => t.id === templateId).variants.toLocaleString('en-US')} number sets
            </span>
          </div>
        </>
      )}
    </div>
  );
}
