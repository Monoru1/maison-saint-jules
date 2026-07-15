import { useMemo, useState } from 'react';

import { Seo } from '@/components/seo';
import { LivingMaterial } from '@/components/cinematic/LivingMaterial';
import { SuiteCard } from '@/components/suites';
import { SuiteFilters, type KindFilter } from '@/components/suites';
import { Container } from '@/components/ui/Container';
import { Ornament } from '@/components/ui/Ornament';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { pageMeta } from '@/config/seo';
import { suiteKindLabels, suites } from '@/hotel/data';

const kindFilters: readonly { value: KindFilter; label: string }[] = [
  { value: 'all', label: 'Toutes' },
  { value: 'chambre', label: suiteKindLabels.chambre },
  { value: 'suite', label: suiteKindLabels.suite },
  { value: 'appartement', label: suiteKindLabels.appartement },
];

/** Page `/suites` — présentation et exploration des hébergements. */
export function SuitesList() {
  const [activeKind, setActiveKind] = useState<KindFilter>('all');
  const [minGuests, setMinGuests] = useState(1);

  const filtered = useMemo(
    () =>
      suites.filter(
        (suite) =>
          (activeKind === 'all' || suite.kind === activeKind) &&
          suite.guests >= minGuests,
      ),
    [activeKind, minGuests],
  );

  const resetFilters = () => {
    setActiveKind('all');
    setMinGuests(1);
  };

  return (
    <>
      <Seo {...pageMeta.suites} />

      <section className="suites-cinematic-hero bg-ink-950 text-ivory relative min-h-[88svh] overflow-hidden">
        <LivingMaterial
          src="/images/suites/chambre-signature-morning-v4.webp"
          alt="Chambre aux boiseries sombres, lin froissé et voilage soulevé par l’air du jardin"
          mode="fabric"
          className="absolute inset-0"
          priority
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,8,7,.62),rgba(8,8,7,.06)_58%,transparent_78%),linear-gradient(0deg,rgba(8,8,7,.5),transparent_52%)]"
        />
        <Container className="relative z-10 flex min-h-[88svh] items-end pt-36 pb-16 md:pb-24">
          <div className="max-w-2xl">
            <SectionLabel tone="light">II · Les pièces</SectionLabel>
            <h1 className="mt-6 text-5xl leading-[.94] md:text-7xl">
              Une chambre garde
              <br />
              <em className="text-brass-300 font-normal">la lumière.</em>
            </h1>
            <Ornament tone="light" className="mt-7" />
            <p className="text-ivory/72 mt-8 max-w-lg leading-relaxed">
              À 08 h 30, le lin bouge de deux centimètres. Le noyer reste dans
              l’ombre. Un livre attend à l’endroit où la pluie devient visible.
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-ivory py-16 md:py-24">
        <Container>
          <SuiteFilters
            kinds={kindFilters}
            activeKind={activeKind}
            onKindChange={setActiveKind}
            minGuests={minGuests}
            onMinGuestsChange={setMinGuests}
            resultCount={filtered.length}
          />

          {filtered.length > 0 ? (
            <div className="mt-14 grid gap-8 md:grid-cols-3">
              {filtered.map((suite, index) => (
                <SuiteCard
                  key={suite.id}
                  suite={suite}
                  delay={index * 100}
                  showReserve
                />
              ))}
            </div>
          ) : (
            <div className="mt-16 text-center">
              <p className="text-ink-500">
                Aucune suite ne correspond à ces critères.
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="text-brass-600 mt-4 font-sans text-sm underline underline-offset-4"
              >
                Réinitialiser les filtres
              </button>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
