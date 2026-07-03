import { useParams } from 'react-router-dom';

import { Seo } from '@/components/seo';
import { SuiteGallery } from '@/components/suites';
import { Container } from '@/components/ui/Container';
import { Media } from '@/components/ui/Media';
import { Ornament } from '@/components/ui/Ornament';
import { Reveal } from '@/components/ui/Reveal';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { SmartLink } from '@/components/ui/SmartLink';
import { buttonClasses } from '@/components/ui/button-variants';
import { ROUTES } from '@/config/routes';
import { suiteMeta } from '@/config/seo';
import { getSuiteBySlug, suiteKindLabels } from '@/hotel/data';
import type { Suite } from '@/hotel/types';
import { formatPrice } from '@/utils/format';

import { NotFound } from '../NotFound';

/** Page `/suites/:slug` — présentation détaillée d'une suite. */
export function SuiteDetail() {
  const { slug } = useParams();
  const suite = slug ? getSuiteBySlug(slug) : undefined;

  if (!suite) {
    return <NotFound />;
  }

  return (
    <>
      <Seo {...suiteMeta(suite)} />
      <SuiteHero suite={suite} />

      <section className="bg-ivory py-20 md:py-28">
        <Container className="space-y-20 md:space-y-28">
          <SuiteGallery images={[suite.cover, ...suite.gallery]} />

          <div className="grid gap-12 md:grid-cols-[1.4fr_1fr] md:gap-16">
            <Reveal>
              <SectionLabel>La suite</SectionLabel>
              <h2 className="text-ink-900 mt-5 text-3xl md:text-4xl">
                {suite.tagline}
              </h2>
              <Ornament className="mt-6" />
              <div className="text-ink-600 mt-8 space-y-5 leading-relaxed">
                {suite.editorial.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </Reveal>

            <Reveal delay={120} className="space-y-10">
              <DetailList title="Caractéristiques" items={suite.features} />
              <DetailList title="Services inclus" items={suite.services} />
            </Reveal>
          </div>

          <SignatureExperience suite={suite} />
        </Container>
      </section>

      <SuiteReservationCta suite={suite} />
    </>
  );
}

function SuiteHero({ suite }: { suite: Suite }) {
  const specs = [
    { label: 'Catégorie', value: suiteKindLabels[suite.kind] },
    { label: 'Capacité', value: `${suite.guests} personnes` },
    { label: 'Surface', value: `${suite.area} m²` },
    { label: 'Couchage', value: suite.bed },
    { label: 'Vue', value: suite.view },
  ];

  return (
    <section className="bg-ink-950 text-ivory relative overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0">
        <div className="from-ink-900 via-ink-950 to-foret-900 absolute inset-0 bg-gradient-to-b" />
      </div>
      <Container className="relative z-10 grid gap-12 pt-36 pb-20 md:grid-cols-2 md:items-center md:gap-16 md:pt-44">
        <div>
          <SectionLabel tone="light">
            {suiteKindLabels[suite.kind]}
          </SectionLabel>
          <h1 className="mt-6 text-4xl md:text-6xl">{suite.name}</h1>
          <p className="text-ivory/70 mt-6 max-w-md leading-relaxed">
            {suite.description}
          </p>

          <dl className="border-ivory/10 mt-10 grid grid-cols-2 gap-x-8 gap-y-5 border-t pt-8 sm:grid-cols-3">
            {specs.map((spec) => (
              <div key={spec.label}>
                <dt className="text-ivory/45 font-sans text-[0.65rem] tracking-[0.2em] uppercase">
                  {spec.label}
                </dt>
                <dd className="mt-1 text-sm">{spec.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
            <span className="font-sans text-sm">
              À partir de{' '}
              <span className="text-brass-300 font-display text-xl">
                {formatPrice(suite.priceFrom)}
              </span>{' '}
              / nuit
            </span>
            <SmartLink
              href={ROUTES.reservation}
              className={buttonClasses({ variant: 'primary', size: 'lg' })}
            >
              Réserver cette suite
            </SmartLink>
          </div>
        </div>

        <Media image={suite.cover} aspect="aspect-[4/5]" loading="eager" />
      </Container>
    </section>
  );
}

function DetailList({
  title,
  items,
}: {
  title: string;
  items: readonly string[];
}) {
  return (
    <div>
      <h3 className="text-ink-400 font-sans text-xs tracking-[0.2em] uppercase">
        {title}
      </h3>
      <ul className="mt-5 space-y-3">
        {items.map((item) => (
          <li
            key={item}
            className="text-ink-700 flex gap-3 text-sm leading-relaxed"
          >
            <span aria-hidden="true" className="text-brass-500">
              —
            </span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function SignatureExperience({ suite }: { suite: Suite }) {
  return (
    <Reveal className="bg-foret-800 text-ivory px-8 py-14 text-center md:px-16 md:py-20">
      <SectionLabel tone="light">Expérience signature</SectionLabel>
      <h2 className="font-display mt-5 text-3xl md:text-4xl">
        {suite.experience.title}
      </h2>
      <p className="text-ivory/70 mx-auto mt-6 max-w-xl leading-relaxed">
        {suite.experience.description}
      </p>
    </Reveal>
  );
}

function SuiteReservationCta({ suite }: { suite: Suite }) {
  return (
    <section className="bg-ink-950 text-ivory relative overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0">
        <div className="from-foret-900 via-ink-950 to-ink-900 absolute inset-0 bg-gradient-to-br" />
        <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(184,154,91,0.16),transparent_65%)]" />
      </div>
      <Container className="relative z-10 py-24 text-center md:py-32">
        <Reveal className="mx-auto max-w-2xl">
          <h2 className="text-3xl md:text-5xl">Séjourner à la {suite.name}</h2>
          <Ornament tone="light" className="mt-7" />
          <p className="text-ivory/70 mx-auto mt-8 max-w-xl leading-relaxed">
            Notre conciergerie compose votre séjour sur mesure. Réservez cette
            suite ou confiez-nous vos envies.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <SmartLink
              href={ROUTES.reservation}
              className={buttonClasses({ variant: 'primary', size: 'lg' })}
            >
              Réserver cette suite
            </SmartLink>
            <SmartLink
              href={ROUTES.suites}
              className={buttonClasses({ variant: 'inverted', size: 'lg' })}
            >
              Voir les autres suites
            </SmartLink>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
