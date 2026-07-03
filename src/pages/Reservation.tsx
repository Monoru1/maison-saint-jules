import { Seo } from '@/components/seo';
import { Container } from '@/components/ui/Container';
import { Ornament } from '@/components/ui/Ornament';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { SmartLink } from '@/components/ui/SmartLink';
import { buttonClasses } from '@/components/ui/button-variants';
import { ROUTES } from '@/config/routes';
import { pageMeta } from '@/config/seo';
import { hotel } from '@/hotel/data';

/**
 * Page de réservation — invitation premium.
 * Le moteur de réservation complet fera l'objet d'un sprint dédié ; cette page
 * assure une destination soignée aux CTA « Réserver ».
 */
export function Reservation() {
  return (
    <>
      <Seo {...pageMeta.reservation} />
      <section className="bg-ink-950 text-ivory relative flex min-h-dvh flex-col justify-center overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0">
          <div className="from-ink-900 via-ink-950 to-foret-900 absolute inset-0 bg-gradient-to-b" />
          <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_15%,rgba(184,154,91,0.16),transparent_60%)]" />
        </div>

        <Container className="relative z-10 py-32 text-center">
          <div className="mx-auto max-w-2xl">
            <SectionLabel tone="light">Réservation</SectionLabel>
            <h1 className="mt-6 text-4xl md:text-6xl">Composez votre séjour</h1>
            <Ornament tone="light" className="mt-7" />
            <p className="text-ivory/70 mx-auto mt-8 max-w-xl leading-relaxed">
              Notre moteur de réservation ouvre très prochainement. En
              attendant, notre conciergerie compose votre séjour sur mesure,
              dans la plus grande discrétion.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href={`tel:${hotel.phone.replace(/\s/g, '')}`}
                className={buttonClasses({ variant: 'primary', size: 'lg' })}
              >
                Appeler la conciergerie
              </a>
              <SmartLink
                href={ROUTES.home}
                className={buttonClasses({ variant: 'inverted', size: 'lg' })}
              >
                Retour à la Maison
              </SmartLink>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
