import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { resolve } from 'path';

// Read .env.local
const envPath = resolve(import.meta.dirname, '../.env.local');
const envContent = readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const [key, ...rest] = line.split('=');
  if (key && rest.length) env[key.trim()] = rest.join('=').trim();
});

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

const subjects = [
  { slug: 'economics', name: 'Economics', code: 'ECON', description: 'Edexcel International A-Level Economics', sort_order: 1 },
];

const units = [
  { number: 1, title: 'Markets in Action', code: 'WEC11', subject: 'economics' },
  { number: 2, title: 'Macroeconomic Performance & Policy', code: 'WEC12', subject: 'economics' },
  { number: 3, title: 'Business Behaviour', code: 'WEC13', subject: 'economics' },
  { number: 4, title: 'Developments in the Global Economy', code: 'WEC14', subject: 'economics' },
];

const sections = [
  { id: 'introductory-concepts', unit: 1, number: '1.3.1', title: 'Introductory Concepts', shortTitle: 'Intro Concepts', sort_order: 1 },
  { id: 'consumer-behaviour-demand', unit: 1, number: '1.3.2', title: 'Consumer Behaviour & Demand', shortTitle: 'Demand', sort_order: 2 },
  { id: 'supply', unit: 1, number: '1.3.3', title: 'Supply', shortTitle: 'Supply', sort_order: 3 },
  { id: 'price-determination', unit: 1, number: '1.3.4', title: 'Price Determination', shortTitle: 'Price Determination', sort_order: 4 },
  { id: 'market-failure', unit: 1, number: '1.3.5', title: 'Market Failure', shortTitle: 'Market Failure', sort_order: 5 },
  { id: 'government-intervention', unit: 1, number: '1.3.6', title: 'Government Intervention', shortTitle: 'Gov. Intervention', sort_order: 6 },
  { id: 'measures-economic-performance', unit: 2, number: '2.3.1', title: 'Measures of Economic Performance', shortTitle: 'Econ. Performance', sort_order: 7 },
  { id: 'aggregate-demand', unit: 2, number: '2.3.2', title: 'Aggregate Demand', shortTitle: 'Aggregate Demand', sort_order: 8 },
  { id: 'aggregate-supply', unit: 2, number: '2.3.3', title: 'Aggregate Supply', shortTitle: 'Aggregate Supply', sort_order: 9 },
  { id: 'national-income', unit: 2, number: '2.3.4', title: 'National Income', shortTitle: 'National Income', sort_order: 10 },
  { id: 'economic-growth', unit: 2, number: '2.3.5', title: 'Economic Growth', shortTitle: 'Econ. Growth', sort_order: 11 },
  { id: 'macroeconomic-objectives-policies', unit: 2, number: '2.3.6', title: 'Macroeconomic Objectives & Policies', shortTitle: 'Macro Policies', sort_order: 12 },
  // Unit 3: Business Behaviour
  { id: 'types-sizes-businesses', unit: 3, number: '3.3.1', title: 'Types and Sizes of Businesses', shortTitle: 'Business Types', sort_order: 13 },
  { id: 'revenue-costs-profits', unit: 3, number: '3.3.2', title: 'Revenue, Costs and Profits', shortTitle: 'Revenue & Costs', sort_order: 14 },
  { id: 'market-structures-contestability', unit: 3, number: '3.3.3', title: 'Market Structures and Contestability', shortTitle: 'Market Structures', sort_order: 15 },
  { id: 'labour-markets', unit: 3, number: '3.3.4', title: 'Labour Markets', shortTitle: 'Labour Markets', sort_order: 16 },
  { id: 'government-intervention-firms', unit: 3, number: '3.3.5', title: 'Government Intervention', shortTitle: 'Gov. Intervention', sort_order: 17 },
  // Unit 4: Developments in the Global Economy
  { id: 'causes-effects-globalisation', unit: 4, number: '4.3.1', title: 'Causes and Effects of Globalisation', shortTitle: 'Globalisation', sort_order: 18 },
  { id: 'trade-global-economy', unit: 4, number: '4.3.2', title: 'Trade and the Global Economy', shortTitle: 'Trade', sort_order: 19 },
  { id: 'balance-payments-exchange-rates', unit: 4, number: '4.3.3', title: 'Balance of Payments, Exchange Rates and International Competitiveness', shortTitle: 'BoP & Exchange Rates', sort_order: 20 },
  { id: 'poverty-inequality', unit: 4, number: '4.3.4', title: 'Poverty and Inequality', shortTitle: 'Poverty & Inequality', sort_order: 21 },
  { id: 'role-state-macroeconomy', unit: 4, number: '4.3.5', title: 'The Role of the State in the Macroeconomy', shortTitle: 'Role of State', sort_order: 22 },
  { id: 'growth-development', unit: 4, number: '4.3.6', title: 'Growth and Development', shortTitle: 'Growth & Development', sort_order: 23 },
];

async function seed() {
  console.log('🌱 Starting seed...\n');

  // 1. Insert subjects
  console.log('📦 Inserting subjects...');
  const { data: insertedSubjects, error: subjectsErr } = await supabase
    .from('subjects')
    .upsert(subjects, { onConflict: 'slug' })
    .select();
  if (subjectsErr) { console.error('Subjects error:', subjectsErr); return; }
  console.log(`   ✅ ${insertedSubjects.length} subjects inserted`);

  // Map subject slug to ID
  const subjectIdMap = {};
  insertedSubjects.forEach(s => { subjectIdMap[s.slug] = s.id; });

  // 2. Insert units
  console.log('📦 Inserting units...');
  const { data: insertedUnits, error: unitsErr } = await supabase
    .from('units')
    .upsert(units.map(u => ({ number: u.number, title: u.title, code: u.code, subject_id: subjectIdMap[u.subject] })), { onConflict: 'number,subject_id' })
    .select();
  if (unitsErr) { console.error('Units error:', unitsErr); return; }
  console.log(`   ✅ ${insertedUnits.length} units inserted`);

  // Map unit number to ID
  const unitIdMap = {};
  insertedUnits.forEach(u => { unitIdMap[u.number] = u.id; });

  // 2. Insert sections
  console.log('📦 Inserting sections...');
  const sectionRows = sections.map(s => ({
    id: s.id,
    unit_id: unitIdMap[s.unit],
    number: s.number,
    title: s.title,
    short_title: s.shortTitle,
    sort_order: s.sort_order,
  }));
  const { error: sectionsErr } = await supabase
    .from('sections')
    .upsert(sectionRows, { onConflict: 'id' });
  if (sectionsErr) { console.error('Sections error:', sectionsErr); return; }
  console.log(`   ✅ ${sectionRows.length} sections inserted`);

  // 3. Import and insert data files
  console.log('\n📚 Loading and inserting section data...\n');
  const oldDataPath = '/Users/arongijsel/Claude APP/economics-app/src/data';

  for (const section of sections) {
    const unitFolder = `unit${section.unit}`;
    const filePath = `${oldDataPath}/${unitFolder}/${section.id}.js`;

    try {
      const mod = await import(filePath);
      const data = mod.default;

      console.log(`   📖 ${section.number} ${section.title}`);

      // Insert each content type
      const contentTypes = [
        { key: 'content', table: 'section_content' },
        { key: 'notes', table: 'section_notes' },
        { key: 'diagrams', table: 'section_diagrams' },
        { key: 'flashcards', table: 'section_flashcards' },
        { key: 'quiz', table: 'section_quiz' },
      ];

      for (const ct of contentTypes) {
        if (data[ct.key]) {
          const { error } = await supabase
            .from(ct.table)
            .upsert({ section_id: section.id, data: data[ct.key] }, { onConflict: 'section_id' });

          if (error) {
            console.error(`      ❌ ${ct.key}: ${error.message}`);
          } else {
            const count = Array.isArray(data[ct.key]) ? data[ct.key].length : 1;
            console.log(`      ✅ ${ct.key} (${count} items)`);
          }
        }
      }
      console.log('');
    } catch (err) {
      console.error(`   ❌ Failed to load ${filePath}: ${err.message}`);
    }
  }

  console.log('🎉 Seed complete!');
}

seed().catch(console.error);
