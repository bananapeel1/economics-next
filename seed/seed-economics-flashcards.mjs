/**
 * Seeds Economics flashcard data into Supabase section_flashcards table.
 * Run: node seed/seed-economics-flashcards.mjs
 */
// Packet 3 (F110): this script used to build its own Supabase client, which put it outside the
// raw-write guard in scripts/_db.mjs. It now imports the shared client. Writing `data` on a content
// table needs REVVY_ALLOW_RAW_WRITE=1 on the command line, deliberately: this is a bootstrap of an
// empty database, not an authoring path, and the override says so in the shell history.
import { supabase } from '../scripts/_db.mjs';
import { readFileSync } from 'fs';
import { resolve } from 'path';

import {
  introductoryConcepts,
  consumerBehaviourDemand,
  supply,
  priceDetermination,
  marketFailure,
  governmentIntervention,
  measuresEconomicPerformance,
  aggregateDemand,
  aggregateSupply,
  nationalIncome,
  economicGrowth,
  macroeconomicObjectivesPolicies,
  typesSizesBusinesses,
  revenueCostsProfits,
  marketStructuresContestability,
  labourMarkets,
  governmentInterventionFirms,
  causesEffectsGlobalisation,
  tradeGlobalEconomy,
  balancePaymentsExchangeRates,
  povertyInequality,
  roleStateMacroeconomy,
  growthDevelopment,
} from './economics-flashcards.mjs';

// Read .env.local
const envPath = resolve(import.meta.dirname, '../.env.local');
const envContent = readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const [key, ...rest] = line.split('=');
  if (key && rest.length) env[key.trim()] = rest.join('=').trim();
});


const flashcardMap = {
  // Unit 1: Markets in Action
  'introductory-concepts': introductoryConcepts,
  'consumer-behaviour-demand': consumerBehaviourDemand,
  'supply': supply,
  'price-determination': priceDetermination,
  'market-failure': marketFailure,
  'government-intervention': governmentIntervention,
  // Unit 2: Macroeconomic Performance & Policy
  'measures-economic-performance': measuresEconomicPerformance,
  'aggregate-demand': aggregateDemand,
  'aggregate-supply': aggregateSupply,
  'national-income': nationalIncome,
  'economic-growth': economicGrowth,
  'macroeconomic-objectives-policies': macroeconomicObjectivesPolicies,
  // Unit 3: Business Behaviour
  'types-sizes-businesses': typesSizesBusinesses,
  'revenue-costs-profits': revenueCostsProfits,
  'market-structures-contestability': marketStructuresContestability,
  'labour-markets': labourMarkets,
  'government-intervention-firms': governmentInterventionFirms,
  // Unit 4: Developments in the Global Economy
  'causes-effects-globalisation': causesEffectsGlobalisation,
  'trade-global-economy': tradeGlobalEconomy,
  'balance-payments-exchange-rates': balancePaymentsExchangeRates,
  'poverty-inequality': povertyInequality,
  'role-state-macroeconomy': roleStateMacroeconomy,
  'growth-development': growthDevelopment,
};

async function seed() {
  console.log('🃏 Seeding Economics flashcards...\n');

  let total = 0;
  let sections = 0;

  for (const [sectionId, flashcards] of Object.entries(flashcardMap)) {
    const { error } = await supabase
      .from('section_flashcards')
      .upsert({ section_id: sectionId, data: flashcards }, { onConflict: 'section_id' });

    if (error) {
      console.error(`   ❌ ${sectionId}: ${error.message}`);
    } else {
      console.log(`   ✅ ${sectionId} — ${flashcards.length} flashcards`);
      total += flashcards.length;
      sections++;
    }
  }

  console.log(`\n🎉 Done! ${total} flashcards across ${sections} sections.`);
}

seed().catch(console.error);
