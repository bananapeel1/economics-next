# Next session brief

**Packet 0 — Day 0 hotfix.** Hours, not a session. All deletions or flags, no authoring.

Read first: `audit/PLAN.md` (the "Day 0 hotfix" section only).

1. Make the pre-test opt-in. `components/LearnModeTab.jsx:249` currently replaces step 0 entirely with
   `<PreTest>` whenever the section has quiz data. Offer "Test yourself first" / "Just teach me", and persist
   the choice so it does not reappear (`PreTest.jsx:119` currently calls onDone without writing the key).
2. Pull the 18 critical content items. Exact list with locations and suggested fixes:
   `audit/raw/content-work-flat.json`, filter `kind` in (accuracy, quiz, practice) and `sev == "critical"`.
3. Hide any InlinePractice block whose command word is not on the IAL list for that subject. Filter only,
   no rewriting. Tariff lists are in `audit/DECISIONS.md`.
4. Fix three false marketing claims: "24 spec points" (23 sections exist), "adaptive flashcard algorithm"
   (it is basic SM-2), Blackjack described as contextual review (it is a subject-wide random quiz).

Do NOT push any other content. Stable item ids do not exist until packet 2, so every push before then is a
blind overwrite of live data.

Exit: commit with `packet-0` in the subject, update `audit/PROGRESS.md`, rewrite this file for packet 1.
