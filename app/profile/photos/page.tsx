import PageHeader from '@/components/ui/PageHeader';
import PageTransition from '@/components/ui/PageTransition';
import PhotoAlbum from '@/components/ui/PhotoAlbum';

export const metadata = { title: 'Photo Album — Matthew' };

export default function PhotosPage() {
  return (
    <PageTransition>
      <div className="container" style={{ paddingBottom: '4rem' }}>
        <PageHeader
          title="Photo Album"
          subtitle="Moments worth keeping."
          breadcrumbs={[
            { label: 'Profile', href: '/profile/about' },
            { label: 'Photo Album', href: '/profile/photos' },
          ]}
        />

        <PhotoAlbum />
      </div>
    </PageTransition>
  );
}
