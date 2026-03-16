import SectionModelAnswersPage from '@/components/SectionModelAnswersPage';

export const metadata = {
  title: 'Edexcel IAL Market Failure Model Answers | Economics | Revvy Learn',
  description: 'Free annotated model answers for Edexcel IAL Economics market failure (1.3.5). Covers externalities, public goods, merit goods, and information failure with mark scheme breakdowns and examiner tips.',
  alternates: { canonical: '/economics/market-failure-model-answers' },
  openGraph: {
    title: 'Edexcel IAL Market Failure Model Answers | Revvy Learn',
    description: 'Step-by-step model answers for Edexcel IAL Economics market failure questions.',
    url: 'https://revvylearn.com/economics/market-failure-model-answers',
  },
};

export default function MarketFailureModelAnswersPage() {
  return (
    <SectionModelAnswersPage
      sectionNumber="1.3.5"
      subject="economics"
      backLink={{ href: '/economics/unit-1', label: 'Unit 1: Markets in Action' }}
      title="Market Failure Model Answers"
      subtitle="Section 1.3.5 — Annotated model answers for <strong>negative externalities</strong>, public goods, merit goods, and market failure questions."
    />
  );
}
