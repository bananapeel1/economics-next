# Packet 12.85, E070 — contrast on rendered pixels, paper and dark

Measured 26 Sep 2026 on the production build of this packet's tree (`next start` on a scratch copy of the worktree carrying this packet's files), page `/economics/market-failure-model-answers`, by `audit/runs/packet-12.85/contrast-run.mjs` in headless Chrome. Raw rows: `contrast.json`.

**Method.** For each state below, every visible element inside the page that owns text is collected. The page is then re-rendered with all text made transparent and screenshotted; an element's background is the median pixel of its own box in that screenshot (what is painted behind its glyphs: desk, sheet, tint, highlight, button fill). The foreground is the element's computed colour composited over that background by its alpha and inherited opacity. WCAG 2 ratio. Floor 4.5:1 for all text, no large-text allowance taken. `npm run contrast` does not read component CSS, so it cannot see this page.

**States** (1440x900 unless marked): first question blank (previous button disabled); 6(c) writing with the booklet; 6(c) marked by points with a point ticked, a sentence seen and a figure linked; 6(e) marked by levels with a level and a mark chosen; Section D essay choice; Section D after picking question 8 (7 dimmed in the outline); Model answers mode on question 2 (Draw, with the diagram); phone 390x844 with the outline open; phone 6(b) answer seen.

| Theme | Text elements measured | Below 4.5:1 | Lowest |
|---|---|---|---|
| light (the page's own data-theme read back: light) | 642 | 0 | 5.24:1 `psx-band` «4–6» (6(e) marked by levels, level and mark chosen) |
| dark (the page's own data-theme read back: dark) | 642 | 0 | 4.81:1 `psx-btn` «Mark my answer» (First question, blank (previous disabled)) |

The five lowest in each theme:

- light: 5.24:1 — `psx-band` «4–6», rgb(91, 100, 114) on rgb(232,242,239), 6(e) marked by levels, level and mark chosen
- light: 5.29:1 — `BUTTON` «Model answers», rgb(91, 100, 114) on rgb(238,241,247), First question, blank (previous disabled)
- light: 5.29:1 — `BUTTON` «Model answers», rgb(91, 100, 114) on rgb(238,241,247), 6(c) writing + booklet, figure linked
- light: 5.29:1 — `BUTTON` «Model answers», rgb(91, 100, 114) on rgb(238,241,247), 6(c) marked by points, a point ticked and seen
- light: 5.29:1 — `BUTTON` «Model answers», rgb(91, 100, 114) on rgb(238,241,247), 6(e) marked by levels, level and mark chosen
- dark: 4.81:1 — `psx-btn` «Mark my answer», rgb(237, 240, 247) on rgb(4,120,87), First question, blank (previous disabled)
- dark: 4.81:1 — `psx-btn` «Mark my answer», rgb(237, 240, 247) on rgb(4,120,87), 6(c) writing + booklet, figure linked
- dark: 4.81:1 — `psx-btn` «Answer this question», rgb(237, 240, 247) on rgb(4,120,87), Section D essay choice
- dark: 4.81:1 — `psx-btn` «Answer this question», rgb(237, 240, 247) on rgb(4,120,87), Section D essay choice
- dark: 5.17:1 — `ps-fig` «AED 0.25», rgb(96, 165, 250) on rgb(37,48,73), 6(c) marked by points, a point ticked and seen

**What the first measurement found, and what changed** (trial runs on the dev build, not kept): the breadcrumb separators were `--border-primary` on paper (1.24:1 light, 1.19:1 dark). The disabled pager button and the unchosen essay's outline row were dimmed with `opacity`; they were not in the first state list, so states were added that show them. All three now use the muted ink token (`--text-muted` on paper, `--text-tertiary` in dark) and pass.

**Scope of this record.** Two widths (1440, 390), nine states, both themes, Chrome only. The colours inside the model diagram image are the file's own, on a light frame in both themes, and are not text of this page.
