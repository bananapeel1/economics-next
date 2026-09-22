# Packet 13.2 — what was built

22 September 2026. Brief: `brief.md`. Evidence: `spec-code-ab.txt`, `variety-ab.txt`,
`quant-unit-delta.txt`. Ledger: D018–D028.

## 1. Three of the four shipped templates pointed at sections that do not exist

Checked against `audit/raw/*_spec.txt` before anything was built, because the wiring joins a
template to a section BY SPEC NUMBER and a wrong number means the drill renders nowhere:

| template | shipped | corrected to | authority |
|---|---|---|---|
| `ped` | `1.2.4` | **`1.3.2`** Consumer behaviour and demand, topic 3b–c | econ_spec.txt:576, :604 |
| `multiplier` | `2.4.2` | **`2.3.4`** National income, topic 4b–c | econ_spec.txt:1056, :1079 |
| `breakeven` | `2.3.1` | **`2.3.2`** Financial planning, topic 3c–d | bus_spec.txt:885, :903 |
| `arr` | `3.3.3` | `3.3.3` — already right | bus_spec.txt:1146, :1155 |

`1.2.4` and `2.4.2` are UK GCE numbers: every IAL section number has 3 as its middle digit.
`2.3.1` is the third case and the interesting one — a real heading (Planning and raising
finance) and the wrong section.

Each template now also carries `specLeaf` (the topic and leaf), `qs` (the code from the
quantitative-skills appendix, econ_spec.txt:2760-2800 / bus_spec.txt:2265-2295) and
`specTerm` — a phrase the specification uses under that heading, which is what the test
checks. **`spec-code-ab.txt` is the A/B**: all three old codes put back one at a time, plus a
fourth sabotage, and all four now fail. The first version of that test asserted only the
SHAPE of the code and **passed `breakeven` at 2.3.1**; that miss is why `specTerm` exists.

## 2. Four new registrations, taking the registry to eight across the six areas DRILLS names

- **`payback`** (WBS13 · 3.3.3 · QS6) — completes investment appraisal beside `arr`. Drawn
  backwards from the payback month. Never 6 months: at 6 the named slip "months remaining"
  IS the answer and the third choice duplicates the right one.
- **`percentage-change-business`** (WBS11 · 1.3.1 · QS2) and **`percentage-change-economics`**
  (WEC12 · 2.3.5 · QS2, QS10) — one generator, registered once per subject. The Economics
  third step is QS10 itself: a growth rate falling from 5.2% to 3.4% is a fall of 1.8
  PERCENTAGE POINTS and output still rises.
- **`index-numbers`** (WEC12 · 2.3.1 · QS5, QS7) — the index, the inflation rate between two
  of them, a money wage deflated to base-year prices, and whether it rose in real terms.

Number sets are **enumerated, not drawn and retried**, the way `multiplier.mjs` does it. Four
conditions have to hold at once and they meet at about 3%: a rejection loop would throw on a
run of `quant-check` often enough to matter. Two of the four ARE the slip-separation rule,
applied where the numbers are chosen instead of after they have failed — at $100bn → $104bn
the slip "you gave the change, not the percentage change" is 4, which is the right answer.

`npm run quant-check`: **8 templates × 200 draws = 1600 items, all clean**; at `--draws 2000`,
16,000 items, all clean.

## 3. The guard's variety rule was failing correct templates

At `--draws 2000` it failed `ped`, `percentage-change-economics` and `multiplier` — because it
demanded 80% of the DRAWS be distinct, and drawing D times from V number sets can only reach
V(1 − (1 − 1/V)^D) of them. The floor is now 80% of what sampling can reach. A red herring in a
guard is worse than no guard: the next session "fixes" arithmetic that was right.
**`variety-ab.txt` is the A/B** — a sabotaged draw with its `variants` left untouched still
fails at both 200 and 2000 draws.

## 4. The pool, and where a drill lands

`lib/quant-pool.js`. Nothing stored, nothing authored: `templatesForSection` matches subject +
unit + spec number, and the figures are rebuilt from `${sectionId}:${templateId}:${attempt}`.
`1.3.1` is a section in BOTH specifications, so subject alone is not enough and neither is the
number.

Placement began as an even spread and was corrected by watching it: on `national-income` it put
the multiplier drill on check-in 2, one chapter BEFORE 1/MPW is introduced. A drill now goes to
the check-in of the chapter whose title shares a word with the template's — measured live, the
multiplier lands on check-in 4, after "The Multiplier Formula". Unmatched drills spread over the
check-ins after the first, never the first itself.

## 5. The two surfaces

**Learn Mode** — `CalculationItem` at the check-in, after the quiz, in both the check-in and
legacy branches. The intro sentence names it ("a quick question, a calculation and one thing
from earlier"), or packet 16's "Three questions" defect recurs in a new place. Scores gain a
`quant` bucket in MARKS, counted once per item id: "Mark my working" can be pressed again after
a correction and a score that moved each time would be measuring the button. "New figures"
bumps the attempt, which changes the seed, the id and therefore the React key.

**Quiz tab** — the calculation above the MCQs, from `unitCode` + `sectionNumber` props that
`StudyApp` already computes for `PracticeQuestionsTab`. **It is not in the quiz score**, and
that is not presentation: this tab posts `{score, total}` and compares bests "like with like"
on `total`, so folding a generated item into the total would silently orphan every attempt row
already in the table. A section with no MCQ bank still shows its drill.

No entitlement gate on either. A generated item is not a content bank, so withholding it
protects nothing F086 was about, and any gate would have to carry the three-valued `isPremium`.
Founder's call to overturn — DECISIONS.md.

## 6. Debt cleared

`quant.unit` was 20 baselined findings. Registering WBS11 clears **five** (the-market,
meeting-customer-needs, marketing-mix-strategy, managing-people, entrepreneurs-leaders); 15
remain and they are exactly WEC13, WEC14 and WBS14, which packet 13.3 covers.
`quant-unit-delta.txt` is the measurement, and it also shows **0 live keys missing from the
baseline**.

The five keys were removed **by hand**. `--baseline --confirm` at that moment would also have
folded in ~130 `practice.opening` keys from another session's live rule, and the baseline is a
file that may only shrink.

## Gate

`npm run build` 0 · `npm test` **263/263** · `npm run validate` 0 · `npm run exposure` 0 ·
`npm run recalls` 0 · `npm run quant-check` 0.

---

## This file is the BUILD. It is not where the packet ended.

Four fix rounds followed, and the gate figures above are superseded by `fix-round-4.md`. Read in
order: `verify-a.md` → `fix-round-1.md` → `verify-a-round-2.md` → `fix-round-2.md` →
`verify-a-round-3.md` → `fix-round-3.md` → `verify-a-round-4.md` → `fix-round-4.md` →
`verify-a-round-5.md`. `verify-b.md` is the 390×844 walkthrough, taken after round 1.

**Every one of the five verification rounds found something**, and two of them found defects in
work the earlier rounds had already confirmed:

1. `payback` was built, drawn, marked, guarded — and reached no student.
2. **D028 was confirmed in round 1 and rejected in round 2.** It asserted two things and a fix
   round traded one away, so it read as confirmed while half of it was false.
3. A wrong CHOICE that was the right answer, 1 draw in 5,890 — which led to the finding this
   packet will be remembered for: **five of the eight templates printed their own answer**, three
   of them shipped and verified in packet 13.1.
4. The guard written for (3) was then **defeated at 100% of draws** on a template this packet
   built, by the same class it was written to catch.

The through-line is one sentence: **a figure can be individually correct and still be the answer.**
