/**
 * The IAL marking facts every AI route needs, in one place.
 *
 * The tutor and the grader each carried their own half-remembered version of this: the tutor said
 * "Define = 2-4 marks", "Assess/Evaluate/Discuss = 10-20 marks" and gave Economics the unit range
 * WEC11-WEC12, while the grader called itself an "Edexcel A-Level" examiner with no idea which
 * subject it was marking. Both were wrong in ways a student would repeat in an exam.
 *
 * Sourced from audit/raw/econ_spec.txt and audit/raw/bus_spec.txt. Do not restate these from
 * memory anywhere else; import them. See audit/PROTOCOL.md, "Canonical IAL paper structures".
 */

export const ECONOMICS = {
  subject: 'Economics',
  units: 'WEC11-WEC14',
  // command word -> the tariffs it can carry
  tariffs: {
    Define: [2],
    Calculate: [2, 4],
    Draw: [4],
    Explain: [4],
    Analyse: [6],
    Examine: [8],
    Discuss: [14],
    Evaluate: [20],
  },
  // Command words that exist in the domestic UK GCE but NOT in IAL Economics.
  absent: ['Assess', 'Outline'],
  papers: [
    'Units 1 (WEC11) and 2 (WEC12) are identical in shape: Section A six multiple choice (6 marks), Section B five short answers (20), Section C a five-part data-response question (34), Section D one 20-mark essay chosen from two.',
    'Units 3 (WEC13) and 4 (WEC14) are identical: Section A six multiple choice (6), Section B a five-part data-response question (34), Section C TWO 20-mark essays chosen from THREE (40).',
  ],
};

export const BUSINESS = {
  subject: 'Business',
  units: 'WBS11-WBS14',
  tariffs: {
    Define: [2],
    Calculate: [4],
    Construct: [4],
    Explain: [4],
    Analyse: [6],
    Discuss: [8],
    Assess: [10, 12], // 10 in Units 1-2, 12 in Units 3-4
    Evaluate: [20],
  },
  absent: ['Examine', 'Outline'],
  papers: [
    'Units 1 and 2: Section A source-based short and extended response (30 marks), Section B the same format on different sources (30), Section C one 20-mark essay based on one or more sources (20).',
    'Units 3 and 4: Section A short and extended response from sources (40), Section B one 20-mark essay (20), Section C one 20-mark essay (20).',
  ],
  note: 'Every Business question is anchored to a named extract line, and a 20-mark Evaluate must end in a justified recommendation.',
};

/** Pick the spec for a unit code like "WBS13" or "WEC11". Defaults to Economics. */
export function specForUnitCode(unitCode) {
  return String(unitCode || '').toUpperCase().startsWith('WBS') ? BUSINESS : ECONOMICS;
}

/** The tariff table as a prompt-ready line, e.g. `Define 2 · Explain 4 · Analyse 6 · …`. */
export function tariffLine(spec) {
  return Object.entries(spec.tariffs)
    .map(([command, marks]) => `${command} ${marks.join(' or ')}`)
    .join(' · ');
}

/**
 * The block of marking guidance to paste into a system prompt. Subject-specific, because the two
 * subjects genuinely differ and a shared version is wrong for both.
 */
export function markingGuidance(spec) {
  return `EXAM SHAPE — Edexcel International A-Level (IAL) ${spec.subject}, unit codes ${spec.units}.
This is the INTERNATIONAL qualification, not the domestic UK GCE. Never use UK Theme 1-4 structure.

${spec.papers.map((p) => `- ${p}`).join('\n')}

COMMAND WORDS AND TARIFFS, exhaustive for this subject:
${tariffLine(spec)}
These command words do NOT exist in IAL ${spec.subject} and must never be used or implied: ${spec.absent.join(', ')}.
${spec.note ? `\n${spec.note}\n` : ''}
MARK SCHEME SHAPE:
- Up to and including 6 marks, marking is point-based: each creditworthy point earns a mark.
- Above 6 marks, marking is LEVELS-based. Do not award or describe marks point by point; place the
  answer in a level and say what would lift it to the next one.
- The assessment objectives are Knowledge, Application, Analysis and Evaluation. Application means
  using the context or data given, not just naming a real-world example.
- A 20-mark answer needs a justified judgement, not a summary. State the judgement and the criterion
  it rests on.`;
}

/**
 * How a 20-mark answer is structured on THIS site.
 *
 * Stated once because it was previously stated twice and differently: the tutor prompt told students
 * "no introduction is needed" while every 20-mark model answer in `data/modelAnswersData.js` opens
 * with a labelled Introduction, the model-answers FAQ requires "a clear introduction defining key
 * terms", and `data/guidesData.js` says the same for Business. A student following the tutor was
 * being steered away from the marks the site's own model answers show being earned. Packet 9, F018.
 *
 * The introduction is not throat-clearing: defining the key terms is where the Knowledge marks are
 * picked up, which is why the model answers label it.
 */
export const ESSAY_20_STRUCTURE = `STRUCTURE FOR A 20-MARK ANSWER, matching the model answers on this site:
- Open by defining the key terms in the question. This is short, two or three sentences, and it is
  where the Knowledge marks are earned. Do not skip it and do not pad it.
- Two or three developed arguments. Each one: make the point, apply it to the context or data given,
  then build the cause-and-effect chain. One chain taken three steps beats three chains taken one.
- Counter-argument, genuinely weighed rather than named and dismissed.
- A conclusion that answers the question and states the criterion the judgement rests on, for example
  the time period, the size of the effect, or which assumption has to hold.
Never tell a student to skip the introduction.`;
