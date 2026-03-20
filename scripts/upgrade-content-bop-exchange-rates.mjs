/**
 * UPGRADE — 4.3.3 Balance of Payments and Exchange Rates
 * Rewrites section_content from old concepts[] format to new sections[] format.
 * Run: node scripts/upgrade-content-bop-exchange-rates.mjs
 */
import { supabase } from './_db.mjs';

const CONTENT = [
  /* ═══════════════════════════════════════════════════
   *  Chapter 1: Balance of Payments and Exchange Rates
   * ═══════════════════════════════════════════════════ */
  {
    title: "Balance of Payments and Exchange Rates",
    sections: [
      {
        id: "balance-of-payments",
        title: "The Balance of Payments",
        keyIdea: "The balance of payments records all transactions between a country and the rest of the world — the current and financial accounts must always sum to zero, so a deficit on one is offset by a surplus on the other.",
        body: [
          { type: "paragraph", text: "The **balance of payments (BoP)** is a record of all economic transactions between residents of a country and the rest of the world over a given period. It has two main components: the **current account** and the **financial account**. The current account records trade in goods and services, primary income (investment returns), and secondary income (transfers such as foreign aid). The financial account records capital flows — FDI, portfolio investment, and changes in reserves." },
          { type: "paragraph", text: "The BoP must always **balance** — a current account deficit must be financed by a financial account surplus (capital inflows). If a country imports more than it exports, foreigners accumulate that country's currency, which flows back as investment. A persistent current account deficit is not automatically a problem, but it does mean the country is borrowing from abroad and accumulating external liabilities." },
          { type: "paragraph", text: "The causes of a current account deficit include: a **strong exchange rate** making exports expensive and imports cheap, **high domestic demand** sucking in imports, **low productivity** reducing export competitiveness, and a **declining manufacturing base** if deindustrialisation has hollowed out tradeable goods production." },
          { type: "flow", steps: ["Imports exceed exports", "Current account moves into deficit", "Must be financed by financial account surplus", "Foreign capital flows in (FDI, portfolio investment, borrowing)"], result: "BoP balances — but the country accumulates external debt or sells assets to foreigners", resultType: "neutral" }
        ],
        realExample: { emoji: "🇬🇧", text: "The UK has run a persistent current account deficit since the 1980s, reaching over 5% of GDP in some years. It is financed by foreign investment in UK assets — property, government bonds, and equities. This makes the UK dependent on continued investor confidence." },
        misconception: "Students say a current account deficit means the economy is failing. Wrong — a deficit can reflect strong domestic demand and attractive investment opportunities drawing in capital. Instead write: a current account deficit may signal underlying weakness (low competitiveness) or strength (strong growth attracting imports and investment). The cause matters more than the number.",
        examMatters: "Examiners test whether you understand that the BoP always balances. A current account deficit is not 'money disappearing' — it is matched by capital inflows on the financial account. Always explain the financing mechanism, not just the deficit itself."
      },
      {
        id: "exchange-rate-systems",
        title: "Exchange Rate Systems",
        keyIdea: "Floating rates adjust automatically and preserve monetary independence but create volatility; fixed rates provide stability but require large reserves and sacrifice independent monetary policy.",
        body: [
          { type: "paragraph", text: "A **floating exchange rate** is determined by market forces of supply and demand with no government intervention. If demand for a currency falls, it depreciates automatically, making exports cheaper and imports dearer — this acts as an **automatic stabiliser** for the current account. The central bank retains full **monetary policy independence** to set interest rates for domestic objectives." },
          { type: "paragraph", text: "A **fixed exchange rate** is pegged to another currency or a basket. The central bank must intervene — buying or selling its own currency — to maintain the peg. This provides **exchange rate stability**, reducing uncertainty for traders and investors. However, maintaining a fixed rate requires large **foreign exchange reserves** and the central bank must set interest rates to defend the peg rather than for domestic needs, sacrificing monetary independence." },
          { type: "paragraph", text: "A **managed float** is a hybrid — the currency is broadly market-determined but the central bank intervenes to smooth excessive volatility or prevent misalignment. Most major economies operate some version of a managed float. The fundamental trade-off across all systems is between **stability** (fixed) and **flexibility** (floating) — no system delivers both perfectly." }
        ],
        realExample: { emoji: "🇨🇳", text: "China operates a managed float for the yuan, setting a daily reference rate and allowing the currency to move within a band. This gives China some control over its exchange rate to support exports while gradually allowing market forces more influence — a pragmatic middle ground between fixed and floating." },
        misconception: "Students say floating rates are always better because they adjust automatically. Wrong — floating rates can overshoot dramatically, creating destabilising volatility that harms trade and investment. Instead write: floating rates provide flexibility and monetary independence but at the cost of volatility; the optimal system depends on the country's openness, capital mobility, and institutional capacity.",
        examMatters: "A classic essay question asks you to evaluate whether a country should adopt a fixed or floating exchange rate. Structure: floating (auto-adjustment, monetary independence, no reserves needed) vs fixed (stability, credibility, lower transaction costs). Evaluate: it depends on the country's trade openness, inflation history, and reserve holdings."
      }
    ],
    takeaway: [
      "The BoP always balances — a current account deficit is financed by capital inflows on the financial account.",
      "Current account deficits are caused by strong exchange rates, high domestic demand, low productivity, or deindustrialisation.",
      "Floating rates offer flexibility and monetary independence; fixed rates offer stability but require reserves and sacrifice policy autonomy.",
      "Most countries operate a managed float — a pragmatic compromise between stability and flexibility."
    ]
  },

  /* ═══════════════════════════════════════════════════
   *  Chapter 2: Competitiveness
   * ═══════════════════════════════════════════════════ */
  {
    title: "Competitiveness",
    sections: [
      {
        id: "exchange-rate-determination",
        title: "Exchange Rate Determination",
        keyIdea: "Exchange rates are determined by supply and demand for a currency — exports, FDI inflows, and higher interest rates increase demand, while imports and capital outflows increase supply.",
        body: [
          { type: "paragraph", text: "In a floating system, the exchange rate is the **price of one currency in terms of another**, determined by supply and demand in the foreign exchange market. **Demand** for a currency comes from foreigners buying the country's exports, investing in its assets (FDI and portfolio investment), and speculative flows. **Supply** comes from residents buying imports, investing abroad, and sending remittances." },
          { type: "paragraph", text: "**Interest rate differentials** are a powerful short-run driver. If a country raises interest rates relative to others, it attracts **hot money** — short-term capital seeking higher returns. This increases demand for the currency and causes appreciation. Central bank interest rate decisions therefore have immediate exchange rate consequences, which in turn affect trade competitiveness." },
          { type: "paragraph", text: "In the long run, exchange rates tend to reflect **relative price levels** (purchasing power parity) and **productivity differentials**. A country with persistently higher inflation will see its currency depreciate as its goods become less competitive. A country with faster productivity growth will see its currency appreciate as its exports become more attractive." },
          { type: "flow", steps: ["US Federal Reserve raises interest rates", "Higher returns attract global capital to US assets", "Demand for dollars rises, supply of other currencies rises", "Dollar appreciates"], result: "Stronger dollar — US exports become more expensive, imports cheaper", resultType: "neutral" }
        ],
        realExample: { emoji: "🇺🇸", text: "When the US Federal Reserve aggressively raised interest rates in 2022-2023 to combat inflation, the dollar strengthened dramatically against almost all major currencies. The strong dollar made US exports less competitive but reduced import costs, helping to dampen inflation — illustrating the direct link between monetary policy and exchange rates." },
        misconception: "Students say a strong currency is always good. Wrong — appreciation makes exports more expensive and can worsen the current account. Instead write: currency appreciation benefits consumers (cheaper imports) but harms exporters (less competitive abroad). Whether it is 'good' depends on the country's priorities — controlling inflation or supporting export-led growth.",
        examMatters: "Examiners expect you to draw a supply and demand diagram for the currency market and shift curves correctly. Higher interest rates shift demand right (appreciation). A rise in imports shifts supply right (depreciation). Always label the axes correctly: price of the currency (exchange rate) on the y-axis, quantity of currency on the x-axis."
      },
      {
        id: "marshall-lerner-j-curve",
        title: "The Marshall-Lerner Condition and the J-Curve",
        keyIdea: "A depreciation only improves the current account if the sum of export and import price elasticities exceeds one (Marshall-Lerner), and even then the improvement is delayed — the J-curve shows a short-run worsening before long-run gains.",
        body: [
          { type: "paragraph", text: "The **Marshall-Lerner condition** states that a currency depreciation will improve the current account only if the sum of the price elasticity of demand for exports and imports exceeds one: **|PEDx| + |PEDm| > 1**. If this condition is met, the volume effect (more exports sold, fewer imports bought) outweighs the price effect (each import costing more in domestic currency). If demand is inelastic on both sides, depreciation worsens the current account because import spending rises without a sufficient increase in export revenue." },
          { type: "paragraph", text: "Even when Marshall-Lerner is satisfied in the long run, the **J-curve effect** means the current account initially worsens before improving. In the **short run**, trade contracts are fixed in foreign currency, export and import volumes are slow to adjust, and consumers take time to switch away from imports. The immediate effect of depreciation is simply a higher import bill. In the **long run**, exporters win new orders, importers find domestic substitutes, and the current account improves — tracing out a J-shape over time." },
          { type: "paragraph", text: "The length of the J-curve depends on the flexibility of the economy. Countries with diversified export bases and responsive supply sides adjust faster. Countries dependent on a narrow range of essential imports — like energy — may find the J-curve long and painful, as they cannot easily reduce import volumes even when prices rise." }
        ],
        realExample: { emoji: "🇬🇧", text: "After the Brexit referendum in June 2016, sterling depreciated by around 15% against the dollar. The UK's current account initially worsened as import costs rose immediately, but export volumes were slow to respond. Over the following two years, UK exports gradually became more competitive — a textbook J-curve." },
        misconception: "Students assume depreciation automatically fixes a current account deficit. Wrong — it only works if Marshall-Lerner is satisfied, and even then the improvement is delayed. Instead write: depreciation improves the current account only if demand for exports and imports is sufficiently elastic (ML condition met), and the adjustment follows a J-curve — worsening before improving.",
        examMatters: "This is a high-frequency exam topic. You must be able to: (1) state the Marshall-Lerner condition precisely, (2) explain why the current account worsens in the short run (contracts fixed, volumes slow to adjust), and (3) draw the J-curve showing the time path. Always link ML to elasticities and the J-curve to the time lag in adjustment."
      }
    ],
    takeaway: [
      "Exchange rates are driven by trade flows, capital movements, and interest rate differentials — higher rates attract hot money and cause appreciation.",
      "Marshall-Lerner: depreciation improves the current account only if |PEDx| + |PEDm| > 1.",
      "The J-curve: even when ML is met, the current account worsens in the short run before improving as volumes adjust."
    ]
  }
];

async function main() {
  console.log('Upgrading 4.3.3 Balance of Payments and Exchange Rates to new format...');

  const { error } = await supabase
    .from('section_content')
    .update({ data: CONTENT })
    .eq('section_id', 'balance-payments-exchange-rates');

  if (error) {
    console.error('FAILED:', error.message);
  } else {
    console.log('SUCCESS — 2 chapters, ' + CONTENT.reduce((n, c) => n + c.sections.length, 0) + ' sections pushed.');
  }
}

main();
