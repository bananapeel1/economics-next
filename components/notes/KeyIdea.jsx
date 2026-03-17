"use client";

function parseBold(text) {
  if (!text) return "";
  return text.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
}

export default function KeyIdea({ text }) {
  return (
    <div
      style={{
        borderLeft: "3px solid var(--accent-green)",
        background: "var(--green-10)",
        border: "1px solid var(--green-25)",
        borderLeftWidth: "3px",
        borderLeftColor: "var(--accent-green)",
        borderRadius: "0 8px 8px 0",
        padding: "12px 16px",
        margin: "16px 0",
      }}
    >
      <div
        style={{
          color: "var(--accent-green)",
          textTransform: "uppercase",
          fontSize: "9.5px",
          fontWeight: 700,
          letterSpacing: "0.07em",
          marginBottom: "6px",
        }}
      >
        KEY IDEA
      </div>
      <div
        style={{
          fontSize: "13.5px",
          lineHeight: 1.65,
          color: "var(--accent-green-light)",
        }}
        dangerouslySetInnerHTML={{ __html: parseBold(text) }}
      />
    </div>
  );
}
