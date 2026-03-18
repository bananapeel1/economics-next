/**
 * SECTION UPGRADE — Managing People (Business 1.4)
 * ==========================================================
 * Edexcel IAL Business Unit 1, spec point 1.4
 * Run with: node scripts/upgrade-content-business-managing-people.mjs
 */

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL     || 'https://trweeckuswgkenckeqfb.supabase.co',
  process.env.SUPABASE_SERVICE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRyd2VlY2t1c3dna2VuY2tlcWZiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzE0ODY2NywiZXhwIjoyMDg4NzI0NjY3fQ.P9EchrMjfJdouBPIs728fuqVTm5Jq1B0JPsEdCp4IA0'
);

/* ── 1. SETTINGS ──────────────────────────────────────────────────────────── */

const SECTION_SLUG = 'managing-people';
const SUBJECT_ID   = 'business';

/* ── 2. CONTENT ───────────────────────────────────────────────────────────── */

const CONTENT = [

  /* ═══ Block 1: Approaches to Staffing ═══ */
  {
    title: "Approaches to Staffing",
    quizIndices: [0],
    sections: [
      {
        id: "staff-as-asset-vs-cost",
        title: "Staff as Asset vs Cost",
        keyIdea: "Some businesses treat staff as their most valuable resource to develop and retain, while others view them as a cost to minimise.",
        body: [
          {
            type: "paragraph",
            text: "Managers who see employees as an **asset** invest in training, development and welfare because they believe motivated, skilled workers drive long-term profitability. This approach prioritises retention, empowerment and career progression. You will often see this in knowledge-based industries where human capital is the main source of competitive advantage."
          },
          {
            type: "flow",
            steps: ["Invest in training and development", "Staff become more skilled and loyal", "Productivity and quality rise"],
            result: "Higher long-term profitability through people",
            resultType: "good"
          },
          {
            type: "paragraph",
            text: "Managers who see employees as a **cost** focus on minimising labour expenses through low wages, zero-hours contracts and limited training. This approach treats workers as interchangeable and expendable. It can reduce short-term costs but risks high staff turnover, low morale and poor customer service."
          },
          {
            type: "paragraph",
            text: "In practice, most businesses sit somewhere between the two extremes. You should recognise that the approach a business takes depends on its industry, competitive strategy and the skills required from its workforce."
          }
        ],
        realExample: {
          emoji: "🛒",
          text: "**Costco** pays significantly above the industry average and invests heavily in staff training, treating employees as assets. Its staff turnover is just 6% compared to the retail industry average of over 60%, saving millions in recruitment and retraining costs while delivering superior customer service."
        },
        misconception: "Students write \"treating staff as a cost is always bad for business.\" In some industries with high labour turnover and low-skill roles, minimising labour costs can be a rational strategy. Instead write: the best approach depends on the nature of the work, the skills required and the business's competitive strategy.",
        examMatters: "Examiners want you to link the approach to staffing with business performance. Explain the chain: treating staff as assets leads to higher motivation, lower turnover and better productivity, which can outweigh the higher wage costs.",
        recall: {
          type: "reorder",
          prompt: "Put the staff-as-asset chain in the right order:",
          correctOrder: ["Invest in training and development", "Staff motivation and loyalty increase", "Productivity and service quality improve", "Long-term profitability rises"],
          shuffled: [3, 0, 2, 1]
        }
      },
      {
        id: "flexible-workforce",
        title: "Flexible Workforce",
        keyIdea: "A flexible workforce allows a business to adjust the size, skills and working patterns of its labour force to match changing demand.",
        body: [
          {
            type: "paragraph",
            text: "**Workforce flexibility** means a business can quickly adapt its staffing to meet changing needs. There are several forms of flexibility: **numerical flexibility** (adjusting the number of workers through temporary or part-time contracts), **functional flexibility** (multi-skilled workers who can switch between tasks), and **temporal flexibility** (varying working hours through flexi-time or shift patterns)."
          },
          {
            type: "bullets",
            items: [
              "**Part-time contracts** — reduce hours during quiet periods, saving on wage costs.",
              "**Temporary/agency staff** — hire extra workers during peak demand without long-term commitment.",
              "**Zero-hours contracts** — no guaranteed hours; workers are called in as needed.",
              "**Outsourcing** — contracting out non-core functions like IT support or cleaning to specialist firms.",
              "**Multi-skilling** — training staff to perform multiple roles so they can be redeployed as needed."
            ]
          },
          {
            type: "paragraph",
            text: "Flexibility benefits the business through lower fixed labour costs and the ability to respond quickly to demand changes. However, it can harm workers through job insecurity and unpredictable income, which may damage motivation and loyalty."
          }
        ],
        realExample: {
          emoji: "📦",
          text: "**Amazon** hires tens of thousands of temporary workers during the Christmas peak season through its fulfilment centres. This numerical flexibility allows Amazon to handle a 300% surge in orders without carrying the cost of a permanently oversized workforce for the remaining ten months."
        },
        misconception: "Students assume \"flexible working always benefits employees.\" While flexitime and remote working can benefit workers, zero-hours contracts and temporary work often create insecurity and stress. Instead write: flexibility benefits employers through cost control, but the impact on employees depends on the type of flexibility used.",
        examMatters: "When discussing workforce flexibility, examiners expect you to evaluate from both employer and employee perspectives. A strong answer explains how flexibility reduces costs and increases responsiveness while acknowledging the potential impact on staff morale and productivity.",
        recall: {
          type: "fillin",
          prompt: "Complete the flexibility types:",
          template: ["___ flexibility means adjusting the number of workers", "→ ___ flexibility means multi-skilled staff switching roles", "→ ___ flexibility means varying working hours"],
          answers: ["Numerical", "Functional", "Temporal"],
          hints: ["Nu_______", "Fu________", "Te______"]
        }
      },
      {
        id: "dismissal-vs-redundancy",
        title: "Dismissal vs Redundancy",
        keyIdea: "Dismissal removes a worker because of their conduct or capability, while redundancy removes a job because the business no longer needs that role.",
        body: [
          {
            type: "paragraph",
            text: "**Dismissal** is when an employer terminates an employee's contract because of a reason related to the individual — such as persistent poor performance, gross misconduct or inability to do the job. Dismissal must follow a fair procedure; otherwise the employee can claim **unfair dismissal** at an employment tribunal."
          },
          {
            type: "flow",
            steps: ["Employee underperforms or commits misconduct", "Employer follows disciplinary procedure", "Contract is terminated"],
            result: "Dismissal — the person is removed, the job remains",
            resultType: "neutral"
          },
          {
            type: "paragraph",
            text: "**Redundancy** occurs when the job itself is no longer needed — perhaps due to a fall in demand, automation, restructuring or relocation. The employer must follow a fair selection process, consult with affected workers and usually pay **statutory redundancy pay** based on length of service."
          },
          {
            type: "paragraph",
            text: "You must understand this distinction clearly because the legal rights and employer obligations are very different in each case. Redundancy is not the employee's fault, so additional protections apply."
          }
        ],
        realExample: {
          emoji: "🏦",
          text: "**HSBC** announced 35,000 redundancies as part of a restructuring programme to cut costs and shift its focus to Asian markets. These roles were eliminated because the business no longer needed them, not because of individual performance — a textbook example of redundancy driven by strategic change."
        },
        misconception: "Students use \"dismissal\" and \"redundancy\" interchangeably as if both mean firing someone. Dismissal is about the person; redundancy is about the job disappearing. Instead write: dismissal is linked to the employee's conduct or capability, while redundancy is linked to the business no longer needing that particular role.",
        examMatters: "Examiners specifically test whether you can distinguish dismissal from redundancy. In case study questions, identify which situation applies and explain the legal obligations that follow. Confusing the two will lose you marks even if the rest of your analysis is strong.",
        recall: {
          type: "reorder",
          prompt: "Put the redundancy process in the right order:",
          correctOrder: ["Business identifies roles no longer needed", "Employer consults with affected workers", "Fair selection criteria are applied", "Statutory redundancy pay is provided"],
          shuffled: [2, 3, 0, 1]
        }
      },
      {
        id: "employer-employee-relationships",
        title: "Employer-Employee Relationships",
        keyIdea: "The quality of the relationship between employers and employees directly affects motivation, productivity and the risk of industrial disputes.",
        body: [
          {
            type: "paragraph",
            text: "Employer-employee relationships are shaped by how well the two sides communicate, negotiate and resolve disagreements. Strong relationships are built on **trust, fairness and open communication**. When relationships break down, the result can be industrial action — strikes, work-to-rule or overtime bans — which damages productivity and reputation."
          },
          {
            type: "paragraph",
            text: "**Trade unions** represent workers collectively in negotiations with employers over pay, conditions and workplace rights. **Collective bargaining** is the process by which unions and employers negotiate agreements that cover all workers in a group. This gives workers more bargaining power than negotiating individually."
          },
          {
            type: "flow",
            steps: ["Poor communication or unfair treatment", "Trust breaks down", "Industrial action or high turnover"],
            result: "Lost productivity, damaged reputation and higher costs",
            resultType: "bad"
          },
          {
            type: "paragraph",
            text: "You should recognise that good employer-employee relations are a two-way street. Employers who listen to staff concerns, offer fair pay and involve workers in decisions tend to enjoy higher productivity and lower conflict."
          }
        ],
        realExample: {
          emoji: "🚂",
          text: "**British Airways** suffered a series of strikes by cabin crew in 2010 that cost the airline an estimated 150 million pounds in lost revenue. The dispute was triggered by cost-cutting changes to working conditions imposed without adequate consultation, illustrating how poor employer-employee relations can have severe financial consequences."
        },
        misconception: "Students write \"trade unions are bad for businesses because they cause strikes.\" Most union activity is about negotiation, not strikes — unions often improve communication and reduce staff turnover. Instead write: trade unions can benefit businesses by providing a structured channel for communication and helping to resolve disputes before they escalate.",
        examMatters: "When analysing employer-employee relations, examiners want you to consider both perspectives. Explain how good relations benefit productivity and retention, then evaluate by considering the costs of maintaining those relations versus the costs of conflict.",
        recall: {
          type: "fillin",
          prompt: "Complete the key terms:",
          template: ["___ ___ represent workers collectively in negotiations", "→ ___ ___ is the process of negotiating agreements covering all workers in a group", "→ Industrial ___ includes strikes, work-to-rule and overtime bans"],
          answers: ["Trade unions", "Collective bargaining", "action"],
          hints: ["Tr___ un____", "Co________ ba________", "ac____"]
        }
      }
    ],
    takeaway: [
      "Treating staff as assets raises costs but builds loyalty and productivity.",
      "Workforce flexibility helps businesses adapt but can harm employee security.",
      "Dismissal is about the person; redundancy is about the job disappearing.",
      "Strong employer-employee relations reduce conflict and boost performance."
    ]
  },

  /* ═══ Block 2: Recruitment, Selection and Training ═══ */
  {
    title: "Recruitment, Selection and Training",
    quizIndices: [1],
    practiceIndices: [0],
    sections: [
      {
        id: "recruitment-process",
        title: "Recruitment Process",
        keyIdea: "Recruitment is about attracting the right candidates to apply for a vacancy, starting with a clear understanding of the role and the person you need.",
        body: [
          {
            type: "paragraph",
            text: "The recruitment process begins when a business identifies that it needs to fill a role. The first step is to create a **job description** (outlining the duties, responsibilities and reporting lines of the role) and a **person specification** (outlining the qualifications, skills, experience and personal qualities the ideal candidate should have)."
          },
          {
            type: "flow",
            steps: ["Identify vacancy", "Write job description and person specification", "Advertise internally or externally", "Applications received"],
            result: "A pool of suitable candidates to select from",
            resultType: "good"
          },
          {
            type: "paragraph",
            text: "**Internal recruitment** means filling the vacancy from within the existing workforce — through promotion, redeployment or internal advertising. It is cheaper, faster and the candidate already knows the business. However, it limits the pool of talent and may create resentment among those not selected."
          },
          {
            type: "paragraph",
            text: "**External recruitment** means attracting candidates from outside the business — through job sites, recruitment agencies, social media or newspaper advertisements. This brings in fresh ideas and a wider talent pool, but it is more expensive and the new hire is an unknown quantity."
          }
        ],
        realExample: {
          emoji: "☕",
          text: "**Starbucks** uses a combination of internal and external recruitment. Store managers are frequently promoted from barista positions (internal), while specialist roles like marketing and finance are recruited externally. This blend allows Starbucks to reward loyalty while also bringing in fresh expertise."
        },
        misconception: "Students write \"external recruitment is always better because you get more applicants.\" More applicants does not mean better applicants — internal candidates already understand the culture and systems. Instead write: the choice between internal and external recruitment depends on the nature of the role, the urgency of the hire and the skills available within the existing workforce.",
        examMatters: "Examiners frequently ask you to recommend whether a business should recruit internally or externally. Your answer must be justified by the context — consider the level of the role, the cost, the time available and whether the business needs fresh perspectives or continuity.",
        recall: {
          type: "reorder",
          prompt: "Put the recruitment process in the right order:",
          correctOrder: ["Identify the vacancy", "Write job description and person specification", "Advertise the role internally or externally", "Receive and shortlist applications"],
          shuffled: [2, 0, 3, 1]
        }
      },
      {
        id: "selection-methods",
        title: "Selection Methods",
        keyIdea: "Selection is about choosing the best candidate from those who applied, using methods that predict how well they will perform in the role.",
        body: [
          {
            type: "paragraph",
            text: "Once you have a pool of applicants, **selection** is the process of choosing the most suitable person. The goal is to find the candidate who best matches the person specification and is most likely to succeed in the role."
          },
          {
            type: "subheading",
            text: "Common Selection Methods"
          },
          {
            type: "bullets",
            items: [
              "**Interviews** — face-to-face, panel or telephone; allow you to assess personality and communication skills but are subjective and can be affected by interviewer bias.",
              "**Assessment centres** — a combination of exercises, group tasks, presentations and interviews over one or two days; give a rounded view but are expensive and time-consuming.",
              "**Psychometric tests** — standardised tests measuring aptitude, personality or cognitive ability; objective and comparable but may not capture real-world performance.",
              "**Work trials** — the candidate works in the role for a short period; excellent predictor of job performance but impractical for senior or specialised roles."
            ]
          },
          {
            type: "paragraph",
            text: "No single selection method is perfect. You should understand that businesses often combine several methods to reduce the risk of making a poor hiring decision, which can be extremely costly in terms of recruitment expenses, training costs and lost productivity."
          }
        ],
        realExample: {
          emoji: "🔍",
          text: "**Google** famously uses a multi-stage selection process including structured interviews, coding challenges and work-sample tests. Research by Google's People Analytics team found that structured interviews combined with work samples were far better predictors of job performance than traditional unstructured interviews alone."
        },
        misconception: "Students assume \"the interview is the most important part of selection.\" Research consistently shows that unstructured interviews are poor predictors of job performance. Instead write: structured selection methods like work samples and assessment centres are better predictors of future performance than unstructured interviews alone.",
        examMatters: "When recommending a selection method, examiners want you to link your choice to the specific role. A senior management position might warrant an assessment centre, while a part-time retail role might only need an interview and trial shift. Always justify the cost relative to the importance of the hire.",
        recall: {
          type: "fillin",
          prompt: "Complete the selection methods:",
          template: ["___ ___ combine exercises, group tasks and presentations over one or two days", "→ ___ tests measure aptitude, personality or cognitive ability", "→ ___ trials let candidates work in the role for a short period"],
          answers: ["Assessment centres", "Psychometric", "Work"],
          hints: ["As________ ce_____", "Ps__________", "Wo__"]
        }
      },
      {
        id: "training",
        title: "Training",
        keyIdea: "Training develops employee skills and knowledge, improving productivity and quality while also boosting motivation and retention.",
        body: [
          {
            type: "paragraph",
            text: "**Training** is the process of improving employees' skills, knowledge and capabilities so they can perform their roles more effectively. There are three main types: **induction training** (introducing new employees to the business), **on-the-job training** (learning while doing the actual job), and **off-the-job training** (learning away from the workplace, such as courses or workshops)."
          },
          {
            type: "flow",
            steps: ["Identify skills gap", "Deliver targeted training", "Employee performance improves"],
            result: "Higher productivity, quality and staff retention",
            resultType: "good"
          },
          {
            type: "paragraph",
            text: "**On-the-job training** is cheaper and immediately relevant because the employee learns in the actual work environment. However, it can be disruptive, and the quality depends on whoever is doing the training. **Off-the-job training** is often more structured and taught by specialists, but it is more expensive and the employee is away from productive work."
          },
          {
            type: "paragraph",
            text: "You should recognise that training is an investment, not just a cost. Well-trained employees make fewer mistakes, require less supervision and deliver better customer service. Businesses that underinvest in training often suffer from higher error rates, lower morale and greater staff turnover."
          }
        ],
        realExample: {
          emoji: "🍔",
          text: "**McDonald's** runs its own training programme called Hamburger University, which has trained over 275,000 managers since 1961. This investment in structured off-the-job training ensures consistent service standards across 40,000 restaurants worldwide and creates a clear career path that improves staff retention."
        },
        misconception: "Students write \"on-the-job training is always better because it is cheaper.\" Cheaper does not mean more effective — for complex or safety-critical skills, off-the-job training with qualified instructors produces far better results. Instead write: the best type of training depends on the nature of the skills being developed, the budget available and the need for consistency.",
        examMatters: "Examiners want you to evaluate the costs and benefits of different training methods in context. Always link your recommendation to the type of business, the skills required and the budget. A strong answer weighs the cost of training against the cost of not training.",
        recall: {
          type: "reorder",
          prompt: "Put the training investment chain in the right order:",
          correctOrder: ["Identify a skills gap in the workforce", "Deliver on-the-job or off-the-job training", "Employee skills and confidence improve", "Productivity, quality and retention rise"],
          shuffled: [3, 1, 0, 2]
        }
      }
    ],
    takeaway: [
      "Recruitment attracts candidates; selection chooses the best one.",
      "Internal recruitment is faster and cheaper; external brings fresh talent.",
      "Training is an investment that pays back through productivity and retention."
    ]
  },

  /* ═══ Block 3: Organisational Design ═══ */
  {
    title: "Organisational Design",
    quizIndices: [2],
    sections: [
      {
        id: "hierarchy-and-span-of-control",
        title: "Hierarchy and Span of Control",
        keyIdea: "Hierarchy describes the levels of authority in a business, while span of control is the number of subordinates each manager directly oversees.",
        body: [
          {
            type: "paragraph",
            text: "An **organisational hierarchy** shows the levels of management from the most senior (directors) at the top to the most junior (operatives) at the bottom. Each level has authority over the level below. The **chain of command** is the path along which instructions and decisions flow from top to bottom."
          },
          {
            type: "paragraph",
            text: "**Span of control** refers to the number of employees directly managed by one person. A **wide span** means a manager oversees many subordinates; a **narrow span** means they oversee few. The span of control you choose affects the shape of the organisation and the speed of decision-making."
          },
          {
            type: "flow",
            steps: ["Narrow span of control", "More layers of hierarchy needed", "Longer chain of command"],
            result: "Slower communication but closer supervision",
            resultType: "neutral"
          },
          {
            type: "paragraph",
            text: "Factors that influence the ideal span of control include the complexity of the work, the experience of the manager and subordinates, and whether the business uses centralised or decentralised decision-making."
          }
        ],
        realExample: {
          emoji: "🏬",
          text: "**Marks & Spencer** restructured its hierarchy in 2022, reducing management layers from seven to five. This widened the span of control for remaining managers but shortened the chain of command, allowing faster decision-making and saving millions in management salaries."
        },
        misconception: "Students write \"a wide span of control is always better because it is cheaper.\" A wide span only works when tasks are routine and staff are experienced enough to work independently. Instead write: the ideal span of control depends on the complexity of the work, the skills of the team and the management style of the organisation.",
        examMatters: "Examiners love questions linking span of control to communication and motivation. If the span is narrow, explain that communication is slower but supervision is closer. If wide, explain that employees have more autonomy but managers may become overloaded.",
        recall: {
          type: "fillin",
          prompt: "Complete the key terms:",
          template: ["___ of ___ is the number of subordinates one manager directly oversees", "→ ___ of ___ is the path along which decisions flow from top to bottom", "→ A ___ span means more layers and closer supervision"],
          answers: ["Span", "control", "Chain", "command", "narrow"],
          hints: ["Sp__", "co_____", "Ch___", "co_____", "na____"]
        }
      },
      {
        id: "tall-vs-flat-structures",
        title: "Tall vs Flat Structures",
        keyIdea: "Tall structures have many layers and narrow spans giving tight control, while flat structures have few layers and wide spans giving speed and autonomy.",
        body: [
          {
            type: "paragraph",
            text: "A **tall organisational structure** has many levels of hierarchy, a long chain of command and typically narrow spans of control. This allows close supervision and clear career progression paths, but communication is slow and the organisation can be bureaucratic and expensive to run."
          },
          {
            type: "paragraph",
            text: "A **flat organisational structure** has few levels of hierarchy, a short chain of command and wide spans of control. Communication is faster, employees have more responsibility and the business is cheaper to run. However, managers may become overloaded and employees may lack clear promotion routes."
          },
          {
            type: "flow",
            steps: ["Business removes management layers", "Span of control widens", "Employees gain more autonomy"],
            result: "Faster decisions but risk of manager overload",
            resultType: "neutral"
          },
          {
            type: "paragraph",
            text: "The process of removing layers of hierarchy is called **delayering**. Many large businesses have delayered in recent years to cut costs, speed up communication and empower front-line staff. You should evaluate delayering by considering both the cost savings and the potential loss of management expertise."
          }
        ],
        realExample: {
          emoji: "👟",
          text: "**Nike** has a relatively flat organisational structure with only six levels of hierarchy for a company of over 75,000 employees. This enables rapid product development and empowers regional managers to respond quickly to local market trends, which is critical in the fast-moving sportswear industry."
        },
        misconception: "Students assume \"flat structures are always better because they are modern.\" Flat structures work well for creative or fast-moving industries but can create chaos in industries that need strict control, such as healthcare or aviation. Instead write: the best structure depends on the industry, the size of the business and the nature of the work being done.",
        examMatters: "When asked to evaluate a change in organisational structure, examiners want you to consider the trade-offs. Delayering saves costs and speeds communication but may overload remaining managers and reduce promotion opportunities. Always weigh both sides.",
        recall: {
          type: "reorder",
          prompt: "Put the delayering process in the right order:",
          correctOrder: ["Business identifies too many management layers", "Middle management positions are removed", "Remaining managers take on wider spans of control", "Communication speeds up but workload increases"],
          shuffled: [2, 0, 3, 1]
        }
      },
      {
        id: "matrix-structures",
        title: "Matrix Structures",
        keyIdea: "A matrix structure organises staff into cross-functional project teams so they report to both a project manager and a functional manager simultaneously.",
        body: [
          {
            type: "paragraph",
            text: "A **matrix structure** is an organisational design in which employees are grouped by both function (e.g. marketing, finance, operations) and by project or product. Each employee has two bosses — their functional manager and their project manager. This creates a grid (or matrix) of reporting lines."
          },
          {
            type: "flow",
            steps: ["Specialist staff from different functions join a project team", "They report to both functional and project managers"],
            result: "Diverse expertise applied to each project, but dual authority can cause conflict",
            resultType: "neutral"
          },
          {
            type: "paragraph",
            text: "The advantage of a matrix structure is that it brings together specialists from different departments, encouraging **collaboration and knowledge-sharing**. Projects benefit from diverse perspectives, and staff develop broader skills by working across functions."
          },
          {
            type: "paragraph",
            text: "The disadvantage is that having two bosses can create **confusion and conflict** over priorities. Employees may feel pulled in different directions, and decision-making can be slow if the two managers disagree. Matrix structures also require a strong culture of communication and teamwork to function effectively."
          }
        ],
        realExample: {
          emoji: "🚗",
          text: "**Toyota** uses a matrix structure for its vehicle development projects. Engineers from design, manufacturing and marketing work together in cross-functional teams for each new model, while still reporting to their functional departments. This approach helped Toyota develop the Prius hybrid by combining expertise that no single department could provide alone."
        },
        misconception: "Students write \"matrix structures cause confusion so they should be avoided.\" While dual reporting can create tension, many of the world's most innovative companies use matrix structures precisely because cross-functional collaboration drives better outcomes. Instead write: matrix structures require strong communication skills and clear role definitions, but they enable innovation by combining diverse specialist expertise.",
        examMatters: "When evaluating matrix structures, examiners want you to weigh the benefits of cross-functional collaboration against the costs of complexity and potential conflict. A strong answer considers whether the business has the culture and management skills to make a matrix work effectively.",
        recall: {
          type: "fillin",
          prompt: "Complete the matrix structure description:",
          template: ["Employees report to both a ___ manager and a ___ manager", "→ This encourages cross-functional ___ and knowledge-sharing", "→ The risk is ___ and conflict from dual authority"],
          answers: ["functional", "project", "collaboration", "confusion"],
          hints: ["fu________", "pr_____", "co_____________", "co________"]
        }
      }
    ],
    takeaway: [
      "Span of control and hierarchy shape communication speed and supervision.",
      "Tall structures give control; flat structures give speed and autonomy.",
      "Matrix structures enable cross-functional teamwork but risk dual-authority conflict."
    ]
  },

  /* ═══ Block 4: Motivation in Theory ═══ */
  {
    title: "Motivation in Theory",
    quizIndices: [3],
    practiceIndices: [1],
    sections: [
      {
        id: "taylors-scientific-management",
        title: "Taylor's Scientific Management",
        keyIdea: "Frederick Taylor believed workers are motivated primarily by money and that jobs should be scientifically designed for maximum efficiency.",
        body: [
          {
            type: "paragraph",
            text: "**Frederick Winslow Taylor** (1856-1915) developed the theory of **scientific management**, which argued that there is one best way to perform any task. He believed managers should study each job scientifically, break it into small repetitive steps, and then train workers to perform those steps in the most efficient way possible."
          },
          {
            type: "flow",
            steps: ["Study the task scientifically", "Break it into small, repetitive steps", "Select and train workers for each step", "Pay piece-rate to reward output"],
            result: "Maximum efficiency and productivity",
            resultType: "good"
          },
          {
            type: "paragraph",
            text: "Taylor's key assumptions were that workers are motivated primarily by **money** and that they naturally tend to do as little work as possible (what he called \"soldiering\"). His solution was **piece-rate pay** — paying workers per unit of output produced — so that harder work directly translated into higher earnings."
          },
          {
            type: "paragraph",
            text: "While Taylor's ideas dramatically increased factory productivity in the early twentieth century, they reduced jobs to boring, repetitive tasks. This approach treats workers as extensions of machines, ignoring their social and psychological needs."
          }
        ],
        realExample: {
          emoji: "🚗",
          text: "**Henry Ford** applied Taylor's principles to create the moving assembly line in 1913, reducing the time to build a Model T from 12 hours to 93 minutes. However, worker turnover at Ford's factory reached 370% per year because the repetitive work was so demoralising that workers constantly quit."
        },
        misconception: "Students write \"Taylor's theory is outdated and no longer relevant.\" Many modern businesses still use Taylorist principles — Amazon warehouses and fast-food chains break tasks into small, monitored steps. Instead write: Taylor's principles of task specialisation and performance-related pay remain widely used, though most businesses now recognise that money alone does not fully motivate workers.",
        examMatters: "Examiners expect you to know that Taylor assumed workers are motivated by money and that his approach increased efficiency but ignored human needs. When evaluating, link Taylor's ideas to modern businesses that still use piece-rate or output-based pay systems.",
        recall: {
          type: "reorder",
          prompt: "Put Taylor's scientific management process in order:",
          correctOrder: ["Study the task scientifically to find the best method", "Break the job into small, repetitive steps", "Select and train workers for each specific step", "Pay piece-rate to incentivise maximum output"],
          shuffled: [3, 1, 0, 2]
        }
      },
      {
        id: "mayos-human-relations",
        title: "Mayo's Human Relations",
        keyIdea: "Elton Mayo discovered that workers are motivated more by social relationships and feeling valued than by physical conditions or pay alone.",
        body: [
          {
            type: "paragraph",
            text: "**Elton Mayo** (1880-1949) conducted the famous **Hawthorne Studies** at the Western Electric factory in Chicago during the 1920s and 1930s. He originally set out to test whether changes in lighting and working conditions affected productivity — but discovered something far more important."
          },
          {
            type: "paragraph",
            text: "Mayo found that productivity increased regardless of the physical changes made — even when conditions were made worse. The real factor was that workers felt **special and valued** because someone was paying attention to them. This became known as the **Hawthorne Effect**."
          },
          {
            type: "flow",
            steps: ["Workers are observed and consulted", "They feel valued and part of a group", "Motivation and productivity rise"],
            result: "Social needs and recognition drive performance more than pay alone",
            resultType: "good"
          },
          {
            type: "paragraph",
            text: "Mayo concluded that **social relationships**, **teamwork** and **communication** between managers and workers were more important motivators than money or physical conditions. His work launched the **Human Relations school** of management, which emphasised the importance of meeting workers' social and emotional needs."
          }
        ],
        realExample: {
          emoji: "🔍",
          text: "**Google** applies Mayo's principles by creating collaborative workspaces, encouraging team-based projects and holding regular town-hall meetings where employees can question senior leaders directly. Google's emphasis on social connection and employee voice reflects Mayo's finding that feeling valued matters more than physical perks alone."
        },
        misconception: "Students write \"Mayo proved that money does not motivate workers.\" Mayo did not say money is irrelevant — he showed that social factors are also powerful motivators that Taylor had ignored. Instead write: Mayo demonstrated that social needs, recognition and teamwork are important motivators alongside financial rewards.",
        examMatters: "When discussing Mayo, examiners want you to contrast his findings with Taylor's. The key difference is that Taylor focused on money and efficiency while Mayo highlighted social needs and group dynamics. Always name the Hawthorne Studies as the evidence base.",
        recall: {
          type: "fillin",
          prompt: "Complete the Mayo key findings:",
          template: ["The ___ Studies at Western Electric revealed the importance of social factors", "→ The ___ Effect means productivity rises when workers feel observed and valued", "→ Mayo's ___ ___ school emphasised teamwork and communication"],
          answers: ["Hawthorne", "Hawthorne", "Human Relations"],
          hints: ["Ha_______", "Ha_______", "Hu___ Re_______"]
        }
      },
      {
        id: "maslows-hierarchy",
        title: "Maslow's Hierarchy",
        keyIdea: "Maslow argued that people have five levels of needs and you must satisfy lower-level needs before higher-level needs can motivate behaviour.",
        body: [
          {
            type: "paragraph",
            text: "**Abraham Maslow** (1908-1970) proposed that human needs are arranged in a **hierarchy of five levels**. You must satisfy the needs at each level before the next level up becomes a motivator. The levels from bottom to top are: **physiological** (food, water, shelter), **safety** (job security, safe conditions), **social** (belonging, friendship), **esteem** (recognition, status) and **self-actualisation** (reaching your full potential)."
          },
          {
            type: "flow",
            steps: ["Physiological needs met through adequate pay", "Safety needs met through job security", "Social needs met through teamwork", "Esteem and self-actualisation met through recognition and challenge"],
            result: "Fully motivated workforce at every level",
            resultType: "good"
          },
          {
            type: "paragraph",
            text: "For managers, the implication is clear: you cannot motivate workers with recognition and interesting work if their basic pay is too low to live on. Equally, once basic needs are met, simply paying more money has a limited motivational effect — workers then seek belonging, status and personal fulfilment."
          },
          {
            type: "paragraph",
            text: "Critics argue that Maslow's hierarchy is too rigid — people can pursue higher needs even when lower ones are not fully met. The model also assumes all people are motivated in the same way, ignoring cultural and individual differences."
          }
        ],
        realExample: {
          emoji: "🏢",
          text: "**John Lewis Partnership** addresses multiple levels of Maslow's hierarchy: competitive salaries cover physiological and safety needs, the partnership structure creates belonging, the annual bonus and \"Partner\" title satisfy esteem needs, and opportunities for career development target self-actualisation."
        },
        misconception: "Students write \"once a need is satisfied it no longer motivates.\" Maslow said lower needs must be broadly satisfied before higher ones dominate, but needs can resurface — a threat of redundancy instantly reactivates safety needs. Instead write: lower-level needs must be broadly met for higher-level needs to become the primary motivator, but previously satisfied needs can become dominant again if threatened.",
        examMatters: "Examiners expect you to apply Maslow to a business context — do not just describe the five levels. Explain which level a particular policy targets. For example, team-building activities target social needs, while profit-sharing targets esteem. Always evaluate by noting the theory's limitations.",
        recall: {
          type: "reorder",
          prompt: "Put Maslow's hierarchy in order from lowest to highest:",
          correctOrder: ["Physiological needs (food, shelter, pay)", "Safety needs (job security, safe conditions)", "Social needs (belonging, teamwork)", "Esteem needs (recognition, status)"],
          shuffled: [2, 3, 0, 1]
        }
      },
      {
        id: "herzbergs-two-factor-theory",
        title: "Herzberg's Two-Factor Theory",
        keyIdea: "Herzberg found that satisfaction and dissatisfaction have different causes — hygiene factors prevent complaints but only motivators create drive.",
        body: [
          {
            type: "paragraph",
            text: "**Frederick Herzberg** (1923-2000) researched what made workers satisfied or dissatisfied with their jobs and discovered that the two sets of factors were completely different. He called them **motivators** (factors that create genuine job satisfaction) and **hygiene factors** (factors that prevent dissatisfaction but do not themselves create motivation)."
          },
          {
            type: "subheading",
            text: "The Two Factors"
          },
          {
            type: "bullets",
            items: [
              "**Motivators** — achievement, recognition, the work itself, responsibility, advancement and personal growth. These create genuine satisfaction and drive.",
              "**Hygiene factors** — pay, working conditions, company policies, job security, supervision and relationships with colleagues. If these are poor, workers become dissatisfied; if adequate, dissatisfaction is removed but motivation is not created."
            ]
          },
          {
            type: "flow",
            steps: ["Fix hygiene factors (pay, conditions)", "Dissatisfaction removed, but not motivated", "Add motivators (recognition, responsibility)"],
            result: "Genuine motivation and job satisfaction created",
            resultType: "good"
          },
          {
            type: "paragraph",
            text: "The practical implication is powerful: simply raising pay or improving the office will not motivate workers — it just stops them complaining. To truly motivate, you must give workers challenging work, recognition for achievement, autonomy and opportunities for growth."
          }
        ],
        realExample: {
          emoji: "🛋️",
          text: "**IKEA** applies Herzberg's theory by ensuring strong hygiene factors (above-average pay, good working conditions, staff discounts) while also building in motivators. Employees are given responsibility for their department's visual merchandising and encouraged to propose store improvements, creating genuine engagement beyond just acceptable conditions."
        },
        misconception: "Students write \"pay is a motivator according to Herzberg.\" Herzberg explicitly classified pay as a hygiene factor — it prevents dissatisfaction but does not create lasting motivation. Instead write: Herzberg argued that pay is a hygiene factor; once it is adequate, additional pay has diminishing motivational impact compared to factors like recognition and responsibility.",
        examMatters: "This is one of the most commonly tested theories. Examiners want you to distinguish clearly between motivators and hygiene factors. A classic mistake is putting pay in the wrong category. Remember: hygiene factors prevent dissatisfaction; motivators create satisfaction. They are not two ends of the same scale.",
        recall: {
          type: "fillin",
          prompt: "Complete the Herzberg classification:",
          template: ["___ factors prevent dissatisfaction but do not motivate (e.g. pay, conditions)", "→ ___ create genuine satisfaction and drive (e.g. recognition, responsibility)", "→ According to Herzberg, pay is a ___ factor, not a motivator"],
          answers: ["Hygiene", "Motivators", "hygiene"],
          hints: ["Hy_____", "Mo________", "hy_____"]
        }
      }
    ],
    takeaway: [
      "Taylor: workers motivated by money; break tasks into efficient steps.",
      "Mayo: social needs and recognition matter more than physical conditions.",
      "Maslow: five levels of needs from basic survival to self-actualisation.",
      "Herzberg: fix hygiene factors to stop complaints; add motivators for drive."
    ]
  },

  /* ═══ Block 5: Motivation in Practice ═══ */
  {
    title: "Motivation in Practice",
    quizIndices: [4],
    practiceIndices: [2],
    sections: [
      {
        id: "financial-methods",
        title: "Financial Methods",
        keyIdea: "Financial methods of motivation use monetary rewards to incentivise performance, but their effectiveness depends on the nature of the work and the worker.",
        body: [
          {
            type: "paragraph",
            text: "**Financial motivation** involves using money-based incentives to encourage workers to perform better. Common methods include **piece-rate pay** (paid per unit produced), **commission** (percentage of sales value), **performance-related pay** (bonuses linked to targets), **profit sharing** (distributing a share of profits to all employees) and **share ownership** (giving employees shares in the company)."
          },
          {
            type: "subheading",
            text: "Key Financial Methods"
          },
          {
            type: "bullets",
            items: [
              "**Piece-rate** — directly links pay to output; motivates quantity but can reduce quality.",
              "**Commission** — common in sales roles; drives revenue but can encourage aggressive selling.",
              "**Performance-related pay (PRP)** — bonuses for meeting targets; must be based on fair, measurable criteria.",
              "**Profit sharing** — all employees share in company profits; builds collective ownership but individual impact feels small.",
              "**Share ownership** — employees become part-owners; aligns interests with shareholders but share prices can fall."
            ]
          },
          {
            type: "paragraph",
            text: "You should recognise that financial methods work best when output is measurable and individual effort directly affects results. In roles that require creativity, teamwork or long-term relationship building, financial incentives can sometimes distort behaviour and reduce intrinsic motivation."
          }
        ],
        realExample: {
          emoji: "🏦",
          text: "**Wells Fargo** staff opened millions of fake bank accounts to meet aggressive sales targets tied to commission and bonuses. This scandal demonstrated how poorly designed financial incentives can drive unethical behaviour, costing the bank over 3 billion dollars in fines and destroying customer trust."
        },
        misconception: "Students write \"financial methods always motivate workers to perform better.\" Herzberg's research showed that money is a hygiene factor — it prevents dissatisfaction but does not create lasting motivation. Instead write: financial methods can drive short-term performance, but their long-term effectiveness depends on the nature of the role and whether they are complemented by non-financial motivators.",
        examMatters: "Examiners expect you to evaluate financial methods, not just describe them. Link back to motivation theory — Taylor would support piece-rate, but Herzberg would argue it only addresses hygiene needs. Always consider whether the method might create unintended consequences.",
        recall: {
          type: "reorder",
          prompt: "Put the financial incentive evaluation chain in order:",
          correctOrder: ["Business sets financial targets or incentives", "Workers focus effort on measurable outputs", "Short-term performance may improve", "Risk of unintended consequences if targets are poorly designed"],
          shuffled: [2, 0, 3, 1]
        }
      },
      {
        id: "non-financial-methods",
        title: "Non-Financial Methods",
        keyIdea: "Non-financial methods motivate by making work more interesting, giving employees responsibility and recognising their contribution.",
        body: [
          {
            type: "paragraph",
            text: "**Non-financial motivation** involves making the job itself more rewarding without directly increasing pay. Key methods include **job enrichment** (adding more challenging and meaningful tasks), **job enlargement** (widening the range of tasks at the same level), **job rotation** (moving between different tasks to reduce boredom), **empowerment** (giving employees authority to make decisions) and **teamworking** (organising staff into self-managing teams)."
          },
          {
            type: "subheading",
            text: "Key Non-Financial Methods"
          },
          {
            type: "bullets",
            items: [
              "**Job enrichment** — adds depth and challenge; directly addresses Herzberg's motivators.",
              "**Job enlargement** — adds variety but not necessarily challenge; can feel like more work for the same pay.",
              "**Job rotation** — reduces monotony and builds multi-skilled workers; supports functional flexibility.",
              "**Empowerment** — gives workers authority and ownership; boosts esteem and self-actualisation (Maslow).",
              "**Teamworking** — satisfies social needs (Mayo); encourages collaboration and shared responsibility."
            ]
          },
          {
            type: "paragraph",
            text: "Non-financial methods tend to address Herzberg's motivators and Maslow's higher-level needs. They are often more sustainable than financial incentives because they make the work itself fulfilling. However, they require good management, trust and a willingness to delegate, which not all businesses are ready for."
          }
        ],
        realExample: {
          emoji: "🎮",
          text: "**Valve Corporation** (the company behind Steam) has no formal management hierarchy. Employees choose which projects to work on, move their desks to join different teams, and are empowered to make major decisions without managerial approval. This extreme empowerment model has made Valve one of the most profitable companies per employee in the technology industry."
        },
        misconception: "Students confuse job enrichment with job enlargement. Enrichment adds challenge and responsibility (vertical loading); enlargement just adds more tasks at the same level (horizontal loading). Instead write: job enrichment gives workers more challenging and meaningful tasks, while job enlargement simply increases the number of tasks without adding depth.",
        examMatters: "When recommending a motivational method, examiners want you to link your choice to a specific motivation theory. Job enrichment links to Herzberg's motivators; teamworking links to Mayo's social needs; empowerment links to Maslow's esteem and self-actualisation. Theory-linked answers score highest.",
        recall: {
          type: "fillin",
          prompt: "Complete the non-financial methods:",
          template: ["Job ___ adds challenge and responsibility (vertical loading)", "→ Job ___ adds more tasks at the same level (horizontal loading)", "→ ___ gives workers authority to make decisions without managerial approval"],
          answers: ["enrichment", "enlargement", "Empowerment"],
          hints: ["en________", "en_________", "Em__________"]
        }
      }
    ],
    takeaway: [
      "Financial methods drive short-term output but risk unintended behaviour.",
      "Non-financial methods build lasting motivation by making work fulfilling.",
      "The best approach combines financial hygiene with non-financial motivators."
    ]
  },

  /* ═══ Block 6: Leadership Styles ═══ */
  {
    title: "Leadership Styles",
    quizIndices: [5],
    sections: [
      {
        id: "management-vs-leadership",
        title: "Management vs Leadership",
        keyIdea: "Managers focus on organising, controlling and maintaining systems, while leaders focus on inspiring, motivating and driving change.",
        body: [
          {
            type: "paragraph",
            text: "**Management** involves planning, organising, coordinating and controlling resources to achieve objectives. A manager's role is to ensure that day-to-day operations run smoothly, budgets are met and staff follow established procedures. Management is about doing things right."
          },
          {
            type: "paragraph",
            text: "**Leadership** involves setting a vision, inspiring others and driving change. A leader motivates people to go beyond their basic duties and achieve ambitious goals. Leadership is about doing the right things. You should understand that both are essential — a business needs managers to keep things running and leaders to set direction."
          },
          {
            type: "flow",
            steps: ["Manager organises and controls day-to-day operations", "Leader sets vision and inspires the team"],
            result: "Both roles are needed for a business to function and grow",
            resultType: "neutral"
          },
          {
            type: "paragraph",
            text: "In practice, the same person often needs to be both a manager and a leader. The balance depends on the situation — a crisis may demand strong leadership, while routine operations may require effective management."
          }
        ],
        realExample: {
          emoji: "🚀",
          text: "**Elon Musk** at Tesla exemplifies the difference between leadership and management. Musk sets the bold vision of accelerating the world's transition to sustainable energy (leadership), while Tesla's operations team ensures that factories run efficiently and cars are delivered on time (management)."
        },
        misconception: "Students write \"leadership is more important than management.\" Both are essential — a visionary leader without good management will have chaos, and a well-managed business without leadership will stagnate. Instead write: leadership and management are complementary — businesses need leaders to set direction and managers to ensure efficient execution.",
        examMatters: "Examiners often ask you to distinguish between management and leadership in the context of a case study. Identify specific actions that demonstrate each role and explain why both are needed. Avoid claiming one is better than the other without considering the business context.",
        recall: {
          type: "reorder",
          prompt: "Match the focus to the correct role:",
          correctOrder: ["Management: planning, organising and controlling resources", "Management: ensuring day-to-day operations run smoothly", "Leadership: setting a vision and inspiring others", "Leadership: driving change and motivating ambitious goals"],
          shuffled: [3, 0, 2, 1]
        }
      },
      {
        id: "leadership-styles",
        title: "Leadership Styles",
        keyIdea: "Different situations call for different leadership styles, from autocratic control to democratic participation to laissez-faire freedom.",
        body: [
          {
            type: "paragraph",
            text: "An **autocratic** (or authoritarian) leader makes decisions alone without consulting the workforce. Communication is top-down. This style works well in crisis situations, when decisions must be made quickly, or when workers are inexperienced. However, it can demotivate skilled workers who want a voice in decisions."
          },
          {
            type: "paragraph",
            text: "A **democratic** (or participative) leader involves employees in decision-making, encourages discussion and values input from the team. This builds motivation and commitment but can be slow when quick decisions are needed. It works best with skilled, experienced staff who can contribute meaningfully."
          },
          {
            type: "paragraph",
            text: "A **laissez-faire** leader takes a hands-off approach, giving employees freedom to make their own decisions and manage their own work. This can unleash creativity and innovation in highly skilled teams but risks a lack of direction and coordination if workers are not self-motivated."
          },
          {
            type: "flow",
            steps: ["Autocratic: leader decides alone", "Democratic: leader consults team", "Laissez-faire: leader delegates fully"],
            result: "The best style depends on the situation, task and workforce",
            resultType: "neutral"
          }
        ],
        realExample: {
          emoji: "🍎",
          text: "**Steve Jobs** at Apple was famously autocratic in product design decisions — he personally rejected hundreds of prototypes until they met his standards. Yet Apple's software teams operated more democratically, with engineers debating approaches openly. This shows that effective leaders often adapt their style to the situation."
        },
        misconception: "Students write \"democratic leadership is always the best style.\" While it builds motivation and commitment, democratic leadership is too slow for emergencies and ineffective when workers lack the expertise to contribute. Instead write: the most effective leaders adapt their style to fit the situation, the task and the capabilities of the workforce.",
        examMatters: "Examiners test whether you can recommend an appropriate leadership style for a given scenario. Your answer must be context-dependent — consider the experience of the workforce, the urgency of the situation and the culture of the organisation. Never claim one style is universally best.",
        recall: {
          type: "fillin",
          prompt: "Complete the leadership styles:",
          template: ["___ leaders make decisions alone with top-down communication", "→ ___ leaders involve employees in decision-making", "→ ___-___ leaders take a hands-off approach, delegating fully"],
          answers: ["Autocratic", "Democratic", "Laissez-faire"],
          hints: ["Au________", "De________", "La_____-fa___"]
        }
      },
      {
        id: "from-entrepreneur-to-leader",
        title: "From Entrepreneur to Leader",
        keyIdea: "As a business grows, the founder must transition from doing everything themselves to delegating, building a team and leading through others.",
        body: [
          {
            type: "paragraph",
            text: "In the early stages of a business, the entrepreneur typically does everything — from product development and sales to bookkeeping and customer service. This hands-on involvement is essential when the business is small and resources are limited."
          },
          {
            type: "flow",
            steps: ["Entrepreneur does everything", "Business grows beyond one person's capacity", "Founder must hire, delegate and lead a team"],
            result: "Successful transition enables further growth; failure to delegate limits the business",
            resultType: "neutral"
          },
          {
            type: "paragraph",
            text: "As the business grows, the founder must transition from being a doer to being a leader. This means **hiring skilled people**, **delegating authority**, **building management systems** and **setting strategic direction** rather than handling daily tasks. Many entrepreneurs struggle with this transition because they find it hard to let go of control."
          },
          {
            type: "paragraph",
            text: "You should recognise that the skills needed to start a business are different from those needed to lead a larger organisation. The creativity and risk-taking that drive a start-up must be complemented by strategic thinking, people management and the ability to build a sustainable organisational culture."
          }
        ],
        realExample: {
          emoji: "📱",
          text: "**Mark Zuckerberg** at Facebook (now Meta) hired Sheryl Sandberg as COO in 2008 specifically to handle the operational and business side while he focused on product vision and technology. This delegation allowed Facebook to scale from 100 million to over 2 billion users by combining entrepreneurial vision with professional management."
        },
        misconception: "Students assume \"the founder should always remain CEO as the business grows.\" Many founders are brilliant at starting businesses but lack the management skills to run a large organisation. Instead write: the founder's role should evolve as the business grows, and sometimes the best decision is to bring in professional managers while the founder focuses on innovation and vision.",
        examMatters: "Examiners may present a case study of a growing business and ask you to evaluate the challenges the founder faces. Focus on the tension between maintaining the entrepreneurial spirit and building the systems and structures needed for a larger organisation.",
        recall: {
          type: "reorder",
          prompt: "Put the entrepreneur-to-leader transition in order:",
          correctOrder: ["Entrepreneur does everything in the start-up phase", "Business grows beyond one person's capacity", "Founder hires skilled people and begins delegating", "Leader focuses on vision and strategy, not daily tasks"],
          shuffled: [3, 1, 0, 2]
        }
      }
    ],
    takeaway: [
      "Managers control operations; leaders inspire and drive change.",
      "Autocratic, democratic and laissez-faire styles suit different situations.",
      "Effective leaders adapt their style to the task and the workforce.",
      "Growing businesses need founders who can transition from doer to leader."
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
