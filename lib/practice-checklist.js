/**
 * The self-mark checklist a practice card offers once the student presses "Mark my answer", built
 * from the guidance's own "(n marks)" fragments. Shared by components/learn-mode/InlinePractice.jsx
 * and its test, so the test runs the function the card renders.
 *
 * Why it moved here (26 Sep 2026, packets 43 and 44 Verify B): the guidance is a paragraph of advice
 * on how to approach the question, then the mark points, then often a sentence on what earns nothing.
 * Splitting only after "(n marks)" fused the advice paragraph onto mark point 1 and turned the closing
 * caveat into a tick box worth nothing, so economic-growth's 2-mark Define showed three boxes.
 */

const MARKS_AT_END = /\(\s*(\d+)\s*marks?\s*\)\s*$/i;

/* "Define X (2 marks). Explain Y (2 marks)." becomes two items. Split after each "(n marks)"; drop
   the punctuation that trails the last one, and the punctuation that leads the next (". Explain Y" ->
   "Explain Y"). The first version left a checkbox labelled "." on 164 of the 215 live practice items.
   Caught by the packet 5 verifier. */
function fragments(text) {
  return text.split(/(?<=\(\s*\d+\s*marks?\s*\))/i)
    .map((p) => p.replace(/^[\s.;:,–—-]+/, '').trim())
    .filter(Boolean)
    .map((p) => {
      const m = MARKS_AT_END.exec(p);
      return { text: p.replace(/\s*\(\s*\d+\s*marks?\s*\)\s*$/i, '').replace(/[\s.;:,]+$/, '').trim(), marks: m ? Number(m[1]) : null };
    })
    .filter((c) => /[a-z0-9]/i.test(c.text));
}

/* V067, the second half (26 Sep 2026, verifier on production). Guidance written as ONE paragraph puts
   its marking advice in the same line as the first mark point: "Two marks for a definition with both
   halves. Profit remaining after tax and dividends have been paid (1 mark), …". Splitting by paragraph
   cannot see that, so box 1 carried the advice.
   The fix strips only sentences that are ABOUT MARKING from the front of the first marked fragment. The
   blunt version (keep the last sentence) was measured on all 362 live items first: 9 good trims, but 14
   that cut real content ("Organic growth: opening new product lines…", "Evaluation: …", worked figures).
   So a sentence is advice only if, with any "(… mark …)" aside removed, it uses marking words (marks,
   method, chain, traced, developed points, each factor/way earns, level of response, tariff) AND
   carries no digit, "=", "$" or "Label:" opener. A sentence boundary is ". " (or ! ?) before a capital. */
const SENTENCE = /[^.!?]+(?:[.!?]+(?=\s+[A-Z\u201C"(]|$)|$)/g;
const MARKING_WORDS = /\b(marks?|method|chain|traced|developed points?|each (?:factor|way|point|reason)|earns? a mark|level of response|levels?|tariff|assessed|credited)\b/i;
function isMarkingAdvice(sentence) {
  const bare = sentence.replace(/\([^)]*\bmarks?\b[^)]*\)/gi, '').trim();
  if (!MARKING_WORDS.test(bare)) return false;
  if (/[0-9=$£€]/.test(bare)) return false;
  if (/^[A-Z][\w\s-]{0,30}:/.test(bare)) return false;
  return true;
}
function stripLeadingAdvice(text) {
  const sentences = text.match(SENTENCE)?.map((x) => x.trim()).filter(Boolean) || [text];
  let k = 0;
  while (k < sentences.length - 1 && isMarkingAdvice(sentences[k])) k++;
  return k ? sentences.slice(k).join(' ') : text;
}
/* V067, third pass (26 Sep 2026, verifier re-check after PR #54). A mark can sit mid-sentence:
   "… = 2 (1 mark), and a candidate who writes the formula correctly earns this even if the
   arithmetic slips. Stage three: …". Splitting after "(1 mark)" put the rest of that sentence at the
   start of the NEXT box, so box 3 opened with advice about box 2. A sentence belongs to the point it
   started in: a fragment that opens mid-sentence (lower case, or a continuation word) gives the words up
   to its first sentence break back to the previous point, or drops them if they are marking advice.
   A fragment with no sentence break is left alone: it is its own point ("measured at each price level"). */
const CONTINUES = /^[a-z]|^(?:and|but|so|which|while|because|as)\b/;
const FIRST_BREAK = /[.!?]\s+(?=[A-Z\u201C"(])/;
function paragraphPoints(paragraph) {
  const parts = fragments(paragraph);
  const first = parts.findIndex((c) => c.marks > 0);
  if (first >= 0) parts[first] = { ...parts[first], text: stripLeadingAdvice(parts[first].text) };
  for (let k = Math.max(first, 0) + 1; k < parts.length; k++) {
    const t = parts[k].text;
    if (!CONTINUES.test(t)) continue;
    const m = FIRST_BREAK.exec(t);
    if (!m) continue;
    const tail = t.slice(0, m.index + 1).trim();
    const rest = t.slice(m.index + m[0].length).trim();
    if (!rest) continue;
    const prev = parts[k - 1];
    if (!isMarkingAdvice(tail) && !/\b(?:earns?|credit(?:ed)?|awarded)\b/i.test(tail)) {
      parts[k - 1] = { ...prev, text: `${prev.text}, ${tail.replace(/[.!?]+$/, '')}` };
    }
    parts[k] = { ...parts[k], text: rest };
  }
  return parts;
}

export function checklistFrom(guidance) {
  const text = String(guidance || '');
  if (!text.trim()) return [];
  // Paragraph by paragraph, so the advice paragraph above the mark points cannot fuse onto the first.
  const items = text.split('\n').flatMap(paragraphPoints);
  // Guidance that marks its points: only the marked fragments are points. What is left is advice —
  // how to approach the question, what earns nothing — and a box for it offers a mark that is not there.
  if (items.some((c) => c.marks > 0)) return items.filter((c) => c.marks > 0);
  // Guidance with no "(n marks)" anywhere gets NO checklist (V067 round 3, 26 Sep 2026). It used to be
  // one tick box holding the whole paragraph, and on ~119 of 187 live items that box was marking advice
  // ("The marks are for the chain…"). There is nothing to split it by, so the card shows the guidance
  // as plain text instead and asks the student to compare.
  return [];
}
