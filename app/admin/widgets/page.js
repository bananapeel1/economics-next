import WidgetGallery from '@/components/learn-mode/WidgetGallery';

export const metadata = { title: 'Recall widgets — Admin' };

/** The recall widget gallery, packet 7. Admin-gated by app/admin/layout.js. */
export default function AdminWidgetsPage() {
  return <WidgetGallery />;
}
