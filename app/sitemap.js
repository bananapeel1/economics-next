export default function sitemap() {
  const baseUrl = 'https://revvylearn.com';
  const now = new Date().toISOString();

  return [
    // Core pages
    { url: `${baseUrl}/`, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/glossary`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/command-words`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/past-papers`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/model-answers`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: 'yearly', priority: 0.4 },

    // Economics SEO landing pages
    { url: `${baseUrl}/economics`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/economics/unit-1`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/economics/unit-2`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/economics/market-failure`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/economics/aggregate-demand`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },

    // Economics section model answers
    { url: `${baseUrl}/economics/introductory-concepts-model-answers`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/economics/demand-model-answers`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/economics/supply-model-answers`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/economics/price-determination-model-answers`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/economics/market-failure-model-answers`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/economics/government-intervention-model-answers`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/economics/economic-performance-model-answers`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/economics/aggregate-demand-model-answers`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/economics/aggregate-supply-model-answers`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/economics/national-income-model-answers`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/economics/economic-growth-model-answers`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/economics/macroeconomic-policies-model-answers`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },

    // Business SEO landing pages
    { url: `${baseUrl}/business`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/business/unit-1`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/business/unit-2`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },

    // Business section model answers
    { url: `${baseUrl}/business/meeting-customer-needs-model-answers`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/business/the-market-model-answers`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/business/marketing-mix-model-answers`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/business/managing-people-model-answers`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/business/entrepreneurs-leaders-model-answers`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/business/raising-finance-model-answers`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/business/financial-planning-model-answers`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/business/managing-finance-model-answers`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/business/resource-management-model-answers`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/business/external-influences-model-answers`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
  ];
}
