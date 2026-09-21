## Handoff — after packet 39a (written 21 September 2026)

**Take packet 39b, ledger packet `39.1`, 27 open ids.** It is the second half of `trade-global-economy`
— Economics **4.3.2 sub-topics 4 and 5**, `econ_spec.txt:1657-1699`: trade liberalisation and trading
blocs, and restrictions on free trade. 39a built sub-topics 1-3 and the two halves write the SAME
bundle, so read `audit/runs/packet-39a/brief.md` before anything else.

**Start from `scripts/packet-39a-trade-global-economy.mjs`**, which is packet 34's runner plus four
checks it did not have: the **carried-block assembler** (select the other half's block and items out
of the live bundle by id, assert deep-equal, wire them), the **one-spine-one-country check** (a money
amount printed beside a fictional country must be one of that country's own), the **Appendix 6
citation check** (any command word named beside "Appendix 6" must be in this subject's census), and
the **inherited-findings split** (below). Its `CARRIED` map inverts cleanly: what 39a carried is what
39b rewrites.

### The six things 39b must know

1. **`npm run build` DOES NOT PASS IN THIS WORKING TREE, and it is nobody's content.** Two other
   sessions' uncommitted edits break it: `components/section-exam-practice.css` is **staged as
   deleted** while `components/SectionExamPracticePage.jsx` (committed at `d013b17`) imports it, and
   `components/SectionModelAnswersPage.jsx` is modified on disk into a prerender `TypeError: Cannot
   read properties of undefined (reading 'subject')` on two model-answers pages. HEAD's versions of
   both files are clean. Packet 39a changes **no file under `app/`, `components/` or `lib/`**, so its
   commit cannot affect either. Check `git status` for these two before blaming your own diff.
2. **The section has NO bloc assessment right now.** 39a removed `quiz:9f64a059`, `quiz:2f4d56cd`,
   `quiz:46a392d1`, `mistake:aafcbcbb` and `practice:f297c506` and replaced none of them, because an
   item pinned to a block that does not teach it is exactly the defect `quiz-02` and `quiz-03`
   report. **Re-author them; do not assume they are still there.** The four bloc flashcards and the
   ladder diagram were kept — removing them made `spec.uncovered` fire on ECON-4.3.2-4c-6.
3. **ECON-4.3.2-4c-6 is an accepted new DEBT and it is yours to close.** `spec.uncovered` reads
   content, notes and extras only. Live, that leaf matched a Notes sentence about comparative
   advantage containing "factors" and "movement" — a keyword false positive — and 39a's rewrite
   removed it. It is in `ACCEPTED_DEBT` in 39a's runner; delete the entry when you cover the leaf,
   because the runner asserts a listed exception still fires.
4. **`practice:e3345b30` says `Explain … (6 marks)` and the census gives Explain 4.** It is
   `BLOCK practice.tariff`, baselined, and it is `topFix-05`'s tariff clause. 39a's wiring pins it to
   chapter 5, so it is now the LAST practice item a student meets. Fix it early.
5. **`structure-02` was rejected by Verify A and is back open on 39.1.** 39a built its first clause
   (2 blocks / 4 subsections → 5 / 25). The second is untouched: the protectionism block is carried
   byte-identical, still two subsections, still 373 and 365 words against the 350 budget, still with
   no explanation of the tariff diagram in the body. Re-claim it when you rewrite that block.
6. **Two `practice.opening` findings and `spec.uncovered` on ECON-4.3.2-5a-5 fire on the LIVE
   section and are NOT baselined.** A runner copied from packet 34 defines a new finding as
   `!baseline.has(key)` and will report all three as yours. 39a's runner subtracts what already fires
   on `before` and prints them as inherited; keep that.

### What 39a leaves behind for any content packet

- **`recall.recoverable` can be held at zero and it is not expensive.** 23 recalls, 0 recoverable,
  in a section with no row in `audit/recall-census-baseline.json` and therefore held to zero. The
  method is the only thing that matters: every fill-in hands the student **figures the step has not
  printed** and asks for the division, and the one reorder is sourced from an extras chain in another
  tab. One classify had to be rewritten after the runner measured 0.80 on an item that paraphrased a
  sentence above it.
- **A false Appendix 6 citation is now a rule, not a reading.** 39a wrote "Appendix 6 defines Assess
  and Evaluate…" into two `examMatters` — Appendix 6 for Economics lists eight command words and
  Assess is Business-only. Fifth instance in the programme (21, 23, 35, 36/30, 39a), and the first
  four were all caught by a person. The check is in 39a's runner and is A/B'd against a deliberate
  false citation.
- **One spine, one country.** 39a's first draft hung the trade-flows figures on Sarova, which already
  had a terms-of-trade story with a $50.0bn balanced base and exports FALLING to $42.0bn — so Sarova
  had exports growing to $60.0bn in one chapter and falling to $42.0bn in another. Every figure
  divided; the two stories still contradicted. **No per-figure check can see this**, which is why
  the rule is structural and why the second spine is now Velora with amounts that do not collide.
- **`audit/scripts/snapshot-touched-sections.mjs` crashes on `globalisation`** (line 17 reads
  `snap[k].length` for a table missing from the t=0 file) and never reaches the sections after it, so
  a packet whose section sorts later gets no snapshot and no warning. 39a took its snapshot with a
  one-off equivalent rather than change a shared tool mid-packet. One-line guard, its own commit.
