"use client";

export default function FlowChain({ steps, result, resultType }) {
  const isGood = resultType === "good";

  const resultStyle = isGood
    ? {
        background: "var(--green-10)",
        border: "1px solid var(--green-25)",
        color: "var(--accent-green)",
      }
    : {
        background: "var(--red-6)",
        border: "1px solid var(--red-15)",
        color: "var(--accent-red)",
      };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: "4px",
        margin: "16px 0",
        alignItems: "center",
      }}
    >
      {steps.map((step, i) => (
        <span key={i} style={{ display: "contents" }}>
          <span
            style={{
              background: "var(--bg-input)",
              border: "1px solid var(--border-primary)",
              borderRadius: "6px",
              padding: "6px 11px",
              fontSize: "12px",
              fontWeight: 500,
              color: "var(--text-primary)",
            }}
          >
            {step}
          </span>
          {i < steps.length - 1 && (
            <span
              style={{
                color: "var(--accent-green)",
                fontSize: "15px",
                fontWeight: 700,
              }}
            >
              →
            </span>
          )}
        </span>
      ))}
      {result && (
        <>
          <span
            style={{
              color: "var(--accent-green)",
              fontSize: "15px",
              fontWeight: 700,
            }}
          >
            →
          </span>
          <span
            style={{
              ...resultStyle,
              borderRadius: "6px",
              padding: "6px 11px",
              fontSize: "12px",
              fontWeight: 500,
            }}
          >
            {result}
          </span>
        </>
      )}
    </div>
  );
}
