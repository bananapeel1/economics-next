# Learn Mode audit — September 2026

Source data for the remediation work. **Nothing here is re-derivable cheaply**, so do not delete it and do not
re-run the audit. Every remediation session should read only the slice it needs.

Headline: 75% of Learn Mode section opens never pass step 0 (825 of 1,093 starts, 211 signed-in students).
16 premium active vs 40 cancelled. 43 sections audited, 38 graded C, 5 graded D, none A or B.

## What is here

| File | Contents |
|---|---|
| `raw/code-findings-flat.json` | 117 code findings, one object each: lens, severity, title, file, line, fix, student impact |
| `raw/code-lenses.json` | The same findings grouped by reviewer, plus each reviewer's strengths list and a first-time-student walkthrough |
| `raw/code-verdicts.json` | 88 adversarial verification verdicts on those findings (6 contested, 0 killed) |
| `raw/content-audits.json` | Full per-section audit for all 43 sections: grade, summary, every recall judged, accuracy/quiz/practice issues, structure issues, IAL spec gaps, top fixes |
| `raw/content-work-flat.json` | The same content audits flattened to 1,170 individual work items (kind: topFix / accuracy / quiz / practice / structure / specGap) |
| `raw/research-ial-spec-coverage.md` | All 43 sections mapped to the official Pearson IAL specs; sub-topic gaps; off-spec content to remove; **exact exam structure and command-word tariffs per unit** |
| `raw/research-pedagogy-critique.md` | Learning-scientist critique, proposed 8-stage step anatomy, mastery-state definition |
| `raw/research-competitor-benchmarks.md` | Seneca, Up Learn, Save My Exams, Quizlet, Brainscape, Duolingo, Brilliant, Khan Academy; 12 design patterns with sources |
| `raw/research-founder-report-factcheck.md` | Claim-by-claim verdict on the original founder-written report, plus problems it missed |
| `raw/section-index.json` | Per-section counts: blocks, subsections, recalls, quiz, practice, diagrams, flashcards |
| `raw/engagement_aggregates.json`, `raw/funnel_aggregates.json` | Aggregate engagement, no personal data |
| `raw/econ_spec.txt`, `raw/bus_spec.txt` | Extracted text of the official Pearson IAL specifications |
| `content-sections/*.json` | Snapshot of live content for all 43 sections (content, notes, diagrams, flashcards, quiz, practice, extras) as of the audit |

## Command-word tariffs (the single most-needed fact)

Every one of the 215 live practice questions uses tariffs that do not exist in IAL papers. The real sets:

- **IAL Economics** — Define 2 · Calculate 2 or 4 · Draw 4 · Explain 4 · Analyse 6 · Examine 8 · Discuss 14 ·
  Evaluate 20. There is **no 10-mark question, no "Assess", no "Outline"**.
- **IAL Business** — Define 2 · Calculate 4 · Construct 4 · Explain 4 · Analyse 6 (always "two" factors) ·
  Discuss 8 · Assess 10 (Units 1–2) or 12 (Units 3–4) · Evaluate 20 (must end in a recommendation).
  Every question is anchored to a named extract line.

Full detail, including paper structure per unit, is in `raw/research-ial-spec-coverage.md`.

## Published report

The readable version of this audit is an Artifact: https://claude.ai/code/artifact/db87fab7-89f2-40bd-a9d9-9f6c510b374a
