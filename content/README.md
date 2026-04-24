# Content authored but not yet rendered

This folder holds prepared content ready for integration into the site. It is not served by any route today — everything here is safe to merge without affecting live pages.

## What's here

```
content/
├── data-response/          # 6 stimulus-based practice pieces (Econ U1 + Bus U1)
└── phase-3-rewrites/       # 6 full topic-page rewrites (Econ U3, U4; Bus U3)
```

## Sources

Generated as "Phase 3" of the revvylearn.com improvement plan — see
`~/Desktop/revvylearn-review-2026-04-23.md`,
`~/Desktop/revvylearn-content-review-2026-04-23.md`, and
`~/Desktop/revvylearn-improvement-plan-2026-04-23.md` on the maintainer's machine.

## Integration status

| Folder | Integrated? | Next step |
|---|---|---|
| `public/diagrams/` | ✅ Shipped (static assets, no render change) | Reference from existing JSX pages as needed |
| `content/data-response/` | ❌ Not yet rendered | Create `app/data-response/[slug]/page.js` route OR convert each `.md` to its own JSX page |
| `content/phase-3-rewrites/` | ❌ Not yet rendered | Convert markdown to JSX pattern used in `app/economics/market-failure/page.js` and replace existing page content at matching URL |

## Unit-rewrite URL mapping

Each markdown file in `phase-3-rewrites/` is intended to replace the existing page content at the following routes:

| Markdown | Target route |
|---|---|
| `econ-u3-market-structures-contestability.md` | `/economics/unit-3/market-structures-contestability` |
| `econ-u3-revenue-costs-profits.md` | `/economics/unit-3/revenue-costs-profits` |
| `bus-u3-business-objectives-strategy.md` | `/business/unit-3/business-objectives-strategy` |
| `bus-u3-decision-making-techniques.md` | `/business/unit-3/decision-making-techniques` |
| `econ-u4-trade-global-economy.md` | `/economics/unit-4/trade-global-economy` |
| `econ-u4-poverty-inequality.md` | `/economics/unit-4/poverty-inequality` |

## Editorial caveats before shipping

- Every statistic is hedged with "approximately" or "around", but each specific number (World Bank 692m extreme-poverty, UNDP ~1.1bn MPI, Drewry shipping index, OECD Pillar Two ~55 jurisdictions, etc.) should be fact-checked against primary sources before publication.
- Spec codes (WEC13 / WEC14 / WBS13) used as-given — confirm against current Edexcel IAL syllabus.
- Economist citations (Porter, Drucker, Sen, Piketty, Banerjee & Duflo, Baumol, etc.) are correctly attributed at a topic level, but any direct quote should be double-checked.
- Developing-country lens is prominent on `econ-u4-poverty-inequality.md` and `econ-u4-trade-global-economy.md` — matches the international audience positioning of the site.
