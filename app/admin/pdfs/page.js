"use client";
import { useState, useEffect } from 'react';

const CATEGORIES = ['General', 'Notes', 'Revision Guides', 'Cheat Sheets', 'Formulae', 'Other'];

export default function AdminPdfsPage() {
  const [pdfs, setPdfs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(null);

  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('General');
  const [pdfFile, setPdfFile] = useState(null);

  useEffect(() => { loadPdfs(); }, []);

  async function loadPdfs() {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/pdfs');
      if (res.ok) setPdfs(await res.json());
    } catch (e) {
      console.warn('Failed to load PDFs', e);
    }
    setLoading(false);
  }

  function resetForm() {
    setTitle('');
    setDescription('');
    setCategory('General');
    setPdfFile(null);
    setEditing(null);
  }

  function startEdit(pdf) {
    setEditing(pdf.id);
    setTitle(pdf.title);
    setDescription(pdf.description || '');
    setCategory(pdf.category || 'General');
    setPdfFile(null);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);

    const formData = new FormData();
    if (editing) formData.append('id', editing);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('category', category);
    if (pdfFile) formData.append('pdf_file', pdfFile);

    try {
      const res = await fetch('/api/admin/pdfs', {
        method: 'POST',
        body: formData,
      });
      if (res.ok) {
        resetForm();
        loadPdfs();
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
    if (!confirm('Delete this PDF?')) return;
    try {
      await fetch(`/api/admin/pdfs?id=${id}`, { method: 'DELETE' });
      loadPdfs();
    } catch (e) {
      alert('Failed to delete');
    }
  }

  // Group PDFs by category for display
  const grouped = {};
  pdfs.forEach(pdf => {
    const cat = pdf.category || 'General';
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push(pdf);
  });

  return (
    <div>
      <h1 style={{ fontSize: 22, fontWeight: 700, color: '#e8ecf5', marginBottom: 24 }}>
        PDFs
      </h1>

      <form
        onSubmit={handleSubmit}
        style={{
          background: '#151825', border: '1px solid #2a3045', borderRadius: 12,
          padding: 24, marginBottom: 32,
        }}
      >
        <h2 style={{ fontSize: 15, fontWeight: 600, color: '#e8ecf5', marginBottom: 16 }}>
          {editing ? 'Edit PDF' : 'Upload New PDF'}
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
          <div>
            <label style={labelStyle}>Title *</label>
            <input
              style={inputStyle}
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g. Unit 1 Key Definitions"
              required
            />
          </div>
          <div>
            <label style={labelStyle}>Category</label>
            <select style={inputStyle} value={category} onChange={e => setCategory(e.target.value)}>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        <div style={{ marginBottom: 12 }}>
          <label style={labelStyle}>Description</label>
          <input
            style={inputStyle}
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Brief description of this PDF (optional)"
          />
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={labelStyle}>PDF File {!editing && '*'}</label>
          <input
            type="file"
            accept="application/pdf"
            onChange={e => setPdfFile(e.target.files[0])}
            style={{ ...inputStyle, padding: '8px 10px' }}
            required={!editing}
          />
          {editing && !pdfFile && (
            <div style={{ fontSize: 11, color: '#6b7a99', marginTop: 4 }}>
              Leave empty to keep existing file
            </div>
          )}
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
            {saving ? 'Saving...' : editing ? 'Update PDF' : 'Upload PDF'}
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
      ) : pdfs.length === 0 ? (
        <div style={{ color: '#6b7a99', textAlign: 'center', padding: 40 }}>
          No PDFs yet. Upload one above.
        </div>
      ) : (
        Object.entries(grouped).map(([cat, items]) => (
          <div key={cat} style={{ marginBottom: 24 }}>
            <h3 style={{ fontSize: 13, fontWeight: 700, color: '#8892a8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>
              {cat} ({items.length})
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {items.map(pdf => (
                <div
                  key={pdf.id}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    background: '#151825', border: '1px solid #2a3045', borderRadius: 8,
                    padding: '12px 16px',
                  }}
                >
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: '#e8ecf5' }}>
                      {pdf.title}
                    </div>
                    <div style={{ fontSize: 12, color: '#6b7a99', marginTop: 2 }}>
                      {pdf.description && `${pdf.description} · `}
                      {pdf.file_name || 'No file'}
                      {pdf.file_url && (
                        <a href={pdf.file_url} target="_blank" rel="noopener noreferrer" style={{ color: '#059669', marginLeft: 8, textDecoration: 'none' }}>
                          View ↗
                        </a>
                      )}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 8, flexShrink: 0, marginLeft: 12 }}>
                    <button
                      onClick={() => startEdit(pdf)}
                      style={{
                        padding: '4px 12px', fontSize: 12, background: 'transparent',
                        color: '#059669', border: '1px solid #059669', borderRadius: 4, cursor: 'pointer',
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(pdf.id)}
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
          </div>
        ))
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
