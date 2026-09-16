/**
 * The content validator. Packet 3, CONTENT-GATE.md Layers 1, 1a, 1b and 3.
 *
 * One pure function over one section's content. No I/O, no database, no browser: it takes the
 * eight table payloads and a little context and returns findings. Every write path calls it
 * (scripts/_content-write.mjs) and the gate runs it over all 43 sections (npm run validate).
 *
 * WHY IT IS SHAPED LIKE THIS
 *
 * March's validator checked lengths and presence, sat beside the write path, and half the content
 * scripts did not call it (F110: 22 of 43 push scripts have no validator at all; 21 carry their own
 * copy). Every defect in this packet's ten findings reached students because nothing between the
 * author's editor and the live table could see it. So: one module, imported, not copied; and the
 * write path refuses rather than warns.
 *
 * TIERS
 *
 *   BLOCK  a student meets breakage or a false claim about the exam. Unsolvable fill-in, a pin to
 *          nothing, a command word the paper does not use, an answer key out of range. A push with
 *          a new BLOCK finding is refused.
 *   DEBT   content that works but is worse than it should be. Named in the ledger, baselined, and
 *          reported. A push with new DEBT is allowed and the debt count is printed.
 *   INFO   things a reviewer should see. Never blocks.
 *
 * THE BASELINE
 *
 * Live content fails many of these rules today: 41 of 43 sections fail the answer-position
 * histogram, 141 of 141 fill-in hints leak the answer, 94 of 131 reorders name no ordering
 * principle. A validator that refused all of that would refuse everything and be turned off by
 * Friday, which is exactly what happened in March. So the gate is "no regression against a
 * committed baseline" (audit/validator-baseline.json) until a section's own packet clears its
 * debt, at which point the baseline shrinks. Every finding carries a `key` that survives reordering
 * and edits elsewhere in the section but not a change to the item it is about:
 *
 *   key = section | rule | where | fingerprint
 *
 * `where` is the item's id (or a hash of its text when it has none) and `fingerprint` is a hash of
 * the item itself — the quiz question, the practice item, the recall, the subsection's teaching
 * text, the block's own fields. So a rewritten item with the same id gets new keys, and a finding
 * that survives the rewrite is a real regression rather than baselined noise; ids alone could not
 * say that, because packet 2 minted ids that a rewrite keeps. Section-level findings (histogram,
 * depth, currency) are fingerprinted on their detail, so a changed aggregate is re-reported.
 * Term-level findings (off-spec vocabulary, later-unit terms) keep a count-free key on purpose:
 * removing one mention must not read as a regression.
 *
 * MEASURED, NOT ESTIMATED
 *
 * Thresholds and tiers come from a full pass over the 43 audit snapshots on 14 September 2026
 * (hit rates in each rule's comment). The March per-recall verdicts in audit/raw/content-audits.json
 * are the golden set for the recall rules; the two spec tables in audit/raw/tariff-census.json and
 * audit/raw/spec-items.json are the reference assets, both generated from the specification text.
 */

import { createHash } from 'node:crypto';
import { RECALL_TYPES } from './recall-widgets.js';
import { ECONOMICS, BUSINESS } from './ial-marking.js';

/* ────────────────────────────────────────────────────────────────────────────
   Rule catalogue. Exported so the tests can assert every rule has fixtures and
   the docs can list them without a second copy.
   ──────────────────────────────────────────────────────────────────────────── */
export const RULES = {
  // schema — presence and shape
  'schema.block': { tier: 'BLOCK', what: 'A chapter block needs a title, a non-empty sections[] and a takeaway[]' },
  'schema.subsection': { tier: 'BLOCK', what: 'A subsection needs id, title, keyIdea and a non-empty body[]; ids unique within the section' },
  'schema.body-type': { tier: 'BLOCK', what: 'Body items are paragraph, subheading, flow or bullets' },
  'schema.flow': { tier: 'BLOCK', what: 'A flow has 2 to 4 steps and a resultType of good, bad or neutral' },
  'schema.lengths': { tier: 'DEBT', what: 'keyIdea ≤180 chars and no **bold**; each takeaway ≤100 chars; takeaway has ≥3 items' },
  'schema.fields': { tier: 'DEBT', what: 'realExample.text, misconception and examMatters are present' },

  // quiz — Layer 1 MCQ construction. 769 items measured.
  'quiz.options': { tier: 'BLOCK', what: '4 to 6 options, none empty' },
  'quiz.index': { tier: 'BLOCK', what: 'correctIndex is a number inside the options array' },
  'quiz.dup-options': { tier: 'BLOCK', what: 'No two options identical (1 live)' },
  'quiz.essay-stem': { tier: 'BLOCK', what: 'No essay command word (Evaluate, Assess, Discuss, Examine, To what extent) opens an MCQ stem (28 live)' },
  'quiz.long-correct': { tier: 'BLOCK', what: 'The correct option is not more than 1.5× the longest distractor (185 live) — the length tell' },
  'quiz.hedged': { tier: 'DEBT', what: 'A hedged correct option among two or more absolute distractors (35 live) — the hedge tell' },
  'quiz.near-dup': { tier: 'DEBT', what: 'Two stems in one section with token Jaccard ≥ 0.5 (39 live)' },
  'quiz.histogram': { tier: 'DEBT', what: 'Per-section correct-answer position: no bucket above 40% and none below 10% when n ≥ 8 (41 of 43 sections live; shuffled at render since packet 8, still a construction tell)' },
  'quiz.letter-in-explanation': { tier: 'DEBT', what: 'An explanation refers to an option as a bare "(A)" or names a letter next to a digit or in an equation; write "Option A" (Layer 1b; 25 questions decline to shuffle for this)' },
  'quiz.explanation-option': { tier: 'DEBT', what: 'An explanation that quotes a distractor word for word also shares at least one content word with the correct option — the tell of a correctIndex pointing at the wrong option (F110). Paraphrase is not judged: a lexical rule cannot tell paraphrase from omission, so it fires only on the clear case' },

  // The recall contract (packet 7): four types, each with a shape the widgets rely on. `shuffled` is
  // no longer part of it — the start order is seeded at render — so the three rules about it are gone.
  'schema.recall-type': { tier: 'BLOCK', what: 'recall.type is reorder, fillin, match or classify; anything else renders nothing' },
  'recall.why': { tier: 'DEBT', what: 'A why line per reorder item, match pair and classify group — the reason, shown when the answer is wrong (F056; 131 live reorders carry none)' },

  // reorder — Layer 1 and 1a. 131 recalls measured; March verdicts: 64 genuine, 48 weak, 18 not orderable.
  'reorder.count': { tier: 'BLOCK', what: '3 to 5 items' },
  // Against the March per-recall verdicts (64 genuine, 66 weak or not orderable), measured 14 Sep:
  //   criterion flags 17 genuine / 40 bad; source 4 / 18; lead 9 / 13; any of the three 27 / 51.
  // The 17 genuine ones the criterion rule flags are exactly the underspecified prompts — fifteen
  // "Put these in the right order", one "logically", one "in order of explanation" — which is the
  // founder's own example and Layer 1a's point. The 15 bad ones no rule catches are bad because
  // of what the ITEMS mean, which no lexical rule reproduces; the content packets read the March
  // verdicts directly for those.
  'reorder.criterion': { tier: 'DEBT', what: 'The prompt names the ordering principle — a direction ("from launch to maturity") or the specific sequence ("the recruitment process"). "Put these in the right order", "logically" and "in order of explanation" fail (65 live, Layer 1a)' },
  'reorder.source': { tier: 'DEBT', what: 'The items paraphrase a flow in the same subsection or an extras chain, in the same order — a sequence the student was actually taught (22 live, Layer 1)' },
  'reorder.lead': { tier: 'DEBT', what: 'Items do not share a leading token ("Management: …" ×2), which signals a classification, not a sequence (23 live)' },

  // fill-in — 141 recalls measured.
  'fillin.blanks': { tier: 'BLOCK', what: 'The number of ___ blanks equals the number of answers (8 live mismatches)' },
  'fillin.dup-answers': { tier: 'BLOCK', what: 'Answers are unique, case-insensitively — a duplicate chip vanishes when its twin is placed and the recall cannot be completed (5 live, F106)' },
  'fillin.token': { tier: 'BLOCK', what: 'An answer is one chip: no commas — "rises, rises" is two answers glued into one blank (3 live, F112). A multi-word answer is fine; a line may carry several blanks since the renderer draws every segment (packet 7)' },
  'fillin.hint': { tier: 'DEBT', what: 'A hint is not a prefix of its answer and does not reveal its length (141 of 141 live)' },
  'fillin.distractors': { tier: 'DEBT', what: '2-3 distractor chips, none equal to an answer, so the bank is not a closed set (F054; 141 live carry none — the engine draws two from the section\'s other answers meanwhile)' },
  'fillin.leak': { tier: 'DEBT', what: 'No answer is printed in the template text outside its blank (F054)' },

  // match and classify — the two types the March "Match X to Y" and "rank/sort" reorders should have been (F057, F107).
  'match.count': { tier: 'BLOCK', what: '3 to 5 pairs' },
  'match.unique': { tier: 'BLOCK', what: 'Every pair has a left and a right; lefts unique, rights unique; at most 2 distractors, none equal to a right' },
  'match.prompt': { tier: 'DEBT', what: 'The prompt says what is matched to what ("Match each source of finance to the use it suits best")' },
  'classify.groups': { tier: 'BLOCK', what: '2 or 3 named groups, each with at least one item, 4 to 8 items in all' },
  'classify.unique': { tier: 'BLOCK', what: 'An item belongs to exactly one group and group names are distinct' },
  'classify.prompt': { tier: 'DEBT', what: 'The prompt names the criterion and the groups ("Sort these costs into fixed and variable")' },

  // pins — what a block asks for must exist.
  'pins.range': { tier: 'BLOCK', what: 'quizIndices / practiceIndices are inside their arrays' },
  'pins.reuse': { tier: 'BLOCK', what: 'A quiz or practice index is pinned by at most one block' },
  'pins.identity': { tier: 'DEBT', what: 'quizIndices across blocks are not simply 0,1,2,… in block order — the sign nobody chose them' },
  'pins.diagram': { tier: 'BLOCK', what: 'diagramId / diagramRef resolves to a diagram, after the title fallback the app applies (20 of 39 live, F052/F109)' },

  // diagrams — the schema has no surface for a table, so authors draw grids as SVG diagrams and the
  // app then treats them as diagrams: "What a correct diagram shows" over a lookup table, and the
  // width cap a cost-curve graph wants. Reported from the product on 3.3.1, September 2026.
  'diagram.table-kind': { tier: 'DEBT', what: 'An SVG whose text sits on a grid — 4 or more rows sharing the same column positions — declares kind: "table", which drops the checklist header and the graph width cap. DEBT, not BLOCK: the measure cannot tell a dense table from a schedule drawn beside a curve, so an author confirms it' },
  'diagram.table-checklist': { tier: 'DEBT', what: 'A table carries no checklist: "What a correct diagram shows" reads as an instruction to reproduce a lookup table nobody draws in an exam' },
  'diagram.table-legible': { tier: 'BLOCK', what: 'Every cell of a table renders at 12px or more in the 800px column the card gives it — a table is read in place, not enlarged' },

  // practice — the exam shape. 215 items measured.
  'practice.no-command': { tier: 'BLOCK', what: 'A practice item carries a command word (50 live have none)' },
  'practice.command': { tier: 'BLOCK', what: 'The command word exists in IAL for this subject — no Outline anywhere, no Assess in Economics, no Examine in Business (50 live)' },
  'practice.tariff': { tier: 'BLOCK', what: 'The marks match the command word for this subject and unit, from the spec\'s own Appendix 6 (73 live; e.g. "Define (4)" — Define is 2)' },
  'practice.levels': { tier: 'DEBT', what: 'Guidance for an item above 6 marks does not allocate points "(1 mark)" — those tariffs are levels-marked' },

  // section-level coverage and depth
  'section.no-recall': { tier: 'BLOCK', what: 'A section ships at least one recall (20 Business sections have zero)' },
  'depth.blocks': { tier: 'DEBT', what: 'At least 4 chapter blocks (F083/F108; Units 3-4 average 2.5)' },
  'depth.recalls': { tier: 'DEBT', what: 'At least one recall per two subsections (Units 3-4 average 0.0)' },
  'depth.quiz': { tier: 'DEBT', what: 'At least 20 quiz items (Units 3-4 average 10.5)' },
  'depth.notes-titles': { tier: 'DEBT', what: 'Every Notes topic title is taught in Learn Mode: at least half its content words appear across the block and subsection titles (F110; 3 of 202 live titles fail — "Branding" in meeting-customer-needs has no Learn Mode block)' },
  'step.words': { tier: 'DEBT', what: 'A subsection\'s teaching text is at most 350 words — the pedagogy review\'s reading budget before the first interaction' },

  // claims, localisation, terminology
  'claim.uncited': { tier: 'BLOCK', what: 'A sentence asserting what examiners reward, penalise, expect or look for carries a source (364 live sentences, none cited)' },
  'locale.institution': { tier: 'BLOCK', what: 'No UK-only institution as the frame of an example — NHS, Bank of England, HMRC, council tax, Ofgem… — for an audience sitting the paper in Hong Kong, Singapore, Malaysia and Pakistan (F082, F116). One finding per sentence, so adding a mention is a regression and removing one is not' },
  'locale.uk': { tier: 'DEBT', what: 'The UK is not the default frame: a section with any UK-framed example (Brexit, "the UK", a British retailer or city) names at least as many examples from elsewhere — the IAL centres\' own markets first. Fires when UK mentions outnumber international ones (17 of 43 sections live; F116)' },
  'locale.currency': { tier: 'DEBT', what: 'One currency per section (18 live sections mix them)' },
  'terms.off-spec': { tier: 'DEBT', what: 'Vocabulary the IAL specification does not use: merit/demerit goods, deadweight loss, VRIO, core competencies, balanced scorecard, triple bottom line (research-ial-spec-coverage.md; packet 13 strips these)' },
  'terms.later-unit': { tier: 'DEBT', what: 'A Unit 1-2 section teaching a term the spec introduces only in Units 3-4 of the same subject. The reverse — a Unit 3-4 section drawing on Units 1-2 — is synoptic and never flagged' },

  // Layer 3 — spec-first coverage
  'spec.uncovered': { tier: 'DEBT', what: 'A specification leaf for this topic with no evidence in the teaching text (content, notes, extras) — walking inward from the spec, the only direction that can see absence' },
  'spec.coverage': { tier: 'INFO', what: 'Coverage percentage for the topic against audit/raw/spec-items.json' },

  // quantitative
  'quant.unit': { tier: 'DEBT', what: 'At least one quantitative drill template registered for this unit code (DRILLS.md addendum: DEBT until 13.2 lands)' },

  // info
  'flow.separator': { tier: 'INFO', what: 'A flow step uses the " — " subtitle split; prefer { title, subtitle } (F073)' },
  'section.counts': { tier: 'INFO', what: 'Counts for the reviewer' },
};

/* ────────────────────────────────────────────────────────────────────────────
   Small shared helpers
   ──────────────────────────────────────────────────────────────────────────── */
const normText = (s) => String(s ?? '').toLowerCase().replace(/\s+/g, ' ').trim();
const normKey = (s) => String(s ?? '').toLowerCase().replace(/[^a-z0-9]/g, '');
const hash8 = (s) => createHash('sha1').update(normText(s)).digest('hex').slice(0, 8);
const STOP = new Set(('the a an and or of to in for on with is are be by as at from that this it its their not but ' +
  'more less other into such which what when how than also may can will would should could one two three ' +
  'between about after before over under per each any all some most').split(' '));
const tokens = (s) => new Set(normText(s).replace(/[^a-z0-9 ]/g, ' ').split(' ').filter((w) => w.length > 2 && !STOP.has(w)));
const jaccard = (a, b) => {
  const A = tokens(a); const B = tokens(b);
  if (!A.size || !B.size) return 0;
  let n = 0; for (const w of A) if (B.has(w)) n += 1;
  return n / (A.size + B.size - n);
};
const words = (s) => normText(s).split(' ').filter(Boolean).length;
const specFor = (subject) => (subject === 'business' ? BUSINESS : ECONOMICS);
const unitNumber = (unitCode) => Number(String(unitCode || '').replace(/\D/g, '').slice(-1)) || 0;

/** Gather every string inside a value, for text scans. */
function strings(v, out = []) {
  if (v == null) return out;
  if (typeof v === 'string') { out.push(v); return out; }
  if (Array.isArray(v)) { for (const x of v) strings(x, out); return out; }
  if (typeof v === 'object') { for (const k of Object.keys(v)) strings(v[k], out); return out; }
  return out;
}

/* ────────────────────────────────────────────────────────────────────────────
   Word lists. Each with its reason, because a list without a reason gets
   extended by whoever is annoyed by it next.
   ──────────────────────────────────────────────────────────────────────────── */

// Essay command words. Appendix 6 in both specs reserves these for levels-marked written answers;
// an MCQ stem that opens with one rehearses a question shape the paper never sets (F082).
const ESSAY_STEM = /^\s*(evaluate|assess|discuss|examine|to what extent)\b/i;

// The absolute/hedge tell (F082): a correct option written as "may/often/tends to" beside
// distractors written as "always/never/only" can be answered without reading the economics.
const ABSOLUTE = /\b(always|never|only|all|none|every|entirely|completely|impossible|guaranteed|must)\b/i;
const HEDGED = /\b(may|might|can|often|usually|tends?|generally|sometimes|likely|typically)\b/i;

// Claims about examiners. The corpus asserts 364 times what examiners reward or penalise and
// cites a source for none of them. A claim with a source is fine; the rule is the citation.
const EXAMINER_CLAIM = /\bexaminers?\s+(?:will\s+|often\s+|usually\s+|typically\s+)?(reward|penalise|penalize|expect|look\s+for|want|like|credit|mark\s+down|award|give)/i;
const CITATION = /\((?:source|see|per|from)\b[^)]*\)|\[(?:source|see|per|from)\b[^\]]*\]|\bW(?:EC|BS)1[1-4]\b|\bappendix\s+[0-9]\b|\bmark\s+scheme\b|\bexaminer'?s?\s+report\b/i;

// UK-only institutions as the frame of an example. The audience sits WEC/WBS in Hong Kong,
// Singapore, Malaysia, Pakistan and the Gulf (F082, F116). An example built on the NHS or council
// tax asks them to reason about a system they have never seen. Word-boundaried; case matters for
// the acronyms so "cma" inside a word does not fire.
const UK_INSTITUTION = /\b(NHS|Bank of England|Monetary Policy Committee|HMRC|HM Treasury|Ofgem|Ofwat|Ofcom|Ofsted|council tax|Universal Credit|National Living Wage|National Minimum Wage|HS2|Westminster|Downing Street|the Chancellor|Competition and Markets Authority|FTSE ?100|FTSE|Royal Mail|Network Rail|furlough scheme)\b/;
// MPC is deliberately NOT here. In this corpus it means marginal private cost or marginal propensity
// to consume in 129 of 131 live sentences; the two that mean the Bank of England's Monetary Policy
// Committee say so in the same sentence and are caught by the name above. Treating it as a UK
// institution produced 130 false BLOCK findings, which packet 13 surfaced by rewriting the sentences
// around them. An acronym belongs here only when the subject has no other use for it.
const UK_ACRONYM = /\b(CMA|RPI|ONS|OBR|DWP|DfE)\b/;
// A UK frame that is legitimate as one example among several, but not as the default (F116). The
// rule counts these against INTL_FRAME below and fires when the UK outnumbers everywhere else, so
// "Brexit ×2, Tesco and Aldi" with no other country fails and one Brexit example beside a Malaysian
// and a Nigerian one passes. Case-sensitive on purpose: "Boots" the retailer, not walking boots.
const UK_FRAME = /\b(Brexit|the UK|UK|Britain|British|England|Scotland|Wales|London|Manchester|Birmingham|Glasgow|Edinburgh|Leeds|Liverpool|Bristol|Sheffield|Newcastle|Cardiff|sterling|the pound|Tesco|Sainsbury'?s|Asda|Morrisons|Aldi UK|Greggs|Marks (?:&|and) Spencer|M&S|John Lewis|Primark|Boots|BT|British Airways|Rolls[- ]Royce|BP|Thames Water|Transport for London|TfL|London Underground|Heathrow)\b/;
// Where the students are, and the global names any centre recognises. Deliberately generous: the
// rule is a ratio, and under-counting the international side is the only way it can over-fire.
const INTL_FRAME = /\b(Hong Kong|Singapore|Malaysia|Kuala Lumpur|Pakistan|Karachi|Lahore|India|Mumbai|Delhi|Bangalore|China|Shanghai|Shenzhen|Beijing|Nigeria|Lagos|UAE|Dubai|Abu Dhabi|Saudi Arabia|Riyadh|Qatar|Doha|Oman|Bahrain|Kuwait|Kenya|Nairobi|Vietnam|Hanoi|Indonesia|Jakarta|Bangladesh|Dhaka|Sri Lanka|Colombo|Egypt|Cairo|Ghana|Accra|Mauritius|Thailand|Bangkok|Philippines|Manila|South Korea|Seoul|Japan|Tokyo|Germany|Berlin|France|Paris|United States|the US|USA|American|Brazil|Mexico|Canada|Australia|Turkey|Nepal|Kazakhstan|Uzbekistan|Cyprus|Greece|Italy|Spain|Netherlands|Switzerland|Sweden|Norway|Denmark|South Africa|Zambia|Tanzania|Uganda|Ethiopia|Jordan|Lebanon|Morocco|Zimbabwe|Botswana|Malawi|Rwanda|Peru|Chile|Argentina|Colombia|Venezuela|New Zealand|Taiwan|Macau|Brunei|Myanmar|Cambodia|Laos|Mongolia|Iran|Iraq|Israel|Russia|Ukraine|Poland|EU|eurozone|OPEC|Toyota|Samsung|Alibaba|Tencent|Grab|Shopee|Emirates|Petronas|Tata|Reliance|Jollibee|AirAsia|Cathay Pacific|Huawei|BYD|Nike|Apple|Amazon|Netflix|Starbucks|McDonald'?s|Coca-Cola|Unilever|Nestl[eé]|IKEA|Zara|H&M|Uber|Tesla|Microsoft|Google)\b/;

// Currency families. One per section (CONTENT-GATE Layer 1). A section that prices one example in
// pounds and the next in ringgit is teaching two currencies and no economics.
const CURRENCIES = [
  ['GBP', /£/], ['USD', /(?<![A-Z])\$(?!\$)/], ['EUR', /€/], ['MYR', /\bRM\s?\d/], ['HKD', /\bHK\$/],
  ['SGD', /\bS\$/], ['PKR', /\bRs\.?\s?\d/], ['JPY', /¥/], ['AED', /\bAED\s?\d/], ['INR', /₹/],
];

// Vocabulary the IAL specifications do not use. Each entry: the term, and why. Source:
// audit/raw/research-ial-spec-coverage.md, "Content in the app that is NOT in the IAL spec".
const OFF_SPEC_TERMS = [
  { re: /\b(de)?merit goods?\b/i, why: '"merit"/"demerit" appear 0 times in the IAL Economics spec; it uses external benefits/costs of consumption and information gaps' },
  { re: /\bdeadweight (loss|welfare)\b/i, why: 'the spec says "welfare loss or gain areas" (1.3.5.2d), never "deadweight"' },
  { re: /\bVRIO\b/, why: 'not in the IAL Business spec; UK GCE 3.1.3 material' },
  { re: /\bcore competenc(y|ies)\b/i, why: 'not in the IAL Business spec' },
  { re: /\bbalanced scorecard\b/i, why: 'not in the IAL Business spec' },
  { re: /\btriple bottom line\b/i, why: 'not in the IAL Business spec' },
];

// What a reorder prompt must say for a student to know what "right order" means (Layer 1a).
// A prompt names the ordering principle when it says the direction ("from launch to maturity",
// "from most to least liquid", "top to bottom") or names the specific sequence being ordered ("the
// recruitment process", "the QE transmission mechanism", "the PED calculation steps"). "Put these in
// the right order" names nothing: a taught student may reconstruct it, but a student who orders the
// same items by a different defensible principle is marked wrong and told nothing (Layer 1a).
const ORDER_PRINCIPLE = /(\bfrom\s+[\w'’ -]{2,30}\s+to\s+[\w'’ -]{2,30}|\b(top|left|start|first|earliest|beginning|smallest|simplest|most)\b[\w ]{0,12}\bto\b[\w ]{0,12}\b(bottom|right|finish|last|latest|end|largest|complex|least)\b|\bchronolog|\bcausal|\bcause(?:s)? (?:and|to|then) effect|\bin the order (?:in which|that|they|it|the)\b|\bas (?:you|they) would (?:write|explain|present)|\bwhat happens (?:first|next|then)\b|\b(?!these\b)[\w'’()/-]+(?: [\w'’()/-]+){0,7}?\s(process|mechanism|steps? (?:to|of|in|for)|steps|stages|chain|lines|sections|framework|calculation|spiral|transition|life cycle|cycle|effect on [\w ]+|consequences|events|adjustment|progression|sequence|method|procedure|phases)\b|\b(events|stages|steps|phases) (?:during|of|in) (?:a|an|the)\b)/i;
const ORDER_FAIL = /\b(logical(?:ly)?|in order of (?:explanation|importance|priority|relevance)|by importance|most important|rank|classify|match|sort into|group)\b/i;

/* ────────────────────────────────────────────────────────────────────────────
   The validator
   ──────────────────────────────────────────────────────────────────────────── */

/**
 * @param {object} bundle  { content, notes, quiz, practice, flashcards, diagrams, extras, mistakes }
 * @param {object} ctx     { sectionId, subject: 'economics'|'business', unitCode: 'WEC11', number: '1.3.2',
 *                           specItems?: rows for this topic from audit/raw/spec-items.json,
 *                           laterUnitTerms?: Set of terms from later units (built by the caller),
 *                           quantTemplates?: [{ unit }] from lib/quant }
 * @returns {{ findings: Array<{tier,rule,where,detail,key}>, summary: object }}
 */
export function validateSection(bundle, ctx) {
  const findings = [];
  const { sectionId = 'section', subject = 'economics', unitCode = '', number = '' } = ctx || {};
  const spec = specFor(subject);
  const unit = unitNumber(unitCode);
  const add = (rule, where, detail, extra = {}) => {
    const tier = RULES[rule]?.tier;
    if (!tier) throw new Error(`unknown rule ${rule}`);
    findings.push({ tier, rule, where, detail, ...extra });
  };
  // What each `where` is about, for the key fingerprint (see the header). Registered as the walk
  // goes; a finding whose `where` has no entry falls back to its longest registered prefix.
  const index = new Map();
  const at = (where, obj) => { index.set(where, obj); };

  const content = Array.isArray(bundle?.content) ? bundle.content : [];
  const notes = Array.isArray(bundle?.notes) ? bundle.notes : [];
  const quiz = Array.isArray(bundle?.quiz) ? bundle.quiz : [];
  const practice = Array.isArray(bundle?.practice) ? bundle.practice : [];
  const diagrams = Array.isArray(bundle?.diagrams) ? bundle.diagrams : [];
  const extras = bundle?.extras && typeof bundle.extras === 'object' ? bundle.extras : {};
  const chains = Array.isArray(extras.chains) ? extras.chains.map((c) => c?.steps || []).filter((s) => s.length) : [];

  /* ── schema ─────────────────────────────────────────────────────────── */
  const subIds = new Set();
  let subsectionCount = 0;
  let recallCount = 0;
  const reorders = [];
  const fillins = [];
  const matches = [];
  const classifies = [];

  content.forEach((block, bi) => {
    const bKey = block?.id || `block:${hash8(block?.title || bi)}`;
    if (!block || typeof block !== 'object') { add('schema.block', bKey, `block ${bi + 1} is not an object`); return; }
    // The block's own fields, not its subsections: those carry their own keys below.
    at(bKey, { ...block, sections: (block.sections || []).map((s) => s?.id ?? null) });
    (block.takeaway || []).forEach((t, ti) => at(`${bKey}:takeaway${ti}`, t));
    if (!block.title) add('schema.block', bKey, `block ${bi + 1} has no title`);
    if (!Array.isArray(block.sections) || !block.sections.length) add('schema.block', bKey, `"${block.title}" has no sections[]`);
    if (!Array.isArray(block.takeaway) || !block.takeaway.length) add('schema.block', bKey, `"${block.title}" has no takeaway[]`);
    else if (block.takeaway.length < 3) add('schema.lengths', bKey, `"${block.title}" takeaway has ${block.takeaway.length} items (want ≥3)`);
    (block.takeaway || []).forEach((t, ti) => { if (String(t).length > 100) add('schema.lengths', `${bKey}:takeaway${ti}`, `takeaway ${ti + 1} is ${String(t).length} chars (max 100)`); });

    (block.sections || []).forEach((sec, si) => {
      subsectionCount += 1;
      const sKey = sec?.id ? `sub:${sec.id}` : `sub:${hash8(sec?.title || `${bi}-${si}`)}`;
      if (sec && typeof sec === 'object') {
        // The teaching text without its recall; the recall is keyed on its own under :reorder / :fillin.
        const { recall: _r, ...teachingOnly } = sec;
        at(sKey, teachingOnly);
        (sec.body || []).forEach((b, bi2) => at(`${sKey}:body${bi2}`, b));
        if (sec.recall && typeof sec.recall === 'object') { for (const t of ['recall', 'reorder', 'fillin', 'match', 'classify']) at(`${sKey}:${t}`, sec.recall); }
      }
      if (!sec?.id) add('schema.subsection', sKey, `subsection ${si + 1} of "${block.title}" has no id`);
      else if (subIds.has(sec.id)) add('schema.subsection', sKey, `duplicate subsection id "${sec.id}"`);
      if (sec?.id) subIds.add(sec.id);
      if (!sec?.title) add('schema.subsection', sKey, 'no title');
      if (!sec?.keyIdea) add('schema.subsection', sKey, 'no keyIdea');
      else {
        if (sec.keyIdea.length > 180) add('schema.lengths', sKey, `keyIdea is ${sec.keyIdea.length} chars (max 180)`);
        if (sec.keyIdea.includes('**')) add('schema.lengths', sKey, 'keyIdea contains **bold**, which is rendered plain');
      }
      if (!Array.isArray(sec?.body) || !sec.body.length) add('schema.subsection', sKey, 'body[] is empty');
      if (!sec?.realExample?.text) add('schema.fields', sKey, 'no realExample.text');
      if (!sec?.misconception) add('schema.fields', sKey, 'no misconception');
      if (!sec?.examMatters) add('schema.fields', sKey, 'no examMatters');

      const flows = [];
      (sec?.body || []).forEach((b, bi2) => {
        if (!b || !['paragraph', 'subheading', 'flow', 'bullets'].includes(b.type)) { add('schema.body-type', `${sKey}:body${bi2}`, `body item ${bi2 + 1} has type "${b?.type}"`); return; }
        if (b.type === 'flow') {
          const steps = Array.isArray(b.steps) ? b.steps : [];
          if (steps.length < 2 || steps.length > 4) add('schema.flow', `${sKey}:body${bi2}`, `flow has ${steps.length} steps (want 2 to 4)`);
          if (!['good', 'bad', 'neutral'].includes(b.resultType)) add('schema.flow', `${sKey}:body${bi2}`, `flow resultType "${b.resultType}"`);
          if (steps.some((s) => typeof s === 'string' && / — /.test(s))) add('flow.separator', `${sKey}:body${bi2}`, 'flow step uses the " — " subtitle convention');
          flows.push(steps.map((s) => (s && typeof s === 'object' ? s.title : s)));
        }
      });

      // reading budget per subsection
      const teaching = [sec?.keyIdea, ...(sec?.body || []).flatMap((b) => [b?.text, ...(b?.items || []), ...((b?.steps || []).map((s) => (typeof s === 'object' ? `${s.title} ${s.subtitle || ''}` : s))), b?.result]), sec?.realExample?.text, sec?.misconception, sec?.examMatters];
      const w = words(teaching.filter(Boolean).join(' '));
      if (w > 350) add('step.words', sKey, `${w} words of teaching text (budget 350)`);

      const r = sec?.recall;
      if (r && typeof r === 'object') {
        recallCount += 1;
        if (!RECALL_TYPES.includes(r.type)) add('schema.recall-type', `${sKey}:recall`, `recall.type is "${r.type}"`);
        if (r.type === 'reorder') reorders.push({ r, sKey, flows, secTitle: sec.title });
        if (r.type === 'fillin') fillins.push({ r, sKey });
        if (r.type === 'match') matches.push({ r, sKey });
        if (r.type === 'classify') classifies.push({ r, sKey });
      }
    });
  });

  /* ── reorder ─────────────────────────────────────────────────────────── */
  const whyCheck = (key, why, n, noun) => {
    const lines = Array.isArray(why) ? why : [];
    const filled = lines.filter((w) => String(w ?? '').trim()).length;
    if (filled < n) add('recall.why', key, lines.length ? `why has ${filled} of ${n} ${noun} lines` : `no why lines (${n} ${noun})`);
  };
  for (const { r, sKey, flows } of reorders) {
    const co = Array.isArray(r.correctOrder) ? r.correctOrder : [];
    const key = `${sKey}:reorder`;
    if (co.length < 3 || co.length > 5) add('reorder.count', key, `${co.length} items (want 3 to 5)`);
    whyCheck(key, r.why, co.length, 'item');

    const prompt = String(r.prompt || '');
    if (ORDER_FAIL.test(prompt) || !ORDER_PRINCIPLE.test(prompt)) {
      add('reorder.criterion', key, `prompt "${prompt.slice(0, 70)}" does not name the ordering principle`);
    }

    const leads = co.map((x) => normText(x).split(/[:\s]/)[0]);
    if (new Set(leads).size < leads.length) add('reorder.lead', key, `items share a leading token: ${JSON.stringify([...new Set(leads.filter((l, i) => leads.indexOf(l) !== i))])}`);

    // Does this sequence come from something the section teaches? Paraphrase is expected
    // ("Identify options" vs "Identify all available options"), so match on token overlap and
    // require the matched steps to appear in the same order.
    // Paraphrase is the normal case — "Employee spots an opportunity within the organisation" for
    // a flow step "Employee identifies an opportunity within the firm" — and a reorder usually
    // extends its flow by a step or two. So an item matches a step when they share a distinctive
    // word (5+ letters) or a fifth of their vocabulary; the matched steps must appear in the same
    // order; and half the items must match. A first version demanded a third of the vocabulary and
    // flagged 58 of the 64 sequences the March audit had judged genuine.
    const candidates = [...flows, ...chains].filter((s) => s.length >= 2);
    const shareDistinctive = (a, b) => { const A = tokens(a); const B = tokens(b); for (const w of A) if (w.length >= 5 && B.has(w)) return true; return false; };
    let sourced = false;
    for (const steps of candidates) {
      let last = -1; let matched = 0;
      for (const item of co) {
        let best = -1; let bestScore = 0;
        steps.forEach((st, i) => { if (i <= last) return; const j = Math.max(jaccard(item, st), shareDistinctive(item, st) ? 0.2 : 0); if (j > bestScore) { bestScore = j; best = i; } });
        if (best >= 0 && bestScore >= 0.2) { matched += 1; last = best; }
      }
      if (matched / co.length >= 0.5) { sourced = true; break; }
    }
    if (!sourced) add('reorder.source', key, `no flow or extras chain in this section teaches this sequence in this order (${candidates.length} candidate${candidates.length === 1 ? '' : 's'})`);
  }

  /* ── fill-in ─────────────────────────────────────────────────────────── */
  for (const { r, sKey } of fillins) {
    const key = `${sKey}:fillin`;
    const answers = Array.isArray(r.answers) ? r.answers.map(String) : [];
    const template = Array.isArray(r.template) ? r.template.map(String) : [];
    const hints = Array.isArray(r.hints) ? r.hints.map(String) : [];
    const blanksPerLine = template.map((l) => (l.match(/_{3,}/g) || []).length);
    const blanks = blanksPerLine.reduce((a, b) => a + b, 0);
    if (blanks !== answers.length) add('fillin.blanks', key, `${blanks} blank${blanks === 1 ? '' : 's'} in the template, ${answers.length} answer${answers.length === 1 ? '' : 's'}`);
    const seen = new Map();
    answers.forEach((a) => seen.set(normText(a), (seen.get(normText(a)) || 0) + 1));
    const dups = [...seen].filter(([, n]) => n > 1).map(([a]) => a);
    if (dups.length) add('fillin.dup-answers', key, `duplicate answer${dups.length === 1 ? '' : 's'} ${JSON.stringify(dups)} — the second chip vanishes and the recall cannot be completed`);
    const multi = answers.filter((a) => /,/.test(a));
    if (multi.length) add('fillin.token', key, `answer${multi.length === 1 ? '' : 's'} with a comma, two answers in one blank: ${JSON.stringify(multi)}`);
    const ds = Array.isArray(r.distractors) ? r.distractors.map(String).filter((d) => d.trim()) : [];
    const dsBad = ds.filter((d) => seen.has(normText(d)));
    if (ds.length < 2 || ds.length > 3 || dsBad.length) add('fillin.distractors', key, dsBad.length ? `distractor${dsBad.length === 1 ? '' : 's'} equal to an answer: ${JSON.stringify(dsBad)}` : ds.length ? `${ds.length} distractor${ds.length === 1 ? '' : 's'} (want 2 to 3)` : 'no distractors');
    const printed = new Set(template.flatMap((l) => normText(l.replace(/_{3,}/g, ' ')).split(/[^a-z0-9'-]+/)).filter(Boolean));
    const leaked = answers.filter((a) => { const t = normText(a).split(' ').filter(Boolean); return t.length && t.every((w) => printed.has(w)); });
    if (leaked.length) add('fillin.leak', key, `answer${leaked.length === 1 ? '' : 's'} printed in the template text: ${JSON.stringify(leaked)}`);
    hints.forEach((h, i) => {
      const a = normText(answers[i] || '');
      const shown = normText(h).replace(/_.*$/, '').trim();
      const lengthReveal = /_/.test(h) && h.replace(/[^_a-z0-9]/gi, '').length === (answers[i] || '').length;
      if ((shown && a.startsWith(shown)) || lengthReveal) add('fillin.hint', `${key}:${i}`, `hint "${h}" ${shown && a.startsWith(shown) ? 'is a prefix of' : 'reveals the length of'} the answer "${answers[i]}"`);
    });
  }

  /* ── match ───────────────────────────────────────────────────────────── */
  for (const { r, sKey } of matches) {
    const key = `${sKey}:match`;
    const pairs = Array.isArray(r.pairs) ? r.pairs : [];
    if (pairs.length < 3 || pairs.length > 5) add('match.count', key, `${pairs.length} pairs (want 3 to 5)`);
    const lefts = pairs.map((p) => normText(p?.left ?? ''));
    const rights = pairs.map((p) => normText(p?.right ?? ''));
    const ds = (Array.isArray(r.distractors) ? r.distractors : []).map((d) => normText(d));
    const problems = [];
    if (lefts.some((x) => !x) || rights.some((x) => !x)) problems.push('a pair is missing its left or right');
    if (new Set(lefts).size < lefts.length) problems.push('duplicate left items');
    if (new Set(rights).size < rights.length) problems.push('duplicate right items');
    if (ds.some((d) => rights.includes(d))) problems.push('a distractor equals a right item');
    if (ds.length > 2) problems.push(`${ds.length} distractors (max 2)`);
    if (problems.length) add('match.unique', key, problems.join('; '));
    const prompt = String(r.prompt || '');
    if (!/\b(match|pair|link|connect)\b/i.test(prompt) || !/\b(to|with)\b/i.test(prompt)) add('match.prompt', key, `prompt "${prompt.slice(0, 70)}" does not say what is matched to what`);
    whyCheck(key, pairs.map((p) => p?.why), pairs.length, 'pair');
  }

  /* ── classify ────────────────────────────────────────────────────────── */
  for (const { r, sKey } of classifies) {
    const key = `${sKey}:classify`;
    const groups = Array.isArray(r.groups) ? r.groups : [];
    const items = groups.flatMap((g) => (Array.isArray(g?.items) ? g.items : []).map((x) => normText(x)));
    const problems = [];
    if (groups.length < 2 || groups.length > 3) problems.push(`${groups.length} group${groups.length === 1 ? '' : 's'} (want 2 or 3)`);
    if (groups.some((g) => !normText(g?.name ?? ''))) problems.push('a group has no name');
    if (groups.some((g) => !(Array.isArray(g?.items) && g.items.length >= 1))) problems.push('a group has no items');
    if (items.length < 4 || items.length > 8) problems.push(`${items.length} items (want 4 to 8)`);
    if (problems.length) add('classify.groups', key, problems.join('; '));
    const dupItems = [...new Set(items.filter((x, i) => items.indexOf(x) !== i))];
    const names = groups.map((g) => normText(g?.name ?? ''));
    const dupNames = names.filter((x, i) => x && names.indexOf(x) !== i);
    if (dupItems.length || dupNames.length) add('classify.unique', key, [dupItems.length ? `item in more than one group: ${JSON.stringify(dupItems)}` : '', dupNames.length ? `duplicate group name ${JSON.stringify(dupNames)}` : ''].filter(Boolean).join('; '));
    const prompt = String(r.prompt || '');
    if (!/\b(sort|classify|group|put|place|decide|which)\b/i.test(prompt) || !/\b(into|as|by|under|between|or)\b/i.test(prompt)) add('classify.prompt', key, `prompt "${prompt.slice(0, 70)}" does not name the criterion and the groups`);
    whyCheck(key, groups.map((g) => g?.why), groups.length, 'group');
  }

  /* ── quiz ────────────────────────────────────────────────────────────── */
  const hist = [0, 0, 0, 0, 0, 0];
  const stems = [];
  quiz.forEach((q, qi) => {
    const key = q?.id || `quiz:${hash8(q?.question || qi)}`;
    at(key, q);
    const o = Array.isArray(q?.options) ? q.options : [];
    if (o.length < 4 || o.length > 6 || o.some((x) => !String(x ?? '').trim())) add('quiz.options', key, `${o.length} options${o.some((x) => !String(x ?? '').trim()) ? ', one empty' : ''}`);
    const ci = q?.correctIndex;
    if (typeof ci !== 'number' || ci < 0 || ci >= o.length || !Number.isInteger(ci)) { add('quiz.index', key, `correctIndex ${JSON.stringify(ci)} with ${o.length} options`); return; }
    hist[ci] += 1;
    if (new Set(o.map(normText)).size < o.length) add('quiz.dup-options', key, 'two options are identical');
    if (ESSAY_STEM.test(q.question || '')) add('quiz.essay-stem', key, `stem opens "${String(q.question).split(/\s+/).slice(0, 3).join(' ')}…"`);
    const correct = String(o[ci] || '');
    const distractors = o.filter((_, i) => i !== ci).map(String);
    const longest = Math.max(1, ...distractors.map((d) => d.length));
    if (correct.length > 1.5 * longest) add('quiz.long-correct', key, `correct option is ${correct.length} chars, longest distractor ${longest}`);
    if (HEDGED.test(correct) && distractors.filter((d) => ABSOLUTE.test(d)).length >= 2) add('quiz.hedged', key, 'hedged correct option among absolute distractors');
    for (const s of stems) { if (jaccard(s, q.question) >= 0.5) { add('quiz.near-dup', key, `stem near-duplicates an earlier one: "${String(q.question).slice(0, 60)}"`); break; } }
    stems.push(q.question || '');
    const e = String(q.explanation || '');
    if (/\(\s*[A-F]\s*\)/.test(e) || /[0-9][A-F]\b|\b[A-F][0-9]/.test(e) || /\b[A-F]\s?[+=×÷/*-]\s?[A-Z(]/.test(e)) {
      add('quiz.letter-in-explanation', key, 'explanation uses a bare bracketed letter, or a letter beside a digit or operator');
    }
    // The explanation argues for a distractor: it quotes one word for word and shares no content
    // word with the marked answer. Measured 14 Sep: 0 of 769 live; the 10 that a token-only test
    // flagged were paraphrases of the correct option, which is why verbatim is required on the
    // distractor side and a single shared word suffices on the correct side.
    if (e) {
      const en = normText(e).replace(/[^a-z0-9 ]/g, ' ');
      const quoted = distractors.filter((d) => { const dn = normText(d).replace(/[^a-z0-9 ]/g, ' ').trim(); return dn.length >= 12 && en.includes(dn); });
      const cw = [...tokens(correct)].filter((w) => w.length >= 4 && !STOP.has(w));
      const ew = tokens(en);
      if (quoted.length && cw.length && !cw.some((w) => ew.has(w))) {
        add('quiz.explanation-option', key, `explanation quotes the distractor "${quoted[0].slice(0, 50)}" and shares no word with the correct option "${correct.slice(0, 50)}"`);
      }
    }
  });
  const n = hist.reduce((a, b) => a + b, 0);
  if (n >= 8) {
    const used = hist.slice(0, Math.max(4, hist.findLastIndex((v) => v > 0) + 1));
    const max = Math.max(...used) / n; const min = Math.min(...used.slice(0, 4)) / n;
    if (max > 0.4 || min < 0.1) add('quiz.histogram', 'section', `correct answer by position ${used.map((v) => `${Math.round((100 * v) / n)}%`).join(' / ')} over ${n} items`);
  }

  /* ── pins ────────────────────────────────────────────────────────────── */
  const usedQuiz = new Map(); const usedPractice = new Map();
  const identity = [];
  content.forEach((block, bi) => {
    const bKey = block?.id || `block:${hash8(block?.title || bi)}`;
    for (const i of block?.quizIndices || []) {
      if (!Number.isInteger(i) || i < 0 || i >= quiz.length) add('pins.range', `${bKey}:quiz${i}`, `quizIndices ${i} of ${quiz.length}`);
      else if (usedQuiz.has(i)) add('pins.reuse', `${bKey}:quiz${i}`, `quiz ${i} also pinned by "${usedQuiz.get(i)}"`);
      else usedQuiz.set(i, block.title);
      identity.push(i);
    }
    for (const i of block?.practiceIndices || []) {
      if (!Number.isInteger(i) || i < 0 || i >= practice.length) add('pins.range', `${bKey}:practice${i}`, `practiceIndices ${i} of ${practice.length}`);
      else if (usedPractice.has(i)) add('pins.reuse', `${bKey}:practice${i}`, `practice ${i} also pinned by "${usedPractice.get(i)}"`);
      else usedPractice.set(i, block.title);
    }
  });
  if (identity.length >= 4 && identity.every((v, i) => v === i)) add('pins.identity', 'section', `quizIndices are 0..${identity.length - 1} in block order`);
  for (const miss of unresolvedDiagramPins(content, diagrams)) add('pins.diagram', `block:${hash8(miss.block)}:diagram`, `"${miss.pin}" resolves to no diagram${miss.rescued ? '' : ' and the title fallback finds nothing either'}`);

  /* ── diagrams ────────────────────────────────────────────────────────── */
  diagrams.forEach((d, di) => {
    const key = d?.id || `diagram:${hash8(d?.title || di)}`;
    at(key, d);
    const svg = String(d?.svg || (d?.scenarios || []).map((s2) => s2?.svg || '').join('') || '');
    if (!svg) return;
    const declared = d?.kind === 'table';

    /* What separates a table from every other SVG in the census: its text sits on a grid. Group the
       <text> by y, keep the rows carrying two or more, and count how many of those rows share the
       same column positions. Measured over the 39 diagrams packets 14-21 authored, 4 rows separates
       every table from every bar chart, box-and-arrow and plotted curve — the earlier test, "nothing
       is drawn", called four bar charts tables because a bar is a <rect>. */
    const body = svg.replace(/<defs[\s\S]*?<\/defs>/g, '');
    const byRow = new Map();
    for (const m of body.matchAll(/<text\b[^>]*\bx="([\d.-]+)"[^>]*\by="([\d.-]+)"/g)) {
      const y = Math.round(parseFloat(m[2]));
      if (!byRow.has(y)) byRow.set(y, new Set());
      byRow.get(y).add(Math.round(parseFloat(m[1])));
    }
    const columnSets = new Map();
    for (const xs of byRow.values()) {
      if (xs.size < 2) continue;
      const sig = [...xs].sort((a, b) => a - b).join(',');
      columnSets.set(sig, (columnSets.get(sig) || 0) + 1);
    }
    const gridRows = Math.max(0, ...columnSets.values());

    if (gridRows >= 4 && !declared) add('diagram.table-kind', key, `${gridRows} rows on the same columns, but kind is ${d?.kind ? `"${d.kind}"` : 'unset'}`);
    if (!declared) return;

    if (Array.isArray(d.checklist) && d.checklist.length) add('diagram.table-checklist', key, `${d.checklist.length} checklist items on a table`);

    /* The viewBox is authored in units; a table fills the Learn Mode column, so a unit is
       column/viewBoxWidth CSS pixels. 800 is that column measured in the browser at a 1440px
       laptop — the narrowest desktop this applies to, since below 768 the phone sheet takes over.
       This is the check nothing had: packet 20 measured cell OVERFLOW, which is about the room a
       column gives, and was blind to the text simply being small. */
    const vb = (svg.match(/viewBox="([^"]+)"/) || [])[1];
    const vbW = vb ? parseFloat(vb.trim().split(/[\s,]+/)[2]) : NaN;
    if (!Number.isFinite(vbW) || vbW <= 0) return;
    const scale = 800 / vbW;
    const sizes = [...body.matchAll(/<text\b[^>]*\bfont-size="([\d.]+)"/g)].map((m) => parseFloat(m[1]));
    const worst = sizes.length ? Math.min(...sizes) : null;
    if (worst != null && worst * scale < 12) {
      add('diagram.table-legible', key, `smallest cell is ${worst} units on a ${vbW}-unit box — ${(worst * scale).toFixed(1)}px in an 800px column`);
    }
  });

  /* ── practice ────────────────────────────────────────────────────────── */
  practice.forEach((p, pi) => {
    const key = p?.id || `practice:${hash8(p?.question || pi)}`;
    at(key, p);
    const cmd = p?.command ? String(p.command).trim() : (String(p?.question || '').trim().split(/\s+/)[0] || '').replace(/[^A-Za-z]/g, '');
    if (!p?.command) add('practice.no-command', key, `no command field${cmd ? ` (stem starts "${cmd}")` : ''}`);
    if (!cmd) return;
    const allowed = spec.tariffs[cmd];
    if (!allowed) { add('practice.command', key, `"${cmd}" is not an IAL ${spec.subject} command word${spec.absent.includes(cmd) ? ' (it exists in the UK GCE, not here)' : ''}`); return; }
    const marks = Number(p?.marks);
    let ok = allowed.includes(marks);
    // Business Assess is 10 in Units 1-2 and 12 in Units 3-4 (tariff-census.json, bus_spec.txt:2238-2245).
    if (subject === 'business' && cmd === 'Assess' && unit) ok = marks === (unit <= 2 ? 10 : 12);
    if (!ok) add('practice.tariff', key, `${cmd} (${marks}) — ${cmd} carries ${allowed.join(' or ')} mark${allowed.length > 1 || allowed[0] !== 1 ? 's' : ''} in IAL ${spec.subject}${subject === 'business' && cmd === 'Assess' ? ` (${unit <= 2 ? 10 : 12} in Unit ${unit})` : ''}`);
    if (marks > 6 && /\(\s*\d+\s*marks?\s*\)/i.test(String(p?.guidance || ''))) add('practice.levels', key, `${marks}-mark ${cmd} guidance allocates points "(n marks)"; tariffs above 6 are levels-marked`);
  });

  /* ── section depth ───────────────────────────────────────────────────── */
  if (content.length && recallCount === 0) add('section.no-recall', 'section', `${subsectionCount} subsections, no recall`);
  if (content.length && content.length < 4) add('depth.blocks', 'section', `${content.length} block${content.length === 1 ? '' : 's'} (want ≥4)`);
  if (subsectionCount && recallCount / subsectionCount < 0.5) add('depth.recalls', 'section', `${recallCount} recalls over ${subsectionCount} subsections (want ≥0.5 per subsection)`);
  if (quiz.length && quiz.length < 20) add('depth.quiz', 'section', `${quiz.length} quiz items (want ≥20)`);
  // Learn Mode block titles ⊇ Notes titles (F110). A Notes topic with no Learn Mode block or
  // subsection sharing half its content words is taught on one tab and not the other.
  if (content.length && notes.length) {
    const learnWords = new Set(content.flatMap((b) => [b?.title, ...(b?.sections || []).map((s) => s?.title)]).flatMap((t) => [...tokens(t)]).filter((w) => w.length > 2 && !STOP.has(w)));
    notes.forEach((n, ni) => {
      const t = [...tokens(n?.title)].filter((w) => w.length > 2 && !STOP.has(w));
      if (!t.length) return;
      const covered = t.filter((w) => learnWords.has(w)).length / t.length;
      if (covered < 0.5) add('depth.notes-titles', `notes:${hash8(n.title || ni)}`, `Notes topic "${n.title}" has no Learn Mode block or subsection title sharing its words`);
    });
  }

  /* ── claims, localisation, terminology ───────────────────────────────── */
  const allText = strings(bundle);
  const teachingText = strings([content, notes, extras]).join('\n');
  const sentences = allText.flatMap((t) => String(t).split(/(?<=[.!?])\s+/));
  sentences.forEach((s) => {
    if (EXAMINER_CLAIM.test(s) && !CITATION.test(s)) add('claim.uncited', `claim:${hash8(s)}`, `"${s.trim().slice(0, 90)}"`);
  });
  // One finding per sentence that names a UK-only institution, keyed on the sentence: a new
  // mention is a new BLOCK, a removed one simply disappears, and the count never masks either.
  sentences.forEach((s) => {
    const inst = UK_INSTITUTION.exec(s) || UK_ACRONYM.exec(s);
    if (inst) add('locale.institution', `locale:${normKey(inst[1])}:${hash8(s)}`, `"${inst[1]}": "${s.trim().slice(0, 90)}"`);
  });
  const ukHits = allText.reduce((n, t) => n + (String(t).match(new RegExp(UK_FRAME.source, 'g')) || []).length, 0);
  const intlHits = allText.reduce((n, t) => n + (String(t).match(new RegExp(INTL_FRAME.source, 'g')) || []).length, 0);
  if (ukHits >= 1 && ukHits > intlHits) add('locale.uk', 'section', `UK-framed mentions ×${ukHits} against ×${intlHits} from anywhere else — the UK is the default frame`);
  const cur = CURRENCIES.filter(([, re]) => allText.some((t) => re.test(String(t)))).map(([c]) => c);
  if (cur.length > 1) add('locale.currency', 'section', `currencies ${cur.join(', ')}`);
  for (const { re, why } of OFF_SPEC_TERMS) {
    const hits = allText.reduce((n, t) => n + (String(t).match(new RegExp(re.source, re.flags.includes('g') ? re.flags : re.flags + 'g')) || []).length, 0);
    if (hits) add('terms.off-spec', `terms:${normKey(re.source)}`, `${re.source.replace(/\\b/g, '')} ×${hits}: ${why}`);
  }
  if (ctx?.laterUnitTerms && unit && unit <= 2) {
    const low = normText(teachingText);
    const found = [...ctx.laterUnitTerms].filter((term) => low.includes(term)).slice(0, 12);
    for (const term of found) add('terms.later-unit', `terms:${normKey(term)}`, `"${term}" is introduced by the spec in a later unit of ${spec.subject}`);
  }

  /* ── Layer 3: spec-first coverage ────────────────────────────────────── */
  if (Array.isArray(ctx?.specItems) && ctx.specItems.length) {
    const leaves = ctx.specItems.filter((it) => it.kind === 'leaf');
    // Evidence is judged per text field, not per section: the leaf's distinctive terms must
    // co-occur inside one paragraph, key idea, note item or chain step. Scattered mentions across
    // a section are how "inertia" counted as taught while appearing only in a quiz explanation.
    const fields = strings([content, notes, extras]).map((t) => normText(t).replace(/[^a-z0-9 ]/g, ' '));
    let covered = 0;
    for (const leaf of leaves) {
      const terms = [...tokens(leaf.wording)].filter((w) => w.length >= 5 || (/^[a-z]{3,4}$/.test(w) && !STOP.has(w)));
      if (!terms.length) { covered += 1; continue; } // nothing distinctive to look for; do not count against
      const need = Math.max(1, Math.min(terms.length, Math.ceil(terms.length / 2)));
      const hit = fields.some((f) => terms.filter((t) => f.includes(t)).length >= need);
      if (hit) covered += 1;
      else add('spec.uncovered', `spec:${leaf.id}`, `${leaf.id} "${leaf.wording.slice(0, 80)}" (${leaf.source})`);
    }
    add('spec.coverage', 'section', `${covered} of ${leaves.length} specification leaves evidenced in the teaching text (${leaves.length ? Math.round((100 * covered) / leaves.length) : 0}%)`, { covered, leaves: leaves.length });
  }

  /* ── quantitative ────────────────────────────────────────────────────── */
  if (Array.isArray(ctx?.quantTemplates) && unitCode) {
    const forUnit = ctx.quantTemplates.filter((t) => String(t.unit || '').toUpperCase() === String(unitCode).toUpperCase()).length;
    if (!forUnit) add('quant.unit', 'section', `no quantitative drill template is registered for ${unitCode}`);
  }

  add('section.counts', 'section', `${content.length} blocks · ${subsectionCount} subsections · ${recallCount} recalls (${reorders.length} reorder, ${fillins.length} fill-in, ${matches.length} match, ${classifies.length} classify) · ${quiz.length} quiz · ${practice.length} practice · ${diagrams.length} diagrams · ${chains.length} chains`);

  /* ── keys ────────────────────────────────────────────────────────────── */
  // See the header. Item-level findings are fingerprinted on the item their `where` names (or its
  // longest registered prefix, so `sub:x:body2` falls back to that body item and `sub:x:fillin:1`
  // to the recall). Section-level findings are fingerprinted on their detail. Anything else —
  // per-term counts, per-sentence claims, spec leaves — keeps a fingerprint-free key.
  for (const f of findings) {
    let fp = '';
    let w = f.where;
    while (w && !index.has(w)) { const cut = w.lastIndexOf(':'); w = cut > 0 ? w.slice(0, cut) : ''; }
    if (w) fp = hash8(JSON.stringify(index.get(w)));
    else if (f.where === 'section') fp = hash8(f.detail);
    f.key = `${sectionId}|${f.rule}|${f.where}${fp ? `|${fp}` : ''}`;
  }

  const summary = {
    sectionId, subject, unitCode, number,
    block: findings.filter((f) => f.tier === 'BLOCK').length,
    debt: findings.filter((f) => f.tier === 'DEBT').length,
    info: findings.filter((f) => f.tier === 'INFO').length,
  };
  return { findings, summary };
}

/* ────────────────────────────────────────────────────────────────────────────
   Diagram pin resolution, mirroring the app exactly. Pinned first, by id or by
   normalised title substring; then the title fallback fills empty blocks the way
   components/learn-mode/utils.js matchDiagramsToBlocks does. A ref that matches
   nothing but whose block is rescued by the fallback is reported as rescued.
   Shared with scripts/publish-section.mjs so the gate and the push agree.
   ──────────────────────────────────────────────────────────────────────────── */
export function unresolvedDiagramPins(content, diagrams) {
  if (!Array.isArray(content)) return [];
  const list = Array.isArray(diagrams) ? diagrams : [];
  const used = new Set();
  const missed = [];
  const resolved = new Set();
  content.forEach((block, i) => {
    const pin = block?.diagramId || block?.diagramRef;
    if (!pin) return;
    let idx = -1;
    if (block.diagramId) idx = list.findIndex((d, k) => d?.id === block.diagramId && !used.has(k));
    else {
      const ref = normKey(block.diagramRef);
      idx = list.findIndex((d, k) => { if (used.has(k)) return false; const t = normKey(d?.title); return t && ref && (t.includes(ref) || ref.includes(t)); });
    }
    if (idx >= 0) { used.add(idx); resolved.add(i); } else missed.push({ i, block: block.title, pin });
  });
  if (!missed.length) return [];
  // title fallback for the blocks still empty, exactly as matchDiagramsToBlocks
  const STOPW = new Set(['and', 'the', 'for', 'its', 'with', 'from', 'into', 'that', 'this', 'are', 'was', 'how', 'why', 'what', 'their', 'them', 'not', 'but', 'can', 'has', 'over']);
  const nz = (s) => String(s || '').toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/).filter((w) => w.length > 2 && !STOPW.has(w));
  const unclaimed = list.map((d, k) => ({ d, k })).filter(({ k }) => !used.has(k));
  const empty = content.map((b, i) => ({ b, i })).filter(({ i }) => !resolved.has(i));
  const rescued = new Set();
  const taken = new Set();
  for (const { d } of unclaimed) {
    const dw = new Set(nz(d?.title));
    let best = -1; let bestScore = 0;
    empty.forEach(({ b }, j) => { if (taken.has(j)) return; const score = nz(b?.title).filter((w) => dw.has(w)).length; if (score > bestScore) { bestScore = score; best = j; } });
    if (best >= 0 && bestScore > 0) { taken.add(best); rescued.add(empty[best].i); }
  }
  return missed.map((m) => ({ ...m, rescued: rescued.has(m.i) }));
}

/**
 * Terms the spec introduces only in Units 3-4 of a subject, for the later-unit lint.
 *
 * These are the spec's own sub-topic labels ("Monopoly", "Contestability", "Investment appraisal"),
 * not generated bigrams. A first version generated word pairs from requirement wordings and produced
 * 112 hits, most of them prose ("business decisions", "have different"). A label is what the
 * specification chose to name a thing, so a Unit 1 section that teaches under a Unit 3 label is
 * teaching Unit 3.
 */
export function laterUnitTerms(specItems, subject) {
  const rows = (specItems || []).filter((it) => it.subject === subject && it.subtopicLabel);
  const unitOf = (it) => Number(String(it.topic).split('.')[0]);
  const clean = (l) => normText(l).replace(/\s*\(continued\)\s*/g, ' ').replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim();
  // The label is complete only on its sub-topic's last item: take the longest string seen per sub-topic.
  const longest = new Map();
  for (const it of rows) {
    const k = `${it.topic}:${it.subtopic}`;
    const l = clean(it.subtopicLabel);
    if (!longest.has(k) || l.length > longest.get(k).label.length) longest.set(k, { label: l, unit: unitOf(it) });
  }
  const earlyWords = new Set([...longest.values()].filter((x) => x.unit <= 2).flatMap((x) => x.label.split(' ')));
  /*
   * V012. The rule is "a term the spec introduces ONLY in Units 3-4", and the `earlyWords` guard
   * below reads Unit 1-2 sub-topic LABELS alone. A phrase Units 1-2 teach in their own requirement
   * WORDING, without using it as a heading, was therefore classed as later-unit vocabulary: measured
   * over audit/raw/spec-items.json, 2 of 40 — "niche markets", which Business teaches at 1.3.1
   * sub-topic 1a and again as the leaf 1.3.3 1e-2 before Unit 4 uses it as a heading, and
   * "exchange rates" in Economics. Both were reported against sections that were quoting the
   * specification's own words at them (packet 16, then packet 22). The whole early text is searched
   * for the complete phrase, not for its words, so a label that merely reuses early vocabulary in a
   * new combination is still late.
   */
  const earlyText = rows.filter((it) => unitOf(it) <= 2)
    .map((it) => `${clean(it.subtopicLabel || '')} ${clean(it.wording || '')}`).join(' | ');
  const late = new Set();
  for (const { label, unit } of longest.values()) {
    if (unit < 3) continue;
    const ws = label.split(' ').filter((w) => w && !STOP.has(w));
    if (ws.length < 2) continue;                       // a single word is not a unit's own vocabulary
    if (ws.every((w) => earlyWords.has(w))) continue;  // built entirely from Unit 1-2 words
    if (earlyText.includes(label)) continue;           // V012: Units 1-2 teach this exact phrase too
    if (/\b(and|or|in|of|the|for|to|versus)$/.test(label)) continue; // a label the page break cut short
    late.add(label);
  }
  return late;
}
