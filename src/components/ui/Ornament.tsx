import { cn } from '@/utils/cn';

/** Fin séparateur ornemental (deux traits et un losange). Purement décoratif. */
export function Ornament({
  tone = 'dark',
  className,
}: {
  tone?: 'dark' | 'light';
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2.5',
        tone === 'light' ? 'text-brass-400' : 'text-brass-500',
        className,
      )}
      aria-hidden="true"
    >
      <span className="h-px w-10 bg-current opacity-50" />
      <svg width="7" height="7" viewBox="0 0 7 7" className="fill-current">
        <path d="M3.5 0 7 3.5 3.5 7 0 3.5Z" />
      </svg>
      <span className="h-px w-10 bg-current opacity-50" />
    </span>
  );
}
