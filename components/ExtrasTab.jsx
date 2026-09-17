"use client";
import PaywallOverlay from './PaywallOverlay';
import { PREVIEW_LIMITS } from '@/lib/preview-limits';
import { Star } from './Icons';

export default function ExtrasTab({ data, previewMode = false, totalCount }) {
  const chains = data?.chains || [];
  const evaluation = data?.evaluation || [];

  /* V018's class again. One literal stood for two separate caps that happen to both be 1, so
     changing either in lib/preview-limits.js would silently have moved neither here. */
  const CHAIN_LIMIT = PREVIEW_LIMITS.extrasChains;
  const EVALUATION_LIMIT = PREVIEW_LIMITS.extrasEvaluation;

  if (chains.length === 0 && evaluation.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}><Star size={48} /></div>
        <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8, color: 'var(--text-primary)' }}>
          No extras available yet
        </div>
        <div style={{ fontSize: 14 }}>
          Chains of analysis and evaluation points for this section are coming soon.
        </div>
      </div>
    );
  }

  const displayChains = previewMode ? chains.slice(0, CHAIN_LIMIT) : chains;
  const displayEvaluation = previewMode ? evaluation.slice(0, EVALUATION_LIMIT) : evaluation;

  return (
    <div className="extras-tab">
      {previewMode && (
        <div className="flashcard-preview-badge">
          {/* The total comes from `counts`, never from the arrays this component just sliced. */}
          Preview — {displayChains.length + displayEvaluation.length}
          {totalCount > 0 ? ` of ${totalCount}` : ''} extras
        </div>
      )}

      {displayChains.length > 0 && (
        <div className="extras-section">
          <div className="extras-section-header">
            <span className="extras-section-icon chain-icon">🔗</span>
            <div>
              <h2 className="extras-section-title">Chains of Analysis</h2>
              <p className="extras-section-subtitle">
                Step-by-step logical reasoning chains for extended response questions (10–14 marks)
              </p>
            </div>
          </div>

          <div className="extras-cards">
            {displayChains.map((chain, i) => (
              <div key={i} className="extras-card chain-card">
                <div className="extras-card-header chain-header">
                  <span className="extras-card-number">{i + 1}</span>
                  <h3 className="extras-card-title">{chain.title}</h3>
                </div>

                <div className="chain-steps">
                  {chain.steps.map((step, si) => (
                    <div key={si} className="chain-step">
                      <div className="chain-step-connector">
                        <div className="chain-step-dot" />
                        {si < chain.steps.length - 1 && <div className="chain-step-line" />}
                      </div>
                      <div className="chain-step-content">
                        <span className="chain-step-label">Step {si + 1}</span>
                        <p className="chain-step-text">{step}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {chain.result && (
                  <div className="chain-result">
                    <span className="chain-result-icon">⇒</span>
                    <div>
                      <span className="chain-result-label">Result</span>
                      <p className="chain-result-text">{chain.result}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {displayEvaluation.length > 0 && (
        <div className="extras-section">
          <div className="extras-section-header">
            <span className="extras-section-icon eval-icon">⚖️</span>
            <div>
              <h2 className="extras-section-title">Evaluation Points</h2>
              <p className="extras-section-subtitle">
                Analytical evaluation paragraphs to strengthen your critical thinking and exam technique
              </p>
            </div>
          </div>

          <div className="extras-cards">
            {displayEvaluation.map((point, i) => (
              <div key={i} className="extras-card eval-card">
                <div className="extras-card-header eval-header">
                  <span className="extras-card-number">{i + 1}</span>
                  <h3 className="extras-card-title">{point.title}</h3>
                </div>
                <div className="eval-content">
                  <p>{point.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* `> 0`, not `Number.isFinite`, here and in the badge above: StudyApp builds this prop as a
          SUM of two counts, so it is a number even when `counts` is missing — and a finiteness
          guard would then have printed "of 0" instead of omitting the total. */}
      {previewMode && (
        <PaywallOverlay
          feature="Extras"
          previewText={totalCount > 0
            ? `${Math.max(0, totalCount - (displayChains.length + displayEvaluation.length))} more extras available`
            : 'More extras available'}
        />
      )}
    </div>
  );
}
