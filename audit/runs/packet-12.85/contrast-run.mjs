// Packet 12.85, E070 — text contrast on RENDERED PIXELS, paper and dark, on the served practice page.
// `npm run contrast` reads token pairs, not component CSS, so it cannot see this page. Method, per state
// and theme at 1440x900 (and 390x844 for the phone states): every visible element that owns text is
// collected; the page is re-rendered with ALL text made transparent and screenshotted, and the element's
// background is the median pixel of its own box in that screenshot (what is really painted behind the
// glyphs: sheet, tint, highlight, button fill). The foreground is the element's computed colour,
// composited over that background by its alpha and opacity. WCAG ratio; floor 4.5:1 for all text.
// node contrast-run.mjs <origin> <out.json>
import { spawn } from 'node:child_process';
import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
const [origin, out] = process.argv.slice(2);
const port = 9500 + Math.floor(Math.random() * 150);
const chrome = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', ['--headless=new', `--remote-debugging-port=${port}`, `--user-data-dir=${mkdtempSync(join(tmpdir(), 'ctr-'))}`, '--no-first-run', '--disable-extensions', '--hide-scrollbars', 'about:blank'], { stdio: 'ignore' });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let t = []; for (let i = 0; i < 80; i++) { try { t = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json(); if (t.length) break; } catch {} await sleep(150); }
const ws = new WebSocket(t.find((x) => x.type === 'page').webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener('open', r, { once: true }));
let id = 0; const pending = new Map();
ws.addEventListener('message', (m) => { const d = JSON.parse(m.data); if (d.id && pending.has(d.id)) { pending.get(d.id)(d); pending.delete(d.id); } });
const send = (method, params = {}) => new Promise((r) => { const i = ++id; pending.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
const ev = async (expr) => { const r = await send('Runtime.evaluate', { expression: expr, awaitPromise: true, returnByValue: true }); if (r.result?.exceptionDetails) throw new Error(JSON.stringify(r.result.exceptionDetails).slice(0, 800)); return r.result?.result?.value; };
await send('Page.enable'); await send('Runtime.enable');
await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
const url = origin + '/economics/market-failure-model-answers';
const HELP = `window.C={
 q:()=>document.querySelector('.psx-q:not([hidden])'),
 oq:(l)=>{const b=[...document.querySelectorAll('.psx-oq')].find(x=>x.querySelector('.psx-on').textContent===l); if(b&&b.getAttribute('aria-current')!=='true') b.click();},
 type:(v)=>{const t=C.q()&&C.q().querySelector('textarea'); if(!t) return; Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype,'value').set.call(t,v); t.dispatchEvent(new Event('input',{bubbles:true}));},
 btn:(l)=>{const b=C.q()&&[...C.q().querySelectorAll('button')].find(x=>x.textContent===l); if(b) b.click();},
 mode:(l)=>{const b=[...document.querySelectorAll('.psx-mode button')].find(x=>x.textContent===l); if(b&&b.getAttribute('aria-pressed')!=='true') b.click();},
};true`;
const TXT = 'A negative externality of consumption means the social cost is higher than the private cost.\\n\\nThe charge raises the price; PED is -1.4 so use falls a lot.';
const tick = () => sleep(250);
const STATES = [
  ['First question, blank (previous disabled)', 1440, 900, async () => {}],
  ['6(c) writing + booklet, figure linked', 1440, 900, async () => { await ev(`C.oq('(c)')`); await tick(); await ev(`C.type('${TXT}')`); await tick(); }],
  ['6(c) marked by points, a point ticked and seen', 1440, 900, async () => { await ev(`C.btn('Mark my answer')`); await tick(); await ev(`C.q().querySelector('.psx-pt input').click()`); await tick(); await ev(`C.q().querySelectorAll('.psx-see')[2].click()`); await tick(); await ev(`document.querySelector('.psx-booklet .ps-fig').click()`); await tick(); }],
  ['6(e) marked by levels, level and mark chosen', 1440, 900, async () => { await ev(`C.oq('(e)')`); await tick(); await ev(`C.type('${TXT}')`); await tick(); await ev(`C.btn('Mark my answer')`); await tick(); await ev(`C.q().querySelectorAll('.psx-lv button')[1].click()`); await tick(); }],
  ['Section D essay choice', 1440, 900, async () => { await ev(`C.oq('7')`); await tick(); }],
  ['Section D after picking 8 (7 dimmed in the outline)', 1440, 900, async () => { await ev(`document.querySelectorAll('.psx-pickessay:not([hidden]) .psx-btn')[1].click()`); await tick(); await ev(`C.type('${TXT}')`); await tick(); }],
  ['Model answers mode, 2 Draw', 1440, 900, async () => { await ev(`C.mode('Model answers')`); await tick(); await ev(`C.oq('2')`); await tick(); }],
  ['Phone: outline open', 390, 844, async () => { await ev(`C.mode('Practise')`); await tick(); await ev(`document.querySelector('.psx-mbar button').click()`); await tick(); }],
  ['Phone: 6(b) answer seen', 390, 844, async () => { await ev(`C.oq('(b)')`); await tick(); await ev(`C.btn('Show the model answer')`); await tick(); }],
];
const COLLECT = `(() => {
  const own = (el) => [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
  const out = []; const seen = new Set();
  document.querySelectorAll('.psx *').forEach((el) => {
    if (!own(el)) return; const cs = getComputedStyle(el); if (cs.display === 'none' || cs.visibility === 'hidden') return;
    const r = el.getBoundingClientRect(); if (r.width < 2 || r.height < 2 || r.bottom < 0 || r.top > innerHeight || r.right < 0 || r.left > innerWidth) return;
    let op = 1; for (let p = el; p; p = p.parentElement) op *= parseFloat(getComputedStyle(p).opacity);
    const key = (el.className && typeof el.className === 'string' ? el.className : el.tagName) + '|' + cs.color + '|' + op;
    const text = el.textContent.trim().replace(/\\s+/g, ' ').slice(0, 40);
    out.push({ key, text, tag: el.tagName, cls: typeof el.className === 'string' ? el.className : '', color: cs.color, opacity: op, size: cs.fontSize, weight: cs.fontWeight,
      box: { x: Math.max(0, r.left), y: Math.max(0, r.top), w: Math.min(r.width, innerWidth - Math.max(0, r.left)), h: Math.min(r.height, innerHeight - Math.max(0, r.top)) } });
  });
  return out; })()`;
const lum = ([r, g, b]) => { const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
const ratio = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };
const parse = (c) => { const m = c.match(/[\d.]+/g).map(Number); return { rgb: m.slice(0, 3), a: m.length > 3 ? m[3] : 1 }; };
const result = { page: '/economics/market-failure-model-answers', method: 'see contrast-run.mjs header', floor: 4.5, themes: {} };
for (const theme of ['light', 'dark']) {
  await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
  await send('Page.navigate', { url });
  for (let i = 0; i < 100; i++) { await sleep(200); if ((await ev('document.readyState')) === 'complete') break; }
  await sleep(1500);
  await ev(`try{localStorage.clear()}catch(e){}; true`);
  // Reload so the page starts from empty storage (a previous theme's run leaves drafts and a choice).
  await send('Page.navigate', { url });
  for (let i = 0; i < 100; i++) { await sleep(200); if ((await ev('document.readyState')) === 'complete') break; }
  await sleep(1500);
  await ev(HELP);
  if (theme === 'dark') { await ev(`document.querySelector('.psx-theme').click()`); await tick(); }
  const rows = [];
  for (const [name, w, h, drive] of STATES) {
    await send('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: 1, mobile: w < 768 });
    await tick(); await drive(); await ev(`window.scrollTo(0,0)`); await tick();
    const themeNow = await ev(`document.querySelector('.psx').dataset.theme`);
    const els = await ev(COLLECT);
    await ev(`(()=>{const s=document.createElement('style');s.id='ctr-hide';s.textContent='.psx *, .psx *::before, .psx *::after{color:transparent!important;-webkit-text-fill-color:transparent!important;text-decoration-color:transparent!important;caret-color:transparent!important}';document.head.appendChild(s);})()`);
    await sleep(150);
    const shot = await send('Page.captureScreenshot', { format: 'png' });
    await ev(`document.getElementById('ctr-hide').remove()`);
    const bgs = await ev(`(async () => { const img = new Image(); img.src = 'data:image/png;base64,${shot.result.data}'; await img.decode();
      const c = document.createElement('canvas'); c.width = img.width; c.height = img.height; const x = c.getContext('2d'); x.drawImage(img, 0, 0);
      const els = ${JSON.stringify(els.map((e) => e.box))};
      return els.map((b) => { const d = x.getImageData(Math.floor(b.x), Math.floor(b.y), Math.max(1, Math.floor(b.w)), Math.max(1, Math.floor(b.h))).data; const px = [];
        for (let i = 0; i < d.length; i += 4) px.push([d[i], d[i + 1], d[i + 2]]); px.sort((p, q) => (p[0] + p[1] + p[2]) - (q[0] + q[1] + q[2])); return px[Math.floor(px.length / 2)]; }); })()`);
    els.forEach((e, i) => {
      const fg = parse(e.color); const bg = bgs[i]; const a = fg.a * e.opacity;
      const comp = fg.rgb.map((v, k) => Math.round(v * a + bg[k] * (1 - a)));
      rows.push({ state: name, width: w, theme: themeNow, text: e.text, cls: e.cls.split(' ')[0] || e.tag, color: e.color, opacity: +e.opacity.toFixed(2), bg: `rgb(${bg.join(',')})`, ratio: +ratio(comp, bg).toFixed(2), size: e.size });
    });
  }
  const worst = rows.slice().sort((a, b) => a.ratio - b.ratio);
  const under = worst.filter((r) => r.ratio < 4.5);
  result.themes[theme] = { measured: rows.length, below45: under.length, lowest: worst.slice(0, 12), belowFloor: under };
  console.log(theme, 'measured', rows.length, 'below 4.5:1', under.length, 'lowest', worst[0] && `${worst[0].ratio} ${worst[0].cls} «${worst[0].text}» in ${worst[0].state}`);
}
writeFileSync(out, JSON.stringify(result, null, 1));
ws.close(); chrome.kill();
