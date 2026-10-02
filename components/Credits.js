import { person, experience, education, crafts, clients, period } from '@/lib/content';

// Experience set the way film end credits are: role to the left of a centre
// gutter, name to the right. Scrolling is the roll.
export default function Credits() {
  const tools = [...crafts.build.items, ...crafts.cut.items];

  return (
    <section className="credits" data-clip="Credits" data-clip-color="#262A33" data-tone="dark" id="credits" aria-labelledby="credits-name">
      <div className="credits-roll">
        <p className="credits-kicker">Designed, built and cut by</p>
        <h2 id="credits-name" className="credits-name">{person.name}</h2>
        <p className="credits-bn" lang="bn">{person.banglaFull}</p>

        <h3 className="credits-group">Experience</h3>
        <dl className="credits-list">
          {experience.map((e) => (
            <div className="credit" key={e.role + e.org}>
              <dt>{e.role}</dt>
              <dd>
                <span className="credit-name">{e.org}</span>
                <span className="credit-note">{period(e.start, e.end)}</span>
              </dd>
            </div>
          ))}
        </dl>

        <h3 className="credits-group">Education</h3>
        <dl className="credits-list">
          {education.map((e) => (
            <div className="credit" key={e.degree}>
              <dt>{e.degree}</dt>
              <dd>
                <span className="credit-name">{e.school}</span>
                <span className="credit-note">{period(e.start, e.end)}</span>
              </dd>
            </div>
          ))}
        </dl>

        <h3 className="credits-group">Tools</h3>
        <dl className="credits-list">
          {tools.map(([k, v]) => (
            <div className="credit" key={k}>
              <dt>{k}</dt>
              <dd>
                <span className="credit-name">{v}</span>
              </dd>
            </div>
          ))}
        </dl>

        <h3 className="credits-group">In association with</h3>
        <ul className="credits-clients">
          {clients.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>

        <p className="credits-end">Made with Next.js, a little WebGL and one photograph.</p>
      </div>
    </section>
  );
}
