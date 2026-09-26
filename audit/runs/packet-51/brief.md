# Packet 51 brief — `poverty-inequality`, IAL Economics 4.3.4

Brief only. No content authored, no source file changed, no build/test/verify run. Everything below is
either a verbatim quotation, a ledger item's own claim (marked as a CLAIM), or a count produced by reading
a file or running a script (command shown). Nothing here is a measurement of whether a fix works — that is
Build/Gate/Verify A/Verify B's job, after this packet is scoped.

Commands run to produce this brief:
```
node audit/scripts/ledger.mjs packet 51        > audit/runs/packet-51/ledger-packet-51.txt
node audit/scripts/ledger.mjs packet 51 --open > audit/runs/packet-51/ledger-packet-51-open.txt
node audit/scripts/ledger.mjs show <id>          (23x)  > audit/runs/packet-51/ledger-show-all.txt
```
`diff` of the two ledger listings above is empty — all 23 ids are `open`, 0 `claimed`, 0 `confirmed`, 0
`wont-fix`. This packet has not been touched before.

---

## 1. Read-first contradictions / gaps found in the required documents

**a. No `## Packet 51 spec` block exists in `audit/NEXT.md`.** `grep -ni "packet 51" audit/NEXT.md` (run
against the current working copy) returns zero hits except the one line quoted in (b) below. Every other
content packet in this file (14, 15, ... 42, 47, 48) has its own `## Packet <n> spec` heading; 51 does not.
This is not itself a contradiction — it is consistent with `PROGRESS.md` row 51 reading "not started" — but
it means there is no prior scope to reconcile against; this brief is the first one.

**b. The newest material in `audit/NEXT.md` (its final paragraphs, currently uncommitted — see `git diff
--stat` on `audit/NEXT.md`, +92 lines not yet committed) explicitly recommends a different next packet.**
Verbatim: *"Packet 48 (government-intervention-firms) is the next genuinely free-to-build packet ... Packets
49-51 (`business-growth`, `managing-change`, `poverty-inequality`) are untouched and behind 48 in traffic
order."* This does not contradict any fact about packet 51 itself (ledger and PROGRESS agree 51 is untouched,
23 open items), but it is a direct, current statement that the programme's own traffic-order convention
(`PROGRESS.md` §"Content — one section per packet, traffic order") would build 48, 49 and 50 before 51.
Working packet 51 now is out of that order. **Escalating this** — it is a sequencing call for whoever
scheduled this workflow run, not something this Brief should silently resolve either way.

**c. `audit/PROGRESS.md`, `audit/NEXT.md`, `audit/DECISIONS.md` and `audit/ledger.json` all have substantial
uncommitted local changes right now** (`git status --short`: all four `M`, `git diff --stat`: ledger.json
460 lines, NEXT.md +92, PROGRESS.md 22, DECISIONS.md 2 whitespace-only). Checked specifically: the
uncommitted diffs to `ledger.json` and `PROGRESS.md` contain **zero** occurrences of `poverty-inequality`
(`git diff -- audit/ledger.json | grep -c poverty-inequality` → 0; same check on the PROGRESS.md diff, and
on its row for `| 51 |`, found no change). So packet 51's own data is stable and matches what a fresh `git
show HEAD:...` would give; the uncommitted activity in the shared worktree is about other packets (12.75/47/48
bookkeeping, from the NEXT.md content itself) and does not touch this packet's scope. Named per rule 5
(another session may be in this worktree) — not treated as a blocker, but noted in case it changes under a
later reader.

**d. No entries for `poverty-inequality` or "packet 51" anywhere in `audit/DECISIONS.md`'s Settled list.**
The only DECISIONS.md line naming this section at all is incidental (2026-09-25, packet 2.91, about which of
two diagrams a chapter shows): *"the Lorenz curve over absolute/relative poverty [diagram]. Both were right:
the other diagram was otherwise shown nowhere in Learn Mode."* Relevant to topFix-04 below (diagram
placement), not a scope decision for this packet.

**e. PROGRESS.md row 51** (`| 51 | poverty-inequality | 8 | not started | | | |`, table header
`| # | Section | Opens | Status | Commit | Snapshot | Validator |`) — `8` is **Opens** (traffic count from
`audit/raw/funnel_aggregates.json`, per the table's own preamble note), **not an item count**; do not compare
it to the ledger's 23. No conflict with the ledger; flagged only because this exact confusion is on record as
a prior failure mode (memory: "PROGRESS `Opens` is traffic, not an item count").

No conflict found between `audit/PROTOCOL.md`, `audit/CONTENT-GATE.md` and the ledger content itself — those
three agree with each other on process. The item in (b) is the one I am escalating as a founder-level
sequencing question; everything else below proceeds on the assumption this session is meant to produce the
work list for 51 regardless.

---

## 2. Verbatim specification in scope

`audit/raw/econ_spec.txt:1788-1817` (Pearson Edexcel IAL Economics, Issue 2, June 2018), quoted in full:

```
4.3.4 Poverty and inequality

What students need to learn:

 1 Poverty                     a) The distinction between absolute and relative poverty.
                               b) Measures of absolute and relative poverty.
                               c) Causes of changes in absolute and relative poverty:
                                  •   economic growth
                                  •   education and training
                                  •   welfare benefits
                                  •   changes in tax structure
                                  •   structural changes in the economy
                                  •   aid
                                  •   civil wars and conflict.
 2 Inequality                  a) The distinction between wealth inequality and income inequality.
                               b) Measurements of inequality:
                                  • the Lorenz curve
                                  • the Gini coefficient.
                               c) Causes of inequality in income and wealth within countries and
                                  between countries.
                               d) The impact of inequality on:
                                  •   enterprise
                                  •   incentives
                                  •   savings
                                  •   education
                                  •   migration
                                  •   life expectancy.
                               e) The impact of economic change and development on inequality.
                               f) The significance of the free market economy (capitalism) for
                                  inequality.
```

**This is the entire spec point.** There is no bullet anywhere in 4.3.4 naming the headcount ratio, the
poverty gap, the Multidimensional Poverty Index, income share ratios, the Palma ratio, the Kuznets curve by
name, or any numeric poverty line. Those are legitimate ways to *teach* 1b/2b/2e, not separate spec
requirements — see specGap-02 and specGap-07 below, where this matters.

**Oracle leaf count**, from `audit/raw/spec-items.json` (`grep -c '"topic": "4.3.4"' ... ` filtered to
`"kind": "leaf"`): **21 leaf items** — 1a(1), 1b(1), 1c-1..1c-7(7: economic growth / education and training /
welfare benefits / changes in tax structure / structural changes in the economy / aid / civil wars and
conflict), 2a(1), 2b-1..2b-2(2: Lorenz curve, Gini coefficient), 2c(1), 2d-1..2d-6(6: enterprise / incentives
/ savings / education / migration / life expectancy), 2e(1), 2f(1). **Count note:** `audit/raw/spec-coverage.json`'s
entry for this section reports `covered:13, thin:6, missing:3` = **22**, one more than the 21 leaves counted
directly from `spec-items.json`. Not resolved here — flagging the discrepancy rather than picking a number,
per the instruction to show a count rather than assert one.

---

## 3. `audit/raw/spec-coverage.json` entry — candidates to check, not a to-do list

Full entry (`key: "economics__poverty-inequality"`, `number: "4.3.4"`, `covered: 13, thin: 6, missing: 3`):

> "Strong on definitions, measurement and causes of inequality, but four spec bullets are absent from the
> teaching content entirely (structural change, aid, civil wars/conflict as causes of poverty change;
> migration as an impact of inequality) and five more are thin." *(Note: the headline text says "four... absent"
> but the itemised `missingItems` array below has three, and structural change is itemised as `thin` not
> `missing`. The file's own methodology section says this can happen — "the narrative paragraph... sometimes
> names more gaps than the verified list beneath it... Where they disagree, the itemised list is right and
> the paragraph is stale." Treating the itemised arrays as authoritative below, per that rule.)*

**`missingItems`** (checked against §2 above — all three are verbatim spec sub-bullets, none invented):
- "1c) Cause of changes in poverty: aid" — spec 1c lists "aid" (`ECON-4.3.4-1c-6`). Matches.
- "1c) Cause of changes in poverty: civil wars and conflict" — spec 1c lists "civil wars and conflict"
  (`ECON-4.3.4-1c-7`). Matches.
- "2d) The impact of inequality on migration" — spec 2d lists "migration" (`ECON-4.3.4-2d-5`). Matches.

**`thinItems`** (same check):
- "1c) ...education and training" — matches `ECON-4.3.4-1c-2`.
- "1c) ...structural changes in the economy" — matches `ECON-4.3.4-1c-5`. (This is also
  `C-poverty-inequality-specThin-01` in the ledger already — same requirement, two sources.)
- "2a) The distinction between wealth inequality and income inequality." — matches `ECON-4.3.4-2a`.
- "2c) Causes of inequality in income and wealth BETWEEN countries." — the spec bullet (`ECON-4.3.4-2c`) is
  a single combined leaf, "within countries **and** between countries"; the audit is scoring only the
  "between" half as thin, which is a legitimate finer split of one spec leaf, not an invented requirement.
- "2d) ...savings" — matches `ECON-4.3.4-2d-3`.
- "2d) ...life expectancy" — matches `ECON-4.3.4-2d-6`.

None of these nine spec-coverage.json claims looks overturnable against the spec text itself — all cite real
bullets. (That check does not extend to whether the *content* actually teaches them; only Build/Verify can
say that.)

---

## 4. The 23 ledger ids — scope check, spec citation, and what "done" means

All ids: `packet: 51`, `section: poverty-inequality`, `status: open` (none claimed/confirmed/wont-fix).
Full text of each is in `audit/runs/packet-51/ledger-show-all.txt`; only the scope/spec/done analysis is new
here.

### topFix (rank 0–4 — the five highest-priority items)

**`C-poverty-inequality-topFix-01`** — add body subsections for the untaught spec bullets (income vs wealth
inequality; measures/causes of poverty incl. headcount/poverty gap/MPI; inequality between countries;
Kuznets/impact of development; capitalism and inequality).
- *Spec check:* covers real leaves — 2a, 1b (generically; headcount/poverty gap/MPI are teaching detail, not
  named in the spec — see specGap-02 note below), 1c-causes, 2c-between, 2e, 2f.
- *Done means:* each of those leaves has body-level teaching (not just a diagram, quiz option, flashcard or
  `extras` entry — `structure-03` below is the reason that bar exists), sourced per Layer 4 of
  `CONTENT-GATE.md` where a real-world figure or entity is named.

**`C-poverty-inequality-topFix-02`** — fix relative-poverty/inequality conflation in `absolute-relative-poverty`
(`body[1]`, `body[2]`, `flow`, `realExample` "relative inequality", `takeaway[1]`) so it agrees with the
section's own `common_mistakes[0]`.
- *Spec check:* not a spec-coverage question — this is Layer 5 territory (`CONTENT-GATE.md`: "a section
  disagreeing with itself"). The spec does not define "relative poverty" or "inequality" itself (that is
  standard economics vocabulary the notes must use correctly), so there is nothing to quote from
  `econ_spec.txt` here; the internal-consistency claim (body contradicts the section's own misconception
  note) is checkable by reading those five fields together, which the item already names.
- *Done means:* `body[1]`, `body[2]`, `flow`, `realExample`, `takeaway[1]` all say relative poverty depends on
  the bottom/median of the distribution, not simply "the Gini rose"; and this reading is consistent with
  whatever `common_mistakes[0]` says (read both, per rule 4 — fixing the body without re-reading the
  misconception note is exactly the failure mode rule 4 exists for).

**`C-poverty-inequality-topFix-03`** — rewrite MCQ distractors (claim: correct option is the longest in 8 of
10 MCQs), fix `quiz[3]`/`quiz[9]` absurd distractors, remove the "within a country" giveaway in `quiz[7]`,
correct `quiz[1]`'s explanation.
- *Spec check:* not spec-scoped; this is `CONTENT-GATE.md` Layer 1b (answer-length/option-quality) plus
  `C-poverty-inequality-quiz-01` below (same underlying claim, different id/kind — same evidence should close
  or reject both together).
- *Done means:* a fresh option-length and giveaway-word check on the rewritten bank (measured independently
  of whichever pass wrote the fix — this is exactly what "verify independently" in memory means, and it is a
  Verify A/Gate job, not this brief's).

**`C-poverty-inequality-topFix-04`** — add recall widgets (reorder on the Lorenz→Gini procedure from
`notes[1].flow`; fillins on the Gini formula/endpoints and the two poverty definitions) and diagram hooks
(`diagramRef: 'Lorenz'` on `content[0]`, `'Kuznets'` on `content[1]`).
- *Spec check:* recall mechanics are a `CONTENT-GATE.md` requirement (the recall contract), not a spec
  requirement; the diagrams named (Lorenz curve — spec 2b; Kuznets — spec 2e, by convention, not by name) are
  in-spec content.
- *Cross-reference found:* `DECISIONS.md` (2026-09-25, packet 2.91) already ran the check-in **diagram**
  decision process for this section and recorded: *"poverty-inequality ch1 [gets the] Lorenz [curve]"* —
  chosen over the section's own "Absolute vs Relative Poverty" diagram because that diagram "was otherwise
  shown nowhere in Learn Mode." That is a placement decision for the **check-in** slot specifically
  (`checkin-attribution`/`diagramId`), a different field from the `diagramRef` this item asks to set on the
  content block itself (`InlineDiagram` matches by `diagramRef` substring, per the item's own text). The two
  are not necessarily the same mechanism — confirm which field(s) actually control what a student sees before
  writing to either, rather than assuming they are interchangeable.
- *Also applies:* `CONTENT-GATE.md`'s check-in answer rule (26 Sep 2026, BLOCKING) — if a new reorder/fillin
  sits at a check-in alongside a diagram (Lorenz curve, per the packet-2.91 decision above), the recall's
  answer must not be stated by the diagram's caption/checklist/labels. This is a real risk here specifically
  because the reorder this item proposes IS the Lorenz→Gini procedure and the diagram IS the Lorenz curve.
- *Done means:* `reorder.criterion`/`why`, `fillin.hints`/`distractors` all present per the recall contract
  table in `CONTENT-GATE.md`; `diagramRef` resolves (validator's wiring check); and, if the recall lands at a
  check-in with the Lorenz diagram, Verify A's leak check (diagram text vs. quiz/recall answer) is clean.

**`C-poverty-inequality-topFix-05`** — poverty line to "$3.00/day (2021 PPP, June 2025)" (claims $2.15 "2022
PPP" is mislabelled and superseded), fix a "US 91%→70% top-rate" claim, recast `practice[2]`/`[3]` guidance as
IAL levels-based marking, replace "Define the difference" and "Outline" command words.
- *Spec check (command words):* `lib/ial-marking.js` lists Economics' valid command words as `Define,
  Calculate, Draw, Explain, Analyse, Examine, Discuss` (tariffs 2 / 2,4 / 4 / 4 / 6 / 8 / 14) and explicitly
  lists `absent: ['Assess', 'Outline']`. **"Outline" is confirmed non-IAL for Economics by this file.**
  "Define" itself IS valid — "Define the difference between X and Y" is Define used with extra wording, not
  a different command word; whether that specific phrasing is a real defect (vs. just verbose Define) is not
  resolvable from this brief and should be checked against the actual practice item, not assumed.
- *Real-world figures ($3.00/day 2021 PPP; 91%→70% top tax rate):* not IAL-spec content at all — these are
  factual/statistical claims about the world, not spec bullets, so `econ_spec.txt` has nothing to confirm or
  refute them against. `CONTENT-GATE.md` Layer 4 governs them instead: *"Any example naming a real entity and
  a year or a figure must carry a source the reviewer can check ... Uncorroborated means deleted, not
  flagged."* Treat both figures as needing a checkable source before they are written, not as pre-verified by
  this brief.
- *Done means:* command words used are all in `lib/ial-marking.js`'s Economics list; any real-world figure
  carries a checkable source (Layer 4); `practice[2]`/`[3]` guidance's first paragraph is scaffold-only, no
  mark scheme or figure, per `CONTENT-GATE.md` checklist item 6 (`practice.opening`).

### accuracy

**`C-poverty-inequality-accuracy-01`** — the $2.15/day figure (labelled "2022 PPP") is claimed wrong on two
counts (wrong base year; superseded by a $3.00/day 2021-PPP line since June 2025), across `content[0]`,
`diagrams[1]` label, `practice[0].guidance`, `notes[0]`, `flashcards[0]`.
- *Spec check:* n/a (not a spec bullet; a factual/statistical claim — Layer 4 applies, as in topFix-05).
- *Done means:* whichever figure is used is consistent across all five named fields (rule 4: fix the field
  you were shown, then its twins) and sourced per Layer 4.

**`C-poverty-inequality-accuracy-02`** — relative poverty treated as a synonym for inequality across
`content[0] > absolute-relative-poverty > body[1], body[2], flow.steps[3], realExample, takeaway[1]`; claims
the section's own `common_mistakes[0]` already names this exact error.
- Same underlying defect as `topFix-02` (same fields, near-identical wording) — these two ids should be
  fixed and closed together, not independently, or one will silently re-open the other.

### quiz

**`C-poverty-inequality-quiz-01`** — answer-length cue: correct option is the longest in 8 of 10 MCQs
(indices 0,1,2,3,4,6,8,9); PreTest samples 3 of these, so the claim extends to pre/post-test reliability.
- Same underlying defect as `topFix-03`; fix once, verify once, close both ids on the same evidence — see
  the note there re: verifying by direct measurement (option lengths), not by re-reading the diff.

### structure (01–07)

**`structure-01`** — zero recall widgets (`meta.reorder=0, meta.fillin=0`). **Counted directly**:
`audit/content-sections/economics__poverty-inequality.json`'s `meta` block reads
`"reorder":0,"fillin":0` — matches the claim exactly, from the same snapshot file structure-04 below is
counted from (command: `node -e` read of the JSON, shown in §5). Same fix as topFix-04.

**`structure-02`** — neither content block carries `diagramRef`, `quizIndices` or `practiceIndices`.
**Counted directly**: both `content[0]` and `content[1]` in the same file have no `diagramRef`,
`quizIndices` or `practiceIndices` keys at all (only `title`, `sections`, `takeaway`). Matches the claim.

**`structure-03`** — coverage-vs-testing mismatch: `quiz[4]` (Kuznets), `quiz[7]` (between-country causes),
`quiz[8]` (civil war/poverty), `quiz[9]` (capitalism), `practice[3]`, `practice[4]` and 8/18 flashcards test
material the claim says is absent from `content[]` body.
- This is the item that explains why `specGap-05`/`specGap-06` below can look like they contradict
  `spec-coverage.json` (which marks 2e "impact of development" and 2f "capitalism" as fully covered, neither
  missing nor thin) — see the note under those two ids.
- *Done means:* every quiz/practice/flashcard item that examines a concept has that concept taught in
  `content[].sections` body text first, not only in `extras`, a diagram or a flashcard.

**`structure-04`** — only 4 subsections across 2 blocks for an ~8-bullet spec point. **Counted directly**:
`meta.blocks: 2`, `meta.subsections: 4` (block 0 "Types of Poverty" 2 sections, block 1 "Causes and
Consequences" 2 sections) — matches.

**`structure-05`** — misconceptions review: keep `absolute-relative-poverty`'s (real student error); replace
`lorenz-curve-gini`'s ("Gini is a perfect measure" called filler, proposes axis-swap / "0.4 = 40% poor" /
Lorenz-above-diagonal instead, and says the axis error is already named in `common_mistakes[1]`); says
`causes-inequality`'s is ideological not an exam misconception; says `consequences-redistribution`'s is
really an evaluation point. **Counted**: `common_mistakes` array has 3 entries in the snapshot file, but the
item discusses what reads as 4 named misconceptions (`absolute-relative-poverty`, `lorenz-curve-gini`,
`causes-inequality`, `consequences-redistribution`) — worth checking directly which array/field each of
those four names actually lives in (they may not all be `common_mistakes`; some section schemas keep a
per-chapter `misconceptions` field separate from the section-level `common_mistakes`) before rewriting,
since the count doesn't obviously match 3-in, 4-named.
- *Done means:* each surviving misconception is a genuine, exam-relevant student error, not restated
  evaluation content or a truism.

**`structure-06`** — takeaways generally trace to body text; flags Block 2 `takeaway[3]`'s Laffer-curve
mention as thin support (one sentence in the body).
- *Spec check:* the Laffer curve is not named anywhere in 4.3.4's spec text (§2) — it is standard tax-policy
  content that could support 1c "changes in tax structure" or 2f "capitalism", but is not itself required.
  Whether to expand its body support or drop the takeaway is a content-judgement call, not a spec compliance
  question.

**`structure-07`** — `examMatters` fields are good/IAL-consistent, but 3 of 4 end with the same
"top marks" formula, reading as template output.
- Not spec-scoped; a variety/quality note, per `CONTENT-GATE.md`'s general caution against templated
  `examMatters` phrasing seen elsewhere in the programme (DECISIONS.md has several entries on false or
  templated Appendix-6-citing `examMatters` text in other sections — same class of defect, worth the same
  scrutiny here even though this item does not itself claim a false Appendix 6 citation).

### specGap (01–07) and specThin (01)

**`specGap-01`** (2a, income vs wealth inequality — "only flashcards[17] covers it"). Spec 2a matches exactly
(§2). `spec-coverage.json` scores this leaf `thin`, not `missing` — consistent with "only flashcards[17]"
(some coverage exists, just not in the body), not a contradiction.

**`specGap-02`** (measures of poverty beyond the $-a-day line: headcount ratio, poverty gap, MPI — "only
extras.evaluation[2] mentions MPI"). Spec 1b is the generic "Measures of absolute and relative poverty" —
it does **not** name headcount ratio, poverty gap or MPI specifically (§2). **Note:** `spec-coverage.json`
does not list 1b as missing or thin at all, i.e. its independent read is that 1b is already adequately
"covered." This is either (a) spec-coverage.json judging the existing $-a-day-line teaching sufficient for
the generic 1b wording, in which case this item is scope creep beyond what the spec requires and a wont-fix
candidate under Rule 1 ("an audit item is a claim, not an instruction... check its scope against the
specification"), or (b) spec-coverage.json missing that the notes only ever use one measure. Both readings
are live; resolving which needs a look at the actual body text, which is a build-phase job, not this brief's.
Flagging as the strongest single wont-fix candidate in this packet's specGap group.

**`specGap-03`** (causes of changes in poverty — item's own list: "unemployment, low wages, lack of
education/health, conflict, demographic change, benefit levels"). **This list does not match the actual spec
1c bullets** (§2: economic growth / education and training / welfare benefits / changes in tax structure /
structural changes in the economy / aid / civil wars and conflict). Three of the item's six named causes
("unemployment", "low wages", "demographic change") are not spec bullets at all; two others are loose
paraphrases ("lack of education/health" for "education and training"; "benefit levels" for "welfare
benefits"); only "conflict" maps cleanly ("civil wars and conflict"). Per Rule 1 ("find the requirement by
its WORDING", never restate from memory), **this item's scope must be corrected to the seven actual spec
1c leaves before it is built against** — building to the item's own listed causes would authoring off-spec
content while still leaving several real spec bullets (economic growth, tax structure) untaught.

**`specGap-04`** (2c, between-country causes — "institutions, colonial legacy, capital/infrastructure,
primary-commodity dependence"). Spec 2c is generic ("causes of inequality... between countries", §2); these
four are the item's own illustrative teaching examples, not spec text, and nothing in the spec forbids or
requires them by name — no scope conflict, just author's proposed content for a generic requirement.

**`specGap-05`** (2e, impact of development/Kuznets — "diagrams[2] and quiz[4] only, no body teaching").
Spec 2e matches (§2, no named theory required — Kuznets is the standard teaching vehicle, not a spec term).
**Note:** `spec-coverage.json` does *not* list 2e as missing or thin — its stated methodology is "content
blocks, notes and **extras**" (quoted from the file's own §5 in full above), meaning `extras.chains`/
`extras.evaluation` count as teaching for that audit's purposes, while quiz/diagrams/flashcards do not. If
2e's only coverage is genuinely `diagrams[2]`/`quiz[4]` as this item claims, and not any `extras` entry, that
would actually make it **missing** by spec-coverage.json's own rule — worth checking which field(s) actually
carry 2e's content before treating the two documents as agreeing or disagreeing.

**`specGap-06`** (2f, capitalism — "extras.chains[3] and quiz[9] only"). Spec 2f matches (§2). Same note as
specGap-05: if `extras.chains[3]` is real content (not just a phrase), that is in-scope teaching by
spec-coverage.json's own methodology and this leaf is not actually missing by that standard — the gap this
item is really pointing at is the programme's own stricter "must be in the Learn Mode body, not just extras"
bar (`structure-03`), which is a real and separate requirement, just not a *spec* gap in the sense
spec-coverage.json measures.

**`specGap-07`** — "Unsure: whether the IAL spec lists 'measures of inequality' beyond Lorenz/Gini (e.g.
income share ratios, Palma)". **Checked directly against `audit/raw/spec-items.json`: no.** `ECON-4.3.4-2b`
has exactly two child leaves, `ECON-4.3.4-2b-1` "the Lorenz curve" and `ECON-4.3.4-2b-2` "the Gini
coefficient" (§2, verbatim spec text also confirms — 2b) is a closed two-item list). **This item's own
uncertainty is resolved by the spec text: no further measure is required.** The item is correct that
`practice[2]` guidance mentions income share ratios without teaching them — that is a real defect, but it is
an internal-consistency/accuracy issue (guidance references something the section never teaches), not a
spec gap, and the fix is either to teach income share ratios as enrichment (optional, not spec-required) or
to stop the guidance mentioning them, not to treat "income share ratios" as an untaught spec requirement.
**Strongest single refutation candidate in this packet** — recommend re-filing as an accuracy/practice-1 item
or wont-fix with this quotation as the reason, rather than confirming as written.

**`specThin-01`** (1c, structural changes in the economy — "named but never defined or explained"). Matches
spec 1c-5 (§2) exactly; identical requirement to the `thinItems` entry in §3. Note: this is the *only* one of
the 23 ids that already carries sourcing metadata (`"note": "Added 13 Sep 2026 from
audit/raw/spec-coverage.json..."`) — all other 22 ids have `note: null`, i.e. no recorded provenance in the
ledger itself for why they were raised. Not a defect, just noted for whoever verifies these against
`audit/raw/content-audits.json` or another source pass later.

---

## 5. Section content — structural counts (context only, not a verification of correctness)

Counted by reading `audit/content-sections/economics__poverty-inequality.json` (`node -e` script printing
`meta`, block-by-block `title`/`sections`.length/`diagramRef`/`quizIndices`/`practiceIndices`, and each top
array's `.length`). **This file is the 11 September t=0 restore-point snapshot, not the live/draft DB** — per
`PROTOCOL.md`'s own rule, a content packet re-verifies against `curl ".../api/sections/<id>?draft=1"` field by
field, never against this file; nothing below should be read as confirming current live state, only as
orientation for scoping. `git status`/`git diff` show no local edits to this specific file or to any
`poverty-inequality` snapshot, and packet 2.91 (25 Sep, committed) is the only prior packet recorded as
having touched this section (a check-in diagram decision only — see §4, topFix-04).

- `meta`: `blocks: 2, structuredBlocks: 2, legacyBlocks: 0, subsections: 4, reorder: 0, fillin: 0, quiz: 10,
  practice: 5, diagrams: 3, flashcards: 18, notes: 3, mistakes: 0, extrasChains: 4, extrasEval: 4`.
  **Anomaly noticed**: `meta.mistakes` reads `0` while the `common_mistakes` array actually has 3 entries —
  a metadata/array mismatch, not itself one of the 23 ledger ids; flagging in case it is relevant to
  `structure-05`'s count question above.
- Content blocks: `content[0]` "Types of Poverty" (2 sections), `content[1]` "Causes and Consequences"
  (2 sections). Neither has `diagramRef`, `quizIndices` or `practiceIndices` set (confirms `structure-02`
  as read from this file).
- `diagrams` (3): "Lorenz Curve and Gini Coefficient", "Absolute vs Relative Poverty", "Kuznets Curve:
  Inequality and Development".
- `quiz`: 10 items (indices 0–9, all referenced by `topFix-03`/`quiz-01` exist in range).
- `practice`: 5 items (indices 0–4, all referenced by `topFix-05`/`structure-03` exist in range).
- `flashcards`: 18 items (index 17, referenced by `specGap-01`, exists — last index).
- `extras`: keys `chains` (4 items) and `evaluation` (4 items) — indices `chains[3]` (specGap-06) and
  `evaluation[2]` (specGap-02) both in range.

---

## 6. What "done" means for this packet overall (from PROTOCOL.md + CONTENT-GATE.md, not asserted as met)

- Every one of the 23 ids above is either `confirmed` by a fresh Verify A (own evidence, `file:line`/
  field-path) or moved to `wont-fix` with a reason quoting the spec (§2 gives the exact text for every
  spec-scoped id; §4 already names the two strongest wont-fix candidates: `specGap-02`, `specGap-07`).
- Any new recall widget added for `topFix-04`/`structure-01` conforms to the recall contract table in
  `CONTENT-GATE.md` (`reorder`: `correctOrder[]` 3–5, `why[]`, a prompt naming the ordering principle;
  `fillin`: `template[]`/`answers[]`/`hints[]`/`distractors[]` 2–3) and, if it sits at a check-in beside the
  Lorenz diagram, passes the check-in answer-leak read (§4, topFix-04 note).
- Any new or edited real-world figure (poverty line, tax rate) carries a source a reviewer can check
  (Layer 4) or is deleted in favour of a generic true statement.
- `practice[2]`/`[3]`/any touched practice item opens with a scaffold paragraph carrying no figure or mark
  scheme (`practice.opening`, CONTENT-GATE checklist item 6).
- Command words used are drawn from `lib/ial-marking.js`'s Economics list (`Define, Calculate, Draw, Explain,
  Analyse, Examine, Discuss`); `Outline` and `Assess` are not IAL-Economics and must not appear.
- Content packet re-runs `--stage` and verifies against `curl ".../api/sections/poverty-inequality?draft=1"`
  field by field (PROTOCOL.md §5), not against `audit/content-sections/economics__poverty-inequality.json`.
- Gate: `npm run build`, `npm test`, `npm run validate`, `npm run exposure`, `npm run recalls` all exit 0;
  `node audit/scripts/ledger.mjs unverified 51` exits 0; PROGRESS.md row 51 updated; commit prefixed
  `packet-51:`; **no publish** — rule 6 requires stopping and handing the founder the exact
  `scripts/publish-section.mjs --confirm` command rather than running it.

---

## 7. Escalate to the founder (not decided here)

1. **Sequencing**: the newest material in `audit/NEXT.md` (currently uncommitted) names packet 48
   (government-intervention-firms) as "the next genuinely free-to-build packet" and lists 49–51 as
   "untouched and behind 48 in traffic order." This session was assigned packet 51 directly. Confirm whether
   skipping 48–50 is intentional before a build session spends time here.
2. **specGap-02** (measures of poverty beyond the $-a-day line) and **specGap-07** (measures of inequality
   beyond Lorenz/Gini) both look like wont-fix candidates on a direct spec-text reading (§4) — recommend the
   founder or the build session close them wont-fix with the quoted spec text as the reason, rather than
   building content the spec does not actually require.
3. **specGap-03**'s own listed causes ("unemployment, low wages, demographic change") do not match the
   actual seven spec 1c leaves (§4) — needs re-scoping to the real list before anything is built against it.
