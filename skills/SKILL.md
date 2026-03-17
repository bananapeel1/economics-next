---
name: revvylearn-notes
description: >
  Write, rewrite, and quality-check revision content for Revvy Learn
  (revvylearn.com), an Edexcel IAL Economics and Business revision platform.
  Use this skill whenever the user wants to write or improve notes, content
  sections, key ideas, examples, misconceptions, exam tips, flow chains, or
  component UI for any Revvy Learn spec point. Also use when the user asks to
  audit existing sections, generate new sub-sections, or produce Figma-aligned
  component code. Triggers on any mention of Revvy Learn content, IAL Economics
  notes, IAL Business notes, spec point writing, revision content quality,
  Figma design integration, or UI components for the revision platform.
---

## Page Structure

A spec point page (e.g. 1.3.1) is ONE scrollable page. It is NOT paginated. There is NO Next/Previous navigation between sub-sections.

The page contains, in order:
- Page header — spec ref badge, title, subtitle
- Chapter nav — horizontal pill row; clicking a pill smooth-scrolls to that chapter anchor on the same page (NOT swap content)
- Chapters stacked vertically
- Each chapter contains its sub-sections stacked in sequence
- A chapter takeaway at the end of each chapter (not each sub-section)
- Links To chips at the bottom of the page after the final chapter

**RULE:** Never create prev/next navigation between sub-sections. Never paginate content. Everything on one scrollable page per spec point.

## Anatomy of a Chapter

```
┌─ Chapter heading (e.g. "1. The Nature of Economics")
│
├─ Sub-section A: "Economics as a Social Science"
│    ├── Key Idea card
│    ├── Body paragraphs
│    ├── Flow Chain
│    ├── Real Example card
│    ├── Misconception card
│    └── Exam Matters card
│
└─ Chapter Takeaway  ← once per chapter, after all sub-sections
```

## Anatomy of Every Sub-Section

Every sub-section has exactly 6 parts, in this order:

| # | Part | Length limit |
|---|------|-------------|
| 1 | Key Idea — single insight | Max 180 characters |
| 2 | Body — 2–3 paragraphs | Max 3 sentences each |
| 3 | Flow Chain — mechanism as steps | Max 4 steps + result |
| 4 | Real Example — named real-world case | Max 3 sentences |
| 5 | Misconception — exact mistake examiners penalise | Max 3 sentences |
| 6 | Exam Matters — why/how this appears in the exam | Max 3 sentences |

### Part 1 — Key Idea

Length: 1–2 sentences. Hard limit: 180 characters.
Rule: Build the intuition first. Never start with the term being defined.

| ❌ Fail | ✅ Pass |
|---------|---------|
| "Market failure is when the market fails to allocate resources efficiently." | "Markets fail when prices give people the wrong signals — causing too much or too little to be produced relative to what's best for society." |
| "A negative externality is a cost imposed on third parties." | "When a transaction creates costs for people who had no say in it, the market price is lying — and the market will overproduce as a result." |

### Part 2 — Body

Length: 2–3 paragraphs. Max 3 sentences per paragraph.
Per paragraph: State the point → explain the mechanism → give the implication.
Tone: Second person ("you"), warm, direct.
Never write: "It is important to note that..." / "This concept is significant because..." / "In conclusion..."

Immediate fixes:
- Paragraph > 3 sentences → cut or split
- Sentence restates previous → delete it
- Passive voice → rewrite in second person
- Definition uses the defined term → build intuition first

### Part 3 — Flow Chain

Format: [Cause] → [Effect 1] → [Effect 2] → [Result]
Length: Max 4 steps + 1 result. Hard limit.
Result: resultType "good" = green, resultType "bad" = red.

| ❌ Fail | ✅ Pass |
|---------|---------|
| Market failure → welfare loss | Factory ignores pollution cost → Private cost < Social cost → Price too low → Market overproduces |

> **NOTE:** More than 4 steps needed? You have two mechanisms. Add a sub-heading and use two separate flow chains.

### Part 4 — Real Example

Length: 3 sentences. Hard limit. All three must pass:
- Names a real country, company or event (never "a firm" or "a country")
- Recognisable to a student in Dubai, Singapore or Nigeria
- Connects back to the Flow Chain mechanism

### Part 5 — Misconception

Length: 3 sentences. Hard limit.
- Sentence 1: What students wrongly say
- Sentence 2: Why it is wrong
- Sentence 3: What to write instead

### Part 6 — Exam Matters

Length: 3 sentences. Hard limit.
Must be concept-specific — could not be pasted onto a different spec point unchanged.

## Chapter Takeaway

Appears ONCE per chapter, after all sub-sections. 3–4 bullets, one sentence each, distilled exam-ready form of each sub-section's key mechanism.

## Red Flag Checklist

| What you see | Problem | Fix |
|---|---|---|
| Prev/Next nav between sub-sections | Wrong structure | Remove — one scrollable page |
| Takeaway after every sub-section | Wrong placement | Move to chapter end only |
| Paragraph > 3 sentences | Body too long | Cut or split |
| "It is important to note..." | Generic AI tone | Rewrite second person |
| Definition uses the defined term | Circular | Intuition first |
| Real Example has no named entity | Too generic | Name country/company/event |
| Misconception says "be careful" only | Not actionable | Add "instead write X" |
| Flow Chain > 4 steps | Two mechanisms merged | Split with sub-heading |
| Key Idea > 2 sentences | Too long | Cut to sharpest single insight |

## Figma Integration — Design System & UI Rules

When producing component code or auditing UI for Revvy Learn, follow these rules. They align to Revvy Learn's Figma file and codebase conventions.

### Design Tokens — CSS custom properties on :root

Never use raw hex values in components. Always reference a token.

```css
:root {
  /* Backgrounds */
  --rl-bg:      #0f1117;   /* page */
  --rl-bg2:     #13161f;   /* card / sidebar */
  --rl-bg3:     #1a1e2a;   /* nested */
  --rl-bg4:     #1e2333;   /* deepest */

  /* Borders */
  --rl-border:  #1e2436;
  --rl-border2: #252d42;

  /* Text */
  --rl-text:    #eef0f8;
  --rl-text-b:  #b8c0d8;
  --rl-text-c:  #7a8299;
  --rl-text-d:  #3d4560;

  /* Green (primary accent) */
  --rl-green:      #22c55e;
  --rl-green-bg:   rgba(34,197,94,.09);
  --rl-green-bd:   rgba(34,197,94,.22);

  /* Amber (warnings, misconceptions) */
  --rl-amber:      #f59e0b;
  --rl-amber-bg:   rgba(245,158,11,.09);
  --rl-amber-bd:   rgba(245,158,11,.22);

  /* Teal (real examples) */
  --rl-teal:       #14b8a6;
  --rl-teal-bg:    rgba(20,184,166,.09);
  --rl-teal-bd:    rgba(20,184,166,.22);

  /* Blue (exam matters) */
  --rl-blue:       #4f7ef8;
  --rl-blue-bg:    rgba(79,126,248,.09);
  --rl-blue-bd:    rgba(79,126,248,.22);

  /* Red (bad flow chain outcomes) */
  --rl-red:        #ef4444;
  --rl-red-bg:     rgba(239,68,68,.09);
  --rl-red-bd:     rgba(239,68,68,.22);

  /* Typography */
  --rl-font-body:    'Inter', sans-serif;
  --rl-font-display: 'DM Serif Display', serif;
  --rl-font-mono:    'DM Mono', monospace;

  /* Spacing scale */
  --rl-sp-1:  4px;  --rl-sp-2:  8px;  --rl-sp-3: 12px;
  --rl-sp-4: 16px;  --rl-sp-5: 20px;  --rl-sp-6: 24px;
  --rl-sp-8: 32px;  --rl-sp-10: 40px; --rl-sp-12: 48px;

  /* Border radius */
  --rl-r-sm: 6px;  --rl-r-md: 8px;  --rl-r-lg: 10px;
  --rl-r-xl: 12px; --rl-r-pill: 20px;
}
```

### Padding Rules

| Context | Token to use |
|---|---|
| Page content area (desktop) | `padding: var(--rl-sp-8) var(--rl-sp-12) 80px` |
| Page content area (mobile) | `padding: var(--rl-sp-6) var(--rl-sp-5) 60px` |
| All callout cards | `padding: var(--rl-sp-3) var(--rl-sp-4)` |
| Chapter heading bottom | `padding-bottom: var(--rl-sp-4); margin-bottom: var(--rl-sp-5)` |
| Between sub-sections | `margin-bottom: var(--rl-sp-8)` |
| Between chapters | `margin-bottom: var(--rl-sp-12)` |
| Flow chain gap | `gap: var(--rl-sp-1)` between pills |
| Flow chain margin | `margin: var(--rl-sp-4) 0` |
| Between callout cards | `margin: var(--rl-sp-4) 0` |
| Card label margin | `margin-bottom: var(--rl-sp-1)` |
| Section divider | `margin: var(--rl-sp-6) 0` |
| Chapter nav margin | `margin-bottom: var(--rl-sp-6); padding-bottom: var(--rl-sp-5)` |

### Typography Scale

| Element | Font | Size | Weight | Colour token |
|---|---|---|---|---|
| Page title | DM Serif Display | 28px | 400 | --rl-text |
| Chapter heading | DM Serif Display | 22px | 400 | --rl-text |
| Sub-section heading | Inter | 16px | 600 | --rl-text |
| Body paragraph | Inter | 14px | 400 | --rl-text-b |
| Card body text | Inter | 13.5px | 400 | see per-card spec |
| Card label | Inter | 9.5px | 700 | see per-card spec |
| Muted / meta | Inter | 11.5px | 400 | --rl-text-c |

Card label always: `text-transform: uppercase; letter-spacing: 0.07em`

### Component Specs

**KeyIdea**
- `border-left: 3px solid var(--rl-green)`
- `background: var(--rl-green-bg)`
- `border: 1px solid var(--rl-green-bd)`
- `border-radius: 0 var(--rl-r-md) var(--rl-r-md) 0`
- Label color: `var(--rl-green)` | Text color: `#a8f0c4` | Text size: 13.5px

**FlowChain**
- Container: flex row, flex-wrap, `gap: var(--rl-sp-1)`, `margin: var(--rl-sp-4) 0`
- Step pill: bg `var(--rl-bg3)`, border `var(--rl-border2)`, radius `var(--rl-r-sm)`, 12px 500 `var(--rl-text)`
- Arrow: color `var(--rl-green)`, 15px bold
- Result good: bg `var(--rl-green-bg)`, border `var(--rl-green-bd)`, color `var(--rl-green)`
- Result bad: bg `var(--rl-red-bg)`, border `var(--rl-red-bd)`, color `var(--rl-red)`

**RealExample**
- bg: `var(--rl-teal-bg)`, border: `1px solid var(--rl-teal-bd)`, radius: `var(--rl-r-md)`
- Label color: `var(--rl-teal)` | Text color: `#99f6e4`

**Misconception**
- bg: `var(--rl-amber-bg)`, border: `1px solid var(--rl-amber-bd)`, radius: `var(--rl-r-md)`
- Label color: `var(--rl-amber)` | Text color: `#fcd88a`

**ExamMatters**
- bg: `var(--rl-blue-bg)`, border: `1px solid var(--rl-blue-bd)`, radius: `var(--rl-r-md)`
- Label color: `var(--rl-blue)` | Text color: `#a8c4fd`

**Takeaway**
- bg: `var(--rl-bg2)`, border: `1px solid var(--rl-border2)`, radius: `var(--rl-r-lg)`
- padding: `var(--rl-sp-4)`, Label color: `var(--rl-text-d)`
- Each item: flex row, ✓ prefix color `var(--rl-green)`, text `var(--rl-text-b)`, gap `var(--rl-sp-2)`
- Appears ONCE per chapter, after all sub-sections

**ChapterNav**
- Pills link to `#id` anchors — smooth scroll, NOT content swap
- Active: bg `var(--rl-green-bg)`, border `var(--rl-green-bd)`, color `var(--rl-green)`
- Inactive: bg `var(--rl-bg2)`, border `var(--rl-border2)`, color `var(--rl-text-c)`
- Hover: `border-color var(--rl-green)`, color `var(--rl-green)`
- radius: `var(--rl-r-pill)`, padding: `5px 12px`, 12px, weight 500

### Figma-to-Code Workflow

When a Figma URL is provided:
- Call `Figma:get_design_context` with the fileKey and nodeId from the URL
- Map Figma colour styles to the nearest `--rl-*` token — never use raw hex unless no token matches
- Map Figma spacing to the nearest `--rl-sp-*` token
- Map Figma text styles to the typography scale above
- Produce React JSX using the component specs above
- For layout-only nodes, produce plain JSX with CSS custom properties

When no Figma URL is given, still use the tokens and component specs — never invent new hex values.

### Codebase Conventions

- `/components/notes/` — all note UI components
- `/data/notes/` — spec point data files (e.g. `1.3.1-intro-concepts.js`)
- `/styles/tokens.css` — CSS custom properties (the tokens above)

Framework: Next.js (React). Styling: CSS custom properties. No Tailwind, no CSS-in-JS.
Component files: `.jsx` | Data files: `.js` exporting sections array
