import PassionPageLayout from '@/components/ui/PassionPageLayout';

export const metadata = { title: 'Acting — Matthew' };

export default function ActingPage() {
  return (
    <PassionPageLayout
      title="Acting"
      subtitle="On screen, on stage, behind the mic."
      breadcrumbLabel="Acting"
      breadcrumbHref="/passion/acting"
      reelLabel="Acting Sizzle Reel"
      creditsSectionTitle="Film & Voice Credits"
      credits={[
        // Add real credits here — { title, role, year, link }
      ]}
    />
  );
}
