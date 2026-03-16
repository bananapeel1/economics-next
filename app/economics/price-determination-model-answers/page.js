import SectionModelAnswersPage from '@/components/SectionModelAnswersPage';

export const metadata = {
  title: 'Edexcel IAL Price Determination Model Answers | Economics | Revvy Learn',
  description: 'Free annotated model answers for Edexcel IAL Economics price determination (1.3.4). Covers maximum and minimum prices, market equilibrium, and price controls with mark scheme breakdowns.',
  alternates: { canonical: '/economics/price-determination-model-answers' },
  openGraph: {
    title: 'Edexcel IAL Price Determination Model Answers | Revvy Learn',
    description: 'Step-by-step model answers for Edexcel IAL Economics price determination questions.',
    url: 'https://revvylearn.com/economics/price-determination-model-answers',
  },
};

export default function PriceDeterminationModelAnswersPage() {
  return (
    <SectionModelAnswersPage
      sectionNumber="1.3.4"
      subject="economics"
      backLink={{ href: '/economics/unit-1', label: 'Unit 1: Markets in Action' }}
      title="Price Determination Model Answers"
      subtitle="Section 1.3.4 — Annotated model answers for <strong>maximum prices</strong>, minimum prices, and market equilibrium questions."
    />
  );
}
