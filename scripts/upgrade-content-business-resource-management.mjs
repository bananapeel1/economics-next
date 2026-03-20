/**
 * SECTION UPGRADE — Resource Management (Business 2)
 * ==========================================================
 * Edexcel IAL Business Unit 2, Resource Management
 * Run with: node scripts/upgrade-content-business-resource-management.mjs
 */

import { supabase } from './_db.mjs';

/* ── 1. SETTINGS ──────────────────────────────────────────────────────────── */

const SECTION_SLUG = 'resource-management';
const SUBJECT_ID   = 'business';

/* ── 2. CONTENT ───────────────────────────────────────────────────────────── */

const CONTENT = [

  /* ═══ Block 1: Methods of Production ═══ */
  {
    title: "Methods of Production",
    quizIndices: [0],
    sections: [
      {
        id: "job-batch-flow-production",
        title: "Job, Batch and Flow Production",
        keyIdea: "Businesses choose between job, batch or flow production depending on the volume of output required and the degree of customisation customers demand.",
        body: [
          {
            type: "paragraph",
            text: "**Job production** means making one unique product at a time to meet a specific customer order. Examples include a tailor-made wedding dress, a custom-built house or a bespoke piece of furniture. Each item is different, and the work is often highly skilled and labour-intensive."
          },
          {
            type: "paragraph",
            text: "**Batch production** involves producing a set quantity of identical items at the same time before switching to a different product. A bakery making 200 white loaves, then switching to 200 wholemeal loaves, is using batch production. It offers more flexibility than flow production while still achieving some economies of scale."
          },
          {
            type: "flow",
            steps: ["Low volume, unique items", "Medium volume, grouped runs", "High volume, continuous output"],
            result: "Job → Batch → Flow as volume increases",
            resultType: "neutral"
          },
          {
            type: "paragraph",
            text: "**Flow production** (also called continuous production) involves items moving continuously along an assembly line, with each stage adding to the product. Car manufacturing, bottled-water plants and food processing all use flow production. It delivers the lowest unit cost but requires heavy capital investment and offers little flexibility."
          }
        ],
        realExample: {
          emoji: "🚗",
          text: "**Toyota** uses flow production across its global assembly plants, producing roughly one car every 60 seconds on its most efficient lines. This continuous process allows Toyota to spread fixed costs over millions of units, keeping average costs among the lowest in the industry."
        },
        misconception: "Students write \"flow production is always the best method because it is cheapest.\" That ignores the enormous start-up cost and total lack of customisation that flow requires. Instead write: flow production minimises unit costs at high volumes, but job or batch methods are more appropriate when customers need customisation or output volumes are low.",
        examMatters: "When asked to recommend a production method, examiners expect you to link your choice to the nature of the product, the volume of demand and the resources available. Simply naming a method without explaining why it fits the context will not earn analysis marks."
      },
      {
        id: "productivity",
        title: "Productivity",
        keyIdea: "Productivity measures output per unit of input, and raising it is the single most powerful way a business can reduce unit costs without cutting quality.",
        body: [
          {
            type: "paragraph",
            text: "**Productivity** is a measure of efficiency — it calculates how much output is produced per unit of input over a given period. The most common measure is **labour productivity**: output per worker per time period. If a factory employs 50 workers and produces 10,000 units per week, labour productivity is 200 units per worker per week."
          },
          {
            type: "flow",
            steps: ["Invest in training or technology", "Output per worker rises", "Unit costs fall"],
            result: "Higher competitiveness and potential profit",
            resultType: "good"
          },
          {
            type: "paragraph",
            text: "Businesses can improve productivity through **better training**, **investment in technology**, **improved motivation** and **more efficient processes**. Higher productivity means a firm can produce the same output with fewer resources or more output with the same resources, directly reducing average costs."
          },
          {
            type: "paragraph",
            text: "However, pushing for higher productivity can have downsides. Workers may feel pressured, leading to stress and higher staff turnover. Quality may slip if speed is prioritised over care. Sustainable productivity gains usually require investment in people as well as equipment."
          }
        ],
        realExample: {
          emoji: "📦",
          text: "**Amazon** invested over $1 billion in warehouse robotics between 2012 and 2022, with Kiva robots reducing the time to process an order from over 60 minutes to under 15. This productivity leap allowed Amazon to offer same-day delivery while keeping fulfilment costs below those of most competitors."
        },
        misconception: "Students confuse productivity with production. Production is the total quantity of output, while productivity is output per unit of input. Instead write: a factory can increase production by hiring more workers, but productivity only rises if each worker produces more output than before.",
        examMatters: "Examiners frequently test whether you can calculate labour productivity and explain its significance. Always link productivity improvements to unit costs and competitiveness, and evaluate whether gains are sustainable or come at the expense of worker wellbeing."
      },
      {
        id: "labour-vs-capital-intensive",
        title: "Labour-Intensive vs Capital-Intensive Production",
        keyIdea: "Labour-intensive production relies mainly on human workers, while capital-intensive production relies mainly on machinery, and the right balance depends on the product.",
        body: [
          {
            type: "paragraph",
            text: "**Labour-intensive** production uses a high proportion of workers relative to machinery. It is common in service industries, craft manufacturing and agriculture in developing countries. The main advantage is flexibility — workers can adapt to changing customer requirements, provide personal service and handle non-standard tasks."
          },
          {
            type: "paragraph",
            text: "**Capital-intensive** production uses a high proportion of machinery and technology relative to workers. It is typical in mass manufacturing, chemical processing and automated warehouses. The key advantage is consistency — machines produce identical output at high speed with low variable cost per unit."
          },
          {
            type: "flow",
            steps: ["Assess product type and volume", "Compare labour vs capital costs", "Choose appropriate mix"],
            result: "Optimal balance between flexibility and efficiency",
            resultType: "good"
          },
          {
            type: "paragraph",
            text: "Most businesses use a combination of both. The decision depends on the **nature of the product**, the **cost of labour vs capital**, the **volume of output** needed, and the **level of customisation** customers expect. A shift towards capital intensity often requires large upfront investment but reduces long-run unit costs."
          }
        ],
        realExample: {
          emoji: "👔",
          text: "**Savile Row tailors** like Huntsman & Sons use labour-intensive production, with a single bespoke suit requiring over 80 hours of skilled hand-stitching. This justifies prices above £5,000, because the craftsmanship and personalisation cannot be replicated by machines."
        },
        misconception: "Students claim \"capital-intensive production is always more efficient than labour-intensive.\" That ignores industries where human judgement, creativity or personal service is the product itself. Instead write: capital-intensive methods reduce unit costs in high-volume standardised production, but labour-intensive methods are more efficient when customisation, creativity or personal service is essential.",
        examMatters: "When analysing whether a business should become more capital-intensive, examiners want you to weigh the upfront investment cost against the long-run savings. Consider the impact on the workforce, product quality and the firm's ability to respond to changing demand."
      }
    ],
    takeaway: [
      "Job, batch and flow suit different volumes and customisation levels.",
      "Productivity is output per input — the key driver of lower unit costs.",
      "Labour intensity offers flexibility; capital intensity offers low unit costs.",
      "The best method depends on the product, market and resources available."
    ]
  },

  /* ═══ Block 2: Capacity Utilisation ═══ */
  {
    title: "Capacity Utilisation",
    quizIndices: [1],
    practiceIndices: [0],
    sections: [
      {
        id: "capacity-utilisation",
        title: "Capacity Utilisation",
        keyIdea: "Capacity utilisation measures what percentage of a firm's maximum possible output is actually being used, and operating well below full capacity wastes resources.",
        body: [
          {
            type: "paragraph",
            text: "**Capacity utilisation** is the proportion of a firm's total possible output that is actually being produced. It is calculated as: (actual output / maximum possible output) x 100. If a factory can produce 10,000 units per month but is only making 7,000, its capacity utilisation is 70%."
          },
          {
            type: "flow",
            steps: ["Low demand hits the business", "Capacity utilisation falls", "Fixed costs spread over fewer units"],
            result: "Higher unit costs and squeezed profit margins",
            resultType: "bad"
          },
          {
            type: "paragraph",
            text: "High capacity utilisation is generally desirable because it means fixed costs are spread over more units of output, reducing the **average cost per unit**. However, operating at 100% capacity for extended periods can cause problems — machinery may break down more often, workers may become stressed, and there is no slack to handle unexpected surges in demand."
          },
          {
            type: "paragraph",
            text: "The ideal level is typically around 85-90%, which balances efficiency with the flexibility to respond to demand changes. Businesses with consistently low capacity utilisation may need to rationalise by closing production lines, reducing shifts or finding new markets."
          }
        ],
        realExample: {
          emoji: "✈️",
          text: "**British Airways** closely monitors seat capacity utilisation (load factor) across its routes, targeting around 85%. During the pandemic, load factors fell below 30%, meaning BA was flying near-empty planes with the same fixed costs, which generated losses of over £3 billion in a single year."
        },
        misconception: "Students write \"businesses should always aim for 100% capacity utilisation.\" Operating at full capacity leaves zero room for maintenance, emergencies or demand spikes. Instead write: businesses aim for high but not maximum capacity utilisation to balance cost efficiency with operational flexibility.",
        examMatters: "Capacity utilisation questions often require calculation followed by analysis. Examiners reward you for explaining the consequences of low utilisation on unit costs and for suggesting realistic strategies to improve it — such as subcontracting, new markets or rationalisation."
      },
      {
        id: "improving-capacity-utilisation",
        title: "Improving Capacity Utilisation",
        keyIdea: "A firm can improve capacity utilisation by increasing demand to fill spare capacity or by reducing its maximum capacity to match current demand levels.",
        body: [
          {
            type: "paragraph",
            text: "When capacity utilisation is too low, a business has two broad options: **increase demand** to make better use of existing capacity, or **reduce capacity** to match the lower level of demand. Both strategies have trade-offs that depend on whether the low utilisation is temporary or permanent."
          },
          {
            type: "subheading",
            text: "Strategies to Increase Demand"
          },
          {
            type: "bullets",
            items: [
              "**Increase marketing spend** — promotions, advertising or price reductions to attract new customers.",
              "**Develop new products** — use existing facilities to produce additional product lines.",
              "**Enter new markets** — expand into new geographic regions or customer segments.",
              "**Accept subcontract work** — produce goods for other firms using your spare capacity."
            ]
          },
          {
            type: "paragraph",
            text: "If demand is unlikely to recover, the business may need to **rationalise** — closing production lines, selling off equipment, reducing shifts or even closing entire sites. This is painful in the short term but can restore efficiency by aligning capacity with realistic demand levels."
          }
        ],
        realExample: {
          emoji: "🍺",
          text: "**BrewDog** improved capacity utilisation at its Ellon brewery by launching contract brewing services for smaller craft brands alongside its own products. This filled spare capacity without the marketing costs of growing its own sales, turning idle equipment into a new revenue stream."
        },
        misconception: "Students suggest \"just cut prices to fill spare capacity\" without considering the impact on brand image and long-term profitability. Heavy discounting can train customers to wait for sales and erode perceived value. Instead write: price reductions can boost short-term demand but businesses must weigh the impact on brand positioning and profit margins.",
        examMatters: "Examiners often present a scenario where a business has low capacity utilisation and ask you to evaluate strategies. Always consider whether the shortfall is temporary or structural, and weigh the costs of each option against the benefits of improved efficiency."
      }
    ],
    takeaway: [
      "Capacity utilisation = (actual output / max output) x 100.",
      "Low utilisation raises unit costs; 100% leaves no room for flexibility.",
      "Increase demand or reduce capacity to improve utilisation rates."
    ]
  },

  /* ═══ Block 3: Inventory Management ═══ */
  {
    title: "Inventory Management",
    quizIndices: [2],
    practiceIndices: [1],
    sections: [
      {
        id: "just-in-time",
        title: "Just-in-Time (JIT)",
        keyIdea: "JIT systems order materials only when they are needed for production, eliminating warehouse costs but leaving zero margin for supply chain disruptions.",
        body: [
          {
            type: "paragraph",
            text: "**Just-in-time (JIT)** is an inventory management system where materials and components are delivered to the production line exactly when they are needed, and not before. The aim is to hold **zero or minimal stock**, eliminating storage costs, reducing waste and freeing up cash that would otherwise be tied up in inventory."
          },
          {
            type: "flow",
            steps: ["Order arrives just before needed", "No stock sitting in warehouses", "Cash freed up, waste eliminated"],
            result: "Lower costs and improved cash flow",
            resultType: "good"
          },
          {
            type: "paragraph",
            text: "JIT requires **extremely reliable suppliers** who can deliver the right quantity, at the right quality, at exactly the right time. It also demands excellent communication and trust between the business and its supply chain. If any link in the chain fails, production stops entirely because there is no buffer stock."
          },
          {
            type: "paragraph",
            text: "The system originated in Japanese manufacturing and was pioneered by Toyota. It works best in stable environments with predictable demand and reliable logistics, but it creates serious vulnerability to any disruption in the supply chain."
          }
        ],
        realExample: {
          emoji: "🚗",
          text: "**Toyota** invented the JIT system in the 1970s and still operates it across its global plants, with parts arriving at assembly stations within hours of being needed. However, during the 2021 semiconductor shortage, Toyota had to halt production at 14 factories because its JIT system had no buffer stock of chips to fall back on."
        },
        misconception: "Students say \"JIT means having no stock at all.\" JIT means minimising stock, not eliminating it entirely — most JIT firms hold a small buffer of critical components. Instead write: JIT aims to minimise stock levels to reduce costs, but most firms maintain a small safety stock of essential items to guard against minor disruptions.",
        examMatters: "When evaluating JIT, examiners expect you to consider both the cost savings and the risks. Always link your answer to the reliability of the firm's supply chain and the predictability of its demand — JIT in a volatile market is far riskier than JIT in a stable one."
      },
      {
        id: "lean-production",
        title: "Lean Production",
        keyIdea: "Lean production is a philosophy that seeks to eliminate all forms of waste across the entire production process, using only the resources that add value for the customer.",
        body: [
          {
            type: "paragraph",
            text: "**Lean production** is a management approach that focuses on minimising waste while maximising value for the customer. Waste includes anything that does not add value — excess inventory, unnecessary movement, waiting time, overproduction, defects, over-processing and underused talent. The goal is to use fewer resources to deliver the same or better output."
          },
          {
            type: "flow",
            steps: ["Identify all forms of waste", "Systematically eliminate them", "Continuously improve processes"],
            result: "Lower costs, higher quality and faster delivery",
            resultType: "good"
          },
          {
            type: "paragraph",
            text: "Lean production encompasses several specific techniques including JIT, **kaizen** (continuous improvement), **cell production** (organising workers into small self-contained teams) and **time-based management** (reducing lead times at every stage). All of these share the common goal of eliminating waste."
          },
          {
            type: "paragraph",
            text: "Implementing lean production requires a cultural shift across the whole organisation. Workers must be empowered to identify and report waste, managers must be willing to change established processes, and the firm must invest in training. It is not a quick fix but a long-term commitment."
          }
        ],
        realExample: {
          emoji: "�icing",
          text: "**Rolls-Royce** adopted lean production across its aerospace engine manufacturing, reducing the time to assemble a Trent XWB engine from 18 days to 10. This was achieved by reorganising the factory floor, eliminating unnecessary movements and empowering workers to suggest process improvements."
        },
        misconception: "Students treat lean production and JIT as the same thing. JIT is one tool within the broader lean philosophy, which also includes kaizen, cell production and waste elimination across all business functions. Instead write: JIT is a component of lean production, which is a wider philosophy that aims to eliminate all forms of waste throughout the organisation.",
        examMatters: "Examiners want you to explain lean production as a holistic approach, not just a list of techniques. When evaluating its effectiveness, consider the costs of implementation, the time required for cultural change, and whether the firm's supply chain is reliable enough to support it."
      }
    ],
    takeaway: [
      "JIT eliminates stock-holding costs but requires perfectly reliable suppliers.",
      "Lean production targets all waste — not just inventory but time and effort too.",
      "Both methods demand cultural change and strong supplier relationships."
    ]
  },

  /* ═══ Block 4: Quality Management ═══ */
  {
    title: "Quality Management",
    quizIndices: [3],
    sections: [
      {
        id: "quality-control-assurance",
        title: "Quality Control vs Quality Assurance",
        keyIdea: "Quality control checks finished products for defects at the end, while quality assurance builds quality into every stage of the production process from the start.",
        body: [
          {
            type: "paragraph",
            text: "**Quality control (QC)** involves inspecting finished products at the end of the production process to identify and remove defective items before they reach the customer. It is a reactive approach — you wait until the product is made, then check whether it meets the required standard. Faulty items are either reworked or scrapped."
          },
          {
            type: "flow",
            steps: ["Product is manufactured", "Inspector checks finished item", "Defective items rejected or reworked"],
            result: "Catches faults but after resources have been used",
            resultType: "neutral"
          },
          {
            type: "paragraph",
            text: "**Quality assurance (QA)** takes a preventive approach — it builds quality checks into every stage of the production process so that defects are prevented rather than detected. Every worker is responsible for the quality of their own work, and systems are designed to catch problems before they become defects."
          },
          {
            type: "paragraph",
            text: "QA is generally considered superior to QC because it reduces waste, lowers the cost of rework and creates a culture of responsibility. However, it requires greater investment in training, systems and employee empowerment, and it takes time to embed across the organisation."
          }
        ],
        realExample: {
          emoji: "🏭",
          text: "**Jaguar Land Rover** shifted from quality control to quality assurance at its Solihull plant, giving every worker an \"andon cord\" to stop the production line if they spotted a defect. This reduced end-of-line defect rates by over 40% because problems were caught and fixed at source rather than at final inspection."
        },
        misconception: "Students write \"quality control is a bad method that businesses should never use.\" QC is still essential for many products — pharmaceuticals, food and safety-critical components require final inspection regardless of how good the process is. Instead write: quality control remains important for final verification, but quality assurance should be the primary approach because preventing defects is cheaper than finding them.",
        examMatters: "Examiners want you to compare QC and QA and explain why QA is generally preferred. Always acknowledge that QC still has a role, and evaluate whether the business has the resources and culture to implement QA effectively."
      },
      {
        id: "total-quality-management",
        title: "Total Quality Management (TQM)",
        keyIdea: "TQM is a company-wide philosophy where every employee in every department takes responsibility for quality, making continuous improvement part of the organisational culture.",
        body: [
          {
            type: "paragraph",
            text: "**Total Quality Management (TQM)** is a management philosophy that embeds quality into every aspect of the organisation. Under TQM, quality is not just the responsibility of the production department — every employee, from the CEO to the shop-floor worker, is responsible for maintaining and improving quality in their area."
          },
          {
            type: "paragraph",
            text: "TQM is built on the idea of **internal customers** — each department treats the next department in the chain as its customer, ensuring that work is passed on to the highest possible standard. If the marketing team produces a flawed brief, the design team receives poor input, and the final product suffers."
          },
          {
            type: "flow",
            steps: ["Every department owns quality", "Internal customers demand high standards", "Defects prevented at every stage"],
            result: "Company-wide culture of excellence and zero defects",
            resultType: "good"
          },
          {
            type: "paragraph",
            text: "Implementing TQM is expensive and time-consuming. It requires extensive training, changes to organisational culture and genuine commitment from senior management. The benefits — lower waste, fewer complaints, stronger reputation and higher customer loyalty — take months or years to materialise fully."
          }
        ],
        realExample: {
          emoji: "📱",
          text: "**Samsung** implemented TQM across its electronics division after the Galaxy Note 7 battery fires in 2016 forced a global recall costing $5.3 billion. Samsung created an eight-point battery safety check involving every department, and subsequent Galaxy models have had significantly fewer quality incidents."
        },
        misconception: "Students claim \"TQM guarantees zero defects.\" TQM aims for zero defects as an aspiration, but no system can eliminate all errors entirely. Instead write: TQM strives for zero defects by embedding quality into every process, but achieving perfection is an ongoing journey rather than a guaranteed outcome.",
        examMatters: "When discussing TQM, examiners want to see that you understand it is a cultural shift, not just a set of procedures. Evaluate whether the business has the leadership commitment and resources to implement TQM successfully, and consider the short-term costs versus the long-term benefits."
      },
      {
        id: "kaizen",
        title: "Kaizen (Continuous Improvement)",
        keyIdea: "Kaizen empowers every worker to suggest small, incremental improvements to their daily work, and these accumulate over time into transformative gains.",
        body: [
          {
            type: "paragraph",
            text: "**Kaizen** is a Japanese term meaning \"change for the better\" or continuous improvement. It is a philosophy where all employees — not just managers — are encouraged to regularly suggest small improvements to their working processes. The idea is that many small changes, implemented consistently over time, produce dramatic cumulative improvements."
          },
          {
            type: "flow",
            steps: ["Worker identifies a small inefficiency", "Team discusses and tests a solution", "Improvement implemented permanently"],
            result: "Ongoing gains in quality, speed and cost efficiency",
            resultType: "good"
          },
          {
            type: "paragraph",
            text: "Kaizen works through regular team meetings (often called **kaizen circles** or quality circles) where shop-floor workers discuss problems and propose solutions. Management's role is to listen, support and implement good ideas. This bottom-up approach motivates workers because they feel valued and can see the impact of their contributions."
          },
          {
            type: "paragraph",
            text: "The challenge with kaizen is that it requires patience — individual improvements are small, and managers used to dramatic restructuring may undervalue incremental change. It also requires a culture of trust where workers feel safe to highlight problems without fear of blame."
          }
        ],
        realExample: {
          emoji: "🚗",
          text: "**Toyota** receives over 700,000 improvement suggestions from employees each year, and implements around 99% of them. These range from repositioning a tool rack to save five seconds per assembly to redesigning a component to reduce material waste, and together they have kept Toyota at the forefront of manufacturing efficiency for decades."
        },
        misconception: "Students describe kaizen as \"a one-off improvement project.\" Kaizen is the opposite of a one-off event — it is a permanent culture of continuous, never-ending small improvements. Instead write: kaizen is an ongoing philosophy embedded in daily operations, not a project with a start and end date.",
        examMatters: "Examiners reward you for understanding kaizen as a cultural approach rather than a technique. When evaluating it, consider whether the firm's management style supports bottom-up ideas and whether workers are sufficiently trained and motivated to participate meaningfully."
      }
    ],
    takeaway: [
      "QC inspects at the end; QA prevents defects throughout the process.",
      "TQM makes every employee responsible for quality across all departments.",
      "Kaizen delivers big results through many small, continuous improvements."
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
