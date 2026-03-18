export default function FlowChain({ steps, result, resultType }) {
  if (!steps?.length) return null;

  const resultClass = resultType === 'good'
    ? 'rl-flow-result--good'
    : resultType === 'bad'
      ? 'rl-flow-result--bad'
      : 'rl-flow-result--neutral';

  return (
    <div className="rl-flow-chain">
      <div className="rl-flow-steps">
        {steps.map((step, i) => (
          <div key={i} className="rl-flow-step">
            {i > 0 && <span className="rl-flow-arrow">↓</span>}
            <span className="rl-flow-pill">{step}</span>
          </div>
        ))}
      </div>
      {result && (
        <div className="rl-flow-result-row">
          <span className="rl-flow-arrow">↓</span>
          <span className={`rl-flow-result ${resultClass}`}>{result}</span>
        </div>
      )}
    </div>
  );
}
