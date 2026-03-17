"use client";

function parseBold(text) {
  if (!text) return "";
  return text.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
}

export default function RealExample({ emoji, text }) {
  return (
    <div
      style={{
        background: "rgba(20,184,166,0.09)",
        border: "1px solid rgba(20,184,166,0.22)",
        borderRadius: "8px",
        padding: "12px 16px",
        margin: "16px 0",
      }}
    >
      <div
        style={{
          color: "#14b8a6",
          textTransform: "uppercase",
          fontSize: "9.5px",
          fontWeight: 700,
          letterSpacing: "0.07em",
          marginBottom: "6px",
        }}
      >
        {emoji && <span style={{ marginRight: "4px" }}>{emoji}</span>}
        REAL EXAMPLE
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
