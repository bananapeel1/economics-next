import Link from 'next/link';
import guidesData from '@/data/guidesData';
import '@/styles/landing.css';

export const metadata = {
  title: 'Edexcel IAL Revision Guides — Economics & Business | Revvy Learn',
  description: 'Free in-depth revision guides for Edexcel IAL Economics and Business. Comprehensive study guides covering market failure, macroeconomic objectives, globalisation and more.',
  alternates: { canonical: 'https://revvylearn.com/guides' },
  openGraph: {
    title: 'Edexcel IAL Revision Guides — Economics & Business | Revvy Learn',
    description: 'Free in-depth revision guides for Edexcel IAL Economics and Business.',
    url: 'https://revvylearn.com/guides',
  },
};

export default function GuidesIndexPage() {
  const economicsGuides = guidesData.filter(g => g.subject === 'economics');
  const businessGuides = guidesData.filter(g => g.subject === 'business');

  return (
    <div className="resource-page">
      <div className="resource-page-header">
        <Link href="/" className="resource-back-link">&larr; Back to App</Link>
        <h1 className="resource-page-title">Revision Guides</h1>
        <p className="resource-page-subtitle">
          In-depth guides for key Edexcel IAL Economics and Business topics. Each guide covers everything you need to know for your exams.
        </p>
      </div>

      {economicsGuides.length > 0 && (
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '20px', marginBottom: '16px', color: 'var(--text-primary, #fff)' }}>Economics Guides</h2>
          <div className="seo-links-grid">
            {economicsGuides.map(guide => (
              <Link key={guide.slug} href={`/guides/${guide.slug}`} style={{ display: 'block', padding: '16px', background: 'var(--card-bg, #1a1a2e)', borderRadius: '8px', border: '1px solid var(--border, #2a2a3e)', textDecoration: 'none' }}>
                <div style={{ fontWeight: 600, color: 'var(--text-primary, #fff)', marginBottom: '4px' }}>{guide.title}</div>
                <div style={{ fontSize: '14px', color: 'var(--text-secondary, #999)' }}>{guide.metaDescription.slice(0, 120)}...</div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {businessGuides.length > 0 && (
        <div>
          <h2 style={{ fontSize: '20px', marginBottom: '16px', color: 'var(--text-primary, #fff)' }}>Business Guides</h2>
          <div className="seo-links-grid">
            {businessGuides.map(guide => (
              <Link key={guide.slug} href={`/guides/${guide.slug}`} style={{ display: 'block', padding: '16px', background: 'var(--card-bg, #1a1a2e)', borderRadius: '8px', border: '1px solid var(--border, #2a2a3e)', textDecoration: 'none' }}>
                <div style={{ fontWeight: 600, color: 'var(--text-primary, #fff)', marginBottom: '4px' }}>{guide.title}</div>
                <div style={{ fontSize: '14px', color: 'var(--text-secondary, #999)' }}>{guide.metaDescription.slice(0, 120)}...</div>
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="seo-cta" style={{ marginTop: '40px' }}>
        <h2>Start Revising Interactively</h2>
        <p>Use flashcards, quizzes and the AI tutor alongside these guides.</p>
        <Link href="/" className="seo-cta-button">Open Revvy Learn &rarr;</Link>
      </div>
    </div>
  );
}
