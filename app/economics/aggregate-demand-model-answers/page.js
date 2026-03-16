import SectionModelAnswersPage from '@/components/SectionModelAnswersPage';

export const metadata = {
  title: 'Edexcel IAL Aggregate Demand Model Answers | Economics | Revvy Learn',
  description: 'Free annotated model answers for Edexcel IAL Economics aggregate demand (2.3.2). Covers AD components, shifts in AD, and the multiplier effect with mark scheme breakdowns and examiner tips.',
  alternates: { canonical: '/economics/aggregate-demand-model-answers' },
  openGraph: {
    title: 'Edexcel IAL Aggregate Demand Model Answers | Revvy Learn',
    description: 'Step-by-step model answers for Edexcel IAL Economics aggregate demand questions.',
    url: 'https://revvylearn.com/economics/aggregate-demand-model-answers',
  },
};

export default function AggregateDemandModelAnswersPage() {
  return (
    <SectionModelAnswersPage
      sectionNumber="2.3.2"
      subject="economics"
      backLink={{ href: '/economics/unit-2', label: 'Unit 2: Macroeconomic Performance' }}
      title="Aggregate Demand Model Answers"
      subtitle="Section 2.3.2 — Annotated model answers for <strong>AD components</strong>, shifts in aggregate demand, and the multiplier effect."
    />
  );
}
