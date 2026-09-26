# Packet 13.7: two Economics drawing-drill specs (min-wage, ad-as)

26 Sep 2026. I created only `lib/diagram/specs/min-wage.mjs`, `lib/diagram/specs/ad-as.mjs` and this file. The registry (`lib/diagram/index.mjs`) is not touched: the main session registers the two specs. I ran no build, started no server and made no git writes. I read :3001 only, for the live chapter titles.

## min-wage

| | |
|---|---|
| Unit / code | WEC13 · 3.3.5 Government intervention |
| specTerm | "minimum wage controls" (econ_spec.txt:1526-1530, topic 2b "Types of government intervention in labour markets and their effects") |
| Refused elsewhere | 3.3.4 Labour markets and 1.3.6 both return a `checkSpecCitation` error with this term |
| Marks | **3** (shift, direction, employment). No region family, and `point`/`origin` are stated |
| Canvas | DL 140 − Q, SL 20 + Q, Wmin starts at the equilibrium ($80, 60,000). The model floor is $100 a day, which gives Qd 40,000 employed and 80,000 willing to work |
| Placement | check-in 4 (step 29/34), "Wage Controls in Labour Markets", the chapter that teaches it. Placement is the same without `placeWith`. Diagrams tab: under the "Wage Controls" card |
| Guard | `diagram-check --module … --only min-wage`: clean. `checkSpecCitation`: null |

## ad-as

| | |
|---|---|
| Unit / code | WEC12 · 2.3.4 National income |
| specTerm | "equilibrium level of real national output" (:1074-1077, topic 3a/3b) |
| Refused elsewhere | 2.3.2 and 2.3.3 return an error with this term. The scratch draft's "2.3.3 / aggregate demand" also fails |
| Marks | **3** (AD, left, new equilibrium) |
| Canvas | AD 150 − Y, SRAS 50 + Y, equilibrium Y 50 / PL 100. The model moves AD down by 20, giving Y 40 / PL 90. The axes are "Price level" and "Real national output ($bn)", which are the spec's words (:848, :1074) and the chapter's |
| Placement | check-in 3 (step 19/29), "Equilibrium Real National Output", the chapter that teaches it. **Without `placeWith` it would land on "The Multiplier"**, two chapters late. The last check-in holds the multiplier calculation. Diagrams tab: under the "Equilibrium Real National Output" card |
| Guard | clean. `checkSpecCitation`: null |

A full run with both modules plus every registered spec and fixture is clean: 6 specs and 6 fixtures. I walked every branch through `mark()`. Every note matches the student's diagram.

## Economics judgements for the founder (flagged, not settled)

1. **Minimum wage is a 3-mark drill, not 4.** `schema.md` lists it as 4 marks with the `minWage` welfare triangle. I have not seen an IAL mark scheme award a welfare-loss area on a minimum-wage diagram. The chapter's own exam tip asks for the floor above equilibrium, the quantity hired and the quantity willing. If the family were attached, the component would draw a "Welfare loss" region after marking even without M4. To add the mark: `regions: 'minWage'`, `expect.regions: ['dwl']`, remove `point`/`origin`, and write the region feedback. The schema.md table row now disagrees with the spec.
2. **"Excess supply of labour — unemployment."** The gap Qs − Qd includes workers who were drawn in by the higher wage and did not lose a job. Mark schemes usually accept "excess supply of labour / unemployment". Please confirm.
3. **Competitive labour market is stated in the prompt**, because the same chapter teaches the monopsony exception.
4. **Daily wage ($100 a day).** This is presentational: it gives the canvas the max-price proportions. An hourly axis would shrink the "old quantity" feedback band to about 4px.
5. **Only the quantity hired is marked.** The engine marks one point, so the quantity willing is a named wrong answer, not a second mark.
6. **The AD/AS prompt states the size**: "in total … falls by $20bn at every price level". Without it, the marker's "the gap should read 20" note would name a number the student was never given. "In total" stops it clashing with the multiplier chapter. The cost: the phrase nearly defines AD, so M1 and M2 are easier. The alternative is no number, with the size note wrong for shifts of 5, 10 and 30 or more.
7. **Consumer confidence falling (AD left)** rather than the chapter's government-spending rise. It is on-spec (:991) and makes the student choose the direction.
8. **SRAS only, straight line; the price level falls.** This matches the chapter. A Keynesian AS with spare capacity would show little price fall.

## Engine notes (not mine to change)

- With the wrong curve moved, M3 says "…from a curve that moved the wrong way". That is inaccurate: it was the wrong curve (`marking.mjs`).
- The screen-reader text says AD "shifted down by 20". On AD that is left.
