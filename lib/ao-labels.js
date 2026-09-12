/**
 * Assessment-objective labels and colours — shared display map.
 * ============================================================
 * One home for the four AO labels and their colours, imported by
 * components/written-practice/WrittenFeedbackCard.jsx and the AO profile panel, so a
 * student cannot see AO3 drawn amber on one card and something else on the next.
 *
 * No React, no Supabase, no I/O — strings only.
 */

// Tokens, not literals: the raw hues were picked for a dark card, and light mode
// inherited them unchanged until the September 2026 audit. Each token's DARK value is
// exactly the literal it replaces (ao1 #3b82f6, ao2 #22c55e, ao3 #f59e0b, ao4 #a78bfa),
// so dark mode is untouched and only light mode changes. Follows the COMMAND_COLORS
// precedent at components/written-practice/WrittenQuestionCard.jsx L5-15. Consumers
// pass `color` into a custom property — style={{ '--aop-color': color }} — never into
// an inline `color:` or `background:`, because `npm run contrast` reads globals.css and
// is blind to a colour that only ever exists in JSX.
//
// `noun` is the objective in running prose ('your judgement', 'your analysis'). AO4's
// noun is deliberately 'judgement' rather than 'evaluation': the copy uses it inside
// sentences where 'evaluation' would read as the name of the objective rather than as
// the thing the student did.
export const AO_DISPLAY = {
  ao1: { label: 'AO1 Knowledge',   noun: 'knowledge',   color: 'var(--accent-blue)' },
  ao2: { label: 'AO2 Application', noun: 'application', color: 'var(--accent-green-bright)' },
  ao3: { label: 'AO3 Analysis',    noun: 'analysis',    color: 'var(--accent-amber)' },
  ao4: { label: 'AO4 Evaluation',  noun: 'judgement',   color: 'var(--accent-purple)' },
};

// The one true render order. AO1 is measured on 4-mark Defines and AO4 only on 20-mark
// Evaluates, so any sort of these four is a ranking claim about the student that the
// evidence does not support — it would rank question difficulty and name AO4 for nearly
// every student on nearly every render. Iterate this; never sort.
export const AO_KEYS = ['ao1', 'ao2', 'ao3', 'ao4'];
