"use client";

function parseBold(text) {
  if (!text) return "";
  return text.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
}

export default function Takeaway({ items }) {
  if (!items || items.length === 0) return null;

  return (
    <div
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border-primary)",
        borderRadius: "10px",
        padding: "16px",
        margin: "16px 0",
      }}
    >
      <div
        style={{
          color: "var(--text-muted)",
          textTransform: "uppercase",
          fontSize: "9.5px",
          fontWeight: 700,
          letterSpacing: "0.07em",
          marginBottom: "12px",
        }}
      >
        CHAPTER TAKEAWAY
      </div>
      {items.map((item, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "8px",
            marginBottom: i < items.length - 1 ? "8px" : 0,
            alignItems: "flex-start",
          }}
        >
          <span
            style={{
              color: "var(--accent-green)",
              fontWeight: 700,
              flexShrink: 0,
              lineHeight: 1.65,
            }}
          >
            ✓
          </span>
          <span
            style={{
              fontSize: "13px",
              lineHeight: 1.65,
              color: "var(--text-secondary)",
            }}
            dangerouslySetInnerHTML={{ __html: parseBold(item) }}
          />
        </div>
      ))}
    </div>
  );
}
