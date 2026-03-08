import PageHeader     from '@/components/ui/PageHeader';
import PageTransition from '@/components/ui/PageTransition';
import ScrollReveal   from '@/components/ui/ScrollReveal';

export const metadata = { title: 'AI Disclosure — Matthew' };

const USES_AI: { heading: string; body: string }[] = [
  {
    heading: 'Software development',
    body:    'I use AI as a coding assistant — for scaffolding, debugging, and working through technical problems faster. This site was built with Claude Code. That said, I still understand what the code does; I use AI to move faster, not to replace the thinking.',
  },
  {
    heading: 'Research and learning',
    body:    'When I pick up a new topic, I use AI to help map it out, find resources, and explain concepts clearly. It accelerates the learning process — but I still do the learning. AI points me in the right direction; I do the reading.',
  },
  {
    heading: 'Drafting and organizing thoughts',
    body:    'Sometimes I use AI to help structure ideas — turning rough notes into something coherent, or pressure-testing how I\'ve framed something. I write my own words; I just use it to sharpen them.',
  },
];

const NO_AI: { heading: string; body: string }[] = [
  {
    heading: 'Acting and performance',
    body:    'My craft is off the table. No AI coaching, no AI-generated scripts, no AI anything when it comes to performance. Acting is a deeply human discipline and I intend to keep it that way.',
  },
  {
    heading: 'Music',
    body:    'Everything I create musically is mine — the songwriting, the production, the arrangement, the performance. I will never use generative AI to write lyrics, generate melodies, or produce music on my behalf.',
  },
  {
    heading: 'Content creation',
    body:    'My YouTube videos, TikToks, and streams are 100% me. No AI-generated scripts, no AI voiceovers, no AI-assisted editing that changes what I actually said or did. What you see is what I made.',
  },
  {
    heading: 'Images and artwork',
    body:    'I don\'t use AI image generation — not for thumbnails, profile pictures, or anything visual that represents me or my work. If there\'s an image on my platforms, a human made it.',
  },
  {
    heading: 'Gaming',
    body:    'No bots, no AI-assisted play, no scripts. When I\'m in-game, it\'s me. That\'s the whole point.',
  },
];

export default function AiDisclosurePage() {
  return (
    <PageTransition>
      <div className="container" style={{ paddingBottom: '4rem', maxWidth: '720px' }}>
        <PageHeader
          title="AI Disclosure"
          subtitle="Where I use AI — and where I don't."
          breadcrumbs={[{ label: 'AI Disclosure', href: '/ai' }]}
        />

        <ScrollReveal>
          {/* Intro */}
          <div style={{ marginBottom: '3rem' }}>
            <p style={{
              fontFamily:   'var(--font-sans)',
              fontSize:     '0.9rem',
              color:        '#A8A49E',
              lineHeight:   1.75,
              margin:       0,
            }}>
              I think transparency about AI matters, especially for anyone who makes things publicly.
              I use AI tools in specific, deliberate ways — and I draw hard lines in others. This page
              is my attempt to be clear about both.
            </p>
          </div>

          {/* Where I do use AI */}
          <section style={{ marginBottom: '3.5rem' }}>
            <h2 style={{
              fontFamily:    'var(--font-mono)',
              fontSize:      '0.75rem',
              fontWeight:    500,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color:         '#00E5FF',
              marginBottom:  '1.75rem',
              marginTop:     0,
            }}>
              Where I use AI
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {USES_AI.map((item) => (
                <div key={item.heading}>
                  <h3 style={{
                    fontFamily:    'var(--font-mono)',
                    fontSize:      '0.85rem',
                    fontWeight:    500,
                    color:         '#E8E6E1',
                    marginTop:     0,
                    marginBottom:  '0.5rem',
                    letterSpacing: '-0.01em',
                  }}>
                    {item.heading}
                  </h3>
                  <p style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize:   '0.85rem',
                    color:      '#888888',
                    lineHeight: 1.7,
                    margin:     0,
                  }}>
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Divider */}
          <div style={{ borderTop: '1px solid #1A1A1A', marginBottom: '3.5rem' }} />

          {/* Where I don't */}
          <section style={{ marginBottom: '3.5rem' }}>
            <h2 style={{
              fontFamily:    'var(--font-mono)',
              fontSize:      '0.75rem',
              fontWeight:    500,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color:         '#FF6B6B',
              marginBottom:  '1.75rem',
              marginTop:     0,
            }}>
              Where I don&apos;t
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {NO_AI.map((item) => (
                <div key={item.heading}>
                  <h3 style={{
                    fontFamily:    'var(--font-mono)',
                    fontSize:      '0.85rem',
                    fontWeight:    500,
                    color:         '#E8E6E1',
                    marginTop:     0,
                    marginBottom:  '0.5rem',
                    letterSpacing: '-0.01em',
                  }}>
                    {item.heading}
                  </h3>
                  <p style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize:   '0.85rem',
                    color:      '#888888',
                    lineHeight: 1.7,
                    margin:     0,
                  }}>
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Divider */}
          <div style={{ borderTop: '1px solid #1A1A1A', marginBottom: '3rem' }} />

          {/* Closing */}
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize:   '0.85rem',
            color:      '#666666',
            lineHeight: 1.75,
            margin:     0,
          }}>
            This isn&apos;t a statement against AI — it&apos;s a statement about where I think human effort
            still belongs. The things I care most about, I want to do myself. That&apos;s not going to change.
          </p>
        </ScrollReveal>
      </div>
    </PageTransition>
  );
}
