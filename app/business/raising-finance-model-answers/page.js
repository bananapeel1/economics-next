import SectionModelAnswersPage from '@/components/SectionModelAnswersPage';

export const metadata = {
  title: 'Edexcel IAL Raising Finance Model Answers | Business | Revvy Learn',
  description: 'Free annotated model answers for Edexcel IAL Business raising finance (2.1). Covers sources of finance, venture capital, and bank loans with mark scheme breakdowns and examiner tips.',
  alternates: { canonical: '/business/raising-finance-model-answers' },
  openGraph: {
    title: 'Edexcel IAL Raising Finance Model Answers | Revvy Learn',
    description: 'Step-by-step model answers for Edexcel IAL Business sources of finance questions.',
    url: 'https://revvylearn.com/business/raising-finance-model-answers',
  },
};

export default function RaisingFinanceModelAnswersPage() {
  return (
    <SectionModelAnswersPage
      sectionNumber="2.1"
      subject="business"
      backLink={{ href: '/business/unit-2', label: 'Unit 2: Managing Business Activities' }}
      title="Raising Finance Model Answers"
      subtitle="Section 2.1 — Annotated model answers for <strong>sources of finance</strong>, venture capital, and start-up funding decisions."
    />
  );
}
