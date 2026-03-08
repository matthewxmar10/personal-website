import PageHeader from '@/components/ui/PageHeader';
import PageTransition from '@/components/ui/PageTransition';
import ScrollReveal from '@/components/ui/ScrollReveal';

export const metadata = { title: 'Gaming — Matthew' };

const GAMING_PROFILES = [
  {
    platform: 'FACEIT',
    description: 'Competitive CS stats and ranking.',
    href: 'https://www.faceit.com/en/players/matthewx',
    icon: '🏆',
  },
  {
    platform: 'Speedrun.com',
    description: 'Speedrunning records and categories.',
    href: 'https://www.speedrun.com/users/matthew1pg',
    icon: '⏱',
  },
  {
    platform: 'Old School RuneScape',
    description: 'OSRS profile and accomplishments.',
    href: 'https://wiseoldman.net/players/matthewu',
    icon: '⚔️',
  },
];

export default function GamingPage() {
  return (
    <PageTransition>
      <div className="container" style={{ paddingBottom: '4rem' }}>
        <PageHeader
          title="Gaming"
          subtitle="Where I go to compete, explore, and occasionally speedrun."
          breadcrumbs={[{ label: 'Passion', href: '/passion/acting' }, { label: 'Gaming', href: '/passion/gaming' }]}
        />

        <ScrollReveal>
          <h2 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#444444', marginBottom: '1.25rem' }}>
            Profiles
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1rem' }}>
            {GAMING_PROFILES.map((profile) => (
              <a
                key={profile.platform}
                href={profile.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none' }}
              >
                <div
                  className="card hover-lift"
                  style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
                >
                  <div style={{ fontSize: '1.4rem' }}>{profile.icon}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 500, color: '#E8E6E1' }}>
                    {profile.platform}
                  </div>
                  <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8rem', color: '#666666' }}>
                    {profile.description}
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: '#00E5FF', letterSpacing: '0.06em', marginTop: '0.25rem' }}>
                    View profile ↗
                  </div>
                </div>
              </a>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </PageTransition>
  );
}
