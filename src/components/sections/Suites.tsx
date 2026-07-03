import { ArrowLink } from '@/components/ui/ArrowLink';
import { Container } from '@/components/ui/Container';
import { Media } from '@/components/ui/Media';
import { Reveal } from '@/components/ui/Reveal';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { HOME_SECTIONS, ROUTES } from '@/config/routes';
import { suites } from '@/hotel/data';
import type { Suite } from '@/hotel/types';
import { formatPrice } from '@/utils/format';

/** Aperçu des trois catégories d'hébergement. */
export function Suites() {
  return (
    <section
      id={HOME_SECTIONS.suites}
      className="bg-ivory-muted py-24 md:py-32"
    >
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <SectionLabel>Séjourner</SectionLabel>
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
      </Container>
    </section>
  );
}

function SuiteCard({ suite, delay }: { suite: Suite; delay: number }) {
  return (
    <Reveal as="article" delay={delay} className="group flex flex-col">
      <div className="overflow-hidden">
        <Media
          src={suite.image}
          alt={suite.name}
          aspect="aspect-[4/5]"
          className="transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
        />
      </div>
      <div className="mt-6 flex flex-1 flex-col">
        <div className="text-ink-400 flex items-center gap-3 font-sans text-[0.7rem] tracking-[0.2em] uppercase">
          <span>{suite.area} m²</span>
          <span aria-hidden="true">·</span>
          <span>
            {suite.guests} {suite.guests > 1 ? 'personnes' : 'personne'}
          </span>
        </div>
        <h3 className="font-display text-ink-900 mt-3 text-2xl">
          {suite.name}
        </h3>
        <p className="text-ink-500 mt-2 text-sm italic">{suite.tagline}</p>
        <p className="text-ink-600 mt-4 flex-1 text-sm leading-relaxed">
          {suite.description}
        </p>
        <div className="border-ink-200/70 mt-6 flex items-center justify-between border-t pt-5">
          <span className="text-ink-800 font-sans text-sm">
            À partir de{' '}
            <span className="text-brass-600 font-medium">
              {formatPrice(suite.priceFrom)}
            </span>
          </span>
          <ArrowLink href={ROUTES.reservation}>Réserver</ArrowLink>
        </div>
      </div>
    </Reveal>
  );
}
