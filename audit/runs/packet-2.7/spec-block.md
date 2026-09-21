## Packet 2.7 spec — the recall guard, the spacing engine, and four records that are wrong (Opus 5, 19 September 2026)

Six ids: `V029` `V030` (the answer-recoverable check), `V031` (a diagram that names a curve it does not
draw), `V032` (three false statements in packet 29's records), `V034` (`pickSpacedRecall`), `V036` (a check
that enforces a conclusion Appendix 6 does not ask for). This is packet 2.5's sibling: **no section is
rebuilt here.** Every item is an instrument, an engine or a record, and the one content change is the five
staged strings a broken check certified.

### Rule 1 — every item checked before anything was changed, and all six stand

| id | claim | verdict, measured today |
|---|---|---|
| V029 | `recoverable()` misses give-aways for four compounding reasons | **confirmed**, `packet-29-…mjs:396-425`. `sentencesOf` splits on `(?<=[.!?;:])\s+`, so a give-away across a colon is two fragments; the fill-in gate is 0.85 and the reorder gate 0.95; the A/B's negative control is `{ keyIdea: '…', body: [] }` — an invented one-sentence teach, not the real subsection |
| V030 | the guard reports "0 of 43" as a fact when it is "0 at a 0.85 threshold" | **confirmed** — the runner prints a count and never its threshold, and PROGRESS.md carries the bare `0 of 43` beside Verify B's `10 of 43` with no way to tell they measure the same thing |
| V031 | the caption says MR = MC and no MR curve is drawn | **confirmed**, `_packet29-diagrams.mjs:689-712`. `mk()` passes `label` as `''` to `straight()`, so neither sloping line carries AR or D either. The arithmetic IS MR = MC — `q = (a − mc) / 2b` at `_packet29-util.mjs:273` — so the fix is the picture, not the numbers |
| V032 | three statements are wrong | **all three confirmed** — see the table below |
| V034 | `pickSpacedRecall` exhausts chapter 1 | **confirmed and larger than stated**: 80% of staged spaced slots and 64% of live ones come from chapter 1; 10 staged sections draw EVERY slot from it. On `financial-planning` staged, all four check-ins read "Recall from chapter 1" exactly as the item says; on LIVE `financial-planning` it is three of four, because chapter 1 holds only three recalls there and the fourth spills to chapter 2. The item's measurement is the staged one |
| V036 | a Discuss gloss check enforces a conclusion Appendix 6 does not ask for | **confirmed in BOTH specifications.** `bus_spec.txt:2234-2237` — Discuss (8) asks for "a brief **assessment** … showing an awareness of competing arguments/factors"; `econ_spec.txt:2733-2740` — Discuss (14) asks for "recognition of different viewpoints and/or a critical **assessment** of the evidence". Neither uses the word. `conclusion` belongs to **Evaluate** at `bus_spec.txt:2246-2250` |

V032's three, each re-measured rather than read:

1. **The pre-test.** `NEXT.md` acceptance check 4 says a three-question pre-test with one repeat is EXPECTED
   and cites `PreTest.jsx:23-27` for a pool built as `[...free, ...reserved]`. Those lines are `const letters`
   and the opening of `handleSelect`, and no such expression exists anywhere: `pickPretestQuestions`
   (`lib/pretest-pool.js:41`) FILTERS the reserved set out. Composed on the shipping functions over the staged
   bundle: **signed out 2 questions and 0 repeats, Pro 3 and 0.** A verifier sent after that repeat would hunt
   something that cannot occur.
2. **Oligopoly.** Counted out of the packet's own `LEAF_MAP`, sub-topic 5 holds **22** of the 54, not 25
   (5 · 2 · 4 · 6 · **22** · 8 · 2 · 5 = 54). The wrong figure is in four places.
3. **The mistakes count.** `section_common_mistakes.draft` holds **9**; commit `ef4f819`'s message says 8.
   PROGRESS.md already says 9, so the two records disagree with each other.

### What gets built

1. **One answer-recoverability measure, in the validator, not in a fifth runner.** `V029`'s finding is that
   *no packet's runner could see it*, and the reason is that the check is copy-pasted per packet — five
   variants exist today (29, 31, 32, 33, 34) and they disagree on thresholds, on which fields are read and on
   which types are tested. It moves to `lib/content-validator.mjs` as `recall.recoverable`, so every section
   that is staged or validated from now on is measured by the same instrument. **CORRECTED 19 September:
   this said "DEBT tier" and said the back catalogue would land in `audit/validator-baseline.json`. Neither
   is what shipped.** At DEBT the rule reported 20 new findings on packet 29's staged section, 9 on packet
   30's, 9 on 33's, 4 on 36's and 8 on 37's, and a content runner's own gate is 0 new DEBT on its own
   section — so it stopped every content packet in the programme from staging, starting with this packet's
   own re-stage for V031. Baselining the back catalogue does not fix that and was tried: 546 keys from both
   corpora, every runner unchanged, because a key fingerprints the object and a runner validates the bundle
   it BUILDS rather than the row in the database. `validator-baseline.json` is restored, unchanged, at 2,432
   keys. **The rule is INFO in the validator and gated in the census**, per section, by `npm run recalls
   --check` against `audit/recall-census-baseline.json` — where a section with no entry is held to zero, so
   a section written from scratch cannot ship the debt silently. DECISIONS, 19 September. The four defects
   are fixed at
   the move: the sentence split keeps `:` and `;` inside the unit and also tests adjacent pairs, because what
   the student sees is a screen and not a sentence; the gates are calibrated DOWN to real instances rather
   than set above them; every type is tested against every field that renders; and the A/B controls are REAL
   subsections pulled out of the corpus, never an invented teach.
2. **The honest number.** `audit/scripts/recall-census.mjs` (`npm run recalls`) walks both corpora and prints
   the count **with its threshold beside it**, per section and in total. No surface in this repository may
   print "0 of 43" again without saying at what gate.
3. **`pickSpacedRecall` reaches the middle chapters.** One rule: a check-in takes its spaced recall from the
   eligible earlier chapter that has contributed the FEWEST so far, oldest chapter first, and the earliest
   unused recall within it. Spacing still prefers old material, and a five-chapter section now draws from
   four chapters instead of one. `lib/learn-steps.test.mjs` gets the case that fails today.
4. **The price-discrimination diagram shows what its caption claims.** An MR line per market
   (`MR = a − 2bQ`, x-intercept `a/2b`), each sloping line labelled `AR = D`, and the read-off kept. Re-staged
   and verified against the served payload, not against the file.
5. **The Discuss check, inverted, and the five staged strings it certified.** The check becomes packet 35's:
   a Discuss gloss must name the brief ASSESSMENT and may not promise a conclusion. `managing-people` carries
   four `examMatters` and one practice guidance saying Appendix 6 requires one — "the conclusion is
   compulsory" — and `globalisation` carries one that cites Appendix 6 correctly and then adds "so a short
   conclusion is required". **Nothing is live**: all six are in `draft`. They are corrected, re-staged, and
   read back out of `?draft=1`.
6. **The four wrong records**, each corrected where it is written and left visible rather than edited out.

### Acceptance checks a verifier can run without this conversation

1. `node audit/scripts/recall-census.mjs` prints a count and a threshold on every line it reports, and its
   totals match the per-section rows.
2. Deleting the `:`/`;` handling from the sentence splitter makes the census count FALL, and the A/B in
   `lib/content-validator.test.mjs` fails — the give-away across a colon is a real corpus instance, named.
3. `node --test lib/learn-steps.test.mjs`: a five-chapter section whose chapter 1 holds four recalls draws
   its four spaced slots from four DIFFERENT chapters, and reverting `pickSpacedRecall` to `candidates[0]`
   fails that test.
4. `node audit/runs/packet-2.7/v034-probe.mjs` reports 0 sections drawing every slot from chapter 1, against
   10 staged and 6 live at HEAD.
5. The served `draft` payload for `market-structures-contestability` carries, in
   `diagrams[6].scenarios[2]`, two dashed lines whose gradients are twice their own AR's and which meet
   `MC = $24` at 12 and 16, and a key reading `solid: AR = D` and `dashed: MR`. **CORRECTED 19 September:
   this asked for "an `AR = D` on each sloping line", which is the version Verify B rejected — four labels
   on five crossing curves landed 3.3 units apart with a read-off running above one of them. A verifier
   running the original wording would have failed the correct diagram.**
6. `grep -c 'Discuss' | grep conclusion` over the served `draft` payloads of `managing-people` and
   `globalisation` returns 0, and `scripts/packet-30-managing-people.mjs` fails if a Discuss gloss promising a
   conclusion is planted in it.
7. `grep -rn '25 of the 54'` returns nothing, and every surviving `PreTest.jsx:23-27` is inside a sentence
   that says the citation was wrong — the four records that asserted it now annotate it instead, and the
   commit-message/bundle disagreement over 8 versus 9 mistakes is recorded in the PROGRESS row.
8. `npm test`, `npm run build`, `npm run validate` and `npm run exposure` all exit 0.

### The Verify B acceptance script (written before the walk)

390×844, signed out, storage cleared, `?draft=1`.

- `financial-planning`: walk to the check-in after each chapter. The cue above the spaced recall must read
  **four different chapter numbers** across the four check-ins, not "Recall from chapter 1" four times.
- `market-structures-contestability`: open the price-discrimination diagram. Both sloping lines carry a
  visible `AR = D`, an `MR` line runs below each, and each `MR` crosses the `MC = $24` line under the marked
  read-off. Nothing overlaps the caption.
- `managing-people`: the Discuss subsection in chapter 1 must not tell the student a conclusion is required.
