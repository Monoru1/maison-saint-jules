import { cn } from '@/utils/cn';

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
      <span
        className={cn(
          'font-display flex h-9 w-9 flex-col items-center justify-center border leading-none',
          isLight
            ? 'border-brass-400 text-brass-300'
            : 'border-brass-500 text-brass-600',
        )}
        aria-hidden="true"
      >
        <span className="text-[0.68rem]">M</span>
        <span className="-mt-0.5 text-[0.68rem] tracking-tight">SJ</span>
      </span>
      {showWordmark ? (
        <span className="font-display text-base leading-none tracking-wide">
          Maison Saint-Jules
        </span>
      ) : null}
    </span>
  );
}
