import { money, FIRMS } from '../format.mjs';

/**
 * Average rate of return. Edexcel IAL Business, WBS13 (Unit 3), spec 3.3.3.
 *
 * Generated backwards from the answer: the investment and the ARR are drawn first,
 * the average annual return follows, and the three years' cash flows are a split of
 * the total that must sum back exactly. Drawing cash flows forwards and hoping the
 * ARR lands on two decimal places produces ugly questions most of the time.
 */
const template = {
  id: 'arr',
  subject: 'business',
  unit: 'WBS13',
  specCode: '3.3.3',
  title: 'Average rate of return',
  topic: 'Investment appraisal',
  variants: 5 * 5 * 40 * FIRMS.length,

  draw(rng) {
    const investment = rng.pick([40000, 50000, 60000, 80000, 100000]);
    const arr = rng.pick([10, 12.5, 15, 20, 25]);
    const average = (arr * investment) / 100; // whole: investment is a multiple of 10,000
    const totalReturn = average * 3;
    const inflow = investment + totalReturn;

    for (let attempt = 0; attempt < 200; attempt++) {
      const y1 = Math.round((inflow * (0.26 + rng.next() * 0.05)) / 500) * 500;
      const y2 = Math.round((inflow * (0.32 + rng.next() * 0.04)) / 500) * 500;
      const y3 = inflow - y1 - y2;
      if (y1 > 0 && y2 > y1 && y3 > y2) {
        return { firm: rng.pick(FIRMS), investment, arr, average, totalReturn, y1, y2, y3 };
      }
    }
    throw new Error('arr: no rising cash-flow split in 200 attempts');
  },

  invariants(d) {
    const bad = [];
    if (d.y1 + d.y2 + d.y3 !== d.investment + d.totalReturn) bad.push('cash flows do not sum to the inflow');
    if (d.totalReturn <= 0) bad.push('the investment does not return a profit');
    if (!(d.y1 < d.y2 && d.y2 < d.y3)) bad.push('cash flows are not rising');
    return bad;
  },

  build(d) {
    const inflow = d.y1 + d.y2 + d.y3;
    return {
      stem:
        `**${d.firm}** is appraising an investment costing **${money(d.investment)}**. Net cash inflows ` +
        `are forecast at **${money(d.y1)}** in year 1, **${money(d.y2)}** in year 2 and ` +
        `**${money(d.y3)}** in year 3.`,
      steps: [
        {
          id: 'total',
          label: 'Total net return over three years',
          method: 'total inflows − the initial investment',
          prefix: '$',
          marks: 1,
          dp: 0,
          answer: d.totalReturn,
          tolerance: 0.5,
          slips: [
            { value: inflow, note: 'That is total inflow. The cost of the investment has to come off to leave a net return.' },
          ],
        },
        {
          id: 'average',
          label: 'Average annual return',
          method: 'total net return ÷ number of years',
          prefix: '$',
          marks: 1,
          dp: 0,
          answer: d.average,
          tolerance: 0.5,
          ofr: (v) => (v.total !== null ? v.total / 3 : null),
          slips: [
            { value: inflow / 3, note: 'You averaged the inflows rather than the net return. Take the investment off first.' },
          ],
        },
        {
          id: 'arr',
          label: 'ARR, to two decimal places',
          method: '(average annual return ÷ initial investment) × 100',
          suffix: '%',
          marks: 2,
          dp: 2,
          answer: d.arr,
          tolerance: 0.05,
          ofr: (v) => (v.average !== null ? (v.average / d.investment) * 100 : null),
          slips: [
            { value: Number(((inflow / 3 / d.investment) * 100).toFixed(2)), note: 'You used average inflow rather than average net return. The investment cost comes off first.' },
          ],
        },
      ],
      solution: [
        `Total net return = ${money(inflow)} − ${money(d.investment)} = **${money(d.totalReturn)}**`,
        `Average annual return = ${money(d.totalReturn)} ÷ 3 = **${money(d.average)}**`,
        `ARR = ${money(d.average)} ÷ ${money(d.investment)} × 100 = **${d.arr.toFixed(2)}%**`,
      ],
    };
  },
};

export default template;
