All components live in `/components/notes/`. All tokens defined in `/styles/tokens.css`.

## KeyIdea

Props: `{ text: string }`

- `border-left: 3px solid var(--rl-green)`
- `background: var(--rl-green-bg)`
- `border: 1px solid var(--rl-green-bd)`
- `border-radius: 0 var(--rl-r-md) var(--rl-r-md) 0`
- `padding: var(--rl-sp-3) var(--rl-sp-4)`
- Label: 9.5px, 700, uppercase, color `var(--rl-green)`
- Text: 13.5px, line-height 1.65, color `#a8f0c4`

## FlowChain

Props: `{ steps: string[], result: string, resultType: "good" | "bad" }`

- Container: flex row, flex-wrap, `gap: var(--rl-sp-1)`, `margin: var(--rl-sp-4) 0`
- Step pill: bg `var(--rl-bg3)`, border `1px var(--rl-border2)`, radius `var(--rl-r-sm)`
- Step pill: padding `6px 11px`, font 12px weight 500, color `var(--rl-text)`
- Arrow: color `var(--rl-green)`, 15px bold
- Result good: bg `var(--rl-green-bg)`, border `var(--rl-green-bd)`, color `var(--rl-green)`
- Result bad: bg `var(--rl-red-bg)`, border `var(--rl-red-bd)`, color `var(--rl-red)`

## RealExample

Props: `{ emoji?: string, text: string }`

- bg: `var(--rl-teal-bg)`, border: `1px solid var(--rl-teal-bd)`, radius: `var(--rl-r-md)`
- `padding: var(--rl-sp-3) var(--rl-sp-4)`
- Label: 9.5px, 700, uppercase, color `var(--rl-teal)`
- Text: 13px, line-height 1.65, color `#99f6e4`

## Misconception

Props: `{ text: string }`

- bg: `var(--rl-amber-bg)`, border: `1px solid var(--rl-amber-bd)`, radius: `var(--rl-r-md)`
- `padding: var(--rl-sp-3) var(--rl-sp-4)`
- Label: 9.5px, 700, uppercase, color `var(--rl-amber)`
- Text: 13px, line-height 1.65, color `#fcd88a`

## ExamMatters

Props: `{ text: string }`

- bg: `var(--rl-blue-bg)`, border: `1px solid var(--rl-blue-bd)`, radius: `var(--rl-r-md)`
- `padding: var(--rl-sp-3) var(--rl-sp-4)`
- Label: 9.5px, 700, uppercase, color `var(--rl-blue)`
- Text: 13px, line-height 1.65, color `#a8c4fd`

## Takeaway

Props: `{ items: string[] }`

- bg: `var(--rl-bg2)`, border: `1px solid var(--rl-border2)`, radius: `var(--rl-r-lg)`
- `padding: var(--rl-sp-4)`
- Label: 9.5px, 700, uppercase, color `var(--rl-text-d)`
- Each item: flex row, ✓ prefix color `var(--rl-green)`, text color `var(--rl-text-b)`
- gap: `var(--rl-sp-2)`, margin-bottom: `var(--rl-sp-2)`
- Appears ONCE per chapter, after all sub-sections

## ChapterNav

Props: `{ chapters: {id, label}[], activeId: string, onChange: fn }`

- Pills link to `#id` anchors — smooth scroll, NOT content swap
- Active: bg `var(--rl-green-bg)`, border `var(--rl-green-bd)`, color `var(--rl-green)`
- Inactive: bg `var(--rl-bg2)`, border `var(--rl-border2)`, color `var(--rl-text-c)`
- Hover: `border-color var(--rl-green)`, color `var(--rl-green)`
- radius: `var(--rl-r-pill)`, padding: `5px 12px`, 12px, weight 500

## NoteSection (sub-section wrapper)

Props: `{ title: string, children: ReactNode }`

- Title: Inter, 16px, weight 600, color `var(--rl-text)`, margin-bottom `var(--rl-sp-4)`

## ChapterSection (chapter wrapper)

Props: `{ id: string, heading: string, children: ReactNode }`

- Heading: DM Serif Display, 22px, weight 400, color `var(--rl-text)`
- Bottom border: `1px solid var(--rl-border)`
- `padding-bottom: var(--rl-sp-4)`, `margin-bottom: var(--rl-sp-5)`
- Chapter container: `margin-bottom var(--rl-sp-12)`
