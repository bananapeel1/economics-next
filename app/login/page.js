import LoginForm from './LoginForm';

// The form reads `?redirect=` and `?error=` with useSearchParams, which Next will
// not prerender. The root layout used to read cookies and made every route dynamic,
// so this never surfaced; now that it does not, the route opts out explicitly
// rather than rendering a blank card while the client hydrates.
export const dynamic = 'force-dynamic';

export default function LoginPage() {
  return <LoginForm />;
}
