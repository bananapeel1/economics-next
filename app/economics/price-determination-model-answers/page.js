import SectionModelAnswersPage from '@/components/SectionModelAnswersPage';

export const metadata = {
  title: 'Edexcel IAL Price Determination Model Answers | Economics | Revvy Learn',
  description: 'Free annotated model answer for Edexcel IAL Economics price determination (1.3.4). Covers maximum prices (price ceilings), shortages, and market equilibrium with a full mark scheme breakdown.',
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
        sectionId="price-determination"
      subject="economics"
      backLink={{ href: '/economics/unit-1', label: 'Unit 1: Markets in Action' }}
      title="Price Determination Model Answers"
      subtitle="Section 1.3.4 — Annotated model answer for <strong>maximum prices</strong>, shortages, and market equilibrium questions."
    />
  );
}
