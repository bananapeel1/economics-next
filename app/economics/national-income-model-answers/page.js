import SectionModelAnswersPage from '@/components/SectionModelAnswersPage';

export const metadata = {
  title: 'Edexcel IAL National Income Model Answers | Economics | Revvy Learn',
  description: 'Free annotated model answers for Edexcel IAL Economics national income (2.3.4). Covers the circular flow model, injections, withdrawals, and multiplier with mark scheme breakdowns.',
  alternates: { canonical: '/economics/national-income-model-answers' },
  openGraph: {
    title: 'Edexcel IAL National Income Model Answers | Revvy Learn',
    description: 'Step-by-step model answers for Edexcel IAL Economics circular flow and national income questions.',
    url: 'https://revvylearn.com/economics/national-income-model-answers',
  },
};

export default function NationalIncomeModelAnswersPage() {
  return (
    <SectionModelAnswersPage
      sectionNumber="2.3.4"
      subject="economics"
      backLink={{ href: '/economics/unit-2', label: 'Unit 2: Macroeconomic Performance & Policy' }}
      title="National Income Model Answers"
      subtitle="Section 2.3.4 — Annotated model answers for the <strong>circular flow of income</strong>, injections, withdrawals, and the multiplier."
    />
  );
}
