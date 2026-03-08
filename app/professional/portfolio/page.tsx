import PageHeader from '@/components/ui/PageHeader';
import PageTransition from '@/components/ui/PageTransition';
import PortfolioAlbum from '@/components/ui/PortfolioAlbum';

export const metadata = { title: 'Design Portfolio — Matthew' };

export default function PortfolioPage() {
  return (
    <PageTransition>
      <div className="container" style={{ paddingBottom: '4rem' }}>
        <PageHeader
          title="Design Portfolio"
          subtitle="Selected design work."
          breadcrumbs={[
            { label: 'Professional',    href: '/professional/what-i-do'  },
            { label: 'Design Portfolio', href: '/professional/portfolio'  },
          ]}
        />

        <PortfolioAlbum />
      </div>
    </PageTransition>
  );
}
