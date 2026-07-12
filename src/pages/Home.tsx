import { Seo } from '@/components/seo';
import { SoundControl } from '@/components/ui/SoundControl';
import {
  Experiences,
  Gallery,
  Hero,
  ReservationTeaser,
  Restaurant,
  Signature,
  Spa,
  Suites,
} from '@/components/sections';
import { pageMeta } from '@/config/seo';
import { useCinematicJourney } from '@/hooks/useCinematicJourney';

/** Page d'accueil immersive — composition des sections de la Maison. */
export function Home() {
  const journeyRef = useCinematicJourney();
  return (
    <>
      <Seo {...pageMeta.home} />
      <main ref={journeyRef} className="cinematic-journey">
        <SoundControl />
        <Hero />
        <Signature />
        <Suites />
        <Restaurant />
        <Spa />
        <Experiences />
        <Gallery />
        <ReservationTeaser />
      </main>
    </>
  );
}
