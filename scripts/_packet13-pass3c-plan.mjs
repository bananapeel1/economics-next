/**
 * PACKET 13 — pass 3c, two words, and the reason they matter.
 *
 * The baseline diff after pass 3 wanted to add five DEBT keys. Four were the same findings the items
 * already carried, re-fingerprinted because the text around them changed — that is the fingerprint
 * design working. The fifth was new: my replacement paragraph in "Diagrams for Welfare Loss" took the
 * subsection to 352 words against the 350-word reading budget. Two words is not a defect a student
 * would feel, but "the baseline only ever shrinks" stops meaning anything the first time a packet
 * writes its own new debt into it. So the sentence loses four words instead.
 */

export const PLAN = {
  'market-failure': [
    { op: 'substitute', why: 'step.words: 352 → under the 350 budget, without losing the case it makes', rules: [
      [/For \*\*an intervention that overshoots\*\* — an indirect tax above the external cost, or a minimum price above the equilibrium — the triangle sits between the demand and supply curves from the new quantity back to the social optimum: transactions worth making that no longer happen\. That net welfare loss is government failure \(1\.3\.6\.2\)\./g,
        'For **an intervention that overshoots** — a tax above the external cost, or a minimum price above the equilibrium — the triangle sits between the demand and supply curves, from the new quantity back to the social optimum: transactions worth making that no longer happen. That is government failure (1.3.6.2).'],
    ] },
  ],
};

export const MUST_NOT_SURVIVE = ['That net welfare loss is government failure'];
