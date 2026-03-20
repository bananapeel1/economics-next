import { supabase } from './_db.mjs';

// Economics Units 3-4
const econU34 = [
  'types-sizes-businesses', 'revenue-costs-profits', 'market-structures-contestability',
  'labour-markets', 'government-intervention-firms',
  'causes-effects-globalisation', 'trade-global-economy', 'balance-payments-exchange-rates',
  'poverty-inequality', 'role-state-macroeconomy', 'growth-development'
];

// Business Units 3-4
const busU34 = [
  'business-objectives-strategy', 'business-growth', 'decision-making-techniques',
  'influences-business-decisions', 'assessing-competitiveness', 'managing-change',
  'globalisation', 'global-markets-expansion', 'global-marketing', 'global-industries-mncs'
];

async function check(label, ids) {
  console.log(`\n=== ${label} ===`);
  const { data } = await supabase.from('section_content').select('section_id, data').in('section_id', ids);

  for (const id of ids) {
    const row = (data || []).find(r => r.section_id === id);
    if (!row || !row.data) {
      console.log(`  ❌ ${id}: NO CONTENT`);
      continue;
    }
    const steps = Array.isArray(row.data) ? row.data : [];
    const totalConcepts = steps.reduce((sum, s) => sum + (s.concepts?.length || 0), 0);
    console.log(`  ✅ ${id}: ${steps.length} steps, ${totalConcepts} concepts`);
  }
}

async function main() {
  await check('Economics Units 3-4 (Learn Mode / section_content)', econU34);
  await check('Business Units 3-4 (Learn Mode / section_content)', busU34);
}

main();
