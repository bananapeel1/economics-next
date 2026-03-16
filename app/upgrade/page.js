import Link from 'next/link';
import UpgradePageClient from '@/components/UpgradePageClient';

export const metadata = {
  title: 'Revvy Learn Premium — Everything you need to ace it.',
  description: 'Upgrade to Revvy Learn Premium for just €0.99/month. Unlock flashcards, quizzes, AI tutor, evaluation chains and more. 3-day free trial, cancel anytime.',
  openGraph: {
    title: 'Revvy Learn Premium — €0.99/month',
    description: 'Unlock flashcards, quizzes, AI tutor and revision PDFs. 3-day free trial, cancel anytime.',
    url: 'https://revvylearn.com/upgrade',
    type: 'website',
  },
};

export default function UpgradePage() {
  return (
    <div className="upgrade-page">
      <div className="upgrade-page-inner">

        {/* Header */}
        <div className="upgrade-header">
          <Link href="/" className="upgrade-back-link">&larr; Back to App</Link>
          <div className="upgrade-badge">REVVY LEARN PREMIUM</div>
          <h1 className="upgrade-title">Everything you need to ace it.</h1>
          <p className="upgrade-subtitle">All content is free. Premium unlocks the tools that make revision stick.</p>
        </div>

        {/* Pricing columns */}
        <div className="upgrade-columns">

          {/* Free column */}
          <div className="upgrade-col upgrade-col-free">
            <div className="upgrade-col-header">
              <div className="upgrade-col-label">FREE</div>
              <div className="upgrade-col-price">&euro;0</div>
              <div className="upgrade-col-note">Always free &mdash; no sign-up required</div>
            </div>
            <div className="upgrade-col-features">
              <div className="upgrade-feature">
                <span className="upgrade-feature-check green">&#10003;</span>
                <div>
                  <strong>Content &amp; Notes</strong>
                  <span className="upgrade-feature-desc">All topics, Units 1&ndash;4</span>
                </div>
              </div>
              <div className="upgrade-feature">
                <span className="upgrade-feature-check green">&#10003;</span>
                <div>
                  <strong>Diagrams</strong>
                  <span className="upgrade-feature-desc">Every exam diagram, labelled</span>
                </div>
              </div>
              <div className="upgrade-feature">
                <span className="upgrade-feature-check green">&#10003;</span>
                <div>
                  <strong>Practice Questions</strong>
                  <span className="upgrade-feature-desc">Per topic, with mark schemes</span>
                </div>
              </div>
              <div className="upgrade-feature">
                <span className="upgrade-feature-check green">&#10003;</span>
                <div>
                  <strong>Past Papers</strong>
                  <span className="upgrade-feature-desc">2024 papers + mark schemes</span>
                </div>
              </div>
              <div className="upgrade-feature">
                <span className="upgrade-feature-check green">&#10003;</span>
                <div>
                  <strong>Glossary &amp; Command Words</strong>
                </div>
              </div>
              <div className="upgrade-feature">
                <span className="upgrade-feature-check green">&#10003;</span>
                <div>
                  <strong>Learn Mode</strong>
                  <span className="upgrade-feature-desc">Guided walkthrough</span>
                </div>
              </div>
              <div className="upgrade-feature dimmed">
                <span className="upgrade-feature-check red">&#10005;</span>
                <div>Flashcards, Quiz, Tutor</div>
              </div>
              <div className="upgrade-feature dimmed">
                <span className="upgrade-feature-check red">&#10005;</span>
                <div>Extras &amp; Blackjack</div>
              </div>
            </div>
          </div>

          {/* Premium column */}
          <div className="upgrade-col upgrade-col-premium">
            <div className="upgrade-col-header">
              <div className="upgrade-col-label premium">PREMIUM</div>
              <div className="upgrade-col-price">&euro;0.99<span className="upgrade-col-price-period">/month</span></div>
              <div className="upgrade-col-note">After 3-day free trial</div>
              <div className="upgrade-popular-badge">&#10024; Most popular</div>
            </div>

            {/* Only on Revvy box */}
            <div className="upgrade-exclusive">
              <div className="upgrade-exclusive-label">ONLY ON REVVY</div>
              <div className="upgrade-exclusive-item">
                <span className="upgrade-feature-check green">&#10003;</span>
                <strong>Evaluation chains for 20-mark questions</strong>
              </div>
              <div className="upgrade-exclusive-item">
                <span className="upgrade-feature-check green">&#10003;</span>
                <strong>Common mistakes analysis by topic</strong>
              </div>
            </div>

            <div className="upgrade-col-features">
              <div className="upgrade-feature">
                <span className="upgrade-feature-check green">&#10003;</span>
                <div><strong>Everything in Free</strong></div>
              </div>
              <div className="upgrade-feature">
                <span className="upgrade-feature-check green">&#10003;</span>
                <div>
                  <strong>Interactive Flashcards</strong>
                  <span className="upgrade-feature-desc">All topics, spaced repetition</span>
                </div>
              </div>
              <div className="upgrade-feature">
                <span className="upgrade-feature-check green">&#10003;</span>
                <div>
                  <strong>Timed Quizzes + Feedback</strong>
                  <span className="upgrade-feature-desc">Examiner-style marking</span>
                </div>
              </div>
              <div className="upgrade-feature">
                <span className="upgrade-feature-check green">&#10003;</span>
                <div>
                  <strong>AI Tutor</strong>
                  <span className="upgrade-feature-desc">Answers in exam language, 24/7</span>
                </div>
              </div>
              <div className="upgrade-feature">
                <span className="upgrade-feature-check green">&#10003;</span>
                <div>
                  <strong>Revision PDFs</strong>
                  <span className="upgrade-feature-desc">Download &amp; print</span>
                </div>
              </div>
              <div className="upgrade-feature">
                <span className="upgrade-feature-check green">&#10003;</span>
                <div><strong>Extras incl. Blackjack</strong></div>
              </div>
            </div>
          </div>

        </div>

        {/* CTA */}
        <UpgradePageClient />

        {/* Trust signals */}
        <div className="upgrade-trust">
          <span>1,200+ Edexcel IAL students</span>
          <span className="upgrade-trust-dot">&middot;</span>
          <span>Cancel anytime</span>
          <span className="upgrade-trust-dot">&middot;</span>
          <span>No card needed</span>
        </div>
        <div className="upgrade-signin">
          Already have an account? <Link href="/login">Sign in</Link>
        </div>

      </div>
    </div>
  );
}
