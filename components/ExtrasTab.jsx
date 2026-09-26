"use client";
import PaywallOverlay from './PaywallOverlay';
import { PREVIEW_LIMITS } from '@/lib/preview-limits';
import { Star } from './Icons';
import { parseInlineMarkdown } from '@/lib/parse-inline-markdown';

/*
 * EVERY TEXT FIELD GOES THROUGH THE NOTES PARSER. Evaluation bodies use **bold** for run-in labels
 * ("**Size relative to the economy** — a deficit of…"), and this tab printed them as plain text, so
 * a student saw the asterisks. Packet 45's walkthrough found it; on 26 Sep 2026, 14 live frames across
 * six sections carried it, and in all six the first frame, the one a free student is shown, was one
 * of them. Only the bodies carry markup today, but titles, steps and results go through the same path
 * so the next field to gain some does not reopen this. The parser escapes before it adds tags, so
 * nothing in the content becomes markup except the bold and italic it intends.
 */
function Inline({ as: Tag, className, text }) {
  return <Tag className={className} dangerouslySetInnerHTML={{ __html: parseInlineMarkdown(text) }} />;
}

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
                {/*
                  * NO TARIFF HERE. "(10–14 marks)" is wrong for both subjects: the Economics census
                  * has Discuss 14 and no 10-mark item, and Business has Assess 10 and no 14-mark
                  * one, so on an Economics section it named a tariff that does not exist on the
                  * paper and on a Business one it named the other subject's. This component does
                  * not know the subject, so the honest line names none.
                  */}
                Step-by-step logical reasoning chains for extended response questions
              </p>
            </div>
          </div>

          <div className="extras-cards">
            {displayChains.map((chain, i) => (
              <div key={i} className="extras-card chain-card">
                <div className="extras-card-header chain-header">
                  <span className="extras-card-number">{i + 1}</span>
                  <Inline as="h3" className="extras-card-title" text={chain.title} />
                </div>

                {/*
                  * V028: `chain.steps` WAS READ UNGUARDED AND A MALFORMED CHAIN TOOK THE WHOLE TAB
                  * DOWN. A chain authored with `points` instead of `steps` — packet 28's third one
                  * was, and it is staged for the ship checkpoint — threw a TypeError here and
                  * removed the Extras tab for a Pro student. `previewMode` slices the list to one
                  * chain, so a FREE student never reached the third and no signed-out walkthrough
                  * could see it: Verify B can only ever walk a signed-out student. The content is
                  * now refused by `extras.shape` in the validator, and this guard is the second
                  * line, so a chain that gets through anyway costs its own card and not the tab.
                  */}
                <div className="chain-steps">
                  {(Array.isArray(chain.steps) ? chain.steps : []).map((step, si) => (
                    <div key={si} className="chain-step">
                      <div className="chain-step-connector">
                        <div className="chain-step-dot" />
                        {si < chain.steps.length - 1 && <div className="chain-step-line" />}
                      </div>
                      <div className="chain-step-content">
                        <span className="chain-step-label">Step {si + 1}</span>
                        <Inline as="p" className="chain-step-text" text={step} />
                      </div>
                    </div>
                  ))}
                </div>

                {chain.result && (
                  <div className="chain-result">
                    <span className="chain-result-icon">⇒</span>
                    <div>
                      <span className="chain-result-label">Result</span>
                      <Inline as="p" className="chain-result-text" text={chain.result} />
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
                  <Inline as="h3" className="extras-card-title" text={point.title} />
                </div>
                <div className="eval-content">
                  <Inline as="p" text={point.content} />
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
