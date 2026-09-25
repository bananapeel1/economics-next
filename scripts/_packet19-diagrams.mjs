/**
 * PACKET 19 — planning-raising-finance: five diagrams, one per chapter, each pinned by `diagramId`.
 *
 * The March section had NONE (structure-10), in a topic whose two obvious visual anchors — a debt
 * against equity comparison and a table of which finance each legal form can reach — are exactly
 * what a grid does well. A body cannot hold a table (`schema.body-type` allows paragraph,
 * subheading, flow and bullets only) and a practice stem renders into a <p>, so a DIAGRAM is the
 * only surface in the schema that can carry a grid — packet 17's finding, used three times here.
 *
 * A diagram reaches a student only from a block's `diagramId`, at that chapter's check-in
 * (lib/learn-steps.js:44-55). The three dead `diagramRef` pins this section used to carry resolved
 * to nothing at all.
 *
 * Conventions from the live census: a 500-unit-wide viewBox, labels at 9-13 units, palette colours
 * that components/learn-mode/processSvg.js remaps onto theme tokens, strokes >= 2, and text placed
 * from the geometry it names.
 *
 * EVERY QUANTITY HERE IS GENERATED, NOT DRAWN (packet 15's accuracy-01 rule): the funding stack from
 * STACK, the retained-profit bars from the year's figures, the ownership bars from the share counts.
 * The runner re-derives each from the emitted SVG and refuses to stage on a disagreement.
 */
import { id, money, pc, NEED, STACK, stackTotal, OWNER_CAPITAL, FAMILY, BANK_LOAN, ANGEL, PROFIT_AFTER_TAX, DIVIDENDS, retained, DEPOSIT_RATE, retainedOpportunityCost, FOUNDER_SHARES, ANGEL_SHARES, FLOAT_SHARES, sharesAfterAngel, sharesAfterFloat, FOUNDER_AFTER_ANGEL, ANGEL_AFTER_ANGEL, FOUNDER_AFTER_FLOAT, ANGEL_AFTER_FLOAT, PUBLIC_AFTER_FLOAT, MACHINE_PRICE, LEASE_MONTHLY, LEASE_MONTHS, leaseTotal, leasePremium, LOAN_MONTHLY, LOAN_YEARS, loanRepaid, loanInterest, OVERDRAFT_LIMIT, SUPPLY_MONTHLY, CREDIT_DAYS, tradeCreditHeld, GRANT } from './_packet19-util.mjs';

const INK = '#e8ecf5', AXIS = '#94a3b8', GRID = '#475569', MUTED = '#7a8299';
const BLUE = '#3b82f6', GREEN = '#059669', RED = '#ef4444', AMBER = '#f59e0b', PURPLE = '#8b5cf6';
const open = (h = 330, w = 500) => `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" style="font-family:'DM Sans',system-ui,sans-serif;background:transparent"><defs><marker id="arr" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto"><polygon points="0 0,10 3.5,0 7" fill="${AXIS}"/></marker></defs>`;
const close = '</svg>';
const t = (x, y, text, { size = 10, fill = INK, anchor = 'start', weight = 400, rotate = null } = {}) =>
  `<text x="${x}" y="${y}" fill="${fill}" font-size="${size}" font-weight="${weight}" text-anchor="${anchor}"${rotate ? ` transform="rotate(${rotate},${x},${y})"` : ''}>${text}</text>`;
const line = (x1, y1, x2, y2, stroke, w = 2, extra = '') => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${w}"${extra}/>`;
const rect = (x, y, w, h, fill, extra = '') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}"${extra}/>`;
export const r2 = (n) => Math.round(n * 100) / 100;

/* ── a shared grid, because three of the five diagrams are tables ──────────── */
/*
 * One geometry for every table in the section, so a row is at the same height in all of them and the
 * runner can check a cell by re-deriving its y from the row index alone.
 */
/*
 * Three columns need more than 500 units. At 500 with columns at 26/190/330, three cells collided
 * with their neighbours — "Overdraft, leasing, trade credit" ran 23 units under its own "Yes" —
 * measured with getComputedTextLength() in the browser rather than estimated. The grid frame is
 * therefore 560 wide with the columns further apart; the runner re-checks every row for overlap.
 */
export const GRD = { w: 560, x0: 26, y0: 72, rowH: 30, right: 534, cols: [26, 260, 440] };
export const gridRowY = (i) => r2(GRD.y0 + (i + 1) * GRD.rowH);

const gridSvg = ({ title, headers, rows, note, colours = [] }) => {
  const head = headers.map((h, c) => t(GRD.cols[c], GRD.y0, h, { size: 11, fill: AXIS, weight: 600, anchor: c === 0 ? 'start' : 'middle' })).join('');
  const body = rows.map((cells, i) => [
    ...cells.map((cell, c) => t(GRD.cols[c], gridRowY(i), cell, { size: 12, fill: c === 0 ? INK : (colours[i]?.[c] || INK), weight: c === 0 ? 600 : 400, anchor: c === 0 ? 'start' : 'middle' })),
    line(GRD.x0, r2(gridRowY(i) + 9), GRD.right, r2(gridRowY(i) + 9), GRID, 1),
  ].join('')).join('');
  const h = Math.max(300, gridRowY(rows.length - 1) + 60);
  return [open(h, GRD.w), t(GRD.x0, 40, title, { size: 13, weight: 600 }), head,
    line(GRD.x0, r2(GRD.y0 + 9), GRD.right, r2(GRD.y0 + 9), AXIS, 2), body,
    t(GRD.x0, r2(gridRowY(rows.length - 1) + 36), note, { size: 10, fill: MUTED }), close].join('');
};

/* ── 1 · What a plan contains, and who reads it (block 1) ─────────────────── */

const planStructure = () => {
  const sections = ['The idea and objectives', 'Market research', 'The marketing plan', 'Operations', 'Financial forecasts'];
  const boxH = 30, boxW = 190, x = 26;
  const boxes = sections.map((s, i) => {
    const y = 72 + i * (boxH + 8);
    return [rect(x, y, boxW, boxH, 'none', ` stroke="${BLUE}" stroke-width="2" rx="4"`),
      t(x + 10, y + 20, s, { size: 11 })].join('');
  }).join('');
  const uses = [
    { label: 'The owner', sub: 'Targets to measure against', colour: GREEN },
    { label: 'A lender', sub: 'Can the repayments be met?', colour: AMBER },
    { label: 'An investor', sub: 'How large can this become?', colour: PURPLE },
  ];
  const useBoxes = uses.map((u, i) => {
    const y = 92 + i * 62;
    return [rect(300, y, 174, 46, 'none', ` stroke="${u.colour}" stroke-width="2" rx="4"`),
      t(310, y + 19, u.label, { size: 12, weight: 600, fill: u.colour }),
      t(310, y + 36, u.sub, { size: 10, fill: MUTED }),
      line(216, 146, 298, r2(y + 23), AXIS, 1.5, ' marker-end="url(#arr)"')].join('');
  }).join('');
  return [open(310), t(26, 40, 'One plan, three readers', { size: 13, weight: 600 }),
    t(26, 58, 'What it contains', { size: 11, fill: AXIS, weight: 600 }),
    t(300, 58, 'What each reader wants', { size: 11, fill: AXIS, weight: 600 }),
    boxes, useBoxes,
    t(26, 288, 'The same document answers three different questions', { size: 10, fill: MUTED }), close].join('');
};

const planDiagram = {
  id: id('diagram', 'business plan contents and its readers'),
  title: 'What a Business Plan Contains, and Who Reads It',
  description: 'The five sections of a business plan, and the three readers it has to satisfy: the owner running the business, a lender deciding whether it will be repaid, and an equity investor deciding how large it can become.',
  checklist: [
    'The five sections of the plan named, in the order the plan sets them out',
    'The two uses distinguished: running the business, and obtaining finance',
    'The lender\'s question stated: can the repayments be met?',
    'The investor\'s question stated: how large is the opportunity?',
    'The limitation noted: every figure is an assumption that dates',
  ],
  scenarios: [{ label: 'The plan and its readers', svg: planStructure() }],
};

/* ── 2 · Internal finance: where retained profit comes from (block 2) ─────── */

export const IBAR = { x0: 60, y0: 250, top: 84, w: 92, gap: 132, max: PROFIT_AFTER_TAX };
export const iH = (v) => r2(((IBAR.y0 - IBAR.top) * v) / IBAR.max);
const iX = (i) => r2(IBAR.x0 + i * IBAR.gap);

const retainedProfitSvg = () => {
  const bars = [
    { v: PROFIT_AFTER_TAX, label: 'Profit after tax', colour: BLUE },
    { v: DIVIDENDS, label: 'Dividends paid', colour: RED },
    { v: retained(), label: 'Retained', colour: GREEN },
  ];
  return [open(320), t(26, 40, 'Yusra Foods — where the retained profit comes from', { size: 13, weight: 600 }),
    line(44, IBAR.y0, 476, IBAR.y0, AXIS, 2),
    line(44, IBAR.y0, 44, 66, AXIS, 2, ' marker-end="url(#arr)"'),
    ...bars.map((b, i) => [
      rect(iX(i), r2(IBAR.y0 - iH(b.v)), IBAR.w, iH(b.v), b.colour),
      t(iX(i) + IBAR.w / 2, r2(IBAR.y0 - iH(b.v)) - 8, money(b.v), { size: 12, anchor: 'middle', weight: 600 }),
      t(iX(i) + IBAR.w / 2, IBAR.y0 + 18, b.label, { size: 10, fill: AXIS, anchor: 'middle' }),
    ].join('')),
    t(26, 288, `${money(PROFIT_AFTER_TAX)} − ${money(DIVIDENDS)} dividends = ${money(retained())} retained`, { size: 11, fill: MUTED }),
    t(26, 306, `Not free: at ${pc(DEPOSIT_RATE)} a year that ${money(retained())} would have returned ${money(retainedOpportunityCost())}`, { size: 10, fill: AMBER }),
    close].join('');
};

const internalDiagram = {
  id: id('diagram', 'retained profit and its opportunity cost'),
  title: 'Retained Profit and What It Costs',
  description: `How ${money(PROFIT_AFTER_TAX)} of profit after tax becomes ${money(retained())} of retained profit once ${money(DIVIDENDS)} of dividends are paid, and the opportunity cost of keeping it in the business rather than using it elsewhere.`,
  checklist: [
    'Profit after tax shown before any distribution',
    'Dividends deducted, and the remainder identified as retained profit',
    'The arithmetic stated, not just the bars drawn',
    'The opportunity cost named: the return the money could have earned elsewhere',
    'The conclusion: no interest charge is not the same as no cost',
  ],
  scenarios: [{ label: 'Profit after tax to retained profit', svg: retainedProfitSvg() }],
};

/* ── 3 · External finance: the package, and debt against equity (block 3) ─── */

export const STK = { x0: 26, y: 96, w: 448, h: 54 };
/** A segment's width is its share of the total, so the four segments fill the bar exactly. */
export const stkW = (amount) => r2((amount / stackTotal()) * STK.w);
export const stkX = (i) => r2(STK.x0 + STACK.slice(0, i).reduce((n, s) => n + stkW(s.amount), 0));

const fundingStackSvg = () => {
  const colour = { internal: GREEN, debt: AMBER, equity: PURPLE };
  const segs = STACK.map((s, i) => [
    rect(stkX(i), STK.y, stkW(s.amount), STK.h, colour[s.kind]),
    t(r2(stkX(i) + stkW(s.amount) / 2), STK.y + 32, money(s.amount), { size: 11, anchor: 'middle', weight: 600 }),
  ].join('')).join('');
  const legend = STACK.map((s, i) => {
    const y = 186 + i * 26;
    return [rect(26, y - 11, 14, 14, colour[s.kind]),
      t(48, y, `${s.label} — ${money(s.amount)}`, { size: 11 }),
      t(300, y, s.kind === 'internal' ? 'Internal' : s.kind === 'debt' ? 'Borrowed, repaid with interest' : 'Ownership sold, never repaid', { size: 10, fill: MUTED })].join('');
  }).join('');
  return [open(320), t(26, 40, `Yusra Foods — funding the first ${money(NEED)}`, { size: 13, weight: 600 }),
    t(26, 78, 'One requirement, four sources, because four questions had four answers', { size: 10, fill: AXIS }),
    segs, rect(STK.x0, STK.y, STK.w, STK.h, 'none', ` stroke="${AXIS}" stroke-width="2"`),
    t(26, 172, 'The package', { size: 11, fill: AXIS, weight: 600 }),
    legend,
    t(26, 300, `Total ${money(stackTotal())} — segments drawn in proportion to the sums`, { size: 10, fill: MUTED }),
    close].join('');
};

const debtEquitySvg = () => gridSvg({
  title: 'Debt against equity — the distinction under every method',
  headers: ['', 'Debt (borrowed)', 'Equity (ownership sold)'],
  rows: [
    ['Repaid?', 'Yes, with interest', 'Never'],
    ['Ownership', 'Unchanged', 'Diluted permanently'],
    ['Cost', 'Interest', 'A share of all future profit'],
    ['If the business fails', 'Still owed', 'Nothing is owed back'],
    ['Security wanted', 'Usually', 'No'],
    ['Suits', 'Known cost, steady trade', 'High growth, no assets'],
  ],
  colours: [[INK, AMBER, PURPLE], [INK, AMBER, PURPLE], [INK, AMBER, PURPLE], [INK, AMBER, PURPLE], [INK, AMBER, PURPLE], [INK, AMBER, PURPLE]],
  note: 'Every method is one of these two — which is why it is the first question to ask',
});

const methodsCostSvg = () => gridSvg({
  title: 'Three methods, priced',
  headers: ['Method', 'Terms', 'What it comes to'],
  rows: [
    ['Bank loan', `${money(LOAN_MONTHLY)} × ${LOAN_YEARS * 12} months`, `${money(loanRepaid())} (${money(loanInterest())} interest)`],
    ['Leasing', `${money(LEASE_MONTHLY)} × ${LEASE_MONTHS} months`, `${money(leaseTotal())} (${money(leasePremium())} over buying)`],
    ['Buying outright', 'One payment', money(MACHINE_PRICE)],
    ['Trade credit', `${money(SUPPLY_MONTHLY)} a month, ${CREDIT_DAYS} days`, `${money(tradeCreditHeld())} held, free`],
    ['Overdraft', `Limit ${money(OVERDRAFT_LIMIT)}`, 'Charged only on what is used'],
    ['Grant', 'Must hire two staff', `${money(GRANT)}, not repaid`],
  ],
  note: 'Read the total, not the monthly payment: the two do not rank the same',
});

const externalDiagram = {
  id: id('diagram', 'funding package debt equity and methods priced'),
  title: 'The Funding Package, Debt against Equity, and What Each Method Costs',
  description: `How Yusra Foods funded ${money(NEED)} from four sources, the single distinction underneath every method of external finance, and the total cost of a loan, a lease, trade credit, an overdraft and a grant.`,
  checklist: [
    'Each source drawn in proportion to the amount it provided',
    'Borrowed money and sold ownership distinguished, not just listed',
    'Debt: repaid with interest, ownership unchanged, security usually wanted',
    'Equity: never repaid, ownership permanently diluted',
    'A total cost given for each method, not only a monthly payment',
  ],
  scenarios: [
    { label: `Funding the first ${money(NEED)}`, svg: fundingStackSvg() },
    { label: 'Debt against equity', svg: debtEquitySvg() },
    { label: 'Three methods, priced', svg: methodsCostSvg() },
  ],
};

/* ── 4 · Forms of business, and what issuing shares does (block 4) ────────── */

const formsSvg = () => gridSvg({
  title: 'The forms of business, and the finance each can reach',
  headers: ['Form', 'Separate in law?', 'Can issue shares?'],
  rows: [
    ['Sole trader', 'No', 'No'],
    ['Partnership', 'No', 'No'],
    ['Private limited (Ltd)', 'Yes', 'Yes — privately'],
    ['Public limited (plc)', 'Yes', 'Yes — to the public'],
  ],
  colours: [[INK, RED, RED], [INK, RED, RED], [INK, GREEN, GREEN], [INK, GREEN, GREEN]],
  note: 'The second column decides the third, and the third decides the finance reachable',
});

export const OWN = { x0: 26, w: 448, h: 40, rows: [110, 178, 246] };
/** A holder's band is as wide as its percentage of the shares in issue at that moment. */
export const ownW = (percent) => r2((percent / 100) * OWN.w);

const dilutionSvg = () => {
  const stages = [
    { label: 'At formation', parts: [{ who: 'Founder', pc: 100, colour: BLUE }] },
    { label: `After the angel — ${sharesAfterAngel().toLocaleString('en-GB')} shares`, parts: [{ who: 'Founder', pc: FOUNDER_AFTER_ANGEL(), colour: BLUE }, { who: 'Angel', pc: ANGEL_AFTER_ANGEL(), colour: PURPLE }] },
    { label: `After flotation — ${sharesAfterFloat().toLocaleString('en-GB')} shares`, parts: [{ who: 'Founder', pc: FOUNDER_AFTER_FLOAT(), colour: BLUE }, { who: 'Angel', pc: ANGEL_AFTER_FLOAT(), colour: PURPLE }, { who: 'Public', pc: PUBLIC_AFTER_FLOAT(), colour: GREEN }] },
  ];
  const bands = stages.map((s, i) => {
    const y = OWN.rows[i];
    let x = OWN.x0;
    const parts = s.parts.map((p) => {
      const w = ownW(p.pc);
      const seg = [rect(x, y, w, OWN.h, p.colour),
        t(r2(x + w / 2), y + 25, `${p.who} ${pc(p.pc)}`, { size: 11, anchor: 'middle', weight: 600 })].join('');
      x = r2(x + w);
      return seg;
    }).join('');
    return [t(OWN.x0, y - 8, s.label, { size: 10, fill: AXIS }), parts,
      rect(OWN.x0, y, OWN.w, OWN.h, 'none', ` stroke="${AXIS}" stroke-width="2"`)].join('');
  }).join('');
  return [open(330), t(26, 40, 'What issuing shares does to a founder\'s stake', { size: 13, weight: 600 }),
    t(26, 62, `The founder keeps all ${FOUNDER_SHARES.toLocaleString('en-GB')} shares. Only the total in issue changes.`, { size: 10, fill: MUTED }),
    bands,
    t(26, 310, `${pc(FOUNDER_AFTER_FLOAT())} is the largest single holding — but it is not a majority`, { size: 10, fill: AMBER }),
    close].join('');
};

const formsDiagram = {
  id: id('diagram', 'forms of business and dilution of ownership'),
  title: 'Forms of Business, and What Issuing Shares Does to Ownership',
  description: 'Which forms of business are separate legal entities and which may therefore issue shares, and how a founder\'s stake falls from 100% through a business angel\'s investment to a public flotation.',
  checklist: [
    'Each form marked for whether it is separate in law from its owners',
    'Only companies shown as able to issue shares, Ltd privately and plc publicly',
    'Each ownership band drawn in proportion to the percentage it represents',
    'The number of founder shares shown as unchanged throughout',
    'The point stated: dilution reduces the percentage, not the shares held',
  ],
  scenarios: [
    { label: 'The four forms', svg: formsSvg() },
    { label: 'Dilution, stage by stage', svg: dilutionSvg() },
  ],
};

/* ── 5 · Finance appropriate to each liability (block 5) ──────────────────── */

const liabilityFinanceSvg = () => gridSvg({
  title: 'Which finance each kind of business can reach (2.3.1 · 5b)',
  headers: ['Finance', 'Unlimited liability', 'Limited liability'],
  rows: [
    ["Owner's capital", 'Yes', 'Yes'],
    ['Retained profit', 'Yes', 'Yes'],
    ['Bank loan', 'Yes — secured', 'Yes'],
    ['Overdraft, leasing, credit', 'Yes', 'Yes'],
    ['Business angel', 'No', 'Yes'],
    ['Venture capital', 'No', 'Yes'],
    ['Stock market flotation', 'No', 'plc only'],
  ],
  colours: [[INK, GREEN, GREEN], [INK, GREEN, GREEN], [INK, GREEN, GREEN], [INK, GREEN, GREEN], [INK, RED, GREEN], [INK, RED, GREEN], [INK, RED, AMBER]],
  note: 'Every "No" has one cause: no shares exist, so none can be sold',
});

const liabilityDiagram = {
  id: id('diagram', 'finance appropriate to limited and unlimited liability'),
  title: 'Finance Appropriate to Limited and Unlimited Liability Businesses',
  description: 'Which sources and methods of finance are open to an unlimited liability business and which require a company, with the single cause behind every difference: only a company has shares to sell.',
  checklist: [
    'Each source marked for both kinds of business, not just one',
    'Every equity source shown as closed to an unincorporated business',
    'Flotation restricted to a plc rather than to companies generally',
    'Borrowing shown as open to both, with security wanted from the unincorporated',
    'The cause stated once: no shares exist, so no share can be sold',
  ],
  scenarios: [{ label: 'Finance by liability type', svg: liabilityFinanceSvg() }],
};

export const DIAGRAMS = [planDiagram, internalDiagram, externalDiagram, formsDiagram, liabilityDiagram];
