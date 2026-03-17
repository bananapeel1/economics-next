"use client";

import KeyIdea from "./KeyIdea";
import FlowChain from "./FlowChain";
import RealExample from "./RealExample";
import Misconception from "./Misconception";
import ExamMatters from "./ExamMatters";

function parseBold(text) {
  if (!text) return "";
  return text.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
}

function renderBodyItem(item, index) {
  if (!item) return null;

  if (typeof item === "string") {
    return (
      <p
        key={index}
        style={{
          fontSize: "14px",
          lineHeight: 1.6,
          color: "var(--text-secondary)",
          marginBottom: "12px",
        }}
        dangerouslySetInnerHTML={{ __html: parseBold(item) }}
      />
    );
  }

  switch (item.type) {
    case "paragraph":
      return (
        <p
          key={index}
          style={{
            fontSize: "14px",
            lineHeight: 1.6,
            color: "var(--text-secondary)",
            marginBottom: "12px",
          }}
          dangerouslySetInnerHTML={{ __html: parseBold(item.text || item.content || "") }}
        />
      );

    case "subheading":
      return (
        <h4
          key={index}
          style={{
            fontSize: "14px",
            fontWeight: 600,
            color: "var(--text-primary)",
            margin: "20px 0 8px",
          }}
        >
          {item.text || item.content}
        </h4>
      );

    case "bullets":
      return (
        <ul
          key={index}
          className="notes-list"
          style={{
            paddingLeft: "20px",
            marginBottom: "12px",
          }}
        >
          {(item.items || []).map((bullet, bi) => (
            <li
              key={bi}
              style={{
                fontSize: "14px",
                lineHeight: 1.6,
                color: "var(--text-secondary)",
                marginBottom: "4px",
              }}
              dangerouslySetInnerHTML={{ __html: parseBold(bullet) }}
            />
          ))}
        </ul>
      );

    case "flowchain":
    case "flow":
      return (
        <FlowChain
          key={index}
          steps={item.steps || []}
          result={item.result}
          resultType={item.resultType}
        />
      );

    case "diagram":
      return (
        <div
          key={index}
          style={{
            margin: "16px 0",
            padding: "16px",
            background: "var(--bg-input)",
            border: "1px solid var(--border-primary)",
            borderRadius: "8px",
            fontSize: "13px",
            color: "var(--text-secondary)",
          }}
          dangerouslySetInnerHTML={{ __html: parseBold(item.content || item.text || "") }}
        />
      );

    case "html":
      return (
        <div
          key={index}
          style={{
            fontSize: "14px",
            lineHeight: 1.6,
            color: "var(--text-secondary)",
            marginBottom: "12px",
          }}
          dangerouslySetInnerHTML={{ __html: item.content || item.text || "" }}
        />
      );

    default:
      if (item.text || item.content) {
        return (
          <p
            key={index}
            style={{
              fontSize: "14px",
              lineHeight: 1.6,
              color: "var(--text-secondary)",
              marginBottom: "12px",
            }}
            dangerouslySetInnerHTML={{ __html: parseBold(item.text || item.content || "") }}
          />
        );
      }
      return null;
  }
}

export default function NoteSection({
  id,
  title,
  keyIdea,
  body,
  realExample,
  misconception,
  examMatters,
}) {
  return (
    <div id={id} style={{ marginBottom: "32px" }}>
      {title && (
        <h3
          style={{
            fontSize: "16px",
            fontWeight: 600,
            color: "var(--text-primary)",
            marginBottom: "16px",
          }}
        >
          {title}
        </h3>
      )}

      {keyIdea && <KeyIdea text={keyIdea} />}

      {body && Array.isArray(body) && body.map((item, i) => renderBodyItem(item, i))}

      {realExample && (
        <RealExample
          emoji={realExample.emoji}
          text={realExample.text}
        />
      )}

      {misconception && <Misconception text={misconception} />}

      {examMatters && <ExamMatters text={examMatters} />}
    </div>
  );
}
