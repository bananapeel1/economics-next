import { supabase } from './_db.mjs';

const ECON_SECTIONS = [
  'consumer-behaviour-demand',
  'supply',
  'price-determination',
  'market-failure',
  'government-intervention',
];

async function main() {
  for (const id of ECON_SECTIONS) {
    const { data } = await supabase
      .from('section_diagrams')
      .select('data')
      .eq('section_id', id)
      .single();

    if (!data || !data.data) continue;
    console.log('\n=== ' + id + ' ===');

    for (let i = 0; i < data.data.length; i++) {
      const d = data.data[i];
      console.log(`  [${i}] ${d.title}`);

      if (d.scenarios && d.scenarios.length > 0) {
        for (let j = 0; j < d.scenarios.length; j++) {
          const s = d.scenarios[j];
          console.log(`      scenario ${j}: ${s.label} (${s.svg.length} chars)`);
        }
      } else if (d.svg) {
        console.log(`      main SVG (${d.svg.length} chars)`);
      }
    }
  }
}

main();
