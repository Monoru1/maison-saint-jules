import { Seo } from '@/components/seo';
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

/** Page d'accueil immersive — composition des sections de la Maison. */
export function Home() {
  return (
    <>
      <Seo {...pageMeta.home} />
      <Hero />
      <Signature />
      <Suites />
      <Restaurant />
      <Spa />
      <Experiences />
      <ReservationTeaser />
      <Gallery />
    </>
  );
}
