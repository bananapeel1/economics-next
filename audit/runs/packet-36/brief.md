# Packet 36 brief — business__managing-finance (Business Unit 2, WBS12, IAL 2.3.3)

**Status**: 30 open ledger items, structure and content work required. Not started.

**Section**: managing-finance  
**IAL spec**: 2.3 Managing Finance (sub-numbered 2.3.1 Profit, 2.3.2 Liquidity, 2.3.3 Business Failure)  
**Section coverage (audit/raw/spec-coverage.json)**: 21 of 33 spec requirements properly taught; 8 thin; 4 missing  
**March grade**: Not graded in audit report (structure-only audit)

---

## The 30 open ledger items, grouped by kind

### 5 topFix items — what to fix

| ID | Title | Scope |
|---|---|---|
| C-managing-finance-topFix-01 | Practice set rebuild | Delete gearing / ROCE / asset-turnover / dividend-yield (out of scope). Add 4-mark current/acid ratio calculation from mini balance sheet; add 4-mark explain-one-way; add 10/12-mark Assess internal causes; add 20-mark Evaluate liquidity vs profitability priority. Rewrite guidance for Assess to require judgement (remove "No explicit judgement mark"). |
| C-managing-finance-topFix-02 | Recall layer fixes | Remove 3-letter prefix hints on all 7 fill-ins (violates `fillin.hint` rule); provide word banks with distractors or numeric blanks. Delete duplicate income-statement reorder (shown in net-profit step). Replace external-causes 'gradual to sudden' reorder with causal chain or internal/external classify. |
| C-managing-finance-topFix-03 | Add missing sections | Add four new teaching subsections: statement of financial position with labelled example for extracting current assets/liabilities; working capital and its management; operating profit margin; profit vs cash. Introduce IAL labels 'statement of comprehensive income' and 'profit for the year'. Fix 'Net profit (also called operating profit...)' conflation. |
| C-managing-finance-topFix-04 | Quiz corrections | Reword Q15 to ask for operating profit (supply interest/tax data if needed). Rewrite Q19 explanation (false claim: raising current liabilities improves working capital). Dedupe Q5/Q17 and Q9/Q13. Replace three Evaluate-MCQs (length giveaway) with balance-sheet and profitability content questions. Remap block 4 quizIndices [3] to business-failure item; block 3 practiceIndices away from gearing. |
| C-managing-finance-topFix-05 | Content accuracy | Correct Carillion example (loss-making at collapse, not 'profitable on paper'). Resolve contradiction: Liquidity block lists "sale of underused assets" in body but forbids it in takeaway/misconception. Add two diagrams: profit waterfall (revenue → gross → operating → profit for year) and working capital cycle. |

### 1 accuracy item

| ID | Title | Issue | Fix |
|---|---|---|---|
| C-managing-finance-accuracy-01 | Profit terminology | Understanding Profit > net-profit body: "Net profit (also called operating profit or profit for the year, depending on the level of deduction)" conflates operating profit with net profit. IAL distinguishes operating profit (before interest, tax) from profit for the year (after). Section's own flow contradicts this; Q0 correctly calls revenue−COS−opex 'operating profit'; Q15 calls the identical sum 'net profit'. | Use IAL labels consistently: **gross profit** (revenue − cost of goods sold), **operating profit** (gross profit − operating expenses, before interest/tax), **profit for the year / net profit** (after interest and tax). Section text, quiz, and flashcards must agree. |

### 1 quiz item

| ID | Title | Issue |
|---|---|---|
| C-managing-finance-quiz-01 | Q15 profit naming | No interest/tax data given, so the $80,000 calculated is operating profit, not net profit. Q0 labels the identical computation 'operating profit'. Contradiction: directly conflicts with content it tests. |

### 1 practice item

| ID | Title | Issue | Fix |
|---|---|---|---|
| C-managing-finance-practice-03 | p2 levels marking | 'Assess the importance of liquidity management...' (10 marks). Guidance is point-based and states "No explicit judgement mark" — wrong for IAL Assess tariff. Level 4 requires supported judgement/conclusion. Guidance actively steers students away from the thing earning top level. | Rewrite guidance as two-paragraph structure per CONTENT-GATE: paragraph 1 is scaffold (no figures, no mark scheme, what to separate/watch for); paragraph 2+ is mark scheme. Use **level bands** (0-3, 4-6, 7-9, 10 marks) naming the judgement expected at each level. |

### 12 structure items — what to reorganise

| ID | Title | Issue |
|---|---|---|
| C-managing-finance-structure-01 | Spec numbering | Section meta-number '2.3.3' with title 'Managing Finance' does not match IAL structure. IAL has 2.3.1 Profit, 2.3.2 Liquidity, 2.3.3 Business Failure. This section bundles all of 2.3, not just 2.3.3. |
| C-managing-finance-structure-02 | Duplicate recall | Consecutive steps both show the same four income-statement lines: net-profit's reorder (step B, spaced) and structure-of-income-statement's reorder (step C, immediate). Wastes a recall slot and tests the same knowledge twice. |
| C-managing-finance-structure-03 | Block overlap | Blocks 1 ('Understanding Profit') and 2 ('Income Statement') overlap heavily. net-profit already walks statement top-to-bottom; block 2 re-teaches it. **Reorganise**: Block 1 = profit calculations + statement of comprehensive income; Block 2 = profitability ratios + improving profitability. |
| C-managing-finance-structure-04 | Quiz/practice wiring | Block 4 quizIndices [3] shows acid-test MCQ at end of 'Causes of Business Failure' (wrong). Block 3 practiceIndices [1] shows gearing question (untaught, out-of-scope) at end of 'Liquidity'. Blocks 1 and 4 have zero practice, so p2 (liquidity Assess) and p4 (improve NPM) never surface in Learn Mode. |
| C-managing-finance-structure-05 | Missing practice coverage | No practice question on business failure (the block with most evaluative potential; typical IAL: 'Assess likely causes of X's failure' 10/12 marks). No 'Calculate' question for current/acid test ratios from a table (typical IAL Unit 2: 4-mark calculation). |
| C-managing-finance-structure-06 | Missing diagrams | Zero diagrams; section is naturally visual. Needs: profit waterfall (revenue → gross profit → operating profit → profit for the year) and working capital cycle. Flashcards already contain a working-capital-cycle 'Trace' chain with no counterpart in content[]. |
| C-managing-finance-structure-07 | Untaught quiz/flashcard content | Quiz and flashcards test: statement of financial position, current assets/liabilities definitions, working capital. Learners encounter these in Notes/Flashcards or quiz without being taught them in Learn Mode. |
| C-managing-finance-structure-08 | Duplicate flashcards | Flashcards 19-21 are exact duplicates of 22-24 (three 'Trace...' cards repeated). |
| C-managing-finance-structure-09 | Takeaway contradiction | Liquidity block takeaway contradicts its own body: sale of underused assets listed as an option in body, forbidden in takeaway/misconception. |
| C-managing-finance-structure-10 | Step pairing (acceptable) | Step pairing is coherent: (gross+net, improve alone), (structure+interpreting), (understanding+ratios, improving alone), (internal+external, why-new alone). Difficulty ramp (calculations → statement → liquidity → failure) is sensible. **No action needed.** |
| C-managing-finance-structure-11 | Misconceptions (mostly acceptable) | Misconceptions are mostly real student errors (gross vs net; higher revenue ≠ higher profit; income statement is flow not snapshot; profit ≠ cash; 2:1 rule; bottom-line bias). One filler: "Students assume having a good idea is enough" (why-new-businesses) is not an exam misconception. **Remove the one filler.** |
| C-managing-finance-structure-12 | Recall hints design flaw | All seven fill-ins have same flaw: hints are the first three letters of the answer. Recall tests spelling completion, not understanding. Violates `fillin.hint` DEBT rule (every fill-in flagged). **Systemic fix**: replace with word banks (distractors) or numeric blanks, use semantic hints. |

### 7 specGap items — missing spec requirements

| ID | Spec requirement (from 2.3.3, wording verified in audit/raw/bus_spec.txt) | What's missing | Closure criteria |
|---|---|---|---|
| C-managing-finance-specGap-01 | **1c) Measuring profitability: calculation of operating profit margin** | Only GPM and NPM are taught; OPM is named in an extras chain but never explained in Learn Mode. | Add a subsection on operating profit margin (formula, worked example, importance for comparing firms of different cost structures). |
| C-managing-finance-specGap-02 | **1c) Statement of comprehensive income (profit and loss account)** + **1a) profit for the year (net profit)** — the IAL labels students see on exam data tables | Students encounter these labels in quiz/flashcards but never learn their meaning in content[]. | Add teaching on the name 'statement of comprehensive income', the label 'profit for the year' as IAL's term for net profit, and why the exam uses both labels. |
| C-managing-finance-specGap-03 | **2a) Distinction between profit and cash** | Covered obliquely inside Liquidity block. No dedicated treatment of why they differ (credit sales, depreciation, capital purchases, loan repayments). | Add a subsection or notes item: profit vs cash distinction with worked examples (e.g., credit sale increases profit but not cash; capital purchase increases asset but reduces cash; depreciation is a cost but not a cash outflow). |
| C-managing-finance-specGap-04 | **2b) Statement of financial position (balance sheet)** — what it is and what it shows | Not taught in content[]. Appears only in flashcards and one misconception aside. Students hit the term in quiz and practice without prior teaching. | Add a subsection: structure of a statement of financial position (current assets, current liabilities, non-current assets/liabilities); what each section represents; how to extract figures for ratio calculations. Include a labelled diagram and a worked example. |
| C-managing-finance-specGap-05 | **2c) Working capital and its management: the importance of cash** | Not taught in content[] despite being quizzed (Q9, Q13, Q19) and flashcarded (working capital cycle chain). | Add a subsection: definition of working capital (current assets − current liabilities), the cash conversion cycle, importance for business survival, and links to liquidity ratios and improve-liquidity strategies. |
| C-managing-finance-specGap-06 | **3a) Internal causes: poor marketing + poor quality** (spec lists both) | Named in flashcards but not detailed in content[]. Students could not explain on an exam question. | Add brief notes explaining each: poor marketing = insufficient customer awareness or brand damage; poor quality = customer dissatisfaction, rework costs, loss of reputation. Link to case examples. |
| C-managing-finance-specGap-07 | **2b) Calculating current ratio and acid test ratio from a statement of financial position** — uncertain if IAL expects students to extract figures from supplied data | Content teaches the formulas but never shows a worked example of extracting current assets/liabilities from a full balance sheet. | Clarify scope: add a practice question with a 4-mark "Calculate the current ratio and acid test ratio from the following statement of financial position" to signal that extraction is expected. If spec requires it (likely), teach it explicitly; if optional (unlikely), the practice question covers it. |

### 5 specThin items — spec requirements taught but underdeveloped

| ID | Spec requirement (verified wording) | Current teaching | Closure criteria |
|---|---|---|---|
| C-managing-finance-specThin-01 | **3a) Internal cause: overestimation of sales** | Named but never defined or explained. Student could not answer an exam question from it. | Add definition: overestimation of sales leads to overproduction/overstock, excess inventory, working capital tied up, cash flow stress, potential write-offs if goods do not sell. Link to inventory control and cash flow. |
| C-managing-finance-specThin-02 | **3a) Internal cause: poor inventory control** | Named but never defined or explained. Student could not answer an exam question from it. | Add explanation: poor inventory control = holding too much stock (cash tied up, waste, obsolescence risk) or too little (stockouts, lost sales, customer dissatisfaction). Link to overestimation of sales and working capital management. |
| C-managing-finance-specThin-03 | **3b) External cause: interest rates** | Named but never defined or explained. Student could not answer an exam question from it. | Add explanation: rising interest rates increase the cost of borrowing, reduce profitability, increase financial stress for firms with debt, may trigger default. Link to gearing and financial risk. |
| (none for poor marketing + poor quality) | These are mentioned in structure-09 and specGap-06. Handle as part of topFix-05 and specGap-06. | - | - |
| (none for factoring, exchange rates, supplier problems, natural phenomena) | These are missing entirely; see specGap section. The four "missing" items do not appear in this section at all. | - | - |

---

## Spec requirements verified against audit/raw/bus_spec.txt (lines 921–965)

**Verified true from source:**
- IAL spec sections are 2.3.1 Profit, 2.3.2 Liquidity, 2.3.3 Business Failure (not one topic numbered 2.3.3)
- Operating profit margin IS a required spec item (line 932)
- Statement of comprehensive income (profit and loss account) IS required (line 929)
- Profit for the year (net profit) IS required (line 925)
- Statement of financial position (balance sheet) IS required (line 938)
- Working capital and its management IS required (line 945)
- All five specified external causes of business failure ARE in the spec (lines 948–956), including factoring (absent from content but spec requirement verified at line 941)

**Four items missing entirely from content:**
1. Factoring (2b, line 941: "ways to improve liquidity, including assets, supplier credit terms, **factoring**, inventory JIT")
2. Exchange rates (3b, line 953: "External causes of business failure: ... exchange rates ...")
3. Supplier problems (3b, line 955: "supplier problems")
4. Natural phenomena (3b, line 956: "natural phenomena")

---

## Definition of "done" for packet 36

### Build gate (npm/validate/test)
- `npm run build` and `npm run validate` exit 0
- Baseline does not grow: section's DEBT/BLOCK counts ≤ the audit's current count
- `npm test` passes (if any widget or step logic was touched)

### Content checklist (per CONTENT-GATE.md, Layer 1b)
Per-section edit pass after staging and before publish-section:
1. Every recall is correct type, names its criterion, carries `why`; reorders only for genuine sequences; no prefix hints; min 2-3 distractors per fill-in
2. Every example is one an IAL student can picture (not UK-only; IAL student is in HK, SG, Malaysia, Pakistan, Gulf, Nigeria, Kenya)
3. No UK-only vocabulary survives (RPI, Chancellor, Ofgem, etc. → international equivalents)
4. Flow steps use `{title, subtitle}` format (no " — " separator in strings)
5. Every examiner claim carries a citation
6. Practice items: first paragraph is scaffold (no figures, no mark scheme); paragraph 2+ is scheme. Assess questions use level bands, not point allocations
7. Baseline shrank or held steady

### Ledger closure (verify A)
- All 30 ids claimed and confirmed by a fresh verifier agent
- `node audit/scripts/ledger.mjs unverified 36` exits 0

### Student walkthrough (verify B) — 390×844, signed out
**Acceptance script** (if packet changes what student sees — YES, this one does):
1. Learn Mode, managing-finance section
2. Every new subsection reachable and readable on phone (test profit waterfall, working capital cycle, statement of financial position example diagrams)
3. All seven fill-in recalls: no 3-letter prefix hints visible; word banks or distractors present
4. Practice questions: Assess-type questions show level bands in guidance (not point allocation)
5. Quiz questions: Q15 and Q19 wording corrected; no deduped items showing; acid-test MCQ appears in Learn Mode (wiring fix)
6. No console errors

**What student must NOT see:**
- "Net profit (also called operating profit...)" conflation
- Gearing question surfaced in Learn Mode (untaught)
- Duplicate income-statement reorders on consecutive steps
- Carillion described as "profitable on paper"
- Takeaway forbidding asset sale when body teaches it

---

## Content and structural requirements (from packet 14 template and CONTENT-GATE.md)

### Section anatomy (Learn Mode steps)
One subsection = one teach step with its own recall below the title.  
One chapter = multiple teach steps + one check-in step (diagram/quiz/practice/spaced recall/takeaway).

**Planned chapter/block split** (from structure-03 suggested reorganisation):
- **Block 1: Profit Calculations** — gross, operating, profit for the year; statement of comprehensive income; ratios GPM, OPM, NPM; ways to improve profitability (profit waterfall diagram)
- **Block 2: Liquidity** — distinction profit/cash; statement of financial position (balance sheet diagram); current/acid test ratios; working capital; ways to improve liquidity (working capital cycle diagram)
- **Block 3: Business Failure** — internal causes (cash flow, overestimation, overtrading, inventory, marketing, quality); external causes (market, competition, economic, exchange rates, interest rates, regulation, supplier problems, natural phenomena)

### Quiz construction (Layer 1, checked)
- 32 MCQs total (current: 25; need ~7 more on balance sheet, operating profit margin, business failure causes, profit-vs-cash distinction)
- Correct option 1.2× longest distractor (max 1.5×)
- No hedged correct among absolutes
- No duplicate options or near-duplicate stems
- No essay command words in stems (Evaluate/Assess/Discuss)
- Option letters shuffled at render (`option-letters-in-explanations` rule applies)

### Practice construction (Layer 1, checked)
- Command words and tariff checked against Appendix 6: Command Words and Tariffs
- Tariffs for Business Unit 2: Define (4), Explain (6–8), Analyse (8), Assess (10–12), Evaluate (10–12, only if sourced)
- No "No explicit judgement mark" on Assess items (wrong for IAL)
- Guidance first paragraph: scaffold only; paragraph 2+: mark scheme
- Above 6 marks: levels-based guidance, not point allocation

### Recall construction (packet 7 contract, checked)
- Reorder: 3–5 items, genuine sequence only (cause → effect, process, calculation; never ranking or parallel facts), criterion named in prompt, `why` per item
- Fill-in: 3+ blanks per line or template, answers per blank in reading order, semantic hints (never letter-prefix), 2–3 distractors per answer
- Match: 3–5 pairs, `why` per pair, 0–2 distractors on right-hand side
- Classify: 2–3 groups, 4–8 items, `why` per group

All four types: visible Skip button, partial credit on first check, Try Again locks correct items, `why` shown after wrong check.

### Flashcards
- 27 cards currently (8 duplicates + 1 filler = clean count ~18)
- No duplicates
- Test only content taught in Learn Mode, not flashcard-only knowledge

### Diagrams
- Profit waterfall: revenue → gross profit → operating profit → profit for the year (working example)
- Working capital cycle: conversion cycle linking sales, stock, payables, receivables
- Statement of financial position (labelled example for extracting current assets/liabilities)
- No text draggable unless packet 13.5–13.7 author labels for label drill

---

## Contradictions check

**Between PROTOCOL.md, NEXT.md (current closest: packet 7 handoff), PROGRESS.md, and DECISIONS.md**:
- PROGRESS.md lists packet 36 as "not started" with 16 items; ledger shows 30 items. **This is normal**: PROGRESS tracks at packet level with an older count; ledger is the source of truth. Packet 36 inherits 30 items from the audit.
- No other contradictions detected.

**Between ledger items and spec (audit/raw/bus_spec.txt, lines 921–965)**:
- All audit claims verified against source wording.
- No item asks packet to delete a spec requirement.
- Four items are genuinely missing from content (factoring, exchange rates, supplier problems, natural phenomena).
- Eight items are thin (under-explained but present in content).

**Between audit findings and existing content structure**:
- Spec numbers: ledger-structure-01 is correct (section is 2.3 bundled, should be split as 2.3.1/2.3.2/2.3.3 or relabelled).
- Step pairing: structure-10 says it is sensible (no action).
- Misconceptions: structure-11 says they are mostly real, except one filler (remove it).

---

## Work path (what must happen to close all 30 items)

### Phase 1: Structure and content rebuild (topFix-01 through -05 + specGap all + specThin all)
1. Reorganise into coherent chapter/block structure (profit → liquidity → failure)
2. Add four new teaching subsections: SFP, working capital, profit-vs-cash, operating profit margin
3. Add two diagrams: profit waterfall, working capital cycle
4. Write recalls (fix hints, replace duplicate, convert weak reorder)
5. Rewrite practice guidance (Assess items with levels, not points)
6. Correct accuracy (Carillion, assets contradiction, terminology)

### Phase 2: Quiz rebuild (topFix-04 + quiz-01)
1. Reword Q15 (operating profit)
2. Rewrite Q19 (working capital claim)
3. Dedupe Q5/Q17 and Q9/Q13
4. Replace three length-giveaway Evaluate items with balance-sheet and failure content questions
5. Remap block 4 quizIndices and block 3 practiceIndices

### Phase 3: Wiring fixes (structure-04, -07, -08)
1. Fix flashcard duplicates (remove 19–21, which are duplicates of 22–24)
2. Remap quizIndices and practiceIndices
3. Verify all quiz/practice/recall items taught in Learn Mode before surfacing

### Phase 4: Validation and gate
1. `npm run validate` (no new DEBT beyond current baseline)
2. `npm test` (if step logic changed)
3. Per-section checklist (CONTENT-GATE.md Layer 1b)
4. Staging and `publish-section.mjs --confirm`
5. `npm run validate --baseline --confirm` (shrink baseline if possible)

---

## Not yet known (for verifier to confirm against live git diff)

- Whether the 30 items represent all work needed or if the rebuild will uncover additional structure issues
- Whether diagrams will be authored inline (inline SVGs) or as external .mjs files (packet 14 style)
- Whether the practice rebuild will stay within the IAL tariff bounds (Business Unit 2: 4, 6–8, 8, 10–12, 10–12 max)
- Whether the reorder conversion (structure-02 notes) will use `classify` (internal/external causes) or narrative `reorder` (causal chain)
- The exact business example used to carry figures across sections (packet 14 used Kopi Kita; managing-finance is financial, not business operations — may use a different firm or several)
- Baseline debt count after fix (baseline will shrink as `fillin.hint` and `recall.why` debt is cleared; may stay level if new content adds new rules)

---

**Prepared for**:  
- Build phase: Opus on this section (per PROTOCOL.md — no rewrite, no D grade, so standard Opus)
- Verify A: packet-verifier agent (read-only, ledger-write, fresh context)
- Verify B: student-walkthrough agent (390×844, signed out, Learning tab, full section walkthrough)

**Token discipline**:  
- Ledger is source of truth (30 items). Spec verified once against audit/raw/bus_spec.txt (lines 921–965).
- Working output in audit/runs/packet-36/. Brief (this file) is input to verifier.
- Return path is ledger confirmation, not recapping content.
