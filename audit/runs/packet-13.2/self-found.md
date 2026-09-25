# Found by the builder, before the verifiers reported

## 1. The Quiz tab's "New figures" does not clear the boxes (D021)

`components/quant/CalculationItem.jsx` says, in its own header: *"Callers pass key={item.id} so a
new seed remounts with empty inputs."* `LearnModeTab` does. `QuizTab`'s `QuantCard` did not — so
pressing **New figures** there hands the student a fresh question with their previous answers still
in the boxes and the previous marking still under them.

It falsifies the half of **D021** that says the student can redraw from the card; D026 is about
where the drill sits and what it does to the quiz score, and is untouched by it.

Held rather than fixed on sight: Verify A was reading `QuizTab.jsx` at the time, and a file that
moves under a verifier is how packet 16 ended up re-running a round. Fixed after its report, with
D021 re-checked against the fix.

## 2. The Economics percentage-change stem prints the answer to its own first step

`buildEconomics` writes: *"Real GDP in Kenya was $120 billion last year and $126 billion this year.
Forecasters expect the rate of growth to fall from **5%** to 4.1% over the next two years."*

Step 1 asks for the rate of economic growth this year. It is 5%, and the stem has just said so. A
drill whose first step can be read off the question is not a drill, and it is the step the other two
carry from — so the own figure rule never gets exercised either.

It came from making the stem's rates consistent with the figures, which was the right instinct
applied in the wrong direction: the fix for "the quoted rate contradicts the arithmetic" is to quote
only the rate the student is NOT being asked for.

The repair: the stem states the later figures only, and the QS10 step carries the forecast rate in
its own label, so the fall in percentage points is derivable from the student's own step 1 and from
nothing else.

Neither verifier walks `economic-growth` (2.3.5), which is where this template lands, so this is a
builder finding rather than a rejection. Held for the same reason as 1 — Verify A was reading the
file.
