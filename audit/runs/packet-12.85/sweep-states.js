/* Packet 12.85, E072 — the states audit/scripts/text-fit-sweep.js is run through on
   /economics/market-failure-model-answers. Each `run` DRIVES the state (idempotently, it is called at
   every width) and records a signature of what is on screen the first time, so the report proves every
   state engaged (12.75's lesson: a sweep that only ever measured the initial render passed 5,778 checks).
   Loaded into the page by audit/runs/packet-12.85/sweep-run.mjs, after the sweep script itself. */
window.P1285_STATES = (theme, { broken = false } = {}) => {
  const sig = (window.P1285_SIG = window.P1285_SIG || {});
  const $ = (d, s) => d.querySelector(s);
  const $$ = (d, s) => [...d.querySelectorAll(s)];
  const setTheme = (d) => { const r = $(d, '.psx'); if (r && r.dataset.theme !== theme) r.dataset.theme = theme; };
  const vis = (d) => $(d, '.psx-q:not([hidden])');
  const goQ = async (d, settle, label) => {
    const b = $$(d, '.psx-oq').find((x) => x.querySelector('.psx-on').textContent === label && x.textContent.includes(''));
    if (b && b.getAttribute('aria-current') !== 'true') { b.click(); await settle(); }
  };
  const goCmd = async (d, settle, cmd) => {
    const b = $$(d, '.psx-oq').find((x) => x.textContent.includes(cmd));
    if (b && b.getAttribute('aria-current') !== 'true') { b.click(); await settle(); }
  };
  const mode = async (d, settle, which) => {
    const b = $$(d, '.psx-mode button').find((x) => x.textContent === which);
    if (b && b.getAttribute('aria-pressed') !== 'true') { b.click(); await settle(); }
  };
  const type = async (d, settle, text) => {
    const t = vis(d) && vis(d).querySelector('textarea');
    if (!t || t.value === text) return;
    Object.getOwnPropertyDescriptor(d.defaultView.HTMLTextAreaElement.prototype, 'value').set.call(t, text);
    t.dispatchEvent(new d.defaultView.Event('input', { bubbles: true }));
    await settle();
  };
  const btn = async (d, settle, label) => {
    const b = vis(d) && [...vis(d).querySelectorAll('button')].find((x) => x.textContent === label);
    if (b) { b.click(); await settle(); }
  };
  const outline = async (d, settle, open) => {
    const o = $(d, '.psx-outline'); const m = $(d, '.psx-mbar button');
    if (o && m && o.classList.contains('is-open') !== open) { m.click(); await settle(); }
  };
  const record = (d, name) => {
    if (sig[`${theme} · ${name}`]) return;
    const q = vis(d);
    sig[`${theme} · ${name}`] = {
      width: d.documentElement.clientWidth,
      theme: $(d, '.psx') && $(d, '.psx').dataset.theme,
      mode: ($$(d, '.psx-mode button').find((x) => x.getAttribute('aria-pressed') === 'true') || {}).textContent,
      question: q ? q.dataset.item : '(none: essay choice)',
      pickScreen: !!$(d, '.psx-pickessay:not([hidden])'),
      booklet: !!$(d, '.psx-booklet:not([hidden])'),
      markScheme: !!(q && q.querySelector('.psx-markblock:not([hidden])')),
      interactive: q ? (q.querySelectorAll('.psx-pt input').length + q.querySelectorAll('.psx-pick button, .psx-lv button').length) : 0,
      yours: q && q.querySelector('.psx-yours') ? q.querySelector('.psx-yours').textContent.length : 0,
      outlineOpen: !!$(d, '.psx-outline.is-open'),
      score: q && q.querySelector('.psx-score') ? q.querySelector('.psx-score').textContent : null,
    };
  };
  const LONG = 'A negative externality of consumption means the social cost of a bag is higher than the private cost, so too many bags are used.\n\nThe AED 0.25 charge makes each bag more expensive. The extract says the PED for bags is -1.4, so demand is elastic and use falls a lot. Dubai Municipality reported a 45% fall in the first year.\n\nBecause shoppers pay more they use fewer bags, which moves consumption towards the social optimum and shrinks the welfare loss. Supercalifragilisticexpialidociousness-length-words-do-not-bleed.';
  const S = (name, fn) => ({ name, run: async (d, settle) => { setTheme(d); if (broken) { let st = d.getElementById('p1285-broken'); if (!st) { st = d.createElement('style'); st.id = 'p1285-broken'; st.textContent = '.psx .psx-yours{height:64px;overflow:hidden}'; d.head.appendChild(st); } } await fn(d, settle); setTheme(d); await settle(); record(d, name); } });
  const all = [
    S('Section B · 1 Explain, blank', async (d, s) => { await mode(d, s, 'Practise'); await outline(d, s, false); await goQ(d, s, '1'); }),
    S('Section B · 2 Draw, on paper', async (d, s) => { await goQ(d, s, '2'); }),
    S('Section B · 3 Calculate with its table', async (d, s) => { await goQ(d, s, '3'); await type(d, s, '% change = 25%'); }),
    S('Section C · 6(a) writing with the source booklet', async (d, s) => { await goQ(d, s, '6(a)'); await type(d, s, LONG); }),
    S('Section C · 6(c) marked by points', async (d, s) => { await goQ(d, s, '(c)'); await type(d, s, LONG); await btn(d, s, 'Mark my answer'); const c = vis(d).querySelectorAll('.psx-pt input'); if (c[0] && !c[0].checked) { c[0].click(); await s(); } const see = vis(d).querySelectorAll('.psx-see')[3]; if (see && !vis(d).querySelector('.psx-note:not([hidden])')) { see.click(); await s(); } }),
    S('Section C · 6(e) marked by levels', async (d, s) => { await goQ(d, s, '(e)'); await type(d, s, LONG); await btn(d, s, 'Mark my answer'); const lv = vis(d).querySelectorAll('.psx-lv button'); if (lv[1] && lv[1].getAttribute('aria-pressed') !== 'true') { lv[1].click(); await s(); } if (lv[5] && lv[5].getAttribute('aria-pressed') !== 'true') { lv[5].click(); await s(); } }),
    S('Section C · 6(b) answer seen', async (d, s) => { await goQ(d, s, '(b)'); await btn(d, s, 'Show the model answer'); }),
    S('Section D · essay choice, before picking', async (d, s) => { await goQ(d, s, '7'); }),
    S('Section D · essay choice, after picking 8', async (d, s) => { await goQ(d, s, '7'); const pick = d.querySelectorAll('.psx-pickessay:not([hidden]) .psx-btn'); if (pick[1]) { pick[1].click(); await s(); } await type(d, s, LONG); }),
    S('Section D · the essay not chosen', async (d, s) => { await goQ(d, s, '7'); }),
    S('More practice · Examine 8 marked', async (d, s) => { await goCmd(d, s, 'Examine 8'); const more = [...d.querySelectorAll('.psx-oq')].filter((x) => x.textContent.includes('Examine 8')).pop(); if (more && more.getAttribute('aria-current') !== 'true') { more.click(); await s(); } await type(d, s, LONG); await btn(d, s, 'Mark my answer'); }),
    S('Model answers mode · 6(e)', async (d, s) => { await mode(d, s, 'Model answers'); await goQ(d, s, '(e)'); }),
    S('Model answers mode · 2 Draw', async (d, s) => { await mode(d, s, 'Model answers'); await goQ(d, s, '2'); }),
    S('Phone outline open', async (d, s) => { await mode(d, s, 'Practise'); await outline(d, s, true); }),
  ];
  return broken ? all.filter((x) => /6\(c\)/.test(x.name)) : all;
};
