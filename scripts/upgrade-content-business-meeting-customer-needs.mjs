/**
 * SECTION UPGRADE — Meeting Customer Needs (Business 1.3.1)
 * ==========================================================
 * Edexcel IAL Business Unit 1, spec point 1.3.1
 * Run with: node scripts/upgrade-content-business-meeting-customer-needs.mjs
 */

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL     || 'https://trweeckuswgkenckeqfb.supabase.co',
  process.env.SUPABASE_SERVICE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRyd2VlY2t1c3dna2VuY2tlcWZiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzE0ODY2NywiZXhwIjoyMDg4NzI0NjY3fQ.P9EchrMjfJdouBPIs728fuqVTm5Jq1B0JPsEdCp4IA0'
);

/* ── 1. SETTINGS ──────────────────────────────────────────────────────────── */

const SECTION_SLUG = 'meeting-customer-needs';
const SUBJECT_ID   = 'business';

/* ── 2. CONTENT ───────────────────────────────────────────────────────────── */

const CONTENT = [

  /* ═══ Block 1: The Market: Mass vs Niche ═══ */
  {
    title: "The Market: Mass vs Niche",
    quizIndices: [0],
    sections: [
      {
        id: "mass-markets",
        title: "Mass Markets",
        keyIdea: "When a business sells to the largest possible audience with a standardised product, it trades customisation for enormous economies of scale.",
        body: [
          {
            type: "paragraph",
            text: "A **mass market** is the largest segment of a market in which products are designed to appeal to the widest possible range of consumers. Think of everyday goods like Coca-Cola, Persil washing powder or Samsung smartphones. These products are not tailored to one specific group — they aim to satisfy a broad customer base."
          },
          {
            type: "flow",
            steps: ["Sell to everyone", "High sales volume", "Economies of scale"],
            result: "Lower unit costs and competitive pricing",
            resultType: "good"
          },
          {
            type: "paragraph",
            text: "The key advantage of operating in a mass market is **economies of scale** — producing in huge volumes drives down the average unit cost, allowing you to compete on price. However, mass markets attract intense competition from large firms with big marketing budgets, and it can be hard for smaller businesses to break in."
          },
          {
            type: "paragraph",
            text: "Mass-market products tend to be heavily branded and widely distributed. You will see them in every supermarket, advertised on prime-time TV, and sold through global retail chains."
          }
        ],
        realExample: {
          emoji: "🥤",
          text: "**Coca-Cola** sells over 2 billion servings per day across 200+ countries using a standardised product with localised marketing. This massive scale lets Coca-Cola negotiate rock-bottom prices from suppliers and spread advertising costs over billions of units."
        },
        misconception: "Students write \"mass markets are always more profitable than niche markets.\" That ignores the fierce price competition and high marketing costs that squeeze margins. Instead write: mass markets offer high revenue potential through volume, but intense competition can reduce profit margins compared to niche markets.",
        examMatters: "When comparing mass and niche markets, examiners want you to link each to specific business implications — economies of scale for mass, premium pricing for niche. Always evaluate by considering the nature of the product and the resources of the business."
      },
      {
        id: "niche-markets",
        title: "Niche Markets",
        keyIdea: "A niche market targets a small, specific segment of customers whose distinct needs are not fully met by mass-market products.",
        body: [
          {
            type: "paragraph",
            text: "A **niche market** is a small, well-defined segment of a larger market. Businesses operating here focus on meeting the specific needs of a particular group of consumers — for example, gluten-free bakeries, luxury electric cars, or organic baby clothing."
          },
          {
            type: "flow",
            steps: ["Identify unmet need", "Tailor product to segment", "Charge premium price"],
            result: "Higher profit margins per unit",
            resultType: "good"
          },
          {
            type: "paragraph",
            text: "The main advantage of a niche market is that you face **less direct competition** and can charge a **premium price** because customers value the specialisation. You also build strong brand loyalty — customers feel the product was made for them."
          },
          {
            type: "paragraph",
            text: "The risk is that your market is small, so total revenue may be limited. If demand falls or a large competitor enters your niche, you have little room to diversify."
          }
        ],
        realExample: {
          emoji: "🚗",
          text: "**Morgan Motor Company** in Malvern, UK, produces around 850 hand-built sports cars per year, compared to Toyota's 10 million. Morgan charges premium prices above $50,000 per car and has a waiting list of over a year, proving that niche players can be highly profitable without mass-market scale."
        },
        misconception: "Students claim \"niche markets are only for small businesses.\" Large firms also operate in niches — Porsche targets a niche within the car market, and Rolex dominates the luxury watch niche. Instead write: niche marketing is a strategy any size of business can use to target a specific, underserved segment.",
        examMatters: "Examiners often ask you to recommend whether a new business should target a mass or niche market. Your answer must depend on context — consider the firm's resources, the level of competition, and the nature of customer needs. Generic answers score poorly."
      },
      {
        id: "dynamic-markets",
        title: "Dynamic Markets",
        keyIdea: "Markets are not static — consumer tastes, technology and competition constantly change, and businesses that fail to adapt get left behind.",
        body: [
          {
            type: "paragraph",
            text: "A **dynamic market** is one that is subject to rapid and continuous change. Changes can come from shifts in **consumer preferences**, new **technology**, the entry of new **competitors**, or changes in **legislation**. Most modern markets are dynamic to some degree."
          },
          {
            type: "paragraph",
            text: "You need to understand that businesses operating in dynamic markets must be flexible and innovative. They need to invest in **market research** to spot trends early, adapt their product range, and be willing to take risks on new ideas."
          },
          {
            type: "flow",
            steps: ["Consumer tastes shift", "New technology emerges", "Business fails to adapt"],
            result: "Loss of market share and potential failure",
            resultType: "bad"
          },
          {
            type: "paragraph",
            text: "Online retailing, streaming services and electric vehicles are all examples of dynamic markets where the pace of change has been dramatic. Businesses that anticipated these changes — like Netflix and Tesla — thrived, while those that resisted — like Blockbuster and Kodak — collapsed."
          }
        ],
        realExample: {
          emoji: "📱",
          text: "**Nokia** held 40% of the global mobile phone market in 2007 but failed to adapt when Apple launched the iPhone. By 2013 Nokia's phone division was sold to Microsoft at a fraction of its former value, demonstrating how quickly a dynamic market can punish businesses that do not innovate."
        },
        misconception: "Students say \"a dynamic market is one where sales are growing.\" Growth is only one type of change — a dynamic market can also be shrinking, fragmenting or being disrupted by technology. Instead write: a dynamic market is one that is subject to rapid and continuous change in consumer preferences, technology, or competitive structure.",
        examMatters: "Questions on dynamic markets usually ask you to explain why a named business succeeded or failed. Always link the change in the market to a specific business decision — examiners reward chains of analysis, not vague statements about \"keeping up with change.\""
      }
    ],
    takeaway: [
      "Mass markets offer scale but fierce competition; niche markets offer premium but limited size.",
      "Niche businesses build loyalty by serving specific, unmet needs.",
      "Dynamic markets reward flexibility and punish businesses that resist change."
    ]
  },

  /* ═══ Block 2: Competition, Risk and Uncertainty ═══ */
  {
    title: "Competition, Risk and Uncertainty",
    quizIndices: [1],
    practiceIndices: [0],
    sections: [
      {
        id: "competition",
        title: "Competition",
        keyIdea: "Businesses constantly fight for customers, and the level of competition in a market shapes pricing, product quality and long-term survival.",
        body: [
          {
            type: "paragraph",
            text: "**Competition** exists when two or more businesses operate in the same market, trying to attract the same customers. The level of competition you face depends on several factors: the number of rival firms, how similar the products are, and how easy it is for new firms to enter the market."
          },
          {
            type: "flow",
            steps: ["Many competitors enter", "Customers have more choice", "Firms must improve or cut prices"],
            result: "Better value for consumers, squeezed margins for firms",
            resultType: "neutral"
          },
          {
            type: "paragraph",
            text: "In a **highly competitive** market, businesses must differentiate through branding, innovation, customer service or price. In a market with **little competition**, firms may enjoy higher margins but face less pressure to innovate. Competition is generally seen as beneficial for consumers because it drives down prices and improves quality."
          },
          {
            type: "paragraph",
            text: "New businesses entering a market increase competition. You should understand that **barriers to entry** — such as high start-up costs, brand loyalty, or patents — determine how easy or hard it is for new rivals to enter."
          }
        ],
        realExample: {
          emoji: "✈️",
          text: "**Ryanair** entered the European airline market by undercutting established carriers with ultra-low fares. This forced legacy airlines like British Airways to introduce their own budget fares and cut costs, demonstrating how a new competitor can reshape an entire industry."
        },
        misconception: "Students write \"competition is bad for businesses so they should try to avoid it.\" While competition does squeeze profits, it also forces firms to innovate and become more efficient, which can strengthen them long-term. Instead write: competition pressures firms to innovate and reduce costs, which may lower short-term profits but builds long-term competitiveness.",
        examMatters: "When discussing competition, examiners want you to consider the impact on both the business and the consumer. Always explain how the level of competition affects pricing strategy, product development, and the need for a USP."
      },
      {
        id: "risk-vs-uncertainty",
        title: "Risk vs Uncertainty",
        keyIdea: "Risk is when you know the possible outcomes and can estimate probabilities; uncertainty is when you cannot predict what will happen at all.",
        body: [
          {
            type: "paragraph",
            text: "Every business decision involves some degree of the unknown, but there is an important distinction between **risk** and **uncertainty**. **Risk** means the outcome is unknown, but you can identify the possible outcomes and assign rough probabilities to each. For example, you know a new product might succeed or fail, and you can use market research to estimate the chances."
          },
          {
            type: "flow",
            steps: ["Known possible outcomes", "Probabilities can be estimated", "Decisions can be planned for"],
            result: "This is risk — manageable with preparation",
            resultType: "neutral"
          },
          {
            type: "paragraph",
            text: "**Uncertainty** is different — you genuinely do not know what could happen, so you cannot assign probabilities. A global pandemic, a sudden change in government policy, or a breakthrough technology that makes your product obsolete are all uncertain events. You cannot plan for what you cannot foresee."
          },
          {
            type: "flow",
            steps: ["Unknown outcomes", "No way to estimate probability", "Cannot plan specifically"],
            result: "This is uncertainty — requires adaptability",
            resultType: "bad"
          },
          {
            type: "paragraph",
            text: "Entrepreneurs must be willing to take risks to start and grow a business. The reward for taking risk is **profit** — but the consequence of getting it wrong can be financial loss or business failure. Understanding the difference between risk and uncertainty helps you evaluate business decisions more accurately."
          }
        ],
        realExample: {
          emoji: "🦠",
          text: "**Pret A Manger** could manage the normal risk of fluctuating customer footfall using sales data and forecasts. However, the Covid-19 pandemic was genuine uncertainty — no one could have predicted that city-centre foot traffic would drop by 90% almost overnight, wiping out Pret's core revenue model."
        },
        misconception: "Students use \"risk\" and \"uncertainty\" interchangeably, as if they mean the same thing. Risk involves measurable probabilities while uncertainty involves the completely unforeseeable — the distinction matters because businesses can insure against risk but not against true uncertainty. Instead write: risk can be estimated and managed; uncertainty cannot be predicted or planned for.",
        examMatters: "Examiners specifically test whether you can distinguish risk from uncertainty. When analysing a business decision, state clearly which elements are risks (quantifiable) and which are uncertainties (unpredictable), and explain how each affects the decision."
      }
    ],
    takeaway: [
      "Competition forces businesses to innovate, lower prices and improve quality.",
      "Risk involves known probabilities; uncertainty involves the completely unknown.",
      "Entrepreneurs accept risk in pursuit of profit — but uncertainty cannot be insured against."
    ]
  },

  /* ═══ Block 3: Market Research Methods ═══ */
  {
    title: "Market Research Methods",
    quizIndices: [2],
    practiceIndices: [1],
    sections: [
      {
        id: "primary-research",
        title: "Primary Research",
        keyIdea: "Gathering original data directly from your target market gives you up-to-date, specific insights — but it costs more and takes longer than using existing sources.",
        body: [
          {
            type: "paragraph",
            text: "**Primary research** (also called **field research**) involves collecting new data that does not already exist. You go directly to consumers or the market to gather original information. Common methods include **surveys/questionnaires**, **interviews**, **focus groups**, **observation** and **test marketing**."
          },
          {
            type: "subheading",
            text: "Common Methods"
          },
          {
            type: "bullets",
            items: [
              "**Surveys/Questionnaires** — structured questions sent to a sample; cheap to run at scale but may suffer from low response rates.",
              "**Interviews** — in-depth, face-to-face conversations that reveal detailed insights but are time-consuming and expensive.",
              "**Focus groups** — small group discussions exploring attitudes and opinions; useful for testing new ideas but can be influenced by dominant personalities.",
              "**Observation** — watching how consumers behave in real settings; avoids survey bias but does not explain *why* they behave that way."
            ]
          },
          {
            type: "paragraph",
            text: "The key advantage of primary research is that it is **specific to your needs** — you design the questions, choose the sample, and get data no competitor has. The downside is that it is typically **more expensive and time-consuming** than secondary research."
          }
        ],
        realExample: {
          emoji: "🍔",
          text: "**McDonald's** uses primary research extensively before launching new menu items — running focus groups and in-store test marketing in selected regions. The McPlant burger was trialled in specific UK locations before a national rollout, allowing McDonald's to gauge demand and refine the product using real customer feedback."
        },
        misconception: "Students say \"primary research is always better than secondary research because it is original.\" That ignores the cost and time involved — a small start-up with a limited budget may get more value from free secondary data. Instead write: primary research provides tailored, up-to-date data but is more costly, so businesses often use a mix of both.",
        examMatters: "When asked to recommend a research method, examiners want you to justify your choice by linking it to the business context — consider the firm's budget, time available, and the type of information needed. Never just describe the method; explain why it fits."
      },
      {
        id: "secondary-research",
        title: "Secondary Research",
        keyIdea: "Using data that someone else has already collected is cheaper and faster, but it may not fit your specific question or be fully up to date.",
        body: [
          {
            type: "paragraph",
            text: "**Secondary research** (also called **desk research**) involves using data that has already been collected by someone else for a different purpose. Sources include **government statistics** (ONS data), **market research reports** (Mintel, Euromonitor), **trade publications**, **competitor websites**, **newspaper articles** and **academic journals**."
          },
          {
            type: "flow",
            steps: ["Identify existing data sources", "Analyse data for your purpose"],
            result: "Quick and low-cost market insights",
            resultType: "good"
          },
          {
            type: "paragraph",
            text: "The main advantages of secondary research are **cost** and **speed** — much of it is free or inexpensive, and you can access it immediately. It also provides a good overview of the market before you invest in more expensive primary research."
          },
          {
            type: "paragraph",
            text: "However, secondary data was collected for a different purpose, so it may not answer your specific question. It may also be **outdated**, **biased** by the original researcher's agenda, or **available to your competitors** — giving you no competitive edge."
          }
        ],
        realExample: {
          emoji: "📊",
          text: "**Innocent Drinks** used Mintel market reports on the UK smoothie market before launching new product lines. This secondary data gave them a quick picture of market size, growth trends and competitor positioning without the cost of commissioning their own large-scale survey."
        },
        misconception: "Students claim \"secondary research is unreliable because you did not collect it yourself.\" That overstates the problem — government statistics and professional market reports are often highly reliable. Instead write: secondary data can be very reliable depending on the source, but it may not be specific to your business needs or fully current.",
        examMatters: "In a research methods question, examiners reward you for evaluating the source of secondary data — is it from the ONS (reliable, large sample) or a random blog (potentially biased)? Always consider the credibility and relevance of the source."
      },
      {
        id: "qualitative-vs-quantitative",
        title: "Qualitative vs Quantitative",
        keyIdea: "Quantitative research counts and measures, giving you hard numbers; qualitative research explores attitudes and feelings, giving you depth and understanding.",
        body: [
          {
            type: "paragraph",
            text: "**Quantitative data** is numerical — it can be measured, counted and analysed statistically. Examples include sales figures, market share percentages, and survey results with closed questions. It is useful for identifying patterns, making comparisons and spotting trends."
          },
          {
            type: "paragraph",
            text: "**Qualitative data** is non-numerical — it deals with opinions, feelings, motivations and attitudes. You gather it through open-ended interviews, focus groups and observation. It helps you understand *why* customers behave the way they do, not just *what* they do."
          },
          {
            type: "subheading",
            text: "Key Differences"
          },
          {
            type: "bullets",
            items: [
              "**Quantitative**: \"What percentage of customers prefer Product A?\" — easy to analyse but lacks depth.",
              "**Qualitative**: \"Why do customers prefer Product A?\" — rich insight but harder to generalise."
            ]
          },
          {
            type: "paragraph",
            text: "In practice, you will find that most businesses use a combination of both. Quantitative data tells you the scale of the opportunity; qualitative data tells you how to exploit it."
          }
        ],
        realExample: {
          emoji: "🎧",
          text: "**Spotify** uses quantitative data — streaming counts, skip rates and playlist additions — to identify trending songs. It combines this with qualitative research from user feedback sessions to understand *why* listeners engage with certain playlists, shaping features like Discover Weekly."
        },
        misconception: "Students write \"qualitative data is less useful because it cannot be put into graphs.\" That misses the point — qualitative data reveals the motivations behind consumer behaviour, which numbers alone cannot capture. Instead write: qualitative data provides depth of understanding that complements the statistical patterns found in quantitative data.",
        examMatters: "When asked about market research, examiners expect you to distinguish between qualitative and quantitative data and explain which is more appropriate for the given context. A product launch might need qualitative insight into consumer attitudes; a pricing decision might need quantitative sales data."
      }
    ],
    takeaway: [
      "Primary research is tailored and current but costly; secondary is cheap but may not fit.",
      "Quantitative data measures; qualitative data explains motivations.",
      "Good businesses combine both research types and both data types for a full picture."
    ]
  },

  /* ═══ Block 4: Sampling Methods ═══ */
  {
    title: "Sampling Methods",
    quizIndices: [3],
    sections: [
      {
        id: "types-of-sampling",
        title: "Types of Sampling",
        keyIdea: "Because you cannot survey every potential customer, you select a sample — and the method you choose determines how representative your findings will be.",
        body: [
          {
            type: "paragraph",
            text: "**Sampling** means selecting a small group of people from a larger **population** to represent the whole. You use sampling because surveying every potential customer would be impossibly expensive and time-consuming. The goal is to choose a sample that accurately reflects the views and characteristics of the target market."
          },
          {
            type: "subheading",
            text: "Main Sampling Methods"
          },
          {
            type: "bullets",
            items: [
              "**Random sampling** — every member of the population has an equal chance of being selected. Removes selection bias but can be impractical if you have no complete list of the population.",
              "**Stratified sampling** — the population is divided into subgroups (strata) by a shared characteristic (age, income, region), then a random sample is taken from each. More representative but more complex to organise.",
              "**Quota sampling** — the researcher sets a target number of respondents from each subgroup and fills the quota using whoever is available. Quicker and cheaper but introduces researcher bias in who gets chosen.",
              "**Convenience sampling** — you survey whoever is easiest to reach (e.g. people walking past your shop). Fast and cheap but the least representative method."
            ]
          },
          {
            type: "paragraph",
            text: "The method you choose depends on your **budget**, the **time available**, and how important it is that your results are statistically representative. A large firm launching a national product will use stratified or random sampling; a sole trader testing a local idea might use convenience sampling."
          }
        ],
        realExample: {
          emoji: "📺",
          text: "**BARB** (Broadcasters' Audience Research Board) uses stratified sampling to measure UK TV audiences. The panel of 5,300 homes is carefully selected to represent the UK population by age, region, social class and household size, ensuring viewing figures are statistically reliable."
        },
        misconception: "Students say \"random sampling is always the best method because it is unbiased.\" While random sampling does remove selection bias, it requires a complete list of the population and can be very expensive to administer. Instead write: random sampling is theoretically ideal but practically difficult, so businesses choose the method that best balances accuracy with cost and time.",
        examMatters: "Examiners often describe a business scenario and ask you to recommend or evaluate a sampling method. Always link your answer to the context — consider the budget, the target population, the time available, and the level of accuracy the business needs."
      },
      {
        id: "sample-size-and-bias",
        title: "Sample Size and Bias",
        keyIdea: "A larger sample gives more reliable results, but every sample carries the risk of bias that can make your conclusions misleading.",
        body: [
          {
            type: "paragraph",
            text: "**Sample size** is the number of respondents in your research. A larger sample generally produces more reliable and representative results because it reduces the impact of individual anomalies. However, larger samples cost more and take longer to collect and analyse."
          },
          {
            type: "flow",
            steps: ["Small or biased sample", "Unrepresentative data collected", "Flawed business decisions made"],
            result: "Wasted investment or missed opportunities",
            resultType: "bad"
          },
          {
            type: "paragraph",
            text: "**Bias** in sampling means your sample does not accurately reflect the target population. This can happen if you only survey people from one area, one age group, or one income level. It can also occur through **response bias** — where the way you phrase a question leads respondents toward a particular answer."
          },
          {
            type: "paragraph",
            text: "You should understand that even large samples can be biased if they are not properly selected. A survey of 10,000 people is useless if all respondents come from the same demographic and your product is aimed at a broader market."
          }
        ],
        realExample: {
          emoji: "📰",
          text: "**The Literary Digest** conducted a poll of 2.4 million people in 1936 to predict the US presidential election and got it spectacularly wrong. The sample was drawn from telephone directories and car registrations, systematically excluding poorer voters who overwhelmingly supported Roosevelt."
        },
        misconception: "Students assume \"the bigger the sample, the better the research.\" Size alone does not guarantee quality — a biased sample of 10,000 people is less useful than an unbiased sample of 500. Instead write: sample quality depends on both size and how representative the selection method is.",
        examMatters: "When evaluating market research findings, examiners expect you to question the sample — how large was it, how was it selected, and could there be any bias? Stating \"the sample may be biased\" without explaining how or why will not earn evaluation marks."
      }
    ],
    takeaway: [
      "Sampling lets you research a market without surveying the entire population.",
      "Random and stratified sampling reduce bias; quota and convenience are cheaper but riskier.",
      "A large sample is not automatically reliable — selection method matters as much as size."
    ]
  },

  /* ═══ Block 5: Market Positioning and Orientation ═══ */
  {
    title: "Market Positioning and Orientation",
    quizIndices: [4],
    practiceIndices: [2],
    sections: [
      {
        id: "product-vs-market-orientation",
        title: "Product vs Market Orientation",
        keyIdea: "A product-oriented business builds what it thinks is best and hopes customers agree; a market-oriented business researches what customers want and builds that.",
        body: [
          {
            type: "paragraph",
            text: "A **product-oriented** business focuses on making the best possible product based on its own expertise and innovation, then tries to sell it. The assumption is that a superior product will sell itself. This approach works well in industries driven by **technology and innovation**, where the firm knows more about what is possible than the customer does."
          },
          {
            type: "flow",
            steps: ["Design the best product", "Manufacture it", "Find customers who want it"],
            result: "Works if the product is genuinely innovative",
            resultType: "neutral"
          },
          {
            type: "paragraph",
            text: "A **market-oriented** business starts by researching what customers want and then designs products to meet those needs. Most successful consumer businesses today are market-oriented — they use market research to identify gaps, test ideas, and continuously adapt to changing customer preferences."
          },
          {
            type: "flow",
            steps: ["Research customer needs", "Design product to match", "Launch with confidence"],
            result: "Higher chance of meeting demand and generating sales",
            resultType: "good"
          },
          {
            type: "paragraph",
            text: "In reality, many firms blend both approaches. You might use market research to identify a need, then apply product expertise to create a solution customers did not even know they wanted."
          }
        ],
        realExample: {
          emoji: "🍏",
          text: "**Apple** is often cited as product-oriented — Steve Jobs famously said customers do not know what they want until you show them. However, Apple also invests heavily in understanding user experience and behaviour, making it a blend of both orientations that produces innovative products people actually want to buy."
        },
        misconception: "Students write \"product orientation is outdated and market orientation is always better.\" That is too simplistic — pharmaceutical companies and tech innovators often succeed with product orientation because they develop solutions customers could not articulate. Instead write: the best orientation depends on the industry, the nature of innovation, and how well customers understand their own needs.",
        examMatters: "Examiners reward you for recognising that orientation is not binary — most real businesses combine elements of both. When asked to evaluate, consider whether the market is technology-driven (favouring product orientation) or consumer-driven (favouring market orientation)."
      },
      {
        id: "market-mapping",
        title: "Market Mapping",
        keyIdea: "Plotting competitors on a two-axis grid reveals gaps in the market — positions where customer needs exist but no business currently serves them.",
        body: [
          {
            type: "paragraph",
            text: "**Market mapping** (also called **perceptual mapping** or **positioning mapping**) is a tool that plots existing products or businesses on a grid with two axes, each representing a key variable. Common axes include price (low to high), quality (low to high), age of target customer (young to old), and style (traditional to modern)."
          },
          {
            type: "paragraph",
            text: "The purpose is to visualise where competitors are positioned and to identify **gaps in the market** — areas on the map where no firm currently operates. A gap suggests an opportunity, but you need to check whether there is actual **demand** in that space. A gap with no demand is just an empty space, not a business opportunity."
          },
          {
            type: "flow",
            steps: ["Choose two key variables", "Plot competitors on grid", "Identify gaps"],
            result: "Potential positioning opportunities revealed",
            resultType: "good"
          },
          {
            type: "paragraph",
            text: "Market maps are useful for strategic planning and new product development. However, they are limited because they only show two variables at a time, and consumer perceptions can change rapidly in dynamic markets."
          }
        ],
        realExample: {
          emoji: "👟",
          text: "**Under Armour** used market mapping to identify a gap between high-performance athletic wear (Nike, Adidas) and basic sportswear (supermarket brands). By positioning itself as performance-focused but more accessible than premium brands, Under Armour grew from a start-up to a $5 billion company."
        },
        misconception: "Students assume \"a gap in the market map means a guaranteed business opportunity.\" A gap only shows that no competitor occupies that position — it does not prove that customers actually want a product there. Instead write: a gap in the market is only a genuine opportunity if there is sufficient customer demand for a product in that position.",
        examMatters: "Market mapping questions often provide a diagram and ask you to suggest where a new business should position itself. Always justify your recommended position by linking it to the target market's needs, not just to where the gap is. Examiners penalise answers that ignore demand."
      }
    ],
    takeaway: [
      "Product orientation starts with the product; market orientation starts with the customer.",
      "Market mapping plots competitors on two axes to reveal gaps in the market.",
      "A gap in the market is only an opportunity if there is genuine customer demand there.",
      "Most successful firms blend product and market orientation rather than choosing one."
    ]
  },

  /* ═══ Block 6: Segmentation and Competitive Advantage ═══ */
  {
    title: "Segmentation and Competitive Advantage",
    sections: [
      {
        id: "market-segmentation",
        title: "Market Segmentation",
        keyIdea: "Dividing a market into distinct groups of customers who share similar characteristics lets you tailor your product and marketing to each group.",
        body: [
          {
            type: "paragraph",
            text: "**Market segmentation** is the process of dividing a broad market into smaller subgroups of consumers who have common needs, characteristics or behaviours. Instead of treating all customers the same, segmentation allows you to target specific groups with tailored products, pricing and marketing messages."
          },
          {
            type: "subheading",
            text: "Common Bases for Segmentation"
          },
          {
            type: "bullets",
            items: [
              "**Demographic** — age, gender, income, occupation, family size.",
              "**Geographic** — country, region, urban vs rural, climate.",
              "**Psychographic** — lifestyle, values, personality, attitudes.",
              "**Behavioural** — purchase frequency, brand loyalty, usage occasion, benefits sought."
            ]
          },
          {
            type: "paragraph",
            text: "Segmentation is valuable because it lets you focus your resources on the customers most likely to buy your product. It improves marketing efficiency, supports premium pricing for targeted products, and helps you spot underserved groups."
          },
          {
            type: "paragraph",
            text: "However, segmentation has limitations. Over-segmenting a market can lead to very small, unprofitable groups. It also relies on the accuracy of your market research — if your segments are poorly defined, your targeting will miss the mark."
          }
        ],
        realExample: {
          emoji: "🏨",
          text: "**Marriott International** operates over 30 hotel brands segmented by customer type — Ritz-Carlton for luxury travellers, Courtyard for business travellers, and Moxy for budget-conscious younger guests. This segmentation allows Marriott to serve vastly different customer needs under one corporate umbrella."
        },
        misconception: "Students write \"segmentation means choosing one group and ignoring everyone else.\" That confuses segmentation with targeting — segmentation divides the market into groups, and the business then decides which segment(s) to target. Instead write: segmentation identifies distinct customer groups; targeting is the decision about which of those groups to serve.",
        examMatters: "Examiners want you to identify the most appropriate segmentation variable for the business in the case study. Do not just list all four bases — pick the one most relevant to the context and explain why it helps the business make better marketing decisions."
      },
      {
        id: "competitive-advantage",
        title: "Competitive Advantage",
        keyIdea: "A competitive advantage is something your business does better or differently than rivals that customers value enough to choose you over them.",
        body: [
          {
            type: "paragraph",
            text: "**Competitive advantage** is a condition that allows a business to outperform its rivals. It is the reason customers choose you over the competition. You can achieve it through **lower costs** (allowing you to undercut on price), **differentiation** (offering something unique that customers value), or a combination of both."
          },
          {
            type: "flow",
            steps: ["Identify what customers value", "Do it better than competitors", "Sustain the advantage over time"],
            result: "Higher sales, market share and profitability",
            resultType: "good"
          },
          {
            type: "paragraph",
            text: "A competitive advantage must be **sustainable** — if competitors can easily copy what you do, the advantage disappears quickly. Strong brands, patents, exclusive supplier relationships and proprietary technology are all harder for rivals to replicate."
          },
          {
            type: "paragraph",
            text: "You should recognise that competitive advantage is not permanent. Markets change, competitors innovate, and customer preferences shift. Businesses must continuously invest in maintaining their edge through innovation, quality improvement and strong customer relationships."
          }
        ],
        realExample: {
          emoji: "📦",
          text: "**Amazon** built its competitive advantage on a combination of massive scale (low costs), fast delivery through its logistics network, and the convenience of one-click ordering. Competitors struggle to match all three simultaneously, giving Amazon a sustainable edge that has kept it dominant for over two decades."
        },
        misconception: "Students say \"being the cheapest is always a competitive advantage.\" Low price only works as an advantage if you can sustain it through genuinely lower costs — otherwise you are just sacrificing profit margins. Instead write: a competitive advantage based on cost requires genuine cost leadership through efficiency or scale, not simply accepting lower profits.",
        examMatters: "When asked about competitive advantage, examiners want you to identify the specific source of advantage and explain why it is sustainable. Generic answers like \"good marketing\" or \"quality products\" score poorly — be precise about what the business does differently and why rivals cannot easily copy it."
      },
      {
        id: "adding-value",
        title: "Adding Value",
        keyIdea: "Adding value means increasing the worth of a product beyond the cost of its inputs, so customers willingly pay more than it cost you to make.",
        body: [
          {
            type: "paragraph",
            text: "**Adding value** is the process of increasing the perceived worth of a product or service so that customers are willing to pay a price above the cost of the inputs. The difference between the selling price and the cost of bought-in materials and components is the **value added**."
          },
          {
            type: "flow",
            steps: ["Raw inputs cost X", "Business transforms and brands them", "Customer pays X + added value"],
            result: "Profit generated from the value added",
            resultType: "good"
          },
          {
            type: "subheading",
            text: "Ways to Add Value"
          },
          {
            type: "bullets",
            items: [
              "**Branding** — a strong brand allows you to charge a premium for a functionally similar product.",
              "**Design and features** — improving aesthetics, functionality or packaging.",
              "**Convenience** — making the product easier to buy, use or access.",
              "**Customer service** — providing exceptional before- and after-sales support.",
              "**Customisation** — tailoring products to individual customer preferences."
            ]
          },
          {
            type: "paragraph",
            text: "Adding value is essential for all businesses because it is the source of **profit**. Without it, you would sell goods at cost and earn nothing. The more value you add, the more flexibility you have on pricing and the stronger your competitive position."
          }
        ],
        realExample: {
          emoji: "☕",
          text: "**Starbucks** buys coffee beans for a few pence per cup but sells a latte for over three pounds. The value is added through branding, store ambience, barista service and the convenience of high-street locations — transforming a commodity into a premium experience customers pay significantly more for."
        },
        misconception: "Students confuse \"adding value\" with \"increasing price.\" Simply raising the price without improving the product is not adding value — it just makes you more expensive. Instead write: adding value means increasing the perceived worth to the customer through branding, design, service or convenience, which then justifies a higher price.",
        examMatters: "Adding value is a fundamental concept that connects to pricing, branding and competitiveness. When asked how a business adds value, give specific methods relevant to the case study context — do not just list generic methods. Explain how each method increases the customer's willingness to pay."
      }
    ],
    takeaway: [
      "Segmentation divides markets into groups; targeting decides which group(s) to serve.",
      "Competitive advantage must be sustainable — easy-to-copy advantages erode quickly.",
      "Adding value is the gap between input cost and selling price, driven by branding and service."
    ]
  }

];

/* ── 3. VALIDATION ──────────────────────────────────────────────────────────
   Run automatically before pushing. Catches common writing-rule violations.
   ─────────────────────────────────────────────────────────────────────────── */

function validate(content) {
  const errors = [];
  const ids = new Set();

  content.forEach((block, bi) => {
    const bLabel = `Block ${bi + 1} "${block.title}"`;

    if (!block.title) errors.push(`${bLabel}: missing title`);
    if (!Array.isArray(block.sections) || block.sections.length === 0)
      errors.push(`${bLabel}: sections[] must be a non-empty array`);
    if (!Array.isArray(block.takeaway) || block.takeaway.length < 3)
      errors.push(`${bLabel}: takeaway[] must have at least 3 items`);

    block.takeaway?.forEach((t, ti) => {
      if (t.length > 100) errors.push(`${bLabel} takeaway[${ti}]: ${t.length} chars (max 100)`);
    });

    block.sections?.forEach((sec, si) => {
      const sLabel = `${bLabel} > Section ${si + 1} "${sec.title}"`;

      if (!sec.id) errors.push(`${sLabel}: missing id`);
      if (ids.has(sec.id)) errors.push(`${sLabel}: duplicate id "${sec.id}"`);
      ids.add(sec.id);

      if (!sec.title) errors.push(`${sLabel}: missing title`);

      if (!sec.keyIdea) {
        errors.push(`${sLabel}: missing keyIdea`);
      } else {
        if (sec.keyIdea.length > 180)
          errors.push(`${sLabel}: keyIdea is ${sec.keyIdea.length} chars (max 180)`);
        if (sec.keyIdea.includes('**'))
          errors.push(`${sLabel}: keyIdea must not contain **bold** — it is rendered plain`);
      }

      if (!Array.isArray(sec.body) || sec.body.length === 0)
        errors.push(`${sLabel}: body[] must be a non-empty array`);

      sec.body?.forEach((b, bi2) => {
        if (!b.type) errors.push(`${sLabel} body[${bi2}]: missing type`);
        if (b.type === 'flow') {
          if (!Array.isArray(b.steps) || b.steps.length < 2)
            errors.push(`${sLabel} body[${bi2}]: flow needs at least 2 steps`);
          if (b.steps?.length > 4)
            errors.push(`${sLabel} body[${bi2}]: flow has ${b.steps.length} steps (max 4)`);
          if (!['good', 'bad', 'neutral'].includes(b.resultType))
            errors.push(`${sLabel} body[${bi2}]: flow resultType must be "good", "bad", or "neutral"`);
        }
      });

      if (!sec.realExample?.text)
        errors.push(`${sLabel}: missing realExample.text`);
      if (!sec.misconception)
        errors.push(`${sLabel}: missing misconception`);
      if (!sec.examMatters)
        errors.push(`${sLabel}: missing examMatters`);
    });
  });

  return errors;
}

/* ── 4. PUSH ─────────────────────────────────────────────────────────────── */

async function run() {
  console.log(`\nValidating content for "${SECTION_SLUG}"...`);
  const errors = validate(CONTENT);

  if (errors.length > 0) {
    console.error('\n❌ Validation failed — fix these before pushing:\n');
    errors.forEach(e => console.error(`  • ${e}`));
    process.exit(1);
  }
  console.log(`✓ Validation passed — ${CONTENT.length} blocks, ${CONTENT.reduce((n, b) => n + b.sections.length, 0)} sections\n`);

  // Find the section record (sections.id IS the slug)
  const { data: section, error: secErr } = await supabase
    .from('sections')
    .select('id')
    .eq('id', SECTION_SLUG)
    .single();

  if (secErr || !section) {
    console.error(`❌ Section "${SECTION_SLUG}" not found in ${SUBJECT_ID} sections table`);
    console.error(secErr?.message || '(no error detail)');
    process.exit(1);
  }

  // Update section_content
  const { error } = await supabase
    .from('section_content')
    .update({ data: CONTENT })
    .eq('section_id', section.id);

  if (error) {
    console.error('❌ Supabase error:', error.message);
    process.exit(1);
  }

  console.log(`✅ "${SECTION_SLUG}" updated successfully`);
  console.log(`   ${CONTENT.length} blocks · ${CONTENT.reduce((n, b) => n + b.sections.length, 0)} sections · ${CONTENT.reduce((n, b) => n + b.takeaway.length, 0)} takeaway items`);
}

run();
