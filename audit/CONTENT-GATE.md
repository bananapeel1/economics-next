# The content gate — what replaces the paid examiner

**Decision, 12 September 2026:** there is no budget for a qualified IAL examiner, and every question,
stimulus and mark scheme is authored originally rather than taken from an existing source. The sign-off
is replaced, not deleted. This file is the replacement. Packet 3 builds layers 1 to 3; packet 14 pilots
layers 4 to 7 and is the session that proves the whole gate.

Designed from the measured failure taxonomy of the March content, not from theory. Three independent gate
designs were produced and each was attacked by a critic that hunted for real March failures it would let
through. **All three were rejected as written, and all three failed the same way**: they caught structure
and missed the economics. This design is the synthesis plus the fixes the critics forced.

---

## What actually went wrong in March, by volume

2,013 classified failures across 43 sections. This is where the gate must aim.

| Tier | Share | What it is | Reachable by |
|---|---|---|---|
| A | 38.3% (771) | Exam shape, MCQ construction, recall design, wiring, localisation, spec numbering | Pure static check, no model call |
| B | 26.9% (541) | Untaught assessment, spec coverage gaps, off-spec frameworks | Static check, once a reference asset exists |
| C | 34.8% (701) | Factual errors in examples, conceptual errors in prose, sequencing, internal contradiction | Reading comprehension |

Tier C holds 68 of the 214 critical and high findings. **That is the third the examiner was really for, and
it is the third every candidate design missed.** Layers 4 and 5 exist entirely to cover it.

---

## Layer 1 — Make the failure unrepresentable

A schema that cannot express the defect, plus a blocking validator **inside** the write path. March's
validator sat beside the write path and half the content scripts skipped it; that must not be repeatable.

Blocking rules, each with its measured hit rate against the live corpus:

- **(command word, marks) whitelist** per subject and unit. Flags 198 of 215 live practice items.
- **Levels marking above 6 marks**: no `(N marks)` point allocation in guidance; require level bands.
- **MCQ construction**: chi-square the `correctIndex` distribution per section and per corpus; reject a
  correct option more than 1.5× the longest distractor; reject hedged-correct-among-absolutes; reject
  duplicate options; reject near-duplicate stems by token Jaccard; reject essay command words in a stem.
  Flags 322 of 769 live items.
- **Fill-in hints**: reject any hint that is a case-insensitive prefix of its answer or reveals its length.
  Fires on all 141 live fill-ins, against 130 known failures.
- **Reorder**: reject any reorder whose items are not a set-match for a flow or extras chain in the same
  subsection. (The shuffle-permutation rule was retired in packet 7: the start order is seeded at render
  and the stored field is ignored.)
- **Wiring**: every quiz and practice index referenced by exactly one block; no identity `quizIndices`
  sequence; every `diagramRef` resolves; no section ships with zero recalls.
- **Localisation**: UK-institution token denylist, and one currency per section.
- **Examiner claims**: any sentence asserting what examiners reward or penalise must carry a citation.
  244 such sentences are live today and none is cited.

**Do not add an n-gram novelty rule against real papers.** The critics showed it conflicts with the goal:
correct IAL phrasing *is* the paper's phrasing, and the median stem is 15 words. Copyright is handled by
Layer 4's attestation, not by forcing questions to sound unlike the exam.


## Layer 1b — option letters in explanations

**Added 13 September 2026, from five rounds of verification on F074.**

Options are now shuffled at render, because the correct answer was option B in 492 of 769 questions
and a student who always picked B scored 64% without reading. 109 explanations refer to options by
letter — "Option A describes a mass market", "TV ads (A)" — so those letters have to move with the
options they name.

Telling a reference from a coincidence turned out to be genuinely hard, and five separate rules were
each defeated by a real or constructed case, twice in ways that made an explanation contradict its
own question. The code's final answer is to rewrite only what a keyword marks — "Option D",
"Options A, C and D", "(Options A and C)" — and to **decline to shuffle the whole question**
wherever a letter's meaning is not certain. 25 of 769 decline today.

That works, but it means every declining question keeps the answer-position bias. These are
blocking rules on authored content, so the gate shrinks that set rather than living with it:

1. **Refer to an option only as "Option X", never as a bare "(X)".** "TV ads (A)" is ambiguous with
   the Consumption symbol and with the article; "TV ads (Option A)" is not. 14 questions decline
   today for this reason alone and would shuffle immediately if reworded.
2. **Never put a capital A-F next to a digit or inside an equation in an explanation** — "B2B",
   "C + I + G", "A / (A + B)". Where the economics needs the identity, name the options in a
   separate sentence from the equation.
3. **Never interrupt a list of option letters with prose and then resume it.** "Option C, B to D on
   the diagram" reads as a three-option list and is not one.
4. **Do not name a diagram's labelled points with letters A-F in an explanation that also refers to
   options.** Use "point one" or a described position.

The first is the one that matters: it converts an unshuffleable question into a shuffleable one at
the cost of six characters.

## Layer 1 — built, 14 September 2026 (packet 3)

`lib/content-validator.mjs`, 50 rules, run inside the write path by `scripts/_content-write.mjs` and again
by `scripts/publish-section.mjs`, which reads the live row back afterwards and validates that; the decision
itself is `lib/content-gate.mjs`, shared with the two admin routes that write `data` from the editor. Golden
set: `audit/fixtures/validator/cases.json`, a failing case for every rule; `npm test` (95). Gate: `npm run
validate`, no regression against `audit/validator-baseline.json`.

**The write path is closed, and a test says so.** `scripts/_db.mjs` refuses a direct write of `data` on the
eight content tables through `from()`, `schema().from()` and `rest.from()`. Every seed and one-off script
imports that client; `lib/write-path.test.mjs` scans `scripts/`, `seed/`, `audit/scripts/` and `app/api/` and
fails on any file that writes a content table with a client of its own unless it is on a named allowlist with
a reason. Three writers of `data` remain by design and each is gated: `publish-section.mjs` (validates, writes,
reads back, validates the read-back), `restore-section.mjs` (the undo; validates after and reports),
and the admin routes `api/admin/sections/[id]/[type]` and `api/admin/diagrams` (validate in-route, refuse with
the findings in the body, read back). Everything else stages a `draft` through `stageSection()`, which also
reads its write back and refuses to report success on a row it did not change.

**Keys.** A finding's key is `section | rule | where | fingerprint`, where the fingerprint hashes the item the
finding is about — the quiz question, the practice item, the recall, the subsection's teaching text, the
block's own fields. A rewritten item with the same id therefore gets new keys, and a finding that survives the
rewrite is a real regression, not baselined noise; ids alone could not say that, because packet 2 minted ids a
rewrite keeps. Section-level findings (histogram, depth, currency, the UK ratio) are fingerprinted on their
detail so a changed aggregate is re-reported. Term-count findings (off-spec vocabulary, later-unit terms) keep
a count-free key on purpose: removing one mention must not read as a regression. UK institutions are one
finding per sentence for the same reason. `lib/content-validator.test.mjs` holds a test for each of these.

Live hit rates on 14 September over all 43 sections (1,131 BLOCK, 1,358 DEBT; 2,489 keys). The BLOCK total
rose from the first run's 886 because `locale.institution` is now counted per sentence, not per term:

| Rule | Tier | Live | Note |
|---|---|---|---|
| `claim.uncited` | BLOCK | 384 | sentences asserting what examiners reward; none cited |
| `quiz.long-correct` | BLOCK | 185 | correct option >1.5× the longest distractor |
| `practice.tariff` | BLOCK | 93 | e.g. "Define (4)"; Business Assess 10/12 by unit |
| `practice.command` | BLOCK | 60 | Outline anywhere; Assess in Economics |
| `locale.institution` | BLOCK | 298 | sentences naming the NHS, Bank of England, council tax…; one key per sentence |
| `quiz.essay-stem` | BLOCK | 28 | Evaluate/Assess/Discuss opening an MCQ |
| `section.no-recall` | BLOCK | 24 | 20 Business sections have zero recalls |
| `pins.diagram` | BLOCK | 20 | resolves to nothing after the title fallback |
| `fillin.token` / `blanks` / `dup-answers` | BLOCK | 3 / 8 / 5 | F112, F106; `one-per-line` retired in packet 7 (the renderer draws every segment) and `token` refuses commas only |
| `fillin.hint` | DEBT | 427 | hint is a prefix of the answer (every recall) |
| `spec.uncovered` | DEBT | 213 | Layer 3, mechanical floor |
| `reorder.criterion` / `lead` / `source` | DEBT | 57 / 23 / 22 | Layer 1a; see the limit below |
| `quiz.histogram` | DEBT | 41 | sections with a bucket >40% or <10% |
| `depth.recalls` / `quiz` / `blocks` | DEBT | 24 / 21 / 19 | F083, F108 |
| `locale.uk` | DEBT | 16 | sections where UK-framed mentions outnumber every other country's (F116) |
| `depth.notes-titles` | DEBT | 3 | a Notes topic no Learn Mode block or subsection title shares words with |
| `quiz.explanation-option` | DEBT | 0 | explanation quotes a distractor verbatim and shares no word with the answer |

**What Layer 1 will not catch, measured.** Against the March per-recall verdicts, the three reorder rules
together flag 51 of the 66 weak or not-orderable recalls. The other 15 are bad because of what the items
mean — "Rent rewards land" before "Wages reward labour" — and no lexical rule sees that. The criterion rule
alone flags exactly the 17 underspecified prompts, fifteen of them "Put these in the right order", which is
the founder's own example. Content packets read the verdicts directly for the rest.

## Layer 3 in practice — what the first content packet cost, 14 September 2026

Packet 13 was the first content written through this gate, and it is the honest measure of what the gate costs and
returns. It removed eight frameworks the IAL specification does not contain, resolved two cross-section
duplications, and rewrote nineteen duplicate quiz stems.

| | before | after |
|---|---|---|
| baseline keys | 2,489 | 2,189 |
| BLOCK findings | 1,131 | 902 |
| DEBT findings | 1,358 | 1,287 |
| `terms.off-spec` | 19 | **0** |
| `quiz.near-dup` | 36 | 17 |
| `locale.institution` | 298 | 160 |
| `claim.uncited` | 384 | 311 |

**About a third of the edits were not in the packet's scope**, and that is the mechanism working rather than
failing. Because a finding's key is fingerprinted on the item, rewriting a sentence retires its findings, so the
packet inherited every defect sitting on text it touched: three command words that do not exist in IAL Economics,
two tariffs contradicting Appendix 6, four UK-only institutions, seven questions whose correct option was the
longest, two sections with no recall. Budget for this in every content packet. It is why the baseline falls by more
than the packet's own scope, and it is the only reason the number moves at all rather than sideways.

**Two defects in the gate itself surfaced only because content finally went through it.** A read-back check
compared `JSON.stringify` output while PostgreSQL's `jsonb` normalises key order, so the first hand-authored object
was refused after a write that had succeeded. And `MPC` sat in the UK-acronym list, producing 130 BLOCK findings in
a corpus where it means marginal private cost. A guard that has never run against real content has an unknown
failure mode; run it early, on something real.

## Layer 2 — built, 14 September 2026

Both assets are generated by script from the specification text, carry a source line on every row, and
are checked against their generators by `npm test`.

- `audit/raw/tariff-census.json` — 16 rows from Appendix 6 of each spec. `lib/ial-marking.js` is asserted
  equal to it; `lib/ial-commands.js` now imports from `ial-marking` rather than carrying a copy.
- `audit/raw/spec-items.json` — 1,125 countable leaves under 194 parent requirements, all 43 topics. Verified
  mechanically complete (every bullet or lettered line in every topic span has exactly one row; 0 leaks, 0
  missed) and by hand (deterministic 30-row sample, 30 of 30 verbatim). It does not reconcile to the earlier
  audit's 1,073 and must not be bent toward it; the disagreement was checked against the source in both
  directions and is the earlier audit's granularity (see DECISIONS.md).

## Layer 3 — built, 14 September 2026, with an honest ceiling

`spec.uncovered` walks inward from every leaf in `spec-items.json` and asks which teaching text evidences
it, requiring the leaf's distinctive terms to co-occur inside one text field. It sees 14 of the 17
assessed-but-never-taught items found on 13 September. Its mean coverage is 81% against the reading audit's
62%: it is a lexical floor, and the 19 points between them are the reading the content packets do.

## The recall contract — built 14 September 2026 (packet 7)

The four exercise types a section's recalls are written into. The widgets are `components/learn-mode/*Recall.jsx`,
the grading and ordering logic is `lib/recall-widgets.js` (tested), the exemplars authors copy are
`lib/recall-fixtures.js`, and the gallery that renders them is `/admin/widgets` (founder) and `/dev/widgets`
(dev server). Every recall sits at `section.recall` with an `id` (packet 2 mints one) and a `prompt`.

**What every type does, so an author knows what the student meets.** Check marks each item; a wrong check
says how near it was and offers *Try again* with the right items locked; the answer, with the `why` lines,
appears on request after the first wrong check and by itself after the second. The score the engine records
is the first check only. A visible *Skip* counts the recall as skipped, and the skipped recall comes back as
the spaced recall at the next chapter check-in (F055). Start orders are seeded from the recall id, never
random and never stored: the same recall is a different puzzle on its spaced showing (F053, F113).

| Type | Use it for | Shape | Rules |
|---|---|---|---|
| `reorder` | A genuine sequence: cause to effect, a process, a calculation. Never a ranking, never parallel facts | `correctOrder[]` 3-5, `why[]` one line per item, a prompt that names the ordering principle | `reorder.count` BLOCK · `reorder.criterion` / `source` / `lead` DEBT · `recall.why` DEBT |
| `fillin` | A term or a number the student should produce | `template[]` lines with `___` blanks (any number per line), `answers[]` one per blank in reading order (multi-word is one chip), `hints[]` semantic, `distractors[]` 2-3 | `fillin.blanks` / `dup-answers` / `token` BLOCK · `fillin.hint` / `distractors` / `leak` DEBT |
| `match` | "X goes with Y": a source with its use, a term with its definition, a policy with its effect | `pairs[{ left, right, why }]` 3-5, `distractors[]` 0-2 extra rights | `match.count` / `unique` BLOCK · `match.prompt` / `recall.why` DEBT |
| `classify` | Membership: fixed or variable, injection or leakage, micro or macro. Also every ranking and "sort into" the March audit wrote as a reorder | `groups[{ name, items[], why }]` 2-3 groups, 4-8 items | `classify.groups` / `unique` BLOCK · `classify.prompt` / `recall.why` DEBT |

**Writing the `why`.** One line, the reason, not a restatement: for a reorder item, why it follows the one
before ("excess demand bids the price up"); for a pair, why that use and not another; for a group, the rule
that decides membership ("they do not change with output in the short run"). It is what the student reads at
the moment the audit says the platform's authority used to drop to zero.

**Converting a bad reorder.** The March verdicts in `audit/raw/content-audits.json` name 18 not-orderable and
48 weak reorders. "Match X to Y" becomes a `match`; a ranking, "most to least", "sort into" or a list of
parallel facts becomes a `classify`; a chain with one defensible order but an underspecified prompt stays a
`reorder` with the principle named; a chain with two defensible orders is rewritten or replaced. The two
converted exemplars in `lib/recall-fixtures.js` are the template.

**What the renderer forgives, and what it does not.** A template whose blank count disagrees with its answers
is still completable (spare answers become chips, spare blanks go inert), a line with `___ ___` renders whole,
a stored letter-prefix hint is shown as the first letter only, and a fill-in with no distractors gets two from
the section's other answers. None of that makes the content right: the validator still reports it, and a
section packet clears it.

## The per-section edit pass — the checklist (F116)

The validator enforces what is mechanical so that a person's pass can spend its minutes on meaning. Every
content packet runs this list once per section, after staging and before `publish-section.mjs --confirm`,
and records "checklist done" in its PROGRESS.md row. It is short on purpose; Layer 7 says why longer lists
are theatre.

1. **Every recall is the right type, names its criterion, and carries its `why`.** A reorder only for a
   genuine sequence (cause to effect, a process, a calculation); a pairing is a `match`; a ranking, a
   "sort into" or a set of parallel facts is a `classify`; a term is a `fillin` with 2-3 distractors and
   semantic hints. See "The recall contract" below. `reorder.criterion` catches the wording; read the items
   and ask whether a student who was taught this could reconstruct the order for the reason the prompt
   gives. Delete `shuffled` when you touch a reorder; it is ignored.
2. **Every example is one an IAL candidate can picture.** Centres sit WEC/WBS in Hong Kong, Singapore,
   Malaysia, Pakistan, the Gulf, Nigeria and Kenya. A UK example is allowed as one of several; the default
   frame is the student's own market or a global name. `locale.institution` refuses the NHS, HMRC, council
   tax and the rest; `locale.uk` fires when UK mentions outnumber everywhere else. Neither can judge whether
   the example is *relevant* — that is this step.
3. **Nothing UK-only survives as content.** RPI, the Chancellor, Ofgem, furlough: not renamed, removed, with
   the international equivalent in its place (CPI; the finance ministry; the sector regulator; wage subsidy).
4. **Flow steps carry a subtitle only as `{ title, subtitle }`.** A string containing " — " is the legacy
   convention and `flow.separator` reports it; hyphens and en dashes in a string are never split, so a formula
   like "Float = LFT - EST - duration" is safe.
5. **Every examiner claim points at a source.** `claim.uncited` refuses a sentence about what examiners
   reward without one; the person checks that the cited paper and question actually say it.
6. **Every practice item opens with a scaffold, not its mark scheme.** Guidance is at least two
   paragraphs. The FIRST is what a student sees above the answer box before writing — how to start, what
   to separate, what to watch for — and it carries no figure, no mark allocation and no answer. The mark
   scheme is paragraph two onward. `InlinePractice.jsx` prints `guidance.split('\n')[0]` in guided mode,
   which `getPracticeMode` gives to every item except the first and last of a section, so a one-paragraph
   guidance is the whole scheme shown over an empty box asking the student to write it. `practice.opening`
   catches the shape; only a person can judge whether the opening actually gives nothing away.
7. **The section's baseline shrank.** `node audit/scripts/validate-content.mjs --section <id>` before and
   after; the packet is not done while the section carries more baselined findings than it started with.

## Layer 1a — the reorder rule the audit was not strict enough about

**Added 12 September, from the founder's own observation, against the audit's verdict.**

The founder pointed at this live exercise as an example of the worst flaw in the product:

> Put these supply shift factors in order of explanation:
> Identify the factor · Explain how it affects costs · State the direction of the shift ·
> Show the effect on equilibrium price and quantity

The audit graded that item **`genuine-sequence`** — one of the 64 it kept — on the grounds that a
taught student can reconstruct factor to cost to shift to equilibrium. By the audit's test it is
sound, and the planned rewrite of the 66 bad reorders would never have touched it.

The founder is right and the audit's test is too weak. "In order of explanation" does not say what
is being ordered. A student who reasons *factor, so supply shifts right, because costs fell, so
equilibrium moves* has produced a defensible order and is marked wrong. The exercise is not
unorderable; it is **underspecified**, which feels identical from the student's chair and does the
same damage to trust.

Measured across all 43 sections: of the 64 reorders the audit called sound, **46 have a prompt that
never names the ordering principle.** "Order these steps when demand shifts right." "Order these
business plan steps logically." So this is not one item, it is 72% of the reorders the audit told
us to keep.

**Two blocking rules, added to Layer 1:**

1. **The prompt must name the ordering principle** in words the student can apply: chronological,
   causal, by size, in the order you would write it in an answer. "Logically" and "in order of
   explanation" fail. A static check on the prompt string catches these.
2. **A reorder must have exactly one defensible order, not merely one intended order.** Where a
   second reading survives, the item becomes a different exercise type — `match` or `classify` —
   rather than being reworded. Packet 7 built those types; see "The recall contract" above.

**And regardless of either rule:** a wrong answer must say *why* that order is right. Until packet 7 it
returned "0 of 4 in the right position" and the correct list, with no reasoning, which is the moment
the founder describes as the platform's authority dropping to zero. The `why` field exists now, the
widget shows it, and `recall.why` reports every recall that lacks it; content packets write it.

## Layer 2 — Reference assets, each verified against source

Two assets unlock Tier B. Both are generated **by a script from the specification text**, spot-verified
against the source, and regenerated rather than edited.

1. **Tariff and command census** per subject and unit.
2. **Spec-bullet keyword map**: every spec bullet to the terms that evidence it. The single highest-value
   asset, because it also gates every future section.

> **The asset rule, learned the hard way.** On 12 September a hand-written summary of the Economics Unit 2
> paper was propagated to 52 agents and was wrong; Unit 2 is identical to Unit 1, not to Unit 3. The agents
> that read the spec were unaffected; the checker that trusted the summary flagged the correct answer as
> wrong. **No reference asset may be hand-summarised. Generate it, then verify a sample against the source
> text.** A wrong oracle is worse than no oracle, because everything downstream inherits it silently.

## Layer 3 — Spec-first coverage, walking inward

Every design failed this identically: they all start at the content and walk outward, so **absence is
invisible**. 340 spec gaps, 17% of all failures, cannot be seen that way.

This layer starts at the spec bullet and asks which content evidences it. A bullet with no evidence is a
blocking finding. It is the only stage that can see what is missing.

## Layer 4 — Corroboration, or deletion

**The largest critical class, and the one no candidate design caught.** 184 failures sit in real-world
examples: the eBay and Skype demerger that never happened, the inverted Toyota chip shortage, the invented
Tesla financing, the Brexit salmon claim, the Marks and Spencer restructure that cannot be corroborated,
the Chevrolet Nova myth.

The rule is not review, it is a precondition on authoring:

- Any example naming a real entity **and** a year or a figure must carry a source the reviewer can check.
- A reviewer **with search** verifies each one.
- **Uncorroborated means deleted, not flagged.** A generic, true example always beats a specific, invented
  one. This is the single highest-value rule in the gate, because these errors are the ones a teacher or a
  well-read student catches, and each one costs trust in everything else.

## Layer 5 — Contradiction, counted in pairs

Nothing in any candidate design owned this, because every pass condition counted *items* and a
contradiction is a *pair*. 55 to 75 findings are a section disagreeing with itself: consumption called the
most volatile component of aggregate demand while the next subsection, the block takeaway and a later
takeaway all say investment; transfer payments taught as an injection while the section's own quiz excludes
them; retained profit called free in the body while the misconception beside it says calling it free is wrong.

One reviewer whose unit of work is the claim pair, not the item, and whose count is pairs examined. Cheap
mechanisation first: the same term asserted with opposite predicates across surfaces.

## Layer 6 — Adversarial review, with the laundering fixed

Three to four reviewers, isolated briefs, **census counted** so a reviewer that samples fails arithmetic,
with **canaries** planted beforehand so a brief that misses its own planted defect has its output voided.

Two corrections the critics forced:

- **Census denominators come from the section files, not `section-index.json`**, which reports zero
  mistakes for all 43 sections when 188 exist. A wrong denominator rewards the lazy reviewer.
- **The adversary may not launder severity.** Its observed behaviour is to refute rarely and downgrade
  often, against a pass condition of "zero findings at critical or high" — which pays it to downgrade.
  A downgrade below high requires named evidence, and the adversary's own downgrade rate is monitored.

## Layer 6 — as run in packet 14, 14 September 2026

The first section to go through the whole gate ran Layer 6 as one adversarial reviewer on Sonnet, before publish,
over a COPY of the staged bundle into which two defects had been planted: a quiz explanation whose arithmetic
contradicted the marked option, and a backward-pass figure in the notes that contradicted the body and the
diagram. The reviewer never sees the live bundle, so a canary cannot leak into content. It caught both canaries
and six real defects (an overstated figure from a cited source, a card that renamed EMV, a rounding tell in a
20-mark guidance, five length tells inside the validator's 1.5× threshold, a scatter graph that failed its own
"balanced above and below" rule, a trend stated as 2.5 that was 2.6), all fixed before publish. The census line
it returned ("read 15/15 subsections, 32/32 quiz, … 136 calculations recomputed, 65 contradiction pairs
examined") is what makes the report checkable.

The brief, to reuse for every section (replace the counts):

> You are an adversarial reviewer of revision content for Edexcel IAL <subject> Unit <n>, topic <number title>.
> Read-only. Assume the author is wrong until the text proves otherwise. Inputs: the bundle copy at <path>
> (describe the eight tables and their counts); the specification span at `audit/raw/<subject>_spec.txt`
> lines <a>-<b>, the ONLY authority on scope; Appendix 6 for command words and tariffs; the recall contract in
> `audit/CONTENT-GATE.md`. Check, in order, reporting a count for each: (A) recompute EVERY calculation,
> including the numbers in the SVG text; (B) contradictions between surfaces, counted in pairs; (C) correctness
> against the specification, plus anything taught that the spec does not contain and any leaf not taught;
> (D) every recall's defensibility (one order, one group, one pairing, one chip per blank, no hint that gives
> the answer); (E) every quiz item (one correct option, no defensible distractor, explanation consistent with
> the key, no length or hedge give-away); (F) every practice item (command and tariff per Appendix 6, guidance
> correct, no point allocation above 6 marks); (G) every real example: corroborate the sourced claims with
> search, report anything overstated; (H) UK-only institutions or default UK framing, a second currency, any
> uncited claim about examiners. Output only: a census line; numbered findings, most serious first, each with
> severity, table + path, the exact string, why it is wrong, the one-line fix; one line on fitness to publish.

If the report misses a canary, void it and re-run on the next tier; record both in DECISIONS.

## Layer 7 — The founder, honestly scoped

Every design claimed 8 to 12 minutes per section. The critics measured the real inventory: a **median of
244 independently falsifiable claims per section**. Eight minutes buys roughly four of them. That is not a
gate and should not be described as one.

The honest version:

- **Packet 14: 45 to 60 minutes.** It sets the template for 42 sections; this is the cheapest hour in the
  programme.
- **Every section after: about 15 minutes, spent only on Layer 4's corroboration list.** Named entities,
  years and figures. It is where a human is fastest, where the reputational damage is worst, and where the
  machine is weakest.
- Three questions only, on symptoms, never mechanism: does this look like a question from the paper; is
  this claim true; would you put this in front of a student.

## Layer 8 — The ablation exam, at checkpoints only

Two agents answer real past-paper questions on the topic, one having read our section and one blind; a
third marks both. The difference is the number that matters, because it measures the student rather than
the artefact.

**Not a per-section gate.** All three critics showed the per-section thresholds are statistically powerless
and, worse, that a blind-score ceiling is *improved* by wrong answer keys. Run it across the five sections
at each ship checkpoint as a programme health metric.

---

## What this still will not catch

Stated plainly so nobody mistakes the gate for an examiner.

- **A write that does not go through PostgREST's table API.** The client guard covers `from()` on the client,
  on `schema()` and on `rest`, for update, upsert, insert and delete. It cannot see `rpc()`. There is no
  SQL-executing function in this project's database and none must be created (`seed/setup-pdfs.mjs` calls one
  named `exec_sql` that does not exist); if one ever is, the gate has a hole no client can close. Likewise a
  write from the Supabase dashboard or SQL editor: the founder is the only person with that access, and
  `npm run validate` is the check that runs afterwards.
- **A rewrite that keeps a baselined BLOCK and changes nothing about the item.** Keys are fingerprinted on the
  item, so this cannot happen by editing the item; it can happen by leaving it alone, which is what the
  baseline is for.

- A conceptual error stated **consistently** across every surface of a section. Layer 5 catches
  disagreement; a uniformly wrong section reads as coherent.
- A plausible invented specific that search cannot disprove, though Layer 4's delete-by-default shrinks
  this to near nothing.
- Diagram geometry. The critics found real defects here that no brief owns: an MR=MC dot 23 pixels off the
  intersection, a perfect-competition long-run diagram drawn showing supernormal profit, overlapping label
  columns. **This needs a dedicated diagram reviewer with a geometry checklist**, and packet 3 should add
  the checks that are arithmetic (does the marked intersection sit where the two lines actually cross).
- Pedagogical sequencing judgement, which is partly proxied by Layer 1 but not resolved.

The residual risk is real. It is smaller than March's by a wide margin, and it is now named rather than
assumed away.
