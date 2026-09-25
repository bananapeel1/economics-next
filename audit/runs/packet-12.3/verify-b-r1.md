# Packet 12.3 — Verify B, round 1 (re-walk after the scoped fix round)

Role: first-time IAL student, signed out, phone. Nothing was fixed or edited by this run.

Setup, done by this run before anything was looked at: port 3001 was held by two processes
(PIDs 28224, 70110) left from the previous round; both were killed by port (`lsof -ti tcp:3001 |
xargs kill -9` — `pkill -f "next start"` does not match `next-server`), the port was confirmed
clear, then `remediation-dev` was started fresh (serverId `b8f96e66…`, `reused: false`). So nothing
below is a stale build. Viewport **390×844**, asserted `innerWidth` = 390, `innerHeight` = 844,
dpr 2. `localStorage` cleared and asserted `length` = 0 before the first navigation. Every overlay
measured was opened by a real tap, not `element.click()`.

**Scope of this round.** The only defect in scope was the missing annotation legend and the chip
contrast (defect 1 of `verify-b.md`). The other three were deliberately left in place; they are
confirmed still present in one line at the bottom and are not counted against this round.

---

## Scripted actions

**Section: `/economics/market-failure-model-answers`**

- step 1: Page loads 200. Title and `<h1>` "Market Failure — Exam Questions & Model Answers", header band
  "ECONOMICS · WEC11 · UNIT 1 · 1.3.5", "3 written questions · 32 marks" — **PASS** (unchanged from round 0)
- step 2: 11 `<details>`, all SSR'd, `<details open>` = 0 on arrival — **PASS** (no regression from the fix)
- step 3: Real tap on "Model answer — 4 / 4" opens it. Directly above PARA 1, inside the same
  `<details>`, a bordered block headed **"WHAT THE MARKS IN THE MARGIN MEAN"** listing
  `K Knowledge/Definition`, `E Example`, `A Application` — **PASS**, this was the round-0 blocking FAIL
- step 4: Real tap on "Model answer — 5–6 / 8" opens a legend reading `K Knowledge`, `A Application`,
  `An Analysis chain`, `D Diagram ref.` — **PASS**. Screenshot taken; the block renders as four
  chip+label pairs on two rows, 274px wide inside a 390px viewport, nothing clipped
- step 5: Every chip code printed in an answer body is named by the legend **in that same `<details>`**.
  Across the page: 4 legends, 4 answer blocks, `missing` = 0 for every block — **PASS**
- step 6: All five codes **K / A / An / E / D** appear on this page and all five are decodable — **PASS**,
  this is the decode check the round was asked for
- step 7: `document.documentElement.scrollWidth` = 390 = `innerWidth`, 0 elements past the right edge — **PASS**

**Chip contrast — measured, not assumed** (viewport width 390px, chip font-size 10px, weight 700,
18×18px; ratios are my own WCAG 2.x maths on `getComputedStyle` colour against the walked-up
effective background, computed in the page after a real tap)

| chip | dark: bg | dark: text | dark ratio | light: bg | light: text | light ratio |
|---|---|---|---|---|---|---|
| K  | rgb(124,176,255) | rgb(16,19,26) | **8.42:1** | rgb(29,78,216)  | #fff | **6.70:1** |
| A  | rgb(251,191,36)  | rgb(16,19,26) | **11.13:1** | rgb(154,71,8)  | #fff | **6.40:1** |
| An | rgb(74,222,128)  | rgb(16,19,26) | **10.66:1** | rgb(3,106,77)  | #fff | **6.62:1** |
| E  | rgb(74,222,128)  | rgb(16,19,26) | **10.66:1** | rgb(3,106,77)  | #fff | **6.62:1** |
| D  | rgb(196,181,253) | rgb(16,19,26) | **10.07:1** | rgb(109,40,217)| #fff | **7.10:1** |

Round 0 measured the same chips at **1.81 – 4.23:1** (white text on the light fills). Every chip now
clears AA 4.5:1 in both themes, worst case 6.40:1. The chip-vs-surrounding-surface ratio is 8.66 –
11.45:1 in dark and 2.69 – 2.98:1 in light, so the pill is still findable in the prose in both.

Residual, cosmetic, non-blocking: **E and An still share one green** (rgb(74,222,128) dark,
rgb(3,106,77) light) in both themes. Round 0 called this out because colour was then the only
separator a student had. It no longer is — the letter is legible at 10.66:1 and both codes are
spelled out in the legend of any answer that uses them — so it is now a polish item, not a decode
failure.

**Section: `/economics/labour-markets-model-answers`**

- step 8: Loads 200, "Section 3.3.4", "2 written questions · 12 marks", back-link "← Unit 3: Business
  Behaviour" — **PASS**
- step 9: Real tap on "Why this loses marks — a mid-band attempt at the same question" opens the panel;
  it carries its own legend (`K Knowledge`, `A Application`, `An Analysis chain`) above PARA 1 — **PASS**,
  the fix reached the mid-band panel and not only the model answers
- step 10: "Practise Labour Markets →" (`/?section=labour-markets`) resolves 200 onto Labour Markets,
  Unit 3, correct section content — **PASS**, no regression in the route out of the page

**Section: `/business/the-market-model-answers`** (the empty-state case)

- step 11: Loads 200, subtitle still explains the absence honestly, empty block still explicit — **PASS**
- step 12: 0 annotation chips and **0 legends** — **PASS**. The legend is rendered from the codes the
  answer actually uses, so the one page with no answers correctly gets no key rather than an empty box

**Whole set (all 32 pages, curled from the freshly restarted server)**

- step 13: 32/32 return 200 — **PASS**
- step 14: **31 of 32 pages carry a legend; 95 legend blocks in total.** The 32nd is `the-market`,
  which prints no chips. Round 0 measured `.ma-ann-legend` on **0 of 32** — **PASS**
- step 15: On every one of the 32 pages, the set of chip codes printed in the answer bodies is a subset
  of the codes named in the legends — `missing` = **none**, 32/32. Codes observed: `K, A, An` on 24
  pages, `K, A, An, D` on 6, `K, A, An, D, E` on market-failure — **PASS**
- step 16: `<details open>` = 0 on 32/32 with the RSC flight payload stripped; "Mark scheme" summary
  count equals the question count on 32/32; legend count = model answers + mid-band panel on every
  page — **PASS**, the fix added a block without disturbing the collapse behaviour or the layout

---

## Console errors

**No console errors.** A fresh tab loading all three walked pages plus `/?section=labour-markets`
returned an empty error log.

The old tab's buffer still held round 0's two entries (`components/SectionExamPracticePage.jsx`
module-not-found, `components/LearnModeTab.jsx:203` parse error). Both are **pre-restart residue in
the browser's own buffer, not live**: `SectionExamPracticePage.jsx` does not exist on disk,
`/lab/exam-practice/market-failure` returns 404 and nothing references it; `LearnModeTab.jsx` parses
and `/` and `/economics/unit-1/market-failure` both return 200. Neither reproduces on a clean tab.

## Verdict on the in-scope defect

**Fixed.** A student can decode a K / A / An / E / D chip: every answer block that prints chips carries
a key naming exactly the codes in that block, on 31 of 31 pages that have chips, and the letters are
legible at 6.40:1 or better in both themes at 390px. Nothing new broke — page count, HTTP status,
collapse state, layout width, the practise route and the console are all as good as or better than
round 0.

## The three defects deliberately left — all three confirmed still present, as expected

Mid-band panels still top out in the band the model answer already sits in (labour-markets: model
answer marked 5–6 / 8, panel "cannot reach Level 4 — 7–8 marks … tops out instead Level 3 — 5–6
marks"); **21 of 22** Economics pages still headline "0.0%" (business pages all read a real figure,
34.5% down to 6.7%); and `/business/the-market-model-answers` still titles itself "Exam Questions &
Model Answers" over "0 written questions · 0 marks" and still tells the student to "use the link
above to browse every topic" when no such link exists. None of these is counted against this round.

## One concern outside this round's title, raised not blocked

The **meta chips** (`.lab-chip` — "4 marks", "AO1 · AO2", "5 min") are a different class from the
annotation chips and were **not** in scope. Measured independently in the browser at 390px: 8.24:1 in
dark, **3.20:1 in light** at 12px — below AA 4.5:1. This matches the figure the packet's own verifier
already recorded as a known caveat (`audit/ledger.json:18628`), so it is pre-existing and knowingly
unfixed, not a regression from this fix round.

Worth flagging is *why the gate misses it*: `npm run contrast` reports `pass — nothing below its
threshold` on this tree, while printing "12 rules set white text with no background of their own —
their fill comes from a sibling rule or a JSX inline style, so only the browser can score them."
`.lab-chip` is in that unscored remainder. A green gate here is not evidence of contrast; the browser
measurement is. The annotation-chip figures in this report were taken the same way, in the rendered
page, for that reason.
