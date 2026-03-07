'use client';

import PageHeader from '@/components/ui/PageHeader';
import PageTransition from '@/components/ui/PageTransition';
import ScrollReveal from '@/components/ui/ScrollReveal';


const GAMING_PROFILES = [
  { platform: 'Steam', description: 'PC gaming library and achievements.', href: '#', icon: '🎮' },
  { platform: 'FACEIT', description: 'Competitive CS stats and ranking.', href: '#', icon: '🏆' },
  { platform: 'Speedrun.com', description: 'Speedrunning records and categories.', href: '#', icon: '⏱' },
  { platform: 'Old School RuneScape', description: 'OSRS profile and accomplishments.', href: '#', icon: '⚔️' },
];

const ACCOMPLISHMENTS: { title: string; description: string; year?: number }[] = [
  // Add real accomplishments — { title, description, year }
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

        {/* Profile Links */}
        <ScrollReveal>
          <h2 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#444444', marginBottom: '1.25rem' }}>
            Profiles
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1rem', marginBottom: '3rem' }}>
            {GAMING_PROFILES.map((profile) => (
              <a
                key={profile.platform}
                href={profile.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none' }}
              >
                <div
                  className="card"
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

        {/* Accomplishments */}
        <ScrollReveal delay={0.1}>
          <h2 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#444444', marginBottom: '1.25rem' }}>
            Accomplishments
          </h2>
          {ACCOMPLISHMENTS.length === 0 ? (
            <div style={{ padding: '1.5rem', background: '#111111', border: '1px solid #1E1E1E', borderRadius: '2px' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#333333', margin: 0, letterSpacing: '0.06em' }}>
                Notable accomplishments coming soon.
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {ACCOMPLISHMENTS.map((item, i) => (
                <div key={i} className="card" style={{ padding: '1.25rem 1.5rem' }}>
                  <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', color: '#E8E6E1' }}>{(item as {title: string}).title}</div>
                  <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8rem', color: '#666666', marginTop: '4px' }}>{(item as {description: string}).description}</div>
                </div>
              ))}
            </div>
          )}
        </ScrollReveal>
      </div>
    </PageTransition>
  );
}
