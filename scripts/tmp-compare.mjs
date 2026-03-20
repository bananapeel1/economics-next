import { createClient } from '@supabase/supabase-js';
const supabase = createClient(
  'https://trweeckuswgkenckeqfb.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRyd2VlY2t1c3dna2VuY2tlcWZiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzE0ODY2NywiZXhwIjoyMDg4NzI0NjY3fQ.P9EchrMjfJdouBPIs728fuqVTm5Jq1B0JPsEdCp4IA0'
);

async function main() {
  // Get Unit 1 new format sample (first 2 blocks)
  const { data: u1 } = await supabase.from('section_content').select('data').eq('section_id', 'introductory-concepts').single();
  console.log('=== UNIT 1 NEW FORMAT (first block, first section) ===');
  console.log(JSON.stringify(u1.data[0], null, 2).substring(0, 3000));

  console.log('\n\n=== UNIT 3 OLD FORMAT (first block) ===');
  const { data: u3 } = await supabase.from('section_content').select('data').eq('section_id', 'types-sizes-businesses').single();
  console.log(JSON.stringify(u3.data[0], null, 2).substring(0, 2000));
}
main();
