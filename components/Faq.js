import Inline from '@/components/Inline';

// Native disclosure widgets: keyboard and screen-reader friendly, no JS, and the
// answers stay in the HTML for search engines.
export default function Faq({ items }) {
  return (
    <div className="faq">
      {items.map(([q, a], i) => (
        <details key={q} className="faq-item" open={i === 0}>
          <summary>
            <span>{q}</span>
            <span className="faq-icon" aria-hidden="true" />
          </summary>
          <p><Inline text={a} /></p>
        </details>
      ))}
    </div>
  );
}
