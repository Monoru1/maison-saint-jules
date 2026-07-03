import { useMemo, useState } from 'react';

import { Seo } from '@/components/seo';
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

      <section className="bg-ink-950 text-ivory relative overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0">
          <div className="from-ink-900 via-ink-950 to-foret-900 absolute inset-0 bg-gradient-to-b" />
          <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_70%_10%,rgba(184,154,91,0.16),transparent_60%)]" />
        </div>
        <Container className="relative z-10 pt-36 pb-16 md:pt-44 md:pb-20">
          <div className="max-w-2xl">
            <SectionLabel tone="light">Nos hébergements</SectionLabel>
            <h1 className="mt-6 text-5xl md:text-6xl">Suites &amp; Chambres</h1>
            <Ornament tone="light" className="mt-7" />
            <p className="text-ivory/70 mt-8 leading-relaxed">
              Onze clés seulement. Chaque chambre, chaque suite possède son
              caractère, ses matières et sa lumière — comme autant de pièces
              d’une même demeure privée.
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
