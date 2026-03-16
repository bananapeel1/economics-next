import SectionModelAnswersPage from '@/components/SectionModelAnswersPage';

export const metadata = {
  title: 'Edexcel IAL Meeting Customer Needs Model Answers | Business | Revvy Learn',
  description: 'Free annotated model answers for Edexcel IAL Business meeting customer needs (1.1). Covers market segmentation, customer needs, and product differentiation with mark scheme breakdowns.',
  alternates: { canonical: '/business/meeting-customer-needs-model-answers' },
  openGraph: {
    title: 'Edexcel IAL Meeting Customer Needs Model Answers | Revvy Learn',
    description: 'Step-by-step model answers for Edexcel IAL Business market segmentation and customer needs questions.',
    url: 'https://revvylearn.com/business/meeting-customer-needs-model-answers',
  },
};

export default function MeetingCustomerNeedsModelAnswersPage() {
  return (
    <SectionModelAnswersPage
      sectionNumber="1.1"
      subject="business"
      backLink={{ href: '/business/unit-1', label: 'Unit 1: Marketing & People' }}
      title="Meeting Customer Needs Model Answers"
      subtitle="Section 1.1 — Annotated model answers for <strong>market segmentation</strong>, customer needs, and product differentiation."
    />
  );
}
