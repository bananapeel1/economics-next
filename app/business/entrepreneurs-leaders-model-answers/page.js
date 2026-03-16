import SectionModelAnswersPage from '@/components/SectionModelAnswersPage';

export const metadata = {
  title: 'Edexcel IAL Entrepreneurs & Leaders Model Answers | Business | Revvy Learn',
  description: 'Free annotated model answers for Edexcel IAL Business entrepreneurs and leaders (1.5). Covers the role of entrepreneurs, risk-taking, and leadership styles with mark scheme breakdowns.',
  alternates: { canonical: '/business/entrepreneurs-leaders-model-answers' },
  openGraph: {
    title: 'Edexcel IAL Entrepreneurs & Leaders Model Answers | Revvy Learn',
    description: 'Step-by-step model answers for Edexcel IAL Business entrepreneur and leadership questions.',
    url: 'https://revvylearn.com/business/entrepreneurs-leaders-model-answers',
  },
};

export default function EntrepreneursLeadersModelAnswersPage() {
  return (
    <SectionModelAnswersPage
      sectionNumber="1.5"
      subject="business"
      backLink={{ href: '/business/unit-1', label: 'Unit 1: Marketing & People' }}
      title="Entrepreneurs & Leaders Model Answers"
      subtitle="Section 1.5 — Annotated model answers for the <strong>role of entrepreneurs</strong>, risk-taking, and leadership styles."
    />
  );
}
