#!/usr/bin/env node
// Light-mode contrast guard. Catches the regression class that produced the
// September 2026 light-mode audit: colours written for a dark background that
// light mode inherits unchanged.
//
//   node audit/scripts/contrast-check.mjs                  check light mode, exit 1 on failure
//   node audit/scripts/contrast-check.mjs --theme dark     report dark mode (informational)
//   node audit/scripts/contrast-check.mjs --theme both
//   node audit/scripts/contrast-check.mjs --verbose        list every rule checked, not just failures
//
// Three checks run:
//   1. contrast — every `color:` declaration scored against the surface behind it
//   2. literals — new hardcoded colours that should be tokens
//   3. diagrams — the processSvg palette stays in sync with the --dg-* tokens
//
// Static by design: no browser, no dependencies, so it runs in CI. It cannot see
// composited alpha stacks more than one layer deep or gradients, so it is a floor,
// not a ceiling — the browser sweep in the audit report is the fuller measure.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const CSS = path.join(root, 'app', 'globals.css');
const PROCESS_SVG = path.join(root, 'components', 'learn-mode', 'processSvg.js');

const args = process.argv.slice(2);
const themeArg = (args[args.indexOf('--theme') + 1] || 'light').toLowerCase();
const THEMES = themeArg === 'both' ? ['light', 'dark'] : [themeArg];
const VERBOSE = args.includes('--verbose');

// Rules that are knowingly below the bar, with the reason. Anything not listed
// here and failing is a regression.
const ACCEPTED = new Map([
  // WCAG 1.4.3 exempts disabled controls; this is the Check button before an
  // answer is selected, and its active state is a separate rule that passes.
  ['light:.spe-qcard-check', 'disabled state — exempt from 1.4.3'],
  ['dark:.spe-qcard-check', 'disabled state — exempt from 1.4.3'],
]);

// Literals that are correct as literals: they sit on a fixed fill that does not
// change with the theme, so a token would be the wrong tool.
const ACCEPTED_LITERALS = new Set([
  '.quiz-break-cta', // near-black on a fixed amber gradient, same in both themes
]);

// Selectors whose rule sets a colour but gets its background from somewhere this
// script cannot see — a sibling rule, a JSX inline style, a gradient. Reported
// separately rather than failed, because a static read of them would be a guess.
function backgroundIsElsewhere(fg) {
  // White text always means a coloured fill supplied elsewhere.
  return fg[0] > 240 && fg[1] > 240 && fg[2] > 240;
}

/* ── colour ─────────────────────────────────────────────────────────────── */

function parseColor(c) {
  if (!c) return null;
  const v = c.trim().toLowerCase();
  if (v === 'transparent') return [0, 0, 0, 0];
  if (v === 'white') return [255, 255, 255, 1];
  if (v === 'black') return [0, 0, 0, 1];
  let m = /^#([0-9a-f]{3})$/.exec(v);
  if (m) return [0, 1, 2].map((i) => parseInt(m[1][i] + m[1][i], 16)).concat([1]);
  m = /^#([0-9a-f]{6})$/.exec(v);
  if (m) return [0, 2, 4].map((i) => parseInt(m[1].substr(i, 2), 16)).concat([1]);
  m = /^rgba?\(([^)]+)\)$/.exec(v);
  if (m) {
    const p = m[1].split(/[,\s/]+/).filter(Boolean).map(Number);
    if (p.length < 3 || p.some(Number.isNaN)) return null;
    return [p[0], p[1], p[2], p[3] === undefined ? 1 : p[3]];
  }
  return null;
}

const luminance = (rgb) => {
  const [r, g, b] = rgb.slice(0, 3).map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

const over = (fg, bg) => {
  const a = fg[3];
  return [0, 1, 2].map((i) => fg[i] * a + bg[i] * (1 - a)).concat([1]);
};

function contrast(fg, bg) {
  const f = luminance(over(fg, bg));
  const b = luminance(bg);
  return (Math.max(f, b) + 0.05) / (Math.min(f, b) + 0.05);
}

/* ── tokens ─────────────────────────────────────────────────────────────── */

const css = fs.readFileSync(CSS, 'utf8');

function tokensFor(theme) {
  const start = theme === 'light' ? css.indexOf(':root,') : css.indexOf('[data-theme="dark"] {');
  const end = theme === 'light' ? css.indexOf('[data-theme="dark"] {') : css.indexOf('\n}', start);
  const block = css.slice(start, end);
  return Object.fromEntries([...block.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)].map((m) => [m[1], m[2].trim()]));
}

function resolve(value, tokens, depth = 0) {
  if (!value || depth > 6) return null;
  const v = value.trim();
  const m = /^var\(\s*(--[\w-]+)\s*(?:,\s*([^)]+))?\)$/.exec(v);
  if (m) return resolve(tokens[m[1]] ?? m[2], tokens, depth + 1);
  return parseColor(v);
}

/* ── rules ──────────────────────────────────────────────────────────────── */

// Flatten to { selector, decls, line }. Good enough for a flat stylesheet with
// media queries: at-rule preludes never contain a `color:` so they drop out.
function parseRules(text) {
  const out = [];
  let i = 0, line = 1, buf = '';
  while (i < text.length) {
    const ch = text[i];
    if (ch === '\n') line++;
    if (ch === '{') {
      const selector = buf.trim().replace(/\s+/g, ' ');
      const selLine = line;
      let depth = 1, body = '';
      i++;
      while (i < text.length && depth > 0) {
        if (text[i] === '{') depth++;
        else if (text[i] === '}') { depth--; if (depth === 0) break; }
        if (text[i] === '\n') line++;
        body += text[i];
        i++;
      }
      if (selector && !selector.startsWith('@') && !/^\s*$/.test(selector)) {
        out.push({ selector, body, line: selLine });
      }
      // a nested block (media query) still needs its children parsed
      if (/^@/.test(selector)) out.push(...parseRules(body));
      buf = '';
    } else {
      buf += ch;
    }
    i++;
  }
  return out;
}

const rules = parseRules(css.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, ' ')));

function decl(body, prop) {
  const re = new RegExp(`(?:^|[;{\\s])${prop}\\s*:\\s*([^;}]+)`, 'i');
  const m = re.exec(body);
  return m ? m[1].replace(/!important\s*$/i, '').trim() : null;
}

// `var(--x, #fallback)` is already theme-aware; the fallback is not a literal.
const stripVars = (v) => v.replace(/var\([^()]*(?:\([^()]*\)[^()]*)*\)/g, ' ');

/* ── check 1: contrast ──────────────────────────────────────────────────── */

// A base rule is exempt in a theme when a [data-theme="<theme>"] rule overrides
// its colour — the pair pattern the codebase uses to keep dark mode frozen.
const overridden = (theme) => {
  const set = new Set();
  for (const r of rules) {
    if (!r.selector.includes(`[data-theme="${theme}"]`)) continue;
    if (!decl(r.body, 'color')) continue;
    for (const part of r.selector.split(',')) {
      set.add(part.replace(new RegExp(`\\[data-theme="${theme}"\\]`, 'g'), '').trim().replace(/\s+/g, ' '));
    }
  }
  return set;
};

function checkContrast(theme) {
  const tokens = tokensFor(theme);
  const page = resolve('var(--bg-primary)', tokens) || [255, 255, 255, 1];
  const card = resolve('var(--bg-card)', tokens) || page;
  const paired = overridden(theme);
  const fails = [];
  const unverifiable = [];
  let checked = 0;

  for (const rule of rules) {
    const sel = rule.selector;
    if (/^:root|^\[data-theme/.test(sel) && !/\s/.test(sel)) continue; // token blocks
    if (sel.includes('[data-theme="dark"]') && theme !== 'dark') continue;
    if (sel.includes('[data-theme="light"]') && theme !== 'light') continue;

    if (sel.split(',').every((part) => paired.has(part.trim().replace(/\s+/g, ' ')))) continue;

    const colorRaw = decl(rule.body, 'color');
    if (!colorRaw) continue;
    const fg = resolve(colorRaw, tokens);
    if (!fg || fg[3] === 0) continue;

    // large text is allowed 3:1
    const size = parseFloat(decl(rule.body, 'font-size') || '0');
    const weight = parseInt(decl(rule.body, 'font-weight') || '400', 10);
    const need = size >= 24 || (size >= 18.66 && weight >= 700) ? 3 : 4.5;

    // the surface: this rule's own background if it sets one, else the two grounds
    const bgRaw = decl(rule.body, 'background-color') || decl(rule.body, 'background');
    let grounds;
    if (bgRaw && !/gradient|url\(/i.test(bgRaw)) {
      const own =
        resolve(bgRaw, tokens) ||
        resolve((bgRaw.match(/var\([^)]*\)|rgba?\([^)]*\)|#[0-9a-fA-F]{3,6}/) || [])[0], tokens);
      if (own && own[3] < 1 && backgroundIsElsewhere(fg)) {
        // a translucent overlay carrying white text sits on a dark parent this
        // script cannot see (e.g. a pill inside a gradient hero)
        unverifiable.push({ sel, line: rule.line, fg: colorRaw });
        continue;
      }
      grounds = own ? (own[3] < 1 ? [over(own, page), over(own, card)] : [own]) : [page, card];
    } else if (bgRaw) {
      continue; // gradient or image — a static read would be a guess
    } else if (backgroundIsElsewhere(fg)) {
      unverifiable.push({ sel, line: rule.line, fg: colorRaw });
      continue;
    } else {
      grounds = [page, card];
    }

    checked++;
    for (const bg of grounds) {
      const cr = contrast(fg, bg);
      if (cr < need) {
        const key = `${theme}:${sel}`;
        if (ACCEPTED.has(key)) break;
        fails.push({ sel, line: rule.line, cr, need, fg: colorRaw, bg: `rgb(${bg.slice(0, 3).map(Math.round).join(',')})` });
        break;
      }
    }
  }
  return { checked, unverifiable, fails: fails.sort((a, b) => a.cr - b.cr) };
}

/* ── check 2: hardcoded literals ────────────────────────────────────────── */

function checkLiterals() {
  const found = [];
  for (const rule of rules) {
    if (/^:root|^\[data-theme="(light|dark)"\]$/.test(rule.selector.trim())) continue;
    if (rule.selector.includes('[data-theme="dark"]')) continue; // dark half of a pair
    for (const prop of ['color', 'fill', 'stroke']) {
      const v = decl(rule.body, prop);
      if (!v) continue;
      const m = /#[0-9a-fA-F]{3,6}\b/.exec(stripVars(v));
      if (!m) continue;
      const hex = m[0].toLowerCase();
      if (['#fff', '#ffffff', '#000', '#000000'].includes(hex)) continue;
      // a literal is fine if the same selector has a [data-theme="light"] partner
      const paired = rules.some(
        (r) => r.selector.includes('[data-theme="light"]') && r.selector.includes(rule.selector.split(/[,\s]/)[0])
      );
      if (ACCEPTED_LITERALS.has(rule.selector.trim())) continue;
      found.push({ sel: rule.selector, line: rule.line, prop, hex, paired });
    }
  }
  return found;
}

/* ── check 3: diagram palette in sync ───────────────────────────────────── */

function checkDiagramPalette() {
  const src = fs.readFileSync(PROCESS_SVG, 'utf8');
  const block = src.slice(src.indexOf('const PALETTE'), src.indexOf('};', src.indexOf('const PALETTE')));
  const mapped = [...block.matchAll(/'(#[0-9a-f]{6})'\s*:\s*'(--dg-[\w-]+)'/g)].map((m) => ({ hex: m[1], token: m[2] }));
  const light = tokensFor('light');
  const dark = tokensFor('dark');
  const problems = [];
  for (const { hex, token } of mapped) {
    if (!(token in light)) problems.push(`${token} is mapped from ${hex} but missing from the light token block`);
    if (!(token in dark)) problems.push(`${token} is mapped from ${hex} but missing from the dark token block`);
    else if (dark[token].toLowerCase() !== hex) {
      problems.push(`${token} dark value is ${dark[token]} but processSvg maps ${hex} to it — dark diagrams would shift`);
    }
  }
  // colours present in exported diagram markup that nothing maps
  const known = new Set(mapped.map((m) => m.hex));
  const unmapped = new Map();
  const dir = path.join(root, 'audit', 'content-sections');
  if (fs.existsSync(dir)) {
    const collect = (o, sink) => {
      if (Array.isArray(o)) o.forEach((v) => collect(v, sink));
      else if (o && typeof o === 'object') Object.values(o).forEach((v) => collect(v, sink));
      else if (typeof o === 'string' && o.includes('<svg')) sink.push(o);
    };
    for (const f of fs.readdirSync(dir).filter((f) => f.endsWith('.json'))) {
      const svgs = [];
      try { collect(JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8')), svgs); } catch { continue; }
      for (const svg of svgs) {
        for (const m of svg.matchAll(/\b(?:fill|stroke|stop-color)="(#[0-9a-fA-F]{3,6})"/g)) {
          let hex = m[1].toLowerCase();
          if (hex.length === 4) hex = '#' + hex.slice(1).split('').map((c) => c + c).join('');
          if (hex === '#ffffff' || known.has(hex)) continue;
          unmapped.set(hex, (unmapped.get(hex) || 0) + 1);
        }
      }
    }
  }
  return { problems, unmapped: [...unmapped.entries()].sort((a, b) => b[1] - a[1]) };
}

/* ── report ─────────────────────────────────────────────────────────────── */

let exit = 0;
const bold = (s) => `\x1b[1m${s}\x1b[0m`;
const red = (s) => `\x1b[31m${s}\x1b[0m`;
const green = (s) => `\x1b[32m${s}\x1b[0m`;
const dim = (s) => `\x1b[2m${s}\x1b[0m`;

for (const theme of THEMES) {
  const { checked, fails, unverifiable } = checkContrast(theme);
  const informational = theme === 'dark' && themeArg !== 'dark';
  console.log(bold(`\ncontrast — ${theme} mode`) + dim(`  (${checked} rules with a resolvable colour)`));
  if (!fails.length) {
    console.log('  ' + green('pass') + dim(' — nothing below its threshold'));
  } else {
    for (const f of fails) {
      console.log(`  ${red(f.cr.toFixed(2) + ':1')} need ${f.need}  ${dim('globals.css:' + f.line)}  ${f.sel}`);
      console.log(dim(`         ${f.fg} on ${f.bg}`));
    }
    if (!informational) exit = 1;
  }
  if (unverifiable.length) {
    console.log(dim(`  ${unverifiable.length} rules set white text with no background of their own — their fill comes`));
    console.log(dim('  from a sibling rule or a JSX inline style, so only the browser can score them.'));
    if (VERBOSE) unverifiable.forEach((u) => console.log(dim(`    globals.css:${u.line}  ${u.sel}`)));
  }
  if (theme === 'dark') console.log(dim('  (dark is reported for information; the audit scoped light mode)'));
}

const literals = checkLiterals().filter((l) => !l.paired);
console.log(bold('\nliterals — colours that should be tokens'));
if (!literals.length) {
  console.log('  ' + green('pass') + dim(' — every themed colour declaration resolves through a token'));
} else {
  for (const l of literals) {
    console.log(`  ${dim('globals.css:' + l.line)}  ${l.sel}  ${l.prop}: ${l.hex}`);
  }
  console.log(dim('  Pair it with a [data-theme="light"] rule, or move it onto a token.'));
  exit = 1;
}

const dg = checkDiagramPalette();
console.log(bold('\ndiagrams — processSvg palette vs --dg-* tokens'));
if (!dg.problems.length) {
  console.log('  ' + green('pass') + dim(' — every mapped token exists and its dark value matches the literal'));
} else {
  dg.problems.forEach((p) => console.log('  ' + red(p)));
  exit = 1;
}
if (dg.unmapped.length) {
  console.log(dim('  unmapped colours in exported diagram markup (new diagrams may need entries):'));
  dg.unmapped.forEach(([hex, n]) => console.log(dim(`    ${hex}  ${n}`)));
}

console.log(exit === 0 ? bold(green('\nclean\n')) : bold(red('\nfailures above\n')));
process.exit(exit);
