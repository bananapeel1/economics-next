/** @type {import('next').NextConfig} */
const nextConfig = {
  // Packet 12.2. `/lab/exam-practice/[section]` is the one route that reads `audit/` at request
  // time: the t=0 section dumps for its MCQs and counts, and the spec oracle for its coverage line.
  // Next's file tracing follows imports, and `fs.readFileSync(path.join(process.cwd(), 'audit', …))`
  // is not an import, so without this the route deploys without its data and 404s on every slug.
  // Local `next dev` and `next build` do not need it — which is exactly why it has to be written
  // down rather than discovered on Vercel.
  outputFileTracingIncludes: {
    '/lab/exam-practice/[section]': [
      './audit/content-sections/**',
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
