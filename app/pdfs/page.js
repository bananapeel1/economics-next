import { createServerClient } from '@/lib/supabase-server';
import Link from 'next/link';

export const metadata = {
  title: 'Edexcel IAL Revision PDFs — Free Downloads | Revvy Learn',
  description: 'Download free revision PDFs for Edexcel International A-Level Economics and Business. Includes summary sheets, formula guides, key definitions and exam technique cheat sheets.',
  openGraph: {
    title: 'Edexcel IAL Revision PDFs — Free Downloads | Revvy Learn',
    description: 'Download free revision PDFs for Edexcel IAL Economics and Business. Summary sheets, formula guides and cheat sheets.',
    url: 'https://revvylearn.com/pdfs',
  },
};

export default async function PdfsPage() {
  const supabase = createServerClient();
  const { data: pdfs } = await supabase
    .from('pdfs')
    .select('*')
    .order('category')
    .order('created_at', { ascending: false });

  const allPdfs = pdfs || [];

  // Group by category
  const grouped = {};
  allPdfs.forEach(pdf => {
    const cat = pdf.category || 'General';
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push(pdf);
  });

  const categories = Object.keys(grouped);

  return (
    <div className="resource-page">
      <div className="resource-page-header">
        <Link href="/" className="resource-back-link">&larr; Back to App</Link>
        <h1 className="resource-page-title">Useful PDFs</h1>
        <p className="resource-page-subtitle">
          Download revision resources, notes, cheat sheets and more for Edexcel International A-Level.
        </p>
      </div>

      {allPdfs.length === 0 ? (
        <div className="pdf-empty">
          <p>No PDFs available yet. Check back soon!</p>
        </div>
      ) : (
        <div className="pdf-list">
          {categories.map(cat => (
            <div key={cat} className="pdf-category">
              <h2 className="pdf-category-title">{cat}</h2>
              <div className="pdf-cards">
                {grouped[cat].map(pdf => (
                  <a
                    key={pdf.id}
                    href={pdf.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pdf-card"
                  >
                    <div className="pdf-card-icon">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
                        <polyline points="14 2 14 8 20 8" />
                        <line x1="12" y1="12" x2="12" y2="18" />
                        <polyline points="9 15 12 18 15 15" />
                      </svg>
                    </div>
                    <div className="pdf-card-info">
                      <div className="pdf-card-title">{pdf.title}</div>
                      {pdf.description && (
                        <div className="pdf-card-desc">{pdf.description}</div>
                      )}
                    </div>
                    <span className="pdf-card-badge">PDF</span>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
