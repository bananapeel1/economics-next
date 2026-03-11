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

// Import content data from unit files
import { unit1Data } from './business-unit1.mjs';
import { unit2Data } from './business-unit2.mjs';
import { unit3Data } from './business-unit3.mjs';
import { unit4Data } from './business-unit4.mjs';

const businessSubject = {
  slug: 'business',
  name: 'Business',
  code: 'BUS',
  description: 'Edexcel International A-Level Business',
  sort_order: 2,
};

const businessUnits = [
  { number: 1, title: 'Marketing and People', code: 'WBS11' },
  { number: 2, title: 'Managing Business Activities', code: 'WBS12' },
  { number: 3, title: 'Business Decisions and Strategy', code: 'WBS13' },
  { number: 4, title: 'Global Business', code: 'WBS14' },
];

const businessSections = [
  // Unit 1
  { id: 'meeting-customer-needs', unit: 1, number: '1.3.1', title: 'Meeting Customer Needs', shortTitle: 'Customer Needs', sort_order: 1 },
  { id: 'the-market', unit: 1, number: '1.3.2', title: 'The Market', shortTitle: 'The Market', sort_order: 2 },
  { id: 'marketing-mix-strategy', unit: 1, number: '1.3.3', title: 'Marketing Mix and Strategy', shortTitle: 'Marketing Mix', sort_order: 3 },
  { id: 'managing-people', unit: 1, number: '1.3.4', title: 'Managing People', shortTitle: 'Managing People', sort_order: 4 },
  { id: 'entrepreneurs-leaders', unit: 1, number: '1.3.5', title: 'Entrepreneurs and Leaders', shortTitle: 'Entrepreneurs', sort_order: 5 },
  // Unit 2
  { id: 'planning-raising-finance', unit: 2, number: '2.3.1', title: 'Planning a Business and Raising Finance', shortTitle: 'Finance', sort_order: 6 },
  { id: 'financial-planning', unit: 2, number: '2.3.2', title: 'Financial Planning', shortTitle: 'Financial Planning', sort_order: 7 },
  { id: 'managing-finance', unit: 2, number: '2.3.3', title: 'Managing Finance', shortTitle: 'Managing Finance', sort_order: 8 },
  { id: 'resource-management', unit: 2, number: '2.3.4', title: 'Resource Management', shortTitle: 'Resources', sort_order: 9 },
  { id: 'external-influences', unit: 2, number: '2.3.5', title: 'External Influences', shortTitle: 'External Influences', sort_order: 10 },
  // Unit 3
  { id: 'business-objectives-strategy', unit: 3, number: '3.3.1', title: 'Business Objectives and Strategy', shortTitle: 'Strategy', sort_order: 11 },
  { id: 'business-growth', unit: 3, number: '3.3.2', title: 'Business Growth', shortTitle: 'Growth', sort_order: 12 },
  { id: 'decision-making-techniques', unit: 3, number: '3.3.3', title: 'Decision-Making Techniques', shortTitle: 'Decision Making', sort_order: 13 },
  { id: 'influences-business-decisions', unit: 3, number: '3.3.4', title: 'Influences on Business Decisions', shortTitle: 'Influences', sort_order: 14 },
  { id: 'assessing-competitiveness', unit: 3, number: '3.3.5', title: 'Assessing Competitiveness', shortTitle: 'Competitiveness', sort_order: 15 },
  { id: 'managing-change', unit: 3, number: '3.3.6', title: 'Managing Change', shortTitle: 'Change', sort_order: 16 },
  // Unit 4
  { id: 'globalisation', unit: 4, number: '4.3.1', title: 'Globalisation', shortTitle: 'Globalisation', sort_order: 17 },
  { id: 'global-markets-expansion', unit: 4, number: '4.3.2', title: 'Global Markets and Business Expansion', shortTitle: 'Global Markets', sort_order: 18 },
  { id: 'global-marketing', unit: 4, number: '4.3.3', title: 'Global Marketing', shortTitle: 'Global Marketing', sort_order: 19 },
  { id: 'global-industries-mncs', unit: 4, number: '4.3.4', title: 'Global Industries and Companies (MNCs)', shortTitle: 'MNCs', sort_order: 20 },
];

// Merge all content data
const allContentData = { ...unit1Data, ...unit2Data, ...unit3Data, ...unit4Data };

async function seedBusiness() {
  console.log('🌱 Starting Business subject seed...\n');

  // 1. Insert subject
  console.log('📦 Inserting Business subject...');
  const { data: insertedSubjects, error: subjectErr } = await supabase
    .from('subjects')
    .upsert([businessSubject], { onConflict: 'slug' })
    .select();
  if (subjectErr) { console.error('Subject error:', subjectErr); return; }
  const subjectId = insertedSubjects[0].id;
  console.log(`   ✅ Subject inserted (id: ${subjectId})`);

  // 2. Insert units
  console.log('📦 Inserting units...');
  const unitRows = businessUnits.map(u => ({
    number: u.number,
    title: u.title,
    code: u.code,
    subject_id: subjectId,
  }));

  // Use individual upserts to handle the composite unique constraint
  const unitIdMap = {};
  for (const unitRow of unitRows) {
    // Try to find existing unit first
    const { data: existing } = await supabase
      .from('units')
      .select('id')
      .eq('number', unitRow.number)
      .eq('subject_id', unitRow.subject_id)
      .single();

    if (existing) {
      // Update existing
      const { data, error } = await supabase
        .from('units')
        .update(unitRow)
        .eq('id', existing.id)
        .select()
        .single();
      if (error) { console.error(`Unit ${unitRow.number} update error:`, error); return; }
      unitIdMap[unitRow.number] = data.id;
    } else {
      // Insert new
      const { data, error } = await supabase
        .from('units')
        .insert(unitRow)
        .select()
        .single();
      if (error) { console.error(`Unit ${unitRow.number} insert error:`, error); return; }
      unitIdMap[unitRow.number] = data.id;
    }
  }
  console.log(`   ✅ ${Object.keys(unitIdMap).length} units inserted/updated`);

  // 3. Insert sections
  console.log('📦 Inserting sections...');
  const sectionRows = businessSections.map(s => ({
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

  // 4. Insert content data
  console.log('\n📚 Inserting section content...\n');

  const contentTables = [
    { key: 'content', table: 'section_content' },
    { key: 'notes', table: 'section_notes' },
    { key: 'flashcards', table: 'section_flashcards' },
    { key: 'quiz', table: 'section_quiz' },
    { key: 'mistakes', table: 'section_common_mistakes' },
  ];

  for (const section of businessSections) {
    const data = allContentData[section.id];
    if (!data) {
      console.log(`   ⚠️  No content data for ${section.number} ${section.title}`);
      continue;
    }

    console.log(`   📖 ${section.number} ${section.title}`);

    for (const ct of contentTables) {
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
  }

  console.log('🎉 Business subject seed complete!');
}

seedBusiness().catch(console.error);
