/**
 * UPGRADE — 3.3.2 Business Growth
 * Rewrites section_content from old concepts[] format to new sections[] format.
 * Run: node scripts/upgrade-content-business-growth-u3.mjs
 */
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://trweeckuswgkenckeqfb.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRyd2VlY2t1c3dna2VuY2tlcWZiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzE0ODY2NywiZXhwIjoyMDg4NzI0NjY3fQ.P9EchrMjfJdouBPIs728fuqVTm5Jq1B0JPsEdCp4IA0'
);

const CONTENT = [
  /* ═══════════════════════════════════════════════════
   *  Chapter 1: Growth Methods
   * ═══════════════════════════════════════════════════ */
  {
    title: "Growth Methods",
    sections: [
      {
        id: "organic-growth-methods",
        title: "Organic Growth",
        keyIdea: "Organic growth means expanding from within — using retained profits, opening new outlets, or developing new products — it is slower but keeps the firm in control of its culture and quality.",
        body: [
          { type: "paragraph", text: "**Organic growth** (internal growth) occurs when a business expands using its own resources rather than merging with or acquiring another firm. The main funding source is **retained profits** — earnings reinvested rather than distributed to shareholders." },
          { type: "paragraph", text: "Common methods include opening new outlets, expanding into new geographical areas, developing new products, and investing in capacity. Organic growth preserves the firm's existing culture, avoids the integration problems of mergers, and allows management to grow at a pace it can handle." },
          { type: "paragraph", text: "The main drawback is speed. In fast-moving or consolidating markets, organic growth may be too slow to secure a competitive position. Competitors acquiring rivals can leapfrog the organically-growing firm in market share overnight." },
          { type: "flow", steps: ["Firm earns retained profits", "Reinvests in new outlets or products", "Capacity and revenue grow gradually", "Culture and quality maintained"], result: "Steady, sustainable expansion — but competitors may grow faster externally", resultType: "good" }
        ],
        realExample: { emoji: "☕", text: "Starbucks grew organically for decades, opening one company-owned store at a time across the globe. This preserved its brand experience and barista training standards but meant expansion was slower than if it had acquired existing coffee chains." },
        misconception: "Students say organic growth is always the safest option. Wrong — if a market is rapidly consolidating through mergers, a firm that only grows organically risks being left behind or becoming a takeover target itself. Instead write: organic growth is lower risk in stable markets, but in consolidating industries external growth may be necessary for survival.",
        examMatters: "When comparing growth methods, examiners reward context. Ask: is this market growing (organic works — plenty of room) or mature and consolidating (external growth may be essential)? The best answer is not that one method is always better, but that the right choice depends on market conditions."
      },
      {
        id: "external-growth-methods",
        title: "External Growth: Mergers, Takeovers & Integration Types",
        keyIdea: "External growth means joining with another firm — through merger or takeover — giving instant scale and market share, but clashing cultures and integration costs mean more than half of deals destroy value.",
        body: [
          { type: "paragraph", text: "**External growth** happens through **mergers** (two firms agree to combine as equals) or **takeovers** (one firm buys a controlling share of another, sometimes hostile). The attraction is speed: the acquiring firm gains customers, capacity, brands, and market share immediately." },
          { type: "paragraph", text: "**Horizontal integration** merges firms at the same stage of the same industry, increasing market power and enabling economies of scale. **Backward vertical integration** acquires a supplier, securing inputs and reducing costs. **Forward vertical integration** acquires a distributor, gaining control of the route to market. **Conglomerate integration** diversifies into unrelated industries to spread risk." },
          { type: "paragraph", text: "The risks are substantial. Culture clash between the two workforces, duplication of roles leading to redundancies, management distraction during integration, and the premium paid often exceeds the value created. Research consistently shows that over half of mergers fail to deliver the synergies promised." },
          { type: "flow", steps: ["Firm identifies acquisition target", "Pays premium over market value", "Attempts to integrate operations and cultures", "Synergies either materialise or clash destroys value"], result: "Instant scale gained — but integration risk is the critical variable", resultType: "neutral" }
        ],
        realExample: { emoji: "📱", text: "Facebook acquired Instagram in 2012 for $1bn — a horizontal integration that eliminated a rising competitor and gave Facebook dominance in photo-sharing. Unlike most acquisitions, Instagram was allowed to operate semi-independently, which preserved its culture and contributed to the deal's exceptional success." },
        misconception: "Students assume bigger is always better after a merger. Wrong — diseconomies of scale, culture clash, and loss of focus often make the combined firm less efficient than the two were separately. Instead write: mergers create potential for synergies, but realising those synergies depends on effective integration, which is the hardest part of the process.",
        examMatters: "Examiners expect you to identify the type of integration (horizontal, vertical backward/forward, conglomerate) and evaluate its impact on costs, competition, and stakeholders. Always consider the regulator's view — would the Competition and Markets Authority (CMA) allow it, and what conditions might be imposed?"
      }
    ],
    takeaway: [
      "Organic growth: retained profits, new outlets, product development — slow but controlled.",
      "External growth: mergers and takeovers — fast but risky due to integration difficulties.",
      "Know all four integration types: horizontal, backward vertical, forward vertical, conglomerate.",
      "Over half of mergers fail to create shareholder value — culture clash is the primary reason."
    ]
  },

  /* ═══════════════════════════════════════════════════
   *  Chapter 2: Growth Decisions
   * ═══════════════════════════════════════════════════ */
  {
    title: "Growth Decisions",
    sections: [
      {
        id: "reasons-staying-small",
        title: "Reasons for Staying Small",
        keyIdea: "Not every firm should grow — small firms survive and thrive by serving niches, offering personal service, and staying flexible in ways that large corporations simply cannot match.",
        body: [
          { type: "paragraph", text: "Small firms persist in every economy because they have genuine advantages. **Niche markets** are too small to attract large firms — a specialist artisan chocolate maker serves a market segment that mass producers cannot reach without destroying the very exclusivity that defines it." },
          { type: "paragraph", text: "**Flexibility** allows small firms to adapt quickly to changing customer needs without navigating layers of bureaucracy. **Personal service** builds customer loyalty that no algorithm can replicate — the local mechanic who knows your car's history provides value a national chain cannot." },
          { type: "paragraph", text: "Some owners choose to stay small deliberately. Not every entrepreneur wants to manage hundreds of employees and answer to shareholders. The owner of a profitable two-person consultancy may enjoy high income, autonomy, and work-life balance that would disappear with growth." },
          { type: "flow", steps: ["Market is a small niche", "Large firms cannot justify entry", "Small firm offers personal, flexible service", "Customer loyalty creates sustainable position"], result: "Profitable small firm — growth would destroy its competitive advantage", resultType: "good" }
        ],
        realExample: { emoji: "🍺", text: "Local craft breweries thrive alongside giants like AB InBev by serving niche markets that value unique flavours, local identity, and authenticity. Growing to mass scale would eliminate the very characteristics that attract craft beer customers — smallness is the strategy, not a limitation." },
        misconception: "Students assume staying small means the firm has failed to grow. Wrong — many small firms are highly profitable precisely because they stay focused on a niche. Instead write: staying small can be a deliberate and rational strategy when growth would dilute the firm's unique selling point or expose it to diseconomies of scale.",
        examMatters: "A common evaluative question asks why small firms survive in markets dominated by large ones. Strong answers go beyond 'niche markets' and discuss barriers to entry for large firms, the diseconomies of scale that limit big firms, and consumer preference for personalised service."
      },
      {
        id: "demergers-splitting-up",
        title: "Demergers: Why Firms Split Up",
        keyIdea: "A demerger splits one firm into two or more independent companies — it happens when the market decides the parts are worth more than the whole, usually because the combined firm has lost focus.",
        body: [
          { type: "paragraph", text: "A **demerger** is the separation of a business into two or more independent companies. Shareholders typically receive shares in the new entities proportional to their original holding. Demergers are the opposite of mergers — they acknowledge that a previous combination is no longer creating value." },
          { type: "paragraph", text: "The main reasons include **lack of synergies** (the combined firm never achieved the benefits promised at merger), **loss of focus** (management attention spread across unrelated divisions), **diseconomies of scale** (coordination and communication problems), and **shareholder pressure** (investors who believe the 'conglomerate discount' is destroying value)." },
          { type: "paragraph", text: "After demerging, each new firm can focus on its core competency, pursue its own strategy, and attract investors who specifically want exposure to that industry. Management teams can make faster, more informed decisions when they are not competing for resources with unrelated divisions." },
          { type: "flow", steps: ["Conglomerate suffers diseconomies or loss of focus", "Sum of parts worth more than the whole", "Board decides to demerge", "Separate firms pursue focused strategies"], result: "Shareholder value unlocked — each firm is valued on its own merits", resultType: "good" }
        ],
        realExample: { emoji: "💻", text: "eBay acquired Skype in 2005 for $2.6bn, believing video calling would enhance online auctions. The synergies never materialised — auction buyers did not need to video-call sellers. eBay demerged Skype in 2009, eventually selling it to Microsoft, which could integrate it into its own communications ecosystem." },
        misconception: "Students assume demergers mean the firm failed. Wrong — a demerger is often a rational, value-creating decision that corrects a previous strategic mistake. Instead write: demergers unlock shareholder value by allowing each new entity to focus on its core competency, attract specialist investors, and eliminate the conglomerate discount.",
        examMatters: "Examiners test whether you can evaluate demergers from multiple stakeholder perspectives. Shareholders may gain from higher combined valuations. Employees face uncertainty and potential redundancies. Customers may benefit from renewed focus on product quality. Always structure multi-stakeholder analysis."
      }
    ],
    takeaway: [
      "Small firms survive through niches, flexibility, personal service, and deliberate owner choice.",
      "Growth is not always desirable — it can destroy the very qualities that make a small firm successful.",
      "Demergers reverse failed mergers by splitting firms to unlock focus and shareholder value.",
      "Evaluate demergers from multiple perspectives: shareholders, employees, customers, competitors."
    ]
  }
];

async function main() {
  console.log('Upgrading 3.3.2 Business Growth to new format...');

  const { error } = await supabase
    .from('section_content')
    .update({ data: CONTENT })
    .eq('section_id', 'business-growth');

  if (error) {
    console.error('FAILED:', error.message);
  } else {
    console.log('SUCCESS — ' + CONTENT.length + ' chapters, ' + CONTENT.reduce((n, c) => n + c.sections.length, 0) + ' sections pushed.');
  }
}

main();
