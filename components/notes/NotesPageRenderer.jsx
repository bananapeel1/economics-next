"use client";

import { useState, useCallback, useEffect } from "react";
import ChapterNav from "./ChapterNav";
import ChapterSection from "./ChapterSection";
import NoteSection from "./NoteSection";
import Takeaway from "./Takeaway";

export default function NotesPageRenderer({ specPoint, glossaryTerms }) {
  const chapters = specPoint?.chapters || [];
  const [activeId, setActiveId] = useState(
    chapters.length > 0 ? chapters[0].id : ""
  );

  const handleChapterClick = useCallback((chapterId) => {
    setActiveId(chapterId);
    const el = document.getElementById(chapterId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const navChapters = chapters.map((ch) => ({
    id: ch.id,
    label: ch.label || ch.heading,
  }));

  return (
    <div>
      {/* Page Header */}
      <div style={{ marginBottom: "24px" }}>
        {specPoint?.ref && (
          <span
            style={{
              display: "inline-block",
              background: "var(--green-15)",
              color: "var(--accent-green)",
              fontSize: "11px",
              fontWeight: 600,
              borderRadius: "4px",
              padding: "2px 8px",
              marginBottom: "8px",
            }}
          >
            {specPoint.ref}
          </span>
        )}
        {specPoint?.title && (
          <h1
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "28px",
              fontWeight: 400,
              color: "var(--text-primary)",
              margin: "0 0 4px 0",
            }}
          >
            {specPoint.title}
          </h1>
        )}
        {specPoint?.subtitle && (
          <p
            style={{
              fontSize: "14px",
              color: "var(--text-tertiary)",
              margin: "0 0 24px 0",
            }}
          >
            {specPoint.subtitle}
          </p>
        )}
      </div>

      {/* Chapter Navigation */}
      {navChapters.length > 1 && (
        <ChapterNav
          chapters={navChapters}
          activeId={activeId}
          onChapterClick={handleChapterClick}
        />
      )}

      {/* Chapters */}
      {chapters.map((chapter) => (
        <ChapterSection
          key={chapter.id}
          id={chapter.id}
          heading={chapter.heading}
        >
          {(chapter.sections || []).map((section, si) => (
            <NoteSection
              key={section.id || si}
              id={section.id}
              title={section.title}
              keyIdea={section.keyIdea}
              body={section.body}
              realExample={section.realExample}
              misconception={section.misconception}
              examMatters={section.examMatters}
            />
          ))}
          {chapter.takeaway && <Takeaway items={chapter.takeaway} />}
        </ChapterSection>
      ))}

      {/* Links To */}
      {specPoint?.linksTo && specPoint.linksTo.length > 0 && (
        <div style={{ marginTop: "32px", paddingTop: "20px", borderTop: "1px solid var(--border-primary)" }}>
          <div
            style={{
              color: "var(--text-muted)",
              textTransform: "uppercase",
              fontSize: "9.5px",
              fontWeight: 700,
              letterSpacing: "0.07em",
              marginBottom: "10px",
            }}
          >
            LINKS TO
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {specPoint.linksTo.map((link, i) => (
              <span
                key={i}
                style={{
                  background: "var(--bg-input)",
                  border: "1px solid var(--border-primary)",
                  borderRadius: "6px",
                  padding: "4px 10px",
                  fontSize: "12px",
                  fontWeight: 500,
                  color: "var(--text-tertiary)",
                }}
              >
                {typeof link === "string" ? link : link.label || link.ref}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
