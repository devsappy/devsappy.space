import Header from '@/components/Header';
import SiteFooter from '@/components/SiteFooter';
import Reveal from '@/components/Reveal';

export default function Contact() {
  return (
    <div className="apage">
      <Header />

      <main className="apage-main">
        <section className="contact-wrap">
          <div className="contact-left">
            <Reveal as="p" className="ap-eyebrow">[ Let&apos;s Talk ]</Reveal>
            <h1 className="ap-title contact-title">
              <span className="line-mask"><span className="line-inner is-static">GOT A</span></span>
              <span className="line-mask"><span className="line-inner is-static">PROJECT?</span></span>
            </h1>
            <Reveal as="p" className="ap-lead" delay={0.1}>
              Tell me about your idea and let&apos;s build something that grows
              engagement. I usually reply within 24 hours.
            </Reveal>

            <Reveal className="contact-details" delay={0.2}>
              <a href="mailto:hello@sappystudio.com" className="contact-detail">
                <span className="contact-detail-label">Email</span>
                <span className="contact-detail-value">hello@sappystudio.com</span>
              </a>
              <div className="contact-detail">
                <span className="contact-detail-label">Based in</span>
                <span className="contact-detail-value">India — Remote worldwide</span>
              </div>
              <div className="contact-detail">
                <span className="contact-detail-label">Socials</span>
                <span className="contact-detail-value">Instagram · LinkedIn · X</span>
              </div>
            </Reveal>
          </div>

          <Reveal className="contact-right" delay={0.15}>
            <form className="contact-form">
              <label className="field">
                <span className="field-label">Your name</span>
                <input type="text" placeholder="Jane Doe" />
              </label>
              <label className="field">
                <span className="field-label">Email</span>
                <input type="email" placeholder="jane@email.com" />
              </label>
              <label className="field">
                <span className="field-label">Project details</span>
                <textarea rows="4" placeholder="Tell me what you have in mind..." />
              </label>
              <button type="button" className="contact-submit">
                <span className="contact-submit-fill" />
                <span className="contact-submit-label">Send Message&nbsp;↗</span>
              </button>
            </form>
          </Reveal>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
