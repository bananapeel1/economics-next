"use client";

function parseBold(text) {
  if (!text) return "";
  return text.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
}

export default function Misconception({ text }) {
  return (
    <div
      style={{
        background: "var(--amber-8)",
        border: "1px solid var(--amber-20)",
        borderRadius: "8px",
        padding: "12px 16px",
        margin: "16px 0",
      }}
    >
      <div
        style={{
          color: "var(--accent-amber)",
          textTransform: "uppercase",
          fontSize: "9.5px",
          fontWeight: 700,
          letterSpacing: "0.07em",
          marginBottom: "6px",
        }}
      >
        COMMON MISCONCEPTION
      </div>
      <div
        style={{
          fontSize: "13px",
          lineHeight: 1.65,
          color: "var(--accent-amber-light)",
        }}
        dangerouslySetInnerHTML={{ __html: parseBold(text) }}
      />
    </div>
  );
}
