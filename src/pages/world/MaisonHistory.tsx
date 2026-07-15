import { responsiveImageProps } from '@/utils/responsive-image';
import { maisonHistory } from './maison-history-data';

export function MaisonHistory() {
  return (
    <div className="maison-history">
      <section
        className="maison-history-chronology"
        aria-labelledby="maison-history-title"
      >
        <header>
          <p>{maisonHistory.introduction.eyebrow}</p>
          <h2 id="maison-history-title">{maisonHistory.introduction.title}</h2>
          <span>{maisonHistory.introduction.copy}</span>
        </header>

        <ol>
          {maisonHistory.eras.map((era) => (
            <li key={era.year}>
              <time>{era.year}</time>
              <div>
                <h3>{era.title}</h3>
                <p>{era.copy}</p>
                <small>{era.trace}</small>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section
        className="maison-history-section"
        aria-labelledby="maison-levels-title"
      >
        <header>
          <p>Coupe habitée</p>
          <h2 id="maison-levels-title">Chaque niveau protège le suivant.</h2>
        </header>

        <ol className="maison-history-levels">
          {maisonHistory.levels.map((level, index) => (
            <li key={level.level}>
              <span>0{index + 1}</span>
              <p>{level.level}</p>
              <h3>{level.name}</h3>
              <small>{level.spaces}</small>
              <strong>{level.purpose}</strong>
            </li>
          ))}
        </ol>
      </section>

      <section
        className="maison-history-restoration"
        aria-labelledby="maison-restoration-title"
      >
        <figure>
          <img
            {...responsiveImageProps(
              '/images/hotel/salon-dusk.webp',
              '(max-width: 767px) 100vw, 48vw',
            )}
            alt="Boiseries anciennes du salon conservées dans la lumière du soir"
            width="1200"
            height="1500"
            loading="lazy"
            decoding="async"
          />
          <figcaption>Le salon · restaurer sans rajeunir</figcaption>
        </figure>

        <div>
          <p>{maisonHistory.restoration.eyebrow}</p>
          <h2 id="maison-restoration-title">
            {maisonHistory.restoration.title}
          </h2>
          <span>{maisonHistory.restoration.copy}</span>

          <HistoryList
            title="Conservé"
            items={maisonHistory.restoration.kept}
          />
          <HistoryList
            title="Remplacé, puis caché"
            items={maisonHistory.restoration.hidden}
          />
          <HistoryList
            title="Refusé"
            items={maisonHistory.restoration.refused}
          />
        </div>
      </section>

      <section
        className="maison-history-unseen"
        aria-labelledby="maison-unseen-title"
      >
        <header>
          <p>{maisonHistory.unseen.eyebrow}</p>
          <h2 id="maison-unseen-title">{maisonHistory.unseen.title}</h2>
        </header>

        <div>
          <article>
            <time>{maisonHistory.unseen.before.time}</time>
            <p>{maisonHistory.unseen.before.copy}</p>
          </article>
          <article>
            <time>{maisonHistory.unseen.after.time}</time>
            <p>{maisonHistory.unseen.after.copy}</p>
          </article>
        </div>
      </section>
    </div>
  );
}

function HistoryList({
  title,
  items,
}: {
  title: string;
  items: readonly string[];
}) {
  return (
    <section className="maison-history-list" aria-label={title}>
      <h3>{title}</h3>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}
