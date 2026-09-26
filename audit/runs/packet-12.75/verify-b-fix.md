# Packet 12.75, E053 applied to every page: Verify B targeted re-walk (26 Sep 2026)

Scope: the change to the default (non-shell) path in components/SectionModelAnswersPage.jsx (`pagePanelItem`,
lib/mid-band-answer.js:229). The builder's own run is in e053/; this file does not reuse its servers, its
comparer or its hashes. Working files: verify-b-fix/ (curl/, curl-panels.txt, textdiff.py, textdiff.txt,
textdiff-mutation.txt, before-panel-ref.txt). Nothing was staged, committed, published or written to the DB.
The ledger claim was already made (`E053 claimed`); I did not re-claim it or confirm it.

## Step 0: what was serving on :3001 (FAIL before a restart)

`remediation-dev` (pid 60090, `next dev --port 3001`, started 11:09) was still SERVING THE PANEL on the
objectives pages at 11:38, eight minutes after the edit landed (source mtime 11:30). curl ?draft=1 found
`lab-details-midband` on business/managing-people and economics/macroeconomic-policies. This is the known
stale-RSC trap. `.next/BUILD_ID` was 11:16, so a `next build` had written into the same `.next` while the
dev server ran. Fix: preview_stop, `rm -rf .next/cache`, preview_start (same config, same port, new pid).
Every figure below comes from the restarted server. **The builder's rewalk.txt measured a COPY of the tree
on :3122. Until this restart, :3001 would have shown all 8 false panels to anyone walking the draft.**

## A/B of the 31 non-shell pages against b1942fe (visible text, not markup)

Before: e053/before/*.html, the b1942fe render. After: my curl of each page on the restarted :3001, with ?draft=1.
Comparer: verify-b-fix/textdiff.py (Python html.parser). It compares text nodes outside script/style/template,
one per line, and tags each node that sits inside `details.lab-details-midband`. The builder's compare.mjs
diffs markup. This one diffs what a reader can see.
  23 pages: text identical, node for node, including the kept panels' text.
   8 pages: the only removed nodes are the panel's own (42–60 nodes, starting "Why this loses marks — …"),
            with nothing added and nothing else changed: business managing-people, managing-finance,
            external-influences; economics aggregate-demand, economic-growth, macroeconomic-policies,
            market-structures-contestability, trade-global-economy.
   0 pages with any other difference.
Comparer control (textdiff-mutation.txt): on a copy, I added "!" inside the kept panel on supply and a
<p>extra</p> outside the panel on aggregate-demand. Both came back FAIL (22 / 7 / 2).
Blind spot: attribute-only or class-only changes are invisible to this comparer. The builder's markup diff
(e053/compare.txt, 23 identical / 8 panel-only / 0 other) covers that side.
curl-panels.txt: the 11 levels pages carry the panel (meeting-customer-needs, financial-planning, supply,
government-intervention, economic-performance, aggregate-supply, national-income, causes-effects-globalisation,
balance-payments-exchange-rates, poverty-inequality, growth-development), and every other page has 0.

## Re-walk: Browser pane, signed out (cookies, localStorage and sessionStorage cleared), ?draft=1, real page loads

step 1 (390x844): the 8 objectives pages. On all 8: 0 `details.lab-details-midband`, and "Why this loses marks"
  and "Where it tops out instead" absent from the rendered text (scripts excluded). scrollWidth 390 on all 8.
  — PASS (no panel)
step 2 (390x844): the 3 levels pages. I opened each panel with a real tap on its summary (not .click()). Each was
  open=true, transform `none`, rect width 300 = computed width 300px, x 55 (widths at 390px). Summary: "Why this
  loses marks — a mid-band attempt at the same question". Whitespace-stripped textContent of the panel,
  SHA-256/16, against the same text extracted from the b1942fe HTML (before-panel-ref.txt):
    business/meeting-customer-needs             1696 chars 18bfd44a20660974 = b1942fe
    economics/economic-performance              1930 chars 783a3a698e613ff4 = b1942fe
    economics/balance-payments-exchange-rates   1477 chars b7f276093cca0288 = b1942fe
  "Where it tops out instead" label: x 68, w 274, h 22, 14px (at 390). Its bottom sits 8px above the top of the
  value row on all 3 (1553→1561, 1749→1757, 1378→1386). Value on all 3: "Level 3 — 5–6 marks …" (a level
  row, not an AO row). — PASS (text unchanged)
step 3 (390x844): overlap. The line-box rects of every text node in each open panel (Range.getClientRects,
  86 / 105 / 72 line boxes) were checked pairwise: 0 overlaps, and 0 line boxes outside the panel's x-range.
  A first pass used element bounding boxes and reported 3 "overlaps" on meeting-customer-needs. These were
  inline spans that wrap across lines, whose bounding box is the union rectangle. They are not real; the
  line-box pass is the measurement. — PASS
step 4 (1440x900): the 8 objectives pages. On all 8: 0 panels, both strings absent, scrollWidth 1434 (a 6px
  scrollbar). — PASS
step 5 (1440x900): the 3 levels pages, same method as steps 2 and 3. Rect width 750 = computed width 750px,
  x 352, transform none. Hashes identical to b1942fe (18bfd44a…, 783a3a69…, b7f27609…). Label x 365, w 724,
  h 22, 14px, 8px clear of its value row. 0 line-box overlaps (58 / 71 / 49 line boxes). — PASS
step 6: screenshot. One screenshot was taken at 390 and one at 1440. Neither shows the measured state:
  `document.visibilityState` was "hidden" (the Browser pane is not on screen). The 390 capture is blank, and
  the 1440 capture is the frame from before the tap (panel still closed). Every result above is a layout
  measurement, and none relies on the screenshot. — NOT EVIDENCE (the pane is hidden, not a product fault)
step 7: did the fix change any other step? economics/market-failure (the shell page walked in verify-b.md) at 390.
  One h1, "Market Failure — Exam Questions & Model Answers". Set tabs "Extract A · 3 questions | Standalone ·
  3 questions". Cards 1 Define / 2 Analyse / 3 Evaluate. Dock "Question 1 of 3". #ps-after reads "6 written
  questions · 60 marks". h2s: the 6 questions, then coverage, "Data response" and "Now try one yourself". No
  midband panel. The visible text of the page is node-for-node identical (957 nodes, 0 diffs) to
  served-b1-1.3.5.html, the render saved 2 minutes after verify-b.md, and to e053/after. The only byte
  differences are the per-request `__next_r` id and chunk hashes. verify-b.md's 17 steps and its chapter
  headers therefore stand unchanged; the shell path was not touched. — PASS

lib/mid-band-answer.test.mjs: 23 pass / 0 fail, run by me. It includes 'the default path returns no panel for an
objectives-split item' (:267) and the real-bank census test (:280).

## Console errors

None after the restart. Between the console marks `VBFIX-MARK-before-reload` and `VBFIX-MARK-after-load`
(a reload of market-failure) the console shows only "[HMR] connected" and the DevTools info line. The
"Hydration failed … ps-tlabel" and "Encountered a script tag" errors earlier in the log came from loads before
the restart. That is the same stale-SSR artefact verify-b-r1.md already closed. The fresh HTML carries 16
`ps-tlabel` elements.

## Audit complaints still visible

None on the pages walked. Also true: the dev server kept serving the pre-edit render after the edit, and would
have gone on doing so until someone restarted it. That is a process trap, not a product defect.

Verdict: PASS. 8/8 objectives pages show no panel at 390 and at 1440. 3/3 levels pages keep their panel, and its
text is byte-identical to b1942fe at both widths, with no overlaps. The 31-page A/B: 23 identical, 8 differ only
by the removed panel, 0 other differences. The shell page is unchanged.
