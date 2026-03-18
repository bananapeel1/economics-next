export default function FlowChain({ steps, result, resultType }) {
  if (!steps?.length) return null;

  const resultClass = resultType === 'good'
    ? 'rl-flow-result--good'
    : resultType === 'bad'
      ? 'rl-flow-result--bad'
      : 'rl-flow-result--neutral';

  return (
    <div className="rl-flow-chain">
      {steps.map((step, i) => (
        <span key={i}>
          {i > 0 && <span className="rl-flow-arrow">→</span>}
          <span className="rl-flow-pill">{step}</span>
        </span>
      ))}
      {result && (
        <>
          <span className="rl-flow-arrow">→</span>
          <span className={`rl-flow-result ${resultClass}`}>{result}</span>
        </>
      )}
    </div>
  );
}
