"use client";

export default function MistakesTab({ data }) {
  if (!data || data.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>⚠️</div>
        <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8, color: 'var(--text-primary)' }}>No common mistakes yet</div>
        <div style={{ fontSize: 14 }}>Common mistakes for this section will appear here.</div>
      </div>
    );
  }

  return (
    <div className="mistakes-container">
      <div className="mistakes-intro">
        Avoid these common mistakes that students frequently make in exams.
      </div>
      {data.map((item, i) => (
        <div className="mistake-card" key={i}>
          <div className="mistake-card-title">{item.title}</div>

          <div className="mistake-wrong">
            <div className="mistake-label mistake-wrong-label">✗ Common Mistake</div>
            <div className="mistake-text">{item.mistake}</div>
          </div>

          <div className="mistake-correct">
            <div className="mistake-label mistake-correct-label">✓ Correct Approach</div>
            <div className="mistake-text">{item.correction}</div>
          </div>

          {item.examTip && (
            <div className="exam-tip">
              <strong>💡 Exam Tip:</strong> {item.examTip}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
