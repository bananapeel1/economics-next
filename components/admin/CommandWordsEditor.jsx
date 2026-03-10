"use client";
import { useState } from 'react';

const emptyWord = { word: '', definition: '', examiner_expects: '', example: '', sort_order: 0 };

export default function CommandWordsEditor({ initialWords }) {
  const [words, setWords] = useState(initialWords);
  const [editing, setEditing] = useState(null); // id or 'new'
  const [form, setForm] = useState(emptyWord);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  function startNew() {
    setForm(emptyWord);
    setEditing('new');
    setMessage('');
  }

  function startEdit(word) {
    setForm({ ...word });
    setEditing(word.id);
    setMessage('');
  }

  function cancel() {
    setEditing(null);
    setForm(emptyWord);
    setMessage('');
  }

  async function handleSave() {
    if (!form.word.trim() || !form.definition.trim() || !form.examiner_expects.trim()) {
      setMessage('Word, definition, and examiner expects are required.');
      return;
    }
    setSaving(true);
    setMessage('');
    try {
      const body = editing === 'new' ? { ...form } : { ...form, id: editing };
      const res = await fetch('/api/admin/command-words', {
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
          setWords(prev => [...prev, saved].sort((a, b) => (a.sort_order - b.sort_order) || a.word.localeCompare(b.word)));
        } else {
          setWords(prev => prev.map(w => w.id === saved.id ? saved : w));
        }
        setEditing(null);
        setForm(emptyWord);
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
    if (!confirm('Delete this command word?')) return;
    try {
      const res = await fetch(`/api/admin/command-words?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setWords(prev => prev.filter(w => w.id !== id));
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

  return (
    <div>
      {message && (
        <div style={{ fontSize: 13, color: message.startsWith('Error') ? '#ef4444' : '#10b981', marginBottom: 12 }}>
          {message}
        </div>
      )}

      {/* Form */}
      {editing !== null && (
        <div style={{ background: '#1e2335', border: '1px solid #2a3045', borderRadius: 10, padding: 20, marginBottom: 20 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#059669', marginBottom: 16 }}>
            {editing === 'new' ? 'Add Command Word' : 'Edit Command Word'}
          </div>
          <div style={{ display: 'grid', gap: 12 }}>
            <div>
              <label style={labelStyle}>Command Word *</label>
              <input style={inputStyle} value={form.word} onChange={e => setForm(f => ({ ...f, word: e.target.value }))} placeholder="e.g. Evaluate" />
            </div>
            <div>
              <label style={labelStyle}>Definition *</label>
              <textarea style={{ ...inputStyle, resize: 'vertical' }} rows={2} value={form.definition} onChange={e => setForm(f => ({ ...f, definition: e.target.value }))} placeholder="What this command word means..." />
            </div>
            <div>
              <label style={labelStyle}>What Examiners Expect *</label>
              <textarea style={{ ...inputStyle, resize: 'vertical' }} rows={3} value={form.examiner_expects} onChange={e => setForm(f => ({ ...f, examiner_expects: e.target.value }))} placeholder="How students should respond when they see this word..." />
            </div>
            <div>
              <label style={labelStyle}>Example (optional)</label>
              <textarea style={{ ...inputStyle, resize: 'vertical' }} rows={2} value={form.example} onChange={e => setForm(f => ({ ...f, example: e.target.value }))} placeholder="Example usage in a question..." />
            </div>
            <div>
              <label style={labelStyle}>Sort Order</label>
              <input style={{ ...inputStyle, width: 80 }} type="number" value={form.sort_order} onChange={e => setForm(f => ({ ...f, sort_order: parseInt(e.target.value) || 0 }))} />
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

      {/* Add button */}
      {editing === null && (
        <button onClick={startNew} style={{
          padding: '8px 20px', background: 'rgba(5,150,105,0.15)', color: '#059669',
          border: '1px solid #059669', borderRadius: 8, fontSize: 13, fontWeight: 600,
          cursor: 'pointer', fontFamily: 'inherit', marginBottom: 20
        }}>
          + Add Command Word
        </button>
      )}

      {/* List */}
      <div style={{ fontSize: 13, color: '#6b7a99', marginBottom: 12 }}>{words.length} command words</div>
      {words.map(word => (
        <div key={word.id} style={{
          background: '#1e2335', border: '1px solid #2a3045', borderRadius: 10,
          padding: 16, marginBottom: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'
        }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#e8ecf5' }}>{word.word}</div>
            <div style={{ fontSize: 13, color: '#8892a8', marginTop: 4 }}>{word.definition}</div>
          </div>
          <div style={{ display: 'flex', gap: 8, marginLeft: 12 }}>
            <button onClick={() => startEdit(word)} style={{
              background: 'none', border: 'none', color: '#059669', fontSize: 12, cursor: 'pointer'
            }}>Edit</button>
            <button onClick={() => handleDelete(word.id)} style={{
              background: 'none', border: 'none', color: '#ef4444', fontSize: 12, cursor: 'pointer'
            }}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}
