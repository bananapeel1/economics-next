/**
 * Monopoly equilibrium and the welfare loss against competition. Edexcel IAL Economics, WEC13
 * (Unit 3), spec 3.3.3. "Draw" carries 4 marks in Economics; nothing moves on this diagram, so the
 * drill marks two decisions (the point and the area), not four.
 *
 * Terminology: welfare loss, never "deadweight loss" — packet 13 strips that as off-spec
 * (audit/PLAN.md, packet 13). The section's Monopoly chapter says "welfare loss" as well.
 *
 * WHY 3.3.3, so nobody moves it. 3.3.3 Market structures and contestability (econ_spec.txt:1359,
 * continued :1411) topic 6 "Monopoly" asks for the "Profit-maximising equilibrium" (6c, :1426) and the
 * "Costs and benefits of monopoly to firms and consumers" (6d, :1427), and its topic 1 names
 * allocative efficiency (:1364), which is what the triangle measures. 3.3.2 Revenue, costs and
 * profits is the tempting alternative — it defines AR, MR and MC (:1298-1314) and supernormal profit
 * (:1350) — but it has no market structure in it; `checkSpecCitation` refuses 3.3.2 with this
 * specTerm. The spec's words "welfare loss" appear only under 1.3.5 (:750); 3.3.3 carries the idea as
 * allocative efficiency and "costs … to consumers", and the section teaches it as "welfare loss".
 *
 * WHAT THE DIAGRAM ASSUMES, and why the prompt is a merger. The comparison is only fair if the
 * monopolist has the SAME costs the competitive industry had — constant MC = AC, no economies of
 * scale. A firm that is a monopoly because its costs fall with size (a natural monopoly, the same
 * chapter's next subsection) would make this triangle the wrong picture. So the story is many small
 * suppliers bought up by one firm whose cost per cylinder does not change, and the prompt says so.
 * With MC = AC constant, the rectangle (Pm − MC) × Qm is exactly supernormal profit.
 *
 * WHAT IS DRILLED. Reading the price off MR (or MC) at the MR = MC output instead of going up to AR;
 * marking the competitive outcome; and shading the profit rectangle, which is a transfer from
 * consumers to the firm, not a loss.
 *
 * The numbers are not the chapter's (Zahra Water, AR = 120 − 4Q, MC $24): here AR = 130 − Q,
 * MR = 130 − 2Q, MC = $50, so Qm 40 at Pm $90 against Qc 80 at Pc $50. Profit $1,600k, welfare loss
 * $800k, consumer surplus left $800k a month.
 */
const spec = {
  id: 'monopoly',
  subject: 'economics',
  unit: 'WEC13',
  specCode: '3.3.3',
  specTerm: 'costs and benefits of monopoly',
  title: 'Monopoly equilibrium and the welfare loss',
  topic: 'Market structures and contestability',
  prompt:
    'Many small firms compete to supply cooking-gas cylinders, each at a cost of **$50 a cylinder**. One firm buys them all and becomes the only supplier; its cost stays at **$50 a cylinder** however many it sells. Mark the price and output at which the monopolist maximises profit, and shade the welfare loss compared with the competitive industry.',

  axes: {
    x: { label: 'Quantity (000 cylinders per month)', max: 120 },
    y: { label: 'Price, costs and revenue ($ per cylinder)', short: 'price', max: 140 },
  },
  curves: {
    AR: { intercept: 130, slope: -1, label: 'AR = D', short: 'AR', name: 'Demand (average revenue) curve', role: 'demand' },
    MR: { intercept: 130, slope: -2, label: 'MR', name: 'Marginal revenue curve', role: 'marginal' },
    MC: { intercept: 50, slope: 0, label: 'MC = AC', short: 'MC', name: 'Marginal cost line', role: 'supply' },
  },
  regions: 'monopoly',
  expect: { regions: ['dwl'] },
  tolerance: { q: 4, p: 6 },
  glyphs: { p1: 'Pc', q1: 'Qc', p2: 'Pm', q2: 'Qm' },

  steps: {
    point: {
      name: 'Mark monopoly price and output',
      prompt: 'Tap the point that shows the monopolist’s output and the price it charges. It snaps if you are close enough.',
    },
    shade: {
      name: 'Shade the welfare loss',
      prompt: 'Tap the area that is the welfare loss compared with the competitive industry. Tap again to unshade.',
    },
  },
  criteria: { M3: 'Monopoly price and output identified', M4: 'Welfare loss shaded' },

  distractors: [
    {
      // MR = MC, with the price read off MR (= MC) instead of AR.
      cross: ['MR', 'MC'],
      feedback:
        'That is where MR = MC, which gives the OUTPUT — but the price there is the $50 marginal cost. The monopolist charges what buyers will pay for that output: go straight up to the AR curve.',
    },
    {
      // Where AR meets MC: the competitive industry, not the monopolist.
      cross: ['AR', 'MC'],
      feedback:
        'That is the competitive outcome: price equal to marginal cost, $50, and 80,000 cylinders. A profit-maximising monopolist produces less, where MR = MC, and charges more.',
    },
  ],

  feedback: {
    noPoint: 'No point marked. Mark the output the monopolist chooses and the price it charges.',
    equilibriumAtOldQuantity:
      'That is the competitive output, Qc, where price equals marginal cost. A monopolist produces less: the output where MR = MC.',
    equilibriumWrong:
      'Not the profit-maximising point. Find the output where MR = MC, then read the price vertically above it on the AR curve.',
    rightRegion:
      'The triangle between AR and MC, from Qm out to Qc: cylinders buyers valued at more than the $50 they cost to supply, which the monopolist no longer sells. Nobody gains that surplus. It is the welfare loss, and the sign of allocative inefficiency — price above marginal cost.',
    regions: {
      profit:
        'That rectangle is the monopolist’s supernormal profit: $40 above cost on each of 40,000 cylinders. Consumers lose it and the firm gains it — a transfer, not a loss to society.',
      cs: 'That is the consumer surplus buyers still have under monopoly. It is smaller than before, but what is left is not lost.',
      'dwl+profit':
        'The triangle is right, but the rectangle is supernormal profit — surplus moved from consumers to the monopolist, not lost.',
      'cs+dwl+profit':
        'That is all the consumer surplus under competition. Under monopoly part stays with consumers and part becomes profit; only the triangle between Qm and Qc is lost to everyone.',
    },
  },
};

export default spec;
