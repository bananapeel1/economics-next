/**
 * SECTION UPGRADE — Entrepreneurs and Leaders (Business 1.1)
 * ==========================================================
 * Edexcel IAL Business Unit 1, spec point 1.1
 * Run with: node scripts/upgrade-content-business-entrepreneurs.mjs
 */

import { supabase } from './_db.mjs';

/* ── 1. SETTINGS ──────────────────────────────────────────────────────────── */

const SECTION_SLUG = 'entrepreneurs-leaders';
const SUBJECT_ID   = 'business';

/* ── 2. CONTENT ───────────────────────────────────────────────────────────── */

const CONTENT = [

  /* ═══ Block 1: The Role of an Entrepreneur ═══ */
  {
    title: "The Role of an Entrepreneur",
    quizIndices: [0],
    sections: [
      {
        id: "what-entrepreneurs-do",
        title: "What Entrepreneurs Do",
        keyIdea: "An entrepreneur identifies a business opportunity, organises the resources needed and takes on the financial risk in pursuit of profit.",
        body: [
          {
            type: "paragraph",
            text: "An **entrepreneur** is someone who takes the initiative to start a business, bringing together the **factors of production** — land, labour, capital and enterprise — to create goods or services. The entrepreneur is the driving force who spots a gap in the market, develops an idea and turns it into a functioning business."
          },
          {
            type: "flow",
            steps: ["Identify a market opportunity", "Organise resources (land, labour, capital)", "Take on financial risk", "Create and sell a product or service"],
            result: "Profit as the reward for successful risk-taking",
            resultType: "good"
          },
          {
            type: "paragraph",
            text: "You should understand that entrepreneurs perform several critical functions. They **innovate** by developing new products or processes, they **organise** by coordinating resources and managing staff, and they **bear risk** by investing their own money with no guarantee of success."
          },
          {
            type: "paragraph",
            text: "Not every business owner is an entrepreneur in the traditional sense. A franchise owner follows an established model, while a true entrepreneur creates something new. The key distinction is the element of **innovation and risk-taking** that defines entrepreneurial activity."
          }
        ],
        realExample: {
          emoji: "🛒",
          text: "**James Dyson** spent 15 years and built 5,127 prototypes before perfecting his bagless vacuum cleaner. He risked his personal savings, was rejected by every major manufacturer, and eventually set up his own company. Dyson Ltd now generates over 6 billion pounds in annual revenue, proving that persistence and risk-taking are central to entrepreneurship."
        },
        misconception: "Students write \"an entrepreneur is anyone who runs a business.\" That confuses business ownership with entrepreneurship — a manager running an existing franchise is not necessarily an entrepreneur. Instead write: an entrepreneur specifically identifies opportunities, innovates and takes financial risk to create new value.",
        examMatters: "Examiners expect you to define an entrepreneur in terms of three key functions: innovation, organisation of resources and risk-bearing. Simply saying \"someone who starts a business\" is too vague and will lose marks in definition questions.",
        recall: {
          type: "reorder",
          prompt: "Put the entrepreneurial process in the right order:",
          correctOrder: ["Identify a gap or opportunity in the market", "Organise the factors of production", "Take on personal financial risk", "Earn profit as the reward for success"],
          shuffled: [2, 0, 3, 1]
        }
      },
      {
        id: "creating-running-expanding",
        title: "Creating, Running and Expanding",
        keyIdea: "The challenges an entrepreneur faces change dramatically as the business moves from start-up to established operation to growth phase.",
        body: [
          {
            type: "paragraph",
            text: "**Creating** a business involves identifying the opportunity, writing a business plan, securing finance and launching the product or service. At this stage, the entrepreneur typically does everything — from product development to marketing to administration. The biggest challenges are raising start-up capital and attracting the first customers."
          },
          {
            type: "paragraph",
            text: "**Running** an established business requires a different skill set. The focus shifts to managing cash flow, hiring and motivating staff, maintaining quality and building customer loyalty. The entrepreneur must develop management skills and create systems to handle day-to-day operations efficiently."
          },
          {
            type: "flow",
            steps: ["Create: secure finance and launch", "Run: manage cash flow and staff", "Expand: enter new markets or add products"],
            result: "Each phase demands different skills and resources",
            resultType: "neutral"
          },
          {
            type: "paragraph",
            text: "**Expanding** a business introduces new challenges: entering new markets, managing larger teams, maintaining culture and securing growth finance. You should recognise that many businesses fail during expansion because the founder cannot adapt their approach or the business grows faster than its cash flow can support."
          }
        ],
        realExample: {
          emoji: "🧁",
          text: "**Ella's Kitchen** was created by Paul Lindley in 2006 with a single organic baby food product. He ran the business for several years, building distribution through major retailers. When expanding internationally, Lindley sold the company to Hain Celestial for 100 million dollars, recognising that global expansion required resources beyond what he could provide alone."
        },
        misconception: "Students assume \"the same skills that start a business are enough to grow it.\" Start-up skills like creativity and risk-taking are different from the management and delegation skills needed to run and expand a larger operation. Instead write: each stage of business development demands different skills, and entrepreneurs must adapt or bring in people with complementary expertise.",
        examMatters: "Case study questions often describe a business at a specific stage and ask you to analyse the challenges it faces. Identify the stage clearly and link your answer to the specific challenges of that stage — do not give a generic list of business problems.",
        recall: {
          type: "fillin",
          prompt: "Complete the business stages:",
          template: ["___ involves identifying opportunity, securing finance and launching", "→ ___ requires managing cash flow, staff and daily operations", "→ ___ means entering new markets, adding products or scaling up"],
          answers: ["Creating", "Running", "Expanding"],
          hints: ["Cr______", "Ru_____", "Ex_______"]
        }
      },
      {
        id: "intrapreneurship",
        title: "Intrapreneurship",
        keyIdea: "Intrapreneurs act like entrepreneurs but within an existing organisation, driving innovation using the company's resources rather than their own.",
        body: [
          {
            type: "paragraph",
            text: "An **intrapreneur** is an employee who behaves like an entrepreneur within a large, established organisation. They identify new opportunities, develop innovative products or processes and push for change — but they use the **company's resources** rather than risking their own money."
          },
          {
            type: "flow",
            steps: ["Employee identifies an opportunity within the firm", "Company provides resources and support", "Innovation is developed internally"],
            result: "Business benefits from entrepreneurial thinking without the founder having to do everything",
            resultType: "good"
          },
          {
            type: "paragraph",
            text: "Intrapreneurship is valuable because large organisations often become slow and bureaucratic. By encouraging employees to think like entrepreneurs, businesses can stay innovative and responsive to market changes without the risks of a completely new start-up."
          },
          {
            type: "paragraph",
            text: "However, intrapreneurship only works if the organisational culture supports risk-taking and tolerates failure. In highly hierarchical or risk-averse businesses, intrapreneurs may be frustrated by red tape and resistance to change."
          }
        ],
        realExample: {
          emoji: "📝",
          text: "**Google's** \"20% time\" policy allowed engineers to spend one day a week on personal projects using company resources. This intrapreneurial approach produced Gmail, Google News and AdSense — products that generated billions in revenue. The policy demonstrated that empowering employees to innovate within the company can be extraordinarily profitable."
        },
        misconception: "Students confuse intrapreneurs with entrepreneurs. The key difference is risk — entrepreneurs risk their own money, while intrapreneurs use the company's resources. Instead write: intrapreneurs apply entrepreneurial thinking within an existing organisation, using company resources rather than taking personal financial risk.",
        examMatters: "Examiners may ask you to evaluate whether a large business should encourage intrapreneurship. Consider the benefits of innovation and employee engagement against the costs of giving staff time and resources for projects that may fail. Link your answer to the company's culture and industry.",
        recall: {
          type: "reorder",
          prompt: "Put the intrapreneurship process in the right order:",
          correctOrder: ["Employee spots an opportunity within the organisation", "Company allocates resources and grants freedom to explore", "Innovative product or process is developed internally", "Business benefits from entrepreneurial thinking without start-up risk"],
          shuffled: [3, 1, 0, 2]
        }
      },
      {
        id: "barriers-to-entrepreneurship",
        title: "Barriers",
        keyIdea: "Entrepreneurs face significant barriers including lack of finance, market competition, red tape and personal risk that deter many from starting a business.",
        body: [
          {
            type: "paragraph",
            text: "Starting a business is difficult, and many potential entrepreneurs are held back by significant barriers. The most common barrier is **lack of finance** — banks are often reluctant to lend to unproven businesses, and personal savings may be insufficient. Without adequate start-up capital, even brilliant ideas remain unrealised."
          },
          {
            type: "subheading",
            text: "Key Barriers to Entrepreneurship"
          },
          {
            type: "bullets",
            items: [
              "**Finance** — difficulty raising start-up capital from banks, investors or personal savings.",
              "**Competition** — established businesses with brand loyalty and economies of scale are hard to compete against.",
              "**Red tape** — regulations, licensing requirements and tax compliance create costs and complexity.",
              "**Personal risk** — the fear of losing personal savings, home or financial security deters many potential entrepreneurs."
            ]
          },
          {
            type: "paragraph",
            text: "You should recognise that barriers vary by industry and location. Some governments actively try to reduce barriers through start-up loans, tax breaks and simplified regulations, while others create additional obstacles. The willingness to overcome these barriers is what distinguishes entrepreneurs from those who simply have business ideas."
          }
        ],
        realExample: {
          emoji: "💰",
          text: "**Sara Blakely** started Spanx with just 5,000 dollars in personal savings after being rejected by every investor she approached. She could not afford a lawyer, so she wrote her own patent. Blakely overcame the finance barrier through sheer persistence, eventually building Spanx into a billion-dollar brand without any external investment."
        },
        misconception: "Students write \"the biggest barrier to entrepreneurship is lack of a good idea.\" Most research shows that finance and risk aversion are far more significant barriers than ideas. Instead write: the most common barriers to entrepreneurship are access to finance, competition from established firms and the personal financial risk involved.",
        examMatters: "When asked about barriers, examiners want you to link specific barriers to the context of the business in the case study. A tech start-up may face different barriers (skills, finance) from a retail start-up (competition, location costs). Always contextualise your answer.",
        recall: {
          type: "fillin",
          prompt: "Complete the key barriers:",
          template: ["Lack of ___ is the most common barrier to starting a business", "→ ___ from established firms with brand loyalty is hard to overcome", "→ Red ___ refers to regulations, licensing and tax compliance requirements"],
          answers: ["finance", "Competition", "tape"],
          hints: ["fi_____", "Co_________", "ta__"]
        }
      }
    ],
    takeaway: [
      "Entrepreneurs innovate, organise resources and bear financial risk.",
      "Creating, running and expanding a business each demand different skills.",
      "Intrapreneurs innovate within existing organisations using company resources.",
      "Finance, competition and personal risk are the biggest barriers to entry."
    ]
  },

  /* ═══ Block 2: Entrepreneurial Motives and Characteristics ═══ */
  {
    title: "Entrepreneurial Motives and Characteristics",
    quizIndices: [1],
    practiceIndices: [0],
    sections: [
      {
        id: "skills-and-characteristics",
        title: "Skills and Characteristics",
        keyIdea: "Successful entrepreneurs share key traits including creativity, risk-taking, determination and the ability to spot opportunities others miss.",
        body: [
          {
            type: "paragraph",
            text: "Research on successful entrepreneurs consistently identifies a set of common **characteristics** and **skills**. These include **creativity and innovation** (the ability to generate new ideas), **risk-taking** (willingness to invest time and money with uncertain outcomes), **determination and resilience** (persisting through setbacks) and **opportunity recognition** (spotting gaps in the market)."
          },
          {
            type: "subheading",
            text: "Key Entrepreneurial Characteristics"
          },
          {
            type: "bullets",
            items: [
              "**Creativity** — generating original ideas for products, services or business models.",
              "**Risk-taking** — accepting the possibility of financial loss in pursuit of reward.",
              "**Determination** — persisting through failures, setbacks and rejection.",
              "**Initiative** — taking action rather than waiting for opportunities to come to you.",
              "**Communication** — persuading investors, customers and employees to believe in the vision."
            ]
          },
          {
            type: "paragraph",
            text: "You should understand that these characteristics can be developed — entrepreneurship is not purely about innate talent. Many successful entrepreneurs learned from early failures and built their skills through experience and deliberate practice."
          }
        ],
        realExample: {
          emoji: "📦",
          text: "**Jeff Bezos** demonstrated classic entrepreneurial characteristics when he left a secure, high-paying job at a Wall Street hedge fund to start Amazon from his garage in 1994. His risk-taking, long-term vision and determination to keep reinvesting profits rather than taking short-term gains turned a small online bookshop into the world's largest retailer."
        },
        misconception: "Students write \"entrepreneurs are born, not made.\" While some people may have a natural inclination toward risk-taking, the skills of entrepreneurship — such as financial management, communication and opportunity recognition — can all be learned and developed. Instead write: entrepreneurial skills can be developed through education, experience and mentoring, even if some personality traits provide a natural advantage.",
        examMatters: "Examiners may ask you to assess which characteristics are most important for a specific business context. A tech start-up might need creativity above all, while a franchise requires determination and financial discipline. Always link characteristics to the situation in the case study.",
        recall: {
          type: "reorder",
          prompt: "Put these entrepreneurial actions in logical order:",
          correctOrder: ["Spot an opportunity others have missed", "Take the initiative to develop the idea", "Accept the financial risk of launching", "Persist through setbacks and early failures"],
          shuffled: [3, 1, 0, 2]
        }
      },
      {
        id: "financial-motives",
        title: "Financial Motives",
        keyIdea: "Many entrepreneurs are driven by the desire for profit, wealth creation and financial independence rather than working for a salary.",
        body: [
          {
            type: "paragraph",
            text: "**Profit** is the most obvious financial motive for entrepreneurship. By building a successful business, the entrepreneur earns the residual income after all costs have been paid. Unlike an employee's salary, profit has no cap — the more successful the business, the more the entrepreneur can earn."
          },
          {
            type: "flow",
            steps: ["Invest personal capital in a business", "Revenue exceeds costs", "Profit flows to the entrepreneur"],
            result: "Unlimited earning potential compared to a fixed salary",
            resultType: "good"
          },
          {
            type: "paragraph",
            text: "Beyond profit, entrepreneurs may be motivated by **wealth creation** — building an asset (the business itself) that can be sold for a large sum in the future. Many tech entrepreneurs, for example, build businesses with the explicit goal of selling them or taking them public."
          },
          {
            type: "paragraph",
            text: "**Financial independence** is another powerful motive. You should recognise that some entrepreneurs start businesses not to become extremely wealthy but to earn enough to live on their own terms, free from the constraints and insecurity of employment."
          }
        ],
        realExample: {
          emoji: "💬",
          text: "**Jan Koum** co-founded WhatsApp in 2009 driven partly by the desire for financial security after growing up in poverty in Ukraine. When Facebook acquired WhatsApp for 19 billion dollars in 2014, Koum's 45% stake made him one of the wealthiest people in the world — a dramatic example of wealth creation through entrepreneurship."
        },
        misconception: "Students assume \"all entrepreneurs are motivated by getting rich.\" Research consistently shows that many entrepreneurs rank autonomy and passion above money as their primary motives. Instead write: financial motives like profit and wealth creation are important, but they are often secondary to non-financial motives such as independence and pursuing a passion.",
        examMatters: "When analysing entrepreneurial motives, examiners want you to distinguish between different financial motives — profit (ongoing income), wealth creation (building an asset to sell) and financial independence (self-sufficiency). Do not treat them as the same thing.",
        recall: {
          type: "fillin",
          prompt: "Complete the financial motives:",
          template: ["___ is the residual income after all costs are paid", "→ ___ creation means building a business asset that can be sold", "→ Financial ___ means earning enough to live on your own terms"],
          answers: ["Profit", "Wealth", "independence"],
          hints: ["Pr____", "We____", "in___________"]
        }
      },
      {
        id: "non-financial-motives",
        title: "Non-Financial Motives",
        keyIdea: "Many entrepreneurs are driven by independence, passion, social purpose or the desire to be their own boss rather than purely by money.",
        body: [
          {
            type: "paragraph",
            text: "**Non-financial motives** often play a more important role than money in driving entrepreneurs. **Independence and autonomy** — being your own boss, setting your own hours and making your own decisions — is consistently ranked as a top motive by entrepreneurs worldwide."
          },
          {
            type: "paragraph",
            text: "**Passion and satisfaction** is another powerful driver. Many entrepreneurs start businesses because they are passionate about a product, service or cause and want to spend their working life doing something they love. The emotional reward of building something from nothing can be more fulfilling than any financial return."
          },
          {
            type: "flow",
            steps: ["Passion for a product or cause", "Desire for independence and autonomy", "Willingness to take risk for personal fulfilment"],
            result: "Intrinsic motivation that sustains effort through difficult times",
            resultType: "good"
          },
          {
            type: "paragraph",
            text: "**Social enterprise** represents a growing category where the primary motive is to solve a social or environmental problem rather than to maximise profit. You should recognise that social entrepreneurs still need to generate revenue to be sustainable, but profit is a means to achieving social impact rather than an end in itself."
          }
        ],
        realExample: {
          emoji: "👟",
          text: "**Blake Mycoskie** founded TOMS Shoes in 2006 with a social mission: for every pair of shoes sold, one pair would be given to a child in need. The \"One for One\" model was driven by Mycoskie's desire to make a social impact, not to maximise profit. TOMS has since donated over 100 million pairs of shoes worldwide."
        },
        misconception: "Students write \"social enterprises are charities, not real businesses.\" Social enterprises operate commercially and must generate revenue to survive — the difference is that their primary purpose is social impact rather than profit maximisation. Instead write: social enterprises are commercial businesses that use profits as a means to achieve social or environmental objectives.",
        examMatters: "Examiners increasingly test social enterprise motives alongside traditional profit motives. When comparing motives, explain that financial and non-financial motives often coexist — most entrepreneurs are driven by a combination of profit, independence and passion.",
        recall: {
          type: "reorder",
          prompt: "Rank these motives from most commonly cited to least:",
          correctOrder: ["Independence and being your own boss", "Passion for the product or cause", "Desire to make a social impact", "Achieving extreme personal wealth"],
          shuffled: [3, 0, 2, 1]
        }
      }
    ],
    takeaway: [
      "Entrepreneurs share traits like creativity, risk-taking and determination.",
      "Financial motives include profit, wealth creation and independence.",
      "Non-financial motives like passion and autonomy often matter more than money.",
      "Social entrepreneurs use commercial methods to achieve social impact."
    ]
  },

  /* ═══ Block 3: Business Objectives ═══ */
  {
    title: "Business Objectives",
    quizIndices: [2],
    practiceIndices: [1],
    sections: [
      {
        id: "common-objectives",
        title: "Common Objectives",
        keyIdea: "Businesses set objectives to give direction and measure success, with survival, profit, growth and market share being the most common goals.",
        body: [
          {
            type: "paragraph",
            text: "A **business objective** is a specific, measurable target that a business aims to achieve within a set timeframe. Objectives give the business direction, provide a basis for decision-making and allow managers to measure performance. Without clear objectives, a business operates without focus."
          },
          {
            type: "subheading",
            text: "Common Business Objectives"
          },
          {
            type: "bullets",
            items: [
              "**Survival** — the most basic objective, especially for new businesses facing uncertain early months.",
              "**Profit maximisation** — earning the highest possible profit by maximising the gap between revenue and costs.",
              "**Revenue maximisation** — maximising sales revenue even if this means accepting lower profit margins.",
              "**Growth** — increasing the size of the business through higher sales, more stores or expansion into new markets.",
              "**Market share** — increasing the business's percentage of total industry sales to strengthen its competitive position."
            ]
          },
          {
            type: "paragraph",
            text: "You should recognise that objectives change as a business develops. A start-up typically prioritises **survival**, then shifts to **profit** once established, and later focuses on **growth** and **market share** as it matures. The stage of the business life cycle strongly influences which objective takes priority."
          }
        ],
        realExample: {
          emoji: "📱",
          text: "**Uber** deliberately prioritised growth and market share over profit for its first decade, spending billions on subsidised fares to dominate the ride-hailing market. This strategy of revenue maximisation at the expense of short-term profit was designed to eliminate competitors first and then raise prices once dominance was achieved."
        },
        misconception: "Students write \"all businesses aim to maximise profit.\" Many businesses prioritise other objectives — start-ups focus on survival, tech firms chase growth, and social enterprises target social impact. Instead write: profit is an important objective but businesses often prioritise survival, growth or market share depending on their stage of development and strategic goals.",
        examMatters: "Examiners want you to identify which objective is most relevant to the business in the case study. A new start-up should be discussing survival, not market share. Always justify your choice by linking it to the business's size, age and competitive position.",
        recall: {
          type: "reorder",
          prompt: "Put business objectives in typical order of priority as a firm develops:",
          correctOrder: ["Survival in the uncertain early months", "Profit to reward the entrepreneur and fund reinvestment", "Growth through expanding sales or entering new markets", "Market share to strengthen competitive position"],
          shuffled: [2, 0, 3, 1]
        }
      },
      {
        id: "customer-satisfaction-and-social",
        title: "Customer Satisfaction and Social Objectives",
        keyIdea: "Some businesses set objectives beyond profit, focusing on customer satisfaction, ethical behaviour or environmental sustainability.",
        body: [
          {
            type: "paragraph",
            text: "**Customer satisfaction** is increasingly treated as a formal business objective rather than just an outcome. Businesses that consistently meet or exceed customer expectations build loyalty, generate repeat purchases and benefit from positive word-of-mouth. You should understand that customer satisfaction drives long-term profitability even if it requires short-term investment in quality and service."
          },
          {
            type: "flow",
            steps: ["Invest in product quality and customer service", "Customers satisfied and loyal", "Repeat purchases and positive word-of-mouth"],
            result: "Sustainable long-term revenue and strong brand reputation",
            resultType: "good"
          },
          {
            type: "paragraph",
            text: "**Social and ethical objectives** go beyond profit to consider the business's impact on society and the environment. These include reducing carbon emissions, supporting local communities, ensuring fair trade practices and promoting diversity and inclusion in the workforce."
          },
          {
            type: "paragraph",
            text: "Critics argue that social objectives can conflict with profit maximisation and that managers have a duty to prioritise shareholder returns. Supporters counter that businesses with strong ethical reputations attract better talent, more loyal customers and fewer regulatory problems, making social objectives commercially smart in the long run."
          }
        ],
        realExample: {
          emoji: "🧴",
          text: "**The Body Shop** was founded by Anita Roddick with explicit social and ethical objectives — opposing animal testing, supporting fair trade and minimising environmental impact. These objectives attracted a loyal customer base willing to pay premium prices, demonstrating that social objectives and commercial success can be mutually reinforcing."
        },
        misconception: "Students write \"social objectives always reduce profits.\" Ethical and sustainable practices can actually increase profitability by attracting conscious consumers, improving employee retention and reducing waste. Instead write: social objectives may increase costs in the short term but can enhance brand reputation, customer loyalty and long-term profitability.",
        examMatters: "When evaluating social objectives, examiners expect you to consider both the costs and the commercial benefits. A strong answer argues that social and financial objectives need not conflict — ethical practices can be a source of competitive advantage if customers value them.",
        recall: {
          type: "fillin",
          prompt: "Complete the satisfaction and social chain:",
          template: ["Customer ___ drives loyalty, repeat purchases and word-of-mouth", "→ ___ objectives include reducing emissions and supporting fair trade", "→ Critics argue these conflict with ___ maximisation for shareholders"],
          answers: ["satisfaction", "Social", "profit"],
          hints: ["sa___________", "So____", "pr____"]
        }
      },
      {
        id: "conflicts-between-objectives",
        title: "Conflicts Between Objectives",
        keyIdea: "Business objectives often conflict with each other, forcing managers to make trade-offs between short-term profit and long-term growth.",
        body: [
          {
            type: "paragraph",
            text: "In practice, businesses cannot pursue all objectives simultaneously because many of them **conflict** with each other. The most common conflict is between **short-term profit** and **long-term growth** — investing in expansion, research or staff development reduces current profits but may increase future returns."
          },
          {
            type: "flow",
            steps: ["Business wants to maximise profit AND grow", "Growth requires investment that reduces current profit", "Managers must prioritise one objective over the other"],
            result: "Trade-offs are inevitable — the choice depends on the business's strategy",
            resultType: "neutral"
          },
          {
            type: "paragraph",
            text: "Other common conflicts include **growth vs quality** (rapid expansion can dilute product standards), **profit vs ethics** (cutting corners increases margins but damages reputation), and **shareholder returns vs employee welfare** (higher dividends may mean lower pay or redundancies)."
          },
          {
            type: "paragraph",
            text: "You should understand that stakeholders often have competing interests that drive these conflicts. Shareholders want maximum returns, employees want higher pay and security, customers want lower prices, and the community wants responsible behaviour. Managing these competing demands is one of the hardest aspects of running a business."
          }
        ],
        realExample: {
          emoji: "📦",
          text: "**Amazon** famously prioritised growth over short-term profit for nearly two decades, reinvesting almost all revenue into expansion, technology and logistics. Shareholders accepted minimal dividends because they believed in Jeff Bezos's long-term strategy. This trade-off between profit and growth ultimately created one of the most valuable companies in history."
        },
        misconception: "Students write \"a good manager can achieve all objectives at once.\" That ignores the reality of trade-offs — resources spent on growth cannot simultaneously be distributed as profit, and ethical practices often cost more than cutting corners. Instead write: managers must make strategic choices about which objectives to prioritise, accepting that pursuing one objective often means compromising on another.",
        examMatters: "Examiners love questions about conflicts between objectives because they test your ability to evaluate trade-offs. Always identify the specific conflict, explain why it exists and evaluate which objective should take priority given the context. Generic answers about \"balancing\" objectives score poorly.",
        recall: {
          type: "reorder",
          prompt: "Put the objective conflict analysis in order:",
          correctOrder: ["Business identifies multiple objectives to pursue", "Resources are limited so trade-offs are necessary", "Managers prioritise based on strategy and stakeholder pressure", "Some objectives are sacrificed or deferred to achieve others"],
          shuffled: [2, 0, 3, 1]
        }
      }
    ],
    takeaway: [
      "Survival, profit, growth and market share are the most common objectives.",
      "Customer satisfaction and social objectives support long-term success.",
      "Objectives often conflict, forcing managers to make strategic trade-offs."
    ]
  },

  /* ═══ Block 4: Business Choices ═══ */
  {
    title: "Business Choices",
    quizIndices: [3],
    sections: [
      {
        id: "opportunity-cost",
        title: "Opportunity Cost",
        keyIdea: "Every business decision has an opportunity cost — the value of the next best alternative that you give up when you choose one option over another.",
        body: [
          {
            type: "paragraph",
            text: "**Opportunity cost** is one of the most fundamental concepts in business and economics. It is defined as the value of the **next best alternative forgone** when a decision is made. Because resources (money, time, labour) are scarce, choosing to use them in one way means you cannot use them in another."
          },
          {
            type: "flow",
            steps: ["Business has limited resources", "Two or more options available", "Choosing one means giving up the other"],
            result: "The value of the rejected option is the opportunity cost",
            resultType: "neutral"
          },
          {
            type: "paragraph",
            text: "For example, if an entrepreneur invests 100,000 pounds in opening a shop, the opportunity cost might be the interest that money could have earned in a bank, or the returns from investing in a different business. You should always consider what is sacrificed, not just what is gained, when evaluating any business decision."
          },
          {
            type: "paragraph",
            text: "Opportunity cost applies to all decisions — not just financial ones. A manager who spends a day on administrative tasks has an opportunity cost of not spending that day on strategic planning or customer visits. Understanding opportunity cost helps businesses allocate their scarce resources more effectively."
          }
        ],
        realExample: {
          emoji: "🎬",
          text: "**Netflix** faced a classic opportunity cost decision when it chose to invest billions in original content production rather than continuing to license shows from other studios. The opportunity cost was the catalogue of licensed content it gave up. This strategic choice ultimately gave Netflix a unique competitive advantage that licensed content could never provide."
        },
        misconception: "Students define opportunity cost as \"the cost of a decision\" or \"what you spend.\" Opportunity cost is not the monetary cost — it is the value of the next best alternative you gave up. Instead write: opportunity cost is the benefit that could have been gained from the next best alternative that was not chosen.",
        examMatters: "Opportunity cost appears in almost every business paper. Examiners want you to identify the specific next best alternative, not just say \"there is an opportunity cost.\" Always name what the business is giving up and explain why that sacrifice matters in the context of the decision.",
        recall: {
          type: "fillin",
          prompt: "Complete the opportunity cost definition:",
          template: ["Opportunity cost is the value of the ___ ___ ___ forgone", "→ It arises because resources are ___ and have alternative uses", "→ It applies to all decisions, not just ___ ones"],
          answers: ["next best alternative", "scarce", "financial"],
          hints: ["ne__ be__ al_________", "sc____", "fi________"]
        }
      },
      {
        id: "trade-offs-in-decision-making",
        title: "Trade-offs in Decision-Making",
        keyIdea: "Business decisions involve trade-offs where gaining something desirable requires giving up something else, and good managers weigh the costs against the benefits.",
        body: [
          {
            type: "paragraph",
            text: "A **trade-off** occurs whenever you must give up one thing in order to gain another. Every business faces trade-offs because resources are finite and objectives often compete. The skill of good management lies in making trade-offs that create the greatest overall value for the business."
          },
          {
            type: "subheading",
            text: "Common Business Trade-offs"
          },
          {
            type: "bullets",
            items: [
              "**Quality vs cost** — higher quality materials increase product appeal but raise production costs.",
              "**Short-term profit vs long-term investment** — paying dividends now versus reinvesting for future growth.",
              "**Speed vs thoroughness** — launching quickly to beat competitors versus taking time to perfect the product.",
              "**Risk vs reward** — pursuing ambitious opportunities versus playing it safe with proven strategies."
            ]
          },
          {
            type: "flow",
            steps: ["Identify the options and their benefits", "Assess the opportunity cost of each", "Choose the option with the greatest net benefit"],
            result: "Better decisions through systematic evaluation of trade-offs",
            resultType: "good"
          },
          {
            type: "paragraph",
            text: "You should recognise that trade-offs are unavoidable — there is no perfect decision that achieves everything. Effective entrepreneurs and managers acknowledge trade-offs explicitly and make conscious choices about what to prioritise, rather than pretending that difficult choices can be avoided."
          }
        ],
        realExample: {
          emoji: "🍎",
          text: "**Apple** makes a deliberate trade-off between product range and focus. While competitors like Samsung offer dozens of phone models at every price point, Apple limits its range to a few carefully designed models. This trade-off sacrifices market coverage for product excellence and brand consistency, which supports Apple's premium pricing strategy."
        },
        misconception: "Students write \"the best decision is one with no trade-offs.\" Every decision involves trade-offs because resources are scarce and objectives compete. Instead write: the best decision is one where the benefits gained outweigh the value of what is given up, recognising that perfect solutions rarely exist.",
        examMatters: "Examiners test your ability to evaluate trade-offs in context. When analysing a business decision, explicitly state what the business gains and what it gives up. Use opportunity cost language and link back to the business's strategic priorities. Answers that only discuss benefits without acknowledging costs will not achieve evaluation marks.",
        recall: {
          type: "reorder",
          prompt: "Put the trade-off analysis process in order:",
          correctOrder: ["Identify available options and their potential benefits", "Assess the opportunity cost of each option", "Weigh the costs against the benefits of each", "Choose the option with the greatest net value"],
          shuffled: [3, 1, 0, 2]
        }
      }
    ],
    takeaway: [
      "Opportunity cost is the next best alternative you give up when you choose.",
      "Trade-offs are unavoidable because resources are scarce and objectives compete.",
      "Good decisions weigh the benefits gained against the value of what is sacrificed."
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
