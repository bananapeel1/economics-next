/**
 * Text-fit sweep — proves that no text on a page is ever cut, spilled or shortened, at any width.
 *
 * Written 26 September 2026 for packet 12.75, after the founder found question cards cutting
 * "6 marks" to "6 mar" at ~700px. Three spot-check widths (375, 1280, 1440) had passed; the defect
 * lived between them. A width sweep is the only check that sees the gaps between breakpoints.
 *
 * WHAT COUNTS AS A FAILURE, for every visible element that owns text:
 *   PAGE      the document scrolls sideways
 *   BLEED     the element's box extends past its nearest boxed ancestor — one with a border, a
 *             background, clipped overflow, or a button/td/th — by more than 1px horizontally
 *   CLIP      overflow cuts the text and no ellipsis marks it
 *   ELLIPSIS  the text is shortened with "…"  (a failure unless `allowEllipsis` is set: the founder
 *             asked for no shortened text at all on the practice page)
 *   HSCROLL   any container scrolls sideways, unless it holds a table or code block
 *   TABLE     a table's container scrolls sideways at phone width (<= 640px): columns are hidden
 * Text whose overflow is caught by a scroller inside its box is judged by HSCROLL, not BLEED.
 *
 * HOW TO RUN. There is no headless browser in this repository, so this runs in a real browser tab
 * (the Claude Browser pane, or DevTools) opened on any same-origin page of the dev server:
 *
 *   const sweep = (await import('/path/served/text-fit-sweep.js')) ... or paste this file, then:
 *   await textFitSweep({
 *     url: '/economics/market-failure-model-answers',
 *     states: [
 *       { name: 'Q1 writing', run: (doc) => doc.querySelector('[data-q="0"]').click() },
 *       { name: 'Model answers', run: (doc) => doc.querySelector('#mode-answers').click() },
 *     ],
 *     themes: ['dark', 'light'],     // set as data-theme on <html>
 *     from: 320, to: 1920, step: 5,
 *   });
 *
 * It returns { checks, failures: { '<theme> · <state>': 0 | { count, first: [...] } } }.
 * Every value must be 0.
 *
 * ON THIS SITE (packet 12.75): pass `load: 'write'` and run it FROM the page being swept — every route
 * sends `X-Frame-Options: DENY`, so the default framed navigation is refused. Pass `prepare: (doc) =>
 * <true once hydrated>`. A state's `run(doc, settle)` may be async and should `await settle()` after each
 * click, because React applies a click after the click returns; an optional `after(doc, settle)` undoes
 * a state (e.g. switches the mode back). The light theme must be re-asserted inside `run`: the app sets
 * `data-theme` itself after hydration. PROVE EVERY STATE ENGAGED — read back a signature of the page at
 * one width per state; packet 12.75's first real-page run passed 5,778 checks that had all measured
 * the initial render (audit/runs/packet-12.75/text-fit.json).
 *
 * Measurements are synchronous (layout is forced by reading geometry), so it works in a hidden tab
 * where requestAnimationFrame and timers are throttled. Fonts are awaited before the first
 * measurement; a fallback font has different metrics and would make the sweep meaningless.
 *
 * PROVED BY A/B on 26 Sep 2026 against the practice mockup: the pre-fix version fails at 650–810px
 * with BLEED on the question-card metadata, the fixed version passes all widths. A sweep that has
 * never been seen to fail is not evidence (see npm run contrast, 21 Sep).
 */
async function textFitSweep({ url, states, themes = ['dark', 'light'], from = 320, to = 1920, step = 5, allowEllipsis = false, load = 'navigate', prepare = null }) {
  const ifr = document.createElement('iframe');
  ifr.style.cssText = 'border:0;height:900px;width:1440px;display:block;position:fixed;left:0;top:0;z-index:2147483647;background:#fff';
  document.body.appendChild(ifr);
  if (load === 'write') {
    /* Packet 12.75. The site sends `X-Frame-Options: DENY` on every route (next.config.mjs), so a
       framed NAVIGATION to the real page is refused and the sweep would measure an error page. In
       'write' mode the page's own HTML is fetched and written into an about:blank frame; a document
       written with open()/write() takes the URL of the document that wrote it, so run the sweep
       FROM the page being swept and the app's router and hydration see their own path. Storage is
       cleared before the write, because reloading a written frame would navigate and be refused. */
    try { localStorage.clear(); } catch (e) { /* storage blocked: fine */ }
    const html = await (await fetch(url, { cache: 'no-store' })).text();
    await new Promise((r) => { ifr.onload = r; ifr.src = 'about:blank'; });
    ifr.contentDocument.open();
    ifr.contentDocument.write(html);
    ifr.contentDocument.close();
    // Hydration: wait until the app has attached its handlers (a caller-supplied probe), or 4s.
    for (let i = 0; i < 80; i += 1) {
      if (!prepare || prepare(ifr.contentDocument)) break;
      await new Promise((r) => setTimeout(r, 50));
    }
  } else {
    await new Promise((r) => { ifr.onload = r; ifr.src = url; });
    try { ifr.contentWindow.localStorage.clear(); } catch (e) { /* storage blocked: fine, start as-is */ }
    await new Promise((r) => { ifr.onload = r; ifr.contentWindow.location.reload(); });
  }
  const D = ifr.contentDocument;
  const W = ifr.contentWindow;
  await D.fonts.ready;

  const ownsText = (el) => [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
  const visible = (el) => {
    const cs = W.getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden') return false;
    const r = el.getBoundingClientRect();
    return r.width > 0 && r.height > 0;
  };
  const isBox = (el) => {
    if (/^(BUTTON|TD|TH)$/.test(el.tagName)) return true;
    const cs = W.getComputedStyle(el);
    const border = ['Left', 'Right', 'Top', 'Bottom'].some((s) => parseFloat(cs['border' + s + 'Width']) > 0);
    const bg = cs.backgroundColor && !/rgba\(0, 0, 0, 0\)|transparent/.test(cs.backgroundColor);
    return border || bg || /hidden|clip/.test(cs.overflowX);
  };
  const scroller = (el) => {
    for (let p = el.parentElement; p; p = p.parentElement) {
      if (/auto|scroll/.test(W.getComputedStyle(p).overflowX)) return p;
    }
    return null;
  };
  const boxOf = (el) => {
    for (let p = el.parentElement; p && p !== D.body; p = p.parentElement) if (isBox(p)) return p;
    return null;
  };
  const label = (el) => (el.className && typeof el.className === 'string' ? el.className.split(' ')[0] : el.tagName);

  function check() {
    const bad = [];
    if (D.documentElement.scrollWidth > W.innerWidth + 1) bad.push(`PAGE scrollWidth=${D.documentElement.scrollWidth}`);
    // Sideways scrolling is allowed only around a table or code, and at phone width not even there.
    D.querySelectorAll('body *').forEach((el) => {
      if (!/auto|scroll/.test(W.getComputedStyle(el).overflowX) || !visible(el)) return;
      const spill = el.scrollWidth - el.clientWidth;
      if (spill <= 1) return;
      const wide = el.querySelector('table, pre');
      if (!wide) bad.push(`HSCROLL ${label(el)} scrolls sideways by ${spill}px`);
      else if (W.innerWidth <= 640 && wide.tagName === 'TABLE') bad.push(`TABLE hidden ${spill}px`);
    });
    D.querySelectorAll('body *').forEach((el) => {
      if (!ownsText(el) || !visible(el)) return;
      const cs = W.getComputedStyle(el);
      const r = el.getBoundingClientRect();
      const text = el.textContent.trim().slice(0, 28);
      if (el.scrollWidth > el.clientWidth + 1 && /hidden|clip/.test(cs.overflowX)) {
        if (cs.textOverflow !== 'ellipsis') bad.push(`CLIP ${label(el)} «${text}»`);
        else if (!allowEllipsis) bad.push(`ELLIPSIS ${label(el)} «${text}»`);
      }
      const box = boxOf(el);
      if (!box) return;
      // A scroller between the text and its box turns spill into scrolling, which HSCROLL judges.
      const sc = scroller(el);
      if (sc && box.contains(sc)) return;
      const b = box.getBoundingClientRect();
      const over = Math.max(r.right - b.right, b.left - r.left);
      if (over > 1) bad.push(`BLEED ${label(el)} «${text}» past ${label(box)} by ${Math.round(over)}px`);
    });
    return [...new Set(bad)];
  }

  /* Packet 12.75. A React app applies a click's state change in a microtask or a scheduler task,
     not inside `click()`, so a state that is driven synchronously and measured at once is measured
     BEFORE it renders — the first real-page run of this sweep "passed" 5,778 checks that had all
     measured the page's initial state. `run` may now be async, and every run is followed by a yield
     to the microtask queue and one MessageChannel task (not a timer: timers are throttled to one a
     second in a hidden tab, which is where the Browser pane runs). */
  const settle = async () => {
    for (let i = 0; i < 3; i += 1) await Promise.resolve();
    await new Promise((r) => { const c = new MessageChannel(); c.port1.onmessage = () => r(); c.port2.postMessage(0); });
  };

  const failures = {};
  let checks = 0;
  for (const theme of themes) {
    D.documentElement.dataset.theme = theme;
    for (const state of states) {
      const fails = [];
      for (let x = from; x <= to; x += step) {
        ifr.style.width = `${x}px`;
        ifr.style.height = `${x >= 1024 ? 900 : 844}px`;
        void D.body.offsetWidth;
        await state.run(D, settle);
        await settle();
        void D.body.offsetWidth;
        const b = check();
        checks += 1;
        if (b.length) fails.push(`${x}: ${b.slice(0, 3).join(' | ')}`);
      }
      failures[`${theme} · ${state.name}`] = fails.length ? { count: fails.length, first: fails.slice(0, 6) } : 0;
      if (state.after) { await state.after(D, settle); await settle(); }
    }
  }
  ifr.remove();
  return { checks, failures };
}

if (typeof window !== 'undefined') window.textFitSweep = textFitSweep;
