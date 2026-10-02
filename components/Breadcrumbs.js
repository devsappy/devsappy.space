import Link from 'next/link';

/** items: [{ name, path }] — the current page is the last item and isn't linked. */
export default function Breadcrumbs({ items }) {
  const all = [{ name: 'Home', path: '/' }, ...items];
  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      <ol>
        {all.map((it, i) => (
          <li key={it.path}>
            {i < all.length - 1 ? <Link href={it.path}>{it.name}</Link> : <span aria-current="page">{it.name}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
