/**
 * One section of the Edexcel IAL specification, as text.
 *
 * Extracted in packet 13.2's rebase so the quant guard and the diagram guard read the
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
 */
export function specSection(subject, code) {
  const lines = (SPEC[subject] || '').split('\n');
  const heading = /^[\f ]*([1-4]\.3\.[1-9])\s+\S/;
  let current = null;
  const out = [];
  for (const line of lines) {
    const m = line.match(heading);
    if (m) current = m[1];
    if (current === code) out.push(line);
  }
  return out.join('\n').toLowerCase();
}
