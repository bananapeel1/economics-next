# Packet brief — the topic page ships the paid bank to everyone (V006)

**Written 16 September 2026 by the coordination session.** It lives in its own file rather than at the
top of `NEXT.md` because three content sessions were writing that file at the time. Fold it in when
the tree is quiet, or work from here.

## The finding, with the evidence

`app/economics/[unit]/[topic]/page.jsx` and `app/business/[unit]/[topic]/page.jsx` are server
components that read **all eight** section tables with `createAnonClient()` and pass the result to
`StudyApp` as `initialSectionData` (page lines 88-108, `StudyApp.jsx:381`). Four of those tables are
paywalled: `section_quiz` (every question with its `correctIndex`), `section_flashcards`,
`section_common_mistakes` — a paid-only surface with no preview at all — and `section_extras`.
`app/page.js` reads the same four.

So the complete paid content of a section is in the HTML of a page that needs no account. The Quiz
tab still slices to two client-side, which is why it looks gated. Measured on the dev server, signed
out, on `supply`: `GET /api/sections/supply` correctly returns 3 questions of a true 25, while the
completion screen's Quick Fire drill offers **25**, because it reads the page payload rather than the
API. That number is the tell, and it is how this was found.

**It is on `main`.** `git show origin/main:app/economics/[unit]/[topic]/page.jsx` has the same reads at
the same lines, so it is live now. It predates the recent work; F086 closed the API door and this one
was never closed. The finding is filed as **V006, packet 2.1**.

**The second layer.** The anonymous key ships in the browser bundle and those four tables are
readable with it directly — that is how `scripts/` read live content throughout this programme. Until
row-level security says otherwise, removing the payload from the page closes the casual leak (view
source, or any student who opens the drill) and not the deliberate one.

## Why the obvious fix is wrong

Both topic pages carry `export const revalidate = 3600` and `generateStaticParams` (page line 4 and
11). One document is built and served to everyone, so it cannot hold anything user-specific. Adding
an entitlement check there would force the page dynamic and undo PR #17's caching work, which is what
took the guide and topic pages to `PRERENDER` → `HIT`. The correct conclusion is the other way round:
**a shared cached document may only ever contain the free preview.**

## The work, in three parts

**1. The page ships the preview, the client upgrades.** Both topic pages and `app/page.js` send the
free surfaces in full (content, notes, diagrams, practice) and the same preview the API sends: quiz
through `freeQuizPayload()`, flashcards 2, extras 1 and 1, mistakes `[]`. Put that in **one function
both callers use** — `lib/preview-limits.js` already holds the numbers and the quiz builder — because
two copies of a cap are how they drifted apart in the first place. Then `StudyApp` upgrades for an
entitled student: fetch `/api/sections/[id]` on mount when the user is premium and replace the capped
initial data.

*Watch the flash.* Until entitlement resolves, paid surfaces must show a neutral loading state, not a
paywall that then disappears. `PaywallOverlay` already has this bug on the guides pages (see
[[revvylearn-guides-seo-audit]]): `if (isPremium) return null` with no `loading` guard. Fix it here
rather than reproducing it.

*Check what `app/page.js` actually needs.* It probably wants counts, not payloads. If so it should
read counts.

**2. Row-level security, which only the founder can run.** Revoke anonymous `select` on
`section_quiz`, `section_flashcards`, `section_common_mistakes` and `section_extras`. Keep it on
`section_content`, `section_notes`, `section_diagrams` and `section_practice`: the static build, the
sitemap and the four public Economics pages read those, and they are free surfaces. After that the
only reader of a paid table is `app/api/sections/[id]/route.js`, which uses the service role and
checks entitlement.

**Order matters.** Part 1 lands first, or the pages break at build time. And two callers need moving
before the policy changes:
- `app/page.js`, as above.
- `app/api/sections/depth/route.js` reads `section_quiz` for counts with the anon client (changed on
  15 September to fix the Vercel preview build). It goes back to `createServerClient()`, which is
  safe now that the route is `force-dynamic` and no longer runs during `next build`.

**3. A guard, so it cannot come back.** `lib/write-path.test.mjs` fails the build if a new file writes
a content table with its own client. This is its mirror on the read side: fail if any file outside
the entitled API reads one of the four paid tables with `createAnonClient()`. Without it, the next
page that wants a quiz count reintroduces the whole thing.

## Acceptance

- Signed out, view source on a topic page: no `correctIndex`, no mistakes, and the quiz array is the
  preview. The Quick Fire drill offers the same number the API sends, not the bank.
- Signed in as Pro: the full bank arrives and the drill offers all of it, with no paywall flash on the
  way there.
- `npm run build` exit 0 with the topic pages still prerendered, and the pages still served from cache
  on Vercel (`x-vercel-cache: HIT` after a warm request).
- The new read-path test fails when a paid table is read with the anon client, proven by trying it.
- After the SQL: the public pages, the sitemap and the depth endpoint all still work signed out.
