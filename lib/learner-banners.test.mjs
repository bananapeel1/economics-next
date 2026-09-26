/**
 * Four things the founder asked for on 25 September, pinned so they cannot drift back.
 *
 * Source-reading tests, and deliberately so: nothing in this suite renders React, and the defects
 * these guard against were all "a component shows something" or "a component lacks a button". The
 * alternative is a browser walk nobody reruns. These run on every `npm test`.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';

const read = (p) => readFileSync(p, 'utf8');

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const full = path.join(dir, name);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (/\.(jsx?|tsx?)$/.test(name)) out.push(full);
  }
  return out;
}

/** JSX text and string literals only — a sentence in a comment explaining the removal is fine. */
function userVisible(src) {
  return src
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/^\s*\/\/.*$/gm, '')
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, '');
}

test('no student is ever told a topic "has been rebuilt"', () => {
  // "don't show this. make sure it never appears." A stale saved place now restarts the topic
  // silently (LearnModeTab, V038). If this fails, a component is printing the notice again.
  const offenders = [...walk('components'), ...walk('app')]
    .filter((f) => /has been rebuilt/i.test(userVisible(read(f))));
  assert.deepEqual(offenders, [], `the rebuilt notice is back in: ${offenders.join(', ')}`);
});

test('a stale saved place restarts the topic instead of asking', () => {
  const src = read('components/LearnModeTab.jsx');
  assert.doesNotMatch(src, /skipToEndRebuilt/, '"Jump to the end" went with the notice');
  assert.match(src, /if \(!isRebuilt \|\| !deckVersion\) return;[\s\S]{0,200}restartRebuilt\(\);/,
    'the stale pointer must be restarted automatically, once the deck version is known');
});

test('the review reminder can be dismissed', () => {
  const src = read('components/LearnModeTab.jsx');
  assert.match(src, /className="lm-review-banner-close"/, 'the reminder needs its close button');
  assert.match(src, /dueReviews > 0 && onStartReview && !reviewBannerDismissed/,
    'the reminder must respect a dismissal');
});

test('every review has a Skip that records nothing', () => {
  const src = read('components/ReviewMode.jsx');
  const skips = src.match(/className="lm-review-skip" onClick=\{onFinish\}/g) || [];
  assert.equal(skips.length, 2, 'both the spaced and the mixed review need a Skip');
  // Its accessible name must be the words it shows. The first version carried aria-label="Skip this
  // review and go back", which a voice-control user saying "click Skip review" could not reach —
  // found in the browser walk, where a search for the visible text returned nothing.
  assert.doesNotMatch(src, /className="lm-review-skip"[^>]*aria-label=/, 'no aria-label that hides the visible "Skip review"');
  // Skipping must not score: results are written only in the completion handlers.
  assert.doesNotMatch(src.match(/<button type="button" className="lm-review-skip"[^>]*>/g).join(''),
    /recordReview|advanceReview/);
});

test('a review does not follow the student into another topic', () => {
  // The founder opened a new topic and met another topic's review first: `activeReview` survived
  // a section change. Both ways of changing section must end it.
  const src = read('components/StudyApp.jsx');
  const nav = src.slice(src.indexOf('function navigateToSection('));
  assert.match(nav.slice(0, 900), /setActiveReview\(null\);/, 'navigateToSection must end an open review');
  assert.match(src, /setActiveReview\(null\);[^\n]*\n\s*setActiveSection\(firstId\);/,
    'a subject switch must end an open review too');
});

test('a sort item can be dragged, by mouse or finger, and the whole group box takes a tap', () => {
  const src = userVisible(read('components/learn-mode/ClassifyRecall.jsx'));
  const css = read('app/globals.css');
  // Pointer events, not mouse or HTML5 drag events: HTML5 drag-and-drop never fires on iOS.
  assert.equal((src.match(/onPointerDown=\{\(e\) => onChipPointerDown\(/g) || []).length, 2, 'bank chips and placed chips both start a drag');
  assert.doesNotMatch(src, /\bdraggable=\{?true|onDragStart|onMouseDown|onTouchStart/, 'one pointer path serves mouse, pen and touch');
  assert.match(src, /elementFromPoint[\s\S]*closest\?\.\('\[data-classify-group\]'\)/, 'the drop lands on whichever group box is under the pointer');
  assert.match(src, /data-classify-group=\{gi\}[\s\S]{0,300}onClick=\{\(\) => handleTapGroup\(gi\)\}/, 'the box, not only its name, takes the tap');
  assert.match(src, /swallowClick\.current\) return/, 'the click after a drag must not also select the chip');
  // Without touch-action: none a finger scrolls the page and the browser cancels the drag.
  assert.match(css, /\.lm-classify-chip\.draggable \{[^}]*touch-action: none/);
});

test('"What a correct diagram shows" is collapsed by default, on both surfaces, via one component', () => {
  const comp = read('components/DiagramChecklist.jsx');
  assert.match(comp, /<details className="diagram-checklist">/, 'native details: collapsed unless opened');
  assert.doesNotMatch(comp, /<details[^>]*\bopen\b/, 'never rendered open by default');
  for (const f of ['components/DiagramsTab.jsx', 'components/learn-mode/InlineDiagram.jsx']) {
    const src = userVisible(read(f));
    assert.match(src, /<DiagramChecklist items=\{diagram\.checklist\} \/>/, `${f} uses the shared component`);
    assert.doesNotMatch(src, /What a correct diagram shows/, `${f} no longer renders its own always-open copy`);
  }
  assert.match(read('app/globals.css'), /@media \(pointer: coarse\) \{ \.diagram-checklist-title \{ min-height: 44px; \} \}/, 'a finger gets a 44px target');
});
