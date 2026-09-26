# Packet 53 brief — influences-business-decisions (IAL Business 3.3.4)

**No results in this document.** Everything below is either (a) a quote from a source file, (b) a count
produced by a named command or script, or (c) a CLAIM from the ledger flagged for the builder to check.
Nothing here is a build outcome, a verifier verdict, or a "confirmed" statement.

Commands run to produce this brief (all read-only, nothing staged or committed):
```
node audit/scripts/ledger.mjs packet 53            → audit/runs/packet-53/ledger-packet-53.txt
node audit/scripts/ledger.mjs packet 53 --open     → audit/runs/packet-53/ledger-packet-53-open.txt
node audit/scripts/ledger.mjs show <id>  (× 26)    → audit/runs/packet-53/show-all.txt
python3 -c '...json.load(audit/raw/spec-items.json)...'
python3 -c '...json.load(audit/raw/spec-coverage.json)...'
python3 -c '...json.load(audit/content-sections/business__influences-business-decisions.json)...'
grep -n "short-termis\|long-termis\|evidence-based\|subjective\|intuitive" audit/raw/bus_spec.txt   → 0 hits
grep -n -i "Handy\|Mendelow\|Friedman\|Freeman\|Carroll\|animal" audit/raw/bus_spec.txt              → 0 hits
```

## 0. Handoff-document check (Rule: STOP if they disagree)

- `audit/NEXT.md` has **no `## Packet 53 spec` heading** — grepped `^## Packet 53` and `^## .*53`, no
  match. The newest "Handoff" in that file (packet 47, ~11053) names packet 48 as "the next genuinely
  free-to-build packet" and lists 49, 50, 51 as "behind 48 in traffic order"; it does not mention 53 at
  all. `audit/PROGRESS.md`'s traffic table (line 106) independently confirms packet 53 = `influences-
  business-decisions`, traffic count **7** — the *lowest* of the eleven rows shown (41–53) — so on the
  programme's own ordering this section would normally be built after 48–52, not before them.
- **This is not treated as a contradiction requiring escalation**: the missing spec-block gap is the same
  one packets 41/43/44/45/46/47 each hit and NEXT.md's own text calls it "normalized" rather than a
  blocker, and being low in traffic order is an ordering fact, not a disagreement between documents — the
  ledger, `spec-coverage.json` and `PROGRESS.md` all agree on the same section/number for packet 53. Named
  here per the instruction to say so, not escalated as `ok:false`.
- **Live concurrency, Rule 5.** `audit/runs/packet-48`, `packet-50`, `packet-51`, `packet-52` all exist,
  untracked, with mtimes of 11:46–12:11 today (26 Sep) — i.e. created within the same window as this run.
  `app/business/page.js` and `app/business/unit-4/page.js` are modified and unstaged in the working tree
  right now. **Another session (or several) is very likely active in this worktree on adjacent packets at
  this moment.** Nothing here touches those files or those run directories; only `audit/runs/packet-53/`
  was written.
- `PROTOCOL.md`, `DECISIONS.md`'s Settled list and `CONTENT-GATE.md` do not contradict each other or the
  ledger for this packet.

## 1. Spec span in scope (quoted verbatim, `audit/raw/bus_spec.txt:1184-1211`)

```
3.3.4 Influences on business decisions

1 Corporate culture   a) Strong and weak cultures.
                      b) Classification of company cultures:
                         •     power
                         •     role
                         •     task
                         •     person.
                      c) How corporate culture is formed.
                      d) Difficulties in changing an established culture.
2 Stakeholder         a) Internal and external stakeholders.
  model versus
                      b) Stakeholder objectives.
  shareholder
  model               c) Stakeholder and shareholder influences:
                         • stakeholder: that the business considers all of its stakeholders
                           in its business decisions/objectives
                         • shareholder: that the business should focus purely on
                           shareholder returns (increasing share price and dividends) in
                           its business decisions/objectives.
                      d) The potential for conflict between profit-based (shareholder) and
                         wider objectives (stakeholder).
3 Business ethics     a) Ethics of strategic decisions: trade-offs between profit
                         and ethics.
                      b) Pay and rewards.
                      c) Corporate social responsibility (CSR).
```

That is the **whole** of 3.3.4 — three subtopics, 3+4+3 lettered points (17 rows once `b`'s four culture
types and `c`'s two definitions are exploded into their own leaves — counted directly from
`audit/raw/spec-items.json`, filtering `topic == "3.3.4"` and `subject` implicit in the `BUS-` id prefix:
15 `"kind":"leaf"` rows + 2 `"kind":"requirement"` parent rows = 17). **Nowhere in `bus_spec.txt` do the
strings "short-termis", "long-termis", "evidence-based", "subjective" or "intuitive" appear, and nowhere
do "Handy", "Mendelow", "Friedman", "Freeman", "Carroll" or "animal" appear** (each grepped above, 0 hits).
The theorist names the live content uses are not spec vocabulary; they are the conventional textbook labels
for what the spec asks for anonymously (culture types; the shareholder/stakeholder split).

`audit/raw/spec-coverage.json`'s row for this section (`business__influences-business-decisions`, number
`3.3.4`, read directly, not summarised):
```
covered: 13, thin: 2, missing: 1
missingItems: ["2a) Internal and external stakeholders (the distinction, and which groups fall in each)"]
thinItems:    ["1c) How corporate culture is formed", "3b) Pay and rewards"]
headline: "Culture types, the Friedman/Freeman debate, ethics and CSR are taught well, but the
  internal/external stakeholder distinction is taught nowhere in the notes ... and 'how culture is
  formed' and 'pay and rewards' are each a single passing clause"
```
Its covered+thin+missing = 16, one short of the 17-row count above; not reconciled here (different
granularity, same class of gap Layer 3 documents in `CONTENT-GATE.md`: "the 19 points between them are
the reading the content packets do") — flagged, not resolved.

Current live/staged bundle `audit/content-sections/business__influences-business-decisions.json`
(`meta.number` already correctly tagged `"3.3.4"` — the DB row is not the thing mistagged, only 15 of the
26 ledger items' own **text** cites the wrong 3.4.x number): 2 blocks / 4 subsections / **0 reorder / 0
fillin / 0 diagrams**, quiz 9, practice 5, flashcards 18, both blocks carry `quizIndices: null` and
`practiceIndices: null`.

## 2. The ledger's 26 open ids

`node audit/scripts/ledger.mjs packet 53` and `... --open` both return the same **26 items, all `status:
open`, 0 `claimed`, 0 `wont-fix`, 0 confirmed** — nothing in this packet has been touched yet. 15 of the 26
already carry a ledger `note` (dated 13 Sep 2026) saying their own cited number (3.4.1/3.4.2/3.4.3/3.4.4) is
UK-GCE and the real IAL topic is 3.3.4 — so the numbering trap is already flagged on the item; what is
**not** flagged on any item is whether the *wording* attached to that wrong number is itself in-spec. That
check is what follows.

### topFix (5) — the priority fixes

| id | claims | spec check | what "done" means |
|---|---|---|---|
| **topFix-01** | Add a 3rd block "Corporate influences" teaching short-termism vs long-termism and evidence-based vs subjective decision-making, "so spec 3.4.1 is covered" | **No such spec point exists.** 3.3.4 has exactly 3 subtopics (culture / stakeholder-shareholder / ethics); none mentions timescales or decision style. This is UK-GCE A-level Business content (that spec does carry a distinct "3.4.1 Corporate influences" topic), not IAL. | Per the packet-33 precedent (`DECISIONS.md`, 18 Sep — "an audit can ask you to DEEPEN the off-spec content, not merely leave it," the third form of the wrong-oracle rule): the *structural* ask (a 3rd/4th block, more steps) is legitimate and matches `structure-01`'s independent complaint about only 2 steps — but the *content* must come from 3.3.4 itself, not from short-termism. Done = 3–4 blocks that map onto culture / stakeholder-shareholder / ethics+CSR (splitting the two currently-merged pairs), not a new invented subtopic. |
| **topFix-02** | Add internal/external stakeholders + objectives + a concrete decision-level conflict to `stakeholder-analysis`; rewrite its `examMatters` off "draw the 2×2 grid" | Matches spec **2a** (missing per `spec-coverage.json`) and **2b**/**2d** (present only in flashcards/quiz today, confirmed by reading the live body: `stakeholder-analysis.body` never uses the words "internal" or "external"). The `examMatters` claim ("Draw the grid... Examiners reward application") is an uncited "what examiners reward" sentence — `CONTENT-GATE.md`'s `claim.uncited` BLOCK rule applies directly. | Body teaches 2a/2b in the spec's own words; `examMatters` rewritten to not assert an uncited examiner reward, and to describe what the mark scheme actually credits (stakeholder identification in context, conflict with the profit objective, justified priority) per Layer 1's "any sentence asserting what examiners reward must carry a citation." |
| **topFix-03** | Add fillin recalls (Handy type↔feature; Mendelow quadrant↔strategy; Friedman/Freeman) + a Mendelow diagram + a Handy diagram | Confirmed structurally: `meta.reorder=0`, `meta.fillin=0`, `meta.diagrams=0` (read directly from the bundle). Naming Handy/Mendelow/Friedman/Freeman as recall labels is fine under the settled rule (`DECISIONS.md`, "packet 13/16... where the specification supplies no vocabulary for a leaf, teach the mechanism in the specification's own words, and name the standard term as an aside only"): they are asides that help retrieval, not spec-required labels, and `specGap-09` (below) is the item that already flags this distinction. | ≥1 recall (fillin or match, per the recall contract's 4 types in `CONTENT-GATE.md`) per subsection, each with a `why`; ≥1 diagram per chapter pinned by `diagramId` — no existing diagram asset for either topic was found under `public/diagrams` or elsewhere in the tree, so both would need authoring, not reuse. |
| **topFix-04** | Restructure to 3–4 blocks/4+ steps; split culture from stakeholders; merge Ethics/CSR's duplicated for/against lists; use the freed space for "pay & rewards, environmental/animal welfare, and a worked evaluation paragraph" | Confirmed duplication: `business-ethics.body[2]` ("brand loyalty, attracts talent, reduces regulatory risk... competitive disadvantage") and `corporate-social-responsibility.body[1]/[2]` restate the same four points almost verbatim — read directly, both quoted in `show-all.txt`'s surrounding context is not needed, the two body arrays were read in full. "Pay & rewards" = spec **3b** (thin). **"Environmental/animal welfare" is not spec-04's finding to make** — see `specGap-08` below, same off-spec class as topFix-01. | Same block reshape as topFix-01/structure-01/02; the freed space goes to 1c/3b (both genuinely thin) and a worked evaluation paragraph (per the per-section checklist item 6 / structure-07), not to an animal-welfare bullet that isn't in this spec. |
| **topFix-05** | Replace quiz Q8 ("3-5 years") with "a Mendelow/short-termism question"; anchor practice Q3/Q5 stems to context; drop "Carroll's CSR pyramid" from Q5 guidance | Q8 (0-indexed `quiz[7]`, "How long do experts estimate genuine cultural change takes? ... 3-5 years or more") read directly — the "3-5 years" figure exists only in flashcard 6, sourced to nothing ("experts"), confirming `quiz-01` below. "Carroll's CSR pyramid" is read verbatim in `practice[4].guidance` (Q5) — confirmed, and Carroll is 0 hits in `bus_spec.txt`, so this is a genuine off-spec-framework removal, the same class packet 13 removed 8 of. | Q8 replaced with a question on **1d** (difficulties changing culture) or a Mendelow-quadrant-strategy question — **not** "or short-termism" as the item's own text suggests, since short-termism is off-spec (see topFix-01). Carroll's pyramid deleted from Q5 guidance, guidance's Friedman framing kept (Friedman is already taught, on-spec-adjacent per **2c**). Practice 3 and 5 stems anchored to their given contexts. |

### accuracy (2), quiz (1), practice (1)

- **accuracy-01** — `stakeholder-analysis.examMatters` literally reads "Draw the 2x2 grid, place specific
  stakeholders in quadrants... Examiners reward application to the case study" (read verbatim from the
  bundle). Mendelow is not spec vocabulary (confirmed, §1). **Done**: rewrite to describe what 3.3.4's own
  2a–2d actually reward, without the uncited "examiners reward" framing (`claim.uncited`).
- **accuracy-02** — confirmed: `stakeholder-analysis.body` has no "internal"/"external" split; that split
  exists only in flashcards 9–10 and is tested cold in quiz q5 (0-indexed `quiz[4]`, "Which of the following
  is an EXTERNAL stakeholder?"). Same underlying gap as spec 2a / topFix-02. **Done**: taught in body before
  it is tested; the shareholder-classification-is-contested point is the item's second half and is a
  content-accuracy judgement call for whoever writes the body, not independently verifiable from the spec.
- **quiz-01** — confirmed (see topFix-05). q8's distractor "It happens immediately with new leadership" is
  the item's own plausibility judgement, not independently checkable here.
- **practice-01** — `practice[2]` ("Assess the extent to which short-termism... damages long-term business
  performance", 10 marks) read verbatim, matches exactly. Its own framing ("spec 3.4.1") is the off-spec
  claim from topFix-01/specGap-01/02. **Done, per the packet-33 DEEPEN precedent**: this is a case for
  **replacing the question's content**, not teaching short-termism to match it — e.g. an Assess question on
  stakeholder-vs-shareholder conflict or the ethics/profit trade-off (both genuinely 3.3.4). The item's
  other complaint (generic stem, not anchored to "the manufacturing company") is independent of the
  spec issue and applies whichever question ends up here.

### structure (8) — all independently confirmed by reading `meta` and the block/section objects directly

1. **structure-01** — `meta.blocks=2`, `meta.subsections=4`, 2 subsections per block: confirmed, this is a
   literal field read, not an inference.
2. **structure-02** — confirmed (culture+stakeholder in block 1 are two different 3.3.4 subtopics; ethics+CSR
   in block 2 have the near-duplicate for/against text, see topFix-04).
3. **structure-03** — confirmed: `meta.reorder=0`, `meta.fillin=0`.
4. **structure-04** — confirmed: `meta.diagrams=0`, while `stakeholder-analysis.examMatters` tells the
   student to draw a grid Learn Mode never renders.
5. **structure-05** — confirmed: both blocks' `quizIndices`/`practiceIndices` are `null` in the raw JSON.
6. **structure-06** — partially confirmed by direct read: `corporate-culture`'s own `misconception` field is
   about switching culture overnight, not "strong culture is always good" (that one lives only in
   `common_mistakes[1]`'s title, "Confusing Strong Culture with Good Culture"). Whether it is also absent
   from `notes[0]` needs a read of the full notes block-item list, which was only partially sampled here —
   named as a partial check, not a full one.
7. **structure-07** — confirmed qualitatively: every `examMatters` field says evaluation is wanted ("argue
   both sides") but no body paragraph models a worked judgement ("it depends on...") — a reading judgement,
   not a mechanical count.
8. **structure-08** — confirmed: block 2's `takeaway` array is `["Ethics is about what a firm should do...",
   "CSR is a voluntary strategic commitment...", "Friedman vs Freeman: profit-only vs stakeholder
   balance..."]` — no line states the profit/ethics trade-off as its own point (takeaway[0] is close but
   frames it as "where reputational risk sits", not as a trade-off to weigh).

### specGap (9) — the block the task brief says to treat as CHECK candidates, not a to-do list

| id | claims | verdict |
|---|---|---|
| **specGap-01** | 3.4.1(a) short-termism vs long-termism, "entirely absent" | **Off-spec claim** — same as topFix-01: no such spec point in `bus_spec.txt`. Nothing to add; see topFix-01/practice-01 for what replaces the intent. |
| **specGap-02** | 3.4.1(b) evidence-based vs subjective decision-making, absent | **Off-spec claim**, same reasoning. |
| **specGap-03** | 3.4.2(c) how culture is formed, not taught | **Confirmed, real gap** = spec 1c, listed `thin` in `spec-coverage.json`; body has zero mention of founder/leadership/history/sector/national-culture/reward-systems as sources of culture. |
| **specGap-04** | 3.4.2(d) difficulties changing culture, "only one sentence in the misconception" | **Confirmed, real, but a finer read than spec-coverage.json's**: `spec-coverage.json` does not list 1d as thin or missing at all (it is inside the "13 covered"); this ledger item disagrees with that tool's verdict on the same leaf. Read directly: 1d is addressed only inside `corporate-culture.misconception` ("takes years to shift... requires sustained leadership effort"), never in `body`. Worth the builder's own judgement call on whether that one sentence is "covered" or "thin" — the two automated sources disagree. |
| **specGap-05** | 2a/2b not in body, only flashcards/quiz | **Confirmed**, = topFix-02/accuracy-02/spec-coverage's `missingItems`. |
| **specGap-06** | 2c/2d treated abstractly via Friedman/Freeman, no concrete decision-level conflict worked through | **Plausible, not spec-refuted** (2c/2d are in-spec), but note the tension with `spec-coverage.json`'s headline calling "the Friedman/Freeman debate... taught well" — the two sources disagree on depth, not on whether the topic belongs. A reading judgement, not a mechanical check. |
| **specGap-07** | 3b pay & rewards, "only a flashcard" | **Confirmed** = spec-coverage's `thinItems` 3b; body has no mention of pay/rewards/executive pay at all (only flashcard 16). |
| **specGap-08** | 3.4.4(b) "environmental considerations and animal welfare" | **Off-spec claim.** Business ethics in 3.3.4 has exactly 3 leaves (3a trade-offs, 3b pay, 3c CSR) — no separate environmental/animal-welfare bullet. "Animal welfare" is 0 hits in `bus_spec.txt`; this reads as the UK-GCE Business ethics topic, which does carry a distinct environmental/animal-welfare clause. Environmental content that exists (CSR's "environmental sustainability") already sits inside 3c, which is not flagged as thin or missing by any source. Nothing to add here. |
| **specGap-09** | "Unsure whether spec explicitly names Mendelow... I believe it does not; it names Handy" | **Confirmed accurate on both counts** — 0 hits for "Mendelow" or "Handy" anywhere in `bus_spec.txt`; spec 1b lists the four culture types with no attribution at all. This item's own uncertainty is resolved: correct as stated. |

## 3. Findings outside the 26 ledger ids, surfaced by reading the bundle directly for this brief

Per Rule 4 ("read every other field of the same entry"), reading the fields the ledger items pointed at
surfaced two things none of the 26 ids name:

- **All 5 practice items' `guidance` strings contain zero `\n` characters** (counted directly: `len(g.split
  (chr(10)))` = 1 for every one of `practice[0..4]`). `InlinePractice.jsx` shows `guidance.split('\n')[0]`
  in guided mode per `CONTENT-GATE.md`'s per-section checklist item 6 — with no line break, that first
  segment is the ENTIRE mark scheme, including Q5's Carroll/Friedman arguments and Q3's short-termism
  "reduced R&D... cutting training... cycle of decline" case, shown before the student writes anything. This
  is the `practice.opening` shape the checklist and [[revvylearn_practice_opening]] memory describe; a fix
  to this section should split every `guidance` into a no-figures/no-answer scaffold paragraph followed by
  the mark scheme, not just the content changes the 26 ids ask for.
- **Quiz bank is 9 items**, well short of the packet-14 template's "≥20 quiz items" guidance
  (`DECISIONS.md`, 14 Sep). `correctIndex` distribution, read directly: `[1,2,2,2,3,1,0,2,2]` → index 2 is
  the answer on 5 of 9 (56%), which would trip `quiz.histogram`'s >40%-bucket DEBT rule once the bank is
  large enough to run it meaningfully. Not one of the 26 ids, but relevant to what "done" means for a
  rebuild of this size.

## 4. What "done" means overall, for whoever builds this packet

Synthesised from `CONTENT-GATE.md`'s per-section checklist, the packet-14 template settled in `DECISIONS.md`,
and the packet-33 "deepen, don't just delete" precedent for off-spec claims — not itself a claim about this
section's current state:

- 3–4 blocks covering the three real 3.3.4 subtopics (culture / stakeholder-shareholder model / ethics+CSR),
  not the invented "Corporate influences" topic 5 of the 26 ids point at.
- Spec 1c, 1d, 2a, 3b taught in body text, not only in flashcards/quiz/misconceptions.
- ≥1 recall per subsection (fillin/match/classify per the recall contract), each with a `why`; at least one
  diagram per chapter, pinned by `diagramId`; `quizIndices`/`practiceIndices` set per block.
- `examMatters` claims about what "examiners reward" carry a citation or are rewritten to drop the claim.
- Off-spec framework names (Carroll) removed; on-spec-adjacent aside names (Handy, Mendelow, Friedman,
  Freeman) kept as asides, never presented as scored structure.
- Every practice `guidance` split into a scaffold paragraph (no marks, no figures, no answer) then the mark
  scheme, per `practice.opening`.
- Quiz bank grown toward ~20 with correct-answer position spread checked.
- Staged via `stageSection()`/`stageBundle()` to `draft` only — **this session did not stage, publish,
  restore, or write anything live**, per Rule 6.
