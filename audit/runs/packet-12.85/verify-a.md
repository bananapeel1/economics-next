# Packet 12.85 — Verify A (packet-verifier, 26 Sep 2026)

Read-only. built.md NOT read. Started from `ledger.mjs unverified 12.85` (E065-E073, all claimed) and the
diff. Every method below is my own and differs from the builder's: the builder's page A/B, contrast,
logo diff, R14 A/B and text-fit sweep scripts in this folder were not run or reused.

## Methods (independent of the fix)

1. **Production build of the worktree** (`.next`, BUILD_ID 16:33; only DiagramDrawDrill/diagram view files
   are newer, not on these pages) served by `next start -p 3293`.
2. **HEAD control**: `git archive HEAD` extracted to scratch, node_modules APFS-cloned (`cp -c -R`), built
   with `next build`, served on :3294. All 32 model-answer pages fetched from both and compared token by
   token with a Python HTMLParser (scripts stripped; `<title>`, canonical, meta description, og:*, and
   every `application/ld+json` block compared byte for byte).
3. **Browser pane (Chrome) driven by DOM clicks**, my own probes: visible-text leak check, font-size /
   family / text-transform census, a computed-style contrast walker (composites every translucent
   background up the tree; not pixel sampling), keyboard, phone layout, theme persistence, noscript
   (server HTML parsed with scripts removed and `<noscript>` inlined into an iframe).
4. **R14**: the validator copied to scratch (CLI tail cut, imports made absolute) so `checkItem` could be
   called on in-memory mutated clones of the real items; not the builder's file-mutation script.
5. **Logo**: both SVGs rendered as real `<img>` elements side by side on white and on the site's dark
   ground, screenshotted by headless Chrome at device scale 1 and 2, cropped and enlarged for inspection.
6. **Clip sweep**: my own CDP script (`clipsweep.mjs` in the session scratchpad), NOT
   `audit/scripts/text-fit-sweep.js`. Probe: for every visible text node, its Range client rects against
   every ancestor with `overflow: hidden|clip` (x and y), plus text outside the viewport, textarea
   scrollHeight > clientHeight, active ellipsis, and document horizontal scroll. 14 states x 2 themes +
   phone outline open, 320-1920 px in 5 px steps. Control first: with `.psx-yours{height:200px;
   overflow:hidden}` injected, the probe failed at every width (41/41 at 40 px steps).

## Verdicts

**E065 CONFIRMED.** Server HTML: one `<h1>` (`psx-h1`, inside the breadcrumb nav,
components/PracticeShell.jsx:751-754), no `rl-night`, no SiteHeader (SectionModelAnswersPage.jsx ShellPage
wraps only `.ps-page`). The logo links to `/?section=market-failure` (PracticeShell.jsx:740; `appHref` from
`shellFor`), and `market-failure` exists in section-index.json. At 375 px the name is hidden and the logo shown.
At 1440 px the rail lists Section A, B 1-5, C 6(a)-(e), D 7-8 with command word, marks and state ("2/4"),
then one total "Your marks so far N of M marked · paper out of 74" (PracticeShell.jsx:811-817; 74 is also
what the approved mockup prints). The booklet is `position: sticky; top: 84px; overflow-y: auto` beside
the question paper. On a phone: "All questions" opens the outline and choosing a question closes it; the
Question paper / Source booklet tabs switch, and each switch returns to the top (y=100 = the desk). ← →
walked all 13 items in paper order; the key did nothing inside the textarea (:564).

**E066 CONFIRMED.** "6 (a)" then "(b)", marks "(6)" right-aligned, "Section C" + "Data question · 34
marks", "Answer ALL questions.", "Answer ALL parts.", "Answer ONE question from this section.",
"(Total for Question 6 = 34 marks)" (lib/practice-shell.js instructions; SectionModelAnswersPage.jsx
`closing`). Lines by tariff: `ANSWER_LINES` {2:4,4:6,6:9,8:12,14:18,20:24}; measured a 4-mark textarea
min-height of 192px = 6 × 32px, 6(e) `--psx-lines: 18`. A 30-line draft grew the textarea to 1920px
(field-sizing: content, JS fallback :577-596) and, once marked, `.psx-yours` grew to 1920px with the last
line inside it and no clipping ancestor (:947). Census across states: DM Sans 13/16/20 px, key term DM Serif
Display italic, 0 monospace, 0 uppercase text-transform. Copy: 0 hits in server HTML for "Standalone",
"Extract A, question 1", "Nothing is sent", "Saved in this browser", "ECON-", "KAA+E".
Noted, not rejected: the source booklet body is DM Sans 15.5px with A−/A+ (a fourth size). It is exactly
the approved v8 mockup's `--bsize` 15.5px text-size control, which the spec says to build.

**E067 CONFIRMED.** Every point-marked 1.3.5 item's bands are "Knowledge N / Application N / Analysis N /
Evaluation N" with N equal to the sum of its points (checked on the data for all 10). Section C (d) is
K2·A2·An2·E2, all earned (8/8). `negative-externality-tax-8` is re-expressed as K2·A2·An2·E2 from its
existing answer, with c7/c8 Evaluation `segRole: 'missed'`, so its verdict is K2·App2·An2 = 6/8. That
matches its commentary; likelyScore '6 / 8'. In the browser: ticking gave "2 / 4" and the rail "2/4". The
exemplar showed the margin letters K / App, the verdict "K2 · App2 = 4/4" and the examiner's comment.
"See it" on a missed point highlighted the sentence with a dashed underline and the note "You missed this
point. This is how the model answer earns it." An earned point gets a solid underline and "You made this
point." Clicking the booklet's "AED 0.25" while writing inserted it at the cursor ("The charge of AED 0.25").
After marking, clicking "AED 0.18" in the model answer linked the booklet figure.

**E068 CONFIRMED.** The bands in `economics_levels` (audit/raw/ial-paper-structure.json) match an
independent verbatim extraction of the Pearson SAM PDF (audit/raw/ial-econ-levels.json, sha-pinned): 14 =
KAA 1-3/4-6/7-8 + E 1-2/3-4/5-6; 20 = KAA 1-3/4-6/7-9/10-12 + E 1-3/4-6/7-8. The file's note about WEC11
Q13 printing E L3 as 5-8 is confirmed by that extraction (Q14 prints 7-8). The descriptors are paraphrases,
not Pearson's text. My R14 A/B, run on in-memory clones: the controls are clean on all three levels items,
and 15/15 mutations fire. The mutations were: dropped strand, duplicate strand, empty indicative list, blank
indicative, mark outside its band, level missing from the scheme, non-integer mark, verdict missing a
strand, no verdict, `criteria` put back, `levels` removed from a paper item, a segment with a bad strand, a
segment with no strand, E 5 in L3 (the overlapping SAM misprint), and a tariff/scheme mismatch. Sum over the
tariff also fires (14-mark KAA 9 → "sum to 15"). The bank has 0 R14 findings.
UI: choosing Level 3 then 8, and E Level 2 (4), gave "12 / 20". "What examiners look for" is shown with its
indicative lists. In the revealed state the level buttons are not interactive.
Examiner's reading of the three verdicts:
- 6(e) Discuss 14, KAA L3 (8) · E L3 (6) = 14/14. It defines both failures precisely, uses the -0.6 PED to
  predict and tests the prediction against the 32%, runs a multi-stage chain to the welfare loss, and
  quantifies regressivity. The evaluation questions the evidence on three grounds, weighs the equity–efficiency
  trade-off and an alternative (a sugar-content tax), then concludes. Top of both levels is defensible.
- Essay 8, deposit protection, KAA L4 (12) · E L3 (8) = 20/20. The definitions are precise, both sides are
  built as multi-stage chains that end in resource allocation, and the context is used as evidence
  (USD 250,000). The evaluation weighs design, expectations, who pays and time, and ends on a stated
  criterion. Full marks are defensible.
- Essay 7, "always necessary", KAA L4 (11) · E L3 (7) = 18/20. Borderline but defensible. The judgement is
  conditional and states its criterion (government failure against market failure). The weakness the
  commentary itself names (objections stated rather than weighed) is why E sits at the bottom of L3 and not
  at 8. A strict examiner could put E at 6 (top of L2). DEBT, not a reject: p3c, p4b, p4d and p4e carry
  strand KAA, yet they are evaluative in the SAM's sense (government failure, a cost weighed against a
  gain), so the margin tells a student that those sentences count towards KAA.

**E069 CONFIRMED.** Section D opens on both essays with "Answer ONE question from this section." and no
textarea, and 0 mark-scheme or exemplar blocks are visible. After picking 8, the rail dims 7. Marking 8 at
12/20 made the total 14 of 24. Switching to 7 ("Answer this question instead") made it 2 of 4: essay 8 was
dropped (PracticeShell.jsx:615-624). Model answers mode showed both essays with their verdicts and no pick
screen. The Draw question offers "Draw this on paper" with no textarea. "I’ve drawn it: mark it" shows
Knowledge 1 / Application 3 points and `/diagrams/positive-externality-consumption.svg` (200, loads). That
diagram is not one of the four the 12.8 geometry scan flags; the scan fixed it. Section A reads "Six 1-mark
questions." The link says "Open Market Failure in the app" and the note says "The quiz is in the topic’s
Quiz tab…", which does not claim the link lands on the quiz.

**E070 CONFIRMED.** With the site default in place (`html[data-theme=dark]`, `localStorage.theme=dark`,
which ThemeProvider.jsx:21-24 writes on every load), the shell renders `.psx[data-theme=light]`. The page
switch writes `rl:practice:theme` and the site key (:720-725). Dark survived a reload, and switching back
to paper wrote light to both keys. The CSS was grepped for hex, rgb(), hsl(), oklch, lab and color-mix
literal colours: none; the only keyword is `transparent` inside `color-mix` tints. The PracticeShell.jsx
SVG uses currentColor. Contrast with my computed-style walker, in 7 states per theme (points marking, a lit
earned sentence, a lit missed sentence, data question marking with a linked figure, levels marking, Model
answers mode, More practice): light min 5.18, dark min 4.60, 0 text nodes under 4.5.

**E071 CONFIRMED.** HEAD build against worktree build, all 32 pages. On every page the title, canonical,
meta description, og:* and every JSON-LD block are byte-identical, including market-failure. On each of the
31 non-shell pages the only differences are:
1. one deletion that starts at `p.lab-counts` and holds only lab-counts, lab-note and the lab-coverage
   section (its details, leaf list and code spec ids), ending at the next `section.lab-block`;
2. one replacement of the `seo-cta` block (plus the `lab-dr-card` section on the 6 pages that had one) by
   `p.lab-quiet-link` lines: "Data response: …" and "Open <topic> in the Revvy Learn app" (?section=).
Worktree HTML has 0 pages with "ECON-", "BUS-", "requirements in", lab-coverage, seo-cta, "Time estimates"
or "written question"; HEAD has 21/9/30/32/32/32/32. The shell page has no data-response card. The
subtitle's substance is already in the page's meta description.

**E072 CONFIRMED.** In Practise, stepping through all 13 questions untouched, none of the 212 scheme,
indicative and exemplar sentences appeared in `document.body.innerText`, and 0 mark-scheme, exemplar,
note, indicative or levels blocks were visible. The noscript render (scripts removed, noscript inlined)
showed 13/13 questions, 13 mark schemes, 13 exemplars, 99/99 notes, 6 levels tables, the booklet and the
diagram, with no textareas and no outline. Drafts: the `rl:attempt:v1:` key is unchanged and the record is
extended with `levels` (lib/attempt-storage.js:37-44). A reload restored the question, the essay choice and
the drafts. The 31 other pages change only by E071 (see above). My clip sweep result is below.

**E073 CONFIRMED.** public/logo.svg is 20,901 bytes (HEAD: 1,725,827). It is one 128×128 PNG, whose
header I decoded. The old file was two 2000px PNGs combined through a luminance mask. At 18/24/28 px the old
and new render the same at 1x and at 2x, on white and on the dark header ground (headless Chrome
screenshots). No code reference changed.

## Clip sweep (independent)

8,612 checks (321 widths, 320-1920 px by 5; 13 states x paper and dark, the rendered `.psx` theme confirmed per state; plus the phone outline open at every width up to 980 px): **0 failures**. The broken control (fixed-height marked answer) failed at 41/41 widths. Artefacts: `verify-a-clipsweep.mjs`, `verify-a-clip.json`, `verify-a-clip-broken.json`.

## Unclaimed but relevant (status unchanged)

- A student who ticked `criteria` on the three levels items under 12.8 has a stored `ticked` list and phase
  'marking', but no `levels`. They now see "0/20" (or "0/14"), counted in the one total. The draft is kept
  and the old ticks are silently scored 0. Small, and DEBT for 12.86 or a follow-up.
- Switching the practice page back to paper also writes `theme=light` for the whole site
  (PracticeShell.jsx:724). A student who never chose a site theme therefore leaves the page with the site
  light. The spec asked for exactly that key coupling; it is flagged here only as a side effect.
- Essay 7 segment strands (see E068).
- E056 (Quiz-tab deep link) is still the reason Section A cannot deep-link, as the spec intends.

## Gate

All nine claimed ids confirmed; none rejected. From this verification the gate may pass. The three items above are recorded as debt, not blockers.
