export default function FlowChain({ steps, result, resultType }) {
  if (!steps?.length) return null;

  const resultClass = resultType === 'good'
    ? 'rl-flow-result--good'
    : resultType === 'bad'
      ? 'rl-flow-result--bad'
      : 'rl-flow-result--neutral';

  const resultIcon = resultType === 'good' ? '✓' : resultType === 'bad' ? '✗' : 'ℹ';

  return (
    <div className="rl-flow-chain">
      <div className="rl-flow-timeline">
        {steps.map((step, i) => {
          const parts = typeof step === 'string' ? step.split(' — ') : [step];
          const title = parts[0];
          const subtitle = parts[1] || null;

          return (
            <div key={i}>
              {/* Step row: node aligned with card */}
              <div className="rl-flow-tl-step">
                <div className="rl-flow-tl-node">
                  <span>{String(i + 1).padStart(2, '0')}</span>
                </div>
                <div className="rl-flow-tl-card">
                  <div className="rl-flow-tl-title">{title}</div>
                  {subtitle && <div className="rl-flow-tl-subtitle">{subtitle}</div>}
                </div>
              </div>
              {/* Arrow between steps */}
              {(i < steps.length - 1 || result) && (
                <div className="rl-flow-tl-arrow-row">
                  <span className="rl-flow-tl-arrow">↓</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

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
