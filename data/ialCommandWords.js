/**
 * What each IAL command word asks for, in our words, paraphrasing Appendix 6 of each specification:
 * Economics spec (Issue 2, June 2018) p.68 and Business spec (Issue 1, Sept 2017) p.56
 * (text in audit/raw/econ_spec.txt and audit/raw/bus_spec.txt).
 *
 * Mark tariffs are NOT stated here: they come from lib/ial-marking.js, the one place tariffs live.
 * app/command-words/page.js fails the build if a tariff word has no entry below.
 */

export const ECONOMICS_WORDS = {
  Define: 'Give the precise meaning of a term, concept or phrase. Knowledge only.',
  Calculate: 'Work through a multi-step calculation from the data, sometimes with a set formula or diagram. Show your workings.',
  Draw: 'Construct an accurate, fully labelled diagram. You may have to choose the right diagram yourself.',
  Explain: 'Give the meaning or features of something, or a reason or impact. A reason or impact needs a two-step chain of reasoning.',
  Analyse: 'Build a chain of reasoning, with a diagram where it helps, and interpret any data given. Depth over breadth. No evaluation.',
  Examine: 'Analyse in depth, then briefly weigh up the arguments, factors or evidence.',
  Discuss: 'Develop chains of reasoning in context, judge how valid and significant each argument is, and show different viewpoints or question the evidence.',
  Evaluate: 'Fully developed multi-step chains of reasoning in context, weighing competing arguments and evidence to reach an informed judgement. "To what extent" questions carry the same 20 marks.',
};

export const BUSINESS_WORDS = {
  Define: 'Give the meaning of a term or phrase.',
  Calculate: 'Do a calculation from the data given. Calculators are allowed; show your workings.',
  Construct: 'Draw an accurately labelled diagram. You may have to choose the type of diagram yourself.',
  Explain: 'Briefly explain a cause or effect, backed by detail or an example.',
  Analyse: 'A short chain of reasoning, explanation or justification, interpreting any diagram or data given. No evaluation.',
  Discuss: 'Chains of reasoning in context showing causes and effects, with a brief assessment of competing arguments or factors.',
  Assess: 'A well-contextualised chain of reasoning, a balanced and wide-ranging assessment of competing arguments or factors, and a supported judgement.',
  Evaluate: 'Fully developed chains of reasoning across a range of causes and effects, weighing competing arguments, ending in a conclusion that proposes a solution or recommendation.',
};

/** Common command words that appear on neither IAL list. */
export const NOT_IAL = ['Outline', 'State', 'Identify', 'Describe', 'Distinguish', 'Compare', 'Justify', 'Suggest', 'Consider'];
