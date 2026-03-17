import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://trweeckuswgkenckeqfb.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRyd2VlY2t1c3dna2VuY2tlcWZiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzE0ODY2NywiZXhwIjoyMDg4NzI0NjY3fQ.P9EchrMjfJdouBPIs728fuqVTm5Jq1B0JPsEdCp4IA0'
);

/* ═══════════════════════════════════════════════════════════
 *  CONTENT EXPLORER REWRITE — Unit 1 Part B
 *  Supply + Price Determination
 * ═══════════════════════════════════════════════════════════ */

const CONTENT = {

'supply': [
  {
    title: 'The Supply Curve',
    concepts: [
      {
        title: 'Supply and the Supply Curve',
        points: [
          `<strong>Supply</strong> is the quantity of a good that producers are <strong>willing and able to offer for sale</strong> at a given price in a given time period. Just like demand, both conditions must hold — a firm might want to sell at a high price but lack the production capacity.`,
          `The <strong>supply curve</strong> slopes <strong>upward</strong> from left to right: higher prices mean greater profit incentive, so firms produce more. But there's a deeper reason too: in the short run, the <strong>law of diminishing returns</strong> means marginal costs rise as output increases (pushing more workers into a fixed factory eventually yields less additional output per worker), so firms need a higher price to cover those rising costs.`,
          `An <strong>individual supply curve</strong> shows one firm's supply. The <strong>market supply curve</strong> is the horizontal summation of all individual firms' supply curves — at each price, add up every firm's quantity supplied.`
        ]
      },
      {
        title: 'Movements Along vs Shifts of the Supply Curve',
        points: [
          `A <strong>movement along</strong> the supply curve is caused solely by a change in the <strong>good's own price</strong>. A price rise causes an <strong>extension of supply</strong> (more produced). A price fall causes a <strong>contraction of supply</strong> (less produced).`,
          `A <strong>shift</strong> of the entire supply curve occurs when a <strong>non-price factor</strong> changes. A shift <strong>right</strong> means an <strong>increase in supply</strong> — more is offered at every price. A shift <strong>left</strong> means a <strong>decrease in supply</strong> — less offered at every price.`,
          `Use the same terminology discipline as with demand: "extension/contraction" for movements along (caused by own price changes), "increase/decrease in supply" for shifts (caused by non-price factors). This precision matters in exams.`
        ],
        examTip: `Just like demand, saying "supply increased because the price rose" is wrong — that's an extension, not an increase. Reserve "increase/decrease in supply" for shifts of the whole curve.`
      },
      {
        title: 'Factors That Shift the Supply Curve',
        points: [
          `<strong>Costs of production</strong>: rising input costs (raw materials, wages, energy) shift supply <strong>left</strong> — it's less profitable to produce at every price. Falling costs shift supply <strong>right</strong>. When oil prices spiked in 2022 after Russia's invasion of Ukraine, supply curves shifted left across almost every industry because energy is an input to everything.`,
          `<strong>Technology</strong>: improvements reduce costs and boost productivity, shifting supply <strong>right</strong>. Tesla's Gigafactories use automation to produce cars faster and cheaper than traditional assembly lines — a rightward supply shift for electric vehicles.`,
          `<strong>Indirect taxes</strong> increase firms' costs, shifting supply <strong>left</strong> (upward by the tax amount). A 50p excise duty on fuel shifts the supply curve up by 50p at every quantity. <strong>Subsidies</strong> do the opposite — they reduce costs, shifting supply <strong>right</strong> (downward by the subsidy amount).`,
          `<strong>Weather and natural disasters</strong> reduce supply (droughts devastating Australian wheat harvests, hurricanes disrupting Gulf of Mexico oil production). <strong>Number of firms</strong>: new entrants shift market supply right; firms exiting shift it left. <strong>Expectations</strong>: if firms expect higher prices in the future, they may withhold stock now (supply shifts left today). <strong>Regulation</strong>: stricter environmental laws, planning permission, or licensing requirements increase compliance costs and shift supply left.`
        ]
      }
    ]
  },
  {
    title: 'Price Elasticity of Supply (PES)',
    concepts: [
      {
        title: 'PES: Definition and Formula',
        points: [
          `<strong>Price elasticity of supply (PES)</strong> measures how <strong>responsive</strong> quantity supplied is to a change in price. It answers: "If the market price rises by 10%, how much more will firms produce?"`,
          `PES is usually <strong>positive</strong> (higher price → more supplied). Like PED, it uses percentage changes, making it a unit-free measure you can compare across different goods and industries.`
        ],
        formula: 'PES = % change in quantity supplied ÷ % change in price'
      },
      {
        title: 'Interpreting PES Values',
        points: [
          `<strong>PES > 1 = elastic supply</strong>: firms can easily ramp up output. Quantity supplied responds proportionally more than the price change. Typical of industries with spare capacity, available stocks, and flexible production.`,
          `<strong>PES < 1 = inelastic supply</strong>: firms struggle to increase output quickly. Quantity supplied responds proportionally less than the price change. Typical of industries with long production cycles, limited resources, or full capacity.`,
          `<strong>PES = 1 = unit elastic</strong>: percentage changes are equal. <strong>PES = 0 = perfectly inelastic</strong>: quantity doesn't respond at all (vertical supply curve — fixed supply of concert tickets, land in central London). <strong>PES = ∞ = perfectly elastic</strong>: firms will supply any amount at one price, but nothing below it (horizontal supply curve).`
        ]
      },
      {
        title: 'Factors Influencing PES',
        points: [
          `<strong>Time period</strong> is the most important factor. In the <strong>very short run</strong>, supply is almost perfectly inelastic — a concert can't add seats tonight. In the <strong>short run</strong>, firms can adjust variable factors (hire more workers, buy more materials) but can't change fixed factors (factory size). In the <strong>long run</strong>, all factors are variable — firms can build new factories, adopt new technology, and new firms can enter the market. Supply becomes much more elastic.`,
          `<strong>Spare capacity</strong>: a factory running at 60% utilisation can quickly increase output — elastic supply. A factory already running flat-out on three shifts can't produce much more — inelastic. <strong>Stock levels</strong>: firms with large inventories can respond instantly to price rises by releasing stock — elastic. Perishable goods (fresh flowers, fish) can't be stored, making supply inelastic.`,
          `<strong>Factor mobility</strong>: if workers and capital can easily switch between industries, supply responds quickly. Specialised resources (brain surgeons, semiconductor fabrication plants) can't be repurposed, making supply inelastic. <strong>Barriers to entry</strong>: low barriers let new firms enter quickly when prices rise, increasing market supply elasticity. High barriers (heavy regulation, huge capital requirements) slow the response.`,
          `<strong>Production cycle</strong>: goods that take months or years to produce (wine, housing, agricultural crops) have inelastic supply in the short run. Goods produced quickly (digital content, printed materials) have elastic supply.`
        ],
        examTip: `When discussing PES factors, always explain the mechanism — WHY does spare capacity make supply more elastic? Because firms can increase output without additional fixed costs. Don't just state the factor.`
      }
    ]
  },
  {
    title: 'Short Run vs Long Run',
    concepts: [
      {
        title: 'The Short Run and Long Run Distinction',
        points: [
          `The <strong>short run</strong> is any period where <strong>at least one factor of production is fixed</strong> — usually capital (you can hire more waiters but can't build a new restaurant overnight). Firms can only increase output by using more <strong>variable factors</strong> with existing fixed capacity.`,
          `The <strong>long run</strong> is when <strong>all factors are variable</strong> — firms can expand, build new facilities, adopt entirely new technology, or exit the market entirely. The key insight: this is about <strong>factor fixity, not calendar time</strong>. For a coffee shop, the long run might be 6 months (find new premises). For a nuclear power station, the long run could be 15 years.`,
          `In the <strong>very short run (momentary period)</strong>, virtually all factors are fixed — the supply of fish already caught today can't change no matter what happens to the price. Supply is perfectly inelastic.`,
          `This distinction matters enormously for understanding PES. Supply is almost always <strong>more elastic in the long run</strong> than the short run, because firms have time to adjust everything. If the price of housing rises, builders can't immediately increase supply (short run — inelastic). Over 5–10 years, they build new developments and supply becomes much more elastic.`
        ],
        examTip: `Define short run and long run precisely in terms of factor fixity, NOT calendar time. "The short run is when at least one factor of production is fixed" — examiners reward this precision.`
      },
      {
        title: 'Significance of PES',
        points: [
          `<strong>For consumers</strong>: when supply is inelastic, any increase in demand causes much larger <strong>price spikes</strong>. This is why UK house prices have risen far faster than incomes — supply is severely inelastic due to limited land, slow construction, and planning regulations. It's also why oil prices and food prices are so volatile.`,
          `<strong>For government — tax incidence</strong>: when supply is inelastic, producers bear more of a tax because they can't easily reduce output. They absorb the cost rather than losing sales. When supply is elastic, producers pass more of the tax on to consumers because they can easily cut production if the price net of tax falls too low.`,
          `<strong>For government — subsidy effectiveness</strong>: subsidies are more effective at increasing output when supply is elastic — firms can actually ramp up production. If supply is inelastic, the subsidy mostly reduces price without much extra production. This is why housing subsidies (Help to Buy) have been criticised — they boost demand in a market with inelastic supply, mostly inflating prices rather than increasing housing stock.`,
          `<strong>For price volatility</strong>: agricultural commodities (inelastic supply — crops take months to grow) experience wild price swings. Tech products (elastic supply — can scale production quickly) have much more stable prices. Understanding PES explains why some markets are inherently volatile.`
        ]
      }
    ]
  }
],


'price-determination': [
  {
    title: 'Equilibrium Price & Quantity',
    concepts: [
      {
        title: 'Market Equilibrium',
        points: [
          `<strong>Equilibrium</strong> is where the demand and supply curves intersect — the price at which quantity demanded exactly equals quantity supplied. At this <strong>market-clearing price</strong>, there's no tendency for the price to change. Every unit produced finds a buyer; every buyer who's willing to pay gets the good.`,
          `On a diagram, equilibrium is the point <strong>(P*, Q*)</strong> where D and S cross. It's not a fixed point — it shifts whenever demand or supply conditions change. Think of it as a resting place that the market naturally gravitates toward.`
        ]
      },
      {
        title: 'Changes in Equilibrium from Shifts in Demand',
        points: [
          `An <strong>increase in demand</strong> (D shifts right) creates temporary excess demand at the old price → buyers compete → price is bid up → firms respond by producing more → new equilibrium with <strong>higher price and higher quantity</strong>. For example, the surge in demand for home office equipment during COVID-19 lockdowns raised both prices and sales volumes.`,
          `A <strong>decrease in demand</strong> (D shifts left) creates temporary excess supply → firms cut prices to clear unsold stock → consumers buy less → new equilibrium with <strong>lower price and lower quantity</strong>.`,
          `The <em>magnitude</em> of changes depends on the <strong>elasticity of supply</strong>. If supply is inelastic (hard to increase output quickly), a demand increase mostly raises the <em>price</em> with little extra quantity. If supply is elastic, quantity responds more and price rises less.`
        ],
        examTip: `Always trace the chain of reasoning: identify the shift → explain the temporary disequilibrium → explain the adjustment process → state the new equilibrium. This logical chain is exactly what examiners want.`
      },
      {
        title: 'Changes in Equilibrium from Shifts in Supply',
        points: [
          `An <strong>increase in supply</strong> (S shifts right) → excess supply at the old price → firms cut prices → consumers buy more → new equilibrium with <strong>lower price and higher quantity</strong>. The tech industry is a good example: technological improvements continuously shift supply right, driving prices down while output soars.`,
          `A <strong>decrease in supply</strong> (S shifts left) → shortage at the old price → price rises → consumers buy less → new equilibrium with <strong>higher price and lower quantity</strong>. The 2022 energy crisis (Russia cutting gas supplies to Europe) is a textbook example: supply shifted left, prices surged, and consumption fell.`,
          `The magnitude depends on <strong>demand elasticity</strong>. Inelastic demand means a supply decrease causes a large price spike but a small quantity drop (think oil — people still need to drive). Elastic demand means the price rises less but quantity drops more.`
        ],
        examTip: `On diagrams, always label the original equilibrium (E₁) and new equilibrium (E₂), mark the shift clearly, and show the direction of change in both P and Q with arrows.`
      }
    ]
  },
  {
    title: 'Excess Demand & Excess Supply',
    concepts: [
      {
        title: 'Excess Demand (Shortage)',
        points: [
          `When the price is <strong>below equilibrium</strong>, quantity demanded exceeds quantity supplied — there's a <strong>shortage</strong> (excess demand). Buyers compete for the scarce goods, bidding the price up. As price rises, some buyers drop out (contraction of demand) and firms increase output (extension of supply) until equilibrium is restored.`,
          `Think of concert tickets priced below market value — they sell out instantly, and scalpers resell them at the true market-clearing price. Or petrol during a panic-buying scare: at the normal price, everyone wants to fill up but stations run dry. If a government sets a <strong>maximum price (price ceiling)</strong> below equilibrium, this shortage becomes <em>persistent</em> because the market mechanism is blocked from pushing the price up.`
        ]
      },
      {
        title: 'Excess Supply (Surplus)',
        points: [
          `When the price is <strong>above equilibrium</strong>, quantity supplied exceeds quantity demanded — there's a <strong>surplus</strong> (excess supply). Unsold stock piles up, so producers cut prices to shift it. As price falls, more consumers buy (extension of demand) and some producers cut production (contraction of supply) until equilibrium is restored.`,
          `This is exactly what happens in end-of-season sales — retailers sitting on unsold winter coats slash prices in January. If a government sets a <strong>minimum price (price floor)</strong> above equilibrium, the surplus persists. The EU's Common Agricultural Policy created infamous "butter mountains" and "wine lakes" this way.`
        ]
      },
      {
        title: 'Market Forces & Price Adjustment',
        points: [
          `Free markets have a built-in <strong>self-correcting mechanism</strong>. Any departure from equilibrium triggers price changes that push the market back. This is the "invisible hand" — not a planned process, but the natural consequence of buyers and sellers responding to their own interests.`,
          `The speed of adjustment varies enormously between markets. Stock prices adjust in milliseconds. Labour markets are sticky — wages are set by contracts and don't fall easily (which is the core of the Keynesian argument). Housing markets adjust slowly due to long construction times, legal processes, and emotional attachment. In exam essays, discussing the <em>speed</em> of adjustment shows sophisticated understanding.`
        ]
      }
    ]
  },
  {
    title: 'Consumer Surplus & Producer Surplus',
    concepts: [
      {
        title: 'Consumer Surplus',
        points: [
          `<strong>Consumer surplus</strong> is the difference between what you're <strong>willing to pay</strong> and what you <strong>actually pay</strong> — the "bargain" you get. If you'd happily pay £5 for a coffee but it costs £3, your consumer surplus is £2. On a diagram, CS is the area <strong>below the demand curve and above the market price</strong>.`,
          `A fall in price <strong>increases</strong> consumer surplus (better bargain for everyone plus new buyers enter). A rise in price <strong>decreases</strong> it. Consumer surplus captures the net benefit consumers receive from participating in a market — it's a measure of consumer welfare.`
        ],
        formula: 'CS = Area below demand curve, above market price'
      },
      {
        title: 'Producer Surplus',
        points: [
          `<strong>Producer surplus</strong> is the difference between the price a firm <strong>receives</strong> and the minimum price it would <strong>accept</strong> (its cost of production). On a diagram, PS is the area <strong>above the supply curve and below the market price</strong>.`,
          `A rise in price <strong>increases</strong> producer surplus (firms earn more above their minimum). A fall <strong>decreases</strong> it. Together, <strong>CS + PS = total economic surplus</strong> — the total net benefit to society from the market.`
        ],
        formula: 'PS = Area above supply curve, below market price'
      },
      {
        title: 'Total Surplus and Deadweight Loss',
        points: [
          `Total economic surplus is <strong>maximised at the free-market equilibrium</strong>. This is the core efficiency argument for free markets: without intervention, the market maximises the combined benefit to consumers and producers.`,
          `Any intervention that moves the market away from equilibrium — taxes, price controls, quotas — <strong>reduces total surplus</strong> and creates a <strong>deadweight loss</strong>. This is a triangle of lost welfare that goes to nobody: trades that would have benefited both buyer and seller no longer happen.`,
          `But — and this is the key evaluation point — total surplus being maximised doesn't mean the outcome is <em>fair</em>. A market might be efficient but leave some people unable to afford essentials. That's a normative judgement about equity vs efficiency, and it's exactly the tension you need to discuss in evaluation questions about government intervention.`
        ],
        examTip: `When analysing any policy (tax, subsidy, price control), always draw the deadweight loss triangle. Then evaluate: is the equity or corrective benefit worth the efficiency cost? The strongest answers weigh both sides.`
      }
    ]
  },
  {
    title: 'Functions of the Price Mechanism',
    concepts: [
      {
        title: 'The Rationing Function',
        points: [
          `Prices <strong>ration scarce goods</strong> — they allocate goods to those willing and able to pay the market price. When a good becomes scarce, its price rises, which discourages some buyers and ensures the limited supply goes to those who value it most (in monetary terms).`,
          `This is how free markets solve the basic economic problem — what to produce and for whom — without anyone directing the outcome. The limitation is obvious: "willing and able" means the poor are rationed out regardless of need. A homeless person may need housing more than a property investor, but the market allocates based on purchasing power, not need.`
        ]
      },
      {
        title: 'The Incentive Function',
        points: [
          `Price changes <strong>create incentives</strong> that alter behaviour. A higher price incentivises firms to produce more (greater profit opportunity) and consumers to buy less (or switch to substitutes). A lower price incentivises consumers to buy more and may push some firms out of the market.`,
          `This is Adam Smith's "<strong>invisible hand</strong>" at work: nobody coordinates anything, but self-interested responses to price signals direct resources toward their most valued uses. When the price of renewable energy equipment falls (due to technological progress), firms are incentivised to invest in solar and wind without any government mandate.`
        ]
      },
      {
        title: 'The Signalling Function',
        points: [
          `Prices act as <strong>signals</strong> conveying information about relative scarcity. A rising price signals that a good is becoming <strong>scarcer or more desired</strong>, prompting new firms to enter or existing firms to expand. A falling price signals <strong>oversupply or falling demand</strong>, prompting firms to cut back or exit.`,
          `Crucially, price signals coordinate the decisions of millions of independent buyers and sellers <strong>without central planning</strong>. No government committee told smartphone manufacturers to produce billions of units — rising prices and profits in the early 2010s signalled opportunity, and firms rushed in.`,
          `The signalling function breaks down when prices are distorted — government price controls, subsidies, monopoly pricing, or externalities can all send false signals, leading to misallocation. This is why market failure matters: the price mechanism only works well when prices reflect true costs and benefits.`
        ],
        examTip: `When asked to "evaluate the price mechanism," structure your answer around its three functions (rationing, incentivising, signalling) — then explain situations where each breaks down (externalities, public goods, information failure, inequality).`
      }
    ]
  },
  {
    title: 'Indirect Taxes',
    concepts: [
      {
        title: 'Specific Taxes',
        points: [
          `A <strong>specific tax</strong> is a <strong>fixed amount per unit</strong> — 58p per litre on petrol, or a fixed excise duty on each pack of cigarettes. On a diagram, it causes a <strong>parallel upward shift</strong> of the supply curve by exactly the tax amount. The vertical gap between the old S and new S+tax is the same at every quantity.`,
          `Specific taxes are common on goods where consumption itself (not the price) is the concern — alcohol, tobacco, fuel. Because they're a fixed amount, they hit cheap products proportionally harder than expensive ones.`
        ],
        formula: 'S+tax shifts up by the fixed tax per unit (parallel shift)'
      },
      {
        title: 'Ad Valorem Taxes',
        points: [
          `An <strong>ad valorem tax</strong> is a <strong>percentage of the selling price</strong> — UK VAT at 20% is the main example. On a diagram, the supply curve <strong>pivots upward</strong> because the gap between S and S+tax widens at higher prices (20% of £100 is more than 20% of £10). The two curves start at the same point on the quantity axis (when price is zero, the tax is zero).`,
          `Ad valorem taxes are proportional — they take the same percentage from cheap and expensive goods alike. This makes them more neutral across price ranges but means the absolute tax burden is higher on premium products.`
        ],
        formula: 'New price = Original price × (1 + tax rate)'
      },
      {
        title: 'Effects of Indirect Taxes on Markets',
        points: [
          `With either tax type: the market price <strong>rises</strong>, but by <strong>less than the full tax</strong> — the rest is absorbed by the producer as lower net revenue. Quantity <strong>falls</strong> because the higher price reduces demand. Consumer surplus <strong>falls</strong>, producer surplus <strong>falls</strong>, and the government gains <strong>tax revenue</strong>.`,
          `A <strong>deadweight loss</strong> triangle is created — some mutually beneficial trades that would have happened no longer do. This is the efficiency cost of taxation. Government revenue = tax per unit × quantity sold after the tax (shown as a rectangle between the two supply curves, up to the new quantity).`,
          `The key question: is the deadweight loss worth it? For Pigouvian taxes (correcting negative externalities), the answer may be yes — the tax reduces overproduction toward the social optimum. For general revenue-raising taxes, it's a trade-off between the revenue gained and the efficiency lost.`
        ],
        formula: 'Tax revenue = Tax per unit × Q (after tax)'
      },
      {
        title: 'Tax Incidence',
        points: [
          `<strong>Tax incidence</strong> asks: who actually bears the burden? The answer depends on elasticities. The more <strong>inelastic</strong> side of the market bears the greater share, because they can't easily adjust their behaviour.`,
          `If demand is <strong>inelastic</strong> (cigarettes — addictive, few substitutes), consumers bear most of the tax — they keep buying despite the higher price. If demand is <strong>elastic</strong> (one brand of chocolate — many substitutes), producers absorb more because they can't pass the cost on without losing customers.`,
          `Similarly, if supply is <strong>inelastic</strong> (land — can't produce more), producers bear more. If supply is <strong>elastic</strong> (manufactured goods — easy to adjust output), producers pass more to consumers. In the extreme: perfectly inelastic demand means the consumer pays the <strong>entire</strong> tax. Perfectly inelastic supply means the producer absorbs it all.`
        ],
        examTip: `Tax incidence is a favourite exam topic. Always link PED and PES to who bears the burden, and illustrate on a diagram. The crucial insight: it's not who the government charges the tax to that matters — it's the relative elasticities that determine the actual burden.`
      }
    ]
  },
  {
    title: 'Subsidies',
    concepts: [
      {
        title: 'The Effect of a Subsidy on a Market',
        points: [
          `A <strong>subsidy</strong> is a payment by the government to producers that reduces their costs. On a diagram, it shifts the supply curve <strong>down/right</strong> by the subsidy per unit. The result: market price <strong>falls</strong> and quantity <strong>rises</strong>.`,
          `The price doesn't fall by the full subsidy amount — the benefit is <strong>shared</strong> between consumers (lower price) and producers (higher effective price received = market price + subsidy). The government's total cost = subsidy per unit × new quantity sold — funded by taxpayers.`
        ],
        formula: 'Government cost = Subsidy per unit × Q (after subsidy)'
      },
      {
        title: 'Who Benefits from a Subsidy?',
        points: [
          `The share of benefit depends on <strong>elasticities</strong> — the same logic as tax incidence, but in reverse. If demand is <strong>inelastic</strong>, consumers get less benefit (the price doesn't fall much) and producers capture more of the subsidy as higher revenue. If demand is <strong>elastic</strong>, consumers benefit more through lower prices.`,
          `If supply is inelastic, producers benefit more. If elastic, consumers benefit more. This matters for policy: the UK's Help to Buy scheme subsidised housing demand in a market with extremely inelastic supply — predictably, it mostly inflated house prices rather than increasing the number of homes built.`,
          `There's also an <strong>efficiency cost</strong>: unless the subsidy corrects a genuine market failure (positive externality, merit good), it encourages production beyond the allocatively efficient level, creating a <strong>deadweight loss</strong>. Taxpayers bear the financial cost, and society may get overproduction of something that isn't truly undervalued.`
        ],
        examTip: `In evaluation, always ask: (1) Who pays? Taxpayers — there's an opportunity cost. (2) Does it correct a market failure? If not, it creates allocative inefficiency. (3) Is it well-targeted? Subsidies often benefit those who don't need them most.`
      }
    ]
  },
  {
    title: 'Alternative Views of Consumer & Producer Behaviour',
    concepts: [
      {
        title: 'Behavioural Economics & Consumer Behaviour',
        points: [
          `Standard theory assumes consumers are <strong>rational utility maximisers</strong> with perfect information. Behavioural economics challenges every part of this.`,
          `<strong>Bounded rationality</strong> (Herbert Simon): people have limited brain power and time, so they "<strong>satisfice</strong>" — they find a "good enough" option rather than calculating the optimal one. You don't compare every possible phone before buying one; you look at a few and pick the best of those.`,
          `<strong>Loss aversion</strong> (Kahneman & Tversky): losing £50 feels about twice as painful as gaining £50 feels good. This explains why people hold losing investments too long ("I can't sell at a loss") and why "money-back guarantees" are so effective at boosting sales — they remove the perceived risk of loss.`,
          `<strong>Nudge theory</strong> (Thaler & Sunstein): small changes in how choices are presented — "<strong>choice architecture</strong>" — can steer decisions without restricting freedom. Auto-enrolment into UK workplace pensions is a nudge: you can opt out, but most people don't, so pension coverage has soared. Putting fruit at eye level in a cafeteria increases healthy eating. These are paternalistic but non-coercive.`,
          `<strong>Present bias</strong>: people overvalue immediate gratification and undervalue future consequences. This is why people under-save for retirement, overeat, and procrastinate on revision — even when they know they'll regret it. It's also why "buy now, pay later" schemes are so popular and potentially harmful.`
        ]
      },
      {
        title: 'Alternative Producer Behaviour',
        points: [
          `Traditional theory says firms <strong>maximise profit</strong> (produce where MC = MR). But in reality, firms may pursue other objectives:`,
          `<strong>Revenue maximisation</strong> (produce where MR = 0): managers may prefer revenue growth because their bonuses and status are tied to sales volume, not profit. <strong>Sales maximisation</strong> (produce where AC = AR): firms may aim for the largest possible market share, sacrificing some profit for dominance — Amazon operated at a loss for years to build market share.`,
          `<strong>Satisficing</strong>: the firm earns "good enough" profit while also pursuing other goals — keeping workers happy, avoiding risk, maintaining quality. Common in owner-managed businesses where the owner values work-life balance.`,
          `<strong>Corporate social responsibility (CSR)</strong>: some firms invest in environmental or social programmes that reduce short-term profit but may enhance long-term reputation and brand loyalty. Patagonia donates 1% of revenue to environmental causes — arguably smart long-run profit maximisation disguised as CSR.`,
          `The <strong>principal–agent problem</strong> explains much of this: shareholders (principals) want profit maximised, but managers (agents) have their own interests — career advancement, perks, empire-building, a quiet life. Without strong governance, managers may pursue their goals at shareholders' expense.`
        ],
        examTip: `Edexcel loves evaluation that challenges assumptions. Use behavioural insights and alternative objectives to argue that standard supply-demand predictions may not hold in practice — then discuss whether this undermines or merely qualifies the model.`
      }
    ]
  }
],

};


async function main() {
  const ids = Object.keys(CONTENT);
  console.log(`Updating ${ids.length} content sections...\n`);

  for (const id of ids) {
    const content = CONTENT[id];
    const cc = content.reduce((s, b) => s + (b.concepts?.length || 0), 0);
    const pc = content.reduce((s, b) => s + (b.concepts || []).reduce((s2, c) => s2 + (c.points?.length || 0), 0), 0);

    const { error } = await supabase
      .from('section_content')
      .update({ data: content })
      .eq('section_id', id);

    if (error) console.log(`  ✗ ${id}: ${error.message}`);
    else console.log(`  ✓ ${id} — ${content.length} blocks, ${cc} concepts, ${pc} points`);
  }
  console.log('\nDone.');
}

main();
