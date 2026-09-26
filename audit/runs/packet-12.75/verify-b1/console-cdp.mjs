// Load the shell page at 390 in a fresh headless profile and collect console errors and uncaught exceptions.
import { spawn } from 'node:child_process';
import { mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const port = 9950 + Math.floor(Math.random() * 40);
const chrome = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', ['--headless=new', `--remote-debugging-port=${port}`, `--user-data-dir=${mkdtempSync(join(tmpdir(), 'b1c-'))}`, '--no-first-run', 'about:blank'], { stdio: 'ignore' });
let t; for (let i = 0; i < 80; i++) { try { t = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json(); if (t.length) break; } catch {} await sleep(200); }
const ws = new WebSocket(t.find((x) => x.type === 'page').webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener('open', r, { once: true }));
let id = 0; const errs = [];
ws.addEventListener('message', (m) => { const d = JSON.parse(m.data);
  if (d.method === 'Runtime.exceptionThrown') errs.push('EXC ' + (d.params.exceptionDetails.exception?.description || d.params.exceptionDetails.text).slice(0, 200));
  if (d.method === 'Runtime.consoleAPICalled' && d.params.type === 'error') errs.push('ERR ' + d.params.args.map((a) => a.value ?? a.description ?? '').join(' ').slice(0, 200)); });
const send = (method, params = {}) => ws.send(JSON.stringify({ id: ++id, method, params }));
send('Runtime.enable'); send('Page.enable');
send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
send('Page.navigate', { url: process.argv[2] + '/economics/market-failure-model-answers' });
await sleep(9000);
console.log(JSON.stringify(errs, null, 1));
chrome.kill('SIGKILL'); process.exit(0);
