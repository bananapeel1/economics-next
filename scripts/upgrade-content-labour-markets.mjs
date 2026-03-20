/**
 * UPGRADE — 3.3.4 Labour Markets
 * Rewrites section_content from old concepts[] format to new sections[] format.
 * Run: node scripts/upgrade-content-labour-markets.mjs
 */
import { supabase } from './_db.mjs';

const CONTENT = [
  /* ═══════════════════════════════════════════════════
   *  Chapter 1: Demand and Supply of Labour
   * ═══════════════════════════════════════════════════ */
  {
    title: "Demand and Supply of Labour",
    sections: [
      {
        id: "demand-for-labour-mrp",
        title: "Demand for Labour (MRP Theory)",
        keyIdea: "Labour demand is a derived demand — firms hire workers not for their own sake but because they produce output that generates revenue. Hire until MRP = wage.",
        body: [
          { type: "paragraph", text: "The demand for labour is a **derived demand** — it depends on the demand for the product the worker helps produce. A firm's demand curve for labour is the **marginal revenue product (MRP) curve**, where MRP = MPP x MR (marginal physical product multiplied by marginal revenue)." },
          { type: "paragraph", text: "The MRP curve slopes downward because of **diminishing marginal returns** — as more workers are added to a fixed factor, each extra worker adds less output, so MRP falls. A profit-maximising firm hires workers up to the point where **MRP = wage**, because any worker whose MRP exceeds the wage adds to profit." },
          { type: "paragraph", text: "Shifts in the MRP curve are caused by changes in either product demand or worker productivity. If demand for the product rises, MR increases, so MRP shifts right and more workers are hired at a higher wage. Equally, investments in technology or training raise MPP, shifting MRP right." },
          { type: "flow", steps: ["Product demand rises", "MR increases at each output level", "MRP curve shifts right", "More workers hired at higher wage"], result: "Derived demand — labour demand follows product demand", resultType: "good" }
        ],
        realExample: { emoji: "💻", text: "The explosion in demand for AI products has driven the MRP of AI engineers far above that of other software developers. Companies like Google and OpenAI bid aggressively for scarce talent, pushing salaries above $200k as the derived demand for AI skills tracks the booming product market." },
        misconception: "Students say firms hire workers because they need them. Too vague — firms hire because the worker's MRP exceeds the wage, adding to profit. Instead write: labour demand is derived from product demand; the firm hires until the last worker's MRP equals the wage rate.",
        examMatters: "Examiners expect you to draw the MRP curve as the labour demand curve and show hiring where MRP = W. Always label both axes correctly — wage rate on the vertical, quantity of labour on the horizontal. Explain why the curve slopes down using diminishing returns."
      },
      {
        id: "supply-of-labour",
        title: "Supply of Labour",
        keyIdea: "The supply of labour to an occupation depends on the wage rate and non-monetary factors. At very high wages, the backward-bending supply curve shows workers choosing leisure over income.",
        body: [
          { type: "paragraph", text: "The **supply of labour** to a particular occupation depends on the **wage rate** as the primary monetary incentive, plus **non-monetary factors** such as working conditions, job security, status, location, and holiday entitlement. A higher wage attracts more workers into an occupation, giving an upward-sloping supply curve." },
          { type: "paragraph", text: "The **individual labour supply curve** is backward-bending. At low wages, the **substitution effect** dominates — a wage rise makes leisure more expensive relative to work, so workers supply more hours. At high wages, the **income effect** dominates — workers are rich enough to afford more leisure, so they cut hours despite the higher wage." },
          { type: "paragraph", text: "The supply of labour to an industry also depends on barriers to entry such as qualifications, training periods, and geographical immobility. Occupations requiring years of education have more inelastic supply in the short run because new workers cannot enter quickly." },
          { type: "flow", steps: ["Wages rise from low level", "Substitution effect dominates", "Workers supply more hours", "Beyond a threshold, income effect dominates"], result: "Backward-bending supply curve — very high wages reduce hours supplied", resultType: "neutral" }
        ],
        realExample: { emoji: "🏥", text: "Junior doctors in the NHS face gruelling conditions — long shifts, emotional stress, and below-market pay relative to their qualifications. Despite decent headline salaries, poor non-monetary factors have reduced the supply of applicants, with many choosing to emigrate to Australia or leave medicine entirely." },
        misconception: "Students think labour supply only depends on wages. Wrong — non-monetary factors like conditions, status, and location strongly influence occupational choice. Instead write: labour supply depends on the net advantages of the job — the full package of monetary and non-monetary rewards compared to alternatives.",
        examMatters: "The backward-bending supply curve is a favourite diagram question. Clearly label the substitution effect region (upward-sloping) and the income effect region (backward-bending), and explain the threshold where the income effect begins to dominate."
      }
    ],
    takeaway: [
      "Labour demand is derived demand — the MRP curve (MPP x MR) is the demand curve for labour.",
      "Firms hire until MRP = wage; shifts in product demand or productivity shift the MRP curve.",
      "Labour supply depends on wages and non-monetary factors; the individual supply curve is backward-bending.",
      "At low wages the substitution effect dominates; at high wages the income effect dominates."
    ]
  },

  /* ═══════════════════════════════════════════════════
   *  Chapter 2: Wage Determination
   * ═══════════════════════════════════════════════════ */
  {
    title: "Wage Determination",
    sections: [
      {
        id: "competitive-labour-markets",
        title: "Competitive Labour Markets",
        keyIdea: "In a competitive labour market with many employers and many workers, the wage is set where the demand for labour (MRP) equals the supply of labour — just like any other market.",
        body: [
          { type: "paragraph", text: "A **perfectly competitive labour market** has many employers competing for workers and many workers competing for jobs. No single firm or worker can influence the wage rate. The equilibrium wage is determined where **demand for labour (DL = MRP) equals supply of labour (SL)**." },
          { type: "paragraph", text: "Demand shifts are caused by changes in product demand, labour productivity, or the price of substitute/complementary factors. Supply shifts are caused by migration, changes in education and training, population growth, or changes in non-monetary factors of the occupation." },
          { type: "paragraph", text: "At the equilibrium wage, the market clears — there is no involuntary unemployment. If the wage is above equilibrium, there is a surplus of labour (unemployment). If the wage is below equilibrium, there is a shortage (vacancies unfilled)." },
          { type: "flow", steps: ["Immigration increases", "Labour supply shifts right", "Equilibrium wage falls", "Employment rises"], result: "More workers available at every wage → lower market wage but more jobs filled", resultType: "neutral" }
        ],
        realExample: { emoji: "🏗️", text: "After EU enlargement in 2004, significant migration from Eastern Europe into the UK increased the supply of construction workers. Wages in the sector were held down as the supply curve shifted right, while housebuilders benefited from lower labour costs and increased output." },
        misconception: "Students say immigration always reduces wages for everyone. Wrong — the effect depends on the skill level and sector; immigration also boosts product demand, shifting labour demand right. Instead write: immigration shifts labour supply right, putting downward pressure on wages in affected sectors, but increased spending by immigrants can shift labour demand right, partially or fully offsetting the wage fall.",
        examMatters: "Examiners want you to draw a standard supply-and-demand diagram for labour and show how shifts in either curve change the equilibrium wage and employment level. Always identify the direction of the shift and state whether wage rises or falls and whether employment rises or falls."
      },
      {
        id: "monopsony-power",
        title: "Monopsony Power",
        keyIdea: "A monopsony employer is the dominant buyer of labour — it faces an upward-sloping supply curve and pays workers below their MRP, creating exploitation that a minimum wage can actually fix.",
        body: [
          { type: "paragraph", text: "A **monopsony** is a single (or dominant) buyer of labour in a market. Because it faces the entire upward-sloping market supply curve, it must raise the wage for all workers to attract one more — so the **marginal cost of labour (MCL) lies above the supply curve**." },
          { type: "paragraph", text: "The monopsonist maximises profit by hiring where **MCL = MRP**, but it pays the wage read off the **supply curve** (below MRP), not the MCL curve. Workers are paid less than their marginal revenue product — this gap is **monopsonistic exploitation**. Employment is also lower than in a competitive market." },
          { type: "paragraph", text: "Crucially, a **national minimum wage** set between the monopsony wage and the competitive wage can **increase both wages AND employment** simultaneously. This is because the minimum wage creates a horizontal section of the supply curve up to that wage, eliminating the firm's incentive to restrict hiring." },
          { type: "flow", steps: ["Single dominant employer", "MCL lies above supply curve", "Hires at MCL = MRP", "Pays lower wage from supply curve"], result: "Workers paid below MRP — monopsonistic exploitation", resultType: "bad" }
        ],
        realExample: { emoji: "👩‍⚕️", text: "The NHS is the dominant employer of nurses in the UK, giving it significant monopsony power. Nursing wages have been held below what a competitive market would deliver, contributing to persistent recruitment and retention crises as nurses leave for better-paid agency work or emigrate." },
        misconception: "Students assume a minimum wage always causes unemployment. Wrong — in a monopsony market, a carefully set minimum wage can raise wages and increase employment simultaneously. Instead write: the standard unemployment prediction applies to competitive markets; in monopsony, a minimum wage up to the competitive level raises both wages and employment.",
        examMatters: "The monopsony diagram is one of the most commonly tested in A-level economics. You must draw SL, MCL (above SL), and MRP, show hiring at MCL = MRP, then read the wage off the supply curve. Then show how a minimum wage between the monopsony wage and competitive wage increases both W and employment."
      }
    ],
    takeaway: [
      "Competitive labour markets clear where DL (MRP) = SL — the standard supply-and-demand model applies.",
      "Monopsony: MCL above supply curve, hires at MCL = MRP, pays the wage from the supply curve — workers exploited.",
      "A minimum wage in a monopsony can increase both wages and employment — a key evaluation point."
    ]
  },

  /* ═══════════════════════════════════════════════════
   *  Chapter 3: Trade Unions and Wage Differentials
   * ═══════════════════════════════════════════════════ */
  {
    title: "Trade Unions and Wage Differentials",
    sections: [
      {
        id: "trade-unions",
        title: "Trade Unions",
        keyIdea: "Trade unions act as a monopoly seller of labour, using collective bargaining to push wages above the market rate — but whether this costs jobs depends on the employer's market power.",
        body: [
          { type: "paragraph", text: "A **trade union** is an organisation of workers that uses **collective bargaining** to negotiate wages and conditions. By bargaining as a group, workers have more power than any individual would. The union acts as a **monopoly supplier of labour**, setting a wage floor above the competitive equilibrium." },
          { type: "paragraph", text: "In a **competitive labour market**, a union-imposed wage above equilibrium creates a trade-off: wages rise but employment falls, because firms move up their MRP curve and hire fewer workers at the higher wage. The size of the employment loss depends on the elasticity of demand for labour." },
          { type: "paragraph", text: "Against a **monopsony employer**, unions provide **countervailing power**. The union pushes the wage up while the monopsony wants to push it down — the result is a **bilateral monopoly** where the wage is **indeterminate**, settled between the union's target and the employer's preferred wage through negotiation. In this case, the union can raise wages with little or no job loss." },
          { type: "flow", steps: ["Union negotiates higher wage", "In competitive market: higher W → lower employment", "Against monopsony: countervailing power offsets exploitation", "Bilateral monopoly: wage indeterminate"], result: "The employment effect depends on employer market structure", resultType: "neutral" }
        ],
        realExample: { emoji: "🚂", text: "The RMT union's rail strikes in 2022-23 demonstrated powerful collective bargaining. Because rail is an essential service with few substitutes, the union's ability to disrupt the entire transport network gave it significant leverage in wage negotiations with Network Rail and train operating companies." },
        misconception: "Students say unions always cause unemployment. Wrong — against a monopsony, unions can raise wages without reducing employment by offsetting the employer's wage-suppressing power. Instead write: unions cause a wage-employment trade-off in competitive markets, but against monopsony employers, countervailing power can raise wages with minimal job losses.",
        examMatters: "Examiners love the bilateral monopoly scenario. Draw the monopsony diagram, add the union wage above the monopsony wage, and explain that the final wage is indeterminate — it depends on relative bargaining strength. This is a top-tier evaluation point."
      },
      {
        id: "wage-differentials",
        title: "Wage Differentials",
        keyIdea: "Wages differ between occupations because of compensating differentials, human capital, barriers to entry, discrimination, and labour immobility — not because markets are failing.",
        body: [
          { type: "paragraph", text: "**Compensating wage differentials** exist to attract workers into jobs with unpleasant or dangerous characteristics — night shifts, physical risk, or unsociable hours command a premium. **Human capital theory** explains higher wages as a return on investment in education, training, and skills that raise a worker's productivity." },
          { type: "paragraph", text: "**Barriers to entry** protect high wages in certain professions. Doctors, lawyers, and accountants require years of qualifications that restrict supply, keeping wages above what they would be with free entry. **Discrimination** based on gender, race, or age creates unjustified differentials where equally productive workers receive different pay." },
          { type: "paragraph", text: "**Labour immobility** prevents wage differentials from being competed away. **Geographical immobility** (housing costs, family ties) stops workers moving to higher-wage regions. **Occupational immobility** (lack of transferable skills, retraining costs) stops workers switching to higher-paid occupations. Together, these frictions keep wage gaps persistent." },
          { type: "flow", steps: ["High wages in occupation A, low wages in occupation B", "Workers try to move from B to A", "Geographical and occupational immobility block movement"], result: "Wage differentials persist — labour markets do not fully equalise", resultType: "bad" }
        ],
        realExample: { emoji: "🏦", text: "The City of London financial sector pays substantial premiums that reflect multiple factors: human capital returns on advanced degrees and professional qualifications, compensating differentials for extremely long hours and high stress, and barriers to entry through regulated professional exams." },
        misconception: "Students say wage differences exist because some jobs are harder. Too simplistic — difficulty alone does not determine pay; supply and demand do. Instead write: wage differentials reflect the interaction of labour demand (MRP) and labour supply (affected by human capital, barriers, mobility, and non-monetary factors) — not just the difficulty or effort involved.",
        examMatters: "When explaining wage differentials, examiners expect you to use specific causes — not just say 'supply and demand'. Name the type of differential (compensating, human capital, barrier to entry, discrimination) and link it to a shift in either demand or supply of labour for that occupation."
      }
    ],
    takeaway: [
      "Unions are monopoly sellers of labour — they raise wages but may reduce employment in competitive markets.",
      "Against monopsony, unions provide countervailing power and can raise wages without job losses.",
      "Wage differentials arise from compensating factors, human capital, barriers to entry, and discrimination.",
      "Labour immobility (geographical and occupational) prevents wage differentials from being competed away."
    ]
  }
];

async function main() {
  console.log('Upgrading 3.3.4 Labour Markets to new format...');

  const { error } = await supabase
    .from('section_content')
    .update({ data: CONTENT })
    .eq('section_id', 'labour-markets');

  if (error) {
    console.error('FAILED:', error.message);
  } else {
    console.log('SUCCESS — 3 chapters, ' + CONTENT.reduce((n, c) => n + c.sections.length, 0) + ' sections pushed.');
  }
}

main();
