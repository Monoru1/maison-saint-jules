import { Link } from 'react-router-dom';
import type { CSSProperties } from 'react';
import { Seo } from '@/components/seo';
import { BookingBar } from '@/reservation/components/BookingBar';
import { LivingMaterial } from '@/components/cinematic/LivingMaterial';
import { responsiveImageProps } from '@/utils/responsive-image';
import { useLivingHouseCamera } from './useLivingHouseCamera';

const scenes = [
  {
    id: 'rue',
    act: 'I · La rue',
    title: 'Il pleut encore un peu.',
    copy: 'La pierre garde le dernier passage de l’averse. Au fond de la rue, une lumière ne demande pas encore à être regardée.',
    image: '/images/hotel/threshold-dawn.webp',
    href: '/maison',
    threshold: 'pluie',
    cue: 'Paris · 18 h 43',
  },
  {
    id: 'seuil',
    act: 'II · Le seuil',
    title: 'Une porte a été laissée ouverte.',
    copy: 'Le dehors ne disparaît pas. Il se retire derrière le bois, une vitre et le poids calme d’un loquet.',
    image: '/images/hotel/vestibule-rain-v4.webp',
    href: '/maison',
    threshold: 'porte',
    cue: 'Le bruit de la rue recule',
  },
  {
    id: 'salon',
    act: 'III · Le salon',
    title: 'Le regard trouve où s’asseoir.',
    copy: 'Le noyer absorbe le bruit. Une porte entrouverte annonce les pièces suivantes sans jamais les vendre.',
    image: '/images/suites/suite-jardin-salon-v4.webp',
    href: '/maison',
    threshold: 'lumiere',
    cue: 'Noyer · laine · feu bas',
  },
  {
    id: 'suites',
    act: 'IV · Les suites',
    title: 'Chaque chambre garde une heure différente.',
    copy: 'Une fenêtre, un pli de lin, un livre repris plus tard. Les suites sont des chapitres à habiter.',
    image: '/images/suites/chambre-signature-morning-v4.webp',
    href: '/suites',
    threshold: 'voile',
    cue: 'Le lin respire avec la fenêtre',
  },
  {
    id: 'cabinet',
    act: 'V · Le Cabinet',
    title: 'La table attend sans se montrer.',
    copy: 'Une assiette, le verre, le métal brossé. Ici, le soin a le droit d’être silencieux.',
    image: '/images/restaurant/cabinet-table-v4.webp',
    href: '/cabinet',
    threshold: 'reflet',
    cue: 'Vingt couverts · aucun éclat inutile',
  },
  {
    id: 'bains',
    act: 'VI · Les bains',
    title: 'L’eau redessine les murs.',
    copy: 'Avant le repos, il y a ce moment où la vapeur enlève les angles et ralentit le corps.',
    image: '/images/suites/chambre-signature-bath-v4.webp',
    href: '/bains',
    threshold: 'vapeur',
    cue: 'Pierre tiède · eau à 34 °C',
  },
  {
    id: 'jardin',
    act: 'VII · Le jardin',
    title: 'Puis le ciel revient.',
    copy: 'L’eau est entendue avant d’être vue. La Maison ne demande rien ; elle laisse le regard rester.',
    image: '/images/hotel/jardin-apres-pluie.webp',
    href: '/jardin',
    threshold: 'feuillage',
    cue: 'La fontaine est à douze pas',
  },
  {
    id: 'nuit',
    act: 'VIII · La nuit',
    title: 'La lumière choisit où rester.',
    copy: 'Les fenêtres deviennent des cadres. La ville s’éloigne. La Maison devient presque privée.',
    image: '/images/suites/appartement-delacroix-terrace-v4.webp',
    href: '/nuit',
    threshold: 'ombre',
    cue: '22 h 17 · la Maison ralentit',
  },
] as const;

export function WorldHome() {
  const { activeScene, rootRef } = useLivingHouseCamera(scenes.length);
  const currentScene = scenes[activeScene] ?? scenes[0];
  const portraitOpening = responsiveImageProps(
    '/images/hotel/threshold-dawn-portrait.webp',
    '100vw',
  );
  const portraitOpeningAvif = {
    src: '/images/hotel/threshold-dawn-portrait.avif',
    srcSet:
      '/images/hotel/threshold-dawn-portrait-640.avif 640w, /images/hotel/threshold-dawn-portrait.avif 941w',
    sizes: '100vw',
  };
  const landscapeOpening = responsiveImageProps(
    '/images/hotel/threshold-dawn.webp',
    '100vw',
  );

  return (
    <>
      <Seo
        title="Maison Saint-Jules — Une demeure à traverser"
        description="Une demeure parisienne à traverser, du seuil à la nuit."
      />
      <div className="world-film" ref={rootRef}>
        <div className="world-film-camera" aria-hidden="true">
          <span className="world-film-camera-jamb world-film-camera-jamb-left" />
          <span className="world-film-camera-jamb world-film-camera-jamb-right" />
          <span className="world-film-camera-focus" />
        </div>
        <aside
          className="world-film-position"
          aria-label="Position dans la Maison"
        >
          <span aria-live="polite">{currentScene.act}</span>
          <span className="world-film-position-line" aria-hidden="true">
            <i
              style={
                { '--position-scale': (activeScene + 1) / 8 } as CSSProperties
              }
            />
          </span>
          <ol>
            {scenes.map((scene) => (
              <li key={scene.id}>
                <a
                  href={`#scene-${scene.id}`}
                  aria-label={`Aller à ${scene.act}`}
                >
                  {scene.id}
                </a>
              </li>
            ))}
          </ol>
        </aside>
        <link
          rel="preload"
          as="image"
          href={portraitOpeningAvif.src}
          imageSrcSet={portraitOpeningAvif.srcSet}
          imageSizes={portraitOpeningAvif.sizes}
          media="(orientation: portrait) and (max-width: 767px)"
          type="image/avif"
          fetchPriority="high"
        />
        <link
          rel="preload"
          as="image"
          href={landscapeOpening.src}
          imageSrcSet={landscapeOpening.srcSet}
          imageSizes={landscapeOpening.sizes}
          media="(min-width: 768px), (orientation: landscape)"
          fetchPriority="high"
        />
        <header className="world-film-opening" data-house-scene>
          <picture className="world-film-opening-image">
            <source
              type="image/avif"
              media="(orientation: portrait) and (max-width: 767px)"
              srcSet={portraitOpeningAvif.srcSet}
              sizes={portraitOpeningAvif.sizes}
            />
            <source
              media="(orientation: portrait) and (max-width: 767px)"
              srcSet={portraitOpening.srcSet}
              sizes={portraitOpening.sizes}
            />
            <img
              {...landscapeOpening}
              alt=""
              width="1600"
              height="900"
              decoding="async"
              fetchPriority="high"
            />
          </picture>
          <div className="world-film-opening-veil" />
          <div className="world-film-opening-copy">
            <p>Maison Saint-Jules · Paris</p>
            <h1>
              Entrez.
              <br />
              <em>Paris attendra.</em>
            </h1>
            <span>Avancez doucement</span>
          </div>
        </header>
        <section className="world-film-prologue">
          <p>
            Une demeure secrète, où l’on entre comme on ouvrirait des rideaux
            sur un autre monde. Non pas un hôtel à regarder — une Maison dans
            laquelle le temps change de matière.
          </p>
        </section>
        <div className="world-film-sequences">
          {scenes.map((scene, index) => (
            <section
              key={scene.id}
              id={`scene-${scene.id}`}
              data-house-scene
              data-threshold={scene.threshold}
              className={`world-film-scene world-film-scene-${scene.id}`}
              style={{ '--scene-order': index } as CSSProperties}
            >
              <div className="world-film-scene-stage">
                <div className="world-film-scene-image">
                  {scene.id === 'suites' ? (
                    <LivingMaterial src={scene.image} alt="" mode="fabric" />
                  ) : (
                    <img
                      {...responsiveImageProps(scene.image, '100vw')}
                      alt=""
                      loading="lazy"
                      decoding="async"
                    />
                  )}
                </div>
                <div className="world-film-scene-living" aria-hidden="true" />
                <div
                  className="world-film-scene-threshold"
                  aria-hidden="true"
                />
                <div className="world-film-scene-copy">
                  <p>{scene.act}</p>
                  <h2>{scene.title}</h2>
                  <span>{scene.copy}</span>
                  <Link to={scene.href}>Franchir cette pièce</Link>
                </div>
                <p className="world-film-scene-cue">{scene.cue}</p>
              </div>
            </section>
          ))}
        </div>
        <section className="world-film-booking" aria-labelledby="booking-title">
          <div>
            <p>IX · Être attendu</p>
            <h2 id="booking-title">Choisissez seulement le moment.</h2>
            <span>La Maison préparera le reste.</span>
          </div>
          <BookingBar />
        </section>
        <section className="world-film-reservation">
          <p>Après la nuit, tout devient plus simple.</p>
          <Link to="/reservation">La Maison est prête à vous recevoir</Link>
        </section>
      </div>
    </>
  );
}
