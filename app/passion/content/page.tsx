import PassionPageLayout from '@/components/ui/PassionPageLayout';

export const metadata = { title: 'Content Creation — Matthew' };

export default function ContentPage() {
  return (
    <PassionPageLayout
      title="Content Creation"
      subtitle="Videos, streams, and whatever else the internet gets."
      breadcrumbLabel="Content"
      breadcrumbHref="/passion/content"
      reelLabel="Content Reel"
      creditsSectionTitle="Channels & Platforms"
      credits={[
        // Add channel links here — { title, role: 'platform', year, link }
      ]}
    />
  );
}
