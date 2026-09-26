// Packet 12.75 fix round 1. Contrast of every text run in the stacked Table 1 (labels and values),
// on the rendered DOM: computed colour composited over the alpha-stacked ancestor backgrounds,
// colours resolved through a canvas so color-mix()/oklab values come out as sRGB pixels.
window.__tableContrast = () => {
  const cv = document.createElement('canvas').getContext('2d', { willReadFrequently: true });
  const px = (c) => { cv.clearRect(0, 0, 1, 1); cv.fillStyle = '#000'; cv.fillStyle = c; cv.fillRect(0, 0, 1, 1); const d = cv.getImageData(0, 0, 1, 1).data; return [d[0], d[1], d[2], d[3] / 255]; };
  const over = (t, b) => [0, 1, 2].map((i) => t[i] * t[3] + b[i] * (1 - t[3])).concat(1);
  const bgOf = (el) => { const st = []; for (let p = el; p; p = p.parentElement) { const c = px(getComputedStyle(p).backgroundColor); if (c[3] > 0) st.push(c); if (c[3] >= 1) break; } let b = [255, 255, 255, 1]; for (let i = st.length - 1; i >= 0; i--) b = over(st[i], b); return b; };
  const lum = (c) => { const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(c[0]) + 0.7152 * f(c[1]) + 0.0722 * f(c[2]); };
  const ratio = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };
  const rows = [];
  document.querySelectorAll('.ps-set:not([hidden]) .ps-pane-extract .ps-table tr').forEach((tr, i) => {
    tr.querySelectorAll('.ps-tlabel, .ps-tval, thead th').forEach((el) => {
      if (getComputedStyle(el).display === 'none') return;
      const bg = bgOf(el); const fg = over(px(getComputedStyle(el).color), bg);
      rows.push({ row: i, focus: tr.classList.contains('is-focus'), cls: el.className || el.tagName, text: el.textContent.slice(0, 24), ratio: +ratio(fg, bg).toFixed(2) });
    });
  });
  return { width: innerWidth, theme: document.documentElement.dataset.theme, pinned: !!document.querySelector('.rl-night'), pairs: rows.length, min: Math.min(...rows.map((r) => r.ratio)), below45: rows.filter((r) => r.ratio < 4.5) };
};
