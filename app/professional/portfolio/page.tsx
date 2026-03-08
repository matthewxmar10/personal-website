import PageHeader from '@/components/ui/PageHeader';
import PageTransition from '@/components/ui/PageTransition';
import PortfolioAlbum from '@/components/ui/PortfolioAlbum';

export const metadata = { title: 'Portfolio — Matthew' };

export default function PortfolioPage() {
  return (
    <PageTransition>
      <div className="container" style={{ paddingBottom: '4rem' }}>
        <PageHeader
          title="Portfolio"
          subtitle="Selected design work."
          breadcrumbs={[
            { label: 'Professional', href: '/professional/what-i-do' },
            { label: 'Portfolio',    href: '/professional/portfolio'  },
          ]}
        />

        <PortfolioAlbum />
      </div>
    </PageTransition>
  );
}
