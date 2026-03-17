"use client";
import { useState, useEffect, useRef } from 'react';

const S = {
  page: { maxWidth: 800 },
  h1: { fontSize: 22, fontWeight: 700, color: '#e8ecf5', marginBottom: 24 },
  row: { display: 'flex', gap: 12, marginBottom: 20 },
  select: {
    flex: 1, padding: '10px 14px', borderRadius: 8, border: '1px solid #2a3045',
    background: '#151825', color: '#cdd4e6', fontSize: 13, outline: 'none',
  },
  card: {
    background: '#1a2235', border: '1px solid #2a3045', borderRadius: 10,
    padding: 16, marginBottom: 16,
  },
  cardTitle: { fontSize: 14, fontWeight: 600, color: '#e8ecf5', marginBottom: 4 },
  cardDesc: { fontSize: 12, color: '#7f8daa', marginBottom: 12 },
  img: { maxWidth: '100%', maxHeight: 300, borderRadius: 8, marginBottom: 12 },
  deleteBtn: {
    padding: '6px 14px', borderRadius: 6, border: '1px solid #ef4444',
    background: 'rgba(239,68,68,0.1)', color: '#ef4444', fontSize: 12,
    cursor: 'pointer', fontWeight: 600,
  },
  dropzone: {
    border: '2px dashed #2a3045', borderRadius: 10, padding: 40,
    textAlign: 'center', color: '#7f8daa', cursor: 'pointer',
    marginBottom: 16, transition: 'all 0.2s',
  },
  dropzoneActive: {
    borderColor: '#059669', background: 'rgba(5,150,105,0.06)', color: '#10b981',
  },
  input: {
    width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #2a3045',
    background: '#151825', color: '#cdd4e6', fontSize: 13, outline: 'none', marginBottom: 10,
  },
  uploadBtn: {
    padding: '10px 20px', borderRadius: 8, border: 'none',
    background: '#059669', color: '#fff', fontSize: 13, fontWeight: 600,
    cursor: 'pointer',
  },
  empty: { color: '#5a6a80', fontSize: 13, textAlign: 'center', padding: 32 },
};

export default function AdminDiagramsPage() {
  const [subjects, setSubjects] = useState([]);
  const [sections, setSections] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [diagrams, setDiagrams] = useState([]);
  const [loading, setLoading] = useState(false);

  // Upload form
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef(null);

  // Fetch subjects on mount
  useEffect(() => {
    fetch('/api/subjects').then(r => r.json()).then(data => {
      setSubjects(data || []);
      if (data?.length) setSelectedSubject(data[0].id);
    }).catch(() => {});
  }, []);

  // Fetch sections when subject changes
  useEffect(() => {
    if (!selectedSubject) return;
    fetch(`/api/sections?subject_id=${selectedSubject}`)
      .then(r => r.json())
      .then(data => {
        const flat = [];
        (data || []).forEach(unit => {
          (unit.sections || []).forEach(sec => flat.push(sec));
        });
        setSections(flat);
        setSelectedSection('');
        setDiagrams([]);
      })
      .catch(() => {});
  }, [selectedSubject]);

  // Fetch diagrams when section changes
  useEffect(() => {
    if (!selectedSection) { setDiagrams([]); return; }
    setLoading(true);
    fetch(`/api/admin/diagrams?section_id=${selectedSection}`)
      .then(r => r.json())
      .then(data => { setDiagrams(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, [selectedSection]);

  async function handleUpload() {
    if (!file || !selectedSection) return;
    setUploading(true);
    const form = new FormData();
    form.append('file', file);
    form.append('section_id', selectedSection);
    form.append('title', title || file.name.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' '));
    form.append('description', description);

    const res = await fetch('/api/admin/diagrams', { method: 'POST', body: form });
    const data = await res.json();
    if (data.diagrams) setDiagrams(data.diagrams);
    setFile(null); setTitle(''); setDescription('');
    setUploading(false);
  }

  async function handleDelete(index) {
    if (!confirm('Delete this diagram?')) return;
    const res = await fetch(`/api/admin/diagrams?section_id=${selectedSection}&index=${index}`, { method: 'DELETE' });
    const data = await res.json();
    if (data.diagrams) setDiagrams(data.diagrams);
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files[0];
    if (f && /image\/(png|jpeg|svg|webp)/.test(f.type)) setFile(f);
  }

  return (
    <div style={S.page}>
      <h1 style={S.h1}>Diagrams</h1>

      <div style={S.row}>
        <select style={S.select} value={selectedSubject} onChange={e => setSelectedSubject(e.target.value)}>
          <option value="">Select subject</option>
          {subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
        </select>
        <select style={S.select} value={selectedSection} onChange={e => setSelectedSection(e.target.value)}>
          <option value="">Select section</option>
          {sections.map(s => <option key={s.id} value={s.id}>{s.number} {s.name}</option>)}
        </select>
      </div>

      {selectedSection && (
        <>
          {/* Existing diagrams */}
          <h2 style={{ fontSize: 15, fontWeight: 600, color: '#cdd4e6', marginBottom: 12 }}>
            Current Diagrams ({diagrams.length})
          </h2>
          {loading ? (
            <p style={S.empty}>Loading...</p>
          ) : diagrams.length === 0 ? (
            <p style={S.empty}>No diagrams yet. Upload one below.</p>
          ) : (
            diagrams.map((d, i) => (
              <div key={i} style={S.card}>
                <div style={S.cardTitle}>{d.title}</div>
                {d.description && <div style={S.cardDesc}>{d.description}</div>}
                {d.imageUrl ? (
                  <img src={d.imageUrl} alt={d.title} style={S.img} />
                ) : d.svg ? (
                  <div style={{ fontSize: 12, color: '#5a6a80', marginBottom: 12 }}>SVG diagram (legacy)</div>
                ) : null}
                <button style={S.deleteBtn} onClick={() => handleDelete(i)}>Delete</button>
              </div>
            ))
          )}

          {/* Upload form */}
          <h2 style={{ fontSize: 15, fontWeight: 600, color: '#cdd4e6', margin: '24px 0 12px' }}>
            Upload New Diagram
          </h2>
          <div
            style={{ ...S.dropzone, ...(dragOver ? S.dropzoneActive : {}) }}
            onDragOver={e => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileRef.current?.click()}
          >
            {file ? (
              <span style={{ color: '#10b981', fontWeight: 600 }}>{file.name}</span>
            ) : (
              <>Drop an image here or click to select<br /><span style={{ fontSize: 11 }}>PNG, JPG, SVG, WebP</span></>
            )}
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={e => e.target.files[0] && setFile(e.target.files[0])}
            />
          </div>
          <input style={S.input} placeholder="Diagram title" value={title} onChange={e => setTitle(e.target.value)} />
          <input style={S.input} placeholder="Description (optional)" value={description} onChange={e => setDescription(e.target.value)} />
          <button style={{ ...S.uploadBtn, opacity: (!file || uploading) ? 0.5 : 1 }} disabled={!file || uploading} onClick={handleUpload}>
            {uploading ? 'Uploading...' : 'Upload Diagram'}
          </button>
        </>
      )}
    </div>
  );
}
