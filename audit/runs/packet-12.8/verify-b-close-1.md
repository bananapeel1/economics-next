# Packet 12.8 — Verify B, close-out round 1 (targeted student walkthrough), 26 Sep 2026

Scope: only what the close-out changed. That is E057 (the data-response page now renders its Questions from the
bank) and E082 (the Draw item's diagram, `positive-externality-consumption.svg`). Method: `.claude/agents/student-walkthrough.md`.
I did not read or reuse the builder's `sweep-states.js`, `closeout-ab.mjs` or `page-ab.sh`.

**Server.** :3001 was `next-server` PID 46965, started 14:46:27, which is after the last edit to any file in scope
(the SVG, at 14:42:22). curl showed the served SVG equal to the file on disk. At 15:00:24 **another session restarted
:3001** (PID 60088), which reloaded my tab mid-sweep. I re-checked the new server by curl (SVG identical; the five
questions matched), then re-ran the whole model-answers sweep on it. Every result below comes from that server.
I used an isolated origin, `vb128c.localhost:3001`, so localStorage is not shared with other sessions' tabs.

**Hidden-tab note.** The pane is a hidden tab (`visibilityState: hidden`), and it never painted a scrolled viewport:
every screenshot after `scrollTo` came out blank or stale. I took screenshots at scrollY 0 with the content shifted
by `transform: translateY` on `body`. I made no measurement in that state. Nothing I checked relies on an animation.

## 1. /data-response/econ-u1-market-failure — PASS

- step 1, independent comparison. My own script imported the bank (`data/modelAnswersExpansion.js` and
  `modelAnswersData.js`) and took the 1.3.5 `paper.kind === 'data_question'` items. It built
  `Question (x) (n marks) — stem` and compared that with the `<p>` lines under the served `<h2>Questions</h2>`.
  Result: 5 served lines, 5 bank parts, **a/b/c/d/e with 2/4/6/8/14 marks, all 5 MATCH**. There is one
  `Questions` H2. The Model Answers H3s are (a)–(e) in the same order. I repeated this against the restarted
  server and got the same result.
- step 2, 390x844, dark. On screen: "Question (a) (2 marks) — Define the term 'negative externality of
  consumption'…", then (b) 4, (c) 6, (d) 8 and (e) 14, each once, in order, with nothing cut. Table 1 is stacked into 4
  row cards with each column heading above its value. It measures 350px in a 350px column, 0 of 20 cells
  overflow, and document scrollWidth is 390. — PASS
- step 3, 390x844, light (`theme=light`; body rgb(244,246,250)). Same text and same table geometry, readable. — PASS
- step 4, 1440x900, light and dark. Table 1 renders as a real 4-column table, 740px in a 740px wrapper, with 0
  cells overflowing and no sideways scroll. All five questions show on screen with their marks. — PASS

## 2. The Draw item (1.3.5 model-answers page, Section B Q2) — PASS

- step 5, the geometry by hand arithmetic, not the builder's geometry scan. S runs (100,320)→(440,80), MPB runs
  (100,120)→(400,340) and MSB runs (150,80)→(440,300).
  - At x=238.96: MPB is at y=221.9 and S at 221.9, so this is Q1/P1. MSB is at y=147.5, so MSB lies above MPB.
  - S∩MSB is at (289.8, 186.0), so this is Q*/P*. P* (y=186) is above P1 (y=222), and Q* (289.8) is right of Q1 (239.0).
  - The polygon's vertices are (Q1 on S), (Q1 on MSB) and (S∩MSB). That is the triangle between Q1 and Q*, with
    MSB above it and MSC below.
  - The picture now matches its `<desc>`, its alt text, criteria c1–c4, script p1a–p1d and the examiner commentary.
- step 6, 390x844, dark, Practise. I tapped the "2 Draw" card for real. The page shows the measles context, then
  "Sketch the diagram on paper…", with **no text box and no diagram** (`img` not rendered) and a "Mark my sketch"
  button. — PASS
- step 7. I tapped "Mark my sketch" for real. It shows the 4 criteria, then "Model answer · Marked 4 / 4", then the
  diagram on a white card. The img's computed width is 298px and its rect width is 298px, with transform none.
  - Read as a student: the axes are "Price, Benefit" and "Quantity (Q)". The red "MPC = MSC" line slopes up, the
    blue "MPB" slopes down, and the green "MSB" sits above and parallel-ish to MPB.
  - Dots mark (Q1,P1) on MPB∩MSC and (Q*,P*) on MSB∩MSC. Dashed guides run to P*/P1 on the price axis and to Q1/Q*
    on the quantity axis, with P* above P1 and Q* to the right of Q1.
  - The orange triangle "Deadweight loss" is the vertical side at Q1 from MSC up to MSB, closing at Q*.
  - The footnote reads "Free market under-consumes: Q1 < social optimum Q*." No labels overlap.
  - A student who copies it earns c1–c4. — PASS
- step 8. I switched to Model answers with a real tap. The same diagram shows, with the same geometry, beside the
  same four criteria. — PASS
- step 9. "Open the diagram full size" is a `target=_blank` link to the raw SVG. I opened it in a new tab. At full
  size every label is clear: text boxes are 25.5–30px tall on a 980px render, and every line, dot, guide and the
  triangle is readable. — PASS
- step 10, 1440x900, dark. Model answers shows the diagram at 520px (computed width 520, the same as the rect),
  with the correct geometry. — PASS
- step 11, 390x844, light. `theme=light` alone leaves this page on dark paper, because of the `rl-night` pin, a
  standing decision that the close-out did not change. With the pin lifted (the sweep's light method), the page
  paper is rgb(244,246,250) and the diagram card and its geometry are unchanged. — PASS

**V037 (known, separate, not blocking).** At 390px the SVG renders at 298/540 = 0.552 scale, so its 14, 13 and
12px text lands at **7.7, 7.2 and 6.6px at 390px** (P1, P*, Q1, Q*, MPB, MSB and the footnote are 7.2 or 6.6px).
At 1440 the scale is 0.963, which gives 13.5, 12.5 and 11.6px. The full-size link is the student's way out.

## 3. text-fit-sweep, 320–1920px in 5px steps, dark and light — PASS

This is `audit/scripts/text-fit-sweep.js` (its function body, with comments stripped and otherwise unchanged),
pasted into and run from each page. The CSP `connect-src 'self'` blocks loading it from a scratch server. It ran
with `load:'write'` and my own `prepare` probe (readyState complete, plus React props on `.ps-modes button`).

| page | control (must fail) | dark | light |
|---|---|---|---|
| data-response | `.md-table{container-type:normal}`, 320–640: **21 of 65 fail** (PAGE scrollWidth=423 at 320–420) | 321 checks, **0** | 321 checks, **0** |
| model answers | `.ps-sechead-t{white-space:nowrap}`, 320–420: **7 of 21 fail** (PAGE 330, BLEED 32px on the section header) | 34 states, 10,914 checks, **0** | 34 states, 10,914 checks, **0** |

**My states (model answers).**
- Section B: Q1–Q5 in Practise, the Draw item after "Mark my sketch", and Q1–Q5 in Model answers.
- Section C: parts (a)–(e), each with the answer tab, the Extract A tab and Model answers.
- Section D: both essays before a choice, essay 2 chosen and being written, essay 1 after the choice, and Model
  answers.
- More practice: in Practise and in Model answers.

**Read-back at 390 and at 1440 for every state.** It records the section, item id, mode, phase, whether the
diagram is visible, the selected tab, the theme and the page background.
- 33 of the 34 states engaged in both themes, for example `B2 practise` sketch with diagram:false, `B2 Draw
  marked` marking with diagram:true, and `B2 answers` with diagram:true.
- All 68 light read-backs show `light | rgb(244, 246, 250)`.
- **Not engaged:** my "C(e) marked" driver left (e) in its attempt phase, so it measured (e)'s writing state
  a second time. Section C marking is not something the close-out changed, and verify-a covers it.

## Console

Clean loads of both pages show no errors, only "[HMR] connected", Fast Refresh and React DevTools info. During the
run the log also shows "webpack-hmr WebSocket failed" ×14 (the other session's server restart) and a frame-src CSP
line (the sweep's own iframe). Both are dev or harness artefacts, not product faults.

## Check-in answers

This surface has no chapter check-in, so there is nothing to report.

## Audit complaints still visible

- A diagram whose labels are hard to read at 390: 6.6–7.7px at 390px (V037, known, not blocking).

## Non-blocking notes for the author

- The diagram's vertical axis reads "Price, Benefit", but the script (p1a) says "price, cost and benefit" and the
  red curve is a cost curve (MPC = MSC). A student who copies the picture leaves "cost" off the axis. This is a
  cosmetic label wording issue; c1 still reads "Labelled axes".
- The diagram says "Deadweight loss", while the question, criteria c4 and the script say "welfare loss". These
  are synonyms, but a first-time student may not know that.
- On a reload, the server HTML paints Practise before hydration switches to the stored mode. This is 12.75
  behaviour and not new.

## Verdict

**ok = true.** No blocking student-facing defect in what the close-out changed:
- the data-response page states the bank's five Section C parts exactly, in order and once each, with their marks,
  and Table 1 fits at 390 and 1440 in both themes;
- the Draw item's diagram is now correct and agrees with its criteria and caption in Practise and Model answers;
- the text-fit sweep gives 0 failures on both pages in both themes, and a control that must fail does fail.

V037 label size remains, known and separate.
