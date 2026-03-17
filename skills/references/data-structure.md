Every spec point page uses this data shape. Save files to `/data/notes/[spec-ref]-[slug].js`

## Top-Level Export

```js
export const specPoint = {
  ref: "1.3.1",
  title: "Introductory Concepts",
  subtitle: "The foundations every Unit 1 and 2 answer rests on.",
  unit: "Unit 1: Markets in Action",

  // Chapter nav pills link to anchors on the SAME scrollable page.
  // They do NOT paginate or swap content.
  chapters: [
    {
      id: "nature-of-economics",
      label: "The Nature of Economics",
      heading: "1. The Nature of Economics",
      sections: [ /* see section shape below */ ],
      takeaway: [
        "string — one sentence, distilled exam-ready summary",
        "string",
      ]
    }
  ],

  // Shown once, after all chapters
  linksTo: [
    { label: "1.3.2 Demand", href: "/economics/1.3.2" }
  ]
};
```

## Section Shape (within a chapter)

```js
{
  id: "economics-as-a-social-science",
  title: "Economics as a Social Science",

  // Max 180 characters. 1-2 sentences. Intuition first.
  keyIdea: "Unlike physics, economics cannot run controlled experiments...",

  body: [
    { type: "paragraph", text: "**Economics** is classified as a **social science**..." },
    { type: "subheading", text: "Advantages of Specialisation" },
    {
      type: "flow",
      steps: ["Step 1", "Step 2", "Step 3"],  // max 4 steps
      result: "Testable predictions about the real world",
      resultType: "good"  // "good" = green, "bad" = red
    },
    { type: "diagram", component: "NegativeExternalityDiagram", caption: "..." },
    { type: "bullets", items: ["item 1", "item 2"] }  // max 4 items
  ],

  // Max 3 sentences. Must name a real country, company or event.
  realExample: { emoji: "🏦", text: "The Bank of England uses..." },

  // Max 3 sentences. S1: wrongly say. S2: why wrong. S3: write instead.
  misconception: "Students say economics is a science because...",

  // Max 3 sentences. Specific to THIS concept only.
  examMatters: "When asked why economics is a social science, examiners want..."
}
```

## Field Limits

| Field | Limit | Action if exceeded |
|---|---|---|
| keyIdea | 180 characters | Warn and reject |
| Each paragraph block | 3 sentences | Split or cut |
| flow.steps | 4 items | Split sub-section |
| realExample.text | 3 sentences | Cut |
| misconception | 3 sentences | Cut |
| examMatters | 3 sentences | Cut |
| takeaway per chapter | 4 items, 1 sentence each | Cut |
| bullets items | 4 items | Cut |

## Body Block Types

| type | Renders as | Required props |
|---|---|---|
| paragraph | `<p>` with bold parsing | text |
| subheading | `<h3>` sub-section heading style | text |
| flow | FlowChain component | steps, result, resultType |
| diagram | Named SVG component | component, caption |
| bullets | `<ul>` with green dot markers | items |

## What NOT to Include in the Data File

- No prev/next navigation metadata
- No pagination state
- No showTakeaway per-section booleans

The page renderer handles layout. The data file contains only content.
