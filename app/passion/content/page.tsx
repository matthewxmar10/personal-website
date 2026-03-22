import PassionPageLayout from '@/components/ui/PassionPageLayout';
import { getLatestYouTubeVideo } from '@/lib/youtube';

export const metadata = { title: 'Content Creation — Matthew' };

export default async function ContentPage() {
  const latest = await getLatestYouTubeVideo();

  return (
    <PassionPageLayout
      title="Content Creation"
      subtitle="Videos, streams, and whatever else the internet gets."
      breadcrumbLabel="Content"
      breadcrumbHref="/passion/content"
      reelSectionTitle="Latest video"
      reelSrc={latest?.embedUrl}
      creditsSectionTitle="Channels & Platforms"
      credits={[
        {
          title: 'matthew1pg',
          role:  'YouTube',
          link:  'https://www.youtube.com/@matthew-1pg',
        },
        {
          title: 'matthew OSRS',
          role:  'YouTube',
          link:  'https://www.youtube.com/@matthew-OSRS',
        },
        {
          title: 'matthew1pg',
          role:  'Twitch',
          link:  'https://www.twitch.tv/matthew1pg',
        },
        {
          title: 'matthew_1pg',
          role:  'TikTok',
          link:  'https://www.tiktok.com/@matthew_1pg',
        },
      ]}
    />
  );
}
