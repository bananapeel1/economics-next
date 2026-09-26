// Packet 12.75 fix round 1 (E050). State drivers for audit/scripts/text-fit-sweep.js on
// /economics/market-failure-model-answers. Every `run` is IDEMPOTENT (the sweep calls it at each of
// the 321 widths) and ENFORCES its state rather than toggling. New in this round: the Extract tab
// states — below 1024px the extract pane is display:none unless its tab is selected, so round 0's
// 18 states never measured Table 1 at phone width. Each state records a read-back signature at 390
// and 1440 into window.__sig so it can be proved that the state engaged.
(() => {
  const DRAFT = 'The AED 0.25 per bag charge raises the private cost of using a bag. Because demand is price elastic (PED -1.4), consumption falls more than proportionately, which is consistent with the 45% fall reported in the extract, moving output towards the socially optimal level.';
  const qa = (D, s) => [...D.querySelectorAll(s)];
  const cur = (D) => D.querySelector('.ps-set:not([hidden]) .ps-work:not([hidden])');
  const tabsOf = (D) => qa(D, '.ps-set:not([hidden]) .ps-tabs button');

  async function ensureSet(D, settle, si) {
    const b = qa(D, '.ps-setswitch button')[si];
    if (b && b.getAttribute('aria-pressed') !== 'true') { b.click(); await settle(); }
  }
  async function ensureCard(D, settle, ci) {
    const c = qa(D, '.ps-card')[ci];
    if (c && c.getAttribute('aria-current') !== 'step') { c.click(); await settle(); }
  }
  async function ensureMode(D, settle, answers) {
    const b = qa(D, '.ps-modes button')[answers ? 1 : 0];
    if (b.getAttribute('aria-pressed') !== 'true') { b.click(); await settle(); }
  }
  const phaseOf = (D) => {
    const w = cur(D);
    if (!w) return '?';
    if (!w.querySelector('.ps-attempt').hidden) return 'attempt';
    return w.querySelector('.ps-score') ? 'marking' : 'other';
  };
  async function ensureAttempt(D, settle) {
    if (phaseOf(D) === 'attempt') return;
    const btn = qa(D, '.ps-set:not([hidden]) .ps-linkbtn').find((b) => /Edit your answer|Try it yourself/.test(b.textContent) && b.offsetParent !== null)
      || qa(D, '.ps-set:not([hidden]) .ps-linkbtn').find((b) => /Edit your answer|Try it yourself/.test(b.textContent));
    if (btn) { btn.click(); await settle(); }
  }
  async function ensureMarking(D, settle) {
    if (phaseOf(D) === 'marking') return;
    await ensureAttempt(D, settle);
    const ta = cur(D).querySelector('textarea');
    if (!ta.value.trim()) {
      const W = D.defaultView;
      Object.getOwnPropertyDescriptor(W.HTMLTextAreaElement.prototype, 'value').set.call(ta, DRAFT);
      ta.dispatchEvent(new W.Event('input', { bubbles: true }));
      await settle();
    }
    const p = D.querySelector('.ps-btn.is-primary');
    if (/Mark my answer/.test(p.textContent)) { p.click(); await settle(); }
  }
  async function ensureTab(D, settle, which) {
    const t = tabsOf(D);
    if (!t.length) return;
    const b = which === 'extract' ? t[0] : t[1];
    if (b.getAttribute('aria-selected') !== 'true') { b.click(); await settle(); }
  }
  async function ensureNote(D, settle) {
    const w = cur(D);
    if (w.querySelector('.ps-note:not([hidden])')) return;
    const where = w.querySelector('.ps-where');
    if (where) { where.click(); await settle(); }
  }
  function light(D) {
    if (!window.__lightRun) return;
    D.documentElement.dataset.theme = 'light';
    D.querySelectorAll('.rl-night').forEach((e) => e.classList.remove('rl-night'));
  }
  window.__sig = {};
  function sign(D, name) {
    const W = D.defaultView;
    const w = W.innerWidth;
    if (w !== 390 && w !== 1440) return;
    const ex = D.querySelector('.ps-set:not([hidden]) .ps-pane-extract');
    const wrap = ex?.querySelector('.ps-twrap');
    const tl = ex?.querySelector('.ps-tlabel');
    window.__sig[`${window.__lightRun ? 'light' : 'dark'} · ${name} @${w}`] = {
      set: D.querySelector('.ps-setswitch button[aria-pressed="true"]')?.textContent,
      card: qa(D, '.ps-card').findIndex((c) => c.getAttribute('aria-current') === 'step') + 1,
      mode: D.querySelector('.ps-modes button[aria-pressed="true"]')?.textContent.trim(),
      phase: phaseOf(D),
      tab: tabsOf(D).find((b) => b.getAttribute('aria-selected') === 'true')?.textContent ?? '(no tabs)',
      extractShown: !!ex && W.getComputedStyle(ex).display !== 'none',
      tableWidth: wrap ? Math.round(wrap.getBoundingClientRect().width) : null,
      tableSideways: wrap ? wrap.scrollWidth - wrap.clientWidth : null,
      stacked: tl ? W.getComputedStyle(tl).display !== 'none' : null,
      focusRows: ex ? ex.querySelectorAll('tr.is-focus').length : null,
      noteOpen: !!cur(D)?.querySelector('.ps-note:not([hidden])'),
      theme: D.documentElement.dataset.theme,
      pinned: !!D.querySelector('.rl-night'),
    };
  }
  const S = [];
  const mk = (name, fn, after) => S.push({ name, run: async (D, settle) => { light(D); await fn(D, settle); await settle(); sign(D, name); }, after });
  const back = async (D, settle) => { await ensureMode(D, settle, false); };
  for (const [si, label] of [[0, 'Extract A'], [1, 'Standalone']]) {
    const ex = si === 0;
    for (let q = 0; q < 3; q += 1) {
      mk(`${label} Q${q + 1} writing`, async (D, s) => { await ensureMode(D, s, false); await ensureSet(D, s, si); await ensureCard(D, s, q); await ensureAttempt(D, s); await ensureTab(D, s, 'work'); });
      if (ex) mk(`${label} Q${q + 1} writing, Extract tab`, async (D, s) => { await ensureMode(D, s, false); await ensureSet(D, s, si); await ensureCard(D, s, q); await ensureAttempt(D, s); await ensureTab(D, s, 'extract'); });
    }
    for (let q = 0; q < 3; q += 1) {
      mk(`${label} Q${q + 1} marking, note open`, async (D, s) => { await ensureMode(D, s, false); await ensureSet(D, s, si); await ensureCard(D, s, q); await ensureMarking(D, s); await ensureTab(D, s, 'work'); await ensureNote(D, s); });
      if (ex) mk(`${label} Q${q + 1} marking, Extract tab (focus rows)`, async (D, s) => { await ensureMode(D, s, false); await ensureSet(D, s, si); await ensureCard(D, s, q); await ensureMarking(D, s); await ensureTab(D, s, 'extract'); });
    }
    for (let q = 0; q < 3; q += 1) {
      mk(`${label} Q${q + 1} Model answers, note open`, async (D, s) => { await ensureMode(D, s, true); await ensureSet(D, s, si); await ensureCard(D, s, q); await ensureTab(D, s, 'work'); await ensureNote(D, s); }, back);
      if (ex) mk(`${label} Q${q + 1} Model answers, Extract tab`, async (D, s) => { await ensureMode(D, s, true); await ensureSet(D, s, si); await ensureCard(D, s, q); await ensureTab(D, s, 'extract'); }, back);
    }
  }
  window.__states = S;
})();
