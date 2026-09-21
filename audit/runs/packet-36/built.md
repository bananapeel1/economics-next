# Packet 36 — `business__managing-finance` — BUILT and STAGED, NOT PUBLISHED

Business Unit 2 (WBS12), IAL **2.3.3 Managing finance**, `audit/raw/bus_spec.txt:921-958`.
**24 substantive leaves, 24 of 24 evidenced (100%).**

Snapshot taken before any write: `audit/snapshots/2026-09-18-pre-packet-36__business__managing-finance.json`.
Emitted bundle: `audit/snapshots/packet-36-bundle__business__managing-finance.json`.

| gate | result |
|---|---|
| `node scripts/packet-36-managing-finance.mjs` | exit 0, every check |
| section validator, staged draft | **24 BLOCK / 53 DEBT live → 0 BLOCK / 0 DEBT**, 0 new of either, would clear 72 baselined findings on publish |
| `npm run build` | exit 0 |
| `npm test` | 187 / 187 |
| `npm run validate` | exit 0 |
| `node audit/runs/packet-36/verify-draft.mjs` | **163 checks against the `draft` COLUMN**, all pass |

Staged to `draft` on all eight content tables. `data` is untouched on all eight and the verifier asserts
it (rule 6: publishing is the founder's, and DECISIONS 15 September forbids publishing recall-contract
content until packets 5 and 7 ship).

---

## What was built

**Five blocks in the specification's own sub-topic order**, with Profit and Liquidity each split so no
chapter is twice another's length: Profit · Profitability · Cash and the Statement of Financial Position ·
Liquidity · Business Failure. **24 subsections, one per step**, from 13 live.

| surface | live before | staged |
|---|---|---|
| blocks / subsections | 4 / 13 | 5 / 24 |
| recalls | 12, all flawed | 24 (13 fill-in, 7 classify, 3 match, 1 reorder) |
| quiz | 25 | 28, three unpinned first for the pre-test |
| practice | 5 | 11, all eight Business command words at Unit 2 census tariffs |
| diagrams | **0** | **8** (11 views) |
| flashcards | 24, 3 duplicated | 34, every front and back distinct |
| common mistakes | 5 | 7 |
| extras | 3 chains | 4 chains + 2 evaluation points |

**The arithmetic spine** is one wholesaler's two statements, authored on Appendix 9
(`bus_spec.txt:2397-2455`) rather than on a textbook: revenue $2,000,000 · cost of sales $1,300,000 ·
other operating expenses $500,000 · interest $40,000 → gross $700,000 (35%) · operating $200,000 (10%) ·
profit for the year $160,000 (8%); current assets $400,000 against current liabilities $250,000 → working
capital $150,000, current ratio 1.60:1, acid test 0.64:1, **and $10,000 in the bank**. Every margin, ratio,
liquidity move and cause of failure is computed from those figures by `_packet36-util.mjs` and asserted by
the runner. **There is no tax line**, because the specification's own statement has none.

### Files

| file | what |
|---|---|
| `scripts/_packet36-util.mjs` | the spine, the formatters, the specification's lists, `BANNED_ELSEWHERE`, `TEACHING_TERMS` |
| `scripts/_packet36-content.mjs` | 5 blocks, 24 subsections, 24 recalls, 5 notes topics |
| `scripts/_packet36-assessment.mjs` | 28 quiz, 11 practice, 34 flashcards, 7 mistakes, extras |
| `scripts/_packet36-diagrams.mjs` | 8 diagrams from zero |
| `scripts/packet-36-managing-finance.mjs` | the runner: every check, the A/Bs, the staging |
| `audit/runs/packet-36/verify-draft.mjs` | the independent read-back of the `draft` column |

---

## Rule 1 — what the ledger got wrong, checked against the spec by WORDING

**`structure-01` is refused on its remedy, and six more items repeat its error.** It says the meta number
"2.3.3 / Managing Finance" does not match the IAL structure because "2.3 is Managing finance with 2.3.1
Profit, 2.3.2 Liquidity, 2.3.3 Business failure". **That is UK GCE numbering and it does not exist in this
specification.** `bus_spec.txt:921` is the heading "2.3.3 Managing finance"; `:885` is "2.3.2 Financial
planning" (packet 31) and `:840` is 2.3.1 (packet 19). Profit, Liquidity and Business failure are
sub-topics **1, 2 and 3 inside 2.3.3**, at `:925`, `:935` and `:943`. `specGap-01` to `-06` all carry the
same wrong numbers in their own text — this is the 154-item class MEMORY records, arriving six at a time.
The section's number and title are the specification's own and are kept. **The real defect underneath the
finding is fixed**: the live block titles did not follow the specification's sub-topics and now do. The
runner asserts all of this against `spec-items.json`, in both directions, so a renumber fails the build.

**`topFix-01`'s "10/12-mark Assess" is refused against the census.** `bus_spec.txt:2238-2245` prints
"10 [Units 1/2]" and "12 [Units 3/4]". This is WBS12, so Assess is 10 and only 10. The prose-tariff check
refuses a 12-mark question anywhere in the section, not only in a practice item.

**`specGap-03`'s "depreciation" is refused, and it is the packet's sharpest rule-2 case.** The word occurs
**once** in `bus_spec.txt`, at `:1016`, where it means *a fall in the exchange rate* — and exchange rates
are a leaf of this very section at `:954`. Teaching an accounting depreciation the specification never
names, under a word it uses for something else two chapters later, is the defect rule 2 exists to stop.
The other three mechanisms `specGap-03` asks for (credit sales, capital purchases, loan repayments) are
taught, in the specification's own vocabulary, plus supplier credit.

**`topFix-05`'s Carillion example is removed rather than corrected.** The finding is right that the live
text calls the firm "profitable on paper" when it was loss-making. A dated claim about a real firm's
accounts cannot be checked by this programme, so packet 15's rule applies: keep the shape, drop the claim.
The misconception it carried is real and is now taught from the spine's own figures — $160,000 of profit,
$10,000 in the bank, $250,000 falling due — where every number is derivable.

**`structure-10` asked for no action and got none, deliberately.** The difficulty ramp it approves
(calculate → interpret → cash → liquidity → failure) is the block order here. Its step-pairing complaint
cannot arise at all, because one subsection is one step (packets 16 and 17).

## Rule 2 — the vocabulary check, run before a word was written

Five families banned, each with the line that settles it, each A/B'd against a string it must catch and one
it must not:

- **gearing, ROCE, ratio analysis** — `3.3.2 · 2`, `:1229-1236`, Unit 3. This is `practice-01` and
  `practice-02`, both already confirmed by packet 0.
- **asset turnover, dividend yield** — **0 hits** in the whole specification.
- **break-even, contribution, margin of safety, variance analysis, cash-flow forecast, zero based** —
  2.3.2, `:885-914`, built by packet 31. Packet 31 REMOVED two subsections from that section because they
  taught *this* one's leaves (`Improving Cash Flow` and `Profit and Loss`, DECISIONS 17 September); both
  are now taught here, which closes that handoff.
- **stock, debtors, creditors, turnover, bare "profit and loss account"** — Appendix 8, `:2299-2304`:
  "The assessments will use the International Accounting Standards terminology." One declared exemption:
  a string may use the UK GAAP words if it also cites Appendix 8, because a student taught from a UK
  textbook needs the mapping and a flat ban would delete the sentence that gives it.
- **depreciation, amortisation** — see above.

---

## Per ledger id, with file:line

Line numbers are the staged source; the figures are in the `draft` column and the verifier reads them from
there rather than from these files.

### topFix

| id | what changed | where |
|---|---|---|
| `topFix-01` | Practice set rebuilt from 5 to 11. Gearing and the ROCE/asset-turnover/dividend-yield items deleted. Added: `Calculate (4)` current and acid test ratios **from a supplied statement of financial position**, `Explain (4)` why a profitable firm's bank balance falls, `Assess (10)` the internal causes of a failure, `Evaluate (20)` liquidity against profitability. Every Assess and the Evaluate carry level bands naming the judgement. "10/12" refused: Unit 2 is 10. | `_packet36-assessment.mjs:205-300` |
| `topFix-02` | All 13 fill-ins rebuilt with semantic hints; the runner refuses any hint that is a prefix of its answer and A/Bs the live `Sal__`/`dir___` defects directly. The duplicate income-statement reorder is gone — the ladder is taught once and the step that prints it carries a classify instead, because a reorder there would have its answer on screen. The external-causes reorder is now a genuine causal chain (shock → gap → cushion → closure) sourced from an extras chain, plus an internal/external classify. | `_packet36-content.mjs` throughout; runner `scripts/packet-36-managing-finance.mjs:348-412` |
| `topFix-03` | Four new teaching subsections: `statement-of-financial-position`, `working-capital`, `profit-is-not-cash`, `operating-profit-margin`. The IAL labels "statement of comprehensive income" and "profit for the year" are introduced and used. The conflation sentence is gone. | `_packet36-content.mjs:258-296` (operating profit margin), `:389-425` (profit vs cash), `:427-461` (statement of financial position), `:463-496` (working capital) |
| `topFix-04` | Quiz rebuilt to 28. No stem asks for net profit on data without interest. The working-capital claim is replaced by the arithmetic that refutes it. No near-duplicate stems (checked at `quiz.near-dup`'s own Jaccard). No essay-command stems. Keys dealt from a hash of each stem; the histogram and the longest-option rate are measured and asserted. Pins **derived** from each item's `block` tag rather than re-mapped by hand. | `_packet36-assessment.mjs:76-203`; runner `scripts/packet-36-managing-finance.mjs:589-640` |
| `topFix-05` | Carillion removed (above). The liquidity contradiction resolved (below). **Two diagrams the finding names, plus six more**: the profit waterfall and the working capital cycle are both built, from zero. | `_packet36-diagrams.mjs` |

### accuracy, quiz, practice

| id | what changed | where |
|---|---|---|
| `accuracy-01` | The three profits are three functions of one statement in `_packet36-util.mjs`, so a surface can only print a figure the ladder produces. "Net profit (also called operating profit…)" is gone; the section says operating profit is before interest and that profit for the year and net profit are one line. The phrase survives once, as a mistake card's quoted exhibit, refuted on the same card — the verifier asserts exactly one use and that it is that one. | `_packet36-util.mjs:141-147`, `_packet36-assessment.mjs:308-313` |
| `quiz-01` | The Q15 defect is unrepresentable: one quiz item now asks explicitly what the largest profit workable from interest-free data is, and answers "operating profit". | `_packet36-assessment.mjs:95-99` |
| `practice-03` | The liquidity Assess is rewritten with a scaffold opening and **Level 1-4 bands**, the top level naming the supported judgement the census requires at `:2244-2245`. "No explicit judgement mark" is gone; the runner refuses the phrase and refuses any Assess guidance without "judgement". | `_packet36-assessment.mjs:255-262` |

### structure

| id | what changed |
|---|---|
| `structure-01` | Refused on its remedy, fixed underneath (above). Blocks now follow sub-topics 1, 2, 3. |
| `structure-02` | One subsection is one step, so the back-to-back pair cannot arise; the verifier asserts no two subsections carry the same recall. |
| `structure-03` | Exactly the split the finding proposes: Block 1 profit calculations + the statement of comprehensive income; Block 2 the three margins + the two "ways to" leaves. |
| `structure-04` | Pins derived from each item's `block` tag. Every block has a quiz, a practice item and a diagram; no practice item is orphaned; `quizIndices` is not the identity mapping. |
| `structure-05` | Both missing items exist: `Assess (10)` on internal causes and `Calculate (4)` on the two ratios from a statement. |
| `structure-06` | 8 diagrams from 0, including the two it names. The flashcard cycle chain now has its counterpart in `content[]` **and** a drawn loop. |
| `structure-07` | Every surface is generated from one module and the runner fails the build if a quiz item or a flashcard names a term no subsection teaches — checked in both directions. |
| `structure-08` | Flashcard ids are a hash of the front, so a duplicate front collides and the id check fails the build. Fronts and backs both asserted distinct. |
| `structure-09` | The contradiction is resolved in favour of the specification: `:939` names "assets" first among the ways to improve liquidity, so selling an underused asset is **taught**, with the $120,000 it raises and the capacity it costs. Nothing forbids it anywhere. |
| `structure-10` | No action, deliberately (above). |
| `structure-11` | The "having a good idea is enough" filler is not carried over; the verifier asserts its absence. The seven mistakes are each a specific wrong sentence with the arithmetic that refutes it. |
| `structure-12` | Systemic: no hint is a prefix of its answer and none uses underscores. 13 fill-ins, 0 prefix hints, asserted against the `draft` column. |

### specGap and specThin

| id | requirement, by wording | where taught |
|---|---|---|
| `specGap-01` | operating profit margin (`:932`) | `operating-profit-margin`, its own step |
| `specGap-02` | statement of comprehensive income (`:930`), profit for the year (`:928`) | `statement-of-comprehensive-income`, `profit-for-the-year` |
| `specGap-03` | distinction between profit and cash (`:935`) | `profit-is-not-cash`, with a six-line reconciliation landing exactly on the $10,000 closing balance |
| `specGap-04` | statement of financial position (`:936`) | `statement-of-financial-position` + a labelled diagram with the two totals ringed and the non-current lines greyed out |
| `specGap-05` | working capital and its management (`:941`) | `working-capital` + `the-importance-of-cash` + the drawn cycle |
| `specGap-06` | poor marketing (`:948`), poor quality (`:949`) | `internal-causes-marketing-and-quality`, each priced on the statement |
| `specGap-07` | **ANSWERED, not hedged.** Unit 2's own description (`:816-821`) says students must apply the Appendix 9 ratios and that "**These ratios will not be supplied in the examination**". The statement is given; the formula is not. Taught explicitly and practised at `Calculate (4)`. | `the-current-ratio`, `the-acid-test-ratio`, practice 6 |
| `specThin-01` | overestimation of sales (`:945`) | defined, priced, and linked to inventory control |
| `specThin-02` | poor inventory control (`:947`) | defined both ways (too much, too little), linked to inventory JIT |
| `specThin-03` | interest rates (`:955`) | the only cause in 3b that leaves operating profit untouched, which is why the ladder has three rungs |

**The four the coverage audit found missing entirely are all taught**: factoring (`:940`), exchange rates
(`:954`), supplier problems (`:957`), natural phenomena (`:958`).

---

## Three things this packet found that no finding names

1. **The four ways to improve liquidity have four different signatures, and two of them are counter-intuitive.**
   Extending supplier credit leaves working capital **unchanged** and moves the current ratio DOWN while
   moving the acid test UP, because adding equal amounts to both sides of a ratio drags it towards 1:1.
   Factoring **raises the cash and lowers the acid test**, because one quick asset becomes another minus
   the fee. Both are asserted by the runner, and the second is the clearest proof in the topic that a ratio
   is evidence about being able to pay and is not the same thing as being able to pay. The live section
   taught the four as a list of good ideas.
2. **A 5% price cut halves this firm's operating profit, and a 10% fall in volume does not.** The
   smaller-sounding shock is the worse one, because no cost falls alongside a price. Asserted, and it is
   what makes `competition` a sharper cause of failure than `market conditions`.
3. **Two of the runner's inherited checks were below their own noise floor here, and both were replaced
   rather than tuned.** Packet 35's practice-pin check scores every six-letter word an item shares with a
   block; in a section where every chapter is about one firm's accounts it reported three items mis-pinned
   on the strength of "settle", "measured", "neither" and "growing". It now scores `TEACHING_TERMS` — the
   specification's own vocabulary — which is what a pin is actually about, and it still fires on the live
   gearing question, which names none of them. And the first version of the draft verifier grabbed the
   first "revenue of $…" in the section, which is a **rival firm in a recall prompt** — the recalls were
   deliberately moved off Lantana's figures so they could not be answered by scrolling up — so every
   derived figure was wrong. It now parses the two practice extracts, which are the only places the firm's
   own statements appear as data.

---

## Not done, and why

- **NOT PUBLISHED.** Rule 6. `data` is untouched on all eight tables and the verifier asserts it. The
  command a human runs, after Verify A and Verify B and after the packet 5/7 ship checkpoint:

  ```
  node scripts/publish-section.mjs managing-finance --confirm
  ```

  DECISIONS, 15 September, is the reason it cannot go earlier: `main` cannot render a recall authored to
  the packet-7 contract, and this section has 24 of them.
- **Not committed.** Packets 32-35 are live in this worktree; HEAD moved to `44dfe9e` during this session.
  Files are staged explicitly by name, never `git add -A`.
- **Verify A and Verify B are the next phases.** `node audit/scripts/ledger.mjs unverified 36` reports 30
  claimed and unconfirmed, which is the correct state for a builder to hand over in.
- **Baseline not shrunk.** `validate-content.mjs --baseline --confirm` would record the live section's
  findings as cleared while the rebuild is still in `draft`; it is run after publish, not before.

---

# Verify A round 1 — four rejections, all four accepted

The verifier was right on all four. Nothing here argues with it, and no id is re-claimed that was not
actually changed. Two were real defects in the build; two were items that assert no defect and whose
correct disposition is `wont-fix`.

## `topFix-04` — the explanation counted to an option instead of naming it

`_packet36-assessment.mjs`, the interest-rate item. Authored options were
`[pct(F.interestRate), pct(F.gpm), '20%', '2%']` with the key first, and the explanation said the wrong
method "gives **the last figure**". `placeKeys` then deals the key into a position from a hash of the
stem, `QuizTab.jsx:150` and `InlineQuiz.jsx:87` render `options` in array order, and the dealt order came
out `['35%', '20%', '2%', '8%']` with `correctIndex 3`. So the rendered last figure **was the 8% key** and
2% was third: a student who answered correctly was then told that the correct answer comes from dividing
interest by revenue. That is `topFix-04` and `quiz-01` — a question that teaches the wrong method for its
own answer — arriving in the explanation rather than in the stem, which is exactly the place the packet
was not looking.

The fix names every figure by value and counts to nothing:

> The rate is the interest divided by the amount borrowed — $40,000 over $500,000, which is 8%. Dividing
> the interest by revenue instead gives 2%, and 35% is the gross profit margin: a rate on borrowing has
> the amount borrowed underneath it, not the sales.

**Rule 4 — the other fields of the same entry, and the same class everywhere else.** The stem and options
were correct and are unchanged. Reading every other explanation in the bank for the same class found
**three more**, one of them wrong in exactly the same way:

| Where | Was | Now |
|---|---|---|
| "Which action raises the profit amount and lowers every margin?" | "**Only the first** grows revenue and cost of sales together" — the key is dealt, so "the first" is whatever `placeKeys` put there | "Only cutting the price and selling considerably more grows revenue and cost of sales together" |
| "Which of these belongs in cost of sales…" | "— **the last of them** below the operating profit line as well" | "— and **the interest** below the operating profit line as well" |
| "A statement of comprehensive income differs from…" | "…is about **the first** and … about **the second**" | names both statements |
| "The largest profit that can be worked out…" | "**the second of them** gives the operating profit" | "taking the other operating expenses off as well gives the operating profit" |

The second and third of those were *stable* — the non-key options keep their relative order under
`placeKeys`, and the two documents were named in the stem — but they are the same reading habit, and a
check with a judgement call in it is a check that gets the judgement wrong later. The rule is now absolute.

**Made un-occurrable, in two places that find their evidence differently.**
`packet-36-managing-finance.mjs` bans any ordinal inside a quiz explanation, reading the built objects;
`audit/runs/packet-36/verify-draft.mjs` bans it reading the **served `draft` row**, so the order being
judged is the order a student is dealt. One carve-out, a fixed list of time nouns, because "last year's
profit settles no invoices" is about a calendar — A/B'd in both directions, together with the exact string
the verifier rejected and the string that replaced it.

## `structure-02` — the duplicate was at the blank, not at the widget

The named instance (a spaced reorder repeated on the following step) was gone; exactly one reorder is
left, on the failure causal chain. What remained was two consecutive fill-ins whose **second line was
character for character identical** — `Its gross profit margin is ___`, answer `30%` — with `30%` sitting
in step 7's own word bank `{30%, 8%, 22%, 35%, 12%}`. A student who had just answered step 6 got step 7's
second blank for nothing.

The draft verifier could not see it because it compared **whole recall bodies**: two different templates,
set of signatures unique, check green. That is the fourth time in this programme that a check has found its
evidence the same way the thing it checks was built. The unit compared is now the `(blank, answer)` pair.

Step 7's recall is rewritten to the thing its own subsection teaches, splitting the revenue dollar rather
than restating a margin the step before it has just produced:

| | prompt | blanks | answers | bank adds |
|---|---|---|---|---|
| step 6 | rival: revenue $800,000, cost of sales $560,000 | gross profit · gross margin · better or worse | 240 · 30% · less | 560 · 70% · more |
| step 7 | rival: revenue $1,500,000, cost of sales $900,000, other operating expenses $480,000 | cost of sales share · overhead share · operating margin | 60% · 32% · 8% | 40% · 12% |

The three shares sum to the whole dollar, so the arithmetic checks itself; the `40%` distractor is that
rival's gross margin, which is the mistake the blank is for; and the two word banks are disjoint.

Two checks added to the runner and two to the draft verifier: no adjacent pair of steps may share a
`(blank, answer)` pair, a reorder item, a classify item or a match pair, and **no word bank may contain an
answer the previous step has just given**. A/B'd against the exact pair the verifier found and against the
pair that replaced it.

## `structure-01` — wont-fix, cited

Premise refuted against the specification, so there is nothing to make un-occurrable and nothing to claim.
`bus_spec.txt:921` **is** the heading `2.3.3 Managing finance`; `:844` is `2.3.1 Planning a business and
raising finance` (packet 19) and `:885` is `2.3.2 Financial planning` (packet 31); Profit, Liquidity and
Business failure are sub-topics **1, 2 and 3 inside 2.3.3**, at `:925`, `:935` and `:943`. There is no 2.3
holding 2.3.1-2.3.3, so the renumber the item asks for would invent a structure the IAL specification does
not have. `app/business/unit-2/page.js:32` (`ref: '2.3.3'`, `title: 'Managing Finance'`) is already right
and is untouched. Verified by a second route: `grep -n "^\f\?2\.3" audit/raw/bus_spec.txt` prints
`843 2.3 Unit content · 844 2.3.1 · 885 2.3.2 · 921 2.3.3 · 965 2.3.4 · 1009 2.3.5`.

Same disposition as `C-entrepreneurs-leaders-structure-01` and `C-market-failure-specGap-05`. The real
defect underneath — block titles that did not follow the specification's own sub-topics — is fixed and is
claimed under `structure-03`.

## `structure-10` — wont-fix

The item asserts no defect. It records that the OLD step pairing and difficulty ramp are coherent. There is
nothing to make un-occurrable, and the rebuild deleted the pairing it praises: one subsection is one step,
24 of them. Same disposition as `C-business-objectives-strategy-structure-07` and
`C-globalisation-structure-09`.

## State after round 1

- `node scripts/packet-36-managing-finance.mjs` exit 0 · re-`--stage`d, because two modules changed
  (PROTOCOL gate step 5).
- `node audit/runs/packet-36/verify-draft.mjs` exit 0 — **168 checks** against the `draft` column, up from
  163; `data` still untouched on all eight tables and `published_at` unchanged.
- `npm test` 187/187 · `npm run build` exit 0 · `npm run validate` exit 0, 0 new BLOCK / 0 new DEBT.
- Read back independently of both checks: the served draft row prints the dealt options
  `35% · 20% · 2% · 8%` with the key at index 3 and an explanation that names 8%, 2% and 35% by value, and
  the two consecutive fill-ins share no blank, no answer and no bank entry.
- Ledger: `structure-01` and `structure-10` **wont-fix** with the citations above; `topFix-04` and
  `structure-02` back to **claimed** for Verify A round 2. `ledger.mjs unverified 36` reports those two,
  which is the correct state to hand over in.
- Still **NOT PUBLISHED**, still **not committed**; files staged explicitly by name.
