"use client";
import { useState } from 'react';

const editorTabs = [
  { id: 'content', label: 'Content' },
  { id: 'notes', label: 'Notes' },
  { id: 'diagrams', label: 'Diagrams' },
  { id: 'flashcards', label: 'Flashcards' },
  { id: 'quiz', label: 'Quiz' },
  { id: 'mistakes', label: 'Mistakes' },
];

export default function SectionEditor({ sectionId, initialData }) {
  const [activeTab, setActiveTab] = useState('content');
  const [data, setData] = useState(initialData);
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  async function handleSave() {
    setSaving(true);
    setSaveMessage('');
    try {
      const res = await fetch(`/api/admin/sections/${sectionId}/${activeTab}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: data[activeTab] }),
      });
      if (res.ok) {
        setSaveMessage('Saved successfully!');
        setTimeout(() => setSaveMessage(''), 3000);
      } else {
        const err = await res.json();
        setSaveMessage(`Error: ${err.error}`);
      }
    } catch (err) {
      setSaveMessage(`Error: ${err.message}`);
    } finally {
      setSaving(false);
    }
  }

  function updateData(newTabData) {
    setData(prev => ({ ...prev, [activeTab]: newTabData }));
  }

  return (
    <div>
      {/* Tab bar */}
      <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid #2a3045', marginBottom: 20 }}>
        {editorTabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '10px 18px', fontSize: 13, fontWeight: activeTab === tab.id ? 600 : 500,
              color: activeTab === tab.id ? '#059669' : '#6b7a99',
              background: 'none', border: 'none', borderBottom: activeTab === tab.id ? '2px solid #059669' : '2px solid transparent',
              cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.15s'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Editor area */}
      <div style={{ marginBottom: 16 }}>
        {activeTab === 'flashcards' && (
          <FlashcardsEditor data={data.flashcards} onChange={updateData} />
        )}
        {activeTab === 'quiz' && (
          <QuizEditor data={data.quiz} onChange={updateData} />
        )}
        {activeTab === 'mistakes' && (
          <MistakesEditor data={data.mistakes || []} onChange={updateData} />
        )}
        {activeTab === 'notes' && (
          <NotesEditor data={data.notes} onChange={updateData} />
        )}
        {(activeTab === 'content' || activeTab === 'diagrams') && (
          <JsonEditor data={data[activeTab]} onChange={updateData} label={activeTab} />
        )}
      </div>

      {/* Save button */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 20 }}>
        <button
          onClick={handleSave}
          disabled={saving}
          style={{
            padding: '10px 28px', background: '#059669', color: 'white', border: 'none',
            borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: saving ? 'default' : 'pointer',
            opacity: saving ? 0.6 : 1, fontFamily: 'inherit'
          }}
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
        {saveMessage && (
          <span style={{ fontSize: 13, color: saveMessage.startsWith('Error') ? '#ef4444' : '#10b981' }}>
            {saveMessage}
          </span>
        )}
      </div>
    </div>
  );
}

// Flashcards editor - table of front/back pairs
function FlashcardsEditor({ data, onChange }) {
  function updateCard(index, field, value) {
    const newData = [...data];
    newData[index] = { ...newData[index], [field]: value };
    onChange(newData);
  }

  function addCard() {
    onChange([...data, { front: '', back: '' }]);
  }

  function removeCard(index) {
    onChange(data.filter((_, i) => i !== index));
  }

  return (
    <div>
      <div style={{ fontSize: 13, color: '#6b7a99', marginBottom: 12 }}>{data.length} flashcards</div>
      {data.map((card, i) => (
        <div key={i} style={{
          background: '#1e2335', border: '1px solid #2a3045', borderRadius: 10,
          padding: 16, marginBottom: 12
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#059669', textTransform: 'uppercase' }}>Card {i + 1}</span>
            <button onClick={() => removeCard(i)} style={{
              background: 'none', border: 'none', color: '#ef4444', fontSize: 12, cursor: 'pointer'
            }}>Remove</button>
          </div>
          <div style={{ marginBottom: 8 }}>
            <label style={{ fontSize: 11, color: '#6b7a99', display: 'block', marginBottom: 4 }}>Front (Question)</label>
            <textarea
              value={card.front}
              onChange={e => updateCard(i, 'front', e.target.value)}
              rows={2}
              style={{
                width: '100%', padding: '8px 12px', borderRadius: 6, border: '1px solid #2a3045',
                background: '#151825', color: '#e8ecf5', fontSize: 13, fontFamily: 'inherit',
                resize: 'vertical', outline: 'none'
              }}
            />
          </div>
          <div>
            <label style={{ fontSize: 11, color: '#6b7a99', display: 'block', marginBottom: 4 }}>Back (Answer — HTML supported)</label>
            <textarea
              value={card.back}
              onChange={e => updateCard(i, 'back', e.target.value)}
              rows={3}
              style={{
                width: '100%', padding: '8px 12px', borderRadius: 6, border: '1px solid #2a3045',
                background: '#151825', color: '#e8ecf5', fontSize: 13, fontFamily: 'inherit',
                resize: 'vertical', outline: 'none'
              }}
            />
          </div>
        </div>
      ))}
      <button onClick={addCard} style={{
        padding: '8px 20px', background: 'rgba(5,150,105,0.15)', color: '#059669',
        border: '1px solid #059669', borderRadius: 8, fontSize: 13, fontWeight: 600,
        cursor: 'pointer', fontFamily: 'inherit'
      }}>
        + Add Flashcard
      </button>
    </div>
  );
}

// Quiz editor
function QuizEditor({ data, onChange }) {
  function updateQuestion(index, field, value) {
    const newData = [...data];
    newData[index] = { ...newData[index], [field]: value };
    onChange(newData);
  }

  function updateOption(qIndex, optIndex, value) {
    const newData = [...data];
    const options = [...newData[qIndex].options];
    options[optIndex] = value;
    newData[qIndex] = { ...newData[qIndex], options };
    onChange(newData);
  }

  function addQuestion() {
    onChange([...data, { question: '', options: ['', '', '', ''], correctIndex: 0, explanation: '' }]);
  }

  function removeQuestion(index) {
    onChange(data.filter((_, i) => i !== index));
  }

  return (
    <div>
      <div style={{ fontSize: 13, color: '#6b7a99', marginBottom: 12 }}>{data.length} questions</div>
      {data.map((q, qi) => (
        <div key={qi} style={{
          background: '#1e2335', border: '1px solid #2a3045', borderRadius: 10,
          padding: 16, marginBottom: 16
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#059669', textTransform: 'uppercase' }}>Question {qi + 1}</span>
            <button onClick={() => removeQuestion(qi)} style={{
              background: 'none', border: 'none', color: '#ef4444', fontSize: 12, cursor: 'pointer'
            }}>Remove</button>
          </div>

          <textarea
            value={q.question}
            onChange={e => updateQuestion(qi, 'question', e.target.value)}
            rows={2}
            placeholder="Question text..."
            style={{
              width: '100%', padding: '8px 12px', borderRadius: 6, border: '1px solid #2a3045',
              background: '#151825', color: '#e8ecf5', fontSize: 13, fontFamily: 'inherit',
              resize: 'vertical', outline: 'none', marginBottom: 10
            }}
          />

          <div style={{ fontSize: 11, color: '#6b7a99', marginBottom: 6 }}>Options (select correct answer)</div>
          {q.options.map((opt, oi) => (
            <div key={oi} style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 6 }}>
              <input
                type="radio"
                name={`correct-${qi}`}
                checked={q.correctIndex === oi}
                onChange={() => updateQuestion(qi, 'correctIndex', oi)}
                style={{ accentColor: '#059669' }}
              />
              <input
                value={opt}
                onChange={e => updateOption(qi, oi, e.target.value)}
                placeholder={`Option ${oi + 1}`}
                style={{
                  flex: 1, padding: '6px 10px', borderRadius: 6, border: '1px solid #2a3045',
                  background: '#151825', color: '#e8ecf5', fontSize: 13, fontFamily: 'inherit', outline: 'none'
                }}
              />
            </div>
          ))}

          <div style={{ marginTop: 8 }}>
            <label style={{ fontSize: 11, color: '#6b7a99', display: 'block', marginBottom: 4 }}>Explanation</label>
            <textarea
              value={q.explanation}
              onChange={e => updateQuestion(qi, 'explanation', e.target.value)}
              rows={2}
              style={{
                width: '100%', padding: '8px 12px', borderRadius: 6, border: '1px solid #2a3045',
                background: '#151825', color: '#e8ecf5', fontSize: 13, fontFamily: 'inherit',
                resize: 'vertical', outline: 'none'
              }}
            />
          </div>
        </div>
      ))}
      <button onClick={addQuestion} style={{
        padding: '8px 20px', background: 'rgba(5,150,105,0.15)', color: '#059669',
        border: '1px solid #059669', borderRadius: 8, fontSize: 13, fontWeight: 600,
        cursor: 'pointer', fontFamily: 'inherit'
      }}>
        + Add Question
      </button>
    </div>
  );
}

// Notes editor
function NotesEditor({ data, onChange }) {
  function updateSection(index, field, value) {
    const newData = [...data];
    newData[index] = { ...newData[index], [field]: value };
    onChange(newData);
  }

  function updatePoint(sIndex, pIndex, value) {
    const newData = [...data];
    const points = [...newData[sIndex].points];
    points[pIndex] = value;
    newData[sIndex] = { ...newData[sIndex], points };
    onChange(newData);
  }

  function addPoint(sIndex) {
    const newData = [...data];
    newData[sIndex] = { ...newData[sIndex], points: [...newData[sIndex].points, ''] };
    onChange(newData);
  }

  function removePoint(sIndex, pIndex) {
    const newData = [...data];
    newData[sIndex] = { ...newData[sIndex], points: newData[sIndex].points.filter((_, i) => i !== pIndex) };
    onChange(newData);
  }

  function addSection() {
    onChange([...data, { title: '', points: [''] }]);
  }

  function removeSection(index) {
    onChange(data.filter((_, i) => i !== index));
  }

  return (
    <div>
      <div style={{ fontSize: 13, color: '#6b7a99', marginBottom: 12 }}>{data.length} note sections</div>
      {data.map((section, si) => (
        <div key={si} style={{
          background: '#1e2335', border: '1px solid #2a3045', borderRadius: 10,
          padding: 16, marginBottom: 12
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <input
              value={section.title}
              onChange={e => updateSection(si, 'title', e.target.value)}
              placeholder="Section title..."
              style={{
                flex: 1, padding: '6px 10px', borderRadius: 6, border: '1px solid #2a3045',
                background: '#151825', color: '#059669', fontSize: 14, fontWeight: 600,
                fontFamily: 'inherit', outline: 'none'
              }}
            />
            <button onClick={() => removeSection(si)} style={{
              background: 'none', border: 'none', color: '#ef4444', fontSize: 12, cursor: 'pointer', marginLeft: 8
            }}>Remove</button>
          </div>
          {section.points.map((point, pi) => (
            <div key={pi} style={{ display: 'flex', gap: 6, alignItems: 'flex-start', marginBottom: 4 }}>
              <span style={{ color: '#059669', marginTop: 8, fontSize: 12 }}>•</span>
              <textarea
                value={point}
                onChange={e => updatePoint(si, pi, e.target.value)}
                rows={1}
                style={{
                  flex: 1, padding: '6px 10px', borderRadius: 6, border: '1px solid #2a3045',
                  background: '#151825', color: '#c0c8dc', fontSize: 13, fontFamily: 'inherit',
                  resize: 'vertical', outline: 'none'
                }}
              />
              <button onClick={() => removePoint(si, pi)} style={{
                background: 'none', border: 'none', color: '#ef4444', fontSize: 11, cursor: 'pointer', marginTop: 6
              }}>×</button>
            </div>
          ))}
          <button onClick={() => addPoint(si)} style={{
            background: 'none', border: 'none', color: '#6b7a99', fontSize: 12, cursor: 'pointer', marginTop: 4
          }}>+ Add point</button>
        </div>
      ))}
      <button onClick={addSection} style={{
        padding: '8px 20px', background: 'rgba(5,150,105,0.15)', color: '#059669',
        border: '1px solid #059669', borderRadius: 8, fontSize: 13, fontWeight: 600,
        cursor: 'pointer', fontFamily: 'inherit'
      }}>
        + Add Section
      </button>
    </div>
  );
}

// Mistakes editor
function MistakesEditor({ data, onChange }) {
  function updateItem(index, field, value) {
    const newData = [...data];
    newData[index] = { ...newData[index], [field]: value };
    onChange(newData);
  }

  function addItem() {
    onChange([...data, { title: '', mistake: '', correction: '', examTip: '' }]);
  }

  function removeItem(index) {
    onChange(data.filter((_, i) => i !== index));
  }

  return (
    <div>
      <div style={{ fontSize: 13, color: '#6b7a99', marginBottom: 12 }}>{data.length} common mistakes</div>
      {data.map((item, i) => (
        <div key={i} style={{
          background: '#1e2335', border: '1px solid #2a3045', borderRadius: 10,
          padding: 16, marginBottom: 12
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#f59e0b', textTransform: 'uppercase' }}>Mistake {i + 1}</span>
            <button onClick={() => removeItem(i)} style={{
              background: 'none', border: 'none', color: '#ef4444', fontSize: 12, cursor: 'pointer'
            }}>Remove</button>
          </div>
          <div style={{ marginBottom: 8 }}>
            <label style={{ fontSize: 11, color: '#6b7a99', display: 'block', marginBottom: 4 }}>Title</label>
            <input
              value={item.title}
              onChange={e => updateItem(i, 'title', e.target.value)}
              placeholder="e.g. Confusing movement along vs shift of demand curve"
              style={{
                width: '100%', padding: '8px 12px', borderRadius: 6, border: '1px solid #2a3045',
                background: '#151825', color: '#e8ecf5', fontSize: 13, fontFamily: 'inherit', outline: 'none'
              }}
            />
          </div>
          <div style={{ marginBottom: 8 }}>
            <label style={{ fontSize: 11, color: '#ef4444', display: 'block', marginBottom: 4 }}>Common Mistake</label>
            <textarea
              value={item.mistake}
              onChange={e => updateItem(i, 'mistake', e.target.value)}
              rows={3}
              placeholder="What students get wrong..."
              style={{
                width: '100%', padding: '8px 12px', borderRadius: 6, border: '1px solid #2a3045',
                background: '#151825', color: '#e8ecf5', fontSize: 13, fontFamily: 'inherit',
                resize: 'vertical', outline: 'none'
              }}
            />
          </div>
          <div style={{ marginBottom: 8 }}>
            <label style={{ fontSize: 11, color: '#10b981', display: 'block', marginBottom: 4 }}>Correct Approach</label>
            <textarea
              value={item.correction}
              onChange={e => updateItem(i, 'correction', e.target.value)}
              rows={3}
              placeholder="The right way to answer..."
              style={{
                width: '100%', padding: '8px 12px', borderRadius: 6, border: '1px solid #2a3045',
                background: '#151825', color: '#e8ecf5', fontSize: 13, fontFamily: 'inherit',
                resize: 'vertical', outline: 'none'
              }}
            />
          </div>
          <div>
            <label style={{ fontSize: 11, color: '#f59e0b', display: 'block', marginBottom: 4 }}>Exam Tip (optional)</label>
            <textarea
              value={item.examTip || ''}
              onChange={e => updateItem(i, 'examTip', e.target.value)}
              rows={2}
              placeholder="Extra tip for the exam..."
              style={{
                width: '100%', padding: '8px 12px', borderRadius: 6, border: '1px solid #2a3045',
                background: '#151825', color: '#e8ecf5', fontSize: 13, fontFamily: 'inherit',
                resize: 'vertical', outline: 'none'
              }}
            />
          </div>
        </div>
      ))}
      <button onClick={addItem} style={{
        padding: '8px 20px', background: 'rgba(5,150,105,0.15)', color: '#059669',
        border: '1px solid #059669', borderRadius: 8, fontSize: 13, fontWeight: 600,
        cursor: 'pointer', fontFamily: 'inherit'
      }}>
        + Add Mistake
      </button>
    </div>
  );
}

// JSON editor fallback for content and diagrams
function JsonEditor({ data, onChange, label }) {
  const [text, setText] = useState(JSON.stringify(data, null, 2));
  const [error, setError] = useState('');

  function handleChange(value) {
    setText(value);
    try {
      const parsed = JSON.parse(value);
      onChange(parsed);
      setError('');
    } catch (e) {
      setError('Invalid JSON');
    }
  }

  return (
    <div>
      <div style={{ fontSize: 13, color: '#6b7a99', marginBottom: 8 }}>
        Edit {label} data as JSON. {error && <span style={{ color: '#ef4444' }}>{error}</span>}
      </div>
      <textarea
        value={text}
        onChange={e => handleChange(e.target.value)}
        rows={30}
        style={{
          width: '100%', padding: '12px 16px', borderRadius: 8, border: `1px solid ${error ? '#ef4444' : '#2a3045'}`,
          background: '#151825', color: '#e8ecf5', fontSize: 12, fontFamily: "'DM Mono', monospace",
          lineHeight: 1.5, resize: 'vertical', outline: 'none'
        }}
      />
    </div>
  );
}
