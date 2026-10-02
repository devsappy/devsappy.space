import Link from 'next/link';
import Constellation from '@/components/Constellation';
import Reveal from '@/components/Reveal';

// The short end card that closes every inner page.
export default function PageCta() {
  return (
    <section className="page-cta" data-clip="Contact" data-clip-color="#1B2A4A" data-tone="dark" aria-labelledby="page-cta-title">
      <Reveal className="page-cta-sky" as="div">
        <Constellation />
      </Reveal>
      <div className="wrap page-cta-inner">
        <h2 id="page-cta-title" className="page-cta-title">
          Have something to build — <em>or to cut?</em>
        </h2>
        <Link href="/contact" className="button button--light">
          <span>Start a project</span>
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
