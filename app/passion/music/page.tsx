import PassionPageLayout from '@/components/ui/PassionPageLayout';

export const metadata = { title: 'Music — Matthew' };

export default function MusicPage() {
  return (
    <PassionPageLayout
      title="Music"
      subtitle="Making sounds, making noise, making something."
      breadcrumbLabel="Music"
      breadcrumbHref="/passion/music"
      reelLabel="Music Reel"
      creditsSectionTitle="Music Credits"
      credits={[
        // Add real credits here — { title, role, year, link }
      ]}
    />
  );
}
