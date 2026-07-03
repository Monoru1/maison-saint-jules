import type { SuiteKind } from '@/hotel/types';
import { cn } from '@/utils/cn';

export type KindFilter = SuiteKind | 'all';

interface KindOption {
  readonly value: KindFilter;
  readonly label: string;
}

interface SuiteFiltersProps {
  kinds: readonly KindOption[];
  activeKind: KindFilter;
  onKindChange: (kind: KindFilter) => void;
  minGuests: number;
  onMinGuestsChange: (value: number) => void;
  resultCount: number;
}

const capacityOptions = [1, 2, 3, 4];

/**
 * Filtres client des suites (catégorie + capacité). Volontairement non
 * connectés à Appwrite à ce stade : état local, aucune requête réseau.
 */
export function SuiteFilters({
  kinds,
  activeKind,
  onKindChange,
  minGuests,
  onMinGuestsChange,
  resultCount,
}: SuiteFiltersProps) {
  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
      <div
        role="group"
        aria-label="Filtrer par catégorie"
        className="flex flex-wrap gap-2"
      >
        {kinds.map((option) => {
          const active = option.value === activeKind;
          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={active}
              onClick={() => onKindChange(option.value)}
              className={cn(
                'border px-4 py-2 font-sans text-xs tracking-[0.15em] uppercase transition-colors',
                active
                  ? 'border-ink-900 bg-ink-900 text-ivory'
                  : 'border-ink-300 text-ink-600 hover:border-ink-900',
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-4">
        <label className="flex items-center gap-3 font-sans text-xs tracking-[0.15em] uppercase">
          <span className="text-ink-500">Capacité</span>
          <select
            value={minGuests}
            onChange={(event) => onMinGuestsChange(Number(event.target.value))}
            className="border-ink-300 text-ink-800 border bg-transparent px-3 py-2 outline-none"
          >
            <option value={1}>Toutes</option>
            {capacityOptions.slice(1).map((value) => (
              <option key={value} value={value}>
                {value}+ personnes
              </option>
            ))}
          </select>
        </label>
        <p aria-live="polite" className="text-ink-400 font-sans text-xs">
          {resultCount} {resultCount > 1 ? 'suites' : 'suite'}
        </p>
      </div>
    </div>
  );
}
