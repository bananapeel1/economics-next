# Packet 55 brief — business__global-marketing (IAL Business 4.3.3)

Bookkeeping/brief only. Authored nothing, changed no source file, staged nothing, ran no build/test/
validate/gate. Everything below is either a document quote, a ledger dump, or a count produced by a
command shown inline — never a build or verification outcome.

## 1. Handoff documents read, and the one gap in them

Read in full: `audit/PROTOCOL.md` (155 lines), `audit/SESSION-PROMPT.md`, `audit/PROGRESS.md` (row 108
and the "Content" table's own header note at line 62), `audit/DECISIONS.md` (the "## Settled" section,
line 13 onward — grepped for `global-marketing`, `4.3.3`, `packet 47`, `packet 55`: zero hits beyond
`SPEC-OWNERSHIP.md`'s own row, quoted below), `audit/CONTENT-GATE.md` (494 lines, including the recall
contract and the 26-Sep check-in answer rule), `audit/SPEC-OWNERSHIP.md` (103 lines).

**No `## Packet 55 spec` heading exists anywhere in `audit/NEXT.md`** (`grep -n "Packet 55" audit/NEXT.md`
→ no output; the newest `## Handoff` in the file is "packet 47 (global-markets-expansion) closed, gate
passed," at line 11053). This is the same gap packets 41/43/44/45/46/47's own handoffs each hit and
normalized, citing PROTOCOL's own rule that **the ledger is the definition of coverage** — not a
contradiction between authorities, and not something this brief is inventing a workaround for; the ledger,
`audit/CONTENT-GATE.md` and `audit/SPEC-OWNERSHIP.md` supply scope instead, as they did for those five
packets.

**PROGRESS.md row 108's "7" is traffic, not a ledger count**: `| 55 | global-marketing | 7 | not started |
| | |` sits under "## Content — one section per packet, traffic order" (line 60), whose own header note
(line 62) says `Opens` "is not a count of ledger items: never compare it with the ledger and never edit
it." The ledger holds 23 items for this packet (below). No contradiction — the two numbers measure
different things and the file says so.

**No contradiction found** between `PROTOCOL.md`, the `DECISIONS.md` Settled list, and
`CONTENT-GATE.md` for this packet's scope. The one document that names this packet directly —
`SPEC-OWNERSHIP.md:29` — agrees with the ledger's own `topFix-01`/`specGap-02`/`specGap-03` (see §5).
**Not escalating**: no handoff document disagrees with another or with the ledger here.

## 2. Ledger, counted fresh

`node audit/scripts/ledger.mjs packet 55` and `node audit/scripts/ledger.mjs packet 55 --open` return the
**same 23 ids** (saved: `audit/runs/packet-55/ledger-packet-55.txt`,
`audit/runs/packet-55/ledger-packet-55-open.txt`) — **23 open, 0 confirmed, 0 wont-fix, 0 rejected.**
By kind: 5 `topFix`, 1 `accuracy`, 1 `quiz`, 8 `structure`, 8 `specGap`.

## 3. The section today (t=0), counted by a direct file read — not by the ledger's own arithmetic

`python3` parse of `audit/content-sections/business__global-marketing.json` (a different method from
whatever produced the ledger's counts):

- 2 content blocks: **"Standardisation vs Adaptation"** (sections: Global Standardisation, Glocalisation:
  Think Global, Act Local) and **"Cultural Influences on Global Marketing"** (sections: Hofstede's
  Cultural Dimensions, Cultural Mistakes & Their Impact on Brand Building).
- 0 recall widgets on either section object. `meta.diagrams: 0`.
- 10 quiz items, 5 practice items, 18 flashcards, 5 common_mistakes.
- Quiz `correctIndex` values in bank order: `[2,2,1,2,1,2,1,2,2,2]` — **7 of 10 keyed to option C, 3 to
  B, 0 to A or D.** Not a ledger item; noted here as a count for whoever writes the replacement bank,
  since Layer 1's `quiz.long-correct`/position-bias family exists precisely for this shape.
- Quiz items index 1, 3, 4, 6, 8 (0-based) read on inspection: idx1 asks the reader to name the
  "polycentric" approach, idx3 names Ansoff's Matrix, idx4 names Porter's generic strategies, idx6 asks a
  niche-market characteristic, idx8 asks the reader to name the "ethnocentric" approach — none of these
  five terms appears in `content[]`'s body text (confirmed by reading `content[]` directly, not by
  re-running the ledger's own check).
- `content[1].sections[0]` ("Hofstede's Cultural Dimensions") body text teaches individualism/collectivism,
  power distance, uncertainty avoidance, and masculinity/femininity — Hofstede's actual four dimensions —
  at full paragraph length, plus a flow diagram of "how to apply Hofstede." Its `realExample` reads: *"KFC's
  ... slogan ... was reportedly translated into Mandarin as something close to 'eat your fingers off' ...
  a culturally inappropriate message in a high-context, collectivist culture."* "High-context" is Edward
  Hall's term, not one of the four Hofstede dimensions just taught, and no Hofstede dimension is actually
  applied to explain why the mistranslation was inappropriate — matches `accuracy-01`'s text verbatim.
- `flashcards[11]` and `common_mistakes[4]` both carry the Chevrolet Nova "no va" story — the same
  invented myth `CONTENT-GATE.md`'s Layer 4 section names by name as a corroboration failure from the
  March corpus.
- `content[0].takeaway[1]` reads *"Adaptation: tailored to each market — higher relevance but higher
  costs and complexity,"* but block 0 has no section titled or bodied as "Adaptation" — only
  "Standardisation" and "Glocalisation."
- Quiz index 2 (sachets): options `[Product, Price, Place, Promotion]`, `correctIndex: 1` (Price),
  explanation: *"This is primarily a pricing adaptation — **by selling smaller quantities** at lower
  price points"* — the explanation's own justifying clause names a product/pack-size change while the
  key is Price.
- `practice[3]`: "Explain **two** ways in which Ansoff's Matrix can be applied ..." at 4 marks, guidance
  naming "market development" and "product development" as the two ways, but describing the second as
  *"creating new products for existing international customers, e.g., adapting product ranges for local
  taste[s]"* — the example given (adapting an existing range) is product/market development in the
  spec's own international sense, not the diversification/new-product sense the label "product
  development" implies elsewhere in the same guidance.
- `practice[0]`'s guidance example is McDonald's adapting its India menu (no beef, local dishes);
  `practice[4]`'s guidance (Evaluate, 20 marks, cultural barriers) separately lists "different attitudes
  to American brands and fast food" under an India-flavoured list of barriers — the two read as opposed
  claims about how McDonald's/fast-food brands actually fare in India.

## 4. The spec span in scope, quoted (`audit/raw/bus_spec.txt:1424-1445`)

```
4.3.3 Global marketing
1 Marketing            a) Global marketing strategy and global localisation (glocalisation).
                        b) Different marketing approaches:
                          • domestic/ethnocentric
                          • mixed/geocentric
                          • international/polycentric.
                        c) Application and adaptation of the marketing mix (4Ps) to global markets.
                        d) Application of Ansoff's matrix and Porter's matrix to global
                           marketing decisions.
2 Niche markets         a) Cultural diversity: recognition that groups of people across the globe
                           have different interests and values.
                        b) Features of global niche markets.
                        c) Application and adaptation of the marketing mix (4Ps) to suit global niches.
3 Cultural/social       a) Considerations for businesses:
  factors                  • cultural differences
                           • different tastes and preferences
                           • language and unintended meanings
                           • inappropriate branding and promotion.
```

Bounded above by `4.3.2 Global markets and business expansion` (heading at `:1372`, last bullet at
`:1417` — packet 47's own topic, published today) and below by `4.3.4 Global industries and companies
(multinational corporations)` (heading at `:1451`). Confirmed by two independent methods: a direct
`sed -n '1370,1500p' audit/raw/bus_spec.txt` read, and a Python parse of `audit/raw/spec-items.json`
filtering `subject=="business" and topic=="4.3.3"`, which returns **exactly 15 leaves** —
`BUS-4.3.3-1a` through `BUS-4.3.3-3a-4` — with no leaf numbered past `1d`, `2c`, or `3a`(-1..4). There is
**no "1e", no "3b" through "3g", and no leaf mentioning "social media"** anywhere under this topic in
either the raw text or the generated leaf list.

`grep -in "social media" audit/raw/bus_spec.txt` returns 4 hits total in the whole document; the one
nearest this span is at `:1486`, which sits under `4.3.4` item 3 "Controlling MNCs" ("social media" as a
factor a pressure group might use to constrain an MNC) — a different topic, not this section's, and not
one any open item on this packet is assigned to.

`grep -in "hofstede" audit/raw/bus_spec.txt` returns **zero** hits anywhere in the Business
specification.

## 5. specGap items — numbering must be corrected against the spec text before use (Rule 1)

**Every `specGap` item on this packet cites a topic number one digit short of the real one.** The section
this packet rebuilds is `4.3.3`; the ledger's `specGap-01`/`-02`/`-03` cite `"4.3.1"` and `specGap-04`/
`-05` cite `"4.3.2"`. Both of those are **real, different topics in this same spec** — `4.3.1` is
Globalisation and `4.3.2` is Global markets and business expansion (packet 47, published today) — so a
builder who looks the citation up by number, rather than by the wording the ledger also gives, lands on
the wrong topic. This is the exact trap Rule 1 and the IAL-numbering note describe. Corrected citations,
checked against `audit/raw/spec-coverage.json`'s own (correctly numbered) entry for
`business__global-marketing` (`number: "4.3.3"`, `covered: 10, thin: 3, missing: 2` — 15 total, agreeing
with the 15-leaf count above):

| Ledger id | Ledger's own citation | Correct citation | `spec-coverage.json` says | Verdict |
|---|---|---|---|---|
| `specGap-01` | "4.3.1 (b)" | **4.3.3.1(b)** | thin (`"1b) Domestic / ethnocentric marketing approach"`) | Real gap in substance; ledger's "not taught... flashcards/quiz only" is stronger than the reference asset's "thin" — the two disagree on degree, not on whether it's a gap. Fix the citation before building. |
| `specGap-02` | "4.3.1 (d)" (Ansoff only) | **4.3.3.1(d)** | missing (`"1d) Application of Ansoff's matrix..."`) | Real gap. The spec's own `1d` is ONE bullet covering Ansoff **and** Porter together — see next row. |
| `specGap-03` | "4.3.1 (e)" (Porter) | **4.3.3.1(d)** — same bullet as `specGap-02`, not a separate letter | thin (`"1d) Application of Porter's matrix (generic strategies)..."`) | The lettered sub-item `(e)` **does not exist** in `1`; the real spec stops at `(d)`. `specGap-02` and `specGap-03` are the same spec leaf split in two by the ledger. Build them as one requirement (Ansoff AND Porter applied to global marketing decisions), not two. |
| `specGap-04` | "4.3.2 (b)" | **4.3.3.2(b)** | thin (`"2b) Features of global niche markets"`) | Real gap in substance ("only in a single evaluation paragraph" per `spec-coverage.json`'s headline); wrong topic number. |
| `specGap-05` | "4.3.2 (c)" | **4.3.3.2(c)** | missing (`"2c) Application and adaptation of the marketing mix (4Ps) to suit global niches"`) | Real gap; wrong topic number. |
| `specGap-06` | "4.3.3 (g)" — social media | no such leaf anywhere in `4.3.3` | not listed as missing or thin (item 3 is inside the section's "10 covered") | **Likely wrong, do not build.** "Social media" is not a `4.3.3` requirement in either reading of the spec text (§4); the only "social media" bullet in the whole document sits under `4.3.4`'s "Controlling MNCs," a topic this packet does not own. Teaching it here would add off-spec content — the exact failure Rule 1 warns against, just in the adding direction instead of the deleting one. |
| `specGap-07` | "4.3.3 (c)-(f)" | **4.3.3.3(a)**'s four bullets (cultural differences; different tastes and preferences; language and unintended meanings; inappropriate branding and promotion) are sub-bullets of ONE lettered item, not four separate letters | not listed as missing or thin | The mechanical coverage floor calls item 3 "covered" (its vocabulary co-occurs somewhere in the section), so this is a **depth/evidence complaint, not a coverage gap** — matches `structure-07`'s "no verified real example" concern. Legitimate as a quality item; miscited as a spec-gap letter range. |
| `specGap-08` | reverse gap (Hofstede not required) | n/a (absence claim) | n/a | **Confirmed.** `grep -in "hofstede" audit/raw/bus_spec.txt` is empty. |

**`structure-05`'s own renumbering premise is also wrong and should not be acted on as written.** It
claims "in the IAL WBS14 spec 4.3 is the topic ('Global marketing') with 4.3.1 Marketing, 4.3.2 Niche
markets, 4.3.3 Cultural/social factors." The verified text (§4) says the topic itself **is** `4.3.3 Global
marketing`, and its three internal items are unlettered `1`/`2`/`3` (Marketing / Niche markets /
Cultural-social factors), not a further `4.3.1`/`4.3.2`/`4.3.3` split — the same digit-short error as the
`specGap` items above, applied to the section's own top-level number instead of a sub-item. The app's
existing "4.3.3" tag is correct and should not be changed. `structure-05`'s substantive complaint —
that niche markets (the topic's item 2) exists only in flashcards/quiz/practice/extras and not in
`content[]` — restates `specGap-04`/`specGap-05` and stands on those, not on the renumbering.

## 6. Per-id summary: title, scope check, what "done" means

**topFix-01** — add a content section teaching the three approaches (4.3.3.1b) plus short
Ansoff/Porter-applied sections (4.3.3.1d) and a niche-markets section (4.3.3.2), and until then strip
quiz indices 1/3/4/6/8 from the bank. Scope check: consistent with §4 and with `SPEC-OWNERSHIP.md:29`
(below). Done = those three requirement clusters taught under their own heading in `content[]`, and no
quiz item testing a term absent from `content[]`'s body text.

**topFix-02** — replace the Hofstede section with a spec-aligned "language, translation, branding, social
media" section... **the "social media" half of this instruction inherits `specGap-06`'s problem** (§5):
social media is not a `4.3.3` leaf. Done = Hofstede demoted to extras (matches `specGap-08`), Chevrolet
Nova and the KFC anecdote replaced with corroborated examples (Layer 4: corroborated-or-deleted, no
"reportedly"), and the new section teaches `4.3.3.3(a)`'s four actual bullets — cultural differences,
tastes/preferences, language and unintended meanings, inappropriate branding/promotion — not a fifth,
uncited "social media" bullet.

**topFix-03** — fix quiz index 2 (§3 confirms the Price/Product tension in its own explanation text),
rewrite index 7's distractors, retire index 5 (the China/white trivia item). Done = `correctIndex`
matches an unambiguous stem or the stem is reworded so only one option is defensible (Layer 1's
`quiz.long-correct`/hedged-distractor rules apply to whatever replaces it).

**topFix-04** — add a fillin (three approach names) and a reorder (glocalisation decision process) recall,
plus one diagram. Done = both recall types built to the CONTENT-GATE recall contract (`fillin`:
`template[]`/`answers[]`/`hints[]`/`distractors[]`; `reorder`: `correctOrder[]`+`why[]` with the ordering
principle named in the prompt, per the Layer 1a rule — "in order of X" naming what X is). The diagram must
be pinned by `diagramId` and reachable at a check-in; **if that check-in also carries a quiz, the 26-Sep
check-in answer rule (BLOCKING) applies** — the diagram may not state the quiz's correct option, "near
enough" numbers count as leaking, and there is no automatic check for this (Verify A/B must each record a
`leaks`/`clean` line, per `CONTENT-GATE.md`).

**topFix-05** — practice guidance to IAL levels mark schemes (per `DECISIONS.md`'s 26-Sep ruling that
marking follows Pearson's SAM level bands above 6 marks, not point ticking); reword `practice[3]` to
"Explain **one** way..." at 4 marks (§3 confirms it currently asks for two ways at 4 marks, an
Explain-tariff mismatch); fix the product-development conflation in `practice[3]`'s guidance (confirmed,
§3); repair `practice[4]`'s India framing against `practice[0]`'s McDonald's example (both confirmed to
exist in tension, §3 — the actual fix is a content judgment, not made here). Done also satisfies
`CONTENT-GATE.md`'s per-section checklist item 6: guidance's first paragraph is a scaffold with no marks,
figures or answer.

**accuracy-01** — the Hofstede/KFC/"high-context" passage (§3 confirms verbatim). Done = either drop the
realExample or rewrite it so the framework named is the one actually applied, with no non-sequitur
cultural-dimension claim, per topFix-02.

**quiz-01** — quiz index 2's Product/Price ambiguity (§3 confirms). Done = key and explanation agree, or
the stem is narrowed to the dimension actually being tested.

**structure-01 through -08** — see §3 (counts), §4 (spec span) and §5 (`structure-05`'s numbering
correction) above; each restates or supports a `topFix`/`specGap` id rather than adding new scope of its
own, except `structure-06` (two of the three misconceptions are filler/off-spec — a content-judgment fix,
not independently checked here beyond confirming the misconception fields exist) and `structure-08`
(difficulty ramp — a structural/sequencing judgment for the build, not a spec-scope question).

## 7. Boundary against packet 47 (`global-markets-expansion`, 4.3.2), published today

`SPEC-OWNERSHIP.md:29` is the only document naming this packet directly, and it is internally consistent
with the ledger and with §4-5 above: **`global-marketing` (this packet, 4.3.3) is named as the owner of
"Ansoff and Porter's matrix applied to global marketing decisions"** (`4.3.3.1d`,
`bus_spec.txt:1435`), co-owning the frameworks-in-general leaves with `business-objectives-strategy`
(3.3.1.2a `bus_spec.txt:1098-1099`, PESTLE 3.3.1.4a `:1106` — quoted in full at §-adjacent read, already
committed per packet 27's row). Packet 47's row in the same table records that `global-markets-expansion`
(4.3.2) was rebuilt to **remove** its own Ansoff/PESTLE/generic-strategies subsections and hold each to a
single `POINTER_ONLY` citation, specifically because those leaves are not `4.3.2`'s and belong to `3.3.1`
and `4.3.3` instead. **No boundary conflict**: this packet's planned Ansoff/Porter build
(`topFix-01`/`specGap-02`/`specGap-03`) is the section packet 47's pointer is presumably pointing at, not
a duplicate of anything packet 47 kept. Not independently re-read from packet 47's own bundle in this
pass (out of this brief's scope — "author nothing"); flagged for the build session to open
`audit/runs/packet-47/built.md` or the live `global-markets-expansion` draft and confirm the pointer's
wording names `global-marketing`/`business-objectives-strategy` rather than re-describing the frameworks.

## 8. CONTENT-GATE requirements this packet's build will sit under

- **Check-in answer rule (BLOCKING, 26 Sep)** — applies the moment `topFix-04`'s diagram lands at a
  check-in with a quiz; quoted in full at `CONTENT-GATE.md:269-307`. No automatic check substitutes for
  it; Verify A and Verify B must each write an explicit `leaks`/`clean` line.
- **The recall contract** (`CONTENT-GATE.md:196-228`) — `fillin` and `reorder` shapes and their BLOCK/DEBT
  rules, for `topFix-04`.
- **Per-section checklist item 6, `practice.opening`** (`CONTENT-GATE.md:259-265`) — guidance's first
  paragraph carries no marks, figures or answer, for `topFix-05`'s rewritten items.
- **Layer 4, corroboration-or-deletion** (`CONTENT-GATE.md:371-384`) — governs the KFC/Nova replacements
  `topFix-02` calls for: a real example naming an entity and a year/figure needs a source a reviewer can
  check, or it is deleted rather than kept hedged with "reportedly."
- **Layer 1b, option-letter rule** — if any rewritten explanation refers to an option by letter, it must
  say "Option X," never a bare "(X)" (`CONTENT-GATE.md:73-79`), so the item stays shuffleable.

## 9. Escalate

Nothing found that requires a founder decision at the brief stage: no handoff document disagrees with
another or with the ledger for this packet, and the boundary against packet 47 is already resolved in
`SPEC-OWNERSHIP.md`. The only things worth a human's eyes before the build session commits to a plan are
the `specGap-06`/`structure-05` disposals proposed in §5 (both read as claims this brief's checking
overturns, in the same 1-in-8 rate `spec-coverage.json`'s own caveat predicts) — not contradictions
between authorities, just claims this pass could not sustain against the spec text.
