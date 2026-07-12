import { cn } from '@/utils/cn';
import maisonSaintJulesMark from '@/assets/maison-saint-jules-mark.svg';

/** Monogramme + signature de la Maison. */
export function Logo({
  tone = 'dark',
  showWordmark = true,
  className,
}: {
  tone?: 'dark' | 'light';
  showWordmark?: boolean;
  className?: string;
}) {
  const isLight = tone === 'light';
  return (
    <span
      className={cn(
        'inline-flex items-center gap-3',
        isLight ? 'text-ivory' : 'text-ink-900',
        className,
      )}
    >
      <img
        src={maisonSaintJulesMark}
        alt=""
        aria-hidden="true"
        className={cn(
          'h-10 w-auto',
          isLight ? 'brightness-0 invert' : 'opacity-90',
        )}
      />
      {showWordmark ? (
        <span className="sr-only">Maison Saint-Jules</span>
      ) : null}
    </span>
  );
}
