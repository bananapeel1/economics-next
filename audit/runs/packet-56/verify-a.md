# Packet 56 — Verify A (packet-verifier, fresh context)

Section `business__global-industries-mncs`, IAL Business 4.3.4. 28 claimed ids. `built.md` was NOT read.

## Method (independent of the builder's runner)

- Read every ledger id with `ledger.mjs show` (not the builder's saved copy).
- Read the post-packet bundle `audit/snapshots/packet-56-bundle__business__global-industries-mncs.json`
  (1878 lines) in full, flattened by my own script into prose: all 4 blocks / 17 subsections (body, keyIdea,
  misconception, examMatters, recall), 25 quiz items, 7 practice items, 26 flashcards, 7 mistakes, 4 notes,
  extras (3 chains, 3 evaluations), 4 diagrams with every SVG `<text>` extracted.
- **Served-vs-file check by a different route from `check-staged-drafts`:** fetched
  `localhost:3001/api/sections/global-industries-mncs?draft=1` myself and compared each table after
  key-sorted canonicalisation. `notes`, `practice`, `diagrams` byte-equal; `content` equal except
  `quizIndices` (the signed-out preview remap `[3..6]→[0]` etc., `lib/preview-limits.js:116-125`); the 7
  served quiz items are verbatim members of the bundle's 25; flashcards 2 / mistakes 0 / 1 chain in the
  anonymous slice. The 18 entitled-only quiz items, 24 cards and 7 mistakes were judged from the bundle
  only; an entitled fetch was not made.
- Live `data` is still the t=0 content (staged, not published), so students still see the old defects
  until publish. Verdicts are on the staged draft, as for packets 51-55.
- Arithmetic recomputed by hand: wage premium 60/240 = 25% (`:75`); BoP 200-80-30 = 90 (`:322` area);
  transfer pricing 5,000,000 x $2 x 25% = $2.5m vs 5,000,000 x $10 x 25% = $12.5m (`:486`); quiz[4]
  70/350 = 20%; quiz[7] 70-30-12 = 28; quiz[8] (60-45) x 20% = $3, distractors $1/$4/$12 each derivable as
  the explanation says. Diagram 0 bar heights 120/150 = 240/300.
- Banned-term sweep over the whole bundle (every table): Rana Plaza, Nestl, Amazon, Luxembourg, BEPS,
  Pillar, Shell, NNPC, Greenpeace, DRC, cobalt, "current account", multiplier, "resource curse",
  "global economy", "net loser", proposes, OECD, 15%, "locate its manufacturing" — all 0.
- Spec: `audit/raw/bus_spec.txt:1453` is the only heading naming MNCs; it is 4.3.4, and
  `app/business/unit-4/page.js:41` uses 4.3.4.
- Untaught-material check: for each of the 25 quiz stems/keys, 26 cards, 7 mistakes, 3 chains and 3
  evaluations I located the teaching sentence in `content[]`. None tests material the lesson does not teach.

## Verdicts

| id | verdict | evidence |
|---|---|---|
| topFix-01 | CONFIRMED | Two blocks were added: `:549` International Business Ethics (2a-2d, with greenwashing at `:734` and child labour at `:682`) and `:803` Controlling MNCs (7 factors, `:806-964`). Named cases were replaced by generic real examples, and quiz/cards test only what is taught |
| topFix-02 | CONFIRMED | Transfer pricing appears in exactly one subsection (`:472`: 3 hits, arm's length 2, zero elsewhere in content). The freed space went to BoP `:301`, business culture `:380`, and host consumers `:416`. The international minimum tax is stated as "agreed" `:873` |
| topFix-03 | CONFIRMED | Transfer-pricing fillin `:501`. FDI reorder `:283`, with the criterion "cause to effect" and a `why` per step. Two-subsidiary diagram `:532`. The section has 17 recalls and 4 diagrams in total |
| topFix-04 | CONFIRMED | The set is 7 items `:1527-1569`: Explain 4/4, Discuss 8, Assess 12/12, Evaluate 20/20, all on Source A. The old production-location p3 is gone. The 20-marker `:1562` is the tax-holiday decision. Levels 1-4 plus "a strong answer, in outline" on the 8/12/20-mark items |
| topFix-05 | CONFIRMED | The net-loser sentence is gone and its correction is at `:322`. The Amazon/Luxembourg, BEPS "proposes" and Shell examples were removed, not patched, so none of the four errors can recur. The minimum-tax claim now reads "agreed" `:873` |
| accuracy-01 | CONFIRMED | The sentence is absent from the bundle (grep "net loser" 0). `:322` states the correct reasoning; mistake[1] and quiz[12] reinforce it |
| quiz-01 | CONFIRMED | The Rana Plaza item was retired (0 hits). Supply-chain ethics is taught at `:668`, and quiz[16] (child labour, lower tiers) is taught at `:682` |
| quiz-02 | CONFIRMED | Greenwashing is taught at `:734` (2.3 body[0]) and tested once, inside quiz[13] `:1381`. The old duplicate Q3/Q9 pair is gone |
| quiz-03 | CONFIRMED | The Greenpeace q5 was retired (0 hits), and Controlling MNCs is taught at `:806-964`. **Deferred debt (rule 5, 26 Sep founder ruling), not a rejection:** quiz[24] `:1513`, "agreed by many governments together", cues its key "an international agreement". quiz[19] `:1453` "self-regulation" cues "writes and audits itself". Both are guessable, and neither states the key |
| practice-01 | CONFIRMED | The context-free "global economy" 20-marker is gone. `:1562` is "Evaluate whether Kestria's government should offer Korvane a 5-year tax holiday", with a source, a Level 4 descriptor and a model outline |
| structure-01 | CONFIRMED | 17 of 17 subsections carry a recall (3 fillin, 8 classify, 4 match, 2 reorder), there are 4 diagrams, and the prose is about 270 words per step |
| structure-02 | CONFIRMED | Transfer pricing is taught once (`:472`). `fdi-stakeholder-analysis` is removed. Avoidance/evasion appears in no note, only in the 1.4 misconception and mistake[2] |
| structure-03 | CONFIRMED | 0.0 `:12` defines MNC, home/host, subsidiary and FDI before any use. Arm's length is defined at `:486`, in the same passage as transfer pricing. The order ramps from definitions to local, national, ethics and control |
| structure-05 | CONFIRMED | 17 examMatters, none with the "governance" template (0 hits). Maximum pairwise word-Jaccard is 0.29. 13 of 13 takeaways are unique |
| structure-06 | CONFIRMED | The mirror pair "always benefit" / "deliberately exploit" is 0 hits. The 17 misconceptions are specific, e.g. `:322`-area repatriation, legal≠ethical, code≠compliance |
| structure-07 | CONFIRMED | The block titles are now Local Economy, National Economy, International Business Ethics `:549` and Controlling MNCs `:803`, and each block delivers its title |
| structure-08 | CONFIRMED | "current account", "multiplier", "resource curse" and "global economy" are all 0 across the bundle. Framing is decision/stakeholder (Korvane/Kestria) |
| specGap-01 | CONFIRMED | Power and political influence `:806`, legal control `:860`, consumer pressure, pressure groups and social media `:913`, self-regulation `:964` |
| specGap-02 | CONFIRMED | `:728`: misleading labelling and inappropriate marketing activities, both defined, with a case |
| specGap-03 | CONFIRMED | `:668-682`: pay, conditions, exploitation and child labour developed across 5 paragraphs, plus a checks-match recall |
| specGap-04 | CONFIRMED | `:552`: stakeholder conflicts framed explicitly as ethics, with a shareholders vs workers vs consumers vs government case |
| specGap-05 | CONFIRMED | `:301`: in- and out-flows, the $90m net and a repatriation caveat |
| specGap-06 | CONFIRMED | `:380`: business culture defined, with spread and clash effects, and a classify recall |
| specGap-07 | CONFIRMED | `:416`: host consumers only. It opens "not in the MNC's home market" |
| specGap-08 | CONFIRMED | Wage premium in the body at `:75`, local businesses (suppliers vs crowding out) at `:119`/`:137`, community and environment at `:179` |
| specGap-09 | CONFIRMED | `bus_spec.txt:1453` "4.3.4 Global industries and companies (multinational corporations)"; notes meta "4.3.4" `:1044-1182`; hub `unit-4/page.js:41` ref 4.3.4 |
| specThin-01 | CONFIRMED | `:614` defines emissions and waste disposal with examples. Sustainability is at `:626`, with a 3-way classify recall |

(Line numbers above are in the bundle file unless another file is named.)

## Check-in answer rule (CONTENT-GATE, question-first live since 26 Sep)

The first unused pin in each chapter is the served check-in; confirmed via the served `quizIndices`.
- `CHECKIN ch0 MNCs and the Local Economy clean`: q3 (3% shareholding is not FDI). The diagram's text is only
  pay/jobs ($240, $300, 4,000 jobs), with nothing on shares or control.
- `CHECKIN ch1 MNCs and the National Economy clean`: q7 (net flow $28m). The diagram is transfer pricing
  ($20/$22/$30/$2/$8/$10), with no BoP figure and no $28.
- `CHECKIN ch2 International Business Ethics clean`: q13 (misleading labelling). The diagram says "Is the message
  fair?" and does not name labelling vs marketing activity.
- `CHECKIN ch3 Controlling MNCs clean` against the diagram: q19. "Self-regulation" is one of seven bare labels
  and is not defined. The stem's "self-regulation" cues the key "writes and audits itself", which is guessable
  but not stating (rule 5, deferred).
- Later pins: q8's key "$3" appears only as a substring of "$30" on diagram 1, so it is not stated. q20's key
  "political influence" is a diagram-3 label, but so are the other three options' labels, so the diagram does
  not single it out. At most this is diagram DEBT, and only on a re-pin.

## Unclaimed but relevant (status not changed)

- `app/business/unit-4/page.js:41-49` hub copy is stale against the rebuilt section: "reasons for MNCs",
  "power of global brands", "fair trade", "CSR", "sweatshops", and a 5-part a-e breakdown vs the section's
  4 chapters. `app/business/page.js:49` "Transfer pricing, FDI, ethical issues" omits control. This is not a
  ledger item.
- Reorder recalls `:283` and `:946` are verbatim copies of extras chains 1 and 2 (`:1829`). The chains are
  not on the step, so `recall.recoverable` is 0, but a student can open Extras and copy the order.
- Practice repeats the full Source A (about 1,000 chars) in each of the 7 question strings, with no
  `context`/`stimulus` field. This matches packets 54/55, so it is precedent, not a regression.
- Diagram SVGs hard-code `#e8ecf5` text on a transparent background. This is programme-wide and not
  re-checked here for light mode.

## Gate

All 28 confirmed and no check-in leak. From Verify A's side the packet gate can pass. The q19/q24 stem
cues and the hub-page copy are for the rewrite list and the pre-publish pass.
