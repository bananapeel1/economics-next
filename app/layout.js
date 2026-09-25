import Script from 'next/script';
import "./globals.css";
import "@/styles/theme-night.css";
import { AuthProvider } from '@/components/AuthProvider';
import { ThemeProvider } from '@/components/ThemeProvider';
import MotionProvider from '@/components/MotionProvider';
import AnalyticsEvents from '@/components/AnalyticsEvents';

export const metadata = {
  metadataBase: new URL('https://revvylearn.com'),
  alternates: {
    canonical: './',
    languages: { 'en': 'https://revvylearn.com' },
  },
  title: "Revvy Learn — Edexcel IAL Revision",
  description: "Free revision notes, diagrams and practice questions for Edexcel International A-Level Economics and Business. Flashcards, quizzes and the AI tutor unlock with Pro.",
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon-192x192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/manifest.json',
  verification: {
    google: 'SUCgmkz_aRMbcTiUDxOGBJfzifJo7yY2a3muEdY9Zbw',
  },
  openGraph: {
    title: 'Revvy Learn — Edexcel IAL Economics & Business Revision',
    description: 'Interactive revision for Edexcel International A-Level Economics and Business. Notes, diagrams and practice questions are free. Flashcards, quizzes and the AI tutor unlock with Pro.',
    url: 'https://revvylearn.com',
    siteName: 'Revvy Learn',
    type: 'website',
    locale: 'en_GB',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Revvy Learn — Edexcel IAL Economics & Business Revision',
    description: 'Interactive revision for Edexcel International A-Level Economics and Business. Notes, diagrams and practice questions are free. Flashcards, quizzes and the AI tutor unlock with Pro.',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

/*
 * V009. This layout used to read cookies — `createClient()` then `supabase.auth.getUser()`, plus a
 * subscription row — to seed AuthProvider, so that a paying student's first paint was already
 * premium (packet 12, F035). A cookie read in the ROOT layout opts EVERY route in the app out of
 * prerendering: measured 21 September, the branch built 1 static route (`/sitemap.xml`) and 113
 * dynamic ones, while `main` still served `/economics/unit-1/supply` as `x-vercel-cache: PRERENDER`.
 * Merging would have undone PR #17's caching for every public page.
 *
 * The seed cannot come back here, and not only for the cache. A prerendered document is ONE
 * document served to everybody, so it may not hold anything that depends on entitlement — which is
 * already this branch's rule for the topic pages (V007). "Keep the F035 fix" therefore cannot mean
 * "the server answers the question"; it means no student is ever shown a false statement about what
 * they have paid for. F035's defect was a false NEGATIVE held for seconds: "Unlock Tutor" in front
 * of somebody who pays. The replacement is a third state — while entitlement is unknown, gated UI
 * says nothing rather than saying "locked" — which is the idiom packet 2.1 already shipped for the
 * withheld section payload. `AuthProvider.entitlementKnown` carries it; see that file.
 *
 * `AuthProvider` still accepts `initialUser` / `initialSubscription`. Nothing passes them today.
 * They are the seam for a segment that is dynamic ANYWAY — the seed may return under any layout
 * except this one.
 */
export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        {/* F118: the theme must be set before first paint or the page flashes. As a bare
            <script> in the component tree this tripped React's "script tag while rendering"
            path and contributed to a hydration failure on every load. next/script with
            beforeInteractive is the supported way to run something this early in the App
            Router, and it is injected into the initial HTML rather than rendered as a child. */}
        <Script id="revvy-theme-init" strategy="beforeInteractive">
          {`(function(){try{var t=localStorage.getItem('theme');document.documentElement.setAttribute('data-theme',(t==='light'||t==='dark')?t:'dark');}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();`}
        </Script>
        {process.env.NEXT_PUBLIC_ANALYTICS_SRC ? (
          <script
            defer
            src={process.env.NEXT_PUBLIC_ANALYTICS_SRC}
            data-domain={process.env.NEXT_PUBLIC_ANALYTICS_DOMAIN}
            data-website-id={process.env.NEXT_PUBLIC_ANALYTICS_SITE_ID}
          />
        ) : null}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&family=DM+Serif+Display:ital@0;1&family=Archivo:wght@600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {/* F118: these JSON-LD blocks used to sit inside <head> in the component tree. In the App
            Router that makes the server and client markup disagree, so React logged "Encountered a
            script tag while rendering React component" and then failed hydration on every page
            load, discarding the server markup and re-rendering on the client. Next's documented
            placement for structured data is inside the body; search engines read it either way. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            "name": "Revvy Learn",
            "url": "https://revvylearn.com",
            "description": "Revision platform for Edexcel International A-Level Economics and Business. Notes, diagrams and practice questions are free. Flashcards, quizzes and the AI tutor unlock with Pro.",
            "sameAs": ["https://instagram.com/revvylearn"],
            "offers": [
              {
                "@type": "Offer",
                "category": "Educational Resources",
                "name": "Free",
                "price": "0",
                "priceCurrency": "GBP",
                "description": "Edexcel IAL Economics and Business revision notes, diagrams and practice questions, with no subscription"
              },
              {
                "@type": "Offer",
                "category": "Educational Resources",
                "name": "Revvy Learn Pro",
                "description": "Subscription unlocking flashcards, quizzes and the AI tutor"
              }
            ]
          })}}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Revvy Learn",
            "url": "https://revvylearn.com",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://revvylearn.com/glossary?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })}}
        />

        <ThemeProvider>
          {/* F099: one switch so every motion component honours the preference, rather than
              gating them one at a time and missing the next one added. */}
          <MotionProvider>
            <AuthProvider>
              {children}
              <AnalyticsEvents />
            </AuthProvider>
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
