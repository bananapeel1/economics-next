'use client';
import { MotionConfig } from 'framer-motion';

/**
 * Makes every framer-motion component in the tree honour `prefers-reduced-motion`.
 *
 * F099. The CSS rule in globals.css collapses CSS animations and transitions, but it cannot touch
 * motion driven from JavaScript. FlowChain was fixed component by component and the verifier then
 * found two more that still animated unconditionally — which is the argument against fixing this
 * one component at a time: the next one added would be wrong again, and nobody would notice.
 *
 * `reducedMotion="user"` is framer-motion's own switch for this. Transform and layout animations
 * are disabled when the student has asked for less motion; opacity changes still run, which is the
 * behaviour the spec wants, because a fade does not cause the problem that motion does.
 */
export default function MotionProvider({ children }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
