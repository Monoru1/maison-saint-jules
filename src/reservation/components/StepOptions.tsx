import type { Extra, ExtraBilling } from '@/reservation/types';
import { extraCost } from '@/reservation/utils/pricing';
import { cn } from '@/utils/cn';
import { formatPrice } from '@/utils/format';

import { StepHeading } from './StepHeading';

const billingLabels: Record<ExtraBilling, string> = {
  'per-stay': 'par séjour',
  'per-night': 'par nuit',
  'per-person': 'par personne',
};

interface StepOptionsProps {
  extras: readonly Extra[];
  selectedIds: readonly string[];
  onToggle: (id: string) => void;
  nights: number;
  guests: number;
}

/** Étape 3 — options du séjour. */
export function StepOptions({
  extras,
  selectedIds,
  onToggle,
  nights,
  guests,
}: StepOptionsProps) {
  return (
    <div>
      <StepHeading
        step="Étape 3"
        title="Vos options"
        subtitle="Composez votre séjour sur mesure. Toutes les options sont facultatives."
      />

      <div role="group" aria-label="Options du séjour" className="space-y-3">
        {extras.map((extra) => {
          const checked = selectedIds.includes(extra.id);
          const inputId = `extra-${extra.id}`;
          return (
            <div
              key={extra.id}
              className={cn(
                'flex gap-4 border p-5 transition-colors',
                checked
                  ? 'border-brass-500 bg-ivory-muted'
                  : 'border-ink-200 hover:border-ink-400',
              )}
            >
              <input
                id={inputId}
                type="checkbox"
                checked={checked}
                onChange={() => onToggle(extra.id)}
                className="accent-brass-600 mt-1 size-4 shrink-0"
              />
              <label htmlFor={inputId} className="flex-1 cursor-pointer">
                <span className="flex items-baseline justify-between gap-4">
                  <span className="text-ink-900 font-medium">{extra.name}</span>
                  <span className="text-ink-800 text-sm whitespace-nowrap">
                    {formatPrice(extraCost(extra, { nights, guests }))}
                  </span>
                </span>
                <span className="text-ink-500 mt-1 block text-sm leading-relaxed">
                  {extra.description}
                </span>
                <span className="text-ink-400 mt-1 block font-sans text-[0.7rem] tracking-[0.15em] uppercase">
                  {formatPrice(extra.price)} {billingLabels[extra.billing]}
                </span>
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
}
