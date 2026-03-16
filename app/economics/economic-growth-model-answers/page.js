import SectionModelAnswersPage from '@/components/SectionModelAnswersPage';

export const metadata = {
  title: 'Edexcel IAL Economic Growth Model Answers | Economics | Revvy Learn',
  description: 'Free annotated model answers for Edexcel IAL Economics economic growth (2.3.5). Covers actual vs potential growth, supply-side policies, and long-run growth with mark scheme breakdowns.',
  alternates: { canonical: '/economics/economic-growth-model-answers' },
  openGraph: {
    title: 'Edexcel IAL Economic Growth Model Answers | Revvy Learn',
    description: 'Step-by-step model answers for Edexcel IAL Economics growth and supply-side policy questions.',
    url: 'https://revvylearn.com/economics/economic-growth-model-answers',
  },
};

export default function EconomicGrowthModelAnswersPage() {
  return (
    <SectionModelAnswersPage
      sectionNumber="2.3.5"
      subject="economics"
      backLink={{ href: '/economics/unit-2', label: 'Unit 2: Macroeconomic Performance & Policy' }}
      title="Economic Growth Model Answers"
      subtitle="Section 2.3.5 — Annotated model answers for <strong>actual vs potential growth</strong>, supply-side policies, and long-run economic growth."
    />
  );
}
