# Packet 12.8 — Verify A (packet-verifier, 26 Sep 2026)

I did not read built.md. I started from `ledger.mjs unverified 12.8` and the working-tree diff. The tree is
shared with other packets, so I limited the review to the files 12.8 names. Every check below uses a method
the builder did not use: my own mutations run through an importable copy of the validator; my own DOM probes
in the Browser pane, each shown to fail against a control first; a HEAD export (`git archive HEAD`) served on
:3002 and diffed against :3001 with my own HTML normaliser; and an examiner's reading of every new answer.

## Verdicts

- **E054 CONFIRMED.** `app/data-response/markdown-page.css:107,113`: the `.md-table` container query stacks
  tables. `components/MarkdownPage.jsx` `labelCells` puts `data-label` on every cell. Measured with a DOM probe
  on all six data-response pages at 320 and at 642/660 (just over the 600px threshold): document scrollWidth
  equals the viewport, no element sits outside it, and no cell is clipped. A/B at 390: with `container-type`
  forced off, Table 1 goes back to 403px in a 350px column and the page is 423px wide. That is the original
  defect, so the probe can see it.
- **E055 CONFIRMED.** The md file has no "Level" band left (grep). Parts (c) and (e) both use MSB < MPB, which
  matches the Diagram Reference (MPB, MSB, MPC=MSC). Common Mistakes now speaks of (d)'s evaluation marks and
  (e)'s top level, and both match the bank's mark schemes.
- **E057 REJECTED.** R9, R10, R11 and R12 fired on every mutation I made (26 mutations; the control gave 0).
  R13 misses one real kind of drift. `mdQuestions` (`audit/scripts/validate-model-answers.mjs:268`) only
  matches `(a)`–`(e)` or a number, so a line such as `**Question (f) (20 marks)** — Evaluate …` is skipped
  without a word. The "no others" loop at `:327` never sees it, and the validator reports 0 findings. So an md
  file with a sixth question the bank does not carry passes. That is the drift R13 exists to catch, and the old
  20-mark Q3 was exactly this case. Two smaller gaps: a heading-form question (`### Question (f)`) and a
  question that runs onto a second line also pass. R10, R11 and R12 only apply when a page has at least one
  item of that kind (`:297`, `:346`), so a 1.3.5 page stripped of all five data-question `paper` fields passes
  as well. The spec's own write-up file, `validator-ab.md`, does not exist; only `validator-ab.log` does.
- **E058 CONFIRMED.** Parts (a)–(e) are Define 2, Explain 4, Analyse 6, Examine 8 and Discuss 14, all on
  `econ-u1-market-failure` (`data/modelAnswersExpansion.js:297,457,553`). The (e) id is kept and its criteria
  are re-keyed k1–k8/e1–e6, a 14-mark KAA 8 + E 6 split.
  - Examiner read. (c) and (d) earn their marks from different reasoning: (c) is the mechanism of the charge,
    (d) is where it lands against 0.25 vs 0.18. The figures are checked against the extract: 0.45 × 11bn,
    0.6 × 50% ≈ 30%, and 1.5 × 0.68 ≈ 1.02.
  - One wording nit, not blocking. In (d), "a welfare loss from under-consumption replaces part of the loss
    from over-consumption" should say it replaces all of the over-consumption loss, with a smaller one.
- **E059 CONFIRMED.** There are five Section B items at 4 marks, each with a `paper.context`: exactly one Draw
  (`:962`, whose diagram file exists and shows MSB above MPB and Q1 < Q*) and one Calculate (`:1021`; 4,500 /
  16,500 = 27.3% is correct). The new items target leaves the data question does not tag: 2a, 2c-2, 2d-1,
  3a-1/2, 4a and 4c-3. `neg-externality-4` has a context (`data/modelAnswersData.js`). No shell or route sends
  these items to the AI marker.
- **E060 CONFIRMED.** Section D has two Evaluate 20 essays with quoted contexts (`:794`, `:1214`), each marked
  KAA 12 + E 8. The moral-hazard essay's 2023 US context is stated accurately.
- **E061 CONFIRMED.** Checked in the live page at 1440, 1280, 1024, 390 and 320.
  - Server HTML: the headers read B, C and D in paper order, then More practice. The Section A row links to
    `/?section=market-failure`, which 301s to the topic, and its copy does not claim to land on the quiz. The
    7 contexts sit above their stems.
  - Draw item: no textarea and no visible diagram before marking. "Mark my sketch" then shows 4 criteria and
    the diagram.
  - Essays: gated until one is chosen. With essay 1 at 6/20 and essay 2 chosen at 3/20, the page shows
    "Banked 3 / 20" (`components/PracticeShell.jsx:746`), and the choice survives a reload. Model-answers mode
    shows both essays.
  - Keys: ← and → cross sections (B5 → C(a) → … → C(e) → D1 → D2 → More practice); a number key jumps within
    the section.
  - Scrolling: switching section or clicking a figure button left `scrollY` at 0. The one scroll I saw came
    from the browser tool's own scrollIntoView.
  - Cut text: my probe found 0 overflow, clip or horizontal scroll in 26 states at 320 and at 1024, and at
    390 with `data-theme=light`. The same probe fires 20 times when the context table's stacking is disabled.
- **E062 CONFIRMED.** The md `## Questions` has exactly (a)–(e), and their wording matches the bank. My own
  comparison also found every md model answer and examiner note equal to the bank's script and commentary,
  word for word, for all five parts. The old 20-mark Q3 is gone. E054 and E055 are absorbed, as above.
- **E063 CONFIRMED.** `--rlh-h` was already defined (`styles/theme-night.css:156,160`). The new ResizeObserver
  (`components/PracticeShell.jsx:621`, `:967`) writes the measured height only when the header and the
  variable disagree. A/B at 1440×900:
  - Header forced to 80px: the frame runs top 80 to bottom 900, with no page overflow.
  - The same with the fix's inline value removed: the bottom is at 920, 20px past the viewport.
- **E064 CONFIRMED.** I exported HEAD, served it on :3002 and compared all 31 other model-answer pages with
  :3001 after my own normalisation (body tags, classes, text, JSON-LD and title): 31/31 identical. The same
  comparison does flag 1.3.5 as different, so it can see a change. On the 1.3.5 page, title, canonical,
  FAQPage and the sitemap entry are unchanged, and the Quiz JSON-LD went from 6 to 13 questions.
  `spec-coverage`: market-failure went from 13/35 to 23/35 leaves, there are no zerocov or specid failures,
  and the 123 tariff failures match HEAD's count. `npm test` 357/357; `npm run validate` exit 0.
  Coverage caveat: I sampled widths rather than sweeping 320–1920 in 5px steps.

## Unclaimed but relevant

None in `ledger.mjs packet 12.8`, since all 10 are claimed. E056 (the Quiz deep link, packet 12.9) is what
the Section A copy works around.

## Check-ins

Not applicable. 12.8 changes model answers and a data-response page, not learn check-ins.

## Harness blind spot, found while recording verdicts

`ledger.mjs packet 12.8 --open` prints "0 items" after E057 is rejected. It keeps only rows whose status is
`open` (`audit/scripts/ledger.mjs:59`), and a rejected row's status is `not-fixed`. The spec says the harness
passes 12.8 "only when `ledger.mjs packet 12.8 --open` is empty". That condition is met right now, with E057
rejected. `ledger.mjs unverified 12.8` (exit 2, E057 not-fixed) is the check that sees it.

## Gate

The gate should not pass until E057's R13 catches an md question outside (a)–(e), or any Question line it
cannot parse, and that case is proved by mutation.

---

# Round 1 — re-verification of E057 (packet-verifier, 26 Sep 2026)

Only E057 was unverified. I did not read built.md, and I did not reuse `validator-ab.sh` or the injectable
`readMd`/`listMd` hooks. My method: I cloned the validator's real inputs (`data/`, `lib/`,
`audit/raw/ial-paper-structure.json`, `content/data-response/`, `public/diagrams/`, and the script) into the
scratchpad. Then I mutated real files and ran the CLI end to end (`--json`), so `main`, `stimulusBasenames`
and the default `listMd` are all on the path. The bank was mutated through a transform spliced into the
clone's `MODEL_ANSWERS` export. The control gave 0 findings in the clone, the same as the worktree.

## What round 1 closed (all fire now)

- **md side, 22 of 24 mutations fire R13.** These include:
  - a sixth `**Question (f) (20 marks)**` in `## Questions` (the round-0 hole);
  - `### Question (f)` inside `## Questions`;
  - (e) split over two lines;
  - `Question 6`, `(F)`, an en dash, a numbered list item, and a bare `**(f) (20 marks)**` inside `## Questions`;
  - `Question (f)` or `Question 6` in its own new section, or inside the Stimulus;
  - a second `## Questions`, and a renamed `## Questions`;
  - tariff drift in the list or in a Model Answers heading, and an added `### Question (f)` in Model Answers;
  - wording drift, a removed (c), a duplicated (c), CRLF, and an HTML comment.

  The code that does this: `mdQuestions` is strict (`audit/scripts/validate-model-answers.mjs:292-298`),
  `mdAnswerHeadings` is at `:311`, and the token scan `mdQuestionMentions` is at `:331`, all used in `r13()`
  at `:441-488`.
- **Bank side, 12 of 12 mutations fire.**
  - Stripping all `paper` fields: the file-side R13 fires (`:425-435`).
  - Stripping only the data-question, short-answer or essay fields: R10, R11 or R12 fires on absence
    (`:383`, `:412`, `:421`).
  - The rest also fire: dropping part (c), a duplicate letter, a split stimulus, an extra part (f), 4
    short answers, 1 essay, and a wrong unit.
- **Structure file removed:** R9 fires on every item (13 findings), so the check fails closed.
- `validator-ab.md` now exists (75 lines, and it covers R10 and R13).

## What still passes (reject)

A sixth tariffed task that does not use the word "question" still passes, as long as it sits outside
`## Questions`:

- `## Extension task` followed by `**(f) (20 marks)** — Evaluate whether a higher charge would be better.`
  gives **0 findings**.
- The same result for `**Extension (20 marks):** Evaluate …`.
- The same result for a markdown table row `| (f) 20 marks | Evaluate … |`.

`app/data-response/[slug]/page.jsx` renders the whole md through `MarkdownPage`, so a student sees six tasks
and the bank carries five. That is the drift the title says cannot happen. The token scan (`:331`) keys on the
word "question", and the two line parsers only look inside `## Questions` and at `#` lines of
`## Model Answers`. So none of the three methods sees a tariff outside those places.

The fix would close the class, not another spelling. Treat any `(\d+ marks?)` tariff token in the file as a
finding unless it sits on one of the bank's five `**Question (x) (n marks)**` lines or on one of the five
`### Question (x) (n marks)` headings. None of the current data-response files has such a token anywhere else
(`grep "marks)"`), so this check adds no false positive today. Prove it by A/B with the three mutations above.

## Verdict

E057 is rejected. `unverified 12.8` = 1.

---

## Re-verification round 2 (packet-verifier, 26 Sep 2026)

Scope: `ledger.mjs unverified 12.8` lists one id, E057 (rejected in round 1). The nine others were
already confirmed and are not re-litigated here. built.md was not read.

**What changed since round 1** (diffed `validate-model-answers.round1.mjs` against the live script):
`mdStrayTariffs` (:385) blanks the bank's own ten slots (five question-line prefixes, five model-answer
headings), flattens the markup with `flattenKeepingLines` (:371), then scans the whole file with
`TARIFF_RE` (:367) and `PART_RE`. A bank-side twin was added to R9 (:236-240) for `question` and
`paper.context`.

**Method (not the builder's):** a scratchpad copy of data/, lib/, content/, public/diagrams, the
validator and the structure file (the validator resolves ROOT from its own location, so the copy is
self-contained; baseline 0 findings, as in the worktree). For each mutation I put a sixth task,
"Evaluate whether a sugar-content tax would be more effective than the current 50% excise.", before
`## Common Mistakes`. I ran the full validator CLI, and I rendered the same file with the page's own
stack (`react-markdown` plus `remark-gfm` from the worktree's node_modules, as `components/MarkdownPage.jsx`
does) to show that the task is on the page. The worktree md was not modified; I diffed it afterwards.

| mutation | validator | rendered |
|---|---|---|
| control: `**Extension (20 marks):** …` | R13 finding | visible |
| control: table row `\| (f) 20 marks \| … \|` | 2 R13 findings | visible |
| control: `… (20)` | R13 finding | visible |
| **`(0 < \|PED\| < 1)` prose, then `**Extension (20 marks):** …`, then a later `> ` blockquote line** | **0 findings** | visible, "(20 marks)" included |
| table `\| Task \| Marks \|` / `\| Evaluate … \| 20 \|` | 0 findings | visible |
| `**Extension.** … [Marks: 20]` | 0 findings | visible |
| `(20 pts)` / `(20m)` / `(/20)` | 0 findings each | visible |
| no tariff at all, `**Extension:** …` | 0 findings | visible (noted, not the basis of the reject) |

**The headline bypass is the exact form that round 1 named.** `flattenKeepingLines` removes
`/<[^>]*>/g`, and that pattern is not confined to real tags. In markdown, a plain-prose `<` ("PED < 1",
"MSB < MSC") is literal text, and `[^>]*` runs across newlines to the next `>` anywhere in the file, for
example a blockquote marker. Everything in between is blanked before the scan, including a
`(20 marks)` tariff, while react-markdown renders all of it. This content uses `<` and `>` in prose:
`econ-u1-demand-elasticity.md` has 2 such lines, and `data/modelAnswersData.js` has "If PED > 1 … if
PED < 1" in several answers. So the trigger is ordinary writing, not a contrived one. The R9 bank-side
scan (:238) uses the same tag strip.

**Verdict: E057 REJECTED.** The defect the title and round 1 named (the md file stating a task the bank
does not own, with 0 findings) is still reachable in the `(n marks)` form. To fix the class: strip only
real tags (`<[A-Za-z/!][^<>\n]*>`) or tokenise with the markdown parser the page uses, so that the scan
sees the text the page renders. Treat a number under a `Marks` column, and `Marks: n` in either order,
as tariffs. Then re-run this A/B with the angle-bracket case as a control.

Gate: must not pass. 9 of 10 are confirmed, and E057 is not-fixed. Note: `ledger.mjs packet 12.8 --open`
prints 0, because it filters `status === 'open'` only (ledger.mjs:59) and not `not-fixed`.
