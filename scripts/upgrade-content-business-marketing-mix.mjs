/**
 * SECTION UPGRADE — Marketing Mix & Strategy (Business 1.3)
 * ==========================================================
 * Edexcel IAL Business Unit 1, Marketing Mix & Strategy
 * Run with: node scripts/upgrade-content-business-marketing-mix.mjs
 */

import { supabase } from './_db.mjs';

/* ── 1. SETTINGS ──────────────────────────────────────────────────────────── */

const SECTION_SLUG = 'marketing-mix-strategy';
const SUBJECT_ID   = 'business';

/* ── 2. CONTENT ───────────────────────────────────────────────────────────── */

const CONTENT = [

  /* ═══ Block 1: Marketing Objectives, Strategy and Product Life Cycle ═══ */
  {
    title: "Marketing Objectives, Strategy and Product Life Cycle",
    quizIndices: [0],
    sections: [
      {
        id: "marketing-objectives",
        title: "Marketing Objectives",
        keyIdea: "Marketing objectives are specific, measurable targets for the marketing function that support the overall business aims — they give direction to every marketing decision.",
        body: [
          {
            type: "paragraph",
            text: "**Marketing objectives** are the specific goals that a business sets for its marketing activities. They provide a clear focus for decision-making and allow the business to measure whether its marketing is successful. Common marketing objectives include increasing **market share**, boosting **brand awareness**, entering **new markets**, and improving **customer loyalty**."
          },
          {
            type: "paragraph",
            text: "Effective marketing objectives should be **SMART** — Specific, Measurable, Achievable, Relevant, and Time-bound. Saying \"we want to grow\" is not a marketing objective. Saying \"we aim to increase UK market share from 12% to 15% within two years\" is a proper, actionable objective."
          },
          {
            type: "flow",
            steps: ["Set SMART marketing objectives", "Design marketing strategy to deliver them", "Measure performance against targets"],
            result: "Clear direction and accountability for the marketing team",
            resultType: "good"
          },
          {
            type: "paragraph",
            text: "Marketing objectives must align with the broader **corporate objectives**. If the business aim is to maximise short-term profit, the marketing team might focus on premium pricing. If the aim is growth, marketing might prioritise customer acquisition and market penetration."
          }
        ],
        realExample: {
          emoji: "🏃",
          text: "**Nike** set a marketing objective to grow its direct-to-consumer (DTC) sales to 60% of total revenue by 2025, reducing reliance on third-party retailers. This specific, measurable target drove Nike's investment in its app, website, and own-brand stores, reshaping its entire distribution strategy."
        },
        misconception: "Students write vague objectives like \"increase sales\" without making them measurable or time-bound. An objective without a number and a deadline is just a wish. Instead write: marketing objectives must include a specific target figure and timeframe to be genuinely useful for planning and evaluation.",
        examMatters: "When asked to suggest marketing objectives, examiners reward SMART objectives linked to the business context. Always connect your suggested objective to the company's current situation — a start-up needs awareness, an established firm might need loyalty or market share.",
        recall: {
          type: "fillin",
          prompt: "Complete the marketing objectives logic:",
          template: ["Marketing objectives must be ___ — specific, measurable and time-bound", "They must align with the broader ___ objectives", "Common objectives include market share, brand ___ and customer loyalty"],
          answers: ["SMART", "corporate", "awareness"],
          hints: ["SM___", "cor______", "awa______"]
        }
      },
      {
        id: "product-life-cycle",
        title: "Product Life Cycle",
        keyIdea: "Every product passes through introduction, growth, maturity and decline — each stage demands a different marketing approach to maximise revenue.",
        body: [
          {
            type: "paragraph",
            text: "The **product life cycle (PLC)** is a model that describes the stages a product goes through from its launch to its eventual withdrawal from the market. The four main stages are **introduction**, **growth**, **maturity**, and **decline**. Each stage has different implications for sales revenue, profit, and the marketing strategy required."
          },
          {
            type: "subheading",
            text: "Stages of the PLC"
          },
          {
            type: "bullets",
            items: [
              "**Introduction**: sales are low, costs are high (R&D, promotion), and profits are typically negative. The focus is on building awareness.",
              "**Growth**: sales rise rapidly, unit costs fall through economies of scale, and the product starts to generate profit. Competitors begin to enter.",
              "**Maturity**: sales peak and then plateau, competition is intense, and the focus shifts to defending market share through differentiation.",
              "**Decline**: sales fall as the product becomes outdated or consumer tastes shift. The business must decide whether to withdraw, relaunch, or extend."
            ]
          },
          {
            type: "paragraph",
            text: "Businesses use **extension strategies** to prolong the maturity phase and delay decline. These include updating the product, finding new markets, rebranding, or changing the promotional strategy. A successful extension strategy resets the cycle from the maturity stage."
          }
        ],
        realExample: {
          emoji: "🧴",
          text: "**Lucozade** was originally sold as a hospital drink for sick patients (introduction/growth in the 1920s-1970s). Facing decline, it was relaunched in the 1980s as an energy sports drink with celebrity endorsements — a classic extension strategy that took the product from decline back into growth and maturity."
        },
        misconception: "Students assume every product follows the PLC neatly in a predictable pattern. In reality, some products skip stages, some stay in maturity for decades, and extension strategies can restart the cycle. Instead write: the PLC is a useful framework but not a rigid prediction — the length of each stage varies and can be influenced by marketing decisions.",
        examMatters: "When asked to identify a product's PLC stage, use evidence from the case study such as sales trends, profit data, and competitive conditions. Examiners penalise guesses — always justify your classification with specific evidence from the scenario.",
        recall: {
          type: "reorder",
          prompt: "Order the product life cycle stages:",
          correctOrder: ["Introduction — low sales, high costs, building awareness", "Growth — sales rise rapidly, profits begin", "Maturity — sales peak, intense competition", "Decline — sales fall, product may be withdrawn"],
          shuffled: [2, 0, 3, 1]
        }
      },
      {
        id: "boston-matrix",
        title: "Boston Matrix",
        keyIdea: "The Boston Matrix classifies products by market share and market growth, helping businesses decide where to invest, maintain, or withdraw resources.",
        body: [
          {
            type: "paragraph",
            text: "The **Boston Matrix** (also called the BCG Matrix) is a portfolio analysis tool that plots a business's products on a grid with two axes: **market share** (high or low) on the horizontal axis and **market growth** (high or low) on the vertical axis. This creates four quadrants, each suggesting a different strategic approach."
          },
          {
            type: "subheading",
            text: "The Four Quadrants"
          },
          {
            type: "bullets",
            items: [
              "**Stars** (high share, high growth): market leaders in growing markets. They generate strong revenue but require heavy investment to maintain their position.",
              "**Cash Cows** (high share, low growth): established products in mature markets. They generate surplus cash with little investment, funding other products.",
              "**Question Marks** (low share, high growth): products with potential but uncertain futures. They need significant investment to become stars or should be divested.",
              "**Dogs** (low share, low growth): weak products in stagnant markets. They generate little cash and may be candidates for divestment."
            ]
          },
          {
            type: "paragraph",
            text: "The matrix helps businesses manage their **product portfolio** — using cash from Cash Cows to invest in Stars and promising Question Marks, while considering whether to divest Dogs. A balanced portfolio contains products across multiple quadrants."
          }
        ],
        realExample: {
          emoji: "🍫",
          text: "**Cadbury** (Mondelez) uses its Cash Cow products like Dairy Milk to fund investment in new product lines. Dairy Milk has dominant market share in a stable confectionery market, generating consistent cash flow that finances innovation and marketing for newer products like Cadbury Plant Bar."
        },
        misconception: "Students assume Dogs should always be eliminated immediately. Some Dogs serve a strategic purpose — they may complete a product range, occupy shelf space competitors cannot use, or serve loyal niche customers. Instead write: Dogs should be evaluated individually — divestment is one option, but some Dogs are worth keeping for strategic reasons.",
        examMatters: "When using the Boston Matrix, examiners expect you to classify specific products with justification and recommend a strategy for each. Avoid simply describing the four quadrants — apply them to the business in the question and evaluate the limitations of the model.",
        recall: {
          type: "fillin",
          prompt: "Complete the Boston Matrix logic:",
          template: ["Stars have high market share and high market ___", "Cash Cows fund investment in other ___", "The matrix plots market ___ against market growth"],
          answers: ["growth", "products", "share"],
          hints: ["gro___", "pro_____", "sh___"]
        }
      }
    ],
    takeaway: [
      "Marketing objectives must be SMART and align with corporate aims.",
      "The PLC has four stages; extension strategies delay decline.",
      "The Boston Matrix guides investment across a product portfolio.",
      "Cash Cows fund Stars; Dogs may need divesting."
    ]
  },

  /* ═══ Block 2: Marketing Mix and Customer Loyalty ═══ */
  {
    title: "Marketing Mix and Customer Loyalty",
    quizIndices: [1],
    sections: [
      {
        id: "the-marketing-mix-4ps",
        title: "The Marketing Mix (4Ps)",
        keyIdea: "The marketing mix combines product, price, place and promotion into one coherent strategy — changing one element affects all the others.",
        body: [
          {
            type: "paragraph",
            text: "The **marketing mix** is the combination of four key elements — **Product, Price, Place, and Promotion** — that a business uses to market its goods or services. These are known as the **4Ps**. The effectiveness of a marketing strategy depends on how well these four elements work together as an integrated whole."
          },
          {
            type: "paragraph",
            text: "You cannot change one P in isolation without affecting the others. A premium product demands premium pricing, selective distribution, and aspirational promotion. If you set a low price for a luxury product, it confuses the brand message and undermines the entire strategy."
          },
          {
            type: "flow",
            steps: ["Design the product", "Set the right price", "Choose distribution channels", "Plan promotional activities"],
            result: "A coherent marketing mix that delivers the brand promise",
            resultType: "good"
          },
          {
            type: "paragraph",
            text: "The marketing mix must be tailored to the **target market**. A business selling to teenagers will use different pricing, channels and promotional methods than one selling to corporate clients. The mix should also evolve as the product moves through its life cycle."
          }
        ],
        realExample: {
          emoji: "☕",
          text: "**Starbucks** uses a tightly integrated marketing mix: a premium product (speciality coffee), premium pricing (above high-street competitors), selective place (branded stores in high-footfall locations), and aspirational promotion (social media, loyalty app). Changing any one element would disrupt the coherence of the whole strategy."
        },
        misconception: "Students describe the 4Ps in isolation as if they are independent decisions. The power of the marketing mix is that the four elements must be consistent with each other and with the target market. Instead write: the 4Ps must be integrated — a change in one element should trigger a review of the others to maintain a coherent strategy.",
        examMatters: "When evaluating a marketing mix, examiners want you to assess whether the 4Ps are consistent with each other and with the target market. Describing each P separately without linking them together will not earn top marks.",
        recall: {
          type: "fillin",
          prompt: "Complete the marketing mix logic:",
          template: ["The 4Ps are Product, Price, ___ and Promotion", "The mix must be tailored to the ___ market", "Changing one P affects all the ___"],
          answers: ["Place", "target", "others"],
          hints: ["Pl___", "tar___", "oth___"]
        }
      },
      {
        id: "b2b-vs-b2c",
        title: "B2B vs B2C",
        keyIdea: "Selling to businesses requires different marketing tactics than selling to consumers — purchase decisions are more rational, and relationships matter more.",
        body: [
          {
            type: "paragraph",
            text: "**B2C (business-to-consumer)** marketing targets individual consumers who buy products for personal use. Purchase decisions are often influenced by emotions, brand image, and impulse. Marketing tends to be broad, using mass media, social media, and in-store promotions to reach large audiences."
          },
          {
            type: "paragraph",
            text: "**B2B (business-to-business)** marketing targets other organisations that buy products for use in their own operations. Purchase decisions tend to be more **rational and evidence-based**, involving multiple decision-makers, longer sales cycles, and larger order values. Relationships, reliability, and after-sales service matter more than emotional branding."
          },
          {
            type: "flow",
            steps: ["B2B buyer identifies a need", "Evaluates multiple suppliers on spec and price", "Negotiates contract terms"],
            result: "Longer decision process focused on value and reliability",
            resultType: "neutral"
          },
          {
            type: "paragraph",
            text: "The marketing mix differs significantly between B2B and B2C. B2B promotion relies on trade shows, direct sales teams, and LinkedIn rather than TV adverts. Pricing is often negotiated rather than fixed. Distribution is direct rather than through retail channels."
          }
        ],
        realExample: {
          emoji: "💻",
          text: "**Microsoft** markets Office 365 very differently to consumers (B2C) and businesses (B2B). Consumer marketing uses TV adverts and app store promotions, while B2B marketing relies on direct sales teams, volume licensing negotiations, and case studies showing productivity gains for corporate clients."
        },
        misconception: "Students assume B2B marketing is just B2C on a larger scale. The buying process, decision criteria, and relationship dynamics are fundamentally different. Instead write: B2B marketing prioritises rational decision-making, long-term relationships, and technical specifications over the emotional appeals and mass advertising used in B2C.",
        examMatters: "Questions may ask you to advise on a marketing strategy and will specify whether the business sells B2B or B2C. Tailor your recommendations to the correct context — suggesting a TV campaign for a B2B manufacturer shows a lack of understanding.",
        recall: {
          type: "reorder",
          prompt: "Order these B2B purchase stages from start to finish:",
          correctOrder: ["Business identifies an operational need", "Researches and evaluates potential suppliers", "Requests proposals and negotiates terms", "Places order and builds ongoing relationship"],
          shuffled: [3, 1, 0, 2]
        }
      },
      {
        id: "customer-loyalty",
        title: "Customer Loyalty",
        keyIdea: "Loyal customers buy repeatedly, recommend your brand and cost less to retain than acquiring new ones — building loyalty is one of marketing's highest-value goals.",
        body: [
          {
            type: "paragraph",
            text: "**Customer loyalty** means that consumers repeatedly choose your brand over competitors, often regardless of price differences. Loyal customers are extremely valuable — they provide a **predictable revenue stream**, they are cheaper to serve than new customers (no acquisition costs), and they often act as brand advocates, recommending you to others."
          },
          {
            type: "paragraph",
            text: "Businesses build loyalty through consistent **product quality**, excellent **customer service**, personalised experiences, and **loyalty programmes** such as reward points or membership benefits. The goal is to make switching to a competitor feel difficult or unattractive."
          },
          {
            type: "flow",
            steps: ["Deliver consistent quality", "Reward repeat purchases", "Build emotional connection with brand"],
            result: "High customer lifetime value and lower marketing costs",
            resultType: "good"
          },
          {
            type: "paragraph",
            text: "However, loyalty can be fragile. A single bad experience, a competitor's superior offer, or a change in consumer values can break loyalty quickly. Businesses must continuously invest in maintaining the relationship, not assume loyalty is permanent."
          }
        ],
        realExample: {
          emoji: "🛒",
          text: "**Tesco Clubcard** is one of the UK's most successful loyalty programmes, with over 20 million active users. The data collected through Clubcard allows Tesco to personalise offers and promotions, increasing basket size and visit frequency while making customers feel rewarded for their loyalty."
        },
        misconception: "Students assume loyalty programmes alone create loyalty. Points and discounts help, but true loyalty comes from consistently meeting or exceeding customer expectations on product and service quality. Instead write: loyalty programmes incentivise repeat purchases, but lasting loyalty depends on delivering genuine value through product quality and customer experience.",
        examMatters: "Examiners often ask you to evaluate methods of building customer loyalty. Always consider the cost of the loyalty strategy versus the long-term value of retained customers. A strong answer will compare the cost of retention with the cost of acquisition.",
        recall: {
          type: "fillin",
          prompt: "Complete the customer loyalty logic:",
          template: ["Loyal customers provide a predictable ___ stream", "It costs less to ___ customers than to acquire new ones", "Loyalty can be built through quality, service and ___ programmes"],
          answers: ["revenue", "retain", "loyalty"],
          hints: ["rev____", "ret___", "loy_____"]
        }
      }
    ],
    takeaway: [
      "The 4Ps must be integrated and consistent with the target market.",
      "B2B marketing is rational and relationship-driven; B2C is emotive.",
      "Customer loyalty reduces costs and generates advocacy.",
      "Loyalty depends on consistent quality, not just reward schemes."
    ]
  },

  /* ═══ Block 3: Product/Service Design ═══ */
  {
    title: "Product/Service Design",
    quizIndices: [2],
    sections: [
      {
        id: "the-design-mix",
        title: "The Design Mix",
        keyIdea: "Great product design balances three elements — function, aesthetics and cost — and the weight given to each depends on the target market.",
        body: [
          {
            type: "paragraph",
            text: "The **design mix** refers to the three key elements of product design: **function** (how well it works), **aesthetics** (how it looks and feels), and **cost** (how economically it can be manufactured). Every product represents a balance between these three elements, and the ideal balance depends on the target market."
          },
          {
            type: "paragraph",
            text: "A **luxury product** prioritises aesthetics and function over cost — customers will pay a premium for beautiful, high-performance design. A **budget product** prioritises cost efficiency — the design must be functional but manufacturing costs are kept as low as possible to allow competitive pricing."
          },
          {
            type: "flow",
            steps: ["Identify target market needs", "Balance function, aesthetics and cost", "Design product to deliver value"],
            result: "Product that matches customer expectations and business margins",
            resultType: "good"
          },
          {
            type: "paragraph",
            text: "You should understand that the design mix is not fixed — it can be adjusted over time. As a product matures and competition increases, businesses often shift focus toward cost reduction to protect margins, while in the introduction phase, aesthetics and function may matter more to differentiate."
          }
        ],
        realExample: {
          emoji: "🪑",
          text: "**IKEA** prioritises cost in its design mix, using flat-pack construction and efficient materials to keep manufacturing expenses low. However, IKEA does not ignore aesthetics — its Scandinavian design style makes products visually appealing at a budget price, demonstrating that the design mix is a balance, not a trade-off."
        },
        misconception: "Students treat the design mix as three separate decisions rather than an integrated balance. You cannot maximise all three simultaneously — improving aesthetics or function usually increases cost. Instead write: the design mix requires trade-offs, and the optimal balance depends on the target market's priorities and willingness to pay.",
        examMatters: "When analysing a product's design, examiners want you to assess how well the design mix matches the target market. A luxury brand that cuts costs too aggressively risks damaging its brand positioning. Always link design decisions to market expectations.",
        recall: {
          type: "fillin",
          prompt: "Complete the design mix logic:",
          template: ["The design mix balances function, ___ and cost", "Luxury products prioritise aesthetics and function over ___", "The ideal balance depends on the ___ market"],
          answers: ["aesthetics", "cost", "target"],
          hints: ["aes______", "co__", "tar___"]
        }
      },
      {
        id: "social-trends-ethical-sourcing",
        title: "Social Trends and Ethical Sourcing",
        keyIdea: "Modern consumers increasingly demand that products are designed sustainably and sourced ethically — ignoring this trend risks brand damage and lost sales.",
        body: [
          {
            type: "paragraph",
            text: "**Social trends** — particularly the growing concern for **sustainability** and **ethical business practices** — are reshaping how products are designed. Consumers, especially younger demographics, increasingly choose brands that demonstrate environmental responsibility, fair labour practices, and transparent supply chains."
          },
          {
            type: "paragraph",
            text: "**Ethical sourcing** means ensuring that the materials and components used in a product are obtained responsibly — without exploitation of workers, environmental destruction, or unfair trade practices. Businesses that adopt ethical sourcing often use certifications like **Fairtrade**, **Rainforest Alliance**, or **B Corp** to signal their commitment."
          },
          {
            type: "flow",
            steps: ["Consumer demand for ethical products rises", "Business adopts sustainable design and sourcing", "Higher short-term costs but stronger brand loyalty"],
            result: "Long-term competitive advantage through reputation and trust",
            resultType: "good"
          },
          {
            type: "paragraph",
            text: "However, there is a tension between ethical design and cost. Sustainable materials and fair wages increase production costs, which must either be absorbed by the business (reducing margins) or passed on to consumers (potentially reducing demand). You should evaluate this trade-off in exam answers."
          }
        ],
        realExample: {
          emoji: "👕",
          text: "**Patagonia** built its entire brand around ethical sourcing and sustainable design, using recycled materials and donating 1% of sales to environmental causes. Despite higher prices, Patagonia's revenue exceeded $1.5 billion in 2022, proving that consumers will pay a premium for brands that align with their values."
        },
        misconception: "Students claim ethical sourcing always reduces profits because of higher costs. While costs may rise, ethical brands often achieve premium pricing, stronger loyalty, and reduced risk of reputational damage. Instead write: ethical sourcing increases costs but can improve revenue through premium pricing and customer loyalty, so the net effect on profit depends on the market context.",
        examMatters: "Questions on social trends expect you to evaluate both the benefits and costs of ethical design. A balanced answer considers the marketing advantage of ethical sourcing alongside the cost pressures it creates, reaching a judgement about whether the trade-off is worthwhile for the specific business.",
        recall: {
          type: "reorder",
          prompt: "Order these from cause to business effect:",
          correctOrder: ["Consumer values shift toward sustainability", "Business adopts ethical sourcing and sustainable design", "Production costs rise but brand reputation strengthens", "Premium pricing and loyalty offset the higher costs"],
          shuffled: [2, 0, 3, 1]
        }
      }
    ],
    takeaway: [
      "The design mix balances function, aesthetics and cost.",
      "Luxury products weigh aesthetics; budget products weigh cost.",
      "Ethical sourcing raises costs but builds brand loyalty.",
      "Social trends toward sustainability are reshaping product design."
    ]
  },

  /* ═══ Block 4: Promotion and Branding ═══ */
  {
    title: "Promotion and Branding",
    quizIndices: [3],
    practiceIndices: [0],
    sections: [
      {
        id: "types-of-promotion",
        title: "Types of Promotion",
        keyIdea: "Promotion communicates your product's value to the target market — it splits into above-the-line mass media and below-the-line targeted methods.",
        body: [
          {
            type: "paragraph",
            text: "**Promotion** is the element of the marketing mix that involves communicating with potential customers to inform, persuade, or remind them about a product. It is divided into two broad categories: **above-the-line (ATL)** promotion, which uses mass media to reach large audiences, and **below-the-line (BTL)** promotion, which uses targeted, direct methods."
          },
          {
            type: "subheading",
            text: "Key Methods"
          },
          {
            type: "bullets",
            items: [
              "**ATL — Advertising**: TV, radio, cinema, newspapers, billboards. Reaches wide audiences but is expensive and hard to measure.",
              "**BTL — Sales promotion**: discounts, BOGOF, competitions, free samples. Boosts short-term sales but can damage brand perception if overused.",
              "**BTL — Direct marketing**: email campaigns, catalogues, targeted social media ads. Cost-effective and measurable, but can feel intrusive.",
              "**BTL — Personal selling**: face-to-face or phone-based sales. Highly persuasive for complex B2B products but expensive per customer reached."
            ]
          },
          {
            type: "paragraph",
            text: "The choice of promotional method depends on the **target audience**, the **budget**, the **product type**, and the **stage in the product life cycle**. A new product launch may need heavy ATL spending to build awareness, while a mature product might rely on BTL loyalty promotions."
          }
        ],
        realExample: {
          emoji: "📱",
          text: "**Apple** combines ATL promotion (sleek TV adverts, billboard campaigns) with BTL methods (in-store product demos, personalised email launches). The integrated approach builds mass awareness while also creating personal experiences that drive conversion at the point of sale."
        },
        misconception: "Students assume advertising is always the best promotional method because it reaches the most people. A massive TV campaign is pointless if your target market is a small B2B niche. Instead write: the most effective promotional method depends on the target audience, budget and product type — mass advertising suits B2C consumer goods but not all contexts.",
        examMatters: "When recommending a promotional strategy, examiners want you to justify your choice by linking it to the business context. Always consider the target market, budget constraints, and what stage the product is at in its life cycle. Generic answers score poorly.",
        recall: {
          type: "fillin",
          prompt: "Complete the promotion logic:",
          template: ["ATL promotion uses ___ media to reach large audiences", "BTL promotion uses targeted and ___ methods", "The choice depends on target audience, budget and product ___"],
          answers: ["mass", "direct", "type"],
          hints: ["ma__", "dir___", "ty__"]
        }
      },
      {
        id: "branding",
        title: "Branding",
        keyIdea: "A strong brand creates an identity that customers trust and prefer — it adds value by differentiating your product from identical competitors.",
        body: [
          {
            type: "paragraph",
            text: "A **brand** is a name, symbol, design, or combination of these that identifies a product and differentiates it from competitors. Branding goes far beyond a logo — it encompasses the **reputation**, **values**, and **emotional associations** that customers connect with a business."
          },
          {
            type: "paragraph",
            text: "Strong brands create enormous value. They allow businesses to charge **premium prices** because customers perceive branded products as superior, even when the physical product is similar to unbranded alternatives. Branding also builds **loyalty** — customers return to trusted brands rather than switching to competitors."
          },
          {
            type: "flow",
            steps: ["Build consistent brand identity", "Customers develop trust and recognition", "Brand loyalty reduces price sensitivity"],
            result: "Premium pricing power and repeat purchases",
            resultType: "good"
          },
          {
            type: "paragraph",
            text: "Businesses must **protect** their brand carefully. A product recall, a social media scandal, or poor customer service can damage brand reputation quickly. Rebuilding trust takes years, so brand management is a continuous, strategic priority."
          }
        ],
        realExample: {
          emoji: "👟",
          text: "**Nike's** swoosh logo is recognised by 97% of consumers globally and allows Nike to price trainers significantly above production cost. The brand's association with athletic excellence and aspiration lets Nike charge a premium — a pair of Nike Air Max costs far more than a functionally similar unbranded shoe."
        },
        misconception: "Students think branding is just about having a memorable logo. A logo is part of a brand, but the brand itself is the total experience and reputation — including quality, customer service, values and emotional connections. Instead write: branding is the entire perception customers hold about a business, not just its visual identity.",
        examMatters: "When discussing branding, examiners expect you to explain how a strong brand adds value and supports pricing power. Link branding to competitive advantage — explain how it reduces PED by making the product less substitutable in the customer's mind.",
        recall: {
          type: "reorder",
          prompt: "Order the branding value chain from investment to outcome:",
          correctOrder: ["Business invests in consistent brand identity", "Customers develop recognition and trust", "Brand loyalty reduces price sensitivity (lower PED)", "Business gains premium pricing power and market share"],
          shuffled: [3, 1, 0, 2]
        }
      },
      {
        id: "viral-marketing",
        title: "Viral Marketing",
        keyIdea: "Viral marketing relies on consumers sharing your message for free — it can deliver massive reach at low cost, but the outcome is unpredictable.",
        body: [
          {
            type: "paragraph",
            text: "**Viral marketing** is a promotional strategy that encourages consumers to share a marketing message with their own networks, creating exponential growth in exposure. It typically uses **social media**, **video content**, and **shareable digital formats** to spread rapidly. The key appeal is that the audience does the distribution work for free."
          },
          {
            type: "paragraph",
            text: "Successful viral campaigns are entertaining, emotional, or provocative enough that people feel compelled to share them. The cost per impression can be extremely low compared to traditional advertising because the business only pays to create the original content — distribution is organic."
          },
          {
            type: "flow",
            steps: ["Create highly shareable content", "Seed it on social media platforms", "Consumers share it across their networks"],
            result: "Massive reach at minimal distribution cost — but no guarantee of success",
            resultType: "neutral"
          },
          {
            type: "paragraph",
            text: "The major risk of viral marketing is that you cannot control the message once it spreads. A campaign might go viral for the wrong reasons, or the audience may remember the entertainment but not the product. Virality is inherently unpredictable."
          }
        ],
        realExample: {
          emoji: "🧊",
          text: "**The ALS Ice Bucket Challenge** in 2014 became one of the most successful viral campaigns ever, raising over $115 million for motor neurone disease research. Participants filmed themselves dumping ice water on their heads and nominated friends, creating a chain-reaction that spread globally through social media with zero paid distribution."
        },
        misconception: "Students assume any business can easily go viral by posting on social media. Virality cannot be manufactured on demand — it depends on timing, cultural relevance, and audience willingness to share. Instead write: viral marketing has enormous potential but is inherently unpredictable, so businesses should not rely on it as their sole promotional strategy.",
        examMatters: "When evaluating viral marketing, examiners want you to discuss both the low-cost potential and the unpredictability. A strong answer acknowledges that viral campaigns can deliver exceptional ROI but carry significant risk because the outcome cannot be controlled or guaranteed.",
        recall: {
          type: "fillin",
          prompt: "Complete the viral marketing logic:",
          template: ["Viral marketing relies on ___ sharing the message for free", "The cost per impression is very ___ compared to traditional ads", "The major risk is that the outcome is ___"],
          answers: ["consumers", "low", "unpredictable"],
          hints: ["con______", "lo_", "unp__________"]
        }
      }
    ],
    takeaway: [
      "ATL reaches mass audiences; BTL is targeted and measurable.",
      "Strong brands enable premium pricing and reduce PED.",
      "Viral marketing is low-cost but inherently unpredictable.",
      "Always match promotional methods to target market and budget."
    ]
  },

  /* ═══ Block 5: Pricing Strategies ═══ */
  {
    title: "Pricing Strategies",
    quizIndices: [4],
    practiceIndices: [1],
    sections: [
      {
        id: "key-pricing-methods",
        title: "Key Pricing Methods",
        keyIdea: "Each pricing method suits a different market situation — from skimming early adopters to penetrating with low prices to build market share fast.",
        body: [
          {
            type: "paragraph",
            text: "Businesses choose from several **pricing strategies**, each suited to different objectives and market conditions. The right strategy depends on factors including the product's position in its life cycle, the level of competition, and whether the goal is to maximise revenue, build market share, or establish a premium image."
          },
          {
            type: "subheading",
            text: "Main Pricing Strategies"
          },
          {
            type: "bullets",
            items: [
              "**Cost-plus pricing**: adding a fixed percentage markup to the cost of production. Simple and guarantees a profit on each unit, but ignores demand and competition.",
              "**Price skimming**: setting a high initial price for a new, innovative product, then lowering it over time. Maximises revenue from early adopters willing to pay a premium.",
              "**Penetration pricing**: setting a low initial price to attract customers and build market share quickly, then raising it once established. Effective in competitive markets.",
              "**Competitive pricing**: setting prices in line with or just below competitors. Common in markets with many similar products where price is a key differentiator."
            ]
          },
          {
            type: "paragraph",
            text: "You should also know about **predatory pricing** (pricing below cost to drive competitors out, which is illegal in many jurisdictions) and **psychological pricing** (setting prices at levels like 9.99 rather than 10.00 to influence perception)."
          }
        ],
        realExample: {
          emoji: "📱",
          text: "**Apple** uses price skimming with every iPhone launch — the newest model launches at a premium price, targeting early adopters willing to pay top price. Over the following 12 months, the price gradually falls as newer models are released, capturing progressively more price-sensitive market segments."
        },
        misconception: "Students recommend penetration pricing for every new product launch. Penetration pricing suits competitive mass markets but is wrong for innovative or luxury products where a high price signals quality. Instead write: the best pricing strategy depends on the product type, competitive environment, and business objectives — penetration pricing is just one option.",
        examMatters: "Pricing questions require you to recommend and justify a specific strategy. Always link your choice to the product's PED, competitive environment, and business objectives. Stating the definition alone earns minimal marks — examiners want application and evaluation.",
        recall: {
          type: "reorder",
          prompt: "Order the price skimming process from launch to maturity:",
          correctOrder: ["Launch innovative product at a high price", "Early adopters buy despite the premium", "Competition enters and price is gradually reduced", "Product reaches mass market at a lower price"],
          shuffled: [2, 0, 3, 1]
        }
      },
      {
        id: "factors-determining-pricing",
        title: "Factors Determining Pricing",
        keyIdea: "The right price depends on costs, competition, customer perception and business objectives — no single factor should determine pricing alone.",
        body: [
          {
            type: "paragraph",
            text: "Pricing decisions are influenced by a range of **internal** and **external** factors. Internally, the business must consider its **costs of production** (the price must cover costs to be sustainable), its **marketing objectives** (growth vs profit), and its **brand positioning** (premium brands cannot price too low without damaging their image)."
          },
          {
            type: "paragraph",
            text: "Externally, the business must consider the **level of competition** (more competitors push prices down), **PED** (elastic demand limits price increases), the **state of the economy** (recessions reduce consumers' willingness to pay), and **legal constraints** (minimum pricing laws, anti-predatory pricing regulation)."
          },
          {
            type: "flow",
            steps: ["Analyse costs, competition and customer willingness to pay", "Choose pricing strategy aligned to objectives", "Monitor and adjust as market conditions change"],
            result: "Pricing that balances profitability with competitiveness",
            resultType: "good"
          },
          {
            type: "paragraph",
            text: "You should understand that pricing is dynamic, not fixed. Businesses regularly review and adjust their prices in response to competitor moves, changes in costs, shifts in demand, and economic cycles. The best pricing strategy today may not work six months from now."
          }
        ],
        realExample: {
          emoji: "🛫",
          text: "**EasyJet** uses dynamic pricing that changes minute by minute based on demand, time until departure, competitor fares and seat availability. This data-driven approach allows EasyJet to maximise revenue per flight by charging more when demand is high and less when seats need filling."
        },
        misconception: "Students focus only on cost when discussing pricing, as if price equals cost plus a fixed markup. In reality, customer willingness to pay and competitive pressures are often more important than cost in determining the optimal price. Instead write: pricing must consider costs, competition, customer perception and business objectives together — cost-plus alone ignores the market.",
        examMatters: "Extended-answer questions on pricing expect you to weigh multiple factors and reach a balanced judgement. Consider at least three factors (internal and external), explain how each influences the pricing decision, and conclude with a recommendation linked to the business context.",
        recall: {
          type: "fillin",
          prompt: "Complete the pricing factors logic:",
          template: ["Internal factors include costs, objectives and brand ___", "External factors include competition, PED and the ___", "Pricing must be ___ — regularly reviewed and adjusted"],
          answers: ["positioning", "economy", "dynamic"],
          hints: ["pos________", "eco____", "dyn____"]
        }
      }
    ],
    takeaway: [
      "Skimming targets early adopters; penetration builds share fast.",
      "Cost-plus is simple but ignores demand and competition.",
      "Pricing depends on costs, competition, PED and objectives.",
      "Good pricing is dynamic and adjusts to market conditions."
    ]
  },

  /* ═══ Block 6: Distribution (Place) ═══ */
  {
    title: "Distribution (Place)",
    quizIndices: [5],
    sections: [
      {
        id: "distribution-channels",
        title: "Distribution Channels",
        keyIdea: "Distribution channels are the routes a product takes from manufacturer to consumer — more intermediaries mean wider reach but less control and lower margins.",
        body: [
          {
            type: "paragraph",
            text: "A **distribution channel** is the path a product follows from the manufacturer to the final consumer. The simplest channel is **direct distribution** — the manufacturer sells straight to the consumer with no intermediaries. This gives maximum control and the highest margin per unit, but limits the geographic reach."
          },
          {
            type: "subheading",
            text: "Channel Types"
          },
          {
            type: "bullets",
            items: [
              "**Direct (zero-level)**: manufacturer → consumer. Used by many online businesses and farm shops. Maximum control and margins.",
              "**One-level**: manufacturer → retailer → consumer. The retailer takes a margin but provides access to established customer traffic.",
              "**Two-level**: manufacturer → wholesaler → retailer → consumer. Common for FMCG products where wide distribution is essential.",
              "**Agent/broker**: an intermediary negotiates sales on behalf of the manufacturer, common in international trade and property."
            ]
          },
          {
            type: "paragraph",
            text: "The choice of channel depends on the **product type**, the **target market**, and the business's **resources**. Perishable goods need short channels; mass-market consumer goods need long channels with multiple intermediaries to achieve nationwide coverage."
          }
        ],
        realExample: {
          emoji: "🍫",
          text: "**Cadbury** uses a two-level distribution channel for most of its confectionery — selling to wholesalers like Booker, who then distribute to thousands of independent retailers. This approach gives Cadbury access to over 100,000 UK stores without needing a direct relationship with each one."
        },
        misconception: "Students assume direct distribution is always best because it gives the highest margins. While margins per unit are higher, the business must handle all logistics, warehousing and customer service itself, which can be more expensive than the margin lost to intermediaries. Instead write: direct distribution maximises unit margins but requires significant investment in logistics, so intermediaries can be more efficient for reaching mass markets.",
        examMatters: "When asked to recommend a distribution channel, examiners want you to justify your choice by considering the product type, target market size, and the business's resources. Explain why the recommended channel suits the specific business context, not just what the channel is.",
        recall: {
          type: "fillin",
          prompt: "Complete the distribution channel logic:",
          template: ["Direct distribution means manufacturer sells to ___ with no intermediaries", "More intermediaries means wider ___ but lower margins", "Channel choice depends on product type, target market and ___"],
          answers: ["consumer", "reach", "resources"],
          hints: ["con_____", "rea__", "res______"]
        }
      },
      {
        id: "changes-in-distribution",
        title: "Changes in Distribution",
        keyIdea: "E-commerce and digital platforms have transformed distribution — cutting out intermediaries reduces costs but demands new capabilities in logistics and fulfilment.",
        body: [
          {
            type: "paragraph",
            text: "The rise of **e-commerce** has fundamentally changed distribution. Businesses can now sell directly to consumers worldwide through their own websites, eliminating wholesalers and retailers entirely. This **disintermediation** cuts costs and gives businesses direct access to customer data, enabling personalised marketing."
          },
          {
            type: "paragraph",
            text: "**Online marketplaces** like Amazon, eBay, and Etsy have created new distribution platforms where small businesses can reach global audiences without building their own logistics infrastructure. However, these platforms charge fees and the business has less control over the customer experience."
          },
          {
            type: "flow",
            steps: ["Business launches direct online sales", "Intermediaries are cut out (disintermediation)", "Margins improve but logistics must be managed in-house"],
            result: "Greater control and data, but new operational challenges",
            resultType: "neutral"
          },
          {
            type: "paragraph",
            text: "Many businesses now use **multi-channel distribution** — selling through their own website, through physical stores, and through third-party marketplaces simultaneously. This maximises reach but requires careful management to ensure consistent pricing and brand experience across all channels."
          }
        ],
        realExample: {
          emoji: "👓",
          text: "**Warby Parker** disrupted the eyewear industry by selling prescription glasses directly to consumers online, cutting out opticians and retailers. By eliminating intermediaries, Warby Parker offered designer-quality frames at a fraction of traditional prices, growing to a $3 billion valuation through direct distribution alone."
        },
        misconception: "Students claim that e-commerce will replace all physical retail. While online sales have grown dramatically, many products — clothing, furniture, luxury goods — still benefit from physical stores where customers can see, touch and try before buying. Instead write: e-commerce has transformed distribution but physical retail remains important for products where the in-store experience adds value to the purchase decision.",
        examMatters: "Questions on distribution changes often ask you to evaluate the impact of e-commerce on a specific business. Consider both the opportunities (wider reach, lower costs, customer data) and the challenges (logistics investment, returns management, loss of personal service) in your answer.",
        recall: {
          type: "reorder",
          prompt: "Order the e-commerce distribution transformation:",
          correctOrder: ["Business builds direct-to-consumer online channel", "Intermediaries (wholesalers, retailers) are bypassed", "Costs fall and customer data becomes directly available", "Business must invest in logistics and fulfilment capabilities"],
          shuffled: [3, 1, 0, 2]
        }
      }
    ],
    takeaway: [
      "Direct channels give control; longer channels give reach.",
      "E-commerce enables disintermediation but demands logistics.",
      "Multi-channel distribution maximises reach across platforms.",
      "Channel choice must match product type and target market."
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
