import SectionModelAnswersPage from '@/components/SectionModelAnswersPage';

export const metadata = {
  title: 'Edexcel IAL Aggregate Supply Model Answers | Economics | Revvy Learn',
  description: 'Free annotated model answers for Edexcel IAL Economics aggregate supply (2.3.3). Covers SRAS, LRAS, supply-side policies, and non-inflationary growth with mark scheme breakdowns.',
  alternates: { canonical: '/economics/aggregate-supply-model-answers' },
  openGraph: {
    title: 'Edexcel IAL Aggregate Supply Model Answers | Revvy Learn',
    description: 'Step-by-step model answers for Edexcel IAL Economics aggregate supply questions.',
    url: 'https://revvylearn.com/economics/aggregate-supply-model-answers',
  },
};

export default function AggregateSupplyModelAnswersPage() {
  return (
    <SectionModelAnswersPage
      sectionNumber="2.3.3"
      subject="economics"
      backLink={{ href: '/economics/unit-2', label: 'Unit 2: Macroeconomic Performance' }}
      title="Aggregate Supply Model Answers"
      subtitle="Section 2.3.3 — Annotated model answers for <strong>supply-side policies</strong>, LRAS shifts, and non-inflationary economic growth."
    />
  );
}
