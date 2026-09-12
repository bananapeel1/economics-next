import TopicLinksPage from '@/components/topic-links/TopicLinksPage';
import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';

export const metadata = {
  title: 'Economics Topic Linkage Map — Edexcel IAL | Revvy Learn',
  description: 'Interactive visual map showing how Edexcel IAL Economics topics connect within Unit 1 (Microeconomics) and within Unit 2 (Macroeconomics). Spot cross-topic evaluation points for higher-mark exam answers.',
  openGraph: {
    title: 'Economics Topic Linkage Map — Edexcel IAL | Revvy Learn',
    description: 'Interactive visual map showing how Edexcel IAL Economics topics connect within Unit 1 (Microeconomics) and within Unit 2 (Macroeconomics).',
    url: 'https://revvylearn.com/topic-links',
  },
};

export default function TopicLinksRoute() {
  return (
    <div className="resource-page rl-night">
      <SiteHeader crumb="Topic links" />
      <div className="resource-page-header">
        <Link href="/" className="resource-back-link">&larr; Back to App</Link>
        <h1 className="resource-page-title">Topic Linkage Map</h1>
        <p className="resource-page-subtitle">
          Explore how economics topics connect. Click any topic to see its relationships and build chains of reasoning for your exams.
        </p>
      </div>
      <TopicLinksPage />
    </div>
  );
}
