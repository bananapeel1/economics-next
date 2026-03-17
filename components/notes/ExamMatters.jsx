"use client";

function parseBold(text) {
  if (!text) return "";
  return text.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
}

export default function ExamMatters({ text }) {
  return (
    <div
      style={{
        background: "rgba(79,126,248,0.09)",
        border: "1px solid rgba(79,126,248,0.22)",
        borderRadius: "8px",
        padding: "12px 16px",
        margin: "16px 0",
      }}
    >
      <div
        style={{
          color: "var(--accent-blue)",
          textTransform: "uppercase",
          fontSize: "9.5px",
          fontWeight: 700,
          letterSpacing: "0.07em",
          marginBottom: "6px",
        }}
      >
        EXAM MATTERS
      </div>
      <div
        style={{
          fontSize: "13px",
          lineHeight: 1.65,
          color: "var(--text-secondary)",
        }}
        dangerouslySetInnerHTML={{ __html: parseBold(text) }}
      />
    </div>
  );
}
