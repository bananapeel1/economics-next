"use client";

export default function ChapterSection({ id, heading, children }) {
  return (
    <div id={id} style={{ marginBottom: "48px" }}>
      <h2
        style={{
          fontFamily: "'DM Serif Display', serif",
          fontSize: "22px",
          fontWeight: 400,
          color: "var(--text-primary)",
          borderBottom: "1px solid var(--border-primary)",
          paddingBottom: "16px",
          marginBottom: "20px",
        }}
      >
        {heading}
      </h2>
      {children}
    </div>
  );
}
