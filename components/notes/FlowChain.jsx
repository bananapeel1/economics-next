export default function FlowChain({ steps, result, resultType, label }) {
  if (!steps?.length) return null;

  const resultClass = resultType === 'good'
    ? 'rl-flow-result--good'
    : resultType === 'bad'
      ? 'rl-flow-result--bad'
      : 'rl-flow-result--neutral';

  const resultIcon = resultType === 'good' ? '✓' : resultType === 'bad' ? '✗' : 'ℹ';

  return (
    <div className="rl-flow-chain">
      {/* Timeline */}
      <div className="rl-flow-timeline">
        {steps.map((step, i) => {
          // Support "Title — Subtitle" format
          const parts = typeof step === 'string' ? step.split(' — ') : [step];
          const title = parts[0];
          const subtitle = parts[1] || null;

          return (
            <div key={i} className="rl-flow-tl-step">
              {/* Node + connector */}
              <div className="rl-flow-tl-rail">
                <div className="rl-flow-tl-node">
                  <span>{String(i + 1).padStart(2, '0')}</span>
                </div>
                {(i < steps.length - 1 || result) && (
                  <div className="rl-flow-tl-connector">
                    <span className="rl-flow-tl-arrow">↓</span>
                  </div>
                )}
              </div>
              {/* Card */}
              <div className="rl-flow-tl-card">
                <div className="rl-flow-tl-title">{title}</div>
                {subtitle && <div className="rl-flow-tl-subtitle">{subtitle}</div>}
              </div>
            </div>
          );
        })}
      </div>

      {/* Result */}
      {result && (
        <div className={`rl-flow-result ${resultClass}`}>
          <div className="rl-flow-result-badge">{resultIcon}</div>
          <div className="rl-flow-result-content">
            <div className="rl-flow-result-label">RESULT</div>
            <div className="rl-flow-result-text">{result}</div>
          </div>
        </div>
      )}
    </div>
  );
}
