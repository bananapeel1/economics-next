/** @type {import('next').NextConfig} */
const nextConfig = {
  // Packet 12.2 wrote this for its noindex lab route; packet 12.3 deleted that route and moved its
  // layout onto the two model-answer routes, so the entry moves with it (E022).
  //
  // These are the routes that read files under `audit/` and `content/` rather than importing them:
  // the spec oracle for the coverage line (`lib/spec-coverage.js`) and the data-response markdown
  // that decides whether a link-out renders (`lib/lab-data-response.js`). Next's file tracing
  // follows imports, and `fs.readFileSync(path.join(process.cwd(), …))` is not an import, so
  // without this the routes deploy without their data. Local `next dev` and `next build` do not
  // need it — which is exactly why it has to be written down rather than discovered on Vercel.
  //
  // The t=0 section dump the lab route also traced is NOT here and must not come back: it is
  // frozen since 12 September and no public canonical URL may serve it. That is E017, and the
  // Quick Check block was dropped rather than shipped stale.
  outputFileTracingIncludes: {
    '/economics/[unit]': [
      './audit/raw/spec-items.json',
      './audit/raw/spec-coverage.json',
      './content/data-response/**',
    ],
    '/business/[unit]': [
      './audit/raw/spec-items.json',
      './audit/raw/spec-coverage.json',
      './content/data-response/**',
    ],
  },

  async redirects() {
    return [
      {
        source: '/guides/market-failure-complete-guide',
        destination: '/economics/market-failure',
        permanent: true,
      },
      {
        source: '/guides/macroeconomic-objectives-guide',
        destination: '/economics/macroeconomic-objectives',
        permanent: true,
      },
      {
        source: '/guides/globalisation-causes-effects',
        destination: '/economics/globalisation',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cloud.umami.is",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: https: blob:",
              "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://generativelanguage.googleapis.com https://api.stripe.com https://gateway.umami.is",
              "frame-src https://js.stripe.com https://hooks.stripe.com",
              "worker-src 'self' blob:",
            ].join('; '),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
