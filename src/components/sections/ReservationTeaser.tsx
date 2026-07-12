import { Container } from '@/components/ui/Container';
import { Ornament } from '@/components/ui/Ornament';
import { Reveal } from '@/components/ui/Reveal';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { SmartLink } from '@/components/ui/SmartLink';
import { buttonClasses } from '@/components/ui/button-variants';
import { ROUTES } from '@/config/routes';
import { hotel } from '@/hotel/data';

/** Invitation à la réservation — bloc immersif (teaser, sans moteur). */
export function ReservationTeaser() {
  return (
    <section
      data-scene="night"
      className="cinematic-scene cinematic-night bg-ink-950 text-ivory relative overflow-hidden"
    >
      <div aria-hidden="true" className="absolute inset-0">
        <div className="from-foret-900 via-ink-950 to-ink-900 absolute inset-0 bg-gradient-to-br" />
        <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(184,154,91,0.16),transparent_65%)]" />
      </div>

      <Container className="relative z-10 py-28 text-center md:py-36">
        <Reveal className="mx-auto max-w-2xl">
          <SectionLabel tone="light">Acte VI · La nuit</SectionLabel>
          <h2 className="mt-6 text-4xl md:text-6xl">La Maison est prête.</h2>
          <Ornament tone="light" className="mt-7" />
          <p className="text-ivory/70 mx-auto mt-8 max-w-xl leading-relaxed">
            Nos équipes composent chaque séjour sur mesure. Réservez votre
            demeure privée au cœur de Paris, ou confiez-nous vos envies.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <SmartLink
              href={ROUTES.reservation}
              className={buttonClasses({ variant: 'primary', size: 'lg' })}
            >
              Réserver un séjour
            </SmartLink>
            <a
              href={`tel:${hotel.phone.replace(/\s/g, '')}`}
              className={buttonClasses({ variant: 'inverted', size: 'lg' })}
            >
              {hotel.phone}
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
