import Link from 'next/link';
import { BookAlt, Document, PenIcon } from '@/components/Icons';
import SiteHeader from '@/components/SiteHeader';
import LandingScrollBar from '@/components/LandingScrollBar';
import { ECONOMICS, BUSINESS } from '@/lib/ial-marking';
import { ECONOMICS_WORDS, BUSINESS_WORDS, NOT_IAL } from '@/data/ialCommandWords';
import '@/styles/landing.css';
import '@/styles/command-words.css';

export const metadata = {
  title: 'Edexcel IAL Command Words and Marks — Economics & Business | Revvy Learn',
  description: 'Every command word in Edexcel IAL Economics (WEC11–WEC14) and Business (WBS11–WBS14) papers, how many marks it carries and what examiners want. Plus the words IAL never uses, like Outline.',
  alternates: { canonical: 'https://revvylearn.com/command-words' },
  openGraph: {
    title: 'Edexcel IAL Command Words and Marks | Revvy Learn',
    description: 'IAL Economics and Business command words, the marks each carries, and what examiners expect.',
    url: 'https://revvylearn.com/command-words',
  },
};

/** Rows for one subject: tariffs from lib/ial-marking.js, wording from data/ialCommandWords.js. */
function rows(spec, words) {
  return Object.entries(spec.tariffs).map(([word, marks]) => {
    if (!words[word]) throw new Error(`command-words: no description for ${spec.subject} "${word}"`);
    const label = spec === ECONOMICS && word === 'Evaluate' ? 'Evaluate / To what extent' : word;
    const markText = spec === BUSINESS && word === 'Assess'
      ? '10 (Units 1–2) · 12 (Units 3–4)'
      : marks.join(' or ');
    return { word, label, markText, text: words[word] };
  });
}

function WordTable({ list }) {
  return (
    <table className="cw-table">
      <thead>
        <tr><th scope="col">Command</th><th scope="col">Marks</th><th scope="col">What it asks for</th></tr>
      </thead>
      <tbody>
        {list.map((r) => (
          <tr key={r.word}>
            <th scope="row" className="cw-word">{r.label}</th>
            <td className="cw-marks">{r.markText}</td>
            <td className="cw-text">{r.text}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function CommandWordsRoute() {
  const econ = rows(ECONOMICS, ECONOMICS_WORDS);
  const bus = rows(BUSINESS, BUSINESS_WORDS);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What are the command words in Edexcel IAL Economics?",
        "acceptedAnswer": { "@type": "Answer", "text": `${econ.map((r) => `${r.label} (${r.markText} marks)`).join(', ')}. IAL Economics does not use ${ECONOMICS.absent.join(' or ')}.` },
      },
      {
        "@type": "Question",
        "name": "What are the command words in Edexcel IAL Business?",
        "acceptedAnswer": { "@type": "Answer", "text": `${bus.map((r) => `${r.label} (${r.markText} marks)`).join(', ')}. IAL Business does not use ${BUSINESS.absent.join(' or ')}.` },
      },
      {
        "@type": "Question",
        "name": "Is there a 10-mark question in IAL Economics?",
        "acceptedAnswer": { "@type": "Answer", "text": "No. IAL Economics questions carry 2, 4, 6, 8, 14 or 20 marks. The 10-mark Assess question belongs to IAL Business Units 1 and 2." },
      },
    ],
  };

  return (
    <div className="elp-page">
      <LandingScrollBar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <SiteHeader crumb="Command Words / Exam Guide" />

      <section>
        <div className="elp-hero">
          <div className="elp-fade-up">
            <div className="elp-hero-eyebrow">Exam Technique</div>
            <h1 className="elp-hero-title">
              Edexcel IAL command words<br /><em>and the marks each one is worth</em>
            </h1>
            <p className="elp-hero-desc">
              Pearson&apos;s IAL papers use a fixed list of command words, and each one comes with a set number of marks. Economics and Business use different lists, so learn the one for your subject.
            </p>
            <div className="elp-hero-actions">
              <a href="#economics" className="elp-btn-primary">Economics &darr;</a>
              <a href="#business" className="elp-btn-secondary">Business &darr;</a>
            </div>
          </div>
        </div>
      </section>

      <div className="elp-section" id="economics">
        <div className="elp-units-header">
          <div className="elp-s-eyebrow"><div className="elp-s-eyebrow-dot" style={{ background: 'var(--elp-green)' }} />Economics &middot; WEC11–WEC14</div>
          <h2 className="elp-s-title">IAL Economics command words</h2>
          <p className="elp-s-sub" style={{ maxWidth: '720px' }}>
            No IAL Economics question is worth 10 marks, and the papers never say {ECONOMICS.absent.join(' or ')}.
          </p>
        </div>
        <div className="cw-wrap"><WordTable list={econ} /></div>
      </div>

      <div className="elp-section" id="business">
        <div className="elp-units-header">
          <div className="elp-s-eyebrow"><div className="elp-s-eyebrow-dot" style={{ background: 'var(--elp-blue)' }} />Business &middot; WBS11–WBS14</div>
          <h2 className="elp-s-title">IAL Business command words</h2>
          <p className="elp-s-sub" style={{ maxWidth: '720px' }}>
            {BUSINESS.note} The papers never say {BUSINESS.absent.join(' or ')}.
          </p>
        </div>
        <div className="cw-wrap"><WordTable list={bus} /></div>
      </div>

      <div className="elp-section">
        <div className="elp-units-header">
          <div className="elp-s-eyebrow"><div className="elp-s-eyebrow-dot" style={{ background: 'var(--elp-amber)' }} />Watch out</div>
          <h2 className="elp-s-title">Words you won&apos;t see in IAL papers</h2>
          <p className="elp-s-sub" style={{ maxWidth: '720px' }}>
            These common command words are on neither IAL list. If your notes or practice questions train you on them, they were written for a different exam.
          </p>
        </div>
        <div className="cw-wrap">
          <ul className="cw-not">
            {NOT_IAL.map((w) => <li key={w}>{w}</li>)}
          </ul>
          <p className="cw-source">
            Source: Appendix 6 of the Pearson Edexcel IAL Economics specification (Issue 2) and IAL Business specification (Issue 1). Descriptions are our summaries.
          </p>
        </div>
      </div>

      <div className="elp-section-sm elp-fade-up">
        <div className="elp-s-eyebrow">
          <div className="elp-s-eyebrow-dot" style={{ background: 'var(--elp-teal)' }} />
          Also useful
        </div>
        <h2 className="elp-s-title" style={{ fontSize: '22px', marginBottom: '8px' }}>Related resources</h2>
        <div className="elp-resources-row">
          <Link href="/model-answers" className="elp-resource-chip">
            <span className="elp-resource-chip-icon"><PenIcon size={18} /></span> Model Answers
          </Link>
          <Link href="/past-papers" className="elp-resource-chip">
            <span className="elp-resource-chip-icon"><Document size={18} /></span> Past Papers
          </Link>
          <Link href="/guides" className="elp-resource-chip">
            <span className="elp-resource-chip-icon"><BookAlt size={18} /></span> Revision Guides
          </Link>
          <Link href="/glossary" className="elp-resource-chip">
            <span className="elp-resource-chip-icon"><BookAlt size={18} /></span> Glossary
          </Link>
        </div>
      </div>

      <div className="elp-cta-section">
        <div className="elp-cta-bg" />
        <div className="elp-cta-inner elp-fade-up">
          <h2 className="elp-cta-title">Ready to start revising?</h2>
          <p className="elp-cta-sub">Free notes across all four units. Practice with exam-style questions and model answers.</p>
          <div className="elp-cta-actions">
            <Link href="/economics/unit-1/introductory-concepts" className="elp-btn-primary" style={{ fontSize: '15px', padding: '14px 30px' }}>Open Revvy Learn &rarr;</Link>
          </div>
        </div>
      </div>


      <footer className="elp-footer">
        <div className="elp-footer-inner">
          <Link href="/" className="elp-footer-logo"><img src="/logo.svg" alt="" className="elp-footer-mark" width={18} height={18} />Revvy Learn</Link>
          <div className="elp-footer-sep" />
          <div className="elp-footer-links">
            <Link href="/economics" className="elp-footer-link">Economics</Link>
            <Link href="/business" className="elp-footer-link">Business</Link>
            <Link href="/glossary" className="elp-footer-link">Glossary</Link>
            <Link href="/past-papers" className="elp-footer-link">Past Papers</Link>
          </div>
          <div className="elp-footer-right">Edexcel IAL revision &copy; Revvy Learn</div>
        </div>
      </footer>
    </div>
  );
}
