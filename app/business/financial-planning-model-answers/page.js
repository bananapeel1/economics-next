import SectionModelAnswersPage from '@/components/SectionModelAnswersPage';

export const metadata = {
  title: 'Edexcel IAL Financial Planning Model Answers | Business | Revvy Learn',
  description: 'Free annotated model answers for Edexcel IAL Business financial planning (2.2). Covers break-even analysis, cash flow forecasts, and budgeting with mark scheme breakdowns and examiner commentary.',
  alternates: { canonical: '/business/financial-planning-model-answers' },
  openGraph: {
    title: 'Edexcel IAL Financial Planning Model Answers | Revvy Learn',
    description: 'Step-by-step model answers for Edexcel IAL Business financial planning questions.',
    url: 'https://revvylearn.com/business/financial-planning-model-answers',
  },
};

export default function FinancialPlanningModelAnswersPage() {
  return (
    <SectionModelAnswersPage
      sectionNumber="2.2"
      subject="business"
      backLink={{ href: '/business/unit-2', label: 'Unit 2: Managing Business Activities' }}
      title="Financial Planning Model Answers"
      subtitle="Section 2.2 — Annotated model answers for <strong>break-even analysis</strong>, cash flow forecasts, and budgeting questions."
    />
  );
}
