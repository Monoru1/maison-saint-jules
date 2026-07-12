import { SuiteCard } from '@/components/suites';
import { ArrowLink } from '@/components/ui/ArrowLink';
import { Container } from '@/components/ui/Container';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { HOME_SECTIONS, ROUTES } from '@/config/routes';
import { suites } from '@/hotel/data';

/** Aperçu des hébergements sur la page d'accueil. */
export function Suites() {
  return (
    <section
      id={HOME_SECTIONS.suites}
      data-scene="rooms"
      className="cinematic-scene cinematic-rooms bg-ivory-muted py-28 md:py-40"
    >
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <SectionLabel>Acte III · Les pièces</SectionLabel>
          <h2 className="text-ink-900 mt-5 text-4xl md:text-5xl">
            Suites &amp; Chambres
          </h2>
          <p className="text-ink-500 mt-6 leading-relaxed">
            Aucune chambre n’est identique. Chacune possède son caractère, ses
            matières et sa lumière.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {suites.map((suite, index) => (
            <SuiteCard key={suite.id} suite={suite} delay={index * 100} />
          ))}
        </div>

        <div className="mt-14 text-center">
          <ArrowLink href={ROUTES.suites}>Voir toutes les suites</ArrowLink>
        </div>
      </Container>
    </section>
  );
}
