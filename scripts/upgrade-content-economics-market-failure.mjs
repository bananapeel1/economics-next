/**
 * SECTION UPGRADE — Market Failure (Economics 1.3.5)
 * ====================================================
 * Edexcel IAL Economics Unit 1, spec point 1.3.5
 * Run with: node scripts/upgrade-content-economics-market-failure.mjs
 */

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL     || 'https://trweeckuswgkenckeqfb.supabase.co',
  process.env.SUPABASE_SERVICE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRyd2VlY2t1c3dna2VuY2tlcWZiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzE0ODY2NywiZXhwIjoyMDg4NzI0NjY3fQ.P9EchrMjfJdouBPIs728fuqVTm5Jq1B0JPsEdCp4IA0'
);

/* ── 1. SETTINGS ──────────────────────────────────────────────────────────── */

const SECTION_SLUG = 'market-failure';
const SUBJECT_ID   = 'economics';

/* ── 2. CONTENT ───────────────────────────────────────────────────────────── */

const CONTENT = [

  /* ═══ Block 1: Types of Market Failure ═══ */
  {
    title: "Types of Market Failure",
    quizIndices: [0],
    sections: [
      {
        id: "what-is-market-failure",
        title: "What Is Market Failure",
        keyIdea: "When free markets left alone fail to allocate resources efficiently, the outcome leaves society worse off than it could be.",
        body: [
          {
            type: "paragraph",
            text: "**Market failure** occurs when the free market mechanism leads to a misallocation of resources, meaning the outcome is not allocatively efficient. In a perfectly functioning market, the price mechanism would ensure that resources flow to where they are valued most. When markets fail, society ends up with too much of some goods and too little of others."
          },
          {
            type: "flow",
            steps: ["Free market operates", "Price signals are distorted", "Resources misallocated"],
            result: "Society gets the wrong mix of goods and services",
            resultType: "bad"
          },
          {
            type: "paragraph",
            text: "You need to understand that market failure is not about markets collapsing entirely. It simply means that the market, left to its own devices, produces an outcome that reduces total welfare. The key types include externalities, public goods, merit and demerit goods, information failures, and monopoly power."
          },
          {
            type: "paragraph",
            text: "Market failure provides the main economic justification for government intervention. If markets allocated resources perfectly, there would be no reason for the state to step in with taxes, subsidies, regulation, or public provision."
          }
        ],
        realExample: {
          emoji: "🏭",
          text: "**China's rapid industrialisation** produced severe air pollution in cities like Beijing, where PM2.5 levels regularly exceeded WHO safe limits by ten times. The market alone failed to account for the health costs imposed on millions of residents, forcing the government to introduce strict emission controls."
        },
        misconception: "Students write \"market failure means the market has completely stopped working.\" Market failure does not mean collapse; it means the market produces an inefficient allocation where total welfare could be improved. Instead write: market failure is a situation where the free market misallocates resources, producing too much or too little of a good.",
        examMatters: "Examiners expect you to define market failure precisely as a misallocation of resources, not just \"when something goes wrong.\" Always link market failure to a specific type, such as externalities or public goods, and explain why the free market produces the wrong quantity. Generic definitions without a mechanism score poorly."
      },
      {
        id: "allocative-inefficiency-deadweight-loss",
        title: "Allocative Inefficiency and Deadweight Loss",
        keyIdea: "When price does not equal marginal cost, the market over- or under-produces, and the lost welfare that results is called deadweight loss.",
        body: [
          {
            type: "paragraph",
            text: "**Allocative efficiency** is achieved when price equals marginal cost (P = MC), meaning resources go to their highest-valued use. At this point, the value consumers place on the last unit exactly matches the cost of producing it. When this condition is not met, you get allocative inefficiency."
          },
          {
            type: "flow",
            steps: ["P does not equal MC", "Too much or too little produced", "Consumer or producer surplus lost"],
            result: "Deadweight loss reduces total welfare",
            resultType: "bad"
          },
          {
            type: "paragraph",
            text: "**Deadweight loss** is the reduction in total economic surplus that occurs when the market does not reach the socially optimal output. You can think of it as the welfare that simply disappears because transactions that would have benefited both buyers and sellers never take place."
          },
          {
            type: "paragraph",
            text: "On a diagram, deadweight loss appears as a triangle between the supply curve, the demand curve, and the actual quantity traded. The larger the gap between the market quantity and the socially optimal quantity, the greater the deadweight loss."
          }
        ],
        realExample: {
          emoji: "💊",
          text: "**Martin Shkreli's Turing Pharmaceuticals** raised the price of Daraprim from $13.50 to $750 per tablet in 2015. This monopoly pricing meant many patients could not access the drug, creating a deadweight loss where willing buyers were priced out of a life-saving transaction."
        },
        misconception: "Students confuse allocative inefficiency with productive inefficiency. Allocative inefficiency means the wrong quantity is being produced relative to what society values, while productive inefficiency means producing at higher cost than necessary. Instead write: allocative inefficiency occurs when P does not equal MC, so the market produces the wrong amount of a good.",
        examMatters: "When drawing deadweight loss diagrams, examiners want you to clearly label the triangle between supply, demand, and the actual output level. Always state what the deadweight loss represents in words: it is welfare that is lost because mutually beneficial trades do not occur. Unlabelled triangles score zero."
      }
    ],
    takeaway: [
      "Market failure means misallocation, not market collapse.",
      "Allocative efficiency requires P = MC at equilibrium.",
      "Deadweight loss is the welfare triangle lost from wrong output.",
      "Market failure justifies government intervention."
    ]
  },

  /* ═══ Block 2: Externalities ═══ */
  {
    title: "Externalities",
    quizIndices: [1],
    practiceIndices: [0],
    diagramRef: "Negative Externality",
    sections: [
      {
        id: "negative-externalities-production",
        title: "Negative Externalities in Production",
        keyIdea: "When firms impose costs on third parties through production, the market overproduces because the true social cost is higher than the private cost.",
        body: [
          {
            type: "paragraph",
            text: "A **negative externality in production** occurs when the production of a good imposes costs on third parties who are not involved in the transaction. The firm's private costs (the costs it actually pays) are lower than the full social costs, because the external costs are borne by others. This means the supply curve the firm acts on understates the true cost to society."
          },
          {
            type: "flow",
            steps: ["Firm produces at private cost", "External costs fall on third parties", "MSC > MPC"],
            result: "Market overproduces beyond the social optimum",
            resultType: "bad"
          },
          {
            type: "paragraph",
            text: "On a diagram, the marginal social cost (MSC) curve lies above the marginal private cost (MPC) curve. The vertical gap between them represents the external cost per unit. The free market produces where MPC = MPB, but the socially optimal output is where MSC = MSB, which is a lower quantity."
          },
          {
            type: "paragraph",
            text: "You should note that overproduction creates a welfare loss triangle between the MSC and MSB curves, from the market quantity back to the social optimum. This is the deadweight loss caused by the externality."
          }
        ],
        realExample: {
          emoji: "🛢️",
          text: "**BP's Deepwater Horizon** oil spill in 2010 released 4.9 million barrels of oil into the Gulf of Mexico, devastating fishing and tourism industries. The production of oil imposed massive external costs on coastal communities, ecosystems, and businesses that had no part in BP's drilling operations."
        },
        misconception: "Students say \"negative externalities only come from pollution.\" While pollution is the most common example, noise, congestion, and visual blight from production also count as negative externalities. Instead write: any cost imposed on uninvolved third parties through the production process is a negative externality.",
        examMatters: "When analysing negative production externalities, examiners expect you to draw the MSC above MPC and identify both the market output and socially optimal output. Always label the welfare loss triangle and explain that the market overproduces because firms ignore external costs in their production decisions."
      },
      {
        id: "negative-externalities-consumption",
        title: "Negative Externalities in Consumption",
        keyIdea: "When consuming a good harms third parties, the market overproduces because consumers ignore the costs they impose on others.",
        body: [
          {
            type: "paragraph",
            text: "A **negative externality in consumption** arises when the consumption of a good or service imposes costs on third parties. Here the private benefit to the consumer exceeds the social benefit because the external harm is not factored into the consumer's decision. The individual enjoys the product but others suffer."
          },
          {
            type: "flow",
            steps: ["Consumer acts on private benefit", "Third parties bear external costs", "MSB < MPB"],
            result: "Market overproduces the good",
            resultType: "bad"
          },
          {
            type: "paragraph",
            text: "On a diagram, the marginal social benefit (MSB) curve lies below the marginal private benefit (MPB) curve. The free market produces where MPC = MPB, but the social optimum is where MSC = MSB. Since MSB is lower, the socially optimal quantity is less than the market quantity."
          },
          {
            type: "paragraph",
            text: "Passive smoking, anti-social behaviour from alcohol, and noise from loud music are all examples you can use. In each case, the consumer gets private enjoyment while imposing unchosen costs on bystanders."
          }
        ],
        realExample: {
          emoji: "🚗",
          text: "**SUV ownership in London** imposes negative consumption externalities through higher pedestrian injury risk and greater CO2 emissions per kilometre. Transport for London data shows SUVs produce roughly 25% more emissions than average cars, yet individual buyers focus only on personal comfort and safety."
        },
        misconception: "Students confuse consumption and production externalities. The key distinction is the source: if the harm comes from making the good, it is a production externality; if it comes from using the good, it is a consumption externality. Instead write: always identify whether the third-party cost arises during the production process or during the act of consumption.",
        examMatters: "Diagrams for negative consumption externalities shift the benefit curve, not the cost curve. Examiners penalise students who draw MSC above MPC for a consumption externality. Remember that the MSB lies below MPB, and the welfare loss triangle sits between these benefit curves from the market output back to the social optimum."
      },
      {
        id: "positive-externalities-production",
        title: "Positive Externalities in Production",
        keyIdea: "When production generates benefits for third parties, the market underproduces because firms cannot capture the full social value they create.",
        body: [
          {
            type: "paragraph",
            text: "A **positive externality in production** occurs when the production of a good creates benefits for third parties beyond those received by the buyer or seller. The social cost of production is effectively lower than the private cost because the external benefits offset some of the burden. This means MSC lies below MPC."
          },
          {
            type: "flow",
            steps: ["Firm produces a good", "Third parties gain spillover benefits", "MSC < MPC"],
            result: "Market underproduces relative to social optimum",
            resultType: "bad"
          },
          {
            type: "paragraph",
            text: "Firms that train workers create positive production externalities because those workers may leave and take their skills to other employers. The training firm bears the full cost but cannot capture all the benefits. Similarly, a beekeeper whose bees pollinate neighbouring farms generates benefits beyond the honey sold."
          },
          {
            type: "paragraph",
            text: "On a diagram, MSC sits below MPC. The socially optimal output is higher than the free market output, meaning the market underproduces. Government can correct this with subsidies to close the gap between private and social costs."
          }
        ],
        realExample: {
          emoji: "🐝",
          text: "**Californian almond farmers** rely on migratory beekeepers who truck hives across the state each spring. The beekeeping industry generates positive production externalities worth billions in crop pollination, far exceeding the revenue from honey sales alone."
        },
        misconception: "Students forget that positive production externalities shift the cost curve, not the benefit curve. Since production creates the spillover, it is the MSC that falls below MPC, not the MSB that rises above MPB. Instead write: for production externalities, always adjust the cost side of the diagram to show the divergence.",
        examMatters: "Positive production externalities are tested less often but catch students off guard. Examiners want you to draw MSC below MPC and clearly show the socially optimal output is greater than the market output. Explain that the market underproduces because firms do not factor in the benefits they create for others."
      },
      {
        id: "positive-externalities-consumption",
        title: "Positive Externalities in Consumption",
        keyIdea: "When consuming a good benefits third parties, the market underproduces because individuals do not value the spillover gains others receive.",
        body: [
          {
            type: "paragraph",
            text: "A **positive externality in consumption** occurs when the consumption of a good or service generates benefits for third parties. The social benefit exceeds the private benefit because the consumer only considers their own gain, ignoring the wider value created. This means MSB lies above MPB."
          },
          {
            type: "flow",
            steps: ["Consumer buys based on private benefit", "Third parties also gain", "MSB > MPB"],
            result: "Market underproduces the good",
            resultType: "bad"
          },
          {
            type: "paragraph",
            text: "Vaccination is the classic example. When you get vaccinated, you protect yourself (private benefit) but also reduce the chance of infecting others (external benefit). Because you only consider your own protection when deciding, the market produces fewer vaccinations than the socially optimal level."
          },
          {
            type: "paragraph",
            text: "Education generates similar spillovers: a more educated workforce raises productivity across the whole economy, reduces crime rates, and improves public health outcomes. These social benefits extend well beyond the individual student."
          }
        ],
        realExample: {
          emoji: "💉",
          text: "**The NHS flu vaccination programme** provides free jabs to at-risk groups because private demand alone would be too low. Public Health England estimates that every pound spent on flu vaccination saves the NHS roughly four pounds in reduced hospitalisations, demonstrating the large positive consumption externality."
        },
        misconception: "Students claim \"education is a public good because it benefits everyone.\" Education is not a public good because it is both excludable and rival. It generates positive consumption externalities, which is a completely different concept. Instead write: education is a merit good with positive consumption externalities, not a public good.",
        examMatters: "When evaluating positive consumption externalities, examiners expect you to draw MSB above MPB and identify the welfare gain from moving to the social optimum. Always explain why the free market underproduces: consumers base decisions on MPB alone and ignore the wider social benefits that their consumption creates."
      }
    ],
    takeaway: [
      "Negative externalities cause overproduction; positive cause underproduction.",
      "Production externalities shift cost curves; consumption shift benefit curves.",
      "The welfare loss triangle shows the cost of the market getting it wrong.",
      "Government uses taxes and subsidies to close the gap."
    ]
  },

  /* ═══ Block 3: Public Goods ═══ */
  {
    title: "Public Goods",
    quizIndices: [2],
    practiceIndices: [1],
    diagramRef: "Public Good",
    sections: [
      {
        id: "characteristics-public-goods",
        title: "Characteristics of Public Goods",
        keyIdea: "Public goods are non-excludable and non-rival, which means the market will not provide them because no one can be charged for using them.",
        body: [
          {
            type: "paragraph",
            text: "A **public good** has two defining characteristics. First, it is **non-excludable**, meaning once the good is provided, you cannot prevent anyone from benefiting, whether they have paid or not. Second, it is **non-rival** (or non-diminishable), meaning one person's consumption does not reduce the amount available for others."
          },
          {
            type: "flow",
            steps: ["Good is non-excludable and non-rival", "No one can be charged", "No firm can earn revenue"],
            result: "Private market will not provide the good",
            resultType: "bad"
          },
          {
            type: "paragraph",
            text: "Street lighting is a classic example. Once a streetlight is on, you cannot stop anyone from benefiting from its light, and one person walking under it does not dim it for the next. National defence works the same way: protecting one citizen does not reduce the protection available to another."
          },
          {
            type: "paragraph",
            text: "Because private firms cannot charge for public goods, there is no profit incentive to produce them. This is a complete market failure: the free market provides zero quantity, even though society clearly values and needs these goods."
          }
        ],
        realExample: {
          emoji: "🚨",
          text: "**The UK's lighthouse system** was historically funded by the government because individual ships could not be excluded from seeing the light. Trinity House, the lighthouse authority, collects dues from ports rather than individual vessels, illustrating why public goods require non-market funding mechanisms."
        },
        misconception: "Students say \"public goods are goods provided by the government.\" The definition is about characteristics, not who provides them. A government-built swimming pool is excludable and rival, so it is not a public good. Instead write: a public good is defined by non-excludability and non-rivalry, regardless of who provides it.",
        examMatters: "Examiners test your ability to apply the two characteristics to specific examples. For any good they mention, you must explain why it is or is not non-excludable and why it is or is not non-rival. Simply naming \"street lights\" without explaining the characteristics earns very few marks."
      },
      {
        id: "free-rider-problem",
        title: "The Free Rider Problem",
        keyIdea: "Because no one can be excluded from a public good, rational individuals will not pay voluntarily, so the good goes unproduced by the market.",
        body: [
          {
            type: "paragraph",
            text: "The **free rider problem** is the central reason why public goods cause market failure. Because public goods are non-excludable, rational individuals have no incentive to pay — they can enjoy the benefit whether they contribute or not. If everyone thinks this way, no one pays, and the good is not produced."
          },
          {
            type: "flow",
            steps: ["Good is non-excludable", "Rational consumer refuses to pay", "Revenue is zero"],
            result: "No private firm produces the good — total market failure",
            resultType: "bad"
          },
          {
            type: "paragraph",
            text: "This creates what economists call a **missing market**. Demand exists — people genuinely want street lighting, flood defences, and national defence — but no market mechanism can reveal that demand because everyone has an incentive to hide their true willingness to pay."
          },
          {
            type: "paragraph",
            text: "The standard solution is government provision funded through taxation. Taxes are compulsory, which eliminates the free rider problem by forcing everyone to contribute. However, this introduces the challenge of determining how much of the public good to provide, since there is no market price signal."
          }
        ],
        realExample: {
          emoji: "🌊",
          text: "**The Thames Barrier** protects 1.4 million people and property worth over 300 billion pounds from flooding. No private firm would build it because every London resident benefits regardless of payment, making it a textbook case of the free rider problem solved by government provision."
        },
        misconception: "Students write \"the free rider problem means people are being lazy or selfish.\" Free riding is economically rational behaviour, not a moral failing. If you cannot be excluded from a benefit, paying is irrational from an individual perspective. Instead write: free riding is a rational response to non-excludability that leads to an collectively inefficient outcome.",
        examMatters: "When explaining the free rider problem, examiners want a logical chain: non-excludability leads to no incentive to pay, which leads to no revenue for firms, which leads to no production. Simply saying \"people free ride\" without explaining why is not enough. Link each step clearly to earn full analysis marks."
      }
    ],
    takeaway: [
      "Public goods are non-excludable and non-rival by definition.",
      "The free rider problem means no one voluntarily pays.",
      "Private markets produce zero public goods — complete failure.",
      "Government uses taxation to fund public good provision."
    ]
  },

  /* ═══ Block 4: Merit Goods & Demerit Goods ═══ */
  {
    title: "Merit Goods & Demerit Goods",
    quizIndices: [3],
    practiceIndices: [2],
    sections: [
      {
        id: "merit-goods",
        title: "Merit Goods",
        keyIdea: "Merit goods are underconsumed because individuals underestimate the private benefits or ignore the positive externalities they generate.",
        body: [
          {
            type: "paragraph",
            text: "A **merit good** is a good that is underconsumed in a free market relative to the socially optimal level. This underconsumption happens for two reasons. First, consumers suffer from **information failure** — they underestimate the private benefits of consuming the good. Second, merit goods generate **positive externalities** that consumers do not factor into their decisions."
          },
          {
            type: "flow",
            steps: ["Consumer undervalues the good", "Positive externalities ignored", "MPB < MSB"],
            result: "Free market underproduces merit goods",
            resultType: "bad"
          },
          {
            type: "paragraph",
            text: "Education and healthcare are the standard examples. A teenager may not fully appreciate how education will raise their lifetime earnings, and they certainly do not consider that their education benefits wider society through higher productivity and lower crime. The market left alone produces less education than is socially optimal."
          },
          {
            type: "paragraph",
            text: "Governments intervene by subsidising merit goods, providing them free at the point of use, or making consumption compulsory. The UK provides free state education and NHS healthcare precisely because the market would underprovide both."
          }
        ],
        realExample: {
          emoji: "📚",
          text: "**Finland's education system** provides free schooling through to university level, funded by taxation. Finnish students consistently rank among the top performers globally in PISA assessments, demonstrating that state provision of this merit good can overcome the information failure that would lead to underconsumption."
        },
        misconception: "Students claim \"merit goods are the same as public goods because the government provides both.\" Merit goods are rival and excludable, so they could be provided by the market — the issue is that the market provides too little, not zero. Instead write: merit goods are underprovided by the market due to information failure and positive externalities, whereas public goods are not provided at all.",
        examMatters: "When discussing merit goods, examiners want you to explain both reasons for underconsumption: information failure about private benefits and ignored positive externalities. Simply saying \"people do not consume enough\" without explaining why is insufficient. Show the examiner you understand the two distinct mechanisms at work."
      },
      {
        id: "demerit-goods",
        title: "Demerit Goods",
        keyIdea: "Demerit goods are overconsumed because individuals overestimate the private benefits or ignore the negative externalities they cause.",
        body: [
          {
            type: "paragraph",
            text: "A **demerit good** is a good that is overconsumed in a free market relative to the socially optimal level. The overconsumption arises for two reasons. First, consumers overestimate the private benefits or underestimate the private costs due to **information failure**. Second, demerit goods generate **negative externalities** that harm third parties."
          },
          {
            type: "flow",
            steps: ["Consumer overvalues the good", "Negative externalities ignored", "MPB > MSB"],
            result: "Free market overproduces demerit goods",
            resultType: "bad"
          },
          {
            type: "paragraph",
            text: "Cigarettes, alcohol, and highly processed junk food are common examples. A smoker underestimates the long-term damage to their own health (information failure) and ignores the costs imposed on others through passive smoking and NHS treatment costs (negative externalities). Both factors push consumption above the social optimum."
          },
          {
            type: "paragraph",
            text: "Governments correct this through indirect taxes, minimum pricing, advertising bans, age restrictions, and public information campaigns. The goal is to reduce consumption to the socially optimal level by closing the gap between private and social valuations."
          }
        ],
        realExample: {
          emoji: "🚬",
          text: "**The UK's tobacco tax** means a pack of cigarettes costs over 14 pounds, with roughly 80% going to the government. Since the 2007 smoking ban and sustained tax rises, adult smoking rates have fallen from 22% to under 13%, showing how policy can correct the overconsumption of a demerit good."
        },
        misconception: "Students write \"demerit goods should be banned because they are harmful.\" Banning creates black markets and removes consumer choice entirely. Economists generally prefer using taxes and information to reduce consumption to the socially optimal level, not zero. Instead write: the goal is to reduce consumption to the social optimum, not to eliminate it entirely.",
        examMatters: "Examiners expect you to mirror the merit good analysis in reverse. Explain both information failure and negative externalities as causes of overconsumption. When evaluating government policies like sugar taxes, consider whether they successfully target the information failure, the externality, or both."
      },
      {
        id: "information-failure-merit-demerit",
        title: "Information Failure",
        keyIdea: "When consumers lack full knowledge about the true costs or benefits of a good, they make choices that leave them and society worse off.",
        body: [
          {
            type: "paragraph",
            text: "**Information failure** is a core reason why merit goods are underconsumed and demerit goods are overconsumed. It occurs when consumers do not have access to, or do not process, complete information about the consequences of their choices. Without accurate information, the decisions people make diverge from what they would choose if fully informed."
          },
          {
            type: "flow",
            steps: ["Consumer lacks full information", "Under- or overestimates true benefit", "Chooses the wrong quantity"],
            result: "Welfare is lower than it could be",
            resultType: "bad"
          },
          {
            type: "paragraph",
            text: "You should recognise that information failure is not the same as stupidity. Even intelligent, rational consumers can make poor choices when they do not have the relevant facts. A young person starting smoking may genuinely not understand the addictive nature of nicotine or the scale of long-term health risks."
          },
          {
            type: "paragraph",
            text: "Governments address information failure directly through mandatory labelling, public health campaigns, and education programmes. These interventions aim to correct the information gap so consumers can make better-informed decisions without restricting their freedom to choose."
          }
        ],
        realExample: {
          emoji: "⚠️",
          text: "**Australia's plain packaging law** for cigarettes, introduced in 2012, removed all branding and required graphic health warnings covering most of the pack. Research published in the BMJ found the policy contributed to a significant decline in smoking prevalence by correcting information failure about health risks."
        },
        misconception: "Students assume \"information failure only affects uneducated consumers.\" Highly educated people also suffer from information failure, particularly regarding complex products like financial services, nutrition, or long-term health consequences. Instead write: information failure affects all consumers when the true costs or benefits of a good are difficult to assess, regardless of education level.",
        examMatters: "When linking information failure to merit and demerit goods, examiners want you to specify what information is missing. Do not just say \"consumers lack information\" — explain whether they underestimate addiction risk, long-term health damage, or future earnings from education. Specificity earns the analysis marks."
      }
    ],
    takeaway: [
      "Merit goods are underconsumed; demerit goods are overconsumed.",
      "Both involve information failure and externalities.",
      "Merit and demerit goods differ from public goods: they are rival and excludable.",
      "Government uses taxes, subsidies, and campaigns to correct consumption."
    ]
  },

  /* ═══ Block 5: Information Failures ═══ */
  {
    title: "Information Failures",
    quizIndices: [4],
    sections: [
      {
        id: "asymmetric-information",
        title: "Asymmetric Information",
        keyIdea: "When one side of a transaction knows more than the other, markets break down because the less-informed party cannot make rational decisions.",
        body: [
          {
            type: "paragraph",
            text: "**Asymmetric information** exists when one party in a transaction has more or better information than the other. This imbalance distorts decision-making and can cause markets to function poorly or even collapse entirely. The party with more information can exploit their advantage at the expense of the less-informed party."
          },
          {
            type: "flow",
            steps: ["One party has superior information", "Other party cannot assess quality or risk", "Trust breaks down"],
            result: "Market produces inefficient or unfair outcomes",
            resultType: "bad"
          },
          {
            type: "paragraph",
            text: "The used car market is the classic example, described by economist George Akerlof as the **market for lemons**. Sellers know whether their car is reliable or a lemon, but buyers cannot tell. Buyers therefore offer low prices to reflect the average quality, which drives good-car owners out, leaving only lemons."
          },
          {
            type: "paragraph",
            text: "Asymmetric information is pervasive: doctors know more than patients, insurance companies know less than policyholders about personal risk, and employers know less about a candidate's true ability than the candidate does. Each imbalance creates the potential for market failure."
          }
        ],
        realExample: {
          emoji: "🚙",
          text: "**Carfax in the United States** built a business solving asymmetric information in used car sales. By providing vehicle history reports covering accidents, service records, and ownership changes, Carfax allows buyers to assess quality, partially correcting the market-for-lemons problem that Akerlof identified."
        },
        misconception: "Students write \"asymmetric information means one side is lying.\" Asymmetric information does not require deception; it simply means one party has more knowledge than the other, which may occur naturally. Instead write: asymmetric information is about unequal access to relevant knowledge, which distorts market outcomes whether or not anyone acts dishonestly.",
        examMatters: "Examiners frequently use the market for lemons as a framework. You must explain the chain clearly: information asymmetry causes buyers to discount quality, which drives out high-quality sellers, which lowers average quality further. This adverse selection spiral is what you need to demonstrate in your answer."
      },
      {
        id: "moral-hazard-adverse-selection",
        title: "Moral Hazard and Adverse Selection",
        keyIdea: "Asymmetric information creates two specific problems: people change behaviour after a deal is struck, and the wrong people are attracted to certain markets.",
        body: [
          {
            type: "paragraph",
            text: "**Moral hazard** occurs when one party changes their behaviour after entering an agreement because they are protected from the consequences. If you take out comprehensive car insurance, you might drive more recklessly because you know the insurer will cover the cost of any accident. The insurer cannot observe your driving behaviour after the policy is signed."
          },
          {
            type: "paragraph",
            text: "**Adverse selection** happens before a transaction, when asymmetric information causes the wrong people to self-select into a market. In health insurance, people who know they are high-risk are most likely to buy coverage, while healthy people opt out because premiums seem too high. This pushes up costs for insurers, raising premiums further and driving more healthy people away."
          },
          {
            type: "flow",
            steps: ["Information is asymmetric", "High-risk individuals self-select", "Premiums rise for everyone"],
            result: "Market may collapse as low-risk people exit",
            resultType: "bad"
          },
          {
            type: "paragraph",
            text: "Both problems are forms of market failure rooted in asymmetric information. Solutions include mandatory insurance, excess charges and no-claims bonuses for moral hazard, and screening, signalling, and regulation for adverse selection."
          }
        ],
        realExample: {
          emoji: "🏦",
          text: "**The 2008 financial crisis** was partly driven by moral hazard. Banks packaged risky mortgages into securities and sold them to investors, transferring the risk while keeping the fees. Because banks no longer bore the consequences of bad lending, they had reduced incentive to check borrowers' ability to repay."
        },
        misconception: "Students mix up moral hazard and adverse selection. Moral hazard is about behaviour changing after a deal is made, while adverse selection is about the wrong people entering the market before a deal. Instead write: moral hazard is a post-agreement problem where behaviour changes; adverse selection is a pre-agreement problem where risky parties self-select.",
        examMatters: "Examiners love insurance market examples for testing these concepts. For full marks, clearly distinguish the timing: adverse selection occurs before the contract is signed, and moral hazard occurs after. Apply each concept to a specific scenario rather than just defining them in the abstract."
      }
    ],
    takeaway: [
      "Asymmetric information means one party knows more than the other.",
      "Adverse selection drives good options out before a deal.",
      "Moral hazard changes behaviour after protection is in place.",
      "Solutions include regulation, screening, and mandatory participation."
    ]
  },

  /* ═══ Block 6: Market Power as Market Failure ═══ */
  {
    title: "Market Power as Market Failure",
    quizIndices: [5],
    practiceIndices: [3],
    sections: [
      {
        id: "monopoly-power-welfare-loss",
        title: "Monopoly Power and Welfare Loss",
        keyIdea: "When a firm has market power it restricts output and raises price above marginal cost, transferring surplus from consumers and creating deadweight loss.",
        body: [
          {
            type: "paragraph",
            text: "**Market power** exists when a firm can influence the price of its product rather than being a price taker. A monopolist or dominant firm maximises profit by producing where marginal revenue equals marginal cost (MR = MC), which results in a price above marginal cost and a quantity below the competitive level."
          },
          {
            type: "flow",
            steps: ["Firm has market power", "Restricts output below competitive level", "Price rises above MC"],
            result: "Consumer surplus transfers to producer, deadweight loss created",
            resultType: "bad"
          },
          {
            type: "paragraph",
            text: "Compared to a competitive market, monopoly power causes three things. Some consumer surplus is transferred to the producer as higher profit. Some consumer surplus is destroyed entirely as deadweight loss. And output is lower, meaning fewer consumers can access the product at all."
          },
          {
            type: "paragraph",
            text: "You should understand that monopoly power is a form of market failure because it leads to allocative inefficiency: price exceeds marginal cost, so resources are not directed to their highest-valued use. Competition authorities like the UK's CMA exist specifically to prevent firms from abusing market dominance."
          }
        ],
        realExample: {
          emoji: "💻",
          text: "**Google** controls over 90% of the global search engine market and has faced multiple antitrust actions. The European Commission fined Google 8.25 billion euros across three cases for abusing its dominant position, arguing that its market power reduced consumer choice and harmed competitors."
        },
        misconception: "Students assume \"monopolies are always bad for consumers.\" Some monopolies achieve massive economies of scale that lower prices below what competitive firms could offer, and they may invest heavily in innovation. Instead write: monopoly power can cause welfare loss, but whether it harms consumers depends on economies of scale, innovation, and how the firm uses its dominance.",
        examMatters: "Examiners expect you to draw a monopoly diagram showing price above MC, output below the competitive level, and the deadweight loss triangle. You must also evaluate: consider whether the monopolist achieves dynamic efficiency through innovation or economies of scale that offset the static welfare loss. One-sided answers score poorly."
      }
    ],
    takeaway: [
      "Monopoly power means P > MC, causing allocative inefficiency.",
      "Deadweight loss arises as output falls below the competitive level.",
      "Consumer surplus transfers to the producer as extra profit.",
      "Evaluation must weigh welfare loss against scale and innovation."
    ]
  },

  /* ═══ Block 7: Welfare Loss & Deadweight Loss ═══ */
  {
    title: "Welfare Loss & Deadweight Loss",
    quizIndices: [6],
    practiceIndices: [4],
    diagramRef: "Deadweight Loss",
    sections: [
      {
        id: "measuring-welfare-loss",
        title: "Measuring Welfare Loss",
        keyIdea: "Welfare loss is measured by the reduction in total economic surplus when the market deviates from the allocatively efficient output.",
        body: [
          {
            type: "paragraph",
            text: "**Total economic surplus** is the sum of consumer surplus and producer surplus in a market. In a perfectly competitive market, total surplus is maximised at the equilibrium where supply meets demand. Any deviation from this point — whether through externalities, monopoly power, or government intervention — reduces total surplus."
          },
          {
            type: "flow",
            steps: ["Identify competitive equilibrium", "Compare actual output to optimum", "Calculate the surplus lost"],
            result: "The difference is the welfare loss or deadweight loss",
            resultType: "neutral"
          },
          {
            type: "paragraph",
            text: "You measure welfare loss by calculating the area of the triangle between the supply curve, the demand curve, and the actual quantity traded. This triangle represents transactions that would have generated net benefit to society but do not occur because the market is distorted."
          },
          {
            type: "paragraph",
            text: "Welfare loss applies to all types of market failure. Whether the distortion comes from a negative externality, a monopolist restricting output, or an indirect tax pushing price above the efficient level, the deadweight loss triangle captures the efficiency cost in each case."
          }
        ],
        realExample: {
          emoji: "📉",
          text: "**The US sugar programme** uses import quotas and price supports that keep domestic sugar prices roughly double the world price. Economists at the American Enterprise Institute estimated the annual deadweight loss to the US economy at over 3 billion dollars in foregone consumer and producer surplus."
        },
        misconception: "Students write \"welfare loss is the same as a fall in consumer surplus.\" Consumer surplus can fall without any welfare loss if it simply transfers to producers. Deadweight loss is surplus that disappears entirely, benefiting no one. Instead write: welfare loss is the total surplus destroyed, not merely redistributed between consumers and producers.",
        examMatters: "When calculating welfare loss on a diagram, examiners want you to clearly identify the three points that form the deadweight loss triangle. State the formula: half base times height, where the base is the difference between market and optimal quantity, and the height is the relevant price or cost gap. Show your working."
      },
      {
        id: "diagrams-welfare-loss",
        title: "Diagrams for Welfare Loss",
        keyIdea: "Every type of market failure produces a deadweight loss triangle on a diagram, and learning to draw each one correctly is essential for exam success.",
        body: [
          {
            type: "paragraph",
            text: "For **negative externalities**, the deadweight loss triangle appears between the MSC curve, the demand curve, and the market quantity. The market overproduces, so the triangle lies to the right of the social optimum. You draw it by marking where the market produces, where it should produce, and the vertical gap between social cost and social benefit."
          },
          {
            type: "paragraph",
            text: "For **positive externalities**, the triangle appears because the market underproduces. The social optimum is to the right of the market output, and the triangle represents the net benefit from additional units that the market fails to produce. The area sits between the MSB and MPC curves from the market output to the social optimum."
          },
          {
            type: "paragraph",
            text: "For **monopoly**, deadweight loss appears between the demand curve and the supply curve (or MC curve), from the monopoly output to the competitive output. The monopolist restricts quantity below the efficient level, and the triangle captures the surplus destroyed by this restriction."
          }
        ],
        realExample: {
          emoji: "📐",
          text: "**Arnold Harberger** pioneered the empirical measurement of deadweight loss from monopoly in his 1954 study of US manufacturing. His estimates suggested the welfare cost of monopoly power was relatively small, sparking decades of debate about whether the so-called Harberger triangles understate the true cost of market power."
        },
        misconception: "Students draw deadweight loss triangles without labelling which curves form the boundaries. An unlabelled triangle could represent anything and earns no marks. Instead write: always label the three sides of the triangle with the relevant curves and clearly state whether the market has over- or under-produced.",
        examMatters: "Diagram accuracy is worth significant marks in economics exams. Examiners check that your curves are correctly positioned, the triangle is in the right place, and your labels match your written explanation. Practise drawing externality, public good, and monopoly diagrams until the welfare loss area becomes second nature."
      }
    ],
    takeaway: [
      "Welfare loss is total surplus destroyed, not just redistributed.",
      "Deadweight loss = 0.5 x quantity gap x price/cost gap.",
      "Every market failure type has its own triangle placement.",
      "Label all diagram curves and shade the welfare loss area."
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
