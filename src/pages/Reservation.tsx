import { Seo } from '@/components/seo';
import { Container } from '@/components/ui/Container';
import { Ornament } from '@/components/ui/Ornament';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { pageMeta } from '@/config/seo';
import { ReservationFunnel } from '@/reservation/components';

/** Page `/reservation` — tunnel de demande de séjour en cinq étapes. */
export function Reservation() {
  return (
    <>
      <Seo {...pageMeta.reservation} />

      <section className="bg-ink-950 text-ivory relative overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0">
          <div className="from-ink-900 via-ink-950 to-foret-900 absolute inset-0 bg-gradient-to-b" />
          <div className="absolute inset-0 bg-[radial-gradient(55%_60%_at_70%_10%,rgba(184,154,91,0.16),transparent_60%)]" />
        </div>
        <Container className="relative z-10 pt-36 pb-16 md:pt-44 md:pb-20">
          <div className="max-w-2xl">
            <SectionLabel tone="light">Réservation</SectionLabel>
            <h1 className="mt-6 text-4xl md:text-6xl">Composez votre séjour</h1>
            <Ornament tone="light" className="mt-7" />
            <p className="text-ivory/70 mt-8 leading-relaxed">
              Une demande de séjour, composée sur mesure — pas un formulaire.
              Renseignez vos envies ; notre conciergerie s’occupe du reste.
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-ivory py-16 md:py-24">
        <Container>
          <ReservationFunnel />
        </Container>
      </section>
    </>
  );
}
