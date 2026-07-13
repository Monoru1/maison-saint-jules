import { ArrowLink } from '@/components/ui/ArrowLink';
import { Seo } from '@/components/seo';
import { responsiveImageProps } from '@/utils/responsive-image';
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
          <img
            {...responsiveImageProps(item.image, '100vw')}
            alt={item.alt}
            width="1600"
            height="900"
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
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
        <section className="world-chapter-observation" aria-label="Observation">
          <figure className="world-chapter-observation-frame">
            <img
              {...responsiveImageProps(item.gallery[0].image, '100vw')}
              alt={item.gallery[0].alt}
              width="1600"
              height="1100"
              loading="lazy"
              decoding="async"
            />
            <figcaption>{item.gallery[0].caption}</figcaption>
          </figure>
          <blockquote>{item.quote}</blockquote>
        </section>
        {chapter === 'bains' ? (
          <section
            className="world-chapter-waterline"
            aria-label="La ligne d’eau"
          >
            <span aria-hidden="true" />
            <div>
              <p>La ligne d’eau</p>
              <strong>Le monde sonore s’arrête ici.</strong>
              <small>Une respiration · puis l’immersion</small>
            </div>
          </section>
        ) : null}
        <section
          className="world-chapter-moments"
          aria-labelledby={`${chapter}-moments`}
        >
          <header>
            <p>La pièce en trois temps</p>
            <h2 id={`${chapter}-moments`}>
              Ce qui se passe quand personne ne regarde.
            </h2>
          </header>
          <ol>
            {item.moments.map((moment) => (
              <li key={moment.time}>
                <span>{moment.time}</span>
                <h3>{moment.title}</h3>
                <p>{moment.copy}</p>
              </li>
            ))}
          </ol>
        </section>
        <section
          className="world-chapter-gallery"
          aria-label={`Détails — ${item.title}`}
        >
          {item.gallery.slice(1).map((image, index) => (
            <figure
              key={image.caption}
              className={index === 0 ? 'is-portrait' : 'is-landscape'}
            >
              <img
                {...responsiveImageProps(
                  image.image,
                  '(max-width: 767px) 100vw, 58vw',
                )}
                alt={image.alt}
                width="1200"
                height={index === 0 ? '1500' : '900'}
                loading="lazy"
                decoding="async"
              />
              <figcaption>{image.caption}</figcaption>
            </figure>
          ))}
        </section>
        <aside className="world-chapter-signature">
          <p>{item.signature.label}</p>
          <strong>{item.signature.value}</strong>
          <span>{item.signature.note}</span>
        </aside>
        <footer className="world-chapter-next">
          <p>La Maison continue.</p>
          <ArrowLink href={item.next.href}>{item.next.label}</ArrowLink>
        </footer>
      </article>
    </>
  );
}
