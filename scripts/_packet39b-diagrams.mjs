/**
 * PACKET 39b — seven diagrams for sub-topics 4 and 5, on packet 37's 400-unit frame.
 *
 * Same contract as 39a: 15 units for anything a student must read, 12 for a legend or a note, and
 * nothing smaller. Every figure is sampled from `_packet39b-util.mjs`.
 *
 * THE TARIFF DIAGRAM IS THE POINT OF THE PACKET. `accuracy-01` says the live text teaches the wrong
 * comparison, and a diagram is how the right one becomes obvious: four labelled areas, two of which
 * go to somebody and two of which go nowhere. The areas are POSITIONED from the same quantities the
 * prose prints, so a change to the spine moves the shading and the labels together.
 *
 * ONE MARKET DRAWN THREE TIMES. The tariff, the quota and the subsidy share a skeleton — the same
 * axes, the same two curves, the same world price — because the whole teaching point of 5b is that
 * the three tools do different things to the SAME market. Drawing them on different axes would hide
 * the comparison the specification is asking for.
 */
import { id, round1, TARIFF, QUOTA, SUBSIDY, BLOC, LADDER, INFANT, FRICTION } from './_packet39b-util.mjs';

const INK = '#e8ecf5', AXIS = '#94a3b8', MUTED = '#7a8299';
const BLUE = '#3b82f6', GREEN = '#059669', AMBER = '#f59e0b', RED = '#ef4444', SLATE = '#94a3b8';

export const FRAME = { w: 400, h: 360 };
export const FACE = { read: 15, small: 12 };
export const estWidth = (text, size) => String(text).length * size * (String(text).length < 4 ? 0.9 : 0.7);

const open = () => `<svg width="${FRAME.w}" height="${FRAME.h}" viewBox="0 0 ${FRAME.w} ${FRAME.h}" xmlns="http://www.w3.org/2000/svg" style="font-family:'DM Sans',system-ui,sans-serif;background:transparent">`;
const close = '</svg>';
const t = (x, y, text, { size = FACE.read, fill = INK, anchor = 'middle', weight = 400 } = {}) =>
  `<text x="${round1(x)}" y="${round1(y)}" fill="${fill}" font-size="${size}" font-weight="${weight}" text-anchor="${anchor}">${text}</text>`;
const line = (x1, y1, x2, y2, stroke, w = 2, dash = '') =>
  `<line x1="${round1(x1)}" y1="${round1(y1)}" x2="${round1(x2)}" y2="${round1(y2)}" stroke="${stroke}" stroke-width="${w}"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`;
const poly = (pts, fill, opacity = 0.35) =>
  `<polygon points="${pts.map(([x, y]) => `${round1(x)},${round1(y)}`).join(' ')}" fill="${fill}" opacity="${opacity}"/>`;
const rect = (x, y, w, h, fill, opacity = 1) =>
  `<rect x="${round1(x)}" y="${round1(y)}" width="${round1(w)}" height="${round1(h)}" rx="2" fill="${fill}"${opacity === 1 ? '' : ` opacity="${opacity}"`}/>`;

/*
 * ON A SOLID FILL, THE LABEL GOES DARK. Measured against the page background #0b1020: light INK is
 * 1.82:1 on amber, 3.11 on blue and 3.18 on green, all below the 4.5:1 floor for text this size,
 * while #0b1020 on the same fills is 8.82, 5.15 and 5.02. SLATE (#64748b) is 3.98:1 as TEXT on the
 * page and is replaced by #94a3b8 at 7.38. MUTED survives at 4.94. The runner measures all of it.
 */
const ONFILL = '#0b1020';
const LABEL = '#94a3b8';

/* ── the shared market skeleton: one set of axes used by three diagrams ───── */

const MK = { x0: 58, x1: 372, yBase: 258, yTop: 84, qMax: 120, pMax: 40 };
const qx = (q) => MK.x0 + (q / MK.qMax) * (MK.x1 - MK.x0);
const py = (p) => MK.yBase - (p / MK.pMax) * (MK.yBase - MK.yTop);

const T = TARIFF, Q = QUOTA, S = SUBSIDY;
const yWorld = py(T.worldPrice);
const yHigh = py(T.protectedPrice);

/** Supply and demand drawn through the four points the spine prints, extended to the frame. */
function curves() {
  const sA = [qx(T.atWorld.supply), yWorld], sB = [qx(T.atProtected.supply), yHigh];
  const dA = [qx(T.atWorld.demand), yWorld], dB = [qx(T.atProtected.demand), yHigh];
  const extend = ([x1, y1], [x2, y2], k) => [x1 + (x2 - x1) * k, y1 + (y2 - y1) * k];
  const sLo = extend(sB, sA, 1.55), sHi = extend(sA, sB, 1.75);
  const dLo = extend(dB, dA, 1.45), dHi = extend(dA, dB, 1.55);
  return { sA, sB, dA, dB, sLo, sHi, dLo, dHi };
}

function skeleton({ title, note, priceLines }) {
  const c = curves();
  const out = [open()];
  out.push(t(FRAME.w / 2, 30, title, { weight: 600 }));
  out.push(line(MK.x0, MK.yTop - 12, MK.x0, MK.yBase, AXIS, 1.5));
  out.push(line(MK.x0, MK.yBase, MK.x1, MK.yBase, AXIS, 1.5));
  out.push(t(MK.x0 - 8, MK.yTop - 26, 'Price', { size: FACE.small, fill: MUTED, anchor: 'start' }));
  out.push(t(MK.x1, MK.yBase + 42, 'Quantity', { size: FACE.small, fill: MUTED, anchor: 'end' }));
  out.push(line(c.sLo[0], c.sLo[1], c.sHi[0], c.sHi[1], GREEN, 2));
  out.push(line(c.dLo[0], c.dLo[1], c.dHi[0], c.dHi[1], BLUE, 2));
  /*
   * EACH CURVE IS LABELLED AT ITS FAR END, AND THAT TOOK THREE TRIES. At the top of the plot the
   * two lines pass within about 36 units of each other, so a label on either ran through the other
   * line, and lifting both clear of the lines put them into each other. Their low ends are 260
   * units apart, which is the only placement with room for both.
   */
  out.push(t(c.sLo[0] - 6, c.sLo[1] + 4, 'S', { fill: GREEN, anchor: 'end', weight: 600 }));
  out.push(t(c.dLo[0] + 6, c.dLo[1] + 4, 'D', { fill: BLUE, anchor: 'start', weight: 600 }));
  for (const [p, label, colour] of priceLines) {
    out.push(line(MK.x0, py(p), MK.x1, py(p), colour, 1.5, p === T.worldPrice ? '' : '5 3'));
    out.push(t(MK.x0 - 6, py(p) + 5, label, { size: FACE.small, fill: colour, anchor: 'end' }));
  }
  for (const [i, ln] of [].concat(note || []).entries()) {
    out.push(t(FRAME.w / 2, 322 + i * 16, ln, { size: FACE.small, fill: MUTED }));
  }
  return { out, c };
}

/* ── 1 · the tariff, with the four areas a, b, c, d ───────────────────────── */

const tariffSvg = (() => {
  const { out } = skeleton({
    title: 'A Tariff: Who Gets What',
    note: [`${T.a} + ${T.b} + ${T.c} + ${T.d} = ${T.consumerLoss}`, 'a to producers, c to the state, b and d lost'],
    priceLines: [[T.worldPrice, `$${T.worldPrice}`, SLATE], [T.protectedPrice, `$${T.protectedPrice}`, AMBER]],
  });
  const xS1 = qx(T.atWorld.supply), xS2 = qx(T.atProtected.supply);
  const xD2 = qx(T.atProtected.demand), xD1 = qx(T.atWorld.demand);

  out.push(poly([[MK.x0, yWorld], [xS1, yWorld], [xS2, yHigh], [MK.x0, yHigh]], GREEN, 0.4));
  out.push(poly([[xS1, yWorld], [xS2, yHigh], [xS2, yWorld]], RED, 0.45));
  out.push(rect(xS2, yHigh, xD2 - xS2, yWorld - yHigh, AMBER));
  out.push(poly([[xD2, yHigh], [xD1, yWorld], [xD2, yWorld]], RED, 0.45));

  out.push(t((MK.x0 + xS1) / 2 - 4, (yWorld + yHigh) / 2 + 5, 'a', { weight: 700 }));
  out.push(t(xS1 + (xS2 - xS1) * 0.62, yWorld - 6, 'b', { weight: 700, size: FACE.small }));
  out.push(t((xS2 + xD2) / 2, (yWorld + yHigh) / 2 + 5, 'c', { weight: 700, fill: ONFILL }));
  out.push(t(xD2 + (xD1 - xD2) * 0.38, yWorld - 6, 'd', { weight: 700, size: FACE.small }));

  for (const [q, lab] of [[T.atWorld.supply, T.atWorld.supply], [T.atProtected.supply, T.atProtected.supply], [T.atProtected.demand, T.atProtected.demand], [T.atWorld.demand, T.atWorld.demand]]) {
    out.push(line(qx(q), MK.yBase, qx(q), MK.yBase + 5, AXIS, 1));
    out.push(t(qx(q), MK.yBase + 22, String(lab), { size: FACE.small, fill: MUTED }));
  }
  out.push(close);
  return out.join('');
})();

/* ── 2 · the quota: identical picture, the middle area renamed ────────────── */

const quotaSvg = (() => {
  const { out } = skeleton({
    title: 'A Quota: the Same Loss, No Revenue',
    note: [`Welfare loss ${Q.deadweight}, the tariff's exactly`, `The ${Q.rent} is rent, not revenue`],
    priceLines: [[T.worldPrice, `$${T.worldPrice}`, SLATE], [Q.price, `$${Q.price}`, AMBER]],
  });
  const xS2 = qx(T.atProtected.supply), xD2 = qx(T.atProtected.demand);
  out.push(rect(xS2, yHigh, xD2 - xS2, yWorld - yHigh, BLUE));
  out.push(t((xS2 + xD2) / 2, (yWorld + yHigh) / 2 + 2, 'rent', { weight: 700, size: FACE.small, fill: ONFILL }));
  out.push(t((xS2 + xD2) / 2, (yWorld + yHigh) / 2 + 18, `quota ${Q.limit}`, { size: FACE.small, fill: ONFILL }));
  out.push(close);
  return out.join('');
})();

/* ── 3 · the subsidy: the price never moves, so there is no area d ────────── */

const subsidySvg = (() => {
  const { out, c } = skeleton({
    title: 'A Subsidy: the Price Does Not Move',
    note: [`Costs ${S.cost}, producers gain ${S.producerGain}, waste ${S.deadweight}`, `Half the tariff's ${T.deadweight}: no demand distortion`],
    priceLines: [[T.worldPrice, `$${T.worldPrice}`, SLATE]],
  });
  const xS1 = qx(S.domesticBefore), xS2 = qx(S.domesticAfter), xD = qx(S.demand);
  const shift = c.sA[0] - qx(S.domesticAfter);
  out.push(line(c.sLo[0] - shift, c.sLo[1], c.sHi[0] - shift, c.sHi[1], GREEN, 2, '6 4'));
  /*
   * LEFT OF THE LINE'S FOOT, NOT ON IT. This label was placed at the start of the shifted curve and
   * the curve ran straight through it — found by Verify A measuring the segment against the label
   * box, not by the collision guard, which compares text boxes to each other and is blind to a line.
   * The runner now checks text against segments too.
   */
  out.push(t(c.sLo[0] - shift - 6, c.sLo[1] + 6, "S'", { fill: GREEN, anchor: 'end', weight: 600 }));
  out.push(poly([[xS1, yWorld], [xS2, yWorld], [xS2, yHigh]], RED, 0.45));
  out.push(t(xS1 + (xS2 - xS1) * 0.62, yWorld - 6, 'b', { weight: 700, size: FACE.small }));
  for (const [q, lab] of [[S.domesticBefore, S.domesticBefore], [S.domesticAfter, S.domesticAfter], [S.demand, S.demand]]) {
    out.push(line(qx(q), MK.yBase, qx(q), MK.yBase + 5, AXIS, 1));
    out.push(t(qx(q), MK.yBase + 22, String(lab), { size: FACE.small, fill: MUTED }));
  }
  out.push(close);
  return out.join('');
})();

/* ── 4 · trade diversion: the price falls and the real cost rises ─────────── */

const diversionSvg = (() => {
  const d = BLOC.diversion;
  const rows = [
    ['Before joining', d.before.pricePaid, d.before.realCost],
    ['After joining', d.after.pricePaid, d.after.realCost],
  ];
  const max = 100;
  const gx0 = 92, gx1 = 372, gBase = 250, gTop = 96;
  const bw = 42;
  const out = [open()];
  out.push(t(FRAME.w / 2, 30, 'Trade Diversion', { weight: 600 }));
  out.push(t(FRAME.w / 2, 52, 'Cheaper for the buyer, dearer for the country', { size: FACE.small, fill: MUTED }));
  out.push(line(gx0, gBase, gx1, gBase, AXIS, 1.5));
  rows.forEach(([label, paid, real], i) => {
    const cx = gx0 + 76 + i * 150;
    const hPaid = ((paid / max) * (gBase - gTop));
    const hReal = ((real / max) * (gBase - gTop));
    out.push(rect(cx - bw - 4, gBase - hPaid, bw, hPaid, BLUE));
    out.push(rect(cx + 4, gBase - hReal, bw, hReal, AMBER));
    out.push(t(cx - bw / 2 - 4, gBase - hPaid - 8, String(paid), { size: FACE.small, fill: INK }));
    out.push(t(cx + bw / 2 + 4, gBase - hReal - 8, String(real), { size: FACE.small, fill: INK }));
    out.push(t(cx, gBase + 22, label, { size: FACE.small, fill: MUTED }));
  });
  out.push(rect(gx0, 286, 12, 12, BLUE));
  out.push(t(gx0 + 18, 296, 'Price the buyer pays', { size: FACE.small, fill: MUTED, anchor: 'start' }));
  out.push(rect(gx0, 306, 12, 12, AMBER));
  out.push(t(gx0 + 18, 316, 'Resources the country gives up', { size: FACE.small, fill: MUTED, anchor: 'start' }));
  out.push(t(FRAME.w / 2, 338, `Price falls ${d.priceFall}, real cost rises ${d.realLoss}`, { size: FACE.small, fill: MUTED }));
  out.push(close);
  return out.join('');
})();

/* ── 5 · the ladder: four rungs, each adding one freedom ──────────────────── */

const ladderSvg = (() => {
  const out = [open()];
  out.push(t(FRAME.w / 2, 30, 'The Four Types of Trading Bloc', { weight: 600 }));
  out.push(t(FRAME.w / 2, 52, 'Each rung adds one freedom to the one below', { size: FACE.small, fill: MUTED }));
  const adds = ['No tariffs between members', 'One common external tariff', 'Labour and capital move freely', 'One currency, one interest rate'];
  const names = ['Free-trade area', 'Customs union', 'Common market', 'Economic and monetary union'];
  /*
   * #94a3b8 RATHER THAN SLATE, AND IT WAS MEASURED. The first rung used SLATE (#64748b) with the
   * dark label #0b1020 on top, which is 3.98:1 — below the 4.5:1 WCAG minimum for small text, and
   * these labels render at about 10.9 CSS px. `npm run contrast` passes on it because that guard
   * reads `processSvg.js` and the themed colour tokens; it does not measure an authored SVG's own
   * text against the rect behind it. A signed-out walkthrough at 390x844 found it by looking.
   * #94a3b8 gives 7.38:1. The other three rungs already passed: blue 5.15, green 5.02, amber 8.82.
   */
  const colours = ['#94a3b8', BLUE, GREEN, AMBER];
  const top = 78, rowH = 62, x0 = 30;
  names.forEach((name, i) => {
    const y = top + i * rowH;
    const w = 120 + i * 62;
    out.push(rect(x0, y, w, 30, colours[i]));
    out.push(t(x0 + 8, y + 20, String(i + 1), { size: FACE.read, fill: ONFILL, anchor: 'start', weight: 700 }));
    out.push(t(x0 + 26, y + 20, name, { size: FACE.small, fill: ONFILL, anchor: 'start', weight: 600 }));
    out.push(t(x0 + 2, y + 46, `+ ${adds[i]}`, { size: FACE.small, fill: MUTED, anchor: 'start' }));
  });
  out.push(t(FRAME.w / 2, 340, 'Each rung also removes a policy instrument', { size: FACE.small, fill: MUTED }));
  out.push(close);
  return out.join('');
})();

/* ── 6 · a bloc against most-favoured nation ─────────────────────────────── */

const mfnSvg = (() => {
  const rate = FRICTION.tariffPct;
  const rows = [['Before the bloc', rate, rate], ['After the bloc', 0, rate]];
  const gx0 = 76, gBase = 244, gTop = 96, bw = 40;
  const out = [open()];
  out.push(t(FRAME.w / 2, 30, 'A Bloc Breaks the First Rule', { weight: 600 }));
  out.push(t(FRAME.w / 2, 52, 'The same good, two exporters, one tariff each', { size: FACE.small, fill: MUTED }));
  out.push(line(gx0, gBase, 372, gBase, AXIS, 1.5));
  const scale = (v) => (v / 16) * (gBase - gTop);
  rows.forEach(([label, member, outsider], i) => {
    const cx = gx0 + 78 + i * 150;
    const hM = scale(member), hO = scale(outsider);
    out.push(rect(cx - bw - 4, gBase - hM, bw, Math.max(hM, 2), GREEN));
    out.push(rect(cx + 4, gBase - hO, bw, hO, RED));
    out.push(t(cx - bw / 2 - 4, gBase - hM - 8, `${member}%`, { size: FACE.small, fill: INK }));
    out.push(t(cx + bw / 2 + 4, gBase - hO - 8, `${outsider}%`, { size: FACE.small, fill: INK }));
    out.push(t(cx, gBase + 22, label, { size: FACE.small, fill: MUTED }));
  });
  out.push(rect(gx0, 282, 12, 12, GREEN));
  out.push(t(gx0 + 18, 292, 'Exporter inside the bloc', { size: FACE.small, fill: MUTED, anchor: 'start' }));
  out.push(rect(gx0, 302, 12, 12, RED));
  out.push(t(gx0 + 18, 312, 'Exporter outside the bloc', { size: FACE.small, fill: MUTED, anchor: 'start' }));
  out.push(t(FRAME.w / 2, 336, 'Same good, different rate: that is the breach', { size: FACE.small, fill: MUTED }));
  out.push(close);
  return out.join('');
})();

/* ── 7 · the infant industry case, as the argument claims it works ───────── */

const infantSvg = (() => {
  const { worldPrice, points, crossesAt } = INFANT;
  const px0 = 62, px1 = 368, pBase = 250, pTop = 92;
  const cx = (q) => px0 + (q / 100) * (px1 - px0);
  const cy = (c) => pBase - ((c - 40) / 60) * (pBase - pTop);
  const out = [open()];
  out.push(t(FRAME.w / 2, 30, 'The Infant Industry Case', { weight: 600 }));
  out.push(t(FRAME.w / 2, 52, 'Unit cost falls as cumulative output rises', { size: FACE.small, fill: MUTED }));
  out.push(line(px0, pTop - 8, px0, pBase, AXIS, 1.5));
  out.push(line(px0, pBase, px1, pBase, AXIS, 1.5));
  out.push(rect(px0, pTop, cx(crossesAt) - px0, pBase - pTop, AMBER, 0.16));
  for (let i = 1; i < points.length; i += 1) {
    out.push(line(cx(points[i - 1][0]), cy(points[i - 1][1]), cx(points[i][0]), cy(points[i][1]), GREEN, 2));
  }
  out.push(line(px0, cy(worldPrice), px1, cy(worldPrice), SLATE, 1.5, '5 3'));
  out.push(t(px0 + 6, cy(worldPrice) - 8, `world price $${worldPrice}`, { size: FACE.small, fill: SLATE, anchor: 'start' }));
  out.push(t(px0 + 6, cy(points[0][1]) - 8, `$${points[0][1]}`, { size: FACE.small, fill: INK, anchor: 'start' }));
  out.push(t(cx(crossesAt), pBase + 22, String(crossesAt), { size: FACE.small, fill: MUTED }));
  out.push(t(cx(crossesAt) / 1 - 4, pTop + 16, 'protected', { size: FACE.small, fill: INK, anchor: 'end' }));
  out.push(t(px1, pBase + 42, 'Cumulative output', { size: FACE.small, fill: MUTED, anchor: 'end' }));
  out.push(t(FRAME.w / 2, 312, `Competitive after ${crossesAt} units of output`, { size: FACE.small, fill: MUTED }));
  out.push(t(FRAME.w / 2, 332, 'The argument needs a credible end point', { size: FACE.small, fill: MUTED }));
  out.push(close);
  return out.join('');
})();

/* ── the exported diagrams ────────────────────────────────────────────────── */

const d = (title, svg, caption, checklist) => ({ id: id('diagram', title), title, svg, caption, checklist });

export const DIAGRAMS = [
  d('A Bloc Breaks the First Rule', mfnSvg,
    `Most-favoured nation says a concession to any member goes to all. A bloc gives its members ${0}% while outsiders still pay ${FRICTION.tariffPct}% on the same good, which is the breach — permitted only because the rules carve out an exception for it.`,
    [
      'The same good and two exporters, so the comparison is like for like.',
      'The rate unchanged for the outsider: nothing was done TO them, and they still lost the sale.',
      'The breach identified as discrimination between members, not as a tariff rise.',
      'The exception noted, so the bloc is shown as permitted rather than illegal.',
    ]),
  d('The Infant Industry Case', infantSvg,
    `Unit cost falls from $${INFANT.startCost} as cumulative output rises, crossing the world price of $${INFANT.worldPrice} after ${INFANT.crossesAt} units. The shaded years are what protection is meant to cover — and the argument only works if it stops there.`,
    [
      'Cost plotted against CUMULATIVE output, not against time or against current output.',
      'The world price as a horizontal line, so the crossing point is visible.',
      'The protected period shaded and finite.',
      'The weakness stated: nothing in a tariff requires the industry to reach the crossing point.',
    ]),
  d('A Tariff: Who Gets What', tariffSvg,
    `A $${T.tariff} tariff takes the price from $${T.worldPrice} to $${T.protectedPrice}. Consumers lose $${T.consumerLoss}: $${T.a} goes to producers as area a, $${T.c} to the government as area c, and areas b and d — $${T.b} each — go to nobody.`,
    [
      'Both curves drawn, and the world price as a horizontal line before the tariff is added.',
      'Four areas labelled a, b, c and d, with the two that are transfers distinguished from the two that are not.',
      `The import quantity shown falling from ${T.importsBefore} to ${T.importsAfter}, from BOTH sides.`,
      'The net loss stated as consumer loss exceeding producer gain plus revenue, not as producer gain being smaller than consumer loss.',
    ]),
  d('A Quota: the Same Loss, No Revenue', quotaSvg,
    `A quota of ${Q.limit} units produces the same $${Q.price} price and the same $${Q.deadweight} welfare loss as the tariff. The $${Q.rent} that would have been government revenue becomes rent to whoever holds the import licence.`,
    [
      'The same axes and the same curves as the tariff diagram, so the two can be compared directly.',
      'The restricted quantity marked between the domestic supply and the total demand at the higher price.',
      'The middle rectangle labelled as rent rather than revenue.',
      'The welfare-loss triangles unchanged, because the price effect is unchanged.',
    ]),
  d('A Subsidy: the Price Does Not Move', subsidySvg,
    `A $${S.perUnit} subsidy shifts the supply curve instead of the price. Consumers still pay $${S.price}, so demand stays at ${S.demand} and there is no consumption distortion — the waste is $${S.deadweight}, half the tariff's $${T.deadweight}.`,
    [
      'The supply curve shifted, and the price line NOT shifted — that is the whole difference.',
      'Demand unchanged at the world price, so no area d exists to draw.',
      'The government\'s cost shown as the per-unit subsidy across domestic output.',
      'Only one triangle of waste, the production distortion b.',
    ]),
  d('Trade Diversion', diversionSvg,
    `Before joining, the buyer pays ${BLOC.diversion.before.pricePaid} to an outsider whose own cost is ${BLOC.diversion.before.realCost} — the rest is tariff the country pays itself. After joining, the partner supplies at ${BLOC.diversion.after.pricePaid}. The price falls by ${BLOC.diversion.priceFall} and the resources given up rise by ${BLOC.diversion.realLoss}.`,
    [
      'Two separate quantities plotted: what the buyer pays, and what the country actually gives up.',
      'The price bar falling and the resource bar rising between the two scenarios.',
      'The tariff identified as a transfer within the country rather than a cost of the good.',
      'The conclusion stated as a loss, despite the lower price.',
    ]),
  d('The Four Types of Trading Bloc', ladderSvg,
    `Four rungs, each the one below plus a single further freedom: no internal tariffs, then a common external tariff, then free movement of factors of production, then a shared currency and monetary policy.`,
    [
      'All four types named in the specification\'s words, in order of depth.',
      'The one thing each rung adds, rather than a list of everything it contains.',
      'Economic and monetary union shown as ONE rung, which is how the specification lists it.',
      'The trade-off noted: each rung removes a restriction and a policy instrument together.',
    ]),
];

export const DIAGRAM_BY_TITLE = Object.fromEntries(DIAGRAMS.map((x) => [x.title, x.id]));
