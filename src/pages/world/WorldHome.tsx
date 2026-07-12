import { Link } from 'react-router-dom';
import { Seo } from '@/components/seo';

const scenes = [
  [
    'rue',
    'I · La rue',
    'Il pleut encore un peu.',
    'La pierre garde le dernier passage de l’averse. Au fond de la rue, une lumière ne demande pas encore à être regardée.',
    '/images/hotel/threshold-dawn.webp',
    '/maison',
  ],
  [
    'seuil',
    'II · Le seuil',
    'Une porte a été laissée ouverte.',
    'Le dehors ne disparaît pas. Il se retire derrière le bois, une vitre et le poids calme d’un loquet.',
    '/images/hotel/threshold-dawn.webp',
    '/maison',
  ],
  [
    'salon',
    'III · Le salon',
    'Le regard trouve où s’asseoir.',
    'Le noyer absorbe le bruit. Une porte entrouverte annonce les pièces suivantes sans jamais les vendre.',
    '/images/hotel/salon-dusk.webp',
    '/suites',
  ],
  [
    'suites',
    'IV · Les suites',
    'Chaque chambre garde une heure différente.',
    'Une fenêtre, un pli de lin, un livre repris plus tard. Les suites sont des chapitres à habiter.',
    '/images/suites/suite-jardin-cover.webp',
    '/suites',
  ],
  [
    'cabinet',
    'V · Le Cabinet',
    'La table attend sans se montrer.',
    'Une assiette, le verre, le métal brossé. Ici, le soin a le droit d’être silencieux.',
    '/images/restaurant/le-cabinet.webp',
    '/cabinet',
  ],
  [
    'bains',
    'VI · Les bains',
    'L’eau redessine les murs.',
    'Avant le repos, il y a ce moment où la vapeur enlève les angles et ralentit le corps.',
    '/images/spa/baths-still.webp',
    '/bains',
  ],
  [
    'jardin',
    'VII · Le jardin',
    'Puis le ciel revient.',
    'L’eau est entendue avant d’être vue. La Maison ne demande rien ; elle laisse le regard rester.',
    '/images/hotel/jardin-apres-pluie.webp',
    '/jardin',
  ],
  [
    'nuit',
    'VIII · La nuit',
    'La lumière choisit où rester.',
    'Les fenêtres deviennent des cadres. La ville s’éloigne. La Maison devient presque privée.',
    '/images/hotel/salon-dusk.webp',
    '/nuit',
  ],
] as const;

export function WorldHome() {
  return (
    <>
      <Seo
        title="Maison Saint-Jules — Une demeure à traverser"
        description="Une demeure parisienne à traverser, du seuil à la nuit."
      />
      <main className="world-film">
        <header className="world-film-opening">
          <div className="world-film-opening-image" />
          <div className="world-film-opening-veil" />
          <div className="world-film-opening-copy">
            <p>Maison Saint-Jules · Paris</p>
            <h1>
              Entrez.
              <br />
              <em>Paris attendra.</em>
            </h1>
            <span>Faites un pas pour commencer</span>
          </div>
        </header>
        <section className="world-film-prologue">
          <p>
            Une demeure secrète, où l’on entre comme on ouvrirait des rideaux
            sur un autre monde. Non pas un hôtel à regarder — une Maison dans
            laquelle le temps change de matière.
          </p>
        </section>
        <nav aria-label="Traverser la Maison" className="world-film-sequences">
          {scenes.map(([id, act, title, copy, image, href], index) => (
            <Link
              key={id}
              to={href}
              className={`world-film-scene world-film-scene-${id}`}
            >
              <div className="world-film-scene-image">
                <img
                  src={image}
                  alt=""
                  loading={index > 1 ? 'lazy' : 'eager'}
                />
              </div>
              <div className="world-film-scene-copy">
                <p>{act}</p>
                <h2>{title}</h2>
                <span>{copy}</span>
                <i>Découvrir</i>
              </div>
            </Link>
          ))}
        </nav>
        <section className="world-film-reservation">
          <p>Après la nuit, tout devient plus simple.</p>
          <Link to="/reservation">La Maison est prête à vous recevoir</Link>
        </section>
      </main>
    </>
  );
}
