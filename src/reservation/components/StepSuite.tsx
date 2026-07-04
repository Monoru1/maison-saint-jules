import { Media } from '@/components/ui/Media';
import { SmartLink } from '@/components/ui/SmartLink';
import { buttonClasses } from '@/components/ui/button-variants';
import { ROUTES } from '@/config/routes';
import { suiteKindLabels } from '@/hotel/data';
import type { Suite } from '@/hotel/types';
import { cn } from '@/utils/cn';
import { formatPrice } from '@/utils/format';

import { StepHeading } from './StepHeading';

interface StepSuiteProps {
  suites: readonly Suite[];
  selectedSlug: string | null;
  onSelect: (slug: string) => void;
  showError: boolean;
}

/** Étape 2 — choix de la suite. */
export function StepSuite({
  suites,
  selectedSlug,
  onSelect,
  showError,
}: StepSuiteProps) {
  return (
    <div>
      <StepHeading
        step="Étape 2"
        title="Votre suite"
        subtitle="Choisissez l’hébergement qui accueillera votre séjour."
      />

      <div role="group" aria-label="Choisir une suite" className="space-y-4">
        {suites.map((suite) => {
          const selected = suite.slug === selectedSlug;
          return (
            <article
              key={suite.id}
              className={cn(
                'flex flex-col gap-5 border p-5 transition-colors sm:flex-row',
                selected
                  ? 'border-brass-500 bg-ivory-muted'
                  : 'border-ink-200 hover:border-ink-400',
              )}
            >
              <Media
                image={suite.cover}
                aspect="aspect-[4/3]"
                className="sm:w-40 sm:shrink-0"
              />
              <div className="flex flex-1 flex-col">
                <div className="text-ink-400 flex flex-wrap items-center gap-x-3 gap-y-1 font-sans text-[0.7rem] tracking-[0.15em] uppercase">
                  <span>{suiteKindLabels[suite.kind]}</span>
                  <span aria-hidden="true">·</span>
                  <span>{suite.area} m²</span>
                  <span aria-hidden="true">·</span>
                  <span>{suite.guests} pers.</span>
                </div>
                <h3 className="font-display text-ink-900 mt-2 text-2xl">
                  {suite.name}
                </h3>
                <p className="text-ink-500 mt-1 text-sm">
                  {suite.services.slice(0, 2).join(' · ')}
                </p>

                <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-5">
                  <span className="text-ink-800 text-sm">
                    À partir de{' '}
                    <span className="text-brass-600 font-medium">
                      {formatPrice(suite.priceFrom)}
                    </span>{' '}
                    / nuit
                  </span>
                  <div className="flex items-center gap-4">
                    <SmartLink
                      href={ROUTES.suiteDetail(suite.slug)}
                      className="text-ink-500 hover:text-ink-900 font-sans text-xs tracking-[0.15em] uppercase underline underline-offset-4"
                    >
                      Voir le détail
                    </SmartLink>
                    <button
                      type="button"
                      aria-pressed={selected}
                      onClick={() => onSelect(suite.slug)}
                      className={buttonClasses({
                        variant: selected ? 'primary' : 'outline',
                        size: 'sm',
                      })}
                    >
                      {selected ? 'Sélectionnée' : 'Choisir'}
                    </button>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {showError ? (
        <p role="alert" className="mt-6 text-sm text-red-700">
          Veuillez sélectionner une suite pour continuer.
        </p>
      ) : null}
    </div>
  );
}
