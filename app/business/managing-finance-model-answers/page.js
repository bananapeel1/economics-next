import SectionModelAnswersPage from '@/components/SectionModelAnswersPage';

export const metadata = {
  title: 'Edexcel IAL Managing Finance Model Answers | Business | Revvy Learn',
  description: 'Free annotated model answers for Edexcel IAL Business managing finance (2.3). Covers liquidity, cash flow management, and financial ratios with mark scheme breakdowns and examiner commentary.',
  alternates: { canonical: '/business/managing-finance-model-answers' },
  openGraph: {
    title: 'Edexcel IAL Managing Finance Model Answers | Revvy Learn',
    description: 'Step-by-step model answers for Edexcel IAL Business cash flow and liquidity questions.',
    url: 'https://revvylearn.com/business/managing-finance-model-answers',
  },
};

export default function ManagingFinanceModelAnswersPage() {
  return (
    <SectionModelAnswersPage
      sectionNumber="2.3"
      subject="business"
      backLink={{ href: '/business/unit-2', label: 'Unit 2: Managing Business Activities' }}
      title="Managing Finance Model Answers"
      subtitle="Section 2.3 — Annotated model answers for <strong>liquidity</strong>, cash flow management, and financial ratios."
    />
  );
}
