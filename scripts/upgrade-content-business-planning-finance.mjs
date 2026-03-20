/**
 * SECTION UPGRADE — Planning & Raising Finance (Business 2)
 * ==========================================================
 * Edexcel IAL Business Unit 2
 * Run with: node scripts/upgrade-content-business-planning-finance.mjs
 */

import { supabase } from './_db.mjs';

/* ── 1. SETTINGS ──────────────────────────────────────────────────────────── */

const SECTION_SLUG = 'planning-raising-finance';
const SUBJECT_ID   = 'business';

/* ── 2. CONTENT ───────────────────────────────────────────────────────────── */

const CONTENT = [

  /* ═══ Block 1: Business Planning ═══ */
  {
    title: "Business Planning",
    quizIndices: [0],
    sections: [
      {
        id: "purpose-of-business-plans",
        title: "Purpose of Business Plans",
        keyIdea: "A business plan is a written document that sets out the objectives, strategies and financial forecasts of a business, used to guide decisions and attract finance.",
        body: [
          {
            type: "paragraph",
            text: "A **business plan** is a formal written document that describes the business idea, its objectives, the market it operates in, the marketing strategy, operational details and financial forecasts. It serves as a roadmap for the entrepreneur and a key document when approaching lenders or investors for finance."
          },
          {
            type: "flow",
            steps: ["Define objectives", "Research market", "Plan finances", "Present to stakeholders"],
            result: "Clear direction and improved chances of securing funding",
            resultType: "good"
          },
          {
            type: "paragraph",
            text: "For the entrepreneur, a business plan forces disciplined thinking about every aspect of the venture before committing resources. It identifies potential problems early and sets measurable targets against which progress can be tracked. Without a plan, decisions are made reactively rather than strategically."
          },
          {
            type: "paragraph",
            text: "For lenders and investors, the plan provides evidence that the entrepreneur has thoroughly researched the market and has realistic financial projections. Banks are far more likely to approve a loan when a detailed business plan demonstrates a clear path to profitability."
          }
        ],
        realExample: {
          emoji: "🍔",
          text: "**Deliveroo** used a detailed business plan to secure its early-stage funding from venture capital investors in 2013. The plan outlined the gap in restaurant delivery logistics, projected growth in key cities, and detailed how the technology platform would scale, helping convince investors to commit millions."
        },
        misconception: "Students assume a business plan guarantees success because it has been carefully prepared. A plan is only as good as its assumptions — if market conditions change or forecasts prove inaccurate, the plan becomes unreliable. Instead write: a business plan reduces risk through preparation but cannot eliminate uncertainty, and must be updated as conditions change.",
        examMatters: "Examiners often ask you to evaluate the usefulness of a business plan. Always consider both sides — it provides direction and attracts finance, but it may be based on inaccurate forecasts and can become outdated quickly in dynamic markets.",
        recall: {
          type: "fillin",
          prompt: "Complete the business plan logic:",
          template: ["A business plan sets out objectives, strategies and financial ___", "It helps attract finance from lenders and ___", "The plan must be ___ as market conditions change"],
          answers: ["forecasts", "investors", "updated"],
          hints: ["for______", "inv______", "upd_____"]
        }
      },
      {
        id: "contents-of-business-plans",
        title: "Contents of a Business Plan",
        keyIdea: "A complete business plan includes an executive summary, market analysis, marketing and operations plans, management details and financial projections.",
        body: [
          {
            type: "paragraph",
            text: "A typical business plan contains several key sections that together provide a complete picture of the proposed venture. Each section serves a specific purpose and answers questions that stakeholders need resolved before committing support or resources."
          },
          {
            type: "subheading",
            text: "Key Components"
          },
          {
            type: "bullets",
            items: [
              "**Executive summary** — a brief overview of the entire plan, written last but placed first to hook the reader.",
              "**Market analysis** — research on the target market, competitors and customer needs, showing the opportunity exists.",
              "**Marketing strategy** — how the business will attract and retain customers through the marketing mix.",
              "**Operations plan** — details of premises, suppliers, production methods and staffing requirements.",
              "**Financial forecasts** — projected revenue, costs, cash flow and break-even analysis covering at least the first year."
            ]
          },
          {
            type: "paragraph",
            text: "The financial section is often the most scrutinised by investors and lenders. It must include realistic assumptions and demonstrate that the business can generate sufficient cash flow to cover costs and repay any borrowing. Overly optimistic figures damage credibility."
          }
        ],
        realExample: {
          emoji: "☕",
          text: "**Grind**, the London-based coffee chain, included detailed financial projections and a clear operations plan when raising funds through crowdfunding in 2020. The transparency of their plan helped them raise over one million pounds from individual investors who could see exactly how funds would be deployed."
        },
        misconception: "Students list every possible section of a business plan without explaining why each matters. Examiners want you to understand the purpose of each component, not just name it. Instead write: explain how each section of the plan addresses a specific concern of stakeholders, such as market viability or financial sustainability.",
        examMatters: "When asked about the contents of a business plan, examiners reward you for linking each section to its purpose. Do not simply list headings — explain why financial projections matter to a bank or why market analysis matters to an investor.",
        recall: {
          type: "reorder",
          prompt: "Order these business plan steps logically:",
          correctOrder: ["Research the target market and competitors", "Develop marketing and operations strategies", "Produce financial forecasts and cash-flow projections", "Write the executive summary as an overview"],
          shuffled: [3, 1, 0, 2]
        }
      }
    ],
    takeaway: [
      "A business plan provides direction and helps secure external finance.",
      "Financial forecasts are the most scrutinised section by lenders.",
      "Plans must be realistic and updated as conditions change."
    ]
  },

  /* ═══ Block 2: Internal Sources of Finance ═══ */
  {
    title: "Internal Sources of Finance",
    quizIndices: [1],
    sections: [
      {
        id: "retained-profit",
        title: "Retained Profit",
        keyIdea: "Retained profit is the portion of net profit kept in the business after dividends are paid, providing a free and flexible source of finance for growth.",
        body: [
          {
            type: "paragraph",
            text: "**Retained profit** is the most common source of internal finance. It is the profit left over after all costs, tax and dividends to shareholders have been paid. The business keeps this money to reinvest in expansion, new equipment, research or to build a cash reserve for future needs."
          },
          {
            type: "flow",
            steps: ["Business earns revenue", "Deduct costs, tax and dividends", "Remaining profit is retained"],
            result: "Free finance with no interest or loss of ownership",
            resultType: "good"
          },
          {
            type: "paragraph",
            text: "The major advantage of retained profit is that it has **no cost** — there is no interest to pay and no dilution of ownership. It also keeps the business independent from external lenders. However, it is only available to businesses already making profit, meaning start-ups cannot use this source."
          },
          {
            type: "paragraph",
            text: "The limitation is that shareholders may prefer higher dividends rather than seeing profits retained. There can be a tension between reinvesting for long-term growth and satisfying shareholders who want short-term returns."
          }
        ],
        realExample: {
          emoji: "🛒",
          text: "**Aldi** has historically relied on retained profits to fund its aggressive UK expansion, opening hundreds of new stores without issuing shares or taking on significant debt. As a privately owned business, Aldi retains virtually all of its profits, giving it the financial firepower to grow rapidly without external pressure."
        },
        misconception: "Students claim retained profit is free money that appears without cost. While there is no interest charge, there is an opportunity cost — shareholders sacrifice dividends and the funds could have been invested elsewhere for a higher return. Instead write: retained profit has no direct cost but carries an opportunity cost for shareholders who forgo dividends.",
        examMatters: "Examiners often ask you to recommend a source of finance for a given scenario. Retained profit is ideal for established, profitable firms but unsuitable for start-ups or loss-making businesses. Always link your recommendation to the business context.",
        recall: {
          type: "fillin",
          prompt: "Complete the retained profit logic:",
          template: ["Retained profit is net profit kept after ___ are paid", "It has no ___ charges and no dilution of ownership", "Only available to businesses already making a ___"],
          answers: ["dividends", "interest", "profit"],
          hints: ["div______", "int______", "pro___"]
        }
      },
      {
        id: "sale-of-assets",
        title: "Sale of Assets",
        keyIdea: "Selling unwanted or underused assets converts them into cash, but the business permanently loses those resources and any future income they generated.",
        body: [
          {
            type: "paragraph",
            text: "A business can raise finance internally by **selling assets** it no longer needs or that are underperforming. This could include surplus machinery, vehicles, property or even entire divisions of the business. The cash generated can then be redirected toward more productive uses."
          },
          {
            type: "flow",
            steps: ["Identify underused asset", "Sell to generate cash", "Reinvest proceeds"],
            result: "One-off cash injection without borrowing",
            resultType: "neutral"
          },
          {
            type: "paragraph",
            text: "This approach is useful when a business is restructuring or refocusing on its core activities. It avoids the need to borrow and does not dilute ownership. However, the asset is gone permanently, so the business must be confident it will not need it in the future."
          },
          {
            type: "paragraph",
            text: "A specific form is **sale and leaseback**, where the business sells an asset such as property and immediately leases it back from the buyer. This raises cash while the business continues to use the asset, though it now incurs ongoing lease payments."
          }
        ],
        realExample: {
          emoji: "✈️",
          text: "**British Airways** used sale and leaseback on several aircraft during the Covid-19 pandemic to raise emergency cash while still operating the planes. This allowed BA to generate immediate liquidity without losing access to the aircraft, though it committed to long-term lease payments that increased operating costs."
        },
        misconception: "Students treat sale of assets as a reliable ongoing source of finance. It is a one-off measure — once an asset is sold, it cannot be sold again. Instead write: sale of assets provides a one-time cash injection and is not a sustainable long-term source of finance for growth.",
        examMatters: "When evaluating sale of assets as a source of finance, examiners want you to consider what the business loses by selling. A factory sold today cannot support production expansion tomorrow. Always weigh the short-term cash benefit against the long-term strategic impact.",
        recall: {
          type: "reorder",
          prompt: "Order the sale and leaseback process:",
          correctOrder: ["Business identifies an asset it owns outright", "Asset is sold to a finance company for cash", "Business leases the asset back for ongoing use", "Cash is reinvested but lease costs are now incurred"],
          shuffled: [2, 0, 3, 1]
        }
      },
      {
        id: "owner-capital",
        title: "Owner's Capital",
        keyIdea: "The owner invests their own personal savings into the business, which is essential at start-up but limited by personal wealth.",
        body: [
          {
            type: "paragraph",
            text: "**Owner's capital** refers to the personal funds that an entrepreneur invests directly into their business. This is often the first source of finance used when starting a new venture, because the business has no trading history and may struggle to secure external funding."
          },
          {
            type: "paragraph",
            text: "Using personal savings shows commitment to the business idea. Lenders and investors look more favourably on entrepreneurs who have put their own money at risk — it signals confidence and aligns the owner's interests with the success of the business."
          },
          {
            type: "flow",
            steps: ["Owner invests personal savings", "Business launched with no debt"],
            result: "Full control retained but personal risk is high",
            resultType: "neutral"
          },
          {
            type: "paragraph",
            text: "The obvious limitation is that personal savings are finite. Most individuals cannot fund significant expansion from personal wealth alone, which means owner's capital is typically a start-up source that must be supplemented by other finance as the business grows."
          }
        ],
        realExample: {
          emoji: "👗",
          text: "**Sara Blakely** invested her entire personal savings of $5,000 to launch Spanx in 2000, avoiding any external investors or debt. This meant she retained 100% ownership, and when the company was valued at over $1 billion, Blakely became the youngest self-made female billionaire."
        },
        misconception: "Students assume using personal savings means there is no financial risk. The owner risks losing their personal wealth if the business fails, which can affect their mortgage, pension and family finances. Instead write: owner's capital avoids external debt but exposes the entrepreneur's personal wealth to the risk of total loss if the business fails.",
        examMatters: "In questions about start-up finance, examiners expect you to explain why owner's capital is often the first source used and why it has limitations. Link your answer to the concepts of personal risk and the difficulty new businesses face in securing external finance.",
        recall: {
          type: "fillin",
          prompt: "Complete the owner's capital logic:",
          template: ["Owner's capital comes from the entrepreneur's personal ___", "It signals ___ to potential lenders and investors", "It is limited by the owner's personal ___"],
          answers: ["savings", "commitment", "wealth"],
          hints: ["sav____", "com_______", "wea___"]
        }
      }
    ],
    takeaway: [
      "Retained profit is free of interest but only available to profitable firms.",
      "Sale of assets provides one-off cash but permanently loses resources.",
      "Owner's capital shows commitment but is limited by personal wealth."
    ]
  },

  /* ═══ Block 3: External Sources of Finance ═══ */
  {
    title: "External Sources of Finance",
    quizIndices: [2],
    practiceIndices: [0],
    sections: [
      {
        id: "bank-loans-overdrafts",
        title: "Bank Loans and Overdrafts",
        keyIdea: "Bank loans provide a lump sum repaid with interest over a fixed period, while overdrafts offer flexible short-term borrowing when cash flow is tight.",
        body: [
          {
            type: "paragraph",
            text: "A **bank loan** is a fixed sum of money borrowed from a bank and repaid in regular instalments over an agreed period, typically with interest. Loans are suitable for purchasing specific assets such as equipment or property, because the repayment period can be matched to the asset's useful life."
          },
          {
            type: "paragraph",
            text: "A **bank overdraft** allows a business to spend more than it has in its current account, up to an agreed limit. Overdrafts are designed for short-term cash flow management — covering a gap between paying suppliers and receiving payment from customers. Interest is only charged on the amount overdrawn."
          },
          {
            type: "flow",
            steps: ["Cash flow shortfall identified", "Overdraft covers the gap temporarily", "Customer payments arrive"],
            result: "Cash flow smoothed without a long-term commitment",
            resultType: "good"
          },
          {
            type: "paragraph",
            text: "The key distinction is time horizon: loans are **medium to long-term**, while overdrafts are **short-term**. Overdrafts are more expensive per pound borrowed because interest rates are higher, but they offer flexibility. Banks can also recall an overdraft at any time, making it unreliable for long-term needs."
          }
        ],
        realExample: {
          emoji: "🏗️",
          text: "**JCB** took out long-term bank loans to finance the construction of its new factory in Staffordshire, matching the 20-year loan repayment to the expected life of the building. For day-to-day cash flow gaps caused by seasonal demand fluctuations, JCB uses an overdraft facility rather than additional borrowing."
        },
        misconception: "Students recommend overdrafts for buying fixed assets like machinery. Overdrafts are short-term and can be recalled by the bank at any time, making them unsuitable for long-term investment. Instead write: overdrafts are designed for short-term cash flow smoothing, while bank loans should be used for long-term asset purchases.",
        examMatters: "Examiners frequently ask you to choose between different sources of finance. Always match the source to the purpose — short-term need equals overdraft, long-term asset purchase equals loan. Justifying the time horizon match is essential for full marks.",
        recall: {
          type: "reorder",
          prompt: "Order these from shortest to longest term finance:",
          correctOrder: ["Bank overdraft (days to weeks)", "Trade credit (30-90 days)", "Bank loan (1-25 years)", "Mortgage (10-30 years)"],
          shuffled: [2, 0, 3, 1]
        }
      },
      {
        id: "share-capital",
        title: "Share Capital",
        keyIdea: "Selling shares raises large sums of permanent capital with no repayment obligation, but the original owners give up a proportion of ownership and control.",
        body: [
          {
            type: "paragraph",
            text: "**Share capital** is raised by selling ownership stakes in the business to investors. For a private limited company (Ltd), shares are sold to family, friends or private investors. For a public limited company (PLC), shares are sold on the stock exchange to the general public through an **initial public offering (IPO)**."
          },
          {
            type: "flow",
            steps: ["Company issues new shares", "Investors buy shares and provide capital", "Ownership is diluted"],
            result: "Large sums raised but original owners lose some control",
            resultType: "neutral"
          },
          {
            type: "paragraph",
            text: "Share capital is **permanent** — it does not need to be repaid. There are no interest charges, though shareholders expect dividends and capital growth in return. This makes it ideal for funding major expansion, acquisitions or research and development."
          },
          {
            type: "paragraph",
            text: "The main disadvantage is **dilution of ownership**. Each new share issued reduces the existing owners' percentage stake, potentially weakening their control over strategic decisions. Founders may eventually become minority shareholders if too many shares are issued."
          }
        ],
        realExample: {
          emoji: "🎮",
          text: "**Raspberry Pi** floated on the London Stock Exchange in 2024, raising significant capital through its IPO to fund expansion of its computer hardware range. While the IPO gave Raspberry Pi access to large-scale funding, founder Eben Upton's personal ownership stake was reduced as millions of new shares were issued to public investors."
        },
        misconception: "Students write that selling shares means the business goes into debt. Shares are equity, not debt — there is no obligation to repay the capital and no interest is charged. Instead write: share capital is equity finance that provides permanent funds without repayment, but it dilutes the original owners' control and requires dividend payments to attract investors.",
        examMatters: "When comparing debt and equity finance, examiners want you to discuss the trade-off between maintaining control (debt) and avoiding repayment obligations (equity). Always consider the business context — a founder who values control will prefer loans over shares.",
        recall: {
          type: "fillin",
          prompt: "Complete the share capital logic:",
          template: ["Share capital is ___ finance, not debt", "It does not need to be ___ to investors", "The main disadvantage is ___ of ownership and control"],
          answers: ["equity", "repaid", "dilution"],
          hints: ["equ___", "rep___", "dil_____"]
        }
      },
      {
        id: "venture-capital-crowdfunding",
        title: "Venture Capital and Crowdfunding",
        keyIdea: "Venture capitalists invest large sums in high-growth businesses in exchange for equity and influence, while crowdfunding raises smaller sums from many individuals online.",
        body: [
          {
            type: "paragraph",
            text: "**Venture capital** involves professional investors or firms providing substantial funding to businesses with high growth potential, typically in exchange for a significant equity stake and a seat on the board. Venture capitalists bring expertise, contacts and strategic guidance alongside their money."
          },
          {
            type: "paragraph",
            text: "**Crowdfunding** uses online platforms like Kickstarter or Seedrs to raise small amounts from a large number of individuals. It can be **reward-based** (backers receive a product), **equity-based** (backers receive shares) or **donation-based** (backers give for social causes)."
          },
          {
            type: "flow",
            steps: ["Business pitches on platform", "Many small investors contribute", "Target amount reached"],
            result: "Finance raised plus market validation of the idea",
            resultType: "good"
          },
          {
            type: "paragraph",
            text: "Crowdfunding also acts as a marketing tool — it generates publicity and tests whether consumers actually want the product before it is fully developed. However, campaigns that fail to reach their target raise nothing, and sharing the idea publicly risks competitors copying it."
          }
        ],
        realExample: {
          emoji: "🍺",
          text: "**BrewDog** raised over 90 million pounds through its Equity for Punks crowdfunding campaigns, selling shares directly to beer fans online. This gave BrewDog capital to expand internationally while creating a passionate community of investor-customers who actively promoted the brand."
        },
        misconception: "Students assume venture capitalists simply hand over money with no conditions. Venture capitalists typically demand a significant equity stake, board representation and strict performance targets. Instead write: venture capital provides large-scale funding but comes with loss of ownership, strategic influence from the investor, and pressure to deliver rapid growth.",
        examMatters: "When evaluating venture capital or crowdfunding, examiners want you to consider the suitability for the specific business. A high-tech start-up may suit venture capital; a consumer product with broad appeal may suit crowdfunding. Always justify your recommendation with context.",
        recall: {
          type: "reorder",
          prompt: "Order the crowdfunding process from start to finish:",
          correctOrder: ["Business creates a pitch on an online platform", "Many individuals pledge small amounts of money", "Funding target is met and capital is received", "Product is developed and delivered to backers"],
          shuffled: [1, 3, 0, 2]
        }
      }
    ],
    takeaway: [
      "Match finance to purpose: overdrafts for short-term, loans for long-term.",
      "Share capital is permanent with no repayment but dilutes ownership.",
      "Crowdfunding raises finance and validates demand simultaneously.",
      "Venture capital brings expertise but demands equity and influence."
    ]
  },

  /* ═══ Block 4: Forms of Business ═══ */
  {
    title: "Forms of Business",
    quizIndices: [3],
    practiceIndices: [1],
    sections: [
      {
        id: "sole-traders-partnerships",
        title: "Sole Traders and Partnerships",
        keyIdea: "Sole traders and partnerships are simple to set up and give owners direct control, but both carry the burden of unlimited liability.",
        body: [
          {
            type: "paragraph",
            text: "A **sole trader** is an individual who owns and runs a business alone. It is the simplest business structure — there are no legal formation requirements beyond registering with HMRC for tax. The owner makes all decisions, keeps all profits and bears all risk personally."
          },
          {
            type: "paragraph",
            text: "A **partnership** is a business owned by two or more people who share responsibility, decision-making and profits. A formal **deed of partnership** typically sets out how profits are divided, the roles of each partner, and procedures for resolving disputes or admitting new partners."
          },
          {
            type: "flow",
            steps: ["Simple to set up", "Owner keeps all profit", "Unlimited personal liability"],
            result: "Full control but personal assets are at risk",
            resultType: "neutral"
          },
          {
            type: "paragraph",
            text: "Both structures carry **unlimited liability**, meaning the owners are personally responsible for all business debts. If the business fails, creditors can claim against the owner's personal assets — their home, savings and possessions."
          }
        ],
        realExample: {
          emoji: "🔧",
          text: "**Pimlico Plumbers**, founded by Charlie Mullins as a sole trader in 1979, grew into one of London's largest independent plumbing companies. Mullins later converted the business to a limited company to gain the protection of limited liability as the firm's contracts and workforce expanded significantly."
        },
        misconception: "Students assume sole traders always work alone. A sole trader is the sole owner, but they can employ as many staff as they wish. Instead write: sole trader refers to sole ownership, not sole employment — the owner has unlimited liability and retains all profits, but can hire employees to help run the business.",
        examMatters: "Examiners frequently test your understanding of unlimited liability. When discussing sole traders or partnerships, always explain what unlimited liability means in practice — personal assets at risk — and why this might deter some entrepreneurs from choosing this structure.",
        recall: {
          type: "fillin",
          prompt: "Complete the sole trader logic:",
          template: ["A sole trader has ___ liability for business debts", "All ___ belong to the owner but so do all losses", "A deed of partnership sets out how profits are ___"],
          answers: ["unlimited", "profits", "divided"],
          hints: ["unl______", "pro____", "div_____"]
        }
      },
      {
        id: "private-public-limited-companies",
        title: "Private and Public Limited Companies",
        keyIdea: "Limited companies are separate legal entities that protect owners with limited liability, but face more regulation and public disclosure requirements.",
        body: [
          {
            type: "paragraph",
            text: "A **private limited company (Ltd)** is a separate legal entity from its owners. Shares are sold privately and cannot be traded on the stock exchange. This gives owners **limited liability** — they can only lose the amount they invested in shares, not their personal assets."
          },
          {
            type: "paragraph",
            text: "A **public limited company (PLC)** can sell shares to the general public on the stock exchange. PLCs can raise far larger sums of capital than Ltds, but they must comply with extensive regulations including publishing annual accounts and holding annual general meetings."
          },
          {
            type: "flow",
            steps: ["Business incorporates as Ltd or PLC", "Owners' liability limited to investment", "Must file accounts with Companies House"],
            result: "Protection for owners but loss of financial privacy",
            resultType: "neutral"
          },
          {
            type: "paragraph",
            text: "The key trade-off is between access to capital and control. A PLC can raise millions through share issues but risks hostile takeovers if outside investors accumulate a majority stake. An Ltd retains tighter ownership control but has limited access to large-scale funding."
          }
        ],
        realExample: {
          emoji: "🛍️",
          text: "**ASOS** converted from a private limited company to a PLC in 2001, listing on the London Stock Exchange's AIM market. The IPO gave ASOS access to significant investment capital that funded its rapid international expansion, but it also required the company to publish financial results and face public scrutiny from shareholders and analysts."
        },
        misconception: "Students write that limited liability means the business cannot lose money. Limited liability protects the owners personally — the business itself can still lose everything and go bankrupt. Instead write: limited liability means shareholders can only lose the value of their shares, not their personal assets, but the business itself faces no such protection.",
        examMatters: "When comparing business structures, examiners expect a clear distinction between unlimited and limited liability. Use the specific terms Ltd and PLC, explain who can buy shares in each, and evaluate which structure suits the business in the case study based on its size and growth ambitions.",
        recall: {
          type: "reorder",
          prompt: "Order the progression from simplest to most complex structure:",
          correctOrder: ["Sole trader — single owner, unlimited liability", "Partnership — shared ownership, unlimited liability", "Private limited company (Ltd) — limited liability, private shares", "Public limited company (PLC) — shares traded on stock exchange"],
          shuffled: [3, 0, 2, 1]
        }
      }
    ],
    takeaway: [
      "Sole traders keep all profit but face unlimited personal liability.",
      "Limited companies protect owners but require public financial disclosure.",
      "PLCs access more capital than Ltds but risk losing ownership control."
    ]
  },

  /* ═══ Block 5: Liability and Appropriate Finance ═══ */
  {
    title: "Liability and Appropriate Finance",
    quizIndices: [4],
    sections: [
      {
        id: "unlimited-vs-limited-liability",
        title: "Unlimited vs Limited Liability",
        keyIdea: "Unlimited liability puts the owner's personal wealth at risk for all business debts, while limited liability caps losses at the amount invested in shares.",
        body: [
          {
            type: "paragraph",
            text: "**Unlimited liability** means there is no legal distinction between the owner and the business. If the business cannot pay its debts, creditors can pursue the owner's personal assets — house, car, savings. This applies to sole traders and partners in an ordinary partnership."
          },
          {
            type: "paragraph",
            text: "**Limited liability** means the business is a separate legal entity from its owners. Shareholders can only lose the money they invested in purchasing shares. Their personal assets are protected even if the business goes bankrupt. This is one of the most important reasons businesses choose to incorporate."
          },
          {
            type: "flow",
            steps: ["Business fails with debts", "Unlimited: personal assets seized", "Limited: only share value lost"],
            result: "Liability type determines the personal risk to owners",
            resultType: "neutral"
          },
          {
            type: "paragraph",
            text: "The protection of limited liability encourages investment and entrepreneurship because it reduces the personal financial risk. Without it, fewer people would be willing to invest in businesses, and economic growth would be slower."
          }
        ],
        realExample: {
          emoji: "🏪",
          text: "**BHS** collapsed in 2016 with a pension deficit of 571 million pounds, but shareholders under the limited company structure could only lose the value of their shares. Pensioners and creditors bore the financial pain, illustrating both the protection limited liability offers shareholders and its limitations for other stakeholders."
        },
        misconception: "Students confuse limited liability with limited risk. Limited liability only protects personal assets from business debts — the owner still loses their entire investment if the company fails. Instead write: limited liability caps personal losses at the value of shares held, but shareholders still risk losing their full investment in the business.",
        examMatters: "Liability is a fundamental concept that connects to business structure, finance and risk. Examiners expect you to explain its practical implications — why does it matter when choosing between a sole trader and a limited company? Always link liability to the owner's willingness to take financial risk.",
        recall: {
          type: "fillin",
          prompt: "Complete the liability comparison:",
          template: ["Unlimited liability means personal ___ are at risk", "Limited liability caps losses at the amount ___ in shares", "Limited liability encourages more ___ and entrepreneurship"],
          answers: ["assets", "invested", "investment"],
          hints: ["ass___", "inv_____", "inv________"]
        }
      },
      {
        id: "choosing-appropriate-finance",
        title: "Choosing Appropriate Finance",
        keyIdea: "The right source of finance depends on the purpose, amount needed, business stage and the owner's willingness to share control or take on debt.",
        body: [
          {
            type: "paragraph",
            text: "There is no single best source of finance — the appropriate choice depends on several factors. The **purpose** of the finance matters most: short-term cash flow needs suit overdrafts or trade credit, while long-term investments in assets require loans, share capital or retained profit."
          },
          {
            type: "subheading",
            text: "Key Factors in Choosing Finance"
          },
          {
            type: "bullets",
            items: [
              "**Amount required** — small sums suit personal savings or overdrafts; large sums require loans or share capital.",
              "**Time period** — short-term needs suit overdrafts; long-term needs suit loans or equity.",
              "**Business stage** — start-ups rely on owner's capital; established firms can use retained profit.",
              "**Control** — debt finance preserves ownership; equity finance dilutes it."
            ]
          },
          {
            type: "paragraph",
            text: "A common mistake is for businesses to use short-term finance for long-term purposes — for example, funding a factory purchase with an overdraft. This creates dangerous cash flow pressure because the finance can be recalled before the asset generates returns."
          }
        ],
        realExample: {
          emoji: "🚗",
          text: "**Tesla** used a deliberate mix of share capital, government loans and retained profits to fund its gigafactory construction. Elon Musk matched each source to its purpose — equity for long-term capacity building, government loans for green energy eligibility, and retained profit for ongoing operational investment."
        },
        misconception: "Students recommend one source of finance for every situation without considering context. The best answer always depends on the specific circumstances of the business. Instead write: the appropriate source of finance depends on the amount needed, the time horizon, the business stage and the owner's attitude to risk and control.",
        examMatters: "This is a favourite evaluation question. Examiners want you to weigh up at least two options, consider the business context, and reach a justified recommendation. Simply describing sources without applying them to the scenario scores poorly.",
        recall: {
          type: "reorder",
          prompt: "Match the finance source to the most appropriate use:",
          correctOrder: ["Overdraft — covering a temporary cash flow gap", "Bank loan — purchasing a delivery vehicle", "Share capital — funding major international expansion", "Retained profit — upgrading office equipment"],
          shuffled: [2, 3, 0, 1]
        }
      }
    ],
    takeaway: [
      "Unlimited liability risks personal assets; limited caps losses at shares.",
      "Match finance duration to the purpose: short-term need, short-term source.",
      "Context determines the best source — there is no universal answer.",
      "Using short-term finance for long-term needs creates cash flow danger."
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
