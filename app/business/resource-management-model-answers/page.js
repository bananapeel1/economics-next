import SectionModelAnswersPage from '@/components/SectionModelAnswersPage';

export const metadata = {
  title: 'Edexcel IAL Resource Management Model Answers | Business | Revvy Learn',
  description: 'Annotated model answers for Edexcel IAL Business resource management (2.3.4). Covers lean production, just-in-time (JIT), and capacity utilisation with mark scheme breakdowns.',
  alternates: { canonical: '/business/resource-management-model-answers' },
  openGraph: {
    title: 'Edexcel IAL Resource Management Model Answers | Revvy Learn',
    description: 'Step-by-step model answers for Edexcel IAL Business lean production and JIT questions.',
    url: 'https://revvylearn.com/business/resource-management-model-answers',
  },
};

export default function ResourceManagementModelAnswersPage() {
  return (
    <SectionModelAnswersPage
      sectionNumber="2.4"
        sectionId="resource-management"
      subject="business"
      backLink={{ href: '/business/unit-2', label: 'Unit 2: Managing Business Activities' }}
      title="Resource Management Model Answers"
      subtitle="Section 2.3.4 — Annotated model answers for <strong>lean production</strong>, JIT, and capacity utilisation."
    />
  );
}
