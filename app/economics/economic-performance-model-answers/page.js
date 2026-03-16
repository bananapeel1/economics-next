import SectionModelAnswersPage from '@/components/SectionModelAnswersPage';

export const metadata = {
  title: 'Edexcel IAL Economic Performance Model Answers | Economics | Revvy Learn',
  description: 'Free annotated model answers for Edexcel IAL Economics measures of economic performance (2.3.1). Covers CPI, inflation, unemployment, and GDP with mark scheme breakdowns and examiner tips.',
  alternates: { canonical: '/economics/economic-performance-model-answers' },
  openGraph: {
    title: 'Edexcel IAL Economic Performance Model Answers | Revvy Learn',
    description: 'Step-by-step model answers for Edexcel IAL Economics inflation and unemployment questions.',
    url: 'https://revvylearn.com/economics/economic-performance-model-answers',
  },
};

export default function EconomicPerformanceModelAnswersPage() {
  return (
    <SectionModelAnswersPage
      sectionNumber="2.3.1"
      subject="economics"
      backLink={{ href: '/economics/unit-2', label: 'Unit 2: Macroeconomic Performance & Policy' }}
      title="Measures of Economic Performance Model Answers"
      subtitle="Section 2.3.1 — Annotated model answers for <strong>CPI</strong>, <strong>inflation</strong>, <strong>unemployment</strong>, and measuring economic performance."
    />
  );
}
