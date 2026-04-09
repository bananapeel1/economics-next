import Link from 'next/link';
import { Headset } from '../../components/Icons';
import LandingScrollBar from '@/components/LandingScrollBar';
import '@/styles/landing.css';

export const metadata = {
  title: 'Contact Revvy Learn | Edexcel IAL Revision Support',
  description: 'Get in touch with the Revvy Learn team. Questions about Edexcel IAL Economics or Business revision? We are here to help.',
  openGraph: {
    title: 'Contact Revvy Learn | Edexcel IAL Revision Support',
    description: 'Get in touch with the Revvy Learn team for Edexcel IAL revision support.',
    url: 'https://revvylearn.com/contact',
  },
};

export default function ContactPage() {
  return (
    <div className="elp-page">
      <LandingScrollBar />

      <nav className="elp-nav">
        <Link href="/" className="elp-nav-logo">
          <span className="elp-nav-dot" />
          Revvy Learn
        </Link>
        <div className="elp-nav-sep" />
        <div className="elp-nav-crumb">
          Contact
        </div>
      </nav>

      <section>
        <div className="elp-hero">
          <div className="elp-fade-up">
            <div className="elp-hero-eyebrow">Get in Touch</div>
            <h1 className="elp-hero-title">
              Contact<br /><em>Revvy Learn</em>
            </h1>
            <p className="elp-hero-desc">
              Questions about Edexcel IAL Economics or Business revision? Feature requests, feedback, or just want to say hello? We&apos;d love to hear from you.
            </p>
          </div>
        </div>
      </section>

      <div className="elp-section">
        <div className="elp-wyg-grid" style={{ maxWidth: '600px', margin: '0 auto' }}>
          <a href="mailto:arongijsel@gmail.com" className="elp-wyg-card elp-fade-up" style={{ textDecoration: 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '8px' }}>
              <div className="elp-wyg-icon" style={{ background: 'var(--elp-g-bg)', border: '1px solid var(--elp-g-bd)' }}>
                <Headset size={20} />
              </div>
              <div className="elp-wyg-title">Email</div>
            </div>
            <div className="elp-wyg-desc">arongijsel@gmail.com</div>
          </a>
          <a href="https://instagram.com/revvylearn" target="_blank" rel="noopener noreferrer" className="elp-wyg-card elp-fade-up" style={{ textDecoration: 'none', transitionDelay: '.07s' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '8px' }}>
              <div className="elp-wyg-icon" style={{ background: 'var(--elp-b-bg)', border: '1px solid var(--elp-b-bd)' }}>&#128248;</div>
              <div className="elp-wyg-title">Instagram</div>
            </div>
            <div className="elp-wyg-desc">@revvylearn</div>
          </a>
        </div>
      </div>

      <div className="elp-cta-section">
        <div className="elp-cta-bg" />
        <div className="elp-cta-inner elp-fade-up">
          <h2 className="elp-cta-title">Ready to start revising?</h2>
          <p className="elp-cta-sub">Free notes for every spec point. Flashcards, quizzes and AI tutor included.</p>
          <div className="elp-cta-actions">
            <Link href="/" className="elp-btn-primary" style={{ fontSize: '15px', padding: '14px 30px' }}>Open Revvy Learn &rarr;</Link>
          </div>
        </div>
      </div>

      <footer className="elp-footer">
        <div className="elp-footer-inner">
          <Link href="/" className="elp-footer-logo"><span className="elp-nav-dot" style={{ width: '7px', height: '7px' }} />Revvy Learn</Link>
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
