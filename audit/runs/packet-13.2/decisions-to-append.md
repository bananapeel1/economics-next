

## 22 September 2026 — quantitative drills reach students, and three of them were pointing at sections that do not exist (packet 13.2, D018-D028)

**Decision: a section's drills are DERIVED from its spec number, not authored into its content.** `lib/quant-pool.js` matches `template.specCode` against `section.number` within a subject and unit; the figures are rebuilt from `${sectionId}:${templateId}:${attempt}`. No content row changes, no migration, and a section gains a calculation the moment a template claims it. That is also why 13.2 was not in fact blocked on packet 2: the item ids the drills need are for the SM-2 queue, which is 13.3.

**The correction that had to come first, and the reason it is a decision and not a typo.** `ped` shipped `specCode: '1.2.4'` and `multiplier` `'2.4.2'`. **Every IAL section number has 3 as its middle digit** — `1.3.1` through `4.3.6` — so both are UK GCE numbers and neither matches a section in the product. `breakeven` shipped `'2.3.1'`, which is a real Business heading (Planning and raising finance) and the wrong one: break-even and margin of safety are `2.3.2 Financial planning`, topic 3 leaves c and d, `bus_spec.txt:885, :903-904`. Under the join above, all three drills would have been mounted and appeared **nowhere**, and the packet would have looked finished. This is the fifth sighting of the UK-GCE-numbering class the ledger already carries against content; it is now in code.

**So a template names a phrase, not just a number.** `specTerm` is a string the specification uses under that heading, and `lib/quant-pool.test.mjs` asserts it is there. The first version of that test checked only the SHAPE of the code — middle digit 3, unit digit matching, a heading with that number existing — and it **passed `breakeven` at 2.3.1**, because that heading is real. Measured, not assumed: `audit/runs/packet-13.2/spec-code-ab.txt` puts all three codes back one at a time and adds a fourth sabotage. A number that exists is not evidence that the topic lives there.

**The drill is not in the quiz score, and that is a data decision.** `QuizTab` posts `{score, total}` to `/api/progress/quiz` and compares a student's best "like with like" on `total`. Folding a generated item into the total would move every future attempt from 25 to 26 and silently orphan every row already in the table — a student's 18/25 would stop matching and their best would disappear. The calculation is marked by its own engine, above the questions, and says so.

**No entitlement gate on the drill, on either surface — founder's to overturn.** A generated item is not a content bank: there is nothing to leak, so withholding it protects nothing F086 was about, and a gate would have to carry the three-valued `isPremium` that packet 2.3 introduced. A free student gets the calculation; a paying one gets the same calculation.

**A guard that fails correct work is worse than no guard.** `quant-check`'s variety rule demanded 80% of the DRAWS be distinct stems. Drawing D times from V number sets can only reach V(1 − (1 − 1/V)^D) of them, so at `--draws 2000` it failed `ped`, `percentage-change-economics` and `multiplier` — three templates whose arithmetic is right. The floor is now 80% of what sampling can reach, and `audit/runs/packet-13.2/variety-ab.txt` shows a sabotaged draw still failing at both 200 and 2000 draws. The next session would have "fixed" the templates.

**Where a drill lands is a content decision, so it reads the content.** The even spread put the multiplier drill on `national-income`'s check-in 2 — one chapter before 1/MPW is introduced. A drill now goes to the check-in of the chapter whose title shares a word with the template's, and only falls back to a spread over the later check-ins. An unmatched drill never lands on the first check-in; a matched one may, because there the chapter it belongs to is the reason.

**The five baseline keys were removed by hand rather than by `--baseline --confirm`.** Registering WBS11 clears `quant.unit` for the five Business Unit 1 sections. The sanctioned rewrite would at that moment also have folded in ~130 `practice.opening` keys belonging to another session's live rule, and `audit/validator-baseline.json` is a file that may only shrink. The measurement is `audit/runs/packet-13.2/quant-unit-delta.txt`, which also records 0 live keys missing from the baseline. The 15 `quant.unit` keys that remain are exactly WEC13, WEC14 and WBS14 — packet 13.3's twelve templates.

**And the finding the packet will be remembered for: a drill that prints its own answer.** Five of
the eight templates marked a student correct for typing a figure they could already see — the
variable cost that equalled the contribution, the cash flow that equalled the total return, the
$25 price that equalled a 25% rise, the wrong CHOICE that was the right answer. Three were packet
13.1's, shipped and confirmed in September. None of `quant-check`'s six checks could see it,
because from inside a template every figure is correct: it is the combination of a correct stem
and a correct answer that leaks, and **only the rendered card shows it**. Check 7 reads the card
now — stem, labels, prefixes, suffixes and choices — and each of its three exemptions is a reason
rather than a threshold: a choice step's own answer (printing it is what a choice is), the method
line (a formula, never data), and a bare small integer with no currency marker ("Months into year
4" has to say 4). `audit/runs/packet-13.2/printed-answer-ab.txt` removes each template's rejection
in turn; the rarest instance the guard catches is 2 in 40,000, which is the one a verifier had
found by exhaustive counting.

**The probe that found four of the five did not look at the data.** Enumerating the draw's own
number sets and comparing fields reuses the filter it is meant to test and can only find what that
filter already knows. `leak-census.mjs` builds the item and reads its strings instead. That is the
same rule this programme keeps relearning — a check that shares the implementation's blind spot
cannot see past it — and it is now written into a guard rather than into a session's memory.

**An acceptance id may assert one thing.** D028 asserted two — that a drill lands on the chapter
that teaches it, and that an unmatched drill never lands on the first check-in — and a fix round
traded the second away on purpose, because reserving that slot left `payback` reaching no student
on the only section that carries it. Round 1 had confirmed it; round 2 rejected it correctly. A
half-true id reads as confirmed. Split into D029 and D030, both verified against the code as it
now stands.
