# Packet 52 brief — role-state-macroeconomy (IAL Economics 4.3.5)

Produced by the Brief phase. **This file contains no measurements, test results, or verification
claims.** Everything below is either (a) a ledger claim, quoted as a claim, (b) a quote from
`audit/raw/econ_spec.txt` or another handoff file, or (c) a count I produced by running a command —
the command is always shown next to the number.

## 0. What I read, and one documentation gap

Read in full or by targeted grep: `audit/PROTOCOL.md`, `audit/SESSION-PROMPT.md`, `audit/PROGRESS.md`
(row 52 and the header), `audit/DECISIONS.md` (Settled list, full-text search for
`role-state-macroeconomy`, `crowding out`, `Laffer`, `transfer pricing`), `audit/CONTENT-GATE.md`
(the recall contract and Layer 1's blocking rules), `audit/raw/econ_spec.txt:1824-1893` (4.3.5 verbatim,
both pages), `audit/raw/spec-coverage.json`'s `economics__role-state-macroeconomy` entry, all 29 open
ledger items via `node audit/scripts/ledger.mjs show <id>`, the live content file
`audit/content-sections/economics__role-state-macroeconomy.json`, and `lib/ial-marking.js` /
`lib/ial-commands.js` for the command-word/tariff whitelist.

**Gap found, not a contradiction:** `grep -n "^## Packet 52" audit/NEXT.md` returns nothing — there is
no `## Packet 52 spec` block. `grep -n "packet 52" audit/NEXT.md` (case-insensitive) returns exactly
two hits, both single-sentence cross-references from *other* packets' spec blocks (packet 37's
`national-income` spec, line 2187, and the same content restated near line 9418-ish is not present —
checked again, only the one hit at 2187), not a dedicated section. This is consistent with
`PROGRESS.md` row 52 (`| 52 | role-state-macroeconomy | 8 | not started | | | |` — no commit, no
snapshot, no validator) and with the ledger (`packet 52` and `packet 52 --open` return the identical 29
ids — nothing has been claimed or confirmed yet): **no one has authored this packet's spec yet, so
there is nothing to contradict.** I did not pick a summary in place of it; I built this brief from the
ledger, `spec-coverage.json`, the raw spec text, `DECISIONS.md`'s Settled entries, and two other
packets' `NEXT.md` blocks that name 4.3.5 by line number, all cross-checked against each other below.
The newest `## Handoff` in `audit/NEXT.md` (the last one in the file, "packet 12.75 closed (brain)")
does not mention packet 52 at all — its own "next unclaimed packet" list stops at packets 47-51. That
list not naming 52 is not a contradiction either; it is simply an older queue snapshot that predates
this run.

**Self-check worth carrying forward:** that same newest Handoff records that a *previous* computed task
brief for packet 12.75 asserted two ledger items that did not exist when checked (`grep`/`ledger.mjs
show` came back empty), and flags that as worth investigating "before trusting the next one the same
way" — i.e. this brief. Every claim below that is not a direct quote from a file is something I ran a
command against; none of the 29 ids or spec lines cited here were taken on faith from a prior summary.

## 1. Section identity and spec text (verbatim)

`meta` read from the live content file: `{"id":"role-state-macroeconomy","number":"4.3.5",
"title":"The Role of the State in the Macroeconomy","subject":"economics","unit":4,"unitCode":"WEC14"}`.

`audit/raw/econ_spec.txt:1824-1893`, verbatim, is the entire spec point. Quoting it in full because
Rule 1 says never trust a paraphrase or a ledger-cited number:

```
4.3.5 The role of the state in the macroeconomy

 1 Public expenditure    a) The distinction between capital expenditure, current expenditure
                            and transfer payments.
                         b) Reasons for the changing size and pattern of public expenditure
                            in an international context:
                           - changing incomes
                           - changing age distributions
                           - changing expectations.
                         c) The significance of differing levels of public expenditure as a
                            proportion of GDP on:
                           - productivity and growth
                           - crowding out
                           - levels of taxation.
 2 Taxation              a) The distinction between, and examples of, direct and indirect
                            taxes.
                         b) The distinction between progressive, proportional and regressive
                            taxes.
                         c) The economic effects of changes in direct and indirect tax rates
                            on:
                           - incentives to work
                           - tax revenues: Laffer curve analysis
                           - income distribution
                           - real output and employment
                           - the price level
                           - the trade balance
                           - FDI flows.
 3 Public sector         a) The distinction between:
   borrowing and           - fiscal deficits and fiscal surpluses
   public sector debt      - automatic stabilisers and discretionary fiscal policy
                           - a fiscal deficit and the national debt
                           - structural and cyclical fiscal deficits.
                         b) Factors influencing the size of fiscal deficits and national debts.
                         c) The significance of the size of fiscal deficits and national debts:
                           - impact on interest rates
                           - debt servicing
                           - intergenerational equity.
 4 Macroeconomic         a) How governments use fiscal policy, monetary policy, exchange-
   policies                 rate policy, supply-side policies and direct controls to:
                           - reduce fiscal deficits and national debts
                           - control the rate of inflation
                           - respond to external shocks in the global economy
                           - reduce poverty and inequality.
                         b) Use of demand-side policies in response to the global financial
                            crisis of 2008.
                         c) Measures to control TNCs:
                           - to reduce tax avoidance
                           - the regulation of transfer pricing
                           - limits to government ability to control TNCs.
                         d) The impact of policy changes on:
                           - local economies
                           - national economies
                           - the global economy.
                         e) Problems facing policymakers when applying policies:
                           - inaccurate information
                           - risks and uncertainties
                           - inability to control external shocks.
```

**Note on the ledger's own numbering.** The 29 ledger ids label things `4.3.5(a)/(b)/(c)/(d)`, mapping
a→Public expenditure(1), b→Taxation(2), c→Public sector finances(3), d→Macro policies(4). That is a
different letter scheme from the spec's own `1a/1b/1c`, `2a/2b/2c`, `3a/3b/3c`, `4a-4e` — both use the
letters a-d/a-e but for different things. Per Rule 1 I matched every item by wording against the block
above, not by either number, and note the mapping below so the build session does not mix the two
schemes.

## 2. Counts, each with the command that produced it

- **29 open ledger items, 0 claimed, 0 confirmed.**
  `node audit/scripts/ledger.mjs packet 52` and `node audit/scripts/ledger.mjs packet 52 --open` both
  return the same 29 ids (output saved: `audit/runs/packet-52/ledger-packet-52.txt`,
  `ledger-packet-52-open.txt`).
- **Kind breakdown** (`awk` over the full `ledger.mjs show` dump, `ledger-show-all.txt`): 5 `topFix`,
  1 `accuracy`, 1 `practice`, 8 `structure`, 12 `specGap`, 2 `specThin` = 29.
- **Live content shape**, read directly from the file's own `meta` object (a method independent of the
  ledger text): `blocks: 2, subsections: 4, quiz: 12, practice: 5, diagrams: 5, flashcards: 18, notes: 4,
  reorder: 0, fillin: 0, extrasChains: 4, extrasEval: 3`. `common_mistakes.length === 4` (this field is
  not in `meta`, counted separately). Neither `content[0]` nor `content[1]` carries a `diagramRef`,
  `quizIndices` or `practiceIndices` key at all (checked with `Object.keys` on both blocks) —
  confirms `structure-02`'s claim by a method other than reading the ledger's own description of it.
- **`spec-coverage.json`'s count for this section**: `covered: 7, thin: 8, missing: 13` → 28 total.
  **Independently recounting the spec text itself** (section 1: 1a has 3 sub-items [capital, current,
  transfer], 1b has 3, 1c has 3 = 9; section 2: 2a is 1, 2b has 3 [progressive/proportional/regressive],
  2c has 7 = 11; section 3: 3a has 4, 3b is 1, 3c has 3 = 8; **9+11+8 = 28, exactly matching the JSON's
  total with nothing left over for section 4.** Section 4 (`4a`-`4e`) contributes **zero** items to
  `spec-coverage.json`'s 28 for this section, counted a third way: every one of the 7 "covered" items
  is independently identifiable from sections 1-3 alone (1c/crowding-out, 2b/progressive,
  2c/incentives+Laffer+income-distribution+real-output-employment, 3c/interest-rates = 1+1+4+1 = 7).
  **This means the `missingItems`/`thinItems` arrays this brief was told to treat as candidates never
  assessed section 4 at all** — see 4.3 below.

## 3. The 29 ledger items — wording checked against the spec text above, not against the number cited

### topFix (5) — the rebuild's own shape

- **`C-role-state-macroeconomy-topFix-01`** — rewrite `content[]` into three blocks (Public
  expenditure+taxation; Public sector finances; Policy in a global context) and move public/merit goods
  out. **Scope check: correct.** Public goods (`content[0]` "Public Goods") and merit goods
  (`content[0]` "Merit Goods and Redistribution") are 0 hits as spec vocabulary anywhere in 4.3.5;
  "public goods" and "moral hazard" both appear under a *different*, earlier spec point headed "Market
  failure" (`econ_spec.txt:723` onward, `#5 Moral hazard` at `:781`), and "merit good" is 0 hits in the
  whole specification (matches `accuracy-01`, below). **Done means:** three blocks, each subsection
  traceable to a lettered spec sub-point in section 1.
- **`C-role-state-macroeconomy-topFix-02`** — wire `diagramRef`/`quizIndices`/`practiceIndices`;
  proposed diagrams `Laffer`/`Tax Incidence` (block 1), `Fiscal Deficit` (block 2), `AD/AS`/`Crowding
  Out` (block 3). **Laffer, Fiscal Deficit, AD/AS and Crowding Out all check out** — each term is a
  0-or-1-hit exact match to 4.3.5's own wording (`Laffer curve analysis` :1847; `crowding out` :1838,
  1c). **`Tax Incidence` does not check out for this section.** `grep -ni incidence
  audit/raw/econ_spec.txt` returns exactly two hits, both at `:713` and `:716`, under a *different* spec
  point: "4 Indirect taxes and subsidies ... b) The incidence of indirect taxes on consumers and
  producers" — the section header at `:723` names the next spec point as `1.3.5 Market failure`, so
  `:713-716` sits in `1.3.4`, already built (`## Packet 24 spec — price-determination, Economics 1.3.4
  ... DONE`, `audit/NEXT.md:5772`). `incidence` is 0 hits inside 4.3.5. The live section already has a
  diagram named `Tax Incidence: Indirect Tax on a Market` (`diagrams[4]`) and a matching quiz item
  (`quiz[10]`, on elasticity and indirect-tax incidence) — this is existing off-spec content sitting in
  this bank, the same class of trap Rule 1 warns about, and this item's own proposal would keep it
  rather than remove it. **Done means:** block 1 gets `Laffer` (and, if a second diagram is wanted for
  tax effects, one drawn from 4.3.5's own vocabulary, not `Tax Incidence`); `diagrams[4]` and `quiz[10]`
  need a decision (move/remove, per the packet-21 precedent for wrongly-homed items) that this brief
  does not make.
- **`C-role-state-macroeconomy-topFix-03`** — add recall widgets (reorder × 2, fillin × 2) using
  sequences already in `extras.chains`. Read `extras.chains` directly: it already contains a Laffer
  chain and a deficit→bond-sales→interest-rate→falling-investment chain, both genuine cause-to-effect
  sequences fitting the `reorder` contract in `CONTENT-GATE.md` ("A genuine sequence: cause to effect...
  Never a ranking, never parallel facts"). **Done means:** `reorder`/`fillin` entries under
  `section.recall`, each with `correctOrder`/`answers`, `why[]`, and a criterion-naming prompt per the
  recall contract; `meta.reorder`/`meta.fillin` move off 0.
- **`C-role-state-macroeconomy-topFix-04`** — fix practice tariffs/formats. Checked every one of the 5
  live practice items against `lib/ial-marking.js`'s `ECONOMICS.tariffs` (the code's own source of
  truth, `Define:[2], Calculate:[2,4], Draw:[4], Explain:[4], Analyse:[6], Examine:[8], Discuss:[14],
  Evaluate:[20]`, `absent:['Assess','Outline']`):
  - `practice[0]` = `Define ... (4 marks)` — wrong, `Define` is 2 only. Matches `practice-01`.
  - `practice[1]` = command field `Explain`, marks field `6`, question text `(6 marks)` — internally
    inconsistent: `Explain` only carries 4. Matches the item's own proposed fix ("4 marks or
    `Analyse (6)`").
  - `practice[2]` = command field `Assess`, marks `10`, guidance is point-marked (`(2 marks)` ×5
    summing to 10). **`Assess` is explicitly in `absent` for Economics and there is no 10-mark tariff
    for any command word in the table** (`tariff-census.json`/`ial-marking.js` agree: 2, 2/4, 4, 4, 6,
    8, 14, 20). `CONTENT-GATE.md` Layer 1 separately blocks point-marking above 6 marks. **The item's
    own instruction — "convert practice[2] ... guidance to levels-based ... descriptors" — fixes the
    marking-scheme-format half but, read literally, leaves `Assess (10 marks)` as the question stem,
    which is still not a valid IAL pairing.** This is the same shape of error `audit/NEXT.md:1820`
    already recorded as **REFUSED** for a sibling packet (`macroeconomic-objectives-policies`,
    `practice-02`: "Assess (10 marks)" → "REFUTED ON THE PREMISE ... No Assess and no 10-mark exist in
    IAL Economics ... The question is rebuilt at an IAL command word rather than converted"). Flagging
    this as a contradiction candidate for the build session, not resolving it myself: `practice[2]`
    needs a command-word-and-tariff decision (e.g. `Examine (8)` or `Evaluate (20)`), not only a
    guidance-format conversion.
  - `practice[3]` = `Evaluate ... (20 marks)`, point-marked. Command/tariff pair is valid; only the
    guidance format needs to move to levels bands, exactly as the item says.
  - `practice[4]` = command field `Outline`, marks `4`. `Outline` is explicitly `absent`. **The item's
    own proposed replacement, `'Distinguish between/Explain'`, is itself unverified**: `grep -ni
    distinguish audit/raw/econ_spec.txt` returns one hit, `QS10 Distinguish between changes in the
    level...`, inside the quantitative-skills worked-example appendix, not Appendix 6's command-word
    table; `grep -n Distinguish lib/ial-commands.js lib/ial-marking.js` returns nothing — it is not a
    key in the code's own whitelist. `Explain` (4 marks, already the item's own marks field, and
    already point-marked at 1-mark-per-point which is fine at ≤6 marks) is the option that is actually
    on the list; `Distinguish between` is not and needs checking against `lib/ial-commands.js` before
    use, not assumed from this item's wording.
  **Done means:** every live practice item's `(command, marks)` pair is a key in
  `ECONOMICS.tariffs`, and any item above 6 marks uses levels-band guidance, not point allocation.
- **`C-role-state-macroeconomy-topFix-05`** — internationalise, remove UK-only framing, cut UBI to one
  sentence. Checked `UBI` / `universal basic income`: 0 hits anywhere in `econ_spec.txt` — genuinely
  off-spec, consistent with `structure-06` below. No scope problem found with this item.

### accuracy / practice (2)

- **`C-role-state-macroeconomy-accuracy-01`** — public/merit goods content belongs to Unit 1 market
  failure, and "merit good" is not IAL vocabulary. Confirmed: `content[0]`'s two subsections are
  literally titled "Public Goods" and "Merit Goods and Redistribution" (read from the file directly);
  `merit good` is 0 hits in `econ_spec.txt`; `public goods` and `moral hazard` both sit under the
  spec's separate "Market failure" point starting `:723`. Scope check: correct, matches `topFix-01`.
- **`C-role-state-macroeconomy-practice-01`** — `practice[0]` `Define ... (4 marks)` is wrong; `Define`
  is 2. Confirmed against `ECONOMICS.tariffs` directly. Correct.

### structure (8) — mechanical/wiring claims, checked against the file's own fields

- **`structure-01`** (content/assessment mismatch, pre/post-test measures nothing taught): confirmed —
  neither content block has `quizIndices`/`practiceIndices`, and the two live blocks (Public
  Goods/Merit Goods; Fiscal-Monetary-Supply-Side/Income Redistribution) do not name most of what the 12
  quiz items test (transfer payments, Laffer, deficit-vs-debt, automatic stabilisers, crowding out,
  structural deficit, transfer pricing, 2008 crisis policy, indirect-tax incidence, minimum-tax OECD
  deal — read from `quiz[].question`, not from the ledger's paraphrase).
- **`structure-02`** (neither block wired): confirmed directly (`Object.keys` on both `content[]`
  entries — only `title`, `sections`, `takeaway`).
- **`structure-03`** (zero recall widgets): confirmed by `meta.reorder === 0` and `meta.fillin === 0`,
  and no `recall`/`reorder`/`fillin`/`classify`/`match` field exists anywhere in the file's top-level
  keys.
- **`structure-04`** (ordering/ramp): a content-authoring judgement call, not independently checkable
  by a static read; leaving as a claim to check when the blocks are drafted.
- **`structure-05`** (fiscal-monetary-supply-side compressed): confirmed the live subsection exists
  (`content[1].sections[0]`, "Fiscal, Monetary and Supply-Side Policies") and that 4.3.5(d)/`4` needs
  five tools (fiscal, monetary, exchange-rate, supply-side, direct controls) plus TNC controls plus
  policymaker problems — that is `4a` + `4c` + `4e`, three of the spec's five `4` sub-points, which is
  more than one paragraph-sized subsection can carry. Matches `topFix-01`'s plan to make this a whole
  block.
- **`structure-06`** (UBI elevated to a takeaway): UBI confirmed 0 hits in spec (see `topFix-05`).
- **`structure-07`** (misconceptions off-target): the four live misconceptions are not in the JSON
  fields I read this pass (not opened); take as an unverified claim to check against whatever the build
  drafts, using the same method (grep the field, don't paraphrase it).
- **`structure-08`** (`notes[]` mirrors `content[]`; flashcards teach untaught terms): confirmed
  directly — `notes[]` titles are "Public Goods and Market Failure", "Merit Goods and Redistribution",
  "Government Macroeconomic Intervention", "Income Redistribution Policies" (mirrors `content[]`
  exactly); flashcard fronts include `"What is a demerit good?"` and `"What is the principal of equity
  in taxation?"` (typo `principal` confirmed present, not the ledger paraphrasing it), and `moral
  hazard` appears both as its own flashcard front and inside another card's back — none of these three
  terms appear in `content[]` or `notes[]` prose.

### specGap (12) and specThin (2) — checked against the spec block in §1, not the ledger's own letters

- **`specGap-01`** (capital/current/transfer, 1a): correct, exact wording match; only present today in
  `quiz[0]`'s explanation per the item, confirmed the quiz item exists and tests exactly this
  (`"Which of the following is classified as a transfer payment?"`).
- **`specGap-02`** (reasons for changing size, 1b — "ageing populations, demand for services, crises"):
  **the parenthetical examples drift from the spec's own three reasons.** Spec 1b names exactly
  `changing incomes`, `changing age distributions`, `changing expectations` — three named drivers, not
  a general list. `ageing populations` ≈ `changing age distributions`; `demand for services` and
  `crises` are not the spec's wording for `changing incomes` or `changing expectations`. **Done means**
  teaching the spec's three named drivers by their own wording, using the ledger's examples as
  illustrations only, not as the definition.
- **`specGap-03`** (significance of PE/GDP, 1c — "productivity and growth, living standards, crowding
  out, level of taxation, equality"): **over-reach found.** Spec 1c lists exactly three:
  `productivity and growth`, `crowding out`, `levels of taxation`. `living standards` and `equality` are
  not in this bullet's wording — `equality` is more plausibly the spec's own `4a`, "reduce poverty and
  inequality" (a macro-*policy* aim), not a property of public-expenditure-as-%-of-GDP. **Done means**
  teaching the three spec-named significances; `living standards`/`equality` should not be presented as
  what this bullet is examined on.
- **`specGap-04`** (progressive/proportional/regressive, 2b): correct, exact match; `quiz[8]` already
  tests regressive taxes per the item, `progressive` is the only one currently taught in prose.
- **`specGap-05`** (2c effects list, 7 sub-bullets): correct, exact word-for-word match to the spec's
  own seven bullets — the strongest-worded item in the set.
- **`specGap-06`** (automatic stabilisers vs discretionary, 3a): correct scope, **and independently
  corroborated by a settled decision in a sibling packet.** `audit/DECISIONS.md`, "2026-09-21 — packet
  38": `automatic stabilisers` is `ECON-4.3.5-3a-2`, Unit 4, "and belongs to role-state-macroeconomy.
  The live section [2.3.6, `macroeconomic-objectives-policies`] teaches it as a full subsection... The
  subsection is removed rather than merged... Whichever packet rebuilds role-state-macroeconomy
  inherits them." That subsection was already stripped from 2.3.6 on the understanding this packet
  builds it properly, with only a pointer sentence left behind there. **Done means** this packet is now
  the sole home for automatic-stabilisers-vs-discretionary content; it can no longer be found taught
  anywhere else in the corpus once 2.3.6's own packet's pointer ships.
- **`specGap-07`** (fiscal deficit vs national debt; structural vs cyclical, both in 3a): correct scope.
  **Overlaps `specThin-02` exactly** — both target the same spec sub-bullet, "a fiscal deficit and the
  national debt" (3a, third bullet). Not a contradiction in substance (both say it's untaught), but two
  ledger ids claim the same leaf; flagging so the build/verify pass does not double-count or accidentally
  close only one and consider the requirement covered.
- **`specGap-08`** (factors + significance of deficits/debt — "interest payments, crowding out, credit
  ratings, intergenerational equity, inflation risk"): **over-reach found, larger than specGap-03's.**
  Spec 3c's significance list is exactly three: `impact on interest rates`, `debt servicing`,
  `intergenerational equity`. `credit ratings` and `inflation risk` are **0 hits** anywhere in
  `econ_spec.txt` (checked directly). `crowding out` is a real spec term but belongs to **1c** (public
  expenditure), not 3c (public debt) — including it here risks teaching it twice in the wrong place or
  displacing `debt servicing`, which the item's own parenthetical omits even though it is one of only
  three things 3c actually asks for. **Done means** 3b (factors — spec names none specifically, general)
  plus 3c's exact three: interest rates, debt servicing, intergenerational equity. `credit ratings` and
  `inflation risk` should not be taught as spec content under this bullet.
- **`specGap-09`** (exchange rate policy + direct controls, 4a): correct scope, exact match to 4a's
  five-tool list.
- **`specGap-10`** (TNC transfer pricing + limits, 4c): correct scope but **incomplete relative to the
  spec** — 4c has three bullets (`to reduce tax avoidance`, `regulation of transfer pricing`, `limits to
  government ability to control TNCs`); the item's own text names only the second and third. **Done
  means** all three, including tax avoidance, which the item does not mention.
- **`specGap-11`** (policymaker problems, 4e): correct scope, close match — spec says "inability to
  control external shocks", the item says "external shocks"; same substance.
- **`specGap-12`** ("unsure" re: loanable-funds crowding-out diagram): the spec names the concept
  `crowding out` (1c) but does not name a diagram type. The loanable-funds market diagram is one common
  way to teach it but is not itself spec vocabulary; `AD/AS` is safer as the item itself suggests. Also
  relevant: `audit/DECISIONS.md`, "2026-09-25 — packet 2.91" records that the *live, currently-published*
  chapter 1 diagram for this section is "Crowding Out in the Loanable Funds Market" placed there by a
  title-word match, not a content decision, and that the corrected decision (drop it) is **staged on
  this branch but not yet merged to main** — background only; this brief does not verify current live
  behaviour and makes no claim about what production shows today.
- **`specThin-01`** (fiscal deficits vs surpluses, 3a): correct, exact spec match, no other ledger item
  covers this specific sub-bullet.
- **`specThin-02`** (fiscal deficit vs national debt, flow vs stock, 3a): correct, exact spec match —
  see the `specGap-07` overlap note above.

## 4. Gaps found independently, not on the ledger

**4.1 — `4.3.5-4b`, the 2008 global financial crisis, has zero ledger coverage despite three
independent confirmations that it belongs here and is already being examined.** (1) The spec text
itself, verbatim: `"b) Use of demand-side policies in response to the global financial crisis of
2008."` (2) `audit/DECISIONS.md`/`audit/NEXT.md:1820`, packet 38's Settled entry: a sibling packet's
`specGap-04` claimed "2008 GFC" for its own section (`macroeconomic-objectives-policies`, 2.3.6) and was
**REFUSED** there specifically because `2008` is a single hit at `:1880`, "4.3.5 · 4b ... Unit 4, owned
by `role-state-macroeconomy`" — i.e. this packet, by name, in another packet's own settled record. (3)
The *live* content file already has `quiz[7]`: `"Which of the following was NOT a key policy response
to the 2008 finan[cial crisis]..."` — the assessment already tests this leaf, unwired to any teaching,
same defect shape as `structure-01`. None of the 29 ledger ids name `2008` or "financial crisis"
(checked: `grep -ni "2008\|financial crisis\|GFC" ledger-show-all.txt` → no output). This is a
genuine candidate gap, surfaced by reading the spec directly (a different method from the ledger and
from `spec-coverage.json`, which — see 4.3 — never scored section 4 at all).

**4.2 — `4.3.5-4d`, impact of policy changes on local/national/global economies, also has zero ledger
coverage.** Same method: 0 hits for "local econom", "national econom" or "impact of polic[y]" across
the 29 items. No corroborating settled decision found for this one (unlike 4b); flagging it as a plain
spec-reading gap only.

**4.3 — `spec-coverage.json` never assessed spec point `4` (Macroeconomic policies) for this section at
all.** Shown in §2: sections 1-3 alone account for all 28 of the JSON's `covered+thin+missing`, with
nothing left over for `4a-4e`. This means the brief's instructed source for candidate gaps
(`missingItems`/`thinItems`) structurally could not have surfaced 4.3.5-4b or 4d — they were never in
its scan. `specGap-09`, `-10`, `-11` (4a, 4c, 4e) exist only because a human/earlier-pass structural
review added them separately; 4b and 4d fell through both nets. This is a fact about the audit tooling,
counted by re-deriving the spec's own bullet totals by hand and cross-checking the arithmetic against
the JSON's stated totals — not an assertion that the tool is "wrong" in general, just that it did not
reach this spec point's fourth numbered item for this section.

**4.4 — existing `common_mistakes[]` (Exam Tips) content is already accurate and on-spec, but sits
outside `content[]`.** Read directly: `common_mistakes[0]` ("Confusing fiscal deficit with national
debt"), `[2]` ("Confusing structural and cyclical deficits") and `[3]` ("Ignoring crowding out...")
already state the correct distinctions cleanly. This does not contradict `specGap-07`/`specThin-01/02`
— those items already say the material is "absent from content" and name where it *does* exist
(diagrams/quiz/practice), consistent with treating Exam Tips as not the same as the taught `content[]`
flow — but it means the rebuild has good raw material to adapt for the prose rather than writing these
explanations from nothing, and the exam-tips text should be checked for consistency once `content[]`
states the same distinction, per Rule 4 (read the field beside the one you were shown).

## 5. Contradictions and decisions this brief is not making

1. **`topFix-04`'s instruction for `practice[2]`** ("convert guidance to levels-based descriptors")
   risks reproducing the exact `Assess (10 marks)` error a sibling packet's ledger item already had
   REFUSED and rebuilt at a valid command word (`audit/NEXT.md:1820`). The command word and tariff, not
   only the guidance format, need to change. Which valid pairing to use (`Examine`/8 vs `Evaluate`/20,
   and whether the question stem needs rewriting to fit) is a scope decision, not something this brief
   should pick.
2. **`topFix-04`'s proposed `practice[4]` command word, `Distinguish between`, is not in the IAL
   Economics whitelist** (`lib/ial-marking.js`, `lib/ial-commands.js`) and its one spec occurrence is a
   quantitative-skills worked-example label, not a graded command word. `Explain` (already `practice[4]`'s
   marks field, 4) is on the list; using it instead is very likely the intended fix but is a build
   decision, not asserted here as settled.
3. **`specGap-07` and `specThin-02` name the identical spec sub-bullet** (3a, fiscal deficit vs national
   debt). Not a disagreement — just duplicate ledger coverage the build/verify pass should be aware of
   so closing one is not mistaken for the other being separately unaddressed.
4. **`topFix-02`'s `Tax Incidence` diagram, and the live `diagrams[4]`/`quiz[10]` it would keep, test
   vocabulary (`incidence`) that is 0 hits inside 4.3.5 and belongs to the already-built 1.3.4
   (`price-determination`, DONE per `audit/NEXT.md:5772`).** Whether to delete, move, or leave these two
   items in place (and if left, on what defensible spec ground) is a scope decision for whoever builds
   this packet, following the packet-21 precedent of removing rather than moving wrongly-homed items
   whose owning section's bank was already rebuilt.

None of the four points above are disagreements *between* `PROTOCOL.md`, `PROGRESS.md`, `DECISIONS.md`
and the ledger — those four are mutually consistent (packet 52, `role-state-macroeconomy`, 29 open
items, not started, no commit). They are candidate corrections inside the ledger's own claims, which is
exactly what step 3 of this brief's instructions asked to check for, not resolve.
