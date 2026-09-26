# Packet 47 brief — global-markets-expansion (Business 4.3.2)

Brief only. No source file touched, no content authored, no ledger write. Working notes in this
directory: `ledger-packet-47.txt`, `ledger-packet-47-open.txt`, `ledger-show-all.txt`,
`spec-4.3.2-verbatim.txt`.

## 0. Documents read, and a document that does not exist

Read in full: `audit/PROTOCOL.md`, `audit/PROGRESS.md` (row 47 + table headers), `audit/DECISIONS.md`
(Open + Settled lists), `audit/CONTENT-GATE.md` (recall contract, per-section checklist), `audit/
SESSION-PROMPT.md`, `audit/SPEC-OWNERSHIP.md`, `audit/EXAM-PRACTICE.md` (read only, per Rule 5 — not
touched). Read `audit/NEXT.md` in full (10,689 lines) looking for a `## Packet 47 spec` heading.

**`grep -n "^## Packet 47 spec" audit/NEXT.md` returns nothing. `grep -n "packet 47\|packet-47"
audit/NEXT.md audit/DECISIONS.md audit/PROGRESS.md audit/SESSION-PROMPT.md` returns nothing except
`PROGRESS.md`'s own row 47.** The block the task brief told me to read does not exist anywhere in the
tree. This is not being treated as a blocking contradiction: the three most recent handoffs in the same
file hit the identical situation and already settled it — packet 44's own handoff (`NEXT.md:10560-10563`)
states verbatim "**No `## Packet 44 spec` heading exists anywhere in this file** ... Not a contradiction
between authorities; a missing document," citing PROTOCOL's own rule that `audit/ledger.json`, not
`NEXT.md`, defines scope. Packets 41 and 43 hit the same gap. I am following that precedent rather than
picking a side myself, and flagging it so the founder can decide whether a spec block should still be
written for hygiene.

**The newest "Handoff" entries in `NEXT.md`** (by content, not by file position — the file is not
strictly reverse-chronological; the most recent dated entries are near the end, lines 10422-10689) are the
packet-44 bookkeeping passes (26 Sep 2026). The last of them names the next unclaimed packets as **45
(labour-markets, 13 Opens)** and **46 (growth-development, 12 Opens)** — "both are free; packet 45 is next
in the traffic order." **Packet 47 is not named as next by any handoff.** Not a contradiction (packets can
be worked out of traffic order; the user's own request named 47 explicitly), but worth recording: this
packet was not queued by the programme's own ordering.

**PROGRESS.md row 47** (table header: `| # | Section | Opens | Status | Commit | Snapshot | Validator |`):
`| 47 | global-markets-expansion | 11 | not started | | | |`. Per the packet-43 handoff note already in
`NEXT.md` ("`Opens` is traffic, not an item count... never write a ledger count into it") and this
session's own memory: **11 is traffic (students who opened the section), not an item count.** The actual
item count, read fresh below, is 33.

**DECISIONS.md Settled list**: nothing specific to packet 47 or global-markets-expansion. Two Settled
entries are relevant to scope and are quoted in §4 below (practice-page shape; the Ansoff/Porter "named
tool" test).

## 1. Counts, by command

- `node audit/scripts/ledger.mjs packet 47 --open` → **33 items**, all status `open`, none claimed. By
  kind: topFix 5, accuracy 1, quiz 2, practice 2, structure 9, specGap 11, specThin 3 (5+1+2+2+9+11+3=33).
- `audit/raw/spec-coverage.json`, `bySection[]` entry with `key == "business__global-markets-expansion"`
  (read via `python3 -c "json.load(...)"`, not summarised): `covered: 4, thin: 10, missing: 18` → 32
  requirement-leaves counted by that oracle for this section.
- `sed -n '1372,1410p' audit/raw/bus_spec.txt` (saved to `spec-4.3.2-verbatim.txt`): **4.3.2 has 5 numbered
  sub-topics and 19 lettered bullets** — sub-topic 1: a-d (4); sub-topic 2: a-b (2, "a" itself lists 5
  factors); sub-topic 3: a (1, listing 9 factors); sub-topic 4: a-j (10); sub-topic 5: a-b (2).
  4+2+1+10+2 = 19 lettered bullets. (The 32-leaf oracle count and the 19-lettered-bullet count are not the
  same denominator — the oracle splits multi-factor bullets like 2a/3a into separate leaves. Both are
  cited so a reader can see which is which; neither is asserted as "the" count.)
- Live bundle, `audit/content-sections/business__global-markets-expansion.json` `meta` object (read
  directly, 2026-09-26): `blocks: 2, subsections: 4, quiz: 10, practice: 5, diagrams: 0, reorder: 0,
  fillin: 0, flashcards: 19, notes: 2, extrasChains: 4, extrasEval: 3`; `common_mistakes` array length 5.

## 2. The 33 open ids, mapped to the IAL leaf they claim (not the number they cite)

**Numbering note, already in the ledger's own `note` field for most items**: 21 of the 33 items (topFix-01,
accuracy-01, structure-06, specGap-01 through specGap-09) cite "4.2.x", UK GCE A-level numbering. The IAL
leaf is **4.3.2** (`bus_spec.txt:1372`), sub-topics numbered 1-5 as above, not "4.2.1"-"4.2.5". The other 12
(specGap-10, specGap-11, specThin-01/02/03, quiz-01/02, practice-01/02, structure-01/02/03/04/05/07/08/09 —
minus the ones already counted) either cite "4.3.2" correctly or cite no number at all. Wording, not
number, is what was checked below.

### topFix (5) — the rebuild instructions

| id | claims | maps to |
|---|---|---|
| topFix-01 | Rewrite content[] for push/pull, off-shoring vs outsourcing, PLC extension (block 1) + country-as-market; country-as-production-location + reasons for global M&A (block 2); exchange rates, cost vs differentiation, skill shortages (block 3) | Sub-topics 1+2 (block 1), 3+4 (block 2), 5 (block 3) — **but "cost vs differentiation" in the block-3 description does not correspond to any 4.3.2 bullet; see §4 candidate 1** |
| topFix-02 | Remove Bartlett & Ghoshal; demote Ansoff/PESTLE to "one-paragraph link to Unit 3" | Neither Bartlett-Ghoshal, Ansoff nor PESTLE is a 4.3.2 bullet — confirmed by direct read of content[], see §3 — **but "Unit 3" may be the wrong destination; see §4 candidate 3** |
| topFix-03 | Set quizIndices/practiceIndices per block | Wiring, not a spec leaf. Confirmed still unset on both live blocks (§3) |
| topFix-04 | Fix practice tariffs (6-mark Analyse → 8-mark Assess, etc.), delete Porter's-generic-strategies instruction, add K/App/An/Ev mark schemes | Tariff validity is `PROTOCOL.md`'s "Canonical IAL paper structures" table, not a 4.3.2 bullet. The Porter's-generic-strategies deletion instruction here is in direct tension with specGap-08's addition instruction — see §4 candidate 1 |
| topFix-05 | Add fillin (push vs pull, off-shoring vs outsourcing) and reorder (export→licence→JV→FDI) recalls, plus a diagram | Matches the recall contract's typing rules in `CONTENT-GATE.md` (`fillin` for a term, `reorder` for a genuine sequence) |

### accuracy (1)

| id | claims |
|---|---|
| accuracy-01 | Bartlett & Ghoshal (international/multi-domestic/global/transnational) is AQA-only, not in the Pearson IAL spec, at `pestle-bartlett-ghoshal` body[1]/body[2]/examMatters/takeaway[2]/takeaway[3] |

`grep -c "Bartlett" audit/raw/bus_spec.txt` was not run by name-search alone; `bus_spec.txt:1372-1410`
(the whole 4.3.2 leaf, read verbatim) contains no mention of Bartlett, Ghoshal, transnational, or
multi-domestic anywhere in the sub-topic. The live section's `pestle-bartlett-ghoshal` subsection body[1]
literally opens "The Bartlett and Ghoshal framework classifies MNC strategies based on two pressures..."
— the wording the item complains about is present verbatim in the current bundle.

### quiz (2), practice (2)

| id | claims | current bundle (read 2026-09-26) |
|---|---|---|
| quiz-01 | q0 (push/pull) correct but untaught in content[] | quiz[0] is exactly the push-factor MCQ described; content[] still teaches entry modes/Ansoff/PESTLE, not push/pull — the mismatch the item describes still holds by direct comparison of the two arrays |
| quiz-02 | q1 (off-shoring) correct but off-shoring vs outsourcing untaught in content[] | quiz[1] is the off-shoring MCQ; the distinction IS taught in flashcards[1]/[2] and common_mistakes[0], but not in content[] — item's own scope (content[] only) still holds |
| practice-01 | p1 (6-mark "Analyse...") wrong IAL tariff; stem ignores its own specific context | practice[1]: marks=6, question text is "Analyse the advantages and disadvantages of using a joint venture as a method of entering a new overseas market" — generic, even though the `context` field names India/construction materials specifically. Both halves of the claim match the current field values on direct read |
| practice-02 | p4 (20-mark Evaluate) right tariff, generic stem, guidance tells students to "Apply Porter's generic strategies" (Unit 3), guidance is a bullet list not a levels-based scheme | practice[4]: question is "...a new international market" (generic; context field names South Korea/Poland specifically); guidance contains the exact phrase "Apply Porter's generic strategies" (verbatim match); guidance has zero `\n` — one unbroken paragraph, so no visible knowledge/application/analysis/evaluation split. All three sub-claims match current field values on direct read |

**Candidate not in any existing item, found by this brief**: `CONTENT-GATE.md`'s per-section checklist
item 6 (`practice.opening`) requires guidance's first paragraph (before the first `\n`) to carry no figure,
mark allocation or answer, because `InlinePractice.jsx` shows exactly that first paragraph in guided mode.
Counted directly: **all 5 practice items have 0 newlines in `guidance`** (`g.count(chr(10))` = 0 for
indices 0-4), so `guidance.split('\n')[0]` is the entire mark scheme for every item, not just p1/p4. No
open ledger id names this; it matches the class the session's own memory records as "Guided practice
leaked the mark scheme" (160 back-catalogue items open for the founder) — worth checking whether this
section's 5 are part of that backlog or a fresh instance.

### structure (9)

Read against the live bundle directly:

- structure-01, -02: confirmed by direct read — both content blocks have `quizIndices: None,
  practiceIndices: None` in the live JSON.
- structure-03: confirmed — `meta.reorder: 0, meta.fillin: 0`.
- structure-04: confirmed — both blocks have exactly 2 sections (`meta.subsections: 4` for 2 blocks).
- structure-05: confirmed — `meta.diagrams: 0`.
- structure-06: the numbering claim ("4.3.2 does not match... where Global markets and business expansion
  is topic 4.2") is itself the stale-numbering error the item's own `note` field flags — 4.3.2 IS the
  section's correct IAL number (`bus_spec.txt:1372`); the *complaint* the item is trying to make (the app
  should use IAL numbers, not UK GCE ones) still stands, but the item's own body text has the numbers the
  wrong way round. Check the wording, not the item's arithmetic, before acting.
- structure-07: confirmed — both `notes[]` entries duplicate content[]'s subject matter (entry methods,
  Ansoff), not the spec bullets.
- structure-08: confirmed — `notes[0].misconception` ("Students say FDI is always the best...") and
  `joint-ventures-fdi.misconception` ("Students assume FDI is always the best entry method...") are the
  same misconception restated, not verbatim-identical strings but substantively duplicated, as the item
  says ("repeated verbatim" is a slight overstatement — they are paraphrases of each other, not a byte-for-
  byte copy; worth a look at exact wording before treating "verbatim" as literal).
- structure-09: confirmed — `exporting-licensing-franchising` and `ansoff-global-context` each have a
  `body[3]` of `{"type": "flow", "steps": [...]}`, three descriptive steps restating the prose above them.

### specGap (11), specThin (3)

Cross-checked each against `bus_spec.txt:1372-1410` verbatim (§1 above) and against the current bundle's
quiz/flashcards/common_mistakes (not just content[], since several item texts scope themselves explicitly
to "not taught in content[]" while acknowledging other arrays already carry the material):

- specGap-01 (push/pull), -02 (off-shoring/outsourcing), -03 (PLC extension), -04 (country-as-market
  factors), -05 (country-as-production-location factors), -07 (exchange rates), -09 (skill shortages):
  wording matches spec sub-topics 1a/1b, 1c, 1d, 2a, 3a, 5a, 5b respectively. All correctly scope their
  claim to content[] ("not taught in content[]"); the underlying terms are in fact present in
  flashcards/quiz/common_mistakes already (flashcards 0-2 push/off-shoring, 3 PLC, 4/8/9/15/17 country
  factors, 5/9/10/12/18 exchange rates, 13 skill shortages) — content[] itself does not teach any of them,
  which is what each item actually asserts.
- specGap-06 (five M&A reasons "not listed" in content[]): text lists spreading risk, entering new
  markets, acquiring brand names, securing resources, maintaining competitiveness — spec 4a-e. **Candidate
  to check (§4 candidate 2)**: the newer `spec-coverage.json` audit (specGap-10/11/specThin-03's own
  source) does NOT list "spreading risk and economies of scale" (4a) or "entering new markets/trade blocs"
  (4b) as missing or thin for this section — only 4c/d/e (brand names, resources, competitiveness), plus 4f
  (reducing competition, in `missingItems`) and 4i (supply chains, in `thinItems`). specGap-06's claim that
  all five of its named items are "not listed" is broader than what the more recent, requirement-by-
  requirement audit found.
- specGap-08 ("competitive advantage through cost competitiveness and differentiation — not taught"):
  **does not match any 4.3.2 bullet verbatim.** The nearest wording in 4.3.2 is 1c, "Cost competitiveness
  by off-shoring and outsourcing" — a specific mechanism, already covered by flashcards/common_mistakes,
  not a general cost-leadership-vs-differentiation framework. See §4 candidate 1.
- specGap-10 (push factor: competition), specGap-11 (M&A reason: government/legal requirement): match spec
  1a and 4h respectively; not found in flashcards/quiz/common_mistakes on direct read either — genuinely
  absent from every array, not just content[].
- specThin-01 (pull factor: increased sales/profitability), specThin-02 (M&A as vehicles for expansion,
  distinct from JV): match spec 1b and 4 (header); not found defined anywhere in the current bundle either.
- specThin-03 (M&A reason: supply chains/distribution networks, "named but never defined"): matches spec
  4i. **Candidate to check**: quiz[8]'s explanation text already reads "provides instant access to
  established distribution networks, customer bases and brand recognition" — arguably a definition,
  inside a quiz explanation rather than content[]. Whether a quiz-explanation counts as "taught" for this
  item's purpose is a judgement call for whoever acts on it, not settled here.

## 3. What "done" means for each kind (criteria only, not a claim any of it is met)

- **topFix / accuracy / structure items about content[]**: content[] teaches the wording of 4.3.2's five
  sub-topics (quoted in `spec-4.3.2-verbatim.txt`), with Bartlett-Ghoshal removed and Ansoff/PESTLE reduced
  or relocated (see §4 candidate 3 before choosing where). `CONTENT-GATE.md` checklist items 2-5 (locale,
  UK-only terms, flow-step shape, examiner-claim citation) apply to whatever prose replaces it.
- **quiz / practice items**: each quiz/practice item is answerable from what its own block's content[]
  teaches (the section's own long-standing structure-01 complaint); tariffs match `PROTOCOL.md`'s Business
  Units 3-4 command-word set (Explain 4 / Assess 8,10,12 / Evaluate 20 — no "Analyse 6"); guidance opens
  with a scaffold paragraph before any mark-scheme content, per `CONTENT-GATE.md` checklist item 6.
- **specGap / specThin items**: the named spec wording is taught in content[] (not just a flashcard or
  quiz explanation) in language a student could reconstruct an exam answer from — the specThin bar in
  `CONTENT-GATE.md`'s own language ("named but never defined or explained").
- **structure-03 / topFix-05 (recalls)**: new `reorder`/`fillin` widgets satisfy the recall contract's
  shape rules (`CONTENT-GATE.md` "The recall contract") — `reorder.criterion` named, `fillin` with 2-3
  distractors and semantic hints, `why` on every item.
- **Gate, unchanged from PROTOCOL.md**: build green, every claimed id confirmed by a fresh Verify A,
  Verify B clean at 390×844 (this is a content packet — Verify B applies), `npm run validate` / `npm test`
  / `npm run exposure` / `npm run recalls` all exit 0, baseline only shrinks, PROGRESS row updated, commit
  prefixed `packet-47:`, pushed. Publish is explicitly out of scope for this session (Rule 6) — staging
  only, and the exact publish command goes in the eventual handoff's escalate line, not run here.

## 4. Candidates that look contradictory — none resolved here, all need a decision before acting

1. **Porter: two different frameworks pulling in opposite directions.** `SPEC-OWNERSHIP.md` already
   tracks *Porter's five forces* as legitimately owned by both `business-objectives-strategy` (3.3.1.4c)
   and `global-markets-expansion` (4.3.2.2b, `bus_spec.txt:1390`) — that one is fine and already double-
   taught by design. A *second*, different Porter framework — "Porter's Strategic Matrix" (the generic-
   strategies tool: cost leadership/differentiation/focus) — is named only at `bus_spec.txt:1099`, under
   **3.3.1** (`business-objectives-strategy`), not 4.3.2. `DECISIONS.md` (packet 27, 17 Sep, "A named tool
   imports its own cells, and nothing else") sets the exact test for this: a framework's cells belong
   wherever the specification *names the tool*; `cost leadership`/`differentiation`-as-generic-strategy
   cells belong to 3.3.1, not here. Given that: **topFix-04 says delete the "Apply Porter's generic
   strategies" instruction from practice[4] (confirmed present verbatim, §2) as Unit-3/off-topic, while
   specGap-08 asks to add "competitive advantage through cost competitiveness and differentiation" as if
   it were a 4.3.2 gap.** These pull in opposite directions on the same underlying framework. specGap-08's
   wording does not match any 4.3.2 bullet (checked against the verbatim spec, §1); the nearest bullet
   (1c, off-shoring/outsourcing) is narrower and already covered elsewhere in the bundle. This needs a
   scope call — most likely specGap-08 is a mis-scoped claim (imported from the wrong framework, the exact
   failure mode Rule 1 and the packet-27 DECISIONS entry both warn about) — but that call is not made here.

2. **specGap-06 overstates its own scope against the newer, per-requirement audit.** specGap-06 (written
   from the older manual audit) claims all five of spec 4.3.2·4's sub-bullets a-e are "not listed" in
   content[]. `spec-coverage.json` (the newer, requirement-by-requirement audit that specGap-10/11 and all
   three specThin items were minted from, per their own `note` fields) does not list 4a ("spreading risk
   and economies of scale") or 4b ("entering new markets/trade blocs") as missing or thin for this section
   at all — only 4c/d/e, plus 4f and 4i under different item ids. Two ledger-derived authorities disagree
   about whether 4a/4b are already adequately covered. Not resolved here.

3. **Ansoff's global-context content may belong to a different, not-yet-started section.**
   `bus_spec.txt:1435` places "Application of Ansoff's matrix and Porter's matrix to global marketing
   decisions" under **4.3.3 Global marketing** — a separate section (`global-marketing`, packet 55, "not
   started", `PROGRESS.md` row 107) — not 4.3.2. Separately and independently, `NEXT.md`'s packet-2.9
   handoff (25 Sep 2026, quoted verbatim) already found: **"Items filed in the wrong section's bank.
   global-marketing's Ansoff items are taught in global-markets-expansion."** That is a live, documented
   cross-section placement problem for this exact topic, flagged by a different packet on a different date,
   using a different method (bank/content cross-reference) than the spec-line read that surfaced it here
   independently. topFix-02 instructs demoting Ansoff/PESTLE to "a one-paragraph link to Unit 3" — but per
   the spec line, the correct destination for the *global-context* application of Ansoff is specifically
   4.3.3 / `global-marketing` (packet 55), not a generic Unit 3 pointer. No `SPEC-OWNERSHIP.md` row exists
   yet for this pair, unlike the Porter's-five-forces case which does have one. Coordinating with (or at
   least not foreclosing) packet 55's future scope is a decision for whoever builds this, not settled here.

## 5. Escalation

Nothing here blocks producing this brief, and nothing above is a straight contradiction between
`PROTOCOL.md`, `PROGRESS.md`, `DECISIONS.md` and `CONTENT-GATE.md` — those four are mutually consistent.
What needs a founder or next-session decision before building:

- Whether to write the missing `## Packet 47 spec` block into `NEXT.md` (precedent from packets 41/43/44
  says it is not required — ledger.json is scope — but three packets in a row skipping it is a trend worth
  the founder seeing).
- The three candidates in §4, each of which changes what topFix-02/topFix-04/specGap-06/specGap-08
  actually ask for.
- Per Rule 6, this session authored nothing and made no source-file, content, or ledger change; publish/
  restore is not in scope and was not attempted.
