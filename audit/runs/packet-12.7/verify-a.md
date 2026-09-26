# Packet 12.7 — Verify A (packet-verifier, fresh context)

Date: 2026-09-26. Inputs: `ledger.mjs unverified 12.7` (E039, E042, E043, E044), `git diff` + `git diff --cached`,
`audit/specs/packet-12.7.md`, DECISIONS 2026-09-22 (x2) and 2026-09-25. `built.md` not read.

Method rule followed: none of the builder's probes was reused. The builder diffed served `<main>` HTML
(`snapshot-pages.mjs`) and mutated a copied file tree (`mutate-ab.sh`) and wrote `drift-check.mjs`. This pass
used (a) module-level props computed from a `git archive HEAD` tree vs the working tree, (b) in-memory
mutation of cloned items fed straight to the exported `checkItem`, (c) a real browser at 390x844 with
computed styles, (d) its own md-vs-bank text normaliser. Scratch scripts live in the session scratchpad only.

## E039 — CONFIRMED

- R7 at `audit/scripts/validate-model-answers.mjs:124-129`: exact-literal check inside the criteria branch;
  runs under `npm run validate`. Bank today: 6 items carry criteria, 57 criteria, 57 have a legal `segRole`;
  validator reports 0 findings.
- Independent A/B: for each of the 57 criteria, a cloned item with that one criterion mutated was passed to
  `checkItem`. Control 0/57 flagged. absent / `undefined` / `null` / `'Missed'` / `'miss'` / `true` / `''` /
  `'earned '` — each 57/57 flagged R7. A role *flip* (earned<->missed) is 0/57, as expected: R7 is a
  literal-shape rule, not a semantic one (see residuals).
- `'missed'` is set on `negative-externality-tax-8` c7/c8 (`data/modelAnswersExpansion.js:585-586`). The generic
  20-mark item's segment notes contain no "did not earn" note, so all-earned there is per spec.
- Rendered at 390x844 on the live dev server (port 3001, cwd = this worktree, served HTML confirmed fresh):
  ticked c5 (earned) and c7/c8 (missed) on the 8-mark. p3a: `border-left-style: solid`, label "EARNED";
  p4a/p4b: `border-left-style: dashed`, label "MISSED — THIS IS WHERE IT GOES". Border colour and label
  colour are identical in both roles (rgb(111,168,255)), so the difference is carried entirely by
  line style + text — no reliance on colour at all. Screenshot confirms the dashed rule is visible.
  `documentElement.scrollWidth` = 390 (no sideways scroll). Code: `components/MarkedScriptAttempt.jsx:40-41,
  204-219`, `components/model-answers-layout.css:426,434`.

## E042 — CONFIRMED

- Other 31 pages: `modelAnswersProps()` + `modelAnswersMetadata()` for all 32 `MODEL_ANSWER_PAGES`, computed
  once against a `git archive HEAD` tree and once against the working tree, JSON-compared: 31 byte-identical,
  only `economics/market-failure-model-answers` differs. The only other 12.7 render changes are gated on data
  those 31 pages do not have: `StimulusBlock` returns null without a stimulus
  (`components/SectionModelAnswersPage.jsx:245`), `MarkedScriptAttempt` renders only for `criteria`
  (`:498`; all 6 criteria items are 1.3.5), `writtenFor` returns `bank` unchanged when no item carries a
  stimulus (`lib/model-answers-route.js:50-51`), and the CSS adds only `.is-missed` / `.lab-script-role`.
- Persistence: in the browser, typed a unique draft into all six 1.3.5 textareas and ticked criteria
  (including both missed ones), reloaded, read back: 6/6 drafts and every tick restored, totals correct,
  script `<details>` re-opened. Storage keyed by `item.id` (`MarkedScriptAttempt.jsx:43-94`); all 69 bank ids
  are unique. localStorage returned to its prior empty values afterwards.
- `spec-coverage`: no `zerocov`; the same 123 pre-existing `tariff` failures as the pre-packet log; questions
  281 -> 284 with the untagged count unchanged at 212. `npm test` 303/303.

## E043 — CONFIRMED

- Items: `data/modelAnswersExpansion.js:171-237` (Define 2) and `:240-327` (Analyse 6), both with `criteria`,
  `script`, `stimulus: 'econ-u1-market-failure'`, `minutes`, and every field the rest of the bank carries
  (field-set comparison: none missing). Every criterion resolves to a segment on its own item; sums 2 and 6.
- Answer text equals the md file's Q1/Q2 answers after normalisation (own comparator), and segment text
  concatenates back to the answer exactly.
- specItems exist in `audit/raw/spec-items.json` and match by wording: 2c-4 "external costs of consumption",
  2b private/external/social costs, 2d-3 market vs social optimum, 1a too much consumed, 2e-4 "environment"
  under 2e "impact of externalities in various contexts".
- Generic items detached: only the three extract items carry `stimulus` (`modelAnswersData.js:290`,
  `modelAnswersExpansion.js:626,770`). B1 disclaimer removed (`SectionModelAnswersPage.jsx:258-264`);
  served 1.3.5 page contains 0 "Read this first".
- Order: `writtenFor` yields 2, 6, 20 (extract), then 4, 8, 20 (generic); served HTML attempt ids in that order.
- Deviation noted, not a defect against the title: the spec asked for the Define second mark to be AO2; the
  builder labelled it "The extract's example" and kept `ao: ['AO1']`, reasoning Appendix 6 Define is
  knowledge-only and `spec-coverage` would raise `specid` otherwise. The title does not fix the AO label.

## E044 — CONFIRMED

- Md re-tariffed at `content/data-response/econ-u1-market-failure.md:32,52`; the "Level 4 (9–10)" band is gone
  (`:68` rewritten on the 4/4/6/6 split), and the Common Mistakes line now says 20-mark (`:74`). The page
  description reads 2/6/20 (`app/data-response/[slug]/page.jsx:14`); served data-response page shows
  "Question 3 (20 marks)" and no "9–10" / "10 marks".
- Bank item `data/modelAnswersExpansion.js:330-498`, 20 criteria at `:403-424`: AO1 c1-c4, AO2 c5-c8, AO3
  c9-c14, AO4 c15-c20 = 4/4/6/6, sum 20, all resolve. Md answer and bank answer identical after
  normalisation (6,797 chars each) — no drift.
- Examiner read against the IAL 20-mark descriptors (KAA Level 4: accurate, applied, coherent chains; Evaluation
  Level 3: critical of the evidence, different viewpoints, reasoned judgement): meets both. Each evaluator is
  developed and weighed (health evidence sized on three grounds, and it correctly uses the extract's word
  "private" healthcare costs to separate internal from external cost; regressivity quantified 1.5 x 0.68 ≈ 1.02
  and tied to PED < 1; alternatives judged complements; government failure made specific — 50% = AED 1.20
  only at an AED 2.40 pre-tax price, which the extract does not give). The judgement follows and is
  conditional. Economics checked: consumption-externality diagram (MSB below MPB, tax = MEC gives MSB = MSC),
  PED arithmetic, ad-valorem vs per-unit point — all correct. Every figure is in the extract or derived from it;
  none invented (UK SDIL is named as a design, with no figure).

## Residuals (none blocks a confirm)

1. R7 checks shape only: flipping c7/c8 to `'earned'` passes the validator. Nothing ties `segRole: 'missed'`
   to `likelyScore` < tariff. Worth a rule when 12.8's retrofits start producing both roles at scale.
2. The mid-band "Why this loses marks" panel on 1.3.5 moved from the generic 20-mark to the extract 20-mark
   (`highestTariffItem` picks the item with more paragraphs among equal tariffs). It works, but it is a
   1.3.5 change nobody asked for.
3. The 6-mark answer, copied from the md file as the spec asked, frames the consumption externality as
   "MSC exceeds MPC", while the 20-mark answer and the md's diagram reference use MSB below MPB with
   MPC = MSC. Both frames are defensible, but one page now teaches two. Content note for the founder.
4. Staged `app/globals.css` changes (other packets, learn-mode and practice selectors only) are in the index
   but not HEAD; they do not touch any `lab-` selector.

## Unclaimed but relevant

None found: E038 is wont-fix, and E040/E041 are packet 12.75's; the diff touches neither.

Gate: all four claimed ids are confirmed on independent evidence; from Verify A's side the gate can pass.
