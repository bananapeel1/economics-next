# Packet 12.8 close-out, Verify A round 1 (packet-verifier, 26 Sep 2026)

Scope: E057 and E082 only, judged against the orchestrator's 26 Sep single-source decision. I did not use
the builder's harnesses (`closeout-ab.mjs`, `page-ab.sh`, `svg-guard-shim.mjs`, the packet-40 probe) or its
dev-server curls. Nothing was staged, committed or published, and nothing was written to a database.

**My method.** I copied the worktree into the scratchpad as `vac1/cur`, with node_modules copied by
`cp -c -R`, not symlinked. I exported HEAD with `git archive` into `vac1/head`. Then:

- **Validator.** I ran my own mutations through the real CLI (`--json`). The md mutations edit the file
  in the clone. The bank mutations append an in-place mutation of `MODEL_ANSWERS` to the end of the data
  module, which is a different mechanism from the builder's export splice. The harness is in
  `verify-a-close-1-mutations.py` and its output in `verify-a-close-1-mutations.log`.
- **Pages.** I ran a production `next build` of four trees and diffed the prerendered
  `.next/server/app/data-response/*.html`, where the builder used `next dev` and curl. The four trees:
  - **pre:** the close-out code reverted. It uses HEAD's `page.jsx` with the E062 description line
    applied, and the md that still has `## Questions`.
  - **cur:** the tree as it stands now.
  - **mut:** the current tree with the bank mutated.
  - **HEAD:** the `git archive` export.
- **SVG.** I parsed it with ElementTree and computed the intersections by line-line algebra, not getBBox.

## E057: CONFIRMED

**(a), (b) and (c) each fire. 30 of 30 cases behave as expected, and the control is 0 before and after.**

- **(a)** fires on:
  - a `## Questions` block that also holds a (f) line;
  - a setext `Questions` / `---` heading;
  - `##   QUESTIONS  ##`.
- **(b)** fires on:
  - `## Further practice`;
  - an H2 inside a blockquote (`> ## Extension (20 marks)`);
  - an H2 inside a list item;
  - a repeated `## Stimulus`;
  - `## Common mistakes` with a lower-case m;
  - an H3 `Question (f)` inside Stimulus;
  - `## Task 6`;
  - an H5 inside Common Mistakes.
- **No-fire controls, both silent as they should be:** a `## Extension` line inside a `~~~` fence, and a
  backslash-escaped `\##`.
- **(c)** fires on:
  - an extra `### Question (f) (20 marks)`;
  - the (d) heading changed from 8 to 10 marks;
  - the (a) heading removed;
  - the (a) and (b) headings swapped;
  - `(F)` in upper case;
  - an H4 inside (e)'s answer;
  - `(e) (14 marks) and (f) (6 marks)`;
  - a duplicated (c).

  `(4 _marks_)` is correctly silent, because it renders as the same text.
- **Bank mutations:**
  - part (f) added: (c) fires, along with R9 and R10;
  - (d)'s tariff changed from 8 to 6: (c) fires;
  - the (b) and (d) letters swapped: (c) fires twice;
  - (c)'s `paper` dropped: (c) fires, along with R10;
  - a stem edit: silent, by design.

  Code: `audit/scripts/validate-model-answers.mjs:317` (`mdOutline`, unified + remark-parse + remark-gfm)
  and `:349` (`r13`).

**The page renders the questions only from the bank.** `app/data-response/[slug]/page.jsx:26,45,128`.

- **pre vs cur:** all six prerendered pages are byte-identical once BUILD_ID is substituted. That holds
  for the full HTML, RSC payload included. The bank-rendered Questions section of market-failure therefore
  equals the md-authored one exactly.
- **cur vs mut:** the mut tree edits the (c) stem and adds a part (f). On market-failure exactly those two
  things change: the (c) line, and one added paragraph "Question (f) (20 marks) — VA-F …". The md has no
  `## Questions` any more, so the only source of that text is the bank. The other five pages show 0
  changed lines.
- **HEAD vs cur, the other five pages:** the article HTML is identical once E054's
  `<div class="md-table">` wrapper and `data-label` attributes are removed. E054 is already confirmed,
  and nothing else differs.
- **Raw HTML headings are not a way round (b).** react-markdown (no rehype-raw) renders `<h2>` as
  escaped text, which puts it in the free-prose residual.

**The R9 tag-strip bug is fixed** (`:288` `stripTags`, used at `:245`).

| case | expected | result |
|---|---|---|
| t1: context `(0 < \|PED\| < 1)` … `(20 marks)` …, then a later `>` line | fires | R9 fires |
| t2: the same prose with no tariff | silent | 0 |
| t3: `P < MC … (20 marks) … MR > MC` on one line, spaced | fires | R9 fires |

**Other checks.**

- `flattenKeepingLines` and `mdStrayTariffs` are gone. Outside `audit/runs/`, only the handoff docs still
  name them.
- The worktree validator reports 0 findings.
- `validator-ab.md` has the Close-out section, and it states the free-prose residual (`:222`).

**Observations, not a rejection.**

1. **Residual (stated, not a defect):** a `**Question (f) (20 marks)**` paragraph inside Common Mistakes
   gives 0 findings. This is the decided residual.
2. **R9 still misses one case.** `P<MC … (20 marks) … MR>MC`, unspaced and on one line, is eaten by
   `stripTags` (case t4, 0 findings). The decision allowed "strip per line", which has the same hole, so
   this does not reject E057. No bank string contains `<` or `>` today. Bank `question` and `context`
   render as React text, not HTML, so R9 would need no tag strip at all.

## E082: CONFIRMED

I parsed `public/diagrams/positive-externality-consumption.svg` and computed the intersections from its
three line segments.

- **Market equilibrium.** S ∩ MPB = (238.965, 221.907).
- **Social optimum.** S ∩ MSB = (289.778, 186.039). Both intersections lie on their segments.
- **MSB is above MPB** at every x from 150 to 400. The two lines would only meet off-canvas, at x ≈ 3182.
- **MSB at Q1** = 147.49.
- **Dots:** 0.005 px and 0.002 px from the two intersections.
- **Triangle:** each vertex is within 0.005 px of Q1-on-S, Q1-on-MSB and Q*. Its interior (centroid and
  the three edge midpoints) lies between MSB above and MSC below, and it spans x 238.96 to 289.78.
- **Dashed guides:** all four endpoints are within 0.005 px of their targets.
- **Labels:**
  - P1's visual centre is 0.59 px from the P1 line, and P*'s is 0.72 px from the P* line.
  - Q1 and Q* are centred at exactly Q1 and Q*.
  - P* is above P1 (y 186 < 222), and Q* > Q1.
- **Collisions:** by approximate text boxes, no label crosses a curve, a guide or the triangle edges. No
  two labels overlap, and none falls outside the 540×400 viewBox.

**Items that use the SVG.** The repo has one reference: `data/modelAnswersExpansion.js:987`, the Draw item
`mf-short-draw-vaccination-welfare-loss-4`. It renders on two surfaces, the 1.3.5 practice page and the
/model-answers hub. I read its alt text, markScheme, criteria c1–c4, script p1a–p1d and examinerCommentary.
All of them agree with the picture as economics:

- the free market is at MPB = MPC = MSC, at Q1;
- MSB lies above MPB, and the gap is the external benefit;
- Q* is where MSB = MSC, to the right of Q1;
- the welfare loss is the triangle from Q1 to Q*, with MSB above and MSC below;
- the "commonest loss" note (MSB below MPB puts the loss on the wrong side of the market quantity) is correct.

The SVG's own `<desc>` and its footnote agree too. `public/diagrams/README.md:18` also lists a live
"Government Intervention" use, which is not in the repo. I did not check it (Rule 6 area, and out of
scope).

## Ledger

I confirmed E057 and E082, then ran `ledger.mjs packet 12.8 --open`. Its count is reported to the
orchestrator.
