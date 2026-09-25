import { notFound } from 'next/navigation';
import WidgetGallery from '@/components/learn-mode/WidgetGallery';

export const metadata = { title: 'Recall widgets' };

/**
 * The recall widget gallery without a sign-in, for the dev server only: a verifier at 390px needs to
 * see match, classify and the label drill, and no live section carries them yet. Not a page in
 * production (404). The founder's copy is /admin/widgets.
 */
export default function DevWidgetsPage() {
  if (process.env.NODE_ENV === 'production') notFound();
  return <WidgetGallery />;
}
