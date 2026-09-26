// Packet 12.85, E072: drives audit/scripts/text-fit-sweep.js (unchanged) in headless Chrome against the
// served page, through the states in sweep-states.js, once per theme from a fresh load, and once more
// with a deliberately broken fixed-height marked answer to show the sweep fails first.
// node sweep-run.mjs <origin> <out.json>
import { spawn } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const HERE = dirname(fileURLToPath(import.meta.url));
const [origin, out, step = '5'] = process.argv.slice(2);
const sweepSrc = readFileSync(join(HERE, '../../scripts/text-fit-sweep.js'), 'utf8');
const statesSrc = readFileSync(join(HERE, 'sweep-states.js'), 'utf8');
const port = 9700 + Math.floor(Math.random() * 200);
const chrome = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', ['--headless=new', `--remote-debugging-port=${port}`, `--user-data-dir=${mkdtempSync(join(tmpdir(), 'sweep-'))}`, '--no-first-run', '--disable-extensions', '--window-size=1960,1100', 'about:blank'], { stdio: 'ignore' });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let t = []; for (let i = 0; i < 80; i++) { try { t = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json(); if (t.length) break; } catch {} await sleep(150); }
const ws = new WebSocket(t.find((x) => x.type === 'page').webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener('open', r, { once: true }));
let id = 0; const pending = new Map();
ws.addEventListener('message', (m) => { const d = JSON.parse(m.data); if (d.id && pending.has(d.id)) { pending.get(d.id)(d); pending.delete(d.id); } });
const send = (method, params = {}) => new Promise((r) => { const i = ++id; pending.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
const ev = async (expr) => { const r = await send('Runtime.evaluate', { expression: expr, awaitPromise: true, returnByValue: true }); if (r.result?.exceptionDetails) throw new Error(JSON.stringify(r.result.exceptionDetails).slice(0, 800)); return r.result?.result?.value; };
await send('Page.enable'); await send('Runtime.enable');
await send('Emulation.setDeviceMetricsOverride', { width: 1960, height: 1100, deviceScaleFactor: 1, mobile: false });
await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
const url = '/economics/market-failure-model-answers';
const runs = [['broken · light', 'light', true], ['light', 'light', false], ['dark', 'dark', false]];
const result = { page: url, origin, from: 320, to: 1920, step: Number(step), when: new Date().toISOString(), runs: {} };
for (const [name, theme, broken] of runs) {
  await send('Page.navigate', { url: origin + url });
  for (let i = 0; i < 100; i++) { await sleep(200); if ((await ev('document.readyState')) === 'complete') break; }
  await sleep(1500);
  await ev(sweepSrc + '\n;' + statesSrc + '\n;true');
  const t0 = Date.now();
  const r = await ev(`(async () => { window.P1285_SIG = {}; const hydrated = (d) => { const b = d.querySelector('.psx-mode button'); return !!b && Object.keys(b).some((k) => k.startsWith('__reactProps')); };
    const res = await textFitSweep({ url: '${url}', load: 'write', prepare: hydrated, themes: ['${theme}'], from: 320, to: 1920, step: ${Number(step)}, states: P1285_STATES('${theme}', { broken: ${broken} }) });
    return { ...res, signatures: window.P1285_SIG }; })()`);
  result.runs[name] = { seconds: Math.round((Date.now() - t0) / 1000), ...r };
  console.log(name, 'checks', r.checks, 'failing states', Object.values(r.failures).filter((v) => v !== 0).length, `${Math.round((Date.now() - t0) / 1000)}s`);
}
writeFileSync(out, JSON.stringify(result, null, 1));
ws.close(); chrome.kill();
