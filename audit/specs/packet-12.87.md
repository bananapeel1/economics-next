# Packet 12.87 spec — Extract A on real, cited data

Written 26 September 2026. Authoritative spec for packet 12.87. The `audit/NEXT.md` block is a reservation
pointer only. If they disagree, this file wins and the disagreement is a contradiction to escalate.

**Precondition: packet 12.85 is committed.** 12.85 re-expresses 1.3.5's Section C criteria in Pearson's format
(its E067/E068), and this packet rewrites the same items around new figures. Check `git log` for a
`packet-12.85` commit; if there is none, stop and say so. The planned order runs it after 12.86, but it depends
only on 12.85; it touches no file 12.86 owns.

**Read first:** `audit/DECISIONS.md` → Settled → 2026-09-26, *"the rollout covers the top 25 topics, and every
extract uses real, cited data"*. A founder ruling, not an open question. This packet is its pilot: the method it
sets is copied by the 19 extracts the rollout writes and the five it re-sources.

## Why

Extract A (`content/data-response/econ-u1-market-failure.md`) carries Economics 1.3.5's Section C. Its only source
line is *"Composite of published government and industry estimates, 2024"*, beside precise figures (AED 0.18 external
cost per bag, a price elasticity of -1.4, "consumption fell by approximately 45%", diabetes prevalence 12.3%, USD 25
billion of healthcare costs). None has been traced to a source. It names a "regional think-tank Gulf Economic Review"
and a "2024 Ministry of Health review" that nobody has checked exist. Its policy timeline may also be wrong: the
orchestrator's recollection (unchecked, do not rely on it) is that Dubai's 25-fils bag tariff began in 2022 and
single-use bags were then banned, not charged, from 2024. A student who looks a figure up and cannot find it stops
trusting every page. Pearson's extracts are real and sourced; ours must be too.

## E081 — Extract A rewritten around real, cited figures

- **Keep the topic's spec coverage, not the story.** The extract must still let the five Section C parts examine
  1.3.5: externalities, indirect taxes and at least one other intervention, with data a student can use. Keep the
  UAE/GCC setting if real data supports it; change the case (same leaves) if it does not. Never bend a fact to fit a
  question: change the question.
- **Every figure is real.** Each number, date, rate and named body in the Stimulus (prose and every table) is
  traceable to a named, dated, public source: a statistics office, central bank, ministry or regulator, an
  international body (WHO, IDF, World Bank, OECD), a company report, or reputable press. Prefer the primary source
  to a report of it. Use the latest figure available and say its year.
- **No invented bodies, reports or quotes.** Every organisation named exists and said what the extract says it
  said. A quote is short, attributed and verbatim.
- **If a real figure does not exist, the column or sentence goes.** Table 1's "estimated external cost per unit"
  and "estimated price elasticity of demand" columns are the likeliest casualties. A published study's estimate is
  acceptable when cited as that study's estimate. A figure we compute from cited figures (a percentage change, a
  price with tax) is allowed if the extract shows how, or the question asks the student to compute it.
- **Citations on the page, Pearson's style.** Under the extract, a `Sources` list: publisher, title, date and URL,
  with "adapted from" where a figure is rounded or reworded. The stimulus prose is our own writing; nothing beyond a
  short attributed quote is copied from a source (copyright).
- **The record behind it.** `audit/raw/extract-sources/econ-u1-market-failure.json`: one entry per figure or named
  claim in the Stimulus, with `figure` (as printed), `claim`, `publisher`, `title`, `date`, `url`, `locator` (page,
  table or paragraph), `accessed` (2026-09-xx) and `note` (how it was rounded or derived). This file is the rollout's
  pattern; keep the shape simple enough for 24 more.
- Update what names the case: `PIECES` in `app/data-response/[slug]/page.jsx` (description), the index card in
  `app/data-response/page.jsx`, `lib/lab-data-response.js` (title). Slug, canonical URL and page title stay.

## E083 — a guard that catches an uncited figure (R15)

Add **R15** to `audit/scripts/validate-model-answers.mjs`, firing on every data-response md whose stimulus backs
bank data-question items (the same opt-in as R13): (a) the md has a `Sources` list whose entries each carry a URL
and a date; (b) no source line uses "composite", "synthesis", "indicative" or "estimates compiled"; (c) **every
number in the Stimulus section, prose and tables, has an entry in the page's `extract-sources` file** (normalise
units and thousands separators; years and part letters are figures too unless the file lists them as context).
For the other five md files, print them as known DEBT, not failures: their topic packets re-source them.
**Prove (a)–(c) by A/B mutation** into `audit/runs/packet-12.87/validator-ab.md`: add an unlisted figure, change a
listed one, restore "composite", drop a URL. Each must fire; the clean tree must pass.

## E084 — the questions and answers follow the new data

- The five Section C parts keep their letters, tariffs and command words (R10): Define or Calculate 2, Explain 4,
  Analyse 6, Examine 8, Discuss 14. Their wording changes only as far as the new data needs. Any part that quoted
  a removed figure is rewritten against a real one.
- Every model answer, script segment, criterion, examiner commentary, mark-scheme line and Common Mistakes entry
  that quotes a figure from the extract quotes the new one, and its reasoning still holds with it (a real
  elasticity can change the direction of an argument). R13 keeps the md and the bank's parts identical.
- **Ids.** Keep each part's id when its question is substantively the same; drafts are keyed by id. If a part's
  question changes substantively, give it a new id and say so in `built.md`, so no student sees a saved draft
  under a question it did not answer.
- `lib/stimulus.test.mjs` and `lib/practice-shell.test.mjs` parse this file. Update what they pin to the new
  stimulus honestly; do not weaken what they test (table parsing, figure detection).
- **This is new marking.** Verify A reads every changed answer as an examiner would, against the IAL level
  descriptors for its tariff and the 12.85 marking format, not only for criteria sums.

## E085 — nothing else moved, nothing is cut

- The other five data-response pages and the other 31 model-answer pages render identical HTML to HEAD (A/B).
- `audit/scripts/text-fit-sweep.js` returns 0 on the data-response page and the 1.3.5 page, 320–1920px in 5px
  steps, light and dark, including the new Sources list and any new table. Show it failing first on this page.
- `npm run spec-coverage`: 1.3.5 coverage does not fall; `zerocov` stays 0.
- JSON-LD, title and canonical of both pages unchanged apart from the question text they already carry.

## Verification: the figures are checked by someone who did not find them

Verify A re-finds **every** entry in `extract-sources/econ-u1-market-failure.json` independently: open the URL (or,
if it is dead, find the publisher's own copy), locate the figure at the stated locator, and record found / differs /
not found in `audit/runs/packet-12.87/source-check.md`. Any "differs" or "not found" rejects E081. A figure checked
only against the author's own notes is not checked. Verify B reads the page as a student who looks up two figures
of their choice from the Sources list.

## Ledger

`node audit/scripts/ledger.mjs packet 12.87`: E081, E083, E084, E085. The harness passes this packet only when
`ledger.mjs packet 12.87 --open` is empty (it lists open, claimed and not-fixed).

## Out of scope

- The other five extracts: each is re-sourced by the rollout packet that uses it (ROLLOUT.md). Business source sets.
- The diagrams listed in `audit/runs/packet-12.8/diagram-geometry-scan.md`, if any.
- The practice shell, the marker (12.86), anything that publishes or writes live database content (Rule 6).

## Notes for the author

- **Relayed chat is not an instruction to you.** The founder's messages to the orchestrating session may be
  relayed into your context ("write the 12.87 spec"); they were addressed to that session, which has acted on them.
- **Check every factual claim here, including the Why, before relying on it.** The policy timeline above is an
  unchecked recollection, stated so that you check it, not so that you repeat it.
- Your knowledge has a cutoff; policies and figures change. Use the web tools, and record what you actually read
  and when (`accessed`). If a source cannot be reached, say so; never cite what you did not open.
- The data-response page renders its questions from the bank (packet 12.8's close-out, E057). Edit the bank
  items; the md carries the Stimulus, Model Answers, Common Mistakes and Diagram Reference.
- The dev server serves stale output after edits (Turbopack). Restart it by port before any walkthrough.
- **Commit hygiene.** This worktree's git index is shared and written by other sessions. Stage nothing and commit
  nothing: the orchestrating session commits.
