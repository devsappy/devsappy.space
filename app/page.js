import Hero from '@/components/Hero';
import Logline from '@/components/Logline';
import Selects from '@/components/Selects';
import Credits from '@/components/Credits';
import EndCard from '@/components/EndCard';
import Reveal from '@/components/Reveal';
import { projects } from '@/lib/content';

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <Logline />

      <section className="selects" data-clip="Selects" data-clip-color="#2B3E5E" data-tone="dark" id="work" aria-labelledby="selects-title">
        <div className="wrap selects-intro">
          <div>
            <Reveal as="p" className="label">Selects</Reveal>
            <Reveal as="h2" id="selects-title" className="display selects-title" delay={0.05}>
              Six sites, all live
            </Reveal>
          </div>
          <Reveal as="p" className="selects-lead" delay={0.1}>
            Each one was designed and built end to end. These are screen recordings from the live
            builds — scroll to cut between them, or open any site in a new tab.
          </Reveal>
        </div>
        <Selects projects={projects} />
      </section>

      <Credits />
      <EndCard />
    </main>
  );
}
