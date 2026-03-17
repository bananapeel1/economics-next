import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://trweeckuswgkenckeqfb.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRyd2VlY2t1c3dna2VuY2tlcWZiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzE0ODY2NywiZXhwIjoyMDg4NzI0NjY3fQ.P9EchrMjfJdouBPIs728fuqVTm5Jq1B0JPsEdCp4IA0'
);

/* ═══════════════════════════════════════════════════════════
 *  REFORMAT — Unit 1 Part B: Supply + Price Determination
 *  Rich visual HTML elements (key-idea, flow-chain, so-what,
 *  watch-out, take-away, section-links, content-subhead)
 * ═══════════════════════════════════════════════════════════ */

const CONTENT = {

'supply': [
  {
    title: 'The Supply Curve',
    concepts: [
      {
        title: 'Supply and the Supply Curve',
        points: [
          `<div class="key-idea"><div class="key-idea-label">Key Idea</div><p>Supply is the quantity of a good that producers are willing and able to offer for sale at each price — and the supply curve slopes upward because higher prices make production more profitable.</p></div>`,
          `<strong>Supply</strong> is the quantity of a good that producers are <strong>willing and able to offer for sale</strong> at a given price in a given time period. Both conditions matter — a firm might want to sell at a high price but lack the factory capacity, or have the capacity but find it unprofitable. The <strong>supply curve</strong> slopes <strong>upward</strong> from left to right because higher prices increase the profit incentive, drawing more output from existing firms and potentially pulling new firms into the market. There is a deeper reason too: in the short run, the <strong>law of diminishing returns</strong> means that as firms push output higher, marginal costs rise (cramming more workers into a fixed factory eventually yields less extra output per person), so firms need a higher price to justify those rising costs.`,
          `An <strong>individual supply curve</strong> shows one firm's planned output at each price. The <strong>market supply curve</strong> is the <strong>horizontal summation</strong> of every individual firm's curve — at each price, you add up every firm's quantity supplied. This distinction matters: market supply can shift right simply because new firms enter, even if no existing firm changes its behaviour.`
        ]
      },
      {
        title: 'Movements Along vs Shifts',
        points: [
          `A <strong>movement along</strong> the supply curve is caused solely by a change in the <strong>good's own price</strong>. A price rise triggers an <strong>extension of supply</strong> (firms produce more at the higher price). A price fall triggers a <strong>contraction of supply</strong> (firms scale back). On a diagram, you are sliding along the existing curve — the curve itself has not moved.`,
          `A <strong>shift</strong> of the entire supply curve occurs when a <strong>non-price factor</strong> changes. A shift <strong>right</strong> represents an <strong>increase in supply</strong> — more is offered at every price. A shift <strong>left</strong> represents a <strong>decrease in supply</strong> — less offered at every single price level. Use the terminology precisely: "extension/contraction" for movements along (caused by the good's own price), "increase/decrease in supply" for shifts (caused by non-price factors).`,
          `<div class="watch-out"><div class="watch-out-label">Common Mistake</div><p>Saying "supply increased because the price rose" is wrong — that describes an extension of supply, not an increase. Reserve "increase/decrease in supply" strictly for shifts of the whole curve caused by non-price factors. Examiners penalise this confusion every year.</p></div>`
        ],
        examTip: `Just like demand, saying "supply increased because the price rose" is wrong — that's an extension, not an increase. Reserve "increase/decrease in supply" for shifts of the whole curve.`
      },
      {
        title: 'Factors That Shift',
        points: [
          `<div class="content-subhead">Costs, Technology & Taxes</div><strong>Costs of production</strong> are the most common shifter. Rising input costs — raw materials, wages, energy — shift supply <strong>left</strong> because it becomes less profitable to produce at every price. When oil prices spiked in 2022 after Russia's invasion of Ukraine, supply curves shifted left across almost every industry because energy is an input to everything. Falling costs do the opposite. <strong>Technology</strong> improvements reduce costs and boost productivity, shifting supply <strong>right</strong> — Tesla's Gigafactories use automation to produce electric vehicles faster and cheaper than traditional assembly lines.`,
          `<div class="flow-chain"><span class="pill neg">Input costs rise (e.g. oil prices)</span><span class="arrow">→</span><span class="pill neg">Less profitable to produce</span><span class="arrow">→</span><span class="pill neg">Supply shifts left</span><span class="arrow">→</span><span class="pill amber">Price rises, quantity falls</span></div>`,
          `<strong>Indirect taxes</strong> increase firms' effective costs, shifting supply <strong>left</strong> (upward by the tax amount). The UK's 58p fuel duty shifts petrol supply up by 58p at every quantity. <strong>Subsidies</strong> work in reverse — they reduce costs and shift supply <strong>right</strong> (downward by the subsidy amount). The EU's Common Agricultural Policy subsidies shift food supply curves right across Europe.`,
          `<div class="content-subhead">Other Shifters</div><strong>Weather and natural disasters</strong> reduce supply — droughts devastating Australian wheat harvests, hurricanes disrupting Gulf of Mexico oil production. <strong>Number of firms</strong>: new entrants shift market supply right, exits shift it left. <strong>Expectations</strong>: if firms expect higher future prices, they may withhold stock now (supply shifts left today). <strong>Regulation</strong>: stricter environmental laws, planning permission, or licensing requirements raise compliance costs and shift supply left.
<div class="take-away"><div class="take-away-label">Take Away</div><p>The supply curve shows how much firms are willing and able to produce at each price — it shifts when non-price factors (costs, technology, taxes, weather, regulation) change, and the key to exam success is identifying the specific factor and tracing its effect through to the new equilibrium.</p></div>`
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
          `<div class="key-idea"><div class="key-idea-label">Key Idea</div><p>PES measures how responsive quantity supplied is to a change in price — it tells you whether firms can quickly ramp up production when the market price rises.</p></div>`,
          `<strong>Price elasticity of supply (PES)</strong> answers a precise question: "If the market price rises by 10%, by what percentage does quantity supplied change?" Because the supply curve slopes upward, PES is usually <strong>positive</strong> — higher price, more supplied. Like PED, it uses percentage changes, making it a unit-free measure you can compare across completely different goods and industries.`
        ],
        formula: 'PES = % change in quantity supplied ÷ % change in price'
      },
      {
        title: 'Interpreting PES Values',
        points: [
          `<strong>PES > 1 = elastic supply</strong>: quantity supplied responds <strong>more</strong> than proportionally to a price change. These are industries with spare capacity, available stocks, and flexible production — think digital content or mass-manufactured consumer goods. Firms can ramp up quickly when the price rises.`,
          `<strong>PES < 1 = inelastic supply</strong>: quantity supplied responds <strong>less</strong> than proportionally. Typical of industries with long production cycles, limited resources, or full capacity. UK housing is the classic example — even when prices soar, supply barely budges because of limited land, slow construction times, and restrictive planning regulations.`,
          `<strong>PES = 0 = perfectly inelastic</strong>: quantity doesn't respond at all — a vertical supply curve. Think of the fixed number of seats at Wembley Stadium or land in central London. <strong>PES = ∞ = perfectly elastic</strong>: firms will supply any amount at one price but nothing below it — a horizontal supply curve. <strong>PES = 1 = unit elastic</strong>: percentage changes are exactly equal, and the supply curve passes through the origin.`
        ]
      },
      {
        title: 'Factors Influencing PES',
        points: [
          `<strong>Time period</strong> is the single most important determinant. In the <strong>very short run</strong>, supply is almost perfectly inelastic — a concert venue cannot add seats tonight. In the <strong>short run</strong>, firms can adjust variable factors (hire more workers, buy more materials) but cannot change fixed factors (factory size). In the <strong>long run</strong>, all factors become variable — firms build new factories, adopt new technology, and new firms enter the market. Supply becomes much more elastic over time.`,
          `<strong>Spare capacity</strong>: a factory running at 60% utilisation can quickly boost output — elastic supply. A factory running flat-out on three shifts cannot produce much more — inelastic. <strong>Stock levels</strong>: firms holding large inventories can respond instantly to price rises by releasing stock. Perishable goods like fresh flowers or fish cannot be stored, making supply inelastic in the short run.`,
          `<strong>Factor mobility</strong>: if workers and capital can switch easily between industries, supply responds quickly to price changes. Highly specialised resources — brain surgeons, semiconductor fabrication plants — cannot be repurposed, so supply stays inelastic. <strong>Barriers to entry</strong>: low barriers let new firms enter quickly when prices rise, increasing market supply elasticity. High barriers (heavy regulation, huge capital requirements) slow the supply response.`,
          `<div class="so-what"><div class="so-what-label">Why This Matters for the Exam</div><p>When discussing PES factors, always explain the mechanism — WHY does spare capacity make supply more elastic? Because firms can increase output without building new facilities or incurring additional fixed costs. Don't just list factors; show the chain of logic from cause to elastic or inelastic response.</p></div>
<div class="take-away"><div class="take-away-label">Take Away</div><p>PES depends on time period, spare capacity, stock levels, factor mobility, barriers to entry, and production cycles — always explain the mechanism behind each factor, not just name it.</p></div>`
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
          `<div class="key-idea"><div class="key-idea-label">Key Idea</div><p>The short run is defined by factor fixity — at least one factor of production is fixed — while in the long run all factors are variable, making supply far more elastic.</p></div>`,
          `The <strong>short run</strong> is any period where <strong>at least one factor of production is fixed</strong> — usually capital. You can hire more waiters but you cannot build a new restaurant overnight. Firms can only increase output by using more <strong>variable factors</strong> within existing fixed capacity, which is exactly why diminishing returns kick in and marginal costs rise.`,
          `The <strong>long run</strong> is when <strong>all factors are variable</strong> — firms can expand premises, build new facilities, adopt entirely new technology, or exit the market. The crucial insight is that this is about <strong>factor fixity, not calendar time</strong>. For a coffee shop, the long run might be 6 months (find new premises and fit them out). For a nuclear power station, the long run could be 15 years. In the <strong>very short run (momentary period)</strong>, virtually all factors are fixed — the supply of fish already caught today cannot change regardless of what happens to the price.`,
          `<div class="flow-chain"><span class="pill blue">Price of housing rises</span><span class="arrow">→</span><span class="pill neg">Short run: can't build fast enough</span><span class="arrow">→</span><span class="pill neg">Supply inelastic</span><span class="arrow">→</span><span class="pill pos">Long run: new developments built</span><span class="arrow">→</span><span class="pill pos">Supply becomes more elastic</span></div>`
        ],
        examTip: `Define short run and long run precisely in terms of factor fixity, NOT calendar time. "The short run is when at least one factor of production is fixed" — examiners reward this precision.`
      },
      {
        title: 'Significance of PES',
        points: [
          `<strong>For consumers</strong>: when supply is inelastic, any increase in demand causes much larger <strong>price spikes</strong> because firms simply cannot produce more quickly. This is why UK house prices have risen far faster than incomes — supply is severely inelastic due to limited land, slow construction, and restrictive planning regulations. It also explains why oil and food prices are so volatile — supply cannot adjust fast enough to absorb demand shocks.`,
          `<strong>For government — tax incidence</strong>: when supply is inelastic, producers bear more of a tax because they cannot easily cut output. They absorb the cost rather than losing sales. When supply is elastic, producers pass more of the tax onto consumers because they can credibly threaten to reduce production if the net price falls too low. This is why taxing land (perfectly inelastic supply) is considered one of the most efficient taxes — landlords bear the full burden.`,
          `<strong>For government — subsidy effectiveness</strong>: subsidies are most effective at increasing output when supply is elastic — firms can actually ramp up production in response. If supply is inelastic, the subsidy mostly just reduces price without generating much extra output. This is precisely why the UK's Help to Buy scheme was criticised — it boosted demand in a market with extremely inelastic supply, largely inflating house prices rather than increasing housing stock.`,
          `<div class="take-away"><div class="take-away-label">Take Away</div><p>PES determines whether price changes or quantity changes dominate when markets shift — inelastic supply means volatile prices and limited output responses, while elastic supply allows quantity to adjust smoothly.</p></div>`
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
          `<div class="key-idea"><div class="key-idea-label">Key Idea</div><p>Market equilibrium is the price at which quantity demanded exactly equals quantity supplied — a resting point the market gravitates toward naturally through the actions of self-interested buyers and sellers.</p></div>`,
          `<strong>Equilibrium</strong> occurs where the demand and supply curves intersect — the price at which quantity demanded exactly equals quantity supplied. At this <strong>market-clearing price</strong>, there is no tendency for the price to change: every unit produced finds a willing buyer, and every buyer willing to pay that price gets the good. On a diagram, equilibrium is the point <strong>(P*, Q*)</strong> where D and S cross. It is not a fixed point — it shifts whenever demand or supply conditions change. Think of it as a resting place that the market constantly adjusts toward.`
        ]
      },
      {
        title: 'Changes from Demand Shifts',
        points: [
          `An <strong>increase in demand</strong> (D shifts right) creates temporary <strong>excess demand</strong> at the old price — buyers compete for scarce goods, bidding the price up, and firms respond by producing more. The market settles at a new equilibrium with <strong>higher price and higher quantity</strong>. The surge in demand for home office equipment during the COVID-19 lockdowns is a clear example: prices and sales volumes both rose sharply as millions of people suddenly needed desks, monitors, and webcams.`,
          `<div class="flow-chain"><span class="pill pos">Demand increases (D shifts right)</span><span class="arrow">→</span><span class="pill neg">Excess demand at old price</span><span class="arrow">→</span><span class="pill blue">Buyers bid price up</span><span class="arrow">→</span><span class="pill amber">New equilibrium: higher P, higher Q</span></div>`,
          `A <strong>decrease in demand</strong> (D shifts left) creates temporary <strong>excess supply</strong> — firms cut prices to clear unsold stock, and the market settles at a new equilibrium with <strong>lower price and lower quantity</strong>. The magnitude of these changes depends critically on the <strong>elasticity of supply</strong>: if supply is inelastic, a demand increase mostly raises the <em>price</em> with little extra quantity; if supply is elastic, quantity responds more and the price rise is smaller.`
        ],
        examTip: `Always trace the chain of reasoning: identify the shift → explain the temporary disequilibrium → explain the adjustment process → state the new equilibrium. This logical chain is exactly what examiners want.`
      },
      {
        title: 'Changes from Supply Shifts',
        points: [
          `An <strong>increase in supply</strong> (S shifts right) creates excess supply at the old price — firms cut prices to sell their extra output, consumers buy more, and the market reaches a new equilibrium with <strong>lower price and higher quantity</strong>. The tech industry demonstrates this continuously: technological improvements shift supply right year after year, driving prices down while output soars.`,
          `A <strong>decrease in supply</strong> (S shifts left) creates a shortage at the old price — the price rises as buyers compete for less output, and consumers buy less at the higher price. New equilibrium: <strong>higher price and lower quantity</strong>. The 2022 energy crisis, when Russia cut gas supplies to Europe, is a textbook example: supply shifted left, prices surged, and consumption fell across the continent.`,
          `<div class="so-what"><div class="so-what-label">Why This Matters for the Exam</div><p>On diagrams, always label the original equilibrium (E1) and new equilibrium (E2), mark the shift with an arrow, and show the direction of change in both P and Q. The magnitude of change depends on the elasticity of the other curve — discuss this for top marks.</p></div>
<div class="take-away"><div class="take-away-label">Take Away</div><p>Equilibrium shifts whenever demand or supply conditions change — always identify the shift, trace the adjustment process through temporary disequilibrium, and state the new equilibrium price and quantity.</p></div>`
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
          `<div class="key-idea"><div class="key-idea-label">Key Idea</div><p>When the price is below equilibrium, quantity demanded exceeds quantity supplied, creating a shortage that pushes the price upward until equilibrium is restored.</p></div>`,
          `When the price sits <strong>below equilibrium</strong>, quantity demanded exceeds quantity supplied — there is a <strong>shortage</strong> (excess demand). Buyers compete for scarce goods, bidding the price up. As the price rises, some buyers drop out (contraction of demand) and firms increase output (extension of supply) until the gap closes and equilibrium is restored. Think of concert tickets priced below their true market value — they sell out instantly, and scalpers resell them at the market-clearing price. Or petrol during a panic-buying scare: at the normal price everyone tries to fill up, but stations run dry. If a government imposes a <strong>maximum price (price ceiling)</strong> below equilibrium, this shortage becomes <em>persistent</em> because the market mechanism is blocked from pushing the price upward.`
        ]
      },
      {
        title: 'Excess Supply (Surplus)',
        points: [
          `When the price is <strong>above equilibrium</strong>, quantity supplied exceeds quantity demanded — there is a <strong>surplus</strong> (excess supply). Unsold stock piles up, so producers cut prices to shift it. As the price falls, more consumers buy (extension of demand) and some producers cut back production (contraction of supply) until equilibrium is restored.`,
          `This is exactly what happens in end-of-season sales — retailers sitting on unsold winter coats slash prices in January. If a government sets a <strong>minimum price (price floor)</strong> above equilibrium, the surplus persists indefinitely. The EU's Common Agricultural Policy created infamous "butter mountains" and "wine lakes" by guaranteeing farmers a price above the market equilibrium, generating persistent overproduction that taxpayers had to finance.`
        ]
      },
      {
        title: 'Market Forces & Price Adjustment',
        points: [
          `Free markets have a built-in <strong>self-correcting mechanism</strong>. Any departure from equilibrium triggers price changes that push the market back. This is Adam Smith's "invisible hand" — not a planned or directed process, but the natural consequence of buyers and sellers responding to their own self-interest. Shortages bid the price up; surpluses push it down.`,
          `<div class="take-away"><div class="take-away-label">Take Away</div><p>Markets naturally self-correct — shortages push prices up and surpluses push them down — but the speed of adjustment varies hugely: stock markets adjust in milliseconds, while housing and labour markets can stay in disequilibrium for years.</p></div>`
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
          `<div class="key-idea"><div class="key-idea-label">Key Idea</div><p>Consumer surplus is the difference between what you are willing to pay and what you actually pay — it measures the "bargain" consumers get from participating in a market.</p></div>`,
          `<strong>Consumer surplus</strong> is the difference between what you are <strong>willing to pay</strong> and what you <strong>actually pay</strong>. If you would happily pay £5 for a coffee but it costs £3, your consumer surplus is £2 — the extra value you enjoy. On a diagram, CS is the triangular area <strong>below the demand curve and above the market price</strong>. A fall in price <strong>increases</strong> consumer surplus (a better bargain for existing buyers, plus new buyers enter the market). A rise in price <strong>decreases</strong> it. Consumer surplus captures the net benefit consumers receive from participating in a market — it is a direct measure of consumer welfare.`
        ],
        formula: 'CS = Area below demand curve, above market price'
      },
      {
        title: 'Producer Surplus',
        points: [
          `<strong>Producer surplus</strong> is the difference between the price a firm <strong>receives</strong> and the minimum price it would <strong>accept</strong> (essentially its cost of production). On a diagram, PS is the triangular area <strong>above the supply curve and below the market price</strong>. A rise in the market price <strong>increases</strong> producer surplus, while a fall <strong>decreases</strong> it.`,
          `Together, <strong>CS + PS = total economic surplus</strong> — the total net benefit to society from trade in this market. This concept is central to welfare analysis: any policy that increases total surplus improves allocative efficiency, and any policy that reduces it creates waste.`
        ],
        formula: 'PS = Area above supply curve, below market price'
      },
      {
        title: 'Total Surplus and Deadweight Loss',
        points: [
          `Total economic surplus is <strong>maximised at the free-market equilibrium</strong>. This is the core efficiency argument for free markets: without intervention, the market naturally maximises the combined benefit to consumers and producers. Every trade that is worth making (where the buyer values the good more than it costs the seller to produce) happens.`,
          `Any intervention that moves the market away from equilibrium — taxes, price controls, quotas — <strong>reduces total surplus</strong> and creates a <strong>deadweight loss</strong>. This deadweight loss is a triangle of welfare that goes to nobody: trades that would have benefited both buyer and seller no longer take place. Government gains tax revenue and may achieve equity goals, but some economic value is permanently destroyed.`,
          `<div class="so-what"><div class="so-what-label">Why This Matters for the Exam</div><p>When analysing any policy (tax, subsidy, price control), always draw and label the deadweight loss triangle. Then evaluate: is the equity or corrective benefit worth the efficiency cost? The strongest answers explicitly weigh both sides rather than declaring one view correct.</p></div>
<div class="take-away"><div class="take-away-label">Take Away</div><p>Total surplus (CS + PS) is maximised at free-market equilibrium — any intervention creates deadweight loss, but this efficiency cost may be justified if it corrects a market failure or improves equity.</p></div>`
        ],
        examTip: `When analysing any policy (tax, subsidy, price control), always draw the deadweight loss triangle. Then evaluate: is the equity or corrective benefit worth the efficiency cost? The strongest answers weigh both sides.`
      }
    ]
  },
  {
    title: 'Functions of the Price Mechanism',
    concepts: [
      {
        title: 'Rationing',
        points: [
          `<div class="key-idea"><div class="key-idea-label">Key Idea</div><p>The price mechanism rations scarce goods by allocating them to those willing and able to pay — solving the "for whom" problem without any central plan.</p></div>`,
          `Prices <strong>ration scarce goods</strong> — they allocate goods to those willing and able to pay the market price. When a good becomes scarce, its price rises, which discourages some buyers and ensures the limited supply reaches those who value it most (in monetary terms). This is how free markets solve the basic economic problem — what to produce and for whom — without anyone directing the outcome. The limitation is significant: "willing and able" means the poor are rationed out regardless of need. A homeless person may need housing more than a property investor, but the market allocates based on purchasing power, not need.`
        ]
      },
      {
        title: 'Incentive',
        points: [
          `Price changes <strong>create incentives</strong> that alter behaviour. A higher price incentivises firms to produce more (greater profit opportunity) and consumers to buy less or switch to substitutes. A lower price incentivises consumers to buy more and may push some less-efficient firms out of the market entirely.`,
          `This is Adam Smith's "<strong>invisible hand</strong>" at work: nobody coordinates anything centrally, but self-interested responses to price signals direct resources toward their most valued uses. When the price of renewable energy equipment falls (driven by technological progress and economies of scale), firms are incentivised to invest in solar and wind power without any government mandate — the profit motive does the work.`
        ]
      },
      {
        title: 'Signalling',
        points: [
          `Prices act as <strong>signals</strong> conveying information about relative scarcity across the entire economy. A rising price signals that a good is becoming <strong>scarcer or more desired</strong>, prompting new firms to enter or existing firms to expand. A falling price signals <strong>oversupply or falling demand</strong>, prompting firms to cut back or exit. No government committee told smartphone manufacturers to produce billions of units — rising prices and profits in the early 2010s signalled opportunity, and firms rushed in from around the world.`,
          `<div class="flow-chain"><span class="pill pos">Price rises</span><span class="arrow">→</span><span class="pill blue">Signals scarcity / rising demand</span><span class="arrow">→</span><span class="pill pos">New firms enter, existing firms expand</span><span class="arrow">→</span><span class="pill amber">Resources reallocated to highest-value uses</span></div>`,
          `<div class="take-away"><div class="take-away-label">Take Away</div><p>The price mechanism performs three functions — rationing, incentivising, and signalling — that coordinate millions of independent decisions without central planning. It breaks down when prices are distorted by externalities, monopoly power, or government intervention.</p></div>`
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
          `<div class="key-idea"><div class="key-idea-label">Key Idea</div><p>A specific tax is a fixed amount per unit sold — it shifts the supply curve upward by a constant amount, creating a parallel shift that raises the market price and reduces quantity traded.</p></div>`,
          `A <strong>specific tax</strong> is a <strong>fixed amount per unit</strong> — 58p per litre on petrol, or the excise duty on each pack of cigarettes. On a diagram, it causes a <strong>parallel upward shift</strong> of the supply curve by exactly the tax amount. The vertical distance between the old S curve and the new S+tax curve is identical at every quantity. Specific taxes are common on goods where the level of consumption itself (not the price paid) is the policy concern — alcohol, tobacco, fuel. Because they are a fixed amount, they hit cheaper products proportionally harder than expensive ones.`
        ],
        formula: 'S+tax shifts up by the fixed tax per unit (parallel shift)'
      },
      {
        title: 'Ad Valorem Taxes',
        points: [
          `An <strong>ad valorem tax</strong> is a <strong>percentage of the selling price</strong> — UK VAT at 20% is the main example. On a diagram, the supply curve <strong>pivots upward</strong> from the origin because the gap between S and S+tax widens at higher prices (20% of £100 is £20, but 20% of £10 is only £2). The two curves meet at the quantity axis where the price is zero.`,
          `Ad valorem taxes are proportional — they take the same percentage from cheap and expensive goods alike. This makes them more neutral across price ranges, but the <strong>absolute</strong> tax burden is higher on premium products. UK VAT at 20% adds £4 to a £20 item but £200 to a £1,000 item.`
        ],
        formula: 'New price = Original price × (1 + tax rate)'
      },
      {
        title: 'Effects of Indirect Taxes',
        points: [
          `With either tax type: the market price <strong>rises</strong>, but by <strong>less than the full tax</strong> — the remainder is absorbed by the producer as lower net revenue. Quantity <strong>falls</strong> because the higher price reduces demand. Consumer surplus <strong>falls</strong>, producer surplus <strong>falls</strong>, and the government gains <strong>tax revenue</strong> (shown as a rectangle between the two supply curves, up to the new equilibrium quantity).`,
          `<div class="flow-chain"><span class="pill neg">Government imposes tax</span><span class="arrow">→</span><span class="pill neg">Supply shifts up/left</span><span class="arrow">→</span><span class="pill neg">Market price rises, quantity falls</span><span class="arrow">→</span><span class="pill amber">Deadweight loss + tax revenue</span></div>`,
          `A <strong>deadweight loss</strong> triangle is created — some mutually beneficial trades that would have occurred no longer do. This is the efficiency cost of taxation. The key evaluation question: is the deadweight loss worth it? For <strong>Pigouvian taxes</strong> correcting negative externalities (the UK sugar tax on soft drinks, for instance), the answer may well be yes — the tax reduces overproduction toward the socially optimal level. For general revenue-raising taxes, it is a trade-off between revenue gained and efficiency lost.`
        ],
        formula: 'Tax revenue = Tax per unit × Q (after tax)'
      },
      {
        title: 'Tax Incidence',
        points: [
          `<strong>Tax incidence</strong> asks the critical question: who actually bears the burden of the tax? The answer depends on <strong>relative elasticities</strong>. The more <strong>inelastic</strong> side of the market bears the greater share, because they cannot easily adjust their behaviour to escape the tax.`,
          `<div class="flow-chain"><span class="pill blue">Tax imposed</span><span class="arrow">→</span><span class="pill neg">Price rises for consumers</span><span class="arrow">→</span><span class="pill neg">Net revenue falls for producers</span><span class="arrow">→</span><span class="pill amber">Burden split by relative elasticities</span></div>`,
          `<div class="so-what"><div class="so-what-label">Why This Matters for the Exam</div><p>If demand is inelastic (cigarettes — addictive, few substitutes), consumers bear most of the tax. If demand is elastic (one brand of chocolate — many substitutes), producers absorb more. In the extreme, perfectly inelastic demand means the consumer pays the entire tax. It is not who the government charges the tax to that determines the burden — it is the relative elasticities that matter.</p></div>
<div class="take-away"><div class="take-away-label">Take Away</div><p>Indirect taxes raise the market price, reduce quantity, and create deadweight loss — but who actually bears the burden depends on relative elasticities, not on who the tax is legally charged to.</p></div>`
        ],
        examTip: `Tax incidence is a favourite exam topic. Always link PED and PES to who bears the burden, and illustrate on a diagram. The crucial insight: it's not who the government charges the tax to that matters — it's the relative elasticities that determine the actual burden.`
      }
    ]
  },
  {
    title: 'Subsidies',
    concepts: [
      {
        title: 'Effect of a Subsidy',
        points: [
          `<div class="key-idea"><div class="key-idea-label">Key Idea</div><p>A subsidy is a government payment to producers that reduces their costs, shifting supply right — the market price falls and quantity rises, but the benefit is shared between consumers and producers depending on elasticities.</p></div>`,
          `A <strong>subsidy</strong> is a payment by the government to producers that reduces their costs of production. On a diagram, it shifts the supply curve <strong>down/right</strong> by the subsidy per unit. The result: the market price <strong>falls</strong> and the equilibrium quantity <strong>rises</strong>. Crucially, the price does not fall by the full subsidy amount — the benefit is <strong>shared</strong> between consumers (who pay a lower price) and producers (who receive a higher effective price = market price + subsidy per unit). The government's total cost = subsidy per unit x new quantity sold, all funded by taxpayers.`
        ],
        formula: 'Government cost = Subsidy per unit × Q (after subsidy)'
      },
      {
        title: 'Who Benefits?',
        points: [
          `The share of benefit depends on <strong>elasticities</strong> — the same logic as tax incidence, but in reverse. If demand is <strong>inelastic</strong>, consumers gain less (the price does not fall much because they would have bought anyway) and producers capture more of the subsidy as higher revenue. If demand is <strong>elastic</strong>, consumers benefit more through noticeably lower prices. Similarly, if supply is inelastic, producers benefit more; if elastic, consumers do.`,
          `<div class="flow-chain"><span class="pill pos">Government grants subsidy</span><span class="arrow">→</span><span class="pill pos">Supply shifts right</span><span class="arrow">→</span><span class="pill pos">Price falls, quantity rises</span><span class="arrow">→</span><span class="pill amber">Benefit shared by elasticities</span></div>`,
          `<div class="take-away"><div class="take-away-label">Take Away</div><p>Subsidies reduce prices and increase output, but unless they correct a genuine market failure (positive externality, merit good), they create deadweight loss and the cost falls on taxpayers — always ask who really benefits and whether the spending is well-targeted.</p></div>`
        ],
        examTip: `In evaluation, always ask: (1) Who pays? Taxpayers — there's an opportunity cost. (2) Does it correct a market failure? If not, it creates allocative inefficiency. (3) Is it well-targeted? Subsidies often benefit those who don't need them most.`
      }
    ]
  },
  {
    title: 'Alternative Views of Consumer & Producer Behaviour',
    concepts: [
      {
        title: 'Behavioural Economics',
        points: [
          `<div class="key-idea"><div class="key-idea-label">Key Idea</div><p>Behavioural economics challenges the assumption that consumers are rational utility maximisers — in reality, people satisfice, suffer from biases, and are heavily influenced by how choices are framed.</p></div>`,
          `<div class="content-subhead">Bounded Rationality & Loss Aversion</div>Standard economic theory assumes consumers are <strong>rational utility maximisers</strong> with perfect information, always calculating the optimal choice. Behavioural economics challenges every part of this. <strong>Bounded rationality</strong> (Herbert Simon) recognises that people have limited brainpower and time, so they "<strong>satisfice</strong>" — they find a "good enough" option rather than computing the optimum. You do not compare every possible phone before buying one; you look at a few and pick the best of those. <strong>Loss aversion</strong> (Kahneman and Tversky) shows that losing £50 feels about twice as painful as gaining £50 feels good. This explains why people hold losing investments too long ("I can't sell at a loss") and why "money-back guarantees" are so effective — they remove the perceived risk of loss.`,
          `<div class="content-subhead">Nudge Theory & Present Bias</div><strong>Nudge theory</strong> (Thaler and Sunstein) shows that small changes in how choices are presented — the "<strong>choice architecture</strong>" — can steer decisions without restricting freedom. Auto-enrolment into UK workplace pensions is the textbook nudge: you can opt out, but most people do not bother, so pension coverage has soared. Putting fruit at eye level in school cafeterias increases healthy eating. These interventions are <strong>libertarian paternalist</strong> — they preserve choice but exploit predictable biases to improve outcomes.`,
          `<strong>Present bias</strong> means people systematically overvalue immediate gratification and undervalue future consequences. This is why people under-save for retirement, overeat, and procrastinate on revision — even when they know they will regret it. It also explains why "buy now, pay later" schemes are so popular and potentially harmful: the cost feels distant and abstract while the purchase feels immediate and real.`,
          `<div class="watch-out"><div class="watch-out-label">Common Mistake</div><p>Do not treat behavioural economics as simply "people are irrational." The insight is more precise: people are predictably irrational in specific, systematic ways. This means their behaviour can be anticipated and policy can be designed around it — which is exactly why nudge theory works.</p></div>`
        ]
      },
      {
        title: 'Alternative Producer Behaviour',
        points: [
          `Traditional theory assumes firms <strong>maximise profit</strong> by producing where MC = MR. In practice, firms may pursue quite different objectives depending on who controls decision-making and what incentives they face.`,
          `<div class="content-subhead">Revenue & Sales Maximisation</div><strong>Revenue maximisation</strong> (produce where MR = 0) may appeal to managers whose bonuses and status are tied to sales turnover rather than profit. <strong>Sales maximisation</strong> (produce where AC = AR, meaning normal profit only) targets the largest possible market share, sacrificing some profit for dominance. Amazon operated at a loss for years to build market share — a strategy that only makes sense if you view the firm as a sales or growth maximiser rather than a short-run profit maximiser.`,
          `<div class="content-subhead">Satisficing & CSR</div><strong>Satisficing</strong> means the firm earns "good enough" profit while also pursuing other goals — keeping workers happy, avoiding risk, maintaining product quality, or simply giving the owner a reasonable work-life balance. This is common in owner-managed businesses. <strong>Corporate social responsibility (CSR)</strong> sees some firms investing in environmental or social programmes that reduce short-term profit but may enhance long-term reputation and brand loyalty. Patagonia donates 1% of revenue to environmental causes — arguably a form of smart long-run profit maximisation dressed up as altruism.`,
          `The <strong>principal-agent problem</strong> explains much of the gap between textbook and real-world behaviour: shareholders (principals) want profit maximised, but managers (agents) have their own interests — career advancement, perks, empire-building, a quiet life. Without strong corporate governance mechanisms, managers may pursue their own goals at shareholders' expense. This is why executive pay structures, independent boards, and shareholder activism exist.`,
          `<div class="take-away"><div class="take-away-label">Take Away</div><p>Real firms and consumers often deviate from textbook rationality in predictable ways — use behavioural insights and alternative objectives to evaluate whether standard supply-and-demand predictions hold in practice, and discuss whether this undermines or merely qualifies the model.</p></div>
<div class="section-links"><span class="link">↗ 1.4 Price Determination</span><span class="link">↗ 1.5 Market Failure</span></div>`
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
