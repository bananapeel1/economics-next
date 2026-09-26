/**
 * One section of the Edexcel IAL specification, as text.
 *
 * Extracted in packet 13.7 so the quant guard and the diagram guard read the
 * specification the same way. They were about to hold two copies of the parser below, and the
 * awkward parts of it — the page break, the "(continued)" second block — are exactly the parts
 * a second copy gets wrong.
 *
 * In the IAL specification every section number has 3 as its middle digit (1.3.1 … 4.3.6). A
 * number shaped any other way is a UK GCE number and names no section in this product, which is
 * how three quant templates and both diagram specs shipped pointing at sections that do not exist.
 */
import { readFileSync } from 'node:fs';

const SPEC = {
  economics: readFileSync(new URL('../audit/raw/econ_spec.txt', import.meta.url), 'utf8'),
  business: readFileSync(new URL('../audit/raw/bus_spec.txt', import.meta.url), 'utf8'),
};

/** A section number as the IAL specification writes them. */
export const SPEC_CODE = /^[1-4]\.3\.[1-9]$/;

/**
 * The body of one specification section, joined from every block that carries its number — the
 * spec continues a long section on the next page under the same number plus "(continued)", so a
 * single-block read loses half of 1.3.2 and all of 2.3.6. Lower-cased, for `includes`.
 *
 * A page break sits in front of some headings: the PDF extract carries \f, and a heading that
 * starts a page is `\f2.3.2 Financial planning`. Anchoring on ^ alone finds the Economics
 * headings and misses half the Business ones.
 *
 * IT MUST ALSO STOP, and the first version did not. Tracking only `n.3.n` headings meant the LAST
 * section of a unit ran on through everything before the next one: 1.3.6 was 86 lines ending at
 * `\f2.3 Unit content`, so it absorbed Unit 2's title page and assessment overview and the phrase
 * "macroeconomic performance" passed a specTerm check under a MARKET FAILURE section. A guard that
 * accepts a term from the wrong unit is the same defect it exists to catch, one level up. Sections
 * now end at the next numbered heading of any depth, or at a `Unit n:` title page.
 */
const HEADING = /^[\f ]*([1-4]\.3\.[1-9])\s+\S/;
const BOUNDARY = /^[\f ]*(?:[1-4]\.[0-9]+(?:\.[0-9]+)?\s+\S|Unit [1-4]:)/;

export function specSection(subject, code) {
  const lines = (SPEC[subject] || '').split('\n');
  let current = null;
  const out = [];
  for (const line of lines) {
    const m = line.match(HEADING);
    if (m) current = m[1];
    else if (current && BOUNDARY.test(line)) current = null;
    if (current === code) out.push(line);
  }
  return out.join('\n').toLowerCase();
}

/**
 * Does this drill cite a section that exists, in its own unit, that actually covers it?
 * Returns the reason it does not, or null when the citation holds.
 *
 * One implementation, two callers: `npm run diagram-check` (where a diagram author looks) and
 * `lib/diagram-specs.test.mjs` (which `npm test` runs, and `npm test` is in the protocol's gate
 * while diagram-check is not). A guard only the author's own command runs is a guard the gate
 * cannot see.
 *
 * The shape test alone is not enough — `2.3.1` is a real heading and still the wrong one for
 * break-even — so `specTerm` names a phrase the specification uses under that very section.
 */
export function checkSpecCitation({ subject, unit, specCode, specTerm }) {
  if (!SPEC_CODE.test(specCode || '')) return `"${specCode}" is not an IAL section number (n.3.n)`;
  if (specCode[0] !== String(unit).slice(-1)) return `${unit} and ${specCode} are different units`;
  const body = specSection(subject, specCode);
  if (!body) return `${specCode} is not a heading in the ${subject} specification`;
  if (!specTerm) return 'no specTerm, so nothing ties this drill to its section';
  if (!body.includes(specTerm.toLowerCase())) {
    return `the ${subject} specification does not use "${specTerm}" anywhere under ${specCode}`;
  }
  return null;
}
