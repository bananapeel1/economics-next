"use client";
import { useState } from 'react';

const emptyTerm = { term: '', definition: '' };

export default function GlossaryEditor({ initialTerms }) {
  const [terms, setTerms] = useState(initialTerms);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyTerm);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [search, setSearch] = useState('');

  function startNew() {
    setForm(emptyTerm);
    setEditing('new');
    setMessage('');
  }

  function startEdit(term) {
    setForm({ ...term });
    setEditing(term.id);
    setMessage('');
  }

  function cancel() {
    setEditing(null);
    setForm(emptyTerm);
    setMessage('');
  }

  async function handleSave() {
    if (!form.term.trim() || !form.definition.trim()) {
      setMessage('Term and definition are required.');
      return;
    }
    setSaving(true);
    setMessage('');
    try {
      const body = editing === 'new' ? { ...form } : { ...form, id: editing };
      const res = await fetch('/api/admin/glossary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const err = await res.json();
        setMessage(`Error: ${err.error}`);
      } else {
        const saved = await res.json();
        if (editing === 'new') {
          setTerms(prev => [...prev, saved].sort((a, b) => a.term.localeCompare(b.term)));
        } else {
          setTerms(prev => prev.map(t => t.id === saved.id ? saved : t).sort((a, b) => a.term.localeCompare(b.term)));
        }
        setEditing(null);
        setForm(emptyTerm);
        setMessage('Saved!');
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm('Delete this term?')) return;
    try {
      const res = await fetch(`/api/admin/glossary?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setTerms(prev => prev.filter(t => t.id !== id));
        if (editing === id) cancel();
      }
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    }
  }

  const inputStyle = {
    width: '100%', padding: '8px 12px', borderRadius: 6, border: '1px solid #2a3045',
    background: '#151825', color: '#e8ecf5', fontSize: 13, fontFamily: 'inherit', outline: 'none'
  };
  const labelStyle = { fontSize: 11, color: '#6b7a99', display: 'block', marginBottom: 4 };

  const filtered = terms.filter(t =>
    t.term.toLowerCase().includes(search.toLowerCase()) ||
    t.definition.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {message && (
        <div style={{ fontSize: 13, color: message.startsWith('Error') ? '#ef4444' : '#10b981', marginBottom: 12 }}>
          {message}
        </div>
      )}

      {editing !== null && (
        <div style={{ background: '#1e2335', border: '1px solid #2a3045', borderRadius: 10, padding: 20, marginBottom: 20 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#059669', marginBottom: 16 }}>
            {editing === 'new' ? 'Add Term' : 'Edit Term'}
          </div>
          <div style={{ display: 'grid', gap: 12 }}>
            <div>
              <label style={labelStyle}>Term *</label>
              <input style={inputStyle} value={form.term} onChange={e => setForm(f => ({ ...f, term: e.target.value }))} placeholder="e.g. Aggregate Demand" />
            </div>
            <div>
              <label style={labelStyle}>Definition *</label>
              <textarea style={{ ...inputStyle, resize: 'vertical' }} rows={3} value={form.definition} onChange={e => setForm(f => ({ ...f, definition: e.target.value }))} placeholder="The total demand for goods and services..." />
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
            <button onClick={handleSave} disabled={saving} style={{
              padding: '8px 20px', background: '#059669', color: 'white', border: 'none',
              borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: saving ? 'default' : 'pointer',
              opacity: saving ? 0.6 : 1, fontFamily: 'inherit'
            }}>
              {saving ? 'Saving...' : 'Save'}
            </button>
            <button onClick={cancel} style={{
              padding: '8px 20px', background: 'none', color: '#6b7a99', border: '1px solid #2a3045',
              borderRadius: 8, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit'
            }}>
              Cancel
            </button>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 16 }}>
        {editing === null && (
          <button onClick={startNew} style={{
            padding: '8px 20px', background: 'rgba(5,150,105,0.15)', color: '#059669',
            border: '1px solid #059669', borderRadius: 8, fontSize: 13, fontWeight: 600,
            cursor: 'pointer', fontFamily: 'inherit'
          }}>
            + Add Term
          </button>
        )}
        <input
          style={{ ...inputStyle, maxWidth: 260 }}
          placeholder="Search terms..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <span style={{ fontSize: 13, color: '#6b7a99' }}>{filtered.length} terms</span>
      </div>

      {filtered.map(term => (
        <div key={term.id} style={{
          background: '#1e2335', border: '1px solid #2a3045', borderRadius: 10,
          padding: 14, marginBottom: 6, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'
        }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#e8ecf5' }}>{term.term}</div>
            <div style={{ fontSize: 12, color: '#8892a8', marginTop: 2 }}>{term.definition}</div>
          </div>
          <div style={{ display: 'flex', gap: 8, marginLeft: 12 }}>
            <button onClick={() => startEdit(term)} style={{
              background: 'none', border: 'none', color: '#059669', fontSize: 12, cursor: 'pointer'
            }}>Edit</button>
            <button onClick={() => handleDelete(term.id)} style={{
              background: 'none', border: 'none', color: '#ef4444', fontSize: 12, cursor: 'pointer'
            }}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}
