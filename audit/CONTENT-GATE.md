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
  subsection, and reject re-use of an over-used shuffle permutation.
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
| `fillin.token` / `one-per-line` / `blanks` / `dup-answers` | BLOCK | 14 / 11 / 8 / 5 | F112, F106 |
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

## The per-section edit pass — the checklist (F116)

The validator enforces what is mechanical so that a person's pass can spend its minutes on meaning. Every
content packet runs this list once per section, after staging and before `publish-section.mjs --confirm`,
and records "checklist done" in its PROGRESS.md row. It is short on purpose; Layer 7 says why longer lists
are theatre.

1. **Every recall prompt names its criterion.** Not "put these in the right order" but the direction or the
   named sequence ("from launch to maturity", "the recruitment process"). `reorder.criterion` catches the
   wording; read the items and ask whether a student who was taught this could reconstruct the order for
   the reason the prompt gives.
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
6. **The section's baseline shrank.** `node audit/scripts/validate-content.mjs --section <id>` before and
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
   second reading survives, the item becomes a different exercise type — the chain-build with
   distractor links, or classify — rather than being reworded. Packet 7 provides those types.

**And regardless of either rule:** a wrong answer must say *why* that order is right. Today it
returns "0 of 4 in the right position" and the correct list, with no reasoning, which is the moment
the founder describes as the platform's authority dropping to zero. That is packet 7's `why` field,
and it is what makes a defensible-but-hard order survivable instead of infuriating.

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
