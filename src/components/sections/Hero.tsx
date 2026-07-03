import { Container } from '@/components/ui/Container';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { SmartLink } from '@/components/ui/SmartLink';
import { buttonClasses } from '@/components/ui/button-variants';
import { HOME_SECTIONS, ROUTES } from '@/config/routes';
import { hotel } from '@/hotel/data';

import { BookingBar } from './BookingBar';

/** Hero immersif : première impression de la Maison. */
export function Hero() {
  return (
    <section className="bg-ink-950 text-ivory relative flex min-h-dvh flex-col justify-end overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0">
        <div className="from-ink-900 via-ink-950 to-foret-900 absolute inset-0 bg-gradient-to-b" />
        <div className="absolute inset-0 bg-[radial-gradient(65%_55%_at_72%_18%,rgba(184,154,91,0.18),transparent_60%)]" />
        <div className="from-ink-950 absolute inset-0 bg-gradient-to-t via-transparent to-transparent" />
      </div>

      <Container className="relative z-10 pt-36 pb-12">
        <div className="max-w-2xl">
          <SectionLabel tone="light">
            Paris XVI · Hôtel particulier
          </SectionLabel>
          <h1 className="mt-6 text-5xl leading-[1.06] sm:text-6xl md:text-7xl">
            L’élégance d’une maison.
            <span className="text-brass-300 mt-1 block italic">
              Le privilège d’un instant.
            </span>
          </h1>
          <p className="text-ivory/70 mt-8 max-w-xl leading-relaxed">
            Derrière une façade discrète du 16ᵉ arrondissement, une demeure
            privée où le bruit de Paris s’efface. {hotel.tagline}
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <SmartLink
              href={`#${HOME_SECTIONS.suites}`}
              className={buttonClasses({ variant: 'inverted', size: 'lg' })}
            >
              Découvrir les suites
            </SmartLink>
            <SmartLink
              href={ROUTES.reservation}
              className={buttonClasses({ variant: 'primary', size: 'lg' })}
            >
              Réserver un séjour
            </SmartLink>
          </div>
        </div>

        <div className="mt-16 md:mt-24">
          <BookingBar />
        </div>
      </Container>
    </section>
  );
}
