"use client";

import { useState } from "react";

export default function ChapterNav({ chapters, activeId, onChapterClick }) {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: "8px",
        marginBottom: "24px",
        paddingBottom: "20px",
        borderBottom: "1px solid var(--border-primary)",
      }}
    >
      {chapters.map((chapter) => {
        const isActive = chapter.id === activeId;
        const isHovered = chapter.id === hoveredId;

        return (
          <button
            key={chapter.id}
            onClick={() => onChapterClick(chapter.id)}
            onMouseEnter={() => setHoveredId(chapter.id)}
            onMouseLeave={() => setHoveredId(null)}
            style={{
              borderRadius: "20px",
              padding: "5px 12px",
              fontSize: "12px",
              fontWeight: 500,
              cursor: "pointer",
              transition: "all 0.15s",
              background: isActive ? "var(--green-15)" : "var(--bg-input)",
              border: isActive
                ? "1px solid var(--green-25)"
                : "1px solid var(--border-primary)",
              color: isActive || isHovered
                ? "var(--accent-green)"
                : "var(--text-tertiary)",
              borderColor: isHovered && !isActive
                ? "var(--accent-green)"
                : undefined,
              outline: "none",
              fontFamily: "inherit",
            }}
          >
            {chapter.label}
          </button>
        );
      })}
    </div>
  );
}
