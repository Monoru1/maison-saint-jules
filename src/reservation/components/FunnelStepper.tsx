import { cn } from '@/utils/cn';

interface FunnelStepperProps {
  steps: readonly string[];
  current: number;
  onStepSelect: (index: number) => void;
}

/** Indicateur d'étapes accessible (étapes franchies cliquables). */
export function FunnelStepper({
  steps,
  current,
  onStepSelect,
}: FunnelStepperProps) {
  return (
    <nav aria-label="Étapes de la réservation">
      <ol className="flex flex-wrap items-center gap-x-3 gap-y-2">
        {steps.map((label, index) => {
          const done = index < current;
          const isCurrent = index === current;
          return (
            <li key={label} className="flex items-center gap-3">
              <button
                type="button"
                disabled={!done}
                aria-current={isCurrent ? 'step' : undefined}
                onClick={() => {
                  onStepSelect(index);
                }}
                className={cn(
                  'flex items-center gap-2 font-sans text-xs tracking-[0.15em] uppercase',
                  done ? 'cursor-pointer' : 'cursor-default',
                )}
              >
                <span
                  className={cn(
                    'grid size-7 place-items-center rounded-full border text-[0.7rem]',
                    done && 'border-ink-900 bg-ink-900 text-ivory',
                    isCurrent && 'border-brass-500 text-brass-600',
                    !done && !isCurrent && 'border-ink-300 text-ink-400',
                  )}
                >
                  {index + 1}
                </span>
                <span
                  className={cn(
                    'hidden sm:inline',
                    isCurrent ? 'text-ink-900' : 'text-ink-400',
                  )}
                >
                  {label}
                </span>
              </button>
              {index < steps.length - 1 ? (
                <span
                  aria-hidden="true"
                  className="bg-ink-200 hidden h-px w-8 sm:block"
                />
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
