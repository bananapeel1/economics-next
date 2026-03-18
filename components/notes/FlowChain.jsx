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
      <div className="rl-flow-steps-row">
        {steps.map((step, i) => (
          <div key={i} className="rl-flow-step-item">
            {i > 0 && <span className="rl-flow-arrow">→</span>}
            <div className="rl-flow-pill">
              <span className="rl-flow-pill-num">{String(i + 1).padStart(2, '0')}</span>
              <span className="rl-flow-pill-text">{step}</span>
            </div>
          </div>
        ))}
      </div>
      {result && (
        <div className={`rl-flow-result ${resultClass}`}>
          <span className="rl-flow-result-icon">{resultIcon}</span>
          <span>{result}</span>
        </div>
      )}
    </div>
  );
}
