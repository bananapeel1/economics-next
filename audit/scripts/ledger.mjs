#!/usr/bin/env node
// Finding ledger CLI. Agents and sessions use this instead of editing audit/ledger.json by hand.
//
//   node audit/scripts/ledger.mjs summary                       counts by status, per packet
//   node audit/scripts/ledger.mjs packet <n> [--open]           list items assigned to packet n
//   node audit/scripts/ledger.mjs show <id> [<id>...]           full record(s)
//   node audit/scripts/ledger.mjs assign <n> <id>...            set packet for ids (mapping pass only)
//   node audit/scripts/ledger.mjs claim <n> <id>...             builder says packet n closes these ids
//   node audit/scripts/ledger.mjs confirm <id> --by "<who>" --evidence "<file:line or repro>"
//   node audit/scripts/ledger.mjs reject <id> --by "<who>" --evidence "<why it is not fixed>"
//   node audit/scripts/ledger.mjs wontfix <id> --note "<reason>"
//   node audit/scripts/ledger.mjs reopen <id>... --note "<why>"    back to open (e.g. moved to a later packet)
//   node audit/scripts/ledger.mjs unverified <n>                claimed-but-unconfirmed ids for packet n (gate check)
//   node audit/scripts/ledger.mjs add <n> <id> "<title>" [--file <path>]   mint a feature item (no audit finding behind it)
//
// Audit findings arrive from the audit corpus and are never invented. Feature work has no
// finding behind it, so packets that build something new mint their own ids with `add` —
// one per acceptance check — and the same claim / confirm / unverified gate then applies.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const file = path.join(root, 'audit', 'ledger.json');
const ledger = JSON.parse(fs.readFileSync(file, 'utf8'));
const all = () => [...ledger.code, ...ledger.content, ...(ledger.feature || []), ...(ledger.marketing || [])];
const byId = new Map(all().map((x) => [x.id, x]));
const save = () => fs.writeFileSync(file, JSON.stringify(ledger, null, 1) + '\n');
const today = new Date().toISOString().slice(0, 10);

const [cmd, ...rest] = process.argv.slice(2);
const flag = (name) => { const i = rest.indexOf(`--${name}`); return i >= 0 ? rest[i + 1] : undefined; };
const ids = rest.filter((a, i) => !a.startsWith('--') && (i === 0 || !rest[i - 1].startsWith('--')));
const get = (id) => { const r = byId.get(id); if (!r) { console.error(`no such id: ${id}`); process.exit(1); } return r; };
const line = (r) => `${r.id.padEnd(46)} ${String(r.sev || r.kind).padEnd(9)} ${r.status.padEnd(10)} ${(r.title || r.text).slice(0, 90)}`;

switch (cmd) {
  case 'summary': {
    const per = {};
    for (const r of all()) {
      const p = r.packet ?? 'unassigned';
      per[p] ??= { open: 0, claimed: 0, confirmed: 0, 'not-fixed': 0, 'wont-fix': 0 };
      per[p][r.status]++;
    }
    const keys = Object.keys(per).sort((a, b) => (a === 'unassigned') - (b === 'unassigned') || Number(a) - Number(b));
    console.log('packet     open  claimed  confirmed  not-fixed  wont-fix');
    for (const k of keys) {
      const s = per[k];
      console.log(`${String(k).padEnd(10)} ${String(s.open).padStart(4)} ${String(s.claimed).padStart(8)} ${String(s.confirmed).padStart(10)} ${String(s['not-fixed']).padStart(10)} ${String(s['wont-fix']).padStart(9)}`);
    }
    const unassigned = ledger.code.filter((r) => r.packet == null).length;
    if (unassigned) console.log(`\n${unassigned} code findings still unassigned to a packet`);
    break;
  }
  case 'packet': {
    const n = Number(ids[0]);
    const onlyOpen = rest.includes('--open');
    const rows = all().filter((r) => r.packet === n && (!onlyOpen || r.status === 'open'));
    for (const r of rows) console.log(line(r));
    console.log(`\n${rows.length} items`);
    break;
  }
  case 'show':
    for (const id of ids) console.log(JSON.stringify(get(id), null, 2));
    break;
  case 'assign': {
    const n = Number(ids[0]);
    for (const id of ids.slice(1)) get(id).packet = n;
    save(); console.log(`assigned ${ids.length - 1} items to packet ${n}`);
    break;
  }
  case 'claim': {
    const n = Number(ids[0]);
    for (const id of ids.slice(1)) { const r = get(id); if (r.status === 'open' || r.status === 'not-fixed') { r.status = 'claimed'; r.closed_by = `packet-${n}`; } }
    save(); console.log(`claimed ${ids.length - 1} items for packet ${n}`);
    break;
  }
  case 'confirm':
  case 'reject': {
    const by = flag('by'), evidence = flag('evidence');
    if (!by || !evidence) { console.error('--by and --evidence are required'); process.exit(1); }
    for (const id of ids) { const r = get(id); r.status = cmd === 'confirm' ? 'confirmed' : 'not-fixed'; r.verified_by = `${by} ${today}`; r.evidence = evidence; }
    save(); console.log(`${cmd}ed ${ids.length} item(s)`);
    break;
  }
  case 'wontfix': {
    const note = flag('note'); if (!note) { console.error('--note is required'); process.exit(1); }
    for (const id of ids) { const r = get(id); r.status = 'wont-fix'; r.note = note; }
    save(); console.log(`marked ${ids.length} item(s) wont-fix`);
    break;
  }
  case 'reopen': {
    const note = flag('note'); if (!note) { console.error('--note is required'); process.exit(1); }
    for (const id of ids) { const r = get(id); r.status = 'open'; r.closed_by = null; r.note = note; }
    save(); console.log(`reopened ${ids.length} item(s)`);
    break;
  }
  case 'unverified': {
    const n = Number(ids[0]);
    const rows = all().filter((r) => r.closed_by === `packet-${n}` && r.status !== 'confirmed' && r.status !== 'wont-fix');
    for (const r of rows) console.log(line(r));
    console.log(rows.length ? `\nGATE BLOCKED: ${rows.length} claimed item(s) not confirmed` : 'gate clear: every claimed item is confirmed');
    process.exit(rows.length ? 2 : 0);
  }
  case 'add': {
    const n = Number(ids[0]);
    const id = ids[1];
    const title = ids[2];
    if (!Number.isFinite(n) || !id || !title) {
      console.error('usage: ledger.mjs add <packet> <id> "<title>" [--file <path>]');
      process.exit(1);
    }
    if (byId.has(id)) { console.error(`id already exists: ${id}`); process.exit(1); }
    ledger.feature ||= [];
    ledger.feature.push({
      id, kind: 'feature', title, file: flag('file') || null,
      packet: n, status: 'open', closed_by: null, verified_by: null, evidence: null, note: null,
      added: today,
    });
    save();
    console.log(`added ${id} to packet ${n}`);
    break;
  }
  default:
    console.log(fs.readFileSync(fileURLToPath(import.meta.url), 'utf8').split('\n').filter((l) => l.startsWith('//')).join('\n'));
}
