"use client";
import { useState, useEffect } from 'react';

export default function AdminPastPapersPage() {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(null);

  // Form state
  const [title, setTitle] = useState('');
  const [year, setYear] = useState(new Date().getFullYear());
  const [session, setSession] = useState('January');
  const [paperNumber, setPaperNumber] = useState(1);
  const [unit, setUnit] = useState(1);
  const [paperFile, setPaperFile] = useState(null);
  const [markSchemeFile, setMarkSchemeFile] = useState(null);

  useEffect(() => { loadPapers(); }, []);

  async function loadPapers() {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/past-papers');
      if (res.ok) setPapers(await res.json());
    } catch (e) {
      console.warn('Failed to load papers', e);
    }
    setLoading(false);
  }

  function resetForm() {
    setTitle('');
    setYear(new Date().getFullYear());
    setSession('January');
    setPaperNumber(1);
    setUnit(1);
    setPaperFile(null);
    setMarkSchemeFile(null);
    setEditing(null);
  }

  function startEdit(paper) {
    setEditing(paper.id);
    setTitle(paper.title);
    setYear(paper.year);
    setSession(paper.session);
    setPaperNumber(paper.paper_number);
    setUnit(paper.unit);
    setPaperFile(null);
    setMarkSchemeFile(null);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);

    const formData = new FormData();
    if (editing) formData.append('id', editing);
    formData.append('title', title);
    formData.append('year', year);
    formData.append('session', session);
    formData.append('paper_number', paperNumber);
    formData.append('unit', unit);
    if (paperFile) formData.append('paper_file', paperFile);
    if (markSchemeFile) formData.append('mark_scheme_file', markSchemeFile);

    try {
      const res = await fetch('/api/admin/past-papers', {
        method: 'POST',
        body: formData,
      });
      if (res.ok) {
        resetForm();
        loadPapers();
      } else {
        const err = await res.json();
        alert(err.error || 'Failed to save');
      }
    } catch (e) {
      alert('Network error');
    }
    setSaving(false);
  }

  async function handleDelete(id) {
    if (!confirm('Delete this paper?')) return;
    try {
      await fetch(`/api/admin/past-papers?id=${id}`, { method: 'DELETE' });
      loadPapers();
    } catch (e) {
      alert('Failed to delete');
    }
  }

  return (
    <div>
      <h1 style={{ fontSize: 22, fontWeight: 700, color: '#e8ecf5', marginBottom: 24 }}>
        Past Papers
      </h1>

      <form
        onSubmit={handleSubmit}
        style={{
          background: '#151825', border: '1px solid #2a3045', borderRadius: 12,
          padding: 24, marginBottom: 32,
        }}
      >
        <h2 style={{ fontSize: 15, fontWeight: 600, color: '#e8ecf5', marginBottom: 16 }}>
          {editing ? 'Edit Paper' : 'Add New Paper'}
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
          <div>
            <label style={labelStyle}>Title *</label>
            <input
              style={inputStyle}
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g. Unit 1 Paper 1"
              required
            />
          </div>
          <div>
            <label style={labelStyle}>Year *</label>
            <input
              style={inputStyle}
              type="number"
              value={year}
              onChange={e => setYear(parseInt(e.target.value))}
              min={2000}
              max={2030}
              required
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 16 }}>
          <div>
            <label style={labelStyle}>Session *</label>
            <select style={inputStyle} value={session} onChange={e => setSession(e.target.value)}>
              <option>January</option>
              <option>June</option>
              <option>October</option>
            </select>
          </div>
          <div>
            <label style={labelStyle}>Paper Number</label>
            <select style={inputStyle} value={paperNumber} onChange={e => setPaperNumber(parseInt(e.target.value))}>
              <option value={1}>Paper 1</option>
              <option value={2}>Paper 2</option>
            </select>
          </div>
          <div>
            <label style={labelStyle}>Unit</label>
            <select style={inputStyle} value={unit} onChange={e => setUnit(parseInt(e.target.value))}>
              <option value={1}>Unit 1</option>
              <option value={2}>Unit 2</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
          <div>
            <label style={labelStyle}>Question Paper (PDF)</label>
            <input
              type="file"
              accept="application/pdf"
              onChange={e => setPaperFile(e.target.files[0])}
              style={{ ...inputStyle, padding: '8px 10px' }}
            />
            {editing && !paperFile && (
              <div style={{ fontSize: 11, color: '#6b7a99', marginTop: 4 }}>
                Leave empty to keep existing file
              </div>
            )}
          </div>
          <div>
            <label style={labelStyle}>Mark Scheme (PDF)</label>
            <input
              type="file"
              accept="application/pdf"
              onChange={e => setMarkSchemeFile(e.target.files[0])}
              style={{ ...inputStyle, padding: '8px 10px' }}
            />
            {editing && !markSchemeFile && (
              <div style={{ fontSize: 11, color: '#6b7a99', marginTop: 4 }}>
                Leave empty to keep existing file
              </div>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          <button
            type="submit"
            disabled={saving}
            style={{
              padding: '8px 20px', background: '#059669', color: 'white',
              border: 'none', borderRadius: 6, fontSize: 13, fontWeight: 600,
              cursor: 'pointer', opacity: saving ? 0.6 : 1,
            }}
          >
            {saving ? 'Saving...' : editing ? 'Update Paper' : 'Add Paper'}
          </button>
          {editing && (
            <button
              type="button"
              onClick={resetForm}
              style={{
                padding: '8px 20px', background: 'transparent', color: '#6b7a99',
                border: '1px solid #2a3045', borderRadius: 6, fontSize: 13, cursor: 'pointer',
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {loading ? (
        <div style={{ color: '#6b7a99', textAlign: 'center', padding: 40 }}>Loading...</div>
      ) : papers.length === 0 ? (
        <div style={{ color: '#6b7a99', textAlign: 'center', padding: 40 }}>
          No papers yet. Add one above.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {papers.map(paper => (
            <div
              key={paper.id}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                background: '#151825', border: '1px solid #2a3045', borderRadius: 8,
                padding: '12px 16px',
              }}
            >
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#e8ecf5' }}>
                  {paper.title}
                </div>
                <div style={{ fontSize: 12, color: '#6b7a99', marginTop: 2 }}>
                  {paper.year} &middot; {paper.session} &middot; Unit {paper.unit} &middot; Paper {paper.paper_number}
                  {paper.paper_url && ' · 📄 Paper'}
                  {paper.mark_scheme_url && ' · ✅ Mark Scheme'}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button
                  onClick={() => startEdit(paper)}
                  style={{
                    padding: '4px 12px', fontSize: 12, background: 'transparent',
                    color: '#059669', border: '1px solid #059669', borderRadius: 4, cursor: 'pointer',
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(paper.id)}
                  style={{
                    padding: '4px 12px', fontSize: 12, background: 'transparent',
                    color: '#ef4444', border: '1px solid #ef4444', borderRadius: 4, cursor: 'pointer',
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const labelStyle = {
  display: 'block', fontSize: 12, fontWeight: 600, color: '#8892a8',
  marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.05em',
};

const inputStyle = {
  width: '100%', padding: '8px 12px', background: '#0f1117',
  border: '1px solid #2a3045', borderRadius: 6, color: '#e8ecf5',
  fontSize: 13, outline: 'none',
};
