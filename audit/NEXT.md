# Next session brief

## First: resolve the concurrent-session situation

Another session was editing this working tree during packet 0, with **25 files staged at one point** (new
`components/SiteHeader.jsx`, `styles/theme-night.css`, and edits to `app/layout.js` and most marketing pages).
Creating `remediation/2026-09` moved that session onto this branch; it then branched to `feat/night-school` and committed there (f3a43d5), and is still editing marketing pages.
Packet 0 was committed onto `remediation/2026-09` via a temporary index, so none of that work is in the commit and the shared working tree was never switched. Decide:
commit it on its own branch, or discard it. Until then, do not edit `app/economics/page.js`,
`app/business/page.js`, `app/ial-revision/page.js`, `app/layout.js` or the unit pages.

## Then: finish packet 0 (one item left)

- [ ] **Three false marketing claims**, blocked above. When the pages are free: "24 spec points" → 23 (Economics
      has 23 sections) in `app/economics/page.js` (2 places) and `app/ial-revision/page.js`; "Adaptive flashcard
      algorithm" / "Adaptive Flashcards" / "adaptive difficulty" → spaced-repetition wording (it is basic SM-2)
      across `app/economics/page.js`, `app/business/page.js` and all eight unit pages; the hero badge value
      "Adaptive" → "Spaced". `app/upgrade/page.js` is already done. Blackjack needs no change: the live copy
      ("Beat the dealer, answer questions, level up your knowledge") makes no contextual-review claim.

## Then: packet 1 — Measure or don't bother

Read `audit/PLAN.md` packet 1. Key facts: `components/StudyApp.jsx` writes `furthest_step` on a 1s debounce
whenever a section is open regardless of tab (default tab is `overview`), and stamps the previous section's
step onto the next section's localStorage key. So 825/1093 is an upper bound on step-0 abandonment.
Deliverables: gate the write on a real Learn Mode render; reset `learnModeSection` on section change; six
server-written funnel events; error-check the upserts; a cancel-reason select on `CancelOfferModal`; re-run
the funnel (`audit` has the original query) and record the clean baseline in `PROGRESS.md`.
