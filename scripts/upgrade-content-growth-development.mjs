/**
 * UPGRADE — 4.3.6 Economic Growth and Development
 * Rewrites section_content from old concepts[] format to new sections[] format.
 * Run: node scripts/upgrade-content-growth-development.mjs
 */
import { supabase } from './_db.mjs';

const CONTENT = [
  /* ═══════════════════════════════════════════════════
   *  Chapter 1: Growth vs Development
   * ═══════════════════════════════════════════════════ */
  {
    title: "Growth vs Development",
    sections: [
      {
        id: "growth-vs-development",
        title: "Economic Growth vs Development",
        keyIdea: "Growth means rising real GDP — a narrow output measure — while development captures broader wellbeing including health, education, and freedom, measured by the HDI.",
        body: [
          { type: "paragraph", text: "**Economic growth** is defined as an increase in real GDP over time. It measures the expansion of a country's productive output and is relatively straightforward to calculate. However, growth tells us nothing about who benefits, what is produced, or whether citizens are healthier, better educated, or freer. A country can experience strong GDP growth while its people remain poor, uneducated, and politically oppressed." },
          { type: "paragraph", text: "**Economic development** is a broader concept encompassing improvements in living standards, reduction in poverty, better health and education outcomes, greater political freedom, and environmental sustainability. Development is multidimensional and harder to measure. The **Human Development Index (HDI)** combines three dimensions: life expectancy at birth, mean and expected years of schooling, and GNI per capita (PPP). It ranges from 0 to 1, with scores above 0.8 considered 'very high human development'." },
          { type: "paragraph", text: "The distinction matters because growth is necessary but not sufficient for development. A country may achieve growth through resource extraction that enriches a small elite while leaving the majority in poverty — growth without development. Conversely, targeted investment in health and education can improve development outcomes even at relatively low GDP levels." },
          { type: "flow", steps: ["Country experiences rapid GDP growth from resource extraction", "Revenue concentrated among political elite", "Health, education, and freedom remain poor", "High GDP per capita but low HDI"], result: "Growth without development — GDP alone is a misleading indicator of progress", resultType: "bad" }
        ],
        realExample: { emoji: "🇬🇶", text: "Equatorial Guinea has one of Africa's highest GDP per capita figures due to oil wealth, yet ranks poorly on the HDI. Oil revenues are concentrated among a small elite, while most citizens lack access to clean water, healthcare, and quality education — a stark example of growth without development." },
        misconception: "Students use growth and development interchangeably. Wrong — growth is a quantitative increase in GDP, while development is a qualitative improvement in living standards across multiple dimensions. Instead write: growth is necessary for development but not sufficient — a country needs growth, but it must be inclusive and invested in health, education, and institutions.",
        examMatters: "Examiners frequently test the distinction between growth and development. Always define both, give the HDI components (life expectancy, education, GNI per capita), and provide an example where they diverge. This is a foundation for almost every development essay."
      },
      {
        id: "barriers-development",
        title: "Barriers to Development",
        keyIdea: "Development is blocked by the savings gap (Harrod-Domar), primary commodity dependence, debt burdens, weak institutions, low human capital, and geography — often forming a self-reinforcing poverty trap.",
        body: [
          { type: "paragraph", text: "The **Harrod-Domar model** highlights the **savings gap**: investment requires savings, but poor countries have low incomes leaving little to save. Without investment, capital stock does not grow, productivity stagnates, and incomes remain low — a vicious cycle. Foreign aid and FDI are proposed solutions, but both have limitations: aid may create dependency and FDI profits are often repatriated." },
          { type: "paragraph", text: "**Primary commodity dependence** exposes countries to volatile world prices and long-term declining terms of trade (the **Prebisch-Singer hypothesis**). When copper or coffee prices crash, government revenues collapse. The **debt burden** compounds this: many developing countries borrowed heavily and now spend more on debt service than on health and education. **Weak institutions** — corruption, lack of property rights, poor governance — deter investment and prevent efficient resource allocation." },
          { type: "paragraph", text: "These barriers interact to create a **poverty trap**: a self-reinforcing cycle where low income leads to low savings, low investment, low productivity, and back to low income. Breaking the trap requires a coordinated 'big push' — simultaneous investment in infrastructure, education, health, and institutions — rather than piecemeal interventions that are swallowed by the cycle." },
          { type: "flow", steps: ["Low income means low savings", "Low savings means low investment", "Low investment means low productivity growth", "Low productivity keeps incomes low"], result: "Poverty trap — a self-reinforcing cycle that is extremely difficult to escape without external intervention", resultType: "bad" }
        ],
        realExample: { emoji: "🇨🇩", text: "The Democratic Republic of Congo possesses vast mineral wealth — cobalt, copper, diamonds — yet remains one of the world's poorest countries. Weak institutions, decades of conflict, colonial extraction, and the resource curse have trapped it in a cycle where natural wealth fuels corruption and conflict rather than development." },
        misconception: "Students list barriers as if they operate independently. Wrong — barriers to development are deeply interconnected and self-reinforcing. Instead write: the poverty trap concept shows how low income, low savings, low investment, weak institutions, and low human capital form a vicious cycle — addressing one barrier alone is often insufficient.",
        examMatters: "Examiners reward candidates who show how barriers interact rather than treating them as a checklist. Draw the poverty trap cycle, then evaluate whether external intervention (aid, FDI, debt relief) or internal reform (institutions, education) is more likely to break it. The best answers consider both."
      }
    ],
    takeaway: [
      "Growth = rising real GDP; development = broader improvements in wellbeing (HDI: life expectancy + education + GNI per capita).",
      "Growth is necessary but not sufficient for development — it must be inclusive.",
      "The Harrod-Domar savings gap, commodity dependence, debt, and weak institutions create poverty traps.",
      "Barriers are interconnected — breaking the cycle requires coordinated, multi-dimensional intervention."
    ]
  },

  /* ═══════════════════════════════════════════════════
   *  Chapter 2: Development Strategies
   * ═══════════════════════════════════════════════════ */
  {
    title: "Development Strategies",
    sections: [
      {
        id: "market-led-strategies",
        title: "Market-Led Strategies",
        keyIdea: "Trade liberalisation, FDI attraction, structural adjustment, and microfinance harness market forces for development — they worked spectacularly in East Asia but require functioning institutions to succeed.",
        body: [
          { type: "paragraph", text: "**Trade liberalisation** removes tariffs and quotas, allowing developing countries to specialise according to comparative advantage. By accessing global markets, firms achieve economies of scale and consumers benefit from lower prices. **FDI attraction** — through low tax rates, special economic zones, and deregulation — brings capital, technology, and management expertise that domestic firms lack." },
          { type: "paragraph", text: "**Structural adjustment programmes (SAPs)**, promoted by the IMF and World Bank from the 1980s, required countries to liberalise markets, privatise state enterprises, balance budgets, and reduce trade barriers in exchange for loans. While the theory is sound — removing government distortions should improve efficiency — SAPs often caused severe short-term pain: cuts to health and education spending hit the poorest hardest." },
          { type: "paragraph", text: "**Microfinance** provides small loans to entrepreneurs who lack access to traditional banking, enabling them to start businesses and escape poverty. The key insight is that the poor are creditworthy — they just lack collateral. However, high interest rates on microloans and the small scale of enterprises funded mean microfinance alone cannot drive economy-wide transformation." },
          { type: "flow", steps: ["Country liberalises trade and attracts FDI", "Export sector grows, technology transfers occur", "Tax revenue from growth funds public investment", "Sustained development if institutions are strong enough to manage the transition"], result: "Market-led development can succeed — but only where institutions channel growth into broad-based improvement", resultType: "neutral" }
        ],
        realExample: { emoji: "🇰🇷", text: "South Korea's export-led growth transformed it from a GDP per capita of $67 in 1953 to over $35,000 today. Strategic trade liberalisation, massive investment in education, and strong state direction of industrial policy created globally competitive firms like Samsung and Hyundai — though notably, the state played an active role alongside markets." },
        misconception: "Students present market-led strategies as universally effective. Wrong — they worked in East Asia partly because of strong state institutions that directed investment and protected infant industries during the transition. Instead write: market-led strategies require functioning institutions, rule of law, and often active state support to succeed — they are not a simple formula applicable everywhere.",
        examMatters: "Examiners want nuanced evaluation of market-led strategies. Do not simply say 'free markets work' — acknowledge that the most successful examples (South Korea, Taiwan, Singapore) combined market openness with significant state intervention. This challenges the pure market-led narrative and demonstrates analytical sophistication."
      },
      {
        id: "interventionist-strategies",
        title: "Interventionist Strategies",
        keyIdea: "Import substitution, state investment, buffer stocks, and aid use government power to drive development — but risk long-run inefficiency, government failure, and aid dependency.",
        body: [
          { type: "paragraph", text: "**Import Substitution Industrialisation (ISI)** protects domestic infant industries with tariffs and quotas, allowing them to develop behind trade barriers before facing international competition. The logic is sound: new firms cannot compete with established multinationals from day one. However, protection often becomes permanent — firms never become competitive because they face no pressure to innovate or reduce costs." },
          { type: "paragraph", text: "**State investment** in infrastructure, education, and healthcare addresses market failures that the private sector will not fix. Roads, ports, and electricity grids are prerequisites for private investment. **Buffer stocks** aim to stabilise commodity prices by buying when prices are low and selling when high — protecting farmers from devastating price swings. In practice, buffer stocks are expensive to maintain and often fail when governments run out of funds to keep buying." },
          { type: "paragraph", text: "**Foreign aid** can fill the savings gap identified by the Harrod-Domar model, funding investment that poor countries cannot finance domestically. However, aid creates **dependency** if it substitutes for rather than complements domestic effort. Poorly targeted aid may prop up corrupt governments or distort local markets. The evidence suggests aid works best when tied to governance reform and invested in health and education rather than given as general budget support." },
          { type: "flow", steps: ["Government imposes tariffs to protect infant industries", "Domestic firms grow behind trade barriers", "But without competitive pressure, firms remain inefficient", "Protection becomes permanent, consumers pay higher prices"], result: "ISI can build industries but risks creating long-run inefficiency and rent-seeking", resultType: "neutral" }
        ],
        realExample: { emoji: "🇮🇳", text: "India pursued import substitution from 1947 to 1991 under the 'Licence Raj' — extensive government control over industrial production and imports. While this built a domestic industrial base (steel, textiles, chemicals), chronic inefficiency, slow growth of around 3.5% per year (the 'Hindu rate of growth'), and consumer shortages led to liberalisation in 1991, after which growth accelerated dramatically." },
        misconception: "Students dismiss all government intervention as inefficient. Wrong — state investment in infrastructure and human capital addresses genuine market failures, and infant industry protection can work if it is temporary and conditional on performance. Instead write: interventionist strategies risk government failure, but targeted, time-limited intervention in infrastructure, education, and infant industries has a strong track record when designed well.",
        examMatters: "Examiners love the ISI debate. Structure your answer: explain the infant industry argument (temporary protection to build capacity), then evaluate — does protection actually remain temporary? Use India as a case study of both the achievements (industrial base) and failures (inefficiency, slow growth) of ISI to demonstrate balanced analysis."
      }
    ],
    takeaway: [
      "Market-led: trade liberalisation, FDI, structural adjustment, microfinance — effective but require strong institutions.",
      "Interventionist: ISI, state investment, buffer stocks, aid — address market failures but risk government failure.",
      "The most successful development stories (East Asia) combined market openness with strategic state intervention.",
      "Aid works best when tied to governance reform and invested in human capital, not given as untargeted budget support."
    ]
  },

  /* ═══════════════════════════════════════════════════
   *  Chapter 3: Sustainability
   * ═══════════════════════════════════════════════════ */
  {
    title: "Sustainability",
    sections: [
      {
        id: "sustainable-development",
        title: "Sustainable Development",
        keyIdea: "Sustainable development meets present needs without compromising future generations' ability to meet theirs — requiring preservation of natural capital and challenging the assumption that growth can continue indefinitely.",
        body: [
          { type: "paragraph", text: "**Sustainable development**, as defined by the Brundtland Commission (1987), means meeting the needs of the present without compromising the ability of future generations to meet their own needs. This requires maintaining **natural capital** — the stock of natural resources and ecosystem services — alongside physical and human capital. If economic growth depletes natural capital faster than it regenerates, current prosperity comes at future generations' expense." },
          { type: "paragraph", text: "The **Environmental Kuznets Curve (EKC)** hypothesis suggests that environmental degradation first increases with economic growth, then decreases after a turning point as countries become wealthy enough to afford environmental protection. Evidence for the EKC is mixed — it holds for some local pollutants (SO2, particulates) but not for CO2 or biodiversity loss, which continue rising with income." },
          { type: "paragraph", text: "Climate change disproportionately affects the poorest countries, which have contributed least to emissions. Low-lying nations face flooding, Sub-Saharan Africa faces drought, and agricultural economies are most vulnerable to temperature changes. This raises profound questions of **intergenerational and international equity** — those who caused the problem are not those who suffer most from it." },
          { type: "flow", steps: ["Economic growth increases resource extraction and emissions", "Natural capital is depleted faster than it regenerates", "Environmental damage disproportionately harms the poorest", "Future generations inherit degraded ecosystems and climate instability"], result: "Unsustainable growth — present prosperity at the cost of future wellbeing", resultType: "bad" }
        ],
        realExample: { emoji: "🇨🇷", text: "Costa Rica generates 99% of its electricity from renewable sources and has reversed decades of deforestation, with forest cover rising from 21% in 1987 to over 60% today. Despite being a middle-income developing country, it demonstrates that environmental sustainability and economic progress can coexist — though it still faces challenges in transport emissions and inequality." },
        misconception: "Students assume sustainable development means stopping economic growth. Wrong — it means changing the pattern of growth so that natural capital is preserved alongside economic expansion. Instead write: sustainable development does not oppose growth but requires that growth maintains natural capital — through renewable energy, circular economy practices, and pricing environmental externalities.",
        examMatters: "Examiners expect you to define sustainable development precisely (Brundtland definition), explain the concept of natural capital, and evaluate the Environmental Kuznets Curve. For top marks, discuss the international equity dimension — why should developing countries sacrifice growth when rich countries industrialised without environmental constraints?"
      },
      {
        id: "green-growth",
        title: "Green Growth",
        keyIdea: "Green growth combines economic expansion with environmental protection through carbon pricing, technology transfer, and international cooperation — but tensions remain between developing countries' growth needs and global climate targets.",
        body: [
          { type: "paragraph", text: "**Green growth** is the pursuit of economic growth that is compatible with environmental sustainability. Key mechanisms include **carbon pricing** (carbon taxes or emissions trading schemes that internalise the negative externality of CO2), **technology transfer** (sharing clean energy and agricultural technologies with developing countries), and **investment in renewable energy** infrastructure. The goal is to decouple GDP growth from environmental degradation." },
          { type: "paragraph", text: "**International cooperation** is essential because climate change is a global public good problem — no single country has the incentive to bear the full cost of reducing emissions when all countries benefit. This is the free rider problem on a planetary scale. Agreements like the Paris Accord attempt to solve this through nationally determined contributions (NDCs), but enforcement is weak and commitments often fall short of what climate science requires." },
          { type: "paragraph", text: "The deepest tension in green growth is between developing and developed countries. Rich nations industrialised by burning fossil fuels for two centuries; asking developing countries to forgo the same cheap energy path raises fundamental fairness questions. The principle of **common but differentiated responsibilities** acknowledges this — all countries must act, but richer countries should bear a larger share of the cost and transfer technology and finance to the developing world." },
          { type: "flow", steps: ["Carbon price raises cost of fossil fuel use", "Firms and consumers switch to cleaner alternatives", "Technology transfer enables developing countries to leapfrog dirty industrialisation", "International cooperation ensures burden-sharing"], result: "Growth continues but is decoupled from emissions — if cooperation holds and technology advances fast enough", resultType: "neutral" }
        ],
        realExample: { emoji: "🌍", text: "The Paris Agreement (2015) committed 196 countries to limiting global warming to 1.5 degrees Celsius above pre-industrial levels. It established the principle of nationally determined contributions, with rich countries pledging $100 billion annually in climate finance for developing nations — though delivery has consistently fallen short of promises." },
        misconception: "Students present green growth as a cost-free solution. Wrong — transitioning to a green economy involves real costs: stranded fossil fuel assets, higher short-term energy prices, and job losses in carbon-intensive industries. Instead write: green growth is necessary but involves significant transition costs that must be managed through retraining, investment, and compensating affected communities.",
        examMatters: "Examiners want you to evaluate whether green growth is achievable. Consider: can technology advance fast enough? Will international cooperation hold when short-term national interests conflict with long-term global goals? Is decoupling GDP from emissions actually happening at the required pace? The best answers acknowledge both the necessity and the difficulty of the green growth agenda."
      }
    ],
    takeaway: [
      "Sustainable development preserves natural capital for future generations — the Brundtland definition.",
      "The Environmental Kuznets Curve may hold for local pollutants but not for CO2 or biodiversity.",
      "Green growth requires carbon pricing, technology transfer, and international cooperation.",
      "The fairness tension: rich countries industrialised with fossil fuels but ask developing countries to choose a costlier path."
    ]
  }
];

async function main() {
  console.log('Upgrading 4.3.6 Economic Growth and Development to new format...');

  const { error } = await supabase
    .from('section_content')
    .update({ data: CONTENT })
    .eq('section_id', 'growth-development');

  if (error) {
    console.error('FAILED:', error.message);
  } else {
    console.log('SUCCESS — ' + CONTENT.length + ' chapters, ' + CONTENT.reduce((n, c) => n + c.sections.length, 0) + ' sections pushed.');
  }
}

main();
