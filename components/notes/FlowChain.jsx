'use client';
import { motion, useReducedMotion } from 'framer-motion';
import { parseInlineMarkdown } from '@/lib/parse-inline-markdown';
import { stepParts } from '@/lib/flow-step';

/**
 * F099. The CSS reduced-motion rule collapses CSS animations and transitions, but these reveals
 * are driven by framer-motion in JavaScript — a staggered delay per step plus a spring on the
 * result — so the CSS never touched them. A student who asked their device for less motion still
 * got the whole chain animating in, which is the exact thing the audit named in the finding's own
 * title. `useReducedMotion` reads the same media query, so the two now agree.
 */

const makeStepVariants = (calm) => ({
  hidden: calm ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 12, scale: 0.97 },
  visible: (i) => ({
    opacity: 1, y: 0, scale: 1,
    transition: calm
      ? { duration: 0 }
      : { delay: i * 0.1, duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
});

const makeArrowVariants = (calm) => ({
  hidden: calm ? { opacity: 0.5, y: 0 } : { opacity: 0, y: -4 },
  visible: (i) => ({
    opacity: 0.5, y: 0,
    transition: calm ? { duration: 0 } : { delay: i * 0.1 + 0.15, duration: 0.25, ease: 'easeOut' },
  }),
});

const makeResultVariants = (calm) => ({
  hidden: calm ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 14, scale: 0.95 },
  visible: (count) => ({
    opacity: 1, y: 0, scale: 1,
    transition: calm
      ? { duration: 0 }
      : { delay: count * 0.1 + 0.12, type: 'spring', stiffness: 260, damping: 22 },
  }),
});

/**
 * F073. A step is either a string, split on ' — ' (space, em dash, space) for a subtitle, or an
 * explicit `{ title, subtitle }` object; lib/flow-step.js is the one place that decides, and the
 * upgrade template and CONTENT-GATE.md document the object form. The split is em dash only: a
 * wider split took "Float = LFT - EST - duration" apart. Titles and subtitles go through the
 * inline markdown parser so a flow step can carry **bold** and glossary terms like every other
 * text field on the page; the parser leaves P* and Q* notation alone (see parse-inline-markdown).
 */
export default function FlowChain({ steps, result, resultType, glossaryTerms }) {
  // Reads the same media query the CSS rule does, so JS-driven motion and CSS motion agree.
  const calm = useReducedMotion();
  const stepVariants = makeStepVariants(calm);
  const arrowVariants = makeArrowVariants(calm);
  const resultVariants = makeResultVariants(calm);

  if (!steps?.length) return null;

  const resultClass = resultType === 'good'
    ? 'rl-flow-result--good'
    : resultType === 'bad'
      ? 'rl-flow-result--bad'
      : 'rl-flow-result--neutral';

  const resultIcon = resultType === 'good' ? '✓' : resultType === 'bad' ? '✗' : '→';

  return (
    <div className="rl-flow-chain">
      <div className="rl-flow-timeline">
        {steps.map((step, i) => {
          const { title, subtitle } = stepParts(step);

          return (
            <div key={i}>
              <motion.div
                className="rl-flow-tl-step"
                variants={stepVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-20px' }}
                custom={i}
              >
                <div className="rl-flow-tl-node">
                  <span>{String(i + 1).padStart(2, '0')}</span>
                </div>
                <div className="rl-flow-tl-card">
                  <div className="rl-flow-tl-title" dangerouslySetInnerHTML={{ __html: parseInlineMarkdown(title, glossaryTerms) }} />
                  {subtitle && (
                    <div className="rl-flow-tl-subtitle" dangerouslySetInnerHTML={{ __html: parseInlineMarkdown(subtitle, glossaryTerms) }} />
                  )}
                </div>
              </motion.div>
              {(i < steps.length - 1 || result) && (
                <motion.div
                  className="rl-flow-tl-arrow-row"
                  variants={arrowVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-20px' }}
                  custom={i}
                >
                  <span className="rl-flow-tl-arrow">↓</span>
                </motion.div>
              )}
            </div>
          );
        })}
      </div>

      {result && (
        <motion.div
          className={`rl-flow-result ${resultClass}`}
          variants={resultVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-20px' }}
          custom={steps.length}
        >
          <div className="rl-flow-result-badge">{resultIcon}</div>
          <div className="rl-flow-result-content">
            <div className="rl-flow-result-label">RESULT</div>
            <div className="rl-flow-result-text">{result}</div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
