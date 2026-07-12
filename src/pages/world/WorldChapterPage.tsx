import { ArrowLink } from '@/components/ui/ArrowLink';
import { Seo } from '@/components/seo';
import { worldChapters } from './world-data';

export function WorldChapterPage({
  chapter,
}: {
  chapter: keyof typeof worldChapters;
}) {
  const item = worldChapters[chapter];
  return (
    <>
      <Seo
        title={`${item.title} — Maison Saint-Jules`}
        description={item.line}
      />
      <article className={`world-chapter world-${chapter}`}>
        <header className="world-chapter-hero">
          <img src={item.image} alt={item.alt} />
          <div className="world-chapter-shade" />
          <div className="world-chapter-title">
            <p>{item.eyebrow}</p>
            <h1>{item.title}</h1>
            <span>{item.line}</span>
          </div>
        </header>
        <section className="world-chapter-text">
          <p className="world-chapter-lead">{item.copy}</p>
          <ol className="world-chapter-notes">
            {item.details.map((detail, index) => (
              <li key={detail}>
                <span>0{index + 1}</span>
                {detail}
              </li>
            ))}
          </ol>
        </section>
        <footer className="world-chapter-next">
          <p>La Maison continue.</p>
          <ArrowLink href={item.next.href}>{item.next.label}</ArrowLink>
        </footer>
      </article>
    </>
  );
}
