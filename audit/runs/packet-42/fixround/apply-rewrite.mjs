/* Rewrites the audit's internal addressing out of student-facing prose, at the source.
   Every pair must match EXACTLY ONCE or the script aborts without writing. */
import { readFileSync, writeFileSync } from 'node:fs';

const EDITS = {
  'scripts/_packet42-content.mjs': [
    ['Leaf 1a names **four** methods of production: ${METHODS.join(\', \')}.',
     'There are **four** methods of production: ${METHODS.join(\', \')}.'],

    ['The specification\'s own wording at 1b is **output per unit of input per time period**.',
     'Productivity is **output per unit of input per time period**.'],

    ['Leaf 1b-2 asks for the factors influencing productivity, and the useful way to hold them',
     'Several things influence productivity, and the useful way to hold them'],

    ['Leaf 1b-4 lists the ways to improve productivity and they follow straight from the factors:',
     'The ways to improve productivity follow straight from the factors:'],

    ['Leaf 1b-3 is the link that makes them worth doing.',
     'What makes them worth doing is what higher productivity does to the cost of each unit.'],

    ['The specification defines efficiency as production at minimum average cost, so the test is',
     'Efficiency is production at minimum average cost, so the test is'],

    ['Leaf 1c-1 gives efficiency a precise test: **production at minimum average cost**.',
     'Efficiency has a precise test: **production at minimum average cost**.'],

    ['Leaf 1c-2 asks what influences efficiency: ${EFFICIENCY_FACTORS.join(\'; \')}.',
     'What influences efficiency is a short list: ${EFFICIENCY_FACTORS.join(\'; \')}.'],

    ['Leaf 1c-3 asks for the ways to improve it, which are the same five read as instructions:',
     'The ways to improve it are the same five read as instructions:'],

    ['Leaf 1d asks for the distinction, and the useful version of it is about WHERE the cost sits.',
     'The useful version of the distinction is about WHERE the cost sits.'],

    ['Leaf 1e names **short product lead-in times** as a source of competitive advantage.',
     '**Short product lead-in times** are a source of competitive advantage.'],

    ['1e is a short leaf and is often the one nobody revises, which makes it a cheap mark. If a case mentions how long a firm takes to launch, the examiner has put 1e in front of you on purpose.',
     'Lead-in times are a small corner of this topic and often the one nobody revises, which makes them a cheap mark. If a case mentions how long a firm takes to launch, the examiner has put it in front of you on purpose.'],

    ['Leaf 2a gives the formula in full: **current output ÷ maximum possible output × 100**.',
     'The formula in full is **current output ÷ maximum possible output × 100**.'],

    ['Leaf 2b asks for the implications of under- and over-utilisation. Take the under half first, because it is the one with a number attached.',
     'Under-utilisation and over-utilisation each carry their own implications. Take under-utilisation first, because it is the one with a number attached.'],

    ['The other half of leaf 2b. In ${B.firm}',
     'Now the other direction, over-utilisation. In ${B.firm}'],

    ['"Implications of over-utilisation" is the half of 2b most answers skip, because high utilisation sounds like good news. An answer that gives the cost saving AND the quality, reliability and staff consequences is answering the whole leaf.',
     'The implications of over-utilisation are the half most answers skip, because high utilisation sounds like good news. An answer that gives the cost saving AND the quality, reliability and staff consequences is answering the whole question.'],

    ['Leaf 2c asks for ways of improving capacity utilisation under **and over** utilisation. This subsection is the under half,',
     'Capacity utilisation can be improved when it is too low **and** when it is too high. This subsection is the under-utilisation half,'],

    ['is the standard twist in this sub-topic.',
     'is the standard twist here.'],

    ['The over half of leaf 2c. A business running too close to its maximum',
     'The over-utilisation half. A business running too close to its maximum'],

    ['The evaluative sentence this leaf is built for is about permanence.',
     'The evaluative sentence this material is built for is about permanence.'],

    ['Leaf 3a asks for the **interpretation of an inventory control diagram**, which means a student has to be able to read four things off a chart rather than describe one in words.',
     '**Interpreting an inventory control diagram** means reading four things off a chart rather than describing one in words.'],

    ['Leaf 3b names **buffer inventory** as its own requirement, and it is a decision rather than a leftover.',
     '**Buffer inventory** is a decision rather than a leftover.'],

    ['Leaf 3c is a requirement in its own right, and the reason it is worth its own treatment is that "poor" means two opposite things.',
     'Poor inventory control is worth its own treatment because "poor" means two opposite things.'],

    ['Leaf 3d names **just in time (JIT)**. Under JIT, materials are ordered to arrive at the moment production needs them,',
     'Under **just in time (JIT)**, materials are ordered to arrive at the moment production needs them,'],

    ['Leaf 3e is **waste minimisation**. The test that makes it usable is simple: would the customer pay for this if they could see it?',
     '**Waste minimisation** has a test that makes it usable, and it is simple: would the customer pay for this if they could see it?'],

    ['Leaf 3f asks for the **competitive advantage from lean production**, so be clear what lean production is:',
     'Before the **competitive advantage from lean production**, be clear what lean production is:'],

    ['Leaf 4a lists three things under quality: **control**, **assurance** and **circles**.',
     'Three things sit under quality: **control**, **assurance** and **circles**.'],

    ['**Circles** is the third bullet of leaf 4a, beside control and assurance,',
     '**Circles** is the third of those three, beside control and assurance,'],

    ['Leaf 4b is **Total Quality Management**, and the word carrying the meaning is "total".',
     'In **Total Quality Management**, the word carrying the meaning is "total".'],

    ['Leaf 4c is **continuous improvement (Kaizen)**. Its claim is that a great many small improvements',
     '**Continuous improvement (Kaizen)** claims that a great many small improvements'],

    ['Leaf 4d asks for the **competitive advantage from quality management**, and there are two routes to it: one through cost and one through price.',
     'There are two routes to **competitive advantage from quality management**: one through cost and one through price.'],

    ['4d is a competitive advantage leaf, so the answer ends in the market.',
     'This is a competitive advantage question, so the answer ends in the market.'],

    ['The specification lists it at 1a beside job, batch and flow: it is a way of ORGANISING production,',
     'Cell sits beside job, batch and flow: it is a way of ORGANISING production,'],

    ['two sets of remedies — because the leaf says under AND over.',
     'two sets of remedies — because it runs under AND over.'],
  ],

  'scripts/_packet42-diagrams.mjs': [
    ['IAL 2.3.4 · 3a, 3b and 3d: the chart the specification asks students to interpret, and what holding less is worth',
     'IAL 2.3.4 · 3a, 3b and 3d: the standard inventory control chart to interpret, and what holding less is worth'],
  ],

  'scripts/_packet42-assessment.mjs': [
    ['qi(B1, \'The specification defines efficiency as:\',',
     'qi(B1, \'Efficiency is defined as:\','],
    ['Almost every data-response question in sub-topic 2 turns on this,',
     'Almost every data-response question on capacity utilisation turns on this,'],
  ],
};

let total = 0;
for (const [file, pairs] of Object.entries(EDITS)) {
  let src = readFileSync(file, 'utf8');
  for (const [from, to] of pairs) {
    const n = src.split(from).length - 1;
    if (n !== 1) { console.error(`ABORT: ${n} matches in ${file} for: ${from.slice(0, 70)}`); process.exit(1); }
    src = src.replace(from, to);
    total += 1;
  }
  writeFileSync(file, src);
  console.log(`${file}: ${pairs.length} rewrites`);
}
console.log(`total ${total}`);
