# Packet 48 — built (government-intervention-firms, IAL Economics 3.3.5)

**Staged to `draft` only. Nothing published, nothing restored, nothing committed.** Live `data` read
back after staging: `contentVersionSince` still `2026-09-25T14:22:24.828+00:00`, 3 blocks, and the
signed-out response byte-identical to `live-section-2026-09-26.json` (curl, 26 Sep, after the stage).

## Handoff documents

Read: `audit/PROTOCOL.md` (full), `audit/SESSION-PROMPT.md` (full), the Settled list in
`audit/DECISIONS.md` (headlines 13-3411, entries read for tariffs :130, block counts :1946/:2121/:2435/:2742,
multi-part items :934), `audit/CONTENT-GATE.md` (full, including the recall contract and the 26 Sep
check-in answer rule), `audit/PROGRESS.md` row 48 ("not started"), the newest `audit/NEXT.md` Handoff
("packet 12.75 closed", :10960-11043), `audit/SPEC-OWNERSHIP.md` row :28, `audit/runs/packet-45/built.md`
"For the next phases" (:147-166). **No `## Packet 48 spec` block exists in `NEXT.md`** (same gap packets
41/43-47 hit; PROTOCOL: the ledger defines scope). No contradiction found between the handoff documents.
The contradictions in §7 of `brief.md` are between ledger ITEMS and the specification; each is resolved
below against `econ_spec.txt` wording, not by picking an item.

Live section re-read fresh (curl `:3001`, signed out, 26 Sep): byte-identical to the brief's snapshot.
t=0 snapshot of all 8 tables: `audit/snapshots/2026-09-26-pre-packet-48__economics__government-intervention-firms.json`.

## What was built

`scripts/packet-48-government-intervention-firms.mjs` (runner, dry/`--dump`/`--stage`) and four modules:
`scripts/_packet48-util.mjs` (six solved models, spec lists, bans, pointer budgets),
`scripts/_packet48-content.mjs` (28 subsections, notes, LEAF_MAP), `scripts/_packet48-assessment.mjs`
(quiz, practice, flashcards, mistakes, extras), `scripts/_packet48-diagrams.mjs` (6 diagrams, 16 views).
Bundle: `audit/snapshots/packet-48-bundle__economics__government-intervention-firms.json`.

3 blocks / 6 subsections / 0 recalls / 3 diagrams / 10 quiz / 5 practice →
**6 blocks / 28 subsections / 28 recalls (8 reorder, 8 classify, 6 match, 6 fillin), 0 recoverable /
6 diagrams (16 views), one per block by `diagramId` / 27 quiz (3 unpinned pre-test) / 9 practice /
36 flashcards / 7 mistakes / 4 chains + 3 evaluation.** Validator on the bundle: 0 BLOCK / 1 DEBT
(`quant.unit`, baselined programme-wide) / 0 new; **33 of 33 spec leaves evidenced (100%)**; publishing
would clear 95 baselined findings (live: 67 BLOCK / 32 DEBT).

| Chapter | Spec | Subsections (content.mjs line) |
|---|---|---|
| 1 Controlling Monopolies and Mergers | 1a, 1b-1..6 | case-for-intervention :44 · price-regulation :81 · profit-regulation :115 · quality-and-targets :155 · referral-to-authorities :183 · merger-control :214 |
| 2 Promoting Competition and Contestability | 1c-1..5 | small-business-and-fdi :255 · deregulation :283 · privatisation :322 · competitive-tendering :348 · trade-liberalisation :388 |
| 3 Protecting Suppliers and Employees | 1d-1..6 | local-sourcing :423 · employment-legislation :452 · foreign-entry-barriers :484 · monopsony-restrictions :528 · nationalisation :559 |
| 4 The Impact and Limits of Intervention | 1e, 1f-1..4 | impact-of-measures :593 · regulatory-capture :624 · information-gaps :667 · resources-and-power :697 |
| 5 Wage Controls in Labour Markets | 2a, 2b-1, 2b-2 | labour-case :727 · minimum-wage-competitive :757 · minimum-wage-monopsony :791 · maximum-wage :831 |
| 6 Taxes, Mobility and Fair Treatment | 2b-3..5 | direct-taxes :867 · geographical-mobility-measures :894 · occupational-mobility-measures :927 · discrimination-and-exploitation :973 |

Packet 45's inheritance is taught in full: the minimum wage (competitive first :757, then one dominant
employer :791 — rule before exception), maximum wages :831, immobility measures :894/:927, discrimination
:973, plus direct taxes :867 (the fifth 2b bullet built.md's list omits). The neighbours are pointed at with
topic numbers (runner POINTER_ONLY): the monopsony construction (3.3.3 · 7), contestable markets
(3.3.3 · 8), the causes of immobility (3.3.4 · 4).

Six blocks, not eight: 9 free quiz items against `FREE_QUIZ_MAX` 10, so every chapter's check-in is
served and the pre-test keeps 3 (confirmed on the served draft: 9 quiz served signed-out, 3 unpinned,
each block's check-in = its first pin).

## Per ledger id (33 claimed: `node audit/scripts/ledger.mjs claim 48 …` → "claimed 33 items")

- **topFix-01** — Laffer (q5) and poverty trap (q7) gone and banned (util BANNED_ELSEWHERE; runner §2);
  q6 replaced by items on the MEASURES (assessment.mjs:145). Named replacements: merger / substantial
  lessening (assessment.mjs:62), predatory pricing (:79), performance target (:73). Every block carries
  `diagramId` + `quizIndices` + `practiceIndices`, derived from item tags (runner §4). `diagramRef` is
  the legacy pin; `diagramId` is the current one.
- **topFix-02** — clause by clause: natural-monopoly diagram with sampled AC falling throughout, P=AC and
  P=MC caps, AC cap ON the AC curve, P=MC cap captioned as a loss, MR=MC dot at the real crossing
  (diagrams.mjs:182); diagrams[2] replaced by "Privatisation and Competition" — no supply curve, MR=MC kept
  after privatisation (:250); competitive minimum-wage view (:372); floor-kinked MCL in the one-employer view
  (:388). Geometry read back out of the SVG, A/B'd (runner §10, :602-:640).
- **topFix-03** — Promoting competition block (chapter 2) incl. deregulation, tendering, small business;
  supplier protection from monopsony buyers (content.mjs:528); five-impact summary (:593, bullets —
  `schema.body-type` allows no table). "Consider moving the minimum wage to 3.3.4" considered and REFUSED:
  "minimum wage controls" is `econ_spec.txt:1530`, inside 3.3.5, and SPEC-OWNERSHIP moved it here
  (runner §5 asserts both).
- **topFix-04** — fillin on the cap arithmetic (content.mjs:101; CPI − X, because RPI is UK-only per
  CONTENT-GATE checklist 3 and `locale.institution` blocks the acronym), chronological reorder of merger
  review (:234), causal reorder of the over-investment chain (:136).
- **topFix-05** — "25-mark" gone and banned; privatisation examMatters "carries 20 marks (Appendix 6)"
  (:336); authorities named: Korea Fair Trade Commission (:198), Singapore's competition authority on
  Grab-Uber (:230), Hong Kong's Competition Commission and Pakistan's (referral paragraph, :183 ff.).
  CMA is NOT named: `lib/content-validator.mjs:219/:225` block it. Practice rewritten to KAA + evaluation
  levels; Define privatisation (2) (assessment.mjs:176); Outline/Assess removed and banned. No years
  (programme rule), so "2018"/"2021" are not printed.
- **accuracy-01** — see topFix-05; runner bans "classic 25-mark essay".
- **accuracy-02** — see topFix-02; runner §3 asserts AC strictly falls from Q 15 to 100, and §10 reads
  the MR/MC crossing, the MR=MC dot and the guide line out of the SVG.
- **accuracy-03** — privatisation drawn as a fall in MC under MR=MC; competition as P→MC; runner asserts
  no "S" label in any view of that diagram.
- **quiz-01, quiz-03** — gone, banned, re-measured: "Laffer" is `econ_spec.txt:1847` (Unit 4 fiscal
  policy), "poverty trap" 0 hits.
- **quiz-02** — its CLAIM (belongs to 3.3.4) is refuted by `econ_spec.txt:1533` (3.3.5 · 2b). Its DEFECT
  (an untaught item in the pre-test pool) is fixed: the item is gone and occupational-immobility measures
  are taught (content.mjs:927).
- **structure-01** — 28 recalls, one per subsection, all four types, `recall.recoverable` 0.
- **structure-02** — every block pinned (runner §4); verified on the served draft.
- **structure-03** — every diagram pinned to a block; runner fails on an unpinned diagram.
- **structure-04** — pre-test pool = 3 on-spec chapter-1 items (assessment.mjs:56-66); 0 off-topic.
- **structure-05** — "government failure" (1.3.6 · 2, `econ_spec.txt:824`) is no longer a subsection and
  is banned; chapter 4 teaches the four 1f limits instead. Its claim that the minimum wage is 3.3.4 is
  refuted (:1530).
- **structure-06** — chapters in the spec's own order (why → control → promote → protect → impacts/limits
  → labour); five-impact summary.
- **structure-07** — the monopsony subsection recaps MCL and MRP and cites 3.3.3 (:791); the labour case
  cites 3.3.4 for immobility (:727); labour chapters come after all product-market chapters.
- **structure-08** — flashcards rewritten on this section's content; runner fails on a card defining
  consumer sovereignty, deadweight, a contestable market or dynamic efficiency.
- **specGap-01..06, 09..13, specThin-01** — each asserted by the runner's mechanism-word check (§11)
  against its subsection: 01 :155, 02 :255, 03 :283, 04 :348, 05 :528, 06 :593, 09 :388, 10 :423,
  11 :452, 12 :867, 13 / specThin-01 :973.
- **specGap-07** — self-declared "no gap"; both limits now have their own subsections (:624, :667).
- **specGap-08** — nationalisation is `econ_spec.txt:1512` (last 1d bullet); taught at :559.

## Check-in answer rule (CONTENT-GATE, 26 Sep) — builder's own read, NOT a verification

The served check-in item per block is its first pin (confirmed against the served draft). Each was
written about something the block's diagram does not draw: B1 rate-of-return incentive vs price-cap
diagram; B2 tendering vs privatisation/competition diagram; B3 nationalisation vs foreign-supplier
diagram; B4 regulatory capture vs information-gap diagram; B5 elasticity of labour demand vs wage-control
diagram; B6 a geographical measure vs tax/retraining/discrimination diagram. Verify A and B must still
read each by eye; there is no automatic check and this list is not one.

## Checks run, and what each measured

- Runner (dry, `--dump`, `--stage`): exit 0; every packet check passes, 0 new BLOCK / 0 new DEBT.
- `node audit/scripts/check-staged-drafts.mjs government-intervention-firms`: "matches", 0 drift.
- Own comparison of `curl …?draft=1` against the bundle: every block identical except `quizIndices`,
  which the signed-out route remaps to its served slice; each block's served check-in item has the same
  id as the bundle's first pin; all 3 served unpinned items are the bundle's first three.
- Diagrams rendered to PNG with headless Chrome and read by eye (`diagrams-preview.png`,
  `diagrams-preview-2.png`), at 400-unit frame width only — NOT at 390×844 in the app.
- `npm test` 342/342 (`build-test.log`); `npm run validate` exit 0 (`build-validate.log`; it reads LIVE
  data, so it says nothing about this draft); `npm run exposure` exit 0 (live; the one DECIDED empty
  chapter it names for this section is the LIVE block 0); `npm run recalls` exit 0.
- **Not run: `npm run build`** (only `scripts/` changed, which `app/` does not import; a build in this
  shared worktree would also touch `.next` under the running `:3001` dev server). No Verify A, no Verify B.

## Publish (rule 6 — for the founder, not run)

```
node scripts/packet-48-government-intervention-firms.mjs --stage && node scripts/publish-section.mjs government-intervention-firms --confirm
```

Before that publish, rule 3: confirm origin/main's components read every field this content carries
(recall types match/classify/fillin/reorder with `why`, flow steps as `{title, subtitle}`, `diagramId`).

## For the next phases

- Git: new files staged by explicit path; `audit/ledger.json` (33 claims) written, NOT staged.
  PROGRESS/NEXT/DECISIONS untouched.
- Real examples for a Layer 4 reviewer (none carries a year or figure): KFTC fine on Google/Android;
  CCCS on Grab-Uber; Hong Kong Competition Commission; Competition Commission of Pakistan; AirAsia and
  South-East Asian route opening; Singapore bus contracting; ASEAN Free Trade Area; Malaysia/Vietnam/UAE
  zone tax holidays; Nigeria oil and gas local content; India's limits on foreign supermarkets; Hong Kong
  foreign domestic helpers' protections and set minimum wage; Gulf sponsorship reforms; minimum prices for
  rice/sugar cane; EU bankers' bonus cap; caps on state-firm executive pay; Hong Kong/Singapore low profits
  tax; Malaysia's national job portal; Singapore training credits; minimum wages in Malaysia, Pakistan,
  Kenya, Hong Kong and Singapore's sector floors; gold-plating under rate-of-return regulation.
- Verify B note: the check-in rule above; the MCL/MRP labels in the one-employer view; the 16 views were
  checked only as 400-unit renders, not on a 390px phone.
