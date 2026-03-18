'use client';
import { motion } from 'framer-motion';

const stepVariants = {
  hidden: { opacity: 0, y: 12, scale: 0.97 },
  visible: (i) => ({
    opacity: 1, y: 0, scale: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.35,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

const arrowVariants = {
  hidden: { opacity: 0, y: -4 },
  visible: (i) => ({
    opacity: 0.5, y: 0,
    transition: {
      delay: i * 0.1 + 0.15,
      duration: 0.25,
      ease: 'easeOut',
    },
  }),
};

const resultVariants = {
  hidden: { opacity: 0, y: 14, scale: 0.95 },
  visible: (count) => ({
    opacity: 1, y: 0, scale: 1,
    transition: {
      delay: count * 0.1 + 0.12,
      type: 'spring',
      stiffness: 260,
      damping: 22,
    },
  }),
};

export default function FlowChain({ steps, result, resultType }) {
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
          const parts = typeof step === 'string' ? step.split(' — ') : [step];
          const title = parts[0];
          const subtitle = parts[1] || null;

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
                  <div className="rl-flow-tl-title">{title}</div>
                  {subtitle && <div className="rl-flow-tl-subtitle">{subtitle}</div>}
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
