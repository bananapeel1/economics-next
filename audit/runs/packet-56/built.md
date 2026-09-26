# Packet 56 — built (global-industries-mncs, IAL Business 4.3.4, WBS14)

**STAGED to `draft`, NOT published. Live `data` untouched** (read back two ways, below). 28 of 28 ledger
ids claimed (`ledger-claim.txt`). Not committed. `audit/ledger.json` written by the claim CLI, not staged.

## Documents read, and the one scope call made

- Read: `audit/PROTOCOL.md`, `audit/SESSION-PROMPT.md`, NEXT.md's newest handoff (packet 53, lines 11443-11556),
  PROGRESS row 109 (`| 56 | global-industries-mncs | 6 | not started |`), the DECISIONS Settled entries from
  the top through the 25 Sep 1.3.5 ruling, CONTENT-GATE's recall contract, per-section edit pass, both
  check-in answer rules, Layer 1a and Layer 4, and this packet's `brief.md`.
- **No `## Packet 56 spec` exists in NEXT.md** (0 hits) — the same missing-document gap packets 41-55
  normalised; the ledger plus the raw spec defined scope, as PROTOCOL says. No contradiction found between
  the named documents.
- **Scope call (the brief's §1/§6 flag): the WIDE reading.** The practice set is rebuilt to the 26 Sep
  Settled ruling's Units 3-4 shape (Section A 4/4/8/12/12 + two Evaluate 20s, one source), which contains
  every literal ask of `topFix-04` and `practice-01`. Same call packet 55 made.
- **Rule 1 findings the brief did not make:** (1) **transfer pricing is not in `bus_spec.txt`** (0 hits;
  it is `econ_spec.txt:1617,:1883`) — so it is taught once, as the mechanism under 1b "tax revenues", not
  as a topic; (2) **BEPS / Pillar Two** is in neither specification and "implemented from 2024" is a dated
  claim about a real body — met by an undated, generic line under 3a legal control ("an agreed minimum
  rate of tax on the profits of the largest MNCs"); (3) the oracle holds **24** leaves for 4.3.4, not 25
  (30 rows, 6 `requirement` parents).
- **Layer 4 call:** every named real case the ledger mentions (Rana Plaza, DRC cobalt, Nestlé, Amazon
  Luxembourg, Shell/NNPC) is **deleted, not taught or re-dated** — "uncorroborated means deleted… a generic,
  true example always beats a specific, invented one". Replaced by an invented MNC (Korvane), host (Kestria)
  and low-tax country (Vessia), plus undated general patterns. Each name is banned in the runner and the ban
  A/B'd. A verifier may read `topFix-01`'s "with Rana Plaza/DRC cobalt" and `topFix-05`'s "date or replace"
  as requiring the names; this build chose "replace" / delete under Layer 4 and says so here.

## Files

| File | What |
|---|---|
| `scripts/_packet56-util.mjs` | ids, formatters, the MNC spine `FIRM` (:73), `BANNED` (:140), spec bullet lists, word counter |
| `scripts/_packet56-content.mjs` | 4 chapters (:30-33), 17 subsections (:37-444), `BLOCK_PLAN` (:469), `LEAF_MAP` 24 leaves (:529), `NOTES` (:562) |
| `scripts/_packet56-assessment.mjs` | `QUIZ` 25 (:52), `EXTRACT` (:150), `PRACTICE` 7 (:152-180), `FLASHCARDS` 26 (:190), `MISTAKES` 7 (:223), `EXTRAS` (:260) |
| `scripts/_packet56-diagrams.mjs` | 4 diagrams: pay (:82), transfer pricing (:115), ethics (:144), control (:178) |
| `scripts/packet-56-global-industries-mncs.mjs` | the runner: 12 check groups (:77-605), `--dump`, `--stage` |
| `audit/snapshots/2026-09-26-pre-packet-56__business__global-industries-mncs.json` | t=0 snapshot, all 8 tables, taken before any write |
| `audit/snapshots/packet-56-bundle__business__global-industries-mncs.json` | the staged bundle |

## Per ledger id (content file:line; runner guard in brackets)

- **topFix-01** — chapters 3 "International Business Ethics" and 4 "Controlling MNCs" (`content.mjs:265-467`):
  marketing ethics incl. greenwashing (:337), supply chain incl. child labour (:312), all seven 3a factors
  (:361, :383, :412, :444). Whole quiz bank replaced; every item tagged to a teaching chapter
  [runner §6 "the bank tests X and no subsection teaches it", §11].
- **topFix-02** — transfer pricing taught in ONE subsection, 1b tax revenues (`content.mjs:237`), neutral
  definition → profit shifting → legal limits; the minimum-tax agreement under legal control (:391);
  freed space used for balance of payments (:165), business culture (:191), host-country consumers (:213)
  [§11 "structure-02: transfer pricing is taught in N subsections"].
- **topFix-03** — transfer-pricing fill-in (`content.mjs:250`, answers transfer price / lower / less);
  FDI → jobs and suppliers → incomes → tax reorder with criterion and `why` (:147), sourced from extras chain 1
  (`assessment.mjs:260`); a two-subsidiary transfer-pricing diagram (`diagrams.mjs:115`). 17 recalls, 4
  diagrams in all [§8 named checks, §10].
- **topFix-04** — both 4-markers "Explain one…" on the source (`assessment.mjs:153,157`); off-topic
  location item gone; "Evaluate whether Kestria's government should offer Korvane a 5-year tax holiday to
  attract its second factory" (:175); levels naming K/App/An/Ev above 6 marks and model answers on the
  12s and 20s [§7].
- **topFix-05 / accuracy-01** — the net-loser sentence deleted; its correction taught (`content.mjs:175`,
  "does not by itself show that the host loses overall… the host keeps the wages, the local purchases, the
  taxes and the factory itself") plus a mistake card and a quiz item; Amazon/BEPS/Shell examples deleted
  under Layer 4 [§2 ban A/B'd; §11 "keeps the wages"].
- **quiz-01 / quiz-02 / quiz-03** — Rana Plaza item retired; greenwashing taught (`content.mjs:341`) and
  tested by a labelling scenario, not "What is greenwashing?"; controlling MNCs taught; the "campaigning →
  pressure group" stem gone [§6 "a retired live item survives"].
- **practice-01** — the context-free "global economy" 20-marker replaced by two source-based Evaluate
  essays with Level 1-4 schemes and model answers (`assessment.mjs:175,180`) [§7].
- **structure-01** — 17 recalls (3 fill-in, 8 classify, 4 match, 2 reorder) and 4 diagrams.
- **structure-02** — one transfer-pricing pass; no stakeholder re-sort chapter.
- **structure-03** — first subsection defines MNC, subsidiary, home/host country and FDI (`content.mjs:37`);
  arm's length defined where used (:237) [§11].
- **structure-04** — every quiz/flashcard/mistake term taught in `content[]` [§6 KEY_TERMS].
- **structure-05** — 17 different examMatters; no repeated takeaway [§9 guards].
- **structure-06** — misconceptions are specific student beliefs (e.g. FDI = any foreign money; legal =
  ethical; code of conduct = proof); the "always benefit / deliberately exploit" pair is gone [§11].
- **structure-07** — chapter titles match contents; live titles asserted absent [§11].
- **structure-08** — "current account", "multiplier", "resource curse", "global economy" banned and A/B'd [§2].
- **specGap-01** — `content.mjs:361,383,412,444`. **specGap-02** — :337. **specGap-03** — :312.
  **specGap-04** — stakeholder conflicts framed as ethics (:265). **specGap-05** — :165. **specGap-06** —
  :191. **specGap-07** — host-country consumers (:213). **specGap-08** — local labour (:63), local
  businesses incl. suppliers vs crowding out (:85), community and environment (:110).
- **specGap-09** — 4.3.4 confirmed by wording at `bus_spec.txt:1453`, no 4.3.5, and the database's
  `4.3.4 / WBS14` asserted by the runner [§5, §12].
- **specThin-01** — emissions and waste disposal defined and exemplified, plus sustainability (the ledger
  gap the brief found) (`content.mjs:289`) [§11].

## Measured (what, and how)

- Runner dry run and stage (`runner-2.log`, `stage.log`): all packet checks pass; validator 0 BLOCK / 1 DEBT
  (`quant.unit`, baselined: "no quantitative drill template is registered for WBS14", a platform gap) /
  4 INFO; 0 new BLOCK, 0 new DEBT; `recall.recoverable` 0; spec.coverage 24/24; would clear 35 baselined
  findings on publish.
- A/B (`ab-mutation.log`): 9 planted defects, each fires its named guard; modules restored byte for byte;
  clean control exits 0.
- Draft read back two ways: the tables directly (`draft-readback.log`: all 8 `draft == bundle`, `data ==`
  t=0 snapshot) and through the served API on :3001 (`served-check.log`: content/notes/diagrams/practice
  equal, leading pins name the same quiz ids, the signed-out quiz/flashcard slice equal by id, live still
  the 25 Sep two-block section). `check-staged-drafts.mjs global-industries-mncs` → matches.
- `npm run validate` exit 0 (0 findings); `npm test` 357/357; `npm run exposure` exit 0; `npm run recalls`
  exit 0 ("no section is worse than the baseline").
- Check-in surfaces (`checkin-surfaces.txt`), read by me, not a verifier: all four leading quiz keys are
  absent from their diagrams' title, description, checklist, labels and SVG text; the two runner notes
  ("$3" is a substring of "$30"; "political influence" labelled on the control diagram) concern later pins,
  served only on a re-pin.

## Not run / could not verify

- **`npm run build` NOT run** — it rewrites `.next` under the shared :3001 dev server eight other sessions
  are using. This packet touches no file under `app/`, `components/` or `lib/`.
- **Verify A and Verify B not run** (later phases). No 390px walk; no end-of-section score or skipped-recall
  reading — :3001 and its localStorage are shared with eight other packet sessions.
- **Rule 3 field compatibility against origin/main not run** beyond the runner's `mistakes-shape` check; the
  recall shapes are the ones packets 47/55 staged (no `shuffled`). Required before publish.
- Layer 4 corroboration by search not run: every example is invented or an undated general pattern.
- The Unit 4 hub copy (`app/business/unit-4/page.js:41-49`, `app/business/page.js:49`) still lists
  "Transfer Pricing & Tax" as a subtopic; not a ledger item, not changed.

## Publish (founder only, not run)

```
node scripts/packet-56-global-industries-mncs.mjs --stage && node scripts/publish-section.mjs global-industries-mncs --confirm
```
